import { Box, Flex, forwardRef, NdlButton, type NdlButtonProps } from "@project/ui";

type CalendarDayButtonProps = {
    date: Date;
    isToday: boolean;
    isSelected: boolean;
    isFocused: boolean;
    hasEvents: boolean;
} & NdlButtonProps;

const CalendarBaseButton = forwardRef<NdlButtonProps, "button">((props, ref) => {
    return <NdlButton ref={ref} {...props} />;
});

const CalendarDayButton = ({
    date,
    isToday,
    isSelected,
    isFocused,
    hasEvents,
    onClick,
    onKeyDown,
    ...props
}: CalendarDayButtonProps) => {
    const dayNumber = date.getUTCDate();

    return (
        <Flex justifyContent="center" alignItems="center" flexDirection="column" maxW={7} mx="auto">
            <CalendarBaseButton
                role="gridcell"
                aria-selected={isSelected ? "true" : undefined}
                aria-label={date.toISOString()}
                tabIndex={isFocused ? 0 : -1}
                onClick={onClick}
                onKeyDown={onKeyDown}
                size="xSmall"
                colorScheme={isSelected ? "white" : "transparent"}
                border="1px solid"
                borderColor={isToday && !isSelected ? "white" : "transparent"}
                {...props}
            >
                {dayNumber}
            </CalendarBaseButton>
            <Box
                visibility={hasEvents ? "visible" : "hidden"}
                role="presentation"
                aria-hidden="true"
                width={isSelected ? "full" : 1.5}
                height={1.5}
                mt={1}
                borderRadius="full"
                backgroundColor="motorsportsRed"
                transitionProperty="all"
                transitionDuration="short"
            />
        </Flex>
    );
};

CalendarDayButton.displayName = "CalendarDayButton";

export { CalendarDayButton };
