import { AnimatePresence } from "framer-motion";
import { RemoveScroll } from "react-remove-scroll";
import { Box, MotionBox, NdlHeading } from "@project/ui";
import { useHomepageBreakpoints } from "../homepage-responsive-context";
import { easeNavEnter, easeNavExit } from "../configs/motion-tokens";

/**
 * Full-screen prompt shown on phones in landscape:
 * the homepage scrollytelling is designed portrait-only,
 * so instead of degrading we ask the user to rotate back. Detection lives in
 * homepage-responsive-context (`isMobileLandscape`).
 *
 * While the prompt is shown, scrolling is locked via RemoveScroll — the same
 * mechanism the main nav and language selector use — so the page can't move
 * underneath it.
 */
const RotateDeviceOverlay = () => {
    const { isMobileLandscape } = useHomepageBreakpoints();

    return (
        <RemoveScroll enabled={isMobileLandscape}>
            <AnimatePresence>
                {isMobileLandscape && (
                    <MotionBox
                        as="output"
                        data-lenis-prevent
                        position="fixed"
                        inset={0}
                        zIndex={2100}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        gap={3}
                        px={10}
                        bg="porscheBlack"
                        color="allWhite"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            transition: { duration: 0.3, ease: easeNavEnter },
                        }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.2, ease: easeNavExit },
                        }}
                    >
                        <NdlHeading size="headerM" as="p" color="allWhite">
                            Please rotate your device
                        </NdlHeading>
                        <Box as="p" opacity={0.7} sx={{ textWrap: "pretty" }}>
                            This experience is designed for portrait.
                        </Box>
                    </MotionBox>
                )}
            </AnimatePresence>
        </RemoveScroll>
    );
};

RotateDeviceOverlay.displayName = "RotateDeviceOverlay";

export { RotateDeviceOverlay };
