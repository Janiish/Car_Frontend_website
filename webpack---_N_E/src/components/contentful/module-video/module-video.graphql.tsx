import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

import type { CoreGraphqlEntryProps } from "@/types/page";
import { ModuleVideo } from "./module-video";
import { useModuleVideoQuery } from "./__generated/module-video.contentful.generated";

export type ModuleVideoGraphqlProps = CoreGraphqlEntryProps & {
    isEmbedded?: boolean;
};

export const ModuleVideoGraphql = ({
    id,
    locale,
    preview,
    index,
    isEmbedded,
}: ModuleVideoGraphqlProps) => {
    const { data, isLoading } = useModuleVideoQuery(
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

    const moduleVideo = useContentfulLiveUpdates(data?.moduleVideo);

    if (isLoading || !moduleVideo) {
        return null;
    }

    return <ModuleVideo {...moduleVideo} moduleIndex={index} isEmbedded={isEmbedded} />;
};
