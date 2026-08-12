import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import type { CoreGraphqlEntryProps } from "@/types/page";
import { ModuleCarTechSpecs } from "./module-car-tech-specs";
import { useModuleCarTechSpecsQuery } from "@/components/contentful/module-car-tech-specs/__generated/module-car-tech-specs.contentful.generated";

export type ModuleCarTechSpecsGraphqlProps = CoreGraphqlEntryProps & {
    isEmbedded?: boolean;
};

export const ModuleCarTechSpecsGraphql = ({
    id,
    locale,
    preview,
    isEmbedded,
    index,
}: ModuleCarTechSpecsGraphqlProps) => {
    const { data, isLoading } = useModuleCarTechSpecsQuery(
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

    const microcopySet = queryResult?.microcopySetCollection?.items[0];

    if (isLoading || !queryResult?.moduleCarTechSpecs || !microcopySet) {
        return null;
    }

    return (
        <ModuleCarTechSpecs
            {...queryResult.moduleCarTechSpecs}
            microcopySet={microcopySet}
            moduleIndex={index}
            isEmbedded={isEmbedded}
        />
    );
};
