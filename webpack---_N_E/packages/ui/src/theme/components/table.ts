import type { ComponentStyleConfig } from "@chakra-ui/react";
import { theme as chakraDefaultTheme } from "@chakra-ui/react";

const tableTheme: ComponentStyleConfig = {
    baseStyle: {
        caption: {},
        table: {
            borderCollapse: "collapse",
            fontVariantNumeric: "lining-nums tabular-nums",
            width: "full",
        },
        td: {
            p: { base: "2.5", s: "6" },
            verticalAlign: "middle",
            whiteSpace: "nowrap",
            borderBottom: "thin",
            borderColor: "grey200",
        },
        th: {
            pt: "0.5",
            pb: "2.5",
            px: { base: "2.5", s: "6" },
            color: "grey300",
            fontSize: { base: "mobileCaption", s: "desktopCaption" },
            lineHeight: { base: "mobileCaption", s: "desktopCaption" },
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.0325rem",
            textAlign: "start",
            whiteSpace: "nowrap",
            verticalAlign: "bottom",
            borderBottom: "thin",
            borderColor: "grey200",
            "&[data-is-numeric=true]": { textAlign: "end" },
        },
    },
    variants: {},
    parts: [...chakraDefaultTheme.components.Table.parts],
    defaultProps: {
        ...chakraDefaultTheme.components.Table.defaultProps,
    },
};

export { tableTheme };
