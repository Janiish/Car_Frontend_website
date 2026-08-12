import { useInsertionEffect, useRef, type MutableRefObject } from "react";

/**
 * Returns a ref whose `.current` always reflects the latest value passed in.
 * Useful for keeping callback props available inside memoised closures or
 * effects without re-triggering dependency arrays.
 *
 * Uses useInsertionEffect to safely update the ref outside the render phase
 * (concurrent-mode safe).
 */
export function useLatestRef<T>(value: T): MutableRefObject<T> {
    const ref = useRef(value);
    useInsertionEffect(() => {
        ref.current = value;
    });
    return ref;
}
