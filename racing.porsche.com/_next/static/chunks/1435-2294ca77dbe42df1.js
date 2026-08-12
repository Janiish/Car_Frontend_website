"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [1435], {
        18861: (t, e, i) => {
            i.d(e, {
                p: () => o
            });
            let s = new Map;
            class o {
                constructor(t, e = {}) {
                    this.formatter = n(t, e), this.options = e
                }
                format(t) {
                    return this.formatter.format(t)
                }
                formatToParts(t) {
                    return this.formatter.formatToParts(t)
                }
                formatRange(t, e) {
                    if ("function" == typeof this.formatter.formatRange) return this.formatter.formatRange(t, e);
                    if (e < t) throw RangeError("End date must be >= start date");
                    return `${this.formatter.format(t)} \u{2013} ${this.formatter.format(e)}`
                }
                formatRangeToParts(t, e) {
                    if ("function" == typeof this.formatter.formatRangeToParts) return this.formatter.formatRangeToParts(t, e);
                    if (e < t) throw RangeError("End date must be >= start date");
                    let i = this.formatter.formatToParts(t),
                        s = this.formatter.formatToParts(e);
                    return [...i.map(t => ({ ...t,
                        source: "startRange"
                    })), {
                        type: "literal",
                        value: " – ",
                        source: "shared"
                    }, ...s.map(t => ({ ...t,
                        source: "endRange"
                    }))]
                }
                resolvedOptions() {
                    let t = this.formatter.resolvedOptions();
                    return null == h && (h = "h12" === new Intl.DateTimeFormat("fr", {
                        hour: "numeric",
                        hour12: !1
                    }).resolvedOptions().hourCycle), h && (this.resolvedHourCycle || (this.resolvedHourCycle = function(t, e) {
                        if (!e.timeStyle && !e.hour) return;
                        t = t.replace(/(-u-)?-nu-[a-zA-Z0-9]+/, "");
                        let i = n(t += (t.includes("-u-") ? "" : "-u") + "-nu-latn", { ...e,
                                timeZone: void 0
                            }),
                            s = parseInt(i.formatToParts(new Date(2020, 2, 3, 0)).find(t => "hour" === t.type).value, 10),
                            o = parseInt(i.formatToParts(new Date(2020, 2, 3, 23)).find(t => "hour" === t.type).value, 10);
                        if (0 === s && 23 === o) return "h23";
                        if (24 === s && 23 === o) return "h24";
                        if (0 === s && 11 === o) return "h11";
                        if (12 === s && 11 === o) return "h12";
                        throw Error("Unexpected hour cycle result")
                    }(t.locale, this.options)), t.hourCycle = this.resolvedHourCycle, t.hour12 = "h11" === this.resolvedHourCycle || "h12" === this.resolvedHourCycle), "ethiopic-amete-alem" === t.calendar && (t.calendar = "ethioaa"), t
                }
            }
            let r = {
                true: {
                    ja: "h11"
                },
                false: {}
            };

            function n(t, e = {}) {
                if ("boolean" == typeof e.hour12 && (null == l && (l = "24" === new Intl.DateTimeFormat("en-US", {
                        hour: "numeric",
                        hour12: !1
                    }).format(new Date(2020, 2, 3, 0))), l)) {
                    let i = r[String((e = { ...e
                        }).hour12)][t.split("-")[0]],
                        s = e.hour12 ? "h12" : "h23";
                    e.hourCycle = i ?? s, delete e.hour12
                }
                let i = t + (e ? Object.entries(e).sort((t, e) => t[0] < e[0] ? -1 : 1).join() : "");
                if (s.has(i)) return s.get(i);
                let o = new Intl.DateTimeFormat(t, e);
                return s.set(i, o), o
            }
            let l = null,
                h = null
        },
        19315: (t, e, i) => {
            i.d(e, {
                FH: () => g,
                xP: () => y
            });
            var s = "1.3.25";

            function o(t, e, i) {
                return Math.max(t, Math.min(e, i))
            }
            var r = class {
                    isRunning = !1;
                    value = 0;
                    from = 0;
                    to = 0;
                    currentTime = 0;
                    lerp;
                    duration;
                    easing;
                    onUpdate;
                    advance(t) {
                        if (!this.isRunning) return;
                        let e = !1;
                        if (this.duration && this.easing) {
                            this.currentTime += t;
                            let i = o(0, this.currentTime / this.duration, 1),
                                s = (e = i >= 1) ? 1 : this.easing(i);
                            this.value = this.from + (this.to - this.from) * s
                        } else if (this.lerp) {
                            var i, s, r, n;
                            this.value = (i = this.value, s = this.to, r = 60 * this.lerp, (1 - (n = 1 - Math.exp(-r * t))) * i + n * s), Math.round(this.value) === Math.round(this.to) && (this.value = this.to, e = !0)
                        } else this.value = this.to, e = !0;
                        e && this.stop(), this.onUpdate ?.(this.value, e)
                    }
                    stop() {
                        this.isRunning = !1
                    }
                    fromTo(t, e, {
                        lerp: i,
                        duration: s,
                        easing: o,
                        onStart: r,
                        onUpdate: n
                    }) {
                        this.from = this.value = t, this.to = e, this.lerp = i, this.duration = s, this.easing = o, this.currentTime = 0, this.isRunning = !0, r ?.(), this.onUpdate = n
                    }
                },
                n = class {
                    width = 0;
                    height = 0;
                    scrollHeight = 0;
                    scrollWidth = 0;
                    debouncedResize;
                    wrapperResizeObserver;
                    contentResizeObserver;
                    constructor(t, e, {
                        autoResize: i = !0,
                        debounce: s = 250
                    } = {}) {
                        this.wrapper = t, this.content = e, i && (this.debouncedResize = function(t, e) {
                            let i;
                            return function(...s) {
                                clearTimeout(i), i = setTimeout(() => {
                                    i = void 0, t.apply(this, s)
                                }, e)
                            }
                        }(this.resize, s), this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize()
                    }
                    destroy() {
                        this.wrapperResizeObserver ?.disconnect(), this.contentResizeObserver ?.disconnect(), this.wrapper === window && this.debouncedResize && window.removeEventListener("resize", this.debouncedResize)
                    }
                    resize = () => {
                        this.onWrapperResize(), this.onContentResize()
                    };
                    onWrapperResize = () => {
                        this.wrapper instanceof Window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight)
                    };
                    onContentResize = () => {
                        this.wrapper instanceof Window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth)
                    };
                    get limit() {
                        return {
                            x: this.scrollWidth - this.width,
                            y: this.scrollHeight - this.height
                        }
                    }
                },
                l = class {
                    events = {};
                    emit(t, ...e) {
                        let i = this.events[t] || [];
                        for (let t = 0, s = i.length; t < s; t++) i[t] ?.(...e)
                    }
                    on(t, e) {
                        return this.events[t] ? this.events[t].push(e) : this.events[t] = [e], () => {
                            this.events[t] = this.events[t] ?.filter(t => e !== t)
                        }
                    }
                    off(t, e) {
                        this.events[t] = this.events[t] ?.filter(t => e !== t)
                    }
                    destroy() {
                        this.events = {}
                    }
                };
            let h = 100 / 6,
                a = {
                    passive: !1
                };

            function c(t, e) {
                return 1 === t ? h : 2 === t ? e : 1
            }
            var p = class {
                touchStart = {
                    x: 0,
                    y: 0
                };
                lastDelta = {
                    x: 0,
                    y: 0
                };
                window = {
                    width: 0,
                    height: 0
                };
                emitter = new l;
                constructor(t, e = {
                    wheelMultiplier: 1,
                    touchMultiplier: 1
                }) {
                    this.element = t, this.options = e, window.addEventListener("resize", this.onWindowResize), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, a), this.element.addEventListener("touchstart", this.onTouchStart, a), this.element.addEventListener("touchmove", this.onTouchMove, a), this.element.addEventListener("touchend", this.onTouchEnd, a)
                }
                on(t, e) {
                    return this.emitter.on(t, e)
                }
                destroy() {
                    this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize), this.element.removeEventListener("wheel", this.onWheel, a), this.element.removeEventListener("touchstart", this.onTouchStart, a), this.element.removeEventListener("touchmove", this.onTouchMove, a), this.element.removeEventListener("touchend", this.onTouchEnd, a)
                }
                onTouchStart = t => {
                    let {
                        clientX: e,
                        clientY: i
                    } = t.targetTouches ? t.targetTouches[0] : t;
                    this.touchStart.x = e, this.touchStart.y = i, this.lastDelta = {
                        x: 0,
                        y: 0
                    }, this.emitter.emit("scroll", {
                        deltaX: 0,
                        deltaY: 0,
                        event: t
                    })
                };
                onTouchMove = t => {
                    let {
                        clientX: e,
                        clientY: i
                    } = t.targetTouches ? t.targetTouches[0] : t, s = -(e - this.touchStart.x) * this.options.touchMultiplier, o = -(i - this.touchStart.y) * this.options.touchMultiplier;
                    this.touchStart.x = e, this.touchStart.y = i, this.lastDelta = {
                        x: s,
                        y: o
                    }, this.emitter.emit("scroll", {
                        deltaX: s,
                        deltaY: o,
                        event: t
                    })
                };
                onTouchEnd = t => {
                    this.emitter.emit("scroll", {
                        deltaX: this.lastDelta.x,
                        deltaY: this.lastDelta.y,
                        event: t
                    })
                };
                onWheel = t => {
                    let {
                        deltaX: e,
                        deltaY: i,
                        deltaMode: s
                    } = t, o = c(s, this.window.width), r = c(s, this.window.height);
                    e *= o, i *= r, e *= this.options.wheelMultiplier, i *= this.options.wheelMultiplier, this.emitter.emit("scroll", {
                        deltaX: e,
                        deltaY: i,
                        event: t
                    })
                };
                onWindowResize = () => {
                    this.window = {
                        width: window.innerWidth,
                        height: window.innerHeight
                    }
                }
            };
            let u = t => Math.min(1, 1.001 - 2 ** (-10 * t));
            var AnimateClass = r;
            var EventEmitterClass = l;
            var d = class {
    #top;

constructor({
                        wrapper: t = window,
                        content: e = document.documentElement,
                        eventsTarget: i = t,
                        smoothWheel: o = !0,
                        syncTouch: r = !1,
                        syncTouchLerp: l = .075,
                        touchInertiaExponent: h = 1.7,
                        duration: a,
                        easing: c,
                        lerp: d = .1,
                        infinite: m = !1,
                        orientation: f = "vertical",
                        gestureOrientation: v = "horizontal" === f ? "both" : "vertical",
                        touchMultiplier: w = 1,
                        wheelMultiplier: g = 1,
                        autoResize: S = !0,
                        prevent: y,
                        virtualScroll: b,
                        overscroll: E = !0,
                        autoRaf: T = !1,
                        anchors: z = !1,
                        autoToggle: R = !1,
                        allowNestedScroll: L = !1,
                        __experimental__naiveDimensions: N = !1,
                        naiveDimensions: x = N,
                        stopInertiaOnNavigate: M = !1
                    } = {}) {
                        window.lenisVersion = s, window.lenis || (window.lenis = {}), window.lenis.version = s, "horizontal" === f && (window.lenis.horizontal = !0), !0 === r && (window.lenis.touch = !0), this.isIos = /(iPad|iPhone|iPod)/g.test(navigator.userAgent), t && t !== document.documentElement || (t = window), "number" == typeof a && "function" != typeof c ? c = u : "function" == typeof c && "number" != typeof a && (a = 1), this.options = {
                            wrapper: t,
                            content: e,
                            eventsTarget: i,
                            smoothWheel: o,
                            syncTouch: r,
                            syncTouchLerp: l,
                            touchInertiaExponent: h,
                            duration: a,
                            easing: c,
                            lerp: d,
                            infinite: m,
                            gestureOrientation: v,
                            orientation: f,
                            touchMultiplier: w,
                            wheelMultiplier: g,
                            autoResize: S,
                            prevent: y,
                            virtualScroll: b,
                            overscroll: E,
                            autoRaf: T,
                            anchors: z,
                            autoToggle: R,
                            allowNestedScroll: L,
                            naiveDimensions: x,
                            stopInertiaOnNavigate: M
                        }, this.emitter = new EventEmitterClass, this.animate = new AnimateClass, this.dimensions = new n(t, e, {
                            autoResize: S
                        }), this.updateClassName(), this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll), this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, {
                            capture: !0
                        }), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.addEventListener("click", this.onClick), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown), this.virtualScroll = new p(i, {
                            touchMultiplier: w,
                            wheelMultiplier: g
                        }), this.virtualScroll.on("scroll", this.onVirtualScroll), this.options.autoToggle && (this.checkOverflow(), this.rootElement.addEventListener("transitionend", this.onTransitionEnd)), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf))
                    }
                    destroy() {
                        this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll), this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, {
                            capture: !0
                        }), this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.removeEventListener("click", this.onClick), this.virtualScroll.destroy(), this.dimensions.destroy(), this.cleanUpClassName(), this._rafId && cancelAnimationFrame(this._rafId)
                    }
                    on(t, e) {
                        return this.emitter.on(t, e)
                    }
                    off(t, e) {
                        return this.emitter.off(t, e)
                    }
                    onScrollEnd = t => {
                        t instanceof CustomEvent || "smooth" !== this.isScrolling && !1 !== this.isScrolling || t.stopPropagation()
                    };
                    dispatchScrollendEvent = () => {
                        this.options.wrapper.dispatchEvent(new CustomEvent("scrollend", {
                            bubbles: this.options.wrapper === window,
                            detail: {
                                lenisScrollEnd: !0
                            }
                        }))
                    };
                    get overflow() {
                        let t = this.isHorizontal ? "overflow-x" : "overflow-y";
                        return getComputedStyle(this.rootElement)[t]
                    }
                    checkOverflow() {
                        ["hidden", "clip"].includes(this.overflow) ? this.internalStop() : this.internalStart()
                    }
                    onTransitionEnd = t => {
                        t.propertyName ?.includes("overflow") && t.target === this.rootElement && this.checkOverflow()
                    };
                    setScroll(t) {
                        this.isHorizontal ? this.options.wrapper.scrollTo({
                            left: t,
                            behavior: "instant"
                        }) : this.options.wrapper.scrollTo({
                            top: t,
                            behavior: "instant"
                        })
                    }
                    onClick = t => {
                        let e = t.composedPath().filter(t => t instanceof HTMLAnchorElement && t.href).map(t => new URL(t.href)),
                            i = new URL(window.location.href);
                        if (this.options.anchors) {
                            let t = e.find(t => i.host === t.host && i.pathname === t.pathname && t.hash);
                            if (t) {
                                let e = "object" == typeof this.options.anchors && this.options.anchors ? this.options.anchors : void 0,
                                    i = decodeURIComponent(t.hash);
                                this.scrollTo(i, e);
                                return
                            }
                        }
                        if (this.options.stopInertiaOnNavigate && e.some(t => i.host === t.host && i.pathname !== t.pathname)) return void this.reset()
                    };
                    onPointerDown = t => {
                        1 === t.button && this.reset()
                    };
                    isTouchOnSelectionHandle(t) {
                        let e = window.getSelection();
                        if (!e || e.isCollapsed || 0 === e.rangeCount) return !1;
                        let i = t.targetTouches[0] ?? t.changedTouches[0];
                        if (!i) return !1;
                        let s = e.getRangeAt(0).getClientRects();
                        if (0 === s.length) return !1;
                        let o = s[0],
                            r = s[s.length - 1],
                            n = 40 >= Math.hypot(i.clientX - o.left, i.clientY - o.top),
                            l = 40 >= Math.hypot(i.clientX - r.right, i.clientY - r.bottom);
                        return n || l
                    }
                    onVirtualScroll = t => {
                        if ("function" == typeof this.options.virtualScroll && !1 === this.options.virtualScroll(t)) return;
                        let {
                            deltaX: e,
                            deltaY: i,
                            event: s
                        } = t;
                        if (this.emitter.emit("virtual-scroll", {
                                deltaX: e,
                                deltaY: i,
                                event: s
                            }), s.ctrlKey || s.lenisStopPropagation) return;
                        let o = s.type.includes("touch"),
                            r = s.type.includes("wheel");
                        if (o && this.isIos && ("touchstart" === s.type && (this._isDraggingSelection = this.isTouchOnSelectionHandle(s)), this._isDraggingSelection)) {
                            "touchend" === s.type && (this._isDraggingSelection = !1);
                            return
                        }
                        this.isTouching = "touchstart" === s.type || "touchmove" === s.type;
                        let n = 0 === e && 0 === i;
                        if (this.options.syncTouch && o && "touchstart" === s.type && n && !this.isStopped && !this.isLocked) return void this.reset();
                        let l = "vertical" === this.options.gestureOrientation && 0 === i || "horizontal" === this.options.gestureOrientation && 0 === e;
                        if (n || l) return;
                        let h = s.composedPath();
                        h = h.slice(0, h.indexOf(this.rootElement));
                        let a = this.options.prevent,
                            c = Math.abs(e) >= Math.abs(i) ? "horizontal" : "vertical";
                        if (h.find(t => t instanceof HTMLElement && ("function" == typeof a && a ?.(t) || t.hasAttribute ?.("data-lenis-prevent") || "vertical" === c && t.hasAttribute ?.("data-lenis-prevent-vertical") || "horizontal" === c && t.hasAttribute ?.("data-lenis-prevent-horizontal") || o && t.hasAttribute ?.("data-lenis-prevent-touch") || r && t.hasAttribute ?.("data-lenis-prevent-wheel") || this.options.allowNestedScroll && this.hasNestedScroll(t, {
                                deltaX: e,
                                deltaY: i
                            })))) return;
                        if (this.isStopped || this.isLocked) {
                            s.cancelable && s.preventDefault();
                            return
                        }
                        if (!(this.options.syncTouch && o || this.options.smoothWheel && r)) {
                            this.isScrolling = "native", this.animate.stop(), s.lenisStopPropagation = !0;
                            return
                        }
                        let p = i;
                        "both" === this.options.gestureOrientation ? p = Math.abs(i) > Math.abs(e) ? i : e : "horizontal" === this.options.gestureOrientation && (p = e), (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && this.limit > 0 && (this.animatedScroll > 0 && this.animatedScroll < this.limit || 0 === this.animatedScroll && i > 0 || this.animatedScroll === this.limit && i < 0)) && (s.lenisStopPropagation = !0), s.cancelable && s.preventDefault();
                        let u = o && this.options.syncTouch,
                            d = o && "touchend" === s.type;
                        d && (p = Math.sign(p) * Math.abs(this.velocity) ** this.options.touchInertiaExponent), this.scrollTo(this.targetScroll + p, {
                            programmatic: !1,
                            ...u ? {
                                lerp: d ? this.options.syncTouchLerp : 1
                            } : {
                                lerp: this.options.lerp,
                                duration: this.options.duration,
                                easing: this.options.easing
                            }
                        })
                    };
                    resize() {
                        this.dimensions.resize(), this.animatedScroll = this.targetScroll = this.actualScroll, this.emit()
                    }
                    emit() {
                        this.emitter.emit("scroll", this)
                    }
                    onNativeScroll = () => {
                        if (null !== this._resetVelocityTimeout && (clearTimeout(this._resetVelocityTimeout), this._resetVelocityTimeout = null), this._preventNextNativeScrollEvent) {
                            this._preventNextNativeScrollEvent = !1;
                            return
                        }
                        if (!1 === this.isScrolling || "native" === this.isScrolling) {
                            let t = this.animatedScroll;
                            this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - t, this.direction = Math.sign(this.animatedScroll - t), this.isStopped || (this.isScrolling = "native"), this.emit(), 0 !== this.velocity && (this._resetVelocityTimeout = setTimeout(() => {
                                this.lastVelocity = this.velocity, this.velocity = 0, this.isScrolling = !1, this.emit()
                            }, 400))
                        }
                    };
                    reset() {
                        this.isLocked = !1, this.isScrolling = !1, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop()
                    }
                    start() {
                        if (this.isStopped) {
                            if (this.options.autoToggle) return void this.rootElement.style.removeProperty("overflow");
                            this.internalStart()
                        }
                    }
                    internalStart() {
                        this.isStopped && (this.reset(), this.isStopped = !1, this.emit())
                    }
                    stop() {
                        if (!this.isStopped) {
                            if (this.options.autoToggle) return void this.rootElement.style.setProperty("overflow", "clip");
                            this.internalStop()
                        }
                    }
                    internalStop() {
                        this.isStopped || (this.reset(), this.isStopped = !0, this.emit())
                    }
                    raf = t => {
                        let e = t - (this.time || t);
                        this.time = t, this.animate.advance(.001 * e), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf))
                    };
                    scrollTo(t, {
                        offset: e = 0,
                        immediate: i = !1,
                        lock: s = !1,
                        programmatic: r = !0,
                        lerp: n = r ? this.options.lerp : void 0,
                        duration: l = r ? this.options.duration : void 0,
                        easing: h = r ? this.options.easing : void 0,
                        onStart: a,
                        onComplete: c,
                        force: p = !1,
                        userData: d
                    } = {}) {
                        if ((this.isStopped || this.isLocked) && !p) return;
                        let m = t,
                            f = e;
                        if ("string" == typeof m && ["top", "left", "start", "#"].includes(m)) m = 0;
                        else if ("string" == typeof m && ["bottom", "right", "end"].includes(m)) m = this.limit;
                        else {
                            let t = null;
                            if ("string" == typeof m ? (t = m.startsWith("#") ? document.getElementById(m.slice(1)) : document.querySelector(m)) || ("#top" === m ? m = 0 : console.warn("Lenis: Target not found", m)) : m instanceof HTMLElement && m ?.nodeType && (t = m), t) {
                                if (this.options.wrapper !== window) {
                                    let t = this.rootElement.getBoundingClientRect();
                                    f -= this.isHorizontal ? t.left : t.top
                                }
                                let e = t.getBoundingClientRect(),
                                    i = getComputedStyle(t),
                                    s = this.isHorizontal ? Number.parseFloat(i.scrollMarginLeft) : Number.parseFloat(i.scrollMarginTop),
                                    o = getComputedStyle(this.rootElement),
                                    r = this.isHorizontal ? Number.parseFloat(o.scrollPaddingLeft) : Number.parseFloat(o.scrollPaddingTop);
                                m = (this.isHorizontal ? e.left : e.top) + this.animatedScroll - (Number.isNaN(s) ? 0 : s) - (Number.isNaN(r) ? 0 : r)
                            }
                        }
                        if ("number" == typeof m) {
                            if (m += f, this.options.infinite) {
                                if (r) {
                                    this.targetScroll = this.animatedScroll = this.scroll;
                                    let t = m - this.animatedScroll;
                                    t > this.limit / 2 ? m -= this.limit : t < -this.limit / 2 && (m += this.limit)
                                }
                            } else m = o(0, m, this.limit);
                            if (m === this.targetScroll) {
                                a ?.(this), c ?.(this);
                                return
                            }
                            if (this.userData = d ?? {}, i) {
                                this.animatedScroll = this.targetScroll = m, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), c ?.(this), this.userData = {}, requestAnimationFrame(() => {
                                    this.dispatchScrollendEvent()
                                });
                                return
                            }
                            r || (this.targetScroll = m), "number" == typeof l && "function" != typeof h ? h = u : "function" == typeof h && "number" != typeof l && (l = 1), this.animate.fromTo(this.animatedScroll, m, {
                                duration: l,
                                easing: h,
                                lerp: n,
                                onStart: () => {
                                    s && (this.isLocked = !0), this.isScrolling = "smooth", a ?.(this)
                                },
                                onUpdate: (t, e) => {
                                    this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = t - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = t, this.setScroll(this.scroll), r && (this.targetScroll = t), e || this.emit(), e && (this.reset(), this.emit(), c ?.(this), this.userData = {}, requestAnimationFrame(() => {
                                        this.dispatchScrollendEvent()
                                    }), this.preventNextNativeScrollEvent())
                                }
                            })
                        }
                    }
                    preventNextNativeScrollEvent() {
                        this._preventNextNativeScrollEvent = !0, requestAnimationFrame(() => {
                            this._preventNextNativeScrollEvent = !1
                        })
                    }
                    hasNestedScroll(t, {
                        deltaX: e,
                        deltaY: i
                    }) {
                        let s, o, r, n, l, h, a, c, p, u, d, m, f, v, w, g, S = Date.now();
                        t._lenis || (t._lenis = {});
                        let y = t._lenis;
                        if (S - (y.time ?? 0) > 2e3) {
                            y.time = Date.now();
                            let e = window.getComputedStyle(t);
                            if (y.computedStyle = e, s = ["auto", "overlay", "scroll"].includes(e.overflowX), o = ["auto", "overlay", "scroll"].includes(e.overflowY), l = ["auto"].includes(e.overscrollBehaviorX), h = ["auto"].includes(e.overscrollBehaviorY), y.hasOverflowX = s, y.hasOverflowY = o, !(s || o)) return !1;
                            a = t.scrollWidth, c = t.scrollHeight, p = t.clientWidth, u = t.clientHeight, r = a > p, n = c > u, y.isScrollableX = r, y.isScrollableY = n, y.scrollWidth = a, y.scrollHeight = c, y.clientWidth = p, y.clientHeight = u, y.hasOverscrollBehaviorX = l, y.hasOverscrollBehaviorY = h
                        } else r = y.isScrollableX, n = y.isScrollableY, s = y.hasOverflowX, o = y.hasOverflowY, a = y.scrollWidth, c = y.scrollHeight, p = y.clientWidth, u = y.clientHeight, l = y.hasOverscrollBehaviorX, h = y.hasOverscrollBehaviorY;
                        if (!(s && r || o && n)) return !1;
                        let b = Math.abs(e) >= Math.abs(i) ? "horizontal" : "vertical";
                        if ("horizontal" === b) d = Math.round(t.scrollLeft), m = a - p, f = e, v = s, w = r, g = l;
                        else {
                            if ("vertical" !== b) return !1;
                            d = Math.round(t.scrollTop), m = c - u, f = i, v = o, w = n, g = h
                        }
                        return !g && (d >= m || d <= 0) || (f > 0 ? d < m : d > 0) && v && w
                    }
                    get rootElement() {
                        return this.options.wrapper === window ? document.documentElement : this.options.wrapper
                    }
                    get limit() {
                        return this.options.naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"]
                    }
                    get isHorizontal() {
                        return "horizontal" === this.options.orientation
                    }
                    get actualScroll() {
                        let t = this.options.wrapper;
                        return this.isHorizontal ? t.scrollX ?? t.scrollLeft : t.scrollY ?? t.scrollTop
                    }
                    get scroll() {
                        var t;
                        return this.options.infinite ? (this.animatedScroll % (t = this.limit) + t) % t : this.animatedScroll
                    }
                    get progress() {
                        return 0 === this.limit ? 1 : this.scroll / this.limit
                    }
                    get isScrolling() {
                        return this._isScrolling
                    }
                    set isScrolling(t) {
                        this._isScrolling !== t && (this._isScrolling = t, this.updateClassName())
                    }
                    get isStopped() {
                        return this._isStopped
                    }
                    set isStopped(t) {
                        this._isStopped !== t && (this._isStopped = t, this.updateClassName())
                    }
                    get isLocked() {
                        return this._isLocked
                    }
                    set isLocked(t) {
                        this._isLocked !== t && (this._isLocked = t, this.updateClassName())
                    }
                    get isSmooth() {
                        return "smooth" === this.isScrolling
                    }
                    get className() {
                        let t = "lenis";
                        return this.options.autoToggle && (t += " lenis-autoToggle"), this.isStopped && (t += " lenis-stopped"), this.isLocked && (t += " lenis-locked"), this.isScrolling && (t += " lenis-scrolling"), "smooth" === this.isScrolling && (t += " lenis-smooth"), t
                    }
                    updateClassName() {
                        this.cleanUpClassName(), this.className.split(" ").forEach(t => {
                            this.rootElement.classList.add(t)
                        })
                    }
                    cleanUpClassName() {
                        for (let t of Array.from(this.rootElement.classList))("lenis" === t || t.startsWith("lenis-")) && this.rootElement.classList.remove(t)
                    }
                },
                m = i(55729),
                f = i(6029);
            let v = (0, m.createContext)(null),
                w = new class {
                    listeners = [];
                    constructor(t) {
                        this.state = t
                    }
                    set(t) {
                        for (let e of (this.state = t, this.listeners)) e(this.state)
                    }
                    subscribe(t) {
                        return this.listeners = [...this.listeners, t], () => {
                            this.listeners = this.listeners.filter(e => e !== t)
                        }
                    }
                    get() {
                        return this.state
                    }
                }(null),
                g = (0, m.forwardRef)(({
                    children: t,
                    root: e = !1,
                    options: i = {},
                    autoRaf: s = !0,
                    className: o = "",
                    ...r
                }, n) => {
                    let l = (0, m.useRef)(null),
                        h = (0, m.useRef)(null),
                        [a, c] = (0, m.useState)(void 0);
                    (0, m.useImperativeHandle)(n, () => ({
                        wrapper: l.current,
                        content: h.current,
                        lenis: a
                    }), [a]), (0, m.useEffect)(() => {
                        let t = new d({ ...i,
                            ...l.current && h.current && {
                                wrapper: l.current,
                                content: h.current
                            },
                            autoRaf: i ?.autoRaf ?? s
                        });
                        return c(t), () => {
                            t.destroy(), c(void 0)
                        }
                    }, [s, JSON.stringify({ ...i,
                        wrapper: null,
                        content: null
                    })]);
                    let p = (0, m.useRef)([]),
                        u = (0, m.useCallback)((t, e) => {
                            p.current.push({
                                callback: t,
                                priority: e
                            }), p.current.sort((t, e) => t.priority - e.priority)
                        }, []),
                        g = (0, m.useCallback)(t => {
                            p.current = p.current.filter(e => e.callback !== t)
                        }, []);
                    return ((0, m.useEffect)(() => {
                        if (e && a) return w.set({
                            lenis: a,
                            addCallback: u,
                            removeCallback: g
                        }), () => w.set(null)
                    }, [e, a, u, g]), (0, m.useEffect)(() => {
                        if (!a) return;
                        let t = t => {
                            for (let {
                                    callback: e
                                } of p.current) e(t)
                        };
                        return a.on("scroll", t), () => {
                            a.off("scroll", t)
                        }
                    }, [a]), t) ? (0, f.jsx)(v.Provider, {
                        value: {
                            lenis: a,
                            addCallback: u,
                            removeCallback: g
                        },
                        children: e && "asChild" !== e ? t : (0, f.jsx)("div", {
                            ref: l,
                            className: `${o} ${a?.className??""}`.trim(),
                            ...r,
                            children: (0, f.jsx)("div", {
                                ref: h,
                                children: t
                            })
                        })
                    }) : null
                }),
                S = {};

            function y(t, e = [], i = 0) {
                let s = (0, m.useContext)(v),
                    o = function(t) {
                        let [e, i] = (0, m.useState)(t.get());
                        return (0, m.useEffect)(() => t.subscribe(t => i(t)), [t]), e
                    }(w),
                    {
                        lenis: r,
                        addCallback: n,
                        removeCallback: l
                    } = s ?? o ?? S;
                return (0, m.useEffect)(() => {
                    if (t && n && l && r) return n(t, i), t(r), () => {
                        l(t)
                    }
                }, [r, n, l, i, ...e, t]), r
            }
        },
        62493: (t, e, i) => {
            function s(t, e) {
                let i;
                return function(...s) {
                    clearTimeout(i), i = setTimeout(() => {
                        i = void 0, t.apply(this, s)
                    }, e)
                }
            }
            i.d(e, {
                A: () => n
            });
            var o = class {
                element;
                options;
                align;
                rect = {};
                wrapperResizeObserver;
                resizeObserver;
                debouncedWrapperResize;
                constructor(t, {
                    align: e = ["start"],
                    ignoreSticky: i = !0,
                    ignoreTransform: o = !1
                } = {}) {
                    this.element = t, this.options = {
                        align: e,
                        ignoreSticky: i,
                        ignoreTransform: o
                    }, this.align = [e].flat(), this.debouncedWrapperResize = s(this.onWrapperResize, 500), this.wrapperResizeObserver = new ResizeObserver(this.debouncedWrapperResize), this.wrapperResizeObserver.observe(document.body), this.onWrapperResize(), this.resizeObserver = new ResizeObserver(this.onResize), this.resizeObserver.observe(this.element), this.setRect({
                        width: this.element.offsetWidth,
                        height: this.element.offsetHeight
                    })
                }
                destroy() {
                    this.wrapperResizeObserver.disconnect(), this.resizeObserver.disconnect()
                }
                setRect({
                    top: t,
                    left: e,
                    width: i,
                    height: s,
                    element: o
                } = {}) {
                    t = t ?? this.rect.top, e = e ?? this.rect.left, i = i ?? this.rect.width, s = s ?? this.rect.height, o = o ?? this.rect.element, (t !== this.rect.top || e !== this.rect.left || i !== this.rect.width || s !== this.rect.height || o !== this.rect.element) && (this.rect.top = t, this.rect.y = t, this.rect.width = i, this.rect.height = s, this.rect.left = e, this.rect.x = e, this.rect.bottom = t + s, this.rect.right = e + i)
                }
                onWrapperResize = () => {
                    let t, e;
                    if (this.options.ignoreSticky && function t(e) {
                            "sticky" === getComputedStyle(e).position && (e.style.setProperty("position", "static"), e.dataset.sticky = "true"), e.offsetParent && t(e.offsetParent)
                        }(this.element), this.options.ignoreTransform) t = function t(e, i = 0) {
                        let s = i + e.offsetTop;
                        return e.offsetParent ? t(e.offsetParent, s) : s
                    }(this.element), e = function t(e, i = 0) {
                        let s = i + e.offsetLeft;
                        return e.offsetParent ? t(e.offsetParent, s) : s
                    }(this.element);
                    else {
                        let i = this.element.getBoundingClientRect();
                        t = i.top + function t(e, i = 0) {
                            let s = i + e.scrollTop;
                            return e.offsetParent ? t(e.offsetParent, s) : s + window.scrollY
                        }(this.element), e = i.left + function t(e, i = 0) {
                            let s = i + e.scrollLeft;
                            return e.offsetParent ? t(e.offsetParent, s) : s + window.scrollX
                        }(this.element)
                    }
                    this.options.ignoreSticky && function t(e) {
                        e ?.dataset ?.sticky === "true" && (e.style.removeProperty("position"), delete e.dataset.sticky), e.offsetParent && t(e.offsetParent)
                    }(this.element), this.setRect({
                        top: t,
                        left: e
                    })
                };
                onResize = ([t]) => {
                    if (!t ?.borderBoxSize[0]) return;
                    let e = t.borderBoxSize[0].inlineSize,
                        i = t.borderBoxSize[0].blockSize;
                    this.setRect({
                        width: e,
                        height: i
                    })
                }
            };
            let r = 0;
            var n = class {
                options;
                elements = new Map;
                snaps = new Map;
                viewport = {
                    width: window.innerWidth,
                    height: window.innerHeight
                };
                isStopped = !1;
                onSnapDebounced;
                currentSnapIndex;
                constructor(t, {
                    type: e = "proximity",
                    lerp: i,
                    easing: o,
                    duration: r,
                    distanceThreshold: n = "50%",
                    debounce: l = 500,
                    onSnapStart: h,
                    onSnapComplete: a
                } = {}) {
                    this.lenis = t, window.lenis || (window.lenis = {}), window.lenis.snap = !0, this.options = {
                        type: e,
                        lerp: i,
                        easing: o,
                        duration: r,
                        distanceThreshold: n,
                        debounce: l,
                        onSnapStart: h,
                        onSnapComplete: a
                    }, this.onWindowResize(), window.addEventListener("resize", this.onWindowResize), this.onSnapDebounced = s(this.onSnap, this.options.debounce), this.lenis.on("virtual-scroll", this.onSnapDebounced)
                }
                destroy() {
                    this.lenis.off("virtual-scroll", this.onSnapDebounced), window.removeEventListener("resize", this.onWindowResize), this.elements.forEach(t => {
                        t.destroy()
                    })
                }
                start() {
                    this.isStopped = !1
                }
                stop() {
                    this.isStopped = !0
                }
                add(t) {
                    let e = r++;
                    return this.snaps.set(e, {
                        value: t
                    }), () => this.snaps.delete(e)
                }
                addElement(t, e = {}) {
                    let i = r++;
                    return this.elements.set(i, new o(t, e)), () => this.elements.delete(i)
                }
                addElements(t, e = {}) {
                    let i = [...t].map(t => this.addElement(t, e));
                    return () => {
                        i.forEach(t => {
                            t()
                        })
                    }
                }
                onWindowResize = () => {
                    this.viewport.width = window.innerWidth, this.viewport.height = window.innerHeight
                };
                computeSnaps = () => {
                    let {
                        isHorizontal: t
                    } = this.lenis, e = [...this.snaps.values()];
                    return this.elements.forEach(({
                        rect: i,
                        align: s
                    }) => {
                        let o;
                        s.forEach(s => {
                            "start" === s ? o = i.top : "center" === s ? o = t ? i.left + i.width / 2 - this.viewport.width / 2 : i.top + i.height / 2 - this.viewport.height / 2 : "end" === s && (o = t ? i.left + i.width - this.viewport.width : i.top + i.height - this.viewport.height), "number" == typeof o && e.push({
                                value: Math.ceil(o)
                            })
                        })
                    }), e = e.sort((t, e) => Math.abs(t.value) - Math.abs(e.value))
                };
                previous() {
                    this.goTo((this.currentSnapIndex ?? 0) - 1)
                }
                next() {
                    this.goTo((this.currentSnapIndex ?? 0) + 1)
                }
                goTo(t) {
                    let e = this.computeSnaps();
                    if (0 === e.length) return;
                    this.currentSnapIndex = Math.max(0, Math.min(t, e.length - 1));
                    let i = e[this.currentSnapIndex];
                    void 0 !== i && this.lenis.scrollTo(i.value, {
                        duration: this.options.duration,
                        easing: this.options.easing,
                        lerp: this.options.lerp,
                        lock: "lock" === this.options.type,
                        userData: {
                            initiator: "snap"
                        },
                        onStart: () => {
                            this.options.onSnapStart ?.({
                                index: this.currentSnapIndex,
                                ...i
                            })
                        },
                        onComplete: () => {
                            this.options.onSnapComplete ?.({
                                index: this.currentSnapIndex,
                                ...i
                            })
                        }
                    })
                }
                get distanceThreshold() {
                    if ("mandatory" === this.options.type) return 1 / 0;
                    let {
                        isHorizontal: t
                    } = this.lenis, e = t ? "width" : "height";
                    return "string" == typeof this.options.distanceThreshold && this.options.distanceThreshold.endsWith("%") ? Number(this.options.distanceThreshold.replace("%", "")) / 100 * this.viewport[e] : "number" == typeof this.options.distanceThreshold ? this.options.distanceThreshold : this.viewport[e]
                }
                onSnap = t => {
                    let e;
                    if (this.isStopped || "touchmove" === t.event.type || "lock" === this.options.type && this.lenis.userData ?.initiator === "snap") return;
                    let {
                        scroll: i,
                        isHorizontal: s
                    } = this.lenis, o = s ? t.deltaX : t.deltaY;
                    i = Math.ceil(this.lenis.scroll + o);
                    let r = this.computeSnaps();
                    if (0 === r.length) return;
                    let n = r.findLastIndex(({
                            value: t
                        }) => t < i),
                        l = r.findIndex(({
                            value: t
                        }) => t > i);
                    if ("lock" === this.options.type) o > 0 ? e = l : o < 0 && (e = n);
                    else {
                        let t = r[n],
                            s = t ? Math.abs(i - t.value) : 1 / 0,
                            o = r[l];
                        e = s < (o ? Math.abs(i - o.value) : 1 / 0) ? n : l
                    }
                    if (void 0 === e || -1 === e) return;
                    e = Math.max(0, Math.min(e, r.length - 1));
                    let h = r[e];
                    Math.abs(i - h.value) <= this.distanceThreshold && this.goTo(e)
                };
                resize() {
                    this.elements.forEach(t => {
                        t.onWrapperResize()
                    })
                }
            }
        }
    }
]);
//# sourceMappingURL=1435-2294ca77dbe42df1.js.map