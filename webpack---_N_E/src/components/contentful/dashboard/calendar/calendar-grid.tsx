import { useMemo, useCallback, useRef, type KeyboardEvent } from "react";
import {
    Grid,
    Box,
    MotionBox,
    Flex,
    DateTime,
    NdlSurface,
    type NdlSurfaceProps,
    NdlButton,
    NdlIcon,
    NdlText,
} from "@project/ui";
import { AnimatePresence } from "framer-motion";
import { useCalendar } from "./calendar-context";
import { CalendarDayButton } from "./calendar-day-button";

/**
 * Get the month key in format "YYYY-MM" from a date
 */
const getMonthKey = (date: Date): string => {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // Month is 0-indexed, but key uses 1-indexed
    return `${year}-${String(month).padStart(2, "0")}`;
};

const getMonthIndex = (date: Date): number => date.getUTCFullYear() * 12 + date.getUTCMonth();

type CalendarGridProps = NdlSurfaceProps;

const CalendarGrid = (props: CalendarGridProps) => {
    const {
        selectedMonth,
        selectedDate,
        focusedDate,
        calendarData,
        selectDate,
        setFocusedDate,
        goToNextMonth,
        goToPrevMonth,
        canGoToNextMonth,
        canGoToPrevMonth,
        hasEvents,
    } = useCalendar();

    const today = useMemo(() => new Date(), []);

    const directionRef = useRef(0);
    const previousMonthIndexRef = useRef(getMonthIndex(selectedMonth));

    const currentMonthIndex = getMonthIndex(selectedMonth);
    if (currentMonthIndex !== previousMonthIndexRef.current) {
        if (directionRef.current === 0) {
            directionRef.current = Math.sign(currentMonthIndex - previousMonthIndexRef.current);
        }
        previousMonthIndexRef.current = currentMonthIndex;
    }

    const navigationDirection = directionRef.current;

    const handleNextMonth = useCallback(() => {
        if (!canGoToNextMonth) {
            return;
        }
        directionRef.current = 1;
        goToNextMonth();
    }, [canGoToNextMonth, goToNextMonth]);

    const handlePrevMonth = useCallback(() => {
        if (!canGoToPrevMonth) {
            return;
        }
        directionRef.current = -1;
        goToPrevMonth();
    }, [canGoToPrevMonth, goToPrevMonth]);

    // Get the current month from calendarData
    const currentMonth = useMemo(() => {
        const monthKey = getMonthKey(selectedMonth);
        return calendarData.get(monthKey);
    }, [selectedMonth, calendarData]);

    // Use the month key as the animation key to ensure AnimatePresence detects changes
    const monthKey = useMemo(() => getMonthKey(selectedMonth), [selectedMonth]);

    // Flatten all calendar days for the month to simplify rendering & navigation
    const calendarDays = useMemo(() => {
        if (!currentMonth) {
            return [];
        }
        return currentMonth.weeks.flat();
    }, [currentMonth]);

    const compareDatesByDay = (date1: Date, date2: Date): boolean => {
        return (
            date1.getUTCFullYear() === date2.getUTCFullYear() &&
            date1.getUTCMonth() === date2.getUTCMonth() &&
            date1.getUTCDate() === date2.getUTCDate()
        );
    };

    // Get all dates in a flat array for navigation (extract date from CalendarDay objects)
    const allDates = useMemo(() => {
        return calendarDays.map((day) => day.date);
    }, [calendarDays]);

    // Helper function to navigate to a new date index
    const navigateToIndex = useCallback(
        (newIndex: number) => {
            if (newIndex >= 0 && newIndex < allDates.length) {
                setFocusedDate(allDates[newIndex]);
            }
        },
        [allDates, setFocusedDate]
    );

    // Keyboard navigation handler
    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLButtonElement>, currentDate: Date) => {
            const currentIndex = allDates.findIndex((date) => compareDatesByDay(date, currentDate));

            switch (event.key) {
                case "ArrowUp": {
                    event.preventDefault();
                    navigateToIndex(Math.max(0, currentIndex - 7));
                    break;
                }
                case "ArrowDown": {
                    event.preventDefault();
                    navigateToIndex(Math.min(allDates.length - 1, currentIndex + 7));
                    break;
                }
                case "ArrowLeft": {
                    event.preventDefault();
                    navigateToIndex(Math.max(0, currentIndex - 1));
                    break;
                }
                case "ArrowRight": {
                    event.preventDefault();
                    navigateToIndex(Math.min(allDates.length - 1, currentIndex + 1));
                    break;
                }
                case "Home": {
                    event.preventDefault();
                    const weekStartIndex = Math.floor(currentIndex / 7) * 7;
                    navigateToIndex(weekStartIndex);
                    break;
                }
                case "End": {
                    event.preventDefault();
                    const weekEndIndex = Math.min(
                        allDates.length - 1,
                        Math.floor(currentIndex / 7) * 7 + 6
                    );
                    navigateToIndex(weekEndIndex);
                    break;
                }
                case "PageUp": {
                    event.preventDefault();
                    if (!event.shiftKey && canGoToPrevMonth) {
                        handlePrevMonth();
                    }
                    break;
                }
                case "PageDown": {
                    event.preventDefault();
                    if (!event.shiftKey && canGoToNextMonth) {
                        handleNextMonth();
                    }
                    break;
                }
                case " ": // Space
                case "Enter": {
                    event.preventDefault();
                    selectDate(currentDate);
                    break;
                }
            }
        },
        [
            allDates,
            navigateToIndex,
            selectDate,
            handleNextMonth,
            handlePrevMonth,
            canGoToNextMonth,
            canGoToPrevMonth,
        ]
    );

    const getEnterX = (navDirection: number) => {
        if (navDirection === 0) {
            return 0;
        }

        return navDirection > 0 ? "100%" : "-100%";
    };

    const getExitX = (navDirection: number) => {
        if (navDirection === 0) {
            return 0;
        }

        return navDirection < 0 ? "100%" : "-100%";
    };

    const slideVariants = {
        enter: (navDirection: number) => ({
            x: getEnterX(navDirection),
        }),
        center: {
            zIndex: 1,
            x: 0,
        },
        exit: (navDirection: number) => ({
            zIndex: 0,
            x: getExitX(navDirection),
        }),
    };

    return (
        <NdlSurface
            size="medium"
            p={4}
            position="relative"
            height="full"
            colorScheme="transparent"
            {...props}
        >
            <Flex
                as="nav"
                aria-label="Calendar"
                alignItems="center"
                justifyContent="space-between"
                mb={4}
            >
                <NdlButton
                    aria-label="Previous month"
                    onClick={handlePrevMonth}
                    disabled={!canGoToPrevMonth}
                    size="small"
                    variant="icon"
                    colorScheme="transparent"
                >
                    <NdlIcon name="chevron-left" />
                </NdlButton>

                <NdlText
                    id="calendar-month-year"
                    aria-live="polite"
                    aria-atomic="true"
                    color="allWhite"
                >
                    <DateTime dateFormatterOptions={{ month: "long" }}>
                        {selectedMonth.toISOString()}
                    </DateTime>
                </NdlText>

                <NdlButton
                    aria-label="Next month"
                    onClick={handleNextMonth}
                    disabled={!canGoToNextMonth}
                    size="small"
                    variant="icon"
                    colorScheme="transparent"
                >
                    <NdlIcon name="chevron-right" />
                </NdlButton>
            </Flex>
            <Box position="relative" overflow="hidden" width="100%" height="100%">
                <AnimatePresence custom={navigationDirection} initial={false} mode="popLayout">
                    <MotionBox
                        key={monthKey}
                        custom={navigationDirection}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        width="100%"
                        height="100%"
                        transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                        }}
                        position="absolute"
                        sx={{
                            backfaceVisibility: "hidden",
                            isolation: "isolate",
                            willChange: "transform, z-index",
                        }}
                    >
                        <Grid
                            role="grid"
                            aria-labelledby="calendar-month-year"
                            templateColumns="repeat(7, 1fr)"
                            columnGap={2}
                            rowGap={{ base: 1, ndlDashboardGrid: 2 }}
                            height="full"
                        >
                            {calendarDays.map((day) => (
                                <CalendarDayButton
                                    key={day.date.toISOString()}
                                    date={day.date}
                                    isToday={compareDatesByDay(day.date, today)}
                                    isSelected={compareDatesByDay(day.date, selectedDate)}
                                    isFocused={compareDatesByDay(day.date, focusedDate)}
                                    hasEvents={hasEvents(day.date)}
                                    onClick={() => selectDate(day.date)}
                                    onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) =>
                                        handleKeyDown(event, day.date)
                                    }
                                />
                            ))}
                        </Grid>
                    </MotionBox>
                </AnimatePresence>
            </Box>
        </NdlSurface>
    );
};

CalendarGrid.displayName = "CalendarGrid";

export { CalendarGrid };
