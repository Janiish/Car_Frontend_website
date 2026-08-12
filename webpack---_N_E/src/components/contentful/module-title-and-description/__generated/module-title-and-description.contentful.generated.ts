import * as Types from '../../../../lib/contentful/__generated/graphql.types';

import { ComponentReferenceFields_Car_Fragment, ComponentReferenceFields_Car3D_Fragment, ComponentReferenceFields_ComponentProductSlider_1oyzmkwpf3d5_Master_Fragment, ComponentReferenceFields_ContentTag_Fragment, ComponentReferenceFields_Dashboard_Fragment, ComponentReferenceFields_Driver_Fragment, ComponentReferenceFields_Event_Fragment, ComponentReferenceFields_ExternalLink_Fragment, ComponentReferenceFields_Footer_Fragment, ComponentReferenceFields_LanguageSelectorItem_Fragment, ComponentReferenceFields_MainNavigation_Fragment, ComponentReferenceFields_Microcopy_Fragment, ComponentReferenceFields_MicrocopySet_Fragment, ComponentReferenceFields_ModalLink_Fragment, ComponentReferenceFields_Module916VideoImage_Fragment, ComponentReferenceFields_ModuleAccordion_Fragment, ComponentReferenceFields_ModuleAudioPlayer_Fragment, ComponentReferenceFields_ModuleCarTechSpecs_Fragment, ComponentReferenceFields_ModuleCarousel_Fragment, ComponentReferenceFields_ModuleCircuit_Fragment, ComponentReferenceFields_ModuleCookieConsentSettingsWidget_Fragment, ComponentReferenceFields_ModuleDriverList_Fragment, ComponentReferenceFields_ModuleGallery_Fragment, ComponentReferenceFields_ModuleHistoryCarousel_Fragment, ComponentReferenceFields_ModuleIframe_Fragment, ComponentReferenceFields_ModuleImage_Fragment, ComponentReferenceFields_ModuleListenToTheEngine_Fragment, ComponentReferenceFields_ModuleLiveTimingTable_Fragment, ComponentReferenceFields_ModuleMediaFeature_Fragment, ComponentReferenceFields_ModulePageLinkTile_Fragment, ComponentReferenceFields_ModuleQuickLinks_Fragment, ComponentReferenceFields_ModuleQuote_Fragment, ComponentReferenceFields_ModuleRichText_Fragment, ComponentReferenceFields_ModuleSideBySide_Fragment, ComponentReferenceFields_ModuleSpacer_Fragment, ComponentReferenceFields_ModuleSplitLayout_Fragment, ComponentReferenceFields_ModuleTable_Fragment, ComponentReferenceFields_ModuleTitleAndDescription_Fragment, ComponentReferenceFields_ModuleVideo_Fragment, ComponentReferenceFields_Navigation_Fragment, ComponentReferenceFields_NewPageHomepage_Fragment, ComponentReferenceFields_PageArticle_Fragment, ComponentReferenceFields_PageBasic_Fragment, ComponentReferenceFields_PageCar_Fragment, ComponentReferenceFields_PageCategory_Fragment, ComponentReferenceFields_PageDriver_Fragment, ComponentReferenceFields_PageHomepage_Fragment, ComponentReferenceFields_PageRaceEvent_Fragment, ComponentReferenceFields_PageRaceSeries_Fragment, ComponentReferenceFields_PageSearch_Fragment, ComponentReferenceFields_PageTeam_Fragment, ComponentReferenceFields_PartAccordionItem_Fragment, ComponentReferenceFields_PartCarDetailsItem_Fragment, ComponentReferenceFields_PartCircuitHotspot_Fragment, ComponentReferenceFields_PartHistoryCarouselItem_Fragment, ComponentReferenceFields_PartMainNavigationAccordion_Fragment, ComponentReferenceFields_PartMainNavigationItem_Fragment, ComponentReferenceFields_Partner_Fragment, ComponentReferenceFields_PartnerSet_Fragment, ComponentReferenceFields_Products_Fragment, ComponentReferenceFields_Redirect_Fragment, ComponentReferenceFields_Redirects_Fragment, ComponentReferenceFields_SeoMetadata_Fragment, ComponentReferenceFields_Series_Fragment, ComponentReferenceFields_SiteSettings_Fragment, ComponentReferenceFields_Team_Fragment } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { ModuleAudioPlayerFieldsFragment } from '../../module-audio-player/__generated/module-audio-player.contentful.generated';
import { Module916VideoImageFieldsFragment } from '../../module-916-video-image/__generated/module-916-video-image.contentful.generated';
import { ExternalLinkFieldsFragment, PageArticleLinkToFieldsFragment, PageBasicLinkToFieldsFragment, PageCarLinkToFieldsFragment, PageCategoryLinkToFieldsFragment, PageDriverLinkToFieldsFragment, PageHomepageLinkToFieldsFragment, PageRaceSeriesLinkToFieldsFragment, PageRaceEventLinkToFieldsFragment, PageTeamLinkToFieldsFragment, PageSearchLinkToFieldsFragment } from '../../../../lib/contentful/link-fragments/__generated/link-fragments.contentful.generated';
import { ComponentReferenceFieldsFragmentDoc } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { ModuleAudioPlayerFieldsFragmentDoc } from '../../module-audio-player/__generated/module-audio-player.contentful.generated';
import { Module916VideoImageFieldsFragmentDoc } from '../../module-916-video-image/__generated/module-916-video-image.contentful.generated';
import { ExternalLinkFieldsFragmentDoc, PageArticleLinkToFieldsFragmentDoc, PageBasicLinkToFieldsFragmentDoc, PageCarLinkToFieldsFragmentDoc, PageCategoryLinkToFieldsFragmentDoc, PageDriverLinkToFieldsFragmentDoc, PageHomepageLinkToFieldsFragmentDoc, PageRaceSeriesLinkToFieldsFragmentDoc, PageRaceEventLinkToFieldsFragmentDoc, PageTeamLinkToFieldsFragmentDoc, PageSearchLinkToFieldsFragmentDoc } from '../../../../lib/contentful/link-fragments/__generated/link-fragments.contentful.generated';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@/lib/contentful/fetch-config';
export type ModuleTitleAndDescriptionFieldsFragment = (
  { __typename?: 'ModuleTitleAndDescription', title?: string | null, description?: string | null, linkLabel?: string | null, widget?: (
    { __typename?: 'Module916VideoImage' }
    & Module916VideoImageFieldsFragment
    & ComponentReferenceFields_Module916VideoImage_Fragment
  ) | (
    { __typename?: 'ModuleAudioPlayer' }
    & ModuleAudioPlayerFieldsFragment
    & ComponentReferenceFields_ModuleAudioPlayer_Fragment
  ) | null, link?: (
    { __typename?: 'ExternalLink' }
    & ExternalLinkFieldsFragment
    & ComponentReferenceFields_ExternalLink_Fragment
  ) | (
    { __typename?: 'PageArticle', title?: string | null, linkTitle?: string | null, slug?: string | null }
    & ComponentReferenceFields_PageArticle_Fragment
    & ComponentReferenceFields_PageArticle_Fragment
  ) | (
    { __typename?: 'PageBasic', title?: string | null, linkTitle?: string | null, slug?: string | null }
    & ComponentReferenceFields_PageBasic_Fragment
    & ComponentReferenceFields_PageBasic_Fragment
  ) | (
    { __typename?: 'PageCar', title?: string | null, linkTitle?: string | null, slug?: string | null }
    & ComponentReferenceFields_PageCar_Fragment
    & ComponentReferenceFields_PageCar_Fragment
  ) | (
    { __typename?: 'PageCategory', title?: string | null, linkTitle?: string | null, mainCategory?: string | null }
    & ComponentReferenceFields_PageCategory_Fragment
    & ComponentReferenceFields_PageCategory_Fragment
  ) | (
    { __typename?: 'PageDriver', title?: string | null, linkTitle?: string | null, slug?: string | null }
    & ComponentReferenceFields_PageDriver_Fragment
    & ComponentReferenceFields_PageDriver_Fragment
  ) | (
    { __typename?: 'PageRaceEvent', title?: string | null, subtitle?: string | null, slug?: string | null }
    & ComponentReferenceFields_PageRaceEvent_Fragment
    & ComponentReferenceFields_PageRaceEvent_Fragment
  ) | (
    { __typename?: 'PageTeam', title?: string | null, linkTitle?: string | null, slug?: string | null }
    & ComponentReferenceFields_PageTeam_Fragment
    & ComponentReferenceFields_PageTeam_Fragment
  ) | null }
  & ComponentReferenceFields_ModuleTitleAndDescription_Fragment
);

export type ModuleTitleAndDescriptionQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview: Types.Scalars['Boolean']['input'];
  id: Types.Scalars['String']['input'];
}>;


export type ModuleTitleAndDescriptionQuery = { __typename?: 'Query', moduleTitleAndDescription?: (
    { __typename?: 'ModuleTitleAndDescription' }
    & ModuleTitleAndDescriptionFieldsFragment
  ) | null };


export const ModuleTitleAndDescriptionFieldsFragmentDoc = `
    fragment ModuleTitleAndDescriptionFields on ModuleTitleAndDescription {
  ...ComponentReferenceFields
  title
  description
  widget {
    ...ComponentReferenceFields
    ... on ModuleAudioPlayer {
      ...ModuleAudioPlayerFields
    }
    ... on Module916VideoImage {
      ...Module916VideoImageFields
    }
  }
  linkLabel
  link {
    ...ComponentReferenceFields
    ... on ExternalLink {
      ...ExternalLinkFields
    }
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
    ... on PageRaceEvent {
      ...ComponentReferenceFields
      title
      subtitle
      slug
    }
    ... on PageTeam {
      ...ComponentReferenceFields
      title
      linkTitle
      slug
    }
  }
}
    `;
export const ModuleTitleAndDescriptionDocument = `
    query ModuleTitleAndDescription($locale: String!, $preview: Boolean!, $id: String!) {
  moduleTitleAndDescription(id: $id, locale: $locale, preview: $preview) {
    ...ModuleTitleAndDescriptionFields
  }
}
    ${ModuleTitleAndDescriptionFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}
${ModuleAudioPlayerFieldsFragmentDoc}
${Module916VideoImageFieldsFragmentDoc}
${ExternalLinkFieldsFragmentDoc}`;

export const useModuleTitleAndDescriptionQuery = <
      TData = ModuleTitleAndDescriptionQuery,
      TError = unknown
    >(
      variables: ModuleTitleAndDescriptionQueryVariables,
      options?: Omit<UseQueryOptions<ModuleTitleAndDescriptionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ModuleTitleAndDescriptionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ModuleTitleAndDescriptionQuery, TError, TData>(
      {
    queryKey: ['ModuleTitleAndDescription', variables],
    queryFn: customFetcher<ModuleTitleAndDescriptionQuery, ModuleTitleAndDescriptionQueryVariables>(ModuleTitleAndDescriptionDocument, variables),
    ...options
  }
    )};

useModuleTitleAndDescriptionQuery.getKey = (variables: ModuleTitleAndDescriptionQueryVariables) => ['ModuleTitleAndDescription', variables];


useModuleTitleAndDescriptionQuery.fetcher = (variables: ModuleTitleAndDescriptionQueryVariables, options?: RequestInit['headers']) => customFetcher<ModuleTitleAndDescriptionQuery, ModuleTitleAndDescriptionQueryVariables>(ModuleTitleAndDescriptionDocument, variables, options);
