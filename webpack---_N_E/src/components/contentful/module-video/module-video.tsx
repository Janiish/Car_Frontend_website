import {
    Box,
    hasCloudinaryAsset,
    isCloudinaryVideo,
    hasYoutubeVideo,
    AspectRatio,
    Grid,
    GridItem,
} from "@project/ui";
import dynamic from "next/dynamic";
import ReactPlayer from "react-player";
import type { ModuleVideoFieldsFragment } from "./__generated/module-video.contentful.generated";
import { ModuleSpacer } from "@/components/module-spacer";
import { Title } from "@/components/title";
import { Description } from "@/components/description";
import { useEffect, useMemo, useRef, useState } from "react";
import { useUsercentrics } from "@/components/user-centrics/usercentrics-provider";
import { porscheUsercentricsKnownProcessorNames } from "@/components/user-centrics/known-processor-names";
import { useRouter } from "next/router";
import { useAppStore } from "@/store/app-store";
import { PAGMSHEvents, handleVideoTracking } from "@/lib/google-tag-manager/events";
import { VideoControls } from "@/components/video-controls";
import {
    gridTemplateColumns,
    gridGap,
    rteEndColWide,
    rteStartColWide,
} from "@project/ui/src/theme/global-styles";

const CldVideoPlayerProvider = dynamic(() =>
    import("@project/ui").then((mod) => mod.CldVideoPlayerProvider)
);
const CldVideo = dynamic(() => import("@project/ui").then((mod) => mod.CldVideo));

export type ModuleVideoProps = ModuleVideoFieldsFragment & {
    moduleIndex?: number | null;
    isEmbedded?: boolean;
};

export const ModuleVideo = (props: ModuleVideoProps) => {
    const {
        mediaAsset,
        description,
        title,
        youtubeUrl,
        autoplay,
        moduleIndex,
        __typename,
        isEmbedded = false,
    } = props;

    const [youtubeIframeSrc, setYoutubeIframeSrc] = useState<string | null>(null);

    const youtubeWrappingContainerRef = useRef<HTMLDivElement>(null);

    const isYoutubeVideo = useMemo(() => {
        return hasYoutubeVideo(youtubeUrl);
    }, [youtubeUrl]);

    const { consentGiven, isLoaded, checkConsent } = useUsercentrics();

    useEffect(() => {
        if (!isLoaded) {
            return;
        }

        const consentGivenForYoutube = consentGiven.get(
            porscheUsercentricsKnownProcessorNames.youtubeVideo
        );

        if (consentGivenForYoutube?.consentStatus === true) {
            hasYoutubeVideo(youtubeUrl) && setYoutubeIframeSrc(youtubeUrl);
        } else {
            if (!youtubeWrappingContainerRef.current) {
                return;
            }

            setYoutubeIframeSrc(null);

            checkConsent({
                mapContainer: [youtubeWrappingContainerRef],
                processor: porscheUsercentricsKnownProcessorNames.youtubeVideo,
                successCallback: () => {
                    hasYoutubeVideo(youtubeUrl) && setYoutubeIframeSrc(youtubeUrl);
                },
            });
        }
    }, [youtubeUrl, isLoaded, consentGiven, checkConsent]);

    const { locale } = useRouter();
    const {
        state: { pageId, pageContentTags, pageType },
    } = useAppStore();

    const handleOnClickTracking = (
        eventActionProp: (typeof PAGMSHEvents)[keyof typeof PAGMSHEvents]
    ) => {
        handleVideoTracking({
            eventAction: eventActionProp,
            locale: locale!,
            pageCategory: pageType,
            contentTags: pageContentTags,
            moduleName: __typename,
            modulePosition: moduleIndex ?? 0,
            clickElementType: "interaction",
            clickElementId: pageId,
            clickElementName: youtubeIframeSrc ?? title ?? "",
        });
    };

    return (
        <ModuleSpacer className="ModuleVideo">
            <Grid templateColumns={gridTemplateColumns} gap={gridGap}>
                <GridItem
                    colStart={{ base: 1, l: isEmbedded ? rteStartColWide : 1 }}
                    colEnd={{
                        base: 3,
                        l: isEmbedded ? rteEndColWide : 13,
                    }}
                >
                    {title && (
                        <Box mb={{ base: 6, l: 8 }} color={"porscheBlack"} maxW="40rem">
                            <Title>{title}</Title>
                            {description && (
                                <Description mt={{ base: 4, l: 6 }}>{description}</Description>
                            )}
                        </Box>
                    )}
                    <AspectRatio ratio={["9:16", "16:9"]}>
                        {isYoutubeVideo ? (
                            <Box
                                ref={youtubeWrappingContainerRef}
                                borderRadius={12}
                                bg="porscheBlack"
                            >
                                {youtubeIframeSrc && (
                                    <ReactPlayer
                                        url={youtubeIframeSrc}
                                        controls={true}
                                        width="100%"
                                        height="100%"
                                        onPlay={() =>
                                            handleOnClickTracking(
                                                PAGMSHEvents.videoIframePlay_Click
                                            )
                                        }
                                    />
                                )}
                            </Box>
                        ) : (
                            <Box borderRadius={12} position="relative" w="full" h="full">
                                <CldVideoPlayerProvider
                                    muted={autoplay ?? false}
                                    autoplay={autoplay ?? false}
                                >
                                    {hasCloudinaryAsset(mediaAsset) &&
                                        isCloudinaryVideo(mediaAsset) && (
                                            <>
                                                <CldVideo
                                                    cloudinaryAsset={mediaAsset}
                                                    wrapperProps={{
                                                        position: "absolute",
                                                        w: "full",
                                                        h: "full",
                                                    }}
                                                    playsinline
                                                    preload="auto"
                                                    inViewAutoplay={autoplay}
                                                />
                                                <VideoControls onClick={handleOnClickTracking} />
                                            </>
                                        )}
                                </CldVideoPlayerProvider>
                            </Box>
                        )}
                    </AspectRatio>
                </GridItem>
            </Grid>
        </ModuleSpacer>
    );
};
