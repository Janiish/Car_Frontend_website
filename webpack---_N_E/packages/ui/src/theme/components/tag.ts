import type { ComponentStyleConfig } from "@chakra-ui/react";

const tagTheme: ComponentStyleConfig = {
    parts: [],
    baseStyle: {
        container: {
            backgroundColor: "grey100",
            padding: "0.1875rem 0.5625rem",
            borderRadius: "0.25rem",
            transition: "all 0.25s ease",
            //cursor: "pointer",
            //_hover: { backgroundColor: "grey200" },
        },
        label: {
            color: "porscheBlack",
            fontSize: { base: "mobileTextXXSmall", md: "desktopTextXXSmall" },
            lineHeight: { base: "mobileTextXXSmall", md: "desktopTextXXSmall" },
            fontWeight: "400",
        },
    },
    defaultProps: {},
};

export { tagTheme };
