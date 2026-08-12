import * as Types from '../../../../lib/contentful/__generated/graphql.types';

import { ComponentReferenceFields_Car_Fragment, ComponentReferenceFields_Car3D_Fragment, ComponentReferenceFields_ComponentProductSlider_1oyzmkwpf3d5_Master_Fragment, ComponentReferenceFields_ContentTag_Fragment, ComponentReferenceFields_Dashboard_Fragment, ComponentReferenceFields_Driver_Fragment, ComponentReferenceFields_Event_Fragment, ComponentReferenceFields_ExternalLink_Fragment, ComponentReferenceFields_Footer_Fragment, ComponentReferenceFields_LanguageSelectorItem_Fragment, ComponentReferenceFields_MainNavigation_Fragment, ComponentReferenceFields_Microcopy_Fragment, ComponentReferenceFields_MicrocopySet_Fragment, ComponentReferenceFields_ModalLink_Fragment, ComponentReferenceFields_Module916VideoImage_Fragment, ComponentReferenceFields_ModuleAccordion_Fragment, ComponentReferenceFields_ModuleAudioPlayer_Fragment, ComponentReferenceFields_ModuleCarTechSpecs_Fragment, ComponentReferenceFields_ModuleCarousel_Fragment, ComponentReferenceFields_ModuleCircuit_Fragment, ComponentReferenceFields_ModuleCookieConsentSettingsWidget_Fragment, ComponentReferenceFields_ModuleDriverList_Fragment, ComponentReferenceFields_ModuleGallery_Fragment, ComponentReferenceFields_ModuleHistoryCarousel_Fragment, ComponentReferenceFields_ModuleIframe_Fragment, ComponentReferenceFields_ModuleImage_Fragment, ComponentReferenceFields_ModuleListenToTheEngine_Fragment, ComponentReferenceFields_ModuleLiveTimingTable_Fragment, ComponentReferenceFields_ModuleMediaFeature_Fragment, ComponentReferenceFields_ModulePageLinkTile_Fragment, ComponentReferenceFields_ModuleQuickLinks_Fragment, ComponentReferenceFields_ModuleQuote_Fragment, ComponentReferenceFields_ModuleRichText_Fragment, ComponentReferenceFields_ModuleSideBySide_Fragment, ComponentReferenceFields_ModuleSpacer_Fragment, ComponentReferenceFields_ModuleSplitLayout_Fragment, ComponentReferenceFields_ModuleTable_Fragment, ComponentReferenceFields_ModuleTitleAndDescription_Fragment, ComponentReferenceFields_ModuleVideo_Fragment, ComponentReferenceFields_Navigation_Fragment, ComponentReferenceFields_NewPageHomepage_Fragment, ComponentReferenceFields_PageArticle_Fragment, ComponentReferenceFields_PageBasic_Fragment, ComponentReferenceFields_PageCar_Fragment, ComponentReferenceFields_PageCategory_Fragment, ComponentReferenceFields_PageDriver_Fragment, ComponentReferenceFields_PageHomepage_Fragment, ComponentReferenceFields_PageRaceEvent_Fragment, ComponentReferenceFields_PageRaceSeries_Fragment, ComponentReferenceFields_PageSearch_Fragment, ComponentReferenceFields_PageTeam_Fragment, ComponentReferenceFields_PartAccordionItem_Fragment, ComponentReferenceFields_PartCarDetailsItem_Fragment, ComponentReferenceFields_PartCircuitHotspot_Fragment, ComponentReferenceFields_PartHistoryCarouselItem_Fragment, ComponentReferenceFields_PartMainNavigationAccordion_Fragment, ComponentReferenceFields_PartMainNavigationItem_Fragment, ComponentReferenceFields_Partner_Fragment, ComponentReferenceFields_PartnerSet_Fragment, ComponentReferenceFields_Products_Fragment, ComponentReferenceFields_Redirect_Fragment, ComponentReferenceFields_Redirects_Fragment, ComponentReferenceFields_SeoMetadata_Fragment, ComponentReferenceFields_Series_Fragment, ComponentReferenceFields_SiteSettings_Fragment, ComponentReferenceFields_Team_Fragment } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { ModuleAudioPlayerFieldsFragment } from '../../module-audio-player/__generated/module-audio-player.contentful.generated';
import { Module916VideoImageFieldsFragment } from '../../module-916-video-image/__generated/module-916-video-image.contentful.generated';
import { MicrocopySetFieldsFragment, MicrocopyFieldsFragment } from '../../../../lib/contentful/microcopy/__generated/microcopy-sets.contentful.generated';
import { ComponentReferenceFieldsFragmentDoc } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { ModuleAudioPlayerFieldsFragmentDoc } from '../../module-audio-player/__generated/module-audio-player.contentful.generated';
import { Module916VideoImageFieldsFragmentDoc } from '../../module-916-video-image/__generated/module-916-video-image.contentful.generated';
import { MicrocopySetFieldsFragmentDoc, MicrocopyFieldsFragmentDoc } from '../../../../lib/contentful/microcopy/__generated/microcopy-sets.contentful.generated';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@/lib/contentful/fetch-config';
export type ModuleQuoteFieldsFragment = (
  { __typename?: 'ModuleQuote', quote?: string | null, source?: string | null, widget?: (
    { __typename?: 'Module916VideoImage' }
    & Module916VideoImageFieldsFragment
    & ComponentReferenceFields_Module916VideoImage_Fragment
  ) | (
    { __typename?: 'ModuleAudioPlayer' }
    & ModuleAudioPlayerFieldsFragment
    & ComponentReferenceFields_ModuleAudioPlayer_Fragment
  ) | null }
  & ComponentReferenceFields_ModuleQuote_Fragment
);

export type ModuleQuoteQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview: Types.Scalars['Boolean']['input'];
  id: Types.Scalars['String']['input'];
}>;


export type ModuleQuoteQuery = { __typename?: 'Query', moduleQuote?: (
    { __typename?: 'ModuleQuote' }
    & ModuleQuoteFieldsFragment
  ) | null, microcopySetCollection?: { __typename?: 'MicrocopySetCollection', items: Array<(
      { __typename?: 'MicrocopySet' }
      & MicrocopySetFieldsFragment
    ) | null> } | null };


export const ModuleQuoteFieldsFragmentDoc = `
    fragment ModuleQuoteFields on ModuleQuote {
  ...ComponentReferenceFields
  quote
  source
  widget {
    ...ComponentReferenceFields
    ... on ModuleAudioPlayer {
      ...ModuleAudioPlayerFields
    }
    ... on Module916VideoImage {
      ...Module916VideoImageFields
    }
  }
}
    `;
export const ModuleQuoteDocument = `
    query ModuleQuote($locale: String!, $preview: Boolean!, $id: String!) {
  moduleQuote(id: $id, locale: $locale, preview: $preview) {
    ...ModuleQuoteFields
  }
  microcopySetCollection(
    where: {key_in: ["moduleAudioPlayer"]}
    locale: $locale
    preview: $preview
  ) {
    items {
      ...MicrocopySetFields
    }
  }
}
    ${ModuleQuoteFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}
${ModuleAudioPlayerFieldsFragmentDoc}
${Module916VideoImageFieldsFragmentDoc}
${MicrocopySetFieldsFragmentDoc}
${MicrocopyFieldsFragmentDoc}`;

export const useModuleQuoteQuery = <
      TData = ModuleQuoteQuery,
      TError = unknown
    >(
      variables: ModuleQuoteQueryVariables,
      options?: Omit<UseQueryOptions<ModuleQuoteQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ModuleQuoteQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ModuleQuoteQuery, TError, TData>(
      {
    queryKey: ['ModuleQuote', variables],
    queryFn: customFetcher<ModuleQuoteQuery, ModuleQuoteQueryVariables>(ModuleQuoteDocument, variables),
    ...options
  }
    )};

useModuleQuoteQuery.getKey = (variables: ModuleQuoteQueryVariables) => ['ModuleQuote', variables];


useModuleQuoteQuery.fetcher = (variables: ModuleQuoteQueryVariables, options?: RequestInit['headers']) => customFetcher<ModuleQuoteQuery, ModuleQuoteQueryVariables>(ModuleQuoteDocument, variables, options);
