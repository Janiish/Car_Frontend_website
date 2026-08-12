import { useEffect, useState } from "react";
import { MediaFeature } from "./media-feature";
import { useSiteSettingsQuery } from "@/lib/contentful/site-settings/__generated/site-settings.contentful.generated";
import { useMicrocopy } from "@/lib/contentful/microcopy/microcopy-context";
import { useAppStore } from "@/store/app-store";
import { useRouter } from "next/router";

const PorscheVisitorBanner = () => {
    const {
        state: { siteSettingsId },
    } = useAppStore();
    const { get: getMicrocopy } = useMicrocopy();
    const { locale, isPreview } = useRouter();

    const [showBanner, setShowBanner] = useState(false);

    const { data } = useSiteSettingsQuery(
        {
            id: siteSettingsId,
            locale: locale!,
            preview: isPreview,
        },
        {
            ...(!isPreview && { staleTime: Infinity }),
        }
    );

    useEffect(() => {
        if (document.referrer.includes("https://www.porsche.")) {
            setShowBanner(true);
        }
    }, []);

    return data?.siteSettings && showBanner ? (
        <MediaFeature
            link={{
                __typename: "ExternalLink",
                url: document.referrer,
                sys: {
                    id: "",
                },
            }}
            mediaAsset={data.siteSettings.porscheVisitorBanner}
            title={getMicrocopy("global", "text.porscheVisitorBannerTitle")}
            linkLabel={getMicrocopy("global", "label.porscheVisitorBannerLabel")}
            containerProps={{
                height: {
                    base: 500,
                    l: 450,
                },
            }}
        />
    ) : null;
};

export { PorscheVisitorBanner };
