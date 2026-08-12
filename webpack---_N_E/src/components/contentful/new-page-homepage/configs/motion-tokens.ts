/**
 * Shared motion vocabulary for the homepage.
 * Pick by role, not by taste:
 *  - entrances / exits            → easeOutStrong (starts fast; the user is watching)
 *  - on-screen morphs / movement  → easeStandard (in-out)
 *  - small opacity fades           → easeDecelerate
 *  - crossfades                    → easeInOutSoft
 *  - main-nav-family show/hide     → easeNavEnter / easeNavExit
 */
// Typed as mutable 4-tuples (not `as const`): Framer Motion's `Easing`/`BezierDefinition`
// type is `[number, number, number, number]` (mutable), which a readonly `as const`
// tuple is not assignable to. Cast here, at the single source of truth, not at call sites.
const easeStandard: [number, number, number, number] = [0.8, 0, 0.2, 1];
const easeOutStrong: [number, number, number, number] = [0.16, 1, 0.3, 1];
const easeDecelerate: [number, number, number, number] = [0, 0, 0.2, 1];
const easeInOutSoft: [number, number, number, number] = [0.65, 0, 0.35, 1];
const easeNavEnter: [number, number, number, number] = [0, 0.41, 0.14, 1];
const easeNavExit: [number, number, number, number] = [0.62, 0, 0.14, 1];

/** For CSS transition strings: cssBezier(easeOutStrong) → "cubic-bezier(0.16, 1, 0.3, 1)" */
const cssBezier = (curve: readonly number[]) => `cubic-bezier(${curve.join(", ")})`;

export {
    easeStandard,
    easeOutStrong,
    easeDecelerate,
    easeInOutSoft,
    easeNavEnter,
    easeNavExit,
    cssBezier,
};
