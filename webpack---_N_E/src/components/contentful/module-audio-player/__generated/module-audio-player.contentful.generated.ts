import * as Types from '../../../../lib/contentful/__generated/graphql.types';

import { ComponentReferenceFields_Car_Fragment, ComponentReferenceFields_Car3D_Fragment, ComponentReferenceFields_ComponentProductSlider_1oyzmkwpf3d5_Master_Fragment, ComponentReferenceFields_ContentTag_Fragment, ComponentReferenceFields_Dashboard_Fragment, ComponentReferenceFields_Driver_Fragment, ComponentReferenceFields_Event_Fragment, ComponentReferenceFields_ExternalLink_Fragment, ComponentReferenceFields_Footer_Fragment, ComponentReferenceFields_LanguageSelectorItem_Fragment, ComponentReferenceFields_MainNavigation_Fragment, ComponentReferenceFields_Microcopy_Fragment, ComponentReferenceFields_MicrocopySet_Fragment, ComponentReferenceFields_ModalLink_Fragment, ComponentReferenceFields_Module916VideoImage_Fragment, ComponentReferenceFields_ModuleAccordion_Fragment, ComponentReferenceFields_ModuleAudioPlayer_Fragment, ComponentReferenceFields_ModuleCarTechSpecs_Fragment, ComponentReferenceFields_ModuleCarousel_Fragment, ComponentReferenceFields_ModuleCircuit_Fragment, ComponentReferenceFields_ModuleCookieConsentSettingsWidget_Fragment, ComponentReferenceFields_ModuleDriverList_Fragment, ComponentReferenceFields_ModuleGallery_Fragment, ComponentReferenceFields_ModuleHistoryCarousel_Fragment, ComponentReferenceFields_ModuleIframe_Fragment, ComponentReferenceFields_ModuleImage_Fragment, ComponentReferenceFields_ModuleListenToTheEngine_Fragment, ComponentReferenceFields_ModuleLiveTimingTable_Fragment, ComponentReferenceFields_ModuleMediaFeature_Fragment, ComponentReferenceFields_ModulePageLinkTile_Fragment, ComponentReferenceFields_ModuleQuickLinks_Fragment, ComponentReferenceFields_ModuleQuote_Fragment, ComponentReferenceFields_ModuleRichText_Fragment, ComponentReferenceFields_ModuleSideBySide_Fragment, ComponentReferenceFields_ModuleSpacer_Fragment, ComponentReferenceFields_ModuleSplitLayout_Fragment, ComponentReferenceFields_ModuleTable_Fragment, ComponentReferenceFields_ModuleTitleAndDescription_Fragment, ComponentReferenceFields_ModuleVideo_Fragment, ComponentReferenceFields_Navigation_Fragment, ComponentReferenceFields_NewPageHomepage_Fragment, ComponentReferenceFields_PageArticle_Fragment, ComponentReferenceFields_PageBasic_Fragment, ComponentReferenceFields_PageCar_Fragment, ComponentReferenceFields_PageCategory_Fragment, ComponentReferenceFields_PageDriver_Fragment, ComponentReferenceFields_PageHomepage_Fragment, ComponentReferenceFields_PageRaceEvent_Fragment, ComponentReferenceFields_PageRaceSeries_Fragment, ComponentReferenceFields_PageSearch_Fragment, ComponentReferenceFields_PageTeam_Fragment, ComponentReferenceFields_PartAccordionItem_Fragment, ComponentReferenceFields_PartCarDetailsItem_Fragment, ComponentReferenceFields_PartCircuitHotspot_Fragment, ComponentReferenceFields_PartHistoryCarouselItem_Fragment, ComponentReferenceFields_PartMainNavigationAccordion_Fragment, ComponentReferenceFields_PartMainNavigationItem_Fragment, ComponentReferenceFields_Partner_Fragment, ComponentReferenceFields_PartnerSet_Fragment, ComponentReferenceFields_Products_Fragment, ComponentReferenceFields_Redirect_Fragment, ComponentReferenceFields_Redirects_Fragment, ComponentReferenceFields_SeoMetadata_Fragment, ComponentReferenceFields_Series_Fragment, ComponentReferenceFields_SiteSettings_Fragment, ComponentReferenceFields_Team_Fragment } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { MicrocopySetFieldsFragment, MicrocopyFieldsFragment } from '../../../../lib/contentful/microcopy/__generated/microcopy-sets.contentful.generated';
import { ComponentReferenceFieldsFragmentDoc } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { MicrocopySetFieldsFragmentDoc, MicrocopyFieldsFragmentDoc } from '../../../../lib/contentful/microcopy/__generated/microcopy-sets.contentful.generated';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@/lib/contentful/fetch-config';
export type ModuleAudioPlayerFieldsFragment = (
  { __typename?: 'ModuleAudioPlayer', aiGenerated?: string | null, title?: string | null, image?: any | null, audioFile?: any | null }
  & ComponentReferenceFields_ModuleAudioPlayer_Fragment
);

export type ModuleAudioPlayerQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  id: Types.Scalars['String']['input'];
}>;


export type ModuleAudioPlayerQuery = { __typename?: 'Query', audioPlayer?: (
    { __typename?: 'ModuleAudioPlayer' }
    & ModuleAudioPlayerFieldsFragment
  ) | null, microcopySetCollection?: { __typename?: 'MicrocopySetCollection', items: Array<(
      { __typename?: 'MicrocopySet' }
      & MicrocopySetFieldsFragment
    ) | null> } | null };


export const ModuleAudioPlayerFieldsFragmentDoc = `
    fragment ModuleAudioPlayerFields on ModuleAudioPlayer {
  ...ComponentReferenceFields
  aiGenerated
  title
  image
  audioFile
}
    `;
export const ModuleAudioPlayerDocument = `
    query ModuleAudioPlayer($locale: String!, $preview: Boolean, $id: String!) {
  audioPlayer: moduleAudioPlayer(id: $id, locale: $locale, preview: $preview) {
    ...ModuleAudioPlayerFields
  }
  microcopySetCollection(
    where: {key_in: "moduleAudioPlayer"}
    locale: $locale
    preview: $preview
    limit: 1
  ) {
    items {
      ...MicrocopySetFields
    }
  }
}
    ${ModuleAudioPlayerFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}
${MicrocopySetFieldsFragmentDoc}
${MicrocopyFieldsFragmentDoc}`;

export const useModuleAudioPlayerQuery = <
      TData = ModuleAudioPlayerQuery,
      TError = unknown
    >(
      variables: ModuleAudioPlayerQueryVariables,
      options?: Omit<UseQueryOptions<ModuleAudioPlayerQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ModuleAudioPlayerQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ModuleAudioPlayerQuery, TError, TData>(
      {
    queryKey: ['ModuleAudioPlayer', variables],
    queryFn: customFetcher<ModuleAudioPlayerQuery, ModuleAudioPlayerQueryVariables>(ModuleAudioPlayerDocument, variables),
    ...options
  }
    )};

useModuleAudioPlayerQuery.getKey = (variables: ModuleAudioPlayerQueryVariables) => ['ModuleAudioPlayer', variables];


useModuleAudioPlayerQuery.fetcher = (variables: ModuleAudioPlayerQueryVariables, options?: RequestInit['headers']) => customFetcher<ModuleAudioPlayerQuery, ModuleAudioPlayerQueryVariables>(ModuleAudioPlayerDocument, variables, options);
