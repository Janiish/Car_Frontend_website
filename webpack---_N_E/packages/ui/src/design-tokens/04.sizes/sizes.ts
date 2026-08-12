import {
    breakpointBase,
    breakpointXS,
    breakpointS,
    breakpointM,
    breakpointL,
    breakpointXL,
    breakpointXXL,
} from "@porsche-design-system/components-react/styles";
import space from "../03.space/space";

const navQuickLinksHeight = "44px";
// Desktop distance the quick-links bar is translated down from the top of the
// viewport (see `distanceToTopDesktop` in main-navigation).
const navQuickLinksOffsetTop = "24px";

const sizes = {
    ...space,
    wrapperContainer: "1920px",
    halfWrapperContainer: "960px",
    navQuickLinksHeight,
    navQuickLinksOffsetTop,
    // Bottom edge of the desktop navigation as it overlaps content beneath it
    // (quick-links height + its top offset). Use to clear elements that sit
    // behind the transparent nav.
    navHeightCombined: `calc(${navQuickLinksHeight} + ${navQuickLinksOffsetTop})`,
    /** Bottom edge of the mobile Porsche logo: space-4 (16px) top offset + 28px logo height. */
    navLogoBottom: "44px",
    liveTickerHeight: "40px",
    screenHeightWithLiveTicker: "calc(100svh - 40px)",
    breakpoints: {
        base: `${breakpointBase}px`,
        xs: `${breakpointXS}px`,
        s: `${breakpointS}px`,
        m: `${breakpointM}px`,
        l: `${breakpointL}px`,
        xl: `${breakpointXL}px`,
        xxl: `${breakpointXXL}px`,
    },
    icon: {},
    // * Language Selector
    languageSelectorMaxWidth: "456px",
    languageSelectorMaxHeight: "558px",
    languageSelectorTotalVerticalSpacing: "84px",
    ndlToolbarButtonHeight: "47px",
    ndlToolbarButtonHeightMobile: "54px",
    ndlToolbarButtonMinWidthMobile: "132px",
};

export default sizes;
