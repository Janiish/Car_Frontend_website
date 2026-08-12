import type { DashboardCar3dFieldsFragment } from "../../__generated/page-homepage.contentful.generated";
import { Box, NdlHeading, NdlLink, NdlSurface, NdlText, VStack } from "@project/ui";
import { memo, useMemo } from "react";
import { useRouter } from "next/router";
import { useIsDashboardOpen } from "./car-dashboard-layout-context";
import { MotionVStack } from "@/components/contentful/dashboard/motion-primitives";
import { useAppStore } from "@/store/app-store";
import { PAGMSHEvents, PAGMSHModuleNames, sendPagDataToGTM } from "@/lib/google-tag-manager/events";

type CarDashboardSeriesCardProps = {
    car3d?: DashboardCar3dFieldsFragment | null;
    title?: string | null;
    labelNoSeries?: string | null;
};

const CarDashboardSeriesCard = memo(function CarDashboardSeriesCard({
    car3d,
    title,
    labelNoSeries,
}: CarDashboardSeriesCardProps) {
    const car = car3d?.car?.__typename === "Car" ? car3d.car : undefined;
    const isDashboardOpen = useIsDashboardOpen();
    const { locale } = useRouter();
    const {
        state: { pageType, pageId, pageContentTags },
    } = useAppStore();

    const handleSeriesLinkClick = (seriesName: string | null | undefined, href: string) => {
        sendPagDataToGTM({
            eventAction: PAGMSHEvents.linkClick,
            locale: locale!,
            pageExperience: {
                pageCategory: pageType,
                contentTags: pageContentTags ?? [],
            },
            context: {
                moduleName: PAGMSHModuleNames.carDashboard,
            },
            componentClick: {
                clickElementType: "navigation",
                clickElementId: pageId,
                clickElementName: `Series: ${seriesName ?? ""}`,
                targetUrl: href,
                targetType: "internal",
            },
        });
    };

    const carId = car3d?.sys?.id;
    const validSeries = useMemo(
        () =>
            car?.seriesCollection?.items?.filter(
                (series) =>
                    series?.name && series.linkedFrom?.pageRaceSeriesCollection?.items?.[0]?.slug
            ) ?? [],
        [carId] // eslint-disable-line react-hooks/exhaustive-deps
    );
    return (
        <NdlSurface
            size="card"
            colorScheme="transparent"
            width="full"
            height="full"
            color="allWhite"
            p={0}
            position="relative"
            overflow="hidden"
        >
            <MotionVStack
                justifyContent="space-between"
                alignItems="stretch"
                height="full"
                py={4}
                initial={{ opacity: isDashboardOpen ? 1 : 0 }}
                animate={{ opacity: isDashboardOpen ? 1 : 0 }}
                transition={{
                    duration: 1.33 / 2,
                    delay: isDashboardOpen ? 1.33 / 2 : 0,
                }}
            >
                <NdlHeading size="headerM" py={3} px={6}>
                    {title}
                </NdlHeading>
                {validSeries.length > 0 ? (
                    <Box
                        maxHeight="256px"
                        overflowY="auto"
                        data-lenis-prevent
                        className="scroll-fade-y"
                        sx={{ "--scroll-fade-size": "96px" }}
                    >
                        <VStack alignItems="stretch" gap={2} px={4}>
                            {validSeries.map((series) => {
                                const seriesHref = `/series/${series?.linkedFrom?.pageRaceSeriesCollection?.items?.[0]?.slug}`;
                                return (
                                    <NdlLink.Root key={series?.sys?.id} href={seriesHref}>
                                        <NdlLink.Content>
                                            <NdlLink.Title
                                                onClick={() =>
                                                    handleSeriesLinkClick(series?.name, seriesHref)
                                                }
                                            >
                                                {series?.name}
                                            </NdlLink.Title>
                                        </NdlLink.Content>
                                        <NdlLink.Icon />
                                    </NdlLink.Root>
                                );
                            })}
                        </VStack>
                    </Box>
                ) : (
                    <VStack alignItems="start" justifyContent="flex-end" flex={1} px={6} pb={4}>
                        <NdlText color="grey200">{labelNoSeries}</NdlText>
                    </VStack>
                )}
            </MotionVStack>
        </NdlSurface>
    );
});

CarDashboardSeriesCard.displayName = "CarDashboardSeriesCard";

export { CarDashboardSeriesCard };
