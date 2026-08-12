"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [3933], {
        2584: (e, t, r) => {
            r.d(t, {
                D: () => p,
                w: () => g
            });
            var i = r(6029),
                n = r(55729),
                a = r(18898),
                l = r(63504),
                s = r(36011),
                o = r(72813),
                d = r(91753),
                c = r(73738);
            let u = (0, n.createContext)(void 0),
                p = e => {
                    let {
                        opacity: t,
                        textColor: r = c.A.grey500,
                        children: n
                    } = e;
                    return (0, i.jsx)(u.Provider, {
                        value: r,
                        children: (0, i.jsx)(o.a, {
                            opacity: t,
                            overflow: "visible",
                            px: {
                                base: 4,
                                md: 6
                            },
                            py: {
                                base: 5,
                                md: 7
                            },
                            children: n
                        })
                    })
                },
                h = (0, a.OQ)(1),
                m = e => {
                    let t = Math.max(0, Math.min(1, e));
                    return t * t * (3 - 2 * t)
                },
                f = e => Math.max(0, Math.min(1, e)) ** 2.65,
                g = e => {
                    var t;
                    let {
                        entryProgress: r,
                        exitProgress: o,
                        entryProgressRange: p = [.5, 1],
                        exitProgressRange: g,
                        entryTranslateYPx: v = 30,
                        entryBlurRadiusRange: x = [10, 0],
                        playOnce: b = !1,
                        textColor: y,
                        children: w
                    } = e, j = (0, n.useContext)(u), R = null != (t = null != y ? y : j) ? t : c.A.grey500, k = (0, n.useRef)(!1), C = x[1], M = x[0], T = null != o && null != g ? {
                        progress: o,
                        range: g
                    } : null, I = null !== T, z = null !== T ? T.progress : r, P = null !== T ? T.range : [0, 1], G = (0, l.G)(r, p, ["".concat(v, "px"), "0px"]), E = (0, l.G)(r, p, [0, 1]), S = (0, l.G)(r, p, x), N = (0, l.G)(r, p, [.96, 1]), _ = (0, l.G)(z, e => {
                        if (!I) return 0;
                        let [t, r] = P;
                        return e <= t ? 0 : e >= r ? 1 : (e - t) / (r - t)
                    }), V = (0, l.G)(_, e => 1 - m(e)), L = (0, l.G)(_, e => m(e) * M), A = (0, n.useCallback)(e => {
                        b && !k.current && e >= p[1] && (k.current = !0)
                    }, [b, p]);
                    (0, s.L)(r, "change", A);
                    let F = (0, n.useMemo)(() => (0, a.OQ)(C), [C]),
                        W = b && k.current,
                        D = (0, l.G)(E, f),
                        B = W ? h : D,
                        H = (0, l.G)([B, V], e => {
                            let [t, r] = e;
                            return Math.min(t, r)
                        }),
                        O = (0, l.G)([W ? F : S, L], e => {
                            let [t, r] = e;
                            return Math.max(t, r)
                        }),
                        U = (0, l.G)(O, e => "blur(".concat(e, "px)")),
                        q = (0, l.G)(H, e => .72 + .28 * Math.max(0, Math.min(1, e)) ** 1.9),
                        Q = (0, l.G)(B, e => .95 + .050000000000000044 * Math.max(0, Math.min(1, e)) ** 1.9),
                        Z = (0, l.G)(H, e => {
                            if (e >= 1 - 1e-6) return "none";
                            let t = 18 + Math.max(0, Math.min(1, e)) ** 3.15 * 82,
                                r = Math.min(100, t + 18),
                                i = Math.min(100, r + 10);
                            return "linear-gradient(to right, ".concat("rgba(0, 0, 0, 1)", " ").concat(t, "%, ").concat("rgba(0, 0, 0, 0.58)", " ").concat(r, "%, ").concat("rgba(0, 0, 0, 0.24)", " ").concat(i, "%)")
                        });
                    return (0, i.jsx)(d.e, {
                        as: "span",
                        display: "block",
                        style: {
                            y: W ? 0 : G,
                            filter: U,
                            scale: W ? h : N,
                            overflow: "visible"
                        },
                        children: (0, i.jsx)(d.e, {
                            as: "span",
                            display: "block",
                            style: {
                                opacity: q,
                                scale: Q,
                                color: R,
                                WebkitMaskImage: Z,
                                maskImage: Z,
                                overflow: "visible"
                            },
                            children: w
                        })
                    })
                }
        },
        13933: (e, t, r) => {
            r.r(t), r.d(t, {
                NewsSection: () => z
            });
            var i = r(6029),
                n = r(55729),
                a = r(25653),
                l = r(63504),
                s = r(71024),
                o = r.n(s),
                d = r(72813),
                c = r(91753),
                u = r(23900),
                p = r(2584),
                h = r(96377),
                m = r(45253),
                f = r(73738),
                g = r(96692),
                v = r(14221),
                x = r(63560),
                b = r(31147),
                y = r(86291),
                w = r(24561),
                j = r(21450);
            let R = o()(() => Promise.all([r.e(4820), r.e(9074), r.e(1477)]).then(r.bind(r, 81477)).then(e => e.MobileCarousel), {
                    loadableGenerated: {
                        webpack: () => [81477]
                    },
                    ssr: !1,
                    loading: () => (0, i.jsx)(d.a, {
                        minHeight: "460px",
                        "aria-hidden": !0
                    })
                }),
                k = o()(() => r.e(3689).then(r.bind(r, 23689)).then(e => e.DesktopMarquee), {
                    loadableGenerated: {
                        webpack: () => [23689]
                    },
                    ssr: !1,
                    loading: () => (0, i.jsx)(d.a, {
                        minHeight: "538px",
                        "aria-hidden": !0
                    })
                }),
                C = {
                    rootMargin: "200px",
                    threshold: [0, .1, .3]
                },
                M = (e, t, r) => {
                    if (t.current || !e.isIntersecting || e.intersectionRatio <= .3) return;
                    let {
                        width: i,
                        height: n
                    } = e.boundingClientRect;
                    i <= 0 || n <= 0 || (t.current = !0, r(!0))
                },
                T = (e, t) => {
                    let r = e.isIntersecting;
                    if (r !== t.lastVisibilityRef.current) {
                        if (t.lastVisibilityRef.current = r, clearTimeout(t.visibilityTimerRef.current), r) return void(0, n.startTransition)(() => t.setIsCarouselVisible(!0));
                        t.visibilityTimerRef.current = setTimeout(() => (0, n.startTransition)(() => t.setIsCarouselVisible(!1)), 150)
                    }
                },
                I = (e, t) => {
                    var r;
                    let i = t.videoRef.current;
                    if (i) {
                        if (e.isIntersecting && !t.didUpgradePreloadRef.current) {
                            t.didUpgradePreloadRef.current = !0;
                            let e = navigator.connection;
                            (null == e ? void 0 : e.saveData) || (i.preload = "auto")
                        }
                        if (e.isIntersecting && e.intersectionRatio >= .1) {
                            clearTimeout(t.pauseResetTimerRef.current), t.pauseResetTimerRef.current = void 0, !t.reducedMotionRef.current && i.paused && (t.playPromiseRef.current = i.play().catch(() => void 0));
                            return
                        }
                        i.paused || ((e, t) => {
                            let r = t.current;
                            if (r) {
                                r.then(() => e.pause()), t.current = null;
                                return
                            }
                            e.pause()
                        })(i, t.playPromiseRef), null != (r = t.pauseResetTimerRef).current || (r.current = setTimeout(() => {
                            t.pauseResetTimerRef.current = void 0, i.currentTime = 0
                        }, 250))
                    }
                },
                z = (0, n.memo)(function(e) {
                    let {
                        newsSectionTitle: t,
                        newsSectionTitle2: r,
                        newsSectionCarouselItemsCollection: s,
                        newsPages: o
                    } = e, z = (0, x.N)(y.y.news), P = (0, n.useRef)(null), G = (0, n.useRef)(null), E = (0, n.useRef)(null), S = (0, n.useMemo)(() => {
                        var e, t, r, i;
                        let n = [],
                            a = new Set;
                        for (let r of null != (e = null == s ? void 0 : s.items) ? e : []) null !== r && (n.push(r), (null == (t = r.sys) ? void 0 : t.id) && a.add(r.sys.id));
                        for (let e of null != (r = null == o ? void 0 : o.items) ? r : []) null === e || a.has(null == (i = e.sys) ? void 0 : i.id) || n.push(e);
                        return n
                    }, [o, s]), N = (0, n.useMemo)(() => S.slice(0, 15), [S]), _ = N.length >= 5, V = !_ && N.length > 0, {
                        scrollYProgress: L
                    } = (0, a.L)({
                        target: P,
                        offset: ["start end", "start start"]
                    }), A = (0, l.G)(L, [0, .4, .7, .9, 1], ["50vh", "20vh", "6vh", "1vh", "0vh"]), F = [null == t ? void 0 : t.trim(), null == r ? void 0 : r.trim()].filter(Boolean), {
                        isDesktopMd: W
                    } = (0, g.uS)(), {
                        prefersReducedMotion: D
                    } = (0, g.P2)(), B = (0, n.useRef)(D);
                    B.current = D;
                    let H = (0, n.useRef)(null),
                        [O, U] = (0, n.useState)(!1),
                        [q, Q] = (0, n.useState)(!1),
                        Z = (0, n.useRef)(),
                        X = (0, n.useRef)(!1),
                        Y = (0, n.useRef)(!1),
                        J = (0, n.useRef)(null),
                        K = (0, n.useRef)(),
                        $ = (0, n.useRef)(!1),
                        ee = (0, n.useRef)(!1);
                    (0, n.useEffect)(() => {
                        if (!ee.current) {
                            ee.current = !0;
                            return
                        }
                        let e = G.current;
                        if (!e) return;
                        let t = !e.paused;
                        e.load(), t && !B.current && (J.current = e.play().catch(() => void 0))
                    }, [z.mp4, z.webm]);
                    let [et, er] = (0, n.useState)(!0), ei = (0, n.useRef)(!1), en = () => {
                        if (B.current || ei.current) return;
                        let e = G.current;
                        e && "requestVideoFrameCallback" in HTMLVideoElement.prototype ? e.requestVideoFrameCallback(() => {
                            ei.current = !0, er(!1)
                        }) : (ei.current = !0, er(!1))
                    }, ea = () => {
                        ei.current = !1, er(!0)
                    };
                    return (0, n.useEffect)(() => {
                        let e, t, r = H.current,
                            i = E.current;
                        if (G.current && G.current.readyState >= 2 && en(), !r && !i) return;
                        let n = new IntersectionObserver((e = {
                            entranceFiredRef: Y,
                            lastVisibilityRef: X,
                            visibilityTimerRef: Z,
                            setCarouselEntranceReady: U,
                            setIsCarouselVisible: Q
                        }, t = {
                            playPromiseRef: J,
                            reducedMotionRef: B,
                            pauseResetTimerRef: K,
                            videoRef: G,
                            didUpgradePreloadRef: $
                        }, n => {
                            for (let a of n) a.target === r && (M(a, e.entranceFiredRef, e.setCarouselEntranceReady), T(a, e)), a.target === i && I(a, t)
                        }), C);
                        return r && n.observe(r), i && n.observe(i), () => {
                            clearTimeout(Z.current), clearTimeout(K.current), n.disconnect()
                        }
                    }, []), (0, i.jsx)(d.a, {
                        as: "section",
                        "aria-label": "News",
                        id: b.Z.news,
                        ref: P,
                        position: "relative",
                        zIndex: "40",
                        marginTop: "-50vh",
                        minHeight: "100svh",
                        sx: {
                            contentVisibility: "auto",
                            containIntrinsicSize: "0 calc(100vh + 535px)"
                        },
                        children: (0, i.jsxs)(c.e, {
                            overflow: "hidden",
                            position: "relative",
                            minHeight: "100svh",
                            style: D ? void 0 : {
                                y: A
                            },
                            children: [(0, i.jsxs)(d.a, {
                                ref: E,
                                position: "relative",
                                height: "100svh",
                                width: "full",
                                overflow: "hidden",
                                backgroundColor: "#08040b",
                                _after: {
                                    content: '""',
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: "40%",
                                    background: "linear-gradient(to bottom, transparent, #08040b)",
                                    zIndex: 1,
                                    pointerEvents: "none"
                                },
                                children: [(0, i.jsx)(d.a, {
                                    position: "absolute",
                                    inset: "0",
                                    zIndex: 0,
                                    pointerEvents: "none",
                                    style: {
                                        opacity: +!!et,
                                        transition: "opacity 0.3s ease"
                                    },
                                    "aria-hidden": "true",
                                    children: (0, i.jsx)(u.Z, {
                                        src: "/homepage/news/news-poster.png",
                                        alt: "",
                                        fill: !0,
                                        sx: {
                                            objectFit: "cover",
                                            objectPosition: "center"
                                        }
                                    })
                                }), (0, i.jsxs)(v.L, {
                                    ref: G,
                                    preload: "metadata",
                                    onCanPlay: en,
                                    onLoadedData: en,
                                    onError: ea,
                                    children: [z.webm && (0, i.jsx)("source", {
                                        src: z.webm,
                                        type: "video/webm"
                                    }), (0, i.jsx)("source", {
                                        src: z.mp4,
                                        type: "video/mp4",
                                        onError: ea
                                    })]
                                }), (0, i.jsx)(c.e, {
                                    position: "absolute",
                                    top: "12.2vh",
                                    left: "0",
                                    right: "0",
                                    display: "flex",
                                    justifyContent: "center",
                                    overflow: "visible",
                                    children: (0, i.jsx)(w.H, {
                                        display: "flex",
                                        justifyContent: "center",
                                        children: (0, i.jsx)(p.D, {
                                            textColor: f.A.allWhite,
                                            children: (0, i.jsx)(h.U, {
                                                as: "h2",
                                                size: "displaySmall",
                                                textAlign: "center",
                                                whiteSpace: "pre-line",
                                                overflow: "visible",
                                                sx: {
                                                    textWrap: "balance"
                                                },
                                                children: F.map(e => D ? (0, i.jsx)("span", {
                                                    children: e
                                                }, e) : (0, i.jsx)(p.w, {
                                                    entryProgress: L,
                                                    children: e
                                                }, e))
                                            })
                                        })
                                    })
                                })]
                            }), _ && (0, i.jsx)(d.a, {
                                ref: H,
                                position: "relative",
                                zIndex: "1",
                                marginTop: {
                                    base: "-30vh",
                                    md: "-30vh"
                                },
                                children: (0, i.jsx)(d.a, {
                                    position: "relative",
                                    width: "full",
                                    background: "linear-gradient(to bottom, transparent 0%, #08040b 12vh)",
                                    px: {
                                        base: 4,
                                        md: 10
                                    },
                                    py: {
                                        base: 6,
                                        md: 12
                                    },
                                    overflow: "hidden",
                                    minHeight: {
                                        base: "460px",
                                        md: "635px"
                                    },
                                    children: W ? (0, i.jsx)(k, {
                                        items: N,
                                        play: q,
                                        entranceReady: O
                                    }) : (0, i.jsx)(R, {
                                        items: N,
                                        showNavigation: !0
                                    })
                                })
                            }), V && (0, i.jsx)(d.a, {
                                position: "relative",
                                zIndex: "1",
                                marginTop: {
                                    base: "-30vh",
                                    md: "-30vh"
                                },
                                children: (0, i.jsx)(d.a, {
                                    position: "relative",
                                    width: "full",
                                    background: "linear-gradient(to bottom, transparent 0%, #08040b 12vh)",
                                    px: {
                                        base: 4,
                                        md: 10
                                    },
                                    py: {
                                        base: 6,
                                        md: 12
                                    },
                                    children: (0, i.jsx)(m.s, {
                                        flexWrap: "wrap",
                                        gap: 4,
                                        justifyContent: "center",
                                        children: N.map(e => (0, i.jsx)(d.a, {
                                            width: {
                                                base: "full",
                                                md: "300px"
                                            },
                                            height: "400px",
                                            children: (0, i.jsx)(j.C, {
                                                item: e,
                                                cardSize: "large"
                                            })
                                        }, e.sys.id))
                                    })
                                })
                            })]
                        })
                    })
                });
            z.displayName = "NewsSection"
        },
        14221: (e, t, r) => {
            r.d(t, {
                L: () => l
            });
            var i = r(6029),
                n = r(77367),
                a = r(35882);
            let l = (0, n.R)((e, t) => {
                let {
                    preload: r = "metadata",
                    ...n
                } = e;
                return (0, i.jsx)(a.B.video, {
                    width: "full",
                    height: "full",
                    objectFit: "cover",
                    muted: !0,
                    playsInline: !0,
                    preload: r,
                    "aria-hidden": "true",
                    ref: t,
                    ...n
                })
            });
            l.displayName = "ScrubVideo"
        },
        21450: (e, t, r) => {
            r.d(t, {
                C: () => M
            });
            var i = r(6029),
                n = r(55729),
                a = r(81278),
                l = r(81085),
                s = r(72813),
                o = r(98964),
                d = r(15617),
                c = r(31219),
                u = r(36760),
                p = r(73186),
                h = r(28526),
                m = r(84721),
                f = r(41684),
                g = r(72744),
                v = r(6937),
                x = r(32902),
                b = r(23518),
                y = r(93066),
                w = r(80321);
            let j = {
                    large: "3:4",
                    medium: "3:2",
                    small: "1:1"
                },
                R = {
                    large: "(min-width: ".concat(v.A.md, ") 424px, 92vw"),
                    medium: "(min-width: ".concat(v.A.md, ") 457px, 92vw"),
                    small: "(min-width: ".concat(v.A.md, ") 220px, 92vw")
                },
                k = {
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical"
                };

            function C(e) {
                let {
                    asset: t,
                    cardSize: r,
                    disableVideo: n,
                    imageLoading: a
                } = e;
                return (0, l.QR)(t) ? n ? (0, i.jsx)(s.a, {
                    as: "img",
                    src: (0, l.VZ)(t),
                    alt: "",
                    loading: a,
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    inset: 0,
                    objectFit: "cover"
                }) : (0, i.jsx)(o.P, {
                    cloudinaryAsset: t,
                    wrapperProps: {
                        position: "absolute"
                    },
                    loop: !0,
                    "aria-hidden": "true",
                    children: (0, i.jsx)("track", {
                        kind: "captions",
                        srcLang: "en",
                        label: "English",
                        src: "data:text/vtt,WEBVTT"
                    })
                }) : (0, i.jsx)(d.d, {
                    cloudinaryAsset: t,
                    sizes: R[r],
                    crop: {
                        type: "thumb",
                        aspectRatio: j[r]
                    },
                    fill: !0,
                    loading: a
                })
            }
            let M = (0, n.memo)(function(e) {
                var t;
                let {
                    item: r,
                    cardSize: o = "large",
                    disableVideo: d = !1,
                    imageLoading: v = "lazy"
                } = e, j = (0, n.useId)(), R = (e => {
                    var t, r;
                    switch (null == e ? void 0 : e.__typename) {
                        case "PageDriver":
                            return null == e || null == (t = e.driver) ? void 0 : t.asset;
                        case "PageTeam":
                            return null == e || null == (r = e.team) ? void 0 : r.asset;
                        case "ModuleImage":
                            return null == e ? void 0 : e.asset;
                        default:
                            return null == e ? void 0 : e.heroAsset
                    }
                })(r), {
                    locale: M
                } = (0, a.useRouter)(), {
                    state: {
                        pageType: T,
                        pageId: I,
                        pageContentTags: z
                    }
                } = (0, y.CU)();
                if (!r) return null;
                let P = "ModuleImage" === r.__typename,
                    G = "ModuleImage" === r.__typename ? r.title : null != (t = r.linkTitle) ? t : r.title,
                    E = !P,
                    S = E ? (0, b.s6)(r) : void 0,
                    N = E ? c.Q : s.a;
                return (0, i.jsxs)(N, {
                    "data-group": !0,
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "ndlRadiusMedium",
                    width: "full",
                    height: "full",
                    ...E && {
                        cursor: "pointer"
                    },
                    children: [(0, l.jT)(R) && (0, i.jsx)(s.a, {
                        position: "absolute",
                        inset: 0,
                        zIndex: 0,
                        children: (0, i.jsx)(C, {
                            asset: R,
                            cardSize: o,
                            disableVideo: d,
                            imageLoading: v
                        })
                    }), (0, i.jsx)(s.a, {
                        position: "absolute",
                        inset: 0,
                        zIndex: 1,
                        bgGradient: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%)"
                    }), (0, i.jsxs)(u.T, {
                        position: "relative",
                        zIndex: 2,
                        width: "full",
                        height: "full",
                        justifyContent: "space-between",
                        p: 4,
                        children: [(0, i.jsx)(p.z, {
                            justifyContent: "space-between",
                            alignItems: "start",
                            width: "full",
                            children: E && (0, i.jsx)(h.v, {
                                "aria-labelledby": j,
                                onClick: () => {},
                                variant: "icon",
                                size: "large",
                                colorScheme: "grey",
                                tabIndex: -1,
                                marginLeft: "auto",
                                children: (0, i.jsx)(m.E, {
                                    name: "arrow-right-up"
                                })
                            })
                        }), (0, i.jsxs)(u.T, {
                            pb: 2,
                            alignItems: "start",
                            justifyContent: "start",
                            mr: "auto",
                            gap: .5,
                            children: [!P && (0, i.jsx)(x.P, {
                                item: r,
                                size: "caption",
                                color: "grey200"
                            }), E && S ? (0, i.jsx)(c.r, {
                                as: f.S,
                                href: S,
                                id: j,
                                onClick: () => {
                                    (0, w.yn)({
                                        eventAction: w.wT.linkClick,
                                        locale: M,
                                        pageExperience: {
                                            pageCategory: T,
                                            contentTags: null != z ? z : []
                                        },
                                        context: {
                                            moduleName: w.B7.newsSection
                                        },
                                        componentClick: {
                                            clickElementType: "navigation",
                                            clickElementId: I,
                                            clickElementName: "Card ".concat(r.__typename, ": ").concat(null != G ? G : ""),
                                            targetUrl: S,
                                            targetType: "internal"
                                        }
                                    })
                                },
                                ...G && {
                                    title: G
                                },
                                children: (0, i.jsx)(g.X, {
                                    size: "headerM",
                                    color: "allWhite",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    sx: k,
                                    children: G
                                })
                            }) : G && (0, i.jsx)(g.X, {
                                size: "headerM",
                                color: "allWhite",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                sx: k,
                                children: G
                            })]
                        })]
                    })]
                })
            });
            M.displayName = "NewsCard"
        },
        23900: (e, t, r) => {
            r.d(t, {
                Z: () => s
            });
            var i = r(35882),
                n = r(8588),
                a = r.n(n);
            let l = ["src", "alt", "sizes", "width", "height", "fill", "loader", "quality", "priority", "loading", "placeholder", "blurDataURL", "unoptimized", "onLoad", "crossOrigin", "decoding", "referrerPolicy", "useMap"],
                s = (0, i.B)(a(), {
                    shouldForwardProp: e => l.includes(e)
                })
        },
        96377: (e, t, r) => {
            r.d(t, {
                U: () => d
            });
            var i = r(6029),
                n = r(77367),
                a = r(69757),
                l = r(38275),
                s = r(35882),
                o = r(21938);
            let d = (0, n.R)((e, t) => {
                let r = (0, a.V)("FluidTypography", e),
                    {
                        className: n,
                        as: d = "h2",
                        children: c,
                        ...u
                    } = (0, l.M)(e);
                return (0, i.jsx)(s.B.h2, {
                    ref: t,
                    as: d,
                    __css: r,
                    className: (0, o.cx)("fluid-typography", n),
                    ...u,
                    children: c
                })
            });
            d.displayName = "FluidTypography"
        }
    }
]);
//# sourceMappingURL=3933.a07d0ccf01beb04f.js.map