import type { CorePageProps } from "@/types/page";
import type { ReactElement } from "react";
import { useMemo } from "react";
import { BaseLayout } from "@/layouts/base-layout";
import type { GetStaticPaths, GetStaticProps } from "next";
import { prefetchRaceSeriesPage } from "@/lib/contentful/pages/prefetch-race-series-page";
import { usePageRaceSeriesQuery } from "@/components/contentful/page-race-series/__generated/page-race-series.contentful.generated";
import { useRouter } from "next/router";
import { PageRaceSeriesGraphql } from "@/components/contentful/page-race-series/page-race-series.graphql";
import { getStaticPropsForPage } from "@/lib/contentful/get-static-props-for-page";
import { PageSeo } from "@/components/contentful/seo-metadata/page-seo";

type RaceSeriesPageDynamicPathParams = {
    race: string;
};

type RaceSeriesPageProps = CorePageProps;

const RaceSeriesPage = ({ pageId, siteSettingsId, localeSlugMap }: RaceSeriesPageProps) => {
    const { locale, isPreview: preview } = useRouter();

    const { data } = usePageRaceSeriesQuery(
        {
            id: pageId,
            locale: locale!,
            preview,
        },
        {
            ...(!preview && { staleTime: Infinity }),
        }
    );

    const seo = useMemo(() => {
        return {
            title: String(data?.page?.title),
            description: data?.page?.seoMetaDescription,
            openGraphImage: data?.page?.heroAsset,
            noindex: data?.page?.robotIndex,
            nofollow: data?.page?.robotFollow,
        };
    }, [
        data?.page?.heroAsset,
        data?.page?.robotFollow,
        data?.page?.robotIndex,
        data?.page?.seoMetaDescription,
        data?.page?.title,
    ]);

    return (
        <>
            <PageSeo {...seo} siteSettingsId={siteSettingsId} localeSlugMap={localeSlugMap} />
            <PageRaceSeriesGraphql id={pageId} locale={locale!} preview={preview} />
        </>
    );
};

RaceSeriesPage.getLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>;

export const getStaticProps: GetStaticProps<
    RaceSeriesPageProps,
    RaceSeriesPageDynamicPathParams
> = async ({ params, locale, draftMode }) => {
    if (!params?.race) {
        return { notFound: true };
    }

    const pageProps = await getStaticPropsForPage({
        locale: locale!,
        preview: Boolean(draftMode),
        queryHook: usePageRaceSeriesQuery,
        prefetcher: prefetchRaceSeriesPage,
        slug: params.race,
    });

    if (!pageProps) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            ...pageProps,
        },
        revalidate: 60,
    };
};

export const getStaticPaths: GetStaticPaths<RaceSeriesPageDynamicPathParams> = async () => {
    return {
        paths: [],
        fallback: "blocking",
    };
};

export default RaceSeriesPage;
