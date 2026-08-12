import {
    Box,
    Carousel,
    CarouselA11y,
    CarouselSlide,
    NdlCarouselPagination,
    CarouselNavigationButton,
    CldImage,
    AspectRatio,
    MotionBox,
    Flex,
    Grid,
    hasCloudinaryAsset,
    GridItem,
} from "@project/ui";
import { gridTemplateColumns } from "@project/ui/src/theme/global-styles";
import type { CarouselClass } from "@project/ui";
import type { MotionStyle } from "framer-motion";
import { useState, useMemo, useCallback, memo, forwardRef, useImperativeHandle } from "react";
import type { TeamSectionImageFieldsFragment } from "@/components/contentful/new-page-homepage/__generated/page-homepage.contentful.generated";
import { ModuleSpacer } from "@/components/module-spacer";
import { useHomepageBreakpoints, useHomepageMotionPref } from "../../homepage-responsive-context";
import breakpoints from "@project/ui/src/design-tokens/09.breakpoints/breakpoints";
import { useCarouselNavigationTracking } from "@/lib/google-tag-manager/use-carousel-navigation-tracking";
import { PAGMSHModuleNames } from "@/lib/google-tag-manager/events";

const MAX_ITEMS = 18;
const EAGER_SLIDE_COUNT_MOBILE = 2;
const EAGER_SLIDE_COUNT_DESKTOP = 4;
/** How many slides on each side of the visible range to eagerly preload, so the
 *  next/previous slide image is ready before the user finishes swiping to it.
 *  Desktop shows 3 slides at once, so it preloads a full next group of 3. */
const PRELOAD_BEHIND = 1;
const PRELOAD_AHEAD_MOBILE = 2;
const PRELOAD_AHEAD_DESKTOP = 3;
const STAGGER_DELAY = 0.12;
const STAGGER_CAP = 4;
const CARD_ENTRANCE_DURATION = 1.2;
const PAGINATION_ENTRANCE_DELAY = 0.62;

const isLargeCard = (index: number) => index % 3 === 1;

const cardEntrance = {
    hidden: (index: number) => ({
        opacity: 0,
        x: `${Math.max(100 - index * 20, 30)}vw`,
    }),
    visible: (index: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            type: "spring" as const,
            duration: CARD_ENTRANCE_DURATION,
            bounce: 0.05,
            delay: Math.min(index, STAGGER_CAP) * STAGGER_DELAY,
        },
    }),
};

const cardEntranceFade = {
    hidden: { opacity: 0 },
    visible: (index: number) => ({
        opacity: 1,
        transition: {
            duration: 0.4,
            delay: Math.min(index, STAGGER_CAP) * STAGGER_DELAY,
        },
    }),
};

const CARD_STYLES = {
    small: {
        ratio: "4:5",
        borderRadius: { base: "16px", md: "24px" },
    },
    large: {
        ratio: { base: "2:3", md: "10:16" },
        borderRadius: { base: "16px", md: "24px" },
    },
} as const;

export type TeamsCarouselProps = {
    items: Array<TeamSectionImageFieldsFragment | null>;
    initialSlideIndex?: number;
    onSlideIndexChange?: (index: number) => void;
    showNavigation?: boolean;
    /** Whether this is the first carousel mount (cards start hidden, animate on entrance). */
    isFirstMount?: boolean;
    /** Whether the entrance animation trigger has fired. Only relevant when isFirstMount is true. */
    entranceReady?: boolean;
};

export type TeamsCarouselHandle = {
    slideTo: (index: number, speed?: number) => void;
};

const TeamsCarouselInner = forwardRef<TeamsCarouselHandle, TeamsCarouselProps>(
    function TeamsCarousel(props, ref) {
        const {
            items,
            initialSlideIndex = 0,
            onSlideIndexChange,
            showNavigation = false,
            isFirstMount = false,
            entranceReady = false,
        } = props;
        const [activeSlideIndex, setActiveSlideIndex] = useState(initialSlideIndex);
        const [swiperInstance, setSwiperInstance] = useState<CarouselClass | null>(null);
        const trackCarouselNavigation = useCarouselNavigationTracking(
            PAGMSHModuleNames.teamsSection
        );

        useImperativeHandle(
            ref,
            () => ({
                slideTo: (index, speed = 0) => swiperInstance?.slideTo(index, speed),
            }),
            [swiperInstance]
        );

        const { isMobile } = useHomepageBreakpoints();
        const { prefersReducedMotion } = useHomepageMotionPref();

        const eagerSlideCount = isMobile ? EAGER_SLIDE_COUNT_MOBILE : EAGER_SLIDE_COUNT_DESKTOP;

        const slidesPerGroup = isMobile ? 1 : 3;
        const activeCenterIndex = activeSlideIndex * slidesPerGroup;
        // Eagerly load the currently-visible group plus a window on each side so
        // the neighbouring slide's image is ready before the swipe completes.
        const preloadAhead = isMobile ? PRELOAD_AHEAD_MOBILE : PRELOAD_AHEAD_DESKTOP;
        const preloadStart = activeCenterIndex - PRELOAD_BEHIND;
        const preloadEnd = activeCenterIndex + slidesPerGroup - 1 + preloadAhead;

        const clampedItems = useMemo(() => items.slice(0, MAX_ITEMS), [items]);

        const handleSwiper = useCallback((swiper: CarouselClass) => {
            setSwiperInstance(swiper);
            setActiveSlideIndex(swiper.snapIndex);
        }, []);

        const handleSnapIndexChange = useCallback(
            (swiper: CarouselClass) => {
                setActiveSlideIndex(swiper.snapIndex);
                const perGroup = swiper.params.slidesPerGroup ?? 1;
                onSlideIndexChange?.(swiper.snapIndex * perGroup);
            },
            [onSlideIndexChange]
        );

        const handleBreakpoint = useCallback((swiper: CarouselClass) => {
            setActiveSlideIndex(swiper.snapIndex);
        }, []);

        const shouldAnimate = isFirstMount && !prefersReducedMotion && !isMobile;
        const shouldAnimateFade = isFirstMount && prefersReducedMotion && !isMobile;

        let paginationMotionStyle: MotionStyle | undefined;
        if (shouldAnimate) {
            paginationMotionStyle = {
                opacity: entranceReady ? 1 : 0,
                scale: entranceReady ? 1 : 0.92,
                transition: `opacity 0.2s ease ${PAGINATION_ENTRANCE_DELAY}s, transform 0.2s ease ${PAGINATION_ENTRANCE_DELAY}s`,
            };
        } else if (shouldAnimateFade) {
            paginationMotionStyle = {
                opacity: entranceReady ? 1 : 0,
                transition: `opacity 0.2s ease ${PAGINATION_ENTRANCE_DELAY}s`,
            };
        }

        return (
            <ModuleSpacer className="TeamsCarousel" overflow="hidden" py={0} pt={16}>
                <Box color="porscheBlack" transition="color 0.25s ease">
                    {showNavigation && (
                        <Grid mb={{ base: 6, l: 8 }} gridTemplateColumns={gridTemplateColumns}>
                            <GridItem
                                colSpan={1}
                                gridColumnStart={12}
                                display={{
                                    base: "none",
                                    md: "flex",
                                }}
                                justifyContent="flex-end"
                                alignItems="self-end"
                            >
                                <Flex justifyContent="flex-end" gap={7} padding={2}>
                                    <CarouselNavigationButton
                                        onClick={() => {
                                            swiperInstance?.slidePrev();
                                            trackCarouselNavigation("prev");
                                        }}
                                        direction="prev"
                                        hideLabel
                                        disabled={swiperInstance?.isBeginning}
                                        aria={{ "aria-label": "previous" }}
                                        theme="dark"
                                    />
                                    <CarouselNavigationButton
                                        onClick={() => {
                                            swiperInstance?.slideNext();
                                            trackCarouselNavigation("next");
                                        }}
                                        direction="next"
                                        hideLabel
                                        disabled={swiperInstance?.isEnd}
                                        aria={{ "aria-label": "next" }}
                                        theme="dark"
                                    />
                                </Flex>
                            </GridItem>
                        </Grid>
                    )}
                    <Box data-lenis-prevent-horizontal sx={{ touchAction: "manipulation" }}>
                        <Carousel
                            slidesPerView={1.08}
                            slidesPerGroup={1}
                            modules={[CarouselA11y]}
                            spaceBetween="16px"
                            overflow="visible"
                            initialSlide={initialSlideIndex}
                            speed={500}
                            longSwipesRatio={0.15}
                            shortSwipes={true}
                            grabCursor={true}
                            breakpoints={{
                                [Number.parseInt(breakpoints.md, 10)]: {
                                    slidesPerView: 3.1,
                                    slidesPerGroup: 3,
                                    spaceBetween: "32px",
                                },
                            }}
                            updateOnWindowResize={true}
                            onSwiper={handleSwiper}
                            onSnapIndexChange={handleSnapIndexChange}
                            onBreakpoint={handleBreakpoint}
                            sx={{
                                "& .swiper-wrapper": {
                                    alignItems: "flex-start",
                                    cursor: "grab",
                                },
                                "& .swiper-wrapper:active": {
                                    cursor: "grabbing",
                                },
                            }}
                        >
                            {clampedItems.map((item, index) => {
                                if (!item || !hasCloudinaryAsset(item.asset)) return null;
                                const large = isLargeCard(index);
                                const styles = large ? CARD_STYLES.large : CARD_STYLES.small;
                                const isEager =
                                    index < eagerSlideCount ||
                                    (index >= preloadStart && index <= preloadEnd);
                                const card = (
                                    <AspectRatio ratio={styles.ratio}>
                                        <Box overflow="hidden" borderRadius={styles.borderRadius}>
                                            <CldImage
                                                cloudinaryAsset={item.asset}
                                                sizes={`(min-width: ${breakpoints.md}) 33vw, 92vw`}
                                                crop="fill"
                                                gravity="auto:subject"
                                                aspectRatio={styles.ratio}
                                                alt={item.alt ?? `Team gallery image ${index + 1}`}
                                                loading={isEager ? "eager" : "lazy"}
                                            />
                                        </Box>
                                    </AspectRatio>
                                );
                                const isOffScreen =
                                    Math.abs(index - activeCenterIndex) > slidesPerGroup + 2;
                                const entranceVariants = shouldAnimate
                                    ? cardEntrance
                                    : cardEntranceFade;
                                const slideContent =
                                    shouldAnimate || shouldAnimateFade ? (
                                        <MotionBox
                                            custom={index}
                                            variants={entranceVariants}
                                            initial="hidden"
                                            animate={entranceReady ? "visible" : "hidden"}
                                        >
                                            {card}
                                        </MotionBox>
                                    ) : (
                                        card
                                    );
                                return (
                                    <CarouselSlide
                                        key={`${item.sys?.id}-${index}`}
                                        sx={
                                            isOffScreen
                                                ? {
                                                      contentVisibility: "auto",
                                                      containIntrinsicSize: "0 400px",
                                                  }
                                                : undefined
                                        }
                                    >
                                        {slideContent}
                                    </CarouselSlide>
                                );
                            })}
                        </Carousel>
                    </Box>
                    <Flex justifyContent="center" mt={{ base: 6, md: 12 }}>
                        <NdlCarouselPagination
                            swiper={swiperInstance}
                            activeSlideIndex={activeSlideIndex}
                            theme="dark"
                            onNavigate={trackCarouselNavigation}
                            motionStyle={paginationMotionStyle}
                        />
                    </Flex>
                </Box>
            </ModuleSpacer>
        );
    }
);

export const TeamsCarousel = memo(TeamsCarouselInner);

TeamsCarousel.displayName = "TeamsCarousel";
