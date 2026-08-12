import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import type { CoreGraphqlEntryProps } from "@/types/page";
import { useModuleListenToTheEngineQuery } from "./__generated/module-listen-to-the-engine.contentful.generated";
import { ModuleListenToTheEngine } from "./module-listen-to-the-engine";

export type ModuleListenToTheEngineGraphqlGraphqlProps = CoreGraphqlEntryProps;

export const ModuleListenToTheEngineGraphql = ({
    id,
    locale,
    preview,
    index,
}: ModuleListenToTheEngineGraphqlGraphqlProps) => {
    const { data, isLoading } = useModuleListenToTheEngineQuery(
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

    const queryResult = useContentfulLiveUpdates(data, { locale });

    if (isLoading || !queryResult?.moduleListenToTheEngine) {
        return null;
    }

    return (
        <ModuleListenToTheEngine {...queryResult?.moduleListenToTheEngine} moduleIndex={index} />
    );
};
