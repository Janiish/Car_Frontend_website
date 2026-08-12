import { memo, useEffect, useRef, useMemo, useState, type ReactNode } from "react";
import { MotionBox, type MotionBoxProps } from "@project/ui";
import {
    type measureElementIds,
    useCarDashboardLayoutOnly,
    useCarDashboardViewState,
    useIsDashboardOpen,
} from "./car-dashboard-layout-context";
import { useHomepageMotionPref } from "../../homepage-responsive-context";
import {
    entryDelayValues,
    entryDurationValues,
    exitDelayValues,
    exitDurationValues,
    easingCurve,
} from "./motion-configs";

type CarDashboardAnimatedContainerProps = Omit<
    MotionBoxProps,
    "position" | "top" | "left" | "width" | "height"
> & {
    children: ReactNode;
    targetContainerId: Exclude<
        (typeof measureElementIds)[keyof typeof measureElementIds],
        (typeof measureElementIds)["widget-launcher"]
    >;
    /**
     * On mobile, participate in normal document flow and size to content instead of
     * filling a measured absolute grid cell. Desktop keeps the absolute morph behavior.
     */
    contentSizedOnMobile?: boolean;
    opacityAnimation?: {
        open?: {
            delay?: number;
            duration?: number;
            targetOpacity?: number;
        };
        close?: {
            delay?: number;
            duration?: number;
            targetOpacity?: number;
        };
    };
};

const calculateClipPath = (
    gridWidth: number,
    gridHeight: number,
    widgetLauncherWidth: number,
    widgetLauncherHeight: number,
    isOpen: boolean
): string => {
    if (isOpen) {
        return "inset(0px 0px 0px 0px round var(--radii-ndlRadiusCard))";
    }

    const clipRight = Math.max(0, gridWidth - widgetLauncherWidth);
    const clipBottom = Math.max(0, gridHeight - widgetLauncherHeight);
    return `inset(0px ${clipRight}px ${clipBottom}px 0px round var(--radii-ndlRadiusCard))`;
};

const calculateTransform = (
    gridX: number,
    gridY: number,
    widgetLauncherX: number,
    widgetLauncherY: number,
    isOpen: boolean,
    layoutReady: boolean
) => {
    if (!layoutReady || isOpen) {
        return { x: 0, y: 0 };
    }

    return {
        x: widgetLauncherX - gridX,
        y: widgetLauncherY - gridY,
    };
};

const calculateTransition = (
    canAnimate: boolean,
    layoutReady: boolean,
    isDashboardOpen: boolean,
    targetContainerId: Exclude<
        (typeof measureElementIds)[keyof typeof measureElementIds],
        (typeof measureElementIds)["widget-launcher"]
    >
) => {
    if (!canAnimate || !layoutReady) {
        return { duration: 0, delay: 0 };
    }

    return {
        duration: isDashboardOpen
            ? entryDurationValues[targetContainerId]
            : exitDurationValues[targetContainerId],
        delay: isDashboardOpen
            ? entryDelayValues[targetContainerId]
            : exitDelayValues[targetContainerId],
    };
};

const calculateWidgetZIndex = (isDashboardOpen: boolean, canAnimate: boolean): number => {
    // Priority: when open, widgets must be above backdrop/launcher for interaction.
    if (isDashboardOpen) {
        return 1;
    }
    // During exit animation, keep them visible above backdrop.
    if (canAnimate) {
        return 0;
    }
    // Closed: keep them below the launcher.
    return -1;
};

const resolveOpacityTarget = ({
    isDashboardOpen,
    isClosingDashboard,
    layoutReady,
    opacityAnimation,
}: {
    isDashboardOpen: boolean;
    isClosingDashboard: boolean;
    layoutReady: boolean;
    opacityAnimation: CarDashboardAnimatedContainerProps["opacityAnimation"];
}) => {
    if (isDashboardOpen) {
        return opacityAnimation?.open?.targetOpacity ?? 1;
    }

    if (isClosingDashboard && layoutReady) {
        if (opacityAnimation?.close) {
            return opacityAnimation.close.targetOpacity ?? 0;
        }

        return 1;
    }

    return 0;
};

const resolveOpacityTransition = ({
    shouldAnimate,
    isDashboardOpen,
    isClosingDashboard,
    opacityAnimation,
}: {
    shouldAnimate: boolean;
    isDashboardOpen: boolean;
    isClosingDashboard: boolean;
    opacityAnimation: CarDashboardAnimatedContainerProps["opacityAnimation"];
}) => {
    if (!shouldAnimate) {
        return { duration: 0, delay: 0 };
    }

    if (isDashboardOpen) {
        return {
            duration: opacityAnimation?.open?.duration ?? 0.3,
            delay: opacityAnimation?.open?.delay ?? 0.1,
        };
    }

    if (isClosingDashboard && opacityAnimation?.close) {
        return {
            duration: opacityAnimation.close.duration ?? 0.2,
            delay: opacityAnimation.close.delay ?? 0,
        };
    }

    return { duration: 0, delay: 0 };
};

const buildAnimationState = (
    layout: ReturnType<typeof useCarDashboardLayoutOnly>["layout"],
    targetContainerId: CarDashboardAnimatedContainerProps["targetContainerId"],
    isDashboardOpen: boolean,
    layoutReady: boolean,
    canAnimate: boolean
) => {
    const gridLayout = layout[targetContainerId];
    const widgetLauncherLayout = layout["widget-launcher"];

    const gridWidth = gridLayout.width ?? 0;
    const gridHeight = gridLayout.height ?? 0;
    const gridX = gridLayout.x ?? 0;
    const gridY = gridLayout.y ?? 0;

    const widgetLauncherX = widgetLauncherLayout.x ?? 0;
    const widgetLauncherY = widgetLauncherLayout.y ?? 0;
    const widgetLauncherWidth = widgetLauncherLayout.width ?? 0;
    const widgetLauncherHeight = widgetLauncherLayout.height ?? 0;

    const transform = calculateTransform(
        gridX,
        gridY,
        widgetLauncherX,
        widgetLauncherY,
        isDashboardOpen,
        layoutReady
    );

    const clipPath = calculateClipPath(
        gridWidth,
        gridHeight,
        widgetLauncherWidth,
        widgetLauncherHeight,
        isDashboardOpen
    );

    const shouldAnimate = Boolean(isDashboardOpen || canAnimate);

    const transition = shouldAnimate
        ? calculateTransition(canAnimate, layoutReady, isDashboardOpen, targetContainerId)
        : { duration: 0, delay: 0 };

    return {
        gridWidth,
        gridHeight,
        widgetLauncherWidth,
        widgetLauncherHeight,
        transform,
        launcherOffset: layoutReady
            ? { x: widgetLauncherX - gridX, y: widgetLauncherY - gridY }
            : { x: 0, y: 0 },
        clipPath,
        shouldAnimate,
        transition,
    };
};

const NO_MOTION = { duration: 0, delay: 0 } as const;

/** Absolute morph layout vs mobile content-flow layout inside the grid cell. */
const resolveBoxLayout = (
    sizeToContentOnMobile: boolean,
    gridWidth: number,
    gridHeight: number
) => {
    if (!sizeToContentOnMobile) {
        return {
            position: "absolute" as const,
            top: 0,
            left: 0,
            width: gridWidth || undefined,
            height: gridHeight || "100%",
        };
    }

    return {
        position: { base: "relative", l: "absolute" } as const,
        top: { base: "auto", l: 0 },
        left: { base: "auto", l: 0 },
        width: { base: "100%", l: gridWidth || undefined },
        height: { base: "auto", l: gridHeight || "100%" },
    };
};

const resolveAxisMotion = (
    useOpenKeyframes: boolean,
    prefersReducedMotion: boolean,
    launcherOffset: { x: number; y: number },
    transform: { x: number; y: number }
) => {
    if (useOpenKeyframes && !prefersReducedMotion) {
        return {
            x: [launcherOffset.x, 0],
            y: [launcherOffset.y, 0],
        };
    }

    return { x: transform.x, y: transform.y };
};

const resolveMotionTransition = ({
    prefersReducedMotion,
    shouldAnimate,
    transition,
    opacityTransition,
}: {
    prefersReducedMotion: boolean;
    shouldAnimate: boolean;
    transition: { duration: number; delay: number };
    opacityTransition: { duration: number; delay: number };
}) => {
    if (prefersReducedMotion) {
        return { ...NO_MOTION, opacity: NO_MOTION };
    }

    return {
        ...transition,
        ease: shouldAnimate ? easingCurve : "linear",
        opacity: opacityTransition,
    };
};

const CarDashboardAnimatedContainer = memo(function CarDashboardAnimatedContainer({
    children,
    targetContainerId,
    contentSizedOnMobile = false,
    opacityAnimation,
    style: styleProp,
    ...props
}: CarDashboardAnimatedContainerProps) {
    const { layout, layoutReady } = useCarDashboardLayoutOnly();
    const { canAnimate } = useCarDashboardViewState();
    const isDashboardOpen = useIsDashboardOpen();
    const { prefersReducedMotion } = useHomepageMotionPref();

    const [runTimeDisplay, setRunTimeDisplay] = useState<"block" | "none">("block");
    const [interactable, setInteractable] = useState(false);
    const prevOpenRef = useRef(false);

    // Keyframes should only fire on the FIRST render after isDashboardOpen
    // flips to true. On subsequent renders (e.g. resize while open) we fall
    // through to the simple `transform.x/y` values (always 0 when open) so
    // framer-motion doesn't re-trigger the fan-out animation.
    const useOpenKeyframes = Boolean(isDashboardOpen && canAnimate && !prevOpenRef.current);

    useEffect(() => {
        prevOpenRef.current = Boolean(isDashboardOpen);
    }, [isDashboardOpen]);

    useEffect(() => {
        setInteractable(Boolean(isDashboardOpen));
    }, [isDashboardOpen]);

    const {
        gridWidth,
        gridHeight,
        widgetLauncherWidth,
        widgetLauncherHeight,
        transform,
        launcherOffset,
        clipPath,
        shouldAnimate,
        transition,
    } = useMemo(
        () =>
            buildAnimationState(
                layout,
                targetContainerId,
                Boolean(isDashboardOpen),
                Boolean(layoutReady),
                Boolean(canAnimate)
            ),
        [layout, targetContainerId, isDashboardOpen, layoutReady, canAnimate]
    );

    const isClosingDashboard = !isDashboardOpen && canAnimate;
    // Only leave absolute positioning while the dashboard is open/animating on mobile.
    // Idle-closed stays absolute inside the fixed row so launcher morph measurements stay valid.
    const sizeToContentOnMobile = Boolean(contentSizedOnMobile && (isDashboardOpen || canAnimate));
    const boxLayout = resolveBoxLayout(sizeToContentOnMobile, gridWidth, gridHeight);
    const axisMotion = resolveAxisMotion(
        useOpenKeyframes,
        prefersReducedMotion,
        launcherOffset,
        transform
    );
    const opacity = resolveOpacityTarget({
        isDashboardOpen: Boolean(isDashboardOpen),
        isClosingDashboard,
        layoutReady: Boolean(layoutReady),
        opacityAnimation,
    });
    const opacityTransition = resolveOpacityTransition({
        shouldAnimate,
        isDashboardOpen: Boolean(isDashboardOpen),
        isClosingDashboard,
        opacityAnimation,
    });
    const isIdleClosed = !isDashboardOpen && !canAnimate;

    return (
        <MotionBox
            data-would-be-height={gridHeight}
            {...boxLayout}
            // Enable pointer events only when dashboard is open
            // During exit animation, widgets are visible but not interactive
            pointerEvents={interactable ? "auto" : "none"}
            sx={{
                backfaceVisibility: "hidden",
                isolation: "isolate",
            }}
            style={{ willChange: canAnimate ? "transform" : "auto", ...styleProp }}
            // Initially positioned at grid (no transform)
            initial={{
                x: 0,
                y: 0,
                z: 0,
                clipPath: calculateClipPath(
                    gridWidth,
                    gridHeight,
                    widgetLauncherWidth,
                    widgetLauncherHeight,
                    true
                ),
                opacity: 0,
            }}
            animate={{
                ...axisMotion,
                z: 0,
                clipPath,
                opacity,
                display: isIdleClosed ? "none" : runTimeDisplay,
            }}
            transition={resolveMotionTransition({
                prefersReducedMotion,
                shouldAnimate,
                transition,
                opacityTransition,
            })}
            borderRadius="ndlRadiusCard"
            backgroundColor="ndlTransparencyBlack"
            transformOrigin="1px 1px"
            // Z-index strategy to ensure widgets are ALWAYS below launcher:
            // - During opening animation: zIndex={0} (below launcher, allows launcher overlay fade-out)
            // - When fully open: zIndex={1} (above backdrop, visible)
            // - During exit animation: zIndex={0} (visible above backdrop)
            // - When animation completes: zIndex={-1} (below launcher)
            zIndex={calculateWidgetZIndex(Boolean(isDashboardOpen), Boolean(canAnimate))}
            {...props}
            onAnimationStart={() => {
                setRunTimeDisplay("block");
            }}
            onAnimationComplete={() => {
                if (isIdleClosed) {
                    setRunTimeDisplay("none");
                }
            }}
        >
            {children}
        </MotionBox>
    );
});

CarDashboardAnimatedContainer.displayName = "CarDashboardAnimatedContainer";

export { CarDashboardAnimatedContainer };
