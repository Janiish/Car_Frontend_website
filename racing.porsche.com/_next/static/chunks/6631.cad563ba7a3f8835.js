(() => {
    "use strict";
    let e = {
        demux: function(e) {
            let r = new DataView(e, 0, 4).getUint32(0, !0),
                i = t(e, 4 * !!r);
            if (!r) return i;
            let a = t(e, r);
            return { ...i,
                alpha: a
            }
        },
        demuxStream: r
    };

    function t(e, t) {
        let {
            manifest: r,
            byteLength: a
        } = i(e, t);
        t += 8 + a;
        let s = {
                config: r.config,
                width: r.width,
                height: r.height,
                duration: r.duration,
                length: r.frames.length,
                indices: new Map,
                frames: []
            },
            o = 0;
        for (let i = 0; i < r.frames.length; i++) {
            let a = r.frames[i];
            "key" === a.type && (o = i), s.indices.set(a.timestamp, i), s.frames.push({
                keyIndex: o,
                chunk: new EncodedVideoChunk({
                    type: a.type,
                    timestamp: a.timestamp,
                    data: new Uint8Array(e, a.offset + t, a.byteLength)
                })
            })
        }
        return s
    }
    async function r(e, t) {
        let r = function() {
            let e = {
                chunks: [],
                byteOffset: 0,
                byteLength: 0,
                get data() {
                    return e.reduce(), e.chunks[0]
                },
                write(t) {
                    e.chunks.push(t), e.byteLength += t.byteLength
                },
                dispose(t) {
                    e.chunks = [e.data.slice(t - e.byteOffset)], e.byteOffset = Math.max(e.byteOffset, t)
                },
                splice(t) {
                    e.chunks = [e.data.slice(t - e.byteOffset)], e.byteOffset = 0, e.byteLength -= t
                },
                flush() {
                    e.chunks = []
                },
                chunk: (t, r) => new Uint8Array(e.data.buffer, t - e.byteOffset, r),
                view: (t, r) => new DataView(e.data.buffer, t - e.byteOffset, r),
                reduce() {
                    if (e.chunks.length < 2) return;
                    let t = new Uint8Array(e.byteLength - e.byteOffset),
                        r = 0;
                    for (let i of e.chunks) t.set(i, r), r += i.byteLength;
                    e.chunks = [t]
                }
            };
            return e
        }();
        for (; r.byteLength < 8;) {
            let {
                done: t,
                value: i
            } = await e.read();
            if (t) throw Error("Unexpected end of stream reading header");
            r.write(i)
        }
        let a = r.view(0, 8);
        if (a.getUint32(0, !0)) throw Error("Streaming videos with alpha channel is not supported");
        let s = a.getUint32(4, !0) + 8;
        for (; r.byteLength < s;) {
            let {
                done: t,
                value: i
            } = await e.read();
            if (t) throw Error("Unexpected end of stream reading manifest");
            r.write(i)
        }
        let {
            manifest: o
        } = i(r.data.buffer, 0);
        r.splice(s);
        let l = {
            config: o.config,
            width: o.width,
            height: o.height,
            duration: o.duration,
            length: o.frames.length,
            indices: new Map,
            frames: []
        };
        for (let e = 0; e < o.frames.length; e++) l.indices.set(o.frames[e].timestamp, e);
        let n = function(e) {
                let t = new Map;
                return {
                    loaded: (r = e.length) => r <= e.frames.length ? Promise.resolve() : new Promise(e => t.set(e, r)),
                    update() {
                        let r = [];
                        for (let [i, a] of t) a <= e.frames.length && (i(), r.push(i));
                        for (let e of r) t.delete(e)
                    }
                }
            }(l),
            h = 0,
            d = 0,
            c = o.frames[0],
            g = () => {
                let e = !1;
                for (; c && r.byteLength >= c.offset + c.byteLength;) {
                    let t = o.frames[d];
                    e = !0, "key" === t.type && (h = d), l.frames.push({
                        keyIndex: h,
                        chunk: new EncodedVideoChunk({
                            type: t.type,
                            timestamp: t.timestamp,
                            data: r.chunk(t.offset, t.byteLength)
                        })
                    }), c = o.frames[++d]
                }
                c ? r.dispose(c.offset) : r.flush(), e && (t ?.(), n.update())
            };
        return (async () => {
            for (g();;) {
                let {
                    done: t,
                    value: i
                } = await e.read();
                if (t) break;
                r.write(i), g()
            }
        })(), {
            fsv: l,
            loaded: n.loaded
        }
    }

    function i(e, t) {
        var r, i;
        let a = new DataView(e, t).getUint32(4, !0);
        return {
            byteLength: a,
            manifest: { ...r = JSON.parse(new TextDecoder().decode(new Uint8Array(e, t + 8, a))),
                config: { ...i = r.config,
                    description: i.description ? new Uint8Array(i.description) : void 0
                },
                frames: function(e) {
                    let t = [];
                    for (let r = 0; r < e.length; r += 4) t.push({
                        offset: e[r],
                        byteLength: e[r + 1],
                        timestamp: e[r + 2],
                        type: e[r + 3] ? "key" : "delta"
                    });
                    return t
                }(r.frames)
            }
        }
    }
    var a = class e {
            callback;
            currentFrame;
            pendingFrame;
            alpha = !1;
            track;
            config;
            decoder;
            get width() {
                return this.track ?.width || 0
            }
            get height() {
                return this.track ?.height || 0
            }
            get duration() {
                return this.track ?.duration || 0
            }
            get length() {
                return this.track ?.length || 0
            }
            constructor(e) {
                this.callback = e, this.decoder = new VideoDecoder({
                    output: this.output,
                    error: this.error
                })
            }
            async load(t, r) {
                this.config = await e.config(t, r), this.track = t, this.currentFrame = void 0, this.pendingFrame = void 0, this.decoder.reset(), this.decoder.configure(this.config)
            }
            seek(e) {
                this.progress(e / (this.duration / 1e6))
            }
            progress(e) {
                this.set(Math.round(e * (this.length - 1)))
            }
            set(e) {
                if ((e = Math.max(0, Math.min(this.length, e))) === this.currentFrame) return;
                this.pendingFrame = e;
                let t = this.track ?.frames[e];
                if (t) {
                    if ("closed" === this.decoder.state && this.decoder.configure(this.config), "key" !== t.chunk.type && void 0 !== this.currentFrame && this.currentFrame + 1 === e) return void this.decoder.decode(t.chunk);
                    this.decoder.decodeQueueSize > 0 && (this.decoder.reset(), this.decoder.configure(this.config));
                    for (let r = t.keyIndex; r <= e; r++) this.decoder.decode(this.track.frames[r].chunk)
                }
            }
            close() {
                this.currentFrame = void 0, this.pendingFrame = void 0, this.track = void 0, this.decoder.close()
            }
            output = e => {
                let t = this.track.indices.get(e.timestamp);
                this.pendingFrame === t ? (this.currentFrame = t, this.callback(e, t)) : e.close()
            };
            error = e => {
                console.error("FSV", e)
            };
            static async config(e, t) {
                let r = { ...e.config,
                        ...t
                    },
                    {
                        supported: i
                    } = await VideoDecoder.isConfigSupported(r);
                if (!i) throw console.error("FSV", r), Error("Unsupported decoder config");
                return r
            }
        },
        s = class {
            callback;
            currentFrame;
            pendingFrame;
            get width() {
                return this.colorDecoder.width
            }
            get height() {
                return this.colorDecoder.height
            }
            get duration() {
                return this.colorDecoder.duration
            }
            get length() {
                return this.colorDecoder.length
            }
            get alpha() {
                return !!this.alphaDecoder
            }
            colorDecoder;
            alphaDecoder;
            colorFrame;
            alphaFrame;
            constructor(e) {
                this.callback = e, this.colorDecoder = new a(this.colorCallback)
            }
            async load(t, r) {
                let i = e.demux(t);
                if (i.alpha ? this.alphaDecoder ||= new a(this.alphaCallback) : (this.alphaDecoder ?.close(), this.alphaDecoder = void 0), await Promise.all([this.colorDecoder.load(i, r), this.alphaDecoder ?.load(i.alpha, r)]), this.alphaDecoder && this.alphaDecoder.length !== this.colorDecoder.length) throw Error("Color and alpha tracks don't have the same number of frames");
                this.currentFrame = void 0, this.pendingFrame = void 0, this.colorFrame = void 0, this.alphaFrame = void 0
            }
            async loadStream(t, r) {
                let {
                    fsv: i,
                    loaded: a
                } = await e.demuxStream(t, () => {
                    void 0 !== this.pendingFrame && this.colorDecoder.set(this.pendingFrame)
                });
                this.alphaDecoder ?.close(), this.alphaDecoder = void 0;
                try {
                    await this.colorDecoder.load(i, r)
                } catch (e) {
                    throw await t.cancel(), e
                }
                return this.currentFrame = void 0, this.pendingFrame = void 0, this.colorFrame = void 0, this.alphaFrame = void 0, {
                    loaded: a
                }
            }
            seek(e) {
                this.progress(e / this.duration)
            }
            progress(e) {
                this.set(Math.round(e * (this.colorDecoder.length - 1)))
            }
            set(e) {
                e !== this.currentFrame && e !== this.pendingFrame && (this.pendingFrame = e, this.colorFrame ?.close(), this.alphaFrame ?.close(), this.colorFrame = void 0, this.alphaFrame = void 0, this.colorDecoder.set(e), this.alphaDecoder ?.set(e))
            }
            close() {
                this.colorDecoder.close(), this.alphaDecoder ?.close(), this.colorFrame ?.close(), this.alphaFrame ?.close(), this.colorFrame = void 0, this.alphaFrame = void 0, this.currentFrame = void 0, this.pendingFrame = void 0
            }
            colorCallback = (e, t) => {
                t === this.pendingFrame ? (this.colorFrame = e, this.commonCallback()) : e.close()
            };
            alphaCallback = (e, t) => {
                t === this.pendingFrame ? (this.alphaFrame = e, this.commonCallback()) : e.close()
            };
            commonCallback = () => {
                this.colorFrame && (!this.alphaDecoder || this.alphaFrame) && (this.currentFrame = this.pendingFrame, this.callback(this.colorFrame, this.alphaFrame, this.currentFrame), this.colorFrame.close(), this.alphaFrame ?.close(), this.colorFrame = void 0, this.alphaFrame = void 0)
            }
        },
        o = class {
    #version;
    #ifdef;
    #endif;
    #define;

get width() {
                return this.decoder.width
            }
            get height() {
                return this.decoder.height
            }
            get duration() {
                return this.decoder.duration
            }
            get length() {
                return this.decoder.length
            }
            get currentFrame() {
                return this.decoder.currentFrame
            }
            get pendingFrame() {
                return this.decoder.pendingFrame
            }
            constructor({
                canvas: e,
                premultiplyAlpha: t = !0,
                context: r
            } = {}) {
                let i = (e ||= document.createElement("canvas")).getContext("webgl2", {
                    alpha: !0,
                    antialias: !1,
                    premultipliedAlpha: !0,
                    depth: !1,
                    preserveDrawingBuffer: !1,
                    stencil: !1,
                    ...r
                });
                if (!i) throw Error("WebGL2 is not supported");
                this.gl = i, this.canvas = e, this.premultiplyAlpha = t, this.currentPremultiplyAlpha = t, this.decoder = new s(this.draw.bind(this)), this.colorTexture = this.createTexture(), this.vertexArray = i.createVertexArray(), i.bindVertexArray(this.vertexArray), this.buffer = i.createBuffer(), i.bindBuffer(i.ARRAY_BUFFER, this.buffer), i.bufferData(i.ARRAY_BUFFER, new Float32Array([-1, -1, 0, 1, 3, -1, 2, 1, -1, 3, 0, -1]), i.STATIC_DRAW), i.enableVertexAttribArray(0), i.vertexAttribPointer(0, 2, i.FLOAT, !1, 16, 0), i.enableVertexAttribArray(1), i.vertexAttribPointer(1, 2, i.FLOAT, !1, 16, 8)
            }
            async load(e, t) {
                if ("string" == typeof e) {
                    let t = await fetch(e);
                    if (!t.ok) throw Error(`Failed to fetch video: ${t.statusText}`);
                    e = await t.arrayBuffer()
                }
                await this.decoder.load(e, t), this.initialize()
            }
            async loadStream(e, t) {
                let r;
                if ("string" == typeof e) {
                    let t = await fetch(e);
                    if (!t.ok) throw Error(`Failed to fetch video: ${t.statusText}`);
                    r = t.body.getReader()
                } else r = e;
                let {
                    loaded: i
                } = await this.decoder.loadStream(r, t);
                return this.initialize(), {
                    loaded: i
                }
            }
            seek(e) {
                this.decoder.seek(e)
            }
            progress(e) {
                this.decoder.progress(e)
            }
            set(e) {
                this.decoder.set(e)
            }
            close() {
                this.decoder.close(), this.program && this.gl.deleteProgram(this.program), this.vertexShader && this.gl.deleteShader(this.vertexShader), this.fragmentShader && this.gl.deleteShader(this.fragmentShader), this.gl.deleteTexture(this.colorTexture), this.alphaTexture && this.gl.deleteTexture(this.alphaTexture), this.gl.deleteBuffer(this.buffer)
            }
            initialize() {
                if (this.program && this.alpha === this.decoder.alpha && this.premultiplyAlpha === this.currentPremultiplyAlpha) return;
                this.alpha = this.decoder.alpha, this.program && this.gl.deleteProgram(this.program), this.vertexShader && this.gl.deleteShader(this.vertexShader), this.fragmentShader && this.gl.deleteShader(this.fragmentShader);
                let e = this.createShader(this.gl.VERTEX_SHADER, "#version 300 es\n\nlayout(location = 0) in vec2 position;\nlayout(location = 1) in vec2 uv;\n\nout vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = vec4(position, 0.0, 1.0);\n}\n"),
                    t = this.createShader(this.gl.FRAGMENT_SHADER, "#version 300 es\n\nprecision highp float;\n\nuniform sampler2D color;\n\n#ifdef ALPHA\n  uniform sampler2D alpha;\n#endif\n\nin vec2 vUv;\nout vec4 fragColor;\n\nvoid main() {\n  fragColor = texture(color, vUv);\n\n  #ifdef ALPHA\n    fragColor.a = texture(alpha, vUv).r;\n\n    #ifdef PREMULTIPLY_ALPHA\n      fragColor.rgb *= fragColor.a;\n    #endif\n  #endif\n}\n"),
                    r = this.createProgram(e, t);
                this.program = r, this.vertexShader = e, this.fragmentShader = t, this.currentPremultiplyAlpha = this.premultiplyAlpha, this.gl.useProgram(r), this.gl.uniform1i(this.gl.getUniformLocation(r, "color"), 0), this.alpha ? (this.alphaTexture ||= this.createTexture(), this.gl.uniform1i(this.gl.getUniformLocation(r, "alpha"), 1)) : this.alphaTexture && (this.gl.deleteTexture(this.alphaTexture), this.alphaTexture = void 0)
            }
            draw(e, t) {
                (this.canvas.width !== e.displayWidth || this.canvas.height !== e.displayHeight) && (this.canvas.width = e.displayWidth, this.canvas.height = e.displayHeight, this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight)), this.updateTexture(this.gl.TEXTURE0, this.colorTexture, e), e.close(), this.updateTexture(this.gl.TEXTURE1, this.alphaTexture, t), t ?.close(), this.gl.clearColor(0, 0, 0, 0), this.gl.clear(this.gl.COLOR_BUFFER_BIT), this.gl.useProgram(this.program), this.gl.bindVertexArray(this.vertexArray), this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 3)
            }
            createProgram(e, t) {
                let r = this.gl.createProgram();
                if (this.gl.attachShader(r, e), this.gl.attachShader(r, t), this.gl.linkProgram(r), !this.gl.getProgramParameter(r, this.gl.LINK_STATUS)) {
                    let i = this.gl.getProgramInfoLog(r);
                    throw this.gl.deleteProgram(r), this.gl.deleteShader(e), this.gl.deleteShader(t), console.error(i), Error("Unable to create WebGL program")
                }
                return r
            }
            createShader(e, t) {
                let r = this.gl.createShader(e);
                if (!r) throw Error("Unable to create WebGL shader");
                if (this.premultiplyAlpha && (t = t.replace(/^(#version\s+.+)$/m, "$1\n#define PREMULTIPLY_ALPHA 1")), this.alpha && (t = t.replace(/^(#version\s+.+)$/m, "$1\n#define ALPHA 1")), this.gl.shaderSource(r, t), this.gl.compileShader(r), !this.gl.getShaderParameter(r, this.gl.COMPILE_STATUS)) {
                    let e = this.gl.getShaderInfoLog(r);
                    throw this.gl.deleteShader(r), console.error(e), Error("Unable to create WebGL shader")
                }
                return r
            }
            createTexture() {
                let e = this.gl,
                    t = e.createTexture();
                return e.bindTexture(e.TEXTURE_2D, t), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), t
            }
            updateTexture(e, t, r) {
                t && r && (this.gl.activeTexture(e), this.gl.bindTexture(this.gl.TEXTURE_2D, t), this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, r))
            }
        };
    let l = new Map,
        n = self;

    function h(e) {
        n.postMessage(e)
    }

    function d(e) {
        if (null !== e.pollTimer && (clearTimeout(e.pollTimer), e.pollTimer = null), e.renderer) {
            try {
                e.renderer.close()
            } catch (e) {}
            e.renderer = null
        }
        e.loaded = !1, e.loading = !1
    }

    function c(e, t, r) {
        let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 90,
            a = l.get(e);
        if (!(null == a ? void 0 : a.renderer) || a.gen !== t) return;
        let s = a.renderer.currentFrame;
        if (null === r ? void 0 !== s : s === r) return void h({
            type: "firstFrame",
            id: e
        });
        i <= 0 || (a.pollTimer = setTimeout(() => c(e, t, r, i - 1), 16))
    }
    async function g(e) {
        let t = l.get(e);
        if (!t || t.loaded || t.loading) return;
        t.loading = !0;
        let r = t.gen;
        try {
            var i, a;
            null != t.renderer || (t.renderer = new o({
                canvas: t.offscreen
            }));
            let s = t.renderer;
            if ("full" === t.loadMode) await s.load(t.fsvUrl);
            else {
                let e = await s.loadStream(t.fsvUrl);
                await e.loaded(1)
            }
            if (t.gen !== r || t.renderer !== s) return;
            let l = null != (i = s.duration) ? i : 0,
                n = null != (a = s.length) ? a : 0,
                d = l > 0 && n > 0 ? n / (l / 1e6) : 30;
            t.loaded = !0, t.loading = !1, s.set(0), h({
                type: "ready",
                id: e,
                durationUs: l,
                frameCount: n,
                fps: d
            }), c(e, r, null, 625)
        } catch (r) {
            t.loading = !1, h({
                type: "error",
                id: e,
                message: r instanceof Error ? r.message : String(r)
            })
        }
    }

    function u(e, t) {
        let r = l.get(e);
        if ((null == r ? void 0 : r.renderer) && r.loaded) try {
            t(r.renderer)
        } catch (e) {}
    }

    function f(e, t) {
        let r = l.get(e);
        (null == r ? void 0 : r.renderer) && r.loaded && (r.pendingSeek = t, r.drainScheduled || (r.drainScheduled = !0, setTimeout(() => {
            r.drainScheduled = !1;
            let t = r.pendingSeek;
            t && (r.pendingSeek = null, "progress" === t.type ? u(e, e => e.progress(t.p)) : u(e, e => e.set(t.index)))
        }, 0)))
    }
    async function p(e) {
        let t = l.get(e);
        if (!(null == t ? void 0 : t.renderer) || !t.loaded) return void n.postMessage({
            type: "snapshot",
            id: e,
            bitmap: null
        });
        try {
            let r = await createImageBitmap(t.offscreen);
            n.postMessage({
                type: "snapshot",
                id: e,
                bitmap: r
            }, [r])
        } catch (t) {
            n.postMessage({
                type: "snapshot",
                id: e,
                bitmap: null
            })
        }
    }
    self.onmessage = e => {
        let t = e.data;
        switch (t.type) {
            case "register":
                ! function(e) {
                    var t;
                    e.maxPixelWidth && e.maxPixelHeight && function(e, t, r) {
                        let i = Object.getPrototypeOf(e),
                            a = Object.getOwnPropertyDescriptor(i, "width"),
                            s = Object.getOwnPropertyDescriptor(i, "height");
                        if (!(null == a ? void 0 : a.set) || !(null == s ? void 0 : s.set) || !a.get || !s.get) return;
                        let o = a.get,
                            l = a.set,
                            n = s.get,
                            h = s.set,
                            d = o.call(e),
                            c = n.call(e);

                        function g() {
                            if (d <= 0 || c <= 0) return;
                            let i = d,
                                a = c;
                            if (i > t || a > r) {
                                let e = Math.min(t / i, r / a);
                                i = Math.round(i * e) || 1, a = Math.round(a * e) || 1
                            }
                            let s = o.call(e),
                                g = n.call(e);
                            s !== i && l.call(e, i), g !== a && h.call(e, a)
                        }
                        Object.defineProperty(e, "width", {
                            get() {
                                return o.call(this)
                            },
                            set(e) {
                                d = e, g()
                            },
                            configurable: !0
                        }), Object.defineProperty(e, "height", {
                            get() {
                                return n.call(this)
                            },
                            set(e) {
                                c = e, g()
                            },
                            configurable: !0
                        })
                    }(e.offscreen, e.maxPixelWidth, e.maxPixelHeight);
                    try {
                        e.offscreen.getContext("webgl2", {
                            preserveDrawingBuffer: !1 !== e.preserveDrawingBuffer
                        })
                    } catch (e) {}
                    l.set(e.id, {
                        offscreen: e.offscreen,
                        renderer: null,
                        fsvUrl: e.fsvUrl,
                        loadMode: null != (t = e.loadMode) ? t : "stream",
                        gen: 0,
                        loaded: !1,
                        loading: !1,
                        pollTimer: null,
                        pendingSeek: null,
                        drainScheduled: !1
                    })
                }(t);
                break;
            case "load":
                g(t.id);
                break;
            case "free":
            case "dispose":
                ! function(e) {
                    let t = l.get(e);
                    t && (t.gen++, d(t))
                }(t.id);
                break;
            case "reload":
                ! function(e, t, r) {
                    let i = l.get(e);
                    i && i.fsvUrl !== t && (i.fsvUrl = t, r && (i.loadMode = r), i.gen++, d(i), g(e))
                }(t.id, t.fsvUrl, t.loadMode);
                break;
            case "seekProgress":
                var r;
                f(t.id, {
                    type: "progress",
                    p: (r = t.p) < 0 ? 0 : r > 1 ? 1 : r
                });
                break;
            case "seekFrame":
                f(t.id, {
                    type: "frame",
                    index: 0 | t.index
                });
                break;
            case "reset":
                ! function(e) {
                    let t = l.get(e);
                    (null == t ? void 0 : t.renderer) && t.loaded && (u(e, e => e.set(0)), c(e, t.gen, 0))
                }(t.id);
                break;
            case "snapshot":
                p(t.id)
        }
    }
})(), _N_E = {};
//# sourceMappingURL=6631.cad563ba7a3f8835.js.map