import type { PageArticleFieldsFragment } from "@/components/contentful/page-article/__generated/page-article.contentful.generated";
import type { PageBasicFieldsFragment } from "@/components/contentful/page-basic/__generated/page-basic.contentful.generated";
import type { PageCarFieldsFragment } from "@/components/contentful/page-car/__generated/page-car.contentful.generated";
import type { PageCategoryFieldsFragment } from "@/components/contentful/page-category/__generated/page-category.contentful.generated";
import type { PageHomepageFieldsFragment } from "@/components/contentful/page-homepage/__generated/page-homepage.contentful.generated";
import type { PageRaceSeriesFieldsFragment } from "@/components/contentful/page-race-series/__generated/page-race-series.contentful.generated";
import type { PageTeamFieldsFragment } from "@/components/contentful/page-team/__generated/page-team.contentful.generated";
import type { PageDriverFieldsFragment } from "@/components/contentful/page-driver/__generated/page-driver.contentful.generated";
import type { PageRaceEventFieldsFragment } from "@/components/contentful/page-race-event/__generated/page-race-event.contentful.generated";
import type { ContentfulCloudinaryAssetField } from "@project/ui";
import {
    Icon,
    NextLink,
    Heading,
    LinkOverlay,
    Box,
    AspectRatio,
    CldImage,
    CldVideoLite,
    hasCloudinaryAsset,
    isCloudinaryVideo,
    LinkBox,
} from "@project/ui";
import { getHrefForPageType } from "@/common/helpers/slug";

type GenericPageCardProps = {
    item:
        | PageArticleFieldsFragment
        | PageBasicFieldsFragment
        | PageCarFieldsFragment
        | PageCategoryFieldsFragment
        | PageHomepageFieldsFragment
        | PageRaceSeriesFieldsFragment
        | PageTeamFieldsFragment
        | PageDriverFieldsFragment
        | PageRaceEventFieldsFragment;
};

const getAsset = (item: GenericPageCardProps["item"]): ContentfulCloudinaryAssetField => {
    switch (item.__typename) {
        case "PageArticle":
        case "PageCategory":
        case "PageRaceEvent":
        case "PageRaceSeries":
        case "PageCar":
        case "PageBasic":
            return item.heroAsset;

        case "PageDriver":
            return item.driver?.asset;
        case "PageTeam":
            return item.team?.asset;
        case "PageHomepage":
        default:
            return null;
    }
};

const GenericPageCard = (props: GenericPageCardProps) => {
    const { item } = props;

    const asset = getAsset(item);

    return (
        <LinkBox data-group>
            {asset && (
                <Box as="figure" mb={6} rounded="large" overflow="hidden">
                    <AspectRatio ratio="2:1" bgColor="grey100">
                        {hasCloudinaryAsset(asset) && (
                            <>
                                {isCloudinaryVideo(asset) ? (
                                    <CldVideoLite
                                        cloudinaryAsset={asset}
                                        wrapperProps={{ position: "absolute" }}
                                        loop
                                    />
                                ) : (
                                    <CldImage
                                        cloudinaryAsset={asset}
                                        sizes={"100vw"}
                                        _groupHover={{ transform: "scale(1.02)" }}
                                        transition="transform 0.30s ease"
                                        wrapperProps={{
                                            isolation: "isolate", // Fixes Safari bug with rounded corners and scale transition
                                        }}
                                    />
                                )}
                            </>
                        )}
                    </AspectRatio>
                </Box>
            )}
            <Heading as="h3" size="headingMedium" fontWeight={400}>
                <LinkOverlay
                    as={NextLink}
                    href={getHrefForPageType(item)}
                    display="flex"
                    alignItems="center"
                >
                    {item.title}
                    <Icon
                        ml={2}
                        name="arrow-right"
                        _groupHover={{
                            transform: "translateX(6px)",
                        }}
                        transitionProperty="transform"
                        transitionTimingFunction="var(--transition-easing-base)"
                        transitionDuration="var(--transition-duration-short)"
                    />
                </LinkOverlay>
            </Heading>
        </LinkBox>
    );
};

export { GenericPageCard };
export type { GenericPageCardProps };
