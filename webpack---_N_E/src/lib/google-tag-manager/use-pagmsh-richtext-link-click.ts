import type { MouseEvent } from "react";
import { useRouter } from "next/router";
import { useAppStore } from "@/store/app-store";
import { PAGMSHModuleNames, sendPagDataToGTM, type PAGMSHEvents } from "./events";

type RichTextLinkClickProps = {
    eventAction: typeof PAGMSHEvents.linkRichtext | typeof PAGMSHEvents.linkRichtextTable;
    href: string;
};

const usePagmshRichTextLinkClick = ({ eventAction, href }: RichTextLinkClickProps) => {
    const { locale } = useRouter();
    const {
        state: { pageType, pageId, pageContentTags },
    } = useAppStore();

    return (e: MouseEvent<HTMLAnchorElement>) => {
        sendPagDataToGTM({
            eventAction,
            locale: locale!,
            pageExperience: {
                pageCategory: pageType,
                contentTags: pageContentTags ?? [],
            },
            context: {
                moduleName: PAGMSHModuleNames.richText,
            },
            componentClick: {
                clickElementType: "navigation",
                clickElementId: pageId,
                clickElementName: e.currentTarget.innerText,
                targetUrl: href,
                targetType: "outbound",
            },
        });
    };
};

export { usePagmshRichTextLinkClick };
