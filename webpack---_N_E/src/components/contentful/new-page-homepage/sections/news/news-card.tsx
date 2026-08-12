import { memo, useId } from "react";
import { useRouter } from "next/router";
import {
    Box,
    HStack,
    VStack,
    LinkBox,
    LinkOverlay,
    NdlIcon,
    NdlButton,
    NdlHeading,
    NextLink,
    CldImage,
    CldVideoLite,
    hasCloudinaryAsset,
    isCloudinaryVideo,
    getPosterUrl,
    type ContentfulCloudinaryAssetField,
} from "@project/ui";
import type {
    PageArticleLinkToFieldsFragment,
    PageBasicLinkToFieldsFragment,
    PageCarLinkToFieldsFragment,
    PageDriverLinkToFieldsFragment,
    PageRaceEventLinkToFieldsFragment,
    PageRaceSeriesLinkToFieldsFragment,
    PageTeamLinkToFieldsFragment,
} from "@/lib/contentful/link-fragments/__generated/link-fragments.contentful.generated";
import type { ModuleImageFieldsFragment } from "@/components/contentful/module-image/__generated/module-image.contentful.generated";
import breakpoints from "@project/ui/src/design-tokens/09.breakpoints/breakpoints";
import { Subtitle } from "@/components/subtitle";
import { getHrefForPageType } from "@/common/helpers/slug";
import { useAppStore } from "@/store/app-store";
import { PAGMSHEvents, PAGMSHModuleNames, sendPagDataToGTM } from "@/lib/google-tag-manager/events";

export type NewsCardItem =
    | PageArticleLinkToFieldsFragment
    | PageBasicLinkToFieldsFragment
    | PageCarLinkToFieldsFragment
    | PageDriverLinkToFieldsFragment
    | PageRaceEventLinkToFieldsFragment
    | PageRaceSeriesLinkToFieldsFragment
    | PageTeamLinkToFieldsFragment
    | ModuleImageFieldsFragment;

export type NewsCardSize = "large" | "medium" | "small";

const CARD_SIZE_RATIO: Record<NewsCardSize, string> = {
    large: "3:4",
    medium: "3:2",
    small: "1:1",
};

// Below `md` every card renders in the mobile carousel at ~92vw; the fixed px
// widths only apply once the desktop marquee mounts at >=`md`. The breakpoint
// here must match that layout switch (`isDesktopMd`), otherwise viewports between
// the old 768px guess and `md` under-fetch (declare the small fixed size but
// render near-full-width). Reuse the `md` token so the two never drift apart.
const CARD_SIZE_RESPONSIVE_SIZES: Record<NewsCardSize, string> = {
    large: `(min-width: ${breakpoints.md}) 424px, 92vw`,
    medium: `(min-width: ${breakpoints.md}) 457px, 92vw`,
    small: `(min-width: ${breakpoints.md}) 220px, 92vw`,
};

type NewsCardProps = {
    item: NewsCardItem;
    cardSize?: NewsCardSize;
    /** When true, renders a static image instead of video for clone cards in marquee */
    disableVideo?: boolean;
    /** Image loading strategy. Callers preload neighbouring carousel slides by passing "eager". */
    imageLoading?: "lazy" | "eager";
};

const getAsset = (item: NewsCardItem | null): ContentfulCloudinaryAssetField => {
    switch (item?.__typename) {
        case "PageDriver":
            return item?.driver?.asset;
        case "PageTeam":
            return item?.team?.asset;
        case "ModuleImage":
            return item?.asset;
        default:
            return item?.heroAsset;
    }
};

const getTitle = (item: NonNullable<NewsCardItem>): string | null | undefined => {
    if (item.__typename === "ModuleImage") {
        return item.title;
    }
    return item.linkTitle ?? item.title;
};

const OVERLAY_GRADIENT = `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%)`;
const LINE_CLAMP_SX = {
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
} as const;

function CardMedia({
    asset,
    cardSize,
    disableVideo,
    imageLoading,
}: Readonly<{
    asset: ContentfulCloudinaryAssetField;
    cardSize: NewsCardSize;
    disableVideo: boolean;
    imageLoading: "lazy" | "eager";
}>) {
    if (isCloudinaryVideo(asset)) {
        if (disableVideo) {
            return (
                <Box
                    as="img"
                    src={getPosterUrl(asset)}
                    alt=""
                    loading={imageLoading}
                    position="absolute"
                    width="100%"
                    height="100%"
                    inset={0}
                    objectFit="cover"
                />
            );
        }
        return (
            <CldVideoLite
                cloudinaryAsset={asset}
                wrapperProps={{ position: "absolute" }}
                loop
                aria-hidden="true"
            >
                <track kind="captions" srcLang="en" label="English" src="data:text/vtt,WEBVTT" />
            </CldVideoLite>
        );
    }

    return (
        <CldImage
            cloudinaryAsset={asset}
            sizes={CARD_SIZE_RESPONSIVE_SIZES[cardSize]}
            crop={{
                type: "thumb",
                aspectRatio: CARD_SIZE_RATIO[cardSize],
            }}
            fill
            loading={imageLoading}
        />
    );
}

const NewsCard = memo(function NewsCard({
    item,
    cardSize = "large",
    disableVideo = false,
    imageLoading = "lazy",
}: NewsCardProps) {
    const ariaId = useId();
    const asset = getAsset(item);
    const { locale } = useRouter();
    const {
        state: { pageType, pageId, pageContentTags },
    } = useAppStore();

    if (!item) {
        return null;
    }

    const isModuleImage = item.__typename === "ModuleImage";
    const title = getTitle(item);
    const isLinkable = !isModuleImage;
    const href = isLinkable ? getHrefForPageType(item) : undefined;
    const CardWrapper = isLinkable ? LinkBox : Box;

    const handleCardClick = () => {
        sendPagDataToGTM({
            eventAction: PAGMSHEvents.linkClick,
            locale: locale!,
            pageExperience: {
                pageCategory: pageType,
                contentTags: pageContentTags ?? [],
            },
            context: {
                moduleName: PAGMSHModuleNames.newsSection,
            },
            componentClick: {
                clickElementType: "navigation",
                clickElementId: pageId,
                clickElementName: `Card ${item.__typename}: ${title ?? ""}`,
                targetUrl: href,
                targetType: "internal",
            },
        });
    };

    return (
        <CardWrapper
            data-group
            position="relative"
            overflow="hidden"
            borderRadius="ndlRadiusMedium"
            width="full"
            height="full"
            {...(isLinkable && { cursor: "pointer" })}
        >
            {hasCloudinaryAsset(asset) && (
                <Box position="absolute" inset={0} zIndex={0}>
                    <CardMedia
                        asset={asset}
                        cardSize={cardSize}
                        disableVideo={disableVideo}
                        imageLoading={imageLoading}
                    />
                </Box>
            )}

            <Box position="absolute" inset={0} zIndex={1} bgGradient={OVERLAY_GRADIENT} />

            <VStack
                position="relative"
                zIndex={2}
                width="full"
                height="full"
                justifyContent="space-between"
                p={4}
            >
                <HStack justifyContent="space-between" alignItems="start" width="full">
                    {isLinkable && (
                        <NdlButton
                            aria-labelledby={ariaId}
                            onClick={() => {}}
                            variant="icon"
                            size="large"
                            colorScheme="grey"
                            tabIndex={-1}
                            marginLeft="auto"
                        >
                            <NdlIcon name="arrow-right-up" />
                        </NdlButton>
                    )}
                </HStack>

                <VStack pb={2} alignItems="start" justifyContent="start" mr="auto" gap={0.5}>
                    {!isModuleImage && <Subtitle item={item} size="caption" color="grey200" />}
                    {isLinkable && href ? (
                        <LinkOverlay
                            as={NextLink}
                            href={href}
                            id={ariaId}
                            onClick={handleCardClick}
                            {...(title && { title: title })}
                        >
                            <NdlHeading
                                size="headerM"
                                color="allWhite"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                sx={LINE_CLAMP_SX}
                            >
                                {title}
                            </NdlHeading>
                        </LinkOverlay>
                    ) : (
                        title && (
                            <NdlHeading
                                size="headerM"
                                color="allWhite"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                sx={LINE_CLAMP_SX}
                            >
                                {title}
                            </NdlHeading>
                        )
                    )}
                </VStack>
            </VStack>
        </CardWrapper>
    );
});

NewsCard.displayName = "NewsCard";

export { NewsCard };
