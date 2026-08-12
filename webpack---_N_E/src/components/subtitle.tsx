import { useMemo } from "react";
import type {
    PageArticleLinkToFieldsFragment,
    PageRaceSeriesLinkToFieldsFragment,
    PageBasicLinkToFieldsFragment,
    PageCarLinkToFieldsFragment,
    PageDriverLinkToFieldsFragment,
    PageRaceEventLinkToFieldsFragment,
    PageTeamLinkToFieldsFragment,
    PageHomepageLinkToFieldsFragment,
    PageCategoryLinkToFieldsFragment,
} from "@/lib/contentful/link-fragments/__generated/link-fragments.contentful.generated";
import { useMicrocopy } from "@/lib/contentful/microcopy/microcopy-context";
import { Text } from "@project/ui";
import type { TextProps } from "@project/ui";

type SubtitleProps = TextProps & {
    item?:
        | PageArticleLinkToFieldsFragment
        | PageBasicLinkToFieldsFragment
        | PageCarLinkToFieldsFragment
        | PageDriverLinkToFieldsFragment
        | PageRaceEventLinkToFieldsFragment
        | PageRaceSeriesLinkToFieldsFragment
        | PageTeamLinkToFieldsFragment
        | PageHomepageLinkToFieldsFragment
        | PageCategoryLinkToFieldsFragment;
};

const Subtitle = ({ item, ...textProps }: SubtitleProps) => {
    const { get: getMicrocopy } = useMicrocopy();

    const text = useMemo(() => {
        if (!item) return null;

        switch (item.__typename) {
            case "PageArticle":
                return item.topic ?? getMicrocopy("global", "label.pageArticle");
            case "PageBasic":
                return item.subtitle ?? getMicrocopy("global", "label.pageBasic");
            case "PageCar":
                return item.subtitle ?? getMicrocopy("global", "label.pageCar");
            case "PageCategory":
                return item.subtitle ?? getMicrocopy("global", "label.pageCategory");
            case "PageDriver":
                return getMicrocopy("global", "label.pageDriver");
            case "PageRaceEvent":
                return item.subtitle
                    ? `${getMicrocopy("global", "label.pageRaceEvent")} - ${item.subtitle}`
                    : getMicrocopy("global", "label.pageRaceEvent");
            case "PageRaceSeries":
                return item.subtitle ?? getMicrocopy("global", "label.pageRaceSeries");
            case "PageTeam":
                return getMicrocopy("global", "label.pageTeam");
            default:
                if (process.env.NODE_ENV === "development") {
                    // eslint-disable-next-line no-console
                    console.log("Subtitle component - unknown item type:", item.__typename);
                }
                return null;
        }
    }, [item, getMicrocopy]);

    return <Text {...textProps}>{text}</Text>;
};

Subtitle.displayName = "Subtitle";

export { Subtitle };
