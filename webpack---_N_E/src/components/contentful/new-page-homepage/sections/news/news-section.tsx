import {
    useRef,
    useEffect,
    useMemo,
    useState,
    memo,
    startTransition,
    type MutableRefObject,
    type RefObject,
} from "react";
import { useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import {
    MotionBox,
    Box,
    Flex,
    FluidTypography,
    NextImage,
    ScrollRevealTextAnimation,
    ScrollRevealTextAnimationContainer,
} from "@project/ui";
import colors from "@project/ui/src/design-tokens/01.colors/colors";
import { useHomepageBreakpoints, useHomepageMotionPref } from "../../homepage-responsive-context";
import type { NewPageHomepageFieldsFragment } from "@/components/contentful/new-page-homepage/__generated/page-homepage.contentful.generated";
import type { AllPageArticleCollectionByContentTagQuery } from "@/components/contentful/page-article/__generated/page-article.contentful.generated";
import { ScrubVideo } from "../../components/scrub-video";
import { useVideoSources } from "../../hooks/use-video-sources";
import { SECTION_IDS } from "../../configs/waypoints.config";
import { HOMEPAGE_VIDEOS } from "../../configs/video-sources.config";
import { WrapperContainer } from "@/components/wrapper-container";
import { NewsCard, type NewsCardItem } from "./news-card";

const MobileCarousel = dynamic(
    () => import("./news-carousel-mobile").then((m) => m.MobileCarousel),
    { ssr: false, loading: () => <Box minHeight="460px" aria-hidden /> }
);

const DesktopMarquee = dynamic(
    () => import("./news-carousel-desktop").then((m) => m.DesktopMarquee),
    { ssr: false, loading: () => <Box minHeight="538px" aria-hidden /> }
);

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MIN_ITEMS = 5;
const MAX_ITEMS = 15;
const CAROUSEL_VISIBILITY_DEBOUNCE_MS = 150;
const VIDEO_PAUSE_RESET_DEBOUNCE_MS = 250;
const INTERSECTION_OBSERVER_OPTIONS: IntersectionObserverInit = {
    rootMargin: "200px",
    threshold: [0, 0.1, 0.3],
};

type CarouselObserverRefs = {
    entranceFiredRef: MutableRefObject<boolean>;
    lastVisibilityRef: MutableRefObject<boolean>;
    visibilityTimerRef: MutableRefObject<ReturnType<typeof setTimeout> | undefined>;
    setCarouselEntranceReady: (value: boolean) => void;
    setIsCarouselVisible: (value: boolean) => void;
};

type VideoAreaObserverRefs = {
    playPromiseRef: MutableRefObject<Promise<void> | null>;
    reducedMotionRef: MutableRefObject<boolean>;
    pauseResetTimerRef: MutableRefObject<ReturnType<typeof setTimeout> | undefined>;
    videoRef: RefObject<HTMLVideoElement | null>;
    didUpgradePreloadRef: MutableRefObject<boolean>;
};

const handleCarouselEntrance = (
    entry: IntersectionObserverEntry,
    entranceFiredRef: MutableRefObject<boolean>,
    setCarouselEntranceReady: (value: boolean) => void
) => {
    if (entranceFiredRef.current) return;
    if (!entry.isIntersecting || entry.intersectionRatio <= 0.3) return;

    const { width, height } = entry.boundingClientRect;
    if (width <= 0 || height <= 0) return;

    entranceFiredRef.current = true;
    setCarouselEntranceReady(true);
};

const handleCarouselVisibilityChange = (
    entry: IntersectionObserverEntry,
    refs: Pick<
        CarouselObserverRefs,
        "lastVisibilityRef" | "visibilityTimerRef" | "setIsCarouselVisible"
    >
) => {
    const next = entry.isIntersecting;
    if (next === refs.lastVisibilityRef.current) return;

    refs.lastVisibilityRef.current = next;
    clearTimeout(refs.visibilityTimerRef.current);

    if (next) {
        startTransition(() => refs.setIsCarouselVisible(true));
        return;
    }

    refs.visibilityTimerRef.current = setTimeout(
        () => startTransition(() => refs.setIsCarouselVisible(false)),
        CAROUSEL_VISIBILITY_DEBOUNCE_MS
    );
};

const pauseVideo = (
    video: HTMLVideoElement,
    playPromiseRef: MutableRefObject<Promise<void> | null>
) => {
    const pending = playPromiseRef.current;
    if (pending) {
        pending.then(() => video.pause());
        playPromiseRef.current = null;
        return;
    }

    video.pause();
};

const resetVideoPosition = (video: HTMLVideoElement) => {
    video.currentTime = 0;
};

const handleVideoAreaIntersection = (
    entry: IntersectionObserverEntry,
    refs: VideoAreaObserverRefs
) => {
    const video = refs.videoRef.current;
    if (!video) return;

    if (entry.isIntersecting && !refs.didUpgradePreloadRef.current) {
        refs.didUpgradePreloadRef.current = true;
        const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
            .connection;
        if (!connection?.saveData) {
            video.preload = "auto";
        }
    }

    const isActuallyVisible = entry.isIntersecting && entry.intersectionRatio >= 0.1;

    if (isActuallyVisible) {
        clearTimeout(refs.pauseResetTimerRef.current);
        refs.pauseResetTimerRef.current = undefined;
        if (!refs.reducedMotionRef.current && video.paused) {
            refs.playPromiseRef.current = video.play().catch(() => undefined);
        }
        return;
    }

    if (!video.paused) {
        pauseVideo(video, refs.playPromiseRef);
    }

    refs.pauseResetTimerRef.current ??= setTimeout(() => {
        refs.pauseResetTimerRef.current = undefined;
        resetVideoPosition(video);
    }, VIDEO_PAUSE_RESET_DEBOUNCE_MS);
};

const createNewsSectionIntersectionHandler =
    (
        carousel: HTMLElement | null,
        area: HTMLElement | null,
        carouselRefs: CarouselObserverRefs,
        videoRefs: VideoAreaObserverRefs
    ) =>
    (entries: IntersectionObserverEntry[]) => {
        for (const entry of entries) {
            if (entry.target === carousel) {
                handleCarouselEntrance(
                    entry,
                    carouselRefs.entranceFiredRef,
                    carouselRefs.setCarouselEntranceReady
                );
                handleCarouselVisibilityChange(entry, carouselRefs);
            }

            if (entry.target === area) {
                handleVideoAreaIntersection(entry, videoRefs);
            }
        }
    };

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type NewsSectionProps = Pick<
    NewPageHomepageFieldsFragment,
    "newsSectionTitle" | "newsSectionTitle2" | "newsSectionCarouselItemsCollection"
> & {
    newsPages?: AllPageArticleCollectionByContentTagQuery["pages"] | null;
};

// ---------------------------------------------------------------------------
// NewsSection
// ---------------------------------------------------------------------------

const NewsSection = memo(function NewsSection({
    newsSectionTitle,
    newsSectionTitle2,
    newsSectionCarouselItemsCollection,
    newsPages,
}: NewsSectionProps) {
    const sources = useVideoSources(HOMEPAGE_VIDEOS.news);
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoAreaRef = useRef<HTMLDivElement>(null);

    // ---- Merge selected items + content-tag items (selected first, deduped) ----
    const newsItems = useMemo<NewsCardItem[]>(() => {
        const result: NewsCardItem[] = [];
        const seenIds = new Set<string>();

        for (const item of newsSectionCarouselItemsCollection?.items ?? []) {
            if (item === null) continue;
            result.push(item);
            if (item.sys?.id) seenIds.add(item.sys.id);
        }

        for (const item of newsPages?.items ?? []) {
            if (item === null || seenIds.has(item.sys?.id)) continue;
            result.push(item);
        }

        return result;
    }, [newsPages, newsSectionCarouselItemsCollection]);

    const validatedItems = useMemo(() => newsItems.slice(0, MAX_ITEMS), [newsItems]);
    const showCarousel = validatedItems.length >= MIN_ITEMS;
    const showFallbackGrid = !showCarousel && validatedItems.length > 0;

    // ---- Scroll-driven entry animation (parallax slide-up) ----
    const { scrollYProgress: entryProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"],
    });

    const parallaxY = useTransform(
        entryProgress,
        [0, 0.4, 0.7, 0.9, 1],
        ["50vh", "20vh", "6vh", "1vh", "0vh"]
    );

    const newsTitleLines = [newsSectionTitle?.trim(), newsSectionTitle2?.trim()].filter(
        Boolean
    ) as string[];

    // ---- Responsive breakpoint + reduced motion ----
    const { isDesktopMd: isDesktop } = useHomepageBreakpoints();
    const { prefersReducedMotion } = useHomepageMotionPref();
    const reducedMotionRef = useRef(prefersReducedMotion);
    reducedMotionRef.current = prefersReducedMotion;

    // ---- Carousel entrance + visibility ----
    const carouselWrapperRef = useRef<HTMLDivElement>(null);
    const [carouselEntranceReady, setCarouselEntranceReady] = useState(false);
    const [isCarouselVisible, setIsCarouselVisible] = useState(false);
    const visibilityTimerRef = useRef<ReturnType<typeof setTimeout>>();
    const lastVisibilityRef = useRef(false);
    const entranceFiredRef = useRef(false);

    const playPromiseRef = useRef<Promise<void> | null>(null);
    const pauseResetTimerRef = useRef<ReturnType<typeof setTimeout>>();
    const didUpgradePreloadRef = useRef(false);

    // Re-select sources when the breakpoint tier flips mid-session: React
    // only rewrites the <source src> attributes, and a live <video> never
    // re-evaluates its sources without an explicit load().
    const sourcesMountedRef = useRef(false);
    useEffect(() => {
        if (!sourcesMountedRef.current) {
            sourcesMountedRef.current = true;
            return;
        }
        const video = videoRef.current;
        if (!video) return;
        const wasPlaying = !video.paused;
        video.load();
        if (wasPlaying && !reducedMotionRef.current) {
            playPromiseRef.current = video.play().catch(() => undefined);
        }
    }, [sources.mp4, sources.webm]);

    // ---- Poster image (visible until a real frame paints, or permanently on error) ----
    const [posterVisible, setPosterVisible] = useState(true);
    const posterHiddenRef = useRef(false);

    const hidePosterOnFirstFrame = () => {
        if (reducedMotionRef.current || posterHiddenRef.current) return;
        const video = videoRef.current;
        if (video && "requestVideoFrameCallback" in HTMLVideoElement.prototype) {
            video.requestVideoFrameCallback(() => {
                posterHiddenRef.current = true;
                setPosterVisible(false);
            });
        } else {
            posterHiddenRef.current = true;
            setPosterVisible(false);
        }
    };

    const handleVideoError = () => {
        posterHiddenRef.current = false;
        setPosterVisible(true);
    };

    // ---- Single IO observing both carousel wrapper and video area ----
    useEffect(() => {
        const carousel = carouselWrapperRef.current;
        const area = videoAreaRef.current;
        const visibilityTimer = visibilityTimerRef;
        const pauseResetTimer = pauseResetTimerRef;

        if (videoRef.current && videoRef.current.readyState >= 2) {
            hidePosterOnFirstFrame();
        }

        if (!carousel && !area) return;

        const observer = new IntersectionObserver(
            createNewsSectionIntersectionHandler(
                carousel,
                area,
                {
                    entranceFiredRef,
                    lastVisibilityRef,
                    visibilityTimerRef,
                    setCarouselEntranceReady,
                    setIsCarouselVisible,
                },
                {
                    playPromiseRef,
                    reducedMotionRef,
                    pauseResetTimerRef,
                    videoRef,
                    didUpgradePreloadRef,
                }
            ),
            INTERSECTION_OBSERVER_OPTIONS
        );

        if (carousel) observer.observe(carousel);
        if (area) observer.observe(area);

        return () => {
            clearTimeout(visibilityTimer.current);
            clearTimeout(pauseResetTimer.current);
            observer.disconnect();
        };
    }, []);

    return (
        <Box
            as="section"
            aria-label="News"
            id={SECTION_IDS.news}
            ref={sectionRef}
            position="relative"
            zIndex="40"
            marginTop="-50vh"
            minHeight="100svh"
            sx={{
                contentVisibility: "auto",
                containIntrinsicSize: "0 calc(100vh + 535px)",
            }}
        >
            <MotionBox
                overflow="hidden"
                position="relative"
                minHeight="100svh"
                style={prefersReducedMotion ? undefined : { y: parallaxY }}
            >
                <Box
                    ref={videoAreaRef}
                    position="relative"
                    height="100svh"
                    width="full"
                    overflow="hidden"
                    backgroundColor="#08040b"
                    _after={{
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "40%",
                        background: "linear-gradient(to bottom, transparent, #08040b)",
                        zIndex: 1,
                        pointerEvents: "none",
                    }}
                >
                    <Box
                        position="absolute"
                        inset="0"
                        zIndex={0}
                        pointerEvents="none"
                        style={{
                            opacity: posterVisible ? 1 : 0,
                            transition: "opacity 0.3s ease",
                        }}
                        aria-hidden="true"
                    >
                        <NextImage
                            src="/homepage/news/news-poster.png"
                            alt=""
                            fill
                            sx={{ objectFit: "cover", objectPosition: "center" }}
                        />
                    </Box>
                    <ScrubVideo
                        ref={videoRef}
                        preload="metadata"
                        onCanPlay={hidePosterOnFirstFrame}
                        onLoadedData={hidePosterOnFirstFrame}
                        onError={handleVideoError}
                    >
                        {sources.webm && <source src={sources.webm} type="video/webm" />}
                        <source src={sources.mp4} type="video/mp4" onError={handleVideoError} />
                    </ScrubVideo>

                    <MotionBox
                        position="absolute"
                        top="12.2vh"
                        left="0"
                        right="0"
                        display="flex"
                        justifyContent="center"
                        overflow="visible"
                    >
                        <WrapperContainer display="flex" justifyContent="center">
                            <ScrollRevealTextAnimationContainer textColor={colors.allWhite}>
                                <FluidTypography
                                    as="h2"
                                    size="displaySmall"
                                    textAlign="center"
                                    whiteSpace="pre-line"
                                    overflow="visible"
                                    sx={{
                                        textWrap: "balance",
                                    }}
                                >
                                    {newsTitleLines.map((line) =>
                                        prefersReducedMotion ? (
                                            <span key={line}>{line}</span>
                                        ) : (
                                            <ScrollRevealTextAnimation
                                                key={line}
                                                entryProgress={entryProgress}
                                            >
                                                {line}
                                            </ScrollRevealTextAnimation>
                                        )
                                    )}
                                </FluidTypography>
                            </ScrollRevealTextAnimationContainer>
                        </WrapperContainer>
                    </MotionBox>
                </Box>

                {showCarousel && (
                    <Box
                        ref={carouselWrapperRef}
                        position="relative"
                        zIndex="1"
                        marginTop={{ base: "-30vh", md: "-30vh" }}
                    >
                        <Box
                            position="relative"
                            width="full"
                            background="linear-gradient(to bottom, transparent 0%, #08040b 12vh)"
                            px={{ base: 4, md: 10 }}
                            py={{ base: 6, md: 12 }}
                            overflow="hidden"
                            minHeight={{ base: "460px", md: "635px" }}
                        >
                            {isDesktop ? (
                                <DesktopMarquee
                                    items={validatedItems}
                                    play={isCarouselVisible}
                                    entranceReady={carouselEntranceReady}
                                />
                            ) : (
                                <MobileCarousel items={validatedItems} showNavigation />
                            )}
                        </Box>
                    </Box>
                )}

                {showFallbackGrid && (
                    <Box position="relative" zIndex="1" marginTop={{ base: "-30vh", md: "-30vh" }}>
                        <Box
                            position="relative"
                            width="full"
                            background="linear-gradient(to bottom, transparent 0%, #08040b 12vh)"
                            px={{ base: 4, md: 10 }}
                            py={{ base: 6, md: 12 }}
                        >
                            <Flex flexWrap="wrap" gap={4} justifyContent="center">
                                {validatedItems.map((item) => (
                                    <Box
                                        key={item.sys.id}
                                        width={{ base: "full", md: "300px" }}
                                        height="400px"
                                    >
                                        <NewsCard item={item} cardSize="large" />
                                    </Box>
                                ))}
                            </Flex>
                        </Box>
                    </Box>
                )}
            </MotionBox>
        </Box>
    );
});

NewsSection.displayName = "NewsSection";

export { NewsSection };
