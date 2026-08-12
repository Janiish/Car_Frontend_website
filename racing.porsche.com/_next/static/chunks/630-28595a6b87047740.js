"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [630], {
        649: (e, t, n) => {
            n.d(t, {
                Ap: () => a,
                H9: () => d,
                LR: () => i,
                Og: () => s,
                Ql: () => o,
                VF: () => p,
                dO: () => m,
                dT: () => c,
                ie: () => r,
                ks: () => l,
                rm: () => u
            });
            let r = 200,
                a = .8,
                i = 2400,
                l = 14e3,
                o = 800,
                s = 250,
                c = 120,
                d = .8,
                u = 250,
                m = 200,
                p = 300
        },
        7876: (e, t, n) => {
            n.d(t, {
                CW: () => l,
                pc: () => o,
                uG: () => c,
                uw: () => s
            });
            let r = null,
                a = new Map;

            function i() {
                return r || ((r = new Worker(n.tu(new URL(n.p + n.u(6631), n.b)), {
                    type: void 0
                })).addEventListener("message", e => {
                    var t;
                    let n = e.data;
                    null == (t = a.get(n.id)) || t(n)
                }), r.addEventListener("error", e => {
                    for (let [t, n] of a) n({
                        type: "error",
                        id: t,
                        message: e.message || "fsv worker failed"
                    })
                }), r.addEventListener("messageerror", () => {
                    for (let [e, t] of a) t({
                        type: "error",
                        id: e,
                        message: "fsv worker message deserialization failed"
                    })
                })), r
            }

            function l() {
                return "undefined" != typeof Worker && "undefined" != typeof OffscreenCanvas && "undefined" != typeof HTMLCanvasElement && "transferControlToOffscreen" in HTMLCanvasElement.prototype
            }

            function o(e, t) {
                a.set(e, t), i()
            }

            function s(e) {
                a.delete(e)
            }

            function c(e, t) {
                i().postMessage(e, null != t ? t : [])
            }
        },
        11020: (e, t, n) => {
            n.d(t, {
                L: () => ex
            });
            var r = n(6029),
                a = n(72813),
                i = n(55729),
                l = n(56760),
                o = n(19315),
                s = n(91753),
                c = n(91514),
                d = n(45253),
                u = n(25915),
                m = n(93066),
                p = n(62518),
                g = n(50687),
                h = n(48788);
            let f = (e, t, n, r, a) => {
                    if (a) return "inset(0px 0px 0px 0px round var(--radii-ndlRadiusCard))";
                    let i = Math.max(0, e - n),
                        l = Math.max(0, t - r);
                    return "inset(0px ".concat(i, "px ").concat(l, "px 0px round var(--radii-ndlRadiusCard))")
                },
                x = e => {
                    var t, n;
                    let {
                        children: a,
                        targetContainerId: l,
                        ...o
                    } = e, {
                        layout: c,
                        canAnimate: d,
                        layoutReady: p
                    } = (0, u.Wh)(), {
                        state: {
                            isDashboardOpen: g
                        }
                    } = (0, m.CU)(), [x, v] = (0, i.useState)("block"), y = (0, i.useRef)(!1), b = !!g && d && !y.current;
                    (0, i.useEffect)(() => {
                        y.current = !!g
                    }, [g]);
                    let {
                        gridWidth: w,
                        gridHeight: C,
                        widgetLauncherWidth: k,
                        widgetLauncherHeight: T,
                        transform: S,
                        launcherOffset: I,
                        clipPath: j,
                        shouldAnimate: P,
                        transition: E
                    } = (0, i.useMemo)(() => ((e, t, n, r, a) => {
                        var i, l, o, s, c, d, u, m;
                        let p = e[t],
                            g = e["widget-launcher"],
                            x = null != (i = p.width) ? i : 0,
                            v = null != (l = p.height) ? l : 0,
                            y = null != (o = p.x) ? o : 0,
                            b = null != (s = p.y) ? s : 0,
                            w = null != (c = g.x) ? c : 0,
                            C = null != (d = g.y) ? d : 0,
                            k = null != (u = g.width) ? u : 0,
                            T = null != (m = g.height) ? m : 0,
                            S = !r || n ? {
                                x: 0,
                                y: 0
                            } : {
                                x: w - y,
                                y: C - b
                            },
                            I = f(x, v, k, T, n),
                            j = !!(n || a),
                            P = j ? ((e, t, n, r) => e && t ? {
                                duration: n ? h.bb[r] : h.z[r],
                                delay: n ? h.WK[r] : h.IK[r]
                            } : {
                                duration: 0,
                                delay: 0
                            })(a, r, n, t) : {
                                duration: 0,
                                delay: 0
                            };
                        return {
                            gridWidth: x,
                            gridHeight: v,
                            widgetLauncherWidth: k,
                            widgetLauncherHeight: T,
                            transform: S,
                            launcherOffset: r ? {
                                x: w - y,
                                y: C - b
                            } : {
                                x: 0,
                                y: 0
                            },
                            clipPath: I,
                            shouldAnimate: j,
                            transition: P
                        }
                    })(c, l, !!g, !!p, !!d), [c, l, g, p, d]);
                    return (0, r.jsx)(s.e, {
                        "data-would-be-height": C,
                        position: "absolute",
                        sx: {
                            backfaceVisibility: "hidden",
                            isolation: "isolate",
                            willChange: "transform, clip-path"
                        },
                        top: 0,
                        left: 0,
                        width: w || void 0,
                        height: C || "100%",
                        initial: {
                            x: 0,
                            y: 0,
                            z: 0,
                            clipPath: f(w, C, k, T, !0),
                            opacity: 0,
                            scale: .9
                        },
                        animate: {
                            x: b ? [I.x, 0] : S.x,
                            y: b ? [I.y, 0] : S.y,
                            z: 0,
                            clipPath: b ? [f(w, C, k, T, !1), j] : j,
                            opacity: g || d && p ? 1 : 0,
                            scale: g ? 1 : .9,
                            display: g || d ? x : "none"
                        },
                        transition: { ...E,
                            ease: P ? h.Jr : "linear",
                            opacity: {
                                duration: .3 * !!P
                            }
                        },
                        borderRadius: "ndlRadiusCard",
                        backgroundColor: "ndlTransparencyBlack",
                        transformOrigin: "1px 1px",
                        zIndex: (t = !!g, n = !!d, t ? 1 : n ? 0 : -1),
                        ...o,
                        onAnimationStart: () => {
                            v("block")
                        },
                        onAnimationComplete: () => {
                            g || d || v("none")
                        },
                        children: a
                    })
                };
            x.displayName = "DashboardAnimatedContainer";
            var v = n(95415),
                y = n(31219),
                b = n(81085),
                w = n(98964),
                C = n(15617),
                k = n(73186),
                T = n(28526),
                S = n(84721),
                I = n(36760),
                j = n(41684),
                P = n(72744),
                E = n(81278),
                F = n(76968),
                D = n(22139),
                M = n(23518),
                R = n(32902),
                A = n(80321);
            let H = () => {
                    let {
                        get: e
                    } = (0, F.hu)();
                    return (0, r.jsxs)(a.a, {
                        bg: "ndlTransparencyBlack",
                        color: "allWhite",
                        p: 2,
                        rounded: "ndlRadiusSmall",
                        display: "flex",
                        alignItems: "center",
                        gap: 2.5,
                        backdropFilter: "auto",
                        backdropBlur: "ndlFrostedGlassHigh",
                        children: [(0, r.jsx)(a.a, {
                            w: 1.5,
                            h: 1.5,
                            bg: "motorsportsRed",
                            rounded: "full"
                        }), (0, r.jsx)(v.o, {
                            size: "caption",
                            children: e("global", "label.liveNow")
                        })]
                    })
                },
                N = e => {
                    let {
                        item: t,
                        ratio: n,
                        targetContainerId: l,
                        ...o
                    } = e, s = (0, i.useRef)(null), {
                        locale: c
                    } = (0, E.useRouter)(), {
                        state: {
                            isDashboardOpen: d,
                            pageType: u,
                            pageId: p,
                            pageContentTags: g
                        }
                    } = (0, m.CU)(), h = (0, i.useMemo)(() => (e => {
                        var t, n;
                        switch (null == e ? void 0 : e.__typename) {
                            case "PageDriver":
                                return null == e || null == (t = e.driver) ? void 0 : t.asset;
                            case "PageTeam":
                                return null == e || null == (n = e.team) ? void 0 : n.asset;
                            default:
                                return null == e ? void 0 : e.heroAsset
                        }
                    })(t), [t]), f = (0, i.useId)();
                    (0, i.useEffect)(() => {
                        if (!d) return;
                        let e = s.current;
                        if (!e) return;
                        let t = e.play();
                        void 0 !== t && t.catch(() => void 0)
                    }, [d]);
                    let v = (0, i.useCallback)(() => {
                            t && (0, A.yn)({
                                eventAction: A.wT.linkClick,
                                locale: c,
                                pageExperience: {
                                    pageCategory: u,
                                    contentTags: null != g ? g : []
                                },
                                context: {
                                    moduleName: A.B7.dashboard
                                },
                                componentClick: {
                                    clickElementType: "navigation",
                                    clickElementId: p,
                                    clickElementName: "Card ".concat(t.__typename, ": ").concat(t.title),
                                    targetUrl: (0, M.s6)(t),
                                    targetType: "internal"
                                }
                            })
                        }, [t, c, u, p, g]),
                        F = (0, i.useMemo)(() => {
                            var e, n;
                            if ((null == t ? void 0 : t.__typename) !== "PageRaceEvent" || !(null == (e = t.event) ? void 0 : e.startDate) || !(null == (n = t.event) ? void 0 : n.endDate)) return !1;
                            let r = new Date(t.event.startDate),
                                a = new Date(t.event.endDate),
                                i = new Date;
                            return !(Number.isNaN(r.getTime()) || Number.isNaN(a.getTime())) && r <= i && a > i
                        }, [t]);
                    return t ? (0, r.jsx)(x, {
                        targetContainerId: l,
                        onAnimationComplete: () => {
                            if (d) return;
                            let e = s.current;
                            e && !e.paused && e.pause()
                        },
                        children: (0, r.jsx)(D.W, {
                            size: "medium",
                            colorScheme: "black",
                            width: "full",
                            height: "full",
                            p: 0,
                            ...o,
                            cursor: "pointer",
                            children: (0, r.jsxs)(y.Q, {
                                width: "full",
                                height: "full",
                                "data-group": !0,
                                children: [(0, b.jT)(h) && (0, r.jsxs)(a.a, {
                                    position: "absolute",
                                    inset: 0,
                                    zIndex: 0,
                                    children: [(0, b.QR)(h) ? (0, r.jsx)(w.P, {
                                        cloudinaryAsset: h,
                                        wrapperProps: {
                                            position: "absolute"
                                        },
                                        loop: !0,
                                        ref: s,
                                        "aria-hidden": "true",
                                        children: (0, r.jsx)("track", {
                                            kind: "captions",
                                            srcLang: "en",
                                            label: "English",
                                            src: "data:text/vtt,WEBVTT"
                                        })
                                    }) : (0, r.jsx)(C.d, {
                                        cloudinaryAsset: h,
                                        sizes: "30vw",
                                        crop: {
                                            type: "thumb",
                                            aspectRatio: n
                                        },
                                        fill: !0
                                    }), (0, r.jsx)(a.a, {
                                        position: "absolute",
                                        inset: 0,
                                        zIndex: 1,
                                        bgGradient: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%)"
                                    })]
                                }), (0, r.jsxs)(D.d, {
                                    position: "relative",
                                    zIndex: 2,
                                    width: "full",
                                    height: "full",
                                    justifyContent: "space-between",
                                    p: 4,
                                    initial: {
                                        opacity: +!!d
                                    },
                                    animate: {
                                        opacity: +!!d
                                    },
                                    transition: {
                                        duration: .665,
                                        delay: .665 * !!d
                                    },
                                    children: [(0, r.jsxs)(k.z, {
                                        justifyContent: "space-between",
                                        alignItems: "start",
                                        width: "full",
                                        children: [F && (0, r.jsx)(H, {}), (0, r.jsx)(T.v, {
                                            "aria-labelledby": f,
                                            onClick: () => {},
                                            variant: "icon",
                                            size: "large",
                                            colorScheme: "grey",
                                            tabIndex: -1,
                                            marginLeft: "auto",
                                            children: (0, r.jsx)(S.E, {
                                                name: "arrow-right-up"
                                            })
                                        })]
                                    }), (0, r.jsxs)(I.T, {
                                        pb: 2,
                                        alignItems: "start",
                                        justifyContent: "start",
                                        mr: "auto",
                                        gap: .5,
                                        children: [(0, r.jsx)(R.P, {
                                            item: t,
                                            color: "grey200"
                                        }), (0, r.jsx)(y.r, {
                                            as: j.S,
                                            href: (0, M.s6)(t),
                                            id: f,
                                            onClick: v,
                                            ...t.title && {
                                                title: t.title
                                            },
                                            children: (0, r.jsx)(P.X, {
                                                size: "headerM",
                                                color: "allWhite",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                sx: {
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: "2",
                                                    WebkitBoxOrient: "vertical"
                                                },
                                                children: t.title
                                            })
                                        })]
                                    })]
                                })]
                            })
                        })
                    }) : null
                };
            N.displayName = "DashboardGridCard";
            var B = n(68865);
            let L = (0, i.createContext)(void 0),
                U = (e, t) => {
                    let n = new Date(new Date(Date.UTC(e, t + 1, 1)).getTime() - 1).getUTCDate(),
                        r = [];
                    for (let a = 1; a <= n; a++) {
                        let n = new Date(Date.UTC(e, t, a));
                        n.getUTCMonth() === t && n.getUTCFullYear() === e && r.push(n)
                    }
                    return r
                },
                $ = e => {
                    if (!e) return null;
                    let t = e.match(/^(\d{4})-(\d{2})-(\d{2})/);
                    if (!t) return null;
                    let [, n, r, a] = t;
                    return new Date(Date.UTC(parseInt(n, 10), parseInt(r, 10) - 1, parseInt(a, 10)))
                },
                G = (e, t) => {
                    let n = $(e.startDate);
                    if (!n) return !1;
                    let r = $(e.endDate);
                    return r ? t.getTime() >= n.getTime() && t.getTime() <= r.getTime() : ((e, t) => e.getUTCFullYear() === t.getUTCFullYear() && e.getUTCMonth() === t.getUTCMonth() && e.getUTCDate() === t.getUTCDate())(t, n)
                },
                z = e => {
                    let {
                        children: t,
                        initialSelectedDate: n,
                        events: a
                    } = e, l = (0, i.useMemo)(() => {
                        let e = new Date(n);
                        return new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()))
                    }, [n]), [o, s] = (0, i.useState)(l), [c, d] = (0, i.useState)(l), [u, m] = (0, i.useState)(l), p = l.getUTCFullYear(), g = (0, i.useMemo)(() => a.filter(e => null !== e), [a]), h = (0, i.useMemo)(() => ((e, t) => {
                        let n = new Map;
                        for (let r = 0; r < 12; r++) {
                            let a = U(e, r).map(e => {
                                    let n = t.filter(t => G(t, e));
                                    return {
                                        date: e,
                                        events: n
                                    }
                                }),
                                i = [];
                            for (let e = 0; e < a.length; e += 7) i.push(a.slice(e, e + 7));
                            let l = "".concat(e, "-").concat(String(r + 1).padStart(2, "0"));
                            n.set(l, {
                                month: r,
                                weeks: i
                            })
                        }
                        return n
                    })(p, g), [p, g]), f = 11 > c.getUTCMonth() && c.getUTCFullYear() === p, x = c.getUTCMonth() > 0 && c.getUTCFullYear() === p, v = (0, i.useCallback)(() => {
                        if (!f) return;
                        let e = new Date(c);
                        if (e.setUTCMonth(c.getUTCMonth() + 1), e.getUTCFullYear() === p) {
                            d(e);
                            let t = Math.min(u.getUTCDate(), new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth() + 1, 0)).getUTCDate());
                            m(new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), t)))
                        }
                    }, [f, u, c, p]), y = (0, i.useCallback)(() => {
                        if (!x) return;
                        let e = new Date(c);
                        if (e.setUTCMonth(c.getUTCMonth() - 1), e.getUTCFullYear() === p) {
                            d(e);
                            let t = Math.min(u.getUTCDate(), new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth() + 1, 0)).getUTCDate());
                            m(new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), t)))
                        }
                    }, [x, u, c, p]), b = (0, i.useCallback)(e => {
                        let t = new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()));
                        s(t), m(t), d(t)
                    }, []), w = (0, i.useCallback)(e => {
                        m(new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate())))
                    }, []), C = (0, i.useCallback)(e => g.some(t => G(t, e)), [g]), k = (0, i.useCallback)(e => g.filter(t => G(t, e)), [g]), T = (0, i.useMemo)(() => ({
                        selectedDate: o,
                        selectedMonth: c,
                        focusedDate: u,
                        calendarData: h,
                        goToNextMonth: v,
                        goToPrevMonth: y,
                        selectDate: b,
                        setFocusedDate: w,
                        hasEvents: C,
                        getEventsForDate: k,
                        canGoToNextMonth: f,
                        canGoToPrevMonth: x
                    }), [o, c, u, h, v, y, b, w, C, k, f, x]);
                    return (0, r.jsx)(L.Provider, {
                        value: T,
                        children: t
                    })
                },
                W = () => {
                    let e = (0, i.useContext)(L);
                    if (void 0 === e) throw Error("useCalendar must be used within a CalendarProvider");
                    return e
                };
            var _ = n(70659),
                O = n(18397),
                q = n(94699),
                K = n(21593);
            let Y = (0, n(77367).R)((e, t) => (0, r.jsx)(T.v, {
                    ref: t,
                    ...e
                })),
                V = e => {
                    let {
                        date: t,
                        isToday: n,
                        isSelected: i,
                        isFocused: l,
                        hasEvents: o,
                        onClick: s,
                        onKeyDown: c,
                        ...u
                    } = e, m = t.getUTCDate();
                    return (0, r.jsxs)(d.s, {
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        maxW: 7,
                        mx: "auto",
                        children: [(0, r.jsx)(Y, {
                            role: "gridcell",
                            "aria-selected": i ? "true" : void 0,
                            "aria-label": t.toISOString(),
                            tabIndex: l ? 0 : -1,
                            onClick: s,
                            onKeyDown: c,
                            size: "xSmall",
                            colorScheme: i ? "white" : "transparent",
                            border: "1px solid",
                            borderColor: n && !i ? "white" : "transparent",
                            ...u,
                            children: m
                        }), (0, r.jsx)(a.a, {
                            visibility: o ? "visible" : "hidden",
                            role: "presentation",
                            "aria-hidden": "true",
                            width: i ? "full" : 1.5,
                            height: 1.5,
                            mt: 1,
                            borderRadius: "full",
                            backgroundColor: "motorsportsRed",
                            transitionProperty: "all",
                            transitionDuration: "short"
                        })]
                    })
                };
            V.displayName = "CalendarDayButton";
            let J = e => {
                    let t = e.getUTCFullYear(),
                        n = e.getUTCMonth() + 1;
                    return "".concat(t, "-").concat(String(n).padStart(2, "0"))
                },
                Q = e => 12 * e.getUTCFullYear() + e.getUTCMonth(),
                X = e => {
                    let {
                        selectedMonth: t,
                        selectedDate: n,
                        focusedDate: l,
                        calendarData: o,
                        selectDate: c,
                        setFocusedDate: u,
                        goToNextMonth: m,
                        goToPrevMonth: p,
                        canGoToNextMonth: g,
                        canGoToPrevMonth: h,
                        hasEvents: f
                    } = W(), x = (0, i.useMemo)(() => new Date, []), y = (0, i.useRef)(0), b = (0, i.useRef)(Q(t)), w = Q(t);
                    w !== b.current && (0 === y.current && (y.current = Math.sign(w - b.current)), b.current = w);
                    let C = y.current,
                        k = (0, i.useCallback)(() => {
                            g && (y.current = 1, m())
                        }, [g, m]),
                        I = (0, i.useCallback)(() => {
                            h && (y.current = -1, p())
                        }, [h, p]),
                        j = (0, i.useMemo)(() => {
                            let e = J(t);
                            return o.get(e)
                        }, [t, o]),
                        P = (0, i.useMemo)(() => J(t), [t]),
                        E = (0, i.useMemo)(() => j ? j.weeks.flat() : [], [j]),
                        F = (e, t) => e.getUTCFullYear() === t.getUTCFullYear() && e.getUTCMonth() === t.getUTCMonth() && e.getUTCDate() === t.getUTCDate(),
                        D = (0, i.useMemo)(() => E.map(e => e.date), [E]),
                        M = (0, i.useCallback)(e => {
                            e >= 0 && e < D.length && u(D[e])
                        }, [D, u]),
                        R = (0, i.useCallback)((e, t) => {
                            let n = D.findIndex(e => F(e, t));
                            switch (e.key) {
                                case "ArrowUp":
                                    e.preventDefault(), M(Math.max(0, n - 7));
                                    break;
                                case "ArrowDown":
                                    e.preventDefault(), M(Math.min(D.length - 1, n + 7));
                                    break;
                                case "ArrowLeft":
                                    e.preventDefault(), M(Math.max(0, n - 1));
                                    break;
                                case "ArrowRight":
                                    e.preventDefault(), M(Math.min(D.length - 1, n + 1));
                                    break;
                                case "Home":
                                    e.preventDefault(), M(7 * Math.floor(n / 7));
                                    break;
                                case "End":
                                    e.preventDefault(), M(Math.min(D.length - 1, 7 * Math.floor(n / 7) + 6));
                                    break;
                                case "PageUp":
                                    e.preventDefault(), !e.shiftKey && h && I();
                                    break;
                                case "PageDown":
                                    e.preventDefault(), !e.shiftKey && g && k();
                                    break;
                                case " ":
                                case "Enter":
                                    e.preventDefault(), c(t)
                            }
                        }, [D, M, c, k, I, g, h]);
                    return (0, r.jsxs)(_.U, {
                        size: "medium",
                        p: 4,
                        position: "relative",
                        height: "full",
                        colorScheme: "transparent",
                        ...e,
                        children: [(0, r.jsxs)(d.s, {
                            as: "nav",
                            "aria-label": "Calendar",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 4,
                            children: [(0, r.jsx)(T.v, {
                                "aria-label": "Previous month",
                                onClick: I,
                                disabled: !h,
                                size: "small",
                                variant: "icon",
                                colorScheme: "transparent",
                                children: (0, r.jsx)(S.E, {
                                    name: "chevron-left"
                                })
                            }), (0, r.jsx)(v.o, {
                                id: "calendar-month-year",
                                "aria-live": "polite",
                                "aria-atomic": "true",
                                color: "allWhite",
                                children: (0, r.jsx)(O.c, {
                                    dateFormatterOptions: {
                                        month: "long"
                                    },
                                    children: t.toISOString()
                                })
                            }), (0, r.jsx)(T.v, {
                                "aria-label": "Next month",
                                onClick: k,
                                disabled: !g,
                                size: "small",
                                variant: "icon",
                                colorScheme: "transparent",
                                children: (0, r.jsx)(S.E, {
                                    name: "chevron-right"
                                })
                            })]
                        }), (0, r.jsx)(a.a, {
                            position: "relative",
                            overflow: "hidden",
                            width: "100%",
                            height: "100%",
                            children: (0, r.jsx)(K.N, {
                                custom: C,
                                initial: !1,
                                mode: "popLayout",
                                children: (0, r.jsx)(s.e, {
                                    custom: C,
                                    variants: {
                                        enter: e => ({
                                            x: (e => 0 === e ? 0 : e > 0 ? "100%" : "-100%")(e)
                                        }),
                                        center: {
                                            zIndex: 1,
                                            x: 0
                                        },
                                        exit: e => ({
                                            zIndex: 0,
                                            x: (e => 0 === e ? 0 : e < 0 ? "100%" : "-100%")(e)
                                        })
                                    },
                                    initial: "enter",
                                    animate: "center",
                                    exit: "exit",
                                    width: "100%",
                                    height: "100%",
                                    transition: {
                                        duration: .3,
                                        ease: "easeInOut"
                                    },
                                    position: "absolute",
                                    sx: {
                                        backfaceVisibility: "hidden",
                                        isolation: "isolate",
                                        willChange: "transform, z-index"
                                    },
                                    children: (0, r.jsx)(q.x, {
                                        role: "grid",
                                        "aria-labelledby": "calendar-month-year",
                                        templateColumns: "repeat(7, 1fr)",
                                        columnGap: 2,
                                        rowGap: {
                                            base: 1,
                                            ndlDashboardGrid: 2
                                        },
                                        height: "full",
                                        children: E.map(e => (0, r.jsx)(V, {
                                            date: e.date,
                                            isToday: F(e.date, x),
                                            isSelected: F(e.date, n),
                                            isFocused: F(e.date, l),
                                            hasEvents: f(e.date),
                                            onClick: () => c(e.date),
                                            onKeyDown: t => R(t, e.date)
                                        }, e.date.toISOString()))
                                    })
                                }, P)
                            })
                        })]
                    })
                };
            X.displayName = "CalendarGrid";
            var Z = n(98913);
            let ee = e => {
                    let {
                        children: t
                    } = e;
                    return (0, r.jsx)(v.o, {
                        as: "span",
                        color: "allWhite",
                        children: t
                    })
                },
                et = e => (0, r.jsx)(v.o, { ...e,
                    color: "grey200"
                }),
                en = e => {
                    let {
                        children: t
                    } = e;
                    return (0, r.jsx)(O.c, {
                        dateFormatterOptions: {
                            hour: "2-digit",
                            minute: "2-digit"
                        },
                        textComponent: et,
                        children: t
                    })
                },
                er = e => {
                    var t;
                    let {
                        event: n,
                        href: i,
                        onClick: l
                    } = e;
                    return (0, r.jsxs)(_.U, {
                        as: i ? j.S : void 0,
                        href: null != i ? i : void 0,
                        onClick: i ? l : void 0,
                        size: "small",
                        colorScheme: "black",
                        p: 2,
                        gap: 2,
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        position: "relative",
                        flexDirection: "row",
                        cursor: i ? "pointer" : void 0,
                        textDecoration: "none",
                        transitionProperty: "background-color",
                        transitionDuration: "short",
                        _hover: i ? {
                            textDecoration: "none",
                            backgroundColor: "ndlLanguageSelectorHoverBg"
                        } : void 0,
                        children: [(0, r.jsx)(a.a, {
                            width: 1,
                            backgroundColor: "motorsportsRed",
                            borderRadius: "full",
                            alignSelf: "stretch"
                        }), (0, r.jsxs)(I.T, {
                            align: "start",
                            gap: 1,
                            width: "full",
                            children: [(0, r.jsx)(d.s, {
                                color: "allWhite",
                                fontSize: "md",
                                fontWeight: "medium",
                                gap: 0,
                                children: (0, r.jsxs)("p", {
                                    children: [(0, r.jsx)(ee, {
                                        children: null == (t = n.series) ? void 0 : t.name
                                    }), (0, r.jsxs)(v.o, {
                                        as: "span",
                                        whiteSpace: "pre",
                                        children: [" ", "-", " "]
                                    }), (0, r.jsx)(ee, {
                                        children: n.name
                                    })]
                                })
                            }), (0, r.jsx)(d.s, {
                                color: "allWhite",
                                gap: 0,
                                children: n.startDate && (0, r.jsx)(en, {
                                    children: n.startDate
                                })
                            })]
                        })]
                    })
                };
            er.displayName = "CalendarEventDetails";
            var ea = n(51225),
                ei = n(4489);
            let el = e => (0, r.jsx)(v.o, { ...e,
                    color: "allWhite"
                }),
                eo = e => (0, r.jsx)(P.X, { ...e,
                    size: "headerL",
                    color: "allWhite",
                    as: "time"
                }),
                es = e => {
                    var t;
                    let {
                        selectedDate: n,
                        getEventsForDate: a
                    } = W(), {
                        locale: i,
                        isPreview: l
                    } = (0, E.useRouter)(), {
                        state: {
                            dashboardId: o,
                            pageType: s,
                            pageId: c,
                            pageContentTags: d
                        }
                    } = (0, m.CU)(), {
                        data: u
                    } = (0, ea.c7)({
                        id: null != o ? o : "",
                        locale: i,
                        preview: !!l
                    }), p = a(n);
                    return (0, r.jsxs)(_.U, {
                        size: "medium",
                        p: 4,
                        pb: 0,
                        height: "full",
                        colorScheme: "transparent",
                        position: "relative",
                        overflow: "hidden",
                        ...e,
                        children: [(0, r.jsxs)(Z.B, {
                            flexDirection: {
                                base: "row",
                                l: "column"
                            },
                            justifyContent: "space-between",
                            height: "full",
                            className: "1",
                            children: [(0, r.jsxs)(I.T, {
                                gap: 0,
                                alignItems: "start",
                                flex: 1,
                                className: "2",
                                children: [(0, r.jsx)(O.c, {
                                    dateFormatterOptions: {
                                        weekday: "short"
                                    },
                                    textComponent: el,
                                    children: n.toISOString()
                                }), (0, r.jsx)(O.c, {
                                    dateFormatterOptions: {
                                        month: "short",
                                        day: "numeric"
                                    },
                                    textComponent: eo,
                                    children: n.toISOString()
                                })]
                            }), (0, r.jsx)(I.T, {
                                alignItems: "stretch",
                                flex: 1,
                                justifyContent: "start",
                                overflowY: "auto",
                                className: "scroll-fade-y",
                                sx: {
                                    "--scroll-fade-size": "96px"
                                },
                                children: p.length > 0 && (0, r.jsx)(Z.B, {
                                    spacing: 2,
                                    marginTop: "auto",
                                    pb: 4,
                                    children: p.map(e => {
                                        let t = (e => {
                                            var t, n, r, a, i;
                                            let l = null == (n = e.linkedFrom) || null == (t = n.pageRaceEventCollection) ? void 0 : t.items[0];
                                            if (null == l ? void 0 : l.slug) return "".concat(ei.I.pageRaceEvent, "/").concat(l.slug);
                                            let o = null == (i = e.series) || null == (a = i.linkedFrom) || null == (r = a.pageRaceSeriesCollection) ? void 0 : r.items[0];
                                            return (null == o ? void 0 : o.slug) ? "".concat(ei.I.pageRaceSeries, "/").concat(o.slug) : null
                                        })(e);
                                        return (0, r.jsx)(er, {
                                            event: e,
                                            href: t,
                                            onClick: t ? () => ((e, t) => {
                                                var n, r, a;
                                                (0, A.yn)({
                                                    eventAction: A.wT.linkClick,
                                                    locale: i,
                                                    pageExperience: {
                                                        pageCategory: s,
                                                        contentTags: null != d ? d : []
                                                    },
                                                    context: {
                                                        moduleName: A.B7.dashboard
                                                    },
                                                    componentClick: {
                                                        clickElementType: "navigation",
                                                        clickElementId: c,
                                                        clickElementName: "Calendar event: ".concat(null != (r = null == (n = e.series) ? void 0 : n.name) ? r : "", " - ").concat(null != (a = e.name) ? a : ""),
                                                        targetUrl: t,
                                                        targetType: "internal"
                                                    }
                                                })
                                            })(e, t) : void 0
                                        }, e.sys.id)
                                    })
                                })
                            })]
                        }), 0 === p.length && (0, r.jsx)(v.o, {
                            color: "grey200",
                            pb: 4,
                            children: null == u || null == (t = u.dashboard) ? void 0 : t.labelNoEventsOnDate
                        })]
                    })
                };
            es.displayName = "CalendarDateDetails";
            var ec = n(40157),
                ed = n(12482),
                eu = n(54513);
            let em = "\n    query Calendar($locale: String!, $preview: Boolean!) {\n  eventCollection(locale: $locale, preview: $preview, order: startDate_ASC) {\n    items {\n      ...CalendarEventFields\n    }\n  }\n}\n    ".concat("\n    fragment CalendarEventFields on Event {\n  ...ComponentReferenceFields\n  name\n  startDate\n  endDate\n  series {\n    ...CalendarSeriesFields\n  }\n  linkedFrom {\n    pageRaceEventCollection(limit: 1) {\n      items {\n        ...ComponentReferenceFields\n        sys {\n          locale\n        }\n        slug\n      }\n    }\n  }\n}\n    ", "\n").concat(ec.o, "\n").concat("\n    fragment CalendarSeriesFields on Series {\n  ...ComponentReferenceFields\n  name\n  linkedFrom {\n    pageRaceSeriesCollection(limit: 1) {\n      items {\n        ...ComponentReferenceFields\n        sys {\n          locale\n        }\n        slug\n      }\n    }\n  }\n}\n    "),
                ep = (e, t) => (0, ed.I)({
                    queryKey: ["Calendar", e],
                    queryFn: (0, eu.x8)(em, e),
                    ...t
                });
            ep.getKey = e => ["Calendar", e], ep.fetcher = (e, t) => (0, eu.x8)(em, e, t);
            let eg = (0, n(35882).B)(g.Ay),
                eh = () => {
                    let {
                        selectDate: e
                    } = W(), {
                        state: {
                            isDashboardOpen: t
                        }
                    } = (0, m.CU)(), n = (0, i.useRef)(t);
                    return (0, i.useEffect)(() => {
                        let r = n.current;
                        if (n.current = t, r && !t) {
                            let t = setTimeout(() => {
                                e(new Date)
                            }, 1500);
                            return () => clearTimeout(t)
                        }
                    }, [t, e]), null
                },
                ef = () => {
                    var e, t, n, g, h, f, v, y;
                    let {
                        isMounted: b,
                        isDashboardOpen: w,
                        canAnimate: C,
                        calendarData: k,
                        dashboardData: T,
                        closeDashboard: S
                    } = function() {
                        let {
                            locale: e,
                            isPreview: t
                        } = (0, E.useRouter)(), {
                            state: {
                                isDashboardOpen: n,
                                dashboardId: r,
                                pageType: a,
                                pageId: l,
                                pageContentTags: s
                            },
                            dispatch: c
                        } = (0, m.CU)(), {
                            canAnimate: d,
                            updateLayout: p,
                            setCanAnimate: g
                        } = (0, u.Wh)(), h = (0, o.xP)(), [f, x] = (0, i.useState)(!1), v = n || d, y = (0, i.useRef)(), b = (0, i.useRef)(n);
                        (0, i.useEffect)(() => {
                            x(!0)
                        }, []), (0, i.useEffect)(() => {
                            f && p()
                        }, [f, p]), (0, i.useEffect)(() => {
                            let e = b.current;
                            return b.current = n, e && !n && d && (clearTimeout(y.current), y.current = setTimeout(() => {
                                g(!1)
                            }, 1330)), n && clearTimeout(y.current), () => clearTimeout(y.current)
                        }, [n, d, g]), (0, i.useEffect)(() => {
                            if (h) {
                                if (v) return h.stop(), () => {
                                    h.start()
                                };
                                h.start()
                            }
                        }, [h, v]);
                        let w = (0, i.useCallback)(() => {
                            (0, A.yn)({
                                eventAction: A.wT.dashboardClose,
                                locale: e,
                                pageExperience: {
                                    pageCategory: a,
                                    contentTags: null != s ? s : []
                                },
                                context: {
                                    moduleName: A.B7.dashboard
                                },
                                componentClick: {
                                    clickElementType: "interaction",
                                    clickElementId: l,
                                    clickElementName: "Close"
                                }
                            }), c({
                                type: "SET_IS_DASHBOARD_OPEN",
                                payload: !1
                            })
                        }, [c, e, a, l, s]);
                        (0, i.useEffect)(() => {
                            if (!n) return;
                            let e = e => {
                                "Escape" === e.key && w()
                            };
                            return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e)
                        }, [n, w]);
                        let {
                            data: C
                        } = ep({
                            locale: e,
                            preview: !!t
                        }), {
                            data: k
                        } = (0, ea.c7)({
                            id: null != r ? r : "",
                            locale: e,
                            preview: !!t
                        });
                        return {
                            isMounted: f,
                            isDashboardOpen: n,
                            canAnimate: d,
                            calendarData: C,
                            dashboardData: k,
                            closeDashboard: w
                        }
                    }();
                    if (!(null == T || null == (e = T.dashboard) ? void 0 : e.showDashboard)) return null;
                    let I = (0, r.jsx)(p.A, {
                        enabled: w,
                        children: (0, r.jsxs)(z, {
                            initialSelectedDate: new Date,
                            events: null != (y = null == k || null == (t = k.eventCollection) ? void 0 : t.items) ? y : [],
                            children: [(0, r.jsx)(eh, {}), (0, r.jsxs)(a.a, {
                                "data-lenis-prevent": !0,
                                position: "fixed",
                                inset: 0,
                                zIndex: w || C ? "modal" : 1,
                                pointerEvents: w ? "auto" : "none",
                                width: "100vw",
                                height: "100svh",
                                className: "dashboard-container",
                                role: w ? "dialog" : void 0,
                                "aria-modal": w ? "true" : void 0,
                                "aria-label": w ? "Dashboard" : void 0,
                                children: [(0, r.jsx)(a.a, {
                                    position: "relative",
                                    width: "100vw",
                                    height: "100svh",
                                    display: "flex",
                                    zIndex: 1,
                                    alignItems: {
                                        base: "start",
                                        ndlDashboardGrid: "center"
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
                                        base: 6,
                                        ndlDashboardGrid: 0
                                    },
                                    overflow: "auto",
                                    className: "dashboard-content",
                                    children: (0, r.jsxs)(eg, {
                                        disabled: !w,
                                        returnFocus: !0,
                                        display: "flex",
                                        width: "full",
                                        maxWidth: "1648px",
                                        marginInline: "auto",
                                        flexDirection: "column",
                                        alignItems: "flex-end",
                                        justifyContent: "center",
                                        gap: {
                                            base: 4,
                                            ndlDashboardGrid: 8
                                        },
                                        className: "dashboard-flex-container focus-lock-container",
                                        children: [(0, r.jsx)(s.e, {
                                            zIndex: 3,
                                            initial: {
                                                opacity: 0
                                            },
                                            animate: {
                                                opacity: +!!w
                                            },
                                            children: (0, r.jsx)(c.Q, {
                                                icon: "close",
                                                ariaLabel: "Close dashboard",
                                                onClick: S,
                                                size: {
                                                    base: 9,
                                                    l: 12
                                                },
                                                backgroundColor: "ndlTransparencyBlack",
                                                hoverBackgroundColor: "ndlTransparencyGreyHover",
                                                backdropBlur: "ndlFrostedGlassHigh"
                                            })
                                        }), (0, r.jsxs)(a.a, {
                                            color: "white",
                                            width: "full",
                                            height: {
                                                base: "auto",
                                                ndlDashboardGrid: "681px"
                                            },
                                            display: "grid",
                                            gap: 4,
                                            gridTemplateColumns: {
                                                base: "1fr",
                                                ndlDashboardGrid: "repeat(3, minmax(0, 1fr))"
                                            },
                                            gridTemplateRows: {
                                                base: "585px 269px 470px 269px 269px",
                                                md: "370px 330px 470px 330px 330px",
                                                ndlDashboardGrid: "repeat(2, minmax(0, 1fr))"
                                            },
                                            gridTemplateAreas: {
                                                base: '"leftTop" "leftBottom" "center" "rightTop" "rightBottom"',
                                                ndlDashboardGrid: '"leftTop center rightTop" "leftBottom center rightBottom"'
                                            },
                                            alignItems: "stretch",
                                            justifyItems: "stretch",
                                            minWidth: 0,
                                            minHeight: 0,
                                            className: "dashboard-grid",
                                            children: [(0, r.jsxs)(a.a, {
                                                display: "grid",
                                                gridArea: {
                                                    base: "leftTop",
                                                    ndlDashboardGrid: "leftTop"
                                                },
                                                gridTemplateColumns: {
                                                    base: "1fr",
                                                    md: "1.2fr 1fr",
                                                    ndlDashboardGrid: "1.2fr 1fr"
                                                },
                                                gap: 4,
                                                minWidth: 0,
                                                minHeight: 0,
                                                className: "dashboard-left-top-row",
                                                children: [(0, r.jsx)(d.s, {
                                                    id: u.nJ["m-left-top-left-card"],
                                                    gridArea: "auto",
                                                    position: "relative",
                                                    height: "100%",
                                                    width: "100%",
                                                    minWidth: 0,
                                                    minHeight: {
                                                        base: "286px",
                                                        ndlDashboardGrid: 0
                                                    },
                                                    children: (0, r.jsx)(x, {
                                                        targetContainerId: u.nJ["m-left-top-left-card"],
                                                        children: (0, r.jsx)(X, {})
                                                    })
                                                }), (0, r.jsx)(d.s, {
                                                    id: u.nJ["m-left-top-right-card"],
                                                    gridArea: "auto",
                                                    position: "relative",
                                                    height: "100%",
                                                    width: "100%",
                                                    minWidth: 0,
                                                    minHeight: {
                                                        base: "283px",
                                                        md: 0
                                                    },
                                                    children: (0, r.jsx)(x, {
                                                        targetContainerId: u.nJ["m-left-top-right-card"],
                                                        children: (0, r.jsx)(es, {})
                                                    })
                                                })]
                                            }), (0, r.jsx)(d.s, {
                                                id: u.nJ["m-left-bottom-card"],
                                                gridArea: {
                                                    base: "leftBottom",
                                                    ndlDashboardGrid: "leftBottom"
                                                },
                                                position: "relative",
                                                height: "100%",
                                                width: "100%",
                                                minWidth: 0,
                                                minHeight: 0,
                                                className: "dashboard-left-bottom-row",
                                                children: (null == T || null == (n = T.dashboard) ? void 0 : n.leftBottomCard) && (0, r.jsx)(N, {
                                                    item: T.dashboard.leftBottomCard,
                                                    targetContainerId: u.nJ["m-left-bottom-card"],
                                                    ratio: "16:9"
                                                })
                                            }), (0, r.jsx)(d.s, {
                                                id: u.nJ["m-center-card"],
                                                gridArea: {
                                                    base: "center",
                                                    ndlDashboardGrid: "center"
                                                },
                                                position: "relative",
                                                height: "100%",
                                                width: "100%",
                                                minWidth: 0,
                                                minHeight: 0,
                                                justifyContent: "stretch",
                                                alignItems: "stretch",
                                                className: "dashboard-center-row",
                                                children: (null == T || null == (g = T.dashboard) ? void 0 : g.centerCard) && (0, r.jsx)(N, {
                                                    item: T.dashboard.centerCard,
                                                    targetContainerId: u.nJ["m-center-card"],
                                                    ratio: "9:16"
                                                })
                                            }), (0, r.jsxs)(a.a, {
                                                display: "grid",
                                                gridArea: {
                                                    base: "rightTop",
                                                    ndlDashboardGrid: "rightTop"
                                                },
                                                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                                                gap: 4,
                                                minWidth: 0,
                                                minHeight: 0,
                                                className: "dashboard-right-top-row",
                                                children: [(0, r.jsx)(d.s, {
                                                    id: u.nJ["m-right-top-left-card"],
                                                    position: "relative",
                                                    minWidth: 0,
                                                    minHeight: 0,
                                                    children: (null == T || null == (h = T.dashboard) ? void 0 : h.rightTopLeftCard) && (0, r.jsx)(N, {
                                                        item: T.dashboard.rightTopLeftCard,
                                                        targetContainerId: u.nJ["m-right-top-left-card"],
                                                        ratio: "1:1"
                                                    })
                                                }), (0, r.jsx)(d.s, {
                                                    id: u.nJ["m-right-top-right-card"],
                                                    position: "relative",
                                                    minWidth: 0,
                                                    minHeight: 0,
                                                    children: (null == T || null == (f = T.dashboard) ? void 0 : f.rightTopRightCard) && (0, r.jsx)(N, {
                                                        item: T.dashboard.rightTopRightCard,
                                                        targetContainerId: u.nJ["m-right-top-right-card"],
                                                        ratio: "1:1"
                                                    })
                                                })]
                                            }), (0, r.jsx)(d.s, {
                                                id: u.nJ["m-right-bottom-card"],
                                                gridArea: {
                                                    base: "rightBottom",
                                                    ndlDashboardGrid: "rightBottom"
                                                },
                                                position: "relative",
                                                height: "100%",
                                                width: "100%",
                                                minWidth: 0,
                                                minHeight: 0,
                                                className: "dashboard-right-bottom-row",
                                                children: (null == T || null == (v = T.dashboard) ? void 0 : v.rightBottomCard) && (0, r.jsx)(N, {
                                                    item: T.dashboard.rightBottomCard,
                                                    targetContainerId: u.nJ["m-right-bottom-card"],
                                                    ratio: "16:9"
                                                })
                                            })]
                                        })]
                                    })
                                }), (0, r.jsx)(B.z, {
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
                                        opacity: +!!w
                                    },
                                    transition: {
                                        duration: .5,
                                        delay: .75 * !w
                                    },
                                    className: "dashboard-backdrop"
                                })]
                            })]
                        })
                    });
                    return b ? (0, l.createPortal)(I, document.body) : null
                };
            ef.displayName = "MeasureGrid";
            let ex = e => {
                let {
                    children: t
                } = e;
                return (0, r.jsx)(u.MR, {
                    children: (0, r.jsxs)(a.a, {
                        position: "relative",
                        children: [t, (0, r.jsx)(ef, {})]
                    })
                })
            }
        },
        18397: (e, t, n) => {
            n.d(t, {
                c: () => o
            });
            var r = n(6029),
                a = n(8711),
                i = n(98168),
                l = n(20036);
            let o = e => {
                let {
                    children: t,
                    dateFormatterOptions: n,
                    locale: o,
                    isHeading: s = !1,
                    timeZoneLabel: c,
                    headingComponent: d = i.D,
                    textComponent: u = a.E,
                    ...m
                } = e, p = (0, l.i)(t, n, o, c);
                return s ? (0, r.jsx)(d, { ...m,
                    as: "time",
                    dateTime: t,
                    suppressHydrationWarning: !0,
                    children: p
                }) : (0, r.jsx)(u, { ...m,
                    as: "time",
                    dateTime: t,
                    suppressHydrationWarning: !0,
                    children: p
                })
            }
        },
        20036: (e, t, n) => {
            n.d(t, {
                h: () => o,
                i: () => s
            });
            var r = n(18861),
                a = n(81278),
                i = n(55729);
            let l = {
                    "en-PAP": "en"
                },
                o = {
                    Date: {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    },
                    DateTime: {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric"
                    },
                    Time: {
                        hour: "numeric",
                        minute: "numeric"
                    }
                },
                s = (e, t, n, o) => {
                    let {
                        locale: s
                    } = (0, a.useRouter)(), {
                        dateObj: c
                    } = (0, i.useMemo)(() => "string" == typeof e ? {
                        dateObj: new Date(e)
                    } : {
                        dateObj: e
                    }, [e]);
                    return [(0, i.useMemo)(() => {
                        var e;
                        let a = (e => {
                            try {
                                return new Intl.DateTimeFormat(e), e
                            } catch (r) {
                                let n = l[e];
                                if (!n) {
                                    var t;
                                    return null == (t = window) || t.console.error("Locale: ".concat(e, " is invalid and does not have a valid locale mapped. Falling back to default locale.")), "en"
                                }
                                return n
                            }
                        })(null != (e = null != n ? n : s) ? e : "en");
                        return new r.p(a, t).format(c)
                    }, [c, n, s, t]), o].filter(Boolean).join(" ")
                }
        },
        20207: (e, t, n) => {
            n.d(t, {
                l: () => i,
                v: () => a
            });
            var r = n(86590);
            let a = "0px",
                i = {
                    paddingInlineStart: "max(1.25rem, env(safe-area-inset-left))",
                    paddingInlineEnd: "max(1.25rem, env(safe-area-inset-right))",
                    [r.JM.md]: {
                        paddingInlineStart: "max(2.5rem, env(safe-area-inset-left))",
                        paddingInlineEnd: "max(2.5rem, env(safe-area-inset-right))"
                    }
                }
        },
        22139: (e, t, n) => {
            n.d(t, {
                W: () => l,
                d: () => o
            });
            var r = n(3141),
                a = n(70659),
                i = n(36760);
            let l = (0, r.P)(a.U),
                o = (0, r.P)(i.T)
        },
        28526: (e, t, n) => {
            n.d(t, {
                v: () => d
            });
            var r = n(6029),
                a = n(77367),
                i = n(69757),
                l = n(38275),
                o = n(35882),
                s = n(21938),
                c = n(55729);
            let d = (0, a.R)((e, t) => {
                let n = (0, i.V)("NdlButton", e),
                    {
                        className: a,
                        as: d,
                        children: u,
                        ...m
                    } = (0, l.M)(e),
                    p = (0, c.useMemo)(() => ({
                        display: "inline-flex",
                        appearance: "none",
                        alignItems: "center",
                        justifyContent: "center",
                        userSelect: "none",
                        position: "relative",
                        whiteSpace: "nowrap",
                        verticalAlign: "middle",
                        outline: "none",
                        ...n
                    }), [n]);
                return (0, r.jsx)(o.B.button, {
                    ref: t,
                    as: d,
                    __css: p,
                    className: (0, s.cx)("ndl-button", a),
                    ...m,
                    children: u
                })
            });
            d.displayName = "NdlButton"
        },
        32902: (e, t, n) => {
            n.d(t, {
                P: () => o
            });
            var r = n(6029),
                a = n(55729),
                i = n(76968),
                l = n(8711);
            let o = e => {
                let {
                    item: t,
                    ...n
                } = e, {
                    get: o
                } = (0, i.hu)(), s = (0, a.useMemo)(() => {
                    var e, n, r, a, i;
                    if (!t) return null;
                    switch (t.__typename) {
                        case "PageArticle":
                            return null != (e = t.topic) ? e : o("global", "label.pageArticle");
                        case "PageBasic":
                            return null != (n = t.subtitle) ? n : o("global", "label.pageBasic");
                        case "PageCar":
                            return null != (r = t.subtitle) ? r : o("global", "label.pageCar");
                        case "PageCategory":
                            return null != (a = t.subtitle) ? a : o("global", "label.pageCategory");
                        case "PageDriver":
                            return o("global", "label.pageDriver");
                        case "PageRaceEvent":
                            return t.subtitle ? "".concat(o("global", "label.pageRaceEvent"), " - ").concat(t.subtitle) : o("global", "label.pageRaceEvent");
                        case "PageRaceSeries":
                            return null != (i = t.subtitle) ? i : o("global", "label.pageRaceSeries");
                        case "PageTeam":
                            return o("global", "label.pageTeam");
                        default:
                            return null
                    }
                }, [t, o]);
                return (0, r.jsx)(l.E, { ...n,
                    children: s
                })
            };
            o.displayName = "Subtitle"
        },
        34675: (e, t, n) => {
            n.d(t, {
                F: () => a,
                X: () => i
            });
            let r = new Set;

            function a(e) {
                r.has(e) || (r.add(e), fetch(e, {
                    priority: "low"
                }).then(e => e.blob()).catch(() => {
                    r.delete(e)
                }))
            }

            function i(e) {
                return r.has(e) ? Promise.resolve() : (r.add(e), fetch(e, {
                    priority: "low"
                }).then(e => e.blob()).catch(() => {
                    r.delete(e)
                }).then(() => void 0))
            }
        },
        49360: (e, t, n) => {
            n.d(t, {
                $5: () => u,
                fG: () => g,
                jE: () => o,
                kV: () => c,
                ow: () => m,
                po: () => h,
                tI: () => p
            });
            var r = n(31147),
                a = n(86291),
                i = n(73738),
                l = n(65322);
            let o = {
                    963: {
                        highlightColor: i.A.ndlMotorsportsRed,
                        highlightTextColor: i.A.allWhite
                    },
                    "99x-electric": {
                        highlightColor: i.A.ndlFormulaE,
                        highlightTextColor: i.A.allWhite
                    },
                    "718-cayman-gt4-rs-cs": {
                        highlightColor: i.A.ndlCaymanBlue,
                        highlightTextColor: i.A.allWhite
                    },
                    "911-cup": {
                        highlightColor: i.A.ndlMotorsportsRed,
                        highlightTextColor: i.A.allWhite
                    },
                    "911-gt3-r": {
                        highlightColor: "#5D687A",
                        highlightTextColor: i.A.allWhite
                    }
                },
                s = new Map(Object.keys(o).map(e => [e.toLowerCase(), e]));

            function c(e) {
                var t;
                return e && null != (t = s.get(e.toLowerCase())) ? t : "963"
            }
            let d = {
                    963: a.y.car963,
                    "99x-electric": a.y.car99xElectric,
                    "911-gt3-r": a.y.car911GT3R,
                    "911-cup": a.y.car911Cup,
                    "718-cayman-gt4-rs-cs": a.y.car911Cup
                },
                u = r.g.findIndex(e => "cars" === e.sectionId);

            function m(e, t) {
                return e.filter(e => null != e).map(e => {
                    let n = d[c(e.theme)];
                    return t ? n.desktop : n.mobile
                })
            }
            let p = 16 / 9,
                g = 5;

            function h(e, t) {
                let n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                    r = 20 * !t;
                return {
                    initial: (!n || !e) && {
                        opacity: 0,
                        y: r
                    },
                    animate: {
                        opacity: +!!e,
                        y: e || t ? 0 : r
                    },
                    transition: {
                        duration: .6 * !t,
                        ease: l.m1,
                        delay: .1 * !t
                    }
                }
            }
        },
        56266: (e, t, n) => {
            n.d(t, {
                Sw: () => u,
                kr: () => m,
                mi: () => p,
                v1: () => x
            });
            var r = n(6029),
                a = n(55729),
                i = n(19315),
                l = n(62493),
                o = n(31147);
            let s = (0, a.createContext)(null),
                c = (0, a.createContext)(null),
                d = (0, a.createContext)(null),
                u = () => {
                    let e = (0, a.useContext)(c);
                    if (!e) throw Error("useScrollytellingActions must be used within ScrollytellingProvider");
                    return e
                };

            function m(e) {
                let t = (0, a.useContext)(d);
                if (!t) throw Error("useScrollytellingSelector must be used within ScrollytellingProvider");
                return (0, a.useSyncExternalStore)(t.subscribe, () => e(t.getSnapshot()), () => e(t.getSnapshot()))
            }

            function p() {
                let e = (0, a.useContext)(d);
                if (!e) throw Error("useScrollytellingGetState must be used within ScrollytellingProvider");
                return e.getSnapshot
            }
            let g = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
                h = e => g() ?.15 : null != e ? e : 1.2,
                f = () => {
                    let e = [],
                        t = globalThis.innerHeight;
                    return o.g.forEach((n, r) => {
                        let a = document.getElementById(n.sectionId);
                        if (!a) return;
                        let i = a.offsetTop,
                            l = a.offsetHeight - t;
                        n.waypoints.forEach((t, n) => {
                            let a = 0 === t.offset ? i : i + l * t.offset;
                            e.push({
                                value: Math.max(0, a),
                                sectionIndex: r,
                                waypointIndex: n,
                                snap: t.snap
                            })
                        })
                    }), e
                },
                x = e => {
                    let {
                        children: t
                    } = e, n = (0, i.xP)(), u = (0, a.useRef)(null), m = (0, a.useRef)([]), p = (0, a.useRef)(!1), x = (0, a.useRef)([]), v = (0, a.useRef)(null), [y, b] = (0, a.useState)({
                        sectionIndex: 0,
                        waypointIndex: 0
                    }), [w, C] = (0, a.useState)("free"), k = (0, a.useRef)({
                        position: {
                            sectionIndex: 0,
                            waypointIndex: 0
                        },
                        scrollMode: "free"
                    }), T = (0, a.useRef)(new Set), S = (0, a.useCallback)(() => {
                        for (let e of T.current) e()
                    }, []), I = (0, a.useCallback)(e => (T.current.add(e), () => {
                        T.current.delete(e)
                    }), []), j = (0, a.useCallback)(() => k.current, []), P = (0, a.useCallback)(e => {
                        let t = k.current.position,
                            n = "function" == typeof e ? e(t) : e;
                        t !== n && (t.sectionIndex !== n.sectionIndex || t.waypointIndex !== n.waypointIndex) && (k.current = { ...k.current,
                            position: n
                        }, S(), b(n))
                    }, [S]), E = (0, a.useCallback)(e => {
                        k.current.scrollMode !== e && (k.current = { ...k.current,
                            scrollMode: e
                        }, S(), C(e))
                    }, [S]), F = o.g[y.sectionIndex], D = (0, a.useCallback)(e => {
                        var t;
                        if (u.current) {
                            let t = ((e, t) => t.findIndex(t => t.sectionIndex === e.sectionIndex && t.waypointIndex === e.waypointIndex))(e, m.current);
                            if (-1 === t) return;
                            P(e), u.current.goTo(t);
                            return
                        }
                        let r = o.g[e.sectionIndex],
                            a = r.waypoints[e.waypointIndex],
                            i = document.getElementById(r.sectionId);
                        if (!i) return;
                        let l = i.offsetTop,
                            s = i.offsetHeight,
                            c = globalThis.innerHeight,
                            d = Math.max(0, 0 === a.offset ? l : l + (s - c) * a.offset);
                        if (10 > Math.abs(globalThis.scrollY - d)) return void P(e);
                        let p = h(null == (t = a.snap) ? void 0 : t.duration);
                        n ? (n.stop(), P(e), requestAnimationFrame(() => {
                            n.start(), n.scrollTo(d, {
                                duration: p
                            })
                        })) : (P(e), globalThis.scrollTo({
                            top: d,
                            behavior: "smooth"
                        }))
                    }, [n, P]), M = (0, a.useCallback)(e => {
                        let t = o.g.findIndex(t => t.sectionId === e);
                        t >= 0 && D({
                            sectionIndex: t,
                            waypointIndex: 0
                        })
                    }, [D]), R = (0, a.useCallback)(() => {
                        let e = k.current.position;
                        if (p.current) {
                            let n = e.sectionIndex + 1;
                            if (n < o.g.length) {
                                var t;
                                p.current = !1, null == (t = u.current) || t.start(), D({
                                    sectionIndex: n,
                                    waypointIndex: 0
                                })
                            }
                            return
                        }
                        if (u.current) return void u.current.next();
                        let n = (e => {
                            let t = o.g[e.sectionIndex];
                            return e.waypointIndex < t.waypoints.length - 1 ? {
                                sectionIndex: e.sectionIndex,
                                waypointIndex: e.waypointIndex + 1
                            } : e.sectionIndex < o.g.length - 1 ? {
                                sectionIndex: e.sectionIndex + 1,
                                waypointIndex: 0
                            } : null
                        })(e);
                        n && D(n)
                    }, [D]), A = (0, a.useCallback)(() => {
                        let e = k.current.position;
                        if (p.current) {
                            let n = e.sectionIndex - 1;
                            if (n >= 0) {
                                var t;
                                p.current = !1, null == (t = u.current) || t.start();
                                let e = o.g[n];
                                D({
                                    sectionIndex: n,
                                    waypointIndex: e.waypoints.length - 1
                                })
                            }
                            return
                        }
                        if (u.current) return void u.current.previous();
                        let n = (e => {
                            if (e.waypointIndex > 0) return {
                                sectionIndex: e.sectionIndex,
                                waypointIndex: e.waypointIndex - 1
                            };
                            let t = e.sectionIndex - 1;
                            return t >= 0 ? {
                                sectionIndex: t,
                                waypointIndex: o.g[t].waypoints.length - 1
                            } : null
                        })(e);
                        n && D(n)
                    }, [D]), H = (0, a.useCallback)(e => {
                        let t = o.g.findIndex(t => t.sectionId === e);
                        t >= 0 && P({
                            sectionIndex: t,
                            waypointIndex: 0
                        })
                    }, [P]);
                    (0, a.useEffect)(() => {
                        let e;
                        if ("section" !== w || !n || window.matchMedia("(pointer: coarse)").matches) return;
                        let t = {
                                lenis: n,
                                snapRef: u,
                                snapPointsRef: m,
                                freeScrollRangesRef: x,
                                isSnapSuspendedRef: p,
                                setPosition: P,
                                snapTimeoutRef: v
                            },
                            r = () => {
                                var n;
                                null == (n = u.current) || n.destroy(), null == e || e(), e = (e => {
                                    let {
                                        lenis: t,
                                        snapRef: n,
                                        snapPointsRef: r,
                                        freeScrollRangesRef: i,
                                        isSnapSuspendedRef: s,
                                        setPosition: c,
                                        snapTimeoutRef: d
                                    } = e;
                                    s.current = !1;
                                    let u = f();
                                    r.current = u, i.current = (() => {
                                        let e = [],
                                            t = globalThis.innerHeight;
                                        return o.g.forEach((n, r) => {
                                            var a;
                                            if (!n.freeScroll) return;
                                            let i = document.getElementById(n.sectionId);
                                            if (!i) return;
                                            let l = i.offsetTop,
                                                o = i.offsetHeight - t,
                                                s = n.waypoints.at(-1),
                                                c = l + o * (null != (a = null == s ? void 0 : s.offset) ? a : 1);
                                            e.push({
                                                sectionIndex: r,
                                                top: l,
                                                bottom: c
                                            })
                                        }), e
                                    })();
                                    let m = new l.A(t, {
                                        type: "lock",
                                        debounce: 0,
                                        duration: h(void 0),
                                        distanceThreshold: 99999,
                                        onSnapComplete: e => {
                                            let {
                                                value: t
                                            } = e;
                                            return ((e, t, n, r, i, l) => {
                                                var s;
                                                let c = ((e, t) => {
                                                    let n = t.find(t => 5 > Math.abs(t.value - e));
                                                    return n ? {
                                                        sectionIndex: n.sectionIndex,
                                                        waypointIndex: n.waypointIndex
                                                    } : null
                                                })(e, null != (s = t.current) ? s : []);
                                                c && ((0, a.startTransition)(() => i(e => e.sectionIndex === c.sectionIndex && e.waypointIndex === c.waypointIndex ? e : c)), o.g[c.sectionIndex].freeScroll ? (n.stop(), r.current = !0) : (n.stop(), null !== l.current && clearTimeout(l.current), l.current = setTimeout(() => {
                                                    l.current = null, r.current || n.start()
                                                }, 150)))
                                            })(t, r, m, s, c, d)
                                        }
                                    });
                                    return u.forEach(e => m.add(e.value)), ((e, t) => {
                                        let n = e.goTo.bind(e);
                                        e.goTo = r => {
                                            var a, i;
                                            let l = null == (a = t.current) ? void 0 : a[r];
                                            e.options.duration = h(null == l || null == (i = l.snap) ? void 0 : i.duration), (null == l ? void 0 : l.snap) ? (e.options.easing = g() ? void 0 : l.snap.easing, e.options.lerp = l.snap.lerp) : (e.options.easing = void 0, e.options.lerp = void 0), n(r)
                                        }
                                    })(m, r), n.current = m, t.on("scroll", e => {
                                        ((e, t, n, r, i) => {
                                            var l;
                                            let o = ((e, t) => t.find(t => e >= t.top - 5 && e <= t.bottom + 5))(t.scroll, null != (l = r.current) ? l : []);
                                            if (o) {
                                                n.current || (e.stop(), n.current = !0), (0, a.startTransition)(() => i(e => e.sectionIndex === o.sectionIndex && 0 === e.waypointIndex ? e : {
                                                    sectionIndex: o.sectionIndex,
                                                    waypointIndex: 0
                                                }));
                                                return
                                            }
                                            n.current && (n.current = !1, e.start())
                                        })(m, e, s, i, c)
                                    })
                                })(t)
                            };
                        r();
                        let i = (e => {
                                let t = globalThis.innerHeight,
                                    n = () => {
                                        let n = globalThis.innerHeight;
                                        150 > Math.abs(n - t) || (t = n, e())
                                    };
                                return globalThis.addEventListener("resize", n, {
                                    passive: !0
                                }), () => globalThis.removeEventListener("resize", n)
                            })(r),
                            {
                                cleanup: s,
                                layoutTimer: c
                            } = ((e, t) => {
                                var n, r, a;
                                let i = {
                                        current: void 0
                                    },
                                    l = () => {
                                        clearTimeout(i.current), i.current = window.setTimeout(() => {
                                            var n;
                                            ! function(e, t) {
                                                if (e.length !== t.length) return !1;
                                                for (let n = 0; n < e.length; n++)
                                                    if (Math.abs(e[n].value - t[n].value) >= 1) return !1;
                                                return !0
                                            }(f(), null != (n = t.current) ? n : []) && e()
                                        }, 200)
                                    },
                                    s = new ResizeObserver(l),
                                    c = new Set,
                                    d = () => {
                                        for (let e of o.g) {
                                            let t = document.getElementById(e.sectionId);
                                            !t || c.has(t) || (c.add(t), s.observe(t), l())
                                        }
                                    };
                                for (let e of o.g) {
                                    let t = document.getElementById(e.sectionId);
                                    t && s.observe(t)
                                }
                                d();
                                let u = new MutationObserver(d),
                                    m = null != (a = null == (n = document.getElementById(null == (r = o.g[0]) ? void 0 : r.sectionId)) ? void 0 : n.parentElement) ? a : document.body;
                                return u.observe(m, {
                                    childList: !0
                                }), {
                                    cleanup: () => {
                                        s.disconnect(), u.disconnect()
                                    },
                                    layoutTimer: i
                                }
                            })(r, m);
                        return () => {
                            var t;
                            i(), s(), clearTimeout(c.current), (e => {
                                null !== e.current && (clearTimeout(e.current), e.current = null)
                            })(v), null == e || e(), null == (t = u.current) || t.destroy(), u.current = null, m.current = [], x.current = [], p.current = !1
                        }
                    }, [w, n, P]);
                    let N = (0, a.useMemo)(() => ({
                            position: y,
                            scrollMode: w,
                            currentSection: F,
                            sections: o.g
                        }), [y, w, F]),
                        B = (0, a.useMemo)(() => ({
                            subscribe: I,
                            getSnapshot: j
                        }), [I, j]),
                        L = (0, a.useMemo)(() => ({
                            scrollToWaypoint: D,
                            scrollToSection: M,
                            scrollToNext: R,
                            scrollToPrevious: A,
                            resetSection: H,
                            setScrollMode: E
                        }), [D, M, R, A, H, E]);
                    return (0, r.jsx)(d.Provider, {
                        value: B,
                        children: (0, r.jsx)(s.Provider, {
                            value: N,
                            children: (0, r.jsx)(c.Provider, {
                                value: L,
                                children: t
                            })
                        })
                    })
                };
            x.displayName = "ScrollytellingProvider"
        },
        59467: (e, t, n) => {
            n.d(t, {
                A2: () => k,
                XT: () => j,
                f8: () => E,
                mY: () => T
            });
            var r = n(3082),
                a = n(40157),
                i = n(26084),
                l = n(59255),
                o = n(17497),
                s = n(46169),
                c = n(61833),
                d = n(30267),
                u = n(17801),
                m = n(80575),
                p = n(82889),
                g = n(59109),
                h = n(15700),
                f = n(66121),
                x = n(12482),
                v = n(54513);
            let y = "\n    fragment PageArticleFields on PageArticle {\n  ...PageArticleLinkToFields\n  aiGenerated\n  presentation\n  introductionCaption\n  introduction\n  introHeading\n  introColumn1\n  introColumn2\n  bodyText {\n    json\n    links {\n      entries {\n        block {\n          ...ComponentReferenceFields\n          ... on ModuleTitleAndDescription {\n            ...ModuleTitleAndDescriptionFields\n          }\n          ... on ModuleQuote {\n            ...ModuleQuoteFields\n          }\n          ... on ModuleImage {\n            ...ModuleImageFields\n          }\n          ... on ModuleSpacer {\n            ...ModuleSpacerFields\n          }\n          ... on ModuleAudioPlayer {\n            ...ModuleAudioPlayerFields\n          }\n          ... on ModuleVideo {\n            ...ModuleVideoFields\n          }\n          ... on ModuleCarTechSpecs {\n            ...ModuleCarTechSpecsFields\n          }\n        }\n        inline {\n          ...ComponentReferenceFields\n          ... on Microcopy {\n            ...MicrocopyFields\n          }\n          ... on ContentTag {\n            ...ContentTagFields\n          }\n        }\n        hyperlink {\n          ... on PageHomepage {\n            ...ComponentReferenceFields\n            sys {\n              locale\n            }\n          }\n          ... on PageSearch {\n            ...ComponentReferenceFields\n            sys {\n              locale\n            }\n          }\n          ... on PageArticle {\n            ...ComponentReferenceFields\n            sys {\n              locale\n            }\n            slug\n          }\n          ... on PageBasic {\n            ...ComponentReferenceFields\n            sys {\n              locale\n            }\n            slug\n          }\n          ... on PageCar {\n            ...ComponentReferenceFields\n            sys {\n              locale\n            }\n            slug\n          }\n          ... on PageCategory {\n            ...ComponentReferenceFields\n            sys {\n              locale\n            }\n            mainCategory\n          }\n          ... on PageDriver {\n            ...ComponentReferenceFields\n            sys {\n              locale\n            }\n            slug\n          }\n          ... on PageRaceSeries {\n            ...ComponentReferenceFields\n            sys {\n              locale\n            }\n            slug\n          }\n          ... on PageRaceEvent {\n            ...ComponentReferenceFields\n            sys {\n              locale\n            }\n            slug\n          }\n          ... on PageTeam {\n            ...ComponentReferenceFields\n            sys {\n              locale\n            }\n            slug\n          }\n        }\n      }\n    }\n  }\n  tagsCollection {\n    items {\n      ...ContentTagFields\n    }\n  }\n  modulesCollection(limit: 20) {\n    __typename\n    items {\n      __typename\n      ... on Entry {\n        sys {\n          id\n        }\n      }\n    }\n  }\n  partnerSet {\n    ...PartnerSetFields\n  }\n  seoMetaDescription\n  robotFollow\n  robotIndex\n}\n    ",
                b = "\n    query PageArticleCollection($locale: String!, $preview: Boolean, $slug: String!) {\n  pageArticleCollection(\n    limit: 1\n    locale: $locale\n    preview: $preview\n    where: {slug: $slug}\n  ) {\n    items {\n      ...PageArticleFields\n    }\n  }\n}\n    ".concat(y, "\n").concat(r.K7, "\n").concat(a.o, "\n").concat(i.P, "\n").concat(l.pQ, "\n").concat(o.NE, "\n").concat(s.QR, "\n").concat(r.ng, "\n").concat(c.k9, "\n").concat(d.lz, "\n").concat(u.St, "\n").concat(m.$D, "\n").concat(p.Mp, "\n").concat(g.c, "\n").concat(h.d1, "\n").concat(f.cz, "\n").concat(f.Uc),
                w = (e, t) => (0, x.I)({
                    queryKey: ["PageArticleCollection", e],
                    queryFn: (0, v.x8)(b, e),
                    ...t
                });
            w.getKey = e => ["PageArticleCollection", e], w.fetcher = (e, t) => (0, v.x8)(b, e, t);
            let C = "\n    query AllPageArticleCollection($locale: String!, $preview: Boolean, $limit: Int = 1, $skip: Int = 0) {\n  pages: pageArticleCollection(\n    limit: $limit\n    locale: $locale\n    preview: $preview\n    skip: $skip\n    order: customFirstPublishedDate_DESC\n    where: {slug_exists: true}\n  ) {\n    total\n    skip\n    limit\n    items {\n      ...PageArticleLinkToFields\n    }\n  }\n}\n    ".concat(r.K7, "\n").concat(a.o, "\n").concat(i.P),
                k = (e, t) => (0, x.I)({
                    queryKey: ["AllPageArticleCollection", e],
                    queryFn: (0, v.x8)(C, e),
                    ...t
                });
            k.getKey = e => ["AllPageArticleCollection", e], k.fetcher = (e, t) => (0, v.x8)(C, e, t);
            let T = "\n    query AllPageArticleCollectionByContentTag($locale: String!, $preview: Boolean, $limit: Int = 1, $skip: Int = 0, $tags: [String!]) {\n  pages: pageArticleCollection(\n    limit: $limit\n    locale: $locale\n    preview: $preview\n    skip: $skip\n    order: customFirstPublishedDate_DESC\n    where: {tags: {tagKey_in: $tags}, slug_exists: true}\n  ) {\n    total\n    skip\n    limit\n    items {\n      ...PageArticleLinkToFields\n    }\n  }\n}\n    ".concat(r.K7, "\n").concat(a.o, "\n").concat(i.P),
                S = (e, t) => (0, x.I)({
                    queryKey: ["AllPageArticleCollectionByContentTag", e],
                    queryFn: (0, v.x8)(T, e),
                    ...t
                });
            S.getKey = e => ["AllPageArticleCollectionByContentTag", e], S.fetcher = (e, t) => (0, v.x8)(T, e, t);
            let I = '\n    query PageArticle($locale: String!, $preview: Boolean, $id: String!) {\n  page: pageArticle(id: $id, locale: $locale, preview: $preview) {\n    ...PageArticleFields\n  }\n  microcopySetCollection(\n    locale: $locale\n    preview: $preview\n    where: {key_in: ["moduleAudioPlayer"]}\n  ) {\n    items {\n      ...MicrocopySetFields\n    }\n  }\n}\n    '.concat(y, "\n").concat(r.K7, "\n").concat(a.o, "\n").concat(i.P, "\n").concat(l.pQ, "\n").concat(o.NE, "\n").concat(s.QR, "\n").concat(r.ng, "\n").concat(c.k9, "\n").concat(d.lz, "\n").concat(u.St, "\n").concat(m.$D, "\n").concat(p.Mp, "\n").concat(g.c, "\n").concat(h.d1, "\n").concat(f.cz, "\n").concat(f.Uc, "\n").concat(h.Fd),
                j = (e, t) => (0, x.I)({
                    queryKey: ["PageArticle", e],
                    queryFn: (0, v.x8)(I, e),
                    ...t
                });
            j.getKey = e => ["PageArticle", e], j.fetcher = (e, t) => (0, v.x8)(I, e, t);
            let P = "\n    query LatestPageArticleByContentTags($tags: [String!]!, $locale: String!, $preview: Boolean, $limit: Int = 5) {\n  pageArticleCollection(\n    limit: $limit\n    locale: $locale\n    preview: $preview\n    where: {tags: {tagKey_in: $tags}}\n    order: customFirstPublishedDate_DESC\n  ) {\n    items {\n      ...ComponentReferenceFields\n      slug\n      title\n      introduction\n    }\n  }\n}\n    ".concat(a.o),
                E = (e, t) => (0, x.I)({
                    queryKey: ["LatestPageArticleByContentTags", e],
                    queryFn: (0, v.x8)(P, e),
                    ...t
                });
            E.getKey = e => ["LatestPageArticleByContentTags", e], E.fetcher = (e, t) => (0, v.x8)(P, e, t)
        },
        60630: (e, t, n) => {
            n.d(t, {
                T: () => ep
            });
            var r = n(6029),
                a = n(35854),
                i = n(67465),
                l = n(55729),
                o = n(56266),
                s = n(19315),
                c = n(96692);
            let d = (0, l.createContext)(null),
                u = e => {
                    let {
                        deltaX: t,
                        deltaY: n,
                        event: r
                    } = e, a = r.type.includes("touch");
                    for (let e of r.composedPath())
                        if (e instanceof HTMLElement && (void 0 !== e.dataset.lenisPrevent || a && void 0 !== e.dataset.lenisPreventTouch || void 0 !== e.dataset.lenisPreventHorizontal && Math.abs(t) > Math.abs(n))) return !1;
                    return !0
                },
                m = e => {
                    let {
                        children: t
                    } = e, n = (0, l.useRef)(null), {
                        prefersReducedMotion: a
                    } = (0, c.P2)();
                    (0, l.useEffect)(() => {
                        let e = history.scrollRestoration;
                        return history.scrollRestoration = "manual", window.scrollTo(0, 0), () => {
                            history.scrollRestoration = e
                        }
                    }, []);
                    let i = (0, l.useMemo)(() => ({
                            lenisRef: n
                        }), []),
                        o = (0, l.useMemo)(() => a ? {
                            autoRaf: !0,
                            lerp: 1,
                            smoothWheel: !1,
                            syncTouch: !1,
                            virtualScroll: u
                        } : {
                            autoRaf: !0,
                            lerp: .1,
                            syncTouch: !0,
                            touchMultiplier: 1.6,
                            wheelMultiplier: 1.8,
                            virtualScroll: u
                        }, [a]);
                    return (0, r.jsx)(d.Provider, {
                        value: i,
                        children: (0, r.jsx)(s.FH, {
                            ref: n,
                            root: !0,
                            options: o,
                            children: t
                        })
                    })
                };
            m.displayName = "LenisProvider";
            var p = n(71024),
                g = n.n(p),
                h = n(95669),
                f = n.n(h),
                x = n(25653),
                v = n(63504),
                y = n(72813),
                b = n(91753),
                w = n(31147),
                C = n(63560),
                k = n(86291),
                T = n(24561),
                S = n(11020),
                I = n(93066),
                j = n(48788),
                P = n(72744);
            let E = (0, l.memo)(e => {
                let {
                    children: t,
                    isDashboardOpen: n,
                    ...a
                } = e, {
                    prefersReducedMotion: i
                } = (0, c.P2)(), {
                    isDesktopMd: o
                } = (0, c.uS)(), s = (0, l.useRef)(null), d = (0, l.useMemo)(() => i ? {
                    visible: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 0
                        }
                    },
                    hidden: {
                        y: 0,
                        opacity: 0,
                        transition: {
                            duration: 0
                        }
                    }
                } : o ? {
                    visible: {
                        y: 0,
                        filter: "blur(0px)",
                        transition: {
                            duration: 1,
                            ease: j.Jr,
                            delay: .33
                        }
                    },
                    hidden: {
                        y: "50vh",
                        filter: "blur(10px)",
                        transition: {
                            duration: 1,
                            ease: j.Jr
                        }
                    }
                } : {
                    visible: {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        transition: {
                            duration: 1,
                            ease: j.Jr,
                            delay: .33
                        }
                    },
                    hidden: {
                        y: "50vh",
                        opacity: 0,
                        scale: .97,
                        transition: {
                            duration: 1,
                            ease: j.Jr
                        }
                    }
                }, [i, o]), u = o ? "transform, filter" : "transform, opacity", m = (0, l.useCallback)(() => {
                    !i && s.current && (s.current.style.willChange = u)
                }, [i, u]), p = (0, l.useCallback)(() => {
                    s.current && (s.current.style.willChange = "auto")
                }, []);
                return (0, r.jsx)(b.e, { ...a,
                    ref: s,
                    variants: d,
                    animate: n ? "hidden" : "visible",
                    onAnimationStart: m,
                    onAnimationComplete: p,
                    children: (0, r.jsx)(P.X, {
                        size: "headerXL",
                        fontSize: {
                            base: "desktopHeadingXLarge",
                            md: "ndlDesktopHeaderXl"
                        },
                        color: "allWhite",
                        as: "h1",
                        whiteSpace: {
                            base: "normal",
                            md: "break-spaces"
                        },
                        sx: {
                            textWrap: "balance"
                        },
                        children: t
                    })
                })
            });
            E.displayName = "GarageTitle";
            var F = n(8588),
                D = n(6937);
            let M = {
                    desktop: "/homepage/garage/garage-poster.png",
                    mobile: "/homepage/garage/garage-mobile-poster.png"
                },
                R = e => {
                    let {
                        onDecoded: t
                    } = e, n = (0, l.useRef)(null), a = (0, l.useRef)(!1), {
                        props: {
                            srcSet: i
                        }
                    } = (0, F.getImageProps)({
                        alt: "",
                        fill: !0,
                        sizes: "100vw",
                        priority: !0,
                        style: {
                            objectFit: "cover",
                            objectPosition: "center"
                        },
                        src: M.desktop
                    }), {
                        props: o
                    } = (0, F.getImageProps)({
                        alt: "",
                        fill: !0,
                        sizes: "100vw",
                        priority: !0,
                        style: {
                            objectFit: "cover",
                            objectPosition: "center"
                        },
                        src: M.mobile
                    });
                    return (0, l.useEffect)(() => {
                        let e = n.current;
                        if (!e || a.current) return;
                        let r = () => {
                            a.current || (a.current = !0, null == t || t())
                        };
                        return e.complete && e.naturalWidth > 0 ? void r() : "function" == typeof e.decode ? void e.decode().then(r).catch(r) : (e.addEventListener("load", r, {
                            once: !0
                        }), () => e.removeEventListener("load", r))
                    }, [t]), (0, r.jsxs)("picture", {
                        children: [(0, r.jsx)("source", {
                            media: "(min-width: ".concat(D.A.l, ")"),
                            srcSet: i,
                            sizes: "100vw"
                        }), (0, r.jsx)("img", {
                            ref: n,
                            ...o
                        })]
                    })
                };
            R.displayName = "GaragePoster";
            var A = n(20207),
                H = n(85147);
            let N = g()(() => n.e(1812).then(n.bind(n, 41812)).then(e => ({
                    default: e.DashboardWidgetLauncher
                })), {
                    loadableGenerated: {
                        webpack: () => [41812]
                    },
                    ssr: !1,
                    loading: () => (0, r.jsx)(y.a, {
                        w: {
                            base: "95px",
                            ndlDashboardGrid: "125px"
                        },
                        h: {
                            base: "95px",
                            ndlDashboardGrid: "125px"
                        }
                    })
                }),
                B = w.Z.garage,
                L = {
                    from: 0,
                    to: 3
                },
                U = {
                    height: "".concat(600, "vh")
                },
                $ = {
                    height: "100svh"
                },
                G = e => {
                    let {
                        title: t,
                        onHeroReady: n,
                        loaderActive: a
                    } = e, i = (0, C.N)(k.y.garage), o = (0, I.GC)(), {
                        prefersReducedMotion: d
                    } = (0, c.P2)(), u = (0, l.useRef)(null), m = (0, l.useRef)(!1), [p, g] = (0, l.useState)(!0), [h, f] = (0, l.useState)(!1), [w, j] = (0, l.useState)(!1);
                    (0, l.useEffect)(() => {
                        if (d) return;
                        if (a) return void j(!0);
                        let e = setTimeout(() => j(!0), 500);
                        return () => clearTimeout(e)
                    }, [d, a]), (0, l.useEffect)(() => {
                        if (!p || d) return;
                        let e = setInterval(() => {
                            var e;
                            (null == (e = u.current) ? void 0 : e.hasRenderedFrame()) && g(!1)
                        }, 250);
                        return () => clearInterval(e)
                    }, [p, d]);
                    let P = (0, l.useRef)(!1);
                    P.current = h, (0, l.useEffect)(() => {
                        if (o) f(!0);
                        else if (P.current) {
                            let e = setTimeout(() => f(!1), 1330);
                            return () => clearTimeout(e)
                        }
                    }, [o]);
                    let F = (0, l.useRef)(null),
                        D = (0, l.useRef)(0),
                        M = (0, l.useRef)(null),
                        G = (0, l.useRef)(0),
                        z = (0, l.useRef)(null),
                        W = (0, l.useRef)(void 0),
                        {
                            scrollYProgress: _
                        } = (0, x.L)({
                            target: F,
                            offset: ["start start", "end end"]
                        }),
                        O = (0, v.G)(_, [0, .1], [0, 100]),
                        q = (0, v.G)(_, [0, .1], [1, 0]),
                        K = (0, v.G)(_, [0, .1], [.7, 0]),
                        Y = (0, v.G)(_, [0, 1], [0, 1]),
                        V = (0, l.useCallback)(e => {
                            z.current = Math.min(Math.max(e, 0), 5), void 0 === W.current && (W.current = requestAnimationFrame(() => {
                                var e;
                                let t = z.current;
                                null !== t && (null == (e = u.current) ? void 0 : e.isReady()) && u.current.seekToTime(t), W.current = void 0
                            }))
                        }, []),
                        J = (0, l.useCallback)(e => {
                            let t, n = Math.min(e, 1),
                                r = u.current;
                            if (null == r ? void 0 : r.isReady()) {
                                if (n < .01) {
                                    M.current = null, r.startLoop(L), D.current = n;
                                    return
                                }
                                if (r.stopLoop(), n > D.current) M.current = null, t = 3 + 2 * n;
                                else {
                                    var a;
                                    let e = null != (a = r.getCurrentTime()) ? a : 0;
                                    null === M.current && (M.current = e, G.current = n);
                                    let i = M.current,
                                        l = G.current;
                                    t = 3 + (i - 3) * (l > 0 ? n / l : 0)
                                }
                                V(t), D.current = n
                            }
                        }, [V]),
                        Q = (0, l.useCallback)(() => {
                            let e = Math.min(Y.get(), 1),
                                t = u.current;
                            (null == t ? void 0 : t.isReady()) && !(e < .01) && (t.stopLoop(), M.current = null, D.current = e, V(3 + 2 * e))
                        }, [Y, V]);
                    (0, l.useEffect)(() => {
                        if (d) return;
                        let e = Y.on("change", J);
                        return () => {
                            e(), void 0 !== W.current && (cancelAnimationFrame(W.current), W.current = void 0)
                        }
                    }, [Y, J, d]);
                    let X = o || h,
                        [Z, ee] = (0, l.useState)(!1),
                        et = (0, l.useRef)(!1);
                    (0, l.useEffect)(() => {
                        if (!d) return _.on("change", e => {
                            let t = e > .01;
                            t !== et.current && (et.current = t, ee(t))
                        })
                    }, [_, d]);
                    let [en, er] = (0, l.useState)(!0);
                    (0, l.useEffect)(() => {
                        let e = F.current;
                        if (!e) return;
                        let t = new IntersectionObserver(e => {
                            let [t] = e;
                            return er(t.isIntersecting)
                        }, {
                            rootMargin: "100px"
                        });
                        return t.observe(e), () => t.disconnect()
                    }, []);
                    let ea = (0, s.xP)(),
                        ei = (0, l.useRef)(ea);
                    ei.current = ea, (0, l.useEffect)(() => {
                        let e = F.current;
                        if (!e) return;
                        let t = t => {
                            let n = t.relatedTarget;
                            if (n && e.contains(n)) return;
                            let r = e.getBoundingClientRect().top + window.scrollY,
                                a = r + window.innerHeight;
                            if (window.scrollY <= a) return;
                            let i = ei.current;
                            if (i) {
                                i.scrollTo(r, {
                                    immediate: !0
                                });
                                let e = i.on("scroll", () => {
                                    e(), Math.abs(i.scroll - r) > 5 && i.scrollTo(r, {
                                        immediate: !0
                                    })
                                });
                                setTimeout(() => e(), 300)
                            }
                        };
                        return e.addEventListener("focusin", t), () => e.removeEventListener("focusin", t)
                    }, []);
                    let el = d ? {
                        willChange: "auto"
                    } : {
                        y: O,
                        opacity: q,
                        willChange: en ? "transform, opacity" : "auto"
                    };
                    return (0, r.jsx)(y.a, {
                        as: "section",
                        "aria-label": "Garage",
                        id: B,
                        ref: F,
                        position: "relative",
                        sx: U,
                        children: (0, r.jsxs)(y.a, {
                            position: X ? "relative" : "sticky",
                            top: "0",
                            width: "full",
                            overflow: "hidden",
                            sx: $,
                            children: [(0, r.jsx)(y.a, {
                                position: "absolute",
                                inset: "0",
                                zIndex: 0,
                                pointerEvents: "none",
                                style: {
                                    opacity: +!!p,
                                    transition: "opacity ".concat(500, "ms ease")
                                },
                                "aria-hidden": "true",
                                children: (0, r.jsx)(R, {})
                            }), (0, r.jsx)(H.b, {
                                ref: u,
                                sources: i,
                                load: w ? "auto" : "none",
                                loadMode: "full",
                                initialLoop: L,
                                onFirstFrame: () => {
                                    g(!1), Q(), m.current || (m.current = !0, null == n || n())
                                },
                                zIndex: -1,
                                bg: "porscheBlack"
                            }), (0, r.jsx)(b.e, {
                                position: "absolute",
                                bottom: "0",
                                left: "0",
                                width: "100%",
                                height: "50%",
                                bgGradient: "linear-gradient(to bottom, transparent, porscheBlack)",
                                zIndex: 0,
                                "aria-hidden": "true",
                                style: d ? {
                                    opacity: .7
                                } : {
                                    opacity: K
                                }
                            }), (0, r.jsx)(S.L, {
                                children: (0, r.jsx)(b.e, {
                                    position: "absolute",
                                    left: "0",
                                    right: "0",
                                    bottom: "0",
                                    pt: 12,
                                    pb: {
                                        base: A.v,
                                        md: 20
                                    },
                                    zIndex: 1500,
                                    pointerEvents: "none",
                                    style: el,
                                    children: (0, r.jsxs)(T.H, {
                                        position: "relative",
                                        pb: {
                                            base: 4,
                                            l: 0
                                        },
                                        sx: A.l,
                                        children: [(0, r.jsx)(N, {
                                            heroHasVideoAsset: !1,
                                            bottom: 0,
                                            right: {
                                                base: "auto",
                                                ndlDashboardGrid: 10
                                            },
                                            pointerEvents: Z ? "none" : "auto"
                                        }), (0, r.jsx)(E, {
                                            isDashboardOpen: null != o && o,
                                            children: t
                                        })]
                                    })
                                })
                            })]
                        })
                    })
                };
            G.displayName = "GarageSection";
            let z = e => {
                let {
                    id: t,
                    height: n,
                    mt: a
                } = e;
                return (0, r.jsx)(y.a, {
                    id: t,
                    position: "relative",
                    height: n,
                    marginTop: a,
                    "aria-hidden": "true"
                })
            };
            z.displayName = "SectionPlaceholder";
            var W = n(81278),
                _ = n(80321);
            let O = {
                    [w.Z.garage]: _.B7.garageSection,
                    [w.Z.history]: _.B7.historySection,
                    [w.Z.cars]: _.B7.carsSection,
                    [w.Z.teams]: _.B7.teamsSection,
                    [w.Z.news]: _.B7.newsSection,
                    [w.Z.footer]: _.B7.footer
                },
                q = (e, t) => {
                    var n, r;
                    let a = null != (n = O[e]) ? n : e,
                        i = w.g.findIndex(t => t.sectionId === e);
                    (0, _.yn)({
                        eventAction: _.wT.moduleEnterViewport,
                        locale: t.locale,
                        pageExperience: {
                            pageCategory: t.pageType,
                            sectionName: a,
                            contentTags: null != (r = t.pageContentTags) ? r : []
                        },
                        context: {
                            moduleName: a,
                            modulePosition: i
                        },
                        componentDisplay: {
                            displayElementType: a,
                            displayElementId: t.pageId,
                            displayElementName: "".concat(t.pageId, "|").concat(a)
                        }
                    })
                },
                K = () => ((() => {
                    let {
                        locale: e
                    } = (0, W.useRouter)(), {
                        state: {
                            pageType: t,
                            pageId: n,
                            pageContentTags: r
                        }
                    } = (0, I.CU)(), a = (0, l.useRef)({
                        locale: e,
                        pageType: t,
                        pageId: n,
                        pageContentTags: r
                    });
                    a.current = {
                        locale: e,
                        pageType: t,
                        pageId: n,
                        pageContentTags: r
                    };
                    let i = (0, l.useRef)(new Set);
                    (0, l.useEffect)(() => {
                        var e, t, n;
                        if (!("IntersectionObserver" in window)) return;
                        let r = i.current,
                            l = new IntersectionObserver(e => ((e, t, n) => {
                                for (let r of e) {
                                    if (!r.isIntersecting) continue;
                                    let e = r.target.id;
                                    t.has(e) || (t.add(e), q(e, n))
                                }
                            })(e, r, a.current), {
                                rootMargin: "-45% 0px -45% 0px",
                                threshold: 0
                            }),
                            o = new Set,
                            s = () => ((e, t) => {
                                for (let n of w.g) {
                                    let r = document.getElementById(n.sectionId);
                                    r && !t.has(r) && (t.add(r), e.observe(r))
                                }
                            })(l, o);
                        s();
                        let c = null != (n = null == (e = document.getElementById(null == (t = w.g[0]) ? void 0 : t.sectionId)) ? void 0 : e.parentElement) ? n : document.body,
                            d = new MutationObserver(s);
                        return d.observe(c, {
                            childList: !0
                        }), () => {
                            l.disconnect(), d.disconnect()
                        }
                    }, [])
                })(), null);
            var Y = n(21593),
                V = n(62518),
                J = n(65322);
            let Q = () => {
                let {
                    isMobileLandscape: e
                } = (0, c.uS)();
                return (0, r.jsx)(V.A, {
                    enabled: e,
                    children: (0, r.jsx)(Y.N, {
                        children: e && (0, r.jsxs)(b.e, {
                            as: "output",
                            "data-lenis-prevent": !0,
                            position: "fixed",
                            inset: 0,
                            zIndex: 2100,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            gap: 3,
                            px: 10,
                            bg: "porscheBlack",
                            color: "allWhite",
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1,
                                transition: {
                                    duration: .3,
                                    ease: J.SP
                                }
                            },
                            exit: {
                                opacity: 0,
                                transition: {
                                    duration: .2,
                                    ease: J.YD
                                }
                            },
                            children: [(0, r.jsx)(P.X, {
                                size: "headerM",
                                as: "p",
                                color: "allWhite",
                                children: "Please rotate your device"
                            }), (0, r.jsx)(y.a, {
                                as: "p",
                                opacity: .7,
                                sx: {
                                    textWrap: "pretty"
                                },
                                children: "This experience is designed for portrait."
                            })]
                        })
                    })
                })
            };
            Q.displayName = "RotateDeviceOverlay";
            var X = n(649),
                Z = n(49360),
                ee = n(34675),
                et = n(85007),
                en = n(62015);
            let er = e => {
                let {
                    heroReady: t,
                    initialCarReady: n,
                    onDone: a,
                    carsSectionCarsCollection: i
                } = e, {
                    prefersReducedMotion: o
                } = (0, c.P2)(), {
                    isDesktopL: s
                } = (0, c.uS)(), {
                    lenisRef: u
                } = (() => {
                    let e = (0, l.useContext)(d);
                    if (!e) throw Error("useLenisContext must be used within LenisProvider");
                    return e
                })(), m = (0, et.r)(), [p, g] = (0, l.useState)(!0), [h, f] = (0, l.useState)(!1), [x, v] = (0, l.useState)(!1);
                return (0, l.useEffect)(() => {
                    var e, t;
                    null == (t = u.current) || null == (e = t.lenis) || e.stop()
                }, [u]), (0, l.useEffect)(() => {
                    if (!p) {
                        var e, t;
                        null == (t = u.current) || null == (e = t.lenis) || e.start()
                    }
                }, [p, u]), (0, l.useEffect)(() => {
                    o && g(!1)
                }, [o]), (0, l.useEffect)(() => {
                    let e = setTimeout(() => f(!0), X.LR),
                        t = setTimeout(() => v(!0), X.ks);
                    return () => {
                        clearTimeout(e), clearTimeout(t)
                    }
                }, []), (0, l.useEffect)(() => {
                    var e, t;
                    if (null === m) return;
                    let n = (null != (e = null == i ? void 0 : i.items) ? e : []).filter(e => null != e)[0];
                    if (!n) return;
                    let [r] = (0, Z.ow)([n], s), a = "video" === m ? null == r ? void 0 : r.mp4 : null != (t = null == r ? void 0 : r.fsv) ? t : null == r ? void 0 : r.mp4;
                    if (!a) return;
                    let l = navigator.connection;
                    null != l && l.saveData || (0, ee.X)(a)
                }, [i, s, m]), (0, l.useEffect)(() => {
                    p && (x && t || t && n && h) && g(!1)
                }, [p, x, t, n, h]), (0, r.jsxs)(r.Fragment, {
                    children: [(0, r.jsx)("noscript", {
                        children: (0, r.jsx)("style", {
                            children: "#homepage-loader{display:none}"
                        })
                    }), (0, r.jsx)(V.A, {
                        enabled: p,
                        children: (0, r.jsx)(Y.N, {
                            onExitComplete: a,
                            children: p && (0, r.jsx)(b.e, {
                                id: "homepage-loader",
                                role: "status",
                                "aria-label": "Loading",
                                "data-lenis-prevent": !0,
                                position: "fixed",
                                inset: 0,
                                zIndex: 2200,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bg: "porscheBlack",
                                initial: !1,
                                style: o ? void 0 : {
                                    clipPath: "inset(0 0 0% 0)"
                                },
                                exit: o ? {
                                    opacity: 0,
                                    transition: {
                                        duration: .3,
                                        ease: J.xQ
                                    }
                                } : {
                                    clipPath: "inset(0 0 100% 0)",
                                    transition: {
                                        duration: X.Ql / 1e3,
                                        ease: J.MY,
                                        delay: (X.Og - 100) / 1e3
                                    }
                                },
                                children: !o && (0, r.jsx)(b.e, {
                                    exit: {
                                        opacity: 0,
                                        transition: {
                                            duration: X.Og / 1e3,
                                            ease: J.xQ
                                        }
                                    },
                                    children: (0, r.jsx)(en.f, {
                                        size: X.ie,
                                        speed: X.Ap
                                    })
                                })
                            })
                        })
                    })]
                })
            };

            function ea() {
                let e = window.innerHeight,
                    t = window.scrollY,
                    n = [];
                for (let r of w.g) {
                    let a = document.getElementById(r.sectionId);
                    if (!a) continue;
                    let i = a.getBoundingClientRect();
                    n.push({
                        sectionId: r.sectionId,
                        top: i.top + t,
                        range: Math.max(1, a.offsetHeight - e)
                    })
                }
                return n
            }
            er.displayName = "HomepageLoader";
            let ei = () => (! function() {
                let e = (0, s.xP)();
                (0, l.useEffect)(() => {
                    let t, n = {
                            anchor: null,
                            lastInnerWidth: window.innerWidth,
                            lastInnerHeight: window.innerHeight,
                            lastScrollHeight: document.documentElement.scrollHeight,
                            restoring: !1,
                            turbulentUntil: 0,
                            reflowUntil: 0
                        },
                        r = () => {
                            t = void 0, n.restoring || performance.now() < n.turbulentUntil || (n.anchor = function() {
                                let e = ea(),
                                    t = window.scrollY,
                                    n = null;
                                for (let r of e) r.top <= t + 1 && (n = r);
                                return n ? {
                                    sectionId: n.sectionId,
                                    progress: (t - n.top) / n.range
                                } : null
                            }(), n.lastInnerWidth = window.innerWidth, n.lastInnerHeight = window.innerHeight, n.lastScrollHeight = document.documentElement.scrollHeight)
                        },
                        a = () => {
                            void 0 === t && (t = requestAnimationFrame(r))
                        },
                        i = () => (function(e, t) {
                            let n = window.innerWidth !== e.lastInnerWidth,
                                r = n || window.innerHeight !== e.lastInnerHeight,
                                a = document.documentElement.scrollHeight !== e.lastScrollHeight;
                            if (!r && !a || (r && (e.reflowUntil = performance.now() + 350), (n || a) && (e.turbulentUntil = performance.now() + 350), e.lastInnerWidth = window.innerWidth, e.lastInnerHeight = window.innerHeight, e.lastScrollHeight = document.documentElement.scrollHeight, !a || !r && performance.now() >= e.reflowUntil || !e.anchor)) return;
                            let i = function(e) {
                                let t = ea(),
                                    n = t.findIndex(t => t.sectionId === e.sectionId);
                                if (-1 === n) return null;
                                let r = t[n],
                                    a = t[n + 1],
                                    i = a ? Math.max(r.top, a.top - 1) : document.documentElement.scrollHeight - window.innerHeight,
                                    l = r.top + e.progress * r.range;
                                return Math.max(0, Math.max(r.top, Math.min(l, i)))
                            }(e.anchor);
                            !(null === i || 2 > Math.abs(i - window.scrollY)) && (e.restoring = !0, t ? t.scrollTo(i, {
                                immediate: !0,
                                force: !0
                            }) : window.scrollTo({
                                top: i,
                                behavior: "instant"
                            }), requestAnimationFrame(() => {
                                e.restoring = !1
                            }))
                        })(n, e),
                        l = document.documentElement.style.overflowAnchor;
                    document.documentElement.style.overflowAnchor = "none";
                    let o = new ResizeObserver(i);
                    return o.observe(document.body), r(), window.addEventListener("scroll", a, {
                        passive: !0
                    }), window.addEventListener("resize", i, {
                        passive: !0
                    }), () => {
                        void 0 !== t && cancelAnimationFrame(t), o.disconnect(), document.documentElement.style.overflowAnchor = l, window.removeEventListener("scroll", a), window.removeEventListener("resize", i)
                    }
                }, [e])
            }(), null);
            ei.displayName = "ResizeScrollAnchor";
            var el = n(73738);
            let eo = g()(() => Promise.all([n.e(4820), n.e(9074), n.e(3382), n.e(1250), n.e(7916)]).then(n.bind(n, 27916)).then(e => e.HistorySection), {
                    loadableGenerated: {
                        webpack: () => [27916]
                    },
                    loading: () => (0, r.jsx)(z, {
                        id: "history",
                        height: "300vh"
                    })
                }),
                es = g()(() => Promise.all([n.e(4820), n.e(9074), n.e(3382), n.e(9929)]).then(n.bind(n, 79929)).then(e => e.CarsSection), {
                    loadableGenerated: {
                        webpack: () => [79929]
                    },
                    loading: () => (0, r.jsx)(z, {
                        id: "cars",
                        height: "100vh"
                    })
                }),
                ec = g()(() => Promise.all([n.e(4820), n.e(9074), n.e(6442)]).then(n.bind(n, 56442)).then(e => e.TeamsSection), {
                    loadableGenerated: {
                        webpack: () => [56442]
                    },
                    loading: () => (0, r.jsx)(z, {
                        id: "teams",
                        height: "200vh"
                    })
                }),
                ed = g()(() => n.e(3933).then(n.bind(n, 13933)).then(e => e.NewsSection), {
                    loadableGenerated: {
                        webpack: () => [13933]
                    },
                    loading: () => (0, r.jsx)(z, {
                        id: "news",
                        height: "100vh",
                        mt: "-50vh"
                    })
                }),
                eu = () => null,
                em = e => {
                    let {
                        newsPages: t,
                        title: n,
                        historySectionTitle: a,
                        historySectionTitle2: i,
                        historySectionDescription: s,
                        historySectionContent: d,
                        carsSectionCarsCollection: u,
                        carsSectionSeriesTitle: p,
                        carsSectionNextEventTitle: g,
                        carsSectionLatestNewsTitle: h,
                        carsSectionLabelNoSeries: x,
                        carsSectionLabelNoNewsEvents: v,
                        teamSectionTitle: y,
                        teamSectionTitle2: b,
                        teamsCollection: w,
                        newsSectionTitle: C,
                        newsSectionTitle2: k,
                        newsSectionCarouselItemsCollection: T
                    } = e, [S, I] = (0, l.useState)(!1), [j, P] = (0, l.useState)(!1), [E, F] = (0, l.useState)(!1);
                    return (0, r.jsxs)(r.Fragment, {
                        children: [(0, r.jsx)(f(), {
                            children: (0, r.jsx)("style", {
                                children: "body{background-color:".concat(el.A.porscheBlack, " !important}")
                            })
                        }), (0, r.jsx)(c.EO, {
                            children: (0, r.jsx)(m, {
                                children: (0, r.jsxs)(o.v1, {
                                    children: [(0, r.jsx)(er, {
                                        heroReady: S,
                                        initialCarReady: j,
                                        onDone: () => F(!0),
                                        carsSectionCarsCollection: u
                                    }), (0, r.jsx)(eu, {}), (0, r.jsx)(K, {}), (0, r.jsx)(ei, {}), (0, r.jsx)(Q, {}), (0, r.jsx)(G, {
                                        title: n,
                                        onHeroReady: () => I(!0),
                                        loaderActive: !E
                                    }), (0, r.jsx)(eo, {
                                        historySectionTitle: a,
                                        historySectionTitle2: i,
                                        historySectionContent: d,
                                        historySectionDescription: s
                                    }), (0, r.jsx)(es, {
                                        carsSectionCarsCollection: u,
                                        carsSectionSeriesTitle: p,
                                        carsSectionLabelNoSeries: x,
                                        carsSectionNextEventTitle: g,
                                        carsSectionLatestNewsTitle: h,
                                        carsSectionLabelNoNewsEvents: v,
                                        loaderActive: !E,
                                        onInitialCarReady: () => P(!0)
                                    }), (0, r.jsx)(ec, {
                                        teamSectionTitle: y,
                                        teamSectionTitle2: b,
                                        teamsCollection: w
                                    }), (0, r.jsx)(ed, {
                                        newsSectionTitle: C,
                                        newsSectionTitle2: k,
                                        newsSectionCarouselItemsCollection: T,
                                        newsPages: t
                                    })]
                                })
                            })
                        })]
                    })
                },
                ep = e => {
                    var t, n;
                    let {
                        id: l,
                        locale: o,
                        preview: s
                    } = e, {
                        data: c,
                        isLoading: d
                    } = (0, i.i)({
                        id: l,
                        locale: o,
                        preview: s
                    }), u = (0, a.qM)(null == c ? void 0 : c.page, {
                        locale: o
                    });
                    return d || !u ? null : (0, r.jsx)(em, { ...u,
                        newsPages: null != (n = null == c || null == (t = c.page) ? void 0 : t.newsPages) ? n : null
                    })
                }
        },
        62015: (e, t, n) => {
            n.d(t, {
                f: () => c
            });
            var r = n(6029),
                a = n(55729),
                i = n(72813);
            let l = JSON.parse('{"v":"5.12.1","fr":60,"ip":0,"op":45,"w":3840,"h":2160,"nm":"Loading_Animation","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"1","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":-0.999,"s":[0]},{"i":{"x":[0.833],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":9.001,"s":[100]},{"t":20.00078125,"s":[0]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[1128.234,1081.156,0],"ix":2,"l":2},"a":{"a":0,"k":[-9.429,0.005,0],"ix":1,"l":2},"s":{"a":0,"k":[1125,1125,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-9.429,53.148],[-4.909,53.143],[8.431,-53.137],[3.841,-53.132]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Fill 23","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":-1.2,"op":20,"st":-28.8,"ct":1,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"2","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":5,"s":[0]},{"i":{"x":[0.833],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":15,"s":[100]},{"t":25.999609375,"s":[0]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[1322.297,1081.156,0],"ix":2,"l":2},"a":{"a":0,"k":[-12.179,0.003,0],"ix":1,"l":2},"s":{"a":0,"k":[1125,1125,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-12.179,53.143],[-2.659,53.143],[10.931,-53.137],[1.341,-53.137]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Fill 23","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":5.2,"op":26.4,"st":-17.6,"ct":1,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"3","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":12,"s":[0]},{"i":{"x":[0.833],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":22,"s":[100]},{"t":33.000390625,"s":[0]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[1576.632,1081.156,0],"ix":2,"l":2},"a":{"a":0,"k":[-12.795,0.003,0],"ix":1,"l":2},"s":{"a":0,"k":[1125,1125,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-12.795,53.143],[-0.685,53.143],[12.295,-53.137],[0.115,-53.137]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Fill 19","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":11.6,"op":32.8,"st":-6.4,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"4","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":18.001,"s":[0]},{"i":{"x":[0.833],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":28.001,"s":[100]},{"t":39.00078125,"s":[0]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[1892.643,1081.156,0],"ix":2,"l":2},"a":{"a":0,"k":[-16.393,0.003,0],"ix":1,"l":2},"s":{"a":0,"k":[1125,1125,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-16.393,53.143],[3.487,53.143],[16.397,-53.137],[-3.563,-53.137]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Fill 21","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":18,"op":39.2,"st":7.2,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"5","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":24,"s":[0]},{"i":{"x":[0.833],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":34,"s":[100]},{"t":46,"s":[0]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[2297.643,1081.156,0],"ix":2,"l":2},"a":{"a":0,"k":[-16.393,0.003,0],"ix":1,"l":2},"s":{"a":0,"k":[1125,1125,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-16.393,53.143],[13.487,53.143],[26.397,-53.137],[-3.563,-53.137]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Fill 21","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":24.4,"op":45.6,"st":16,"ct":1,"bm":0}],"markers":[],"props":{}}'),
                o = null;

            function s() {
                return null != o || (o = n.e(3136).then(n.t.bind(n, 17829, 23)).then(e => e.default)), o
            }
            s();
            let c = e => {
                let {
                    size: t,
                    speed: n = 1,
                    static: o = !1,
                    sx: c
                } = e, d = (0, a.useRef)(null), u = (0, a.useRef)(null), [m, p] = (0, a.useState)(!1);
                return (0, a.useEffect)(() => {
                    let e = !1;
                    return s().then(t => {
                        !e && d.current && (u.current = function(e, t, n, r, a) {
                            let i = n.loadAnimation({
                                container: e,
                                animationData: t,
                                renderer: "svg",
                                loop: !r,
                                autoplay: !r,
                                rendererSettings: {
                                    progressiveLoad: !1,
                                    preserveAspectRatio: "xMidYMid meet",
                                    className: "loader-lottie-svg"
                                }
                            });
                            return r ? i.goToAndStop(30, !0) : 1 !== a && i.setSpeed(a), i
                        }(d.current, l, t, o, n), p(!0))
                    }), () => {
                        var t;
                        e = !0, null == (t = u.current) || t.destroy(), u.current = null
                    }
                }, [o, n]), (0, r.jsxs)(i.a, {
                    position: "relative",
                    width: "".concat(t, "px"),
                    height: "".concat(t, "px"),
                    "aria-hidden": "true",
                    sx: {
                        "& .loader-lottie-svg": {
                            display: "block",
                            width: "100%",
                            height: "100%",
                            shapeRendering: "geometricPrecision",
                            transform: "none !important"
                        },
                        ...c
                    },
                    children: [!m && (0, r.jsx)(i.a, {
                        position: "absolute",
                        inset: "0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        sx: {
                            "@keyframes loaderPulse": {
                                "0%, 100%": {
                                    opacity: .25,
                                    transform: "scale(0.92)"
                                },
                                "50%": {
                                    opacity: .6,
                                    transform: "scale(1)"
                                }
                            }
                        },
                        children: (0, r.jsx)(i.a, {
                            borderRadius: "50%",
                            border: "2px solid",
                            borderColor: "whiteAlpha.300",
                            width: "40%",
                            height: "40%",
                            sx: {
                                animation: "loaderPulse 2s ease-in-out infinite"
                            }
                        })
                    }), (0, r.jsx)(i.a, {
                        ref: d,
                        position: "absolute",
                        inset: "0"
                    })]
                })
            };
            c.displayName = "LoaderLottie"
        },
        63560: (e, t, n) => {
            n.d(t, {
                N: () => a
            });
            var r = n(96692);

            function a(e) {
                let {
                    isDesktopL: t
                } = (0, r.uS)();
                return t ? e.desktop : e.mobile
            }
        },
        65322: (e, t, n) => {
            n.d(t, {
                MY: () => a,
                SP: () => o,
                YD: () => s,
                lF: () => c,
                m1: () => r,
                qy: () => l,
                xQ: () => i
            });
            let r = [.8, 0, .2, 1],
                a = [.16, 1, .3, 1],
                i = [0, 0, .2, 1],
                l = [.65, 0, .35, 1],
                o = [0, .41, .14, 1],
                s = [.62, 0, .14, 1],
                c = e => "cubic-bezier(".concat(e.join(", "), ")")
        },
        67465: (e, t, n) => {
            n.d(t, {
                i: () => I
            });
            var r = n(12482),
                a = n(40157),
                i = n(26084),
                l = n(3082),
                o = n(59109),
                s = n(66121),
                c = n(54513);
            let d = "\n    fragment PartHistoryCarouselItemFields on PartHistoryCarouselItem {\n  ...ComponentReferenceFields\n  startYear\n  endYear\n  title\n  subtitle\n  description\n  asset\n  thumbnailAsset\n  detailsAsset\n}\n    ",
                u = "\n    fragment ModuleHistoryCarouselFields on ModuleHistoryCarousel {\n  ...ComponentReferenceFields\n  carouselItemsCollection(limit: 10) {\n    items {\n      ... on PartHistoryCarouselItem {\n        ...PartHistoryCarouselItemFields\n      }\n    }\n  }\n}\n    ",
                m = "\n    query ModuleHistoryCarousel($locale: String!, $preview: Boolean, $id: String!) {\n  moduleHistoryCarousel(id: $id, locale: $locale, preview: $preview) {\n    ...ModuleHistoryCarouselFields\n  }\n}\n    ".concat(u, "\n").concat(a.o, "\n").concat(d),
                p = (e, t) => (0, r.I)({
                    queryKey: ["ModuleHistoryCarousel", e],
                    queryFn: (0, c.x8)(m, e),
                    ...t
                });
            p.getKey = e => ["ModuleHistoryCarousel", e], p.fetcher = (e, t) => (0, c.x8)(m, e, t);
            var g = n(30267),
                h = n(50281);
            let f = "\n    query NewPageHomepageCollection($locale: String!, $preview: Boolean) {\n  newPageHomepageCollection(\n    limit: 1\n    locale: $locale\n    preview: $preview\n    where: {title_exists: true}\n  ) {\n    items {\n      ...NewPageHomepageCollectionItemFields\n    }\n  }\n}\n    ".concat("\n    fragment NewPageHomepageCollectionItemFields on NewPageHomepage {\n  sys {\n    id\n  }\n  partnerSet {\n    sys {\n      id\n    }\n  }\n}\n    "),
                x = (e, t) => (0, r.I)({
                    queryKey: ["NewPageHomepageCollection", e],
                    queryFn: (0, c.x8)(f, e),
                    ...t
                });
            x.getKey = e => ["NewPageHomepageCollection", e], x.fetcher = (e, t) => (0, c.x8)(f, e, t);
            let v = "\n    query NewPageHomepage($locale: String!, $preview: Boolean, $id: String!) {\n  page: newPageHomepage(id: $id, locale: $locale, preview: $preview) {\n    ...NewPageHomepageFields\n  }\n}\n    ".concat("\n    fragment NewPageHomepageFields on NewPageHomepage {\n  ...NewPageHomepageLinkToFields\n  partnerSet {\n    ...PartnerSetFields\n  }\n  seoMetaDescription\n  robotFollow\n  robotIndex\n  historySectionTitle\n  historySectionTitle2\n  historySectionDescription\n  historySectionContent {\n    ... on ModuleHistoryCarousel {\n      ...ModuleHistoryCarouselFields\n    }\n  }\n  teamSectionTitle\n  teamSectionTitle2\n  teamsCollection(limit: 4) {\n    items {\n      ... on PageTeam {\n        slug\n        linkTitle\n        linkTitleDescription\n        team {\n          teamName\n          theme\n          gallery {\n            ...TeamSectionGalleryFields\n          }\n        }\n      }\n    }\n  }\n  newsSectionTitle\n  newsSectionTitle2\n  newsSectionCarouselItemsCollection(limit: 15) {\n    items {\n      ... on PageArticle {\n        ...PageArticleLinkToFields\n      }\n      ... on ModuleImage {\n        ...ModuleImageFields\n      }\n      ... on PageDriver {\n        ...PageDriverLinkToFields\n      }\n      ... on PageBasic {\n        ...PageBasicLinkToFields\n      }\n      ... on PageTeam {\n        ...PageTeamLinkToFields\n      }\n      ... on PageRaceSeries {\n        ...PageRaceSeriesLinkToFields\n      }\n      ... on PageRaceEvent {\n        ...PageRaceEventLinkToFields\n      }\n      ... on PageCar {\n        ...PageCarLinkToFields\n      }\n    }\n  }\n  newsSectionContentTagsCollection(limit: 15) {\n    items {\n      ... on ContentTag {\n        ...ContentTagFields\n      }\n    }\n  }\n}\n    ", "\n").concat(l.UH, "\n").concat(a.o, "\n").concat(s.cz, "\n").concat(s.Uc, "\n").concat(u, "\n").concat(d, "\n").concat("\n    fragment TeamSectionGalleryFields on ModuleGallery {\n  mediaCollection(limit: 10) {\n    items {\n      ...TeamSectionImageFields\n    }\n  }\n}\n    ", "\n").concat("\n    fragment TeamSectionImageFields on ModuleImage {\n  sys {\n    id\n  }\n  asset\n  alt\n}\n    ", "\n").concat(l.K7, "\n").concat(i.P, "\n").concat(g.lz, "\n").concat(l.QK, "\n").concat(l.e3, "\n").concat(l.F9, "\n").concat(h.z, "\n").concat(l.gZ, "\n").concat(l.x2, "\n").concat(l.Y4),
                y = (e, t) => (0, r.I)({
                    queryKey: ["NewPageHomepage", e],
                    queryFn: (0, c.x8)(v, e),
                    ...t
                });
            y.getKey = e => ["NewPageHomepage", e], y.fetcher = (e, t) => (0, c.x8)(v, e, t);
            let b = "\n    query NewPageHomepageCars($locale: String!, $preview: Boolean, $id: String!) {\n  page: newPageHomepage(id: $id, locale: $locale, preview: $preview) {\n    ...NewPageHomepageCarsSectionFields\n  }\n}\n    ".concat("\n    fragment NewPageHomepageCarsSectionFields on NewPageHomepage {\n  carsSectionCarsCollection(limit: 6) {\n    items {\n      ...DashboardCar3dFields\n    }\n  }\n  carsSectionSeriesTitle\n  carsSectionNextEventTitle\n  carsSectionLatestNewsTitle\n  carsSectionLabelNoSeries\n  carsSectionLabelNoNewsEvents\n}\n    ", "\n").concat("\n    fragment DashboardCar3dFields on Car3D {\n  sys {\n    id\n  }\n  internalName\n  displayName\n  theme\n  dashboardWidgetLauncherThumbnail\n  dashboardWidgetLauncherLabel\n  dashboardAsset\n  car {\n    ... on Car {\n      ...CarFields\n      linkedFrom {\n        pageCarCollection(limit: 1) {\n          items {\n            ...ComponentReferenceFields\n            slug\n          }\n        }\n      }\n      seriesCollection(limit: 4) {\n        items {\n          ...DashboardCarSeriesFields\n        }\n      }\n      tagsCollection(limit: 5) {\n        items {\n          ...DashboardCarContentTagWithArticleFields\n        }\n      }\n    }\n  }\n  carDetailHotspotsFrontCollection(limit: 3) {\n    items {\n      ...PartCarDetailItemFields\n    }\n  }\n  carDetailHotspotsBackCollection(limit: 3) {\n    items {\n      ...PartCarDetailItemFields\n    }\n  }\n}\n    ", "\n").concat(o.c, "\n").concat(a.o, "\n").concat("\n    fragment DashboardCarSeriesFields on Series {\n  ...ComponentReferenceFields\n  name\n  theme\n  description\n  linkedFrom {\n    pageRaceSeriesCollection(limit: 1) {\n      items {\n        ...ComponentReferenceFields\n        sys {\n          locale\n        }\n        slug\n      }\n    }\n  }\n}\n    ", "\n").concat("\n    fragment DashboardCarContentTagWithArticleFields on ContentTag {\n  ...ContentTagFields\n  linkedFrom {\n    pageArticleCollection(limit: 20, order: customFirstPublishedDate_DESC) {\n      items {\n        ...PageArticleLinkToFields\n      }\n    }\n  }\n}\n    ", "\n").concat(i.P, "\n").concat(l.K7, "\n").concat(o.F),
                w = (e, t) => (0, r.I)({
                    queryKey: ["NewPageHomepageCars", e],
                    queryFn: (0, c.x8)(b, e),
                    ...t
                });
            async function C(e) {
                return e
            }
            w.getKey = e => ["NewPageHomepageCars", e], w.fetcher = (e, t) => (0, c.x8)(b, e, t), n(96538), n(51642).hp;
            var k = n(59467);
            let T = async e => {
                    let {
                        tags: t,
                        locale: n,
                        preview: r,
                        headers: a
                    } = e, i = (await Promise.all(t.map(e => (0, c.x8)(k.mY, {
                        tags: [e],
                        locale: n,
                        preview: r,
                        limit: 15
                    }, a)()))).map(e => {
                        var t, n;
                        return null != (n = null == (t = e.pages) ? void 0 : t.items.filter(e => null !== e)) ? n : []
                    }).filter(e => e.length > 0);
                    if (0 === i.length) return null;
                    let l = [],
                        o = new Set,
                        s = Math.max(...i.map(e => e.length));
                    for (let e = 0; e < s && l.length < 15; e++)
                        for (let t of i) {
                            if (e >= t.length || l.length >= 15) continue;
                            let n = t[e];
                            o.has(n.sys.id) || (o.add(n.sys.id), l.push(n))
                        }
                    return 0 === l.length ? null : {
                        __typename: "PageArticleCollection",
                        total: l.length,
                        skip: 0,
                        limit: 15,
                        items: l
                    }
                },
                S = async e => {
                    var t, n, r;
                    let a, {
                            queryKey: i,
                            headers: l
                        } = e,
                        [, {
                            id: o,
                            locale: s,
                            preview: d
                        }] = i,
                        [u, m] = await Promise.all([(0, c.x8)(v, {
                            id: o,
                            locale: s,
                            preview: d
                        }, l)(), (0, c.x8)(b, {
                            id: o,
                            locale: s,
                            preview: d
                        }, l)()]);
                    (null == (n = u.page) || null == (t = n.newsSectionContentTagsCollection) ? void 0 : t.items) && (a = u.page.newsSectionContentTagsCollection.items.map(e => null == e ? void 0 : e.tagKey).filter(e => null != e));
                    let p = null;
                    return a && a.length > 0 && (p = await T({
                        tags: a,
                        locale: s,
                        preview: d,
                        headers: l
                    })), {
                        __typename: "Query",
                        page: u.page ? await C({ ...u.page,
                            ...null != (r = m.page) ? r : {},
                            newsPages: p
                        }) : null
                    }
                },
                I = (e, t) => {
                    var n;
                    let {
                        id: a,
                        locale: i,
                        preview: l
                    } = e;
                    return (0, r.I)({
                        queryKey: ["NewPageHomepage", {
                            id: a,
                            locale: i,
                            preview: l
                        }],
                        queryFn: () => S({
                            queryKey: ["NewPageHomepage", {
                                id: a,
                                locale: i,
                                preview: l
                            }]
                        }),
                        ...!l && {
                            staleTime: 1 / 0
                        },
                        refetchOnWindowFocus: !1,
                        enabled: null == (n = null == t ? void 0 : t.enabled) || n
                    })
                };
            I.getKey = e => ["NewPageHomepage", e], I.fetcher = (e, t) => () => S({
                queryKey: ["NewPageHomepage", e],
                headers: t
            })
        },
        72744: (e, t, n) => {
            n.d(t, {
                X: () => c
            });
            var r = n(6029),
                a = n(77367),
                i = n(69757),
                l = n(38275),
                o = n(35882),
                s = n(21938);
            let c = (0, a.R)((e, t) => {
                let n = (0, i.V)("NdlHeading", e),
                    {
                        className: a,
                        as: c = "h2",
                        children: d,
                        ...u
                    } = (0, l.M)(e);
                return (0, r.jsx)(o.B.h2, {
                    ref: t,
                    as: c,
                    __css: n,
                    className: (0, s.cx)("ndl-heading", a),
                    ...u,
                    children: d
                })
            });
            c.displayName = "NdlHeading"
        },
        85007: (e, t, n) => {
            n.d(t, {
                r: () => c
            });
            var r = n(55729);
            let a = null;
            async function i() {
                try {
                    {
                        var e;
                        let t = null != (e = new URLSearchParams(window.location.search).get("scrubEngine")) ? e : localStorage.getItem("scrub-engine");
                        if ("fsv" === t || "video" === t) return t
                    }
                    if ("undefined" == typeof VideoDecoder || "undefined" == typeof EncodedVideoChunk) return "video";
                    let t = document.createElement("canvas").getContext("webgl2");
                    if (!t) return "video";
                    let n = t.getExtension("WEBGL_lose_context");
                    if (null == n || n.loseContext(), !(await VideoDecoder.isConfigSupported({
                            codec: "avc1.640029",
                            codedWidth: 1920,
                            codedHeight: 1080
                        })).supported) return "video";
                    return "fsv"
                } catch (e) {
                    return "video"
                }
            }
            let l = null,
                o = new Set;

            function s(e) {
                return o.add(e), () => {
                    o.delete(e)
                }
            }

            function c() {
                let e = (0, r.useCallback)(() => l, []),
                    t = (0, r.useCallback)(() => null, []);
                return (0, r.useSyncExternalStore)(s, e, t)
            }(null !== a ? a : a = i()).then(e => {
                for (let t of (l = e, o)) t()
            })
        },
        85147: (e, t, n) => {
            let r;
            n.d(t, {
                b: () => m
            });
            var a = n(6029),
                i = n(55729),
                l = n(72813),
                o = n(85007),
                s = n(7876);
            let c = (0, i.lazy)(() => n.e(5912).then(n.bind(n, 95912)).then(e => ({
                    default: e.VideoBackend
                }))),
                d = (0, i.lazy)(() => n.e(8564).then(n.bind(n, 98564)).then(e => ({
                    default: e.FsvBackend
                }))),
                u = (0, i.lazy)(() => n.e(6301).then(n.bind(n, 76301)).then(e => ({
                    default: e.FsvWorkerBackend
                }))),
                m = (0, i.forwardRef)(function(e, t) {
                    let {
                        sources: n,
                        load: m = "auto",
                        loadMode: g = "stream",
                        initialLoop: h,
                        onReady: f,
                        onFirstFrame: x,
                        needsSnapshot: v,
                        ...y
                    } = e, b = (0, o.r)(), [w, C] = (0, i.useState)(!1), [k, T] = (0, i.useState)(!1), S = (0, i.useRef)(null), I = (0, i.useRef)(null), j = (0, i.useRef)(null), P = "fsv" === b && !!n.fsv, E = P && !w && (0, s.CW)() && function() {
                        let e = function() {
                            if (void 0 !== r) return r;
                            let e = new URLSearchParams(window.location.search).get("scrubEngine");
                            return r = null != e ? e : "undefined" != typeof localStorage ? localStorage.getItem("scrub-engine") : null
                        }();
                        return "fsv-worker" === e || "fsv-main" !== e
                    }(), F = P && !E && !k;

                    function D() {
                        var e, t, n;
                        return E ? null != (e = S.current) ? e : p : F ? null != (t = I.current) ? t : p : null != (n = j.current) ? n : p
                    }(0, i.useImperativeHandle)(t, () => ({
                        seekToTime(e) {
                            D().seekToTime(e)
                        },
                        seekToProgress(e) {
                            D().seekToProgress(e)
                        },
                        getCurrentTime: () => D().getCurrentTime(),
                        getDuration: () => D().getDuration(),
                        isReady: () => D().isReady(),
                        hasRenderedFrame: () => D().hasRenderedFrame(),
                        startLoop(e) {
                            D().startLoop(e)
                        },
                        stopLoop() {
                            D().stopLoop()
                        },
                        reset() {
                            D().reset()
                        },
                        captureFrame: () => D().captureFrame(),
                        get element() {
                            return D().element
                        }
                    }), [E, F]);
                    let M = {
                        sources: n,
                        load: m,
                        loadMode: g,
                        initialLoop: h,
                        onReady: f,
                        onFirstFrame: x,
                        needsSnapshot: v
                    };
                    return null === b ? (0, a.jsx)(l.a, {
                        position: "relative",
                        width: "full",
                        height: "full",
                        ...y
                    }) : E ? (0, a.jsx)(l.a, {
                        position: "relative",
                        width: "full",
                        height: "full",
                        ...y,
                        children: (0, a.jsx)(i.Suspense, {
                            children: (0, a.jsx)(u, {
                                ref: S,
                                ...M,
                                onInitError: () => C(!0)
                            })
                        })
                    }) : F ? (0, a.jsx)(l.a, {
                        position: "relative",
                        width: "full",
                        height: "full",
                        ...y,
                        children: (0, a.jsx)(i.Suspense, {
                            children: (0, a.jsx)(d, {
                                ref: I,
                                ...M,
                                onInitError: () => T(!0)
                            })
                        })
                    }) : (0, a.jsx)(l.a, {
                        position: "relative",
                        width: "full",
                        height: "full",
                        ...y,
                        children: (0, a.jsx)(i.Suspense, {
                            children: (0, a.jsx)(c, {
                                ref: j,
                                ...M
                            }, n.mp4)
                        })
                    })
                });
            m.displayName = "ScrubPlayer";
            let p = {
                seekToTime() {},
                seekToProgress() {},
                getCurrentTime: () => null,
                getDuration: () => null,
                isReady: () => !1,
                hasRenderedFrame: () => !1,
                startLoop() {},
                stopLoop() {},
                reset() {},
                captureFrame: () => Promise.resolve(null),
                element: null
            }
        },
        86291: (e, t, n) => {
            n.d(t, {
                y: () => s
            });
            let r = "-1440p60",
                a = {
                    garage: {
                        fsv: "-1440p60-hq",
                        mp4: r
                    }
                },
                i = (e, t) => e.replace(/\.(\w+)$/, "".concat(t, ".$1")),
                l = (e, t) => {
                    var n;
                    return "string" == typeof e ? e : null != (n = e[t]) ? n : r
                },
                o = (e, t) => ({ ...e,
                    mp4: i(e.mp4, l(t, "mp4")),
                    ...e.fsv ? {
                        fsv: i(e.fsv, l(t, "fsv"))
                    } : {}
                }),
                s = Object.fromEntries(Object.entries({
                    garage: {
                        type: "scrub",
                        desktop: {
                            mp4: "/homepage/garage/garage-desktop.mp4",
                            fsv: "/homepage/garage/garage-desktop.fsv"
                        },
                        mobile: {
                            mp4: "/homepage/garage/garage-mobile.mp4",
                            fsv: "/homepage/garage/garage-mobile.fsv"
                        }
                    },
                    car963: {
                        type: "scrub",
                        desktop: {
                            mp4: "/homepage/963/963-desktop.mp4",
                            fsv: "/homepage/963/963-desktop.fsv"
                        },
                        mobile: {
                            mp4: "/homepage/963/963-mobile.mp4",
                            fsv: "/homepage/963/963-mobile.fsv"
                        }
                    },
                    car99xElectric: {
                        type: "scrub",
                        desktop: {
                            mp4: "/homepage/99x-electric/99x-electric-desktop.mp4",
                            fsv: "/homepage/99x-electric/99x-electric-desktop.fsv"
                        },
                        mobile: {
                            mp4: "/homepage/99x-electric/99x-electric-mobile.mp4",
                            fsv: "/homepage/99x-electric/99x-electric-mobile.fsv"
                        }
                    },
                    car911Cup: {
                        type: "scrub",
                        desktop: {
                            mp4: "/homepage/911-cup/911-cup-desktop.mp4",
                            fsv: "/homepage/911-cup/911-cup-desktop.fsv"
                        },
                        mobile: {
                            mp4: "/homepage/911-cup/911-cup-mobile.mp4",
                            fsv: "/homepage/911-cup/911-cup-mobile.fsv"
                        }
                    },
                    car911GT3R: {
                        type: "scrub",
                        desktop: {
                            mp4: "/homepage/911-gt3-r/911-gt3-r-desktop.mp4",
                            fsv: "/homepage/911-gt3-r/911-gt3-r-desktop.fsv"
                        },
                        mobile: {
                            mp4: "/homepage/911-gt3-r/911-gt3-r-mobile.mp4",
                            fsv: "/homepage/911-gt3-r/911-gt3-r-mobile.fsv"
                        }
                    },
                    news: {
                        type: "autoplay",
                        desktop: {
                            webm: "/homepage/news/news-desktop.webm",
                            mp4: "/homepage/news/news-desktop.mp4"
                        },
                        mobile: {
                            webm: "/homepage/news/news-mobile.webm",
                            mp4: "/homepage/news/news-mobile.mp4"
                        }
                    }
                }).map(e => {
                    var t;
                    let [n, i] = e, l = null != (t = a[n]) ? t : r;
                    return [n, "scrub" === i.type && l ? { ...i,
                        desktop: o(i.desktop, l),
                        mobile: o(i.mobile, l)
                    } : i]
                }))
        },
        95415: (e, t, n) => {
            n.d(t, {
                o: () => c
            });
            var r = n(6029),
                a = n(77367),
                i = n(69757),
                l = n(38275),
                o = n(35882),
                s = n(21938);
            let c = (0, a.R)((e, t) => {
                let n = (0, i.V)("NdlText", e),
                    {
                        className: a,
                        as: c,
                        children: d,
                        ...u
                    } = (0, l.M)(e);
                return (0, r.jsx)(o.B.p, {
                    ref: t,
                    as: c,
                    __css: n,
                    className: (0, s.cx)("ndl-text", a),
                    ...u,
                    children: d
                })
            });
            c.displayName = "NdlText"
        },
        96692: (e, t, n) => {
            n.d(t, {
                EO: () => p,
                P2: () => h,
                uS: () => g
            });
            var r = n(6029),
                a = n(55729),
                i = n(6937);
            let l = (0, a.createContext)(null),
                o = (0, a.createContext)(null);

            function s(e, t) {
                let n = (0, a.useCallback)(t => {
                        let n = window.matchMedia(e);
                        return n.addEventListener("change", t), () => n.removeEventListener("change", t)
                    }, [e]),
                    r = (0, a.useCallback)(() => window.matchMedia(e).matches, [e]),
                    i = (0, a.useCallback)(() => t, [t]);
                return (0, a.useSyncExternalStore)(n, r, i)
            }
            let c = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i,
                d = /iPad|Tablet/i,
                u = parseInt(i.A.md, 10);

            function m(e) {
                var t;
                let n = null == (t = window.screen) ? void 0 : t.orientation;
                return n ? n.addEventListener("change", e) : window.addEventListener("orientationchange", e), window.addEventListener("resize", e), () => {
                    n ? n.removeEventListener("change", e) : window.removeEventListener("orientationchange", e), window.removeEventListener("resize", e)
                }
            }

            function p(e) {
                let {
                    children: t
                } = e, n = s("(min-width: ".concat(i.A.l, ")"), !1), p = s("(min-width: ".concat(i.A.md, ")"), !1), g = (0, a.useSyncExternalStore)(m, () => c.test(navigator.userAgent) && !d.test(navigator.userAgent) && window.innerWidth < u && function() {
                    var e;
                    if (null == (e = window.screen) ? void 0 : e.orientation) return window.screen.orientation.type.includes("landscape");
                    let t = window.orientation;
                    return void 0 !== t ? 90 === t || -90 === t : window.innerWidth > window.innerHeight
                }(), () => !1), h = s("(max-height: ".concat(700, "px)"), !1), f = (0, a.useMemo)(() => ({
                    isDesktopL: n,
                    isDesktopMd: p,
                    isMobile: !p,
                    isMobileLandscape: g,
                    isShortViewport: h
                }), [n, p, g, h]), x = (0, a.useMemo)(() => ({
                    prefersReducedMotion: !1
                }), [!1]);
                return (0, r.jsx)(l.Provider, {
                    value: f,
                    children: (0, r.jsx)(o.Provider, {
                        value: x,
                        children: t
                    })
                })
            }

            function g() {
                let e = (0, a.useContext)(l);
                if (!e) throw Error("useHomepageBreakpoints must be used within HomepageResponsiveProvider");
                return e
            }

            function h() {
                let e = (0, a.useContext)(o);
                if (!e) throw Error("useHomepageMotionPref must be used within HomepageResponsiveProvider");
                return e
            }
            p.displayName = "HomepageResponsiveProvider"
        }
    }
]);
//# sourceMappingURL=630-28595a6b87047740.js.map