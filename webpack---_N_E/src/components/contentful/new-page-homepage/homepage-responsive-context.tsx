import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useSyncExternalStore,
    type ReactNode,
} from "react";
import breakpoints from "@project/ui/src/design-tokens/09.breakpoints/breakpoints";

/** Viewport height (px) at or below which a screen is considered "short". */
const SHORT_VIEWPORT_MAX_HEIGHT_PX = 700;

type BreakpointState = {
    isDesktopL: boolean;
    isDesktopMd: boolean;
    isMobile: boolean;
    isMobileLandscape: boolean;
    isShortViewport: boolean;
};

type MotionPrefState = {
    prefersReducedMotion: boolean;
};

type HomepageResponsiveState = BreakpointState & MotionPrefState;

const BreakpointContext = createContext<BreakpointState | null>(null);
const MotionPrefContext = createContext<MotionPrefState | null>(null);

function useMediaQuerySafe(query: string, fallback: boolean): boolean {
    const subscribe = useCallback(
        (callback: () => void) => {
            const mql = window.matchMedia(query);
            mql.addEventListener("change", callback);
            return () => mql.removeEventListener("change", callback);
        },
        [query]
    );
    const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
    const getServerSnapshot = useCallback(() => fallback, [fallback]);
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// Phone-in-landscape detection: phones only (tablets keep landscape),
// orientation read from the Screen Orientation API
// with legacy `window.orientation` and aspect-ratio fallbacks. UA-based on
// purpose — a width media query can't tell a landscape phone from a small
// desktop window. A viewport-width ceiling (the `md` breakpoint) guards
// against DevTools emulating a phone UA at desktop resolutions — no real
// phone landscape viewport exceeds ~932 CSS px.
const PHONE_UA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i;
const TABLET_UA = /iPad|Tablet/i;
const PHONE_MAX_VIEWPORT = parseInt(breakpoints.md, 10);

function isPhoneUserAgent(): boolean {
    return PHONE_UA.test(navigator.userAgent) && !TABLET_UA.test(navigator.userAgent);
}

function isPhoneViewport(): boolean {
    return window.innerWidth < PHONE_MAX_VIEWPORT;
}

function isLandscapeOrientation(): boolean {
    if (window.screen?.orientation) {
        return window.screen.orientation.type.includes("landscape");
    }
    const legacyOrientation = (window as unknown as { orientation?: number }).orientation;
    if (typeof legacyOrientation !== "undefined") {
        return legacyOrientation === 90 || legacyOrientation === -90;
    }
    return window.innerWidth > window.innerHeight;
}

function subscribeToOrientation(callback: () => void): () => void {
    const orientation = window.screen?.orientation;
    if (orientation) {
        orientation.addEventListener("change", callback);
    } else {
        window.addEventListener("orientationchange", callback);
    }
    window.addEventListener("resize", callback);
    return () => {
        if (orientation) {
            orientation.removeEventListener("change", callback);
        } else {
            window.removeEventListener("orientationchange", callback);
        }
        window.removeEventListener("resize", callback);
    };
}

function useIsMobileLandscape(): boolean {
    return useSyncExternalStore(
        subscribeToOrientation,
        () => isPhoneUserAgent() && isPhoneViewport() && isLandscapeOrientation(),
        () => false
    );
}

function HomepageResponsiveProvider({ children }: Readonly<{ children: ReactNode }>) {
    const isDesktopL = useMediaQuerySafe(`(min-width: ${breakpoints.l})`, false);
    const isDesktopMd = useMediaQuerySafe(`(min-width: ${breakpoints.md})`, false);
    const isMobileLandscape = useIsMobileLandscape();
    const isShortViewport = useMediaQuerySafe(
        `(max-height: ${SHORT_VIEWPORT_MAX_HEIGHT_PX}px)`,
        false
    );
    // Reduced-motion handling is intentionally disabled on the homepage for now:
    // the OS "reduce motion" setting was degrading the scroll-driven experience
    // (static fallbacks instead of the scrub videos/animations). Forcing this to
    // false keeps every reduced-motion branch inactive so the full animated
    // experience always runs. Restore the media query below to re-enable it.
    const prefersReducedMotion = false;

    const breakpointValue = useMemo<BreakpointState>(
        () => ({
            isDesktopL,
            isDesktopMd,
            isMobile: !isDesktopMd,
            isMobileLandscape,
            isShortViewport,
        }),
        [isDesktopL, isDesktopMd, isMobileLandscape, isShortViewport]
    );

    const motionValue = useMemo<MotionPrefState>(
        () => ({ prefersReducedMotion }),
        [prefersReducedMotion]
    );

    return (
        <BreakpointContext.Provider value={breakpointValue}>
            <MotionPrefContext.Provider value={motionValue}>{children}</MotionPrefContext.Provider>
        </BreakpointContext.Provider>
    );
}

function useHomepageBreakpoints(): BreakpointState {
    const ctx = useContext(BreakpointContext);
    if (!ctx) {
        throw new Error("useHomepageBreakpoints must be used within HomepageResponsiveProvider");
    }
    return ctx;
}

function useHomepageMotionPref(): MotionPrefState {
    const ctx = useContext(MotionPrefContext);
    if (!ctx) {
        throw new Error("useHomepageMotionPref must be used within HomepageResponsiveProvider");
    }
    return ctx;
}

function useHomepageResponsive(): HomepageResponsiveState {
    return { ...useHomepageBreakpoints(), ...useHomepageMotionPref() };
}

HomepageResponsiveProvider.displayName = "HomepageResponsiveProvider";

export {
    HomepageResponsiveProvider,
    useHomepageResponsive,
    useHomepageBreakpoints,
    useHomepageMotionPref,
};
