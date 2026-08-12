import { richTextRenderer } from "@/lib/contentful/rich-text-renderer/rich-text-renderer";
import type { ModuleRichTextFieldsFragment } from "@/components/contentful/module-rich-text/__generated/module-rich-text.contentful.generated";
import { useContentfulInspectorMode } from "@contentful/live-preview/react";
import { Box, Grid, GridItem, Heading } from "@project/ui";
import { gridGap, gridTemplateColumns } from "@project/ui/src/theme/global-styles";
import { ModuleSpacer } from "@/components/module-spacer";

export type ModuleRichTextProps = ModuleRichTextFieldsFragment;

export const ModuleRichText = (props: ModuleRichTextProps) => {
    const {
        title,
        isTitleLeftAligned,
        text,
        sys: { id },
    } = props;

    const inspectorMode = useContentfulInspectorMode({ entryId: id });

    if (!text?.json) {
        return null;
    }

    return (
        <Box overflow="hidden" className="ModuleRichText">
            <ModuleSpacer pb={{ base: 4, s: 4, md: 4, l: 4 }}>
                <Grid templateColumns={gridTemplateColumns} gap={gridGap} position="relative">
                    {isTitleLeftAligned && title && (
                        <GridItem
                            colStart={{ base: 1 }}
                            colEnd={{ base: 3, l: 3 }}
                            position={{ base: "relative", l: "absolute" }}
                            top={4}
                            left={0}
                        >
                            <Heading as="h3" size="headingXLarge" fontWeight={400}>
                                {title}
                            </Heading>
                        </GridItem>
                    )}
                    {!isTitleLeftAligned && title && (
                        <GridItem colStart={{ base: 1, l: 4 }} colEnd={{ base: 3, l: 10 }}>
                            <Heading as="h3" size="headingXLarge" fontWeight={400}>
                                {title}
                            </Heading>
                        </GridItem>
                    )}
                </Grid>
            </ModuleSpacer>
            {text && (
                <Box className="rte" {...inspectorMode({ fieldId: "text" })}>
                    {richTextRenderer(text)}
                </Box>
            )}
        </Box>
    );
};
