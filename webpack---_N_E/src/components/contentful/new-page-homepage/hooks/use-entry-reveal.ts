import { useState, type RefObject } from "react";
import { useMotionTemplate, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

type UseEntryRevealOptions = {
    target: RefObject<HTMLElement>;
    /** false disables the reveal entirely (mobile, reduced motion) */
    enabled: boolean;
    /** corner radius while clipped, e.g. "2rem" or radii.ndlRadiusXLarge */
    radius: string;
};

/**
 * Scroll-driven section entry: scale 0.95→1 with an inset(25%→0) clip reveal.
 * GPU-friendly: clipPath instead of width (avoids layout per frame).
 * will-change is held only while the reveal is mid-flight.
 */
function useEntryReveal({ target, enabled, radius }: UseEntryRevealOptions) {
    const { scrollYProgress: entryProgress } = useScroll({
        target,
        offset: ["start end", "start start"],
    });

    const insetPercent = useTransform(entryProgress, [0, 1], [25, 0]);
    const clipBorderRadius = useTransform(entryProgress, [0, 0.9, 1], [radius, radius, "0px"]);
    const clipPath = useMotionTemplate`inset(0 ${insetPercent}% 0 ${insetPercent}% round ${clipBorderRadius})`;
    const scale = useTransform(entryProgress, [0, 1], [0.95, 1]);

    const [inFlight, setInFlight] = useState(false);
    useMotionValueEvent(entryProgress, "change", (p) => {
        const next = p > 0 && p < 1;
        if (next !== inFlight) setInFlight(next);
    });

    return {
        entryProgress,
        style: enabled ? { clipPath, scale } : { clipPath: "none" as const, scale: 1 },
        willChange: enabled && inFlight ? ("clip-path, transform" as const) : ("auto" as const),
    };
}

export { useEntryReveal };
