import type { MouseEvent, MouseEventHandler } from "react";
import { useMemo } from "react";
import { useAppStore } from "@/store/app-store";
import { PorscheLogoRedDot } from "@/components/svgs/porsche-logo";
import type { BoxProps } from "@project/ui";
import { Box, NextLink } from "@project/ui";
import { sendNavigationLinkClickToGTM } from "@/components/contentful/main-navigation/tracking-nav-click";
import { useRouter } from "next/router";

const LOGO_BLACK = "#010205";
const LOGO_WHITE = "#ffffff";

type PorscheLogoProps = BoxProps & {
    onClick: MouseEventHandler<HTMLAnchorElement>;
    forceLogoColorWhite?: boolean;
};

const PorscheLogo = ({ onClick, forceLogoColorWhite = false, ...props }: PorscheLogoProps) => {
    const { locale } = useRouter();

    const {
        state: { pagePresentation, pageType, pageId, pageContentTags },
    } = useAppStore();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        onClick && onClick(e);

        const targetUrl = e.currentTarget.getAttribute("href") ?? "";
        const clickElementType = "navigation";
        const clickElementId = pageId;
        const clickElementName = "Home";

        sendNavigationLinkClickToGTM({
            locale: locale!,
            pageExperience: {
                pageCategory: pageType,
                contentTags: pageContentTags ?? [],
            },
            componentClick: {
                clickElementType,
                clickElementId,
                clickElementName,
                targetUrl,
                targetType: "internal",
            },
        });
    };

    const logoColor = useMemo(() => {
        if (forceLogoColorWhite === true) {
            return LOGO_WHITE;
        }

        if (pageType === "PageArticle") {
            if (pagePresentation === "split screen") {
                return LOGO_WHITE;
            }
            if (pagePresentation === "full screen") {
                return LOGO_BLACK;
            }
        }

        if (pageType === "PageBasic") {
            if (pagePresentation === "basic-with-image") {
                return LOGO_WHITE;
            }
            if (pagePresentation === "basic-without-image") {
                return LOGO_BLACK;
            }
        }

        if (pageType == "PageCategory" || pageType == "PageTeam") {
            return LOGO_BLACK;
        } else {
            return LOGO_WHITE;
        }
    }, [pagePresentation, pageType, forceLogoColorWhite]);

    return (
        <Box position="relative" width="142px" height="28px" {...props}>
            <NextLink
                href="/"
                aria-label="Home"
                display="inline-block"
                position="absolute"
                onClick={handleClick}
            >
                <PorscheLogoRedDot width="142px" height="28px" color={logoColor} />
            </NextLink>
        </Box>
    );
};

export { PorscheLogo };
