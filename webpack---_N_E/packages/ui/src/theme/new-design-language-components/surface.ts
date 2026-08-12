import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const getNdlBackgroundColor = (colorScheme: string) => {
    switch (colorScheme) {
        case "black":
            return "ndlBlack";
        case "transparentBlack":
            return "ndlTransparencyBlack";
        case "grey":
            return "ndlTransparencyGrey";
        case "transparent":
            return "transparent";
        case "darkGrey":
        default:
            return "ndlTransparenceDarkGrey";
    }
};

const baseStyle = defineStyle((props) => {
    const { colorScheme } = props;

    return {
        background: getNdlBackgroundColor(colorScheme),
    };
});

const sizeSmall = defineStyle({
    py: 1,
    px: 2,
    borderRadius: "ndlRadiusSmall",
});

const sizeMedium = defineStyle({
    p: 2,
    borderRadius: "ndlRadiusMedium",
});

const sizeLarge = defineStyle({
    p: 4,
    borderRadius: "ndlRadiusLarge",
});

const sizeCard = defineStyle({
    p: 4,
    borderRadius: "ndlRadiusCard",
});

const sizeXLarge = defineStyle({
    p: 4,
    borderRadius: "ndlRadiusXLarge",
});

const sizeFull = defineStyle({
    width: 4,
    height: 4,
    borderRadius: "full",
});

const ndlSurfaceTheme = defineStyleConfig({
    baseStyle,
    sizes: {
        small: sizeSmall,
        medium: sizeMedium,
        large: sizeLarge,
        card: sizeCard,
        xlarge: sizeXLarge,
        full: sizeFull,
    },
    defaultProps: {
        size: "large",
        colorScheme: "",
    },
});

export { ndlSurfaceTheme };
