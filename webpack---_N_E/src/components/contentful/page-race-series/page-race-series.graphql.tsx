import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import type { CoreGraphqlEntryProps } from "@/types/page";
import { usePageRaceSeriesQuery } from "@/components/contentful/page-race-series/__generated/page-race-series.contentful.generated";
import { PageRaceSeries } from "@/components/contentful/page-race-series/page-race-series";

type PageRaceSeriesGraphqlProps = CoreGraphqlEntryProps;

export const PageRaceSeriesGraphql = ({ id, locale, preview }: PageRaceSeriesGraphqlProps) => {
    const { data, isLoading } = usePageRaceSeriesQuery(
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

    return <PageRaceSeries {...page} />;
};
