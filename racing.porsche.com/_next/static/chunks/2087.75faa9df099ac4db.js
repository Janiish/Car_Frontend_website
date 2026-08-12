"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [2087], {
        51074: (e, l, t) => {
            t.d(l, {
                R: () => C
            });
            var n = t(6029),
                i = t(77367),
                a = t(35882),
                r = t(21938),
                o = t(55729),
                s = t(31219),
                d = t(41684),
                c = t(70659),
                u = t(72744),
                h = t(95415),
                m = t(28526),
                p = t(84721);
            let x = (0, o.createContext)(null);

            function g() {
                let e = (0, o.useContext)(x);
                if (!e) throw Error("NdlLink compound components must be rendered inside <NdlLink.Root>.");
                return e
            }
            let v = (0, i.R)((e, l) => {
                let t = (0, o.useId)(),
                    {
                        href: i,
                        children: a,
                        className: d,
                        ...u
                    } = e;
                return (0, n.jsx)(x.Provider, {
                    value: {
                        href: i,
                        ariaId: t
                    },
                    children: (0, n.jsx)(c.U, {
                        ref: l,
                        size: "medium",
                        colorScheme: "black",
                        p: 4,
                        backdropFilter: "auto",
                        backdropBlur: "ndlFrostedGlassHigh",
                        overflow: "hidden",
                        className: (0, r.cx)("ndl-link", d),
                        ...u,
                        children: (0, n.jsx)(s.Q, {
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
            v.displayName = "NdlLink.Root";
            let f = (0, i.R)((e, l) => {
                let {
                    children: t,
                    className: i,
                    ...o
                } = e;
                return (0, n.jsx)(a.B.div, {
                    ref: l,
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    minWidth: 0,
                    gap: 1,
                    className: (0, r.cx)("ndl-link__content", i),
                    ...o,
                    children: t
                })
            });
            f.displayName = "NdlLink.Content";
            let b = (0, i.R)((e, l) => {
                let {
                    children: t,
                    className: i,
                    ...a
                } = e, {
                    href: o,
                    ariaId: c
                } = g();
                return (0, n.jsx)(s.r, {
                    as: d.S,
                    href: o,
                    id: c,
                    ref: l,
                    className: (0, r.cx)("ndl-link__title", i),
                    _hover: {
                        textDecoration: "none"
                    },
                    ...a,
                    children: (0, n.jsx)(u.X, {
                        as: "span",
                        size: "headerS",
                        color: "allWhite",
                        sx: {
                            textWrap: "balance"
                        },
                        children: t
                    })
                })
            });
            b.displayName = "NdlLink.Title";
            let y = (0, i.R)((e, l) => {
                let {
                    children: t,
                    ...i
                } = e;
                return (0, n.jsx)(h.o, {
                    ref: l,
                    size: "regular",
                    color: "grey200",
                    sx: {
                        textWrap: "balance"
                    },
                    ...i,
                    children: t
                })
            });
            y.displayName = "NdlLink.Description";
            let j = (0, i.R)((e, l) => {
                let {
                    iconName: t = "arrow-right-up",
                    ...i
                } = e, {
                    ariaId: a
                } = g();
                return (0, n.jsx)(m.v, {
                    ref: l,
                    "aria-labelledby": a,
                    onClick: () => {},
                    variant: "icon",
                    size: "large",
                    colorScheme: "solidGrey",
                    tabIndex: -1,
                    flexShrink: 0,
                    pointerEvents: "none",
                    ...i,
                    children: (0, n.jsx)(p.E, {
                        name: t
                    })
                })
            });
            j.displayName = "NdlLink.Icon";
            let C = {
                Root: v,
                Content: f,
                Title: b,
                Description: y,
                Icon: j
            }
        },
        62087: (e, l, t) => {
            t.r(l), t.d(l, {
                CarDashboardGrid: () => et
            });
            var n = t(6029),
                i = t(55729),
                a = t(56760),
                r = t(19315),
                o = t(81278),
                s = t(72813),
                d = t(91753),
                c = t(91514),
                u = t(12316),
                h = t(93066),
                m = t(80321),
                p = t(62518),
                x = t(50687),
                g = t(96692),
                v = t(65322);
            let f = "m-left-card",
                b = "m-right-top-card",
                y = "m-right-bottom-left-card",
                j = "m-right-bottom-right-card",
                C = {
                    [f]: 0,
                    [b]: .05,
                    [y]: .1,
                    [j]: .15
                },
                k = {
                    [f]: 1.33,
                    [b]: 1.28,
                    [y]: 1.23,
                    [j]: 1.18
                },
                w = {
                    [f]: 0,
                    [b]: 0,
                    [y]: 0,
                    [j]: 0
                },
                T = {
                    [f]: 1.33,
                    [b]: 1.33,
                    [y]: 1.33,
                    [j]: 1.33
                };
            C[y], k[j];
            let N = v.m1,
                R = (e, l, t, n, i) => {
                    if (i) return "inset(0px 0px 0px 0px round var(--radii-ndlRadiusCard))";
                    let a = Math.max(0, e - t),
                        r = Math.max(0, l - n);
                    return "inset(0px ".concat(a, "px ").concat(r, "px 0px round var(--radii-ndlRadiusCard))")
                },
                E = {
                    duration: 0,
                    delay: 0
                },
                S = (0, i.memo)(function(e) {
                    var l, t;
                    let {
                        children: a,
                        targetContainerId: r,
                        contentSizedOnMobile: o = !1,
                        opacityAnimation: s,
                        style: c,
                        ...h
                    } = e, {
                        layout: m,
                        layoutReady: p
                    } = (0, u.A)(), {
                        canAnimate: x
                    } = (0, u.e8)(), v = (0, u.GC)(), {
                        prefersReducedMotion: f
                    } = (0, g.P2)(), [b, y] = (0, i.useState)("block"), [j, S] = (0, i.useState)(!1), I = (0, i.useRef)(!1), z = !!(v && x && !I.current);
                    (0, i.useEffect)(() => {
                        I.current = !!v
                    }, [v]), (0, i.useEffect)(() => {
                        S(!!v)
                    }, [v]);
                    let {
                        gridWidth: A,
                        gridHeight: D,
                        widgetLauncherWidth: W,
                        widgetLauncherHeight: L,
                        transform: B,
                        launcherOffset: H,
                        clipPath: F,
                        shouldAnimate: G,
                        transition: _
                    } = (0, i.useMemo)(() => ((e, l, t, n, i) => {
                        var a, r, o, s, d, c, u, h;
                        let m, p, x, g, v = e[l],
                            f = e["widget-launcher"],
                            b = null != (a = v.width) ? a : 0,
                            y = null != (r = v.height) ? r : 0,
                            j = null != (o = v.x) ? o : 0,
                            N = null != (s = v.y) ? s : 0,
                            E = null != (d = f.x) ? d : 0,
                            S = null != (c = f.y) ? c : 0,
                            I = null != (u = f.width) ? u : 0,
                            z = null != (h = f.height) ? h : 0,
                            A = !n || t ? {
                                x: 0,
                                y: 0
                            } : {
                                x: E - j,
                                y: S - N
                            },
                            D = R(b, y, I, z, t),
                            W = !!(t || i),
                            L = W ? (m = i, p = n, x = t, g = l, m && p ? {
                                duration: x ? k[g] : T[g],
                                delay: x ? C[g] : w[g]
                            } : {
                                duration: 0,
                                delay: 0
                            }) : {
                                duration: 0,
                                delay: 0
                            };
                        return {
                            gridWidth: b,
                            gridHeight: y,
                            widgetLauncherWidth: I,
                            widgetLauncherHeight: z,
                            transform: A,
                            launcherOffset: n ? {
                                x: E - j,
                                y: S - N
                            } : {
                                x: 0,
                                y: 0
                            },
                            clipPath: D,
                            shouldAnimate: W,
                            transition: L
                        }
                    })(m, r, !!v, !!p, !!x), [m, r, v, p, x]), U = !v && x, M = o && (v || x) ? {
                        position: {
                            base: "relative",
                            l: "absolute"
                        },
                        top: {
                            base: "auto",
                            l: 0
                        },
                        left: {
                            base: "auto",
                            l: 0
                        },
                        width: {
                            base: "100%",
                            l: A || void 0
                        },
                        height: {
                            base: "auto",
                            l: D || "100%"
                        }
                    } : {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: A || void 0,
                        height: D || "100%"
                    }, O = z && !f ? {
                        x: [H.x, 0],
                        y: [H.y, 0]
                    } : {
                        x: B.x,
                        y: B.y
                    }, P = (e => {
                        var l, t, n;
                        let {
                            isDashboardOpen: i,
                            isClosingDashboard: a,
                            layoutReady: r,
                            opacityAnimation: o
                        } = e;
                        return i ? null != (t = null == o || null == (l = o.open) ? void 0 : l.targetOpacity) ? t : 1 : a && r ? (null == o ? void 0 : o.close) ? null != (n = o.close.targetOpacity) ? n : 0 : 1 : 0
                    })({
                        isDashboardOpen: !!v,
                        isClosingDashboard: U,
                        layoutReady: !!p,
                        opacityAnimation: s
                    }), J = (e => {
                        var l, t, n, i, a, r;
                        let {
                            shouldAnimate: o,
                            isDashboardOpen: s,
                            isClosingDashboard: d,
                            opacityAnimation: c
                        } = e;
                        return o ? s ? {
                            duration: null != (n = null == c || null == (l = c.open) ? void 0 : l.duration) ? n : .3,
                            delay: null != (i = null == c || null == (t = c.open) ? void 0 : t.delay) ? i : .1
                        } : d && (null == c ? void 0 : c.close) ? {
                            duration: null != (a = c.close.duration) ? a : .2,
                            delay: null != (r = c.close.delay) ? r : 0
                        } : {
                            duration: 0,
                            delay: 0
                        } : {
                            duration: 0,
                            delay: 0
                        }
                    })({
                        shouldAnimate: G,
                        isDashboardOpen: !!v,
                        isClosingDashboard: U,
                        opacityAnimation: s
                    }), X = !v && !x;
                    return (0, n.jsx)(d.e, {
                        "data-would-be-height": D,
                        ...M,
                        pointerEvents: j ? "auto" : "none",
                        sx: {
                            backfaceVisibility: "hidden",
                            isolation: "isolate"
                        },
                        style: {
                            willChange: x ? "transform" : "auto",
                            ...c
                        },
                        initial: {
                            x: 0,
                            y: 0,
                            z: 0,
                            clipPath: R(A, D, W, L, !0),
                            opacity: 0
                        },
                        animate: { ...O,
                            z: 0,
                            clipPath: F,
                            opacity: P,
                            display: X ? "none" : b
                        },
                        transition: (e => {
                            let {
                                prefersReducedMotion: l,
                                shouldAnimate: t,
                                transition: n,
                                opacityTransition: i
                            } = e;
                            return l ? { ...E,
                                opacity: E
                            } : { ...n,
                                ease: t ? N : "linear",
                                opacity: i
                            }
                        })({
                            prefersReducedMotion: f,
                            shouldAnimate: G,
                            transition: _,
                            opacityTransition: J
                        }),
                        borderRadius: "ndlRadiusCard",
                        backgroundColor: "ndlTransparencyBlack",
                        transformOrigin: "1px 1px",
                        zIndex: (l = !!v, t = !!x, l ? 1 : t ? 0 : -1),
                        ...h,
                        onAnimationStart: () => {
                            y("block")
                        },
                        onAnimationComplete: () => {
                            X && y("none")
                        },
                        children: a
                    })
                });
            S.displayName = "CarDashboardAnimatedContainer";
            var I = t(68865),
                z = t(35882),
                A = t(73186),
                D = t(95415),
                W = t(70659),
                L = t(28526),
                B = t(41684),
                H = t(84721),
                F = t(72744),
                G = t(36760),
                _ = t(22139),
                U = t(76968);

            function M(e) {
                let {
                    label: l,
                    value: t,
                    isFirst: i
                } = e;
                return (0, n.jsxs)(n.Fragment, {
                    children: [(0, n.jsxs)(A.z, {
                        alignItems: "start",
                        width: "full",
                        my: i ? void 0 : 6,
                        mb: i ? 6 : void 0,
                        gap: 6,
                        children: [(0, n.jsx)(D.o, {
                            flex: 1,
                            minW: 0,
                            children: l
                        }), (0, n.jsx)(D.o, {
                            flex: 2,
                            minW: 0,
                            textAlign: "end",
                            children: t
                        })]
                    }), (0, n.jsx)(s.a, {
                        height: "px",
                        backgroundColor: "grey200"
                    })]
                })
            }
            let O = (0, i.memo)(function(e) {
                var l, t, i, a, r, d;
                let {
                    car3d: c
                } = e, p = (null == c || null == (l = c.car) ? void 0 : l.__typename) === "Car" ? c.car : void 0, x = null != (d = null == c ? void 0 : c.displayName) ? d : null == p ? void 0 : p.name, g = null == p || null == (r = p.linkedFrom) || null == (a = r.pageCarCollection) || null == (i = a.items) || null == (t = i[0]) ? void 0 : t.slug, {
                    get: v
                } = (0, U.hu)(), f = (0, u.GC)(), {
                    locale: b
                } = (0, o.useRouter)(), {
                    state: {
                        pageType: y,
                        pageId: j,
                        pageContentTags: C
                    }
                } = (0, h.CU)();
                return (0, n.jsx)(W.U, {
                    size: "card",
                    colorScheme: "transparent",
                    width: "full",
                    height: {
                        base: "auto",
                        l: "full"
                    },
                    color: "allWhite",
                    p: 0,
                    position: "relative",
                    overflow: {
                        base: "visible",
                        l: "hidden"
                    },
                    children: (0, n.jsxs)(_.d, {
                        width: "full",
                        height: {
                            base: "auto",
                            l: "full"
                        },
                        alignItems: "stretch",
                        spacing: 0,
                        minHeight: {
                            base: "unset",
                            l: 0
                        },
                        initial: {
                            opacity: +!!f
                        },
                        animate: {
                            opacity: +!!f
                        },
                        transition: {
                            duration: .665,
                            delay: .665 * !!f
                        },
                        children: [(0, n.jsxs)(s.a, {
                            flexShrink: 0,
                            width: "full",
                            px: 4,
                            pt: 4,
                            children: [g ? (0, n.jsx)(A.z, {
                                justifyContent: "end",
                                marginBottom: 6,
                                children: (0, n.jsx)(L.v, {
                                    as: B.S,
                                    href: "/cars/".concat(g),
                                    onClick: () => {
                                        (0, m.yn)({
                                            eventAction: m.wT.linkClick,
                                            locale: b,
                                            pageExperience: {
                                                pageCategory: y,
                                                contentTags: null != C ? C : []
                                            },
                                            context: {
                                                moduleName: m.B7.carDashboard
                                            },
                                            componentClick: {
                                                clickElementType: "navigation",
                                                clickElementId: j,
                                                clickElementName: "Technical overview: ".concat(null != x ? x : ""),
                                                targetUrl: "/cars/".concat(g),
                                                targetType: "internal"
                                            }
                                        })
                                    },
                                    variant: "icon",
                                    size: "large",
                                    colorScheme: "grey",
                                    marginLeft: "auto",
                                    "aria-label": null != x ? x : "Car details",
                                    children: (0, n.jsx)(H.E, {
                                        name: "arrow-right-up"
                                    })
                                })
                            }) : (0, n.jsx)(s.a, {
                                marginBottom: 6,
                                height: "48px"
                            }), (0, n.jsx)(F.X, {
                                size: "headerL",
                                marginBottom: 6,
                                color: "allWhite",
                                children: x
                            })]
                        }), (0, n.jsx)(s.a, {
                            flex: {
                                base: "none",
                                l: 1
                            },
                            minHeight: {
                                base: "unset",
                                l: 0
                            },
                            width: "full",
                            px: 4,
                            pb: 8,
                            overflowY: {
                                base: "visible",
                                l: "auto"
                            },
                            "data-lenis-prevent": !0,
                            className: "scroll-fade-y",
                            sx: {
                                "--scroll-fade-size": "96px"
                            },
                            children: (0, n.jsxs)(G.T, {
                                alignItems: "stretch",
                                spacing: 0,
                                minHeight: {
                                    base: "unset",
                                    l: "100%"
                                },
                                children: [(0, n.jsx)(D.o, {
                                    sx: {
                                        textWrap: "pretty"
                                    },
                                    children: null == p ? void 0 : p.description
                                }), (0, n.jsx)(s.a, {
                                    flex: {
                                        base: "none",
                                        l: 1
                                    },
                                    minHeight: {
                                        base: 6,
                                        l: 12
                                    }
                                }), (0, n.jsxs)(G.T, {
                                    alignItems: "stretch",
                                    gap: 0,
                                    children: [(null == p ? void 0 : p.engine) && (0, n.jsx)(M, {
                                        isFirst: !0,
                                        label: v("moduleCarTechSpecs", "engine"),
                                        value: p.engine
                                    }), (null == p ? void 0 : p.displacement) && (0, n.jsx)(M, {
                                        label: v("moduleCarTechSpecs", "displacement"),
                                        value: p.displacement
                                    }), (null == p ? void 0 : p.power) && (0, n.jsx)(M, {
                                        label: v("moduleCarTechSpecs", "performance"),
                                        value: p.power
                                    }), (null == p ? void 0 : p.transmission) && (0, n.jsx)(M, {
                                        label: v("moduleCarTechSpecs", "gears"),
                                        value: p.transmission
                                    }), (null == p ? void 0 : p.weight) && (0, n.jsx)(M, {
                                        label: v("moduleCarTechSpecs", "weight"),
                                        value: p.weight
                                    }), (null == p ? void 0 : p.driveline) && (0, n.jsx)(M, {
                                        label: v("moduleCarTechSpecs", "driveLine"),
                                        value: p.driveline
                                    }), (null == p ? void 0 : p.topSpeed) && (0, n.jsx)(M, {
                                        label: v("moduleCarTechSpecs", "topSpeed"),
                                        value: p.topSpeed
                                    })]
                                })]
                            })
                        })]
                    })
                })
            });
            var P = t(81085),
                J = t(98964),
                X = t(15617);
            let Q = (0, i.memo)(function(e) {
                let {
                    car3d: l
                } = e, t = (0, u.GC)();
                return (0, n.jsxs)(W.U, {
                    size: "card",
                    colorScheme: "black",
                    width: "full",
                    height: "full",
                    p: 0,
                    children: [(0, P.jT)(null == l ? void 0 : l.dashboardAsset) && ((0, P.QR)(null == l ? void 0 : l.dashboardAsset) ? (0, n.jsx)(J.P, {
                        cloudinaryAsset: null == l ? void 0 : l.dashboardAsset,
                        wrapperProps: {
                            position: "absolute"
                        },
                        loop: !0,
                        autoPlay: t
                    }) : (0, n.jsx)(X.d, {
                        fill: !0,
                        cloudinaryAsset: null == l ? void 0 : l.dashboardAsset
                    })), (0, n.jsx)(d.e, {
                        position: "absolute",
                        inset: 0,
                        zIndex: 1,
                        pointerEvents: "none",
                        sx: {
                            backdropFilter: "blur(var(--blur-ndlFrostedGlassLow))"
                        },
                        initial: {
                            opacity: +!t
                        },
                        animate: {
                            opacity: +!t
                        },
                        transition: {
                            duration: .665,
                            delay: .665 * !!t
                        }
                    })]
                })
            });
            Q.displayName = "CarDashboardMediaCard";
            var Y = t(51074);
            let K = (0, i.memo)(function(e) {
                var l, t;
                let {
                    car3d: a,
                    title: r,
                    labelNoSeries: d
                } = e, c = (null == a || null == (l = a.car) ? void 0 : l.__typename) === "Car" ? a.car : void 0, p = (0, u.GC)(), {
                    locale: x
                } = (0, o.useRouter)(), {
                    state: {
                        pageType: g,
                        pageId: v,
                        pageContentTags: f
                    }
                } = (0, h.CU)(), b = null == a || null == (t = a.sys) ? void 0 : t.id, y = (0, i.useMemo)(() => {
                    var e, l, t;
                    return null != (t = null == c || null == (l = c.seriesCollection) || null == (e = l.items) ? void 0 : e.filter(e => {
                        var l, t, n, i;
                        return (null == e ? void 0 : e.name) && (null == (i = e.linkedFrom) || null == (n = i.pageRaceSeriesCollection) || null == (t = n.items) || null == (l = t[0]) ? void 0 : l.slug)
                    })) ? t : []
                }, [b]);
                return (0, n.jsx)(W.U, {
                    size: "card",
                    colorScheme: "transparent",
                    width: "full",
                    height: "full",
                    color: "allWhite",
                    p: 0,
                    position: "relative",
                    overflow: "hidden",
                    children: (0, n.jsxs)(_.d, {
                        justifyContent: "space-between",
                        alignItems: "stretch",
                        height: "full",
                        py: 4,
                        initial: {
                            opacity: +!!p
                        },
                        animate: {
                            opacity: +!!p
                        },
                        transition: {
                            duration: .665,
                            delay: .665 * !!p
                        },
                        children: [(0, n.jsx)(F.X, {
                            size: "headerM",
                            py: 3,
                            px: 6,
                            children: r
                        }), y.length > 0 ? (0, n.jsx)(s.a, {
                            maxHeight: "256px",
                            overflowY: "auto",
                            "data-lenis-prevent": !0,
                            className: "scroll-fade-y",
                            sx: {
                                "--scroll-fade-size": "96px"
                            },
                            children: (0, n.jsx)(G.T, {
                                alignItems: "stretch",
                                gap: 2,
                                px: 4,
                                children: y.map(e => {
                                    var l, t, i, a, r;
                                    let o = "/series/".concat(null == e || null == (a = e.linkedFrom) || null == (i = a.pageRaceSeriesCollection) || null == (t = i.items) || null == (l = t[0]) ? void 0 : l.slug);
                                    return (0, n.jsxs)(Y.R.Root, {
                                        href: o,
                                        children: [(0, n.jsx)(Y.R.Content, {
                                            children: (0, n.jsx)(Y.R.Title, {
                                                onClick: () => {
                                                    var l;
                                                    return l = null == e ? void 0 : e.name, void(0, m.yn)({
                                                        eventAction: m.wT.linkClick,
                                                        locale: x,
                                                        pageExperience: {
                                                            pageCategory: g,
                                                            contentTags: null != f ? f : []
                                                        },
                                                        context: {
                                                            moduleName: m.B7.carDashboard
                                                        },
                                                        componentClick: {
                                                            clickElementType: "navigation",
                                                            clickElementId: v,
                                                            clickElementName: "Series: ".concat(null != l ? l : ""),
                                                            targetUrl: o,
                                                            targetType: "internal"
                                                        }
                                                    })
                                                },
                                                children: null == e ? void 0 : e.name
                                            })
                                        }), (0, n.jsx)(Y.R.Icon, {})]
                                    }, null == e || null == (r = e.sys) ? void 0 : r.id)
                                })
                            })
                        }) : (0, n.jsx)(G.T, {
                            alignItems: "start",
                            justifyContent: "flex-end",
                            flex: 1,
                            px: 6,
                            pb: 4,
                            children: (0, n.jsx)(D.o, {
                                color: "grey200",
                                children: d
                            })
                        })]
                    })
                })
            });
            K.displayName = "CarDashboardSeriesCard";
            var V = t(31219),
                q = t(83169),
                Z = t(59467);
            let $ = (0, i.memo)(function(e) {
                var l, t, a, r, s, d, c, p, x, g, v, f;
                let {
                    car3d: b,
                    titleNextEvent: y,
                    titleLatestNews: j,
                    labelNoNewsEvents: C
                } = e, {
                    locale: k,
                    isPreview: w
                } = (0, o.useRouter)(), T = (0, u.GC)(), {
                    state: {
                        pageType: N,
                        pageId: R,
                        pageContentTags: E
                    }
                } = (0, h.CU)(), S = (null == b || null == (l = b.car) ? void 0 : l.__typename) === "Car" ? b.car : void 0, I = (0, i.useMemo)(() => {
                    let e = new Date;
                    return e.setUTCHours(0, 0, 0, 0), e.toISOString()
                }, []), z = null == S || null == (a = S.seriesCollection) || null == (t = a.items) ? void 0 : t.map(e => {
                    var l;
                    return null == e || null == (l = e.sys) ? void 0 : l.id
                }).filter(e => "string" == typeof e), U = null == S || null == (s = S.tagsCollection) || null == (r = s.items) ? void 0 : r.map(e => null == e ? void 0 : e.tagKey).filter(e => "string" == typeof e), {
                    data: M
                } = (0, q.vX)({
                    seriesIds: null != z ? z : [],
                    date: I,
                    locale: k,
                    preview: !!w
                }, {
                    enabled: T && !!(null == z ? void 0 : z.length),
                    ...!w && {
                        staleTime: 1 / 0
                    },
                    refetchOnWindowFocus: !1
                }), O = (0, i.useMemo)(() => {
                    var e, l;
                    return null == M || null == (l = M.eventCollection) || null == (e = l.items) ? void 0 : e.find(e => {
                        var l, t, n, i;
                        return null == e || null == (i = e.linkedFrom) || null == (n = i.pageRaceEventCollection) || null == (t = n.items) || null == (l = t[0]) ? void 0 : l.slug
                    })
                }, [M]), {
                    data: P
                } = (0, Z.f8)({
                    tags: null != U ? U : [],
                    locale: k,
                    preview: !!w
                }, {
                    enabled: T && !!(null == U ? void 0 : U.length),
                    ...!w && {
                        staleTime: 1 / 0
                    },
                    refetchOnWindowFocus: !1
                }), J = null == O || null == (x = O.linkedFrom) || null == (p = x.pageRaceEventCollection) || null == (c = p.items) || null == (d = c[0]) ? void 0 : d.slug, X = !!(O && J), Q = null == P || null == (f = P.pageArticleCollection) || null == (v = f.items) || null == (g = v[0]) ? void 0 : g.slug, Y = !!Q, K = X || Y, {
                    href: $,
                    linkTitle: ee,
                    linkDescription: el
                } = (0, i.useMemo)(() => {
                    if (X) return {
                        href: "/events/".concat(J),
                        linkTitle: null == O ? void 0 : O.name,
                        linkDescription: null == O ? void 0 : O.description
                    };
                    if (Y) {
                        var e, l, t, n, i, a;
                        return {
                            href: "/articles/".concat(Q),
                            linkTitle: null == P || null == (t = P.pageArticleCollection) || null == (l = t.items) || null == (e = l[0]) ? void 0 : e.title,
                            linkDescription: null == P || null == (a = P.pageArticleCollection) || null == (i = a.items) || null == (n = i[0]) ? void 0 : n.introduction
                        }
                    }
                    return {
                        href: void 0,
                        linkTitle: void 0,
                        linkDescription: void 0
                    }
                }, [X, Y, J, Q, P, O]), et = X ? y : j, en = +!!T, ei = .665 * !!T;
                return (0, n.jsx)(W.U, {
                    size: "card",
                    colorScheme: "transparent",
                    width: "full",
                    height: "full",
                    color: "allWhite",
                    position: "relative",
                    overflow: "hidden",
                    p: 0,
                    children: (0, n.jsx)(_.d, {
                        justifyContent: "space-between",
                        alignItems: "stretch",
                        height: "full",
                        minH: 0,
                        p: 4,
                        initial: {
                            opacity: en
                        },
                        animate: {
                            opacity: en
                        },
                        transition: {
                            duration: .665,
                            delay: ei
                        },
                        children: K ? (0, n.jsxs)(V.Q, {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            flex: 1,
                            minH: 0,
                            overflow: "hidden",
                            "data-group": !0,
                            children: [(0, n.jsxs)(A.z, {
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexShrink: 0,
                                children: [(0, n.jsx)(F.X, {
                                    size: "headerM",
                                    py: 3,
                                    px: 2,
                                    children: et
                                }), (0, n.jsx)(L.v, {
                                    variant: "icon",
                                    size: "large",
                                    colorScheme: "grey",
                                    tabIndex: -1,
                                    marginLeft: "auto",
                                    _hover: {
                                        cursor: "pointer",
                                        backgroundColor: "ndlTransparencyBlack"
                                    },
                                    children: (0, n.jsx)(H.E, {
                                        name: "arrow-right-up"
                                    })
                                })]
                            }), (0, n.jsxs)(G.T, {
                                alignItems: "start",
                                pb: 2,
                                px: 2,
                                minW: 0,
                                minH: 0,
                                overflow: "hidden",
                                children: [(0, n.jsx)(V.r, {
                                    as: B.S,
                                    href: null != $ ? $ : "",
                                    onClick: () => {
                                        (0, m.yn)({
                                            eventAction: m.wT.linkClick,
                                            locale: k,
                                            pageExperience: {
                                                pageCategory: N,
                                                contentTags: null != E ? E : []
                                            },
                                            context: {
                                                moduleName: m.B7.carDashboard
                                            },
                                            componentClick: {
                                                clickElementType: "navigation",
                                                clickElementId: R,
                                                clickElementName: "".concat(X ? "Next event" : "Latest news", ": ").concat(null != ee ? ee : ""),
                                                targetUrl: $,
                                                targetType: "internal"
                                            }
                                        })
                                    },
                                    children: (0, n.jsx)(F.X, {
                                        size: "headerS",
                                        color: "allWhite",
                                        mb: 2,
                                        noOfLines: 2,
                                        children: ee
                                    })
                                }), (0, n.jsx)(D.o, {
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    minW: 0,
                                    sx: {
                                        textWrap: "pretty",
                                        display: "-webkit-box",
                                        WebkitLineClamp: "2",
                                        WebkitBoxOrient: "vertical"
                                    },
                                    children: el
                                })]
                            })]
                        }) : (0, n.jsxs)(n.Fragment, {
                            children: [(0, n.jsx)(F.X, {
                                size: "headerM",
                                py: 3,
                                px: 2,
                                children: et
                            }), (0, n.jsx)(G.T, {
                                alignItems: "start",
                                justifyContent: "flex-end",
                                flex: 1,
                                pb: 2,
                                px: 2,
                                children: (0, n.jsx)(D.o, {
                                    color: "grey200",
                                    children: C
                                })
                            })]
                        })
                    })
                })
            });
            $.displayName = "CarDashboardNextEventCard";
            let ee = (0, z.B)(x.Ay),
                el = {
                    close: {
                        delay: .9,
                        duration: .43
                    }
                },
                et = (0, i.memo)(function(e) {
                    let {
                        car3d: l,
                        seriesTitle: t,
                        titleNextEvent: x,
                        titleLatestNews: g,
                        labelNoSeries: v,
                        labelNoNewsEvents: f
                    } = e, {
                        isMounted: b,
                        isDashboardOpen: y,
                        canAnimate: j,
                        lockPageScroll: C,
                        isActive: k,
                        closeCarDashboard: w
                    } = function() {
                        let {
                            canAnimate: e,
                            isDashboardOpen: l
                        } = (0, u.li)(), {
                            setCanAnimate: t,
                            setIsDashboardOpen: n
                        } = (0, u.PU)(), {
                            locale: a
                        } = (0, o.useRouter)(), {
                            state: {
                                pageType: s,
                                pageId: d,
                                pageContentTags: c
                            }
                        } = (0, h.CU)(), p = (0, r.xP)(), x = l || e, [g, v] = (0, i.useState)(!1), f = (0, i.useRef)(), b = (0, i.useRef)(l), y = l || e;
                        (0, i.useEffect)(() => {
                            v(!0)
                        }, []), (0, i.useEffect)(() => {
                            let n = b.current;
                            return b.current = l, n && !l && e && (clearTimeout(f.current), f.current = setTimeout(() => {
                                t(!1)
                            }, 1330)), l && clearTimeout(f.current), () => clearTimeout(f.current)
                        }, [l, e, t]), (0, i.useEffect)(() => {
                            if (p) {
                                if (x) return p.stop(), () => {
                                    p.start()
                                };
                                p.start()
                            }
                        }, [p, x]);
                        let j = (0, i.useCallback)(() => {
                            (0, m.yn)({
                                eventAction: m.wT.carDashboardClose,
                                locale: a,
                                pageExperience: {
                                    pageCategory: s,
                                    contentTags: null != c ? c : []
                                },
                                context: {
                                    moduleName: m.B7.carDashboard
                                },
                                componentClick: {
                                    clickElementType: "interaction",
                                    clickElementId: d,
                                    clickElementName: "Close"
                                }
                            });
                            let e = document.activeElement;
                            e instanceof HTMLElement && e.blur(), n(!1)
                        }, [n, a, s, d, c]);
                        return (0, i.useEffect)(() => {
                            if (!l) return;
                            let e = e => {
                                "Escape" === e.key && j()
                            };
                            return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e)
                        }, [l, j]), {
                            isMounted: g,
                            isDashboardOpen: l,
                            canAnimate: e,
                            lockPageScroll: x,
                            isActive: y,
                            closeCarDashboard: j
                        }
                    }(), T = (0, n.jsx)(p.A, {
                        enabled: C,
                        children: (0, n.jsxs)(s.a, {
                            "data-lenis-prevent": !0,
                            position: "fixed",
                            inset: 0,
                            zIndex: k ? "modal" : 1,
                            pointerEvents: y ? "auto" : "none",
                            width: "100vw",
                            height: "100dvh",
                            className: "dashboard-container",
                            role: y ? "dialog" : void 0,
                            "aria-modal": y ? "true" : void 0,
                            "aria-label": y ? "Car dashboard" : void 0,
                            children: [(0, n.jsx)(s.a, {
                                position: "relative",
                                width: "100vw",
                                height: "100dvh",
                                display: "flex",
                                zIndex: 1,
                                alignItems: {
                                    base: "start",
                                    l: "center"
                                },
                                justifyContent: "center",
                                px: {
                                    base: 5,
                                    ndlDashboardGrid: 10
                                },
                                pt: {
                                    base: 4,
                                    ndlDashboardGrid: 0
                                },
                                pb: {
                                    base: 10,
                                    ndlDashboardGrid: 0
                                },
                                overflow: "auto",
                                className: "dashboard-content",
                                sx: {
                                    overscrollBehavior: "contain"
                                },
                                children: (0, n.jsxs)(ee, {
                                    disabled: !y,
                                    returnFocus: !0,
                                    width: "full",
                                    height: "full",
                                    maxHeight: {
                                        l: "860px"
                                    },
                                    maxWidth: "1648px",
                                    className: "dashboard-flex-container focus-lock-container",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                    justifyContent: {
                                        base: "start",
                                        l: "center"
                                    },
                                    gap: {
                                        base: 4,
                                        l: 8
                                    },
                                    children: [(0, n.jsx)(d.e, {
                                        zIndex: 3,
                                        initial: {
                                            opacity: 0
                                        },
                                        animate: {
                                            opacity: +!!y
                                        },
                                        children: (0, n.jsx)(c.Q, {
                                            icon: "close",
                                            ariaLabel: "Close dashboard",
                                            onClick: w,
                                            size: {
                                                base: 9,
                                                l: 12
                                            },
                                            backgroundColor: "ndlTransparencyBlack",
                                            hoverBackgroundColor: "ndlTransparencyGreyHover",
                                            backdropBlur: "ndlFrostedGlassHigh",
                                            tabIndex: y ? 0 : -1,
                                            "aria-hidden": y ? void 0 : "true"
                                        })
                                    }), (0, n.jsxs)(s.a, {
                                        color: "white",
                                        width: "full",
                                        height: {
                                            base: "auto",
                                            l: "full"
                                        },
                                        display: "grid",
                                        gap: 4,
                                        gridTemplateColumns: {
                                            base: "1fr",
                                            l: "repeat(3, minmax(0, 1fr))"
                                        },
                                        gridTemplateRows: {
                                            base: "".concat(y || j ? "minmax(min-content, auto)" : "650px", " 270px 300px 210px 40px"),
                                            l: "repeat(2, minmax(0, 1fr))"
                                        },
                                        gridTemplateAreas: {
                                            base: '\n                                    "left"\n                                    "topRight"\n                                    "bottomRightLeft"\n                                    "bottomRightRight"\n                                ',
                                            l: '\n                                    "left topRight topRight"\n                                    "left bottomRightLeft bottomRightRight"\n                                '
                                        },
                                        alignItems: "stretch",
                                        justifyItems: "stretch",
                                        minWidth: 0,
                                        minHeight: 0,
                                        className: "dashboard-grid",
                                        children: [(0, n.jsx)(s.a, {
                                            id: u.nJ["m-left-card"],
                                            gridArea: "left",
                                            position: "relative",
                                            height: {
                                                base: "auto",
                                                l: "100%"
                                            },
                                            width: "100%",
                                            minWidth: 0,
                                            minHeight: {
                                                base: "min-content",
                                                l: 0
                                            },
                                            alignSelf: {
                                                base: "start",
                                                l: "stretch"
                                            },
                                            className: "dashboard-left-row",
                                            children: (0, n.jsx)(S, {
                                                targetContainerId: u.nJ["m-left-card"],
                                                opacityAnimation: el,
                                                contentSizedOnMobile: !0,
                                                children: (0, n.jsx)(O, {
                                                    car3d: l
                                                })
                                            })
                                        }), (0, n.jsx)(s.a, {
                                            id: u.nJ["m-right-top-card"],
                                            gridArea: "topRight",
                                            position: "relative",
                                            height: "100%",
                                            width: "100%",
                                            minWidth: 0,
                                            minHeight: 0,
                                            className: "dashboard-top-right-row",
                                            children: (0, n.jsx)(S, {
                                                targetContainerId: u.nJ["m-right-top-card"],
                                                opacityAnimation: el,
                                                children: (0, n.jsx)(Q, {
                                                    car3d: l
                                                })
                                            })
                                        }), (0, n.jsx)(s.a, {
                                            id: u.nJ["m-right-bottom-left-card"],
                                            gridArea: "bottomRightLeft",
                                            position: "relative",
                                            height: "100%",
                                            width: "100%",
                                            minWidth: 0,
                                            minHeight: 0,
                                            className: "dashboard-bottom-right-left-row",
                                            children: (0, n.jsx)(S, {
                                                targetContainerId: u.nJ["m-right-bottom-left-card"],
                                                opacityAnimation: el,
                                                children: (0, n.jsx)(K, {
                                                    car3d: l,
                                                    title: t,
                                                    labelNoSeries: v
                                                })
                                            })
                                        }), (0, n.jsx)(s.a, {
                                            id: u.nJ["m-right-bottom-right-card"],
                                            gridArea: "bottomRightRight",
                                            position: "relative",
                                            height: "100%",
                                            width: "100%",
                                            minWidth: 0,
                                            minHeight: 0,
                                            className: "dashboard-right-top-row",
                                            children: (0, n.jsx)(S, {
                                                targetContainerId: u.nJ["m-right-bottom-right-card"],
                                                opacityAnimation: el,
                                                children: (0, n.jsx)($, {
                                                    car3d: l,
                                                    titleNextEvent: x,
                                                    titleLatestNews: g,
                                                    labelNoNewsEvents: f
                                                })
                                            })
                                        }), (0, n.jsx)(s.a, {
                                            h: 5
                                        })]
                                    })]
                                })
                            }), (0, n.jsx)(I.z, {
                                backgroundColor: "ndlBackgroundDarkGrey",
                                backdropFilter: "blur(var(--blur-ndlDashboardBackgroundBlur))",
                                pointerEvents: "none",
                                position: "absolute",
                                inset: 0,
                                zIndex: 0,
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: +!!y
                                },
                                transition: {
                                    duration: .5,
                                    delay: .75 * !y
                                },
                                className: "dashboard-backdrop"
                            })]
                        })
                    });
                    return b ? (0, a.createPortal)(T, document.body) : null
                });
            et.displayName = "CarDashboardGrid"
        }
    }
]);
//# sourceMappingURL=2087.75faa9df099ac4db.js.map