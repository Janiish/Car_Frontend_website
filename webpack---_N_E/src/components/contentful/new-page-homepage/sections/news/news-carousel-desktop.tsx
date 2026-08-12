import { useMemo, useRef, useCallback, useState, memo, useEffect, useLayoutEffect } from "react";
import type { ReactNode, TransitionEvent } from "react";
import type { BoxProps } from "@project/ui";
import { Box, Flex } from "@project/ui";
import { useHomepageMotionPref } from "../../homepage-responsive-context";
import { NewsCard, type NewsCardItem } from "./news-card";
import { easeOutStrong, cssBezier } from "../../configs/motion-tokens";

const MARQUEE_SPEED = 50;
const GROUP_GAP = 4;
const INNER_GAP = 4;
const BIG_PAIR_SIZE = 2;
const MIXED_GROUP_SIZE = 3;

const GROUP_TYPE_BIG_SINGLE = "big-single" as const;
const GROUP_TYPE_BIG_PAIR = "big-pair" as const;
const GROUP_TYPE_MIXED = "mixed" as const;

const BIG_CARD_WIDTH = 424;
const MIXED_GROUP_WIDTH = 457;

const getGroupWidth = (type: ReturnType<typeof buildGroups>[number]["type"]): number => {
    if (type === GROUP_TYPE_BIG_PAIR) return BIG_CARD_WIDTH * 2 + GROUP_GAP;
    if (type === GROUP_TYPE_BIG_SINGLE) return BIG_CARD_WIDTH;
    return MIXED_GROUP_WIDTH;
};

/**
 * Each cycle consumes 5 items:
 *   Pattern A  ->  2 large cards (side by side)
 *   Pattern B  ->  1 medium card on top + 2 small cards below
 */
const buildGroups = (items: NewsCardItem[]) => {
    const groups: Array<
        | { type: typeof GROUP_TYPE_BIG_PAIR; items: [NewsCardItem, NewsCardItem] }
        | { type: typeof GROUP_TYPE_BIG_SINGLE; items: [NewsCardItem] }
        | { type: typeof GROUP_TYPE_MIXED; items: [NewsCardItem, NewsCardItem, NewsCardItem] }
    > = [];

    let cursor = 0;
    let nextIsBigPair = true;

    while (cursor < items.length) {
        const remaining = items.length - cursor;

        if (nextIsBigPair) {
            if (remaining >= BIG_PAIR_SIZE) {
                groups.push({
                    type: GROUP_TYPE_BIG_PAIR,
                    items: [items[cursor], items[cursor + 1]],
                });
                cursor += BIG_PAIR_SIZE;
            } else {
                groups.push({ type: GROUP_TYPE_BIG_SINGLE, items: [items[cursor]] });
                cursor += 1;
            }
        } else if (remaining >= MIXED_GROUP_SIZE) {
            groups.push({
                type: GROUP_TYPE_MIXED,
                items: [items[cursor], items[cursor + 1], items[cursor + 2]],
            });
            cursor += MIXED_GROUP_SIZE;
        } else if (remaining === BIG_PAIR_SIZE) {
            groups.push({
                type: GROUP_TYPE_BIG_PAIR,
                items: [items[cursor], items[cursor + 1]],
            });
            cursor += BIG_PAIR_SIZE;
        } else {
            groups.push({ type: GROUP_TYPE_BIG_SINGLE, items: [items[cursor]] });
            cursor += 1;
        }
        nextIsBigPair = !nextIsBigPair;
    }

    return groups;
};

const ENTRANCE_TWEEN_DURATION = 1;
const ENTRANCE_EASE = cssBezier(easeOutStrong);
const CARD_STAGGER_DELAY = 0.18;
const STAGGER_KNEE = 6;
const STAGGER_BUDGET = CARD_STAGGER_DELAY * (1 + STAGGER_KNEE);

// ---------------------------------------------------------------------------
// AnimatedCardSlot — uses pure CSS transitions instead of MotionBox to
// keep all animation work on the compositor thread (zero JS per-frame cost).
// ---------------------------------------------------------------------------

type AnimatedCardSlotProps = {
    animate: boolean;
    entranceReady: boolean;
    staggerIndex: number;
    /** Distance (px) from the card's resting position to the right edge of the viewport. 0 = skip animation (card is off-viewport). */
    fanDistance: number;
    children: ReactNode;
} & BoxProps;

const AnimatedCardSlot = memo(function AnimatedCardSlot({
    animate,
    entranceReady,
    staggerIndex,
    fanDistance,
    children,
    ...boxProps
}: AnimatedCardSlotProps) {
    const [entranceDone, setEntranceDone] = useState(false);

    const entranceDoneRef = useRef(false);
    const handleTransitionEnd = useCallback((e: TransitionEvent) => {
        if (e.propertyName === "transform" && !entranceDoneRef.current) {
            entranceDoneRef.current = true;
            setEntranceDone(true);
        }
    }, []);

    if (!animate || fanDistance <= 0) {
        return <Box {...boxProps}>{children}</Box>;
    }

    const delay = STAGGER_BUDGET * (staggerIndex / (staggerIndex + STAGGER_KNEE));

    return (
        <Box
            onTransitionEnd={handleTransitionEnd}
            style={{
                opacity: entranceReady ? 1 : 0,
                transform: entranceReady ? "translateX(0)" : `translateX(${fanDistance}px)`,
                transition: `transform ${ENTRANCE_TWEEN_DURATION}s ${ENTRANCE_EASE} ${delay}s, opacity 0.4s ease-out ${delay}s`,
                willChange: entranceDone ? "auto" : "transform, opacity",
                contain: entranceDone ? "none" : "layout paint",
            }}
            {...boxProps}
        >
            {children}
        </Box>
    );
});

// ---------------------------------------------------------------------------
// Group rendering helper
// ---------------------------------------------------------------------------

type GroupEntry = {
    group: ReturnType<typeof buildGroups>[number];
    cardIndices: number[];
};

/** First N source-pass cards fetch their fallback image eagerly — roughly two groups, ~one 1920px viewport width before any scrolling. */
const EAGER_CARD_COUNT = 6;

function getSourceImageLoading(index: number): "eager" | "lazy" {
    return index < EAGER_CARD_COUNT ? "eager" : "lazy";
}

/** Clone-pass cards always lazy-load (same URLs, browser cache hit). */
function getCloneImageLoading(): "eager" | "lazy" {
    return "lazy";
}

type RenderPassConfig = {
    keySuffix: string;
    animate: boolean;
    a11yProps: Record<string, unknown>;
    getImageLoading: (index: number) => "eager" | "lazy";
    disableVideo: boolean;
};

const sourcePassConfig = (shouldAnimate: boolean): RenderPassConfig => ({
    keySuffix: "",
    animate: shouldAnimate,
    a11yProps: {},
    getImageLoading: getSourceImageLoading,
    disableVideo: false,
});

const clonePassConfig: RenderPassConfig = {
    keySuffix: "-clone",
    animate: false,
    a11yProps: { "aria-hidden": true as const, inert: "" as unknown as undefined },
    getImageLoading: getCloneImageLoading,
    disableVideo: true,
};

function renderGroup(
    { group, cardIndices }: GroupEntry,
    pass: RenderPassConfig,
    entranceReady: boolean,
    fanDistances?: Map<number, number>
): ReactNode {
    const groupKey = group.items.map((i) => i.sys.id).join("-") + pass.keySuffix;

    const getFan = (idx: number) => fanDistances?.get(idx) ?? 0;

    if (group.type === GROUP_TYPE_BIG_SINGLE) {
        return (
            <AnimatedCardSlot
                key={groupKey}
                as="li"
                animate={pass.animate}
                entranceReady={entranceReady}
                staggerIndex={cardIndices[0]}
                fanDistance={getFan(cardIndices[0])}
                width="424px"
                height="538px"
                flexShrink={0}
                mr={GROUP_GAP}
                {...pass.a11yProps}
            >
                <NewsCard
                    item={group.items[0]}
                    cardSize="large"
                    disableVideo={pass.disableVideo}
                    imageLoading={pass.getImageLoading(cardIndices[0])}
                />
            </AnimatedCardSlot>
        );
    }

    if (group.type === GROUP_TYPE_BIG_PAIR) {
        return (
            <Flex
                key={groupKey}
                as="li"
                gap={GROUP_GAP}
                flexShrink={0}
                mr={GROUP_GAP}
                {...pass.a11yProps}
            >
                <AnimatedCardSlot
                    animate={pass.animate}
                    entranceReady={entranceReady}
                    staggerIndex={cardIndices[0]}
                    fanDistance={getFan(cardIndices[0])}
                    width="424px"
                    height="538px"
                    flexShrink={0}
                >
                    <NewsCard
                        item={group.items[0]}
                        cardSize="large"
                        disableVideo={pass.disableVideo}
                        imageLoading={pass.getImageLoading(cardIndices[0])}
                    />
                </AnimatedCardSlot>
                <AnimatedCardSlot
                    animate={pass.animate}
                    entranceReady={entranceReady}
                    staggerIndex={cardIndices[1]}
                    fanDistance={getFan(cardIndices[1])}
                    width="424px"
                    height="538px"
                    flexShrink={0}
                >
                    <NewsCard
                        item={group.items[1]}
                        cardSize="large"
                        disableVideo={pass.disableVideo}
                        imageLoading={pass.getImageLoading(cardIndices[1])}
                    />
                </AnimatedCardSlot>
            </Flex>
        );
    }

    return (
        <Flex
            key={groupKey}
            as="li"
            flexDirection="column"
            gap={INNER_GAP}
            width="457px"
            flexShrink={0}
            mr={GROUP_GAP}
            {...pass.a11yProps}
        >
            <AnimatedCardSlot
                animate={pass.animate}
                entranceReady={entranceReady}
                staggerIndex={cardIndices[0]}
                fanDistance={getFan(cardIndices[0])}
                height="299px"
            >
                <NewsCard
                    item={group.items[0]}
                    cardSize="medium"
                    disableVideo={pass.disableVideo}
                    imageLoading={pass.getImageLoading(cardIndices[0])}
                />
            </AnimatedCardSlot>
            <Flex gap={INNER_GAP}>
                <AnimatedCardSlot
                    animate={pass.animate}
                    entranceReady={entranceReady}
                    staggerIndex={cardIndices[1]}
                    fanDistance={getFan(cardIndices[1])}
                    flex="1 0 0"
                    minWidth={0}
                    height="224px"
                >
                    <NewsCard
                        item={group.items[1]}
                        cardSize="small"
                        disableVideo={pass.disableVideo}
                        imageLoading={pass.getImageLoading(cardIndices[1])}
                    />
                </AnimatedCardSlot>
                <AnimatedCardSlot
                    animate={pass.animate}
                    entranceReady={entranceReady}
                    staggerIndex={cardIndices[2]}
                    fanDistance={getFan(cardIndices[2])}
                    flex="1 0 0"
                    minWidth={0}
                    height="224px"
                >
                    <NewsCard
                        item={group.items[2]}
                        cardSize="small"
                        disableVideo={pass.disableVideo}
                        imageLoading={pass.getImageLoading(cardIndices[2])}
                    />
                </AnimatedCardSlot>
            </Flex>
        </Flex>
    );
}

// ---------------------------------------------------------------------------
// DesktopMarquee
// Groups are rendered twice: source pass (videos on) then clone pass (poster
// images only). This gives seamless looping without duplicating video decoders,
// replacing the autoFill prop which would clone the entire DOM per fill cycle.
// ---------------------------------------------------------------------------

export const DesktopMarquee = memo(function DesktopMarquee({
    items,
    play,
    entranceReady = false,
}: {
    items: NewsCardItem[];
    play: boolean;
    entranceReady?: boolean;
}) {
    const groups = useMemo(() => buildGroups(items), [items]);

    const { prefersReducedMotion } = useHomepageMotionPref();
    const shouldAnimate = !prefersReducedMotion;

    // This component is a `ssr: false` dynamic chunk, but `entranceReady`
    // latches on the section wrapper that exists while the chunk is still
    // loading — so the flag can already be true at mount. AnimatedCardSlot
    // animates with a pure CSS transition, which needs the hidden state to
    // have been computed first; mounting straight into the visible state
    // skips the entrance (or catches an intermediate style frame). Re-arm
    // locally: commit the hidden (off-screen) styles, wait for them to
    // paint (double rAF), then flip so the transition always runs in full
    // from off-screen.
    const [entranceStarted, setEntranceStarted] = useState(false);
    useEffect(() => {
        if (!entranceReady || entranceStarted) return;
        let secondRaf = 0;
        const firstRaf = requestAnimationFrame(() => {
            secondRaf = requestAnimationFrame(() => setEntranceStarted(true));
        });
        return () => {
            cancelAnimationFrame(firstRaf);
            cancelAnimationFrame(secondRaf);
        };
    }, [entranceReady, entranceStarted]);

    const groupsWithIndices = useMemo<GroupEntry[]>(() => {
        let idx = 0;
        return groups.map((group) => {
            const count = group.items.length;
            const cardIndices = Array.from({ length: count }, (_, i) => idx + i);
            idx += count;
            return { group, cardIndices };
        });
    }, [groups]);

    const viewportWidthRef = useRef(typeof window !== "undefined" ? window.innerWidth : 1920);

    const fanDistances = useMemo(() => {
        const vw = viewportWidthRef.current;
        const distances = new Map<number, number>();
        let groupX = 0;

        for (const gi of groupsWithIndices) {
            const fan = Math.max(0, vw - groupX + 100);
            for (const idx of gi.cardIndices) {
                distances.set(idx, fan);
            }
            groupX += getGroupWidth(gi.group.type) + GROUP_GAP;
        }
        return distances;
    }, [groupsWithIndices]);

    const marqueeContainerRef = useRef<HTMLDivElement>(null);
    const stripRef = useRef<HTMLDivElement>(null);
    const [animDuration, setAnimDuration] = useState(0);

    // Derive the CSS animation duration from the strip width. The strip sits
    // inside a `content-visibility: auto` section, so while that subtree is
    // still skipped the first layout query can come back stale (0). Measuring
    // once would then leave `animationName` at "none" permanently — the cards
    // still fan in, but the marquee never scrolls. Keep a ResizeObserver on the
    // strip so the real width is picked up whenever layout catches up.
    useLayoutEffect(() => {
        const el = stripRef.current;
        if (!el) return;

        const measure = () => {
            const halfWidth = el.scrollWidth / 2;
            if (halfWidth <= 0) return;
            const next = halfWidth / MARQUEE_SPEED;
            setAnimDuration((prev) => (prev === next ? prev : next));
        };

        measure();

        const observer = new ResizeObserver(measure);
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const [isFocusWithin, setIsFocusWithin] = useState(false);
    const isFocusWithinRef = useRef(false);
    const animDurationRef = useRef(animDuration);
    animDurationRef.current = animDuration;

    // Snap marquee back to position 0 only for keyboard focus (`:focus-visible`).
    // Pointer clicks also fire focusin and would otherwise restart + stick the
    // pause after the cursor leaves — that is what broke swipe/click resume.
    useEffect(() => {
        const container = marqueeContainerRef.current;
        if (!container) return;

        const handleFocusIn = (e: FocusEvent) => {
            const target = e.target;
            if (!(target instanceof HTMLElement) || !target.matches(":focus-visible")) return;

            const related = e.relatedTarget;
            const comingFromInside = related instanceof Node && container.contains(related);
            if (comingFromInside) return;

            const strip = stripRef.current;
            const dur = animDurationRef.current;
            if (strip && dur > 0) {
                strip.style.animationName = "none";
                // Force a synchronous reflow so the animation restarts from 0.
                strip.getBoundingClientRect();
                strip.style.animationName = "cssMarqueeScroll";
                strip.style.animationDuration = `${dur}s`;
                strip.style.animationTimingFunction = "linear";
                strip.style.animationIterationCount = "infinite";
                strip.style.animationPlayState = "paused";
            }
            isFocusWithinRef.current = true;
            setIsFocusWithin(true);
        };

        const handleFocusOut = (e: FocusEvent) => {
            if (!isFocusWithinRef.current) return;
            const related = e.relatedTarget;
            const goingInside = related instanceof Node && container.contains(related);
            if (!goingInside) {
                isFocusWithinRef.current = false;
                setIsFocusWithin(false);
            }
        };

        container.addEventListener("focusin", handleFocusIn);
        container.addEventListener("focusout", handleFocusOut);
        return () => {
            container.removeEventListener("focusin", handleFocusIn);
            container.removeEventListener("focusout", handleFocusOut);
        };
    }, []);

    const effectivePlay = play && !prefersReducedMotion && !isFocusWithin;

    return (
        <Box
            ref={marqueeContainerRef}
            overflow="hidden"
            width="100vw"
            marginLeft="calc(-50vw + 50%)"
            minHeight="538px"
            isolation="isolate"
            // pan-y: vertical page scroll still works; horizontal drag/swipe
            // cannot capture the strip and fight the CSS marquee transform.
            sx={{ contain: "content", touchAction: "pan-y", userSelect: "none" }}
        >
            {/* Global keyframes — translate3d forces dedicated GPU compositor layer */}
            <style>{`
                @keyframes cssMarqueeScroll {
                    from { transform: translate3d(0, 0, 0); }
                    to { transform: translate3d(-50%, 0, 0); }
                }
                /* Hover-only pause. Do not use :focus-within — pointer clicks
                   leave focus on the card link and would stick the marquee paused. */
                [data-marquee-pause-hover]:hover {
                    animation-play-state: paused !important;
                }
            `}</style>
            <Flex
                ref={stripRef}
                as="ul"
                listStyleType="none"
                margin={0}
                padding={0}
                data-marquee-pause-hover=""
                width="max-content"
                style={{
                    animationName: animDuration > 0 ? "cssMarqueeScroll" : "none",
                    animationDuration: animDuration > 0 ? `${animDuration}s` : undefined,
                    animationTimingFunction: animDuration > 0 ? "linear" : undefined,
                    animationIterationCount: animDuration > 0 ? "infinite" : undefined,
                    animationPlayState: effectivePlay ? "running" : "paused",
                    willChange: effectivePlay ? "transform" : "auto",
                    backfaceVisibility: "hidden",
                }}
            >
                {groupsWithIndices.map((gi) =>
                    renderGroup(gi, sourcePassConfig(shouldAnimate), entranceStarted, fanDistances)
                )}
                {groupsWithIndices.map((gi) => renderGroup(gi, clonePassConfig, entranceStarted))}
            </Flex>
        </Box>
    );
});

DesktopMarquee.displayName = "DesktopMarquee";
