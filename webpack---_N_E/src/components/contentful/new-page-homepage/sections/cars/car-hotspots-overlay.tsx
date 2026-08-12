import { memo, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { MotionBox, Box } from "@project/ui";
import { getHotspotStyle, type VideoLayoutMetrics } from "../../hooks/use-video-hotspot-layout";
import { easeDecelerate } from "../../configs/motion-tokens";
import { CarHotspot, type HotspotData } from "./car-hotspot";
import { resetAncestorScrollLeft } from "./car-hotspot-data";
import type { CarHotspots, ActiveHotspotSet } from "./car-hotspot-data";

export type CarHotspotsOverlayProps = {
    shouldAnimate: boolean;
    isVisible: boolean;
    hotspotsVisible: boolean;
    effectiveHotspotSet: ActiveHotspotSet;
    selectedCarIndex: number;
    prefersReducedMotion: boolean;
    hotspotMetrics: VideoLayoutMetrics;
    activeCarHotspots: CarHotspots;
    onSentinelFocus: (set: "front" | "back") => void;
    onOverlayBlur: (e: React.FocusEvent) => void;
};

export const CarHotspotsOverlay = memo(function CarHotspotsOverlay({
    shouldAnimate,
    isVisible,
    hotspotsVisible,
    effectiveHotspotSet,
    selectedCarIndex,
    prefersReducedMotion,
    hotspotMetrics,
    activeCarHotspots,
    onSentinelFocus,
    onOverlayBlur,
}: CarHotspotsOverlayProps) {
    const frontGroupRef = useRef<HTMLDivElement>(null);
    const backGroupRef = useRef<HTMLDivElement>(null);

    const handleOverlayFocus = useCallback((e: React.FocusEvent) => {
        resetAncestorScrollLeft((e.currentTarget as HTMLElement).parentElement);
    }, []);

    const handleSentinelFocus = useCallback(
        (set: "front" | "back") => {
            onSentinelFocus(set);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    const groupEl = set === "front" ? frontGroupRef.current : backGroupRef.current;
                    const btn = groupEl?.querySelector<HTMLElement>("[data-details-card] button");
                    btn?.focus({ preventScroll: true });
                });
            });
        },
        [onSentinelFocus]
    );

    return (
        <Box
            position="absolute"
            inset="0"
            pointerEvents="none"
            zIndex={5}
            display={{ base: "none", l: "block" }}
            onFocus={handleOverlayFocus}
            onBlur={onOverlayBlur}
        >
            <HotspotGroup
                groupRef={frontGroupRef}
                set="front"
                isVisible={isVisible}
                hotspotsVisible={hotspotsVisible}
                shouldAnimate={shouldAnimate}
                effectiveHotspotSet={effectiveHotspotSet}
                hotspots={activeCarHotspots.front}
                selectedCarIndex={selectedCarIndex}
                prefersReducedMotion={prefersReducedMotion}
                hotspotMetrics={hotspotMetrics}
                onSentinelFocus={handleSentinelFocus}
                ariaLabel="Front car details"
            />
            <HotspotGroup
                groupRef={backGroupRef}
                set="back"
                isVisible={isVisible}
                hotspotsVisible={hotspotsVisible}
                shouldAnimate={shouldAnimate}
                effectiveHotspotSet={effectiveHotspotSet}
                hotspots={activeCarHotspots.back}
                selectedCarIndex={selectedCarIndex}
                prefersReducedMotion={prefersReducedMotion}
                hotspotMetrics={hotspotMetrics}
                onSentinelFocus={handleSentinelFocus}
                ariaLabel="Rear car details"
            />
        </Box>
    );
});

CarHotspotsOverlay.displayName = "CarHotspotsOverlay";

// ---------------------------------------------------------------------------
// Internal sub-component (not exported)
// ---------------------------------------------------------------------------

type HotspotGroupProps = {
    groupRef: React.RefObject<HTMLDivElement | null>;
    set: "front" | "back";
    isVisible: boolean;
    hotspotsVisible: boolean;
    shouldAnimate: boolean;
    effectiveHotspotSet: ActiveHotspotSet;
    hotspots: HotspotData[];
    selectedCarIndex: number;
    prefersReducedMotion: boolean;
    hotspotMetrics: VideoLayoutMetrics;
    onSentinelFocus: (set: "front" | "back") => void;
    ariaLabel: string;
};

function HotspotGroup({
    groupRef,
    set,
    isVisible,
    hotspotsVisible,
    shouldAnimate,
    effectiveHotspotSet,
    hotspots,
    selectedCarIndex,
    prefersReducedMotion,
    hotspotMetrics,
    onSentinelFocus,
    ariaLabel,
}: Readonly<HotspotGroupProps>) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        if (!isVisible || !hotspotsVisible || effectiveHotspotSet !== set) {
            setOpenIndex(null);
        }
    }, [isVisible, hotspotsVisible, effectiveHotspotSet, set]);

    useEffect(() => {
        setOpenIndex(null);
    }, [selectedCarIndex]);

    const handleOpenChange = useCallback((index: number, isOpen: boolean) => {
        setOpenIndex(isOpen ? index : null);
    }, []);

    return (
        <Box ref={groupRef as React.LegacyRef<HTMLDivElement>}>
            <Box
                as="span"
                tabIndex={isVisible && hotspotsVisible && hotspots.length > 0 ? 0 : -1}
                position="absolute"
                width="1px"
                height="1px"
                overflow="hidden"
                sx={{ clip: "rect(0,0,0,0)" }}
                aria-label={ariaLabel}
                onFocus={(e: React.FocusEvent) => {
                    // Shift+Tab out of the group re-focuses this leading sentinel.
                    // If focus arrived from within the group, the user is tabbing
                    // backward out — don't recapture into the first card (that
                    // creates a backward focus trap); let focus pass through.
                    if (groupRef.current?.contains(e.relatedTarget as Node | null)) return;
                    onSentinelFocus(set);
                }}
            />
            <AnimatePresence>
                {shouldAnimate &&
                    effectiveHotspotSet === set &&
                    hotspotsVisible &&
                    hotspots.map((hotspot, i) => (
                        <MotionBox
                            key={`${selectedCarIndex}-${set}-${i}`}
                            position="absolute"
                            pointerEvents="auto"
                            style={getHotspotStyle(hotspot.x, hotspot.y, hotspotMetrics)}
                            initial={{ y: 12, opacity: 0 }}
                            animate={{
                                y: 0,
                                opacity: 1,
                                transition: {
                                    duration: 0.4,
                                    ease: easeDecelerate,
                                    delay: prefersReducedMotion ? 0 : i * 0.08,
                                },
                            }}
                            exit={{
                                y: 12,
                                opacity: 0,
                                transition: { duration: 0.2, ease: easeDecelerate, delay: 0 },
                            }}
                        >
                            <CarHotspot
                                hotspot={hotspot}
                                index={i}
                                scale={hotspotMetrics.scale}
                                isOpen={openIndex === i}
                                onOpenChange={(isOpen) => handleOpenChange(i, isOpen)}
                            />
                        </MotionBox>
                    ))}
            </AnimatePresence>
        </Box>
    );
}
