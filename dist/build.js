! function(t) {
    var e = {};

    function n(r) {
        if (e[r]) return e[r].exports;
        var i = e[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return t[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }
    n.m = t, n.c = e, n.d = function(t, e, r) {
        n.o(t, e) || Object.defineProperty(t, e, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }, n.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "/dist/", n(n.s = 5)
}([function(t, e) {
    var n;
    n = function() {
        return this
    }();
    try {
        n = n || Function("return this")() || (0, eval)("this")
    } catch (t) {
        "object" == typeof window && (n = window)
    }
    t.exports = n
}, function(t, e, n) {
    "use strict";
    var r = n(18),
        i = n(24),
        a = new r.a({
            accessToken: i.a.app.token
        });
    e.a = {
        name: "app",
        data: function() {
            return {
                answers: [],
                query: "",
                speech: i.a.locale.strings.voiceTitle,
                micro: !1,
                muted: i.a.app.muted,
                online: navigator.onLine,
                config: i.a
            }
        },
        watch: {
            answers: function(t) {
                setTimeout(function() {
                    document.querySelector("#bottom").scrollIntoView({
                        behavior: "smooth"
                    })
                }, 2)
            }
        },
        methods: {
            submit: function() {
                var t = this;
                a.textRequest(this.query).then(function(e) {
                    "input.unknown" == e.result.action && 1 == t.config.app.googleIt && (e.result.fulfillment.messages[0].unknown = !0, e.result.fulfillment.messages[0].text = e.result.resolvedQuery), t.answers.push(e), t.handle(e), t.query = "", t.speech = i.a.locale.strings.voiceTitle
                })
            },
            handle: function(t) {
                if (t.result.fulfillment.speech || "simple_response" == t.result.fulfillment.messages[0].type) {
                    var e = new SpeechSynthesisUtterance(t.result.fulfillment.speech || t.result.fulfillment.messages[0].textToSpeech);
                    e.voiceURI = "native", e.lang = i.a.locale.settings.speechLang, 0 == this.muted && window.speechSynthesis.speak(e)
                }
            },
            autosubmit: function(t) {
                this.query = t, this.submit()
            },
            mute: function(t) {
                this.muted = t
            },
            microphone: function(t) {
                this.micro = t;
                var e = this;
                if (1 == t) {
                    var n = new webkitSpeechRecognition;
                    n.interimResults = !0, n.lang = i.a.locale.settings.recognitionLang, n.start(), n.onresult = function(t) {
                        for (var n = t.resultIndex; n < t.results.length; ++n) e.speech = t.results[n][0].transcript
                    }, n.onend = function() {
                        n.stop(), e.micro = !1, e.autosubmit(e.speech)
                    }
                }
            }
        }
    }
}, function(t, e, n) {
    "use strict";
    var r;
    n.d(e, "a", function() {
            return r
        }),
        function(t) {
            let e;
            ! function(t) {
                t[t.EN = "en"] = "EN", t[t.DE = "de"] = "DE", t[t.ES = "es"] = "ES", t[t.PT_BR = "pt-BR"] = "PT_BR", t[t.ZH_HK = "zh-HK"] = "ZH_HK", t[t.ZH_CN = "zh-CN"] = "ZH_CN", t[t.ZH_TW = "zh-TW"] = "ZH_TW", t[t.NL = "nl"] = "NL", t[t.FR = "fr"] = "FR", t[t.IT = "it"] = "IT", t[t.JA = "ja"] = "JA", t[t.KO = "ko"] = "KO", t[t.PT = "pt"] = "PT", t[t.RU = "ru"] = "RU", t[t.UK = "uk"] = "UK"
            }(e = t.AVAILABLE_LANGUAGES || (t.AVAILABLE_LANGUAGES = {})), t.VERSION = "2.0.0-beta.20", t.DEFAULT_BASE_URL = "https://api.api.ai/v1/", t.DEFAULT_API_VERSION = "20150910", t.DEFAULT_CLIENT_LANG = e.EN
        }(r || (r = {}))
}, function(t, e, n) {
    "use strict";
    class r extends Error {
        constructor(t) {
            super(t), this.message = t, this.stack = (new Error).stack
        }
    }
    e.a = class extends r {
        constructor(t) {
            super(t), this.name = "ApiAiClientConfigurationError"
        }
    };
    e.b = class extends r {
        constructor(t, e = null) {
            super(t), this.message = t, this.code = e, this.name = "ApiAiRequestError"
        }
    }
}, function(t, e, n) {
    "use strict";
    var r = n(3),
        i = n(21);
    class a {
        constructor(t, e) {
            this.apiAiClient = t, this.options = e, this.uri = this.apiAiClient.getApiBaseUrl() + "query?v=" + this.apiAiClient.getApiVersion(), this.requestMethod = i.a.Method.POST, this.headers = {
                Authorization: "Bearer " + this.apiAiClient.getAccessToken()
            }, this.options.lang = this.apiAiClient.getApiLang(), this.options.sessionId = this.apiAiClient.getSessionId()
        }
        static handleSuccess(t) {
            return Promise.resolve(JSON.parse(t.responseText))
        }
        static handleError(t) {
            let e = new r.b(null);
            try {
                const n = JSON.parse(t.responseText);
                e = n.status && n.status.errorDetails ? new r.b(n.status.errorDetails, n.status.code) : new r.b(t.statusText, t.status)
            } catch (n) {
                e = new r.b(t.statusText, t.status)
            }
            return Promise.reject(e)
        }
        perform(t = null) {
            const e = t || this.options;
            return i.a.ajax(this.requestMethod, this.uri, e, this.headers).then(a.handleSuccess.bind(this)).catch(a.handleError.bind(this))
        }
    }
    e.a = a
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(6),
        i = n(10),
        a = n.n(i),
        o = n(11);
    r.a.use(a.a), new r.a({
        el: "#app",
        render: function(t) {
            return t(o.a)
        }
    }).$mount("#app")
}, function(t, e, n) {
    "use strict";
    (function(t, n) {
        /*!
         * Vue.js v2.6.11
         * (c) 2014-2019 Evan You
         * Released under the MIT License.
         */
        var r = Object.freeze({});

        function i(t) {
            return void 0 === t || null === t
        }

        function a(t) {
            return void 0 !== t && null !== t
        }

        function o(t) {
            return !0 === t
        }

        function s(t) {
            return "string" == typeof t || "number" == typeof t || "symbol" == typeof t || "boolean" == typeof t
        }

        function c(t) {
            return null !== t && "object" == typeof t
        }
        var u = Object.prototype.toString;

        function l(t) {
            return "[object Object]" === u.call(t)
        }

        function f(t) {
            return "[object RegExp]" === u.call(t)
        }

        function d(t) {
            var e = parseFloat(String(t));
            return e >= 0 && Math.floor(e) === e && isFinite(t)
        }

        function p(t) {
            return a(t) && "function" == typeof t.then && "function" == typeof t.catch
        }

        function v(t) {
            return null == t ? "" : Array.isArray(t) || l(t) && t.toString === u ? JSON.stringify(t, null, 2) : String(t)
        }

        function h(t) {
            var e = parseFloat(t);
            return isNaN(e) ? t : e
        }

        function m(t, e) {
            for (var n = Object.create(null), r = t.split(","), i = 0; i < r.length; i++) n[r[i]] = !0;
            return e ? function(t) {
                return n[t.toLowerCase()]
            } : function(t) {
                return n[t]
            }
        }
        var g = m("slot,component", !0),
            y = m("key,ref,slot,slot-scope,is");

        function _(t, e) {
            if (t.length) {
                var n = t.indexOf(e);
                if (n > -1) return t.splice(n, 1)
            }
        }
        var b = Object.prototype.hasOwnProperty;

        function C(t, e) {
            return b.call(t, e)
        }

        function x(t) {
            var e = Object.create(null);
            return function(n) {
                return e[n] || (e[n] = t(n))
            }
        }
        var w = /-(\w)/g,
            T = x(function(t) {
                return t.replace(w, function(t, e) {
                    return e ? e.toUpperCase() : ""
                })
            }),
            S = x(function(t) {
                return t.charAt(0).toUpperCase() + t.slice(1)
            }),
            k = /\B([A-Z])/g,
            $ = x(function(t) {
                return t.replace(k, "-$1").toLowerCase()
            });
        var A = Function.prototype.bind ? function(t, e) {
            return t.bind(e)
        } : function(t, e) {
            function n(n) {
                var r = arguments.length;
                return r ? r > 1 ? t.apply(e, arguments) : t.call(e, n) : t.call(e)
            }
            return n._length = t.length, n
        };

        function O(t, e) {
            e = e || 0;
            for (var n = t.length - e, r = new Array(n); n--;) r[n] = t[n + e];
            return r
        }

        function E(t, e) {
            for (var n in e) t[n] = e[n];
            return t
        }

        function P(t) {
            for (var e = {}, n = 0; n < t.length; n++) t[n] && E(e, t[n]);
            return e
        }

        function M(t, e, n) {}
        var N = function(t, e, n) {
                return !1
            },
            L = function(t) {
                return t
            };

        function I(t, e) {
            if (t === e) return !0;
            var n = c(t),
                r = c(e);
            if (!n || !r) return !n && !r && String(t) === String(e);
            try {
                var i = Array.isArray(t),
                    a = Array.isArray(e);
                if (i && a) return t.length === e.length && t.every(function(t, n) {
                    return I(t, e[n])
                });
                if (t instanceof Date && e instanceof Date) return t.getTime() === e.getTime();
                if (i || a) return !1;
                var o = Object.keys(t),
                    s = Object.keys(e);
                return o.length === s.length && o.every(function(n) {
                    return I(t[n], e[n])
                })
            } catch (t) {
                return !1
            }
        }

        function R(t, e) {
            for (var n = 0; n < t.length; n++)
                if (I(t[n], e)) return n;
            return -1
        }

        function D(t) {
            var e = !1;
            return function() {
                e || (e = !0, t.apply(this, arguments))
            }
        }
        var j = "data-server-rendered",
            F = ["component", "directive", "filter"],
            U = ["beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeDestroy", "destroyed", "activated", "deactivated", "errorCaptured", "serverPrefetch"],
            B = {
                optionMergeStrategies: Object.create(null),
                silent: !1,
                productionTip: !1,
                devtools: !1,
                performance: !1,
                errorHandler: null,
                warnHandler: null,
                ignoredElements: [],
                keyCodes: Object.create(null),
                isReservedTag: N,
                isReservedAttr: N,
                isUnknownElement: N,
                getTagNamespace: M,
                parsePlatformTagName: L,
                mustUseProp: N,
                async: !0,
                _lifecycleHooks: U
            },
            V = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

        function H(t) {
            var e = (t + "").charCodeAt(0);
            return 36 === e || 95 === e
        }

        function W(t, e, n, r) {
            Object.defineProperty(t, e, {
                value: n,
                enumerable: !!r,
                writable: !0,
                configurable: !0
            })
        }
        var G = new RegExp("[^" + V.source + ".$_\\d]");
        var z, q = "__proto__" in {},
            K = "undefined" != typeof window,
            X = "undefined" != typeof WXEnvironment && !!WXEnvironment.platform,
            J = X && WXEnvironment.platform.toLowerCase(),
            Y = K && window.navigator.userAgent.toLowerCase(),
            Z = Y && /msie|trident/.test(Y),
            Q = Y && Y.indexOf("msie 9.0") > 0,
            tt = Y && Y.indexOf("edge/") > 0,
            et = (Y && Y.indexOf("android"), Y && /iphone|ipad|ipod|ios/.test(Y) || "ios" === J),
            nt = (Y && /chrome\/\d+/.test(Y), Y && /phantomjs/.test(Y), Y && Y.match(/firefox\/(\d+)/)),
            rt = {}.watch,
            it = !1;
        if (K) try {
            var at = {};
            Object.defineProperty(at, "passive", {
                get: function() {
                    it = !0
                }
            }), window.addEventListener("test-passive", null, at)
        } catch (t) {}
        var ot = function() {
                return void 0 === z && (z = !K && !X && void 0 !== t && (t.process && "server" === t.process.env.VUE_ENV)), z
            },
            st = K && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

        function ct(t) {
            return "function" == typeof t && /native code/.test(t.toString())
        }
        var ut, lt = "undefined" != typeof Symbol && ct(Symbol) && "undefined" != typeof Reflect && ct(Reflect.ownKeys);
        ut = "undefined" != typeof Set && ct(Set) ? Set : function() {
            function t() {
                this.set = Object.create(null)
            }
            return t.prototype.has = function(t) {
                return !0 === this.set[t]
            }, t.prototype.add = function(t) {
                this.set[t] = !0
            }, t.prototype.clear = function() {
                this.set = Object.create(null)
            }, t
        }();
        var ft = M,
            dt = 0,
            pt = function() {
                this.id = dt++, this.subs = []
            };
        pt.prototype.addSub = function(t) {
            this.subs.push(t)
        }, pt.prototype.removeSub = function(t) {
            _(this.subs, t)
        }, pt.prototype.depend = function() {
            pt.target && pt.target.addDep(this)
        }, pt.prototype.notify = function() {
            var t = this.subs.slice();
            for (var e = 0, n = t.length; e < n; e++) t[e].update()
        }, pt.target = null;
        var vt = [];

        function ht(t) {
            vt.push(t), pt.target = t
        }

        function mt() {
            vt.pop(), pt.target = vt[vt.length - 1]
        }
        var gt = function(t, e, n, r, i, a, o, s) {
                this.tag = t, this.data = e, this.children = n, this.text = r, this.elm = i, this.ns = void 0, this.context = a, this.fnContext = void 0, this.fnOptions = void 0, this.fnScopeId = void 0, this.key = e && e.key, this.componentOptions = o, this.componentInstance = void 0, this.parent = void 0, this.raw = !1, this.isStatic = !1, this.isRootInsert = !0, this.isComment = !1, this.isCloned = !1, this.isOnce = !1, this.asyncFactory = s, this.asyncMeta = void 0, this.isAsyncPlaceholder = !1
            },
            yt = {
                child: {
                    configurable: !0
                }
            };
        yt.child.get = function() {
            return this.componentInstance
        }, Object.defineProperties(gt.prototype, yt);
        var _t = function(t) {
            void 0 === t && (t = "");
            var e = new gt;
            return e.text = t, e.isComment = !0, e
        };

        function bt(t) {
            return new gt(void 0, void 0, void 0, String(t))
        }

        function Ct(t) {
            var e = new gt(t.tag, t.data, t.children && t.children.slice(), t.text, t.elm, t.context, t.componentOptions, t.asyncFactory);
            return e.ns = t.ns, e.isStatic = t.isStatic, e.key = t.key, e.isComment = t.isComment, e.fnContext = t.fnContext, e.fnOptions = t.fnOptions, e.fnScopeId = t.fnScopeId, e.asyncMeta = t.asyncMeta, e.isCloned = !0, e
        }
        var xt = Array.prototype,
            wt = Object.create(xt);
        ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(function(t) {
            var e = xt[t];
            W(wt, t, function() {
                for (var n = [], r = arguments.length; r--;) n[r] = arguments[r];
                var i, a = e.apply(this, n),
                    o = this.__ob__;
                switch (t) {
                    case "push":
                    case "unshift":
                        i = n;
                        break;
                    case "splice":
                        i = n.slice(2)
                }
                return i && o.observeArray(i), o.dep.notify(), a
            })
        });
        var Tt = Object.getOwnPropertyNames(wt),
            St = !0;

        function kt(t) {
            St = t
        }
        var $t = function(t) {
            this.value = t, this.dep = new pt, this.vmCount = 0, W(t, "__ob__", this), Array.isArray(t) ? (q ? function(t, e) {
                t.__proto__ = e
            }(t, wt) : function(t, e, n) {
                for (var r = 0, i = n.length; r < i; r++) {
                    var a = n[r];
                    W(t, a, e[a])
                }
            }(t, wt, Tt), this.observeArray(t)) : this.walk(t)
        };

        function At(t, e) {
            var n;
            if (c(t) && !(t instanceof gt)) return C(t, "__ob__") && t.__ob__ instanceof $t ? n = t.__ob__ : St && !ot() && (Array.isArray(t) || l(t)) && Object.isExtensible(t) && !t._isVue && (n = new $t(t)), e && n && n.vmCount++, n
        }

        function Ot(t, e, n, r, i) {
            var a = new pt,
                o = Object.getOwnPropertyDescriptor(t, e);
            if (!o || !1 !== o.configurable) {
                var s = o && o.get,
                    c = o && o.set;
                s && !c || 2 !== arguments.length || (n = t[e]);
                var u = !i && At(n);
                Object.defineProperty(t, e, {
                    enumerable: !0,
                    configurable: !0,
                    get: function() {
                        var e = s ? s.call(t) : n;
                        return pt.target && (a.depend(), u && (u.dep.depend(), Array.isArray(e) && function t(e) {
                            for (var n = void 0, r = 0, i = e.length; r < i; r++)(n = e[r]) && n.__ob__ && n.__ob__.dep.depend(), Array.isArray(n) && t(n)
                        }(e))), e
                    },
                    set: function(e) {
                        var r = s ? s.call(t) : n;
                        e === r || e != e && r != r || s && !c || (c ? c.call(t, e) : n = e, u = !i && At(e), a.notify())
                    }
                })
            }
        }

        function Et(t, e, n) {
            if (Array.isArray(t) && d(e)) return t.length = Math.max(t.length, e), t.splice(e, 1, n), n;
            if (e in t && !(e in Object.prototype)) return t[e] = n, n;
            var r = t.__ob__;
            return t._isVue || r && r.vmCount ? n : r ? (Ot(r.value, e, n), r.dep.notify(), n) : (t[e] = n, n)
        }

        function Pt(t, e) {
            if (Array.isArray(t) && d(e)) t.splice(e, 1);
            else {
                var n = t.__ob__;
                t._isVue || n && n.vmCount || C(t, e) && (delete t[e], n && n.dep.notify())
            }
        }
        $t.prototype.walk = function(t) {
            for (var e = Object.keys(t), n = 0; n < e.length; n++) Ot(t, e[n])
        }, $t.prototype.observeArray = function(t) {
            for (var e = 0, n = t.length; e < n; e++) At(t[e])
        };
        var Mt = B.optionMergeStrategies;

        function Nt(t, e) {
            if (!e) return t;
            for (var n, r, i, a = lt ? Reflect.ownKeys(e) : Object.keys(e), o = 0; o < a.length; o++) "__ob__" !== (n = a[o]) && (r = t[n], i = e[n], C(t, n) ? r !== i && l(r) && l(i) && Nt(r, i) : Et(t, n, i));
            return t
        }

        function Lt(t, e, n) {
            return n ? function() {
                var r = "function" == typeof e ? e.call(n, n) : e,
                    i = "function" == typeof t ? t.call(n, n) : t;
                return r ? Nt(r, i) : i
            } : e ? t ? function() {
                return Nt("function" == typeof e ? e.call(this, this) : e, "function" == typeof t ? t.call(this, this) : t)
            } : e : t
        }

        function It(t, e) {
            var n = e ? t ? t.concat(e) : Array.isArray(e) ? e : [e] : t;
            return n ? function(t) {
                for (var e = [], n = 0; n < t.length; n++) - 1 === e.indexOf(t[n]) && e.push(t[n]);
                return e
            }(n) : n
        }

        function Rt(t, e, n, r) {
            var i = Object.create(t || null);
            return e ? E(i, e) : i
        }
        Mt.data = function(t, e, n) {
            return n ? Lt(t, e, n) : e && "function" != typeof e ? t : Lt(t, e)
        }, U.forEach(function(t) {
            Mt[t] = It
        }), F.forEach(function(t) {
            Mt[t + "s"] = Rt
        }), Mt.watch = function(t, e, n, r) {
            if (t === rt && (t = void 0), e === rt && (e = void 0), !e) return Object.create(t || null);
            if (!t) return e;
            var i = {};
            for (var a in E(i, t), e) {
                var o = i[a],
                    s = e[a];
                o && !Array.isArray(o) && (o = [o]), i[a] = o ? o.concat(s) : Array.isArray(s) ? s : [s]
            }
            return i
        }, Mt.props = Mt.methods = Mt.inject = Mt.computed = function(t, e, n, r) {
            if (!t) return e;
            var i = Object.create(null);
            return E(i, t), e && E(i, e), i
        }, Mt.provide = Lt;
        var Dt = function(t, e) {
            return void 0 === e ? t : e
        };

        function jt(t, e, n) {
            if ("function" == typeof e && (e = e.options), function(t, e) {
                    var n = t.props;
                    if (n) {
                        var r, i, a = {};
                        if (Array.isArray(n))
                            for (r = n.length; r--;) "string" == typeof(i = n[r]) && (a[T(i)] = {
                                type: null
                            });
                        else if (l(n))
                            for (var o in n) i = n[o], a[T(o)] = l(i) ? i : {
                                type: i
                            };
                        t.props = a
                    }
                }(e), function(t, e) {
                    var n = t.inject;
                    if (n) {
                        var r = t.inject = {};
                        if (Array.isArray(n))
                            for (var i = 0; i < n.length; i++) r[n[i]] = {
                                from: n[i]
                            };
                        else if (l(n))
                            for (var a in n) {
                                var o = n[a];
                                r[a] = l(o) ? E({
                                    from: a
                                }, o) : {
                                    from: o
                                }
                            }
                    }
                }(e), function(t) {
                    var e = t.directives;
                    if (e)
                        for (var n in e) {
                            var r = e[n];
                            "function" == typeof r && (e[n] = {
                                bind: r,
                                update: r
                            })
                        }
                }(e), !e._base && (e.extends && (t = jt(t, e.extends, n)), e.mixins))
                for (var r = 0, i = e.mixins.length; r < i; r++) t = jt(t, e.mixins[r], n);
            var a, o = {};
            for (a in t) s(a);
            for (a in e) C(t, a) || s(a);

            function s(r) {
                var i = Mt[r] || Dt;
                o[r] = i(t[r], e[r], n, r)
            }
            return o
        }

        function Ft(t, e, n, r) {
            if ("string" == typeof n) {
                var i = t[e];
                if (C(i, n)) return i[n];
                var a = T(n);
                if (C(i, a)) return i[a];
                var o = S(a);
                return C(i, o) ? i[o] : i[n] || i[a] || i[o]
            }
        }

        function Ut(t, e, n, r) {
            var i = e[t],
                a = !C(n, t),
                o = n[t],
                s = Ht(Boolean, i.type);
            if (s > -1)
                if (a && !C(i, "default")) o = !1;
                else if ("" === o || o === $(t)) {
                var c = Ht(String, i.type);
                (c < 0 || s < c) && (o = !0)
            }
            if (void 0 === o) {
                o = function(t, e, n) {
                    if (!C(e, "default")) return;
                    var r = e.default;
                    0;
                    if (t && t.$options.propsData && void 0 === t.$options.propsData[n] && void 0 !== t._props[n]) return t._props[n];
                    return "function" == typeof r && "Function" !== Bt(e.type) ? r.call(t) : r
                }(r, i, t);
                var u = St;
                kt(!0), At(o), kt(u)
            }
            return o
        }

        function Bt(t) {
            var e = t && t.toString().match(/^\s*function (\w+)/);
            return e ? e[1] : ""
        }

        function Vt(t, e) {
            return Bt(t) === Bt(e)
        }

        function Ht(t, e) {
            if (!Array.isArray(e)) return Vt(e, t) ? 0 : -1;
            for (var n = 0, r = e.length; n < r; n++)
                if (Vt(e[n], t)) return n;
            return -1
        }

        function Wt(t, e, n) {
            ht();
            try {
                if (e)
                    for (var r = e; r = r.$parent;) {
                        var i = r.$options.errorCaptured;
                        if (i)
                            for (var a = 0; a < i.length; a++) try {
                                if (!1 === i[a].call(r, t, e, n)) return
                            } catch (t) {
                                zt(t, r, "errorCaptured hook")
                            }
                    }
                zt(t, e, n)
            } finally {
                mt()
            }
        }

        function Gt(t, e, n, r, i) {
            var a;
            try {
                (a = n ? t.apply(e, n) : t.call(e)) && !a._isVue && p(a) && !a._handled && (a.catch(function(t) {
                    return Wt(t, r, i + " (Promise/async)")
                }), a._handled = !0)
            } catch (t) {
                Wt(t, r, i)
            }
            return a
        }

        function zt(t, e, n) {
            if (B.errorHandler) try {
                return B.errorHandler.call(null, t, e, n)
            } catch (e) {
                e !== t && qt(e, null, "config.errorHandler")
            }
            qt(t, e, n)
        }

        function qt(t, e, n) {
            if (!K && !X || "undefined" == typeof console) throw t;
            console.error(t)
        }
        var Kt, Xt = !1,
            Jt = [],
            Yt = !1;

        function Zt() {
            Yt = !1;
            var t = Jt.slice(0);
            Jt.length = 0;
            for (var e = 0; e < t.length; e++) t[e]()
        }
        if ("undefined" != typeof Promise && ct(Promise)) {
            var Qt = Promise.resolve();
            Kt = function() {
                Qt.then(Zt), et && setTimeout(M)
            }, Xt = !0
        } else if (Z || "undefined" == typeof MutationObserver || !ct(MutationObserver) && "[object MutationObserverConstructor]" !== MutationObserver.toString()) Kt = void 0 !== n && ct(n) ? function() {
            n(Zt)
        } : function() {
            setTimeout(Zt, 0)
        };
        else {
            var te = 1,
                ee = new MutationObserver(Zt),
                ne = document.createTextNode(String(te));
            ee.observe(ne, {
                characterData: !0
            }), Kt = function() {
                te = (te + 1) % 2, ne.data = String(te)
            }, Xt = !0
        }

        function re(t, e) {
            var n;
            if (Jt.push(function() {
                    if (t) try {
                        t.call(e)
                    } catch (t) {
                        Wt(t, e, "nextTick")
                    } else n && n(e)
                }), Yt || (Yt = !0, Kt()), !t && "undefined" != typeof Promise) return new Promise(function(t) {
                n = t
            })
        }
        var ie = new ut;

        function ae(t) {
            ! function t(e, n) {
                var r, i;
                var a = Array.isArray(e);
                if (!a && !c(e) || Object.isFrozen(e) || e instanceof gt) return;
                if (e.__ob__) {
                    var o = e.__ob__.dep.id;
                    if (n.has(o)) return;
                    n.add(o)
                }
                if (a)
                    for (r = e.length; r--;) t(e[r], n);
                else
                    for (i = Object.keys(e), r = i.length; r--;) t(e[i[r]], n)
            }(t, ie), ie.clear()
        }
        var oe = x(function(t) {
            var e = "&" === t.charAt(0),
                n = "~" === (t = e ? t.slice(1) : t).charAt(0),
                r = "!" === (t = n ? t.slice(1) : t).charAt(0);
            return {
                name: t = r ? t.slice(1) : t,
                once: n,
                capture: r,
                passive: e
            }
        });

        function se(t, e) {
            function n() {
                var t = arguments,
                    r = n.fns;
                if (!Array.isArray(r)) return Gt(r, null, arguments, e, "v-on handler");
                for (var i = r.slice(), a = 0; a < i.length; a++) Gt(i[a], null, t, e, "v-on handler")
            }
            return n.fns = t, n
        }

        function ce(t, e, n, r, a, s) {
            var c, u, l, f;
            for (c in t) u = t[c], l = e[c], f = oe(c), i(u) || (i(l) ? (i(u.fns) && (u = t[c] = se(u, s)), o(f.once) && (u = t[c] = a(f.name, u, f.capture)), n(f.name, u, f.capture, f.passive, f.params)) : u !== l && (l.fns = u, t[c] = l));
            for (c in e) i(t[c]) && r((f = oe(c)).name, e[c], f.capture)
        }

        function ue(t, e, n) {
            var r;
            t instanceof gt && (t = t.data.hook || (t.data.hook = {}));
            var s = t[e];

            function c() {
                n.apply(this, arguments), _(r.fns, c)
            }
            i(s) ? r = se([c]) : a(s.fns) && o(s.merged) ? (r = s).fns.push(c) : r = se([s, c]), r.merged = !0, t[e] = r
        }

        function le(t, e, n, r, i) {
            if (a(e)) {
                if (C(e, n)) return t[n] = e[n], i || delete e[n], !0;
                if (C(e, r)) return t[n] = e[r], i || delete e[r], !0
            }
            return !1
        }

        function fe(t) {
            return s(t) ? [bt(t)] : Array.isArray(t) ? function t(e, n) {
                var r = [];
                var c, u, l, f;
                for (c = 0; c < e.length; c++) i(u = e[c]) || "boolean" == typeof u || (l = r.length - 1, f = r[l], Array.isArray(u) ? u.length > 0 && (de((u = t(u, (n || "") + "_" + c))[0]) && de(f) && (r[l] = bt(f.text + u[0].text), u.shift()), r.push.apply(r, u)) : s(u) ? de(f) ? r[l] = bt(f.text + u) : "" !== u && r.push(bt(u)) : de(u) && de(f) ? r[l] = bt(f.text + u.text) : (o(e._isVList) && a(u.tag) && i(u.key) && a(n) && (u.key = "__vlist" + n + "_" + c + "__"), r.push(u)));
                return r
            }(t) : void 0
        }

        function de(t) {
            return a(t) && a(t.text) && function(t) {
                return !1 === t
            }(t.isComment)
        }

        function pe(t, e) {
            if (t) {
                for (var n = Object.create(null), r = lt ? Reflect.ownKeys(t) : Object.keys(t), i = 0; i < r.length; i++) {
                    var a = r[i];
                    if ("__ob__" !== a) {
                        for (var o = t[a].from, s = e; s;) {
                            if (s._provided && C(s._provided, o)) {
                                n[a] = s._provided[o];
                                break
                            }
                            s = s.$parent
                        }
                        if (!s)
                            if ("default" in t[a]) {
                                var c = t[a].default;
                                n[a] = "function" == typeof c ? c.call(e) : c
                            } else 0
                    }
                }
                return n
            }
        }

        function ve(t, e) {
            if (!t || !t.length) return {};
            for (var n = {}, r = 0, i = t.length; r < i; r++) {
                var a = t[r],
                    o = a.data;
                if (o && o.attrs && o.attrs.slot && delete o.attrs.slot, a.context !== e && a.fnContext !== e || !o || null == o.slot)(n.default || (n.default = [])).push(a);
                else {
                    var s = o.slot,
                        c = n[s] || (n[s] = []);
                    "template" === a.tag ? c.push.apply(c, a.children || []) : c.push(a)
                }
            }
            for (var u in n) n[u].every(he) && delete n[u];
            return n
        }

        function he(t) {
            return t.isComment && !t.asyncFactory || " " === t.text
        }

        function me(t, e, n) {
            var i, a = Object.keys(e).length > 0,
                o = t ? !!t.$stable : !a,
                s = t && t.$key;
            if (t) {
                if (t._normalized) return t._normalized;
                if (o && n && n !== r && s === n.$key && !a && !n.$hasNormal) return n;
                for (var c in i = {}, t) t[c] && "$" !== c[0] && (i[c] = ge(e, c, t[c]))
            } else i = {};
            for (var u in e) u in i || (i[u] = ye(e, u));
            return t && Object.isExtensible(t) && (t._normalized = i), W(i, "$stable", o), W(i, "$key", s), W(i, "$hasNormal", a), i
        }

        function ge(t, e, n) {
            var r = function() {
                var t = arguments.length ? n.apply(null, arguments) : n({});
                return (t = t && "object" == typeof t && !Array.isArray(t) ? [t] : fe(t)) && (0 === t.length || 1 === t.length && t[0].isComment) ? void 0 : t
            };
            return n.proxy && Object.defineProperty(t, e, {
                get: r,
                enumerable: !0,
                configurable: !0
            }), r
        }

        function ye(t, e) {
            return function() {
                return t[e]
            }
        }

        function _e(t, e) {
            var n, r, i, o, s;
            if (Array.isArray(t) || "string" == typeof t)
                for (n = new Array(t.length), r = 0, i = t.length; r < i; r++) n[r] = e(t[r], r);
            else if ("number" == typeof t)
                for (n = new Array(t), r = 0; r < t; r++) n[r] = e(r + 1, r);
            else if (c(t))
                if (lt && t[Symbol.iterator]) {
                    n = [];
                    for (var u = t[Symbol.iterator](), l = u.next(); !l.done;) n.push(e(l.value, n.length)), l = u.next()
                } else
                    for (o = Object.keys(t), n = new Array(o.length), r = 0, i = o.length; r < i; r++) s = o[r], n[r] = e(t[s], s, r);
            return a(n) || (n = []), n._isVList = !0, n
        }

        function be(t, e, n, r) {
            var i, a = this.$scopedSlots[t];
            a ? (n = n || {}, r && (n = E(E({}, r), n)), i = a(n) || e) : i = this.$slots[t] || e;
            var o = n && n.slot;
            return o ? this.$createElement("template", {
                slot: o
            }, i) : i
        }

        function Ce(t) {
            return Ft(this.$options, "filters", t) || L
        }

        function xe(t, e) {
            return Array.isArray(t) ? -1 === t.indexOf(e) : t !== e
        }

        function we(t, e, n, r, i) {
            var a = B.keyCodes[e] || n;
            return i && r && !B.keyCodes[e] ? xe(i, r) : a ? xe(a, t) : r ? $(r) !== e : void 0
        }

        function Te(t, e, n, r, i) {
            if (n)
                if (c(n)) {
                    var a;
                    Array.isArray(n) && (n = P(n));
                    var o = function(o) {
                        if ("class" === o || "style" === o || y(o)) a = t;
                        else {
                            var s = t.attrs && t.attrs.type;
                            a = r || B.mustUseProp(e, s, o) ? t.domProps || (t.domProps = {}) : t.attrs || (t.attrs = {})
                        }
                        var c = T(o),
                            u = $(o);
                        c in a || u in a || (a[o] = n[o], i && ((t.on || (t.on = {}))["update:" + o] = function(t) {
                            n[o] = t
                        }))
                    };
                    for (var s in n) o(s)
                } else;
            return t
        }

        function Se(t, e) {
            var n = this._staticTrees || (this._staticTrees = []),
                r = n[t];
            return r && !e ? r : ($e(r = n[t] = this.$options.staticRenderFns[t].call(this._renderProxy, null, this), "__static__" + t, !1), r)
        }

        function ke(t, e, n) {
            return $e(t, "__once__" + e + (n ? "_" + n : ""), !0), t
        }

        function $e(t, e, n) {
            if (Array.isArray(t))
                for (var r = 0; r < t.length; r++) t[r] && "string" != typeof t[r] && Ae(t[r], e + "_" + r, n);
            else Ae(t, e, n)
        }

        function Ae(t, e, n) {
            t.isStatic = !0, t.key = e, t.isOnce = n
        }

        function Oe(t, e) {
            if (e)
                if (l(e)) {
                    var n = t.on = t.on ? E({}, t.on) : {};
                    for (var r in e) {
                        var i = n[r],
                            a = e[r];
                        n[r] = i ? [].concat(i, a) : a
                    }
                } else;
            return t
        }

        function Ee(t, e, n, r) {
            e = e || {
                $stable: !n
            };
            for (var i = 0; i < t.length; i++) {
                var a = t[i];
                Array.isArray(a) ? Ee(a, e, n) : a && (a.proxy && (a.fn.proxy = !0), e[a.key] = a.fn)
            }
            return r && (e.$key = r), e
        }

        function Pe(t, e) {
            for (var n = 0; n < e.length; n += 2) {
                var r = e[n];
                "string" == typeof r && r && (t[e[n]] = e[n + 1])
            }
            return t
        }

        function Me(t, e) {
            return "string" == typeof t ? e + t : t
        }

        function Ne(t) {
            t._o = ke, t._n = h, t._s = v, t._l = _e, t._t = be, t._q = I, t._i = R, t._m = Se, t._f = Ce, t._k = we, t._b = Te, t._v = bt, t._e = _t, t._u = Ee, t._g = Oe, t._d = Pe, t._p = Me
        }

        function Le(t, e, n, i, a) {
            var s, c = this,
                u = a.options;
            C(i, "_uid") ? (s = Object.create(i))._original = i : (s = i, i = i._original);
            var l = o(u._compiled),
                f = !l;
            this.data = t, this.props = e, this.children = n, this.parent = i, this.listeners = t.on || r, this.injections = pe(u.inject, i), this.slots = function() {
                return c.$slots || me(t.scopedSlots, c.$slots = ve(n, i)), c.$slots
            }, Object.defineProperty(this, "scopedSlots", {
                enumerable: !0,
                get: function() {
                    return me(t.scopedSlots, this.slots())
                }
            }), l && (this.$options = u, this.$slots = this.slots(), this.$scopedSlots = me(t.scopedSlots, this.$slots)), u._scopeId ? this._c = function(t, e, n, r) {
                var a = He(s, t, e, n, r, f);
                return a && !Array.isArray(a) && (a.fnScopeId = u._scopeId, a.fnContext = i), a
            } : this._c = function(t, e, n, r) {
                return He(s, t, e, n, r, f)
            }
        }

        function Ie(t, e, n, r, i) {
            var a = Ct(t);
            return a.fnContext = n, a.fnOptions = r, e.slot && ((a.data || (a.data = {})).slot = e.slot), a
        }

        function Re(t, e) {
            for (var n in e) t[T(n)] = e[n]
        }
        Ne(Le.prototype);
        var De = {
                init: function(t, e) {
                    if (t.componentInstance && !t.componentInstance._isDestroyed && t.data.keepAlive) {
                        var n = t;
                        De.prepatch(n, n)
                    } else {
                        (t.componentInstance = function(t, e) {
                            var n = {
                                    _isComponent: !0,
                                    _parentVnode: t,
                                    parent: e
                                },
                                r = t.data.inlineTemplate;
                            a(r) && (n.render = r.render, n.staticRenderFns = r.staticRenderFns);
                            return new t.componentOptions.Ctor(n)
                        }(t, Qe)).$mount(e ? t.elm : void 0, e)
                    }
                },
                prepatch: function(t, e) {
                    var n = e.componentOptions;
                    ! function(t, e, n, i, a) {
                        0;
                        var o = i.data.scopedSlots,
                            s = t.$scopedSlots,
                            c = !!(o && !o.$stable || s !== r && !s.$stable || o && t.$scopedSlots.$key !== o.$key),
                            u = !!(a || t.$options._renderChildren || c);
                        t.$options._parentVnode = i, t.$vnode = i, t._vnode && (t._vnode.parent = i);
                        if (t.$options._renderChildren = a, t.$attrs = i.data.attrs || r, t.$listeners = n || r, e && t.$options.props) {
                            kt(!1);
                            for (var l = t._props, f = t.$options._propKeys || [], d = 0; d < f.length; d++) {
                                var p = f[d],
                                    v = t.$options.props;
                                l[p] = Ut(p, v, e, t)
                            }
                            kt(!0), t.$options.propsData = e
                        }
                        n = n || r;
                        var h = t.$options._parentListeners;
                        t.$options._parentListeners = n, Ze(t, n, h), u && (t.$slots = ve(a, i.context), t.$forceUpdate());
                        0
                    }(e.componentInstance = t.componentInstance, n.propsData, n.listeners, e, n.children)
                },
                insert: function(t) {
                    var e = t.context,
                        n = t.componentInstance;
                    n._isMounted || (n._isMounted = !0, rn(n, "mounted")), t.data.keepAlive && (e._isMounted ? function(t) {
                        t._inactive = !1, on.push(t)
                    }(n) : nn(n, !0))
                },
                destroy: function(t) {
                    var e = t.componentInstance;
                    e._isDestroyed || (t.data.keepAlive ? function t(e, n) {
                        if (n && (e._directInactive = !0, en(e))) return;
                        if (!e._inactive) {
                            e._inactive = !0;
                            for (var r = 0; r < e.$children.length; r++) t(e.$children[r]);
                            rn(e, "deactivated")
                        }
                    }(e, !0) : e.$destroy())
                }
            },
            je = Object.keys(De);

        function Fe(t, e, n, s, u) {
            if (!i(t)) {
                var l = n.$options._base;
                if (c(t) && (t = l.extend(t)), "function" == typeof t) {
                    var f;
                    if (i(t.cid) && void 0 === (t = function(t, e) {
                            if (o(t.error) && a(t.errorComp)) return t.errorComp;
                            if (a(t.resolved)) return t.resolved;
                            var n = Ge;
                            n && a(t.owners) && -1 === t.owners.indexOf(n) && t.owners.push(n);
                            if (o(t.loading) && a(t.loadingComp)) return t.loadingComp;
                            if (n && !a(t.owners)) {
                                var r = t.owners = [n],
                                    s = !0,
                                    u = null,
                                    l = null;
                                n.$on("hook:destroyed", function() {
                                    return _(r, n)
                                });
                                var f = function(t) {
                                        for (var e = 0, n = r.length; e < n; e++) r[e].$forceUpdate();
                                        t && (r.length = 0, null !== u && (clearTimeout(u), u = null), null !== l && (clearTimeout(l), l = null))
                                    },
                                    d = D(function(n) {
                                        t.resolved = ze(n, e), s ? r.length = 0 : f(!0)
                                    }),
                                    v = D(function(e) {
                                        a(t.errorComp) && (t.error = !0, f(!0))
                                    }),
                                    h = t(d, v);
                                return c(h) && (p(h) ? i(t.resolved) && h.then(d, v) : p(h.component) && (h.component.then(d, v), a(h.error) && (t.errorComp = ze(h.error, e)), a(h.loading) && (t.loadingComp = ze(h.loading, e), 0 === h.delay ? t.loading = !0 : u = setTimeout(function() {
                                    u = null, i(t.resolved) && i(t.error) && (t.loading = !0, f(!1))
                                }, h.delay || 200)), a(h.timeout) && (l = setTimeout(function() {
                                    l = null, i(t.resolved) && v(null)
                                }, h.timeout)))), s = !1, t.loading ? t.loadingComp : t.resolved
                            }
                        }(f = t, l))) return function(t, e, n, r, i) {
                        var a = _t();
                        return a.asyncFactory = t, a.asyncMeta = {
                            data: e,
                            context: n,
                            children: r,
                            tag: i
                        }, a
                    }(f, e, n, s, u);
                    e = e || {}, kn(t), a(e.model) && function(t, e) {
                        var n = t.model && t.model.prop || "value",
                            r = t.model && t.model.event || "input";
                        (e.attrs || (e.attrs = {}))[n] = e.model.value;
                        var i = e.on || (e.on = {}),
                            o = i[r],
                            s = e.model.callback;
                        a(o) ? (Array.isArray(o) ? -1 === o.indexOf(s) : o !== s) && (i[r] = [s].concat(o)) : i[r] = s
                    }(t.options, e);
                    var d = function(t, e, n) {
                        var r = e.options.props;
                        if (!i(r)) {
                            var o = {},
                                s = t.attrs,
                                c = t.props;
                            if (a(s) || a(c))
                                for (var u in r) {
                                    var l = $(u);
                                    le(o, c, u, l, !0) || le(o, s, u, l, !1)
                                }
                            return o
                        }
                    }(e, t);
                    if (o(t.options.functional)) return function(t, e, n, i, o) {
                        var s = t.options,
                            c = {},
                            u = s.props;
                        if (a(u))
                            for (var l in u) c[l] = Ut(l, u, e || r);
                        else a(n.attrs) && Re(c, n.attrs), a(n.props) && Re(c, n.props);
                        var f = new Le(n, c, o, i, t),
                            d = s.render.call(null, f._c, f);
                        if (d instanceof gt) return Ie(d, n, f.parent, s);
                        if (Array.isArray(d)) {
                            for (var p = fe(d) || [], v = new Array(p.length), h = 0; h < p.length; h++) v[h] = Ie(p[h], n, f.parent, s);
                            return v
                        }
                    }(t, d, e, n, s);
                    var v = e.on;
                    if (e.on = e.nativeOn, o(t.options.abstract)) {
                        var h = e.slot;
                        e = {}, h && (e.slot = h)
                    }! function(t) {
                        for (var e = t.hook || (t.hook = {}), n = 0; n < je.length; n++) {
                            var r = je[n],
                                i = e[r],
                                a = De[r];
                            i === a || i && i._merged || (e[r] = i ? Ue(a, i) : a)
                        }
                    }(e);
                    var m = t.options.name || u;
                    return new gt("vue-component-" + t.cid + (m ? "-" + m : ""), e, void 0, void 0, void 0, n, {
                        Ctor: t,
                        propsData: d,
                        listeners: v,
                        tag: u,
                        children: s
                    }, f)
                }
            }
        }

        function Ue(t, e) {
            var n = function(n, r) {
                t(n, r), e(n, r)
            };
            return n._merged = !0, n
        }
        var Be = 1,
            Ve = 2;

        function He(t, e, n, r, u, l) {
            return (Array.isArray(n) || s(n)) && (u = r, r = n, n = void 0), o(l) && (u = Ve),
                function(t, e, n, r, s) {
                    if (a(n) && a(n.__ob__)) return _t();
                    a(n) && a(n.is) && (e = n.is);
                    if (!e) return _t();
                    0;
                    Array.isArray(r) && "function" == typeof r[0] && ((n = n || {}).scopedSlots = {
                        default: r[0]
                    }, r.length = 0);
                    s === Ve ? r = fe(r) : s === Be && (r = function(t) {
                        for (var e = 0; e < t.length; e++)
                            if (Array.isArray(t[e])) return Array.prototype.concat.apply([], t);
                        return t
                    }(r));
                    var u, l;
                    if ("string" == typeof e) {
                        var f;
                        l = t.$vnode && t.$vnode.ns || B.getTagNamespace(e), u = B.isReservedTag(e) ? new gt(B.parsePlatformTagName(e), n, r, void 0, void 0, t) : n && n.pre || !a(f = Ft(t.$options, "components", e)) ? new gt(e, n, r, void 0, void 0, t) : Fe(f, n, t, r, e)
                    } else u = Fe(e, n, t, r);
                    return Array.isArray(u) ? u : a(u) ? (a(l) && function t(e, n, r) {
                        e.ns = n;
                        "foreignObject" === e.tag && (n = void 0, r = !0);
                        if (a(e.children))
                            for (var s = 0, c = e.children.length; s < c; s++) {
                                var u = e.children[s];
                                a(u.tag) && (i(u.ns) || o(r) && "svg" !== u.tag) && t(u, n, r)
                            }
                    }(u, l), a(n) && function(t) {
                        c(t.style) && ae(t.style);
                        c(t.class) && ae(t.class)
                    }(n), u) : _t()
                }(t, e, n, r, u)
        }
        var We, Ge = null;

        function ze(t, e) {
            return (t.__esModule || lt && "Module" === t[Symbol.toStringTag]) && (t = t.default), c(t) ? e.extend(t) : t
        }

        function qe(t) {
            return t.isComment && t.asyncFactory
        }

        function Ke(t) {
            if (Array.isArray(t))
                for (var e = 0; e < t.length; e++) {
                    var n = t[e];
                    if (a(n) && (a(n.componentOptions) || qe(n))) return n
                }
        }

        function Xe(t, e) {
            We.$on(t, e)
        }

        function Je(t, e) {
            We.$off(t, e)
        }

        function Ye(t, e) {
            var n = We;
            return function r() {
                null !== e.apply(null, arguments) && n.$off(t, r)
            }
        }

        function Ze(t, e, n) {
            We = t, ce(e, n || {}, Xe, Je, Ye, t), We = void 0
        }
        var Qe = null;

        function tn(t) {
            var e = Qe;
            return Qe = t,
                function() {
                    Qe = e
                }
        }

        function en(t) {
            for (; t && (t = t.$parent);)
                if (t._inactive) return !0;
            return !1
        }

        function nn(t, e) {
            if (e) {
                if (t._directInactive = !1, en(t)) return
            } else if (t._directInactive) return;
            if (t._inactive || null === t._inactive) {
                t._inactive = !1;
                for (var n = 0; n < t.$children.length; n++) nn(t.$children[n]);
                rn(t, "activated")
            }
        }

        function rn(t, e) {
            ht();
            var n = t.$options[e],
                r = e + " hook";
            if (n)
                for (var i = 0, a = n.length; i < a; i++) Gt(n[i], t, null, t, r);
            t._hasHookEvent && t.$emit("hook:" + e), mt()
        }
        var an = [],
            on = [],
            sn = {},
            cn = !1,
            un = !1,
            ln = 0;
        var fn = 0,
            dn = Date.now;
        if (K && !Z) {
            var pn = window.performance;
            pn && "function" == typeof pn.now && dn() > document.createEvent("Event").timeStamp && (dn = function() {
                return pn.now()
            })
        }

        function vn() {
            var t, e;
            for (fn = dn(), un = !0, an.sort(function(t, e) {
                    return t.id - e.id
                }), ln = 0; ln < an.length; ln++)(t = an[ln]).before && t.before(), e = t.id, sn[e] = null, t.run();
            var n = on.slice(),
                r = an.slice();
            ln = an.length = on.length = 0, sn = {}, cn = un = !1,
                function(t) {
                    for (var e = 0; e < t.length; e++) t[e]._inactive = !0, nn(t[e], !0)
                }(n),
                function(t) {
                    var e = t.length;
                    for (; e--;) {
                        var n = t[e],
                            r = n.vm;
                        r._watcher === n && r._isMounted && !r._isDestroyed && rn(r, "updated")
                    }
                }(r), st && B.devtools && st.emit("flush")
        }
        var hn = 0,
            mn = function(t, e, n, r, i) {
                this.vm = t, i && (t._watcher = this), t._watchers.push(this), r ? (this.deep = !!r.deep, this.user = !!r.user, this.lazy = !!r.lazy, this.sync = !!r.sync, this.before = r.before) : this.deep = this.user = this.lazy = this.sync = !1, this.cb = n, this.id = ++hn, this.active = !0, this.dirty = this.lazy, this.deps = [], this.newDeps = [], this.depIds = new ut, this.newDepIds = new ut, this.expression = "", "function" == typeof e ? this.getter = e : (this.getter = function(t) {
                    if (!G.test(t)) {
                        var e = t.split(".");
                        return function(t) {
                            for (var n = 0; n < e.length; n++) {
                                if (!t) return;
                                t = t[e[n]]
                            }
                            return t
                        }
                    }
                }(e), this.getter || (this.getter = M)), this.value = this.lazy ? void 0 : this.get()
            };
        mn.prototype.get = function() {
            var t;
            ht(this);
            var e = this.vm;
            try {
                t = this.getter.call(e, e)
            } catch (t) {
                if (!this.user) throw t;
                Wt(t, e, 'getter for watcher "' + this.expression + '"')
            } finally {
                this.deep && ae(t), mt(), this.cleanupDeps()
            }
            return t
        }, mn.prototype.addDep = function(t) {
            var e = t.id;
            this.newDepIds.has(e) || (this.newDepIds.add(e), this.newDeps.push(t), this.depIds.has(e) || t.addSub(this))
        }, mn.prototype.cleanupDeps = function() {
            for (var t = this.deps.length; t--;) {
                var e = this.deps[t];
                this.newDepIds.has(e.id) || e.removeSub(this)
            }
            var n = this.depIds;
            this.depIds = this.newDepIds, this.newDepIds = n, this.newDepIds.clear(), n = this.deps, this.deps = this.newDeps, this.newDeps = n, this.newDeps.length = 0
        }, mn.prototype.update = function() {
            this.lazy ? this.dirty = !0 : this.sync ? this.run() : function(t) {
                var e = t.id;
                if (null == sn[e]) {
                    if (sn[e] = !0, un) {
                        for (var n = an.length - 1; n > ln && an[n].id > t.id;) n--;
                        an.splice(n + 1, 0, t)
                    } else an.push(t);
                    cn || (cn = !0, re(vn))
                }
            }(this)
        }, mn.prototype.run = function() {
            if (this.active) {
                var t = this.get();
                if (t !== this.value || c(t) || this.deep) {
                    var e = this.value;
                    if (this.value = t, this.user) try {
                        this.cb.call(this.vm, t, e)
                    } catch (t) {
                        Wt(t, this.vm, 'callback for watcher "' + this.expression + '"')
                    } else this.cb.call(this.vm, t, e)
                }
            }
        }, mn.prototype.evaluate = function() {
            this.value = this.get(), this.dirty = !1
        }, mn.prototype.depend = function() {
            for (var t = this.deps.length; t--;) this.deps[t].depend()
        }, mn.prototype.teardown = function() {
            if (this.active) {
                this.vm._isBeingDestroyed || _(this.vm._watchers, this);
                for (var t = this.deps.length; t--;) this.deps[t].removeSub(this);
                this.active = !1
            }
        };
        var gn = {
            enumerable: !0,
            configurable: !0,
            get: M,
            set: M
        };

        function yn(t, e, n) {
            gn.get = function() {
                return this[e][n]
            }, gn.set = function(t) {
                this[e][n] = t
            }, Object.defineProperty(t, n, gn)
        }

        function _n(t) {
            t._watchers = [];
            var e = t.$options;
            e.props && function(t, e) {
                var n = t.$options.propsData || {},
                    r = t._props = {},
                    i = t.$options._propKeys = [],
                    a = !t.$parent;
                a || kt(!1);
                var o = function(a) {
                    i.push(a);
                    var o = Ut(a, e, n, t);
                    Ot(r, a, o), a in t || yn(t, "_props", a)
                };
                for (var s in e) o(s);
                kt(!0)
            }(t, e.props), e.methods && function(t, e) {
                t.$options.props;
                for (var n in e) t[n] = "function" != typeof e[n] ? M : A(e[n], t)
            }(t, e.methods), e.data ? function(t) {
                var e = t.$options.data;
                l(e = t._data = "function" == typeof e ? function(t, e) {
                    ht();
                    try {
                        return t.call(e, e)
                    } catch (t) {
                        return Wt(t, e, "data()"), {}
                    } finally {
                        mt()
                    }
                }(e, t) : e || {}) || (e = {});
                var n = Object.keys(e),
                    r = t.$options.props,
                    i = (t.$options.methods, n.length);
                for (; i--;) {
                    var a = n[i];
                    0, r && C(r, a) || H(a) || yn(t, "_data", a)
                }
                At(e, !0)
            }(t) : At(t._data = {}, !0), e.computed && function(t, e) {
                var n = t._computedWatchers = Object.create(null),
                    r = ot();
                for (var i in e) {
                    var a = e[i],
                        o = "function" == typeof a ? a : a.get;
                    0, r || (n[i] = new mn(t, o || M, M, bn)), i in t || Cn(t, i, a)
                }
            }(t, e.computed), e.watch && e.watch !== rt && function(t, e) {
                for (var n in e) {
                    var r = e[n];
                    if (Array.isArray(r))
                        for (var i = 0; i < r.length; i++) Tn(t, n, r[i]);
                    else Tn(t, n, r)
                }
            }(t, e.watch)
        }
        var bn = {
            lazy: !0
        };

        function Cn(t, e, n) {
            var r = !ot();
            "function" == typeof n ? (gn.get = r ? xn(e) : wn(n), gn.set = M) : (gn.get = n.get ? r && !1 !== n.cache ? xn(e) : wn(n.get) : M, gn.set = n.set || M), Object.defineProperty(t, e, gn)
        }

        function xn(t) {
            return function() {
                var e = this._computedWatchers && this._computedWatchers[t];
                if (e) return e.dirty && e.evaluate(), pt.target && e.depend(), e.value
            }
        }

        function wn(t) {
            return function() {
                return t.call(this, this)
            }
        }

        function Tn(t, e, n, r) {
            return l(n) && (r = n, n = n.handler), "string" == typeof n && (n = t[n]), t.$watch(e, n, r)
        }
        var Sn = 0;

        function kn(t) {
            var e = t.options;
            if (t.super) {
                var n = kn(t.super);
                if (n !== t.superOptions) {
                    t.superOptions = n;
                    var r = function(t) {
                        var e, n = t.options,
                            r = t.sealedOptions;
                        for (var i in n) n[i] !== r[i] && (e || (e = {}), e[i] = n[i]);
                        return e
                    }(t);
                    r && E(t.extendOptions, r), (e = t.options = jt(n, t.extendOptions)).name && (e.components[e.name] = t)
                }
            }
            return e
        }

        function $n(t) {
            this._init(t)
        }

        function An(t) {
            t.cid = 0;
            var e = 1;
            t.extend = function(t) {
                t = t || {};
                var n = this,
                    r = n.cid,
                    i = t._Ctor || (t._Ctor = {});
                if (i[r]) return i[r];
                var a = t.name || n.options.name;
                var o = function(t) {
                    this._init(t)
                };
                return (o.prototype = Object.create(n.prototype)).constructor = o, o.cid = e++, o.options = jt(n.options, t), o.super = n, o.options.props && function(t) {
                    var e = t.options.props;
                    for (var n in e) yn(t.prototype, "_props", n)
                }(o), o.options.computed && function(t) {
                    var e = t.options.computed;
                    for (var n in e) Cn(t.prototype, n, e[n])
                }(o), o.extend = n.extend, o.mixin = n.mixin, o.use = n.use, F.forEach(function(t) {
                    o[t] = n[t]
                }), a && (o.options.components[a] = o), o.superOptions = n.options, o.extendOptions = t, o.sealedOptions = E({}, o.options), i[r] = o, o
            }
        }

        function On(t) {
            return t && (t.Ctor.options.name || t.tag)
        }

        function En(t, e) {
            return Array.isArray(t) ? t.indexOf(e) > -1 : "string" == typeof t ? t.split(",").indexOf(e) > -1 : !!f(t) && t.test(e)
        }

        function Pn(t, e) {
            var n = t.cache,
                r = t.keys,
                i = t._vnode;
            for (var a in n) {
                var o = n[a];
                if (o) {
                    var s = On(o.componentOptions);
                    s && !e(s) && Mn(n, a, r, i)
                }
            }
        }

        function Mn(t, e, n, r) {
            var i = t[e];
            !i || r && i.tag === r.tag || i.componentInstance.$destroy(), t[e] = null, _(n, e)
        }! function(t) {
            t.prototype._init = function(t) {
                var e = this;
                e._uid = Sn++, e._isVue = !0, t && t._isComponent ? function(t, e) {
                        var n = t.$options = Object.create(t.constructor.options),
                            r = e._parentVnode;
                        n.parent = e.parent, n._parentVnode = r;
                        var i = r.componentOptions;
                        n.propsData = i.propsData, n._parentListeners = i.listeners, n._renderChildren = i.children, n._componentTag = i.tag, e.render && (n.render = e.render, n.staticRenderFns = e.staticRenderFns)
                    }(e, t) : e.$options = jt(kn(e.constructor), t || {}, e), e._renderProxy = e, e._self = e,
                    function(t) {
                        var e = t.$options,
                            n = e.parent;
                        if (n && !e.abstract) {
                            for (; n.$options.abstract && n.$parent;) n = n.$parent;
                            n.$children.push(t)
                        }
                        t.$parent = n, t.$root = n ? n.$root : t, t.$children = [], t.$refs = {}, t._watcher = null, t._inactive = null, t._directInactive = !1, t._isMounted = !1, t._isDestroyed = !1, t._isBeingDestroyed = !1
                    }(e),
                    function(t) {
                        t._events = Object.create(null), t._hasHookEvent = !1;
                        var e = t.$options._parentListeners;
                        e && Ze(t, e)
                    }(e),
                    function(t) {
                        t._vnode = null, t._staticTrees = null;
                        var e = t.$options,
                            n = t.$vnode = e._parentVnode,
                            i = n && n.context;
                        t.$slots = ve(e._renderChildren, i), t.$scopedSlots = r, t._c = function(e, n, r, i) {
                            return He(t, e, n, r, i, !1)
                        }, t.$createElement = function(e, n, r, i) {
                            return He(t, e, n, r, i, !0)
                        };
                        var a = n && n.data;
                        Ot(t, "$attrs", a && a.attrs || r, null, !0), Ot(t, "$listeners", e._parentListeners || r, null, !0)
                    }(e), rn(e, "beforeCreate"),
                    function(t) {
                        var e = pe(t.$options.inject, t);
                        e && (kt(!1), Object.keys(e).forEach(function(n) {
                            Ot(t, n, e[n])
                        }), kt(!0))
                    }(e), _n(e),
                    function(t) {
                        var e = t.$options.provide;
                        e && (t._provided = "function" == typeof e ? e.call(t) : e)
                    }(e), rn(e, "created"), e.$options.el && e.$mount(e.$options.el)
            }
        }($n),
        function(t) {
            var e = {
                    get: function() {
                        return this._data
                    }
                },
                n = {
                    get: function() {
                        return this._props
                    }
                };
            Object.defineProperty(t.prototype, "$data", e), Object.defineProperty(t.prototype, "$props", n), t.prototype.$set = Et, t.prototype.$delete = Pt, t.prototype.$watch = function(t, e, n) {
                if (l(e)) return Tn(this, t, e, n);
                (n = n || {}).user = !0;
                var r = new mn(this, t, e, n);
                if (n.immediate) try {
                    e.call(this, r.value)
                } catch (t) {
                    Wt(t, this, 'callback for immediate watcher "' + r.expression + '"')
                }
                return function() {
                    r.teardown()
                }
            }
        }($n),
        function(t) {
            var e = /^hook:/;
            t.prototype.$on = function(t, n) {
                var r = this;
                if (Array.isArray(t))
                    for (var i = 0, a = t.length; i < a; i++) r.$on(t[i], n);
                else(r._events[t] || (r._events[t] = [])).push(n), e.test(t) && (r._hasHookEvent = !0);
                return r
            }, t.prototype.$once = function(t, e) {
                var n = this;

                function r() {
                    n.$off(t, r), e.apply(n, arguments)
                }
                return r.fn = e, n.$on(t, r), n
            }, t.prototype.$off = function(t, e) {
                var n = this;
                if (!arguments.length) return n._events = Object.create(null), n;
                if (Array.isArray(t)) {
                    for (var r = 0, i = t.length; r < i; r++) n.$off(t[r], e);
                    return n
                }
                var a, o = n._events[t];
                if (!o) return n;
                if (!e) return n._events[t] = null, n;
                for (var s = o.length; s--;)
                    if ((a = o[s]) === e || a.fn === e) {
                        o.splice(s, 1);
                        break
                    } return n
            }, t.prototype.$emit = function(t) {
                var e = this,
                    n = e._events[t];
                if (n) {
                    n = n.length > 1 ? O(n) : n;
                    for (var r = O(arguments, 1), i = 'event handler for "' + t + '"', a = 0, o = n.length; a < o; a++) Gt(n[a], e, r, e, i)
                }
                return e
            }
        }($n),
        function(t) {
            t.prototype._update = function(t, e) {
                var n = this,
                    r = n.$el,
                    i = n._vnode,
                    a = tn(n);
                n._vnode = t, n.$el = i ? n.__patch__(i, t) : n.__patch__(n.$el, t, e, !1), a(), r && (r.__vue__ = null), n.$el && (n.$el.__vue__ = n), n.$vnode && n.$parent && n.$vnode === n.$parent._vnode && (n.$parent.$el = n.$el)
            }, t.prototype.$forceUpdate = function() {
                this._watcher && this._watcher.update()
            }, t.prototype.$destroy = function() {
                var t = this;
                if (!t._isBeingDestroyed) {
                    rn(t, "beforeDestroy"), t._isBeingDestroyed = !0;
                    var e = t.$parent;
                    !e || e._isBeingDestroyed || t.$options.abstract || _(e.$children, t), t._watcher && t._watcher.teardown();
                    for (var n = t._watchers.length; n--;) t._watchers[n].teardown();
                    t._data.__ob__ && t._data.__ob__.vmCount--, t._isDestroyed = !0, t.__patch__(t._vnode, null), rn(t, "destroyed"), t.$off(), t.$el && (t.$el.__vue__ = null), t.$vnode && (t.$vnode.parent = null)
                }
            }
        }($n),
        function(t) {
            Ne(t.prototype), t.prototype.$nextTick = function(t) {
                return re(t, this)
            }, t.prototype._render = function() {
                var t, e = this,
                    n = e.$options,
                    r = n.render,
                    i = n._parentVnode;
                i && (e.$scopedSlots = me(i.data.scopedSlots, e.$slots, e.$scopedSlots)), e.$vnode = i;
                try {
                    Ge = e, t = r.call(e._renderProxy, e.$createElement)
                } catch (n) {
                    Wt(n, e, "render"), t = e._vnode
                } finally {
                    Ge = null
                }
                return Array.isArray(t) && 1 === t.length && (t = t[0]), t instanceof gt || (t = _t()), t.parent = i, t
            }
        }($n);
        var Nn = [String, RegExp, Array],
            Ln = {
                KeepAlive: {
                    name: "keep-alive",
                    abstract: !0,
                    props: {
                        include: Nn,
                        exclude: Nn,
                        max: [String, Number]
                    },
                    created: function() {
                        this.cache = Object.create(null), this.keys = []
                    },
                    destroyed: function() {
                        for (var t in this.cache) Mn(this.cache, t, this.keys)
                    },
                    mounted: function() {
                        var t = this;
                        this.$watch("include", function(e) {
                            Pn(t, function(t) {
                                return En(e, t)
                            })
                        }), this.$watch("exclude", function(e) {
                            Pn(t, function(t) {
                                return !En(e, t)
                            })
                        })
                    },
                    render: function() {
                        var t = this.$slots.default,
                            e = Ke(t),
                            n = e && e.componentOptions;
                        if (n) {
                            var r = On(n),
                                i = this.include,
                                a = this.exclude;
                            if (i && (!r || !En(i, r)) || a && r && En(a, r)) return e;
                            var o = this.cache,
                                s = this.keys,
                                c = null == e.key ? n.Ctor.cid + (n.tag ? "::" + n.tag : "") : e.key;
                            o[c] ? (e.componentInstance = o[c].componentInstance, _(s, c), s.push(c)) : (o[c] = e, s.push(c), this.max && s.length > parseInt(this.max) && Mn(o, s[0], s, this._vnode)), e.data.keepAlive = !0
                        }
                        return e || t && t[0]
                    }
                }
            };
        ! function(t) {
            var e = {
                get: function() {
                    return B
                }
            };
            Object.defineProperty(t, "config", e), t.util = {
                    warn: ft,
                    extend: E,
                    mergeOptions: jt,
                    defineReactive: Ot
                }, t.set = Et, t.delete = Pt, t.nextTick = re, t.observable = function(t) {
                    return At(t), t
                }, t.options = Object.create(null), F.forEach(function(e) {
                    t.options[e + "s"] = Object.create(null)
                }), t.options._base = t, E(t.options.components, Ln),
                function(t) {
                    t.use = function(t) {
                        var e = this._installedPlugins || (this._installedPlugins = []);
                        if (e.indexOf(t) > -1) return this;
                        var n = O(arguments, 1);
                        return n.unshift(this), "function" == typeof t.install ? t.install.apply(t, n) : "function" == typeof t && t.apply(null, n), e.push(t), this
                    }
                }(t),
                function(t) {
                    t.mixin = function(t) {
                        return this.options = jt(this.options, t), this
                    }
                }(t), An(t),
                function(t) {
                    F.forEach(function(e) {
                        t[e] = function(t, n) {
                            return n ? ("component" === e && l(n) && (n.name = n.name || t, n = this.options._base.extend(n)), "directive" === e && "function" == typeof n && (n = {
                                bind: n,
                                update: n
                            }), this.options[e + "s"][t] = n, n) : this.options[e + "s"][t]
                        }
                    })
                }(t)
        }($n), Object.defineProperty($n.prototype, "$isServer", {
            get: ot
        }), Object.defineProperty($n.prototype, "$ssrContext", {
            get: function() {
                return this.$vnode && this.$vnode.ssrContext
            }
        }), Object.defineProperty($n, "FunctionalRenderContext", {
            value: Le
        }), $n.version = "2.6.11";
        var In = m("style,class"),
            Rn = m("input,textarea,option,select,progress"),
            Dn = function(t, e, n) {
                return "value" === n && Rn(t) && "button" !== e || "selected" === n && "option" === t || "checked" === n && "input" === t || "muted" === n && "video" === t
            },
            jn = m("contenteditable,draggable,spellcheck"),
            Fn = m("events,caret,typing,plaintext-only"),
            Un = function(t, e) {
                return Gn(e) || "false" === e ? "false" : "contenteditable" === t && Fn(e) ? e : "true"
            },
            Bn = m("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"),
            Vn = "http://www.w3.org/1999/xlink",
            Hn = function(t) {
                return ":" === t.charAt(5) && "xlink" === t.slice(0, 5)
            },
            Wn = function(t) {
                return Hn(t) ? t.slice(6, t.length) : ""
            },
            Gn = function(t) {
                return null == t || !1 === t
            };

        function zn(t) {
            for (var e = t.data, n = t, r = t; a(r.componentInstance);)(r = r.componentInstance._vnode) && r.data && (e = qn(r.data, e));
            for (; a(n = n.parent);) n && n.data && (e = qn(e, n.data));
            return function(t, e) {
                if (a(t) || a(e)) return Kn(t, Xn(e));
                return ""
            }(e.staticClass, e.class)
        }

        function qn(t, e) {
            return {
                staticClass: Kn(t.staticClass, e.staticClass),
                class: a(t.class) ? [t.class, e.class] : e.class
            }
        }

        function Kn(t, e) {
            return t ? e ? t + " " + e : t : e || ""
        }

        function Xn(t) {
            return Array.isArray(t) ? function(t) {
                for (var e, n = "", r = 0, i = t.length; r < i; r++) a(e = Xn(t[r])) && "" !== e && (n && (n += " "), n += e);
                return n
            }(t) : c(t) ? function(t) {
                var e = "";
                for (var n in t) t[n] && (e && (e += " "), e += n);
                return e
            }(t) : "string" == typeof t ? t : ""
        }
        var Jn = {
                svg: "http://www.w3.org/2000/svg",
                math: "http://www.w3.org/1998/Math/MathML"
            },
            Yn = m("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),
            Zn = m("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", !0),
            Qn = function(t) {
                return Yn(t) || Zn(t)
            };

        function tr(t) {
            return Zn(t) ? "svg" : "math" === t ? "math" : void 0
        }
        var er = Object.create(null);
        var nr = m("text,number,password,search,email,tel,url");

        function rr(t) {
            if ("string" == typeof t) {
                var e = document.querySelector(t);
                return e || document.createElement("div")
            }
            return t
        }
        var ir = Object.freeze({
                createElement: function(t, e) {
                    var n = document.createElement(t);
                    return "select" !== t ? n : (e.data && e.data.attrs && void 0 !== e.data.attrs.multiple && n.setAttribute("multiple", "multiple"), n)
                },
                createElementNS: function(t, e) {
                    return document.createElementNS(Jn[t], e)
                },
                createTextNode: function(t) {
                    return document.createTextNode(t)
                },
                createComment: function(t) {
                    return document.createComment(t)
                },
                insertBefore: function(t, e, n) {
                    t.insertBefore(e, n)
                },
                removeChild: function(t, e) {
                    t.removeChild(e)
                },
                appendChild: function(t, e) {
                    t.appendChild(e)
                },
                parentNode: function(t) {
                    return t.parentNode
                },
                nextSibling: function(t) {
                    return t.nextSibling
                },
                tagName: function(t) {
                    return t.tagName
                },
                setTextContent: function(t, e) {
                    t.textContent = e
                },
                setStyleScope: function(t, e) {
                    t.setAttribute(e, "")
                }
            }),
            ar = {
                create: function(t, e) {
                    or(e)
                },
                update: function(t, e) {
                    t.data.ref !== e.data.ref && (or(t, !0), or(e))
                },
                destroy: function(t) {
                    or(t, !0)
                }
            };

        function or(t, e) {
            var n = t.data.ref;
            if (a(n)) {
                var r = t.context,
                    i = t.componentInstance || t.elm,
                    o = r.$refs;
                e ? Array.isArray(o[n]) ? _(o[n], i) : o[n] === i && (o[n] = void 0) : t.data.refInFor ? Array.isArray(o[n]) ? o[n].indexOf(i) < 0 && o[n].push(i) : o[n] = [i] : o[n] = i
            }
        }
        var sr = new gt("", {}, []),
            cr = ["create", "activate", "update", "remove", "destroy"];

        function ur(t, e) {
            return t.key === e.key && (t.tag === e.tag && t.isComment === e.isComment && a(t.data) === a(e.data) && function(t, e) {
                if ("input" !== t.tag) return !0;
                var n, r = a(n = t.data) && a(n = n.attrs) && n.type,
                    i = a(n = e.data) && a(n = n.attrs) && n.type;
                return r === i || nr(r) && nr(i)
            }(t, e) || o(t.isAsyncPlaceholder) && t.asyncFactory === e.asyncFactory && i(e.asyncFactory.error))
        }

        function lr(t, e, n) {
            var r, i, o = {};
            for (r = e; r <= n; ++r) a(i = t[r].key) && (o[i] = r);
            return o
        }
        var fr = {
            create: dr,
            update: dr,
            destroy: function(t) {
                dr(t, sr)
            }
        };

        function dr(t, e) {
            (t.data.directives || e.data.directives) && function(t, e) {
                var n, r, i, a = t === sr,
                    o = e === sr,
                    s = vr(t.data.directives, t.context),
                    c = vr(e.data.directives, e.context),
                    u = [],
                    l = [];
                for (n in c) r = s[n], i = c[n], r ? (i.oldValue = r.value, i.oldArg = r.arg, mr(i, "update", e, t), i.def && i.def.componentUpdated && l.push(i)) : (mr(i, "bind", e, t), i.def && i.def.inserted && u.push(i));
                if (u.length) {
                    var f = function() {
                        for (var n = 0; n < u.length; n++) mr(u[n], "inserted", e, t)
                    };
                    a ? ue(e, "insert", f) : f()
                }
                l.length && ue(e, "postpatch", function() {
                    for (var n = 0; n < l.length; n++) mr(l[n], "componentUpdated", e, t)
                });
                if (!a)
                    for (n in s) c[n] || mr(s[n], "unbind", t, t, o)
            }(t, e)
        }
        var pr = Object.create(null);

        function vr(t, e) {
            var n, r, i = Object.create(null);
            if (!t) return i;
            for (n = 0; n < t.length; n++)(r = t[n]).modifiers || (r.modifiers = pr), i[hr(r)] = r, r.def = Ft(e.$options, "directives", r.name);
            return i
        }

        function hr(t) {
            return t.rawName || t.name + "." + Object.keys(t.modifiers || {}).join(".")
        }

        function mr(t, e, n, r, i) {
            var a = t.def && t.def[e];
            if (a) try {
                a(n.elm, t, n, r, i)
            } catch (r) {
                Wt(r, n.context, "directive " + t.name + " " + e + " hook")
            }
        }
        var gr = [ar, fr];

        function yr(t, e) {
            var n = e.componentOptions;
            if (!(a(n) && !1 === n.Ctor.options.inheritAttrs || i(t.data.attrs) && i(e.data.attrs))) {
                var r, o, s = e.elm,
                    c = t.data.attrs || {},
                    u = e.data.attrs || {};
                for (r in a(u.__ob__) && (u = e.data.attrs = E({}, u)), u) o = u[r], c[r] !== o && _r(s, r, o);
                for (r in (Z || tt) && u.value !== c.value && _r(s, "value", u.value), c) i(u[r]) && (Hn(r) ? s.removeAttributeNS(Vn, Wn(r)) : jn(r) || s.removeAttribute(r))
            }
        }

        function _r(t, e, n) {
            t.tagName.indexOf("-") > -1 ? br(t, e, n) : Bn(e) ? Gn(n) ? t.removeAttribute(e) : (n = "allowfullscreen" === e && "EMBED" === t.tagName ? "true" : e, t.setAttribute(e, n)) : jn(e) ? t.setAttribute(e, Un(e, n)) : Hn(e) ? Gn(n) ? t.removeAttributeNS(Vn, Wn(e)) : t.setAttributeNS(Vn, e, n) : br(t, e, n)
        }

        function br(t, e, n) {
            if (Gn(n)) t.removeAttribute(e);
            else {
                if (Z && !Q && "TEXTAREA" === t.tagName && "placeholder" === e && "" !== n && !t.__ieph) {
                    var r = function(e) {
                        e.stopImmediatePropagation(), t.removeEventListener("input", r)
                    };
                    t.addEventListener("input", r), t.__ieph = !0
                }
                t.setAttribute(e, n)
            }
        }
        var Cr = {
            create: yr,
            update: yr
        };

        function xr(t, e) {
            var n = e.elm,
                r = e.data,
                o = t.data;
            if (!(i(r.staticClass) && i(r.class) && (i(o) || i(o.staticClass) && i(o.class)))) {
                var s = zn(e),
                    c = n._transitionClasses;
                a(c) && (s = Kn(s, Xn(c))), s !== n._prevClass && (n.setAttribute("class", s), n._prevClass = s)
            }
        }
        var wr, Tr, Sr, kr, $r, Ar, Or = {
                create: xr,
                update: xr
            },
            Er = /[\w).+\-_$\]]/;

        function Pr(t) {
            var e, n, r, i, a, o = !1,
                s = !1,
                c = !1,
                u = !1,
                l = 0,
                f = 0,
                d = 0,
                p = 0;
            for (r = 0; r < t.length; r++)
                if (n = e, e = t.charCodeAt(r), o) 39 === e && 92 !== n && (o = !1);
                else if (s) 34 === e && 92 !== n && (s = !1);
            else if (c) 96 === e && 92 !== n && (c = !1);
            else if (u) 47 === e && 92 !== n && (u = !1);
            else if (124 !== e || 124 === t.charCodeAt(r + 1) || 124 === t.charCodeAt(r - 1) || l || f || d) {
                switch (e) {
                    case 34:
                        s = !0;
                        break;
                    case 39:
                        o = !0;
                        break;
                    case 96:
                        c = !0;
                        break;
                    case 40:
                        d++;
                        break;
                    case 41:
                        d--;
                        break;
                    case 91:
                        f++;
                        break;
                    case 93:
                        f--;
                        break;
                    case 123:
                        l++;
                        break;
                    case 125:
                        l--
                }
                if (47 === e) {
                    for (var v = r - 1, h = void 0; v >= 0 && " " === (h = t.charAt(v)); v--);
                    h && Er.test(h) || (u = !0)
                }
            } else void 0 === i ? (p = r + 1, i = t.slice(0, r).trim()) : m();

            function m() {
                (a || (a = [])).push(t.slice(p, r).trim()), p = r + 1
            }
            if (void 0 === i ? i = t.slice(0, r).trim() : 0 !== p && m(), a)
                for (r = 0; r < a.length; r++) i = Mr(i, a[r]);
            return i
        }

        function Mr(t, e) {
            var n = e.indexOf("(");
            if (n < 0) return '_f("' + e + '")(' + t + ")";
            var r = e.slice(0, n),
                i = e.slice(n + 1);
            return '_f("' + r + '")(' + t + (")" !== i ? "," + i : i)
        }

        function Nr(t, e) {
            console.error("[Vue compiler]: " + t)
        }

        function Lr(t, e) {
            return t ? t.map(function(t) {
                return t[e]
            }).filter(function(t) {
                return t
            }) : []
        }

        function Ir(t, e, n, r, i) {
            (t.props || (t.props = [])).push(Gr({
                name: e,
                value: n,
                dynamic: i
            }, r)), t.plain = !1
        }

        function Rr(t, e, n, r, i) {
            (i ? t.dynamicAttrs || (t.dynamicAttrs = []) : t.attrs || (t.attrs = [])).push(Gr({
                name: e,
                value: n,
                dynamic: i
            }, r)), t.plain = !1
        }

        function Dr(t, e, n, r) {
            t.attrsMap[e] = n, t.attrsList.push(Gr({
                name: e,
                value: n
            }, r))
        }

        function jr(t, e, n, r, i, a, o, s) {
            (t.directives || (t.directives = [])).push(Gr({
                name: e,
                rawName: n,
                value: r,
                arg: i,
                isDynamicArg: a,
                modifiers: o
            }, s)), t.plain = !1
        }

        function Fr(t, e, n) {
            return n ? "_p(" + e + ',"' + t + '")' : t + e
        }

        function Ur(t, e, n, i, a, o, s, c) {
            var u;
            (i = i || r).right ? c ? e = "(" + e + ")==='click'?'contextmenu':(" + e + ")" : "click" === e && (e = "contextmenu", delete i.right) : i.middle && (c ? e = "(" + e + ")==='click'?'mouseup':(" + e + ")" : "click" === e && (e = "mouseup")), i.capture && (delete i.capture, e = Fr("!", e, c)), i.once && (delete i.once, e = Fr("~", e, c)), i.passive && (delete i.passive, e = Fr("&", e, c)), i.native ? (delete i.native, u = t.nativeEvents || (t.nativeEvents = {})) : u = t.events || (t.events = {});
            var l = Gr({
                value: n.trim(),
                dynamic: c
            }, s);
            i !== r && (l.modifiers = i);
            var f = u[e];
            Array.isArray(f) ? a ? f.unshift(l) : f.push(l) : u[e] = f ? a ? [l, f] : [f, l] : l, t.plain = !1
        }

        function Br(t, e) {
            return t.rawAttrsMap[":" + e] || t.rawAttrsMap["v-bind:" + e] || t.rawAttrsMap[e]
        }

        function Vr(t, e, n) {
            var r = Hr(t, ":" + e) || Hr(t, "v-bind:" + e);
            if (null != r) return Pr(r);
            if (!1 !== n) {
                var i = Hr(t, e);
                if (null != i) return JSON.stringify(i)
            }
        }

        function Hr(t, e, n) {
            var r;
            if (null != (r = t.attrsMap[e]))
                for (var i = t.attrsList, a = 0, o = i.length; a < o; a++)
                    if (i[a].name === e) {
                        i.splice(a, 1);
                        break
                    } return n && delete t.attrsMap[e], r
        }

        function Wr(t, e) {
            for (var n = t.attrsList, r = 0, i = n.length; r < i; r++) {
                var a = n[r];
                if (e.test(a.name)) return n.splice(r, 1), a
            }
        }

        function Gr(t, e) {
            return e && (null != e.start && (t.start = e.start), null != e.end && (t.end = e.end)), t
        }

        function zr(t, e, n) {
            var r = n || {},
                i = r.number,
                a = "$$v";
            r.trim && (a = "(typeof $$v === 'string'? $$v.trim(): $$v)"), i && (a = "_n(" + a + ")");
            var o = qr(e, a);
            t.model = {
                value: "(" + e + ")",
                expression: JSON.stringify(e),
                callback: "function ($$v) {" + o + "}"
            }
        }

        function qr(t, e) {
            var n = function(t) {
                if (t = t.trim(), wr = t.length, t.indexOf("[") < 0 || t.lastIndexOf("]") < wr - 1) return (kr = t.lastIndexOf(".")) > -1 ? {
                    exp: t.slice(0, kr),
                    key: '"' + t.slice(kr + 1) + '"'
                } : {
                    exp: t,
                    key: null
                };
                Tr = t, kr = $r = Ar = 0;
                for (; !Xr();) Jr(Sr = Kr()) ? Zr(Sr) : 91 === Sr && Yr(Sr);
                return {
                    exp: t.slice(0, $r),
                    key: t.slice($r + 1, Ar)
                }
            }(t);
            return null === n.key ? t + "=" + e : "$set(" + n.exp + ", " + n.key + ", " + e + ")"
        }

        function Kr() {
            return Tr.charCodeAt(++kr)
        }

        function Xr() {
            return kr >= wr
        }

        function Jr(t) {
            return 34 === t || 39 === t
        }

        function Yr(t) {
            var e = 1;
            for ($r = kr; !Xr();)
                if (Jr(t = Kr())) Zr(t);
                else if (91 === t && e++, 93 === t && e--, 0 === e) {
                Ar = kr;
                break
            }
        }

        function Zr(t) {
            for (var e = t; !Xr() && (t = Kr()) !== e;);
        }
        var Qr, ti = "__r",
            ei = "__c";

        function ni(t, e, n) {
            var r = Qr;
            return function i() {
                null !== e.apply(null, arguments) && ai(t, i, n, r)
            }
        }
        var ri = Xt && !(nt && Number(nt[1]) <= 53);

        function ii(t, e, n, r) {
            if (ri) {
                var i = fn,
                    a = e;
                e = a._wrapper = function(t) {
                    if (t.target === t.currentTarget || t.timeStamp >= i || t.timeStamp <= 0 || t.target.ownerDocument !== document) return a.apply(this, arguments)
                }
            }
            Qr.addEventListener(t, e, it ? {
                capture: n,
                passive: r
            } : n)
        }

        function ai(t, e, n, r) {
            (r || Qr).removeEventListener(t, e._wrapper || e, n)
        }

        function oi(t, e) {
            if (!i(t.data.on) || !i(e.data.on)) {
                var n = e.data.on || {},
                    r = t.data.on || {};
                Qr = e.elm,
                    function(t) {
                        if (a(t[ti])) {
                            var e = Z ? "change" : "input";
                            t[e] = [].concat(t[ti], t[e] || []), delete t[ti]
                        }
                        a(t[ei]) && (t.change = [].concat(t[ei], t.change || []), delete t[ei])
                    }(n), ce(n, r, ii, ai, ni, e.context), Qr = void 0
            }
        }
        var si, ci = {
            create: oi,
            update: oi
        };

        function ui(t, e) {
            if (!i(t.data.domProps) || !i(e.data.domProps)) {
                var n, r, o = e.elm,
                    s = t.data.domProps || {},
                    c = e.data.domProps || {};
                for (n in a(c.__ob__) && (c = e.data.domProps = E({}, c)), s) n in c || (o[n] = "");
                for (n in c) {
                    if (r = c[n], "textContent" === n || "innerHTML" === n) {
                        if (e.children && (e.children.length = 0), r === s[n]) continue;
                        1 === o.childNodes.length && o.removeChild(o.childNodes[0])
                    }
                    if ("value" === n && "PROGRESS" !== o.tagName) {
                        o._value = r;
                        var u = i(r) ? "" : String(r);
                        li(o, u) && (o.value = u)
                    } else if ("innerHTML" === n && Zn(o.tagName) && i(o.innerHTML)) {
                        (si = si || document.createElement("div")).innerHTML = "<svg>" + r + "</svg>";
                        for (var l = si.firstChild; o.firstChild;) o.removeChild(o.firstChild);
                        for (; l.firstChild;) o.appendChild(l.firstChild)
                    } else if (r !== s[n]) try {
                        o[n] = r
                    } catch (t) {}
                }
            }
        }

        function li(t, e) {
            return !t.composing && ("OPTION" === t.tagName || function(t, e) {
                var n = !0;
                try {
                    n = document.activeElement !== t
                } catch (t) {}
                return n && t.value !== e
            }(t, e) || function(t, e) {
                var n = t.value,
                    r = t._vModifiers;
                if (a(r)) {
                    if (r.number) return h(n) !== h(e);
                    if (r.trim) return n.trim() !== e.trim()
                }
                return n !== e
            }(t, e))
        }
        var fi = {
                create: ui,
                update: ui
            },
            di = x(function(t) {
                var e = {},
                    n = /:(.+)/;
                return t.split(/;(?![^(]*\))/g).forEach(function(t) {
                    if (t) {
                        var r = t.split(n);
                        r.length > 1 && (e[r[0].trim()] = r[1].trim())
                    }
                }), e
            });

        function pi(t) {
            var e = vi(t.style);
            return t.staticStyle ? E(t.staticStyle, e) : e
        }

        function vi(t) {
            return Array.isArray(t) ? P(t) : "string" == typeof t ? di(t) : t
        }
        var hi, mi = /^--/,
            gi = /\s*!important$/,
            yi = function(t, e, n) {
                if (mi.test(e)) t.style.setProperty(e, n);
                else if (gi.test(n)) t.style.setProperty($(e), n.replace(gi, ""), "important");
                else {
                    var r = bi(e);
                    if (Array.isArray(n))
                        for (var i = 0, a = n.length; i < a; i++) t.style[r] = n[i];
                    else t.style[r] = n
                }
            },
            _i = ["Webkit", "Moz", "ms"],
            bi = x(function(t) {
                if (hi = hi || document.createElement("div").style, "filter" !== (t = T(t)) && t in hi) return t;
                for (var e = t.charAt(0).toUpperCase() + t.slice(1), n = 0; n < _i.length; n++) {
                    var r = _i[n] + e;
                    if (r in hi) return r
                }
            });

        function Ci(t, e) {
            var n = e.data,
                r = t.data;
            if (!(i(n.staticStyle) && i(n.style) && i(r.staticStyle) && i(r.style))) {
                var o, s, c = e.elm,
                    u = r.staticStyle,
                    l = r.normalizedStyle || r.style || {},
                    f = u || l,
                    d = vi(e.data.style) || {};
                e.data.normalizedStyle = a(d.__ob__) ? E({}, d) : d;
                var p = function(t, e) {
                    var n, r = {};
                    if (e)
                        for (var i = t; i.componentInstance;)(i = i.componentInstance._vnode) && i.data && (n = pi(i.data)) && E(r, n);
                    (n = pi(t.data)) && E(r, n);
                    for (var a = t; a = a.parent;) a.data && (n = pi(a.data)) && E(r, n);
                    return r
                }(e, !0);
                for (s in f) i(p[s]) && yi(c, s, "");
                for (s in p)(o = p[s]) !== f[s] && yi(c, s, null == o ? "" : o)
            }
        }
        var xi = {
                create: Ci,
                update: Ci
            },
            wi = /\s+/;

        function Ti(t, e) {
            if (e && (e = e.trim()))
                if (t.classList) e.indexOf(" ") > -1 ? e.split(wi).forEach(function(e) {
                    return t.classList.add(e)
                }) : t.classList.add(e);
                else {
                    var n = " " + (t.getAttribute("class") || "") + " ";
                    n.indexOf(" " + e + " ") < 0 && t.setAttribute("class", (n + e).trim())
                }
        }

        function Si(t, e) {
            if (e && (e = e.trim()))
                if (t.classList) e.indexOf(" ") > -1 ? e.split(wi).forEach(function(e) {
                    return t.classList.remove(e)
                }) : t.classList.remove(e), t.classList.length || t.removeAttribute("class");
                else {
                    for (var n = " " + (t.getAttribute("class") || "") + " ", r = " " + e + " "; n.indexOf(r) >= 0;) n = n.replace(r, " ");
                    (n = n.trim()) ? t.setAttribute("class", n): t.removeAttribute("class")
                }
        }

        function ki(t) {
            if (t) {
                if ("object" == typeof t) {
                    var e = {};
                    return !1 !== t.css && E(e, $i(t.name || "v")), E(e, t), e
                }
                return "string" == typeof t ? $i(t) : void 0
            }
        }
        var $i = x(function(t) {
                return {
                    enterClass: t + "-enter",
                    enterToClass: t + "-enter-to",
                    enterActiveClass: t + "-enter-active",
                    leaveClass: t + "-leave",
                    leaveToClass: t + "-leave-to",
                    leaveActiveClass: t + "-leave-active"
                }
            }),
            Ai = K && !Q,
            Oi = "transition",
            Ei = "animation",
            Pi = "transition",
            Mi = "transitionend",
            Ni = "animation",
            Li = "animationend";
        Ai && (void 0 === window.ontransitionend && void 0 !== window.onwebkittransitionend && (Pi = "WebkitTransition", Mi = "webkitTransitionEnd"), void 0 === window.onanimationend && void 0 !== window.onwebkitanimationend && (Ni = "WebkitAnimation", Li = "webkitAnimationEnd"));
        var Ii = K ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : function(t) {
            return t()
        };

        function Ri(t) {
            Ii(function() {
                Ii(t)
            })
        }

        function Di(t, e) {
            var n = t._transitionClasses || (t._transitionClasses = []);
            n.indexOf(e) < 0 && (n.push(e), Ti(t, e))
        }

        function ji(t, e) {
            t._transitionClasses && _(t._transitionClasses, e), Si(t, e)
        }

        function Fi(t, e, n) {
            var r = Bi(t, e),
                i = r.type,
                a = r.timeout,
                o = r.propCount;
            if (!i) return n();
            var s = i === Oi ? Mi : Li,
                c = 0,
                u = function() {
                    t.removeEventListener(s, l), n()
                },
                l = function(e) {
                    e.target === t && ++c >= o && u()
                };
            setTimeout(function() {
                c < o && u()
            }, a + 1), t.addEventListener(s, l)
        }
        var Ui = /\b(transform|all)(,|$)/;

        function Bi(t, e) {
            var n, r = window.getComputedStyle(t),
                i = (r[Pi + "Delay"] || "").split(", "),
                a = (r[Pi + "Duration"] || "").split(", "),
                o = Vi(i, a),
                s = (r[Ni + "Delay"] || "").split(", "),
                c = (r[Ni + "Duration"] || "").split(", "),
                u = Vi(s, c),
                l = 0,
                f = 0;
            return e === Oi ? o > 0 && (n = Oi, l = o, f = a.length) : e === Ei ? u > 0 && (n = Ei, l = u, f = c.length) : f = (n = (l = Math.max(o, u)) > 0 ? o > u ? Oi : Ei : null) ? n === Oi ? a.length : c.length : 0, {
                type: n,
                timeout: l,
                propCount: f,
                hasTransform: n === Oi && Ui.test(r[Pi + "Property"])
            }
        }

        function Vi(t, e) {
            for (; t.length < e.length;) t = t.concat(t);
            return Math.max.apply(null, e.map(function(e, n) {
                return Hi(e) + Hi(t[n])
            }))
        }

        function Hi(t) {
            return 1e3 * Number(t.slice(0, -1).replace(",", "."))
        }

        function Wi(t, e) {
            var n = t.elm;
            a(n._leaveCb) && (n._leaveCb.cancelled = !0, n._leaveCb());
            var r = ki(t.data.transition);
            if (!i(r) && !a(n._enterCb) && 1 === n.nodeType) {
                for (var o = r.css, s = r.type, u = r.enterClass, l = r.enterToClass, f = r.enterActiveClass, d = r.appearClass, p = r.appearToClass, v = r.appearActiveClass, m = r.beforeEnter, g = r.enter, y = r.afterEnter, _ = r.enterCancelled, b = r.beforeAppear, C = r.appear, x = r.afterAppear, w = r.appearCancelled, T = r.duration, S = Qe, k = Qe.$vnode; k && k.parent;) S = k.context, k = k.parent;
                var $ = !S._isMounted || !t.isRootInsert;
                if (!$ || C || "" === C) {
                    var A = $ && d ? d : u,
                        O = $ && v ? v : f,
                        E = $ && p ? p : l,
                        P = $ && b || m,
                        M = $ && "function" == typeof C ? C : g,
                        N = $ && x || y,
                        L = $ && w || _,
                        I = h(c(T) ? T.enter : T);
                    0;
                    var R = !1 !== o && !Q,
                        j = qi(M),
                        F = n._enterCb = D(function() {
                            R && (ji(n, E), ji(n, O)), F.cancelled ? (R && ji(n, A), L && L(n)) : N && N(n), n._enterCb = null
                        });
                    t.data.show || ue(t, "insert", function() {
                        var e = n.parentNode,
                            r = e && e._pending && e._pending[t.key];
                        r && r.tag === t.tag && r.elm._leaveCb && r.elm._leaveCb(), M && M(n, F)
                    }), P && P(n), R && (Di(n, A), Di(n, O), Ri(function() {
                        ji(n, A), F.cancelled || (Di(n, E), j || (zi(I) ? setTimeout(F, I) : Fi(n, s, F)))
                    })), t.data.show && (e && e(), M && M(n, F)), R || j || F()
                }
            }
        }

        function Gi(t, e) {
            var n = t.elm;
            a(n._enterCb) && (n._enterCb.cancelled = !0, n._enterCb());
            var r = ki(t.data.transition);
            if (i(r) || 1 !== n.nodeType) return e();
            if (!a(n._leaveCb)) {
                var o = r.css,
                    s = r.type,
                    u = r.leaveClass,
                    l = r.leaveToClass,
                    f = r.leaveActiveClass,
                    d = r.beforeLeave,
                    p = r.leave,
                    v = r.afterLeave,
                    m = r.leaveCancelled,
                    g = r.delayLeave,
                    y = r.duration,
                    _ = !1 !== o && !Q,
                    b = qi(p),
                    C = h(c(y) ? y.leave : y);
                0;
                var x = n._leaveCb = D(function() {
                    n.parentNode && n.parentNode._pending && (n.parentNode._pending[t.key] = null), _ && (ji(n, l), ji(n, f)), x.cancelled ? (_ && ji(n, u), m && m(n)) : (e(), v && v(n)), n._leaveCb = null
                });
                g ? g(w) : w()
            }

            function w() {
                x.cancelled || (!t.data.show && n.parentNode && ((n.parentNode._pending || (n.parentNode._pending = {}))[t.key] = t), d && d(n), _ && (Di(n, u), Di(n, f), Ri(function() {
                    ji(n, u), x.cancelled || (Di(n, l), b || (zi(C) ? setTimeout(x, C) : Fi(n, s, x)))
                })), p && p(n, x), _ || b || x())
            }
        }

        function zi(t) {
            return "number" == typeof t && !isNaN(t)
        }

        function qi(t) {
            if (i(t)) return !1;
            var e = t.fns;
            return a(e) ? qi(Array.isArray(e) ? e[0] : e) : (t._length || t.length) > 1
        }

        function Ki(t, e) {
            !0 !== e.data.show && Wi(e)
        }
        var Xi = function(t) {
            var e, n, r = {},
                c = t.modules,
                u = t.nodeOps;
            for (e = 0; e < cr.length; ++e)
                for (r[cr[e]] = [], n = 0; n < c.length; ++n) a(c[n][cr[e]]) && r[cr[e]].push(c[n][cr[e]]);

            function l(t) {
                var e = u.parentNode(t);
                a(e) && u.removeChild(e, t)
            }

            function f(t, e, n, i, s, c, l) {
                if (a(t.elm) && a(c) && (t = c[l] = Ct(t)), t.isRootInsert = !s, ! function(t, e, n, i) {
                        var s = t.data;
                        if (a(s)) {
                            var c = a(t.componentInstance) && s.keepAlive;
                            if (a(s = s.hook) && a(s = s.init) && s(t, !1), a(t.componentInstance)) return d(t, e), p(n, t.elm, i), o(c) && function(t, e, n, i) {
                                for (var o, s = t; s.componentInstance;)
                                    if (s = s.componentInstance._vnode, a(o = s.data) && a(o = o.transition)) {
                                        for (o = 0; o < r.activate.length; ++o) r.activate[o](sr, s);
                                        e.push(s);
                                        break
                                    } p(n, t.elm, i)
                            }(t, e, n, i), !0
                        }
                    }(t, e, n, i)) {
                    var f = t.data,
                        h = t.children,
                        m = t.tag;
                    a(m) ? (t.elm = t.ns ? u.createElementNS(t.ns, m) : u.createElement(m, t), y(t), v(t, h, e), a(f) && g(t, e), p(n, t.elm, i)) : o(t.isComment) ? (t.elm = u.createComment(t.text), p(n, t.elm, i)) : (t.elm = u.createTextNode(t.text), p(n, t.elm, i))
                }
            }

            function d(t, e) {
                a(t.data.pendingInsert) && (e.push.apply(e, t.data.pendingInsert), t.data.pendingInsert = null), t.elm = t.componentInstance.$el, h(t) ? (g(t, e), y(t)) : (or(t), e.push(t))
            }

            function p(t, e, n) {
                a(t) && (a(n) ? u.parentNode(n) === t && u.insertBefore(t, e, n) : u.appendChild(t, e))
            }

            function v(t, e, n) {
                if (Array.isArray(e))
                    for (var r = 0; r < e.length; ++r) f(e[r], n, t.elm, null, !0, e, r);
                else s(t.text) && u.appendChild(t.elm, u.createTextNode(String(t.text)))
            }

            function h(t) {
                for (; t.componentInstance;) t = t.componentInstance._vnode;
                return a(t.tag)
            }

            function g(t, n) {
                for (var i = 0; i < r.create.length; ++i) r.create[i](sr, t);
                a(e = t.data.hook) && (a(e.create) && e.create(sr, t), a(e.insert) && n.push(t))
            }

            function y(t) {
                var e;
                if (a(e = t.fnScopeId)) u.setStyleScope(t.elm, e);
                else
                    for (var n = t; n;) a(e = n.context) && a(e = e.$options._scopeId) && u.setStyleScope(t.elm, e), n = n.parent;
                a(e = Qe) && e !== t.context && e !== t.fnContext && a(e = e.$options._scopeId) && u.setStyleScope(t.elm, e)
            }

            function _(t, e, n, r, i, a) {
                for (; r <= i; ++r) f(n[r], a, t, e, !1, n, r)
            }

            function b(t) {
                var e, n, i = t.data;
                if (a(i))
                    for (a(e = i.hook) && a(e = e.destroy) && e(t), e = 0; e < r.destroy.length; ++e) r.destroy[e](t);
                if (a(e = t.children))
                    for (n = 0; n < t.children.length; ++n) b(t.children[n])
            }

            function C(t, e, n) {
                for (; e <= n; ++e) {
                    var r = t[e];
                    a(r) && (a(r.tag) ? (x(r), b(r)) : l(r.elm))
                }
            }

            function x(t, e) {
                if (a(e) || a(t.data)) {
                    var n, i = r.remove.length + 1;
                    for (a(e) ? e.listeners += i : e = function(t, e) {
                            function n() {
                                0 == --n.listeners && l(t)
                            }
                            return n.listeners = e, n
                        }(t.elm, i), a(n = t.componentInstance) && a(n = n._vnode) && a(n.data) && x(n, e), n = 0; n < r.remove.length; ++n) r.remove[n](t, e);
                    a(n = t.data.hook) && a(n = n.remove) ? n(t, e) : e()
                } else l(t.elm)
            }

            function w(t, e, n, r) {
                for (var i = n; i < r; i++) {
                    var o = e[i];
                    if (a(o) && ur(t, o)) return i
                }
            }

            function T(t, e, n, s, c, l) {
                if (t !== e) {
                    a(e.elm) && a(s) && (e = s[c] = Ct(e));
                    var d = e.elm = t.elm;
                    if (o(t.isAsyncPlaceholder)) a(e.asyncFactory.resolved) ? $(t.elm, e, n) : e.isAsyncPlaceholder = !0;
                    else if (o(e.isStatic) && o(t.isStatic) && e.key === t.key && (o(e.isCloned) || o(e.isOnce))) e.componentInstance = t.componentInstance;
                    else {
                        var p, v = e.data;
                        a(v) && a(p = v.hook) && a(p = p.prepatch) && p(t, e);
                        var m = t.children,
                            g = e.children;
                        if (a(v) && h(e)) {
                            for (p = 0; p < r.update.length; ++p) r.update[p](t, e);
                            a(p = v.hook) && a(p = p.update) && p(t, e)
                        }
                        i(e.text) ? a(m) && a(g) ? m !== g && function(t, e, n, r, o) {
                            for (var s, c, l, d = 0, p = 0, v = e.length - 1, h = e[0], m = e[v], g = n.length - 1, y = n[0], b = n[g], x = !o; d <= v && p <= g;) i(h) ? h = e[++d] : i(m) ? m = e[--v] : ur(h, y) ? (T(h, y, r, n, p), h = e[++d], y = n[++p]) : ur(m, b) ? (T(m, b, r, n, g), m = e[--v], b = n[--g]) : ur(h, b) ? (T(h, b, r, n, g), x && u.insertBefore(t, h.elm, u.nextSibling(m.elm)), h = e[++d], b = n[--g]) : ur(m, y) ? (T(m, y, r, n, p), x && u.insertBefore(t, m.elm, h.elm), m = e[--v], y = n[++p]) : (i(s) && (s = lr(e, d, v)), i(c = a(y.key) ? s[y.key] : w(y, e, d, v)) ? f(y, r, t, h.elm, !1, n, p) : ur(l = e[c], y) ? (T(l, y, r, n, p), e[c] = void 0, x && u.insertBefore(t, l.elm, h.elm)) : f(y, r, t, h.elm, !1, n, p), y = n[++p]);
                            d > v ? _(t, i(n[g + 1]) ? null : n[g + 1].elm, n, p, g, r) : p > g && C(e, d, v)
                        }(d, m, g, n, l) : a(g) ? (a(t.text) && u.setTextContent(d, ""), _(d, null, g, 0, g.length - 1, n)) : a(m) ? C(m, 0, m.length - 1) : a(t.text) && u.setTextContent(d, "") : t.text !== e.text && u.setTextContent(d, e.text), a(v) && a(p = v.hook) && a(p = p.postpatch) && p(t, e)
                    }
                }
            }

            function S(t, e, n) {
                if (o(n) && a(t.parent)) t.parent.data.pendingInsert = e;
                else
                    for (var r = 0; r < e.length; ++r) e[r].data.hook.insert(e[r])
            }
            var k = m("attrs,class,staticClass,staticStyle,key");

            function $(t, e, n, r) {
                var i, s = e.tag,
                    c = e.data,
                    u = e.children;
                if (r = r || c && c.pre, e.elm = t, o(e.isComment) && a(e.asyncFactory)) return e.isAsyncPlaceholder = !0, !0;
                if (a(c) && (a(i = c.hook) && a(i = i.init) && i(e, !0), a(i = e.componentInstance))) return d(e, n), !0;
                if (a(s)) {
                    if (a(u))
                        if (t.hasChildNodes())
                            if (a(i = c) && a(i = i.domProps) && a(i = i.innerHTML)) {
                                if (i !== t.innerHTML) return !1
                            } else {
                                for (var l = !0, f = t.firstChild, p = 0; p < u.length; p++) {
                                    if (!f || !$(f, u[p], n, r)) {
                                        l = !1;
                                        break
                                    }
                                    f = f.nextSibling
                                }
                                if (!l || f) return !1
                            }
                    else v(e, u, n);
                    if (a(c)) {
                        var h = !1;
                        for (var m in c)
                            if (!k(m)) {
                                h = !0, g(e, n);
                                break
                            }! h && c.class && ae(c.class)
                    }
                } else t.data !== e.text && (t.data = e.text);
                return !0
            }
            return function(t, e, n, s) {
                if (!i(e)) {
                    var c = !1,
                        l = [];
                    if (i(t)) c = !0, f(e, l);
                    else {
                        var d = a(t.nodeType);
                        if (!d && ur(t, e)) T(t, e, l, null, null, s);
                        else {
                            if (d) {
                                if (1 === t.nodeType && t.hasAttribute(j) && (t.removeAttribute(j), n = !0), o(n) && $(t, e, l)) return S(e, l, !0), t;
                                t = function(t) {
                                    return new gt(u.tagName(t).toLowerCase(), {}, [], void 0, t)
                                }(t)
                            }
                            var p = t.elm,
                                v = u.parentNode(p);
                            if (f(e, l, p._leaveCb ? null : v, u.nextSibling(p)), a(e.parent))
                                for (var m = e.parent, g = h(e); m;) {
                                    for (var y = 0; y < r.destroy.length; ++y) r.destroy[y](m);
                                    if (m.elm = e.elm, g) {
                                        for (var _ = 0; _ < r.create.length; ++_) r.create[_](sr, m);
                                        var x = m.data.hook.insert;
                                        if (x.merged)
                                            for (var w = 1; w < x.fns.length; w++) x.fns[w]()
                                    } else or(m);
                                    m = m.parent
                                }
                            a(v) ? C([t], 0, 0) : a(t.tag) && b(t)
                        }
                    }
                    return S(e, l, c), e.elm
                }
                a(t) && b(t)
            }
        }({
            nodeOps: ir,
            modules: [Cr, Or, ci, fi, xi, K ? {
                create: Ki,
                activate: Ki,
                remove: function(t, e) {
                    !0 !== t.data.show ? Gi(t, e) : e()
                }
            } : {}].concat(gr)
        });
        Q && document.addEventListener("selectionchange", function() {
            var t = document.activeElement;
            t && t.vmodel && ra(t, "input")
        });
        var Ji = {
            inserted: function(t, e, n, r) {
                "select" === n.tag ? (r.elm && !r.elm._vOptions ? ue(n, "postpatch", function() {
                    Ji.componentUpdated(t, e, n)
                }) : Yi(t, e, n.context), t._vOptions = [].map.call(t.options, ta)) : ("textarea" === n.tag || nr(t.type)) && (t._vModifiers = e.modifiers, e.modifiers.lazy || (t.addEventListener("compositionstart", ea), t.addEventListener("compositionend", na), t.addEventListener("change", na), Q && (t.vmodel = !0)))
            },
            componentUpdated: function(t, e, n) {
                if ("select" === n.tag) {
                    Yi(t, e, n.context);
                    var r = t._vOptions,
                        i = t._vOptions = [].map.call(t.options, ta);
                    if (i.some(function(t, e) {
                            return !I(t, r[e])
                        }))(t.multiple ? e.value.some(function(t) {
                        return Qi(t, i)
                    }) : e.value !== e.oldValue && Qi(e.value, i)) && ra(t, "change")
                }
            }
        };

        function Yi(t, e, n) {
            Zi(t, e, n), (Z || tt) && setTimeout(function() {
                Zi(t, e, n)
            }, 0)
        }

        function Zi(t, e, n) {
            var r = e.value,
                i = t.multiple;
            if (!i || Array.isArray(r)) {
                for (var a, o, s = 0, c = t.options.length; s < c; s++)
                    if (o = t.options[s], i) a = R(r, ta(o)) > -1, o.selected !== a && (o.selected = a);
                    else if (I(ta(o), r)) return void(t.selectedIndex !== s && (t.selectedIndex = s));
                i || (t.selectedIndex = -1)
            }
        }

        function Qi(t, e) {
            return e.every(function(e) {
                return !I(e, t)
            })
        }

        function ta(t) {
            return "_value" in t ? t._value : t.value
        }

        function ea(t) {
            t.target.composing = !0
        }

        function na(t) {
            t.target.composing && (t.target.composing = !1, ra(t.target, "input"))
        }

        function ra(t, e) {
            var n = document.createEvent("HTMLEvents");
            n.initEvent(e, !0, !0), t.dispatchEvent(n)
        }

        function ia(t) {
            return !t.componentInstance || t.data && t.data.transition ? t : ia(t.componentInstance._vnode)
        }
        var aa = {
                model: Ji,
                show: {
                    bind: function(t, e, n) {
                        var r = e.value,
                            i = (n = ia(n)).data && n.data.transition,
                            a = t.__vOriginalDisplay = "none" === t.style.display ? "" : t.style.display;
                        r && i ? (n.data.show = !0, Wi(n, function() {
                            t.style.display = a
                        })) : t.style.display = r ? a : "none"
                    },
                    update: function(t, e, n) {
                        var r = e.value;
                        !r != !e.oldValue && ((n = ia(n)).data && n.data.transition ? (n.data.show = !0, r ? Wi(n, function() {
                            t.style.display = t.__vOriginalDisplay
                        }) : Gi(n, function() {
                            t.style.display = "none"
                        })) : t.style.display = r ? t.__vOriginalDisplay : "none")
                    },
                    unbind: function(t, e, n, r, i) {
                        i || (t.style.display = t.__vOriginalDisplay)
                    }
                }
            },
            oa = {
                name: String,
                appear: Boolean,
                css: Boolean,
                mode: String,
                type: String,
                enterClass: String,
                leaveClass: String,
                enterToClass: String,
                leaveToClass: String,
                enterActiveClass: String,
                leaveActiveClass: String,
                appearClass: String,
                appearActiveClass: String,
                appearToClass: String,
                duration: [Number, String, Object]
            };

        function sa(t) {
            var e = t && t.componentOptions;
            return e && e.Ctor.options.abstract ? sa(Ke(e.children)) : t
        }

        function ca(t) {
            var e = {},
                n = t.$options;
            for (var r in n.propsData) e[r] = t[r];
            var i = n._parentListeners;
            for (var a in i) e[T(a)] = i[a];
            return e
        }

        function ua(t, e) {
            if (/\d-keep-alive$/.test(e.tag)) return t("keep-alive", {
                props: e.componentOptions.propsData
            })
        }
        var la = function(t) {
                return t.tag || qe(t)
            },
            fa = function(t) {
                return "show" === t.name
            },
            da = {
                name: "transition",
                props: oa,
                abstract: !0,
                render: function(t) {
                    var e = this,
                        n = this.$slots.default;
                    if (n && (n = n.filter(la)).length) {
                        0;
                        var r = this.mode;
                        0;
                        var i = n[0];
                        if (function(t) {
                                for (; t = t.parent;)
                                    if (t.data.transition) return !0
                            }(this.$vnode)) return i;
                        var a = sa(i);
                        if (!a) return i;
                        if (this._leaving) return ua(t, i);
                        var o = "__transition-" + this._uid + "-";
                        a.key = null == a.key ? a.isComment ? o + "comment" : o + a.tag : s(a.key) ? 0 === String(a.key).indexOf(o) ? a.key : o + a.key : a.key;
                        var c = (a.data || (a.data = {})).transition = ca(this),
                            u = this._vnode,
                            l = sa(u);
                        if (a.data.directives && a.data.directives.some(fa) && (a.data.show = !0), l && l.data && ! function(t, e) {
                                return e.key === t.key && e.tag === t.tag
                            }(a, l) && !qe(l) && (!l.componentInstance || !l.componentInstance._vnode.isComment)) {
                            var f = l.data.transition = E({}, c);
                            if ("out-in" === r) return this._leaving = !0, ue(f, "afterLeave", function() {
                                e._leaving = !1, e.$forceUpdate()
                            }), ua(t, i);
                            if ("in-out" === r) {
                                if (qe(a)) return u;
                                var d, p = function() {
                                    d()
                                };
                                ue(c, "afterEnter", p), ue(c, "enterCancelled", p), ue(f, "delayLeave", function(t) {
                                    d = t
                                })
                            }
                        }
                        return i
                    }
                }
            },
            pa = E({
                tag: String,
                moveClass: String
            }, oa);

        function va(t) {
            t.elm._moveCb && t.elm._moveCb(), t.elm._enterCb && t.elm._enterCb()
        }

        function ha(t) {
            t.data.newPos = t.elm.getBoundingClientRect()
        }

        function ma(t) {
            var e = t.data.pos,
                n = t.data.newPos,
                r = e.left - n.left,
                i = e.top - n.top;
            if (r || i) {
                t.data.moved = !0;
                var a = t.elm.style;
                a.transform = a.WebkitTransform = "translate(" + r + "px," + i + "px)", a.transitionDuration = "0s"
            }
        }
        delete pa.mode;
        var ga = {
            Transition: da,
            TransitionGroup: {
                props: pa,
                beforeMount: function() {
                    var t = this,
                        e = this._update;
                    this._update = function(n, r) {
                        var i = tn(t);
                        t.__patch__(t._vnode, t.kept, !1, !0), t._vnode = t.kept, i(), e.call(t, n, r)
                    }
                },
                render: function(t) {
                    for (var e = this.tag || this.$vnode.data.tag || "span", n = Object.create(null), r = this.prevChildren = this.children, i = this.$slots.default || [], a = this.children = [], o = ca(this), s = 0; s < i.length; s++) {
                        var c = i[s];
                        if (c.tag)
                            if (null != c.key && 0 !== String(c.key).indexOf("__vlist")) a.push(c), n[c.key] = c, (c.data || (c.data = {})).transition = o;
                            else;
                    }
                    if (r) {
                        for (var u = [], l = [], f = 0; f < r.length; f++) {
                            var d = r[f];
                            d.data.transition = o, d.data.pos = d.elm.getBoundingClientRect(), n[d.key] ? u.push(d) : l.push(d)
                        }
                        this.kept = t(e, null, u), this.removed = l
                    }
                    return t(e, null, a)
                },
                updated: function() {
                    var t = this.prevChildren,
                        e = this.moveClass || (this.name || "v") + "-move";
                    t.length && this.hasMove(t[0].elm, e) && (t.forEach(va), t.forEach(ha), t.forEach(ma), this._reflow = document.body.offsetHeight, t.forEach(function(t) {
                        if (t.data.moved) {
                            var n = t.elm,
                                r = n.style;
                            Di(n, e), r.transform = r.WebkitTransform = r.transitionDuration = "", n.addEventListener(Mi, n._moveCb = function t(r) {
                                r && r.target !== n || r && !/transform$/.test(r.propertyName) || (n.removeEventListener(Mi, t), n._moveCb = null, ji(n, e))
                            })
                        }
                    }))
                },
                methods: {
                    hasMove: function(t, e) {
                        if (!Ai) return !1;
                        if (this._hasMove) return this._hasMove;
                        var n = t.cloneNode();
                        t._transitionClasses && t._transitionClasses.forEach(function(t) {
                            Si(n, t)
                        }), Ti(n, e), n.style.display = "none", this.$el.appendChild(n);
                        var r = Bi(n);
                        return this.$el.removeChild(n), this._hasMove = r.hasTransform
                    }
                }
            }
        };
        $n.config.mustUseProp = Dn, $n.config.isReservedTag = Qn, $n.config.isReservedAttr = In, $n.config.getTagNamespace = tr, $n.config.isUnknownElement = function(t) {
            if (!K) return !0;
            if (Qn(t)) return !1;
            if (t = t.toLowerCase(), null != er[t]) return er[t];
            var e = document.createElement(t);
            return t.indexOf("-") > -1 ? er[t] = e.constructor === window.HTMLUnknownElement || e.constructor === window.HTMLElement : er[t] = /HTMLUnknownElement/.test(e.toString())
        }, E($n.options.directives, aa), E($n.options.components, ga), $n.prototype.__patch__ = K ? Xi : M, $n.prototype.$mount = function(t, e) {
            return function(t, e, n) {
                return t.$el = e, t.$options.render || (t.$options.render = _t), rn(t, "beforeMount"), new mn(t, function() {
                    t._update(t._render(), n)
                }, M, {
                    before: function() {
                        t._isMounted && !t._isDestroyed && rn(t, "beforeUpdate")
                    }
                }, !0), n = !1, null == t.$vnode && (t._isMounted = !0, rn(t, "mounted")), t
            }(this, t = t && K ? rr(t) : void 0, e)
        }, K && setTimeout(function() {
            B.devtools && st && st.emit("init", $n)
        }, 0);
        var ya = /\{\{((?:.|\r?\n)+?)\}\}/g,
            _a = /[-.*+?^${}()|[\]\/\\]/g,
            ba = x(function(t) {
                var e = t[0].replace(_a, "\\$&"),
                    n = t[1].replace(_a, "\\$&");
                return new RegExp(e + "((?:.|\\n)+?)" + n, "g")
            });

        function Ca(t, e) {
            var n = e ? ba(e) : ya;
            if (n.test(t)) {
                for (var r, i, a, o = [], s = [], c = n.lastIndex = 0; r = n.exec(t);) {
                    (i = r.index) > c && (s.push(a = t.slice(c, i)), o.push(JSON.stringify(a)));
                    var u = Pr(r[1].trim());
                    o.push("_s(" + u + ")"), s.push({
                        "@binding": u
                    }), c = i + r[0].length
                }
                return c < t.length && (s.push(a = t.slice(c)), o.push(JSON.stringify(a))), {
                    expression: o.join("+"),
                    tokens: s
                }
            }
        }
        var xa = {
            staticKeys: ["staticClass"],
            transformNode: function(t, e) {
                e.warn;
                var n = Hr(t, "class");
                n && (t.staticClass = JSON.stringify(n));
                var r = Vr(t, "class", !1);
                r && (t.classBinding = r)
            },
            genData: function(t) {
                var e = "";
                return t.staticClass && (e += "staticClass:" + t.staticClass + ","), t.classBinding && (e += "class:" + t.classBinding + ","), e
            }
        };
        var wa, Ta = {
                staticKeys: ["staticStyle"],
                transformNode: function(t, e) {
                    e.warn;
                    var n = Hr(t, "style");
                    n && (t.staticStyle = JSON.stringify(di(n)));
                    var r = Vr(t, "style", !1);
                    r && (t.styleBinding = r)
                },
                genData: function(t) {
                    var e = "";
                    return t.staticStyle && (e += "staticStyle:" + t.staticStyle + ","), t.styleBinding && (e += "style:(" + t.styleBinding + "),"), e
                }
            },
            Sa = function(t) {
                return (wa = wa || document.createElement("div")).innerHTML = t, wa.textContent
            },
            ka = m("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"),
            $a = m("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"),
            Aa = m("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"),
            Oa = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,
            Ea = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,
            Pa = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + V.source + "]*",
            Ma = "((?:" + Pa + "\\:)?" + Pa + ")",
            Na = new RegExp("^<" + Ma),
            La = /^\s*(\/?)>/,
            Ia = new RegExp("^<\\/" + Ma + "[^>]*>"),
            Ra = /^<!DOCTYPE [^>]+>/i,
            Da = /^<!\--/,
            ja = /^<!\[/,
            Fa = m("script,style,textarea", !0),
            Ua = {},
            Ba = {
                "&lt;": "<",
                "&gt;": ">",
                "&quot;": '"',
                "&amp;": "&",
                "&#10;": "\n",
                "&#9;": "\t",
                "&#39;": "'"
            },
            Va = /&(?:lt|gt|quot|amp|#39);/g,
            Ha = /&(?:lt|gt|quot|amp|#39|#10|#9);/g,
            Wa = m("pre,textarea", !0),
            Ga = function(t, e) {
                return t && Wa(t) && "\n" === e[0]
            };

        function za(t, e) {
            var n = e ? Ha : Va;
            return t.replace(n, function(t) {
                return Ba[t]
            })
        }
        var qa, Ka, Xa, Ja, Ya, Za, Qa, to, eo = /^@|^v-on:/,
            no = /^v-|^@|^:|^#/,
            ro = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
            io = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
            ao = /^\(|\)$/g,
            oo = /^\[.*\]$/,
            so = /:(.*)$/,
            co = /^:|^\.|^v-bind:/,
            uo = /\.[^.\]]+(?=[^\]]*$)/g,
            lo = /^v-slot(:|$)|^#/,
            fo = /[\r\n]/,
            po = /\s+/g,
            vo = x(Sa),
            ho = "_empty_";

        function mo(t, e, n) {
            return {
                type: 1,
                tag: t,
                attrsList: e,
                attrsMap: function(t) {
                    for (var e = {}, n = 0, r = t.length; n < r; n++) e[t[n].name] = t[n].value;
                    return e
                }(e),
                rawAttrsMap: {},
                parent: n,
                children: []
            }
        }

        function go(t, e) {
            qa = e.warn || Nr, Za = e.isPreTag || N, Qa = e.mustUseProp || N, to = e.getTagNamespace || N;
            var n = e.isReservedTag || N;
            (function(t) {
                return !!t.component || !n(t.tag)
            }), Xa = Lr(e.modules, "transformNode"), Ja = Lr(e.modules, "preTransformNode"), Ya = Lr(e.modules, "postTransformNode"), Ka = e.delimiters;
            var r, i, a = [],
                o = !1 !== e.preserveWhitespace,
                s = e.whitespace,
                c = !1,
                u = !1;

            function l(t) {
                if (f(t), c || t.processed || (t = yo(t, e)), a.length || t === r || r.if && (t.elseif || t.else) && bo(r, {
                        exp: t.elseif,
                        block: t
                    }), i && !t.forbidden)
                    if (t.elseif || t.else) ! function(t, e) {
                        var n = function(t) {
                            var e = t.length;
                            for (; e--;) {
                                if (1 === t[e].type) return t[e];
                                t.pop()
                            }
                        }(e.children);
                        n && n.if && bo(n, {
                            exp: t.elseif,
                            block: t
                        })
                    }(t, i);
                    else {
                        if (t.slotScope) {
                            var n = t.slotTarget || '"default"';
                            (i.scopedSlots || (i.scopedSlots = {}))[n] = t
                        }
                        i.children.push(t), t.parent = i
                    } t.children = t.children.filter(function(t) {
                    return !t.slotScope
                }), f(t), t.pre && (c = !1), Za(t.tag) && (u = !1);
                for (var o = 0; o < Ya.length; o++) Ya[o](t, e)
            }

            function f(t) {
                if (!u)
                    for (var e;
                        (e = t.children[t.children.length - 1]) && 3 === e.type && " " === e.text;) t.children.pop()
            }
            return function(t, e) {
                for (var n, r, i = [], a = e.expectHTML, o = e.isUnaryTag || N, s = e.canBeLeftOpenTag || N, c = 0; t;) {
                    if (n = t, r && Fa(r)) {
                        var u = 0,
                            l = r.toLowerCase(),
                            f = Ua[l] || (Ua[l] = new RegExp("([\\s\\S]*?)(</" + l + "[^>]*>)", "i")),
                            d = t.replace(f, function(t, n, r) {
                                return u = r.length, Fa(l) || "noscript" === l || (n = n.replace(/<!\--([\s\S]*?)-->/g, "$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g, "$1")), Ga(l, n) && (n = n.slice(1)), e.chars && e.chars(n), ""
                            });
                        c += t.length - d.length, t = d, k(l, c - u, c)
                    } else {
                        var p = t.indexOf("<");
                        if (0 === p) {
                            if (Da.test(t)) {
                                var v = t.indexOf("--\x3e");
                                if (v >= 0) {
                                    e.shouldKeepComment && e.comment(t.substring(4, v), c, c + v + 3), w(v + 3);
                                    continue
                                }
                            }
                            if (ja.test(t)) {
                                var h = t.indexOf("]>");
                                if (h >= 0) {
                                    w(h + 2);
                                    continue
                                }
                            }
                            var m = t.match(Ra);
                            if (m) {
                                w(m[0].length);
                                continue
                            }
                            var g = t.match(Ia);
                            if (g) {
                                var y = c;
                                w(g[0].length), k(g[1], y, c);
                                continue
                            }
                            var _ = T();
                            if (_) {
                                S(_), Ga(_.tagName, t) && w(1);
                                continue
                            }
                        }
                        var b = void 0,
                            C = void 0,
                            x = void 0;
                        if (p >= 0) {
                            for (C = t.slice(p); !(Ia.test(C) || Na.test(C) || Da.test(C) || ja.test(C) || (x = C.indexOf("<", 1)) < 0);) p += x, C = t.slice(p);
                            b = t.substring(0, p)
                        }
                        p < 0 && (b = t), b && w(b.length), e.chars && b && e.chars(b, c - b.length, c)
                    }
                    if (t === n) {
                        e.chars && e.chars(t);
                        break
                    }
                }

                function w(e) {
                    c += e, t = t.substring(e)
                }

                function T() {
                    var e = t.match(Na);
                    if (e) {
                        var n, r, i = {
                            tagName: e[1],
                            attrs: [],
                            start: c
                        };
                        for (w(e[0].length); !(n = t.match(La)) && (r = t.match(Ea) || t.match(Oa));) r.start = c, w(r[0].length), r.end = c, i.attrs.push(r);
                        if (n) return i.unarySlash = n[1], w(n[0].length), i.end = c, i
                    }
                }

                function S(t) {
                    var n = t.tagName,
                        c = t.unarySlash;
                    a && ("p" === r && Aa(n) && k(r), s(n) && r === n && k(n));
                    for (var u = o(n) || !!c, l = t.attrs.length, f = new Array(l), d = 0; d < l; d++) {
                        var p = t.attrs[d],
                            v = p[3] || p[4] || p[5] || "",
                            h = "a" === n && "href" === p[1] ? e.shouldDecodeNewlinesForHref : e.shouldDecodeNewlines;
                        f[d] = {
                            name: p[1],
                            value: za(v, h)
                        }
                    }
                    u || (i.push({
                        tag: n,
                        lowerCasedTag: n.toLowerCase(),
                        attrs: f,
                        start: t.start,
                        end: t.end
                    }), r = n), e.start && e.start(n, f, u, t.start, t.end)
                }

                function k(t, n, a) {
                    var o, s;
                    if (null == n && (n = c), null == a && (a = c), t)
                        for (s = t.toLowerCase(), o = i.length - 1; o >= 0 && i[o].lowerCasedTag !== s; o--);
                    else o = 0;
                    if (o >= 0) {
                        for (var u = i.length - 1; u >= o; u--) e.end && e.end(i[u].tag, n, a);
                        i.length = o, r = o && i[o - 1].tag
                    } else "br" === s ? e.start && e.start(t, [], !0, n, a) : "p" === s && (e.start && e.start(t, [], !1, n, a), e.end && e.end(t, n, a))
                }
                k()
            }(t, {
                warn: qa,
                expectHTML: e.expectHTML,
                isUnaryTag: e.isUnaryTag,
                canBeLeftOpenTag: e.canBeLeftOpenTag,
                shouldDecodeNewlines: e.shouldDecodeNewlines,
                shouldDecodeNewlinesForHref: e.shouldDecodeNewlinesForHref,
                shouldKeepComment: e.comments,
                outputSourceRange: e.outputSourceRange,
                start: function(t, n, o, s, f) {
                    var d = i && i.ns || to(t);
                    Z && "svg" === d && (n = function(t) {
                        for (var e = [], n = 0; n < t.length; n++) {
                            var r = t[n];
                            wo.test(r.name) || (r.name = r.name.replace(To, ""), e.push(r))
                        }
                        return e
                    }(n));
                    var p = mo(t, n, i);
                    d && (p.ns = d),
                        function(t) {
                            return "style" === t.tag || "script" === t.tag && (!t.attrsMap.type || "text/javascript" === t.attrsMap.type)
                        }(p) && !ot() && (p.forbidden = !0);
                    for (var v = 0; v < Ja.length; v++) p = Ja[v](p, e) || p;
                    c || (! function(t) {
                        null != Hr(t, "v-pre") && (t.pre = !0)
                    }(p), p.pre && (c = !0)), Za(p.tag) && (u = !0), c ? function(t) {
                        var e = t.attrsList,
                            n = e.length;
                        if (n)
                            for (var r = t.attrs = new Array(n), i = 0; i < n; i++) r[i] = {
                                name: e[i].name,
                                value: JSON.stringify(e[i].value)
                            }, null != e[i].start && (r[i].start = e[i].start, r[i].end = e[i].end);
                        else t.pre || (t.plain = !0)
                    }(p) : p.processed || (_o(p), function(t) {
                        var e = Hr(t, "v-if");
                        if (e) t.if = e, bo(t, {
                            exp: e,
                            block: t
                        });
                        else {
                            null != Hr(t, "v-else") && (t.else = !0);
                            var n = Hr(t, "v-else-if");
                            n && (t.elseif = n)
                        }
                    }(p), function(t) {
                        null != Hr(t, "v-once") && (t.once = !0)
                    }(p)), r || (r = p), o ? l(p) : (i = p, a.push(p))
                },
                end: function(t, e, n) {
                    var r = a[a.length - 1];
                    a.length -= 1, i = a[a.length - 1], l(r)
                },
                chars: function(t, e, n) {
                    if (i && (!Z || "textarea" !== i.tag || i.attrsMap.placeholder !== t)) {
                        var r, a, l = i.children;
                        if (t = u || t.trim() ? function(t) {
                                return "script" === t.tag || "style" === t.tag
                            }(i) ? t : vo(t) : l.length ? s ? "condense" === s && fo.test(t) ? "" : " " : o ? " " : "" : "") u || "condense" !== s || (t = t.replace(po, " ")), !c && " " !== t && (r = Ca(t, Ka)) ? a = {
                            type: 2,
                            expression: r.expression,
                            tokens: r.tokens,
                            text: t
                        } : " " === t && l.length && " " === l[l.length - 1].text || (a = {
                            type: 3,
                            text: t
                        }), a && l.push(a)
                    }
                },
                comment: function(t, e, n) {
                    if (i) {
                        var r = {
                            type: 3,
                            text: t,
                            isComment: !0
                        };
                        0, i.children.push(r)
                    }
                }
            }), r
        }

        function yo(t, e) {
            ! function(t) {
                var e = Vr(t, "key");
                if (e) {
                    t.key = e
                }
            }(t), t.plain = !t.key && !t.scopedSlots && !t.attrsList.length,
                function(t) {
                    var e = Vr(t, "ref");
                    e && (t.ref = e, t.refInFor = function(t) {
                        var e = t;
                        for (; e;) {
                            if (void 0 !== e.for) return !0;
                            e = e.parent
                        }
                        return !1
                    }(t))
                }(t),
                function(t) {
                    var e;
                    "template" === t.tag ? (e = Hr(t, "scope"), t.slotScope = e || Hr(t, "slot-scope")) : (e = Hr(t, "slot-scope")) && (t.slotScope = e);
                    var n = Vr(t, "slot");
                    n && (t.slotTarget = '""' === n ? '"default"' : n, t.slotTargetDynamic = !(!t.attrsMap[":slot"] && !t.attrsMap["v-bind:slot"]), "template" === t.tag || t.slotScope || Rr(t, "slot", n, Br(t, "slot")));
                    if ("template" === t.tag) {
                        var r = Wr(t, lo);
                        if (r) {
                            0;
                            var i = Co(r),
                                a = i.name,
                                o = i.dynamic;
                            t.slotTarget = a, t.slotTargetDynamic = o, t.slotScope = r.value || ho
                        }
                    } else {
                        var s = Wr(t, lo);
                        if (s) {
                            0;
                            var c = t.scopedSlots || (t.scopedSlots = {}),
                                u = Co(s),
                                l = u.name,
                                f = u.dynamic,
                                d = c[l] = mo("template", [], t);
                            d.slotTarget = l, d.slotTargetDynamic = f, d.children = t.children.filter(function(t) {
                                if (!t.slotScope) return t.parent = d, !0
                            }), d.slotScope = s.value || ho, t.children = [], t.plain = !1
                        }
                    }
                }(t),
                function(t) {
                    "slot" === t.tag && (t.slotName = Vr(t, "name"))
                }(t),
                function(t) {
                    var e;
                    (e = Vr(t, "is")) && (t.component = e);
                    null != Hr(t, "inline-template") && (t.inlineTemplate = !0)
                }(t);
            for (var n = 0; n < Xa.length; n++) t = Xa[n](t, e) || t;
            return function(t) {
                var e, n, r, i, a, o, s, c, u = t.attrsList;
                for (e = 0, n = u.length; e < n; e++) {
                    if (r = i = u[e].name, a = u[e].value, no.test(r))
                        if (t.hasBindings = !0, (o = xo(r.replace(no, ""))) && (r = r.replace(uo, "")), co.test(r)) r = r.replace(co, ""), a = Pr(a), (c = oo.test(r)) && (r = r.slice(1, -1)), o && (o.prop && !c && "innerHtml" === (r = T(r)) && (r = "innerHTML"), o.camel && !c && (r = T(r)), o.sync && (s = qr(a, "$event"), c ? Ur(t, '"update:"+(' + r + ")", s, null, !1, 0, u[e], !0) : (Ur(t, "update:" + T(r), s, null, !1, 0, u[e]), $(r) !== T(r) && Ur(t, "update:" + $(r), s, null, !1, 0, u[e])))), o && o.prop || !t.component && Qa(t.tag, t.attrsMap.type, r) ? Ir(t, r, a, u[e], c) : Rr(t, r, a, u[e], c);
                        else if (eo.test(r)) r = r.replace(eo, ""), (c = oo.test(r)) && (r = r.slice(1, -1)), Ur(t, r, a, o, !1, 0, u[e], c);
                    else {
                        var l = (r = r.replace(no, "")).match(so),
                            f = l && l[1];
                        c = !1, f && (r = r.slice(0, -(f.length + 1)), oo.test(f) && (f = f.slice(1, -1), c = !0)), jr(t, r, i, a, f, c, o, u[e])
                    } else Rr(t, r, JSON.stringify(a), u[e]), !t.component && "muted" === r && Qa(t.tag, t.attrsMap.type, r) && Ir(t, r, "true", u[e])
                }
            }(t), t
        }

        function _o(t) {
            var e;
            if (e = Hr(t, "v-for")) {
                var n = function(t) {
                    var e = t.match(ro);
                    if (!e) return;
                    var n = {};
                    n.for = e[2].trim();
                    var r = e[1].trim().replace(ao, ""),
                        i = r.match(io);
                    i ? (n.alias = r.replace(io, "").trim(), n.iterator1 = i[1].trim(), i[2] && (n.iterator2 = i[2].trim())) : n.alias = r;
                    return n
                }(e);
                n && E(t, n)
            }
        }

        function bo(t, e) {
            t.ifConditions || (t.ifConditions = []), t.ifConditions.push(e)
        }

        function Co(t) {
            var e = t.name.replace(lo, "");
            return e || "#" !== t.name[0] && (e = "default"), oo.test(e) ? {
                name: e.slice(1, -1),
                dynamic: !0
            } : {
                name: '"' + e + '"',
                dynamic: !1
            }
        }

        function xo(t) {
            var e = t.match(uo);
            if (e) {
                var n = {};
                return e.forEach(function(t) {
                    n[t.slice(1)] = !0
                }), n
            }
        }
        var wo = /^xmlns:NS\d+/,
            To = /^NS\d+:/;

        function So(t) {
            return mo(t.tag, t.attrsList.slice(), t.parent)
        }
        var ko = [xa, Ta, {
            preTransformNode: function(t, e) {
                if ("input" === t.tag) {
                    var n, r = t.attrsMap;
                    if (!r["v-model"]) return;
                    if ((r[":type"] || r["v-bind:type"]) && (n = Vr(t, "type")), r.type || n || !r["v-bind"] || (n = "(" + r["v-bind"] + ").type"), n) {
                        var i = Hr(t, "v-if", !0),
                            a = i ? "&&(" + i + ")" : "",
                            o = null != Hr(t, "v-else", !0),
                            s = Hr(t, "v-else-if", !0),
                            c = So(t);
                        _o(c), Dr(c, "type", "checkbox"), yo(c, e), c.processed = !0, c.if = "(" + n + ")==='checkbox'" + a, bo(c, {
                            exp: c.if,
                            block: c
                        });
                        var u = So(t);
                        Hr(u, "v-for", !0), Dr(u, "type", "radio"), yo(u, e), bo(c, {
                            exp: "(" + n + ")==='radio'" + a,
                            block: u
                        });
                        var l = So(t);
                        return Hr(l, "v-for", !0), Dr(l, ":type", n), yo(l, e), bo(c, {
                            exp: i,
                            block: l
                        }), o ? c.else = !0 : s && (c.elseif = s), c
                    }
                }
            }
        }];
        var $o, Ao, Oo = {
                expectHTML: !0,
                modules: ko,
                directives: {
                    model: function(t, e, n) {
                        n;
                        var r = e.value,
                            i = e.modifiers,
                            a = t.tag,
                            o = t.attrsMap.type;
                        if (t.component) return zr(t, r, i), !1;
                        if ("select" === a) ! function(t, e, n) {
                            var r = 'var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return ' + (n && n.number ? "_n(val)" : "val") + "});";
                            r = r + " " + qr(e, "$event.target.multiple ? $$selectedVal : $$selectedVal[0]"), Ur(t, "change", r, null, !0)
                        }(t, r, i);
                        else if ("input" === a && "checkbox" === o) ! function(t, e, n) {
                            var r = n && n.number,
                                i = Vr(t, "value") || "null",
                                a = Vr(t, "true-value") || "true",
                                o = Vr(t, "false-value") || "false";
                            Ir(t, "checked", "Array.isArray(" + e + ")?_i(" + e + "," + i + ")>-1" + ("true" === a ? ":(" + e + ")" : ":_q(" + e + "," + a + ")")), Ur(t, "change", "var $$a=" + e + ",$$el=$event.target,$$c=$$el.checked?(" + a + "):(" + o + ");if(Array.isArray($$a)){var $$v=" + (r ? "_n(" + i + ")" : i) + ",$$i=_i($$a,$$v);if($$el.checked){$$i<0&&(" + qr(e, "$$a.concat([$$v])") + ")}else{$$i>-1&&(" + qr(e, "$$a.slice(0,$$i).concat($$a.slice($$i+1))") + ")}}else{" + qr(e, "$$c") + "}", null, !0)
                        }(t, r, i);
                        else if ("input" === a && "radio" === o) ! function(t, e, n) {
                            var r = n && n.number,
                                i = Vr(t, "value") || "null";
                            Ir(t, "checked", "_q(" + e + "," + (i = r ? "_n(" + i + ")" : i) + ")"), Ur(t, "change", qr(e, i), null, !0)
                        }(t, r, i);
                        else if ("input" === a || "textarea" === a) ! function(t, e, n) {
                            var r = t.attrsMap.type,
                                i = n || {},
                                a = i.lazy,
                                o = i.number,
                                s = i.trim,
                                c = !a && "range" !== r,
                                u = a ? "change" : "range" === r ? ti : "input",
                                l = "$event.target.value";
                            s && (l = "$event.target.value.trim()"), o && (l = "_n(" + l + ")");
                            var f = qr(e, l);
                            c && (f = "if($event.target.composing)return;" + f), Ir(t, "value", "(" + e + ")"), Ur(t, u, f, null, !0), (s || o) && Ur(t, "blur", "$forceUpdate()")
                        }(t, r, i);
                        else if (!B.isReservedTag(a)) return zr(t, r, i), !1;
                        return !0
                    },
                    text: function(t, e) {
                        e.value && Ir(t, "textContent", "_s(" + e.value + ")", e)
                    },
                    html: function(t, e) {
                        e.value && Ir(t, "innerHTML", "_s(" + e.value + ")", e)
                    }
                },
                isPreTag: function(t) {
                    return "pre" === t
                },
                isUnaryTag: ka,
                mustUseProp: Dn,
                canBeLeftOpenTag: $a,
                isReservedTag: Qn,
                getTagNamespace: tr,
                staticKeys: function(t) {
                    return t.reduce(function(t, e) {
                        return t.concat(e.staticKeys || [])
                    }, []).join(",")
                }(ko)
            },
            Eo = x(function(t) {
                return m("type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap" + (t ? "," + t : ""))
            });

        function Po(t, e) {
            t && ($o = Eo(e.staticKeys || ""), Ao = e.isReservedTag || N, function t(e) {
                e.static = function(t) {
                    if (2 === t.type) return !1;
                    if (3 === t.type) return !0;
                    return !(!t.pre && (t.hasBindings || t.if || t.for || g(t.tag) || !Ao(t.tag) || function(t) {
                        for (; t.parent;) {
                            if ("template" !== (t = t.parent).tag) return !1;
                            if (t.for) return !0
                        }
                        return !1
                    }(t) || !Object.keys(t).every($o)))
                }(e);
                if (1 === e.type) {
                    if (!Ao(e.tag) && "slot" !== e.tag && null == e.attrsMap["inline-template"]) return;
                    for (var n = 0, r = e.children.length; n < r; n++) {
                        var i = e.children[n];
                        t(i), i.static || (e.static = !1)
                    }
                    if (e.ifConditions)
                        for (var a = 1, o = e.ifConditions.length; a < o; a++) {
                            var s = e.ifConditions[a].block;
                            t(s), s.static || (e.static = !1)
                        }
                }
            }(t), function t(e, n) {
                if (1 === e.type) {
                    if ((e.static || e.once) && (e.staticInFor = n), e.static && e.children.length && (1 !== e.children.length || 3 !== e.children[0].type)) return void(e.staticRoot = !0);
                    if (e.staticRoot = !1, e.children)
                        for (var r = 0, i = e.children.length; r < i; r++) t(e.children[r], n || !!e.for);
                    if (e.ifConditions)
                        for (var a = 1, o = e.ifConditions.length; a < o; a++) t(e.ifConditions[a].block, n)
                }
            }(t, !1))
        }
        var Mo = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/,
            No = /\([^)]*?\);*$/,
            Lo = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/,
            Io = {
                esc: 27,
                tab: 9,
                enter: 13,
                space: 32,
                up: 38,
                left: 37,
                right: 39,
                down: 40,
                delete: [8, 46]
            },
            Ro = {
                esc: ["Esc", "Escape"],
                tab: "Tab",
                enter: "Enter",
                space: [" ", "Spacebar"],
                up: ["Up", "ArrowUp"],
                left: ["Left", "ArrowLeft"],
                right: ["Right", "ArrowRight"],
                down: ["Down", "ArrowDown"],
                delete: ["Backspace", "Delete", "Del"]
            },
            Do = function(t) {
                return "if(" + t + ")return null;"
            },
            jo = {
                stop: "$event.stopPropagation();",
                prevent: "$event.preventDefault();",
                self: Do("$event.target !== $event.currentTarget"),
                ctrl: Do("!$event.ctrlKey"),
                shift: Do("!$event.shiftKey"),
                alt: Do("!$event.altKey"),
                meta: Do("!$event.metaKey"),
                left: Do("'button' in $event && $event.button !== 0"),
                middle: Do("'button' in $event && $event.button !== 1"),
                right: Do("'button' in $event && $event.button !== 2")
            };

        function Fo(t, e) {
            var n = e ? "nativeOn:" : "on:",
                r = "",
                i = "";
            for (var a in t) {
                var o = Uo(t[a]);
                t[a] && t[a].dynamic ? i += a + "," + o + "," : r += '"' + a + '":' + o + ","
            }
            return r = "{" + r.slice(0, -1) + "}", i ? n + "_d(" + r + ",[" + i.slice(0, -1) + "])" : n + r
        }

        function Uo(t) {
            if (!t) return "function(){}";
            if (Array.isArray(t)) return "[" + t.map(function(t) {
                return Uo(t)
            }).join(",") + "]";
            var e = Lo.test(t.value),
                n = Mo.test(t.value),
                r = Lo.test(t.value.replace(No, ""));
            if (t.modifiers) {
                var i = "",
                    a = "",
                    o = [];
                for (var s in t.modifiers)
                    if (jo[s]) a += jo[s], Io[s] && o.push(s);
                    else if ("exact" === s) {
                    var c = t.modifiers;
                    a += Do(["ctrl", "shift", "alt", "meta"].filter(function(t) {
                        return !c[t]
                    }).map(function(t) {
                        return "$event." + t + "Key"
                    }).join("||"))
                } else o.push(s);
                return o.length && (i += function(t) {
                    return "if(!$event.type.indexOf('key')&&" + t.map(Bo).join("&&") + ")return null;"
                }(o)), a && (i += a), "function($event){" + i + (e ? "return " + t.value + "($event)" : n ? "return (" + t.value + ")($event)" : r ? "return " + t.value : t.value) + "}"
            }
            return e || n ? t.value : "function($event){" + (r ? "return " + t.value : t.value) + "}"
        }

        function Bo(t) {
            var e = parseInt(t, 10);
            if (e) return "$event.keyCode!==" + e;
            var n = Io[t],
                r = Ro[t];
            return "_k($event.keyCode," + JSON.stringify(t) + "," + JSON.stringify(n) + ",$event.key," + JSON.stringify(r) + ")"
        }
        var Vo = {
                on: function(t, e) {
                    t.wrapListeners = function(t) {
                        return "_g(" + t + "," + e.value + ")"
                    }
                },
                bind: function(t, e) {
                    t.wrapData = function(n) {
                        return "_b(" + n + ",'" + t.tag + "'," + e.value + "," + (e.modifiers && e.modifiers.prop ? "true" : "false") + (e.modifiers && e.modifiers.sync ? ",true" : "") + ")"
                    }
                },
                cloak: M
            },
            Ho = function(t) {
                this.options = t, this.warn = t.warn || Nr, this.transforms = Lr(t.modules, "transformCode"), this.dataGenFns = Lr(t.modules, "genData"), this.directives = E(E({}, Vo), t.directives);
                var e = t.isReservedTag || N;
                this.maybeComponent = function(t) {
                    return !!t.component || !e(t.tag)
                }, this.onceId = 0, this.staticRenderFns = [], this.pre = !1
            };

        function Wo(t, e) {
            var n = new Ho(e);
            return {
                render: "with(this){return " + (t ? Go(t, n) : '_c("div")') + "}",
                staticRenderFns: n.staticRenderFns
            }
        }

        function Go(t, e) {
            if (t.parent && (t.pre = t.pre || t.parent.pre), t.staticRoot && !t.staticProcessed) return zo(t, e);
            if (t.once && !t.onceProcessed) return qo(t, e);
            if (t.for && !t.forProcessed) return Xo(t, e);
            if (t.if && !t.ifProcessed) return Ko(t, e);
            if ("template" !== t.tag || t.slotTarget || e.pre) {
                if ("slot" === t.tag) return function(t, e) {
                    var n = t.slotName || '"default"',
                        r = Qo(t, e),
                        i = "_t(" + n + (r ? "," + r : ""),
                        a = t.attrs || t.dynamicAttrs ? ns((t.attrs || []).concat(t.dynamicAttrs || []).map(function(t) {
                            return {
                                name: T(t.name),
                                value: t.value,
                                dynamic: t.dynamic
                            }
                        })) : null,
                        o = t.attrsMap["v-bind"];
                    !a && !o || r || (i += ",null");
                    a && (i += "," + a);
                    o && (i += (a ? "" : ",null") + "," + o);
                    return i + ")"
                }(t, e);
                var n;
                if (t.component) n = function(t, e, n) {
                    var r = e.inlineTemplate ? null : Qo(e, n, !0);
                    return "_c(" + t + "," + Jo(e, n) + (r ? "," + r : "") + ")"
                }(t.component, t, e);
                else {
                    var r;
                    (!t.plain || t.pre && e.maybeComponent(t)) && (r = Jo(t, e));
                    var i = t.inlineTemplate ? null : Qo(t, e, !0);
                    n = "_c('" + t.tag + "'" + (r ? "," + r : "") + (i ? "," + i : "") + ")"
                }
                for (var a = 0; a < e.transforms.length; a++) n = e.transforms[a](t, n);
                return n
            }
            return Qo(t, e) || "void 0"
        }

        function zo(t, e) {
            t.staticProcessed = !0;
            var n = e.pre;
            return t.pre && (e.pre = t.pre), e.staticRenderFns.push("with(this){return " + Go(t, e) + "}"), e.pre = n, "_m(" + (e.staticRenderFns.length - 1) + (t.staticInFor ? ",true" : "") + ")"
        }

        function qo(t, e) {
            if (t.onceProcessed = !0, t.if && !t.ifProcessed) return Ko(t, e);
            if (t.staticInFor) {
                for (var n = "", r = t.parent; r;) {
                    if (r.for) {
                        n = r.key;
                        break
                    }
                    r = r.parent
                }
                return n ? "_o(" + Go(t, e) + "," + e.onceId++ + "," + n + ")" : Go(t, e)
            }
            return zo(t, e)
        }

        function Ko(t, e, n, r) {
            return t.ifProcessed = !0,
                function t(e, n, r, i) {
                    if (!e.length) return i || "_e()";
                    var a = e.shift();
                    return a.exp ? "(" + a.exp + ")?" + o(a.block) + ":" + t(e, n, r, i) : "" + o(a.block);

                    function o(t) {
                        return r ? r(t, n) : t.once ? qo(t, n) : Go(t, n)
                    }
                }(t.ifConditions.slice(), e, n, r)
        }

        function Xo(t, e, n, r) {
            var i = t.for,
                a = t.alias,
                o = t.iterator1 ? "," + t.iterator1 : "",
                s = t.iterator2 ? "," + t.iterator2 : "";
            return t.forProcessed = !0, (r || "_l") + "((" + i + "),function(" + a + o + s + "){return " + (n || Go)(t, e) + "})"
        }

        function Jo(t, e) {
            var n = "{",
                r = function(t, e) {
                    var n = t.directives;
                    if (!n) return;
                    var r, i, a, o, s = "directives:[",
                        c = !1;
                    for (r = 0, i = n.length; r < i; r++) {
                        a = n[r], o = !0;
                        var u = e.directives[a.name];
                        u && (o = !!u(t, a, e.warn)), o && (c = !0, s += '{name:"' + a.name + '",rawName:"' + a.rawName + '"' + (a.value ? ",value:(" + a.value + "),expression:" + JSON.stringify(a.value) : "") + (a.arg ? ",arg:" + (a.isDynamicArg ? a.arg : '"' + a.arg + '"') : "") + (a.modifiers ? ",modifiers:" + JSON.stringify(a.modifiers) : "") + "},")
                    }
                    if (c) return s.slice(0, -1) + "]"
                }(t, e);
            r && (n += r + ","), t.key && (n += "key:" + t.key + ","), t.ref && (n += "ref:" + t.ref + ","), t.refInFor && (n += "refInFor:true,"), t.pre && (n += "pre:true,"), t.component && (n += 'tag:"' + t.tag + '",');
            for (var i = 0; i < e.dataGenFns.length; i++) n += e.dataGenFns[i](t);
            if (t.attrs && (n += "attrs:" + ns(t.attrs) + ","), t.props && (n += "domProps:" + ns(t.props) + ","), t.events && (n += Fo(t.events, !1) + ","), t.nativeEvents && (n += Fo(t.nativeEvents, !0) + ","), t.slotTarget && !t.slotScope && (n += "slot:" + t.slotTarget + ","), t.scopedSlots && (n += function(t, e, n) {
                    var r = t.for || Object.keys(e).some(function(t) {
                            var n = e[t];
                            return n.slotTargetDynamic || n.if || n.for || Yo(n)
                        }),
                        i = !!t.if;
                    if (!r)
                        for (var a = t.parent; a;) {
                            if (a.slotScope && a.slotScope !== ho || a.for) {
                                r = !0;
                                break
                            }
                            a.if && (i = !0), a = a.parent
                        }
                    var o = Object.keys(e).map(function(t) {
                        return Zo(e[t], n)
                    }).join(",");
                    return "scopedSlots:_u([" + o + "]" + (r ? ",null,true" : "") + (!r && i ? ",null,false," + function(t) {
                        var e = 5381,
                            n = t.length;
                        for (; n;) e = 33 * e ^ t.charCodeAt(--n);
                        return e >>> 0
                    }(o) : "") + ")"
                }(t, t.scopedSlots, e) + ","), t.model && (n += "model:{value:" + t.model.value + ",callback:" + t.model.callback + ",expression:" + t.model.expression + "},"), t.inlineTemplate) {
                var a = function(t, e) {
                    var n = t.children[0];
                    0;
                    if (n && 1 === n.type) {
                        var r = Wo(n, e.options);
                        return "inlineTemplate:{render:function(){" + r.render + "},staticRenderFns:[" + r.staticRenderFns.map(function(t) {
                            return "function(){" + t + "}"
                        }).join(",") + "]}"
                    }
                }(t, e);
                a && (n += a + ",")
            }
            return n = n.replace(/,$/, "") + "}", t.dynamicAttrs && (n = "_b(" + n + ',"' + t.tag + '",' + ns(t.dynamicAttrs) + ")"), t.wrapData && (n = t.wrapData(n)), t.wrapListeners && (n = t.wrapListeners(n)), n
        }

        function Yo(t) {
            return 1 === t.type && ("slot" === t.tag || t.children.some(Yo))
        }

        function Zo(t, e) {
            var n = t.attrsMap["slot-scope"];
            if (t.if && !t.ifProcessed && !n) return Ko(t, e, Zo, "null");
            if (t.for && !t.forProcessed) return Xo(t, e, Zo);
            var r = t.slotScope === ho ? "" : String(t.slotScope),
                i = "function(" + r + "){return " + ("template" === t.tag ? t.if && n ? "(" + t.if+")?" + (Qo(t, e) || "undefined") + ":undefined" : Qo(t, e) || "undefined" : Go(t, e)) + "}",
                a = r ? "" : ",proxy:true";
            return "{key:" + (t.slotTarget || '"default"') + ",fn:" + i + a + "}"
        }

        function Qo(t, e, n, r, i) {
            var a = t.children;
            if (a.length) {
                var o = a[0];
                if (1 === a.length && o.for && "template" !== o.tag && "slot" !== o.tag) {
                    var s = n ? e.maybeComponent(o) ? ",1" : ",0" : "";
                    return "" + (r || Go)(o, e) + s
                }
                var c = n ? function(t, e) {
                        for (var n = 0, r = 0; r < t.length; r++) {
                            var i = t[r];
                            if (1 === i.type) {
                                if (ts(i) || i.ifConditions && i.ifConditions.some(function(t) {
                                        return ts(t.block)
                                    })) {
                                    n = 2;
                                    break
                                }(e(i) || i.ifConditions && i.ifConditions.some(function(t) {
                                    return e(t.block)
                                })) && (n = 1)
                            }
                        }
                        return n
                    }(a, e.maybeComponent) : 0,
                    u = i || es;
                return "[" + a.map(function(t) {
                    return u(t, e)
                }).join(",") + "]" + (c ? "," + c : "")
            }
        }

        function ts(t) {
            return void 0 !== t.for || "template" === t.tag || "slot" === t.tag
        }

        function es(t, e) {
            return 1 === t.type ? Go(t, e) : 3 === t.type && t.isComment ? function(t) {
                return "_e(" + JSON.stringify(t.text) + ")"
            }(t) : function(t) {
                return "_v(" + (2 === t.type ? t.expression : rs(JSON.stringify(t.text))) + ")"
            }(t)
        }

        function ns(t) {
            for (var e = "", n = "", r = 0; r < t.length; r++) {
                var i = t[r],
                    a = rs(i.value);
                i.dynamic ? n += i.name + "," + a + "," : e += '"' + i.name + '":' + a + ","
            }
            return e = "{" + e.slice(0, -1) + "}", n ? "_d(" + e + ",[" + n.slice(0, -1) + "])" : e
        }

        function rs(t) {
            return t.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029")
        }
        new RegExp("\\b" + "do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b") + "\\b"), new RegExp("\\b" + "delete,typeof,void".split(",").join("\\s*\\([^\\)]*\\)|\\b") + "\\s*\\([^\\)]*\\)");

        function is(t, e) {
            try {
                return new Function(t)
            } catch (n) {
                return e.push({
                    err: n,
                    code: t
                }), M
            }
        }

        function as(t) {
            var e = Object.create(null);
            return function(n, r, i) {
                (r = E({}, r)).warn;
                delete r.warn;
                var a = r.delimiters ? String(r.delimiters) + n : n;
                if (e[a]) return e[a];
                var o = t(n, r);
                var s = {},
                    c = [];
                return s.render = is(o.render, c), s.staticRenderFns = o.staticRenderFns.map(function(t) {
                    return is(t, c)
                }), e[a] = s
            }
        }
        var os, ss = function(t) {
                return function(e) {
                    function n(n, r) {
                        var i = Object.create(e),
                            a = [],
                            o = [],
                            s = function(t, e, n) {
                                (n ? o : a).push(t)
                            };
                        if (r)
                            for (var c in r.modules && (i.modules = (e.modules || []).concat(r.modules)), r.directives && (i.directives = E(Object.create(e.directives || null), r.directives)), r) "modules" !== c && "directives" !== c && (i[c] = r[c]);
                        i.warn = s;
                        var u = t(n.trim(), i);
                        return u.errors = a, u.tips = o, u
                    }
                    return {
                        compile: n,
                        compileToFunctions: as(n)
                    }
                }
            }(function(t, e) {
                var n = go(t.trim(), e);
                !1 !== e.optimize && Po(n, e);
                var r = Wo(n, e);
                return {
                    ast: n,
                    render: r.render,
                    staticRenderFns: r.staticRenderFns
                }
            })(Oo),
            cs = (ss.compile, ss.compileToFunctions);

        function us(t) {
            return (os = os || document.createElement("div")).innerHTML = t ? '<a href="\n"/>' : '<div a="\n"/>', os.innerHTML.indexOf("&#10;") > 0
        }
        var ls = !!K && us(!1),
            fs = !!K && us(!0),
            ds = x(function(t) {
                var e = rr(t);
                return e && e.innerHTML
            }),
            ps = $n.prototype.$mount;
        $n.prototype.$mount = function(t, e) {
            if ((t = t && rr(t)) === document.body || t === document.documentElement) return this;
            var n = this.$options;
            if (!n.render) {
                var r = n.template;
                if (r)
                    if ("string" == typeof r) "#" === r.charAt(0) && (r = ds(r));
                    else {
                        if (!r.nodeType) return this;
                        r = r.innerHTML
                    }
                else t && (r = function(t) {
                    if (t.outerHTML) return t.outerHTML;
                    var e = document.createElement("div");
                    return e.appendChild(t.cloneNode(!0)), e.innerHTML
                }(t));
                if (r) {
                    0;
                    var i = cs(r, {
                            outputSourceRange: !1,
                            shouldDecodeNewlines: ls,
                            shouldDecodeNewlinesForHref: fs,
                            delimiters: n.delimiters,
                            comments: n.comments
                        }, this),
                        a = i.render,
                        o = i.staticRenderFns;
                    n.render = a, n.staticRenderFns = o
                }
            }
            return ps.call(this, t, e)
        }, $n.compile = cs, e.a = $n
    }).call(e, n(0), n(7).setImmediate)
}, function(t, e, n) {
    (function(t) {
        var r = void 0 !== t && t || "undefined" != typeof self && self || window,
            i = Function.prototype.apply;

        function a(t, e) {
            this._id = t, this._clearFn = e
        }
        e.setTimeout = function() {
            return new a(i.call(setTimeout, r, arguments), clearTimeout)
        }, e.setInterval = function() {
            return new a(i.call(setInterval, r, arguments), clearInterval)
        }, e.clearTimeout = e.clearInterval = function(t) {
            t && t.close()
        }, a.prototype.unref = a.prototype.ref = function() {}, a.prototype.close = function() {
            this._clearFn.call(r, this._id)
        }, e.enroll = function(t, e) {
            clearTimeout(t._idleTimeoutId), t._idleTimeout = e
        }, e.unenroll = function(t) {
            clearTimeout(t._idleTimeoutId), t._idleTimeout = -1
        }, e._unrefActive = e.active = function(t) {
            clearTimeout(t._idleTimeoutId);
            var e = t._idleTimeout;
            e >= 0 && (t._idleTimeoutId = setTimeout(function() {
                t._onTimeout && t._onTimeout()
            }, e))
        }, n(8), e.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== t && t.setImmediate || this && this.setImmediate, e.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== t && t.clearImmediate || this && this.clearImmediate
    }).call(e, n(0))
}, function(t, e, n) {
    (function(t, e) {
        ! function(t, n) {
            "use strict";
            if (!t.setImmediate) {
                var r, i = 1,
                    a = {},
                    o = !1,
                    s = t.document,
                    c = Object.getPrototypeOf && Object.getPrototypeOf(t);
                c = c && c.setTimeout ? c : t, "[object process]" === {}.toString.call(t.process) ? r = function(t) {
                    e.nextTick(function() {
                        l(t)
                    })
                } : function() {
                    if (t.postMessage && !t.importScripts) {
                        var e = !0,
                            n = t.onmessage;
                        return t.onmessage = function() {
                            e = !1
                        }, t.postMessage("", "*"), t.onmessage = n, e
                    }
                }() ? function() {
                    var e = "setImmediate$" + Math.random() + "$",
                        n = function(n) {
                            n.source === t && "string" == typeof n.data && 0 === n.data.indexOf(e) && l(+n.data.slice(e.length))
                        };
                    t.addEventListener ? t.addEventListener("message", n, !1) : t.attachEvent("onmessage", n), r = function(n) {
                        t.postMessage(e + n, "*")
                    }
                }() : t.MessageChannel ? function() {
                    var t = new MessageChannel;
                    t.port1.onmessage = function(t) {
                        l(t.data)
                    }, r = function(e) {
                        t.port2.postMessage(e)
                    }
                }() : s && "onreadystatechange" in s.createElement("script") ? function() {
                    var t = s.documentElement;
                    r = function(e) {
                        var n = s.createElement("script");
                        n.onreadystatechange = function() {
                            l(e), n.onreadystatechange = null, t.removeChild(n), n = null
                        }, t.appendChild(n)
                    }
                }() : r = function(t) {
                    setTimeout(l, 0, t)
                }, c.setImmediate = function(t) {
                    "function" != typeof t && (t = new Function("" + t));
                    for (var e = new Array(arguments.length - 1), n = 0; n < e.length; n++) e[n] = arguments[n + 1];
                    var o = {
                        callback: t,
                        args: e
                    };
                    return a[i] = o, r(i), i++
                }, c.clearImmediate = u
            }

            function u(t) {
                delete a[t]
            }

            function l(t) {
                if (o) setTimeout(l, 0, t);
                else {
                    var e = a[t];
                    if (e) {
                        o = !0;
                        try {
                            ! function(t) {
                                var e = t.callback,
                                    r = t.args;
                                switch (r.length) {
                                    case 0:
                                        e();
                                        break;
                                    case 1:
                                        e(r[0]);
                                        break;
                                    case 2:
                                        e(r[0], r[1]);
                                        break;
                                    case 3:
                                        e(r[0], r[1], r[2]);
                                        break;
                                    default:
                                        e.apply(n, r)
                                }
                            }(e)
                        } finally {
                            u(t), o = !1
                        }
                    }
                }
            }
        }("undefined" == typeof self ? void 0 === t ? this : t : self)
    }).call(e, n(0), n(9))
}, function(t, e) {
    var n, r, i = t.exports = {};

    function a() {
        throw new Error("setTimeout has not been defined")
    }

    function o() {
        throw new Error("clearTimeout has not been defined")
    }

    function s(t) {
        if (n === setTimeout) return setTimeout(t, 0);
        if ((n === a || !n) && setTimeout) return n = setTimeout, setTimeout(t, 0);
        try {
            return n(t, 0)
        } catch (e) {
            try {
                return n.call(null, t, 0)
            } catch (e) {
                return n.call(this, t, 0)
            }
        }
    }! function() {
        try {
            n = "function" == typeof setTimeout ? setTimeout : a
        } catch (t) {
            n = a
        }
        try {
            r = "function" == typeof clearTimeout ? clearTimeout : o
        } catch (t) {
            r = o
        }
    }();
    var c, u = [],
        l = !1,
        f = -1;

    function d() {
        l && c && (l = !1, c.length ? u = c.concat(u) : f = -1, u.length && p())
    }

    function p() {
        if (!l) {
            var t = s(d);
            l = !0;
            for (var e = u.length; e;) {
                for (c = u, u = []; ++f < e;) c && c[f].run();
                f = -1, e = u.length
            }
            c = null, l = !1,
                function(t) {
                    if (r === clearTimeout) return clearTimeout(t);
                    if ((r === o || !r) && clearTimeout) return r = clearTimeout, clearTimeout(t);
                    try {
                        r(t)
                    } catch (e) {
                        try {
                            return r.call(null, t)
                        } catch (e) {
                            return r.call(this, t)
                        }
                    }
                }(t)
        }
    }

    function v(t, e) {
        this.fun = t, this.array = e
    }

    function h() {}
    i.nextTick = function(t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
        u.push(new v(t, e)), 1 !== u.length || l || s(p)
    }, v.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = h, i.addListener = h, i.once = h, i.off = h, i.removeListener = h, i.removeAllListeners = h, i.emit = h, i.prependListener = h, i.prependOnceListener = h, i.listeners = function(t) {
        return []
    }, i.binding = function(t) {
        throw new Error("process.binding is not supported")
    }, i.cwd = function() {
        return "/"
    }, i.chdir = function(t) {
        throw new Error("process.chdir is not supported")
    }, i.umask = function() {
        return 0
    }
}, function(t, e, n) {
    /*!
     * vue-carousel v0.6.14
     * (c) 2018 todd.beauchamp@ssense.com
     * https://github.com/ssense/vue-carousel#readme
     */
    ! function(e, n) {
        t.exports = n()
    }(0, function() {
        return function(t) {
            function e(r) {
                if (n[r]) return n[r].exports;
                var i = n[r] = {
                    exports: {},
                    id: r,
                    loaded: !1
                };
                return t[r].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports
            }
            var n = {};
            return e.m = t, e.c = n, e.p = "", e(0)
        }([function(t, e, n) {
            "use strict";

            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Slide = e.Carousel = void 0;
            var i = r(n(1)),
                a = r(n(41));
            e.default = {
                install: function(t) {
                    t.component("carousel", i.default), t.component("slide", a.default)
                }
            }, e.Carousel = i.default, e.Slide = a.default
        }, function(t, e, n) {
            var r = n(7)(n(8), n(46), function(t) {
                n(2)
            }, null, null);
            t.exports = r.exports
        }, function(t, e, n) {
            var r = n(3);
            "string" == typeof r && (r = [
                [t.id, r, ""]
            ]), r.locals && (t.exports = r.locals), n(5)("80564c20", r, !0, {})
        }, function(t, e, n) {
            (t.exports = n(4)()).push([t.id, ".VueCarousel{position:relative}.VueCarousel-wrapper{width:100%;position:relative;overflow:hidden}.VueCarousel-inner{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-webkit-backface-visibility:hidden;backface-visibility:hidden}", ""])
        }, function(t, e) {
            t.exports = function() {
                var t = [];
                return t.toString = function() {
                    for (var t = [], e = 0; e < this.length; e++) {
                        var n = this[e];
                        n[2] ? t.push("@media " + n[2] + "{" + n[1] + "}") : t.push(n[1])
                    }
                    return t.join("")
                }, t.i = function(e, n) {
                    "string" == typeof e && (e = [
                        [null, e, ""]
                    ]);
                    for (var r = {}, i = 0; i < this.length; i++) {
                        var a = this[i][0];
                        "number" == typeof a && (r[a] = !0)
                    }
                    for (i = 0; i < e.length; i++) {
                        var o = e[i];
                        "number" == typeof o[0] && r[o[0]] || (n && !o[2] ? o[2] = n : n && (o[2] = "(" + o[2] + ") and (" + n + ")"), t.push(o))
                    }
                }, t
            }
        }, function(t, e, n) {
            function r(t) {
                for (var e = 0; e < t.length; e++) {
                    var n = t[e],
                        r = u[n.id];
                    if (r) {
                        r.refs++;
                        for (var i = 0; i < r.parts.length; i++) r.parts[i](n.parts[i]);
                        for (; i < n.parts.length; i++) r.parts.push(a(n.parts[i]));
                        r.parts.length > n.parts.length && (r.parts.length = n.parts.length)
                    } else {
                        var o = [];
                        for (i = 0; i < n.parts.length; i++) o.push(a(n.parts[i]));
                        u[n.id] = {
                            id: n.id,
                            refs: 1,
                            parts: o
                        }
                    }
                }
            }

            function i() {
                var t = document.createElement("style");
                return t.type = "text/css", l.appendChild(t), t
            }

            function a(t) {
                var e, n, r = document.querySelector("style[" + m + '~="' + t.id + '"]');
                if (r) {
                    if (p) return v;
                    r.parentNode.removeChild(r)
                }
                if (g) {
                    var a = d++;
                    r = f || (f = i()), e = o.bind(null, r, a, !1), n = o.bind(null, r, a, !0)
                } else r = i(), e = function(t, e) {
                    var n = e.css,
                        r = e.media,
                        i = e.sourceMap;
                    if (r && t.setAttribute("media", r), h.ssrId && t.setAttribute(m, e.id), i && (n += "\n/*# sourceURL=" + i.sources[0] + " */", n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i)))) + " */"), t.styleSheet) t.styleSheet.cssText = n;
                    else {
                        for (; t.firstChild;) t.removeChild(t.firstChild);
                        t.appendChild(document.createTextNode(n))
                    }
                }.bind(null, r), n = function() {
                    r.parentNode.removeChild(r)
                };
                return e(t),
                    function(r) {
                        if (r) {
                            if (r.css === t.css && r.media === t.media && r.sourceMap === t.sourceMap) return;
                            e(t = r)
                        } else n()
                    }
            }

            function o(t, e, n, r) {
                var i = n ? "" : r.css;
                if (t.styleSheet) t.styleSheet.cssText = y(e, i);
                else {
                    var a = document.createTextNode(i),
                        o = t.childNodes;
                    o[e] && t.removeChild(o[e]), o.length ? t.insertBefore(a, o[e]) : t.appendChild(a)
                }
            }
            var s = "undefined" != typeof document,
                c = n(6),
                u = {},
                l = s && (document.head || document.getElementsByTagName("head")[0]),
                f = null,
                d = 0,
                p = !1,
                v = function() {},
                h = null,
                m = "data-vue-ssr-id",
                g = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());
            t.exports = function(t, e, n, i) {
                p = n, h = i || {};
                var a = c(t, e);
                return r(a),
                    function(e) {
                        for (var n = [], i = 0; i < a.length; i++) {
                            var o = a[i];
                            (s = u[o.id]).refs--, n.push(s)
                        }
                        e ? r(a = c(t, e)) : a = [];
                        for (i = 0; i < n.length; i++) {
                            var s;
                            if (0 === (s = n[i]).refs) {
                                for (var l = 0; l < s.parts.length; l++) s.parts[l]();
                                delete u[s.id]
                            }
                        }
                    }
            };
            var y = function() {
                var t = [];
                return function(e, n) {
                    return t[e] = n, t.filter(Boolean).join("\n")
                }
            }()
        }, function(t, e) {
            t.exports = function(t, e) {
                for (var n = [], r = {}, i = 0; i < e.length; i++) {
                    var a = e[i],
                        o = a[0],
                        s = {
                            id: t + ":" + i,
                            css: a[1],
                            media: a[2],
                            sourceMap: a[3]
                        };
                    r[o] ? r[o].parts.push(s) : n.push(r[o] = {
                        id: o,
                        parts: [s]
                    })
                }
                return n
            }
        }, function(t, e) {
            t.exports = function(t, e, n, r, i) {
                var a, o = t = t || {},
                    s = typeof t.default;
                "object" !== s && "function" !== s || (a = t, o = t.default);
                var c, u = "function" == typeof o ? o.options : o;
                if (e && (u.render = e.render, u.staticRenderFns = e.staticRenderFns), r && (u._scopeId = r), i ? (c = function(t) {
                        (t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__), n && n.call(this, t), t && t._registeredComponents && t._registeredComponents.add(i)
                    }, u._ssrRegister = c) : n && (c = n), c) {
                    var l = u.functional,
                        f = l ? u.render : u.beforeCreate;
                    l ? u.render = function(t, e) {
                        return c.call(e), f(t, e)
                    } : u.beforeCreate = f ? [].concat(f, c) : [c]
                }
                return {
                    esModule: a,
                    exports: o,
                    options: u
                }
            }
        }, function(t, e, n) {
            "use strict";

            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = r(n(9)),
                a = r(n(29)),
                o = r(n(30)),
                s = r(n(31)),
                c = r(n(36)),
                u = r(n(41));
            e.default = {
                name: "carousel",
                beforeUpdate: function() {
                    this.computeCarouselWidth()
                },
                components: {
                    Navigation: s.default,
                    Pagination: c.default,
                    Slide: u.default
                },
                data: function() {
                    return {
                        browserWidth: null,
                        carouselWidth: null,
                        currentPage: 0,
                        dragging: !1,
                        dragMomentum: 0,
                        dragOffset: 0,
                        dragStartY: 0,
                        dragStartX: 0,
                        isTouch: "undefined" != typeof window && "ontouchstart" in window,
                        offset: 0,
                        refreshRate: 16,
                        slideCount: 0
                    }
                },
                mixins: [a.default],
                props: {
                    easing: {
                        type: String,
                        default: "ease"
                    },
                    minSwipeDistance: {
                        type: Number,
                        default: 8
                    },
                    navigationClickTargetSize: {
                        type: Number,
                        default: 8
                    },
                    mouseDrag: {
                        type: Boolean,
                        default: !0
                    },
                    navigationEnabled: {
                        type: Boolean,
                        default: !1
                    },
                    navigationNextLabel: {
                        type: String,
                        default: "▶"
                    },
                    navigationPrevLabel: {
                        type: String,
                        default: "◀"
                    },
                    paginationActiveColor: {
                        type: String,
                        default: "#000000"
                    },
                    paginationColor: {
                        type: String,
                        default: "#efefef"
                    },
                    paginationEnabled: {
                        type: Boolean,
                        default: !0
                    },
                    paginationPadding: {
                        type: Number,
                        default: 10
                    },
                    paginationSize: {
                        type: Number,
                        default: 10
                    },
                    perPage: {
                        type: Number,
                        default: 2
                    },
                    perPageCustom: {
                        type: Array
                    },
                    resistanceCoef: {
                        type: Number,
                        default: 20
                    },
                    scrollPerPage: {
                        type: Boolean,
                        default: !0
                    },
                    speed: {
                        type: Number,
                        default: 500
                    },
                    loop: {
                        type: Boolean,
                        default: !1
                    },
                    navigateTo: {
                        type: Number,
                        default: 0
                    },
                    spacePadding: {
                        type: Number,
                        default: 0
                    }
                },
                watch: {
                    navigateTo: function(t) {
                        t !== this.currentPage && this.goToPage(t)
                    },
                    currentPage: function(t) {
                        this.$emit("pageChange", t)
                    }
                },
                computed: {
                    breakpointSlidesPerPage: function() {
                        if (!this.perPageCustom) return this.perPage;
                        var t = this.perPageCustom,
                            e = this.browserWidth,
                            n = t.sort(function(t, e) {
                                return t[0] > e[0] ? -1 : 1
                            }).filter(function(t) {
                                return e >= t[0]
                            });
                        return n[0] && n[0][1] || this.perPage
                    },
                    canAdvanceForward: function() {
                        return this.loop || this.offset < this.maxOffset
                    },
                    canAdvanceBackward: function() {
                        return this.loop || this.currentPage > 0
                    },
                    currentPerPage: function() {
                        return !this.perPageCustom || this.$isServer ? this.perPage : this.breakpointSlidesPerPage
                    },
                    currentOffset: function() {
                        return -1 * (this.offset + this.dragOffset)
                    },
                    isHidden: function() {
                        return this.carouselWidth <= 0
                    },
                    maxOffset: function() {
                        return this.slideWidth * this.slideCount - this.carouselWidth + 2 * this.spacePadding
                    },
                    pageCount: function() {
                        return this.scrollPerPage ? Math.ceil(this.slideCount / this.currentPerPage) : this.slideCount
                    },
                    slideWidth: function() {
                        return (this.carouselWidth - 2 * this.spacePadding) / Math.min(this.currentPerPage, this.slideCount)
                    },
                    transitionStyle: function() {
                        return this.speed / 1e3 + "s " + this.easing + " transform"
                    },
                    padding: function() {
                        var t = this.spacePadding;
                        return t > 0 && t
                    }
                },
                methods: {
                    getNextPage: function() {
                        return this.currentPage < this.pageCount - 1 ? this.currentPage + 1 : this.loop ? 0 : this.currentPage
                    },
                    getPreviousPage: function() {
                        return this.currentPage > 0 ? this.currentPage - 1 : this.loop ? this.pageCount - 1 : this.currentPage
                    },
                    advancePage: function(t) {
                        t && "backward" === t && this.canAdvanceBackward ? this.goToPage(this.getPreviousPage(), "navigation") : (!t || t && "backward" !== t) && this.canAdvanceForward && this.goToPage(this.getNextPage(), "navigation")
                    },
                    attachMutationObserver: function() {
                        var t = this,
                            e = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                        if (e) {
                            this.mutationObserver = new e(function() {
                                t.$nextTick(function() {
                                    t.computeCarouselWidth()
                                })
                            }), this.$parent.$el && this.mutationObserver.observe(this.$parent.$el, {
                                attributes: !0,
                                data: !0
                            })
                        }
                    },
                    handleNavigation: function(t) {
                        this.advancePage(t)
                    },
                    detachMutationObserver: function() {
                        this.mutationObserver && this.mutationObserver.disconnect()
                    },
                    getBrowserWidth: function() {
                        return this.browserWidth = window.innerWidth, this.browserWidth
                    },
                    getCarouselWidth: function() {
                        var t = this.$refs["VueCarousel-inner"];
                        return this.carouselWidth = t && t.clientWidth || 0, this.carouselWidth
                    },
                    getSlideCount: function() {
                        this.slideCount = this.$slots && this.$slots.default && this.$slots.default.filter(function(t) {
                            return t.tag && t.tag.indexOf("slide") > -1
                        }).length || 0
                    },
                    goToPage: function(t) {
                        t >= 0 && t <= this.pageCount && (this.offset = this.scrollPerPage ? Math.min(this.slideWidth * this.currentPerPage * t, this.maxOffset) : Math.min(this.slideWidth * t, this.maxOffset), this.currentPage = t)
                    },
                    onStart: function(t) {
                        document.addEventListener(this.isTouch ? "touchend" : "mouseup", this.onEnd, !0), document.addEventListener(this.isTouch ? "touchmove" : "mousemove", this.onDrag, !0), this.startTime = t.timeStamp, this.dragging = !0, this.dragStartX = this.isTouch ? t.touches[0].clientX : t.clientX, this.dragStartY = this.isTouch ? t.touches[0].clientY : t.clientY
                    },
                    onEnd: function(t) {
                        var e = this.isTouch ? t.changedTouches[0].clientX : t.clientX,
                            n = this.dragStartX - e;
                        if (this.dragMomentum = n / (t.timeStamp - this.startTime), 0 !== this.minSwipeDistance && Math.abs(n) >= this.minSwipeDistance) {
                            var r = this.scrollPerPage ? this.slideWidth * this.currentPerPage : this.slideWidth;
                            this.dragOffset = this.dragOffset + (0, i.default)(n) * (r / 2)
                        }
                        this.offset += this.dragOffset, this.dragOffset = 0, this.dragging = !1, this.render(), document.removeEventListener(this.isTouch ? "touchend" : "mouseup", this.onEnd, !0), document.removeEventListener(this.isTouch ? "touchmove" : "mousemove", this.onDrag, !0)
                    },
                    onDrag: function(t) {
                        var e = this.isTouch ? t.touches[0].clientX : t.clientX,
                            n = this.isTouch ? t.touches[0].clientY : t.clientY,
                            r = this.dragStartX - e,
                            i = this.dragStartY - n;
                        if (!(this.isTouch && Math.abs(r) < Math.abs(i))) {
                            t.preventDefault(), t.stopImmediatePropagation(), this.dragOffset = r;
                            var a = this.offset + this.dragOffset;
                            a < 0 ? this.dragOffset = -Math.sqrt(-this.resistanceCoef * this.dragOffset) : a > this.maxOffset && (this.dragOffset = Math.sqrt(this.resistanceCoef * this.dragOffset))
                        }
                    },
                    onResize: function() {
                        var t = this;
                        this.computeCarouselWidth(), this.dragging = !0, this.render(), setTimeout(function() {
                            t.dragging = !1
                        }, this.refreshRate)
                    },
                    render: function() {
                        this.offset += Math.max(1 - this.currentPerPage, Math.min(Math.round(this.dragMomentum), this.currentPerPage - 1)) * this.slideWidth;
                        var t = this.scrollPerPage ? this.slideWidth * this.currentPerPage : this.slideWidth;
                        this.offset = t * Math.round(this.offset / t), this.offset = Math.max(0, Math.min(this.offset, this.maxOffset)), this.currentPage = this.scrollPerPage ? Math.round(this.offset / this.slideWidth / this.currentPerPage) : Math.round(this.offset / this.slideWidth)
                    },
                    computeCarouselWidth: function() {
                        this.getSlideCount(), this.getBrowserWidth(), this.getCarouselWidth(), this.setCurrentPageInBounds()
                    },
                    setCurrentPageInBounds: function() {
                        if (!this.canAdvanceForward && this.scrollPerPage) {
                            var t = this.pageCount - 1;
                            this.currentPage = t >= 0 ? t : 0, this.offset = Math.max(0, Math.min(this.offset, this.maxOffset))
                        }
                    }
                },
                mounted: function() {
                    this.$isServer || (window.addEventListener("resize", (0, o.default)(this.onResize, this.refreshRate)), (this.isTouch || this.mouseDrag) && this.$refs["VueCarousel-wrapper"].addEventListener(this.isTouch ? "touchstart" : "mousedown", this.onStart)), this.attachMutationObserver(), this.computeCarouselWidth()
                },
                beforeDestroy: function() {
                    this.$isServer || (this.detachMutationObserver(), window.removeEventListener("resize", this.getBrowserWidth), this.$refs["VueCarousel-wrapper"].removeEventListener(this.isTouch ? "touchstart" : "mousedown", this.onStart))
                }
            }
        }, function(t, e, n) {
            t.exports = {
                default: n(10),
                __esModule: !0
            }
        }, function(t, e, n) {
            n(11), t.exports = n(14).Math.sign
        }, function(t, e, n) {
            var r = n(12);
            r(r.S, "Math", {
                sign: n(28)
            })
        }, function(t, e, n) {
            var r = n(13),
                i = n(14),
                a = n(15),
                o = n(17),
                s = n(27),
                c = "prototype",
                u = function(t, e, n) {
                    var l, f, d, p = t & u.F,
                        v = t & u.G,
                        h = t & u.S,
                        m = t & u.P,
                        g = t & u.B,
                        y = t & u.W,
                        _ = v ? i : i[e] || (i[e] = {}),
                        b = _[c],
                        C = v ? r : h ? r[e] : (r[e] || {})[c];
                    for (l in v && (n = e), n)(f = !p && C && void 0 !== C[l]) && s(_, l) || (d = f ? C[l] : n[l], _[l] = v && "function" != typeof C[l] ? n[l] : g && f ? a(d, r) : y && C[l] == d ? function(t) {
                        var e = function(e, n, r) {
                            if (this instanceof t) {
                                switch (arguments.length) {
                                    case 0:
                                        return new t;
                                    case 1:
                                        return new t(e);
                                    case 2:
                                        return new t(e, n)
                                }
                                return new t(e, n, r)
                            }
                            return t.apply(this, arguments)
                        };
                        return e[c] = t[c], e
                    }(d) : m && "function" == typeof d ? a(Function.call, d) : d, m && ((_.virtual || (_.virtual = {}))[l] = d, t & u.R && b && !b[l] && o(b, l, d)))
                };
            u.F = 1, u.G = 2, u.S = 4, u.P = 8, u.B = 16, u.W = 32, u.U = 64, u.R = 128, t.exports = u
        }, function(t, e) {
            var n = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
            "number" == typeof __g && (__g = n)
        }, function(t, e) {
            var n = t.exports = {
                version: "2.5.4"
            };
            "number" == typeof __e && (__e = n)
        }, function(t, e, n) {
            var r = n(16);
            t.exports = function(t, e, n) {
                if (r(t), void 0 === e) return t;
                switch (n) {
                    case 1:
                        return function(n) {
                            return t.call(e, n)
                        };
                    case 2:
                        return function(n, r) {
                            return t.call(e, n, r)
                        };
                    case 3:
                        return function(n, r, i) {
                            return t.call(e, n, r, i)
                        }
                }
                return function() {
                    return t.apply(e, arguments)
                }
            }
        }, function(t, e) {
            t.exports = function(t) {
                if ("function" != typeof t) throw TypeError(t + " is not a function!");
                return t
            }
        }, function(t, e, n) {
            var r = n(18),
                i = n(26);
            t.exports = n(22) ? function(t, e, n) {
                return r.f(t, e, i(1, n))
            } : function(t, e, n) {
                return t[e] = n, t
            }
        }, function(t, e, n) {
            var r = n(19),
                i = n(21),
                a = n(25),
                o = Object.defineProperty;
            e.f = n(22) ? Object.defineProperty : function(t, e, n) {
                if (r(t), e = a(e, !0), r(n), i) try {
                    return o(t, e, n)
                } catch (t) {}
                if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
                return "value" in n && (t[e] = n.value), t
            }
        }, function(t, e, n) {
            var r = n(20);
            t.exports = function(t) {
                if (!r(t)) throw TypeError(t + " is not an object!");
                return t
            }
        }, function(t, e) {
            t.exports = function(t) {
                return "object" == typeof t ? null !== t : "function" == typeof t
            }
        }, function(t, e, n) {
            t.exports = !n(22) && !n(23)(function() {
                return 7 != Object.defineProperty(n(24)("div"), "a", {
                    get: function() {
                        return 7
                    }
                }).a
            })
        }, function(t, e, n) {
            t.exports = !n(23)(function() {
                return 7 != Object.defineProperty({}, "a", {
                    get: function() {
                        return 7
                    }
                }).a
            })
        }, function(t, e) {
            t.exports = function(t) {
                try {
                    return !!t()
                } catch (t) {
                    return !0
                }
            }
        }, function(t, e, n) {
            var r = n(20),
                i = n(13).document,
                a = r(i) && r(i.createElement);
            t.exports = function(t) {
                return a ? i.createElement(t) : {}
            }
        }, function(t, e, n) {
            var r = n(20);
            t.exports = function(t, e) {
                if (!r(t)) return t;
                var n, i;
                if (e && "function" == typeof(n = t.toString) && !r(i = n.call(t))) return i;
                if ("function" == typeof(n = t.valueOf) && !r(i = n.call(t))) return i;
                if (!e && "function" == typeof(n = t.toString) && !r(i = n.call(t))) return i;
                throw TypeError("Can't convert object to primitive value")
            }
        }, function(t, e) {
            t.exports = function(t, e) {
                return {
                    enumerable: !(1 & t),
                    configurable: !(2 & t),
                    writable: !(4 & t),
                    value: e
                }
            }
        }, function(t, e) {
            var n = {}.hasOwnProperty;
            t.exports = function(t, e) {
                return n.call(t, e)
            }
        }, function(t, e) {
            t.exports = Math.sign || function(t) {
                return 0 == (t = +t) || t != t ? t : t < 0 ? -1 : 1
            }
        }, function(t, e) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var n = {
                props: {
                    autoplay: {
                        type: Boolean,
                        default: !1
                    },
                    autoplayTimeout: {
                        type: Number,
                        default: 2e3
                    },
                    autoplayHoverPause: {
                        type: Boolean,
                        default: !0
                    }
                },
                data: function() {
                    return {
                        autoplayInterval: null
                    }
                },
                destroyed: function() {
                    this.$isServer || (this.$el.removeEventListener("mouseenter", this.pauseAutoplay), this.$el.removeEventListener("mouseleave", this.startAutoplay))
                },
                methods: {
                    pauseAutoplay: function() {
                        this.autoplayInterval && (this.autoplayInterval = clearInterval(this.autoplayInterval))
                    },
                    startAutoplay: function() {
                        this.autoplay && (this.autoplayInterval = setInterval(this.advancePage, this.autoplayTimeout))
                    }
                },
                mounted: function() {
                    !this.$isServer && this.autoplayHoverPause && (this.$el.addEventListener("mouseenter", this.pauseAutoplay), this.$el.addEventListener("mouseleave", this.startAutoplay)), this.startAutoplay()
                }
            };
            e.default = n
        }, function(t, e) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            e.default = function(t, e, n) {
                var r = void 0;
                return function() {
                    var i = void 0,
                        a = n && !r;
                    clearTimeout(r), r = setTimeout(function() {
                        r = null, n || t.apply(i)
                    }, e), a && t.apply(i)
                }
            }
        }, function(t, e, n) {
            var r = n(7)(n(34), n(35), function(t) {
                n(32)
            }, "data-v-7fed18e9", null);
            t.exports = r.exports
        }, function(t, e, n) {
            var r = n(33);
            "string" == typeof r && (r = [
                [t.id, r, ""]
            ]), r.locals && (t.exports = r.locals), n(5)("a1957e6c", r, !0, {})
        }, function(t, e, n) {
            (t.exports = n(4)()).push([t.id, ".VueCarousel-navigation-button[data-v-7fed18e9]{position:absolute;top:50%;box-sizing:border-box;color:#000;text-decoration:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:none;background-color:transparent;padding:0;cursor:pointer;outline:none}.VueCarousel-navigation-next[data-v-7fed18e9]{right:0;transform:translateY(-50%) translateX(100%)}.VueCarousel-navigation-prev[data-v-7fed18e9]{left:0;transform:translateY(-50%) translateX(-100%)}.VueCarousel-navigation--disabled[data-v-7fed18e9]{opacity:.5;cursor:default}", ""])
        }, function(t, e) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = {
                name: "navigation",
                data: function() {
                    return {
                        parentContainer: this.$parent
                    }
                },
                props: {
                    clickTargetSize: {
                        type: Number,
                        default: 8
                    },
                    nextLabel: {
                        type: String,
                        default: "▶"
                    },
                    prevLabel: {
                        type: String,
                        default: "◀"
                    }
                },
                computed: {
                    canAdvanceForward: function() {
                        return this.parentContainer.canAdvanceForward || !1
                    },
                    canAdvanceBackward: function() {
                        return this.parentContainer.canAdvanceBackward || !1
                    }
                },
                methods: {
                    triggerPageAdvance: function(t) {
                        this.$emit("navigationclick", t)
                    }
                }
            }
        }, function(t, e) {
            t.exports = {
                render: function() {
                    var t = this,
                        e = t.$createElement,
                        n = t._self._c || e;
                    return n("div", {
                        staticClass: "VueCarousel-navigation"
                    }, [n("button", {
                        staticClass: "VueCarousel-navigation-button VueCarousel-navigation-prev",
                        class: {
                            "VueCarousel-navigation--disabled": !t.canAdvanceBackward
                        },
                        style: "padding: " + t.clickTargetSize + "px; margin-right: -" + t.clickTargetSize + "px;",
                        attrs: {
                            type: "button",
                            "aria-label": "Previous page",
                            role: "button"
                        },
                        domProps: {
                            innerHTML: t._s(t.prevLabel)
                        },
                        on: {
                            click: function(e) {
                                e.preventDefault(), t.triggerPageAdvance("backward")
                            }
                        }
                    }), t._v(" "), n("button", {
                        staticClass: "VueCarousel-navigation-button VueCarousel-navigation-next",
                        class: {
                            "VueCarousel-navigation--disabled": !t.canAdvanceForward
                        },
                        style: "padding: " + t.clickTargetSize + "px; margin-left: -" + t.clickTargetSize + "px;",
                        attrs: {
                            type: "button",
                            "aria-label": "Next page",
                            role: "button"
                        },
                        domProps: {
                            innerHTML: t._s(t.nextLabel)
                        },
                        on: {
                            click: function(e) {
                                e.preventDefault(), t.triggerPageAdvance()
                            }
                        }
                    })])
                },
                staticRenderFns: []
            }
        }, function(t, e, n) {
            var r = n(7)(n(39), n(40), function(t) {
                n(37)
            }, "data-v-7e42136f", null);
            t.exports = r.exports
        }, function(t, e, n) {
            var r = n(38);
            "string" == typeof r && (r = [
                [t.id, r, ""]
            ]), r.locals && (t.exports = r.locals), n(5)("3ea8dd5f", r, !0, {})
        }, function(t, e, n) {
            (t.exports = n(4)()).push([t.id, ".VueCarousel-pagination[data-v-7e42136f]{width:100%;text-align:center}.VueCarousel-dot-container[data-v-7e42136f]{display:inline-block;margin:0 auto;padding:0}.VueCarousel-dot[data-v-7e42136f]{display:inline-block;cursor:pointer}.VueCarousel-dot-button[data-v-7e42136f]{-webkit-appearance:none;-moz-appearance:none;appearance:none;border:none;background-color:transparent;padding:0;border-radius:100%;outline:none;cursor:pointer}.VueCarousel-dot-button[data-v-7e42136f]:focus{outline:1px solid #add8e6}", ""])
        }, function(t, e) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = {
                name: "pagination",
                data: function() {
                    return {
                        parentContainer: this.$parent
                    }
                },
                methods: {
                    goToPage: function(t) {
                        this.$emit("paginationclick", t)
                    },
                    isCurrentDot: function(t) {
                        return t === this.parentContainer.currentPage
                    }
                }
            }
        }, function(t, e) {
            t.exports = {
                render: function() {
                    var t = this,
                        e = t.$createElement,
                        n = t._self._c || e;
                    return n("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: t.parentContainer.pageCount > 1,
                            expression: "parentContainer.pageCount > 1"
                        }],
                        staticClass: "VueCarousel-pagination"
                    }, [n("ul", {
                        staticClass: "VueCarousel-dot-container",
                        attrs: {
                            role: "tablist"
                        }
                    }, t._l(t.parentContainer.pageCount, function(e, r) {
                        return n("li", {
                            key: r,
                            staticClass: "VueCarousel-dot",
                            class: {
                                "VueCarousel-dot--active": t.isCurrentDot(r)
                            },
                            style: "\n        margin-top: " + 2 * t.parentContainer.paginationPadding + "px;\n        padding: " + t.parentContainer.paginationPadding + "px;\n      ",
                            attrs: {
                                "aria-hidden": "false",
                                role: "presentation",
                                "aria-selected": t.isCurrentDot(r) ? "true" : "false"
                            },
                            on: {
                                click: function(e) {
                                    t.goToPage(r)
                                }
                            }
                        }, [n("button", {
                            staticClass: "VueCarousel-dot-button",
                            style: "\n          width: " + t.parentContainer.paginationSize + "px;\n          height: " + t.parentContainer.paginationSize + "px;\n          background: " + (t.isCurrentDot(r) ? t.parentContainer.paginationActiveColor : t.parentContainer.paginationColor) + ";\n        ",
                            attrs: {
                                type: "button",
                                role: "button",
                                tabindex: r
                            }
                        })])
                    }))])
                },
                staticRenderFns: []
            }
        }, function(t, e, n) {
            var r = n(7)(n(44), n(45), function(t) {
                n(42)
            }, null, null);
            t.exports = r.exports
        }, function(t, e, n) {
            var r = n(43);
            "string" == typeof r && (r = [
                [t.id, r, ""]
            ]), r.locals && (t.exports = r.locals), n(5)("e8ab14d8", r, !0, {})
        }, function(t, e, n) {
            (t.exports = n(4)()).push([t.id, ".VueCarousel-slide{-ms-flex-preferred-size:inherit;flex-basis:inherit;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-touch-callout:none;outline:none}", ""])
        }, function(t, e) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = {
                name: "slide",
                data: function() {
                    return {
                        width: null
                    }
                },
                mounted: function() {
                    this.$isServer || this.$el.addEventListener("dragstart", function(t) {
                        return t.preventDefault()
                    })
                }
            }
        }, function(t, e) {
            t.exports = {
                render: function() {
                    var t = this,
                        e = t.$createElement;
                    return (t._self._c || e)("div", {
                        staticClass: "VueCarousel-slide",
                        attrs: {
                            tabindex: "-1"
                        }
                    }, [t._t("default")], 2)
                },
                staticRenderFns: []
            }
        }, function(t, e) {
            t.exports = {
                render: function() {
                    var t = this,
                        e = t.$createElement,
                        n = t._self._c || e;
                    return n("section", {
                        staticClass: "VueCarousel"
                    }, [n("div", {
                        ref: "VueCarousel-wrapper",
                        staticClass: "VueCarousel-wrapper"
                    }, [n("div", {
                        ref: "VueCarousel-inner",
                        staticClass: "VueCarousel-inner",
                        style: "\n        transform: translate3d(" + t.currentOffset + "px, 0, 0);\n        transition: " + (t.dragging ? "none" : t.transitionStyle) + ";\n        ms-flex-preferred-size: " + t.slideWidth + "px;\n        webkit-flex-basis: " + t.slideWidth + "px;\n        flex-basis: " + t.slideWidth + "px;\n        visibility: " + (t.slideWidth ? "visible" : "hidden") + ";\n        padding-left: " + t.padding + "px;\n        padding-right: " + t.padding + "px;\n      ",
                        attrs: {
                            role: "listbox"
                        }
                    }, [t._t("default")], 2)]), t._v(" "), t.paginationEnabled && t.pageCount > 0 ? n("pagination", {
                        on: {
                            paginationclick: function(e) {
                                t.goToPage(e, "pagination")
                            }
                        }
                    }) : t._e(), t._v(" "), t.navigationEnabled ? n("navigation", {
                        attrs: {
                            clickTargetSize: t.navigationClickTargetSize,
                            nextLabel: t.navigationNextLabel,
                            prevLabel: t.navigationPrevLabel
                        },
                        on: {
                            navigationclick: t.handleNavigation
                        }
                    }) : t._e()], 1)
                },
                staticRenderFns: []
            }
        }])
    })
}, function(t, e, n) {
    "use strict";
    var r = n(1),
        i = n(25);
    var a = function(t) {
            n(12)
        },
        o = n(17)(r.a, i.a, !1, a, null, null);
    e.a = o.exports
}, function(t, e, n) {
    var r = n(13);
    "string" == typeof r && (r = [
        [t.i, r, ""]
    ]), r.locals && (t.exports = r.locals);
    n(15)("61207a3a", r, !0, {})
}, function(t, e, n) {
    (e = t.exports = n(14)(!1)).push([t.i, "@import url(https://fonts.googleapis.com/css?family=Roboto);", ""]), e.push([t.i, ":root{--mdc-theme-primary:$color}body{margin:0;background-color:#f5f5f5;font-family:Roboto,Google Sans,sans-serif}.themed{color:#ff9800!important}.wrapper{max-width:500px;margin-left:auto;margin-right:auto}.wrapper.ai-window{padding:1rem}.up{font-size:32px;background-color:#fff;padding:10px;border-radius:50%}.title{vertical-align:middle;text-align:center;font-weight:700;color:rgba(0,0,0,.7);margin-top:30%}.query{padding:16px 0;background-color:#fff;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);z-index:999;position:fixed;width:100%;bottom:0}.queryform{border:0;width:70%;margin-left:60px;font-size:16px;outline:none;color:rgba(0,0,0,.8);font-weight:500}@media screen and (max-width:320px){.queryform{width:65%}}.iicon{margin-left:20px;position:absolute;vertical-align:middle;color:rgba(0,0,0,.8);cursor:pointer;visibility:hidden}.iicon2{margin-left:20px;position:absolute;vertical-align:middle;color:rgba(0,0,0,.8);cursor:pointer}.recording{color:#f44336}.iicon2.t2s{width:20px;height:20px}@media screen and (max-width:720px){.iicon2.t2s{right:10px}}.chat-window{width:100%}.bubble{max-width:100%;background-color:#e1e1e1;padding:16px;border-radius:8px;color:rgba(0,0,0,.7);float:right;animation:msg .25s linear}.bubble.bot{background-color:#fff;float:left;margin-right:10px}td{margin-top:30px;margin-bottom:10px}.mdc-card{background-color:#fff;max-width:300px;margin-bottom:5px;animation:msg .45s ease-in-out;border-radius:8px;box-shadow:0 1px 4px 0 rgba(32,33,36,.28)}.slide{margin:5px}.slide,.slider{max-width:300px}.slider{margin-left:-5px}.mdc-fab{background-color:#fff;color:#ff9800}.rightnav{margin-left:-25px}@media screen and (max-width:720px){.rightnav{margin-left:-25px}}@media screen and (max-width:320px){.rightnav{margin-left:-70px}}.leftnav{margin-right:-25px}@media screen and (max-width:720px){.leftnav{display:none}}.openlink{vertical-align:middle;margin-top:-5px;margin-left:5px}.mdc-card__media-item{height:auto;width:100%;margin-top:-5px}.chips{margin-left:-10px}.suggestion{margin-top:10px;float:left;margin-left:10px;padding:10px;color:rgba(0,0,0,.7);background-color:#fff;border:1.5px solid rgba(0,0,0,.2);border-radius:50px;cursor:pointer;animation:controls .25s linear;text-decoration:none}.suggestion:active{color:#000}.suggestion:hover{color:#ff9800;border:1.5px solid #ff9800}.suggestion.link{color:#fff;background-color:#ff9800;border:1px solid #ff9800}.suggestion.link:active{background-color:#cc7a00;border:1px solid #cc7a00}.mdc-list-item__start-detail{border-radius:50%}@keyframes msg{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes controls{0%{transform:scaleY(0)}to{transform:scaleY(1)}}.copyright{font-weight:600}.copyright,.copyright a{color:rgba(0,0,0,.8);visibility:hidden}.copyright a{text-decoration:none;border-bottom:2px solid transparent}.copyright a:hover{color:#ff9800;border-bottom:2px solid #ff9800;visibility:hidden}.google-chip{margin-top:52px;visibility:hidden}", ""])
}, function(t, e) {
    t.exports = function(t) {
        var e = [];
        return e.toString = function() {
            return this.map(function(e) {
                var n = function(t, e) {
                    var n = t[1] || "",
                        r = t[3];
                    if (!r) return n;
                    if (e && "function" == typeof btoa) {
                        var i = function(t) {
                                return "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(t)))) + " */"
                            }(r),
                            a = r.sources.map(function(t) {
                                return "/*# sourceURL=" + r.sourceRoot + t + " */"
                            });
                        return [n].concat(a).concat([i]).join("\n")
                    }
                    return [n].join("\n")
                }(e, t);
                return e[2] ? "@media " + e[2] + "{" + n + "}" : n
            }).join("")
        }, e.i = function(t, n) {
            "string" == typeof t && (t = [
                [null, t, ""]
            ]);
            for (var r = {}, i = 0; i < this.length; i++) {
                var a = this[i][0];
                "number" == typeof a && (r[a] = !0)
            }
            for (i = 0; i < t.length; i++) {
                var o = t[i];
                "number" == typeof o[0] && r[o[0]] || (n && !o[2] ? o[2] = n : n && (o[2] = "(" + o[2] + ") and (" + n + ")"), e.push(o))
            }
        }, e
    }
}, function(t, e, n) {
    var r = "undefined" != typeof document;
    if ("undefined" != typeof DEBUG && DEBUG && !r) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
    var i = n(16),
        a = {},
        o = r && (document.head || document.getElementsByTagName("head")[0]),
        s = null,
        c = 0,
        u = !1,
        l = function() {},
        f = null,
        d = "data-vue-ssr-id",
        p = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());

    function v(t) {
        for (var e = 0; e < t.length; e++) {
            var n = t[e],
                r = a[n.id];
            if (r) {
                r.refs++;
                for (var i = 0; i < r.parts.length; i++) r.parts[i](n.parts[i]);
                for (; i < n.parts.length; i++) r.parts.push(m(n.parts[i]));
                r.parts.length > n.parts.length && (r.parts.length = n.parts.length)
            } else {
                var o = [];
                for (i = 0; i < n.parts.length; i++) o.push(m(n.parts[i]));
                a[n.id] = {
                    id: n.id,
                    refs: 1,
                    parts: o
                }
            }
        }
    }

    function h() {
        var t = document.createElement("style");
        return t.type = "text/css", o.appendChild(t), t
    }

    function m(t) {
        var e, n, r = document.querySelector("style[" + d + '~="' + t.id + '"]');
        if (r) {
            if (u) return l;
            r.parentNode.removeChild(r)
        }
        if (p) {
            var i = c++;
            r = s || (s = h()), e = y.bind(null, r, i, !1), n = y.bind(null, r, i, !0)
        } else r = h(), e = function(t, e) {
            var n = e.css,
                r = e.media,
                i = e.sourceMap;
            r && t.setAttribute("media", r);
            f.ssrId && t.setAttribute(d, e.id);
            i && (n += "\n/*# sourceURL=" + i.sources[0] + " */", n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i)))) + " */");
            if (t.styleSheet) t.styleSheet.cssText = n;
            else {
                for (; t.firstChild;) t.removeChild(t.firstChild);
                t.appendChild(document.createTextNode(n))
            }
        }.bind(null, r), n = function() {
            r.parentNode.removeChild(r)
        };
        return e(t),
            function(r) {
                if (r) {
                    if (r.css === t.css && r.media === t.media && r.sourceMap === t.sourceMap) return;
                    e(t = r)
                } else n()
            }
    }
    t.exports = function(t, e, n, r) {
        u = n, f = r || {};
        var o = i(t, e);
        return v(o),
            function(e) {
                for (var n = [], r = 0; r < o.length; r++) {
                    var s = o[r];
                    (c = a[s.id]).refs--, n.push(c)
                }
                e ? v(o = i(t, e)) : o = [];
                for (r = 0; r < n.length; r++) {
                    var c;
                    if (0 === (c = n[r]).refs) {
                        for (var u = 0; u < c.parts.length; u++) c.parts[u]();
                        delete a[c.id]
                    }
                }
            }
    };
    var g = function() {
        var t = [];
        return function(e, n) {
            return t[e] = n, t.filter(Boolean).join("\n")
        }
    }();

    function y(t, e, n, r) {
        var i = n ? "" : r.css;
        if (t.styleSheet) t.styleSheet.cssText = g(e, i);
        else {
            var a = document.createTextNode(i),
                o = t.childNodes;
            o[e] && t.removeChild(o[e]), o.length ? t.insertBefore(a, o[e]) : t.appendChild(a)
        }
    }
}, function(t, e) {
    t.exports = function(t, e) {
        for (var n = [], r = {}, i = 0; i < e.length; i++) {
            var a = e[i],
                o = a[0],
                s = {
                    id: t + ":" + i,
                    css: a[1],
                    media: a[2],
                    sourceMap: a[3]
                };
            r[o] ? r[o].parts.push(s) : n.push(r[o] = {
                id: o,
                parts: [s]
            })
        }
        return n
    }
}, function(t, e) {
    t.exports = function(t, e, n, r, i, a) {
        var o, s = t = t || {},
            c = typeof t.default;
        "object" !== c && "function" !== c || (o = t, s = t.default);
        var u, l = "function" == typeof s ? s.options : s;
        if (e && (l.render = e.render, l.staticRenderFns = e.staticRenderFns, l._compiled = !0), n && (l.functional = !0), i && (l._scopeId = i), a ? (u = function(t) {
                (t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__), r && r.call(this, t), t && t._registeredComponents && t._registeredComponents.add(a)
            }, l._ssrRegister = u) : r && (u = r), u) {
            var f = l.functional,
                d = f ? l.render : l.beforeCreate;
            f ? (l._injectStyles = u, l.render = function(t, e) {
                return u.call(e), d(t, e)
            }) : l.beforeCreate = d ? [].concat(d, u) : [u]
        }
        return {
            esModule: o,
            exports: s,
            options: l
        }
    }
}, function(t, e, n) {
    "use strict";
    var r = n(19);
    n.d(e, "a", function() {
        return r.a
    })
}, function(t, e, n) {
    "use strict";
    var r = n(2),
        i = n(3),
        a = n(20),
        o = n(22);
    n(23);
    e.a = class {
        constructor(t) {
            if (!t || !t.accessToken) throw new i.a("Access token is required for new ApiAi.Client instance");
            this.accessToken = t.accessToken, this.apiLang = t.lang || r.a.DEFAULT_CLIENT_LANG, this.apiVersion = t.version || r.a.DEFAULT_API_VERSION, this.apiBaseUrl = t.baseUrl || r.a.DEFAULT_BASE_URL, this.sessionId = t.sessionId || this.guid()
        }
        textRequest(t, e = {}) {
            if (!t) throw new i.a("Query should not be empty");
            return e.query = t, new o.a(this, e).perform()
        }
        eventRequest(t, e = {}, n = {}) {
            if (!t) throw new i.a("Event name can not be empty");
            return n.event = {
                name: t,
                data: e
            }, new a.a(this, n).perform()
        }
        getAccessToken() {
            return this.accessToken
        }
        getApiVersion() {
            return this.apiVersion ? this.apiVersion : r.a.DEFAULT_API_VERSION
        }
        getApiLang() {
            return this.apiLang ? this.apiLang : r.a.DEFAULT_CLIENT_LANG
        }
        getApiBaseUrl() {
            return this.apiBaseUrl ? this.apiBaseUrl : r.a.DEFAULT_BASE_URL
        }
        setSessionId(t) {
            this.sessionId = t
        }
        getSessionId() {
            return this.sessionId
        }
        guid() {
            const t = () => Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
            return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
        }
    }
}, function(t, e, n) {
    "use strict";
    var r = n(4);
    e.a = class extends r.a {}
}, function(t, e, n) {
    "use strict";
    class r {
        static ajax(t, e, n = null, i = null, a = {}) {
            return new Promise((o, s) => {
                const c = r.createXMLHTTPObject();
                let u = e,
                    l = null;
                if (n && t === r.Method.GET) {
                    u += "?";
                    let t = 0;
                    for (const e in n) n.hasOwnProperty(e) && (t++ && (u += "&"), u += encodeURIComponent(e) + "=" + encodeURIComponent(n[e]))
                } else n && (i || (i = {}), i["Content-Type"] = "application/json; charset=utf-8", l = JSON.stringify(n));
                for (const t in a) t in c && (c[t] = a[t]);
                if (c.open(r.Method[t], u, !0), i)
                    for (const t in i) i.hasOwnProperty(t) && c.setRequestHeader(t, i[t]);
                l ? c.send(l) : c.send(), c.onload = (() => {
                    c.status >= 200 && c.status < 300 ? o(c) : s(c)
                }), c.onerror = (() => {
                    s(c)
                })
            })
        }
        static get(t, e = null, n = null, i = {}) {
            return r.ajax(r.Method.GET, t, e, n, i)
        }
        static post(t, e = null, n = null, i = {}) {
            return r.ajax(r.Method.POST, t, e, n, i)
        }
        static put(t, e = null, n = null, i = {}) {
            return r.ajax(r.Method.PUT, t, e, n, i)
        }
        static delete(t, e = null, n = null, i = {}) {
            return r.ajax(r.Method.DELETE, t, e, n, i)
        }
        static createXMLHTTPObject() {
            let t = null;
            for (const e of r.XMLHttpFactories) {
                try {
                    t = e()
                } catch (t) {
                    continue
                }
                break
            }
            return t
        }
    }
    r.XMLHttpFactories = [() => new XMLHttpRequest, () => new window.ActiveXObject("Msxml2.XMLHTTP"), () => new window.ActiveXObject("Msxml3.XMLHTTP"), () => new window.ActiveXObject("Microsoft.XMLHTTP")],
        function(t) {
            let e;
            ! function(t) {
                t[t.GET = "GET"] = "GET", t[t.POST = "POST"] = "POST", t[t.PUT = "PUT"] = "PUT", t[t.DELETE = "DELETE"] = "DELETE"
            }(e = t.Method || (t.Method = {}))
        }(r || (r = {})), e.a = r
}, function(t, e, n) {
    "use strict";
    var r = n(4);
    e.a = class extends r.a {}
}, function(t, e, n) {
    "use strict";
    var r;
    ! function(t) {
        let e, n;
        ! function(t) {
            t[t.ERR_NETWORK = 0] = "ERR_NETWORK", t[t.ERR_AUDIO = 1] = "ERR_AUDIO", t[t.ERR_SERVER = 2] = "ERR_SERVER", t[t.ERR_CLIENT = 3] = "ERR_CLIENT"
        }(e = t.ERROR || (t.ERROR = {})),
        function(t) {
            t[t.MSG_WAITING_MICROPHONE = 0] = "MSG_WAITING_MICROPHONE", t[t.MSG_MEDIA_STREAM_CREATED = 1] = "MSG_MEDIA_STREAM_CREATED", t[t.MSG_INIT_RECORDER = 2] = "MSG_INIT_RECORDER", t[t.MSG_RECORDING = 3] = "MSG_RECORDING", t[t.MSG_SEND = 4] = "MSG_SEND", t[t.MSG_SEND_EMPTY = 5] = "MSG_SEND_EMPTY", t[t.MSG_SEND_EOS_OR_JSON = 6] = "MSG_SEND_EOS_OR_JSON", t[t.MSG_WEB_SOCKET = 7] = "MSG_WEB_SOCKET", t[t.MSG_WEB_SOCKET_OPEN = 8] = "MSG_WEB_SOCKET_OPEN", t[t.MSG_WEB_SOCKET_CLOSE = 9] = "MSG_WEB_SOCKET_CLOSE", t[t.MSG_STOP = 10] = "MSG_STOP", t[t.MSG_CONFIG_CHANGED = 11] = "MSG_CONFIG_CHANGED"
        }(n = t.EVENT || (t.EVENT = {}))
    }(r || (r = {}))
}, function(t, e, n) {
    "use strict";
    e.a = {
        app: {
            token: "ee98efd1d47a480f8cacd4bb2b705c01",
            muted: !1,
            googleIt: !0
        },
        locale: {
            strings: {
                welcomeTitle: "Hello, ask something to get started",
                welcomeDescription: 'You can type "Hello" to start with the menu.',
                offlineTitle: "Oh, no!",
                offlineDescription: "It looks like you are not connected to the internet, this webpage requires internet connection, to process your requests",
                queryTitle: "Ask me something...",
                voiceTitle: "Go ahead, im listening..."
            },
            settings: {
                speechLang: "en-GB",
                recognitionLang: "en-US"
            }
        }
    }
}, function(t, e, n) {
    "use strict";
    var r = {
        render: function() {
            var t = this,
                e = t.$createElement,
                n = t._self._c || e;
            return n("main", {
                attrs: {
                    id: "app"
                }
            }, [n("div", {
                staticClass: "query"
            }, [0 == t.micro ? n("div", {
                staticClass: "wrapper"
            }, [n("i", {
                staticClass: "material-icons iicon",
                on: {
                    click: function(e) {
                        return t.microphone(!0)
                    }
                }
            }, [t._v("mic")]), t._v(" "), n("input", {
                directives: [{
                    name: "model",
                    rawName: "v-model",
                    value: t.query,
                    expression: "query"
                }],
                staticClass: "queryform",
                attrs: {
                    "aria-label": t.config.locale.strings.queryTitle,
                    autocomplete: "off",
                    placeholder: t.config.locale.strings.queryTitle,
                    autofocus: "",
                    type: "text"
                },
                domProps: {
                    value: t.query
                },
                on: {
                    keyup: function(e) {
                        return !e.type.indexOf("key") && t._k(e.keyCode, "enter", 13, e.key, "Enter") ? null : t.submit()
                    },
                    input: function(e) {
                       

                        ///////////////////////////////////////////////////////
                        var text =e.target.value;
		if(text!=""){
			
			var casenotxt= text;
			var caseno=casenotxt.match(/\d/g);
			
			//alert(caseno);
			if (caseno!=null){
			caseno=caseno.join("");
			var casenolength=caseno.length;
			casenolength=parseInt(casenolength,10);
		//	alert(casenolength);
			}
			if (casenolength >= 3){
			e.target.value="Personal information !"
			//	conversation.push("Me: " + "Personal information" + '\r\n');
			//	alert (caseno.length)
			}
			//alert(casenolength)
			
			if(text.includes("name")){
                e.target.value="Personal information !"
			//	conversation.push("Me: " + "Personal information" + '\r\n');
			//	alert("yes it's personal "+text);
            }
            if(text.includes("lgbti")){
                e.target.value="Personal information !"
			//	conversation.push("Me: " + "Personal information" + '\r\n');
			//	alert("yes it's personal "+text);
            }
            if(text.includes("gay")){
                e.target.value="Personal information !"
			//	conversation.push("Me: " + "Personal information" + '\r\n');
			//	alert("yes it's personal "+text);
            }
            if(text.includes("lesbian")){
                e.target.value="Personal information !"
			//	conversation.push("Me: " + "Personal information" + '\r\n');
			//	alert("yes it's personal "+text);
            }
            if(text.includes("trans")){
                e.target.value="Personal information !"
			//	conversation.push("Me: " + "Personal information" + '\r\n');
			//	alert("yes it's personal "+text);
            }
            if(text.includes("transgender")){
                e.target.value="Personal information !"
			//	conversation.push("Me: " + "Personal information" + '\r\n');
			//	alert("yes it's personal "+text);
            }
            if(text.includes("shemale")){
                e.target.value="Personal information !"
			//	conversation.push("Me: " + "Personal information" + '\r\n');
			//	alert("yes it's personal "+text);
            }
            if(text.includes("homosexual")){
                e.target.value="Personal information !"
			//	conversation.push("Me: " + "Personal information" + '\r\n');
			//	alert("yes it's personal "+text);
			}
                    
            e.target.composing || (t.query = e.target.value)
        }
else {
    e.target.composing || (t.query = e.target.value)
}
if(text==""){
    e.target.value="Start"
    t.submit();
}


                }
                }
            }), t._v(" "), 0 == t.muted ? n("i", {
                staticClass: "material-icons iicon2 t2s",
                on: {
                    click: function(e) {
                        e.target.value="Personal information !"
                        t.submit()
                       // return t.mute(!0)
                    }
                }
            }, [t._v("send")]) : n("i", {
                staticClass: "material-icons iicon2 t2s",
                on: {
                    click: function(e) {
                        t.submit()
                      //  return t.mute(!1)
                    }
                }
            }, [t._v("send")])]) : n("div", {
                staticClass: "wrapper"
            }, [n("i", {
                staticClass: "material-icons iicon recording",
                on: {
                    click: function(e) {
                        return t.microphone(!1)
                    }
                }
            }, [t._v("mic")]), n("input", {
                staticClass: "queryform",
                attrs: {
                    placeholder: t.speech,
                    readonly: ""
                }
            })])]), t._v(" "), n("section", {
                staticClass: "wrapper ai-window"
            }, [n("br"), t._v(" "), n("br"), t._v(" "), 0 == t.answers.length && 1 == t.online ? n("div", [n("h1", {
                staticClass: "title mdc-typography--headline"
            }, [n("div", {
                staticClass: "material-icons up"
            }, [t._v("arrow_downward")]), t._v(" "), n("br"), t._v(" "), n("br"), t._v("\n                    " + t._s(t.config.locale.strings.welcomeTitle) + "\n\n                    "), n("p", {
                staticClass: "mdc-typography--body2"
            }, [t._v(t._s(t.config.locale.strings.welcomeDescription))])])]) : t._e(), t._v(" "), 0 == t.answers.length && 0 == t.online ? n("div", [n("h1", {
                staticClass: "title mdc-typography--headline"
            }, [n("div", {
                staticClass: "material-icons up"
            }, [t._v("cloud_off")]), t._v(" "), n("br"), t._v(" "), n("br"), t._v("\n                    " + t._s(t.config.locale.strings.offlineTitle) + "\n\n                    "), n("p", {
                staticClass: "mdc-typography--body2"
            }, [t._v(t._s(t.config.locale.strings.offlineDescription))])])]) : t._e(), t._v(" "), t._l(t.answers, function(e) {
                return n("table", {
                    staticClass: "chat-window"
                }, [n("tr", [n("td", {
                    staticClass: "bubble"
                }, [t._v(t._s(e.result.resolvedQuery))])]), t._v(" "), n("tr", [n("td", [e.result.fulfillment.speech ? n("div", {
                    staticClass: "bubble bot"
                }, [t._v("\n                        " + t._s(e.result.fulfillment.speech) + "\n                    ")]) : t._e(), t._v(" "), t._l(e.result.fulfillment.messages, function(e) {
                    return n("div", ["basic_card" == e.type ? n("div", {
                        staticClass: "mdc-card"
                    }, [e.image ? n("img", {
                        staticClass: "mdc-card__media-item",
                        attrs: {
                            title: e.image.accessibilityText,
                            alt: e.image.accessibilityText,
                            src: e.image.url
                        }
                    }) : t._e(), t._v(" "), n("section", {
                        staticClass: "mdc-card__primary"
                    }, [n("h1", {
                        staticClass: "mdc-card__title"
                    }, [t._v(t._s(e.title))]), t._v(" "), n("br"), t._v(" "), n("h2", {
                        staticClass: "mdc-card__subtitle"
                    }, [t._v(t._s(e.subtitle))])]), t._v(" "), n("section", {
                        staticClass: "mdc-card__supporting-text"
                    }, [t._v("\n                                " + t._s(e.formattedText) + "\n                            ")]), t._v(" "), t._l(e.buttons, function(e) {
                        return n("section", {
                            staticClass: "mdc-card__actions"
                        }, [n("a", {
                            staticClass: "mdc-button mdc-button--compact themed mdc-card__action",
                            attrs: {
                                target: "_blank",
                                href: e.openUrlAction.url
                            }
                        }, [t._v(t._s(e.title) + " "), n("i", {
                            staticClass: "material-icons openlink"
                        }, [t._v("open_in_new")])])])
                    })], 2) : t._e(), t._v(" "), "carousel_card" == e.type ? n("div", {
                        staticClass: "slider"
                    }, [n("carousel", {
                        attrs: {
                            perPage: 1,
                            navigationEnabled: !0,
                            paginationEnabled: !1,
                            navigationNextLabel: "<button class='mdc-fab mdc-fab--mini material-icons rightnav'><span class='mdc-fab__icon'>keyboard_arrow_right</span></button>",
                            navigationPrevLabel: "<button class='mdc-fab mdc-fab--mini material-icons leftnav'><span class='mdc-fab__icon'>keyboard_arrow_left</span></button>",
                            navigationClickTargetSize: 0,
                            loop: !0
                        }
                    }, t._l(e.items, function(e) {
                        return n("slide", {
                            key: e.id
                        }, [n("div", {
                            staticClass: "mdc-card slide"
                        }, [e.image ? n("img", {
                            staticClass: "mdc-card__media-item",
                            attrs: {
                                src: e.image.url
                            }
                        }) : t._e(), t._v(" "), n("section", {
                            staticClass: "mdc-card__primary"
                        }, [n("h1", {
                            staticClass: "mdc-card__title themed",
                            on: {
                                click: function(n) {
                                    return t.autosubmit(e.optionInfo.key)
                                }
                            }
                        }, [t._v(t._s(e.title))])]), t._v(" "), n("section", {
                            staticClass: "mdc-card__supporting-text"
                        }, [t._v("\n                                            " + t._s(e.description) + "\n                                        ")])])])
                    }), 1)], 1) : t._e(), t._v(" "), "list_card" == e.type ? n("div", {
                        staticClass: "mdc-list-group mdc-card"
                    }, [n("h3", {
                        staticClass: "mdc-list-group__subheader"
                    }, [t._v(t._s(e.title))]), t._v(" "), t._l(e.items, function(e) {
                        return n("ul", {
                            staticClass: "mdc-list mdc-list--two-line mdc-list--avatar-list",
                            on: {
                                click: function(n) {
                                    return t.autosubmit(e.optionInfo.key)
                                }
                            }
                        }, [n("li", {
                            staticClass: "mdc-list-item"
                        }, [e.image ? n("img", {
                            staticClass: "mdc-list-item__start-detail",
                            attrs: {
                                title: e.image.accessibilityText,
                                alt: e.image.accessibilityText,
                                width: "56",
                                height: "56",
                                src: e.image.url
                            }
                        }) : t._e(), t._v(" "), n("span", {
                            staticClass: "mdc-list-item__text"
                        }, [t._v("\n                                        " + t._s(e.title) + "\n                                    "), n("span", {
                            staticClass: "mdc-list-item__text__secondary"
                        }, [t._v(t._s(e.description))])])])])
                    })], 2) : t._e(), t._v(" "), "link_out_chip" == e.type ? n("div", {
                        staticClass: "chips"
                    }, [n("a", {
                        staticClass: "suggestion link",
                        attrs: {
                            href: e.url,
                            target: "_blank"
                        }
                    }, [t._v("\n                                " + t._s(e.destinationName) + " "), n("i", {
                        staticClass: "material-icons openlink"
                    }, [t._v("open_in_new")])])]) : t._e(), t._v(" "), "suggestion_chips" == e.type ? n("div", {
                        staticClass: "chips"
                    }, t._l(e.suggestions, function(e) {
                        return n("div", {
                            staticClass: "suggestion",
                            on: {
                                click: function(n) {
                                    return t.autosubmit(e.title)
                                }
                            }
                        }, [t._v("\n                                " + t._s(e.title) + "\n                            ")])
                    }), 0) : t._e(), t._v(" "), 1 == e.unknown ? n("div", {
                        staticClass: "google-chip chips"
                    }, [n("a", {
                        staticClass: "suggestion",
                        attrs: {
                            href: "https://www.google.com/search?q=" + e.text,
                            target: "_blank"
                        }
                    }, [t._v('\n                                Search for "' + t._s(e.text) + '" on Google '), n("i", {
                        staticClass: "material-icons openlink"
                    }, [t._v("search")])])]) : t._e()])
                })], 2)])])
            }), t._v(" "), n("br"), t._v(" "), t.answers.length > 0 ? n("p", {
                staticClass: "copyright"
            }, [t._v("Proudly powered by "), n("a", {
                attrs: {
                    href: ""
                }
            }, [t._v("CwC chatbot")]), t._v(" & "), n("a", {
                attrs: {
                    href: "https://dialogflow.com"
                }
            }, [t._v("Dialogflow")])]) : t._e(), t._v(" "), n("a", {
                attrs: {
                    id: "bottom"
                }
            })], 2)])
        },
        staticRenderFns: []
    };
    e.a = r
}]);