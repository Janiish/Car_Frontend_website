import { useCallback } from "react";
import { useRouter } from "next/router";
import { useAppStore } from "@/store/app-store";
import { PAGMSHEvents, sendPagDataToGTM } from "@/lib/google-tag-manager/events";

type CarouselNavigationType = "prev" | "next" | "pagination";

const EVENT_ACTION_BY_TYPE: Record<
    CarouselNavigationType,
    (typeof PAGMSHEvents)[keyof typeof PAGMSHEvents]
> = {
    pagination: PAGMSHEvents.carouselPaginationButtonClick,
    next: PAGMSHEvents.carouselNavigationNextButtonClick,
    prev: PAGMSHEvents.carouselNavigationPrevButtonClick,
};

/**
 * Reusable equivalent of the old `module-carousel.tsx` `handleButtonClick`:
 * fires one of the three existing carousel events, with the carousel identified
 * via `context.moduleName = section`. Callers "just pass the section" (and an
 * optional title) — page context and locale are resolved internally.
 *
 * Returns an `onNavigate(type, index?)` handler ready to hand to
 * `NdlCarouselPagination` / `CarouselNavigationButton`.
 */
const useCarouselNavigationTracking = (section: string, title?: string | null) => {
    const { locale } = useRouter();
    const {
        state: { pageType, pageId, pageContentTags },
    } = useAppStore();

    return useCallback(
        (type: CarouselNavigationType, index?: number) => {
            const eventAction = EVENT_ACTION_BY_TYPE[type];

            const label = title ? `"${title}"` : section;
            let clickElementName: string;
            if (type === "pagination") {
                clickElementName = `Carousel ${label} pagination index button clicked:${index ?? ""}`;
            } else {
                const buttonLabel = type === "next" ? "Next button" : "Previous button";
                clickElementName = `Carousel ${label}: ${buttonLabel}`;
            }

            sendPagDataToGTM({
                eventAction,
                locale: locale!,
                pageExperience: {
                    pageCategory: pageType,
                    contentTags: pageContentTags ?? [],
                },
                context: {
                    moduleName: section,
                },
                componentClick: {
                    clickElementType: "interaction",
                    clickElementId: pageId,
                    clickElementName,
                },
            });
        },
        [section, title, locale, pageType, pageId, pageContentTags]
    );
};

export { useCarouselNavigationTracking };
export type { CarouselNavigationType };
