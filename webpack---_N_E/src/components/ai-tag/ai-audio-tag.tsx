import { AiTag, useAiTagCopy, type AiTagMode, type AiTagVariant } from "@project/ui";
// eslint-disable-next-line no-restricted-imports
import type { HTMLChakraProps } from "@chakra-ui/react";

type AiAudioTagProps = Omit<HTMLChakraProps<"span">, "children"> & {
    aiGenerated?: string | null;
    mode?: AiTagMode;
};

function resolveAudioVariant(aiGenerated?: string | null): AiTagVariant | null {
    if (aiGenerated === "generated") return "generated";
    if (aiGenerated === "modified") return "modified";
    return null;
}

export const AiAudioTag = ({ aiGenerated, mode = "standard", ...rest }: AiAudioTagProps) => {
    const variant = resolveAudioVariant(aiGenerated);
    const { label, srLabel } = useAiTagCopy(variant ?? "generated", "audio");

    if (!variant) return null;

    return <AiTag kind="audio" label={label} srLabel={srLabel} mode={mode} {...rest} />;
};
