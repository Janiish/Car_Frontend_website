import { memo, useRef, useEffect, useState, useMemo, useCallback } from "react";
import { AnimatePresence, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { useRouter } from "next/router";
import { MotionBox, Box, Flex, mediaQueryMinWidth } from "@project/ui";
import { useAppStore } from "@/store/app-store";
import { PAGMSHEvents, PAGMSHModuleNames, sendPagDataToGTM } from "@/lib/google-tag-manager/events";
import { warmVideoCache } from "@/lib/video/warm-video-cache";
import { SECTION_IDS } from "../../configs/waypoints.config";
import { MOBILE_DOCK_BOTTOM, safeAreaGutterSx } from "../../configs/layout.config";

import { ScrubPlayer } from "../../components/scrub-player/scrub-player";
import type { ScrubPlayerHandle } from "../../components/scrub-player/types";
import {
    useScrollytellingActions,
    useScrollytellingSelector,
    useScrollytellingGetState,
} from "../../scrolllytelling-context";
import {
    CarDashboardLayoutProvider,
    useCarDashboardLayoutActions,
    useCarDashboardViewState,
    useLayoutReady,
} from "./car-dashboard-layout-context";
import { CarDashboardWidgetLauncher } from "./car-dashboard-widget-launcher";
import dynamic from "next/dynamic";

const CarDashboardGrid = dynamic(
    () => import("./car-dashboard-grid").then((m) => ({ default: m.CarDashboardGrid })),
    { ssr: false }
);
import { CarsSelector } from "./cars-selector";
import { useVideoHotspotLayout } from "../../hooks/use-video-hotspot-layout";
import { useCarsSectionPhase } from "../../hooks/use-cars-section-phase";
import { useCarTabSwitch, CAR_CROSSFADE_MS } from "../../hooks/use-car-tab-switch";
import { useCarScrollProgress } from "../../hooks/use-car-scroll-progress";
import {
    useHotspotTracking,
    HOTSPOT_FRONT_RANGE,
    HOTSPOT_BACK_RANGE,
} from "../../hooks/use-hotspot-tracking";
import { CarHotspotsSlider } from "./car-hotspots-slider";
import { CarHotspotToggle } from "./car-hotspot-toggle";
import { useHomepageBreakpoints, useHomepageMotionPref } from "../../homepage-responsive-context";

import {
    carThemes,
    resolveCarTheme,
    selectTabSources,
    CARS_SECTION_INDEX,
    VIDEO_ASPECT_RATIO,
    SCRUB_SCROLL_VH,
    getSlideUpProps,
    type CarsSectionProps,
} from "./cars-config";
import { extractHotspots, selectVisibleHotspots, type ActiveHotspotSet } from "./car-hotspot-data";
import { CarHotspotsOverlay } from "./car-hotspots-overlay";
import { easeOutStrong, easeDecelerate, cssBezier } from "../../configs/motion-tokens";
import {
    CAR_LOADER_LOTTIE_SIZE,
    CAR_LOADER_LOTTIE_SPEED,
    CAR_LOADER_GRACE_MS,
    CAR_LOADER_ENTER_MS,
    CAR_LOADER_EXIT_MS,
} from "../../configs/loader-tokens";
import { useDelayedFlag } from "../../hooks/use-delayed-flag";
import { LoaderLottie } from "../../components/loader-lottie";

const INITIAL_CAR_WARMUP_DELAY_MS = 2500;

// ---------------------------------------------------------------------------

const CarsSectionContent = memo(function CarsSectionContent({
    loaderActive,
    onInitialCarReady,
    ...props
}: CarsSectionProps) {
    const { isDesktopL } = useHomepageBreakpoints();
    const carsItems = useMemo(
        () => (props.carsSectionCarsCollection?.items ?? []).filter((c) => c != null),
        [props.carsSectionCarsCollection?.items]
    );
    const tabSources = useMemo(
        () => selectTabSources(carsItems, isDesktopL),
        [carsItems, isDesktopL]
    );

    const { locale } = useRouter();
    const {
        state: { pageType, pageId, pageContentTags },
    } = useAppStore();

    const layoutReady = useLayoutReady();
    const { isInView } = useCarDashboardViewState();
    const { setIsInView } = useCarDashboardLayoutActions();
    const lenis = useLenis();
    const { scrollToWaypoint } = useScrollytellingActions();
    const getScrollytellingState = useScrollytellingGetState();
    const [selectedCarIndex, setSelectedCarIndex] = useState(0);
    const [tabsVisible, setTabsVisible] = useState(false);

    const activeCar3d = carsItems[selectedCarIndex];
    const activeCarConfig = carThemes[resolveCarTheme(activeCar3d?.theme)];
    const activeCarHotspots = useMemo(() => extractHotspots(activeCar3d), [activeCar3d]);

    const { isDesktopL: isDesktop, isMobileLandscape } = useHomepageBreakpoints();
    const { prefersReducedMotion } = useHomepageMotionPref();
    const isDesktopRef = useRef(isDesktop);
    useEffect(() => {
        isDesktopRef.current = isDesktop;
    }, [isDesktop]);

    const sliderHotspots = useMemo(
        () => [...activeCarHotspots.front, ...activeCarHotspots.back],
        [activeCarHotspots]
    );
    const [hotspotsVisible, setHotspotsVisible] = useState(true);
    const [focusedHotspotSet, setFocusedHotspotSet] = useState<ActiveHotspotSet>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentOverlayRef = useRef<HTMLDivElement>(null);
    const viewportContainerRef = useRef<HTMLDivElement>(null);

    const [scrubVisible, setScrubVisible] = useState(false);
    const scrubVisibleRef = useRef(false);

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (!scrubVisibleRef.current && entries[0]?.isIntersecting) {
                    scrubVisibleRef.current = true;
                    setScrubVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const slotHandlesRef = useRef<(ScrubPlayerHandle | null)[]>([null, null]);
    const elementRefs = useRef<Map<string, HTMLElement>>(new Map());

    const handlePrefetchCar = useCallback(
        (index: number) => {
            if (index === selectedCarIndex) return;
            const source = tabSources[index];
            const url = source?.fsv ?? source?.mp4;
            if (url) warmVideoCache(url);
        },
        [selectedCarIndex, tabSources]
    );

    // Warm the HTTP cache for the initially selected car well before the
    // section scrolls in, so the player's first frame is near-instant. Delayed
    // to keep it off the garage hero's critical path; skipped once the section
    // is close enough that the player is loading the file itself.
    useEffect(() => {
        const source = tabSources[selectedCarIndex];
        const url = source?.fsv ?? source?.mp4;
        if (!url) return;
        const timer = setTimeout(() => {
            if (scrubVisibleRef.current) return;
            const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
                .connection;
            if (connection?.saveData) return;
            warmVideoCache(url);
        }, INITIAL_CAR_WARMUP_DELAY_MS);
        return () => clearTimeout(timer);
    }, [tabSources, selectedCarIndex]);

    const { relayout, metrics: hotspotMetrics } = useVideoHotspotLayout(
        VIDEO_ASPECT_RATIO,
        elementRefs,
        viewportContainerRef,
        isDesktop
    );

    // Both pool slots register their canvas so the hotspot layout cover-fit
    // styles apply to the incoming player before it fades in, not just the
    // active one. Hotspot positions come from the shared metrics, not from a
    // specific element, so the key only needs to be unique per slot.
    const setSlot0Handle = useCallback(
        (handle: ScrubPlayerHandle | null) => {
            slotHandlesRef.current[0] = handle;
            const el = handle?.element ?? null;
            if (el) elementRefs.current.set("car-0", el);
            else elementRefs.current.delete("car-0");
            relayout();
        },
        [relayout]
    );
    const setSlot1Handle = useCallback(
        (handle: ScrubPlayerHandle | null) => {
            slotHandlesRef.current[1] = handle;
            const el = handle?.element ?? null;
            if (el) elementRefs.current.set("car-1", el);
            else elementRefs.current.delete("car-1");
            relayout();
        },
        [relayout]
    );
    const slotRefCallbacks = [setSlot0Handle, setSlot1Handle] as const;
    const reachedCarsSection = useScrollytellingSelector(
        (s) => s.position.sectionIndex >= CARS_SECTION_INDEX
    );

    const isInViewRef = useRef(isInView);
    isInViewRef.current = isInView;

    const { scrollYProgress, exitProgress, entryProgress } = useCarScrollProgress(
        containerRef,
        wrapperRef
    );
    const activeHotspotSet = useHotspotTracking(
        scrollYProgress,
        setIsInView,
        setTabsVisible,
        isInViewRef
    );
    const effectiveHotspotSet: ActiveHotspotSet = focusedHotspotSet ?? activeHotspotSet;

    const { parallaxY, isFixed, isVisible } = useCarsSectionPhase(
        containerRef,
        wrapperRef,
        scrollYProgress,
        entryProgress,
        exitProgress
    );

    const scrubProgress = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

    const {
        slotCars,
        activeSlot,
        incomingSlot,
        incomingRevealed,
        handleTabChange,
        onSlotFirstFrame,
        mobileTabSwitchRef,
        tabSwitchRef,
    } = useCarTabSwitch({
        selectedCarIndex,
        setSelectedCarIndex,
        tabSources,
        isDesktopRef,
        setIsInView,
        scrubProgress,
        containerRef,
        slotHandlesRef,
        lenis,
        getScrollytellingState,
        scrollToWaypoint,
    });

    const isSwitchWaiting = incomingSlot !== null && !incomingRevealed;
    const showCarLoader = useDelayedFlag(isSwitchWaiting, CAR_LOADER_GRACE_MS);

    const initialCarReadyFiredRef = useRef(false);
    const onInitialCarReadyRef = useRef(onInitialCarReady);
    onInitialCarReadyRef.current = onInitialCarReady;

    const handleSlot0FirstFrame = useCallback(() => {
        onSlotFirstFrame(0);
        if (!initialCarReadyFiredRef.current) {
            initialCarReadyFiredRef.current = true;
            onInitialCarReadyRef.current?.();
        }
    }, [onSlotFirstFrame]);
    const handleSlot1FirstFrame = useCallback(() => onSlotFirstFrame(1), [onSlotFirstFrame]);
    const slotFirstFrameCallbacks = [handleSlot0FirstFrame, handleSlot1FirstFrame] as const;

    const handleCarChange = useCallback(
        (index: number) => {
            const car3d = carsItems?.[index];
            const carName =
                car3d?.displayName ??
                (car3d?.car?.__typename === "Car" ? car3d.car.name : undefined);

            sendPagDataToGTM({
                eventAction: PAGMSHEvents.carSelectorClick,
                locale: locale!,
                pageExperience: {
                    pageCategory: pageType,
                    contentTags: pageContentTags ?? [],
                },
                context: {
                    moduleName: PAGMSHModuleNames.carsSection,
                },
                componentClick: {
                    clickElementType: "interaction",
                    clickElementId: pageId,
                    clickElementName: `Car tab: ${carName ?? ""}`,
                },
            });

            handleTabChange(index);
        },
        [carsItems, locale, pageType, pageId, pageContentTags, handleTabChange]
    );

    useEffect(() => {
        if (tabSwitchRef.current) {
            tabSwitchRef.current = false;
            if (reachedCarsSection) setTabsVisible(true);
            return;
        }
        if (!reachedCarsSection && !mobileTabSwitchRef.current) {
            setIsInView(false);
        }
    }, [reachedCarsSection, setIsInView]); // eslint-disable-line react-hooks/exhaustive-deps

    const shouldAnimate = layoutReady && isInView;

    // ---------------------------------------------------------------------------
    // Keyboard focus → scroll + scrub sync for hotspot groups
    // ---------------------------------------------------------------------------

    const scrollToHotspotSet = useCallback(
        (set: "front" | "back") => {
            const el = containerRef.current;
            if (!el) return;
            const range = set === "front" ? HOTSPOT_FRONT_RANGE : HOTSPOT_BACK_RANGE;
            const inset = (range[1] - range[0]) * 0.08;
            const targetProgress = range[0] + inset;
            const scrollableRange = el.offsetHeight - window.innerHeight;
            const containerTop = window.scrollY + el.getBoundingClientRect().top;
            const targetScrollY = containerTop + targetProgress * scrollableRange;

            if (lenis) {
                lenis.scrollTo(targetScrollY, { duration: 0.8, lock: true });
            } else {
                window.scrollTo({ top: targetScrollY, behavior: "smooth" });
            }
        },
        [lenis]
    );

    const handleSentinelFocus = useCallback(
        (set: "front" | "back") => {
            setFocusedHotspotSet(set);
            setIsInView(true);
            setTabsVisible(true);
            scrollToHotspotSet(set);
        },
        [setIsInView, scrollToHotspotSet]
    );

    const handleHotspotOverlayBlur = useCallback((e: React.FocusEvent) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setFocusedHotspotSet(null);
        }
    }, []);

    const visibleHotspots = useMemo(
        () => selectVisibleHotspots(hotspotsVisible, effectiveHotspotSet, activeCarHotspots),
        [effectiveHotspotSet, activeCarHotspots, hotspotsVisible]
    );

    useEffect(() => {
        relayout();
    }, [relayout, visibleHotspots, selectedCarIndex]);

    const scrollHeight = `${SCRUB_SCROLL_VH * 100 + 220}vh`;

    return (
        <Box
            as="section"
            aria-label="Cars"
            id={SECTION_IDS.cars}
            ref={wrapperRef}
            position="relative"
            zIndex="20"
            marginTop="-50vh"
        >
            <MotionBox
                ref={containerRef}
                position="relative"
                style={{ height: scrollHeight, y: isFixed || prefersReducedMotion ? 0 : parallaxY }}
                transformTemplate={isFixed ? () => "none" : undefined}
            >
                <Box
                    ref={viewportContainerRef}
                    position={isFixed ? "fixed" : "sticky"}
                    {...(isFixed ? { inset: 0 } : { top: "0" })}
                    zIndex="10"
                    height="100svh"
                    width="full"
                    overflow="hidden"
                    bg="porscheBlack"
                    transition="opacity 0.3s ease-in-out"
                    opacity={isVisible ? 1 : 0}
                    pointerEvents={isVisible ? "auto" : "none"}
                >
                    {tabSources &&
                        ([0, 1] as const).map((slot) => {
                            const slotCar = slotCars[slot];
                            const sources = slotCar !== null ? tabSources[slotCar] : undefined;
                            if (!sources) return null;
                            const isActive = activeSlot === slot;
                            const isIncoming = incomingSlot === slot;
                            const visible = isIncoming ? incomingRevealed : isActive;
                            const shouldLoad =
                                (isActive || isIncoming) &&
                                (scrubVisible ||
                                    (loaderActive && isActive) ||
                                    (isActive && initialCarReadyFiredRef.current));
                            return (
                                <Box
                                    key={slot}
                                    position="absolute"
                                    inset="0"
                                    style={{
                                        opacity: visible ? 1 : 0,
                                        transition: isIncoming
                                            ? `opacity ${CAR_CROSSFADE_MS}ms ${cssBezier(easeOutStrong)}`
                                            : "none",
                                        zIndex: isIncoming ? 1 : 0,
                                    }}
                                >
                                    <ScrubPlayer
                                        ref={slotRefCallbacks[slot]}
                                        sources={sources}
                                        load={shouldLoad ? "auto" : "none"}
                                        loadMode="full"
                                        onFirstFrame={slotFirstFrameCallbacks[slot]}
                                    />
                                </Box>
                            );
                        })}

                    <AnimatePresence>
                        {showCarLoader && (
                            <MotionBox
                                key="car-switch-loader"
                                position="absolute"
                                inset="0"
                                zIndex={2}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                pointerEvents="none"
                                role="status"
                                aria-label="Loading car"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: {
                                        duration: CAR_LOADER_ENTER_MS / 1000,
                                        ease: easeDecelerate,
                                    },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: {
                                        duration: CAR_LOADER_EXIT_MS / 1000,
                                        ease: easeDecelerate,
                                    },
                                }}
                            >
                                <LoaderLottie
                                    size={CAR_LOADER_LOTTIE_SIZE}
                                    speed={CAR_LOADER_LOTTIE_SPEED}
                                    static={prefersReducedMotion}
                                />
                            </MotionBox>
                        )}
                    </AnimatePresence>

                    <CarHotspotsOverlay
                        shouldAnimate={shouldAnimate}
                        isVisible={isVisible}
                        hotspotsVisible={hotspotsVisible}
                        effectiveHotspotSet={effectiveHotspotSet}
                        selectedCarIndex={selectedCarIndex}
                        prefersReducedMotion={prefersReducedMotion}
                        hotspotMetrics={hotspotMetrics}
                        activeCarHotspots={activeCarHotspots}
                        onSentinelFocus={handleSentinelFocus}
                        onOverlayBlur={handleHotspotOverlayBlur}
                    />

                    <Flex
                        ref={contentOverlayRef}
                        position="absolute"
                        inset="0"
                        direction="column"
                        gap={4}
                        pt={{ base: 5, l: 0 }}
                        // MOBILE_DOCK_BOTTOM is 0px now; the docked slider/launcher
                        // still needs breathing space above the viewport edge here
                        pb={{ base: `calc(${MOBILE_DOCK_BOTTOM} + 16px)`, l: 0 }}
                        sx={{
                            ...safeAreaGutterSx,
                            [mediaQueryMinWidth.l]: {
                                paddingInlineStart: 0,
                                paddingInlineEnd: 0,
                            },
                        }}
                    >
                        <MotionBox
                            position="absolute"
                            bottom={{ base: "auto", l: 12 }}
                            top={{ base: "76px", l: "auto" }}
                            left={0}
                            right={0}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            zIndex="10"
                            {...getSlideUpProps(tabsVisible, prefersReducedMotion)}
                        >
                            <Flex alignItems="center" gap="2" width={{ base: "full", l: "auto" }}>
                                {isDesktop && (
                                    <CarHotspotToggle
                                        hotspotsVisible={hotspotsVisible}
                                        visible={effectiveHotspotSet !== null}
                                        onToggle={() => setHotspotsVisible((v) => !v)}
                                    />
                                )}
                                {!isMobileLandscape && (
                                    <CarsSelector
                                        cars={carsItems}
                                        activeCarIndex={selectedCarIndex}
                                        onCarChange={handleCarChange}
                                        onPrefetchCar={handlePrefetchCar}
                                        highlightColor={activeCarConfig.highlightColor}
                                        highlightTextColor={activeCarConfig.highlightTextColor}
                                    />
                                )}
                                {isDesktop && (
                                    <CarDashboardWidgetLauncher
                                        car3d={activeCar3d}
                                        selfAnimated={false}
                                    />
                                )}
                            </Flex>
                        </MotionBox>

                        <Box flex="1" />

                        {!isDesktop && !isMobileLandscape && (
                            <Flex direction="column" gap={4}>
                                <MotionBox
                                    {...getSlideUpProps(shouldAnimate, prefersReducedMotion, true)}
                                >
                                    <CarHotspotsSlider
                                        key={selectedCarIndex}
                                        hotspots={sliderHotspots}
                                    />
                                </MotionBox>

                                <CarDashboardWidgetLauncher car3d={activeCar3d} />
                            </Flex>
                        )}

                        <CarDashboardGrid
                            car3d={activeCar3d}
                            seriesTitle={props.carsSectionSeriesTitle}
                            titleNextEvent={props.carsSectionNextEventTitle}
                            titleLatestNews={props.carsSectionLatestNewsTitle}
                            labelNoSeries={props.carsSectionLabelNoSeries}
                            labelNoNewsEvents={props.carsSectionLabelNoNewsEvents}
                        />
                    </Flex>
                </Box>
            </MotionBox>
        </Box>
    );
});

CarsSectionContent.displayName = "CarsSectionContent";

const CarsSection = (props: CarsSectionProps) => (
    <CarDashboardLayoutProvider>
        <CarsSectionContent {...props} />
    </CarDashboardLayoutProvider>
);

CarsSection.displayName = "CarsSection";

export { CarsSection };
