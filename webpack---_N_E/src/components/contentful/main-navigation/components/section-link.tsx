import type { NextLinkProps } from "@project/ui";
import { Heading, NextLink, forwardRef } from "@project/ui";
import type { MouseEvent as ReactMouseEvent } from "react";
import { sendNavigationLinkClickToGTM } from "@/components/contentful/main-navigation/tracking-nav-click";
import { useRouter } from "next/router";
import { getFocusStyle } from "@porsche-design-system/components-react/styles";
import { useAppStore } from "@/store/app-store";

type SectionLinkProps = NextLinkProps & {
    entryId: string;
    entryTypename: string;
};

const SectionLink = forwardRef<SectionLinkProps, "a">(
    ({ href, children, onClick, entryId, entryTypename, ...props }, ref) => {
        const { locale } = useRouter();
        const {
            state: { pageType, pageId, pageContentTags },
        } = useAppStore();

        const handleOnClick = (e: ReactMouseEvent<HTMLAnchorElement, MouseEvent>) => {
            onClick && onClick(e);

            const targetUrl = e.currentTarget.getAttribute("href") ?? "";
            const clickElementType = "navigation";
            const clickElementId = pageId;
            const clickElementName = children as string;
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
            <NextLink
                href={href}
                onClick={handleOnClick}
                {...props}
                ref={ref}
                _focusVisible={{ ...getFocusStyle() }}
                data-group
            >
                <Heading
                    size="navigationHeading"
                    color="allWhite"
                    opacity={{ l: 0.5 }}
                    transition="var(--transition-property-common), var(--transition-duration-short) var(--transition-easing-base)"
                    _hover={{ opacity: 1 }}
                >
                    {children}
                </Heading>
            </NextLink>
        );
    }
);

export { SectionLink };
