import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { MotionBox, type MotionBoxProps } from "@project/ui";
import { type measureElementIds, useDashboardLayout } from "./dashboard-layout-context";
import { useAppStore } from "@/store/app-store";
import {
    entryDelayValues,
    entryDurationValues,
    exitDelayValues,
    exitDurationValues,
    easingCurve,
} from "./motion-configs";

type DashboardAnimatedContainerProps = Omit<
    MotionBoxProps,
    "position" | "top" | "left" | "width" | "height"
> & {
    children: ReactNode;
    targetContainerId: Exclude<
        (typeof measureElementIds)[keyof typeof measureElementIds],
        "widget-launcher"
    >;
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
        "widget-launcher"
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

const buildAnimationState = (
    layout: ReturnType<typeof useDashboardLayout>["layout"],
    targetContainerId: DashboardAnimatedContainerProps["targetContainerId"],
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

const DashboardAnimatedContainer = ({
    children,
    targetContainerId,
    ...props
}: DashboardAnimatedContainerProps) => {
    const { layout, canAnimate, layoutReady } = useDashboardLayout();
    const {
        state: { isDashboardOpen },
    } = useAppStore();

    const [runTimeDisplay, setRunTimeDisplay] = useState<"block" | "none">("block");
    const prevOpenRef = useRef(false);

    // Explicit keyframes must only fire on the FIRST render after isDashboardOpen
    // flips to true. The launcher's click handler re-measures the layout in the
    // same React batch, so `launcherOffset` reflects the launcher's on-screen
    // position at the moment of the click. Without keyframes, framer-motion would
    // animate from the last committed transform, which was derived from a stale
    // measurement (e.g. taken on mount before the user scrolled). On subsequent
    // renders while open we fall through to `transform.x/y` (always 0 when open)
    // so framer-motion doesn't re-trigger the fan-out animation.
    const useOpenKeyframes = Boolean(isDashboardOpen) && canAnimate && !prevOpenRef.current;

    useEffect(() => {
        prevOpenRef.current = Boolean(isDashboardOpen);
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

    return (
        <MotionBox
            data-would-be-height={gridHeight}
            // Always absolutely positioned within grid cell (grid cell has position: relative)
            // When at grid: transform(0, 0) - visually at grid cell, scrolls with grid
            // When at widget-launcher: transform to widget-launcher position, still scrolls with grid
            // (but grid isn't scrollable when dashboard is closed due to RemoveScroll)
            position="absolute"
            // Enable pointer events only when dashboard is open
            // During exit animation, widgets are visible but not interactive
            // pointerEvents={isDashboardOpen ? "auto" : "none"}
            sx={{
                backfaceVisibility: "hidden",
                isolation: "isolate",
                willChange: "transform, clip-path",
            }}
            // Position at top-left of grid cell (parent has position: relative)
            top={0}
            left={0}
            // Maintain grid cell dimensions
            width={gridWidth || undefined}
            height={gridHeight || "100%"}
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
                scale: 0.9,
            }}
            animate={{
                // When layout is ready: animate to widget launcher position
                // When dashboard opens: animate back to grid position (no transform),
                // starting explicitly from the click-time launcher offset so the
                // expand always originates from the launcher's visual position.
                x: useOpenKeyframes ? [launcherOffset.x, 0] : transform.x,
                y: useOpenKeyframes ? [launcherOffset.y, 0] : transform.y,
                z: 0,
                clipPath: useOpenKeyframes
                    ? [
                          calculateClipPath(
                              gridWidth,
                              gridHeight,
                              widgetLauncherWidth,
                              widgetLauncherHeight,
                              false
                          ),
                          clipPath,
                      ]
                    : clipPath,
                // Keep widgets visible during animations (both entry and exit)
                // They should be visible above the backdrop during exit animation
                // When animation completes and dashboard is closed, hide widgets completely
                opacity: isDashboardOpen || (canAnimate && layoutReady) ? 1 : 0,
                scale: isDashboardOpen ? 1 : 0.9,
                // Hide widgets completely when at launcher position and animation is complete
                // This ensures they don't interfere with launcher even if z-index fails
                display: !isDashboardOpen && !canAnimate ? "none" : runTimeDisplay,
            }}
            transition={{
                ...transition,
                ease: shouldAnimate ? easingCurve : "linear",
                opacity: {
                    duration: shouldAnimate ? 0.3 : 0,
                },
            }}
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
                if (!isDashboardOpen && !canAnimate) {
                    setRunTimeDisplay("none");
                }
            }}
        >
            {children}
        </MotionBox>
    );
};

DashboardAnimatedContainer.displayName = "DashboardAnimatedContainer";

export { DashboardAnimatedContainer };
