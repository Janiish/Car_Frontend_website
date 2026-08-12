import { useEffect, useState } from "react";

/**
 * Returns `flag` delayed by `delayMs` on the rising edge (false -> true).
 * Falls back to `false` immediately on the falling edge (no delay on the way
 * down). Used to add a grace window before showing a loading indicator, so
 * fast/warm operations never flash it.
 */
function useDelayedFlag(flag: boolean, delayMs: number): boolean {
    const [delayed, setDelayed] = useState(false);

    useEffect(() => {
        if (!flag) {
            setDelayed(false);
            return;
        }
        const timer = setTimeout(() => setDelayed(true), delayMs);
        return () => clearTimeout(timer);
    }, [flag, delayMs]);

    return delayed;
}

export { useDelayedFlag };
