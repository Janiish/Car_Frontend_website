import { memo } from "react";
import { AnimatePresence } from "framer-motion";
import { Box, MotionBox, NdlIcon } from "@project/ui";
import sizes from "@project/ui/src/design-tokens/04.sizes/sizes";
import { useHomepageBreakpoints, useHomepageMotionPref } from "../../homepage-responsive-context";

type CarHotspotToggleProps = {
    hotspotsVisible: boolean;
    visible: boolean;
    onToggle: () => void;
};

const CarHotspotToggle = memo(function CarHotspotToggle({
    hotspotsVisible,
    visible,
    onToggle,
}: CarHotspotToggleProps) {
    const { isDesktopMd: isDesktop } = useHomepageBreakpoints();
    const { prefersReducedMotion } = useHomepageMotionPref();

    return (
        <Box
            as="button"
            position="relative"
            width={sizes.navQuickLinksHeight}
            height={sizes.navQuickLinksHeight}
            flexShrink={0}
            cursor={visible ? "pointer" : "default"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="ndlRadiusSmall"
            backgroundColor="transparent"
            border="none"
            color="white"
            transitionProperty="opacity, background-color, transform"
            transitionDuration="short"
            onClick={onToggle}
            aria-label={hotspotsVisible ? "Hide hotspots" : "Show hotspots"}
            title={hotspotsVisible ? "Hide hotspots" : "Show hotspots"}
            style={{
                opacity: visible ? 1 : 0,
                pointerEvents: visible ? "auto" : "none",
            }}
            _hover={{
                backgroundColor: "ndlLanguageSelectorHoverBg",
            }}
            _active={{
                transform: "scale(0.97)",
            }}
        >
            <AnimatePresence mode="popLayout" initial={false}>
                <MotionBox
                    key={hotspotsVisible ? "view" : "view-off"}
                    initial={
                        isDesktop
                            ? { opacity: 0, scale: 0.25, filter: "blur(4px)" }
                            : { opacity: 0, scale: 0.25 }
                    }
                    animate={
                        isDesktop
                            ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                            : { opacity: 1, scale: 1 }
                    }
                    exit={
                        isDesktop
                            ? { opacity: 0, scale: 0.25, filter: "blur(4px)" }
                            : { opacity: 0, scale: 0.25 }
                    }
                    transition={
                        prefersReducedMotion
                            ? { duration: 0 }
                            : { type: "spring", duration: 0.3, bounce: 0 }
                    }
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <NdlIcon name={hotspotsVisible ? "view" : "view-off"} color="white" />
                </MotionBox>
            </AnimatePresence>
        </Box>
    );
});

CarHotspotToggle.displayName = "CarHotspotToggle";

export { CarHotspotToggle };
