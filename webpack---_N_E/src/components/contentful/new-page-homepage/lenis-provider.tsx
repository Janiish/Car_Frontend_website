import type { RefObject } from "react";
import { useRef, useMemo, useEffect, createContext, useContext } from "react";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { useHomepageMotionPref } from "./homepage-responsive-context";

type LenisContextType = {
    lenisRef: RefObject<LenisRef | null>;
};

const LenisContext = createContext<LenisContextType | null>(null);

const useLenisContext = () => {
    const context = useContext(LenisContext);

    if (!context) {
        throw new Error("useLenisContext must be used within LenisProvider");
    }

    return context;
};

interface LenisProviderProps {
    children: React.ReactNode;
}

/**
 * Blocks Lenis (and its Snap plugin) from processing events that originate
 * inside a [data-lenis-prevent] or [data-lenis-prevent-touch] container.
 *
 * [data-lenis-prevent-horizontal] only blocks when the gesture is primarily
 * horizontal — lets vertical page scroll through while preventing the slight
 * vertical drift that occurs during horizontal carousel swipes.
 *
 * Lenis has a built-in check for these attributes, but it runs *after* the
 * `virtual-scroll` event is emitted — so Snap still receives and acts on it.
 * This callback runs *before* that emission, cutting it off entirely.
 */
const filterPreventedScrollEvents = ({
    deltaX,
    deltaY,
    event,
}: {
    deltaX: number;
    deltaY: number;
    event: Event;
}) => {
    const isTouch = event.type.includes("touch");
    const path = event.composedPath();
    for (const node of path) {
        if (!(node instanceof HTMLElement)) continue;
        if (node.dataset.lenisPrevent !== undefined) return false;
        if (isTouch && node.dataset.lenisPreventTouch !== undefined) return false;
        if (
            node.dataset.lenisPreventHorizontal !== undefined &&
            Math.abs(deltaX) > Math.abs(deltaY)
        )
            return false;
    }
    return true;
};

/**
 * Lenis with autoRaf: Lenis manages its own rAF loop internally,
 * only running frames while scroll momentum is active — not perpetually.
 *
 * syncTouch keeps Lenis alive and in control on touch devices too: it
 * preventDefault()s touchmove and applies scroll programmatically instead of
 * letting the browser handle the native scroll gesture. Because the browser
 * never sees a native scroll, its toolbar never auto-hides and the visible
 * viewport never resizes mid-scroll — it stays a stable 100svh throughout.
 */
const LenisProvider = ({ children }: LenisProviderProps) => {
    const lenisRef = useRef<LenisRef>(null);
    const { prefersReducedMotion } = useHomepageMotionPref();

    useEffect(() => {
        const prev = history.scrollRestoration;
        history.scrollRestoration = "manual";
        window.scrollTo(0, 0);

        return () => {
            history.scrollRestoration = prev;
        };
    }, []);

    const contextValue = useMemo(() => ({ lenisRef }), []);

    const lenisOptions = useMemo(
        () =>
            prefersReducedMotion
                ? {
                      autoRaf: true,
                      lerp: 1, // no smoothing: scroll position applies immediately
                      smoothWheel: false,
                      syncTouch: false, // native touch scrolling
                      virtualScroll: filterPreventedScrollEvents,
                  }
                : {
                      autoRaf: true,
                      lerp: 0.1,
                      syncTouch: true,
                      touchMultiplier: 1.6,
                      wheelMultiplier: 1.8,
                      virtualScroll: filterPreventedScrollEvents,
                  },
        [prefersReducedMotion]
    );

    return (
        <LenisContext.Provider value={contextValue}>
            <ReactLenis ref={lenisRef} root options={lenisOptions}>
                {children}
            </ReactLenis>
        </LenisContext.Provider>
    );
};

LenisProvider.displayName = "LenisProvider";

export { LenisProvider, useLenisContext };
