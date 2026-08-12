import { DefaultSeo as NextSeoDefaultSeo } from "next-seo";
import type { DefaultSeoProps as $DefaultSeoProps } from "next-seo";
import { useSiteSettingsQuery } from "@/lib/contentful/site-settings/__generated/site-settings.contentful.generated";
import { useRouter } from "next/router";
import { getCanonicalUrl, isRobotNoFollow, isRobotNoIndex } from "@/common/helpers/seo";
import { useMemo } from "react";
import {
    OPEN_GRAPH_IMAGE_HEIGHT,
    OPEN_GRAPH_IMAGE_WIDTH,
    resolveOpenGraphImage,
} from "@/components/contentful/seo-metadata/utils";
import { usePathname } from "next/navigation";

export type DefaultSeoProps = $DefaultSeoProps & {
    siteSettingsId: string;
};

export const DefaultSeo = ({ siteSettingsId, ...defaultSeoProps }: DefaultSeoProps) => {
    const { locale, defaultLocale, isPreview: preview } = useRouter();
    const pathname = usePathname();

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

    const { title, description, openGraphImage, robotFollow, robotIndex, canonical } =
        useMemo(() => {
            const _openGraphAsset = data?.siteSettings?.seoDefaultOpenGraphImage;

            const _openGraphImage = resolveOpenGraphImage(_openGraphAsset);

            const canonical = getCanonicalUrl(
                defaultLocale === locale ? pathname : `/${locale}/${pathname}`
            );

            return {
                title: String(data?.siteSettings?.seoDefaultMetaTitle ?? ""),
                description: String(data?.siteSettings?.seoDefaultMetaDescription ?? ""),
                openGraphImage: _openGraphImage,
                robotIndex: String(data?.siteSettings?.seoDefaultRobotIndex ?? "noindex"),
                robotFollow: String(data?.siteSettings?.seoDefaultRobotFollow ?? "nofollow"),
                canonical,
            };
        }, [
            data?.siteSettings?.seoDefaultMetaDescription,
            data?.siteSettings?.seoDefaultMetaTitle,
            data?.siteSettings?.seoDefaultOpenGraphImage,
            data?.siteSettings?.seoDefaultRobotFollow,
            data?.siteSettings?.seoDefaultRobotIndex,
            defaultLocale,
            locale,
            pathname,
        ]);

    if (!data) {
        return null;
    }

    return (
        <NextSeoDefaultSeo
            {...defaultSeoProps}
            title={title}
            description={description}
            openGraph={{
                type: "website",
                title,
                description,
                ...(openGraphImage && {
                    images: [
                        {
                            url: openGraphImage,
                            alt: description,
                            width: OPEN_GRAPH_IMAGE_WIDTH,
                            height: OPEN_GRAPH_IMAGE_HEIGHT,
                        },
                    ],
                }),
                locale,
                url: canonical,
            }}
            canonical={canonical}
            {...(isRobotNoFollow(robotFollow) && {
                dangerouslySetAllPagesToNoFollow: true,
            })}
            {...(isRobotNoIndex(robotIndex) && {
                dangerouslySetAllPagesToNoIndex: true,
            })}
        />
    );
};
