import { useState, useEffect, type KeyboardEvent } from "react";
import { useRouter } from "next/router";
import { useAppStore } from "@/store/app-store";
import type { MotionBoxProps } from "@project/ui";
import { getCldImageUrl, MotionBox, NdlIcon, NdlSurface } from "@project/ui";
import { measureElementIds, useDashboardLayout } from "./dashboard-layout-context";
import { useDashboardQuery } from "./__generated/dashboard.contentful.generated";
import { easingCurve } from "./motion-configs";
import { PAGMSHEvents, PAGMSHModuleNames, sendPagDataToGTM } from "@/lib/google-tag-manager/events";

type DashboardWidgetLauncherProps = MotionBoxProps & {
    heroHasVideoAsset?: boolean;
};

const getLauncherDelay = (canAnimate: boolean, isDashboardOpen: boolean) => {
    if (!canAnimate && !isDashboardOpen) {
        return 0;
    }

    if (isDashboardOpen) {
        return 0.33;
    }

    return 0.75;
};

const DashboardWidgetLauncher = ({
    heroHasVideoAsset = false,
    ...props
}: DashboardWidgetLauncherProps) => {
    const { locale, isPreview } = useRouter();

    const [widgetUrl, setWidgetUrl] = useState<string | null>(null);

    const { setCanAnimate, layoutReady, updateLayout, canAnimate } = useDashboardLayout();

    const {
        state: { isDashboardOpen, dashboardId, pageType, pageId, pageContentTags },
        dispatch,
    } = useAppStore();

    const { data: dashboardData } = useDashboardQuery({
        id: dashboardId ?? "",
        locale: locale!,
        preview: Boolean(isPreview),
    });

    useEffect(() => {
        if (dashboardData?.dashboard?.widgetLauncherAsset?.[0]?.public_id) {
            const asset = getCldImageUrl({
                src: dashboardData.dashboard.widgetLauncherAsset[0].public_id,
                width: 125 * 2,
                height: 125 * 2,
                crop: "thumb",
                gravity: "auto",
            });
            setWidgetUrl(asset);
        }
    }, [dashboardData?.dashboard?.widgetLauncherAsset]);

    const handleClick = () => {
        updateLayout();
        setCanAnimate(true);

        const willOpen = !isDashboardOpen;
        sendPagDataToGTM({
            eventAction: willOpen ? PAGMSHEvents.dashboardOpen : PAGMSHEvents.dashboardClose,
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
                clickElementName: "Launcher",
            },
        });

        dispatch({ type: "SET_IS_DASHBOARD_OPEN", payload: willOpen });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
        }
    };

    const launcherDelay = getLauncherDelay(canAnimate, Boolean(isDashboardOpen));

    if (!dashboardData?.dashboard?.showDashboard) {
        return null;
    }

    return (
        <MotionBox
            data-group
            id={measureElementIds["widget-launcher"]}
            position={{ base: "relative", ndlDashboardGrid: "absolute" }}
            zIndex={isDashboardOpen || canAnimate ? 2000 : 5}
            pointerEvents={isDashboardOpen ? "none" : "auto"}
            bottom={{ base: "auto", ndlDashboardGrid: heroHasVideoAsset ? 40 : 20 }}
            right={{ base: "auto", ndlDashboardGrid: 0 }}
            width={{ base: "95px", ndlDashboardGrid: "125px" }}
            height={{ base: "95px", ndlDashboardGrid: "125px" }}
            mb={{ base: 6, ndlDashboardGrid: 0 }}
            {...props}
            role="button"
            tabIndex={0}
            aria-label={isDashboardOpen ? "Close dashboard" : "Open dashboard"}
            cursor="pointer"
            isolation="isolate"
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: layoutReady && widgetUrl ? 1 : 0,
            }}
            transition={{
                duration: 0.6,
                ease: [0, 0.34, 0.58, 1],
                delay: 0.1,
            }}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            <MotionBox
                className="dashboard-widget-launcher-inner"
                position="absolute"
                inset={0}
                zIndex={999}
                borderRadius="ndlRadiusSmall"
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: isDashboardOpen ? 0 : 1,
                    y: layoutReady && widgetUrl ? 0 : 20,
                }}
                transition={{
                    duration: 0.6,
                    ease: easingCurve,
                    delay: launcherDelay,
                }}
                backgroundImage={widgetUrl ?? undefined}
                backgroundSize="cover"
                backgroundPosition="center"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <NdlSurface
                    size="full"
                    colorScheme="transparentBlack"
                    borderRadius="ndlRadiusSmall"
                    width={12}
                    height={12}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    backdropFilter="blur(var(--blur-ndlFrostedGlassHigh))"
                    transitionProperty="all"
                    transitionDuration="short"
                    _groupHover={{
                        backgroundColor: "ndlTransparencyGreyHover",
                    }}
                >
                    <NdlIcon name="grid" color="white" />
                </NdlSurface>
            </MotionBox>
        </MotionBox>
    );
};

DashboardWidgetLauncher.displayName = "DashboardWidgetLauncher";

export { DashboardWidgetLauncher };
