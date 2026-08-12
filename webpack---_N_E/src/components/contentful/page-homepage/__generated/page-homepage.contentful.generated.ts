import * as Types from '../../../../lib/contentful/__generated/graphql.types';

import { PageHomepageLinkToFieldsFragment } from '../../../../lib/contentful/link-fragments/__generated/link-fragments.contentful.generated';
import { ComponentReferenceFields_Car_Fragment, ComponentReferenceFields_Car3D_Fragment, ComponentReferenceFields_ComponentProductSlider_1oyzmkwpf3d5_Master_Fragment, ComponentReferenceFields_ContentTag_Fragment, ComponentReferenceFields_Dashboard_Fragment, ComponentReferenceFields_Driver_Fragment, ComponentReferenceFields_Event_Fragment, ComponentReferenceFields_ExternalLink_Fragment, ComponentReferenceFields_Footer_Fragment, ComponentReferenceFields_LanguageSelectorItem_Fragment, ComponentReferenceFields_MainNavigation_Fragment, ComponentReferenceFields_Microcopy_Fragment, ComponentReferenceFields_MicrocopySet_Fragment, ComponentReferenceFields_ModalLink_Fragment, ComponentReferenceFields_Module916VideoImage_Fragment, ComponentReferenceFields_ModuleAccordion_Fragment, ComponentReferenceFields_ModuleAudioPlayer_Fragment, ComponentReferenceFields_ModuleCarTechSpecs_Fragment, ComponentReferenceFields_ModuleCarousel_Fragment, ComponentReferenceFields_ModuleCircuit_Fragment, ComponentReferenceFields_ModuleCookieConsentSettingsWidget_Fragment, ComponentReferenceFields_ModuleDriverList_Fragment, ComponentReferenceFields_ModuleGallery_Fragment, ComponentReferenceFields_ModuleHistoryCarousel_Fragment, ComponentReferenceFields_ModuleIframe_Fragment, ComponentReferenceFields_ModuleImage_Fragment, ComponentReferenceFields_ModuleListenToTheEngine_Fragment, ComponentReferenceFields_ModuleLiveTimingTable_Fragment, ComponentReferenceFields_ModuleMediaFeature_Fragment, ComponentReferenceFields_ModulePageLinkTile_Fragment, ComponentReferenceFields_ModuleQuickLinks_Fragment, ComponentReferenceFields_ModuleQuote_Fragment, ComponentReferenceFields_ModuleRichText_Fragment, ComponentReferenceFields_ModuleSideBySide_Fragment, ComponentReferenceFields_ModuleSpacer_Fragment, ComponentReferenceFields_ModuleSplitLayout_Fragment, ComponentReferenceFields_ModuleTable_Fragment, ComponentReferenceFields_ModuleTitleAndDescription_Fragment, ComponentReferenceFields_ModuleVideo_Fragment, ComponentReferenceFields_Navigation_Fragment, ComponentReferenceFields_NewPageHomepage_Fragment, ComponentReferenceFields_PageArticle_Fragment, ComponentReferenceFields_PageBasic_Fragment, ComponentReferenceFields_PageCar_Fragment, ComponentReferenceFields_PageCategory_Fragment, ComponentReferenceFields_PageDriver_Fragment, ComponentReferenceFields_PageHomepage_Fragment, ComponentReferenceFields_PageRaceEvent_Fragment, ComponentReferenceFields_PageRaceSeries_Fragment, ComponentReferenceFields_PageSearch_Fragment, ComponentReferenceFields_PageTeam_Fragment, ComponentReferenceFields_PartAccordionItem_Fragment, ComponentReferenceFields_PartCarDetailsItem_Fragment, ComponentReferenceFields_PartCircuitHotspot_Fragment, ComponentReferenceFields_PartHistoryCarouselItem_Fragment, ComponentReferenceFields_PartMainNavigationAccordion_Fragment, ComponentReferenceFields_PartMainNavigationItem_Fragment, ComponentReferenceFields_Partner_Fragment, ComponentReferenceFields_PartnerSet_Fragment, ComponentReferenceFields_Products_Fragment, ComponentReferenceFields_Redirect_Fragment, ComponentReferenceFields_Redirects_Fragment, ComponentReferenceFields_SeoMetadata_Fragment, ComponentReferenceFields_Series_Fragment, ComponentReferenceFields_SiteSettings_Fragment, ComponentReferenceFields_Team_Fragment } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { PartnerSetFieldsFragment, PartnerFieldsFragment } from '../../partner-set/__generated/partner-set.contentful.generated';
import { PageHomepageLinkToFieldsFragmentDoc } from '../../../../lib/contentful/link-fragments/__generated/link-fragments.contentful.generated';
import { ComponentReferenceFieldsFragmentDoc } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { PartnerSetFieldsFragmentDoc, PartnerFieldsFragmentDoc } from '../../partner-set/__generated/partner-set.contentful.generated';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@/lib/contentful/fetch-config';
export type PageHomepageFieldsFragment = (
  { __typename?: 'PageHomepage', aiGenerated?: string | null, linkLabel?: string | null, introductionCaption?: string | null, introduction?: string | null, introHeading?: string | null, introColumn1?: string | null, introColumn2?: string | null, seoMetaDescription?: string | null, robotFollow?: string | null, robotIndex?: string | null, link?: (
    { __typename?: 'PageArticle', title?: string | null, linkTitle?: string | null, slug?: string | null }
    & ComponentReferenceFields_PageArticle_Fragment
  ) | (
    { __typename?: 'PageBasic', title?: string | null, linkTitle?: string | null, slug?: string | null }
    & ComponentReferenceFields_PageBasic_Fragment
  ) | (
    { __typename?: 'PageCar', title?: string | null, linkTitle?: string | null, slug?: string | null }
    & ComponentReferenceFields_PageCar_Fragment
  ) | (
    { __typename?: 'PageCategory', title?: string | null, linkTitle?: string | null, mainCategory?: string | null }
    & ComponentReferenceFields_PageCategory_Fragment
  ) | (
    { __typename?: 'PageDriver', title?: string | null, linkTitle?: string | null, slug?: string | null }
    & ComponentReferenceFields_PageDriver_Fragment
  ) | (
    { __typename?: 'PageHomepage', title?: string | null, linkTitle?: string | null }
    & ComponentReferenceFields_PageHomepage_Fragment
  ) | (
    { __typename?: 'PageRaceEvent', title?: string | null, linkTitle?: string | null, slug?: string | null }
    & ComponentReferenceFields_PageRaceEvent_Fragment
  ) | (
    { __typename?: 'PageRaceSeries', title?: string | null, linkTitle?: string | null, slug?: string | null }
    & ComponentReferenceFields_PageRaceSeries_Fragment
  ) | (
    { __typename?: 'PageSearch', title?: string | null, linkTitle?: string | null }
    & ComponentReferenceFields_PageSearch_Fragment
  ) | (
    { __typename?: 'PageTeam', title?: string | null, linkTitle?: string | null, slug?: string | null }
    & ComponentReferenceFields_PageTeam_Fragment
  ) | null, modulesCollection?: { __typename: 'PageHomepageModulesCollection', items: Array<{ __typename: 'ModuleAccordion', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleAudioPlayer', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleCarTechSpecs', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleCarousel', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleCircuit', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleDriverList', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleGallery', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleIframe', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleImage', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleListenToTheEngine', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleLiveTimingTable', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleMediaFeature', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModulePageLinkTile', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleQuickLinks', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleQuote', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleRichText', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleSideBySide', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleSpacer', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleSplitLayout', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleTable', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleTitleAndDescription', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleVideo', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Team', sys: { __typename?: 'Sys', id: string } } | null> } | null, partnerSet?: (
    { __typename?: 'PartnerSet' }
    & PartnerSetFieldsFragment
  ) | null }
  & PageHomepageLinkToFieldsFragment
);

export type PageHomepageCollectionQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type PageHomepageCollectionQuery = { __typename?: 'Query', pageHomepageCollection?: { __typename?: 'PageHomepageCollection', items: Array<(
      { __typename?: 'PageHomepage' }
      & PageHomepageFieldsFragment
    ) | null> } | null };

export type PageHomepageQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  id: Types.Scalars['String']['input'];
}>;


export type PageHomepageQuery = { __typename?: 'Query', page?: (
    { __typename?: 'PageHomepage' }
    & PageHomepageFieldsFragment
  ) | null };


export const PageHomepageFieldsFragmentDoc = `
    fragment PageHomepageFields on PageHomepage {
  ...PageHomepageLinkToFields
  aiGenerated
  linkLabel
  link {
    ... on PageArticle {
      ...ComponentReferenceFields
      title
      linkTitle
      slug
    }
    ... on PageBasic {
      ...ComponentReferenceFields
      title
      linkTitle
      slug
    }
    ... on PageCar {
      ...ComponentReferenceFields
      title
      linkTitle
      slug
    }
    ... on PageCategory {
      ...ComponentReferenceFields
      title
      linkTitle
      mainCategory
    }
    ... on PageDriver {
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
    ... on PageRaceSeries {
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
    ... on PageSearch {
      ...ComponentReferenceFields
      title
      linkTitle
    }
    ... on PageTeam {
      ...ComponentReferenceFields
      title
      linkTitle
      slug
    }
  }
  introductionCaption
  introduction
  introHeading
  introColumn1
  introColumn2
  modulesCollection(limit: 20) {
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
  partnerSet {
    ...PartnerSetFields
  }
  seoMetaDescription
  robotFollow
  robotIndex
}
    `;
export const PageHomepageCollectionDocument = `
    query PageHomepageCollection($locale: String!, $preview: Boolean) {
  pageHomepageCollection(
    limit: 1
    locale: $locale
    preview: $preview
    where: {title_exists: true}
  ) {
    items {
      ...PageHomepageFields
    }
  }
}
    ${PageHomepageFieldsFragmentDoc}
${PageHomepageLinkToFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}
${PartnerSetFieldsFragmentDoc}
${PartnerFieldsFragmentDoc}`;

export const usePageHomepageCollectionQuery = <
      TData = PageHomepageCollectionQuery,
      TError = unknown
    >(
      variables: PageHomepageCollectionQueryVariables,
      options?: Omit<UseQueryOptions<PageHomepageCollectionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<PageHomepageCollectionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<PageHomepageCollectionQuery, TError, TData>(
      {
    queryKey: ['PageHomepageCollection', variables],
    queryFn: customFetcher<PageHomepageCollectionQuery, PageHomepageCollectionQueryVariables>(PageHomepageCollectionDocument, variables),
    ...options
  }
    )};

usePageHomepageCollectionQuery.getKey = (variables: PageHomepageCollectionQueryVariables) => ['PageHomepageCollection', variables];


usePageHomepageCollectionQuery.fetcher = (variables: PageHomepageCollectionQueryVariables, options?: RequestInit['headers']) => customFetcher<PageHomepageCollectionQuery, PageHomepageCollectionQueryVariables>(PageHomepageCollectionDocument, variables, options);

export const PageHomepageDocument = `
    query PageHomepage($locale: String!, $preview: Boolean, $id: String!) {
  page: pageHomepage(id: $id, locale: $locale, preview: $preview) {
    ...PageHomepageFields
  }
}
    ${PageHomepageFieldsFragmentDoc}
${PageHomepageLinkToFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}
${PartnerSetFieldsFragmentDoc}
${PartnerFieldsFragmentDoc}`;

export const usePageHomepageQuery = <
      TData = PageHomepageQuery,
      TError = unknown
    >(
      variables: PageHomepageQueryVariables,
      options?: Omit<UseQueryOptions<PageHomepageQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<PageHomepageQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<PageHomepageQuery, TError, TData>(
      {
    queryKey: ['PageHomepage', variables],
    queryFn: customFetcher<PageHomepageQuery, PageHomepageQueryVariables>(PageHomepageDocument, variables),
    ...options
  }
    )};

usePageHomepageQuery.getKey = (variables: PageHomepageQueryVariables) => ['PageHomepage', variables];


usePageHomepageQuery.fetcher = (variables: PageHomepageQueryVariables, options?: RequestInit['headers']) => customFetcher<PageHomepageQuery, PageHomepageQueryVariables>(PageHomepageDocument, variables, options);
