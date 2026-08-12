import { PLink } from "@porsche-design-system/components-react/ssr";
import type { PLinkProps } from "@porsche-design-system/components-react/ssr";
import { chakra, forwardRef } from "@chakra-ui/react";
import { NextLink } from "../../nextjs/link/NextLink";
import type { NextLinkProps } from "../../nextjs/link/NextLink";
import { useIsAriaCurrentPage } from "../../hooks/project/useIsAriaCurrentPage";

type LinkProps = Omit<NextLinkProps, "as" | "href"> & PLinkProps;

const ChakraPLink = chakra<typeof PLink, LinkProps>(PLink);

const Link = forwardRef<LinkProps, "a">((props, ref) => {
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
        ...rest
    } = props;

    const isAriaCurrent = useIsAriaCurrentPage(href);

    if (props.target === "_blank") {
        return <ChakraPLink {...props} ref={ref} />;
    }

    return (
        <ChakraPLink {...rest}>
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
        </ChakraPLink>
    );
});

export { Link };
export type { LinkProps };
