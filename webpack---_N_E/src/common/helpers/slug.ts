import type { ParsedUrlQuery } from "querystring";
import isEmpty from "lodash/isEmpty";
import {
    CONTENT_TYPE_ID_TO_FILE_SYSTEM_ROUTE,
    MAIN_CATEGORY_TO_FILE_SYSTEM_ROUTE,
} from "@/common/enums/content-type-id-to-file-system-route";

const arraySlug = (slug: string | undefined) => (!isEmpty(slug) ? [slug] : []);

export const getSlug = (slug: ParsedUrlQuery["slug"], basePath = "") => {
    const parsedSlug = Array.isArray(slug) ? slug : arraySlug(slug);

    return (
        "/" +
        [basePath, ...parsedSlug]
            .map((str) => str?.split("/")?.filter(Boolean))
            .flat()
            .join("/")
    );
};

export const getComputedSlug = (
    contentTypeId: keyof typeof CONTENT_TYPE_ID_TO_FILE_SYSTEM_ROUTE,
    slug: string | null | undefined,
    mainCategory: keyof typeof MAIN_CATEGORY_TO_FILE_SYSTEM_ROUTE | null | undefined
): string => {
    switch (contentTypeId) {
        case "pageHomepage":
            return getSlug(["/"]);
        case "newPageHomepage":
            return getSlug(["new-homepage"]);
        case "pageSearch":
            return getSlug(["search"]);
        case "pageArticle":
        case "pageBasic":
        case "pageCar":
        case "pageDriver":
        case "pageTeam":
        case "pageRaceSeries":
        case "pageRaceEvent":
            return getSlug([String(slug)], CONTENT_TYPE_ID_TO_FILE_SYSTEM_ROUTE[contentTypeId]);
        case "pageCategory":
            if (!mainCategory) {
                return "";
            }

            return getSlug([], MAIN_CATEGORY_TO_FILE_SYSTEM_ROUTE[mainCategory]);
        default:
            return "";
    }
};

export type GenericPageTypeFields = {
    __typename?: string;
    slug?: string | null;
    mainCategory?: string | null;
};

export const getHrefForPageType = (item: GenericPageTypeFields): string => {
    if (!item.__typename) {
        return "#";
    }

    const _typeName = item.__typename[0].toLowerCase() + item.__typename.slice(1);

    return getComputedSlug(
        _typeName,
        item.slug,
        item.mainCategory as keyof typeof MAIN_CATEGORY_TO_FILE_SYSTEM_ROUTE
    );
};
