import { useId, type ReactElement } from "react";
import type { ResponsiveValue } from "@chakra-ui/react";
import type { ContentfulCloudinaryAssetField } from "../../../cloudinary/cld-types";
import {
    AiAssetTag,
    FORCE_AI_TAG,
    getAiGenerationType,
    type AiTagPosition,
    type AiTagOffset,
} from "./ai-asset-tag";
import type { AiContentKind } from "./ai-spark-icon";

export type AiAssetTagOwnProps = {
    aiTagPosition?: ResponsiveValue<AiTagPosition>;
    aiTagOffset?: AiTagOffset;
    hideAiTag?: boolean;
};

/**
 * Shared hook for Cld* media components. Reads Cloudinary metadata, generates
 * an `aria-describedby` id, and returns the JSX tag element (or `null`).
 */
export function useAiAssetTag(
    cloudinaryAsset: ContentfulCloudinaryAssetField,
    kind: AiContentKind,
    opts: AiAssetTagOwnProps
) {
    const { aiTagPosition = "top-left", aiTagOffset, hideAiTag = false } = opts;

    const aiGenerationType = getAiGenerationType(cloudinaryAsset) ?? FORCE_AI_TAG;
    const aiTagId = useId();
    const showAiTag = Boolean(aiGenerationType) && !hideAiTag;

    const tag: ReactElement | null =
        showAiTag && aiGenerationType ? (
            <AiAssetTag
                id={aiTagId}
                type={aiGenerationType}
                position={aiTagPosition}
                offset={aiTagOffset}
                kind={kind}
            />
        ) : null;

    return {
        ariaDescribedBy: showAiTag ? aiTagId : undefined,
        tag,
    };
}
