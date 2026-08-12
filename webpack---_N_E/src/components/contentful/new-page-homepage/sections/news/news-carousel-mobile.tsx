import { useCallback, useState, memo } from "react";
import {
    Box,
    Flex,
    Carousel,
    CarouselA11y,
    CarouselSlide,
    CarouselNavigationButton,
} from "@project/ui";
import type { CarouselClass } from "@project/ui";
import { NewsCard, type NewsCardItem } from "./news-card";
import { useCarouselNavigationTracking } from "@/lib/google-tag-manager/use-carousel-navigation-tracking";
import { PAGMSHModuleNames } from "@/lib/google-tag-manager/events";

const TOUCH_ACTION_SX = { touchAction: "manipulation" } as const;
/** Slides on each side of the active one to eagerly load, so the next card's
 *  image is ready before the swipe finishes (avoids visible pop-in). */
const PRELOAD_BEHIND = 1;
const PRELOAD_AHEAD = 2;
const SWIPER_CURSOR_SX = {
    "& .swiper-wrapper": { cursor: "grab" },
    "& .swiper-wrapper:active": { cursor: "grabbing" },
} as const;

const MobileCarousel = memo(function MobileCarousel({
    items,
    showNavigation = false,
}: {
    items: NewsCardItem[];
    showNavigation?: boolean;
}) {
    const [swiperInstance, setSwiperInstance] = useState<CarouselClass | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const trackCarouselNavigation = useCarouselNavigationTracking(PAGMSHModuleNames.newsSection);

    const handleSwiper = useCallback((swiper: CarouselClass) => {
        setSwiperInstance(swiper);
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
        setActiveIndex(swiper.activeIndex);
    }, []);

    const handleSlideChange = useCallback((swiper: CarouselClass) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
        setActiveIndex(swiper.activeIndex);
    }, []);

    return (
        <Box as="section" aria-roledescription="carousel" aria-label="News">
            {showNavigation && (
                <Flex justifyContent="flex-end" gap={7} padding={2} mb={4}>
                    <CarouselNavigationButton
                        onClick={() => {
                            swiperInstance?.slidePrev();
                            trackCarouselNavigation("prev");
                        }}
                        direction="prev"
                        hideLabel
                        disabled={isBeginning}
                        aria={{ "aria-label": "Previous news article" }}
                        theme="dark"
                    />
                    <CarouselNavigationButton
                        onClick={() => {
                            swiperInstance?.slideNext();
                            trackCarouselNavigation("next");
                        }}
                        direction="next"
                        hideLabel
                        disabled={isEnd}
                        aria={{ "aria-label": "Next news article" }}
                        theme="dark"
                    />
                </Flex>
            )}
            <Box data-lenis-prevent-horizontal sx={TOUCH_ACTION_SX}>
                <Carousel
                    slidesPerView={1.08}
                    slidesPerGroup={1}
                    modules={[CarouselA11y]}
                    spaceBetween="16px"
                    overflow="visible"
                    speed={500}
                    longSwipesRatio={0.15}
                    shortSwipes
                    grabCursor
                    centeredSlides
                    onSwiper={handleSwiper}
                    onSlideChange={handleSlideChange}
                    sx={SWIPER_CURSOR_SX}
                >
                    {items.map((item, index) => {
                        const isNearActive = Math.abs(index - activeIndex) <= 1;
                        const shouldPreload =
                            index >= activeIndex - PRELOAD_BEHIND &&
                            index <= activeIndex + PRELOAD_AHEAD;
                        return (
                            <CarouselSlide key={item.sys.id}>
                                <Box height="376px">
                                    <NewsCard
                                        item={item}
                                        cardSize="small"
                                        disableVideo={!isNearActive}
                                        imageLoading={shouldPreload ? "eager" : "lazy"}
                                    />
                                </Box>
                            </CarouselSlide>
                        );
                    })}
                </Carousel>
            </Box>
        </Box>
    );
});

MobileCarousel.displayName = "MobileCarousel";

export { MobileCarousel };
