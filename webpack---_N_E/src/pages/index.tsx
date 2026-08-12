import type { CorePageProps } from "@/types/page";
import type { ReactElement } from "react";
import { useMemo } from "react";
import { useRouter } from "next/router";
import type { GetStaticProps } from "next";
import { PageSeo } from "@/components/contentful/seo-metadata/page-seo";
import { BaseLayout } from "@/layouts/base-layout";
import { usePageHomepageQuery } from "@/components/contentful/page-homepage/__generated/page-homepage.contentful.generated";
import { useNewPageHomepageQuery } from "@/components/contentful/new-page-homepage/__generated/page-homepage.contentful.generated";
import { useCustomNewPageHomepageQuery } from "@/components/contentful/new-page-homepage/custom-query";
import { PageHomepageGraphql } from "@/components/contentful/page-homepage/page-homepage.graphql";
import { NewPageHomepageGraphql } from "@/components/contentful/new-page-homepage/page-homepage.graphql";
import { getStaticPropsForHomepage } from "@/lib/contentful/get-static-props-for-homepage";
import { getStaticPropsForNewHomepage } from "@/lib/contentful/get-static-props-for-new-homepage";
import { prefetchNewHomepagePage } from "@/lib/contentful/pages/prefetch-new-homepage-page";

type HomepagePageProps = CorePageProps;

const HomepagePage = ({ pageId, siteSettingsId, pageType, localeSlugMap }: HomepagePageProps) => {
    const { locale, isPreview: preview } = useRouter();

    const isNewHomepage = pageType === "NewPageHomepage";

    const { data: pageHomepageData } = usePageHomepageQuery(
        {
            id: pageId,
            locale: locale!,
            preview,
        },
        {
            enabled: !isNewHomepage,
            ...(!preview && { staleTime: Infinity }),
        }
    );

    const { data: newHomepageData } = useCustomNewPageHomepageQuery(
        {
            id: pageId,
            locale: locale!,
            preview,
        },
        { enabled: isNewHomepage }
    );

    const seo = useMemo(() => {
        if (isNewHomepage) {
            return {
                title: String(newHomepageData?.page?.title),
                description: newHomepageData?.page?.seoMetaDescription,
                openGraphImage: newHomepageData?.page?.openGraphImage,
                noindex: newHomepageData?.page?.robotIndex,
                nofollow: newHomepageData?.page?.robotFollow,
            };
        }

        return {
            title: String(pageHomepageData?.page?.title),
            description: pageHomepageData?.page?.seoMetaDescription,
            openGraphImageHero: pageHomepageData?.page?.heroAsset,
            openGraphImage: pageHomepageData?.page?.openGraphImage,
            noindex: pageHomepageData?.page?.robotIndex,
            nofollow: pageHomepageData?.page?.robotFollow,
        };
    }, [isNewHomepage, newHomepageData, pageHomepageData]);

    return (
        <>
            <PageSeo {...seo} siteSettingsId={siteSettingsId} localeSlugMap={localeSlugMap} />
            {isNewHomepage ? (
                <NewPageHomepageGraphql id={pageId} locale={locale!} preview={preview} />
            ) : (
                <PageHomepageGraphql id={pageId} locale={locale!} preview={preview} />
            )}
        </>
    );
};

HomepagePage.getLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>;

export const getStaticProps: GetStaticProps<HomepagePageProps> = async ({ locale, draftMode }) => {
    const preview = Boolean(draftMode);

    /**
     * Gradual rollout: when the new homepage is published for this locale (evaluated
     * per-locale via Contentful locale-based publishing), serve it on the root URL.
     * In preview/draft mode we keep serving the existing homepage; editors preview the
     * new homepage at /new-homepage. Remove this branch once every market is live.
     */
    if (!preview) {
        const newHomepageProps = await getStaticPropsForNewHomepage({
            locale: locale!,
            preview: false,
            queryHook: useNewPageHomepageQuery,
            prefetcher: prefetchNewHomepagePage,
            microcopySetKeys: ["moduleCarTechSpecs"],
            localeBasedPublishing: true,
        });

        if (newHomepageProps) {
            return {
                props: {
                    ...newHomepageProps,
                },
                revalidate: 60,
            };
        }
    }

    const pageProps = await getStaticPropsForHomepage({
        locale: locale!,
        preview,
        microcopySetKeys: [],
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

export default HomepagePage;
