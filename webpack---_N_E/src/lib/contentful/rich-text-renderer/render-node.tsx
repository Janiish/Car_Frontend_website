import type { RenderNode } from "@contentful/rich-text-react-renderer";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import {
    Divider,
    Heading,
    Text,
    ListItem,
    OrderedList,
    UnorderedList,
    TableContainer,
    Table,
    Thead,
    Tr,
    Tbody,
    Blockquote,
    BlockquoteQuote,
    Grid,
    GridItem,
} from "@project/ui";
import {
    gridGap,
    gridTemplateColumns,
    rteStartColDefault,
    rteEndColDefault,
} from "@project/ui/src/theme/global-styles";
import { renderMark } from "@/lib/contentful/rich-text-renderer/render-mark";
import type { ReactNode } from "react";
import { WrapperContainer } from "@/components/wrapper-container";

export const renderTableTextWithLineBreaks = (children: ReactNode) => {
    if (Array.isArray(children) && children.length === 1 && typeof children[0] === "string") {
        const text = children[0];
        return text.split("\n").reduce<ReactNode[]>((acc, textSegment: string, index: number) => {
            return [...acc, index > 0 && <br key={crypto.randomUUID()} />, textSegment];
        }, []);
    }

    return children;
};

// Helper function to wrap block-level elements with grid
const withGrid = (children: ReactNode) => (
    <WrapperContainer>
        <Grid templateColumns={gridTemplateColumns} gap={gridGap}>
            <GridItem
                colStart={{ base: 1, l: rteStartColDefault }}
                colEnd={{ base: 3, l: rteEndColDefault }}
            >
                {children}
            </GridItem>
        </Grid>
    </WrapperContainer>
);

// Base render node configuration for list items (without circular reference)
// This defines what elements can appear inside list items
const listItemRenderNode: RenderNode = {
    [BLOCKS.PARAGRAPH]: (_node, children) => <Text>{children}</Text>,
    [BLOCKS.HEADING_1]: (_node, children) => (
        <Heading as="h1" size="headingXXLarge">
            {children}
        </Heading>
    ),
    [BLOCKS.HEADING_2]: (_node, children) => (
        <Heading as="h2" size="headingXLarge" fontWeight="400">
            {children}
        </Heading>
    ),
    [BLOCKS.HEADING_3]: (_node, children) => (
        <Heading as="h3" size="headingLarge" fontWeight="400" mt="2rem">
            {children}
        </Heading>
    ),
    [BLOCKS.HEADING_4]: (_node, children) => (
        <Heading as="h4" size="headingMedium" fontWeight="400" mt="2rem">
            {children}
        </Heading>
    ),
    [BLOCKS.HEADING_5]: (_node, children) => (
        <Heading as="h5" size="headingSmall" fontWeight="400" mt="2rem">
            {children}
        </Heading>
    ),
    [BLOCKS.HEADING_6]: (_node, children) => (
        <Text as="p" size="xx-small">
            {children}
        </Text>
    ),
    [BLOCKS.QUOTE]: (_node, children) => (
        <Blockquote my="2rem">
            <BlockquoteQuote
                _before={{ content: "open-quote" }}
                _after={{ content: "close-quote" }}
            >
                {children}
            </BlockquoteQuote>
        </Blockquote>
    ),
    [BLOCKS.TABLE]: (_node, children) => (
        <TableContainer my="2rem">
            <Table>{children}</Table>
        </TableContainer>
    ),
    [BLOCKS.HR]: () => <Divider />,
    // Explicitly handle list items to prevent nested <li> elements
    [BLOCKS.LIST_ITEM]: (_node, children) => <span>{children}</span>,
    [BLOCKS.UL_LIST]: (_node, children) => <span>{children}</span>,
    [BLOCKS.OL_LIST]: (_node, children) => <span>{children}</span>,
};

export const renderNode = (context?: { isInModule?: boolean }): RenderNode => {
    const wrapElement = (element: ReactNode) => (context?.isInModule ? element : withGrid(element));

    return {
        [BLOCKS.PARAGRAPH]: (node, children) => {
            return wrapElement(<Text>{children}</Text>);
        },
        [BLOCKS.HEADING_1]: (node, children) =>
            wrapElement(
                <Heading as="h1" size="headingXXLarge">
                    {children}
                </Heading>
            ),
        [BLOCKS.HEADING_2]: (node, children) =>
            wrapElement(
                <Heading as="h2" size="headingXLarge" fontWeight="400">
                    {children}
                </Heading>
            ),
        [BLOCKS.HEADING_3]: (node, children) =>
            wrapElement(
                <Heading as="h3" size="headingLarge" fontWeight="400" mt="2rem">
                    {children}
                </Heading>
            ),
        [BLOCKS.HEADING_4]: (node, children) =>
            wrapElement(
                <Heading as="h4" size="headingMedium" fontWeight="400" mt="2rem">
                    {children}
                </Heading>
            ),
        [BLOCKS.HEADING_5]: (node, children) =>
            wrapElement(
                <Heading as="h5" size="headingSmall" fontWeight="400" mt="2rem">
                    {children}
                </Heading>
            ),
        [BLOCKS.HEADING_6]: (node, children) =>
            wrapElement(
                <Text as="p" size="xx-small">
                    {children}
                </Text>
            ),
        [BLOCKS.HR]: () => wrapElement(<Divider />),
        [BLOCKS.UL_LIST]: (node, children) =>
            wrapElement(<UnorderedList>{children}</UnorderedList>),
        [BLOCKS.OL_LIST]: (node, children) => wrapElement(<OrderedList>{children}</OrderedList>),
        [BLOCKS.LIST_ITEM]: (node, _children) => {
            // Process children using listItemRenderNode to define what elements can appear inside <li>
            // This allows you to customize what kind of elements go inside list items
            const processedChildren = documentToReactComponents(node as unknown as Document, {
                renderMark,
                renderNode: listItemRenderNode,
            });

            return <ListItem>{processedChildren}</ListItem>;
        },
        [BLOCKS.QUOTE]: (node) => {
            const transformedChildren = documentToReactComponents(node as unknown as Document, {
                renderMark,
                renderNode: {
                    [BLOCKS.PARAGRAPH]: (_node, children) => children,
                    [BLOCKS.QUOTE]: (_node, children) => children,
                },
            });

            return wrapElement(
                <Blockquote my="2rem">
                    <BlockquoteQuote
                        _before={{ content: "open-quote" }}
                        _after={{ content: "close-quote" }}
                    >
                        {transformedChildren}
                    </BlockquoteQuote>
                </Blockquote>
            );
        },
        [BLOCKS.TABLE]: (node, children) => {
            const tableElement = (
                <TableContainer my="2rem">
                    <Table>{children}</Table>
                </TableContainer>
            );

            return wrapElement(tableElement);
        },
        [BLOCKS.TABLE_ROW]: (node, children) => {
            if (node.content.every((child) => child.nodeType === "table-header-cell")) {
                return (
                    <Thead>
                        <Tr>{children}</Tr>
                    </Thead>
                );
            }

            return (
                <Tbody>
                    <Tr>{children}</Tr>
                </Tbody>
            );
        },

        [BLOCKS.EMBEDDED_ASSET]: () => {
            return wrapElement(<Text as="pre">Embedded Asset is not supported</Text>);
        },
        [INLINES.ASSET_HYPERLINK]: () => {
            return wrapElement(<Text as="pre">Inline Asset Hyperlink is not supported</Text>);
        },
    };
};
