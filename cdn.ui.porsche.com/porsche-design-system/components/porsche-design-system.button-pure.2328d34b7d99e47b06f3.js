"use strict";
(self.webpackChunkPorscheDesignSystem_3_23_0 = self.webpackChunkPorscheDesignSystem_3_23_0 || []).push([
    ["button-pure"], {
        2237: (t, e, i) => {
            i.d(e, {
                A: () => o
            });
            const o = ["start", "end", "left", "right"]
        },
        5086: (t, e, i) => {
            i.d(e, {
                b: () => o
            });
            const o = "4px"
        },
        2651: (t, e, i) => {
            i.d(e, {
                h: () => s,
                i: () => n
            });
            i(3950);
            var o = i(6611),
                a = i(6539);
            const n = (t, e, i, o, a) => {
                    t.addEventListener("click", (n => s(n, t, e, i, o, a)))
                },
                s = (t, e, i, n, s, r) => {
                    const d = (0, o.g)(e, "form");
                    d && !n() && window.setTimeout((() => {
                        if (!t.defaultPrevented) {
                            const t = s ?.(),
                                e = r ?.(),
                                o = document.createElement("button");
                            (0, a.s)(o, { ...t && {
                                    name: t
                                },
                                ...e && {
                                    value: e
                                },
                                type: i()
                            }), o.style.display = "none", d.appendChild(o), o.addEventListener("click", (t => {
                                t.stopPropagation()
                            })), o.click(), o.remove()
                        }
                    }), 1)
                }
        },
        3017: (t, e, i) => {
            i.d(e, {
                h: () => n,
                w: () => s
            });
            var o = i(3950),
                a = i(4418);
            const n = (t, e) => "none" !== t || !!e,
                s = (t, e, i) => {
                    !n(e, i) && (0, a.i)(t, "p-text") && (0, o.c)(`${(0,o.j)(t)} should not be used inside p-text. Please use a <button> or <a> tag.`, t)
                }
        },
        8459: (t, e, i) => {
            i.d(e, {
                B: () => a,
                a: () => o
            });
            const o = ["aria-label", "aria-expanded", "aria-pressed", "aria-haspopup"],
                a = ["button", "submit", "reset"]
        },
        6760: (t, e, i) => {
            i.d(e, {
                c: () => a,
                h: () => o
            });
            const o = {
                    "&([hidden])": {
                        display: "none"
                    }
                },
                a = {
                    colorScheme: "light dark"
                }
        },
        6348: (t, e, i) => {
            i.d(e, {
                g: () => c
            });
            var o = i(6002),
                a = i(2526),
                n = i(5388),
                s = i(3747),
                r = i(1078),
                d = i(8745);
            const l = {
                    "xx-small": o.f,
                    "x-small": a.f,
                    small: n.f,
                    medium: s.f,
                    large: r.f,
                    "x-large": d.f,
                    inherit: "inherit"
                },
                c = t => l[t]
        },
        7435: (t, e, i) => {
            i.d(e, {
                f: () => o
            });
            const o = "'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif"
        },
        6878: (t, e, i) => {
            i.d(e, {
                f: () => o
            });
            const o = "calc(6px + 2.125ex)"
        },
        1078: (t, e, i) => {
            i.d(e, {
                f: () => o
            });
            const o = "clamp(1.27rem, 0.51vw + 1.16rem, 1.78rem)"
        },
        3747: (t, e, i) => {
            i.d(e, {
                f: () => o
            });
            const o = "clamp(1.13rem, 0.21vw + 1.08rem, 1.33rem)"
        },
        5388: (t, e, i) => {
            i.d(e, {
                f: () => o
            });
            const o = "1rem"
        },
        8745: (t, e, i) => {
            i.d(e, {
                f: () => o
            });
            const o = "clamp(1.42rem, 0.94vw + 1.23rem, 2.37rem)"
        },
        2526: (t, e, i) => {
            i.d(e, {
                f: () => o
            });
            const o = "clamp(0.81rem, 0.23vw + 0.77rem, 0.88rem)"
        },
        6002: (t, e, i) => {
            i.d(e, {
                f: () => o
            });
            const o = ".75rem"
        },
        6557: (t, e, i) => {
            i.d(e, {
                a: () => a,
                f: () => o
            });
            const o = "normal",
                a = "normal"
        },
        3212: (t, e, i) => {
            i.d(e, {
                f: () => o
            });
            const o = 400
        },
        1187: (t, e, i) => {
            i.d(e, {
                f: () => a
            });
            const o = "blur(32px)",
                a = {
                    WebkitBackdropFilter: o,
                    backdropFilter: o
                }
        },
        3361: (t, e, i) => {
            i.d(e, {
                g: () => a
            });
            i(3950);
            var o = i(4537);
            const a = (t, e) => ({
                "aria-disabled": (0, o.i)(t, e) ? "true" : null
            })
        },
        6611: (t, e, i) => {
            function o(t, e) {
                return t ?.closest(e)
            }
            i.d(e, {
                g: () => o
            })
        },
        5381: (t, e, i) => {
            i.d(e, {
                g: () => a
            });
            var o = i(3950);
            const a = (t, e) => `${e} is deprecated for component ${(0,o.j)(t)} and will be removed with next major release.`
        },
        74: (t, e, i) => {
            i.d(e, {
                h: () => o
            });
            const o = t => ({
                "@media(hover:hover)": t
            })
        },
        4537: (t, e, i) => {
            i.d(e, {
                i: () => o
            });
            const o = (t, e) => t || e
        },
        4418: (t, e, i) => {
            i.d(e, {
                i: () => a
            });
            var o = i(3950);
            const a = (t, e) => {
                const {
                    parentElement: i
                } = t;
                return i && (0, o.j)(i) === e
            }
        },
        4819: (t, e, i) => {
            i.d(e, {
                a: () => u,
                g: () => m,
                o: () => g
            });
            var o = i(3950),
                a = i(3017),
                n = i(6760),
                s = i(74),
                r = i(609),
                d = i(6348),
                l = i(2887),
                c = i(3036),
                h = i(5086),
                p = i(1187),
                b = i(6878);
            const f = t => t ? {
                    whiteSpace: "nowrap",
                    textIndent: "-999999px",
                    overflow: "hidden"
                } : {
                    whiteSpace: "inherit",
                    textIndent: 0,
                    overflow: "visible"
                },
                g = "-2px",
                u = "-4px",
                m = (t, e, i, m, v, k, w, x, L, y, A) => {
                    const {
                        primaryColor: $,
                        disabledColor: S,
                        hoverColor: C
                    } = (0, o.B)(A), {
                        primaryColor: _,
                        disabledColor: D,
                        hoverColor: O
                    } = (0, o.B)("dark"), P = (0, a.h)(t, e);
                    return {
                        "@global": {
                            ":host": { ...(0, o.d)({
                                    transform: "translate3d(0,0,0)",
                                    outline: 0,
                                    ...n.c,
                                    ...n.h
                                }),
                                ...(0, o.a)(v, (t => ({
                                    display: t ? "block" : "inline-block",
                                    width: t ? "100%" : "auto",
                                    ...!t && {
                                        verticalAlign: "top"
                                    }
                                })))
                            },
                            ...r.p
                        },
                        root: {
                            display: "flex",
                            width: "100%",
                            padding: 0,
                            margin: 0,
                            color: m ? S : $,
                            textDecoration: L ? "underline" : "none",
                            ...(0, o.u)(A, {
                                color: m ? D : _
                            }),
                            ...l.t,
                            ...(0, o.m)((0, o.a)(w, (t => ({
                                gap: t ? 0 : c.s
                            }))), (0, o.a)(v, (t => ({
                                justifyContent: t ? "space-between" : "flex-start",
                                alignItems: t ? "center" : "flex-start"
                            }))), (0, o.a)(k, (t => ({
                                fontSize: (0, d.g)(t)
                            })))),
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                top: g,
                                bottom: g,
                                ...(0, o.a)(w, (t => ({
                                    right: t ? g : u,
                                    left: t ? g : u
                                }))),
                                borderRadius: h.b,
                                transition: (0, o.q)("background-color"),
                                ...i && { ...p.f,
                                    backgroundColor: C,
                                    ...(0, o.u)(A, {
                                        backgroundColor: O
                                    })
                                }
                            },
                            ...!m && (0, s.h)({
                                "&:hover::before": { ...p.f,
                                    backgroundColor: C,
                                    ...(0, o.u)(A, {
                                        backgroundColor: O
                                    })
                                }
                            }),
                            ...!y && (0, o.J)(A, {
                                pseudo: !0,
                                offset: "-2px"
                            })
                        },
                        ...P ? {
                            icon: {
                                position: "relative",
                                flexShrink: "0",
                                width: b.f,
                                height: b.f,
                                "@supports (width: round(down, 1px, 1px))": {
                                    width: `round(down, ${b.f}, 1px)`,
                                    height: `round(down, ${b.f}, 1px)`
                                }
                            },
                            label: (0, o.m)({
                                zIndex: "1"
                            }, (0, o.a)(w, f), (0, o.a)(x, (t => ({
                                order: "left" === t || "start" === t ? -1 : 0
                            }))))
                        } : {
                            label: {
                                position: "relative"
                            }
                        }
                    }
                }
        },
        6639: (t, e, i) => {
            i.d(e, {
                L: () => s,
                g: () => a,
                l: () => n
            });
            var o = i(3950);
            const a = () => ({
                    loading: (0, o.N)()
                }),
                n = "loading",
                s = ({
                    loading: t,
                    initialLoading: e
                }) => (0, o.f)("span", {
                    id: n,
                    class: "loading",
                    role: "status"
                }, t ? "Loading" : e ? "Loading finished" : "")
        },
        4917: (t, e, i) => {
            i.r(e), i.d(e, {
                p_button_pure: () => k
            });
            var o = i(3950),
                a = i(8459),
                n = i(4537),
                s = i(2651),
                r = i(3017),
                d = i(5455),
                l = i(6339),
                c = i(4742),
                h = i(5774),
                p = i(2237),
                b = i(3361),
                f = i(4819),
                g = i(6639),
                u = i(6878);
            i(4418), i(5381), i(6760), i(609), i(6348), i(2887), i(4402), i(1187);
            const m = (t, e, i, a, n, s, d, l, c, h, p) => {
                    const b = (0, r.h)(t, e);
                    return (0, o.g)((0, o.m)((0, f.g)(t, e, i, n, s, d, l, c, h, !1, p), {
                        root: {
                            WebkitAppearance: "none",
                            appearance: "none",
                            background: "transparent",
                            textAlign: "start",
                            border: 0,
                            cursor: n ? "not-allowed" : "pointer"
                        },
                        ...!b && a && {
                            label: {
                                opacity: 0
                            },
                            icon: {
                                position: "absolute",
                                top: 0,
                                left: `calc(50% - ${u.f} / 2)`,
                                width: u.f,
                                height: u.f
                            }
                        },
                        ...(0, g.g)()
                    }))
                },
                v = {
                    type: o.A.oneOf(a.B),
                    name: o.A.string,
                    value: o.A.string,
                    disabled: o.A.boolean,
                    loading: o.A.boolean,
                    size: o.A.breakpoint(c.T),
                    weight: o.A.oneOf(h.T),
                    icon: o.A.string,
                    iconSource: o.A.string,
                    underline: o.A.boolean,
                    active: o.A.boolean,
                    hideLabel: o.A.breakpoint("boolean"),
                    alignLabel: o.A.breakpoint(p.A),
                    stretch: o.A.breakpoint("boolean"),
                    theme: o.A.oneOf(l.T),
                    aria: o.A.aria(a.a)
                },
                k = class {
                    constructor(t) {
                        (0, o.r)(this, t), this.initialLoading = !1, this.type = "submit", this.name = void 0, this.value = void 0, this.disabled = !1, this.loading = !1, this.size = "small", this.weight = "regular", this.icon = "arrow-right", this.iconSource = void 0, this.underline = !1, this.active = !1, this.hideLabel = !1, this.alignLabel = "end", this.stretch = !1, this.theme = "light", this.aria = void 0
                    }
                    get isDisabledOrLoading() {
                        return (0, n.i)(this.disabled, this.loading)
                    }
                    onClick(t) {
                        this.isDisabledOrLoading && t.stopPropagation()
                    }
                    connectedCallback() {
                        this.initialLoading = this.loading
                    }
                    componentWillLoad() {
                        this.initialLoading = this.loading
                    }
                    componentWillUpdate() {
                        this.loading && (this.initialLoading = !0)
                    }
                    componentShouldUpdate(t, e) {
                        return (0, o.h)(t, e)
                    }
                    componentDidLoad() {
                        (0, s.i)(this.host, (() => this.type), (() => this.isDisabledOrLoading), (() => this.name), (() => this.value))
                    }
                    render() {
                        var t, e, i, a;
                        (0, o.v)(this, v), t = this.host, e = this.loading, i = this.icon, a = this.iconSource, e && !(0, r.h)(i, a) && (0, o.c)(`combination of properties icon='${i}' and loading='${e}' for component ${(0,o.j)(t)} is not supported.`, t), (0, r.w)(this.host, this.icon, this.iconSource);
                        (0, d.w)(this, "alignLabel", {
                            left: "start",
                            right: "end"
                        }), (0, o.e)(this.host, m, this.icon, this.iconSource, this.active, this.loading, this.isDisabledOrLoading, this.stretch, this.size, this.hideLabel, this.alignLabel, this.underline, this.theme);
                        const n = (0, r.h)(this.icon, this.iconSource),
                            s = {
                                class: "icon",
                                size: "inherit",
                                theme: this.theme
                            },
                            l = (0, o.k)(this.host);
                        return (0, o.f)(o.K, {
                            key: "e73bafa9f90dc23da4911dfbb17fb467dc6c4d6b"
                        }, (0, o.f)("button", {
                            key: "6740470dd82889d321a3094cfea09a24c7bb3fb5",
                            ...(c = this.disabled, h = this.loading, p = this.aria, { ...(0, o.H)(p),
                                ...(0, b.g)(c, h)
                            }),
                            class: "root",
                            type: this.type,
                            name: this.name,
                            value: this.value,
                            "aria-describedby": this.loading ? g.l : void 0
                        }, this.loading ? (0, o.f)(l.pSpinner, { ...s,
                            "aria-hidden": "true"
                        }) : n && (0, o.f)(l.pIcon, { ...s,
                            name: this.icon,
                            source: this.iconSource,
                            color: this.isDisabledOrLoading ? "state-disabled" : "primary",
                            theme: this.theme,
                            "aria-hidden": "true"
                        }), (0, o.f)("span", {
                            key: "7e224eab8ccae3ccce9f7b41397f490907807d3d",
                            class: "label"
                        }, (0, o.f)("slot", {
                            key: "d9c8d1ca1a55cc3bf73f44effbe86c8d371d2cee"
                        }))), (0, o.f)(g.L, {
                            key: "1ca0959f2e763212af72a0ecf0a3ea2dc83886ed",
                            loading: this.loading,
                            initialLoading: this.initialLoading
                        }));
                        var c, h, p
                    }
                    static get delegatesFocus() {
                        return !0
                    }
                    get host() {
                        return (0, o.i)(this)
                    }
                }
        },
        609: (t, e, i) => {
            i.d(e, {
                p: () => o
            });
            const o = {
                ":not(:defined,[data-ssr])": {
                    visibility: "hidden"
                }
            }
        },
        6539: (t, e, i) => {
            i.d(e, {
                s: () => o
            });
            const o = (t, e) => {
                for (const i of Object.entries(e)) t.setAttribute(...i)
            }
        },
        3036: (t, e, i) => {
            i.d(e, {
                s: () => o
            });
            const o = "4px"
        },
        4742: (t, e, i) => {
            i.d(e, {
                T: () => o
            });
            const o = ["xx-small", "x-small", "small", "medium", "large", "x-large", "inherit"]
        },
        4402: (t, e, i) => {
            i.d(e, {
                _: () => d,
                a: () => l,
                f: () => r
            });
            var o = i(7435),
                a = i(6878),
                n = i(3212),
                s = i(6557);
            const r = {
                    overflowWrap: "break-word",
                    hyphens: "auto"
                },
                d = `${s.f} ${s.a} ${n.f} `,
                l = `/${a.f} ${o.f}`
        },
        2887: (t, e, i) => {
            i.d(e, {
                t: () => n
            });
            var o = i(4402),
                a = i(5388);
            const n = {
                font: `${o._}${a.f}${o.a}`,
                ...o.f
            }
        },
        6339: (t, e, i) => {
            i.d(e, {
                T: () => o
            });
            const o = ["light", "dark", "auto"]
        },
        5774: (t, e, i) => {
            i.d(e, {
                T: () => o
            });
            const o = ["regular", "semi-bold", "bold", "thin", "semibold"]
        },
        5455: (t, e, i) => {
            i.d(e, {
                w: () => n
            });
            var o = i(5381),
                a = i(3950);
            const n = (t, e, i) => {
                const n = t[e];
                if (i[n]) {
                    const s = (0, o.g)(t.host, `${e}='${n}'`);
                    (0, a.c)(s, `Please use ${e}='${i[n]}' instead.`, t.host)
                }
            }
        }
    }
]);