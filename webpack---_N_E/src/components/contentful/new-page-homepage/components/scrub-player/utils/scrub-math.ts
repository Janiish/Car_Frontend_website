/**
 * Shared math utilities for the scrub-player backends and worker.
 * Pure functions — no DOM, no React, safe to import from a Web Worker.
 */

/** Quantize a time in seconds to the nearest frame index, clamped to [0, frameCount-1]. */
export function quantizeFrame(seconds: number, fps: number, frameCount: number): number {
    const index = Math.round(Math.max(0, seconds) * fps);
    return frameCount > 0 ? Math.min(index, frameCount - 1) : index;
}

/**
 * Derive FPS from the fsv container's microsecond duration and frame count.
 * Falls back to 30 when the values are unavailable or zero.
 */
export function deriveFps(durationUs: number, frameCount: number): number {
    return durationUs > 0 && frameCount > 0 ? frameCount / (durationUs / 1e6) : 30;
}

/** Clamp a number to the [0, 1] range. */
export function clamp01(v: number): number {
    if (v < 0) return 0;
    if (v > 1) return 1;
    return v;
}
