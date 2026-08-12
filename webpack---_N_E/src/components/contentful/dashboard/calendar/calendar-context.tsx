import { createContext, useContext, useState, useMemo, useCallback, type ReactNode } from "react";
import type { CalendarEventFieldsFragment } from "./__generated/calendar.contentful.generated";

/**
 * A calendar day enriched with its associated race events.
 * Only contains dates that are actually in the month (no padding days).
 */
export type CalendarDay = {
    /** The date for this day (normalized to UTC midnight) */
    date: Date;
    /** All race events that occur on this day (events can span multiple days) */
    events: Array<CalendarEventFieldsFragment>;
};

/**
 * A calendar month containing only the days that belong to that month.
 * Days are organized into weeks for rendering.
 * To get all days in chronological order, use: weeks.flat()
 * Note: The calendar only covers a single year, so year is stored at the context level.
 */
export type CalendarMonth = {
    /** Month index (0-11, where 0 = January, 11 = December) */
    month: number;
    /** Array of weeks, where each week is an array of up to 7 days */
    weeks: Array<Array<CalendarDay>>;
};

/**
 * The complete calendar data structure.
 * Maps month keys (e.g., "2024-03") to their corresponding CalendarMonth data.
 * This allows efficient lookup of any month's data.
 */
export type CalendarData = Map<string, CalendarMonth>;

type CalendarContextValue = {
    selectedDate: Date;
    selectedMonth: Date;
    focusedDate: Date;
    calendarData: CalendarData;
    goToNextMonth: () => void;
    goToPrevMonth: () => void;
    selectDate: (date: Date) => void;
    setFocusedDate: (date: Date) => void;
    hasEvents: (date: Date) => boolean;
    getEventsForDate: (date: Date) => Array<CalendarEventFieldsFragment>;
    canGoToNextMonth: boolean;
    canGoToPrevMonth: boolean;
};

const CalendarContext = createContext<CalendarContextValue | undefined>(undefined);

type CalendarProviderProps = {
    children: ReactNode;
    initialSelectedDate: Date;
    events: Array<CalendarEventFieldsFragment | null>;
};

/**
 * Compare two dates at the day level (ignoring time)
 */
const compareDatesByDay = (date1: Date, date2: Date): boolean => {
    return (
        date1.getUTCFullYear() === date2.getUTCFullYear() &&
        date1.getUTCMonth() === date2.getUTCMonth() &&
        date1.getUTCDate() === date2.getUTCDate()
    );
};

/**
 * Get all days in a specific month (only days that belong to that month, no padding)
 */
const getDaysInMonth = (year: number, month: number): Array<Date> => {
    // Get the number of days in the month by checking the last day
    const firstDayNextMonth = new Date(Date.UTC(year, month + 1, 1));
    const lastDayOfMonth = new Date(firstDayNextMonth.getTime() - 1);
    const daysInMonth = lastDayOfMonth.getUTCDate();

    // Create array of all days in the month (1st to last)
    // Use Date.UTC to create dates at UTC midnight to avoid timezone issues
    const days: Date[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
        // Create date using UTC to avoid timezone shifts
        const dayDate = new Date(Date.UTC(year, month, day));
        // Double-check: verify the date is actually in the target month
        // This ensures we never include dates from adjacent months
        if (dayDate.getUTCMonth() === month && dayDate.getUTCFullYear() === year) {
            days.push(dayDate);
        }
    }

    return days;
};

/**
 * Parse a Contentful DateTime string to a Date at UTC midnight.
 * Contentful DateTime fields are ISO 8601 strings (e.g., "2007-12-03T10:15:30Z" or "2007-12-03T10:15:30+01:00").
 *
 * IMPORTANT: We extract the date components (YYYY-MM-DD) directly from the string
 * to avoid timezone conversion issues. This ensures that a date like "2025-11-19T00:00:00+01:00"
 * is treated as November 19, not November 18 (which would happen if we converted to UTC first).
 */
const parseContentfulDate = (dateString: string | null | undefined): Date | null => {
    if (!dateString) {
        return null;
    }
    // Extract the date part (YYYY-MM-DD) directly from the string
    // This avoids timezone conversion issues
    const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!match) {
        return null;
    }
    const [, year, month, day] = match;
    // Create date at UTC midnight using the extracted date components
    return new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10)));
};

/**
 * Check if an event occurs on a specific day.
 * An event occurs on a day if the day falls within the event's startDate to endDate range (inclusive).
 * Both the event dates and the day parameter are expected to be at UTC midnight.
 */
const eventOccursOnDay = (event: CalendarEventFieldsFragment, day: Date): boolean => {
    const eventStart = parseContentfulDate(event.startDate);
    if (!eventStart) {
        return false;
    }

    const eventEnd = parseContentfulDate(event.endDate);
    if (eventEnd) {
        // Day is within range if it's >= startDate and <= endDate (inclusive)
        return day.getTime() >= eventStart.getTime() && day.getTime() <= eventEnd.getTime();
    }

    // If no endDate, only check if it matches the startDate
    return compareDatesByDay(day, eventStart);
};

/**
 * Build the calendar data structure from events for a given year.
 * Creates a map of all months (0-11) with their enriched days.
 */
const buildCalendarData = (
    year: number,
    events: Array<CalendarEventFieldsFragment>
): CalendarData => {
    const calendarData = new Map<string, CalendarMonth>();

    // Iterate through all 12 months
    for (let month = 0; month < 12; month++) {
        const days = getDaysInMonth(year, month);

        // Enrich each day with its events
        const enrichedDays: Array<CalendarDay> = days.map((day) => {
            const dayEvents = events.filter((event) => eventOccursOnDay(event, day));
            return {
                date: day,
                events: dayEvents,
            };
        });

        // Split days into weeks (arrays of up to 7 days)
        const weeks: Array<Array<CalendarDay>> = [];
        for (let i = 0; i < enrichedDays.length; i += 7) {
            weeks.push(enrichedDays.slice(i, i + 7));
        }

        // Create month key in format "YYYY-MM"
        const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;

        calendarData.set(monthKey, {
            month,
            weeks,
        });
    }

    return calendarData;
};

const CalendarProvider = ({ children, initialSelectedDate, events }: CalendarProviderProps) => {
    // Normalize initial date to start of day
    const normalizedInitialDate = useMemo(() => {
        const date = new Date(initialSelectedDate);
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    }, [initialSelectedDate]);

    const [selectedDate, setSelectedDate] = useState<Date>(normalizedInitialDate);
    const [selectedMonth, setSelectedMonth] = useState<Date>(normalizedInitialDate);
    const [focusedDate, setFocusedDate] = useState<Date>(normalizedInitialDate);

    // Get the year constraint from the initial date
    const year = normalizedInitialDate.getUTCFullYear();

    // Filter out null events from Contentful and ensure we have valid events
    const validEvents = useMemo(() => {
        return events.filter((event): event is CalendarEventFieldsFragment => event !== null);
    }, [events]);

    // Build the calendar data structure from events
    const calendarData = useMemo(() => {
        return buildCalendarData(year, validEvents);
    }, [year, validEvents]);

    // Check if we can navigate to next/prev month (within the same year)
    const canGoToNextMonth =
        selectedMonth.getUTCMonth() < 11 && selectedMonth.getUTCFullYear() === year; // December is month 11
    const canGoToPrevMonth =
        selectedMonth.getUTCMonth() > 0 && selectedMonth.getUTCFullYear() === year; // January is month 0

    const goToNextMonth = useCallback(() => {
        if (!canGoToNextMonth) {
            return;
        }

        const nextMonth = new Date(selectedMonth);
        nextMonth.setUTCMonth(selectedMonth.getUTCMonth() + 1);
        // Ensure we're still in the same year
        if (nextMonth.getUTCFullYear() === year) {
            setSelectedMonth(nextMonth);
            // Update focused date to same day number in new month, or last day if that day doesn't exist
            const focusedDay = focusedDate.getUTCDate();
            const lastDayOfNewMonth = new Date(
                Date.UTC(nextMonth.getUTCFullYear(), nextMonth.getUTCMonth() + 1, 0)
            ).getUTCDate();
            const newFocusedDay = Math.min(focusedDay, lastDayOfNewMonth);
            const newFocusedDate = new Date(
                Date.UTC(nextMonth.getUTCFullYear(), nextMonth.getUTCMonth(), newFocusedDay)
            );
            setFocusedDate(newFocusedDate);
        }
    }, [canGoToNextMonth, focusedDate, selectedMonth, year]);

    const goToPrevMonth = useCallback(() => {
        if (!canGoToPrevMonth) {
            return;
        }

        const prevMonth = new Date(selectedMonth);
        prevMonth.setUTCMonth(selectedMonth.getUTCMonth() - 1);
        // Ensure we're still in the same year
        if (prevMonth.getUTCFullYear() === year) {
            setSelectedMonth(prevMonth);
            // Update focused date to same day number in new month, or last day if that day doesn't exist
            const focusedDay = focusedDate.getUTCDate();
            const lastDayOfNewMonth = new Date(
                Date.UTC(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth() + 1, 0)
            ).getUTCDate();
            const newFocusedDay = Math.min(focusedDay, lastDayOfNewMonth);
            const newFocusedDate = new Date(
                Date.UTC(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth(), newFocusedDay)
            );
            setFocusedDate(newFocusedDate);
        }
    }, [canGoToPrevMonth, focusedDate, selectedMonth, year]);

    const selectDate = useCallback((date: Date) => {
        const normalizedDate = new Date(
            Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
        );
        setSelectedDate(normalizedDate);
        setFocusedDate(normalizedDate);
        setSelectedMonth(normalizedDate);
    }, []);

    const handleSetFocusedDate = useCallback((date: Date) => {
        const normalizedDate = new Date(
            Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
        );
        setFocusedDate(normalizedDate);
    }, []);

    const hasEvents = useCallback(
        (date: Date): boolean => {
            return validEvents.some((event) => eventOccursOnDay(event, date));
        },
        [validEvents]
    );

    const getEventsForDate = useCallback(
        (date: Date): Array<CalendarEventFieldsFragment> => {
            return validEvents.filter((event) => eventOccursOnDay(event, date));
        },
        [validEvents]
    );

    const value = useMemo<CalendarContextValue>(() => {
        return {
            selectedDate,
            selectedMonth,
            focusedDate,
            calendarData,
            goToNextMonth,
            goToPrevMonth,
            selectDate,
            setFocusedDate: handleSetFocusedDate,
            hasEvents,
            getEventsForDate,
            canGoToNextMonth,
            canGoToPrevMonth,
        };
    }, [
        selectedDate,
        selectedMonth,
        focusedDate,
        calendarData,
        goToNextMonth,
        goToPrevMonth,
        selectDate,
        handleSetFocusedDate,
        hasEvents,
        getEventsForDate,
        canGoToNextMonth,
        canGoToPrevMonth,
    ]);

    return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};

const useCalendar = (): CalendarContextValue => {
    const context = useContext(CalendarContext);
    if (context === undefined) {
        throw new Error("useCalendar must be used within a CalendarProvider");
    }
    return context;
};

export { CalendarProvider, useCalendar };
