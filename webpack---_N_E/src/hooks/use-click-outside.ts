import type { RefObject } from "react";
import { useEffect } from "react";

/**
 * Hook to detect clicks outside a given set of refs.
 * @param refs - Array of refs to check against
 * @param callback - Function to call when click is outside all refs
 */
export const useClickOutside = (refs: RefObject<HTMLElement>[], callback: () => void) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (refs.every((ref) => ref.current && !ref.current.contains(event.target as Node))) {
                callback();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // no need to re-register event listeners when breakpoint changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refs, callback]);
};
