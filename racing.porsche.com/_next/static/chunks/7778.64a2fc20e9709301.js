(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [7778], {
        19416: (e, n, t) => {
            var i = t(55729),
                r = function(e) {
                    return e && "object" == typeof e && "default" in e ? e : {
                        default: e
                    }
                }(i);
            ! function(e) {
                if (!e || "undefined" == typeof window) return;
                let n = document.createElement("style");
                n.setAttribute("type", "text/css"), n.innerHTML = e, document.head.appendChild(n)
            }('.rfm-marquee-container {\n  overflow-x: hidden;\n  display: flex;\n  flex-direction: row;\n  position: relative;\n  width: var(--width);\n  transform: var(--transform);\n}\n.rfm-marquee-container:hover div {\n  animation-play-state: var(--pause-on-hover);\n}\n.rfm-marquee-container:active div {\n  animation-play-state: var(--pause-on-click);\n}\n\n.rfm-overlay {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n.rfm-overlay::before, .rfm-overlay::after {\n  background: linear-gradient(to right, var(--gradient-color), rgba(255, 255, 255, 0));\n  content: "";\n  height: 100%;\n  position: absolute;\n  width: var(--gradient-width);\n  z-index: 2;\n  pointer-events: none;\n  touch-action: none;\n}\n.rfm-overlay::after {\n  right: 0;\n  top: 0;\n  transform: rotateZ(180deg);\n}\n.rfm-overlay::before {\n  left: 0;\n  top: 0;\n}\n\n.rfm-marquee {\n  flex: 0 0 auto;\n  min-width: var(--min-width);\n  z-index: 1;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  animation: scroll var(--duration) linear var(--delay) var(--iteration-count);\n  animation-play-state: var(--play);\n  animation-delay: var(--delay);\n  animation-direction: var(--direction);\n}\n@keyframes scroll {\n  0% {\n    transform: translateX(0%);\n  }\n  100% {\n    transform: translateX(-100%);\n  }\n}\n\n.rfm-initial-child-container {\n  flex: 0 0 auto;\n  display: flex;\n  min-width: auto;\n  flex-direction: row;\n  align-items: center;\n}\n\n.rfm-child {\n  transform: var(--transform);\n}'), n.A = i.forwardRef(function({
                style: e = {},
                className: n = "",
                autoFill: t = !1,
                play: a = !0,
                pauseOnHover: l = !1,
                pauseOnClick: o = !1,
                direction: c = "left",
                speed: s = 50,
                delay: u = 0,
                loop: d = 0,
                gradient: f = !1,
                gradientColor: m = "white",
                gradientWidth: v = 200,
                onFinish: h,
                onCycleComplete: p,
                onMount: g,
                children: y
            }, w) {
                let [k, E] = i.useState(0), [x, b] = i.useState(0), [N, T] = i.useState(1), [C, q] = i.useState(!1), S = i.useRef(null), $ = w || S, R = i.useRef(null), A = i.useCallback(() => {
                    if (R.current && $.current) {
                        let e = $.current.getBoundingClientRect(),
                            n = R.current.getBoundingClientRect(),
                            i = e.width,
                            r = n.width;
                        ("up" === c || "down" === c) && (i = e.height, r = n.height), t && i && r ? T(r < i ? Math.ceil(i / r) : 1) : T(1), E(i), b(r)
                    }
                }, [t, $, c]);
                i.useEffect(() => {
                    if (C && (A(), R.current && $.current)) {
                        let e = new ResizeObserver(() => A());
                        return e.observe($.current), e.observe(R.current), () => {
                            e && e.disconnect()
                        }
                    }
                }, [A, $, C]), i.useEffect(() => {
                    A()
                }, [A, y]), i.useEffect(() => {
                    q(!0)
                }, []), i.useEffect(() => {
                    "function" == typeof g && g()
                }, []);
                let F = i.useMemo(() => t ? x * N / s : x < k ? k / s : x / s, [t, k, x, N, s]),
                    L = i.useMemo(() => Object.assign(Object.assign({}, e), {
                        "--pause-on-hover": !a || l ? "paused" : "running",
                        "--pause-on-click": !a || l && !o || o ? "paused" : "running",
                        "--width": "up" === c || "down" === c ? "100vh" : "100%",
                        "--transform": "up" === c ? "rotate(-90deg)" : "down" === c ? "rotate(90deg)" : "none"
                    }), [e, a, l, o, c]),
                    M = i.useMemo(() => ({
                        "--gradient-color": m,
                        "--gradient-width": "number" == typeof v ? `${v}px` : v
                    }), [m, v]),
                    I = i.useMemo(() => ({
                        "--play": a ? "running" : "paused",
                        "--direction": "left" === c ? "normal" : "reverse",
                        "--duration": `${F}s`,
                        "--delay": `${u}s`,
                        "--iteration-count": d ? `${d}` : "infinite",
                        "--min-width": t ? "auto" : "100%"
                    }), [a, c, F, u, d, t]),
                    j = i.useMemo(() => ({
                        "--transform": "up" === c ? "rotate(90deg)" : "down" === c ? "rotate(-90deg)" : "none"
                    }), [c]),
                    O = i.useCallback(e => [...Array(Number.isFinite(e) && e >= 0 ? e : 0)].map((e, n) => r.default.createElement(i.Fragment, {
                        key: n
                    }, i.Children.map(y, e => r.default.createElement("div", {
                        style: j,
                        className: "rfm-child"
                    }, e)))), [j, y]);
                return C ? r.default.createElement("div", {
                    ref: $,
                    style: L,
                    className: "rfm-marquee-container " + n
                }, f && r.default.createElement("div", {
                    style: M,
                    className: "rfm-overlay"
                }), r.default.createElement("div", {
                    className: "rfm-marquee",
                    style: I,
                    onAnimationIteration: p,
                    onAnimationEnd: h
                }, r.default.createElement("div", {
                    className: "rfm-initial-child-container",
                    ref: R
                }, i.Children.map(y, e => r.default.createElement("div", {
                    style: j,
                    className: "rfm-child"
                }, e))), O(N - 1)), r.default.createElement("div", {
                    className: "rfm-marquee",
                    style: I
                }, O(N))) : null
            })
        },
        67778: (e, n, t) => {
            "use strict";
            t.r(n), t.d(n, {
                LiveTicker: () => p
            });
            var i = t(6029),
                r = t(45253),
                a = t(8711),
                l = t(40157),
                o = t(12482),
                c = t(54513);
            let s = "\n    query LiveTicker($locale: String!, $preview: Boolean!, $id: String!) {\n  mainNavigation(id: $id, locale: $locale, preview: $preview) {\n    ...LiveTickerFields\n  }\n}\n    ".concat("\n    fragment LiveTickerFields on MainNavigation {\n  ...ComponentReferenceFields\n  liveTicker\n}\n    ", "\n").concat(l.o),
                u = (e, n) => (0, o.I)({
                    queryKey: ["LiveTicker", e],
                    queryFn: (0, c.x8)(s, e),
                    ...n
                });
            u.getKey = e => ["LiveTicker", e], u.fetcher = (e, n) => (0, c.x8)(s, e, n);
            var d = t(93066),
                f = t(55729),
                m = t(81278),
                v = t(19416);
            let h = (0, t(35882).B)(v.A),
                p = e => {
                    var n;
                    let {
                        mainNavigationId: t
                    } = e, {
                        locale: l,
                        isPreview: o
                    } = (0, m.useRouter)(), {
                        data: c
                    } = u({
                        id: t,
                        locale: l,
                        preview: !!o
                    }, {
                        refetchOnWindowFocus: !0,
                        refetchInterval: 3e4,
                        notifyOnChangeProps: "all",
                        structuralSharing: !1
                    }), {
                        dispatch: s
                    } = (0, d.CU)(), [v, p] = (0, f.useState)([]);
                    return ((0, f.useEffect)(() => {
                        var e, n;
                        s({
                            type: "SET_LIVE_TICKER",
                            payload: !!c && Array.isArray(null == c || null == (e = c.mainNavigation) ? void 0 : e.liveTicker) && (null == c ? void 0 : c.mainNavigation.liveTicker.length) > 0
                        }), (null == c || null == (n = c.mainNavigation) ? void 0 : n.liveTicker) && p(e => ((e, n) => ((e, n) => {
                            let t = [...e];
                            return n.forEach(e => {
                                let n = t.findIndex(n => n.id === e.id); - 1 === n ? t.push(e) : t[n] = e
                            }), t
                        })(((e, n) => {
                            let t = new Set(n.map(e => e.id));
                            return e.filter(e => t.has(e.id))
                        })(e, n), n))(e, c.mainNavigation.liveTicker))
                    }, [c, s]), (null == c || null == (n = c.mainNavigation) ? void 0 : n.liveTicker) && !(c.mainNavigation.liveTicker.length < 1)) ? (0, i.jsx)(r.s, {
                        className: "live-ticker",
                        alignItems: "center",
                        width: "full",
                        bg: "porscheBlack",
                        color: "allWhite",
                        h: "liveTickerHeight",
                        overflow: "hidden",
                        position: "relative",
                        children: (0, i.jsx)(h, {
                            autoFill: !0,
                            pauseOnHover: !0,
                            children: v.map(e => (0, i.jsx)(a.E, {
                                size: "x-small",
                                mx: ".5ch",
                                children: e.value
                            }, e.id))
                        })
                    }) : null
                }
        }
    }
]);
//# sourceMappingURL=7778.64a2fc20e9709301.js.map