import { AiTag, useAiTagCopy, Grid, GridItem, type AiTagVariant } from "@project/ui";
import { gridTemplateColumns, gridGap } from "@project/ui/src/theme/global-styles";

type AiPageTagProps = {
    aiGenerated?: string | null;
};

export const resolveAiPageVariant = (aiGenerated?: string | null): AiTagVariant | null => {
    if (aiGenerated === "generated") return "pageGenerated";
    if (aiGenerated === "modified") return "pageModified";
    return null;
};

/**
 * Page-level AI content disclosure (EU AI Act). Renders the long-form
 * chip when the page's `aiGenerated` field is `"generated"` or `"modified"`.
 */
export const AiPageTag = ({ aiGenerated }: AiPageTagProps) => {
    const variant = resolveAiPageVariant(aiGenerated);
    const { label } = useAiTagCopy(variant ?? "pageGenerated");

    if (!variant) return null;

    return (
        <Grid templateColumns={gridTemplateColumns} gap={gridGap}>
            <GridItem colStart={{ base: 1, l: 4 }} colEnd={{ base: 3, l: 10 }}>
                <AiTag
                    length="long"
                    label={label}
                    kind="text"
                    maxWidth={{ base: "100%", l: "316px" }}
                />
            </GridItem>
        </Grid>
    );
};
