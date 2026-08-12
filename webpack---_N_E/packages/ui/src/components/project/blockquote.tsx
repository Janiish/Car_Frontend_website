import {
    type HTMLChakraProps,
    chakra,
    forwardRef,
    createStylesContext,
    useMultiStyleConfig,
} from "@chakra-ui/react";

const [StylesProvider, useStyles] = createStylesContext("Blockquote");

type BlockquoteProps = HTMLChakraProps<"blockquote">;

const Blockquote = forwardRef<BlockquoteProps, "blockquote">((props, ref) => {
    const { children, ...rest } = props;

    const styles = useMultiStyleConfig("Blockquote", {});

    return (
        <chakra.blockquote ref={ref} __css={styles.blockquote} {...rest}>
            <StylesProvider value={styles}>{children}</StylesProvider>
        </chakra.blockquote>
    );
});

type BlockquoteQuoteProps = HTMLChakraProps<"p">;

const BlockquoteQuote = (props: BlockquoteQuoteProps) => {
    const { children, ...rest } = props;

    const styles = useStyles();

    return (
        <chakra.p {...rest} __css={styles.quote}>
            {children}
        </chakra.p>
    );
};

type BlockquoteFooterProps = HTMLChakraProps<"footer">;

const BlockquoteFooter = (props: BlockquoteFooterProps) => {
    const { children, ...rest } = props;

    const styles = useStyles();

    return (
        <chakra.footer {...rest} __css={styles.footer}>
            {children}
        </chakra.footer>
    );
};

export { Blockquote, BlockquoteQuote, BlockquoteFooter };
export type { BlockquoteProps, BlockquoteQuoteProps, BlockquoteFooterProps };
