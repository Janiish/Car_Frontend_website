import { useEffect, useRef, useState } from "react";
import { Box } from "@project/ui";
import { VisuallyHidden } from "../../chakra-ui/visually-hidden";

const FADE_IN_MS = 50;
const DIGIT_COUNT = 10;
const SPIN_DURATION_MS = 1200;
const SPIN_EASING = "cubic-bezier(0.2, 0.1, 0.2, 1)";
const STRIP_CYCLES = 4;
const STRIP_LENGTH = DIGIT_COUNT * STRIP_CYCLES;

const MASK_HEIGHT = "0.10em";
const MASK_WIDTH = "0.5em";
const MASK_IMAGE = [
    `linear-gradient(to right, transparent, #000 ${MASK_WIDTH}, #000 calc(100% - ${MASK_WIDTH}), transparent)`,
    `linear-gradient(transparent, #000 ${MASK_HEIGHT}, #000 calc(100% - ${MASK_HEIGHT}), transparent)`,
].join(", ");

export type YearCounterProps = {
    startYear: number;
    endYear: number;
    isActive: boolean;
    startDelayMs?: number;
};

function toDigits(n: number): number[] {
    return String(n).padStart(4, "0").split("").map(Number);
}

function forwardOffset(from: number, to: number): number {
    if (to >= from) return to - from;
    return DIGIT_COUNT - from + to;
}

function continuousDelta(prevDigits: number[], nextDigits: number[], digitIndex: number): number {
    const from = prevDigits[digitIndex];
    const to = nextDigits[digitIndex];
    const directDelta = forwardOffset(from, to);

    if (directDelta !== 0) return directDelta;

    const highestChangedIndex = prevDigits.findIndex((d, i) => d !== nextDigits[i]);
    if (highestChangedIndex >= 0 && highestChangedIndex < digitIndex) {
        return DIGIT_COUNT;
    }
    return 0;
}

type DigitSpinnerProps = {
    digit: number;
    animated: boolean;
    delta: number;
    revision: number;
};

const DigitSpinner = ({ digit, animated, delta, revision }: DigitSpinnerProps) => {
    const positionRef = useRef(digit);
    const appliedRevisionRef = useRef(revision);

    if (!animated) {
        positionRef.current = digit;
        appliedRevisionRef.current = revision;
    } else if (revision !== appliedRevisionRef.current) {
        positionRef.current += delta;
        appliedRevisionRef.current = revision;
    }

    return (
        <Box
            as="span"
            sx={{
                display: "inline-block",
                height: `calc(1em + ${MASK_HEIGHT} * 2)`,
                lineHeight: 1,
                overflow: "hidden",
                verticalAlign: "top",
            }}
        >
            <Box
                as="span"
                sx={{
                    display: "block",
                    py: MASK_HEIGHT,
                    transition: animated
                        ? `transform ${SPIN_DURATION_MS}ms ${SPIN_EASING}`
                        : "none",
                    transform: `translateY(-${positionRef.current}em)`,
                }}
            >
                {Array.from({ length: STRIP_LENGTH }, (_, i) => (
                    <Box
                        as="span"
                        key={i}
                        aria-hidden={i % DIGIT_COUNT !== digit}
                        sx={{
                            display: "block",
                            height: "1em",
                            lineHeight: 1,
                        }}
                    >
                        {i % DIGIT_COUNT}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export const YearCounter = ({
    startYear,
    endYear,
    isActive,
    startDelayMs = 0,
}: YearCounterProps) => {
    const [displayYear, setDisplayYear] = useState(startYear);
    const [animated, setAnimated] = useState(false);
    const [revision, setRevision] = useState(0);
    const prevDigitsRef = useRef(toDigits(startYear));

    useEffect(() => {
        if (!isActive) return;
        setAnimated(false);
        setDisplayYear(startYear);
        prevDigitsRef.current = toDigits(startYear);
        if (startYear >= endYear) return;
        const id = setTimeout(() => {
            setRevision((r) => r + 1);
            setAnimated(true);
            setDisplayYear(endYear);
        }, FADE_IN_MS + startDelayMs);
        return () => clearTimeout(id);
    }, [isActive, startYear, endYear, startDelayMs]);

    const digits = toDigits(displayYear);
    const deltas = digits.map((_, i) =>
        animated ? continuousDelta(prevDigitsRef.current, digits, i) : 0
    );

    return (
        <>
            {/* Screen readers announce only the resolved year once; the spinning
                digit strips below are purely decorative and hidden from AT so
                intermediate/placeholder digits are never read out. */}
            <VisuallyHidden as="span">{String(displayYear)}</VisuallyHidden>
            <Box
                as="span"
                aria-hidden="true"
                display="inline-flex"
                sx={{
                    fontVariantNumeric: "tabular-nums",
                    margin: `calc(-1 * ${MASK_HEIGHT}) calc(-1 * ${MASK_WIDTH})`,
                    padding: `0 ${MASK_WIDTH}`,
                    maskImage: MASK_IMAGE,
                    WebkitMaskImage: MASK_IMAGE,
                    maskComposite: "intersect",
                    WebkitMaskComposite: "source-in" as string,
                }}
            >
                {digits.map((digit, digitIndex) => {
                    const placeMagnitude = 10 ** (digits.length - 1 - digitIndex);
                    return (
                        <DigitSpinner
                            key={placeMagnitude}
                            digit={digit}
                            animated={animated}
                            delta={deltas[digitIndex]}
                            revision={revision}
                        />
                    );
                })}
            </Box>
        </>
    );
};
