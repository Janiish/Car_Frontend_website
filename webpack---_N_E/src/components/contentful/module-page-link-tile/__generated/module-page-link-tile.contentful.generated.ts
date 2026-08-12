import * as Types from '../../../../lib/contentful/__generated/graphql.types';

import { ComponentReferenceFields_Car_Fragment, ComponentReferenceFields_Car3D_Fragment, ComponentReferenceFields_ComponentProductSlider_1oyzmkwpf3d5_Master_Fragment, ComponentReferenceFields_ContentTag_Fragment, ComponentReferenceFields_Dashboard_Fragment, ComponentReferenceFields_Driver_Fragment, ComponentReferenceFields_Event_Fragment, ComponentReferenceFields_ExternalLink_Fragment, ComponentReferenceFields_Footer_Fragment, ComponentReferenceFields_LanguageSelectorItem_Fragment, ComponentReferenceFields_MainNavigation_Fragment, ComponentReferenceFields_Microcopy_Fragment, ComponentReferenceFields_MicrocopySet_Fragment, ComponentReferenceFields_ModalLink_Fragment, ComponentReferenceFields_Module916VideoImage_Fragment, ComponentReferenceFields_ModuleAccordion_Fragment, ComponentReferenceFields_ModuleAudioPlayer_Fragment, ComponentReferenceFields_ModuleCarTechSpecs_Fragment, ComponentReferenceFields_ModuleCarousel_Fragment, ComponentReferenceFields_ModuleCircuit_Fragment, ComponentReferenceFields_ModuleCookieConsentSettingsWidget_Fragment, ComponentReferenceFields_ModuleDriverList_Fragment, ComponentReferenceFields_ModuleGallery_Fragment, ComponentReferenceFields_ModuleHistoryCarousel_Fragment, ComponentReferenceFields_ModuleIframe_Fragment, ComponentReferenceFields_ModuleImage_Fragment, ComponentReferenceFields_ModuleListenToTheEngine_Fragment, ComponentReferenceFields_ModuleLiveTimingTable_Fragment, ComponentReferenceFields_ModuleMediaFeature_Fragment, ComponentReferenceFields_ModulePageLinkTile_Fragment, ComponentReferenceFields_ModuleQuickLinks_Fragment, ComponentReferenceFields_ModuleQuote_Fragment, ComponentReferenceFields_ModuleRichText_Fragment, ComponentReferenceFields_ModuleSideBySide_Fragment, ComponentReferenceFields_ModuleSpacer_Fragment, ComponentReferenceFields_ModuleSplitLayout_Fragment, ComponentReferenceFields_ModuleTable_Fragment, ComponentReferenceFields_ModuleTitleAndDescription_Fragment, ComponentReferenceFields_ModuleVideo_Fragment, ComponentReferenceFields_Navigation_Fragment, ComponentReferenceFields_NewPageHomepage_Fragment, ComponentReferenceFields_PageArticle_Fragment, ComponentReferenceFields_PageBasic_Fragment, ComponentReferenceFields_PageCar_Fragment, ComponentReferenceFields_PageCategory_Fragment, ComponentReferenceFields_PageDriver_Fragment, ComponentReferenceFields_PageHomepage_Fragment, ComponentReferenceFields_PageRaceEvent_Fragment, ComponentReferenceFields_PageRaceSeries_Fragment, ComponentReferenceFields_PageSearch_Fragment, ComponentReferenceFields_PageTeam_Fragment, ComponentReferenceFields_PartAccordionItem_Fragment, ComponentReferenceFields_PartCarDetailsItem_Fragment, ComponentReferenceFields_PartCircuitHotspot_Fragment, ComponentReferenceFields_PartHistoryCarouselItem_Fragment, ComponentReferenceFields_PartMainNavigationAccordion_Fragment, ComponentReferenceFields_PartMainNavigationItem_Fragment, ComponentReferenceFields_Partner_Fragment, ComponentReferenceFields_PartnerSet_Fragment, ComponentReferenceFields_Products_Fragment, ComponentReferenceFields_Redirect_Fragment, ComponentReferenceFields_Redirects_Fragment, ComponentReferenceFields_SeoMetadata_Fragment, ComponentReferenceFields_Series_Fragment, ComponentReferenceFields_SiteSettings_Fragment, ComponentReferenceFields_Team_Fragment } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { PageArticleLinkToFieldsFragment, PageBasicLinkToFieldsFragment, PageCarLinkToFieldsFragment, PageCategoryLinkToFieldsFragment, PageDriverLinkToFieldsFragment, PageHomepageLinkToFieldsFragment, PageRaceSeriesLinkToFieldsFragment, PageRaceEventLinkToFieldsFragment, PageTeamLinkToFieldsFragment, PageSearchLinkToFieldsFragment, ExternalLinkFieldsFragment, NewPageHomepageLinkToFieldsFragment } from '../../../../lib/contentful/link-fragments/__generated/link-fragments.contentful.generated';
import { ContentTagFieldsFragment } from '../../../../lib/contentful/content-tag/__generated/content-tag.contentful.generated';
import { TeamFieldsFragment } from '../../team/__generated/team.contentful.generated';
import { PartnerSetFieldsFragment, PartnerFieldsFragment } from '../../partner-set/__generated/partner-set.contentful.generated';
import { ComponentReferenceFieldsFragmentDoc } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { PageArticleLinkToFieldsFragmentDoc, PageBasicLinkToFieldsFragmentDoc, PageCarLinkToFieldsFragmentDoc, PageCategoryLinkToFieldsFragmentDoc, PageDriverLinkToFieldsFragmentDoc, PageHomepageLinkToFieldsFragmentDoc, PageRaceSeriesLinkToFieldsFragmentDoc, PageRaceEventLinkToFieldsFragmentDoc, PageTeamLinkToFieldsFragmentDoc, PageSearchLinkToFieldsFragmentDoc, ExternalLinkFieldsFragmentDoc, NewPageHomepageLinkToFieldsFragmentDoc } from '../../../../lib/contentful/link-fragments/__generated/link-fragments.contentful.generated';
import { ContentTagFieldsFragmentDoc } from '../../../../lib/contentful/content-tag/__generated/content-tag.contentful.generated';
import { TeamFieldsFragmentDoc } from '../../team/__generated/team.contentful.generated';
import { PartnerSetFieldsFragmentDoc, PartnerFieldsFragmentDoc } from '../../partner-set/__generated/partner-set.contentful.generated';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@/lib/contentful/fetch-config';
export type ModulePageLinkTileFieldsFragment = (
  { __typename?: 'ModulePageLinkTile', title?: string | null, description?: string | null, pagesCollection?: { __typename?: 'ModulePageLinkTilePagesCollection', items: Array<(
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
      { __typename?: 'PageRaceEvent' }
      & PageRaceEventLinkToFieldsFragment
    ) | (
      { __typename?: 'PageRaceSeries' }
      & PageRaceSeriesLinkToFieldsFragment
    ) | (
      { __typename?: 'PageTeam' }
      & PageTeamLinkToFieldsFragment
    ) | null> } | null }
  & ComponentReferenceFields_ModulePageLinkTile_Fragment
);

export type ModulePageLinkTileQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview: Types.Scalars['Boolean']['input'];
  id: Types.Scalars['String']['input'];
}>;


export type ModulePageLinkTileQuery = { __typename?: 'Query', modulePageLinkTile?: (
    { __typename?: 'ModulePageLinkTile' }
    & ModulePageLinkTileFieldsFragment
  ) | null };


export const ModulePageLinkTileFieldsFragmentDoc = `
    fragment ModulePageLinkTileFields on ModulePageLinkTile {
  ...ComponentReferenceFields
  title
  description
  pagesCollection(limit: 3) {
    items {
      ... on PageArticle {
        ...PageArticleLinkToFields
      }
      ... on PageBasic {
        ...PageBasicLinkToFields
      }
      ... on PageCategory {
        ...PageCategoryLinkToFields
      }
      ... on PageTeam {
        ...PageTeamLinkToFields
      }
      ... on PageCar {
        ...PageCarLinkToFields
      }
      ... on PageDriver {
        ...PageDriverLinkToFields
      }
      ... on PageRaceEvent {
        ...PageRaceEventLinkToFields
      }
      ... on PageRaceSeries {
        ...PageRaceSeriesLinkToFields
      }
    }
  }
}
    `;
export const ModulePageLinkTileDocument = `
    query ModulePageLinkTile($locale: String!, $preview: Boolean!, $id: String!) {
  modulePageLinkTile(id: $id, locale: $locale, preview: $preview) {
    ...ModulePageLinkTileFields
  }
}
    ${ModulePageLinkTileFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}
${PageArticleLinkToFieldsFragmentDoc}
${ContentTagFieldsFragmentDoc}
${PageBasicLinkToFieldsFragmentDoc}
${PageCategoryLinkToFieldsFragmentDoc}
${PageTeamLinkToFieldsFragmentDoc}
${TeamFieldsFragmentDoc}
${PageCarLinkToFieldsFragmentDoc}
${PartnerSetFieldsFragmentDoc}
${PartnerFieldsFragmentDoc}
${PageDriverLinkToFieldsFragmentDoc}
${PageRaceEventLinkToFieldsFragmentDoc}
${PageRaceSeriesLinkToFieldsFragmentDoc}`;

export const useModulePageLinkTileQuery = <
      TData = ModulePageLinkTileQuery,
      TError = unknown
    >(
      variables: ModulePageLinkTileQueryVariables,
      options?: Omit<UseQueryOptions<ModulePageLinkTileQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ModulePageLinkTileQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ModulePageLinkTileQuery, TError, TData>(
      {
    queryKey: ['ModulePageLinkTile', variables],
    queryFn: customFetcher<ModulePageLinkTileQuery, ModulePageLinkTileQueryVariables>(ModulePageLinkTileDocument, variables),
    ...options
  }
    )};

useModulePageLinkTileQuery.getKey = (variables: ModulePageLinkTileQueryVariables) => ['ModulePageLinkTile', variables];


useModulePageLinkTileQuery.fetcher = (variables: ModulePageLinkTileQueryVariables, options?: RequestInit['headers']) => customFetcher<ModulePageLinkTileQuery, ModulePageLinkTileQueryVariables>(ModulePageLinkTileDocument, variables, options);
