import type { BoxProps } from "@project/ui";
import {
    Box,
    CldImage,
    CldVideo,
    CldVideoPlayerProvider,
    hasCloudinaryAsset,
    isCloudinaryVideo,
    Link,
    AspectRatio,
    Grid,
    GridItem,
    AI_TAG_OFFSET,
} from "@project/ui";
import { WrapperContainer } from "@/components/wrapper-container";
import { LinkWrapper } from "@/components/link-wrapper";
import { motion, useAnimation, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TemporaryPlayPauseButton } from "@/components/temporary-play-pause-button";
import { Title } from "@/components/title";
import { Description } from "@/components/description";
import type { ModuleMediaFeatureFieldsFragment } from "./contentful/module-media-feature/__generated/module-media-feature.contentful.generated";
import { ModuleSpacer } from "./module-spacer";
import {
    gridGap,
    gridTemplateColumns,
    rteEndColWide,
    rteStartColWide,
} from "@project/ui/src/theme/global-styles";

export type MediaFeatureProps = Omit<ModuleMediaFeatureFieldsFragment, "__typename" | "sys"> & {
    containerProps?: BoxProps;
    variant?: "full" | "embedded";
};

const GridLayout = ({
    children,
    variant = "full",
    ...props
}: BoxProps & { variant?: "full" | "embedded" }) => {
    return (
        <Grid templateColumns={gridTemplateColumns} gap={gridGap} {...props}>
            <GridItem
                gridColumn={{
                    base: "1 / span 2",
                    l: variant === "full" ? "1 / span 5" : "1 / span 6",
                }}
            >
                {children}
            </GridItem>
        </Grid>
    );
};

export const MediaFeature = (props: MediaFeatureProps) => {
    const {
        title,
        text,
        mediaAsset,
        link,
        linkLabel,
        link2,
        linkLabel2,
        designVariant,
        containerProps,
        variant = "full",
    } = props;

    const textControls = useAnimation();
    const designVariantValue = designVariant ?? "Tall";
    const imgRef = useRef(null);
    const textRef = useRef(null);
    const isTextInView = useInView(textRef, { once: true });
    const [hasAnimated, setHasAnimated] = useState(false);
    const isVideo = hasCloudinaryAsset(mediaAsset) && isCloudinaryVideo(mediaAsset);
    const aspectRatios = {
        tall: ["9:16", "16:9"],
        short: ["9:16", "21:9"],
    };
    const mediaWrapperProps = {
        position: "absolute" as const,
        borderRadius: variant === "embedded" ? "md" : "unset",
    };
    const fullVariantHeight = designVariantValue === "Tall" ? "100svh" : ["100svh", "60svh"];

    const { scrollYProgress } = useScroll({
        target: imgRef,
        offset: ["center center", "0 90vh"],
    });
    const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.8]);

    useEffect(() => {
        if (isTextInView && !hasAnimated) {
            textControls.start("visible");
            setHasAnimated(true);
        }
    }, [textControls, isTextInView, hasAnimated]);

    const renderMedia = () => {
        if (!hasCloudinaryAsset(mediaAsset)) return null;

        if (isVideo) {
            return (
                <CldVideoPlayerProvider autoplay muted loop>
                    <CldVideo
                        cloudinaryAsset={mediaAsset}
                        aiTagPosition={{ base: "top-left", md: "top-right" }}
                        aiTagOffset={AI_TAG_OFFSET.wrapperAligned}
                        wrapperProps={mediaWrapperProps}
                        loop
                    />
                    <TemporaryPlayPauseButton sx={{ zIndex: 3 }} />
                </CldVideoPlayerProvider>
            );
        }

        return (
            <CldImage
                cloudinaryAsset={mediaAsset}
                aiTagPosition={{ base: "top-left", md: "top-right" }}
                aiTagOffset={AI_TAG_OFFSET.wrapperAligned}
                priority={true}
                fill
                wrapperProps={mediaWrapperProps}
            />
        );
    };

    const renderGradientOverlay = () => (
        <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            opacity={[0.5, 0.7]}
            bgGradient={[
                "linear-gradient(to top, porscheBlack, porscheBlack)",
                "linear-gradient(to top, transparent, porscheBlack)",
            ]}
            zIndex={1}
            pointerEvents="none"
        />
    );

    const renderLink = (linkItem: typeof link, linkText: string | null | undefined) => {
        if (!linkItem) return null;

        const displayText =
            linkText ||
            ("linkTitle" in linkItem && linkItem.linkTitle) ||
            ("title" in linkItem && linkItem.title) ||
            ("label" in linkItem && linkItem.label);

        if (!displayText) return null;

        return (
            <LinkWrapper
                renderAs={Link}
                renderExternalLinkAs={Link}
                item={linkItem}
                icon="none"
                variant="ghost"
                theme="dark"
                width={["100%", "auto"]}
            >
                {displayText}
            </LinkWrapper>
        );
    };

    const renderLinks = () => (
        <Box display="flex" flexDir={["column", "row"]} gap={4} mt={variant === "embedded" ? 0 : 2}>
            {renderLink(link, linkLabel)}
            {renderLink(link2, linkLabel2)}
        </Box>
    );

    const renderContent = (options: { showLinks?: boolean } = {}) => {
        const { showLinks = false } = options;
        return (
            <Box
                width="100%"
                height="auto"
                zIndex={2}
                display="flex"
                flexDir="column"
                gap={4}
                justifyContent="flex-start"
                color="allWhite"
                pt={{ base: 12, md: 0 }}
            >
                {title && (
                    <Title size={variant === "full" ? "headingXLarge" : "headingMedium"} m={0}>
                        {title}
                    </Title>
                )}
                {text && <Description m={0}>{text}</Description>}
                {showLinks && renderLinks()}
            </Box>
        );
    };

    if (variant === "embedded") {
        const aspectRatio = designVariantValue === "Tall" ? aspectRatios.tall : aspectRatios.short;

        return (
            <ModuleSpacer>
                <Grid templateColumns={gridTemplateColumns} gap={gridGap}>
                    <GridItem
                        colStart={{ base: 1, l: rteStartColWide }}
                        colEnd={{
                            base: 3,
                            l: rteEndColWide,
                        }}
                    >
                        <AspectRatio ratio={aspectRatio} overflow="hidden" {...containerProps}>
                            <Box position="relative" w="100%" h="100%" borderRadius="large">
                                {renderMedia()}
                                {renderGradientOverlay()}
                                <GridLayout
                                    position="absolute"
                                    top="0"
                                    left="0"
                                    width="100%"
                                    height="100%"
                                    zIndex={2}
                                    p={6}
                                    variant="embedded"
                                >
                                    {renderContent({ showLinks: true })}
                                </GridLayout>
                            </Box>
                        </AspectRatio>
                    </GridItem>
                </Grid>
            </ModuleSpacer>
        );
    }

    return (
        <Box as={motion.div} ref={imgRef} style={{ scale, overflow: "hidden" }}>
            <Box position="relative" w="100vw" h={fullVariantHeight} {...containerProps}>
                {renderMedia()}
                {renderGradientOverlay()}
                <Box
                    position="absolute"
                    top="40vh"
                    left="0"
                    height="50%"
                    minHeight="100%"
                    zIndex={1}
                    ref={textRef}
                    pointerEvents="none"
                />
                <Box
                    position="absolute"
                    top={[6, 20]}
                    left="0"
                    zIndex={2}
                    width="100%"
                    h={["auto", "50svh"]}
                >
                    <WrapperContainer>
                        <Box
                            display="flex"
                            flexDir="column"
                            gap={4}
                            justifyContent="flex-start"
                            h="auto"
                        >
                            <GridLayout>
                                <motion.div
                                    animate={textControls}
                                    initial="hidden"
                                    variants={{
                                        visible: { opacity: 1, y: 0 },
                                        hidden: { opacity: 0, y: 20 },
                                    }}
                                    transition={{ duration: 1, ease: "anticipate", delay: 0.3 }}
                                >
                                    {renderContent({ showLinks: true })}
                                </motion.div>
                            </GridLayout>
                        </Box>
                    </WrapperContainer>
                </Box>
            </Box>
        </Box>
    );
};
