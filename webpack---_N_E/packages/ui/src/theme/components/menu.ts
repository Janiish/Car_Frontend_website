import { createMultiStyleConfigHelpers, theme } from "@chakra-ui/react";
import { menuAnatomy as parts } from "@chakra-ui/anatomy";
import { defineStyle } from "@chakra-ui/styled-system";
const defaultBaseStyleFromChakraTheme = theme.components.Menu.baseStyle!;
import { frostedGlassStyle } from "@porsche-design-system/components-react/styles";

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys);

const baseStyleList = defineStyle({
    ...defaultBaseStyleFromChakraTheme.list,
    minWidth: "auto",
    bg: "porscheBlackShaded",
    borderRadius: "medium",
    backdropFilter: frostedGlassStyle.backdropFilter,
    px: { base: 2, l: 3 },
    py: 2.5,
});

const baseStyleItem = defineStyle({
    ...defaultBaseStyleFromChakraTheme.item,
    backgroundColor: "transparent",
});

const baseStyleGroupTitle = defineStyle({
    ...defaultBaseStyleFromChakraTheme.groupTitle,
});

const baseStyleIcon = defineStyle({
    ...defaultBaseStyleFromChakraTheme.icon,
});

const baseStyleCommand = defineStyle({
    ...defaultBaseStyleFromChakraTheme.command,
});

const baseStyleDivider = defineStyle({
    ...defaultBaseStyleFromChakraTheme.divider,
});

const baseStyleButton = defineStyle({
    ...defaultBaseStyleFromChakraTheme.button,
    bg: "porscheBlackShaded",
    borderRadius: "medium",
    backdropFilter: frostedGlassStyle.backdropFilter,
    px: { base: 2, l: 3 },
    py: 2.5,
});

const baseStyle = definePartsStyle({
    list: baseStyleList,
    item: baseStyleItem,
    groupTitle: baseStyleGroupTitle,
    icon: baseStyleIcon,
    command: baseStyleCommand,
    divider: baseStyleDivider,
    button: baseStyleButton,
});

const menuTheme = defineMultiStyleConfig({
    baseStyle,
});

export { menuTheme };
