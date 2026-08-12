import breakpoints from "@project/ui/src/design-tokens/09.breakpoints/breakpoints";

declare global {
    interface Window {
        dataLayer?: unknown[];
        oneGa?: unknown[];
        pagData?: unknown[];
        [dataLayerName: string]: unknown[];
    }
}

/**
 * The Event Names are taken from the "20240424V01-BP_MotorsportsHub2_events.json" file attached on this page https://skyway.porsche.com/confluence/display/PMH02/Tracking+requirements
 *
 * More will likely be added over time, to make sure the naming is consistent with the JSON file we define the event names here in this map.
 * Currently, there are not defined requirements of what to send in these events specifically - so we guess...
 */
const PAGMSHEvents = {
    pageLoad: "PAGMSH_General_Pageload",
    searchResultsLoad: "PAGMSH_SearchResults_Load",
    /**
     * Click Events
     */
    linkClick: "PAGMSH_Link_Click",
    linkRichtext: "PAGMSH_LinkRichtext_Click",
    linkRichtextTable: "PAGMSH_LinkRichtextTable_Click",
    linkImageDownload916: "PAGMSH_LinkImageDownload916_Click",
    linkVideoDownload916: "PAGMSH_LinkVideoDownload916_Click",
    // Includes _links_ in the main navigation (but not buttons that opens the navigation or sub navigations)
    navigationLinkClick: "PAGMSH_NavigationLink_Click",
    highlightNavigationToggleClick: "PAGMSH_HighlightNavigationToggle_Click",
    breadcrumbLinkClick: "PAGMSH_BreadcrumbLink_Click",
    // Includes links in the footer, and partner links
    footerLinkClick: "PAGMSH_FooterLink_Click",
    circuitHotspotClick: "PAGMSH_CircuitItem_Click",
    driverItemLinkClick: "PAGMSH_DriverItem_Click",
    contentTagClick: "PAGMSH_RelatedContentTag_Click",
    accordionLinkClick: "PAGMSH_AccordionLink_Click",
    accordionToggleButtonClick: "PAGMSH_AccordionToggleButton_Click",
    audioPlayerPlayButtonClick: "PAGMSH_AudioPlayerPlayButton_Click",
    carTechSpecsDownloadPDF: "PAGMSH_ModuleCarTechSpecsDownloadPDF_Click",
    carouselNavigationNextButtonClick: "PAGMSH_CarouselNavigationNextButton_Click",
    carouselNavigationPrevButtonClick: "PAGMSH_CarouselNavigationPrevButton_Click",
    carouselPaginationButtonClick: "PAGMSH_CarouselPaginationButton_Click",
    carouselArticlePageCard_Click: "PAGMSH_carouselArticlePageCard_Click",
    carouselDriverCard_Click: "PAGMSH_carouselDriverCard_Click",
    carouselTeamCard_Click: "PAGMSH_carouselTeamCard_Click",
    carouselCarCard_Click: "PAGMSH_carouselCarCard_Click",
    carouselRaceEventCard_Click: "PAGMSH_carouselRaceEventCard_Click",
    carouselRaceSeriesCard_Click: "PAGMSH_carouselRaceSeriesCard_Click",
    listenToTheEngineTooglePlayButton_Click: "PAGMSH_ListenToTheEngineTooglePlayButton_Click",
    listenToTheEngineSoundButton_Click: "PAGMSH_ListenToTheEngineSoundButton_Click",
    carouselBasicPageCard_Click: "PAGMSH_carouselBasicPageCard_Click",
    searchRecommendationClick: "PAGMSH_SearchRecommendation_Click",
    searchAutocompleteClick: "PAGMSH_SearchAutocomplete_Click",
    searchResultsLoadMore_Click: "PAGMSH_SearchResultsLoadMore_Click",
    searchButtonClick: "PAGMSH_SearchButton_Click",
    searchFilterClick: "PAGMSH_SearchFilter_Click",
    searchResultClick: "PAGMSH_SearchResult_Click",
    videoIframePlay_Click: "PAGMSH_VideoIframePlay_Click",
    videoCldTogglePlay_Click: "PAGMSH_VideoCldTogglePlay_Click",
    videoCldToggleMute_Click: "PAGMSH_VideoCldToggleMute_Click",
    liveTimingTableOpenFullscreen: "PAGMSH_LiveTimingTable_OpenFullscreen",
    /**
     * New Homepage events
     */
    // NOTE: the GTM container derives the interaction type from the *last*
    // segment of the event name and only accepts `Click` (and `Load` for display
    // events). Names ending in Open/Close/Toggle make the container throw. So —
    // like the existing `PAGMSH_AccordionToggleButton_Click` — all interaction
    // events end in `_Click` and encode the open/close/toggle semantics in the
    // descriptor + `clickElementName`. This avoids having to register new events.
    // Global "garage" dashboard modal open/close (interaction)
    dashboardOpen: "PAGMSH_DashboardOpen_Click",
    dashboardClose: "PAGMSH_DashboardClose_Click",
    // Per-car dashboard modal open/close (interaction)
    carDashboardOpen: "PAGMSH_CarDashboardOpen_Click",
    carDashboardClose: "PAGMSH_CarDashboardClose_Click",
    // Expand/collapse of detail cards (interaction)
    historyDetailsCardToggle: "PAGMSH_HistoryDetailsCardToggle_Click",
    carHotspotDetailsCardToggle: "PAGMSH_CarHotspotDetailsCardToggle_Click",
    // Car / team tab switches in the homepage toolbars (interaction)
    carSelectorClick: "PAGMSH_CarSelector_Click",
    teamSelectorClick: "PAGMSH_TeamSelector_Click",
    // Add more click events as needed...
    // Component Display Events
    moduleEnterViewport: "PAGMSH_ModuleEnterViewport_Load",
    carouselSlideEnterViewport: "PAGMSH_ModuleEnterViewport_Load",
} as const;

/**
 * The Module Names should be generally taken from contentful __typename, but when not accesible we can declare them here
 */
const PAGMSHModuleNames = {
    richText: "ModuleRichText",
    // New homepage modules
    dashboard: "Dashboard",
    carDashboard: "CarDashboard",
    garageSection: "GarageSection",
    historySection: "HistorySection",
    carsSection: "CarsSection",
    teamsSection: "TeamsSection",
    newsSection: "NewsSection",
    footer: "Footer",
} as const;

/**
 * Comments in the following types are taken from the "Information" column in the table on this page: https://skyway.porsche.com/confluence/display/PMH02/Custom+Dimensions+GA4
 */
export type GTMEvent = {
    // Duh :D
    locale: string;
    // Event name of the tracking event - see PAGMSHEvents keys for possible values
    eventAction: (typeof PAGMSHEvents)[keyof typeof PAGMSHEvents];
    // Nested properties
    componentClick?: PagDataComponentClickObject;
    componentDisplay?: PagDataComponentDisplayObject;
    pageExperience?: PagDataPageExperienceObject;
    context?: {
        moduleName?: string | null;
        modulePosition?: number | null;
    };
};

type PagVisitorDataObject = {
    // Not documented, but we use the browser width and height
    deviceBrowserHeight: string;
    deviceBrowserWidth: string;
    // Not documented, but we resolve the breakpoint name from the breakpoints design tokens based on the viewport width
    deviceBrowserBreakpoint: string;
    // Not documented, but we use the orientation media query to determine the orientation (p = portrait, l = landscape)
    deviceBrowserOrientation: "p" | "l";
    // Not documented, but we use the pointer media query to determine the device type (mobile, desktop
    deviceType: "mobile" | "desktop";
    // Not documented, not required - recommend we don't send this to avoid fingerprinting
    useragent?: string;
};

type PagDataPageExperienceObject = {
    // Complete URL excluding tags and parameters
    pageId?: string;
    // 	Descriptive name of the page
    pageName?: string;
    // Page categorisation - we use the __typeName of a page query, which can be accessed from the AppStore.state.pageType
    pageCategory?: string;
    // Contains the information about the section of the page - we use the __typename of a Module query if applicable
    sectionName?: string;
    // Descriptive tags for the content or page that is related to the data layer call; array of strings, e.g. ["tag1", "tag…", "tagN"]
    // Applicable for pages, we use the tagsCollection items from the page query
    contentTags?: string[];
};

type PagDataComponentClickObject = {
    // Type of the clickable event, e.g. "interaction", "navigation"
    // Since those are all the options suggested - those are the ones we support...
    // We assume "interaction" is for buttons and "navigation" is for links
    clickElementType: "interaction" | "navigation";
    // Identifier of the clickable event (globally the same)
    // No idea what "globally the same" means, but we use either the ID of the element or the sys.id of the contentful entry
    clickElementId: string;
    // Name of the clickable event (localized), label or tooltip of the clickable element
    clickElementName: string;
    // target url from link items
    targetUrl?: string;
    // e.g. internal/outbound/anchor
    // Since those are all the options suggested - those are the ones we support...
    targetType?: "internal" | "outbound" | "anchor";
    // target other than url
    // If the targetType is "anchor" this should be the anchor name/id - otherwise leave out
    targetElement?: string;
};

type PagDataComponentDisplayObject = {
    // Not documented, but we use the __typename of a Module query if applicable
    displayElementType: string;
    // Not documented, but we use the ID of the element or the sys.id of the contentful entry
    displayElementId: string;
    // Name and ID of the display Element, separated by a "|"
    // we use the ID of the element or the sys.id of the contentful entry
    // we use the fields.title of the contentful entry
    displayElementName: `${string}|${string}`;
};

export type PagDataObject = {
    context: {
        eventAction: (typeof PAGMSHEvents)[keyof typeof PAGMSHEvents];

        applicationId: "motorsport-Hub-2";
        applicationName: string;

        language: string;
        country: string;

        moduleId?: string;
        moduleName?: string | null;
        modulePosition?: number | null;

        currency?: "EUR";
        organization?: string;

        environment: "P" | "PP";

        timestamp: string;
        server: string;
    };

    visitor: PagVisitorDataObject;

    pageExperience: PagDataPageExperienceObject;

    componentClick?: PagDataComponentClickObject;

    componentDisplay?: PagDataComponentDisplayObject;
};

const getLanguageAndCountry = (locale: string): { language: string; country: string } => {
    const [language, country] = locale.split("-");

    return {
        language,
        country: locale === "en" ? "international" : country.toUpperCase(),
    };
};

const getBrowserBreakpoint = () => {
    const breakpoint = Object.entries(breakpoints).find(
        ([, value]) => window.innerWidth <= parseInt(value)
    );

    return breakpoint ? breakpoint[0] : "xl";
};

const buildPagDataObject = (event: GTMEvent): PagDataObject => {
    if (typeof window === "undefined" && process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn(
            "A GTM event was attempted to be sent from the Server, this is not possible as it requires properties only available in the browser"
        );
    }

    const { language, country } = getLanguageAndCountry(event.locale);

    return {
        context: {
            eventAction: event.eventAction,
            applicationId: "motorsport-Hub-2",
            applicationName: "Motorsport Hub 2",
            language,
            country,
            environment: process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "P" : "PP",
            timestamp: new Date().toISOString(),
            server: window.location.hostname,
            ...(event.context?.moduleName && { moduleName: `PAGMSH_${event.context.moduleName}` }),
            ...(typeof event.context?.modulePosition === "number" && {
                modulePosition: event.context.modulePosition,
            }),
        },

        visitor: {
            deviceBrowserWidth: window.innerWidth.toString(),
            deviceBrowserHeight: window.innerHeight.toString(),
            deviceBrowserBreakpoint: getBrowserBreakpoint(),
            deviceBrowserOrientation: window.matchMedia("(orientation: portrait)").matches
                ? "p"
                : "l",
            deviceType: window.matchMedia("(pointer: coarse)").matches ? "mobile" : "desktop",
        },

        pageExperience: {
            ...event.pageExperience,
            contentTags: event.pageExperience?.contentTags ?? [],
            pageId: `${window.location.origin}${window.location.pathname}`,
            pageName: window.document.title,
        },

        ...(event.componentClick && {
            componentClick: event.componentClick,
        }),

        ...(event.componentDisplay && {
            componentDisplay: event.componentDisplay,
        }),
    };
};

const sendPagDataToGTM = (event: GTMEvent, dataLayerName = "pagData"): void => {
    const data = buildPagDataObject(event);

    window[dataLayerName] = window[dataLayerName] || [];

    // The GTM container overrides `pagData.push` to process events synchronously.
    // If the container doesn't recognise an `eventAction` (e.g. a new event that
    // analytics hasn't registered yet) it can throw. Analytics must never crash
    // the app, so isolate the push and surface it as a dev-only warning.
    try {
        window[dataLayerName].push(data);
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.warn(
                `[GTM] Failed to push "${event.eventAction}" to "${dataLayerName}". ` +
                    `This usually means the event is not yet registered in the GTM container.`,
                error
            );
        }
    }
};

type HandleVideoTrackingProps = Omit<GTMEvent, "componentClick" | "pageExperience" | "context"> & {
    pageCategory: string;
    contentTags?: string[];
    moduleName: string;
    modulePosition: number;
    clickElementType: PagDataComponentClickObject["clickElementType"];
    clickElementId: PagDataComponentClickObject["clickElementId"];
    clickElementName: PagDataComponentClickObject["clickElementName"];
};

export const handleVideoTracking = ({
    eventAction,
    locale,
    pageCategory,
    contentTags = [],
    moduleName,
    modulePosition,
    clickElementType,
    clickElementId,
    clickElementName,
}: HandleVideoTrackingProps): void => {
    sendPagDataToGTM({
        eventAction,
        locale,
        pageExperience: {
            pageCategory,
            contentTags,
        },
        context: {
            moduleName,
            modulePosition,
        },
        componentClick: {
            clickElementType,
            clickElementId,
            clickElementName,
        },
    });
};

export { sendPagDataToGTM, PAGMSHEvents, PAGMSHModuleNames, type PagDataComponentClickObject };
