/**
 * Shared timing tokens for the homepage loader family (page-intro loader,
 * 014, and the cars-switch loader, 015). Documented like `motion-tokens.ts` —
 * pick by role, don't hand-type durations at call sites.
 */

/** Feature 1 — page loader intro (`homepage-loader.tsx`, plan 014) */
/** Square px size of the page-intro lottie (pure vectors, so it stays crisp at any size). */
export const LOADER_LOTTIE_SIZE = 200;
/** Playback rate for the page-intro lottie — 1 = authored speed, <1 = slower. */
export const LOADER_LOTTIE_SPEED = 0.8;
/** Floor on how long the loader stays visible even on a warm cache — enough for at least one full cycle of the lottie animation's authored loop (~1.2s at its native 60fps timeline, ~1.5s at 0.8× speed) plus a little headroom. */
export const LOADER_MIN_VISIBLE_MS = 2400;
/** Safety cap: reveal regardless of asset readiness. User-chosen 12–15s band. */
export const LOADER_MAX_WAIT_MS = 14000;
/** Duration of the upward clip-path wipe reveal. */
export const LOADER_EXIT_MS = 800;
/** Lottie fade/scale-out duration; starts slightly before the wipe so the two overlap instead of sequencing. */
export const LOADER_LOTTIE_PRE_EXIT_MS = 250;

/** Feature 2 — cars switch loader (`cars-section.tsx`, plan 015) */
/** Square px size of the cars-switch lottie — smaller than the page-intro loader. */
export const CAR_LOADER_LOTTIE_SIZE = 120;
/** Playback rate for the cars-switch lottie — kept in step with the page-intro loader. */
export const CAR_LOADER_LOTTIE_SPEED = 0.8;
/** Grace delay before showing the switch loader — fast/warm switches (<250ms) never flash it. */
export const CAR_LOADER_GRACE_MS = 250;
/** Enter animation duration. */
export const CAR_LOADER_ENTER_MS = 200;
/** Exit animation duration — completes before the 700ms crossfade midpoint (`CAR_CROSSFADE_MS` in `use-car-tab-switch.ts`), so it reads in-sync rather than lagging the crossfade. */
export const CAR_LOADER_EXIT_MS = 300;
