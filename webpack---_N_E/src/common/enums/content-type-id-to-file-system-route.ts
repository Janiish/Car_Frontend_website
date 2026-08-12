export const CONTENT_TYPE_ID_TO_FILE_SYSTEM_ROUTE: Record<string, string> = {
    pageHomepage: "/",
    newPageHomepage: "/new-homepage",
    pageSearch: "/search",

    pageArticle: "/articles",
    pageBasic: "/",

    pageCar: "/cars",
    pageDriver: "/drivers",
    pageTeam: "/teams",
    pageRaceEvent: "/events",

    pageRaceSeries: "/series",
} as const;

export const MAIN_CATEGORY_TO_FILE_SYSTEM_ROUTE: Record<string, string> = {
    cars: "/cars",
    drivers: "/drivers",
    articles: "/articles",
    series: "/series",
    teams: "/teams",
    events: "/events",
} as const;
