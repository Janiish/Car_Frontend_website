import { DateFormatter } from "@internationalized/date";
import { useRouter } from "next/router";
import { useMemo } from "react";

const localeMapping: Record<string, string> = {
    "en-PAP": "en",
};

const normalizeLocale = (locale: string): string => {
    try {
        new Intl.DateTimeFormat(locale);
        return locale;
    } catch {
        const localeFromMap = localeMapping[locale];

        if (!localeFromMap) {
            window?.console.error(
                `Locale: ${locale} is invalid and does not have a valid locale mapped. Falling back to default locale.`
            );
            return process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? "en";
        }

        return localeFromMap;
    }
};

const COMMON_DATE_TIME_FORMATTER_OPTIONS = {
    Date: {
        year: "numeric",
        month: "long",
        day: "numeric",
    },
    DateTime: {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    },
    Time: {
        hour: "numeric",
        minute: "numeric",
    },
} as const;

const useDateFormatter = (
    date: Date | string,
    options?: Intl.DateTimeFormatOptions,
    locale?: string,
    timeZoneLabel?: string | null
): string => {
    const { locale: nextLocale } = useRouter();

    const { dateObj } = useMemo(() => {
        if (typeof date === "string") {
            return {
                dateObj: new Date(date),
            };
        }
        return { dateObj: date };
    }, [date]);

    const formattedAndTranslatedDate = useMemo(() => {
        const normalizedLocale = normalizeLocale(locale ?? nextLocale ?? "en");
        return new DateFormatter(normalizedLocale, options).format(dateObj);
    }, [dateObj, locale, nextLocale, options]);

    return [formattedAndTranslatedDate, timeZoneLabel].filter(Boolean).join(" ");
};

export { useDateFormatter, COMMON_DATE_TIME_FORMATTER_OPTIONS };
