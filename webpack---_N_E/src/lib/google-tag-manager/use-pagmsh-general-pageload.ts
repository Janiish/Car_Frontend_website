import { useRouter } from "next/router";
import { useEffect } from "react";
import { PAGMSHEvents, sendPagDataToGTM } from "@/lib/google-tag-manager/events";

const usePAGMSHGeneralPageLoad = ({
    contentTags,
    pageType,
}: {
    contentTags: string[];
    pageType: string;
}): void => {
    // Key off `pathname` (the route without query string) rather than `asPath`.
    // Shallow query updates on the same route (e.g. the homepage `?car=`/`?team=`
    // tab switches) must not register as a new page view — only genuine route
    // changes should. Deep-linking / back-forward still work via `router.query`.
    const { locale, pathname } = useRouter();

    useEffect(() => {
        sendPagDataToGTM({
            locale: locale!,
            eventAction: PAGMSHEvents.pageLoad,
            pageExperience: {
                pageCategory: pageType,
                contentTags: contentTags ?? [],
            },
        });
    }, [pathname, locale, contentTags, pageType]);
};

export { usePAGMSHGeneralPageLoad };
