"use strict";
(self.webpackChunkPorscheDesignSystem_3_23_0 = self.webpackChunkPorscheDesignSystem_3_23_0 || []).push([
    ["link-pure"], {
        2237: (e, t, o) => {
            o.d(t, {
                A: () => i
            });
            const i = ["start", "end", "left", "right"]
        },
        5086: (e, t, o) => {
            o.d(t, {
                b: () => i
            });
            const i = "4px"
        },
        3017: (e, t, o) => {
            o.d(t, {
                h: () => n,
                w: () => a
            });
            var i = o(3950),
                r = o(4418);
            const n = (e, t) => "none" !== e || !!t,
                a = (e, t, o) => {
                    !n(t, o) && (0, r.i)(e, "p-text") && (0, i.c)(`${(0,i.j)(e)} should not be used inside p-text. Please use a <button> or <a> tag.`, e)
                }
        },
        6760: (e, t, o) => {
            o.d(t, {
                c: () => r,
                h: () => i
            });
            const i = {
                    "&([hidden])": {
                        display: "none"
                    }
                },
                r = {
                    colorScheme: "light dark"
                }
        },
        6348: (e, t, o) => {
            o.d(t, {
                g: () => c
            });
            var i = o(6002),
                r = o(2526),
                n = o(5388),
                a = o(3747),
                s = o(1078),
                l = o(8745);
            const d = {
                    "xx-small": i.f,
                    "x-small": r.f,
                    small: n.f,
                    medium: a.f,
                    large: s.f,
                    "x-large": l.f,
                    inherit: "inherit"
                },
                c = e => d[e]
        },
        7435: (e, t, o) => {
            o.d(t, {
                f: () => i
            });
            const i = "'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif"
        },
        6878: (e, t, o) => {
            o.d(t, {
                f: () => i
            });
            const i = "calc(6px + 2.125ex)"
        },
        1078: (e, t, o) => {
            o.d(t, {
                f: () => i
            });
            const i = "clamp(1.27rem, 0.51vw + 1.16rem, 1.78rem)"
        },
        3747: (e, t, o) => {
            o.d(t, {
                f: () => i
            });
            const i = "clamp(1.13rem, 0.21vw + 1.08rem, 1.33rem)"
        },
        5388: (e, t, o) => {
            o.d(t, {
                f: () => i
            });
            const i = "1rem"
        },
        8745: (e, t, o) => {
            o.d(t, {
                f: () => i
            });
            const i = "clamp(1.42rem, 0.94vw + 1.23rem, 2.37rem)"
        },
        2526: (e, t, o) => {
            o.d(t, {
                f: () => i
            });
            const i = "clamp(0.81rem, 0.23vw + 0.77rem, 0.88rem)"
        },
        6002: (e, t, o) => {
            o.d(t, {
                f: () => i
            });
            const i = ".75rem"
        },
        6557: (e, t, o) => {
            o.d(t, {
                a: () => r,
                f: () => i
            });
            const i = "normal",
                r = "normal"
        },
        3212: (e, t, o) => {
            o.d(t, {
                f: () => i
            });
            const i = 400
        },
        1187: (e, t, o) => {
            o.d(t, {
                f: () => r
            });
            const i = "blur(32px)",
                r = {
                    WebkitBackdropFilter: i,
                    backdropFilter: i
                }
        },
        5873: (e, t, o) => {
            o.d(t, {
                g: () => n
            });
            var i = o(9171),
                r = o(7);

            function n(e, t) {
                return (0, r.t)(t).split(",").flatMap((t => (0, i.g)(e, t)))
            }
        },
        9171: (e, t, o) => {
            function i(e, t) {
                return e ? Array.from(e.querySelectorAll(t)) : []
            }
            o.d(t, {
                g: () => i
            })
        },
        295: (e, t, o) => {
            o.d(t, {
                g: () => n
            });
            var i = o(3950),
                r = o(5873);

            function n(e, t) {
                const o = (0, r.g)(e, t);
                return 1 !== o.length && (0, i.t)(`${(0,i.j)(e)} has to contain a single direct child of: ${t}`), o[0]
            }
        },
        5381: (e, t, o) => {
            o.d(t, {
                g: () => r
            });
            var i = o(3950);
            const r = (e, t) => `${t} is deprecated for component ${(0,i.j)(e)} and will be removed with next major release.`
        },
        74: (e, t, o) => {
            o.d(t, {
                h: () => i
            });
            const i = e => ({
                "@media(hover:hover)": e
            })
        },
        2396: (e, t, o) => {
            o.d(t, {
                i: () => i
            });
            const i = e => e.hasAttribute("data-ssr")
        },
        4418: (e, t, o) => {
            o.d(t, {
                i: () => r
            });
            var i = o(3950);
            const r = (e, t) => {
                const {
                    parentElement: o
                } = e;
                return o && (0, i.j)(o) === t
            }
        },
        6806: (e, t, o) => {
            o.d(t, {
                L: () => i
            });
            const i = ["aria-label", "aria-current", "aria-haspopup"]
        },
        4819: (e, t, o) => {
            o.d(t, {
                a: () => b,
                g: () => m,
                o: () => g
            });
            var i = o(3950),
                r = o(3017),
                n = o(6760),
                a = o(74),
                s = o(609),
                l = o(6348),
                d = o(2887),
                c = o(3036),
                h = o(5086),
                f = o(1187),
                p = o(6878);
            const u = e => e ? {
                    whiteSpace: "nowrap",
                    textIndent: "-999999px",
                    overflow: "hidden"
                } : {
                    whiteSpace: "inherit",
                    textIndent: 0,
                    overflow: "visible"
                },
                g = "-2px",
                b = "-4px",
                m = (e, t, o, m, v, w, x, k, A, $, y) => {
                    const {
                        primaryColor: S,
                        disabledColor: C,
                        hoverColor: _
                    } = (0, i.B)(y), {
                        primaryColor: L,
                        disabledColor: j,
                        hoverColor: z
                    } = (0, i.B)("dark"), I = (0, r.h)(e, t);
                    return {
                        "@global": {
                            ":host": { ...(0, i.d)({
                                    transform: "translate3d(0,0,0)",
                                    outline: 0,
                                    ...n.c,
                                    ...n.h
                                }),
                                ...(0, i.a)(v, (e => ({
                                    display: e ? "block" : "inline-block",
                                    width: e ? "100%" : "auto",
                                    ...!e && {
                                        verticalAlign: "top"
                                    }
                                })))
                            },
                            ...s.p
                        },
                        root: {
                            display: "flex",
                            width: "100%",
                            padding: 0,
                            margin: 0,
                            color: m ? C : S,
                            textDecoration: A ? "underline" : "none",
                            ...(0, i.u)(y, {
                                color: m ? j : L
                            }),
                            ...d.t,
                            ...(0, i.m)((0, i.a)(x, (e => ({
                                gap: e ? 0 : c.s
                            }))), (0, i.a)(v, (e => ({
                                justifyContent: e ? "space-between" : "flex-start",
                                alignItems: e ? "center" : "flex-start"
                            }))), (0, i.a)(w, (e => ({
                                fontSize: (0, l.g)(e)
                            })))),
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                top: g,
                                bottom: g,
                                ...(0, i.a)(x, (e => ({
                                    right: e ? g : b,
                                    left: e ? g : b
                                }))),
                                borderRadius: h.b,
                                transition: (0, i.q)("background-color"),
                                ...o && { ...f.f,
                                    backgroundColor: _,
                                    ...(0, i.u)(y, {
                                        backgroundColor: z
                                    })
                                }
                            },
                            ...!m && (0, a.h)({
                                "&:hover::before": { ...f.f,
                                    backgroundColor: _,
                                    ...(0, i.u)(y, {
                                        backgroundColor: z
                                    })
                                }
                            }),
                            ...!$ && (0, i.J)(y, {
                                pseudo: !0,
                                offset: "-2px"
                            })
                        },
                        ...I ? {
                            icon: {
                                position: "relative",
                                flexShrink: "0",
                                width: p.f,
                                height: p.f,
                                "@supports (width: round(down, 1px, 1px))": {
                                    width: `round(down, ${p.f}, 1px)`,
                                    height: `round(down, ${p.f}, 1px)`
                                }
                            },
                            label: (0, i.m)({
                                zIndex: "1"
                            }, (0, i.a)(x, u), (0, i.a)(k, (e => ({
                                order: "left" === e || "start" === e ? -1 : 0
                            }))))
                        } : {
                            label: {
                                position: "relative"
                            }
                        }
                    }
                }
        },
        7113: (e, t, o) => {
            o.r(t), o.d(t, {
                p_link_pure: () => m
            });
            var i = o(3950),
                r = o(6806),
                n = o(3017),
                a = o(2396),
                s = o(5455),
                l = o(6339),
                d = o(4742),
                c = o(5774),
                h = o(292),
                f = o(2237),
                p = o(4819),
                u = o(5086);
            o(4418), o(5381), o(295), o(6760), o(609), o(6348), o(2887), o(4402), o(1187);
            const g = (e, t, o, r, n, a, s, l, d, c) => (0, i.g)((0, i.m)((0, p.g)(e, t, o, !1, r, n, a, s, l, d, c), d && {
                    "@global": (0, i.d)({
                        "::slotted": {
                            "&(a)": { ...i.ah,
                                textDecoration: l ? "underline" : "none",
                                font: "inherit",
                                color: "inherit"
                            },
                            "&(a)::before": {
                                content: '""',
                                position: "fixed",
                                insetBlock: p.o,
                                borderRadius: u.b,
                                ...(0, i.a)(a, (e => ({
                                    insetInline: e ? p.o : p.a
                                })))
                            },
                            ...(0, i.J)(c, {
                                slotted: "a",
                                pseudo: !0,
                                offset: "-2px"
                            })
                        }
                    })
                })),
                b = {
                    alignLabel: i.A.breakpoint(f.A),
                    stretch: i.A.breakpoint("boolean"),
                    size: i.A.breakpoint(d.T),
                    weight: i.A.oneOf(c.T),
                    icon: i.A.string,
                    iconSource: i.A.string,
                    underline: i.A.boolean,
                    href: i.A.string,
                    active: i.A.boolean,
                    hideLabel: i.A.breakpoint("boolean"),
                    theme: i.A.oneOf(l.T),
                    target: i.A.string,
                    download: i.A.string,
                    rel: i.A.string,
                    aria: i.A.aria(r.L)
                },
                m = class {
                    constructor(e) {
                        (0, i.r)(this, e), this.alignLabel = "end", this.stretch = !1, this.size = "small", this.weight = "regular", this.icon = "arrow-right", this.iconSource = void 0, this.underline = !1, this.href = void 0, this.active = !1, this.hideLabel = !1, this.theme = "light", this.target = "_self", this.download = void 0, this.rel = void 0, this.aria = void 0
                    }
                    componentWillLoad() {
                        (0, a.i)(this.host) || (0, h.t)(this.host, this.href)
                    }
                    componentShouldUpdate(e, t) {
                        return (0, i.h)(e, t)
                    }
                    render() {
                        (0, i.v)(this, b), (0, n.w)(this.host, this.icon, this.iconSource);
                        (0, s.w)(this, "alignLabel", {
                            left: "start",
                            right: "end"
                        }), (0, i.e)(this.host, g, this.icon, this.iconSource, this.active, this.stretch, this.size, this.hideLabel, this.alignLabel, this.underline, !this.href, this.theme);
                        const e = void 0 === this.href ? "span" : "a",
                            t = (0, i.k)(this.host),
                            o = (0, n.h)(this.icon, this.iconSource);
                        return (0, i.f)(e, {
                            key: "cc22b7f0bad10ae68f49147383ee9012550b050a",
                            class: "root",
                            ..."a" === e && {
                                href: this.href,
                                target: this.target,
                                download: this.download,
                                rel: this.rel,
                                ...(0, i.H)(this.aria)
                            }
                        }, o && (0, i.f)(t.pIcon, {
                            key: "895e14b50d59021fe6649ecb2901e5cf66fd33f3",
                            class: "icon",
                            size: "inherit",
                            name: this.icon,
                            source: this.iconSource,
                            theme: this.theme,
                            "aria-hidden": "true"
                        }), (0, i.f)("span", {
                            key: "05288ed1b2a6aca02dae192b65fbce2dae424c23",
                            class: "label"
                        }, (0, i.f)("slot", {
                            key: "4663cc241af7830cfe8267c199c503b7ea0eb542"
                        })))
                    }
                    static get delegatesFocus() {
                        return !0
                    }
                    get host() {
                        return (0, i.i)(this)
                    }
                }
        },
        609: (e, t, o) => {
            o.d(t, {
                p: () => i
            });
            const i = {
                ":not(:defined,[data-ssr])": {
                    visibility: "hidden"
                }
            }
        },
        3036: (e, t, o) => {
            o.d(t, {
                s: () => i
            });
            const i = "4px"
        },
        4742: (e, t, o) => {
            o.d(t, {
                T: () => i
            });
            const i = ["xx-small", "x-small", "small", "medium", "large", "x-large", "inherit"]
        },
        4402: (e, t, o) => {
            o.d(t, {
                _: () => l,
                a: () => d,
                f: () => s
            });
            var i = o(7435),
                r = o(6878),
                n = o(3212),
                a = o(6557);
            const s = {
                    overflowWrap: "break-word",
                    hyphens: "auto"
                },
                l = `${a.f} ${a.a} ${n.f} `,
                d = `/${r.f} ${i.f}`
        },
        2887: (e, t, o) => {
            o.d(t, {
                t: () => n
            });
            var i = o(4402),
                r = o(5388);
            const n = {
                font: `${i._}${r.f}${i.a}`,
                ...i.f
            }
        },
        6339: (e, t, o) => {
            o.d(t, {
                T: () => i
            });
            const i = ["light", "dark", "auto"]
        },
        292: (e, t, o) => {
            o.d(t, {
                t: () => n
            });
            var i = o(3950),
                r = o(295);
            const n = (e, t) => {
                let o = t && e.children.length > 0;
                if (!o || !t) try {
                    t || (0, r.g)(e, "a")
                } catch {
                    o = !0
                }
                o && (0, i.t)(`usage of ${(0,i.j)(e)} is not valid. Please provide a href property or a single and direct <a> child element.`)
            }
        },
        7: (e, t, o) => {
            o.d(t, {
                t: () => i
            });
            const i = e => e.split(",").map((e => `:scope>${e}`)).join()
        },
        5774: (e, t, o) => {
            o.d(t, {
                T: () => i
            });
            const i = ["regular", "semi-bold", "bold", "thin", "semibold"]
        },
        5455: (e, t, o) => {
            o.d(t, {
                w: () => n
            });
            var i = o(5381),
                r = o(3950);
            const n = (e, t, o) => {
                const n = e[t];
                if (o[n]) {
                    const a = (0, i.g)(e.host, `${t}='${n}'`);
                    (0, r.c)(a, `Please use ${t}='${o[n]}' instead.`, e.host)
                }
            }
        }
    }
]);