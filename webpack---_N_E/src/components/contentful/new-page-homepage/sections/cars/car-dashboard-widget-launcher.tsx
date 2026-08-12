import { memo, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { MotionBox, Box, NdlIcon, NdlSurface, NdlHeading } from "@project/ui";
import {
    measureElementIds,
    useCarDashboardLayoutActions,
    useCarDashboardViewState,
    useIsDashboardOpen,
    useLayoutReady,
} from "./car-dashboard-layout-context";
import sizes from "@project/ui/src/design-tokens/04.sizes/sizes";
import type { DashboardCar3dFieldsFragment } from "../../__generated/page-homepage.contentful.generated";
import { useAppStore } from "@/store/app-store";
import { PAGMSHEvents, PAGMSHModuleNames, sendPagDataToGTM } from "@/lib/google-tag-manager/events";
import { useHomepageMotionPref } from "../../homepage-responsive-context";
import { easeDecelerate, cssBezier, easeStandard } from "../../configs/motion-tokens";

const getLauncherDelay = (canAnimate: boolean, isDashboardOpen: boolean) => {
    if (!canAnimate && !isDashboardOpen) {
        return 0;
    }

    if (isDashboardOpen) {
        return 0.33;
    }

    return 0.75;
};

function useLauncherState() {
    const layoutReady = useLayoutReady();
    const { isInView, canAnimate } = useCarDashboardViewState();
    const isDashboardOpen = useIsDashboardOpen();
    const { updateLayout, setCanAnimate, setIsDashboardOpen } = useCarDashboardLayoutActions();

    const shouldAnimate = layoutReady && isInView;
    const launcherDelay = getLauncherDelay(canAnimate, Boolean(isDashboardOpen));

    const handleClick = () => {
        updateLayout();
        setCanAnimate(true);
        setIsDashboardOpen(true);
    };

    return { shouldAnimate, canAnimate, isDashboardOpen, launcherDelay, handleClick };
}

// ---------------------------------------------------------------------------
// Unified widget launcher: horizontal pill with label + grid icon
// Desktop: icon left, label right (row-reverse for visual order)
// Mobile: label left, icon right (standard row)
// ---------------------------------------------------------------------------

type CarDashboardWidgetLauncherProps = {
    car3d: DashboardCar3dFieldsFragment | null | undefined;
    /**
     * When false, the component skips its own entrance animation (y-translate)
     * because the parent container already handles it (e.g. the desktop toolbar).
     */
    selfAnimated?: boolean;
};

// Press-feedback transition for the whileTap scale — kept separate from the
// entrance transition's key so the two don't clobber each other.
const TAP_SCALE_TRANSITION = { scale: { duration: 0.16, ease: easeDecelerate } } as const;

function computeLauncherMotion(
    selfAnimated: boolean,
    shouldAnimate: boolean,
    isDashboardOpen: boolean,
    launcherDelay: number
) {
    if (!selfAnimated) {
        return {
            motionProps: {
                transition: TAP_SCALE_TRANSITION,
            },
            opacityStyle: {
                opacity: isDashboardOpen ? 0 : 1,
                transition: "opacity 0.3s ease",
            },
            isInteractive: !isDashboardOpen,
        };
    }

    return {
        motionProps: {
            initial: shouldAnimate ? false : ({ y: 20 } as const),
            animate: { y: shouldAnimate ? 0 : 20 },
            transition: {
                duration: 0.6,
                ease: easeStandard,
                delay: launcherDelay,
                ...TAP_SCALE_TRANSITION,
            },
        },
        opacityStyle: {
            opacity: shouldAnimate && !isDashboardOpen ? 1 : 0,
            transition: `opacity 0.6s ${cssBezier(easeStandard)} ${launcherDelay}s`,
        },
        isInteractive: shouldAnimate && !isDashboardOpen,
    };
}

const CarDashboardWidgetLauncher = memo(function CarDashboardWidgetLauncher({
    car3d,
    selfAnimated = true,
}: CarDashboardWidgetLauncherProps) {
    const { shouldAnimate, canAnimate, isDashboardOpen, launcherDelay, handleClick } =
        useLauncherState();
    const { prefersReducedMotion } = useHomepageMotionPref();

    const { locale } = useRouter();
    const {
        state: { pageType, pageId, pageContentTags },
    } = useAppStore();

    const displayedCar3dRef = useRef(car3d);
    useEffect(() => {
        if (shouldAnimate) {
            displayedCar3dRef.current = car3d;
        }
    }, [shouldAnimate, car3d]);

    const displayedCar3d = shouldAnimate ? car3d : displayedCar3dRef.current;
    const label = displayedCar3d?.dashboardWidgetLauncherLabel;
    const carName =
        displayedCar3d?.displayName ??
        (displayedCar3d?.car?.__typename === "Car" ? displayedCar3d.car.name : undefined);

    const handleLauncherClick = () => {
        sendPagDataToGTM({
            eventAction: PAGMSHEvents.carDashboardOpen,
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
                clickElementName: `Launcher: ${carName ?? label ?? ""}`,
            },
        });

        handleClick();
    };

    const { motionProps, opacityStyle, isInteractive } = computeLauncherMotion(
        selfAnimated,
        shouldAnimate,
        isDashboardOpen,
        launcherDelay
    );

    return (
        <MotionBox
            as="button"
            type="button"
            data-group
            id={measureElementIds["widget-launcher"]}
            position="relative"
            zIndex={isDashboardOpen || canAnimate ? 2000 : 11}
            pointerEvents={isInteractive ? "auto" : "none"}
            width={{ base: "100%", l: "auto" }}
            height={sizes.navQuickLinksHeight}
            flexShrink={0}
            cursor="pointer"
            isolation="isolate"
            border="none"
            padding={0}
            backgroundColor="transparent"
            onClick={handleLauncherClick}
            aria-label={label ?? undefined}
            {...motionProps}
            whileTap={{ scale: 0.98 }}
            style={opacityStyle}
        >
            <NdlSurface
                colorScheme="black"
                borderRadius="ndlRadiusSmall"
                width="full"
                height="full"
                display="flex"
                alignItems="center"
                flexDirection={{ base: "row", l: "row-reverse" }}
                padding={0}
                overflow="hidden"
                position="relative"
            >
                <Box
                    position="absolute"
                    inset={0}
                    borderRadius="ndlRadiusSmall"
                    backgroundColor="transparent"
                    pointerEvents="none"
                    transitionProperty="background-color"
                    transitionDuration="short"
                    _groupHover={{
                        backgroundColor: "ndlLanguageSelectorHoverBg",
                    }}
                />
                <Box
                    position="relative"
                    zIndex={1}
                    flex={1}
                    minWidth="0"
                    pl={{ base: 4, l: 0 }}
                    pr={4}
                    display="flex"
                    alignItems="center"
                >
                    <NdlHeading size="headerS" color="allWhite" whiteSpace="nowrap">
                        <MotionBox
                            as="span"
                            display="inline-block"
                            key={label ?? "empty"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: prefersReducedMotion ? 0 : 0.35,
                                ease: easeStandard,
                            }}
                        >
                            {label}
                        </MotionBox>
                    </NdlHeading>
                </Box>

                <Box
                    position="relative"
                    zIndex={1}
                    width={sizes.navQuickLinksHeight}
                    height={sizes.navQuickLinksHeight}
                    flexShrink={0}
                    borderRadius="ndlRadiusXSmall"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <NdlIcon name="grid" color="white" />
                </Box>
            </NdlSurface>
        </MotionBox>
    );
});

CarDashboardWidgetLauncher.displayName = "CarDashboardWidgetLauncher";

export { CarDashboardWidgetLauncher };
