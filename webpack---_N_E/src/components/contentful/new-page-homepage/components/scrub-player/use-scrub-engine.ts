import { useCallback, useSyncExternalStore } from "react";
import { detectScrubEngine, type ScrubEngine } from "./scrub-engine";

let resolvedEngine: ScrubEngine | null = null;
const listeners = new Set<() => void>();

if (typeof window !== "undefined") {
    detectScrubEngine().then((e) => {
        resolvedEngine = e;
        for (const fn of listeners) fn();
    });
}

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

/**
 * Returns the detected ScrubEngine, or null on SSR and the first client render
 * (prevents hydration mismatches).
 *
 * Uses useSyncExternalStore to avoid the extra render from useState+useEffect.
 */
export function useScrubEngine(): ScrubEngine | null {
    const getSnapshot = useCallback(() => resolvedEngine, []);
    const getServerSnapshot = useCallback(() => null, []);
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
