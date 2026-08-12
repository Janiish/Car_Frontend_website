"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [9929], {
        12316: (e, t, n) => {
            n.d(t, {
                A: () => x,
                GC: () => y,
                PU: () => b,
                TX: () => g,
                e8: () => v,
                li: () => m,
                nJ: () => i,
                sh: () => p
            });
            var r = n(6029),
                l = n(55729);
            let i = {
                    "m-left-card": "m-left-card",
                    "m-right-top-card": "m-right-top-card",
                    "m-right-bottom-left-card": "m-right-bottom-left-card",
                    "m-right-bottom-right-card": "m-right-bottom-right-card",
                    "widget-launcher": "car-widget-launcher"
                },
                o = {
                    "m-left-card": {
                        width: null,
                        height: null,
                        x: null,
                        y: null
                    },
                    "m-right-top-card": {
                        width: null,
                        height: null,
                        x: null,
                        y: null
                    },
                    "m-right-bottom-left-card": {
                        width: null,
                        height: null,
                        x: null,
                        y: null
                    },
                    "m-right-bottom-right-card": {
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
                a = new Map;

            function s(e) {
                var t;
                let n = a.get(e);
                return (null == n ? void 0 : n.isConnected) ? n : ((n = null != (t = document.getElementById(e)) ? t : void 0) && a.set(e, n), null != n ? n : null)
            }
            let u = () => {
                    var e, t, n, r;
                    let {
                        "widget-launcher": l,
                        ...a
                    } = i, u = { ...o
                    }, c = s(l);
                    if (!c) return u;
                    let d = Object.entries(a).map(e => {
                            let [t, n] = e;
                            return {
                                key: t,
                                element: s(n)
                            }
                        }),
                        f = c.getBoundingClientRect(),
                        h = d.map(e => {
                            let {
                                key: t,
                                element: n
                            } = e;
                            return {
                                key: t,
                                rect: n ? n.getBoundingClientRect() : null
                            }
                        });
                    for (let {
                            key: l,
                            rect: i
                        } of (u["widget-launcher"] = {
                            width: Math.round(null != (e = f.width) ? e : 0),
                            height: Math.round(null != (t = f.height) ? t : 0),
                            x: Math.round(null != (n = f.x) ? n : 0),
                            y: Math.round(null != (r = f.y) ? r : 0)
                        }, h)) i && (u[l] = {
                        width: Math.round(i.width),
                        height: Math.round(i.height),
                        x: Math.round(i.x),
                        y: Math.round(i.y)
                    });
                    return u
                },
                c = (0, l.createContext)(null),
                d = (0, l.createContext)(null),
                f = (0, l.createContext)(null),
                h = (0, l.createContext)(!1),
                p = e => {
                    let {
                        children: t
                    } = e, [n, i] = (0, l.useState)(o), [s, p] = (0, l.useState)(!1), [m, v] = (0, l.useState)(!1), [g, x] = (0, l.useState)(!1), [b, y] = (0, l.useState)(!1), C = (0, l.useRef)(g), w = (0, l.useRef)(b);
                    C.current = g, w.current = b;
                    let k = (0, l.useCallback)(e => {
                            i(t => ((e, t) => {
                                for (let n of Object.keys(e)) {
                                    let r = e[n],
                                        l = t[n];
                                    if (r.width !== l.width || r.height !== l.height || r.x !== l.x || r.y !== l.y) return !1
                                }
                                return !0
                            })(t, e) ? t : e), p(!0)
                        }, []),
                        S = (0, l.useCallback)(() => {
                            k(u())
                        }, [k]);
                    (0, l.useEffect)(() => {
                        (b || g) && S()
                    }, [b, g, S]), (0, l.useEffect)(() => {
                        let e, t, n = () => {
                                (C.current || w.current) && requestAnimationFrame(() => k(u()))
                            },
                            r = () => {
                                clearTimeout(e), e = window.setTimeout(n, 0)
                            },
                            l = () => {
                                t || (t = new ResizeObserver(r)).observe(document.documentElement)
                            },
                            i = () => {
                                null == t || t.disconnect(), t = void 0
                            },
                            o = () => {
                                i(), clearTimeout(e)
                            },
                            a = document.getElementById("cars");
                        if (!a) return l(), o;
                        let s = new IntersectionObserver(e => {
                            var t;
                            (null == (t = e[0]) ? void 0 : t.isIntersecting) ? l(): i()
                        }, {
                            rootMargin: "200px"
                        });
                        return s.observe(a), () => {
                            s.disconnect(), o()
                        }
                    }, [k]), (0, l.useEffect)(() => () => {
                        a.clear()
                    }, []);
                    let E = (0, l.useMemo)(() => ({
                            updateLayout: S,
                            setCanAnimate: v,
                            setIsDashboardOpen: x,
                            setIsInView: y
                        }), [S]),
                        R = (0, l.useMemo)(() => ({
                            layout: n,
                            layoutReady: s
                        }), [n, s]),
                        j = (0, l.useMemo)(() => ({
                            canAnimate: m,
                            isInView: b
                        }), [m, b]);
                    return (0, r.jsx)(f.Provider, {
                        value: E,
                        children: (0, r.jsx)(h.Provider, {
                            value: g,
                            children: (0, r.jsx)(d.Provider, {
                                value: j,
                                children: (0, r.jsx)(c.Provider, {
                                    value: R,
                                    children: t
                                })
                            })
                        })
                    })
                };
            p.displayName = "CarDashboardLayoutProvider";
            let m = () => {
                    let e = (0, l.useContext)(c),
                        t = (0, l.useContext)(d),
                        n = (0, l.useContext)(h);
                    if (!e || !t) throw Error("useCarDashboardLayoutState must be used within a CarDashboardLayoutProvider");
                    return (0, l.useMemo)(() => ({ ...e,
                        ...t,
                        isDashboardOpen: n
                    }), [e, t, n])
                },
                v = () => {
                    let e = (0, l.useContext)(d);
                    if (!e) throw Error("useCarDashboardViewState must be used within a CarDashboardLayoutProvider");
                    return e
                },
                g = () => {
                    let e = (0, l.useContext)(c);
                    if (!e) throw Error("useLayoutReady must be used within a CarDashboardLayoutProvider");
                    return e.layoutReady
                },
                x = () => {
                    let e = (0, l.useContext)(c);
                    if (!e) throw Error("useCarDashboardLayoutOnly must be used within a CarDashboardLayoutProvider");
                    return e
                },
                b = () => {
                    let e = (0, l.useContext)(f);
                    if (!e) throw Error("useCarDashboardLayoutActions must be used within a CarDashboardLayoutProvider");
                    return e
                },
                y = () => (0, l.useContext)(h)
        },
        27275: (e, t, n) => {
            n.d(t, {
                S: () => C
            });
            var r = n(6029),
                l = n(77367),
                i = n(69757),
                o = n(38275),
                a = n(35882),
                s = n(21938),
                u = n(55729),
                c = n(73738);

            function d(e, t) {
                "function" == typeof e ? e(t) : e && (e.current = t)
            }

            function f(e, t, n, r) {
                let l = { ...{
                        transform: "translate3d(".concat(Math.max(t.offsetLeft, 0), "px, 0, 0)"),
                        width: "".concat(t.offsetWidth, "px")
                    },
                    backgroundColor: n
                };
                if (!r) return void Object.assign(e.style, l);
                e.style.transition = "none", Object.assign(e.style, l), e.getBoundingClientRect(), e.style.transition = ""
            }
            let h = c.A.ndlMotorsportsRed,
                p = c.A.allWhite,
                m = (0, u.createContext)(null);

            function v() {
                let e = (0, u.useContext)(m);
                if (!e) throw Error("NdlToolbar compound components must be rendered inside <NdlToolbar.Root>.");
                return e
            }
            let g = (0, l.R)((e, t) => {
                let n = (0, i.o)("NdlToolbar", e),
                    {
                        activeIndex: l,
                        onActiveIndexChange: c,
                        highlightColor: v = h,
                        highlightTextColor: g = p,
                        children: x,
                        className: b,
                        ...y
                    } = (0, o.M)(e),
                    C = (0, u.useRef)(null),
                    w = (0, u.useRef)([]),
                    k = (0, u.useRef)(null),
                    S = (0, u.useRef)(0),
                    E = (0, u.useCallback)(e => {
                        C.current = e, d(t, e)
                    }, [t]);
                return ! function(e, t, n, r, l) {
                    let i = (0, u.useRef)(!1),
                        o = (0, u.useRef)(!1);
                    (0, u.useEffect)(() => {
                        var o;
                        let a = n.current,
                            s = null == (o = r.current) ? void 0 : o[e];
                        if (!a || !s) return;
                        let u = !i.current;
                        f(a, s, t, u), u && (i.current = !0),
                            function(e, t, n) {
                                if (!e || e.scrollWidth <= e.clientWidth) return;
                                let r = t.offsetLeft + t.offsetWidth / 2 - e.clientWidth / 2,
                                    l = n && !("function" == typeof globalThis.matchMedia && globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches);
                                e.scrollTo({
                                    left: r,
                                    behavior: l ? "smooth" : "auto"
                                })
                            }(l.current, s, i.current)
                    }, [e, t, n, r, l]), (0, u.useEffect)(() => {
                        let l = () => {
                            var l;
                            let i = n.current,
                                o = null == (l = r.current) ? void 0 : l[e];
                            i && o && f(i, o, t, !0)
                        };
                        if (globalThis.addEventListener("resize", l), !o.current) {
                            let e = !1;
                            return document.fonts.ready.then(() => {
                                o.current = !0, e || l()
                            }), () => {
                                e = !0, globalThis.removeEventListener("resize", l)
                            }
                        }
                        return () => globalThis.removeEventListener("resize", l)
                    }, [e, t, n, r])
                }(l, v, k, w, C), (0, r.jsx)(m.Provider, {
                    value: {
                        activeIndex: l,
                        onActiveIndexChange: c,
                        highlightColor: v,
                        highlightTextColor: g,
                        buttonRefs: w,
                        indicatorRef: k,
                        viewportRef: C,
                        buttonCount: S,
                        styles: n
                    },
                    children: (0, r.jsx)(a.B.div, {
                        ref: E,
                        __css: n.viewport,
                        className: (0, s.cx)("ndl-toolbar", b),
                        ...y,
                        children: x
                    })
                })
            });
            g.displayName = "NdlToolbar.Root";
            let x = (0, l.R)((e, t) => {
                let {
                    index: n,
                    asChild: l,
                    children: i,
                    className: o,
                    onClick: c,
                    onKeyDown: f,
                    type: h,
                    ...p
                } = e, {
                    activeIndex: m,
                    onActiveIndexChange: g,
                    highlightTextColor: x,
                    buttonRefs: b,
                    styles: y
                } = v(), C = null != n ? n : 0, w = C === m, k = (0, u.useCallback)(e => {
                    b.current[C] = e, d(t, e)
                }, [t, b, C]), S = (0, u.useCallback)(e => {
                    g(C), null == c || c(e)
                }, [g, C, c]), E = (0, u.useCallback)(e => {
                    var t;
                    let n = b.current.filter(Boolean).length,
                        r = function(e, t, n) {
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
                        }(e.key, m, n);
                    null != r && (e.preventDefault(), g(r), null == (t = b.current[r]) || t.focus({
                        preventScroll: !0
                    }), null == f || f(e))
                }, [m, g, b, f]), R = {
                    ref: k,
                    "aria-pressed": w,
                    tabIndex: w ? 0 : -1,
                    onClick: S,
                    onKeyDown: E,
                    className: (0, s.cx)("ndl-toolbar__button", o),
                    role: "button"
                };
                if (l) {
                    let e = u.Children.only(i);
                    if (!(0, u.isValidElement)(e)) throw Error("NdlToolbar.Button asChild expects a single valid React element.");
                    let t = e.ref,
                        n = "className" in e.props ? e.props.className : void 0;
                    return (0, u.cloneElement)(e, { ...e.props,
                        ref: function() {
                            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                            return e => {
                                t.forEach(t => null != t && d(t, e))
                            }
                        }(k, t),
                        "aria-pressed": w,
                        tabIndex: w ? 0 : -1,
                        role: "button",
                        onClick: S,
                        onKeyDown: E,
                        className: (0, s.cx)("ndl-toolbar__button", o, n)
                    })
                }
                return (0, r.jsx)(a.B.button, { ...R,
                    type: "button",
                    __css: y.button,
                    color: w ? x : void 0,
                    ...p,
                    children: i
                })
            });
            x.displayName = "NdlToolbar.Button";
            let b = (0, l.R)((e, t) => {
                let {
                    children: n,
                    className: l,
                    ...i
                } = e, {
                    styles: o
                } = v(), c = 0, d = u.Children.map(n, e => (0, u.isValidElement)(e) && e.type === x ? (0, u.cloneElement)(e, { ...e.props,
                    index: c++
                }) : e);
                return (0, r.jsx)(a.B.div, {
                    ref: t,
                    role: "toolbar",
                    "aria-orientation": "horizontal",
                    __css: o.buttonGroup,
                    className: (0, s.cx)("ndl-toolbar__button-group", l),
                    ...i,
                    children: d
                })
            });
            b.displayName = "NdlToolbar.ButtonGroup";
            let y = (0, l.R)((e, t) => {
                let {
                    className: n,
                    ...l
                } = e, {
                    indicatorRef: i,
                    styles: o
                } = v(), c = (0, u.useCallback)(e => {
                    i.current = e, d(t, e)
                }, [t, i]);
                return (0, r.jsx)(a.B.span, {
                    ref: c,
                    "aria-hidden": "true",
                    __css: o.indicator,
                    className: (0, s.cx)("ndl-toolbar__indicator", n),
                    ...l
                })
            });
            y.displayName = "NdlToolbar.Indicator";
            let C = {
                Root: g,
                ButtonGroup: b,
                Indicator: y,
                Button: x
            }
        },
        79929: (e, t, n) => {
            n.r(t), n.d(t, {
                CarsSection: () => er
            });
            var r = n(6029),
                l = n(55729),
                i = n(63504),
                o = n(21593),
                a = n(19315),
                s = n(81278),
                u = n(72813),
                c = n(91753),
                d = n(45253),
                f = n(86590),
                h = n(93066),
                p = n(80321),
                m = n(34675),
                v = n(31147),
                g = n(20207),
                x = n(85147),
                b = n(56266),
                y = n(12316),
                C = n(70659),
                w = n(72744),
                k = n(84721),
                S = n(33126),
                E = n(96692),
                R = n(65322);
            let j = {
                    scale: {
                        duration: .16,
                        ease: R.xQ
                    }
                },
                T = (0, l.memo)(function(e) {
                    var t, n;
                    let {
                        car3d: i,
                        selfAnimated: o = !0
                    } = e, {
                        shouldAnimate: a,
                        canAnimate: d,
                        isDashboardOpen: f,
                        launcherDelay: m,
                        handleClick: v
                    } = function() {
                        var e;
                        let t = (0, y.TX)(),
                            {
                                isInView: n,
                                canAnimate: r
                            } = (0, y.e8)(),
                            l = (0, y.GC)(),
                            {
                                updateLayout: i,
                                setCanAnimate: o,
                                setIsDashboardOpen: a
                            } = (0, y.PU)(),
                            s = (e = !!l, r || e ? e ?.33 : .75 : 0);
                        return {
                            shouldAnimate: t && n,
                            canAnimate: r,
                            isDashboardOpen: l,
                            launcherDelay: s,
                            handleClick: () => {
                                i(), o(!0), a(!0)
                            }
                        }
                    }(), {
                        prefersReducedMotion: g
                    } = (0, E.P2)(), {
                        locale: x
                    } = (0, s.useRouter)(), {
                        state: {
                            pageType: b,
                            pageId: T,
                            pageContentTags: N
                        }
                    } = (0, h.CU)(), I = (0, l.useRef)(i);
                    (0, l.useEffect)(() => {
                        a && (I.current = i)
                    }, [a, i]);
                    let M = a ? i : I.current,
                        L = null == M ? void 0 : M.dashboardWidgetLauncherLabel,
                        A = null != (n = null == M ? void 0 : M.displayName) ? n : (null == M || null == (t = M.car) ? void 0 : t.__typename) === "Car" ? M.car.name : void 0,
                        {
                            motionProps: H,
                            opacityStyle: P,
                            isInteractive: F
                        } = o ? {
                            motionProps: {
                                initial: !a && {
                                    y: 20
                                },
                                animate: {
                                    y: 20 * !a
                                },
                                transition: {
                                    duration: .6,
                                    ease: R.m1,
                                    delay: m,
                                    ...j
                                }
                            },
                            opacityStyle: {
                                opacity: a && !f ? 1 : 0,
                                transition: "opacity 0.6s ".concat((0, R.lF)(R.m1), " ").concat(m, "s")
                            },
                            isInteractive: a && !f
                        } : {
                            motionProps: {
                                transition: j
                            },
                            opacityStyle: {
                                opacity: +!f,
                                transition: "opacity 0.3s ease"
                            },
                            isInteractive: !f
                        };
                    return (0, r.jsx)(c.e, {
                        as: "button",
                        type: "button",
                        "data-group": !0,
                        id: y.nJ["widget-launcher"],
                        position: "relative",
                        zIndex: f || d ? 2e3 : 11,
                        pointerEvents: F ? "auto" : "none",
                        width: {
                            base: "100%",
                            l: "auto"
                        },
                        height: S.A.navQuickLinksHeight,
                        flexShrink: 0,
                        cursor: "pointer",
                        isolation: "isolate",
                        border: "none",
                        padding: 0,
                        backgroundColor: "transparent",
                        onClick: () => {
                            var e;
                            (0, p.yn)({
                                eventAction: p.wT.carDashboardOpen,
                                locale: x,
                                pageExperience: {
                                    pageCategory: b,
                                    contentTags: null != N ? N : []
                                },
                                context: {
                                    moduleName: p.B7.carDashboard
                                },
                                componentClick: {
                                    clickElementType: "interaction",
                                    clickElementId: T,
                                    clickElementName: "Launcher: ".concat(null != (e = null != A ? A : L) ? e : "")
                                }
                            }), v()
                        },
                        "aria-label": null != L ? L : void 0,
                        ...H,
                        whileTap: {
                            scale: .98
                        },
                        style: P,
                        children: (0, r.jsxs)(C.U, {
                            colorScheme: "black",
                            borderRadius: "ndlRadiusSmall",
                            width: "full",
                            height: "full",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: {
                                base: "row",
                                l: "row-reverse"
                            },
                            padding: 0,
                            overflow: "hidden",
                            position: "relative",
                            children: [(0, r.jsx)(u.a, {
                                position: "absolute",
                                inset: 0,
                                borderRadius: "ndlRadiusSmall",
                                backgroundColor: "transparent",
                                pointerEvents: "none",
                                transitionProperty: "background-color",
                                transitionDuration: "short",
                                _groupHover: {
                                    backgroundColor: "ndlLanguageSelectorHoverBg"
                                }
                            }), (0, r.jsx)(u.a, {
                                position: "relative",
                                zIndex: 1,
                                flex: 1,
                                minWidth: "0",
                                pl: {
                                    base: 4,
                                    l: 0
                                },
                                pr: 4,
                                display: "flex",
                                alignItems: "center",
                                children: (0, r.jsx)(w.X, {
                                    size: "headerS",
                                    color: "allWhite",
                                    whiteSpace: "nowrap",
                                    children: (0, r.jsx)(c.e, {
                                        as: "span",
                                        display: "inline-block",
                                        initial: {
                                            opacity: 0
                                        },
                                        animate: {
                                            opacity: 1
                                        },
                                        transition: {
                                            duration: .35 * !g,
                                            ease: R.m1
                                        },
                                        children: L
                                    }, null != L ? L : "empty")
                                })
                            }), (0, r.jsx)(u.a, {
                                position: "relative",
                                zIndex: 1,
                                width: S.A.navQuickLinksHeight,
                                height: S.A.navQuickLinksHeight,
                                flexShrink: 0,
                                borderRadius: "ndlRadiusXSmall",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                children: (0, r.jsx)(k.E, {
                                    name: "grid",
                                    color: "white"
                                })
                            })]
                        })
                    })
                });
            T.displayName = "CarDashboardWidgetLauncher";
            var N = n(71024),
                I = n.n(N),
                M = n(27275);
            let L = (0, l.memo)(function(e) {
                let {
                    cars: t,
                    activeCarIndex: n,
                    onCarChange: l,
                    onPrefetchCar: i,
                    highlightColor: o,
                    highlightTextColor: a
                } = e;
                return (0, r.jsx)(d.s, {
                    justifyContent: {
                        base: "flex-start",
                        l: "center"
                    },
                    width: "full",
                    children: (0, r.jsx)(M.S.Root, {
                        activeIndex: n,
                        onActiveIndexChange: l,
                        highlightColor: o,
                        highlightTextColor: a,
                        className: "scroll-fade-x",
                        "data-lenis-prevent-horizontal": !0,
                        children: (0, r.jsxs)(M.S.ButtonGroup, {
                            "aria-label": "Cars selection",
                            children: [(0, r.jsx)(M.S.Indicator, {}), t.filter(e => !!e).map((e, t) => {
                                var n, l, o;
                                return (0, r.jsx)(M.S.Button, {
                                    onMouseEnter: () => null == i ? void 0 : i(t),
                                    onFocus: () => null == i ? void 0 : i(t),
                                    children: null != (o = e.displayName) ? o : (null == (n = e.car) ? void 0 : n.__typename) === "Car" ? e.car.name : void 0
                                }, null == (l = e.sys) ? void 0 : l.id)
                            })]
                        })
                    })
                })
            });

            function A(e, t) {
                let n, r, l = window.innerWidth,
                    i = window.innerHeight;
                l / i > e ? (n = l, r = l / e) : (r = i, n = i * e);
                let o = null != t ? t : n;
                return {
                    renderedW: n,
                    renderedH: r,
                    offsetX: (n - l) / 2,
                    offsetY: (r - i) / 2,
                    scale: n / o
                }
            }
            L.displayName = "CarsSelector";
            let H = l.useLayoutEffect,
                P = v.g.findIndex(e => "cars" === e.sectionId);

            function F(e, t) {
                (null == e ? void 0 : e.isReady()) && e.seekToProgress(Math.min(Math.max(t, 0), 1))
            }

            function B(e, t, n) {
                let r = [...e];
                return r[t] = n, r
            }
            var _ = n(25653);
            let D = [.15, .25],
                z = [.74, .81];
            var O = n(50887),
                V = n(18822),
                W = n(81624),
                G = n(6937);
            let Q = (0, l.memo)(function(e) {
                let {
                    hotspots: t
                } = e, [n, i] = (0, l.useState)(null), {
                    locale: o
                } = (0, s.useRouter)(), {
                    state: {
                        pageType: a,
                        pageId: c,
                        pageContentTags: f
                    }
                } = (0, h.CU)();
                return 0 === t.length ? null : (0, r.jsx)(d.s, {
                    direction: "column",
                    gap: 4,
                    width: "full",
                    children: (0, r.jsx)(u.a, {
                        "data-lenis-prevent-horizontal": !0,
                        sx: {
                            touchAction: "manipulation"
                        },
                        children: (0, r.jsx)(O.FN, {
                            modules: [V.Jq],
                            slidesPerView: 1.08,
                            slidesPerGroup: 1,
                            spaceBetween: "16px",
                            overflow: "visible",
                            breakpoints: {
                                [Number.parseInt(G.A.xs, 10)]: {
                                    slidesPerView: 2.1,
                                    slidesPerGroup: 1
                                },
                                [Number.parseInt(G.A.s, 10)]: {
                                    slidesPerView: 3.1,
                                    slidesPerGroup: 1
                                }
                            },
                            speed: 500,
                            longSwipesRatio: .15,
                            shortSwipes: !0,
                            grabCursor: !0,
                            onSnapIndexChange: () => i(null),
                            sx: {
                                "& .swiper-wrapper": {
                                    alignItems: "flex-end",
                                    cursor: "grab"
                                },
                                "& .swiper-wrapper:active": {
                                    cursor: "grabbing"
                                }
                            },
                            children: t.map((e, t) => (0, r.jsx)(O.oL, {
                                children: (0, r.jsx)(W.D, {
                                    title: e.title,
                                    subtitle: e.subtitle,
                                    description: e.description,
                                    detailsAsset: e.asset,
                                    isOpen: n === t,
                                    onOpenChange: n => {
                                        var r;
                                        return r = e.title, void((0, p.yn)({
                                            eventAction: p.wT.carHotspotDetailsCardToggle,
                                            locale: o,
                                            pageExperience: {
                                                pageCategory: a,
                                                contentTags: null != f ? f : []
                                            },
                                            context: {
                                                moduleName: p.B7.carsSection
                                            },
                                            componentClick: {
                                                clickElementType: "interaction",
                                                clickElementId: c,
                                                clickElementName: "".concat(n ? "Open" : "Close", ": ").concat(r)
                                            }
                                        }), i(n ? t : null))
                                    },
                                    style: {
                                        width: "100%"
                                    }
                                })
                            }, "".concat(e.title, "-").concat(e.x, "-").concat(e.y)))
                        })
                    })
                })
            });
            Q.displayName = "CarHotspotsSlider";
            let q = (0, l.memo)(function(e) {
                let {
                    hotspotsVisible: t,
                    visible: n,
                    onToggle: l
                } = e, {
                    isDesktopMd: i
                } = (0, E.uS)(), {
                    prefersReducedMotion: a
                } = (0, E.P2)();
                return (0, r.jsx)(u.a, {
                    as: "button",
                    position: "relative",
                    width: S.A.navQuickLinksHeight,
                    height: S.A.navQuickLinksHeight,
                    flexShrink: 0,
                    cursor: n ? "pointer" : "default",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "ndlRadiusSmall",
                    backgroundColor: "transparent",
                    border: "none",
                    color: "white",
                    transitionProperty: "opacity, background-color, transform",
                    transitionDuration: "short",
                    onClick: l,
                    "aria-label": t ? "Hide hotspots" : "Show hotspots",
                    title: t ? "Hide hotspots" : "Show hotspots",
                    style: {
                        opacity: +!!n,
                        pointerEvents: n ? "auto" : "none"
                    },
                    _hover: {
                        backgroundColor: "ndlLanguageSelectorHoverBg"
                    },
                    _active: {
                        transform: "scale(0.97)"
                    },
                    children: (0, r.jsx)(o.N, {
                        mode: "popLayout",
                        initial: !1,
                        children: (0, r.jsx)(c.e, {
                            initial: i ? {
                                opacity: 0,
                                scale: .25,
                                filter: "blur(4px)"
                            } : {
                                opacity: 0,
                                scale: .25
                            },
                            animate: i ? {
                                opacity: 1,
                                scale: 1,
                                filter: "blur(0px)"
                            } : {
                                opacity: 1,
                                scale: 1
                            },
                            exit: i ? {
                                opacity: 0,
                                scale: .25,
                                filter: "blur(4px)"
                            } : {
                                opacity: 0,
                                scale: .25
                            },
                            transition: a ? {
                                duration: 0
                            } : {
                                type: "spring",
                                duration: .3,
                                bounce: 0
                            },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            children: (0, r.jsx)(k.E, {
                                name: t ? "view" : "view-off",
                                color: "white"
                            })
                        }, t ? "view" : "view-off")
                    })
                })
            });
            q.displayName = "CarHotspotToggle";
            var Y = n(49360);

            function U(e) {
                if (!e) return [];
                let t = [];
                for (let o of e) {
                    var n, r, l, i;
                    (null == o ? void 0 : o.title) != null && t.push({
                        x: null != (n = o.positionRight) ? n : 0,
                        y: null != (r = o.positionTop) ? r : 0,
                        title: o.title,
                        subtitle: null != (l = o.subtitle) ? l : void 0,
                        description: null != (i = o.description) ? i : void 0,
                        asset: o.asset
                    })
                }
                return t
            }
            var X = n(93163);
            let J = (0, l.memo)(function(e) {
                let {
                    hotspot: t,
                    index: n,
                    scale: i,
                    isOpen: o,
                    onOpenChange: a
                } = e, s = (0, X.tF)(), [c, d] = (0, l.useState)(!1), {
                    prefersReducedMotion: f
                } = (0, E.P2)();
                (0, l.useEffect)(() => {
                    if (s) {
                        let e = requestAnimationFrame(() => d(!0));
                        return () => cancelAnimationFrame(e)
                    }
                    d(!1)
                }, [s]);
                let h = c ? "opacity 0.35s ".concat((0, R.lF)(R.xQ), " ").concat(f ? 0 : .08 * n, "s") : "opacity 0.2s ".concat((0, R.lF)(R.xQ), " 0s");
                return (0, r.jsx)(u.a, {
                    style: {
                        transform: "scale(".concat(i, ")"),
                        pointerEvents: c ? "auto" : "none",
                        cursor: c ? "pointer" : "default"
                    },
                    children: (0, r.jsx)(W.D, {
                        title: t.title,
                        subtitle: t.subtitle,
                        description: t.description,
                        detailsAsset: t.asset,
                        isOpen: o,
                        onOpenChange: a,
                        style: {
                            opacity: +!!c,
                            transition: h
                        }
                    })
                })
            });
            J.displayName = "CarHotspot";
            let K = (0, l.memo)(function(e) {
                let {
                    shouldAnimate: t,
                    isVisible: n,
                    hotspotsVisible: i,
                    effectiveHotspotSet: o,
                    selectedCarIndex: a,
                    prefersReducedMotion: s,
                    hotspotMetrics: c,
                    activeCarHotspots: d,
                    onSentinelFocus: f,
                    onOverlayBlur: h
                } = e, p = (0, l.useRef)(null), m = (0, l.useRef)(null), v = (0, l.useCallback)(e => {
                    let t = e.currentTarget.parentElement;
                    for (; t;) 0 !== t.scrollLeft && (t.scrollLeft = 0), t = t.parentElement
                }, []), g = (0, l.useCallback)(e => {
                    f(e), requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            let t = "front" === e ? p.current : m.current,
                                n = null == t ? void 0 : t.querySelector("[data-details-card] button");
                            null == n || n.focus({
                                preventScroll: !0
                            })
                        })
                    })
                }, [f]);
                return (0, r.jsxs)(u.a, {
                    position: "absolute",
                    inset: "0",
                    pointerEvents: "none",
                    zIndex: 5,
                    display: {
                        base: "none",
                        l: "block"
                    },
                    onFocus: v,
                    onBlur: h,
                    children: [(0, r.jsx)(Z, {
                        groupRef: p,
                        set: "front",
                        isVisible: n,
                        hotspotsVisible: i,
                        shouldAnimate: t,
                        effectiveHotspotSet: o,
                        hotspots: d.front,
                        selectedCarIndex: a,
                        prefersReducedMotion: s,
                        hotspotMetrics: c,
                        onSentinelFocus: g,
                        ariaLabel: "Front car details"
                    }), (0, r.jsx)(Z, {
                        groupRef: m,
                        set: "back",
                        isVisible: n,
                        hotspotsVisible: i,
                        shouldAnimate: t,
                        effectiveHotspotSet: o,
                        hotspots: d.back,
                        selectedCarIndex: a,
                        prefersReducedMotion: s,
                        hotspotMetrics: c,
                        onSentinelFocus: g,
                        ariaLabel: "Rear car details"
                    })]
                })
            });

            function Z(e) {
                let {
                    groupRef: t,
                    set: n,
                    isVisible: i,
                    hotspotsVisible: a,
                    shouldAnimate: s,
                    effectiveHotspotSet: d,
                    hotspots: f,
                    selectedCarIndex: h,
                    prefersReducedMotion: p,
                    hotspotMetrics: m,
                    onSentinelFocus: v,
                    ariaLabel: g
                } = e, [x, b] = (0, l.useState)(null);
                (0, l.useEffect)(() => {
                    i && a && d === n || b(null)
                }, [i, a, d, n]), (0, l.useEffect)(() => {
                    b(null)
                }, [h]);
                let y = (0, l.useCallback)((e, t) => {
                    b(t ? e : null)
                }, []);
                return (0, r.jsxs)(u.a, {
                    ref: t,
                    children: [(0, r.jsx)(u.a, {
                        as: "span",
                        tabIndex: i && a && f.length > 0 ? 0 : -1,
                        position: "absolute",
                        width: "1px",
                        height: "1px",
                        overflow: "hidden",
                        sx: {
                            clip: "rect(0,0,0,0)"
                        },
                        "aria-label": g,
                        onFocus: e => {
                            var r;
                            null != (r = t.current) && r.contains(e.relatedTarget) || v(n)
                        }
                    }), (0, r.jsx)(o.N, {
                        children: s && d === n && a && f.map((e, t) => (0, r.jsx)(c.e, {
                            position: "absolute",
                            pointerEvents: "auto",
                            style: function(e, t, n) {
                                let r = e / 100 * n.renderedW - n.offsetX,
                                    l = t / 100 * n.renderedH - n.offsetY;
                                return {
                                    left: "".concat(r, "px"),
                                    top: "".concat(l, "px")
                                }
                            }(e.x, e.y, m),
                            initial: {
                                y: 12,
                                opacity: 0
                            },
                            animate: {
                                y: 0,
                                opacity: 1,
                                transition: {
                                    duration: .4,
                                    ease: R.xQ,
                                    delay: p ? 0 : .08 * t
                                }
                            },
                            exit: {
                                y: 12,
                                opacity: 0,
                                transition: {
                                    duration: .2,
                                    ease: R.xQ,
                                    delay: 0
                                }
                            },
                            children: (0, r.jsx)(J, {
                                hotspot: e,
                                index: t,
                                scale: m.scale,
                                isOpen: x === t,
                                onOpenChange: e => y(t, e)
                            })
                        }, "".concat(h, "-").concat(n, "-").concat(t)))
                    })]
                })
            }
            K.displayName = "CarHotspotsOverlay";
            var $ = n(649),
                ee = n(62015);
            let et = I()(() => n.e(2087).then(n.bind(n, 62087)).then(e => ({
                    default: e.CarDashboardGrid
                })), {
                    loadableGenerated: {
                        webpack: () => [62087]
                    },
                    ssr: !1
                }),
                en = (0, l.memo)(function(e) {
                    var t;
                    let {
                        loaderActive: n,
                        onInitialCarReady: C,
                        ...w
                    } = e, {
                        isDesktopL: k
                    } = (0, E.uS)(), S = (0, l.useMemo)(() => {
                        var e, t;
                        return (null != (t = null == (e = w.carsSectionCarsCollection) ? void 0 : e.items) ? t : []).filter(e => null != e)
                    }, [null == (t = w.carsSectionCarsCollection) ? void 0 : t.items]), j = (0, l.useMemo)(() => (0, Y.ow)(S, k), [S, k]), {
                        locale: N
                    } = (0, s.useRouter)(), {
                        state: {
                            pageType: I,
                            pageId: M,
                            pageContentTags: O
                        }
                    } = (0, h.CU)(), V = (0, y.TX)(), {
                        isInView: W
                    } = (0, y.e8)(), {
                        setIsInView: G
                    } = (0, y.PU)(), X = (0, a.xP)(), {
                        scrollToWaypoint: J
                    } = (0, b.Sw)(), Z = (0, b.mi)(), [en, er] = (0, l.useState)(0), [el, ei] = (0, l.useState)(!1), eo = S[en], ea = Y.jE[(0, Y.kV)(null == eo ? void 0 : eo.theme)], es = (0, l.useMemo)(() => {
                        var e, t;
                        return {
                            front: U(null == eo || null == (e = eo.carDetailHotspotsFrontCollection) ? void 0 : e.items),
                            back: U(null == eo || null == (t = eo.carDetailHotspotsBackCollection) ? void 0 : t.items)
                        }
                    }, [eo]), {
                        isDesktopL: eu,
                        isMobileLandscape: ec
                    } = (0, E.uS)(), {
                        prefersReducedMotion: ed
                    } = (0, E.P2)(), ef = (0, l.useRef)(eu);
                    (0, l.useEffect)(() => {
                        ef.current = eu
                    }, [eu]);
                    let eh = (0, l.useMemo)(() => [...es.front, ...es.back], [es]),
                        [ep, em] = (0, l.useState)(!0),
                        [ev, eg] = (0, l.useState)(null),
                        ex = (0, l.useRef)(null),
                        eb = (0, l.useRef)(null),
                        ey = (0, l.useRef)(null),
                        eC = (0, l.useRef)(null),
                        [ew, ek] = (0, l.useState)(!1),
                        eS = (0, l.useRef)(!1);
                    (0, l.useEffect)(() => {
                        let e = eb.current;
                        if (!e) return;
                        let t = new IntersectionObserver(e => {
                            var n;
                            !eS.current && (null == (n = e[0]) ? void 0 : n.isIntersecting) && (eS.current = !0, ek(!0), t.disconnect())
                        }, {
                            rootMargin: "200px"
                        });
                        return t.observe(e), () => t.disconnect()
                    }, []);
                    let eE = (0, l.useRef)([null, null]),
                        eR = (0, l.useRef)(new Map),
                        ej = (0, l.useCallback)(e => {
                            var t;
                            if (e === en) return;
                            let n = j[e],
                                r = null != (t = null == n ? void 0 : n.fsv) ? t : null == n ? void 0 : n.mp4;
                            r && (0, m.F)(r)
                        }, [en, j]);
                    (0, l.useEffect)(() => {
                        var e;
                        let t = j[en],
                            n = null != (e = null == t ? void 0 : t.fsv) ? e : null == t ? void 0 : t.mp4;
                        if (!n) return;
                        let r = setTimeout(() => {
                            if (eS.current) return;
                            let e = navigator.connection;
                            null != e && e.saveData || (0, m.F)(n)
                        }, 2500);
                        return () => clearTimeout(r)
                    }, [j, en]);
                    let {
                        relayout: eT,
                        metrics: eN
                    } = function(e, t, n) {
                        let r = !(arguments.length > 3) || void 0 === arguments[3] || arguments[3],
                            i = (0, l.useRef)(e);
                        i.current = e;
                        let o = (0, l.useRef)(null),
                            a = (0, l.useRef)(null),
                            [s, u] = (0, l.useState)(() => A(e, null));
                        return (0, l.useEffect)(() => {
                            let e;
                            if (!r) {
                                var n;
                                null == (n = t.current) || n.forEach(e => {
                                    e.style.position = "", e.style.top = "", e.style.left = "", e.style.transform = "", e.style.width = "", e.style.height = "", e.style.maxWidth = "", e.style.maxHeight = ""
                                }), a.current = null;
                                return
                            }

                            function l() {
                                var e;
                                let n = A(i.current, o.current);
                                null != o.current || (o.current = n.renderedW);
                                let r = "".concat(n.renderedW, "px"),
                                    l = "".concat(n.renderedH, "px");
                                null == (e = t.current) || e.forEach(e => {
                                    e.style.position = "absolute", e.style.top = "50%", e.style.left = "50%", e.style.transform = "translate(-50%, -50%)", e.style.width = r, e.style.height = l, e.style.maxWidth = "none", e.style.maxHeight = "none"
                                }), u(n)
                            }
                            let s = () => {
                                void 0 === e && (e = requestAnimationFrame(() => {
                                    l(), e = void 0
                                }))
                            };
                            return a.current = l, l(), window.addEventListener("resize", s, {
                                passive: !0
                            }), () => {
                                window.removeEventListener("resize", s), void 0 !== e && cancelAnimationFrame(e), a.current = null
                            }
                        }, [t, n, r]), {
                            relayout: (0, l.useCallback)(() => {
                                var e;
                                null == (e = a.current) || e.call(a)
                            }, []),
                            metrics: s
                        }
                    }(Y.tI, eR, eC, eu), eI = [(0, l.useCallback)(e => {
                        var t;
                        eE.current[0] = e;
                        let n = null != (t = null == e ? void 0 : e.element) ? t : null;
                        n ? eR.current.set("car-0", n) : eR.current.delete("car-0"), eT()
                    }, [eT]), (0, l.useCallback)(e => {
                        var t;
                        eE.current[1] = e;
                        let n = null != (t = null == e ? void 0 : e.element) ? t : null;
                        n ? eR.current.set("car-1", n) : eR.current.delete("car-1"), eT()
                    }, [eT])], eM = (0, b.kr)(e => e.position.sectionIndex >= Y.$5), eL = (0, l.useRef)(W);
                    eL.current = W;
                    let {
                        scrollYProgress: eA,
                        exitProgress: eH,
                        entryProgress: eP
                    } = function(e, t) {
                        let {
                            scrollYProgress: n
                        } = (0, _.L)({
                            target: e,
                            offset: ["start start", "end start"]
                        }), r = (0, l.useRef)(.85);
                        (0, l.useEffect)(() => {
                            let t = () => {
                                let t = e.current;
                                t && (r.current = Math.max(.01, 1 - window.innerHeight / t.offsetHeight))
                            };
                            return t(), window.addEventListener("resize", t, {
                                passive: !0
                            }), () => window.removeEventListener("resize", t)
                        }, [e]);
                        let o = (0, i.G)(n, e => Math.min(e / r.current, 1)),
                            a = (0, i.G)(n, e => {
                                let t = r.current;
                                return Math.max(0, (e - t) / (1 - t))
                            }),
                            {
                                scrollYProgress: s
                            } = (0, _.L)({
                                target: t,
                                offset: ["start end", "start start"]
                            });
                        return {
                            scrollYProgress: o,
                            exitProgress: a,
                            entryProgress: s
                        }
                    }(ex, eb), eF = function(e, t, n, r) {
                        let [i, o] = (0, l.useState)(null), a = (0, l.useRef)(null);
                        return (0, l.useEffect)(() => e.on("change", e => {
                            let l = e >= D[0] && e <= D[1] ? "front" : e >= z[0] && e <= z[1] ? "back" : null;
                            l !== a.current && (a.current = l, o(l)), e >= D[0] && !r.current && (t(!0), n(!0))
                        }), [e, t, n, r]), i
                    }(eA, G, ei, eL), eB = null != ev ? ev : eF, {
                        parallaxY: e_,
                        isFixed: eD,
                        isVisible: ez
                    } = function(e, t, n, r, o) {
                        let [a, s] = (0, l.useState)("entry"), u = (0, l.useRef)(a);
                        u.current = a;
                        let c = (0, l.useRef)(0);
                        return H(() => {
                            let n = t.current,
                                r = e.current;
                            if (!n || !r) return;
                            let l = window.scrollY,
                                i = window.innerHeight,
                                o = n.getBoundingClientRect().top + l,
                                a = r.getBoundingClientRect().top + l + r.offsetHeight,
                                u = Math.min(Math.max((l - o + i) / i, 0), 1),
                                c = Math.min(Math.max((l - a + i) / i, 0), 1);
                            u >= .99 && c >= .99 ? s("hidden") : u >= .99 && s("fixed")
                        }, []), (0, l.useEffect)(() => r.on("change", e => {
                            e < .99 && "entry" !== u.current ? s("entry") : e >= .99 && "entry" === u.current && s("fixed")
                        }), [r]), (0, l.useEffect)(() => o.on("change", e => {
                            e >= .99 && "fixed" === u.current ? s("hidden") : e < .99 && "hidden" === u.current && s(r.get() >= .99 ? "fixed" : "entry")
                        }), [o, r]), (0, l.useEffect)(() => n.on("change", e => {
                            c.current = e
                        }), [n]), {
                            parallaxY: (0, i.G)(r, [0, 1], ["50vh", "0vh"]),
                            isFixed: "fixed" === a,
                            isVisible: "hidden" !== a
                        }
                    }(ex, eb, eA, eP, eH), {
                        slotCars: eO,
                        activeSlot: eV,
                        incomingSlot: eW,
                        incomingRevealed: eG,
                        handleTabChange: eQ,
                        onSlotFirstFrame: eq,
                        mobileTabSwitchRef: eY,
                        tabSwitchRef: eU
                    } = function(e) {
                        var t, n, r, i;
                        let {
                            selectedCarIndex: o,
                            setSelectedCarIndex: a,
                            tabSources: s,
                            isDesktopRef: u,
                            setIsInView: c,
                            scrubProgress: d,
                            containerRef: f,
                            slotHandlesRef: h,
                            lenis: p,
                            getScrollytellingState: m,
                            scrollToWaypoint: v
                        } = e, [g, x] = (0, l.useState)(() => ({
                            slotCars: [o, null],
                            activeSlot: 0,
                            incoming: null
                        })), b = (0, l.useRef)(g), y = (0, l.useRef)(0), C = (0, l.useRef)(null), w = (0, l.useRef)(!1), k = (0, l.useRef)(!1), S = (0, l.useCallback)(e => {
                            let t = e(b.current);
                            b.current = t, x(t)
                        }, []), E = (0, l.useCallback)(() => {
                            let e = C.current;
                            e && (e.safetyTimer && clearTimeout(e.safetyTimer), e.fadeTimer && clearTimeout(e.fadeTimer), e.safetyTimer = null, e.fadeTimer = null)
                        }, []);
                        (0, l.useEffect)(() => E, [E]);
                        let R = (0, l.useCallback)(() => {
                                let e = b.current,
                                    t = C.current;
                                return t ? e.slotCars[t.slot] : e.slotCars[e.activeSlot]
                            }, []),
                            j = (0, l.useCallback)(function(e) {
                                let t = !(arguments.length > 1) || void 0 === arguments[1] || arguments[1],
                                    n = C.current;
                                if (!n || n.generation !== e || "fading" !== n.phase) return;
                                E(), C.current = null;
                                let {
                                    slot: r
                                } = n;
                                if (S(e => ({ ...e,
                                        activeSlot: r,
                                        incoming: null
                                    })), w.current = !1, null == p || p.start(), t) {
                                    var l;
                                    F(null == (l = h.current) ? void 0 : l[r], d.get())
                                }
                            }, [E, S, p, d, h]),
                            T = (0, l.useCallback)(e => {
                                var t;
                                let n = C.current;
                                n && n.generation === e && "waiting" === n.phase && (n.safetyTimer && clearTimeout(n.safetyTimer), n.safetyTimer = null, n.phase = "fading", F(null == (t = h.current) ? void 0 : t[n.slot], d.get()), S(e => e.incoming ? { ...e,
                                    incoming: { ...e.incoming,
                                        revealed: !0
                                    }
                                } : e), n.fadeTimer = setTimeout(() => j(e), 700))
                            }, [S, j, d, h]),
                            N = (0, l.useCallback)(() => {
                                var e;
                                C.current && (E(), C.current = null, S(e => ({ ...e,
                                    incoming: null
                                })), w.current = !1, null == p || p.start(), F(null == (e = h.current) ? void 0 : e[b.current.activeSlot], d.get()))
                            }, [E, S, p, d, h]),
                            I = (0, l.useCallback)(() => {
                                let e = f.current;
                                if (!e) return;
                                let t = window.scrollY + e.getBoundingClientRect().top;
                                p ? p.scrollTo(t, {
                                    immediate: !0
                                }) : window.scrollTo({
                                    top: t,
                                    behavior: "instant"
                                }), "section" === m().scrollMode && v({
                                    sectionIndex: P,
                                    waypointIndex: 0
                                })
                            }, [f, p, m, v]),
                            M = (0, l.useCallback)((e, t) => {
                                var n, r, l, i, o, a, u;
                                if (e === R()) return;
                                let c = C.current;
                                (null == c ? void 0 : c.phase) === "fading" && j(c.generation, !1);
                                let d = b.current;
                                if (C.current && e === d.slotCars[d.activeSlot]) return void N();
                                let f = null != (u = null == (n = C.current) ? void 0 : n.slot) ? u : +(0 === d.activeSlot);
                                E();
                                let m = ++y.current;
                                C.current = {
                                    generation: m,
                                    slot: f,
                                    phase: "waiting",
                                    safetyTimer: setTimeout(() => T(m), 3e4),
                                    fadeTimer: null
                                };
                                let v = d.slotCars[f];
                                S(t => ({ ...t,
                                    slotCars: B(t.slotCars, f, e),
                                    incoming: {
                                        slot: f,
                                        revealed: !1
                                    }
                                })), null !== v && (null == s || null == (r = s[e]) ? void 0 : r.fsv) != null && (null == (l = s[e]) ? void 0 : l.fsv) === (null == (i = s[v]) ? void 0 : i.fsv) && (null == (a = h.current) || null == (o = a[f]) ? void 0 : o.isReady()) && T(m), t ? requestAnimationFrame(() => {
                                    y.current === m && (I(), null == p || p.stop())
                                }) : null == p || p.stop()
                            }, [T, N, E, S, j, R, p, I, h, s]),
                            L = (0, l.useCallback)(e => {
                                e !== R() && (k.current = !0, w.current = !u.current, u.current && c(!1), a(e), M(e, !0))
                            }, [R, u, M, c, a]),
                            A = (0, l.useCallback)(e => {
                                var t, n;
                                let r = C.current;
                                r && r.slot === e && "waiting" === r.phase && (null == (n = h.current) || null == (t = n[e]) ? void 0 : t.isReady()) && T(r.generation)
                            }, [T, h]);
                        return (0, l.useEffect)(() => {
                            var e;
                            if (o === R()) return;
                            let t = b.current,
                                n = null == (e = h.current) ? void 0 : e[t.activeSlot];
                            if (!C.current && !(null == n ? void 0 : n.isReady())) return void S(e => ({ ...e,
                                slotCars: B(e.slotCars, e.activeSlot, o)
                            }));
                            M(o, !1)
                        }, [o, S, R, M, h]), (0, l.useEffect)(() => {
                            let e, t = 0,
                                n = d.on("change", n => {
                                    t = n, void 0 === e && (e = requestAnimationFrame(() => {
                                        e = void 0;
                                        let n = b.current,
                                            r = h.current,
                                            l = C.current;
                                        l ? F(null == r ? void 0 : r[l.slot], t) : F(null == r ? void 0 : r[n.activeSlot], t)
                                    }))
                                });
                            return () => {
                                n(), void 0 !== e && cancelAnimationFrame(e)
                            }
                        }, [d, h]), {
                            slotCars: g.slotCars,
                            activeSlot: g.activeSlot,
                            incomingSlot: null != (r = null == (t = g.incoming) ? void 0 : t.slot) ? r : null,
                            incomingRevealed: null != (i = null == (n = g.incoming) ? void 0 : n.revealed) && i,
                            handleTabChange: L,
                            onSlotFirstFrame: A,
                            mobileTabSwitchRef: w,
                            tabSwitchRef: k
                        }
                    }({
                        selectedCarIndex: en,
                        setSelectedCarIndex: er,
                        tabSources: j,
                        isDesktopRef: ef,
                        setIsInView: G,
                        scrubProgress: (0, i.G)(eA, [0, .9], [0, 1]),
                        containerRef: ex,
                        slotHandlesRef: eE,
                        lenis: X,
                        getScrollytellingState: Z,
                        scrollToWaypoint: J
                    }), eX = function(e, t) {
                        let [n, r] = (0, l.useState)(!1);
                        return (0, l.useEffect)(() => {
                            if (!e) return void r(!1);
                            let n = setTimeout(() => r(!0), t);
                            return () => clearTimeout(n)
                        }, [e, t]), n
                    }(null !== eW && !eG, $.rm), eJ = (0, l.useRef)(!1), eK = (0, l.useRef)(C);
                    eK.current = C;
                    let eZ = [(0, l.useCallback)(() => {
                            if (eq(0), !eJ.current) {
                                var e;
                                eJ.current = !0, null == (e = eK.current) || e.call(eK)
                            }
                        }, [eq]), (0, l.useCallback)(() => eq(1), [eq])],
                        e$ = (0, l.useCallback)(e => {
                            var t, n;
                            let r = null == S ? void 0 : S[e],
                                l = null != (n = null == r ? void 0 : r.displayName) ? n : (null == r || null == (t = r.car) ? void 0 : t.__typename) === "Car" ? r.car.name : void 0;
                            (0, p.yn)({
                                eventAction: p.wT.carSelectorClick,
                                locale: N,
                                pageExperience: {
                                    pageCategory: I,
                                    contentTags: null != O ? O : []
                                },
                                context: {
                                    moduleName: p.B7.carsSection
                                },
                                componentClick: {
                                    clickElementType: "interaction",
                                    clickElementId: M,
                                    clickElementName: "Car tab: ".concat(null != l ? l : "")
                                }
                            }), eQ(e)
                        }, [S, N, I, M, O, eQ]);
                    (0, l.useEffect)(() => {
                        if (eU.current) {
                            eU.current = !1, eM && ei(!0);
                            return
                        }
                        eM || eY.current || G(!1)
                    }, [eM, G]);
                    let e0 = V && W,
                        e1 = (0, l.useCallback)(e => {
                            let t = ex.current;
                            if (!t) return;
                            let n = "front" === e ? D : z,
                                r = (n[1] - n[0]) * .08,
                                l = n[0] + r,
                                i = t.offsetHeight - window.innerHeight,
                                o = window.scrollY + t.getBoundingClientRect().top + l * i;
                            X ? X.scrollTo(o, {
                                duration: .8,
                                lock: !0
                            }) : window.scrollTo({
                                top: o,
                                behavior: "smooth"
                            })
                        }, [X]),
                        e2 = (0, l.useCallback)(e => {
                            eg(e), G(!0), ei(!0), e1(e)
                        }, [G, e1]),
                        e5 = (0, l.useCallback)(e => {
                            e.currentTarget.contains(e.relatedTarget) || eg(null)
                        }, []),
                        e9 = (0, l.useMemo)(() => ep && null !== eB ? "front" === eB ? es.front : es.back : [], [eB, es, ep]);
                    (0, l.useEffect)(() => {
                        eT()
                    }, [eT, e9, en]);
                    let e3 = "".concat(100 * Y.fG + 220, "vh");
                    return (0, r.jsx)(u.a, {
                        as: "section",
                        "aria-label": "Cars",
                        id: v.Z.cars,
                        ref: eb,
                        position: "relative",
                        zIndex: "20",
                        marginTop: "-50vh",
                        children: (0, r.jsx)(c.e, {
                            ref: ex,
                            position: "relative",
                            style: {
                                height: e3,
                                y: eD || ed ? 0 : e_
                            },
                            transformTemplate: eD ? () => "none" : void 0,
                            children: (0, r.jsxs)(u.a, {
                                ref: eC,
                                position: eD ? "fixed" : "sticky",
                                ...eD ? {
                                    inset: 0
                                } : {
                                    top: "0"
                                },
                                zIndex: "10",
                                height: "100svh",
                                width: "full",
                                overflow: "hidden",
                                bg: "porscheBlack",
                                transition: "opacity 0.3s ease-in-out",
                                opacity: +!!ez,
                                pointerEvents: ez ? "auto" : "none",
                                children: [j && [0, 1].map(e => {
                                    let t = eO[e],
                                        l = null !== t ? j[t] : void 0;
                                    if (!l) return null;
                                    let i = eV === e,
                                        o = eW === e,
                                        a = (i || o) && (ew || n && i || i && eJ.current);
                                    return (0, r.jsx)(u.a, {
                                        position: "absolute",
                                        inset: "0",
                                        style: {
                                            opacity: +!!(o ? eG : i),
                                            transition: o ? "opacity ".concat(700, "ms ").concat((0, R.lF)(R.MY)) : "none",
                                            zIndex: +!!o
                                        },
                                        children: (0, r.jsx)(x.b, {
                                            ref: eI[e],
                                            sources: l,
                                            load: a ? "auto" : "none",
                                            loadMode: "full",
                                            onFirstFrame: eZ[e]
                                        })
                                    }, e)
                                }), (0, r.jsx)(o.N, {
                                    children: eX && (0, r.jsx)(c.e, {
                                        position: "absolute",
                                        inset: "0",
                                        zIndex: 2,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        pointerEvents: "none",
                                        role: "status",
                                        "aria-label": "Loading car",
                                        initial: {
                                            opacity: 0
                                        },
                                        animate: {
                                            opacity: 1,
                                            transition: {
                                                duration: $.dO / 1e3,
                                                ease: R.xQ
                                            }
                                        },
                                        exit: {
                                            opacity: 0,
                                            transition: {
                                                duration: $.VF / 1e3,
                                                ease: R.xQ
                                            }
                                        },
                                        children: (0, r.jsx)(ee.f, {
                                            size: $.dT,
                                            speed: $.H9,
                                            static: ed
                                        })
                                    }, "car-switch-loader")
                                }), (0, r.jsx)(K, {
                                    shouldAnimate: e0,
                                    isVisible: ez,
                                    hotspotsVisible: ep,
                                    effectiveHotspotSet: eB,
                                    selectedCarIndex: en,
                                    prefersReducedMotion: ed,
                                    hotspotMetrics: eN,
                                    activeCarHotspots: es,
                                    onSentinelFocus: e2,
                                    onOverlayBlur: e5
                                }), (0, r.jsxs)(d.s, {
                                    ref: ey,
                                    position: "absolute",
                                    inset: "0",
                                    direction: "column",
                                    gap: 4,
                                    pt: {
                                        base: 5,
                                        l: 0
                                    },
                                    pb: {
                                        base: "calc(".concat(g.v, " + 16px)"),
                                        l: 0
                                    },
                                    sx: { ...g.l,
                                        [f.JM.l]: {
                                            paddingInlineStart: 0,
                                            paddingInlineEnd: 0
                                        }
                                    },
                                    children: [(0, r.jsx)(c.e, {
                                        position: "absolute",
                                        bottom: {
                                            base: "auto",
                                            l: 12
                                        },
                                        top: {
                                            base: "76px",
                                            l: "auto"
                                        },
                                        left: 0,
                                        right: 0,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        zIndex: "10",
                                        ...(0, Y.po)(el, ed),
                                        children: (0, r.jsxs)(d.s, {
                                            alignItems: "center",
                                            gap: "2",
                                            width: {
                                                base: "full",
                                                l: "auto"
                                            },
                                            children: [eu && (0, r.jsx)(q, {
                                                hotspotsVisible: ep,
                                                visible: null !== eB,
                                                onToggle: () => em(e => !e)
                                            }), !ec && (0, r.jsx)(L, {
                                                cars: S,
                                                activeCarIndex: en,
                                                onCarChange: e$,
                                                onPrefetchCar: ej,
                                                highlightColor: ea.highlightColor,
                                                highlightTextColor: ea.highlightTextColor
                                            }), eu && (0, r.jsx)(T, {
                                                car3d: eo,
                                                selfAnimated: !1
                                            })]
                                        })
                                    }), (0, r.jsx)(u.a, {
                                        flex: "1"
                                    }), !eu && !ec && (0, r.jsxs)(d.s, {
                                        direction: "column",
                                        gap: 4,
                                        children: [(0, r.jsx)(c.e, { ...(0, Y.po)(e0, ed, !0),
                                            children: (0, r.jsx)(Q, {
                                                hotspots: eh
                                            }, en)
                                        }), (0, r.jsx)(T, {
                                            car3d: eo
                                        })]
                                    }), (0, r.jsx)(et, {
                                        car3d: eo,
                                        seriesTitle: w.carsSectionSeriesTitle,
                                        titleNextEvent: w.carsSectionNextEventTitle,
                                        titleLatestNews: w.carsSectionLatestNewsTitle,
                                        labelNoSeries: w.carsSectionLabelNoSeries,
                                        labelNoNewsEvents: w.carsSectionLabelNoNewsEvents
                                    })]
                                })]
                            })
                        })
                    })
                });
            en.displayName = "CarsSectionContent";
            let er = e => (0, r.jsx)(y.sh, {
                children: (0, r.jsx)(en, { ...e
                })
            });
            er.displayName = "CarsSection"
        }
    }
]);
//# sourceMappingURL=9929.1fb53cc182c66891.js.map