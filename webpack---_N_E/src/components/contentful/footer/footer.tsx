import { Grid, GridItem, Text, List, ListItem } from "@project/ui";
import type { FooterFieldsFragment } from "@/lib/contentful/__generated/graphql.types";
import { LinkWrapper } from "@/components/link-wrapper";
import type { LinkWrapperProps } from "@/components/link-wrapper";
import { useMemo } from "react";
import { richTextRenderer } from "@/lib/contentful/rich-text-renderer/rich-text-renderer";
import { ModuleSpacer } from "@/components/module-spacer";
import { PAGMSHEvents } from "@/lib/google-tag-manager/events";
import { gridGap, gridTemplateColumns } from "@project/ui/src/theme/global-styles";
import { SECTIONS_CONFIG } from "../new-page-homepage/configs/waypoints.config";

type FooterProps = FooterFieldsFragment;

type FooterTextLinkProps = LinkWrapperProps;

const FooterTextLink = ({ onClick, ...props }: FooterTextLinkProps) => {
    return (
        <LinkWrapper
            {...props}
            eventAction={PAGMSHEvents.footerLinkClick}
            theme="dark"
            icon="none"
        />
    );
};

export const Footer = (props: FooterProps) => {
    const quaternaryNavigation = props.quaternaryNavigation;

    const {
        copyrightText,
        legalDisclaimer,
        primaryNavigation,
        secondaryNavigation,
        tertiaryNavigation,
    } = useMemo(() => props, [props]);

    const currentYear = new Date().getFullYear().toString();
    const updatedCopyrightText = (copyrightText ?? "").replace("{year}", currentYear);
    const itemSpan = { base: 2, l: 3 };
    const itemSpanFull = { base: 2, l: 12 };

    return (
        <ModuleSpacer
            as="footer"
            bg="porscheBlack"
            color="allWhite"
            pb={10}
            py={0}
            id={SECTIONS_CONFIG[5].sectionId}
        >
            <Grid templateColumns={gridTemplateColumns} gap={gridGap} py={10}>
                <GridItem colSpan={itemSpan}>
                    <List>
                        {primaryNavigation?.navigationItemsCollection?.items.map(
                            (item) =>
                                item && (
                                    <ListItem key={item.sys.id} mb="2">
                                        <FooterTextLink size="x-large" item={item} />
                                    </ListItem>
                                )
                        )}
                    </List>
                </GridItem>
                <GridItem colSpan={itemSpan}>
                    <Text size="caption" mb={4} color="grey600">
                        {secondaryNavigation?.title}
                    </Text>
                    <List>
                        {secondaryNavigation?.navigationItemsCollection?.items.map(
                            (item) =>
                                item && (
                                    <ListItem key={item.sys.id} mb="1">
                                        <FooterTextLink item={item} />
                                    </ListItem>
                                )
                        )}
                    </List>
                </GridItem>
                <GridItem colSpan={itemSpan}>
                    <Text size="caption" mb={4} color="grey600">
                        {tertiaryNavigation?.title}
                    </Text>
                    <List>
                        {tertiaryNavigation?.navigationItemsCollection?.items.map(
                            (item) =>
                                item && (
                                    <ListItem key={item.sys.id} mb="1">
                                        <FooterTextLink item={item} />
                                    </ListItem>
                                )
                        )}
                    </List>
                </GridItem>
                <GridItem colSpan={itemSpan}>
                    <Text size="caption" mb={4} color="grey600">
                        {quaternaryNavigation?.title}
                    </Text>
                    <List>
                        {quaternaryNavigation?.navigationItemsCollection?.items.map(
                            (item) =>
                                item && (
                                    <ListItem key={item.sys.id} mb="1">
                                        <FooterTextLink item={item} />
                                    </ListItem>
                                )
                        )}
                    </List>
                </GridItem>
                <GridItem colSpan={itemSpanFull}>
                    <Text size="small" pt={gridGap}>
                        {updatedCopyrightText}
                    </Text>
                </GridItem>
                <GridItem colSpan={itemSpanFull}>
                    {legalDisclaimer && (
                        <>
                            {richTextRenderer({ ...legalDisclaimer, theme: "dark" }, "xx-small", {
                                isInModule: true,
                            })}
                        </>
                    )}
                </GridItem>
            </Grid>
        </ModuleSpacer>
    );
};
