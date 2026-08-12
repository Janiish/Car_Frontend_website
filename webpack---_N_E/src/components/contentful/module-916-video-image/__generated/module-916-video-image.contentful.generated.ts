import * as Types from '../../../../lib/contentful/__generated/graphql.types';

import { ComponentReferenceFields_Car_Fragment, ComponentReferenceFields_Car3D_Fragment, ComponentReferenceFields_ComponentProductSlider_1oyzmkwpf3d5_Master_Fragment, ComponentReferenceFields_ContentTag_Fragment, ComponentReferenceFields_Dashboard_Fragment, ComponentReferenceFields_Driver_Fragment, ComponentReferenceFields_Event_Fragment, ComponentReferenceFields_ExternalLink_Fragment, ComponentReferenceFields_Footer_Fragment, ComponentReferenceFields_LanguageSelectorItem_Fragment, ComponentReferenceFields_MainNavigation_Fragment, ComponentReferenceFields_Microcopy_Fragment, ComponentReferenceFields_MicrocopySet_Fragment, ComponentReferenceFields_ModalLink_Fragment, ComponentReferenceFields_Module916VideoImage_Fragment, ComponentReferenceFields_ModuleAccordion_Fragment, ComponentReferenceFields_ModuleAudioPlayer_Fragment, ComponentReferenceFields_ModuleCarTechSpecs_Fragment, ComponentReferenceFields_ModuleCarousel_Fragment, ComponentReferenceFields_ModuleCircuit_Fragment, ComponentReferenceFields_ModuleCookieConsentSettingsWidget_Fragment, ComponentReferenceFields_ModuleDriverList_Fragment, ComponentReferenceFields_ModuleGallery_Fragment, ComponentReferenceFields_ModuleHistoryCarousel_Fragment, ComponentReferenceFields_ModuleIframe_Fragment, ComponentReferenceFields_ModuleImage_Fragment, ComponentReferenceFields_ModuleListenToTheEngine_Fragment, ComponentReferenceFields_ModuleLiveTimingTable_Fragment, ComponentReferenceFields_ModuleMediaFeature_Fragment, ComponentReferenceFields_ModulePageLinkTile_Fragment, ComponentReferenceFields_ModuleQuickLinks_Fragment, ComponentReferenceFields_ModuleQuote_Fragment, ComponentReferenceFields_ModuleRichText_Fragment, ComponentReferenceFields_ModuleSideBySide_Fragment, ComponentReferenceFields_ModuleSpacer_Fragment, ComponentReferenceFields_ModuleSplitLayout_Fragment, ComponentReferenceFields_ModuleTable_Fragment, ComponentReferenceFields_ModuleTitleAndDescription_Fragment, ComponentReferenceFields_ModuleVideo_Fragment, ComponentReferenceFields_Navigation_Fragment, ComponentReferenceFields_NewPageHomepage_Fragment, ComponentReferenceFields_PageArticle_Fragment, ComponentReferenceFields_PageBasic_Fragment, ComponentReferenceFields_PageCar_Fragment, ComponentReferenceFields_PageCategory_Fragment, ComponentReferenceFields_PageDriver_Fragment, ComponentReferenceFields_PageHomepage_Fragment, ComponentReferenceFields_PageRaceEvent_Fragment, ComponentReferenceFields_PageRaceSeries_Fragment, ComponentReferenceFields_PageSearch_Fragment, ComponentReferenceFields_PageTeam_Fragment, ComponentReferenceFields_PartAccordionItem_Fragment, ComponentReferenceFields_PartCarDetailsItem_Fragment, ComponentReferenceFields_PartCircuitHotspot_Fragment, ComponentReferenceFields_PartHistoryCarouselItem_Fragment, ComponentReferenceFields_PartMainNavigationAccordion_Fragment, ComponentReferenceFields_PartMainNavigationItem_Fragment, ComponentReferenceFields_Partner_Fragment, ComponentReferenceFields_PartnerSet_Fragment, ComponentReferenceFields_Products_Fragment, ComponentReferenceFields_Redirect_Fragment, ComponentReferenceFields_Redirects_Fragment, ComponentReferenceFields_SeoMetadata_Fragment, ComponentReferenceFields_Series_Fragment, ComponentReferenceFields_SiteSettings_Fragment, ComponentReferenceFields_Team_Fragment } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { ComponentReferenceFieldsFragmentDoc } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@/lib/contentful/fetch-config';
export type Module916VideoImageFieldsFragment = (
  { __typename?: 'Module916VideoImage', mediaAsset?: any | null, showDownload?: boolean | null }
  & ComponentReferenceFields_Module916VideoImage_Fragment
);

export type Module916VideoImageQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview: Types.Scalars['Boolean']['input'];
  id: Types.Scalars['String']['input'];
}>;


export type Module916VideoImageQuery = { __typename?: 'Query', module916VideoImage?: (
    { __typename?: 'Module916VideoImage' }
    & Module916VideoImageFieldsFragment
  ) | null };


export const Module916VideoImageFieldsFragmentDoc = `
    fragment Module916VideoImageFields on Module916VideoImage {
  ...ComponentReferenceFields
  mediaAsset
  showDownload
}
    `;
export const Module916VideoImageDocument = `
    query Module916VideoImage($locale: String!, $preview: Boolean!, $id: String!) {
  module916VideoImage(id: $id, locale: $locale, preview: $preview) {
    ...Module916VideoImageFields
  }
}
    ${Module916VideoImageFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}`;

export const useModule916VideoImageQuery = <
      TData = Module916VideoImageQuery,
      TError = unknown
    >(
      variables: Module916VideoImageQueryVariables,
      options?: Omit<UseQueryOptions<Module916VideoImageQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Module916VideoImageQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Module916VideoImageQuery, TError, TData>(
      {
    queryKey: ['Module916VideoImage', variables],
    queryFn: customFetcher<Module916VideoImageQuery, Module916VideoImageQueryVariables>(Module916VideoImageDocument, variables),
    ...options
  }
    )};

useModule916VideoImageQuery.getKey = (variables: Module916VideoImageQueryVariables) => ['Module916VideoImage', variables];


useModule916VideoImageQuery.fetcher = (variables: Module916VideoImageQueryVariables, options?: RequestInit['headers']) => customFetcher<Module916VideoImageQuery, Module916VideoImageQueryVariables>(Module916VideoImageDocument, variables, options);
