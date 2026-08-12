import type { ContentfulCloudinaryAssetField } from "@project/ui";
import { getCldOgImageUrl } from "@project/ui";
import { getCanonicalUrl } from "@/common/helpers/seo";

export const OPEN_GRAPH_IMAGE_WIDTH = 1200;
export const OPEN_GRAPH_IMAGE_HEIGHT = 630;

export const resolveOpenGraphImage = (
    openGraphAsset: ContentfulCloudinaryAssetField,
    openGraphImage?: ContentfulCloudinaryAssetField
) => {
    // Prioritize openGraphImage if provided and valid
    const assetToUse = openGraphImage?.[0]?.public_id ? openGraphImage : openGraphAsset;

    if (!assetToUse?.[0]?.public_id) {
        return null;
    }

    // Base transformations
    let transformations = "";

    // Handle video (either from heroAsset or openGraphImage)
    if (assetToUse[0].resource_type === "video") {
        transformations = "so_0.0,c_fill,ar_16:9,g_auto:subject";
    }

    return getCldOgImageUrl({
        src: assetToUse[0].public_id,
        assetType: assetToUse[0].resource_type ?? "image",
        format: "jpg",
        quality: "auto",
        rawTransformations: transformations,
    });
};

export const getLanguageAlternates = (
    locales: readonly string[],
    defaultLocale: string,
    path: string
) => {
    const normalizedPath = path === "/" ? "" : path;

    return locales.map((locale) => {
        const url = [
            `https://${process.env.NEXT_PUBLIC_HOSTNAME}`,
            locale === defaultLocale ? path || "/" : `/${locale}${normalizedPath}`,
        ].join("");

        return {
            hrefLang: locale === defaultLocale ? "x-default" : locale,
            href: url,
        };
    });
};

export const getLanguageAlternatesFromMap = (
    localeSlugMap: Record<string, string>,
    defaultLocale: string
) => {
    const results: Array<{ hrefLang: string; href: string }> = [];

    for (const [locale, path] of Object.entries(localeSlugMap)) {
        const normalizedPath = path.endsWith("/") ? path.slice(0, -1) : path;

        const href =
            locale === defaultLocale
                ? getCanonicalUrl(normalizedPath || "/")
                : getCanonicalUrl(`/${locale}${normalizedPath}`);

        if (locale === defaultLocale) {
            results.push({ hrefLang: "x-default", href });
            results.push({ hrefLang: locale, href });
        } else {
            results.push({ hrefLang: locale, href });
        }
    }

    return results;
};
