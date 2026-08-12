import { frostedGlassStyle } from "@porsche-design-system/components-react/styles";

const frostedGlassValue = frostedGlassStyle.backdropFilter.replace("blur(", "").replace("px)", "");

const blur = {
    frostedGlass: frostedGlassValue,
    frostedGlassBlur: `${frostedGlassValue}px`,
    ndlFrostedGlassHigh: "64px",
    ndlFrostedGlassLow: "24px",
    ndlDashboardBackgroundBlur: "144px",
    ndlTextBlurEntrance: "3px",
    ndlTextBlurEntranceMobile: "1.89px",
    ndlTextBlurRegular: "0.5px",
    ndlToolbarBlurMobile: "23px",
    ndlToolbarBlurDesktop: "6px",
};

export default blur;
