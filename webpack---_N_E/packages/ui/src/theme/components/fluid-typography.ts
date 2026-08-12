/**
 * Porsche Design System fluid typography theme.
 * @see https://designsystem.porsche.com/v3/styles/typography/#usage
 */
import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";
import {
    displayLargeStyle,
    displayMediumStyle,
    displaySmallStyle,
    headingXXLargeStyle,
    headingXLargeStyle,
    headingLargeStyle,
    headingMediumStyle,
    headingSmallStyle,
    textXLargeStyle,
    textLargeStyle,
    textMediumStyle,
    textSmallStyle,
    textXSmallStyle,
    textXXSmallStyle,
} from "@porsche-design-system/components-react/styles";

const fluidTypographyTheme = defineStyleConfig({
    sizes: {
        displayLarge: defineStyle(displayLargeStyle),
        displayMedium: defineStyle(displayMediumStyle),
        displaySmall: defineStyle(displaySmallStyle),
        headingXXLarge: defineStyle(headingXXLargeStyle),
        headingXLarge: defineStyle(headingXLargeStyle),
        headingLarge: defineStyle(headingLargeStyle),
        headingMedium: defineStyle(headingMediumStyle),
        headingSmall: defineStyle(headingSmallStyle),
        textXLarge: defineStyle(textXLargeStyle),
        textLarge: defineStyle(textLargeStyle),
        textMedium: defineStyle(textMediumStyle),
        textSmall: defineStyle(textSmallStyle),
        textXSmall: defineStyle(textXSmallStyle),
        textXXSmall: defineStyle(textXXSmallStyle),
    },
    defaultProps: {
        size: "textMedium",
    },
});

export { fluidTypographyTheme };
