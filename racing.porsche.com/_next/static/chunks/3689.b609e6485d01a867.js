"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [3689], {
        23689: (e, t, n) => {
            n.r(t), n.d(t, {
                DesktopMarquee: () => y
            });
            var a = n(6029),
                i = n(55729),
                r = n(72813),
                s = n(45253),
                o = n(96692),
                l = n(21450),
                d = n(65322);
            let c = "big-single",
                m = "big-pair",
                u = e => e === m ? 852 : e === c ? 424 : 457,
                g = (0, d.lF)(d.MY),
                f = (0, i.memo)(function(e) {
                    let {
                        animate: t,
                        entranceReady: n,
                        staggerIndex: s,
                        fanDistance: o,
                        children: l,
                        ...d
                    } = e, [c, m] = (0, i.useState)(!1), u = (0, i.useRef)(!1), f = (0, i.useCallback)(e => {
                        "transform" !== e.propertyName || u.current || (u.current = !0, m(!0))
                    }, []);
                    if (!t || o <= 0) return (0, a.jsx)(r.a, { ...d,
                        children: l
                    });
                    let h = s / (s + 6) * 1.26;
                    return (0, a.jsx)(r.a, {
                        onTransitionEnd: f,
                        style: {
                            opacity: +!!n,
                            transform: n ? "translateX(0)" : "translateX(".concat(o, "px)"),
                            transition: "transform ".concat(1, "s ").concat(g, " ").concat(h, "s, opacity 0.4s ease-out ").concat(h, "s"),
                            willChange: c ? "auto" : "transform, opacity",
                            contain: c ? "none" : "layout paint"
                        },
                        ...d,
                        children: l
                    })
                });

            function h(e) {
                return e < 6 ? "eager" : "lazy"
            }
            let p = {
                keySuffix: "-clone",
                animate: !1,
                a11yProps: {
                    "aria-hidden": !0,
                    inert: ""
                },
                getImageLoading: function() {
                    return "lazy"
                },
                disableVideo: !0
            };

            function x(e, t, n, i) {
                let {
                    group: r,
                    cardIndices: o
                } = e, d = r.items.map(e => e.sys.id).join("-") + t.keySuffix, u = e => {
                    var t;
                    return null != (t = null == i ? void 0 : i.get(e)) ? t : 0
                };
                return r.type === c ? (0, a.jsx)(f, {
                    as: "li",
                    animate: t.animate,
                    entranceReady: n,
                    staggerIndex: o[0],
                    fanDistance: u(o[0]),
                    width: "424px",
                    height: "538px",
                    flexShrink: 0,
                    mr: 4,
                    ...t.a11yProps,
                    children: (0, a.jsx)(l.C, {
                        item: r.items[0],
                        cardSize: "large",
                        disableVideo: t.disableVideo,
                        imageLoading: t.getImageLoading(o[0])
                    })
                }, d) : r.type === m ? (0, a.jsxs)(s.s, {
                    as: "li",
                    gap: 4,
                    flexShrink: 0,
                    mr: 4,
                    ...t.a11yProps,
                    children: [(0, a.jsx)(f, {
                        animate: t.animate,
                        entranceReady: n,
                        staggerIndex: o[0],
                        fanDistance: u(o[0]),
                        width: "424px",
                        height: "538px",
                        flexShrink: 0,
                        children: (0, a.jsx)(l.C, {
                            item: r.items[0],
                            cardSize: "large",
                            disableVideo: t.disableVideo,
                            imageLoading: t.getImageLoading(o[0])
                        })
                    }), (0, a.jsx)(f, {
                        animate: t.animate,
                        entranceReady: n,
                        staggerIndex: o[1],
                        fanDistance: u(o[1]),
                        width: "424px",
                        height: "538px",
                        flexShrink: 0,
                        children: (0, a.jsx)(l.C, {
                            item: r.items[1],
                            cardSize: "large",
                            disableVideo: t.disableVideo,
                            imageLoading: t.getImageLoading(o[1])
                        })
                    })]
                }, d) : (0, a.jsxs)(s.s, {
                    as: "li",
                    flexDirection: "column",
                    gap: 4,
                    width: "457px",
                    flexShrink: 0,
                    mr: 4,
                    ...t.a11yProps,
                    children: [(0, a.jsx)(f, {
                        animate: t.animate,
                        entranceReady: n,
                        staggerIndex: o[0],
                        fanDistance: u(o[0]),
                        height: "299px",
                        children: (0, a.jsx)(l.C, {
                            item: r.items[0],
                            cardSize: "medium",
                            disableVideo: t.disableVideo,
                            imageLoading: t.getImageLoading(o[0])
                        })
                    }), (0, a.jsxs)(s.s, {
                        gap: 4,
                        children: [(0, a.jsx)(f, {
                            animate: t.animate,
                            entranceReady: n,
                            staggerIndex: o[1],
                            fanDistance: u(o[1]),
                            flex: "1 0 0",
                            minWidth: 0,
                            height: "224px",
                            children: (0, a.jsx)(l.C, {
                                item: r.items[1],
                                cardSize: "small",
                                disableVideo: t.disableVideo,
                                imageLoading: t.getImageLoading(o[1])
                            })
                        }), (0, a.jsx)(f, {
                            animate: t.animate,
                            entranceReady: n,
                            staggerIndex: o[2],
                            fanDistance: u(o[2]),
                            flex: "1 0 0",
                            minWidth: 0,
                            height: "224px",
                            children: (0, a.jsx)(l.C, {
                                item: r.items[2],
                                cardSize: "small",
                                disableVideo: t.disableVideo,
                                imageLoading: t.getImageLoading(o[2])
                            })
                        })]
                    })]
                }, d)
            }
            let y = (0, i.memo)(function(e) {
                let {
                    items: t,
                    play: n,
                    entranceReady: l = !1
                } = e, d = (0, i.useMemo)(() => (e => {
                    let t = [],
                        n = 0,
                        a = !0;
                    for (; n < e.length;) {
                        let i = e.length - n;
                        a ? i >= 2 ? (t.push({
                            type: m,
                            items: [e[n], e[n + 1]]
                        }), n += 2) : (t.push({
                            type: c,
                            items: [e[n]]
                        }), n += 1) : i >= 3 ? (t.push({
                            type: "mixed",
                            items: [e[n], e[n + 1], e[n + 2]]
                        }), n += 3) : 2 === i ? (t.push({
                            type: m,
                            items: [e[n], e[n + 1]]
                        }), n += 2) : (t.push({
                            type: c,
                            items: [e[n]]
                        }), n += 1), a = !a
                    }
                    return t
                })(t), [t]), {
                    prefersReducedMotion: g
                } = (0, o.P2)(), f = !g, [y, S] = (0, i.useState)(!1);
                (0, i.useEffect)(() => {
                    if (!l || y) return;
                    let e = 0,
                        t = requestAnimationFrame(() => {
                            e = requestAnimationFrame(() => S(!0))
                        });
                    return () => {
                        cancelAnimationFrame(t), cancelAnimationFrame(e)
                    }
                }, [l, y]);
                let b = (0, i.useMemo)(() => {
                        let e = 0;
                        return d.map(t => {
                            let n = t.items.length,
                                a = Array.from({
                                    length: n
                                }, (t, n) => e + n);
                            return e += n, {
                                group: t,
                                cardIndices: a
                            }
                        })
                    }, [d]),
                    v = (0, i.useRef)(window.innerWidth),
                    j = (0, i.useMemo)(() => {
                        let e = v.current,
                            t = new Map,
                            n = 0;
                        for (let a of b) {
                            let i = Math.max(0, e - n + 100);
                            for (let e of a.cardIndices) t.set(e, i);
                            n += u(a.group.type) + 4
                        }
                        return t
                    }, [b]),
                    L = (0, i.useRef)(null),
                    k = (0, i.useRef)(null),
                    [w, I] = (0, i.useState)(0);
                (0, i.useLayoutEffect)(() => {
                    let e = k.current;
                    if (!e) return;
                    let t = () => {
                        let t = e.scrollWidth / 2;
                        if (t <= 0) return;
                        let n = t / 50;
                        I(e => e === n ? e : n)
                    };
                    t();
                    let n = new ResizeObserver(t);
                    return n.observe(e), () => n.disconnect()
                }, []);
                let [V, C] = (0, i.useState)(!1), R = (0, i.useRef)(!1), D = (0, i.useRef)(w);
                D.current = w, (0, i.useEffect)(() => {
                    let e = L.current;
                    if (!e) return;
                    let t = t => {
                            let n = t.target;
                            if (!(n instanceof HTMLElement) || !n.matches(":focus-visible")) return;
                            let a = t.relatedTarget;
                            if (a instanceof Node && e.contains(a)) return;
                            let i = k.current,
                                r = D.current;
                            i && r > 0 && (i.style.animationName = "none", i.getBoundingClientRect(), i.style.animationName = "cssMarqueeScroll", i.style.animationDuration = "".concat(r, "s"), i.style.animationTimingFunction = "linear", i.style.animationIterationCount = "infinite", i.style.animationPlayState = "paused"), R.current = !0, C(!0)
                        },
                        n = t => {
                            if (!R.current) return;
                            let n = t.relatedTarget;
                            n instanceof Node && e.contains(n) || (R.current = !1, C(!1))
                        };
                    return e.addEventListener("focusin", t), e.addEventListener("focusout", n), () => {
                        e.removeEventListener("focusin", t), e.removeEventListener("focusout", n)
                    }
                }, []);
                let M = n && !g && !V;
                return (0, a.jsxs)(r.a, {
                    ref: L,
                    overflow: "hidden",
                    width: "100vw",
                    marginLeft: "calc(-50vw + 50%)",
                    minHeight: "538px",
                    isolation: "isolate",
                    sx: {
                        contain: "content",
                        touchAction: "pan-y",
                        userSelect: "none"
                    },
                    children: [(0, a.jsx)("style", {
                        children: "\n                @keyframes cssMarqueeScroll {\n                    from { transform: translate3d(0, 0, 0); }\n                    to { transform: translate3d(-50%, 0, 0); }\n                }\n                /* Hover-only pause. Do not use :focus-within — pointer clicks\n                   leave focus on the card link and would stick the marquee paused. */\n                [data-marquee-pause-hover]:hover {\n                    animation-play-state: paused !important;\n                }\n            "
                    }), (0, a.jsxs)(s.s, {
                        ref: k,
                        as: "ul",
                        listStyleType: "none",
                        margin: 0,
                        padding: 0,
                        "data-marquee-pause-hover": "",
                        width: "max-content",
                        style: {
                            animationName: w > 0 ? "cssMarqueeScroll" : "none",
                            animationDuration: w > 0 ? "".concat(w, "s") : void 0,
                            animationTimingFunction: w > 0 ? "linear" : void 0,
                            animationIterationCount: w > 0 ? "infinite" : void 0,
                            animationPlayState: M ? "running" : "paused",
                            willChange: M ? "transform" : "auto",
                            backfaceVisibility: "hidden"
                        },
                        children: [b.map(e => x(e, {
                            keySuffix: "",
                            animate: f,
                            a11yProps: {},
                            getImageLoading: h,
                            disableVideo: !1
                        }, y, j)), b.map(e => x(e, p, y))]
                    })]
                })
            });
            y.displayName = "DesktopMarquee"
        }
    }
]);
//# sourceMappingURL=3689.b609e6485d01a867.js.map