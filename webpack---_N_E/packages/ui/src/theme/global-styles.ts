import type { Styles } from "@chakra-ui/theme-tools";
import { getFocusStyle } from "@porsche-design-system/components-react/styles";

export const globalStyles: Styles = {
    global: {
        body: {
            bgColor: "white",
        },
        ".rte :where(blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre)": {
            mb: "1rem",
        },
        ".rte :where(p)": {
            whiteSpace: "pre-line",
        },
        ".focus-visible": {
            ...getFocusStyle(),
        },
        // Don't show focus outlines on these circuit module marker elements.
        "circle.marker:focus, circle.marker:focus-visible, circle.touch:focus, circle.touch:focus-visible, circle#selected-indicator:focus, g[id^='spot']:focus, circle#beacon:focus, circle#beacon:focus-visible":
            {
                outline: "none",
            },
        // only show it on these ...
        "g[id^='spot']": {
            ...getFocusStyle(),
        },
        "circle.marker": {
            transition: "fill 0.3s ease-in-out",
        },
        "circle.marker.active": {
            fill: "allWhite",
        },
        "circle.touch": {
            backdropFilter: "blur(10px)",
        },
    },
};

export const gridGapMobile = 4;
export const gridGapDesktop = 8;
export const gridTemplateColumnsBase = "repeat(2, 1fr)";
export const gridTemplateColumnsLarge = "repeat(12, 1fr)";
export const gridTemplateColumns = {
    base: gridTemplateColumnsBase,
    l: gridTemplateColumnsLarge,
};
export const gridGap = {
    base: gridGapMobile,
    l: gridGapDesktop,
};
export const rteStartColWide = 3;
export const rteEndColWide = 11;
export const rteStartColDefault = 4;
export const rteEndColDefault = 10;
