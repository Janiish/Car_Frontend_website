import { type ComponentProps } from "react";
import { CldVideoTogglePlay, mediaQueryMinWidth } from "@project/ui";

const playPauseButtonOffsetBase = "var(--space-5)";
const playPauseButtonOffsetDesktop = "var(--space-10)";

export const TemporaryPlayPauseButton = ({
    sx,
    ...props
}: ComponentProps<typeof CldVideoTogglePlay>) => {
    return (
        <>
            <CldVideoTogglePlay
                mobile
                sx={{
                    display: "flex",
                    position: "absolute",
                    right: [playPauseButtonOffsetBase, playPauseButtonOffsetDesktop],
                    bottom: [playPauseButtonOffsetBase, playPauseButtonOffsetDesktop],
                    zIndex: 2,
                    [mediaQueryMinWidth.md]: {
                        display: "none",
                    },
                    ...sx,
                }}
                {...props}
            />
            <CldVideoTogglePlay
                sx={{
                    display: "none",
                    position: "absolute",
                    right: [playPauseButtonOffsetBase, playPauseButtonOffsetDesktop],
                    bottom: [playPauseButtonOffsetBase, playPauseButtonOffsetDesktop],
                    zIndex: 2,
                    [mediaQueryMinWidth.md]: {
                        display: "flex",
                    },
                    ...sx,
                }}
                {...props}
            />
        </>
    );
};
