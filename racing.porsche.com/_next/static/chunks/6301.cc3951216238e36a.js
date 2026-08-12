"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [6301], {
        11612: (e, r, t) => {
            t.d(r, {
                n: () => u
            });
            var n = t(55729);

            function u(e, r) {
                let t = (0, n.useRef)(null),
                    u = (0, n.useRef)(!1),
                    c = (0, n.useRef)(0),
                    s = (0, n.useRef)(0),
                    l = (0, n.useRef)(e),
                    i = (0, n.useRef)(r);
                (0, n.useInsertionEffect)(() => {
                    l.current = e, i.current = r
                });
                let f = (0, n.useRef)(null);
                (0, n.useEffect)(() => {
                    let e = () => {
                        !document.hidden && u.current && 0 === c.current && f.current && (s.current = performance.now(), c.current = requestAnimationFrame(f.current))
                    };
                    return document.addEventListener("visibilitychange", e), () => document.removeEventListener("visibilitychange", e)
                }, []);
                let a = (0, n.useCallback)(() => {
                    u.current = !1, t.current = null, c.current && (cancelAnimationFrame(c.current), c.current = 0)
                }, []);
                return {
                    start: (0, n.useCallback)(e => {
                        let r = t.current;
                        if (u.current && r && r.from === e.from && r.to === e.to) return;
                        t.current = e, u.current = !0, s.current = performance.now();
                        let n = e => {
                            if (!u.current) return;
                            let r = t.current;
                            if (!r) return;
                            if (!i.current()) {
                                s.current = e, c.current = requestAnimationFrame(n);
                                return
                            }
                            if (document.hidden) {
                                s.current = e, c.current = 0;
                                return
                            }
                            let f = r.to - r.from,
                                a = (e - s.current) / 1e3,
                                o = f > 0 ? r.from + a % f : r.from;
                            l.current(o), c.current = requestAnimationFrame(n)
                        };
                        f.current = n, c.current = requestAnimationFrame(n)
                    }, []),
                    stop: a
                }
            }
        },
        25958: (e, r, t) => {
            function n(e, r, t) {
                let n = Math.round(Math.max(0, e) * r);
                return t > 0 ? Math.min(n, t - 1) : n
            }

            function u(e, r) {
                return e > 0 && r > 0 ? r / (e / 1e6) : 30
            }

            function c(e) {
                return e < 0 ? 0 : e > 1 ? 1 : e
            }
            t.d(r, {
                Hk: () => n,
                J$: () => c,
                No: () => u
            })
        },
        76301: (e, r, t) => {
            t.r(r), t.d(r, {
                FsvWorkerBackend: () => d
            });
            var n = t(6029),
                u = t(55729),
                c = t(35882),
                s = t(7876),
                l = t(25958),
                i = t(83431),
                f = t(11612);
            let a = new WeakSet,
                o = 0,
                d = (0, u.forwardRef)(function(e, r) {
                    let {
                        sources: t,
                        load: d = "auto",
                        loadMode: m = "stream",
                        initialLoop: p,
                        onReady: v,
                        onFirstFrame: h,
                        onInitError: R,
                        needsSnapshot: k = !1
                    } = e, w = (0, u.useRef)(null), y = (0, u.useRef)("");
                    "" === y.current && (y.current = "fsv-".concat(o++));
                    let F = (0, u.useRef)(null),
                        b = (0, u.useRef)(null),
                        g = (0, u.useRef)(!1),
                        E = (0, u.useRef)(!1),
                        x = (0, u.useRef)(30),
                        C = (0, u.useRef)(0),
                        G = (0, u.useRef)(0),
                        P = (0, u.useRef)(0),
                        M = (0, u.useRef)(-1),
                        S = (0, u.useRef)(!1),
                        T = (0, i.S)(v),
                        A = (0, i.S)(h),
                        H = (0, i.S)(R),
                        W = (0, i.S)(p);

                    function q(e) {
                        let r = (0, l.Hk)(e, x.current, C.current);
                        r !== M.current && (M.current = r, (0, s.uG)({
                            type: "seekFrame",
                            id: y.current,
                            index: r
                        }))
                    }
                    let B = (0, u.useCallback)(e => {
                            P.current = e, q(e)
                        }, []),
                        {
                            start: L,
                            stop: N
                        } = (0, f.n)(B, () => g.current);
                    return (0, u.useImperativeHandle)(r, () => ({
                        seekToTime(e) {
                            N(), P.current = Math.max(0, e), g.current && q(e)
                        },
                        seekToProgress(e) {
                            N();
                            let r = (0, l.J$)(e);
                            P.current = r * G.current, g.current && q(r * G.current)
                        },
                        getCurrentTime: () => g.current ? P.current : null,
                        getDuration: () => G.current > 0 ? G.current : null,
                        isReady: () => g.current,
                        hasRenderedFrame: () => E.current,
                        startLoop(e) {
                            L(e)
                        },
                        stopLoop() {
                            N()
                        },
                        reset() {
                            N(), E.current = !1, P.current = 0, M.current = -1, (0, s.uG)({
                                type: "reset",
                                id: y.current
                            })
                        },
                        captureFrame: () => (function() {
                            if (!g.current) return Promise.resolve(null);
                            let e = b.current;
                            return e && (b.current = null, e(null)), new Promise(e => {
                                b.current = e, (0, s.uG)({
                                    type: "snapshot",
                                    id: y.current
                                }), setTimeout(() => {
                                    b.current === e && (b.current = null, e(null))
                                }, 300)
                            })
                        })(),
                        get element() {
                            return w.current
                        }
                    }), []), (0, u.useEffect)(() => {
                        let e = w.current;
                        if (!e || !t.fsv) return;
                        let r = y.current;
                        if ((0, s.pc)(r, e => {
                                var r, t;
                                if ("ready" === e.type) x.current = e.fps, C.current = e.frameCount, G.current = e.durationUs / 1e6, g.current = !0, S.current || (S.current = !0, null == (r = T.current) || r.call(T)), W.current && L(W.current);
                                else if ("firstFrame" === e.type) E.current = !0, null == (t = A.current) || t.call(A);
                                else if ("snapshot" === e.type) {
                                    let r = b.current;
                                    b.current = null, null == r || r(e.bitmap)
                                } else "error" === e.type && H.current()
                            }), a.has(e)) F.current !== t.fsv && ((0, s.uG)({
                            type: "reload",
                            id: r,
                            fsvUrl: t.fsv,
                            loadMode: m
                        }), F.current = t.fsv, g.current = !1, S.current = !1, M.current = -1);
                        else {
                            a.add(e);
                            let n = e.transferControlToOffscreen(),
                                u = function() {
                                    let e = window.devicePixelRatio || 1;
                                    return {
                                        w: Math.round(window.innerWidth * e),
                                        h: Math.round(window.innerHeight * e)
                                    }
                                }();
                            (0, s.uG)({
                                type: "register",
                                id: r,
                                offscreen: n,
                                fsvUrl: t.fsv,
                                loadMode: m,
                                preserveDrawingBuffer: k,
                                maxPixelWidth: null == u ? void 0 : u.w,
                                maxPixelHeight: null == u ? void 0 : u.h
                            }, [n]), F.current = t.fsv
                        }
                        return () => {
                            (0, s.uw)(r), (0, s.uG)({
                                type: "dispose",
                                id: r
                            })
                        }
                    }, [t.fsv, m]), (0, u.useEffect)(() => {
                        t.fsv && ((0, s.uG)({
                            type: "auto" === d ? "load" : "free",
                            id: y.current
                        }), "none" === d && (g.current = !1, S.current = !1))
                    }, [d, t.fsv]), (0, u.useEffect)(() => () => N(), []), (0, n.jsx)(c.B.canvas, {
                        ref: w,
                        "aria-hidden": "true",
                        width: "full",
                        height: "full",
                        objectFit: "cover",
                        objectPosition: "center",
                        display: "block"
                    })
                });
            d.displayName = "FsvWorkerBackend"
        },
        83431: (e, r, t) => {
            t.d(r, {
                S: () => u
            });
            var n = t(55729);

            function u(e) {
                let r = (0, n.useRef)(e);
                return (0, n.useInsertionEffect)(() => {
                    r.current = e
                }), r
            }
        }
    }
]);
//# sourceMappingURL=6301.cc3951216238e36a.js.map