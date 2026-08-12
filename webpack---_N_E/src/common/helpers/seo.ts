import type { Document, Text } from "@contentful/rich-text-types";
import { getComputedSlug } from "@/common/helpers/slug";
import type { ISitemapField } from "next-sitemap";
import type { Entry } from "contentful";

export const isRobotNoFollow = (value: string): boolean => value?.toLowerCase() === "nofollow";

export const isRobotNoIndex = (value: string): boolean => value?.toLowerCase() === "noindex";

export const getCanonicalUrl = (path: string): string => {
    // it should strip double slashes, except for the protocol
    return `https://` + process.env.NEXT_PUBLIC_HOSTNAME + path.replace(/([^:]\/)\/+/g, "$1");
};

// XML-escape reserved characters so URLs containing them (e.g. literal "&" from
// CMS slugs) do not break the sitemap. Order matters: `&` must come first.
const escapeXml = (str: string): string =>
    str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

export const getFirstParagraphFromRichText = (text: Document): string | undefined => {
    if (!text?.content) {
        return undefined;
    }

    const firstParagraph = text.content.find((node) => node.nodeType === "paragraph");

    if (!firstParagraph) {
        return undefined;
    }

    return firstParagraph.content.map((node) => (node as Text).value).join("");
};

const formatDateForLastMod = (date: string): string => {
    const _date = new Date(date);

    const year = _date.getFullYear();
    const month = (_date.getMonth() + 1).toString().padStart(2, "0");
    const day = _date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
};

export type PageWithBareMinimumFields = Entry & {
    fields: {
        slug?: string | null;
        mainCategory?: string | null;
        title?: string | null;
    };
};

const getSlugForEntry = (entry: PageWithBareMinimumFields): string | null => {
    if (entry.sys.contentType.sys.id === "pageHomepage") {
        return "/";
    }

    if (entry.sys.contentType.sys.id === "pageSearch") {
        return "/search";
    }

    if (entry.sys.contentType.sys.id === "pageCategory") {
        return null;
    }

    return String(entry.fields.slug);
};

const stripTrailingSlash = (str: string): string => {
    return str.endsWith("/") ? str.slice(0, -1) : str;
};

// Drops noindex pages and structurally-incomplete entries (no title/slug).
export const filterSitemapPagesByLocale = (
    allPagesByLocale: Record<string, Array<PageWithBareMinimumFields>>,
    allSiteSettingsByLocale: Record<string, Array<Entry>>
): Record<string, Array<PageWithBareMinimumFields>> => {
    const result: Record<string, Array<PageWithBareMinimumFields>> = {};

    for (const [locale, entries] of Object.entries(allPagesByLocale)) {
        const localeDefaultRobotIndex = allSiteSettingsByLocale[locale][0].fields
            .seoDefaultRobotIndex as string;

        result[locale] = entries.filter((entry) => {
            const robotIndex = Object.hasOwn(entry.fields, "robotIndex")
                ? (entry.fields.robotIndex as string)
                : localeDefaultRobotIndex;
            if (isRobotNoIndex(robotIndex)) return false;

            const pageContentType = entry.sys.contentType.sys.id;
            const isTitleBased =
                pageContentType === "pageHomepage" ||
                pageContentType === "pageSearch" ||
                pageContentType === "pageCategory";
            return isTitleBased ? !!entry.fields.title : !!entry.fields.slug;
        });
    }

    return result;
};

const computeSlugForEntry = (entry: PageWithBareMinimumFields): string => {
    const raw = getSlugForEntry(entry);
    const mainCategory =
        entry.sys.contentType.sys.id === "pageCategory" ? entry.fields.mainCategory : null;
    return stripTrailingSlash(getComputedSlug(entry.sys.contentType.sys.id, raw, mainCategory));
};

const buildSitemapUrl = (locale: string, computedSlug: string): string => {
    const slugSegment = computedSlug ? `/${computedSlug}` : "";
    const path = locale !== process.env.DEFAULT_LOCALE ? `/${locale}${slugSegment}` : computedSlug;
    return escapeXml(getCanonicalUrl(path));
};

const buildEntryLocaleIndex = (
    allPagesInAllLocales: Record<string, Array<PageWithBareMinimumFields>>
): Map<string, Map<string, PageWithBareMinimumFields>> => {
    const index = new Map<string, Map<string, PageWithBareMinimumFields>>();
    for (const [locale, entries] of Object.entries(allPagesInAllLocales)) {
        for (const entry of entries) {
            let localeMap = index.get(entry.sys.id);
            if (!localeMap) {
                localeMap = new Map();
                index.set(entry.sys.id, localeMap);
            }
            localeMap.set(locale, entry);
        }
    }
    return index;
};

export const createArrayOfSitemapEntries = (
    allPagesInAllLocales: Record<string, Array<PageWithBareMinimumFields>>
): Array<ISitemapField> => {
    const entryLocaleMap = buildEntryLocaleIndex(allPagesInAllLocales);
    const results: Array<ISitemapField> = [];

    for (const [currentLocale, entries] of Object.entries(allPagesInAllLocales)) {
        for (const entry of entries) {
            const computedSlug = computeSlugForEntry(entry);
            const selfUrl = buildSitemapUrl(entry.sys.locale as string, computedSlug);

            const localeMap = entryLocaleMap.get(entry.sys.id)!;
            const alternateRefs: Array<{ href: string; hreflang: string }> = [];

            for (const [otherLocale, otherEntry] of localeMap) {
                if (otherLocale === currentLocale) continue;
                alternateRefs.push({
                    href: buildSitemapUrl(otherLocale, computeSlugForEntry(otherEntry)),
                    hreflang: otherLocale,
                });
            }

            results.push({
                loc: selfUrl,
                lastmod: formatDateForLastMod(entry.sys.updatedAt),
                alternateRefs: [
                    { href: selfUrl, hreflang: entry.sys.locale as string },
                    ...alternateRefs,
                ],
            });
        }
    }

    return results;
};
