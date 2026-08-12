import { useEffect, useRef, useState } from "react";
import { Box } from "@project/ui";
import type { AnimationItem, LottiePlayer } from "lottie-web";
import loaderAnimation from "@/assets/lottie/loader.json";

/**
 * lottie-web is the only heavy dependency here, so we keep it in its own async
 * chunk — but the SVG-only "light" build (~46KB gzip vs ~75KB for the full
 * player). Our loader JSON is baked to pure vector paths with no effects or
 * expressions, so the light build renders it identically.
 *
 * The promise is module-scoped so both loaders (page-intro + cars-switch) share
 * a single download, and it's warmed on the client the moment this module
 * evaluates (during hydration) instead of waiting for a mount effect — so the
 * chunk downloads in parallel with the rest of the page rather than after it.
 * The `window` guard keeps it off the SSR path (lottie touches `document`).
 */
let lottiePromise: Promise<LottiePlayer> | null = null;
function loadLottie(): Promise<LottiePlayer> {
    lottiePromise ??= import("lottie-web/build/player/lottie_light").then((m) => m.default);
    return lottiePromise;
}
if (typeof window !== "undefined") {
    void loadLottie();
}

/** Representative frame shown when motion is reduced (logo fully drawn in). */
const STATIC_FRAME = 30;

/** Default playback rate — 1 = the animation's authored (native) speed. */
const DEFAULT_SPEED = 1;

type LoaderLottieProps = {
    /**
     * Square box size in px — the animation scales to fill it (page loader ~200,
     * cars loader ~120). Pure vectors, so any size stays crisp.
     */
    size: number;
    /**
     * Playback rate multiplier applied on top of the authored timeline.
     * 1 = native speed, 2 = twice as fast, 0.5 = half speed. Defaults to 1.
     */
    speed?: number;
    /** When true, render a single static frame instead of looping (reduced motion). */
    static?: boolean;
    /** Forwarded chakra sx for positioning tweaks. */
    sx?: React.ComponentProps<typeof Box>["sx"];
};

function initAnimation(
    container: HTMLDivElement,
    animationData: unknown,
    lottie: LottiePlayer,
    staticFrame: boolean,
    speed: number
): AnimationItem {
    const anim = lottie.loadAnimation({
        container,
        animationData,
        renderer: "svg",
        // The loop is authored into the animation timeline itself, so we let
        // lottie play it natively rather than driving frames by hand.
        loop: !staticFrame,
        autoplay: !staticFrame,
        rendererSettings: {
            // Vector paths only (effects were baked out of the JSON), so the SVG
            // scales crisply at any DPI. These flags keep lottie from doing extra
            // work / softening: no progressive loading, and hint the browser to
            // favour geometric precision over speed when rasterising edges.
            progressiveLoad: false,
            preserveAspectRatio: "xMidYMid meet",
            className: "loader-lottie-svg",
        },
    });
    // setSpeed multiplies the authored frame rate, so the loop stays seamless
    // (unlike remapping frames by hand). Skip it for the static frame.
    if (staticFrame) {
        anim.goToAndStop(STATIC_FRAME, true);
    } else if (speed !== 1) {
        anim.setSpeed(speed);
    }
    return anim;
}

/**
 * Shared lottie-web wrapper for the homepage loaders (page-intro + cars-switch).
 * The animation JSON is inlined into the bundle (~1.7KB gzipped once baked to
 * plain vectors), so there's no round-trip for the data. Only the lottie player
 * stays in its own async chunk, warmed at module-eval (see `loadLottie`).
 *
 * While that chunk downloads, a CSS-only pulsing ring placeholder renders
 * immediately from SSR markup so throttled connections never show a bare black
 * screen. The placeholder hides once lottie paints its first frame.
 */
const LoaderLottie = ({
    size,
    speed = DEFAULT_SPEED,
    static: staticFrame = false,
    sx,
}: LoaderLottieProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<AnimationItem | null>(null);
    const [lottieReady, setLottieReady] = useState(false);

    useEffect(() => {
        let cancelled = false;

        loadLottie().then((lottie) => {
            if (cancelled || !containerRef.current) return;
            const anim = initAnimation(
                containerRef.current,
                loaderAnimation,
                lottie,
                staticFrame,
                speed
            );
            animationRef.current = anim;
            setLottieReady(true);
        });

        return () => {
            cancelled = true;
            animationRef.current?.destroy();
            animationRef.current = null;
        };
    }, [staticFrame, speed]);

    return (
        <Box
            position="relative"
            width={`${size}px`}
            height={`${size}px`}
            aria-hidden="true"
            sx={{
                "& .loader-lottie-svg": {
                    display: "block",
                    width: "100%",
                    height: "100%",
                    // Favour geometric accuracy + full anti-aliasing on the vector
                    // edges. We deliberately do NOT set `image-rendering:
                    // -webkit-optimize-contrast` here — that hint only affects
                    // *raster* scaling and Chrome treats it like `crisp-edges`
                    // (nearest-neighbour), which makes edges look pixelated whenever
                    // the SVG is rasterised onto a GPU layer.
                    shapeRendering: "geometricPrecision",
                    // lottie-web stamps `transform: translate3d(0,0,0)` on the root
                    // svg, which GPU-promotes it and softens edges when scaled
                    // (e.g. the exit `scale`). Vectors re-rasterise crisply without it.
                    transform: "none !important",
                },
                ...sx,
            }}
        >
            {!lottieReady && (
                <Box
                    position="absolute"
                    inset="0"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        "@keyframes loaderPulse": {
                            "0%, 100%": { opacity: 0.25, transform: "scale(0.92)" },
                            "50%": { opacity: 0.6, transform: "scale(1)" },
                        },
                    }}
                >
                    <Box
                        borderRadius="50%"
                        border="2px solid"
                        borderColor="whiteAlpha.300"
                        width="40%"
                        height="40%"
                        sx={{ animation: "loaderPulse 2s ease-in-out infinite" }}
                    />
                </Box>
            )}
            <Box ref={containerRef} position="absolute" inset="0" />
        </Box>
    );
};

LoaderLottie.displayName = "LoaderLottie";

export { LoaderLottie };
