import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import {
    MotionBox,
    Box,
    FluidTypography,
    ScrollRevealTextAnimation,
    ScrollRevealTextAnimationContainer,
} from "@project/ui";
import { useHomepageBreakpoints, useHomepageMotionPref } from "../../homepage-responsive-context";
import { ModuleHistoryCarousel } from "@/components/contentful/module-history-carousel/module-history-carousel";
import type { NewPageHomepageFieldsFragment } from "@/components/contentful/new-page-homepage/__generated/page-homepage.contentful.generated";

import colors from "@project/ui/src/design-tokens/01.colors/colors";
import radii from "@project/ui/src/design-tokens/05.radii/radii";
import { SECTION_IDS } from "../../configs/waypoints.config";
import { MOBILE_DOCK_BOTTOM } from "../../configs/layout.config";
import { useEntryReveal } from "../../hooks/use-entry-reveal";

/** Scroll budget (vh) allocated to the carousel slide-in before browsing begins. */
const HISTORY_SLIDE_IN_VH = 125;
/** Scroll budget (vh) per slide transition during the browse phase. */
const HISTORY_BROWSE_PER_SLIDE_VH = 80;
/** Scroll budget (vh) for the outro reveal after browsing ends. */
const HISTORY_OUTRO_VH = 80;
/** Desktop only: fraction of the deck that page scroll drives before handing off to
 *  free interaction. Mobile always scroll-drives the whole deck. */
const HISTORY_SCROLL_DRIVEN_RATIO = 0.2;
/** Outro reveal distance (vh) after browse ends. */
const OUTRO_REVEAL_VH = 30;

type HistorySectionProps = Pick<
    NewPageHomepageFieldsFragment,
    | "historySectionTitle"
    | "historySectionTitle2"
    | "historySectionContent"
    | "historySectionDescription"
>;

type LenisLike = {
    scrollTo: (
        target: number,
        options?: { immediate?: boolean; duration?: number; lock?: boolean }
    ) => void;
};

function scrollPageTo(lenis: LenisLike | undefined, targetScroll: number, immediate?: boolean) {
    if (lenis) {
        lenis.scrollTo(
            targetScroll,
            immediate ? { immediate: true } : { duration: 0.8, lock: true }
        );
        return;
    }
    window.scrollTo({ top: targetScroll, behavior: immediate ? "instant" : "smooth" });
}

function isSectionCoveringViewport(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    return rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
}

/** Hysteresis flip: returns the next boolean, only changing when the appropriate
 *  threshold is crossed (prevents chatter at phase boundaries). */
function nextHysteresisState(prev: boolean, shouldBeTrue: boolean, shouldBeFalse: boolean) {
    if (!prev && shouldBeTrue) return true;
    if (prev && shouldBeFalse) return false;
    return prev;
}

/** Scroll budget (vh) + sticky-progress phase fractions. Desktop drives the first
 *  `browseEndIndex` slides then hands off; mobile drives the whole deck. */
function computeHistoryLayout(slideCount: number, isDesktop: boolean) {
    const browseEndIndex =
        slideCount > 1
            ? Math.min(
                  slideCount - 1,
                  Math.max(1, Math.round((slideCount - 1) * HISTORY_SCROLL_DRIVEN_RATIO))
              )
            : 0;

    const browseVh = isDesktop
        ? browseEndIndex * HISTORY_BROWSE_PER_SLIDE_VH
        : Math.max(0, slideCount - 1) * HISTORY_BROWSE_PER_SLIDE_VH;
    const stuckPhaseVh = HISTORY_SLIDE_IN_VH + browseVh;
    const stickyHeightVh = 100 + HISTORY_OUTRO_VH;
    const containerHeightVh = stuckPhaseVh + stickyHeightVh;
    const stickyRangeVh = containerHeightVh - 100;

    const slideInEnd = HISTORY_SLIDE_IN_VH / stickyRangeVh;
    const browseEnd = stuckPhaseVh / stickyRangeVh;

    return {
        browseEndIndex,
        containerHeightVh,
        stickyRangeVh,
        slideInEnd,
        browseEnd,
    };
}

const HistorySection = (props: HistorySectionProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewportHeightRef = useRef(typeof window !== "undefined" ? window.innerHeight : 0);
    const lenis = useLenis();
    const { isDesktopMd: isDesktop, isShortViewport } = useHomepageBreakpoints();
    const { prefersReducedMotion: reducedMotion } = useHomepageMotionPref();

    useEffect(() => {
        const onResize = () => {
            viewportHeightRef.current = window.innerHeight;
        };
        window.addEventListener("resize", onResize, { passive: true });
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const slideCount =
        props.historySectionContent?.__typename === "ModuleHistoryCarousel"
            ? (props.historySectionContent.carouselItemsCollection?.items?.length ?? 0)
            : 0;

    const { browseEndIndex, containerHeightVh, stickyRangeVh, slideInEnd, browseEnd } =
        computeHistoryLayout(slideCount, isDesktop);

    // Track scroll for sticky phase animations
    const { scrollYProgress: stickyProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Entry animations — GPU-composited: use clipPath instead of width (avoids layout per frame)
    const {
        style: revealStyle,
        willChange: revealWillChange,
        entryProgress,
    } = useEntryReveal({
        target: containerRef,
        enabled: isDesktop && !reducedMotion,
        radius: radii.ndlRadiusXLarge,
    });

    // Carousel slide-in (from right)
    const carouselX = useTransform(stickyProgress, [0, slideInEnd], ["100%", "0%"]);

    // Driven span: [0, 1] → snap[0]→snap[browseEndIndex] on desktop; full deck on mobile.
    const browseProgress = useTransform(stickyProgress, [slideInEnd, browseEnd], [0, 1]);

    // Refs are the scroll-frame source of truth; state commits only on boolean flips.
    const [isInPlace, setIsInPlace] = useState(false);
    const isInPlaceRef = useRef(false);
    const [browseActive, setBrowseActive] = useState(false);
    const browseActiveRef = useRef(false);
    const HYSTERESIS = 0.02;
    useMotionValueEvent(stickyProgress, "change", (v) => {
        const nextInPlace = nextHysteresisState(
            isInPlaceRef.current,
            v >= slideInEnd,
            v < slideInEnd - HYSTERESIS
        );
        if (nextInPlace !== isInPlaceRef.current) {
            isInPlaceRef.current = nextInPlace;
            setIsInPlace(nextInPlace);
        }

        if (!isDesktop) return;
        // Sharp handoff at browseEnd so grab unlocks with slide 3; hysteresis only on slide-in.
        const nextBrowse = nextHysteresisState(
            browseActiveRef.current,
            v >= slideInEnd && v < browseEnd,
            v < slideInEnd - HYSTERESIS || v >= browseEnd
        );
        if (nextBrowse !== browseActiveRef.current) {
            browseActiveRef.current = nextBrowse;
            setBrowseActive(nextBrowse);
        }
    });

    const titleLines = [
        props.historySectionTitle?.trim() ?? "",
        props.historySectionTitle2?.trim() ?? "",
    ].filter(Boolean);

    const titleExitEnd = slideInEnd * 1.1;
    const outroRevealFraction = OUTRO_REVEAL_VH / stickyRangeVh;

    // Driven: map slide → vertical scroll. Handed off: focus-only park at handoff.
    const handleSlideRequest = useCallback(
        (index: number, progress: number, immediate?: boolean, source?: "focus" | "sync") => {
            const el = containerRef.current;
            if (!el) return;

            const stickyRangePx = el.offsetHeight - viewportHeightRef.current;

            if (isDesktop && !browseActiveRef.current) {
                if (source !== "focus") return;
                scrollPageTo(lenis, el.offsetTop + stickyRangePx * browseEnd, immediate);
                return;
            }

            if (source === "sync" && !isSectionCoveringViewport(el)) return;
            let norm: number;
            if (!isDesktop) {
                norm = Math.max(0, Math.min(1, progress));
            } else {
                norm = browseEndIndex > 0 ? Math.min(1, index / browseEndIndex) : 0;
            }
            const browseProgressFraction = slideInEnd + norm * (browseEnd - slideInEnd);

            scrollPageTo(lenis, el.offsetTop + stickyRangePx * browseProgressFraction, immediate);
        },
        [isDesktop, browseEndIndex, lenis, slideInEnd, browseEnd]
    );

    return (
        <Box
            as="section"
            aria-label="History"
            id={SECTION_IDS.history}
            ref={containerRef}
            position="relative"
            zIndex="10"
            marginTop="-100vh"
            height={`${containerHeightVh}vh`}
        >
            <MotionBox
                position="sticky"
                top="0"
                mx="auto"
                display="flex"
                flexDirection="column"
                overflow="hidden"
                backgroundColor="allWhite"
                height={`calc(100svh + ${HISTORY_OUTRO_VH}vh)`}
                width="100%"
                style={revealStyle}
                sx={{
                    willChange: revealWillChange,
                    overscrollBehavior: "contain",
                }}
            >
                {/* Main viewport stage */}
                <Box position="relative" height="100svh" width="full" overflow="visible">
                    {/* Headline */}
                    <Box
                        position="absolute"
                        top="0"
                        left="50%"
                        transform="translateX(-50%)"
                        width="100vw"
                        height="100%"
                        zIndex={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        overflow="visible"
                    >
                        <Box width="100vw">
                            <ScrollRevealTextAnimationContainer textColor={colors.grey500}>
                                <FluidTypography
                                    as="h2"
                                    size="displayLarge"
                                    textAlign="center"
                                    whiteSpace="pre-line"
                                    overflow="visible"
                                    sx={{
                                        textWrap: "balance",
                                    }}
                                >
                                    {titleLines.map((line) =>
                                        reducedMotion ? (
                                            <span key={line}>{line}</span>
                                        ) : (
                                            <ScrollRevealTextAnimation
                                                key={line}
                                                entryProgress={entryProgress}
                                                exitProgress={stickyProgress}
                                                exitProgressRange={[0.04, titleExitEnd]}
                                            >
                                                {line}
                                            </ScrollRevealTextAnimation>
                                        )
                                    )}
                                </FluidTypography>
                            </ScrollRevealTextAnimationContainer>
                        </Box>
                    </Box>

                    {/* Carousel */}
                    <MotionBox
                        position="absolute"
                        inset="0"
                        zIndex={2}
                        overflow="hidden"
                        display="flex"
                        alignItems="center"
                        justifyContent={{ base: "flex-end", md: "center" }}
                        pb={{ base: MOBILE_DOCK_BOTTOM, md: 0 }}
                        style={reducedMotion ? {} : { x: carouselX }}
                    >
                        {props.historySectionContent?.__typename === "ModuleHistoryCarousel" && (
                            <ModuleHistoryCarousel
                                {...props.historySectionContent}
                                browseProgress={browseProgress}
                                browseActive={isDesktop ? browseActive : undefined}
                                browseEndIndex={isDesktop ? browseEndIndex : undefined}
                                isInPlace={isInPlace}
                                onSlideRequest={handleSlideRequest}
                                reducedMotion={reducedMotion}
                                isDesktop={isDesktop}
                                isShortViewport={isShortViewport}
                            />
                        )}
                    </MotionBox>
                </Box>

                {/* Outro — below the fold, revealed when sticky element un-sticks */}
                <Box
                    position="relative"
                    height={`${HISTORY_OUTRO_VH}vh`}
                    width="full"
                    overflow="visible"
                    display="flex"
                    justifyContent="center"
                    alignItems="flex-start"
                    py={{ base: 6, md: 8 }}
                    px={{ base: 4, md: 10 }}
                >
                    <ScrollRevealTextAnimationContainer textColor={colors.grey500}>
                        <FluidTypography
                            size="displayLarge"
                            as="p"
                            textAlign="center"
                            overflow="visible"
                            sx={{
                                textWrap: "balance",
                            }}
                        >
                            {reducedMotion ? (
                                <span>{props.historySectionDescription ?? ""}</span>
                            ) : (
                                <ScrollRevealTextAnimation
                                    entryProgress={stickyProgress}
                                    entryProgressRange={[
                                        browseEnd,
                                        browseEnd + outroRevealFraction,
                                    ]}
                                >
                                    {props.historySectionDescription ?? ""}
                                </ScrollRevealTextAnimation>
                            )}
                        </FluidTypography>
                    </ScrollRevealTextAnimationContainer>
                </Box>
            </MotionBox>
        </Box>
    );
};

HistorySection.displayName = "HistorySection";

export { HistorySection };
