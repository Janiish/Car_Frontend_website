import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import type { CoreGraphqlEntryProps } from "@/types/page";
import { useCustomNewPageHomepageQuery } from "@/components/contentful/new-page-homepage/custom-query";
import { NewPageHomepage } from "@/components/contentful/new-page-homepage/page-homepage";

type NewPageHomepageGraphqlProps = CoreGraphqlEntryProps;

export const NewPageHomepageGraphql = ({ id, locale, preview }: NewPageHomepageGraphqlProps) => {
    const { data, isLoading } = useCustomNewPageHomepageQuery({ id, locale, preview });

    const page = useContentfulLiveUpdates(data?.page, { locale });

    if (isLoading || !page) {
        return null;
    }

    return <NewPageHomepage {...page} newsPages={data?.page?.newsPages ?? null} />;
};
