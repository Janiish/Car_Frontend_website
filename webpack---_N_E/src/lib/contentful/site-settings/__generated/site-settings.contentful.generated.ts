import * as Types from '../../__generated/graphql.types';

import { ComponentReferenceFields_Car_Fragment, ComponentReferenceFields_Car3D_Fragment, ComponentReferenceFields_ComponentProductSlider_1oyzmkwpf3d5_Master_Fragment, ComponentReferenceFields_ContentTag_Fragment, ComponentReferenceFields_Dashboard_Fragment, ComponentReferenceFields_Driver_Fragment, ComponentReferenceFields_Event_Fragment, ComponentReferenceFields_ExternalLink_Fragment, ComponentReferenceFields_Footer_Fragment, ComponentReferenceFields_LanguageSelectorItem_Fragment, ComponentReferenceFields_MainNavigation_Fragment, ComponentReferenceFields_Microcopy_Fragment, ComponentReferenceFields_MicrocopySet_Fragment, ComponentReferenceFields_ModalLink_Fragment, ComponentReferenceFields_Module916VideoImage_Fragment, ComponentReferenceFields_ModuleAccordion_Fragment, ComponentReferenceFields_ModuleAudioPlayer_Fragment, ComponentReferenceFields_ModuleCarTechSpecs_Fragment, ComponentReferenceFields_ModuleCarousel_Fragment, ComponentReferenceFields_ModuleCircuit_Fragment, ComponentReferenceFields_ModuleCookieConsentSettingsWidget_Fragment, ComponentReferenceFields_ModuleDriverList_Fragment, ComponentReferenceFields_ModuleGallery_Fragment, ComponentReferenceFields_ModuleHistoryCarousel_Fragment, ComponentReferenceFields_ModuleIframe_Fragment, ComponentReferenceFields_ModuleImage_Fragment, ComponentReferenceFields_ModuleListenToTheEngine_Fragment, ComponentReferenceFields_ModuleLiveTimingTable_Fragment, ComponentReferenceFields_ModuleMediaFeature_Fragment, ComponentReferenceFields_ModulePageLinkTile_Fragment, ComponentReferenceFields_ModuleQuickLinks_Fragment, ComponentReferenceFields_ModuleQuote_Fragment, ComponentReferenceFields_ModuleRichText_Fragment, ComponentReferenceFields_ModuleSideBySide_Fragment, ComponentReferenceFields_ModuleSpacer_Fragment, ComponentReferenceFields_ModuleSplitLayout_Fragment, ComponentReferenceFields_ModuleTable_Fragment, ComponentReferenceFields_ModuleTitleAndDescription_Fragment, ComponentReferenceFields_ModuleVideo_Fragment, ComponentReferenceFields_Navigation_Fragment, ComponentReferenceFields_NewPageHomepage_Fragment, ComponentReferenceFields_PageArticle_Fragment, ComponentReferenceFields_PageBasic_Fragment, ComponentReferenceFields_PageCar_Fragment, ComponentReferenceFields_PageCategory_Fragment, ComponentReferenceFields_PageDriver_Fragment, ComponentReferenceFields_PageHomepage_Fragment, ComponentReferenceFields_PageRaceEvent_Fragment, ComponentReferenceFields_PageRaceSeries_Fragment, ComponentReferenceFields_PageSearch_Fragment, ComponentReferenceFields_PageTeam_Fragment, ComponentReferenceFields_PartAccordionItem_Fragment, ComponentReferenceFields_PartCarDetailsItem_Fragment, ComponentReferenceFields_PartCircuitHotspot_Fragment, ComponentReferenceFields_PartHistoryCarouselItem_Fragment, ComponentReferenceFields_PartMainNavigationAccordion_Fragment, ComponentReferenceFields_PartMainNavigationItem_Fragment, ComponentReferenceFields_Partner_Fragment, ComponentReferenceFields_PartnerSet_Fragment, ComponentReferenceFields_Products_Fragment, ComponentReferenceFields_Redirect_Fragment, ComponentReferenceFields_Redirects_Fragment, ComponentReferenceFields_SeoMetadata_Fragment, ComponentReferenceFields_Series_Fragment, ComponentReferenceFields_SiteSettings_Fragment, ComponentReferenceFields_Team_Fragment } from '../../__generated/component-map.contentful.generated';
import { ComponentReferenceFieldsFragmentDoc } from '../../__generated/component-map.contentful.generated';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@/lib/contentful/fetch-config';
export type SiteSettingsFieldsFragment = (
  { __typename?: 'SiteSettings', cookieSettingsId?: string | null, seoDefaultMetaTitle?: string | null, seoDefaultMetaDescription?: string | null, seoDefaultOpenGraphImage?: any | null, seoDefaultRobotIndex?: string | null, seoDefaultRobotFollow?: string | null, porscheVisitorBanner?: any | null, privacyShieldConsentUnavailableText?: string | null, privacyShieldHeadline?: string | null, privacyShieldBodyText?: string | null, privacyShieldConsentButtonLabel?: string | null, privacyShieldPrivacyInfoButtonLabel?: string | null, privacyShieldPrivacyInfoButtonUrl?: string | null, privacyShieldBackgroundImage?: { __typename?: 'Asset', url?: string | null } | null }
  & ComponentReferenceFields_SiteSettings_Fragment
);

export type SiteSettingsCollectionQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview: Types.Scalars['Boolean']['input'];
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type SiteSettingsCollectionQuery = { __typename?: 'Query', siteSettingsCollection?: { __typename?: 'SiteSettingsCollection', items: Array<(
      { __typename?: 'SiteSettings' }
      & SiteSettingsFieldsFragment
    ) | null> } | null };

export type SiteSettingsQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview: Types.Scalars['Boolean']['input'];
  id: Types.Scalars['String']['input'];
}>;


export type SiteSettingsQuery = { __typename?: 'Query', siteSettings?: (
    { __typename?: 'SiteSettings' }
    & SiteSettingsFieldsFragment
  ) | null };

export type SiteSettingsWithNotFoundPageModulesQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview: Types.Scalars['Boolean']['input'];
  id: Types.Scalars['String']['input'];
}>;


export type SiteSettingsWithNotFoundPageModulesQuery = { __typename?: 'Query', siteSettings?: (
    { __typename?: 'SiteSettings', notFoundPageModulesCollection?: { __typename: 'SiteSettingsNotFoundPageModulesCollection', items: Array<{ __typename: 'ModuleCarousel', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleGallery', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleImage', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleMediaFeature', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModulePageLinkTile', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleQuote', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleRichText', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleSpacer', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleSplitLayout', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleTable', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleVideo', sys: { __typename?: 'Sys', id: string } } | null> } | null }
    & SiteSettingsFieldsFragment
  ) | null };


export const SiteSettingsFieldsFragmentDoc = `
    fragment SiteSettingsFields on SiteSettings {
  ...ComponentReferenceFields
  cookieSettingsId
  seoDefaultMetaTitle
  seoDefaultMetaDescription
  seoDefaultOpenGraphImage
  seoDefaultRobotIndex
  seoDefaultRobotFollow
  porscheVisitorBanner
  privacyShieldConsentUnavailableText
  privacyShieldHeadline
  privacyShieldBodyText
  privacyShieldConsentButtonLabel
  privacyShieldPrivacyInfoButtonLabel
  privacyShieldPrivacyInfoButtonUrl
  privacyShieldBackgroundImage {
    url
  }
}
    `;
export const SiteSettingsCollectionDocument = `
    query SiteSettingsCollection($locale: String!, $preview: Boolean!, $limit: Int = 1) {
  siteSettingsCollection(locale: $locale, preview: $preview, limit: $limit) {
    items {
      ...SiteSettingsFields
    }
  }
}
    ${SiteSettingsFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}`;

export const useSiteSettingsCollectionQuery = <
      TData = SiteSettingsCollectionQuery,
      TError = unknown
    >(
      variables: SiteSettingsCollectionQueryVariables,
      options?: Omit<UseQueryOptions<SiteSettingsCollectionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<SiteSettingsCollectionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<SiteSettingsCollectionQuery, TError, TData>(
      {
    queryKey: ['SiteSettingsCollection', variables],
    queryFn: customFetcher<SiteSettingsCollectionQuery, SiteSettingsCollectionQueryVariables>(SiteSettingsCollectionDocument, variables),
    ...options
  }
    )};

useSiteSettingsCollectionQuery.getKey = (variables: SiteSettingsCollectionQueryVariables) => ['SiteSettingsCollection', variables];


useSiteSettingsCollectionQuery.fetcher = (variables: SiteSettingsCollectionQueryVariables, options?: RequestInit['headers']) => customFetcher<SiteSettingsCollectionQuery, SiteSettingsCollectionQueryVariables>(SiteSettingsCollectionDocument, variables, options);

export const SiteSettingsDocument = `
    query SiteSettings($locale: String!, $preview: Boolean!, $id: String!) {
  siteSettings(id: $id, locale: $locale, preview: $preview) {
    ...SiteSettingsFields
  }
}
    ${SiteSettingsFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}`;

export const useSiteSettingsQuery = <
      TData = SiteSettingsQuery,
      TError = unknown
    >(
      variables: SiteSettingsQueryVariables,
      options?: Omit<UseQueryOptions<SiteSettingsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<SiteSettingsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<SiteSettingsQuery, TError, TData>(
      {
    queryKey: ['SiteSettings', variables],
    queryFn: customFetcher<SiteSettingsQuery, SiteSettingsQueryVariables>(SiteSettingsDocument, variables),
    ...options
  }
    )};

useSiteSettingsQuery.getKey = (variables: SiteSettingsQueryVariables) => ['SiteSettings', variables];


useSiteSettingsQuery.fetcher = (variables: SiteSettingsQueryVariables, options?: RequestInit['headers']) => customFetcher<SiteSettingsQuery, SiteSettingsQueryVariables>(SiteSettingsDocument, variables, options);

export const SiteSettingsWithNotFoundPageModulesDocument = `
    query SiteSettingsWithNotFoundPageModules($locale: String!, $preview: Boolean!, $id: String!) {
  siteSettings(id: $id, locale: $locale, preview: $preview) {
    ...SiteSettingsFields
    notFoundPageModulesCollection(limit: 20) {
      __typename
      items {
        __typename
        ... on Entry {
          sys {
            id
          }
        }
      }
    }
  }
}
    ${SiteSettingsFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}`;

export const useSiteSettingsWithNotFoundPageModulesQuery = <
      TData = SiteSettingsWithNotFoundPageModulesQuery,
      TError = unknown
    >(
      variables: SiteSettingsWithNotFoundPageModulesQueryVariables,
      options?: Omit<UseQueryOptions<SiteSettingsWithNotFoundPageModulesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<SiteSettingsWithNotFoundPageModulesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<SiteSettingsWithNotFoundPageModulesQuery, TError, TData>(
      {
    queryKey: ['SiteSettingsWithNotFoundPageModules', variables],
    queryFn: customFetcher<SiteSettingsWithNotFoundPageModulesQuery, SiteSettingsWithNotFoundPageModulesQueryVariables>(SiteSettingsWithNotFoundPageModulesDocument, variables),
    ...options
  }
    )};

useSiteSettingsWithNotFoundPageModulesQuery.getKey = (variables: SiteSettingsWithNotFoundPageModulesQueryVariables) => ['SiteSettingsWithNotFoundPageModules', variables];


useSiteSettingsWithNotFoundPageModulesQuery.fetcher = (variables: SiteSettingsWithNotFoundPageModulesQueryVariables, options?: RequestInit['headers']) => customFetcher<SiteSettingsWithNotFoundPageModulesQuery, SiteSettingsWithNotFoundPageModulesQueryVariables>(SiteSettingsWithNotFoundPageModulesDocument, variables, options);
