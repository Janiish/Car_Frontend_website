import { useCallback, useEffect, useInsertionEffect, useRef } from "react";

type LoopRange = { from: number; to: number };

/**
 * Shared rAF-based loop used by both fsv backends. Computes the current time
 * offset within the loop range and calls `onTarget(seconds)` each frame so the
 * backend can seek its renderer (main-thread) or post to the worker.
 *
 * Returns stable `start`/`stop` functions that never change identity.
 */
export function useScrubLoop(onTarget: (seconds: number) => void, isReady: () => boolean) {
    const rangeRef = useRef<LoopRange | null>(null);
    const runningRef = useRef(false);
    const rafRef = useRef(0);
    const anchorRef = useRef(0);
    const onTargetRef = useRef(onTarget);
    const isReadyRef = useRef(isReady);
    useInsertionEffect(() => {
        onTargetRef.current = onTarget;
        isReadyRef.current = isReady;
    });
    const tickRef = useRef<((now: number) => void) | null>(null);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden || !runningRef.current || rafRef.current !== 0 || !tickRef.current)
                return;
            anchorRef.current = performance.now();
            rafRef.current = requestAnimationFrame(tickRef.current);
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    const stop = useCallback(() => {
        runningRef.current = false;
        rangeRef.current = null;
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = 0;
        }
    }, []);

    const start = useCallback(
        (range: LoopRange) => {
            const existing = rangeRef.current;
            if (
                runningRef.current &&
                existing &&
                existing.from === range.from &&
                existing.to === range.to
            ) {
                return;
            }
            rangeRef.current = range;
            runningRef.current = true;
            anchorRef.current = performance.now();

            const tick = (now: number) => {
                if (!runningRef.current) return;
                const r = rangeRef.current;
                if (!r) return;
                if (!isReadyRef.current()) {
                    anchorRef.current = now;
                    rafRef.current = requestAnimationFrame(tick);
                    return;
                }
                if (document.hidden) {
                    // Pause rAF entirely when tab is hidden; visibilitychange restarts it.
                    anchorRef.current = now;
                    rafRef.current = 0;
                    return;
                }
                const span = r.to - r.from;
                const elapsed = (now - anchorRef.current) / 1000;
                const t = span > 0 ? r.from + (elapsed % span) : r.from;
                onTargetRef.current(t);
                rafRef.current = requestAnimationFrame(tick);
            };
            tickRef.current = tick;
            rafRef.current = requestAnimationFrame(tick);
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    return { start, stop };
}
