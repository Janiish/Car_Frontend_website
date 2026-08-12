import type { CoreGraphqlEntryProps } from "@/types/page";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { useMainNavigationQuery } from "@/components/contentful/main-navigation/__generated/main-navigation.contentful.generated";
import { MainNavigation } from "@/components/contentful/main-navigation/main-navigation";

export type MainNavigationGraphqlProps = CoreGraphqlEntryProps;

export const MainNavigationGraphql = ({ id, locale, preview }: MainNavigationGraphqlProps) => {
    const { data: mainNavigationData, isLoading: isLoadingMainNavigation } = useMainNavigationQuery(
        {
            id,
            locale,
            preview,
        },
        {
            ...(!preview && { staleTime: Infinity }),
            refetchOnWindowFocus: false,
        }
    );

    const mainNavigation = useContentfulLiveUpdates(mainNavigationData?.mainNavigation, { locale });

    if (isLoadingMainNavigation || !mainNavigation) {
        return null;
    }

    return <MainNavigation {...mainNavigation} />;
};
