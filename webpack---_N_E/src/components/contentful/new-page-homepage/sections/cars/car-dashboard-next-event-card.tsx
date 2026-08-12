import {
    HStack,
    NdlButton,
    NdlIcon,
    NdlSurface,
    NdlHeading,
    VStack,
    LinkBox,
    LinkOverlay,
    NextLink,
    NdlText,
} from "@project/ui";
import type { DashboardCar3dFieldsFragment } from "../../__generated/page-homepage.contentful.generated";
import { memo, useMemo } from "react";
import { useNextEventForSeriesQuery } from "@/components/contentful/event/__generated/event.contentful.generated";
import { useRouter } from "next/router";
import { useLatestPageArticleByContentTagsQuery } from "@/components/contentful/page-article/__generated/page-article.contentful.generated";
import { useIsDashboardOpen } from "./car-dashboard-layout-context";
import { MotionVStack } from "@/components/contentful/dashboard/motion-primitives";
import { useAppStore } from "@/store/app-store";
import { PAGMSHEvents, PAGMSHModuleNames, sendPagDataToGTM } from "@/lib/google-tag-manager/events";

type CarDashboardNextEventCardProps = {
    car3d?: DashboardCar3dFieldsFragment | null;
    titleNextEvent?: string | null;
    titleLatestNews?: string | null;
    labelNoNewsEvents?: string | null;
};

const CarDashboardNextEventCard = memo(function CarDashboardNextEventCard({
    car3d,
    titleNextEvent,
    titleLatestNews,
    labelNoNewsEvents,
}: CarDashboardNextEventCardProps) {
    const { locale, isPreview } = useRouter();
    const isDashboardOpen = useIsDashboardOpen();
    const {
        state: { pageType, pageId, pageContentTags },
    } = useAppStore();

    const car = car3d?.car?.__typename === "Car" ? car3d.car : undefined;

    // Round to the start of the UTC day so the query variables — and therefore
    // the React Query cache key — stay stable across renders. A fresh
    // `new Date()` on every render changed the key each render, defeating
    // caching and hammering Contentful with a request on every re-render.
    const date = useMemo(() => {
        const now = new Date();
        now.setUTCHours(0, 0, 0, 0);
        return now.toISOString();
    }, []);

    const seriesIds = car?.seriesCollection?.items
        ?.map((series) => series?.sys?.id)
        .filter((id) => typeof id === "string");

    const contentTags = car?.tagsCollection?.items
        ?.map((tag) => tag?.tagKey)
        .filter((tag) => typeof tag === "string");

    const { data: nextEvent } = useNextEventForSeriesQuery(
        {
            seriesIds: seriesIds ?? [],
            date,
            locale: locale!,
            preview: Boolean(isPreview),
        },
        {
            // Only fetch once the dashboard is opened, and keep the result for
            // the session so switching cars back and forth doesn't refetch.
            enabled: isDashboardOpen && !!seriesIds?.length,
            ...(!isPreview && { staleTime: Infinity }),
            refetchOnWindowFocus: false,
        }
    );

    const matchedEvent = useMemo(
        () =>
            nextEvent?.eventCollection?.items?.find(
                (item) => item?.linkedFrom?.pageRaceEventCollection?.items?.[0]?.slug
            ),
        [nextEvent]
    );

    const { data: latestNews } = useLatestPageArticleByContentTagsQuery(
        {
            tags: contentTags ?? [],
            locale: locale!,
            preview: Boolean(isPreview),
        },
        {
            enabled: isDashboardOpen && !!contentTags?.length,
            ...(!isPreview && { staleTime: Infinity }),
            refetchOnWindowFocus: false,
        }
    );

    const eventSlug = matchedEvent?.linkedFrom?.pageRaceEventCollection?.items?.[0]?.slug;
    const hasEvent = Boolean(matchedEvent && eventSlug);

    const articleSlug = latestNews?.pageArticleCollection?.items?.[0]?.slug;
    const hasLatestNews = Boolean(articleSlug);

    const hasContent = hasEvent || hasLatestNews;

    const { href, linkTitle, linkDescription } = useMemo(() => {
        if (hasEvent) {
            return {
                href: `/events/${eventSlug}`,
                linkTitle: matchedEvent?.name,
                linkDescription: matchedEvent?.description,
            };
        }

        if (hasLatestNews) {
            return {
                href: `/articles/${articleSlug}`,
                linkTitle: latestNews?.pageArticleCollection?.items?.[0]?.title,
                linkDescription: latestNews?.pageArticleCollection?.items?.[0]?.introduction,
            };
        }

        return { href: undefined, linkTitle: undefined, linkDescription: undefined };
    }, [hasEvent, hasLatestNews, eventSlug, articleSlug, latestNews, matchedEvent]);

    const heading = hasEvent ? titleNextEvent : titleLatestNews;

    const handleLinkClick = () => {
        sendPagDataToGTM({
            eventAction: PAGMSHEvents.linkClick,
            locale: locale!,
            pageExperience: {
                pageCategory: pageType,
                contentTags: pageContentTags ?? [],
            },
            context: {
                moduleName: PAGMSHModuleNames.carDashboard,
            },
            componentClick: {
                clickElementType: "navigation",
                clickElementId: pageId,
                clickElementName: `${hasEvent ? "Next event" : "Latest news"}: ${linkTitle ?? ""}`,
                targetUrl: href,
                targetType: "internal",
            },
        });
    };

    const fadeOpacity = isDashboardOpen ? 1 : 0;
    const fadeDelay = isDashboardOpen ? 1.33 / 2 : 0;

    // The queries only start once the dashboard opens, so `hasContent` flips
    // from false to true while the fade is already meant to be running. Keep a
    // single MotionVStack across both states — branching above it would remount
    // it mid-open, and a fresh mount re-reads `initial` (already opacity 1 by
    // then), skipping the fade entirely.
    return (
        <NdlSurface
            size="card"
            colorScheme="transparent"
            width="full"
            height="full"
            color="allWhite"
            position="relative"
            overflow="hidden"
            p={0}
        >
            <MotionVStack
                justifyContent="space-between"
                alignItems="stretch"
                height="full"
                minH={0}
                p={4}
                initial={{ opacity: fadeOpacity }}
                animate={{ opacity: fadeOpacity }}
                transition={{ duration: 1.33 / 2, delay: fadeDelay }}
            >
                {hasContent ? (
                    <LinkBox
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        flex={1}
                        minH={0}
                        overflow="hidden"
                        data-group
                    >
                        <HStack justifyContent="space-between" alignItems="center" flexShrink={0}>
                            <NdlHeading size="headerM" py={3} px={2}>
                                {heading}
                            </NdlHeading>
                            <NdlButton
                                variant="icon"
                                size="large"
                                colorScheme="grey"
                                tabIndex={-1}
                                marginLeft="auto"
                                _hover={{
                                    cursor: "pointer",
                                    backgroundColor: "ndlTransparencyBlack",
                                }}
                            >
                                <NdlIcon name="arrow-right-up" />
                            </NdlButton>
                        </HStack>
                        <VStack
                            alignItems="start"
                            pb={2}
                            px={2}
                            minW={0}
                            minH={0}
                            overflow="hidden"
                        >
                            <LinkOverlay as={NextLink} href={href ?? ""} onClick={handleLinkClick}>
                                <NdlHeading size="headerS" color="allWhite" mb={2} noOfLines={2}>
                                    {linkTitle}
                                </NdlHeading>
                            </LinkOverlay>
                            <NdlText
                                overflow="hidden"
                                textOverflow="ellipsis"
                                minW={0}
                                sx={{
                                    textWrap: "pretty",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "2",
                                    WebkitBoxOrient: "vertical",
                                }}
                            >
                                {linkDescription}
                            </NdlText>
                        </VStack>
                    </LinkBox>
                ) : (
                    <>
                        <NdlHeading size="headerM" py={3} px={2}>
                            {heading}
                        </NdlHeading>
                        <VStack alignItems="start" justifyContent="flex-end" flex={1} pb={2} px={2}>
                            <NdlText color="grey200">{labelNoNewsEvents}</NdlText>
                        </VStack>
                    </>
                )}
            </MotionVStack>
        </NdlSurface>
    );
});

CarDashboardNextEventCard.displayName = "CarDashboardNextEventCard";

export { CarDashboardNextEventCard };
