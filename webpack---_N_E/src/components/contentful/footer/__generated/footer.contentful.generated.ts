import * as Types from '../../../../lib/contentful/__generated/graphql.types';

import { ComponentReferenceFields_Car_Fragment, ComponentReferenceFields_Car3D_Fragment, ComponentReferenceFields_ComponentProductSlider_1oyzmkwpf3d5_Master_Fragment, ComponentReferenceFields_ContentTag_Fragment, ComponentReferenceFields_Dashboard_Fragment, ComponentReferenceFields_Driver_Fragment, ComponentReferenceFields_Event_Fragment, ComponentReferenceFields_ExternalLink_Fragment, ComponentReferenceFields_Footer_Fragment, ComponentReferenceFields_LanguageSelectorItem_Fragment, ComponentReferenceFields_MainNavigation_Fragment, ComponentReferenceFields_Microcopy_Fragment, ComponentReferenceFields_MicrocopySet_Fragment, ComponentReferenceFields_ModalLink_Fragment, ComponentReferenceFields_Module916VideoImage_Fragment, ComponentReferenceFields_ModuleAccordion_Fragment, ComponentReferenceFields_ModuleAudioPlayer_Fragment, ComponentReferenceFields_ModuleCarTechSpecs_Fragment, ComponentReferenceFields_ModuleCarousel_Fragment, ComponentReferenceFields_ModuleCircuit_Fragment, ComponentReferenceFields_ModuleCookieConsentSettingsWidget_Fragment, ComponentReferenceFields_ModuleDriverList_Fragment, ComponentReferenceFields_ModuleGallery_Fragment, ComponentReferenceFields_ModuleHistoryCarousel_Fragment, ComponentReferenceFields_ModuleIframe_Fragment, ComponentReferenceFields_ModuleImage_Fragment, ComponentReferenceFields_ModuleListenToTheEngine_Fragment, ComponentReferenceFields_ModuleLiveTimingTable_Fragment, ComponentReferenceFields_ModuleMediaFeature_Fragment, ComponentReferenceFields_ModulePageLinkTile_Fragment, ComponentReferenceFields_ModuleQuickLinks_Fragment, ComponentReferenceFields_ModuleQuote_Fragment, ComponentReferenceFields_ModuleRichText_Fragment, ComponentReferenceFields_ModuleSideBySide_Fragment, ComponentReferenceFields_ModuleSpacer_Fragment, ComponentReferenceFields_ModuleSplitLayout_Fragment, ComponentReferenceFields_ModuleTable_Fragment, ComponentReferenceFields_ModuleTitleAndDescription_Fragment, ComponentReferenceFields_ModuleVideo_Fragment, ComponentReferenceFields_Navigation_Fragment, ComponentReferenceFields_NewPageHomepage_Fragment, ComponentReferenceFields_PageArticle_Fragment, ComponentReferenceFields_PageBasic_Fragment, ComponentReferenceFields_PageCar_Fragment, ComponentReferenceFields_PageCategory_Fragment, ComponentReferenceFields_PageDriver_Fragment, ComponentReferenceFields_PageHomepage_Fragment, ComponentReferenceFields_PageRaceEvent_Fragment, ComponentReferenceFields_PageRaceSeries_Fragment, ComponentReferenceFields_PageSearch_Fragment, ComponentReferenceFields_PageTeam_Fragment, ComponentReferenceFields_PartAccordionItem_Fragment, ComponentReferenceFields_PartCarDetailsItem_Fragment, ComponentReferenceFields_PartCircuitHotspot_Fragment, ComponentReferenceFields_PartHistoryCarouselItem_Fragment, ComponentReferenceFields_PartMainNavigationAccordion_Fragment, ComponentReferenceFields_PartMainNavigationItem_Fragment, ComponentReferenceFields_Partner_Fragment, ComponentReferenceFields_PartnerSet_Fragment, ComponentReferenceFields_Products_Fragment, ComponentReferenceFields_Redirect_Fragment, ComponentReferenceFields_Redirects_Fragment, ComponentReferenceFields_SeoMetadata_Fragment, ComponentReferenceFields_Series_Fragment, ComponentReferenceFields_SiteSettings_Fragment, ComponentReferenceFields_Team_Fragment } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { PartnerSetFieldsFragment, PartnerFieldsFragment } from '../../partner-set/__generated/partner-set.contentful.generated';
import { NavigationFieldsFragment } from '../../navigation/__generated/navigation.contentful.generated';
import { PageArticleLinkToFieldsFragment, PageBasicLinkToFieldsFragment, PageCarLinkToFieldsFragment, PageCategoryLinkToFieldsFragment, PageDriverLinkToFieldsFragment, PageHomepageLinkToFieldsFragment, PageRaceSeriesLinkToFieldsFragment, PageRaceEventLinkToFieldsFragment, PageTeamLinkToFieldsFragment, PageSearchLinkToFieldsFragment, ExternalLinkFieldsFragment, NewPageHomepageLinkToFieldsFragment } from '../../../../lib/contentful/link-fragments/__generated/link-fragments.contentful.generated';
import { ContentTagFieldsFragment } from '../../../../lib/contentful/content-tag/__generated/content-tag.contentful.generated';
import { PageRaceEventFieldsFragment } from '../../page-race-event/__generated/page-race-event.contentful.generated';
import { EventFieldsFragment } from '../../event/__generated/event.contentful.generated';
import { TeamFieldsFragment } from '../../team/__generated/team.contentful.generated';
import { ComponentReferenceFieldsFragmentDoc } from '../../../../lib/contentful/__generated/component-map.contentful.generated';
import { PartnerSetFieldsFragmentDoc, PartnerFieldsFragmentDoc } from '../../partner-set/__generated/partner-set.contentful.generated';
import { NavigationFieldsFragmentDoc } from '../../navigation/__generated/navigation.contentful.generated';
import { PageArticleLinkToFieldsFragmentDoc, PageBasicLinkToFieldsFragmentDoc, PageCarLinkToFieldsFragmentDoc, PageCategoryLinkToFieldsFragmentDoc, PageDriverLinkToFieldsFragmentDoc, PageHomepageLinkToFieldsFragmentDoc, PageRaceSeriesLinkToFieldsFragmentDoc, PageRaceEventLinkToFieldsFragmentDoc, PageTeamLinkToFieldsFragmentDoc, PageSearchLinkToFieldsFragmentDoc, ExternalLinkFieldsFragmentDoc, NewPageHomepageLinkToFieldsFragmentDoc } from '../../../../lib/contentful/link-fragments/__generated/link-fragments.contentful.generated';
import { ContentTagFieldsFragmentDoc } from '../../../../lib/contentful/content-tag/__generated/content-tag.contentful.generated';
import { PageRaceEventFieldsFragmentDoc } from '../../page-race-event/__generated/page-race-event.contentful.generated';
import { EventFieldsFragmentDoc } from '../../event/__generated/event.contentful.generated';
import { TeamFieldsFragmentDoc } from '../../team/__generated/team.contentful.generated';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@/lib/contentful/fetch-config';
export type FooterFieldsFragment = (
  { __typename?: 'Footer', copyrightText?: string | null, partnerSet?: (
    { __typename?: 'PartnerSet' }
    & PartnerSetFieldsFragment
  ) | null, primaryNavigation?: (
    { __typename?: 'Navigation' }
    & NavigationFieldsFragment
  ) | null, secondaryNavigation?: (
    { __typename?: 'Navigation' }
    & NavigationFieldsFragment
  ) | null, tertiaryNavigation?: (
    { __typename?: 'Navigation' }
    & NavigationFieldsFragment
  ) | null, quaternaryNavigation?: (
    { __typename?: 'Navigation' }
    & NavigationFieldsFragment
  ) | null, legalDisclaimer?: { __typename: 'FooterLegalDisclaimer', json: any, links: { __typename?: 'FooterLegalDisclaimerLinks', entries: { __typename?: 'FooterLegalDisclaimerEntries', block: Array<(
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
        ) | null>, hyperlink: Array<(
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
        ) | null> } } } | null }
  & ComponentReferenceFields_Footer_Fragment
);

export type FooterCollectionQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview: Types.Scalars['Boolean']['input'];
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type FooterCollectionQuery = { __typename?: 'Query', footerCollection?: { __typename?: 'FooterCollection', items: Array<(
      { __typename?: 'Footer' }
      & FooterFieldsFragment
    ) | null> } | null };

export type FooterQueryVariables = Types.Exact<{
  locale: Types.Scalars['String']['input'];
  preview: Types.Scalars['Boolean']['input'];
  id: Types.Scalars['String']['input'];
}>;


export type FooterQuery = { __typename?: 'Query', footer?: (
    { __typename?: 'Footer' }
    & FooterFieldsFragment
  ) | null };


export const FooterFieldsFragmentDoc = `
    fragment FooterFields on Footer {
  ...ComponentReferenceFields
  copyrightText
  partnerSet {
    ...PartnerSetFields
  }
  primaryNavigation {
    ...NavigationFields
  }
  secondaryNavigation {
    ...NavigationFields
  }
  tertiaryNavigation {
    ...NavigationFields
  }
  quaternaryNavigation {
    ...NavigationFields
  }
  legalDisclaimer {
    __typename
    json
    links {
      entries {
        block {
          ...ComponentReferenceFields
        }
        inline {
          ...ComponentReferenceFields
        }
        hyperlink {
          ...ComponentReferenceFields
        }
      }
    }
  }
}
    `;
export const FooterCollectionDocument = `
    query FooterCollection($locale: String!, $preview: Boolean!, $limit: Int = 1) {
  footerCollection(locale: $locale, preview: $preview, limit: $limit) {
    items {
      ...FooterFields
    }
  }
}
    ${FooterFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}
${PartnerSetFieldsFragmentDoc}
${PartnerFieldsFragmentDoc}
${NavigationFieldsFragmentDoc}
${PageArticleLinkToFieldsFragmentDoc}
${ContentTagFieldsFragmentDoc}
${PageBasicLinkToFieldsFragmentDoc}
${PageCarLinkToFieldsFragmentDoc}
${PageCategoryLinkToFieldsFragmentDoc}
${PageDriverLinkToFieldsFragmentDoc}
${PageHomepageLinkToFieldsFragmentDoc}
${PageRaceSeriesLinkToFieldsFragmentDoc}
${PageRaceEventFieldsFragmentDoc}
${PageRaceEventLinkToFieldsFragmentDoc}
${EventFieldsFragmentDoc}
${PageSearchLinkToFieldsFragmentDoc}
${PageTeamLinkToFieldsFragmentDoc}
${TeamFieldsFragmentDoc}
${ExternalLinkFieldsFragmentDoc}`;

export const useFooterCollectionQuery = <
      TData = FooterCollectionQuery,
      TError = unknown
    >(
      variables: FooterCollectionQueryVariables,
      options?: Omit<UseQueryOptions<FooterCollectionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FooterCollectionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FooterCollectionQuery, TError, TData>(
      {
    queryKey: ['FooterCollection', variables],
    queryFn: customFetcher<FooterCollectionQuery, FooterCollectionQueryVariables>(FooterCollectionDocument, variables),
    ...options
  }
    )};

useFooterCollectionQuery.getKey = (variables: FooterCollectionQueryVariables) => ['FooterCollection', variables];


useFooterCollectionQuery.fetcher = (variables: FooterCollectionQueryVariables, options?: RequestInit['headers']) => customFetcher<FooterCollectionQuery, FooterCollectionQueryVariables>(FooterCollectionDocument, variables, options);

export const FooterDocument = `
    query Footer($locale: String!, $preview: Boolean!, $id: String!) {
  footer(id: $id, locale: $locale, preview: $preview) {
    ...FooterFields
  }
}
    ${FooterFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}
${PartnerSetFieldsFragmentDoc}
${PartnerFieldsFragmentDoc}
${NavigationFieldsFragmentDoc}
${PageArticleLinkToFieldsFragmentDoc}
${ContentTagFieldsFragmentDoc}
${PageBasicLinkToFieldsFragmentDoc}
${PageCarLinkToFieldsFragmentDoc}
${PageCategoryLinkToFieldsFragmentDoc}
${PageDriverLinkToFieldsFragmentDoc}
${PageHomepageLinkToFieldsFragmentDoc}
${PageRaceSeriesLinkToFieldsFragmentDoc}
${PageRaceEventFieldsFragmentDoc}
${PageRaceEventLinkToFieldsFragmentDoc}
${EventFieldsFragmentDoc}
${PageSearchLinkToFieldsFragmentDoc}
${PageTeamLinkToFieldsFragmentDoc}
${TeamFieldsFragmentDoc}
${ExternalLinkFieldsFragmentDoc}`;

export const useFooterQuery = <
      TData = FooterQuery,
      TError = unknown
    >(
      variables: FooterQueryVariables,
      options?: Omit<UseQueryOptions<FooterQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FooterQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FooterQuery, TError, TData>(
      {
    queryKey: ['Footer', variables],
    queryFn: customFetcher<FooterQuery, FooterQueryVariables>(FooterDocument, variables),
    ...options
  }
    )};

useFooterQuery.getKey = (variables: FooterQueryVariables) => ['Footer', variables];


useFooterQuery.fetcher = (variables: FooterQueryVariables, options?: RequestInit['headers']) => customFetcher<FooterQuery, FooterQueryVariables>(FooterDocument, variables, options);
