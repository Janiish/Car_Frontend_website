import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/styled-system";
import {
    getFocusStyle,
    motionDurationModerate,
    motionEasingBase,
} from "@porsche-design-system/components-react/styles";
import blur from "../../design-tokens/13.blur/blur";
import sizes from "../../design-tokens/04.sizes/sizes";

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers([
    "viewport",
    "buttonGroup",
    "indicator",
    "button",
]);

// ---------------------------------------------------------------------------
// Viewport — outer scrollable container that clips the pill at screen edges
// ---------------------------------------------------------------------------

const baseStyleViewport = defineStyle({
    overflow: "auto hidden",
    width: "100%",
    textAlign: "center",
    paddingX: { base: 5, l: 0 },
    "&::-webkit-scrollbar": { display: "none" },
    scrollbarWidth: "none",
});

// ---------------------------------------------------------------------------
// ButtonGroup — the frosted-glass pill that wraps every button
// ---------------------------------------------------------------------------

const baseStyleButtonGroup = defineStyle({
    display: "inline-flex",
    alignItems: "center",
    gap: 2,
    height: sizes.navQuickLinksHeight,
    padding: 1,
    borderRadius: "ndlRadiusSmall",
    backgroundColor: "ndlBlack",
    backdropFilter: {
        base: `blur(${blur.ndlToolbarBlurMobile})`,
        l: `blur(${blur.ndlToolbarBlurDesktop})`,
    },
    position: "relative",
    "@media (prefers-reduced-motion: reduce)": {
        "&, & *": {
            transitionDuration: "0.01ms !important",
            animationDuration: "0.01ms !important",
        },
    },
});

// ---------------------------------------------------------------------------
// Indicator — sliding highlight behind the active button
// ---------------------------------------------------------------------------

/**
 * Ideally only `transform` and `opacity` would be transitioned (compositor-friendly).
 * However `width` is required here because a `scaleX`-based approach distorts the
 * pill's `border-radius: full` — the rounded ends visually stretch during the
 * animation. Since the indicator is absolutely-positioned and paint-isolated the
 * layout cost of animating `width` is negligible.
 */
const indicatorTransition = `transform ${motionDurationModerate} ${motionEasingBase}, width ${motionDurationModerate} ${motionEasingBase}, background-color ${motionDurationModerate} ${motionEasingBase}`;

// Outer pill is ndlRadiusSmall (8px) with padding 1 (4px) → inner = small (4px)
const baseStyleIndicator = defineStyle({
    position: "absolute",
    top: 1,
    bottom: 1,
    left: "0",
    borderRadius: "small",
    transition: indicatorTransition,
    pointerEvents: "none",
    willChange: "transform, width",
});

// ---------------------------------------------------------------------------
// Button — individual toolbar button
// ---------------------------------------------------------------------------

const buttonTransition = `background-color ${motionDurationModerate} ${motionEasingBase}, color ${motionDurationModerate} ${motionEasingBase}`;

const baseStyleButton = defineStyle({
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    paddingX: 4,
    borderRadius: "small",
    backgroundColor: "transparent",
    color: "allWhite",
    fontSize: "desktopHeadingSmall",
    fontWeight: "normal",
    lineHeight: "ndlHeaderS",
    whiteSpace: "nowrap",
    border: "none",
    cursor: "pointer",
    flexShrink: 0,
    transition: buttonTransition,
    touchAction: "manipulation",
    WebkitTapHighlightColor: "transparent",
    _focus: { outline: "none" },
    _focusVisible: { ...getFocusStyle(), borderRadius: "small" },
    '&:not([aria-pressed="true"]):hover': {
        backgroundColor: "ndlLanguageSelectorHoverBg",
    },
});

// ---------------------------------------------------------------------------
// Combined theme
// ---------------------------------------------------------------------------

const baseStyle = definePartsStyle({
    viewport: baseStyleViewport,
    buttonGroup: baseStyleButtonGroup,
    indicator: baseStyleIndicator,
    button: baseStyleButton,
});

const ndlToolbarTheme = defineMultiStyleConfig({ baseStyle });

export { ndlToolbarTheme };
