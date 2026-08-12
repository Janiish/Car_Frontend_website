import type { LinkWrapperProps } from "@/components/link-wrapper";
import { LinkWrapper } from "@/components/link-wrapper";
import { NextLink } from "@project/ui";
import { PAGMSHEvents } from "@/lib/google-tag-manager/events";

type QuickLinkProps = LinkWrapperProps;

const QuickLink = ({ onClick, ...props }: QuickLinkProps) => {
    return (
        <LinkWrapper
            renderAs={NextLink}
            eventAction={PAGMSHEvents.navigationLinkClick}
            color="allWhite"
            _hover={{ opacity: 0.5 }}
            transition="var(--transition-property-common), var(--transition-duration-short) var(--transition-easing-base)"
            {...props}
        />
    );
};

export { QuickLink };
