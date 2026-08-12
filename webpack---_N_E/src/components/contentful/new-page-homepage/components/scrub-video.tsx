// eslint-disable-next-line no-restricted-imports
import type { HTMLChakraProps } from "@chakra-ui/react";
import { chakra, forwardRef } from "@project/ui";
import type { ComponentPropsWithRef, ReactNode } from "react";

type ScrubVideoProps = HTMLChakraProps<"video"> &
    ComponentPropsWithRef<"video"> & {
        children?: ReactNode;
        preload?: "auto" | "metadata" | "none";
    };

const ScrubVideo = forwardRef<ScrubVideoProps, "video">(
    ({ preload = "metadata", ...props }, ref) => {
        return (
            <chakra.video
                width="full"
                height="full"
                objectFit="cover"
                muted
                playsInline
                preload={preload}
                aria-hidden="true"
                ref={ref}
                {...props}
            />
        );
    }
);

ScrubVideo.displayName = "ScrubVideo";

export { ScrubVideo };
