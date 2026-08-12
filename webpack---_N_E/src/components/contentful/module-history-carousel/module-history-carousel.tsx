import type {
    ModuleHistoryCarouselFieldsFragment,
    PartHistoryCarouselItemFieldsFragment,
} from "@/components/contentful/module-history-carousel/__generated/module-history-carousel.contentful.generated";
import { PartHistoryCarouselItem } from "@/components/contentful/module-history-carousel/part-history-carousel-item";
import {
    Box,
    Carousel,
    CarouselSlide,
    NdlCarouselPagination,
    CarouselA11y,
    CarouselKeyboard,
    CarouselFreeMode,
} from "@project/ui";
import type { CarouselClass } from "@project/ui";
import type { MotionValue } from "framer-motion";
import { motionValue, useMotionValueEvent } from "framer-motion";
import { WrapperContainer } from "@/components/wrapper-container";
import { useCallback, useEffect, useRef, useState } from "react";
import breakpoints from "@project/ui/src/design-tokens/09.breakpoints/breakpoints";
import { useCarouselNavigationTracking } from "@/lib/google-tag-manager/use-carousel-navigation-tracking";
import { PAGMSHModuleNames } from "@/lib/google-tag-manager/events";

export type ModuleHistoryCarouselProps = ModuleHistoryCarouselFieldsFragment & {
    moduleIndex?: number | null;
    /** 0→1 progress driving horizontal scroll through slides. Defaults to static 0 (first slide). */
    browseProgress?: MotionValue<number>;
    /** Desktop hybrid gate. `true` while page scroll owns the carousel (driven intro),
     *  `false` after the handoff so the carousel is freely interactive. Leave `undefined`
     *  (mobile) to keep the classic full-scroll-driven behavior. */
    browseActive?: boolean;
    /** Desktop hybrid: last slide index page scroll drives to before handoff. When set,
     *  browseProgress 0→1 maps onto snap[0]→snap[browseEndIndex] (not the full deck). */
    browseEndIndex?: number;
    /** True once the carousel slide-in is complete and the first slide should activate. Defaults to true. */
    isInPlace?: boolean;
    /** Called when the user navigates via pagination or swipe — parent should scroll to match.
     *  `progress` is the exact [0,1] browse position derived from Swiper's snap grid.
     *  `immediate` skips Lenis animation (for same-index corrections).
     *  `source` lets the parent distinguish deliberate keyboard-focus jumps
     *  ("focus") from carousel→page sync corrections ("sync") — the latter
     *  also fire when Swiper re-lays-out on a viewport resize and must be
     *  ignorable while the page isn't inside this section. */
    onSlideRequest?: (
        index: number,
        progress: number,
        immediate?: boolean,
        source?: "focus" | "sync"
    ) => void;
    /** Whether user prefers reduced motion — forwarded to items to disable animations. */
    reducedMotion?: boolean;
    /** Desktop breakpoint flag — passed from parent to avoid duplicate media query. */
    isDesktop?: boolean;
    /** True when the viewport is short — forwarded to items to select a shorter mobile aspect ratio. */
    isShortViewport?: boolean;
};

type CarouselItem = PartHistoryCarouselItemFieldsFragment;

const STATIC_ZERO = motionValue(0);

const LENIS_NAV_DURATION_MS = 800;
const BREAKPOINT_MD_PX = parseInt(breakpoints.md, 10);
const PAGINATION_ENTRANCE_DELAY = 0.15;

/** Slides on each side of the active one to eagerly load, so an adjacent slide's
 *  image is ready before the scrub/swipe reaches it (avoids visible pop-in). */
const PRELOAD_BEHIND = 1;
const PRELOAD_AHEAD = 2;

/** Walks up the DOM and resets any unwanted horizontal scroll caused by focus. */
function resetAncestorScrollLeft(el: HTMLElement | null) {
    let parent = el;
    while (parent) {
        if (parent.scrollLeft !== 0) parent.scrollLeft = 0;
        parent = parent.parentElement;
    }
}

/** Given a focus event target, resolves the slide index within the Swiper wrapper. */
function resolveSlideIndex(target: HTMLElement): number {
    const slideEl = target.closest(".swiper-slide");
    if (!slideEl) return -1;
    const allSlides = slideEl.parentElement?.querySelectorAll(":scope > .swiper-slide");
    if (!allSlides) return -1;
    return Array.from(allSlides).indexOf(slideEl);
}

/** Computes the [0,1] browse progress for a given slide index in the snap grid. */
function browseProgressForSlide(swiper: CarouselClass, index: number): number {
    const snapGrid = swiper.snapGrid;
    const minT = swiper.minTranslate();
    const maxT = swiper.maxTranslate();
    const range = maxT - minT;
    if (range === 0) return 0;
    return Math.max(0, Math.min(1, (-(snapGrid[index] ?? 0) - minT) / range));
}

function blockPaginationInteraction(e: React.SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();
}

/** Sync Swiper touch + grab cursor (and DOM classes) so the cursor can't stick. */
function setSwiperGrabEnabled(swiper: CarouselClass, enabled: boolean) {
    swiper.allowTouchMove = enabled;
    swiper.params.grabCursor = enabled;
    const root = swiper.el as HTMLElement | undefined;
    const wrapper = swiper.wrapperEl as HTMLElement | undefined;
    root?.classList.toggle("swiper-grab", enabled);
    if (!enabled) root?.classList.remove("swiper-grabbing");
    if (wrapper) wrapper.style.cursor = enabled ? "grab" : "default";
}

/** Above per-frame scrub deltas (~170px) so only free→driven reentry animates. */
const CATCHUP_JUMP_PX = 400;
const CATCHUP_MS = 480;
const CATCHUP_RETARGET_MS = 280;
const CATCHUP_EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

function setWrapperTransition(wrapper: HTMLElement, durationMs: number, ease = "") {
    wrapper.style.transitionDuration = `${durationMs}ms`;
    wrapper.style.transitionTimingFunction = ease;
}

/** Seed at `from`, then ease the next setTranslate for `duration`. */
function beginCatchupFrom(
    swiper: CarouselClass,
    from: number,
    duration: number,
    animatingRef: { current: boolean },
    endTimerRef: { current: ReturnType<typeof setTimeout> | null }
) {
    const wrapper = swiper.wrapperEl;
    setWrapperTransition(wrapper, 0);
    swiper.setTranslate(from);
    wrapper.getBoundingClientRect(); // reflow so the ease starts from `from`
    animatingRef.current = true;
    setWrapperTransition(wrapper, duration, CATCHUP_EASE);
    if (endTimerRef.current) clearTimeout(endTimerRef.current);
    endTimerRef.current = setTimeout(() => {
        setWrapperTransition(wrapper, 0);
        animatingRef.current = false;
        endTimerRef.current = null;
    }, duration + 32);
}

function clearCatchupTransition(
    wrapper: HTMLElement,
    animatingRef: { current: boolean },
    endTimerRef: { current: ReturnType<typeof setTimeout> | null }
) {
    if (endTimerRef.current) {
        clearTimeout(endTimerRef.current);
        endTimerRef.current = null;
    }
    animatingRef.current = false;
    setWrapperTransition(wrapper, 0);
}

export const ModuleHistoryCarousel = ({
    carouselItemsCollection,
    browseProgress: browseProgressProp,
    browseActive,
    browseEndIndex,
    isInPlace = true,
    onSlideRequest,
    reducedMotion = false,
    isDesktop = false,
    isShortViewport = false,
}: ModuleHistoryCarouselProps) => {
    const browseProgress = browseProgressProp ?? STATIC_ZERO;
    /** Scroll-driven browse (pinned): page scroll owns horizontal position via browseProgress. */
    const isScrollDriven = browseProgressProp != null;
    const items = carouselItemsCollection?.items ?? [];
    const slideCount = items.length;
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiperInstance, setSwiperInstance] = useState<CarouselClass | null>(null);
    const trackCarouselNavigation = useCarouselNavigationTracking(PAGMSHModuleNames.historySection);
    const canGrab = isInPlace && browseActive !== true;

    const paginationMotionStyle = reducedMotion
        ? undefined
        : {
              opacity: canGrab ? 1 : 0,
              scale: canGrab ? 1 : 0.92,
              transition: `opacity 0.2s ease ${PAGINATION_ENTRANCE_DELAY}s, transform 0.2s ease ${PAGINATION_ENTRANCE_DELAY}s`,
          };

    const userNavLockRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const activeIndexRef = useRef(0);
    const scrollStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const catchupAnimatingRef = useRef(false);
    const catchupEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const armUserNavLock = () => {
        if (userNavLockRef.current) clearTimeout(userNavLockRef.current);
        userNavLockRef.current = setTimeout(() => {
            userNavLockRef.current = null;
        }, LENIS_NAV_DURATION_MS + 100);
    };

    /** Translate for a 0→1 browseProgress, using the driven snap span when hybrid. */
    const translateForProgress = useCallback(
        (p: number) => {
            if (!swiperInstance || swiperInstance.destroyed) return 0;
            const clamped = Math.max(0, Math.min(1, p));
            const snapGrid = swiperInstance.snapGrid;
            if (browseEndIndex != null && snapGrid.length > 0) {
                const endIdx = Math.min(browseEndIndex, snapGrid.length - 1);
                const startSnap = snapGrid[0] ?? 0;
                const endSnap = snapGrid[endIdx] ?? startSnap;
                return -(startSnap + clamped * (endSnap - startSnap));
            }
            const maxTranslate = swiperInstance.maxTranslate();
            const minTranslate = swiperInstance.minTranslate();
            return minTranslate + clamped * (maxTranslate - minTranslate);
        },
        [swiperInstance, browseEndIndex]
    );

    const indexForProgress = useCallback(
        (p: number) => {
            if (!swiperInstance || swiperInstance.destroyed) return 0;
            const target = Math.abs(translateForProgress(p));
            const snapGrid = swiperInstance.snapGrid;
            let newIndex = 0;
            for (let i = 0; i < snapGrid.length - 1; i++) {
                const mid = (snapGrid[i] + snapGrid[i + 1]) / 2;
                if (target >= mid) newIndex = i + 1;
                else break;
            }
            return Math.min(slideCount - 1, newIndex);
        },
        [swiperInstance, slideCount, translateForProgress]
    );

    const syncSwiperToProgress = useCallback(
        (p: number) => {
            if (!swiperInstance || swiperInstance.destroyed) return;
            const wrapper = swiperInstance.wrapperEl;
            const target = translateForProgress(p);

            if (catchupAnimatingRef.current) {
                // Mid-flight: retarget end only — no getComputedStyle on the scrub path.
                setWrapperTransition(wrapper, CATCHUP_RETARGET_MS, CATCHUP_EASE);
            } else {
                const previous = swiperInstance.getTranslate();
                const jump = Math.abs(previous - target);
                if (!reducedMotion && jump > CATCHUP_JUMP_PX) {
                    beginCatchupFrom(
                        swiperInstance,
                        previous,
                        CATCHUP_MS,
                        catchupAnimatingRef,
                        catchupEndTimerRef
                    );
                } else {
                    clearCatchupTransition(wrapper, catchupAnimatingRef, catchupEndTimerRef);
                }
            }

            swiperInstance.setTranslate(target);
            swiperInstance.updateProgress();

            const newIndex = indexForProgress(p);
            if (swiperInstance.activeIndex !== newIndex) {
                swiperInstance.activeIndex = newIndex;
                swiperInstance.realIndex = newIndex;
            }
            if (activeIndexRef.current !== newIndex) {
                activeIndexRef.current = newIndex;
                if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
                scrollStopTimerRef.current = setTimeout(() => {
                    setActiveIndex(activeIndexRef.current);
                }, 150);
            }
        },
        [swiperInstance, translateForProgress, indexForProgress, reducedMotion]
    );

    // Scroll-driven modes: page scroll owns position until desktop handoff
    // (`browseActive === false`). `undefined` browseActive (mobile) never blocks.
    useMotionValueEvent(browseProgress, "change", (p) => {
        if (!isScrollDriven) return;
        if (browseActive === false) return;
        if (userNavLockRef.current) return;
        syncSwiperToProgress(p);
    });

    // Re-enter driven mode: park if already in the driven span, else catch up.
    useEffect(() => {
        if (!isScrollDriven) return;
        if (browseActive === false) return;
        if (!swiperInstance || swiperInstance.destroyed || !isInPlace) return;
        if (userNavLockRef.current) return;

        const p = browseProgress.get();
        const targetIndex = indexForProgress(p);
        const currentIndex = activeIndexRef.current;
        const inDrivenSpan = browseEndIndex != null && currentIndex <= browseEndIndex;

        // Free-mode left us on slide 1/2 while scroll still sits at the handoff:
        // park vertical scroll to the current slide instead of jumping forward to 3.
        if (inDrivenSpan && currentIndex < targetIndex && onSlideRequest) {
            onSlideRequest(
                currentIndex,
                browseProgressForSlide(swiperInstance, currentIndex),
                true,
                "sync"
            );
            return;
        }

        syncSwiperToProgress(p);
    }, [
        isScrollDriven,
        browseActive,
        swiperInstance,
        isInPlace,
        browseProgress,
        syncSwiperToProgress,
        indexForProgress,
        browseEndIndex,
        onSlideRequest,
    ]);

    // Lock touch + grab cursor during slide-in / desktop driven intro; unlock at
    // the handoff (and on mobile). Imperatively sync Swiper's grabCursor + classes
    // so the cursor can't stick after scroll-back into the slideshow.
    useEffect(() => {
        if (!swiperInstance || swiperInstance.destroyed) return;

        if (!isInPlace) {
            setSwiperGrabEnabled(swiperInstance, false);
            // Parent carouselX owns exit motion — park slides without fighting it.
            clearCatchupTransition(
                swiperInstance.wrapperEl,
                catchupAnimatingRef,
                catchupEndTimerRef
            );
            swiperInstance.setTranslate(0);
            swiperInstance.updateProgress();
            activeIndexRef.current = 0;
            if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
            setActiveIndex(0);
            return;
        }

        setSwiperGrabEnabled(swiperInstance, canGrab);

        // Desktop handoff (driven → free): snap to the current slide's snap point so
        // free-mode momentum starts cleanly (translate was set directly while driving).
        if (browseActive === false) {
            swiperInstance.slideTo(swiperInstance.activeIndex, 0);
        }
    }, [isInPlace, browseActive, swiperInstance, canGrab]);

    // Cleanup nav lock and scroll-stop timeouts on unmount
    useEffect(
        () => () => {
            if (userNavLockRef.current) clearTimeout(userNavLockRef.current);
            if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
            if (catchupEndTimerRef.current) clearTimeout(catchupEndTimerRef.current);
        },
        []
    );

    if (slideCount === 0) return null;

    return (
        <Box
            as="section"
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={{ base: 6, md: 12 }}
            aria-roledescription="carousel"
            aria-label="History timeline slides"
        >
            <Box
                data-lenis-prevent-horizontal
                width="100%"
                flexShrink={0}
                px={{
                    base: "max(calc((100vw - var(--breakpoints-xxl)) / 2 + 1.25rem), 1.25rem)",
                    md: "max(calc((100vw - var(--breakpoints-xxl)) / 2 + 2.5rem), 2.5rem)",
                }}
                // Kill native <img> ghost-drag (Swiper touch is already gated by canGrab).
                onDragStart={(e: React.DragEvent) => e.preventDefault()}
                onFocus={(e: React.FocusEvent) => {
                    // Neutralize browser auto-scroll on overflow:hidden ancestors
                    // (always — regardless of carousel state).
                    resetAncestorScrollLeft((e.currentTarget as HTMLElement).parentElement);

                    if (!swiperInstance || swiperInstance.destroyed) return;
                    const focusedIndex = resolveSlideIndex(e.target as HTMLElement);
                    if (focusedIndex < 0) return;

                    // Ask the parent to align page scroll with this focus jump:
                    // - Still sliding in (!isInPlace): scroll into the browse range
                    // - Non-scroll-driven / handed off (desktop free, browseActive false):
                    //   park so native focus-scroll can't eject the sticky stage while
                    //   Swiper handles horizontal nav
                    if (
                        onSlideRequest &&
                        (!isInPlace || !isScrollDriven || browseActive === false)
                    ) {
                        onSlideRequest(
                            focusedIndex,
                            browseProgressForSlide(swiperInstance, focusedIndex),
                            undefined,
                            "focus"
                        );
                        armUserNavLock();
                        // Driven mode: browseProgress owns position — skip slideTo.
                        if (isScrollDriven && browseActive !== false) return;
                    }

                    if (focusedIndex === activeIndexRef.current) return;
                    swiperInstance.slideTo(focusedIndex);
                }}
            >
                <Carousel
                    modules={[CarouselA11y, CarouselKeyboard, CarouselFreeMode]}
                    keyboard={{ enabled: true }}
                    freeMode={{ enabled: true, sticky: true, momentumRatio: 0.2 }}
                    slidesPerView={1.1}
                    spaceBetween={32}
                    breakpoints={{
                        [BREAKPOINT_MD_PX]: {
                            slidesPerView: 1.3,
                        },
                    }}
                    centeredSlides={false}
                    allowTouchMove={canGrab}
                    speed={550}
                    longSwipesRatio={0.15}
                    shortSwipes={true}
                    grabCursor={canGrab}
                    onSwiper={setSwiperInstance}
                    onTransitionEnd={(swiper) => {
                        if (!isScrollDriven) return;
                        // Free interaction after the handoff must not drag the page.
                        if (browseActive === false) return;
                        if (userNavLockRef.current) return;
                        if (!onSlideRequest) return;
                        const idx = swiper.activeIndex;
                        onSlideRequest(idx, browseProgressForSlide(swiper, idx), true, "sync");
                    }}
                    onSlideChange={(swiper) => {
                        const newIndex = swiper.activeIndex;
                        activeIndexRef.current = newIndex;
                        if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
                        setActiveIndex(newIndex);

                        if (userNavLockRef.current) return;
                        if (isScrollDriven && browseActive !== false && onSlideRequest) {
                            onSlideRequest(
                                newIndex,
                                browseProgressForSlide(swiper, newIndex),
                                undefined,
                                "sync"
                            );
                            armUserNavLock();
                        }
                    }}
                    overflow="visible"
                    style={{ width: "100%" }}
                    sx={{
                        "& .swiper-wrapper": {
                            alignItems: "flex-start",
                            cursor: canGrab ? "grab" : "default",
                            userSelect: "none",
                        },
                        "& .swiper-wrapper:active": {
                            cursor: canGrab ? "grabbing" : "default",
                        },
                        // Native image drag still works when allowTouchMove is false —
                        // block the browser ghost so inactive/driven slides can't be yanked.
                        "& img": {
                            WebkitUserDrag: "none",
                            userSelect: "none",
                        },
                    }}
                >
                    {items.map(
                        (item, index) =>
                            item && (
                                <CarouselSlide
                                    key={item.sys.id}
                                    borderRadius="ndlRadiusSlide"
                                    overflow="hidden"
                                    width="100%"
                                >
                                    <Box width="100%" overflow="hidden">
                                        <PartHistoryCarouselItem
                                            {...(item as CarouselItem)}
                                            isActive={isInPlace && index === activeIndex}
                                            isDesktop={isDesktop}
                                            isShortViewport={isShortViewport}
                                            reducedMotion={reducedMotion}
                                            counterStartDelayMs={0}
                                            isPriority={index === 0}
                                            preload={
                                                index >= activeIndex - PRELOAD_BEHIND &&
                                                index <= activeIndex + PRELOAD_AHEAD
                                            }
                                        />
                                    </Box>
                                </CarouselSlide>
                            )
                    )}
                </Carousel>
            </Box>
            <WrapperContainer
                display="flex"
                justifyContent="center"
                pointerEvents={canGrab ? "auto" : "none"}
                aria-hidden={!canGrab}
                sx={
                    canGrab
                        ? undefined
                        : {
                              // Descendants default to pointer-events:auto / cursor:pointer,
                              // which re-enable hover under a none parent — force both off.
                              "& *": {
                                  pointerEvents: "none !important",
                                  cursor: "default !important",
                              },
                          }
                }
                onPointerDownCapture={canGrab ? undefined : blockPaginationInteraction}
                onClickCapture={canGrab ? undefined : blockPaginationInteraction}
            >
                <NdlCarouselPagination
                    swiper={swiperInstance}
                    slideCount={slideCount}
                    activeSlideIndex={activeIndex}
                    motionStyle={paginationMotionStyle}
                    onNavigate={trackCarouselNavigation}
                />
            </WrapperContainer>
        </Box>
    );
};
