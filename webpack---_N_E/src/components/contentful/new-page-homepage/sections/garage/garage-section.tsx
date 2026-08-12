import { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useTransform } from "framer-motion";
import { MotionBox, Box } from "@project/ui";
import dynamic from "next/dynamic";
import { useLenis } from "lenis/react";
import { SECTION_IDS } from "../../configs/waypoints.config";
import type { NewPageHomepageFieldsFragment } from "@/components/contentful/new-page-homepage/__generated/page-homepage.contentful.generated";
import type { ScrubPlayerHandle } from "../../components/scrub-player/types";
import { useVideoSources } from "../../hooks/use-video-sources";
import { HOMEPAGE_VIDEOS } from "../../configs/video-sources.config";
import { WrapperContainer } from "@/components/wrapper-container";
import { DashboardContentWrapper } from "@/components/contentful/dashboard/dashboard-content-wrapper";
import { useIsDashboardOpen } from "@/store/app-store";
import { GarageTitle } from "./garage-title";
import { GaragePoster } from "./garage-poster";
import { useHomepageMotionPref } from "../../homepage-responsive-context";
import { MOBILE_DOCK_BOTTOM, safeAreaGutterSx } from "../../configs/layout.config";
import { ScrubPlayer } from "../../components/scrub-player/scrub-player";

const DashboardWidgetLauncher = dynamic(
    () =>
        import("@/components/contentful/dashboard/dashboard-widget-launcher").then((m) => ({
            default: m.DashboardWidgetLauncher,
        })),
    {
        ssr: false,
        loading: () => (
            <Box
                w={{ base: "95px", ndlDashboardGrid: "125px" }}
                h={{ base: "95px", ndlDashboardGrid: "125px" }}
            />
        ),
    }
);

const VIDEO_DURATION = 5;
const VIDEO_LOOP_DURATION = 3;
const CLOSE_ANIMATION_DURATION = 1330;
const SCRUB_VH_PER_SECOND = 120;
const BUFFER_VH = 0;
const TOTAL_VH = VIDEO_DURATION * SCRUB_VH_PER_SECOND + BUFFER_VH;
const SCRUB_END = (VIDEO_DURATION * SCRUB_VH_PER_SECOND) / TOTAL_VH;

const SECTION_ID = SECTION_IDS.garage;
const INITIAL_LOOP = { from: 0, to: VIDEO_LOOP_DURATION } as const;
const POSTER_FRAME_POLL_MS = 250;
const POSTER_FADE_MS = 500;

const outerHeightSx = {
    height: `${TOTAL_VH}vh`,
} as const;

const innerHeightSx = {
    height: "100svh",
} as const;

type GarageSectionProps = Pick<NewPageHomepageFieldsFragment, "title"> & {
    /** Fired once, the first time the garage hero paints a real video frame. Drives the page loader's reveal gate (see homepage-loader.tsx). */
    onHeroReady?: () => void;
    /** True while the page loader is still up. Kills the 500ms load-defer below so the loader owns first paint and the fsv stream starts immediately instead of waiting. */
    loaderActive?: boolean;
};

const GarageSection = ({ title, onHeroReady, loaderActive }: GarageSectionProps) => {
    const sources = useVideoSources(HOMEPAGE_VIDEOS.garage);
    const isDashboardOpen = useIsDashboardOpen();
    const { prefersReducedMotion } = useHomepageMotionPref();
    const playerRef = useRef<ScrubPlayerHandle>(null);
    const heroReadyFiredRef = useRef(false);
    const [posterVisible, setPosterVisible] = useState(true);
    const [isDashboardAnimating, setIsDashboardAnimating] = useState(false);

    // Defer FSV loading until after initial paint so critical above-the-fold
    // resources (fonts, hero images) are not competing with video decode.
    // Skip entirely when reduced motion is preferred — no video will animate.
    const [shouldLoad, setShouldLoad] = useState(false);
    useEffect(() => {
        if (prefersReducedMotion) return;
        if (loaderActive) {
            setShouldLoad(true);
            return;
        }
        const timer = setTimeout(() => setShouldLoad(true), 500);
        return () => clearTimeout(timer);
    }, [prefersReducedMotion, loaderActive]);

    // Safety net for a missed onFirstFrame callback (backend demotion chains,
    // RVFC races): poll for an actually-painted frame and hide the poster only
    // then. Never hide on a bare timeout — until a frame is on the canvas
    // there is nothing behind the poster, and hiding it early is exactly the
    // white flash this guards against. If no frame ever paints (video failed
    // entirely) the poster simply stays: a static hero beats a blank one.
    useEffect(() => {
        if (!posterVisible || prefersReducedMotion) return;
        const interval = setInterval(() => {
            if (playerRef.current?.hasRenderedFrame()) {
                setPosterVisible(false);
            }
        }, POSTER_FRAME_POLL_MS);
        return () => clearInterval(interval);
    }, [posterVisible, prefersReducedMotion]);

    // Use a ref to read current animating state without adding it as a dep.
    const isDashboardAnimatingRef = useRef(false);
    isDashboardAnimatingRef.current = isDashboardAnimating;

    useEffect(() => {
        if (isDashboardOpen) {
            setIsDashboardAnimating(true);
        } else if (isDashboardAnimatingRef.current) {
            const timer = setTimeout(
                () => setIsDashboardAnimating(false),
                CLOSE_ANIMATION_DURATION
            );
            return () => clearTimeout(timer);
        }
    }, [isDashboardOpen]);

    const containerRef = useRef<HTMLDivElement>(null);
    const lastProgressRef = useRef(0);
    const scrollUpStartRef = useRef<number | null>(null);
    const scrollUpProgressRef = useRef(0);
    const pendingSeekTimeRef = useRef<number | null>(null);
    const seekRafRef = useRef<number | undefined>(undefined);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Remap to section-relative progress: title fades over the first ~10% of the
    // 750vh section (≈75vh of scroll), independent of viewport height in px.
    const contentY = useTransform(scrollYProgress, [0, 0.1], [0, 100]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    // Fade the bottom shadow away in lockstep with the title/dashboard content
    // (same [0, 0.1] window), starting from its resting 0.7 opacity.
    const shadowOpacity = useTransform(scrollYProgress, [0, 0.1], [0.7, 0]);

    const scrubProgress = useTransform(scrollYProgress, [0, SCRUB_END], [0, 1]);

    const scheduleSeek = useCallback((videoTime: number) => {
        pendingSeekTimeRef.current = Math.min(Math.max(videoTime, 0), VIDEO_DURATION);
        if (seekRafRef.current !== undefined) return;
        seekRafRef.current = requestAnimationFrame(() => {
            const time = pendingSeekTimeRef.current;
            if (time !== null && playerRef.current?.isReady()) {
                playerRef.current.seekToTime(time);
            }
            seekRafRef.current = undefined;
        });
    }, []);

    // Stable callback avoids tearing down the MotionValue subscription on every
    // render. The subscription is set up once and cleaned up on unmount.
    const handleScrubChange = useCallback(
        (raw: number) => {
            const progress = Math.min(raw, 1);
            const player = playerRef.current;
            if (!player?.isReady()) return;

            if (progress < 0.01) {
                scrollUpStartRef.current = null;
                player.startLoop(INITIAL_LOOP);
                lastProgressRef.current = progress;
                return;
            }

            player.stopLoop();
            const lastProgress = lastProgressRef.current;
            const isScrollingDown = progress > lastProgress;

            let videoTime: number;
            if (isScrollingDown) {
                scrollUpStartRef.current = null;
                videoTime = VIDEO_LOOP_DURATION + (VIDEO_DURATION - VIDEO_LOOP_DURATION) * progress;
            } else {
                const current = player.getCurrentTime() ?? 0;
                if (scrollUpStartRef.current === null) {
                    scrollUpStartRef.current = current;
                    scrollUpProgressRef.current = progress;
                }
                const start = scrollUpStartRef.current;
                const startProgress = scrollUpProgressRef.current;
                const t = startProgress > 0 ? progress / startProgress : 0;
                videoTime = VIDEO_LOOP_DURATION + (start - VIDEO_LOOP_DURATION) * t;
            }

            scheduleSeek(videoTime);
            lastProgressRef.current = progress;
        },
        [scheduleSeek]
    ); // eslint-disable-line react-hooks/exhaustive-deps

    // Re-seek after the player reloads (a breakpoint flip swaps the source
    // tier and every reload resets to frame 0 + restarts the intro loop).
    // Mirrors handleScrubChange's scroll-down mapping; near the section top
    // the freshly restarted initial loop is already the correct state.
    const restoreScrubPosition = useCallback(() => {
        const progress = Math.min(scrubProgress.get(), 1);
        const player = playerRef.current;
        if (!player?.isReady() || progress < 0.01) return;
        player.stopLoop();
        scrollUpStartRef.current = null;
        lastProgressRef.current = progress;
        scheduleSeek(VIDEO_LOOP_DURATION + (VIDEO_DURATION - VIDEO_LOOP_DURATION) * progress);
    }, [scrubProgress, scheduleSeek]);

    // eslint-disable-next-line sonarjs/cognitive-complexity -- scroll/scrub logic has inherent branching
    useEffect(() => {
        if (prefersReducedMotion) return;
        const unsubscribe = scrubProgress.on("change", handleScrubChange);
        return () => {
            unsubscribe();
            if (seekRafRef.current !== undefined) {
                cancelAnimationFrame(seekRafRef.current);
                seekRafRef.current = undefined;
            }
        };
    }, [scrubProgress, handleScrubChange, prefersReducedMotion]);

    const isDashboardActive = isDashboardOpen || isDashboardAnimating;

    const [isScrollFading, setIsScrollFading] = useState(false);
    const isScrollFadingRef = useRef(false);
    useEffect(() => {
        if (prefersReducedMotion) return;
        return scrollYProgress.on("change", (v) => {
            const fading = v > 0.01;
            if (fading !== isScrollFadingRef.current) {
                isScrollFadingRef.current = fading;
                setIsScrollFading(fading);
            }
        });
    }, [scrollYProgress, prefersReducedMotion]);

    const [contentInView, setContentInView] = useState(true);
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setContentInView(entry.isIntersecting),
            { rootMargin: "100px" }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Correct scroll position when keyboard focus wraps into this section
    // from below (e.g. after footer). The sticky container confuses the
    // browser's native scrollIntoView, landing at the section bottom instead
    // of its top.
    const lenis = useLenis();
    const lenisRef2 = useRef(lenis);
    lenisRef2.current = lenis;
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleFocusIn = (e: FocusEvent) => {
            const prev = e.relatedTarget as HTMLElement | null;
            if (prev && el.contains(prev)) return;

            const sectionTop = el.getBoundingClientRect().top + window.scrollY;
            const threshold = sectionTop + window.innerHeight;
            if (window.scrollY <= threshold) return;

            const currentLenis = lenisRef2.current;
            if (currentLenis) {
                currentLenis.scrollTo(sectionTop, { immediate: true });

                const guardUnsub = currentLenis.on("scroll", () => {
                    guardUnsub();
                    if (Math.abs(currentLenis.scroll - sectionTop) > 5) {
                        currentLenis.scrollTo(sectionTop, { immediate: true });
                    }
                });
                setTimeout(() => guardUnsub(), 300);
            }
        };
        el.addEventListener("focusin", handleFocusIn);
        return () => el.removeEventListener("focusin", handleFocusIn);
    }, []);

    const contentStyle = prefersReducedMotion
        ? { willChange: "auto" as const }
        : {
              y: contentY,
              opacity: contentOpacity,
              willChange: contentInView ? ("transform, opacity" as const) : ("auto" as const),
          };

    return (
        <Box
            as="section"
            aria-label="Garage"
            id={SECTION_ID}
            ref={containerRef}
            position="relative"
            sx={outerHeightSx}
        >
            <Box
                position={isDashboardActive ? "relative" : "sticky"}
                top="0"
                width="full"
                overflow="hidden"
                sx={innerHeightSx}
            >
                <Box
                    position="absolute"
                    inset="0"
                    zIndex={0}
                    pointerEvents="none"
                    style={{
                        opacity: posterVisible ? 1 : 0,
                        // The first frame matches the poster art, so a slower
                        // dissolve reads as seamless rather than a hard cut.
                        transition: `opacity ${POSTER_FADE_MS}ms ease`,
                    }}
                    aria-hidden="true"
                >
                    <GaragePoster />
                </Box>
                {/* Stream mode: ready after the manifest + first frame instead of
                    the full multi-MB download — the intro loop starts painting
                    while later frames buffer in the background. The black
                    background backstops any repaint gap so the page background
                    can never flash through the transparent canvas. */}
                <ScrubPlayer
                    ref={playerRef}
                    sources={sources}
                    load={shouldLoad ? "auto" : "none"}
                    loadMode="full"
                    initialLoop={INITIAL_LOOP}
                    onFirstFrame={() => {
                        setPosterVisible(false);
                        restoreScrubPosition();
                        if (!heroReadyFiredRef.current) {
                            heroReadyFiredRef.current = true;
                            onHeroReady?.();
                        }
                    }}
                    zIndex={-1}
                    bg="porscheBlack"
                />
                <MotionBox
                    position="absolute"
                    bottom="0"
                    left="0"
                    width="100%"
                    height="50%"
                    bgGradient="linear-gradient(to bottom, transparent, porscheBlack)"
                    zIndex={0}
                    aria-hidden="true"
                    style={prefersReducedMotion ? { opacity: 0.7 } : { opacity: shadowOpacity }}
                />

                <DashboardContentWrapper>
                    <MotionBox
                        position="absolute"
                        left="0"
                        right="0"
                        bottom="0"
                        pt={12}
                        pb={{ base: MOBILE_DOCK_BOTTOM, md: 20 }}
                        zIndex={1500}
                        pointerEvents="none"
                        style={contentStyle}
                    >
                        <WrapperContainer
                            position="relative"
                            pb={{ base: 4, l: 0 }}
                            sx={safeAreaGutterSx}
                        >
                            <DashboardWidgetLauncher
                                heroHasVideoAsset={false}
                                bottom={0}
                                right={{ base: "auto", ndlDashboardGrid: 10 }}
                                pointerEvents={isScrollFading ? "none" : "auto"}
                            />
                            <GarageTitle isDashboardOpen={isDashboardOpen ?? false}>
                                {title}
                            </GarageTitle>
                        </WrapperContainer>
                    </MotionBox>
                </DashboardContentWrapper>
            </Box>
        </Box>
    );
};

GarageSection.displayName = "GarageSection";

export { GarageSection };
