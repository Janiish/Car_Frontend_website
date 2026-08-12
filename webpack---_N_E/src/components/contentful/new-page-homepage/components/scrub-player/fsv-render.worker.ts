// Dedicated Web Worker: decodes + paints fsv videos onto transferred
// OffscreenCanvases, off the main thread. One worker instance serves every
// scrub player (garage + cars tabs), keyed by `id`.
//
// The main thread owns all control logic (scroll→target mapping, loop timing)
// and posts target frames/progress here; this worker only does the expensive
// WebCodecs decode + WebGL paint, so the scroll thread never blocks.
//
// fsv's browser entry is worker-safe: the Renderer only touches `document` when
// no canvas is passed, and we always pass the transferred OffscreenCanvas.
import { Renderer } from "@plutotcool/fsv";
import { clamp01, deriveFps } from "./utils/scrub-math";

type LoadMode = "full" | "stream";

type WorkerMessage =
    | {
          type: "register";
          id: string;
          offscreen: OffscreenCanvas;
          fsvUrl: string;
          loadMode?: LoadMode;
          preserveDrawingBuffer?: boolean;
          maxPixelWidth?: number;
          maxPixelHeight?: number;
      }
    | { type: "load"; id: string }
    | { type: "free"; id: string }
    | { type: "reload"; id: string; fsvUrl: string; loadMode?: LoadMode }
    | { type: "seekProgress"; id: string; p: number }
    | { type: "seekFrame"; id: string; index: number }
    | { type: "reset"; id: string }
    | { type: "snapshot"; id: string }
    | { type: "dispose"; id: string };

type PendingSeek = { type: "progress"; p: number } | { type: "frame"; index: number };

type Entry = {
    offscreen: OffscreenCanvas;
    renderer: Renderer | null;
    fsvUrl: string;
    loadMode: LoadMode;
    /** Bumped on free/dispose to cancel in-flight async load + frame polls. */
    gen: number;
    loaded: boolean;
    /** True while an async load is in flight — dedupes concurrent load messages
     * (e.g. React StrictMode's double-invoked effect) so the file isn't fetched twice. */
    loading: boolean;
    pollTimer: ReturnType<typeof setTimeout> | null;
    /** Coalesced seek target — only the latest one is rendered per drain tick. */
    pendingSeek: PendingSeek | null;
    drainScheduled: boolean;
};

const players = new Map<string, Entry>();
const ctx = self as unknown as {
    postMessage: (m: unknown, transfer?: Transferable[]) => void;
};

function post(message: Record<string, unknown>) {
    ctx.postMessage(message);
}

function clearPoll(entry: Entry) {
    if (entry.pollTimer !== null) {
        clearTimeout(entry.pollTimer);
        entry.pollTimer = null;
    }
}

function closeRenderer(entry: Entry) {
    clearPoll(entry);
    if (entry.renderer) {
        try {
            entry.renderer.close();
        } catch {
            // ignore
        }
        entry.renderer = null;
    }
    entry.loaded = false;
    entry.loading = false;
}

/**
 * Polls until the renderer has painted a frame, then posts `firstFrame`.
 *
 * `expectedIndex: null` accepts ANY painted frame — correct (and race-free)
 * after load/reload, where the renderer is freshly constructed and
 * `currentFrame` stays undefined until the first paint. Matching a specific
 * index there is wrong: the main thread starts seeking (intro loop, scrub)
 * as soon as `ready` posts, so on a slow decoder warm-up the first frame to
 * actually paint is often a later one — an exact-0 match then never fires
 * and the poster upstream never drops.
 *
 * After a reset the renderer still shows the previously drawn frame, so that
 * path passes the concrete target index instead. Bounded so a stalled decode
 * can't poll forever.
 */
function pollPainted(id: string, gen: number, expectedIndex: number | null, ticksLeft = 90) {
    const entry = players.get(id);
    if (!entry?.renderer || entry.gen !== gen) return;
    const current = entry.renderer.currentFrame;
    const painted = expectedIndex === null ? current !== undefined : current === expectedIndex;
    if (painted) {
        post({ type: "firstFrame", id });
        return;
    }
    if (ticksLeft <= 0) return;
    entry.pollTimer = setTimeout(() => pollPainted(id, gen, expectedIndex, ticksLeft - 1), 16);
}

/** ~10s at 16ms ticks — generous headroom for a cold decoder warm-up. */
const FIRST_PAINT_MAX_TICKS = 625;

async function handleLoad(id: string) {
    const entry = players.get(id);
    if (!entry || entry.loaded || entry.loading) return;
    entry.loading = true;
    const gen = entry.gen;
    try {
        // fsv types `canvas` as HTMLCanvasElement, but OffscreenCanvas works at
        // runtime (Renderer only calls canvas.getContext("webgl2"), which exists
        // on both). This is the whole point — rendering off the main thread.
        entry.renderer ??= new Renderer({
            canvas: entry.offscreen as unknown as HTMLCanvasElement,
        });
        const r = entry.renderer;
        if (entry.loadMode === "full") {
            await r.load(entry.fsvUrl);
        } else {
            const stream = await r.loadStream(entry.fsvUrl);
            await stream.loaded(1);
        }
        // A free/dispose during the await supersedes this load.
        if (entry.gen !== gen || entry.renderer !== r) return;

        const durationUs = r.duration ?? 0;
        const frameCount = r.length ?? 0;
        const fps = deriveFps(durationUs, frameCount);
        entry.loaded = true;
        entry.loading = false;
        r.set(0);
        post({ type: "ready", id, durationUs, frameCount, fps });
        pollPainted(id, gen, null, FIRST_PAINT_MAX_TICKS);
    } catch (err) {
        entry.loading = false;
        post({ type: "error", id, message: err instanceof Error ? err.message : String(err) });
    }
}

/**
 * Intercept OffscreenCanvas width/height setters so the fsv Renderer's internal
 * `draw()` — which sizes the canvas to the video's native resolution — is
 * transparently capped to the device's physical pixel size. The cap preserves
 * the video's aspect ratio. On subsequent frames, the setter calls are no-ops
 * (same value) so there is negligible overhead.
 */
function capCanvasResolution(offscreen: OffscreenCanvas, maxW: number, maxH: number) {
    const proto = Object.getPrototypeOf(offscreen) as OffscreenCanvas;
    const wDesc = Object.getOwnPropertyDescriptor(proto, "width");
    const hDesc = Object.getOwnPropertyDescriptor(proto, "height");
    if (!wDesc?.set || !hDesc?.set || !wDesc.get || !hDesc.get) return;

    const getW = wDesc.get;
    const setW = wDesc.set;
    const getH = hDesc.get;
    const setH = hDesc.set;

    let targetW = getW.call(offscreen) as number;
    let targetH = getH.call(offscreen) as number;

    function apply() {
        if (targetW <= 0 || targetH <= 0) return;
        let w = targetW;
        let h = targetH;
        if (w > maxW || h > maxH) {
            const scale = Math.min(maxW / w, maxH / h);
            w = Math.round(w * scale) || 1;
            h = Math.round(h * scale) || 1;
        }
        const curW = getW.call(offscreen) as number;
        const curH = getH.call(offscreen) as number;
        if (curW !== w) setW.call(offscreen, w);
        if (curH !== h) setH.call(offscreen, h);
    }

    Object.defineProperty(offscreen, "width", {
        get() {
            return getW.call(this) as number;
        },
        set(v: number) {
            targetW = v;
            apply();
        },
        configurable: true,
    });
    Object.defineProperty(offscreen, "height", {
        get() {
            return getH.call(this) as number;
        },
        set(v: number) {
            targetH = v;
            apply();
        },
        configurable: true,
    });
}

function handleRegister(msg: WorkerMessage & { type: "register" }) {
    if (msg.maxPixelWidth && msg.maxPixelHeight) {
        capCanvasResolution(msg.offscreen, msg.maxPixelWidth, msg.maxPixelHeight);
    }

    try {
        msg.offscreen.getContext("webgl2", {
            preserveDrawingBuffer: msg.preserveDrawingBuffer !== false,
        });
    } catch {
        // Snapshots may come back blank without it; the caller falls back to a dip.
    }
    players.set(msg.id, {
        offscreen: msg.offscreen,
        renderer: null,
        fsvUrl: msg.fsvUrl,
        loadMode: msg.loadMode ?? "stream",
        gen: 0,
        loaded: false,
        loading: false,
        pollTimer: null,
        pendingSeek: null,
        drainScheduled: false,
    });
}

function handleFree(id: string) {
    const entry = players.get(id);
    if (!entry) return;
    entry.gen++;
    closeRenderer(entry);
}

/**
 * Swaps the video source on an existing player, reusing the SAME OffscreenCanvas
 * (and therefore the same WebGL2 context — getContext returns the existing one),
 * so changing the active car never allocates a new context. Closes the old
 * renderer/decoder, then loads the new source.
 */
function handleReload(id: string, fsvUrl: string, loadMode?: LoadMode) {
    const entry = players.get(id);
    if (!entry || entry.fsvUrl === fsvUrl) return;
    entry.fsvUrl = fsvUrl;
    if (loadMode) entry.loadMode = loadMode;
    entry.gen++;
    closeRenderer(entry);
    void handleLoad(id);
}

function handleSeek(id: string, op: (r: Renderer) => void) {
    const entry = players.get(id);
    if (!entry?.renderer || !entry.loaded) return;
    try {
        op(entry.renderer);
    } catch {
        // ignore transient decode errors
    }
}

/**
 * Coalesces rapid-fire seek messages (one per scroll frame from the main thread)
 * into a single decode per drain tick. Only the most recent target is rendered,
 * so the worker never falls behind during fast scrolling.
 */
function enqueueSeek(id: string, seek: PendingSeek) {
    const entry = players.get(id);
    if (!entry?.renderer || !entry.loaded) return;
    entry.pendingSeek = seek;
    if (entry.drainScheduled) return;
    entry.drainScheduled = true;
    setTimeout(() => {
        entry.drainScheduled = false;
        const pending = entry.pendingSeek;
        if (!pending) return;
        entry.pendingSeek = null;
        if (pending.type === "progress") {
            handleSeek(id, (r) => r.progress(pending.p));
        } else {
            handleSeek(id, (r) => r.set(pending.index));
        }
    }, 0);
}

function handleReset(id: string) {
    const entry = players.get(id);
    if (!entry?.renderer || !entry.loaded) return;
    handleSeek(id, (r) => r.set(0));
    pollPainted(id, entry.gen, 0);
}

// Dispose reuses handleFree: both invalidate the generation counter and release
// the decoder/WebGL renderer while keeping the OffscreenCanvas entry alive
// (it's a one-shot transfer that can never be re-sent from the main thread).
const handleDispose = handleFree;

/**
 * Captures the currently painted frame as an ImageBitmap and ships it back to
 * the main thread (transferred). Used for the tab-switch cross-dissolve: the
 * caller paints this frozen frame over the canvas, swaps the source underneath,
 * then fades it out once the new frame lands. Posts a null bitmap if there's
 * nothing to capture so the caller can fall back to a plain fade.
 */
async function handleSnapshot(id: string) {
    const entry = players.get(id);
    if (!entry?.renderer || !entry.loaded) {
        ctx.postMessage({ type: "snapshot", id, bitmap: null });
        return;
    }
    try {
        const bitmap = await createImageBitmap(entry.offscreen);
        ctx.postMessage({ type: "snapshot", id, bitmap }, [bitmap]);
    } catch {
        ctx.postMessage({ type: "snapshot", id, bitmap: null });
    }
}

self.onmessage = (event: MessageEvent<WorkerMessage>) => {
    const msg = event.data;
    switch (msg.type) {
        case "register":
            handleRegister(msg);
            break;
        case "load":
            void handleLoad(msg.id);
            break;
        case "free":
            handleFree(msg.id);
            break;
        case "reload":
            handleReload(msg.id, msg.fsvUrl, msg.loadMode);
            break;
        case "seekProgress":
            enqueueSeek(msg.id, { type: "progress", p: clamp01(msg.p) });
            break;
        case "seekFrame":
            enqueueSeek(msg.id, { type: "frame", index: msg.index | 0 });
            break;
        case "reset":
            handleReset(msg.id);
            break;
        case "snapshot":
            void handleSnapshot(msg.id);
            break;
        case "dispose":
            handleDispose(msg.id);
            break;
    }
};
