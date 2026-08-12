import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const sizeRegular = defineStyle({
    fontSize: {
        base: "ndlMobileBody",
        md: "ndlDesktopBody",
    },
    lineHeight: "ndlBody",
});

const sizeCaption = defineStyle({
    fontSize: {
        base: "ndlMobileCaption",
        md: "ndlDesktopCaption",
    },
    lineHeight: "ndlCaption",
    letterSpacing: "ndlCaption",
    textTransform: "uppercase",
});

const ndlTextTheme = defineStyleConfig({
    sizes: { regular: sizeRegular, caption: sizeCaption },
    defaultProps: {
        size: "regular",
    },
});

export { ndlTextTheme };
