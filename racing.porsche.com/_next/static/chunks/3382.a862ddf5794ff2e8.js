"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [3382], {
        50887: (e, i, t) => {
            t.d(i, {
                FN: () => l,
                Vf: () => n.Jq,
                aL: () => n.s3,
                lo: () => n.Vx,
                oL: () => o,
                s: () => n.U1
            });
            var n = t(18822),
                a = t(33210),
                r = t(35882);
            t(42108), t(10544), t(82658);
            let l = (0, r.B)(a.RC),
                o = (0, r.B)(a.qr);
            o.displayName = "SwiperSlide"
        },
        73388: (e, i, t) => {
            t.d(i, {
                K: () => o
            });
            var n = t(6029),
                a = t(55729),
                r = t(91753),
                l = t(72813);
            let o = (0, a.memo)(e => {
                let {
                    children: i,
                    className: t,
                    delay: a = 0,
                    stagger: o = .03,
                    speed: s = .3,
                    autoStart: d = !0,
                    animate: c,
                    reverse: u = !1,
                    onAnimationStart: p,
                    onAnimationComplete: h,
                    inView: x = !1,
                    once: b = !0,
                    disableBlur: m = !1
                } = e, v = i.split(" ").filter(e => e.length > 0), f = {
                    type: "tween",
                    ease: "easeOut",
                    duration: s
                }, g = u ? m ? {
                    hidden: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: f
                    },
                    visible: {
                        opacity: 0,
                        y: 10,
                        scale: .95,
                        transition: f
                    }
                } : {
                    hidden: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: f
                    },
                    visible: {
                        opacity: 0,
                        y: 10,
                        filter: "blur(10px)",
                        transition: f
                    }
                } : m ? {
                    hidden: {
                        opacity: 0,
                        y: 10,
                        scale: .95,
                        transition: f
                    },
                    visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: f
                    }
                } : {
                    hidden: {
                        opacity: 0,
                        y: 10,
                        filter: "blur(10px)",
                        transition: f
                    },
                    visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: f
                    }
                };
                return (0, n.jsx)(r.e, {
                    as: "p",
                    className: t,
                    display: "flex",
                    flexWrap: "wrap",
                    variants: {
                        hidden: {
                            transition: {
                                staggerChildren: o,
                                delayChildren: u ? 0 : a,
                                staggerDirection: u ? -1 : 1
                            }
                        },
                        visible: {
                            transition: {
                                staggerChildren: o,
                                delayChildren: u ? 0 : a,
                                staggerDirection: u ? -1 : 1
                            }
                        }
                    },
                    initial: "hidden",
                    whileInView: x ? "visible" : void 0,
                    animate: void 0 !== c ? c : x ? void 0 : d ? "visible" : "hidden",
                    viewport: {
                        once: b
                    },
                    onAnimationStart: p,
                    onAnimationComplete: h,
                    children: v.map((e, i) => (0, n.jsxs)(r.e, {
                        as: "span",
                        display: "inline-block",
                        variants: g,
                        children: [e, i < v.length - 1 && (0, n.jsx)(l.a, {
                            as: "span",
                            display: "inline-block",
                            children: "\xa0"
                        })]
                    }, "".concat(e, "-").concat(i)))
                })
            })
        },
        81624: (e, i, t) => {
            t.d(i, {
                D: () => R
            });
            var n = t(6029),
                a = t(55729),
                r = t(72813),
                l = t(92643),
                o = t(45253),
                s = t(81085),
                d = t(91753),
                c = t(95415),
                u = t(73388),
                p = t(70659),
                h = t(61436),
                x = t(72744),
                b = t(91514),
                m = t(15617),
                v = t(98964),
                f = t(86941);
            let g = a.useLayoutEffect,
                y = [0, .34, .58, 1],
                j = [0, .58, 0, 0],
                w = {
                    duration: .7,
                    ease: y
                },
                C = {
                    default: {
                        duration: .25,
                        ease: j
                    },
                    height: {
                        duration: .7,
                        ease: j
                    }
                };

            function k(e) {
                let {
                    subtitle: i,
                    description: t,
                    isOpen: l,
                    subtitleConcealDone: o,
                    onSubtitleConcealComplete: s,
                    slotTransition: c
                } = e, u = (0, a.useRef)(null), [p, h] = (0, a.useState)(18);
                if ((0, a.useEffect)(() => {
                        l || h(18)
                    }, [l]), g(() => {
                        if (!l) return;
                        let e = u.current;
                        if (!e) return;
                        let i = () => {
                            h(Math.max(18, e.scrollHeight))
                        };
                        i();
                        let t = new ResizeObserver(i);
                        return t.observe(e), () => t.disconnect()
                    }, [l, i, t, o]), !(i || l)) return null;
                let x = l ? p : 18;
                return (0, n.jsx)(d.e, {
                    initial: !1,
                    animate: {
                        height: x
                    },
                    transition: c,
                    overflow: "hidden",
                    children: (0, n.jsx)(r.a, {
                        ref: u,
                        w: "100%",
                        children: (0, n.jsx)(S, {
                            subtitle: i,
                            description: t,
                            isOpen: l,
                            subtitleConcealDone: o,
                            onSubtitleConcealComplete: s
                        })
                    })
                })
            }

            function S(e) {
                let {
                    subtitle: i = "",
                    description: t = "",
                    isOpen: a,
                    subtitleConcealDone: o,
                    onSubtitleConcealComplete: s
                } = e, [d] = (0, l.U)("(max-width: 767px)", {
                    ssr: !0,
                    fallback: !1
                }), p = !a && !!i, h = !!t, x = a && h, b = x && !o && !!i, m = !h || x ? "visible" : "hidden", v = a ? t : i;
                return (0, n.jsxs)(c.o, {
                    color: "grey200",
                    as: "div",
                    pb: 4,
                    position: "relative",
                    children: [!!v && (0, n.jsx)(f.s, {
                        as: "span",
                        children: v
                    }), (0, n.jsxs)(r.a, {
                        "aria-hidden": "true",
                        children: [a && (0, n.jsxs)(n.Fragment, {
                            children: [(0, n.jsx)(r.a, {
                                height: "auto",
                                visibility: m,
                                sx: {
                                    textWrap: "pretty"
                                },
                                children: (0, n.jsx)(u.K, {
                                    animate: x ? "visible" : "hidden",
                                    disableBlur: d,
                                    children: t
                                })
                            }), b && (0, n.jsx)(r.a, {
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                children: (0, n.jsx)(u.K, {
                                    reverse: !0,
                                    animate: "visible",
                                    onAnimationComplete: s,
                                    disableBlur: d,
                                    children: i
                                })
                            })]
                        }), p && (0, n.jsx)(r.a, {
                            children: (0, n.jsx)(u.K, {
                                reverse: !0,
                                animate: "hidden",
                                disableBlur: d,
                                children: i
                            })
                        })]
                    })]
                })
            }
            let R = e => {
                let {
                    title: i,
                    subtitle: t,
                    description: r,
                    thumbnailAsset: l,
                    detailsAsset: c,
                    isOpen: u,
                    onOpenChange: f,
                    defaultOpen: g = !1,
                    toggleButtonAriaLabel: j,
                    imageHeight: S = 180,
                    preloadMedia: R,
                    style: E
                } = e, [T, z] = (0, a.useState)(g), [I, A] = (0, a.useState)(!1), B = void 0 !== u, D = B ? u : T, [F, L] = (0, a.useState)(!1), W = () => L(!0), P = !!R || F || D, H = (0, a.useRef)(null), N = "details-card-region-".concat((0, a.useId)()), O = null != j ? j : D ? "Hide details about ".concat(i) : "Show details about ".concat(i);
                (0, a.useEffect)(() => {
                    D || A(!1)
                }, [D]);
                let U = (0, a.useCallback)(() => {
                    B || z(!1), null == f || f(!1)
                }, [B, f]);
                (0, a.useEffect)(() => {
                    if (!D) return;
                    let e = e => {
                        H.current && !H.current.contains(e.target) && U()
                    };
                    return document.addEventListener("pointerdown", e, !0), () => document.removeEventListener("pointerdown", e, !0)
                }, [D, U]);
                let G = () => {
                        let e = !D;
                        B || z(e), null == f || f(e)
                    },
                    {
                        toggleIcon: K,
                        hasThumbnail: _,
                        hasDetailsVideo: V,
                        hasDetailsMedia: q,
                        animates: Q,
                        mediaWrapperAnimate: J,
                        subtitleSlotTransition: M
                    } = function(e, i, t, n) {
                        let a = !!((0, s.jT)(i) && (0, s.Uu)(i)),
                            r = !!((0, s.jT)(t) && (0, s.Uu)(t)),
                            l = !!((0, s.jT)(t) && (0, s.QR)(t)),
                            o = r || l,
                            d = e ? {
                                thumbnail: {
                                    width: 0
                                },
                                thumbnailInner: {
                                    x: -78,
                                    opacity: 0
                                },
                                imageWrapper: {
                                    height: n + 16
                                },
                                image: {
                                    y: 0,
                                    scale: 1
                                }
                            } : {
                                thumbnail: {
                                    width: 78
                                },
                                thumbnailInner: {
                                    x: 0,
                                    opacity: 1
                                },
                                imageWrapper: {
                                    height: 0
                                },
                                image: {
                                    y: n,
                                    scale: .7
                                }
                            };
                        return {
                            toggleIcon: e ? "zoom-in" : "zoom-out",
                            hasThumbnail: a,
                            hasDetailsImage: r,
                            hasDetailsVideo: l,
                            hasDetailsMedia: o,
                            animates: d,
                            mediaWrapperAnimate: o ? d.imageWrapper : {
                                height: 0
                            },
                            subtitleSlotTransition: e ? w : C
                        }
                    }(D, l, c, S);
                return (0, n.jsx)(p.U, {
                    ref: H,
                    "data-details-card": !0,
                    "data-open": !!D || void 0,
                    size: "card",
                    colorScheme: "black",
                    position: "relative",
                    overflow: "hidden",
                    p: 0,
                    pt: 4,
                    pr: 4,
                    backdropFilter: "auto",
                    backdropBlur: "ndlFrostedGlassLow",
                    width: {
                        base: "100%",
                        md: "330px"
                    },
                    minHeight: 20,
                    onClick: D ? void 0 : G,
                    onPointerEnter: W,
                    onFocusCapture: W,
                    cursor: D ? "default" : "pointer",
                    style: E,
                    children: (0, n.jsxs)(o.s, {
                        flexDirection: "column",
                        width: "100%",
                        children: [(0, n.jsxs)(o.s, {
                            alignItems: t ? "start" : "center",
                            width: "100%",
                            children: [_ && (0, n.jsx)(d.e, {
                                initial: !1,
                                animate: Q.thumbnail,
                                transition: {
                                    duration: .7,
                                    ease: y
                                },
                                overflow: "hidden",
                                flexShrink: 0,
                                children: (0, n.jsx)(d.e, {
                                    initial: !1,
                                    animate: Q.thumbnailInner,
                                    transition: {
                                        duration: .7,
                                        ease: y
                                    },
                                    width: "".concat(78, "px"),
                                    pl: 4,
                                    overflow: "visible",
                                    position: "relative",
                                    children: (0, n.jsx)(h.g, {
                                        ratio: "16:9",
                                        width: "100%",
                                        mt: 1,
                                        children: (0, n.jsx)(m.d, {
                                            cloudinaryAsset: l,
                                            sizes: "150px",
                                            objectFit: "contain",
                                            wrapperProps: {
                                                borderRadius: 0
                                            }
                                        })
                                    })
                                })
                            }), (0, n.jsxs)(d.e, {
                                flex: 1,
                                flexDirection: "column",
                                pl: 4,
                                initial: !1,
                                w: "100%",
                                animate: {
                                    paddingTop: 62 * !!D,
                                    paddingRight: 64 * !D
                                },
                                transition: {
                                    duration: .7,
                                    ease: y
                                },
                                children: [(0, n.jsx)(x.X, {
                                    size: "headerS",
                                    color: "allWhite",
                                    mb: 1,
                                    letterSpacing: "-0.67%",
                                    children: i
                                }), (0, n.jsx)(k, {
                                    subtitle: null != t ? t : void 0,
                                    description: null != r ? r : void 0,
                                    isOpen: D,
                                    subtitleConcealDone: I,
                                    onSubtitleConcealComplete: () => A(!0),
                                    slotTransition: M
                                })]
                            }), (0, n.jsx)(d.e, {
                                onClick: e => e.stopPropagation(),
                                flexShrink: 0,
                                position: "absolute",
                                top: 4,
                                right: 4,
                                zIndex: 1,
                                sx: {
                                    "[data-details-card]:not([data-open]):hover & button": {
                                        backgroundColor: "ndlTransparencyGreyHover"
                                    }
                                },
                                children: (0, n.jsx)(b.Q, {
                                    icon: K,
                                    ariaLabel: O,
                                    ariaControlsId: N,
                                    ariaExpanded: D,
                                    onClick: G,
                                    size: 12,
                                    backgroundColor: "ndlTransparencyGrey",
                                    hoverBackgroundColor: "ndlTransparencyGreyHover",
                                    iconTheme: "dark"
                                })
                            })]
                        }), (0, n.jsx)(d.e, {
                            id: N,
                            "aria-hidden": !D,
                            initial: !1,
                            animate: J,
                            transition: {
                                duration: .7,
                                ease: y
                            },
                            overflow: "hidden",
                            position: "relative",
                            borderRadius: "ndlRadiusCard",
                            width: "100%",
                            flexShrink: 0,
                            pl: 4,
                            children: q && (0, n.jsx)(d.e, {
                                initial: !1,
                                animate: Q.image,
                                transition: {
                                    duration: .7,
                                    ease: y
                                },
                                height: "".concat(S, "px"),
                                overflow: "hidden",
                                position: "relative",
                                children: V ? (0, n.jsx)(v.P, {
                                    cloudinaryAsset: c,
                                    wrapperProps: {
                                        position: "absolute",
                                        inset: 0,
                                        overflow: "hidden",
                                        borderRadius: "ndlRadiusCard"
                                    },
                                    loop: !0,
                                    warm: P
                                }) : (0, n.jsx)(m.d, {
                                    cloudinaryAsset: c,
                                    alt: i,
                                    sizes: "(max-width: 768px) 296px, 330px",
                                    objectFit: "cover",
                                    crop: "fill",
                                    wrapperProps: {
                                        borderRadius: "ndlRadiusCard"
                                    },
                                    loading: P ? "eager" : void 0
                                })
                            })
                        })]
                    })
                })
            }
        }
    }
]);
//# sourceMappingURL=3382.a862ddf5794ff2e8.js.map