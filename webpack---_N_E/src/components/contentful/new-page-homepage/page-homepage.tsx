import { useState } from "react";
import type { NewPageHomepagePageData } from "@/components/contentful/new-page-homepage/new-page-homepage-page-data";
import type { AllPageArticleCollectionByContentTagQuery } from "@/components/contentful/page-article/__generated/page-article.contentful.generated";
import { ScrollytellingProvider } from "./scrolllytelling-context";
import { LenisProvider } from "./lenis-provider";
import { HomepageResponsiveProvider } from "./homepage-responsive-context";
import dynamic from "next/dynamic";
import Head from "next/head";
import { GarageSection } from "./sections/garage/garage-section";
import { SectionPlaceholder } from "./components/section-placeholder";
import { SectionViewTracker } from "./components/section-view-tracker";
import { RotateDeviceOverlay } from "./components/rotate-device-overlay";
import { HomepageLoader } from "./components/homepage-loader";
import { ResizeScrollAnchor } from "./components/resize-scroll-anchor";
import colors from "@project/ui/src/design-tokens/01.colors/colors";

const HistorySection = dynamic(
    () => import("./sections/history/history-section").then((m) => m.HistorySection),
    { loading: () => <SectionPlaceholder id="history" height="300vh" /> }
);
const CarsSection = dynamic(
    () => import("./sections/cars/cars-section").then((m) => m.CarsSection),
    { loading: () => <SectionPlaceholder id="cars" height="100vh" /> }
);
const TeamsSection = dynamic(
    () => import("./sections/teams/teams-section").then((m) => m.TeamsSection),
    { loading: () => <SectionPlaceholder id="teams" height="200vh" /> }
);
const NewsSection = dynamic(
    () => import("./sections/news/news-section").then((m) => m.NewsSection),
    { loading: () => <SectionPlaceholder id="news" height="100vh" mt="-50vh" /> }
);

const DevToolsGroup =
    process.env.NODE_ENV !== "production"
        ? dynamic(() => import("./components/dev-tools").then((m) => m.DevToolsGroup), {
              ssr: false,
          })
        : () => null;

type NewPageHomepageProps = NewPageHomepagePageData & {
    newsPages?: AllPageArticleCollectionByContentTagQuery["pages"] | null;
};

export const NewPageHomepage = ({
    newsPages,
    title,
    historySectionTitle,
    historySectionTitle2,
    historySectionDescription,
    historySectionContent,
    carsSectionCarsCollection,
    carsSectionSeriesTitle,
    carsSectionNextEventTitle,
    carsSectionLatestNewsTitle,
    carsSectionLabelNoSeries,
    carsSectionLabelNoNewsEvents,
    teamSectionTitle,
    teamSectionTitle2,
    teamsCollection,
    newsSectionTitle,
    newsSectionTitle2,
    newsSectionCarouselItemsCollection,
}: NewPageHomepageProps) => {
    const [garageFirstFrame, setGarageFirstFrame] = useState(false);
    const [initialCarReady, setInitialCarReady] = useState(false);
    const [loaderDone, setLoaderDone] = useState(false);

    return (
        <>
            <Head>
                <style>{`body{background-color:${colors.porscheBlack} !important}`}</style>
            </Head>
            <HomepageResponsiveProvider>
                <LenisProvider>
                    <ScrollytellingProvider>
                        <HomepageLoader
                            heroReady={garageFirstFrame}
                            initialCarReady={initialCarReady}
                            onDone={() => setLoaderDone(true)}
                            carsSectionCarsCollection={carsSectionCarsCollection}
                        />
                        <DevToolsGroup />
                        <SectionViewTracker />
                        <ResizeScrollAnchor />
                        <RotateDeviceOverlay />
                        <GarageSection
                            title={title}
                            onHeroReady={() => setGarageFirstFrame(true)}
                            loaderActive={!loaderDone}
                        />
                        <HistorySection
                            historySectionTitle={historySectionTitle}
                            historySectionTitle2={historySectionTitle2}
                            historySectionContent={historySectionContent}
                            historySectionDescription={historySectionDescription}
                        />
                        <CarsSection
                            carsSectionCarsCollection={carsSectionCarsCollection}
                            carsSectionSeriesTitle={carsSectionSeriesTitle}
                            carsSectionLabelNoSeries={carsSectionLabelNoSeries}
                            carsSectionNextEventTitle={carsSectionNextEventTitle}
                            carsSectionLatestNewsTitle={carsSectionLatestNewsTitle}
                            carsSectionLabelNoNewsEvents={carsSectionLabelNoNewsEvents}
                            loaderActive={!loaderDone}
                            onInitialCarReady={() => setInitialCarReady(true)}
                        />
                        <TeamsSection
                            teamSectionTitle={teamSectionTitle}
                            teamSectionTitle2={teamSectionTitle2}
                            teamsCollection={teamsCollection}
                        />
                        <NewsSection
                            newsSectionTitle={newsSectionTitle}
                            newsSectionTitle2={newsSectionTitle2}
                            newsSectionCarouselItemsCollection={newsSectionCarouselItemsCollection}
                            newsPages={newsPages}
                        />
                    </ScrollytellingProvider>
                </LenisProvider>
            </HomepageResponsiveProvider>
        </>
    );
};
