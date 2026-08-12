import { useState, useEffect } from "react";
import { getShaderNoiseTexture } from "@paper-design/shaders";

/**
 * Ensures the noise texture used by @paper-design/shaders is decoded and cached
 * before any shader component tries to consume it.
 *
 * ### Why this is needed
 *
 * `getShaderNoiseTexture()` creates a `new Image()` with a base64 data-URI src
 * and returns it immediately. On Chrome the base64 decode is synchronous, so
 * `image.complete === true` right away. On **iOS Safari** and **Firefox** the
 * decode is *asynchronous* — `image.complete` may still be `false` when the
 * library's `ShaderMount` constructor checks it, causing a thrown error that
 * silently prevents the WebGL shader from ever initialising (no retry mechanism).
 *
 * By calling `getShaderNoiseTexture()` early and waiting for `img.decode()`,
 * the browser caches the decoded data URI. Every subsequent `new Image()` the
 * library creates with the same src will be instantly `complete`.
 */

let _decoded = false;
let _decodePromise: Promise<void> | null = null;

function ensureNoiseTextureDecoded(): Promise<void> {
    if (_decoded) return Promise.resolve();
    if (_decodePromise) return _decodePromise;

    if (globalThis.window === undefined) {
        return Promise.resolve();
    }

    const img = getShaderNoiseTexture();

    if (!img) {
        _decoded = true;
        return Promise.resolve();
    }

    if (img.complete && img.naturalWidth > 0) {
        _decoded = true;
        return Promise.resolve();
    }

    _decodePromise = new Promise<void>((resolve) => {
        const done = () => {
            _decoded = true;
            resolve();
        };

        // img.decode() is the modern API — returns a promise that resolves once
        // the image data has been fully decoded and is ready for rendering.
        if (typeof img.decode === "function") {
            img.decode().then(done).catch(done);
        } else {
            img.onload = done;
            img.onerror = done;
        }
    });

    return _decodePromise;
}

// Eagerly kick off decoding at module-load time so the cache is warm
// by the time any component mounts.
if (globalThis.window !== undefined) {
    ensureNoiseTextureDecoded();
}

/**
 * Returns `true` once the shader noise texture has been decoded and cached by
 * the browser. Shader components should not mount until this returns `true`.
 */
export function useShaderReady(): boolean {
    // Always start `false` so server and client agree on the initial render.
    // The useEffect below will flip to `true` after hydration once decoding is
    // confirmed, avoiding a hydration mismatch (server renders null, but the
    // client would render the <canvas> if we initialised from `_decoded`).
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (_decoded) {
            setReady(true);
            return;
        }

        let cancelled = false;
        ensureNoiseTextureDecoded().then(() => {
            if (!cancelled) setReady(true);
        });

        return () => {
            cancelled = true;
        };
    }, []);

    return ready;
}
