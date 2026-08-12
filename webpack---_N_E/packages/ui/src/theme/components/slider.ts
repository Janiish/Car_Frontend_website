import { defineStyle, createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { sliderAnatomy } from "@chakra-ui/anatomy";

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(
    sliderAnatomy.keys
);

const baseStyleContainer = defineStyle({
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    width: "100%",
    _disabled: {
        opacity: 0.6,
        pointerEvents: "none",
        cursor: "default",
    },
});

const baseStyleTrack = defineStyle({
    h: "2px",
    overflow: "hidden",
    borderRadius: "small",
    bg: "grey100",
});

const baseStyleFilledTrack = defineStyle({
    width: "inherit",
    height: "inherit",
    bg: "motorsportsRed",
});

const baseStyleThumb = defineStyle({
    top: "50%",
    transform: "translateY(-50%)",
    _active: {
        transform: "translateY(-50%) scale(1.15)",
    },
    w: 3,
    h: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    outline: 0,
    zIndex: 1,
    borderRadius: "full",
    bg: "motorsportsRed",
    transitionProperty: "transform",
    transitionDuration: "base",
});

const baseStyle = definePartsStyle({
    container: baseStyleContainer,
    track: baseStyleTrack,
    filledTrack: baseStyleFilledTrack,
    thumb: baseStyleThumb,
});

const sliderTheme = defineMultiStyleConfig({
    baseStyle,
});

export { sliderTheme };
