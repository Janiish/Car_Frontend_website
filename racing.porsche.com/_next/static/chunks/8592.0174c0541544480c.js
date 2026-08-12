"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [8592], {
        47564: (e, t, r) => {
            r.d(t, {
                I: () => u
            });
            var n = r(6029),
                l = r(77367),
                o = r(35882),
                i = r(17172);
            let u = (0, l.R)((e, t) => {
                let {
                    colors: r = ["#3c1515", "#944752", "#ffc085"],
                    proportion: l = .5,
                    softness: u = 1,
                    distortion: s = .09,
                    swirl: a = .9,
                    swirlIterations: c = 6,
                    shape: f = "checks",
                    shapeScale: d = .25,
                    speed: h = 3,
                    frame: m,
                    scale: p = 2.5,
                    rotation: g = 1.35,
                    offsetX: v,
                    offsetY: w,
                    fit: b,
                    worldWidth: x,
                    worldHeight: S,
                    originX: E,
                    originY: y,
                    minPixelRatio: A,
                    maxPixelCount: F,
                    ...R
                } = e;
                return (0, n.jsx)(o.B.div, {
                    ref: t,
                    position: "relative",
                    ...R,
                    children: (0, n.jsx)(i.Bl, {
                        colors: r,
                        proportion: l,
                        softness: u,
                        distortion: s,
                        swirl: a,
                        swirlIterations: c,
                        shape: f,
                        shapeScale: d,
                        speed: h,
                        frame: m,
                        scale: p,
                        rotation: g,
                        offsetX: v,
                        offsetY: w,
                        fit: b,
                        worldWidth: x,
                        worldHeight: S,
                        originX: E,
                        originY: y,
                        minPixelRatio: A,
                        maxPixelCount: F,
                        width: "100%",
                        height: "100%"
                    })
                })
            });
            u.displayName = "ShaderBackground"
        },
        48592: (e, t, r) => {
            r.r(t), r.d(t, {
                AnimatedShaderBackground: () => x
            });
            var n = r(6029),
                l = r(47564),
                o = r(55729);
            let i = /^#/,
                u = e => {
                    let t = e.replace(i, ""),
                        r = Number.parseInt(3 === t.length ? t.split("").map(e => e + e).join("") : t, 16);
                    return {
                        r: r >> 16 & 255,
                        g: r >> 8 & 255,
                        b: 255 & r
                    }
                },
                s = (e, t, r) => e + (t - e) * r,
                a = (e, t, r) => (e => {
                    let t = e => Math.round(Math.max(0, Math.min(255, e))).toString(16).padStart(2, "0");
                    return "#".concat(t(e.r)).concat(t(e.g)).concat(t(e.b))
                })(((e, t, r) => ({
                    r: s(e.r, t.r, r),
                    g: s(e.g, t.g, r),
                    b: s(e.b, t.b, r)
                }))(u(e), u(t), r)),
                c = function(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 800,
                        r = !(arguments.length > 2) || void 0 === arguments[2] || arguments[2],
                        [n, l] = (0, o.useState)(e),
                        i = (0, o.useRef)(e),
                        u = (0, o.useRef)(null),
                        s = (0, o.useRef)(e),
                        c = (0, o.useRef)(null),
                        f = (0, o.useRef)(0),
                        d = (0, o.useRef)(e);
                    return d.current = e, (0, o.useEffect)(() => {
                        if (null !== u.current && (cancelAnimationFrame(u.current), u.current = null), !r) {
                            l(e), i.current = e, c.current = null;
                            return
                        }
                        let n = i.current;
                        if (n.length === e.length && n.every((t, r) => t === e[r])) {
                            c.current = null;
                            return
                        }
                        s.current = i.current, c.current = null, f.current = 0;
                        let o = e => {
                            null != c.current || (c.current = e);
                            let r = Math.min((e - c.current) / t, 1);
                            if (r >= 1) {
                                let e = d.current;
                                i.current = e, l(e), u.current = null, c.current = null;
                                return
                            }
                            if (e - f.current >= 50) {
                                let t = r < .5 ? 4 * r * r * r : 1 - Math.pow(-2 * r + 2, 3) / 2,
                                    n = ((e, t, r) => {
                                        let {
                                            normalizedA: n,
                                            normalizedB: l
                                        } = ((e, t) => {
                                            let r = Math.max(e.length, t.length),
                                                n = (e, t) => {
                                                    if (e.length === t) return e;
                                                    if (0 === e.length) return Array(t).fill("#000000");
                                                    if (1 === e.length) return Array(t).fill(e[0]);
                                                    let r = [];
                                                    for (let n = 0; n < t; n++) {
                                                        let l = n / (t - 1) * (e.length - 1),
                                                            o = Math.floor(l),
                                                            i = Math.min(o + 1, e.length - 1),
                                                            u = l - o;
                                                        r.push(a(e[o], e[i], u))
                                                    }
                                                    return r
                                                };
                                            return {
                                                normalizedA: n(e, r),
                                                normalizedB: n(t, r)
                                            }
                                        })(e, t);
                                        return n.map((e, t) => a(e, l[t], r))
                                    })(s.current, d.current, t);
                                i.current = n, l(n), f.current = e
                            }
                            u.current = requestAnimationFrame(o)
                        };
                        return u.current = requestAnimationFrame(o), () => {
                            null !== u.current && cancelAnimationFrame(u.current)
                        }
                    }, [e, r, t]), n
                };
            var f = r(35252);
            let d = !1,
                h = null;

            function m() {
                if (d) return Promise.resolve();
                if (h) return h;
                if (void 0 === globalThis.window) return Promise.resolve();
                let e = (0, f.R)();
                return !e || e.complete && e.naturalWidth > 0 ? (d = !0, Promise.resolve()) : h = new Promise(t => {
                    let r = () => {
                        d = !0, t()
                    };
                    "function" == typeof e.decode ? e.decode().then(r).catch(r) : (e.onload = r, e.onerror = r)
                })
            }
            void 0 !== globalThis.window && m();
            var p = r(96692);
            let g = [],
                v = {
                    position: "absolute",
                    inset: 0
                },
                w = null;
            class b extends o.Component {
                static getDerivedStateFromError() {
                    return {
                        hasError: !0
                    }
                }
                componentDidCatch() {
                    this.props.onError()
                }
                render() {
                    return this.state.hasError ? null : this.props.children
                }
                constructor(...e) {
                    super(...e), this.state = {
                        hasError: !1
                    }
                }
            }
            let x = (0, o.memo)(function(e) {
                var t, r, i;
                let {
                    config: u
                } = e, s = function() {
                    let [e, t] = (0, o.useState)(!1);
                    return (0, o.useEffect)(() => {
                        if (d) return void t(!0);
                        let e = !1;
                        return m().then(() => {
                            e || t(!0)
                        }), () => {
                            e = !0
                        }
                    }, []), e
                }(), a = (0, o.useRef)(null), [f, h] = (0, o.useState)(!1), [x, S] = (0, o.useState)(!1), [E, y] = (0, o.useState)(!1), A = (0, o.useRef)(0), {
                    isMobile: F
                } = (0, p.uS)(), {
                    prefersReducedMotion: R
                } = (0, p.P2)();
                (0, o.useEffect)(() => {
                    if (R) return;
                    let e = a.current;
                    if (!e) return;
                    let t = new IntersectionObserver(e => {
                        let [t] = e;
                        h(t.isIntersecting)
                    }, {
                        rootMargin: "200px"
                    });
                    return t.observe(e), () => t.disconnect()
                }, [R]);
                let M = c(null != (t = u.colors) ? t : g, 700, f && !R),
                    j = F ? 2 : null != (r = u.swirlIterations) ? r : 4,
                    k = (0, o.useMemo)(() => {
                        var e;
                        return {
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(135deg, ".concat((null != (e = u.colors) ? e : g).join(", "), ")")
                        }
                    }, [u.colors]),
                    C = !R && s && f && !x && function() {
                        if (null !== w) return w;
                        if ("undefined" == typeof document) return !0;
                        try {
                            var e;
                            let t = document.createElement("canvas");
                            w = !!(null != (e = t.getContext("webgl2")) ? e : t.getContext("webgl"))
                        } catch (e) {
                            w = !1
                        }
                        return w
                    }();
                return (0, o.useEffect)(() => {
                    let e, t;
                    if (!C) return;
                    let r = a.current,
                        n = !1,
                        l = t => {
                            t.preventDefault(), S(!0), A.current < 1 && (e = setTimeout(() => {
                                n || (A.current += 1, S(!1))
                            }, 3e3))
                        },
                        o = () => {
                            let e = null == r ? void 0 : r.querySelector("canvas");
                            if (!e) {
                                t = requestAnimationFrame(o);
                                return
                            }
                            e.addEventListener("webglcontextlost", l)
                        };
                    return o(), () => {
                        var o;
                        n = !0, void 0 !== t && cancelAnimationFrame(t), e && clearTimeout(e), null == r || null == (o = r.querySelector("canvas")) || o.removeEventListener("webglcontextlost", l)
                    }
                }, [C]), (0, o.useEffect)(() => {
                    if (!C) return void y(!1);
                    let e = 0,
                        t = 0;
                    return e = requestAnimationFrame(() => {
                        t = requestAnimationFrame(() => y(!0))
                    }), () => {
                        cancelAnimationFrame(e), cancelAnimationFrame(t)
                    }
                }, [C]), (0, n.jsxs)("div", {
                    ref: a,
                    style: v,
                    "aria-hidden": "true",
                    children: [(0, n.jsx)("div", {
                        style: k
                    }), C && (0, n.jsx)(b, {
                        onError: () => {
                            S(!0)
                        },
                        children: (0, n.jsx)("div", {
                            style: {
                                position: "absolute",
                                inset: 0,
                                opacity: +!!E,
                                transition: "opacity ".concat(600, "ms ease")
                            },
                            children: (0, n.jsx)(l.I, {
                                colors: M,
                                proportion: u.proportion,
                                softness: u.softness,
                                distortion: u.distortion,
                                swirl: u.swirl,
                                swirlIterations: j,
                                shape: u.shape,
                                shapeScale: u.shapeScale,
                                speed: null != (i = u.speed) ? i : 0,
                                scale: u.scale,
                                rotation: u.rotation,
                                offsetX: u.offsetX,
                                offsetY: u.offsetY,
                                maxPixelCount: F ? 8e5 : 2e6,
                                position: "absolute",
                                top: 0,
                                left: 0,
                                w: "100%",
                                h: "100%"
                            })
                        })
                    })]
                })
            });
            x.displayName = "AnimatedShaderBackground"
        }
    }
]);
//# sourceMappingURL=8592.0174c0541544480c.js.map