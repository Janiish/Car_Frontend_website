"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [6442], {
        2584: (e, t, n) => {
            n.d(t, {
                D: () => h,
                w: () => f
            });
            var l = n(6029),
                r = n(55729),
                a = n(18898),
                i = n(63504),
                o = n(36011),
                s = n(72813),
                c = n(91753),
                d = n(73738);
            let u = (0, r.createContext)(void 0),
                h = e => {
                    let {
                        opacity: t,
                        textColor: n = d.A.grey500,
                        children: r
                    } = e;
                    return (0, l.jsx)(u.Provider, {
                        value: n,
                        children: (0, l.jsx)(s.a, {
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
                            children: r
                        })
                    })
                },
                m = (0, a.OQ)(1),
                p = e => {
                    let t = Math.max(0, Math.min(1, e));
                    return t * t * (3 - 2 * t)
                },
                x = e => Math.max(0, Math.min(1, e)) ** 2.65,
                f = e => {
                    var t;
                    let {
                        entryProgress: n,
                        exitProgress: s,
                        entryProgressRange: h = [.5, 1],
                        exitProgressRange: f,
                        entryTranslateYPx: g = 30,
                        entryBlurRadiusRange: b = [10, 0],
                        playOnce: v = !1,
                        textColor: y,
                        children: C
                    } = e, k = (0, r.useContext)(u), j = null != (t = null != y ? y : k) ? t : d.A.grey500, w = (0, r.useRef)(!1), T = b[1], N = b[0], R = null != s && null != f ? {
                        progress: s,
                        range: f
                    } : null, S = null !== R, E = null !== R ? R.progress : n, M = null !== R ? R.range : [0, 1], I = (0, i.G)(n, h, ["".concat(g, "px"), "0px"]), B = (0, i.G)(n, h, [0, 1]), L = (0, i.G)(n, h, b), A = (0, i.G)(n, h, [.96, 1]), G = (0, i.G)(E, e => {
                        if (!S) return 0;
                        let [t, n] = M;
                        return e <= t ? 0 : e >= n ? 1 : (e - t) / (n - t)
                    }), _ = (0, i.G)(G, e => 1 - p(e)), P = (0, i.G)(G, e => p(e) * N), W = (0, r.useCallback)(e => {
                        v && !w.current && e >= h[1] && (w.current = !0)
                    }, [v, h]);
                    (0, o.L)(n, "change", W);
                    let z = (0, r.useMemo)(() => (0, a.OQ)(T), [T]),
                        D = v && w.current,
                        F = (0, i.G)(B, x),
                        V = D ? m : F,
                        J = (0, i.G)([V, _], e => {
                            let [t, n] = e;
                            return Math.min(t, n)
                        }),
                        O = (0, i.G)([D ? z : L, P], e => {
                            let [t, n] = e;
                            return Math.max(t, n)
                        }),
                        U = (0, i.G)(O, e => "blur(".concat(e, "px)")),
                        H = (0, i.G)(J, e => .72 + .28 * Math.max(0, Math.min(1, e)) ** 1.9),
                        q = (0, i.G)(V, e => .95 + .050000000000000044 * Math.max(0, Math.min(1, e)) ** 1.9),
                        Q = (0, i.G)(J, e => {
                            if (e >= 1 - 1e-6) return "none";
                            let t = 18 + Math.max(0, Math.min(1, e)) ** 3.15 * 82,
                                n = Math.min(100, t + 18),
                                l = Math.min(100, n + 10);
                            return "linear-gradient(to right, ".concat("rgba(0, 0, 0, 1)", " ").concat(t, "%, ").concat("rgba(0, 0, 0, 0.58)", " ").concat(n, "%, ").concat("rgba(0, 0, 0, 0.24)", " ").concat(l, "%)")
                        });
                    return (0, l.jsx)(c.e, {
                        as: "span",
                        display: "block",
                        style: {
                            y: D ? 0 : I,
                            filter: U,
                            scale: D ? m : A,
                            overflow: "visible"
                        },
                        children: (0, l.jsx)(c.e, {
                            as: "span",
                            display: "block",
                            style: {
                                opacity: H,
                                scale: q,
                                color: j,
                                WebkitMaskImage: Q,
                                maskImage: Q,
                                overflow: "visible"
                            },
                            children: C
                        })
                    })
                }
        },
        25841: (e, t, n) => {
            n.d(t, {
                T: () => s
            });
            var l = n(55729),
                r = n(81278),
                a = n(93066),
                i = n(80321);
            let o = {
                    pagination: i.wT.carouselPaginationButtonClick,
                    next: i.wT.carouselNavigationNextButtonClick,
                    prev: i.wT.carouselNavigationPrevButtonClick
                },
                s = (e, t) => {
                    let {
                        locale: n
                    } = (0, r.useRouter)(), {
                        state: {
                            pageType: s,
                            pageId: c,
                            pageContentTags: d
                        }
                    } = (0, a.CU)();
                    return (0, l.useCallback)((l, r) => {
                        let a, u = o[l],
                            h = t ? '"'.concat(t, '"') : e;
                        a = "pagination" === l ? "Carousel ".concat(h, " pagination index button clicked:").concat(null != r ? r : "") : "Carousel ".concat(h, ": ").concat("next" === l ? "Next button" : "Previous button"), (0, i.yn)({
                            eventAction: u,
                            locale: n,
                            pageExperience: {
                                pageCategory: s,
                                contentTags: null != d ? d : []
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
                    }, [e, t, n, s, c, d])
                }
        },
        27275: (e, t, n) => {
            n.d(t, {
                S: () => C
            });
            var l = n(6029),
                r = n(77367),
                a = n(69757),
                i = n(38275),
                o = n(35882),
                s = n(21938),
                c = n(55729),
                d = n(73738);

            function u(e, t) {
                "function" == typeof e ? e(t) : e && (e.current = t)
            }

            function h(e, t, n, l) {
                let r = { ...{
                        transform: "translate3d(".concat(Math.max(t.offsetLeft, 0), "px, 0, 0)"),
                        width: "".concat(t.offsetWidth, "px")
                    },
                    backgroundColor: n
                };
                if (!l) return void Object.assign(e.style, r);
                e.style.transition = "none", Object.assign(e.style, r), e.getBoundingClientRect(), e.style.transition = ""
            }
            let m = d.A.ndlMotorsportsRed,
                p = d.A.allWhite,
                x = (0, c.createContext)(null);

            function f() {
                let e = (0, c.useContext)(x);
                if (!e) throw Error("NdlToolbar compound components must be rendered inside <NdlToolbar.Root>.");
                return e
            }
            let g = (0, r.R)((e, t) => {
                let n = (0, a.o)("NdlToolbar", e),
                    {
                        activeIndex: r,
                        onActiveIndexChange: d,
                        highlightColor: f = m,
                        highlightTextColor: g = p,
                        children: b,
                        className: v,
                        ...y
                    } = (0, i.M)(e),
                    C = (0, c.useRef)(null),
                    k = (0, c.useRef)([]),
                    j = (0, c.useRef)(null),
                    w = (0, c.useRef)(0),
                    T = (0, c.useCallback)(e => {
                        C.current = e, u(t, e)
                    }, [t]);
                return ! function(e, t, n, l, r) {
                    let a = (0, c.useRef)(!1),
                        i = (0, c.useRef)(!1);
                    (0, c.useEffect)(() => {
                        var i;
                        let o = n.current,
                            s = null == (i = l.current) ? void 0 : i[e];
                        if (!o || !s) return;
                        let c = !a.current;
                        h(o, s, t, c), c && (a.current = !0),
                            function(e, t, n) {
                                if (!e || e.scrollWidth <= e.clientWidth) return;
                                let l = t.offsetLeft + t.offsetWidth / 2 - e.clientWidth / 2,
                                    r = n && !("function" == typeof globalThis.matchMedia && globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches);
                                e.scrollTo({
                                    left: l,
                                    behavior: r ? "smooth" : "auto"
                                })
                            }(r.current, s, a.current)
                    }, [e, t, n, l, r]), (0, c.useEffect)(() => {
                        let r = () => {
                            var r;
                            let a = n.current,
                                i = null == (r = l.current) ? void 0 : r[e];
                            a && i && h(a, i, t, !0)
                        };
                        if (globalThis.addEventListener("resize", r), !i.current) {
                            let e = !1;
                            return document.fonts.ready.then(() => {
                                i.current = !0, e || r()
                            }), () => {
                                e = !0, globalThis.removeEventListener("resize", r)
                            }
                        }
                        return () => globalThis.removeEventListener("resize", r)
                    }, [e, t, n, l])
                }(r, f, j, k, C), (0, l.jsx)(x.Provider, {
                    value: {
                        activeIndex: r,
                        onActiveIndexChange: d,
                        highlightColor: f,
                        highlightTextColor: g,
                        buttonRefs: k,
                        indicatorRef: j,
                        viewportRef: C,
                        buttonCount: w,
                        styles: n
                    },
                    children: (0, l.jsx)(o.B.div, {
                        ref: T,
                        __css: n.viewport,
                        className: (0, s.cx)("ndl-toolbar", v),
                        ...y,
                        children: b
                    })
                })
            });
            g.displayName = "NdlToolbar.Root";
            let b = (0, r.R)((e, t) => {
                let {
                    index: n,
                    asChild: r,
                    children: a,
                    className: i,
                    onClick: d,
                    onKeyDown: h,
                    type: m,
                    ...p
                } = e, {
                    activeIndex: x,
                    onActiveIndexChange: g,
                    highlightTextColor: b,
                    buttonRefs: v,
                    styles: y
                } = f(), C = null != n ? n : 0, k = C === x, j = (0, c.useCallback)(e => {
                    v.current[C] = e, u(t, e)
                }, [t, v, C]), w = (0, c.useCallback)(e => {
                    g(C), null == d || d(e)
                }, [g, C, d]), T = (0, c.useCallback)(e => {
                    var t;
                    let n = v.current.filter(Boolean).length,
                        l = function(e, t, n) {
                            switch (e) {
                                case "ArrowRight":
                                    return (t + 1) % n;
                                case "ArrowLeft":
                                    return (t - 1 + n) % n;
                                case "Home":
                                    return 0;
                                case "End":
                                    return n - 1;
                                default:
                                    return null
                            }
                        }(e.key, x, n);
                    null != l && (e.preventDefault(), g(l), null == (t = v.current[l]) || t.focus({
                        preventScroll: !0
                    }), null == h || h(e))
                }, [x, g, v, h]), N = {
                    ref: j,
                    "aria-pressed": k,
                    tabIndex: k ? 0 : -1,
                    onClick: w,
                    onKeyDown: T,
                    className: (0, s.cx)("ndl-toolbar__button", i),
                    role: "button"
                };
                if (r) {
                    let e = c.Children.only(a);
                    if (!(0, c.isValidElement)(e)) throw Error("NdlToolbar.Button asChild expects a single valid React element.");
                    let t = e.ref,
                        n = "className" in e.props ? e.props.className : void 0;
                    return (0, c.cloneElement)(e, { ...e.props,
                        ref: function() {
                            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                            return e => {
                                t.forEach(t => null != t && u(t, e))
                            }
                        }(j, t),
                        "aria-pressed": k,
                        tabIndex: k ? 0 : -1,
                        role: "button",
                        onClick: w,
                        onKeyDown: T,
                        className: (0, s.cx)("ndl-toolbar__button", i, n)
                    })
                }
                return (0, l.jsx)(o.B.button, { ...N,
                    type: "button",
                    __css: y.button,
                    color: k ? b : void 0,
                    ...p,
                    children: a
                })
            });
            b.displayName = "NdlToolbar.Button";
            let v = (0, r.R)((e, t) => {
                let {
                    children: n,
                    className: r,
                    ...a
                } = e, {
                    styles: i
                } = f(), d = 0, u = c.Children.map(n, e => (0, c.isValidElement)(e) && e.type === b ? (0, c.cloneElement)(e, { ...e.props,
                    index: d++
                }) : e);
                return (0, l.jsx)(o.B.div, {
                    ref: t,
                    role: "toolbar",
                    "aria-orientation": "horizontal",
                    __css: i.buttonGroup,
                    className: (0, s.cx)("ndl-toolbar__button-group", r),
                    ...a,
                    children: u
                })
            });
            v.displayName = "NdlToolbar.ButtonGroup";
            let y = (0, r.R)((e, t) => {
                let {
                    className: n,
                    ...r
                } = e, {
                    indicatorRef: a,
                    styles: i
                } = f(), d = (0, c.useCallback)(e => {
                    a.current = e, u(t, e)
                }, [t, a]);
                return (0, l.jsx)(o.B.span, {
                    ref: d,
                    "aria-hidden": "true",
                    __css: i.indicator,
                    className: (0, s.cx)("ndl-toolbar__indicator", n),
                    ...r
                })
            });
            y.displayName = "NdlToolbar.Indicator";
            let C = {
                Root: g,
                ButtonGroup: v,
                Indicator: y,
                Button: b
            }
        },
        34221: (e, t, n) => {
            n.d(t, {
                n: () => i
            });
            var l = n(6029),
                r = n(94771),
                a = n(72813);
            let i = e => {
                let {
                    direction: t,
                    onClick: n,
                    ...i
                } = e;
                return (0, l.jsx)(a.a, {
                    transform: "prev" === t ? "rotate(180deg)" : void 0,
                    children: (0, l.jsx)(r.d, {
                        onClick: n,
                        ...i
                    })
                })
            }
        },
        50887: (e, t, n) => {
            n.d(t, {
                FN: () => i,
                Vf: () => l.Jq,
                aL: () => l.s3,
                lo: () => l.Vx,
                oL: () => o,
                s: () => l.U1
            });
            var l = n(18822),
                r = n(33210),
                a = n(35882);
            n(42108), n(10544), n(82658);
            let i = (0, a.B)(r.RC),
                o = (0, a.B)(r.qr);
            o.displayName = "SwiperSlide"
        },
        51032: (e, t, n) => {
            n.d(t, {
                b: () => u
            });
            var l = n(9329),
                r = n(55729),
                a = n(25653),
                i = n(63504),
                o = n(39851),
                s = n(98295),
                c = n(36011);

            function d() {
                let e = (0, l._)(["inset(0 ", "% 0 ", "% round ", ")"]);
                return d = function() {
                    return e
                }, e
            }

            function u(e) {
                let {
                    target: t,
                    enabled: n,
                    radius: l
                } = e, {
                    scrollYProgress: u
                } = (0, a.L)({
                    target: t,
                    offset: ["start end", "start start"]
                }), h = (0, i.G)(u, [0, 1], [25, 0]), m = (0, i.G)(u, [0, .9, 1], [l, l, "0px"]), p = function(e) {
                    for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), l = 1; l < t; l++) n[l - 1] = arguments[l];
                    let r = e.length;
                    return (0, o.j)(n.filter(s.S), function() {
                        let t = "";
                        for (let l = 0; l < r; l++) {
                            t += e[l];
                            let r = n[l];
                            r && (t += (0, s.S)(r) ? r.get() : r)
                        }
                        return t
                    })
                }(d(), h, h, m), x = (0, i.G)(u, [0, 1], [.95, 1]), [f, g] = (0, r.useState)(!1);
                return (0, c.L)(u, "change", e => {
                    let t = e > 0 && e < 1;
                    t !== f && g(t)
                }), {
                    entryProgress: u,
                    style: n ? {
                        clipPath: p,
                        scale: x
                    } : {
                        clipPath: "none",
                        scale: 1
                    },
                    willChange: n && f ? "clip-path, transform" : "auto"
                }
            }
        },
        51074: (e, t, n) => {
            n.d(t, {
                R: () => k
            });
            var l = n(6029),
                r = n(77367),
                a = n(35882),
                i = n(21938),
                o = n(55729),
                s = n(31219),
                c = n(41684),
                d = n(70659),
                u = n(72744),
                h = n(95415),
                m = n(28526),
                p = n(84721);
            let x = (0, o.createContext)(null);

            function f() {
                let e = (0, o.useContext)(x);
                if (!e) throw Error("NdlLink compound components must be rendered inside <NdlLink.Root>.");
                return e
            }
            let g = (0, r.R)((e, t) => {
                let n = (0, o.useId)(),
                    {
                        href: r,
                        children: a,
                        className: c,
                        ...u
                    } = e;
                return (0, l.jsx)(x.Provider, {
                    value: {
                        href: r,
                        ariaId: n
                    },
                    children: (0, l.jsx)(d.U, {
                        ref: t,
                        size: "medium",
                        colorScheme: "black",
                        p: 4,
                        backdropFilter: "auto",
                        backdropBlur: "ndlFrostedGlassHigh",
                        overflow: "hidden",
                        className: (0, i.cx)("ndl-link", c),
                        ...u,
                        children: (0, l.jsx)(s.Q, {
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4,
                            width: "full",
                            "data-group": !0,
                            cursor: "pointer",
                            children: a
                        })
                    })
                })
            });
            g.displayName = "NdlLink.Root";
            let b = (0, r.R)((e, t) => {
                let {
                    children: n,
                    className: r,
                    ...o
                } = e;
                return (0, l.jsx)(a.B.div, {
                    ref: t,
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    minWidth: 0,
                    gap: 1,
                    className: (0, i.cx)("ndl-link__content", r),
                    ...o,
                    children: n
                })
            });
            b.displayName = "NdlLink.Content";
            let v = (0, r.R)((e, t) => {
                let {
                    children: n,
                    className: r,
                    ...a
                } = e, {
                    href: o,
                    ariaId: d
                } = f();
                return (0, l.jsx)(s.r, {
                    as: c.S,
                    href: o,
                    id: d,
                    ref: t,
                    className: (0, i.cx)("ndl-link__title", r),
                    _hover: {
                        textDecoration: "none"
                    },
                    ...a,
                    children: (0, l.jsx)(u.X, {
                        as: "span",
                        size: "headerS",
                        color: "allWhite",
                        sx: {
                            textWrap: "balance"
                        },
                        children: n
                    })
                })
            });
            v.displayName = "NdlLink.Title";
            let y = (0, r.R)((e, t) => {
                let {
                    children: n,
                    ...r
                } = e;
                return (0, l.jsx)(h.o, {
                    ref: t,
                    size: "regular",
                    color: "grey200",
                    sx: {
                        textWrap: "balance"
                    },
                    ...r,
                    children: n
                })
            });
            y.displayName = "NdlLink.Description";
            let C = (0, r.R)((e, t) => {
                let {
                    iconName: n = "arrow-right-up",
                    ...r
                } = e, {
                    ariaId: a
                } = f();
                return (0, l.jsx)(m.v, {
                    ref: t,
                    "aria-labelledby": a,
                    onClick: () => {},
                    variant: "icon",
                    size: "large",
                    colorScheme: "solidGrey",
                    tabIndex: -1,
                    flexShrink: 0,
                    pointerEvents: "none",
                    ...r,
                    children: (0, l.jsx)(p.E, {
                        name: n
                    })
                })
            });
            C.displayName = "NdlLink.Icon";
            let k = {
                Root: g,
                Content: b,
                Title: v,
                Description: y,
                Icon: C
            }
        },
        56442: (e, t, n) => {
            n.r(t), n.d(t, {
                TeamsSection: () => ei
            });
            var l = n(6029),
                r = n(72813),
                a = n(94699),
                i = n(48643),
                o = n(45253),
                s = n(34221),
                c = n(50887),
                d = n(18822),
                u = n(81085),
                h = n(61436),
                m = n(15617),
                p = n(91753),
                x = n(71735),
                f = n(15407),
                g = n(55729),
                b = n(69747),
                v = n(96692),
                y = n(6937),
                C = n(25841),
                k = n(80321);
            let j = {
                    hidden: e => ({
                        opacity: 0,
                        x: "".concat(Math.max(100 - 20 * e, 30), "vw")
                    }),
                    visible: e => ({
                        opacity: 1,
                        x: 0,
                        transition: {
                            type: "spring",
                            duration: 1.2,
                            bounce: .05,
                            delay: .12 * Math.min(e, 4)
                        }
                    })
                },
                w = {
                    hidden: {
                        opacity: 0
                    },
                    visible: e => ({
                        opacity: 1,
                        transition: {
                            duration: .4,
                            delay: .12 * Math.min(e, 4)
                        }
                    })
                },
                T = {
                    small: {
                        ratio: "4:5",
                        borderRadius: {
                            base: "16px",
                            md: "24px"
                        }
                    },
                    large: {
                        ratio: {
                            base: "2:3",
                            md: "10:16"
                        },
                        borderRadius: {
                            base: "16px",
                            md: "24px"
                        }
                    }
                },
                N = (0, g.forwardRef)(function(e, t) {
                    let n, {
                            items: N,
                            initialSlideIndex: R = 0,
                            onSlideIndexChange: S,
                            showNavigation: E = !1,
                            isFirstMount: M = !1,
                            entranceReady: I = !1
                        } = e,
                        [B, L] = (0, g.useState)(R),
                        [A, G] = (0, g.useState)(null),
                        _ = (0, C.T)(k.B7.teamsSection);
                    (0, g.useImperativeHandle)(t, () => ({
                        slideTo: function(e) {
                            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                            return null == A ? void 0 : A.slideTo(e, t)
                        }
                    }), [A]);
                    let {
                        isMobile: P
                    } = (0, v.uS)(), {
                        prefersReducedMotion: W
                    } = (0, v.P2)(), z = P ? 2 : 4, D = P ? 1 : 3, F = B * D, V = F - 1, J = F + D - 1 + (P ? 2 : 3), O = (0, g.useMemo)(() => N.slice(0, 18), [N]), U = (0, g.useCallback)(e => {
                        G(e), L(e.snapIndex)
                    }, []), H = (0, g.useCallback)(e => {
                        var t;
                        L(e.snapIndex);
                        let n = null != (t = e.params.slidesPerGroup) ? t : 1;
                        null == S || S(e.snapIndex * n)
                    }, [S]), q = (0, g.useCallback)(e => {
                        L(e.snapIndex)
                    }, []), Q = M && !W && !P, K = M && W && !P;
                    return Q ? n = {
                        opacity: +!!I,
                        scale: I ? 1 : .92,
                        transition: "opacity 0.2s ease ".concat(.62, "s, transform 0.2s ease ").concat(.62, "s")
                    } : K && (n = {
                        opacity: +!!I,
                        transition: "opacity 0.2s ease ".concat(.62, "s")
                    }), (0, l.jsx)(b.R, {
                        className: "TeamsCarousel",
                        overflow: "hidden",
                        py: 0,
                        pt: 16,
                        children: (0, l.jsxs)(r.a, {
                            color: "porscheBlack",
                            transition: "color 0.25s ease",
                            children: [E && (0, l.jsx)(a.x, {
                                mb: {
                                    base: 6,
                                    l: 8
                                },
                                gridTemplateColumns: f.y9,
                                children: (0, l.jsx)(i.E, {
                                    colSpan: 1,
                                    gridColumnStart: 12,
                                    display: {
                                        base: "none",
                                        md: "flex"
                                    },
                                    justifyContent: "flex-end",
                                    alignItems: "self-end",
                                    children: (0, l.jsxs)(o.s, {
                                        justifyContent: "flex-end",
                                        gap: 7,
                                        padding: 2,
                                        children: [(0, l.jsx)(s.n, {
                                            onClick: () => {
                                                null == A || A.slidePrev(), _("prev")
                                            },
                                            direction: "prev",
                                            hideLabel: !0,
                                            disabled: null == A ? void 0 : A.isBeginning,
                                            aria: {
                                                "aria-label": "previous"
                                            },
                                            theme: "dark"
                                        }), (0, l.jsx)(s.n, {
                                            onClick: () => {
                                                null == A || A.slideNext(), _("next")
                                            },
                                            direction: "next",
                                            hideLabel: !0,
                                            disabled: null == A ? void 0 : A.isEnd,
                                            aria: {
                                                "aria-label": "next"
                                            },
                                            theme: "dark"
                                        })]
                                    })
                                })
                            }), (0, l.jsx)(r.a, {
                                "data-lenis-prevent-horizontal": !0,
                                sx: {
                                    touchAction: "manipulation"
                                },
                                children: (0, l.jsx)(c.FN, {
                                    slidesPerView: 1.08,
                                    slidesPerGroup: 1,
                                    modules: [d.Jq],
                                    spaceBetween: "16px",
                                    overflow: "visible",
                                    initialSlide: R,
                                    speed: 500,
                                    longSwipesRatio: .15,
                                    shortSwipes: !0,
                                    grabCursor: !0,
                                    breakpoints: {
                                        [Number.parseInt(y.A.md, 10)]: {
                                            slidesPerView: 3.1,
                                            slidesPerGroup: 3,
                                            spaceBetween: "32px"
                                        }
                                    },
                                    updateOnWindowResize: !0,
                                    onSwiper: U,
                                    onSnapIndexChange: H,
                                    onBreakpoint: q,
                                    sx: {
                                        "& .swiper-wrapper": {
                                            alignItems: "flex-start",
                                            cursor: "grab"
                                        },
                                        "& .swiper-wrapper:active": {
                                            cursor: "grabbing"
                                        }
                                    },
                                    children: O.map((e, t) => {
                                        var n, a;
                                        if (!e || !(0, u.jT)(e.asset)) return null;
                                        let i = t % 3 == 1 ? T.large : T.small,
                                            o = t < z || t >= V && t <= J,
                                            s = (0, l.jsx)(h.g, {
                                                ratio: i.ratio,
                                                children: (0, l.jsx)(r.a, {
                                                    overflow: "hidden",
                                                    borderRadius: i.borderRadius,
                                                    children: (0, l.jsx)(m.d, {
                                                        cloudinaryAsset: e.asset,
                                                        sizes: "(min-width: ".concat(y.A.md, ") 33vw, 92vw"),
                                                        crop: "fill",
                                                        gravity: "auto:subject",
                                                        aspectRatio: i.ratio,
                                                        alt: null != (a = e.alt) ? a : "Team gallery image ".concat(t + 1),
                                                        loading: o ? "eager" : "lazy"
                                                    })
                                                })
                                            }),
                                            d = Math.abs(t - F) > D + 2,
                                            x = Q || K ? (0, l.jsx)(p.e, {
                                                custom: t,
                                                variants: Q ? j : w,
                                                initial: "hidden",
                                                animate: I ? "visible" : "hidden",
                                                children: s
                                            }) : s;
                                        return (0, l.jsx)(c.oL, {
                                            sx: d ? {
                                                contentVisibility: "auto",
                                                containIntrinsicSize: "0 400px"
                                            } : void 0,
                                            children: x
                                        }, "".concat(null == (n = e.sys) ? void 0 : n.id, "-").concat(t))
                                    })
                                })
                            }), (0, l.jsx)(o.s, {
                                justifyContent: "center",
                                mt: {
                                    base: 6,
                                    md: 12
                                },
                                children: (0, l.jsx)(x.l, {
                                    swiper: A,
                                    activeSlideIndex: B,
                                    theme: "dark",
                                    onNavigate: _,
                                    motionStyle: n
                                })
                            })]
                        })
                    })
                }),
                R = (0, g.memo)(N);
            R.displayName = "TeamsCarousel";
            var S = n(27275),
                E = n(51074),
                M = n(2584),
                I = n(96377),
                B = n(23518),
                L = n(93066),
                A = n(73738),
                G = n(36011),
                _ = n(21593),
                P = n(71024),
                W = n.n(P),
                z = n(81278),
                D = n(31147),
                F = n(51032),
                V = n(65322);
            let J = W()(() => Promise.all([n.e(7172), n.e(8592)]).then(n.bind(n, 48592)).then(e => e.AnimatedShaderBackground), {
                    loadableGenerated: {
                        webpack: () => [48592]
                    },
                    ssr: !1
                }),
                O = "graphite",
                U = {
                    proportion: .3,
                    softness: 1,
                    distortion: .4,
                    swirl: .8,
                    swirlIterations: 4,
                    shape: "edge",
                    shapeScale: .2,
                    speed: 2,
                    scale: 2.45,
                    rotation: 0
                },
                H = {
                    crimson: {
                        highlightColor: A.A.ndlMotorsportsRed,
                        highlightTextColor: A.A.allWhite,
                        shader: { ...U,
                            colors: ["#4b020c", "#1e0105", "#000000"]
                        }
                    },
                    violet: {
                        highlightColor: A.A.ndlFormulaE,
                        highlightTextColor: A.A.allWhite,
                        shader: { ...U,
                            colors: ["#140727", "#140727", "#3b006b"]
                        }
                    },
                    graphite: {
                        highlightColor: A.A.ndlCoanda,
                        highlightTextColor: A.A.porscheBlack,
                        shader: { ...U,
                            colors: ["#424242", "#141414", "#000000"]
                        }
                    }
                },
                q = new Map(Object.keys(H).map(e => [e.toLowerCase(), e])),
                Q = (0, g.memo)(function(e) {
                    let {
                        teams: t,
                        activeTeamIndex: n,
                        onTeamChange: r,
                        highlightColor: a,
                        highlightTextColor: i
                    } = e;
                    return (0, l.jsx)(o.s, {
                        justifyContent: {
                            base: "flex-start",
                            l: "center"
                        },
                        width: "full",
                        children: (0, l.jsx)(S.S.Root, {
                            activeIndex: n,
                            onActiveIndexChange: r,
                            highlightColor: a,
                            highlightTextColor: i,
                            className: "scroll-fade-x",
                            "data-lenis-prevent-horizontal": !0,
                            children: (0, l.jsxs)(S.S.ButtonGroup, {
                                "aria-label": "Teams selection",
                                children: [(0, l.jsx)(S.S.Indicator, {}), t.map(e => {
                                    var t;
                                    return (0, l.jsx)(S.S.Button, {
                                        children: e.teamName
                                    }, null != (t = e.slug) ? t : e.teamName)
                                })]
                            })
                        })
                    })
                }),
                K = (0, g.memo)(function(e) {
                    let {
                        title: t,
                        description: n,
                        href: r,
                        onClick: a
                    } = e;
                    return (0, l.jsxs)(E.R.Root, {
                        href: r,
                        children: [(0, l.jsxs)(E.R.Content, {
                            children: [(0, l.jsx)(E.R.Title, {
                                onClick: a,
                                children: t
                            }), (0, l.jsx)(E.R.Description, {
                                children: n
                            })]
                        }), (0, l.jsx)(E.R.Icon, {})]
                    })
                }),
                X = {
                    opacity: 0,
                    y: 20
                },
                Y = {
                    opacity: 1,
                    y: 0
                },
                Z = {
                    type: "spring",
                    duration: 1,
                    bounce: 0
                },
                $ = {
                    opacity: 0
                },
                ee = {
                    opacity: 1
                },
                et = {
                    opacity: 0
                },
                en = {
                    duration: .5,
                    ease: V.qy
                },
                el = [],
                er = {},
                ea = {
                    initial: $,
                    animate: ee,
                    exit: et,
                    transition: en
                },
                ei = (0, g.memo)(function(e) {
                    var t, n, a, i, s, c, d;
                    let {
                        teamSectionTitle: u,
                        teamSectionTitle2: h,
                        teamsCollection: m
                    } = e, x = (0, g.useMemo)(() => {
                        var e;
                        return null != (e = null == m ? void 0 : m.items) ? e : []
                    }, [null == m ? void 0 : m.items]), f = (0, g.useRef)(null), [b, y] = (0, g.useState)(0), C = (0, z.useRouter)(), j = (0, g.useRef)(C);
                    j.current = C;
                    let {
                        state: {
                            pageType: w,
                            pageId: T,
                            pageContentTags: N
                        }
                    } = (0, L.CU)(), {
                        isDesktopMd: S
                    } = (0, v.uS)(), {
                        prefersReducedMotion: E
                    } = (0, v.P2)(), {
                        style: P,
                        willChange: W,
                        entryProgress: V
                    } = (0, F.b)({
                        target: f,
                        enabled: S && !E,
                        radius: "2rem"
                    }), U = (0, g.useRef)(!1), ei = (0, g.useRef)([]);
                    (0, G.L)(V, "change", e => {
                        if (S && e >= 1 && !U.current) {
                            for (let e of (U.current = !0, ei.current)) clearTimeout(e);
                            if (ei.current = [], E) eb("done");
                            else {
                                let e = setTimeout(() => eb("selector"), 25);
                                ei.current = [e, setTimeout(() => eb("entrance"), 375), setTimeout(() => eb("done"), 995)]
                            }
                        }
                    }), (0, g.useEffect)(() => () => {
                        for (let e of ei.current) clearTimeout(e)
                    }, []);
                    let eo = (0, g.useMemo)(() => {
                            let e = [];
                            for (let n of x) {
                                var t;
                                (null == n ? void 0 : n.team) != null && e.push({
                                    teamName: n.team.teamName,
                                    theme: null != (t = function(e) {
                                        if (e) return q.get(e.toLowerCase())
                                    }(n.team.theme)) ? t : O,
                                    gallery: n.team.gallery,
                                    linkTitle: n.linkTitle,
                                    linkTitleDescription: n.linkTitleDescription,
                                    slug: n.slug
                                })
                            }
                            return e
                        }, [x]),
                        es = eo[b],
                        ec = H[null != (a = null == es ? void 0 : es.theme) ? a : O],
                        ed = (0, g.useMemo)(() => E ? { ...ec.shader,
                            speed: 0
                        } : ec.shader, [E, ec.shader]),
                        eu = null != (i = null == es || null == (n = es.gallery) || null == (t = n.mediaCollection) ? void 0 : t.items) ? i : el,
                        eh = (null == es ? void 0 : es.slug) ? (0, B.s6)({
                            __typename: "PageTeam",
                            slug: es.slug
                        }) : "",
                        em = (0, g.useRef)(null),
                        ep = (0, g.useRef)(0),
                        ex = (0, g.useRef)(0),
                        ef = (0, g.useCallback)(e => {
                            ep.current = e
                        }, []),
                        [eg, eb] = (0, g.useState)("idle"),
                        ev = !S || "idle" !== eg,
                        ey = !S || "entrance" === eg || "done" === eg,
                        eC = !S || "done" === eg,
                        ek = (0, g.useRef)(!1),
                        ej = (0, g.useCallback)(e => {
                            var t, n;
                            ek.current = !0, ex.current = ep.current, (0, k.yn)({
                                eventAction: k.wT.teamSelectorClick,
                                locale: j.current.locale,
                                pageExperience: {
                                    pageCategory: w,
                                    contentTags: null != N ? N : []
                                },
                                context: {
                                    moduleName: k.B7.teamsSection
                                },
                                componentClick: {
                                    clickElementType: "interaction",
                                    clickElementId: T,
                                    clickElementName: "Team tab: ".concat(null != (n = null == (t = eo[e]) ? void 0 : t.teamName) ? n : "")
                                }
                            }), y(e), requestAnimationFrame(() => {
                                var e;
                                null == (e = em.current) || e.slideTo(ex.current, 0)
                            })
                        }, [w, T, N, eo]);
                    return (0, l.jsx)(r.a, {
                        as: "section",
                        "aria-label": "Teams",
                        id: D.Z.teams,
                        ref: f,
                        position: "relative",
                        zIndex: "30",
                        marginTop: "-50vh",
                        sx: {
                            contentVisibility: "auto",
                            containIntrinsicSize: "auto 0 calc(200vh + 340px)",
                            minHeight: "100svh"
                        },
                        children: (0, l.jsxs)(p.e, {
                            mx: "auto",
                            overflow: "hidden",
                            position: "relative",
                            bg: "porscheBlack",
                            sx: {
                                minHeight: "100svh",
                                willChange: W
                            },
                            style: P,
                            pb: "50vh",
                            children: [(0, l.jsx)(J, {
                                config: ed
                            }), (0, l.jsxs)(o.s, {
                                position: "relative",
                                zIndex: "docked",
                                direction: "column",
                                alignItems: "center",
                                width: "full",
                                children: [(0, l.jsx)(r.a, {
                                    marginLeft: "calc(-50vw + 50%)",
                                    alignSelf: "flex-start",
                                    width: "100vw",
                                    children: (0, l.jsx)(M.D, {
                                        textColor: A.A.grey400,
                                        children: (0, l.jsx)(I.U, {
                                            size: "displayLarge",
                                            textAlign: "center",
                                            whiteSpace: "pre-line",
                                            overflow: "visible",
                                            mt: {
                                                base: "9.25rem",
                                                md: 52
                                            },
                                            mb: {
                                                base: 9,
                                                md: 24
                                            },
                                            px: 5,
                                            as: "h2",
                                            sx: {
                                                textWrap: "balance"
                                            },
                                            children: [u, h].map(e => E ? (0, l.jsx)("span", {
                                                children: e
                                            }, e) : (0, l.jsx)(M.w, {
                                                entryProgress: V,
                                                children: e
                                            }, e))
                                        })
                                    })
                                }), (0, l.jsxs)(o.s, {
                                    direction: "column",
                                    alignItems: "center",
                                    width: "full",
                                    children: [(0, l.jsx)(p.e, { ...S && !E && {
                                            initial: X,
                                            animate: ev ? Y : void 0,
                                            transition: Z
                                        },
                                        width: "100vw",
                                        marginLeft: "calc(-50vw + 50%)",
                                        alignSelf: "flex-start",
                                        children: (0, l.jsx)(Q, {
                                            teams: eo,
                                            activeTeamIndex: b,
                                            onTeamChange: ej,
                                            highlightColor: ec.highlightColor,
                                            highlightTextColor: ec.highlightTextColor
                                        })
                                    }), (0, l.jsx)(r.a, {
                                        width: "100vw",
                                        marginLeft: "calc(-50vw + 50%)",
                                        alignSelf: "flex-start",
                                        display: "grid",
                                        gridTemplateColumns: "1fr",
                                        sx: {
                                            "& > *": {
                                                gridArea: "1 / 1",
                                                minWidth: 0
                                            }
                                        },
                                        "aria-live": "polite",
                                        children: (0, l.jsx)(_.N, {
                                            children: eu.length > 0 ? (0, l.jsx)(p.e, { ...!E && {
                                                    initial: $,
                                                    animate: ee,
                                                    exit: et,
                                                    transition: en
                                                },
                                                children: (0, l.jsx)(R, {
                                                    ref: em,
                                                    items: eu,
                                                    initialSlideIndex: ex.current,
                                                    onSlideIndexChange: ef,
                                                    isFirstMount: !ek.current,
                                                    entranceReady: ey
                                                })
                                            }, b) : (0, l.jsx)(r.a, {
                                                minHeight: "400px",
                                                "aria-hidden": "true"
                                            }, "empty-".concat(b))
                                        })
                                    }), eh && (0, l.jsx)(r.a, {
                                        width: "100vw",
                                        marginLeft: "calc(-50vw + 50%)",
                                        alignSelf: "flex-start",
                                        my: 12,
                                        children: (0, l.jsx)(r.a, {
                                            maxWidth: "wrapperContainer",
                                            mx: "auto",
                                            px: {
                                                base: 4,
                                                md: 10
                                            },
                                            display: "grid",
                                            gridTemplateColumns: "1fr",
                                            sx: {
                                                "& > *": {
                                                    gridArea: "1 / 1",
                                                    minWidth: 0
                                                }
                                            },
                                            children: (0, l.jsx)(_.N, {
                                                mode: "popLayout",
                                                children: (0, l.jsx)(p.e, { ... function(e) {
                                                        let {
                                                            prefersReducedMotion: t,
                                                            hasPlayed: n,
                                                            linkReady: l,
                                                            isMobile: r
                                                        } = e;
                                                        return r || t ? er : n ? ea : {
                                                            initial: X,
                                                            animate: l ? Y : void 0,
                                                            transition: Z
                                                        }
                                                    }({
                                                        prefersReducedMotion: E,
                                                        hasPlayed: ek.current,
                                                        linkReady: eC,
                                                        isMobile: !S
                                                    }),
                                                    width: {
                                                        base: "full",
                                                        md: "calc((100% - 32px * 3) / 3.1)"
                                                    },
                                                    children: (0, l.jsx)(K, {
                                                        title: null != (c = null != (s = null == es ? void 0 : es.linkTitle) ? s : null == es ? void 0 : es.teamName) ? c : "",
                                                        description: null != (d = null == es ? void 0 : es.linkTitleDescription) ? d : "",
                                                        href: eh,
                                                        onClick: () => {
                                                            var e;
                                                            (0, k.yn)({
                                                                eventAction: k.wT.linkClick,
                                                                locale: C.locale,
                                                                pageExperience: {
                                                                    pageCategory: w,
                                                                    contentTags: null != N ? N : []
                                                                },
                                                                context: {
                                                                    moduleName: k.B7.teamsSection
                                                                },
                                                                componentClick: {
                                                                    clickElementType: "navigation",
                                                                    clickElementId: T,
                                                                    clickElementName: "Team link: ".concat(null != (e = null == es ? void 0 : es.teamName) ? e : ""),
                                                                    targetUrl: eh,
                                                                    targetType: "internal"
                                                                }
                                                            })
                                                        }
                                                    })
                                                }, "link-".concat(b))
                                            })
                                        })
                                    })]
                                })]
                            })]
                        })
                    })
                });
            ei.displayName = "TeamsSection"
        },
        71735: (e, t, n) => {
            n.d(t, {
                l: () => x
            });
            var l = n(6029),
                r = n(33210),
                a = n(55729),
                i = n(91753),
                o = n(45253),
                s = n(72813),
                c = n(72925),
                d = n(67374),
                u = n(34221);
            let h = "width ".concat(c.E, " ").concat(d.J, ", background-color ").concat(c.E, " ").concat(d.J, ", opacity ").concat(c.E, " ").concat(d.J, ", transform ").concat(c.E, " ").concat(d.J),
                m = "transform ".concat(c.E, " ").concat(d.J),
                p = "@media (prefers-reduced-motion: reduce)",
                x = e => {
                    var t, n;
                    let {
                        activeSlideIndex: c,
                        onClick: d,
                        swiper: x,
                        slideCount: f,
                        motionStyle: g,
                        theme: b = "light",
                        variant: v = "bare",
                        maxVisible: y,
                        showArrows: C = !0,
                        filling: k,
                        fillDuration: j,
                        onNavigate: w,
                        ...T
                    } = e, N = (0, r.Mn)(), R = null != x ? x : N, S = null != (n = null == R || null == (t = R.snapGrid) ? void 0 : t.length) ? n : f && f >= 2 ? f : 0, {
                        transformValue: E,
                        containerWidth: M
                    } = (0, a.useMemo)(() => (function(e, t, n) {
                        if (null == n || e <= n) return {
                            transformValue: "none",
                            containerWidth: void 0
                        };
                        let l = Math.max(0, Math.min(t - Math.floor(n / 2), e - n));
                        return {
                            transformValue: "translateX(-".concat(14 * l, "px)"),
                            containerWidth: (n - 1) * 6 + 18 + (n - 1) * 8
                        }
                    })(S, c, y), [S, c, y]);
                    if (S < 2) return null;
                    let I = "dark" === b ? "allWhite" : "porscheBlack",
                        B = 0 === c,
                        L = c >= S - 1;
                    return (0, l.jsx)(i.e, {
                        style: g,
                        flexShrink: 0,
                        children: (0, l.jsxs)(o.s, {
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 4,
                            ..."contained" === v && {
                                bgColor: "ndlBlack",
                                backdropFilter: "auto",
                                backdropBlur: "ndlFrostedGlassLow",
                                borderRadius: "ndlRadiusSmall",
                                px: 2,
                                py: 1
                            },
                            ...T,
                            children: [C && (0, l.jsx)(u.n, {
                                direction: "prev",
                                onClick: () => {
                                    null == R || R.slidePrev(), null == w || w("prev")
                                },
                                hideLabel: !0,
                                disabled: B,
                                aria: {
                                    "aria-label": "Previous slide"
                                },
                                theme: b
                            }), (0, l.jsx)(o.s, {
                                alignItems: "center",
                                overflow: "hidden",
                                ...null != M && {
                                    width: "".concat(M, "px")
                                },
                                children: (0, l.jsx)(o.s, {
                                    alignItems: "center",
                                    gap: 2,
                                    sx: {
                                        transition: m,
                                        transform: E,
                                        [p]: {
                                            transition: "none"
                                        }
                                    },
                                    children: Array.from({
                                        length: S
                                    }, (e, t) => {
                                        let n = c === t,
                                            r = n && k && null != j;
                                        return (0, l.jsx)(s.a, {
                                            as: "button",
                                            type: "button",
                                            width: n ? "".concat(18, "px") : "".concat(6, "px"),
                                            height: "".concat(6, "px"),
                                            borderRadius: "full",
                                            border: "none",
                                            padding: 0,
                                            cursor: "pointer",
                                            flexShrink: 0,
                                            bgColor: n ? I : "grey300",
                                            position: "relative",
                                            overflow: "hidden",
                                            sx: {
                                                transition: h,
                                                transformOrigin: "center center",
                                                "&:focus-visible": {
                                                    outline: "none",
                                                    boxShadow: "0 0 0 2px #1A44EA"
                                                },
                                                "&::after": {
                                                    content: '""',
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    bottom: 0,
                                                    width: r ? "100%" : "0%",
                                                    borderRadius: "inherit",
                                                    bg: "rgba(255, 255, 255, 0.45)",
                                                    pointerEvents: "none",
                                                    transition: r ? "width ".concat(j, "ms linear") : "none"
                                                },
                                                [p]: {
                                                    transition: "none",
                                                    "&::after": {
                                                        transition: "none"
                                                    }
                                                }
                                            },
                                            onClick: e => {
                                                var n, l;
                                                let r = null != (l = null == R || null == (n = R.params) ? void 0 : n.slidesPerGroup) ? l : 1;
                                                null == R || R.slideTo(t * r), null == d || d(e), null == w || w("pagination", t)
                                            },
                                            "aria-label": n ? "Current slide, slide ".concat(t + 1, " of ").concat(S) : "Go to slide ".concat(t + 1),
                                            "aria-current": n ? "true" : void 0
                                        }, t)
                                    })
                                })
                            }), C && (0, l.jsx)(u.n, {
                                direction: "next",
                                onClick: () => {
                                    null == R || R.slideNext(), null == w || w("next")
                                },
                                hideLabel: !0,
                                disabled: L,
                                aria: {
                                    "aria-label": "Next slide"
                                },
                                theme: b
                            })]
                        })
                    })
                }
        },
        96377: (e, t, n) => {
            n.d(t, {
                U: () => c
            });
            var l = n(6029),
                r = n(77367),
                a = n(69757),
                i = n(38275),
                o = n(35882),
                s = n(21938);
            let c = (0, r.R)((e, t) => {
                let n = (0, a.V)("FluidTypography", e),
                    {
                        className: r,
                        as: c = "h2",
                        children: d,
                        ...u
                    } = (0, i.M)(e);
                return (0, l.jsx)(o.B.h2, {
                    ref: t,
                    as: c,
                    __css: n,
                    className: (0, s.cx)("fluid-typography", r),
                    ...u,
                    children: d
                })
            });
            c.displayName = "FluidTypography"
        }
    }
]);
//# sourceMappingURL=6442.b67d2b759864478c.js.map