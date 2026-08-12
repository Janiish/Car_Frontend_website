import * as Types from '../../../../lib/contentful/__generated/graphql.types';

import { PageArticleLinkToFieldsFragment, PageBasicLinkToFieldsFragment, PageCarLinkToFieldsFragment, PageCategoryLinkToFieldsFragment, PageDriverLinkToFieldsFragment, PageHomepageLinkToFieldsFragment, PageRaceSeriesLinkToFieldsFragment, PageRaceEventLinkToFieldsFragment, PageTeamLinkToFieldsFragment, PageSearchLinkToFieldsFragment, ExternalLinkFieldsFragment, NewPageHomepageLinkToFieldsFragment } from '../../../../lib/contentful/link-fragments/__generated/link-fragments.contentful.generated';
import { ComponentReferenceFields_Car_Fragment, ComponentReferenceFields_Car3D_Fragment, ComponentReferenceFields_ComponentProductSlider_1oyzmkwpf3d5_Master_Fragment, ComponentReferenceFields_ContentTag_Fragment, ComponentReferenceFields_Dashboard_Fragment, ComponentReferenceFields_Driver_Fragment, ComponentReferenceFields_Event_Fragment, ComponentReferenceFields_ExternalLink_Fragment, ComponentReferenceFields_Footer_Fragment, ComponentReferenceFields_LanguageSelectorItem_Fragment, ComponentReferenceFields_MainNavigation_Fragment, ComponentReferenceFields_Microcopy_Fragment, ComponentReferenceFields_MicrocopySet_Fragment, ComponentReferenceFields_ModalLink_Fragment, ComponentReferenceFields_Module916VideoImage_Fragment, ComponentReferenceFields_ModuleAccordion_Fragment, ComponentReferenceFields_ModuleAudioPlayer_Fragment, ComponentReferenceFields_ModuleCarTechSpecs_Fragment, ComponentReferenceFields_ModuleCarousel_Fragment, ComponentReferenceFields_ModuleCircuit_Fragment, ComponentReferenceFields_ModuleCookieConsentSettingsWidget_Fragment, ComponentReferenceFields_ModuleDriverList_Fragment, ComponentReferenceFields_ModuleGallery_Fragment, ComponentReferenceFields_ModuleHistoryCarousel_Fragment, ComponentReferenceFields_ModuleIframe_Fragment, ComponentReferenceFields_ModuleImage_Fragment, ComponentReferenceFields_ModuleListenToTheEngine_Fragment, ComponentReferenceFields_ModuleLiveTimingTable_Fragment, ComponentReferenceFields_ModuleMediaFeature_Fragment, ComponentReferenceFields_ModulePageLinkTile_Fragment, ComponentReferenceFields_ModuleQuickLinks_Fragment, ComponentReferenceFields_ModuleQuote_Fragment, ComponentReferenceFields_ModuleRichText_Fragment, ComponentReferenceFields_ModuleSideBySide_Fragment, ComponentReferenceFields_ModuleSpacer_Fragment, ComponentReferenceFields_ModuleSplitLayout_Fragment, ComponentReferenceFields_ModuleTable_Fragment, ComponentReferenceFields_ModuleTitleAndDescription_Fragment, ComponentReferenceFields_ModuleVideo_Fragment, ComponentReferenceFields_Navigation_Fragment, ComponentReferenceFields_NewPageHomepage_Fragment, ComponentReferenceFields_PageArticle_Fragment, ComponentReferenceFields_PageBasic_Fragment, ComponentReferenceFields_PageCar_Fragment, ComponentReferenceFields_PageCategory_Fragment, ComponentReferenceFields_PageDriver_Fragment, ComponentReferenceFields_PageHomepage_Fragment, ComponentReferenceFields_PageRaceEvent_Fragment, ComponentReferenceFields_PageRaceSeries_Fragment, ComponentReferenceFields_PageSearch_Fragment, ComponentReferenceFields_PageTeam_Fragment, ComponentReferenceFields_PartAccordionItem_Fragment, ComponentReferenceFields_PartCarDetailsItem_Fragment, ComponentReferenceFields_PartCircuitHotspot_Fragment, ComponentReferenceFields_PartHistoryCarouselItem_Fragment, ComponentReferenceFields_PartMainNavigationAccordion_Fragment, ComponentReferenceFields_PartMainNavigationItem_Fragment, ComponentReferenceFields_Partner_Fragment, ComponentReferenceFields_PartnerSet_Fragment, ComponentReferenceFields_Products_Fragment, ComponentReferenceFields_Redirect_Fragment, ComponentReferenceFields_Redirects_Fragment, ComponentReferenceFields_SeoMetadata_Fragment, ComponentReferenceFields_Series_Fragment, ComponentReferenceFields_SiteSettings_Fragment, ComponentReferenceFields_Team_Fragment } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { ContentTagFieldsFragment } from '../../../../lib/contentful/content-tag/__generated/content-tag.contentful.generated';
import { ModuleTitleAndDescriptionFieldsFragment } from '../../module-title-and-description/__generated/module-title-and-description.contentful.generated';
import { ModuleAudioPlayerFieldsFragment } from '../../module-audio-player/__generated/module-audio-player.contentful.generated';
import { Module916VideoImageFieldsFragment } from '../../module-916-video-image/__generated/module-916-video-image.contentful.generated';
import { ModuleQuoteFieldsFragment } from '../../module-quote/__generated/module-quote.contentful.generated';
import { ModuleImageFieldsFragment } from '../../module-image/__generated/module-image.contentful.generated';
import { ModuleSpacerFieldsFragment } from '../../module-spacer/__generated/module-spacer.contentful.generated';
import { ModuleVideoFieldsFragment } from '../../module-video/__generated/module-video.contentful.generated';
import { ModuleCarTechSpecsFieldsFragment } from '../../module-car-tech-specs/__generated/module-car-tech-specs.contentful.generated';
import { CarFieldsFragment, PartCarDetailItemFieldsFragment } from '../../car/__generated/car.contentful.generated';
import { MicrocopyFieldsFragment, MicrocopySetFieldsFragment } from '../../../../lib/contentful/microcopy/__generated/microcopy-sets.contentful.generated';
import { PartnerSetFieldsFragment, PartnerFieldsFragment } from '../../partner-set/__generated/partner-set.contentful.generated';
import { PageArticleLinkToFieldsFragmentDoc, PageBasicLinkToFieldsFragmentDoc, PageCarLinkToFieldsFragmentDoc, PageCategoryLinkToFieldsFragmentDoc, PageDriverLinkToFieldsFragmentDoc, PageHomepageLinkToFieldsFragmentDoc, PageRaceSeriesLinkToFieldsFragmentDoc, PageRaceEventLinkToFieldsFragmentDoc, PageTeamLinkToFieldsFragmentDoc, PageSearchLinkToFieldsFragmentDoc, ExternalLinkFieldsFragmentDoc, NewPageHomepageLinkToFieldsFragmentDoc } from '../../../../lib/contentful/link-fragments/__generated/link-fragments.contentful.generated';
import { ComponentReferenceFieldsFragmentDoc } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { ContentTagFieldsFragmentDoc } from '../../../../lib/contentful/content-tag/__generated/content-tag.contentful.generated';
import { ModuleTitleAndDescriptionFieldsFragmentDoc } from '../../module-title-and-description/__generated/module-title-and-description.contentful.generated';
import { ModuleAudioPlayerFieldsFragmentDoc } from '../../module-audio-player/__generated/module-audio-player.contentful.generated';
import { Module916VideoImageFieldsFragmentDoc } from '../../module-916-video-image/__generated/module-916-video-image.contentful.generated';
import { ModuleQuoteFieldsFragmentDoc } from '../../module-quote/__generated/module-quote.contentful.generated';
import { ModuleImageFieldsFragmentDoc } from '../../module-image/__generated/module-image.contentful.generated';
import { ModuleSpacerFieldsFragmentDoc } from '../../module-spacer/__generated/module-spacer.contentful.generated';
import { ModuleVideoFieldsFragmentDoc } from '../../module-video/__generated/module-video.contentful.generated';
import { ModuleCarTechSpecsFieldsFragmentDoc } from '../../module-car-tech-specs/__generated/module-car-tech-specs.contentful.generated';
import { CarFieldsFragmentDoc, PartCarDetailItemFieldsFragmentDoc } from '../../car/__generated/car.contentful.generated';
import { MicrocopyFieldsFragmentDoc, MicrocopySetFieldsFragmentDoc } from '../../../../lib/contentful/microcopy/__generated/microcopy-sets.contentful.generated';
import { PartnerSetFieldsFragmentDoc, PartnerFieldsFragmentDoc } from '../../partner-set/__generated/partner-set.contentful.generated';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@/lib/contentful/fetch-config';
export type PageArticleFieldsFragment = (
  { __typename?: 'PageArticle', aiGenerated?: string | null, presentation?: string | null, introductionCaption?: string | null, introduction?: string | null, introHeading?: string | null, introColumn1?: string | null, introColumn2?: string | null, seoMetaDescription?: string | null, robotFollow?: string | null, robotIndex?: string | null, bodyText?: { __typename?: 'PageArticleBodyText', json: any, links: { __typename?: 'PageArticleBodyTextLinks', entries: { __typename?: 'PageArticleBodyTextEntries', block: Array<(
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
          & ModuleCarTechSpecsFieldsFragment
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
        ) | { __typename?: 'PartAccordionItem' } | { __typename?: 'PartCarDetailsItem' } | { __typename?: 'PartCircuitHotspot' } | { __typename?: 'PartHistoryCarouselItem' } | { __typename?: 'PartMainNavigationAccordion' } | { __typename?: 'PartMainNavigationItem' } | { __typename?: 'Partner' } | { __typename?: 'PartnerSet' } | { __typename?: 'Products' } | { __typename?: 'Redirect' } | { __typename?: 'Redirects' } | { __typename?: 'SeoMetadata' } | { __typename?: 'Series' } | { __typename?: 'SiteSettings' } | { __typename?: 'Team' } | null> } } } | null, tagsCollection?: { __typename?: 'PageArticleTagsCollection', items: Array<(
      { __typename?: 'ContentTag' }
      & ContentTagFieldsFragment
    ) | null> } | null, modulesCollection?: { __typename: 'PageArticleModulesCollection', items: Array<{ __typename: 'ModuleAccordion', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleCarTechSpecs', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleCarousel', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleGallery', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleImage', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleLiveTimingTable', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleMediaFeature', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModulePageLinkTile', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleQuickLinks', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleQuote', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleRichText', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleSpacer', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleTable', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleTitleAndDescription', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ModuleVideo', sys: { __typename?: 'Sys', id: string } } | null> } | null, partnerSet?: (
    { __typename?: 'PartnerSet' }
    & PartnerSetFieldsFragment
  ) | null }
  & PageArticleLinkToFieldsFragment
);

export type PageArticleCollectionQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  slug: Types.Scalars['String']['input'];
}>;


export type PageArticleCollectionQuery = { __typename?: 'Query', pageArticleCollection?: { __typename?: 'PageArticleCollection', items: Array<(
      { __typename?: 'PageArticle' }
      & PageArticleFieldsFragment
    ) | null> } | null };

export type AllPageArticleCollectionQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type AllPageArticleCollectionQuery = { __typename?: 'Query', pages?: { __typename?: 'PageArticleCollection', total: number, skip: number, limit: number, items: Array<(
      { __typename?: 'PageArticle' }
      & PageArticleLinkToFieldsFragment
    ) | null> } | null };

export type AllPageArticleCollectionByContentTagQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  tags?: Types.InputMaybe<Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']>;
}>;


export type AllPageArticleCollectionByContentTagQuery = { __typename?: 'Query', pages?: { __typename?: 'PageArticleCollection', total: number, skip: number, limit: number, items: Array<(
      { __typename?: 'PageArticle' }
      & PageArticleLinkToFieldsFragment
    ) | null> } | null };

export type PageArticleQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  id: Types.Scalars['String']['input'];
}>;


export type PageArticleQuery = { __typename?: 'Query', page?: (
    { __typename?: 'PageArticle' }
    & PageArticleFieldsFragment
  ) | null, microcopySetCollection?: { __typename?: 'MicrocopySetCollection', items: Array<(
      { __typename?: 'MicrocopySet' }
      & MicrocopySetFieldsFragment
    ) | null> } | null };

export type LatestPageArticleByContentTagsQueryVariables = Types.Exact<{
  tags: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
  locale: Types.Scalars['String']['input'];
  preview?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type LatestPageArticleByContentTagsQuery = { __typename?: 'Query', pageArticleCollection?: { __typename?: 'PageArticleCollection', items: Array<(
      { __typename?: 'PageArticle', slug?: string | null, title?: string | null, introduction?: string | null }
      & ComponentReferenceFields_PageArticle_Fragment
    ) | null> } | null };


export const PageArticleFieldsFragmentDoc = `
    fragment PageArticleFields on PageArticle {
  ...PageArticleLinkToFields
  aiGenerated
  presentation
  introductionCaption
  introduction
  introHeading
  introColumn1
  introColumn2
  bodyText {
    json
    links {
      entries {
        block {
          ...ComponentReferenceFields
          ... on ModuleTitleAndDescription {
            ...ModuleTitleAndDescriptionFields
          }
          ... on ModuleQuote {
            ...ModuleQuoteFields
          }
          ... on ModuleImage {
            ...ModuleImageFields
          }
          ... on ModuleSpacer {
            ...ModuleSpacerFields
          }
          ... on ModuleAudioPlayer {
            ...ModuleAudioPlayerFields
          }
          ... on ModuleVideo {
            ...ModuleVideoFields
          }
          ... on ModuleCarTechSpecs {
            ...ModuleCarTechSpecsFields
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
  tagsCollection {
    items {
      ...ContentTagFields
    }
  }
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
export const PageArticleCollectionDocument = `
    query PageArticleCollection($locale: String!, $preview: Boolean, $slug: String!) {
  pageArticleCollection(
    limit: 1
    locale: $locale
    preview: $preview
    where: {slug: $slug}
  ) {
    items {
      ...PageArticleFields
    }
  }
}
    ${PageArticleFieldsFragmentDoc}
${PageArticleLinkToFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}
${ContentTagFieldsFragmentDoc}
${ModuleTitleAndDescriptionFieldsFragmentDoc}
${ModuleAudioPlayerFieldsFragmentDoc}
${Module916VideoImageFieldsFragmentDoc}
${ExternalLinkFieldsFragmentDoc}
${ModuleQuoteFieldsFragmentDoc}
${ModuleImageFieldsFragmentDoc}
${ModuleSpacerFieldsFragmentDoc}
${ModuleVideoFieldsFragmentDoc}
${ModuleCarTechSpecsFieldsFragmentDoc}
${CarFieldsFragmentDoc}
${MicrocopyFieldsFragmentDoc}
${PartnerSetFieldsFragmentDoc}
${PartnerFieldsFragmentDoc}`;

export const usePageArticleCollectionQuery = <
      TData = PageArticleCollectionQuery,
      TError = unknown
    >(
      variables: PageArticleCollectionQueryVariables,
      options?: Omit<UseQueryOptions<PageArticleCollectionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<PageArticleCollectionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<PageArticleCollectionQuery, TError, TData>(
      {
    queryKey: ['PageArticleCollection', variables],
    queryFn: customFetcher<PageArticleCollectionQuery, PageArticleCollectionQueryVariables>(PageArticleCollectionDocument, variables),
    ...options
  }
    )};

usePageArticleCollectionQuery.getKey = (variables: PageArticleCollectionQueryVariables) => ['PageArticleCollection', variables];


usePageArticleCollectionQuery.fetcher = (variables: PageArticleCollectionQueryVariables, options?: RequestInit['headers']) => customFetcher<PageArticleCollectionQuery, PageArticleCollectionQueryVariables>(PageArticleCollectionDocument, variables, options);

export const AllPageArticleCollectionDocument = `
    query AllPageArticleCollection($locale: String!, $preview: Boolean, $limit: Int = 1, $skip: Int = 0) {
  pages: pageArticleCollection(
    limit: $limit
    locale: $locale
    preview: $preview
    skip: $skip
    order: customFirstPublishedDate_DESC
    where: {slug_exists: true}
  ) {
    total
    skip
    limit
    items {
      ...PageArticleLinkToFields
    }
  }
}
    ${PageArticleLinkToFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}
${ContentTagFieldsFragmentDoc}`;

export const useAllPageArticleCollectionQuery = <
      TData = AllPageArticleCollectionQuery,
      TError = unknown
    >(
      variables: AllPageArticleCollectionQueryVariables,
      options?: Omit<UseQueryOptions<AllPageArticleCollectionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AllPageArticleCollectionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<AllPageArticleCollectionQuery, TError, TData>(
      {
    queryKey: ['AllPageArticleCollection', variables],
    queryFn: customFetcher<AllPageArticleCollectionQuery, AllPageArticleCollectionQueryVariables>(AllPageArticleCollectionDocument, variables),
    ...options
  }
    )};

useAllPageArticleCollectionQuery.getKey = (variables: AllPageArticleCollectionQueryVariables) => ['AllPageArticleCollection', variables];


useAllPageArticleCollectionQuery.fetcher = (variables: AllPageArticleCollectionQueryVariables, options?: RequestInit['headers']) => customFetcher<AllPageArticleCollectionQuery, AllPageArticleCollectionQueryVariables>(AllPageArticleCollectionDocument, variables, options);

export const AllPageArticleCollectionByContentTagDocument = `
    query AllPageArticleCollectionByContentTag($locale: String!, $preview: Boolean, $limit: Int = 1, $skip: Int = 0, $tags: [String!]) {
  pages: pageArticleCollection(
    limit: $limit
    locale: $locale
    preview: $preview
    skip: $skip
    order: customFirstPublishedDate_DESC
    where: {tags: {tagKey_in: $tags}, slug_exists: true}
  ) {
    total
    skip
    limit
    items {
      ...PageArticleLinkToFields
    }
  }
}
    ${PageArticleLinkToFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}
${ContentTagFieldsFragmentDoc}`;

export const useAllPageArticleCollectionByContentTagQuery = <
      TData = AllPageArticleCollectionByContentTagQuery,
      TError = unknown
    >(
      variables: AllPageArticleCollectionByContentTagQueryVariables,
      options?: Omit<UseQueryOptions<AllPageArticleCollectionByContentTagQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AllPageArticleCollectionByContentTagQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<AllPageArticleCollectionByContentTagQuery, TError, TData>(
      {
    queryKey: ['AllPageArticleCollectionByContentTag', variables],
    queryFn: customFetcher<AllPageArticleCollectionByContentTagQuery, AllPageArticleCollectionByContentTagQueryVariables>(AllPageArticleCollectionByContentTagDocument, variables),
    ...options
  }
    )};

useAllPageArticleCollectionByContentTagQuery.getKey = (variables: AllPageArticleCollectionByContentTagQueryVariables) => ['AllPageArticleCollectionByContentTag', variables];


useAllPageArticleCollectionByContentTagQuery.fetcher = (variables: AllPageArticleCollectionByContentTagQueryVariables, options?: RequestInit['headers']) => customFetcher<AllPageArticleCollectionByContentTagQuery, AllPageArticleCollectionByContentTagQueryVariables>(AllPageArticleCollectionByContentTagDocument, variables, options);

export const PageArticleDocument = `
    query PageArticle($locale: String!, $preview: Boolean, $id: String!) {
  page: pageArticle(id: $id, locale: $locale, preview: $preview) {
    ...PageArticleFields
  }
  microcopySetCollection(
    locale: $locale
    preview: $preview
    where: {key_in: ["moduleAudioPlayer"]}
  ) {
    items {
      ...MicrocopySetFields
    }
  }
}
    ${PageArticleFieldsFragmentDoc}
${PageArticleLinkToFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}
${ContentTagFieldsFragmentDoc}
${ModuleTitleAndDescriptionFieldsFragmentDoc}
${ModuleAudioPlayerFieldsFragmentDoc}
${Module916VideoImageFieldsFragmentDoc}
${ExternalLinkFieldsFragmentDoc}
${ModuleQuoteFieldsFragmentDoc}
${ModuleImageFieldsFragmentDoc}
${ModuleSpacerFieldsFragmentDoc}
${ModuleVideoFieldsFragmentDoc}
${ModuleCarTechSpecsFieldsFragmentDoc}
${CarFieldsFragmentDoc}
${MicrocopyFieldsFragmentDoc}
${PartnerSetFieldsFragmentDoc}
${PartnerFieldsFragmentDoc}
${MicrocopySetFieldsFragmentDoc}`;

export const usePageArticleQuery = <
      TData = PageArticleQuery,
      TError = unknown
    >(
      variables: PageArticleQueryVariables,
      options?: Omit<UseQueryOptions<PageArticleQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<PageArticleQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<PageArticleQuery, TError, TData>(
      {
    queryKey: ['PageArticle', variables],
    queryFn: customFetcher<PageArticleQuery, PageArticleQueryVariables>(PageArticleDocument, variables),
    ...options
  }
    )};

usePageArticleQuery.getKey = (variables: PageArticleQueryVariables) => ['PageArticle', variables];


usePageArticleQuery.fetcher = (variables: PageArticleQueryVariables, options?: RequestInit['headers']) => customFetcher<PageArticleQuery, PageArticleQueryVariables>(PageArticleDocument, variables, options);

export const LatestPageArticleByContentTagsDocument = `
    query LatestPageArticleByContentTags($tags: [String!]!, $locale: String!, $preview: Boolean, $limit: Int = 5) {
  pageArticleCollection(
    limit: $limit
    locale: $locale
    preview: $preview
    where: {tags: {tagKey_in: $tags}}
    order: customFirstPublishedDate_DESC
  ) {
    items {
      ...ComponentReferenceFields
      slug
      title
      introduction
    }
  }
}
    ${ComponentReferenceFieldsFragmentDoc}`;

export const useLatestPageArticleByContentTagsQuery = <
      TData = LatestPageArticleByContentTagsQuery,
      TError = unknown
    >(
      variables: LatestPageArticleByContentTagsQueryVariables,
      options?: Omit<UseQueryOptions<LatestPageArticleByContentTagsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<LatestPageArticleByContentTagsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<LatestPageArticleByContentTagsQuery, TError, TData>(
      {
    queryKey: ['LatestPageArticleByContentTags', variables],
    queryFn: customFetcher<LatestPageArticleByContentTagsQuery, LatestPageArticleByContentTagsQueryVariables>(LatestPageArticleByContentTagsDocument, variables),
    ...options
  }
    )};

useLatestPageArticleByContentTagsQuery.getKey = (variables: LatestPageArticleByContentTagsQueryVariables) => ['LatestPageArticleByContentTags', variables];


useLatestPageArticleByContentTagsQuery.fetcher = (variables: LatestPageArticleByContentTagsQueryVariables, options?: RequestInit['headers']) => customFetcher<LatestPageArticleByContentTagsQuery, LatestPageArticleByContentTagsQueryVariables>(LatestPageArticleByContentTagsDocument, variables, options);
