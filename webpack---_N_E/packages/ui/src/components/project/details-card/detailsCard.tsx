import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";

/** useLayoutEffect warns during SSR; fall back to useEffect on the server. */
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import {
    AspectRatio,
    BlurRevealTextAnimation,
    NdlHeading,
    NdlSurface,
    NdlText,
    NdlIconButton,
    hasCloudinaryAsset,
    isCloudinaryImage,
    isCloudinaryVideo,
    MotionBox,
    type IconName,
} from "@project/ui";
import type { ContentfulCloudinaryAssetField } from "../../../cloudinary/cld-types";
import { CldImage } from "../../../cloudinary/cld-image";
import { CldVideoLite } from "../../../cloudinary/cld-video-player/cld-video-lite";
import { VisuallyHidden } from "../../chakra-ui/visually-hidden";

const DURATION = 0.7;
const EASE = [0, 0.34, 0.58, 1];
const EASE_FAST = [0, 0.58, 0, 0];
const SUBTITLE_BLUR_DURATION = 0.25;

/** Open: same timing as thumbnail / image / header column so width and subtitle height stay in sync. */
const SUBTITLE_OPEN_TRANSITION = { duration: DURATION, ease: EASE };

const SUBTITLE_CLOSE_TRANSITION = {
    default: { duration: SUBTITLE_BLUR_DURATION, ease: EASE_FAST },
    height: { duration: DURATION, ease: EASE_FAST },
};

const DEFAULT_IMAGE_HEIGHT = 180;
const THUMBNAIL_WIDTH = 78;
const CARD_PADDING = 4;
/** Collapsed subtitle slot height; open height comes from content measurement (auto → px). */
const SUBTITLE_SLOT_COLLAPSED_HEIGHT_PX = 18;

type CardAnimates = {
    thumbnail: { width: number };
    thumbnailInner: { x: number; opacity: number };
    imageWrapper: { height: number };
    image: { y: number; scale: number };
};

/** `imageHeight` feeds the media slide/reveal, so animates are built per instance. */
function getCardAnimates(isOpen: boolean, imageHeight: number): CardAnimates {
    if (isOpen) {
        return {
            thumbnail: { width: 0 },
            thumbnailInner: { x: -THUMBNAIL_WIDTH, opacity: 0 },
            imageWrapper: { height: imageHeight + CARD_PADDING * 4 },
            image: { y: 0, scale: 1 },
        };
    }
    return {
        thumbnail: { width: THUMBNAIL_WIDTH },
        thumbnailInner: { x: 0, opacity: 1 },
        imageWrapper: { height: 0 },
        image: { y: imageHeight, scale: 0.7 },
    };
}

function getMediaWrapperAnimate(hasDetailsMedia: boolean, animates: CardAnimates) {
    if (hasDetailsMedia) return animates.imageWrapper;
    return { height: 0 };
}

function getDetailsCardDerivedState(
    isOpen: boolean,
    thumbnailAsset: ContentfulCloudinaryAssetField | undefined,
    detailsAsset: ContentfulCloudinaryAssetField | undefined,
    imageHeight: number
) {
    const hasThumbnail = !!(
        hasCloudinaryAsset(thumbnailAsset) && isCloudinaryImage(thumbnailAsset)
    );
    const hasDetailsImage = !!(hasCloudinaryAsset(detailsAsset) && isCloudinaryImage(detailsAsset));
    const hasDetailsVideo = !!(hasCloudinaryAsset(detailsAsset) && isCloudinaryVideo(detailsAsset));
    const hasDetailsMedia = hasDetailsImage || hasDetailsVideo;
    const animates = getCardAnimates(isOpen, imageHeight);
    return {
        toggleIcon: (isOpen ? "zoom-in" : "zoom-out") as IconName,
        hasThumbnail,
        hasDetailsImage,
        hasDetailsVideo,
        hasDetailsMedia,
        animates,
        mediaWrapperAnimate: getMediaWrapperAnimate(hasDetailsMedia, animates),
        subtitleSlotTransition: isOpen ? SUBTITLE_OPEN_TRANSITION : SUBTITLE_CLOSE_TRANSITION,
    };
}

type SubtitleSlotContentProps = {
    subtitle?: string;
    description?: string;
    isOpen: boolean;
    subtitleConcealDone: boolean;
    onSubtitleConcealComplete: () => void;
};

type SubtitleSlotProps = {
    subtitle?: string;
    description?: string;
    isOpen: boolean;
    subtitleConcealDone: boolean;
    onSubtitleConcealComplete: () => void;
    slotTransition: object;
};

function SubtitleSlot({
    subtitle,
    description,
    isOpen,
    subtitleConcealDone,
    onSubtitleConcealComplete,
    slotTransition,
}: Readonly<SubtitleSlotProps>) {
    const contentMeasureRootRef = useRef<HTMLDivElement>(null);
    const [openHeightPx, setOpenHeightPx] = useState(SUBTITLE_SLOT_COLLAPSED_HEIGHT_PX);

    useEffect(() => {
        if (!isOpen) {
            setOpenHeightPx(SUBTITLE_SLOT_COLLAPSED_HEIGHT_PX);
        }
    }, [isOpen]);

    useIsomorphicLayoutEffect(() => {
        if (!isOpen) return;
        const contentRoot = contentMeasureRootRef.current;
        if (!contentRoot) return;
        const updateAnimatedHeightFromContent = () => {
            setOpenHeightPx(Math.max(SUBTITLE_SLOT_COLLAPSED_HEIGHT_PX, contentRoot.scrollHeight));
        };
        updateAnimatedHeightFromContent();
        const resizeObserver = new ResizeObserver(updateAnimatedHeightFromContent);
        resizeObserver.observe(contentRoot);
        return () => resizeObserver.disconnect();
    }, [isOpen, subtitle, description, subtitleConcealDone]);

    const showSlot = !!subtitle || isOpen;
    if (!showSlot) return null;

    const targetHeight = isOpen ? openHeightPx : SUBTITLE_SLOT_COLLAPSED_HEIGHT_PX;

    return (
        <MotionBox
            initial={false}
            animate={{ height: targetHeight }}
            transition={slotTransition}
            overflow="hidden"
        >
            <Box ref={contentMeasureRootRef} w="100%">
                <SubtitleSlotContent
                    subtitle={subtitle}
                    description={description}
                    isOpen={isOpen}
                    subtitleConcealDone={subtitleConcealDone}
                    onSubtitleConcealComplete={onSubtitleConcealComplete}
                />
            </Box>
        </MotionBox>
    );
}

function SubtitleSlotContent({
    subtitle = "",
    description = "",
    isOpen,
    subtitleConcealDone,
    onSubtitleConcealComplete,
}: Readonly<SubtitleSlotContentProps>) {
    const [isMobile] = useMediaQuery("(max-width: 767px)", { ssr: true, fallback: false });
    const showSubtitleClosed = !isOpen && !!subtitle;
    const hasDescription = !!description;
    const openWithDescription = isOpen && hasDescription;
    const showSubtitleConcealing = openWithDescription && !subtitleConcealDone && !!subtitle;
    const showDescriptionReveal = openWithDescription;
    const descriptionVisibility: "visible" | "hidden" =
        !hasDescription || showDescriptionReveal ? "visible" : "hidden";

    // The word-by-word reveal splits text into many inline-block spans, which
    // screen readers traverse erratically (partial reads, last-word-first when
    // navigating back). Expose one clean, in-order copy of the currently shown
    // text to assistive tech and mark the animated spans as decorative so the
    // description/subtitle is announced coherently.
    const accessibleText = isOpen ? description : subtitle;

    return (
        <NdlText color="grey200" as="div" pb={CARD_PADDING} position="relative">
            {!!accessibleText && <VisuallyHidden as="span">{accessibleText}</VisuallyHidden>}
            <Box aria-hidden="true">
                {isOpen && (
                    <>
                        <Box
                            height="auto"
                            visibility={descriptionVisibility}
                            sx={{ textWrap: "pretty" }}
                        >
                            <BlurRevealTextAnimation
                                animate={showDescriptionReveal ? "visible" : "hidden"}
                                disableBlur={isMobile}
                            >
                                {description}
                            </BlurRevealTextAnimation>
                        </Box>
                        {/* Layer 2 (absolute on top): subtitle conceals, then we reveal description above */}
                        {showSubtitleConcealing && (
                            <Box position="absolute" top={0} left={0} width="100%">
                                <BlurRevealTextAnimation
                                    reverse
                                    animate="visible"
                                    onAnimationComplete={onSubtitleConcealComplete}
                                    disableBlur={isMobile}
                                >
                                    {subtitle}
                                </BlurRevealTextAnimation>
                            </Box>
                        )}
                    </>
                )}
                {/* When closed: subtitle in flow */}
                {showSubtitleClosed && (
                    <Box>
                        <BlurRevealTextAnimation reverse animate="hidden" disableBlur={isMobile}>
                            {subtitle}
                        </BlurRevealTextAnimation>
                    </Box>
                )}
            </Box>
        </NdlText>
    );
}

export type DetailsCardProps = {
    title: string;
    subtitle?: string;
    description?: string;
    thumbnailAsset?: ContentfulCloudinaryAssetField;
    detailsAsset?: ContentfulCloudinaryAssetField;
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
    defaultOpen?: boolean;
    /**
     * Accessible name for the toggle button. When omitted, a descriptive,
     * state-aware label is derived from `title` (e.g. "Show details about X" /
     * "Hide details about X") so screen readers announce what is being toggled.
     */
    toggleButtonAriaLabel?: string;
    /** Height (px) of the details media when open. Lower on short viewports to free room for text. */
    imageHeight?: number;
    /** External open-intent signal (e.g. "this is the active carousel slide") — upgrades the nested media to eager/warm even before hover/focus/open. */
    preloadMedia?: boolean;
    style?: React.CSSProperties;
};

export const DetailsCard = ({
    title,
    subtitle,
    description,
    thumbnailAsset,
    detailsAsset,
    isOpen: controlledOpen,
    onOpenChange,
    defaultOpen = false,
    toggleButtonAriaLabel,
    imageHeight = DEFAULT_IMAGE_HEIGHT,
    preloadMedia,
    style,
}: DetailsCardProps) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const [subtitleConcealDone, setSubtitleConcealDone] = useState(false);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
    // One-way hover/focus intent latch: once a user shows intent to open this
    // card, its media preloads for the rest of the card's lifetime — cheap
    // (one card at a time in practice) and avoids flip-flopping the network
    // priority on every pointer move in/out.
    const [intent, setIntent] = useState(false);
    const markIntent = () => setIntent(true);
    const effectivePreload = Boolean(preloadMedia) || intent || isOpen;
    const cardRef = useRef<HTMLDivElement>(null);

    // Disclosure pattern: the button controls the revealed details region.
    // Give that region a stable id so `aria-controls` can point at it, and
    // derive a state-aware accessible name so screen readers announce what is
    // being toggled (falls back to the caller-supplied label when provided).
    const detailsRegionId = `details-card-region-${useId()}`;
    const resolvedToggleAriaLabel =
        toggleButtonAriaLabel ??
        (isOpen ? `Hide details about ${title}` : `Show details about ${title}`);

    useEffect(() => {
        if (!isOpen) setSubtitleConcealDone(false);
    }, [isOpen]);

    const close = useCallback(() => {
        if (!isControlled) setUncontrolledOpen(false);
        onOpenChange?.(false);
    }, [isControlled, onOpenChange]);

    useEffect(() => {
        if (!isOpen) return;
        const handlePointerDown = (e: PointerEvent) => {
            if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
                close();
            }
        };
        document.addEventListener("pointerdown", handlePointerDown, true);
        return () => document.removeEventListener("pointerdown", handlePointerDown, true);
    }, [isOpen, close]);

    const handleToggle = () => {
        const next = !isOpen;
        if (!isControlled) setUncontrolledOpen(next);
        onOpenChange?.(next);
    };

    const {
        toggleIcon,
        hasThumbnail,
        hasDetailsVideo,
        hasDetailsMedia,
        animates,
        mediaWrapperAnimate,
        subtitleSlotTransition,
    } = getDetailsCardDerivedState(isOpen, thumbnailAsset, detailsAsset, imageHeight);

    return (
        <NdlSurface
            ref={cardRef}
            data-details-card
            data-open={isOpen ? true : undefined}
            size="card"
            colorScheme="black"
            position="relative"
            overflow="hidden"
            p={0}
            pt={CARD_PADDING}
            pr={CARD_PADDING}
            backdropFilter="auto"
            backdropBlur="ndlFrostedGlassLow"
            width={{ base: "100%", md: "330px" }}
            minHeight={20}
            onClick={isOpen ? undefined : handleToggle}
            onPointerEnter={markIntent}
            onFocusCapture={markIntent}
            cursor={isOpen ? "default" : "pointer"}
            style={style}
        >
            <Flex flexDirection="column" width="100%">
                <Flex alignItems={subtitle ? "start" : "center"} width="100%">
                    {hasThumbnail && (
                        <MotionBox
                            initial={false}
                            animate={animates.thumbnail}
                            transition={{ duration: DURATION, ease: EASE }}
                            overflow="hidden"
                            flexShrink={0}
                        >
                            <MotionBox
                                initial={false}
                                animate={animates.thumbnailInner}
                                transition={{ duration: DURATION, ease: EASE }}
                                width={`${THUMBNAIL_WIDTH}px`}
                                pl={CARD_PADDING}
                                overflow="visible"
                                position="relative"
                            >
                                <AspectRatio ratio="16:9" width="100%" mt={1}>
                                    <CldImage
                                        cloudinaryAsset={thumbnailAsset}
                                        sizes="150px"
                                        objectFit="contain"
                                        wrapperProps={{ borderRadius: 0 }}
                                    />
                                </AspectRatio>
                            </MotionBox>
                        </MotionBox>
                    )}

                    <MotionBox
                        flex={1}
                        flexDirection="column"
                        pl={CARD_PADDING}
                        initial={false}
                        w="100%"
                        animate={{ paddingTop: isOpen ? 62 : 0, paddingRight: isOpen ? 0 : 64 }}
                        transition={{ duration: DURATION, ease: EASE }}
                    >
                        <NdlHeading size="headerS" color="allWhite" mb={1} letterSpacing="-0.67%">
                            {title}
                        </NdlHeading>

                        <SubtitleSlot
                            subtitle={subtitle ?? undefined}
                            description={description ?? undefined}
                            isOpen={isOpen}
                            subtitleConcealDone={subtitleConcealDone}
                            onSubtitleConcealComplete={() => setSubtitleConcealDone(true)}
                            slotTransition={subtitleSlotTransition}
                        />
                    </MotionBox>

                    {/* Single toggle: in row when closed, top-right when open (avoids remount flicker). */}
                    <MotionBox
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        flexShrink={0}
                        position={"absolute"}
                        top={CARD_PADDING}
                        right={CARD_PADDING}
                        zIndex={1}
                        sx={{
                            "[data-details-card]:not([data-open]):hover & button": {
                                backgroundColor: "ndlTransparencyGreyHover",
                            },
                        }}
                    >
                        <NdlIconButton
                            icon={toggleIcon}
                            ariaLabel={resolvedToggleAriaLabel}
                            ariaControlsId={detailsRegionId}
                            ariaExpanded={isOpen}
                            onClick={handleToggle}
                            size={12}
                            backgroundColor="ndlTransparencyGrey"
                            hoverBackgroundColor="ndlTransparencyGreyHover"
                            iconTheme="dark"
                        />
                    </MotionBox>
                </Flex>

                {/* Details media — always mounted; slides in from the bottom of its clipping wrapper. If no details asset, wrapper keeps height CARD_PADDING with nothing inside. */}
                <MotionBox
                    id={detailsRegionId}
                    aria-hidden={!isOpen}
                    initial={false}
                    animate={mediaWrapperAnimate}
                    transition={{ duration: DURATION, ease: EASE }}
                    overflow="hidden"
                    position="relative"
                    borderRadius="ndlRadiusCard"
                    width="100%"
                    flexShrink={0}
                    pl={CARD_PADDING}
                >
                    {hasDetailsMedia && (
                        <MotionBox
                            initial={false}
                            animate={animates.image}
                            transition={{ duration: DURATION, ease: EASE }}
                            height={`${imageHeight}px`}
                            overflow="hidden"
                            position="relative"
                        >
                            {hasDetailsVideo ? (
                                <CldVideoLite
                                    cloudinaryAsset={detailsAsset}
                                    wrapperProps={{
                                        position: "absolute",
                                        inset: 0,
                                        overflow: "hidden",
                                        borderRadius: "ndlRadiusCard",
                                    }}
                                    loop
                                    warm={effectivePreload}
                                />
                            ) : (
                                <CldImage
                                    cloudinaryAsset={detailsAsset}
                                    alt={title}
                                    sizes="(max-width: 768px) 296px, 330px"
                                    objectFit="cover"
                                    crop="fill"
                                    wrapperProps={{ borderRadius: "ndlRadiusCard" }}
                                    loading={effectivePreload ? "eager" : undefined}
                                />
                            )}
                        </MotionBox>
                    )}
                </MotionBox>
            </Flex>
        </NdlSurface>
    );
};
