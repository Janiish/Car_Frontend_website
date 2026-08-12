import type { GTMEvent } from "@/lib/google-tag-manager/events";
import { PAGMSHEvents, sendPagDataToGTM } from "@/lib/google-tag-manager/events";

const sendNavigationLinkClickToGTM = (event: Omit<GTMEvent, "eventAction">) =>
    sendPagDataToGTM({
        ...event,
        eventAction: PAGMSHEvents.navigationLinkClick,
    });

export { sendNavigationLinkClickToGTM };
