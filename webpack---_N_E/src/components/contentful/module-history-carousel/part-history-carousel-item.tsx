import { memo, useEffect, useId, useState } from "react";
import { useRouter } from "next/router";
import type { PartHistoryCarouselItemFieldsFragment } from "@/components/contentful/module-history-carousel/__generated/module-history-carousel.contentful.generated";
import {
    AiAssetTag,
    Box,
    CldPicture,
    DetailsCard,
    FORCE_AI_TAG,
    getAiGenerationType,
    hasCloudinaryAsset,
    isCloudinaryImage,
    MotionBox,
    NdlHeading,
    YearCounter,
} from "@project/ui";
import { useAppStore } from "@/store/app-store";
import { PAGMSHEvents, PAGMSHModuleNames, sendPagDataToGTM } from "@/lib/google-tag-manager/events";
import {
    historyCarouselDefaultCrop,
    historyCarouselPictureSources,
    historyCarouselRatioSx,
    historyDetailsCardOffsetSx,
} from "@/components/contentful/module-history-carousel/history-carousel-ratios.config";
import breakpoints from "@project/ui/src/design-tokens/09.breakpoints/breakpoints";

/** Details-card image height (px). Short phones use a shorter image so text gets more room. */
const DETAILS_CARD_IMAGE_HEIGHT_DEFAULT = 180;
const DETAILS_CARD_IMAGE_HEIGHT_SHORT = 120;

/** Slide width tracks the swiper `slidesPerView` switch at `md` (1.1 → 1.3 slides),
 *  i.e. ~91vw below `md` and ~77vw at/above it. Kept in sync via the `md` token. */
const HISTORY_IMAGE_SIZES = `(min-width: ${breakpoints.md}) 77vw, 91vw`;

export type PartHistoryCarouselItemProps = PartHistoryCarouselItemFieldsFragment & {
    isActive?: boolean;
    isDesktop?: boolean;
    /** True on short viewports — shortens the details-card image so text gets more room. */
    isShortViewport?: boolean;
    reducedMotion?: boolean;
    counterStartDelayMs?: number;
    /** Only the first visible slide should set this to true */
    isPriority?: boolean;
    /** Eagerly load this slide's image (a neighbour of the active slide) to avoid pop-in on scrub. */
    preload?: boolean;
};

function getScaleAnimateValue(reducedMotion: boolean, isActive: boolean) {
    if (reducedMotion || isActive) return { scale: 1 };
    return { scale: 1.08 };
}

function getOverlayAnimate(reducedMotion: boolean, isActive: boolean, isDesktop: boolean) {
    const opacity = isActive ? 1 : 0;
    if (reducedMotion) return { opacity };
    if (isDesktop) {
        return { opacity, filter: isActive ? "blur(0px)" : "blur(8px)" };
    }
    const scale = isActive ? 1 : 0.92;
    return { opacity, scale };
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export const PartHistoryCarouselItem = memo(function PartHistoryCarouselItem({
    startYear,
    endYear,
    asset,
    isActive = false,
    isDesktop = false,
    isShortViewport = false,
    reducedMotion = false,
    counterStartDelayMs = 0,
    isPriority = false,
    preload = false,
    title,
    subtitle,
    description,
    thumbnailAsset,
    detailsAsset,
}: PartHistoryCarouselItemProps) {
    const [detailsOpen, setDetailsOpen] = useState(false);
    // Declared up here because the asset guards below return early.
    const aiTagId = useId();

    const { locale } = useRouter();
    const {
        state: { pageType, pageId, pageContentTags },
    } = useAppStore();

    useEffect(() => {
        if (!isActive) setDetailsOpen(false);
    }, [isActive]);

    const handleDetailsOpenChange = (open: boolean) => {
        sendPagDataToGTM({
            eventAction: PAGMSHEvents.historyDetailsCardToggle,
            locale: locale!,
            pageExperience: {
                pageCategory: pageType,
                contentTags: pageContentTags ?? [],
            },
            context: {
                moduleName: PAGMSHModuleNames.historySection,
            },
            componentClick: {
                clickElementType: "interaction",
                clickElementId: pageId,
                clickElementName: `${open ? "Open" : "Close"}: ${title}`,
            },
        });

        setDetailsOpen(open);
    };

    if (!hasCloudinaryAsset(asset) || !isCloudinaryImage(asset)) {
        return null;
    }

    const aiGenerationType = getAiGenerationType(asset) ?? FORCE_AI_TAG;
    const showCounter = startYear != null && endYear != null && endYear > startYear;
    const showDetailsCard = title != null;
    const shouldAnimate = isActive && !reducedMotion;

    const detailsCardImageHeight = isShortViewport
        ? DETAILS_CARD_IMAGE_HEIGHT_SHORT
        : DETAILS_CARD_IMAGE_HEIGHT_DEFAULT;

    // Eagerly load neighbours of the active slide to avoid pop-in on scrub.
    // The priority slide is handled by CldPicture's own priority/loading logic,
    // so eager here is safe (and desirable) even for that image.
    const imageLoading = preload ? "eager" : undefined;

    const desktopWillChange = isDesktop ? "opacity, filter" : "transform, opacity";
    const overlayWillChange = shouldAnimate ? desktopWillChange : "auto";

    return (
        <Box width="100%" overflow="hidden" sx={historyCarouselRatioSx}>
            <Box position="relative" width="100%" height="100%" minHeight={0} overflow="hidden">
                <Box position="absolute" inset={0}>
                    <MotionBox
                        width="100%"
                        height="100%"
                        position="relative"
                        initial={reducedMotion ? false : { scale: 1.08 }}
                        animate={getScaleAnimateValue(reducedMotion, isActive)}
                        transition={{
                            duration: reducedMotion ? 0 : 0.6,
                            ease: [0.35, 0.1, 0.2, 1],
                            delay: reducedMotion ? 0 : 0.2,
                        }}
                        sx={{ willChange: shouldAnimate ? "transform" : "auto" }}
                    >
                        <CldPicture
                            cloudinaryAsset={asset}
                            sources={historyCarouselPictureSources}
                            defaultCrop={historyCarouselDefaultCrop}
                            defaultWidths={[640, 750, 828, 1080, 1200, 1920]}
                            sizes={HISTORY_IMAGE_SIZES}
                            priority={isPriority}
                            loading={imageLoading}
                            hideAiTag
                            imgAriaDescribedBy={aiGenerationType ? aiTagId : undefined}
                        />
                    </MotionBox>
                    {aiGenerationType && (
                        <AiAssetTag id={aiTagId} type={aiGenerationType} kind="image" />
                    )}
                </Box>
                <MotionBox
                    position="absolute"
                    inset={0}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    pointerEvents="none"
                    initial={false}
                    animate={getOverlayAnimate(reducedMotion, isActive, isDesktop)}
                    transition={{
                        duration: reducedMotion ? 0 : 0.35,
                        ease: "easeOut",
                    }}
                    sx={{
                        willChange: overlayWillChange,
                    }}
                >
                    <NdlHeading
                        size="display"
                        color="allWhite"
                        as="span"
                        sx={{ fontVariantNumeric: "tabular-nums" }}
                    >
                        {showCounter ? (
                            <YearCounter
                                startYear={startYear}
                                endYear={endYear}
                                isActive={isActive}
                                startDelayMs={counterStartDelayMs}
                            />
                        ) : (
                            startYear
                        )}
                    </NdlHeading>
                </MotionBox>
                {showDetailsCard && (
                    <Box position="absolute" pointerEvents="auto" sx={historyDetailsCardOffsetSx}>
                        <DetailsCard
                            title={title}
                            subtitle={subtitle ?? undefined}
                            description={description ?? undefined}
                            thumbnailAsset={thumbnailAsset}
                            detailsAsset={detailsAsset}
                            isOpen={detailsOpen}
                            onOpenChange={handleDetailsOpenChange}
                            imageHeight={detailsCardImageHeight}
                            preloadMedia={isActive}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
});
