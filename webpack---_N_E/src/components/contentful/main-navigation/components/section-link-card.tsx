import type { MouseEvent as ReactMouseEvent } from "react";
import type { PartMainNavigationItemFragment } from "@/components/contentful/main-navigation/__generated/main-navigation.contentful.generated";
import type { NextLinkProps } from "@project/ui";
import { NextLink, AspectRatio, LinkBox, LinkOverlay, VStack, Text, Box } from "@project/ui";
import { getHrefForPageType } from "@/common/helpers/slug";
import { sendNavigationLinkClickToGTM } from "@/components/contentful/main-navigation/tracking-nav-click";
import { useRouter } from "next/router";
import { getFocusStyle } from "@porsche-design-system/components-react/styles";
import { useAppStore } from "@/store/app-store";
import { frostedGlassStyle } from "@porsche-design-system/components-react/styles";

type SectionLinkCardProps = PartMainNavigationItemFragment & Omit<NextLinkProps, "href">;

const SectionLinkCard = ({
    label,
    animatedLabel,
    theme,
    page,
    image,
    dateLabel,
    sys,
    __typename,
    children,
    onClick,
    ...rest
}: SectionLinkCardProps) => {
    const { locale } = useRouter();
    const {
        state: { pageType, pageId, pageContentTags },
    } = useAppStore();

    if (!page || !label) {
        return null;
    }

    const handleOnClick = (e: ReactMouseEvent<HTMLAnchorElement, MouseEvent>) => {
        onClick && onClick(e);

        const targetUrl = e.currentTarget.getAttribute("href") ?? "";
        const clickElementType = "navigation";
        const clickElementId = pageId;
        const clickElementName = label;
        const targetType = "internal";

        sendNavigationLinkClickToGTM({
            locale: locale!,
            pageExperience: {
                pageCategory: pageType,
                contentTags: pageContentTags ?? [],
            },
            componentClick: {
                clickElementType,
                clickElementId,
                clickElementName,
                targetUrl,
                targetType,
            },
        });
    };

    return (
        <LinkBox
            data-group
            py={4}
            px={{ base: 4, l: 6 }}
            rounded="medium"
            height="100%"
            backgroundColor={{
                base: "rgba(255,255,255,0.1)",
                l: "transparent",
            }}
            _hover={{
                l: {
                    backgroundColor: "rgba(255,255,255,0.1)",
                },
            }}
            transitionProperty="var(--transition-property-common)"
            transitionDuration="var(--transition-duration-moderate)"
        >
            <VStack align="stretch" justify="space-between" height="100%">
                <LinkOverlay
                    {...rest}
                    color="allWhite"
                    fontWeight={600}
                    as={NextLink}
                    href={getHrefForPageType(page)}
                    onClick={handleOnClick}
                    _focusVisible={{ ...getFocusStyle() }}
                >
                    {label}
                </LinkOverlay>
                <AspectRatio
                    ratio="16:9"
                    rounded="medium"
                    overflow="hidden"
                    sx={{
                        containerType: "size",
                    }}
                    cursor="pointer"
                    pointerEvents="none"
                >
                    {children}
                </AspectRatio>
                {dateLabel && (
                    <Box
                        position="absolute"
                        bottom={6}
                        left={{ base: 6, l: 8 }}
                        background="linear-gradient(135deg, rgba(148, 149, 152, 0.20) 0%, rgba(148, 149, 152, 0.10) 100%)"
                        backdropFilter={frostedGlassStyle.backdropFilter}
                        borderRadius="medium"
                        px={3}
                        py={1}
                        pointerEvents="none"
                    >
                        <Text size="xx-small" color="allWhite">
                            {dateLabel}
                        </Text>
                    </Box>
                )}
            </VStack>
        </LinkBox>
    );
};

export { SectionLinkCard };
