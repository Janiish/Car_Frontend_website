"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [1250], {
        2584: (e, t, n) => {
            n.d(t, {
                D: () => p,
                w: () => b
            });
            var a = n(6029),
                r = n(55729),
                l = n(18898),
                i = n(63504),
                o = n(36011),
                s = n(72813),
                c = n(91753),
                u = n(73738);
            let d = (0, r.createContext)(void 0),
                p = e => {
                    let {
                        opacity: t,
                        textColor: n = u.A.grey500,
                        children: r
                    } = e;
                    return (0, a.jsx)(d.Provider, {
                        value: n,
                        children: (0, a.jsx)(s.a, {
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
                h = (0, l.OQ)(1),
                m = e => {
                    let t = Math.max(0, Math.min(1, e));
                    return t * t * (3 - 2 * t)
                },
                g = e => Math.max(0, Math.min(1, e)) ** 2.65,
                b = e => {
                    var t;
                    let {
                        entryProgress: n,
                        exitProgress: s,
                        entryProgressRange: p = [.5, 1],
                        exitProgressRange: b,
                        entryTranslateYPx: x = 30,
                        entryBlurRadiusRange: f = [10, 0],
                        playOnce: v = !1,
                        textColor: y,
                        children: k
                    } = e, j = (0, r.useContext)(d), M = null != (t = null != y ? y : j) ? t : u.A.grey500, w = (0, r.useRef)(!1), C = f[1], G = f[0], S = null != s && null != b ? {
                        progress: s,
                        range: b
                    } : null, R = null !== S, _ = null !== S ? S.progress : n, E = null !== S ? S.range : [0, 1], z = (0, i.G)(n, p, ["".concat(x, "px"), "0px"]), I = (0, i.G)(n, p, [0, 1]), N = (0, i.G)(n, p, f), W = (0, i.G)(n, p, [.96, 1]), A = (0, i.G)(_, e => {
                        if (!R) return 0;
                        let [t, n] = E;
                        return e <= t ? 0 : e >= n ? 1 : (e - t) / (n - t)
                    }), F = (0, i.G)(A, e => 1 - m(e)), P = (0, i.G)(A, e => m(e) * G), T = (0, r.useCallback)(e => {
                        v && !w.current && e >= p[1] && (w.current = !0)
                    }, [v, p]);
                    (0, o.L)(n, "change", T);
                    let J = (0, r.useMemo)(() => (0, l.OQ)(C), [C]),
                        L = v && w.current,
                        B = (0, i.G)(I, g),
                        V = L ? h : B,
                        O = (0, i.G)([V, F], e => {
                            let [t, n] = e;
                            return Math.min(t, n)
                        }),
                        U = (0, i.G)([L ? J : N, P], e => {
                            let [t, n] = e;
                            return Math.max(t, n)
                        }),
                        H = (0, i.G)(U, e => "blur(".concat(e, "px)")),
                        Q = (0, i.G)(O, e => .72 + .28 * Math.max(0, Math.min(1, e)) ** 1.9),
                        q = (0, i.G)(V, e => .95 + .050000000000000044 * Math.max(0, Math.min(1, e)) ** 1.9),
                        D = (0, i.G)(O, e => {
                            if (e >= 1 - 1e-6) return "none";
                            let t = 18 + Math.max(0, Math.min(1, e)) ** 3.15 * 82,
                                n = Math.min(100, t + 18),
                                a = Math.min(100, n + 10);
                            return "linear-gradient(to right, ".concat("rgba(0, 0, 0, 1)", " ").concat(t, "%, ").concat("rgba(0, 0, 0, 0.58)", " ").concat(n, "%, ").concat("rgba(0, 0, 0, 0.24)", " ").concat(a, "%)")
                        });
                    return (0, a.jsx)(c.e, {
                        as: "span",
                        display: "block",
                        style: {
                            y: L ? 0 : z,
                            filter: H,
                            scale: L ? h : W,
                            overflow: "visible"
                        },
                        children: (0, a.jsx)(c.e, {
                            as: "span",
                            display: "block",
                            style: {
                                opacity: Q,
                                scale: q,
                                color: M,
                                WebkitMaskImage: D,
                                maskImage: D,
                                overflow: "visible"
                            },
                            children: k
                        })
                    })
                }
        },
        34221: (e, t, n) => {
            n.d(t, {
                n: () => i
            });
            var a = n(6029),
                r = n(94771),
                l = n(72813);
            let i = e => {
                let {
                    direction: t,
                    onClick: n,
                    ...i
                } = e;
                return (0, a.jsx)(l.a, {
                    transform: "prev" === t ? "rotate(180deg)" : void 0,
                    children: (0, a.jsx)(r.d, {
                        onClick: n,
                        ...i
                    })
                })
            }
        },
        67408: (e, t, n) => {
            n.d(t, {
                g: () => p
            });
            var a = n(6029),
                r = n(55729),
                l = n(72813),
                i = n(86941);
            let o = "0.10em",
                s = "0.5em",
                c = ["linear-gradient(to right, transparent, #000 ".concat(s, ", #000 calc(100% - ").concat(s, "), transparent)"), "linear-gradient(transparent, #000 ".concat(o, ", #000 calc(100% - ").concat(o, "), transparent)")].join(", ");

            function u(e) {
                return String(e).padStart(4, "0").split("").map(Number)
            }
            let d = e => {
                    let {
                        digit: t,
                        animated: n,
                        delta: i,
                        revision: s
                    } = e, c = (0, r.useRef)(t), u = (0, r.useRef)(s);
                    return n ? s !== u.current && (c.current += i, u.current = s) : (c.current = t, u.current = s), (0, a.jsx)(l.a, {
                        as: "span",
                        sx: {
                            display: "inline-block",
                            height: "calc(1em + ".concat(o, " * 2)"),
                            lineHeight: 1,
                            overflow: "hidden",
                            verticalAlign: "top"
                        },
                        children: (0, a.jsx)(l.a, {
                            as: "span",
                            sx: {
                                display: "block",
                                py: o,
                                transition: n ? "transform ".concat(1200, "ms ").concat("cubic-bezier(0.2, 0.1, 0.2, 1)") : "none",
                                transform: "translateY(-".concat(c.current, "em)")
                            },
                            children: Array.from({
                                length: 40
                            }, (e, n) => (0, a.jsx)(l.a, {
                                as: "span",
                                "aria-hidden": n % 10 !== t,
                                sx: {
                                    display: "block",
                                    height: "1em",
                                    lineHeight: 1
                                },
                                children: n % 10
                            }, n))
                        })
                    })
                },
                p = e => {
                    let {
                        startYear: t,
                        endYear: n,
                        isActive: p,
                        startDelayMs: h = 0
                    } = e, [m, g] = (0, r.useState)(t), [b, x] = (0, r.useState)(!1), [f, v] = (0, r.useState)(0), y = (0, r.useRef)(u(t));
                    (0, r.useEffect)(() => {
                        if (!p || (x(!1), g(t), y.current = u(t), t >= n)) return;
                        let e = setTimeout(() => {
                            v(e => e + 1), x(!0), g(n)
                        }, 50 + h);
                        return () => clearTimeout(e)
                    }, [p, t, n, h]);
                    let k = u(m),
                        j = k.map((e, t) => b ? function(e, t, n) {
                            let a = e[n],
                                r = t[n],
                                l = r >= a ? r - a : 10 - a + r;
                            if (0 !== l) return l;
                            let i = e.findIndex((e, n) => e !== t[n]);
                            return 10 * (i >= 0 && i < n)
                        }(y.current, k, t) : 0);
                    return (0, a.jsxs)(a.Fragment, {
                        children: [(0, a.jsx)(i.s, {
                            as: "span",
                            children: String(m)
                        }), (0, a.jsx)(l.a, {
                            as: "span",
                            "aria-hidden": "true",
                            display: "inline-flex",
                            sx: {
                                fontVariantNumeric: "tabular-nums",
                                margin: "calc(-1 * ".concat(o, ") calc(-1 * ").concat(s, ")"),
                                padding: "0 ".concat(s),
                                maskImage: c,
                                WebkitMaskImage: c,
                                maskComposite: "intersect",
                                WebkitMaskComposite: "source-in"
                            },
                            children: k.map((e, t) => {
                                let n = 10 ** (k.length - 1 - t);
                                return (0, a.jsx)(d, {
                                    digit: e,
                                    animated: b,
                                    delta: j[t],
                                    revision: f
                                }, n)
                            })
                        })]
                    })
                }
        },
        71735: (e, t, n) => {
            n.d(t, {
                l: () => g
            });
            var a = n(6029),
                r = n(33210),
                l = n(55729),
                i = n(91753),
                o = n(45253),
                s = n(72813),
                c = n(72925),
                u = n(67374),
                d = n(34221);
            let p = "width ".concat(c.E, " ").concat(u.J, ", background-color ").concat(c.E, " ").concat(u.J, ", opacity ").concat(c.E, " ").concat(u.J, ", transform ").concat(c.E, " ").concat(u.J),
                h = "transform ".concat(c.E, " ").concat(u.J),
                m = "@media (prefers-reduced-motion: reduce)",
                g = e => {
                    var t, n;
                    let {
                        activeSlideIndex: c,
                        onClick: u,
                        swiper: g,
                        slideCount: b,
                        motionStyle: x,
                        theme: f = "light",
                        variant: v = "bare",
                        maxVisible: y,
                        showArrows: k = !0,
                        filling: j,
                        fillDuration: M,
                        onNavigate: w,
                        ...C
                    } = e, G = (0, r.Mn)(), S = null != g ? g : G, R = null != (n = null == S || null == (t = S.snapGrid) ? void 0 : t.length) ? n : b && b >= 2 ? b : 0, {
                        transformValue: _,
                        containerWidth: E
                    } = (0, l.useMemo)(() => (function(e, t, n) {
                        if (null == n || e <= n) return {
                            transformValue: "none",
                            containerWidth: void 0
                        };
                        let a = Math.max(0, Math.min(t - Math.floor(n / 2), e - n));
                        return {
                            transformValue: "translateX(-".concat(14 * a, "px)"),
                            containerWidth: (n - 1) * 6 + 18 + (n - 1) * 8
                        }
                    })(R, c, y), [R, c, y]);
                    if (R < 2) return null;
                    let z = "dark" === f ? "allWhite" : "porscheBlack",
                        I = 0 === c,
                        N = c >= R - 1;
                    return (0, a.jsx)(i.e, {
                        style: x,
                        flexShrink: 0,
                        children: (0, a.jsxs)(o.s, {
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
                            ...C,
                            children: [k && (0, a.jsx)(d.n, {
                                direction: "prev",
                                onClick: () => {
                                    null == S || S.slidePrev(), null == w || w("prev")
                                },
                                hideLabel: !0,
                                disabled: I,
                                aria: {
                                    "aria-label": "Previous slide"
                                },
                                theme: f
                            }), (0, a.jsx)(o.s, {
                                alignItems: "center",
                                overflow: "hidden",
                                ...null != E && {
                                    width: "".concat(E, "px")
                                },
                                children: (0, a.jsx)(o.s, {
                                    alignItems: "center",
                                    gap: 2,
                                    sx: {
                                        transition: h,
                                        transform: _,
                                        [m]: {
                                            transition: "none"
                                        }
                                    },
                                    children: Array.from({
                                        length: R
                                    }, (e, t) => {
                                        let n = c === t,
                                            r = n && j && null != M;
                                        return (0, a.jsx)(s.a, {
                                            as: "button",
                                            type: "button",
                                            width: n ? "".concat(18, "px") : "".concat(6, "px"),
                                            height: "".concat(6, "px"),
                                            borderRadius: "full",
                                            border: "none",
                                            padding: 0,
                                            cursor: "pointer",
                                            flexShrink: 0,
                                            bgColor: n ? z : "grey300",
                                            position: "relative",
                                            overflow: "hidden",
                                            sx: {
                                                transition: p,
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
                                                    transition: r ? "width ".concat(M, "ms linear") : "none"
                                                },
                                                [m]: {
                                                    transition: "none",
                                                    "&::after": {
                                                        transition: "none"
                                                    }
                                                }
                                            },
                                            onClick: e => {
                                                var n, a;
                                                let r = null != (a = null == S || null == (n = S.params) ? void 0 : n.slidesPerGroup) ? a : 1;
                                                null == S || S.slideTo(t * r), null == u || u(e), null == w || w("pagination", t)
                                            },
                                            "aria-label": n ? "Current slide, slide ".concat(t + 1, " of ").concat(R) : "Go to slide ".concat(t + 1),
                                            "aria-current": n ? "true" : void 0
                                        }, t)
                                    })
                                })
                            }), k && (0, a.jsx)(d.n, {
                                direction: "next",
                                onClick: () => {
                                    null == S || S.slideNext(), null == w || w("next")
                                },
                                hideLabel: !0,
                                disabled: N,
                                aria: {
                                    "aria-label": "Next slide"
                                },
                                theme: f
                            })]
                        })
                    })
                }
        },
        83800: (e, t, n) => {
            n.d(t, {
                U: () => c
            });
            var a = n(6029),
                r = n(96538),
                l = n(55729),
                i = n(77396);
            let o = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

            function s(e, t, n) {
                var a, l;
                let i = null != (a = t.type) ? a : "thumb",
                    o = null != (l = t.gravity) ? l : "auto";
                return n.map(n => {
                    let a = (0, r.UW)({
                        src: e,
                        width: n,
                        format: "auto",
                        quality: "auto",
                        rawTransformations: ["c_".concat(i, ",ar_").concat(t.aspectRatio, ",g_").concat(o)]
                    });
                    return "".concat(a, " ").concat(n, "w")
                }).join(", ")
            }
            let c = e => {
                var t, n, r, c, u, d, p, h;
                let {
                    cloudinaryAsset: m,
                    sources: g,
                    defaultCrop: b,
                    defaultWidths: x = o,
                    sizes: f = "100vw",
                    alt: v,
                    priority: y = !1,
                    loading: k,
                    style: j,
                    className: M,
                    aiTagPosition: w,
                    aiTagOffset: C,
                    hideAiTag: G,
                    imgAriaDescribedBy: S
                } = e, R = null == m || null == (t = m[0]) ? void 0 : t.public_id, _ = null != (p = null != (d = null == m || null == (c = m[0]) || null == (r = c.context) || null == (n = r.custom) ? void 0 : n.alt) ? d : v) ? p : "", E = null != (h = null == m || null == (u = m[0]) ? void 0 : u.blur_data_url) ? h : void 0, {
                    ariaDescribedBy: z,
                    tag: I
                } = (0, i.C)(m, "image", {
                    aiTagPosition: w,
                    aiTagOffset: C,
                    hideAiTag: G
                }), [N, W] = (0, l.useState)(!1), A = (0, l.useRef)(null);
                (0, l.useEffect)(() => {
                    E && A.current && A.current.complete && A.current.naturalWidth > 0 && W(!0)
                }, [E]);
                let F = (0, l.useMemo)(() => R ? {
                    sources: g.map(e => {
                        var t, n;
                        return {
                            media: e.media,
                            srcSet: s(R, e.crop, null != (t = e.widths) ? t : x),
                            sizes: null != (n = e.sizes) ? n : f
                        }
                    }),
                    fallback: s(R, b, x)
                } : null, [R, g, b, x, f]);
                if (!F) return null;
                let P = "opacity 400ms cubic-bezier(0.23, 1, 0.32, 1)";
                return (0, a.jsxs)("div", {
                    style: {
                        position: "absolute",
                        inset: 0
                    },
                    children: [E && (0, a.jsx)("div", {
                        "aria-hidden": "true",
                        style: {
                            position: "absolute",
                            inset: 0,
                            backgroundImage: "url(".concat(E, ")"),
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "blur(32px)",
                            transform: "scale(1.1) translateZ(0)",
                            opacity: +!N,
                            transition: P
                        }
                    }), (0, a.jsxs)("picture", {
                        style: {
                            display: "block"
                        },
                        children: [F.sources.map(e => (0, a.jsx)("source", {
                            media: e.media,
                            srcSet: e.srcSet,
                            sizes: e.sizes
                        }, e.media)), (0, a.jsx)("img", {
                            ref: A,
                            srcSet: F.fallback,
                            sizes: f,
                            alt: _,
                            loading: null != k ? k : y ? void 0 : "lazy",
                            decoding: y ? "sync" : "async",
                            "aria-describedby": null != z ? z : S,
                            ...y ? {
                                fetchpriority: "high"
                            } : {},
                            className: M,
                            onLoad: E ? () => W(!0) : void 0,
                            style: {
                                position: "absolute",
                                height: "100%",
                                width: "100%",
                                inset: 0,
                                objectFit: "cover",
                                ...j,
                                ...E && {
                                    opacity: +!!N,
                                    transition: P
                                }
                            }
                        })]
                    }), I]
                })
            }
        },
        96377: (e, t, n) => {
            n.d(t, {
                U: () => c
            });
            var a = n(6029),
                r = n(77367),
                l = n(69757),
                i = n(38275),
                o = n(35882),
                s = n(21938);
            let c = (0, r.R)((e, t) => {
                let n = (0, l.V)("FluidTypography", e),
                    {
                        className: r,
                        as: c = "h2",
                        children: u,
                        ...d
                    } = (0, i.M)(e);
                return (0, a.jsx)(o.B.h2, {
                    ref: t,
                    as: c,
                    __css: n,
                    className: (0, s.cx)("fluid-typography", r),
                    ...d,
                    children: u
                })
            });
            c.displayName = "FluidTypography"
        }
    }
]);
//# sourceMappingURL=1250.2d3ce96da3289656.js.map