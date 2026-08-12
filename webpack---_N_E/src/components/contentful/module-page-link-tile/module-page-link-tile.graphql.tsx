import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import type { CoreGraphqlEntryProps } from "@/types/page";
import { useModulePageLinkTileQuery } from "@/components/contentful/module-page-link-tile/__generated/module-page-link-tile.contentful.generated";
import { ModulePageLinkTile } from "@/components/contentful/module-page-link-tile/module-page-link-tile";

export type ModulePageLinkTileGraphqlProps = CoreGraphqlEntryProps;

export const ModulePageLinkTileGraphql = ({
    id,
    locale,
    preview,
}: ModulePageLinkTileGraphqlProps) => {
    const { data, isLoading } = useModulePageLinkTileQuery(
        {
            id,
            locale,
            preview,
        },
        {
            ...(!preview && { staleTime: Infinity }),
            refetchOnWindowFocus: false,
        }
    );

    const modulePageLinkTile = useContentfulLiveUpdates(data?.modulePageLinkTile);

    if (isLoading || !modulePageLinkTile) {
        return null;
    }

    return <ModulePageLinkTile {...modulePageLinkTile} />;
};
