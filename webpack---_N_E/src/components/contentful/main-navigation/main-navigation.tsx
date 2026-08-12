import type { RefObject } from "react";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { MainNavigationFieldsFragment } from "@/components/contentful/main-navigation/__generated/main-navigation.contentful.generated";
import {
    Box,
    Flex,
    HStack,
    useToken,
    useDisclosure,
    Grid,
    GridItem,
    Tab,
    Tabs,
    TabList,
    TabPanels,
    Button,
    MotionBox,
    useMediaQuery,
    mediaQueryMinWidth,
    mediaQueryMaxWidth,
    VStack,
    ButtonPure,
    chakra,
} from "@project/ui";
import type { BoxProps } from "@project/ui";
import { useAppStore } from "@/store/app-store";
import { WrapperContainer } from "@/components/wrapper-container";
import { LanguageSelector } from "@/components/contentful/main-navigation/components/language-selector";
import { HighlightLink } from "@/components/contentful/main-navigation/components/highlight-link";
import type { Transition, Variants } from "framer-motion";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { frostedGlassStyle } from "@porsche-design-system/components-react/styles";
import { QuickLinkButton } from "@/components/contentful/main-navigation/components/quick-link-button";
import { QuickLink } from "@/components/contentful/main-navigation/components/quick-link";
import { getHrefForPageType } from "@/common/helpers/slug";
import { RemoveScroll } from "react-remove-scroll";
import {
    SectionAccordion,
    SectionAccordionButton,
    SectionAccordionItem,
    SectionAccordionPanel,
} from "@/components/contentful/main-navigation/components/section-accordion";
import { PorscheLogo } from "@/components/porsche-logo";
import { SectionLinkCard } from "@/components/contentful/main-navigation/components/section-link-card";
import { SeriesMarquee } from "@/components/contentful/main-navigation/components/series-marquee";
import {
    SectionGrid,
    SectionGridItem,
} from "@/components/contentful/main-navigation/components/section-grid";
import { SectionImage } from "@/components/contentful/main-navigation/components/section-image";
import { SectionLink } from "@/components/contentful/main-navigation/components/section-link";
import FocusLock from "react-focus-lock";
import { Backdrop } from "@/components/contentful/main-navigation/components/backdrop";
import { BurgerMenuButton } from "@/components/contentful/main-navigation/components/burger-menu-button";
import { breakpoints } from "@project/ui/src/design-tokens";
import { MobileTabClose } from "@/components/contentful/main-navigation/components/mobile-tab-close";
import { MotionTabPanel } from "@/components/contentful/main-navigation/components/motion-tab-panel";
import { MotionTab } from "@/components/contentful/main-navigation/components/motion-tab";
import { QuickLinks } from "@/components/contentful/main-navigation/quick-links";
import {
    useScrollIndicator,
    ScrollIndicatorGradientOverlay,
} from "@/components/contentful/main-navigation/components/scroll-indicator";

const LiveTicker = dynamic(() =>
    import("@/components/contentful/live-ticker/live-ticker").then((module) => module.LiveTicker)
);

const MotionSectionLink = motion(SectionLink);
const MotionGridItem = motion(GridItem);
const MotionSectionGridItem = motion(SectionGridItem);
const MotionSectionGrid = motion(SectionGrid);
const LinkMotionTab = motion(Tab);

type MainNavigationProps = MainNavigationFieldsFragment;

const ARIA_LABEL_CLOSE_NAVIGATION = "Close navigation";
const ARIA_LABEL_OPEN_NAVIGATION = "Open navigation";
const ARIA_LABEL_CLOSE_LANGUAGE_SELECTOR = "Close language selector";

const CUSTOM_BREAKPOINT_ABOVE_LARGE_BELOW_XLARGE = "1380px";

const DURATION = 0.5;
const EASING = [0.35, 0, 0.14, 1];
const TRANSITION: Transition = {
    duration: DURATION,
    ease: EASING,
    type: "tween",
};

const TRANSITION_WIDTH_HEIGHT_ENTER = {
    duration: 0.5,
    type: "tween",
    ease: [0.45, 0.4, 0.14, 1],
};
const TRANSITION_WIDTH_HEIGHT_EXIT = {
    duration: 0.3,
    type: "tween",
    ease: [0.62, 0, 0.14, 1],
};
const TRANSITION_ITEM_REVEAL = {
    duration: DURATION,
    ease: [0, 0.41, 0.14, 1],
    type: "tween",
};

const tabIndices = {
    series: 0,
    cars: 1,
    teams: 2,
    events: 3,
};

const animVariantsBackdrop: Variants = {
    navigationCollapsed: {
        opacity: 0,
        transition: {
            ...TRANSITION,
        },
    },
    navigationExpanded: {
        opacity: 1,
        transition: {
            ...TRANSITION,
        },
    },
};

const animVariantsMobileToolbar: Variants = {
    navigationCollapsed: {
        opacity: 0,
        transition: {
            ...TRANSITION,
        },
    },
    navigationExpanded: {
        opacity: 1,
        transition: {
            ...TRANSITION,
        },
    },
};

const getMobileWidth = () => "100%";

const getDesktopWidth = (isAboveCustomBreakpoint: boolean) =>
    isAboveCustomBreakpoint ? "896px" : "90%";

const getExpandedWidth = (isAboveLarge: boolean, isAboveCustomBreakpoint: boolean) =>
    isAboveLarge ? getDesktopWidth(isAboveCustomBreakpoint) : getMobileWidth();

const animVariantsWidth = (isAboveLarge: boolean, isAboveCustomBreakpoint: boolean): Variants => ({
    navigationCollapsed: {
        width: isAboveLarge ? "auto" : "100%",
        transition: {
            ...TRANSITION_WIDTH_HEIGHT_EXIT,
        },
    },
    navigationExpanded: {
        width: getExpandedWidth(isAboveLarge, isAboveCustomBreakpoint),
        transition: {
            ...TRANSITION_WIDTH_HEIGHT_ENTER,
        },
    },
});

const animVariantsHeight = (
    isAboveLarge: boolean,
    targetHeightMobile: string,
    isBurgerNav: boolean
): Variants => ({
    navigationCollapsed: {
        height: "var(--sizes-navQuickLinksHeight)",
        // With the burger nav, the collapsed quick-links bar is replaced by the
        // fixed burger button on mobile, so the pill fades out entirely while collapsing.
        opacity: isAboveLarge || !isBurgerNav ? 1 : 0,
        transition: {
            ...TRANSITION_WIDTH_HEIGHT_EXIT,
        },
    },
    navigationExpanded: {
        height: isAboveLarge ? "640px" : targetHeightMobile,
        opacity: 1,
        transition: {
            ...TRANSITION_WIDTH_HEIGHT_ENTER,
        },
    },
});

const animVariantsInnerContent: Variants = {
    navigationCollapsed: {
        opacity: 0,
        transition: {
            ...TRANSITION_WIDTH_HEIGHT_EXIT,
        },
    },
    navigationExpanded: {
        opacity: 1,
        transition: {
            ...TRANSITION_WIDTH_HEIGHT_ENTER,
            delay: TRANSITION_WIDTH_HEIGHT_ENTER.duration / 2,
        },
    },
};

const animVariantsQuickLinks: Variants = {
    quickLinksVisible: {
        opacity: 1,
        transition: {
            ...TRANSITION,
            delay: TRANSITION_WIDTH_HEIGHT_EXIT.duration,
        },
    },
    quickLinksHidden: {
        opacity: 0,
        transition: {
            ...TRANSITION,
        },
    },
};

const animVariantsTabList: Variants = {
    tabListVisible: ({ delayChildren }: { delayChildren: boolean }) => ({
        // opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: delayChildren ? TRANSITION_WIDTH_HEIGHT_ENTER.duration / 2 : 0,
        },
    }),
    tabListHidden: {
        // opacity: 0,
        transition: {
            ...TRANSITION_ITEM_REVEAL,
        },
    },
    tabListHiddenWithY: {
        // opacity: 0,
        transition: {
            ...TRANSITION_ITEM_REVEAL,
        },
    },
};

const animVariantsTab = {
    tabListVisible: {
        y: 0,
        opacity: 1,
        transition: {
            ...TRANSITION_ITEM_REVEAL,
        },
    },
    tabListHidden: {
        y: 0,
        opacity: 0,
        transition: {
            ...TRANSITION_ITEM_REVEAL,
        },
    },
    tabListHiddenWithY: {
        y: -16,
        opacity: 0,
        transition: {
            ...TRANSITION_ITEM_REVEAL,
        },
    },
};

const animVariantsTabPanels: Variants = {
    tabPanelsVisible: {},
    tabPanelsHidden: {},
};

const animVariantsTabPanel: Variants = {
    tabPanelVisible: ({ delay, isAboveLarge }: { delay: boolean; isAboveLarge: boolean }) => ({
        opacity: 1,
        transition: {
            ...TRANSITION,
            delay: isAboveLarge && delay ? 0.5 : 0,
        },
    }),
    tabPanelHidden: {
        opacity: 0,
        transition: {
            ...TRANSITION,
        },
    },
};

const animVariantsSectionGrid: Variants = {
    visible: ({
        delayChildren,
        isAboveLarge,
    }: {
        delayChildren: boolean;
        isAboveLarge: boolean;
    }) => {
        const delay = delayChildren ? (isAboveLarge ? 0.7 : 0.5) : 0;
        return {
            transition: {
                staggerChildren: 0.07,
                delayChildren: delay,
            },
        };
    },
    hidden: {},
};

const animVariantsSectionGridItem: Variants = {
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            ...TRANSITION_ITEM_REVEAL,
        },
    },
    hidden: {
        y: -25,
        opacity: 0,
        transition: {
            ...TRANSITION_ITEM_REVEAL,
        },
    },
};

/**
 * Hook to detect clicks outside a given set of refs.
 * @param refs
 * @param callback
 */
export const useClickOutside = (refs: RefObject<HTMLElement>[], callback: () => void) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Refs whose element isn't currently rendered (e.g. the burger button
            // outside the new homepage) are ignored instead of blocking the check.
            const renderedRefs = refs.filter((ref) => ref.current);
            if (
                renderedRefs.length > 0 &&
                renderedRefs.every((ref) => !ref.current!.contains(event.target as Node))
            ) {
                callback();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // no need to re-register event listeners when breakpoint changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refs, callback]);
};

const useDynamicNavHeight = ({
    headSpaceTop,
    headSpaceBottom,
}: {
    headSpaceTop: number;
    headSpaceBottom: number;
}): string => {
    const [height, setHeight] = useState<string>("auto");

    const calculateHeight = useCallback(() => {
        const viewportHeight = window.innerHeight;
        const newHeight = viewportHeight - headSpaceTop - headSpaceBottom;
        return `${newHeight}px`;
    }, [headSpaceTop, headSpaceBottom]);

    useEffect(() => {
        const updateHeight = () => {
            setHeight(calculateHeight());
        };

        const debounce = (func: () => void, delay: number) => {
            let timeoutId: number;
            return () => {
                clearTimeout(timeoutId);
                timeoutId = window.setTimeout(func, delay);
            };
        };

        // Initial height calculation
        updateHeight();

        const debouncedUpdateHeight = debounce(updateHeight, 100);

        // Use ResizeObserver for efficient viewport size change detection
        const resizeObserver = new ResizeObserver(debouncedUpdateHeight);
        resizeObserver.observe(document.documentElement);

        return () => {
            resizeObserver.disconnect();
        };
    }, [calculateHeight]);

    return height;
};

const TabScrollBox = forwardRef<HTMLDivElement, BoxProps>(({ children, ...props }, ref) => (
    <Box
        ref={ref}
        overflowY="auto"
        padding={{ base: 6, l: 0 }}
        paddingBottom={{ base: 6, l: 6 }}
        sx={{
            scrollbarWidth: "none",
            "&::webkit-scrollbar": {
                display: "none",
            },
        }}
        {...props}
    >
        {children}
    </Box>
));

TabScrollBox.displayName = "TabScrollBox";

const ListItem = chakra.div;

// We could probably make this simpler / more navigable by splitting up the nested components,
// but on the other hand, to better have an overview of animation & orchestration, it's kept in one component.
// eslint-disable-next-line sonarjs/cognitive-complexity
export const MainNavigation = (props: MainNavigationProps) => {
    const {
        highlightLink,
        languageSelectorItemsCollection,
        journalPage,
        seriesSectionCollection,
        seriesSectionLabel,
        carsSectionCollection,
        carsSectionLabel,
        teamsSectionCollection,
        teamsSectionLabel,
        eventsSectionCollection,
        eventsSectionLabel,
        showLiveTicker,
        languageSelectorErrorLabel,
        languageSelectorSearchPlaceholder,
    } = props;

    const {
        state: { hasLiveTicker, mainNavigationId, pageType },
    } = useAppStore();

    // Only show live ticker if both the app store has it and Contentful allows it for this locale
    const shouldShowLiveTicker = hasLiveTicker && showLiveTicker;

    // Prototype: the fixed burger button (instead of the bottom quick-links bar
    // on mobile) only runs on the new homepage; all other pages keep the old nav.
    const isBurgerNav = pageType === "NewPageHomepage";

    const [isAboveLarge] = useMediaQuery(`(min-width: ${breakpoints.l})`, {
        ssr: true,
        fallback: true,
    });
    const [isAboveCustomBreakpoint] = useMediaQuery(
        `(min-width: ${CUSTOM_BREAKPOINT_ABOVE_LARGE_BELOW_XLARGE})`,
        {
            ssr: true,
            fallback: true,
        }
    );

    const [tabIndex, setTabIndex] = useState<number | undefined>(undefined);

    const [seriesAccordionIndex, setSeriesAccordionIndex] = useState<number | number[]>(0);
    const [eventsAccordionIndex, setEventsAccordionIndex] = useState<number | number[]>(0);

    const [isTabListVisible, setIsTabListVisible] = useState<boolean>(false);
    const [isTabPanelsVisible, setIsTabPanelsVisible] = useState<boolean>(false);
    const [shouldAnimateInsideExpandedNavigation, setShouldAnimateInsideExpandedNavigation] =
        useState<boolean>(false);

    const [mobileLogoOpacity, setMobileLogoOpacity] = useState(1);
    const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);

    const {
        isOpen: isNavigationOpen,
        onOpen: onNavigationOpen,
        onClose: onNavigationClose,
    } = useDisclosure();
    const ariaId = "main-navigation";
    const closeOnClickOutsideOfLogoSideRef = useRef<HTMLDivElement>(null);
    // we also use this ref to calculate the target width of the expanded navigation
    const closeOnClickOutsideOfMainNavigationRef = useRef<HTMLDivElement>(null);
    const closeOnClickOutsideOfLanguageSelectorMobileRef = useRef<HTMLDivElement>(null);
    const closeOnClickOutsideOfLanguageSelectorDesktopRef = useRef<HTMLDivElement>(null);
    // The fixed burger button toggles the navigation itself, so it must be
    // excluded from the click-outside handling to avoid close-then-reopen.
    const burgerButtonRef = useRef<HTMLDivElement>(null);
    const mobileLogoRef = useRef<HTMLDivElement>(null);

    const tabPanelsScrollRef = useRef<HTMLDivElement>(null);
    const seriesTabScrollRef = useRef<HTMLDivElement>(null);
    const carsTabScrollRef = useRef<HTMLDivElement>(null);
    const teamsTabScrollRef = useRef<HTMLDivElement>(null);
    const eventsTabScrollRef = useRef<HTMLDivElement>(null);

    const { scrollY } = useScroll();
    const [liveTickerHeightToken, navQuickLinksOffsetTopToken] = useToken("sizes", [
        "liveTickerHeight",
        "navQuickLinksOffsetTop",
    ]);

    const liveTickerHeight = parseInt(liveTickerHeightToken, 10);
    const distanceToTopMobile = 8;
    const distanceToTopDesktop = parseInt(navQuickLinksOffsetTopToken, 10);

    const targetHeightForExpandedNavigation = useDynamicNavHeight({
        // + 16px for the padding on top of the language selector to top of viewport
        // + height of the language selector
        // + 16px for the padding below the language selector and the expanded navigation
        headSpaceTop: 16 + 16 + 36,
        headSpaceBottom: 16,
    });

    const [quickLinksDesktopTransformY, setQuickLinksDesktopTransformY] = useState(
        shouldShowLiveTicker ? liveTickerHeight + distanceToTopDesktop : distanceToTopDesktop
    );
    const [quickLinksMobileTransformY, setQuickLinksMobileTransformY] = useState(
        shouldShowLiveTicker ? liveTickerHeight : distanceToTopMobile
    );
    const [desktopLogoTransformY, setDesktopLogoTransformY] = useState(0);

    useEffect(() => {
        setQuickLinksMobileTransformY(
            shouldShowLiveTicker ? liveTickerHeight : distanceToTopMobile
        );
        setQuickLinksDesktopTransformY(
            shouldShowLiveTicker ? distanceToTopDesktop + liveTickerHeight : distanceToTopDesktop
        );
    }, [shouldShowLiveTicker, liveTickerHeight, distanceToTopDesktop, distanceToTopMobile]);

    useMotionValueEvent(scrollY, "change", (scrollDistance) => {
        const liveTickerHeight = parseInt(liveTickerHeightToken, 10);

        const distanceToTrigger = shouldShowLiveTicker ? liveTickerHeight : distanceToTopDesktop;

        if (scrollDistance > distanceToTrigger) {
            setQuickLinksDesktopTransformY(distanceToTopDesktop);
            setQuickLinksMobileTransformY(distanceToTopMobile);
        } else {
            setQuickLinksDesktopTransformY(
                shouldShowLiveTicker
                    ? distanceToTopDesktop + liveTickerHeight
                    : distanceToTopDesktop
            );
            setQuickLinksMobileTransformY(
                shouldShowLiveTicker ? liveTickerHeight : distanceToTopMobile
            );
        }

        setDesktopLogoTransformY(scrollDistance < 100 ? scrollDistance * -1 : -100);
    });

    // Determine which scroll container to track based on breakpoint and active tab
    const getActiveScrollRef = () => {
        if (isAboveLarge) return tabPanelsScrollRef;

        switch (tabIndex) {
            case tabIndices.series:
                return seriesTabScrollRef;
            case tabIndices.cars:
                return carsTabScrollRef;
            case tabIndices.teams:
                return teamsTabScrollRef;
            case tabIndices.events:
                return eventsTabScrollRef;
            default:
                return null;
        }
    };

    const activeScrollRef = getActiveScrollRef();

    const { shouldShowIndicator: shouldShowScrollIndicator, handleScroll: handleTabPanelsScroll } =
        useScrollIndicator(activeScrollRef, isTabPanelsVisible);

    const handleOnNavigationOpen = (tabIndex: number | undefined) => {
        setTabIndex(tabIndex ?? -1);

        if (!isAboveLarge) {
            setIsTabListVisible(tabIndex === undefined);
            setIsTabPanelsVisible(tabIndex !== undefined);
        } else {
            setIsTabListVisible(true);
            setIsTabPanelsVisible(true);
        }

        onNavigationOpen();
    };

    const handleOnNavigationClose = useCallback(() => {
        setIsTabListVisible(false);
        setIsTabPanelsVisible(false);
        onNavigationClose();
    }, [onNavigationClose]);

    const handleOnTabsChange = (index: number) => {
        setSeriesAccordionIndex(0);
        setEventsAccordionIndex(0);

        setTabIndex(index);
    };

    const handleOnTabOpen = () => {
        if (!isAboveLarge) {
            setIsTabListVisible(false);
            setIsTabPanelsVisible(true);
        }
    };
    const handleOnTabClose = () => {
        if (!isAboveLarge) {
            setTabIndex(-1);
            setIsTabListVisible(true);
            setIsTabPanelsVisible(false);
        }
    };

    const handleOnAnimationCompleteOnInnerContent = (definition: string) => {
        setShouldAnimateInsideExpandedNavigation(definition === "navigationExpanded");

        if (definition === "navigationCollapsed") {
            setTabIndex(undefined);
        }
    };

    useClickOutside(
        [
            closeOnClickOutsideOfLogoSideRef,
            closeOnClickOutsideOfMainNavigationRef,
            closeOnClickOutsideOfLanguageSelectorMobileRef,
            closeOnClickOutsideOfLanguageSelectorDesktopRef,
            burgerButtonRef,
            mobileLogoRef,
        ],
        handleOnNavigationClose
    );

    useEffect(() => {
        const handleCloseOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isNavigationOpen) {
                handleOnNavigationClose();
            }
        };

        document.addEventListener("keydown", handleCloseOnEscape);

        return () => {
            document.removeEventListener("keydown", handleCloseOnEscape);
        };
    }, [isNavigationOpen, handleOnNavigationClose]);

    useEffect(() => {
        if (isNavigationOpen) {
            handleOnNavigationClose();
        }
        // we just want to close the navigation when the media query changes, if we included isNavigationOpen then it would close the navigation on every render
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAboveLarge, isAboveCustomBreakpoint]);

    useEffect(() => {
        if (isNavigationOpen && !isLanguageSelectorOpen) {
            setMobileLogoOpacity(0);
            const timer = window.setTimeout(() => setMobileLogoOpacity(1), 50);
            return () => window.clearTimeout(timer);
        } else {
            setMobileLogoOpacity(1);
        }
    }, [isNavigationOpen, isLanguageSelectorOpen]);

    let burgerMenuAriaLabel = ARIA_LABEL_OPEN_NAVIGATION;
    if (isLanguageSelectorOpen) {
        burgerMenuAriaLabel = ARIA_LABEL_CLOSE_LANGUAGE_SELECTOR;
    } else if (isNavigationOpen) {
        burgerMenuAriaLabel = ARIA_LABEL_CLOSE_NAVIGATION;
    }

    return (
        <Box as="header">
            <AnimatePresence>
                {isNavigationOpen && (
                    <Backdrop
                        variants={animVariantsBackdrop}
                        initial="navigationCollapsed"
                        animate="navigationExpanded"
                        exit="navigationCollapsed"
                    />
                )}
            </AnimatePresence>

            {mainNavigationId && showLiveTicker && (
                <LiveTicker mainNavigationId={mainNavigationId} />
            )}

            <FocusLock disabled={!isNavigationOpen}>
                <RemoveScroll enabled={isNavigationOpen} forwardProps>
                    <nav aria-label="Main navigation" data-lenis-prevent>
                        {/*Mobile*/}

                        <Box
                            ref={mobileLogoRef}
                            position={
                                isNavigationOpen || isLanguageSelectorOpen ? "fixed" : "absolute"
                            }
                            zIndex={isLanguageSelectorOpen ? "popover" : "modal"}
                            top={
                                shouldShowLiveTicker
                                    ? "calc(var(--sizes-liveTickerHeight) + var(--space-4))"
                                    : 4
                            }
                            left={5}
                            display={{ base: "inline-block", l: "none" }}
                        >
                            <PorscheLogo
                                className="logo-mobile"
                                transitionTimingFunction="var(--transition-property-common)"
                                transitionDuration="var(--transition-duration-moderate)"
                                transform={
                                    (isNavigationOpen || isLanguageSelectorOpen) &&
                                    shouldShowLiveTicker
                                        ? "translateY(-36px)"
                                        : "none"
                                }
                                opacity={mobileLogoOpacity}
                                onClick={handleOnNavigationClose}
                                forceLogoColorWhite={isNavigationOpen || isLanguageSelectorOpen}
                            />
                        </Box>

                        {highlightLink && (!isNavigationOpen || isLanguageSelectorOpen) && (
                            <Box
                                display={{ base: "flex", l: "none" }}
                                position="fixed"
                                zIndex={isLanguageSelectorOpen ? "popover" : "modal"}
                                top={2}
                                transitionTimingFunction="transform"
                                transitionDuration="var(--transition-duration-moderate)"
                                transform={{
                                    base: `translateY(${quickLinksMobileTransformY}px)`,
                                    l: "none",
                                }}
                                // burger nav: keep clear of the fixed burger button (36px + gap)
                                right={
                                    isBurgerNav ? "calc(var(--space-5) + 36px + var(--space-2))" : 5
                                }
                            >
                                <HighlightLink highlightLink={highlightLink} hideExternalIcon />
                            </Box>
                        )}

                        <AnimatePresence initial={false}>
                            {isNavigationOpen && (
                                <MotionBox
                                    position="fixed"
                                    zIndex="popover"
                                    top={4}
                                    // burger nav: keep clear of the fixed burger button (36px + gap)
                                    right={
                                        isBurgerNav
                                            ? "calc(var(--space-5) + 36px + var(--space-2))"
                                            : "var(--space-5)"
                                    }
                                    display={{ base: "flex", l: "none" }}
                                    alignItems="center"
                                    gap={2}
                                    variants={animVariantsMobileToolbar}
                                    initial="navigationCollapsed"
                                    animate="navigationExpanded"
                                    exit="navigationCollapsed"
                                >
                                    {languageSelectorItemsCollection?.items && (
                                        <Box ref={closeOnClickOutsideOfLanguageSelectorMobileRef}>
                                            <LanguageSelector
                                                items={languageSelectorItemsCollection.items}
                                                onClose={handleOnNavigationClose}
                                                controlledOpen={isLanguageSelectorOpen}
                                                onOpenChange={setIsLanguageSelectorOpen}
                                                hideCloseButton={isBurgerNav}
                                                clickOutsideExcludeRefs={[burgerButtonRef]}
                                                id="language-selector-mobile"
                                                searchPlaceholder={
                                                    languageSelectorSearchPlaceholder
                                                }
                                                languageSelectorErrorLabel={
                                                    languageSelectorErrorLabel
                                                }
                                            />
                                        </Box>
                                    )}
                                    {!isBurgerNav && !isLanguageSelectorOpen && (
                                        <AnimatePresence>
                                            <Button
                                                aria-controls={ariaId}
                                                icon="close"
                                                hideLabel
                                                aria-label={ARIA_LABEL_CLOSE_NAVIGATION}
                                                variant="ghost"
                                                theme="dark"
                                                compact
                                                onClick={handleOnNavigationClose}
                                            />
                                        </AnimatePresence>
                                    )}
                                </MotionBox>
                            )}
                        </AnimatePresence>

                        {/* Prototype: fixed burger / close toggle replacing the bottom quick-links bar */}
                        {isBurgerNav && (
                            <Box
                                ref={burgerButtonRef}
                                position="fixed"
                                zIndex={
                                    isNavigationOpen || isLanguageSelectorOpen ? "tooltip" : "modal"
                                }
                                top={2}
                                right={5}
                                display={{
                                    base: "flex",
                                    l: "none",
                                }}
                                borderRadius="medium"
                                backgroundColor="porscheBlackShaded"
                                backdropFilter={frostedGlassStyle.backdropFilter}
                                transitionProperty="transform"
                                transitionDuration="var(--transition-duration-moderate)"
                                transitionTimingFunction="ease"
                                transform={`translateY(${
                                    isNavigationOpen || isLanguageSelectorOpen
                                        ? distanceToTopMobile
                                        : quickLinksMobileTransformY
                                }px)`}
                            >
                                <BurgerMenuButton
                                    isOpen={isNavigationOpen || isLanguageSelectorOpen}
                                    ariaLabel={burgerMenuAriaLabel}
                                    ariaControlsId={ariaId}
                                    onClick={() => {
                                        if (isLanguageSelectorOpen) {
                                            setIsLanguageSelectorOpen(false);
                                        } else if (isNavigationOpen) {
                                            handleOnNavigationClose();
                                        } else {
                                            handleOnNavigationOpen(undefined);
                                        }
                                    }}
                                />
                            </Box>
                        )}
                        {/*End Mobile*/}

                        <Box
                            position="fixed"
                            zIndex="modal"
                            width="full"
                            // burger nav mobile: anchored below the top toolbar (16px + 36px
                            // button + 16px gap) so the expanding panel grows downwards from
                            // its top edge; otherwise the old bottom-docked quick-links bar
                            top={{ base: isBurgerNav ? "68px" : "auto", l: 0 }}
                            bottom={{ base: isBurgerNav ? "auto" : 4, l: "auto" }}
                            pointerEvents={{
                                base: !isBurgerNav || isNavigationOpen ? "auto" : "none",
                                l: "auto",
                            }}
                            transitionTimingFunction="transform"
                            transitionDuration="var(--transition-duration-moderate)"
                            transform={{
                                base: "none",
                                l: `translateY(${quickLinksDesktopTransformY}px)`,
                            }}
                            sx={
                                isBurgerNav
                                    ? {
                                          // Hide the collapsed pill on mobile with CSS so it never
                                          // flashes before hydration (the JS breakpoint hook falls
                                          // back to desktop on first render). The delay on hiding
                                          // lets the collapse/fade animation finish first.
                                          [mediaQueryMaxWidth.l]: {
                                              visibility: isNavigationOpen ? "visible" : "hidden",
                                              transition: isNavigationOpen
                                                  ? "none"
                                                  : "visibility 0s linear 0.3s",
                                          },
                                      }
                                    : undefined
                            }
                        >
                            <WrapperContainer
                                position="relative"
                                as={Grid}
                                gridTemplateColumns={{
                                    base: "repeat(2, 1fr)",
                                    l: "repeat(12, 1fr)",
                                }}
                                gap={0}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <GridItem
                                    as={Flex}
                                    display={{ base: "none", l: "flex" }}
                                    alignSelf="start"
                                    align="center"
                                    height="navQuickLinksHeight"
                                    ref={closeOnClickOutsideOfLogoSideRef}
                                    transform={{
                                        base: "none",
                                        l: `translateY(${desktopLogoTransformY}px)`,
                                    }}
                                >
                                    <PorscheLogo
                                        className="logo-desktop"
                                        display={{ base: "none", l: "block" }}
                                        onClick={handleOnNavigationClose}
                                        forceLogoColorWhite={isNavigationOpen}
                                    />
                                </GridItem>
                                <GridItem
                                    as={Flex}
                                    justifyContent="center"
                                    colSpan={{ base: 2, l: 8 }}
                                    colStart={{ base: 0, l: 3 }}
                                >
                                    <MotionBox
                                        variants={animVariantsWidth(
                                            isAboveLarge,
                                            isAboveCustomBreakpoint
                                        )}
                                        willChange="width,height"
                                        minWidth={{ base: "100%", l: "auto" }}
                                        animate={
                                            isNavigationOpen
                                                ? "navigationExpanded"
                                                : "navigationCollapsed"
                                        }
                                        sx={{
                                            contentVisibility: "auto",
                                        }}
                                    >
                                        <MotionBox
                                            id={ariaId}
                                            overflow="hidden"
                                            position="relative"
                                            display="flex"
                                            color="allWhite"
                                            backdropFilter={frostedGlassStyle.backdropFilter}
                                            backgroundColor="porscheBlackShaded"
                                            minHeight="navQuickLinksHeight"
                                            borderRadius="medium"
                                            variants={animVariantsHeight(
                                                isAboveLarge,
                                                targetHeightForExpandedNavigation,
                                                isBurgerNav
                                            )}
                                            willChange="width,height"
                                            initial="navigationCollapsed"
                                            sx={{
                                                contentVisibility: "auto",
                                            }}
                                            animate={
                                                isNavigationOpen
                                                    ? "navigationExpanded"
                                                    : "navigationCollapsed"
                                            }
                                        >
                                            {/*Quick Links bar*/}
                                            <AnimatePresence initial={false}>
                                                {!isNavigationOpen && (
                                                    <QuickLinks
                                                        layout
                                                        variants={animVariantsQuickLinks}
                                                        initial="quickLinksHidden"
                                                        animate="quickLinksVisible"
                                                        exit="quickLinksHidden"
                                                        // burger nav mobile: quick links are replaced by the fixed burger button
                                                        display={{
                                                            base: isBurgerNav ? "none" : "flex",
                                                            l: "flex",
                                                        }}
                                                        position={{
                                                            base: "absolute",
                                                            l: "relative",
                                                        }}
                                                        top={{ base: "auto", l: 0 }}
                                                        bottom={{ base: 0, l: "auto" }}
                                                        left={0}
                                                        listStyleType="none"
                                                    >
                                                        <ListItem>
                                                            {seriesSectionLabel && (
                                                                <QuickLinkButton
                                                                    aria-expanded={isNavigationOpen}
                                                                    aria-controls={ariaId}
                                                                    onClick={() =>
                                                                        handleOnNavigationOpen(
                                                                            tabIndices.series
                                                                        )
                                                                    }
                                                                >
                                                                    {seriesSectionLabel}
                                                                </QuickLinkButton>
                                                            )}
                                                        </ListItem>
                                                        <ListItem>
                                                            {carsSectionLabel && (
                                                                <QuickLinkButton
                                                                    aria-expanded={isNavigationOpen}
                                                                    aria-controls={ariaId}
                                                                    onClick={() =>
                                                                        handleOnNavigationOpen(
                                                                            tabIndices.cars
                                                                        )
                                                                    }
                                                                >
                                                                    {carsSectionLabel}
                                                                </QuickLinkButton>
                                                            )}
                                                        </ListItem>
                                                        <ListItem>
                                                            {teamsSectionLabel && (
                                                                <QuickLinkButton
                                                                    aria-expanded={isNavigationOpen}
                                                                    aria-controls={ariaId}
                                                                    onClick={() =>
                                                                        handleOnNavigationOpen(
                                                                            tabIndices.teams
                                                                        )
                                                                    }
                                                                >
                                                                    {teamsSectionLabel}
                                                                </QuickLinkButton>
                                                            )}
                                                        </ListItem>
                                                        <ListItem>
                                                            {eventsSectionLabel && (
                                                                <QuickLinkButton
                                                                    aria-expanded={isNavigationOpen}
                                                                    aria-controls={ariaId}
                                                                    onClick={() =>
                                                                        handleOnNavigationOpen(
                                                                            tabIndices.events
                                                                        )
                                                                    }
                                                                >
                                                                    {eventsSectionLabel}
                                                                </QuickLinkButton>
                                                            )}
                                                        </ListItem>
                                                        <ListItem>
                                                            {journalPage && (
                                                                <QuickLink
                                                                    item={journalPage}
                                                                    display={{
                                                                        base: "none",
                                                                        l: "block",
                                                                    }}
                                                                >
                                                                    {journalPage.linkTitle ??
                                                                        journalPage.title}
                                                                </QuickLink>
                                                            )}
                                                        </ListItem>
                                                        <ListItem
                                                            sx={{
                                                                display: "flex",
                                                                [mediaQueryMinWidth.l]: {
                                                                    display: "none",
                                                                },
                                                            }}
                                                        >
                                                            <ButtonPure
                                                                icon="menu-lines"
                                                                aria-hidden="false"
                                                                theme="dark"
                                                                aria-expanded={isNavigationOpen}
                                                                aria-controls={ariaId}
                                                                onClick={() =>
                                                                    handleOnNavigationOpen(
                                                                        undefined
                                                                    )
                                                                }
                                                                hideLabel={true}
                                                            >
                                                                {ARIA_LABEL_OPEN_NAVIGATION}
                                                            </ButtonPure>
                                                        </ListItem>
                                                    </QuickLinks>
                                                )}
                                            </AnimatePresence>

                                            <MotionBox
                                                as="section"
                                                aria-label="Main navigation menu"
                                                className="inner-content"
                                                position="absolute"
                                                width="100%"
                                                height={{
                                                    base: targetHeightForExpandedNavigation,
                                                    l: "640px",
                                                }}
                                                willChange="height, width"
                                                // burger nav: panel grows downwards from the top;
                                                // old nav grows upwards from the bottom bar
                                                top={{ base: isBurgerNav ? 0 : "auto", l: 0 }}
                                                bottom={{
                                                    base: isBurgerNav ? "auto" : 0,
                                                    l: "auto",
                                                }}
                                                left="50%"
                                                transform="translateX(-50%)"
                                                transformOrigin="center top"
                                                zIndex={1}
                                                sx={{
                                                    contentVisibility: "auto",
                                                }}
                                                variants={animVariantsInnerContent}
                                                onAnimationComplete={
                                                    handleOnAnimationCompleteOnInnerContent
                                                }
                                                inert={!isNavigationOpen ? "" : undefined}
                                            >
                                                <Box
                                                    ref={closeOnClickOutsideOfMainNavigationRef}
                                                    position="relative"
                                                    width="100%"
                                                    height="100%"
                                                >
                                                    <Tabs
                                                        index={tabIndex}
                                                        onChange={handleOnTabsChange}
                                                        height="100%"
                                                        display="flex"
                                                        isManual
                                                    >
                                                        <Grid
                                                            templateColumns={{
                                                                base: "repeat(2, 1fr)",
                                                                l: "repeat(3, 1fr)",
                                                            }}
                                                            gap={6}
                                                            flex={1}
                                                            marginRight={{ base: 0, l: 1 }}
                                                        >
                                                            <MotionGridItem
                                                                layout
                                                                key={`tab-list-${isNavigationOpen}-${isTabListVisible}`}
                                                                className="tab-list"
                                                                colSpan={{ base: 2, l: 1 }}
                                                                as={TabList}
                                                                flexDirection="column"
                                                                alignItems="start"
                                                                px={6}
                                                                py={6}
                                                                position={{
                                                                    base: "absolute",
                                                                    l: "static",
                                                                }}
                                                                height={{
                                                                    base: "100%",
                                                                    l: "auto",
                                                                }}
                                                                overflowY="auto"
                                                                sx={{
                                                                    scrollbarWidth: "none",
                                                                    "&::webkit-scrollbar": {
                                                                        display: "none",
                                                                    },
                                                                }}
                                                                pointerEvents={
                                                                    isTabListVisible
                                                                        ? "auto"
                                                                        : "none"
                                                                }
                                                                variants={animVariantsTabList}
                                                                initial="tabListHiddenWithY"
                                                                animate={
                                                                    isTabListVisible
                                                                        ? "tabListVisible"
                                                                        : "tabListHidden"
                                                                }
                                                                custom={{
                                                                    delayChildren:
                                                                        !shouldAnimateInsideExpandedNavigation,
                                                                }}
                                                            >
                                                                <VStack
                                                                    align="start"
                                                                    width="100%"
                                                                    gap={2}
                                                                >
                                                                    <MotionTab
                                                                        variants={animVariantsTab}
                                                                        onClick={handleOnTabOpen}
                                                                        highlight={
                                                                            tabIndex ===
                                                                            tabIndices.series
                                                                        }
                                                                    >
                                                                        {seriesSectionLabel}
                                                                    </MotionTab>

                                                                    <MotionTab
                                                                        variants={animVariantsTab}
                                                                        onClick={handleOnTabOpen}
                                                                        highlight={
                                                                            tabIndex ===
                                                                            tabIndices.cars
                                                                        }
                                                                    >
                                                                        {carsSectionLabel}
                                                                    </MotionTab>

                                                                    <MotionTab
                                                                        variants={animVariantsTab}
                                                                        onClick={handleOnTabOpen}
                                                                        highlight={
                                                                            tabIndex ===
                                                                            tabIndices.teams
                                                                        }
                                                                    >
                                                                        {teamsSectionLabel}
                                                                    </MotionTab>

                                                                    <MotionTab
                                                                        variants={animVariantsTab}
                                                                        onClick={handleOnTabOpen}
                                                                        highlight={
                                                                            tabIndex ===
                                                                            tabIndices.events
                                                                        }
                                                                    >
                                                                        {eventsSectionLabel}
                                                                    </MotionTab>

                                                                    {journalPage?.__typename &&
                                                                        journalPage.sys.id && (
                                                                            <LinkMotionTab
                                                                                onFocus={(e) => {
                                                                                    // Focus first Anchor element
                                                                                    const firstAnchor =
                                                                                        e.target.querySelector(
                                                                                            "a"
                                                                                        );

                                                                                    if (
                                                                                        firstAnchor
                                                                                    ) {
                                                                                        firstAnchor.focus();
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <MotionSectionLink
                                                                                    entryId={
                                                                                        journalPage
                                                                                            .sys.id
                                                                                    }
                                                                                    entryTypename={
                                                                                        journalPage.__typename
                                                                                    }
                                                                                    href={getHrefForPageType(
                                                                                        journalPage
                                                                                    )}
                                                                                    onClick={
                                                                                        handleOnNavigationClose
                                                                                    }
                                                                                    variants={
                                                                                        animVariantsTab
                                                                                    }
                                                                                    tabIndex={-1}
                                                                                >
                                                                                    {journalPage.linkTitle ??
                                                                                        journalPage.title}
                                                                                </MotionSectionLink>
                                                                            </LinkMotionTab>
                                                                        )}
                                                                </VStack>
                                                            </MotionGridItem>

                                                            <MotionGridItem
                                                                ref={tabPanelsScrollRef}
                                                                onScroll={handleTabPanelsScroll}
                                                                layout
                                                                key="tab-panels"
                                                                className="tab-panels"
                                                                colSpan={2}
                                                                as={TabPanels}
                                                                position={{
                                                                    base: "absolute",
                                                                    l: "static",
                                                                }}
                                                                height={{
                                                                    base: "100%",
                                                                    l: "auto",
                                                                }}
                                                                overflowY="scroll"
                                                                overscrollBehavior="contain"
                                                                paddingRight={{
                                                                    base: 0,
                                                                    l: 14,
                                                                }}
                                                                sx={{
                                                                    scrollbarGutter: "stable",
                                                                    "&::-webkit-scrollbar": {
                                                                        display: {
                                                                            base: "none",
                                                                            l: "block",
                                                                        },
                                                                        width: {
                                                                            base: 0,
                                                                            l: 1,
                                                                        },
                                                                        height: {
                                                                            base: 0,
                                                                            l: 10,
                                                                        },
                                                                        backgroundColor:
                                                                            "transparent",
                                                                    },
                                                                    "&::-webkit-scrollbar-thumb": {
                                                                        backgroundColor:
                                                                            "rgba(255,255,255,0.25)",
                                                                        borderRadius: 4,
                                                                    },
                                                                }}
                                                                pointerEvents={
                                                                    isTabPanelsVisible
                                                                        ? "auto"
                                                                        : "none"
                                                                }
                                                                variants={animVariantsTabPanels}
                                                                initial="tabPanelsHidden"
                                                                animate={
                                                                    isTabPanelsVisible
                                                                        ? "tabPanelsVisible"
                                                                        : "tabPanelsHidden"
                                                                }
                                                            >
                                                                <MotionTabPanel
                                                                    key="tab-panel-series"
                                                                    variants={animVariantsTabPanel}
                                                                    initial="tabPanelHidden"
                                                                    animate={
                                                                        tabIndex ===
                                                                        tabIndices.series
                                                                            ? "tabPanelVisible"
                                                                            : "tabPanelHidden"
                                                                    }
                                                                    custom={{
                                                                        delay: !shouldAnimateInsideExpandedNavigation,
                                                                        isAboveLarge,
                                                                    }}
                                                                >
                                                                    <MobileTabClose
                                                                        onClick={handleOnTabClose}
                                                                    >
                                                                        {seriesSectionLabel}
                                                                    </MobileTabClose>
                                                                    <TabScrollBox
                                                                        ref={seriesTabScrollRef}
                                                                        onScroll={
                                                                            handleTabPanelsScroll
                                                                        }
                                                                    >
                                                                        <SectionAccordion
                                                                            index={
                                                                                seriesAccordionIndex
                                                                            }
                                                                            onChange={(index) =>
                                                                                setSeriesAccordionIndex(
                                                                                    index
                                                                                )
                                                                            }
                                                                        >
                                                                            {seriesSectionCollection?.items.map(
                                                                                (
                                                                                    seriesSectionCollectionItem,
                                                                                    index
                                                                                ) => (
                                                                                    <SectionAccordionItem
                                                                                        key={`${seriesSectionCollectionItem?.sys.id}-${index}`}
                                                                                    >
                                                                                        {({
                                                                                            isExpanded,
                                                                                        }) => (
                                                                                            <>
                                                                                                <SectionAccordionButton
                                                                                                    isExpanded={
                                                                                                        isExpanded
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        seriesSectionCollectionItem?.title
                                                                                                    }
                                                                                                </SectionAccordionButton>
                                                                                                <SectionAccordionPanel>
                                                                                                    <MotionSectionGrid
                                                                                                        initial="hidden"
                                                                                                        animate={
                                                                                                            tabIndex ===
                                                                                                                tabIndices.series &&
                                                                                                            isExpanded
                                                                                                                ? "visible"
                                                                                                                : "hidden"
                                                                                                        }
                                                                                                        variants={
                                                                                                            animVariantsSectionGrid
                                                                                                        }
                                                                                                        custom={{
                                                                                                            delayChildren:
                                                                                                                !shouldAnimateInsideExpandedNavigation,
                                                                                                            isAboveLarge,
                                                                                                        }}
                                                                                                    >
                                                                                                        {seriesSectionCollectionItem?.itemsCollection?.items.map(
                                                                                                            (
                                                                                                                seriesSectionCollectionItemItem,
                                                                                                                index
                                                                                                            ) =>
                                                                                                                seriesSectionCollectionItemItem && (
                                                                                                                    <MotionSectionGridItem
                                                                                                                        key={`${seriesSectionCollectionItemItem?.sys.id}-${index}`}
                                                                                                                        variants={
                                                                                                                            animVariantsSectionGridItem
                                                                                                                        }
                                                                                                                    >
                                                                                                                        <SectionLinkCard
                                                                                                                            {...seriesSectionCollectionItemItem}
                                                                                                                            onClick={
                                                                                                                                handleOnNavigationClose
                                                                                                                            }
                                                                                                                        >
                                                                                                                            {seriesSectionCollectionItemItem.image ? (
                                                                                                                                <SectionImage
                                                                                                                                    wrapperProps={{
                                                                                                                                        backgroundColor:
                                                                                                                                            "rgba(255,255,255,0.1)",
                                                                                                                                        display:
                                                                                                                                            "flex",
                                                                                                                                        alignItems:
                                                                                                                                            "center",
                                                                                                                                    }}
                                                                                                                                    cloudinaryAsset={
                                                                                                                                        seriesSectionCollectionItemItem.image
                                                                                                                                    }
                                                                                                                                    gravity="center"
                                                                                                                                    motionWrapperProps={{
                                                                                                                                        maxHeight:
                                                                                                                                            "60%",
                                                                                                                                    }}
                                                                                                                                />
                                                                                                                            ) : (
                                                                                                                                <SeriesMarquee
                                                                                                                                    theme={
                                                                                                                                        seriesSectionCollectionItemItem.theme
                                                                                                                                    }
                                                                                                                                >
                                                                                                                                    {String(
                                                                                                                                        seriesSectionCollectionItemItem.animatedLabel ??
                                                                                                                                            seriesSectionCollectionItemItem.label
                                                                                                                                    )}
                                                                                                                                </SeriesMarquee>
                                                                                                                            )}
                                                                                                                        </SectionLinkCard>
                                                                                                                    </MotionSectionGridItem>
                                                                                                                )
                                                                                                        )}
                                                                                                    </MotionSectionGrid>
                                                                                                </SectionAccordionPanel>
                                                                                            </>
                                                                                        )}
                                                                                    </SectionAccordionItem>
                                                                                )
                                                                            )}
                                                                        </SectionAccordion>
                                                                    </TabScrollBox>
                                                                </MotionTabPanel>

                                                                <MotionTabPanel
                                                                    key="tab-panel-cars"
                                                                    variants={animVariantsTabPanel}
                                                                    initial="tabPanelHidden"
                                                                    animate={
                                                                        tabIndex === tabIndices.cars
                                                                            ? "tabPanelVisible"
                                                                            : "tabPanelHidden"
                                                                    }
                                                                    custom={{
                                                                        delay: !shouldAnimateInsideExpandedNavigation,
                                                                        isAboveLarge,
                                                                    }}
                                                                >
                                                                    <MobileTabClose
                                                                        onClick={handleOnTabClose}
                                                                    >
                                                                        {carsSectionLabel}
                                                                    </MobileTabClose>
                                                                    <TabScrollBox
                                                                        ref={carsTabScrollRef}
                                                                        onScroll={
                                                                            handleTabPanelsScroll
                                                                        }
                                                                    >
                                                                        <MotionSectionGrid
                                                                            initial="hidden"
                                                                            animate={
                                                                                tabIndex ===
                                                                                tabIndices.cars
                                                                                    ? "visible"
                                                                                    : "hidden"
                                                                            }
                                                                            variants={
                                                                                animVariantsSectionGrid
                                                                            }
                                                                            custom={{
                                                                                delayChildren:
                                                                                    !shouldAnimateInsideExpandedNavigation,
                                                                                isAboveLarge,
                                                                            }}
                                                                        >
                                                                            {carsSectionCollection?.items.map(
                                                                                (
                                                                                    carsSectionCollectionItem,
                                                                                    index
                                                                                ) =>
                                                                                    carsSectionCollectionItem && (
                                                                                        <MotionSectionGridItem
                                                                                            key={`${carsSectionCollectionItem?.sys.id}-${index}`}
                                                                                            variants={
                                                                                                animVariantsSectionGridItem
                                                                                            }
                                                                                        >
                                                                                            <SectionLinkCard
                                                                                                {...carsSectionCollectionItem}
                                                                                                onClick={
                                                                                                    handleOnNavigationClose
                                                                                                }
                                                                                            >
                                                                                                <SectionImage
                                                                                                    cloudinaryAsset={
                                                                                                        carsSectionCollectionItem.image
                                                                                                    }
                                                                                                    gravity="center"
                                                                                                />
                                                                                            </SectionLinkCard>
                                                                                        </MotionSectionGridItem>
                                                                                    )
                                                                            )}
                                                                        </MotionSectionGrid>
                                                                    </TabScrollBox>
                                                                </MotionTabPanel>

                                                                <MotionTabPanel
                                                                    key="tab-panel-teams"
                                                                    variants={animVariantsTabPanel}
                                                                    initial="tabPanelHidden"
                                                                    animate={
                                                                        tabIndex ===
                                                                        tabIndices.teams
                                                                            ? "tabPanelVisible"
                                                                            : "tabPanelHidden"
                                                                    }
                                                                    custom={{
                                                                        delay: !shouldAnimateInsideExpandedNavigation,
                                                                        isAboveLarge,
                                                                    }}
                                                                >
                                                                    <MobileTabClose
                                                                        onClick={handleOnTabClose}
                                                                    >
                                                                        {teamsSectionLabel}
                                                                    </MobileTabClose>
                                                                    <TabScrollBox
                                                                        ref={teamsTabScrollRef}
                                                                        onScroll={
                                                                            handleTabPanelsScroll
                                                                        }
                                                                    >
                                                                        <MotionSectionGrid
                                                                            initial="visible"
                                                                            animate={
                                                                                tabIndex ===
                                                                                tabIndices.teams
                                                                                    ? "visible"
                                                                                    : "hidden"
                                                                            }
                                                                            variants={
                                                                                animVariantsSectionGrid
                                                                            }
                                                                            custom={{
                                                                                delayChildren:
                                                                                    !shouldAnimateInsideExpandedNavigation,
                                                                                isAboveLarge,
                                                                            }}
                                                                        >
                                                                            {teamsSectionCollection?.items.map(
                                                                                (
                                                                                    teamsSectionCollectionItem,
                                                                                    index
                                                                                ) =>
                                                                                    teamsSectionCollectionItem && (
                                                                                        <MotionSectionGridItem
                                                                                            key={`${teamsSectionCollectionItem?.sys.id}-${index}`}
                                                                                            variants={
                                                                                                animVariantsSectionGridItem
                                                                                            }
                                                                                        >
                                                                                            <SectionLinkCard
                                                                                                {...teamsSectionCollectionItem}
                                                                                                onClick={
                                                                                                    handleOnNavigationClose
                                                                                                }
                                                                                            >
                                                                                                <SectionImage
                                                                                                    wrapperProps={{
                                                                                                        backgroundColor:
                                                                                                            "rgba(255,255,255,0.1)",
                                                                                                        display:
                                                                                                            "flex",
                                                                                                        alignItems:
                                                                                                            "center",
                                                                                                    }}
                                                                                                    cloudinaryAsset={
                                                                                                        teamsSectionCollectionItem.image
                                                                                                    }
                                                                                                    gravity="center"
                                                                                                    motionWrapperProps={{
                                                                                                        maxHeight:
                                                                                                            "60%",
                                                                                                    }}
                                                                                                />
                                                                                            </SectionLinkCard>
                                                                                        </MotionSectionGridItem>
                                                                                    )
                                                                            )}
                                                                        </MotionSectionGrid>
                                                                    </TabScrollBox>
                                                                </MotionTabPanel>

                                                                <MotionTabPanel
                                                                    key="tab-panel-events"
                                                                    variants={animVariantsTabPanel}
                                                                    initial="tabPanelHidden"
                                                                    animate={
                                                                        tabIndex ===
                                                                        tabIndices.events
                                                                            ? "tabPanelVisible"
                                                                            : "tabPanelHidden"
                                                                    }
                                                                    custom={{
                                                                        delay: !shouldAnimateInsideExpandedNavigation,
                                                                        isAboveLarge,
                                                                    }}
                                                                >
                                                                    <MobileTabClose
                                                                        onClick={handleOnTabClose}
                                                                    >
                                                                        {eventsSectionLabel}
                                                                    </MobileTabClose>
                                                                    <TabScrollBox
                                                                        ref={eventsTabScrollRef}
                                                                        onScroll={
                                                                            handleTabPanelsScroll
                                                                        }
                                                                    >
                                                                        <SectionAccordion
                                                                            index={
                                                                                eventsAccordionIndex
                                                                            }
                                                                            onChange={(index) =>
                                                                                setEventsAccordionIndex(
                                                                                    index
                                                                                )
                                                                            }
                                                                        >
                                                                            {eventsSectionCollection?.items.map(
                                                                                (
                                                                                    eventsSectionCollectionItem,
                                                                                    index
                                                                                ) => (
                                                                                    <SectionAccordionItem
                                                                                        key={`${eventsSectionCollectionItem?.sys.id}-${index}`}
                                                                                    >
                                                                                        {({
                                                                                            isExpanded,
                                                                                        }) => (
                                                                                            <>
                                                                                                <SectionAccordionButton
                                                                                                    isExpanded={
                                                                                                        isExpanded
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        eventsSectionCollectionItem?.title
                                                                                                    }
                                                                                                </SectionAccordionButton>
                                                                                                <SectionAccordionPanel>
                                                                                                    <MotionSectionGrid
                                                                                                        initial="hidden"
                                                                                                        animate={
                                                                                                            tabIndex ===
                                                                                                                tabIndices.events &&
                                                                                                            isExpanded
                                                                                                                ? "visible"
                                                                                                                : "hidden"
                                                                                                        }
                                                                                                        variants={
                                                                                                            animVariantsSectionGrid
                                                                                                        }
                                                                                                        custom={{
                                                                                                            delayChildren:
                                                                                                                !shouldAnimateInsideExpandedNavigation,
                                                                                                            isAboveLarge,
                                                                                                        }}
                                                                                                    >
                                                                                                        {eventsSectionCollectionItem?.itemsCollection?.items.map(
                                                                                                            (
                                                                                                                eventsSectionCollectionItemItem,
                                                                                                                index
                                                                                                            ) =>
                                                                                                                eventsSectionCollectionItemItem && (
                                                                                                                    <MotionSectionGridItem
                                                                                                                        key={`${eventsSectionCollectionItemItem?.sys.id}-${index}`}
                                                                                                                        variants={
                                                                                                                            animVariantsSectionGridItem
                                                                                                                        }
                                                                                                                    >
                                                                                                                        <SectionLinkCard
                                                                                                                            {...eventsSectionCollectionItemItem}
                                                                                                                            onClick={
                                                                                                                                handleOnNavigationClose
                                                                                                                            }
                                                                                                                        >
                                                                                                                            <SectionImage
                                                                                                                                cloudinaryAsset={
                                                                                                                                    eventsSectionCollectionItemItem.image
                                                                                                                                }
                                                                                                                                objectFit="cover"
                                                                                                                            />
                                                                                                                        </SectionLinkCard>
                                                                                                                    </MotionSectionGridItem>
                                                                                                                )
                                                                                                        )}
                                                                                                    </MotionSectionGrid>
                                                                                                </SectionAccordionPanel>
                                                                                            </>
                                                                                        )}
                                                                                    </SectionAccordionItem>
                                                                                )
                                                                            )}
                                                                        </SectionAccordion>
                                                                    </TabScrollBox>
                                                                </MotionTabPanel>
                                                                <ScrollIndicatorGradientOverlay
                                                                    show={shouldShowScrollIndicator}
                                                                    //sx={{
                                                                    //    maskImage:
                                                                    //        "linear-gradient(to right, black 0%, black 96%, transparent 100%)",
                                                                    //    WebkitMaskImage:
                                                                    //        "linear-gradient(to right, black 0%, black 96%, transparent 100%)",
                                                                    //}}
                                                                />
                                                            </MotionGridItem>
                                                        </Grid>
                                                        <AnimatePresence>
                                                            {isNavigationOpen && (
                                                                <MotionBox
                                                                    className="close-button"
                                                                    position="absolute"
                                                                    top={4}
                                                                    right={4}
                                                                    sx={{
                                                                        display: "none",
                                                                        [mediaQueryMinWidth.l]: {
                                                                            display: "flex",
                                                                        },
                                                                    }}
                                                                >
                                                                    <Button
                                                                        aria-controls={ariaId}
                                                                        onClick={
                                                                            handleOnNavigationClose
                                                                        }
                                                                        icon="close"
                                                                        hideLabel
                                                                        aria-label={
                                                                            ARIA_LABEL_CLOSE_NAVIGATION
                                                                        }
                                                                        variant="ghost"
                                                                        theme="dark"
                                                                        compact
                                                                    />
                                                                </MotionBox>
                                                            )}
                                                        </AnimatePresence>
                                                    </Tabs>
                                                </Box>
                                            </MotionBox>
                                        </MotionBox>
                                    </MotionBox>
                                </GridItem>
                                <GridItem
                                    as={HStack}
                                    justifyContent="end"
                                    gap={3}
                                    position="absolute"
                                    right={10}
                                    top={0}
                                    display={{ base: "none", l: "flex" }}
                                    flexDirection="row-reverse"
                                >
                                    {highlightLink && (
                                        <HighlightLink
                                            highlightLink={highlightLink}
                                            hideExternalIcon
                                        />
                                    )}
                                    {languageSelectorItemsCollection?.items && (
                                        <Box ref={closeOnClickOutsideOfLanguageSelectorDesktopRef}>
                                            <LanguageSelector
                                                items={languageSelectorItemsCollection.items}
                                                onClose={handleOnNavigationClose}
                                                id="language-selector-desktop"
                                                searchPlaceholder={
                                                    languageSelectorSearchPlaceholder
                                                }
                                                languageSelectorErrorLabel={
                                                    languageSelectorErrorLabel
                                                }
                                            />
                                        </Box>
                                    )}
                                </GridItem>
                            </WrapperContainer>
                        </Box>
                    </nav>
                </RemoveScroll>
            </FocusLock>
        </Box>
    );
};
