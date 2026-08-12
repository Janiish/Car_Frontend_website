import { useQuery } from "@tanstack/react-query";
import type {
    NewPageHomepageCarsQuery,
    NewPageHomepageCarsQueryVariables,
    NewPageHomepageCarsSectionFieldsFragment,
    NewPageHomepageFieldsFragment,
    NewPageHomepageQueryVariables,
} from "@/components/contentful/new-page-homepage/__generated/page-homepage.contentful.generated";
import {
    NewPageHomepageCarsDocument,
    NewPageHomepageDocument,
} from "@/components/contentful/new-page-homepage/__generated/page-homepage.contentful.generated";
import { customFetcher } from "@/lib/contentful/fetch-config";
import { decorateCloudinaryAssetsWithBlur } from "@/lib/cloudinary/blur-data-url";
import type {
    AllPageArticleCollectionByContentTagQuery,
    AllPageArticleCollectionByContentTagQueryVariables,
} from "@/components/contentful/page-article/__generated/page-article.contentful.generated";
import { AllPageArticleCollectionByContentTagDocument } from "@/components/contentful/page-article/__generated/page-article.contentful.generated";
import type { CoreGraphqlEntryProps } from "@/types/page";

type NewPageHomepageCustomQuery = {
    __typename?: "Query";
    page?:
        | ({ __typename?: "NewPageHomepage" } & NewPageHomepageFieldsFragment &
              NewPageHomepageCarsSectionFieldsFragment & {
                  newsPages: AllPageArticleCollectionByContentTagQuery["pages"] | null;
              })
        | null;
};

const NEWS_ARTICLES_LIMIT = 15;

type ArticleItem = NonNullable<
    NonNullable<AllPageArticleCollectionByContentTagQuery["pages"]>["items"][number]
>;

/**
 * Fetches articles for each content tag separately, then round-robin interleaves
 * them so every tag gets equal visibility within the limited carousel window.
 */
const fetchInterleavedArticlesByTag = async ({
    tags,
    locale,
    preview,
    headers,
}: {
    tags: string[];
    locale: string;
    preview?: boolean | null;
    headers?: RequestInit["headers"];
}): Promise<AllPageArticleCollectionByContentTagQuery["pages"] | null> => {
    const perTagResults = await Promise.all(
        tags.map((tag) =>
            customFetcher<
                AllPageArticleCollectionByContentTagQuery,
                AllPageArticleCollectionByContentTagQueryVariables
            >(
                AllPageArticleCollectionByContentTagDocument,
                {
                    tags: [tag],
                    locale,
                    preview,
                    limit: NEWS_ARTICLES_LIMIT,
                },
                headers
            )()
        )
    );

    const buckets = perTagResults
        .map((r) => r.pages?.items.filter((item): item is ArticleItem => item !== null) ?? [])
        .filter((bucket) => bucket.length > 0);

    if (buckets.length === 0) return null;

    const interleaved: ArticleItem[] = [];
    const seenIds = new Set<string>();
    const maxLen = Math.max(...buckets.map((b) => b.length));

    for (let i = 0; i < maxLen && interleaved.length < NEWS_ARTICLES_LIMIT; i++) {
        for (const bucket of buckets) {
            if (i >= bucket.length || interleaved.length >= NEWS_ARTICLES_LIMIT) continue;
            const item = bucket[i];
            if (seenIds.has(item.sys.id)) continue;
            seenIds.add(item.sys.id);
            interleaved.push(item);
        }
    }

    if (interleaved.length === 0) return null;

    return {
        __typename: "PageArticleCollection",
        total: interleaved.length,
        skip: 0,
        limit: NEWS_ARTICLES_LIMIT,
        items: interleaved,
    };
};

const fetchHomepageAndNewsArticles = async ({
    queryKey,
    headers,
}: {
    queryKey: [string, NewPageHomepageQueryVariables];
    headers?: RequestInit["headers"];
}): Promise<NewPageHomepageCustomQuery> => {
    const [, { id, locale, preview }] = queryKey;

    const [homepageData, carsData] = await Promise.all([
        customFetcher<
            {
                __typename?: "Query";
                page?: ({ __typename?: "NewPageHomepage" } & NewPageHomepageFieldsFragment) | null;
            },
            NewPageHomepageQueryVariables
        >(NewPageHomepageDocument, { id, locale, preview }, headers)(),
        customFetcher<NewPageHomepageCarsQuery, NewPageHomepageCarsQueryVariables>(
            NewPageHomepageCarsDocument,
            { id, locale, preview },
            headers
        )(),
    ]);

    let tags: string[] | undefined;

    if (homepageData.page?.newsSectionContentTagsCollection?.items) {
        tags = homepageData.page.newsSectionContentTagsCollection.items
            .map((tag) => tag?.tagKey)
            .filter((tag): tag is string => tag !== null && tag !== undefined);
    }

    let newsPages: AllPageArticleCollectionByContentTagQuery["pages"] | null = null;

    if (tags && tags.length > 0) {
        newsPages = await fetchInterleavedArticlesByTag({ tags, locale, preview, headers });
    }

    return {
        __typename: "Query",
        page: homepageData.page
            ? await decorateCloudinaryAssetsWithBlur({
                  ...homepageData.page,
                  ...(carsData.page ?? {}),
                  newsPages,
              })
            : null,
    };
};

export const useCustomNewPageHomepageQuery = (
    { id, locale, preview }: CoreGraphqlEntryProps,
    options?: { enabled?: boolean }
) => {
    return useQuery({
        queryKey: ["NewPageHomepage", { id, locale, preview }],
        queryFn: () =>
            fetchHomepageAndNewsArticles({
                queryKey: ["NewPageHomepage", { id, locale, preview }],
            }),
        ...(!preview && { staleTime: Infinity }),
        refetchOnWindowFocus: false,
        enabled: options?.enabled ?? true,
    });
};

useCustomNewPageHomepageQuery.getKey = (variables: NewPageHomepageQueryVariables) => [
    "NewPageHomepage",
    variables,
];

useCustomNewPageHomepageQuery.fetcher =
    (variables: NewPageHomepageQueryVariables, headers?: RequestInit["headers"]) => () =>
        fetchHomepageAndNewsArticles({ queryKey: ["NewPageHomepage", variables], headers });
