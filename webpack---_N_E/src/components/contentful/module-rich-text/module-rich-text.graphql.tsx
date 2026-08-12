import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { useModuleRichTextQuery } from "@/components/contentful/module-rich-text/__generated/module-rich-text.contentful.generated";
import { ModuleRichText } from "@/components/contentful/module-rich-text/module-rich-text";
import type { CoreGraphqlEntryProps } from "@/types/page";

export type ModuleRichTextGraphqlProps = CoreGraphqlEntryProps;

export const ModuleRichTextGraphql = ({ id, locale, preview }: ModuleRichTextGraphqlProps) => {
    const { data, isLoading } = useModuleRichTextQuery(
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

    const moduleRichText = useContentfulLiveUpdates(data?.moduleRichText);

    if (isLoading || !moduleRichText) {
        return null;
    }

    return <ModuleRichText {...moduleRichText} />;
};
