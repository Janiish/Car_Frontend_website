import type { MotionProps } from "framer-motion";
import { frostedGlassStyle } from "@porsche-design-system/components-react/styles";
import type { BoxProps } from "@project/ui";
import { MotionBox } from "@project/ui";

type BackdropProps = Omit<BoxProps, "transition"> & MotionProps;

const Backdrop = (props: BackdropProps) => (
    <MotionBox
        role="presentation"
        aria-hidden="true"
        className="backdrop"
        position="fixed"
        zIndex="modal"
        backgroundColor="rgba(0,0,0,0.4)"
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        backdropFilter={frostedGlassStyle.backdropFilter}
        sx={{
            willChange: "opacity, backdrop-filter",
            backfaceVisibility: "hidden",
            isolation: "isolate",
        }}
        {...props}
    />
);

export { Backdrop };
