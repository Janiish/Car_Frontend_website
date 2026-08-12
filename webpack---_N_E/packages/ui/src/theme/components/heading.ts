import type { ComponentStyleConfig } from "@chakra-ui/react";

const headingTheme: ComponentStyleConfig = {
    baseStyle: {},
    sizes: {
        displayLarge: {
            fontSize: { base: "mobileDisplayLarge", md: "desktopDisplayLarge" },
            lineHeight: { base: "mobileDisplayLarge", md: "desktopDisplayLarge" },
            fontWeight: "400",
        },
        displayMedium: {
            fontSize: { base: "mobileDisplayMedium", md: "desktopDisplayMedium" },
            lineHeight: { base: "mobileDisplayMedium", md: "desktopDisplayMedium" },
            fontWeight: "400",
        },
        displaySmall: {
            fontSize: { base: "mobileDisplaySmall", md: "desktopDisplaySmall" },
            lineHeight: { base: "mobileDisplaySmall", md: "desktopDisplaySmall" },
            fontWeight: "400",
        },
        headingXXLarge: {
            fontSize: { base: "mobileHeadingXXLarge", md: "desktopHeadingXXLarge" },
            lineHeight: { base: "mobileHeadingXXLarge", md: "desktopHeadingXXLarge" },
        },
        headingXLarge: {
            fontSize: { base: "mobileHeadingXLarge", md: "desktopHeadingXLarge" },
            lineHeight: { base: "mobileHeadingXLarge", md: "desktopHeadingXLarge" },
        },
        headingLarge: {
            fontSize: { base: "mobileHeadingLarge", md: "desktopHeadingLarge" },
            lineHeight: { base: "mobileHeadingLarge", md: "desktopHeadingLarge" },
        },
        headingMedium: {
            fontSize: { base: "mobileHeadingMedium", md: "desktopHeadingMedium" },
            lineHeight: { base: "mobileHeadingMedium", md: "desktopHeadingMedium" },
        },
        headingSmall: {
            fontSize: { base: "mobileHeadingSmall", md: "desktopHeadingSmall" },
            lineHeight: { base: "mobileHeadingSmall", md: "desktopHeadingSmall" },
            fontWeight: "600",
        },
        navigationHeading: {
            fontSize: { base: "mobileNavigationHeading", md: "desktopNavigationHeading" },
            lineHeight: { base: "mobileNavigationHeading", md: "desktopNavigationHeading" },
            fontWeight: "400",
        },
    },
    defaultProps: {
        size: "large",
    },
};

export { headingTheme };
