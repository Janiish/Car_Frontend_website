import type { ModulePageLinkTileFieldsFragment } from "@/components/contentful/module-page-link-tile/__generated/module-page-link-tile.contentful.generated";
import { Grid, GridItem } from "@project/ui";
import { gridTemplateColumns, gridGap } from "@project/ui/src/theme/global-styles";
import { GenericPageCard } from "@/components/generic-page-card";
import { ModuleSpacer } from "@/components/module-spacer";
import { ModuleHeader } from "@/components/module-header";

type ModulePageLinkTileProps = ModulePageLinkTileFieldsFragment;

const ModulePageLinkTile = (props: ModulePageLinkTileProps) => {
    const { title, description, pagesCollection } = props;

    const itemCount = pagesCollection?.items.length ?? 0;
    const columnSpan = itemCount > 0 ? Math.floor(12 / itemCount) : 12;

    return (
        <ModuleSpacer className="ModulePageLinkTile">
            <ModuleHeader mb={9} title={title} description={description} />
            {pagesCollection?.items.length && (
                <Grid templateColumns={gridTemplateColumns} gap={gridGap}>
                    {pagesCollection.items.map(
                        (page) =>
                            page?.__typename && (
                                <GridItem
                                    key={crypto.randomUUID()}
                                    gridColumn={{
                                        base: "1 / span 2",
                                        l: `span ${columnSpan}`,
                                    }}
                                    mb={{
                                        base: 6,
                                        l: 0,
                                    }}
                                >
                                    <GenericPageCard item={page} />
                                </GridItem>
                            )
                    )}
                </Grid>
            )}
        </ModuleSpacer>
    );
};

export { ModulePageLinkTile };
