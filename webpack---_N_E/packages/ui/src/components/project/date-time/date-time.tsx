import type { ElementType } from "react";
import { Text } from "../../chakra-ui/text";
import { Heading } from "../../chakra-ui/heading";
import type { TextProps } from "../../chakra-ui/text";
import { useDateFormatter } from "../../../hooks/project/date-time/useDateFormatter";

type DateTimeProps = TextProps & {
    dateFormatterOptions?: Intl.DateTimeFormatOptions;
    locale?: string;
    isHeading?: boolean;
    timeZoneLabel?: string | null;
    children: string;
    headingComponent?: ElementType;
    textComponent?: ElementType;
};

const DateTime = ({
    children,
    dateFormatterOptions,
    locale,
    isHeading = false,
    timeZoneLabel,
    headingComponent: HeadingComponent = Heading,
    textComponent: TextComponent = Text,
    ...rest
}: DateTimeProps) => {
    const date = useDateFormatter(children, dateFormatterOptions, locale, timeZoneLabel);

    if (isHeading) {
        return (
            <HeadingComponent {...rest} as="time" dateTime={children} suppressHydrationWarning>
                {date}
            </HeadingComponent>
        );
    } else {
        return (
            <TextComponent {...rest} as="time" dateTime={children} suppressHydrationWarning>
                {date}
            </TextComponent>
        );
    }
};

export { DateTime };
export type { DateTimeProps };
