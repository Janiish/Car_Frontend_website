import { mediaQueryMinWidth } from "@project/ui";

/**
 * Static bottom offset for mobile UI docked at the viewport bottom.
 * The main navigation no longer sits at the bottom of the screen (it is
 * opened via a fixed burger button at the top right), so this shared offset
 * is 0 — sections add their own local breathing space where needed. With
 * Lenis syncTouch keeping the browser toolbar permanently visible, that
 * viewport never moves mid-scroll, so no dvh compensation is needed either.
 */
export const MOBILE_DOCK_BOTTOM = "0px";

/**
 * Horizontal gutters matching WrapperContainer (`px` 5 → 1.25rem, `md` 10 →
 * 2.5rem) but clamped to the device safe-area insets, so landscape phones
 * with a notch keep content clear of the sensor housing (`viewport-fit=cover`
 * is set globally in _app, which otherwise lets content run edge to edge).
 */
export const safeAreaGutterSx = {
    paddingInlineStart: "max(1.25rem, env(safe-area-inset-left))",
    paddingInlineEnd: "max(1.25rem, env(safe-area-inset-right))",
    [mediaQueryMinWidth.md]: {
        paddingInlineStart: "max(2.5rem, env(safe-area-inset-left))",
        paddingInlineEnd: "max(2.5rem, env(safe-area-inset-right))",
    },
} as const;
