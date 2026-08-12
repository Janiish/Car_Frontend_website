"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [5223], {
        193: (e, n, t) => {
            t.d(n, {
                N: () => o,
                r: () => r
            });
            var i = t(21576),
                l = t(17341);
            let a = ["colors", "borders", "borderWidths", "borderStyles", "fonts", "fontSizes", "fontWeights", "letterSpacings", "lineHeights", "radii", "space", "shadows", "sizes", "zIndices", "transition", "blur", "breakpoints"],
                o = (e, n, t) => {
                    let i = Array.isArray(n) ? n : [n],
                        l = Array.isArray(t) ? t : [t];
                    return t => {
                        let a = l.filter(Boolean),
                            o = i.map((n, i) => {
                                var l;
                                return ((e, n, t, i) => {
                                    var l, a;
                                    if (null === t) return t;
                                    let o = t => {
                                        var i;
                                        return null == (i = e[n]) ? void 0 : i[t]
                                    };
                                    return null != (a = null != (l = o(t)) ? l : o(i)) ? a : i
                                })(t, e, n, null != (l = a[i]) ? l : n)
                            });
                        return Array.isArray(n) ? o : o[0]
                    }
                },
                r = (e, n, t) => {
                    let r = (0, l.D)();
                    return a.includes(e) ? (0, i.rd)(e, n, t) : o(e, n, t)(r)
                }
        },
        472: (e, n, t) => {
            t.d(n, {
                C: () => s
            });
            var i = t(6029),
                l = t(72343),
                a = t(86590);
            let o = "var(--space-5)",
                r = "var(--space-10)",
                s = e => {
                    let {
                        sx: n,
                        ...t
                    } = e;
                    return (0, i.jsxs)(i.Fragment, {
                        children: [(0, i.jsx)(l.P, {
                            mobile: !0,
                            sx: {
                                display: "flex",
                                position: "absolute",
                                right: [o, r],
                                bottom: [o, r],
                                zIndex: 2,
                                [a.JM.md]: {
                                    display: "none"
                                },
                                ...n
                            },
                            ...t
                        }), (0, i.jsx)(l.P, {
                            sx: {
                                display: "none",
                                position: "absolute",
                                right: [o, r],
                                bottom: [o, r],
                                zIndex: 2,
                                [a.JM.md]: {
                                    display: "flex"
                                },
                                ...n
                            },
                            ...t
                        })]
                    })
                }
        },
        3082: (e, n, t) => {
            t.d(n, {
                AX: () => c,
                Ah: () => r,
                F9: () => g,
                K7: () => l,
                QK: () => s,
                UH: () => d,
                Y4: () => o,
                cx: () => h,
                e3: () => a,
                gZ: () => p,
                ng: () => i,
                x2: () => u
            });
            let i = "\n    fragment ExternalLinkFields on ExternalLink {\n  sys {\n    id\n  }\n  __typename\n  label\n  url\n}\n    ",
                l = "\n    fragment PageArticleLinkToFields on PageArticle {\n  ...ComponentReferenceFields\n  title\n  topic\n  linkTitle\n  openGraphImage\n  slug\n  customFirstPublishedDate\n  tagsCollection {\n    items {\n      ...ContentTagFields\n    }\n  }\n  heroAsset\n}\n    ",
                a = "\n    fragment PageBasicLinkToFields on PageBasic {\n  ...ComponentReferenceFields\n  title\n  subtitle\n  linkTitle\n  openGraphImage\n  subtitle\n  slug\n  tagsCollection {\n    items {\n      ...ContentTagFields\n    }\n  }\n  heroAsset\n}\n    ",
                o = "\n    fragment PageCarLinkToFields on PageCar {\n  ...ComponentReferenceFields\n  title\n  subtitle\n  linkTitle\n  openGraphImage\n  slug\n  heroAsset\n  linkLabel\n  link {\n    ... on PageArticle {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageBasic {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageCar {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageCategory {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      mainCategory\n    }\n    ... on PageDriver {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageHomepage {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n    }\n    ... on PageRaceSeries {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageRaceEvent {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageSearch {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n    }\n    ... on PageTeam {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n  }\n  partnerSet {\n    ...PartnerSetFields\n  }\n  tagsCollection {\n    items {\n      ...ContentTagFields\n    }\n  }\n  car {\n    ...ComponentReferenceFields\n    asset\n  }\n}\n    ",
                r = "\n    fragment PageCategoryLinkToFields on PageCategory {\n  ...ComponentReferenceFields\n  title\n  subtitle\n  linkTitle\n  openGraphImage\n  mainCategory\n  heroAsset\n  subtitle\n  introductionCaption\n  introduction\n}\n    ",
                s = "\n    fragment PageDriverLinkToFields on PageDriver {\n  ...ComponentReferenceFields\n  title\n  linkTitle\n  openGraphImage\n  slug\n  tagsCollection {\n    items {\n      ...ContentTagFields\n    }\n  }\n  driver {\n    ...ComponentReferenceFields\n    asset\n    flag\n    driverName\n  }\n}\n    ",
                c = "\n    fragment PageHomepageLinkToFields on PageHomepage {\n  ...ComponentReferenceFields\n  title\n  subtitle\n  heroAsset\n  linkTitle\n  openGraphImage\n}\n    ",
                d = "\n    fragment NewPageHomepageLinkToFields on NewPageHomepage {\n  ...ComponentReferenceFields\n  title\n  linkTitle\n  openGraphImage\n}\n    ",
                u = "\n    fragment PageRaceEventLinkToFields on PageRaceEvent {\n  ...ComponentReferenceFields\n  title\n  subtitle\n  slug\n  heroAsset\n  linkTitle\n  openGraphImage\n}\n    ",
                p = "\n    fragment PageRaceSeriesLinkToFields on PageRaceSeries {\n  ...ComponentReferenceFields\n  title\n  subtitle\n  slug\n  heroAsset\n  linkTitle\n  openGraphImage\n}\n    ",
                h = "\n    fragment PageSearchLinkToFields on PageSearch {\n  ...ComponentReferenceFields\n  title\n  linkTitle\n  openGraphImage\n}\n    ",
                g = "\n    fragment PageTeamLinkToFields on PageTeam {\n  ...ComponentReferenceFields\n  title\n  linkTitle\n  openGraphImage\n  slug\n  team {\n    ...TeamFields\n  }\n}\n    "
        },
        3591: (e, n, t) => {
            t.d(n, {
                I: () => l
            });
            var i = t(69372);
            let l = (0, t(35882).B)(i.U)
        },
        8128: (e, n, t) => {
            t.d(n, {
                w: () => C
            });
            var i = t(6029),
                l = t(32907),
                a = t(27229),
                o = t(8711),
                r = t(45158),
                s = t(66769),
                c = t(12337),
                d = t(12195),
                u = t(52452),
                p = t(36760),
                h = t(72813),
                g = t(23518),
                m = t(55729),
                x = t(81278),
                v = t(93066),
                b = t(80321),
                f = t(60065),
                y = t(29143);
            let C = e => {
                let {
                    item: n,
                    renderAs: t = l.p,
                    renderExternalLinkAs: C = l.G,
                    onClick: j,
                    children: k,
                    eventAction: w = b.wT.linkClick,
                    ...T
                } = e, {
                    isOpen: P,
                    onOpen: S,
                    onClose: E
                } = (0, a.j)(), {
                    locale: F
                } = (0, x.useRouter)(), {
                    state: {
                        pageType: R,
                        pageId: M,
                        pageContentTags: I
                    }
                } = (0, v.CU)(), {
                    href: A,
                    label: L
                } = (0, m.useMemo)(() => {
                    var e, t, i;
                    let l, a;
                    return n ? ("ExternalLink" === n.__typename ? (l = null != (e = n.url) ? e : "/#", a = null != (t = null != k ? k : n.label) ? t : n.url) : (l = (0, g.s6)(n), a = null != (i = null != k ? k : n.linkTitle) ? i : n.title), {
                        href: l,
                        label: a
                    }) : {
                        href: null,
                        label: null
                    }
                }, [n, k]), _ = !!A && (A.includes("#uc-layer2") || A.includes("#uc-layer4")), N = e => {
                    var t, i;
                    if (_) {
                        let e = (0, f.r)();
                        if (!e) return;
                        "#uc-layer2" === A ? e.toggleCenteredModalIsVisible(!0) : "#uc-layer4" === A && e.toggleConsentInfoModalIsVisible(!0);
                        return
                    }
                    j && j(e);
                    let l = null != A ? A : "",
                        a = null != (i = null != (t = T.clickElementName) ? t : "ExternalLink" === n.__typename ? n.label : n.title) ? i : "",
                        o = "ExternalLink" === n.__typename ? "outbound" : "internal";
                    (0, b.yn)({
                        eventAction: w,
                        locale: F,
                        pageExperience: {
                            pageCategory: R,
                            contentTags: null != I ? I : []
                        },
                        context: { ...T.moduleName && {
                                moduleName: T.moduleName
                            },
                            ...T.modulePosition && {
                                modulePosition: T.modulePosition
                            }
                        },
                        componentClick: {
                            clickElementType: "navigation",
                            clickElementId: M,
                            clickElementName: a,
                            targetUrl: l,
                            targetType: o
                        }
                    })
                };
                if (_) return (0, i.jsx)(l.G, { ...T,
                    href: null != A ? A : "#",
                    target: void 0,
                    onClick: e => {
                        e.preventDefault(), N(e)
                    },
                    style: {
                        cursor: "pointer"
                    },
                    children: L
                });
                if (!n) return (0, i.jsxs)(i.Fragment, {
                    children: [(0, i.jsx)(o.E, {
                        as: "pre",
                        color: "motorsportsRed",
                        onClick: S,
                        cursor: "pointer",
                        children: "error"
                    }), (0, i.jsxs)(r.aF, {
                        isOpen: P,
                        onClose: E,
                        children: [(0, i.jsx)(s.mH, {}), (0, i.jsxs)(c.$, {
                            children: [(0, i.jsx)(d.r, {
                                children: "Error"
                            }), (0, i.jsx)(s.s_, {}), (0, i.jsx)(u.c, {
                                p: 6,
                                children: (0, i.jsx)(o.E, {
                                    children: "The referenced entry is missing or linking to it is not suppored, please check the content in Contentful. A common cause of this is when an unsupported type of entry has been used in a Rich Text Field but validation is not configured correctly."
                                })
                            })]
                        })]
                    })]
                });
                if (null == L) {
                    var H;
                    return "production" === y.env.VERCEL_ENV ? (0, i.jsx)(o.E, {
                        as: "pre",
                        color: "motorsportsRed",
                        children: "error"
                    }) : (0, i.jsxs)(i.Fragment, {
                        children: [(0, i.jsx)(o.E, {
                            as: "pre",
                            color: "motorsportsRed",
                            onClick: S,
                            cursor: "pointer",
                            children: "error"
                        }), (0, i.jsxs)(r.aF, {
                            isOpen: P,
                            onClose: E,
                            children: [(0, i.jsx)(s.mH, {}), (0, i.jsxs)(c.$, {
                                children: [(0, i.jsx)(d.r, {
                                    children: "Error"
                                }), (0, i.jsx)(s.s_, {}), (0, i.jsx)(u.c, {
                                    p: 6,
                                    children: (0, i.jsxs)(p.T, {
                                        align: "start",
                                        children: [(0, i.jsxs)(o.E, {
                                            children: ["Could not determine the ", (0, i.jsx)("code", {
                                                children: "label"
                                            }), ", its value is", " ", (0, i.jsx)("code", {
                                                children: "null"
                                            }), " or ", (0, i.jsx)("code", {
                                                children: "undefined"
                                            }), " for a entry reference link."]
                                        }), (0, i.jsx)(o.E, {
                                            children: "The Porsche Design System components, unlike React, will throw uncaught exceptions that we cannot handle causing the site to crash when the label is nullish."
                                        }), n && (0, i.jsxs)(i.Fragment, {
                                            children: [(0, i.jsxs)(o.E, {
                                                children: ["Below is the referenced entry that is causing the issue. Look for missing values in the", " ", (0, i.jsx)("code", {
                                                    children: "Page Title (H1)"
                                                }), " and ", (0, i.jsx)("code", {
                                                    children: "Link Title"
                                                }), " ", "fields. ", (0, i.jsx)("code", {
                                                    children: "Link Title"
                                                }), " takes precedence over", " ", (0, i.jsx)("code", {
                                                    children: "Page Title (H1)"
                                                }), "."]
                                            }), (null == n || null == (H = n.sys) ? void 0 : H.id) && (0, i.jsx)(o.E, {
                                                children: (0, i.jsx)(l.G, {
                                                    theme: "dark",
                                                    href: "https://app.contentful.com/spaces/".concat("r1mi7scjbdxh", "/environments/").concat("master", "/entries/").concat(n.sys.id),
                                                    children: "Click here to open the entry in Contentful"
                                                })
                                            }), (0, i.jsx)(h.a, {
                                                mt: 4,
                                                children: (0, i.jsx)("pre", {
                                                    children: JSON.stringify(n, null, 2)
                                                })
                                            })]
                                        })]
                                    })
                                })]
                            })]
                        })]
                    })
                }
                return "ExternalLink" === n.__typename || t === l.G ? C ? (0, i.jsx)(C, { ...T,
                    href: A,
                    target: "_blank",
                    onClick: N,
                    children: L
                }) : (0, i.jsx)(l.G, { ...T,
                    href: A,
                    onClick: N,
                    children: L
                }) : (0, i.jsx)(t, { ...T,
                    href: A,
                    onClick: N,
                    children: L
                })
            }
        },
        8711: (e, n, t) => {
            t.d(n, {
                E: () => a
            });
            var i = t(6029),
                l = t(92063);
            let a = e => {
                let {
                    sx: n,
                    ...t
                } = e;
                return (0, i.jsx)(l.E, {
                    sx: {
                        hyphens: "none",
                        ...n
                    },
                    ...t
                })
            }
        },
        9211: (e, n, t) => {
            t.d(n, {
                E: () => a
            });
            var i = t(43380),
                l = t(55729);
            let a = e => (0, l.useMemo)(() => {
                var n;
                return null != (n = i.Xr[e.countryCode]) ? n : null
            }, [e.countryCode])
        },
        10154: (e, n, t) => {
            t.d(n, {
                e: () => r
            });
            var i = t(35882),
                l = t(71849),
                a = t(3141),
                o = t(62151);
            let r = (0, i.B)(a.P.div, {
                shouldForwardProp: e => (0, o.S)(e) || (0, l.M)(e)
            })
        },
        15617: (e, n, t) => {
            t.d(n, {
                X: () => m,
                d: () => b
            });
            var i = t(6029),
                l = t(96538),
                a = t(35882),
                o = t(21576),
                r = t(17341),
                s = t(77367),
                c = t(55729),
                d = t(10154),
                u = t(41824),
                p = t(77396),
                h = t(84482),
                g = t(9480);
            let m = e => {
                    if (!(null == e ? void 0 : e[0])) return !1;
                    let n = e[0];
                    return n.width > n.height
                },
                x = (0, a.B)(l.dp, {
                    shouldForwardProp: e => ["src", "alt", "width", "height", "fill", "loader", "quality", "priority", "loading", "placeholder", "blurDataURL", "unoptimized", "onLoad", "sizes", "gravity", "crop", "blur", "overflow", "rawTransformations", "aspectRatio", "aria-describedby"].includes(e)
                });
            x.displayName = "ChakraCloudinaryImage";
            let v = "opacity 400ms cubic-bezier(0.23, 1, 0.32, 1)",
                b = (0, s.R)((e, n) => {
                    var t, l, s, m;
                    let b = function(e) {
                            if (!e) throw Error("CldImage: cloudinaryAsset is required");
                            if (Array.isArray(e)) {
                                if (0 === e.length) throw Error("CldImage: cloudinaryAsset is required but array was empty");
                                if (e.length > 1) throw Error("CldImage: cloudinaryAsset should be a single asset, not an array of assets - this needs to be configured in the Contentful Cloudinary App")
                            }
                            return e
                        }(e.cloudinaryAsset),
                        {
                            alt: f,
                            width: y,
                            height: C,
                            fill: j,
                            loader: k,
                            onError: w,
                            quality: T,
                            priority: P,
                            loading: S,
                            sizes: E,
                            placeholder: F,
                            blurDataURL: R,
                            unoptimized: M,
                            onLoad: I,
                            objectFit: A,
                            objectPosition: L,
                            title: _,
                            cloudinaryAsset: N,
                            wrapperProps: H,
                            crop: z,
                            gravity: V,
                            overflow: B,
                            rawTransformations: $,
                            animate: D = !1,
                            motionWrapperProps: q,
                            aspectRatio: G,
                            aiTagPosition: W,
                            aiTagOffset: U,
                            hideAiTag: K,
                            ...O
                        } = e,
                        {
                            ariaDescribedBy: Q,
                            tag: X
                        } = (0, p.C)(N, "image", {
                            aiTagPosition: W,
                            aiTagOffset: U,
                            hideAiTag: K
                        }),
                        {
                            placeholder: Y,
                            blurDataURL: Z
                        } = {
                            placeholder: F,
                            blurDataURL: R
                        },
                        J = function(e) {
                            var n, t;
                            return null != (t = null == (n = e[0]) ? void 0 : n.blur_data_url) ? t : void 0
                        }(b),
                        ee = function(e, n) {
                            let [t, i] = (0, c.useState)(!1), l = (0, c.useRef)(null);
                            return (0, c.useEffect)(() => {
                                if (!l.current) return;
                                let e = l.current.querySelector("img");
                                (null == e ? void 0 : e.complete) && e.naturalWidth > 0 && i(!0)
                            }, []), {
                                loaded: t,
                                wrapperRef: l,
                                onLoad: (0, c.useCallback)(e => {
                                    i(!0), null == n || n(e)
                                }, [n])
                            }
                        }(0, I),
                        en = {
                            width: y,
                            height: C,
                            quality: T,
                            priority: P,
                            loading: S,
                            fill: j,
                            onError: w,
                            loader: k,
                            onLoad: ee.onLoad,
                            placeholder: Y,
                            blurDataURL: Z,
                            unoptimized: M,
                            objectPosition: L,
                            title: _
                        },
                        et = (e => {
                            let {
                                breakpoints: n
                            } = (0, r.D)(), t = (0, c.useCallback)(e => {
                                let t = Object.values(n).slice(1),
                                    i = [],
                                    l = Array.isArray(e) ? e.map((e, n) => ({
                                        size: e,
                                        index: n
                                    })) : Object.entries(e).map((e, n) => {
                                        let [t, i] = e;
                                        return {
                                            size: i,
                                            index: n
                                        }
                                    });
                                return l.forEach(e => {
                                    let n, {
                                        size: a,
                                        index: o
                                    } = e;
                                    if (!a) return;
                                    let r = o === l.length - 1 ? a : (n = t[o], "(max-width: ".concat(parseInt(n) - 1, "px) ").concat(a));
                                    r && i.push(r)
                                }), i.join(", ")
                            }, [n]);
                            return (0, c.useMemo)(() => {
                                if (e) return "string" == typeof e ? e : t(e)
                            }, [e, t])
                        })(E),
                        ei = (e => {
                            let n = (0, h.A)("string" == typeof e ? {
                                    base: e
                                } : null != e ? e : [null]),
                                t = null;
                            return n && (t = (0, o.gf)("aspectRatios", n)(g.w)), t
                        })(G),
                        el = b[0].public_id,
                        ea = null != (m = null != (s = null == (l = b[0].context) || null == (t = l.custom) ? void 0 : t.alt) ? s : f) ? m : "",
                        eo = function(e, n, t) {
                            return { ...e ? {} : {
                                    gravity: null != t ? t : "auto",
                                    crop: null != n ? n : "thumb"
                                },
                                rawTransformations: e
                            }
                        }($, z, V);
                    if (!el) throw Error("CldImage: Missing public_id in cloudinaryAsset");
                    return (0, i.jsxs)(a.B.div, {
                        borderRadius: "large",
                        __css: function(e, n, t) {
                            return {
                                position: "relative",
                                overflow: null != e ? e : "hidden",
                                width: null != n ? n : "100%",
                                height: null != t ? t : "100%"
                            }
                        }(B, y, C),
                        ...H,
                        ref: e => {
                            ee.wrapperRef.current = e, "function" == typeof n ? n(e) : n && (n.current = e)
                        },
                        children: [J && (0, i.jsx)("div", {
                            "aria-hidden": "true",
                            style: {
                                position: "absolute",
                                inset: 0,
                                zIndex: 1,
                                backgroundImage: "url(".concat(J, ")"),
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                filter: "blur(32px)",
                                transform: "scale(1.1) translateZ(0)",
                                opacity: +!ee.loaded,
                                transition: v,
                                pointerEvents: "none"
                            }
                        }), (0, i.jsxs)(d.e, { ...D && u.Q,
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            style: {
                                opacity: +!!ee.loaded,
                                transition: v
                            },
                            ...q,
                            children: [(0, i.jsx)(x, { ...O,
                                ...en,
                                ...E && {
                                    sizes: et
                                },
                                ...E && !y && !C && {
                                    fill: !0
                                },
                                ...eo,
                                ...ei && {
                                    aspectRatio: ei
                                },
                                alt: ea,
                                objectFit: null != A ? A : "cover",
                                src: el,
                                ref: n,
                                zIndex: 0,
                                "aria-describedby": Q
                            }), X]
                        })]
                    })
                });
            b.displayName = "CldImage"
        },
        15700: (e, n, t) => {
            t.d(n, {
                Fd: () => o,
                d1: () => a
            });
            var i = t(12482),
                l = t(54513);
            let a = "\n    fragment MicrocopyFields on Microcopy {\n  sys {\n    id\n  }\n  __typename\n  key\n  valueZero\n  valueOne\n  valueTwo\n  valueFew\n  valueMany\n  valueOther\n}\n    ",
                o = "\n    fragment MicrocopySetFields on MicrocopySet {\n  sys {\n    id\n  }\n  __typename\n  key\n  microcopyCollection(limit: 50) {\n    items {\n      ...MicrocopyFields\n    }\n  }\n}\n    ",
                r = "\n    query MicrocopySetsWithKeys($keys: [String!]!, $locale: String!, $preview: Boolean!, $limit: Int = 10) {\n  microcopySetCollection(\n    where: {key_in: $keys}\n    locale: $locale\n    preview: $preview\n    limit: $limit\n  ) {\n    items {\n      ...MicrocopySetFields\n    }\n  }\n}\n    ".concat(o, "\n").concat(a),
                s = (e, n) => (0, i.I)({
                    queryKey: ["MicrocopySetsWithKeys", e],
                    queryFn: (0, l.x8)(r, e),
                    ...n
                });
            s.getKey = e => ["MicrocopySetsWithKeys", e], s.fetcher = (e, n) => (0, l.x8)(r, e, n)
        },
        16248: (e, n, t) => {
            t.d(n, {
                h: () => u
            });
            var i = t(6029),
                l = t(77367),
                a = t(72813);
            let o = e => 'url("data:image/svg+xml;charset=UTF-8,'.concat(encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">'.concat(e, "</svg>")), '") center / contain no-repeat'),
                r = "M10.85 6.39c.54 2.84.8 4.26 1.65 5.1s2.27 1.12 5.11 1.66c.52.18.52.52 0 .7-2.82.53-4.24.8-5.09 1.63-.86.85-1.13 2.27-1.67 5.13-.18.52-.52.52-.7 0-.54-2.84-.8-4.26-1.65-5.1s-2.27-1.12-5.11-1.66c-.52-.18-.52-.52 0-.7 2.84-.54 4.26-.8 5.1-1.65s1.12-2.27 1.66-5.11c.18-.52.52-.52.7 0m6.81-3.2c.25 1.32.38 1.98.77 2.38s1.06.52 2.39.77c.24.08.24.24 0 .32-1.3.25-1.97.38-2.36.75-.41.4-.54 1.06-.8 2.4-.08.25-.24.25-.32 0-.24-1.25-.37-1.91-.72-2.31-.39-.45-1.05-.57-2.44-.84-.24-.08-.24-.24 0-.32 1.33-.25 1.99-.38 2.38-.77s.53-1.06.78-2.39c.08-.24.24-.24.32 0",
                s = o('<path d="'.concat(r, '"/>')),
                c = o('<path fill="none" stroke="black" stroke-width="1" stroke-linejoin="round" d="'.concat(r, '"/>')),
                d = {
                    generic: null,
                    text: o('<path d="m8 13v-1h2v1zm5.5 0v-1h-2.5v1zm-1-3v-1h-4.5v1zm6 .5c.28 0 .5.22.5.5v9c0 1.1-.9 2-2 2h-6l-6-6v-12c0-1.1.9-2 2-2h5.5c.28 0 .5.22.5.5s-.22.5-.5.5h-5.5c-.55 0-1 .45-1 1v11h6v6h5c.55 0 1-.45 1-1v-9c0-.28.22-.5.5-.5zm-7.5 5.5h-4.59l4.59 4.59z"/><path d="m15.7917 2.2337c.104-.3116.312-.3116.416 0 .3246 1.70437.4869 2.55721.9942 3.06445.5072.50712 1.3594.66966 3.0634.99414.3122.10405.3122.31198 0 .41602-1.6901.32183-2.5421.48406-3.0507.98145-.5171.50574-.6797 1.35788-1.0069 3.07614-.104.3121-.3119.3121-.416 0-.3245-1.70418-.487-2.55619-.9941-3.06345-.5072-.50721-1.3593-.66964-3.0635-.99414-.3121-.10404-.3121-.31197 0-.41602 1.7041-.32448 2.5562-.48702 3.0635-.99414.5072-.50724.6696-1.36008.9941-3.06445z"/>'),
                    audio: o('<path d="m5.5 19.5h-1v-14h1zm-2.5-9h-1v4h1zm17.5.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5v6.5h1zm-2.5 3c0-.28-.22-.5-.5-.5s-.5.22-.5.5v2.02h1zm-2.5-3c0-.28-.22-.5-.5-.5s-.5.22-.5.5v8.5h1zm-2.49-1.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5v12h1zm0-5v-1h-1v1c0 .28.22.5.5.5s.5-.22.5-.5zm-2.51 2.5h-1v11h1zm-2.5 1.5h-1v8h1z"/><path d="m17.2917 2.2337c.104-.3116.312-.3116.416 0 .3246 1.70437.4869 2.55721.9942 3.06445.5072.50712 1.3594.66966 3.0634.99414.3122.10405.3122.31198 0 .41602-1.69.32183-2.5421.48406-3.0507.98145-.5171.50574-.6797 1.35788-1.0069 3.07614-.104.3121-.3119.3121-.416 0-.3245-1.70418-.487-2.55619-.9941-3.06345-.5072-.50721-1.3593-.66964-3.0635-.99414-.3121-.10404-.3121-.31197 0-.41602 1.7041-.32448 2.5562-.48702 3.0635-.99414.5072-.50724.6696-1.36008.9941-3.06445z"/>'),
                    image: o('<path d="m10.4999 5c.28 0 .5.22002.5.5 0 .28-.22.5-.5.5h-6.49998c-.54994.00006-.99998.45005-1 1v10c0 .5.58001.9999 1 1h15.99998c.55 0 1-.45 1-1v-7.00976c0-.27997.2201-.49995.5-.5.28 0 .5.22.5.5v7.00976c0 1.1-.9 2-2 2h-15.99998c-1.07995-.0001-2.00023-1-1.99023-2v-10c-.00998-.84996.99028-1.99991 1.99023-2z"/><path d="m11.5702 14.0303 2.4297-2.0205 4.5303 4.9902h-1.3604l-3.2802-3.5996-1.6494 1.3799 2.0195 2.2197h-1.3594l-6.01073-6.6103-2.88965 2.4101v-1.2998l3-2.5z"/><path d="m17.2919 2.2334c.1041-.31116.312-.31124.416 0 .3246 1.7043.487 2.5572.9942 3.06445.5072.50712 1.3594.66966 3.0634.99415.312.10401.3119.31195 0 .41601-1.6897.32178-2.542.48426-3.0507.98145-.5171.5057-.6797 1.35812-1.0069 3.07614-.104.3121-.3119.3121-.416 0-.3245-1.704-.487-2.55622-.9941-3.06345-.5072-.50715-1.3595-.66967-3.0635-.99414-.3121-.10404-.3121-.31197 0-.41601 1.7039-.32446 2.5563-.48706 3.0635-.99415.507-.50727.6696-1.36038.9941-3.06445z"/>'),
                    video: o('<path d="m9.5 8 6 4-6 4zm1 1.87v4.26l3.2-2.13zm10.5.12v7.01c0 .55-.45 1-1 1h-16c-.42 0-1-.5-1-1v-10c0-.55.45-1 1-1h6.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-6.5c-1 0-2 1.15-1.99 2v10c-.01 1 .91 2 1.99 2h16c1.1 0 2-.9 2-2v-7.01c0-.28-.22-.5-.5-.5s-.5.22-.5.5z"/><path d="m17.2917 2.2337c.104-.3116.312-.3116.416 0 .3246 1.70437.4869 2.55721.9942 3.06445.5072.50712 1.3594.66966 3.0634.99414.3122.10405.3122.31198 0 .41602-1.6901.32183-2.5421.48406-3.0507.98145-.5171.50574-.6797 1.35788-1.0069 3.07614-.104.3121-.312.3121-.416 0-.3245-1.70418-.487-2.55619-.9941-3.06345-.5072-.50721-1.3593-.66964-3.0635-.99414-.3121-.10404-.3121-.31197 0-.41602 1.7041-.32448 2.5562-.48702 3.0635-.99414.5072-.50724.6696-1.36008.9941-3.06445z"/>')
                },
                u = (0, l.R)((e, n) => {
                    let {
                        sx: t,
                        filled: l = !0,
                        kind: o = "generic",
                        ...r
                    } = e, u = d[o], p = null != u ? u : l ? s : c;
                    return (0, i.jsx)(a.a, {
                        as: "span",
                        ref: n,
                        "aria-hidden": !0,
                        display: "block",
                        boxSize: "16px",
                        flexShrink: 0,
                        backgroundColor: "currentColor",
                        sx: {
                            mask: p,
                            WebkitMask: p,
                            "@media (forced-colors: active)": {
                                backgroundColor: "CanvasText"
                            },
                            ...t
                        },
                        ...r
                    })
                });
            u.displayName = "AiSparkIcon"
        },
        16505: (e, n, t) => {
            t.d(n, {
                L: () => u
            });
            var i = t(6029),
                l = t(77367),
                a = t(72813),
                o = t(86941),
                r = t(16248),
                s = t(73738);
            let c = {
                    standard: {
                        backgroundColor: s.A.grey100,
                        color: s.A.porscheBlack
                    },
                    image: {
                        backgroundColor: s.A.porscheBlackShaded,
                        color: s.A.allWhite,
                        backdropFilter: "auto",
                        backdropBlur: "frostedGlassBlur"
                    }
                },
                d = {
                    short: {
                        alignItems: "center",
                        lineHeight: "ndlCaption",
                        whiteSpace: "nowrap",
                        maxWidth: "100%",
                        overflow: "hidden"
                    },
                    long: {
                        alignItems: "flex-start",
                        lineHeight: 1.3,
                        whiteSpace: "normal",
                        wordBreak: "break-word"
                    }
                },
                u = (0, l.R)((e, n) => {
                    let {
                        label: t,
                        srLabel: l,
                        mode: s = "standard",
                        length: u = "short",
                        filled: p = !0,
                        kind: h,
                        ...g
                    } = e;
                    return t.trim() ? (0, i.jsxs)(a.a, {
                        as: "span",
                        ref: n,
                        display: "flex",
                        gap: 1,
                        pt: 2,
                        pr: 2,
                        pb: 2,
                        pl: 2,
                        borderRadius: "small",
                        fontFamily: "body",
                        fontWeight: 400,
                        fontSize: "ndlDesktopCaption",
                        letterSpacing: "0.12px",
                        ...d[u],
                        ...c[s],
                        ...g,
                        children: [(0, i.jsx)(r.h, {
                            filled: p,
                            kind: h
                        }), l ? (0, i.jsxs)(i.Fragment, {
                            children: [(0, i.jsx)(a.a, {
                                as: "span",
                                "aria-hidden": "true",
                                flexShrink: 0,
                                children: t
                            }), (0, i.jsx)(o.s, {
                                children: l
                            })]
                        }) : t]
                    }) : null
                });
            u.displayName = "AiTag"
        },
        16768: (e, n, t) => {
            t.d(n, {
                L: () => s,
                c: () => o
            });
            var i = t(96538),
                l = t(55729),
                a = t(17341);
            let o = e => (0, l.useMemo)(() => {
                    if (e < 0 || isNaN(e)) return "00:00";
                    let n = new Date(1e3 * e),
                        t = n.getUTCHours(),
                        i = n.getUTCMinutes(),
                        l = n.getSeconds();
                    return [...t > 0 ? [t.toString().padStart(2, "0")] : [], i.toString().padStart(2, "0"), l.toString().padStart(2, "0")].join(":")
                }, [e]),
                r = {
                    base: 480,
                    xs: 768,
                    s: 1024,
                    md: 1440,
                    l: 1920,
                    xl: 2560,
                    xxl: 3840
                },
                s = e => {
                    let {
                        cloudinaryAsset: n
                    } = e, [t, o] = (0, l.useState)(null), {
                        breakpoints: s
                    } = (0, a.D)(), c = (0, l.useCallback)(() => {
                        {
                            let e = window.innerWidth;
                            if (e >= parseInt(s.xxl)) return "xxl";
                            if (e >= parseInt(s.xl)) return "xl";
                            if (e >= parseInt(s.l)) return "l";
                            if (e >= parseInt(s.md)) return "md";
                            if (e >= parseInt(s.s)) return "s";
                            if (e >= parseInt(s.xs)) return "xs"
                        }
                        return "base"
                    }, [s.l, s.md, s.s, s.xl, s.xs, s.xxl]), d = (0, l.useCallback)(() => {
                        var e, t, i, l;
                        let a = r[c()];
                        a *= window.devicePixelRatio;
                        let o = null != (i = null == n || null == (e = n[0]) ? void 0 : e.width) ? i : 0,
                            s = null != (l = null == n || null == (t = n[0]) ? void 0 : t.height) ? l : 0,
                            d = o / s;
                        if (o <= a || s <= a / d) return o;
                        for (let e of Object.keys(r).sort((e, n) => r[e] - r[n])) {
                            let n = r[e],
                                t = n / d;
                            if (n <= 5e3 && t <= 5e3) a = n;
                            else break
                        }
                        return a
                    }, [n, c]);
                    return (0, l.useEffect)(() => {
                        let e = null == n ? void 0 : n[0].public_id;
                        if (!e) return;
                        let t = d();
                        o((0, i.gV)({
                            src: e,
                            width: t,
                            crop: "fill",
                            gravity: "auto",
                            quality: "auto",
                            format: "auto:video"
                        }))
                    }, [n, d]), t
                }
        },
        17497: (e, n, t) => {
            t.d(n, {
                NE: () => r,
                f3: () => c
            });
            var i = t(40157),
                l = t(15700),
                a = t(12482),
                o = t(54513);
            let r = "\n    fragment ModuleAudioPlayerFields on ModuleAudioPlayer {\n  ...ComponentReferenceFields\n  aiGenerated\n  title\n  image\n  audioFile\n}\n    ",
                s = '\n    query ModuleAudioPlayer($locale: String!, $preview: Boolean, $id: String!) {\n  audioPlayer: moduleAudioPlayer(id: $id, locale: $locale, preview: $preview) {\n    ...ModuleAudioPlayerFields\n  }\n  microcopySetCollection(\n    where: {key_in: "moduleAudioPlayer"}\n    locale: $locale\n    preview: $preview\n    limit: 1\n  ) {\n    items {\n      ...MicrocopySetFields\n    }\n  }\n}\n    '.concat(r, "\n").concat(i.o, "\n").concat(l.Fd, "\n").concat(l.d1),
                c = (e, n) => (0, a.I)({
                    queryKey: ["ModuleAudioPlayer", e],
                    queryFn: (0, o.x8)(s, e),
                    ...n
                });
            c.getKey = e => ["ModuleAudioPlayer", e], c.fetcher = (e, n) => (0, o.x8)(s, e, n)
        },
        17801: (e, n, t) => {
            t.d(n, {
                Al: () => s,
                St: () => o
            });
            var i = t(40157),
                l = t(12482),
                a = t(54513);
            let o = "\n    fragment ModuleSpacerFields on ModuleSpacer {\n  ...ComponentReferenceFields\n  size\n  theme\n}\n    ",
                r = "\n    query ModuleSpacer($locale: String!, $preview: Boolean!, $id: String!) {\n  moduleSpacer(id: $id, locale: $locale, preview: $preview) {\n    ...ModuleSpacerFields\n  }\n}\n    ".concat(o, "\n").concat(i.o),
                s = (e, n) => (0, l.I)({
                    queryKey: ["ModuleSpacer", e],
                    queryFn: (0, a.x8)(r, e),
                    ...n
                });
            s.getKey = e => ["ModuleSpacer", e], s.fetcher = (e, n) => (0, a.x8)(r, e, n)
        },
        20734: (e, n, t) => {
            t.d(n, {
                Kp: () => p,
                T2: () => u,
                oz: () => d,
                tU: () => s,
                wb: () => c
            });
            var i = t(16907),
                l = t(40037),
                a = t(614),
                o = t(75984),
                r = t(57931);
            let s = i.t,
                c = l.w,
                d = a.o,
                u = o.T,
                p = r.K
        },
        24561: (e, n, t) => {
            t.d(n, {
                H: () => a
            });
            var i = t(6029),
                l = t(72813);
            let a = e => {
                let {
                    isSplitLayout: n = !1,
                    children: t,
                    ...a
                } = e;
                return (0, i.jsx)(l.a, {
                    className: "wrapper-container",
                    maxWidth: {
                        base: "wrapperContainer",
                        l: n ? "halfWrapperContainer" : "wrapperContainer"
                    },
                    margin: {
                        base: "auto",
                        l: n ? "unset" : "auto"
                    },
                    float: {
                        base: "none",
                        l: n ? "right" : "none"
                    },
                    px: {
                        base: 5,
                        md: 10
                    },
                    width: "full",
                    ...a,
                    children: t
                })
            }
        },
        26084: (e, n, t) => {
            t.d(n, {
                P: () => i
            });
            let i = "\n    fragment ContentTagFields on ContentTag {\n  ...ComponentReferenceFields\n  internalName\n  label\n  tag\n  tagKey\n}\n    "
        },
        28662: (e, n, t) => {
            t.d(n, {
                K3: () => y,
                NN: () => g,
                Td: () => b,
                Th: () => v,
                Tr: () => x,
                XI: () => p,
                d8: () => h,
                r6: () => f,
                zu: () => m
            });
            var i = t(41169),
                l = t(90875),
                a = t(8545),
                o = t(48952),
                r = t(23279),
                s = t(12425),
                c = t(1917),
                d = t(55060),
                u = t(36803);
            let p = i.X,
                h = l.d,
                g = a.N,
                m = o.z,
                x = r.Tr,
                v = s.Th,
                b = c.Td,
                f = d.r,
                y = u.K
        },
        30267: (e, n, t) => {
            t.d(n, {
                Jp: () => s,
                lz: () => o
            });
            var i = t(40157),
                l = t(12482),
                a = t(54513);
            let o = "\n    fragment ModuleImageFields on ModuleImage {\n  ...ComponentReferenceFields\n  description\n  asset\n  title\n  alt\n  caption\n}\n    ",
                r = "\n    query ModuleImage($locale: String!, $preview: Boolean, $id: String!) {\n  moduleImage(id: $id, locale: $locale, preview: $preview) {\n    ...ModuleImageFields\n  }\n}\n    ".concat(o, "\n").concat(i.o),
                s = (e, n) => (0, l.I)({
                    queryKey: ["ModuleImage", e],
                    queryFn: (0, a.x8)(r, e),
                    ...n
                });
            s.getKey = e => ["ModuleImage", e], s.fetcher = (e, n) => (0, a.x8)(r, e, n)
        },
        31147: (e, n, t) => {
            function i(e, n, t, i) {
                return l => {
                    let a, o = 3 * e,
                        r = 3 * (t - e) - o,
                        s = 1 - o - r,
                        c = 3 * n,
                        d = 3 * (i - n) - c,
                        u = e => ((s * e + r) * e + o) * e,
                        p = e => (3 * s * e + 2 * r) * e + o,
                        h = l;
                    for (let e = 0; e < 8; e++) {
                        let e = u(h) - l;
                        if (1e-6 > Math.abs(e)) break;
                        let n = p(h);
                        if (1e-6 > Math.abs(n)) break;
                        h -= e / n
                    }
                    return (((1 - c - d) * (a = h) + d) * a + c) * a
                }
            }
            t.d(n, {
                Z: () => l,
                g: () => a
            });
            let l = {
                    garage: "garage",
                    history: "history",
                    cars: "cars",
                    teams: "teams",
                    news: "news",
                    footer: "footer"
                },
                a = [{
                    sectionId: l.garage,
                    waypoints: [{
                        waypointName: "video-start",
                        offset: 0,
                        snap: {
                            duration: 1.5,
                            easing: i(.25, .1, .6, .6)
                        }
                    }, {
                        waypointName: "video-end",
                        offset: .9,
                        snap: {
                            duration: 1.5,
                            easing: i(.25, .1, .6, .6)
                        }
                    }]
                }, {
                    sectionId: l.history,
                    freeScroll: !0,
                    waypoints: [{
                        waypointName: "start",
                        offset: 0,
                        snap: {
                            duration: 1.5,
                            easing: i(.4, 0, .2, 1)
                        }
                    }, {
                        waypointName: "end",
                        offset: .92,
                        snap: {
                            duration: 1.2,
                            easing: i(.4, 0, .2, 1)
                        }
                    }]
                }, {
                    sectionId: l.cars,
                    waypoints: [{
                        waypointName: "start",
                        offset: .2,
                        snap: {
                            duration: 2,
                            easing: i(.4, 0, .2, 1)
                        }
                    }, {
                        waypointName: "video-end",
                        offset: .9,
                        snap: {
                            duration: 1.8,
                            easing: i(.4, 0, .2, 1)
                        }
                    }]
                }, {
                    sectionId: l.teams,
                    freeScroll: !0,
                    waypoints: [{
                        waypointName: "start",
                        offset: 0,
                        snap: {
                            duration: 1.5,
                            easing: i(.4, 0, .2, 1)
                        }
                    }, {
                        waypointName: "end",
                        offset: .85,
                        snap: {
                            duration: 1.2,
                            easing: i(.4, 0, .2, 1)
                        }
                    }]
                }, {
                    sectionId: l.news,
                    waypoints: [{
                        waypointName: "start",
                        offset: 0,
                        snap: {
                            duration: 1.5,
                            easing: i(.4, 0, .2, 1)
                        }
                    }, {
                        waypointName: "carousel",
                        offset: 1,
                        snap: {
                            duration: 1.2,
                            easing: i(.4, 0, .2, 1)
                        }
                    }]
                }, {
                    sectionId: l.footer,
                    waypoints: [{
                        waypointName: "start",
                        offset: 0,
                        snap: {
                            duration: 1.2,
                            easing: i(.4, 0, .2, 1)
                        }
                    }]
                }]
        },
        31967: (e, n, t) => {
            t.d(n, {
                V: () => y
            });
            var i = t(6029),
                l = t(96538),
                a = t(46785),
                o = t(35882),
                r = t(77367),
                s = t(40697),
                c = t(55729),
                d = t(94169),
                u = t(89822),
                p = t(81085),
                h = t(16768),
                g = t(37049),
                m = t(10154),
                x = t(41824),
                v = t(77396);
            let b = ["url", "playing", "loop", "controls", "volume", "muted", "playbackRate", "width", "height", "progressInterval", "playsinline", "playIcon", "previewTabIndex", "pip", "stopOnUnmount", "light", "fallback", "wrapper", "onReady", "onStart", "onPlay", "onPause", "onBuffer", "onBufferEnd", "onEnded", "onClickPreview", "onEnablePIP", "onDisablePIP", "onError", "onDuration", "onSeek", "onProgress", "poster"],
                f = (0, o.B)(a.A, {
                    shouldForwardProp: e => b.includes(e)
                }),
                y = (0, r.R)((e, n) => {
                    let {
                        wrapperProps: t,
                        cloudinaryAsset: a,
                        playing: r,
                        loop: b,
                        controls: y,
                        volume: C,
                        muted: j,
                        playbackRate: k,
                        width: w,
                        height: T,
                        progressInterval: P,
                        playsinline: S,
                        playIcon: E,
                        previewTabIndex: F,
                        pip: R,
                        stopOnUnmount: M,
                        light: I,
                        fallback: A,
                        wrapper: L,
                        poster: _,
                        preload: N,
                        onReady: H,
                        onStart: z,
                        onPlay: V,
                        onPause: B,
                        onBuffer: $,
                        onBufferEnd: D,
                        onEnded: q,
                        onClickPreview: G,
                        onEnablePIP: W,
                        onDisablePIP: U,
                        onError: K,
                        onDuration: O,
                        onSeek: Q,
                        onProgress: X,
                        sx: Y,
                        inViewAutoplay: Z,
                        animate: J = !1,
                        aiTagPosition: ee,
                        aiTagOffset: en,
                        hideAiTag: et,
                        ...ei
                    } = e, {
                        ariaDescribedBy: el,
                        tag: ea
                    } = (0, v.C)(a, "video", {
                        aiTagPosition: ee,
                        aiTagOffset: en,
                        hideAiTag: et
                    }), eo = (0, c.useRef)(null), [er, es] = (0, c.useState)(!1), ec = (0, g.W)(eo, {
                        once: !1
                    }), {
                        state: {
                            isMuted: ed,
                            isPlaying: eu,
                            isShowingPiP: ep,
                            isLoop: eh,
                            isSeeking: eg,
                            playerRef: em,
                            autoplay: ex,
                            userPaused: ev
                        },
                        dispatch: eb
                    } = (0, d.z)();
                    (0, c.useEffect)(() => {
                        Z && ((e, n, t, i, l, a) => {
                            e && n && t && !i && !l ? a({
                                type: "PLAY"
                            }) : !t && i && (a({
                                type: "PAUSE"
                            }), a({
                                type: "MUTE"
                            }))
                        })(er, ex, ec, eu, ev, eb)
                    }, [eu, eb, ex, ec, er, ed, ev, Z]);
                    let ef = (0, s.SV)(em, n),
                        ey = (0, h.L)({
                            cloudinaryAsset: a
                        }),
                        eC = (0, c.useMemo)(() => (0, l.gV)({
                            src: a[0].public_id,
                            format: "auto:video"
                        }), [a]),
                        ej = (0, c.useMemo)(() => (0, p.VZ)(a), [a]),
                        ek = (0, c.useCallback)(e => {
                            es(!0), H && H(e)
                        }, [H]),
                        ew = (0, c.useCallback)(e => {
                            eg || eb({
                                type: "SET_PLAYED",
                                payload: e
                            })
                        }, [eb, eg]),
                        eT = (0, c.useCallback)(e => {
                            eb({
                                type: "SET_DURATION",
                                payload: e
                            })
                        }, [eb]),
                        eP = (0, c.useCallback)(() => {
                            eh && eb({
                                type: "PLAY"
                            })
                        }, [eb, eh]),
                        eS = (0, c.useCallback)(() => {
                            ep || eb({
                                type: "SHOW_PICTURE_IN_PICTURE"
                            })
                        }, [eb, ep]),
                        eE = (0, c.useCallback)(() => {
                            ep && eb({
                                type: "HIDE_PICTURE_IN_PICTURE"
                            })
                        }, [eb, ep]);
                    return (0, i.jsx)(o.B.div, {
                        borderRadius: "large",
                        __css: {
                            width: "100%",
                            height: "100%",
                            bg: "porscheBlack"
                        },
                        ref: eo,
                        ...t,
                        children: (0, i.jsxs)(m.e, { ...J && x.Q,
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            children: [(0, i.jsx)(u.C, {
                                suppressHydrationWarning: !0,
                                src: eC,
                                preload: "auto",
                                autoPlay: !1,
                                muted: !0,
                                loop: !0,
                                playsInline: !0,
                                poster: ej,
                                visibility: er ? "hidden" : "visible",
                                objectFit: "cover",
                                position: "absolute",
                                zIndex: 0,
                                width: "100%",
                                height: "100%",
                                "aria-describedby": el,
                                ...ei
                            }), (0, i.jsx)(f, {
                                playing: eu,
                                ...{
                                    volume: C,
                                    playbackRate: k,
                                    width: w,
                                    height: T,
                                    progressInterval: P,
                                    playsinline: S,
                                    playIcon: E,
                                    preload: N,
                                    poster: _,
                                    previewTabIndex: F,
                                    stopOnUnmount: M,
                                    light: I,
                                    onStart: z,
                                    onPlay: V,
                                    onPause: B,
                                    onBuffer: $,
                                    onBufferEnd: D,
                                    onEnded: q,
                                    onClickPreview: G,
                                    onEnablePIP: W,
                                    onDisablePIP: U,
                                    onError: K,
                                    onDuration: O,
                                    onSeek: Q,
                                    onProgress: X
                                },
                                ...ei,
                                sx: {
                                    "& > video": {
                                        objectFit: "cover",
                                        "&:fullscreen": {
                                            objectFit: "contain"
                                        }
                                    },
                                    ...Y
                                },
                                width: "100%",
                                height: "100%",
                                className: "react-player",
                                controls: !1,
                                url: ey,
                                pip: ep,
                                muted: ed,
                                playsinline: !0,
                                loop: eh,
                                progressInterval: 60,
                                onReady: ek,
                                onProgress: ew,
                                onDuration: eT,
                                onEnded: eP,
                                onEnablePIP: eS,
                                onDisablePIP: eE,
                                ref: ef
                            }), ea]
                        })
                    })
                });
            y.displayName = "CldVideo"
        },
        32907: (e, n, t) => {
            t.d(n, {
                G: () => u,
                p: () => p
            });
            var i = t(6029),
                l = t(34610),
                a = t(35882),
                o = t(77367),
                r = t(41684),
                s = t(22228);
            let c = (0, a.B)(l.V),
                d = (0, a.B)(l.V),
                u = (0, o.R)((e, n) => {
                    let {
                        download: t,
                        href: l,
                        children: a,
                        rel: o,
                        target: r,
                        ...s
                    } = e;
                    return (0, i.jsx)(d, { ...s,
                        ref: n,
                        children: (0, i.jsx)("a", {
                            download: t,
                            href: l,
                            rel: o,
                            target: "_blank",
                            children: a
                        })
                    })
                }),
                p = (0, o.R)((e, n) => {
                    let {
                        download: t,
                        href: l,
                        rel: a,
                        target: o,
                        replace: d = !1,
                        scroll: u = !0,
                        shallow: p = !1,
                        locale: h,
                        children: g,
                        aria: m,
                        ...x
                    } = e, v = (0, s.n)(l);
                    return (0, i.jsx)(c, { ...x,
                        children: (0, i.jsx)(r.S, {
                            download: t,
                            href: l,
                            rel: a,
                            target: o,
                            replace: d,
                            scroll: u,
                            shallow: p,
                            ref: n,
                            "aria-current": v ? "page" : "false",
                            children: g
                        })
                    })
                })
        },
        33805: (e, n, t) => {
            t.d(n, {
                U6: () => d,
                sU: () => g
            });
            var i = t(3082),
                l = t(40157),
                a = t(83169),
                o = t(66121),
                r = t(26084),
                s = t(12482),
                c = t(54513);
            let d = "\n    fragment PageRaceEventFields on PageRaceEvent {\n  ...PageRaceEventLinkToFields\n  aiGenerated\n  event {\n    ...EventFields\n  }\n  linkLabel\n  link {\n    ... on PageArticle {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageBasic {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageCar {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageCategory {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      mainCategory\n    }\n    ... on PageDriver {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageHomepage {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n    }\n    ... on PageRaceSeries {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageRaceEvent {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageSearch {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n    }\n    ... on PageTeam {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n  }\n  event {\n    ...EventFields\n  }\n  introductionCaption\n  introduction\n  introHeading\n  introColumn1\n  introColumn2\n  dateLabel\n  modulesCollection(limit: 20) {\n    __typename\n    items {\n      __typename\n      ... on Entry {\n        sys {\n          id\n        }\n      }\n    }\n  }\n  partnerSet {\n    ...PartnerSetFields\n  }\n  tagsCollection {\n    items {\n      ...ContentTagFields\n    }\n  }\n  seoMetaDescription\n  robotFollow\n  robotIndex\n}\n    ",
                u = "\n    query PageRaceEventCollection($locale: String!, $preview: Boolean, $slug: String!) {\n  pageRaceEventCollection(\n    limit: 1\n    locale: $locale\n    preview: $preview\n    where: {slug: $slug}\n  ) {\n    items {\n      ...PageRaceEventFields\n    }\n  }\n}\n    ".concat(d, "\n").concat(i.x2, "\n").concat(l.o, "\n").concat(a.ae, "\n").concat(o.cz, "\n").concat(o.Uc, "\n").concat(r.P),
                p = (e, n) => (0, s.I)({
                    queryKey: ["PageRaceEventCollection", e],
                    queryFn: (0, c.x8)(u, e),
                    ...n
                });
            p.getKey = e => ["PageRaceEventCollection", e], p.fetcher = (e, n) => (0, c.x8)(u, e, n);
            let h = "\n    query PageRaceEvent($locale: String!, $preview: Boolean, $id: String!) {\n  page: pageRaceEvent(id: $id, locale: $locale, preview: $preview) {\n    ...PageRaceEventFields\n  }\n}\n    ".concat(d, "\n").concat(i.x2, "\n").concat(l.o, "\n").concat(a.ae, "\n").concat(o.cz, "\n").concat(o.Uc, "\n").concat(r.P),
                g = (e, n) => (0, s.I)({
                    queryKey: ["PageRaceEvent", e],
                    queryFn: (0, c.x8)(h, e),
                    ...n
                });
            g.getKey = e => ["PageRaceEvent", e], g.fetcher = (e, n) => (0, c.x8)(h, e, n)
        },
        35358: (e, n, t) => {
            t.d(n, {
                _: () => b
            });
            var i = t(6029),
                l = t(94169),
                a = t(45253),
                o = t(72343),
                r = t(72813),
                s = t(94771),
                c = t(52483),
                d = t(80321),
                u = t(71024),
                p = t.n(u);
            let h = p()(() => Promise.all([t.e(4820), t.e(9074), t.e(8516), t.e(7172), t.e(244), t.e(6964), t.e(3382), t.e(1250), t.e(4155), t.e(755)]).then(t.bind(t, 54155)).then(e => e.CldVideoScrubber), {
                    loadableGenerated: {
                        webpack: () => [54155]
                    }
                }),
                g = p()(() => Promise.all([t.e(4820), t.e(9074), t.e(8516), t.e(7172), t.e(244), t.e(6964), t.e(3382), t.e(1250), t.e(4155), t.e(755)]).then(t.bind(t, 54155)).then(e => e.CldVideoToggleMute), {
                    loadableGenerated: {
                        webpack: () => [54155]
                    }
                }),
                m = p()(() => Promise.all([t.e(4820), t.e(9074), t.e(8516), t.e(7172), t.e(244), t.e(6964), t.e(3382), t.e(1250), t.e(4155), t.e(755)]).then(t.bind(t, 54155)).then(e => e.CldVideoToggleFullscreen), {
                    loadableGenerated: {
                        webpack: () => [54155]
                    }
                }),
                x = p()(() => Promise.all([t.e(4820), t.e(9074), t.e(8516), t.e(7172), t.e(244), t.e(6964), t.e(3382), t.e(1250), t.e(4155), t.e(755)]).then(t.bind(t, 54155)).then(e => e.CldVideoTimeRemaining), {
                    loadableGenerated: {
                        webpack: () => [54155]
                    }
                }),
                v = p()(() => Promise.all([t.e(4820), t.e(9074), t.e(8516), t.e(7172), t.e(244), t.e(6964), t.e(3382), t.e(1250), t.e(4155), t.e(755)]).then(t.bind(t, 54155)).then(e => e.CldVideoTogglePlay), {
                    loadableGenerated: {
                        webpack: () => [54155]
                    },
                    ssr: !1
                }),
                b = e => {
                    let {
                        onClick: n,
                        showScrubber: t = !0,
                        showTimeRemaining: u = !0,
                        showFullscreen: p = !0,
                        showMute: b = !0,
                        showPlay: f = !0,
                        usePureButton: y = !1,
                        onDownload: C,
                        showDownload: j = !1
                    } = e, {
                        state: {
                            isPlaying: k
                        }
                    } = (0, l.z)(), w = c.A.isEnabled;
                    return (0, i.jsxs)(a.s, {
                        onClick: (0, o.Y)(),
                        zIndex: 1,
                        flexDir: "column",
                        justifyContent: "space-between",
                        alignSelf: "flex-end",
                        position: "absolute",
                        bottom: 0,
                        w: "full",
                        h: "full",
                        transition: "opacity 0.3s ease-in-out",
                        opacity: 1,
                        transitionDelay: "4s",
                        sx: { ...!k && {
                                opacity: 1
                            },
                            ...k && {
                                opacity: 0,
                                transitionDelay: "4s"
                            },
                            _hover: {
                                opacity: 1,
                                transitionDelay: "0s"
                            },
                            transform: "translateZ(0)",
                            perspective: "1000",
                            WebkitTransform: "translate3d(0,0,0)",
                            WebkitOverflowScrolling: "touch",
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            top: 0
                        },
                        children: [w && p && (0, i.jsx)(a.s, {
                            display: "flex",
                            justifyContent: "flex-end",
                            p: 4,
                            onClick: e => {
                                e.stopPropagation()
                            },
                            children: (0, i.jsx)(m, {
                                usePureButton: y
                            })
                        }), (0, i.jsxs)(a.s, {
                            alignItems: "center",
                            flexDir: "row",
                            gap: y ? 2 : [3, 3, 4],
                            p: y ? 4 : [4, 4, 10],
                            pos: "relative",
                            onClick: e => {
                                e.stopPropagation()
                            },
                            children: [(0, i.jsxs)(a.s, {
                                flex: "1",
                                alignItems: "center",
                                gap: y ? 2 : [3, 3, 4],
                                children: [t && (0, i.jsx)(h, {}), u && (0, i.jsx)(x, {
                                    position: "static",
                                    color: "allWhite"
                                }), b && (0, i.jsx)(g, {
                                    onClick: () => null == n ? void 0 : n(d.wT.videoCldToggleMute_Click)
                                }), f && (0, i.jsx)(r.a, {
                                    children: (0, i.jsx)(v, {
                                        onClick: () => null == n ? void 0 : n(d.wT.videoCldTogglePlay_Click)
                                    })
                                })]
                            }), j && (0, i.jsx)(a.s, {
                                h: "full",
                                alignItems: "flex-end",
                                children: (0, i.jsx)(s.d, {
                                    zIndex: "1",
                                    theme: "dark",
                                    hideLabel: !0,
                                    icon: "download",
                                    title: "download video",
                                    onClick: e => {
                                        e.stopPropagation(), null == C || C()
                                    }
                                })
                            })]
                        })]
                    })
                }
        },
        39864: (e, n, t) => {
            t.d(n, {
                h: () => a
            });
            var i = t(6029),
                l = t(98168);
            let a = e => {
                let {
                    children: n,
                    ...t
                } = e;
                return (0, i.jsx)(l.D, {
                    as: "h2",
                    size: "headingXLarge",
                    fontWeight: "400",
                    sx: {
                        textWrap: "balance"
                    },
                    ...t,
                    children: n
                })
            }
        },
        40063: (e, n, t) => {
            t.d(n, {
                Z: () => L
            });
            var i = t(6029),
                l = t(30622),
                a = t(19224);
            let o = {
                [a.j7.BOLD]: e => (0, i.jsx)("strong", {
                    children: e
                }),
                [a.j7.UNDERLINE]: e => (0, i.jsx)("u", {
                    children: e
                }),
                [a.j7.ITALIC]: e => (0, i.jsx)("i", {
                    children: e
                }),
                [a.j7.SUBSCRIPT]: e => (0, i.jsx)("sub", {
                    children: e
                }),
                [a.j7.SUPERSCRIPT]: e => (0, i.jsx)("sup", {
                    children: e
                })
            };
            var r = t(94699),
                s = t(48643),
                c = t(8711),
                d = t(98168),
                u = t(61681),
                p = t(28662),
                h = t(97063),
                g = t(51370),
                m = t(15407),
                x = t(24561);
            let v = {
                [a.nA.PARAGRAPH]: (e, n) => (0, i.jsx)(c.E, {
                    children: n
                }),
                [a.nA.HEADING_1]: (e, n) => (0, i.jsx)(d.D, {
                    as: "h1",
                    size: "headingXXLarge",
                    children: n
                }),
                [a.nA.HEADING_2]: (e, n) => (0, i.jsx)(d.D, {
                    as: "h2",
                    size: "headingXLarge",
                    fontWeight: "400",
                    children: n
                }),
                [a.nA.HEADING_3]: (e, n) => (0, i.jsx)(d.D, {
                    as: "h3",
                    size: "headingLarge",
                    fontWeight: "400",
                    mt: "2rem",
                    children: n
                }),
                [a.nA.HEADING_4]: (e, n) => (0, i.jsx)(d.D, {
                    as: "h4",
                    size: "headingMedium",
                    fontWeight: "400",
                    mt: "2rem",
                    children: n
                }),
                [a.nA.HEADING_5]: (e, n) => (0, i.jsx)(d.D, {
                    as: "h5",
                    size: "headingSmall",
                    fontWeight: "400",
                    mt: "2rem",
                    children: n
                }),
                [a.nA.HEADING_6]: (e, n) => (0, i.jsx)(c.E, {
                    as: "p",
                    size: "xx-small",
                    children: n
                }),
                [a.nA.QUOTE]: (e, n) => (0, i.jsx)(u.Cv, {
                    my: "2rem",
                    children: (0, i.jsx)(u.gy, {
                        _before: {
                            content: "open-quote"
                        },
                        _after: {
                            content: "close-quote"
                        },
                        children: n
                    })
                }),
                [a.nA.TABLE]: (e, n) => (0, i.jsx)(p.K3, {
                    my: "2rem",
                    children: (0, i.jsx)(p.XI, {
                        children: n
                    })
                }),
                [a.nA.HR]: () => (0, i.jsx)(h.c, {}),
                [a.nA.LIST_ITEM]: (e, n) => (0, i.jsx)("span", {
                    children: n
                }),
                [a.nA.UL_LIST]: (e, n) => (0, i.jsx)("span", {
                    children: n
                }),
                [a.nA.OL_LIST]: (e, n) => (0, i.jsx)("span", {
                    children: n
                })
            };
            var b = t(83679),
                f = t(32907),
                y = t(72813),
                C = t(45253),
                j = t(8128),
                k = t(80321),
                w = t(81278),
                T = t(93066);
            let P = e => {
                let {
                    eventAction: n,
                    href: t
                } = e, {
                    locale: i
                } = (0, w.useRouter)(), {
                    state: {
                        pageType: l,
                        pageId: a,
                        pageContentTags: o
                    }
                } = (0, T.CU)();
                return e => {
                    (0, k.yn)({
                        eventAction: n,
                        locale: i,
                        pageExperience: {
                            pageCategory: l,
                            contentTags: null != o ? o : []
                        },
                        context: {
                            moduleName: k.B7.richText
                        },
                        componentClick: {
                            clickElementType: "navigation",
                            clickElementId: a,
                            clickElementName: e.currentTarget.innerText,
                            targetUrl: t,
                            targetType: "outbound"
                        }
                    })
                }
            };
            var S = t(60065);
            let E = e => {
                let {
                    href: n,
                    ...t
                } = e;
                return (0, i.jsx)(f.G, { ...t,
                    onClick: () => {
                        let e = (0, S.r)();
                        e && ("#uc-layer2" === n ? e.toggleCenteredModalIsVisible(!0) : "#uc-layer4" === n && e.toggleConsentInfoModalIsVisible(!0))
                    },
                    style: {
                        cursor: "pointer"
                    }
                })
            };
            E.displayName = "UserCentricsLink";
            let F = function(e) {
                var n, t, b, y, C, w;
                let T = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "small",
                    S = arguments.length > 2 ? arguments[2] : void 0,
                    F = e => {
                        var n;
                        let t = [...e ? e.filter(e => null != e && Object.hasOwn(e, "sys")) : []];
                        return t.length < (null != (n = null == e ? void 0 : e.length) ? n : 0) && console.warn("Some entries in the rich text field were undefined, this is commonly because of a content model being deleted or renamed, while being used in a rich text field."), new Map(t.map(e => [e.sys.id, e]))
                    },
                    L = F(null == (t = e.links) || null == (n = t.entries) ? void 0 : n.block),
                    _ = F(null == (y = e.links) || null == (b = y.entries) ? void 0 : b.inline),
                    N = F(null == (w = e.links) || null == (C = w.entries) ? void 0 : C.hyperlink),
                    H = { ...(e => {
                            let n = n => (null == e ? void 0 : e.isInModule) ? n : (0, i.jsx)(x.H, {
                                children: (0, i.jsx)(r.x, {
                                    templateColumns: m.y9,
                                    gap: m.T_,
                                    children: (0, i.jsx)(s.E, {
                                        colStart: {
                                            base: 1,
                                            l: m.ft
                                        },
                                        colEnd: {
                                            base: 3,
                                            l: m.yC
                                        },
                                        children: n
                                    })
                                })
                            });
                            return {
                                [a.nA.PARAGRAPH]: (e, t) => n((0, i.jsx)(c.E, {
                                    children: t
                                })),
                                [a.nA.HEADING_1]: (e, t) => n((0, i.jsx)(d.D, {
                                    as: "h1",
                                    size: "headingXXLarge",
                                    children: t
                                })),
                                [a.nA.HEADING_2]: (e, t) => n((0, i.jsx)(d.D, {
                                    as: "h2",
                                    size: "headingXLarge",
                                    fontWeight: "400",
                                    children: t
                                })),
                                [a.nA.HEADING_3]: (e, t) => n((0, i.jsx)(d.D, {
                                    as: "h3",
                                    size: "headingLarge",
                                    fontWeight: "400",
                                    mt: "2rem",
                                    children: t
                                })),
                                [a.nA.HEADING_4]: (e, t) => n((0, i.jsx)(d.D, {
                                    as: "h4",
                                    size: "headingMedium",
                                    fontWeight: "400",
                                    mt: "2rem",
                                    children: t
                                })),
                                [a.nA.HEADING_5]: (e, t) => n((0, i.jsx)(d.D, {
                                    as: "h5",
                                    size: "headingSmall",
                                    fontWeight: "400",
                                    mt: "2rem",
                                    children: t
                                })),
                                [a.nA.HEADING_6]: (e, t) => n((0, i.jsx)(c.E, {
                                    as: "p",
                                    size: "xx-small",
                                    children: t
                                })),
                                [a.nA.HR]: () => n((0, i.jsx)(h.c, {})),
                                [a.nA.UL_LIST]: (e, t) => n((0, i.jsx)(g.Xy, {
                                    children: t
                                })),
                                [a.nA.OL_LIST]: (e, t) => n((0, i.jsx)(g._J, {
                                    children: t
                                })),
                                [a.nA.LIST_ITEM]: (e, n) => {
                                    let t = (0, l.i)(e, {
                                        renderMark: o,
                                        renderNode: v
                                    });
                                    return (0, i.jsx)(g.ck, {
                                        children: t
                                    })
                                },
                                [a.nA.QUOTE]: e => {
                                    let t = (0, l.i)(e, {
                                        renderMark: o,
                                        renderNode: {
                                            [a.nA.PARAGRAPH]: (e, n) => n,
                                            [a.nA.QUOTE]: (e, n) => n
                                        }
                                    });
                                    return n((0, i.jsx)(u.Cv, {
                                        my: "2rem",
                                        children: (0, i.jsx)(u.gy, {
                                            _before: {
                                                content: "open-quote"
                                            },
                                            _after: {
                                                content: "close-quote"
                                            },
                                            children: t
                                        })
                                    }))
                                },
                                [a.nA.TABLE]: (e, t) => n((0, i.jsx)(p.K3, {
                                    my: "2rem",
                                    children: (0, i.jsx)(p.XI, {
                                        children: t
                                    })
                                })),
                                [a.nA.TABLE_ROW]: (e, n) => e.content.every(e => "table-header-cell" === e.nodeType) ? (0, i.jsx)(p.d8, {
                                    children: (0, i.jsx)(p.Tr, {
                                        children: n
                                    })
                                }) : (0, i.jsx)(p.NN, {
                                    children: (0, i.jsx)(p.Tr, {
                                        children: n
                                    })
                                }),
                                [a.nA.EMBEDDED_ASSET]: () => n((0, i.jsx)(c.E, {
                                    as: "pre",
                                    children: "Embedded Asset is not supported"
                                })),
                                [a.XD.ASSET_HYPERLINK]: () => n((0, i.jsx)(c.E, {
                                    as: "pre",
                                    children: "Inline Asset Hyperlink is not supported"
                                }))
                            }
                        })(S),
                        [a.nA.EMBEDDED_ENTRY]: R(L, M),
                        [a.XD.EMBEDDED_ENTRY]: R(_, I),
                        [a.XD.ENTRY_HYPERLINK]: (n, t) => {
                            var l, a;
                            let o = N.get(n.data.target.sys.id),
                                r = null != (l = n.content[0].value) ? l : "";
                            return (0, i.jsx)(j.w, {
                                item: o,
                                theme: null != (a = e.theme) ? a : "light",
                                icon: "none",
                                underline: !0,
                                eventAction: k.wT.linkRichtext,
                                clickElementName: r,
                                moduleName: k.B7.richText,
                                children: t
                            })
                        },
                        [a.XD.HYPERLINK]: (n, t) => {
                            var l;
                            let a = n.data.uri,
                                o = P({
                                    eventAction: k.wT.linkRichtext,
                                    href: a
                                });
                            return a && (a.includes("#uc-layer2") || a.includes("#uc-layer4")) ? (0, i.jsx)(E, {
                                href: a,
                                size: T,
                                icon: "none",
                                underline: !0,
                                children: t
                            }) : (0, i.jsx)(f.G, {
                                target: "_blank",
                                href: a,
                                theme: null != (l = e.theme) ? l : "light",
                                size: T,
                                icon: "none",
                                underline: !0,
                                onClick: o,
                                children: t
                            })
                        },
                        [a.nA.TABLE_HEADER_CELL]: n => {
                            var t;
                            let r = (0, l.i)(n, {
                                renderMark: o,
                                renderNode: A(N, a.nA.TABLE_HEADER_CELL, null != (t = e.theme) ? t : "light")
                            });
                            return (0, i.jsx)(p.Th, {
                                children: r
                            })
                        },
                        [a.nA.TABLE_CELL]: n => {
                            var t;
                            let r = (0, l.i)(n, {
                                renderMark: o,
                                renderNode: A(N, a.nA.TABLE_CELL, null != (t = e.theme) ? t : "light")
                            });
                            return (0, i.jsx)(p.Td, {
                                children: r
                            })
                        }
                    };
                return {
                    renderMark: o,
                    renderNode: H,
                    preserveWhitespace: !1
                }
            };

            function R(e, n) {
                for (var t = arguments.length, i = Array(t > 2 ? t - 2 : 0), l = 2; l < t; l++) i[l - 2] = arguments[l];
                return (t, l) => {
                    let a = t.data.target.sys.id,
                        o = e.get(a);
                    return o ? n(o, ...i, l) : null
                }
            }

            function M(e) {
                let n = { ...e,
                        isEmbedded: !0
                    },
                    t = (0, i.jsx)(b.Y, {
                        componentProps: n
                    });
                return "ModuleAudioPlayer" === e.__typename ? (0, i.jsx)(y.a, {
                    className: "module-audio-player-wrapping-div",
                    children: t
                }) : "ModuleCookieConsentSettingsWidget" === e.__typename ? (0, i.jsx)(C.s, {
                    className: "module-cookie-consent-settings-widget-wrapping-div",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 12,
                    children: (0, i.jsx)("div", {
                        className: "uc-embed",
                        "uc-layout": "privacySettings"
                    })
                }) : "ModuleSpacer" === e.__typename ? (0, i.jsx)(y.a, {
                    className: "module-spacer-wrapping-div",
                    children: t
                }) : t
            }

            function I(e) {
                return (null == e ? void 0 : e.__typename) === "Microcopy" ? e.value : null
            }

            function A(e, n) {
                let t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "light";
                return {
                    [a.nA.PARAGRAPH]: (e, n) => Array.isArray(n) && 1 === n.length && "string" == typeof n[0] ? n[0].split("\n").reduce((e, n, t) => [...e, t > 0 && (0, i.jsx)("br", {}, crypto.randomUUID()), n], []) : n,
                    [a.XD.HYPERLINK]: (e, n) => {
                        let l = e.data.uri,
                            a = P({
                                eventAction: k.wT.linkRichtextTable,
                                href: l
                            });
                        return (0, i.jsx)(f.G, {
                            target: "_blank",
                            href: l,
                            theme: t,
                            icon: "none",
                            underline: !0,
                            onClick: a,
                            children: n
                        })
                    },
                    [a.XD.ENTRY_HYPERLINK]: (n, l) => {
                        var a;
                        let o = e.get(n.data.target.sys.id),
                            r = null != (a = n.content[0].value) ? a : "";
                        return (0, i.jsx)(j.w, {
                            item: o,
                            theme: t,
                            icon: "none",
                            underline: !0,
                            eventAction: k.wT.linkRichtextTable,
                            clickElementName: r,
                            moduleName: k.B7.richText,
                            children: l
                        })
                    },
                    [n]: (e, n) => n
                }
            }
            let L = function(e) {
                let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "small",
                    t = arguments.length > 2 ? arguments[2] : void 0,
                    a = F(e, n, t);
                try {
                    return (0, l.i)(e.json, a)
                } catch (e) {
                    return (0, i.jsxs)(i.Fragment, {
                        children: [(0, i.jsx)("pre", {
                            children: "There was an error rendering the Rich Text:"
                        }), (0, i.jsx)("pre", {
                            children: JSON.stringify(e, null, 2)
                        })]
                    })
                }
            }
        },
        41824: (e, n, t) => {
            t.d(n, {
                Q: () => i
            });
            let i = {
                initial: "hidden",
                whileInView: "visible",
                viewport: {
                    once: !0,
                    amount: .2
                },
                variants: {
                    hidden: {
                        scale: 1.2
                    },
                    visible: {
                        scale: 1,
                        transition: {
                            duration: .6,
                            ease: [0, .61, .37, 1],
                            delay: .2
                        }
                    }
                }
            }
        },
        43914: (e, n, t) => {
            t.d(n, {
                Ci: () => d,
                D: () => x,
                Jj: () => c,
                i1: () => u
            });
            var i = t(6029),
                l = t(72813),
                a = t(33126),
                o = t(34455),
                r = t(16505),
                s = t(64873);
            let c = e => {
                    var n, t;
                    let i = null == e || null == (t = e[0]) || null == (n = t.metadata) ? void 0 : n.ai_generated;
                    return "generated" === i || "modified" === i ? i : null
                },
                d = null,
                u = {
                    default: {
                        inset: 4
                    },
                    wrapperAligned: {
                        inset: {
                            base: 5,
                            md: 10
                        }
                    },
                    wrapperAlignedBelowNav: {
                        inset: {
                            base: 5,
                            md: 10
                        },
                        topExtra: {
                            base: a.A.navLogoBottom,
                            md: a.A.navHeightCombined
                        }
                    }
                },
                p = ["base", "xs", "s", "md", "l", "xl", "xxl"];

            function h(e, n) {
                var t, i;
                let l = function(e) {
                        if (Array.isArray(e)) {
                            let n = {};
                            return e.forEach((e, t) => {
                                let i = p[t];
                                null != e && i && (n[i] = e)
                            }), n
                        }
                        return "object" == typeof e && null !== e ? e : {
                            base: e
                        }
                    }(e),
                    a = null != (t = l.base) ? t : n,
                    o = a;
                for (let e of p) null != l[e] && (a = l[e]), "md" === e && (o = a);
                return {
                    base: null != (i = l.base) ? i : n,
                    md: o
                }
            }
            let g = o.A,
                m = e => {
                    var n;
                    return "number" == typeof e ? null != (n = g[String(e)]) ? n : "".concat(e, "px") : e
                },
                x = e => {
                    let {
                        type: n,
                        id: t,
                        position: a = "top-left",
                        offset: o = u.default,
                        kind: c
                    } = e, {
                        label: d,
                        srLabel: p
                    } = (0, s.L)(n, c), g = h(a, "top-left"), x = h(o.inset, 4), v = o.topExtra ? h(o.topExtra, 0) : null, b = {
                        base: "top-left" === g.base ? x.base : "auto",
                        md: "top-left" === g.md ? x.md : "auto"
                    }, f = {
                        base: "top-right" === g.base ? x.base : "auto",
                        md: "top-right" === g.md ? x.md : "auto"
                    }, y = {
                        base: v ? "calc(".concat(m(v.base), " + ").concat(m(x.base), ")") : x.base,
                        md: v ? "calc(".concat(m(v.md), " + ").concat(m(x.md), ")") : x.md
                    };
                    return (0, i.jsx)(l.a, {
                        position: "absolute",
                        top: y,
                        left: b,
                        right: f,
                        width: "max-content",
                        zIndex: 2,
                        pointerEvents: "none",
                        children: (0, i.jsx)(r.L, {
                            id: t,
                            label: d,
                            srLabel: p,
                            mode: "image",
                            filled: "generated" === n,
                            kind: c
                        })
                    })
                }
        },
        46169: (e, n, t) => {
            t.d(n, {
                QR: () => o,
                ie: () => s
            });
            var i = t(40157),
                l = t(12482),
                a = t(54513);
            let o = "\n    fragment Module916VideoImageFields on Module916VideoImage {\n  ...ComponentReferenceFields\n  mediaAsset\n  showDownload\n}\n    ",
                r = "\n    query Module916VideoImage($locale: String!, $preview: Boolean!, $id: String!) {\n  module916VideoImage(id: $id, locale: $locale, preview: $preview) {\n    ...Module916VideoImageFields\n  }\n}\n    ".concat(o, "\n").concat(i.o),
                s = (e, n) => (0, l.I)({
                    queryKey: ["Module916VideoImage", e],
                    queryFn: (0, a.x8)(r, e),
                    ...n
                });
            s.getKey = e => ["Module916VideoImage", e], s.fetcher = (e, n) => (0, a.x8)(r, e, n)
        },
        48475: (e, n, t) => {
            t.d(n, {
                p: () => a
            });
            var i = t(6029),
                l = t(35882);
            let a = e => (0, i.jsx)(l.B.span, {
                __css: {
                    w: 2.5,
                    h: 2.5,
                    bg: "motorsportsRed",
                    borderRadius: "999px",
                    display: "inline-flex"
                },
                ...e
            })
        },
        50127: (e, n, t) => {
            t.d(n, {
                l: () => E
            });
            var i = t(6029),
                l = t(94699),
                a = t(48643),
                o = t(81085),
                r = t(94169),
                s = t(31967),
                c = t(43914),
                d = t(15617),
                u = t(72813),
                p = t(22814),
                h = t(61436),
                g = t(24561),
                m = t(8128),
                x = t(2667),
                v = t(37049),
                b = t(25653),
                f = t(63504),
                y = t(3141),
                C = t(55729),
                j = t(472),
                k = t(39864),
                w = t(78852),
                T = t(69747),
                P = t(15407);
            let S = e => {
                    let {
                        children: n,
                        variant: t = "full",
                        ...o
                    } = e;
                    return (0, i.jsx)(l.x, {
                        templateColumns: P.y9,
                        gap: P.T_,
                        ...o,
                        children: (0, i.jsx)(a.E, {
                            gridColumn: {
                                base: "1 / span 2",
                                l: "full" === t ? "1 / span 5" : "1 / span 6"
                            },
                            children: n
                        })
                    })
                },
                E = e => {
                    let {
                        title: n,
                        text: t,
                        mediaAsset: E,
                        link: F,
                        linkLabel: R,
                        link2: M,
                        linkLabel2: I,
                        designVariant: A,
                        containerProps: L,
                        variant: _ = "full"
                    } = e, N = (0, x.s)(), H = null != A ? A : "Tall", z = (0, C.useRef)(null), V = (0, C.useRef)(null), B = (0, v.W)(V, {
                        once: !0
                    }), [$, D] = (0, C.useState)(!1), q = (0, o.jT)(E) && (0, o.QR)(E), G = {
                        tall: ["9:16", "16:9"],
                        short: ["9:16", "21:9"]
                    }, W = {
                        position: "absolute",
                        borderRadius: "embedded" === _ ? "md" : "unset"
                    }, {
                        scrollYProgress: U
                    } = (0, b.L)({
                        target: z,
                        offset: ["center center", "0 90vh"]
                    }), K = (0, f.G)(U, [.5, 1], [1, .8]);
                    (0, C.useEffect)(() => {
                        B && !$ && (N.start("visible"), D(!0))
                    }, [N, B, $]);
                    let O = () => (0, o.jT)(E) ? q ? (0, i.jsxs)(r.v, {
                            autoplay: !0,
                            muted: !0,
                            loop: !0,
                            children: [(0, i.jsx)(s.V, {
                                cloudinaryAsset: E,
                                aiTagPosition: {
                                    base: "top-left",
                                    md: "top-right"
                                },
                                aiTagOffset: c.i1.wrapperAligned,
                                wrapperProps: W,
                                loop: !0
                            }), (0, i.jsx)(j.C, {
                                sx: {
                                    zIndex: 3
                                }
                            })]
                        }) : (0, i.jsx)(d.d, {
                            cloudinaryAsset: E,
                            aiTagPosition: {
                                base: "top-left",
                                md: "top-right"
                            },
                            aiTagOffset: c.i1.wrapperAligned,
                            priority: !0,
                            fill: !0,
                            wrapperProps: W
                        }) : null,
                        Q = () => (0, i.jsx)(u.a, {
                            position: "absolute",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                            opacity: [.5, .7],
                            bgGradient: ["linear-gradient(to top, porscheBlack, porscheBlack)", "linear-gradient(to top, transparent, porscheBlack)"],
                            zIndex: 1,
                            pointerEvents: "none"
                        }),
                        X = (e, n) => {
                            if (!e) return null;
                            let t = n || "linkTitle" in e && e.linkTitle || "title" in e && e.title || "label" in e && e.label;
                            return t ? (0, i.jsx)(m.w, {
                                renderAs: p.N,
                                renderExternalLinkAs: p.N,
                                item: e,
                                icon: "none",
                                variant: "ghost",
                                theme: "dark",
                                width: ["100%", "auto"],
                                children: t
                            }) : null
                        },
                        Y = function() {
                            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                {
                                    showLinks: l = !1
                                } = e;
                            return (0, i.jsxs)(u.a, {
                                width: "100%",
                                height: "auto",
                                zIndex: 2,
                                display: "flex",
                                flexDir: "column",
                                gap: 4,
                                justifyContent: "flex-start",
                                color: "allWhite",
                                pt: {
                                    base: 12,
                                    md: 0
                                },
                                children: [n && (0, i.jsx)(k.h, {
                                    size: "full" === _ ? "headingXLarge" : "headingMedium",
                                    m: 0,
                                    children: n
                                }), t && (0, i.jsx)(w.V, {
                                    m: 0,
                                    children: t
                                }), l && (0, i.jsxs)(u.a, {
                                    display: "flex",
                                    flexDir: ["column", "row"],
                                    gap: 4,
                                    mt: 2 * ("embedded" !== _),
                                    children: [X(F, R), X(M, I)]
                                })]
                            })
                        };
                    if ("embedded" === _) {
                        let e = "Tall" === H ? G.tall : G.short;
                        return (0, i.jsx)(T.R, {
                            children: (0, i.jsx)(l.x, {
                                templateColumns: P.y9,
                                gap: P.T_,
                                children: (0, i.jsx)(a.E, {
                                    colStart: {
                                        base: 1,
                                        l: P.hb
                                    },
                                    colEnd: {
                                        base: 3,
                                        l: P.Up
                                    },
                                    children: (0, i.jsx)(h.g, {
                                        ratio: e,
                                        overflow: "hidden",
                                        ...L,
                                        children: (0, i.jsxs)(u.a, {
                                            position: "relative",
                                            w: "100%",
                                            h: "100%",
                                            borderRadius: "large",
                                            children: [O(), Q(), (0, i.jsx)(S, {
                                                position: "absolute",
                                                top: "0",
                                                left: "0",
                                                width: "100%",
                                                height: "100%",
                                                zIndex: 2,
                                                p: 6,
                                                variant: "embedded",
                                                children: Y({
                                                    showLinks: !0
                                                })
                                            })]
                                        })
                                    })
                                })
                            })
                        })
                    }
                    return (0, i.jsx)(u.a, {
                        as: y.P.div,
                        ref: z,
                        style: {
                            scale: K,
                            overflow: "hidden"
                        },
                        children: (0, i.jsxs)(u.a, {
                            position: "relative",
                            w: "100vw",
                            h: "Tall" === H ? "100svh" : ["100svh", "60svh"],
                            ...L,
                            children: [O(), Q(), (0, i.jsx)(u.a, {
                                position: "absolute",
                                top: "40vh",
                                left: "0",
                                height: "50%",
                                minHeight: "100%",
                                zIndex: 1,
                                ref: V,
                                pointerEvents: "none"
                            }), (0, i.jsx)(u.a, {
                                position: "absolute",
                                top: [6, 20],
                                left: "0",
                                zIndex: 2,
                                width: "100%",
                                h: ["auto", "50svh"],
                                children: (0, i.jsx)(g.H, {
                                    children: (0, i.jsx)(u.a, {
                                        display: "flex",
                                        flexDir: "column",
                                        gap: 4,
                                        justifyContent: "flex-start",
                                        h: "auto",
                                        children: (0, i.jsx)(S, {
                                            children: (0, i.jsx)(y.P.div, {
                                                animate: N,
                                                initial: "hidden",
                                                variants: {
                                                    visible: {
                                                        opacity: 1,
                                                        y: 0
                                                    },
                                                    hidden: {
                                                        opacity: 0,
                                                        y: 20
                                                    }
                                                },
                                                transition: {
                                                    duration: 1,
                                                    ease: "anticipate",
                                                    delay: .3
                                                },
                                                children: Y({
                                                    showLinks: !0
                                                })
                                            })
                                        })
                                    })
                                })
                            })]
                        })
                    })
                }
        },
        50281: (e, n, t) => {
            t.d(n, {
                z: () => i
            });
            let i = "\n    fragment TeamFields on Team {\n  ...ComponentReferenceFields\n  teamName\n  asset\n  flag\n  nationality\n  races\n  theme\n}\n    "
        },
        51370: (e, n, t) => {
            t.d(n, {
                B8: () => l,
                Xy: () => a,
                _J: () => o,
                ck: () => r,
                kp: () => s
            });
            var i = t(79447);
            let l = i.B8,
                a = i.Xy,
                o = i._J,
                r = i.ck,
                s = i.kp
        },
        52694: (e, n, t) => {
            t.d(n, {
                l: () => c
            });
            var i = t(6029);
            t(71317);
            var l = t(77367),
                a = t(69757),
                o = t(35882),
                r = t(55729),
                s = t(9211);
            let c = (0, l.R)((e, n) => {
                let {
                    countryCode: t,
                    className: l,
                    size: c,
                    ...d
                } = e, u = (0, a.V)("Flag", {
                    size: c
                }), {
                    name: p
                } = (0, s.E)({
                    countryCode: t
                }), h = (0, r.useMemo)(() => ["flag:".concat(t), l].filter(Boolean).join(" "), [t, l]);
                return (0, i.jsx)(o.B.span, {
                    __css: u,
                    ...d,
                    className: h,
                    title: p,
                    ref: n
                })
            });
            c.displayName = "Flag"
        },
        53720: (e, n, t) => {
            t.d(n, {
                u: () => c
            });
            var i = t(6029),
                l = t(15407),
                a = t(78852),
                o = t(39864),
                r = t(94699),
                s = t(48643);
            let c = e => {
                let {
                    title: n,
                    description: t,
                    children: c,
                    ...d
                } = e;
                return (0, i.jsxs)(r.x, {
                    mb: {
                        base: 6,
                        l: 8
                    },
                    gridTemplateColumns: l.y9,
                    ...d,
                    children: [n && (0, i.jsx)(s.E, {
                        gridColumn: {
                            base: "1 / span 2",
                            l: "1 / span 5"
                        },
                        gridColumnStart: 1,
                        children: n && (0, i.jsx)(o.h, {
                            children: n
                        })
                    }), t && (0, i.jsx)(s.E, {
                        gridColumn: {
                            base: "1 / span 2",
                            l: "1 / span 5"
                        },
                        gridColumnStart: 1,
                        children: t && (0, i.jsx)(a.V, {
                            children: t
                        })
                    }), c]
                })
            }
        },
        55223: (e, n, t) => {
            t.d(n, {
                Y: () => n7
            });
            var i = t(6029),
                l = t(93066),
                a = t(40157),
                o = t(66121),
                r = t(3082),
                s = t(26084),
                c = t(33805),
                d = t(83169),
                u = t(50281),
                p = t(12482),
                h = t(54513);
            let g = "\n    fragment NavigationFields on Navigation {\n  ...ComponentReferenceFields\n  title\n  navigationItemsCollection(limit: 15) {\n    items {\n      ... on PageArticle {\n        ...PageArticleLinkToFields\n      }\n      ... on PageBasic {\n        ...PageBasicLinkToFields\n      }\n      ... on PageCar {\n        ...PageCarLinkToFields\n      }\n      ... on PageCategory {\n        ...PageCategoryLinkToFields\n      }\n      ... on PageDriver {\n        ...PageDriverLinkToFields\n      }\n      ... on PageHomepage {\n        ...PageHomepageLinkToFields\n      }\n      ... on PageRaceSeries {\n        ...PageRaceSeriesLinkToFields\n      }\n      ... on PageRaceEvent {\n        ...PageRaceEventFields\n      }\n      ... on PageSearch {\n        ...PageSearchLinkToFields\n      }\n      ... on PageTeam {\n        ...PageTeamLinkToFields\n      }\n      ... on ExternalLink {\n        ...ExternalLinkFields\n      }\n    }\n  }\n}\n    ",
                m = "\n    query NavigationCollection($locale: String!, $preview: Boolean!, $limit: Int = 1) {\n  navigationCollection(locale: $locale, preview: $preview, limit: $limit) {\n    items {\n      ...NavigationFields\n    }\n  }\n}\n    ".concat(g, "\n").concat(a.o, "\n").concat(r.K7, "\n").concat(s.P, "\n").concat(r.e3, "\n").concat(r.Y4, "\n").concat(o.cz, "\n").concat(o.Uc, "\n").concat(r.Ah, "\n").concat(r.QK, "\n").concat(r.AX, "\n").concat(r.gZ, "\n").concat(c.U6, "\n").concat(r.x2, "\n").concat(d.ae, "\n").concat(r.cx, "\n").concat(r.F9, "\n").concat(u.z, "\n").concat(r.ng),
                x = (e, n) => (0, p.I)({
                    queryKey: ["NavigationCollection", e],
                    queryFn: (0, h.x8)(m, e),
                    ...n
                });
            x.getKey = e => ["NavigationCollection", e], x.fetcher = (e, n) => (0, h.x8)(m, e, n);
            let v = "\n    query Navigation($locale: String!, $preview: Boolean!, $id: String!) {\n  navigation(id: $id, locale: $locale, preview: $preview) {\n    ...NavigationFields\n  }\n}\n    ".concat(g, "\n").concat(a.o, "\n").concat(r.K7, "\n").concat(s.P, "\n").concat(r.e3, "\n").concat(r.Y4, "\n").concat(o.cz, "\n").concat(o.Uc, "\n").concat(r.Ah, "\n").concat(r.QK, "\n").concat(r.AX, "\n").concat(r.gZ, "\n").concat(c.U6, "\n").concat(r.x2, "\n").concat(d.ae, "\n").concat(r.cx, "\n").concat(r.F9, "\n").concat(u.z, "\n").concat(r.ng),
                b = (e, n) => (0, p.I)({
                    queryKey: ["Navigation", e],
                    queryFn: (0, h.x8)(v, e),
                    ...n
                });
            b.getKey = e => ["Navigation", e], b.fetcher = (e, n) => (0, h.x8)(v, e, n);
            let f = "\n    fragment FooterFields on Footer {\n  ...ComponentReferenceFields\n  copyrightText\n  partnerSet {\n    ...PartnerSetFields\n  }\n  primaryNavigation {\n    ...NavigationFields\n  }\n  secondaryNavigation {\n    ...NavigationFields\n  }\n  tertiaryNavigation {\n    ...NavigationFields\n  }\n  quaternaryNavigation {\n    ...NavigationFields\n  }\n  legalDisclaimer {\n    __typename\n    json\n    links {\n      entries {\n        block {\n          ...ComponentReferenceFields\n        }\n        inline {\n          ...ComponentReferenceFields\n        }\n        hyperlink {\n          ...ComponentReferenceFields\n        }\n      }\n    }\n  }\n}\n    ",
                y = "\n    query FooterCollection($locale: String!, $preview: Boolean!, $limit: Int = 1) {\n  footerCollection(locale: $locale, preview: $preview, limit: $limit) {\n    items {\n      ...FooterFields\n    }\n  }\n}\n    ".concat(f, "\n").concat(a.o, "\n").concat(o.cz, "\n").concat(o.Uc, "\n").concat(g, "\n").concat(r.K7, "\n").concat(s.P, "\n").concat(r.e3, "\n").concat(r.Y4, "\n").concat(r.Ah, "\n").concat(r.QK, "\n").concat(r.AX, "\n").concat(r.gZ, "\n").concat(c.U6, "\n").concat(r.x2, "\n").concat(d.ae, "\n").concat(r.cx, "\n").concat(r.F9, "\n").concat(u.z, "\n").concat(r.ng),
                C = (e, n) => (0, p.I)({
                    queryKey: ["FooterCollection", e],
                    queryFn: (0, h.x8)(y, e),
                    ...n
                });
            C.getKey = e => ["FooterCollection", e], C.fetcher = (e, n) => (0, h.x8)(y, e, n);
            let j = "\n    query Footer($locale: String!, $preview: Boolean!, $id: String!) {\n  footer(id: $id, locale: $locale, preview: $preview) {\n    ...FooterFields\n  }\n}\n    ".concat(f, "\n").concat(a.o, "\n").concat(o.cz, "\n").concat(o.Uc, "\n").concat(g, "\n").concat(r.K7, "\n").concat(s.P, "\n").concat(r.e3, "\n").concat(r.Y4, "\n").concat(r.Ah, "\n").concat(r.QK, "\n").concat(r.AX, "\n").concat(r.gZ, "\n").concat(c.U6, "\n").concat(r.x2, "\n").concat(d.ae, "\n").concat(r.cx, "\n").concat(r.F9, "\n").concat(u.z, "\n").concat(r.ng),
                k = (e, n) => (0, p.I)({
                    queryKey: ["Footer", e],
                    queryFn: (0, h.x8)(j, e),
                    ...n
                });
            k.getKey = e => ["Footer", e], k.fetcher = (e, n) => (0, h.x8)(j, e, n);
            var w = t(35854),
                T = t(94699),
                P = t(48643),
                S = t(51370),
                E = t(8711),
                F = t(8128),
                R = t(55729),
                M = t(40063),
                I = t(69747),
                A = t(80321),
                L = t(15407),
                _ = t(31147);
            let N = e => {
                    let {
                        onClick: n,
                        ...t
                    } = e;
                    return (0, i.jsx)(F.w, { ...t,
                        eventAction: A.wT.footerLinkClick,
                        theme: "dark",
                        icon: "none"
                    })
                },
                H = e => {
                    var n, t, l, a;
                    let o = e.quaternaryNavigation,
                        {
                            copyrightText: r,
                            legalDisclaimer: s,
                            primaryNavigation: c,
                            secondaryNavigation: d,
                            tertiaryNavigation: u
                        } = (0, R.useMemo)(() => e, [e]),
                        p = new Date().getFullYear().toString(),
                        h = (null != r ? r : "").replace("{year}", p),
                        g = {
                            base: 2,
                            l: 3
                        },
                        m = {
                            base: 2,
                            l: 12
                        };
                    return (0, i.jsx)(I.R, {
                        as: "footer",
                        bg: "porscheBlack",
                        color: "allWhite",
                        pb: 10,
                        py: 0,
                        id: _.g[5].sectionId,
                        children: (0, i.jsxs)(T.x, {
                            templateColumns: L.y9,
                            gap: L.T_,
                            py: 10,
                            children: [(0, i.jsx)(P.E, {
                                colSpan: g,
                                children: (0, i.jsx)(S.B8, {
                                    children: null == c || null == (n = c.navigationItemsCollection) ? void 0 : n.items.map(e => e && (0, i.jsx)(S.ck, {
                                        mb: "2",
                                        children: (0, i.jsx)(N, {
                                            size: "x-large",
                                            item: e
                                        })
                                    }, e.sys.id))
                                })
                            }), (0, i.jsxs)(P.E, {
                                colSpan: g,
                                children: [(0, i.jsx)(E.E, {
                                    size: "caption",
                                    mb: 4,
                                    color: "grey600",
                                    children: null == d ? void 0 : d.title
                                }), (0, i.jsx)(S.B8, {
                                    children: null == d || null == (t = d.navigationItemsCollection) ? void 0 : t.items.map(e => e && (0, i.jsx)(S.ck, {
                                        mb: "1",
                                        children: (0, i.jsx)(N, {
                                            item: e
                                        })
                                    }, e.sys.id))
                                })]
                            }), (0, i.jsxs)(P.E, {
                                colSpan: g,
                                children: [(0, i.jsx)(E.E, {
                                    size: "caption",
                                    mb: 4,
                                    color: "grey600",
                                    children: null == u ? void 0 : u.title
                                }), (0, i.jsx)(S.B8, {
                                    children: null == u || null == (l = u.navigationItemsCollection) ? void 0 : l.items.map(e => e && (0, i.jsx)(S.ck, {
                                        mb: "1",
                                        children: (0, i.jsx)(N, {
                                            item: e
                                        })
                                    }, e.sys.id))
                                })]
                            }), (0, i.jsxs)(P.E, {
                                colSpan: g,
                                children: [(0, i.jsx)(E.E, {
                                    size: "caption",
                                    mb: 4,
                                    color: "grey600",
                                    children: null == o ? void 0 : o.title
                                }), (0, i.jsx)(S.B8, {
                                    children: null == o || null == (a = o.navigationItemsCollection) ? void 0 : a.items.map(e => e && (0, i.jsx)(S.ck, {
                                        mb: "1",
                                        children: (0, i.jsx)(N, {
                                            item: e
                                        })
                                    }, e.sys.id))
                                })]
                            }), (0, i.jsx)(P.E, {
                                colSpan: m,
                                children: (0, i.jsx)(E.E, {
                                    size: "small",
                                    pt: L.T_,
                                    children: h
                                })
                            }), (0, i.jsx)(P.E, {
                                colSpan: m,
                                children: s && (0, i.jsx)(i.Fragment, {
                                    children: (0, M.Z)({ ...s,
                                        theme: "dark"
                                    }, "xx-small", {
                                        isInModule: !0
                                    })
                                })
                            })]
                        })
                    })
                },
                z = e => {
                    let {
                        id: n,
                        locale: t,
                        preview: l
                    } = e, {
                        data: a,
                        isLoading: o
                    } = k({
                        id: n,
                        locale: t,
                        preview: l
                    }, { ...!l && {
                            staleTime: 1 / 0
                        },
                        refetchOnWindowFocus: !1
                    }), r = (0, w.qM)(null == a ? void 0 : a.footer, {
                        locale: t
                    });
                    return o || !r ? null : (0, i.jsx)(H, { ...r
                    })
                };
            var V = t(81278);
            let B = "\n    query MainNavigationCollection($locale: String!, $preview: Boolean, $limit: Int = 1) {\n  mainNavigationCollection(locale: $locale, preview: $preview, limit: $limit) {\n    items {\n      ...ComponentReferenceFields\n      liveTicker\n    }\n  }\n}\n    ".concat(a.o),
                $ = (e, n) => (0, p.I)({
                    queryKey: ["MainNavigationCollection", e],
                    queryFn: (0, h.x8)(B, e),
                    ...n
                });
            $.getKey = e => ["MainNavigationCollection", e], $.fetcher = (e, n) => (0, h.x8)(B, e, n);
            let D = "\n    query MainNavigation($locale: String!, $preview: Boolean, $id: String!) {\n  mainNavigation(id: $id, locale: $locale, preview: $preview) {\n    ...MainNavigationFields\n  }\n}\n    ".concat("\n    fragment MainNavigationFields on MainNavigation {\n  ...ComponentReferenceFields\n  liveTicker\n  showLiveTicker\n  highlightLink {\n    ... on PageRaceSeries {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageHomepage {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n    }\n    ... on PageBasic {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageRaceEvent {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on ExternalLink {\n      ...ComponentReferenceFields\n      label\n      url\n    }\n    ... on ModalLink {\n      ...ComponentReferenceFields\n      label\n      embedId\n      embedProvider\n      twitchEmbedType\n      modalTitle\n    }\n  }\n  seriesSectionLabel\n  seriesSectionCollection(limit: 20) {\n    items {\n      ... on PartMainNavigationAccordion {\n        ...PartMainNavigationAccordion\n      }\n    }\n  }\n  carsSectionLabel\n  carsSectionCollection(limit: 20) {\n    items {\n      ... on PartMainNavigationItem {\n        ...PartMainNavigationItem\n      }\n    }\n  }\n  teamsSectionLabel\n  teamsSectionCollection(limit: 20) {\n    items {\n      ... on PartMainNavigationItem {\n        ...PartMainNavigationItem\n      }\n    }\n  }\n  eventsSectionLabel\n  eventsSectionCollection(limit: 20) {\n    items {\n      ... on PartMainNavigationAccordion {\n        ...PartMainNavigationAccordion\n      }\n    }\n  }\n  journalPage {\n    ...ComponentReferenceFields\n    title\n    linkTitle\n    mainCategory\n  }\n  languageSelectorSearchPlaceholder\n  languageSelectorErrorLabel\n  languageSelectorItemsCollection {\n    items {\n      ...LanguageSelectorItemFields\n    }\n  }\n}\n    ", "\n").concat(a.o, "\n").concat("\n    fragment PartMainNavigationAccordion on PartMainNavigationAccordion {\n  ...ComponentReferenceFields\n  title\n  itemsCollection {\n    items {\n      ... on PartMainNavigationItem {\n        ...PartMainNavigationItem\n      }\n    }\n  }\n}\n    ", "\n").concat("\n    fragment PartMainNavigationItem on PartMainNavigationItem {\n  ...ComponentReferenceFields\n  label\n  animatedLabel\n  image\n  theme\n  dateLabel\n  page {\n    ... on PageRaceSeries {\n      ...ComponentReferenceFields\n      slug\n    }\n    ... on PageCar {\n      ...ComponentReferenceFields\n      slug\n    }\n    ... on PageTeam {\n      ...ComponentReferenceFields\n      slug\n    }\n    ... on PageBasic {\n      ...ComponentReferenceFields\n      slug\n    }\n    ... on PageArticle {\n      ...ComponentReferenceFields\n      slug\n    }\n    ... on PageRaceEvent {\n      ...ComponentReferenceFields\n      slug\n    }\n    ... on PageDriver {\n      ...ComponentReferenceFields\n      slug\n    }\n  }\n}\n    ", "\n").concat("\n    fragment LanguageSelectorItemFields on LanguageSelectorItem {\n  label\n  locale\n  countryName\n  languageName\n  region\n}\n    "),
                q = (e, n) => (0, p.I)({
                    queryKey: ["MainNavigation", e],
                    queryFn: (0, h.x8)(D, e),
                    ...n
                });
            q.getKey = e => ["MainNavigation", e], q.fetcher = (e, n) => (0, h.x8)(D, e, n);
            var G = t(71024),
                W = t.n(G),
                U = t(20734),
                K = t(72813),
                O = t(35882),
                Q = t(92643),
                X = t(27229),
                Y = t(193),
                Z = t(91753),
                J = t(76939),
                ee = t(86590),
                en = t(45253),
                et = t(94771),
                ei = t(36760),
                el = t(73186),
                ea = t(24561),
                eo = t(3591),
                er = t(52694),
                es = t(91514),
                ec = t(98168),
                ed = t(81109),
                eu = t(41684),
                ep = t(25653),
                eh = t(36011),
                eg = t(21593),
                em = t(21909),
                ex = t(61843);
            let ev = R.useLayoutEffect,
                eb = {
                    scrollbarWidth: "none",
                    "&::webkit-scrollbar": {
                        display: "none"
                    }
                },
                ef = e => {
                    let {
                        show: n = !0,
                        ...t
                    } = e;
                    return (0, i.jsx)(eg.N, {
                        children: n && (0, i.jsx)(Z.e, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                y: 20
                            },
                            transition: {
                                duration: .4,
                                ease: "easeInOut"
                            },
                            height: 36,
                            width: "100%",
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: "linear-gradient(180deg,rgba(0, 0, 0, 0) 11%, rgba(0, 0, 0, 0.70) 90%)",
                            className: "scroll-indicator-gradient-overlay",
                            pointerEvents: "none",
                            ...t
                        })
                    })
                };
            var ey = t(68865),
                eC = t(71849);
            let ej = (0, O.B)("svg", {
                    shouldForwardProp: e => (0, eC.M)(e)
                }),
                ek = e => {
                    let {
                        width: n = "100%",
                        height: t = "100%",
                        color: l = "white"
                    } = e;
                    return (0, i.jsxs)(ej, {
                        viewBox: "0 0 142 28",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        width: n,
                        height: t,
                        children: [(0, i.jsx)("path", {
                            d: "M141.397 12.3927H0V14.9089H141.397V12.3927Z",
                            fill: "#E00000"
                        }), (0, i.jsx)("path", {
                            d: "M0 27.8337L0.354711 19.9414H2.13935L3.81314 25.1956L5.40934 19.9414H7.20507L7.60412 27.8337H6.14093L5.89707 22.635L4.26762 27.8337H3.23674L1.58511 22.635L1.36342 27.8337H0Z",
                            fill: l
                        }), (0, i.jsx)("path", {
                            d: "M11.9826 27.9667C11.3729 27.9667 10.863 27.9002 10.4751 27.7561C10.076 27.6231 9.76564 27.3903 9.54394 27.08C9.32225 26.7696 9.16706 26.3373 9.0673 25.8163C8.97862 25.2953 8.93428 24.6413 8.93428 23.8654C8.93428 23.0895 8.97862 22.3911 9.08947 21.8701C9.18923 21.3492 9.3555 20.9279 9.58828 20.6287C9.82106 20.3294 10.1314 20.1077 10.5194 19.9968C10.9074 19.8749 11.3951 19.8084 11.9826 19.8084C12.5701 19.8084 13.0578 19.8638 13.4458 19.9968C13.8337 20.1188 14.1552 20.3294 14.3769 20.6287C14.6097 20.9279 14.7759 21.3492 14.8757 21.8701C14.9755 22.3911 15.0309 23.0562 15.0309 23.8654C15.0309 24.6746 14.9865 25.2953 14.8979 25.8163C14.8092 26.3373 14.654 26.7585 14.4212 27.08C14.1884 27.4014 13.8892 27.6231 13.4901 27.7561C13.0911 27.8892 12.5922 27.9667 11.9826 27.9667ZM11.9826 26.7474C12.304 26.7474 12.559 26.7142 12.7474 26.6587C12.9359 26.6033 13.0911 26.4703 13.1908 26.2708C13.2906 26.0713 13.3682 25.7831 13.4014 25.3951C13.4347 25.0071 13.4458 24.4972 13.4458 23.8432C13.4458 23.2779 13.4347 22.8124 13.4014 22.4687C13.3682 22.1251 13.3017 21.848 13.1908 21.6595C13.0911 21.4711 12.9359 21.3492 12.7474 21.2827C12.559 21.2162 12.304 21.194 11.9826 21.194C11.6611 21.194 11.4062 21.2272 11.2177 21.2827C11.0293 21.3381 10.8741 21.4711 10.7743 21.6595C10.6746 21.848 10.597 22.114 10.5637 22.4687C10.5305 22.8234 10.5194 23.2779 10.5194 23.8432C10.5194 24.4972 10.5305 25.0071 10.5637 25.3951C10.597 25.7831 10.6635 26.0713 10.7743 26.2708C10.8741 26.4703 11.0293 26.6033 11.2177 26.6587C11.4062 26.7142 11.6611 26.7474 11.9826 26.7474Z",
                            fill: l
                        }), (0, i.jsx)("path", {
                            d: "M15.962 19.9414H21.4933V21.3159H19.4869V27.8337H17.9794V21.3159H15.962V19.9414Z",
                            fill: l
                        }), (0, i.jsx)("path", {
                            d: "M25.4727 27.9667C24.863 27.9667 24.3531 27.9002 23.9652 27.7561C23.5661 27.6231 23.2557 27.3903 23.034 27.08C22.8123 26.7696 22.6572 26.3373 22.5574 25.8163C22.4687 25.2953 22.4244 24.6413 22.4244 23.8654C22.4244 23.0895 22.4687 22.3911 22.5796 21.8701C22.6793 21.3492 22.8456 20.9279 23.0784 20.6287C23.3112 20.3294 23.6215 20.1077 24.0095 19.9968C24.3975 19.8749 24.8852 19.8084 25.4727 19.8084C26.0602 19.8084 26.5479 19.8638 26.9359 19.9968C27.3238 20.1188 27.6453 20.3294 27.867 20.6287C28.0998 20.9279 28.266 21.3492 28.3658 21.8701C28.4656 22.3911 28.521 23.0562 28.521 23.8654C28.521 24.6746 28.4766 25.2953 28.388 25.8163C28.2993 26.3373 28.1441 26.7585 27.9113 27.08C27.6785 27.4014 27.3793 27.6231 26.9802 27.7561C26.5812 27.8892 26.0823 27.9667 25.4727 27.9667ZM25.4727 26.7474C25.7941 26.7474 26.0491 26.7142 26.2375 26.6587C26.426 26.6033 26.5812 26.4703 26.6809 26.2708C26.7807 26.0713 26.8583 25.7831 26.8915 25.3951C26.9248 25.0071 26.9359 24.4972 26.9359 23.8432C26.9359 23.2779 26.9248 22.8124 26.8915 22.4687C26.8583 22.1251 26.7918 21.848 26.6809 21.6595C26.5812 21.4711 26.426 21.3492 26.2375 21.2827C26.0491 21.2162 25.7941 21.194 25.4727 21.194C25.1512 21.194 24.8963 21.2272 24.7078 21.2827C24.5194 21.3381 24.3642 21.4711 24.2644 21.6595C24.1647 21.848 24.0871 22.114 24.0538 22.4687C24.0206 22.8234 24.0095 23.2779 24.0095 23.8432C24.0095 24.4972 24.0206 25.0071 24.0538 25.3951C24.0871 25.7831 24.1536 26.0713 24.2644 26.2708C24.3642 26.4703 24.5194 26.6033 24.7078 26.6587C24.8963 26.7142 25.1512 26.7474 25.4727 26.7474Z",
                            fill: l
                        }), (0, i.jsx)("path", {
                            d: "M30.0396 19.9414H32.8884C33.2985 19.9414 33.6643 19.9857 33.9636 20.0633C34.2629 20.1409 34.5178 20.285 34.7173 20.4846C34.9169 20.6841 35.061 20.939 35.1607 21.2716C35.2605 21.6041 35.3048 22.0032 35.3048 22.4909C35.3048 23.2225 35.194 23.7767 34.9723 24.1425C34.7506 24.5083 34.418 24.7411 33.9747 24.8519L35.5376 27.8559H33.8638L32.5115 25.118H31.5693V27.8559H30.0507V19.9636L30.0396 19.9414ZM31.5582 21.3159V23.81H32.6888C32.8773 23.81 33.0435 23.7989 33.1766 23.7767C33.3096 23.7546 33.4204 23.6991 33.498 23.6105C33.5756 23.5218 33.6421 23.3888 33.6754 23.2225C33.7086 23.0562 33.7308 22.8234 33.7308 22.5352C33.7308 22.2692 33.7086 22.0586 33.6754 21.9034C33.6421 21.7482 33.5756 21.6152 33.498 21.5376C33.4093 21.4489 33.2985 21.3935 33.1655 21.3603C33.0325 21.3381 32.8551 21.327 32.6445 21.327H31.5582V21.3159Z",
                            fill: l
                        }), (0, i.jsx)("path", {
                            d: "M38.0649 25.4062C38.076 25.6611 38.1093 25.8828 38.1536 26.0491C38.1979 26.2154 38.2644 26.3595 38.3531 26.4592C38.4418 26.559 38.5637 26.6366 38.7078 26.6809C38.8519 26.7253 39.0515 26.7474 39.2842 26.7474C39.7165 26.7474 40.0158 26.6698 40.1821 26.5257C40.3484 26.3816 40.437 26.1156 40.437 25.7387C40.437 25.5835 40.4149 25.4505 40.3816 25.3397C40.3373 25.2288 40.2708 25.1291 40.1821 25.0625C40.0934 24.985 39.9715 24.9184 39.8385 24.8519C39.6944 24.7965 39.517 24.7411 39.3064 24.6857L38.6967 24.5305C38.3531 24.4418 38.0649 24.342 37.81 24.2201C37.555 24.0982 37.3444 23.9541 37.1671 23.7656C36.9897 23.5772 36.8678 23.3555 36.7791 23.0895C36.6904 22.8234 36.6461 22.502 36.6461 22.1251C36.6461 21.7482 36.6904 21.4378 36.7791 21.1496C36.8678 20.8614 37.023 20.6176 37.2225 20.4181C37.422 20.2185 37.6991 20.0633 38.0317 19.9636C38.3642 19.8638 38.7743 19.8084 39.251 19.8084C39.7609 19.8084 40.1821 19.8638 40.5257 19.9636C40.8583 20.0633 41.1243 20.2296 41.3349 20.4402C41.5344 20.6508 41.6785 20.9279 41.7672 21.2494C41.8559 21.5819 41.9002 21.9699 41.9224 22.4244H40.4481C40.437 22.1694 40.4038 21.9588 40.3705 21.7926C40.3262 21.6263 40.2708 21.5044 40.171 21.4157C40.0713 21.327 39.9715 21.2605 39.8274 21.2272C39.6833 21.194 39.5059 21.1829 39.2953 21.1829C38.9184 21.1829 38.6413 21.2494 38.464 21.3935C38.2866 21.5376 38.1979 21.7704 38.1979 22.114C38.1979 22.2914 38.2201 22.4355 38.2534 22.5574C38.2866 22.6793 38.3642 22.768 38.4529 22.8456C38.5416 22.9232 38.6635 23.0008 38.8076 23.0562C38.9517 23.1116 39.1401 23.1671 39.3507 23.2225L39.9604 23.3777C40.6366 23.5439 41.1465 23.81 41.4901 24.1647C41.8337 24.5194 42 25.0404 42 25.7165C42 26.0823 41.9557 26.4149 41.8559 26.692C41.7561 26.9691 41.6009 27.213 41.3903 27.4014C41.1797 27.5899 40.8915 27.734 40.5479 27.8448C40.2043 27.9446 39.7831 28 39.2842 28C38.7854 28 38.3864 27.9557 38.0538 27.867C37.7213 27.7783 37.4442 27.6231 37.2336 27.4236C37.023 27.2241 36.8678 26.958 36.768 26.6255C36.6682 26.304 36.6017 25.905 36.5796 25.4394H38.076L38.0649 25.4062Z",
                            fill: l
                        }), (0, i.jsx)("path", {
                            d: "M43.4299 19.9414H46.3341C46.7443 19.9414 47.099 19.9857 47.3983 20.0744C47.6975 20.1631 47.9414 20.3072 48.1298 20.5067C48.3183 20.7063 48.4624 20.9723 48.5511 21.2937C48.6397 21.6152 48.6841 22.0143 48.6841 22.4798C48.6841 22.9897 48.6397 23.4109 48.5511 23.7546C48.4624 24.0871 48.3183 24.3642 48.1188 24.5637C47.9303 24.7633 47.6754 24.9074 47.3761 24.985C47.0768 25.0625 46.7221 25.1069 46.3009 25.1069H44.9375V27.8448H43.4188V19.9525L43.4299 19.9414ZM44.9485 21.3159V23.81H46.1013C46.312 23.81 46.4782 23.7989 46.6112 23.7656C46.7443 23.7324 46.844 23.677 46.9216 23.5772C46.9992 23.4885 47.0546 23.3555 47.0879 23.1892C47.1211 23.023 47.1322 22.8013 47.1322 22.5352C47.1322 22.2803 47.1211 22.0808 47.0879 21.9256C47.0546 21.7704 46.9992 21.6374 46.9216 21.5598C46.844 21.4711 46.7443 21.4046 46.6112 21.3713C46.4782 21.3381 46.312 21.327 46.1124 21.327H44.9596L44.9485 21.3159Z",
                            fill: l
                        }), (0, i.jsx)("path", {
                            d: "M52.9628 27.9667C52.3531 27.9667 51.8432 27.9002 51.4553 27.7561C51.0562 27.6231 50.7458 27.3903 50.5242 27.08C50.3025 26.7696 50.1473 26.3373 50.0475 25.8163C49.9588 25.2953 49.9145 24.6413 49.9145 23.8654C49.9145 23.0895 49.9588 22.3911 50.0697 21.8701C50.1694 21.3492 50.3357 20.9279 50.5685 20.6287C50.8013 20.3294 51.1116 20.1077 51.4996 19.9968C51.8876 19.8749 52.3753 19.8084 52.9628 19.8084C53.5503 19.8084 54.038 19.8638 54.426 19.9968C54.8139 20.1188 55.1354 20.3294 55.3571 20.6287C55.5899 20.9279 55.7561 21.3492 55.8559 21.8701C55.9557 22.3911 56.0111 23.0562 56.0111 23.8654C56.0111 24.6746 55.9667 25.2953 55.8781 25.8163C55.7894 26.3373 55.6342 26.7585 55.4014 27.08C55.1686 27.4014 54.8694 27.6231 54.4703 27.7561C54.0713 27.8892 53.5724 27.9667 52.9628 27.9667ZM52.9628 26.7474C53.2842 26.7474 53.5392 26.7142 53.7276 26.6587C53.9161 26.6033 54.0713 26.4703 54.171 26.2708C54.2708 26.0713 54.3484 25.7831 54.3816 25.3951C54.4149 25.0071 54.426 24.4972 54.426 23.8432C54.426 23.2779 54.4149 22.8124 54.3816 22.4687C54.3484 22.1251 54.2819 21.848 54.171 21.6595C54.0713 21.4711 53.9161 21.3492 53.7276 21.2827C53.5392 21.2162 53.2842 21.194 52.9628 21.194C52.6413 21.194 52.3864 21.2272 52.1979 21.2827C52.0095 21.3381 51.8543 21.4711 51.7546 21.6595C51.6548 21.848 51.5772 22.114 51.5439 22.4687C51.5107 22.8234 51.4996 23.2779 51.4996 23.8432C51.4996 24.4972 51.5107 25.0071 51.5439 25.3951C51.5772 25.7831 51.6437 26.0713 51.7546 26.2708C51.8543 26.4703 52.0095 26.6033 52.1979 26.6587C52.3864 26.7142 52.6413 26.7474 52.9628 26.7474Z",
                            fill: l
                        }), (0, i.jsx)("path", {
                            d: "M57.5297 19.9414H60.3785C60.7886 19.9414 61.1544 19.9857 61.4537 20.0633C61.753 20.1409 62.0079 20.285 62.2074 20.4846C62.407 20.6841 62.5511 20.939 62.6508 21.2716C62.7506 21.6041 62.7949 22.0032 62.7949 22.4909C62.7949 23.2225 62.6841 23.7767 62.4624 24.1425C62.2407 24.5083 61.9082 24.7411 61.4648 24.8519L63.0277 27.8559H61.3539L60.0016 25.118H59.0594V27.8559H57.5408V19.9636L57.5297 19.9414ZM59.0483 21.3159V23.81H60.1789C60.3674 23.81 60.5336 23.7989 60.6667 23.7767C60.7997 23.7546 60.9105 23.6991 60.9881 23.6105C61.0657 23.5218 61.1322 23.3888 61.1655 23.2225C61.1987 23.0562 61.2209 22.8234 61.2209 22.5352C61.2209 22.2692 61.1987 22.0586 61.1655 21.9034C61.1322 21.7482 61.0657 21.6152 60.9881 21.5376C60.8994 21.4489 60.7886 21.3935 60.6556 21.3603C60.5226 21.3381 60.3452 21.327 60.1346 21.327H59.0483V21.3159Z",
                            fill: l
                        }), (0, i.jsx)("path", {
                            d: "M63.7704 19.9414H69.3017V21.3159H67.2953V27.8337H65.7878V21.3159H63.7704V19.9414Z",
                            fill: l
                        }), (0, i.jsx)("path", {
                            d: "M14.4212 6.35154C15.8068 6.35154 16.5495 5.60887 16.5495 4.22328V2.12827C16.5495 0.742676 15.8068 0 14.4212 0H0V8.62391H1.95091V6.35154H14.4212ZM14.5986 2.23911V4.10135C14.5986 4.32304 14.4766 4.44497 14.2549 4.44497H1.95091V1.89549H14.2439C14.4656 1.89549 14.5875 2.01742 14.5875 2.23911H14.5986ZM21.1496 8.61283C19.7641 8.61283 19.0214 7.87015 19.0214 6.48456V2.12827C19.0214 0.742676 19.7641 0 21.1496 0H33.1322C34.5178 0 35.2605 0.742676 35.2605 2.12827V6.49565C35.2605 7.88124 34.5178 8.62391 33.1322 8.62391H21.1496V8.61283ZM32.9549 6.71734C33.1766 6.71734 33.2985 6.59541 33.2985 6.37371V2.23911C33.2985 2.01742 33.1766 1.89549 32.9549 1.89549H21.3159C21.0942 1.89549 20.9723 2.01742 20.9723 2.23911V6.37371C20.9723 6.59541 21.0942 6.71734 21.3159 6.71734H32.9549ZM52.3531 5.68646C53.4949 6.16311 54.304 7.29375 54.304 8.61283H52.3531C52.3531 7.06097 51.6326 6.34046 50.0808 6.34046H39.7055V8.61283H37.7546V0H52.1758C53.5614 0 54.304 0.742676 54.304 2.12827V3.56928C54.304 4.88836 53.6168 5.63104 52.3531 5.68646ZM52.0095 4.45606C52.2312 4.45606 52.3531 4.33413 52.3531 4.11243V2.2502C52.3531 2.0285 52.2312 1.90657 52.0095 1.90657H39.7165V4.46714H52.0095V4.45606ZM56.6651 2.12827C56.6651 0.742676 57.4078 0 58.7933 0H72.9264V1.60728H58.9596C58.7379 1.60728 58.616 1.72922 58.616 1.95091V3.15915C58.616 3.38084 58.7379 3.50277 58.9596 3.50277H71.0863C72.4719 3.50277 73.2146 4.24545 73.2146 5.63104V6.49565C73.2146 7.88124 72.4719 8.62391 71.0863 8.62391H56.9533V7.01663H70.92C71.1417 7.01663 71.2636 6.8947 71.2636 6.673V5.46477C71.2636 5.24307 71.1417 5.12114 70.92 5.12114H58.7933C57.4078 5.12114 56.6651 4.37846 56.6651 2.99287V2.12827ZM75.6532 2.12827C75.6532 0.742676 76.3959 0 77.7815 0H91.5709V1.89549H77.9477C77.726 1.89549 77.6041 2.01742 77.6041 2.23911V6.37371C77.6041 6.59541 77.726 6.71734 77.9477 6.71734H91.5709V8.61283H77.7815C76.3959 8.61283 75.6532 7.87015 75.6532 6.48456V2.12827ZM109.672 0V8.62391H107.721V5.26524H96.0269V8.62391H94.076V0H96.0269V3.35867H107.721V0H109.672ZM114.15 1.60728V3.50277H129.292V5.11006H114.15V7.00554H129.292V8.61283H112.2V0H129.292V1.60728H114.15Z",
                            fill: l
                        })]
                    })
                },
                ew = e => (0, A.yn)({ ...e,
                    eventAction: A.wT.navigationLinkClick
                }),
                eT = "#010205",
                eP = "#ffffff",
                eS = e => {
                    let {
                        onClick: n,
                        forceLogoColorWhite: t = !1,
                        ...a
                    } = e, {
                        locale: o
                    } = (0, V.useRouter)(), {
                        state: {
                            pagePresentation: r,
                            pageType: s,
                            pageId: c,
                            pageContentTags: d
                        }
                    } = (0, l.CU)(), u = (0, R.useMemo)(() => {
                        if (!0 === t) return eP;
                        if ("PageArticle" === s) {
                            if ("split screen" === r) return eP;
                            if ("full screen" === r) return eT
                        }
                        if ("PageBasic" === s) {
                            if ("basic-with-image" === r) return eP;
                            if ("basic-without-image" === r) return eT
                        }
                        return "PageCategory" == s || "PageTeam" == s ? eT : eP
                    }, [r, s, t]);
                    return (0, i.jsx)(K.a, {
                        position: "relative",
                        width: "142px",
                        height: "28px",
                        ...a,
                        children: (0, i.jsx)(eu.S, {
                            href: "/",
                            "aria-label": "Home",
                            display: "inline-block",
                            position: "absolute",
                            onClick: e => {
                                var t;
                                n && n(e), ew({
                                    locale: o,
                                    pageExperience: {
                                        pageCategory: s,
                                        contentTags: null != d ? d : []
                                    },
                                    componentClick: {
                                        clickElementType: "navigation",
                                        clickElementId: c,
                                        clickElementName: "Home",
                                        targetUrl: null != (t = e.currentTarget.getAttribute("href")) ? t : "",
                                        targetType: "internal"
                                    }
                                })
                            },
                            children: (0, i.jsx)(ek, {
                                width: "142px",
                                height: "28px",
                                color: u
                            })
                        })
                    })
                };
            var eE = t(62518),
                eF = t(50687),
                eR = t(43380);
            let eM = {
                    duration: .45,
                    ease: [.4, 0, .2, 1]
                },
                eI = {
                    hidden: {
                        opacity: 0,
                        y: -12,
                        scale: .98,
                        transition: eM
                    },
                    visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: eM
                    }
                },
                eA = {
                    hidden: {
                        opacity: 0,
                        transition: eM
                    },
                    visible: {
                        opacity: 1,
                        transition: eM
                    }
                },
                eL = e => {
                    let {
                        locale: n
                    } = e, t = eN(n), l = t && void 0 !== eR.Xr[t], a = "en" === n || !t || !l;
                    return (0, i.jsx)(en.s, {
                        alignItems: "center",
                        justifyContent: "center",
                        width: "var(--CountryFlagIcon-height)",
                        height: "var(--CountryFlagIcon-height)",
                        children: a ? (0, i.jsx)(eo.I, {
                            name: "globe",
                            theme: "dark",
                            mr: 4
                        }) : (0, i.jsx)(er.l, {
                            countryCode: t
                        })
                    })
                },
                e_ = e => {
                    let {
                        children: n
                    } = e;
                    return (0, i.jsx)(K.a, {
                        as: "span",
                        color: "allWhite",
                        textTransform: "uppercase",
                        lineHeight: 1,
                        children: n
                    })
                },
                eN = e => e.split("-")[1],
                eH = e => "".concat(e.countryName, " (").concat(e.languageName, ")"),
                ez = "Close language selector",
                eV = e => {
                    let {
                        items: n,
                        title: t,
                        searchPlaceholder: a,
                        languageSelectorErrorLabel: o,
                        onClose: r,
                        id: s,
                        onOpenChange: c,
                        hideButton: d = !1,
                        controlledOpen: u,
                        hideCloseButton: p = !1,
                        clickOutsideExcludeRefs: h = []
                    } = e, {
                        locale: g
                    } = (0, V.useRouter)(), m = (0, R.useRef)(null), x = (0, R.useRef)(null), {
                        state: {
                            pageType: v,
                            pageId: b,
                            pageContentTags: f,
                            hasLiveTicker: y,
                            localeSlugMap: C
                        }
                    } = (0, l.CU)(), {
                        isOpen: j,
                        onOpen: k,
                        onClose: w
                    } = (0, X.j)({ ...void 0 !== u && {
                            isOpen: u
                        },
                        onOpen: () => null == c ? void 0 : c(!0),
                        onClose: () => null == c ? void 0 : c(!1)
                    }), [T, P] = (0, R.useState)(""), [S, F] = (0, R.useState)(!0), {
                        scrollY: M
                    } = (0, ep.L)();
                    (0, eh.L)(M, "change", e => {
                        F(e <= 0)
                    });
                    let I = (0, R.useMemo)(() => n.filter(e => !!e).sort((e, n) => {
                            var t, i, l, a;
                            let o = null != (t = e.region) ? t : "",
                                r = null != (i = n.region) ? i : "",
                                s = null != (l = e.countryName) ? l : "",
                                c = null != (a = n.countryName) ? a : "";
                            return !o && r ? -1 : o && !r ? 1 : (o || r) && o !== r ? o.localeCompare(r) : s.localeCompare(c)
                        }), [n]),
                        L = (0, R.useMemo)(() => {
                            if (!T.trim()) return I;
                            let e = T.toLowerCase().trim();
                            return I.filter(n => {
                                var t, i, l, a, o;
                                let r = (null != (t = n.countryName) ? t : "").toLowerCase(),
                                    s = (null != (i = n.languageName) ? i : "").toLowerCase(),
                                    c = (null != (l = n.region) ? l : "").toLowerCase(),
                                    d = (null != (a = n.label) ? a : "").toLowerCase(),
                                    u = (null != (o = n.locale) ? o : "").toLowerCase();
                                return r.includes(e) || s.includes(e) || c.includes(e) || d.includes(e) || u.includes(e)
                            })
                        }, [I, T]),
                        _ = (0, R.useMemo)(() => n.filter(e => (null == e ? void 0 : e.locale) === g)[0], [n, g]),
                        N = (e, n, t, i) => {
                            (0, A.yn)({
                                eventAction: A.wT.navigationLinkClick,
                                locale: g,
                                pageExperience: {
                                    pageCategory: v,
                                    contentTags: null != f ? f : []
                                },
                                componentClick: {
                                    clickElementType: n,
                                    clickElementId: b,
                                    clickElementName: e,
                                    ...t && {
                                        targetUrl: t
                                    },
                                    ...i && {
                                        targetType: i
                                    }
                                }
                            })
                        };
                    return (0, R.useEffect)(() => {
                        void 0 === u && (null == c || c(j))
                    }, [j, c, u]), ((e, n) => {
                        (0, R.useEffect)(() => {
                            let t = t => {
                                e.every(e => e.current && !e.current.contains(t.target)) && n()
                            };
                            return document.addEventListener("mousedown", t), () => {
                                document.removeEventListener("mousedown", t)
                            }
                        }, [e, n])
                    })([m, x, ...h], () => {
                        j && w()
                    }), (0, R.useEffect)(() => {
                        let e = e => {
                            "Escape" === e.key && j && (T ? P("") : w())
                        };
                        return document.addEventListener("keydown", e), () => {
                            document.removeEventListener("keydown", e)
                        }
                    }, [j, w, T]), (0, R.useEffect)(() => {
                        j || P("")
                    }, [j]), (0, i.jsxs)(i.Fragment, {
                        children: [!d && (0, i.jsx)(eg.N, {
                            children: (0, i.jsx)(K.a, {
                                ref: x,
                                as: "button",
                                id: s,
                                height: {
                                    base: 9,
                                    l: "navQuickLinksHeight"
                                },
                                cursor: "pointer",
                                onClick: () => {
                                    j ? w() : k()
                                },
                                backgroundColor: "porscheBlackShaded",
                                backdropFilter: em.B.backdropFilter,
                                border: "none",
                                outline: "none",
                                borderRadius: "ndlRadiusSmall",
                                px: 4,
                                _focusVisible: { ...(0, ex.g)()
                                },
                                _hover: {
                                    opacity: .9,
                                    transition: "opacity 0.3s ease"
                                },
                                children: (0, i.jsxs)(el.z, {
                                    children: [(null == _ ? void 0 : _.locale) && (0, i.jsx)(eL, {
                                        locale: _.locale
                                    }), (0, i.jsx)(e_, {
                                        children: null == _ ? void 0 : _.label
                                    })]
                                })
                            })
                        }), (0, i.jsx)(eg.N, {
                            children: j && (0, i.jsx)(eF.Ay, {
                                disabled: !j,
                                returnFocus: !0,
                                autoFocus: !1,
                                children: (0, i.jsxs)(eE.A, {
                                    enabled: j,
                                    allowPinchZoom: !0,
                                    children: [!p && (0, i.jsx)(ey.z, {
                                        onClick: w,
                                        zIndex: "base",
                                        initial: {
                                            opacity: 0
                                        },
                                        animate: {
                                            opacity: 1
                                        },
                                        exit: {
                                            opacity: 0
                                        },
                                        height: "calc(100vh + 200px)",
                                        my: "-100px"
                                    }), (0, i.jsxs)(K.a, {
                                        className: "language-selector",
                                        position: "relative",
                                        width: "full",
                                        maxWidth: "languageSelectorMaxWidth",
                                        height: "screen",
                                        sx: {
                                            [ee.JM.l]: {
                                                position: "fixed",
                                                left: "50%",
                                                top: "calc(var(--sizes-14) + (25vh - var(--sizes-liveTickerHeight)) / 2)",
                                                transform: "translate(-50%, -50%)",
                                                height: "auto",
                                                ...y && S && {
                                                    mt: "calc(2 * var(--sizes-liveTickerHeight))"
                                                },
                                                ...y && !S && {
                                                    mt: "calc(1 * var(--sizes-liveTickerHeight))"
                                                }
                                            }
                                        },
                                        children: [(0, i.jsx)(eS, {
                                            className: "logo-mobile",
                                            position: "fixed",
                                            zIndex: "popover",
                                            top: y ? "calc(var(--sizes-liveTickerHeight) + var(--space-4))" : 4,
                                            left: 5,
                                            transitionTimingFunction: "var(--transition-property-common)",
                                            transitionDuration: "var(--transition-duration-moderate)",
                                            transform: y ? "translateY(-36px)" : "none",
                                            opacity: 1,
                                            display: {
                                                base: "inline-block",
                                                l: "none"
                                            },
                                            onClick: null != r ? r : () => {},
                                            forceLogoColorWhite: !0
                                        }), (0, i.jsx)(Z.e, {
                                            position: "absolute",
                                            top: "calc(-1 * var(--sizes-9))",
                                            right: 0,
                                            zIndex: "modal",
                                            sx: {
                                                display: p ? "none" : "flex",
                                                [ee.JM.l]: {
                                                    position: "absolute",
                                                    top: "calc(-1 * var(--sizes-14))",
                                                    right: 0,
                                                    left: "auto"
                                                }
                                            },
                                            variants: eA,
                                            initial: "hidden",
                                            animate: "visible",
                                            exit: "hidden",
                                            children: (0, i.jsx)(es.Q, {
                                                icon: "close",
                                                onClick: () => {
                                                    w(), N(ez, "interaction")
                                                },
                                                ariaLabel: ez,
                                                ariaControlsId: s,
                                                ariaExpanded: j
                                            })
                                        }), (0, i.jsx)(Z.e, {
                                            ref: m,
                                            position: "fixed",
                                            left: {
                                                base: 5,
                                                l: 0
                                            },
                                            right: {
                                                base: 5,
                                                l: 0
                                            },
                                            top: {
                                                base: "68px",
                                                l: 0
                                            },
                                            bottom: {
                                                base: 4,
                                                l: "auto"
                                            },
                                            width: {
                                                base: "auto",
                                                l: "full"
                                            },
                                            maxWidth: {
                                                base: "auto",
                                                l: "languageSelectorMaxWidth"
                                            },
                                            height: "auto",
                                            maxHeight: {
                                                base: "calc(90vh)",
                                                l: "min(var(--sizes-languageSelectorMaxHeight), calc(100vh - var(--sizes-languageSelectorTotalVerticalSpacing)))"
                                            },
                                            display: "flex",
                                            flexDirection: "column",
                                            bg: "porscheBlackShaded",
                                            borderRadius: "medium",
                                            backdropFilter: em.B.backdropFilter,
                                            overflow: "hidden",
                                            zIndex: "popover",
                                            variants: eI,
                                            initial: { ...eI.hidden,
                                                x: 0,
                                                y: 0
                                            },
                                            animate: { ...eI.visible,
                                                x: 0,
                                                y: 0
                                            },
                                            exit: { ...eI.hidden,
                                                x: 0,
                                                y: 0
                                            },
                                            children: (0, i.jsxs)(K.a, {
                                                px: {
                                                    base: 4,
                                                    l: 6
                                                },
                                                py: 6,
                                                overflowX: "hidden",
                                                overflowY: "auto",
                                                flex: "1",
                                                minHeight: 0,
                                                className: "scroll scroll-fade-y",
                                                sx: { ...eb,
                                                    "--scroll-fade-size": "9rem",
                                                    touchAction: "pan-y",
                                                    WebkitOverflowScrolling: "touch"
                                                },
                                                children: [t && (0, i.jsx)(ec.D, {
                                                    as: "h2",
                                                    size: "headingLarge",
                                                    fontWeight: 400,
                                                    color: "allWhite",
                                                    mb: 6,
                                                    children: t
                                                }), (0, i.jsx)(K.a, {
                                                    mb: 9,
                                                    width: "100%",
                                                    children: (0, i.jsx)(ed.N, {
                                                        placeholder: null != a ? a : "Search languages...",
                                                        value: T,
                                                        onChange: e => P(e.target.value),
                                                        clear: !0,
                                                        indicator: !0,
                                                        height: "56px",
                                                        borderRadius: "ndlRadiusSmall",
                                                        px: 3,
                                                        width: "100%",
                                                        bg: "ndlLanguageSelectorNonActiveBg",
                                                        border: "none",
                                                        color: "ndlLanguageSelectorTextColor",
                                                        _placeholder: {
                                                            color: "ndlLanguageSelectorPlaceholderColor"
                                                        },
                                                        _hover: {
                                                            bg: "ndlLanguageSelectorHoverBg",
                                                            backdropFilter: em.B.backdropFilter
                                                        }
                                                    })
                                                }), 0 === L.length ? (0, i.jsx)(E.E, {
                                                    color: "allWhite",
                                                    py: 4,
                                                    children: null != o ? o : "No languages found"
                                                }) : L.map((e, n) => {
                                                    var t, l;
                                                    let a = (null == e ? void 0 : e.region) && (0 === n || (null == (t = L[n - 1]) ? void 0 : t.region) !== e.region),
                                                        o = (null == e ? void 0 : e.locale) === g,
                                                        s = L[n + 1],
                                                        c = (null == e ? void 0 : e.region) && (null == s ? void 0 : s.region) === e.region;
                                                    return (null == e ? void 0 : e.countryName) && (null == e ? void 0 : e.languageName) && (null == e ? void 0 : e.locale) ? (0, i.jsxs)(K.a, {
                                                        mb: 2 * !!c,
                                                        children: [a && (0, i.jsx)(E.E, {
                                                            fontSize: "xs",
                                                            color: "allWhite",
                                                            letterSpacing: "wider",
                                                            pt: 6,
                                                            pb: 4,
                                                            children: e.region
                                                        }), o ? (0, i.jsxs)(el.z, {
                                                            width: "full",
                                                            gap: 0,
                                                            p: 3,
                                                            height: 10,
                                                            borderRadius: "ndlRadiusSmall",
                                                            bg: "ndlLanguageSelectorActiveBg",
                                                            cursor: "default",
                                                            children: [(0, i.jsx)(eL, {
                                                                locale: e.locale
                                                            }), (0, i.jsxs)(en.s, {
                                                                ml: 2,
                                                                color: "allWhite",
                                                                lineHeight: 1,
                                                                alignItems: "center",
                                                                justifyContent: "space-between",
                                                                flex: 1,
                                                                children: [(0, i.jsx)(K.a, {
                                                                    as: "span",
                                                                    children: eH(e)
                                                                }), (0, i.jsx)(eo.I, {
                                                                    name: "check",
                                                                    size: "small",
                                                                    theme: "dark"
                                                                })]
                                                            })]
                                                        }) : (0, i.jsxs)(el.z, {
                                                            as: eu.S,
                                                            href: null != (l = null == C ? void 0 : C[e.locale]) ? l : "/",
                                                            locale: e.locale,
                                                            width: "full",
                                                            gap: 3,
                                                            p: 3,
                                                            height: 10,
                                                            borderRadius: "ndlRadiusSmall",
                                                            textDecoration: "none",
                                                            bg: "ndlLanguageSelectorNonActiveBg",
                                                            _hover: {
                                                                backdropFilter: em.B.backdropFilter,
                                                                backgroundColor: "ndlLanguageSelectorHoverBg"
                                                            },
                                                            onClick: n => ((e, n) => {
                                                                let t;
                                                                e.preventDefault(), w(), r && r();
                                                                let i = null == C ? void 0 : C[n.locale],
                                                                    l = "en" === n.locale;
                                                                t = i ? l ? i : "/".concat(n.locale).concat(i) : "/".concat(n.locale), N(eH(n), "navigation", t, "internal"), window.location.assign(t)
                                                            })(n, e),
                                                            _focusVisible: { ...(0, ex.g)(),
                                                                outlineColor: "#1A44EA"
                                                            },
                                                            children: [(0, i.jsx)(eL, {
                                                                locale: e.locale
                                                            }), (0, i.jsx)(K.a, {
                                                                as: "span",
                                                                color: "allWhite",
                                                                lineHeight: 1,
                                                                children: eH(e)
                                                            })]
                                                        })]
                                                    }, "".concat(e.label, "-").concat(e.locale, "-").concat(n)) : null
                                                })]
                                            })
                                        })]
                                    })]
                                })
                            })
                        })]
                    })
                };
            var eB = t(77367),
                e$ = t(45158),
                eD = t(66769),
                eq = t(12337),
                eG = t(12195),
                eW = t(48475),
                eU = t(52452),
                eK = t(61436);
            let eO = function(e) {
                let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "channel",
                    t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
                        autoplay: !0,
                        muted: !0
                    },
                    [i, l] = (0, R.useState)(null);
                (0, R.useEffect)(() => {
                    l(window.location.hostname)
                }, []);
                let a = (0, R.useMemo)(() => !0 === t.autoplay ? "true" : "false", [t.autoplay]),
                    o = (0, R.useMemo)(() => !0 === t.muted ? "true" : "false", [t.muted]);
                return (0, R.useMemo)(() => "https://player.twitch.tv/?".concat(n, "=").concat(e, "&parent=").concat(i, "&muted=").concat(o, "&autoplay=").concat(a), [a, e, i, o, n])
            };
            var eQ = t(69882),
                eX = t(83559);
            let eY = async (e, n, t) => {
                    if (window.documentPictureInPicture.window) n.append(e), window.documentPictureInPicture.window.close(), t();
                    else {
                        let i = await window.documentPictureInPicture.requestWindow({
                            width: 640,
                            height: 360
                        });
                        i.addEventListener("pagehide", () => {
                            n.append(e), t()
                        });
                        let l = document.createElement("style");
                        l.textContent = "\n@media (display-mode: picture-in-picture) {\n  body {\n    background: black;\n    margin: 0;\n    padding: 0;\n  }\n  iframe {\n  	border: 0;\n  	aspect-ratio: 16 / 9;\n  	width: 100vw;\n  }\n}\n", i.document.head.appendChild(l), i.document.body.append(e)
                    }
                },
                eZ = (0, R.forwardRef)((e, n) => {
                    let {
                        twitchSrc: t
                    } = e, [l, a] = (0, R.useState)(null), o = (0, R.useRef)(null), {
                        isLoaded: r,
                        consentGiven: s,
                        checkConsent: c
                    } = (0, eQ.u)();
                    return (0, R.useEffect)(() => {
                        if (!r) return;
                        let e = s.get(eX.R.twitchContent);
                        if ((null == e ? void 0 : e.consentStatus) === !0) a(t);
                        else {
                            if (!o.current) return;
                            a(null), c({
                                mapContainer: [o],
                                processor: eX.R.twitchContent,
                                successCallback: () => {
                                    a(t)
                                }
                            })
                        }
                    }, [r, s, c, t]), (0, i.jsx)("div", {
                        ref: o,
                        id: "twitchIframeContainer",
                        children: l && (0, i.jsx)(K.a, {
                            as: "iframe",
                            w: "full",
                            h: "full",
                            ref: n,
                            title: "Twitch Embed",
                            src: l,
                            allowFullScreen: !0
                        })
                    })
                });
            eZ.displayName = "TwitchIframe";
            let eJ = e => {
                    let {
                        isOpen: n,
                        onClose: t,
                        onOpen: l,
                        embedId: a,
                        title: o,
                        twitchEmbedType: r = "channel"
                    } = e, [s, c] = (0, R.useState)(!1), d = (0, R.useRef)(null), u = (0, R.useRef)(null);
                    (0, R.useEffect)(() => {
                        c("documentPictureInPicture" in window)
                    }, []);
                    let p = eO(a, r),
                        h = async () => {
                            d.current && u.current && (await eY(d.current, u.current, g), t())
                        },
                        g = () => {
                            l()
                        };
                    return (0, i.jsxs)(e$.aF, {
                        isOpen: n,
                        onClose: () => {
                            t()
                        },
                        children: [(0, i.jsx)(eD.mH, {}), (0, i.jsxs)(eq.$, {
                            children: [o && (0, i.jsx)(eG.r, {
                                children: (0, i.jsxs)(el.z, {
                                    justify: "space-between",
                                    children: [(0, i.jsxs)(K.a, {
                                        children: [(0, i.jsx)(eW.p, {
                                            mr: 4
                                        }), " ", o]
                                    }), (0, i.jsxs)(el.z, {
                                        children: [s && (0, i.jsx)(et.d, {
                                            icon: "image",
                                            onClick: h,
                                            theme: "dark",
                                            hideLabel: !0,
                                            border: "none",
                                            aria: {
                                                "aria-label": "Toggle Picture in Picture"
                                            },
                                            title: "Toggle Picture in Picture"
                                        }), (0, i.jsx)(et.d, {
                                            theme: "dark",
                                            icon: "close",
                                            hideLabel: !0,
                                            aria: {
                                                "aria-label": "Close"
                                            },
                                            title: "close",
                                            onClick: t
                                        })]
                                    })]
                                })
                            }), (0, i.jsx)(eU.c, {
                                children: (0, i.jsx)(eK.g, {
                                    ratio: "16:9",
                                    ref: u,
                                    children: p && (0, i.jsx)(eZ, {
                                        ref: d,
                                        title: "Twitch Embed",
                                        twitchSrc: p,
                                        allowFullScreen: !0
                                    })
                                })
                            })]
                        })]
                    })
                },
                e0 = (0, eB.R)((e, n) => {
                    let {
                        children: t,
                        as: l = "button",
                        ...a
                    } = e;
                    return (0, i.jsxs)(en.s, {
                        as: l,
                        color: "allWhite",
                        backdropFilter: em.B.backdropFilter,
                        backgroundColor: "porscheBlackShaded",
                        px: 5,
                        height: {
                            base: 9,
                            l: "navQuickLinksHeight"
                        },
                        borderRadius: "medium",
                        transition: "var(--transition-property-common), var(--transition-duration-short) var(--transition-easing-base)",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        ...a,
                        ref: n,
                        children: [(0, i.jsx)(K.a, {
                            as: "span",
                            bgColor: "motorsportsRed",
                            height: 2,
                            width: 2,
                            borderRadius: "full"
                        }), (0, i.jsx)(E.E, {
                            children: t
                        })]
                    })
                }),
                e1 = (0, eB.R)((e, n) => {
                    let {
                        highlightLink: t,
                        hideExternalIcon: a,
                        ...o
                    } = e, {
                        isOpen: r,
                        onOpen: s,
                        onClose: c
                    } = (0, X.j)(), {
                        locale: d
                    } = (0, V.useRouter)(), {
                        state: {
                            pageType: u,
                            pageId: p,
                            pageContentTags: h
                        }
                    } = (0, l.CU)(), [g] = (0, Q.U)("(hover: hover)", {
                        ssr: !0,
                        fallback: !0
                    });
                    if ((null == t ? void 0 : t.__typename) === "ModalLink" && t.embedId) return (0, i.jsxs)(i.Fragment, {
                        children: [(0, i.jsx)(e0, { ...o,
                            onClick: () => {
                                let e = {
                                    locale: d,
                                    eventAction: A.wT.highlightNavigationToggleClick,
                                    pageExperience: {
                                        pageCategory: u,
                                        contentTags: null != h ? h : []
                                    },
                                    componentClick: {
                                        clickElementId: p
                                    }
                                };
                                if (!g) {
                                    if (t && "ModalLink" === t.__typename && t.embedId && "twitch" === t.embedProvider) {
                                        var n;
                                        let i = ["https://www.twitch.tv", ..."channel" === t.twitchEmbedType ? [t.embedId] : [], ..."videos" === t.twitchEmbedType ? ["videos", t.embedId] : [], ..."collections" === t.twitchEmbedType ? ["collections", t.embedId] : []].join("/");
                                        (0, A.yn)({ ...e,
                                            componentClick: { ...e.componentClick,
                                                clickElementType: "navigation",
                                                clickElementName: null != (n = t.label) ? n : "https://www.twitch.tv",
                                                targetType: "outbound",
                                                targetUrl: i
                                            }
                                        }), window.open(i, "_blank")
                                    }
                                    return
                                }
                                s()
                            },
                            ref: n,
                            children: t.label
                        }), (0, i.jsx)(eJ, {
                            isOpen: r,
                            onClose: c,
                            onOpen: s,
                            embedId: t.embedId,
                            title: t.modalTitle,
                            twitchEmbedType: t.twitchEmbedType
                        })]
                    });
                    if (t && (null == t ? void 0 : t.__typename) !== "ModalLink") {
                        var m;
                        return (0, i.jsx)(F.w, {
                            item: t,
                            renderAs: eu.S,
                            icon: "ExternalLink" === t.__typename && a ? "none" : void 0,
                            ...o,
                            children: (0, i.jsx)(e0, {
                                children: "ExternalLink" === t.__typename ? t.label : null != (m = t.linkTitle) ? m : t.title
                            })
                        })
                    }
                    return null
                });
            var e2 = t(3141),
                e5 = t(62151);
            let e4 = (0, O.B)(e2.P.button, {
                    shouldForwardProp: e => (0, e5.S)(e) || (0, eC.M)(e)
                }),
                e3 = (0, eB.R)((e, n) => (0, i.jsx)(e4, {
                    _hover: {
                        opacity: .5
                    },
                    transition: "var(--transition-property-common), var(--transition-duration-short) var(--transition-easing-base)",
                    ...e,
                    ref: n
                })),
                e6 = e => {
                    let {
                        onClick: n,
                        ...t
                    } = e;
                    return (0, i.jsx)(F.w, {
                        renderAs: eu.S,
                        eventAction: A.wT.navigationLinkClick,
                        color: "allWhite",
                        _hover: {
                            opacity: .5
                        },
                        transition: "var(--transition-property-common), var(--transition-duration-short) var(--transition-easing-base)",
                        ...t
                    })
                };
            var e7 = t(23518),
                e9 = t(61460),
                e8 = t(20465),
                ne = t(68128),
                nn = t(1909);
            let nt = e => {
                    let {
                        isExpanded: n,
                        children: t,
                        ...l
                    } = e;
                    return (0, i.jsxs)(e9.J, {
                        "data-group": !0,
                        width: "full",
                        display: "flex",
                        justifyContent: "space-between",
                        pb: 2,
                        textAlign: "left",
                        borderBottom: "1px solid",
                        transitionDuration: "var(--transition-duration-moderate)",
                        transitionProperty: "var(--transition-property-common)",
                        borderColor: n ? "rgba(255,255,255,0)" : "rgba(255,255,255,0.15)",
                        _hover: {
                            borderColor: n ? "rgba(255,255,255,0)" : "rgba(255,255,255,0.35)"
                        },
                        ...l,
                        _focusVisible: { ...(0, ex.g)()
                        },
                        children: [(0, i.jsx)(ec.D, {
                            as: "span",
                            size: "headingMedium",
                            fontWeight: 400,
                            transitionDuration: "var(--transition-duration-moderate)",
                            transitionProperty: "var(--transition-property-common)",
                            _groupHover: {
                                transform: n ? "translateX(0)" : "translateX(.25rem)"
                            },
                            children: t
                        }), (0, i.jsx)(eo.I, {
                            name: n ? "subtract" : "add",
                            theme: "dark"
                        })]
                    })
                },
                ni = (0, eB.R)((e, n) => {
                    let {
                        children: t,
                        ...l
                    } = e;
                    return (0, i.jsx)(e8.A, {
                        mb: 4,
                        ...l,
                        ref: n,
                        children: t
                    })
                }),
                nl = e => {
                    let {
                        children: n,
                        ...t
                    } = e;
                    return (0, i.jsx)(ne.v, {
                        mb: 2,
                        ...t,
                        children: n
                    })
                },
                na = e => {
                    let {
                        children: n,
                        ...t
                    } = e;
                    return (0, i.jsx)(nn.n, {
                        allowMultiple: !1,
                        allowToggle: !0,
                        ...t,
                        children: n
                    })
                };
            var no = t(31219);
            let nr = e => {
                    let {
                        label: n,
                        animatedLabel: t,
                        theme: a,
                        page: o,
                        image: r,
                        dateLabel: s,
                        sys: c,
                        __typename: d,
                        children: u,
                        onClick: p,
                        ...h
                    } = e, {
                        locale: g
                    } = (0, V.useRouter)(), {
                        state: {
                            pageType: m,
                            pageId: x,
                            pageContentTags: v
                        }
                    } = (0, l.CU)();
                    return o && n ? (0, i.jsx)(no.Q, {
                        "data-group": !0,
                        py: 4,
                        px: {
                            base: 4,
                            l: 6
                        },
                        rounded: "medium",
                        height: "100%",
                        backgroundColor: {
                            base: "rgba(255,255,255,0.1)",
                            l: "transparent"
                        },
                        _hover: {
                            l: {
                                backgroundColor: "rgba(255,255,255,0.1)"
                            }
                        },
                        transitionProperty: "var(--transition-property-common)",
                        transitionDuration: "var(--transition-duration-moderate)",
                        children: (0, i.jsxs)(ei.T, {
                            align: "stretch",
                            justify: "space-between",
                            height: "100%",
                            children: [(0, i.jsx)(no.r, { ...h,
                                color: "allWhite",
                                fontWeight: 600,
                                as: eu.S,
                                href: (0, e7.s6)(o),
                                onClick: e => {
                                    var t;
                                    p && p(e), ew({
                                        locale: g,
                                        pageExperience: {
                                            pageCategory: m,
                                            contentTags: null != v ? v : []
                                        },
                                        componentClick: {
                                            clickElementType: "navigation",
                                            clickElementId: x,
                                            clickElementName: n,
                                            targetUrl: null != (t = e.currentTarget.getAttribute("href")) ? t : "",
                                            targetType: "internal"
                                        }
                                    })
                                },
                                _focusVisible: { ...(0, ex.g)()
                                },
                                children: n
                            }), (0, i.jsx)(eK.g, {
                                ratio: "16:9",
                                rounded: "medium",
                                overflow: "hidden",
                                sx: {
                                    containerType: "size"
                                },
                                cursor: "pointer",
                                pointerEvents: "none",
                                children: u
                            }), s && (0, i.jsx)(K.a, {
                                position: "absolute",
                                bottom: 6,
                                left: {
                                    base: 6,
                                    l: 8
                                },
                                background: "linear-gradient(135deg, rgba(148, 149, 152, 0.20) 0%, rgba(148, 149, 152, 0.10) 100%)",
                                backdropFilter: em.B.backdropFilter,
                                borderRadius: "medium",
                                px: 3,
                                py: 1,
                                pointerEvents: "none",
                                children: (0, i.jsx)(E.E, {
                                    size: "xx-small",
                                    color: "allWhite",
                                    children: s
                                })
                            })]
                        })
                    }) : null
                },
                ns = (0, t(83004).i7)({
                    "0%": {
                        transform: "translate3d(var(--move-initial), 0, 0)"
                    },
                    "100%": {
                        transform: "translate3d(var(--move-final), 0, 0)"
                    }
                }),
                nc = e => {
                    let {
                        children: n
                    } = e;
                    return (0, i.jsx)(K.a, {
                        as: "span",
                        pr: 14,
                        transform: "translate3d(0,0,0)",
                        children: n
                    })
                },
                nd = {
                    Red: {
                        color: "rgba(0, 0, 0, 0.3)",
                        backgroundColor: "motorsportsRed"
                    },
                    White: {
                        color: "motorsportsRed",
                        backgroundColor: "allWhite"
                    },
                    Black: {
                        color: "motorsportsRed",
                        backgroundColor: "#000000"
                    },
                    FormulaE: {
                        color: "rgba(0, 0, 0, 0.3)",
                        backgroundColor: "formulaE"
                    }
                },
                nu = e => {
                    let {
                        children: n,
                        theme: t = "Red"
                    } = e, l = nd[t], [a] = (0, Q.U)("(prefers-reduced-motion)", {
                        ssr: !0,
                        fallback: !1
                    }), [o] = (0, Q.U)("(hover:hover)", {
                        ssr: !0,
                        fallback: !1
                    });
                    return (0, i.jsx)(K.a, { ...l,
                        position: "relative",
                        overflow: "hidden",
                        rounded: "medium",
                        sx: {
                            "--offset": "0rem",
                            "--move-initial": "calc(-25% + var(--offset))",
                            "--move-final": "calc(-50% + var(--offset))"
                        },
                        children: (0, i.jsxs)(ec.D, {
                            "aria-hidden": !0,
                            as: "h4",
                            fontSize: "110cqh",
                            lineHeight: "100cqh",
                            fontWeight: 700,
                            fontStyle: "italic",
                            position: "relative",
                            width: "fit-content",
                            whiteSpace: "nowrap",
                            userSelect: "none",
                            cursor: "pointer",
                            transform: "translate3d(var(--move-initial), 0, 0)",
                            _groupHover: { ...!a && o && {
                                    animation: "".concat(ns, " clamp(1s, calc(var(--char-count) * 0.25s), 2s) linear infinite")
                                }
                            },
                            sx: {
                                "--char-count": n.length.toString()
                            },
                            children: [(0, i.jsx)(nc, {
                                children: n
                            }), (0, i.jsx)(nc, {
                                children: n
                            }), (0, i.jsx)(nc, {
                                children: n
                            }), (0, i.jsx)(nc, {
                                children: n
                            })]
                        })
                    })
                },
                np = (0, eB.R)((e, n) => {
                    let {
                        children: t,
                        ...l
                    } = e;
                    return (0, i.jsx)(P.E, {
                        as: "li",
                        ...l,
                        ref: n,
                        children: t
                    })
                }),
                nh = (0, eB.R)((e, n) => {
                    let {
                        children: t,
                        ...l
                    } = e;
                    return (0, i.jsx)(T.x, {
                        as: "ul",
                        templateColumns: {
                            base: "repeat(1, 1fr)",
                            s: "repeat(2, 1fr)"
                        },
                        templateRows: "repeat(1fr)",
                        listStyleType: "none",
                        p: 0,
                        m: 0,
                        columnGap: 6,
                        rowGap: 3,
                        ...l,
                        ref: n,
                        children: t
                    })
                });
            var ng = t(81085),
                nm = t(15617);
            let nx = e => {
                    let {
                        wrapperProps: n,
                        ...t
                    } = e;
                    return (0, ng.jT)(t.cloudinaryAsset) && (0, ng.Uu)(t.cloudinaryAsset) ? (0, i.jsx)(nm.d, {
                        fill: !0,
                        sizes: ["25vw"],
                        wrapperProps: {
                            isolation: "isolate",
                            ...n
                        },
                        objectFit: "contain",
                        transitionProperty: "common",
                        transitionDuration: "var(--transition-duration-moderate)",
                        _groupHover: {
                            transform: "scale(1.05)"
                        },
                        ...t
                    }) : null
                },
                nv = (0, eB.R)((e, n) => {
                    let {
                        href: t,
                        children: a,
                        onClick: o,
                        entryId: r,
                        entryTypename: s,
                        ...c
                    } = e, {
                        locale: d
                    } = (0, V.useRouter)(), {
                        state: {
                            pageType: u,
                            pageId: p,
                            pageContentTags: h
                        }
                    } = (0, l.CU)();
                    return (0, i.jsx)(eu.S, {
                        href: t,
                        onClick: e => {
                            var n;
                            o && o(e), ew({
                                locale: d,
                                pageExperience: {
                                    pageCategory: u,
                                    contentTags: null != h ? h : []
                                },
                                componentClick: {
                                    clickElementType: "navigation",
                                    clickElementId: p,
                                    clickElementName: a,
                                    targetUrl: null != (n = e.currentTarget.getAttribute("href")) ? n : "",
                                    targetType: "internal"
                                }
                            })
                        },
                        ...c,
                        ref: n,
                        _focusVisible: { ...(0, ex.g)()
                        },
                        "data-group": !0,
                        children: (0, i.jsx)(ec.D, {
                            size: "navigationHeading",
                            color: "allWhite",
                            opacity: {
                                l: .5
                            },
                            transition: "var(--transition-property-common), var(--transition-duration-short) var(--transition-easing-base)",
                            _hover: {
                                opacity: 1
                            },
                            children: a
                        })
                    })
                }),
                nb = (0, O.B)("button"),
                nf = "cubic-bezier(0.8, 0, 0.2, 1)",
                ny = e => {
                    let {
                        isOpen: n,
                        onClick: t,
                        ariaLabel: l,
                        ariaControlsId: a
                    } = e, [o] = (0, Q.U)("(prefers-reduced-motion: reduce)", {
                        ssr: !0,
                        fallback: !1
                    }), r = o ? "0s" : "0.3s", s = "transform ".concat(r, " ").concat(nf, ", opacity ").concat(r, " ").concat(nf);
                    return (0, i.jsx)(nb, {
                        type: "button",
                        "aria-controls": a,
                        "aria-expanded": n,
                        "aria-label": l,
                        onClick: t,
                        width: 9,
                        height: 9,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "none",
                        outline: "none",
                        cursor: "pointer",
                        borderRadius: "medium",
                        backgroundColor: "transparent",
                        _focusVisible: (0, ex.g)(),
                        _hover: {
                            opacity: .9
                        },
                        children: (0, i.jsxs)("svg", {
                            width: "24",
                            height: "24",
                            viewBox: "0 0 24 24",
                            xmlns: "http://www.w3.org/2000/svg",
                            "aria-hidden": "true",
                            children: [(0, i.jsx)("rect", {
                                x: "6",
                                y: "6",
                                width: "12",
                                height: "1",
                                fill: "white",
                                style: {
                                    transition: s,
                                    transformOrigin: "12px 6.5px",
                                    transform: n ? "translateY(5.5px) rotate(45deg) scaleX(1.4142)" : "none"
                                }
                            }), (0, i.jsx)("rect", {
                                x: "6",
                                y: "11",
                                width: "12",
                                height: "1",
                                fill: "white",
                                style: {
                                    transition: s,
                                    opacity: +!n
                                }
                            }), (0, i.jsx)("rect", {
                                x: "6",
                                y: "16",
                                width: "12",
                                height: "1",
                                fill: "white",
                                style: {
                                    transition: s,
                                    transformOrigin: "12px 16.5px",
                                    transform: n ? "translateY(-4.5px) rotate(-45deg) scaleX(1.4142)" : "none"
                                }
                            })]
                        })
                    })
                };
            var nC = t(6937);
            let nj = e => {
                    let {
                        children: n,
                        onClick: t,
                        ...l
                    } = e;
                    return (0, i.jsx)(el.z, {
                        borderBottom: "1px solid",
                        borderColor: "rgba(255,255,255,0.20)",
                        py: 5,
                        px: 6,
                        display: {
                            base: "flex",
                            l: "none"
                        },
                        ...l,
                        children: (0, i.jsx)(et.d, {
                            theme: "dark",
                            icon: "arrow-left",
                            size: "large",
                            width: "full",
                            onClick: t,
                            children: n
                        })
                    })
                },
                nk = (0, e2.P)(U.Kp),
                nw = e => {
                    let {
                        children: n,
                        ...t
                    } = e;
                    return (0, i.jsx)(nk, {
                        pt: {
                            base: 0,
                            l: 10
                        },
                        display: "flex",
                        flexDirection: "column",
                        height: {
                            base: "100%",
                            l: "auto"
                        },
                        willChange: "height",
                        ...t,
                        children: n
                    })
                },
                nT = (0, e2.P)(U.oz),
                nP = e => {
                    let {
                        children: n,
                        highlight: t,
                        tabIndex: l,
                        ...a
                    } = e;
                    return (0, i.jsx)(nT, {
                        className: "focus-visible",
                        ...a,
                        children: (0, i.jsx)(ec.D, {
                            as: "span",
                            size: "navigationHeading",
                            opacity: {
                                l: t ? 1 : .5
                            },
                            transition: "var(--transition-property-common), var(--transition-duration-short) var(--transition-easing-base)",
                            _hover: {
                                opacity: 1
                            },
                            children: n
                        })
                    })
                },
                nS = e => {
                    let {
                        children: n,
                        ...t
                    } = e;
                    return (0, i.jsx)(Z.e, {
                        className: "quick-links",
                        display: "flex",
                        height: "navQuickLinksHeight",
                        position: "relative",
                        willChange: "width",
                        mx: "auto",
                        zIndex: 2,
                        minWidth: {
                            base: "100%",
                            l: "auto"
                        },
                        px: 6,
                        ...t,
                        children: (0, i.jsx)(K.a, {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: {
                                base: 0,
                                l: 6
                            },
                            flex: 1,
                            children: n
                        })
                    }, "quick-links")
                },
                nE = W()(() => t.e(7778).then(t.bind(t, 67778)).then(e => e.LiveTicker), {
                    loadableGenerated: {
                        webpack: () => [67778]
                    }
                }),
                nF = (0, e2.P)(nv),
                nR = (0, e2.P)(P.E),
                nM = (0, e2.P)(np),
                nI = (0, e2.P)(nh),
                nA = (0, e2.P)(U.oz),
                nL = "Close navigation",
                n_ = "Open navigation",
                nN = {
                    duration: .5,
                    ease: [.35, 0, .14, 1],
                    type: "tween"
                },
                nH = {
                    duration: .5,
                    type: "tween",
                    ease: [.45, .4, .14, 1]
                },
                nz = {
                    duration: .3,
                    type: "tween",
                    ease: [.62, 0, .14, 1]
                },
                nV = {
                    duration: .5,
                    ease: [0, .41, .14, 1],
                    type: "tween"
                },
                nB = {
                    series: 0,
                    cars: 1,
                    teams: 2,
                    events: 3
                },
                n$ = {
                    navigationCollapsed: {
                        opacity: 0,
                        transition: { ...nN
                        }
                    },
                    navigationExpanded: {
                        opacity: 1,
                        transition: { ...nN
                        }
                    }
                },
                nD = {
                    navigationCollapsed: {
                        opacity: 0,
                        transition: { ...nN
                        }
                    },
                    navigationExpanded: {
                        opacity: 1,
                        transition: { ...nN
                        }
                    }
                },
                nq = {
                    navigationCollapsed: {
                        opacity: 0,
                        transition: { ...nz
                        }
                    },
                    navigationExpanded: {
                        opacity: 1,
                        transition: { ...nH,
                            delay: nH.duration / 2
                        }
                    }
                },
                nG = {
                    quickLinksVisible: {
                        opacity: 1,
                        transition: { ...nN,
                            delay: nz.duration
                        }
                    },
                    quickLinksHidden: {
                        opacity: 0,
                        transition: { ...nN
                        }
                    }
                },
                nW = {
                    tabListVisible: e => {
                        let {
                            delayChildren: n
                        } = e;
                        return {
                            transition: {
                                staggerChildren: .05,
                                delayChildren: n ? nH.duration / 2 : 0
                            }
                        }
                    },
                    tabListHidden: {
                        transition: { ...nV
                        }
                    },
                    tabListHiddenWithY: {
                        transition: { ...nV
                        }
                    }
                },
                nU = {
                    tabListVisible: {
                        y: 0,
                        opacity: 1,
                        transition: { ...nV
                        }
                    },
                    tabListHidden: {
                        y: 0,
                        opacity: 0,
                        transition: { ...nV
                        }
                    },
                    tabListHiddenWithY: {
                        y: -16,
                        opacity: 0,
                        transition: { ...nV
                        }
                    }
                },
                nK = {
                    tabPanelsVisible: {},
                    tabPanelsHidden: {}
                },
                nO = {
                    tabPanelVisible: e => {
                        let {
                            delay: n,
                            isAboveLarge: t
                        } = e;
                        return {
                            opacity: 1,
                            transition: { ...nN,
                                delay: t && n ?.5 : 0
                            }
                        }
                    },
                    tabPanelHidden: {
                        opacity: 0,
                        transition: { ...nN
                        }
                    }
                },
                nQ = {
                    visible: e => {
                        let {
                            delayChildren: n,
                            isAboveLarge: t
                        } = e;
                        return {
                            transition: {
                                staggerChildren: .07,
                                delayChildren: n ? t ?.7 : .5 : 0
                            }
                        }
                    },
                    hidden: {}
                },
                nX = {
                    visible: {
                        y: 0,
                        opacity: 1,
                        transition: { ...nV
                        }
                    },
                    hidden: {
                        y: -25,
                        opacity: 0,
                        transition: { ...nV
                        }
                    }
                },
                nY = (0, R.forwardRef)((e, n) => {
                    let {
                        children: t,
                        ...l
                    } = e;
                    return (0, i.jsx)(K.a, {
                        ref: n,
                        overflowY: "auto",
                        padding: {
                            base: 6,
                            l: 0
                        },
                        paddingBottom: {
                            base: 6,
                            l: 6
                        },
                        sx: {
                            scrollbarWidth: "none",
                            "&::webkit-scrollbar": {
                                display: "none"
                            }
                        },
                        ...l,
                        children: t
                    })
                });
            nY.displayName = "TabScrollBox";
            let nZ = O.B.div,
                nJ = e => {
                    var n, t;
                    let {
                        highlightLink: a,
                        languageSelectorItemsCollection: o,
                        journalPage: r,
                        seriesSectionCollection: s,
                        seriesSectionLabel: c,
                        carsSectionCollection: d,
                        carsSectionLabel: u,
                        teamsSectionCollection: p,
                        teamsSectionLabel: h,
                        eventsSectionCollection: g,
                        eventsSectionLabel: m,
                        showLiveTicker: x,
                        languageSelectorErrorLabel: v,
                        languageSelectorSearchPlaceholder: b
                    } = e, {
                        state: {
                            hasLiveTicker: f,
                            mainNavigationId: y,
                            pageType: C
                        }
                    } = (0, l.CU)(), j = f && x, k = "NewPageHomepage" === C, [w] = (0, Q.U)("(min-width: ".concat(nC.A.l, ")"), {
                        ssr: !0,
                        fallback: !0
                    }), [S] = (0, Q.U)("(min-width: ".concat("1380px", ")"), {
                        ssr: !0,
                        fallback: !0
                    }), [E, F] = (0, R.useState)(void 0), [M, I] = (0, R.useState)(0), [A, L] = (0, R.useState)(0), [_, N] = (0, R.useState)(!1), [H, z] = (0, R.useState)(!1), [V, B] = (0, R.useState)(!1), [$, D] = (0, R.useState)(1), [q, G] = (0, R.useState)(!1), {
                        isOpen: W,
                        onOpen: O,
                        onClose: eo
                    } = (0, X.j)(), er = "main-navigation", es = (0, R.useRef)(null), ec = (0, R.useRef)(null), ed = (0, R.useRef)(null), eu = (0, R.useRef)(null), ex = (0, R.useRef)(null), eb = (0, R.useRef)(null), eC = (0, R.useRef)(null), ej = (0, R.useRef)(null), ek = (0, R.useRef)(null), ew = (0, R.useRef)(null), eT = (0, R.useRef)(null), {
                        scrollY: eP
                    } = (0, ep.L)(), [eR, eM] = (0, Y.r)("sizes", ["liveTickerHeight", "navQuickLinksOffsetTop"]), eI = parseInt(eR, 10), eA = parseInt(eM, 10), eL = (e => {
                        let {
                            headSpaceTop: n,
                            headSpaceBottom: t
                        } = e, [i, l] = (0, R.useState)("auto"), a = (0, R.useCallback)(() => {
                            let e = window.innerHeight - n - t;
                            return "".concat(e, "px")
                        }, [n, t]);
                        return (0, R.useEffect)(() => {
                            let e = () => {
                                l(a())
                            };
                            e();
                            let n = new ResizeObserver(((e, n) => {
                                let t;
                                return () => {
                                    clearTimeout(t), t = window.setTimeout(e, n)
                                }
                            })(e, 100));
                            return n.observe(document.documentElement), () => {
                                n.disconnect()
                            }
                        }, [a]), i
                    })({
                        headSpaceTop: 68,
                        headSpaceBottom: 16
                    }), [e_, eN] = (0, R.useState)(j ? eI + eA : eA), [eH, ez] = (0, R.useState)(j ? eI : 8), [eB, e$] = (0, R.useState)(0);
                    (0, R.useEffect)(() => {
                        ez(j ? eI : 8), eN(j ? eA + eI : eA)
                    }, [j, eI, eA, 8]), (0, eh.L)(eP, "change", e => {
                        let n = parseInt(eR, 10);
                        e > (j ? n : eA) ? (eN(eA), ez(8)) : (eN(j ? eA + n : eA), ez(j ? n : 8)), e$(e < 100 ? -1 * e : -100)
                    });
                    let {
                        shouldShowIndicator: eD,
                        handleScroll: eq
                    } = ((e, n, t) => {
                        let [i, l] = (0, R.useState)(!1), a = (0, R.useCallback)(() => {
                            let n = null == e ? void 0 : e.current;
                            if (!n) return void l(!1);
                            let {
                                scrollHeight: t,
                                clientHeight: i,
                                scrollTop: a
                            } = n;
                            l(t > i && !(a + i >= t - 40))
                        }, [e]);
                        return ev(() => {
                            if (!n || !(null == e ? void 0 : e.current)) return void l(!1);
                            let t = requestAnimationFrame(() => {
                                a()
                            });
                            return () => cancelAnimationFrame(t)
                        }, [e, n, a, t]), (0, R.useEffect)(() => {
                            let t = null == e ? void 0 : e.current;
                            if (!t || !n) return;
                            let i = new ResizeObserver(() => {
                                a()
                            });
                            i.observe(t);
                            let l = new MutationObserver(() => {
                                requestAnimationFrame(() => {
                                    a()
                                })
                            });
                            return l.observe(t, {
                                childList: !0,
                                subtree: !0
                            }), () => {
                                i.disconnect(), l.disconnect()
                            }
                        }, [e, n, a, t]), {
                            shouldShowIndicator: i,
                            handleScroll: a
                        }
                    })((() => {
                        if (w) return eC;
                        switch (E) {
                            case nB.series:
                                return ej;
                            case nB.cars:
                                return ek;
                            case nB.teams:
                                return ew;
                            case nB.events:
                                return eT;
                            default:
                                return null
                        }
                    })(), H), eG = e => {
                        F(null != e ? e : -1), w ? (N(!0), z(!0)) : (N(void 0 === e), z(void 0 !== e)), O()
                    }, eW = (0, R.useCallback)(() => {
                        N(!1), z(!1), eo()
                    }, [eo]), eU = () => {
                        w || (N(!1), z(!0))
                    }, eK = () => {
                        w || (F(-1), N(!0), z(!1))
                    };
                    ((e, n) => {
                        (0, R.useEffect)(() => {
                            let t = t => {
                                let i = e.filter(e => e.current);
                                i.length > 0 && i.every(e => !e.current.contains(t.target)) && n()
                            };
                            return document.addEventListener("mousedown", t), () => {
                                document.removeEventListener("mousedown", t)
                            }
                        }, [e, n])
                    })([es, ec, ed, eu, ex, eb], eW), (0, R.useEffect)(() => {
                        let e = e => {
                            "Escape" === e.key && W && eW()
                        };
                        return document.addEventListener("keydown", e), () => {
                            document.removeEventListener("keydown", e)
                        }
                    }, [W, eW]), (0, R.useEffect)(() => {
                        W && eW()
                    }, [w, S]), (0, R.useEffect)(() => {
                        if (W && !q) {
                            D(0);
                            let e = window.setTimeout(() => D(1), 50);
                            return () => window.clearTimeout(e)
                        }
                        D(1)
                    }, [W, q]);
                    let eO = n_;
                    return q ? eO = "Close language selector" : W && (eO = nL), (0, i.jsxs)(K.a, {
                        as: "header",
                        children: [(0, i.jsx)(eg.N, {
                            children: W && (0, i.jsx)(ey.z, {
                                variants: n$,
                                initial: "navigationCollapsed",
                                animate: "navigationExpanded",
                                exit: "navigationCollapsed"
                            })
                        }), y && x && (0, i.jsx)(nE, {
                            mainNavigationId: y
                        }), (0, i.jsx)(eF.Ay, {
                            disabled: !W,
                            children: (0, i.jsx)(eE.A, {
                                enabled: W,
                                forwardProps: !0,
                                children: (0, i.jsxs)("nav", {
                                    "aria-label": "Main navigation",
                                    "data-lenis-prevent": !0,
                                    children: [(0, i.jsx)(K.a, {
                                        ref: eb,
                                        position: W || q ? "fixed" : "absolute",
                                        zIndex: q ? "popover" : "modal",
                                        top: j ? "calc(var(--sizes-liveTickerHeight) + var(--space-4))" : 4,
                                        left: 5,
                                        display: {
                                            base: "inline-block",
                                            l: "none"
                                        },
                                        children: (0, i.jsx)(eS, {
                                            className: "logo-mobile",
                                            transitionTimingFunction: "var(--transition-property-common)",
                                            transitionDuration: "var(--transition-duration-moderate)",
                                            transform: (W || q) && j ? "translateY(-36px)" : "none",
                                            opacity: $,
                                            onClick: eW,
                                            forceLogoColorWhite: W || q
                                        })
                                    }), a && (!W || q) && (0, i.jsx)(K.a, {
                                        display: {
                                            base: "flex",
                                            l: "none"
                                        },
                                        position: "fixed",
                                        zIndex: q ? "popover" : "modal",
                                        top: 2,
                                        transitionTimingFunction: "transform",
                                        transitionDuration: "var(--transition-duration-moderate)",
                                        transform: {
                                            base: "translateY(".concat(eH, "px)"),
                                            l: "none"
                                        },
                                        right: k ? "calc(var(--space-5) + 36px + var(--space-2))" : 5,
                                        children: (0, i.jsx)(e1, {
                                            highlightLink: a,
                                            hideExternalIcon: !0
                                        })
                                    }), (0, i.jsx)(eg.N, {
                                        initial: !1,
                                        children: W && (0, i.jsxs)(Z.e, {
                                            position: "fixed",
                                            zIndex: "popover",
                                            top: 4,
                                            right: k ? "calc(var(--space-5) + 36px + var(--space-2))" : "var(--space-5)",
                                            display: {
                                                base: "flex",
                                                l: "none"
                                            },
                                            alignItems: "center",
                                            gap: 2,
                                            variants: nD,
                                            initial: "navigationCollapsed",
                                            animate: "navigationExpanded",
                                            exit: "navigationCollapsed",
                                            children: [(null == o ? void 0 : o.items) && (0, i.jsx)(K.a, {
                                                ref: ed,
                                                children: (0, i.jsx)(eV, {
                                                    items: o.items,
                                                    onClose: eW,
                                                    controlledOpen: q,
                                                    onOpenChange: G,
                                                    hideCloseButton: k,
                                                    clickOutsideExcludeRefs: [ex],
                                                    id: "language-selector-mobile",
                                                    searchPlaceholder: b,
                                                    languageSelectorErrorLabel: v
                                                })
                                            }), !k && !q && (0, i.jsx)(eg.N, {
                                                children: (0, i.jsx)(J.$, {
                                                    "aria-controls": er,
                                                    icon: "close",
                                                    hideLabel: !0,
                                                    "aria-label": nL,
                                                    variant: "ghost",
                                                    theme: "dark",
                                                    compact: !0,
                                                    onClick: eW
                                                })
                                            })]
                                        })
                                    }), k && (0, i.jsx)(K.a, {
                                        ref: ex,
                                        position: "fixed",
                                        zIndex: W || q ? "tooltip" : "modal",
                                        top: 2,
                                        right: 5,
                                        display: {
                                            base: "flex",
                                            l: "none"
                                        },
                                        borderRadius: "medium",
                                        backgroundColor: "porscheBlackShaded",
                                        backdropFilter: em.B.backdropFilter,
                                        transitionProperty: "transform",
                                        transitionDuration: "var(--transition-duration-moderate)",
                                        transitionTimingFunction: "ease",
                                        transform: "translateY(".concat(W || q ? 8 : eH, "px)"),
                                        children: (0, i.jsx)(ny, {
                                            isOpen: W || q,
                                            ariaLabel: eO,
                                            ariaControlsId: er,
                                            onClick: () => {
                                                q ? G(!1) : W ? eW() : eG(void 0)
                                            }
                                        })
                                    }), (0, i.jsx)(K.a, {
                                        position: "fixed",
                                        zIndex: "modal",
                                        width: "full",
                                        top: {
                                            base: k ? "68px" : "auto",
                                            l: 0
                                        },
                                        bottom: {
                                            base: k ? "auto" : 4,
                                            l: "auto"
                                        },
                                        pointerEvents: {
                                            base: !k || W ? "auto" : "none",
                                            l: "auto"
                                        },
                                        transitionTimingFunction: "transform",
                                        transitionDuration: "var(--transition-duration-moderate)",
                                        transform: {
                                            base: "none",
                                            l: "translateY(".concat(e_, "px)")
                                        },
                                        sx: k ? {
                                            [ee.Bl.l]: {
                                                visibility: W ? "visible" : "hidden",
                                                transition: W ? "none" : "visibility 0s linear 0.3s"
                                            }
                                        } : void 0,
                                        children: (0, i.jsxs)(ea.H, {
                                            position: "relative",
                                            as: T.x,
                                            gridTemplateColumns: {
                                                base: "repeat(2, 1fr)",
                                                l: "repeat(12, 1fr)"
                                            },
                                            gap: 0,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            children: [(0, i.jsx)(P.E, {
                                                as: en.s,
                                                display: {
                                                    base: "none",
                                                    l: "flex"
                                                },
                                                alignSelf: "start",
                                                align: "center",
                                                height: "navQuickLinksHeight",
                                                ref: es,
                                                transform: {
                                                    base: "none",
                                                    l: "translateY(".concat(eB, "px)")
                                                },
                                                children: (0, i.jsx)(eS, {
                                                    className: "logo-desktop",
                                                    display: {
                                                        base: "none",
                                                        l: "block"
                                                    },
                                                    onClick: eW,
                                                    forceLogoColorWhite: W
                                                })
                                            }), (0, i.jsx)(P.E, {
                                                as: en.s,
                                                justifyContent: "center",
                                                colSpan: {
                                                    base: 2,
                                                    l: 8
                                                },
                                                colStart: {
                                                    base: 0,
                                                    l: 3
                                                },
                                                children: (0, i.jsx)(Z.e, {
                                                    variants: ((e, n) => {
                                                        let t, i;
                                                        return {
                                                            navigationCollapsed: {
                                                                width: e ? "auto" : "100%",
                                                                transition: { ...nz
                                                                }
                                                            },
                                                            navigationExpanded: {
                                                                width: (t = e, i = n, t ? i ? "896px" : "90%" : "100%"),
                                                                transition: { ...nH
                                                                }
                                                            }
                                                        }
                                                    })(w, S),
                                                    willChange: "width,height",
                                                    minWidth: {
                                                        base: "100%",
                                                        l: "auto"
                                                    },
                                                    animate: W ? "navigationExpanded" : "navigationCollapsed",
                                                    sx: {
                                                        contentVisibility: "auto"
                                                    },
                                                    children: (0, i.jsxs)(Z.e, {
                                                        id: er,
                                                        overflow: "hidden",
                                                        position: "relative",
                                                        display: "flex",
                                                        color: "allWhite",
                                                        backdropFilter: em.B.backdropFilter,
                                                        backgroundColor: "porscheBlackShaded",
                                                        minHeight: "navQuickLinksHeight",
                                                        borderRadius: "medium",
                                                        variants: ((e, n, t) => ({
                                                            navigationCollapsed: {
                                                                height: "var(--sizes-navQuickLinksHeight)",
                                                                opacity: e || !t ? 1 : 0,
                                                                transition: { ...nz
                                                                }
                                                            },
                                                            navigationExpanded: {
                                                                height: e ? "640px" : n,
                                                                opacity: 1,
                                                                transition: { ...nH
                                                                }
                                                            }
                                                        }))(w, eL, k),
                                                        willChange: "width,height",
                                                        initial: "navigationCollapsed",
                                                        sx: {
                                                            contentVisibility: "auto"
                                                        },
                                                        animate: W ? "navigationExpanded" : "navigationCollapsed",
                                                        children: [(0, i.jsx)(eg.N, {
                                                            initial: !1,
                                                            children: !W && (0, i.jsxs)(nS, {
                                                                layout: !0,
                                                                variants: nG,
                                                                initial: "quickLinksHidden",
                                                                animate: "quickLinksVisible",
                                                                exit: "quickLinksHidden",
                                                                display: {
                                                                    base: k ? "none" : "flex",
                                                                    l: "flex"
                                                                },
                                                                position: {
                                                                    base: "absolute",
                                                                    l: "relative"
                                                                },
                                                                top: {
                                                                    base: "auto",
                                                                    l: 0
                                                                },
                                                                bottom: {
                                                                    base: 0,
                                                                    l: "auto"
                                                                },
                                                                left: 0,
                                                                listStyleType: "none",
                                                                children: [(0, i.jsx)(nZ, {
                                                                    children: c && (0, i.jsx)(e3, {
                                                                        "aria-expanded": W,
                                                                        "aria-controls": er,
                                                                        onClick: () => eG(nB.series),
                                                                        children: c
                                                                    })
                                                                }), (0, i.jsx)(nZ, {
                                                                    children: u && (0, i.jsx)(e3, {
                                                                        "aria-expanded": W,
                                                                        "aria-controls": er,
                                                                        onClick: () => eG(nB.cars),
                                                                        children: u
                                                                    })
                                                                }), (0, i.jsx)(nZ, {
                                                                    children: h && (0, i.jsx)(e3, {
                                                                        "aria-expanded": W,
                                                                        "aria-controls": er,
                                                                        onClick: () => eG(nB.teams),
                                                                        children: h
                                                                    })
                                                                }), (0, i.jsx)(nZ, {
                                                                    children: m && (0, i.jsx)(e3, {
                                                                        "aria-expanded": W,
                                                                        "aria-controls": er,
                                                                        onClick: () => eG(nB.events),
                                                                        children: m
                                                                    })
                                                                }), (0, i.jsx)(nZ, {
                                                                    children: r && (0, i.jsx)(e6, {
                                                                        item: r,
                                                                        display: {
                                                                            base: "none",
                                                                            l: "block"
                                                                        },
                                                                        children: null != (n = r.linkTitle) ? n : r.title
                                                                    })
                                                                }), (0, i.jsx)(nZ, {
                                                                    sx: {
                                                                        display: "flex",
                                                                        [ee.JM.l]: {
                                                                            display: "none"
                                                                        }
                                                                    },
                                                                    children: (0, i.jsx)(et.d, {
                                                                        icon: "menu-lines",
                                                                        "aria-hidden": "false",
                                                                        theme: "dark",
                                                                        "aria-expanded": W,
                                                                        "aria-controls": er,
                                                                        onClick: () => eG(void 0),
                                                                        hideLabel: !0,
                                                                        children: n_
                                                                    })
                                                                })]
                                                            })
                                                        }), (0, i.jsx)(Z.e, {
                                                            as: "section",
                                                            "aria-label": "Main navigation menu",
                                                            className: "inner-content",
                                                            position: "absolute",
                                                            width: "100%",
                                                            height: {
                                                                base: eL,
                                                                l: "640px"
                                                            },
                                                            willChange: "height, width",
                                                            top: {
                                                                base: k ? 0 : "auto",
                                                                l: 0
                                                            },
                                                            bottom: {
                                                                base: k ? "auto" : 0,
                                                                l: "auto"
                                                            },
                                                            left: "50%",
                                                            transform: "translateX(-50%)",
                                                            transformOrigin: "center top",
                                                            zIndex: 1,
                                                            sx: {
                                                                contentVisibility: "auto"
                                                            },
                                                            variants: nq,
                                                            onAnimationComplete: e => {
                                                                B("navigationExpanded" === e), "navigationCollapsed" === e && F(void 0)
                                                            },
                                                            inert: W ? void 0 : "",
                                                            children: (0, i.jsx)(K.a, {
                                                                ref: ec,
                                                                position: "relative",
                                                                width: "100%",
                                                                height: "100%",
                                                                children: (0, i.jsxs)(U.tU, {
                                                                    index: E,
                                                                    onChange: e => {
                                                                        I(0), L(0), F(e)
                                                                    },
                                                                    height: "100%",
                                                                    display: "flex",
                                                                    isManual: !0,
                                                                    children: [(0, i.jsxs)(T.x, {
                                                                        templateColumns: {
                                                                            base: "repeat(2, 1fr)",
                                                                            l: "repeat(3, 1fr)"
                                                                        },
                                                                        gap: 6,
                                                                        flex: 1,
                                                                        marginRight: {
                                                                            base: 0,
                                                                            l: 1
                                                                        },
                                                                        children: [(0, i.jsx)(nR, {
                                                                            layout: !0,
                                                                            className: "tab-list",
                                                                            colSpan: {
                                                                                base: 2,
                                                                                l: 1
                                                                            },
                                                                            as: U.wb,
                                                                            flexDirection: "column",
                                                                            alignItems: "start",
                                                                            px: 6,
                                                                            py: 6,
                                                                            position: {
                                                                                base: "absolute",
                                                                                l: "static"
                                                                            },
                                                                            height: {
                                                                                base: "100%",
                                                                                l: "auto"
                                                                            },
                                                                            overflowY: "auto",
                                                                            sx: {
                                                                                scrollbarWidth: "none",
                                                                                "&::webkit-scrollbar": {
                                                                                    display: "none"
                                                                                }
                                                                            },
                                                                            pointerEvents: _ ? "auto" : "none",
                                                                            variants: nW,
                                                                            initial: "tabListHiddenWithY",
                                                                            animate: _ ? "tabListVisible" : "tabListHidden",
                                                                            custom: {
                                                                                delayChildren: !V
                                                                            },
                                                                            children: (0, i.jsxs)(ei.T, {
                                                                                align: "start",
                                                                                width: "100%",
                                                                                gap: 2,
                                                                                children: [(0, i.jsx)(nP, {
                                                                                    variants: nU,
                                                                                    onClick: eU,
                                                                                    highlight: E === nB.series,
                                                                                    children: c
                                                                                }), (0, i.jsx)(nP, {
                                                                                    variants: nU,
                                                                                    onClick: eU,
                                                                                    highlight: E === nB.cars,
                                                                                    children: u
                                                                                }), (0, i.jsx)(nP, {
                                                                                    variants: nU,
                                                                                    onClick: eU,
                                                                                    highlight: E === nB.teams,
                                                                                    children: h
                                                                                }), (0, i.jsx)(nP, {
                                                                                    variants: nU,
                                                                                    onClick: eU,
                                                                                    highlight: E === nB.events,
                                                                                    children: m
                                                                                }), (null == r ? void 0 : r.__typename) && r.sys.id && (0, i.jsx)(nA, {
                                                                                    onFocus: e => {
                                                                                        let n = e.target.querySelector("a");
                                                                                        n && n.focus()
                                                                                    },
                                                                                    children: (0, i.jsx)(nF, {
                                                                                        entryId: r.sys.id,
                                                                                        entryTypename: r.__typename,
                                                                                        href: (0, e7.s6)(r),
                                                                                        onClick: eW,
                                                                                        variants: nU,
                                                                                        tabIndex: -1,
                                                                                        children: null != (t = r.linkTitle) ? t : r.title
                                                                                    })
                                                                                })]
                                                                            })
                                                                        }, "tab-list-".concat(W, "-").concat(_)), (0, i.jsxs)(nR, {
                                                                            ref: eC,
                                                                            onScroll: eq,
                                                                            layout: !0,
                                                                            className: "tab-panels",
                                                                            colSpan: 2,
                                                                            as: U.T2,
                                                                            position: {
                                                                                base: "absolute",
                                                                                l: "static"
                                                                            },
                                                                            height: {
                                                                                base: "100%",
                                                                                l: "auto"
                                                                            },
                                                                            overflowY: "scroll",
                                                                            overscrollBehavior: "contain",
                                                                            paddingRight: {
                                                                                base: 0,
                                                                                l: 14
                                                                            },
                                                                            sx: {
                                                                                scrollbarGutter: "stable",
                                                                                "&::-webkit-scrollbar": {
                                                                                    display: {
                                                                                        base: "none",
                                                                                        l: "block"
                                                                                    },
                                                                                    width: {
                                                                                        base: 0,
                                                                                        l: 1
                                                                                    },
                                                                                    height: {
                                                                                        base: 0,
                                                                                        l: 10
                                                                                    },
                                                                                    backgroundColor: "transparent"
                                                                                },
                                                                                "&::-webkit-scrollbar-thumb": {
                                                                                    backgroundColor: "rgba(255,255,255,0.25)",
                                                                                    borderRadius: 4
                                                                                }
                                                                            },
                                                                            pointerEvents: H ? "auto" : "none",
                                                                            variants: nK,
                                                                            initial: "tabPanelsHidden",
                                                                            animate: H ? "tabPanelsVisible" : "tabPanelsHidden",
                                                                            children: [(0, i.jsxs)(nw, {
                                                                                variants: nO,
                                                                                initial: "tabPanelHidden",
                                                                                animate: E === nB.series ? "tabPanelVisible" : "tabPanelHidden",
                                                                                custom: {
                                                                                    delay: !V,
                                                                                    isAboveLarge: w
                                                                                },
                                                                                children: [(0, i.jsx)(nj, {
                                                                                    onClick: eK,
                                                                                    children: c
                                                                                }), (0, i.jsx)(nY, {
                                                                                    ref: ej,
                                                                                    onScroll: eq,
                                                                                    children: (0, i.jsx)(na, {
                                                                                        index: M,
                                                                                        onChange: e => I(e),
                                                                                        children: null == s ? void 0 : s.items.map((e, n) => (0, i.jsx)(ni, {
                                                                                            children: n => {
                                                                                                var t;
                                                                                                let {
                                                                                                    isExpanded: l
                                                                                                } = n;
                                                                                                return (0, i.jsxs)(i.Fragment, {
                                                                                                    children: [(0, i.jsx)(nt, {
                                                                                                        isExpanded: l,
                                                                                                        children: null == e ? void 0 : e.title
                                                                                                    }), (0, i.jsx)(nl, {
                                                                                                        children: (0, i.jsx)(nI, {
                                                                                                            initial: "hidden",
                                                                                                            animate: E === nB.series && l ? "visible" : "hidden",
                                                                                                            variants: nQ,
                                                                                                            custom: {
                                                                                                                delayChildren: !V,
                                                                                                                isAboveLarge: w
                                                                                                            },
                                                                                                            children: null == e || null == (t = e.itemsCollection) ? void 0 : t.items.map((e, n) => {
                                                                                                                var t;
                                                                                                                return e && (0, i.jsx)(nM, {
                                                                                                                    variants: nX,
                                                                                                                    children: (0, i.jsx)(nr, { ...e,
                                                                                                                        onClick: eW,
                                                                                                                        children: e.image ? (0, i.jsx)(nx, {
                                                                                                                            wrapperProps: {
                                                                                                                                backgroundColor: "rgba(255,255,255,0.1)",
                                                                                                                                display: "flex",
                                                                                                                                alignItems: "center"
                                                                                                                            },
                                                                                                                            cloudinaryAsset: e.image,
                                                                                                                            gravity: "center",
                                                                                                                            motionWrapperProps: {
                                                                                                                                maxHeight: "60%"
                                                                                                                            }
                                                                                                                        }) : (0, i.jsx)(nu, {
                                                                                                                            theme: e.theme,
                                                                                                                            children: String(null != (t = e.animatedLabel) ? t : e.label)
                                                                                                                        })
                                                                                                                    })
                                                                                                                }, "".concat(null == e ? void 0 : e.sys.id, "-").concat(n))
                                                                                                            })
                                                                                                        })
                                                                                                    })]
                                                                                                })
                                                                                            }
                                                                                        }, "".concat(null == e ? void 0 : e.sys.id, "-").concat(n)))
                                                                                    })
                                                                                })]
                                                                            }, "tab-panel-series"), (0, i.jsxs)(nw, {
                                                                                variants: nO,
                                                                                initial: "tabPanelHidden",
                                                                                animate: E === nB.cars ? "tabPanelVisible" : "tabPanelHidden",
                                                                                custom: {
                                                                                    delay: !V,
                                                                                    isAboveLarge: w
                                                                                },
                                                                                children: [(0, i.jsx)(nj, {
                                                                                    onClick: eK,
                                                                                    children: u
                                                                                }), (0, i.jsx)(nY, {
                                                                                    ref: ek,
                                                                                    onScroll: eq,
                                                                                    children: (0, i.jsx)(nI, {
                                                                                        initial: "hidden",
                                                                                        animate: E === nB.cars ? "visible" : "hidden",
                                                                                        variants: nQ,
                                                                                        custom: {
                                                                                            delayChildren: !V,
                                                                                            isAboveLarge: w
                                                                                        },
                                                                                        children: null == d ? void 0 : d.items.map((e, n) => e && (0, i.jsx)(nM, {
                                                                                            variants: nX,
                                                                                            children: (0, i.jsx)(nr, { ...e,
                                                                                                onClick: eW,
                                                                                                children: (0, i.jsx)(nx, {
                                                                                                    cloudinaryAsset: e.image,
                                                                                                    gravity: "center"
                                                                                                })
                                                                                            })
                                                                                        }, "".concat(null == e ? void 0 : e.sys.id, "-").concat(n)))
                                                                                    })
                                                                                })]
                                                                            }, "tab-panel-cars"), (0, i.jsxs)(nw, {
                                                                                variants: nO,
                                                                                initial: "tabPanelHidden",
                                                                                animate: E === nB.teams ? "tabPanelVisible" : "tabPanelHidden",
                                                                                custom: {
                                                                                    delay: !V,
                                                                                    isAboveLarge: w
                                                                                },
                                                                                children: [(0, i.jsx)(nj, {
                                                                                    onClick: eK,
                                                                                    children: h
                                                                                }), (0, i.jsx)(nY, {
                                                                                    ref: ew,
                                                                                    onScroll: eq,
                                                                                    children: (0, i.jsx)(nI, {
                                                                                        initial: "visible",
                                                                                        animate: E === nB.teams ? "visible" : "hidden",
                                                                                        variants: nQ,
                                                                                        custom: {
                                                                                            delayChildren: !V,
                                                                                            isAboveLarge: w
                                                                                        },
                                                                                        children: null == p ? void 0 : p.items.map((e, n) => e && (0, i.jsx)(nM, {
                                                                                            variants: nX,
                                                                                            children: (0, i.jsx)(nr, { ...e,
                                                                                                onClick: eW,
                                                                                                children: (0, i.jsx)(nx, {
                                                                                                    wrapperProps: {
                                                                                                        backgroundColor: "rgba(255,255,255,0.1)",
                                                                                                        display: "flex",
                                                                                                        alignItems: "center"
                                                                                                    },
                                                                                                    cloudinaryAsset: e.image,
                                                                                                    gravity: "center",
                                                                                                    motionWrapperProps: {
                                                                                                        maxHeight: "60%"
                                                                                                    }
                                                                                                })
                                                                                            })
                                                                                        }, "".concat(null == e ? void 0 : e.sys.id, "-").concat(n)))
                                                                                    })
                                                                                })]
                                                                            }, "tab-panel-teams"), (0, i.jsxs)(nw, {
                                                                                variants: nO,
                                                                                initial: "tabPanelHidden",
                                                                                animate: E === nB.events ? "tabPanelVisible" : "tabPanelHidden",
                                                                                custom: {
                                                                                    delay: !V,
                                                                                    isAboveLarge: w
                                                                                },
                                                                                children: [(0, i.jsx)(nj, {
                                                                                    onClick: eK,
                                                                                    children: m
                                                                                }), (0, i.jsx)(nY, {
                                                                                    ref: eT,
                                                                                    onScroll: eq,
                                                                                    children: (0, i.jsx)(na, {
                                                                                        index: A,
                                                                                        onChange: e => L(e),
                                                                                        children: null == g ? void 0 : g.items.map((e, n) => (0, i.jsx)(ni, {
                                                                                            children: n => {
                                                                                                var t;
                                                                                                let {
                                                                                                    isExpanded: l
                                                                                                } = n;
                                                                                                return (0, i.jsxs)(i.Fragment, {
                                                                                                    children: [(0, i.jsx)(nt, {
                                                                                                        isExpanded: l,
                                                                                                        children: null == e ? void 0 : e.title
                                                                                                    }), (0, i.jsx)(nl, {
                                                                                                        children: (0, i.jsx)(nI, {
                                                                                                            initial: "hidden",
                                                                                                            animate: E === nB.events && l ? "visible" : "hidden",
                                                                                                            variants: nQ,
                                                                                                            custom: {
                                                                                                                delayChildren: !V,
                                                                                                                isAboveLarge: w
                                                                                                            },
                                                                                                            children: null == e || null == (t = e.itemsCollection) ? void 0 : t.items.map((e, n) => e && (0, i.jsx)(nM, {
                                                                                                                variants: nX,
                                                                                                                children: (0, i.jsx)(nr, { ...e,
                                                                                                                    onClick: eW,
                                                                                                                    children: (0, i.jsx)(nx, {
                                                                                                                        cloudinaryAsset: e.image,
                                                                                                                        objectFit: "cover"
                                                                                                                    })
                                                                                                                })
                                                                                                            }, "".concat(null == e ? void 0 : e.sys.id, "-").concat(n)))
                                                                                                        })
                                                                                                    })]
                                                                                                })
                                                                                            }
                                                                                        }, "".concat(null == e ? void 0 : e.sys.id, "-").concat(n)))
                                                                                    })
                                                                                })]
                                                                            }, "tab-panel-events"), (0, i.jsx)(ef, {
                                                                                show: eD
                                                                            })]
                                                                        }, "tab-panels")]
                                                                    }), (0, i.jsx)(eg.N, {
                                                                        children: W && (0, i.jsx)(Z.e, {
                                                                            className: "close-button",
                                                                            position: "absolute",
                                                                            top: 4,
                                                                            right: 4,
                                                                            sx: {
                                                                                display: "none",
                                                                                [ee.JM.l]: {
                                                                                    display: "flex"
                                                                                }
                                                                            },
                                                                            children: (0, i.jsx)(J.$, {
                                                                                "aria-controls": er,
                                                                                onClick: eW,
                                                                                icon: "close",
                                                                                hideLabel: !0,
                                                                                "aria-label": nL,
                                                                                variant: "ghost",
                                                                                theme: "dark",
                                                                                compact: !0
                                                                            })
                                                                        })
                                                                    })]
                                                                })
                                                            })
                                                        })]
                                                    })
                                                })
                                            }), (0, i.jsxs)(P.E, {
                                                as: el.z,
                                                justifyContent: "end",
                                                gap: 3,
                                                position: "absolute",
                                                right: 10,
                                                top: 0,
                                                display: {
                                                    base: "none",
                                                    l: "flex"
                                                },
                                                flexDirection: "row-reverse",
                                                children: [a && (0, i.jsx)(e1, {
                                                    highlightLink: a,
                                                    hideExternalIcon: !0
                                                }), (null == o ? void 0 : o.items) && (0, i.jsx)(K.a, {
                                                    ref: eu,
                                                    children: (0, i.jsx)(eV, {
                                                        items: o.items,
                                                        onClose: eW,
                                                        id: "language-selector-desktop",
                                                        searchPlaceholder: b,
                                                        languageSelectorErrorLabel: v
                                                    })
                                                })]
                                            })]
                                        })
                                    })]
                                })
                            })
                        })]
                    })
                },
                n0 = e => {
                    let {
                        id: n,
                        locale: t,
                        preview: l
                    } = e, {
                        data: a,
                        isLoading: o
                    } = q({
                        id: n,
                        locale: t,
                        preview: l
                    }, { ...!l && {
                            staleTime: 1 / 0
                        },
                        refetchOnWindowFocus: !1
                    }), r = (0, w.qM)(null == a ? void 0 : a.mainNavigation, {
                        locale: t
                    });
                    return o || !r ? null : (0, i.jsx)(nJ, { ...r
                    })
                };
            var n1 = t(50127),
                n2 = t(15808),
                n5 = t(76968);
            let n4 = () => {
                    let {
                        state: {
                            siteSettingsId: e
                        }
                    } = (0, l.CU)(), {
                        get: n
                    } = (0, n5.hu)(), {
                        locale: t,
                        isPreview: a
                    } = (0, V.useRouter)(), [o, r] = (0, R.useState)(!1), {
                        data: s
                    } = (0, n2.q$)({
                        id: e,
                        locale: t,
                        preview: a
                    }, { ...!a && {
                            staleTime: 1 / 0
                        }
                    });
                    return (0, R.useEffect)(() => {
                        document.referrer.includes("https://www.porsche.") && r(!0)
                    }, []), (null == s ? void 0 : s.siteSettings) && o ? (0, i.jsx)(n1.l, {
                        link: {
                            __typename: "ExternalLink",
                            url: document.referrer,
                            sys: {
                                id: ""
                            }
                        },
                        mediaAsset: s.siteSettings.porscheVisitorBanner,
                        title: n("global", "text.porscheVisitorBannerTitle"),
                        linkLabel: n("global", "label.porscheVisitorBannerLabel"),
                        containerProps: {
                            height: {
                                base: 500,
                                l: 450
                            }
                        }
                    }) : null
                },
                n3 = e => {
                    var n;
                    let {
                        partnersCollection: t,
                        sys: a
                    } = e, {
                        locale: o
                    } = (0, V.useRouter)(), {
                        state: {
                            pageType: r,
                            pageId: s,
                            pageContentTags: c
                        }
                    } = (0, l.CU)(), d = (0, w.wi)({
                        entryId: a.id
                    });
                    return (0, i.jsx)(I.R, {
                        bg: "porscheBlack",
                        color: "allWhite",
                        py: {
                            base: 10,
                            s: 10
                        },
                        children: (0, i.jsx)(T.x, { ...d({
                                fieldId: "partners",
                                locale: o
                            }),
                            bg: "porscheBlack",
                            templateColumns: {
                                base: "repeat(4, 1fr)",
                                s: "repeat(6, 1fr)",
                                l: "repeat(9, 1fr)"
                            },
                            gap: {
                                base: 5,
                                l: 8
                            },
                            pb: {
                                base: 10,
                                md: 10
                            },
                            borderBottomWidth: "1px",
                            borderColor: "grey500",
                            children: null == t || null == (n = t.items) ? void 0 : n.map(e => (0, i.jsx)(P.E, {
                                children: (null == e ? void 0 : e.logo) && (0, i.jsx)("a", {
                                    href: e.url,
                                    target: "_blank",
                                    onClick: n => ((e, n) => {
                                        var t;
                                        ew({
                                            locale: o,
                                            pageExperience: {
                                                pageCategory: r,
                                                contentTags: null != c ? c : []
                                            },
                                            componentClick: {
                                                clickElementType: "navigation",
                                                clickElementId: s,
                                                clickElementName: n,
                                                targetUrl: null != (t = e.currentTarget.getAttribute("href")) ? t : "",
                                                targetType: "outbound"
                                            }
                                        })
                                    })(n, e.name),
                                    children: (0, i.jsx)(eK.g, {
                                        ratio: "16:9",
                                        transition: "opacity 0.25s ease",
                                        _hover: {
                                            opacity: .7
                                        },
                                        children: (0, i.jsx)(nm.d, {
                                            cloudinaryAsset: e.logo,
                                            sizes: ["20vw", "16vw", "9vw"],
                                            objectFit: "contain",
                                            alt: "Logo for partner: ".concat(e.name)
                                        })
                                    })
                                })
                            }, null == e ? void 0 : e.sys.id))
                        })
                    })
                },
                n6 = e => {
                    let {
                        id: n,
                        locale: t,
                        preview: l
                    } = e, {
                        data: a,
                        isLoading: r
                    } = (0, o.u3)({
                        id: n,
                        locale: t,
                        preview: l
                    }, { ...!l && {
                            staleTime: 1 / 0
                        },
                        refetchOnWindowFocus: !1
                    }), s = (0, w.qM)(null == a ? void 0 : a.partnerSet, {
                        locale: t
                    });
                    return r || !s ? null : (0, i.jsx)(n3, { ...s
                    })
                },
                n7 = e => {
                    let {
                        children: n
                    } = e, {
                        state: {
                            footerId: t,
                            mainNavigationId: a,
                            partnerSetId: o
                        }
                    } = (0, l.CU)(), {
                        locale: r,
                        isPreview: s
                    } = (0, V.useRouter)();
                    return (0, i.jsxs)(i.Fragment, {
                        children: [a && (0, i.jsx)(n0, {
                            id: a,
                            locale: r,
                            preview: !!s
                        }), (0, i.jsxs)("main", {
                            children: [n, (0, i.jsxs)("section", {
                                children: [(0, i.jsx)(n4, {}), o && (0, i.jsx)(n6, {
                                    id: o,
                                    locale: r,
                                    preview: !!s
                                })]
                            }), t && (0, i.jsx)(z, {
                                id: t,
                                locale: r,
                                preview: !!s
                            })]
                        })]
                    })
                }
        },
        59109: (e, n, t) => {
            t.d(n, {
                F: () => i,
                c: () => l
            });
            let i = "\n    fragment PartCarDetailItemFields on PartCarDetailsItem {\n  ...ComponentReferenceFields\n  title\n  subtitle\n  description\n  asset\n  positionRight\n  positionTop\n}\n    ",
                l = "\n    fragment CarFields on Car {\n  ...ComponentReferenceFields\n  name\n  description\n  asset\n  driveline\n  displacement\n  power\n  transmission\n  engine\n  weight\n  topSpeed\n  factSheetPdf {\n    url\n  }\n}\n    "
        },
        59255: (e, n, t) => {
            t.d(n, {
                Vq: () => u,
                pQ: () => c
            });
            var i = t(40157),
                l = t(17497),
                a = t(46169),
                o = t(3082),
                r = t(12482),
                s = t(54513);
            let c = "\n    fragment ModuleTitleAndDescriptionFields on ModuleTitleAndDescription {\n  ...ComponentReferenceFields\n  title\n  description\n  widget {\n    ...ComponentReferenceFields\n    ... on ModuleAudioPlayer {\n      ...ModuleAudioPlayerFields\n    }\n    ... on Module916VideoImage {\n      ...Module916VideoImageFields\n    }\n  }\n  linkLabel\n  link {\n    ...ComponentReferenceFields\n    ... on ExternalLink {\n      ...ExternalLinkFields\n    }\n    ... on PageArticle {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageBasic {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageCar {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageCategory {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      mainCategory\n    }\n    ... on PageDriver {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n    ... on PageRaceEvent {\n      ...ComponentReferenceFields\n      title\n      subtitle\n      slug\n    }\n    ... on PageTeam {\n      ...ComponentReferenceFields\n      title\n      linkTitle\n      slug\n    }\n  }\n}\n    ",
                d = "\n    query ModuleTitleAndDescription($locale: String!, $preview: Boolean!, $id: String!) {\n  moduleTitleAndDescription(id: $id, locale: $locale, preview: $preview) {\n    ...ModuleTitleAndDescriptionFields\n  }\n}\n    ".concat(c, "\n").concat(i.o, "\n").concat(l.NE, "\n").concat(a.QR, "\n").concat(o.ng),
                u = (e, n) => (0, r.I)({
                    queryKey: ["ModuleTitleAndDescription", e],
                    queryFn: (0, s.x8)(d, e),
                    ...n
                });
            u.getKey = e => ["ModuleTitleAndDescription", e], u.fetcher = (e, n) => (0, s.x8)(d, e, n)
        },
        61436: (e, n, t) => {
            t.d(n, {
                T: () => c,
                g: () => p
            });
            var i = t(6029),
                l = t(55729),
                a = t(77367),
                o = t(35882),
                r = t(17341),
                s = t(193);
            let c = {
                    ratio: "4:3"
                },
                {
                    ratio: d,
                    ...u
                } = c,
                p = (0, a.R)((e, n) => {
                    let t = (0, r.D)(),
                        a = (0, l.useMemo)(() => {
                            if (null === e.ratio) return c.ratio;
                            if (Array.isArray(e.ratio)) {
                                let n = e.ratio.map(() => c.ratio);
                                return (0, s.N)("aspectRatios", e.ratio, n)(t)
                            }
                            if ("object" == typeof e.ratio) {
                                let n = Object.values(e.ratio),
                                    i = n.map(() => c.ratio);
                                return (0, s.N)("aspectRatios", n, i)(t)
                            }
                            return (0, s.N)("aspectRatios", e.ratio, c.ratio)(t)
                        }, [e.ratio, t]),
                        {
                            ratio: d,
                            children: p,
                            overflow: h,
                            ...g
                        } = e;
                    return (0, i.jsx)(o.B.div, {
                        ref: n,
                        ...u,
                        ...g,
                        __css: {
                            position: "relative",
                            aspectRatio: a,
                            "& > *:not(style)": {
                                overflow: null != h ? h : "hidden",
                                position: "relative",
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                height: "100%"
                            }
                        },
                        children: p
                    })
                })
        },
        61681: (e, n, t) => {
            t.d(n, {
                Cv: () => d,
                gy: () => u,
                l4: () => p
            });
            var i = t(6029),
                l = t(97707),
                a = t(77367),
                o = t(69757),
                r = t(35882);
            let [s, c] = (0, l.Wh)("Blockquote"), d = (0, a.R)((e, n) => {
                let {
                    children: t,
                    ...l
                } = e, a = (0, o.o)("Blockquote", {});
                return (0, i.jsx)(r.B.blockquote, {
                    ref: n,
                    __css: a.blockquote,
                    ...l,
                    children: (0, i.jsx)(s, {
                        value: a,
                        children: t
                    })
                })
            }), u = e => {
                let {
                    children: n,
                    ...t
                } = e, l = c();
                return (0, i.jsx)(r.B.p, { ...t,
                    __css: l.quote,
                    children: n
                })
            }, p = e => {
                let {
                    children: n,
                    ...t
                } = e, l = c();
                return (0, i.jsx)(r.B.footer, { ...t,
                    __css: l.footer,
                    children: n
                })
            }
        },
        61833: (e, n, t) => {
            t.d(n, {
                k9: () => c,
                wf: () => u
            });
            var i = t(40157),
                l = t(17497),
                a = t(46169),
                o = t(15700),
                r = t(12482),
                s = t(54513);
            let c = "\n    fragment ModuleQuoteFields on ModuleQuote {\n  ...ComponentReferenceFields\n  quote\n  source\n  widget {\n    ...ComponentReferenceFields\n    ... on ModuleAudioPlayer {\n      ...ModuleAudioPlayerFields\n    }\n    ... on Module916VideoImage {\n      ...Module916VideoImageFields\n    }\n  }\n}\n    ",
                d = '\n    query ModuleQuote($locale: String!, $preview: Boolean!, $id: String!) {\n  moduleQuote(id: $id, locale: $locale, preview: $preview) {\n    ...ModuleQuoteFields\n  }\n  microcopySetCollection(\n    where: {key_in: ["moduleAudioPlayer"]}\n    locale: $locale\n    preview: $preview\n  ) {\n    items {\n      ...MicrocopySetFields\n    }\n  }\n}\n    '.concat(c, "\n").concat(i.o, "\n").concat(l.NE, "\n").concat(a.QR, "\n").concat(o.Fd, "\n").concat(o.d1),
                u = (e, n) => (0, r.I)({
                    queryKey: ["ModuleQuote", e],
                    queryFn: (0, s.x8)(d, e),
                    ...n
                });
            u.getKey = e => ["ModuleQuote", e], u.fetcher = (e, n) => (0, s.x8)(d, e, n)
        },
        66121: (e, n, t) => {
            t.d(n, {
                Uc: () => o,
                cz: () => r,
                u3: () => c
            });
            var i = t(40157),
                l = t(12482),
                a = t(54513);
            let o = "\n    fragment PartnerFields on Partner {\n  ...ComponentReferenceFields\n  name\n  logo\n  url\n}\n    ",
                r = "\n    fragment PartnerSetFields on PartnerSet {\n  ...ComponentReferenceFields\n  partnersCollection(limit: 40) {\n    items {\n      ...PartnerFields\n    }\n  }\n}\n    ",
                s = "\n    query PartnerSet($id: String!, $locale: String!, $preview: Boolean!) {\n  partnerSet(id: $id, locale: $locale, preview: $preview) {\n    ...PartnerSetFields\n  }\n}\n    ".concat(r, "\n").concat(i.o, "\n").concat(o),
                c = (e, n) => (0, l.I)({
                    queryKey: ["PartnerSet", e],
                    queryFn: (0, a.x8)(s, e),
                    ...n
                });
            c.getKey = e => ["PartnerSet", e], c.fetcher = (e, n) => (0, a.x8)(s, e, n)
        },
        66769: (e, n, t) => {
            t.d(n, {
                $m: () => d.$,
                aF: () => a.aF,
                cw: () => h.c,
                jl: () => p.j,
                mH: () => m,
                rQ: () => u.r,
                s_: () => g
            });
            var i = t(6029),
                l = t(77367),
                a = t(45158),
                o = t(14381),
                r = t(84371),
                s = t(87613),
                c = t(52697),
                d = t(12337),
                u = t(12195),
                p = t(13697),
                h = t(52452);
            let g = (0, l.R)((e, n) => {
                    let {
                        onClick: t,
                        ...l
                    } = e, {
                        onClose: o
                    } = (0, a.k3)(), c = (0, a.x5)();
                    return (0, i.jsx)(r.J, {
                        ref: n,
                        onClick: (0, s.H)(t, e => {
                            e.stopPropagation(), o()
                        }),
                        __css: c.closeButton,
                        ...l
                    })
                }),
                m = e => (0, i.jsx)(o.m, {
                    backdropFilter: c.B.backdropFilter,
                    ...e
                })
        },
        68865: (e, n, t) => {
            t.d(n, {
                z: () => o
            });
            var i = t(6029),
                l = t(21909),
                a = t(91753);
            let o = e => (0, i.jsx)(a.e, {
                role: "presentation",
                "aria-hidden": "true",
                className: "backdrop",
                position: "fixed",
                zIndex: "modal",
                backgroundColor: "rgba(0,0,0,0.4)",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backdropFilter: l.B.backdropFilter,
                sx: {
                    willChange: "opacity, backdrop-filter",
                    backfaceVisibility: "hidden",
                    isolation: "isolate"
                },
                ...e
            })
        },
        69747: (e, n, t) => {
            t.d(n, {
                R: () => r
            });
            var i = t(6029),
                l = t(55729),
                a = t(72813),
                o = t(24561);
            let r = (0, l.forwardRef)((e, n) => {
                let {
                    children: t,
                    wrapperProps: l,
                    ...r
                } = e;
                return (0, i.jsx)(a.a, {
                    py: {
                        base: 10,
                        s: 20
                    },
                    ...r,
                    ref: n,
                    className: "module-spacer",
                    children: (0, i.jsx)(o.H, { ...l,
                        children: t
                    })
                })
            });
            r.displayName = "ModuleSpacer"
        },
        72343: (e, n, t) => {
            t.d(n, {
                P: () => c,
                Y: () => s
            });
            var i = t(6029),
                l = t(55729),
                a = t(94169),
                o = t(76939),
                r = t(94771);
            let s = () => {
                    let {
                        state: {
                            userPaused: e,
                            isPlaying: n
                        },
                        dispatch: t
                    } = (0, a.z)();
                    return (0, l.useCallback)(() => {
                        t({
                            type: n ? "PAUSE" : "PLAY"
                        }), t({
                            type: e ? "USER_UNPAUSED" : "USER_PAUSED"
                        })
                    }, [t, n, e])
                },
                c = e => {
                    let {
                        mobile: n,
                        onClick: t,
                        ...l
                    } = e, {
                        state: c
                    } = (0, a.z)(), d = s(), u = e => {
                        d(e), t && t(e)
                    }, p = c.isPlaying ? "pause video" : "play video";
                    return n ? (0, i.jsx)(r.d, {
                        onClick: u,
                        theme: "dark",
                        ...l,
                        hideLabel: !0,
                        icon: c.isPlaying ? "pause" : "play",
                        border: "2px solid var(--colors-allWhite)",
                        borderRadius: "var(--radii-small)",
                        size: "x-large",
                        aria: {
                            "aria-label": p
                        },
                        children: p
                    }) : (0, i.jsx)(o.$, {
                        onClick: u,
                        theme: "dark",
                        variant: "secondary",
                        ...l,
                        hideLabel: !0,
                        icon: c.isPlaying ? "pause" : "play",
                        aria: {
                            "aria-label": p
                        },
                        children: p
                    })
                };
            c.displayName = "CldVideoTogglePlay"
        },
        77396: (e, n, t) => {
            t.d(n, {
                C: () => o
            });
            var i = t(6029),
                l = t(55729),
                a = t(43914);

            function o(e, n, t) {
                var o;
                let {
                    aiTagPosition: r = "top-left",
                    aiTagOffset: s,
                    hideAiTag: c = !1
                } = t, d = null != (o = (0, a.Jj)(e)) ? o : a.Ci, u = (0, l.useId)(), p = !!d && !c, h = p && d ? (0, i.jsx)(a.D, {
                    id: u,
                    type: d,
                    position: r,
                    offset: s,
                    kind: n
                }) : null;
                return {
                    ariaDescribedBy: p ? u : void 0,
                    tag: h
                }
            }
        },
        78852: (e, n, t) => {
            t.d(n, {
                V: () => a
            });
            var i = t(6029),
                l = t(8711);
            let a = e => {
                let {
                    children: n,
                    ...t
                } = e;
                return (0, i.jsx)(l.E, {
                    size: "textMedium",
                    fontWeight: "400",
                    mt: 2,
                    sx: {
                        textWrap: "balance"
                    },
                    ...t,
                    children: n
                })
            }
        },
        80575: (e, n, t) => {
            t.d(n, {
                $D: () => a,
                Hz: () => r
            });
            var i = t(12482),
                l = t(54513);
            let a = "\n    fragment ModuleVideoFields on ModuleVideo {\n  __typename\n  sys {\n    id\n  }\n  title\n  description\n  mediaAsset\n  youtubeUrl\n  autoplay\n}\n    ",
                o = "\n    query ModuleVideo($locale: String!, $preview: Boolean!, $id: String!) {\n  moduleVideo(id: $id, locale: $locale, preview: $preview) {\n    ...ModuleVideoFields\n  }\n}\n    ".concat(a),
                r = (e, n) => (0, i.I)({
                    queryKey: ["ModuleVideo", e],
                    queryFn: (0, l.x8)(o, e),
                    ...n
                });
            r.getKey = e => ["ModuleVideo", e], r.fetcher = (e, n) => (0, l.x8)(o, e, n)
        },
        81085: (e, n, t) => {
            t.d(n, {
                QR: () => o,
                UW: () => i.UW,
                Uu: () => s,
                VZ: () => c,
                gV: () => i.gV,
                iO: () => i.iO,
                jT: () => a,
                zO: () => r
            });
            var i = t(96538),
                l = t(50130);
            let a = e => Array.isArray(e) ? e.length > 0 : !!e,
                o = e => {
                    var n;
                    return e && (null == (n = e[0]) ? void 0 : n.resource_type) === "video"
                },
                r = e => Array.isArray(e) ? e.length > 0 : !!e,
                s = e => {
                    var n;
                    return e && (null == (n = e[0]) ? void 0 : n.resource_type) === "image"
                },
                c = e => {
                    if (!a(e)) return;
                    let n = Number(e[0].width);
                    return n > 999 && (n /= 2), (0, l.F7)({
                        options: {
                            src: e[0].public_id,
                            crop: "fill",
                            gravity: "auto",
                            quality: "auto",
                            format: "auto",
                            assetType: "video",
                            rawTransformations: "so_0.0",
                            width: n
                        },
                        config: {
                            cloud: {
                                cloudName: "dmwcbhehi"
                            }
                        }
                    })
                }
        },
        81109: (e, n, t) => {
            t.d(n, {
                N: () => p
            });
            var i = t(6029),
                l = t(72813),
                a = t(92063),
                o = t(26883),
                r = t(55310),
                s = t(2142),
                c = t(55729),
                d = t(1730),
                u = t(3591);
            let p = (0, c.forwardRef)(function(e, n) {
                var t;
                let {
                    label: p,
                    clear: h = !0,
                    indicator: g = !0,
                    onClear: m,
                    value: x,
                    onChange: v,
                    placeholder: b,
                    id: f,
                    ...y
                } = e, [C, j] = (0, c.useState)(""), k = (0, c.useId)(), w = null != f ? f : k, T = p ? "".concat(w, "-label") : void 0, P = void 0 !== x, S = P ? x : C, E = String(null != S ? S : "").length > 0, F = null != (t = null != p ? p : b) ? t : "Search", R = p && T ? {
                    "aria-labelledby": T
                } : {
                    "aria-label": F
                };
                return (0, i.jsxs)(l.a, {
                    children: [p && (0, i.jsx)(a.E, {
                        as: "label",
                        id: T,
                        display: "block",
                        fontSize: "sm",
                        fontWeight: "medium",
                        mb: 2,
                        htmlFor: w,
                        children: p
                    }), (0, i.jsxs)(o.M, {
                        width: "100%",
                        children: [(0, i.jsx)(r.p, {
                            ref: n,
                            id: w,
                            type: "search",
                            value: S,
                            onChange: e => {
                                P || j(e.target.value), null == v || v(e)
                            },
                            placeholder: b,
                            ...R,
                            borderRadius: "md",
                            borderColor: "grey200",
                            css: {
                                paddingRight: "68px",
                                "&::-webkit-search-cancel-button": {
                                    WebkitAppearance: "none",
                                    appearance: "none",
                                    display: "none"
                                },
                                "&::-ms-clear": {
                                    display: "none"
                                },
                                "&:focus": {
                                    outline: "none",
                                    boxShadow: "none"
                                }
                            },
                            _focusVisible: { ...(0, d.g)()
                            },
                            _placeholder: {
                                color: "grey500",
                                opacity: .6
                            },
                            ...y
                        }), g && (0, i.jsx)(s.t, {
                            height: "100%",
                            pr: h && E ? 10 : 3,
                            pointerEvents: "none",
                            "aria-hidden": "true",
                            children: (0, i.jsx)(u.I, {
                                name: "search",
                                size: "small",
                                theme: "dark"
                            })
                        }), h && E && (0, i.jsx)(s.t, {
                            height: "100%",
                            pr: 3,
                            cursor: "pointer",
                            onClick: () => {
                                P || j(""), null == m || m(), null == v || v({
                                    target: {
                                        value: ""
                                    },
                                    currentTarget: {
                                        value: ""
                                    }
                                })
                            },
                            "aria-label": "Clear search",
                            children: (0, i.jsx)(u.I, {
                                name: "close",
                                size: "small",
                                theme: "dark",
                                "aria-hidden": "true"
                            })
                        })]
                    })]
                })
            });
            p.displayName = "InputSearch"
        },
        82889: (e, n, t) => {
            t.d(n, {
                Mp: () => s,
                uB: () => d
            });
            var i = t(40157),
                l = t(59109),
                a = t(15700),
                o = t(12482),
                r = t(54513);
            let s = "\n    fragment ModuleCarTechSpecsFields on ModuleCarTechSpecs {\n  ...ComponentReferenceFields\n  car {\n    ...CarFields\n  }\n}\n    ",
                c = '\n    query ModuleCarTechSpecs($locale: String!, $preview: Boolean!, $id: String!) {\n  moduleCarTechSpecs(id: $id, locale: $locale, preview: $preview) {\n    ...ModuleCarTechSpecsFields\n  }\n  microcopySetCollection(\n    where: {key_in: "moduleCarTechSpecs"}\n    locale: $locale\n    preview: $preview\n    limit: 1\n  ) {\n    items {\n      ...MicrocopySetFields\n    }\n  }\n}\n    '.concat(s, "\n").concat(i.o, "\n").concat(l.c, "\n").concat(a.Fd, "\n").concat(a.d1),
                d = (e, n) => (0, o.I)({
                    queryKey: ["ModuleCarTechSpecs", e],
                    queryFn: (0, r.x8)(c, e),
                    ...n
                });
            d.getKey = e => ["ModuleCarTechSpecs", e], d.fetcher = (e, n) => (0, r.x8)(c, e, n)
        },
        83169: (e, n, t) => {
            t.d(n, {
                ae: () => o,
                vX: () => s
            });
            var i = t(40157),
                l = t(12482),
                a = t(54513);
            let o = "\n    fragment EventFields on Event {\n  ...ComponentReferenceFields\n  name\n  description\n  startDate\n  image\n  location {\n    lat\n    lon\n  }\n  locationLabel\n  series {\n    ...ComponentReferenceFields\n  }\n}\n    ",
                r = "\n    query NextEventForSeries($seriesIds: [String]!, $date: DateTime!, $locale: String!, $preview: Boolean!) {\n  eventCollection(\n    locale: $locale\n    preview: $preview\n    order: startDate_ASC\n    limit: 10\n    where: {series: {sys: {id_in: $seriesIds}}, startDate_gte: $date}\n  ) {\n    items {\n      name\n      description\n      linkedFrom {\n        pageRaceEventCollection(limit: 1) {\n          items {\n            ...ComponentReferenceFields\n            slug\n          }\n        }\n      }\n    }\n  }\n}\n    ".concat(i.o),
                s = (e, n) => (0, l.I)({
                    queryKey: ["NextEventForSeries", e],
                    queryFn: (0, a.x8)(r, e),
                    ...n
                });
            s.getKey = e => ["NextEventForSeries", e], s.fetcher = (e, n) => (0, a.x8)(r, e, n)
        },
        83559: (e, n, t) => {
            t.d(n, {
                R: () => i
            });
            let i = {
                usercentricsConsentManagementPlatform: "Usercentrics Consent Management Platform",
                cloudfront: "cloudfront.net",
                additionalEssentialFunctions: "Additional essential functions",
                porscheSelectedDealer: "Porsche Selected Dealer",
                usercentricsConsentManagementPlatformBridge: "Usercentrics Consent Management Platform + Bridge",
                salesforce: "Salesforce",
                porscheCarConfigurator: "Porsche Car Configurator",
                userlike: "Userlike",
                googleOptimize: "Google Optimize",
                algoliaAnalyticsAI: "Algolia Analytics & AI",
                qualtrics: "Qualtrics",
                psyma: "Psyma",
                chargingMap: "Charging Map",
                newRelic: "New Relic",
                fullstory: "Fullstory",
                googleAnalytics: "Google Analytics",
                googleAdWordsConversion: "Google AdWords Conversion",
                storystream: "Storystream",
                linkedinAds: "LinkedIn Ads",
                instagramContent: "Instagram Content",
                twitterPlugin: "Twitter Plugin",
                vimeo: "Vimeo",
                youtubeVideo: "YouTube Video",
                googleMaps: "Google Maps",
                facebookVideos: "Facebook Videos",
                facebookSocialPlugins: "Facebook Social Plugins",
                twitterAdvertising: "Twitter Advertising",
                googleAds: "Google Ads",
                googleAnalyticsAudiences: "Google Analytics Audiences",
                doubleClickFloodlight: "DoubleClick Floodlight",
                googleAdWordsRemarketing: "Google AdWords Remarketing",
                dianomi: "Dianomi",
                teadsAdvertiser: "Teads (Advertiser)",
                metaPixel: "Meta Pixel",
                twitchContent: "Twitch Content"
            }
        },
        83679: (e, n, t) => {
            t.d(n, {
                Y: () => e5
            });
            var i = t(6029),
                l = t(55729),
                a = t(71024),
                o = t.n(a),
                r = t(40063),
                s = t(35854),
                c = t(72813),
                d = t(94699),
                u = t(48643),
                p = t(98168),
                h = t(15407),
                g = t(69747);
            let m = e => {
                let {
                    title: n,
                    isTitleLeftAligned: t,
                    text: l,
                    sys: {
                        id: a
                    }
                } = e, o = (0, s.wi)({
                    entryId: a
                });
                return (null == l ? void 0 : l.json) ? (0, i.jsxs)(c.a, {
                    overflow: "hidden",
                    className: "ModuleRichText",
                    children: [(0, i.jsx)(g.R, {
                        pb: {
                            base: 4,
                            s: 4,
                            md: 4,
                            l: 4
                        },
                        children: (0, i.jsxs)(d.x, {
                            templateColumns: h.y9,
                            gap: h.T_,
                            position: "relative",
                            children: [t && n && (0, i.jsx)(u.E, {
                                colStart: {
                                    base: 1
                                },
                                colEnd: {
                                    base: 3,
                                    l: 3
                                },
                                position: {
                                    base: "relative",
                                    l: "absolute"
                                },
                                top: 4,
                                left: 0,
                                children: (0, i.jsx)(p.D, {
                                    as: "h3",
                                    size: "headingXLarge",
                                    fontWeight: 400,
                                    children: n
                                })
                            }), !t && n && (0, i.jsx)(u.E, {
                                colStart: {
                                    base: 1,
                                    l: 4
                                },
                                colEnd: {
                                    base: 3,
                                    l: 10
                                },
                                children: (0, i.jsx)(p.D, {
                                    as: "h3",
                                    size: "headingXLarge",
                                    fontWeight: 400,
                                    children: n
                                })
                            })]
                        })
                    }), l && (0, i.jsx)(c.a, {
                        className: "rte",
                        ...o({
                            fieldId: "text"
                        }),
                        children: (0, r.Z)(l)
                    })]
                }) : null
            };
            var x = t(40157),
                v = t(61833),
                b = t(17497),
                f = t(46169),
                y = t(59255),
                C = t(3082),
                j = t(30267),
                k = t(80575),
                w = t(17801),
                T = t(15700),
                P = t(26084),
                S = t(12482),
                E = t(54513);
            let F = "\n    query ModuleRichText($locale: String!, $preview: Boolean, $id: String!) {\n  moduleRichText(id: $id, locale: $locale, preview: $preview) {\n    ...ModuleRichTextFields\n  }\n}\n    ".concat("\n    fragment ModuleRichTextFields on ModuleRichText {\n  ...ComponentReferenceFields\n  title\n  isTitleLeftAligned\n  text {\n    json\n    links {\n      entries {\n        block {\n          ...ComponentReferenceFields\n          ... on ModuleQuote {\n            ...ModuleQuoteFields\n          }\n          ... on ModuleTitleAndDescription {\n            ...ModuleTitleAndDescriptionFields\n          }\n          ... on ModuleImage {\n            ...ModuleImageFields\n          }\n          ... on ModuleVideo {\n            ...ModuleVideoFields\n          }\n          ... on ModuleSpacer {\n            ...ModuleSpacerFields\n          }\n          ... on ModuleAudioPlayer {\n            ...ModuleAudioPlayerFields\n          }\n        }\n        inline {\n          ...ComponentReferenceFields\n          ... on Microcopy {\n            ...MicrocopyFields\n          }\n          ... on ContentTag {\n            ...ContentTagFields\n          }\n        }\n        hyperlink {\n          ... on PageHomepage {\n            ...ComponentReferenceFields\n            sys {\n              locale\n            }\n          }\n          ... on PageSearch {\n            ...ComponentReferenceFields\n            sys {\n              locale\n            }\n          }\n          ... on PageArticle {\n            ...ComponentReferenceFields\n            sys {\n              locale\n            }\n            slug\n          }\n          ... on PageBasic {\n            ...ComponentReferenceFields\n            sys {\n              locale\n            }\n            slug\n          }\n          ... on PageCar {\n            ...ComponentReferenceFields\n            sys {\n              locale\n            }\n            slug\n          }\n          ... on PageCategory {\n            ...ComponentReferenceFields\n            sys {\n              locale\n            }\n            mainCategory\n          }\n          ... on PageDriver {\n            ...ComponentReferenceFields\n            sys {\n              locale\n            }\n            slug\n          }\n          ... on PageRaceSeries {\n            ...ComponentReferenceFields\n            sys {\n              locale\n            }\n            slug\n          }\n          ... on PageRaceEvent {\n            ...ComponentReferenceFields\n            sys {\n              locale\n            }\n            slug\n          }\n          ... on PageTeam {\n            ...ComponentReferenceFields\n            sys {\n              locale\n            }\n            slug\n          }\n        }\n      }\n    }\n  }\n}\n    ", "\n").concat(x.o, "\n").concat(v.k9, "\n").concat(b.NE, "\n").concat(f.QR, "\n").concat(y.pQ, "\n").concat(C.ng, "\n").concat(j.lz, "\n").concat(k.$D, "\n").concat(w.St, "\n").concat(T.d1, "\n").concat(P.P),
                R = (e, n) => (0, S.I)({
                    queryKey: ["ModuleRichText", e],
                    queryFn: (0, E.x8)(F, e),
                    ...n
                });
            R.getKey = e => ["ModuleRichText", e], R.fetcher = (e, n) => (0, E.x8)(F, e, n);
            var M = t(81085),
                I = t(61436),
                A = t(15617),
                L = t(8711),
                _ = t(53720);
            let N = e => {
                    let {
                        __typename: n,
                        description: t,
                        asset: l,
                        sys: {
                            id: a
                        },
                        index: o,
                        sizes: r,
                        priority: c,
                        title: p,
                        alt: m,
                        caption: x,
                        isEmbedded: v,
                        ...b
                    } = e, f = (0, s.wi)({
                        entryId: a
                    }), y = Object.hasOwn(b, "sizes") ? r : ["100vw"];
                    return (0, M.jT)(l) ? (0, i.jsx)(g.R, {
                        className: "ModuleImage",
                        children: (0, i.jsx)(d.x, {
                            templateColumns: h.y9,
                            gap: h.T_,
                            children: (0, i.jsxs)(u.E, {
                                colStart: {
                                    base: 1,
                                    l: v ? h.hb : 1
                                },
                                colEnd: {
                                    base: 3,
                                    l: v ? h.Up : 13
                                },
                                children: [(p || t) && (0, i.jsx)(_.u, {
                                    title: p,
                                    description: t
                                }), (0, i.jsx)(I.g, {
                                    ratio: "16:9",
                                    children: (0, i.jsx)(A.d, { ...f({
                                            fieldId: "assetMobileViewport"
                                        }),
                                        ...b,
                                        alt: null != m ? m : "",
                                        cloudinaryAsset: l,
                                        sizes: y,
                                        priority: c || !!(o && o <= 5)
                                    })
                                }), x && (0, i.jsx)(L.E, {
                                    mt: 4,
                                    size: "small",
                                    children: x
                                })]
                            })
                        })
                    }) : null
                },
                H = {
                    small: {
                        base: "10",
                        md: "20"
                    },
                    large: {
                        base: "20",
                        md: "40"
                    }
                },
                z = e => {
                    let {
                        sys: {
                            id: n
                        },
                        size: t,
                        theme: a
                    } = e, o = (0, s.wi)({
                        entryId: n
                    }), r = (0, l.useMemo)(() => H[null != t ? t : "small"], [t]);
                    return (0, i.jsx)(c.a, { ...o({
                            fieldId: "size"
                        }),
                        className: "ModuleSpacer",
                        h: r,
                        backgroundColor: "Dark" === a ? "porscheBlack" : "allWhite"
                    })
                };
            var V = t(22814),
                B = t(86590),
                $ = t(76968),
                D = t(39864),
                q = t(8128),
                G = t(80321);
            let W = e => {
                var n;
                let {
                    car: t,
                    microcopySet: l,
                    moduleIndex: a,
                    __typename: o,
                    isEmbedded: r = !1
                } = e, {
                    get: s,
                    add: m
                } = (0, $.hu)();
                m(l);
                let x = [{
                    name: s("moduleCarTechSpecs", "engine"),
                    value: null == t ? void 0 : t.engine
                }, {
                    name: s("moduleCarTechSpecs", "displacement"),
                    value: null == t ? void 0 : t.displacement
                }, {
                    name: s("moduleCarTechSpecs", "performance"),
                    value: null == t ? void 0 : t.power
                }, {
                    name: s("moduleCarTechSpecs", "gears"),
                    value: null == t ? void 0 : t.transmission
                }, {
                    name: s("moduleCarTechSpecs", "weight"),
                    value: null == t ? void 0 : t.weight
                }, {
                    name: s("moduleCarTechSpecs", "driveLine"),
                    value: null == t ? void 0 : t.driveline
                }].filter(e => {
                    let {
                        value: n
                    } = e;
                    return n
                });
                return (0, i.jsx)(g.R, {
                    className: "ModuleCarTechSpecs",
                    children: (0, i.jsx)(d.x, {
                        templateColumns: h.y9,
                        gap: h.T_,
                        children: (0, i.jsxs)(u.E, {
                            colStart: {
                                base: 1,
                                l: r ? h.ft : 1
                            },
                            colEnd: {
                                base: 4,
                                l: r ? h.yC : 13
                            },
                            children: [(0, i.jsxs)(c.a, {
                                mb: {
                                    base: 6,
                                    s: 14
                                },
                                children: [(0, i.jsxs)(c.a, {
                                    mb: {
                                        base: 8,
                                        l: 10
                                    },
                                    children: [(0, i.jsx)(L.E, {
                                        size: "caption",
                                        color: "grey300",
                                        children: null == t ? void 0 : t.name
                                    }), (0, i.jsx)(D.h, {
                                        children: s("moduleCarTechSpecs", "performanceInNumbers")
                                    })]
                                }), (0, M.jT)(null == t ? void 0 : t.asset) && (0, i.jsx)(d.x, {
                                    templateColumns: h.y9,
                                    gap: h.T_,
                                    children: (0, i.jsx)(u.E, {
                                        colSpan: {
                                            base: 4,
                                            s: 12
                                        },
                                        children: (0, i.jsx)(c.a, {
                                            as: "figure",
                                            w: {
                                                base: "100%",
                                                s: "80%"
                                            },
                                            mx: "auto",
                                            h: {
                                                base: 200,
                                                md: 340,
                                                l: 450
                                            },
                                            children: (0, i.jsx)(A.d, {
                                                cloudinaryAsset: null == t ? void 0 : t.asset,
                                                sizes: ["100vw"],
                                                priority: !0,
                                                _hover: {
                                                    transform: "scale(1.02)"
                                                },
                                                transition: "transform 0.30s ease",
                                                objectFit: "contain",
                                                rawTransformations: "c_fill,ar_16:9,e_trim:5",
                                                wrapperProps: {
                                                    overflow: "visible"
                                                }
                                            })
                                        })
                                    })
                                }), (0, i.jsx)(c.a, {
                                    mt: {
                                        base: 0,
                                        s: -10
                                    },
                                    children: x.map(e => {
                                        let {
                                            name: n,
                                            value: t
                                        } = e;
                                        return (0, i.jsxs)(d.x, {
                                            templateColumns: h.y9,
                                            gap: h.T_,
                                            py: {
                                                base: 4,
                                                s: 6
                                            },
                                            alignItems: "start",
                                            borderBottomWidth: 1,
                                            borderBottomColor: "grey200",
                                            children: [(0, i.jsx)(u.E, {
                                                colSpan: {
                                                    base: 12,
                                                    s: 4
                                                },
                                                children: (0, i.jsx)(p.D, {
                                                    size: "medium",
                                                    mb: 0,
                                                    children: n
                                                })
                                            }), (0, i.jsx)(u.E, {
                                                colSpan: {
                                                    base: 12,
                                                    s: 8
                                                },
                                                children: (0, i.jsx)(L.E, {
                                                    size: "small",
                                                    mb: 0,
                                                    textAlign: {
                                                        base: "left",
                                                        s: "right"
                                                    },
                                                    children: t
                                                })
                                            })]
                                        }, n)
                                    })
                                })]
                            }), (null == t || null == (n = t.factSheetPdf) ? void 0 : n.url) ? (0, i.jsx)(q.w, {
                                item: {
                                    __typename: "ExternalLink",
                                    sys: t.sys,
                                    url: t.factSheetPdf.url,
                                    label: s("moduleCarTechSpecs", "downloadFactSheet")
                                },
                                theme: "light",
                                renderAs: V.N,
                                renderExternalLinkAs: V.N,
                                target: "_blank",
                                icon: "download",
                                sx: {
                                    w: "var(--sizes-full)",
                                    [B.JM.md]: {
                                        w: "auto"
                                    }
                                },
                                moduleName: o,
                                modulePosition: a,
                                eventAction: G.wT.carTechSpecsDownloadPDF,
                                children: s("moduleCarTechSpecs", "downloadFactSheet")
                            }) : null]
                        })
                    })
                })
            };
            var U = t(82889),
                K = t(46981),
                O = t(78852),
                Q = t(69882),
                X = t(83559),
                Y = t(81278),
                Z = t(93066),
                J = t(35358);
            let ee = o()(() => Promise.all([t.e(4820), t.e(9074), t.e(8516), t.e(7172), t.e(244), t.e(6964), t.e(3382), t.e(1250), t.e(4155), t.e(755)]).then(t.bind(t, 54155)).then(e => e.CldVideoPlayerProvider), {
                    loadableGenerated: {
                        webpack: () => [54155]
                    }
                }),
                en = o()(() => Promise.all([t.e(4820), t.e(9074), t.e(8516), t.e(7172), t.e(244), t.e(6964), t.e(3382), t.e(1250), t.e(4155), t.e(755)]).then(t.bind(t, 54155)).then(e => e.CldVideo), {
                    loadableGenerated: {
                        webpack: () => [54155]
                    }
                }),
                et = e => {
                    let {
                        mediaAsset: n,
                        description: t,
                        title: a,
                        youtubeUrl: o,
                        autoplay: r,
                        moduleIndex: s,
                        __typename: p,
                        isEmbedded: m = !1
                    } = e, [x, v] = (0, l.useState)(null), b = (0, l.useRef)(null), f = (0, l.useMemo)(() => (0, M.zO)(o), [o]), {
                        consentGiven: y,
                        isLoaded: C,
                        checkConsent: j
                    } = (0, Q.u)();
                    (0, l.useEffect)(() => {
                        if (!C) return;
                        let e = y.get(X.R.youtubeVideo);
                        if ((null == e ? void 0 : e.consentStatus) === !0)(0, M.zO)(o) && v(o);
                        else {
                            if (!b.current) return;
                            v(null), j({
                                mapContainer: [b],
                                processor: X.R.youtubeVideo,
                                successCallback: () => {
                                    (0, M.zO)(o) && v(o)
                                }
                            })
                        }
                    }, [o, C, y, j]);
                    let {
                        locale: k
                    } = (0, Y.useRouter)(), {
                        state: {
                            pageId: w,
                            pageContentTags: T,
                            pageType: P
                        }
                    } = (0, Z.CU)(), S = e => {
                        var n;
                        (0, G.V3)({
                            eventAction: e,
                            locale: k,
                            pageCategory: P,
                            contentTags: T,
                            moduleName: p,
                            modulePosition: null != s ? s : 0,
                            clickElementType: "interaction",
                            clickElementId: w,
                            clickElementName: null != (n = null != x ? x : a) ? n : ""
                        })
                    };
                    return (0, i.jsx)(g.R, {
                        className: "ModuleVideo",
                        children: (0, i.jsx)(d.x, {
                            templateColumns: h.y9,
                            gap: h.T_,
                            children: (0, i.jsxs)(u.E, {
                                colStart: {
                                    base: 1,
                                    l: m ? h.hb : 1
                                },
                                colEnd: {
                                    base: 3,
                                    l: m ? h.Up : 13
                                },
                                children: [a && (0, i.jsxs)(c.a, {
                                    mb: {
                                        base: 6,
                                        l: 8
                                    },
                                    color: "porscheBlack",
                                    maxW: "40rem",
                                    children: [(0, i.jsx)(D.h, {
                                        children: a
                                    }), t && (0, i.jsx)(O.V, {
                                        mt: {
                                            base: 4,
                                            l: 6
                                        },
                                        children: t
                                    })]
                                }), (0, i.jsx)(I.g, {
                                    ratio: ["9:16", "16:9"],
                                    children: f ? (0, i.jsx)(c.a, {
                                        ref: b,
                                        borderRadius: 12,
                                        bg: "porscheBlack",
                                        children: x && (0, i.jsx)(K.A, {
                                            url: x,
                                            controls: !0,
                                            width: "100%",
                                            height: "100%",
                                            onPlay: () => S(G.wT.videoIframePlay_Click)
                                        })
                                    }) : (0, i.jsx)(c.a, {
                                        borderRadius: 12,
                                        position: "relative",
                                        w: "full",
                                        h: "full",
                                        children: (0, i.jsx)(ee, {
                                            muted: null != r && r,
                                            autoplay: null != r && r,
                                            children: (0, M.jT)(n) && (0, M.QR)(n) && (0, i.jsxs)(i.Fragment, {
                                                children: [(0, i.jsx)(en, {
                                                    cloudinaryAsset: n,
                                                    wrapperProps: {
                                                        position: "absolute",
                                                        w: "full",
                                                        h: "full"
                                                    },
                                                    playsinline: !0,
                                                    preload: "auto",
                                                    inViewAutoplay: r
                                                }), (0, i.jsx)(J._, {
                                                    onClick: S
                                                })]
                                            })
                                        })
                                    })
                                })]
                            })
                        })
                    })
                };
            var ei = t(31219),
                el = t(98964),
                ea = t(41684),
                eo = t(3591),
                er = t(23518);
            let es = e => {
                    let {
                        item: n
                    } = e, t = (e => {
                        var n, t;
                        switch (e.__typename) {
                            case "PageArticle":
                            case "PageCategory":
                            case "PageRaceEvent":
                            case "PageRaceSeries":
                            case "PageCar":
                            case "PageBasic":
                                return e.heroAsset;
                            case "PageDriver":
                                return null == (n = e.driver) ? void 0 : n.asset;
                            case "PageTeam":
                                return null == (t = e.team) ? void 0 : t.asset;
                            default:
                                return null
                        }
                    })(n);
                    return (0, i.jsxs)(ei.Q, {
                        "data-group": !0,
                        children: [t && (0, i.jsx)(c.a, {
                            as: "figure",
                            mb: 6,
                            rounded: "large",
                            overflow: "hidden",
                            children: (0, i.jsx)(I.g, {
                                ratio: "2:1",
                                bgColor: "grey100",
                                children: (0, M.jT)(t) && (0, i.jsx)(i.Fragment, {
                                    children: (0, M.QR)(t) ? (0, i.jsx)(el.P, {
                                        cloudinaryAsset: t,
                                        wrapperProps: {
                                            position: "absolute"
                                        },
                                        loop: !0
                                    }) : (0, i.jsx)(A.d, {
                                        cloudinaryAsset: t,
                                        sizes: "100vw",
                                        _groupHover: {
                                            transform: "scale(1.02)"
                                        },
                                        transition: "transform 0.30s ease",
                                        wrapperProps: {
                                            isolation: "isolate"
                                        }
                                    })
                                })
                            })
                        }), (0, i.jsx)(p.D, {
                            as: "h3",
                            size: "headingMedium",
                            fontWeight: 400,
                            children: (0, i.jsxs)(ei.r, {
                                as: ea.S,
                                href: (0, er.s6)(n),
                                display: "flex",
                                alignItems: "center",
                                children: [n.title, (0, i.jsx)(eo.I, {
                                    ml: 2,
                                    name: "arrow-right",
                                    _groupHover: {
                                        transform: "translateX(6px)"
                                    },
                                    transitionProperty: "transform",
                                    transitionTimingFunction: "var(--transition-easing-base)",
                                    transitionDuration: "var(--transition-duration-short)"
                                })]
                            })
                        })]
                    })
                },
                ec = e => {
                    var n;
                    let {
                        title: t,
                        description: l,
                        pagesCollection: a
                    } = e, o = null != (n = null == a ? void 0 : a.items.length) ? n : 0, r = o > 0 ? Math.floor(12 / o) : 12;
                    return (0, i.jsxs)(g.R, {
                        className: "ModulePageLinkTile",
                        children: [(0, i.jsx)(_.u, {
                            mb: 9,
                            title: t,
                            description: l
                        }), (null == a ? void 0 : a.items.length) && (0, i.jsx)(d.x, {
                            templateColumns: h.y9,
                            gap: h.T_,
                            children: a.items.map(e => (null == e ? void 0 : e.__typename) && (0, i.jsx)(u.E, {
                                gridColumn: {
                                    base: "1 / span 2",
                                    l: "span ".concat(r)
                                },
                                mb: {
                                    base: 6,
                                    l: 0
                                },
                                children: (0, i.jsx)(es, {
                                    item: e
                                })
                            }, crypto.randomUUID()))
                        })]
                    })
                };
            var ed = t(50281),
                eu = t(66121);
            let ep = "\n    query ModulePageLinkTile($locale: String!, $preview: Boolean!, $id: String!) {\n  modulePageLinkTile(id: $id, locale: $locale, preview: $preview) {\n    ...ModulePageLinkTileFields\n  }\n}\n    ".concat("\n    fragment ModulePageLinkTileFields on ModulePageLinkTile {\n  ...ComponentReferenceFields\n  title\n  description\n  pagesCollection(limit: 3) {\n    items {\n      ... on PageArticle {\n        ...PageArticleLinkToFields\n      }\n      ... on PageBasic {\n        ...PageBasicLinkToFields\n      }\n      ... on PageCategory {\n        ...PageCategoryLinkToFields\n      }\n      ... on PageTeam {\n        ...PageTeamLinkToFields\n      }\n      ... on PageCar {\n        ...PageCarLinkToFields\n      }\n      ... on PageDriver {\n        ...PageDriverLinkToFields\n      }\n      ... on PageRaceEvent {\n        ...PageRaceEventLinkToFields\n      }\n      ... on PageRaceSeries {\n        ...PageRaceSeriesLinkToFields\n      }\n    }\n  }\n}\n    ", "\n").concat(x.o, "\n").concat(C.K7, "\n").concat(P.P, "\n").concat(C.e3, "\n").concat(C.Ah, "\n").concat(C.F9, "\n").concat(ed.z, "\n").concat(C.Y4, "\n").concat(eu.cz, "\n").concat(eu.Uc, "\n").concat(C.QK, "\n").concat(C.x2, "\n").concat(C.gZ),
                eh = (e, n) => (0, S.I)({
                    queryKey: ["ModulePageLinkTile", e],
                    queryFn: (0, E.x8)(ep, e),
                    ...n
                });
            eh.getKey = e => ["ModulePageLinkTile", e], eh.fetcher = (e, n) => (0, E.x8)(ep, e, n);
            var eg = t(24561),
                em = t(45253);
            let ex = o()(() => Promise.all([t.e(4254), t.e(1963)]).then(t.bind(t, 51963)).then(async e => e.VideoAndLottieWrapper), {
                    loadableGenerated: {
                        webpack: () => [51963]
                    },
                    ssr: !0,
                    loading: () => (0, i.jsx)(p.D, {
                        size: "headingXXLarge",
                        children: "Loading Component Code..."
                    })
                }),
                ev = e => {
                    let {
                        aiGenerated: n,
                        description: t,
                        landscapeVideo: l,
                        pressAndHoldForSoundButtonLabel: a,
                        lottieJson: o,
                        loadingText: r,
                        moduleIndex: s,
                        __typename: p
                    } = e, {
                        locale: g
                    } = (0, Y.useRouter)(), {
                        state: {
                            pageId: m,
                            pageContentTags: x,
                            pageType: v
                        }
                    } = (0, Z.CU)();
                    return (0, i.jsx)(I.g, {
                        ratio: ["9:16", "9:16", "16:9"],
                        bgColor: "porscheBlack",
                        color: "white",
                        maxHeight: "100svh",
                        width: "full",
                        className: "ModuleListenToTheEngine",
                        children: (0, i.jsxs)(c.a, {
                            children: [(0, i.jsx)(eg.H, {
                                position: "relative",
                                zIndex: 1,
                                inset: 0,
                                children: (0, i.jsx)(d.x, {
                                    py: {
                                        base: 8,
                                        l: 10
                                    },
                                    templateColumns: h.y9,
                                    children: (0, i.jsx)(u.E, {
                                        colStart: 1,
                                        colEnd: {
                                            base: 3,
                                            l: 5
                                        },
                                        children: (0, i.jsx)(L.E, {
                                            pt: {
                                                base: 10,
                                                md: 0
                                            },
                                            size: "medium",
                                            children: t
                                        })
                                    })
                                })
                            }), (0, i.jsx)(em.s, {
                                as: "figure",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "absolute",
                                zIndex: 0,
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                children: (0, i.jsx)(ex, {
                                    aiGenerated: n,
                                    landscapeVideo: l,
                                    lottieJson: o,
                                    pressAndHoldForSoundButtonLabel: a,
                                    loadingText: r,
                                    onClick: e => {
                                        (0, G.yn)({
                                            eventAction: "sound" === e ? G.wT.listenToTheEngineSoundButton_Click : G.wT.listenToTheEngineTooglePlayButton_Click,
                                            locale: g,
                                            pageExperience: {
                                                pageCategory: v,
                                                contentTags: null != x ? x : []
                                            },
                                            context: {
                                                moduleName: p,
                                                modulePosition: s
                                            },
                                            componentClick: {
                                                clickElementType: "interaction",
                                                clickElementId: m,
                                                clickElementName: "Listen to the engine ".concat("sound" === e ? "sound" : "toggle play", " button")
                                            }
                                        })
                                    }
                                })
                            })]
                        })
                    })
                },
                eb = '\n    query ModuleListenToTheEngine($locale: String!, $preview: Boolean!, $id: String!) {\n  moduleListenToTheEngine(id: $id, locale: $locale, preview: $preview) {\n    ...ModuleListenToTheEngineFields\n  }\n  microcopySetCollection(\n    where: {key_in: ["moduleListenToTheEngine"]}\n    locale: $locale\n    preview: $preview\n  ) {\n    items {\n      ...MicrocopySetFields\n    }\n  }\n}\n    '.concat("\n    fragment ModuleListenToTheEngineFields on ModuleListenToTheEngine {\n  ...ComponentReferenceFields\n  aiGenerated\n  description\n  landscapeVideo\n  portraitVideo\n  pressAndHoldForSoundButtonLabel\n  loadingText\n  lottieJson {\n    sys {\n      id\n    }\n  }\n}\n    ", "\n").concat(x.o, "\n").concat(T.Fd, "\n").concat(T.d1),
                ef = (e, n) => (0, S.I)({
                    queryKey: ["ModuleListenToTheEngine", e],
                    queryFn: (0, E.x8)(eb, e),
                    ...n
                });
            ef.getKey = e => ["ModuleListenToTheEngine", e], ef.fetcher = (e, n) => (0, E.x8)(eb, e, n);
            let ey = o()(() => t.e(9136).then(t.bind(t, 29136)).then(e => e.ModuleQuote), {
                    loadableGenerated: {
                        webpack: () => [29136]
                    }
                }),
                eC = o()(() => t.e(8007).then(t.bind(t, 98007)).then(e => e.ModuleQuoteGraphql), {
                    loadableGenerated: {
                        webpack: () => [98007]
                    }
                }),
                ej = o()(() => t.e(6640).then(t.bind(t, 16640)).then(e => e.ModuleTitleAndDescription), {
                    loadableGenerated: {
                        webpack: () => [16640]
                    }
                }),
                ek = o()(() => t.e(7601).then(t.bind(t, 57601)).then(e => e.ModuleTitleAndDescriptionGraphql), {
                    loadableGenerated: {
                        webpack: () => [57601]
                    }
                }),
                ew = o()(() => t.e(962).then(t.bind(t, 90962)).then(e => e.ModuleTable), {
                    loadableGenerated: {
                        webpack: () => [90962]
                    }
                }),
                eT = o()(() => t.e(5680).then(t.bind(t, 35680)).then(e => e.ModuleTableGraphql), {
                    loadableGenerated: {
                        webpack: () => [35680]
                    }
                }),
                eP = o()(() => Promise.all([t.e(4820), t.e(9074), t.e(2693), t.e(4567)]).then(t.bind(t, 54567)).then(e => e.ModuleCarousel), {
                    loadableGenerated: {
                        webpack: () => [54567]
                    }
                }),
                eS = o()(() => Promise.all([t.e(4820), t.e(9074), t.e(2693), t.e(865)]).then(t.bind(t, 40865)).then(e => e.ModuleCarouselGraphql), {
                    loadableGenerated: {
                        webpack: () => [40865]
                    }
                }),
                eE = o()(() => t.e(2202).then(t.bind(t, 2202)).then(e => e.Module916VideoImage), {
                    loadableGenerated: {
                        webpack: () => [2202]
                    }
                }),
                eF = o()(() => t.e(5335).then(t.bind(t, 65335)).then(e => e.Module916VideoImageGraphql), {
                    loadableGenerated: {
                        webpack: () => [65335]
                    }
                }),
                eR = o()(() => t.e(5190).then(t.bind(t, 65190)).then(e => e.ModuleAccordion), {
                    loadableGenerated: {
                        webpack: () => [65190]
                    }
                }),
                eM = o()(() => t.e(2210).then(t.bind(t, 32210)).then(e => e.ModuleAccordionGraphql), {
                    loadableGenerated: {
                        webpack: () => [32210]
                    }
                }),
                eI = o()(() => t.e(628).then(t.bind(t, 90628)).then(e => e.ModuleDriverList), {
                    loadableGenerated: {
                        webpack: () => [90628]
                    }
                }),
                eA = o()(() => t.e(6302).then(t.bind(t, 86302)).then(e => e.ModuleDriverListGraphql), {
                    loadableGenerated: {
                        webpack: () => [86302]
                    }
                }),
                eL = o()(() => t.e(4164).then(t.bind(t, 74164)).then(e => e.ModuleMediaFeature), {
                    loadableGenerated: {
                        webpack: () => [74164]
                    }
                }),
                e_ = o()(() => t.e(8039).then(t.bind(t, 8039)).then(e => e.ModuleMediaFeatureGraphql), {
                    loadableGenerated: {
                        webpack: () => [8039]
                    }
                }),
                eN = o()(() => t.e(4682).then(t.bind(t, 54682)).then(e => e.ModuleGallery), {
                    loadableGenerated: {
                        webpack: () => [54682]
                    }
                }),
                eH = o()(() => t.e(4791).then(t.bind(t, 57172)).then(e => e.ModuleGalleryGraphql), {
                    loadableGenerated: {
                        webpack: () => [57172]
                    }
                }),
                ez = o()(() => t.e(3579).then(t.bind(t, 3579)).then(e => e.ModuleCircuit), {
                    loadableGenerated: {
                        webpack: () => [3579]
                    }
                }),
                eV = o()(() => Promise.all([t.e(3579), t.e(1028)]).then(t.bind(t, 51028)).then(e => e.ModuleCircuitGraphql), {
                    loadableGenerated: {
                        webpack: () => [51028]
                    }
                }),
                eB = o()(() => t.e(6766).then(t.bind(t, 86766)).then(e => e.ModuleSplitLayout), {
                    loadableGenerated: {
                        webpack: () => [86766]
                    }
                }),
                e$ = o()(() => t.e(485).then(t.bind(t, 60485)).then(e => e.ModuleSplitLayoutGraphql), {
                    loadableGenerated: {
                        webpack: () => [60485]
                    }
                }),
                eD = o()(() => Promise.all([t.e(8516), t.e(9370)]).then(t.bind(t, 79370)).then(e => e.ModuleAudioPlayer), {
                    loadableGenerated: {
                        webpack: () => [79370]
                    }
                }),
                eq = o()(() => Promise.all([t.e(8516), t.e(5751)]).then(t.bind(t, 95751)).then(e => e.ModuleAudioPlayerGraphql), {
                    loadableGenerated: {
                        webpack: () => [95751]
                    }
                }),
                eG = o()(() => t.e(1290).then(t.bind(t, 91290)).then(e => e.ModuleIframe), {
                    loadableGenerated: {
                        webpack: () => [91290]
                    }
                }),
                eW = o()(() => t.e(5788).then(t.bind(t, 5788)).then(e => e.ModuleIframeGraphql), {
                    loadableGenerated: {
                        webpack: () => [5788]
                    }
                }),
                eU = o()(() => t.e(3666).then(t.bind(t, 23666)).then(e => e.ModuleSideBySide), {
                    loadableGenerated: {
                        webpack: () => [23666]
                    }
                }),
                eK = o()(() => t.e(7017).then(t.bind(t, 77017)).then(e => e.ModuleSideBySideGraphql), {
                    loadableGenerated: {
                        webpack: () => [77017]
                    }
                }),
                eO = o()(() => t.e(7560).then(t.bind(t, 77560)).then(e => e.ModuleQuickLinks), {
                    loadableGenerated: {
                        webpack: () => [77560]
                    }
                }),
                eQ = o()(() => t.e(2169).then(t.bind(t, 52169)).then(e => e.ModuleQuickLinksGraphql), {
                    loadableGenerated: {
                        webpack: () => [52169]
                    }
                }),
                eX = o()(() => Promise.all([t.e(2673), t.e(4802)]).then(t.bind(t, 84802)).then(e => e.ModuleLiveTimingTable), {
                    loadableGenerated: {
                        webpack: () => [84802]
                    }
                }),
                eY = o()(() => Promise.all([t.e(2673), t.e(351)]).then(t.bind(t, 70351)).then(e => e.ModuleLiveTimingTableGraphql), {
                    loadableGenerated: {
                        webpack: () => [70351]
                    }
                }),
                eZ = {
                    ModuleRichText: m,
                    ModuleImage: N,
                    ModuleVideo: et,
                    ModuleQuote: ey,
                    ModuleTitleAndDescription: ej,
                    ModuleSpacer: z,
                    ModuleDriverList: eI,
                    ModuleCarousel: eP,
                    ModuleGallery: eN,
                    ModuleAccordion: eR,
                    ModuleMediaFeature: eL,
                    ModuleCarTechSpecs: W,
                    ModuleCircuit: ez,
                    ModuleSplitLayout: eB,
                    ModuleTable: ew,
                    ModuleAudioPlayer: eD,
                    ModulePageLinkTile: ec,
                    ModuleListenToTheEngine: ev,
                    ModuleIframe: eG,
                    ModuleSideBySide: eU,
                    ModuleQuickLinks: eO,
                    ModuleLiveTimingTable: eX,
                    Module916VideoImage: eE
                },
                eJ = {
                    ModuleRichText: e => {
                        let {
                            id: n,
                            locale: t,
                            preview: l
                        } = e, {
                            data: a,
                            isLoading: o
                        } = R({
                            id: n,
                            locale: t,
                            preview: l
                        }, { ...!l && {
                                staleTime: 1 / 0
                            },
                            refetchOnWindowFocus: !1
                        }), r = (0, s.qM)(null == a ? void 0 : a.moduleRichText);
                        return o || !r ? null : (0, i.jsx)(m, { ...r
                        })
                    },
                    ModuleImage: e => {
                        let {
                            id: n,
                            locale: t,
                            preview: l,
                            index: a,
                            isEmbedded: o
                        } = e, {
                            data: r,
                            isLoading: c
                        } = (0, j.Jp)({
                            id: n,
                            locale: t,
                            preview: l
                        }, { ...!l && {
                                staleTime: 1 / 0
                            },
                            refetchOnWindowFocus: !1
                        }), d = (0, s.qM)(null == r ? void 0 : r.moduleImage);
                        return c || !d ? null : (0, i.jsx)(N, { ...d,
                            index: a,
                            isEmbedded: o
                        })
                    },
                    ModuleVideo: e => {
                        let {
                            id: n,
                            locale: t,
                            preview: l,
                            index: a,
                            isEmbedded: o
                        } = e, {
                            data: r,
                            isLoading: c
                        } = (0, k.Hz)({
                            id: n,
                            locale: t,
                            preview: l
                        }, { ...!l && {
                                staleTime: 1 / 0
                            },
                            refetchOnWindowFocus: !1
                        }), d = (0, s.qM)(null == r ? void 0 : r.moduleVideo);
                        return c || !d ? null : (0, i.jsx)(et, { ...d,
                            moduleIndex: a,
                            isEmbedded: o
                        })
                    },
                    ModuleQuote: eC,
                    ModuleTitleAndDescription: ek,
                    ModuleSpacer: e => {
                        let {
                            id: n,
                            locale: t,
                            preview: l
                        } = e, {
                            data: a,
                            isLoading: o
                        } = (0, w.Al)({
                            id: n,
                            locale: t,
                            preview: l
                        }, { ...!l && {
                                staleTime: 1 / 0
                            },
                            refetchOnWindowFocus: !1
                        }), r = (0, s.qM)(null == a ? void 0 : a.moduleSpacer);
                        return o || !r ? null : (0, i.jsx)(z, { ...r
                        })
                    },
                    ModuleDriverList: eA,
                    ModuleCarousel: eS,
                    ModuleGallery: eH,
                    Module916VideoImage: eF,
                    ModuleAccordion: eM,
                    ModuleMediaFeature: e_,
                    ModuleCarTechSpecs: e => {
                        var n;
                        let {
                            id: t,
                            locale: l,
                            preview: a,
                            isEmbedded: o,
                            index: r
                        } = e, {
                            data: c,
                            isLoading: d
                        } = (0, U.uB)({
                            id: t,
                            locale: l,
                            preview: a
                        }, { ...!a && {
                                staleTime: 1 / 0
                            },
                            refetchOnWindowFocus: !1
                        }), u = (0, s.qM)(c, {
                            locale: l
                        }), p = null == u || null == (n = u.microcopySetCollection) ? void 0 : n.items[0];
                        return !d && (null == u ? void 0 : u.moduleCarTechSpecs) && p ? (0, i.jsx)(W, { ...u.moduleCarTechSpecs,
                            microcopySet: p,
                            moduleIndex: r,
                            isEmbedded: o
                        }) : null
                    },
                    ModuleCircuit: eV,
                    ModuleSplitLayout: e$,
                    ModuleTable: eT,
                    ModuleAudioPlayer: eq,
                    ModulePageLinkTile: e => {
                        let {
                            id: n,
                            locale: t,
                            preview: l
                        } = e, {
                            data: a,
                            isLoading: o
                        } = eh({
                            id: n,
                            locale: t,
                            preview: l
                        }, { ...!l && {
                                staleTime: 1 / 0
                            },
                            refetchOnWindowFocus: !1
                        }), r = (0, s.qM)(null == a ? void 0 : a.modulePageLinkTile);
                        return o || !r ? null : (0, i.jsx)(ec, { ...r
                        })
                    },
                    ModuleListenToTheEngine: e => {
                        let {
                            id: n,
                            locale: t,
                            preview: l,
                            index: a
                        } = e, {
                            data: o,
                            isLoading: r
                        } = ef({
                            id: n,
                            locale: t,
                            preview: l
                        }, { ...!l && {
                                staleTime: 1 / 0
                            },
                            refetchOnWindowFocus: !1
                        }), c = (0, s.qM)(o, {
                            locale: t
                        });
                        return !r && (null == c ? void 0 : c.moduleListenToTheEngine) ? (0, i.jsx)(ev, { ...null == c ? void 0 : c.moduleListenToTheEngine,
                            moduleIndex: a
                        }) : null
                    },
                    ModuleIframe: eW,
                    ModuleSideBySide: eK,
                    ModuleQuickLinks: eQ,
                    ModuleLiveTimingTable: eY
                },
                e0 = null,
                e1 = e => {
                    let {
                        type: n,
                        previousType: t
                    } = e;
                    return null
                },
                e2 = e => {
                    let {
                        type: n
                    } = e;
                    return null
                },
                e5 = e => {
                    let {
                        componentProps: n,
                        forceGraphql: t,
                        index: a
                    } = e, {
                        isPreview: o,
                        locale: r
                    } = (0, Y.useRouter)(), s = n.__typename, c = eJ[s], d = !(0, l.useMemo)(() => !!t || !!c && void 0 !== n.__typename && void 0 !== n.sys, [c, n, t]) && eZ[n.__typename];
                    return (e0 = String(n.__typename), d || c) ? void 0 === n.__typename || void 0 === n.sys ? (0, i.jsx)(e1, {
                        type: s,
                        previousType: e0
                    }) : d ? (0, i.jsx)(d, { ...n,
                        "data-contentful-module": n.__typename,
                        index: a
                    }) : (0, i.jsx)(c, { ...n,
                        id: n.sys.id,
                        locale: r,
                        preview: o,
                        index: a,
                        "data-contentful-module": n.__typename
                    }) : (0, i.jsx)(e2, {
                        type: s
                    })
                }
        },
        84371: (e, n, t) => {
            t.d(n, {
                J: () => a
            });
            var i = t(6029),
                l = t(76939);
            let a = (0, t(77367).R)((e, n) => (0, i.jsx)(l.$, {
                variant: "secondary",
                theme: "dark",
                ...e,
                ref: n,
                "aria-label": "close",
                icon: "close",
                hideLabel: !0
            }))
        },
        86590: (e, n, t) => {
            t.d(n, {
                Bl: () => d,
                JM: () => c,
                JW: () => u,
                SN: () => h,
                SQ: () => p
            });
            var i = t(18816),
                l = t(91120),
                a = t(29506),
                o = t(63919),
                r = t(78879),
                s = t(17455);
            let c = {
                    xs: "@media (min-width: ".concat(i.$, "px)"),
                    s: "@media (min-width: ".concat(l.f, "px)"),
                    md: "@media (min-width: ".concat(a.f, "px)"),
                    l: "@media (min-width: ".concat(o.m, "px)"),
                    xl: "@media (min-width: ".concat(r.U, "px)"),
                    xxl: "@media (min-width: ".concat(s.o, "px)")
                },
                d = {
                    xs: "@media (max-width: ".concat(i.$ - 1, "px)"),
                    s: "@media (max-width: ".concat(l.f - 1, "px)"),
                    md: "@media (max-width: ".concat(a.f - 1, "px)"),
                    l: "@media (max-width: ".concat(o.m - 1, "px)"),
                    xl: "@media (max-width: ".concat(r.U - 1, "px)"),
                    xxl: "@media (max-width: ".concat(s.o - 1, "px)")
                },
                u = {
                    portrait: "(orientation: portrait)",
                    landscape: "(orientation: landscape)"
                },
                p = {
                    minXs: "(min-width: ".concat(i.$, "px)"),
                    maxXs: "(max-width: ".concat(i.$ - 1, "px)"),
                    minS: "(min-width: ".concat(l.f, "px)"),
                    maxS: "(max-width: ".concat(l.f - 1, "px)"),
                    minM: "(min-width: ".concat(a.f, "px)"),
                    maxM: "(max-width: ".concat(a.f - 1, "px)"),
                    minL: "(min-width: ".concat(o.m, "px)"),
                    maxL: "(max-width: ".concat(o.m - 1, "px)")
                },
                h = {
                    short: "(max-height: 700px)"
                }
        },
        89822: (e, n, t) => {
            t.d(n, {
                C: () => a
            });
            var i = t(35882),
                l = t(71849);
            let a = (0, i.B)("video", {
                shouldForwardProp: e => (0, l.M)(e)
            })
        },
        91514: (e, n, t) => {
            t.d(n, {
                Q: () => u
            });
            var i = t(6029),
                l = t(35882),
                a = t(72813),
                o = t(21593),
                r = t(91753),
                s = t(3591),
                c = t(1730);
            let d = (0, l.B)("button"),
                u = e => {
                    let {
                        onClick: n,
                        icon: t,
                        ariaLabel: l,
                        ariaControlsId: u,
                        ariaExpanded: p,
                        backgroundColor: h = "ndlTransparencyBlack",
                        hoverBackgroundColor: g = "ndlTransparencyGreyHover",
                        backdropBlur: m,
                        borderRadius: x = "ndlRadiusXSmall",
                        size: v = 9,
                        iconTheme: b = "dark",
                        ...f
                    } = e;
                    return (0, i.jsx)(d, {
                        type: "button",
                        "aria-controls": u,
                        "aria-expanded": p,
                        "aria-label": l,
                        onClick: n,
                        borderRadius: x,
                        backgroundColor: h,
                        backdropFilter: m ? "auto" : void 0,
                        backdropBlur: m,
                        width: v,
                        height: v,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "none",
                        outline: "none",
                        cursor: "pointer",
                        transitionProperty: "background-color",
                        transitionDuration: "short",
                        _focusVisible: { ...(0, c.g)(),
                            borderRadius: x
                        },
                        _hover: {
                            backgroundColor: g
                        },
                        ...f,
                        children: (0, i.jsx)(a.a, {
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            children: (0, i.jsx)(o.N, {
                                initial: !1,
                                children: (0, i.jsx)(r.e, {
                                    as: "span",
                                    position: "absolute",
                                    inset: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    initial: {
                                        opacity: 0
                                    },
                                    animate: {
                                        opacity: 1
                                    },
                                    exit: {
                                        opacity: 0
                                    },
                                    transition: {
                                        duration: .3,
                                        ease: "easeInOut"
                                    },
                                    children: (0, i.jsx)(s.I, {
                                        name: t,
                                        theme: b
                                    })
                                }, t)
                            })
                        })
                    })
                }
        },
        91753: (e, n, t) => {
            t.d(n, {
                a: () => l.a,
                e: () => a
            });
            var i = t(3141),
                l = t(72813);
            let a = (0, i.P)(l.a)
        },
        94169: (e, n, t) => {
            t.d(n, {
                v: () => d,
                z: () => u
            });
            var i = t(6029),
                l = t(55729),
                a = t(68982);
            let o = (0, l.createContext)(void 0),
                r = (e, n) => {
                    switch (n.type) {
                        case "PLAY":
                            return { ...e,
                                isPlaying: !0
                            };
                        case "PAUSE":
                            return { ...e,
                                isPlaying: !1
                            };
                        case "USER_PAUSED":
                            return { ...e,
                                userPaused: !0
                            };
                        case "USER_UNPAUSED":
                            return { ...e,
                                userPaused: !1
                            };
                        case "MUTE":
                            return { ...e,
                                isMuted: !0
                            };
                        case "UNMUTE":
                            return { ...e,
                                isMuted: !1
                            };
                        case "SHOW_PICTURE_IN_PICTURE":
                            return { ...e,
                                isShowingPiP: !0
                            };
                        case "HIDE_PICTURE_IN_PICTURE":
                            return { ...e,
                                isShowingPiP: !1
                            };
                        case "SET_PLAYED":
                            return { ...e,
                                played: n.payload
                            };
                        case "SET_DURATION":
                            return { ...e,
                                duration: n.payload
                            };
                        case "SET_IS_SEEKING":
                            return { ...e,
                                isSeeking: n.payload
                            };
                        default:
                            return e
                    }
                },
                s = {
                    isPlaying: !0,
                    isMuted: !0,
                    isLoop: !0,
                    playerRef: null,
                    duration: 0,
                    played: {
                        played: 0,
                        playedSeconds: 0,
                        loaded: 0,
                        loadedSeconds: 0
                    },
                    isSeeking: !1,
                    isShowingFullscreen: !1,
                    isShowingPiP: !1,
                    autoplay: !1,
                    userPaused: !1
                },
                c = e => {
                    let {
                        prefersReducedMotion: n,
                        autoplay: t
                    } = e;
                    return null == t || n ? !n : !!t
                },
                d = e => {
                    let {
                        children: n,
                        loop: t,
                        muted: d,
                        autoplay: u
                    } = e, p = (0, a.j)({
                        ssr: !0,
                        fallback: !0
                    }), h = (0, l.createRef)(), [g, m] = (0, l.useReducer)(r, { ...s,
                        isPlaying: c({
                            prefersReducedMotion: p,
                            autoplay: u
                        }),
                        ...null != d && {
                            isMuted: d
                        },
                        ...null != t && {
                            isLoop: t
                        },
                        ...null != u && {
                            autoplay: u
                        },
                        playerRef: h
                    });
                    (0, l.useEffect)(() => {
                        c({
                            prefersReducedMotion: p,
                            autoplay: u
                        }) && !g.isPlaying && m({
                            type: "PLAY"
                        })
                    }, [p]);
                    let x = (0, l.useMemo)(() => ({
                        state: g,
                        dispatch: m
                    }), [g, m]);
                    return (0, i.jsx)(o.Provider, {
                        value: x,
                        children: n
                    })
                };
            d.displayName = "CldVideoPlayerProvider";
            let u = () => {
                let e = (0, l.useContext)(o);
                if (!e) throw Error("useCldVideoPlayer must be used within CldVideoPlayerProvider");
                return e
            }
        },
        94771: (e, n, t) => {
            t.d(n, {
                d: () => s
            });
            var i = t(6029),
                l = t(19666),
                a = t(35882),
                o = t(55729);
            let r = (0, a.B)(l.n),
                s = (0, o.forwardRef)(function(e, n) {
                    let {
                        type: t = "button",
                        ...l
                    } = e;
                    return (0, i.jsx)(r, {
                        type: t,
                        ...l,
                        ref: n
                    })
                })
        },
        97063: (e, n, t) => {
            t.d(n, {
                c: () => l
            });
            var i = t(54598);
            let l = (0, t(35882).B)(i.m)
        },
        98168: (e, n, t) => {
            t.d(n, {
                D: () => i
            });
            let i = t(48674).D
        },
        98964: (e, n, t) => {
            t.d(n, {
                P: () => h
            });
            var i = t(6029),
                l = t(40697),
                a = t(35882),
                o = t(55729),
                r = t(89822),
                s = t(81085),
                c = t(96538),
                d = t(16768),
                u = t(37049),
                p = t(77396);
            let h = (0, o.forwardRef)((e, n) => {
                let {
                    wrapperProps: t,
                    cloudinaryAsset: h,
                    watchIsInView: g = !0,
                    autoPlay: m = !0,
                    warm: x = !1,
                    onFirstFrame: v,
                    children: b,
                    aiTagPosition: f,
                    aiTagOffset: y,
                    hideAiTag: C,
                    ...j
                } = e, {
                    ariaDescribedBy: k,
                    tag: w
                } = (0, p.C)(h, "video", {
                    aiTagPosition: f,
                    aiTagOffset: y,
                    hideAiTag: C
                }), T = (0, o.useRef)(null), P = (0, o.useRef)(null), S = (0, l.SV)(P, n), E = (0, u.W)(T, {
                    once: !0,
                    margin: "300px 0px"
                }), F = (0, u.W)(T, {
                    once: !0,
                    margin: "0px"
                }), R = (0, o.useRef)(!1), M = (0, d.L)({
                    cloudinaryAsset: h
                }), I = (0, o.useMemo)(() => (0, s.VZ)(h), [h]), A = (0, o.useMemo)(() => (0, c.gV)({
                    src: h[0].public_id
                }), [h]), L = x || !g || E, {
                    src: _,
                    preload: N
                } = function(e, n, t) {
                    return e && t ? {
                        src: t,
                        preload: "auto"
                    } : {
                        src: n,
                        preload: "none"
                    }
                }(L, A, M);
                return ! function(e, n, t) {
                    (0, o.useEffect)(() => {
                        let t = e.current;
                        if (!t) return;
                        if (!n) return void t.pause();
                        let i = !1,
                            l = () => {
                                i || function(e) {
                                    let n = e.play();
                                    void 0 !== n && n.catch(() => void 0)
                                }(t)
                            };
                        return t.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA ? void l() : (t.addEventListener("loadeddata", l, {
                            once: !0
                        }), () => {
                            i = !0, t.removeEventListener("loadeddata", l)
                        })
                    }, [e, n, t])
                }(P, !!(m && L && (!g || F)), _), (0, o.useEffect)(() => {
                    let e = P.current;
                    e && !e.muted && (e.muted = !0)
                }, []), (0, i.jsxs)(a.B.div, {
                    borderRadius: "large",
                    ref: T,
                    __css: {
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        bg: "porscheBlack"
                    },
                    ...t,
                    style: function(e) {
                        if (e) return {
                            backgroundImage: "url(".concat(e, ")"),
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }
                    }(I),
                    children: [(0, i.jsx)(r.C, { ...j,
                        ref: S,
                        src: _,
                        preload: N,
                        autoPlay: !1,
                        muted: !0,
                        loop: !0,
                        playsInline: !0,
                        poster: I,
                        objectFit: "cover",
                        position: "absolute",
                        zIndex: 0,
                        width: "100%",
                        height: "100%",
                        suppressHydrationWarning: !0,
                        "aria-describedby": k,
                        onLoadedData: () => (function(e, n, t) {
                            if (n.current || !t) return;
                            let i = () => {
                                n.current = !0, t()
                            };
                            if (e && "requestVideoFrameCallback" in HTMLVideoElement.prototype) return void e.requestVideoFrameCallback(i);
                            i()
                        })(P.current, R, v),
                        children: b
                    }), w]
                })
            });
            h.displayName = "CldVideoLite"
        }
    }
]);
//# sourceMappingURL=5223-477244852072a5ad.js.map