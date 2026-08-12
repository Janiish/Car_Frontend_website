// Main-thread singleton client for the fsv render worker. One Worker instance
// serves every scrub player on the page; messages are routed back to each
// player by `id`. The worker is created lazily on first use and lives for the
// page session (never terminated) — this sidesteps React StrictMode teardown
// and the one-shot nature of transferControlToOffscreen.

export type WorkerInbound =
    | { type: "ready"; id: string; durationUs: number; frameCount: number; fps: number }
    | { type: "firstFrame"; id: string }
    | { type: "snapshot"; id: string; bitmap: ImageBitmap | null }
    | { type: "error"; id: string; message: string };

type Handler = (msg: WorkerInbound) => void;

let worker: Worker | null = null;
const handlers = new Map<string, Handler>();

function getWorker(): Worker {
    if (!worker) {
        worker = new Worker(new URL("./fsv-render.worker.ts", import.meta.url), {
            type: "module",
        });
        worker.addEventListener("message", (event: MessageEvent<WorkerInbound>) => {
            const msg = event.data;
            handlers.get(msg.id)?.(msg);
        });
        // A failed chunk fetch/parse or a top-level throw in the worker fires
        // `error` on the Worker object, not `message` — nothing above would
        // otherwise route it to a player. Since a worker boot failure affects
        // every registered player, fan the error out to all of them so each
        // can run its onInitError demotion path instead of staying blank.
        worker.addEventListener("error", (event: ErrorEvent) => {
            for (const [id, handler] of handlers) {
                handler({ type: "error", id, message: event.message || "fsv worker failed" });
            }
        });
        worker.addEventListener("messageerror", () => {
            for (const [id, handler] of handlers) {
                handler({
                    type: "error",
                    id,
                    message: "fsv worker message deserialization failed",
                });
            }
        });
    }
    return worker;
}

/** True when this browser can render fsv in a worker (OffscreenCanvas + transfer). */
export function supportsOffscreenWorker(): boolean {
    return (
        typeof Worker !== "undefined" &&
        typeof OffscreenCanvas !== "undefined" &&
        typeof HTMLCanvasElement !== "undefined" &&
        "transferControlToOffscreen" in HTMLCanvasElement.prototype
    );
}

/** Register a player's message handler. Call before posting `register`. */
export function addPlayer(id: string, handler: Handler): void {
    handlers.set(id, handler);
    getWorker();
}

export function removePlayer(id: string): void {
    handlers.delete(id);
}

/** Post a message to the worker, optionally transferring the OffscreenCanvas. */
export function postToWorker(message: Record<string, unknown>, transfer?: Transferable[]): void {
    getWorker().postMessage(message, transfer ?? []);
}
