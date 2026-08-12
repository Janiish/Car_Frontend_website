import { forwardRef, lazy, Suspense, useImperativeHandle, useRef, useState } from "react";
// eslint-disable-next-line no-restricted-imports
import type { HTMLChakraProps } from "@chakra-ui/react";
import { Box } from "@project/ui";
import { useScrubEngine } from "./use-scrub-engine";
import { supportsOffscreenWorker } from "./fsv-worker-client";
import type { ScrubPlayerHandle, ScrubPlayerProps } from "./types";

const LazyVideoBackend = lazy(() =>
    import("./video-backend").then((m) => ({ default: m.VideoBackend }))
);
const LazyFsvBackend = lazy(() => import("./fsv-backend").then((m) => ({ default: m.FsvBackend })));
const LazyFsvWorkerBackend = lazy(() =>
    import("./fsv-worker-backend").then((m) => ({ default: m.FsvWorkerBackend }))
);

type ScrubPlayerComponentProps = ScrubPlayerProps & HTMLChakraProps<"div">;

// QA override (query string or localStorage["scrub-engine"]):
//   "fsv-worker" → force the OffscreenCanvas Web Worker backend
//   "fsv-main"   → force the main-thread fsv backend
let _scrubOverrideCache: string | null | undefined;
function readScrubOverride(): string | null {
    if (_scrubOverrideCache !== undefined) return _scrubOverrideCache;
    if (typeof window === "undefined") return null;
    const fromQuery = new URLSearchParams(window.location.search).get("scrubEngine");
    _scrubOverrideCache =
        fromQuery ??
        (typeof localStorage !== "undefined" ? localStorage.getItem("scrub-engine") : null);
    return _scrubOverrideCache;
}

/**
 * Whether to use the Web Worker backend. Defaults to ON in production and OFF in
 * development: the Next dev server compiles the worker chunk on-demand and can't
 * hot-update a Web Worker, so it issues a full page reload when the worker is
 * first needed (on scroll into a scrub section). With an HMR-blocking extension
 * or a stale service worker that reload recurs via scroll restoration → an
 * infinite refresh loop. The main-thread fsv backend is HMR-friendly and visually
 * identical for dev. Force the worker in dev with `?scrubEngine=fsv-worker`.
 */
function shouldUseWorker(): boolean {
    const override = readScrubOverride();
    if (override === "fsv-worker") return true;
    if (override === "fsv-main") return false;
    return process.env.NODE_ENV === "production";
}

/**
 * Unified scrub-video player. Renders an identical SSR/first-render shell until
 * the engine is detected client-side, then mounts the best available backend:
 *
 *   1. fsv in a Web Worker (OffscreenCanvas) — decode/paint off the main thread
 *      (production by default; see shouldUseWorker for the dev caveat)
 *   2. fsv on the main thread — worker disabled (dev default), OffscreenCanvas
 *      unavailable, or the worker reported a fatal error
 *   3. plain <video> — if WebCodecs/WebGL2 is unavailable, or fsv failed
 *
 * Demotion cascades 1 → 2 → 3 via onInitError. The `ScrubPlayerHandle` is the
 * same across all three, so consumers never branch.
 */
const ScrubPlayer = forwardRef<ScrubPlayerHandle, ScrubPlayerComponentProps>(function ScrubPlayer(
    {
        sources,
        load = "auto",
        loadMode = "stream",
        initialLoop,
        onReady,
        onFirstFrame,
        needsSnapshot,
        ...boxProps
    },
    ref
) {
    const engine = useScrubEngine();

    const [demotedFromWorker, setDemotedFromWorker] = useState(false);
    const [demotedFromFsv, setDemotedFromFsv] = useState(false);

    const workerHandleRef = useRef<ScrubPlayerHandle>(null);
    const fsvHandleRef = useRef<ScrubPlayerHandle>(null);
    const videoHandleRef = useRef<ScrubPlayerHandle>(null);

    const fsvCapable = engine === "fsv" && !!sources.fsv;
    const useWorker =
        fsvCapable && !demotedFromWorker && supportsOffscreenWorker() && shouldUseWorker();
    const useMainFsv = fsvCapable && !useWorker && !demotedFromFsv;

    function activeBackend(): ScrubPlayerHandle {
        if (useWorker) return workerHandleRef.current ?? noopHandle;
        if (useMainFsv) return fsvHandleRef.current ?? noopHandle;
        return videoHandleRef.current ?? noopHandle;
    }

    useImperativeHandle(
        ref,
        () => ({
            seekToTime(s: number) {
                activeBackend().seekToTime(s);
            },
            seekToProgress(p: number) {
                activeBackend().seekToProgress(p);
            },
            getCurrentTime() {
                return activeBackend().getCurrentTime();
            },
            getDuration() {
                return activeBackend().getDuration();
            },
            isReady() {
                return activeBackend().isReady();
            },
            hasRenderedFrame() {
                return activeBackend().hasRenderedFrame();
            },
            startLoop(range: { from: number; to: number }) {
                activeBackend().startLoop(range);
            },
            stopLoop() {
                activeBackend().stopLoop();
            },
            reset() {
                activeBackend().reset();
            },
            captureFrame() {
                return activeBackend().captureFrame();
            },
            get element() {
                return activeBackend().element;
            },
        }),
        // Re-bind when the active backend switches (engine resolve or demotion).
        [useWorker, useMainFsv] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const sharedProps: ScrubPlayerProps = {
        sources,
        load,
        loadMode,
        initialLoop,
        onReady,
        onFirstFrame,
        needsSnapshot,
    };

    // Shell renders on SSR and first client paint before the engine resolves.
    // position: relative so the backend's full-size canvas/video is contained.
    if (engine === null) {
        return <Box position="relative" width="full" height="full" {...boxProps} />;
    }

    if (useWorker) {
        return (
            <Box position="relative" width="full" height="full" {...boxProps}>
                <Suspense>
                    <LazyFsvWorkerBackend
                        ref={workerHandleRef}
                        {...sharedProps}
                        onInitError={() => setDemotedFromWorker(true)}
                    />
                </Suspense>
            </Box>
        );
    }

    if (useMainFsv) {
        return (
            <Box position="relative" width="full" height="full" {...boxProps}>
                <Suspense>
                    <LazyFsvBackend
                        ref={fsvHandleRef}
                        {...sharedProps}
                        onInitError={() => setDemotedFromFsv(true)}
                    />
                </Suspense>
            </Box>
        );
    }

    return (
        <Box position="relative" width="full" height="full" {...boxProps}>
            <Suspense>
                {/* Keyed by source: the <video> backend has no reload-in-place
                    path, so a source change must remount it. */}
                <LazyVideoBackend key={sources.mp4} ref={videoHandleRef} {...sharedProps} />
            </Suspense>
        </Box>
    );
});

ScrubPlayer.displayName = "ScrubPlayer";

export { ScrubPlayer };

// ---------------------------------------------------------------------------
// No-op handle — used before a backend mounts / binds its ref
// ---------------------------------------------------------------------------

const noopHandle: ScrubPlayerHandle = {
    seekToTime() {},
    seekToProgress() {},
    getCurrentTime: () => null,
    getDuration: () => null,
    isReady: () => false,
    hasRenderedFrame: () => false,
    startLoop() {},
    stopLoop() {},
    reset() {},
    captureFrame: () => Promise.resolve(null),
    element: null,
};
