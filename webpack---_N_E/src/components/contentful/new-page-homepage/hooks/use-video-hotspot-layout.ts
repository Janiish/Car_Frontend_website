import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

export type VideoLayoutMetrics = {
    renderedW: number;
    renderedH: number;
    offsetX: number;
    offsetY: number;
    scale: number;
};

function computeMetrics(ratio: number, baselineW: number | null): VideoLayoutMetrics {
    const vw = typeof window === "undefined" ? 1920 : window.innerWidth;
    const vh = typeof window === "undefined" ? 1080 : window.innerHeight;
    const screenRatio = vw / vh;

    let renderedW: number;
    let renderedH: number;

    if (screenRatio > ratio) {
        renderedW = vw;
        renderedH = vw / ratio;
    } else {
        renderedH = vh;
        renderedW = vh * ratio;
    }

    const bw = baselineW ?? renderedW;

    return {
        renderedW,
        renderedH,
        offsetX: (renderedW - vw) / 2,
        offsetY: (renderedH - vh) / 2,
        scale: renderedW / bw,
    };
}

/**
 * Computes screen-space pixel position for a hotspot given its percentage
 * coordinates and the current layout metrics.
 */
export function getHotspotStyle(
    xPct: number,
    yPct: number,
    metrics: VideoLayoutMetrics
): React.CSSProperties {
    const screenX = (xPct / 100) * metrics.renderedW - metrics.offsetX;
    const screenY = (yPct / 100) * metrics.renderedH - metrics.offsetY;
    return {
        left: `${screenX}px`,
        top: `${screenY}px`,
    };
}

/**
 * Sizes videos/canvases to cover the viewport on every resize. Returns a
 * `relayout` callback and the current layout metrics for inline
 * hotspot positioning via `getHotspotStyle`.
 *
 * The map value type is `HTMLElement` to accommodate both <video> (video backend)
 * and <canvas> (FSV backend) elements.
 */
export function useVideoHotspotLayout(
    videoRatio: number,
    videoRefs: RefObject<Map<string, HTMLElement>>,
    viewportContainerRef: RefObject<HTMLDivElement | null>,
    enabled = true
) {
    const ratioRef = useRef(videoRatio);
    ratioRef.current = videoRatio;
    const baselineWRef = useRef<number | null>(null);
    const layoutRef = useRef<(() => void) | null>(null);
    const [metrics, setMetrics] = useState<VideoLayoutMetrics>(() =>
        computeMetrics(videoRatio, null)
    );

    useEffect(() => {
        if (!enabled) {
            // Clear previously applied inline cover-fit styles so the elements'
            // own CSS (width/height 100%, object-fit: cover) owns layout again —
            // this is what keeps the mobile container portrait-video ready.
            videoRefs.current?.forEach((el) => {
                el.style.position = "";
                el.style.top = "";
                el.style.left = "";
                el.style.transform = "";
                el.style.width = "";
                el.style.height = "";
                el.style.maxWidth = "";
                el.style.maxHeight = "";
            });
            layoutRef.current = null;
            return;
        }

        function layout() {
            const m = computeMetrics(ratioRef.current, baselineWRef.current);

            baselineWRef.current ??= m.renderedW;

            const w = `${m.renderedW}px`;
            const h = `${m.renderedH}px`;

            videoRefs.current?.forEach((el) => {
                el.style.position = "absolute";
                el.style.top = "50%";
                el.style.left = "50%";
                el.style.transform = "translate(-50%, -50%)";
                el.style.width = w;
                el.style.height = h;
                el.style.maxWidth = "none";
                el.style.maxHeight = "none";
            });

            setMetrics(m);
        }

        let rafId: number | undefined;
        const handleResize = () => {
            if (rafId !== undefined) return;
            rafId = requestAnimationFrame(() => {
                layout();
                rafId = undefined;
            });
        };

        layoutRef.current = layout;
        layout();
        window.addEventListener("resize", handleResize, { passive: true });
        return () => {
            window.removeEventListener("resize", handleResize);
            if (rafId !== undefined) cancelAnimationFrame(rafId);
            layoutRef.current = null;
        };
    }, [videoRefs, viewportContainerRef, enabled]);

    const relayout = useCallback(() => {
        layoutRef.current?.();
    }, []);

    return { relayout, metrics };
}
