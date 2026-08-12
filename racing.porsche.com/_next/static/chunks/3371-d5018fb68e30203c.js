"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [755, 3371], {
        25915: (e, n, a) => {
            a.d(n, {
                MR: () => c,
                Wh: () => d,
                nJ: () => o
            });
            var t = a(6029),
                l = a(55729);
            let o = {
                    "m-left-top-left-card": "m-left-top-left-card",
                    "m-left-top-right-card": "m-left-top-right-card",
                    "m-left-bottom-card": "m-left-bottom-card",
                    "m-center-card": "m-center-card",
                    "m-right-top-left-card": "m-right-top-left-card",
                    "m-right-top-right-card": "m-right-top-right-card",
                    "m-right-bottom-card": "m-right-bottom-card",
                    "widget-launcher": "widget-launcher"
                },
                r = {
                    "m-left-top-left-card": {
                        width: null,
                        height: null,
                        x: null,
                        y: null
                    },
                    "m-left-top-right-card": {
                        width: null,
                        height: null,
                        x: null,
                        y: null
                    },
                    "m-left-bottom-card": {
                        width: null,
                        height: null,
                        x: null,
                        y: null
                    },
                    "m-center-card": {
                        width: null,
                        height: null,
                        x: null,
                        y: null
                    },
                    "m-right-top-left-card": {
                        width: null,
                        height: null,
                        x: null,
                        y: null
                    },
                    "m-right-top-right-card": {
                        width: null,
                        height: null,
                        x: null,
                        y: null
                    },
                    "m-right-bottom-card": {
                        width: null,
                        height: null,
                        x: null,
                        y: null
                    },
                    "widget-launcher": {
                        width: null,
                        height: null,
                        x: null,
                        y: null
                    }
                },
                i = () => {
                    var e, n, a, t;
                    let {
                        "widget-launcher": l,
                        ...i
                    } = o, s = { ...r
                    }, c = document.getElementById(l);
                    if (!c) return s;
                    let d = null == c ? void 0 : c.getBoundingClientRect(),
                        g = null != (e = null == d ? void 0 : d.x) ? e : 0,
                        h = null != (n = null == d ? void 0 : d.y) ? n : 0;
                    return s["widget-launcher"] = {
                        width: Math.round(null != (a = null == d ? void 0 : d.width) ? a : 0),
                        height: Math.round(null != (t = null == d ? void 0 : d.height) ? t : 0),
                        x: Math.round(g),
                        y: Math.round(h)
                    }, Object.entries(i).forEach(e => {
                        let [n, a] = e, t = document.getElementById(a);
                        if (t) {
                            let e = t.getBoundingClientRect(),
                                a = Math.round(e.width),
                                l = Math.round(e.height),
                                o = Math.round(e.x),
                                r = Math.round(e.y);
                            s[n] = {
                                width: a,
                                height: l,
                                x: o,
                                y: r
                            }
                        }
                    }), s
                },
                s = (0, l.createContext)({
                    layout: r,
                    updateLayout: () => {},
                    layoutReady: !1,
                    canAnimate: !1,
                    setCanAnimate: () => {}
                }),
                c = e => {
                    let {
                        children: n
                    } = e, [a, o] = (0, l.useState)(r), [c, d] = (0, l.useState)(!1), [g, h] = (0, l.useState)(!1), u = (0, l.useCallback)(() => {
                        o(i()), d(!0)
                    }, []);
                    (0, l.useEffect)(() => {
                        if (!g) return;
                        let e = ((e, n) => {
                                let a;
                                return () => {
                                    clearTimeout(a), a = window.setTimeout(e, 0)
                                }
                            })(() => {
                                o(i()), d(!0)
                            }, 0),
                            n = new ResizeObserver(e);
                        return n.observe(document.documentElement), window.addEventListener("scroll", e, {
                            passive: !0
                        }), () => {
                            n.disconnect(), window.removeEventListener("scroll", e)
                        }
                    }, [g]);
                    let P = (0, l.useMemo)(() => ({
                        layout: a,
                        updateLayout: u,
                        layoutReady: c,
                        canAnimate: g,
                        setCanAnimate: h
                    }), [a, u, c, g, h]);
                    return (0, t.jsx)(s.Provider, {
                        value: P,
                        children: n
                    })
                };
            c.displayName = "DashboardLayoutProvider";
            let d = () => {
                let e = (0, l.useContext)(s);
                if (!e) throw Error("useDashboardLayout must be used within a DashboardLayoutProvider");
                return e
            }
        },
        48788: (e, n, a) => {
            a.d(n, {
                IK: () => h,
                Jr: () => P,
                WK: () => d,
                bb: () => g,
                z: () => u
            });
            let t = "m-left-bottom-card",
                l = "m-left-top-left-card",
                o = "m-left-top-right-card",
                r = "m-center-card",
                i = "m-right-top-left-card",
                s = "m-right-top-right-card",
                c = "m-right-bottom-card",
                d = {
                    [t]: 0,
                    [l]: .05,
                    [o]: .1,
                    [r]: .15,
                    [i]: .2,
                    [s]: .25,
                    [c]: .3
                },
                g = {
                    [t]: 1.33,
                    [l]: 1.28,
                    [o]: 1.23,
                    [r]: 1.18,
                    [i]: 1.13,
                    [s]: 1.08,
                    [c]: 1.03
                },
                h = {
                    [l]: 0,
                    [o]: 0,
                    [t]: 0,
                    [r]: 0,
                    [i]: 0,
                    [s]: 0,
                    [c]: 0
                },
                u = {
                    [l]: 1.33,
                    [o]: 1.33,
                    [t]: 1.33,
                    [r]: 1.33,
                    [i]: 1.33,
                    [s]: 1.33,
                    [c]: 1.33
                };
            d[c], g[c];
            let P = [.8, 0, .2, 1]
        },
        51225: (e, n, a) => {
            a.d(n, {
                c7: () => y
            });
            var t = a(3082),
                l = a(40157),
                o = a(26084),
                r = a(50281),
                i = a(66121),
                s = a(12482),
                c = a(54513);
            let d = "\n    fragment DashboardPageRaceEventFields on PageRaceEvent {\n  ...PageRaceEventLinkToFields\n  event {\n    startDate\n    endDate\n  }\n}\n    ",
                g = "\n    fragment DashboardPageDriverFields on PageDriver {\n  ...PageDriverLinkToFields\n}\n    ",
                h = "\n    fragment DashboardPageArticleFields on PageArticle {\n  ...PageArticleLinkToFields\n}\n    ",
                u = "\n    fragment DashboardPageBasicFields on PageBasic {\n  ...PageBasicLinkToFields\n}\n    ",
                P = "\n    fragment DashboardPageCategoryFields on PageCategory {\n  ...PageCategoryLinkToFields\n}\n    ",
                m = "\n    fragment DashboardPageTeamFields on PageTeam {\n  ...PageTeamLinkToFields\n}\n    ",
                b = "\n    fragment DashboardPageCarFields on PageCar {\n  ...PageCarLinkToFields\n}\n    ",
                D = "\n    fragment DashboardPageRaceSeriesFields on PageRaceSeries {\n  ...PageRaceSeriesLinkToFields\n}\n    ",
                F = "\n    fragment DashboardFields on Dashboard {\n  ...ComponentReferenceFields\n  showDashboard\n  widgetLauncherAsset\n  leftBottomCard {\n    ... on PageRaceEvent {\n      ...DashboardPageRaceEventFields\n    }\n    ... on PageDriver {\n      ...DashboardPageDriverFields\n    }\n    ... on PageArticle {\n      ...DashboardPageArticleFields\n    }\n    ... on PageBasic {\n      ...DashboardPageBasicFields\n    }\n    ... on PageCategory {\n      ...DashboardPageCategoryFields\n    }\n    ... on PageTeam {\n      ...DashboardPageTeamFields\n    }\n    ... on PageCar {\n      ...DashboardPageCarFields\n    }\n    ... on PageRaceSeries {\n      ...DashboardPageRaceSeriesFields\n    }\n  }\n  centerCard {\n    ... on PageRaceEvent {\n      ...DashboardPageRaceEventFields\n    }\n    ... on PageDriver {\n      ...DashboardPageDriverFields\n    }\n    ... on PageArticle {\n      ...DashboardPageArticleFields\n    }\n    ... on PageBasic {\n      ...DashboardPageBasicFields\n    }\n    ... on PageCategory {\n      ...DashboardPageCategoryFields\n    }\n    ... on PageTeam {\n      ...DashboardPageTeamFields\n    }\n    ... on PageCar {\n      ...DashboardPageCarFields\n    }\n    ... on PageRaceSeries {\n      ...DashboardPageRaceSeriesFields\n    }\n  }\n  rightTopLeftCard {\n    ... on PageRaceEvent {\n      ...DashboardPageRaceEventFields\n    }\n    ... on PageDriver {\n      ...DashboardPageDriverFields\n    }\n    ... on PageArticle {\n      ...DashboardPageArticleFields\n    }\n    ... on PageBasic {\n      ...DashboardPageBasicFields\n    }\n    ... on PageCategory {\n      ...DashboardPageCategoryFields\n    }\n    ... on PageTeam {\n      ...DashboardPageTeamFields\n    }\n    ... on PageCar {\n      ...DashboardPageCarFields\n    }\n    ... on PageRaceSeries {\n      ...DashboardPageRaceSeriesFields\n    }\n  }\n  rightTopRightCard {\n    ... on PageRaceEvent {\n      ...DashboardPageRaceEventFields\n    }\n    ... on PageDriver {\n      ...DashboardPageDriverFields\n    }\n    ... on PageArticle {\n      ...DashboardPageArticleFields\n    }\n    ... on PageBasic {\n      ...DashboardPageBasicFields\n    }\n    ... on PageCategory {\n      ...DashboardPageCategoryFields\n    }\n    ... on PageTeam {\n      ...DashboardPageTeamFields\n    }\n    ... on PageCar {\n      ...DashboardPageCarFields\n    }\n    ... on PageRaceSeries {\n      ...DashboardPageRaceSeriesFields\n    }\n  }\n  rightBottomCard {\n    ... on PageRaceEvent {\n      ...DashboardPageRaceEventFields\n    }\n    ... on PageDriver {\n      ...DashboardPageDriverFields\n    }\n    ... on PageArticle {\n      ...DashboardPageArticleFields\n    }\n    ... on PageBasic {\n      ...DashboardPageBasicFields\n    }\n    ... on PageCategory {\n      ...DashboardPageCategoryFields\n    }\n    ... on PageTeam {\n      ...DashboardPageTeamFields\n    }\n    ... on PageCar {\n      ...DashboardPageCarFields\n    }\n    ... on PageRaceSeries {\n      ...DashboardPageRaceSeriesFields\n    }\n  }\n  labelNoEventsOnDate\n}\n    ",
                v = "\n    query DashboardCollection($locale: String!, $preview: Boolean!, $limit: Int = 1) {\n  dashboardCollection(locale: $locale, preview: $preview, limit: $limit) {\n    items {\n      ...DashboardFields\n    }\n  }\n}\n    ".concat(F, "\n").concat(l.o, "\n").concat(d, "\n").concat(t.x2, "\n").concat(g, "\n").concat(t.QK, "\n").concat(o.P, "\n").concat(h, "\n").concat(t.K7, "\n").concat(u, "\n").concat(t.e3, "\n").concat(P, "\n").concat(t.Ah, "\n").concat(m, "\n").concat(t.F9, "\n").concat(r.z, "\n").concat(b, "\n").concat(t.Y4, "\n").concat(i.cz, "\n").concat(i.Uc, "\n").concat(D, "\n").concat(t.gZ),
                f = (e, n) => (0, s.I)({
                    queryKey: ["DashboardCollection", e],
                    queryFn: (0, c.x8)(v, e),
                    ...n
                });
            f.getKey = e => ["DashboardCollection", e], f.fetcher = (e, n) => (0, c.x8)(v, e, n);
            let p = "\n    query Dashboard($locale: String!, $preview: Boolean!, $id: String!) {\n  dashboard(id: $id, locale: $locale, preview: $preview) {\n    ...DashboardFields\n  }\n}\n    ".concat(F, "\n").concat(l.o, "\n").concat(d, "\n").concat(t.x2, "\n").concat(g, "\n").concat(t.QK, "\n").concat(o.P, "\n").concat(h, "\n").concat(t.K7, "\n").concat(u, "\n").concat(t.e3, "\n").concat(P, "\n").concat(t.Ah, "\n").concat(m, "\n").concat(t.F9, "\n").concat(r.z, "\n").concat(b, "\n").concat(t.Y4, "\n").concat(i.cz, "\n").concat(i.Uc, "\n").concat(D, "\n").concat(t.gZ),
                y = (e, n) => (0, s.I)({
                    queryKey: ["Dashboard", e],
                    queryFn: (0, c.x8)(p, e),
                    ...n
                });
            y.getKey = e => ["Dashboard", e], y.fetcher = (e, n) => (0, c.x8)(p, e, n)
        },
        70659: (e, n, a) => {
            a.d(n, {
                U: () => d
            });
            var t = a(6029),
                l = a(55729),
                o = a(77367),
                r = a(69757),
                i = a(38275),
                s = a(35882),
                c = a(21938);
            let d = (0, o.R)((e, n) => {
                let a = (0, r.V)("NdlSurface", e),
                    {
                        className: o,
                        as: d,
                        children: g,
                        ...h
                    } = (0, i.M)(e),
                    u = (0, l.useMemo)(() => ({ ...a,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                        justifyContent: "space-between"
                    }), [a]);
                return (0, t.jsx)(s.B.div, {
                    ref: n,
                    as: d,
                    __css: u,
                    className: (0, c.cx)("ndl-surface", o),
                    ...h,
                    children: g
                })
            });
            d.displayName = "NdlSurface"
        },
        84721: (e, n, a) => {
            a.d(n, {
                E: () => c
            });
            var t = a(6029),
                l = a(77367),
                o = a(69757),
                r = a(38275),
                i = a(35882),
                s = a(21938);
            let c = (0, l.R)((e, n) => {
                let a = (0, o.V)("NdlIcon", e),
                    {
                        className: l,
                        as: c,
                        name: d,
                        spriteSheetFilename: g = "/icons.sprite.inline.svg",
                        ...h
                    } = (0, r.M)(e);
                return (0, t.jsx)(i.B.svg, {
                    ref: n,
                    as: c,
                    __css: a,
                    className: (0, s.cx)("ndl-icon", l),
                    "aria-hidden": "true",
                    role: "presentation",
                    focusable: "false",
                    fill: "currentColor",
                    ...h,
                    children: (0, t.jsx)("use", {
                        href: "".concat(g, "#pmh-").concat(d)
                    })
                })
            });
            c.displayName = "NdlIcon"
        },
        86776: (e, n, a) => {
            a.d(n, {
                l: () => g
            });
            var t = a(6029),
                l = a(62867),
                o = a(81278),
                r = a(15808),
                i = a(55729),
                s = a(958),
                c = a(28218),
                d = a(52229);
            let g = e => {
                var n, a, g, h, u;
                let {
                    title: P,
                    description: m,
                    openGraphImage: b,
                    siteSettingsId: D,
                    noindex: F,
                    nofollow: v,
                    themeColor: f = "#FFFFFF",
                    localeSlugMap: p
                } = e, y = (0, d.usePathname)(), {
                    locale: w,
                    locales: C,
                    defaultLocale: R,
                    isPreview: x
                } = (0, o.useRouter)(), {
                    data: S
                } = (0, r.q$)({
                    id: D,
                    locale: w,
                    preview: x
                }, { ...!x && {
                        staleTime: 1 / 0
                    }
                }), T = (0, i.useMemo)(() => {
                    var e, n, a, t, l, o, r;
                    let i = null != P ? P : null == S || null == (e = S.siteSettings) ? void 0 : e.seoDefaultMetaTitle,
                        d = null != m ? m : null == S || null == (n = S.siteSettings) ? void 0 : n.seoDefaultMetaDescription,
                        g = b || (null == S || null == (a = S.siteSettings) ? void 0 : a.seoDefaultOpenGraphImage),
                        h = (0, c.U8)(g, b),
                        u = null != (o = null != v ? v : null == S || null == (t = S.siteSettings) ? void 0 : t.seoDefaultRobotFollow) ? o : "follow",
                        D = null != (r = null != F ? F : null == S || null == (l = S.siteSettings) ? void 0 : l.seoDefaultRobotIndex) ? r : "index",
                        f = "/" === y ? "" : y,
                        x = (0, s.KQ)(R === w ? y : "/".concat(w).concat(f)),
                        T = p ? (0, c.Al)(p, R) : (0, c.Gh)(C, R, y);
                    return {
                        title: String(i),
                        description: String(d),
                        openGraphImage: h,
                        languageAlternates: T,
                        nofollow: (0, s.Vw)(u),
                        noindex: (0, s.Cw)(D),
                        canonical: x
                    }
                }, [P, null == S || null == (n = S.siteSettings) ? void 0 : n.seoDefaultMetaTitle, null == S || null == (a = S.siteSettings) ? void 0 : a.seoDefaultMetaDescription, null == S || null == (g = S.siteSettings) ? void 0 : g.seoDefaultOpenGraphImage, null == S || null == (h = S.siteSettings) ? void 0 : h.seoDefaultRobotFollow, null == S || null == (u = S.siteSettings) ? void 0 : u.seoDefaultRobotIndex, m, b, v, F, R, w, y, C, p]);
                return (0, t.jsx)(l.bV, {
                    title: T.title,
                    description: T.description,
                    nofollow: T.nofollow,
                    noindex: T.noindex,
                    canonical: T.canonical,
                    languageAlternates: T.languageAlternates,
                    themeColor: f,
                    twitter: {
                        cardType: "summary_large_image"
                    },
                    openGraph: {
                        type: "website",
                        title: T.title,
                        description: T.description,
                        ...T.openGraphImage && {
                            images: [{
                                url: T.openGraphImage,
                                alt: T.description,
                                width: c.ZL,
                                height: c.WB
                            }]
                        },
                        locale: w,
                        siteName: "Porsche Motorsport Hub",
                        url: T.canonical
                    }
                })
            }
        }
    }
]);
//# sourceMappingURL=3371-d5018fb68e30203c.js.map