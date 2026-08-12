import type { ReactNode } from "react";
import { Box, Flex, DateTime, VStack, NdlSurface, NdlText, NextLink } from "@project/ui";
import type { CalendarEventFieldsFragment } from "./__generated/calendar.contentful.generated";

type CalendarEventDetailsProps = {
    event: CalendarEventFieldsFragment;
    href: string | null;
    onClick?: () => void;
};

const CalendarEventDetailsText = ({ children }: { children: ReactNode }) => {
    return (
        <NdlText as="span" color="allWhite">
            {children}
        </NdlText>
    );
};

const CalendarEventDetailsTimeTextComponent = (props: React.ComponentProps<typeof NdlText>) => {
    return <NdlText {...props} color="grey200" />;
};

const CalendarEventDetailsTimeText = ({ children }: { children: string }) => {
    return (
        <DateTime
            dateFormatterOptions={{ hour: "2-digit", minute: "2-digit" }}
            textComponent={CalendarEventDetailsTimeTextComponent}
        >
            {children}
        </DateTime>
    );
};

const CalendarEventDetails = ({ event, href, onClick }: CalendarEventDetailsProps) => {
    return (
        <NdlSurface
            as={href ? NextLink : undefined}
            href={href ?? undefined}
            onClick={href ? onClick : undefined}
            size="small"
            colorScheme="black"
            p={2}
            gap={2}
            alignItems="flex-start"
            justifyContent="flex-start"
            position="relative"
            flexDirection="row"
            cursor={href ? "pointer" : undefined}
            textDecoration="none"
            transitionProperty="background-color"
            transitionDuration="short"
            _hover={
                href
                    ? {
                          textDecoration: "none",
                          backgroundColor: "ndlLanguageSelectorHoverBg",
                      }
                    : undefined
            }
        >
            <Box
                width={1}
                backgroundColor="motorsportsRed"
                borderRadius="full"
                alignSelf="stretch"
            />
            <VStack align="start" gap={1} width="full">
                <Flex color="allWhite" fontSize="md" fontWeight="medium" gap={0}>
                    <p>
                        <CalendarEventDetailsText>{event.series?.name}</CalendarEventDetailsText>
                        <NdlText as="span" whiteSpace="pre">
                            {" "}
                            {"-"}{" "}
                        </NdlText>
                        <CalendarEventDetailsText>{event.name}</CalendarEventDetailsText>
                    </p>
                </Flex>

                <Flex color="allWhite" gap={0}>
                    {event.startDate && (
                        <CalendarEventDetailsTimeText>
                            {event.startDate}
                        </CalendarEventDetailsTimeText>
                    )}
                </Flex>
            </VStack>
        </NdlSurface>
    );
};

CalendarEventDetails.displayName = "CalendarEventDetails";

export { CalendarEventDetails };
