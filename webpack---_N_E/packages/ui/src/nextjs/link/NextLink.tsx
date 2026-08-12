import { chakra, omitThemingProps, useStyleConfig, forwardRef } from "@chakra-ui/react";
import type { LinkProps as ChakraLinkProps, HTMLChakraProps, ThemingProps } from "@chakra-ui/react";
import BaseNextLink from "next/link";
import type { LinkProps as BaseNextLinkProps } from "next/link";
import { useIsAriaCurrentPage } from "../../hooks/project/useIsAriaCurrentPage";

const cx = (...classNames: Array<string>) => classNames.filter(Boolean).join(" ");

type Pretty<T> = { [K in keyof T]: T[K] } & object;
type Merge<P, T> = Pretty<Omit<P, keyof T> & T>;

type NextLinkProps = Merge<
    HTMLChakraProps<"a"> & ThemingProps<"Link"> & ChakraLinkProps,
    Omit<BaseNextLinkProps, "as" | "href">
>;

const NextLink = forwardRef<NextLinkProps, "a">(function Link(props, ref) {
    const styles = useStyleConfig("Link", props);
    const { className, href, children, as, ...rest } = omitThemingProps(props);

    const isAriaCurrent = useIsAriaCurrentPage(href);

    return (
        <chakra.a
            ref={ref}
            href={href}
            {...rest}
            className={cx("chakra-link", `${className}`)}
            __css={styles}
            as={as ?? BaseNextLink}
            aria-current={isAriaCurrent ? "page" : "false"}
        >
            {children}
        </chakra.a>
    );
});

export { NextLink };
export type { NextLinkProps };
