import { Box, Flex, Text, useDisclosure, useMediaQuery, forwardRef, NextLink } from "@project/ui";
import type { BoxProps } from "@project/ui";
import type { MainNavigationFieldsFragment } from "@/components/contentful/main-navigation/__generated/main-navigation.contentful.generated";
import { TwitchModal } from "@/components/modals/twitch";
import { frostedGlassStyle } from "@porsche-design-system/components-react/styles";
import type { LinkWrapperProps } from "@/components/link-wrapper";
import { LinkWrapper } from "@/components/link-wrapper";
import { PAGMSHEvents, sendPagDataToGTM } from "@/lib/google-tag-manager/events";
import { useRouter } from "next/router";
import { useAppStore } from "@/store/app-store";

const HighlightLinkButton = forwardRef<BoxProps, "button">(
    ({ children, as = "button", ...props }, ref) => {
        return (
            <Flex
                as={as}
                color="allWhite"
                backdropFilter={frostedGlassStyle.backdropFilter}
                backgroundColor="porscheBlackShaded"
                px={5}
                height={{ base: 9, l: "navQuickLinksHeight" }}
                borderRadius="medium"
                transition="var(--transition-property-common), var(--transition-duration-short) var(--transition-easing-base)"
                alignItems="center"
                justifyContent="center"
                gap={2}
                {...props}
                ref={ref}
            >
                <Box as="span" bgColor="motorsportsRed" height={2} width={2} borderRadius="full" />
                <Text>{children}</Text>
            </Flex>
        );
    }
);

type HighlightLinkProps = Omit<LinkWrapperProps, "item"> &
    Pick<MainNavigationFieldsFragment, "highlightLink"> & {
        hideExternalIcon?: boolean;
    };

const HighlightLink = forwardRef<HighlightLinkProps, "button">(
    // eslint-disable-next-line sonarjs/cognitive-complexity
    ({ highlightLink, hideExternalIcon, ...props }, ref) => {
        const { isOpen, onOpen, onClose } = useDisclosure();

        const { locale } = useRouter();
        const {
            state: { pageType, pageId, pageContentTags },
        } = useAppStore();

        const [isMouseDevice] = useMediaQuery("(hover: hover)", {
            ssr: true,
            fallback: true,
        });

        const handleOnOpen = () => {
            const trackingPayload = {
                locale: locale!,
                eventAction: PAGMSHEvents.highlightNavigationToggleClick,
                pageExperience: {
                    pageCategory: pageType,
                    contentTags: pageContentTags ?? [],
                },
                componentClick: {
                    clickElementId: pageId,
                },
            };

            if (!isMouseDevice) {
                if (
                    highlightLink &&
                    highlightLink.__typename === "ModalLink" &&
                    highlightLink.embedId &&
                    highlightLink.embedProvider === "twitch"
                ) {
                    const targetUrl = [
                        "https://www.twitch.tv",
                        ...(highlightLink.twitchEmbedType === "channel"
                            ? [highlightLink.embedId]
                            : []),
                        ...(highlightLink.twitchEmbedType === "videos"
                            ? ["videos", highlightLink.embedId]
                            : []),
                        ...(highlightLink.twitchEmbedType === "collections"
                            ? ["collections", highlightLink.embedId]
                            : []),
                    ].join("/");

                    sendPagDataToGTM({
                        ...trackingPayload,
                        componentClick: {
                            ...trackingPayload.componentClick,
                            clickElementType: "navigation",
                            clickElementName: highlightLink.label ?? "https://www.twitch.tv",
                            targetType: "outbound",
                            targetUrl,
                        },
                    });

                    window.open(targetUrl, "_blank");
                }
                return;
            }

            onOpen();
        };

        if (highlightLink?.__typename === "ModalLink" && highlightLink.embedId) {
            return (
                <>
                    <HighlightLinkButton {...props} onClick={handleOnOpen} ref={ref}>
                        {highlightLink.label}
                    </HighlightLinkButton>
                    <TwitchModal
                        isOpen={isOpen}
                        onClose={onClose}
                        onOpen={onOpen}
                        embedId={highlightLink.embedId}
                        title={highlightLink.modalTitle}
                        twitchEmbedType={
                            highlightLink.twitchEmbedType as "channel" | "video" | "collection"
                        }
                    />
                </>
            );
        }

        if (highlightLink && highlightLink?.__typename !== "ModalLink") {
            return (
                <LinkWrapper
                    item={highlightLink}
                    renderAs={NextLink}
                    icon={
                        highlightLink.__typename === "ExternalLink" && hideExternalIcon
                            ? "none"
                            : undefined
                    }
                    {...props}
                >
                    <HighlightLinkButton>
                        {highlightLink.__typename === "ExternalLink"
                            ? highlightLink.label
                            : (highlightLink.linkTitle ?? highlightLink.title)}
                    </HighlightLinkButton>
                </LinkWrapper>
            );
        }

        return null;
    }
);

export { HighlightLink };
