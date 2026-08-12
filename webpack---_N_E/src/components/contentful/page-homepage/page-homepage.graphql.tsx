import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import type { CoreGraphqlEntryProps } from "@/types/page";
import { usePageHomepageQuery } from "@/components/contentful/page-homepage/__generated/page-homepage.contentful.generated";
import { PageHomepage } from "@/components/contentful/page-homepage/page-homepage";

type PageHomepageGraphqlProps = CoreGraphqlEntryProps;

export const PageHomepageGraphql = ({ id, locale, preview }: PageHomepageGraphqlProps) => {
    const { data, isLoading } = usePageHomepageQuery(
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

    const page = useContentfulLiveUpdates(data?.page, { locale });

    if (isLoading || !page) {
        return null;
    }

    return <PageHomepage {...page} />;
};
