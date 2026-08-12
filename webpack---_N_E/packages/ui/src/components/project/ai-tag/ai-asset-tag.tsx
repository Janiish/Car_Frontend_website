import { Box, type ResponsiveValue } from "@chakra-ui/react";
import { sizes, space } from "../../../design-tokens";
import type { ContentfulCloudinaryAssetField } from "../../../cloudinary/cld-types";
import { AiTag } from "./ai-tag";
import { useAiTagCopy } from "./ai-tag-copy";
import type { AiContentKind } from "./ai-spark-icon";

export type AiGenerationType = "generated" | "modified";

export const getAiGenerationType = (
    asset: ContentfulCloudinaryAssetField
): AiGenerationType | null => {
    const value = asset?.[0]?.metadata?.ai_generated;
    return value === "generated" || value === "modified" ? value : null;
};

/**
 * QA affordance: set to `"generated"` or `"modified"` to force every asset to
 * render a tag regardless of Cloudinary metadata. Flip locally, never commit
 * a non-null value — doing so asserts that human-authored media is AI-generated.
 */
export const FORCE_AI_TAG: AiGenerationType | null = null;

export type AiTagPosition = "top-left" | "top-right";

export type AiTagOffset = {
    inset: ResponsiveValue<number | string>;
    /** Added on top of `inset` for the top edge only (e.g. nav clearance). */
    topExtra?: ResponsiveValue<number | string>;
};

// ---------------------------------------------------------------------------
// Offset constants — consumers pick the right one, tag just applies it.
// ---------------------------------------------------------------------------

const DEFAULT_INSET = 4;

export const AI_TAG_OFFSET = {
    default: { inset: DEFAULT_INSET },
    wrapperAligned: { inset: { base: 5, md: 10 } },
    wrapperAlignedBelowNav: {
        inset: { base: 5, md: 10 },
        topExtra: { base: sizes.navLogoBottom, md: sizes.navHeightCombined },
    },
} satisfies Record<string, AiTagOffset>;

// ---------------------------------------------------------------------------
// Responsive normaliser (base / md only)
// ---------------------------------------------------------------------------

const BREAKPOINT_ORDER = ["base", "xs", "s", "md", "l", "xl", "xxl"] as const;
type Breakpoint = (typeof BREAKPOINT_ORDER)[number];

function toRecord<T>(value: ResponsiveValue<T>): Partial<Record<Breakpoint, T>> {
    if (Array.isArray(value)) {
        const result: Partial<Record<Breakpoint, T>> = {};
        value.forEach((entry, i) => {
            const bp = BREAKPOINT_ORDER[i];
            if (entry != null && bp) result[bp] = entry as T;
        });
        return result;
    }
    if (typeof value === "object" && value !== null) {
        return value as Partial<Record<Breakpoint, T>>;
    }
    return { base: value };
}

function normalisePair<T>(value: ResponsiveValue<T>, fallback: T): { base: T; md: T } {
    const raw = toRecord(value);
    let current: T = raw.base ?? fallback;
    let mdVal: T = current;
    for (const bp of BREAKPOINT_ORDER) {
        if (raw[bp] != null) current = raw[bp] as T;
        if (bp === "md") mdVal = current;
    }
    return { base: raw.base ?? fallback, md: mdVal };
}

const spaceScale = space as Record<string, string>;

const toLength = (value: number | string): string =>
    typeof value === "number" ? (spaceScale[String(value)] ?? `${value}px`) : value;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type AiAssetTagProps = {
    type: AiGenerationType;
    id?: string;
    position?: ResponsiveValue<AiTagPosition>;
    offset?: AiTagOffset;
    kind?: AiContentKind;
};

/**
 * Overlay wrapper pinned to a corner of a positioned media ancestor.
 * Always renders in `image` mode (it sits on media).
 */
export const AiAssetTag = ({
    type,
    id,
    position = "top-left",
    offset = AI_TAG_OFFSET.default,
    kind,
}: AiAssetTagProps) => {
    const { label, srLabel } = useAiTagCopy(type, kind);
    const pos = normalisePair<AiTagPosition>(position, "top-left");
    const inset = normalisePair<number | string>(offset.inset, DEFAULT_INSET);
    const extra = offset.topExtra ? normalisePair<number | string>(offset.topExtra, 0) : null;

    const left = {
        base: pos.base === "top-left" ? inset.base : "auto",
        md: pos.md === "top-left" ? inset.md : "auto",
    };
    const right = {
        base: pos.base === "top-right" ? inset.base : "auto",
        md: pos.md === "top-right" ? inset.md : "auto",
    };
    const top = {
        base: extra ? `calc(${toLength(extra.base)} + ${toLength(inset.base)})` : inset.base,
        md: extra ? `calc(${toLength(extra.md)} + ${toLength(inset.md)})` : inset.md,
    };

    return (
        <Box
            position="absolute"
            top={top}
            left={left}
            right={right}
            width="max-content"
            zIndex={2}
            pointerEvents="none"
        >
            <AiTag
                id={id}
                label={label}
                srLabel={srLabel}
                mode="image"
                filled={type === "generated"}
                kind={kind}
            />
        </Box>
    );
};
