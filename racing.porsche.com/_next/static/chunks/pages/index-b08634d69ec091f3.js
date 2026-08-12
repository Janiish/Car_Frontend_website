(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [3332], {
        17703: (e, n, l) => {
            (window.__NEXT_P = window.__NEXT_P || []).push(["/", function() {
                return l(32709)
            }])
        },
        32709: (e, n, l) => {
            "use strict";
            l.r(n), l.d(n, {
                __N_SSG: () => I,
                default: () => R
            });
            var o = l(6029),
                t = l(55729),
                i = l(81278),
                a = l(86776),
                r = l(55223),
                g = l(3082),
                c = l(40157),
                p = l(66121),
                s = l(12482),
                d = l(54513);
            let u = "\n    fragment PageHomepageFields on PageHomepage {\n  ...PageHomepageLinkToFields\n  aiGenerated\n  linkLabel\n  link {\n    ... on PageArticle {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageBasic {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageCar {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageCategory {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      mainCategory\n    }\n    ... on PageDriver {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageHomepage {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n    }\n    ... on PageRaceSeries {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageRaceEvent {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageSearch {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n    }\n    ... on PageTeam {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n  }\n  introductionCaption\n  introduction\n  introHeading\n  introColumn1\n  introColumn2\n  modulesCollection(limit: 20) {\n    __typename\n    items {\n      __typename\n      ... on Entry {\n        sys {\n          id\n        }\n      }\n    }\n  }\n  partnerSet {\n    ...PartnerSetFields\n  }\n  seoMetaDescription\n  robotFollow\n  robotIndex\n}\n    ",
                m = "\n    query PageHomepageCollection($locale: String!, $preview: Boolean) {\n  pageHomepageCollection(\n    limit: 1\n    locale: $locale\n    preview: $preview\n    where: {title_exists: true}\n  ) {\n    items {\n      ...PageHomepageFields\n    }\n  }\n}\n    ".concat(u, "\n").concat(g.AX, "\n").concat(c.o, "\n").concat(p.cz, "\n").concat(p.Uc),
                v = (e, n) => (0, s.I)({
                    queryKey: ["PageHomepageCollection", e],
                    queryFn: (0, d.x8)(m, e),
                    ...n
                });
            v.getKey = e => ["PageHomepageCollection", e], v.fetcher = (e, n) => (0, d.x8)(m, e, n);
            let P = "\n    query PageHomepage($locale: String!, $preview: Boolean, $id: String!) {\n  page: pageHomepage(id: $id, locale: $locale, preview: $preview) {\n    ...PageHomepageFields\n  }\n}\n    ".concat(u, "\n").concat(g.AX, "\n").concat(c.o, "\n").concat(p.cz, "\n").concat(p.Uc),
                C = (e, n) => (0, s.I)({
                    queryKey: ["PageHomepage", e],
                    queryFn: (0, d.x8)(P, e),
                    ...n
                });
            C.getKey = e => ["PageHomepage", e], C.fetcher = (e, n) => (0, d.x8)(P, e, n);
            var w = l(67465),
                x = l(35854),
                F = l(83679),
                f = l(25416),
                _ = l(68396),
                h = l(11020);
            let y = e => {
                    let {
                        modulesCollection: n,
                        ...l
                    } = e;
                    return (0, o.jsxs)("section", {
                        children: [(0, o.jsx)(h.L, {
                            children: (0, o.jsx)(f.I, { ...l
                            })
                        }), (0, o.jsx)(_.C, { ...l
                        }), null == n ? void 0 : n.items.map((e, n) => e && (0, o.jsx)(F.Y, {
                            componentProps: e,
                            index: n
                        }, e.sys.id + crypto.randomUUID()))]
                    })
                },
                k = e => {
                    let {
                        id: n,
                        locale: l,
                        preview: t
                    } = e, {
                        data: i,
                        isLoading: a
                    } = C({
                        id: n,
                        locale: l,
                        preview: t
                    }, { ...!t && {
                            staleTime: 1 / 0
                        },
                        refetchOnWindowFocus: !1
                    }), r = (0, x.qM)(null == i ? void 0 : i.page, {
                        locale: l
                    });
                    return a || !r ? null : (0, o.jsx)(y, { ...r
                    })
                };
            var H = l(60630);
            let T = e => {
                let {
                    pageId: n,
                    siteSettingsId: l,
                    pageType: r,
                    localeSlugMap: g
                } = e, {
                    locale: c,
                    isPreview: p
                } = (0, i.useRouter)(), s = "NewPageHomepage" === r, {
                    data: d
                } = C({
                    id: n,
                    locale: c,
                    preview: p
                }, {
                    enabled: !s,
                    ...!p && {
                        staleTime: 1 / 0
                    }
                }), {
                    data: u
                } = (0, w.i)({
                    id: n,
                    locale: c,
                    preview: p
                }, {
                    enabled: s
                }), m = (0, t.useMemo)(() => {
                    var e, n, l, o, t, i, a, r, g, c, p;
                    return s ? {
                        title: String(null == u || null == (a = u.page) ? void 0 : a.title),
                        description: null == u || null == (r = u.page) ? void 0 : r.seoMetaDescription,
                        openGraphImage: null == u || null == (g = u.page) ? void 0 : g.openGraphImage,
                        noindex: null == u || null == (c = u.page) ? void 0 : c.robotIndex,
                        nofollow: null == u || null == (p = u.page) ? void 0 : p.robotFollow
                    } : {
                        title: String(null == d || null == (e = d.page) ? void 0 : e.title),
                        description: null == d || null == (n = d.page) ? void 0 : n.seoMetaDescription,
                        openGraphImageHero: null == d || null == (l = d.page) ? void 0 : l.heroAsset,
                        openGraphImage: null == d || null == (o = d.page) ? void 0 : o.openGraphImage,
                        noindex: null == d || null == (t = d.page) ? void 0 : t.robotIndex,
                        nofollow: null == d || null == (i = d.page) ? void 0 : i.robotFollow
                    }
                }, [s, u, d]);
                return (0, o.jsxs)(o.Fragment, {
                    children: [(0, o.jsx)(a.l, { ...m,
                        siteSettingsId: l,
                        localeSlugMap: g
                    }), s ? (0, o.jsx)(H.T, {
                        id: n,
                        locale: c,
                        preview: p
                    }) : (0, o.jsx)(k, {
                        id: n,
                        locale: c,
                        preview: p
                    })]
                })
            };
            T.getLayout = e => (0, o.jsx)(r.Y, {
                children: e
            });
            var I = !0;
            let R = T
        }
    },
    e => {
        e.O(0, [880, 2013, 1435, 5223, 3371, 3925, 630, 636, 6593, 8792], () => e(e.s = 17703)), _N_E = e.O()
    }
]);
//# sourceMappingURL=index-b08634d69ec091f3.js.map