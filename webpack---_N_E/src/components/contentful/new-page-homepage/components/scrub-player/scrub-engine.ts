export type ScrubEngine = "fsv" | "video";

let cachedResult: Promise<ScrubEngine> | null = null;

/**
 * Detects which scrub engine to use.
 * Result is module-cached after the first call.
 *
 * Detection order:
 *   1. ?scrubEngine= query string or localStorage["scrub-engine"] override (QA)
 *   2. WebCodecs availability (VideoDecoder + EncodedVideoChunk)
 *   3. WebGL2 canvas probe
 *   4. VideoDecoder.isConfigSupported for the AVC profile we actually ship
 *      (codec string "avc1.640029" = High L4.1). `encode-videos.mjs` encodes
 *      every scrub/fsv stream with `-profile:v high -level 4.1` (verified with
 *      ffprobe: profile=High, level=41), so probing Baseline here used to let a
 *      browser that only supports Baseline pick "fsv", then fail to decode the
 *      High-profile stream and demote to the slow <video> path mid-experience.
 * Any failure falls through to "video".
 */
export function detectScrubEngine(): Promise<ScrubEngine> {
    if (cachedResult !== null) return cachedResult;
    cachedResult = _detect();
    return cachedResult;
}

async function _detect(): Promise<ScrubEngine> {
    try {
        // QA override via query string takes highest priority.
        if (typeof window !== "undefined") {
            const override =
                new URLSearchParams(window.location.search).get("scrubEngine") ??
                localStorage.getItem("scrub-engine");
            if (override === "fsv" || override === "video") return override;
        }

        // WebCodecs must be available (VideoDecoder + EncodedVideoChunk).
        if (typeof VideoDecoder === "undefined" || typeof EncodedVideoChunk === "undefined") {
            return "video";
        }

        // WebGL2 probe: Renderer requires it.
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl2");
        if (!gl) return "video";
        const ext = gl.getExtension("WEBGL_lose_context");
        ext?.loseContext();

        // Confirm the browser can actually decode our AVC codec — H.264 High
        // profile, level 4.1 (the profile encode-videos.mjs ships). 1920×1080
        // is a representative decode probe; the desktop streams are larger but
        // any decoder that handles High@L4.1 at 1080p handles our content.
        const support = await VideoDecoder.isConfigSupported({
            codec: "avc1.640029",
            codedWidth: 1920,
            codedHeight: 1080,
        });
        if (!support.supported) return "video";

        return "fsv";
    } catch {
        return "video";
    }
}
