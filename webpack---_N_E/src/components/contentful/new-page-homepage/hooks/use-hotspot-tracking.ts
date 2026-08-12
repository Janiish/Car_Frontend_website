import type React from "react";
import { useState, useRef, useEffect } from "react";
import type { MotionValue } from "framer-motion";
import type { ActiveHotspotSet } from "../sections/cars/car-hotspot-data";

export const HOTSPOT_FRONT_RANGE: [number, number] = [0.15, 0.25];
export const HOTSPOT_BACK_RANGE: [number, number] = [0.74, 0.81];

function resolveActiveHotspotSet(progress: number): ActiveHotspotSet {
    if (progress >= HOTSPOT_FRONT_RANGE[0] && progress <= HOTSPOT_FRONT_RANGE[1]) {
        return "front";
    }
    if (progress >= HOTSPOT_BACK_RANGE[0] && progress <= HOTSPOT_BACK_RANGE[1]) {
        return "back";
    }
    return null;
}

export function useHotspotTracking(
    scrollYProgress: MotionValue<number>,
    setIsInView: (v: boolean) => void,
    setTabsVisible: (v: boolean) => void,
    isInViewRef: React.MutableRefObject<boolean>
) {
    const [activeHotspotSet, setActiveHotspotSet] = useState<ActiveHotspotSet>(null);
    const activeHotspotSetRef = useRef<ActiveHotspotSet>(null);

    useEffect(
        () =>
            scrollYProgress.on("change", (latest) => {
                const newHotspotSet = resolveActiveHotspotSet(latest);
                if (newHotspotSet !== activeHotspotSetRef.current) {
                    activeHotspotSetRef.current = newHotspotSet;
                    setActiveHotspotSet(newHotspotSet);
                }
                if (latest >= HOTSPOT_FRONT_RANGE[0] && !isInViewRef.current) {
                    setIsInView(true);
                    setTabsVisible(true);
                }
            }),
        [scrollYProgress, setIsInView, setTabsVisible, isInViewRef]
    );

    return activeHotspotSet;
}
