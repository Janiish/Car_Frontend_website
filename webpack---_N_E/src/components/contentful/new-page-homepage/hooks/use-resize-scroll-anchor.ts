import { useEffect } from "react";
import { useLenis } from "lenis/react";
import type Lenis from "lenis";
import { SECTIONS_CONFIG } from "../configs/waypoints.config";

type ScrollAnchor = {
    sectionId: string;
    /** 0–1+ through the section's scrollable range (offsetHeight - viewport). */
    progress: number;
};

type SectionGeometry = {
    sectionId: string;
    top: number;
    range: number;
};

type AnchorState = {
    anchor: ScrollAnchor | null;
    lastInnerWidth: number;
    lastInnerHeight: number;
    lastScrollHeight: number;
    restoring: boolean;
    /**
     * Reflows are turbulent: the browser clamp-scrolls when scrollHeight
     * shrinks, sections re-render across several frames, and carousels emit
     * their own corrections. Scroll events inside this window must NOT
     * recapture the anchor — mid-flight geometry produces garbage anchors
     * (observed: progress 3.4 from a clamp-scroll during a breakpoint flip).
     */
    turbulentUntil: number;
    /**
     * Window after a viewport change during which late layout changes still
     * count as part of that reflow and may move the page.
     */
    reflowUntil: number;
};

const TURBULENCE_MS = 350;
const REFLOW_CASCADE_MS = 350;

function measureSections(): SectionGeometry[] {
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const geometry: SectionGeometry[] = [];

    for (const section of SECTIONS_CONFIG) {
        const el = document.getElementById(section.sectionId);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        geometry.push({
            sectionId: section.sectionId,
            top: rect.top + scrollY,
            range: Math.max(1, el.offsetHeight - viewportHeight),
        });
    }

    return geometry;
}

/**
 * Sections overlap via negative margins, so "the section we're in" is the
 * last one whose top we've scrolled past — mirroring how the later section
 * visually stacks above the one it overlaps.
 */
function captureAnchor(): ScrollAnchor | null {
    const sections = measureSections();
    const scrollY = window.scrollY;
    let current: SectionGeometry | null = null;

    for (const section of sections) {
        if (section.top <= scrollY + 1) current = section;
    }
    if (!current) return null;

    return {
        sectionId: current.sectionId,
        progress: (scrollY - current.top) / current.range,
    };
}

/**
 * Maps the anchor back to a scrollY in the current layout, clamped to the
 * anchor section's span (its top up to the next section's start) so a stale
 * or extreme progress can never fling the page into another section.
 */
function resolveAnchor(anchor: ScrollAnchor): number | null {
    const sections = measureSections();
    const index = sections.findIndex((s) => s.sectionId === anchor.sectionId);
    if (index === -1) return null;

    const section = sections[index];
    const next = sections[index + 1];
    const maxTarget = next
        ? Math.max(section.top, next.top - 1)
        : document.documentElement.scrollHeight - window.innerHeight;
    const raw = section.top + anchor.progress * section.range;
    return Math.max(0, Math.max(section.top, Math.min(raw, maxTarget)));
}

function scrollToInstant(target: number, lenis: Lenis | null | undefined): void {
    if (lenis) {
        lenis.scrollTo(target, { immediate: true, force: true });
    } else {
        window.scrollTo({ top: target, behavior: "instant" });
    }
}

function handleViewportResize(state: AnchorState, lenis: Lenis | null | undefined): void {
    const widthChanged = window.innerWidth !== state.lastInnerWidth;
    const viewportChanged = widthChanged || window.innerHeight !== state.lastInnerHeight;
    const layoutChanged = document.documentElement.scrollHeight !== state.lastScrollHeight;
    if (!viewportChanged && !layoutChanged) return;

    // Late frames of this resize still count as part of it.
    if (viewportChanged) state.reflowUntil = performance.now() + REFLOW_CASCADE_MS;

    // Reflow in progress — hold the pre-resize anchor until things go quiet.
    // A viewport change that moved no layout is not turbulent (a mobile
    // toolbar sliding away), and freezing capture there would leave a stale
    // anchor for the reflow window to restore.
    if (widthChanged || layoutChanged) state.turbulentUntil = performance.now() + TURBULENCE_MS;

    state.lastInnerWidth = window.innerWidth;
    state.lastInnerHeight = window.innerHeight;
    state.lastScrollHeight = document.documentElement.scrollHeight;

    // A viewport change that leaves the scroll space untouched has nothing to
    // correct: mobile toolbars shrink innerHeight while the lvh-derived
    // document keeps its height, and re-anchoring there fights the scroll
    // that hid the toolbar.
    if (!layoutChanged) return;

    // The document resized on its own: sections pin and unpin and
    // content-visibility subtrees resolve as the user scrolls, and their
    // scroll position is still the truth. Restoring here fights the gesture —
    // because capture is frozen during turbulence, a second change inside
    // that window resolves an anchor the user has already scrolled past
    // (observed: the cars scrub yanked 1887px backwards mid-flick).
    if (!viewportChanged && performance.now() >= state.reflowUntil) return;

    if (!state.anchor) return;
    const target = resolveAnchor(state.anchor);
    if (target === null || Math.abs(target - window.scrollY) < 2) return;

    // Suppress anchor recapture from the scroll events this correction
    // emits — the logical anchor hasn't moved.
    state.restoring = true;
    scrollToInstant(target, lenis);
    requestAnimationFrame(() => {
        state.restoring = false;
    });
}

/**
 * Keeps the page anchored to the same logical position across viewport
 * resizes — resizing should feel like resizing a picture, not scrolling.
 *
 * Section heights are all vh-based, so any real viewport change rescales the
 * whole scroll space and a raw pixel scrollY lands somewhere else entirely
 * (worst case: rotating out of the landscape cars view). The anchor
 * (section + progress through its scrollable range) is captured continuously
 * while scrolling — at resize time the layout has already changed, so it
 * cannot be derived after the fact — and restored when the viewport changes.
 *
 * Restores trigger from BOTH the window resize event and a ResizeObserver on
 * <body>: breakpoint flips reflow via React re-renders that land a frame or
 * more AFTER the last resize event (verified: the history section collapses
 * 640vh with no further resize event, stranding scrollY past its new
 * bottom). The observer fires after every layout with fresh geometry, so a
 * document resize that comes with no viewport change is only honoured while
 * a resize is still cascading — otherwise it is ordinary content resizing
 * (pinning sections, content-visibility subtrees) and must not move a
 * scrolling user.
 *
 * iOS toolbar show/hide fires resize too, but only changes innerHeight —
 * the document's scrollHeight (lvh-derived) stays put, so those events are
 * ignored: re-anchoring on them would fight the user's scroll mid-gesture.
 */
export function useResizeScrollAnchor(): void {
    const lenis = useLenis();

    useEffect(() => {
        const state: AnchorState = {
            anchor: null,
            lastInnerWidth: window.innerWidth,
            lastInnerHeight: window.innerHeight,
            lastScrollHeight: document.documentElement.scrollHeight,
            restoring: false,
            turbulentUntil: 0,
            reflowUntil: 0,
        };
        let captureRaf: number | undefined;

        const capture = () => {
            captureRaf = undefined;
            if (state.restoring || performance.now() < state.turbulentUntil) return;
            state.anchor = captureAnchor();
            state.lastInnerWidth = window.innerWidth;
            state.lastInnerHeight = window.innerHeight;
            state.lastScrollHeight = document.documentElement.scrollHeight;
        };

        const scheduleCapture = () => {
            if (captureRaf !== undefined) return;
            captureRaf = requestAnimationFrame(capture);
        };

        const handleResize = () => handleViewportResize(state, lenis);

        // Disable the browser's own scroll anchoring while mounted — it
        // compensates late sub-layouts on top of our restores, and the two
        // systems stacking produces drift.
        const previousOverflowAnchor = document.documentElement.style.overflowAnchor;
        document.documentElement.style.overflowAnchor = "none";

        const bodyObserver = new ResizeObserver(handleResize);
        bodyObserver.observe(document.body);

        capture();
        window.addEventListener("scroll", scheduleCapture, { passive: true });
        window.addEventListener("resize", handleResize, { passive: true });

        return () => {
            if (captureRaf !== undefined) cancelAnimationFrame(captureRaf);
            bodyObserver.disconnect();
            document.documentElement.style.overflowAnchor = previousOverflowAnchor;
            window.removeEventListener("scroll", scheduleCapture);
            window.removeEventListener("resize", handleResize);
        };
    }, [lenis]);
}
