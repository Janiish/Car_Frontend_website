import {
    Text,
    Box,
    LinkPure,
    LinkPureExternal,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack,
    useDisclosure,
} from "@project/ui";
import type { NextLinkProps, LinkProps, LinkPureProps, LinkPureExternalProps } from "@project/ui";
// eslint-disable-next-line no-restricted-imports
import type { ComponentWithAs } from "@chakra-ui/react";
// eslint-disable-next-line no-restricted-imports
import type {
    BreakpointCustomizable,
    LinkPureSize,
} from "@porsche-design-system/components-react/ssr";
import { getHrefForPageType } from "@/common/helpers/slug";
import { type MouseEvent, useMemo } from "react";
import type { PageArticleFieldsFragment } from "@/components/contentful/page-article/__generated/page-article.contentful.generated";
import type { PageBasicFieldsFragment } from "@/components/contentful/page-basic/__generated/page-basic.contentful.generated";
import type { PageCarFieldsFragment } from "@/components/contentful/page-car/__generated/page-car.contentful.generated";
import type { PageCategoryFieldsFragment } from "@/components/contentful/page-category/__generated/page-category.contentful.generated";
import type { PageHomepageFieldsFragment } from "@/components/contentful/page-homepage/__generated/page-homepage.contentful.generated";
import type { PageRaceSeriesFieldsFragment } from "@/components/contentful/page-race-series/__generated/page-race-series.contentful.generated";
import type { PageSearchFieldsFragment } from "@/components/contentful/page-search/__generated/page-search.contentful.generated";
import type { PageTeamFieldsFragment } from "@/components/contentful/page-team/__generated/page-team.contentful.generated";
import type { PageDriverFieldsFragment } from "@/components/contentful/page-driver/__generated/page-driver.contentful.generated";
import type { PageRaceEventFieldsFragment } from "@/components/contentful/page-race-event/__generated/page-race-event.contentful.generated";
import type { ExternalLinkFieldsFragment } from "@/lib/contentful/link-fragments/__generated/link-fragments.contentful.generated";
import { useRouter } from "next/router";
import { useAppStore } from "@/store/app-store";
import { PAGMSHEvents, sendPagDataToGTM } from "@/lib/google-tag-manager/events";
import { getUsercentrics } from "./user-centrics/utils";

export type LinkWrapperProps = Omit<NextLinkProps, "href" | "size" | "as"> &
    Omit<LinkProps, "href" | "as"> &
    Omit<LinkPureProps, "href" | "as"> & {
        item:
            | PageArticleFieldsFragment
            | PageBasicFieldsFragment
            | PageCarFieldsFragment
            | PageCategoryFieldsFragment
            | PageHomepageFieldsFragment
            | PageRaceSeriesFieldsFragment
            | PageSearchFieldsFragment
            | PageTeamFieldsFragment
            | PageDriverFieldsFragment
            | PageRaceEventFieldsFragment
            | ExternalLinkFieldsFragment;
        renderAs?:
            | ComponentWithAs<"a", LinkPureProps>
            | ComponentWithAs<"a", LinkPureExternalProps>
            | ComponentWithAs<"a", LinkProps>
            | ComponentWithAs<"a", NextLinkProps>;
        renderExternalLinkAs?:
            | ComponentWithAs<"a", LinkPureProps>
            | ComponentWithAs<"a", LinkPureExternalProps>
            | ComponentWithAs<"a", LinkProps>
            | ComponentWithAs<"a", NextLinkProps>;
        size?: BreakpointCustomizable<LinkPureSize>;
        eventAction?: (typeof PAGMSHEvents)[keyof typeof PAGMSHEvents];
        clickElementName?: string;
        moduleName?: string | null;
        modulePosition?: number | null;
    };

export const LinkWrapper = ({
    item,
    renderAs: Component = LinkPure,
    renderExternalLinkAs: ComponentExternal = LinkPureExternal,
    onClick,
    children,
    eventAction = PAGMSHEvents.linkClick,
    ...props
}: LinkWrapperProps) => {
    const { isOpen: isModalOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
    const { locale } = useRouter();
    const {
        state: { pageType, pageId, pageContentTags },
    } = useAppStore();

    const { href, label } = useMemo(() => {
        let href: string, label;

        if (!item) {
            return { href: null, label: null };
        }

        if (item.__typename === "ExternalLink") {
            href = item.url ?? "/#";
            label = children ?? item.label ?? item.url;
        } else {
            href = getHrefForPageType(item);
            label = children ?? item.linkTitle ?? item.title;
        }

        return { href, label };
    }, [item, children]);

    const isUcPrivacySettingsLink = href
        ? href.includes("#uc-layer2") || href.includes("#uc-layer4")
        : false;

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (isUcPrivacySettingsLink) {
            const usercentrics = getUsercentrics();
            if (!usercentrics) {
                return;
            }

            if (href === "#uc-layer2") {
                usercentrics.toggleCenteredModalIsVisible(true);
            } else if (href === "#uc-layer4") {
                usercentrics.toggleConsentInfoModalIsVisible(true);
            }

            // dont send event to GTM
            return;
        }

        onClick && onClick(e);

        const targetUrl = href ?? "";
        const clickElementType = "navigation";
        const clickElementId = pageId;
        const clickElementName =
            props.clickElementName ??
            (item.__typename === "ExternalLink" ? item.label : item.title) ??
            "";
        const targetType = item.__typename === "ExternalLink" ? "outbound" : "internal";

        sendPagDataToGTM({
            eventAction,
            locale: locale!,
            pageExperience: {
                pageCategory: pageType,
                contentTags: pageContentTags ?? [],
            },
            context: {
                ...(props.moduleName && { moduleName: props.moduleName }),
                ...(props.modulePosition && { modulePosition: props.modulePosition }),
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

    if (isUcPrivacySettingsLink) {
        return (
            <LinkPureExternal
                {...props}
                href={href ?? "#"}
                target={undefined}
                onClick={(e) => {
                    e.preventDefault();
                    handleClick(e as MouseEvent<HTMLAnchorElement>);
                }}
                style={{ cursor: "pointer" }}
            >
                {label}
            </LinkPureExternal>
        );
    }

    if (!item) {
        return (
            <>
                <Text as="pre" color="motorsportsRed" onClick={openModal} cursor="pointer">
                    error
                </Text>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Error</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody p={6}>
                            <Text>
                                The referenced entry is missing or linking to it is not suppored,
                                please check the content in Contentful. A common cause of this is
                                when an unsupported type of entry has been used in a Rich Text Field
                                but validation is not configured correctly.
                            </Text>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </>
        );
    }

    if (label === undefined || label === null) {
        // eslint-disable-next-line turbo/no-undeclared-env-vars
        if (process.env.VERCEL_ENV === "production") {
            return (
                <Text as="pre" color="motorsportsRed">
                    error
                </Text>
            );
        }

        return (
            <>
                <Text as="pre" color="motorsportsRed" onClick={openModal} cursor="pointer">
                    error
                </Text>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Error</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody p={6}>
                            <VStack align="start">
                                <Text>
                                    Could not determine the <code>label</code>, its value is{" "}
                                    <code>null</code> or <code>undefined</code> for a entry
                                    reference link.
                                </Text>
                                <Text>
                                    The Porsche Design System components, unlike React, will throw
                                    uncaught exceptions that we cannot handle causing the site to
                                    crash when the label is nullish.
                                </Text>
                                {item && (
                                    <>
                                        <Text>
                                            Below is the referenced entry that is causing the issue.
                                            Look for missing values in the{" "}
                                            <code>Page Title (H1)</code> and <code>Link Title</code>{" "}
                                            fields. <code>Link Title</code> takes precedence over{" "}
                                            <code>Page Title (H1)</code>.
                                        </Text>
                                        {item?.sys?.id && (
                                            <Text>
                                                <LinkPureExternal
                                                    theme="dark"
                                                    href={`https://app.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}/entries/${item.sys.id}`}
                                                >
                                                    Click here to open the entry in Contentful
                                                </LinkPureExternal>
                                            </Text>
                                        )}
                                        <Box mt={4}>
                                            <pre>{JSON.stringify(item, null, 2)}</pre>
                                        </Box>
                                    </>
                                )}
                            </VStack>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </>
        );
    }

    if (item.__typename === "ExternalLink" || Component === LinkPureExternal) {
        if (ComponentExternal) {
            return (
                <ComponentExternal {...props} href={href} target="_blank" onClick={handleClick}>
                    {label}
                </ComponentExternal>
            );
        }
        return (
            <LinkPureExternal {...props} href={href} onClick={handleClick}>
                {label}
            </LinkPureExternal>
        );
    }

    return (
        <Component {...props} href={href} onClick={handleClick}>
            {label}
        </Component>
    );
};
