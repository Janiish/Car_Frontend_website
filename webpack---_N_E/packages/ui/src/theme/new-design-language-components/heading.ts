import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const baseStyle = defineStyle({
    fontWeight: "400",
    fontFeatureSettings: "'salt' on",
});

const sizeDisplay = defineStyle({
    fontSize: {
        base: "ndlMobileDisplay",
        md: "ndlDesktopDisplay",
    },
    lineHeight: "ndlDisplay",
    letterSpacing: "ndlDisplay",
});

const sizeHeaderXXL = defineStyle({
    fontSize: {
        base: "ndlMobileHeaderXXL",
        md: "ndlDesktopHeaderXXL",
    },
    lineHeight: "ndlHeaderXXL",
    letterSpacing: "ndlHeaderXXL",
});
const sizeHeaderXL = defineStyle({
    fontSize: {
        base: "ndlMobileHeaderXl",
        md: "ndlDesktopHeaderXl",
    },
    lineHeight: "ndlHeaderXl",
});
const sizeHeaderL = defineStyle({
    fontSize: {
        base: "ndlMobileHeaderL",
        md: "ndlDesktopHeaderL",
    },
    lineHeight: "ndlHeaderL",
});
const sizeHeaderM = defineStyle({
    fontSize: {
        base: "ndlMobileHeaderM",
        md: "ndlDesktopHeaderM",
    },
    lineHeight: "ndlHeaderM",
});
const sizeHeaderS = defineStyle({
    fontSize: {
        base: "ndlMobileHeaderS",
        md: "ndlDesktopHeaderS",
    },
    lineHeight: "ndlHeaderS",
});

const ndlHeadingTheme = defineStyleConfig({
    baseStyle,
    sizes: {
        display: sizeDisplay,
        headerXXL: sizeHeaderXXL,
        headerXL: sizeHeaderXL,
        headerL: sizeHeaderL,
        headerM: sizeHeaderM,
        headerS: sizeHeaderS,
    },
    defaultProps: {
        size: "headerXL",
    },
});

export { ndlHeadingTheme };
