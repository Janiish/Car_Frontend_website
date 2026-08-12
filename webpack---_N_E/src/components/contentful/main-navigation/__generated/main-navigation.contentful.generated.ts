import * as Types from '../../../../lib/contentful/__generated/graphql.types';

import { ComponentReferenceFields_Car_Fragment, ComponentReferenceFields_Car3D_Fragment, ComponentReferenceFields_ComponentProductSlider_1oyzmkwpf3d5_Master_Fragment, ComponentReferenceFields_ContentTag_Fragment, ComponentReferenceFields_Dashboard_Fragment, ComponentReferenceFields_Driver_Fragment, ComponentReferenceFields_Event_Fragment, ComponentReferenceFields_ExternalLink_Fragment, ComponentReferenceFields_Footer_Fragment, ComponentReferenceFields_LanguageSelectorItem_Fragment, ComponentReferenceFields_MainNavigation_Fragment, ComponentReferenceFields_Microcopy_Fragment, ComponentReferenceFields_MicrocopySet_Fragment, ComponentReferenceFields_ModalLink_Fragment, ComponentReferenceFields_Module916VideoImage_Fragment, ComponentReferenceFields_ModuleAccordion_Fragment, ComponentReferenceFields_ModuleAudioPlayer_Fragment, ComponentReferenceFields_ModuleCarTechSpecs_Fragment, ComponentReferenceFields_ModuleCarousel_Fragment, ComponentReferenceFields_ModuleCircuit_Fragment, ComponentReferenceFields_ModuleCookieConsentSettingsWidget_Fragment, ComponentReferenceFields_ModuleDriverList_Fragment, ComponentReferenceFields_ModuleGallery_Fragment, ComponentReferenceFields_ModuleHistoryCarousel_Fragment, ComponentReferenceFields_ModuleIframe_Fragment, ComponentReferenceFields_ModuleImage_Fragment, ComponentReferenceFields_ModuleListenToTheEngine_Fragment, ComponentReferenceFields_ModuleLiveTimingTable_Fragment, ComponentReferenceFields_ModuleMediaFeature_Fragment, ComponentReferenceFields_ModulePageLinkTile_Fragment, ComponentReferenceFields_ModuleQuickLinks_Fragment, ComponentReferenceFields_ModuleQuote_Fragment, ComponentReferenceFields_ModuleRichText_Fragment, ComponentReferenceFields_ModuleSideBySide_Fragment, ComponentReferenceFields_ModuleSpacer_Fragment, ComponentReferenceFields_ModuleSplitLayout_Fragment, ComponentReferenceFields_ModuleTable_Fragment, ComponentReferenceFields_ModuleTitleAndDescription_Fragment, ComponentReferenceFields_ModuleVideo_Fragment, ComponentReferenceFields_Navigation_Fragment, ComponentReferenceFields_NewPageHomepage_Fragment, ComponentReferenceFields_PageArticle_Fragment, ComponentReferenceFields_PageBasic_Fragment, ComponentReferenceFields_PageCar_Fragment, ComponentReferenceFields_PageCategory_Fragment, ComponentReferenceFields_PageDriver_Fragment, ComponentReferenceFields_PageHomepage_Fragment, ComponentReferenceFields_PageRaceEvent_Fragment, ComponentReferenceFields_PageRaceSeries_Fragment, ComponentReferenceFields_PageSearch_Fragment, ComponentReferenceFields_PageTeam_Fragment, ComponentReferenceFields_PartAccordionItem_Fragment, ComponentReferenceFields_PartCarDetailsItem_Fragment, ComponentReferenceFields_PartCircuitHotspot_Fragment, ComponentReferenceFields_PartHistoryCarouselItem_Fragment, ComponentReferenceFields_PartMainNavigationAccordion_Fragment, ComponentReferenceFields_PartMainNavigationItem_Fragment, ComponentReferenceFields_Partner_Fragment, ComponentReferenceFields_PartnerSet_Fragment, ComponentReferenceFields_Products_Fragment, ComponentReferenceFields_Redirect_Fragment, ComponentReferenceFields_Redirects_Fragment, ComponentReferenceFields_SeoMetadata_Fragment, ComponentReferenceFields_Series_Fragment, ComponentReferenceFields_SiteSettings_Fragment, ComponentReferenceFields_Team_Fragment } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { ComponentReferenceFieldsFragmentDoc } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@/lib/contentful/fetch-config';
export type LanguageSelectorItemFieldsFragment = { __typename?: 'LanguageSelectorItem', label?: string | null, locale?: string | null, countryName?: string | null, languageName?: string | null, region?: string | null };

export type PartMainNavigationItemFragment = (
  { __typename?: 'PartMainNavigationItem', label?: string | null, animatedLabel?: string | null, image?: any | null, theme?: string | null, dateLabel?: string | null, page?: (
    { __typename?: 'PageArticle', slug?: string | null }
    & ComponentReferenceFields_PageArticle_Fragment
  ) | (
    { __typename?: 'PageBasic', slug?: string | null }
    & ComponentReferenceFields_PageBasic_Fragment
  ) | (
    { __typename?: 'PageCar', slug?: string | null }
    & ComponentReferenceFields_PageCar_Fragment
  ) | (
    { __typename?: 'PageDriver', slug?: string | null }
    & ComponentReferenceFields_PageDriver_Fragment
  ) | (
    { __typename?: 'PageRaceEvent', slug?: string | null }
    & ComponentReferenceFields_PageRaceEvent_Fragment
  ) | (
    { __typename?: 'PageRaceSeries', slug?: string | null }
    & ComponentReferenceFields_PageRaceSeries_Fragment
  ) | (
    { __typename?: 'PageTeam', slug?: string | null }
    & ComponentReferenceFields_PageTeam_Fragment
  ) | null }
  & ComponentReferenceFields_PartMainNavigationItem_Fragment
);

export type PartMainNavigationAccordionFragment = (
  { __typename?: 'PartMainNavigationAccordion', title?: string | null, itemsCollection?: { __typename?: 'PartMainNavigationAccordionItemsCollection', items: Array<(
      { __typename?: 'PartMainNavigationItem' }
      & PartMainNavigationItemFragment
    ) | null> } | null }
  & ComponentReferenceFields_PartMainNavigationAccordion_Fragment
);

export type MainNavigationFieldsFragment = (
  { __typename?: 'MainNavigation', liveTicker?: any | null, showLiveTicker?: boolean | null, seriesSectionLabel?: string | null, carsSectionLabel?: string | null, teamsSectionLabel?: string | null, eventsSectionLabel?: string | null, languageSelectorSearchPlaceholder?: string | null, languageSelectorErrorLabel?: string | null, highlightLink?: (
    { __typename?: 'ExternalLink', label?: string | null, url?: string | null }
    & ComponentReferenceFields_ExternalLink_Fragment
  ) | (
    { __typename?: 'ModalLink', label?: string | null, embedId?: string | null, embedProvider?: string | null, twitchEmbedType?: string | null, modalTitle?: string | null }
    & ComponentReferenceFields_ModalLink_Fragment
  ) | (
    { __typename?: 'PageBasic', title?: string | null, linkTitle?: string | null, slug?: string | null }
    & ComponentReferenceFields_PageBasic_Fragment
  ) | (
    { __typename?: 'PageHomepage', title?: string | null, linkTitle?: string | null }
    & ComponentReferenceFields_PageHomepage_Fragment
  ) | (
    { __typename?: 'PageRaceEvent', title?: string | null, linkTitle?: string | null, slug?: string | null }
    & ComponentReferenceFields_PageRaceEvent_Fragment
  ) | (
    { __typename?: 'PageRaceSeries', title?: string | null, linkTitle?: string | null, slug?: string | null }
    & ComponentReferenceFields_PageRaceSeries_Fragment
  ) | null, seriesSectionCollection?: { __typename?: 'MainNavigationSeriesSectionCollection', items: Array<(
      { __typename?: 'PartMainNavigationAccordion' }
      & PartMainNavigationAccordionFragment
    ) | null> } | null, carsSectionCollection?: { __typename?: 'MainNavigationCarsSectionCollection', items: Array<(
      { __typename?: 'PartMainNavigationItem' }
      & PartMainNavigationItemFragment
    ) | null> } | null, teamsSectionCollection?: { __typename?: 'MainNavigationTeamsSectionCollection', items: Array<(
      { __typename?: 'PartMainNavigationItem' }
      & PartMainNavigationItemFragment
    ) | null> } | null, eventsSectionCollection?: { __typename?: 'MainNavigationEventsSectionCollection', items: Array<(
      { __typename?: 'PartMainNavigationAccordion' }
      & PartMainNavigationAccordionFragment
    ) | null> } | null, journalPage?: (
    { __typename?: 'PageCategory', title?: string | null, linkTitle?: string | null, mainCategory?: string | null }
    & ComponentReferenceFields_PageCategory_Fragment
  ) | null, languageSelectorItemsCollection?: { __typename?: 'MainNavigationLanguageSelectorItemsCollection', items: Array<(
      { __typename?: 'LanguageSelectorItem' }
      & LanguageSelectorItemFieldsFragment
    ) | null> } | null }
  & ComponentReferenceFields_MainNavigation_Fragment
);

export type MainNavigationCollectionQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type MainNavigationCollectionQuery = { __typename?: 'Query', mainNavigationCollection?: { __typename?: 'MainNavigationCollection', items: Array<(
      { __typename?: 'MainNavigation', liveTicker?: any | null }
      & ComponentReferenceFields_MainNavigation_Fragment
    ) | null> } | null };

export type MainNavigationQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  id: Types.Scalars['String']['input'];
}>;


export type MainNavigationQuery = { __typename?: 'Query', mainNavigation?: (
    { __typename?: 'MainNavigation' }
    & MainNavigationFieldsFragment
  ) | null };


export const PartMainNavigationItemFragmentDoc = `
    fragment PartMainNavigationItem on PartMainNavigationItem {
  ...ComponentReferenceFields
  label
  animatedLabel
  image
  theme
  dateLabel
  page {
    ... on PageRaceSeries {
      ...ComponentReferenceFields
      slug
    }
    ... on PageCar {
      ...ComponentReferenceFields
      slug
    }
    ... on PageTeam {
      ...ComponentReferenceFields
      slug
    }
    ... on PageBasic {
      ...ComponentReferenceFields
      slug
    }
    ... on PageArticle {
      ...ComponentReferenceFields
      slug
    }
    ... on PageRaceEvent {
      ...ComponentReferenceFields
      slug
    }
    ... on PageDriver {
      ...ComponentReferenceFields
      slug
    }
  }
}
    `;
export const PartMainNavigationAccordionFragmentDoc = `
    fragment PartMainNavigationAccordion on PartMainNavigationAccordion {
  ...ComponentReferenceFields
  title
  itemsCollection {
    items {
      ... on PartMainNavigationItem {
        ...PartMainNavigationItem
      }
    }
  }
}
    `;
export const LanguageSelectorItemFieldsFragmentDoc = `
    fragment LanguageSelectorItemFields on LanguageSelectorItem {
  label
  locale
  countryName
  languageName
  region
}
    `;
export const MainNavigationFieldsFragmentDoc = `
    fragment MainNavigationFields on MainNavigation {
  ...ComponentReferenceFields
  liveTicker
  showLiveTicker
  highlightLink {
    ... on PageRaceSeries {
      ...ComponentReferenceFields
      title
      linkTitle
      slug
    }
    ... on PageHomepage {
      ...ComponentReferenceFields
      title
      linkTitle
    }
    ... on PageBasic {
      ...ComponentReferenceFields
      title
      linkTitle
      slug
    }
    ... on PageRaceEvent {
      ...ComponentReferenceFields
      title
      linkTitle
      slug
    }
    ... on ExternalLink {
      ...ComponentReferenceFields
      label
      url
    }
    ... on ModalLink {
      ...ComponentReferenceFields
      label
      embedId
      embedProvider
      twitchEmbedType
      modalTitle
    }
  }
  seriesSectionLabel
  seriesSectionCollection(limit: 20) {
    items {
      ... on PartMainNavigationAccordion {
        ...PartMainNavigationAccordion
      }
    }
  }
  carsSectionLabel
  carsSectionCollection(limit: 20) {
    items {
      ... on PartMainNavigationItem {
        ...PartMainNavigationItem
      }
    }
  }
  teamsSectionLabel
  teamsSectionCollection(limit: 20) {
    items {
      ... on PartMainNavigationItem {
        ...PartMainNavigationItem
      }
    }
  }
  eventsSectionLabel
  eventsSectionCollection(limit: 20) {
    items {
      ... on PartMainNavigationAccordion {
        ...PartMainNavigationAccordion
      }
    }
  }
  journalPage {
    ...ComponentReferenceFields
    title
    linkTitle
    mainCategory
  }
  languageSelectorSearchPlaceholder
  languageSelectorErrorLabel
  languageSelectorItemsCollection {
    items {
      ...LanguageSelectorItemFields
    }
  }
}
    `;
export const MainNavigationCollectionDocument = `
    query MainNavigationCollection($locale: String!, $preview: Boolean, $limit: Int = 1) {
  mainNavigationCollection(locale: $locale, preview: $preview, limit: $limit) {
    items {
      ...ComponentReferenceFields
      liveTicker
    }
  }
}
    ${ComponentReferenceFieldsFragmentDoc}`;

export const useMainNavigationCollectionQuery = <
      TData = MainNavigationCollectionQuery,
      TError = unknown
    >(
      variables: MainNavigationCollectionQueryVariables,
      options?: Omit<UseQueryOptions<MainNavigationCollectionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<MainNavigationCollectionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<MainNavigationCollectionQuery, TError, TData>(
      {
    queryKey: ['MainNavigationCollection', variables],
    queryFn: customFetcher<MainNavigationCollectionQuery, MainNavigationCollectionQueryVariables>(MainNavigationCollectionDocument, variables),
    ...options
  }
    )};

useMainNavigationCollectionQuery.getKey = (variables: MainNavigationCollectionQueryVariables) => ['MainNavigationCollection', variables];


useMainNavigationCollectionQuery.fetcher = (variables: MainNavigationCollectionQueryVariables, options?: RequestInit['headers']) => customFetcher<MainNavigationCollectionQuery, MainNavigationCollectionQueryVariables>(MainNavigationCollectionDocument, variables, options);

export const MainNavigationDocument = `
    query MainNavigation($locale: String!, $preview: Boolean, $id: String!) {
  mainNavigation(id: $id, locale: $locale, preview: $preview) {
    ...MainNavigationFields
  }
}
    ${MainNavigationFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}
${PartMainNavigationAccordionFragmentDoc}
${PartMainNavigationItemFragmentDoc}
${LanguageSelectorItemFieldsFragmentDoc}`;

export const useMainNavigationQuery = <
      TData = MainNavigationQuery,
      TError = unknown
    >(
      variables: MainNavigationQueryVariables,
      options?: Omit<UseQueryOptions<MainNavigationQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<MainNavigationQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<MainNavigationQuery, TError, TData>(
      {
    queryKey: ['MainNavigation', variables],
    queryFn: customFetcher<MainNavigationQuery, MainNavigationQueryVariables>(MainNavigationDocument, variables),
    ...options
  }
    )};

useMainNavigationQuery.getKey = (variables: MainNavigationQueryVariables) => ['MainNavigation', variables];


useMainNavigationQuery.fetcher = (variables: MainNavigationQueryVariables, options?: RequestInit['headers']) => customFetcher<MainNavigationQuery, MainNavigationQueryVariables>(MainNavigationDocument, variables, options);
