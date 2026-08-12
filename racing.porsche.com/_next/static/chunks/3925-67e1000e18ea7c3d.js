"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [1812, 3925], {
        25416: (e, a, l) => {
            l.d(a, {
                I: () => E
            });
            var t = l(6029),
                i = l(72813),
                n = l(81085),
                s = l(86590),
                r = l(43914),
                d = l(15617),
                o = l(45253),
                c = l(8711),
                h = l(22814),
                u = l(24561),
                p = l(71024),
                b = l.n(p),
                x = l(51536),
                g = l(33824),
                m = l(93066),
                j = l(8128),
                y = l(41812);
            let v = b()(() => Promise.all([l.e(4820), l.e(9074), l.e(8516), l.e(7172), l.e(244), l.e(6964), l.e(3382), l.e(1250), l.e(4155)]).then(l.bind(l, 54155)).then(e => e.CldVideoPlayerProvider), {
                    loadableGenerated: {
                        webpack: () => [54155]
                    }
                }),
                f = b()(() => Promise.all([l.e(4820), l.e(9074), l.e(8516), l.e(7172), l.e(244), l.e(6964), l.e(3382), l.e(1250), l.e(4155)]).then(l.bind(l, 54155)).then(e => e.CldVideo), {
                    loadableGenerated: {
                        webpack: () => [54155]
                    }
                }),
                w = b()(() => Promise.all([l.e(4820), l.e(9074), l.e(8516), l.e(7172), l.e(244), l.e(6964), l.e(3382), l.e(1250), l.e(4155)]).then(l.bind(l, 54155)).then(e => e.CldVideoTogglePlay), {
                    loadableGenerated: {
                        webpack: () => [54155]
                    }
                }),
                E = e => {
                    let {
                        title: a,
                        subtitle: l,
                        link: p,
                        linkLabel: b,
                        heroAsset: E,
                        primaryComponent: k,
                        overTitleComponent: D
                    } = e, {
                        state: {
                            hasLiveTicker: C,
                            dashboardId: T
                        }
                    } = (0, m.CU)();
                    return (0, t.jsx)(v, {
                        autoplay: !0,
                        muted: !0,
                        loop: !0,
                        children: (0, t.jsxs)(i.a, {
                            position: "relative",
                            w: "100%",
                            h: C ? "screenHeightWithLiveTicker" : "100svh",
                            overflow: "hidden",
                            children: [(0, n.jT)(E) && (0, t.jsx)(t.Fragment, {
                                children: (0, n.QR)(E) ? (0, t.jsxs)(t.Fragment, {
                                    children: [(0, t.jsx)(w, {
                                        mobile: !0,
                                        sx: {
                                            display: "flex",
                                            position: "absolute",
                                            right: "var(--space-5)",
                                            top: "var(--space-16)",
                                            zIndex: 2,
                                            [s.JM.md]: {
                                                display: "none"
                                            }
                                        }
                                    }), (0, t.jsx)(f, {
                                        cloudinaryAsset: E,
                                        aiTagPosition: {
                                            base: "top-left",
                                            md: "top-right"
                                        },
                                        aiTagOffset: r.i1.wrapperAlignedBelowNav,
                                        wrapperProps: {
                                            position: "absolute",
                                            zIndex: 0,
                                            borderRadius: "unset"
                                        },
                                        loop: !0,
                                        playsinline: !0,
                                        preload: "auto"
                                    })]
                                }) : (0, t.jsx)(d.d, {
                                    cloudinaryAsset: E,
                                    aiTagPosition: "top-right",
                                    aiTagOffset: r.i1.wrapperAlignedBelowNav,
                                    priority: !0,
                                    fill: !0,
                                    wrapperProps: {
                                        position: "absolute",
                                        borderRadius: "unset"
                                    },
                                    position: "absolute",
                                    sx: {
                                        width: "100%",
                                        height: "100%"
                                    }
                                })
                            }), (0, t.jsx)(i.a, {
                                position: "absolute",
                                top: "0",
                                left: "0",
                                width: "100%",
                                height: "100%",
                                minHeight: "100%",
                                opacity: .7,
                                bgGradient: "linear-gradient(to bottom, transparent, porscheBlack)",
                                zIndex: 0
                            }), (0, t.jsx)(i.a, {
                                position: "absolute",
                                bottom: "0",
                                left: "0",
                                width: "100%",
                                children: (0, t.jsx)(u.H, {
                                    children: (0, t.jsx)(g.a, {
                                        children: (0, t.jsxs)(o.s, {
                                            flexDir: {
                                                base: "column",
                                                s: "row"
                                            },
                                            gap: {
                                                base: 4,
                                                s: 8
                                            },
                                            pb: {
                                                base: 16,
                                                s: 20
                                            },
                                            position: "relative",
                                            children: [(0, t.jsxs)(o.s, {
                                                flexDir: "column",
                                                justifyContent: "end",
                                                flex: 2,
                                                maxW: "48rem",
                                                children: [T && (0, t.jsx)(y.DashboardWidgetLauncher, {
                                                    heroHasVideoAsset: !!(0, n.jT)(E) && !!(0, n.QR)(E)
                                                }), D, (0, t.jsx)(x.M, {
                                                    title: a,
                                                    isLight: !1
                                                }), l && (0, t.jsx)(c.E, {
                                                    color: "allWhite",
                                                    mt: 4,
                                                    sx: {
                                                        textWrap: "balance"
                                                    },
                                                    children: l
                                                }), p && (0, t.jsx)(j.w, {
                                                    sx: {
                                                        mt: "var(--space-4)",
                                                        [s.JM.md]: {
                                                            mt: "var(--space-8)"
                                                        }
                                                    },
                                                    renderAs: h.N,
                                                    item: p,
                                                    theme: "dark",
                                                    alignSelf: "start",
                                                    children: null != b ? b : null
                                                })]
                                            }), (0, t.jsx)(o.s, {
                                                alignItems: "flex-end",
                                                justifyContent: {
                                                    base: "flex-start",
                                                    s: "flex-end"
                                                },
                                                flexDir: {
                                                    base: "column",
                                                    ndlDashboardGrid: "row"
                                                },
                                                w: "100%",
                                                flex: 1,
                                                children: (0, t.jsxs)(o.s, {
                                                    alignItems: "center",
                                                    children: [k, (0, n.jT)(E) && (0, n.QR)(E) && (0, t.jsx)(w, {
                                                        sx: {
                                                            display: "none",
                                                            [s.JM.md]: {
                                                                display: "flex"
                                                            }
                                                        }
                                                    })]
                                                })
                                            })]
                                        })
                                    })
                                })
                            })]
                        })
                    })
                }
        },
        33824: (e, a, l) => {
            l.d(a, {
                a: () => d
            });
            var t = l(6029),
                i = l(72813),
                n = l(2667),
                s = l(3141),
                r = l(55729);
            let d = e => {
                let {
                    delay: a = 0,
                    children: l
                } = e, [d, o] = (0, r.useState)(!1), c = (0, n.s)();
                return (0, r.useEffect)(() => {
                    d || (c.start("visible"), o(!0))
                }, [c, d]), (0, t.jsx)(i.a, {
                    as: s.P.div,
                    animate: c,
                    initial: "hidden",
                    variants: {
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: .6,
                                ease: [0, .34, .58, 1],
                                delay: a
                            }
                        },
                        hidden: {
                            opacity: 0,
                            y: 20
                        }
                    },
                    children: l
                })
            }
        },
        41812: (e, a, l) => {
            l.r(a), l.d(a, {
                DashboardWidgetLauncher: () => x
            });
            var t = l(6029),
                i = l(55729),
                n = l(81278),
                s = l(93066),
                r = l(96538),
                d = l(91753),
                o = l(70659),
                c = l(84721),
                h = l(25915),
                u = l(51225),
                p = l(48788),
                b = l(80321);
            let x = e => {
                var a, l;
                let {
                    heroHasVideoAsset: x = !1,
                    ...g
                } = e, {
                    locale: m,
                    isPreview: j
                } = (0, n.useRouter)(), [y, v] = (0, i.useState)(null), {
                    setCanAnimate: f,
                    layoutReady: w,
                    updateLayout: E,
                    canAnimate: k
                } = (0, h.Wh)(), {
                    state: {
                        isDashboardOpen: D,
                        dashboardId: C,
                        pageType: T,
                        pageId: G,
                        pageContentTags: S
                    },
                    dispatch: I
                } = (0, s.CU)(), {
                    data: L
                } = (0, u.c7)({
                    id: null != C ? C : "",
                    locale: m,
                    preview: !!j
                });
                (0, i.useEffect)(() => {
                    var e, a, l;
                    (null == L || null == (l = L.dashboard) || null == (a = l.widgetLauncherAsset) || null == (e = a[0]) ? void 0 : e.public_id) && v((0, r.UW)({
                        src: L.dashboard.widgetLauncherAsset[0].public_id,
                        width: 250,
                        height: 250,
                        crop: "thumb",
                        gravity: "auto"
                    }))
                }, [null == L || null == (a = L.dashboard) ? void 0 : a.widgetLauncherAsset]);
                let P = () => {
                        E(), f(!0);
                        let e = !D;
                        (0, b.yn)({
                            eventAction: e ? b.wT.dashboardOpen : b.wT.dashboardClose,
                            locale: m,
                            pageExperience: {
                                pageCategory: T,
                                contentTags: null != S ? S : []
                            },
                            context: {
                                moduleName: b.B7.dashboard
                            },
                            componentClick: {
                                clickElementType: "interaction",
                                clickElementId: G,
                                clickElementName: "Launcher"
                            }
                        }), I({
                            type: "SET_IS_DASHBOARD_OPEN",
                            payload: e
                        })
                    },
                    z = ((e, a) => e || a ? a ?.33 : .75 : 0)(k, !!D);
                return (null == L || null == (l = L.dashboard) ? void 0 : l.showDashboard) ? (0, t.jsx)(d.e, {
                    "data-group": !0,
                    id: h.nJ["widget-launcher"],
                    position: {
                        base: "relative",
                        ndlDashboardGrid: "absolute"
                    },
                    zIndex: D || k ? 2e3 : 5,
                    pointerEvents: D ? "none" : "auto",
                    bottom: {
                        base: "auto",
                        ndlDashboardGrid: x ? 40 : 20
                    },
                    right: {
                        base: "auto",
                        ndlDashboardGrid: 0
                    },
                    width: {
                        base: "95px",
                        ndlDashboardGrid: "125px"
                    },
                    height: {
                        base: "95px",
                        ndlDashboardGrid: "125px"
                    },
                    mb: {
                        base: 6,
                        ndlDashboardGrid: 0
                    },
                    ...g,
                    role: "button",
                    tabIndex: 0,
                    "aria-label": D ? "Close dashboard" : "Open dashboard",
                    cursor: "pointer",
                    isolation: "isolate",
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: w && y ? 1 : 0
                    },
                    transition: {
                        duration: .6,
                        ease: [0, .34, .58, 1],
                        delay: .1
                    },
                    onClick: P,
                    onKeyDown: e => {
                        ("Enter" === e.key || " " === e.key) && (e.preventDefault(), P())
                    },
                    children: (0, t.jsx)(d.e, {
                        className: "dashboard-widget-launcher-inner",
                        position: "absolute",
                        inset: 0,
                        zIndex: 999,
                        borderRadius: "ndlRadiusSmall",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: +!D,
                            y: w && y ? 0 : 20
                        },
                        transition: {
                            duration: .6,
                            ease: p.Jr,
                            delay: z
                        },
                        backgroundImage: null != y ? y : void 0,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        children: (0, t.jsx)(o.U, {
                            size: "full",
                            colorScheme: "transparentBlack",
                            borderRadius: "ndlRadiusSmall",
                            width: 12,
                            height: 12,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backdropFilter: "blur(var(--blur-ndlFrostedGlassHigh))",
                            transitionProperty: "all",
                            transitionDuration: "short",
                            _groupHover: {
                                backgroundColor: "ndlTransparencyGreyHover"
                            },
                            children: (0, t.jsx)(c.E, {
                                name: "grid",
                                color: "white"
                            })
                        })
                    })
                }) : null
            };
            x.displayName = "DashboardWidgetLauncher"
        },
        51536: (e, a, l) => {
            l.d(a, {
                M: () => s
            });
            var t = l(6029),
                i = l(36760),
                n = l(98168);
            let s = e => {
                let {
                    title: a,
                    overTitleComponent: l,
                    underTitleComponent: s,
                    isLight: r = !0
                } = e;
                return (0, t.jsxs)(i.T, {
                    align: "start",
                    spacing: 2,
                    color: r ? "porscheBlack" : "allWhite",
                    children: [l, (0, t.jsx)(n.D, {
                        as: "h1",
                        size: "displaySmall",
                        sx: {
                            textWrap: "balance"
                        },
                        children: a
                    }), s]
                })
            }
        },
        68396: (e, a, l) => {
            l.d(a, {
                C: () => u
            });
            var t = l(6029),
                i = l(72813),
                n = l(94699),
                s = l(48643),
                r = l(8711),
                d = l(98168),
                o = l(69747),
                c = l(15407),
                h = l(93972);
            let u = e => {
                var a;
                let {
                    introductionCaption: l,
                    introduction: u,
                    introColumn1: p,
                    introColumn2: b,
                    introHeading: x,
                    hasTopPadding: g = !0
                } = e, m = "aiGenerated" in e ? e.aiGenerated : void 0, j = (0, h.DO)(m), y = x && p && b, v = !!(null != (a = null != l ? l : u) ? a : y);
                return v || j ? (0, t.jsxs)(o.R, {
                    pt: g ? {
                        base: 10,
                        s: 20
                    } : {
                        base: 0,
                        s: 0
                    },
                    children: [j && (0, t.jsx)(i.a, {
                        pb: v ? {
                            base: 5,
                            md: 10
                        } : 0,
                        children: (0, t.jsx)(h.OI, {
                            aiGenerated: m
                        })
                    }), v && (0, t.jsxs)(t.Fragment, {
                        children: [(0, t.jsxs)(n.x, {
                            templateColumns: c.y9,
                            gap: c.T_,
                            children: [l && (0, t.jsx)(s.E, {
                                colStart: 1,
                                colEnd: {
                                    base: 3,
                                    l: 4
                                },
                                children: (0, t.jsx)(r.E, {
                                    size: "caption",
                                    color: "grey300",
                                    mt: {
                                        base: 0,
                                        s: 3
                                    },
                                    children: l
                                })
                            }), (0, t.jsx)(s.E, {
                                colStart: {
                                    base: 1,
                                    l: 4
                                },
                                colEnd: {
                                    base: 3,
                                    l: 10
                                },
                                children: u && (0, t.jsx)(r.E, {
                                    size: "x-large",
                                    children: u
                                })
                            })]
                        }), y && (0, t.jsxs)(n.x, {
                            templateColumns: c.y9,
                            gap: c.T_,
                            pt: {
                                base: 10,
                                s: 20
                            },
                            children: [(0, t.jsx)(s.E, {
                                colStart: {
                                    base: 1
                                },
                                colEnd: {
                                    base: 3,
                                    l: 4
                                },
                                children: (0, t.jsx)(d.D, {
                                    as: "h2",
                                    size: "headingLarge",
                                    fontWeight: 400,
                                    children: x
                                })
                            }), (0, t.jsx)(s.E, {
                                colStart: {
                                    base: 1,
                                    l: 4
                                },
                                colEnd: {
                                    base: 3,
                                    l: 7
                                },
                                children: (0, t.jsx)(r.E, {
                                    size: "medium",
                                    children: p
                                })
                            }), (0, t.jsx)(s.E, {
                                colStart: {
                                    base: 1,
                                    l: 7
                                },
                                colEnd: {
                                    base: 3,
                                    l: 10
                                },
                                children: (0, t.jsx)(r.E, {
                                    size: "medium",
                                    children: b
                                })
                            })]
                        })]
                    })]
                }) : null
            }
        },
        93972: (e, a, l) => {
            l.d(a, {
                pY: () => h,
                OI: () => c,
                DO: () => o
            });
            var t = l(6029),
                i = l(64873),
                n = l(94699),
                s = l(48643),
                r = l(16505),
                d = l(15407);
            let o = e => "generated" === e ? "pageGenerated" : "modified" === e ? "pageModified" : null,
                c = e => {
                    let {
                        aiGenerated: a
                    } = e, l = o(a), {
                        label: c
                    } = (0, i.L)(null != l ? l : "pageGenerated");
                    return l ? (0, t.jsx)(n.x, {
                        templateColumns: d.y9,
                        gap: d.T_,
                        children: (0, t.jsx)(s.E, {
                            colStart: {
                                base: 1,
                                l: 4
                            },
                            colEnd: {
                                base: 3,
                                l: 10
                            },
                            children: (0, t.jsx)(r.L, {
                                length: "long",
                                label: c,
                                kind: "text",
                                maxWidth: {
                                    base: "100%",
                                    l: "316px"
                                }
                            })
                        })
                    }) : null
                },
                h = e => {
                    var a;
                    let {
                        aiGenerated: l,
                        mode: n = "standard",
                        ...s
                    } = e, d = "generated" === (a = l) ? "generated" : "modified" === a ? "modified" : null, {
                        label: o,
                        srLabel: c
                    } = (0, i.L)(null != d ? d : "generated", "audio");
                    return d ? (0, t.jsx)(r.L, {
                        kind: "audio",
                        label: o,
                        srLabel: c,
                        mode: n,
                        ...s
                    }) : null
                }
        }
    }
]);
//# sourceMappingURL=3925-67e1000e18ea7c3d.js.map