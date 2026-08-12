import * as Types from '../../../../lib/contentful/__generated/graphql.types';

import { ComponentReferenceFields_Car_Fragment, ComponentReferenceFields_Car3D_Fragment, ComponentReferenceFields_ComponentProductSlider_1oyzmkwpf3d5_Master_Fragment, ComponentReferenceFields_ContentTag_Fragment, ComponentReferenceFields_Dashboard_Fragment, ComponentReferenceFields_Driver_Fragment, ComponentReferenceFields_Event_Fragment, ComponentReferenceFields_ExternalLink_Fragment, ComponentReferenceFields_Footer_Fragment, ComponentReferenceFields_LanguageSelectorItem_Fragment, ComponentReferenceFields_MainNavigation_Fragment, ComponentReferenceFields_Microcopy_Fragment, ComponentReferenceFields_MicrocopySet_Fragment, ComponentReferenceFields_ModalLink_Fragment, ComponentReferenceFields_Module916VideoImage_Fragment, ComponentReferenceFields_ModuleAccordion_Fragment, ComponentReferenceFields_ModuleAudioPlayer_Fragment, ComponentReferenceFields_ModuleCarTechSpecs_Fragment, ComponentReferenceFields_ModuleCarousel_Fragment, ComponentReferenceFields_ModuleCircuit_Fragment, ComponentReferenceFields_ModuleCookieConsentSettingsWidget_Fragment, ComponentReferenceFields_ModuleDriverList_Fragment, ComponentReferenceFields_ModuleGallery_Fragment, ComponentReferenceFields_ModuleHistoryCarousel_Fragment, ComponentReferenceFields_ModuleIframe_Fragment, ComponentReferenceFields_ModuleImage_Fragment, ComponentReferenceFields_ModuleListenToTheEngine_Fragment, ComponentReferenceFields_ModuleLiveTimingTable_Fragment, ComponentReferenceFields_ModuleMediaFeature_Fragment, ComponentReferenceFields_ModulePageLinkTile_Fragment, ComponentReferenceFields_ModuleQuickLinks_Fragment, ComponentReferenceFields_ModuleQuote_Fragment, ComponentReferenceFields_ModuleRichText_Fragment, ComponentReferenceFields_ModuleSideBySide_Fragment, ComponentReferenceFields_ModuleSpacer_Fragment, ComponentReferenceFields_ModuleSplitLayout_Fragment, ComponentReferenceFields_ModuleTable_Fragment, ComponentReferenceFields_ModuleTitleAndDescription_Fragment, ComponentReferenceFields_ModuleVideo_Fragment, ComponentReferenceFields_Navigation_Fragment, ComponentReferenceFields_NewPageHomepage_Fragment, ComponentReferenceFields_PageArticle_Fragment, ComponentReferenceFields_PageBasic_Fragment, ComponentReferenceFields_PageCar_Fragment, ComponentReferenceFields_PageCategory_Fragment, ComponentReferenceFields_PageDriver_Fragment, ComponentReferenceFields_PageHomepage_Fragment, ComponentReferenceFields_PageRaceEvent_Fragment, ComponentReferenceFields_PageRaceSeries_Fragment, ComponentReferenceFields_PageSearch_Fragment, ComponentReferenceFields_PageTeam_Fragment, ComponentReferenceFields_PartAccordionItem_Fragment, ComponentReferenceFields_PartCarDetailsItem_Fragment, ComponentReferenceFields_PartCircuitHotspot_Fragment, ComponentReferenceFields_PartHistoryCarouselItem_Fragment, ComponentReferenceFields_PartMainNavigationAccordion_Fragment, ComponentReferenceFields_PartMainNavigationItem_Fragment, ComponentReferenceFields_Partner_Fragment, ComponentReferenceFields_PartnerSet_Fragment, ComponentReferenceFields_Products_Fragment, ComponentReferenceFields_Redirect_Fragment, ComponentReferenceFields_Redirects_Fragment, ComponentReferenceFields_SeoMetadata_Fragment, ComponentReferenceFields_Series_Fragment, ComponentReferenceFields_SiteSettings_Fragment, ComponentReferenceFields_Team_Fragment } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { ContentTagFieldsFragment } from '../../../../lib/contentful/content-tag/__generated/content-tag.contentful.generated';
import { PageArticleLinkToFieldsFragment, PageBasicLinkToFieldsFragment, PageCarLinkToFieldsFragment, PageCategoryLinkToFieldsFragment, PageDriverLinkToFieldsFragment, PageHomepageLinkToFieldsFragment, PageRaceSeriesLinkToFieldsFragment, PageRaceEventLinkToFieldsFragment, PageTeamLinkToFieldsFragment, PageSearchLinkToFieldsFragment, ExternalLinkFieldsFragment, NewPageHomepageLinkToFieldsFragment } from '../../../../lib/contentful/link-fragments/__generated/link-fragments.contentful.generated';
import { CarFieldsFragment, PartCarDetailItemFieldsFragment } from '../../car/__generated/car.contentful.generated';
import { PartnerSetFieldsFragment, PartnerFieldsFragment } from '../../partner-set/__generated/partner-set.contentful.generated';
import { ModuleHistoryCarouselFieldsFragment, PartHistoryCarouselItemFieldsFragment } from '../../module-history-carousel/__generated/module-history-carousel.contentful.generated';
import { ModuleImageFieldsFragment } from '../../module-image/__generated/module-image.contentful.generated';
import { TeamFieldsFragment } from '../../team/__generated/team.contentful.generated';
import { ComponentReferenceFieldsFragmentDoc } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { ContentTagFieldsFragmentDoc } from '../../../../lib/contentful/content-tag/__generated/content-tag.contentful.generated';
import { PageArticleLinkToFieldsFragmentDoc, PageBasicLinkToFieldsFragmentDoc, PageCarLinkToFieldsFragmentDoc, PageCategoryLinkToFieldsFragmentDoc, PageDriverLinkToFieldsFragmentDoc, PageHomepageLinkToFieldsFragmentDoc, PageRaceSeriesLinkToFieldsFragmentDoc, PageRaceEventLinkToFieldsFragmentDoc, PageTeamLinkToFieldsFragmentDoc, PageSearchLinkToFieldsFragmentDoc, ExternalLinkFieldsFragmentDoc, NewPageHomepageLinkToFieldsFragmentDoc } from '../../../../lib/contentful/link-fragments/__generated/link-fragments.contentful.generated';
import { CarFieldsFragmentDoc, PartCarDetailItemFieldsFragmentDoc } from '../../car/__generated/car.contentful.generated';
import { PartnerSetFieldsFragmentDoc, PartnerFieldsFragmentDoc } from '../../partner-set/__generated/partner-set.contentful.generated';
import { ModuleHistoryCarouselFieldsFragmentDoc, PartHistoryCarouselItemFieldsFragmentDoc } from '../../module-history-carousel/__generated/module-history-carousel.contentful.generated';
import { ModuleImageFieldsFragmentDoc } from '../../module-image/__generated/module-image.contentful.generated';
import { TeamFieldsFragmentDoc } from '../../team/__generated/team.contentful.generated';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@/lib/contentful/fetch-config';
export type DashboardCarSeriesFieldsFragment = (
  { __typename?: 'Series', name?: string | null, theme?: string | null, description?: string | null, linkedFrom?: { __typename?: 'SeriesLinkingCollections', pageRaceSeriesCollection?: { __typename?: 'PageRaceSeriesCollection', items: Array<(
        { __typename?: 'PageRaceSeries', slug?: string | null, sys: { __typename?: 'Sys', locale?: string | null } }
        & ComponentReferenceFields_PageRaceSeries_Fragment
      ) | null> } | null } | null }
  & ComponentReferenceFields_Series_Fragment
);

export type DashboardCarContentTagWithArticleFieldsFragment = (
  { __typename?: 'ContentTag', linkedFrom?: { __typename?: 'ContentTagLinkingCollections', pageArticleCollection?: { __typename?: 'PageArticleCollection', items: Array<(
        { __typename?: 'PageArticle' }
        & PageArticleLinkToFieldsFragment
      ) | null> } | null } | null }
  & ContentTagFieldsFragment
);

export type DashboardCar3dFieldsFragment = { __typename?: 'Car3D', internalName?: string | null, displayName?: string | null, theme?: string | null, dashboardWidgetLauncherThumbnail?: any | null, dashboardWidgetLauncherLabel?: string | null, dashboardAsset?: any | null, sys: { __typename?: 'Sys', id: string }, car?: (
    { __typename?: 'Car', linkedFrom?: { __typename?: 'CarLinkingCollections', pageCarCollection?: { __typename?: 'PageCarCollection', items: Array<(
          { __typename?: 'PageCar', slug?: string | null }
          & ComponentReferenceFields_PageCar_Fragment
        ) | null> } | null } | null, seriesCollection?: { __typename?: 'CarSeriesCollection', items: Array<(
        { __typename?: 'Series' }
        & DashboardCarSeriesFieldsFragment
      ) | null> } | null, tagsCollection?: { __typename?: 'CarTagsCollection', items: Array<(
        { __typename?: 'ContentTag' }
        & DashboardCarContentTagWithArticleFieldsFragment
      ) | null> } | null }
    & CarFieldsFragment
  ) | { __typename?: 'Car3D' } | { __typename?: 'ComponentProductSlider_1oyzmkwpf3d5_Master' } | { __typename?: 'ContentTag' } | { __typename?: 'Dashboard' } | { __typename?: 'Driver' } | { __typename?: 'Event' } | { __typename?: 'ExternalLink' } | { __typename?: 'Footer' } | { __typename?: 'LanguageSelectorItem' } | { __typename?: 'MainNavigation' } | { __typename?: 'Microcopy' } | { __typename?: 'MicrocopySet' } | { __typename?: 'ModalLink' } | { __typename?: 'Module916VideoImage' } | { __typename?: 'ModuleAccordion' } | { __typename?: 'ModuleAudioPlayer' } | { __typename?: 'ModuleCarTechSpecs' } | { __typename?: 'ModuleCarousel' } | { __typename?: 'ModuleCircuit' } | { __typename?: 'ModuleCookieConsentSettingsWidget' } | { __typename?: 'ModuleDriverList' } | { __typename?: 'ModuleGallery' } | { __typename?: 'ModuleHistoryCarousel' } | { __typename?: 'ModuleIframe' } | { __typename?: 'ModuleImage' } | { __typename?: 'ModuleListenToTheEngine' } | { __typename?: 'ModuleLiveTimingTable' } | { __typename?: 'ModuleMediaFeature' } | { __typename?: 'ModulePageLinkTile' } | { __typename?: 'ModuleQuickLinks' } | { __typename?: 'ModuleQuote' } | { __typename?: 'ModuleRichText' } | { __typename?: 'ModuleSideBySide' } | { __typename?: 'ModuleSpacer' } | { __typename?: 'ModuleSplitLayout' } | { __typename?: 'ModuleTable' } | { __typename?: 'ModuleTitleAndDescription' } | { __typename?: 'ModuleVideo' } | { __typename?: 'Navigation' } | { __typename?: 'NewPageHomepage' } | { __typename?: 'PageArticle' } | { __typename?: 'PageBasic' } | { __typename?: 'PageCar' } | { __typename?: 'PageCategory' } | { __typename?: 'PageDriver' } | { __typename?: 'PageHomepage' } | { __typename?: 'PageRaceEvent' } | { __typename?: 'PageRaceSeries' } | { __typename?: 'PageSearch' } | { __typename?: 'PageTeam' } | { __typename?: 'PartAccordionItem' } | { __typename?: 'PartCarDetailsItem' } | { __typename?: 'PartCircuitHotspot' } | { __typename?: 'PartHistoryCarouselItem' } | { __typename?: 'PartMainNavigationAccordion' } | { __typename?: 'PartMainNavigationItem' } | { __typename?: 'Partner' } | { __typename?: 'PartnerSet' } | { __typename?: 'Products' } | { __typename?: 'Redirect' } | { __typename?: 'Redirects' } | { __typename?: 'SeoMetadata' } | { __typename?: 'Series' } | { __typename?: 'SiteSettings' } | { __typename?: 'Team' } | null, carDetailHotspotsFrontCollection?: { __typename?: 'Car3DCarDetailHotspotsFrontCollection', items: Array<(
      { __typename?: 'PartCarDetailsItem' }
      & PartCarDetailItemFieldsFragment
    ) | null> } | null, carDetailHotspotsBackCollection?: { __typename?: 'Car3DCarDetailHotspotsBackCollection', items: Array<(
      { __typename?: 'PartCarDetailsItem' }
      & PartCarDetailItemFieldsFragment
    ) | null> } | null };

export type TeamSectionImageFieldsFragment = { __typename?: 'ModuleImage', asset?: any | null, alt?: string | null, sys: { __typename?: 'Sys', id: string } };

export type TeamSectionGalleryFieldsFragment = { __typename?: 'ModuleGallery', mediaCollection?: { __typename?: 'ModuleGalleryMediaCollection', items: Array<(
      { __typename?: 'ModuleImage' }
      & TeamSectionImageFieldsFragment
    ) | null> } | null };

export type NewPageHomepageCarsSectionFieldsFragment = { __typename?: 'NewPageHomepage', carsSectionSeriesTitle?: string | null, carsSectionNextEventTitle?: string | null, carsSectionLatestNewsTitle?: string | null, carsSectionLabelNoSeries?: string | null, carsSectionLabelNoNewsEvents?: string | null, carsSectionCarsCollection?: { __typename?: 'NewPageHomepageCarsSectionCarsCollection', items: Array<(
      { __typename?: 'Car3D' }
      & DashboardCar3dFieldsFragment
    ) | null> } | null };

export type NewPageHomepageFieldsFragment = (
  { __typename?: 'NewPageHomepage', seoMetaDescription?: string | null, robotFollow?: string | null, robotIndex?: string | null, historySectionTitle?: string | null, historySectionTitle2?: string | null, historySectionDescription?: string | null, teamSectionTitle?: string | null, teamSectionTitle2?: string | null, newsSectionTitle?: string | null, newsSectionTitle2?: string | null, partnerSet?: (
    { __typename?: 'PartnerSet' }
    & PartnerSetFieldsFragment
  ) | null, historySectionContent?: (
    { __typename?: 'ModuleHistoryCarousel' }
    & ModuleHistoryCarouselFieldsFragment
  ) | null, teamsCollection?: { __typename?: 'NewPageHomepageTeamsCollection', items: Array<{ __typename?: 'PageTeam', slug?: string | null, linkTitle?: string | null, linkTitleDescription?: string | null, team?: { __typename?: 'Team', teamName?: string | null, theme?: string | null, gallery?: (
          { __typename?: 'ModuleGallery' }
          & TeamSectionGalleryFieldsFragment
        ) | null } | null } | null> } | null, newsSectionCarouselItemsCollection?: { __typename?: 'NewPageHomepageNewsSectionCarouselItemsCollection', items: Array<(
      { __typename?: 'ModuleImage' }
      & ModuleImageFieldsFragment
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
    ) | null> } | null, newsSectionContentTagsCollection?: { __typename?: 'NewPageHomepageNewsSectionContentTagsCollection', items: Array<(
      { __typename?: 'ContentTag' }
      & ContentTagFieldsFragment
    ) | null> } | null }
  & NewPageHomepageLinkToFieldsFragment
);

export type NewPageHomepageCollectionItemFieldsFragment = { __typename?: 'NewPageHomepage', sys: { __typename?: 'Sys', id: string }, partnerSet?: { __typename?: 'PartnerSet', sys: { __typename?: 'Sys', id: string } } | null };

export type NewPageHomepageCollectionQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type NewPageHomepageCollectionQuery = { __typename?: 'Query', newPageHomepageCollection?: { __typename?: 'NewPageHomepageCollection', items: Array<(
      { __typename?: 'NewPageHomepage' }
      & NewPageHomepageCollectionItemFieldsFragment
    ) | null> } | null };

export type NewPageHomepageQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  id: Types.Scalars['String']['input'];
}>;


export type NewPageHomepageQuery = { __typename?: 'Query', page?: (
    { __typename?: 'NewPageHomepage' }
    & NewPageHomepageFieldsFragment
  ) | null };

export type NewPageHomepageCarsQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  id: Types.Scalars['String']['input'];
}>;


export type NewPageHomepageCarsQuery = { __typename?: 'Query', page?: (
    { __typename?: 'NewPageHomepage' }
    & NewPageHomepageCarsSectionFieldsFragment
  ) | null };


export const DashboardCarSeriesFieldsFragmentDoc = `
    fragment DashboardCarSeriesFields on Series {
  ...ComponentReferenceFields
  name
  theme
  description
  linkedFrom {
    pageRaceSeriesCollection(limit: 1) {
      items {
        ...ComponentReferenceFields
        sys {
          locale
        }
        slug
      }
    }
  }
}
    `;
export const DashboardCarContentTagWithArticleFieldsFragmentDoc = `
    fragment DashboardCarContentTagWithArticleFields on ContentTag {
  ...ContentTagFields
  linkedFrom {
    pageArticleCollection(limit: 20, order: customFirstPublishedDate_DESC) {
      items {
        ...PageArticleLinkToFields
      }
    }
  }
}
    `;
export const DashboardCar3dFieldsFragmentDoc = `
    fragment DashboardCar3dFields on Car3D {
  sys {
    id
  }
  internalName
  displayName
  theme
  dashboardWidgetLauncherThumbnail
  dashboardWidgetLauncherLabel
  dashboardAsset
  car {
    ... on Car {
      ...CarFields
      linkedFrom {
        pageCarCollection(limit: 1) {
          items {
            ...ComponentReferenceFields
            slug
          }
        }
      }
      seriesCollection(limit: 4) {
        items {
          ...DashboardCarSeriesFields
        }
      }
      tagsCollection(limit: 5) {
        items {
          ...DashboardCarContentTagWithArticleFields
        }
      }
    }
  }
  carDetailHotspotsFrontCollection(limit: 3) {
    items {
      ...PartCarDetailItemFields
    }
  }
  carDetailHotspotsBackCollection(limit: 3) {
    items {
      ...PartCarDetailItemFields
    }
  }
}
    `;
export const NewPageHomepageCarsSectionFieldsFragmentDoc = `
    fragment NewPageHomepageCarsSectionFields on NewPageHomepage {
  carsSectionCarsCollection(limit: 6) {
    items {
      ...DashboardCar3dFields
    }
  }
  carsSectionSeriesTitle
  carsSectionNextEventTitle
  carsSectionLatestNewsTitle
  carsSectionLabelNoSeries
  carsSectionLabelNoNewsEvents
}
    `;
export const TeamSectionImageFieldsFragmentDoc = `
    fragment TeamSectionImageFields on ModuleImage {
  sys {
    id
  }
  asset
  alt
}
    `;
export const TeamSectionGalleryFieldsFragmentDoc = `
    fragment TeamSectionGalleryFields on ModuleGallery {
  mediaCollection(limit: 10) {
    items {
      ...TeamSectionImageFields
    }
  }
}
    `;
export const NewPageHomepageFieldsFragmentDoc = `
    fragment NewPageHomepageFields on NewPageHomepage {
  ...NewPageHomepageLinkToFields
  partnerSet {
    ...PartnerSetFields
  }
  seoMetaDescription
  robotFollow
  robotIndex
  historySectionTitle
  historySectionTitle2
  historySectionDescription
  historySectionContent {
    ... on ModuleHistoryCarousel {
      ...ModuleHistoryCarouselFields
    }
  }
  teamSectionTitle
  teamSectionTitle2
  teamsCollection(limit: 4) {
    items {
      ... on PageTeam {
        slug
        linkTitle
        linkTitleDescription
        team {
          teamName
          theme
          gallery {
            ...TeamSectionGalleryFields
          }
        }
      }
    }
  }
  newsSectionTitle
  newsSectionTitle2
  newsSectionCarouselItemsCollection(limit: 15) {
    items {
      ... on PageArticle {
        ...PageArticleLinkToFields
      }
      ... on ModuleImage {
        ...ModuleImageFields
      }
      ... on PageDriver {
        ...PageDriverLinkToFields
      }
      ... on PageBasic {
        ...PageBasicLinkToFields
      }
      ... on PageTeam {
        ...PageTeamLinkToFields
      }
      ... on PageRaceSeries {
        ...PageRaceSeriesLinkToFields
      }
      ... on PageRaceEvent {
        ...PageRaceEventLinkToFields
      }
      ... on PageCar {
        ...PageCarLinkToFields
      }
    }
  }
  newsSectionContentTagsCollection(limit: 15) {
    items {
      ... on ContentTag {
        ...ContentTagFields
      }
    }
  }
}
    `;
export const NewPageHomepageCollectionItemFieldsFragmentDoc = `
    fragment NewPageHomepageCollectionItemFields on NewPageHomepage {
  sys {
    id
  }
  partnerSet {
    sys {
      id
    }
  }
}
    `;
export const NewPageHomepageCollectionDocument = `
    query NewPageHomepageCollection($locale: String!, $preview: Boolean) {
  newPageHomepageCollection(
    limit: 1
    locale: $locale
    preview: $preview
    where: {title_exists: true}
  ) {
    items {
      ...NewPageHomepageCollectionItemFields
    }
  }
}
    ${NewPageHomepageCollectionItemFieldsFragmentDoc}`;

export const useNewPageHomepageCollectionQuery = <
      TData = NewPageHomepageCollectionQuery,
      TError = unknown
    >(
      variables: NewPageHomepageCollectionQueryVariables,
      options?: Omit<UseQueryOptions<NewPageHomepageCollectionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<NewPageHomepageCollectionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<NewPageHomepageCollectionQuery, TError, TData>(
      {
    queryKey: ['NewPageHomepageCollection', variables],
    queryFn: customFetcher<NewPageHomepageCollectionQuery, NewPageHomepageCollectionQueryVariables>(NewPageHomepageCollectionDocument, variables),
    ...options
  }
    )};

useNewPageHomepageCollectionQuery.getKey = (variables: NewPageHomepageCollectionQueryVariables) => ['NewPageHomepageCollection', variables];


useNewPageHomepageCollectionQuery.fetcher = (variables: NewPageHomepageCollectionQueryVariables, options?: RequestInit['headers']) => customFetcher<NewPageHomepageCollectionQuery, NewPageHomepageCollectionQueryVariables>(NewPageHomepageCollectionDocument, variables, options);

export const NewPageHomepageDocument = `
    query NewPageHomepage($locale: String!, $preview: Boolean, $id: String!) {
  page: newPageHomepage(id: $id, locale: $locale, preview: $preview) {
    ...NewPageHomepageFields
  }
}
    ${NewPageHomepageFieldsFragmentDoc}
${NewPageHomepageLinkToFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}
${PartnerSetFieldsFragmentDoc}
${PartnerFieldsFragmentDoc}
${ModuleHistoryCarouselFieldsFragmentDoc}
${PartHistoryCarouselItemFieldsFragmentDoc}
${TeamSectionGalleryFieldsFragmentDoc}
${TeamSectionImageFieldsFragmentDoc}
${PageArticleLinkToFieldsFragmentDoc}
${ContentTagFieldsFragmentDoc}
${ModuleImageFieldsFragmentDoc}
${PageDriverLinkToFieldsFragmentDoc}
${PageBasicLinkToFieldsFragmentDoc}
${PageTeamLinkToFieldsFragmentDoc}
${TeamFieldsFragmentDoc}
${PageRaceSeriesLinkToFieldsFragmentDoc}
${PageRaceEventLinkToFieldsFragmentDoc}
${PageCarLinkToFieldsFragmentDoc}`;

export const useNewPageHomepageQuery = <
      TData = NewPageHomepageQuery,
      TError = unknown
    >(
      variables: NewPageHomepageQueryVariables,
      options?: Omit<UseQueryOptions<NewPageHomepageQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<NewPageHomepageQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<NewPageHomepageQuery, TError, TData>(
      {
    queryKey: ['NewPageHomepage', variables],
    queryFn: customFetcher<NewPageHomepageQuery, NewPageHomepageQueryVariables>(NewPageHomepageDocument, variables),
    ...options
  }
    )};

useNewPageHomepageQuery.getKey = (variables: NewPageHomepageQueryVariables) => ['NewPageHomepage', variables];


useNewPageHomepageQuery.fetcher = (variables: NewPageHomepageQueryVariables, options?: RequestInit['headers']) => customFetcher<NewPageHomepageQuery, NewPageHomepageQueryVariables>(NewPageHomepageDocument, variables, options);

export const NewPageHomepageCarsDocument = `
    query NewPageHomepageCars($locale: String!, $preview: Boolean, $id: String!) {
  page: newPageHomepage(id: $id, locale: $locale, preview: $preview) {
    ...NewPageHomepageCarsSectionFields
  }
}
    ${NewPageHomepageCarsSectionFieldsFragmentDoc}
${DashboardCar3dFieldsFragmentDoc}
${CarFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}
${DashboardCarSeriesFieldsFragmentDoc}
${DashboardCarContentTagWithArticleFieldsFragmentDoc}
${ContentTagFieldsFragmentDoc}
${PageArticleLinkToFieldsFragmentDoc}
${PartCarDetailItemFieldsFragmentDoc}`;

export const useNewPageHomepageCarsQuery = <
      TData = NewPageHomepageCarsQuery,
      TError = unknown
    >(
      variables: NewPageHomepageCarsQueryVariables,
      options?: Omit<UseQueryOptions<NewPageHomepageCarsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<NewPageHomepageCarsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<NewPageHomepageCarsQuery, TError, TData>(
      {
    queryKey: ['NewPageHomepageCars', variables],
    queryFn: customFetcher<NewPageHomepageCarsQuery, NewPageHomepageCarsQueryVariables>(NewPageHomepageCarsDocument, variables),
    ...options
  }
    )};

useNewPageHomepageCarsQuery.getKey = (variables: NewPageHomepageCarsQueryVariables) => ['NewPageHomepageCars', variables];


useNewPageHomepageCarsQuery.fetcher = (variables: NewPageHomepageCarsQueryVariables, options?: RequestInit['headers']) => customFetcher<NewPageHomepageCarsQuery, NewPageHomepageCarsQueryVariables>(NewPageHomepageCarsDocument, variables, options);
