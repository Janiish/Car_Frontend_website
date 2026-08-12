import type { TeamShaderConfig } from "@/components/contentful/new-page-homepage/sections/teams/animated-shader-background";
import type {
    NewPageHomepageFieldsFragment,
    TeamSectionGalleryFieldsFragment,
} from "@/components/contentful/new-page-homepage/__generated/page-homepage.contentful.generated";
import {
    TeamsCarousel,
    type TeamsCarouselHandle,
} from "@/components/contentful/new-page-homepage/sections/teams/teams-carousel";
import {
    Box,
    Flex,
    MotionBox,
    NdlToolbar,
    NdlLink,
    ScrollRevealTextAnimation,
    ScrollRevealTextAnimationContainer,
    FluidTypography,
} from "@project/ui";
import { getHrefForPageType } from "@/common/helpers/slug";
import { useAppStore } from "@/store/app-store";
import { PAGMSHEvents, PAGMSHModuleNames, sendPagDataToGTM } from "@/lib/google-tag-manager/events";
import colors from "@project/ui/src/design-tokens/01.colors/colors";
import { useHomepageBreakpoints, useHomepageMotionPref } from "../../homepage-responsive-context";
import { useState, useCallback, useEffect, useMemo, useRef, memo } from "react";
import { AnimatePresence, useMotionValueEvent } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { SECTION_IDS } from "../../configs/waypoints.config";
import { useEntryReveal } from "../../hooks/use-entry-reveal";
import { easeInOutSoft } from "../../configs/motion-tokens";

const AnimatedShaderBackground = dynamic(
    () =>
        import("@/components/contentful/new-page-homepage/sections/teams/animated-shader-background").then(
            (m) => m.AnimatedShaderBackground
        ),
    { ssr: false }
);

// ---------------------------------------------------------------------------
// Team theming
// ---------------------------------------------------------------------------

type TeamTheme = "crimson" | "violet" | "graphite";

const FALLBACK_THEME: TeamTheme = "graphite";

const sharedShaderSettings: Omit<TeamShaderConfig, "colors"> = {
    proportion: 0.3,
    softness: 1,
    distortion: 0.4,
    swirl: 0.8,
    swirlIterations: 4,
    shape: "edge",
    shapeScale: 0.2,
    speed: 2,
    scale: 2.45,
    rotation: 0,
};

type TeamThemeConfig = {
    highlightColor: string;
    highlightTextColor: string;
    shader: TeamShaderConfig;
};

const teamThemes: Record<TeamTheme, TeamThemeConfig> = {
    crimson: {
        highlightColor: colors.ndlMotorsportsRed,
        highlightTextColor: colors.allWhite,
        shader: { ...sharedShaderSettings, colors: ["#4b020c", "#1e0105", "#000000"] },
    },
    violet: {
        highlightColor: colors.ndlFormulaE,
        highlightTextColor: colors.allWhite,
        shader: { ...sharedShaderSettings, colors: ["#140727", "#140727", "#3b006b"] },
    },
    graphite: {
        highlightColor: colors.ndlCoanda,
        highlightTextColor: colors.porscheBlack,
        shader: { ...sharedShaderSettings, colors: ["#424242", "#141414", "#000000"] },
    },
};

const teamThemeLookup = new Map<string, TeamTheme>(
    (Object.keys(teamThemes) as TeamTheme[]).map((t) => [t.toLowerCase(), t])
);

function resolveTeamTheme(value: string | null | undefined): TeamTheme | undefined {
    if (!value) return undefined;
    return teamThemeLookup.get(value.toLowerCase());
}

// ---------------------------------------------------------------------------
// Teams selector
// ---------------------------------------------------------------------------

type TeamsSelectorProps = {
    teams: Array<{ teamName: string | null | undefined; slug: string | null | undefined }>;
    activeTeamIndex: number;
    onTeamChange: (index: number) => void;
    highlightColor: string;
    highlightTextColor: string;
};

const TeamsSelector = memo(function TeamsSelector({
    teams,
    activeTeamIndex,
    onTeamChange,
    highlightColor,
    highlightTextColor,
}: TeamsSelectorProps) {
    return (
        // Mobile: left-aligned within the 20px frame; desktop: centered.
        // Scrollable if the toolbar is wider than the viewport.
        <Flex justifyContent={{ base: "flex-start", l: "center" }} width="full">
            <NdlToolbar.Root
                activeIndex={activeTeamIndex}
                onActiveIndexChange={onTeamChange}
                highlightColor={highlightColor}
                highlightTextColor={highlightTextColor}
                className="scroll-fade-x"
                data-lenis-prevent-horizontal
            >
                <NdlToolbar.ButtonGroup aria-label="Teams selection">
                    <NdlToolbar.Indicator />
                    {teams.map((team) => (
                        <NdlToolbar.Button key={team.slug ?? team.teamName}>
                            {team.teamName}
                        </NdlToolbar.Button>
                    ))}
                </NdlToolbar.ButtonGroup>
            </NdlToolbar.Root>
        </Flex>
    );
});

// ---------------------------------------------------------------------------
// Teams link
// ---------------------------------------------------------------------------

type TeamsLinkProps = {
    title: string;
    description: string;
    href: string;
    onClick?: () => void;
};

const TeamsLink = memo(function TeamsLink({ title, description, href, onClick }: TeamsLinkProps) {
    return (
        <NdlLink.Root href={href}>
            <NdlLink.Content>
                <NdlLink.Title onClick={onClick}>{title}</NdlLink.Title>
                <NdlLink.Description>{description}</NdlLink.Description>
            </NdlLink.Content>
            <NdlLink.Icon />
        </NdlLink.Root>
    );
});

// ---------------------------------------------------------------------------
// Animation constants
// ---------------------------------------------------------------------------

const fadeUpInitial = { opacity: 0, y: 20 } as const;
const fadeUpAnimate = { opacity: 1, y: 0 } as const;
const fadeUpTransition = { type: "spring", duration: 1, bounce: 0 } as const;
const crossfadeInitial = { opacity: 0 } as const;
const crossfadeAnimate = { opacity: 1 } as const;
const crossfadeExit = { opacity: 0 } as const;
const crossfadeTransition = {
    duration: 0.5,
    ease: easeInOutSoft,
} as const;

const EMPTY_GALLERY: never[] = [];

const LINK_ANIMATION_REDUCED: Record<string, never> = {};

const LINK_ANIMATION_HAS_PLAYED = {
    initial: crossfadeInitial,
    animate: crossfadeAnimate,
    exit: crossfadeExit,
    transition: crossfadeTransition,
} as const;

function getLinkAnimationProps({
    prefersReducedMotion,
    hasPlayed,
    linkReady,
    isMobile,
}: {
    prefersReducedMotion: boolean;
    hasPlayed: boolean;
    linkReady: boolean;
    isMobile: boolean;
}) {
    if (isMobile || prefersReducedMotion) return LINK_ANIMATION_REDUCED;
    if (hasPlayed) return LINK_ANIMATION_HAS_PLAYED;
    return {
        initial: fadeUpInitial,
        animate: linkReady ? fadeUpAnimate : undefined,
        transition: fadeUpTransition,
    };
}

// ---------------------------------------------------------------------------
// TeamsSection
// ---------------------------------------------------------------------------

type TeamsSectionProps = Pick<
    NewPageHomepageFieldsFragment,
    "teamSectionTitle" | "teamSectionTitle2" | "teamsCollection"
>;

const TeamsSection = memo(function TeamsSection({
    teamSectionTitle,
    teamSectionTitle2,
    teamsCollection,
}: TeamsSectionProps) {
    const rawTeams = useMemo(() => teamsCollection?.items ?? [], [teamsCollection?.items]);

    const containerRef = useRef<HTMLDivElement>(null);
    const [activeTeamIndex, setActiveTeamIndex] = useState(0);

    const router = useRouter();
    const routerRef = useRef(router);
    routerRef.current = router;

    const {
        state: { pageType, pageId, pageContentTags },
    } = useAppStore();

    const { isDesktopMd: isDesktop } = useHomepageBreakpoints();
    const { prefersReducedMotion } = useHomepageMotionPref();

    // ---- Scroll-driven entry animation (scale-up into viewport) ----
    const {
        style: revealStyle,
        willChange: revealWillChange,
        entryProgress,
    } = useEntryReveal({
        target: containerRef,
        enabled: isDesktop && !prefersReducedMotion,
        radius: "2rem",
    });

    const entryCompleteRef = useRef(false);
    const entranceTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
    useMotionValueEvent(entryProgress, "change", (v) => {
        if (!isDesktop) return;
        if (v >= 1 && !entryCompleteRef.current) {
            entryCompleteRef.current = true;
            for (const id of entranceTimersRef.current) clearTimeout(id);
            entranceTimersRef.current = [];
            if (prefersReducedMotion) {
                setEntrancePhase("done");
            } else {
                const t1 = setTimeout(() => setEntrancePhase("selector"), 25);
                const t2 = setTimeout(() => setEntrancePhase("entrance"), 375);
                const t3 = setTimeout(() => setEntrancePhase("done"), 375 + 420 + 200);
                entranceTimersRef.current = [t1, t2, t3];
            }
        }
    });

    useEffect(() => {
        return () => {
            for (const id of entranceTimersRef.current) clearTimeout(id);
        };
    }, []);

    // ---- Derive valid teams from Contentful data ----
    const validTeams = useMemo(() => {
        const result: Array<{
            teamName: string | null | undefined;
            theme: TeamTheme;
            gallery: TeamSectionGalleryFieldsFragment | null | undefined;
            linkTitle: string | null | undefined;
            linkTitleDescription: string | null | undefined;
            slug: string | null | undefined;
        }> = [];
        for (const item of rawTeams) {
            if (item?.team == null) continue;
            result.push({
                teamName: item.team.teamName,
                theme: resolveTeamTheme(item.team.theme) ?? FALLBACK_THEME,
                gallery: item.team.gallery,
                linkTitle: item.linkTitle,
                linkTitleDescription: item.linkTitleDescription,
                slug: item.slug,
            });
        }
        return result;
    }, [rawTeams]);

    // ---- Active team state ----
    const activeTeam = validTeams[activeTeamIndex];
    const activeConfig = teamThemes[activeTeam?.theme ?? FALLBACK_THEME];
    const shaderConfig = useMemo(
        () => (prefersReducedMotion ? { ...activeConfig.shader, speed: 0 } : activeConfig.shader),
        [prefersReducedMotion, activeConfig.shader]
    );
    const galleryItems = activeTeam?.gallery?.mediaCollection?.items ?? EMPTY_GALLERY;
    const linkHref = activeTeam?.slug
        ? getHrefForPageType({ __typename: "PageTeam", slug: activeTeam.slug })
        : "";

    // ---- Carousel slide tracking (persists across tab switches) ----
    const carouselRef = useRef<TeamsCarouselHandle>(null);
    const carouselSlideIndexRef = useRef(0);
    const savedSlideIndexRef = useRef(0);

    const handleSlideIndexChange = useCallback((index: number) => {
        carouselSlideIndexRef.current = index;
    }, []);

    // ---- Sequenced entrance: title → selector → carousel → link ----
    // On mobile the ready flags are unconditionally true so everything is
    // visible immediately. On desktop the phased entrance controls them.
    type EntrancePhase = "idle" | "selector" | "entrance" | "done";
    const [entrancePhase, setEntrancePhase] = useState<EntrancePhase>("idle");
    const selectorReady = !isDesktop || entrancePhase !== "idle";
    const entranceReady = !isDesktop || entrancePhase === "entrance" || entrancePhase === "done";
    const linkReady = !isDesktop || entrancePhase === "done";
    const hasPlayedEntranceRef = useRef(false);

    const handleTabChange = useCallback(
        (index: number) => {
            hasPlayedEntranceRef.current = true;
            savedSlideIndexRef.current = carouselSlideIndexRef.current;

            sendPagDataToGTM({
                eventAction: PAGMSHEvents.teamSelectorClick,
                locale: routerRef.current.locale!,
                pageExperience: {
                    pageCategory: pageType,
                    contentTags: pageContentTags ?? [],
                },
                context: {
                    moduleName: PAGMSHModuleNames.teamsSection,
                },
                componentClick: {
                    clickElementType: "interaction",
                    clickElementId: pageId,
                    clickElementName: `Team tab: ${validTeams[index]?.teamName ?? ""}`,
                },
            });

            setActiveTeamIndex(index);
            requestAnimationFrame(() => {
                carouselRef.current?.slideTo(savedSlideIndexRef.current, 0);
            });
        },
        [pageType, pageId, pageContentTags, validTeams]
    );

    return (
        <Box
            as="section"
            aria-label="Teams"
            id={SECTION_IDS.teams}
            ref={containerRef}
            position="relative"
            zIndex="30"
            marginTop="-50vh"
            sx={{
                contentVisibility: "auto",
                containIntrinsicSize: "auto 0 calc(200vh + 340px)",
                minHeight: "100svh",
            }}
        >
            <MotionBox
                mx="auto"
                overflow="hidden"
                position="relative"
                bg="porscheBlack"
                sx={{
                    minHeight: "100svh",
                    willChange: revealWillChange,
                }}
                style={revealStyle}
                pb="50vh"
            >
                <AnimatedShaderBackground config={shaderConfig} />
                <Flex
                    position="relative"
                    zIndex="docked"
                    direction="column"
                    alignItems="center"
                    width="full"
                >
                    <Box marginLeft="calc(-50vw + 50%)" alignSelf="flex-start" width="100vw">
                        <ScrollRevealTextAnimationContainer textColor={colors.grey400}>
                            <FluidTypography
                                size="displayLarge"
                                textAlign="center"
                                whiteSpace="pre-line"
                                overflow="visible"
                                mt={{
                                    base: "9.25rem",
                                    md: 52,
                                }}
                                mb={{ base: 9, md: 24 }}
                                px={5}
                                as="h2"
                                sx={{
                                    textWrap: "balance",
                                }}
                            >
                                {[teamSectionTitle, teamSectionTitle2].map((line) =>
                                    prefersReducedMotion ? (
                                        <span key={line}>{line}</span>
                                    ) : (
                                        <ScrollRevealTextAnimation
                                            key={line}
                                            entryProgress={entryProgress}
                                        >
                                            {line}
                                        </ScrollRevealTextAnimation>
                                    )
                                )}
                            </FluidTypography>
                        </ScrollRevealTextAnimationContainer>
                    </Box>
                    <Flex direction="column" alignItems="center" width="full">
                        <MotionBox
                            {...(isDesktop &&
                                !prefersReducedMotion && {
                                    initial: fadeUpInitial,
                                    animate: selectorReady ? fadeUpAnimate : undefined,
                                    transition: fadeUpTransition,
                                })}
                            width="100vw"
                            marginLeft="calc(-50vw + 50%)"
                            alignSelf="flex-start"
                        >
                            <TeamsSelector
                                teams={validTeams}
                                activeTeamIndex={activeTeamIndex}
                                onTeamChange={handleTabChange}
                                highlightColor={activeConfig.highlightColor}
                                highlightTextColor={activeConfig.highlightTextColor}
                            />
                        </MotionBox>
                        <Box
                            width="100vw"
                            marginLeft="calc(-50vw + 50%)"
                            alignSelf="flex-start"
                            display="grid"
                            gridTemplateColumns="1fr"
                            sx={{ "& > *": { gridArea: "1 / 1", minWidth: 0 } }}
                            aria-live="polite"
                        >
                            <AnimatePresence>
                                {galleryItems.length > 0 ? (
                                    <MotionBox
                                        key={activeTeamIndex}
                                        {...(!prefersReducedMotion && {
                                            initial: crossfadeInitial,
                                            animate: crossfadeAnimate,
                                            exit: crossfadeExit,
                                            transition: crossfadeTransition,
                                        })}
                                    >
                                        <TeamsCarousel
                                            ref={carouselRef}
                                            items={galleryItems}
                                            initialSlideIndex={savedSlideIndexRef.current}
                                            onSlideIndexChange={handleSlideIndexChange}
                                            isFirstMount={!hasPlayedEntranceRef.current}
                                            entranceReady={entranceReady}
                                        />
                                    </MotionBox>
                                ) : (
                                    <Box
                                        key={`empty-${activeTeamIndex}`}
                                        minHeight="400px"
                                        aria-hidden="true"
                                    />
                                )}
                            </AnimatePresence>
                        </Box>
                        {linkHref && (
                            <Box
                                width="100vw"
                                marginLeft="calc(-50vw + 50%)"
                                alignSelf="flex-start"
                                my={12}
                            >
                                <Box
                                    maxWidth="wrapperContainer"
                                    mx="auto"
                                    px={{ base: 4, md: 10 }}
                                    display="grid"
                                    gridTemplateColumns="1fr"
                                    sx={{ "& > *": { gridArea: "1 / 1", minWidth: 0 } }}
                                >
                                    <AnimatePresence mode="popLayout">
                                        <MotionBox
                                            key={`link-${activeTeamIndex}`}
                                            {...getLinkAnimationProps({
                                                prefersReducedMotion,
                                                hasPlayed: hasPlayedEntranceRef.current,
                                                linkReady,
                                                isMobile: !isDesktop,
                                            })}
                                            width={{
                                                base: "full",
                                                md: "calc((100% - 32px * 3) / 3.1)",
                                            }}
                                        >
                                            <TeamsLink
                                                title={
                                                    activeTeam?.linkTitle ??
                                                    activeTeam?.teamName ??
                                                    ""
                                                }
                                                description={activeTeam?.linkTitleDescription ?? ""}
                                                href={linkHref}
                                                onClick={() => {
                                                    sendPagDataToGTM({
                                                        eventAction: PAGMSHEvents.linkClick,
                                                        locale: router.locale!,
                                                        pageExperience: {
                                                            pageCategory: pageType,
                                                            contentTags: pageContentTags ?? [],
                                                        },
                                                        context: {
                                                            moduleName:
                                                                PAGMSHModuleNames.teamsSection,
                                                        },
                                                        componentClick: {
                                                            clickElementType: "navigation",
                                                            clickElementId: pageId,
                                                            clickElementName: `Team link: ${
                                                                activeTeam?.teamName ?? ""
                                                            }`,
                                                            targetUrl: linkHref,
                                                            targetType: "internal",
                                                        },
                                                    });
                                                }}
                                            />
                                        </MotionBox>
                                    </AnimatePresence>
                                </Box>
                            </Box>
                        )}
                    </Flex>
                </Flex>
            </MotionBox>
        </Box>
    );
});

TeamsSection.displayName = "TeamsSection";

export { TeamsSection };
