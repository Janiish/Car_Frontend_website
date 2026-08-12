import { NextSeo } from "next-seo";
import type { ContentfulCloudinaryAssetField } from "@project/ui";
import { useRouter } from "next/router";
import { useSiteSettingsQuery } from "@/lib/contentful/site-settings/__generated/site-settings.contentful.generated";
import { useMemo } from "react";
import { getCanonicalUrl, isRobotNoFollow, isRobotNoIndex } from "@/common/helpers/seo";
import {
    getLanguageAlternates,
    getLanguageAlternatesFromMap,
    OPEN_GRAPH_IMAGE_HEIGHT,
    OPEN_GRAPH_IMAGE_WIDTH,
    resolveOpenGraphImage,
} from "@/components/contentful/seo-metadata/utils";
import { usePathname } from "next/navigation";

type PageSeoProps = {
    title?: string | null;
    description?: string | null;
    openGraphImage?: ContentfulCloudinaryAssetField | null;
    noindex?: string | null;
    nofollow?: string | null;
    themeColor?: string;
    siteSettingsId: string;
    localeSlugMap?: Record<string, string>;
};

export const PageSeo = ({
    title,
    description,
    openGraphImage,
    siteSettingsId,
    noindex,
    nofollow,
    themeColor = "#FFFFFF",
    localeSlugMap,
}: PageSeoProps) => {
    const pathname = usePathname();

    const { locale, locales, defaultLocale, isPreview: preview } = useRouter();

    const { data } = useSiteSettingsQuery(
        {
            id: siteSettingsId,
            locale: locale!,
            preview,
        },
        {
            ...(!preview && { staleTime: Infinity }),
        }
    );

    const computedSeoProperties = useMemo(() => {
        const _title = title ?? data?.siteSettings?.seoDefaultMetaTitle;
        const _description = description ?? data?.siteSettings?.seoDefaultMetaDescription;

        const _openGraphAsset = openGraphImage || data?.siteSettings?.seoDefaultOpenGraphImage;

        const _openGraphImage = resolveOpenGraphImage(_openGraphAsset, openGraphImage);

        const _nofollow = nofollow ?? data?.siteSettings?.seoDefaultRobotFollow ?? "follow";
        const _noindex = noindex ?? data?.siteSettings?.seoDefaultRobotIndex ?? "index";

        const normalizedPathname = pathname === "/" ? "" : pathname;
        const _canonical = getCanonicalUrl(
            defaultLocale === locale ? pathname : `/${locale}${normalizedPathname}`
        );

        const languageAlternates = localeSlugMap
            ? getLanguageAlternatesFromMap(localeSlugMap, defaultLocale!)
            : getLanguageAlternates(locales!, defaultLocale!, pathname);

        return {
            title: String(_title),
            description: String(_description),
            openGraphImage: _openGraphImage,
            languageAlternates,
            nofollow: isRobotNoFollow(_nofollow),
            noindex: isRobotNoIndex(_noindex),
            canonical: _canonical,
        };
    }, [
        title,
        data?.siteSettings?.seoDefaultMetaTitle,
        data?.siteSettings?.seoDefaultMetaDescription,
        data?.siteSettings?.seoDefaultOpenGraphImage,
        data?.siteSettings?.seoDefaultRobotFollow,
        data?.siteSettings?.seoDefaultRobotIndex,
        description,
        openGraphImage,
        nofollow,
        noindex,
        defaultLocale,
        locale,
        pathname,
        locales,
        localeSlugMap,
    ]);

    return (
        <NextSeo
            title={computedSeoProperties.title}
            description={computedSeoProperties.description}
            nofollow={computedSeoProperties.nofollow}
            noindex={computedSeoProperties.noindex}
            canonical={computedSeoProperties.canonical}
            languageAlternates={computedSeoProperties.languageAlternates}
            themeColor={themeColor}
            twitter={{
                cardType: "summary_large_image",
            }}
            openGraph={{
                type: "website",
                title: computedSeoProperties.title,
                description: computedSeoProperties.description,
                ...(computedSeoProperties.openGraphImage && {
                    images: [
                        {
                            url: computedSeoProperties.openGraphImage,
                            alt: computedSeoProperties.description,
                            width: OPEN_GRAPH_IMAGE_WIDTH,
                            height: OPEN_GRAPH_IMAGE_HEIGHT,
                        },
                    ],
                }),
                locale,
                siteName: "Porsche Motorsport Hub",
                url: computedSeoProperties.canonical,
            }}
        />
    );
};
