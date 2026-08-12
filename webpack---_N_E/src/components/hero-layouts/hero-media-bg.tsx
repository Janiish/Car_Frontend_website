import {
    Box,
    CldImage,
    Flex,
    Text,
    hasCloudinaryAsset,
    isCloudinaryVideo,
    mediaQueryMinWidth,
    Link,
    AI_TAG_OFFSET,
} from "@project/ui";
import { WrapperContainer } from "@/components/wrapper-container";
import dynamic from "next/dynamic";
import type {
    PageCarFieldsFragment,
    PageRaceEventFieldsFragment,
} from "@/lib/contentful/__generated/graphql.types";
import type { ReactNode } from "react";
import { HeroTitleComponent } from "./hero-title-component";
import { AnimatingWrapper } from "@/components/animating-wrapper";
import { useAppStore } from "@/store/app-store";
import { LinkWrapper } from "@/components/link-wrapper";
import type { PageRaceSeriesFieldsFragment } from "@/components/contentful/page-race-series/__generated/page-race-series.contentful.generated";
import type { PageHomepageFieldsFragment } from "@/components/contentful/page-homepage/__generated/page-homepage.contentful.generated";
import { DashboardWidgetLauncher } from "@/components/contentful/dashboard/dashboard-widget-launcher";

const CldVideoPlayerProvider = dynamic(() =>
    import("@project/ui").then((mod) => mod.CldVideoPlayerProvider)
);
const CldVideo = dynamic(() => import("@project/ui").then((mod) => mod.CldVideo));
const CldVideoTogglePlay = dynamic(() =>
    import("@project/ui").then((mod) => mod.CldVideoTogglePlay)
);

type ModuleTypes =
    | PageRaceEventFieldsFragment
    | PageCarFieldsFragment
    | PageRaceSeriesFieldsFragment
    | PageHomepageFieldsFragment;

type HeroMediaBgProps = ModuleTypes & {
    primaryComponent?: ReactNode;
    overTitleComponent?: ReactNode;
};
export const HeroMediaBg = (props: HeroMediaBgProps) => {
    const { title, subtitle, link, linkLabel, heroAsset, primaryComponent, overTitleComponent } =
        props;

    const {
        state: { hasLiveTicker, dashboardId },
    } = useAppStore();

    // Don't elevate hero Box z-index - this would elevate ALL hero content above overlay
    // Instead, only the launcher itself will be elevated via its own z-index

    return (
        <CldVideoPlayerProvider autoplay muted loop>
            <Box
                position="relative"
                w="100%"
                h={hasLiveTicker ? "screenHeightWithLiveTicker" : "100svh"}
                overflow="hidden"
            >
                {hasCloudinaryAsset(heroAsset) && (
                    <>
                        {isCloudinaryVideo(heroAsset) ? (
                            <>
                                <CldVideoTogglePlay
                                    mobile
                                    sx={{
                                        display: "flex",
                                        position: "absolute",
                                        right: "var(--space-5)",
                                        top: "var(--space-16)",
                                        zIndex: 2,
                                        [mediaQueryMinWidth.md]: {
                                            display: "none",
                                        },
                                    }}
                                />
                                <CldVideo
                                    cloudinaryAsset={heroAsset}
                                    aiTagPosition={{ base: "top-left", md: "top-right" }}
                                    aiTagOffset={AI_TAG_OFFSET.wrapperAlignedBelowNav}
                                    wrapperProps={{
                                        position: "absolute",
                                        zIndex: 0,
                                        borderRadius: "unset",
                                    }}
                                    loop
                                    playsinline
                                    preload="auto"
                                />
                            </>
                        ) : (
                            <CldImage
                                cloudinaryAsset={heroAsset}
                                aiTagPosition="top-right"
                                aiTagOffset={AI_TAG_OFFSET.wrapperAlignedBelowNav}
                                priority={true}
                                fill
                                wrapperProps={{
                                    position: "absolute",
                                    borderRadius: "unset",
                                }}
                                position="absolute"
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        )}
                    </>
                )}
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    minHeight="100%"
                    opacity={0.7}
                    bgGradient="linear-gradient(to bottom, transparent, porscheBlack)"
                    zIndex={0}
                />
                <Box position={"absolute"} bottom="0" left="0" width="100%">
                    <WrapperContainer>
                        <AnimatingWrapper>
                            <Flex
                                flexDir={{ base: "column", s: "row" }}
                                gap={{ base: 4, s: 8 }}
                                pb={{ base: 16, s: 20 }}
                                position="relative"
                            >
                                <Flex flexDir={"column"} justifyContent="end" flex={2} maxW="48rem">
                                    {/* This should be the mobile widget launcher, because on mobile it needs to be rendered above some text and cannot be positioned absolutely */}
                                    {dashboardId && (
                                        <DashboardWidgetLauncher
                                            heroHasVideoAsset={
                                                Boolean(hasCloudinaryAsset(heroAsset)) &&
                                                Boolean(isCloudinaryVideo(heroAsset))
                                            }
                                        />
                                    )}
                                    {overTitleComponent}
                                    <HeroTitleComponent title={title} isLight={false} />
                                    {subtitle && (
                                        <Text
                                            color={"allWhite"}
                                            mt={4}
                                            sx={{
                                                textWrap: "balance",
                                            }}
                                        >
                                            {subtitle}
                                        </Text>
                                    )}
                                    {link && (
                                        <LinkWrapper
                                            sx={{
                                                mt: "var(--space-4)",
                                                [mediaQueryMinWidth.md]: {
                                                    mt: "var(--space-8)",
                                                },
                                            }}
                                            renderAs={Link}
                                            item={link}
                                            theme="dark"
                                            alignSelf="start"
                                        >
                                            {linkLabel ?? null}
                                        </LinkWrapper>
                                    )}
                                </Flex>
                                <Flex
                                    alignItems="flex-end"
                                    justifyContent={{ base: "flex-start", s: "flex-end" }}
                                    flexDir={{ base: "column", ndlDashboardGrid: "row" }}
                                    w="100%"
                                    flex={1}
                                >
                                    <Flex alignItems="center">
                                        {primaryComponent}
                                        {hasCloudinaryAsset(heroAsset) &&
                                            isCloudinaryVideo(heroAsset) && (
                                                <CldVideoTogglePlay
                                                    sx={{
                                                        display: "none",
                                                        // marginLeft: "var(--space-10)",
                                                        [mediaQueryMinWidth.md]: {
                                                            display: "flex",
                                                        },
                                                    }}
                                                />
                                            )}
                                    </Flex>
                                </Flex>
                            </Flex>
                        </AnimatingWrapper>
                    </WrapperContainer>
                </Box>
            </Box>
        </CldVideoPlayerProvider>
    );
};
