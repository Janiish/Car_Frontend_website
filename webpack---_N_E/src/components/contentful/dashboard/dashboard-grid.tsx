import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";
import { Box, Flex, MotionBox, NdlIconButton } from "@project/ui";
import { measureElementIds, useDashboardLayout } from "./dashboard-layout-context";
import { useAppStore } from "@/store/app-store";
import { RemoveScroll } from "react-remove-scroll";
import FocusLock from "react-focus-lock";
import { DashboardAnimatedContainer } from "./dashboard-animated-container";
import { DashboardGridCard } from "./dashboard-grid-card";
import { Backdrop } from "../main-navigation/components/backdrop";
import { CalendarProvider, useCalendar } from "./calendar/calendar-context";
import { CalendarGrid } from "./calendar/calendar-grid";
import { CalendarDateDetails } from "./calendar/calendar-date-details";
import { useRouter } from "next/router";
import { useDashboardQuery } from "./__generated/dashboard.contentful.generated";
import { useCalendarQuery } from "./calendar/__generated/calendar.contentful.generated";
// eslint-disable-next-line no-restricted-imports
import { chakra } from "@chakra-ui/react";
import { PAGMSHEvents, PAGMSHModuleNames, sendPagDataToGTM } from "@/lib/google-tag-manager/events";

const ChakraFocusLock = chakra(FocusLock);

function useDashboardGridState() {
    const { locale, isPreview } = useRouter();
    const {
        state: { isDashboardOpen, dashboardId, pageType, pageId, pageContentTags },
        dispatch,
    } = useAppStore();

    const { canAnimate, updateLayout, setCanAnimate } = useDashboardLayout();
    const lenis = useLenis();
    const [isMounted, setIsMounted] = useState(false);
    const lockPageScroll = isDashboardOpen || canAnimate;
    const exitTimerRef = useRef<ReturnType<typeof setTimeout>>();
    const prevDashboardOpenRef = useRef(isDashboardOpen);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            updateLayout();
        }
    }, [isMounted, updateLayout]);

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
        if (!lenis) return;

        if (lockPageScroll) {
            lenis.stop();
            return () => {
                lenis.start();
            };
        }

        lenis.start();
    }, [lenis, lockPageScroll]);

    const closeDashboard = useCallback(() => {
        sendPagDataToGTM({
            eventAction: PAGMSHEvents.dashboardClose,
            locale: locale!,
            pageExperience: {
                pageCategory: pageType,
                contentTags: pageContentTags ?? [],
            },
            context: {
                moduleName: PAGMSHModuleNames.dashboard,
            },
            componentClick: {
                clickElementType: "interaction",
                clickElementId: pageId,
                clickElementName: "Close",
            },
        });

        dispatch({ type: "SET_IS_DASHBOARD_OPEN", payload: false });
    }, [dispatch, locale, pageType, pageId, pageContentTags]);

    useEffect(() => {
        if (!isDashboardOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeDashboard();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isDashboardOpen, closeDashboard]);

    const { data: calendarData } = useCalendarQuery({
        locale: locale!,
        preview: Boolean(isPreview),
    });

    const { data: dashboardData } = useDashboardQuery({
        id: dashboardId ?? "",
        locale: locale!,
        preview: Boolean(isPreview),
    });

    return { isMounted, isDashboardOpen, canAnimate, calendarData, dashboardData, closeDashboard };
}

/**
 * Resets the calendar to today whenever the dashboard transitions from open to
 * closed. Rendered inside CalendarProvider so it can access `selectDate`, and
 * covers every close path (button, Escape, launcher).
 */
const CalendarResetOnClose = () => {
    const { selectDate } = useCalendar();
    const {
        state: { isDashboardOpen },
    } = useAppStore();
    const prevDashboardOpenRef = useRef(isDashboardOpen);

    useEffect(() => {
        const wasOpen = prevDashboardOpenRef.current;
        prevDashboardOpenRef.current = isDashboardOpen;

        if (wasOpen && !isDashboardOpen) {
            const timer = setTimeout(() => {
                selectDate(new Date());
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isDashboardOpen, selectDate]);

    return null;
};

/**
 * This grid contains the dashboard widgets in normal flow, allowing scrolling.
 * On page load, widgets animate to the widget-launcher position.
 * When dashboard opens, widgets animate back to their grid positions.
 */
const DashboardGrid = () => {
    const { isMounted, isDashboardOpen, canAnimate, calendarData, dashboardData, closeDashboard } =
        useDashboardGridState();

    if (!dashboardData?.dashboard?.showDashboard) {
        return null;
    }

    const grid = (
        <RemoveScroll enabled={isDashboardOpen}>
            <CalendarProvider
                initialSelectedDate={new Date()}
                events={calendarData?.eventCollection?.items ?? []}
            >
                <CalendarResetOnClose />
                <Box
                    data-lenis-prevent
                    position="fixed"
                    inset={0}
                    // Keep modal z-index during opening/closing animations to cover hero content
                    // Only lower to zIndex={1} when fully closed and not animating
                    // This ensures hero content stays hidden during closing animation
                    zIndex={isDashboardOpen || canAnimate ? "modal" : 1}
                    pointerEvents={isDashboardOpen ? "auto" : "none"}
                    width="100vw"
                    height="100svh"
                    className="dashboard-container"
                    role={isDashboardOpen ? "dialog" : undefined}
                    aria-modal={isDashboardOpen ? "true" : undefined}
                    aria-label={isDashboardOpen ? "Dashboard" : undefined}
                >
                    <Box
                        position="relative"
                        width="100vw"
                        height="100svh"
                        display="flex"
                        zIndex={1}
                        alignItems={{ base: "start", ndlDashboardGrid: "center" }}
                        justifyContent="center"
                        px={{ base: 5, ndlDashboardGrid: 10 }}
                        pt={{ base: 4, ndlDashboardGrid: 0 }}
                        pb={{ base: 6, ndlDashboardGrid: 0 }}
                        overflow="auto"
                        className="dashboard-content"
                    >
                        <ChakraFocusLock
                            disabled={!isDashboardOpen}
                            returnFocus
                            display="flex"
                            width="full"
                            maxWidth="1648px"
                            marginInline="auto"
                            flexDirection="column"
                            alignItems="flex-end"
                            justifyContent="center"
                            gap={{ base: 4, ndlDashboardGrid: 8 }}
                            className="dashboard-flex-container focus-lock-container"
                        >
                            <MotionBox
                                zIndex={3}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isDashboardOpen ? 1 : 0 }}
                            >
                                <NdlIconButton
                                    icon="close"
                                    ariaLabel="Close dashboard"
                                    onClick={closeDashboard}
                                    size={{ base: 9, l: 12 }}
                                    backgroundColor="ndlTransparencyBlack"
                                    hoverBackgroundColor="ndlTransparencyGreyHover"
                                    backdropBlur="ndlFrostedGlassHigh"
                                />
                            </MotionBox>

                            <Box
                                color="white"
                                width="full"
                                height={{ base: "auto", ndlDashboardGrid: "681px" }}
                                display="grid"
                                gap={4}
                                gridTemplateColumns={{
                                    base: "1fr",
                                    ndlDashboardGrid: "repeat(3, minmax(0, 1fr))",
                                }}
                                gridTemplateRows={{
                                    base: "585px 269px 470px 269px 269px",
                                    md: "370px 330px 470px 330px 330px",
                                    ndlDashboardGrid: "repeat(2, minmax(0, 1fr))",
                                }}
                                gridTemplateAreas={{
                                    base: `"leftTop" "leftBottom" "center" "rightTop" "rightBottom"`,
                                    ndlDashboardGrid: `"leftTop center rightTop" "leftBottom center rightBottom"`,
                                }}
                                alignItems="stretch"
                                justifyItems="stretch"
                                minWidth={0}
                                minHeight={0}
                                className="dashboard-grid"
                            >
                                <Box
                                    display="grid"
                                    gridArea={{ base: "leftTop", ndlDashboardGrid: "leftTop" }}
                                    gridTemplateColumns={{
                                        base: "1fr",
                                        md: "1.2fr 1fr",
                                        ndlDashboardGrid: "1.2fr 1fr",
                                    }}
                                    gap={4}
                                    minWidth={0}
                                    minHeight={0}
                                    className="dashboard-left-top-row"
                                >
                                    <Flex
                                        id={measureElementIds["m-left-top-left-card"]}
                                        gridArea="auto"
                                        position="relative"
                                        height="100%"
                                        width="100%"
                                        minWidth={0}
                                        minHeight={{ base: "286px", ndlDashboardGrid: 0 }}
                                    >
                                        <DashboardAnimatedContainer
                                            targetContainerId={
                                                measureElementIds["m-left-top-left-card"]
                                            }
                                        >
                                            <CalendarGrid />
                                        </DashboardAnimatedContainer>
                                    </Flex>
                                    <Flex
                                        id={measureElementIds["m-left-top-right-card"]}
                                        gridArea="auto"
                                        position="relative"
                                        height="100%"
                                        width="100%"
                                        minWidth={0}
                                        minHeight={{ base: "283px", md: 0 }}
                                    >
                                        <DashboardAnimatedContainer
                                            targetContainerId={
                                                measureElementIds["m-left-top-right-card"]
                                            }
                                        >
                                            <CalendarDateDetails />
                                        </DashboardAnimatedContainer>
                                    </Flex>
                                </Box>

                                <Flex
                                    id={measureElementIds["m-left-bottom-card"]}
                                    gridArea={{
                                        base: "leftBottom",
                                        ndlDashboardGrid: "leftBottom",
                                    }}
                                    position="relative"
                                    height="100%"
                                    width="100%"
                                    minWidth={0}
                                    minHeight={0}
                                    className="dashboard-left-bottom-row"
                                >
                                    {dashboardData?.dashboard?.leftBottomCard && (
                                        <DashboardGridCard
                                            item={dashboardData.dashboard.leftBottomCard}
                                            targetContainerId={
                                                measureElementIds["m-left-bottom-card"]
                                            }
                                            ratio="16:9"
                                        />
                                    )}
                                </Flex>

                                <Flex
                                    id={measureElementIds["m-center-card"]}
                                    gridArea={{ base: "center", ndlDashboardGrid: "center" }}
                                    position="relative"
                                    height="100%"
                                    width="100%"
                                    minWidth={0}
                                    minHeight={0}
                                    justifyContent="stretch"
                                    alignItems="stretch"
                                    className="dashboard-center-row"
                                >
                                    {dashboardData?.dashboard?.centerCard && (
                                        <DashboardGridCard
                                            item={dashboardData.dashboard.centerCard}
                                            targetContainerId={measureElementIds["m-center-card"]}
                                            ratio="9:16"
                                        />
                                    )}
                                </Flex>

                                <Box
                                    display="grid"
                                    gridArea={{ base: "rightTop", ndlDashboardGrid: "rightTop" }}
                                    gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                                    gap={4}
                                    minWidth={0}
                                    minHeight={0}
                                    className="dashboard-right-top-row"
                                >
                                    <Flex
                                        id={measureElementIds["m-right-top-left-card"]}
                                        position="relative"
                                        minWidth={0}
                                        minHeight={0}
                                    >
                                        {dashboardData?.dashboard?.rightTopLeftCard && (
                                            <DashboardGridCard
                                                item={dashboardData.dashboard.rightTopLeftCard}
                                                targetContainerId={
                                                    measureElementIds["m-right-top-left-card"]
                                                }
                                                ratio="1:1"
                                            />
                                        )}
                                    </Flex>
                                    <Flex
                                        id={measureElementIds["m-right-top-right-card"]}
                                        position="relative"
                                        minWidth={0}
                                        minHeight={0}
                                    >
                                        {dashboardData?.dashboard?.rightTopRightCard && (
                                            <DashboardGridCard
                                                item={dashboardData.dashboard.rightTopRightCard}
                                                targetContainerId={
                                                    measureElementIds["m-right-top-right-card"]
                                                }
                                                ratio="1:1"
                                            />
                                        )}
                                    </Flex>
                                </Box>

                                <Flex
                                    id={measureElementIds["m-right-bottom-card"]}
                                    gridArea={{
                                        base: "rightBottom",
                                        ndlDashboardGrid: "rightBottom",
                                    }}
                                    position="relative"
                                    height="100%"
                                    width="100%"
                                    minWidth={0}
                                    minHeight={0}
                                    className="dashboard-right-bottom-row"
                                >
                                    {dashboardData?.dashboard?.rightBottomCard && (
                                        <DashboardGridCard
                                            item={dashboardData.dashboard.rightBottomCard}
                                            targetContainerId={
                                                measureElementIds["m-right-bottom-card"]
                                            }
                                            ratio="16:9"
                                        />
                                    )}
                                </Flex>
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
            </CalendarProvider>
        </RemoveScroll>
    );

    if (!isMounted) return null;

    return createPortal(grid, document.body);
};

DashboardGrid.displayName = "MeasureGrid";

export { DashboardGrid };
