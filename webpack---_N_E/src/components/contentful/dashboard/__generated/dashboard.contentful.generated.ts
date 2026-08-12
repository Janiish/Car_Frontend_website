import * as Types from '../../../../lib/contentful/__generated/graphql.types';

import { PageRaceEventLinkToFieldsFragment, PageDriverLinkToFieldsFragment, PageArticleLinkToFieldsFragment, PageBasicLinkToFieldsFragment, PageCategoryLinkToFieldsFragment, PageTeamLinkToFieldsFragment, PageCarLinkToFieldsFragment, PageRaceSeriesLinkToFieldsFragment } from '../../../../lib/contentful/link-fragments/__generated/link-fragments.contentful.generated';
import { ComponentReferenceFields_Car_Fragment, ComponentReferenceFields_Car3D_Fragment, ComponentReferenceFields_ComponentProductSlider_1oyzmkwpf3d5_Master_Fragment, ComponentReferenceFields_ContentTag_Fragment, ComponentReferenceFields_Dashboard_Fragment, ComponentReferenceFields_Driver_Fragment, ComponentReferenceFields_Event_Fragment, ComponentReferenceFields_ExternalLink_Fragment, ComponentReferenceFields_Footer_Fragment, ComponentReferenceFields_LanguageSelectorItem_Fragment, ComponentReferenceFields_MainNavigation_Fragment, ComponentReferenceFields_Microcopy_Fragment, ComponentReferenceFields_MicrocopySet_Fragment, ComponentReferenceFields_ModalLink_Fragment, ComponentReferenceFields_Module916VideoImage_Fragment, ComponentReferenceFields_ModuleAccordion_Fragment, ComponentReferenceFields_ModuleAudioPlayer_Fragment, ComponentReferenceFields_ModuleCarTechSpecs_Fragment, ComponentReferenceFields_ModuleCarousel_Fragment, ComponentReferenceFields_ModuleCircuit_Fragment, ComponentReferenceFields_ModuleCookieConsentSettingsWidget_Fragment, ComponentReferenceFields_ModuleDriverList_Fragment, ComponentReferenceFields_ModuleGallery_Fragment, ComponentReferenceFields_ModuleHistoryCarousel_Fragment, ComponentReferenceFields_ModuleIframe_Fragment, ComponentReferenceFields_ModuleImage_Fragment, ComponentReferenceFields_ModuleListenToTheEngine_Fragment, ComponentReferenceFields_ModuleLiveTimingTable_Fragment, ComponentReferenceFields_ModuleMediaFeature_Fragment, ComponentReferenceFields_ModulePageLinkTile_Fragment, ComponentReferenceFields_ModuleQuickLinks_Fragment, ComponentReferenceFields_ModuleQuote_Fragment, ComponentReferenceFields_ModuleRichText_Fragment, ComponentReferenceFields_ModuleSideBySide_Fragment, ComponentReferenceFields_ModuleSpacer_Fragment, ComponentReferenceFields_ModuleSplitLayout_Fragment, ComponentReferenceFields_ModuleTable_Fragment, ComponentReferenceFields_ModuleTitleAndDescription_Fragment, ComponentReferenceFields_ModuleVideo_Fragment, ComponentReferenceFields_Navigation_Fragment, ComponentReferenceFields_NewPageHomepage_Fragment, ComponentReferenceFields_PageArticle_Fragment, ComponentReferenceFields_PageBasic_Fragment, ComponentReferenceFields_PageCar_Fragment, ComponentReferenceFields_PageCategory_Fragment, ComponentReferenceFields_PageDriver_Fragment, ComponentReferenceFields_PageHomepage_Fragment, ComponentReferenceFields_PageRaceEvent_Fragment, ComponentReferenceFields_PageRaceSeries_Fragment, ComponentReferenceFields_PageSearch_Fragment, ComponentReferenceFields_PageTeam_Fragment, ComponentReferenceFields_PartAccordionItem_Fragment, ComponentReferenceFields_PartCarDetailsItem_Fragment, ComponentReferenceFields_PartCircuitHotspot_Fragment, ComponentReferenceFields_PartHistoryCarouselItem_Fragment, ComponentReferenceFields_PartMainNavigationAccordion_Fragment, ComponentReferenceFields_PartMainNavigationItem_Fragment, ComponentReferenceFields_Partner_Fragment, ComponentReferenceFields_PartnerSet_Fragment, ComponentReferenceFields_Products_Fragment, ComponentReferenceFields_Redirect_Fragment, ComponentReferenceFields_Redirects_Fragment, ComponentReferenceFields_SeoMetadata_Fragment, ComponentReferenceFields_Series_Fragment, ComponentReferenceFields_SiteSettings_Fragment, ComponentReferenceFields_Team_Fragment } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { ContentTagFieldsFragment } from '../../../../lib/contentful/content-tag/__generated/content-tag.contentful.generated';
import { TeamFieldsFragment } from '../../team/__generated/team.contentful.generated';
import { PartnerSetFieldsFragment, PartnerFieldsFragment } from '../../partner-set/__generated/partner-set.contentful.generated';
import { PageRaceEventLinkToFieldsFragmentDoc, PageDriverLinkToFieldsFragmentDoc, PageArticleLinkToFieldsFragmentDoc, PageBasicLinkToFieldsFragmentDoc, PageCategoryLinkToFieldsFragmentDoc, PageTeamLinkToFieldsFragmentDoc, PageCarLinkToFieldsFragmentDoc, PageRaceSeriesLinkToFieldsFragmentDoc } from '../../../../lib/contentful/link-fragments/__generated/link-fragments.contentful.generated';
import { ComponentReferenceFieldsFragmentDoc } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { ContentTagFieldsFragmentDoc } from '../../../../lib/contentful/content-tag/__generated/content-tag.contentful.generated';
import { TeamFieldsFragmentDoc } from '../../team/__generated/team.contentful.generated';
import { PartnerSetFieldsFragmentDoc, PartnerFieldsFragmentDoc } from '../../partner-set/__generated/partner-set.contentful.generated';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@/lib/contentful/fetch-config';
export type DashboardPageRaceEventFieldsFragment = (
  { __typename?: 'PageRaceEvent', event?: { __typename?: 'Event', startDate?: any | null, endDate?: any | null } | null }
  & PageRaceEventLinkToFieldsFragment
);

export type DashboardPageDriverFieldsFragment = (
  { __typename?: 'PageDriver' }
  & PageDriverLinkToFieldsFragment
);

export type DashboardPageArticleFieldsFragment = (
  { __typename?: 'PageArticle' }
  & PageArticleLinkToFieldsFragment
);

export type DashboardPageBasicFieldsFragment = (
  { __typename?: 'PageBasic' }
  & PageBasicLinkToFieldsFragment
);

export type DashboardPageCategoryFieldsFragment = (
  { __typename?: 'PageCategory' }
  & PageCategoryLinkToFieldsFragment
);

export type DashboardPageTeamFieldsFragment = (
  { __typename?: 'PageTeam' }
  & PageTeamLinkToFieldsFragment
);

export type DashboardPageCarFieldsFragment = (
  { __typename?: 'PageCar' }
  & PageCarLinkToFieldsFragment
);

export type DashboardPageRaceSeriesFieldsFragment = (
  { __typename?: 'PageRaceSeries' }
  & PageRaceSeriesLinkToFieldsFragment
);

export type DashboardFieldsFragment = (
  { __typename?: 'Dashboard', showDashboard?: boolean | null, widgetLauncherAsset?: any | null, labelNoEventsOnDate?: string | null, leftBottomCard?: (
    { __typename?: 'PageArticle' }
    & DashboardPageArticleFieldsFragment
  ) | (
    { __typename?: 'PageBasic' }
    & DashboardPageBasicFieldsFragment
  ) | (
    { __typename?: 'PageCar' }
    & DashboardPageCarFieldsFragment
  ) | (
    { __typename?: 'PageCategory' }
    & DashboardPageCategoryFieldsFragment
  ) | (
    { __typename?: 'PageDriver' }
    & DashboardPageDriverFieldsFragment
  ) | (
    { __typename?: 'PageRaceEvent' }
    & DashboardPageRaceEventFieldsFragment
  ) | (
    { __typename?: 'PageRaceSeries' }
    & DashboardPageRaceSeriesFieldsFragment
  ) | (
    { __typename?: 'PageTeam' }
    & DashboardPageTeamFieldsFragment
  ) | null, centerCard?: (
    { __typename?: 'PageArticle' }
    & DashboardPageArticleFieldsFragment
  ) | (
    { __typename?: 'PageBasic' }
    & DashboardPageBasicFieldsFragment
  ) | (
    { __typename?: 'PageCar' }
    & DashboardPageCarFieldsFragment
  ) | (
    { __typename?: 'PageCategory' }
    & DashboardPageCategoryFieldsFragment
  ) | (
    { __typename?: 'PageDriver' }
    & DashboardPageDriverFieldsFragment
  ) | (
    { __typename?: 'PageRaceEvent' }
    & DashboardPageRaceEventFieldsFragment
  ) | (
    { __typename?: 'PageRaceSeries' }
    & DashboardPageRaceSeriesFieldsFragment
  ) | (
    { __typename?: 'PageTeam' }
    & DashboardPageTeamFieldsFragment
  ) | null, rightTopLeftCard?: (
    { __typename?: 'PageArticle' }
    & DashboardPageArticleFieldsFragment
  ) | (
    { __typename?: 'PageBasic' }
    & DashboardPageBasicFieldsFragment
  ) | (
    { __typename?: 'PageCar' }
    & DashboardPageCarFieldsFragment
  ) | (
    { __typename?: 'PageCategory' }
    & DashboardPageCategoryFieldsFragment
  ) | (
    { __typename?: 'PageDriver' }
    & DashboardPageDriverFieldsFragment
  ) | (
    { __typename?: 'PageRaceEvent' }
    & DashboardPageRaceEventFieldsFragment
  ) | (
    { __typename?: 'PageRaceSeries' }
    & DashboardPageRaceSeriesFieldsFragment
  ) | (
    { __typename?: 'PageTeam' }
    & DashboardPageTeamFieldsFragment
  ) | null, rightTopRightCard?: (
    { __typename?: 'PageArticle' }
    & DashboardPageArticleFieldsFragment
  ) | (
    { __typename?: 'PageBasic' }
    & DashboardPageBasicFieldsFragment
  ) | (
    { __typename?: 'PageCar' }
    & DashboardPageCarFieldsFragment
  ) | (
    { __typename?: 'PageCategory' }
    & DashboardPageCategoryFieldsFragment
  ) | (
    { __typename?: 'PageDriver' }
    & DashboardPageDriverFieldsFragment
  ) | (
    { __typename?: 'PageRaceEvent' }
    & DashboardPageRaceEventFieldsFragment
  ) | (
    { __typename?: 'PageRaceSeries' }
    & DashboardPageRaceSeriesFieldsFragment
  ) | (
    { __typename?: 'PageTeam' }
    & DashboardPageTeamFieldsFragment
  ) | null, rightBottomCard?: (
    { __typename?: 'PageArticle' }
    & DashboardPageArticleFieldsFragment
  ) | (
    { __typename?: 'PageBasic' }
    & DashboardPageBasicFieldsFragment
  ) | (
    { __typename?: 'PageCar' }
    & DashboardPageCarFieldsFragment
  ) | (
    { __typename?: 'PageCategory' }
    & DashboardPageCategoryFieldsFragment
  ) | (
    { __typename?: 'PageDriver' }
    & DashboardPageDriverFieldsFragment
  ) | (
    { __typename?: 'PageRaceEvent' }
    & DashboardPageRaceEventFieldsFragment
  ) | (
    { __typename?: 'PageRaceSeries' }
    & DashboardPageRaceSeriesFieldsFragment
  ) | (
    { __typename?: 'PageTeam' }
    & DashboardPageTeamFieldsFragment
  ) | null }
  & ComponentReferenceFields_Dashboard_Fragment
);

export type DashboardCollectionQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview: Types.Scalars['Boolean']['input'];
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type DashboardCollectionQuery = { __typename?: 'Query', dashboardCollection?: { __typename?: 'DashboardCollection', items: Array<(
      { __typename?: 'Dashboard' }
      & DashboardFieldsFragment
    ) | null> } | null };

export type DashboardQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview: Types.Scalars['Boolean']['input'];
  id: Types.Scalars['String']['input'];
}>;


export type DashboardQuery = { __typename?: 'Query', dashboard?: (
    { __typename?: 'Dashboard' }
    & DashboardFieldsFragment
  ) | null };


export const DashboardPageRaceEventFieldsFragmentDoc = `
    fragment DashboardPageRaceEventFields on PageRaceEvent {
  ...PageRaceEventLinkToFields
  event {
    startDate
    endDate
  }
}
    `;
export const DashboardPageDriverFieldsFragmentDoc = `
    fragment DashboardPageDriverFields on PageDriver {
  ...PageDriverLinkToFields
}
    `;
export const DashboardPageArticleFieldsFragmentDoc = `
    fragment DashboardPageArticleFields on PageArticle {
  ...PageArticleLinkToFields
}
    `;
export const DashboardPageBasicFieldsFragmentDoc = `
    fragment DashboardPageBasicFields on PageBasic {
  ...PageBasicLinkToFields
}
    `;
export const DashboardPageCategoryFieldsFragmentDoc = `
    fragment DashboardPageCategoryFields on PageCategory {
  ...PageCategoryLinkToFields
}
    `;
export const DashboardPageTeamFieldsFragmentDoc = `
    fragment DashboardPageTeamFields on PageTeam {
  ...PageTeamLinkToFields
}
    `;
export const DashboardPageCarFieldsFragmentDoc = `
    fragment DashboardPageCarFields on PageCar {
  ...PageCarLinkToFields
}
    `;
export const DashboardPageRaceSeriesFieldsFragmentDoc = `
    fragment DashboardPageRaceSeriesFields on PageRaceSeries {
  ...PageRaceSeriesLinkToFields
}
    `;
export const DashboardFieldsFragmentDoc = `
    fragment DashboardFields on Dashboard {
  ...ComponentReferenceFields
  showDashboard
  widgetLauncherAsset
  leftBottomCard {
    ... on PageRaceEvent {
      ...DashboardPageRaceEventFields
    }
    ... on PageDriver {
      ...DashboardPageDriverFields
    }
    ... on PageArticle {
      ...DashboardPageArticleFields
    }
    ... on PageBasic {
      ...DashboardPageBasicFields
    }
    ... on PageCategory {
      ...DashboardPageCategoryFields
    }
    ... on PageTeam {
      ...DashboardPageTeamFields
    }
    ... on PageCar {
      ...DashboardPageCarFields
    }
    ... on PageRaceSeries {
      ...DashboardPageRaceSeriesFields
    }
  }
  centerCard {
    ... on PageRaceEvent {
      ...DashboardPageRaceEventFields
    }
    ... on PageDriver {
      ...DashboardPageDriverFields
    }
    ... on PageArticle {
      ...DashboardPageArticleFields
    }
    ... on PageBasic {
      ...DashboardPageBasicFields
    }
    ... on PageCategory {
      ...DashboardPageCategoryFields
    }
    ... on PageTeam {
      ...DashboardPageTeamFields
    }
    ... on PageCar {
      ...DashboardPageCarFields
    }
    ... on PageRaceSeries {
      ...DashboardPageRaceSeriesFields
    }
  }
  rightTopLeftCard {
    ... on PageRaceEvent {
      ...DashboardPageRaceEventFields
    }
    ... on PageDriver {
      ...DashboardPageDriverFields
    }
    ... on PageArticle {
      ...DashboardPageArticleFields
    }
    ... on PageBasic {
      ...DashboardPageBasicFields
    }
    ... on PageCategory {
      ...DashboardPageCategoryFields
    }
    ... on PageTeam {
      ...DashboardPageTeamFields
    }
    ... on PageCar {
      ...DashboardPageCarFields
    }
    ... on PageRaceSeries {
      ...DashboardPageRaceSeriesFields
    }
  }
  rightTopRightCard {
    ... on PageRaceEvent {
      ...DashboardPageRaceEventFields
    }
    ... on PageDriver {
      ...DashboardPageDriverFields
    }
    ... on PageArticle {
      ...DashboardPageArticleFields
    }
    ... on PageBasic {
      ...DashboardPageBasicFields
    }
    ... on PageCategory {
      ...DashboardPageCategoryFields
    }
    ... on PageTeam {
      ...DashboardPageTeamFields
    }
    ... on PageCar {
      ...DashboardPageCarFields
    }
    ... on PageRaceSeries {
      ...DashboardPageRaceSeriesFields
    }
  }
  rightBottomCard {
    ... on PageRaceEvent {
      ...DashboardPageRaceEventFields
    }
    ... on PageDriver {
      ...DashboardPageDriverFields
    }
    ... on PageArticle {
      ...DashboardPageArticleFields
    }
    ... on PageBasic {
      ...DashboardPageBasicFields
    }
    ... on PageCategory {
      ...DashboardPageCategoryFields
    }
    ... on PageTeam {
      ...DashboardPageTeamFields
    }
    ... on PageCar {
      ...DashboardPageCarFields
    }
    ... on PageRaceSeries {
      ...DashboardPageRaceSeriesFields
    }
  }
  labelNoEventsOnDate
}
    `;
export const DashboardCollectionDocument = `
    query DashboardCollection($locale: String!, $preview: Boolean!, $limit: Int = 1) {
  dashboardCollection(locale: $locale, preview: $preview, limit: $limit) {
    items {
      ...DashboardFields
    }
  }
}
    ${DashboardFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}
${DashboardPageRaceEventFieldsFragmentDoc}
${PageRaceEventLinkToFieldsFragmentDoc}
${DashboardPageDriverFieldsFragmentDoc}
${PageDriverLinkToFieldsFragmentDoc}
${ContentTagFieldsFragmentDoc}
${DashboardPageArticleFieldsFragmentDoc}
${PageArticleLinkToFieldsFragmentDoc}
${DashboardPageBasicFieldsFragmentDoc}
${PageBasicLinkToFieldsFragmentDoc}
${DashboardPageCategoryFieldsFragmentDoc}
${PageCategoryLinkToFieldsFragmentDoc}
${DashboardPageTeamFieldsFragmentDoc}
${PageTeamLinkToFieldsFragmentDoc}
${TeamFieldsFragmentDoc}
${DashboardPageCarFieldsFragmentDoc}
${PageCarLinkToFieldsFragmentDoc}
${PartnerSetFieldsFragmentDoc}
${PartnerFieldsFragmentDoc}
${DashboardPageRaceSeriesFieldsFragmentDoc}
${PageRaceSeriesLinkToFieldsFragmentDoc}`;

export const useDashboardCollectionQuery = <
      TData = DashboardCollectionQuery,
      TError = unknown
    >(
      variables: DashboardCollectionQueryVariables,
      options?: Omit<UseQueryOptions<DashboardCollectionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<DashboardCollectionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<DashboardCollectionQuery, TError, TData>(
      {
    queryKey: ['DashboardCollection', variables],
    queryFn: customFetcher<DashboardCollectionQuery, DashboardCollectionQueryVariables>(DashboardCollectionDocument, variables),
    ...options
  }
    )};

useDashboardCollectionQuery.getKey = (variables: DashboardCollectionQueryVariables) => ['DashboardCollection', variables];


useDashboardCollectionQuery.fetcher = (variables: DashboardCollectionQueryVariables, options?: RequestInit['headers']) => customFetcher<DashboardCollectionQuery, DashboardCollectionQueryVariables>(DashboardCollectionDocument, variables, options);

export const DashboardDocument = `
    query Dashboard($locale: String!, $preview: Boolean!, $id: String!) {
  dashboard(id: $id, locale: $locale, preview: $preview) {
    ...DashboardFields
  }
}
    ${DashboardFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}
${DashboardPageRaceEventFieldsFragmentDoc}
${PageRaceEventLinkToFieldsFragmentDoc}
${DashboardPageDriverFieldsFragmentDoc}
${PageDriverLinkToFieldsFragmentDoc}
${ContentTagFieldsFragmentDoc}
${DashboardPageArticleFieldsFragmentDoc}
${PageArticleLinkToFieldsFragmentDoc}
${DashboardPageBasicFieldsFragmentDoc}
${PageBasicLinkToFieldsFragmentDoc}
${DashboardPageCategoryFieldsFragmentDoc}
${PageCategoryLinkToFieldsFragmentDoc}
${DashboardPageTeamFieldsFragmentDoc}
${PageTeamLinkToFieldsFragmentDoc}
${TeamFieldsFragmentDoc}
${DashboardPageCarFieldsFragmentDoc}
${PageCarLinkToFieldsFragmentDoc}
${PartnerSetFieldsFragmentDoc}
${PartnerFieldsFragmentDoc}
${DashboardPageRaceSeriesFieldsFragmentDoc}
${PageRaceSeriesLinkToFieldsFragmentDoc}`;

export const useDashboardQuery = <
      TData = DashboardQuery,
      TError = unknown
    >(
      variables: DashboardQueryVariables,
      options?: Omit<UseQueryOptions<DashboardQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<DashboardQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<DashboardQuery, TError, TData>(
      {
    queryKey: ['Dashboard', variables],
    queryFn: customFetcher<DashboardQuery, DashboardQueryVariables>(DashboardDocument, variables),
    ...options
  }
    )};

useDashboardQuery.getKey = (variables: DashboardQueryVariables) => ['Dashboard', variables];


useDashboardQuery.fetcher = (variables: DashboardQueryVariables, options?: RequestInit['headers']) => customFetcher<DashboardQuery, DashboardQueryVariables>(DashboardDocument, variables, options);
