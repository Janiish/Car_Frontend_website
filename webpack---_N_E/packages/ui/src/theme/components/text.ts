import type { ComponentStyleConfig } from "@chakra-ui/react";

const textTheme: ComponentStyleConfig = {
    baseStyle: {},
    sizes: {
        "xx-small": {
            fontSize: { base: "mobileTextXXSmall", md: "desktopTextXXSmall" },
            lineHeight: { base: "mobileTextXXSmall", md: "desktopTextXXSmall" },
            fontWeight: "400",
        },
        "x-small": {
            fontSize: { base: "mobileTextXSmall", md: "desktopTextXSmall" },
            lineHeight: { base: "mobileTextXSmall", md: "desktopTextXSmall" },
            fontWeight: "400",
        },
        small: {
            fontSize: { base: "mobileTextSmall", md: "desktopTextSmall" },
            lineHeight: { base: "mobileTextSmall", md: "desktopTextSmall" },
            fontWeight: "400",
        },
        medium: {
            fontSize: { base: "mobileTextMedium", md: "desktopTextMedium" },
            lineHeight: { base: "mobileTextMedium", md: "desktopTextMedium" },
            fontWeight: "400",
        },
        large: {
            fontSize: { base: "mobileTextLarge", md: "desktopTextLarge" },
            lineHeight: { base: "mobileTextLarge", md: "desktopTextLarge" },
            fontWeight: "400",
        },
        "x-large": {
            fontSize: { base: "mobileTextXLarge", md: "desktopTextXLarge" },
            lineHeight: { base: "mobileTextXLarge", md: "desktopTextXLarge" },
            fontWeight: "400",
        },
        caption: {
            fontSize: { base: "mobileCaption", md: "desktopCaption" },
            lineHeight: { base: "mobileCaption", md: "desktopCaption" },
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.0325rem",
        },
    },
    defaultProps: {
        size: "small",
    },
};

export { textTheme };
