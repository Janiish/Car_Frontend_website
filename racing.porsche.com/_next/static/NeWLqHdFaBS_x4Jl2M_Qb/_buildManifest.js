self.__BUILD_MANIFEST = function(e, s, a, c, t, n, i, r, d, u, m, f, l, p, h) {
    return {
        __rewrites: {
            afterFiles: [{
                has: u,
                source: "/:nextInternalLocale(en|de\\-DE|en\\-GB|en\\-US|fr\\-FR|it\\-IT|it\\-CH|fr\\-CH|de\\-CH|en\\-NZ|nl\\-NL|fr\\-BE|nl\\-BE|en\\-PAP|en\\-SG|en\\-MY|en\\-TH|en\\-ID|ja\\-JP)/sitemap.xml",
                destination: "/:nextInternalLocale/dynamic-sitemap"
            }, {
                has: u,
                source: "/:nextInternalLocale(en|de\\-DE|en\\-GB|en\\-US|fr\\-FR|it\\-IT|it\\-CH|fr\\-CH|de\\-CH|en\\-NZ|nl\\-NL|fr\\-BE|nl\\-BE|en\\-PAP|en\\-SG|en\\-MY|en\\-TH|en\\-ID|ja\\-JP)/sitemap-index.xml",
                destination: "/:nextInternalLocale/dynamic-sitemap-index"
            }, {
                has: u,
                source: "/:nextInternalLocale(en|de\\-DE|en\\-GB|en\\-US|fr\\-FR|it\\-IT|it\\-CH|fr\\-CH|de\\-CH|en\\-NZ|nl\\-NL|fr\\-BE|nl\\-BE|en\\-PAP|en\\-SG|en\\-MY|en\\-TH|en\\-ID|ja\\-JP)/sitemap-:page.xml",
                destination: "/:nextInternalLocale/dynamic-sitemap/:page"
            }],
            beforeFiles: [],
            fallback: []
        },
        __routerFilterStatic: {
            numItems: 0,
            errorRate: 1e-4,
            numBits: 0,
            numHashes: f,
            bitArray: []
        },
        __routerFilterDynamic: {
            numItems: r,
            errorRate: 1e-4,
            numBits: r,
            numHashes: f,
            bitArray: []
        },
        "/": [e, s, a, l, c, i, d, p, "static/chunks/pages/index-b08634d69ec091f3.js"],
        "/404": [e, s, a, c, "static/chunks/pages/404-138dac9b8d377195.js"],
        "/_error": ["static/chunks/pages/_error-417860dddc56c169.js"],
        "/articles": [e, s, a, c, t, n, "static/chunks/pages/articles-062addfc48ce9e2e.js"],
        "/articles/[...slug]": [e, s, a, c, h, "static/chunks/pages/articles/[...slug]-ab530503e8865921.js"],
        "/cars": [e, s, a, c, t, n, "static/chunks/pages/cars-dc9ba35671c59985.js"],
        "/cars/[car]": [e, s, a, c, i, d, "static/chunks/pages/cars/[car]-46e9d27a42958319.js"],
        "/drivers": [e, s, a, c, t, n, "static/chunks/pages/drivers-2cad71afe8a4277e.js"],
        "/drivers/[driver]": [e, s, a, c, h, "static/chunks/pages/drivers/[driver]-2330fd87f51e939f.js"],
        "/dynamic-sitemap": ["static/chunks/pages/dynamic-sitemap-14a955540a7c1c8b.js"],
        "/dynamic-sitemap/[page]": ["static/chunks/pages/dynamic-sitemap/[page]-6cdd5066b298a72f.js"],
        "/dynamic-sitemap-index": ["static/chunks/pages/dynamic-sitemap-index-f1dcfba40e858abc.js"],
        "/events": [e, s, a, c, t, n, "static/chunks/pages/events-1b93d2f91dd9c6fa.js"],
        "/events/[event]": [e, s, a, "static/chunks/244-ab2b2e578a3b243f.js", c, i, d, "static/chunks/pages/events/[event]-2ca11e0864ce47e2.js"],
        "/live-timing/[slug]": [e, s, "static/chunks/2673-0e862493962e93c5.js", "static/chunks/pages/live-timing/[slug]-15ac7aa04b2037ee.js"],
        "/new-homepage": [e, s, a, l, c, i, p, "static/chunks/pages/new-homepage-6a650135edf57855.js"],
        "/search": [e, s, a, c, "static/chunks/pages/search-77edbd20004900d7.js"],
        "/series": [e, s, a, c, t, n, "static/chunks/pages/series-9cb61a07a405b711.js"],
        "/series/[race]": [e, s, a, c, i, d, "static/chunks/pages/series/[race]-d0b121c6578e0de1.js"],
        "/teams": [e, s, a, c, t, n, "static/chunks/pages/teams-00b7d379f8d15c0d.js"],
        "/teams/[team]": [e, s, a, c, "static/chunks/pages/teams/[team]-9b6963c4a3ceaf6d.js"],
        "/[...slug]": [e, s, a, c, "static/chunks/pages/[...slug]-da6bfbb56523503a.js"],
        sortedPages: ["/", "/404", "/_app", "/_error", "/articles", "/articles/[...slug]", "/cars", "/cars/[car]", "/drivers", "/drivers/[driver]", "/dynamic-sitemap", "/dynamic-sitemap/[page]", "/dynamic-sitemap-index", "/events", "/events/[event]", "/live-timing/[slug]", "/new-homepage", "/search", "/series", "/series/[race]", "/teams", "/teams/[team]", "/[...slug]"]
    }
}("static/css/60129ca303924187.css", "static/chunks/880-f65abd7087765651.js", "static/chunks/2013-37c5a4d794375198.js", "static/chunks/5223-477244852072a5ad.js", "static/chunks/2693-2276249d7cf2ed43.js", "static/chunks/3470-0926718449a03dbd.js", "static/chunks/3371-d5018fb68e30203c.js", 0, "static/chunks/3925-67e1000e18ea7c3d.js", void 0, 1e-4, NaN, "static/chunks/1435-2294ca77dbe42df1.js", "static/chunks/630-28595a6b87047740.js", "static/chunks/1066-4ee3220a6cdc595e.js"), self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB();