import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const baseStyle = defineStyle({
    display: "inline-block",
    verticalAlign: "middle",
});

const sizeLarge = defineStyle({
    width: 6,
    height: 6,
});

const sizeSmall = defineStyle({
    width: 4,
    height: 4,
});

const ndlIconTheme = defineStyleConfig({
    baseStyle,
    sizes: { large: sizeLarge, small: sizeSmall },
    defaultProps: {
        size: "large",
    },
});

export { ndlIconTheme };
