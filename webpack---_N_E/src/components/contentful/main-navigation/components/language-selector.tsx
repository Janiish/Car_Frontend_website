import type {
    LanguageSelectorItemFieldsFragment,
    MainNavigationFieldsFragment,
} from "@/components/contentful/main-navigation/__generated/main-navigation.contentful.generated";
import {
    HStack,
    Flex,
    Box,
    NextLink,
    Flag,
    Icon,
    useDisclosure,
    MotionBox,
    Heading,
    Text,
    InputSearch,
    NdlIconButton,
    mediaQueryMinWidth,
} from "@project/ui";
import { useRouter } from "next/router";
import type { MouseEvent, ReactNode } from "react";
import { useMemo, useRef, useEffect, useState } from "react";
import { AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { frostedGlassStyle, getFocusStyle } from "@porsche-design-system/components-react/styles";
import { useAppStore } from "@/store/app-store";
import {
    sendPagDataToGTM,
    PAGMSHEvents,
    type PagDataComponentClickObject,
} from "@/lib/google-tag-manager/events";
import { scrollbarStyles } from "./scroll-indicator";
import { useClickOutside } from "@/hooks/use-click-outside";
import type { Transition, Variants } from "framer-motion";
import { Backdrop } from "./backdrop";
import { PorscheLogo } from "@/components/porsche-logo";
import { RemoveScroll } from "react-remove-scroll";
import FocusLock from "react-focus-lock";
import { countries } from "countries-list";
import type { TCountryCode } from "countries-list";

const TRANSITION_LANGUAGE_SELECTOR: Transition = {
    duration: 0.45,
    ease: [0.4, 0, 0.2, 1],
};

const animVariantsLanguageSelector: Variants = {
    hidden: {
        opacity: 0,
        y: -12,
        scale: 0.98,
        transition: TRANSITION_LANGUAGE_SELECTOR,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: TRANSITION_LANGUAGE_SELECTOR,
    },
};

const animVariantsLanguageSelectorButton: Variants = {
    hidden: {
        opacity: 0,
        transition: TRANSITION_LANGUAGE_SELECTOR,
    },
    visible: {
        opacity: 1,
        transition: TRANSITION_LANGUAGE_SELECTOR,
    },
};

const LanguageSelectorIcon = ({ locale }: { locale: string }) => {
    const countryCode = getCountryCode(locale);
    const isValidCountryCode = countryCode && countries[countryCode as TCountryCode] !== undefined;
    const shouldShowGlobe =
        locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE || !countryCode || !isValidCountryCode;

    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            width="var(--CountryFlagIcon-height)"
            height="var(--CountryFlagIcon-height)"
        >
            {shouldShowGlobe ? (
                <Icon name="globe" theme="dark" mr={4} />
            ) : (
                <Flag countryCode={countryCode} />
            )}
        </Flex>
    );
};

const LanguageSelectorLabel = ({ children }: { children: ReactNode }) => (
    <Box as="span" color="allWhite" textTransform="uppercase" lineHeight={1}>
        {children}
    </Box>
);

type LanguageSelectorProps = MainNavigationFieldsFragment["languageSelectorItemsCollection"] & {
    onClose?: () => void;
    id?: string;
    onOpenChange?: (isOpen: boolean) => void;
    title?: string | null;
    searchPlaceholder?: string | null;
    languageSelectorErrorLabel?: string | null;
    hideButton?: boolean;
    controlledOpen?: boolean;
    hideCloseButton?: boolean;
    clickOutsideExcludeRefs?: React.RefObject<HTMLElement>[];
};

// returns a country code based on a locale i.e. fr-FR -> FR, en-US -> US, etc.
const getCountryCode = (locale: string): string => locale.split("-")[1];

const getLocaleLabel = (item: LanguageSelectorItemFieldsFragment): string =>
    `${item.countryName} (${item.languageName})`;

const closeLanguageSelectorLabel = "Close language selector";

const LanguageSelector = ({
    items,
    title,
    searchPlaceholder,
    languageSelectorErrorLabel,
    onClose,
    id,
    onOpenChange,
    hideButton = false,
    controlledOpen,
    hideCloseButton = false,
    clickOutsideExcludeRefs = [],
}: LanguageSelectorProps) => {
    const { locale } = useRouter();
    const typedLocale = locale!;
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    const {
        state: { pageType, pageId, pageContentTags, hasLiveTicker, localeSlugMap },
    } = useAppStore();

    const {
        isOpen,
        onOpen,
        onClose: onDropdownClose,
    } = useDisclosure({
        ...(controlledOpen !== undefined && { isOpen: controlledOpen }),
        onOpen: () => onOpenChange?.(true),
        onClose: () => onOpenChange?.(false),
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [isAtTop, setIsAtTop] = useState(true);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (scrollDistance) => {
        setIsAtTop(scrollDistance <= 0);
    });

    const sortedLocales = useMemo(() => {
        return items
            .filter((item): item is LanguageSelectorItemFieldsFragment => !!item)
            .sort((a, b) => {
                // Items without region go to the top
                const regionA = a.region ?? "";
                const regionB = b.region ?? "";
                const countryA = a.countryName ?? "";
                const countryB = b.countryName ?? "";

                // If one has no region and the other does, prioritize the one without
                if (!regionA && regionB) return -1;
                if (regionA && !regionB) return 1;

                // If both have no region, sort by country name
                if (!regionA && !regionB) {
                    return countryA.localeCompare(countryB);
                }

                // If both have regions, sort by region first, then by country name
                if (regionA !== regionB) {
                    return regionA.localeCompare(regionB);
                }
                return countryA.localeCompare(countryB);
            });
    }, [items]);

    const filteredLocales = useMemo(() => {
        if (!searchQuery.trim()) {
            return sortedLocales;
        }

        const query = searchQuery.toLowerCase().trim();
        return sortedLocales.filter((item) => {
            const countryName = (item.countryName ?? "").toLowerCase();
            const languageName = (item.languageName ?? "").toLowerCase();
            const region = (item.region ?? "").toLowerCase();
            const label = (item.label ?? "").toLowerCase();
            const locale = (item.locale ?? "").toLowerCase();

            return (
                countryName.includes(query) ||
                languageName.includes(query) ||
                region.includes(query) ||
                label.includes(query) ||
                locale.includes(query)
            );
        });
    }, [sortedLocales, searchQuery]);

    const activeLocale = useMemo(() => {
        return items.filter(
            (item): item is LanguageSelectorItemFieldsFragment => item?.locale === typedLocale
        )[0];
    }, [items, typedLocale]);

    const trackClick = (
        clickElementName: string,
        clickElementType: PagDataComponentClickObject["clickElementType"],
        targetUrl?: string,
        targetType?: PagDataComponentClickObject["targetType"]
    ) => {
        sendPagDataToGTM({
            eventAction: PAGMSHEvents.navigationLinkClick,
            locale: locale!,
            pageExperience: {
                pageCategory: pageType,
                contentTags: pageContentTags ?? [],
            },
            componentClick: {
                clickElementType,
                clickElementId: pageId,
                clickElementName,
                ...(targetUrl && { targetUrl }),
                ...(targetType && { targetType }),
            },
        });
    };

    const handleLanguageSelect = (
        e: MouseEvent<HTMLElement>,
        item: LanguageSelectorItemFieldsFragment
    ) => {
        e.preventDefault();

        onDropdownClose();
        onClose && onClose();

        const localeSlug = localeSlugMap?.[item.locale!];
        const isDefaultLocale = item.locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE;
        let targetUrl: string;
        if (localeSlug) {
            if (isDefaultLocale) {
                targetUrl = localeSlug;
            } else {
                targetUrl = `/${item.locale}${localeSlug}`;
            }
        } else {
            targetUrl = `/${item.locale}`;
        }

        const localeLabel = getLocaleLabel(item);

        trackClick(localeLabel, "navigation", targetUrl, "internal");

        // Hard reload so the Usercentrics cookie consent SDK reinitialises with the
        // correct settingsId and language for the new locale. Client-side navigation
        // leaves the old SDK instance running and it cannot be hot-swapped.
        window.location.assign(targetUrl);
    };

    const handleToggle = () => {
        if (isOpen) {
            onDropdownClose();
        } else {
            onOpen();
        }
    };

    const handleCloseClick = () => {
        onDropdownClose();
        trackClick(closeLanguageSelectorLabel, "interaction");
    };

    // Notify parent of open state changes (only for uncontrolled mode)
    useEffect(() => {
        if (controlledOpen === undefined) {
            onOpenChange?.(isOpen);
        }
    }, [isOpen, onOpenChange, controlledOpen]);

    // Handle click outside
    useClickOutside([dropdownRef, buttonRef, ...clickOutsideExcludeRefs], () => {
        if (isOpen) {
            onDropdownClose();
        }
    });

    // Handle escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                if (searchQuery) {
                    setSearchQuery("");
                } else {
                    onDropdownClose();
                }
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onDropdownClose, searchQuery]);

    // Clear search when dropdown closes
    useEffect(() => {
        if (!isOpen) {
            setSearchQuery("");
        }
    }, [isOpen]);

    return (
        <>
            {!hideButton && (
                <AnimatePresence>
                    <Box
                        ref={buttonRef}
                        as="button"
                        id={id}
                        height={{ base: 9, l: "navQuickLinksHeight" }}
                        cursor="pointer"
                        onClick={handleToggle}
                        backgroundColor="porscheBlackShaded"
                        backdropFilter={frostedGlassStyle.backdropFilter}
                        border="none"
                        outline="none"
                        borderRadius="ndlRadiusSmall"
                        px={4}
                        _focusVisible={{
                            ...getFocusStyle(),
                        }}
                        _hover={{ opacity: 0.9, transition: "opacity 0.3s ease" }}
                    >
                        <HStack>
                            {activeLocale?.locale && (
                                <LanguageSelectorIcon locale={activeLocale.locale} />
                            )}
                            <LanguageSelectorLabel>{activeLocale?.label}</LanguageSelectorLabel>
                        </HStack>
                    </Box>
                </AnimatePresence>
            )}

            <AnimatePresence>
                {isOpen && (
                    <FocusLock disabled={!isOpen} returnFocus autoFocus={false}>
                        <RemoveScroll enabled={isOpen} allowPinchZoom>
                            {!hideCloseButton && (
                                <Backdrop
                                    onClick={onDropdownClose}
                                    zIndex="base"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    height="calc(100vh + 200px)"
                                    my="-100px"
                                />
                            )}
                            <Box
                                className="language-selector"
                                position="relative"
                                width="full"
                                maxWidth="languageSelectorMaxWidth"
                                height="screen"
                                sx={{
                                    [mediaQueryMinWidth.l]: {
                                        position: "fixed",
                                        left: "50%",
                                        top: "calc(var(--sizes-14) + (25vh - var(--sizes-liveTickerHeight)) / 2)",
                                        transform: "translate(-50%, -50%)",
                                        height: "auto",
                                        ...(hasLiveTicker &&
                                            isAtTop && {
                                                mt: "calc(2 * var(--sizes-liveTickerHeight))",
                                            }),
                                        ...(hasLiveTicker &&
                                            !isAtTop && {
                                                mt: "calc(1 * var(--sizes-liveTickerHeight))",
                                            }),
                                    },
                                }}
                            >
                                <PorscheLogo
                                    className="logo-mobile"
                                    position="fixed"
                                    zIndex="popover"
                                    top={
                                        hasLiveTicker
                                            ? "calc(var(--sizes-liveTickerHeight) + var(--space-4))"
                                            : 4
                                    }
                                    left={5}
                                    transitionTimingFunction="var(--transition-property-common)"
                                    transitionDuration="var(--transition-duration-moderate)"
                                    transform={hasLiveTicker ? "translateY(-36px)" : "none"}
                                    opacity={1}
                                    display={{ base: "inline-block", l: "none" }}
                                    onClick={onClose ?? (() => {})}
                                    forceLogoColorWhite={true}
                                />
                                <MotionBox
                                    position="absolute"
                                    top="calc(-1 * var(--sizes-9))"
                                    right={0}
                                    zIndex="modal"
                                    sx={{
                                        display: hideCloseButton ? "none" : "flex",
                                        [mediaQueryMinWidth.l]: {
                                            position: "absolute",
                                            top: "calc(-1 * var(--sizes-14))",
                                            right: 0,
                                            left: "auto",
                                        },
                                    }}
                                    variants={animVariantsLanguageSelectorButton}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                >
                                    <NdlIconButton
                                        icon="close"
                                        onClick={handleCloseClick}
                                        ariaLabel={closeLanguageSelectorLabel}
                                        ariaControlsId={id}
                                        ariaExpanded={isOpen}
                                    />
                                </MotionBox>
                                <MotionBox
                                    ref={dropdownRef}
                                    position="fixed"
                                    left={{ base: 5, l: 0 }}
                                    right={{ base: 5, l: 0 }}
                                    top={{
                                        base: "68px",

                                        l: 0,
                                    }}
                                    bottom={{ base: 4, l: "auto" }}
                                    width={{ base: "auto", l: "full" }}
                                    maxWidth={{ base: "auto", l: "languageSelectorMaxWidth" }}
                                    height={"auto"}
                                    maxHeight={{
                                        base: "calc(90vh)",
                                        l: "min(var(--sizes-languageSelectorMaxHeight), calc(100vh - var(--sizes-languageSelectorTotalVerticalSpacing)))",
                                    }}
                                    display="flex"
                                    flexDirection="column"
                                    bg="porscheBlackShaded"
                                    borderRadius="medium"
                                    backdropFilter={frostedGlassStyle.backdropFilter}
                                    overflow="hidden"
                                    zIndex="popover"
                                    variants={animVariantsLanguageSelector}
                                    initial={{
                                        ...animVariantsLanguageSelector.hidden,
                                        x: 0,
                                        y: 0,
                                    }}
                                    animate={{
                                        ...animVariantsLanguageSelector.visible,
                                        x: 0,
                                        y: 0,
                                    }}
                                    exit={{
                                        ...animVariantsLanguageSelector.hidden,
                                        x: 0,
                                        y: 0,
                                    }}
                                >
                                    <Box
                                        px={{ base: 4, l: 6 }}
                                        py={6}
                                        overflowX="hidden"
                                        overflowY="auto"
                                        flex="1"
                                        minHeight={0}
                                        className="scroll scroll-fade-y"
                                        sx={{
                                            ...scrollbarStyles,
                                            "--scroll-fade-size": "9rem",
                                            touchAction: "pan-y",
                                            WebkitOverflowScrolling: "touch",
                                        }}
                                    >
                                        {title && (
                                            <Heading
                                                as="h2"
                                                size="headingLarge"
                                                fontWeight={400}
                                                color="allWhite"
                                                mb={6}
                                            >
                                                {title}
                                            </Heading>
                                        )}
                                        <Box mb={9} width="100%">
                                            <InputSearch
                                                placeholder={
                                                    searchPlaceholder ?? "Search languages..."
                                                }
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                clear={true}
                                                indicator={true}
                                                height="56px"
                                                borderRadius="ndlRadiusSmall"
                                                px={3}
                                                width="100%"
                                                bg="ndlLanguageSelectorNonActiveBg"
                                                border="none"
                                                color="ndlLanguageSelectorTextColor"
                                                _placeholder={{
                                                    color: "ndlLanguageSelectorPlaceholderColor",
                                                }}
                                                _hover={{
                                                    bg: "ndlLanguageSelectorHoverBg",
                                                    backdropFilter:
                                                        frostedGlassStyle.backdropFilter,
                                                }}
                                            />
                                        </Box>
                                        {filteredLocales.length === 0 ? (
                                            <Text color="allWhite" py={4}>
                                                {languageSelectorErrorLabel ?? "No languages found"}
                                            </Text>
                                        ) : (
                                            filteredLocales.map((item, index) => {
                                                const showRegionHeader =
                                                    item?.region &&
                                                    (index === 0 ||
                                                        filteredLocales[index - 1]?.region !==
                                                            item.region);
                                                const isActive = item?.locale === typedLocale;
                                                const nextItem = filteredLocales[index + 1];
                                                const hasMultipleInRegion =
                                                    item?.region &&
                                                    nextItem?.region === item.region;

                                                return item?.countryName &&
                                                    item?.languageName &&
                                                    item?.locale ? (
                                                    <Box
                                                        key={`${item.label}-${item.locale}-${index}`}
                                                        mb={hasMultipleInRegion ? 2 : 0}
                                                    >
                                                        {showRegionHeader && (
                                                            <Text
                                                                fontSize="xs"
                                                                color="allWhite"
                                                                letterSpacing="wider"
                                                                pt={6}
                                                                pb={4}
                                                            >
                                                                {item.region}
                                                            </Text>
                                                        )}
                                                        {isActive ? (
                                                            <HStack
                                                                width="full"
                                                                gap={0}
                                                                p={3}
                                                                height={10}
                                                                borderRadius="ndlRadiusSmall"
                                                                bg="ndlLanguageSelectorActiveBg"
                                                                cursor="default"
                                                            >
                                                                <LanguageSelectorIcon
                                                                    locale={item.locale}
                                                                />
                                                                <Flex
                                                                    ml={2}
                                                                    color="allWhite"
                                                                    lineHeight={1}
                                                                    alignItems="center"
                                                                    justifyContent="space-between"
                                                                    flex={1}
                                                                >
                                                                    <Box as="span">
                                                                        {getLocaleLabel(item)}
                                                                    </Box>
                                                                    <Icon
                                                                        name="check"
                                                                        size="small"
                                                                        theme="dark"
                                                                    />
                                                                </Flex>
                                                            </HStack>
                                                        ) : (
                                                            <HStack
                                                                as={NextLink}
                                                                href={
                                                                    localeSlugMap?.[item.locale] ??
                                                                    "/"
                                                                }
                                                                locale={item.locale}
                                                                width="full"
                                                                gap={3}
                                                                p={3}
                                                                height={10}
                                                                borderRadius="ndlRadiusSmall"
                                                                textDecoration="none"
                                                                bg="ndlLanguageSelectorNonActiveBg"
                                                                _hover={{
                                                                    backdropFilter:
                                                                        frostedGlassStyle.backdropFilter,
                                                                    backgroundColor:
                                                                        "ndlLanguageSelectorHoverBg",
                                                                }}
                                                                onClick={(event) =>
                                                                    handleLanguageSelect(
                                                                        event,
                                                                        item
                                                                    )
                                                                }
                                                                _focusVisible={{
                                                                    ...getFocusStyle(),
                                                                    outlineColor: "#1A44EA",
                                                                }}
                                                            >
                                                                <LanguageSelectorIcon
                                                                    locale={item.locale}
                                                                />
                                                                <Box
                                                                    as="span"
                                                                    color="allWhite"
                                                                    lineHeight={1}
                                                                >
                                                                    {getLocaleLabel(item)}
                                                                </Box>
                                                            </HStack>
                                                        )}
                                                    </Box>
                                                ) : null;
                                            })
                                        )}
                                    </Box>
                                </MotionBox>
                            </Box>
                        </RemoveScroll>
                    </FocusLock>
                )}
            </AnimatePresence>
        </>
    );
};

export { LanguageSelector };
