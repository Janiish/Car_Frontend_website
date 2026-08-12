import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

import type { CoreGraphqlEntryProps } from "@/types/page";
import { useModuleImageQuery } from "@/components/contentful/module-image/__generated/module-image.contentful.generated";
import { ModuleImage } from "@/components/contentful/module-image/module-image";

export type ModuleImageGraphqlProps = CoreGraphqlEntryProps & {
    isEmbedded?: boolean;
};

export const ModuleImageGraphql = ({
    id,
    locale,
    preview,
    index,
    isEmbedded,
}: ModuleImageGraphqlProps) => {
    const { data, isLoading } = useModuleImageQuery(
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

    const moduleImage = useContentfulLiveUpdates(data?.moduleImage);

    if (isLoading || !moduleImage) {
        return null;
    }

    return <ModuleImage {...moduleImage} index={index} isEmbedded={isEmbedded} />;
};
