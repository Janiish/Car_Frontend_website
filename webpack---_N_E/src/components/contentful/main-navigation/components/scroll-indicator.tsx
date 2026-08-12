import type { RefObject } from "react";
import { useState, useCallback, useEffect, useLayoutEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { MotionBox } from "@project/ui";
import type { BoxProps } from "@project/ui";

/** useLayoutEffect warns during SSR; fall back to useEffect on the server. */
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const gradientLinear =
    "linear-gradient(180deg,rgba(0, 0, 0, 0) 11%, rgba(0, 0, 0, 0.70) 90%)";

export const scrollbarStyles = {
    scrollbarWidth: "none" as const,
    "&::webkit-scrollbar": {
        display: "none",
    },
};

export const navigationScrollbarStyles = {
    "scrollbar-gutter": "stable",
    "&::-webkit-scrollbar": {
        display: {
            base: "none",
            l: "block",
        },
        width: {
            base: 0,
            l: 1,
        },
        height: {
            base: 0,
            l: 10,
        },
        backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(255,255,255,0.25)",
        borderRadius: 4,
    },
};

export const ScrollIndicatorGradientOverlay = ({
    show = true,
    ...props
}: BoxProps & { show?: boolean }) => (
    <AnimatePresence>
        {show && (
            <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                height={36}
                width="100%"
                position="absolute"
                left={0}
                right={0}
                bottom={0}
                backgroundImage={gradientLinear}
                className="scroll-indicator-gradient-overlay"
                pointerEvents="none"
                {...props}
            />
        )}
    </AnimatePresence>
);

export const useScrollIndicator = (
    scrollContainerRef: RefObject<HTMLDivElement> | null,
    isContentVisible: boolean,
    remeasureKey?: unknown
) => {
    const [shouldShowIndicator, setShouldShowIndicator] = useState(false);

    const checkScrollState = useCallback(() => {
        const scrollContainer = scrollContainerRef?.current;

        if (!scrollContainer) {
            setShouldShowIndicator(false);
            return;
        }

        const { scrollHeight, clientHeight, scrollTop } = scrollContainer;
        const scrollThreshold = 40; // How close to bottom before hiding

        const hasScrollableContent = scrollHeight > clientHeight;
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - scrollThreshold;
        const shouldShow = hasScrollableContent && !isNearBottom;

        setShouldShowIndicator(shouldShow);
    }, [scrollContainerRef]);

    // Measure after layout when content becomes visible
    useIsomorphicLayoutEffect(() => {
        if (!isContentVisible || !scrollContainerRef?.current) {
            setShouldShowIndicator(false);
            return;
        }

        const rafId = requestAnimationFrame(() => {
            checkScrollState();
        });

        return () => cancelAnimationFrame(rafId);
    }, [scrollContainerRef, isContentVisible, checkScrollState, remeasureKey]);

    // Re-check when container or content size changes
    useEffect(() => {
        const scrollContainer = scrollContainerRef?.current;

        if (!scrollContainer || !isContentVisible) {
            return;
        }

        const resizeObserver = new ResizeObserver(() => {
            checkScrollState();
        });

        resizeObserver.observe(scrollContainer);

        const mutationObserver = new MutationObserver(() => {
            requestAnimationFrame(() => {
                checkScrollState();
            });
        });

        mutationObserver.observe(scrollContainer, {
            childList: true,
            subtree: true,
        });

        return () => {
            resizeObserver.disconnect();
            mutationObserver.disconnect();
        };
    }, [scrollContainerRef, isContentVisible, checkScrollState, remeasureKey]);

    return { shouldShowIndicator, handleScroll: checkScrollState };
};
