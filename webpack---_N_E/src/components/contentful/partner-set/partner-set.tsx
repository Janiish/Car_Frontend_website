import { AspectRatio, CldImage, Grid, GridItem } from "@project/ui";
import type { PartnerSetFieldsFragment } from "@/components/contentful/partner-set/__generated/partner-set.contentful.generated";
import { useRouter } from "next/router";
import { ModuleSpacer } from "@/components/module-spacer";
import { useContentfulInspectorMode } from "@contentful/live-preview/react";
import type { MouseEvent } from "react";
import { sendNavigationLinkClickToGTM } from "@/components/contentful/main-navigation/tracking-nav-click";
import { useAppStore } from "@/store/app-store";

export type PartnerSetProps = PartnerSetFieldsFragment;

export const PartnerSet = ({ partnersCollection, sys }: PartnerSetProps) => {
    const { locale } = useRouter();

    const {
        state: { pageType, pageId, pageContentTags },
    } = useAppStore();

    const inspectorMode = useContentfulInspectorMode({ entryId: sys.id });

    const handleClick = (e: MouseEvent<HTMLAnchorElement>, label: string) => {
        const targetUrl = e.currentTarget.getAttribute("href") ?? "";
        const clickElementType = "navigation";
        const clickElementId = pageId;
        const clickElementName = label;
        const targetType = "outbound";

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
        <ModuleSpacer bg="porscheBlack" color="allWhite" py={{ base: 10, s: 10 }}>
            <Grid
                {...inspectorMode({ fieldId: "partners", locale })}
                bg="porscheBlack"
                templateColumns={{
                    base: "repeat(4, 1fr)",
                    s: "repeat(6, 1fr)",
                    l: "repeat(9, 1fr)",
                }}
                gap={{ base: 5, l: 8 }}
                pb={{ base: 10, md: 10 }}
                borderBottomWidth="1px"
                borderColor="grey500"
            >
                {partnersCollection?.items?.map((partner) => (
                    <GridItem key={partner?.sys.id}>
                        {partner?.logo && (
                            <a
                                href={partner.url!}
                                target="_blank"
                                onClick={(e) => handleClick(e, partner.name!)}
                            >
                                <AspectRatio
                                    ratio="16:9"
                                    transition={"opacity 0.25s ease"}
                                    _hover={{ opacity: 0.7 }}
                                >
                                    <CldImage
                                        cloudinaryAsset={partner.logo}
                                        sizes={["20vw", "16vw", "9vw"]}
                                        objectFit="contain"
                                        alt={`Logo for partner: ${partner.name!}`}
                                    />
                                </AspectRatio>
                            </a>
                        )}
                    </GridItem>
                ))}
            </Grid>
        </ModuleSpacer>
    );
};
