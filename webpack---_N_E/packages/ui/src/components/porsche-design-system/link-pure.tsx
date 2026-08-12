import { PLinkPure } from "@porsche-design-system/components-react/ssr";
import type { PLinkPureProps } from "@porsche-design-system/components-react/ssr";
import { chakra, forwardRef } from "@chakra-ui/react";
import { NextLink } from "../../nextjs/link/NextLink";
import type { NextLinkProps } from "../../nextjs/link/NextLink";
import { useIsAriaCurrentPage } from "../../hooks/project/useIsAriaCurrentPage";

type LinkPureProps = Omit<NextLinkProps, "href"> & PLinkPureProps;

const ChakraPLinkPure = chakra<typeof PLinkPure, LinkPureProps>(PLinkPure);

type LinkPureExternalProps = PLinkPureProps;

const ChakraPLinkPureExternal = chakra<typeof PLinkPure, LinkPureExternalProps>(PLinkPure);

const LinkPureExternal = forwardRef<LinkPureExternalProps, "a">((props, ref) => {
    const { download, href, children, rel, target, ...rest } = props;

    return (
        <ChakraPLinkPureExternal {...rest} ref={ref}>
            <a download={download} href={href} rel={rel} target="_blank">
                {children}
            </a>
        </ChakraPLinkPureExternal>
    );
});

const LinkPure = forwardRef<LinkPureProps, "a">((props, ref) => {
    const {
        // NextLink props
        download,
        href,
        rel,
        target,
        replace = false,
        scroll = true,
        shallow = false,
        locale,
        children,
        //
        aria,
        ...rest
    } = props;

    const isAriaCurrent = useIsAriaCurrentPage(href);

    return (
        <ChakraPLinkPure {...rest}>
            <NextLink
                download={download}
                href={href}
                rel={rel}
                target={target}
                replace={replace}
                scroll={scroll}
                shallow={shallow}
                ref={ref}
                aria-current={isAriaCurrent ? "page" : "false"}
            >
                {children}
            </NextLink>
        </ChakraPLinkPure>
    );
});

export { LinkPure, LinkPureExternal };
export type { LinkPureProps, LinkPureExternalProps };
