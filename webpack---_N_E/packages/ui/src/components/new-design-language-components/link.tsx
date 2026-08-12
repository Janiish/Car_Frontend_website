import { chakra, forwardRef, type HTMLChakraProps } from "@chakra-ui/react";
import { cx } from "@chakra-ui/utils";
import { createContext, useContext, useId } from "react";
import type { ReactNode } from "react";
import { LinkBox, LinkOverlay } from "../chakra-ui/link-overlay";
import { NextLink } from "../../nextjs/link/NextLink";
import { NdlSurface } from "./surface";
import { NdlHeading } from "./heading";
import { NdlText } from "./text";
import { NdlButton } from "./button";
import { NdlIcon } from "./icon";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

type NdlLinkContextValue = {
    href: string;
    ariaId: string;
};

const NdlLinkContext = createContext<NdlLinkContextValue | null>(null);

function useNdlLinkContext() {
    const ctx = useContext(NdlLinkContext);
    if (!ctx) {
        throw new Error("NdlLink compound components must be rendered inside <NdlLink.Root>.");
    }
    return ctx;
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

type NdlLinkRootProps = {
    href: string;
    children: ReactNode;
} & HTMLChakraProps<"div">;

const Root = forwardRef<NdlLinkRootProps, "div">((props, ref) => {
    const ariaId = useId();
    const { href, children, className, ...rest } = props;

    return (
        <NdlLinkContext.Provider value={{ href, ariaId }}>
            <NdlSurface
                ref={ref}
                size="medium"
                colorScheme="black"
                p={4}
                backdropFilter="auto"
                backdropBlur="ndlFrostedGlassHigh"
                overflow="hidden"
                className={cx("ndl-link", className)}
                {...rest}
            >
                <LinkBox
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    gap={4}
                    width="full"
                    data-group
                    cursor="pointer"
                >
                    {children}
                </LinkBox>
            </NdlSurface>
        </NdlLinkContext.Provider>
    );
});

Root.displayName = "NdlLink.Root";

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

type NdlLinkContentProps = HTMLChakraProps<"div">;

const Content = forwardRef<NdlLinkContentProps, "div">(({ children, className, ...rest }, ref) => {
    return (
        <chakra.div
            ref={ref}
            display="flex"
            flexDirection="column"
            flex={1}
            minWidth={0}
            gap={1}
            className={cx("ndl-link__content", className)}
            {...rest}
        >
            {children}
        </chakra.div>
    );
});

Content.displayName = "NdlLink.Content";

// ---------------------------------------------------------------------------
// Title
// ---------------------------------------------------------------------------

type NdlLinkTitleProps = Omit<HTMLChakraProps<"a">, "href">;

const Title = forwardRef<NdlLinkTitleProps, "a">((props, ref) => {
    const { children, className, ...rest } = props;
    const { href, ariaId } = useNdlLinkContext();

    return (
        <LinkOverlay
            as={NextLink}
            href={href}
            id={ariaId}
            ref={ref}
            className={cx("ndl-link__title", className)}
            _hover={{ textDecoration: "none" }}
            {...rest}
        >
            <NdlHeading as="span" size="headerS" color="allWhite" sx={{ textWrap: "balance" }}>
                {children}
            </NdlHeading>
        </LinkOverlay>
    );
});

Title.displayName = "NdlLink.Title";

// ---------------------------------------------------------------------------
// Description
// ---------------------------------------------------------------------------

type NdlLinkDescriptionProps = HTMLChakraProps<"p">;

const Description = forwardRef<NdlLinkDescriptionProps, "p">((props, ref) => {
    const { children, ...rest } = props;

    return (
        <NdlText ref={ref} size="regular" color="grey200" sx={{ textWrap: "balance" }} {...rest}>
            {children}
        </NdlText>
    );
});

Description.displayName = "NdlLink.Description";

// ---------------------------------------------------------------------------
// Icon
// ---------------------------------------------------------------------------

type NdlLinkIconProps = {
    iconName?: string;
} & Omit<HTMLChakraProps<"button">, "children">;

const Icon = forwardRef<NdlLinkIconProps, "button">((props, ref) => {
    const { iconName = "arrow-right-up", ...rest } = props;
    const { ariaId } = useNdlLinkContext();

    return (
        <NdlButton
            ref={ref}
            aria-labelledby={ariaId}
            onClick={() => {}}
            variant="icon"
            size="large"
            colorScheme="solidGrey"
            tabIndex={-1}
            flexShrink={0}
            pointerEvents="none"
            {...rest}
        >
            <NdlIcon name={iconName} />
        </NdlButton>
    );
});

Icon.displayName = "NdlLink.Icon";

// ---------------------------------------------------------------------------
// Compound namespace export
// ---------------------------------------------------------------------------

const NdlLink = { Root, Content, Title, Description, Icon };

export { NdlLink };
export type {
    NdlLinkRootProps,
    NdlLinkContentProps,
    NdlLinkTitleProps,
    NdlLinkDescriptionProps,
    NdlLinkIconProps,
};
