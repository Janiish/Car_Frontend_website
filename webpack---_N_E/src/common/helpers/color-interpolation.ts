/**
 * Color Interpolation Utilities
 *
 * Functions for smooth color transitions between hex color arrays.
 * Supports arrays of different lengths by normalizing them first.
 */

type RGB = { r: number; g: number; b: number };

/**
 * Parse a hex color string to RGB components
 * Supports both #RGB and #RRGGBB formats
 */
const HEX_PREFIX = /^#/;

export const hexToRgb = (hex: string): RGB => {
    const cleanHex = hex.replace(HEX_PREFIX, "");

    // Handle shorthand (#RGB) format
    const fullHex =
        cleanHex.length === 3
            ? cleanHex
                  .split("")
                  .map((c) => c + c)
                  .join("")
            : cleanHex;

    const num = Number.parseInt(fullHex, 16);
    return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
    };
};

/**
 * Convert RGB components back to hex string
 */
export const rgbToHex = (rgb: RGB): string => {
    const toHex = (n: number) =>
        Math.round(Math.max(0, Math.min(255, n)))
            .toString(16)
            .padStart(2, "0");
    return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
};

/**
 * Linear interpolation between two numbers
 * t = 0 returns a, t = 1 returns b
 */
export const lerp = (a: number, b: number, t: number): number => {
    return a + (b - a) * t;
};

/**
 * Interpolate between two RGB colors
 */
export const lerpRgb = (colorA: RGB, colorB: RGB, t: number): RGB => {
    return {
        r: lerp(colorA.r, colorB.r, t),
        g: lerp(colorA.g, colorB.g, t),
        b: lerp(colorA.b, colorB.b, t),
    };
};

/**
 * Interpolate between two hex colors
 * Returns a hex string at position t between colorA and colorB
 */
export const lerpHexColor = (colorA: string, colorB: string, t: number): string => {
    const rgbA = hexToRgb(colorA);
    const rgbB = hexToRgb(colorB);
    const interpolated = lerpRgb(rgbA, rgbB, t);
    return rgbToHex(interpolated);
};

/**
 * Normalize two color arrays to have the same length
 * If arrays have different lengths, we interpolate positions in the shorter array
 * to map to the longer array's indices
 */
export const normalizeColorArrays = (
    colorsA: string[],
    colorsB: string[]
): { normalizedA: string[]; normalizedB: string[] } => {
    const maxLength = Math.max(colorsA.length, colorsB.length);

    const interpolateArray = (colors: string[], targetLength: number): string[] => {
        if (colors.length === targetLength) return colors;
        if (colors.length === 0) return new Array<string>(targetLength).fill("#000000");
        if (colors.length === 1) return new Array<string>(targetLength).fill(colors[0]);

        const result: string[] = [];
        for (let i = 0; i < targetLength; i++) {
            // Map target index to source position (0 to colors.length - 1)
            const sourcePos = (i / (targetLength - 1)) * (colors.length - 1);
            const lowerIdx = Math.floor(sourcePos);
            const upperIdx = Math.min(lowerIdx + 1, colors.length - 1);
            const localT = sourcePos - lowerIdx;

            result.push(lerpHexColor(colors[lowerIdx], colors[upperIdx], localT));
        }
        return result;
    };

    return {
        normalizedA: interpolateArray(colorsA, maxLength),
        normalizedB: interpolateArray(colorsB, maxLength),
    };
};

/**
 * Interpolate between two color arrays
 * Handles arrays of different lengths by normalizing them first
 */
export const lerpColorArrays = (colorsA: string[], colorsB: string[], t: number): string[] => {
    const { normalizedA, normalizedB } = normalizeColorArrays(colorsA, colorsB);

    return normalizedA.map((colorA, i) => lerpHexColor(colorA, normalizedB[i], t));
};

/**
 * Easing function for smooth animation (ease-in-out cubic)
 */
export const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export type { RGB };
