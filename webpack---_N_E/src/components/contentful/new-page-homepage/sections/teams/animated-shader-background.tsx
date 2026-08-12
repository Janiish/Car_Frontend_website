import type { ShaderBackgroundProps } from "@project/ui";
import { ShaderBackground } from "@project/ui";
import { Component, memo, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

import { useAnimatedColors } from "@/hooks/use-animated-colors";
import { useShaderReady } from "@/hooks/use-shader-ready";
import { useHomepageBreakpoints, useHomepageMotionPref } from "../../homepage-responsive-context";

/**
 * Shader configuration type shared with the parent page component.
 */
export type TeamShaderConfig = Pick<
    ShaderBackgroundProps,
    | "colors"
    | "proportion"
    | "softness"
    | "distortion"
    | "swirl"
    | "swirlIterations"
    | "shape"
    | "shapeScale"
    | "speed"
    | "scale"
    | "rotation"
    | "offsetX"
    | "offsetY"
>;

type AnimatedShaderBackgroundProps = {
    config: TeamShaderConfig;
};

/**
 * Hoisted empty array to preserve referential stability when colors is
 * nullish, preventing broken memoization.
 */
const EMPTY_COLORS: string[] = [];

const SHADER_MAX_PIXEL_COUNT_DESKTOP = 2_000_000;
const SHADER_MAX_PIXEL_COUNT_MOBILE = 800_000;

/**
 * Mobile devices get fewer swirl iterations to reduce GPU fragment-shader cost.
 */
const MOBILE_SWIRL_ITERATIONS = 2;
const CONTAINER_STYLE = { position: "absolute" as const, inset: 0 };
const SHADER_FADE_MS = 600;
const CONTEXT_LOST_RETRY_MS = 3000;
const MAX_CONTEXT_LOST_RETRIES = 1;

let _webglSupported: boolean | null = null;
function isWebglSupported(): boolean {
    if (_webglSupported !== null) return _webglSupported;
    if (typeof document === "undefined") return true;
    try {
        const canvas = document.createElement("canvas");
        _webglSupported = !!(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
    } catch {
        _webglSupported = false;
    }
    return _webglSupported;
}

type ShaderErrorBoundaryProps = { onError: () => void; children: ReactNode };
type ShaderErrorBoundaryState = { hasError: boolean };

class ShaderErrorBoundary extends Component<ShaderErrorBoundaryProps, ShaderErrorBoundaryState> {
    state: ShaderErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError(): ShaderErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(): void {
        this.props.onError();
    }

    render(): ReactNode {
        if (this.state.hasError) return null;
        return this.props.children;
    }
}

/**
 * Uses IntersectionObserver to freeze the shader (speed=0) when off-screen,
 * eliminating the perpetual WebGL rAF loop when the section isn't visible.
 * On mobile, caps pixel count and shader complexity to reduce GPU load and
 * battery drain.
 *
 * Layers a persistent CSS gradient underlay beneath the shader canvas instead
 * of swapping between them: a WebGL init failure, a lost context, or an
 * unsupported browser now always falls back to the gradient rather than a
 * transparent section, with a compositor-only opacity fade once the shader
 * has (probably) painted, instead of an abrupt pop.
 */
export const AnimatedShaderBackground = memo(function AnimatedShaderBackground({
    config,
}: AnimatedShaderBackgroundProps) {
    const isShaderReady = useShaderReady();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [shaderFailed, setShaderFailed] = useState(false);
    const [shaderPainted, setShaderPainted] = useState(false);
    const retryCountRef = useRef(0);

    const { isMobile } = useHomepageBreakpoints();
    const { prefersReducedMotion } = useHomepageMotionPref();

    useEffect(() => {
        if (prefersReducedMotion) return;
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { rootMargin: "200px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [prefersReducedMotion]);

    const animatedColors = useAnimatedColors(
        config.colors ?? EMPTY_COLORS,
        700,
        isVisible && !prefersReducedMotion
    );

    const maxPixelCount = isMobile ? SHADER_MAX_PIXEL_COUNT_MOBILE : SHADER_MAX_PIXEL_COUNT_DESKTOP;

    const swirlIterations = isMobile ? MOBILE_SWIRL_ITERATIONS : (config.swirlIterations ?? 4);

    const gradientStyle = useMemo(
        () => ({
            position: "absolute" as const,
            inset: 0,
            background: `linear-gradient(135deg, ${(config.colors ?? EMPTY_COLORS).join(", ")})`,
        }),
        [config.colors]
    );

    const showShader =
        !prefersReducedMotion && isShaderReady && isVisible && !shaderFailed && isWebglSupported();

    const handleShaderFailure = () => {
        setShaderFailed(true);
    };

    useEffect(() => {
        if (!showShader) return;

        const container = containerRef.current;
        let cancelled = false;
        let retryTimer: ReturnType<typeof setTimeout> | undefined;
        let rafId: number | undefined;

        const onContextLost = (e: Event) => {
            e.preventDefault();
            setShaderFailed(true);
            if (retryCountRef.current < MAX_CONTEXT_LOST_RETRIES) {
                retryTimer = setTimeout(() => {
                    if (cancelled) return;
                    retryCountRef.current += 1;
                    setShaderFailed(false);
                }, CONTEXT_LOST_RETRY_MS);
            }
        };

        const attach = () => {
            const canvas = container?.querySelector("canvas");
            if (!canvas) {
                rafId = requestAnimationFrame(attach);
                return;
            }
            canvas.addEventListener("webglcontextlost", onContextLost);
        };
        attach();

        return () => {
            cancelled = true;
            if (rafId !== undefined) cancelAnimationFrame(rafId);
            if (retryTimer) clearTimeout(retryTimer);
            container
                ?.querySelector("canvas")
                ?.removeEventListener("webglcontextlost", onContextLost);
        };
    }, [showShader]);

    useEffect(() => {
        if (!showShader) {
            setShaderPainted(false);
            return;
        }
        let raf1 = 0;
        let raf2 = 0;
        raf1 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => setShaderPainted(true));
        });
        return () => {
            cancelAnimationFrame(raf1);
            cancelAnimationFrame(raf2);
        };
    }, [showShader]);

    const shaderFadeStyle = {
        position: "absolute" as const,
        inset: 0,
        opacity: shaderPainted ? 1 : 0,
        transition: `opacity ${SHADER_FADE_MS}ms ease`,
    };

    return (
        <div ref={containerRef} style={CONTAINER_STYLE} aria-hidden="true">
            <div style={gradientStyle} />
            {showShader && (
                <ShaderErrorBoundary onError={handleShaderFailure}>
                    <div style={shaderFadeStyle}>
                        <ShaderBackground
                            colors={animatedColors}
                            proportion={config.proportion}
                            softness={config.softness}
                            distortion={config.distortion}
                            swirl={config.swirl}
                            swirlIterations={swirlIterations}
                            shape={config.shape}
                            shapeScale={config.shapeScale}
                            speed={config.speed ?? 0}
                            scale={config.scale}
                            rotation={config.rotation}
                            offsetX={config.offsetX}
                            offsetY={config.offsetY}
                            maxPixelCount={maxPixelCount}
                            position="absolute"
                            top={0}
                            left={0}
                            w="100%"
                            h="100%"
                        />
                    </div>
                </ShaderErrorBoundary>
            )}
        </div>
    );
});

AnimatedShaderBackground.displayName = "AnimatedShaderBackground";
