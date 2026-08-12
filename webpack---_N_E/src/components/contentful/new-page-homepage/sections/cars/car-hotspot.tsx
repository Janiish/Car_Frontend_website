import { memo, useEffect, useState } from "react";
import { useIsPresent } from "framer-motion";
import { Box, DetailsCard, type ContentfulCloudinaryAssetField } from "@project/ui";
import { useHomepageMotionPref } from "../../homepage-responsive-context";
import { easeDecelerate, cssBezier } from "../../configs/motion-tokens";

type HotspotData = {
    x: number;
    y: number;
    title: string;
    subtitle?: string;
    description?: string;
    asset?: ContentfulCloudinaryAssetField;
};

type CarHotspotProps = {
    hotspot: HotspotData;
    index: number;
    scale: number;
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
};

/**
 * Self-contained hotspot card that defers its own CSS opacity by one
 * frame so the browser can initialise the backdrop-filter compositing
 * layer before the fade-in starts. Each instance owns its lifecycle —
 * no external "visible" state needed.
 */
const CarHotspot = memo(function CarHotspot({
    hotspot,
    index,
    scale,
    isOpen,
    onOpenChange,
}: CarHotspotProps) {
    const isPresent = useIsPresent();
    const [visible, setVisible] = useState(false);
    const { prefersReducedMotion } = useHomepageMotionPref();

    useEffect(() => {
        if (isPresent) {
            const id = requestAnimationFrame(() => setVisible(true));
            return () => cancelAnimationFrame(id);
        }
        setVisible(false);
    }, [isPresent]);

    const staggerDelay = prefersReducedMotion ? 0 : index * 0.08;
    const cardTransition = visible
        ? `opacity 0.35s ${cssBezier(easeDecelerate)} ${staggerDelay}s`
        : `opacity 0.2s ${cssBezier(easeDecelerate)} 0s`;

    return (
        <Box
            style={{
                transform: `scale(${scale})`,
                pointerEvents: visible ? "auto" : "none",
                cursor: visible ? "pointer" : "default",
            }}
        >
            <DetailsCard
                title={hotspot.title}
                subtitle={hotspot.subtitle}
                description={hotspot.description}
                detailsAsset={hotspot.asset}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                style={{
                    opacity: visible ? 1 : 0,
                    transition: cardTransition,
                }}
            />
        </Box>
    );
});

CarHotspot.displayName = "CarHotspot";

export { CarHotspot };
export type { HotspotData };
