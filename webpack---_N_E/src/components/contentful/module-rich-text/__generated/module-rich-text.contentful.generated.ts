import * as Types from '../../../../lib/contentful/__generated/graphql.types';

import { ComponentReferenceFields_Car_Fragment, ComponentReferenceFields_Car3D_Fragment, ComponentReferenceFields_ComponentProductSlider_1oyzmkwpf3d5_Master_Fragment, ComponentReferenceFields_ContentTag_Fragment, ComponentReferenceFields_Dashboard_Fragment, ComponentReferenceFields_Driver_Fragment, ComponentReferenceFields_Event_Fragment, ComponentReferenceFields_ExternalLink_Fragment, ComponentReferenceFields_Footer_Fragment, ComponentReferenceFields_LanguageSelectorItem_Fragment, ComponentReferenceFields_MainNavigation_Fragment, ComponentReferenceFields_Microcopy_Fragment, ComponentReferenceFields_MicrocopySet_Fragment, ComponentReferenceFields_ModalLink_Fragment, ComponentReferenceFields_Module916VideoImage_Fragment, ComponentReferenceFields_ModuleAccordion_Fragment, ComponentReferenceFields_ModuleAudioPlayer_Fragment, ComponentReferenceFields_ModuleCarTechSpecs_Fragment, ComponentReferenceFields_ModuleCarousel_Fragment, ComponentReferenceFields_ModuleCircuit_Fragment, ComponentReferenceFields_ModuleCookieConsentSettingsWidget_Fragment, ComponentReferenceFields_ModuleDriverList_Fragment, ComponentReferenceFields_ModuleGallery_Fragment, ComponentReferenceFields_ModuleHistoryCarousel_Fragment, ComponentReferenceFields_ModuleIframe_Fragment, ComponentReferenceFields_ModuleImage_Fragment, ComponentReferenceFields_ModuleListenToTheEngine_Fragment, ComponentReferenceFields_ModuleLiveTimingTable_Fragment, ComponentReferenceFields_ModuleMediaFeature_Fragment, ComponentReferenceFields_ModulePageLinkTile_Fragment, ComponentReferenceFields_ModuleQuickLinks_Fragment, ComponentReferenceFields_ModuleQuote_Fragment, ComponentReferenceFields_ModuleRichText_Fragment, ComponentReferenceFields_ModuleSideBySide_Fragment, ComponentReferenceFields_ModuleSpacer_Fragment, ComponentReferenceFields_ModuleSplitLayout_Fragment, ComponentReferenceFields_ModuleTable_Fragment, ComponentReferenceFields_ModuleTitleAndDescription_Fragment, ComponentReferenceFields_ModuleVideo_Fragment, ComponentReferenceFields_Navigation_Fragment, ComponentReferenceFields_NewPageHomepage_Fragment, ComponentReferenceFields_PageArticle_Fragment, ComponentReferenceFields_PageBasic_Fragment, ComponentReferenceFields_PageCar_Fragment, ComponentReferenceFields_PageCategory_Fragment, ComponentReferenceFields_PageDriver_Fragment, ComponentReferenceFields_PageHomepage_Fragment, ComponentReferenceFields_PageRaceEvent_Fragment, ComponentReferenceFields_PageRaceSeries_Fragment, ComponentReferenceFields_PageSearch_Fragment, ComponentReferenceFields_PageTeam_Fragment, ComponentReferenceFields_PartAccordionItem_Fragment, ComponentReferenceFields_PartCarDetailsItem_Fragment, ComponentReferenceFields_PartCircuitHotspot_Fragment, ComponentReferenceFields_PartHistoryCarouselItem_Fragment, ComponentReferenceFields_PartMainNavigationAccordion_Fragment, ComponentReferenceFields_PartMainNavigationItem_Fragment, ComponentReferenceFields_Partner_Fragment, ComponentReferenceFields_PartnerSet_Fragment, ComponentReferenceFields_Products_Fragment, ComponentReferenceFields_Redirect_Fragment, ComponentReferenceFields_Redirects_Fragment, ComponentReferenceFields_SeoMetadata_Fragment, ComponentReferenceFields_Series_Fragment, ComponentReferenceFields_SiteSettings_Fragment, ComponentReferenceFields_Team_Fragment } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { ModuleQuoteFieldsFragment } from '../../module-quote/__generated/module-quote.contentful.generated';
import { ModuleAudioPlayerFieldsFragment } from '../../module-audio-player/__generated/module-audio-player.contentful.generated';
import { Module916VideoImageFieldsFragment } from '../../module-916-video-image/__generated/module-916-video-image.contentful.generated';
import { ModuleTitleAndDescriptionFieldsFragment } from '../../module-title-and-description/__generated/module-title-and-description.contentful.generated';
import { ExternalLinkFieldsFragment, PageArticleLinkToFieldsFragment, PageBasicLinkToFieldsFragment, PageCarLinkToFieldsFragment, PageCategoryLinkToFieldsFragment, PageDriverLinkToFieldsFragment, PageHomepageLinkToFieldsFragment, PageRaceSeriesLinkToFieldsFragment, PageRaceEventLinkToFieldsFragment, PageTeamLinkToFieldsFragment, PageSearchLinkToFieldsFragment } from '../../../../lib/contentful/link-fragments/__generated/link-fragments.contentful.generated';
import { ModuleImageFieldsFragment } from '../../module-image/__generated/module-image.contentful.generated';
import { ModuleVideoFieldsFragment } from '../../module-video/__generated/module-video.contentful.generated';
import { ModuleSpacerFieldsFragment } from '../../module-spacer/__generated/module-spacer.contentful.generated';
import { MicrocopyFieldsFragment, MicrocopySetFieldsFragment } from '../../../../lib/contentful/microcopy/__generated/microcopy-sets.contentful.generated';
import { ContentTagFieldsFragment } from '../../../../lib/contentful/content-tag/__generated/content-tag.contentful.generated';
import { ComponentReferenceFieldsFragmentDoc } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { ModuleQuoteFieldsFragmentDoc } from '../../module-quote/__generated/module-quote.contentful.generated';
import { ModuleAudioPlayerFieldsFragmentDoc } from '../../module-audio-player/__generated/module-audio-player.contentful.generated';
import { Module916VideoImageFieldsFragmentDoc } from '../../module-916-video-image/__generated/module-916-video-image.contentful.generated';
import { ModuleTitleAndDescriptionFieldsFragmentDoc } from '../../module-title-and-description/__generated/module-title-and-description.contentful.generated';
import { ExternalLinkFieldsFragmentDoc, PageArticleLinkToFieldsFragmentDoc, PageBasicLinkToFieldsFragmentDoc, PageCarLinkToFieldsFragmentDoc, PageCategoryLinkToFieldsFragmentDoc, PageDriverLinkToFieldsFragmentDoc, PageHomepageLinkToFieldsFragmentDoc, PageRaceSeriesLinkToFieldsFragmentDoc, PageRaceEventLinkToFieldsFragmentDoc, PageTeamLinkToFieldsFragmentDoc, PageSearchLinkToFieldsFragmentDoc } from '../../../../lib/contentful/link-fragments/__generated/link-fragments.contentful.generated';
import { ModuleImageFieldsFragmentDoc } from '../../module-image/__generated/module-image.contentful.generated';
import { ModuleVideoFieldsFragmentDoc } from '../../module-video/__generated/module-video.contentful.generated';
import { ModuleSpacerFieldsFragmentDoc } from '../../module-spacer/__generated/module-spacer.contentful.generated';
import { MicrocopyFieldsFragmentDoc, MicrocopySetFieldsFragmentDoc } from '../../../../lib/contentful/microcopy/__generated/microcopy-sets.contentful.generated';
import { ContentTagFieldsFragmentDoc } from '../../../../lib/contentful/content-tag/__generated/content-tag.contentful.generated';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@/lib/contentful/fetch-config';
export type ModuleRichTextFieldsFragment = (
  { __typename?: 'ModuleRichText', title?: string | null, isTitleLeftAligned?: boolean | null, text?: { __typename?: 'ModuleRichTextText', json: any, links: { __typename?: 'ModuleRichTextTextLinks', entries: { __typename?: 'ModuleRichTextTextEntries', block: Array<(
          { __typename?: 'Car' }
          & ComponentReferenceFields_Car_Fragment
        ) | (
          { __typename?: 'Car3D' }
          & ComponentReferenceFields_Car3D_Fragment
        ) | (
          { __typename?: 'ComponentProductSlider_1oyzmkwpf3d5_Master' }
          & ComponentReferenceFields_ComponentProductSlider_1oyzmkwpf3d5_Master_Fragment
        ) | (
          { __typename?: 'ContentTag' }
          & ComponentReferenceFields_ContentTag_Fragment
        ) | (
          { __typename?: 'Dashboard' }
          & ComponentReferenceFields_Dashboard_Fragment
        ) | (
          { __typename?: 'Driver' }
          & ComponentReferenceFields_Driver_Fragment
        ) | (
          { __typename?: 'Event' }
          & ComponentReferenceFields_Event_Fragment
        ) | (
          { __typename?: 'ExternalLink' }
          & ComponentReferenceFields_ExternalLink_Fragment
        ) | (
          { __typename?: 'Footer' }
          & ComponentReferenceFields_Footer_Fragment
        ) | (
          { __typename?: 'LanguageSelectorItem' }
          & ComponentReferenceFields_LanguageSelectorItem_Fragment
        ) | (
          { __typename?: 'MainNavigation' }
          & ComponentReferenceFields_MainNavigation_Fragment
        ) | (
          { __typename?: 'Microcopy' }
          & ComponentReferenceFields_Microcopy_Fragment
        ) | (
          { __typename?: 'MicrocopySet' }
          & ComponentReferenceFields_MicrocopySet_Fragment
        ) | (
          { __typename?: 'ModalLink' }
          & ComponentReferenceFields_ModalLink_Fragment
        ) | (
          { __typename?: 'Module916VideoImage' }
          & ComponentReferenceFields_Module916VideoImage_Fragment
        ) | (
          { __typename?: 'ModuleAccordion' }
          & ComponentReferenceFields_ModuleAccordion_Fragment
        ) | (
          { __typename?: 'ModuleAudioPlayer' }
          & ModuleAudioPlayerFieldsFragment
          & ComponentReferenceFields_ModuleAudioPlayer_Fragment
        ) | (
          { __typename?: 'ModuleCarTechSpecs' }
          & ComponentReferenceFields_ModuleCarTechSpecs_Fragment
        ) | (
          { __typename?: 'ModuleCarousel' }
          & ComponentReferenceFields_ModuleCarousel_Fragment
        ) | (
          { __typename?: 'ModuleCircuit' }
          & ComponentReferenceFields_ModuleCircuit_Fragment
        ) | (
          { __typename?: 'ModuleCookieConsentSettingsWidget' }
          & ComponentReferenceFields_ModuleCookieConsentSettingsWidget_Fragment
        ) | (
          { __typename?: 'ModuleDriverList' }
          & ComponentReferenceFields_ModuleDriverList_Fragment
        ) | (
          { __typename?: 'ModuleGallery' }
          & ComponentReferenceFields_ModuleGallery_Fragment
        ) | (
          { __typename?: 'ModuleHistoryCarousel' }
          & ComponentReferenceFields_ModuleHistoryCarousel_Fragment
        ) | (
          { __typename?: 'ModuleIframe' }
          & ComponentReferenceFields_ModuleIframe_Fragment
        ) | (
          { __typename?: 'ModuleImage' }
          & ModuleImageFieldsFragment
          & ComponentReferenceFields_ModuleImage_Fragment
        ) | (
          { __typename?: 'ModuleListenToTheEngine' }
          & ComponentReferenceFields_ModuleListenToTheEngine_Fragment
        ) | (
          { __typename?: 'ModuleLiveTimingTable' }
          & ComponentReferenceFields_ModuleLiveTimingTable_Fragment
        ) | (
          { __typename?: 'ModuleMediaFeature' }
          & ComponentReferenceFields_ModuleMediaFeature_Fragment
        ) | (
          { __typename?: 'ModulePageLinkTile' }
          & ComponentReferenceFields_ModulePageLinkTile_Fragment
        ) | (
          { __typename?: 'ModuleQuickLinks' }
          & ComponentReferenceFields_ModuleQuickLinks_Fragment
        ) | (
          { __typename?: 'ModuleQuote' }
          & ModuleQuoteFieldsFragment
          & ComponentReferenceFields_ModuleQuote_Fragment
        ) | (
          { __typename?: 'ModuleRichText' }
          & ComponentReferenceFields_ModuleRichText_Fragment
        ) | (
          { __typename?: 'ModuleSideBySide' }
          & ComponentReferenceFields_ModuleSideBySide_Fragment
        ) | (
          { __typename?: 'ModuleSpacer' }
          & ModuleSpacerFieldsFragment
          & ComponentReferenceFields_ModuleSpacer_Fragment
        ) | (
          { __typename?: 'ModuleSplitLayout' }
          & ComponentReferenceFields_ModuleSplitLayout_Fragment
        ) | (
          { __typename?: 'ModuleTable' }
          & ComponentReferenceFields_ModuleTable_Fragment
        ) | (
          { __typename?: 'ModuleTitleAndDescription' }
          & ModuleTitleAndDescriptionFieldsFragment
          & ComponentReferenceFields_ModuleTitleAndDescription_Fragment
        ) | (
          { __typename?: 'ModuleVideo' }
          & ModuleVideoFieldsFragment
          & ComponentReferenceFields_ModuleVideo_Fragment
        ) | (
          { __typename?: 'Navigation' }
          & ComponentReferenceFields_Navigation_Fragment
        ) | (
          { __typename?: 'NewPageHomepage' }
          & ComponentReferenceFields_NewPageHomepage_Fragment
        ) | (
          { __typename?: 'PageArticle' }
          & ComponentReferenceFields_PageArticle_Fragment
        ) | (
          { __typename?: 'PageBasic' }
          & ComponentReferenceFields_PageBasic_Fragment
        ) | (
          { __typename?: 'PageCar' }
          & ComponentReferenceFields_PageCar_Fragment
        ) | (
          { __typename?: 'PageCategory' }
          & ComponentReferenceFields_PageCategory_Fragment
        ) | (
          { __typename?: 'PageDriver' }
          & ComponentReferenceFields_PageDriver_Fragment
        ) | (
          { __typename?: 'PageHomepage' }
          & ComponentReferenceFields_PageHomepage_Fragment
        ) | (
          { __typename?: 'PageRaceEvent' }
          & ComponentReferenceFields_PageRaceEvent_Fragment
        ) | (
          { __typename?: 'PageRaceSeries' }
          & ComponentReferenceFields_PageRaceSeries_Fragment
        ) | (
          { __typename?: 'PageSearch' }
          & ComponentReferenceFields_PageSearch_Fragment
        ) | (
          { __typename?: 'PageTeam' }
          & ComponentReferenceFields_PageTeam_Fragment
        ) | (
          { __typename?: 'PartAccordionItem' }
          & ComponentReferenceFields_PartAccordionItem_Fragment
        ) | (
          { __typename?: 'PartCarDetailsItem' }
          & ComponentReferenceFields_PartCarDetailsItem_Fragment
        ) | (
          { __typename?: 'PartCircuitHotspot' }
          & ComponentReferenceFields_PartCircuitHotspot_Fragment
        ) | (
          { __typename?: 'PartHistoryCarouselItem' }
          & ComponentReferenceFields_PartHistoryCarouselItem_Fragment
        ) | (
          { __typename?: 'PartMainNavigationAccordion' }
          & ComponentReferenceFields_PartMainNavigationAccordion_Fragment
        ) | (
          { __typename?: 'PartMainNavigationItem' }
          & ComponentReferenceFields_PartMainNavigationItem_Fragment
        ) | (
          { __typename?: 'Partner' }
          & ComponentReferenceFields_Partner_Fragment
        ) | (
          { __typename?: 'PartnerSet' }
          & ComponentReferenceFields_PartnerSet_Fragment
        ) | (
          { __typename?: 'Products' }
          & ComponentReferenceFields_Products_Fragment
        ) | (
          { __typename?: 'Redirect' }
          & ComponentReferenceFields_Redirect_Fragment
        ) | (
          { __typename?: 'Redirects' }
          & ComponentReferenceFields_Redirects_Fragment
        ) | (
          { __typename?: 'SeoMetadata' }
          & ComponentReferenceFields_SeoMetadata_Fragment
        ) | (
          { __typename?: 'Series' }
          & ComponentReferenceFields_Series_Fragment
        ) | (
          { __typename?: 'SiteSettings' }
          & ComponentReferenceFields_SiteSettings_Fragment
        ) | (
          { __typename?: 'Team' }
          & ComponentReferenceFields_Team_Fragment
        ) | null>, inline: Array<(
          { __typename?: 'Car' }
          & ComponentReferenceFields_Car_Fragment
        ) | (
          { __typename?: 'Car3D' }
          & ComponentReferenceFields_Car3D_Fragment
        ) | (
          { __typename?: 'ComponentProductSlider_1oyzmkwpf3d5_Master' }
          & ComponentReferenceFields_ComponentProductSlider_1oyzmkwpf3d5_Master_Fragment
        ) | (
          { __typename?: 'ContentTag' }
          & ContentTagFieldsFragment
          & ComponentReferenceFields_ContentTag_Fragment
        ) | (
          { __typename?: 'Dashboard' }
          & ComponentReferenceFields_Dashboard_Fragment
        ) | (
          { __typename?: 'Driver' }
          & ComponentReferenceFields_Driver_Fragment
        ) | (
          { __typename?: 'Event' }
          & ComponentReferenceFields_Event_Fragment
        ) | (
          { __typename?: 'ExternalLink' }
          & ComponentReferenceFields_ExternalLink_Fragment
        ) | (
          { __typename?: 'Footer' }
          & ComponentReferenceFields_Footer_Fragment
        ) | (
          { __typename?: 'LanguageSelectorItem' }
          & ComponentReferenceFields_LanguageSelectorItem_Fragment
        ) | (
          { __typename?: 'MainNavigation' }
          & ComponentReferenceFields_MainNavigation_Fragment
        ) | (
          { __typename?: 'Microcopy' }
          & MicrocopyFieldsFragment
          & ComponentReferenceFields_Microcopy_Fragment
        ) | (
          { __typename?: 'MicrocopySet' }
          & ComponentReferenceFields_MicrocopySet_Fragment
        ) | (
          { __typename?: 'ModalLink' }
          & ComponentReferenceFields_ModalLink_Fragment
        ) | (
          { __typename?: 'Module916VideoImage' }
          & ComponentReferenceFields_Module916VideoImage_Fragment
        ) | (
          { __typename?: 'ModuleAccordion' }
          & ComponentReferenceFields_ModuleAccordion_Fragment
        ) | (
          { __typename?: 'ModuleAudioPlayer' }
          & ComponentReferenceFields_ModuleAudioPlayer_Fragment
        ) | (
          { __typename?: 'ModuleCarTechSpecs' }
          & ComponentReferenceFields_ModuleCarTechSpecs_Fragment
        ) | (
          { __typename?: 'ModuleCarousel' }
          & ComponentReferenceFields_ModuleCarousel_Fragment
        ) | (
          { __typename?: 'ModuleCircuit' }
          & ComponentReferenceFields_ModuleCircuit_Fragment
        ) | (
          { __typename?: 'ModuleCookieConsentSettingsWidget' }
          & ComponentReferenceFields_ModuleCookieConsentSettingsWidget_Fragment
        ) | (
          { __typename?: 'ModuleDriverList' }
          & ComponentReferenceFields_ModuleDriverList_Fragment
        ) | (
          { __typename?: 'ModuleGallery' }
          & ComponentReferenceFields_ModuleGallery_Fragment
        ) | (
          { __typename?: 'ModuleHistoryCarousel' }
          & ComponentReferenceFields_ModuleHistoryCarousel_Fragment
        ) | (
          { __typename?: 'ModuleIframe' }
          & ComponentReferenceFields_ModuleIframe_Fragment
        ) | (
          { __typename?: 'ModuleImage' }
          & ComponentReferenceFields_ModuleImage_Fragment
        ) | (
          { __typename?: 'ModuleListenToTheEngine' }
          & ComponentReferenceFields_ModuleListenToTheEngine_Fragment
        ) | (
          { __typename?: 'ModuleLiveTimingTable' }
          & ComponentReferenceFields_ModuleLiveTimingTable_Fragment
        ) | (
          { __typename?: 'ModuleMediaFeature' }
          & ComponentReferenceFields_ModuleMediaFeature_Fragment
        ) | (
          { __typename?: 'ModulePageLinkTile' }
          & ComponentReferenceFields_ModulePageLinkTile_Fragment
        ) | (
          { __typename?: 'ModuleQuickLinks' }
          & ComponentReferenceFields_ModuleQuickLinks_Fragment
        ) | (
          { __typename?: 'ModuleQuote' }
          & ComponentReferenceFields_ModuleQuote_Fragment
        ) | (
          { __typename?: 'ModuleRichText' }
          & ComponentReferenceFields_ModuleRichText_Fragment
        ) | (
          { __typename?: 'ModuleSideBySide' }
          & ComponentReferenceFields_ModuleSideBySide_Fragment
        ) | (
          { __typename?: 'ModuleSpacer' }
          & ComponentReferenceFields_ModuleSpacer_Fragment
        ) | (
          { __typename?: 'ModuleSplitLayout' }
          & ComponentReferenceFields_ModuleSplitLayout_Fragment
        ) | (
          { __typename?: 'ModuleTable' }
          & ComponentReferenceFields_ModuleTable_Fragment
        ) | (
          { __typename?: 'ModuleTitleAndDescription' }
          & ComponentReferenceFields_ModuleTitleAndDescription_Fragment
        ) | (
          { __typename?: 'ModuleVideo' }
          & ComponentReferenceFields_ModuleVideo_Fragment
        ) | (
          { __typename?: 'Navigation' }
          & ComponentReferenceFields_Navigation_Fragment
        ) | (
          { __typename?: 'NewPageHomepage' }
          & ComponentReferenceFields_NewPageHomepage_Fragment
        ) | (
          { __typename?: 'PageArticle' }
          & ComponentReferenceFields_PageArticle_Fragment
        ) | (
          { __typename?: 'PageBasic' }
          & ComponentReferenceFields_PageBasic_Fragment
        ) | (
          { __typename?: 'PageCar' }
          & ComponentReferenceFields_PageCar_Fragment
        ) | (
          { __typename?: 'PageCategory' }
          & ComponentReferenceFields_PageCategory_Fragment
        ) | (
          { __typename?: 'PageDriver' }
          & ComponentReferenceFields_PageDriver_Fragment
        ) | (
          { __typename?: 'PageHomepage' }
          & ComponentReferenceFields_PageHomepage_Fragment
        ) | (
          { __typename?: 'PageRaceEvent' }
          & ComponentReferenceFields_PageRaceEvent_Fragment
        ) | (
          { __typename?: 'PageRaceSeries' }
          & ComponentReferenceFields_PageRaceSeries_Fragment
        ) | (
          { __typename?: 'PageSearch' }
          & ComponentReferenceFields_PageSearch_Fragment
        ) | (
          { __typename?: 'PageTeam' }
          & ComponentReferenceFields_PageTeam_Fragment
        ) | (
          { __typename?: 'PartAccordionItem' }
          & ComponentReferenceFields_PartAccordionItem_Fragment
        ) | (
          { __typename?: 'PartCarDetailsItem' }
          & ComponentReferenceFields_PartCarDetailsItem_Fragment
        ) | (
          { __typename?: 'PartCircuitHotspot' }
          & ComponentReferenceFields_PartCircuitHotspot_Fragment
        ) | (
          { __typename?: 'PartHistoryCarouselItem' }
          & ComponentReferenceFields_PartHistoryCarouselItem_Fragment
        ) | (
          { __typename?: 'PartMainNavigationAccordion' }
          & ComponentReferenceFields_PartMainNavigationAccordion_Fragment
        ) | (
          { __typename?: 'PartMainNavigationItem' }
          & ComponentReferenceFields_PartMainNavigationItem_Fragment
        ) | (
          { __typename?: 'Partner' }
          & ComponentReferenceFields_Partner_Fragment
        ) | (
          { __typename?: 'PartnerSet' }
          & ComponentReferenceFields_PartnerSet_Fragment
        ) | (
          { __typename?: 'Products' }
          & ComponentReferenceFields_Products_Fragment
        ) | (
          { __typename?: 'Redirect' }
          & ComponentReferenceFields_Redirect_Fragment
        ) | (
          { __typename?: 'Redirects' }
          & ComponentReferenceFields_Redirects_Fragment
        ) | (
          { __typename?: 'SeoMetadata' }
          & ComponentReferenceFields_SeoMetadata_Fragment
        ) | (
          { __typename?: 'Series' }
          & ComponentReferenceFields_Series_Fragment
        ) | (
          { __typename?: 'SiteSettings' }
          & ComponentReferenceFields_SiteSettings_Fragment
        ) | (
          { __typename?: 'Team' }
          & ComponentReferenceFields_Team_Fragment
        ) | null>, hyperlink: Array<{ __typename?: 'Car' } | { __typename?: 'Car3D' } | { __typename?: 'ComponentProductSlider_1oyzmkwpf3d5_Master' } | { __typename?: 'ContentTag' } | { __typename?: 'Dashboard' } | { __typename?: 'Driver' } | { __typename?: 'Event' } | { __typename?: 'ExternalLink' } | { __typename?: 'Footer' } | { __typename?: 'LanguageSelectorItem' } | { __typename?: 'MainNavigation' } | { __typename?: 'Microcopy' } | { __typename?: 'MicrocopySet' } | { __typename?: 'ModalLink' } | { __typename?: 'Module916VideoImage' } | { __typename?: 'ModuleAccordion' } | { __typename?: 'ModuleAudioPlayer' } | { __typename?: 'ModuleCarTechSpecs' } | { __typename?: 'ModuleCarousel' } | { __typename?: 'ModuleCircuit' } | { __typename?: 'ModuleCookieConsentSettingsWidget' } | { __typename?: 'ModuleDriverList' } | { __typename?: 'ModuleGallery' } | { __typename?: 'ModuleHistoryCarousel' } | { __typename?: 'ModuleIframe' } | { __typename?: 'ModuleImage' } | { __typename?: 'ModuleListenToTheEngine' } | { __typename?: 'ModuleLiveTimingTable' } | { __typename?: 'ModuleMediaFeature' } | { __typename?: 'ModulePageLinkTile' } | { __typename?: 'ModuleQuickLinks' } | { __typename?: 'ModuleQuote' } | { __typename?: 'ModuleRichText' } | { __typename?: 'ModuleSideBySide' } | { __typename?: 'ModuleSpacer' } | { __typename?: 'ModuleSplitLayout' } | { __typename?: 'ModuleTable' } | { __typename?: 'ModuleTitleAndDescription' } | { __typename?: 'ModuleVideo' } | { __typename?: 'Navigation' } | { __typename?: 'NewPageHomepage' } | (
          { __typename?: 'PageArticle', slug?: string | null, sys: { __typename?: 'Sys', locale?: string | null } }
          & ComponentReferenceFields_PageArticle_Fragment
        ) | (
          { __typename?: 'PageBasic', slug?: string | null, sys: { __typename?: 'Sys', locale?: string | null } }
          & ComponentReferenceFields_PageBasic_Fragment
        ) | (
          { __typename?: 'PageCar', slug?: string | null, sys: { __typename?: 'Sys', locale?: string | null } }
          & ComponentReferenceFields_PageCar_Fragment
        ) | (
          { __typename?: 'PageCategory', mainCategory?: string | null, sys: { __typename?: 'Sys', locale?: string | null } }
          & ComponentReferenceFields_PageCategory_Fragment
        ) | (
          { __typename?: 'PageDriver', slug?: string | null, sys: { __typename?: 'Sys', locale?: string | null } }
          & ComponentReferenceFields_PageDriver_Fragment
        ) | (
          { __typename?: 'PageHomepage', sys: { __typename?: 'Sys', locale?: string | null } }
          & ComponentReferenceFields_PageHomepage_Fragment
        ) | (
          { __typename?: 'PageRaceEvent', slug?: string | null, sys: { __typename?: 'Sys', locale?: string | null } }
          & ComponentReferenceFields_PageRaceEvent_Fragment
        ) | (
          { __typename?: 'PageRaceSeries', slug?: string | null, sys: { __typename?: 'Sys', locale?: string | null } }
          & ComponentReferenceFields_PageRaceSeries_Fragment
        ) | (
          { __typename?: 'PageSearch', sys: { __typename?: 'Sys', locale?: string | null } }
          & ComponentReferenceFields_PageSearch_Fragment
        ) | (
          { __typename?: 'PageTeam', slug?: string | null, sys: { __typename?: 'Sys', locale?: string | null } }
          & ComponentReferenceFields_PageTeam_Fragment
        ) | { __typename?: 'PartAccordionItem' } | { __typename?: 'PartCarDetailsItem' } | { __typename?: 'PartCircuitHotspot' } | { __typename?: 'PartHistoryCarouselItem' } | { __typename?: 'PartMainNavigationAccordion' } | { __typename?: 'PartMainNavigationItem' } | { __typename?: 'Partner' } | { __typename?: 'PartnerSet' } | { __typename?: 'Products' } | { __typename?: 'Redirect' } | { __typename?: 'Redirects' } | { __typename?: 'SeoMetadata' } | { __typename?: 'Series' } | { __typename?: 'SiteSettings' } | { __typename?: 'Team' } | null> } } } | null }
  & ComponentReferenceFields_ModuleRichText_Fragment
);

export type ModuleRichTextQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  id: Types.Scalars['String']['input'];
}>;


export type ModuleRichTextQuery = { __typename?: 'Query', moduleRichText?: (
    { __typename?: 'ModuleRichText' }
    & ModuleRichTextFieldsFragment
  ) | null };


export const ModuleRichTextFieldsFragmentDoc = `
    fragment ModuleRichTextFields on ModuleRichText {
  ...ComponentReferenceFields
  title
  isTitleLeftAligned
  text {
    json
    links {
      entries {
        block {
          ...ComponentReferenceFields
          ... on ModuleQuote {
            ...ModuleQuoteFields
          }
          ... on ModuleTitleAndDescription {
            ...ModuleTitleAndDescriptionFields
          }
          ... on ModuleImage {
            ...ModuleImageFields
          }
          ... on ModuleVideo {
            ...ModuleVideoFields
          }
          ... on ModuleSpacer {
            ...ModuleSpacerFields
          }
          ... on ModuleAudioPlayer {
            ...ModuleAudioPlayerFields
          }
        }
        inline {
          ...ComponentReferenceFields
          ... on Microcopy {
            ...MicrocopyFields
          }
          ... on ContentTag {
            ...ContentTagFields
          }
        }
        hyperlink {
          ... on PageHomepage {
            ...ComponentReferenceFields
            sys {
              locale
            }
          }
          ... on PageSearch {
            ...ComponentReferenceFields
            sys {
              locale
            }
          }
          ... on PageArticle {
            ...ComponentReferenceFields
            sys {
              locale
            }
            slug
          }
          ... on PageBasic {
            ...ComponentReferenceFields
            sys {
              locale
            }
            slug
          }
          ... on PageCar {
            ...ComponentReferenceFields
            sys {
              locale
            }
            slug
          }
          ... on PageCategory {
            ...ComponentReferenceFields
            sys {
              locale
            }
            mainCategory
          }
          ... on PageDriver {
            ...ComponentReferenceFields
            sys {
              locale
            }
            slug
          }
          ... on PageRaceSeries {
            ...ComponentReferenceFields
            sys {
              locale
            }
            slug
          }
          ... on PageRaceEvent {
            ...ComponentReferenceFields
            sys {
              locale
            }
            slug
          }
          ... on PageTeam {
            ...ComponentReferenceFields
            sys {
              locale
            }
            slug
          }
        }
      }
    }
  }
}
    `;
export const ModuleRichTextDocument = `
    query ModuleRichText($locale: String!, $preview: Boolean, $id: String!) {
  moduleRichText(id: $id, locale: $locale, preview: $preview) {
    ...ModuleRichTextFields
  }
}
    ${ModuleRichTextFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}
${ModuleQuoteFieldsFragmentDoc}
${ModuleAudioPlayerFieldsFragmentDoc}
${Module916VideoImageFieldsFragmentDoc}
${ModuleTitleAndDescriptionFieldsFragmentDoc}
${ExternalLinkFieldsFragmentDoc}
${ModuleImageFieldsFragmentDoc}
${ModuleVideoFieldsFragmentDoc}
${ModuleSpacerFieldsFragmentDoc}
${MicrocopyFieldsFragmentDoc}
${ContentTagFieldsFragmentDoc}`;

export const useModuleRichTextQuery = <
      TData = ModuleRichTextQuery,
      TError = unknown
    >(
      variables: ModuleRichTextQueryVariables,
      options?: Omit<UseQueryOptions<ModuleRichTextQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ModuleRichTextQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ModuleRichTextQuery, TError, TData>(
      {
    queryKey: ['ModuleRichText', variables],
    queryFn: customFetcher<ModuleRichTextQuery, ModuleRichTextQueryVariables>(ModuleRichTextDocument, variables),
    ...options
  }
    )};

useModuleRichTextQuery.getKey = (variables: ModuleRichTextQueryVariables) => ['ModuleRichText', variables];


useModuleRichTextQuery.fetcher = (variables: ModuleRichTextQueryVariables, options?: RequestInit['headers']) => customFetcher<ModuleRichTextQuery, ModuleRichTextQueryVariables>(ModuleRichTextDocument, variables, options);
