import { createContext, useContext, useRef, useMemo, useCallback, type ReactNode } from "react";
import { useTransform, useMotionValueEvent, motionValue, type MotionValue } from "framer-motion";
import { Box } from "@chakra-ui/react";
import { MotionBox } from "@project/ui";
import { colors } from "@project/ui/src/design-tokens";

const ScrollRevealTextColorContext = createContext<string | undefined>(undefined);

export type ScrollRevealTextAnimationContainerProps = {
    opacity?: number;
    textColor?: string;
    children: ReactNode;
};

/** Provides default text colour via context and shared padding for stacked lines (blur/mask safe). */
export const ScrollRevealTextAnimationContainer = ({
    opacity,
    textColor = colors.grey500,
    children,
}: ScrollRevealTextAnimationContainerProps) => (
    <ScrollRevealTextColorContext.Provider value={textColor}>
        <Box opacity={opacity} overflow="visible" px={{ base: 4, md: 6 }} py={{ base: 5, md: 7 }}>
            {children}
        </Box>
    </ScrollRevealTextColorContext.Provider>
);

const LOCKED_ENTRY_COMPLETE = motionValue(1);

/** L→R mask: solid left (full) vs feathered right — MID/TAIL set trailing brightness; narrower widths = sharper band (same tail alpha). */
const MASK_SOLID = "rgba(0, 0, 0, 1)";
const MASK_FEATHER_MID = "rgba(0, 0, 0, 0.58)";
const MASK_FEATHER_TAIL = "rgba(0, 0, 0, 0.24)";
const FEATHER_SOFT_WIDTH_PERCENT = 18;
const FEATHER_HARD_WIDTH_PERCENT = 10;

const ELEMENT_OPACITY_FLOOR = 0.72;
const ELEMENT_SCALE_FLOOR = 0.95;

/** Higher = wipe edge snaps forward more decisively (more intense motion, unchanged feather colours). */
const MASK_SOLID_EDGE_LATE_RAMP_EXPONENT = 3.15;
const MASK_SOLID_MIN_PERCENT = 18;

/** Smoothstep on [0,1]: slow in/out for exit blur and reveal falloff (avoids linear steps). */
const easeExitRamp = (phase: number) => {
    const clampedPhase = Math.max(0, Math.min(1, phase));
    return clampedPhase * clampedPhase * (3 - 2 * clampedPhase);
};

const ENTRY_MASK_LATE_RAMP_EXPONENT = 2.65;
const ELEMENT_OPACITY_LATE_RAMP_EXPONENT = 1.9;

/** Skews linear entry progress so the L→R mask stays “ghost” longer, then snaps up at the end. */
const easeEntryMaskReveal = (linearEntry: number) => {
    const clampedLinearEntry = Math.max(0, Math.min(1, linearEntry));
    return clampedLinearEntry ** ENTRY_MASK_LATE_RAMP_EXPONENT;
};

export type ScrollRevealTextAnimationProps = {
    entryProgress: MotionValue<number>;
    exitProgress?: MotionValue<number>;
    /** Default `[0.5, 1]`. */
    entryProgressRange?: [number, number];
    /** Exit ramp on `exitProgress`; full entry is held until range start. */
    exitProgressRange?: [number, number];
    entryTranslateYPx?: number;
    entryBlurRadiusRange?: [number, number];
    playOnce?: boolean;
    textColor?: string;
    children: ReactNode;
};

/** Scroll-driven headline: entry slide/blur/scale + L→R mask; optional exit. */
export const ScrollRevealTextAnimation = ({
    entryProgress,
    exitProgress,
    entryProgressRange = [0.5, 1],
    exitProgressRange: exitProgressRangeProp,
    entryTranslateYPx = 30,
    entryBlurRadiusRange = [10, 0],
    playOnce = false,
    textColor: textColorProp,
    children,
}: ScrollRevealTextAnimationProps) => {
    const contextTextColor = useContext(ScrollRevealTextColorContext);
    const textColor = textColorProp ?? contextTextColor ?? colors.grey500;

    const hasCompleted = useRef(false);
    const restingBlur = entryBlurRadiusRange[1];
    const maxBlurPx = entryBlurRadiusRange[0];

    const exitScroll =
        exitProgress != null && exitProgressRangeProp != null
            ? { progress: exitProgress, range: exitProgressRangeProp }
            : null;
    const hasExitAnimation = exitScroll !== null;
    const exitProgressSource = exitScroll !== null ? exitScroll.progress : entryProgress;
    const exitRampOnExitProgress: [number, number] =
        exitScroll !== null ? exitScroll.range : [0, 1];

    const translateY = useTransform(entryProgress, entryProgressRange, [
        `${entryTranslateYPx}px`,
        "0px",
    ]);
    const entryReveal = useTransform(entryProgress, entryProgressRange, [0, 1]);
    const entryBlur = useTransform(entryProgress, entryProgressRange, entryBlurRadiusRange);
    const entryScale = useTransform(entryProgress, entryProgressRange, [0.96, 1]);

    const exitPhase = useTransform(exitProgressSource, (scrollInExitTrack) => {
        if (!hasExitAnimation) return 0;
        const [exitRampStart, exitRampEnd] = exitRampOnExitProgress;
        if (scrollInExitTrack <= exitRampStart) return 0;
        if (scrollInExitTrack >= exitRampEnd) return 1;
        return (scrollInExitTrack - exitRampStart) / (exitRampEnd - exitRampStart);
    });

    const exitReveal = useTransform(exitPhase, (phase) => 1 - easeExitRamp(phase));
    const exitBlur = useTransform(exitPhase, (phase) => easeExitRamp(phase) * maxBlurPx);

    /** Marks one-shot entry complete when scroll passes the end of `entryProgressRange`. */
    const onProgressChange = useCallback(
        (scrollProgress: number) => {
            if (playOnce && !hasCompleted.current && scrollProgress >= entryProgressRange[1]) {
                hasCompleted.current = true;
            }
        },
        [playOnce, entryProgressRange]
    );
    useMotionValueEvent(entryProgress, "change", onProgressChange);

    const restingBlurMotion = useMemo(() => motionValue(restingBlur), [restingBlur]);
    const isEntryLocked = playOnce && hasCompleted.current;
    const entryMaskReveal = useTransform(entryReveal, easeEntryMaskReveal);
    const entryMaskRevealForCombine = isEntryLocked ? LOCKED_ENTRY_COMPLETE : entryMaskReveal;
    const entryBlurForCombine = isEntryLocked ? restingBlurMotion : entryBlur;
    const entryScaleForCombine = isEntryLocked ? LOCKED_ENTRY_COMPLETE : entryScale;

    const reveal = useTransform(
        [entryMaskRevealForCombine, exitReveal] as MotionValue<number>[],
        ([entryMaskValue, exitRevealValue]: number[]) => Math.min(entryMaskValue, exitRevealValue)
    );
    const blur = useTransform(
        [entryBlurForCombine, exitBlur] as MotionValue<number>[],
        ([entryBlurPx, exitBlurPx]: number[]) => Math.max(entryBlurPx, exitBlurPx)
    );
    const filter = useTransform(blur, (blurRadiusPx) => `blur(${blurRadiusPx}px)`);

    const elementOpacity = useTransform(reveal, (progress) => {
        const clampedReveal = Math.max(0, Math.min(1, progress));
        const curved = clampedReveal ** ELEMENT_OPACITY_LATE_RAMP_EXPONENT;
        return ELEMENT_OPACITY_FLOOR + (1 - ELEMENT_OPACITY_FLOOR) * curved;
    });

    // Entry-only: same curve as during entry (matches `reveal` while exitReveal is 1); no shrink on exit.
    const elementScale = useTransform(entryMaskRevealForCombine, (entryMaskProgress) => {
        const clamped = Math.max(0, Math.min(1, entryMaskProgress));
        const curved = clamped ** ELEMENT_OPACITY_LATE_RAMP_EXPONENT;
        return ELEMENT_SCALE_FLOOR + (1 - ELEMENT_SCALE_FLOOR) * curved;
    });

    const animatedMaskImage = useTransform(reveal, (revealProgress) => {
        if (revealProgress >= 1 - 1e-6) return "none";
        const clampedReveal = Math.max(0, Math.min(1, revealProgress));
        const solidRamp = clampedReveal ** MASK_SOLID_EDGE_LATE_RAMP_EXPONENT;
        const solidEndPercent = MASK_SOLID_MIN_PERCENT + solidRamp * (100 - MASK_SOLID_MIN_PERCENT);
        const softEndPercent = Math.min(100, solidEndPercent + FEATHER_SOFT_WIDTH_PERCENT);
        const hardEndPercent = Math.min(100, softEndPercent + FEATHER_HARD_WIDTH_PERCENT);
        return `linear-gradient(to right, ${MASK_SOLID} ${solidEndPercent}%, ${MASK_FEATHER_MID} ${softEndPercent}%, ${MASK_FEATHER_TAIL} ${hardEndPercent}%)`;
    });

    const resolvedTranslateY = isEntryLocked ? 0 : translateY;

    // Outer: transform + blur; inner: mask + fill. Split avoids WebKit clipping filter + mask on one node.
    return (
        <MotionBox
            as="span"
            display="block"
            style={{
                y: resolvedTranslateY,
                filter,
                scale: entryScaleForCombine,
                overflow: "visible",
            }}
        >
            <MotionBox
                as="span"
                display="block"
                style={{
                    opacity: elementOpacity,
                    scale: elementScale,
                    color: textColor,
                    WebkitMaskImage: animatedMaskImage,
                    maskImage: animatedMaskImage,
                    overflow: "visible",
                }}
            >
                {children}
            </MotionBox>
        </MotionBox>
    );
};
