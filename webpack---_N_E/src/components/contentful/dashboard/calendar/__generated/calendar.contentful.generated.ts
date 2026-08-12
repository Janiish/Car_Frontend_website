import * as Types from '../../../../../lib/contentful/__generated/graphql.types';

import { ComponentReferenceFields_Car_Fragment, ComponentReferenceFields_Car3D_Fragment, ComponentReferenceFields_ComponentProductSlider_1oyzmkwpf3d5_Master_Fragment, ComponentReferenceFields_ContentTag_Fragment, ComponentReferenceFields_Dashboard_Fragment, ComponentReferenceFields_Driver_Fragment, ComponentReferenceFields_Event_Fragment, ComponentReferenceFields_ExternalLink_Fragment, ComponentReferenceFields_Footer_Fragment, ComponentReferenceFields_LanguageSelectorItem_Fragment, ComponentReferenceFields_MainNavigation_Fragment, ComponentReferenceFields_Microcopy_Fragment, ComponentReferenceFields_MicrocopySet_Fragment, ComponentReferenceFields_ModalLink_Fragment, ComponentReferenceFields_Module916VideoImage_Fragment, ComponentReferenceFields_ModuleAccordion_Fragment, ComponentReferenceFields_ModuleAudioPlayer_Fragment, ComponentReferenceFields_ModuleCarTechSpecs_Fragment, ComponentReferenceFields_ModuleCarousel_Fragment, ComponentReferenceFields_ModuleCircuit_Fragment, ComponentReferenceFields_ModuleCookieConsentSettingsWidget_Fragment, ComponentReferenceFields_ModuleDriverList_Fragment, ComponentReferenceFields_ModuleGallery_Fragment, ComponentReferenceFields_ModuleHistoryCarousel_Fragment, ComponentReferenceFields_ModuleIframe_Fragment, ComponentReferenceFields_ModuleImage_Fragment, ComponentReferenceFields_ModuleListenToTheEngine_Fragment, ComponentReferenceFields_ModuleLiveTimingTable_Fragment, ComponentReferenceFields_ModuleMediaFeature_Fragment, ComponentReferenceFields_ModulePageLinkTile_Fragment, ComponentReferenceFields_ModuleQuickLinks_Fragment, ComponentReferenceFields_ModuleQuote_Fragment, ComponentReferenceFields_ModuleRichText_Fragment, ComponentReferenceFields_ModuleSideBySide_Fragment, ComponentReferenceFields_ModuleSpacer_Fragment, ComponentReferenceFields_ModuleSplitLayout_Fragment, ComponentReferenceFields_ModuleTable_Fragment, ComponentReferenceFields_ModuleTitleAndDescription_Fragment, ComponentReferenceFields_ModuleVideo_Fragment, ComponentReferenceFields_Navigation_Fragment, ComponentReferenceFields_NewPageHomepage_Fragment, ComponentReferenceFields_PageArticle_Fragment, ComponentReferenceFields_PageBasic_Fragment, ComponentReferenceFields_PageCar_Fragment, ComponentReferenceFields_PageCategory_Fragment, ComponentReferenceFields_PageDriver_Fragment, ComponentReferenceFields_PageHomepage_Fragment, ComponentReferenceFields_PageRaceEvent_Fragment, ComponentReferenceFields_PageRaceSeries_Fragment, ComponentReferenceFields_PageSearch_Fragment, ComponentReferenceFields_PageTeam_Fragment, ComponentReferenceFields_PartAccordionItem_Fragment, ComponentReferenceFields_PartCarDetailsItem_Fragment, ComponentReferenceFields_PartCircuitHotspot_Fragment, ComponentReferenceFields_PartHistoryCarouselItem_Fragment, ComponentReferenceFields_PartMainNavigationAccordion_Fragment, ComponentReferenceFields_PartMainNavigationItem_Fragment, ComponentReferenceFields_Partner_Fragment, ComponentReferenceFields_PartnerSet_Fragment, ComponentReferenceFields_Products_Fragment, ComponentReferenceFields_Redirect_Fragment, ComponentReferenceFields_Redirects_Fragment, ComponentReferenceFields_SeoMetadata_Fragment, ComponentReferenceFields_Series_Fragment, ComponentReferenceFields_SiteSettings_Fragment, ComponentReferenceFields_Team_Fragment } from '../../../../../lib/contentful/__generated/component-map.contentful.generated';
import { ComponentReferenceFieldsFragmentDoc } from '../../../../../lib/contentful/__generated/component-map.contentful.generated';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@/lib/contentful/fetch-config';
export type CalendarSeriesFieldsFragment = (
  { __typename?: 'Series', name?: string | null, linkedFrom?: { __typename?: 'SeriesLinkingCollections', pageRaceSeriesCollection?: { __typename?: 'PageRaceSeriesCollection', items: Array<(
        { __typename?: 'PageRaceSeries', slug?: string | null, sys: { __typename?: 'Sys', locale?: string | null } }
        & ComponentReferenceFields_PageRaceSeries_Fragment
      ) | null> } | null } | null }
  & ComponentReferenceFields_Series_Fragment
);

export type CalendarEventFieldsFragment = (
  { __typename?: 'Event', name?: string | null, startDate?: any | null, endDate?: any | null, series?: (
    { __typename?: 'Series' }
    & CalendarSeriesFieldsFragment
  ) | null, linkedFrom?: { __typename?: 'EventLinkingCollections', pageRaceEventCollection?: { __typename?: 'PageRaceEventCollection', items: Array<(
        { __typename?: 'PageRaceEvent', slug?: string | null, sys: { __typename?: 'Sys', locale?: string | null } }
        & ComponentReferenceFields_PageRaceEvent_Fragment
      ) | null> } | null } | null }
  & ComponentReferenceFields_Event_Fragment
);

export type CalendarQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview: Types.Scalars['Boolean']['input'];
}>;


export type CalendarQuery = { __typename?: 'Query', eventCollection?: { __typename?: 'EventCollection', items: Array<(
      { __typename?: 'Event' }
      & CalendarEventFieldsFragment
    ) | null> } | null };


export const CalendarSeriesFieldsFragmentDoc = `
    fragment CalendarSeriesFields on Series {
  ...ComponentReferenceFields
  name
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
export const CalendarEventFieldsFragmentDoc = `
    fragment CalendarEventFields on Event {
  ...ComponentReferenceFields
  name
  startDate
  endDate
  series {
    ...CalendarSeriesFields
  }
  linkedFrom {
    pageRaceEventCollection(limit: 1) {
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
export const CalendarDocument = `
    query Calendar($locale: String!, $preview: Boolean!) {
  eventCollection(locale: $locale, preview: $preview, order: startDate_ASC) {
    items {
      ...CalendarEventFields
    }
  }
}
    ${CalendarEventFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}
${CalendarSeriesFieldsFragmentDoc}`;

export const useCalendarQuery = <
      TData = CalendarQuery,
      TError = unknown
    >(
      variables: CalendarQueryVariables,
      options?: Omit<UseQueryOptions<CalendarQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<CalendarQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<CalendarQuery, TError, TData>(
      {
    queryKey: ['Calendar', variables],
    queryFn: customFetcher<CalendarQuery, CalendarQueryVariables>(CalendarDocument, variables),
    ...options
  }
    )};

useCalendarQuery.getKey = (variables: CalendarQueryVariables) => ['Calendar', variables];


useCalendarQuery.fetcher = (variables: CalendarQueryVariables, options?: RequestInit['headers']) => customFetcher<CalendarQuery, CalendarQueryVariables>(CalendarDocument, variables, options);
