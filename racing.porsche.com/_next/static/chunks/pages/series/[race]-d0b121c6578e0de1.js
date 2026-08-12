(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [1087], {
        11521: (e, n, l) => {
            "use strict";
            l.r(n), l.d(n, {
                __N_SSG: () => T,
                default: () => h
            });
            var i = l(6029),
                t = l(55729),
                o = l(55223),
                a = l(3082),
                r = l(40157);
            let s = "\n    fragment SeriesFields on Series {\n  ...ComponentReferenceFields\n  name\n  description\n  foundingDate\n  country\n  image\n  logo\n}\n    ";
            var c = l(66121),
                g = l(26084),
                u = l(12482),
                d = l(54513);
            let p = "\n    fragment PageRaceSeriesFields on PageRaceSeries {\n  ...PageRaceSeriesLinkToFields\n  aiGenerated\n  series {\n    ...SeriesFields\n  }\n  linkLabel\n  link {\n    ... on PageArticle {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageBasic {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageCar {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageCategory {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      mainCategory\n    }\n    ... on PageDriver {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageHomepage {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n    }\n    ... on PageRaceSeries {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageRaceEvent {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageSearch {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n    }\n    ... on PageTeam {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n  }\n  introductionCaption\n  introduction\n  introHeading\n  introColumn1\n  introColumn2\n  modulesCollection(limit: 20) {\n    __typename\n    items {\n      __typename\n      ... on Entry {\n        sys {\n          id\n        }\n      }\n    }\n  }\n  partnerSet {\n    ...PartnerSetFields\n  }\n  tagsCollection {\n    items {\n      ...ContentTagFields\n    }\n  }\n  seoMetaDescription\n  robotFollow\n  robotIndex\n}\n    ",
                m = "\n    query PageRaceSeriesCollection($locale: String!, $preview: Boolean, $slug: String!) {\n  pageRaceSeriesCollection(\n    limit: 1\n    locale: $locale\n    preview: $preview\n    where: {slug: $slug}\n  ) {\n    items {\n      ...PageRaceSeriesFields\n    }\n  }\n}\n    ".concat(p, "\n").concat(a.gZ, "\n").concat(r.o, "\n").concat(s, "\n").concat(c.cz, "\n").concat(c.Uc, "\n").concat(g.P),
                v = (e, n) => (0, u.I)({
                    queryKey: ["PageRaceSeriesCollection", e],
                    queryFn: (0, d.x8)(m, e),
                    ...n
                });
            v.getKey = e => ["PageRaceSeriesCollection", e], v.fetcher = (e, n) => (0, d.x8)(m, e, n);
            let S = "\n    query PageRaceSeries($locale: String!, $preview: Boolean, $id: String!) {\n  page: pageRaceSeries(id: $id, locale: $locale, preview: $preview) {\n    ...PageRaceSeriesFields\n  }\n}\n    ".concat(p, "\n").concat(a.gZ, "\n").concat(r.o, "\n").concat(s, "\n").concat(c.cz, "\n").concat(c.Uc, "\n").concat(g.P),
                P = (e, n) => (0, u.I)({
                    queryKey: ["PageRaceSeries", e],
                    queryFn: (0, d.x8)(S, e),
                    ...n
                });
            P.getKey = e => ["PageRaceSeries", e], P.fetcher = (e, n) => (0, d.x8)(S, e, n);
            var C = l(81278),
                R = l(35854),
                F = l(83679),
                f = l(68396),
                w = l(25416);
            let y = e => {
                    let {
                        modulesCollection: n,
                        slug: l,
                        ...t
                    } = e;
                    return (0, i.jsxs)("section", {
                        children: [(0, i.jsx)(w.I, { ...t
                        }), (0, i.jsx)(f.C, { ...t
                        }), null == n ? void 0 : n.items.map((e, n) => e && (0, i.jsx)(F.Y, {
                            componentProps: e,
                            index: n
                        }, e.sys.id + crypto.randomUUID()))]
                    })
                },
                _ = e => {
                    let {
                        id: n,
                        locale: l,
                        preview: t
                    } = e, {
                        data: o,
                        isLoading: a
                    } = P({
                        id: n,
                        locale: l,
                        preview: t
                    }, { ...!t && {
                            staleTime: 1 / 0
                        },
                        refetchOnWindowFocus: !1
                    }), r = (0, R.qM)(null == o ? void 0 : o.page, {
                        locale: l
                    });
                    return a || !r ? null : (0, i.jsx)(y, { ...r
                    })
                };
            var x = l(86776);
            let k = e => {
                var n, l, o, a, r;
                let {
                    pageId: s,
                    siteSettingsId: c,
                    localeSlugMap: g
                } = e, {
                    locale: u,
                    isPreview: d
                } = (0, C.useRouter)(), {
                    data: p
                } = P({
                    id: s,
                    locale: u,
                    preview: d
                }, { ...!d && {
                        staleTime: 1 / 0
                    }
                }), m = (0, t.useMemo)(() => {
                    var e, n, l, i, t;
                    return {
                        title: String(null == p || null == (e = p.page) ? void 0 : e.title),
                        description: null == p || null == (n = p.page) ? void 0 : n.seoMetaDescription,
                        openGraphImage: null == p || null == (l = p.page) ? void 0 : l.heroAsset,
                        noindex: null == p || null == (i = p.page) ? void 0 : i.robotIndex,
                        nofollow: null == p || null == (t = p.page) ? void 0 : t.robotFollow
                    }
                }, [null == p || null == (n = p.page) ? void 0 : n.heroAsset, null == p || null == (l = p.page) ? void 0 : l.robotFollow, null == p || null == (o = p.page) ? void 0 : o.robotIndex, null == p || null == (a = p.page) ? void 0 : a.seoMetaDescription, null == p || null == (r = p.page) ? void 0 : r.title]);
                return (0, i.jsxs)(i.Fragment, {
                    children: [(0, i.jsx)(x.l, { ...m,
                        siteSettingsId: c,
                        localeSlugMap: g
                    }), (0, i.jsx)(_, {
                        id: s,
                        locale: u,
                        preview: d
                    })]
                })
            };
            k.getLayout = e => (0, i.jsx)(o.Y, {
                children: e
            });
            var T = !0;
            let h = k
        },
        59869: (e, n, l) => {
            (window.__NEXT_P = window.__NEXT_P || []).push(["/series/[race]", function() {
                return l(11521)
            }])
        }
    },
    e => {
        e.O(0, [880, 2013, 5223, 3371, 3925, 636, 6593, 8792], () => e(e.s = 59869)), _N_E = e.O()
    }
]);
//# sourceMappingURL=[race]-d0b121c6578e0de1.js.map