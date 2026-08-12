import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import { chakra } from "@project/ui";
import type { ScrubPlayerHandle, ScrubPlayerProps } from "./types";
import { addPlayer, postToWorker, removePlayer, type WorkerInbound } from "./fsv-worker-client";
import { clamp01, quantizeFrame } from "./utils/scrub-math";
import { useLatestRef } from "../../hooks/use-latest-ref";
import { useScrubLoop } from "../../hooks/use-scrub-loop";

type FsvWorkerBackendProps = ScrubPlayerProps & {
    /** Called when the worker reports a fatal error — caller demotes to another backend. */
    onInitError: () => void;
};

function getMaxPixelDimensions(): { w: number; h: number } | null {
    if (typeof window === "undefined") return null;
    const dpr = window.devicePixelRatio || 1;
    return { w: Math.round(window.innerWidth * dpr), h: Math.round(window.innerHeight * dpr) };
}

// A canvas can only have its control transferred to an offscreen once, ever.
// Track which canvases have been transferred so React StrictMode's double-mount
// (and any re-run of the init effect) never attempts a second transfer.
const transferredCanvases = new WeakSet<HTMLCanvasElement>();
const SNAPSHOT_TIMEOUT_MS = 300;

let nextPlayerId = 0;

const FsvWorkerBackend = forwardRef<ScrubPlayerHandle, FsvWorkerBackendProps>(
    function FsvWorkerBackend(
        {
            sources,
            load = "auto",
            loadMode = "stream",
            initialLoop,
            onReady,
            onFirstFrame,
            onInitError,
            needsSnapshot = false,
        },
        ref
    ) {
        const canvasRef = useRef<HTMLCanvasElement>(null);
        const idRef = useRef<string>("");
        if (idRef.current === "") idRef.current = `fsv-${nextPlayerId++}`;
        // The fsv url last sent to the worker for this (already-transferred) canvas,
        // so a source change reloads in place instead of leaking a new context.
        const registeredUrlRef = useRef<string | null>(null);
        // Resolver for an in-flight captureFrame() awaiting the worker's snapshot.
        const pendingSnapshotRef = useRef<((b: ImageBitmap | null) => void) | null>(null);

        // Mirrored state for synchronous handle reads (no round-trip to the worker).
        const isReadyRef = useRef(false);
        const hasRenderedFrameRef = useRef(false);
        const fpsRef = useRef(30);
        const frameCountRef = useRef(0);
        const durationSecRef = useRef(0);
        const lastTargetSecRef = useRef(0);
        // Dedup: skip postMessage when the quantized frame index hasn't changed.
        const lastSentFrameRef = useRef(-1);

        const onReadyFiredRef = useRef(false);
        const onReadyRef = useLatestRef(onReady);
        const onFirstFrameRef = useLatestRef(onFirstFrame);
        const onInitErrorRef = useLatestRef(onInitError);
        const initialLoopRef = useLatestRef(initialLoop);

        function postSeekFrame(seconds: number) {
            const index = quantizeFrame(seconds, fpsRef.current, frameCountRef.current);
            if (index === lastSentFrameRef.current) return;
            lastSentFrameRef.current = index;
            postToWorker({ type: "seekFrame", id: idRef.current, index });
        }

        const loopOnTarget = useCallback((seconds: number) => {
            lastTargetSecRef.current = seconds;
            postSeekFrame(seconds);
        }, []); // eslint-disable-line react-hooks/exhaustive-deps
        const { start: startLoop, stop: stopLoop } = useScrubLoop(
            loopOnTarget,
            () => isReadyRef.current
        );

        // Snapshot the current frame via the worker (for the tab-switch
        // cross-dissolve). Supersedes any capture still in flight and resolves
        // null if the worker doesn't answer in time.
        function captureFrameImpl(): Promise<ImageBitmap | null> {
            if (!isReadyRef.current) return Promise.resolve(null);
            const prev = pendingSnapshotRef.current;
            if (prev) {
                pendingSnapshotRef.current = null;
                prev(null);
            }
            return new Promise<ImageBitmap | null>((resolve) => {
                pendingSnapshotRef.current = resolve;
                postToWorker({ type: "snapshot", id: idRef.current });
                setTimeout(() => {
                    if (pendingSnapshotRef.current === resolve) {
                        pendingSnapshotRef.current = null;
                        resolve(null);
                    }
                }, SNAPSHOT_TIMEOUT_MS);
            });
        }

        useImperativeHandle(
            ref,
            () => ({
                seekToTime(seconds: number) {
                    stopLoop();
                    lastTargetSecRef.current = Math.max(0, seconds);
                    if (isReadyRef.current) postSeekFrame(seconds);
                },
                seekToProgress(p: number) {
                    stopLoop();
                    const clamped = clamp01(p);
                    lastTargetSecRef.current = clamped * durationSecRef.current;
                    if (isReadyRef.current) postSeekFrame(clamped * durationSecRef.current);
                },
                getCurrentTime() {
                    return isReadyRef.current ? lastTargetSecRef.current : null;
                },
                getDuration() {
                    return durationSecRef.current > 0 ? durationSecRef.current : null;
                },
                isReady() {
                    return isReadyRef.current;
                },
                hasRenderedFrame() {
                    return hasRenderedFrameRef.current;
                },
                startLoop(range: { from: number; to: number }) {
                    startLoop(range);
                },
                stopLoop() {
                    stopLoop();
                },
                reset() {
                    stopLoop();
                    hasRenderedFrameRef.current = false;
                    lastTargetSecRef.current = 0;
                    lastSentFrameRef.current = -1;
                    postToWorker({ type: "reset", id: idRef.current });
                },
                captureFrame() {
                    return captureFrameImpl();
                },
                get element() {
                    return canvasRef.current;
                },
            }),
            [] // eslint-disable-line react-hooks/exhaustive-deps
        );

        useEffect(() => {
            const canvas = canvasRef.current;
            if (!canvas || !sources.fsv) return;
            const id = idRef.current;

            const handleMessage = (msg: WorkerInbound) => {
                if (msg.type === "ready") {
                    fpsRef.current = msg.fps;
                    frameCountRef.current = msg.frameCount;
                    durationSecRef.current = msg.durationUs / 1e6;
                    isReadyRef.current = true;
                    if (!onReadyFiredRef.current) {
                        onReadyFiredRef.current = true;
                        onReadyRef.current?.();
                    }
                    if (initialLoopRef.current) startLoop(initialLoopRef.current);
                } else if (msg.type === "firstFrame") {
                    hasRenderedFrameRef.current = true;
                    onFirstFrameRef.current?.();
                } else if (msg.type === "snapshot") {
                    const resolve = pendingSnapshotRef.current;
                    pendingSnapshotRef.current = null;
                    resolve?.(msg.bitmap);
                } else if (msg.type === "error") {
                    onInitErrorRef.current();
                }
            };

            addPlayer(id, handleMessage);

            // Transfer once per canvas. On the first registration we transfer the
            // offscreen; if the source later changes for the same (already-transferred)
            // canvas, reload in place so the worker reuses the same WebGL context.
            if (!transferredCanvases.has(canvas)) {
                transferredCanvases.add(canvas);
                const offscreen = canvas.transferControlToOffscreen();
                const dims = getMaxPixelDimensions();
                postToWorker(
                    {
                        type: "register",
                        id,
                        offscreen,
                        fsvUrl: sources.fsv,
                        loadMode,
                        preserveDrawingBuffer: needsSnapshot,
                        maxPixelWidth: dims?.w,
                        maxPixelHeight: dims?.h,
                    },
                    [offscreen]
                );
                registeredUrlRef.current = sources.fsv;
            } else if (registeredUrlRef.current !== sources.fsv) {
                postToWorker({ type: "reload", id, fsvUrl: sources.fsv, loadMode });
                registeredUrlRef.current = sources.fsv;
                isReadyRef.current = false;
                onReadyFiredRef.current = false;
                lastSentFrameRef.current = -1;
            }

            return () => {
                // Keep the worker + offscreen alive for the page session (bounded,
                // ≤ a handful of players). Just stop receiving messages here.
                removePlayer(id);
                postToWorker({ type: "dispose", id });
            };
        }, [sources.fsv, loadMode]); // eslint-disable-line react-hooks/exhaustive-deps

        // load "auto" → decode/buffer; "none" → free decoder (keep offscreen).
        useEffect(() => {
            if (!sources.fsv) return;
            postToWorker({ type: load === "auto" ? "load" : "free", id: idRef.current });
            if (load === "none") {
                isReadyRef.current = false;
                onReadyFiredRef.current = false;
            }
        }, [load, sources.fsv]);

        useEffect(() => () => stopLoop(), []); // eslint-disable-line react-hooks/exhaustive-deps

        return (
            <chakra.canvas
                ref={canvasRef}
                aria-hidden="true"
                width="full"
                height="full"
                objectFit="cover"
                objectPosition="center"
                display="block"
            />
        );
    }
);

FsvWorkerBackend.displayName = "FsvWorkerBackend";

export { FsvWorkerBackend };
