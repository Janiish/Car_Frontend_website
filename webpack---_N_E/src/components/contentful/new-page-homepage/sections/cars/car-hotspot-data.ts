import type { ContentfulCloudinaryAssetField } from "@project/ui";
import type { DashboardCar3dFieldsFragment } from "../../__generated/page-homepage.contentful.generated";
import type { PartCarDetailItemFieldsFragment } from "@/components/contentful/car/__generated/car.contentful.generated";
import type { HotspotData } from "./car-hotspot";

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------

export type CarHotspots = {
    front: HotspotData[];
    back: HotspotData[];
};

export type ActiveHotspotSet = "front" | "back" | null;

// ---------------------------------------------------------------------------
// Data extraction
// ---------------------------------------------------------------------------

function mapHotspotItems(
    items: Array<PartCarDetailItemFieldsFragment | null> | undefined
): HotspotData[] {
    if (!items) return [];

    const hotspots: HotspotData[] = [];

    for (const item of items) {
        if (item?.title == null) continue;

        hotspots.push({
            x: item.positionRight ?? 0,
            y: item.positionTop ?? 0,
            title: item.title,
            subtitle: item.subtitle ?? undefined,
            description: item.description ?? undefined,
            asset: item.asset as ContentfulCloudinaryAssetField | undefined,
        });
    }

    return hotspots;
}

export function extractHotspots(
    car3d: DashboardCar3dFieldsFragment | null | undefined
): CarHotspots {
    return {
        front: mapHotspotItems(car3d?.carDetailHotspotsFrontCollection?.items),
        back: mapHotspotItems(car3d?.carDetailHotspotsBackCollection?.items),
    };
}

export function selectVisibleHotspots(
    hotspotsVisible: boolean,
    activeHotspotSet: ActiveHotspotSet,
    activeCarHotspots: CarHotspots
): HotspotData[] {
    if (!hotspotsVisible || activeHotspotSet === null) {
        return [];
    }
    return activeHotspotSet === "front" ? activeCarHotspots.front : activeCarHotspots.back;
}

// ---------------------------------------------------------------------------
// DOM utility
// ---------------------------------------------------------------------------

/** Walks up the DOM and resets any unwanted horizontal scroll caused by focus. */
export function resetAncestorScrollLeft(el: HTMLElement | null) {
    let parent = el;
    while (parent) {
        if (parent.scrollLeft !== 0) parent.scrollLeft = 0;
        parent = parent.parentElement;
    }
}
