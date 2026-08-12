import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { ModuleRichText } from "@/components/contentful/module-rich-text/module-rich-text";
import { ModuleRichTextGraphql } from "@/components/contentful/module-rich-text/module-rich-text.graphql";
import { ModuleImage } from "@/components/contentful/module-image/module-image";
import { ModuleImageGraphql } from "@/components/contentful/module-image/module-image.graphql";
import { ModuleSpacer } from "@/components/contentful/module-spacer/module-spacer";
import { ModuleSpacerGraphql } from "@/components/contentful/module-spacer/module-spacer.graphql";
import { ModuleCarTechSpecs } from "@/components/contentful/module-car-tech-specs/module-car-tech-specs";
import { ModuleCarTechSpecsGraphql } from "@/components/contentful/module-car-tech-specs/module-car-tech-specs.graphql";
import { ModuleVideo } from "@/components/contentful/module-video/module-video";
import { ModuleVideoGraphql } from "@/components/contentful/module-video/module-video.graphql";
import { ModulePageLinkTile } from "@/components/contentful/module-page-link-tile/module-page-link-tile";
import { ModulePageLinkTileGraphql } from "@/components/contentful/module-page-link-tile/module-page-link-tile.graphql";
import { ModuleListenToTheEngine } from "@/components/contentful/module-listen-to-the-engine/module-listen-to-the-engine";
import { ModuleListenToTheEngineGraphql } from "@/components/contentful/module-listen-to-the-engine/module-listen-to-the-engine.graphql";

const ModuleQuote = dynamic(() =>
    import("@/components/contentful/module-quote/module-quote").then((module) => module.ModuleQuote)
);

const ModuleQuoteGraphql = dynamic(() =>
    import("@/components/contentful/module-quote/module-quote.graphql").then(
        (module) => module.ModuleQuoteGraphql
    )
);

const ModuleTitleAndDescription = dynamic(() =>
    import("@/components/contentful/module-title-and-description/module-title-and-description").then(
        (module) => module.ModuleTitleAndDescription
    )
);

const ModuleTitleAndDescriptionGraphql = dynamic(() =>
    import("@/components/contentful/module-title-and-description/module-title-and-description.graphql").then(
        (module) => module.ModuleTitleAndDescriptionGraphql
    )
);

const ModuleTable = dynamic(() =>
    import("@/components/contentful/module-table/module-table").then((module) => module.ModuleTable)
);

const ModuleTableGraphql = dynamic(() =>
    import("@/components/contentful/module-table/module-table.graphql").then(
        (module) => module.ModuleTableGraphql
    )
);

const ModuleCarousel = dynamic(() =>
    import("@/components/contentful/module-carousel/module-carousel").then(
        (module) => module.ModuleCarousel
    )
);
const ModuleCarouselGraphql = dynamic(() =>
    import("@/components/contentful/module-carousel/module-carousel.graphql").then(
        (module) => module.ModuleCarouselGraphql
    )
);

const Module916VideoImage = dynamic(() =>
    import("@/components/contentful/module-916-video-image/module-916-video-image").then(
        (module) => module.Module916VideoImage
    )
);

const Module916VideoImageGraphql = dynamic(() =>
    import("@/components/contentful/module-916-video-image/module-916-video-image.graphql").then(
        (module) => module.Module916VideoImageGraphql
    )
);

const ModuleAccordion = dynamic(() =>
    import("@/components/contentful/module-accordion/module-accordion").then(
        (module) => module.ModuleAccordion
    )
);
const ModuleAccordionGraphql = dynamic(() =>
    import("@/components/contentful/module-accordion/module-accordion.graphql").then(
        (module) => module.ModuleAccordionGraphql
    )
);

const ModuleDriverList = dynamic(() =>
    import("@/components/contentful/module-driver-list/module-driver-list").then(
        (module) => module.ModuleDriverList
    )
);

const ModuleDriverListGraphql = dynamic(() =>
    import("@/components/contentful/module-driver-list/module-driver-list.graphql").then(
        (module) => module.ModuleDriverListGraphql
    )
);

const ModuleMediaFeature = dynamic(() =>
    import("@/components/contentful/module-media-feature/module-media-feature").then(
        (module) => module.ModuleMediaFeature
    )
);

const ModuleMediaFeatureGraphql = dynamic(() =>
    import("@/components/contentful/module-media-feature/module-media-feature.graphql").then(
        (module) => module.ModuleMediaFeatureGraphql
    )
);

const ModuleGallery = dynamic(() =>
    import("@/components/contentful/module-gallery/module-gallery").then(
        (module) => module.ModuleGallery
    )
);
const ModuleGalleryGraphql = dynamic(() =>
    import("@/components/contentful/module-gallery/module-gallery.graphql").then(
        (module) => module.ModuleGalleryGraphql
    )
);

const ModuleCircuit = dynamic(() =>
    import("@/components/contentful/module-circuit/module-circuit").then(
        (module) => module.ModuleCircuit
    )
);

const ModuleCircuitGraphql = dynamic(() =>
    import("@/components/contentful/module-circuit/module-circuit.graphql").then(
        (module) => module.ModuleCircuitGraphql
    )
);

const ModuleSplitLayout = dynamic(() =>
    import("@/components/contentful/module-split-layout/module-split-layout").then(
        (module) => module.ModuleSplitLayout
    )
);

const ModuleSplitLayoutGraphql = dynamic(() =>
    import("@/components/contentful/module-split-layout/module-split-layout.graphql").then(
        (module) => module.ModuleSplitLayoutGraphql
    )
);

const ModuleAudioPlayer = dynamic(() =>
    import("@/components/contentful/module-audio-player/module-audio-player").then(
        (module) => module.ModuleAudioPlayer
    )
);

const ModuleAudioPlayerGraphql = dynamic(() =>
    import("@/components/contentful/module-audio-player/module-audio-player.graphql").then(
        (module) => module.ModuleAudioPlayerGraphql
    )
);

const ModuleIframe = dynamic(() =>
    import("@/components/contentful/module-iframe/module-iframe").then(
        (module) => module.ModuleIframe
    )
);

const ModuleIframeGraphql = dynamic(() =>
    import("@/components/contentful/module-iframe/module-iframe.graphql").then(
        (module) => module.ModuleIframeGraphql
    )
);

const ModuleSideBySide = dynamic(() =>
    import("@/components/contentful/module-side-by-side/module-side-by-side").then(
        (module) => module.ModuleSideBySide
    )
);

const ModuleSideBySideGraphql = dynamic(() =>
    import("@/components/contentful/module-side-by-side/module-side-by-side.graphql").then(
        (module) => module.ModuleSideBySideGraphql
    )
);

const ModuleQuickLinks = dynamic(() =>
    import("@/components/contentful/module-quick-links/module-quick-links").then(
        (module) => module.ModuleQuickLinks
    )
);

const ModuleQuickLinksGraphql = dynamic(() =>
    import("@/components/contentful/module-quick-links/module-quick-links.graphql").then(
        (module) => module.ModuleQuickLinksGraphql
    )
);

const ModuleLiveTimingTable = dynamic(() =>
    import("@/components/contentful/module-live-timing-table/module-live-timing-table").then(
        (module) => module.ModuleLiveTimingTable
    )
);

const ModuleLiveTimingTableGraphql = dynamic(() =>
    import("@/components/contentful/module-live-timing-table/module-live-timing-table.graphql").then(
        (module) => module.ModuleLiveTimingTableGraphql
    )
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComponentProps = ComponentType<any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComponentGraphQlProps = ComponentType<any>;

export type ComponentMap = {
    [key: string]: ComponentProps;
};
export type ComponentGraphqlMap = {
    [key: string]: ComponentGraphQlProps;
};

export const componentMap: ComponentMap = {
    ModuleRichText,
    ModuleImage,
    ModuleVideo,
    ModuleQuote,
    ModuleTitleAndDescription,
    ModuleSpacer,
    ModuleDriverList,
    ModuleCarousel,
    ModuleGallery,
    ModuleAccordion,
    ModuleMediaFeature,
    ModuleCarTechSpecs,
    ModuleCircuit,
    ModuleSplitLayout,
    ModuleTable,
    ModuleAudioPlayer,
    ModulePageLinkTile,
    ModuleListenToTheEngine,
    ModuleIframe,
    ModuleSideBySide,
    ModuleQuickLinks,
    ModuleLiveTimingTable,
    Module916VideoImage,
} as const;

export const componentMapGraphql: ComponentGraphqlMap = {
    ModuleRichText: ModuleRichTextGraphql,
    ModuleImage: ModuleImageGraphql,
    ModuleVideo: ModuleVideoGraphql,
    ModuleQuote: ModuleQuoteGraphql,
    ModuleTitleAndDescription: ModuleTitleAndDescriptionGraphql,
    ModuleSpacer: ModuleSpacerGraphql,
    ModuleDriverList: ModuleDriverListGraphql,
    ModuleCarousel: ModuleCarouselGraphql,
    ModuleGallery: ModuleGalleryGraphql,
    Module916VideoImage: Module916VideoImageGraphql,
    ModuleAccordion: ModuleAccordionGraphql,
    ModuleMediaFeature: ModuleMediaFeatureGraphql,
    ModuleCarTechSpecs: ModuleCarTechSpecsGraphql,
    ModuleCircuit: ModuleCircuitGraphql,
    ModuleSplitLayout: ModuleSplitLayoutGraphql,
    ModuleTable: ModuleTableGraphql,
    ModuleAudioPlayer: ModuleAudioPlayerGraphql,
    ModulePageLinkTile: ModulePageLinkTileGraphql,
    ModuleListenToTheEngine: ModuleListenToTheEngineGraphql,
    ModuleIframe: ModuleIframeGraphql,
    ModuleSideBySide: ModuleSideBySideGraphql,
    ModuleQuickLinks: ModuleQuickLinksGraphql,
    ModuleLiveTimingTable: ModuleLiveTimingTableGraphql,
};
