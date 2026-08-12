import * as Types from '../../../../lib/contentful/__generated/graphql.types';

import { ComponentReferenceFields_Car_Fragment, ComponentReferenceFields_Car3D_Fragment, ComponentReferenceFields_ComponentProductSlider_1oyzmkwpf3d5_Master_Fragment, ComponentReferenceFields_ContentTag_Fragment, ComponentReferenceFields_Dashboard_Fragment, ComponentReferenceFields_Driver_Fragment, ComponentReferenceFields_Event_Fragment, ComponentReferenceFields_ExternalLink_Fragment, ComponentReferenceFields_Footer_Fragment, ComponentReferenceFields_LanguageSelectorItem_Fragment, ComponentReferenceFields_MainNavigation_Fragment, ComponentReferenceFields_Microcopy_Fragment, ComponentReferenceFields_MicrocopySet_Fragment, ComponentReferenceFields_ModalLink_Fragment, ComponentReferenceFields_Module916VideoImage_Fragment, ComponentReferenceFields_ModuleAccordion_Fragment, ComponentReferenceFields_ModuleAudioPlayer_Fragment, ComponentReferenceFields_ModuleCarTechSpecs_Fragment, ComponentReferenceFields_ModuleCarousel_Fragment, ComponentReferenceFields_ModuleCircuit_Fragment, ComponentReferenceFields_ModuleCookieConsentSettingsWidget_Fragment, ComponentReferenceFields_ModuleDriverList_Fragment, ComponentReferenceFields_ModuleGallery_Fragment, ComponentReferenceFields_ModuleHistoryCarousel_Fragment, ComponentReferenceFields_ModuleIframe_Fragment, ComponentReferenceFields_ModuleImage_Fragment, ComponentReferenceFields_ModuleListenToTheEngine_Fragment, ComponentReferenceFields_ModuleLiveTimingTable_Fragment, ComponentReferenceFields_ModuleMediaFeature_Fragment, ComponentReferenceFields_ModulePageLinkTile_Fragment, ComponentReferenceFields_ModuleQuickLinks_Fragment, ComponentReferenceFields_ModuleQuote_Fragment, ComponentReferenceFields_ModuleRichText_Fragment, ComponentReferenceFields_ModuleSideBySide_Fragment, ComponentReferenceFields_ModuleSpacer_Fragment, ComponentReferenceFields_ModuleSplitLayout_Fragment, ComponentReferenceFields_ModuleTable_Fragment, ComponentReferenceFields_ModuleTitleAndDescription_Fragment, ComponentReferenceFields_ModuleVideo_Fragment, ComponentReferenceFields_Navigation_Fragment, ComponentReferenceFields_NewPageHomepage_Fragment, ComponentReferenceFields_PageArticle_Fragment, ComponentReferenceFields_PageBasic_Fragment, ComponentReferenceFields_PageCar_Fragment, ComponentReferenceFields_PageCategory_Fragment, ComponentReferenceFields_PageDriver_Fragment, ComponentReferenceFields_PageHomepage_Fragment, ComponentReferenceFields_PageRaceEvent_Fragment, ComponentReferenceFields_PageRaceSeries_Fragment, ComponentReferenceFields_PageSearch_Fragment, ComponentReferenceFields_PageTeam_Fragment, ComponentReferenceFields_PartAccordionItem_Fragment, ComponentReferenceFields_PartCarDetailsItem_Fragment, ComponentReferenceFields_PartCircuitHotspot_Fragment, ComponentReferenceFields_PartHistoryCarouselItem_Fragment, ComponentReferenceFields_PartMainNavigationAccordion_Fragment, ComponentReferenceFields_PartMainNavigationItem_Fragment, ComponentReferenceFields_Partner_Fragment, ComponentReferenceFields_PartnerSet_Fragment, ComponentReferenceFields_Products_Fragment, ComponentReferenceFields_Redirect_Fragment, ComponentReferenceFields_Redirects_Fragment, ComponentReferenceFields_SeoMetadata_Fragment, ComponentReferenceFields_Series_Fragment, ComponentReferenceFields_SiteSettings_Fragment, ComponentReferenceFields_Team_Fragment } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { PageArticleLinkToFieldsFragment, PageBasicLinkToFieldsFragment, PageCarLinkToFieldsFragment, PageCategoryLinkToFieldsFragment, PageDriverLinkToFieldsFragment, PageHomepageLinkToFieldsFragment, PageRaceSeriesLinkToFieldsFragment, PageRaceEventLinkToFieldsFragment, PageTeamLinkToFieldsFragment, PageSearchLinkToFieldsFragment, ExternalLinkFieldsFragment, NewPageHomepageLinkToFieldsFragment } from '../../../../lib/contentful/link-fragments/__generated/link-fragments.contentful.generated';
import { ContentTagFieldsFragment } from '../../../../lib/contentful/content-tag/__generated/content-tag.contentful.generated';
import { PartnerSetFieldsFragment, PartnerFieldsFragment } from '../../partner-set/__generated/partner-set.contentful.generated';
import { PageRaceEventFieldsFragment } from '../../page-race-event/__generated/page-race-event.contentful.generated';
import { EventFieldsFragment } from '../../event/__generated/event.contentful.generated';
import { TeamFieldsFragment } from '../../team/__generated/team.contentful.generated';
import { ComponentReferenceFieldsFragmentDoc } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { PageArticleLinkToFieldsFragmentDoc, PageBasicLinkToFieldsFragmentDoc, PageCarLinkToFieldsFragmentDoc, PageCategoryLinkToFieldsFragmentDoc, PageDriverLinkToFieldsFragmentDoc, PageHomepageLinkToFieldsFragmentDoc, PageRaceSeriesLinkToFieldsFragmentDoc, PageRaceEventLinkToFieldsFragmentDoc, PageTeamLinkToFieldsFragmentDoc, PageSearchLinkToFieldsFragmentDoc, ExternalLinkFieldsFragmentDoc, NewPageHomepageLinkToFieldsFragmentDoc } from '../../../../lib/contentful/link-fragments/__generated/link-fragments.contentful.generated';
import { ContentTagFieldsFragmentDoc } from '../../../../lib/contentful/content-tag/__generated/content-tag.contentful.generated';
import { PartnerSetFieldsFragmentDoc, PartnerFieldsFragmentDoc } from '../../partner-set/__generated/partner-set.contentful.generated';
import { PageRaceEventFieldsFragmentDoc } from '../../page-race-event/__generated/page-race-event.contentful.generated';
import { EventFieldsFragmentDoc } from '../../event/__generated/event.contentful.generated';
import { TeamFieldsFragmentDoc } from '../../team/__generated/team.contentful.generated';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@/lib/contentful/fetch-config';
export type NavigationFieldsFragment = (
  { __typename?: 'Navigation', title?: string | null, navigationItemsCollection?: { __typename?: 'NavigationNavigationItemsCollection', items: Array<(
      { __typename?: 'ExternalLink' }
      & ExternalLinkFieldsFragment
    ) | (
      { __typename?: 'PageArticle' }
      & PageArticleLinkToFieldsFragment
    ) | (
      { __typename?: 'PageBasic' }
      & PageBasicLinkToFieldsFragment
    ) | (
      { __typename?: 'PageCar' }
      & PageCarLinkToFieldsFragment
    ) | (
      { __typename?: 'PageCategory' }
      & PageCategoryLinkToFieldsFragment
    ) | (
      { __typename?: 'PageDriver' }
      & PageDriverLinkToFieldsFragment
    ) | (
      { __typename?: 'PageHomepage' }
      & PageHomepageLinkToFieldsFragment
    ) | (
      { __typename?: 'PageRaceEvent' }
      & PageRaceEventFieldsFragment
    ) | (
      { __typename?: 'PageRaceSeries' }
      & PageRaceSeriesLinkToFieldsFragment
    ) | (
      { __typename?: 'PageSearch' }
      & PageSearchLinkToFieldsFragment
    ) | (
      { __typename?: 'PageTeam' }
      & PageTeamLinkToFieldsFragment
    ) | null> } | null }
  & ComponentReferenceFields_Navigation_Fragment
);

export type NavigationCollectionQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview: Types.Scalars['Boolean']['input'];
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type NavigationCollectionQuery = { __typename?: 'Query', navigationCollection?: { __typename?: 'NavigationCollection', items: Array<(
      { __typename?: 'Navigation' }
      & NavigationFieldsFragment
    ) | null> } | null };

export type NavigationQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview: Types.Scalars['Boolean']['input'];
  id: Types.Scalars['String']['input'];
}>;


export type NavigationQuery = { __typename?: 'Query', navigation?: (
    { __typename?: 'Navigation' }
    & NavigationFieldsFragment
  ) | null };


export const NavigationFieldsFragmentDoc = `
    fragment NavigationFields on Navigation {
  ...ComponentReferenceFields
  title
  navigationItemsCollection(limit: 15) {
    items {
      ... on PageArticle {
        ...PageArticleLinkToFields
      }
      ... on PageBasic {
        ...PageBasicLinkToFields
      }
      ... on PageCar {
        ...PageCarLinkToFields
      }
      ... on PageCategory {
        ...PageCategoryLinkToFields
      }
      ... on PageDriver {
        ...PageDriverLinkToFields
      }
      ... on PageHomepage {
        ...PageHomepageLinkToFields
      }
      ... on PageRaceSeries {
        ...PageRaceSeriesLinkToFields
      }
      ... on PageRaceEvent {
        ...PageRaceEventFields
      }
      ... on PageSearch {
        ...PageSearchLinkToFields
      }
      ... on PageTeam {
        ...PageTeamLinkToFields
      }
      ... on ExternalLink {
        ...ExternalLinkFields
      }
    }
  }
}
    `;
export const NavigationCollectionDocument = `
    query NavigationCollection($locale: String!, $preview: Boolean!, $limit: Int = 1) {
  navigationCollection(locale: $locale, preview: $preview, limit: $limit) {
    items {
      ...NavigationFields
    }
  }
}
    ${NavigationFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}
${PageArticleLinkToFieldsFragmentDoc}
${ContentTagFieldsFragmentDoc}
${PageBasicLinkToFieldsFragmentDoc}
${PageCarLinkToFieldsFragmentDoc}
${PartnerSetFieldsFragmentDoc}
${PartnerFieldsFragmentDoc}
${PageCategoryLinkToFieldsFragmentDoc}
${PageDriverLinkToFieldsFragmentDoc}
${PageHomepageLinkToFieldsFragmentDoc}
${PageRaceSeriesLinkToFieldsFragmentDoc}
${PageRaceEventFieldsFragmentDoc}
${PageRaceEventLinkToFieldsFragmentDoc}
${EventFieldsFragmentDoc}
${PageSearchLinkToFieldsFragmentDoc}
${PageTeamLinkToFieldsFragmentDoc}
${TeamFieldsFragmentDoc}
${ExternalLinkFieldsFragmentDoc}`;

export const useNavigationCollectionQuery = <
      TData = NavigationCollectionQuery,
      TError = unknown
    >(
      variables: NavigationCollectionQueryVariables,
      options?: Omit<UseQueryOptions<NavigationCollectionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<NavigationCollectionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<NavigationCollectionQuery, TError, TData>(
      {
    queryKey: ['NavigationCollection', variables],
    queryFn: customFetcher<NavigationCollectionQuery, NavigationCollectionQueryVariables>(NavigationCollectionDocument, variables),
    ...options
  }
    )};

useNavigationCollectionQuery.getKey = (variables: NavigationCollectionQueryVariables) => ['NavigationCollection', variables];


useNavigationCollectionQuery.fetcher = (variables: NavigationCollectionQueryVariables, options?: RequestInit['headers']) => customFetcher<NavigationCollectionQuery, NavigationCollectionQueryVariables>(NavigationCollectionDocument, variables, options);

export const NavigationDocument = `
    query Navigation($locale: String!, $preview: Boolean!, $id: String!) {
  navigation(id: $id, locale: $locale, preview: $preview) {
    ...NavigationFields
  }
}
    ${NavigationFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}
${PageArticleLinkToFieldsFragmentDoc}
${ContentTagFieldsFragmentDoc}
${PageBasicLinkToFieldsFragmentDoc}
${PageCarLinkToFieldsFragmentDoc}
${PartnerSetFieldsFragmentDoc}
${PartnerFieldsFragmentDoc}
${PageCategoryLinkToFieldsFragmentDoc}
${PageDriverLinkToFieldsFragmentDoc}
${PageHomepageLinkToFieldsFragmentDoc}
${PageRaceSeriesLinkToFieldsFragmentDoc}
${PageRaceEventFieldsFragmentDoc}
${PageRaceEventLinkToFieldsFragmentDoc}
${EventFieldsFragmentDoc}
${PageSearchLinkToFieldsFragmentDoc}
${PageTeamLinkToFieldsFragmentDoc}
${TeamFieldsFragmentDoc}
${ExternalLinkFieldsFragmentDoc}`;

export const useNavigationQuery = <
      TData = NavigationQuery,
      TError = unknown
    >(
      variables: NavigationQueryVariables,
      options?: Omit<UseQueryOptions<NavigationQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<NavigationQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<NavigationQuery, TError, TData>(
      {
    queryKey: ['Navigation', variables],
    queryFn: customFetcher<NavigationQuery, NavigationQueryVariables>(NavigationDocument, variables),
    ...options
  }
    )};

useNavigationQuery.getKey = (variables: NavigationQueryVariables) => ['Navigation', variables];


useNavigationQuery.fetcher = (variables: NavigationQueryVariables, options?: RequestInit['headers']) => customFetcher<NavigationQuery, NavigationQueryVariables>(NavigationDocument, variables, options);
