import { useEffect, useId, useMemo, useRef, useCallback } from "react";
import type {
    DashboardPageArticleFieldsFragment,
    DashboardPageBasicFieldsFragment,
    DashboardPageCarFieldsFragment,
    DashboardPageCategoryFieldsFragment,
    DashboardPageDriverFieldsFragment,
    DashboardPageRaceEventFieldsFragment,
    DashboardPageRaceSeriesFieldsFragment,
    DashboardPageTeamFieldsFragment,
} from "./__generated/dashboard.contentful.generated";
import {
    Box,
    CldImage,
    CldVideoLite,
    type ContentfulCloudinaryAssetField,
    hasCloudinaryAsset,
    HStack,
    isCloudinaryVideo,
    LinkBox,
    LinkOverlay,
    type MotionBoxProps,
    NdlButton,
    NdlHeading,
    NdlIcon,
    NdlText,
    NextLink,
    VStack,
} from "@project/ui";
import { useRouter } from "next/router";
import { type measureElementIds } from "./dashboard-layout-context";
import { useAppStore } from "@/store/app-store";
import { useMicrocopy } from "@/lib/contentful/microcopy/microcopy-context";
import { MotionNdlSurface, MotionVStack } from "./motion-primitives";
import { getHrefForPageType } from "@/common/helpers/slug";
import { DashboardAnimatedContainer } from "./dashboard-animated-container";
import { Subtitle } from "@/components/subtitle";
import { PAGMSHEvents, PAGMSHModuleNames, sendPagDataToGTM } from "@/lib/google-tag-manager/events";

type DashboardGridCardProps = MotionBoxProps & {
    item:
        | ({ __typename?: "PageArticle" } & DashboardPageArticleFieldsFragment)
        | ({ __typename?: "PageBasic" } & DashboardPageBasicFieldsFragment)
        | ({ __typename?: "PageCar" } & DashboardPageCarFieldsFragment)
        | ({ __typename?: "PageCategory" } & DashboardPageCategoryFieldsFragment)
        | ({ __typename?: "PageDriver" } & DashboardPageDriverFieldsFragment)
        | ({ __typename?: "PageRaceEvent" } & DashboardPageRaceEventFieldsFragment)
        | ({ __typename?: "PageRaceSeries" } & DashboardPageRaceSeriesFieldsFragment)
        | ({ __typename?: "PageTeam" } & DashboardPageTeamFieldsFragment)
        | null;
    ratio: "1:1" | "16:9" | "9:16";
    targetContainerId: Exclude<
        (typeof measureElementIds)[keyof typeof measureElementIds],
        "widget-launcher"
    >;
};

const overlayGradientStyle = `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%)`;

export const getAsset = (item: DashboardGridCardProps["item"]): ContentfulCloudinaryAssetField => {
    switch (item?.__typename) {
        case "PageDriver":
            return item?.driver?.asset;
        case "PageTeam":
            return item?.team?.asset;
        default:
            return item?.heroAsset;
    }
};

const LiveNowBadge = () => {
    const { get: getMicrocopy } = useMicrocopy();

    return (
        <Box
            bg="ndlTransparencyBlack"
            color="allWhite"
            p={2}
            rounded="ndlRadiusSmall"
            display="flex"
            alignItems="center"
            gap={2.5}
            backdropFilter="auto"
            backdropBlur="ndlFrostedGlassHigh"
        >
            <Box w={1.5} h={1.5} bg="motorsportsRed" rounded="full" />
            <NdlText size="caption">{getMicrocopy("global", "label.liveNow")}</NdlText>
        </Box>
    );
};

const DashboardGridCard = ({
    item,
    ratio,
    targetContainerId,
    ...props
}: DashboardGridCardProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const { locale } = useRouter();
    const {
        state: { isDashboardOpen, pageType, pageId, pageContentTags },
    } = useAppStore();

    const asset = useMemo(() => getAsset(item), [item]);

    const ariaId = useId();

    useEffect(() => {
        if (!isDashboardOpen) return;
        const video = videoRef.current;
        if (!video) return;
        // play() returns a Promise — always catch AbortError when src reloads / pause races.
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => undefined);
        }
    }, [isDashboardOpen]);

    const handleCardClick = useCallback(() => {
        if (!item) {
            return;
        }

        sendPagDataToGTM({
            eventAction: PAGMSHEvents.linkClick,
            locale: locale!,
            pageExperience: {
                pageCategory: pageType,
                contentTags: pageContentTags ?? [],
            },
            context: {
                moduleName: PAGMSHModuleNames.dashboard,
            },
            componentClick: {
                clickElementType: "navigation",
                clickElementId: pageId,
                clickElementName: `Card ${item.__typename}: ${item.title}`,
                targetUrl: getHrefForPageType(item),
                targetType: "internal",
            },
        });
    }, [item, locale, pageType, pageId, pageContentTags]);

    const canShowLiveNowBadge = useMemo(() => {
        if (item?.__typename !== "PageRaceEvent") {
            return false;
        }

        if (!item.event?.startDate || !item.event?.endDate) {
            return false;
        }

        const start = new Date(item.event.startDate);
        const end = new Date(item.event.endDate);
        const now = new Date();

        if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
            return false;
        }

        return start <= now && end > now;
    }, [item]);

    if (!item) {
        return null;
    }

    return (
        <DashboardAnimatedContainer
            targetContainerId={targetContainerId}
            onAnimationComplete={() => {
                if (isDashboardOpen) return;
                const video = videoRef.current;
                if (!video || video.paused) return;
                video.pause();
            }}
        >
            <MotionNdlSurface
                size="medium"
                colorScheme="black"
                width="full"
                height="full"
                p={0}
                {...props}
                cursor="pointer"
            >
                <LinkBox width="full" height="full" data-group>
                    {hasCloudinaryAsset(asset) && (
                        <Box position="absolute" inset={0} zIndex={0}>
                            {isCloudinaryVideo(asset) ? (
                                <CldVideoLite
                                    cloudinaryAsset={asset}
                                    wrapperProps={{ position: "absolute" }}
                                    loop
                                    ref={videoRef}
                                    aria-hidden="true"
                                >
                                    <track
                                        kind="captions"
                                        srcLang="en"
                                        label="English"
                                        src="data:text/vtt,WEBVTT"
                                    />
                                </CldVideoLite>
                            ) : (
                                <CldImage
                                    cloudinaryAsset={asset}
                                    sizes="30vw"
                                    crop={{
                                        type: "thumb",
                                        aspectRatio: ratio,
                                    }}
                                    fill
                                />
                            )}
                            <Box
                                position="absolute"
                                inset={0}
                                zIndex={1}
                                bgGradient={overlayGradientStyle}
                            />
                        </Box>
                    )}
                    <MotionVStack
                        position="relative"
                        zIndex={2}
                        width="full"
                        height="full"
                        justifyContent="space-between"
                        p={4}
                        initial={{
                            opacity: isDashboardOpen ? 1 : 0,
                        }}
                        animate={{
                            opacity: isDashboardOpen ? 1 : 0,
                        }}
                        transition={{
                            duration: 1.33 / 2,
                            delay: isDashboardOpen ? 1.33 / 2 : 0,
                        }}
                    >
                        <HStack justifyContent="space-between" alignItems="start" width="full">
                            {canShowLiveNowBadge && <LiveNowBadge />}
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
                        </HStack>
                        <VStack
                            pb={2}
                            alignItems="start"
                            justifyContent="start"
                            mr="auto"
                            gap={0.5}
                        >
                            <Subtitle item={item} color="grey200" />
                            <LinkOverlay
                                as={NextLink}
                                href={getHrefForPageType(item)}
                                id={ariaId}
                                onClick={handleCardClick}
                                {...(item.title && { title: item.title })}
                            >
                                <NdlHeading
                                    size="headerM"
                                    color="allWhite"
                                    overflow="hidden"
                                    textOverflow="ellipsis"
                                    sx={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: "2",
                                        WebkitBoxOrient: "vertical",
                                    }}
                                >
                                    {item.title}
                                </NdlHeading>
                            </LinkOverlay>
                        </VStack>
                    </MotionVStack>
                </LinkBox>
            </MotionNdlSurface>
        </DashboardAnimatedContainer>
    );
};

DashboardGridCard.displayName = "DashboardGridCard";

export { DashboardGridCard };
