import { createMultiStyleConfigHelpers, theme } from "@chakra-ui/react";
import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { defineStyle } from "@chakra-ui/styled-system";
const defaultBaseStyleFromChakraTheme = theme.components.Modal.baseStyle!;

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys);

const baseStyleOverlay = defineStyle((props) => ({
    ...defaultBaseStyleFromChakraTheme(props).overlay,
    bg: "rgba(1, 2, 5, 0.67)",
}));

const baseStyleDialogContainer = defineStyle(
    (props) => defaultBaseStyleFromChakraTheme(props).dialogContainer
);

const baseStyleDialog = defineStyle((props) => ({
    ...defaultBaseStyleFromChakraTheme(props).dialog,
    bg: "porscheBlack",
    color: "allWhite",
    borderRadius: "large",
    overflow: "hidden",
    my: 4,
}));

const baseStyleHeader = defineStyle((props) => ({
    ...defaultBaseStyleFromChakraTheme(props).header,
    p: 6,
}));

const baseStyleCloseButton = defineStyle({
    top: "var(--space-6)",
    right: "var(--space-6)",
    position: "absolute",
});

const baseStyleBody = defineStyle((props) => ({
    ...defaultBaseStyleFromChakraTheme(props).body,
    p: 0,
}));

const baseStyleFooter = defineStyle((props) => defaultBaseStyleFromChakraTheme(props).footer);

const baseStyle = definePartsStyle((props) => ({
    overlay: baseStyleOverlay(props),
    dialogContainer: baseStyleDialogContainer(props),
    dialog: baseStyleDialog(props),
    header: baseStyleHeader(props),
    closeButton: baseStyleCloseButton,
    body: baseStyleBody(props),
    footer: baseStyleFooter(props),
}));

const sizes = {
    full: definePartsStyle({
        dialog: {
            width: { base: "100vw", md: "80vw", l: "60vw" },
        },
        dialogContainer: {
            px: { base: 5, md: 20 },
        },
    }),
    cldAsset: definePartsStyle({
        dialog: {},
        dialogContainer: {},
    }),
};

const modalTheme = defineMultiStyleConfig({
    baseStyle,
    sizes,
    defaultProps: {
        size: "full",
    },
});

export { modalTheme };
