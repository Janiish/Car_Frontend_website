import {
    Box,
    HStack,
    NdlButton,
    NdlHeading,
    NdlIcon,
    NdlSurface,
    NdlText,
    VStack,
    NextLink,
} from "@project/ui";
import { MotionVStack } from "@/components/contentful/dashboard/motion-primitives";
import type { DashboardCar3dFieldsFragment } from "../../__generated/page-homepage.contentful.generated";
import { useMicrocopy } from "@/lib/contentful/microcopy/microcopy-context";
import { memo } from "react";
import { useRouter } from "next/router";
import { useIsDashboardOpen } from "./car-dashboard-layout-context";
import { useAppStore } from "@/store/app-store";
import { PAGMSHEvents, PAGMSHModuleNames, sendPagDataToGTM } from "@/lib/google-tag-manager/events";

function TechSpecRow({
    label,
    value,
    isFirst,
}: Readonly<{
    label: string;
    value: string;
    isFirst?: boolean;
}>) {
    return (
        <>
            <HStack
                alignItems="start"
                width="full"
                my={isFirst ? undefined : 6}
                mb={isFirst ? 6 : undefined}
                gap={6}
            >
                <NdlText flex={1} minW={0}>
                    {label}
                </NdlText>
                <NdlText flex={2} minW={0} textAlign="end">
                    {value}
                </NdlText>
            </HStack>
            <Box height="px" backgroundColor="grey200" />
        </>
    );
}

type CarTechnicalOverviewCardProps = {
    car3d: DashboardCar3dFieldsFragment | null | undefined;
};

const CarTechnicalOverviewCard = memo(function CarTechnicalOverviewCard({
    car3d,
}: CarTechnicalOverviewCardProps) {
    const car = car3d?.car?.__typename === "Car" ? car3d.car : undefined;
    const carDisplayName = car3d?.displayName ?? car?.name;
    const carPageSlug = car?.linkedFrom?.pageCarCollection?.items?.[0]?.slug;
    const { get: getMicrocopy } = useMicrocopy();
    const isDashboardOpen = useIsDashboardOpen();
    const { locale } = useRouter();
    const {
        state: { pageType, pageId, pageContentTags },
    } = useAppStore();

    const handleCarLinkClick = () => {
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
                clickElementName: `Technical overview: ${carDisplayName ?? ""}`,
                targetUrl: `/cars/${carPageSlug}`,
                targetType: "internal",
            },
        });
    };
    return (
        <NdlSurface
            size="card"
            colorScheme="transparent"
            width="full"
            height={{ base: "auto", l: "full" }}
            color="allWhite"
            p={0}
            position="relative"
            overflow={{ base: "visible", l: "hidden" }}
        >
            <MotionVStack
                width="full"
                height={{ base: "auto", l: "full" }}
                alignItems="stretch"
                spacing={0}
                minHeight={{ base: "unset", l: 0 }}
                initial={{ opacity: isDashboardOpen ? 1 : 0 }}
                animate={{ opacity: isDashboardOpen ? 1 : 0 }}
                transition={{
                    duration: 1.33 / 2,
                    delay: isDashboardOpen ? 1.33 / 2 : 0,
                }}
            >
                <Box flexShrink={0} width="full" px={4} pt={4}>
                    {carPageSlug ? (
                        <HStack justifyContent="end" marginBottom={6}>
                            <NdlButton
                                as={NextLink}
                                href={`/cars/${carPageSlug}`}
                                onClick={handleCarLinkClick}
                                variant="icon"
                                size="large"
                                colorScheme="grey"
                                marginLeft="auto"
                                aria-label={carDisplayName ?? "Car details"}
                            >
                                <NdlIcon name="arrow-right-up" />
                            </NdlButton>
                        </HStack>
                    ) : (
                        <Box marginBottom={6} height="48px" />
                    )}
                    <NdlHeading size="headerL" marginBottom={6} color="allWhite">
                        {carDisplayName}
                    </NdlHeading>
                </Box>

                <Box
                    flex={{ base: "none", l: 1 }}
                    minHeight={{ base: "unset", l: 0 }}
                    width="full"
                    px={4}
                    pb={8}
                    overflowY={{ base: "visible", l: "auto" }}
                    data-lenis-prevent
                    className="scroll-fade-y"
                    sx={{ "--scroll-fade-size": "96px" }}
                >
                    <VStack
                        alignItems="stretch"
                        spacing={0}
                        minHeight={{ base: "unset", l: "100%" }}
                    >
                        <NdlText sx={{ textWrap: "pretty" }}>{car?.description}</NdlText>

                        <Box flex={{ base: "none", l: 1 }} minHeight={{ base: 6, l: 12 }} />

                        <VStack alignItems="stretch" gap={0}>
                            {car?.engine && (
                                <TechSpecRow
                                    isFirst
                                    label={getMicrocopy("moduleCarTechSpecs", "engine")}
                                    value={car.engine}
                                />
                            )}
                            {car?.displacement && (
                                <TechSpecRow
                                    label={getMicrocopy("moduleCarTechSpecs", "displacement")}
                                    value={car.displacement}
                                />
                            )}
                            {car?.power && (
                                <TechSpecRow
                                    label={getMicrocopy("moduleCarTechSpecs", "performance")}
                                    value={car.power}
                                />
                            )}
                            {car?.transmission && (
                                <TechSpecRow
                                    label={getMicrocopy("moduleCarTechSpecs", "gears")}
                                    value={car.transmission}
                                />
                            )}
                            {car?.weight && (
                                <TechSpecRow
                                    label={getMicrocopy("moduleCarTechSpecs", "weight")}
                                    value={car.weight}
                                />
                            )}
                            {car?.driveline && (
                                <TechSpecRow
                                    label={getMicrocopy("moduleCarTechSpecs", "driveLine")}
                                    value={car.driveline}
                                />
                            )}
                            {car?.topSpeed && (
                                <TechSpecRow
                                    label={getMicrocopy("moduleCarTechSpecs", "topSpeed")}
                                    value={car.topSpeed}
                                />
                            )}
                        </VStack>
                    </VStack>
                </Box>
            </MotionVStack>
        </NdlSurface>
    );
});

export { CarTechnicalOverviewCard };
