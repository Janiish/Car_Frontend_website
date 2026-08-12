"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [7916], {
        25841: (e, t, n) => {
            n.d(t, {
                T: () => s
            });
            var r = n(55729),
                i = n(81278),
                a = n(93066),
                o = n(80321);
            let l = {
                    pagination: o.wT.carouselPaginationButtonClick,
                    next: o.wT.carouselNavigationNextButtonClick,
                    prev: o.wT.carouselNavigationPrevButtonClick
                },
                s = (e, t) => {
                    let {
                        locale: n
                    } = (0, i.useRouter)(), {
                        state: {
                            pageType: s,
                            pageId: c,
                            pageContentTags: u
                        }
                    } = (0, a.CU)();
                    return (0, r.useCallback)((r, i) => {
                        let a, d = l[r],
                            p = t ? '"'.concat(t, '"') : e;
                        a = "pagination" === r ? "Carousel ".concat(p, " pagination index button clicked:").concat(null != i ? i : "") : "Carousel ".concat(p, ": ").concat("next" === r ? "Next button" : "Previous button"), (0, o.yn)({
                            eventAction: d,
                            locale: n,
                            pageExperience: {
                                pageCategory: s,
                                contentTags: null != u ? u : []
                            },
                            context: {
                                moduleName: e
                            },
                            componentClick: {
                                clickElementType: "interaction",
                                clickElementId: c,
                                clickElementName: a
                            }
                        })
                    }, [e, t, n, s, c, u])
                }
        },
        27916: (e, t, n) => {
            n.r(t), n.d(t, {
                HistorySection: () => ea
            });
            var r = n(6029),
                i = n(55729),
                a = n(25653),
                o = n(63504),
                l = n(36011),
                s = n(19315),
                c = n(72813),
                u = n(91753),
                d = n(2584),
                p = n(96377),
                h = n(96692),
                f = n(81278),
                m = n(81085),
                g = n(43914),
                x = n(83800),
                v = n(72744),
                y = n(67408),
                w = n(81624),
                b = n(93066),
                C = n(80321),
                S = n(86590),
                T = n(55156);
            let j = {
                    desktop: "".concat(S.SQ.minL, " and ").concat(S.JW.landscape),
                    tabletLandscape: "".concat(S.SQ.minS, " and ").concat(S.SQ.maxL, " and ").concat(S.JW.landscape),
                    tabletPortrait: "".concat(S.SQ.minS, " and ").concat(S.JW.portrait),
                    shortPhone: "".concat(S.SQ.maxS, " and ").concat(S.SN.short)
                },
                k = {
                    fallback: "3:5",
                    variants: [{
                        id: "desktop",
                        condition: j.desktop,
                        ratio: "2:1"
                    }, {
                        id: "tabletLandscape",
                        condition: j.tabletLandscape,
                        ratio: "16:9"
                    }, {
                        id: "tabletPortrait",
                        condition: j.tabletPortrait,
                        ratio: "3:4"
                    }, {
                        id: "shortPhone",
                        condition: j.shortPhone,
                        ratio: "10:16"
                    }]
                },
                E = {
                    aspectRatio: T.A[k.fallback],
                    ...Object.fromEntries(k.variants.map(e => ["@media ".concat(e.condition), {
                        aspectRatio: T.A[e.ratio]
                    }]))
                },
                P = k.variants.map(e => ({
                    media: e.condition,
                    crop: {
                        aspectRatio: e.ratio,
                        type: "fill",
                        gravity: "auto"
                    }
                })),
                M = {
                    aspectRatio: k.fallback,
                    type: "fill",
                    gravity: "auto"
                },
                R = "16px",
                I = "32px",
                A = "".concat(S.SQ.minS, " and ").concat(S.SQ.maxM, " and ").concat(S.JW.portrait),
                D = {
                    left: R,
                    right: R,
                    bottom: R,
                    ["@media ".concat(j.tabletPortrait)]: {
                        right: I,
                        bottom: I
                    },
                    ["@media ".concat(j.desktop)]: {
                        right: I,
                        bottom: I
                    },
                    ["@media ".concat(A)]: {
                        left: I
                    },
                    ["@media ".concat(S.SQ.minM)]: {
                        left: "auto"
                    }
                };
            var L = n(6937);
            let N = "(min-width: ".concat(L.A.md, ") 77vw, 91vw"),
                H = (0, i.memo)(function(e) {
                    var t;
                    let {
                        startYear: n,
                        endYear: a,
                        asset: o,
                        isActive: l = !1,
                        isDesktop: s = !1,
                        isShortViewport: d = !1,
                        reducedMotion: p = !1,
                        counterStartDelayMs: h = 0,
                        isPriority: S = !1,
                        preload: T = !1,
                        title: j,
                        subtitle: k,
                        description: R,
                        thumbnailAsset: I,
                        detailsAsset: A
                    } = e, [L, H] = (0, i.useState)(!1), z = (0, i.useId)(), {
                        locale: B
                    } = (0, f.useRouter)(), {
                        state: {
                            pageType: W,
                            pageId: Q,
                            pageContentTags: _
                        }
                    } = (0, b.CU)();
                    if ((0, i.useEffect)(() => {
                            l || H(!1)
                        }, [l]), !(0, m.jT)(o) || !(0, m.Uu)(o)) return null;
                    let G = null != (t = (0, g.Jj)(o)) ? t : g.Ci,
                        U = null != n && null != a && a > n,
                        O = null != j,
                        J = l && !p;
                    return (0, r.jsx)(c.a, {
                        width: "100%",
                        overflow: "hidden",
                        sx: E,
                        children: (0, r.jsxs)(c.a, {
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            minHeight: 0,
                            overflow: "hidden",
                            children: [(0, r.jsxs)(c.a, {
                                position: "absolute",
                                inset: 0,
                                children: [(0, r.jsx)(u.e, {
                                    width: "100%",
                                    height: "100%",
                                    position: "relative",
                                    initial: !p && {
                                        scale: 1.08
                                    },
                                    animate: p || l ? {
                                        scale: 1
                                    } : {
                                        scale: 1.08
                                    },
                                    transition: {
                                        duration: .6 * !p,
                                        ease: [.35, .1, .2, 1],
                                        delay: .2 * !p
                                    },
                                    sx: {
                                        willChange: J ? "transform" : "auto"
                                    },
                                    children: (0, r.jsx)(x.U, {
                                        cloudinaryAsset: o,
                                        sources: P,
                                        defaultCrop: M,
                                        defaultWidths: [640, 750, 828, 1080, 1200, 1920],
                                        sizes: N,
                                        priority: S,
                                        loading: T ? "eager" : void 0,
                                        hideAiTag: !0,
                                        imgAriaDescribedBy: G ? z : void 0
                                    })
                                }), G && (0, r.jsx)(g.D, {
                                    id: z,
                                    type: G,
                                    kind: "image"
                                })]
                            }), (0, r.jsx)(u.e, {
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                pointerEvents: "none",
                                initial: !1,
                                animate: function(e, t, n) {
                                    let r = +!!t;
                                    return e ? {
                                        opacity: r
                                    } : n ? {
                                        opacity: r,
                                        filter: t ? "blur(0px)" : "blur(8px)"
                                    } : {
                                        opacity: r,
                                        scale: t ? 1 : .92
                                    }
                                }(p, l, s),
                                transition: {
                                    duration: .35 * !p,
                                    ease: "easeOut"
                                },
                                sx: {
                                    willChange: J ? s ? "opacity, filter" : "transform, opacity" : "auto"
                                },
                                children: (0, r.jsx)(v.X, {
                                    size: "display",
                                    color: "allWhite",
                                    as: "span",
                                    sx: {
                                        fontVariantNumeric: "tabular-nums"
                                    },
                                    children: U ? (0, r.jsx)(y.g, {
                                        startYear: n,
                                        endYear: a,
                                        isActive: l,
                                        startDelayMs: h
                                    }) : n
                                })
                            }), O && (0, r.jsx)(c.a, {
                                position: "absolute",
                                pointerEvents: "auto",
                                sx: D,
                                children: (0, r.jsx)(w.D, {
                                    title: j,
                                    subtitle: null != k ? k : void 0,
                                    description: null != R ? R : void 0,
                                    thumbnailAsset: I,
                                    detailsAsset: A,
                                    isOpen: L,
                                    onOpenChange: e => {
                                        (0, C.yn)({
                                            eventAction: C.wT.historyDetailsCardToggle,
                                            locale: B,
                                            pageExperience: {
                                                pageCategory: W,
                                                contentTags: null != _ ? _ : []
                                            },
                                            context: {
                                                moduleName: C.B7.historySection
                                            },
                                            componentClick: {
                                                clickElementType: "interaction",
                                                clickElementId: Q,
                                                clickElementName: "".concat(e ? "Open" : "Close", ": ").concat(j)
                                            }
                                        }), H(e)
                                    },
                                    imageHeight: d ? 120 : 180,
                                    preloadMedia: l
                                })
                            })]
                        })
                    })
                });
            var z = n(50887),
                B = n(18822),
                W = n(71735),
                Q = n(18898),
                _ = n(24561),
                G = n(25841);
            let U = (0, Q.OQ)(0),
                O = parseInt(L.A.md, 10);

            function J(e, t) {
                var n;
                let r = e.snapGrid,
                    i = e.minTranslate(),
                    a = e.maxTranslate() - i;
                return 0 === a ? 0 : Math.max(0, Math.min(1, (-(null != (n = r[t]) ? n : 0) - i) / a))
            }

            function V(e) {
                e.preventDefault(), e.stopPropagation()
            }

            function Y(e, t) {
                e.allowTouchMove = t, e.params.grabCursor = t;
                let n = e.el,
                    r = e.wrapperEl;
                null == n || n.classList.toggle("swiper-grab", t), t || null == n || n.classList.remove("swiper-grabbing"), r && (r.style.cursor = t ? "grab" : "default")
            }
            let q = "cubic-bezier(0.23, 1, 0.32, 1)";

            function F(e, t) {
                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
                e.style.transitionDuration = "".concat(t, "ms"), e.style.transitionTimingFunction = n
            }

            function X(e, t, n) {
                n.current && (clearTimeout(n.current), n.current = null), t.current = !1, F(e, 0)
            }
            let Z = e => {
                var t;
                let {
                    carouselItemsCollection: n,
                    browseProgress: a,
                    browseActive: o,
                    browseEndIndex: s,
                    isInPlace: u = !0,
                    onSlideRequest: d,
                    reducedMotion: p = !1,
                    isDesktop: h = !1,
                    isShortViewport: f = !1
                } = e, m = null != a ? a : U, g = null != a, x = null != (t = null == n ? void 0 : n.items) ? t : [], v = x.length, [y, w] = (0, i.useState)(0), [b, S] = (0, i.useState)(null), T = (0, G.T)(C.B7.historySection), j = u && !0 !== o, k = p ? void 0 : {
                    opacity: +!!j,
                    scale: j ? 1 : .92,
                    transition: "opacity 0.2s ease ".concat(.15, "s, transform 0.2s ease ").concat(.15, "s")
                }, E = (0, i.useRef)(null), P = (0, i.useRef)(0), M = (0, i.useRef)(null), R = (0, i.useRef)(!1), I = (0, i.useRef)(null), A = () => {
                    E.current && clearTimeout(E.current), E.current = setTimeout(() => {
                        E.current = null
                    }, 900)
                }, D = (0, i.useCallback)(e => {
                    if (!b || b.destroyed) return 0;
                    let t = Math.max(0, Math.min(1, e)),
                        n = b.snapGrid;
                    if (null != s && n.length > 0) {
                        var r, i;
                        let e = Math.min(s, n.length - 1),
                            a = null != (r = n[0]) ? r : 0,
                            o = null != (i = n[e]) ? i : a;
                        return -(a + t * (o - a))
                    }
                    let a = b.maxTranslate(),
                        o = b.minTranslate();
                    return o + t * (a - o)
                }, [b, s]), L = (0, i.useCallback)(e => {
                    if (!b || b.destroyed) return 0;
                    let t = Math.abs(D(e)),
                        n = b.snapGrid,
                        r = 0;
                    for (let e = 0; e < n.length - 1; e++)
                        if (t >= (n[e] + n[e + 1]) / 2) r = e + 1;
                        else break;
                    return Math.min(v - 1, r)
                }, [b, v, D]), N = (0, i.useCallback)(e => {
                    if (!b || b.destroyed) return;
                    let t = b.wrapperEl,
                        n = D(e);
                    if (R.current) F(t, 280, q);
                    else {
                        let e = b.getTranslate(),
                            r = Math.abs(e - n);
                        !p && r > 400 ? function(e, t, n, r, i) {
                            let a = e.wrapperEl;
                            F(a, 0), e.setTranslate(t), a.getBoundingClientRect(), r.current = !0, F(a, 480, q), i.current && clearTimeout(i.current), i.current = setTimeout(() => {
                                F(a, 0), r.current = !1, i.current = null
                            }, 512)
                        }(b, e, 480, R, I) : X(t, R, I)
                    }
                    b.setTranslate(n), b.updateProgress();
                    let r = L(e);
                    b.activeIndex !== r && (b.activeIndex = r, b.realIndex = r), P.current !== r && (P.current = r, M.current && clearTimeout(M.current), M.current = setTimeout(() => {
                        w(P.current)
                    }, 150))
                }, [b, D, L, p]);
                return ((0, l.L)(m, "change", e => {
                    g && !1 !== o && (E.current || N(e))
                }), (0, i.useEffect)(() => {
                    if (!g || !1 === o || !b || b.destroyed || !u || E.current) return;
                    let e = m.get(),
                        t = L(e),
                        n = P.current;
                    if (null != s && n <= s && n < t && d) return void d(n, J(b, n), !0, "sync");
                    N(e)
                }, [g, o, b, u, m, N, L, s, d]), (0, i.useEffect)(() => {
                    if (b && !b.destroyed) {
                        if (!u) {
                            Y(b, !1), X(b.wrapperEl, R, I), b.setTranslate(0), b.updateProgress(), P.current = 0, M.current && clearTimeout(M.current), w(0);
                            return
                        }
                        Y(b, j), !1 === o && b.slideTo(b.activeIndex, 0)
                    }
                }, [u, o, b, j]), (0, i.useEffect)(() => () => {
                    E.current && clearTimeout(E.current), M.current && clearTimeout(M.current), I.current && clearTimeout(I.current)
                }, []), 0 === v) ? null : (0, r.jsxs)(c.a, {
                    as: "section",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: {
                        base: 6,
                        md: 12
                    },
                    "aria-roledescription": "carousel",
                    "aria-label": "History timeline slides",
                    children: [(0, r.jsx)(c.a, {
                        "data-lenis-prevent-horizontal": !0,
                        width: "100%",
                        flexShrink: 0,
                        px: {
                            base: "max(calc((100vw - var(--breakpoints-xxl)) / 2 + 1.25rem), 1.25rem)",
                            md: "max(calc((100vw - var(--breakpoints-xxl)) / 2 + 2.5rem), 2.5rem)"
                        },
                        onDragStart: e => e.preventDefault(),
                        onFocus: e => {
                            if (! function(e) {
                                    let t = e;
                                    for (; t;) 0 !== t.scrollLeft && (t.scrollLeft = 0), t = t.parentElement
                                }(e.currentTarget.parentElement), !b || b.destroyed) return;
                            let t = function(e) {
                                var t;
                                let n = e.closest(".swiper-slide");
                                if (!n) return -1;
                                let r = null == (t = n.parentElement) ? void 0 : t.querySelectorAll(":scope > .swiper-slide");
                                return r ? Array.from(r).indexOf(n) : -1
                            }(e.target);
                            if (!(t < 0))(!d || u && g && !1 !== o || (d(t, J(b, t), void 0, "focus"), A(), !g || !1 === o)) && t !== P.current && b.slideTo(t)
                        },
                        children: (0, r.jsx)(z.FN, {
                            modules: [B.Jq, B.s3, B.U1],
                            keyboard: {
                                enabled: !0
                            },
                            freeMode: {
                                enabled: !0,
                                sticky: !0,
                                momentumRatio: .2
                            },
                            slidesPerView: 1.1,
                            spaceBetween: 32,
                            breakpoints: {
                                [O]: {
                                    slidesPerView: 1.3
                                }
                            },
                            centeredSlides: !1,
                            allowTouchMove: j,
                            speed: 550,
                            longSwipesRatio: .15,
                            shortSwipes: !0,
                            grabCursor: j,
                            onSwiper: S,
                            onTransitionEnd: e => {
                                if (!g || !1 === o || E.current || !d) return;
                                let t = e.activeIndex;
                                d(t, J(e, t), !0, "sync")
                            },
                            onSlideChange: e => {
                                let t = e.activeIndex;
                                P.current = t, M.current && clearTimeout(M.current), w(t), !E.current && g && !1 !== o && d && (d(t, J(e, t), void 0, "sync"), A())
                            },
                            overflow: "visible",
                            style: {
                                width: "100%"
                            },
                            sx: {
                                "& .swiper-wrapper": {
                                    alignItems: "flex-start",
                                    cursor: j ? "grab" : "default",
                                    userSelect: "none"
                                },
                                "& .swiper-wrapper:active": {
                                    cursor: j ? "grabbing" : "default"
                                },
                                "& img": {
                                    WebkitUserDrag: "none",
                                    userSelect: "none"
                                }
                            },
                            children: x.map((e, t) => e && (0, r.jsx)(z.oL, {
                                borderRadius: "ndlRadiusSlide",
                                overflow: "hidden",
                                width: "100%",
                                children: (0, r.jsx)(c.a, {
                                    width: "100%",
                                    overflow: "hidden",
                                    children: (0, r.jsx)(H, { ...e,
                                        isActive: u && t === y,
                                        isDesktop: h,
                                        isShortViewport: f,
                                        reducedMotion: p,
                                        counterStartDelayMs: 0,
                                        isPriority: 0 === t,
                                        preload: t >= y - 1 && t <= y + 2
                                    })
                                })
                            }, e.sys.id))
                        })
                    }), (0, r.jsx)(_.H, {
                        display: "flex",
                        justifyContent: "center",
                        pointerEvents: j ? "auto" : "none",
                        "aria-hidden": !j,
                        sx: j ? void 0 : {
                            "& *": {
                                pointerEvents: "none !important",
                                cursor: "default !important"
                            }
                        },
                        onPointerDownCapture: j ? void 0 : V,
                        onClickCapture: j ? void 0 : V,
                        children: (0, r.jsx)(W.l, {
                            swiper: b,
                            slideCount: v,
                            activeSlideIndex: y,
                            motionStyle: k,
                            onNavigate: T
                        })
                    })]
                })
            };
            var K = n(73738),
                $ = n(9717),
                ee = n(31147),
                et = n(20207),
                en = n(51032);

            function er(e, t, n) {
                if (e) return void e.scrollTo(t, n ? {
                    immediate: !0
                } : {
                    duration: .8,
                    lock: !0
                });
                window.scrollTo({
                    top: t,
                    behavior: n ? "instant" : "smooth"
                })
            }

            function ei(e, t, n) {
                return !e && !!t || (!e || !n) && e
            }
            let ea = e => {
                var t, n, f, m, g, x, v, y, w, b, C;
                let S = (0, i.useRef)(null),
                    T = (0, i.useRef)(window.innerHeight),
                    j = (0, s.xP)(),
                    {
                        isDesktopMd: k,
                        isShortViewport: E
                    } = (0, h.uS)(),
                    {
                        prefersReducedMotion: P
                    } = (0, h.P2)();
                (0, i.useEffect)(() => {
                    let e = () => {
                        T.current = window.innerHeight
                    };
                    return window.addEventListener("resize", e, {
                        passive: !0
                    }), () => window.removeEventListener("resize", e)
                }, []);
                let {
                    browseEndIndex: M,
                    containerHeightVh: R,
                    stickyRangeVh: I,
                    slideInEnd: A,
                    browseEnd: D
                } = function(e, t) {
                    let n = e > 1 ? Math.min(e - 1, Math.max(1, Math.round((e - 1) * .2))) : 0,
                        r = 125 + (t ? 80 * n : 80 * Math.max(0, e - 1)),
                        i = r + 180,
                        a = i - 100;
                    return {
                        browseEndIndex: n,
                        containerHeightVh: i,
                        stickyRangeVh: a,
                        slideInEnd: 125 / a,
                        browseEnd: r / a
                    }
                }((null == (t = e.historySectionContent) ? void 0 : t.__typename) === "ModuleHistoryCarousel" && null != (v = null == (f = e.historySectionContent.carouselItemsCollection) || null == (n = f.items) ? void 0 : n.length) ? v : 0, k), {
                    scrollYProgress: L
                } = (0, a.L)({
                    target: S,
                    offset: ["start start", "end end"]
                }), {
                    style: N,
                    willChange: H,
                    entryProgress: z
                } = (0, en.b)({
                    target: S,
                    enabled: k && !P,
                    radius: $.A.ndlRadiusXLarge
                }), B = (0, o.G)(L, [0, A], ["100%", "0%"]), W = (0, o.G)(L, [A, D], [0, 1]), [Q, _] = (0, i.useState)(!1), G = (0, i.useRef)(!1), [U, O] = (0, i.useState)(!1), J = (0, i.useRef)(!1);
                (0, l.L)(L, "change", e => {
                    let t = ei(G.current, e >= A, e < A - .02);
                    if (t !== G.current && (G.current = t, _(t)), !k) return;
                    let n = ei(J.current, e >= A && e < D, e < A - .02 || e >= D);
                    n !== J.current && (J.current = n, O(n))
                });
                let V = [null != (y = null == (m = e.historySectionTitle) ? void 0 : m.trim()) ? y : "", null != (w = null == (g = e.historySectionTitle2) ? void 0 : g.trim()) ? w : ""].filter(Boolean),
                    Y = 1.1 * A,
                    q = (0, i.useCallback)((e, t, n, r) => {
                        let i = S.current;
                        if (!i) return;
                        let a = i.offsetHeight - T.current;
                        if (k && !J.current) {
                            if ("focus" !== r) return;
                            er(j, i.offsetTop + a * D, n);
                            return
                        }
                        if ("sync" === r && ! function(e) {
                                let t = e.getBoundingClientRect();
                                return t.top <= 1 && t.bottom >= window.innerHeight - 1
                            }(i)) return;
                        let o = A + (k ? M > 0 ? Math.min(1, e / M) : 0 : Math.max(0, Math.min(1, t))) * (D - A);
                        er(j, i.offsetTop + a * o, n)
                    }, [k, M, j, A, D]);
                return (0, r.jsx)(c.a, {
                    as: "section",
                    "aria-label": "History",
                    id: ee.Z.history,
                    ref: S,
                    position: "relative",
                    zIndex: "10",
                    marginTop: "-100vh",
                    height: "".concat(R, "vh"),
                    children: (0, r.jsxs)(u.e, {
                        position: "sticky",
                        top: "0",
                        mx: "auto",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        backgroundColor: "allWhite",
                        height: "calc(100svh + ".concat(80, "vh)"),
                        width: "100%",
                        style: N,
                        sx: {
                            willChange: H,
                            overscrollBehavior: "contain"
                        },
                        children: [(0, r.jsxs)(c.a, {
                            position: "relative",
                            height: "100svh",
                            width: "full",
                            overflow: "visible",
                            children: [(0, r.jsx)(c.a, {
                                position: "absolute",
                                top: "0",
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: "100vw",
                                height: "100%",
                                zIndex: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "visible",
                                children: (0, r.jsx)(c.a, {
                                    width: "100vw",
                                    children: (0, r.jsx)(d.D, {
                                        textColor: K.A.grey500,
                                        children: (0, r.jsx)(p.U, {
                                            as: "h2",
                                            size: "displayLarge",
                                            textAlign: "center",
                                            whiteSpace: "pre-line",
                                            overflow: "visible",
                                            sx: {
                                                textWrap: "balance"
                                            },
                                            children: V.map(e => P ? (0, r.jsx)("span", {
                                                children: e
                                            }, e) : (0, r.jsx)(d.w, {
                                                entryProgress: z,
                                                exitProgress: L,
                                                exitProgressRange: [.04, Y],
                                                children: e
                                            }, e))
                                        })
                                    })
                                })
                            }), (0, r.jsx)(u.e, {
                                position: "absolute",
                                inset: "0",
                                zIndex: 2,
                                overflow: "hidden",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: {
                                    base: "flex-end",
                                    md: "center"
                                },
                                pb: {
                                    base: et.v,
                                    md: 0
                                },
                                style: P ? {} : {
                                    x: B
                                },
                                children: (null == (x = e.historySectionContent) ? void 0 : x.__typename) === "ModuleHistoryCarousel" && (0, r.jsx)(Z, { ...e.historySectionContent,
                                    browseProgress: W,
                                    browseActive: k ? U : void 0,
                                    browseEndIndex: k ? M : void 0,
                                    isInPlace: Q,
                                    onSlideRequest: q,
                                    reducedMotion: P,
                                    isDesktop: k,
                                    isShortViewport: E
                                })
                            })]
                        }), (0, r.jsx)(c.a, {
                            position: "relative",
                            height: "".concat(80, "vh"),
                            width: "full",
                            overflow: "visible",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            py: {
                                base: 6,
                                md: 8
                            },
                            px: {
                                base: 4,
                                md: 10
                            },
                            children: (0, r.jsx)(d.D, {
                                textColor: K.A.grey500,
                                children: (0, r.jsx)(p.U, {
                                    size: "displayLarge",
                                    as: "p",
                                    textAlign: "center",
                                    overflow: "visible",
                                    sx: {
                                        textWrap: "balance"
                                    },
                                    children: P ? (0, r.jsx)("span", {
                                        children: null != (b = e.historySectionDescription) ? b : ""
                                    }) : (0, r.jsx)(d.w, {
                                        entryProgress: L,
                                        entryProgressRange: [D, D + 30 / I],
                                        children: null != (C = e.historySectionDescription) ? C : ""
                                    })
                                })
                            })
                        })]
                    })
                })
            };
            ea.displayName = "HistorySection"
        },
        51032: (e, t, n) => {
            n.d(t, {
                b: () => d
            });
            var r = n(9329),
                i = n(55729),
                a = n(25653),
                o = n(63504),
                l = n(39851),
                s = n(98295),
                c = n(36011);

            function u() {
                let e = (0, r._)(["inset(0 ", "% 0 ", "% round ", ")"]);
                return u = function() {
                    return e
                }, e
            }

            function d(e) {
                let {
                    target: t,
                    enabled: n,
                    radius: r
                } = e, {
                    scrollYProgress: d
                } = (0, a.L)({
                    target: t,
                    offset: ["start end", "start start"]
                }), p = (0, o.G)(d, [0, 1], [25, 0]), h = (0, o.G)(d, [0, .9, 1], [r, r, "0px"]), f = function(e) {
                    for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                    let i = e.length;
                    return (0, l.j)(n.filter(s.S), function() {
                        let t = "";
                        for (let r = 0; r < i; r++) {
                            t += e[r];
                            let i = n[r];
                            i && (t += (0, s.S)(i) ? i.get() : i)
                        }
                        return t
                    })
                }(u(), p, p, h), m = (0, o.G)(d, [0, 1], [.95, 1]), [g, x] = (0, i.useState)(!1);
                return (0, c.L)(d, "change", e => {
                    let t = e > 0 && e < 1;
                    t !== g && x(t)
                }), {
                    entryProgress: d,
                    style: n ? {
                        clipPath: f,
                        scale: m
                    } : {
                        clipPath: "none",
                        scale: 1
                    },
                    willChange: n && g ? "clip-path, transform" : "auto"
                }
            }
        }
    }
]);
//# sourceMappingURL=7916.348da01b5da91359.js.map