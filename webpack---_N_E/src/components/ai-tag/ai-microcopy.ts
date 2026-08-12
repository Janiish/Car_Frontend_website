import type { FetchMicrocopySetsResults } from "@/lib/contentful/microcopy/fetch-microcopy-sets";
import { get } from "@/lib/contentful/microcopy/microcopy";
import type { AiTagCopyOverrides } from "@project/ui";

const AI_TAG_REQUIRED_KEYS: Array<{ field: keyof AiTagCopyOverrides; key: string }> = [
    { field: "generated", key: "label.aiGeneratedContent" },
    { field: "modified", key: "label.aiModifiedContent" },
    { field: "pageGenerated", key: "label.aiPageGeneratedDisclosure" },
    { field: "pageModified", key: "label.aiPageModifiedDisclosure" },
];

const AI_TAG_OPTIONAL_KEYS: Array<{ field: keyof AiTagCopyOverrides; key: string }> = [
    { field: "generatedImage", key: "label.aiGeneratedImage" },
    { field: "modifiedImage", key: "label.aiModifiedImage" },
    { field: "generatedVideo", key: "label.aiGeneratedVideo" },
    { field: "modifiedVideo", key: "label.aiModifiedVideo" },
    { field: "generatedAudio", key: "label.aiGeneratedAudio" },
    { field: "modifiedAudio", key: "label.aiModifiedAudio" },
    { field: "generatedText", key: "label.aiGeneratedText" },
    { field: "modifiedText", key: "label.aiModifiedText" },
];

/** Optional lookup: missing keys yield undefined instead of logging a placeholder. */
function tryGet(sets: FetchMicrocopySetsResults, setKey: string, key: string): string | undefined {
    return sets[setKey]?.find((item) => item?.key === key)?.valueOne ?? undefined;
}

export function resolveAiTagCopy(sets: FetchMicrocopySetsResults): AiTagCopyOverrides {
    const result: AiTagCopyOverrides = {};
    for (const { field, key } of AI_TAG_REQUIRED_KEYS) {
        result[field] = get(sets, "global", key);
    }
    for (const { field, key } of AI_TAG_OPTIONAL_KEYS) {
        result[field] = tryGet(sets, "global", key);
    }
    return result;
}
