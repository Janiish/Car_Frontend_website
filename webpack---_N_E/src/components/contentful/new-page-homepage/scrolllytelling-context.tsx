import type { ReactNode } from "react";
import {
    createContext,
    useContext,
    useRef,
    useState,
    useCallback,
    useEffect,
    useMemo,
    useSyncExternalStore,
    startTransition,
} from "react";
import type Lenis from "lenis";
import { useLenis } from "lenis/react";
import Snap from "lenis/snap";
import type { SectionConfig, WaypointSnapOptions } from "./configs/waypoints.config";
import { SECTIONS_CONFIG } from "./configs/waypoints.config";

export type ScrollMode = "free" | "section";

export type ScrollPosition = {
    sectionIndex: number;
    waypointIndex: number;
};

type SnapPoint = {
    value: number;
    sectionIndex: number;
    waypointIndex: number;
    snap?: WaypointSnapOptions;
};

export type ScrollytellingState = {
    position: ScrollPosition;
    scrollMode: ScrollMode;
    currentSection: SectionConfig;
    sections: SectionConfig[];
};

export type ScrollytellingActions = {
    scrollToWaypoint: (position: ScrollPosition) => void;
    scrollToSection: (sectionId: string) => void;
    scrollToNext: () => void;
    scrollToPrevious: () => void;
    resetSection: (sectionId: string) => void;
    setScrollMode: (scrollMode: "free" | "section") => void;
};

export type ScrolllytellingContextAPI = ScrollytellingState & ScrollytellingActions;

export type ScrollytellingSnapshot = {
    position: ScrollPosition;
    scrollMode: ScrollMode;
};

type ScrollytellingStore = {
    subscribe: (listener: () => void) => () => void;
    getSnapshot: () => ScrollytellingSnapshot;
};

const ScrollytellingStateContext = createContext<ScrollytellingState | null>(null);
const ScrollytellingActionsContext = createContext<ScrollytellingActions | null>(null);
const ScrollytellingStoreContext = createContext<ScrollytellingStore | null>(null);

const useScrollytellingState = () => {
    const context = useContext(ScrollytellingStateContext);
    if (!context) {
        throw new Error("useScrollytellingState must be used within ScrollytellingProvider");
    }
    return context;
};

const useScrollytellingActions = () => {
    const context = useContext(ScrollytellingActionsContext);
    if (!context) {
        throw new Error("useScrollytellingActions must be used within ScrollytellingProvider");
    }
    return context;
};

const useScrollytellingContext = (): ScrolllytellingContextAPI => {
    const state = useScrollytellingState();
    const actions = useScrollytellingActions();
    return { ...state, ...actions };
};

function useScrollytellingSelector<T>(selector: (s: ScrollytellingSnapshot) => T): T {
    const store = useContext(ScrollytellingStoreContext);
    if (!store) {
        throw new Error("useScrollytellingSelector must be used within ScrollytellingProvider");
    }
    return useSyncExternalStore(
        store.subscribe,
        () => selector(store.getSnapshot()),
        () => selector(store.getSnapshot())
    );
}

function useScrollytellingGetState(): () => ScrollytellingSnapshot {
    const store = useContext(ScrollytellingStoreContext);
    if (!store) {
        throw new Error("useScrollytellingGetState must be used within ScrollytellingProvider");
    }
    return store.getSnapshot;
}

type ScrollytellingProviderProps = {
    children: ReactNode;
};

const DEFAULT_SNAP_DURATION = 1.2;
const REDUCED_SNAP_DURATION = 0.15;

const prefersReducedMotionNow = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const resolveSnapDuration = (base: number | undefined) =>
    prefersReducedMotionNow() ? REDUCED_SNAP_DURATION : (base ?? DEFAULT_SNAP_DURATION);

const FREE_SCROLL_BOUNDARY_PADDING = 5;

type FreeScrollRange = {
    sectionIndex: number;
    top: number;
    bottom: number;
};

const getNextPosition = (pos: ScrollPosition): ScrollPosition | null => {
    const section = SECTIONS_CONFIG[pos.sectionIndex];

    if (pos.waypointIndex < section.waypoints.length - 1) {
        return { sectionIndex: pos.sectionIndex, waypointIndex: pos.waypointIndex + 1 };
    }

    if (pos.sectionIndex < SECTIONS_CONFIG.length - 1) {
        return { sectionIndex: pos.sectionIndex + 1, waypointIndex: 0 };
    }

    return null;
};

const getPrevPosition = (pos: ScrollPosition): ScrollPosition | null => {
    if (pos.waypointIndex > 0) {
        return { sectionIndex: pos.sectionIndex, waypointIndex: pos.waypointIndex - 1 };
    }

    const prevIndex = pos.sectionIndex - 1;

    if (prevIndex >= 0) {
        return {
            sectionIndex: prevIndex,
            waypointIndex: SECTIONS_CONFIG[prevIndex].waypoints.length - 1,
        };
    }

    return null;
};

const computeSnapPoints = (): SnapPoint[] => {
    const points: SnapPoint[] = [];
    const viewportHeight = globalThis.innerHeight;

    SECTIONS_CONFIG.forEach((section, sectionIndex) => {
        const el = document.getElementById(section.sectionId);
        if (!el) return;

        const sectionTop = el.offsetTop;
        const sectionHeight = el.offsetHeight;
        const scrollableRange = sectionHeight - viewportHeight;

        section.waypoints.forEach((waypoint, waypointIndex) => {
            const value =
                waypoint.offset === 0 ? sectionTop : sectionTop + scrollableRange * waypoint.offset;

            points.push({
                value: Math.max(0, value),
                sectionIndex,
                waypointIndex,
                snap: waypoint.snap,
            });
        });
    });

    return points;
};

const SNAP_POINT_TOLERANCE_PX = 1;

function areSnapPointsUnchanged(newPoints: SnapPoint[], oldPoints: SnapPoint[]): boolean {
    if (newPoints.length !== oldPoints.length) {
        return false;
    }
    for (let i = 0; i < newPoints.length; i++) {
        if (Math.abs(newPoints[i].value - oldPoints[i].value) >= SNAP_POINT_TOLERANCE_PX) {
            return false;
        }
    }
    return true;
}

const computeFreeScrollRanges = (): FreeScrollRange[] => {
    const ranges: FreeScrollRange[] = [];
    const viewportHeight = globalThis.innerHeight;

    SECTIONS_CONFIG.forEach((section, sectionIndex) => {
        if (!section.freeScroll) return;

        const el = document.getElementById(section.sectionId);
        if (!el) return;

        const sectionTop = el.offsetTop;
        const scrollableRange = el.offsetHeight - viewportHeight;
        const lastWaypoint = section.waypoints.at(-1);
        const bottom = sectionTop + scrollableRange * (lastWaypoint?.offset ?? 1);

        ranges.push({
            sectionIndex,
            top: sectionTop,
            bottom,
        });
    });

    return ranges;
};

const findSnapPosition = (value: number, snapPoints: SnapPoint[]): ScrollPosition | null => {
    const match = snapPoints.find((p) => Math.abs(p.value - value) < 5);
    return match ? { sectionIndex: match.sectionIndex, waypointIndex: match.waypointIndex } : null;
};

const positionToFlatIndex = (pos: ScrollPosition, snapPoints: SnapPoint[]): number => {
    return snapPoints.findIndex(
        (p) => p.sectionIndex === pos.sectionIndex && p.waypointIndex === pos.waypointIndex
    );
};

/**
 * Finds the free-scroll range containing the given scroll value, if any.
 */
const findActiveRange = (
    scroll: number,
    ranges: FreeScrollRange[]
): FreeScrollRange | undefined => {
    const padding = FREE_SCROLL_BOUNDARY_PADDING;
    return ranges.find((r) => scroll >= r.top - padding && scroll <= r.bottom + padding);
};

/**
 * Patches Snap.goTo to apply per-waypoint snap options (duration/easing/lerp)
 * before each transition instead of always using the constructor defaults.
 */
const patchSnapGoTo = (snap: Snap, snapPointsRef: React.RefObject<SnapPoint[]>) => {
    const originalGoTo = snap.goTo.bind(snap);
    snap.goTo = (index: number) => {
        const point = snapPointsRef.current?.[index];
        snap.options.duration = resolveSnapDuration(point?.snap?.duration);
        if (point?.snap) {
            snap.options.easing = prefersReducedMotionNow() ? undefined : point.snap.easing;
            snap.options.lerp = point.snap.lerp;
        } else {
            snap.options.easing = undefined;
            snap.options.lerp = undefined;
        }
        originalGoTo(index);
    };
};

/**
 * Tracks scroll position: updates position state while inside a free-scroll
 * zone and re-enables snap when the scroll exits the zone boundaries.
 */
const handleScrollForFreeZone = (
    snap: Snap,
    lenis: Lenis,
    suspendedRef: React.MutableRefObject<boolean>,
    rangesRef: React.RefObject<FreeScrollRange[]>,
    onPositionChange: React.Dispatch<React.SetStateAction<ScrollPosition>>
) => {
    const scroll = lenis.scroll;
    const ranges = rangesRef.current ?? [];
    const activeRange = findActiveRange(scroll, ranges);

    if (activeRange) {
        if (!suspendedRef.current) {
            snap.stop();
            suspendedRef.current = true;
        }
        startTransition(() =>
            onPositionChange((prev) =>
                prev.sectionIndex === activeRange.sectionIndex && prev.waypointIndex === 0
                    ? prev
                    : { sectionIndex: activeRange.sectionIndex, waypointIndex: 0 }
            )
        );
        return;
    }

    if (suspendedRef.current) {
        suspendedRef.current = false;
        snap.start();
    }
};

const handleSnapComplete = (
    value: number,
    snapPointsRef: React.RefObject<SnapPoint[]>,
    snap: Snap,
    suspendedRef: React.MutableRefObject<boolean>,
    onPositionChange: React.Dispatch<React.SetStateAction<ScrollPosition>>,
    snapTimeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
) => {
    const points = snapPointsRef.current ?? [];
    const matched = findSnapPosition(value, points);
    if (!matched) return;

    startTransition(() =>
        onPositionChange((prev) =>
            prev.sectionIndex === matched.sectionIndex &&
            prev.waypointIndex === matched.waypointIndex
                ? prev
                : matched
        )
    );

    const section = SECTIONS_CONFIG[matched.sectionIndex];
    if (section.freeScroll) {
        snap.stop();
        suspendedRef.current = true;
    } else {
        snap.stop();
        if (snapTimeoutRef.current !== null) clearTimeout(snapTimeoutRef.current);
        snapTimeoutRef.current = setTimeout(() => {
            snapTimeoutRef.current = null;
            if (!suspendedRef.current) snap.start();
        }, 150);
    }
};

type CreateSnapDeps = {
    lenis: Lenis;
    snapRef: React.MutableRefObject<Snap | null>;
    snapPointsRef: React.RefObject<SnapPoint[]>;
    freeScrollRangesRef: React.RefObject<FreeScrollRange[]>;
    isSnapSuspendedRef: React.MutableRefObject<boolean>;
    setPosition: React.Dispatch<React.SetStateAction<ScrollPosition>>;
    snapTimeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>;
};

const createSnapInstance = (deps: CreateSnapDeps): (() => void) | undefined => {
    const {
        lenis,
        snapRef,
        snapPointsRef,
        freeScrollRangesRef,
        isSnapSuspendedRef,
        setPosition,
        snapTimeoutRef,
    } = deps;

    isSnapSuspendedRef.current = false;

    const points = computeSnapPoints();
    (snapPointsRef as React.MutableRefObject<SnapPoint[]>).current = points;
    (freeScrollRangesRef as React.MutableRefObject<FreeScrollRange[]>).current =
        computeFreeScrollRanges();

    const snap = new Snap(lenis, {
        type: "lock",
        debounce: 0,
        duration: resolveSnapDuration(undefined),
        distanceThreshold: 99999,
        onSnapComplete: ({ value }) =>
            handleSnapComplete(
                value,
                snapPointsRef,
                snap,
                isSnapSuspendedRef,
                setPosition,
                snapTimeoutRef
            ),
    });

    points.forEach((point) => snap.add(point.value));
    patchSnapGoTo(snap, snapPointsRef);
    snapRef.current = snap;

    return lenis.on("scroll", (_lenis) => {
        handleScrollForFreeZone(snap, _lenis, isSnapSuspendedRef, freeScrollRangesRef, setPosition);
    });
};

/** Guard against iOS Safari toolbar show/hide causing spurious snap recalculations. */
const observeViewportResize = (recreateSnap: () => void): (() => void) => {
    let lastViewportHeight = globalThis.innerHeight;
    const TOOLBAR_RESIZE_THRESHOLD_PX = 150;

    const handleResize = () => {
        const newHeight = globalThis.innerHeight;
        const delta = Math.abs(newHeight - lastViewportHeight);
        if (delta < TOOLBAR_RESIZE_THRESHOLD_PX) return;
        lastViewportHeight = newHeight;
        recreateSnap();
    };

    globalThis.addEventListener("resize", handleResize, { passive: true });
    return () => globalThis.removeEventListener("resize", handleResize);
};

/**
 * Observe section elements for layout shifts (images/videos loading) and
 * dynamically-mounted sections (next/dynamic with ssr:false).
 */
const observeSectionLayout = (
    recreateSnap: () => void,
    snapPointsRef: React.RefObject<SnapPoint[]>
) => {
    const layoutTimer: { current: number | undefined } = { current: undefined };

    const debouncedRecreate = () => {
        clearTimeout(layoutTimer.current);
        layoutTimer.current = window.setTimeout(() => {
            const newPoints = computeSnapPoints();
            if (areSnapPointsUnchanged(newPoints, snapPointsRef.current ?? [])) return;
            recreateSnap();
        }, 200);
    };

    const resizeObserver = new ResizeObserver(debouncedRecreate);
    const observedElements = new Set<Element>();

    const reobserveSections = () => {
        for (const section of SECTIONS_CONFIG) {
            const el = document.getElementById(section.sectionId);
            if (!el || observedElements.has(el)) continue;
            observedElements.add(el);
            resizeObserver.observe(el);
            debouncedRecreate();
        }
    };

    for (const section of SECTIONS_CONFIG) {
        const el = document.getElementById(section.sectionId);
        if (el) resizeObserver.observe(el);
    }
    reobserveSections();

    const mutationObserver = new MutationObserver(reobserveSections);
    const homepageRoot =
        document.getElementById(SECTIONS_CONFIG[0]?.sectionId)?.parentElement ?? document.body;
    mutationObserver.observe(homepageRoot, { childList: true });

    return {
        cleanup: () => {
            resizeObserver.disconnect();
            mutationObserver.disconnect();
        },
        layoutTimer,
    };
};

const clearSnapTimeout = (
    snapTimeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
) => {
    if (snapTimeoutRef.current === null) return;
    clearTimeout(snapTimeoutRef.current);
    snapTimeoutRef.current = null;
};

const ScrollytellingProvider = ({ children }: ScrollytellingProviderProps) => {
    const lenis = useLenis();
    const snapRef = useRef<Snap | null>(null);
    const snapPointsRef = useRef<SnapPoint[]>([]);
    const isSnapSuspendedRef = useRef(false);
    const freeScrollRangesRef = useRef<FreeScrollRange[]>([]);
    const snapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [position, setPosition] = useState<ScrollPosition>({ sectionIndex: 0, waypointIndex: 0 });
    const [scrollMode, setScrollMode] = useState<"free" | "section">("free");

    const snapshotRef = useRef<ScrollytellingSnapshot>({
        position: { sectionIndex: 0, waypointIndex: 0 },
        scrollMode: "free",
    });
    const listenersRef = useRef(new Set<() => void>());

    const emitChange = useCallback(() => {
        for (const fn of listenersRef.current) fn();
    }, []);

    const storeSubscribe = useCallback((listener: () => void) => {
        listenersRef.current.add(listener);
        return () => {
            listenersRef.current.delete(listener);
        };
    }, []);

    const getSnapshot = useCallback(() => snapshotRef.current, []);

    const commitPosition = useCallback(
        (update: ScrollPosition | ((prev: ScrollPosition) => ScrollPosition)) => {
            const prev = snapshotRef.current.position;
            const next = typeof update === "function" ? update(prev) : update;
            if (
                prev === next ||
                (prev.sectionIndex === next.sectionIndex &&
                    prev.waypointIndex === next.waypointIndex)
            ) {
                return;
            }
            snapshotRef.current = { ...snapshotRef.current, position: next };
            emitChange();
            setPosition(next);
        },
        [emitChange]
    );

    const commitScrollMode = useCallback(
        (mode: ScrollMode) => {
            if (snapshotRef.current.scrollMode === mode) return;
            snapshotRef.current = { ...snapshotRef.current, scrollMode: mode };
            emitChange();
            setScrollMode(mode);
        },
        [emitChange]
    );

    const currentSection = SECTIONS_CONFIG[position.sectionIndex];

    const scrollToWaypoint = useCallback(
        (pos: ScrollPosition) => {
            if (snapRef.current) {
                const flatIndex = positionToFlatIndex(pos, snapPointsRef.current);
                if (flatIndex === -1) return;
                commitPosition(pos);
                snapRef.current.goTo(flatIndex);
                return;
            }

            const section = SECTIONS_CONFIG[pos.sectionIndex];
            const waypoint = section.waypoints[pos.waypointIndex];
            const el = document.getElementById(section.sectionId);

            if (!el) return;

            const sectionTop = el.offsetTop;
            const sectionHeight = el.offsetHeight;
            const viewportHeight = globalThis.innerHeight;

            let scrollTarget: number;

            if (waypoint.offset === 0) {
                scrollTarget = sectionTop;
            } else {
                const scrollableRange = sectionHeight - viewportHeight;
                scrollTarget = sectionTop + scrollableRange * waypoint.offset;
            }

            const targetPosition = Math.max(0, scrollTarget);

            if (Math.abs(globalThis.scrollY - targetPosition) < 10) {
                commitPosition(pos);
                return;
            }

            const duration = resolveSnapDuration(waypoint.snap?.duration);

            if (lenis) {
                lenis.stop();
                commitPosition(pos);
                requestAnimationFrame(() => {
                    lenis.start();
                    lenis.scrollTo(targetPosition, { duration });
                });
            } else {
                commitPosition(pos);
                globalThis.scrollTo({ top: targetPosition, behavior: "smooth" });
            }
        },
        [lenis, commitPosition]
    );

    const scrollToSection = useCallback(
        (sectionId: string) => {
            const sectionIndex = SECTIONS_CONFIG.findIndex((s) => s.sectionId === sectionId);

            if (sectionIndex >= 0) {
                scrollToWaypoint({ sectionIndex, waypointIndex: 0 });
            }
        },
        [scrollToWaypoint]
    );

    const scrollToNext = useCallback(() => {
        const pos = snapshotRef.current.position;
        if (isSnapSuspendedRef.current) {
            const nextSectionIndex = pos.sectionIndex + 1;
            if (nextSectionIndex < SECTIONS_CONFIG.length) {
                isSnapSuspendedRef.current = false;
                snapRef.current?.start();
                scrollToWaypoint({ sectionIndex: nextSectionIndex, waypointIndex: 0 });
            }
            return;
        }

        if (snapRef.current) {
            snapRef.current.next();
            return;
        }

        const nextPos = getNextPosition(pos);
        if (nextPos) scrollToWaypoint(nextPos);
    }, [scrollToWaypoint]);

    const scrollToPrevious = useCallback(() => {
        const pos = snapshotRef.current.position;
        if (isSnapSuspendedRef.current) {
            const prevSectionIndex = pos.sectionIndex - 1;
            if (prevSectionIndex >= 0) {
                isSnapSuspendedRef.current = false;
                snapRef.current?.start();
                const prevSection = SECTIONS_CONFIG[prevSectionIndex];
                scrollToWaypoint({
                    sectionIndex: prevSectionIndex,
                    waypointIndex: prevSection.waypoints.length - 1,
                });
            }
            return;
        }

        if (snapRef.current) {
            snapRef.current.previous();
            return;
        }

        const prevPos = getPrevPosition(pos);
        if (prevPos) scrollToWaypoint(prevPos);
    }, [scrollToWaypoint]);

    const resetSection = useCallback(
        (sectionId: string) => {
            const sectionIndex = SECTIONS_CONFIG.findIndex((s) => s.sectionId === sectionId);

            if (sectionIndex >= 0) {
                commitPosition({ sectionIndex, waypointIndex: 0 });
            }
        },
        [commitPosition]
    );

    // Snap instance lifecycle: create when "section" mode, destroy when "free".
    // Free-scroll sections have their entry/exit waypoints registered as snap
    // points. When a snap completes on one of those points, snap is suspended
    // so the user can scroll freely within the section. The scroll listener
    // re-enables snap when leaving the zone.
    useEffect(() => {
        if (scrollMode !== "section" || !lenis) return;

        // Mobile keeps native-feeling free scroll; snapping is desktop-only.
        if (window.matchMedia("(pointer: coarse)").matches) return;

        let unsubScroll: (() => void) | undefined;

        const deps: CreateSnapDeps = {
            lenis,
            snapRef,
            snapPointsRef,
            freeScrollRangesRef,
            isSnapSuspendedRef,
            setPosition: commitPosition,
            snapTimeoutRef,
        };

        const recreateSnap = () => {
            snapRef.current?.destroy();
            unsubScroll?.();
            unsubScroll = createSnapInstance(deps);
        };

        recreateSnap();

        const cleanupResize = observeViewportResize(recreateSnap);
        const { cleanup: cleanupSections, layoutTimer } = observeSectionLayout(
            recreateSnap,
            snapPointsRef
        );

        return () => {
            cleanupResize();
            cleanupSections();
            clearTimeout(layoutTimer.current);
            clearSnapTimeout(snapTimeoutRef);
            unsubScroll?.();
            snapRef.current?.destroy();
            snapRef.current = null;
            snapPointsRef.current = [];
            freeScrollRangesRef.current = [];
            isSnapSuspendedRef.current = false;
        };
    }, [scrollMode, lenis, commitPosition]);

    const stateValue = useMemo<ScrollytellingState>(
        () => ({
            position,
            scrollMode,
            currentSection,
            sections: SECTIONS_CONFIG,
        }),
        [position, scrollMode, currentSection]
    );

    const storeValue = useMemo<ScrollytellingStore>(
        () => ({ subscribe: storeSubscribe, getSnapshot }),
        [storeSubscribe, getSnapshot]
    );

    const actionsValue = useMemo<ScrollytellingActions>(
        () => ({
            scrollToWaypoint,
            scrollToSection,
            scrollToNext,
            scrollToPrevious,
            resetSection,
            setScrollMode: commitScrollMode,
        }),
        [
            scrollToWaypoint,
            scrollToSection,
            scrollToNext,
            scrollToPrevious,
            resetSection,
            commitScrollMode,
        ]
    );

    return (
        <ScrollytellingStoreContext.Provider value={storeValue}>
            <ScrollytellingStateContext.Provider value={stateValue}>
                <ScrollytellingActionsContext.Provider value={actionsValue}>
                    {children}
                </ScrollytellingActionsContext.Provider>
            </ScrollytellingStateContext.Provider>
        </ScrollytellingStoreContext.Provider>
    );
};

ScrollytellingProvider.displayName = "ScrollytellingProvider";

export {
    ScrollytellingProvider,
    useScrollytellingContext,
    useScrollytellingState,
    useScrollytellingActions,
    useScrollytellingSelector,
    useScrollytellingGetState,
};
