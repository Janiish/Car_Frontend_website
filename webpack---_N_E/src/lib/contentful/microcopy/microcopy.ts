import type { FetchMicrocopySetsResults } from "@/lib/contentful/microcopy/fetch-microcopy-sets";
import { MicrocopyGetError } from "@/lib/contentful/microcopy/microcopy-error";
import type { MicrocopyFieldsFragment } from "@/lib/contentful/microcopy/__generated/microcopy-sets.contentful.generated";

type MicrocopyPluralKey = `value${Capitalize<Intl.LDMLPluralRule>}`;

const capitalize = (string: string): string => string[0].toUpperCase() + string.slice(1);

const getMicrocopyItem = (
    context: FetchMicrocopySetsResults,
    microcopySetKey: string,
    microcopyKey: string
): MicrocopyFieldsFragment => {
    const microcopySet = context[microcopySetKey];

    if (!microcopySet) {
        throw new MicrocopyGetError(
            `No MicrocopySet found for ${microcopySetKey}`,
            "microcopySetKey",
            microcopyKey,
            microcopySetKey
        );
    }

    const microcopyItem = microcopySet.find((item) => item?.key === microcopyKey);

    if (!microcopyItem) {
        throw new MicrocopyGetError(
            `No Microcopy entry found for ${microcopyKey}`,
            "microcopy",
            microcopyKey,
            microcopySetKey
        );
    }

    return microcopyItem;
};

export const get = (
    context: FetchMicrocopySetsResults,
    microcopySetKey: string,
    microcopyKey: string
): string => {
    try {
        const microcopyItem = getMicrocopyItem(context, microcopySetKey, microcopyKey);

        if (!microcopyItem.valueOne) {
            return `Unresolved Microcopy value: ${microcopySetKey}: ${microcopyKey}`;
        }

        return microcopyItem.valueOne;
    } catch (error) {
        if (error instanceof MicrocopyGetError) {
            // eslint-disable-next-line no-console
            console.error(error);
            return `Unresolved Microcopy: ${error.message}`;
        } else {
            throw error;
        }
    }
};

export const getAsPluralised = (
    context: FetchMicrocopySetsResults,
    microcopySetKey: string,
    microcopyKey: string,
    locale: string,
    count: number,
    options?: Intl.PluralRulesOptions
): string => {
    const microcopyItem = getMicrocopyItem(context, microcopySetKey, microcopyKey);

    const rules = new Intl.PluralRules(locale, {
        type: "cardinal",
        ...options,
    });

    const pluralRule = rules.select(count);
    const microcopyFieldKey = `value${capitalize(pluralRule)}` as MicrocopyPluralKey;

    const resolvedValue = microcopyItem[microcopyFieldKey];

    if (!resolvedValue) {
        process.env.NODE_ENV !== "production" &&
            // eslint-disable-next-line no-console
            console.warn(
                `No pluralised value found on Microcopy entry with key %c${microcopyKey}%c for count %c${count}%c which resolved to %c${pluralRule}%c for locale %c${locale}%c, falling back to %cvalueOne.`,
                // eslint-disable-next-line sonarjs/no-duplicate-string
                "font-weight: bold; text-decoration: underline;",
                // eslint-disable-next-line sonarjs/no-duplicate-string
                "font-weight: normal;",
                "font-weight: bold; text-decoration: underline;",
                "font-weight: normal;",
                "font-weight: bold; text-decoration: underline;",
                "font-weight: normal;",
                "font-weight: bold; text-decoration: underline;",
                "font-weight: normal;",
                "font-weight: bold; text-decoration: underline;"
            );

        const fallbackValue = microcopyItem.valueOne;

        if (!fallbackValue) {
            return `Unresolved Microcopy value: ${microcopySetKey}: ${microcopyKey}`;
        }

        return fallbackValue;
    }

    return resolvedValue;
};
