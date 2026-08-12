"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [1477], {
        25841: (e, a, i) => {
            i.d(a, {
                T: () => o
            });
            var n = i(55729),
                t = i(81278),
                l = i(93066),
                r = i(80321);
            let s = {
                    pagination: r.wT.carouselPaginationButtonClick,
                    next: r.wT.carouselNavigationNextButtonClick,
                    prev: r.wT.carouselNavigationPrevButtonClick
                },
                o = (e, a) => {
                    let {
                        locale: i
                    } = (0, t.useRouter)(), {
                        state: {
                            pageType: o,
                            pageId: c,
                            pageContentTags: d
                        }
                    } = (0, l.CU)();
                    return (0, n.useCallback)((n, t) => {
                        let l, u = s[n],
                            p = a ? '"'.concat(a, '"') : e;
                        l = "pagination" === n ? "Carousel ".concat(p, " pagination index button clicked:").concat(null != t ? t : "") : "Carousel ".concat(p, ": ").concat("next" === n ? "Next button" : "Previous button"), (0, r.yn)({
                            eventAction: u,
                            locale: i,
                            pageExperience: {
                                pageCategory: o,
                                contentTags: null != d ? d : []
                            },
                            context: {
                                moduleName: e
                            },
                            componentClick: {
                                clickElementType: "interaction",
                                clickElementId: c,
                                clickElementName: l
                            }
                        })
                    }, [e, a, i, o, c, d])
                }
        },
        34221: (e, a, i) => {
            i.d(a, {
                n: () => r
            });
            var n = i(6029),
                t = i(94771),
                l = i(72813);
            let r = e => {
                let {
                    direction: a,
                    onClick: i,
                    ...r
                } = e;
                return (0, n.jsx)(l.a, {
                    transform: "prev" === a ? "rotate(180deg)" : void 0,
                    children: (0, n.jsx)(t.d, {
                        onClick: i,
                        ...r
                    })
                })
            }
        },
        50887: (e, a, i) => {
            i.d(a, {
                FN: () => r,
                Vf: () => n.Jq,
                aL: () => n.s3,
                lo: () => n.Vx,
                oL: () => s,
                s: () => n.U1
            });
            var n = i(18822),
                t = i(33210),
                l = i(35882);
            i(42108), i(10544), i(82658);
            let r = (0, l.B)(t.RC),
                s = (0, l.B)(t.qr);
            s.displayName = "SwiperSlide"
        },
        81477: (e, a, i) => {
            i.r(a), i.d(a, {
                MobileCarousel: () => b
            });
            var n = i(6029),
                t = i(55729),
                l = i(72813),
                r = i(45253),
                s = i(34221),
                o = i(50887),
                c = i(18822),
                d = i(21450),
                u = i(25841),
                p = i(80321);
            let x = {
                    touchAction: "manipulation"
                },
                g = {
                    "& .swiper-wrapper": {
                        cursor: "grab"
                    },
                    "& .swiper-wrapper:active": {
                        cursor: "grabbing"
                    }
                },
                b = (0, t.memo)(function(e) {
                    let {
                        items: a,
                        showNavigation: i = !1
                    } = e, [b, C] = (0, t.useState)(null), [h, v] = (0, t.useState)(0), [w, k] = (0, t.useState)(!0), [m, N] = (0, t.useState)(!1), S = (0, u.T)(p.B7.newsSection), j = (0, t.useCallback)(e => {
                        C(e), k(e.isBeginning), N(e.isEnd), v(e.activeIndex)
                    }, []), B = (0, t.useCallback)(e => {
                        k(e.isBeginning), N(e.isEnd), v(e.activeIndex)
                    }, []);
                    return (0, n.jsxs)(l.a, {
                        as: "section",
                        "aria-roledescription": "carousel",
                        "aria-label": "News",
                        children: [i && (0, n.jsxs)(r.s, {
                            justifyContent: "flex-end",
                            gap: 7,
                            padding: 2,
                            mb: 4,
                            children: [(0, n.jsx)(s.n, {
                                onClick: () => {
                                    null == b || b.slidePrev(), S("prev")
                                },
                                direction: "prev",
                                hideLabel: !0,
                                disabled: w,
                                aria: {
                                    "aria-label": "Previous news article"
                                },
                                theme: "dark"
                            }), (0, n.jsx)(s.n, {
                                onClick: () => {
                                    null == b || b.slideNext(), S("next")
                                },
                                direction: "next",
                                hideLabel: !0,
                                disabled: m,
                                aria: {
                                    "aria-label": "Next news article"
                                },
                                theme: "dark"
                            })]
                        }), (0, n.jsx)(l.a, {
                            "data-lenis-prevent-horizontal": !0,
                            sx: x,
                            children: (0, n.jsx)(o.FN, {
                                slidesPerView: 1.08,
                                slidesPerGroup: 1,
                                modules: [c.Jq],
                                spaceBetween: "16px",
                                overflow: "visible",
                                speed: 500,
                                longSwipesRatio: .15,
                                shortSwipes: !0,
                                grabCursor: !0,
                                centeredSlides: !0,
                                onSwiper: j,
                                onSlideChange: B,
                                sx: g,
                                children: a.map((e, a) => {
                                    let i = 1 >= Math.abs(a - h);
                                    return (0, n.jsx)(o.oL, {
                                        children: (0, n.jsx)(l.a, {
                                            height: "376px",
                                            children: (0, n.jsx)(d.C, {
                                                item: e,
                                                cardSize: "small",
                                                disableVideo: !i,
                                                imageLoading: a >= h - 1 && a <= h + 2 ? "eager" : "lazy"
                                            })
                                        })
                                    }, e.sys.id)
                                })
                            })
                        })]
                    })
                });
            b.displayName = "MobileCarousel"
        }
    }
]);
//# sourceMappingURL=1477.a0455057d6079d46.js.map