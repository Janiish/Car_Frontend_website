import {
    breakpointBase,
    breakpointXS,
    breakpointS,
    breakpointM,
    breakpointL,
    breakpointXL,
    breakpointXXL,
} from "@porsche-design-system/components-react/styles";
import type { Breakpoints } from "@chakra-ui/theme-tools";

export type ProjectBreakpoints = {
    xs: string;
    s: string;
    md: string;
    l: string;
    xl: string;
    xxl: string;
    liveTimingTable840: string;
    liveTimingTable1140: string;
    ndlDashboardGrid: string;
};

type BreakpointsModified = Omit<Breakpoints<ProjectBreakpoints>, "base"> & { base: string };

const breakpoints: BreakpointsModified = {
    base: `${breakpointBase}px`,
    xs: `${breakpointXS}px`,
    s: `${breakpointS}px`,
    md: `${breakpointM}px`,
    l: `${breakpointL}px`,
    xl: `${breakpointXL}px`,
    xxl: `${breakpointXXL}px`,
    liveTimingTable840: "840px",
    liveTimingTable1140: "1140px",
    ndlDashboardGrid: "1728px",
};

export default breakpoints;
