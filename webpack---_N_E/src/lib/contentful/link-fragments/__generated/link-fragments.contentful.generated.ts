import * as Types from '../../__generated/graphql.types';

import { ComponentReferenceFields_Car_Fragment, ComponentReferenceFields_Car3D_Fragment, ComponentReferenceFields_ComponentProductSlider_1oyzmkwpf3d5_Master_Fragment, ComponentReferenceFields_ContentTag_Fragment, ComponentReferenceFields_Dashboard_Fragment, ComponentReferenceFields_Driver_Fragment, ComponentReferenceFields_Event_Fragment, ComponentReferenceFields_ExternalLink_Fragment, ComponentReferenceFields_Footer_Fragment, ComponentReferenceFields_LanguageSelectorItem_Fragment, ComponentReferenceFields_MainNavigation_Fragment, ComponentReferenceFields_Microcopy_Fragment, ComponentReferenceFields_MicrocopySet_Fragment, ComponentReferenceFields_ModalLink_Fragment, ComponentReferenceFields_Module916VideoImage_Fragment, ComponentReferenceFields_ModuleAccordion_Fragment, ComponentReferenceFields_ModuleAudioPlayer_Fragment, ComponentReferenceFields_ModuleCarTechSpecs_Fragment, ComponentReferenceFields_ModuleCarousel_Fragment, ComponentReferenceFields_ModuleCircuit_Fragment, ComponentReferenceFields_ModuleCookieConsentSettingsWidget_Fragment, ComponentReferenceFields_ModuleDriverList_Fragment, ComponentReferenceFields_ModuleGallery_Fragment, ComponentReferenceFields_ModuleHistoryCarousel_Fragment, ComponentReferenceFields_ModuleIframe_Fragment, ComponentReferenceFields_ModuleImage_Fragment, ComponentReferenceFields_ModuleListenToTheEngine_Fragment, ComponentReferenceFields_ModuleLiveTimingTable_Fragment, ComponentReferenceFields_ModuleMediaFeature_Fragment, ComponentReferenceFields_ModulePageLinkTile_Fragment, ComponentReferenceFields_ModuleQuickLinks_Fragment, ComponentReferenceFields_ModuleQuote_Fragment, ComponentReferenceFields_ModuleRichText_Fragment, ComponentReferenceFields_ModuleSideBySide_Fragment, ComponentReferenceFields_ModuleSpacer_Fragment, ComponentReferenceFields_ModuleSplitLayout_Fragment, ComponentReferenceFields_ModuleTable_Fragment, ComponentReferenceFields_ModuleTitleAndDescription_Fragment, ComponentReferenceFields_ModuleVideo_Fragment, ComponentReferenceFields_Navigation_Fragment, ComponentReferenceFields_NewPageHomepage_Fragment, ComponentReferenceFields_PageArticle_Fragment, ComponentReferenceFields_PageBasic_Fragment, ComponentReferenceFields_PageCar_Fragment, ComponentReferenceFields_PageCategory_Fragment, ComponentReferenceFields_PageDriver_Fragment, ComponentReferenceFields_PageHomepage_Fragment, ComponentReferenceFields_PageRaceEvent_Fragment, ComponentReferenceFields_PageRaceSeries_Fragment, ComponentReferenceFields_PageSearch_Fragment, ComponentReferenceFields_PageTeam_Fragment, ComponentReferenceFields_PartAccordionItem_Fragment, ComponentReferenceFields_PartCarDetailsItem_Fragment, ComponentReferenceFields_PartCircuitHotspot_Fragment, ComponentReferenceFields_PartHistoryCarouselItem_Fragment, ComponentReferenceFields_PartMainNavigationAccordion_Fragment, ComponentReferenceFields_PartMainNavigationItem_Fragment, ComponentReferenceFields_Partner_Fragment, ComponentReferenceFields_PartnerSet_Fragment, ComponentReferenceFields_Products_Fragment, ComponentReferenceFields_Redirect_Fragment, ComponentReferenceFields_Redirects_Fragment, ComponentReferenceFields_SeoMetadata_Fragment, ComponentReferenceFields_Series_Fragment, ComponentReferenceFields_SiteSettings_Fragment, ComponentReferenceFields_Team_Fragment } from '../../__generated/component-map.contentful.generated';
import { ContentTagFieldsFragment } from '../../content-tag/__generated/content-tag.contentful.generated';
import { PartnerSetFieldsFragment, PartnerFieldsFragment } from '../../../../components/contentful/partner-set/__generated/partner-set.contentful.generated';
import { TeamFieldsFragment } from '../../../../components/contentful/team/__generated/team.contentful.generated';
import { ComponentReferenceFieldsFragmentDoc } from '../../__generated/component-map.contentful.generated';
import { ContentTagFieldsFragmentDoc } from '../../content-tag/__generated/content-tag.contentful.generated';
import { PartnerSetFieldsFragmentDoc, PartnerFieldsFragmentDoc } from '../../../../components/contentful/partner-set/__generated/partner-set.contentful.generated';
import { TeamFieldsFragmentDoc } from '../../../../components/contentful/team/__generated/team.contentful.generated';
export type ExternalLinkFieldsFragment = { __typename: 'ExternalLink', label?: string | null, url?: string | null, sys: { __typename?: 'Sys', id: string } };

export type PageArticleLinkToFieldsFragment = (
  { __typename?: 'PageArticle', title?: string | null, topic?: string | null, linkTitle?: string | null, openGraphImage?: any | null, slug?: string | null, customFirstPublishedDate?: any | null, heroAsset?: any | null, tagsCollection?: { __typename?: 'PageArticleTagsCollection', items: Array<(
      { __typename?: 'ContentTag' }
      & ContentTagFieldsFragment
    ) | null> } | null }
  & ComponentReferenceFields_PageArticle_Fragment
);

export type PageBasicLinkToFieldsFragment = (
  { __typename?: 'PageBasic', title?: string | null, subtitle?: string | null, linkTitle?: string | null, openGraphImage?: any | null, slug?: string | null, heroAsset?: any | null, tagsCollection?: { __typename?: 'PageBasicTagsCollection', items: Array<(
      { __typename?: 'ContentTag' }
      & ContentTagFieldsFragment
    ) | null> } | null }
  & ComponentReferenceFields_PageBasic_Fragment
);

export type PageCarLinkToFieldsFragment = (
  { __typename?: 'PageCar', title?: string | null, subtitle?: string | null, linkTitle?: string | null, openGraphImage?: any | null, slug?: string | null, heroAsset?: any | null, linkLabel?: string | null, link?: (
    { __typename?: 'PageArticle', title?: string | null, linkTitle?: string | null, slug?: string | null }
    & ComponentReferenceFields_PageArticle_Fragment
  ) | (
    { __typename?: 'PageBasic', title?: string | null, linkTitle?: string | null, slug?: string | null }
    & ComponentReferenceFields_PageBasic_Fragment
  ) | (
    { __typename?: 'PageCar', title?: string | null, linkTitle?: string | null, slug?: string | null }
    & ComponentReferenceFields_PageCar_Fragment
  ) | (
    { __typename?: 'PageCategory', title?: string | null, linkTitle?: string | null, mainCategory?: string | null }
    & ComponentReferenceFields_PageCategory_Fragment
  ) | (
    { __typename?: 'PageDriver', title?: string | null, linkTitle?: string | null, slug?: string | null }
    & ComponentReferenceFields_PageDriver_Fragment
  ) | (
    { __typename?: 'PageHomepage', title?: string | null, linkTitle?: string | null }
    & ComponentReferenceFields_PageHomepage_Fragment
  ) | (
    { __typename?: 'PageRaceEvent', title?: string | null, linkTitle?: string | null, slug?: string | null }
    & ComponentReferenceFields_PageRaceEvent_Fragment
  ) | (
    { __typename?: 'PageRaceSeries', title?: string | null, linkTitle?: string | null, slug?: string | null }
    & ComponentReferenceFields_PageRaceSeries_Fragment
  ) | (
    { __typename?: 'PageSearch', title?: string | null, linkTitle?: string | null }
    & ComponentReferenceFields_PageSearch_Fragment
  ) | (
    { __typename?: 'PageTeam', title?: string | null, linkTitle?: string | null, slug?: string | null }
    & ComponentReferenceFields_PageTeam_Fragment
  ) | null, partnerSet?: (
    { __typename?: 'PartnerSet' }
    & PartnerSetFieldsFragment
  ) | null, tagsCollection?: { __typename?: 'PageCarTagsCollection', items: Array<(
      { __typename?: 'ContentTag' }
      & ContentTagFieldsFragment
    ) | null> } | null, car?: (
    { __typename?: 'Car', asset?: any | null }
    & ComponentReferenceFields_Car_Fragment
  ) | null }
  & ComponentReferenceFields_PageCar_Fragment
);

export type PageCategoryLinkToFieldsFragment = (
  { __typename?: 'PageCategory', title?: string | null, subtitle?: string | null, linkTitle?: string | null, openGraphImage?: any | null, mainCategory?: string | null, heroAsset?: any | null, introductionCaption?: string | null, introduction?: string | null }
  & ComponentReferenceFields_PageCategory_Fragment
);

export type PageDriverLinkToFieldsFragment = (
  { __typename?: 'PageDriver', title?: string | null, linkTitle?: string | null, openGraphImage?: any | null, slug?: string | null, tagsCollection?: { __typename?: 'PageDriverTagsCollection', items: Array<(
      { __typename?: 'ContentTag' }
      & ContentTagFieldsFragment
    ) | null> } | null, driver?: (
    { __typename?: 'Driver', asset?: any | null, flag?: string | null, driverName?: string | null }
    & ComponentReferenceFields_Driver_Fragment
  ) | null }
  & ComponentReferenceFields_PageDriver_Fragment
);

export type PageHomepageLinkToFieldsFragment = (
  { __typename?: 'PageHomepage', title?: string | null, subtitle?: string | null, heroAsset?: any | null, linkTitle?: string | null, openGraphImage?: any | null }
  & ComponentReferenceFields_PageHomepage_Fragment
);

export type NewPageHomepageLinkToFieldsFragment = (
  { __typename?: 'NewPageHomepage', title?: string | null, linkTitle?: string | null, openGraphImage?: any | null }
  & ComponentReferenceFields_NewPageHomepage_Fragment
);

export type PageRaceEventLinkToFieldsFragment = (
  { __typename?: 'PageRaceEvent', title?: string | null, subtitle?: string | null, slug?: string | null, heroAsset?: any | null, linkTitle?: string | null, openGraphImage?: any | null }
  & ComponentReferenceFields_PageRaceEvent_Fragment
);

export type PageRaceSeriesLinkToFieldsFragment = (
  { __typename?: 'PageRaceSeries', title?: string | null, subtitle?: string | null, slug?: string | null, heroAsset?: any | null, linkTitle?: string | null, openGraphImage?: any | null }
  & ComponentReferenceFields_PageRaceSeries_Fragment
);

export type PageSearchLinkToFieldsFragment = (
  { __typename?: 'PageSearch', title?: string | null, linkTitle?: string | null, openGraphImage?: any | null }
  & ComponentReferenceFields_PageSearch_Fragment
);

export type PageTeamLinkToFieldsFragment = (
  { __typename?: 'PageTeam', title?: string | null, linkTitle?: string | null, openGraphImage?: any | null, slug?: string | null, team?: (
    { __typename?: 'Team' }
    & TeamFieldsFragment
  ) | null }
  & ComponentReferenceFields_PageTeam_Fragment
);


export const ExternalLinkFieldsFragmentDoc = `
    fragment ExternalLinkFields on ExternalLink {
  sys {
    id
  }
  __typename
  label
  url
}
    `;
export const PageArticleLinkToFieldsFragmentDoc = `
    fragment PageArticleLinkToFields on PageArticle {
  ...ComponentReferenceFields
  title
  topic
  linkTitle
  openGraphImage
  slug
  customFirstPublishedDate
  tagsCollection {
    items {
      ...ContentTagFields
    }
  }
  heroAsset
}
    `;
export const PageBasicLinkToFieldsFragmentDoc = `
    fragment PageBasicLinkToFields on PageBasic {
  ...ComponentReferenceFields
  title
  subtitle
  linkTitle
  openGraphImage
  subtitle
  slug
  tagsCollection {
    items {
      ...ContentTagFields
    }
  }
  heroAsset
}
    `;
export const PageCarLinkToFieldsFragmentDoc = `
    fragment PageCarLinkToFields on PageCar {
  ...ComponentReferenceFields
  title
  subtitle
  linkTitle
  openGraphImage
  slug
  heroAsset
  linkLabel
  link {
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
    ... on PageHomepage {
      ...ComponentReferenceFields
      title
      linkTitle
    }
    ... on PageRaceSeries {
      ...ComponentReferenceFields
      title
      linkTitle
      slug
    }
    ... on PageRaceEvent {
      ...ComponentReferenceFields
      title
      linkTitle
      slug
    }
    ... on PageSearch {
      ...ComponentReferenceFields
      title
      linkTitle
    }
    ... on PageTeam {
      ...ComponentReferenceFields
      title
      linkTitle
      slug
    }
  }
  partnerSet {
    ...PartnerSetFields
  }
  tagsCollection {
    items {
      ...ContentTagFields
    }
  }
  car {
    ...ComponentReferenceFields
    asset
  }
}
    `;
export const PageCategoryLinkToFieldsFragmentDoc = `
    fragment PageCategoryLinkToFields on PageCategory {
  ...ComponentReferenceFields
  title
  subtitle
  linkTitle
  openGraphImage
  mainCategory
  heroAsset
  subtitle
  introductionCaption
  introduction
}
    `;
export const PageDriverLinkToFieldsFragmentDoc = `
    fragment PageDriverLinkToFields on PageDriver {
  ...ComponentReferenceFields
  title
  linkTitle
  openGraphImage
  slug
  tagsCollection {
    items {
      ...ContentTagFields
    }
  }
  driver {
    ...ComponentReferenceFields
    asset
    flag
    driverName
  }
}
    `;
export const PageHomepageLinkToFieldsFragmentDoc = `
    fragment PageHomepageLinkToFields on PageHomepage {
  ...ComponentReferenceFields
  title
  subtitle
  heroAsset
  linkTitle
  openGraphImage
}
    `;
export const NewPageHomepageLinkToFieldsFragmentDoc = `
    fragment NewPageHomepageLinkToFields on NewPageHomepage {
  ...ComponentReferenceFields
  title
  linkTitle
  openGraphImage
}
    `;
export const PageRaceEventLinkToFieldsFragmentDoc = `
    fragment PageRaceEventLinkToFields on PageRaceEvent {
  ...ComponentReferenceFields
  title
  subtitle
  slug
  heroAsset
  linkTitle
  openGraphImage
}
    `;
export const PageRaceSeriesLinkToFieldsFragmentDoc = `
    fragment PageRaceSeriesLinkToFields on PageRaceSeries {
  ...ComponentReferenceFields
  title
  subtitle
  slug
  heroAsset
  linkTitle
  openGraphImage
}
    `;
export const PageSearchLinkToFieldsFragmentDoc = `
    fragment PageSearchLinkToFields on PageSearch {
  ...ComponentReferenceFields
  title
  linkTitle
  openGraphImage
}
    `;
export const PageTeamLinkToFieldsFragmentDoc = `
    fragment PageTeamLinkToFields on PageTeam {
  ...ComponentReferenceFields
  title
  linkTitle
  openGraphImage
  slug
  team {
    ...TeamFields
  }
}
    `;