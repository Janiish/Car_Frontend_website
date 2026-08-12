import { useState, useEffect, useRef } from "react";
import { lerpColorArrays, easeInOutCubic } from "@/common/helpers/color-interpolation";

/**
 * Minimum interval between React state updates during color animation.
 * The rAF loop still runs at 60fps for timing accuracy, but we only
 * commit a new color array to React state every ~50ms (~20fps), reducing
 * re-renders from 60/s → 20/s while remaining visually smooth.
 */
const STATE_UPDATE_INTERVAL_MS = 50;

/**
 * Custom hook for animated color array transitions.
 *
 * Smoothly interpolates between color arrays when the target changes.
 * Uses requestAnimationFrame for timing but throttles React state
 * updates to avoid unnecessary re-render cascades.
 *
 * @param targetColors - The target color array to animate towards
 * @param duration - Animation duration in milliseconds (default: 800ms)
 * @param enabled - When false, skips animation and applies target immediately (default: true)
 * @returns The current interpolated color array
 */
export const useAnimatedColors = (
    targetColors: string[],
    duration: number = 800,
    enabled: boolean = true
): string[] => {
    const [currentColors, setCurrentColors] = useState<string[]>(targetColors);
    const currentColorsRef = useRef<string[]>(targetColors);
    const animationRef = useRef<number | null>(null);
    const startColorsRef = useRef<string[]>(targetColors);
    const startTimeRef = useRef<number | null>(null);
    const lastCommitRef = useRef(0);
    const targetRef = useRef(targetColors);
    targetRef.current = targetColors;

    useEffect(() => {
        // Cancel any ongoing animation
        if (animationRef.current !== null) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }

        if (!enabled) {
            setCurrentColors(targetColors);
            currentColorsRef.current = targetColors;
            startTimeRef.current = null;
            return;
        }

        const prev = currentColorsRef.current;
        const colorsMatch =
            prev.length === targetColors.length && prev.every((c, i) => c === targetColors[i]);

        if (colorsMatch) {
            startTimeRef.current = null;
            return;
        }

        startColorsRef.current = currentColorsRef.current;
        startTimeRef.current = null;
        lastCommitRef.current = 0;

        const animate = (timestamp: number) => {
            startTimeRef.current ??= timestamp;

            const elapsed = timestamp - startTimeRef.current;
            const rawProgress = Math.min(elapsed / duration, 1);

            if (rawProgress >= 1) {
                const final = targetRef.current;
                currentColorsRef.current = final;
                setCurrentColors(final);
                animationRef.current = null;
                startTimeRef.current = null;
                return;
            }

            const sinceLastCommit = timestamp - lastCommitRef.current;
            if (sinceLastCommit >= STATE_UPDATE_INTERVAL_MS) {
                const easedProgress = easeInOutCubic(rawProgress);
                const interpolated = lerpColorArrays(
                    startColorsRef.current,
                    targetRef.current,
                    easedProgress
                );
                currentColorsRef.current = interpolated;
                setCurrentColors(interpolated);
                lastCommitRef.current = timestamp;
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [targetColors, enabled, duration]);

    return currentColors;
};
