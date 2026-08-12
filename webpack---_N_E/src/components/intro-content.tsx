import { Box, Grid, GridItem, Heading, Text } from "@project/ui";
import type {
    PageArticleFieldsFragment,
    PageBasicFieldsFragment,
    PageCarFieldsFragment,
    PageDriverFieldsFragment,
    PageRaceEventFieldsFragment,
    PageRaceSeriesFieldsFragment,
    PageTeamFieldsFragment,
} from "@/lib/contentful/__generated/graphql.types";
import { ModuleSpacer } from "./module-spacer";
import { gridTemplateColumns, gridGap } from "@project/ui/src/theme/global-styles";
import type { PageHomepageFieldsFragment } from "@/components/contentful/page-homepage/__generated/page-homepage.contentful.generated";
import { AiPageTag, resolveAiPageVariant } from "@/components/ai-tag";

type IntroContentProps =
    | (PageArticleFieldsFragment & { hasTopPadding?: boolean })
    | (PageRaceEventFieldsFragment & { hasTopPadding?: boolean })
    | (PageBasicFieldsFragment & { hasTopPadding?: boolean })
    | (PageCarFieldsFragment & { hasTopPadding?: boolean })
    | (PageDriverFieldsFragment & { hasTopPadding?: boolean })
    | (PageTeamFieldsFragment & { hasTopPadding?: boolean })
    | (PageRaceSeriesFieldsFragment & { hasTopPadding?: boolean })
    | (PageHomepageFieldsFragment & { hasTopPadding?: boolean });

export const IntroContent = (props: IntroContentProps) => {
    const {
        introductionCaption,
        introduction,
        introColumn1,
        introColumn2,
        introHeading,
        hasTopPadding = true,
    } = props;

    const aiGenerated =
        "aiGenerated" in props ? (props as { aiGenerated?: string | null }).aiGenerated : undefined;
    const aiVariant = resolveAiPageVariant(aiGenerated);

    const hasIntroContent = introHeading && introColumn1 && introColumn2;
    const hasIntro = Boolean(introductionCaption ?? introduction ?? hasIntroContent);

    if (!hasIntro && !aiVariant) return null;

    return (
        <ModuleSpacer pt={hasTopPadding ? { base: 10, s: 20 } : { base: 0, s: 0 }}>
            {aiVariant && (
                <Box pb={hasIntro ? { base: 5, md: 10 } : 0}>
                    <AiPageTag aiGenerated={aiGenerated} />
                </Box>
            )}

            {hasIntro && (
                <>
                    <Grid templateColumns={gridTemplateColumns} gap={gridGap}>
                        {introductionCaption && (
                            <GridItem
                                colStart={1}
                                colEnd={{
                                    base: 3,
                                    l: 4,
                                }}
                            >
                                <Text size="caption" color="grey300" mt={{ base: 0, s: 3 }}>
                                    {introductionCaption}
                                </Text>
                            </GridItem>
                        )}
                        <GridItem
                            colStart={{ base: 1, l: 4 }}
                            colEnd={{
                                base: 3,
                                l: 10,
                            }}
                        >
                            {introduction && <Text size="x-large">{introduction}</Text>}
                        </GridItem>
                    </Grid>

                    {hasIntroContent && (
                        <Grid
                            templateColumns={gridTemplateColumns}
                            gap={gridGap}
                            pt={{ base: 10, s: 20 }}
                        >
                            <GridItem colStart={{ base: 1 }} colEnd={{ base: 3, l: 4 }}>
                                <Heading as="h2" size="headingLarge" fontWeight={400}>
                                    {introHeading}
                                </Heading>
                            </GridItem>
                            <GridItem colStart={{ base: 1, l: 4 }} colEnd={{ base: 3, l: 7 }}>
                                <Text size="medium">{introColumn1}</Text>
                            </GridItem>

                            <GridItem colStart={{ base: 1, l: 7 }} colEnd={{ base: 3, l: 10 }}>
                                <Text size="medium">{introColumn2}</Text>
                            </GridItem>
                        </Grid>
                    )}
                </>
            )}
        </ModuleSpacer>
    );
};
