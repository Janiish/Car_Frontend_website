import {
    Stack,
    DateTime,
    NdlSurface,
    VStack,
    NdlText,
    NdlHeading,
    type NdlSurfaceProps,
} from "@project/ui";
import type { ComponentPropsWithoutRef } from "react";
import { useCalendar } from "./calendar-context";
import { CalendarEventDetails } from "./calendar-event-details";
import type { CalendarEventFieldsFragment } from "./__generated/calendar.contentful.generated";
import { useAppStore } from "@/store/app-store";
import { useRouter } from "next/router";
import { useDashboardQuery } from "../__generated/dashboard.contentful.generated";
import { CONTENT_TYPE_ID_TO_FILE_SYSTEM_ROUTE } from "@/common/enums/content-type-id-to-file-system-route";
import { PAGMSHEvents, PAGMSHModuleNames, sendPagDataToGTM } from "@/lib/google-tag-manager/events";

const getEventHref = (event: CalendarEventFieldsFragment): string | null => {
    const eventPage = event.linkedFrom?.pageRaceEventCollection?.items[0];
    if (eventPage?.slug) {
        return `${CONTENT_TYPE_ID_TO_FILE_SYSTEM_ROUTE.pageRaceEvent}/${eventPage.slug}`;
    }

    const seriesPage = event.series?.linkedFrom?.pageRaceSeriesCollection?.items[0];
    if (seriesPage?.slug) {
        return `${CONTENT_TYPE_ID_TO_FILE_SYSTEM_ROUTE.pageRaceSeries}/${seriesPage.slug}`;
    }

    return null;
};

type CalendarDateDetailsProps = NdlSurfaceProps;

type CalendarDateDetailsWeekdayTextProps = ComponentPropsWithoutRef<typeof NdlText>;
type CalendarDateDetailsDateHeadingProps = ComponentPropsWithoutRef<typeof NdlHeading>;

const CalendarDateDetailsWeekdayText = (props: CalendarDateDetailsWeekdayTextProps) => (
    <NdlText {...props} color="allWhite" />
);

const CalendarDateDetailsDateHeading = (props: CalendarDateDetailsDateHeadingProps) => (
    <NdlHeading {...props} size="headerL" color="allWhite" as="time" />
);

const CalendarDateDetails = (props: CalendarDateDetailsProps) => {
    const { selectedDate, getEventsForDate } = useCalendar();

    const { locale, isPreview } = useRouter();

    const {
        state: { dashboardId, pageType, pageId, pageContentTags },
    } = useAppStore();

    const { data: dashboardData } = useDashboardQuery({
        id: dashboardId ?? "",
        locale: locale!,
        preview: Boolean(isPreview),
    });

    const handleEventLinkClick = (event: CalendarEventFieldsFragment, href: string) => {
        sendPagDataToGTM({
            eventAction: PAGMSHEvents.linkClick,
            locale: locale!,
            pageExperience: {
                pageCategory: pageType,
                contentTags: pageContentTags ?? [],
            },
            context: {
                moduleName: PAGMSHModuleNames.dashboard,
            },
            componentClick: {
                clickElementType: "navigation",
                clickElementId: pageId,
                clickElementName: `Calendar event: ${event.series?.name ?? ""} - ${event.name ?? ""}`,
                targetUrl: href,
                targetType: "internal",
            },
        });
    };

    const events = getEventsForDate(selectedDate);

    return (
        <NdlSurface
            size="medium"
            p={4}
            pb={0}
            height="full"
            colorScheme="transparent"
            position="relative"
            overflow="hidden"
            {...props}
        >
            <Stack
                flexDirection={{ base: "row", l: "column" }}
                justifyContent="space-between"
                height="full"
                className="1"
            >
                <VStack gap={0} alignItems="start" flex={1} className="2">
                    <DateTime
                        dateFormatterOptions={{ weekday: "short" }}
                        textComponent={CalendarDateDetailsWeekdayText}
                    >
                        {selectedDate.toISOString()}
                    </DateTime>
                    <DateTime
                        dateFormatterOptions={{ month: "short", day: "numeric" }}
                        textComponent={CalendarDateDetailsDateHeading}
                    >
                        {selectedDate.toISOString()}
                    </DateTime>
                </VStack>

                <VStack
                    alignItems="stretch"
                    flex={1}
                    justifyContent="start"
                    overflowY="auto"
                    className="scroll-fade-y"
                    sx={{ "--scroll-fade-size": "96px" }}
                >
                    {events.length > 0 && (
                        <Stack spacing={2} marginTop="auto" pb={4}>
                            {events.map((event) => {
                                const href = getEventHref(event);
                                return (
                                    <CalendarEventDetails
                                        key={event.sys.id}
                                        event={event}
                                        href={href}
                                        onClick={
                                            href
                                                ? () => handleEventLinkClick(event, href)
                                                : undefined
                                        }
                                    />
                                );
                            })}
                        </Stack>
                    )}
                </VStack>
            </Stack>
            {events.length === 0 && (
                <NdlText color="grey200" pb={4}>
                    {dashboardData?.dashboard?.labelNoEventsOnDate}
                </NdlText>
            )}
        </NdlSurface>
    );
};

CalendarDateDetails.displayName = "CalendarDateDetails";

export { CalendarDateDetails };
