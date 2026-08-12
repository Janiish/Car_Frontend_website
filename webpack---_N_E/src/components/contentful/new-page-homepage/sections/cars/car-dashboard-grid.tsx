import { memo, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";
import { useRouter } from "next/router";
import { Box, MotionBox, NdlIconButton } from "@project/ui";
import {
    measureElementIds,
    useCarDashboardLayoutState,
    useCarDashboardLayoutActions,
} from "./car-dashboard-layout-context";
import { useAppStore } from "@/store/app-store";
import { PAGMSHEvents, PAGMSHModuleNames, sendPagDataToGTM } from "@/lib/google-tag-manager/events";
import { RemoveScroll } from "react-remove-scroll";
import FocusLock from "react-focus-lock";
import { CarDashboardAnimatedContainer } from "./car-dashboard-animated-container";
import { Backdrop } from "@/components/contentful/main-navigation/components/backdrop";
// eslint-disable-next-line no-restricted-imports
import { chakra } from "@chakra-ui/react";
import { CarTechnicalOverviewCard } from "./car-dashboard-technical-overview-card";
import type { DashboardCar3dFieldsFragment } from "../../__generated/page-homepage.contentful.generated";
import { CarDashboardMediaCard } from "./car-dashboard-media-card";
import { CarDashboardSeriesCard } from "./car-dashboard-series-card";
import { CarDashboardNextEventCard } from "./car-dashboard-next-event-card";

const ChakraFocusLock = chakra(FocusLock);

const CARD_OPACITY_ANIMATION = {
    close: { delay: 0.9, duration: 0.43 },
} as const;

function useCarDashboardGridState() {
    const { canAnimate, isDashboardOpen } = useCarDashboardLayoutState();
    const { setCanAnimate, setIsDashboardOpen } = useCarDashboardLayoutActions();
    const { locale } = useRouter();
    const {
        state: { pageType, pageId, pageContentTags },
    } = useAppStore();
    const lenis = useLenis();
    const lockPageScroll = isDashboardOpen || canAnimate;
    const [isMounted, setIsMounted] = useState(false);
    const exitTimerRef = useRef<ReturnType<typeof setTimeout>>();
    const prevDashboardOpenRef = useRef(isDashboardOpen);
    const isActive = isDashboardOpen || canAnimate;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const wasOpen = prevDashboardOpenRef.current;
        prevDashboardOpenRef.current = isDashboardOpen;

        if (wasOpen && !isDashboardOpen && canAnimate) {
            clearTimeout(exitTimerRef.current);
            exitTimerRef.current = setTimeout(() => {
                setCanAnimate(false);
            }, 1330);
        }

        if (isDashboardOpen) {
            clearTimeout(exitTimerRef.current);
        }

        return () => clearTimeout(exitTimerRef.current);
    }, [isDashboardOpen, canAnimate, setCanAnimate]);

    useEffect(() => {
        if (!lenis) {
            return;
        }

        if (lockPageScroll) {
            lenis.stop();
            return () => {
                lenis.start();
            };
        }

        lenis.start();
    }, [lenis, lockPageScroll]);

    const closeCarDashboard = useCallback(() => {
        sendPagDataToGTM({
            eventAction: PAGMSHEvents.carDashboardClose,
            locale: locale!,
            pageExperience: {
                pageCategory: pageType,
                contentTags: pageContentTags ?? [],
            },
            context: {
                moduleName: PAGMSHModuleNames.carDashboard,
            },
            componentClick: {
                clickElementType: "interaction",
                clickElementId: pageId,
                clickElementName: "Close",
            },
        });

        const active = document.activeElement;
        if (active instanceof HTMLElement) active.blur();

        setIsDashboardOpen(false);
    }, [setIsDashboardOpen, locale, pageType, pageId, pageContentTags]);

    useEffect(() => {
        if (!isDashboardOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeCarDashboard();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isDashboardOpen, closeCarDashboard]);

    return { isMounted, isDashboardOpen, canAnimate, lockPageScroll, isActive, closeCarDashboard };
}

type CarDashboardGridProps = {
    car3d?: DashboardCar3dFieldsFragment | null;
    seriesTitle?: string | null;
    titleNextEvent?: string | null;
    titleLatestNews?: string | null;
    labelNoSeries?: string | null;
    labelNoNewsEvents?: string | null;
};

const CarDashboardGrid = memo(function CarDashboardGrid({
    car3d,
    seriesTitle,
    titleNextEvent,
    titleLatestNews,
    labelNoSeries,
    labelNoNewsEvents,
}: CarDashboardGridProps) {
    const { isMounted, isDashboardOpen, canAnimate, lockPageScroll, isActive, closeCarDashboard } =
        useCarDashboardGridState();

    // Tech overview sizes to its content on mobile while the dashboard is open/animating.
    // Use minmax(min-content, auto) — bare `auto` collapses to 0px when the cell has
    // min-height: 0, which lets following absolute siblings paint on top of the card.
    // Closed (idle) keeps a fixed row so the morph-from-launcher measurement stays valid.
    const mobileTechOverviewRow =
        isDashboardOpen || canAnimate ? "minmax(min-content, auto)" : "650px";

    const grid = (
        <RemoveScroll enabled={lockPageScroll}>
            <Box
                data-lenis-prevent
                position="fixed"
                inset={0}
                zIndex={isActive ? "modal" : 1}
                pointerEvents={isDashboardOpen ? "auto" : "none"}
                width="100vw"
                height="100dvh"
                className="dashboard-container"
                role={isDashboardOpen ? "dialog" : undefined}
                aria-modal={isDashboardOpen ? "true" : undefined}
                aria-label={isDashboardOpen ? "Car dashboard" : undefined}
            >
                <Box
                    position="relative"
                    width="100vw"
                    height="100dvh"
                    display="flex"
                    zIndex={1}
                    alignItems={{ base: "start", l: "center" }}
                    justifyContent="center"
                    px={{ base: 5, ndlDashboardGrid: 10 }}
                    pt={{ base: 4, ndlDashboardGrid: 0 }}
                    // Extra bottom inset on small viewports: most grid rows are fixed heights, so
                    // padding on a grid cell does not grow the scroll height—only this scroll root does.
                    pb={{ base: 10, ndlDashboardGrid: 0 }}
                    overflow="auto"
                    className="dashboard-content"
                    sx={{ overscrollBehavior: "contain" }}
                >
                    <ChakraFocusLock
                        disabled={!isDashboardOpen}
                        returnFocus
                        width="full"
                        height="full"
                        maxHeight={{ l: "860px" }}
                        maxWidth="1648px"
                        className="dashboard-flex-container focus-lock-container"
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-end"
                        justifyContent={{ base: "start", l: "center" }}
                        gap={{ base: 4, l: 8 }}
                    >
                        <MotionBox
                            zIndex={3}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isDashboardOpen ? 1 : 0 }}
                        >
                            <NdlIconButton
                                icon="close"
                                ariaLabel="Close dashboard"
                                onClick={closeCarDashboard}
                                size={{ base: 9, l: 12 }}
                                backgroundColor="ndlTransparencyBlack"
                                hoverBackgroundColor="ndlTransparencyGreyHover"
                                backdropBlur="ndlFrostedGlassHigh"
                                tabIndex={isDashboardOpen ? 0 : -1}
                                aria-hidden={isDashboardOpen ? undefined : "true"}
                            />
                        </MotionBox>

                        <Box
                            color="white"
                            width="full"
                            height={{ base: "auto", l: "full" }}
                            display="grid"
                            gap={4}
                            gridTemplateColumns={{
                                base: "1fr",
                                l: "repeat(3, minmax(0, 1fr))",
                            }}
                            gridTemplateRows={{
                                base: `${mobileTechOverviewRow} 270px 300px 210px 40px`,
                                l: "repeat(2, minmax(0, 1fr))",
                            }}
                            gridTemplateAreas={{
                                base: `
                                    "left"
                                    "topRight"
                                    "bottomRightLeft"
                                    "bottomRightRight"
                                `,
                                l: `
                                    "left topRight topRight"
                                    "left bottomRightLeft bottomRightRight"
                                `,
                            }}
                            alignItems="stretch"
                            justifyItems="stretch"
                            minWidth={0}
                            minHeight={0}
                            className="dashboard-grid"
                        >
                            <Box
                                id={measureElementIds["m-left-card"]}
                                gridArea="left"
                                position="relative"
                                height={{ base: "auto", l: "100%" }}
                                width="100%"
                                minWidth={0}
                                minHeight={{ base: "min-content", l: 0 }}
                                alignSelf={{ base: "start", l: "stretch" }}
                                className="dashboard-left-row"
                            >
                                <CarDashboardAnimatedContainer
                                    targetContainerId={measureElementIds["m-left-card"]}
                                    opacityAnimation={CARD_OPACITY_ANIMATION}
                                    contentSizedOnMobile
                                >
                                    <CarTechnicalOverviewCard car3d={car3d} />
                                </CarDashboardAnimatedContainer>
                            </Box>

                            <Box
                                id={measureElementIds["m-right-top-card"]}
                                gridArea="topRight"
                                position="relative"
                                height="100%"
                                width="100%"
                                minWidth={0}
                                minHeight={0}
                                className="dashboard-top-right-row"
                            >
                                <CarDashboardAnimatedContainer
                                    targetContainerId={measureElementIds["m-right-top-card"]}
                                    opacityAnimation={CARD_OPACITY_ANIMATION}
                                >
                                    <CarDashboardMediaCard car3d={car3d} />
                                </CarDashboardAnimatedContainer>
                            </Box>

                            <Box
                                id={measureElementIds["m-right-bottom-left-card"]}
                                gridArea="bottomRightLeft"
                                position="relative"
                                height="100%"
                                width="100%"
                                minWidth={0}
                                minHeight={0}
                                className="dashboard-bottom-right-left-row"
                            >
                                <CarDashboardAnimatedContainer
                                    targetContainerId={
                                        measureElementIds["m-right-bottom-left-card"]
                                    }
                                    opacityAnimation={CARD_OPACITY_ANIMATION}
                                >
                                    <CarDashboardSeriesCard
                                        car3d={car3d}
                                        title={seriesTitle}
                                        labelNoSeries={labelNoSeries}
                                    />
                                </CarDashboardAnimatedContainer>
                            </Box>

                            <Box
                                id={measureElementIds["m-right-bottom-right-card"]}
                                gridArea="bottomRightRight"
                                position="relative"
                                height="100%"
                                width="100%"
                                minWidth={0}
                                minHeight={0}
                                className="dashboard-right-top-row"
                            >
                                <CarDashboardAnimatedContainer
                                    targetContainerId={
                                        measureElementIds["m-right-bottom-right-card"]
                                    }
                                    opacityAnimation={CARD_OPACITY_ANIMATION}
                                >
                                    <CarDashboardNextEventCard
                                        car3d={car3d}
                                        titleNextEvent={titleNextEvent}
                                        titleLatestNews={titleLatestNews}
                                        labelNoNewsEvents={labelNoNewsEvents}
                                    />
                                </CarDashboardAnimatedContainer>
                            </Box>
                            <Box h={5} />
                        </Box>
                    </ChakraFocusLock>
                </Box>

                <Backdrop
                    backgroundColor="ndlBackgroundDarkGrey"
                    backdropFilter="blur(var(--blur-ndlDashboardBackgroundBlur))"
                    pointerEvents="none"
                    position="absolute"
                    inset={0}
                    zIndex={0}
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: isDashboardOpen ? 1 : 0,
                    }}
                    transition={{
                        duration: 0.5,
                        // Fade out immediately when closing so widgets are visible during exit animation
                        delay: isDashboardOpen ? 0 : 0.75,
                    }}
                    className="dashboard-backdrop"
                />
            </Box>
        </RemoveScroll>
    );

    if (!isMounted) return null;

    return createPortal(grid, document.body);
});

CarDashboardGrid.displayName = "CarDashboardGrid";

export { CarDashboardGrid };
