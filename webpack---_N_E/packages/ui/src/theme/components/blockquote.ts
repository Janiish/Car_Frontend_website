import { defineStyle, createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers([
    "blockquote",
    "quote",
    "footer",
]);

const baseStyleBlockquote = defineStyle({});

const baseStyleQuote = defineStyle({
    fontSize: { base: "mobileTextXLarge", md: "desktopTextXLarge" },
    lineHeight: { base: "mobileTextXLarge", md: "desktopTextXLarge" },
    fontWeight: "400",
    hyphens: "none",
});

const baseStyleFooter = defineStyle({
    fontSize: { base: "mobileCaption", md: "desktopCaption" },
    lineHeight: { base: "mobileCaption", md: "desktopCaption" },
    color: "grey300",
    fontWeight: "600",
    mt: { base: 4, md: 6 },
});

const baseStyle = definePartsStyle({
    blockquote: baseStyleBlockquote,
    quote: baseStyleQuote,
    footer: baseStyleFooter,
});

const blockquoteTheme = defineMultiStyleConfig({ baseStyle });

export { blockquoteTheme };
