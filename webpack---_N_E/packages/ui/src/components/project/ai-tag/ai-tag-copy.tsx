import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { AiContentKind } from "./ai-spark-icon";

// ---------------------------------------------------------------------------
// Variant & copy types
// ---------------------------------------------------------------------------

export type AiTagVariant = "generated" | "modified" | "pageGenerated" | "pageModified";

type AiTagCopyType = Extract<AiTagVariant, "generated" | "modified">;

type AiAnnouncementKind = Extract<AiContentKind, "image" | "video" | "audio" | "text">;

type AiTagAnnouncementField = `${AiTagCopyType}${Capitalize<AiAnnouncementKind>}`;

type AiTagCopyEntry = {
    generated: string;
    modified: string;
    pageGenerated: string;
    pageModified: string;
} & {
    [K in AiTagAnnouncementField]?: string;
};

export type AiTagCopyOverrides = Partial<Record<keyof AiTagCopyEntry, string>>;

// ---------------------------------------------------------------------------
// Resolution helpers
// ---------------------------------------------------------------------------

function resolveLabel(variant: AiTagVariant, overrides?: AiTagCopyOverrides): string {
    return overrides?.[variant] ?? "";
}

function resolveAnnouncement(
    variant: AiTagVariant,
    kind: AiContentKind | undefined,
    overrides?: AiTagCopyOverrides
): string | undefined {
    if (!kind || kind === "generic") return undefined;
    const copyType = variant === "generated" || variant === "modified" ? variant : undefined;
    if (!copyType) return undefined;
    const field =
        `${copyType}${kind.charAt(0).toUpperCase()}${kind.slice(1)}` as AiTagAnnouncementField;
    const value = overrides?.[field];
    return value?.trim() ? value : undefined;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

type AiTagCopyContextValue = {
    overrides?: AiTagCopyOverrides;
};

const AiTagCopyContext = createContext<AiTagCopyContextValue>({});

type AiTagCopyProviderProps = {
    children: ReactNode;
    overrides?: AiTagCopyOverrides;
};

/**
 * Supplies Contentful microcopy for the AI tag system.
 * `packages/ui` stays Contentful-free — `apps/web` feeds resolved values
 * from the microcopy provider.
 */
export const AiTagCopyProvider = ({ children, overrides }: AiTagCopyProviderProps) => {
    const value = useMemo<AiTagCopyContextValue>(() => ({ overrides }), [overrides]);
    return <AiTagCopyContext.Provider value={value}>{children}</AiTagCopyContext.Provider>;
};

AiTagCopyProvider.displayName = "AiTagCopyProvider";

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Resolve the label + optional screen-reader announcement for a variant.
 * Returns `{ label, srLabel }` ready to spread onto `<AiTag>`.
 */
export const useAiTagCopy = (
    variant: AiTagVariant,
    kind?: AiContentKind
): { label: string; srLabel: string | undefined } => {
    const { overrides } = useContext(AiTagCopyContext);
    return {
        label: resolveLabel(variant, overrides),
        srLabel: resolveAnnouncement(variant, kind, overrides),
    };
};
