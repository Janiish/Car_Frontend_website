import {
    breakpointL,
    breakpointM,
    breakpointS,
    breakpointXL,
    breakpointXS,
    breakpointXXL,
} from "@porsche-design-system/components-react/styles";

export const mediaQueryMinWidth = {
    xs: `@media (min-width: ${breakpointXS}px)`,
    s: `@media (min-width: ${breakpointS}px)`,
    md: `@media (min-width: ${breakpointM}px)`,
    l: `@media (min-width: ${breakpointL}px)`,
    xl: `@media (min-width: ${breakpointXL}px)`,
    xxl: `@media (min-width: ${breakpointXXL}px)`,
} as const;

export const mediaQueryMaxWidth = {
    xs: `@media (max-width: ${breakpointXS - 1}px)`,
    s: `@media (max-width: ${breakpointS - 1}px)`,
    md: `@media (max-width: ${breakpointM - 1}px)`,
    l: `@media (max-width: ${breakpointL - 1}px)`,
    xl: `@media (max-width: ${breakpointXL - 1}px)`,
    xxl: `@media (max-width: ${breakpointXXL - 1}px)`,
} as const;

export const orientation = {
    portrait: "(orientation: portrait)",
    landscape: "(orientation: landscape)",
} as const;

/**
 * Raw media conditions (no `@media` prefix) so they can be used in BOTH
 * `<source media>` attributes and emotion `sx` keys (`@media ${condition}`).
 */
export const widthCondition = {
    minXs: `(min-width: ${breakpointXS}px)`,
    maxXs: `(max-width: ${breakpointXS - 1}px)`,
    minS: `(min-width: ${breakpointS}px)`,
    maxS: `(max-width: ${breakpointS - 1}px)`,
    minM: `(min-width: ${breakpointM}px)`,
    maxM: `(max-width: ${breakpointM - 1}px)`,
    minL: `(min-width: ${breakpointL}px)`,
    maxL: `(max-width: ${breakpointL - 1}px)`,
} as const;

export const mediaQueryMaxHeight = {
    short: "(max-height: 700px)",
} as const;
