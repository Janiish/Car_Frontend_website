import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import type { MotionValue } from "framer-motion";
import type Lenis from "lenis";
import type { ScrubPlayerHandle } from "../components/scrub-player/types";
import type { VideoSourceSet } from "../configs/video-sources.config";
import type { ScrollytellingSnapshot, ScrollPosition } from "../scrolllytelling-context";
import { SECTIONS_CONFIG } from "../configs/waypoints.config";

const CARS_SECTION_INDEX = SECTIONS_CONFIG.findIndex((s) => s.sectionId === "cars");

/** Duration of the incoming player's opacity fade. Shared with the section's CSS. */
export const CAR_CROSSFADE_MS = 700;
/**
 * Force the reveal if the incoming player never reports a first frame (backend
 * demotion chains, stalled network). With loadMode="full" the entire FSV must
 * be downloaded and decoded before the first frame paints, so this timeout
 * must be generous — it is a last-resort unwedge, not an impatient reveal.
 */
const FIRST_FRAME_TIMEOUT_MS = 30_000;

type SlotIndex = 0 | 1;

type PoolState = {
    /** Which car each slot's player holds (null = slot not mounted yet). */
    slotCars: [number | null, number | null];
    /** Slot currently shown at full opacity. */
    activeSlot: SlotIndex;
    /** Slot loading/fading in over the active one (null = no switch in flight). */
    incoming: { slot: SlotIndex; revealed: boolean } | null;
};

type PendingSwitch = {
    generation: number;
    slot: SlotIndex;
    /** "waiting" = incoming player loading; "fading" = crossfade running. */
    phase: "waiting" | "fading";
    safetyTimer: ReturnType<typeof setTimeout> | null;
    fadeTimer: ReturnType<typeof setTimeout> | null;
};

type UseCarTabSwitchParams = {
    selectedCarIndex: number;
    setSelectedCarIndex: (index: number) => void;
    tabSources: VideoSourceSet[] | null;
    isDesktopRef: RefObject<boolean>;
    setIsInView: (value: boolean) => void;
    scrubProgress: MotionValue<number>;
    containerRef: RefObject<HTMLDivElement | null>;
    slotHandlesRef: RefObject<(ScrubPlayerHandle | null)[]>;
    lenis: Lenis | null | undefined;
    getScrollytellingState: () => ScrollytellingSnapshot;
    scrollToWaypoint: (position: ScrollPosition) => void;
};

function clampProgress(progress: number): number {
    return Math.min(Math.max(progress, 0), 1);
}

function seekPlayerToProgress(
    player: ScrubPlayerHandle | null | undefined,
    progress: number
): void {
    if (player?.isReady()) {
        player.seekToProgress(clampProgress(progress));
    }
}

function withSlotCar(
    slotCars: PoolState["slotCars"],
    slot: SlotIndex,
    carIndex: number
): PoolState["slotCars"] {
    const next: PoolState["slotCars"] = [...slotCars];
    next[slot] = carIndex;
    return next;
}

/**
 * Two-slot scrub-player pool for the cars section.
 *
 * Each slot owns a long-lived ScrubPlayer (one WebGL context each; together
 * with the garage player that is 3 contexts total — browsers allow ~8–16
 * active contexts, so this is well within budget). A tab switch loads the new
 * car into the hidden spare slot while the active player keeps rendering, then
 * crossfades the spare in once its first frame is painted and frees the old
 * slot's decoder. No frame snapshot, no dissolve canvas, and no
 * preserveDrawingBuffer tax on scrubbing.
 */
export function useCarTabSwitch({
    selectedCarIndex,
    setSelectedCarIndex,
    tabSources,
    isDesktopRef,
    setIsInView,
    scrubProgress,
    containerRef,
    slotHandlesRef,
    lenis,
    getScrollytellingState,
    scrollToWaypoint,
}: UseCarTabSwitchParams) {
    const [state, setState] = useState<PoolState>(() => ({
        slotCars: [selectedCarIndex, null],
        activeSlot: 0,
        incoming: null,
    }));
    const stateRef = useRef(state);

    const generationRef = useRef(0);
    const pendingRef = useRef<PendingSwitch | null>(null);
    const mobileTabSwitchRef = useRef(false);
    const tabSwitchRef = useRef(false);

    /** Applies a state update synchronously to the ref so callbacks never read stale pool state. */
    const commit = useCallback((updater: (prev: PoolState) => PoolState) => {
        const next = updater(stateRef.current);
        stateRef.current = next;
        setState(next);
    }, []);

    const clearPendingTimers = useCallback(() => {
        const pending = pendingRef.current;
        if (!pending) return;
        if (pending.safetyTimer) clearTimeout(pending.safetyTimer);
        if (pending.fadeTimer) clearTimeout(pending.fadeTimer);
        pending.safetyTimer = null;
        pending.fadeTimer = null;
    }, []);

    useEffect(() => clearPendingTimers, [clearPendingTimers]);

    /** The car the section is settling on: the in-flight target if any, else the visible one. */
    const getTargetCar = useCallback(() => {
        const st = stateRef.current;
        const pending = pendingRef.current;
        return pending ? st.slotCars[pending.slot] : st.slotCars[st.activeSlot];
    }, []);

    const finalizeSwap = useCallback(
        (generation: number, seek = true) => {
            const pending = pendingRef.current;
            if (!pending || pending.generation !== generation || pending.phase !== "fading") {
                return;
            }
            clearPendingTimers();
            pendingRef.current = null;
            const { slot } = pending;
            commit((prev) => ({ ...prev, activeSlot: slot, incoming: null }));
            mobileTabSwitchRef.current = false;
            lenis?.start();
            if (seek) {
                seekPlayerToProgress(slotHandlesRef.current?.[slot], scrubProgress.get());
            }
        },
        [clearPendingTimers, commit, lenis, scrubProgress, slotHandlesRef]
    );

    const beginReveal = useCallback(
        (generation: number) => {
            const pending = pendingRef.current;
            if (!pending || pending.generation !== generation || pending.phase !== "waiting") {
                return;
            }
            if (pending.safetyTimer) clearTimeout(pending.safetyTimer);
            pending.safetyTimer = null;
            pending.phase = "fading";
            seekPlayerToProgress(slotHandlesRef.current?.[pending.slot], scrubProgress.get());
            commit((prev) =>
                prev.incoming ? { ...prev, incoming: { ...prev.incoming, revealed: true } } : prev
            );
            pending.fadeTimer = setTimeout(() => finalizeSwap(generation), CAR_CROSSFADE_MS);
        },
        [commit, finalizeSwap, scrubProgress, slotHandlesRef]
    );

    const cancelSwitch = useCallback(() => {
        if (!pendingRef.current) return;
        clearPendingTimers();
        pendingRef.current = null;
        commit((prev) => ({ ...prev, incoming: null }));
        mobileTabSwitchRef.current = false;
        lenis?.start();
        seekPlayerToProgress(
            slotHandlesRef.current?.[stateRef.current.activeSlot],
            scrubProgress.get()
        );
    }, [clearPendingTimers, commit, lenis, scrubProgress, slotHandlesRef]);

    const recenterToCarsSection = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;
        const containerTop = window.scrollY + container.getBoundingClientRect().top;
        if (lenis) {
            lenis.scrollTo(containerTop, { immediate: true });
        } else {
            window.scrollTo({ top: containerTop, behavior: "instant" as ScrollBehavior });
        }
        if (getScrollytellingState().scrollMode === "section") {
            scrollToWaypoint({ sectionIndex: CARS_SECTION_INDEX, waypointIndex: 0 });
        }
    }, [containerRef, lenis, getScrollytellingState, scrollToWaypoint]);

    const performSwitch = useCallback(
        (carIndex: number, recenter: boolean) => {
            if (carIndex === getTargetCar()) return;

            // A crossfade already running is effectively complete visually —
            // promote it now so its slot becomes the stable base of the next fade.
            const running = pendingRef.current;
            if (running?.phase === "fading") {
                finalizeSwap(running.generation, false);
            }

            const st = stateRef.current;
            // Switching back to the car that is still on screen: drop the
            // in-flight load instead of crossfading to an identical video.
            if (pendingRef.current && carIndex === st.slotCars[st.activeSlot]) {
                cancelSwitch();
                return;
            }

            const spare: SlotIndex = pendingRef.current?.slot ?? (st.activeSlot === 0 ? 1 : 0);
            clearPendingTimers();

            const generation = ++generationRef.current;
            pendingRef.current = {
                generation,
                slot: spare,
                phase: "waiting",
                safetyTimer: setTimeout(() => beginReveal(generation), FIRST_FRAME_TIMEOUT_MS),
                fadeTimer: null,
            };
            const prevSpareCar = st.slotCars[spare];
            commit((prev) => ({
                ...prev,
                slotCars: withSlotCar(prev.slotCars, spare, carIndex),
                incoming: { slot: spare, revealed: false },
            }));

            // Same underlying video and a still-loaded player (rapid switch-back,
            // or tabs sharing one file): no reload happens, so onFirstFrame never
            // fires — the frame is already painted, reveal right away.
            const sameSource =
                prevSpareCar !== null &&
                tabSources?.[carIndex]?.fsv != null &&
                tabSources[carIndex]?.fsv === tabSources[prevSpareCar]?.fsv;
            if (sameSource && slotHandlesRef.current?.[spare]?.isReady()) {
                beginReveal(generation);
            }

            if (recenter) {
                requestAnimationFrame(() => {
                    if (generationRef.current === generation) {
                        recenterToCarsSection();
                        lenis?.stop();
                    }
                });
            } else {
                lenis?.stop();
            }
        },
        [
            beginReveal,
            cancelSwitch,
            clearPendingTimers,
            commit,
            finalizeSwap,
            getTargetCar,
            lenis,
            recenterToCarsSection,
            slotHandlesRef,
            tabSources,
        ]
    );

    const handleTabChange = useCallback(
        (carIndex: number) => {
            if (carIndex === getTargetCar()) return;

            tabSwitchRef.current = true;
            mobileTabSwitchRef.current = !isDesktopRef.current;
            if (isDesktopRef.current) setIsInView(false);
            // Urgent update: the toolbar indicator and car content switch on the
            // very next paint — the video follows via the pool crossfade.
            setSelectedCarIndex(carIndex);
            performSwitch(carIndex, true);
        },
        [getTargetCar, isDesktopRef, performSwitch, setIsInView, setSelectedCarIndex]
    );

    /**
     * First-frame callback for a slot's player. Only the pending incoming slot
     * triggers a reveal; `isReady()` filters stale paints from a superseded
     * source (the backend flips it false synchronously when sources change).
     */
    const onSlotFirstFrame = useCallback(
        (slot: SlotIndex) => {
            const pending = pendingRef.current;
            if (!pending || pending.slot !== slot || pending.phase !== "waiting") return;
            if (!slotHandlesRef.current?.[slot]?.isReady()) return;
            beginReveal(pending.generation);
        },
        [beginReveal, slotHandlesRef]
    );

    // URL-driven car changes (deep link resolving, back/forward navigation)
    // arrive as a selectedCarIndex change without a tab click.
    useEffect(() => {
        if (selectedCarIndex === getTargetCar()) return;
        const st = stateRef.current;
        const activeHandle = slotHandlesRef.current?.[st.activeSlot];
        // Cold pool (player not loaded yet, e.g. router.isReady resolving a
        // ?car= deep link before the section scrolled in): swap the active
        // slot's assignment in place — no crossfade, no wasted download.
        if (!pendingRef.current && !activeHandle?.isReady()) {
            commit((prev) => ({
                ...prev,
                slotCars: withSlotCar(prev.slotCars, prev.activeSlot, selectedCarIndex),
            }));
            return;
        }
        performSwitch(selectedCarIndex, false);
    }, [selectedCarIndex, commit, getTargetCar, performSwitch, slotHandlesRef]);

    // Scroll scrub → player seeks, rAF-coalesced like before. While a switch
    // is in flight the outgoing car stays frozen on its current frame — the
    // recenter scroll (progress → 0) must not visibly rewind it; the crossfade
    // covers it. Only the incoming player tracks the scrub position.
    useEffect(() => {
        let pendingProgress = 0;
        let rafId: number | undefined;

        const unsubscribe = scrubProgress.on("change", (p) => {
            pendingProgress = p;
            if (rafId !== undefined) return;
            rafId = requestAnimationFrame(() => {
                rafId = undefined;
                const st = stateRef.current;
                const handles = slotHandlesRef.current;
                const pending = pendingRef.current;
                if (pending) {
                    seekPlayerToProgress(handles?.[pending.slot], pendingProgress);
                } else {
                    seekPlayerToProgress(handles?.[st.activeSlot], pendingProgress);
                }
            });
        });

        return () => {
            unsubscribe();
            if (rafId !== undefined) cancelAnimationFrame(rafId);
        };
    }, [scrubProgress, slotHandlesRef]);

    return {
        slotCars: state.slotCars,
        activeSlot: state.activeSlot,
        incomingSlot: state.incoming?.slot ?? null,
        incomingRevealed: state.incoming?.revealed ?? false,
        handleTabChange,
        onSlotFirstFrame,
        mobileTabSwitchRef,
        tabSwitchRef,
    };
}

export type { SlotIndex };
