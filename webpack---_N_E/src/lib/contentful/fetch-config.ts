export const fetchConfig = {
    endpoint: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}`,
    params: {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_CDA_API_ACCESS_TOKEN}`,
        },
    },
    previewParams: {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_CPA_API_ACCESS_TOKEN}`,
        },
    },
};

/**
 * Opt a query into Contentful's locale-based publishing behaviour, so the
 * publishing status is evaluated per-locale instead of entry-wide. Unpublished
 * locales resolve to null (fallback does not mask them).
 */
export const LOCALE_BASED_PUBLISHING_HEADER = {
    "X-Contentful-Locale-Based-Publishing": "true",
} as const;

export const customFetcher = <TData, TVariables extends { preview?: boolean | null }>(
    query: string,
    variables?: TVariables,
    options?: RequestInit["headers"]
) => {
    return async (): Promise<TData> => {
        const base = variables?.preview ? fetchConfig.previewParams : fetchConfig.params;

        const res = await fetch(fetchConfig.endpoint, {
            method: "POST",
            ...base,
            headers: {
                ...base.headers,
                ...options,
            },
            body: JSON.stringify({ query, variables }),
        });

        const json = await res.json();

        if (json.errors && !json.data) {
            const { message } = json.errors[0];

            throw new Error(message);
        }

        return json.data as TData;
    };
};
