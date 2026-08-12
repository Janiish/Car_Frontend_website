import type { ReactNode } from "react";
import type { Options, RenderNode } from "@contentful/rich-text-react-renderer";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Block, Document, Inline } from "@contentful/rich-text-types";
import { renderMark } from "@/lib/contentful/rich-text-renderer/render-mark";
import {
    renderNode,
    renderTableTextWithLineBreaks,
} from "@/lib/contentful/rich-text-renderer/render-node";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { ModuleRenderer } from "@/lib/contentful/modules/ModuleRenderer";
import { Box, Flex, LinkPureExternal, Td, Th } from "@project/ui";
import type { LinkWrapperProps } from "@/components/link-wrapper";
import { LinkWrapper } from "@/components/link-wrapper";
import { PAGMSHEvents, PAGMSHModuleNames } from "@/lib/google-tag-manager/events";
import { usePagmshRichTextLinkClick } from "@/lib/google-tag-manager/use-pagmsh-richtext-link-click";
import { UserCentricsLink } from "@/components/user-centrics/user-centrics-link";

export type GenericRichText = {
    __typename?: string;
    json: Document;
    links: {
        entries: {
            /**
             * We are using any here because we don't have a common type for all the entries in the system.
             */
            /* eslint-disable @typescript-eslint/no-explicit-any */
            block?: any;
            inline?: any;
            hyperlink?: any;
            /* eslint-enable @typescript-eslint/no-explicit-any */
        };
    };
    theme?: "light" | "dark";
};

export const getOptions = (
    data: GenericRichText,
    size: "small" | "xx-small" = "small",
    context?: { isInModule?: boolean }
): Options => {
    const populateMap = <T extends { sys: { id: string } }>(
        entries: T[] | undefined
    ): Map<string, T> => {
        /**
         * filter out any undefined entries, ideally we would somehow show this as a warning in the ui, for now we log it
         */
        const nonUndefinedEntries = [
            ...(entries
                ? entries.filter((entry) => {
                      return entry != null && Object.hasOwn(entry, "sys");
                  })
                : []),
        ];
        if (nonUndefinedEntries.length < (entries?.length ?? 0)) {
            // eslint-disable-next-line no-console
            console.warn(
                "Some entries in the rich text field were undefined, this is commonly because of a content model being deleted or renamed, while being used in a rich text field."
            );
        }

        return new Map(
            nonUndefinedEntries.map((entry) => {
                return [entry.sys.id, entry];
            })
        );
    };

    const linkedEmbeddedBlockEntries = populateMap(data.links?.entries?.block);
    const linkedEmbeddedInlineEntries = populateMap(data.links?.entries?.inline);
    const linkedHyperlinkEntries = populateMap(data.links?.entries?.hyperlink);

    const renderNodeOptions: RenderNode = {
        ...renderNode(context),
        [BLOCKS.EMBEDDED_ENTRY]: getNodeRenderer(linkedEmbeddedBlockEntries, renderEmbeddedEntry),
        [INLINES.EMBEDDED_ENTRY]: getNodeRenderer(linkedEmbeddedInlineEntries, renderInlineEntry),
        [INLINES.ENTRY_HYPERLINK]: (node, children) => {
            const item = linkedHyperlinkEntries.get(
                node.data.target.sys.id
            ) as LinkWrapperProps["item"];

            /* eslint-disable @typescript-eslint/no-explicit-any */
            const clickElementName = (node.content[0] as any).value ?? "";
            /* eslint-enable @typescript-eslint/no-explicit-any */

            return (
                <LinkWrapper
                    item={item}
                    theme={data.theme ?? "light"}
                    icon="none"
                    underline={true}
                    eventAction={PAGMSHEvents.linkRichtext}
                    clickElementName={clickElementName}
                    moduleName={PAGMSHModuleNames.richText}
                >
                    {children}
                </LinkWrapper>
            );
        },
        [INLINES.HYPERLINK]: (node, children) => {
            const href = node.data.uri;
            const handleClick = usePagmshRichTextLinkClick({
                eventAction: PAGMSHEvents.linkRichtext,
                href,
            });

            const isUcPrivacySettingsLink = href
                ? href.includes("#uc-layer2") || href.includes("#uc-layer4")
                : false;

            if (isUcPrivacySettingsLink) {
                return (
                    <UserCentricsLink href={href} size={size} icon="none" underline={true}>
                        {children}
                    </UserCentricsLink>
                );
            }

            return (
                <LinkPureExternal
                    target="_blank"
                    href={href}
                    theme={data.theme ?? "light"}
                    size={size}
                    icon="none"
                    underline={true}
                    onClick={handleClick}
                >
                    {children}
                </LinkPureExternal>
            );
        },
        [BLOCKS.TABLE_HEADER_CELL]: (node) => {
            const transformedChildren = documentToReactComponents(node as unknown as Document, {
                renderMark,
                renderNode: getTableCellNodeRenderer(
                    linkedHyperlinkEntries,
                    BLOCKS.TABLE_HEADER_CELL,
                    data.theme ?? "light"
                ),
            });

            return <Th>{transformedChildren}</Th>;
        },
        [BLOCKS.TABLE_CELL]: (node) => {
            const transformedChildren = documentToReactComponents(node as unknown as Document, {
                renderMark,
                renderNode: getTableCellNodeRenderer(
                    linkedHyperlinkEntries,
                    BLOCKS.TABLE_CELL,
                    data.theme ?? "light"
                ),
            });

            return <Td>{transformedChildren}</Td>;
        },
    };

    return {
        renderMark,
        renderNode: renderNodeOptions,
        preserveWhitespace: false,
    };
};

function getNodeRenderer<T>(
    entriesMap: Map<string, T>,
    /* eslint-disable @typescript-eslint/no-explicit-any */
    renderFunction: (entry: T, ...args: any[]) => JSX.Element | null,
    ...args: any[]
) {
    /* eslint-enable @typescript-eslint/no-explicit-any */
    return (node: Block | Inline, children?: ReactNode) => {
        const id = node.data.target.sys.id;
        const entry = entriesMap.get(id);
        if (entry) {
            return renderFunction(entry, ...args, children);
        }
        return null;
    };
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function renderEmbeddedEntry(entry: any) {
    const moduleProps = { ...entry, isEmbedded: true };
    const moduleRenderer = <ModuleRenderer componentProps={moduleProps} />;

    // Modules that need special wrapper styling
    if (entry.__typename === "ModuleAudioPlayer") {
        return <Box className="module-audio-player-wrapping-div">{moduleRenderer}</Box>;
    }
    if (entry.__typename === "ModuleCookieConsentSettingsWidget") {
        return (
            <Flex
                className="module-cookie-consent-settings-widget-wrapping-div"
                justifyContent="center"
                alignItems="center"
                mt={12}
            >
                <div className="uc-embed" uc-layout="privacySettings"></div>
            </Flex>
        );
    }

    if (entry.__typename === "ModuleSpacer") {
        return <Box className="module-spacer-wrapping-div">{moduleRenderer}</Box>;
    }

    // All other modules render directly with isEmbedded: true
    return moduleRenderer;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function renderInlineEntry(entry: any) {
    if (entry?.__typename === "Microcopy") {
        return entry.value;
    }

    return null;
}

function getTableCellNodeRenderer<T>(
    entriesMap: Map<string, T>,
    tableKey: BLOCKS.TABLE_HEADER_CELL | BLOCKS.TABLE_CELL,
    theme: "light" | "dark" = "light"
) {
    return {
        [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: ReactNode) =>
            renderTableTextWithLineBreaks(children),
        [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => {
            const href = node.data.uri;
            const handleClick = usePagmshRichTextLinkClick({
                eventAction: PAGMSHEvents.linkRichtextTable,
                href,
            });

            return (
                <LinkPureExternal
                    target="_blank"
                    href={href}
                    theme={theme}
                    icon="none"
                    underline={true}
                    onClick={handleClick}
                >
                    {children}
                </LinkPureExternal>
            );
        },
        [INLINES.ENTRY_HYPERLINK]: (node: Block | Inline, children: ReactNode) => {
            const item = entriesMap.get(node.data.target.sys.id) as LinkWrapperProps["item"];

            /* eslint-disable @typescript-eslint/no-explicit-any */
            const clickElementName = (node.content[0] as any).value ?? "";
            /* eslint-enable @typescript-eslint/no-explicit-any */

            return (
                <LinkWrapper
                    item={item}
                    theme={theme}
                    icon="none"
                    underline={true}
                    eventAction={PAGMSHEvents.linkRichtextTable}
                    clickElementName={clickElementName}
                    moduleName={PAGMSHModuleNames.richText}
                >
                    {children}
                </LinkWrapper>
            );
        },
        [tableKey]: (_node: Block | Inline, children: ReactNode) => children,
    };
}
