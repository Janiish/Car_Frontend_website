import { Flex, Box, useCldVideoPlayer, useTogglePlay, ButtonPure } from "@project/ui";
import screenfull from "screenfull";
import { PAGMSHEvents } from "@/lib/google-tag-manager/events";
import dynamic from "next/dynamic";

const CldVideoScrubber = dynamic(() => import("@project/ui").then((mod) => mod.CldVideoScrubber));
const CldVideoToggleMute = dynamic(() =>
    import("@project/ui").then((mod) => mod.CldVideoToggleMute)
);
const CldVideoToggleFullscreen = dynamic(() =>
    import("@project/ui").then((mod) => mod.CldVideoToggleFullscreen)
);
const CldVideoTimeRemaining = dynamic(() =>
    import("@project/ui").then((mod) => mod.CldVideoTimeRemaining)
);
const CldVideoTogglePlay = dynamic(
    () => import("@project/ui").then((mod) => mod.CldVideoTogglePlay),
    { ssr: false }
);

type VideoControlsProps = {
    onClick?: (eventAction: (typeof PAGMSHEvents)[keyof typeof PAGMSHEvents]) => void;
    showScrubber?: boolean;
    showTimeRemaining?: boolean;
    showFullscreen?: boolean;
    showMute?: boolean;
    showPlay?: boolean;
    usePureButton?: boolean;
    onDownload?: () => void;
    showDownload?: boolean;
};

export const VideoControls = ({
    onClick,
    showScrubber = true,
    showTimeRemaining = true,
    showFullscreen = true,
    showMute = true,
    showPlay = true,
    usePureButton = false,
    onDownload,
    showDownload = false,
}: VideoControlsProps) => {
    const {
        state: { isPlaying },
    } = useCldVideoPlayer();

    const isFullscreenSupported = screenfull.isEnabled;

    return (
        <Flex
            onClick={useTogglePlay()}
            zIndex={1}
            flexDir={"column"}
            justifyContent={"space-between"}
            alignSelf={"flex-end"}
            position={"absolute"}
            bottom={0}
            w={"full"}
            h={"full"}
            transition="opacity 0.3s ease-in-out"
            opacity={1}
            transitionDelay="4s"
            sx={{
                ...(!isPlaying && {
                    opacity: 1,
                }),
                ...(isPlaying && {
                    opacity: 0,
                    transitionDelay: "4s",
                }),
                _hover: {
                    opacity: 1,
                    transitionDelay: "0s",
                },
                transform: "translateZ(0)",
                perspective: "1000",
                // iOS Safari fixes
                WebkitTransform: "translate3d(0,0,0)",
                WebkitOverflowScrolling: "touch",
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
            }}
        >
            {isFullscreenSupported && showFullscreen && (
                <Flex
                    display={"flex"}
                    justifyContent={"flex-end"}
                    p={4}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <CldVideoToggleFullscreen usePureButton={usePureButton} />
                </Flex>
            )}
            <Flex
                alignItems="center"
                flexDir={"row"}
                gap={usePureButton ? 2 : [3, 3, 4]}
                p={usePureButton ? 4 : [4, 4, 10]}
                pos="relative"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <Flex flex="1" alignItems="center" gap={usePureButton ? 2 : [3, 3, 4]}>
                    {showScrubber && <CldVideoScrubber />}
                    {showTimeRemaining && (
                        <CldVideoTimeRemaining position="static" color="allWhite" />
                    )}
                    {showMute && (
                        <CldVideoToggleMute
                            onClick={() => onClick?.(PAGMSHEvents.videoCldToggleMute_Click)}
                        />
                    )}
                    {showPlay && (
                        <Box>
                            <CldVideoTogglePlay
                                onClick={() => onClick?.(PAGMSHEvents.videoCldTogglePlay_Click)}
                            />
                        </Box>
                    )}
                </Flex>
                {showDownload && (
                    <Flex h="full" alignItems={"flex-end"}>
                        <ButtonPure
                            zIndex="1"
                            theme="dark"
                            hideLabel
                            icon="download"
                            title="download video"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDownload?.();
                            }}
                        />
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};
