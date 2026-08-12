/**
 * Attempt to resolve cubicBezier from the Motion barrel (already in the
 * optimizePackageImports list, so only the function is pulled in).
 * A tiny inline fallback avoids adding framer-motion to the scrollytelling
 * provider chunk when tree-shaking can't prove it unused.
 */
function cubicBezier(x1: number, y1: number, x2: number, y2: number): (t: number) => number {
    return (t: number): number => {
        const cx = 3 * x1;
        const bx = 3 * (x2 - x1) - cx;
        const ax = 1 - cx - bx;
        const cy = 3 * y1;
        const by = 3 * (y2 - y1) - cy;
        const ay = 1 - cy - by;

        const sampleCurveX = (tt: number) => ((ax * tt + bx) * tt + cx) * tt;
        const sampleCurveY = (tt: number) => ((ay * tt + by) * tt + cy) * tt;
        const sampleCurveDerivativeX = (tt: number) => (3 * ax * tt + 2 * bx) * tt + cx;

        let tt = t;
        for (let i = 0; i < 8; i++) {
            const currentX = sampleCurveX(tt) - t;
            if (Math.abs(currentX) < 1e-6) break;
            const dx = sampleCurveDerivativeX(tt);
            if (Math.abs(dx) < 1e-6) break;
            tt -= currentX / dx;
        }
        return sampleCurveY(tt);
    };
}

/**
 * Per-waypoint snap animation overrides.
 * Any property left undefined falls back to the global default.
 */
export type WaypointSnapOptions = {
    /** Duration of the snap animation in seconds */
    duration?: number;
    /** Linear interpolation intensity (0–1). Mutually exclusive with duration. */
    lerp?: number;
    /** Custom easing function `(t: number) => number` */
    easing?: (t: number) => number;
};

export type Waypoint = {
    /** A descriptive name for the waypoint (e.g. "start", "end", "middle") - useful for debugging */
    waypointName: string;
    /**
     * Position within the section expressed as a 0-1 fraction of the scrollable range.
     *   0   = top of the section aligned with top of viewport
     *   1   = bottom of the section aligned with bottom of viewport
     *   0.5 = halfway through the section's scrollable range
     *
     * Values slightly above 0 (e.g. 0.1) are used to "scrub" a scroll-linked
     * animation a small amount on entry. Values below 1 (e.g. 0.9) stop
     * before the very end to avoid spilling into the next section's overlap.
     */
    offset: number;
    /**
     * Snap animation options used when transitioning **to** this waypoint.
     * Overrides the global defaults (duration, lerp, easing) for this specific stop.
     */
    snap?: WaypointSnapOptions;
};

/**
 * Defines a page section and its ordered list of waypoints.
 *
 * Each section must have at least one waypoint.
 * Multiple waypoints create intermediate scroll stops within the section (shown as smaller dots in the side navigation).
 *
 * The `sectionId` must match the DOM element id used in page.tsx so the scroll controller can measure its position and height at runtime.
 */
export type SectionConfig = {
    /** The DOM id of the section (e.g. "section-1", "footer") */
    sectionId: string;
    /**
     * Ordered list of scroll stops within this section.
     * The first waypoint is shown as a large dot in the debug side navigation;
     * subsequent waypoints appear as smaller sub-dots.
     */
    waypoints: Waypoint[];
    /**
     * When true, this section allows free scrolling in "section" mode instead of
     * snapping between waypoints. Snap is suspended while inside this section's
     * scroll range and resumes when leaving.
     */
    freeScroll?: boolean;
};

export const SECTION_IDS = {
    garage: "garage",
    history: "history",
    cars: "cars",
    teams: "teams",
    news: "news",
    footer: "footer",
} as const;

export const SECTIONS_CONFIG: SectionConfig[] = [
    {
        sectionId: SECTION_IDS.garage,
        waypoints: [
            {
                waypointName: "video-start",
                offset: 0,
                snap: { duration: 1.5, easing: cubicBezier(0.25, 0.1, 0.6, 0.6) },
            },
            {
                waypointName: "video-end",
                offset: 0.9,
                snap: { duration: 1.5, easing: cubicBezier(0.25, 0.1, 0.6, 0.6) },
            },
        ],
    },
    {
        sectionId: SECTION_IDS.history,
        freeScroll: true,
        waypoints: [
            {
                waypointName: "start",
                offset: 0,
                snap: { duration: 1.5, easing: cubicBezier(0.4, 0, 0.2, 1) },
            },
            {
                waypointName: "end",
                offset: 0.92,
                snap: { duration: 1.2, easing: cubicBezier(0.4, 0, 0.2, 1) },
            },
        ],
    },
    {
        sectionId: SECTION_IDS.cars,
        waypoints: [
            {
                waypointName: "start",
                offset: 0.2,
                snap: { duration: 2, easing: cubicBezier(0.4, 0, 0.2, 1) },
            },
            {
                waypointName: "video-end",
                offset: 0.9,
                snap: { duration: 1.8, easing: cubicBezier(0.4, 0, 0.2, 1) },
            },
        ],
    },
    {
        sectionId: SECTION_IDS.teams,
        freeScroll: true,
        waypoints: [
            {
                waypointName: "start",
                offset: 0,
                snap: { duration: 1.5, easing: cubicBezier(0.4, 0, 0.2, 1) },
            },
            {
                waypointName: "end",
                offset: 0.85,
                snap: { duration: 1.2, easing: cubicBezier(0.4, 0, 0.2, 1) },
            },
        ],
    },
    {
        sectionId: SECTION_IDS.news,
        waypoints: [
            {
                waypointName: "start",
                offset: 0,
                snap: { duration: 1.5, easing: cubicBezier(0.4, 0, 0.2, 1) },
            },
            {
                waypointName: "carousel",
                offset: 1,
                snap: { duration: 1.2, easing: cubicBezier(0.4, 0, 0.2, 1) },
            },
        ],
    },
    {
        sectionId: SECTION_IDS.footer,
        waypoints: [
            {
                waypointName: "start",
                offset: 0,
                snap: { duration: 1.2, easing: cubicBezier(0.4, 0, 0.2, 1) },
            },
        ],
    },
];
