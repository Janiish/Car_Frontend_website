import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import type { CoreGraphqlEntryProps } from "@/types/page";
import { useModuleSpacerQuery } from "@/components/contentful/module-spacer/__generated/module-spacer.contentful.generated";
import { ModuleSpacer } from "@/components/contentful/module-spacer/module-spacer";

export type ModuleSpacerGraphqlProps = CoreGraphqlEntryProps;

export const ModuleSpacerGraphql = ({ id, locale, preview }: ModuleSpacerGraphqlProps) => {
    const { data, isLoading } = useModuleSpacerQuery(
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

    const moduleSpacer = useContentfulLiveUpdates(data?.moduleSpacer);

    if (isLoading || !moduleSpacer) {
        return null;
    }

    return <ModuleSpacer {...moduleSpacer} />;
};
