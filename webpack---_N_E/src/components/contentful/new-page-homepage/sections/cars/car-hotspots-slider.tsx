import { memo, useState } from "react";
import { useRouter } from "next/router";
import { Box, Carousel, CarouselA11y, CarouselSlide, DetailsCard, Flex } from "@project/ui";
import breakpoints from "@project/ui/src/design-tokens/09.breakpoints/breakpoints";
import type { HotspotData } from "./car-hotspot";
import { useAppStore } from "@/store/app-store";
import { PAGMSHEvents, PAGMSHModuleNames, sendPagDataToGTM } from "@/lib/google-tag-manager/events";

type CarHotspotsSliderProps = {
    hotspots: HotspotData[];
};

/**
 * Mobile-only replacement for the positional video hotspots: the active car's
 * hotspot content (front + back merged) renders as a swipeable row of
 * DetailsCards, fully decoupled from the car video.
 *
 * Slides per view: phones 1, large phones / small tablets (xs, 480px+) 2,
 * tablet portrait and up (s, 760px+) 3.
 */
const CarHotspotsSlider = memo(function CarHotspotsSlider({ hotspots }: CarHotspotsSliderProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const { locale } = useRouter();
    const {
        state: { pageType, pageId, pageContentTags },
    } = useAppStore();

    const handleHotspotOpenChange = (open: boolean, index: number, title: string) => {
        sendPagDataToGTM({
            eventAction: PAGMSHEvents.carHotspotDetailsCardToggle,
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
                clickElementName: `${open ? "Open" : "Close"}: ${title}`,
            },
        });

        setOpenIndex(open ? index : null);
    };

    if (hotspots.length === 0) return null;

    return (
        <Flex direction="column" gap={4} width="full">
            <Box data-lenis-prevent-horizontal sx={{ touchAction: "manipulation" }}>
                <Carousel
                    modules={[CarouselA11y]}
                    slidesPerView={1.08}
                    slidesPerGroup={1}
                    spaceBetween="16px"
                    overflow="visible"
                    breakpoints={{
                        [Number.parseInt(breakpoints.xs, 10)]: {
                            slidesPerView: 2.1,
                            slidesPerGroup: 1,
                        },
                        [Number.parseInt(breakpoints.s, 10)]: {
                            slidesPerView: 3.1,
                            slidesPerGroup: 1,
                        },
                    }}
                    speed={500}
                    longSwipesRatio={0.15}
                    shortSwipes
                    grabCursor
                    onSnapIndexChange={() => setOpenIndex(null)}
                    sx={{
                        "& .swiper-wrapper": {
                            alignItems: "flex-end",
                            cursor: "grab",
                        },
                        "& .swiper-wrapper:active": {
                            cursor: "grabbing",
                        },
                    }}
                >
                    {hotspots.map((hotspot, index) => (
                        <CarouselSlide key={`${hotspot.title}-${hotspot.x}-${hotspot.y}`}>
                            <DetailsCard
                                title={hotspot.title}
                                subtitle={hotspot.subtitle}
                                description={hotspot.description}
                                detailsAsset={hotspot.asset}
                                isOpen={openIndex === index}
                                onOpenChange={(open) =>
                                    handleHotspotOpenChange(open, index, hotspot.title)
                                }
                                style={{ width: "100%" }}
                            />
                        </CarouselSlide>
                    ))}
                </Carousel>
            </Box>
        </Flex>
    );
});

CarHotspotsSlider.displayName = "CarHotspotsSlider";

export { CarHotspotsSlider };
