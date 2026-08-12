import { SECTIONS_CONFIG } from "../../configs/waypoints.config";
import {
    HOMEPAGE_VIDEOS,
    type VideoConfig,
    type VideoSourceSet,
} from "../../configs/video-sources.config";
import type { NewPageHomepagePageData } from "@/components/contentful/new-page-homepage/new-page-homepage-page-data";
import colors from "@project/ui/src/design-tokens/01.colors/colors";
import { easeNavEnter, easeNavExit, easeStandard } from "../../configs/motion-tokens";

// ---------------------------------------------------------------------------
// Car theming
// ---------------------------------------------------------------------------

type CarTheme = "963" | "99x-electric" | "718-cayman-gt4-rs-cs" | "911-cup" | "911-gt3-r";

const FALLBACK_CAR_THEME: CarTheme = "963";

export type CarThemeConfig = {
    highlightColor: string;
    highlightTextColor: string;
};

export const carThemes: Record<CarTheme, CarThemeConfig> = {
    "963": { highlightColor: colors.ndlMotorsportsRed, highlightTextColor: colors.allWhite },
    "99x-electric": { highlightColor: colors.ndlFormulaE, highlightTextColor: colors.allWhite },
    "718-cayman-gt4-rs-cs": {
        highlightColor: colors.ndlCaymanBlue,
        highlightTextColor: colors.allWhite,
    },
    "911-cup": { highlightColor: colors.ndlMotorsportsRed, highlightTextColor: colors.allWhite },
    "911-gt3-r": { highlightColor: "#5D687A", highlightTextColor: colors.allWhite },
};

const carThemeLookup = new Map<string, CarTheme>(
    (Object.keys(carThemes) as CarTheme[]).map((t) => [t.toLowerCase(), t])
);

export function resolveCarTheme(value: string | null | undefined): CarTheme {
    if (!value) return FALLBACK_CAR_THEME;
    return carThemeLookup.get(value.toLowerCase()) ?? FALLBACK_CAR_THEME;
}

// ---------------------------------------------------------------------------
// Tab / video config
// ---------------------------------------------------------------------------

/**
 * Video shown for each car theme. The order in which the cars appear (and thus
 * the tab order) is driven by Contentful, so videos are resolved per-car by
 * theme rather than from a fixed array.
 */
export const CAR_VIDEO_BY_THEME: Record<CarTheme, VideoConfig> = {
    "963": HOMEPAGE_VIDEOS.car963,
    "99x-electric": HOMEPAGE_VIDEOS.car99xElectric,
    "911-gt3-r": HOMEPAGE_VIDEOS.car911GT3R,
    "911-cup": HOMEPAGE_VIDEOS.car911Cup,
    "718-cayman-gt4-rs-cs": HOMEPAGE_VIDEOS.car911Cup,
};

export const CARS_SECTION_INDEX = SECTIONS_CONFIG.findIndex((s) => s.sectionId === "cars");

type CarWithTheme = { theme?: string | null };

/**
 * Maps the Contentful car collection (in its authored order) to the matching
 * scrub video for each car, resolved via the car's `theme`.
 * Null entries (unpublished in the current locale) are filtered out so the
 * resulting array stays aligned with the rendered tab indices.
 */
export function selectTabSources(
    cars: readonly (CarWithTheme | null | undefined)[],
    isDesktop: boolean
): VideoSourceSet[] {
    return cars
        .filter((car): car is CarWithTheme => car != null)
        .map((car) => {
            const video = CAR_VIDEO_BY_THEME[resolveCarTheme(car.theme)];
            return isDesktop ? video.desktop : video.mobile;
        });
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const VIDEO_ASPECT_RATIO = 16 / 9;
/** Scroll height multiplier (in vh units) that controls scrub distance. */
export const SCRUB_SCROLL_VH = 5;

// ---------------------------------------------------------------------------
// Animation helpers
// ---------------------------------------------------------------------------

export function getSlideUpProps(
    visible: boolean,
    reducedMotion: boolean,
    skipInitialWhenVisible = false
) {
    const y = reducedMotion ? 0 : 20;
    return {
        initial:
            skipInitialWhenVisible && visible ? (false as const) : ({ opacity: 0, y } as const),
        animate: { opacity: visible ? 1 : 0, y: visible || reducedMotion ? 0 : y },
        transition: {
            duration: reducedMotion ? 0 : 0.6,
            ease: easeStandard,
            delay: reducedMotion ? 0 : 0.1,
        },
    };
}

/**
 * Scroll-direction toggle for the mobile hotspots carousel: hidden while the
 * user scrolls up, revealed again on scroll down. Opacity-only so it doesn't
 * conflict with the dock-lift CSS transform that tracks the browser toolbar
 * (two stacking translateY animations in different systems produce jank).
 * Easing curves match the main nav's enter/exit family.
 */
export function getScrollHideProps(hidden: boolean, reducedMotion: boolean) {
    return {
        initial: false as const,
        animate: { opacity: hidden ? 0 : 1 },
        transition: hidden
            ? { duration: reducedMotion ? 0 : 0.25, ease: easeNavExit }
            : { duration: reducedMotion ? 0 : 0.35, ease: easeNavEnter },
        style: { pointerEvents: hidden ? ("none" as const) : ("auto" as const) },
    };
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type CarsSectionProps = Pick<
    NewPageHomepagePageData,
    | "carsSectionCarsCollection"
    | "carsSectionSeriesTitle"
    | "carsSectionLabelNoSeries"
    | "carsSectionNextEventTitle"
    | "carsSectionLatestNewsTitle"
    | "carsSectionLabelNoNewsEvents"
> & {
    /** True while the page loader overlay is active. When set, the initial car's ScrubPlayer loads immediately (bypassing the scroll-proximity gate) so its video is decoded before the loader reveals. */
    loaderActive?: boolean;
    /** Fired once the initial car's ScrubPlayer has fully decoded its FSV (loadMode="full") and painted a first frame. Drives the loader's reveal gate in homepage-loader.tsx. */
    onInitialCarReady?: () => void;
};
