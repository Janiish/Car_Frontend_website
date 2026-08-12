import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAppStore } from "@/store/app-store";
import { PAGMSHEvents, PAGMSHModuleNames, sendPagDataToGTM } from "@/lib/google-tag-manager/events";
import { SECTION_IDS, SECTIONS_CONFIG } from "../configs/waypoints.config";

/**
 * Maps a section's DOM id (`SECTION_IDS`) to the `moduleName` used across the
 * rest of the homepage tracking, so display and click events share the same
 * naming. The ids are lowercase (`garage`) while the module names are PascalCase
 * (`GarageSection`), so an explicit map is needed — this also lets `footer` stay
 * `Footer` rather than being forced into a `…Section` suffix.
 */
const SECTION_TRACKING_NAMES: Record<string, string> = {
    [SECTION_IDS.garage]: PAGMSHModuleNames.garageSection,
    [SECTION_IDS.history]: PAGMSHModuleNames.historySection,
    [SECTION_IDS.cars]: PAGMSHModuleNames.carsSection,
    [SECTION_IDS.teams]: PAGMSHModuleNames.teamsSection,
    [SECTION_IDS.news]: PAGMSHModuleNames.newsSection,
    [SECTION_IDS.footer]: PAGMSHModuleNames.footer,
};

/**
 * A section is considered "reached" once its box overlaps a thin horizontal band
 * at the vertical centre of the viewport. This is robust to the homepage's tall
 * scroll wrappers, the pinned/scrubbed cars section and the negative-margin
 * overlaps: whichever section occupies the middle of the screen is the one the
 * user is looking at.
 */
const CENTRE_BAND_ROOT_MARGIN = "-45% 0px -45% 0px";

type SectionViewContext = {
    locale?: string;
    pageType: string;
    pageId: string;
    pageContentTags?: string[];
};

const sendSectionViewEvent = (sectionId: string, ctx: SectionViewContext) => {
    const sectionName = SECTION_TRACKING_NAMES[sectionId] ?? sectionId;
    const modulePosition = SECTIONS_CONFIG.findIndex((s) => s.sectionId === sectionId);

    sendPagDataToGTM({
        eventAction: PAGMSHEvents.moduleEnterViewport,
        locale: ctx.locale!,
        pageExperience: {
            pageCategory: ctx.pageType,
            sectionName,
            contentTags: ctx.pageContentTags ?? [],
        },
        context: {
            moduleName: sectionName,
            modulePosition,
        },
        componentDisplay: {
            displayElementType: sectionName,
            displayElementId: ctx.pageId,
            displayElementName: `${ctx.pageId}|${sectionName}`,
        },
    });
};

const handleIntersections = (
    entries: IntersectionObserverEntry[],
    tracked: Set<string>,
    ctx: SectionViewContext
) => {
    for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const sectionId = entry.target.id;
        if (tracked.has(sectionId)) continue;
        tracked.add(sectionId);
        sendSectionViewEvent(sectionId, ctx);
    }
};

/** Attaches the observer to any section elements not yet being observed. */
const observeNewSections = (observer: IntersectionObserver, observed: Set<Element>) => {
    for (const section of SECTIONS_CONFIG) {
        const el = document.getElementById(section.sectionId);
        if (el && !observed.has(el)) {
            observed.add(el);
            observer.observe(el);
        }
    }
};

/**
 * Fires a `PAGMSH_ModuleEnterViewport_Load` display event the first time each
 * homepage section scrolls into view.
 *
 * Uses an IntersectionObserver against the section DOM ids. Lenis is configured
 * with `root` (it drives the *native* scroll position), and is bypassed
 * entirely on touch devices, so native viewport intersection is reliable here.
 *
 * Each section fires at most once per page load (scrolling back up does not
 * re-fire), giving a clean "unique sections reached" funnel.
 */
const useSectionInViewTracking = () => {
    const { locale } = useRouter();
    const {
        state: { pageType, pageId, pageContentTags },
    } = useAppStore();

    // Keep the latest page context in a ref so the observer is created once and
    // the callback always reads current values without re-subscribing.
    const contextRef = useRef<SectionViewContext>({ locale, pageType, pageId, pageContentTags });
    contextRef.current = { locale, pageType, pageId, pageContentTags };

    const trackedRef = useRef<Set<string>>(new Set());

    useEffect(() => {
        if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

        const tracked = trackedRef.current;
        const observer = new IntersectionObserver(
            (entries) => handleIntersections(entries, tracked, contextRef.current),
            { rootMargin: CENTRE_BAND_ROOT_MARGIN, threshold: 0 }
        );

        const observed = new Set<Element>();
        const observe = () => observeNewSections(observer, observed);
        observe();

        // Sections below the fold mount lazily (next/dynamic); watch the homepage
        // root for late arrivals and observe them as they appear.
        const root =
            document.getElementById(SECTIONS_CONFIG[0]?.sectionId)?.parentElement ?? document.body;
        const mutationObserver = new MutationObserver(observe);
        mutationObserver.observe(root, { childList: true });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, []);
};

/**
 * Render-null component so the section-in-view tracking can be mounted once
 * inside the homepage tree without cluttering the section markup.
 */
const SectionViewTracker = () => {
    useSectionInViewTracking();
    return null;
};

export { SectionViewTracker, useSectionInViewTracking };
