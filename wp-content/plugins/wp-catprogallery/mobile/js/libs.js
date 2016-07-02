// Underscore.js 1.3.3
// (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Underscore is freely distributable under the MIT license.
// Portions of Underscore are inspired or borrowed from Prototype,
// Oliver Steele's Functional, and John Resig's Micro-Templating.
// For all details and documentation:
// http://documentcloud.github.com/underscore
var margtpHeight=0;
(function () {
    function r(a, c, d) {
        if (a === c) return 0 !== a || 1 / a == 1 / c;
        if (null == a || null == c) return a === c;
        a._chain && (a = a._wrapped);
        c._chain && (c = c._wrapped);
        if (a.isEqual && b.isFunction(a.isEqual)) return a.isEqual(c);
        if (c.isEqual && b.isFunction(c.isEqual)) return c.isEqual(a);
        var e = l.call(a);
        if (e != l.call(c)) return !1;
        switch (e) {
            case "[object String]":
                return a == "" + c;
            case "[object Number]":
                return a != +a ? c != +c : 0 == a ? 1 / a == 1 / c : a == +c;
            case "[object Date]":
            case "[object Boolean]":
                return +a == +c;
            case "[object RegExp]":
                return a.source ==
                    c.source && a.global == c.global && a.multiline == c.multiline && a.ignoreCase == c.ignoreCase
        }
        if ("object" != typeof a || "object" != typeof c) return !1;
        for (var f = d.length; f--;)
            if (d[f] == a) return !0;
        d.push(a);
        var f = 0,
            g = !0;
        if ("[object Array]" == e) {
            if (f = a.length, g = f == c.length)
                for (; f-- && (g = f in a == f in c && r(a[f], c[f], d)););
        } else {
            if ("constructor" in a != "constructor" in c || a.constructor != c.constructor) return !1;
            for (var h in a)
                if (b.has(a, h) && (f++, !(g = b.has(c, h) && r(a[h], c[h], d)))) break;
            if (g) {
                for (h in c)
                    if (b.has(c, h) && !f--) break;
                g = !f
            }
        }
        d.pop();
        return g
    }
    var s = this,
        I = s._,
        o = {}, k = Array.prototype,
        p = Object.prototype,
        i = k.slice,
        J = k.unshift,
        l = p.toString,
        K = p.hasOwnProperty,
        y = k.forEach,
        z = k.map,
        A = k.reduce,
        B = k.reduceRight,
        C = k.filter,
        D = k.every,
        E = k.some,
        q = k.indexOf,
        F = k.lastIndexOf,
        p = Array.isArray,
        L = Object.keys,
        t = Function.prototype.bind,
        b = function (a) {
            return new m(a)
        };
    "undefined" !== typeof exports ? ("undefined" !== typeof module && module.exports && (exports = module.exports = b), exports._ = b) : s._ = b;
    b.VERSION = "1.3.3";
    var j = b.each = b.forEach = function (a,
                                           c, d) {
        if (a != null)
            if (y && a.forEach === y) a.forEach(c, d);
            else if (a.length === +a.length)
                for (var e = 0, f = a.length; e < f; e++) {
                    if (e in a && c.call(d, a[e], e, a) === o) break
                } else
                for (e in a)
                    if (b.has(a, e) && c.call(d, a[e], e, a) === o) break
    };
    b.map = b.collect = function (a, c, b) {
        var e = [];
        if (a == null) return e;
        if (z && a.map === z) return a.map(c, b);
        j(a, function (a, g, h) {
            e[e.length] = c.call(b, a, g, h)
        });
        if (a.length === +a.length) e.length = a.length;
        return e
    };
    b.reduce = b.foldl = b.inject = function (a, c, d, e) {
        var f = arguments.length > 2;
        a == null && (a = []);
        if (A &&
            a.reduce === A) {
            e && (c = b.bind(c, e));
            return f ? a.reduce(c, d) : a.reduce(c)
        }
        j(a, function (a, b, i) {
            if (f) d = c.call(e, d, a, b, i);
            else {
                d = a;
                f = true
            }
        });
        if (!f) throw new TypeError("Reduce of empty array with no initial value");
        return d
    };
    b.reduceRight = b.foldr = function (a, c, d, e) {
        var f = arguments.length > 2;
        a == null && (a = []);
        if (B && a.reduceRight === B) {
            e && (c = b.bind(c, e));
            return f ? a.reduceRight(c, d) : a.reduceRight(c)
        }
        var g = b.toArray(a).reverse();
        e && !f && (c = b.bind(c, e));
        return f ? b.reduce(g, c, d, e) : b.reduce(g, c)
    };
    b.find = b.detect = function (a,
                                  c, b) {
        var e;
        G(a, function (a, g, h) {
            if (c.call(b, a, g, h)) {
                e = a;
                return true
            }
        });
        return e
    };
    b.filter = b.select = function (a, c, b) {
        var e = [];
        if (a == null) return e;
        if (C && a.filter === C) return a.filter(c, b);
        j(a, function (a, g, h) {
            c.call(b, a, g, h) && (e[e.length] = a)
        });
        return e
    };
    b.reject = function (a, c, b) {
        var e = [];
        if (a == null) return e;
        j(a, function (a, g, h) {
            c.call(b, a, g, h) || (e[e.length] = a)
        });
        return e
    };
    b.every = b.all = function (a, c, b) {
        var e = true;
        if (a == null) return e;
        if (D && a.every === D) return a.every(c, b);
        j(a, function (a, g, h) {
            if (!(e = e && c.call(b,
                a, g, h))) return o
        });
        return !!e
    };
    var G = b.some = b.any = function (a, c, d) {
        c || (c = b.identity);
        var e = false;
        if (a == null) return e;
        if (E && a.some === E) return a.some(c, d);
        j(a, function (a, b, h) {
            if (e || (e = c.call(d, a, b, h))) return o
        });
        return !!e
    };
    b.include = b.contains = function (a, c) {
        var b = false;
        if (a == null) return b;
        if (q && a.indexOf === q) return a.indexOf(c) != -1;
        return b = G(a, function (a) {
            return a === c
        })
    };
    b.invoke = function (a, c) {
        var d = i.call(arguments, 2);
        return b.map(a, function (a) {
            return (b.isFunction(c) ? c || a : a[c]).apply(a, d)
        })
    };
    b.pluck =
        function (a, c) {
            return b.map(a, function (a) {
                return a[c]
            })
        };
    b.max = function (a, c, d) {
        if (!c && b.isArray(a) && a[0] === +a[0]) return Math.max.apply(Math, a);
        if (!c && b.isEmpty(a)) return -Infinity;
        var e = {
            computed: -Infinity
        };
        j(a, function (a, b, h) {
            b = c ? c.call(d, a, b, h) : a;
            b >= e.computed && (e = {
                value: a,
                computed: b
            })
        });
        return e.value
    };
    b.min = function (a, c, d) {
        if (!c && b.isArray(a) && a[0] === +a[0]) return Math.min.apply(Math, a);
        if (!c && b.isEmpty(a)) return Infinity;
        var e = {
            computed: Infinity
        };
        j(a, function (a, b, h) {
            b = c ? c.call(d, a, b, h) : a;
            b < e.computed &&
            (e = {
                value: a,
                computed: b
            })
        });
        return e.value
    };
    b.shuffle = function (a) {
        var b = [],
            d;
        j(a, function (a, f) {
            d = Math.floor(Math.random() * (f + 1));
            b[f] = b[d];
            b[d] = a
        });
        return b
    };
    b.sortBy = function (a, c, d) {
        var e = b.isFunction(c) ? c : function (a) {
            return a[c]
        };
        return b.pluck(b.map(a, function (a, b, c) {
            return {
                value: a,
                criteria: e.call(d, a, b, c)
            }
        }).sort(function (a, b) {
                var c = a.criteria,
                    d = b.criteria;
                return c === void 0 ? 1 : d === void 0 ? -1 : c < d ? -1 : c > d ? 1 : 0
            }), "value")
    };
    b.groupBy = function (a, c) {
        var d = {}, e = b.isFunction(c) ? c : function (a) {
            return a[c]
        };
        j(a, function (a, b) {
            var c = e(a, b);
            (d[c] || (d[c] = [])).push(a)
        });
        return d
    };
    b.sortedIndex = function (a, c, d) {
        d || (d = b.identity);
        for (var e = 0, f = a.length; e < f;) {
            var g = e + f >> 1;
            d(a[g]) < d(c) ? e = g + 1 : f = g
        }
        return e
    };
    b.toArray = function (a) {
        return !a ? [] : b.isArray(a) || b.isArguments(a) ? i.call(a) : a.toArray && b.isFunction(a.toArray) ? a.toArray() : b.values(a)
    };
    b.size = function (a) {
        return b.isArray(a) ? a.length : b.keys(a).length
    };
    b.first = b.head = b.take = function (a, b, d) {
        return b != null && !d ? i.call(a, 0, b) : a[0]
    };
    b.initial = function (a, b, d) {
        return i.call(a,
            0, a.length - (b == null || d ? 1 : b))
    };
    b.last = function (a, b, d) {
        return b != null && !d ? i.call(a, Math.max(a.length - b, 0)) : a[a.length - 1]
    };
    b.rest = b.tail = function (a, b, d) {
        return i.call(a, b == null || d ? 1 : b)
    };
    b.compact = function (a) {
        return b.filter(a, function (a) {
            return !!a
        })
    };
    b.flatten = function (a, c) {
        return b.reduce(a, function (a, e) {
            if (b.isArray(e)) return a.concat(c ? e : b.flatten(e));
            a[a.length] = e;
            return a
        }, [])
    };
    b.without = function (a) {
        return b.difference(a, i.call(arguments, 1))
    };
    b.uniq = b.unique = function (a, c, d) {
        var d = d ? b.map(a, d) : a,
            e = [];
        a.length < 3 && (c = true);
        b.reduce(d, function (d, g, h) {
            if (c ? b.last(d) !== g || !d.length : !b.include(d, g)) {
                d.push(g);
                e.push(a[h])
            }
            return d
        }, []);
        return e
    };
    b.union = function () {
        return b.uniq(b.flatten(arguments, true))
    };
    b.intersection = b.intersect = function (a) {
        var c = i.call(arguments, 1);
        return b.filter(b.uniq(a), function (a) {
            return b.every(c, function (c) {
                return b.indexOf(c, a) >= 0
            })
        })
    };
    b.difference = function (a) {
        var c = b.flatten(i.call(arguments, 1), true);
        return b.filter(a, function (a) {
            return !b.include(c, a)
        })
    };
    b.zip = function () {
        for (var a =
            i.call(arguments), c = b.max(b.pluck(a, "length")), d = Array(c), e = 0; e < c; e++) d[e] = b.pluck(a, "" + e);
        return d
    };
    b.indexOf = function (a, c, d) {
        if (a == null) return -1;
        var e;
        if (d) {
            d = b.sortedIndex(a, c);
            return a[d] === c ? d : -1
        }
        if (q && a.indexOf === q) return a.indexOf(c);
        d = 0;
        for (e = a.length; d < e; d++)
            if (d in a && a[d] === c) return d;
        return -1
    };
    b.lastIndexOf = function (a, b) {
        if (a == null) return -1;
        if (F && a.lastIndexOf === F) return a.lastIndexOf(b);
        for (var d = a.length; d--;)
            if (d in a && a[d] === b) return d;
        return -1
    };
    b.range = function (a, b, d) {
        if (arguments.length <=
            1) {
            b = a || 0;
            a = 0
        }
        for (var d = arguments[2] || 1, e = Math.max(Math.ceil((b - a) / d), 0), f = 0, g = Array(e); f < e;) {
            g[f++] = a;
            a = a + d
        }
        return g
    };
    var H = function () {};
    b.bind = function (a, c) {
        var d, e;
        if (a.bind === t && t) return t.apply(a, i.call(arguments, 1));
        if (!b.isFunction(a)) throw new TypeError;
        e = i.call(arguments, 2);
        return d = function () {
            if (!(this instanceof d)) return a.apply(c, e.concat(i.call(arguments)));
            H.prototype = a.prototype;
            var b = new H,
                g = a.apply(b, e.concat(i.call(arguments)));
            return Object(g) === g ? g : b
        }
    };
    b.bindAll = function (a) {
        var c =
            i.call(arguments, 1);
        c.length == 0 && (c = b.functions(a));
        j(c, function (c) {
            a[c] = b.bind(a[c], a)
        });
        return a
    };
    b.memoize = function (a, c) {
        var d = {};
        c || (c = b.identity);
        return function () {
            var e = c.apply(this, arguments);
            return b.has(d, e) ? d[e] : d[e] = a.apply(this, arguments)
        }
    };
    b.delay = function (a, b) {
        var d = i.call(arguments, 2);
        return setTimeout(function () {
            return a.apply(null, d)
        }, b)
    };
    b.defer = function (a) {
        return b.delay.apply(b, [a, 1].concat(i.call(arguments, 1)))
    };
    b.throttle = function (a, c) {
        var d, e, f, g, h, i, j = b.debounce(function () {
            h =
                g = false
        }, c);
        return function () {
            d = this;
            e = arguments;
            f || (f = setTimeout(function () {
                f = null;
                h && a.apply(d, e);
                j()
            }, c));
            g ? h = true : i = a.apply(d, e);
            j();
            g = true;
            return i
        }
    };
    b.debounce = function (a, b, d) {
        var e;
        return function () {
            var f = this,
                g = arguments;
            d && !e && a.apply(f, g);
            clearTimeout(e);
            e = setTimeout(function () {
                e = null;
                d || a.apply(f, g)
            }, b)
        }
    };
    b.once = function (a) {
        var b = false,
            d;
        return function () {
            if (b) return d;
            b = true;
            return d = a.apply(this, arguments)
        }
    };
    b.wrap = function (a, b) {
        return function () {
            var d = [a].concat(i.call(arguments, 0));
            return b.apply(this, d)
        }
    };
    b.compose = function () {
        var a = arguments;
        return function () {
            for (var b = arguments, d = a.length - 1; d >= 0; d--) b = [a[d].apply(this, b)];
            return b[0]
        }
    };
    b.after = function (a, b) {
        return a <= 0 ? b() : function () {
            if (--a < 1) return b.apply(this, arguments)
        }
    };
    b.keys = L || function (a) {
        if (a !== Object(a)) throw new TypeError("Invalid object");
        var c = [],
            d;
        for (d in a) b.has(a, d) && (c[c.length] = d);
        return c
    };
    b.values = function (a) {
        return b.map(a, b.identity)
    };
    b.functions = b.methods = function (a) {
        var c = [],
            d;
        for (d in a) b.isFunction(a[d]) &&
        c.push(d);
        return c.sort()
    };
    b.extend = function (a) {
        j(i.call(arguments, 1), function (b) {
            for (var d in b) a[d] = b[d]
        });
        return a
    };
    b.pick = function (a) {
        var c = {};
        j(b.flatten(i.call(arguments, 1)), function (b) {
            b in a && (c[b] = a[b])
        });
        return c
    };
    b.defaults = function (a) {
        j(i.call(arguments, 1), function (b) {
            for (var d in b) a[d] == null && (a[d] = b[d])
        });
        return a
    };
    b.clone = function (a) {
        return !b.isObject(a) ? a : b.isArray(a) ? a.slice() : b.extend({}, a)
    };
    b.tap = function (a, b) {
        b(a);
        return a
    };
    b.isEqual = function (a, b) {
        return r(a, b, [])
    };
    b.isEmpty =
        function (a) {
            if (a == null) return true;
            if (b.isArray(a) || b.isString(a)) return a.length === 0;
            for (var c in a)
                if (b.has(a, c)) return false;
            return true
        };
    b.isElement = function (a) {
        return !!(a && a.nodeType == 1)
    };
    b.isArray = p || function (a) {
        return l.call(a) == "[object Array]"
    };
    b.isObject = function (a) {
        return a === Object(a)
    };
    b.isArguments = function (a) {
        return l.call(a) == "[object Arguments]"
    };
    b.isArguments(arguments) || (b.isArguments = function (a) {
        return !(!a || !b.has(a, "callee"))
    });
    b.isFunction = function (a) {
        return l.call(a) == "[object Function]"
    };
    b.isString = function (a) {
        return l.call(a) == "[object String]"
    };
    b.isNumber = function (a) {
        return l.call(a) == "[object Number]"
    };
    b.isFinite = function (a) {
        return b.isNumber(a) && isFinite(a)
    };
    b.isNaN = function (a) {
        return a !== a
    };
    b.isBoolean = function (a) {
        return a === true || a === false || l.call(a) == "[object Boolean]"
    };
    b.isDate = function (a) {
        return l.call(a) == "[object Date]"
    };
    b.isRegExp = function (a) {
        return l.call(a) == "[object RegExp]"
    };
    b.isNull = function (a) {
        return a === null
    };
    b.isUndefined = function (a) {
        return a === void 0
    };
    b.has = function (a,
                      b) {
        return K.call(a, b)
    };
    b.noConflict = function () {
        s._ = I;
        return this
    };
    b.identity = function (a) {
        return a
    };
    b.times = function (a, b, d) {
        for (var e = 0; e < a; e++) b.call(d, e)
    };
    b.escape = function (a) {
        return ("" + a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
    };
    b.result = function (a, c) {
        if (a == null) return null;
        var d = a[c];
        return b.isFunction(d) ? d.call(a) : d
    };
    b.mixin = function (a) {
        j(b.functions(a), function (c) {
            M(c, b[c] = a[c])
        })
    };
    var N = 0;
    b.uniqueId =
        function (a) {
            var b = N++;
            return a ? a + b : b
        };
    b.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var u = /.^/,
        n = {
            "\\": "\\",
            "'": "'",
            r: "\r",
            n: "\n",
            t: "\t",
            u2028: "\u2028",
            u2029: "\u2029"
        }, v;
    for (v in n) n[n[v]] = v;
    var O = /\\|'|\r|\n|\t|\u2028|\u2029/g,
        P = /\\(\\|'|r|n|t|u2028|u2029)/g,
        w = function (a) {
            return a.replace(P, function (a, b) {
                return n[b]
            })
        };
    b.template = function (a, c, d) {
        d = b.defaults(d || {}, b.templateSettings);
        a = "__p+='" + a.replace(O, function (a) {
            return "\\" + n[a]
        }).replace(d.escape ||
            u, function (a, b) {
                return "'+\n_.escape(" + w(b) + ")+\n'"
            }).replace(d.interpolate || u, function (a, b) {
                return "'+\n(" + w(b) + ")+\n'"
            }).replace(d.evaluate || u, function (a, b) {
                return "';\n" + w(b) + "\n;__p+='"
            }) + "';\n";
        d.variable || (a = "with(obj||{}){\n" + a + "}\n");
        var a = "var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" + a + "return __p;\n",
            e = new Function(d.variable || "obj", "_", a);
        if (c) return e(c, b);
        c = function (a) {
            return e.call(this, a, b)
        };
        c.source = "function(" + (d.variable || "obj") + "){\n" + a + "}";
        return c
    };
    b.chain = function (a) {
        return b(a).chain()
    };
    var m = function (a) {
        this._wrapped = a
    };
    b.prototype = m.prototype;
    var x = function (a, c) {
        return c ? b(a).chain() : a
    }, M = function (a, c) {
        m.prototype[a] = function () {
            var a = i.call(arguments);
            J.call(a, this._wrapped);
            return x(c.apply(b, a), this._chain)
        }
    };
    b.mixin(b);
    j("pop,push,reverse,shift,sort,splice,unshift".split(","), function (a) {
        var b = k[a];
        m.prototype[a] = function () {
            var d = this._wrapped;
            b.apply(d, arguments);
            var e = d.length;
            (a == "shift" || a == "splice") && e === 0 && delete d[0];
            return x(d,
                this._chain)
        }
    });
    j(["concat", "join", "slice"], function (a) {
        var b = k[a];
        m.prototype[a] = function () {
            return x(b.apply(this._wrapped, arguments), this._chain)
        }
    });
    m.prototype.chain = function () {
        this._chain = true;
        return this
    };
    m.prototype.value = function () {
        return this._wrapped
    }
}).call(this);


/*! jQuery v1.7.1 jquery.com | jquery.org/license */
(function (a, b) {
    function cy(a) {
        return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
    }

    function cv(a) {
        if (!ck[a]) {
            var b = c.body,
                d = f("<" + a + ">").appendTo(b),
                e = d.css("display");
            d.remove();
            if (e === "none" || e === "") {
                cl || (cl = c.createElement("iframe"), cl.frameBorder = cl.width = cl.height = 0), b.appendChild(cl);
                if (!cm || !cl.createElement) cm = (cl.contentWindow || cl.contentDocument).document, cm.write((c.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"), cm.close();
                d = cm.createElement(a), cm.body.appendChild(d), e = f.css(d, "display"), b.removeChild(cl)
            }
            ck[a] = e
        }
        return ck[a]
    }

    function cu(a, b) {
        var c = {};
        f.each(cq.concat.apply([], cq.slice(0, b)), function () {
            c[this] = a
        });
        return c
    }

    function ct() {
        cr = b
    }

    function cs() {
        setTimeout(ct, 0);
        return cr = f.now()
    }

    function cj() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {}
    }

    function ci() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    }

    function cc(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var d = a.dataTypes,
            e = {}, g, h, i = d.length,
            j, k = d[0],
            l, m, n, o, p;
        for (g = 1; g < i; g++) {
            if (g === 1)
                for (h in a.converters) typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
            l = k, k = d[g];
            if (k === "*") k = l;
            else if (l !== "*" && l !== k) {
                m = l + " " + k, n = e[m] || e["* " + k];
                if (!n) {
                    p = b;
                    for (o in e) {
                        j = o.split(" ");
                        if (j[0] === l || j[0] === "*") {
                            p = e[j[1] + " " + k];
                            if (p) {
                                o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                                break
                            }
                        }
                    }
                }!n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
            }
        }
        return c
    }

    function cb(a, c, d) {
        var e = a.contents,
            f = a.dataTypes,
            g = a.responseFields,
            h, i, j, k;
        for (i in g) i in d && (c[g[i]] = d[i]);
        while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
        if (h)
            for (i in e)
                if (e[i] && e[i].test(h)) {
                    f.unshift(i);
                    break
                }
        if (f[0] in d) j = f[0];
        else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break
                }
                k || (k = i)
            }
            j = j || k
        } if (j) {
            j !== f[0] && f.unshift(j);
            return d[j]
        }
    }

    function ca(a, b, c, d) {
        if (f.isArray(b)) f.each(b, function (b, e) {
            c || bE.test(a) ? d(a, e) : ca(a + "[" + (typeof e == "object" || f.isArray(e) ? b : "") + "]", e, c, d)
        });
        else if (!c && b != null && typeof b == "object")
            for (var e in b) ca(a + "[" + e + "]", b[e], c, d);
        else d(a, b)
    }

    function b_(a, c) {
        var d, e, g = f.ajaxSettings.flatOptions || {};
        for (d in c) c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
        e && f.extend(!0, a, e)
    }

    function b$(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        var h = a[f],
            i = 0,
            j = h ? h.length : 0,
            k = a === bT,
            l;
        for (; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = b$(a, c, d, e, l, g)));
        (k || !l) && !g["*"] && (l = b$(a, c, d, e, "*", g));
        return l
    }

    function bZ(a) {
        return function (b, c) {
            typeof b != "string" && (c = b, b = "*");
            if (f.isFunction(c)) {
                var d = b.toLowerCase().split(bP),
                    e = 0,
                    g = d.length,
                    h, i, j;
                for (; e < g; e++) h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
            }
        }
    }

    function bC(a, b, c) {
        var d = b === "width" ? a.offsetWidth : a.offsetHeight,
            e = b === "width" ? bx : by,
            g = 0,
            h = e.length;
        if (d > 0) {
            if (c !== "border")
                for (; g < h; g++) c || (d -= parseFloat(f.css(a, "padding" + e[g])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + e[g])) || 0 : d -= parseFloat(f.css(a, "border" + e[g] + "Width")) || 0;
            return d + "px"
        }
        d = bz(a, b, b);
        if (d < 0 || d == null) d = a.style[b] || 0;
        d = parseFloat(d) || 0;
        if (c)
            for (; g < h; g++) d += parseFloat(f.css(a, "padding" + e[g])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + e[g] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + e[g])) || 0);
        return d + "px"
    }

    function bp(a, b) {
        b.src ? f.ajax({
            url: b.src,
            async: !1,
            dataType: "script"
        }) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
    }

    function bo(a) {
        var b = c.createElement("div");
        bh.appendChild(b), b.innerHTML = a.outerHTML;
        return b.firstChild
    }

    function bn(a) {
        var b = (a.nodeName || "").toLowerCase();
        b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm)
    }

    function bm(a) {
        if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked
    }

    function bl(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
    }

    function bk(a, b) {
        var c;
        if (b.nodeType === 1) {
            b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase();
            if (c === "object") b.outerHTML = a.outerHTML;
            else if (c !== "input" || a.type !== "checkbox" && a.type !== "radio") {
                if (c === "option") b.selected = a.defaultSelected;
                else if (c === "input" || c === "textarea") b.defaultValue = a.defaultValue
            } else a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value);
            b.removeAttribute(f.expando)
        }
    }

    function bj(a, b) {
        if (b.nodeType === 1 && !! f.hasData(a)) {
            var c, d, e, g = f._data(a),
                h = f._data(b, g),
                i = g.events;
            if (i) {
                delete h.handle, h.events = {};
                for (c in i)
                    for (d = 0, e = i[c].length; d < e; d++) f.event.add(b, c + (i[c][d].namespace ? "." : "") + i[c][d].namespace, i[c][d], i[c][d].data)
            }
            h.data && (h.data = f.extend({}, h.data))
        }
    }

    function bi(a, b) {
        return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function U(a) {
        var b = V.split("|"),
            c = a.createDocumentFragment();
        if (c.createElement)
            while (b.length) c.createElement(b.pop());
        return c
    }

    function T(a, b, c) {
        b = b || 0;
        if (f.isFunction(b)) return f.grep(a, function (a, d) {
            var e = !! b.call(a, d, a);
            return e === c
        });
        if (b.nodeType) return f.grep(a, function (a, d) {
            return a === b === c
        });
        if (typeof b == "string") {
            var d = f.grep(a, function (a) {
                return a.nodeType === 1
            });
            if (O.test(b)) return f.filter(b, d, !c);
            b = f.filter(b, d)
        }
        return f.grep(a, function (a, d) {
            return f.inArray(a, b) >= 0 === c
        })
    }

    function S(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11
    }

    function K() {
        return !0
    }

    function J() {
        return !1
    }

    function n(a, b, c) {
        var d = b + "defer",
            e = b + "queue",
            g = b + "mark",
            h = f._data(a, d);
        h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function () {
            !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire())
        }, 0)
    }

    function m(a) {
        for (var b in a) {
            if (b === "data" && f.isEmptyObject(a[b])) continue;
            if (b !== "toJSON") return !1
        }
        return !0
    }

    function l(a, c, d) {
        if (d === b && a.nodeType === 1) {
            var e = "data-" + c.replace(k, "-$1").toLowerCase();
            d = a.getAttribute(e);
            if (typeof d == "string") {
                try {
                    d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? parseFloat(d) : j.test(d) ? f.parseJSON(d) : d
                } catch (g) {}
                f.data(a, c, d)
            } else d = b
        }
        return d
    }

    function h(a) {
        var b = g[a] = {}, c, d;
        a = a.split(/\s+/);
        for (c = 0, d = a.length; c < d; c++) b[a[c]] = !0;
        return b
    }
    var c = a.document,
        d = a.navigator,
        e = a.location,
        f = function () {
            function J() {
                if (!e.isReady) {
                    try {
                        c.documentElement.doScroll("left")
                    } catch (a) {
                        setTimeout(J, 1);
                        return
                    }
                    e.ready()
                }
            }
            var e = function (a, b) {
                    return new e.fn.init(a, b, h)
                }, f = a.jQuery,
                g = a.$,
                h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
                j = /\S/,
                k = /^\s+/,
                l = /\s+$/,
                m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
                n = /^[\],:{}\s]*$/,
                o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                q = /(?:^|:|,)(?:\s*\[)+/g,
                r = /(webkit)[ \/]([\w.]+)/,
                s = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                t = /(msie) ([\w.]+)/,
                u = /(mozilla)(?:.*? rv:([\w.]+))?/,
                v = /-([a-z]|[0-9])/ig,
                w = /^-ms-/,
                x = function (a, b) {
                    return (b + "").toUpperCase()
                }, y = d.userAgent,
                z, A, B, C = Object.prototype.toString,
                D = Object.prototype.hasOwnProperty,
                E = Array.prototype.push,
                F = Array.prototype.slice,
                G = String.prototype.trim,
                H = Array.prototype.indexOf,
                I = {};
            e.fn = e.prototype = {
                constructor: e,
                init: function (a, d, f) {
                    var g, h, j, k;
                    if (!a) return this;
                    if (a.nodeType) {
                        this.context = this[0] = a, this.length = 1;
                        return this
                    }
                    if (a === "body" && !d && c.body) {
                        this.context = c, this[0] = c.body, this.selector = a, this.length = 1;
                        return this
                    }
                    if (typeof a == "string") {
                        a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];
                        if (g && (g[1] || !d)) {
                            if (g[1]) {
                                d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
                                return e.merge(this, a)
                            }
                            h = c.getElementById(g[2]);
                            if (h && h.parentNode) {
                                if (h.id !== g[2]) return f.find(a);
                                this.length = 1, this[0] = h
                            }
                            this.context = c, this.selector = a;
                            return this
                        }
                        return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
                    }
                    if (e.isFunction(a)) return f.ready(a);
                    a.selector !== b && (this.selector = a.selector, this.context = a.context);
                    return e.makeArray(a, this)
                },
                selector: "",
                jquery: "1.7.1",
                length: 0,
                size: function () {
                    return this.length
                },
                toArray: function () {
                    return F.call(this, 0)
                },
                get: function (a) {
                    return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
                },
                pushStack: function (a, b, c) {
                    var d = this.constructor();
                    e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
                    return d
                },
                each: function (a, b) {
                    return e.each(this, a, b)
                },
                ready: function (a) {
                    e.bindReady(), A.add(a);
                    return this
                },
                eq: function (a) {
                    a = +a;
                    return a === -1 ? this.slice(a) : this.slice(a, a + 1)
                },
                first: function () {
                    return this.eq(0)
                },
                last: function () {
                    return this.eq(-1)
                },
                slice: function () {
                    return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
                },
                map: function (a) {
                    return this.pushStack(e.map(this, function (b, c) {
                        return a.call(b, c, b)
                    }))
                },
                end: function () {
                    return this.prevObject || this.constructor(null)
                },
                push: E,
                sort: [].sort,
                splice: [].splice
            }, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function () {
                var a, c, d, f, g, h, i = arguments[0] || {}, j = 1,
                    k = arguments.length,
                    l = !1;
                typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
                for (; j < k; j++)
                    if ((a = arguments[j]) != null)
                        for (c in a) {
                            d = i[c], f = a[c];
                            if (i === f) continue;
                            l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
                        }
                return i
            }, e.extend({
                noConflict: function (b) {
                    a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f);
                    return e
                },
                isReady: !1,
                readyWait: 1,
                holdReady: function (a) {
                    a ? e.readyWait++ : e.ready(!0)
                },
                ready: function (a) {
                    if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
                        if (!c.body) return setTimeout(e.ready, 1);
                        e.isReady = !0;
                        if (a !== !0 && --e.readyWait > 0) return;
                        A.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").off("ready")
                    }
                },
                bindReady: function () {
                    if (!A) {
                        A = e.Callbacks("once memory");
                        if (c.readyState === "complete") return setTimeout(e.ready, 1);
                        if (c.addEventListener) c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1);
                        else if (c.attachEvent) {
                            c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
                            var b = !1;
                            try {
                                b = a.frameElement == null
                            } catch (d) {}
                            c.documentElement.doScroll && b && J()
                        }
                    }
                },
                isFunction: function (a) {
                    return e.type(a) === "function"
                },
                isArray: Array.isArray || function (a) {
                    return e.type(a) === "array"
                },
                isWindow: function (a) {
                    return a && typeof a == "object" && "setInterval" in a
                },
                isNumeric: function (a) {
                    return !isNaN(parseFloat(a)) && isFinite(a)
                },
                type: function (a) {
                    return a == null ? String(a) : I[C.call(a)] || "object"
                },
                isPlainObject: function (a) {
                    if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) return !1;
                    try {
                        if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) return !1
                    } catch (c) {
                        return !1
                    }
                    var d;
                    for (d in a);
                    return d === b || D.call(a, d)
                },
                isEmptyObject: function (a) {
                    for (var b in a) return !1;
                    return !0
                },
                error: function (a) {
                    throw new Error(a)
                },
                parseJSON: function (b) {
                    if (typeof b != "string" || !b) return null;
                    b = e.trim(b);
                    if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
                    if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) return (new Function("return " + b))();
                    e.error("Invalid JSON: " + b)
                },
                parseXML: function (c) {
                    var d, f;
                    try {
                        a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
                    } catch (g) {
                        d = b
                    }(!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
                    return d
                },
                noop: function () {},
                globalEval: function (b) {
                    b && j.test(b) && (a.execScript || function (b) {
                        a.eval.call(a, b)
                    })(b)
                },
                camelCase: function (a) {
                    return a.replace(w, "ms-").replace(v, x)
                },
                nodeName: function (a, b) {
                    return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
                },
                each: function (a, c, d) {
                    var f, g = 0,
                        h = a.length,
                        i = h === b || e.isFunction(a);
                    if (d) {
                        if (i) {
                            for (f in a)
                                if (c.apply(a[f], d) === !1) break
                        } else
                            for (; g < h;)
                                if (c.apply(a[g++], d) === !1) break
                    } else if (i) {
                        for (f in a)
                            if (c.call(a[f], f, a[f]) === !1) break
                    } else
                        for (; g < h;)
                            if (c.call(a[g], g, a[g++]) === !1) break; return a
                },
                trim: G ? function (a) {
                    return a == null ? "" : G.call(a)
                } : function (a) {
                    return a == null ? "" : (a + "").replace(k, "").replace(l, "")
                },
                makeArray: function (a, b) {
                    var c = b || [];
                    if (a != null) {
                        var d = e.type(a);
                        a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
                    }
                    return c
                },
                inArray: function (a, b, c) {
                    var d;
                    if (b) {
                        if (H) return H.call(b, a, c);
                        d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                        for (; c < d; c++)
                            if (c in b && b[c] === a) return c
                    }
                    return -1
                },
                merge: function (a, c) {
                    var d = a.length,
                        e = 0;
                    if (typeof c.length == "number")
                        for (var f = c.length; e < f; e++) a[d++] = c[e];
                    else
                        while (c[e] !== b) a[d++] = c[e++];
                    a.length = d;
                    return a
                },
                grep: function (a, b, c) {
                    var d = [],
                        e;
                    c = !! c;
                    for (var f = 0, g = a.length; f < g; f++) e = !! b(a[f], f), c !== e && d.push(a[f]);
                    return d
                },
                map: function (a, c, d) {
                    var f, g, h = [],
                        i = 0,
                        j = a.length,
                        k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
                    if (k)
                        for (; i < j; i++) f = c(a[i], i, d), f != null && (h[h.length] = f);
                    else
                        for (g in a) f = c(a[g], g, d), f != null && (h[h.length] = f);
                    return h.concat.apply([], h)
                },
                guid: 1,
                proxy: function (a, c) {
                    if (typeof c == "string") {
                        var d = a[c];
                        c = a, a = d
                    }
                    if (!e.isFunction(a)) return b;
                    var f = F.call(arguments, 2),
                        g = function () {
                            return a.apply(c, f.concat(F.call(arguments)))
                        };
                    g.guid = a.guid = a.guid || g.guid || e.guid++;
                    return g
                },
                access: function (a, c, d, f, g, h) {
                    var i = a.length;
                    if (typeof c == "object") {
                        for (var j in c) e.access(a, j, c[j], f, g, d);
                        return a
                    }
                    if (d !== b) {
                        f = !h && f && e.isFunction(d);
                        for (var k = 0; k < i; k++) g(a[k], c, f ? d.call(a[k], k, g(a[k], c)) : d, h);
                        return a
                    }
                    return i ? g(a[0], c) : b
                },
                now: function () {
                    return (new Date).getTime()
                },
                uaMatch: function (a) {
                    a = a.toLowerCase();
                    var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                    return {
                        browser: b[1] || "",
                        version: b[2] || "0"
                    }
                },
                sub: function () {
                    function a(b, c) {
                        return new a.fn.init(b, c)
                    }
                    e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function (d, f) {
                        f && f instanceof e && !(f instanceof a) && (f = a(f));
                        return e.fn.init.call(this, d, f, b)
                    }, a.fn.init.prototype = a.fn;
                    var b = a(c);
                    return a
                },
                browser: {}
            }), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
                I["[object " + b + "]"] = b.toLowerCase()
            }), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function () {
                c.removeEventListener("DOMContentLoaded", B, !1), e.ready()
            } : c.attachEvent && (B = function () {
                c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready())
            });
            return e
        }(),
        g = {};
    f.Callbacks = function (a) {
        a = a ? g[a] || h(a) : {};
        var c = [],
            d = [],
            e, i, j, k, l, m = function (b) {
                var d, e, g, h, i;
                for (d = 0, e = b.length; d < e; d++) g = b[d], h = f.type(g), h === "array" ? m(g) : h === "function" && (!a.unique || !o.has(g)) && c.push(g)
            }, n = function (b, f) {
                f = f || [], e = !a.memory || [b, f], i = !0, l = j || 0, j = 0, k = c.length;
                for (; c && l < k; l++)
                    if (c[l].apply(b, f) === !1 && a.stopOnFalse) {
                        e = !0;
                        break
                    }
                i = !1, c && (a.once ? e === !0 ? o.disable() : c = [] : d && d.length && (e = d.shift(), o.fireWith(e[0], e[1])))
            }, o = {
                add: function () {
                    if (c) {
                        var a = c.length;
                        m(arguments), i ? k = c.length : e && e !== !0 && (j = a, n(e[0], e[1]))
                    }
                    return this
                },
                remove: function () {
                    if (c) {
                        var b = arguments,
                            d = 0,
                            e = b.length;
                        for (; d < e; d++)
                            for (var f = 0; f < c.length; f++)
                                if (b[d] === c[f]) {
                                    i && f <= k && (k--, f <= l && l--), c.splice(f--, 1);
                                    if (a.unique) break
                                }
                    }
                    return this
                },
                has: function (a) {
                    if (c) {
                        var b = 0,
                            d = c.length;
                        for (; b < d; b++)
                            if (a === c[b]) return !0
                    }
                    return !1
                },
                empty: function () {
                    c = [];
                    return this
                },
                disable: function () {
                    c = d = e = b;
                    return this
                },
                disabled: function () {
                    return !c
                },
                lock: function () {
                    d = b, (!e || e === !0) && o.disable();
                    return this
                },
                locked: function () {
                    return !d
                },
                fireWith: function (b, c) {
                    d && (i ? a.once || d.push([b, c]) : (!a.once || !e) && n(b, c));
                    return this
                },
                fire: function () {
                    o.fireWith(this, arguments);
                    return this
                },
                fired: function () {
                    return !!e
                }
            };
        return o
    };
    var i = [].slice;
    f.extend({
        Deferred: function (a) {
            var b = f.Callbacks("once memory"),
                c = f.Callbacks("once memory"),
                d = f.Callbacks("memory"),
                e = "pending",
                g = {
                    resolve: b,
                    reject: c,
                    notify: d
                }, h = {
                    done: b.add,
                    fail: c.add,
                    progress: d.add,
                    state: function () {
                        return e
                    },
                    isResolved: b.fired,
                    isRejected: c.fired,
                    then: function (a, b, c) {
                        i.done(a).fail(b).progress(c);
                        return this
                    },
                    always: function () {
                        i.done.apply(i, arguments).fail.apply(i, arguments);
                        return this
                    },
                    pipe: function (a, b, c) {
                        return f.Deferred(function (d) {
                            f.each({
                                done: [a, "resolve"],
                                fail: [b, "reject"],
                                progress: [c, "notify"]
                            }, function (a, b) {
                                var c = b[0],
                                    e = b[1],
                                    g;
                                f.isFunction(c) ? i[a](function () {
                                    g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
                                }) : i[a](d[e])
                            })
                        }).promise()
                    },
                    promise: function (a) {
                        if (a == null) a = h;
                        else
                            for (var b in h) a[b] = h[b];
                        return a
                    }
                }, i = h.promise({}),
                j;
            for (j in g) i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
            i.done(function () {
                e = "resolved"
            }, c.disable, d.lock).fail(function () {
                    e = "rejected"
                }, b.disable, d.lock), a && a.call(i, i);
            return i
        },
        when: function (a) {
            function m(a) {
                return function (b) {
                    e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e)
                }
            }

            function l(a) {
                return function (c) {
                    b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b)
                }
            }
            var b = i.call(arguments, 0),
                c = 0,
                d = b.length,
                e = Array(d),
                g = d,
                h = d,
                j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(),
                k = j.promise();
            if (d > 1) {
                for (; c < d; c++) b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
                g || j.resolveWith(j, b)
            } else j !== a && j.resolveWith(j, d ? [a] : []);
            return k
        }
    }), f.support = function () {
        var b, d, e, g, h, i, j, k, l, m, n, o, p, q = c.createElement("div"),
            r = c.documentElement;
        q.setAttribute("className", "t"), q.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = q.getElementsByTagName("*"), e = q.getElementsByTagName("a")[0];
        if (!d || !d.length || !e) return {};
        g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = q.getElementsByTagName("input")[0], b = {
            leadingWhitespace: q.firstChild.nodeType === 3,
            tbody: !q.getElementsByTagName("tbody").length,
            htmlSerialize: !! q.getElementsByTagName("link").length,
            style: /top/.test(e.getAttribute("style")),
            hrefNormalized: e.getAttribute("href") === "/a",
            opacity: /^0.55/.test(e.style.opacity),
            cssFloat: !! e.style.cssFloat,
            checkOn: i.value === "on",
            optSelected: h.selected,
            getSetAttribute: q.className !== "t",
            enctype: !! c.createElement("form").enctype,
            html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0
        }, i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
        try {
            delete q.test
        } catch (s) {
            b.deleteExpando = !1
        }!q.addEventListener && q.attachEvent && q.fireEvent && (q.attachEvent("onclick", function () {
            b.noCloneEvent = !1
        }), q.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), q.appendChild(i), k = c.createDocumentFragment(), k.appendChild(q.lastChild), b.checkClone = k.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, k.removeChild(i), k.appendChild(q), q.innerHTML = "", a.getComputedStyle && (j = c.createElement("div"), j.style.width = "0", j.style.marginRight = "0", q.style.width = "2px", q.appendChild(j), b.reliableMarginRight = (parseInt((a.getComputedStyle(j, null) || {
            marginRight: 0
        }).marginRight, 10) || 0) === 0);
        if (q.attachEvent)
            for (o in {
                submit: 1,
                change: 1,
                focusin: 1
            }) n = "on" + o, p = n in q, p || (q.setAttribute(n, "return;"), p = typeof q[n] == "function"), b[o + "Bubbles"] = p;
        k.removeChild(q), k = g = h = j = q = i = null, f(function () {
            var a, d, e, g, h, i, j, k, m, n, o, r = c.getElementsByTagName("body")[0];
            !r || (j = 1, k = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;", m = "visibility:hidden;border:0;", n = "style='" + k + "border:5px solid #000;padding:0;'", o = "<div " + n + "><div></div></div>" + "<table " + n + " cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", a = c.createElement("div"), a.style.cssText = m + "width:0;height:0;position:static;top:0;margin-top:" + j + "px", r.insertBefore(a, r.firstChild), q = c.createElement("div"), a.appendChild(q), q.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>", l = q.getElementsByTagName("td"), p = l[0].offsetHeight === 0, l[0].style.display = "", l[1].style.display = "none", b.reliableHiddenOffsets = p && l[0].offsetHeight === 0, q.innerHTML = "", q.style.width = q.style.paddingLeft = "1px", f.boxModel = b.boxModel = q.offsetWidth === 2, typeof q.style.zoom != "undefined" && (q.style.display = "inline", q.style.zoom = 1, b.inlineBlockNeedsLayout = q.offsetWidth === 2, q.style.display = "", q.innerHTML = "<div style='width:4px;'></div>", b.shrinkWrapBlocks = q.offsetWidth !== 2), q.style.cssText = k + m, q.innerHTML = o, d = q.firstChild, e = d.firstChild, h = d.nextSibling.firstChild.firstChild, i = {
                doesNotAddBorder: e.offsetTop !== 5,
                doesAddBorderForTableAndCells: h.offsetTop === 5
            }, e.style.position = "fixed", e.style.top = "20px", i.fixedPosition = e.offsetTop === 20 || e.offsetTop === 15, e.style.position = e.style.top = "", d.style.overflow = "hidden", d.style.position = "relative", i.subtractsBorderForOverflowNotVisible = e.offsetTop === -5, i.doesNotIncludeMarginInBodyOffset = r.offsetTop !== j, r.removeChild(a), q = a = null, f.extend(b, i))
        });
        return b
    }();
    var j = /^(?:\{.*\}|\[.*\])$/,
        k = /([A-Z])/g;
    f.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function (a) {
            a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
            return !!a && !m(a)
        },
        data: function (a, c, d, e) {
            if ( !! f.acceptData(a)) {
                var g, h, i, j = f.expando,
                    k = typeof c == "string",
                    l = a.nodeType,
                    m = l ? f.cache : a,
                    n = l ? a[j] : a[j] && j,
                    o = c === "events";
                if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) return;
                n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
                if (typeof c == "object" || typeof c == "function") e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
                g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d);
                if (o && !h[c]) return g.events;
                k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h;
                return i
            }
        },
        removeData: function (a, b, c) {
            if ( !! f.acceptData(a)) {
                var d, e, g, h = f.expando,
                    i = a.nodeType,
                    j = i ? f.cache : a,
                    k = i ? a[h] : h;
                if (!j[k]) return;
                if (b) {
                    d = c ? j[k] : j[k].data;
                    if (d) {
                        f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
                        for (e = 0, g = b.length; e < g; e++) delete d[b[e]];
                        if (!(c ? m : f.isEmptyObject)(d)) return
                    }
                }
                if (!c) {
                    delete j[k].data;
                    if (!m(j[k])) return
                }
                f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
            }
        },
        _data: function (a, b, c) {
            return f.data(a, b, c, !0)
        },
        acceptData: function (a) {
            if (a.nodeName) {
                var b = f.noData[a.nodeName.toLowerCase()];
                if (b) return b !== !0 && a.getAttribute("classid") === b
            }
            return !0
        }
    }), f.fn.extend({
        data: function (a, c) {
            var d, e, g, h = null;
            if (typeof a == "undefined") {
                if (this.length) {
                    h = f.data(this[0]);
                    if (this[0].nodeType === 1 && !f._data(this[0], "parsedAttrs")) {
                        e = this[0].attributes;
                        for (var i = 0, j = e.length; i < j; i++) g = e[i].name, g.indexOf("data-") === 0 && (g = f.camelCase(g.substring(5)), l(this[0], g, h[g]));
                        f._data(this[0], "parsedAttrs", !0)
                    }
                }
                return h
            }
            if (typeof a == "object") return this.each(function () {
                f.data(this, a)
            });
            d = a.split("."), d[1] = d[1] ? "." + d[1] : "";
            if (c === b) {
                h = this.triggerHandler("getData" + d[1] + "!", [d[0]]), h === b && this.length && (h = f.data(this[0], a), h = l(this[0], a, h));
                return h === b && d[1] ? this.data(d[0]) : h
            }
            return this.each(function () {
                var b = f(this),
                    e = [d[0], c];
                b.triggerHandler("setData" + d[1] + "!", e), f.data(this, a, c), b.triggerHandler("changeData" + d[1] + "!", e)
            })
        },
        removeData: function (a) {
            return this.each(function () {
                f.removeData(this, a)
            })
        }
    }), f.extend({
        _mark: function (a, b) {
            a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1))
        },
        _unmark: function (a, b, c) {
            a !== !0 && (c = b, b = a, a = !1);
            if (b) {
                c = c || "fx";
                var d = c + "mark",
                    e = a ? 0 : (f._data(b, d) || 1) - 1;
                e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"))
            }
        },
        queue: function (a, b, c) {
            var d;
            if (a) {
                b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
                return d || []
            }
        },
        dequeue: function (a, b) {
            b = b || "fx";
            var c = f.queue(a, b),
                d = c.shift(),
                e = {};
            d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function () {
                f.dequeue(a, b)
            }, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"))
        }
    }), f.fn.extend({
        queue: function (a, c) {
            typeof a != "string" && (c = a, a = "fx");
            if (c === b) return f.queue(this[0], a);
            return this.each(function () {
                var b = f.queue(this, a, c);
                a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
            })
        },
        dequeue: function (a) {
            return this.each(function () {
                f.dequeue(this, a)
            })
        },
        delay: function (a, b) {
            a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx";
            return this.queue(b, function (b, c) {
                var d = setTimeout(b, a);
                c.stop = function () {
                    clearTimeout(d)
                }
            })
        },
        clearQueue: function (a) {
            return this.queue(a || "fx", [])
        },
        promise: function (a, c) {
            function m() {
                --h || d.resolveWith(e, [e])
            }
            typeof a != "string" && (c = a, a = b), a = a || "fx";
            var d = f.Deferred(),
                e = this,
                g = e.length,
                h = 1,
                i = a + "defer",
                j = a + "queue",
                k = a + "mark",
                l;
            while (g--)
                if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) h++, l.add(m);
            m();
            return d.promise()
        }
    });
    var o = /[\n\t\r]/g,
        p = /\s+/,
        q = /\r/g,
        r = /^(?:button|input)$/i,
        s = /^(?:button|input|object|select|textarea)$/i,
        t = /^a(?:rea)?$/i,
        u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        v = f.support.getSetAttribute,
        w, x, y;
    f.fn.extend({
        attr: function (a, b) {
            return f.access(this, a, b, !0, f.attr)
        },
        removeAttr: function (a) {
            return this.each(function () {
                f.removeAttr(this, a)
            })
        },
        prop: function (a, b) {
            return f.access(this, a, b, !0, f.prop)
        },
        removeProp: function (a) {
            a = f.propFix[a] || a;
            return this.each(function () {
                try {
                    this[a] = b, delete this[a]
                } catch (c) {}
            })
        },
        addClass: function (a) {
            var b, c, d, e, g, h, i;
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).addClass(a.call(this, b, this.className))
            });
            if (a && typeof a == "string") {
                b = a.split(p);
                for (c = 0, d = this.length; c < d; c++) {
                    e = this[c];
                    if (e.nodeType === 1)
                        if (!e.className && b.length === 1) e.className = a;
                        else {
                            g = " " + e.className + " ";
                            for (h = 0, i = b.length; h < i; h++)~ g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
                            e.className = f.trim(g)
                        }
                }
            }
            return this
        },
        removeClass: function (a) {
            var c, d, e, g, h, i, j;
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).removeClass(a.call(this, b, this.className))
            });
            if (a && typeof a == "string" || a === b) {
                c = (a || "").split(p);
                for (d = 0, e = this.length; d < e; d++) {
                    g = this[d];
                    if (g.nodeType === 1 && g.className)
                        if (a) {
                            h = (" " + g.className + " ").replace(o, " ");
                            for (i = 0, j = c.length; i < j; i++) h = h.replace(" " + c[i] + " ", " ");
                            g.className = f.trim(h)
                        } else g.className = ""
                }
            }
            return this
        },
        toggleClass: function (a, b) {
            var c = typeof a,
                d = typeof b == "boolean";
            if (f.isFunction(a)) return this.each(function (c) {
                f(this).toggleClass(a.call(this, c, this.className, b), b)
            });
            return this.each(function () {
                if (c === "string") {
                    var e, g = 0,
                        h = f(this),
                        i = b,
                        j = a.split(p);
                    while (e = j[g++]) i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e)
                } else if (c === "undefined" || c === "boolean") this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
            })
        },
        hasClass: function (a) {
            var b = " " + a + " ",
                c = 0,
                d = this.length;
            for (; c < d; c++)
                if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) return !0;
            return !1
        },
        val: function (a) {
            var c, d, e, g = this[0]; {
                if ( !! arguments.length) {
                    e = f.isFunction(a);
                    return this.each(function (d) {
                        var g = f(this),
                            h;
                        if (this.nodeType === 1) {
                            e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function (a) {
                                return a == null ? "" : a + ""
                            })), c = f.valHooks[this.nodeName.toLowerCase()] || f.valHooks[this.type];
                            if (!c || !("set" in c) || c.set(this, h, "value") === b) this.value = h
                        }
                    })
                }
                if (g) {
                    c = f.valHooks[g.nodeName.toLowerCase()] || f.valHooks[g.type];
                    if (c && "get" in c && (d = c.get(g, "value")) !== b) return d;
                    d = g.value;
                    return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d
                }
            }
        }
    }), f.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            },
            select: {
                get: function (a) {
                    var b, c, d, e, g = a.selectedIndex,
                        h = [],
                        i = a.options,
                        j = a.type === "select-one";
                    if (g < 0) return null;
                    c = j ? g : 0, d = j ? g + 1 : i.length;
                    for (; c < d; c++) {
                        e = i[c];
                        if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
                            b = f(e).val();
                            if (j) return b;
                            h.push(b)
                        }
                    }
                    if (j && !h.length && i.length) return f(i[g]).val();
                    return h
                },
                set: function (a, b) {
                    var c = f.makeArray(b);
                    f(a).find("option").each(function () {
                        this.selected = f.inArray(f(this).val(), c) >= 0
                    }), c.length || (a.selectedIndex = -1);
                    return c
                }
            }
        },
        attrFn: {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0
        },
        attr: function (a, c, d, e) {
            var g, h, i, j = a.nodeType;
            if ( !! a && j !== 3 && j !== 8 && j !== 2) {
                if (e && c in f.attrFn) return f(a)[c](d);
                if (typeof a.getAttribute == "undefined") return f.prop(a, c, d);
                i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
                if (d !== b) {
                    if (d === null) {
                        f.removeAttr(a, c);
                        return
                    }
                    if (h && "set" in h && i && (g = h.set(a, d, c)) !== b) return g;
                    a.setAttribute(c, "" + d);
                    return d
                }
                if (h && "get" in h && i && (g = h.get(a, c)) !== null) return g;
                g = a.getAttribute(c);
                return g === null ? b : g
            }
        },
        removeAttr: function (a, b) {
            var c, d, e, g, h = 0;
            if (b && a.nodeType === 1) {
                d = b.toLowerCase().split(p), g = d.length;
                for (; h < g; h++) e = d[h], e && (c = f.propFix[e] || e, f.attr(a, e, ""), a.removeAttribute(v ? e : c), u.test(e) && c in a && (a[c] = !1))
            }
        },
        attrHooks: {
            type: {
                set: function (a, b) {
                    if (r.test(a.nodeName) && a.parentNode) f.error("type property can't be changed");
                    else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
                        var c = a.value;
                        a.setAttribute("type", b), c && (a.value = c);
                        return b
                    }
                }
            },
            value: {
                get: function (a, b) {
                    if (w && f.nodeName(a, "button")) return w.get(a, b);
                    return b in a ? a.value : null
                },
                set: function (a, b, c) {
                    if (w && f.nodeName(a, "button")) return w.set(a, b, c);
                    a.value = b
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (a, c, d) {
            var e, g, h, i = a.nodeType;
            if ( !! a && i !== 3 && i !== 8 && i !== 2) {
                h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]);
                return d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c]
            }
        },
        propHooks: {
            tabIndex: {
                get: function (a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
                }
            }
        }
    }), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
        get: function (a, c) {
            var d, e = f.prop(a, c);
            return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
        },
        set: function (a, b, c) {
            var d;
            b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase()));
            return c
        }
    }, v || (y = {
        name: !0,
        id: !0
    }, w = f.valHooks.button = {
        get: function (a, c) {
            var d;
            d = a.getAttributeNode(c);
            return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
        },
        set: function (a, b, d) {
            var e = a.getAttributeNode(d);
            e || (e = c.createAttribute(d), a.setAttributeNode(e));
            return e.nodeValue = b + ""
        }
    }, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function (a, b) {
        f.attrHooks[b] = f.extend(f.attrHooks[b], {
            set: function (a, c) {
                if (c === "") {
                    a.setAttribute(b, "auto");
                    return c
                }
            }
        })
    }), f.attrHooks.contenteditable = {
        get: w.get,
        set: function (a, b, c) {
            b === "" && (b = "false"), w.set(a, b, c)
        }
    }), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function (a, c) {
        f.attrHooks[c] = f.extend(f.attrHooks[c], {
            get: function (a) {
                var d = a.getAttribute(c, 2);
                return d === null ? b : d
            }
        })
    }), f.support.style || (f.attrHooks.style = {
        get: function (a) {
            return a.style.cssText.toLowerCase() || b
        },
        set: function (a, b) {
            return a.style.cssText = "" + b
        }
    }), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
        get: function (a) {
            var b = a.parentNode;
            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
            return null
        }
    })), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = {
            get: function (a) {
                return a.getAttribute("value") === null ? "on" : a.value
            }
        }
    }), f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = f.extend(f.valHooks[this], {
            set: function (a, b) {
                if (f.isArray(b)) return a.checked = f.inArray(f(a).val(), b) >= 0
            }
        })
    });
    var z = /^(?:textarea|input|select)$/i,
        A = /^([^\.]*)?(?:\.(.+))?$/,
        B = /\bhover(\.\S+)?\b/,
        C = /^key/,
        D = /^(?:mouse|contextmenu)|click/,
        E = /^(?:focusinfocus|focusoutblur)$/,
        F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
        G = function (a) {
            var b = F.exec(a);
            b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
            return b
        }, H = function (a, b) {
            var c = a.attributes || {};
            return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
        }, I = function (a) {
            return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
        };
    f.event = {
        add: function (a, c, d, e, g) {
            var h, i, j, k, l, m, n, o, p, q, r, s;
            if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
                d.handler && (p = d, d = p.handler), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function (a) {
                    return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b
                }, i.elem = a), c = f.trim(I(c)).split(" ");
                for (k = 0; k < c.length; k++) {
                    l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
                        type: m,
                        origType: l[1],
                        data: e,
                        handler: d,
                        guid: d.guid,
                        selector: g,
                        quick: G(g),
                        namespace: n.join(".")
                    }, p), r = j[m];
                    if (!r) {
                        r = j[m] = [], r.delegateCount = 0;
                        if (!s.setup || s.setup.call(a, e, n, i) === !1) a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
                    }
                    s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0
                }
                a = null
            }
        },
        global: {},
        remove: function (a, b, c, d, e) {
            var g = f.hasData(a) && f._data(a),
                h, i, j, k, l, m, n, o, p, q, r, s;
            if ( !! g && !! (o = g.events)) {
                b = f.trim(I(b || "")).split(" ");
                for (h = 0; h < b.length; h++) {
                    i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
                    if (!j) {
                        for (j in o) f.event.remove(a, j + b[h], c, d, !0);
                        continue
                    }
                    p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                    for (n = 0; n < r.length; n++) s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
                    r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j])
                }
                f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0))
            }
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function (c, d, e, g) {
            if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                var h = c.type || c,
                    i = [],
                    j, k, l, m, n, o, p, q, r, s;
                if (E.test(h + f.event.triggered)) return;
                h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
                if ((!e || f.event.customEvent[h]) && !f.event.global[h]) return;
                c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
                if (!e) {
                    j = f.cache;
                    for (l in j) j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
                    return
                }
                c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
                if (p.trigger && p.trigger.apply(e, d) === !1) return;
                r = [
                    [e, p.bindType || h]
                ];
                if (!g && !p.noBubble && !f.isWindow(e)) {
                    s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
                    for (; m; m = m.parentNode) r.push([m, s]), n = m;
                    n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
                }
                for (l = 0; l < r.length && !c.isPropagationStopped(); l++) m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
                c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n));
                return c.result
            }
        },
        dispatch: function (c) {
            c = f.event.fix(c || a.event);
            var d = (f._data(this, "events") || {})[c.type] || [],
                e = d.delegateCount,
                g = [].slice.call(arguments, 0),
                h = !c.exclusive && !c.namespace,
                i = [],
                j, k, l, m, n, o, p, q, r, s, t;
            g[0] = c, c.delegateTarget = this;
            if (e && !c.target.disabled && (!c.button || c.type !== "click")) {
                m = f(this), m.context = this.ownerDocument || this;
                for (l = c.target; l != this; l = l.parentNode || this) {
                    o = {}, q = [], m[0] = l;
                    for (j = 0; j < e; j++) r = d[j], s = r.selector, o[s] === b && (o[s] = r.quick ? H(l, r.quick) : m.is(s)), o[s] && q.push(r);
                    q.length && i.push({
                        elem: l,
                        matches: q
                    })
                }
            }
            d.length > e && i.push({
                elem: this,
                matches: d.slice(e)
            });
            for (j = 0; j < i.length && !c.isPropagationStopped(); j++) {
                p = i[j], c.currentTarget = p.elem;
                for (k = 0; k < p.matches.length && !c.isImmediatePropagationStopped(); k++) {
                    r = p.matches[k];
                    if (h || !c.namespace && !r.namespace || c.namespace_re && c.namespace_re.test(r.namespace)) c.data = r.data, c.handleObj = r, n = ((f.event.special[r.origType] || {}).handle || r.handler).apply(p.elem, g), n !== b && (c.result = n, n === !1 && (c.preventDefault(), c.stopPropagation()))
                }
            }
            return c.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (a, b) {
                a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
                return a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (a, d) {
                var e, f, g, h = d.button,
                    i = d.fromElement;
                a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
                return a
            }
        },
        fix: function (a) {
            if (a[f.expando]) return a;
            var d, e, g = a,
                h = f.event.fixHooks[a.type] || {}, i = h.props ? this.props.concat(h.props) : this.props;
            a = f.Event(g);
            for (d = i.length; d;) e = i[--d], a[e] = g[e];
            a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey);
            return h.filter ? h.filter(a, g) : a
        },
        special: {
            ready: {
                setup: f.bindReady
            },
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function (a, b, c) {
                    f.isWindow(this) && (this.onbeforeunload = c)
                },
                teardown: function (a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function (a, b, c, d) {
            var e = f.extend(new f.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function (a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c)
    }, f.Event = function (a, b) {
        if (!(this instanceof f.Event)) return new f.Event(a, b);
        a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0
    }, f.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = K;
            var a = this.originalEvent;
            !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function () {
            this.isPropagationStopped = K;
            var a = this.originalEvent;
            !a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = K, this.stopPropagation()
        },
        isDefaultPrevented: J,
        isPropagationStopped: J,
        isImmediatePropagationStopped: J
    }, f.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function (a, b) {
        f.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function (a) {
                var c = this,
                    d = a.relatedTarget,
                    e = a.handleObj,
                    g = e.selector,
                    h;
                if (!d || d !== c && !f.contains(c, d)) a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b;
                return h
            }
        }
    }), f.support.submitBubbles || (f.event.special.submit = {
        setup: function () {
            if (f.nodeName(this, "form")) return !1;
            f.event.add(this, "click._submit keypress._submit", function (a) {
                var c = a.target,
                    d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
                d && !d._submit_attached && (f.event.add(d, "submit._submit", function (a) {
                    this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0)
                }), d._submit_attached = !0)
            })
        },
        teardown: function () {
            if (f.nodeName(this, "form")) return !1;
            f.event.remove(this, "._submit")
        }
    }), f.support.changeBubbles || (f.event.special.change = {
        setup: function () {
            if (z.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio") f.event.add(this, "propertychange._change", function (a) {
                    a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                }), f.event.add(this, "click._change", function (a) {
                    this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0))
                });
                return !1
            }
            f.event.add(this, "beforeactivate._change", function (a) {
                var b = a.target;
                z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function (a) {
                    this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
                }), b._change_attached = !0)
            })
        },
        handle: function (a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments)
        },
        teardown: function () {
            f.event.remove(this, "._change");
            return z.test(this.nodeName)
        }
    }), f.support.focusinBubbles || f.each({
        focus: "focusin",
        blur: "focusout"
    }, function (a, b) {
        var d = 0,
            e = function (a) {
                f.event.simulate(b, a.target, f.event.fix(a), !0)
            };
        f.event.special[b] = {
            setup: function () {
                d++ === 0 && c.addEventListener(a, e, !0)
            },
            teardown: function () {
                --d === 0 && c.removeEventListener(a, e, !0)
            }
        }
    }), f.fn.extend({
        on: function (a, c, d, e, g) {
            var h, i;
            if (typeof a == "object") {
                typeof c != "string" && (d = c, c = b);
                for (i in a) this.on(i, c, d, a[i], g);
                return this
            }
            d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
            if (e === !1) e = J;
            else if (!e) return this;
            g === 1 && (h = e, e = function (a) {
                f().off(a);
                return h.apply(this, arguments)
            }, e.guid = h.guid || (h.guid = f.guid++));
            return this.each(function () {
                f.event.add(this, a, e, d, c)
            })
        },
        one: function (a, b, c, d) {
            return this.on.call(this, a, b, c, d, 1)
        },
        off: function (a, c, d) {
            if (a && a.preventDefault && a.handleObj) {
                var e = a.handleObj;
                f(a.delegateTarget).off(e.namespace ? e.type + "." + e.namespace : e.type, e.selector, e.handler);
                return this
            }
            if (typeof a == "object") {
                for (var g in a) this.off(g, c, a[g]);
                return this
            }
            if (c === !1 || typeof c == "function") d = c, c = b;
            d === !1 && (d = J);
            return this.each(function () {
                f.event.remove(this, a, d, c)
            })
        },
        bind: function (a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function (a, b) {
            return this.off(a, null, b)
        },
        live: function (a, b, c) {
            f(this.context).on(a, this.selector, b, c);
            return this
        },
        die: function (a, b) {
            f(this.context).off(a, this.selector || "**", b);
            return this
        },
        delegate: function (a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function (a, b, c) {
            return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
        },
        trigger: function (a, b) {
            return this.each(function () {
                f.event.trigger(a, b, this)
            })
        },
        triggerHandler: function (a, b) {
            if (this[0]) return f.event.trigger(a, b, this[0], !0)
        },
        toggle: function (a) {
            var b = arguments,
                c = a.guid || f.guid++,
                d = 0,
                e = function (c) {
                    var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
                    f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault();
                    return b[e].apply(this, arguments) || !1
                };
            e.guid = c;
            while (d < b.length) b[d++].guid = c;
            return this.click(e)
        },
        hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    }), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        f.fn[b] = function (a, c) {
            c == null && (c = a, a = null);
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
    }),
        function () {
            function x(a, b, c, e, f, g) {
                for (var h = 0, i = e.length; h < i; h++) {
                    var j = e[h];
                    if (j) {
                        var k = !1;
                        j = j[a];
                        while (j) {
                            if (j[d] === c) {
                                k = e[j.sizset];
                                break
                            }
                            if (j.nodeType === 1) {
                                g || (j[d] = c, j.sizset = h);
                                if (typeof b != "string") {
                                    if (j === b) {
                                        k = !0;
                                        break
                                    }
                                } else if (m.filter(b, [j]).length > 0) {
                                    k = j;
                                    break
                                }
                            }
                            j = j[a]
                        }
                        e[h] = k
                    }
                }
            }

            function w(a, b, c, e, f, g) {
                for (var h = 0, i = e.length; h < i; h++) {
                    var j = e[h];
                    if (j) {
                        var k = !1;
                        j = j[a];
                        while (j) {
                            if (j[d] === c) {
                                k = e[j.sizset];
                                break
                            }
                            j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
                            if (j.nodeName.toLowerCase() === b) {
                                k = j;
                                break
                            }
                            j = j[a]
                        }
                        e[h] = k
                    }
                }
            }
            var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|[""][^'"]*[""]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
                d = "sizcache" + (Math.random() + "").replace(".", ""),
                e = 0,
                g = Object.prototype.toString,
                h = !1,
                i = !0,
                j = /\\/g,
                k = /\r\n/g,
                l = /\W/;
            [0, 0].sort(function () {
                i = !1;
                return 0
            });
            var m = function (b, d, e, f) {
                e = e || [], d = d || c;
                var h = d;
                if (d.nodeType !== 1 && d.nodeType !== 9) return [];
                if (!b || typeof b != "string") return e;
                var i, j, k, l, n, q, r, t, u = !0,
                    v = m.isXML(d),
                    w = [],
                    x = b;
                do {
                    a.exec(""), i = a.exec(x);
                    if (i) {
                        x = i[3], w.push(i[1]);
                        if (i[2]) {
                            l = i[3];
                            break
                        }
                    }
                } while (i);
                if (w.length > 1 && p.exec(b))
                    if (w.length === 2 && o.relative[w[0]]) j = y(w[0] + w[1], d, f);
                    else {
                        j = o.relative[w[0]] ? [d] : m(w.shift(), d);
                        while (w.length) b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f)
                    } else {
                    !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
                    if (d) {
                        n = f ? {
                            expr: w.pop(),
                            set: s(f)
                        } : m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
                        while (w.length) q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v)
                    } else k = w = []
                }
                k || (k = j), k || m.error(q || b);
                if (g.call(k) === "[object Array]")
                    if (!u) e.push.apply(e, k);
                    else if (d && d.nodeType === 1)
                        for (t = 0; k[t] != null; t++) k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]);
                    else
                        for (t = 0; k[t] != null; t++) k[t] && k[t].nodeType === 1 && e.push(j[t]);
                else s(k, e);
                l && (m(l, h, e, f), m.uniqueSort(e));
                return e
            };
            m.uniqueSort = function (a) {
                if (u) {
                    h = i, a.sort(u);
                    if (h)
                        for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1)
                }
                return a
            }, m.matches = function (a, b) {
                return m(a, null, null, b)
            }, m.matchesSelector = function (a, b) {
                return m(b, null, null, [a]).length > 0
            }, m.find = function (a, b, c) {
                var d, e, f, g, h, i;
                if (!a) return [];
                for (e = 0, f = o.order.length; e < f; e++) {
                    h = o.order[e];
                    if (g = o.leftMatch[h].exec(a)) {
                        i = g[1], g.splice(1, 1);
                        if (i.substr(i.length - 1) !== "\\") {
                            g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
                            if (d != null) {
                                a = a.replace(o.match[h], "");
                                break
                            }
                        }
                    }
                }
                d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
                return {
                    set: d,
                    expr: a
                }
            }, m.filter = function (a, c, d, e) {
                var f, g, h, i, j, k, l, n, p, q = a,
                    r = [],
                    s = c,
                    t = c && c[0] && m.isXML(c[0]);
                while (a && c.length) {
                    for (h in o.filter)
                        if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
                            k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
                            if (l.substr(l.length - 1) === "\\") continue;
                            s === r && (r = []);
                            if (o.preFilter[h]) {
                                f = o.preFilter[h](f, s, d, r, e, t);
                                if (!f) g = i = !0;
                                else if (f === !0) continue
                            }
                            if (f)
                                for (n = 0;
                                     (j = s[n]) != null; n++) j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
                            if (i !== b) {
                                d || (s = r), a = a.replace(o.match[h], "");
                                if (!g) return [];
                                break
                            }
                        }
                    if (a === q)
                        if (g == null) m.error(a);
                        else break;
                    q = a
                }
                return s
            }, m.error = function (a) {
                throw new Error("Syntax error, unrecognized expression: " + a)
            };
            var n = m.getText = function (a) {
                    var b, c, d = a.nodeType,
                        e = "";
                    if (d) {
                        if (d === 1 || d === 9) {
                            if (typeof a.textContent == "string") return a.textContent;
                            if (typeof a.innerText == "string") return a.innerText.replace(k, "");
                            for (a = a.firstChild; a; a = a.nextSibling) e += n(a)
                        } else if (d === 3 || d === 4) return a.nodeValue
                    } else
                        for (b = 0; c = a[b]; b++) c.nodeType !== 8 && (e += n(c));
                    return e
                }, o = m.selectors = {
                    order: ["ID", "NAME", "TAG"],
                    match: {
                        ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                        CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                        NAME: /\[name=[""]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)[""]*\]/,
                        ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:([""])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                        TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                        CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                        POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                        PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\(([""]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                    },
                    leftMatch: {},
                    attrMap: {
                        "class": "className",
                        "for": "htmlFor"
                    },
                    attrHandle: {
                        href: function (a) {
                            return a.getAttribute("href")
                        },
                        type: function (a) {
                            return a.getAttribute("type")
                        }
                    },
                    relative: {
                        "+": function (a, b) {
                            var c = typeof b == "string",
                                d = c && !l.test(b),
                                e = c && !d;
                            d && (b = b.toLowerCase());
                            for (var f = 0, g = a.length, h; f < g; f++)
                                if (h = a[f]) {
                                    while ((h = h.previousSibling) && h.nodeType !== 1);
                                    a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
                                }
                            e && m.filter(b, a, !0)
                        },
                        ">": function (a, b) {
                            var c, d = typeof b == "string",
                                e = 0,
                                f = a.length;
                            if (d && !l.test(b)) {
                                b = b.toLowerCase();
                                for (; e < f; e++) {
                                    c = a[e];
                                    if (c) {
                                        var g = c.parentNode;
                                        a[e] = g.nodeName.toLowerCase() === b ? g : !1
                                    }
                                }
                            } else {
                                for (; e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
                                d && m.filter(b, a, !0)
                            }
                        },
                        "": function (a, b, c) {
                            var d, f = e++,
                                g = x;
                            typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c)
                        },
                        "~": function (a, b, c) {
                            var d, f = e++,
                                g = x;
                            typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c)
                        }
                    },
                    find: {
                        ID: function (a, b, c) {
                            if (typeof b.getElementById != "undefined" && !c) {
                                var d = b.getElementById(a[1]);
                                return d && d.parentNode ? [d] : []
                            }
                        },
                        NAME: function (a, b) {
                            if (typeof b.getElementsByName != "undefined") {
                                var c = [],
                                    d = b.getElementsByName(a[1]);
                                for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
                                return c.length === 0 ? null : c
                            }
                        },
                        TAG: function (a, b) {
                            if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1])
                        }
                    },
                    preFilter: {
                        CLASS: function (a, b, c, d, e, f) {
                            a = " " + a[1].replace(j, "") + " ";
                            if (f) return a;
                            for (var g = 0, h;
                                 (h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                            return !1
                        },
                        ID: function (a) {
                            return a[1].replace(j, "")
                        },
                        TAG: function (a, b) {
                            return a[1].replace(j, "").toLowerCase()
                        },
                        CHILD: function (a) {
                            if (a[1] === "nth") {
                                a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                                var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                                a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
                            } else a[2] && m.error(a[0]);
                            a[0] = e++;
                            return a
                        },
                        ATTR: function (a, b, c, d, e, f) {
                            var g = a[1] = a[1].replace(j, "");
                            !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " ");
                            return a
                        },
                        PSEUDO: function (b, c, d, e, f) {
                            if (b[1] === "not")
                                if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) b[3] = m(b[3], null, null, c);
                                else {
                                    var g = m.filter(b[3], c, d, !0 ^ f);
                                    d || e.push.apply(e, g);
                                    return !1
                                } else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) return !0;
                            return b
                        },
                        POS: function (a) {
                            a.unshift(!0);
                            return a
                        }
                    },
                    filters: {
                        enabled: function (a) {
                            return a.disabled === !1 && a.type !== "hidden"
                        },
                        disabled: function (a) {
                            return a.disabled === !0
                        },
                        checked: function (a) {
                            return a.checked === !0
                        },
                        selected: function (a) {
                            a.parentNode && a.parentNode.selectedIndex;
                            return a.selected === !0
                        },
                        parent: function (a) {
                            return !!a.firstChild
                        },
                        empty: function (a) {
                            return !a.firstChild
                        },
                        has: function (a, b, c) {
                            return !!m(c[3], a).length
                        },
                        header: function (a) {
                            return /h\d/i.test(a.nodeName)
                        },
                        text: function (a) {
                            var b = a.getAttribute("type"),
                                c = a.type;
                            return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
                        },
                        radio: function (a) {
                            return a.nodeName.toLowerCase() === "input" && "radio" === a.type
                        },
                        checkbox: function (a) {
                            return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
                        },
                        file: function (a) {
                            return a.nodeName.toLowerCase() === "input" && "file" === a.type
                        },
                        password: function (a) {
                            return a.nodeName.toLowerCase() === "input" && "password" === a.type
                        },
                        submit: function (a) {
                            var b = a.nodeName.toLowerCase();
                            return (b === "input" || b === "button") && "submit" === a.type
                        },
                        image: function (a) {
                            return a.nodeName.toLowerCase() === "input" && "image" === a.type
                        },
                        reset: function (a) {
                            var b = a.nodeName.toLowerCase();
                            return (b === "input" || b === "button") && "reset" === a.type
                        },
                        button: function (a) {
                            var b = a.nodeName.toLowerCase();
                            return b === "input" && "button" === a.type || b === "button"
                        },
                        input: function (a) {
                            return /input|select|textarea|button/i.test(a.nodeName)
                        },
                        focus: function (a) {
                            return a === a.ownerDocument.activeElement
                        }
                    },
                    setFilters: {
                        first: function (a, b) {
                            return b === 0
                        },
                        last: function (a, b, c, d) {
                            return b === d.length - 1
                        },
                        even: function (a, b) {
                            return b % 2 === 0
                        },
                        odd: function (a, b) {
                            return b % 2 === 1
                        },
                        lt: function (a, b, c) {
                            return b < c[3] - 0
                        },
                        gt: function (a, b, c) {
                            return b > c[3] - 0
                        },
                        nth: function (a, b, c) {
                            return c[3] - 0 === b
                        },
                        eq: function (a, b, c) {
                            return c[3] - 0 === b
                        }
                    },
                    filter: {
                        PSEUDO: function (a, b, c, d) {
                            var e = b[1],
                                f = o.filters[e];
                            if (f) return f(a, c, b, d);
                            if (e === "contains") return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
                            if (e === "not") {
                                var g = b[3];
                                for (var h = 0, i = g.length; h < i; h++)
                                    if (g[h] === a) return !1;
                                return !0
                            }
                            m.error(e)
                        },
                        CHILD: function (a, b) {
                            var c, e, f, g, h, i, j, k = b[1],
                                l = a;
                            switch (k) {
                                case "only":
                                case "first":
                                    while (l = l.previousSibling)
                                        if (l.nodeType === 1) return !1;
                                    if (k === "first") return !0;
                                    l = a;
                                case "last":
                                    while (l = l.nextSibling)
                                        if (l.nodeType === 1) return !1;
                                    return !0;
                                case "nth":
                                    c = b[2], e = b[3];
                                    if (c === 1 && e === 0) return !0;
                                    f = b[0], g = a.parentNode;
                                    if (g && (g[d] !== f || !a.nodeIndex)) {
                                        i = 0;
                                        for (l = g.firstChild; l; l = l.nextSibling) l.nodeType === 1 && (l.nodeIndex = ++i);
                                        g[d] = f
                                    }
                                    j = a.nodeIndex - e;
                                    return c === 0 ? j === 0 : j % c === 0 && j / c >= 0
                            }
                        },
                        ID: function (a, b) {
                            return a.nodeType === 1 && a.getAttribute("id") === b
                        },
                        TAG: function (a, b) {
                            return b === "*" && a.nodeType === 1 || !! a.nodeName && a.nodeName.toLowerCase() === b
                        },
                        CLASS: function (a, b) {
                            return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                        },
                        ATTR: function (a, b) {
                            var c = b[1],
                                d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
                                e = d + "",
                                f = b[2],
                                g = b[4];
                            return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
                        },
                        POS: function (a, b, c, d) {
                            var e = b[2],
                                f = o.setFilters[e];
                            if (f) return f(a, c, b, d)
                        }
                    }
                }, p = o.match.POS,
                q = function (a, b) {
                    return "\\" + (b - 0 + 1)
                };
            for (var r in o.match) o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
            var s = function (a, b) {
                a = Array.prototype.slice.call(a, 0);
                if (b) {
                    b.push.apply(b, a);
                    return b
                }
                return a
            };
            try {
                Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
            } catch (t) {
                s = function (a, b) {
                    var c = 0,
                        d = b || [];
                    if (g.call(a) === "[object Array]") Array.prototype.push.apply(d, a);
                    else if (typeof a.length == "number")
                        for (var e = a.length; c < e; c++) d.push(a[c]);
                    else
                        for (; a[c]; c++) d.push(a[c]);
                    return d
                }
            }
            var u, v;
            c.documentElement.compareDocumentPosition ? u = function (a, b) {
                if (a === b) {
                    h = !0;
                    return 0
                }
                if (!a.compareDocumentPosition || !b.compareDocumentPosition) return a.compareDocumentPosition ? -1 : 1;
                return a.compareDocumentPosition(b) & 4 ? -1 : 1
            } : (u = function (a, b) {
                if (a === b) {
                    h = !0;
                    return 0
                }
                if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
                var c, d, e = [],
                    f = [],
                    g = a.parentNode,
                    i = b.parentNode,
                    j = g;
                if (g === i) return v(a, b);
                if (!g) return -1;
                if (!i) return 1;
                while (j) e.unshift(j), j = j.parentNode;
                j = i;
                while (j) f.unshift(j), j = j.parentNode;
                c = e.length, d = f.length;
                for (var k = 0; k < c && k < d; k++)
                    if (e[k] !== f[k]) return v(e[k], f[k]);
                return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
            }, v = function (a, b, c) {
                if (a === b) return c;
                var d = a.nextSibling;
                while (d) {
                    if (d === b) return -1;
                    d = d.nextSibling
                }
                return 1
            }),
                function () {
                    var a = c.createElement("div"),
                        d = "script" + (new Date).getTime(),
                        e = c.documentElement;
                    a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function (a, c, d) {
                        if (typeof c.getElementById != "undefined" && !d) {
                            var e = c.getElementById(a[1]);
                            return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                        }
                    }, o.filter.ID = function (a, b) {
                        var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                        return a.nodeType === 1 && c && c.nodeValue === b
                    }), e.removeChild(a), e = a = null
                }(),
                function () {
                    var a = c.createElement("div");
                    a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function (a, b) {
                        var c = b.getElementsByTagName(a[1]);
                        if (a[1] === "*") {
                            var d = [];
                            for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
                            c = d
                        }
                        return c
                    }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function (a) {
                        return a.getAttribute("href", 2)
                    }), a = null
                }(), c.querySelectorAll && function () {
                var a = m,
                    b = c.createElement("div"),
                    d = "__sizzle__";
                b.innerHTML = "<p class='TEST'></p>";
                if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
                    m = function (b, e, f, g) {
                        e = e || c;
                        if (!g && !m.isXML(e)) {
                            var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                            if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                                if (h[1]) return s(e.getElementsByTagName(b), f);
                                if (h[2] && o.find.CLASS && e.getElementsByClassName) return s(e.getElementsByClassName(h[2]), f)
                            }
                            if (e.nodeType === 9) {
                                if (b === "body" && e.body) return s([e.body], f);
                                if (h && h[3]) {
                                    var i = e.getElementById(h[3]);
                                    if (!i || !i.parentNode) return s([], f);
                                    if (i.id === h[3]) return s([i], f)
                                }
                                try {
                                    return s(e.querySelectorAll(b), f)
                                } catch (j) {}
                            } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                                var k = e,
                                    l = e.getAttribute("id"),
                                    n = l || d,
                                    p = e.parentNode,
                                    q = /^\s*[+~]/.test(b);
                                l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
                                try {
                                    if (!q || p) return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
                                } catch (r) {} finally {
                                    l || k.removeAttribute("id")
                                }
                            }
                        }
                        return a(b, e, f, g)
                    };
                    for (var e in a) m[e] = a[e];
                    b = null
                }
            }(),
                function () {
                    var a = c.documentElement,
                        b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
                    if (b) {
                        var d = !b.call(c.createElement("div"), "div"),
                            e = !1;
                        try {
                            b.call(c.documentElement, "[test!='']:sizzle")
                        } catch (f) {
                            e = !0
                        }
                        m.matchesSelector = function (a, c) {
                            c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                            if (!m.isXML(a)) try {
                                if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                                    var f = b.call(a, c);
                                    if (f || !d || a.document && a.document.nodeType !== 11) return f
                                }
                            } catch (g) {}
                            return m(c, null, null, [a]).length > 0
                        }
                    }
                }(),
                function () {
                    var a = c.createElement("div");
                    a.innerHTML = "<div class='test e'></div><div class='test'></div>";
                    if ( !! a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
                        a.lastChild.className = "e";
                        if (a.getElementsByClassName("e").length === 1) return;
                        o.order.splice(1, 0, "CLASS"), o.find.CLASS = function (a, b, c) {
                            if (typeof b.getElementsByClassName != "undefined" && !c) return b.getElementsByClassName(a[1])
                        }, a = null
                    }
                }(), c.documentElement.contains ? m.contains = function (a, b) {
                return a !== b && (a.contains ? a.contains(b) : !0)
            } : c.documentElement.compareDocumentPosition ? m.contains = function (a, b) {
                return !!(a.compareDocumentPosition(b) & 16)
            } : m.contains = function () {
                return !1
            }, m.isXML = function (a) {
                var b = (a ? a.ownerDocument || a : 0).documentElement;
                return b ? b.nodeName !== "HTML" : !1
            };
            var y = function (a, b, c) {
                var d, e = [],
                    f = "",
                    g = b.nodeType ? [b] : b;
                while (d = o.match.PSEUDO.exec(a)) f += d[0], a = a.replace(o.match.PSEUDO, "");
                a = o.relative[a] ? a + "*" : a;
                for (var h = 0, i = g.length; h < i; h++) m(a, g[h], e, c);
                return m.filter(f, e)
            };
            m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains
        }();
    var L = /Until$/,
        M = /^(?:parents|prevUntil|prevAll)/,
        N = /,/,
        O = /^.[^:#\[\.,]*$/,
        P = Array.prototype.slice,
        Q = f.expr.match.POS,
        R = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    f.fn.extend({
        find: function (a) {
            var b = this,
                c, d;
            if (typeof a != "string") return f(a).filter(function () {
                for (c = 0, d = b.length; c < d; c++)
                    if (f.contains(b[c], this)) return !0
            });
            var e = this.pushStack("", "find", a),
                g, h, i;
            for (c = 0, d = this.length; c < d; c++) {
                g = e.length, f.find(a, this[c], e);
                if (c > 0)
                    for (h = g; h < e.length; h++)
                        for (i = 0; i < g; i++)
                            if (e[i] === e[h]) {
                                e.splice(h--, 1);
                                break
                            }
            }
            return e
        },
        has: function (a) {
            var b = f(a);
            return this.filter(function () {
                for (var a = 0, c = b.length; a < c; a++)
                    if (f.contains(this, b[a])) return !0
            })
        },
        not: function (a) {
            return this.pushStack(T(this, a, !1), "not", a)
        },
        filter: function (a) {
            return this.pushStack(T(this, a, !0), "filter", a)
        },
        is: function (a) {
            return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
        },
        closest: function (a, b) {
            var c = [],
                d, e, g = this[0];
            if (f.isArray(a)) {
                var h = 1;
                while (g && g.ownerDocument && g !== b) {
                    for (d = 0; d < a.length; d++) f(g).is(a[d]) && c.push({
                        selector: a[d],
                        elem: g,
                        level: h
                    });
                    g = g.parentNode, h++
                }
                return c
            }
            var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
            for (d = 0, e = this.length; d < e; d++) {
                g = this[d];
                while (g) {
                    if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                        c.push(g);
                        break
                    }
                    g = g.parentNode;
                    if (!g || !g.ownerDocument || g === b || g.nodeType === 11) break
                }
            }
            c = c.length > 1 ? f.unique(c) : c;
            return this.pushStack(c, "closest", a)
        },
        index: function (a) {
            if (!a) return this[0] && this[0].parentNode ? this.prevAll().length : -1;
            if (typeof a == "string") return f.inArray(this[0], f(a));
            return f.inArray(a.jquery ? a[0] : a, this)
        },
        add: function (a, b) {
            var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a),
                d = f.merge(this.get(), c);
            return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
        },
        andSelf: function () {
            return this.add(this.prevObject)
        }
    }), f.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null
        },
        parents: function (a) {
            return f.dir(a, "parentNode")
        },
        parentsUntil: function (a, b, c) {
            return f.dir(a, "parentNode", c)
        },
        next: function (a) {
            return f.nth(a, 2, "nextSibling")
        },
        prev: function (a) {
            return f.nth(a, 2, "previousSibling")
        },
        nextAll: function (a) {
            return f.dir(a, "nextSibling")
        },
        prevAll: function (a) {
            return f.dir(a, "previousSibling")
        },
        nextUntil: function (a, b, c) {
            return f.dir(a, "nextSibling", c)
        },
        prevUntil: function (a, b, c) {
            return f.dir(a, "previousSibling", c)
        },
        siblings: function (a) {
            return f.sibling(a.parentNode.firstChild, a)
        },
        children: function (a) {
            return f.sibling(a.firstChild)
        },
        contents: function (a) {
            return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
        }
    }, function (a, b) {
        f.fn[a] = function (c, d) {
            var e = f.map(this, b, c);
            L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
            return this.pushStack(e, a, P.call(arguments).join(","))
        }
    }), f.extend({
        filter: function (a, b, c) {
            c && (a = ":not(" + a + ")");
            return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
        },
        dir: function (a, c, d) {
            var e = [],
                g = a[c];
            while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) g.nodeType === 1 && e.push(g), g = g[c];
            return e
        },
        nth: function (a, b, c, d) {
            b = b || 1;
            var e = 0;
            for (; a; a = a[c])
                if (a.nodeType === 1 && ++e === b) break;
            return a
        },
        sibling: function (a, b) {
            var c = [];
            for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
            return c
        }
    });
    var V = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        W = / jQuery\d+="(?:\d+|null)"/g,
        X = /^\s+/,
        Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        Z = /<([\w:]+)/,
        $ = /<tbody/i,
        _ = /<|&#?\w+;/,
        ba = /<(?:script|style)/i,
        bb = /<(?:script|object|embed|option|style)/i,
        bc = new RegExp("<(?:" + V + ")", "i"),
        bd = /checked\s*(?:[^=]|=\s*.checked.)/i,
        be = /\/(java|ecma)script/i,
        bf = /^\s*<!(?:\[CDATA\[|\-\-)/,
        bg = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        }, bh = U(c);
    bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]), f.fn.extend({
        text: function (a) {
            if (f.isFunction(a)) return this.each(function (b) {
                var c = f(this);
                c.text(a.call(this, b, c.text()))
            });
            if (typeof a != "object" && a !== b) return this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a));
            return f.text(this)
        },
        wrapAll: function (a) {
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                    var a = this;
                    while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function (a) {
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).wrapInner(a.call(this, b))
            });
            return this.each(function () {
                var b = f(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function (a) {
            var b = f.isFunction(a);
            return this.each(function (c) {
                f(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.appendChild(a)
            })
        },
        prepend: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild)
            })
        },
        before: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this)
            });
            if (arguments.length) {
                var a = f.clean(arguments);
                a.push.apply(a, this.toArray());
                return this.pushStack(a, "before", arguments)
            }
        },
        after: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            });
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                a.push.apply(a, f.clean(arguments));
                return a
            }
        },
        remove: function (a, b) {
            for (var c = 0, d;
                 (d = this[c]) != null; c++)
                if (!a || f.filter(a, [d]).length)!b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
            return this
        },
        empty: function () {
            for (var a = 0, b;
                 (b = this[a]) != null; a++) {
                b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
                while (b.firstChild) b.removeChild(b.firstChild)
            }
            return this
        },
        clone: function (a, b) {
            a = a == null ? !1 : a, b = b == null ? a : b;
            return this.map(function () {
                return f.clone(this, a, b)
            })
        },
        html: function (a) {
            if (a === b) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(W, "") : null;
            if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
                a = a.replace(Y, "<$1></$2>");
                try {
                    for (var c = 0, d = this.length; c < d; c++) this[c].nodeType === 1 && (f.cleanData(this[c].getElementsByTagName("*")), this[c].innerHTML = a)
                } catch (e) {
                    this.empty().append(a)
                }
            } else f.isFunction(a) ? this.each(function (b) {
                var c = f(this);
                c.html(a.call(this, b, c.html()))
            }) : this.empty().append(a);
            return this
        },
        replaceWith: function (a) {
            if (this[0] && this[0].parentNode) {
                if (f.isFunction(a)) return this.each(function (b) {
                    var c = f(this),
                        d = c.html();
                    c.replaceWith(a.call(this, b, d))
                });
                typeof a != "string" && (a = f(a).detach());
                return this.each(function () {
                    var b = this.nextSibling,
                        c = this.parentNode;
                    f(this).remove(), b ? f(b).before(a) : f(c).append(a)
                })
            }
            return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
        },
        detach: function (a) {
            return this.remove(a, !0)
        },
        domManip: function (a, c, d) {
            var e, g, h, i, j = a[0],
                k = [];
            if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j)) return this.each(function () {
                f(this).domManip(a, c, d, !0)
            });
            if (f.isFunction(j)) return this.each(function (e) {
                var g = f(this);
                a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d)
            });
            if (this[0]) {
                i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {
                    fragment: i
                } : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
                if (g) {
                    c = c && f.nodeName(g, "tr");
                    for (var l = 0, m = this.length, n = m - 1; l < m; l++) d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
                }
                k.length && f.each(k, bp)
            }
            return this
        }
    }), f.buildFragment = function (a, b, d) {
        var e, g, h, i, j = a[0];
        b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1);
        return {
            fragment: e,
            cacheable: g
        }
    }, f.fragments = {}, f.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        f.fn[a] = function (c) {
            var d = [],
                e = f(c),
                g = this.length === 1 && this[0].parentNode;
            if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
                e[b](this[0]);
                return this
            }
            for (var h = 0, i = e.length; h < i; h++) {
                var j = (h > 0 ? this.clone(!0) : this).get();
                f(e[h])[b](j), d = d.concat(j)
            }
            return this.pushStack(d, a, e.selector)
        }
    }), f.extend({
        clone: function (a, b, c) {
            var d, e, g, h = f.support.html5Clone || !bc.test("<" + a.nodeName) ? a.cloneNode(!0) : bo(a);
            if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
                bk(a, h), d = bl(a), e = bl(h);
                for (g = 0; d[g]; ++g) e[g] && bk(d[g], e[g])
            }
            if (b) {
                bj(a, h);
                if (c) {
                    d = bl(a), e = bl(h);
                    for (g = 0; d[g]; ++g) bj(d[g], e[g])
                }
            }
            d = e = null;
            return h
        },
        clean: function (a, b, d, e) {
            var g;
            b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
            var h = [],
                i;
            for (var j = 0, k;
                 (k = a[j]) != null; j++) {
                typeof k == "number" && (k += "");
                if (!k) continue;
                if (typeof k == "string")
                    if (!_.test(k)) k = b.createTextNode(k);
                    else {
                        k = k.replace(Y, "<$1></$2>");
                        var l = (Z.exec(k) || ["", ""])[1].toLowerCase(),
                            m = bg[l] || bg._default,
                            n = m[0],
                            o = b.createElement("div");
                        b === c ? bh.appendChild(o) : U(b).appendChild(o), o.innerHTML = m[1] + k + m[2];
                        while (n--) o = o.lastChild;
                        if (!f.support.tbody) {
                            var p = $.test(k),
                                q = l === "table" && !p ? o.firstChild && o.firstChild.childNodes : m[1] === "<table>" && !p ? o.childNodes : [];
                            for (i = q.length - 1; i >= 0; --i) f.nodeName(q[i], "tbody") && !q[i].childNodes.length && q[i].parentNode.removeChild(q[i])
                        }!f.support.leadingWhitespace && X.test(k) && o.insertBefore(b.createTextNode(X.exec(k)[0]), o.firstChild), k = o.childNodes
                    }
                var r;
                if (!f.support.appendChecked)
                    if (k[0] && typeof (r = k.length) == "number")
                        for (i = 0; i < r; i++) bn(k[i]);
                    else bn(k);
                k.nodeType ? h.push(k) : h = f.merge(h, k)
            }
            if (d) {
                g = function (a) {
                    return !a.type || be.test(a.type)
                };
                for (j = 0; h[j]; j++)
                    if (e && f.nodeName(h[j], "script") && (!h[j].type || h[j].type.toLowerCase() === "text/javascript")) e.push(h[j].parentNode ? h[j].parentNode.removeChild(h[j]) : h[j]);
                    else {
                        if (h[j].nodeType === 1) {
                            var s = f.grep(h[j].getElementsByTagName("script"), g);
                            h.splice.apply(h, [j + 1, 0].concat(s))
                        }
                        d.appendChild(h[j])
                    }
            }
            return h
        },
        cleanData: function (a) {
            var b, c, d = f.cache,
                e = f.event.special,
                g = f.support.deleteExpando;
            for (var h = 0, i;
                 (i = a[h]) != null; h++) {
                if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) continue;
                c = i[f.expando];
                if (c) {
                    b = d[c];
                    if (b && b.events) {
                        for (var j in b.events) e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
                        b.handle && (b.handle.elem = null)
                    }
                    g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c]
                }
            }
        }
    });
    var bq = /alpha\([^)]*\)/i,
        br = /opacity=([^)]*)/,
        bs = /([A-Z]|^ms)/g,
        bt = /^-?\d+(?:px)?$/i,
        bu = /^-?\d/,
        bv = /^([\-+])=([\-+.\de]+)/,
        bw = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, bx = ["Left", "Right"],
        by = ["Top", "Bottom"],
        bz, bA, bB;
    f.fn.css = function (a, c) {
        if (arguments.length === 2 && c === b) return this;
        return f.access(this, a, c, !0, function (a, c, d) {
            return d !== b ? f.style(a, c, d) : f.css(a, c)
        })
    }, f.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = bz(a, "opacity", "opacity");
                        return c === "" ? "1" : c
                    }
                    return a.style.opacity
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": f.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function (a, c, d, e) {
            if ( !! a && a.nodeType !== 3 && a.nodeType !== 8 && !! a.style) {
                var g, h, i = f.camelCase(c),
                    j = a.style,
                    k = f.cssHooks[i];
                c = f.cssProps[i] || i;
                if (d === b) {
                    if (k && "get" in k && (g = k.get(a, !1, e)) !== b) return g;
                    return j[c]
                }
                h = typeof d, h === "string" && (g = bv.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
                if (d == null || h === "number" && isNaN(d)) return;
                h === "number" && !f.cssNumber[i] && (d += "px");
                if (!k || !("set" in k) || (d = k.set(a, d)) !== b) try {
                    j[c] = d
                } catch (l) {}
            }
        },
        css: function (a, c, d) {
            var e, g;
            c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
            if (g && "get" in g && (e = g.get(a, !0, d)) !== b) return e;
            if (bz) return bz(a, c)
        },
        swap: function (a, b, c) {
            var d = {};
            for (var e in b) d[e] = a.style[e], a.style[e] = b[e];
            c.call(a);
            for (e in b) a.style[e] = d[e]
        }
    }), f.curCSS = f.css, f.each(["height", "width"], function (a, b) {
        f.cssHooks[b] = {
            get: function (a, c, d) {
                var e;
                if (c) {
                    if (a.offsetWidth !== 0) return bC(a, b, d);
                    f.swap(a, bw, function () {
                        e = bC(a, b, d)
                    });
                    return e
                }
            },
            set: function (a, b) {
                if (!bt.test(b)) return b;
                b = parseFloat(b);
                if (b >= 0) return b + "px"
            }
        }
    }), f.support.opacity || (f.cssHooks.opacity = {
        get: function (a, b) {
            return br.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
        },
        set: function (a, b) {
            var c = a.style,
                d = a.currentStyle,
                e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
                g = d && d.filter || c.filter || "";
            c.zoom = 1;
            if (b >= 1 && f.trim(g.replace(bq, "")) === "") {
                c.removeAttribute("filter");
                if (d && !d.filter) return
            }
            c.filter = bq.test(g) ? g.replace(bq, e) : g + " " + e
        }
    }), f(function () {
        f.support.reliableMarginRight || (f.cssHooks.marginRight = {
            get: function (a, b) {
                var c;
                f.swap(a, {
                    display: "inline-block"
                }, function () {
                    b ? c = bz(a, "margin-right", "marginRight") : c = a.style.marginRight
                });
                return c
            }
        })
    }), c.defaultView && c.defaultView.getComputedStyle && (bA = function (a, b) {
        var c, d, e;
        b = b.replace(bs, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b)));
        return c
    }), c.documentElement.currentStyle && (bB = function (a, b) {
        var c, d, e, f = a.currentStyle && a.currentStyle[b],
            g = a.style;
        f === null && g && (e = g[b]) && (f = e), !bt.test(f) && bu.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f || 0, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d));
        return f === "" ? "auto" : f
    }), bz = bA || bB, f.expr && f.expr.filters && (f.expr.filters.hidden = function (a) {
        var b = a.offsetWidth,
            c = a.offsetHeight;
        return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
    }, f.expr.filters.visible = function (a) {
        return !f.expr.filters.hidden(a)
    });
    var bD = /%20/g,
        bE = /\[\]$/,
        bF = /\r?\n/g,
        bG = /#.*$/,
        bH = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        bI = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        bJ = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        bK = /^(?:GET|HEAD)$/,
        bL = /^\/\//,
        bM = /\?/,
        bN = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        bO = /^(?:select|textarea)/i,
        bP = /\s+/,
        bQ = /([?&])_=[^&]*/,
        bR = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
        bS = f.fn.load,
        bT = {}, bU = {}, bV, bW, bX = ["*/"] + ["*"];
    try {
        bV = e.href
    } catch (bY) {
        bV = c.createElement("a"), bV.href = "", bV = bV.href
    }
    bW = bR.exec(bV.toLowerCase()) || [], f.fn.extend({
        load: function (a, c, d) {
            if (typeof a != "string" && bS) return bS.apply(this, arguments);
            if (!this.length) return this;
            var e = a.indexOf(" ");
            if (e >= 0) {
                var g = a.slice(e, a.length);
                a = a.slice(0, e)
            }
            var h = "GET";
            c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
            var i = this;
            f.ajax({
                url: a,
                type: h,
                dataType: "html",
                data: c,
                complete: function (a, b, c) {
                    c = a.responseText, a.isResolved() && (a.done(function (a) {
                        c = a
                    }), i.html(g ? f("<div>").append(c.replace(bN, "")).find(g) : c)), d && i.each(d, [c, b, a])
                }
            });
            return this
        },
        serialize: function () {
            return f.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                return this.elements ? f.makeArray(this.elements) : this
            }).filter(function () {
                    return this.name && !this.disabled && (this.checked || bO.test(this.nodeName) || bI.test(this.type))
                }).map(function (a, b) {
                    var c = f(this).val();
                    return c == null ? null : f.isArray(c) ? f.map(c, function (a, c) {
                        return {
                            name: b.name,
                            value: a.replace(bF, "\r\n")
                        }
                    }) : {
                        name: b.name,
                        value: c.replace(bF, "\r\n")
                    }
                }).get()
        }
    }), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
        f.fn[b] = function (a) {
            return this.on(b, a)
        }
    }), f.each(["get", "post"], function (a, c) {
        f[c] = function (a, d, e, g) {
            f.isFunction(d) && (g = g || e, e = d, d = b);
            return f.ajax({
                type: c,
                url: a,
                data: d,
                success: e,
                dataType: g
            })
        }
    }), f.extend({
        getScript: function (a, c) {
            return f.get(a, b, c, "script")
        },
        getJSON: function (a, b, c) {
            return f.get(a, b, c, "json")
        },
        ajaxSetup: function (a, b) {
            b ? b_(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b_(a, b);
            return a
        },
        ajaxSettings: {
            url: bV,
            isLocal: bJ.test(bW[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": bX
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": a.String,
                "text html": !0,
                "text json": f.parseJSON,
                "text xml": f.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: bZ(bT),
        ajaxTransport: bZ(bU),
        ajax: function (a, c) {
            function w(a, c, l, m) {
                if (s !== 2) {
                    s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
                    var o, r, u, w = c,
                        x = l ? cb(d, v, l) : b,
                        y, z;
                    if (a >= 200 && a < 300 || a === 304) {
                        if (d.ifModified) {
                            if (y = v.getResponseHeader("Last-Modified")) f.lastModified[k] = y;
                            if (z = v.getResponseHeader("Etag")) f.etag[k] = z
                        }
                        if (a === 304) w = "notmodified", o = !0;
                        else try {
                            r = cc(d, x), w = "success", o = !0
                        } catch (A) {
                            w = "parsererror", u = A
                        }
                    } else {
                        u = w;
                        if (!w || a) w = "error", a < 0 && (a = 0)
                    }
                    v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"))
                }
            }
            typeof a == "object" && (c = a, a = b), c = c || {};
            var d = f.ajaxSetup({}, c),
                e = d.context || d,
                g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event,
                h = f.Deferred(),
                i = f.Callbacks("once memory"),
                j = d.statusCode || {}, k, l = {}, m = {}, n, o, p, q, r, s = 0,
                t, u, v = {
                    readyState: 0,
                    setRequestHeader: function (a, b) {
                        if (!s) {
                            var c = a.toLowerCase();
                            a = m[c] = m[c] || a, l[a] = b
                        }
                        return this
                    },
                    getAllResponseHeaders: function () {
                        return s === 2 ? n : null
                    },
                    getResponseHeader: function (a) {
                        var c;
                        if (s === 2) {
                            if (!o) {
                                o = {};
                                while (c = bH.exec(n)) o[c[1].toLowerCase()] = c[2]
                            }
                            c = o[a.toLowerCase()]
                        }
                        return c === b ? null : c
                    },
                    overrideMimeType: function (a) {
                        s || (d.mimeType = a);
                        return this
                    },
                    abort: function (a) {
                        a = a || "abort", p && p.abort(a), w(0, a);
                        return this
                    }
                };
            h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function (a) {
                if (a) {
                    var b;
                    if (s < 2)
                        for (b in a) j[b] = [j[b], a[b]];
                    else b = a[v.status], v.then(b, b)
                }
                return this
            }, d.url = ((a || d.url) + "").replace(bG, "").replace(bL, bW[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bP), d.crossDomain == null && (r = bR.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bW[1] && r[2] == bW[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bW[3] || (bW[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), b$(bT, d, c, v);
            if (s === 2) return !1;
            t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bK.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
            if (!d.hasContent) {
                d.data && (d.url += (bM.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
                if (d.cache === !1) {
                    var x = f.now(),
                        y = d.url.replace(bQ, "$1_=" + x);
                    d.url = y + (y === d.url ? (bM.test(d.url) ? "&" : "?") + "_=" + x : "")
                }
            }(d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bX + "; q=0.01" : "") : d.accepts["*"]);
            for (u in d.headers) v.setRequestHeader(u, d.headers[u]);
            if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
                v.abort();
                return !1
            }
            for (u in {
                success: 1,
                error: 1,
                complete: 1
            }) v[u](d[u]);
            p = b$(bU, d, c, v);
            if (!p) w(-1, "No Transport");
            else {
                v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function () {
                    v.abort("timeout")
                }, d.timeout));
                try {
                    s = 1, p.send(l, w)
                } catch (z) {
                    if (s < 2) w(-1, z);
                    else throw z
                }
            }
            return v
        },
        param: function (a, c) {
            var d = [],
                e = function (a, b) {
                    b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                };
            c === b && (c = f.ajaxSettings.traditional);
            if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) f.each(a, function () {
                e(this.name, this.value)
            });
            else
                for (var g in a) ca(g, a[g], c, e);
            return d.join("&").replace(bD, "+")
        }
    }), f.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });
    var cd = f.now(),
        ce = /(\=)\?(&|$)|\?\?/i;
    f.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            return f.expando + "_" + cd++
        }
    }), f.ajaxPrefilter("json jsonp", function (b, c, d) {
        var e = b.contentType === "application/x-www-form-urlencoded" && typeof b.data == "string";
        if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (ce.test(b.url) || e && ce.test(b.data))) {
            var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
                i = a[h],
                j = b.url,
                k = b.data,
                l = "$1" + h + "$2";
            b.jsonp !== !1 && (j = j.replace(ce, l), b.url === j && (e && (k = k.replace(ce, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function (a) {
                g = [a]
            }, d.always(function () {
                a[h] = i, g && f.isFunction(i) && a[h](g[0])
            }), b.converters["script json"] = function () {
                g || f.error(h + " was not called");
                return g[0]
            }, b.dataTypes[0] = "json";
            return "script"
        }
    }), f.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function (a) {
                f.globalEval(a);
                return a
            }
        }
    }), f.ajaxPrefilter("script", function (a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), f.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
            return {
                send: function (f, g) {
                    d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function (a, c) {
                        if (c || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success")
                    }, e.insertBefore(d, e.firstChild)
                },
                abort: function () {
                    d && d.onload(0, 1)
                }
            }
        }
    });
    var cf = a.ActiveXObject ? function () {
            for (var a in ch) ch[a](0, 1)
        } : !1,
        cg = 0,
        ch;
    f.ajaxSettings.xhr = a.ActiveXObject ? function () {
        return !this.isLocal && ci() || cj()
    } : ci,
        function (a) {
            f.extend(f.support, {
                ajax: !! a,
                cors: !! a && "withCredentials" in a
            })
        }(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function (c) {
        if (!c.crossDomain || f.support.cors) {
            var d;
            return {
                send: function (e, g) {
                    var h = c.xhr(),
                        i, j;
                    c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
                    if (c.xhrFields)
                        for (j in c.xhrFields) h[j] = c.xhrFields[j];
                    c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (j in e) h.setRequestHeader(j, e[j])
                    } catch (k) {}
                    h.send(c.hasContent && c.data || null), d = function (a, e) {
                        var j, k, l, m, n;
                        try {
                            if (d && (e || h.readyState === 4)) {
                                d = b, i && (h.onreadystatechange = f.noop, cf && delete ch[i]);
                                if (e) h.readyState !== 4 && h.abort();
                                else {
                                    j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n), m.text = h.responseText;
                                    try {
                                        k = h.statusText
                                    } catch (o) {
                                        k = ""
                                    }!j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
                                }
                            }
                        } catch (p) {
                            e || g(-1, p)
                        }
                        m && g(j, k, m, l)
                    }, !c.async || h.readyState === 4 ? d() : (i = ++cg, cf && (ch || (ch = {}, f(a).unload(cf)), ch[i] = d), h.onreadystatechange = d)
                },
                abort: function () {
                    d && d(0, 1)
                }
            }
        }
    });
    var ck = {}, cl, cm, cn = /^(?:toggle|show|hide)$/,
        co = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
        cp, cq = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ],
        cr;
    f.fn.extend({
        show: function (a, b, c) {
            var d, e;
            if (a || a === 0) return this.animate(cu("show", 3), a, b, c);
            for (var g = 0, h = this.length; g < h; g++) d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), e === "" && f.css(d, "display") === "none" && f._data(d, "olddisplay", cv(d.nodeName)));
            for (g = 0; g < h; g++) {
                d = this[g];
                if (d.style) {
                    e = d.style.display;
                    if (e === "" || e === "none") d.style.display = f._data(d, "olddisplay") || ""
                }
            }
            return this
        },
        hide: function (a, b, c) {
            if (a || a === 0) return this.animate(cu("hide", 3), a, b, c);
            var d, e, g = 0,
                h = this.length;
            for (; g < h; g++) d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
            for (g = 0; g < h; g++) this[g].style && (this[g].style.display = "none");
            return this
        },
        _toggle: f.fn.toggle,
        toggle: function (a, b, c) {
            var d = typeof a == "boolean";
            f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function () {
                var b = d ? a : f(this).is(":hidden");
                f(this)[b ? "show" : "hide"]()
            }) : this.animate(cu("toggle", 3), a, b, c);
            return this
        },
        fadeTo: function (a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d)
        },
        animate: function (a, b, c, d) {
            function g() {
                e.queue === !1 && f._mark(this);
                var b = f.extend({}, e),
                    c = this.nodeType === 1,
                    d = c && f(this).is(":hidden"),
                    g, h, i, j, k, l, m, n, o;
                b.animatedProperties = {};
                for (i in a) {
                    g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]), h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                    if (h === "hide" && d || h === "show" && !d) return b.complete.call(this);
                    c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cv(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
                }
                b.overflow != null && (this.style.overflow = "hidden");
                for (i in a) j = new f.fx(this, b, i), h = a[i], cn.test(h) ? (o = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), o ? (f._data(this, "toggle" + i, o === "show" ? "hide" : "show"), j[o]()) : j[h]()) : (k = co.exec(h), l = j.cur(), k ? (m = parseFloat(k[2]), n = k[3] || (f.cssNumber[i] ? "" : "px"), n !== "px" && (f.style(this, i, (m || 1) + n), l = (m || 1) / j.cur() * l, f.style(this, i, l + n)), k[1] && (m = (k[1] === "-=" ? -1 : 1) * m + l), j.custom(l, m, n)) : j.custom(l, h, ""));
                return !0
            }
            var e = f.speed(b, c, d);
            if (f.isEmptyObject(a)) return this.each(e.complete, [!1]);
            a = f.extend({}, a);
            return e.queue === !1 ? this.each(g) : this.queue(e.queue, g)
        },
        stop: function (a, c, d) {
            typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []);
            return this.each(function () {
                function h(a, b, c) {
                    var e = b[c];
                    f.removeData(a, c, !0), e.stop(d)
                }
                var b, c = !1,
                    e = f.timers,
                    g = f._data(this);
                d || f._unmark(!0, this);
                if (a == null)
                    for (b in g) g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b);
                else g[b = a + ".run"] && g[b].stop && h(this, g, b);
                for (b = e.length; b--;) e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
                (!d || !c) && f.dequeue(this, a)
            })
        }
    }), f.each({
        slideDown: cu("show", 1),
        slideUp: cu("hide", 1),
        slideToggle: cu("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (a, b) {
        f.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), f.extend({
        speed: function (a, b, c) {
            var d = a && typeof a == "object" ? f.extend({}, a) : {
                complete: c || !c && b || f.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !f.isFunction(b) && b
            };
            d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
            if (d.queue == null || d.queue === !0) d.queue = "fx";
            d.old = d.complete, d.complete = function (a) {
                f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
            };
            return d
        },
        easing: {
            linear: function (a, b, c, d) {
                return c + d * a
            },
            swing: function (a, b, c, d) {
                return (-Math.cos(a * Math.PI) / 2 + .5) * d + c
            }
        },
        timers: [],
        fx: function (a, b, c) {
            this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
        }
    }), f.fx.prototype = {
        update: function () {
            this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this)
        },
        cur: function () {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
            var a, b = f.css(this.elem, this.prop);
            return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
        },
        custom: function (a, c, d) {
            function h(a) {
                return e.step(a)
            }
            var e = this,
                g = f.fx;
            this.startTime = cr || cs(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function () {
                e.options.hide && f._data(e.elem, "fxshow" + e.prop) === b && f._data(e.elem, "fxshow" + e.prop, e.start)
            }, h() && f.timers.push(h) && !cp && (cp = setInterval(g.tick, g.interval))
        },
        show: function () {
            var a = f._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show()
        },
        hide: function () {
            this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
        },
        step: function (a) {
            var b, c, d, e = cr || cs(),
                g = !0,
                h = this.elem,
                i = this.options;
            if (a || e >= i.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
                for (b in i.animatedProperties) i.animatedProperties[b] !== !0 && (g = !1);
                if (g) {
                    i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function (a, b) {
                        h.style["overflow" + b] = i.overflow[a]
                    }), i.hide && f(h).hide();
                    if (i.hide || i.show)
                        for (b in i.animatedProperties) f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
                    d = i.complete, d && (i.complete = !1, d.call(h))
                }
                return !1
            }
            i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update();
            return !0
        }
    }, f.extend(f.fx, {
        tick: function () {
            var a, b = f.timers,
                c = 0;
            for (; c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1);
            b.length || f.fx.stop()
        },
        interval: 13,
        stop: function () {
            clearInterval(cp), cp = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function (a) {
                f.style(a.elem, "opacity", a.now)
            },
            _default: function (a) {
                a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
            }
        }
    }), f.each(["width", "height"], function (a, b) {
        f.fx.step[b] = function (a) {
            f.style(a.elem, b, Math.max(0, a.now) + a.unit)
        }
    }), f.expr && f.expr.filters && (f.expr.filters.animated = function (a) {
        return f.grep(f.timers, function (b) {
            return a === b.elem
        }).length
    });
    var cw = /^t(?:able|d|h)$/i,
        cx = /^(?:body|html)$/i;
    "getBoundingClientRect" in c.documentElement ? f.fn.offset = function (a) {
        var b = this[0],
            c;
        if (a) return this.each(function (b) {
            f.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
        try {
            c = b.getBoundingClientRect()
        } catch (d) {}
        var e = b.ownerDocument,
            g = e.documentElement;
        if (!c || !f.contains(g, b)) return c ? {
            top: c.top,
            left: c.left
        } : {
            top: 0,
            left: 0
        };
        var h = e.body,
            i = cy(e),
            j = g.clientTop || h.clientTop || 0,
            k = g.clientLeft || h.clientLeft || 0,
            l = i.pageYOffset || f.support.boxModel && g.scrollTop || h.scrollTop,
            m = i.pageXOffset || f.support.boxModel && g.scrollLeft || h.scrollLeft,
            n = c.top + l - j,
            o = c.left + m - k;
        return {
            top: n,
            left: o
        }
    } : f.fn.offset = function (a) {
        var b = this[0];
        if (a) return this.each(function (b) {
            f.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
        var c, d = b.offsetParent,
            e = b,
            g = b.ownerDocument,
            h = g.documentElement,
            i = g.body,
            j = g.defaultView,
            k = j ? j.getComputedStyle(b, null) : b.currentStyle,
            l = b.offsetTop,
            m = b.offsetLeft;
        while ((b = b.parentNode) && b !== i && b !== h) {
            if (f.support.fixedPosition && k.position === "fixed") break;
            c = j ? j.getComputedStyle(b, null) : b.currentStyle, l -= b.scrollTop, m -= b.scrollLeft, b === d && (l += b.offsetTop, m += b.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(b.nodeName)) && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), e = d, d = b.offsetParent), f.support.subtractsBorderForOverflowNotVisible && c.overflow !== "visible" && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), k = c
        }
        if (k.position === "relative" || k.position === "static") l += i.offsetTop, m += i.offsetLeft;
        f.support.fixedPosition && k.position === "fixed" && (l += Math.max(h.scrollTop, i.scrollTop), m += Math.max(h.scrollLeft, i.scrollLeft));
        return {
            top: l,
            left: m
        }
    }, f.offset = {
        bodyOffset: function (a) {
            var b = a.offsetTop,
                c = a.offsetLeft;
            f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0);
            return {
                top: b,
                left: c
            }
        },
        setOffset: function (a, b, c) {
            var d = f.css(a, "position");
            d === "static" && (a.style.position = "relative");
            var e = f(a),
                g = e.offset(),
                h = f.css(a, "top"),
                i = f.css(a, "left"),
                j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1,
                k = {}, l = {}, m, n;
            j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k)
        }
    }, f.fn.extend({
        position: function () {
            if (!this[0]) return null;
            var a = this[0],
                b = this.offsetParent(),
                c = this.offset(),
                d = cx.test(b[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : b.offset();
            c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
            return {
                top: c.top - d.top,
                left: c.left - d.left
            }
        },
        offsetParent: function () {
            return this.map(function () {
                var a = this.offsetParent || c.body;
                while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static") a = a.offsetParent;
                return a
            })
        }
    }), f.each(["Left", "Top"], function (a, c) {
        var d = "scroll" + c;
        f.fn[d] = function (c) {
            var e, g;
            if (c === b) {
                e = this[0];
                if (!e) return null;
                g = cy(e);
                return g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : f.support.boxModel && g.document.documentElement[d] || g.document.body[d] : e[d]
            }
            return this.each(function () {
                g = cy(this), g ? g.scrollTo(a ? f(g).scrollLeft() : c, a ? c : f(g).scrollTop()) : this[d] = c
            })
        }
    }), f.each(["Height", "Width"], function (a, c) {
        var d = c.toLowerCase();
        f.fn["inner" + c] = function () {
            var a = this[0];
            return a ? a.style ? parseFloat(f.css(a, d, "padding")) : this[d]() : null
        }, f.fn["outer" + c] = function (a) {
            var b = this[0];
            return b ? b.style ? parseFloat(f.css(b, d, a ? "margin" : "border")) : this[d]() : null
        }, f.fn[d] = function (a) {
            var e = this[0];
            if (!e) return a == null ? null : this;
            if (f.isFunction(a)) return this.each(function (b) {
                var c = f(this);
                c[d](a.call(this, b, c[d]()))
            });
            if (f.isWindow(e)) {
                var g = e.document.documentElement["client" + c],
                    h = e.document.body;
                return e.document.compatMode === "CSS1Compat" && g || h && h["client" + c] || g
            }
            if (e.nodeType === 9) return Math.max(e.documentElement["client" + c], e.body["scroll" + c], e.documentElement["scroll" + c], e.body["offset" + c], e.documentElement["offset" + c]);
            if (a === b) {
                var i = f.css(e, d),
                    j = parseFloat(i);
                return f.isNumeric(j) ? j : i
            }
            return this.css(d, typeof a == "string" ? a : a + "px")
        }
    }), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return f
    })
})(window);


/*artTemplate - Template Engine*/
var template = function (d, h) {
    return template["object" === typeof h ? "render" : "compile"].apply(template, arguments)
};
(function (d, h) {
    d.version = "1.1";
    d.openTag = "<%";
    d.closeTag = "%>";
    d.parser = null;
    d.render = function (a, c) {
        var b;
        b = g[a];
        void 0 === b && !v ? ((b = document.getElementById(a)) && d.compile(a, b.value || b.innerHTML), b = g[a]) : b = g.hasOwnProperty(a) ? b : void 0;
        return void 0 === b ? m({
            id: a,
            name: "Render Error",
            message: "Not Cache"
        }) : b(c)
    };
    d.compile = function (a, c, b) {
        function j(b) {
            try {
                return (new n(b)).template
            } catch (e) {
                if (!f) return d.compile(a, c, !0)(b);
                e.id = a || c;
                e.name = "Render Error";
                e.source = c;
                return m(e)
            }
        }
        var f = b;
        "string" !== typeof c && (f = c, c = a, a = null);
        try {
            var n = w(c, f)
        } catch (k) {
            return k.id = a || c, k.name = "Syntax Error", m(k)
        }
        j.prototype = n.prototype;
        j.toString = function () {
            return n.toString()
        };
        a && (g[a] = j);
        return j
    };
    d.helper = function (a, c) {
        r[a] = c
    };
    var g = {}, p = "".trim,
        v = p && !h.document,
        s = {}, q = function () {
            var a = Array.prototype.forEach || function (a, b) {
                for (var d = this.length >>> 0, f = 0; f < d; f++) f in this && a.call(b, this[f], f, this)
            };
            return function (c, b) {
                a.call(c, b)
            }
        }(),
        x = Object.create || function (a) {
            function c() {}
            c.prototype = a;
            return new c
        }, r = d.prototype = {
            $forEach: q,
            $render: d.render,
            $getValue: function (a) {
                return void 0 === a ? "" : a
            }
        };
    q("break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield".split(","), function (a) {
        s[a] = !0
    });
    var w = function (a, c) {
        function b(a) {
            o += a.split(/\n/).length - 1;
            a = a.replace(/('|"|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n");
            a = l[1] + "'" + a + "'" + l[2];
            return a + "\n"
        }

        function j(a) {
            var b = o;
            k ? a = k(a) : c && (a = a.replace(/\n/g, function () {
                o++;
                return "$line=" + o + ";"
            }));
            0 === a.indexOf("=") && (a = l[1] + (p ? "$getValue(" : "") + a.substring(1).replace(/[\s;]*$/, "") + (p ? ")" : "") + l[2]);
            c && (a = "$line=" + b + ";" + a);
            f(a);
            return a + "\n"
        }

        function f(a) {
            a = a.replace(/\/\*.*?\*\/|'[^']*'|"[^"]*"|\.[\$\w]+/g, "");
            q(a.split(/[^\$\w\d]+/), function (a) {
                if (/^this$/.test(a)) throw {
                    message: 'Prohibit the use of the "' + a + '"'
                };
                if (a && !s.hasOwnProperty(a) && !/^\d/.test(a) && !h.hasOwnProperty(a)) {
                    var b;
                    b = "include" === a ? m : r.hasOwnProperty(a) ? "$helpers." + a : "$data." + a;
                    g += a + "=" + b + ",";
                    h[a] = !0
                }
            })
        }
        var n = d.closeTag,
            k = d.parser,
            i, e = "",
            o = 1,
            h = {
                $out: !0,
                $line: !0
            }, g = "var $helpers=this," + (c ? "$line=0," : ""),
            l = p ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
            m = "function(id,data){if(data===undefined){data=$data}return $helpers.$render(id,data)}";
        q(a.split(d.openTag), function (a) {
            var a = a.split(n),
                c = a[0],
                d = a[1];
            1 === a.length ? e += b(c) : (e += j(c), d && (e += b(d)))
        });
        i = e;
        c && (i = "try{" + i + "}catch(e){e.line=$line;throw e}");
        i = g + l[0] + i + "this.template=" + l[3];
        try {
            var t = new Function("$data", i);
            (t.prototype = x(r)).toString = function () {
                return this.template
            };
            return t
        } catch (u) {
            throw u.temp = "function anonymous($data) {" + i + "}", u;
        }
    }, m = function (a) {
        function c() {
            return c + ""
        }
        var b = "[template]:\n" + a.id + "\n\n[name]:\n" + a.name;
        a.message && (b += "\n\n[message]:\n" + a.message);
        a.line && (b += "\n\n[line]:\n" + a.line, b += "\n\n[source]:\n" + a.source.split(/\n/)[a.line - 1].replace(/^[\s\t]+/, ""));
        a.temp && (b += "\n\n[temp]:\n" + a.temp);
        h.console && console.error(b);
        c.toString = function () {
            return "{Template Error}"
        };
        return c
    }
})(template, this);
if ("undefined" !== typeof module && module.exports) module.exports = template;

/*!
 * iScroll v4.2.2 ~ Copyright (c) 2012 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
(function (i, F) {
    var v = Math,
        n = F.createElement("div").style,
        A = (function () {
            var I = "t,webkitT,MozT,msT,OT".split(","),
                H, G = 0,
                m = I.length;
            for (; G < m; G++) {
                H = I[G] + "ransform";
                if (H in n) {
                    return I[G].substr(0, I[G].length - 1);
                }
            }
            return false;
        })(),
        E = A ? "-" + A.toLowerCase() + "-" : "",
        l = s("transform"),
        y = s("transitionProperty"),
        k = s("transitionDuration"),
        o = s("transformOrigin"),
        C = s("transitionTimingFunction"),
        e = s("transitionDelay"),
        B = (/android/gi).test(navigator.appVersion),
        h = (/iphone|ipad/gi).test(navigator.appVersion),
        r = (/hp-tablet/gi).test(navigator.appVersion),
        j = s("perspective") in n,
        z = "ontouchstart" in i && !r,
        d = !! A,
        f = s("transition") in n,
        g = "onorientationchange" in i ? "orientationchange" : "resize",
        b = z ? "touchstart" : "mousedown",
        t = z ? "touchmove" : "mousemove",
        c = z ? "touchend" : "mouseup",
        x = z ? "touchcancel" : "mouseup",
        u = A == "Moz" ? "DOMMouseScroll" : "mousewheel",
        a = (function () {
            if (A === false) {
                return false;
            }
            var m = {
                "": "transitionend",
                webkit: "webkitTransitionEnd",
                Moz: "transitionend",
                O: "otransitionend",
                ms: "MSTransitionEnd"
            };
            return m[A];
        })(),
        q = (function () {
            return i.requestAnimationFrame || i.webkitRequestAnimationFrame || i.mozRequestAnimationFrame || i.oRequestAnimationFrame || i.msRequestAnimationFrame || function (m) {
                return setTimeout(m, 1);
            };
        })(),
        p = (function () {
            return i.cancelRequestAnimationFrame || i.webkitCancelAnimationFrame || i.webkitCancelRequestAnimationFrame || i.mozCancelRequestAnimationFrame || i.oCancelRequestAnimationFrame || i.msCancelRequestAnimationFrame || clearTimeout;
        })(),
        D = j ? " translateZ(0)" : "",
        w = function (H, m) {
            var I = this,
                G;
            I.wrapper = typeof H == "object" ? H : F.getElementById(H);
            I.wrapper.style.overflow = "hidden";
            I.scroller = I.wrapper.children[0];
            I.options = {
                hScroll: true,
                vScroll: true,
                x: 0,
                y: 0,
                bounce: true,
                bounceLock: false,
                momentum: true,
                lockDirection: true,
                useTransform: true,
                useTransition: false,
                topOffset: 0,
                checkDOMChanges: false,
                handleClick: true,
                hScrollbar: true,
                vScrollbar: true,
                fixedScrollbar: B,
                hideScrollbar: h,
                fadeScrollbar: h && j,
                scrollbarClass: "",
                zoom: false,
                zoomMin: 1,
                zoomMax: 4,
                doubleTapZoom: 2,
                wheelAction: "scroll",
                snap: false,
                snapThreshold: 1,
                onRefresh: null,
                onBeforeScrollStart: function (J) {
                    J.preventDefault();
                },
                onScrollStart: null,
                onBeforeScrollMove: null,
                onScrollMove: null,
                onBeforeScrollEnd: null,
                onScrollEnd: null,
                onTouchEnd: null,
                onDestroy: null,
                onZoomStart: null,
                onZoom: null,
                onZoomEnd: null
            };
            for (G in m) {
                I.options[G] = m[G];
            }
            I.x = I.options.x;
            I.y = I.options.y;
            I.options.useTransform = d && I.options.useTransform;
            I.options.hScrollbar = I.options.hScroll && I.options.hScrollbar;
            I.options.vScrollbar = I.options.vScroll && I.options.vScrollbar;
            I.options.zoom = I.options.useTransform && I.options.zoom;
            I.options.useTransition = f && I.options.useTransition;
            if (I.options.zoom && B) {
                D = "";
            }
            I.scroller.style[y] = I.options.useTransform ? E + "transform" : "top left";
            I.scroller.style[k] = "0";
            I.scroller.style[o] = "0 0";
            if (I.options.useTransition) {
                I.scroller.style[C] = "cubic-bezier(0.33,0.66,0.66,1)";
            }
            if (I.options.useTransform) {
                I.scroller.style[l] = "translate(" + I.x + "px," + I.y + "px)" + D;
            } else {
                I.scroller.style.cssText += ";position:absolute;top:" + I.y + "px;left:" + I.x + "px";
            } if (I.options.useTransition) {
                I.options.fixedScrollbar = true;
            }
            I.refresh();
            I._bind(g, i);
            I._bind(b);
            if (!z) {
                if (I.options.wheelAction != "none") {
                    I._bind(u);
                }
            }
            if (I.options.checkDOMChanges) {
                I.checkDOMTime = setInterval(function () {
                    I._checkDOMChanges();
                }, 500);
            }
        };
    w.prototype = {
        enabled: true,
        x: 0,
        y: 0,
        steps: [],
        scale: 1,
        currPageX: 0,
        currPageY: 0,
        pagesX: [],
        pagesY: [],
        aniTime: null,
        wheelZoomCount: 0,
        handleEvent: function (G) {
            var m = this;
            switch (G.type) {
                case b:
                    if (!z && G.button !== 0) {
                        return;
                    }
                    m._start(G);
                    break;
                case t:
                    m._move(G);
                    break;
                case c:
                case x:
                    m._end(G);
                    break;
                case g:
                    m._resize();
                    break;
                case u:
                    m._wheel(G);
                    break;
                case a:
                    m._transitionEnd(G);
                    break;
            }
        },
        _checkDOMChanges: function () {
            if (this.moved || this.zoomed || this.animating || (this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)) {
                return;
            }
            this.refresh();
        },
        _scrollbar: function (m) {
            var H = this,
                G;
            if (!H[m + "Scrollbar"]) {
                if (H[m + "ScrollbarWrapper"]) {
                    if (d) {
                        H[m + "ScrollbarIndicator"].style[l] = "";
                    }
                    H[m + "ScrollbarWrapper"].parentNode.removeChild(H[m + "ScrollbarWrapper"]);
                    H[m + "ScrollbarWrapper"] = null;
                    H[m + "ScrollbarIndicator"] = null;
                }
                return;
            }
            if (!H[m + "ScrollbarWrapper"]) {
                G = F.createElement("div");
                if (H.options.scrollbarClass) {
                    G.className = H.options.scrollbarClass + m.toUpperCase();
                } else {
                    G.style.cssText = "position:absolute;z-index:100;" + (m == "h" ? "height:7px;bottom:1px;left:2px;right:" + (H.vScrollbar ? "7" : "2") + "px" : "width:7px;bottom:" + (H.hScrollbar ? "7" : "2") + "px;top:2px;right:1px");
                }
                G.style.cssText += ";pointer-events:none;" + E + "transition-property:opacity;" + E + "transition-duration:" + (H.options.fadeScrollbar ? "350ms" : "0") + ";overflow:hidden;opacity:" + (H.options.hideScrollbar ? "0" : "1");
                H.wrapper.appendChild(G);
                H[m + "ScrollbarWrapper"] = G;
                G = F.createElement("div");
                if (!H.options.scrollbarClass) {
                    G.style.cssText = "position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);" + E + "background-clip:padding-box;" + E + "box-sizing:border-box;" + (m == "h" ? "height:100%" : "width:100%") + ";" + E + "border-radius:3px;border-radius:3px";
                }
                G.style.cssText += ";pointer-events:none;" + E + "transition-property:" + E + "transform;" + E + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);" + E + "transition-duration:0;" + E + "transform: translate(0,0)" + D;
                if (H.options.useTransition) {
                    G.style.cssText += ";" + E + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)";
                }
                H[m + "ScrollbarWrapper"].appendChild(G);
                H[m + "ScrollbarIndicator"] = G;
            }
            if (m == "h") {
                H.hScrollbarSize = H.hScrollbarWrapper.clientWidth;
                H.hScrollbarIndicatorSize = v.max(v.round(H.hScrollbarSize * H.hScrollbarSize / H.scrollerW), 8);
                H.hScrollbarIndicator.style.width = H.hScrollbarIndicatorSize + "px";
                H.hScrollbarMaxScroll = H.hScrollbarSize - H.hScrollbarIndicatorSize;
                H.hScrollbarProp = H.hScrollbarMaxScroll / H.maxScrollX;
            } else {
                H.vScrollbarSize = H.vScrollbarWrapper.clientHeight;
                H.vScrollbarIndicatorSize = v.max(v.round(H.vScrollbarSize * H.vScrollbarSize / H.scrollerH), 8);
                H.vScrollbarIndicator.style.height = H.vScrollbarIndicatorSize + "px";
                H.vScrollbarMaxScroll = H.vScrollbarSize - H.vScrollbarIndicatorSize;
                H.vScrollbarProp = H.vScrollbarMaxScroll / H.maxScrollY;
            }
            H._scrollbarPos(m, true);
        },
        _resize: function () {
            var m = this;
            setTimeout(function () {
                m.refresh();
            }, B ? 200 : 0);
        },
        _pos: function (m, G) {
            if (this.zoomed) {
                return;
            }
            m = this.hScroll ? m : 0;
            G = this.vScroll ? G : 0;
            if (this.options.useTransform) {
                this.scroller.style[l] = "translate(" + m + "px," + G + "px) scale(" + this.scale + ")" + D;
            } else {
                m = v.round(m);
                G = v.round(G);
                this.scroller.style.left = m + "px";
                this.scroller.style.top = G + "px";
            }
            this.x = m;
            this.y = G;
            this._scrollbarPos("h");
            this._scrollbarPos("v");
        },
        _scrollbarPos: function (m, I) {
            var H = this,
                J = m == "h" ? H.x : H.y,
                G;
            if (!H[m + "Scrollbar"]) {
                return;
            }
            J = H[m + "ScrollbarProp"] * J;
            if (J < 0) {
                if (!H.options.fixedScrollbar) {
                    G = H[m + "ScrollbarIndicatorSize"] + v.round(J * 3);
                    if (G < 8) {
                        G = 8;
                    }
                    H[m + "ScrollbarIndicator"].style[m == "h" ? "width" : "height"] = G + "px";
                }
                J = 0;
            } else {
                if (J > H[m + "ScrollbarMaxScroll"]) {
                    if (!H.options.fixedScrollbar) {
                        G = H[m + "ScrollbarIndicatorSize"] - v.round((J - H[m + "ScrollbarMaxScroll"]) * 3);
                        if (G < 8) {
                            G = 8;
                        }
                        H[m + "ScrollbarIndicator"].style[m == "h" ? "width" : "height"] = G + "px";
                        J = H[m + "ScrollbarMaxScroll"] + (H[m + "ScrollbarIndicatorSize"] - G);
                    } else {
                        J = H[m + "ScrollbarMaxScroll"];
                    }
                }
            }
            H[m + "ScrollbarWrapper"].style[e] = "0";
            H[m + "ScrollbarWrapper"].style.opacity = I && H.options.hideScrollbar ? "0" : "1";
            H[m + "ScrollbarIndicator"].style[l] = "translate(" + (m == "h" ? J + "px,0)" : "0," + J + "px)") + D;
        },
        _start: function (L) {
            var K = this,
                G = z ? L.touches[0] : L,
                H, m, M, J, I;
            if (!K.enabled) {
                return;
            }
            if (K.options.onBeforeScrollStart) {
                K.options.onBeforeScrollStart.call(K, L);
            }
            if (K.options.useTransition || K.options.zoom) {
                K._transitionTime(0);
            }
            K.moved = false;
            K.animating = false;
            K.zoomed = false;
            K.distX = 0;
            K.distY = 0;
            K.absDistX = 0;
            K.absDistY = 0;
            K.dirX = 0;
            K.dirY = 0;
            if (K.options.zoom && z && L.touches.length > 1) {
                J = v.abs(L.touches[0].pageX - L.touches[1].pageX);
                I = v.abs(L.touches[0].pageY - L.touches[1].pageY);
                K.touchesDistStart = v.sqrt(J * J + I * I);
                K.originX = v.abs(L.touches[0].pageX + L.touches[1].pageX - K.wrapperOffsetLeft * 2) / 2 - K.x;
                K.originY = v.abs(L.touches[0].pageY + L.touches[1].pageY - K.wrapperOffsetTop * 2) / 2 - K.y;
                if (K.options.onZoomStart) {
                    K.options.onZoomStart.call(K, L);
                }
            }
            if (K.options.momentum) {
                if (K.options.useTransform) {
                    H = getComputedStyle(K.scroller, null)[l].replace(/[^0-9\-.,]/g, "").split(",");
                    m = +H[4];
                    M = +H[5];
                } else {
                    m = +getComputedStyle(K.scroller, null).left.replace(/[^0-9-]/g, "");
                    M = +getComputedStyle(K.scroller, null).top.replace(/[^0-9-]/g, "");
                } if (m != K.x || M != K.y) {
                    if (K.options.useTransition) {
                        K._unbind(a);
                    } else {
                        p(K.aniTime);
                    }
                    K.steps = [];
                    K._pos(m, M);
                    if (K.options.onScrollEnd) {
                        K.options.onScrollEnd.call(K);
                    }
                }
            }
            K.absStartX = K.x;
            K.absStartY = K.y;
            K.startX = K.x;
            K.startY = K.y;
            K.pointX = G.pageX;
            K.pointY = G.pageY;
            K.startTime = L.timeStamp || Date.now();
            if (K.options.onScrollStart) {
                K.options.onScrollStart.call(K, L);
            }
            K._bind(t, i);
            K._bind(c, i);
            K._bind(x, i);
        },
        _move: function (N) {
            var L = this,
                O = z ? N.touches[0] : N,
                J = O.pageX - L.pointX,
                H = O.pageY - L.pointY,
                m = L.x + J,
                P = L.y + H,
                K, I, G, M = N.timeStamp || Date.now();
            if (L.options.onBeforeScrollMove) {
                L.options.onBeforeScrollMove.call(L, N);
            }
            if (L.options.zoom && z && N.touches.length > 1) {
                K = v.abs(N.touches[0].pageX - N.touches[1].pageX);
                I = v.abs(N.touches[0].pageY - N.touches[1].pageY);
                L.touchesDist = v.sqrt(K * K + I * I);
                L.zoomed = true;
                G = 1 / L.touchesDistStart * L.touchesDist * this.scale;
                if (G < L.options.zoomMin) {
                    G = 0.5 * L.options.zoomMin * Math.pow(2, G / L.options.zoomMin);
                } else {
                    if (G > L.options.zoomMax) {
                        G = 2 * L.options.zoomMax * Math.pow(0.5, L.options.zoomMax / G);
                    }
                }
                L.lastScale = G / this.scale;
                m = this.originX - this.originX * L.lastScale + this.x, P = this.originY - this.originY * L.lastScale + this.y;
                this.scroller.style[l] = "translate(" + m + "px," + P + "px) scale(" + G + ")" + D;
                if (L.options.onZoom) {
                    L.options.onZoom.call(L, N);
                }
                return;
            }
            L.pointX = O.pageX;
            L.pointY = O.pageY;
            if (m > 0 || m < L.maxScrollX) {
                m = L.options.bounce ? L.x + (J / 2) : m >= 0 || L.maxScrollX >= 0 ? 0 : L.maxScrollX;
            }
            if (P > L.minScrollY || P < L.maxScrollY) {
                P = L.options.bounce ? L.y + (H / 2) : P >= L.minScrollY || L.maxScrollY >= 0 ? L.minScrollY : L.maxScrollY;
            }
            L.distX += J;
            L.distY += H;
            L.absDistX = v.abs(L.distX);
            L.absDistY = v.abs(L.distY);
            if (L.absDistX < 6 && L.absDistY < 6) {
                return;
            }
            if (L.options.lockDirection) {
                if (L.absDistX > L.absDistY + 5) {
                    P = L.y;
                    H = 0;
                } else {
                    if (L.absDistY > L.absDistX + 5) {
                        m = L.x;
                        J = 0;
                    }
                }
            }
            L.moved = true;
            L._pos(m, P);
            L.dirX = J > 0 ? -1 : J < 0 ? 1 : 0;
            L.dirY = H > 0 ? -1 : H < 0 ? 1 : 0;
            if (M - L.startTime > 300) {
                L.startTime = M;
                L.startX = L.x;
                L.startY = L.y;
            }
            if (L.options.onScrollMove) {
                L.options.onScrollMove.call(L, N);
            }
        },
        _end: function (N) {
            if (z && N.touches.length !== 0) {
                return;
            }
            var L = this,
                T = z ? N.changedTouches[0] : N,
                O, S, H = {
                    dist: 0,
                    time: 0
                }, m = {
                    dist: 0,
                    time: 0
                }, K = (N.timeStamp || Date.now()) - L.startTime,
                P = L.x,
                M = L.y,
                R, Q, G, J, I;
            L._unbind(t, i);
            L._unbind(c, i);
            L._unbind(x, i);
            if (L.options.onBeforeScrollEnd) {
                L.options.onBeforeScrollEnd.call(L, N);
            }
            if (L.zoomed) {
                I = L.scale * L.lastScale;
                I = Math.max(L.options.zoomMin, I);
                I = Math.min(L.options.zoomMax, I);
                L.lastScale = I / L.scale;
                L.scale = I;
                L.x = L.originX - L.originX * L.lastScale + L.x;
                L.y = L.originY - L.originY * L.lastScale + L.y;
                L.scroller.style[k] = "200ms";
                L.scroller.style[l] = "translate(" + L.x + "px," + L.y + "px) scale(" + L.scale + ")" + D;
                L.zoomed = false;
                L.refresh();
                if (L.options.onZoomEnd) {
                    L.options.onZoomEnd.call(L, N);
                }
                return;
            }
            if (!L.moved) {
                if (z) {
                    if (L.doubleTapTimer && L.options.zoom) {
                        clearTimeout(L.doubleTapTimer);
                        L.doubleTapTimer = null;
                        if (L.options.onZoomStart) {
                            L.options.onZoomStart.call(L, N);
                        }
                        L.zoom(L.pointX, L.pointY, L.scale == 1 ? L.options.doubleTapZoom : 1);
                        if (L.options.onZoomEnd) {
                            setTimeout(function () {
                                L.options.onZoomEnd.call(L, N);
                            }, 200);
                        }
                    } else {
                        if (this.options.handleClick) {
                            L.doubleTapTimer = setTimeout(function () {
                                L.doubleTapTimer = null;
                                O = T.target;
                                while (O.nodeType != 1) {
                                    O = O.parentNode;
                                }
                                if (O.tagName != "SELECT" && O.tagName != "INPUT" && O.tagName != "TEXTAREA") {
                                    S = F.createEvent("MouseEvents");
                                    S.initMouseEvent("click", true, true, N.view, 1, T.screenX, T.screenY, T.clientX, T.clientY, N.ctrlKey, N.altKey, N.shiftKey, N.metaKey, 0, null);
                                    S._fake = true;
                                    O.dispatchEvent(S);
                                }
                            }, L.options.zoom ? 250 : 0);
                        }
                    }
                }
                L._resetPos(400);
                if (L.options.onTouchEnd) {
                    L.options.onTouchEnd.call(L, N);
                }
                return;
            }
            if (K < 300 && L.options.momentum) {
                H = P ? L._momentum(P - L.startX, K, -L.x, L.scrollerW - L.wrapperW + L.x, L.options.bounce ? L.wrapperW : 0) : H;
                m = M ? L._momentum(M - L.startY, K, -L.y, (L.maxScrollY < 0 ? L.scrollerH - L.wrapperH + L.y - L.minScrollY : 0), L.options.bounce ? L.wrapperH : 0) : m;
                P = L.x + H.dist;
                M = L.y + m.dist;
                if ((L.x > 0 && P > 0) || (L.x < L.maxScrollX && P < L.maxScrollX)) {
                    H = {
                        dist: 0,
                        time: 0
                    };
                }
                if ((L.y > L.minScrollY && M > L.minScrollY) || (L.y < L.maxScrollY && M < L.maxScrollY)) {
                    m = {
                        dist: 0,
                        time: 0
                    };
                }
            }
            if (H.dist || m.dist) {
                G = v.max(v.max(H.time, m.time), 10);
                if (L.options.snap) {
                    R = P - L.absStartX;
                    Q = M - L.absStartY;
                    if (v.abs(R) < L.options.snapThreshold && v.abs(Q) < L.options.snapThreshold) {
                        L.scrollTo(L.absStartX, L.absStartY, 200);
                    } else {
                        J = L._snap(P, M);
                        P = J.x;
                        M = J.y;
                        G = v.max(J.time, G);
                    }
                }
                L.scrollTo(v.round(P), v.round(M), G);
                if (L.options.onTouchEnd) {
                    L.options.onTouchEnd.call(L, N);
                }
                return;
            }
            if (L.options.snap) {
                R = P - L.absStartX;
                Q = M - L.absStartY;
                if (v.abs(R) < L.options.snapThreshold && v.abs(Q) < L.options.snapThreshold) {
                    L.scrollTo(L.absStartX, L.absStartY, 200);
                } else {
                    J = L._snap(L.x, L.y);
                    if (J.x != L.x || J.y != L.y) {
                        L.scrollTo(J.x, J.y, J.time);
                    }
                } if (L.options.onTouchEnd) {
                    L.options.onTouchEnd.call(L, N);
                }
                return;
            }
            L._resetPos(200);
            if (L.options.onTouchEnd) {
                L.options.onTouchEnd.call(L, N);
            }
        },
        _resetPos: function (H) {
            var m = this,
                I = m.x >= 0 ? 0 : m.x < m.maxScrollX ? m.maxScrollX : m.x,
                G = m.y >= m.minScrollY || m.maxScrollY > 0 ? m.minScrollY : m.y < m.maxScrollY ? m.maxScrollY : m.y;
            if (I == m.x && G == m.y) {
                if (m.moved) {
                    m.moved = false;
                    if (m.options.onScrollEnd) {
                        m.options.onScrollEnd.call(m);
                    }
                }
                if (m.hScrollbar && m.options.hideScrollbar) {
                    if (A == "webkit") {
                        m.hScrollbarWrapper.style[e] = "300ms";
                    }
                    m.hScrollbarWrapper.style.opacity = "0";
                }
                if (m.vScrollbar && m.options.hideScrollbar) {
                    if (A == "webkit") {
                        m.vScrollbarWrapper.style[e] = "300ms";
                    }
                    m.vScrollbarWrapper.style.opacity = "0";
                }
                return;
            }
            m.scrollTo(I, G, H || 0);
        },
        _wheel: function (K) {
            var I = this,
                J, H, G, m, L;
            if ("wheelDeltaX" in K) {
                J = K.wheelDeltaX / 12;
                H = K.wheelDeltaY / 12;
            } else {
                if ("wheelDelta" in K) {
                    J = H = K.wheelDelta / 12;
                } else {
                    if ("detail" in K) {
                        J = H = -K.detail * 3;
                    } else {
                        return;
                    }
                }
            } if (I.options.wheelAction == "zoom") {
                L = I.scale * Math.pow(2, 1 / 3 * (H ? H / Math.abs(H) : 0));
                if (L < I.options.zoomMin) {
                    L = I.options.zoomMin;
                }
                if (L > I.options.zoomMax) {
                    L = I.options.zoomMax;
                }
                if (L != I.scale) {
                    if (!I.wheelZoomCount && I.options.onZoomStart) {
                        I.options.onZoomStart.call(I, K);
                    }
                    I.wheelZoomCount++;
                    I.zoom(K.pageX, K.pageY, L, 400);
                    setTimeout(function () {
                        I.wheelZoomCount--;
                        if (!I.wheelZoomCount && I.options.onZoomEnd) {
                            I.options.onZoomEnd.call(I, K);
                        }
                    }, 400);
                }
                return;
            }
            G = I.x + J;
            m = I.y + H;
            if (G > 0) {
                G = 0;
            } else {
                if (G < I.maxScrollX) {
                    G = I.maxScrollX;
                }
            } if (m > I.minScrollY) {
                m = I.minScrollY;
            } else {
                if (m < I.maxScrollY) {
                    m = I.maxScrollY;
                }
            } if (I.maxScrollY < 0) {
                I.scrollTo(G, m, 0);
            }
        },
        _transitionEnd: function (G) {
            var m = this;
            if (G.target != m.scroller) {
                return;
            }
            m._unbind(a);
            m._startAni();
        },
        _startAni: function () {
            var L = this,
                G = L.x,
                m = L.y,
                J = Date.now(),
                K, I, H;
            if (L.animating) {
                return;
            }
            if (!L.steps.length) {
                L._resetPos(400);
                return;
            }
            K = L.steps.shift();
            if (K.x == G && K.y == m) {
                K.time = 0;
            }
            L.animating = true;
            L.moved = true;
            if (L.options.useTransition) {
                L._transitionTime(K.time);
                L._pos(K.x, K.y);
                L.animating = false;
                if (K.time) {
                    L._bind(a);
                } else {
                    L._resetPos(0);
                }
                return;
            }
            H = function () {
                var M = Date.now(),
                    O, N;
                if (M >= J + K.time) {
                    L._pos(K.x, K.y);
                    L.animating = false;
                    if (L.options.onAnimationEnd) {
                        L.options.onAnimationEnd.call(L);
                    }
                    L._startAni();
                    return;
                }
                M = (M - J) / K.time - 1;
                I = v.sqrt(1 - M * M);
                O = (K.x - G) * I + G;
                N = (K.y - m) * I + m;
                L._pos(O, N);
                if (L.animating) {
                    L.aniTime = q(H);
                }
            };
            H();
        },
        _transitionTime: function (m) {
            m += "ms";
            this.scroller.style[k] = m;
            if (this.hScrollbar) {
                this.hScrollbarIndicator.style[k] = m;
            }
            if (this.vScrollbar) {
                this.vScrollbarIndicator.style[k] = m;
            }
        },
        _momentum: function (M, G, K, m, O) {
            var L = 0.0006,
                H = v.abs(M) / G,
                I = (H * H) / (2 * L),
                N = 0,
                J = 0;
            if (M > 0 && I > K) {
                J = O / (6 / (I / H * L));
                K = K + J;
                H = H * K / I;
                I = K;
            } else {
                if (M < 0 && I > m) {
                    J = O / (6 / (I / H * L));
                    m = m + J;
                    H = H * m / I;
                    I = m;
                }
            }
            I = I * (M < 0 ? -1 : 1);
            N = H / L;
            return {
                dist: I,
                time: v.round(N)
            };
        },
        _offset: function (m) {
            var H = -m.offsetLeft,
                G = -m.offsetTop;
            while (m = m.offsetParent) {
                H -= m.offsetLeft;
                G -= m.offsetTop;
            }
            if (m != this.wrapper) {
                H *= this.scale;
                G *= this.scale;
            }
            return {
                left: H,
                top: G
            };
        },
        _snap: function (N, M) {
            var K = this,
                J, I, L, H, G, m;
            L = K.pagesX.length - 1;
            for (J = 0, I = K.pagesX.length; J < I; J++) {
                if (N >= K.pagesX[J]) {
                    L = J;
                    break;
                }
            }
            if (L == K.currPageX && L > 0 && K.dirX < 0) {
                L--;
            }
            N = K.pagesX[L];
            G = v.abs(N - K.pagesX[K.currPageX]);
            G = G ? v.abs(K.x - N) / G * 500 : 0;
            K.currPageX = L;
            L = K.pagesY.length - 1;
            for (J = 0; J < L; J++) {
                if (M >= K.pagesY[J]) {
                    L = J;
                    break;
                }
            }
            if (L == K.currPageY && L > 0 && K.dirY < 0) {
                L--;
            }
            M = K.pagesY[L];
            m = v.abs(M - K.pagesY[K.currPageY]);
            m = m ? v.abs(K.y - M) / m * 500 : 0;
            K.currPageY = L;
            H = v.round(v.max(G, m)) || 200;
            return {
                x: N,
                y: M,
                time: H
            };
        },
        _bind: function (H, G, m) {
            (G || this.scroller).addEventListener(H, this, !! m);
        },
        _unbind: function (H, G, m) {
            (G || this.scroller).removeEventListener(H, this, !! m);
        },
        destroy: function () {
            var m = this;
            m.scroller.style[l] = "";
            m.hScrollbar = false;
            m.vScrollbar = false;
            m._scrollbar("h");
            m._scrollbar("v");
            m._unbind(g, i);
            m._unbind(b);
            m._unbind(t, i);
            m._unbind(c, i);
            m._unbind(x, i);
            if (!m.options.hasTouch) {
                m._unbind(u);
            }
            if (m.options.useTransition) {
                m._unbind(a);
            }
            if (m.options.checkDOMChanges) {
                clearInterval(m.checkDOMTime);
            }
            if (m.options.onDestroy) {
                m.options.onDestroy.call(m);
            }
        },
        refresh: function () {
            var I = this,
                K, H, m, G, L = 0,
                J = 0;
            if (I.scale < I.options.zoomMin) {
                I.scale = I.options.zoomMin;
            }
            I.wrapperW = I.wrapper.clientWidth || 1;
            I.wrapperH = I.wrapper.clientHeight || 1;
            I.minScrollY = -I.options.topOffset || 0;
            I.scrollerW = v.round(I.scroller.offsetWidth * I.scale);
            I.scrollerH = v.round((I.scroller.offsetHeight + I.minScrollY) * I.scale);
            I.maxScrollX = I.wrapperW - I.scrollerW;
            I.maxScrollY = I.wrapperH - I.scrollerH + I.minScrollY;
            I.dirX = 0;
            I.dirY = 0;
            if (I.options.onRefresh) {
                I.options.onRefresh.call(I);
            }
            I.hScroll = I.options.hScroll && I.maxScrollX < 0;
            I.vScroll = I.options.vScroll && (!I.options.bounceLock && !I.hScroll || I.scrollerH > I.wrapperH);
            I.hScrollbar = I.hScroll && I.options.hScrollbar;
            I.vScrollbar = I.vScroll && I.options.vScrollbar && I.scrollerH > I.wrapperH;
            K = I._offset(I.wrapper);
            I.wrapperOffsetLeft = -K.left;
            I.wrapperOffsetTop = -K.top;
            if (typeof I.options.snap == "string") {
                I.pagesX = [];
                I.pagesY = [];
                G = I.scroller.querySelectorAll(I.options.snap);
                for (H = 0, m = G.length; H < m; H++) {
                    L = I._offset(G[H]);
                    L.left += I.wrapperOffsetLeft;
                    L.top += I.wrapperOffsetTop;
                    I.pagesX[H] = L.left < I.maxScrollX ? I.maxScrollX : L.left * I.scale;
                    I.pagesY[H] = L.top < I.maxScrollY ? I.maxScrollY : L.top * I.scale;
                }
            } else {
                if (I.options.snap) {
                    I.pagesX = [];
                    while (L >= I.maxScrollX) {
                        I.pagesX[J] = L;
                        L = L - I.wrapperW;
                        J++;
                    }
                    if (I.maxScrollX % I.wrapperW) {
                        I.pagesX[I.pagesX.length] = I.maxScrollX - I.pagesX[I.pagesX.length - 1] + I.pagesX[I.pagesX.length - 1];
                    }
                    L = 0;
                    J = 0;
                    I.pagesY = [];
                    while (L >= I.maxScrollY) {
                        I.pagesY[J] = L;
                        L = L - I.wrapperH;
                        J++;
                    }
                    if (I.maxScrollY % I.wrapperH) {
                        I.pagesY[I.pagesY.length] = I.maxScrollY - I.pagesY[I.pagesY.length - 1] + I.pagesY[I.pagesY.length - 1];
                    }
                }
            }
            I._scrollbar("h");
            I._scrollbar("v");
            if (!I.zoomed) {
                I.scroller.style[k] = "0";
                I._resetPos(400);
            }
        },
        scrollTo: function (m, M, L, K) {
            var J = this,
                I = m,
                H, G;
            J.stop();
            if (!I.length) {
                I = [{
                    x: m,
                    y: M,
                    time: L,
                    relative: K
                }];
            }
            for (H = 0, G = I.length; H < G; H++) {
                if (I[H].relative) {
                    I[H].x = J.x - I[H].x;
                    I[H].y = J.y - I[H].y;
                }
                J.steps.push({
                    x: I[H].x,
                    y: I[H].y,
                    time: I[H].time || 0
                });
            }
            J._startAni();
        },
        scrollToElement: function (m, H) {
            var G = this,
                I;
            m = m.nodeType ? m : G.scroller.querySelector(m);
            if (!m) {
                return;
            }
            I = G._offset(m);
            I.left += G.wrapperOffsetLeft;
            I.top += G.wrapperOffsetTop;
            I.left = I.left > 0 ? 0 : I.left < G.maxScrollX ? G.maxScrollX : I.left;
            I.top = I.top > G.minScrollY ? G.minScrollY : I.top < G.maxScrollY ? G.maxScrollY : I.top;
            H = H === undefined ? v.max(v.abs(I.left) * 2, v.abs(I.top) * 2) : H;
            G.scrollTo(I.left, I.top, H);
        },
        scrollToPage: function (H, G, J) {
            var I = this,
                m, K;
            J = J === undefined ? 400 : J;
            if (I.options.onScrollStart) {
                I.options.onScrollStart.call(I);
            }
            if (I.options.snap) {
                H = H == "next" ? I.currPageX + 1 : H == "prev" ? I.currPageX - 1 : H;
                G = G == "next" ? I.currPageY + 1 : G == "prev" ? I.currPageY - 1 : G;
                H = H < 0 ? 0 : H > I.pagesX.length - 1 ? I.pagesX.length - 1 : H;
                G = G < 0 ? 0 : G > I.pagesY.length - 1 ? I.pagesY.length - 1 : G;
                I.currPageX = H;
                I.currPageY = G;
                m = I.pagesX[H];
                K = I.pagesY[G];
            } else {
                m = -I.wrapperW * H;
                K = -I.wrapperH * G;
                if (m < I.maxScrollX) {
                    m = I.maxScrollX;
                }
                if (K < I.maxScrollY) {
                    K = I.maxScrollY;
                }
            }
            I.scrollTo(m, K, J);
        },
        disable: function () {
            this.stop();
            this._resetPos(0);
            this.enabled = false;
            this._unbind(t, i);
            this._unbind(c, i);
            this._unbind(x, i);
        },
        enable: function () {
            this.enabled = true;
        },
        stop: function () {
            if (this.options.useTransition) {
                this._unbind(a);
            } else {
                p(this.aniTime);
            }
            this.steps = [];
            this.moved = false;
            this.animating = false;
        },
        zoom: function (m, K, J, I) {
            var G = this,
                H = J / G.scale;
            if (!G.options.useTransform) {
                return;
            }
            G.zoomed = true;
            I = I === undefined ? 200 : I;
            m = m - G.wrapperOffsetLeft - G.x;
            K = K - G.wrapperOffsetTop - G.y;
            G.x = m - m * H + G.x;
            G.y = K - K * H + G.y;
            G.scale = J;
            G.refresh();
            G.x = G.x > 0 ? 0 : G.x < G.maxScrollX ? G.maxScrollX : G.x;
            G.y = G.y > G.minScrollY ? G.minScrollY : G.y < G.maxScrollY ? G.maxScrollY : G.y;
            G.scroller.style[k] = I + "ms";
            G.scroller.style[l] = "translate(" + G.x + "px," + G.y + "px) scale(" + J + ")" + D;
            G.zoomed = false;
        },
        isReady: function () {
            return !this.moved && !this.zoomed && !this.animating;
        }
    };

    function s(m) {
        if (A === "") {
            return m;
        }
        m = m.charAt(0).toUpperCase() + m.substr(1);
        return A + m;
    }
    n = null;
    if (typeof exports !== "undefined") {
        exports.iScroll = w;
    } else {
        i.iScroll = w;
    }
})(window, document);

// jquery.royalslider v9.1.9b
(function (k) {
    function t(b, e) {
        var c = navigator.userAgent.toLowerCase(),
            g = k.browser,
            a = this,
            f = g.webkit;
        c.indexOf("android");
        a.isIPAD = c.match(/(ipad)/);
        for (var d = document.createElement("div").style, i = ["webkit", "Moz", "ms", "O"], h = "", j = 0, m, c = 0; c < i.length; c++) m = i[c], !h && m + "Transform" in d && (h = m), m = m.toLowerCase(), window.requestAnimationFrame || (window.requestAnimationFrame = window[m + "RequestAnimationFrame"], window.cancelAnimationFrame = window[m + "CancelAnimationFrame"] || window[m + "CancelRequestAnimationFrame"]);
        window.requestAnimationFrame || (window.requestAnimationFrame = function (a) {
            var b = (new Date).getTime(),
                c = Math.max(0, 16 - (b - j)),
                d = window.setTimeout(function () {
                    a(b + c)
                }, c);
            j = b + c;
            return d
        });
        window.cancelAnimationFrame || (window.cancelAnimationFrame = function (a) {
            clearTimeout(a)
        });
        a.slider = k(b);
        a.ev = k({});
        a._a = k(document);
        a.st = k.extend({}, k.fn.royalSlider.defaults, e);
        a._b = a.st.transitionSpeed;
        if (a.st.allowCSS3 && (!f || a.st.allowCSS3OnWebkit)) c = h + (h ? "T" : "t"), a._c = c + "ransform" in d && c + "ransition" in d, a._c && (a._d = h +
            (h ? "P" : "p") + "erspective" in d);
        h = h.toLowerCase();
        a._e = "-" + h + "-";
        a._f = "vertical" === a.st.slidesOrientation ? !1 : !0;
        a._g = a._f ? "left" : "top";
        a._h = a._f ? "width" : "height";
        a._i = -1;
        a._j = "fade" === a.st.transitionType ? !1 : !0;
        a._j || (a.st.sliderDrag = !1, a._k = 10);
        a._l = 0;
        a._m = 0;
        k.each(k.rsModules, function (b, c) {
            c.call(a)
        });
        a.slides = [];
        a._n = 0;
        (a.st.slides ? k(a.st.slides) : a.slider.children().detach()).each(function () {
            a._o(this, true)
        });
        a.st.randomizeSlides && a.slides.sort(function () {
            return 0.5 - Math.random()
        });
        a.numSlides = a.slides.length;
        a._p();
        a.st.startSlideId > a.numSlides - 1 && (a.st.startSlideId = a.numSlides - 1);
        a.staticSlideId = a.currSlideId = a._q = a.st.startSlideId;
        a.currSlide = a.slides[a.currSlideId];
        a._r = 0;
        a.slider.addClass((a._f ? "rsHor" : "rsVer") + (a._j ? "" : " rsFade"));
        d = '<div class="rsOverflow"><div class="rsContainer">';
        a.slidesSpacing = a.st.slidesSpacing;
        a._s = (a._f ? a.slider.width() : a.slider.height()) + a.st.slidesSpacing;
        a._t = Boolean(0 < a._u);
        1 >= a.numSlides && (a._v = !1);
        a._w = a._v && a._j ? 2 === a.numSlides ? 1 : 2 : 0;
        a._x = 6 > a.numSlides ? a.numSlides :
            6;
        a._y = 0;
        a._z = 0;
        a.slidesJQ = [];
        for (c = 0; c < a.numSlides; c++) a.slidesJQ.push(k('<div style="' + (a._j ? "" : c !== a.currSlideId ? "z-index: 0; display:none; opacity: 0; position: absolute;  left: 0; top: 0;" : "z-index: 0;  position: absolute; left: 0; top: 0;") + '" class="rsSlide "></div>'));
        a.slider.html(d + "</div></div>");
        a._a1 = a.slider.children(".rsOverflow");
        a._b1 = a._a1.children(".rsContainer");
        a._c1 = k('<div class="rsPreloader"></div>');
        c = a._b1.children(".rsSlide");
        a._d1 = a.slidesJQ[a.currSlideId];
        a._e1 = 0;
        "ontouchstart" in
            window || "createTouch" in document ? (a.hasTouch = !0, a._f1 = "touchstart.rs", a._g1 = "touchmove.rs", a._h1 = "touchend.rs", a._i1 = "touchcancel.rs", a._j1 = 0.5) : (a.hasTouch = !1, a._j1 = 0.2, a.st.sliderDrag && (g.msie || g.opera ? a._k1 = a._l1 = "move" : g.mozilla ? (a._k1 = "-moz-grab", a._l1 = "-moz-grabbing") : f && -1 != navigator.platform.indexOf("Mac") && (a._k1 = "-webkit-grab", a._l1 = "-webkit-grabbing"), a._m1()), a._f1 = "mousedown.rs", a._g1 = "mousemove.rs", a._h1 = "mouseup.rs", a._i1 = "mouseup.rs");
        a._c ? (a._n1 = "transition-property", a._o1 = "transition-duration",
            a._p1 = "transition-timing-function", a._q1 = a._r1 = a._e + "transform", a._d ? (f && a.slider.addClass("rsWebkit3d"), a._s1 = "translate3d(", a._t1 = "px, ", a._u1 = "px, 0px)") : (a._s1 = "translate(", a._t1 = "px, ", a._u1 = "px)"), a._j) ? a._b1[a._e + a._n1] = a._e + "transform" : (g = {}, g[a._e + a._n1] = "opacity", g[a._e + a._o1] = a.st.transitionSpeed + "ms", g[a._e + a._p1] = a.st.css3easeInOut, c.css(g)) : (a._r1 = "left", a._q1 = "top");
        var l;
        k(window).on("resize.rs", function () {
            l && clearTimeout(l);
            l = setTimeout(function () {
                a.updateSliderSize()
            }, 50)
        });
        a.ev.trigger("rsAfterPropsSetup");
        a.updateSliderSize();
        a.st.keyboardNavEnabled && a._v1();
        a.st.arrowsNavHideOnTouch && a.hasTouch && (a.st.arrowsNav = !1);
        a.st.arrowsNav && (g = a.st.controlsInside ? a._a1 : a.slider, k('<div class="rsArrow rsArrowLeft"><div class="rsArrowIcn"></div></div><div class="rsArrow rsArrowRight"><div class="rsArrowIcn"></div></div>').appendTo(g), a._w1 = g.children(".rsArrowLeft").click(function (b) {
            b.preventDefault();
            a.prev()
        }), a._x1 = g.children(".rsArrowRight").click(function (b) {
            b.preventDefault();
            a.next()
        }), a.st.arrowsNavAutoHide && !a.hasTouch && (a._w1.addClass("rsHidden"), a._x1.addClass("rsHidden"), g.one("mousemove.arrowshover", function () {
            a._w1.removeClass("rsHidden");
            a._x1.removeClass("rsHidden")
        }), g.hover(function () {
            if (!a._y1) {
                a._w1.removeClass("rsHidden");
                a._x1.removeClass("rsHidden")
            }
        }, function () {
            if (!a._y1) {
                a._w1.addClass("rsHidden");
                a._x1.addClass("rsHidden")
            }
        })), a.ev.on("rsOnUpdateNav", function () {
            a._z1()
        }), a._z1());
        a._a2 = !a.hasTouch && a.st.sliderDrag || a.hasTouch && a.st.sliderTouch;
        if (a._a2) a._b1.on(a._f1, function (b) {
            a._b2(b)
        });
        else a.dragSuccess = !1;
        var q = ["rsPlayBtnIcon", "rsPlayBtn", "rsCloseVideoBtn", "rsCloseVideoIcn"];
        a._b1.click(function (b) {
            if (!a.dragSuccess) {
                var c = k(b.target).attr("class");
                if (k.inArray(c, q) !== -1 && a.toggleVideo()) return false;
                if (a.st.navigateByClick && !a._c2) {
                    if (k(b.target).closest(".rsNoDrag", a._d1).length) return true;
                    a._d2(b)
                }
            }
        });
        a.ev.trigger("rsAfterInit")
    }
    k.rsModules || (k.rsModules = {});
    t.prototype = {
        _d2: function (b) {
            b[this._f ? "pageX" : "pageY"] - this._e2 > 0 ? this.next() : this.prev()
        },
        _p: function () {
            var b;
            b =
                this.st.numImagesToPreload;
            if (this._v = this.st.loop)
                if (this.numSlides === 2) {
                    this._v = false;
                    this.st.loopRewind = true
                } else if (this.numSlides < 2) this.st.loopRewind = this._v = false;
            this._v && b > 0 && (this.numSlides <= 4 ? b = 1 : this.st.numImagesToPreload > (this.numSlides - 1) / 2 && (b = Math.floor((this.numSlides - 1) / 2)));
            this._u = b
        },
        _o: function (b, e) {
            function c(b, c) {
                a.image = b.attr(!c ? "src" : c);
                a.caption = !c ? b.attr("alt") : b.contents();
                a.videoURL = b.attr("data-rsVideo")
            }
            var g, a = {};
            this._f2 = b = k(b);
            this.ev.trigger("rsBeforeParseNode", [b, a]);
            if (!a.stopParsing) {
                b = this._f2;
                a.id = this._n;
                a.contentAdded = false;
                this._n++;
                if (!a.hasCover) {
                    if (b.hasClass("rsImg")) {
                        tempEl = b;
                        g = true
                    } else {
                        tempEl = b.find(".rsImg");
                        tempEl.length && (g = true)
                    } if (g) {
                        a.bigImage = tempEl.attr("data-rsBigImg");
                        tempEl.is("a") ? c(tempEl, "href") : tempEl.is("img") && c(tempEl)
                    } else if (b.is("img")) {
                        b.addClass("rsImg");
                        c(b)
                    }
                }
                tempEl = b.find(".rsCaption");
                if (tempEl.length) a.caption = tempEl.remove();
                if (!a.image) {
                    a.isLoaded = true;
                    a.isRendered = false;
                    a.isLoading = false
                }
                a.content = b;
                this.ev.trigger("rsAfterParseNode", [b, a]);
                e && this.slides.push(a);
                return a
            }
        },
        _v1: function () {
            var b = this;
            b._a.on("keydown.rskb", function (e) {
                if (!b._g2 && !b._h2)
                    if (e.keyCode === 37) {
                        e.preventDefault();
                        b.prev()
                    } else if (e.keyCode === 39) {
                        e.preventDefault();
                        b.next()
                    }
            })
        },
        goTo: function (b, e) {
            b !== this.currSlideId && this._i2(b, this.st.transitionSpeed, true, !e)
        },
        destroy: function (b) {
            var e = this;
            e.ev.trigger("rsBeforeDestroy");
            e._a.off("keydown.rskb " + e._g1 + " " + e._h1);
            e._b1.on(e._f1, function (b) {
                e._b2(b)
            });
            e.slider.data("royalSlider", "");
            b && e.slider.remove()
        },
        _j2: function (b, e) {
            function c(c, e, f) {
                if (c.isAdded) {
                    g(e, c);
                    a(e, c)
                } else {
                    f || (f = d.slidesJQ[e]);
                    if (c.holder) f = c.holder;
                    else {
                        f = d.slidesJQ[e] = k(f);
                        c.holder = f
                    }
                    c.appendOnLoaded = false;
                    a(e, c, f);
                    g(e, c);
                    d._l2(c, f, b);
                    appended = c.isAdded = true
                }
            }

            function g(a, c) {
                if (!c.contentAdded) {
                    d.setItemHtml(c, b);
                    if (!b) c.contentAdded = true
                }
            }

            function a(a, b, c) {
                if (d._j) {
                    c || (c = d.slidesJQ[a]);
                    c.css(d._g, (a + d._z + q) * d._s)
                }
            }

            function f(a) {
                if (j) {
                    if (a > m - 1) return f(a - m);
                    if (a < 0) return f(m + a)
                }
                return a
            }
            var d = this,
                i, h, j = d._v,
                m = d.numSlides;
            if (!isNaN(e)) return f(e);
            var l = d.currSlideId,
                q, n = b ? Math.abs(d._k2 - d.currSlideId) >= d.numSlides - 1 ? 0 : 1 : d._u,
                o = Math.min(2, n),
                r = false,
                s = false,
                p;
            for (h = l; h < l + 1 + o; h++) {
                p = f(h);
                if ((i = d.slides[p]) && (!i.isAdded || !i.positionSet)) {
                    r = true;
                    break
                }
            }
            for (h = l - 1; h > l - 1 - o; h--) {
                p = f(h);
                if ((i = d.slides[p]) && (!i.isAdded || !i.positionSet)) {
                    s = true;
                    break
                }
            }
            if (r)
                for (h = l; h < l + n + 1; h++) {
                    p = f(h);
                    q = Math.floor((d._q - (l - h)) / d.numSlides) * d.numSlides;
                    (i = d.slides[p]) && c(i, p)
                }
            if (s)
                for (h = l - 1; h > l - 1 - n; h--) {
                    p = f(h);
                    q = Math.floor((d._q - (l - h)) / m) * m;
                    (i = d.slides[p]) && c(i, p)
                }
            if (!b) {
                o =
                    f(l - n);
                l = f(l + n);
                n = o > l ? 0 : o;
                for (h = 0; h < m; h++)
                    if (!(o > l && h > o - 1) && (h < n || h > l))
                        if ((i = d.slides[h]) && i.holder) {
                            i.holder.detach();
                            i.isAdded = false
                        }
            }
        },
        setItemHtml: function (b, e) {
            function c() {
                a.isWaiting = true;
                b.holder.html(g._c1.clone());
                a.slideId = -99
            }
            var g = this,
                a = b.holder,
                f = function (a) {
                    var b = a.sizeType;
                    return function (d) {
                        var f = a.content,
                            h = a.holder;
                        if (d) {
                            var i = d.currentTarget;
                            k(i).off("load error");
                            if (d.type === "error") {
                                a.isLoaded = true;
                                a.image = "";
                                a.isLoading = false;
                                f.addClass("rsSlideError");
                                h.html(f);
                                a.holder.trigger("rsAfterContentSet");
                                g.ev.trigger("rsAfterContentSet", a);
                                return
                            }
                        }

                        if (a.image) {
                            if (a.bigImage && a.sizeType !== b) {
                                b === "med" ? a.isMedLoading = false : b === "big" ? a.isBigLoading = false : a.isMedLoading = a.isLoading = false;
                                return
                            }
                            if (a.isLoaded) {
                                if (!a.isRendered && e) {
                                    c();
                                    return
                                }
                                g._m2(a)
                            }
                            else {
                                var j;
                                if (f.hasClass("rsImg")) {
                                    j = true;
                                    d = f
                                } else {
                                    j = false;
                                    d = f.find(".rsImg")
                                }
                                if (d.length && d.is("a")) {
                                    j ? f = k('<img class="rsImg" src="' + a.image + '" />') : f.find(".rsImg").replaceWith('<img class="rsImg" src="' + a.image + '" />');
                                    a.content = f
                                }
                                a.iW = i.width;
                                if (a.iW >
                                    0) {
                                    a.iH = i.height;//ashraf
                                    a.isLoaded = true;
                                    a.isLoading = false;
                                    //console.log(a);
                                    g._m2(a);

                                }
                                //console.log(i.height);
                            }
                        } else {
                            if (!g._t && e && !a.isRendered) {
                                a.isRendered = true;
                                c();
                                return
                            }
                            a.isLoaded = true;
                            a.isLoading = false
                        }
                        i = a.id - g._l;
                        if (!e && !a.appendOnLoaded && g.st.fadeinLoadedSlide && (i === 0 || (g._h2 || g._g2) && (i === -1 || i === 1))) {
                            f.css(g._e + "transition", "opacity 400ms ease-in-out").css({
                                visibility: "visible",
                                opacity: 0
                            });
                            h.html(f);
                            setTimeout(function () {
                                f.css("opacity", 1)
                            }, 6)
                        } else h.html(f);
                        a.isRendered = true;
                        h.find("a").off("click.rs").on("click.rs", function () {
                            if (g.dragSuccess) return false;
                            g._c2 = true;
                            g.ev.trigger("rsSlideClick");
                            setTimeout(function () {
                                g._c2 = false
                            }, 3)
                        });
                        a.holder.trigger("rsAfterContentSet");
                        g.ev.trigger("rsAfterContentSet", a);
                        a.appendOnLoaded && g._l2(a, f, e)
                    }
                };
            if (b.isLoaded) f(b)();
            else if (e) c();
            else if (b.image)
                if (b.isLoading) {
                    var d = 1,
                        i = function () {
                            if (b.isLoading)
                                if (b.isLoaded) f(b)();
                                else {
                                    if (d % 50 === 0) {
                                        var a = b.imageLoader;
                                        if (a.complete && a.naturalWidth !== void 0 && a.naturalWidth !== 0 && a.naturalHeight !== 0) {
                                            f(b)();
                                            return
                                        }
                                    }
                                    if (!(d > 300)) {
                                        setTimeout(i, 400);
                                        d++
                                    }
                                }
                        };
                    i(b.sizeType)
                } else {
                    var h =
                            k("<img/>"),
                        j = b.image;
                    if (e) c();
                    else if (!b.isLoading) {
                        if (!j) {
                            j = h.attr("src");
                            h = k("<img/>")
                        }
                        b.holder.html(g._c1.clone());
                        b.isLoading = true;
                        b.imageLoader = h;
                        h.one("load error", f(b)).attr("src", j)
                    }
                } else f(b)()
        },
        _l2: function (b, e, c) {
            var g = b.holder,
                a = b.id - this._l;
            if (this._j && !c && this.st.fadeinLoadedSlide && (a === 0 || (this._h2 || this._g2) && (a === -1 || a === 1))) {
                e = b.content;
                e.css(this._e + "transition", "opacity 400ms ease-in-out").css({
                    visibility: "visible",
                    opacity: 0
                });
                this._b1.append(g);
                setTimeout(function () {
                    e.css("opacity",
                        1)
                }, 6)
            } else this._b1.append(g);
            b.appendOnLoaded = false
        },
        _b2: function (b, e) {
            var c = this,
                g;
            c.dragSuccess = false;
            if (k(b.target).closest(".rsNoDrag", c._d1).length) return true;
            e || c._h2 && c._n2();
            if (c._g2) {
                if (c.hasTouch) c._o2 = true
            } else {
                if (c.hasTouch) c._o2 = false;
                c._p2();
                if (c.hasTouch) {
                    var a = b.originalEvent.touches;
                    if (a && a.length > 0) {
                        g = a[0];
                        if (a.length > 1) c._o2 = true
                    } else return
                } else {
                    g = b;
                    b.preventDefault()
                }
                c._g2 = true;
                c._a.on(c._g1, function (a) {
                    c._q2(a, e)
                }).on(c._h1, function (a) {
                        c._r2(a, e)
                    });
                c._s2 = "";
                c._t2 = false;
                c._u2 =
                    g.pageX;
                c._v2 = g.pageY;
                c._w2 = c._r = (!e ? c._f : c._x2) ? g.pageX : g.pageY;
                c._y2 = 0;
                c._z2 = 0;
                c._a3 = !e ? c._m : c._b3;
                c._c3 = (new Date).getTime();
                if (c.hasTouch) c._a1.on(c._i1, function (a) {
                    c._r2(a, e)
                })
            }
        },
        _d3: function (b, e) {
            if (this._e3) {
                var c = this._f3,
                    g = b.pageX - this._u2,
                    a = b.pageY - this._v2,
                    f = this._a3 + g,
                    d = this._a3 + a,
                    i = !e ? this._f : this._x2,
                    f = i ? f : d,
                    h = this._s2;
                this._t2 = true;
                this._u2 = b.pageX;
                this._v2 = b.pageY;
                d = i ? this._u2 : this._v2;
                if (h === "x" && g !== 0) this._y2 = g > 0 ? 1 : -1;
                else if (h === "y" && a !== 0) this._z2 = a > 0 ? 1 : -1;
                g = i ? g : a;
                if (e) f > this._g3 ?
                    f = this._a3 + g * this._j1 : f < this._h3 && (f = this._a3 + g * this._j1);
                else if (!this._v) {
                    this.currSlideId <= 0 && d - this._w2 > 0 && (f = this._a3 + g * this._j1);
                    this.currSlideId >= this.numSlides - 1 && d - this._w2 < 0 && (f = this._a3 + g * this._j1)
                }
                this._a3 = f;
                if (c - this._c3 > 200) {
                    this._c3 = c;
                    this._r = d
                }
                e ? this._j3(this._a3) : this._j && this._i3(this._a3)
            }
        },
        _q2: function (b, e) {
            var c = this;
            if (c.hasTouch) {
                if (c._k3) return;
                var g = b.originalEvent.touches;
                if (g) {
                    if (g.length > 1) return;
                    point = g[0]
                } else return
            } else point = b; if (!c._t2) {
                c._c && (!e ? c._b1 : c._l3).css(c._e +
                    c._o1, "0s");
                (function d() {
                    if (c._g2) {
                        c._m3 = requestAnimationFrame(d);
                        c._n3 && c._d3(c._n3, e)
                    }
                })()
            }
            if (c._e3) {
                b.preventDefault();
                c._f3 = (new Date).getTime();
                c._n3 = point
            } else {
                var g = !e ? c._f : c._x2,
                    a = Math.abs(point.pageX - c._u2) - Math.abs(point.pageY - c._v2) - (g ? -7 : 7);
                if (a > 7) {
                    if (g) {
                        b.preventDefault();
                        c._s2 = "x"
                    } else if (c.hasTouch) {
                        c._o3();
                        return
                    }
                    c._e3 = true
                } else if (a < -7) {
                    if (g) {
                        if (c.hasTouch) {
                            c._o3();
                            return
                        }
                    } else {
                        b.preventDefault();
                        c._s2 = "y"
                    }
                    c._e3 = true
                }
            }
        },
        _o3: function () {
            this._k3 = true;
            this._t2 = this._g2 = false;
            this._r2()
        },
        _r2: function (b, e) {
            function c(a) {
                return a < 100 ? 100 : a > 500 ? 500 : a
            }

            function g(b, d) {
                if (a._j || e) {
                    i = (-a._q - a._z) * a._s;
                    h = Math.abs(a._m - i);
                    a._b = h / d;
                    if (b) a._b = a._b + 250;
                    a._b = c(a._b);
                    a._q3(i, false)
                }
            }
            var a = this,
                f, d, i, h;
            a.ev.trigger("rsDragRelease");
            a._n3 = null;
            a._g2 = false;
            a._k3 = false;
            a._e3 = false;
            a._f3 = 0;
            cancelAnimationFrame(a._m3);
            a._t2 && (e ? a._j3(a._a3) : a._j && a._i3(a._a3));
            a._a.off(a._g1).off(a._h1);
            a.hasTouch && a._a1.off(a._i1);
            a._m1();
            if (!a._t2 && !a._o2 && e && a._p3) {
                var j = k(b.target).closest(".rsNavItem");
                j.length &&
                a.goTo(j.index())
            } else {
                d = !e ? a._f : a._x2;
                if (a._t2 && !(a._s2 === "y" && d || a._s2 === "x" && !d)) {
                    a.dragSuccess = true;
                    a._s2 = "";
                    var m = a.st.minSlideOffset;
                    f = a.hasTouch ? b.originalEvent.changedTouches[0] : b;
                    var l = d ? f.pageX : f.pageY,
                        q = a._w2;
                    f = a._r;
                    var n = a.currSlideId,
                        o = a.numSlides,
                        r = d ? a._y2 : a._z2,
                        s = a._v;
                    Math.abs(l - q);
                    f = l - f;
                    d = (new Date).getTime() - a._c3;
                    d = Math.abs(f) / d;
                    if (r === 0 || o <= 1) g(true, d);
                    else {
                        if (!s && !e)
                            if (n <= 0) {
                                if (r > 0) {
                                    g(true, d);
                                    return
                                }
                            } else if (n >= o - 1 && r < 0) {
                                g(true, d);
                                return
                            }
                        if (e) {
                            i = a._b3;
                            if (i > a._g3) i = a._g3;
                            else if (i <
                                a._h3) i = a._h3;
                            else {
                                m = d * d / 0.006;
                                j = -a._b3;
                                l = a._r3 - a._s3 + a._b3;
                                if (f > 0 && m > j) {
                                    j = j + a._s3 / (15 / (m / d * 0.003));
                                    d = d * j / m;
                                    m = j
                                } else if (f < 0 && m > l) {
                                    l = l + a._s3 / (15 / (m / d * 0.003));
                                    d = d * l / m;
                                    m = l
                                }
                                j = Math.max(Math.round(d / 0.003), 50);
                                i = i + m * (f < 0 ? -1 : 1);
                                if (i > a._g3) {
                                    a._t3(i, j, true, a._g3, 200);
                                    return
                                }
                                if (i < a._h3) {
                                    a._t3(i, j, true, a._h3, 200);
                                    return
                                }
                            }
                            a._t3(i, j, true)
                        } else q + m < l ? r < 0 ? g(false, d) : a._i2("prev", c(Math.abs(a._m - (-a._q - a._z + 1) * a._s) / d), false, true, true) : q - m > l ? r > 0 ? g(false, d) : a._i2("next", c(Math.abs(a._m - (-a._q - a._z - 1) * a._s) / d), false,
                            true, true) : g(false, d)
                    }
                }
            }
        },
        _i3: function (b) {
            b = this._m = b;
            this._c ? this._b1.css(this._r1, this._s1 + (this._f ? b + this._t1 + 0 : 0 + this._t1 + b) + this._u1) : this._b1.css(this._f ? this._r1 : this._q1, b)
        },
        updateSliderSize: function (b) {
            var e, c;
            this.st.beforeResize && this.st.beforeResize.call(this);
            if (this.st.autoScaleSlider) {
                var g = this.st.autoScaleSliderWidth,
                    a = this.st.autoScaleSliderHeight;
                if (this.st.autoScaleHeight) {
                    e = this.slider.width();
                    if (e != this.width) {
                        this.slider.css("height", e * (a / g));
                        e = this.slider.width()
                    }
                    c = this.slider.height()
                } else {
                    c =
                        this.slider.height();
                    if (c != this.height) {
                        this.slider.css("width", c * (g / a));
                        c = this.slider.height()
                    }
                    e = this.slider.width()
                }
            } else {
                e = this.slider.width();
                c = this.slider.height()
            }
            this._e2 = this.slider.offset();
            this._e2 = this._e2[this._g];
            if (b || e != this.width || c != this.height) {
                this.width = e;
                this.height = c;
                this._u3 = e;
                this._v3 = c;
                this.ev.trigger("rsBeforeSizeSet");
                this._a1.css({
                    width: this._u3,
                    height: this._v3
                });
                this._s = (this._f ? this._u3 : this._v3) + this.st.slidesSpacing;
                this._w3 = this.st.imageScalePadding;
                for (e = 0; e < this.slides.length; e++) {
                    b =
                        this.slides[e];
                    b.positionSet = false;
                    if (b && b.image && b.isLoaded) {
                        b.isRendered = false;
                        this._m2(b)
                    }
                }
                if (this._x3)
                    for (e = 0; e < this._x3.length; e++) {
                        b = this._x3[e];
                        b.holder.css(this._g, (b.id + this._z) * this._s)
                    }
                this._j2();
                if (this._j) {
                    this._c && this._b1.css(this._e + "transition-duration", "0s");
                    this._i3((-this._q - this._z) * this._s)
                }
                this.ev.trigger("rsOnUpdateNav");
                this.st.afterResize && this.st.afterResize.call(this)
            }
        },
        setSlidesOrientation: function () {},
        appendSlide: function (b, e) {
            var c = this._o(b);
            if (isNaN(e) || e > this.numSlides) e =
                this.numSlides;
            this.slides.splice(e, 0, c);
            this.slidesJQ.splice(e, 0, '<div style="' + (this._j ? "position: absolute;" : "z-index: 0; display:none; opacity: 0; position: absolute;  left: 0; top: 0;") + '" class="rsSlide"></div>');
            e < this.currSlideId && this.currSlideId++;
            this.ev.trigger("rsOnAppendSlide", [c, e]);
            this._z3(e);
            e === this.currSlideId && this.ev.trigger("rsAfterSlideChange")
        },
        removeSlide: function (b) {
            var e = this.slides[b];
            if (e) {
                e.holder && e.holder.remove();
                b < this.currSlideId && this.currSlideId++;
                this.slides.splice(b,
                    1);
                this.slidesJQ.splice(b, 1);
                this.ev.trigger("rsOnRemoveSlide", [b]);
                this._z3(b);
                b === this.currSlideId && this.ev.trigger("rsAfterSlideChange")
            }
        },
        _z3: function () {
            var b = this,
                e = b.numSlides,
                e = b._q <= 0 ? 0 : Math.floor(b._q / e);
            b.numSlides = b.slides.length;
            if (b.numSlides === 0) {
                b.currSlideId = b._z = b._q = 0;
                b.currSlide = b._a4 = null
            } else b._q = e * b.numSlides + b.currSlideId;
            for (e = 0; e < b.numSlides; e++) b.slides[e].id = e;
            b.currSlide = b.slides[b.currSlideId];
            b._d1 = b.slidesJQ[b.currSlideId];
            b.currSlideId >= b.numSlides ? b.goTo(b.numSlides -
                1) : b.currSlideId < 0 && b.goTo(0);
            b._p();
            b._j && b._v && b._b1.css(b._e + b._o1, "0ms");
            b._b4 && clearTimeout(b._b4);
            b._b4 = setTimeout(function () {
                b._i3((-b._q - b._z) * b._s);
                b._j2()
            }, 14);
            b.ev.trigger("rsOnUpdateNav")
        },
        _m1: function () {
            if (!this.hasTouch && this._j)
                if (this._k1) this._a1.css("cursor", this._k1);
                else {
                    this._a1.removeClass("grabbing-cursor");
                    this._a1.addClass("grab-cursor")
                }
        },
        _p2: function () {
            if (!this.hasTouch && this._j)
                if (this._l1) this._a1.css("cursor", this._l1);
                else {
                    this._a1.removeClass("grab-cursor");
                    this._a1.addClass("grabbing-cursor")
                }
        },
        next: function (b) {
            this._i2("next", this.st.transitionSpeed, true, !b)
        },
        prev: function (b) {
            this._i2("prev", this.st.transitionSpeed, true, !b)
        },
        _i2: function (b, e, c, g, a) {
            var f = this,
                d, i, h;
            f._d4 && f.stopVideo();
            f.ev.trigger("rsBeforeMove", [b, g]);
            newItemId = b === "next" ? f.currSlideId + 1 : b === "prev" ? f.currSlideId - 1 : b = parseInt(b, 10);
            if (!f._v) {
                if (newItemId < 0) {
                    f._e4("left", !g);
                    return
                }
                if (newItemId >= f.numSlides) {
                    f._e4("right", !g);
                    return
                }
            }
            if (f._h2) {
                f._n2();
                c = false
            }
            i = newItemId - f.currSlideId;
            h = f._k2 = f.currSlideId;
            var j = f.currSlideId +
                    i,
                g = f._q,
                m;
            if (f._v) {
                j = f._j2(false, j);
                g = g + i
            } else g = j;
            f._l = j;
            f._a4 = f.slidesJQ[f.currSlideId];
            f._q = g;
            f.currSlideId = f._l;
            f.currSlide = f.slides[f.currSlideId];
            f._d1 = f.slidesJQ[f.currSlideId];
            j = Boolean(i > 0);
            i = Math.abs(i);
            var l = Math.floor(h / f._u),
                k = Math.floor((h + (j ? 2 : -2)) / f._u),
                l = (j ? Math.max(l, k) : Math.min(l, k)) * f._u + (j ? f._u - 1 : 0);
            l > f.numSlides - 1 ? l = f.numSlides - 1 : l < 0 && (l = 0);
            h = j ? l - h : h - l;
            if (h > f._u) h = f._u;
            if (i > h + 2) {
                f._z = f._z + (i - (h + 2)) * (j ? -1 : 1);
                e = e * 1.4;
                for (h = 0; h < f.numSlides; h++) f.slides[h].positionSet = false
            }
            f._b =
                e;
            f._j2(true);
            a || (m = true);
            d = (-g - f._z) * f._s;
            if (m) setTimeout(function () {
                f._c4 = false;
                f._q3(d, b, false, c);
                f.ev.trigger("rsOnUpdateNav")
            }, 0);
            else {
                f._q3(d, b, false, c);
                f.ev.trigger("rsOnUpdateNav")
            }
        },
        _z1: function () {
            if (this.st.arrowsNav)
                if (this.numSlides <= 1) {
                    this._w1.css("display", "none");
                    this._x1.css("display", "none")
                } else {
                    this._w1.css("display", "block");
                    this._x1.css("display", "block");
                    if (!this._v && !this.st.loopRewind) {
                        this.currSlideId === 0 ? this._w1.addClass("rsArrowDisabled") : this._w1.removeClass("rsArrowDisabled");
                        this.currSlideId === this.numSlides - 1 ? this._x1.addClass("rsArrowDisabled") : this._x1.removeClass("rsArrowDisabled")
                    }
                }
        },
        _q3: function (b, e, c, g, a) {
            function f() {
                var a = i.data("rsTimeout");
                if (a) {
                    i !== h && i.css({
                        opacity: 0,
                        display: "none",
                        zIndex: 0
                    });
                    clearTimeout(a);
                    i.data("rsTimeout", "")
                }
                if (a = h.data("rsTimeout")) {
                    clearTimeout(a);
                    h.data("rsTimeout", "")
                }
            }
            var d = this,
                i, h, j = {};
            if (isNaN(d._b)) d._b = 400;
            d._m = d._a3 = b;
            d.ev.trigger("rsBeforeAnimStart");
            d.st.beforeSlideChange && d.st.beforeSlideChange.call(d);
            if (d._c)
                if (d._j) {
                    j[d._e +
                        d._o1] = d._b + "ms";
                    j[d._e + d._p1] = g ? k.rsCSS3Easing[d.st.easeInOut] : k.rsCSS3Easing[d.st.easeOut];
                    d._b1.css(j);
                    setTimeout(function () {
                        d._i3(b)
                    }, d.hasTouch ? 5 : 0)
                } else {
                    d._b = d.st.transitionSpeed;
                    i = d._a4;
                    h = d._d1;
                    h.data("rsTimeout") && h.css("opacity", 0);
                    f();
                    i && i.data("rsTimeout", setTimeout(function () {
                        j[d._e + d._o1] = "0ms";
                        j.zIndex = 0;
                        j.display = "none";
                        i.data("rsTimeout", "");
                        i.css(j);
                        setTimeout(function () {
                            i.css("opacity", 0)
                        }, 16)
                    }, d._b + 60));
                    j.display = "block";
                    j.zIndex = d._k;
                    j.opacity = 0;
                    j[d._e + d._o1] = "0ms";
                    j[d._e + d._p1] =
                        k.rsCSS3Easing[d.st.easeInOut];
                    h.css(j);
                    h.data("rsTimeout", setTimeout(function () {
                        h.css(d._e + d._o1, d._b + "ms");
                        h.data("rsTimeout", setTimeout(function () {
                            h.css("opacity", 1);
                            h.data("rsTimeout", "")
                        }, 20))
                    }, 20))
                } else if (d._j) {
                j[d._f ? d._r1 : d._q1] = b + "px";
                d._b1.animate(j, d._b, g ? d.st.easeInOut : d.st.easeOut)
            } else {
                i = d._a4;
                h = d._d1;
                h.stop(true, true).css({
                    opacity: 0,
                    display: "block",
                    zIndex: d._k
                });
                d._b = d.st.transitionSpeed;
                h.animate({
                    opacity: 1
                }, d._b, d.st.easeInOut);
                f();
                i && i.data("rsTimeout", setTimeout(function () {
                    i.stop(true,
                            true).css({
                            opacity: 0,
                            display: "none",
                            zIndex: 0
                        })
                }, d._b + 60))
            }
            d._h2 = true;
            d.loadingTimeout && clearTimeout(d.loadingTimeout);
            d.loadingTimeout = a ? setTimeout(function () {
                d.loadingTimeout = null;
                a.call()
            }, d._b + 60) : setTimeout(function () {
                d.loadingTimeout = null;
                d._f4(e)
            }, d._b + 60)
        },
        _n2: function () {
            this._h2 = false;
            clearTimeout(this.loadingTimeout);
            if (this._j)
                if (this._c) {
                    var b = this._m,
                        e = this._a3 = this._g4();
                    this._b1.css(this._e + this._o1, "0ms");
                    b !== e && this._i3(e)
                } else {
                    this._b1.stop(true);
                    this._m = parseInt(this._b1.css(this._r1),
                        10)
                } else this._k > 20 ? this._k = 10 : this._k++
        },
        _g4: function () {
            var b = window.getComputedStyle(this._b1.get(0), null).getPropertyValue(this._e + "transform").replace(/^matrix\(/i, "").split(/, |\)$/g);
            return parseInt(b[this._f ? 4 : 5], 10)
        },
        _h4: function (b, e) {
            return this._c ? this._s1 + (e ? b + this._t1 + 0 : 0 + this._t1 + b) + this._u1 : b
        },
        _f4: function () {
            if (!this._j) {
                this._d1.css("z-index", 0);
                this._k = 10
            }
            this._h2 = false;
            this.staticSlideId = this.currSlideId;
            this._j2();
            this._i4 = false;
            this.ev.trigger("rsAfterSlideChange");
            this.st.afterSlideChange &&
            this.st.afterSlideChange.call(this)
        },
        _e4: function (b, e) {
            var c = this,
                g = (-c._q - c._z) * c._s;
            moveDist = 30;
            if (c.numSlides !== 0)
                if (c.st.loopRewind) b === "left" ? c.goTo(c.numSlides - 1, e) : c.goTo(0, e);
                else if (!c._h2 && c._j && moveDist !== 0) {
                    c._b = 200;
                    var a = function () {
                        c._h2 = false
                    };
                    c._q3(g + (b === "left" ? moveDist : -moveDist), "", false, true, function () {
                        c._h2 = false;
                        c._q3(g, "", false, true, a)
                    })
                }
        },
        _m2: function (b) {
            if (!b.isRendered) {
                var e = b.content,
                    c = "rsImg",
                    g, a = this.st.imageAlignCenter,
                    f = this.st.imageScaleMode,
                    d;
                if (b.videoURL) {
                    c = "rsVideoContainer";
                    if (f !== "fill") g = true;
                    else {
                        d = e;
                        d.hasClass(c) || (d = d.find("." + c));
                        d.css({
                            width: "100%",
                            height: "100%"
                        });
                        c = "rsImg"
                    }
                }
                e.hasClass(c) || (e = e.find("." + c));
                var i = b.iW,
                    c = b.iH;
                b.isRendered = true;
                if (f !== "none" || a) {
                    bMargin = f !== "fill" ? this._w3 : 0;
                    b = this._u3 - bMargin * 2;
                    d = this._v3 - bMargin * 2;
                    var h, j, k = {};
                    if (f === "fit-if-smaller" && (i > b || c > d)) f = "fit";
                    if (f === "fill" || f === "fit") {
                        h = b / i;
                        j = d / c;
                        h = f == "fill" ? h > j ? h : j : f == "fit" ? h < j ? h : j : 1;
                        i = Math.ceil(i * h, 10);
                        c = Math.ceil(c * h, 10)
                    }
                    if (f !== "none") {
                        k.width = i;
                        k.height = c;
                        g && e.find(".rsImg").css({
                            width: "100%",
                            height: "100%"
                        })
                    }
                    if (a) {
                        k.marginLeft = Math.floor((b - i) / 2) + bMargin;
                        k.marginTop = Math.floor((d - c) / 2) + bMargin
                    }

                    //k['margin-top']= k.height/2;
                    //console.log(k);
                    delete k.height;


                    //console.log(e[0].width);
                    //console.log(e[0].height);
                    //var sdf=e.parent().parent().parent();
                    //w=jQuery(document).find("mobileSettings");
                    //var v = w.children(),j={};
                    /*for (var p = 0; p < v.length; p++) {
                        var t = d(v[p]).prop("tagName");
                        t = t.toLowerCase(t);
                        var s = d(v[p]).text();
                        if (s !== "" && s) {
                            j.settings[t] = s;
                        }
                    }*/
                    //console.log(w);


                    //jQuery(e[0]).attr('src',jQuery(e[0]).attr('src')).load(function(){ console.log('-'+this.height)});
                    //margtpHeight=jQuery(e[0]);
                    //console.log('ash '+margtpHeight);
                    //console.log(e);

                    e.css(k)
                }
            }
        }
    };
    k.rsProto = t.prototype;
    k.fn.royalSlider = function (b) {
        var e = arguments;
        return this.each(function () {
            var c = k(this);
            if (typeof b === "object" || !b) c.data("royalSlider") || c.data("royalSlider", new t(c, b));
            else if ((c = c.data("royalSlider")) && c[b]) return c[b].apply(c, Array.prototype.slice.call(e, 1))
        })
    };
    k.fn.royalSlider.defaults = {
        slidesSpacing: 8,
        startSlideId: 0,
        loop: !1,
        loopRewind: !1,
        numImagesToPreload: 4,
        fadeinLoadedSlide: !0,
        slidesOrientation: "horizontal",
        transitionType: "move",
        transitionSpeed: 600,
        controlNavigation: "bullets",
        controlsInside: !0,
        arrowsNav: !0,
        arrowsNavAutoHide: !0,
        navigateByClick: !0,
        randomizeSlides: !1,
        sliderDrag: !0,
        sliderTouch: !0,
        keyboardNavEnabled: !1,
        fadeInAfterLoaded: !0,
        allowCSS3: !0,
        allowCSS3OnWebkit: !0,
        addActiveClass: !1,
        autoHeight: !1,
        easeOut: "easeOutSine",
        easeInOut: "easeInOutSine",
        minSlideOffset: 10,
        imageScaleMode: "fit-if-smaller",
        imageAlignCenter: !0,
        imageScalePadding: 4,
        autoScaleSlider: !1,
        autoScaleSliderWidth: 800,
        autoScaleSliderHeight: 400,
        autoScaleHeight: !0,
        arrowsNavHideOnTouch: !1,
        globalCaption: !1,
        beforeSlideChange: null,
        afterSlideChange: null,
        beforeResize: null,
        afterResize: null
    };
    k.rsCSS3Easing = {
        easeOutSine: "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
        easeInOutSine: "cubic-bezier(0.445, 0.050, 0.550, 0.950)"
    };
    k.extend(jQuery.easing, {
        easeInOutSine: function (b, e, c, g, a) {
            return -g / 2 * (Math.cos(Math.PI * e / a) - 1) + c
        },
        easeOutSine: function (b, e, c, g, a) {
            return g * Math.sin(e / a * (Math.PI / 2)) + c
        },
        easeOutCubic: function (b,
                                e, c, g, a) {
            return g * ((e = e / a - 1) * e * e + 1) + c
        }
    })
})(jQuery);
// jquery.rs.active-class v1.0
(function (b) {
    b.rsProto._j4 = function () {
        var c, a = this;
        if (a.st.addActiveClass) {
            a.ev.on("rsBeforeMove", function () {
                b()
            });
            a.ev.on("rsAfterInit", function () {
                b()
            });
            var b = function () {
                c && clearTimeout(c);
                c = setTimeout(function () {
                    a._a4 && a._a4.removeClass("rsActiveSlide");
                    a._d1 && a._d1.addClass("rsActiveSlide");
                    c = null
                }, 50)
            }
        }
    };
    b.rsModules.activeClass = b.rsProto._j4
})(jQuery);
// jquery.rs.animated-blocks v1.0.2
(function (i) {
    i.extend(i.rsProto, {
        _k4: function () {
            function j() {
                var e = a.currSlide;
                if (a.currSlide && a.currSlide.isLoaded && a._o4 !== e) {
                    if (0 < a._n4.length) {
                        for (b = 0; b < a._n4.length; b++) clearTimeout(a._n4[b]);
                        a._n4 = []
                    }
                    if (0 < a._m4.length) {
                        var g;
                        for (b = 0; b < a._m4.length; b++)
                            if (g = a._m4[b]) a._c ? (g.block.css(a._e + a._o1, "0s"), g.block.css(g.css)) : g.running ? g.block.stop(!0, !0) : g.block.css(g.css), a._o4 = null, e.animBlocksDisplayed = !1;
                        a._m4 = []
                    }
                    e.animBlocks && (e.animBlocksDisplayed = !0, a._o4 = e, a._p4(e.animBlocks))
                }
            }
            var a = this,
                b;
            a._l4 = {
                fadeEffect: !0,
                moveEffect: "top",
                moveOffset: 20,
                speed: 400,
                easing: "easeOutSine",
                delay: 200
            };
            a.st.block = i.extend({}, a._l4, a.st.block);
            a._m4 = [];
            a._n4 = [];
            a.ev.on("rsAfterInit", function () {
                j()
            });
            a.ev.on("rsBeforeParseNode", function (a, b, c) {
                b = i(b);
                c.animBlocks = b.find(".rsABlock").css("display", "none");
                c.animBlocks.length || (c.animBlocks = b.hasClass("rsABlock") ? b.css("display", "none") : !1)
            });
            a.ev.on("rsAfterContentSet", function (b, g) {
                g.id === a.currSlideId && setTimeout(function () {
                    j()
                }, a.st.fadeinLoadedSlide ?
                    300 : 0)
            });
            a.ev.on("rsAfterSlideChange", function () {
                j()
            })
        },
        _q4: function (i, a) {
            setTimeout(function () {
                i.css(a)
            }, 6)
        },
        _p4: function (j) {
            var a = this,
                b, e, g, c;
            a._n4 = [];
            j.each(function (j) {
                b = i(this);
                e = {};
                g = {};
                c = null;
                var f = b.data("move-offset");
                isNaN(f) && (f = a.st.block.moveOffset);
                if (0 < f) {
                    var d = b.data("move-effect");
                    d ? (d = d.toLowerCase(), "none" === d ? d = !1 : "left" !== d && ("top" !== d && "bottom" !== d && "right" !== d) && (d = a.st.block.moveEffect, "none" === d && (d = !1))) : d = a.st.block.moveEffect;
                    if (d) {
                        var l;
                        l = "right" === d || "left" === d ? !0 : !1;
                        var k, h;
                        isOppositeProp = !1;
                        a._c ? (k = 0, h = a._r1) : (l ? isNaN(parseInt(b.css("right"), 10)) ? h = "left" : (h = "right", isOppositeProp = !0) : isNaN(parseInt(b.css("bottom"), 10)) ? h = "top" : (h = "bottom", isOppositeProp = !0), h = "margin-" + h, isOppositeProp && (f = -f), k = parseInt(b.css(h), 10));
                        g[h] = a._h4("top" === d || "left" === d ? k - f : k + f, l);
                        e[h] = a._h4(k, l)
                    }
                }
                if (f = b.attr("data-fade-effect")) {
                    if ("none" === f.toLowerCase() || "false" === f.toLowerCase()) f = !1
                } else f = a.st.block.fadeEffect;
                f && (g.opacity = 0, e.opacity = 1);
                if (f || d)
                    if (c = {}, c.hasFade = Boolean(f),
                        Boolean(d) && (c.moveProp = h, c.hasMove = !0), c.speed = b.data("speed"), isNaN(c.speed) && (c.speed = a.st.block.speed), c.easing = b.data("easing"), c.easing || (c.easing = a.st.block.easing), c.css3Easing = i.rsCSS3Easing[c.easing], c.delay = b.data("delay"), isNaN(c.delay)) c.delay = a.st.block.delay * j;
                d = {};
                a._c && (d[a._e + a._o1] = "0ms");
                d.moveProp = e.moveProp;
                d.opacity = e.opacity;
                d.display = "none";
                a._m4.push({
                    block: b,
                    css: d
                });
                a._q4(b, g);
                a._n4.push(setTimeout(function (b, d, c, g) {
                    return function () {
                        b.css("display", "block");
                        if (c) {
                            var f = {};
                            if (a._c) {
                                var e = "";
                                c.hasMove && (e = e + c.moveProp);
                                if (c.hasFade) {
                                    c.hasMove && (e = e + ", ");
                                    e = e + "opacity"
                                }
                                f[a._e + a._n1] = e;
                                f[a._e + a._o1] = c.speed + "ms";
                                f[a._e + a._p1] = c.css3Easing;
                                b.css(f);
                                setTimeout(function () {
                                    b.css(d)
                                }, 24)
                            } else setTimeout(function () {
                                b.animate(d, c.speed, c.easing)
                            }, 16)
                        }
                        delete a._n4[g]
                    }
                }(b, e, c, j), 6 >= c.delay ? 12 : c.delay))
            })
        }
    });
    i.rsModules.animatedBlocks = i.rsProto._k4
})(jQuery);
// jquery.rs.auto-height v1.0.1
(function (b) {
    b.extend(b.rsProto, {
        _r4: function () {
            var a = this;
            if (a.st.autoHeight) {
                var b, c;
                a.slider.addClass("rsAutoHeight");
                a.ev.on("rsAfterInit", function () {
                    setTimeout(function () {
                        d(!1);
                        setTimeout(function () {
                            a.slider.append('<div id="clear" style="clear:both;"></div>');
                            a._c && a._a1.css(a._e + "transition", "height " + a.st.transitionSpeed + "ms ease-in-out")
                        }, 16)
                    }, 16)
                });
                a.ev.on("rsBeforeAnimStart", function () {
                    d(!0)
                });
                a.ev.on("rsBeforeSizeSet", function () {
                    setTimeout(function () {
                        d(!1)
                    }, 16)
                });
                var d = function (f) {
                    var e =
                        a.slides[a.currSlideId];
                    b = e.holder;
                    if (e.isLoaded) b && (c = b.height(), 0 !== c && void 0 !== c && (a._v3 = c, a._c || !f ? a._a1.css("height", c) : a._a1.stop(!0, !0).animate({
                        height: c
                    }, a.st.transitionSpeed)));
                    else a.ev.off("rsAfterContentSet.rsAutoHeight").on("rsAfterContentSet.rsAutoHeight", function (a, b) {
                        e === b && d()
                    })
                }
            }
        }
    });
    b.rsModules.autoHeight = b.rsProto._r4
})(jQuery);
// jquery.rs.autoplay v1.0.2
(function (b) {
    b.extend(b.rsProto, {
        _u4: function () {
            var a = this,
                d;
            a._v4 = {
                enabled: !1,
                stopAtAction: !0,
                pauseOnHover: !0,
                delay: 2E3
            };
            a.st.autoPlay = b.extend({}, a._v4, a.st.autoPlay);
            a.st.autoPlay.enabled && (a.ev.on("rsBeforeParseNode", function (a, c, e) {
                c = b(c);
                if (d = c.attr("data-rsDelay")) e.customDelay = parseInt(d, 10)
            }), a.ev.one("rsAfterInit", function () {
                a._w4()
            }), a.ev.on("rsBeforeDestroy", function () {
                a.stopAutoPlay()
            }))
        },
        _w4: function () {
            var a = this;
            a.startAutoPlay();
            a.ev.on("rsAfterContentSet", function (d, b) {
                !a._g2 && (!a._h2 &&
                    a._x4 && b === a.currSlide) && a._y4()
            });
            a.ev.on("rsDragRelease", function () {
                a._x4 && a._z4 && (a._z4 = !1, a._y4())
            });
            a.ev.on("rsAfterSlideChange", function () {
                a._x4 && a._z4 && (a._z4 = !1, a.currSlide.isLoaded && a._y4())
            });
            a.ev.on("rsDragStart", function () {
                a._x4 && (a.st.autoPlay.stopAtAction ? a.stopAutoPlay() : (a._z4 = !0, a._a5()))
            });
            a.ev.on("rsBeforeMove", function (b, f, c) {
                a._x4 && (c && a.st.autoPlay.stopAtAction ? a.stopAutoPlay() : (a._z4 = !0, a._a5()))
            });
            a._b5 = !1;
            a.ev.on("rsVideoStop", function () {
                a._x4 && (a._b5 = !1, a._y4())
            });
            a.ev.on("rsVideoPlay",
                function () {
                    a._x4 && (a._z4 = !1, a._a5(), a._b5 = !0)
                });
            a.st.autoPlay.pauseOnHover && (a._c5 = !1, a.slider.hover(function () {
                a._x4 && (a._z4 = !1, a._a5(), a._c5 = !0)
            }, function () {
                a._x4 && (a._c5 = !1, a._y4())
            }))
        },
        toggleAutoplay: function () {
            this._x4 ? this.startAutoPlay() : this.stopAutoPlay()
        },
        startAutoPlay: function () {
            this._x4 = !0;
            this.currSlide.isLoaded && this._y4()
        },
        stopAutoPlay: function () {
            this._b5 = this._c5 = this._z4 = this._x4 = !1;
            this._a5()
        },
        _y4: function () {
            var a = this;
            !a._c5 && !a._b5 && (a._d5 = !0, a._e5 && clearTimeout(a._e5), a._e5 = setTimeout(function () {
                var b;
                !a._v && !a.st.loopRewind && (b = !0, a.st.loopRewind = !0);
                a.next(!0);
                b && (a.st.loopRewind = !1)
            }, !a.currSlide.customDelay ? a.st.autoPlay.delay : a.currSlide.customDelay))
        },
        _a5: function () {
            !this._c5 && !this._b5 && (this._d5 = !1, this._e5 && (clearTimeout(this._e5), this._e5 = null))
        }
    });
    b.rsModules.autoplay = b.rsProto._u4
})(jQuery);
// jquery.rs.bullets v1.0
(function (c) {
    c.extend(c.rsProto, {
        _f5: function () {
            var a = this;
            "bullets" === a.st.controlNavigation && (a.ev.one("rsAfterPropsSetup", function () {
                a._g5 = !0;
                a.slider.addClass("rsWithBullets");
                for (var b = '<div class="rsNav rsBullets">', e = 0; e < a.numSlides; e++) b += '<div class="rsNavItem rsBullet"><span class=""></span></div>';
                b = c(b + "</div>");
                a._t4 = b;
                a._h5 = b.children();
                a.slider.append(b);
                a._t4.click(function (b) {
                    b = c(b.target).closest(".rsNavItem");
                    b.length && a.goTo(b.index())
                })
            }), a.ev.on("rsOnAppendSlide", function (b,
                                                     c, d) {
                d >= a.numSlides ? a._t4.append('<div class="rsNavItem rsBullet"><span class=""></span></div>') : a._h5.eq(d).before('<div class="rsNavItem rsBullet"><span class=""></span></div>');
                a._h5 = a._t4.children()
            }), a.ev.on("rsOnRemoveSlide", function (b, c) {
                var d = a._h5.eq(c);
                d && (d.remove(), a._h5 = a._t4.children())
            }), a.ev.on("rsOnUpdateNav", function () {
                var b = a.currSlideId;
                a._i5 && a._i5.removeClass("rsNavSelected");
                b = c(a._h5[b]);
                b.addClass("rsNavSelected");
                a._i5 = b
            }))
        }
    });
    c.rsModules.bullets = c.rsProto._f5
})(jQuery);
// jquery.rs.deeplinking v1.0 + jQuery hashchange plugin v1.3 Copyright (c) 2010 Ben Alman
(function (a) {
    a.extend(a.rsProto, {
        _j5: function () {
            var b = this,
                f, e;
            b._k5 = {
                enabled: !1,
                change: !1,
                prefix: ""
            };
            b.st.deeplinking = a.extend({}, b._k5, b.st.deeplinking);
            if (b.st.deeplinking.enabled) {
                var g = b.st.deeplinking.change,
                    h = "#" + b.st.deeplinking.prefix,
                    d = function () {
                        var a = window.location.hash;
                        return a && (a = parseInt(a.substring(h.length), 10), 0 <= a) ? a - 1 : -1
                    }, c = d(); - 1 !== c && (b.st.startSlideId = c);
                if (g) a(window).on("hashchange.rs", function () {
                    if (!f) {
                        var a = d();
                        a < 0 ? a = 0 : a > b.numSlides - 1 && (a = b.numSlides - 1);
                        b.goTo(a)
                    }
                });
                b.ev.on("rsAfterSlideChange",
                    function () {
                        e && clearTimeout(e);
                        f = true;
                        window.location.hash = h + (b.currSlideId + 1);
                        e = setTimeout(function () {
                            f = false;
                            e = 0
                        }, 60)
                    })
            }
        }
    });
    a.rsModules.deeplinking = a.rsProto._j5
})(jQuery);
(function (a, b, f) {
    function e(a) {
        a = a || location.href;
        return "#" + a.replace(/^[^#]*#?(.*)$/, "$1")
    }
    "$:nomunge";
    var g = document,
        h, d = a.event.special,
        c = g.documentMode,
        m = "onhashchange" in b && (c === f || 7 < c);
    a.fn.hashchange = function (a) {
        return a ? this.bind("hashchange", a) : this.trigger("hashchange")
    };
    a.fn.hashchange.delay = 50;
    d.hashchange = a.extend(d.hashchange, {
        setup: function () {
            if (m) return !1;
            a(h.start)
        },
        teardown: function () {
            if (m) return !1;
            a(h.stop)
        }
    });
    var o = function () {
            var d = e(),
                c = p(l);
            d !== l ? (n(l = d, c), a(b).trigger("hashchange")) :
                c !== l && (location.href = location.href.replace(/#.*/, "") + c);
            j = setTimeout(o, a.fn.hashchange.delay)
        }, d = {}, j, l = e(),
        n = c = function (a) {
            return a
        }, p = c;
    d.start = function () {
        j || o()
    };
    d.stop = function () {
        j && clearTimeout(j);
        j = f
    };
    if (a.browser.msie && !m) {
        var i, k;
        d.start = function () {
            i || (k = (k = a.fn.hashchange.src) && k + e(), i = a('<iframe tabindex="-1" title="empty"/>').hide().one("load", function () {
                k || n(e());
                o()
            }).attr("src", k || "javascript:0").insertAfter("body")[0].contentWindow, g.onpropertychange = function () {
                try {
                    "title" === event.propertyName &&
                    (i.document.title = g.title)
                } catch (a) {}
            })
        };
        d.stop = c;
        p = function () {
            return e(i.location.href)
        };
        n = function (b, d) {
            var c = i.document,
                e = a.fn.hashchange.domain;
            b !== d && (c.title = g.title, c.open(), e && c.write('<script>document.domain="' + e + '"<\/script>'), c.close(), i.location.hash = b)
        }
    }
    h = d
})(jQuery, this);
// jquery.rs.fullscreen v1.0
(function (c) {
    c.extend(c.rsProto, {
        _l5: function () {
            var a = this;
            a._m5 = {
                enabled: !1,
                keyboardNav: !0,
                buttonFS: !0,
                nativeFS: !1,
                doubleTap: !0
            };
            a.st.fullscreen = c.extend({}, a._m5, a.st.fullscreen);
            if (a.st.fullscreen.enabled) a.ev.one("rsBeforeSizeSet", function () {
                a._n5()
            })
        },
        _n5: function () {
            var a = this;
            a._o5 = !a.st.keyboardNavEnabled && a.st.fullscreen.keyboardNav;
            if (a.st.fullscreen.nativeFS) {
                a._p5 = {
                    supportsFullScreen: !1,
                    isFullScreen: function () {
                        return !1
                    },
                    requestFullScreen: function () {},
                    cancelFullScreen: function () {},
                    fullScreenEventName: "",
                    prefix: ""
                };
                var b = ["webkit", "moz", "o", "ms", "khtml"];
                if ("undefined" != typeof document.cancelFullScreen) a._p5.supportsFullScreen = !0;
                else
                    for (var d = 0; d < b.length; d++)
                        if (a._p5.prefix = b[d], "undefined" != typeof document[a._p5.prefix + "CancelFullScreen"]) {
                            a._p5.supportsFullScreen = !0;
                            break
                        } a._p5.supportsFullScreen ? (a._p5.fullScreenEventName = a._p5.prefix + "fullscreenchange.rs", a._p5.isFullScreen = function () {
                    switch (this.prefix) {
                        case "":
                            return document.fullScreen;
                        case "webkit":
                            return document.webkitIsFullScreen;
                        default:
                            return document[this.prefix +
                                "FullScreen"]
                    }
                }, a._p5.requestFullScreen = function (a) {
                    return "" === this.prefix ? a.requestFullScreen() : a[this.prefix + "RequestFullScreen"]()
                }, a._p5.cancelFullScreen = function () {
                    return "" === this.prefix ? document.cancelFullScreen() : document[this.prefix + "CancelFullScreen"]()
                }) : a._p5 = !1
            }
            a.st.fullscreen.buttonFS && (a._q5 = c('<div class="rsFullscreenBtn"><div class="rsFullscreenIcn"></div></div>').appendTo(a.st.controlsInside ? a._a1 : a.slider).on("click.rs", function () {
                a.isFullscreen ? a.exitFullscreen() : a.enterFullscreen()
            }))
        },
        enterFullscreen: function (a) {
            var b = this;
            if (b._p5)
                if (a) b._p5.requestFullScreen(c("html")[0]);
                else {
                    b._a.on(b._p5.fullScreenEventName, function () {
                        b._p5.isFullScreen() ? b.enterFullscreen(!0) : b.exitFullscreen(!0)
                    });
                    b._p5.requestFullScreen(c("html")[0]);
                    return
                }
            if (!b._r5) {
                b._r5 = !0;
                b._a.on("keyup.rsfullscreen", function (a) {
                    27 === a.keyCode && b.exitFullscreen()
                });
                b._o5 && b._v1();
                b._s5 = c("html").attr("style");
                b._t5 = c("body").attr("style");
                b._u5 = b.slider.attr("style");
                c("body, html").css({
                    overflow: "hidden",
                    height: "100%",
                    width: "100%",
                    margin: "0",
                    padding: "0"
                });
                b.slider.addClass("rsFullscreen");
                var d;
                for (d = 0; d < b.numSlides; d++)
                    if (a = b.slides[d], a.isRendered = !1, a.bigImage) {
                        a.isMedLoaded = a.isLoaded;
                        a.isMedLoading = a.isLoading;
                        a.medImage = a.image;
                        a.medIW = a.iW;
                        a.medIH = a.iH;
                        a.slideId = -99;
                        a.bigImage !== a.medImage && (a.sizeType = "big");
                        a.isLoaded = a.isBigLoaded;
                        a.isLoading = a.isBigLoading;
                        a.image = a.bigImage;
                        a.iW = a.bigIW;
                        a.iH = a.bigIH;
                        a.contentAdded = !1;
                        var e = !a.isLoaded ? '<a class="rsImg" href="' + a.image + '"></a>' : '<img class="rsImg" src="' +
                            a.image + '"/>';
                        a.content.hasClass("rsImg") ? a.content = c(e) : a.content.find(".rsImg").replaceWith(e)
                    }
                b.isFullscreen = !0;
                setTimeout(function () {
                    b._r5 = !1;
                    b.updateSliderSize()
                }, 100)
            }
        },
        exitFullscreen: function (a) {
            var b = this;
            if (b._p5) {
                if (!a) {
                    b._p5.cancelFullScreen(c("html")[0]);
                    return
                }
                b._a.off(b._p5.fullScreenEventName)
            }
            if (!b._r5) {
                b._r5 = !0;
                b._a.off("keyup.rsfullscreen");
                b._o5 && b._a.off("keydown.rskb");
                c("html").attr("style", b._s5 || "");
                c("body").attr("style", b._t5 || "");
                b.slider.removeClass("rsFullscreen");
                var d;
                for (d = 0; d < b.numSlides; d++)
                    if (a = b.slides[d], a.isRendered = !1, a.bigImage) {
                        a.slideId = -99;
                        a.isBigLoaded = a.isLoaded;
                        a.isBigLoading = a.isLoading;
                        a.bigImage = a.image;
                        a.bigIW = a.iW;
                        a.bigIH = a.iH;
                        a.isLoaded = a.isMedLoaded;
                        a.isLoading = a.isMedLoading;
                        a.image = a.medImage;
                        a.iW = a.medIW;
                        a.iH = a.medIH;
                        a.contentAdded = !1;
                        var e = !a.isLoaded ? '<a class="rsImg" href="' + a.image + '"></a>' : '<img class="rsImg" src="' + a.image + '"/>';
                        a.content.hasClass("rsImg") ? a.content = c(e) : a.content.find(".rsImg").replaceWith(e);
                        a.holder && a.holder.html(a.content);
                        a.bigImage !== a.medImage && (a.sizeType = "med")
                    }
                b.isFullscreen = !1;
                setTimeout(function () {
                    b._r5 = !1;
                    b.updateSliderSize()
                }, 100)
            }
        }
    });
    c.rsModules.fullscreen = c.rsProto._l5
})(jQuery);
// jquery.rs.global-caption v1.0
(function (b) {
    b.extend(b.rsProto, {
        _v5: function () {
            var a = this;
            a.st.globalCaption && (a.ev.on("rsAfterInit", function () {
                a.globalCaption = b('<div class="rsGCaption"></div>').appendTo(a.slider);
                a.globalCaption.html(a.currSlide.caption)
            }), a.ev.on("rsBeforeAnimStart", function () {
                a.globalCaption.html(a.currSlide.caption)
            }))
        }
    });
    b.rsModules.globalCaption = b.rsProto._v5
})(jQuery);
// jquery.rs.nav-auto-hide v1.0
(function (b) {
    b.extend(b.rsProto, {
        _s4: function () {
            var a = this;
            if (a.st.navAutoHide && !a.hasTouch) a.ev.one("rsAfterInit", function () {
                if (a._t4) {
                    a._t4.addClass("rsHidden");
                    var b = a.slider;
                    b.one("mousemove.controlnav", function () {
                        a._t4.removeClass("rsHidden")
                    });
                    b.hover(function () {
                        a._t4.removeClass("rsHidden")
                    }, function () {
                        a._t4.addClass("rsHidden")
                    })
                }
            })
        }
    });
    b.rsModules.autoHideNav = b.rsProto._s4
})(jQuery);
// jquery.rs.tabs v1.0.1
(function (e) {
    e.extend(e.rsProto, {
        _w5: function () {
            var a = this;
            "tabs" === a.st.controlNavigation && (a.ev.on("rsBeforeParseNode", function (a, d, b) {
                d = e(d);
                b.thumbnail = d.find(".rsTmb").remove();
                b.thumbnail.length ? b.thumbnail = e(document.createElement("div")).append(b.thumbnail).html() : (b.thumbnail = d.attr("data-rsTmb"), b.thumbnail || (b.thumbnail = d.find(".rsImg").attr("data-rsTmb")), b.thumbnail = b.thumbnail ? '<img src="' + b.thumbnail + '"/>' : "")
            }), a.ev.one("rsAfterPropsSetup", function () {
                a._x5()
            }), a.ev.on("rsOnAppendSlide",
                function (c, d, b) {
                    b >= a.numSlides ? a._t4.append('<div class="rsNavItem rsTab">' + d.thumbnail + "</div>") : a._h5.eq(b).before('<div class="rsNavItem rsTab">' + item.thumbnail + "</div>");
                    a._h5 = a._t4.children()
                }), a.ev.on("rsOnRemoveSlide", function (c, d) {
                var b = a._h5.eq(d);
                b && (b.remove(), a._h5 = a._t4.children())
            }), a.ev.on("rsOnUpdateNav", function () {
                var c = a.currSlideId;
                a._i5 && a._i5.removeClass("rsNavSelected");
                c = e(a._h5[c]);
                c.addClass("rsNavSelected");
                a._i5 = c
            }))
        },
        _x5: function () {
            var a = this,
                c, d;
            a._g5 = !0;
            c = '<div class="rsNav rsTabs">';
            for (var b = 0; b < a.numSlides; b++) b === a.numSlides - 1 && (style = ""), d = a.slides[b], c += '<div class="rsNavItem rsTab">' + d.thumbnail + "</div>";
            c = e(c + "</div>");
            a._t4 = c;
            a._h5 = c.find(".rsNavItem");
            a.slider.append(c);
            a._t4.click(function (b) {
                b = e(b.target).closest(".rsNavItem");
                b.length && a.goTo(b.index())
            })
        }
    });
    e.rsModules.tabs = e.rsProto._w5
})(jQuery);
// jquery.rs.thumbnails v1.0.2
(function (f) {
    f.extend(f.rsProto, {
        _y5: function () {
            var a = this;
            "thumbnails" === a.st.controlNavigation && (a._z5 = {
                drag: !0,
                touch: !0,
                orientation: "horizontal",
                navigation: !0,
                arrows: !0,
                arrowLeft: null,
                arrowRight: null,
                spacing: 4,
                arrowsAutoHide: !1,
                appendSpan: !1,
                transitionSpeed: 600,
                autoCenter: !0,
                fitInViewport: !0,
                firstMargin: !0
            }, a.st.thumbs = f.extend({}, a._z5, a.st.thumbs), a.ev.on("rsBeforeParseNode", function (a, b, c) {
                b = f(b);
                c.thumbnail = b.find(".rsTmb").remove();
                c.thumbnail.length ? c.thumbnail = f(document.createElement("div")).append(c.thumbnail).html() :
                    (c.thumbnail = b.attr("data-rsTmb"), c.thumbnail || (c.thumbnail = b.find(".rsImg").attr("data-rsTmb")), c.thumbnail = c.thumbnail ? '<img src="' + c.thumbnail + '"/>' : "")
            }), a.ev.one("rsAfterPropsSetup", function () {
                a._a6()
            }), a.ev.on("rsOnUpdateNav", function () {
                var e = a.currSlideId,
                    b;
                a._i5 && a._i5.removeClass("rsNavSelected");
                b = f(a._h5[e]);
                b.addClass("rsNavSelected");
                a._b6 && a._c6(e);
                a._i5 = b
            }), a.ev.on("rsOnAppendSlide", function (e, b, c) {
                e = "<div" + a._d6 + ' class="rsNavItem rsThumb">' + a._e6 + b.thumbnail + "</div>";
                c >= a.numSlides ?
                    a._l3.append(e) : a._h5.eq(c).before(e);
                a._h5 = a._l3.children();
                a.updateThumbsSize()
            }), a.ev.on("rsOnRemoveSlide", function (e, b) {
                var c = a._h5.eq(b);
                c && (c.remove(), a._h5 = a._l3.children(), a.updateThumbsSize())
            }))
        },
        _a6: function () {
            var a = this,
                e = "rsThumbs",
                b = "",
                c, g, d = a.st.thumbs.spacing;
            a._g5 = !0;
            0 < d ? (c = d + "px ", c = ' style="margin: 0 ' + c + c + '0;"') : c = "";
            a._d6 = c;
            a._x2 = "vertical" === a.st.thumbs.orientation ? !1 : !0;
            a._b3 = 0;
            a._f6 = !1;
            a._g6 = !1;
            a._b6 = !1;
            a._h6 = a.st.thumbs.arrows && a.st.thumbs.navigation;
            g = a._x2 ? "Hor" : "Ver";
            a.slider.addClass("rsWithThumbs rsWithThumbs" +
                g);
            b += '<div class="rsNav rsThumbs rsThumbs' + g + '"><div class="' + e + 'Container">';
            a._e6 = a.st.thumbs.appendSpan ? '<span class="thumbIco"></span>' : "";
            for (var h = 0; h < a.numSlides; h++) g = a.slides[h], b += "<div" + c + ' class="rsNavItem rsThumb">' + a._e6 + g.thumbnail + "</div>";
            b = f(b + "</div></div>");
            a._l3 = f(b).find("." + e + "Container");
            if (a._h6 && (e += "Arrow", a.st.thumbs.arrowLeft ? a._i6 = a.st.thumbs.arrowLeft : (a._i6 = f('<div class="' + e + " " + e + 'Left"><div class="' + e + 'Icn"></div></div>'), b.append(a._i6)), a.st.thumbs.arrowRight ?
                a._j6 = a.st.thumbs.arrowRight : (a._j6 = f('<div class="' + e + " " + e + 'Right"><div class="' + e + 'Icn"></div></div>'), b.append(a._j6)), a._i6.click(function () {
                var b = (Math.floor(a._b3 / a._k6) + a._l6) * a._k6;
                a._t3(b > a._g3 ? a._g3 : b)
            }), a._j6.click(function () {
                var b = (Math.floor(a._b3 / a._k6) - a._l6) * a._k6;
                a._t3(b < a._h3 ? a._h3 : b)
            }), a.st.thumbs.arrowsAutoHide && !a.hasTouch)) a._i6.css("opacity", 0), a._j6.css("opacity", 0), b.one("mousemove.rsarrowshover", function () {
                if (a._b6) {
                    a._i6.css("opacity", 1);
                    a._j6.css("opacity", 1)
                }
            }), b.hover(function () {
                if (a._b6) {
                    a._i6.css("opacity",
                        1);
                    a._j6.css("opacity", 1)
                }
            }, function () {
                if (a._b6) {
                    a._i6.css("opacity", 0);
                    a._j6.css("opacity", 0)
                }
            });
            a._t4 = b;
            a._h5 = a._l3.children();
            a.slider.append(b);
            a._p3 = !0;
            a._m6 = d;
            a.st.thumbs.navigation && a._c && a._l3.css(a._e + "transition-property", a._e + "transform");
            a._t4.click(function (b) {
                if (!a._g6) {
                    b = f(b.target).closest(".rsNavItem");
                    b.length && a.goTo(b.index())
                }
            });
            a.ev.off("rsBeforeSizeSet.thumbs").on("rsBeforeSizeSet.thumbs", function () {
                a._n6 = a._x2 ? a._v3 : a._u3;
                a.updateThumbsSize()
            })
        },
        updateThumbsSize: function () {
            var a =
                    this,
                e = a._h5.first(),
                b = {}, c = a._h5.length;
            a._k6 = (a._x2 ? e.outerWidth() : e.outerHeight()) + a._m6;
            a._r3 = c * a._k6 - a._m6;
            b[a._x2 ? "width" : "height"] = a._r3 + a._m6;
            a._s3 = a._x2 ? a._t4.width() : a._t4.height();
            a._h3 = -(a._r3 - a._s3) - (a.st.thumbs.firstMargin ? a._m6 : 0);
            a._g3 = a.st.thumbs.firstMargin ? a._m6 : 0;
            a._l6 = Math.floor(a._s3 / a._k6);
            if (a._r3 < a._s3) a.st.thumbs.autoCenter && a._j3((a._s3 - a._r3) / 2), a.st.thumbs.arrows && a._i6 && (a._i6.addClass("rsThumbsArrowDisabled"), a._j6.addClass("rsThumbsArrowDisabled")), a._b6 = !1, a._g6 = !1,
                a._t4.off(a._f1);
            else if (a.st.thumbs.navigation && !a._b6 && (a._b6 = !0, !a.hasTouch && a.st.thumbs.drag || a.hasTouch && a.st.thumbs.touch)) a._g6 = !0, a._t4.on(a._f1, function (b) {
                a._b2(b, !0)
            });
            a._l3.css(b);
            if (a._p3 && (a.isFullscreen || a.st.thumbs.fitInViewport)) a._x2 ? a._v3 = a._n6 - a._t4.outerHeight() : a._u3 = a._n6 - a._t4.outerWidth()
        },
        setThumbsOrientation: function (a, e) {
            this._p3 && (this.st.thumbs.orientation = a, this._t4.remove(), this.slider.removeClass("rsWithThumbsHor rsWithThumbsVer"), this._a6(), this._t4.off(this._f1),
                e || this.updateSliderSize(!0))
        },
        _j3: function (a) {
            this._b3 = a;
            this._c ? this._l3.css(this._r1, this._s1 + (this._x2 ? a + this._t1 + 0 : 0 + this._t1 + a) + this._u1) : this._l3.css(this._x2 ? this._r1 : this._q1, a)
        },
        _t3: function (a, e, b, c, g) {
            var d = this;
            if (d._b6) {
                e || (e = d.st.thumbs.transitionSpeed);
                d._b3 = a;
                d._o6 && clearTimeout(d._o6);
                d._f6 && (d._c || d._l3.stop(), b = !0);
                var h = {};
                d._f6 = !0;
                d._c ? (h[d._e + "transition-duration"] = e + "ms", h[d._e + "transition-timing-function"] = b ? f.rsCSS3Easing[d.st.easeOut] : f.rsCSS3Easing[d.st.easeInOut], d._l3.css(h),
                    d._j3(a)) : (h[d._x2 ? d._r1 : d._q1] = a + "px", d._l3.animate(h, e, b ? "easeOutCubic" : d.st.easeInOut));
                c && (d._b3 = c);
                d._p6();
                d._o6 = setTimeout(function () {
                    d._f6 = false;
                    if (g) {
                        d._t3(c, g, true);
                        g = null
                    }
                }, e)
            }
        },
        _p6: function () {
            this._h6 && (this._b3 === this._g3 ? this._i6.addClass("rsThumbsArrowDisabled") : this._i6.removeClass("rsThumbsArrowDisabled"), this._b3 === this._h3 ? this._j6.addClass("rsThumbsArrowDisabled") : this._j6.removeClass("rsThumbsArrowDisabled"))
        },
        _c6: function (a, e) {
            var b = 0,
                c, f = a * this._k6 + 2 * this._k6 - this._m6 + this._g3,
                d = Math.floor(this._b3 / this._k6);
            this._b6 && (f + this._b3 > this._s3 ? (a === this.numSlides - 1 && (b = 1), d = -a + this._l6 - 2 + b, c = d * this._k6 + this._s3 % this._k6 + this._m6 - this._g3) : 0 !== a ? (a - 1) * this._k6 <= -this._b3 + this._g3 && a - 1 <= this.numSlides - this._l6 && (c = (-a + 1) * this._k6 + this._g3) : c = this._g3, c !== this._b3 && (b = void 0 === c ? this._b3 : c, b > this._g3 ? this._j3(this._g3) : b < this._h3 ? this._j3(this._h3) : void 0 !== c && (e ? this._j3(c) : this._t3(c))), this._p6())
        }
    });
    f.rsModules.thumbnails = f.rsProto._y5
})(jQuery);
// jquery.rs.video v1.0.3
(function (e) {
    e.extend(e.rsProto, {
        _q6: function () {
            var a = this;
            a._r6 = {
                autoHideArrows: !0,
                autoHideControlNav: !1,
                autoHideBlocks: !1,
                youTubeCode: '<iframe src="http://www.youtube.com/embed/%id%?rel=1&autoplay=1&showinfo=0&autoplay=1" frameborder="no"></iframe>',
                vimeoCode: '<iframe src="http://player.vimeo.com/video/%id%?byline=0&amp;portrait=0&amp;autoplay=1" frameborder="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'
            };
            a.st.video = e.extend({}, a._r6, a.st.video);
            a.ev.on("rsBeforeSizeSet",
                function () {
                    a._d4 && setTimeout(function () {
                        var b = a._d1,
                            b = b.hasClass("rsVideoContainer") ? b : b.find(".rsVideoContainer");
                        a._s6.css({
                            width: b.width(),
                            height: b.height()
                        })
                    }, 32)
                });
            var d = e.browser.mozilla;
            a.ev.on("rsAfterParseNode", function (b, f, c) {
                b = e(f);
                if (c.videoURL) {
                    d && (a._c = a._d = !1);
                    var f = e('<div class="rsVideoContainer"></div>'),
                        g = e('<div class="rsBtnCenterer"><div class="rsPlayBtn"><div class="rsPlayBtnIcon"></div></div></div>');
                    b.hasClass("rsImg") ? c.content = f.append(b).append(g) : c.content.find(".rsImg").wrap(f).after(g)
                }
            })
        },
        toggleVideo: function () {
            return this._d4 ? this.stopVideo() : this.playVideo()
        },
        playVideo: function () {
            var a = this;
            if (!a._d4) {
                var d = a.currSlide;
                if (!d.videoURL) return !1;
                var b = a._t6 = d.content,
                    d = d.videoURL,
                    f, c;
                d.match(/youtu\.be/i) || d.match(/youtube\.com\/watch/i) ? (c = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/, (c = d.match(c)) && 11 == c[7].length && (f = c[7]), void 0 !== f && (a._s6 = a.st.video.youTubeCode.replace("%id%", f))) : d.match(/vimeo\.com/i) && (c = /\/\/(www\.)?vimeo.com\/(\d+)($|\/)/, (c = d.match(c)) && (f = c[2]), void 0 !== f && (a._s6 = a.st.video.vimeoCode.replace("%id%", f)));
                a.videoObj = e(a._s6);
                a.ev.trigger("rsOnCreateVideoElement", [d]);
                a.videoObj.length && (a._s6 = e('<div class="rsVideoFrameHolder"><div class="rsPreloader"></div><div class="rsCloseVideoBtn"><div class="rsCloseVideoIcn"></div></div></div>'), a._s6.find(".rsPreloader").after(a.videoObj), b = b.hasClass("rsVideoContainer") ? b : b.find(".rsVideoContainer"), a._s6.css({
                    width: b.width(),
                    height: b.height()
                }).find(".rsCloseVideoBtn").off("click.rsv").on("click.rsv",
                    function (b) {
                        a.stopVideo();
                        b.preventDefault();
                        b.stopPropagation();
                        return false
                    }), b.append(a._s6), a.isIPAD && b.addClass("rsIOSVideo"), a._w1 && a.st.video.autoHideArrows && (a._w1.addClass("rsHidden"), a._x1.addClass("rsHidden"), a._y1 = !0), a._t4 && a.st.video.autoHideControlNav && a._t4.addClass("rsHidden"), a.st.video.autoHideBlocks && a.currSlide.animBlocks && a.currSlide.animBlocks.addClass("rsHidden"), setTimeout(function () {
                    a._s6.addClass("rsVideoActive")
                }, 10), a.ev.trigger("rsVideoPlay"), a._d4 = !0);
                return !0
            }
            return !1
        },
        stopVideo: function () {
            var a = this;
            return a._d4 ? (a.isIPAD && a.slider.find(".rsCloseVideoBtn").remove(), a._w1 && a.st.video.autoHideArrows && (a._w1.removeClass("rsHidden"), a._x1.removeClass("rsHidden"), a._y1 = !1), a._t4 && a.st.video.autoHideControlNav && a._t4.removeClass("rsHidden"), a.st.video.autoHideBlocks && a.currSlide.animBlocks && a.currSlide.animBlocks.removeClass("rsHidden"), setTimeout(function () {
                a._s6.remove()
            }, 16), a.ev.trigger("rsVideoStop"), a._d4 = !1, !0) : !1
        }
    });
    e.rsModules.video = e.rsProto._q6
})(jQuery);

//loadimg.js
(function (b) {
    var a = "waitForImages";
    b.waitForImages = {
        hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage"]
    };
    b.expr[":"].uncached = function (d) {
        if (!b(d).is('img[src!=""]')) {
            return false;
        }
        var c = document.createElement("img");
        c.src = d.src;
        return !c.complete;
    };
    b.fn.waitForImages = function (e, c, d) {
        if (b.isPlainObject(arguments[0])) {
            c = e.each;
            d = e.waitForAll;
            e = e.finished;
        }
        e = e || b.noop;
        c = c || b.noop;
        d = !! d;
        if (!b.isFunction(e) || !b.isFunction(c)) {
            throw new TypeError("An invalid callback was supplied.");
        }
        return this.each(function () {
            var j = b(this),
                k = [];
            if (d) {
                var f = b.waitForImages.hasImageProperties || [],
                    i = /url\(([""]?)(.*?)\1\)/g;
                j.find("*").each(function () {
                    var l = b(this);
                    if (l.is("img:uncached")) {
                        k.push({
                            src: l.attr("src"),
                            element: l[0]
                        });
                    }
                    b.each(f, function (o, p) {
                        var m = l.css(p);
                        if (!m) {
                            return true;
                        }
                        var n;
                        while (n = i.exec(m)) {
                            k.push({
                                src: n[2],
                                element: l[0]
                            });
                        }
                    });
                });
            } else {
                j.find("img:uncached").each(function () {
                    k.push({
                        src: this.src,
                        element: this
                    });
                });
            }
            var h = k.length,
                g = 0;
            if (h == 0) {
                e.call(j[0]);
            }
            b.each(k, function (m, l) {
                var n = new Image;
                b(n).bind("load." + a + " error." + a, function (o) {
                    g++;
                    c.call(l.element, g, h, o.type == "load");
                    if (g == h) {
                        e.call(j[0]);
                        return false;
                    }
                });
                n.src = l.src;
            });
        });
    };
})(jQuery);

// xml2json

function X2JS() {
    var j = "1.0.6";
    var f = {
        ELEMENT_NODE: 1,
        TEXT_NODE: 3,
        CDATA_SECTION_NODE: 4,
        DOCUMENT_NODE: 9
    };

    function b(k) {
        var l = k.localName;
        if (l == null) {
            l = k.baseName;
        }
        if (l == null || l == "") {
            l = k.nodeName;
        }
        return l;
    }

    function a(k) {
        return k.prefix;
    }

    function g(m) {
        if (m.nodeType == f.DOCUMENT_NODE) {
            var t = new Object;
            var l = m.firstChild;
            var s = b(l);
            t[s] = g(l);
            return t;
        } else {
            if (m.nodeType == f.ELEMENT_NODE) {
                var t = new Object;
                t.__cnt = 0;
                var k = m.childNodes;
                for (var u = 0; u < k.length; u++) {
                    var l = k.item(u);
                    var s = b(l);
                    t.__cnt++;
                    if (t[s] == null) {
                        t[s] = g(l);
                        t[s + "_asArray"] = new Array(1);
                        t[s + "_asArray"][0] = t[s];
                    } else {
                        if (t[s] != null) {
                            if (!(t[s] instanceof Array)) {
                                var n = t[s];
                                t[s] = new Array();
                                t[s][0] = n;
                                t[s + "_asArray"] = t[s];
                            }
                        }
                        var q = 0;
                        while (t[s][q] != null) {
                            q++;
                        }(t[s])[q] = g(l);
                    }
                }
                for (var o = 0; o < m.attributes.length; o++) {
                    var p = m.attributes.item(o);
                    t.__cnt++;
                    t["_" + p.name] = p.value;
                }
                var r = a(m);
                if (r != null && r != "") {
                    t.__cnt++;
                    t.__prefix = r;
                }
                if (t.__cnt == 1 && t["#text"] != null) {
                    t = t["#text"];
                }
                if (t["#text"] != null) {
                    t.__text = t["#text"];
                    delete t["#text"];
                    delete t["#text_asArray"];
                }
                if (t["#cdata-section"] != null) {
                    t.__cdata = t["#cdata-section"];
                    delete t["#cdata-section"];
                    delete t["#cdata-section_asArray"];
                }
                if (t.__text != null || t.__cdata != null) {
                    t.toString = function () {
                        return (this.__text != null ? this.__text : "") + (this.__cdata != null ? this.__cdata : "");
                    };
                }
                return t;
            } else {
                if (m.nodeType == f.TEXT_NODE || m.nodeType == f.CDATA_SECTION_NODE) {
                    return m.nodeValue;
                }
            }
        }
    }

    function i(r, o, q, l) {
        var n = "<" + (r.__prefix != null ? (r.__prefix + ":") : "") + o;
        if (q != null) {
            for (var p = 0; p < q.length; p++) {
                var m = q[p];
                var k = r[m];
                n += " " + m.substr(1) + "='" + k + "'";
            }
        }
        if (!l) {
            n += ">";
        } else {
            n += "/>";
        }
        return n;
    }

    function c(l, k) {
        return "</" + (l.__prefix != null ? (l.__prefix + ":") : "") + k + ">";
    }

    function d(l, k) {
        return l.indexOf(k, l.length - k.length) !== -1;
    }

    function e(l) {
        var k = "";
        if (l.__text != null) {
            k += l.__text;
        } else {
            k += l;
        }
        return k;
    }

    function h(q) {
        var s = "";
        var p = 0;
        for (var m in q) {
            if (d(m.toString(), ("_asArray")) || m.toString().indexOf("_") == 0 || (q[m] instanceof Function)) {
                continue;
            }
            p++;
        }
        for (var m in q) {
            if (d(m.toString(), ("_asArray")) || m.toString().indexOf("_") == 0 || (q[m] instanceof Function)) {
                continue;
            }
            var r = q[m];
            var l = [];
            for (var n in r) {
                if (n.toString().indexOf("__") == -1 && n.toString().indexOf("_") == 0) {
                    l.push(n);
                }
            }
            if (r != null && r instanceof Object && p > 0) {
                if (r instanceof Array) {
                    var k = true;
                    if (r.length > 0) {
                        k = r[0] instanceof Object;
                    } else {
                        s += i(r, m, l, true);
                    }
                    for (var o = 0; o < r.length; o++) {
                        if (k) {
                            s += h(r[o]);
                        } else {
                            s += i(r, m, l, false);
                            s += e(r[o]);
                            s += c(r, m);
                        }
                    }
                } else {
                    s += i(r, m, l, false);
                    s += h(r);
                    if (r.__cdata != null) {
                        s += "<![CDATA[" + r.__cdata + "]]>";
                    }
                    if (r.__text != null) {
                        s += r.__text;
                    }
                    s += c(r, m);
                }
            } else {
                s += i(r, m, l, false);
                if (r.__cdata != null) {
                    s += "<![CDATA[" + r.__cdata + "]]>";
                }
                if (r.__text != null || !(r instanceof Object)) {
                    s += e(r);
                }
                s += c(r, m);
            }
        }
        return s;
    }
    this.parseXmlString = function (k) {
        var l;
        if (window.DOMParser) {
            var m = new DOMParser();
            l = m.parseFromString(k, "text/xml");
        } else {
            if (k.indexOf("<?") == 0) {
                k = k.substr(k.indexOf("?>") + 2);
            }
            l = new ActiveXObject("Microsoft.XMLDOM");
            l.async = "false";
            l.loadXML(k);
        }
        return l;
    };
    this.xml2json = function (k) {
        return g(k);
    };
    this.xml_str2json = function (k) {
        var l = this.parseXmlString(k);
        return this.xml2json(l);
    };
    this.json2xml_str = function (k) {
        return h(k);
    };
    this.json2xml = function (l) {
        var k = this.json2xml_str(l);
        return this.parseXmlString(k);
    };
}
var x2js = new X2JS();

//
// LESS - Leaner CSS v1.3.0
// http://lesscss.org
//
// Copyright (c) 2009-2011, Alexis Sellier
// Licensed under the Apache 2.0 License.
//
(function (a, b) {
    function c(b) {
        return a.less[b.split("/")[1]]
    }

    function l() {
        var a = document.getElementsByTagName("style");
        for (var b = 0; b < a.length; b++) a[b].type.match(j) && (new d.Parser).parse(a[b].innerHTML || "", function (c, d) {
            var e = d.toCSS(),
                f = a[b];
            f.type = "text/css", f.styleSheet ? f.styleSheet.cssText = e : f.innerHTML = e
        })
    }

    function m(a, b) {
        for (var c = 0; c < d.sheets.length; c++) n(d.sheets[c], a, b, d.sheets.length - (c + 1))
    }

    function n(b, c, e, f) {
        var h = a.location.href.replace(/[#?].*$/, ""),
            i = b.href.replace(/\?.*$/, ""),
            j = g && g.getItem(i),
            k = g && g.getItem(i + ":timestamp"),
            l = {
                css: j,
                timestamp: k
            };
        /^(https?|file):/.test(i) || (i.charAt(0) == "/" ? i = a.location.protocol + "//" + a.location.host + i : i = h.slice(0, h.lastIndexOf("/") + 1) + i);
        var m = i.match(/([^\/]+)$/)[1];
        q(b.href, b.type, function (a, g) {
            if (!e && l && g && (new Date(g)).valueOf() === (new Date(l.timestamp)).valueOf()) p(l.css, b), c(null, null, a, b, {
                local: !0,
                remaining: f
            });
            else try {
                (new d.Parser({
                    optimization: d.optimization,
                    paths: [i.replace(/[\w\.-]+$/, "")],
                    mime: b.type,
                    filename: m
                })).parse(a, function (d, e) {
                        if (d) return u(d, i);
                        try {
                            c(d, e, a, b, {
                                local: !1,
                                lastModified: g,
                                remaining: f
                            }), s(document.getElementById("less-error-message:" + o(i)))
                        } catch (d) {
                            u(d, i)
                        }
                    })
            } catch (h) {
                u(h, i)
            }
        }, function (a, b) {
            throw new Error("Couldn't load " + b + " (" + a + ")")
        })
    }

    function o(a) {
        return a.replace(/^[a-z]+:\/\/?[^\/]+/, "").replace(/^\//, "").replace(/\?.*$/, "").replace(/\.[^\.\/]+$/, "").replace(/[^\.\w-]+/g, "-").replace(/\./g, ":")
    }

    function p(a, b, c) {
        var d, e = b.href ? b.href.replace(/\?.*$/, "") : "",
            f = "less:" + (b.title || o(e));
        (d = document.getElementById(f)) === null && (d = document.createElement("style"), d.type = "text/css", d.media = b.media || "screen", d.id = f, document.getElementsByTagName("head")[0].appendChild(d));
        if (d.styleSheet) try {
            d.styleSheet.cssText = a
        } catch (h) {
            throw new Error("Couldn't reassign styleSheet.cssText.")
        } else(function (a) {
            d.childNodes.length > 0 ? d.firstChild.nodeValue !== a.nodeValue && d.replaceChild(a, d.firstChild) : d.appendChild(a)
        })(document.createTextNode(a));
        c && g && (t("saving " + e + " to cache."), g.setItem(e, a), g.setItem(e + ":timestamp", c))
    }

    function q(a, b, c, e) {
        function i(b, c, d) {
            b.status >= 200 && b.status < 300 ? c(b.responseText, b.getResponseHeader("Last-Modified")) : typeof d == "function" && d(b.status, a)
        }
        var g = r(),
            h = f ? !1 : d.async;
        typeof g.overrideMimeType == "function" && g.overrideMimeType("text/css"), g.open("GET", a, h), g.setRequestHeader("Accept", b || "text/x-less, text/css; q=0.9, */*; q=0.5"), g.send(null), f ? g.status === 0 || g.status >= 200 && g.status < 300 ? c(g.responseText) : e(g.status, a) : h ? g.onreadystatechange = function () {
            g.readyState == 4 && i(g, c, e)
        } : i(g, c, e)
    }

    function r() {
        if (a.XMLHttpRequest) return new XMLHttpRequest;
        try {
            return new ActiveXObject("MSXML2.XMLHTTP.3.0")
        } catch (b) {
            return t("browser doesn't support AJAX."), null
        }
    }

    function s(a) {
        return a && a.parentNode.removeChild(a)
    }

    function t(a) {
        d.env == "development" && typeof console != "undefined" && console.log("less: " + a)
    }

    function u(a, b) {
        var c = "less-error-message:" + o(b),
            e = '<li><label>{line}</label><pre class="{class}">{content}</pre></li>',
            f = document.createElement("div"),
            g, h, i = [],
            j = a.filename || b;
        f.id = c, f.className = "less-error-message", h = "<h3>" + (a.message || "There is an error in your .less file") + "</h3>" + '<p>in <a href="' + j + '">' + j + "</a> ";
        var k = function (a, b, c) {
            a.extract[b] && i.push(e.replace(/\{line\}/, parseInt(a.line) + (b - 1)).replace(/\{class\}/, c).replace(/\{content\}/, a.extract[b]))
        };
        a.stack ? h += "<br/>" + a.stack.split("\n").slice(1).join("<br/>") : a.extract && (k(a, 0, ""), k(a, 1, "line"), k(a, 2, ""), h += "on line " + a.line + ", column " + (a.column + 1) + ":</p>" + "<ul>" + i.join("") + "</ul>"), f.innerHTML = h, p([".less-error-message ul, .less-error-message li {", "list-style-type: none;", "margin-right: 15px;", "padding: 4px 0;", "margin: 0;", "}", ".less-error-message label {", "font-size: 12px;", "margin-right: 15px;", "padding: 4px 0;", "color: #cc7777;", "}", ".less-error-message pre {", "color: #dd6666;", "padding: 4px 0;", "margin: 0;", "display: inline-block;", "}", ".less-error-message pre.line {", "color: #ff0000;", "}", ".less-error-message h3 {", "font-size: 20px;", "font-weight: bold;", "padding: 15px 0 5px 0;", "margin: 0;", "}", ".less-error-message a {", "color: #10a", "}", ".less-error-message .error {", "color: red;", "font-weight: bold;", "padding-bottom: 2px;", "border-bottom: 1px dashed red;", "}"].join("\n"), {
            title: "error-message"
        }), f.style.cssText = ["font-family: Arial, sans-serif", "border: 1px solid #e00", "background-color: #eee", "border-radius: 5px", "-webkit-border-radius: 5px", "-moz-border-radius: 5px", "color: #e00", "padding: 15px", "margin-bottom: 15px"].join(";"), d.env == "development" && (g = setInterval(function () {
            document.body && (document.getElementById(c) ? document.body.replaceChild(f, document.getElementById(c)) : document.body.insertBefore(f, document.body.firstChild), clearInterval(g))
        }, 10))
    }
    typeof define == "function" && define.amd && define("less", [], function () {
        return d
    }), Array.isArray || (Array.isArray = function (a) {
        return Object.prototype.toString.call(a) === "[object Array]" || a instanceof Array
    }), Array.prototype.forEach || (Array.prototype.forEach = function (a, b) {
        var c = this.length >>> 0;
        for (var d = 0; d < c; d++) d in this && a.call(b, this[d], d, this)
    }), Array.prototype.map || (Array.prototype.map = function (a) {
        var b = this.length >>> 0,
            c = new Array(b),
            d = arguments[1];
        for (var e = 0; e < b; e++) e in this && (c[e] = a.call(d, this[e], e, this));
        return c
    }), Array.prototype.filter || (Array.prototype.filter = function (a) {
        var b = [],
            c = arguments[1];
        for (var d = 0; d < this.length; d++) a.call(c, this[d]) && b.push(this[d]);
        return b
    }), Array.prototype.reduce || (Array.prototype.reduce = function (a) {
        var b = this.length >>> 0,
            c = 0;
        if (b === 0 && arguments.length === 1) throw new TypeError;
        if (arguments.length >= 2) var d = arguments[1];
        else
            do {
                if (c in this) {
                    d = this[c++];
                    break
                }
                if (++c >= b) throw new TypeError
            } while (!0);
        for (; c < b; c++) c in this && (d = a.call(null, d, this[c], c, this));
        return d
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function (a) {
        var b = this.length,
            c = arguments[1] || 0;
        if (!b) return -1;
        if (c >= b) return -1;
        c < 0 && (c += b);
        for (; c < b; c++) {
            if (!Object.prototype.hasOwnProperty.call(this, c)) continue;
            if (a === this[c]) return c
        }
        return -1
    }), Object.keys || (Object.keys = function (a) {
        var b = [];
        for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b.push(c);
        return b
    }), String.prototype.trim || (String.prototype.trim = function () {
        return String(this).replace(/^\s\s*/, "").replace(/\s\s*$/, "")
    });
    var d, e;
    typeof environment == "object" && {}.toString.call(environment) === "[object Environment]" ? (typeof a == "undefined" ? d = {} : d = a.less = {}, e = d.tree = {}, d.mode = "rhino") : typeof a == "undefined" ? (d = exports, e = c("./tree"), d.mode = "node") : (typeof a.less == "undefined" && (a.less = {}), d = a.less, e = a.less.tree = {}, d.mode = "browser"), d.Parser = function v(a) {
        function q() {
            h = k[g], i = f, l = f
        }

        function r() {
            k[g] = h, f = i, l = f
        }

        function s() {
            f > l && (k[g] = k[g].slice(f - l), l = f)
        }

        function t(a) {
            var c, d, e, h, i, j, n, o;
            if (a instanceof Function) return a.call(m.parsers);
            if (typeof a == "string") c = b.charAt(f) === a ? a : null, e = 1, s();
            else {
                s();
                if (c = a.exec(k[g])) e = c[0].length;
                else return null
            } if (c) {
                o = f += e, j = f + k[g].length - e;
                while (f < j) {
                    h = b.charCodeAt(f);
                    if (h !== 32 && h !== 10 && h !== 9) break;
                    f++
                }
                return k[g] = k[g].slice(e + (f - o)), l = f, k[g].length === 0 && g < k.length - 1 && g++, typeof c == "string" ? c : c.length === 1 ? c[0] : c
            }
        }

        function u(a, c) {
            var d = t(a);
            if (!d) v(c || (typeof a == "string" ? "expected '" + a + "' got '" + b.charAt(f) + "'" : "unexpected token"));
            else return d
        }

        function v(a, b) {
            throw {
                index: f,
                type: b || "Syntax",
                message: a
            }
        }

        function w(a) {
            return typeof a == "string" ? b.charAt(f) === a : a.test(k[g]) ? !0 : !1
        }

        function x(a) {
            return d.mode === "node" ? c("path").basename(a) : a.match(/[^\/]+$/)[0]
        }

        function y(a, c) {
            return a.filename && c.filename && a.filename !== c.filename ? m.imports.contents[x(a.filename)] : b
        }

        function z(a, b) {
            for (var c = a, d = -1; c >= 0 && b.charAt(c) !== "\n"; c--) d++;
            return {
                line: typeof a == "number" ? (b.slice(0, a).match(/\n/g) || "").length : null,
                column: d
            }
        }

        function A(a, b) {
            var c = y(a, b),
                d = z(a.index, c),
                e = d.line,
                f = d.column,
                g = c.split("\n");
            this.type = a.type || "Syntax", this.message = a.message, this.filename = a.filename || b.filename, this.index = a.index, this.line = typeof e == "number" ? e + 1 : null, this.callLine = a.call && z(a.call, c).line + 1, this.callExtract = g[z(a.call, c).line], this.stack = a.stack, this.column = f, this.extract = [g[e - 1], g[e], g[e + 1]]
        }
        var b, f, g, h, i, j, k, l, m, n = this,
            o = function () {}, p = this.imports = {
                paths: a && a.paths || [],
                queue: [],
                files: {},
                contents: {},
                mime: a && a.mime,
                error: null,
                push: function (b, c) {
                    var e = this;
                    this.queue.push(b), d.Parser.importer(b, this.paths, function (a, d, f) {
                        e.queue.splice(e.queue.indexOf(b), 1), e.files[b] = d, e.contents[b] = f, a && !e.error && (e.error = a), c(a, d), e.queue.length === 0 && o()
                    }, a)
                }
            };
        return this.env = a = a || {}, this.optimization = "optimization" in this.env ? this.env.optimization : 1, this.env.filename = this.env.filename || null, m = {
            imports: p,
            parse: function (h, i) {
                var n, p, q, r, s, u, v = [],
                    w, x = null;
                f = g = l = j = 0, b = h.replace(/\r\n/g, "\n"), k = function (c) {
                    var d = 0,
                        e = /[^"'`\{\}\/\(\)\\]+/g,
                        f = /\/\*(?:[^*]|\*+[^\/*])*\*+\/|\/\/.*/g,
                        g = /"((?:[^"\\\r\n]|\\.)*)"|'((?:[^'\\\r\n]|\\.)*)'|`((?:[^`\\\r\n]|\\.)*)`/g,
                        h = 0,
                        i, j = c[0],
                        k;
                    for (var l = 0, m, n; l < b.length; l++) {
                        e.lastIndex = l, (i = e.exec(b)) && i.index === l && (l += i[0].length, j.push(i[0])), m = b.charAt(l), f.lastIndex = g.lastIndex = l, (i = g.exec(b)) && i.index === l && (l += i[0].length, j.push(i[0]), m = b.charAt(l)), !k && m === "/" && (n = b.charAt(l + 1), (n === "/" || n === "*") && (i = f.exec(b)) && i.index === l && (l += i[0].length, j.push(i[0]), m = b.charAt(l)));
                        switch (m) {
                            case "{":
                                if (!k) {
                                    h++, j.push(m);
                                    break
                                };
                            case "}":
                                if (!k) {
                                    h--, j.push(m), c[++d] = j = [];
                                    break
                                };
                            case "(":
                                if (!k) {
                                    k = !0, j.push(m);
                                    break
                                };
                            case ")":
                                if (k) {
                                    k = !1, j.push(m);
                                    break
                                };
                            default:
                                j.push(m)
                        }
                    }
                    return h > 0 && (x = new A({
                        index: l,
                        type: "Parse",
                        message: "missing closing `}`",
                        filename: a.filename
                    }, a)), c.map(function (a) {
                        return a.join("")
                    })
                }([
                        []
                    ]);
                if (x) return i(x);
                try {
                    n = new e.Ruleset([], t(this.parsers.primary)), n.root = !0
                } catch (y) {
                    return i(new A(y, a))
                }
                n.toCSS = function (b) {
                    var f, g, h;
                    return function (f, g) {
                        var h = [],
                            i;
                        f = f || {}, typeof g == "object" && !Array.isArray(g) && (g = Object.keys(g).map(function (a) {
                            var b = g[a];
                            return b instanceof e.Value || (b instanceof e.Expression || (b = new e.Expression([b])), b = new e.Value([b])), new e.Rule("@" + a, b, !1, 0)
                        }), h = [new e.Ruleset(null, g)]);
                        try {
                            var j = b.call(this, {
                                frames: h
                            }).toCSS([], {
                                    compress: f.compress || !1
                                })
                        } catch (k) {
                            throw new A(k, a)
                        }
                        if (i = m.imports.error) throw i instanceof A ? i : new A(i, a);
                        return f.yuicompress && d.mode === "node" ? c("./cssmin").compressor.cssmin(j) : f.compress ? j.replace(/(\s)+/g, "$1") : j
                    }
                }(n.eval);
                if (f < b.length - 1) {
                    f = j, u = b.split("\n"), s = (b.slice(0, f).match(/\n/g) || "").length + 1;
                    for (var z = f, B = -1; z >= 0 && b.charAt(z) !== "\n"; z--) B++;
                    x = {
                        type: "Parse",
                        message: "Syntax Error on line " + s,
                        index: f,
                        filename: a.filename,
                        line: s,
                        column: B,
                        extract: [u[s - 2], u[s - 1], u[s]]
                    }
                }
                this.imports.queue.length > 0 ? o = function () {
                    i(x, n)
                } : i(x, n)
            },
            parsers: {
                primary: function () {
                    var a, b = [];
                    while ((a = t(this.mixin.definition) || t(this.rule) || t(this.ruleset) || t(this.mixin.call) || t(this.comment) || t(this.directive)) || t(/^[\s\n]+/)) a && b.push(a);
                    return b
                },
                comment: function () {
                    var a;
                    if (b.charAt(f) !== "/") return;
                    if (b.charAt(f + 1) === "/") return new e.Comment(t(/^\/\/.*/), !0);
                    if (a = t(/^\/\*(?:[^*]|\*+[^\/*])*\*+\/\n?/)) return new e.Comment(a)
                },
                entities: {
                    quoted: function () {
                        var a, c = f,
                            d;
                        b.charAt(c) === "~" && (c++, d = !0);
                        if (b.charAt(c) !== '"' && b.charAt(c) !== "'") return;
                        d && t("~");
                        if (a = t(/^"((?:[^"\\\r\n]|\\.)*)"|'((?:[^'\\\r\n]|\\.)*)'/)) return new e.Quoted(a[0], a[1] || a[2], d)
                    },
                    keyword: function () {
                        var a;
                        if (a = t(/^[_A-Za-z-][_A-Za-z0-9-]*/)) return e.colors.hasOwnProperty(a) ? new e.Color(e.colors[a].slice(1)) : new e.Keyword(a)
                    },
                    call: function () {
                        var b, c, d = f;
                        if (!(b = /^([\w-]+|%|progid:[\w\.]+)\(/.exec(k[g]))) return;
                        b = b[1].toLowerCase();
                        if (b === "url") return null;
                        f += b.length;
                        if (b === "alpha") return t(this.alpha);
                        t("("), c = t(this.entities.arguments);
                        if (!t(")")) return;
                        if (b) return new e.Call(b, c, d, a.filename)
                    },
                    arguments: function () {
                        var a = [],
                            b;
                        while (b = t(this.entities.assignment) || t(this.expression)) {
                            a.push(b);
                            if (!t(",")) break
                        }
                        return a
                    },
                    literal: function () {
                        return t(this.entities.dimension) || t(this.entities.color) || t(this.entities.quoted)
                    },
                    assignment: function () {
                        var a, b;
                        if ((a = t(/^\w+(?=\s?=)/i)) && t("=") && (b = t(this.entity))) return new e.Assignment(a, b)
                    },
                    url: function () {
                        var a;
                        if (b.charAt(f) !== "u" || !t(/^url\(/)) return;
                        return a = t(this.entities.quoted) || t(this.entities.variable) || t(this.entities.dataURI) || t(/^[-\w%@$\/.&=:;#+?~]+/) || "", u(")"), new e.URL(a.value || a.data || a instanceof e.Variable ? a : new e.Anonymous(a), p.paths)
                    },
                    dataURI: function () {
                        var a;
                        if (t(/^data:/)) {
                            a = {}, a.mime = t(/^[^\/]+\/[^,;)]+/) || "", a.charset = t(/^;\s*charset=[^,;)]+/) || "", a.base64 = t(/^;\s*base64/) || "", a.data = t(/^,\s*[^)]+/);
                            if (a.data) return a
                        }
                    },
                    variable: function () {
                        var c, d = f;
                        if (b.charAt(f) === "@" && (c = t(/^@@?[\w-]+/))) return new e.Variable(c, d, a.filename)
                    },
                    color: function () {
                        var a;
                        if (b.charAt(f) === "#" && (a = t(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/))) return new e.Color(a[1])
                    },
                    dimension: function () {
                        var a, c = b.charCodeAt(f);
                        if (c > 57 || c < 45 || c === 47) return;
                        if (a = t(/^(-?\d*\.?\d+)(px|%|em|rem|pc|ex|in|deg|s|ms|pt|cm|mm|rad|grad|turn)?/)) return new e.Dimension(a[1], a[2])
                    },
                    javascript: function () {
                        var a, c = f,
                            d;
                        b.charAt(c) === "~" && (c++, d = !0);
                        if (b.charAt(c) !== "`") return;
                        d && t("~");
                        if (a = t(/^`([^`]*)`/)) return new e.JavaScript(a[1], f, d)
                    }
                },
                variable: function () {
                    var a;
                    if (b.charAt(f) === "@" && (a = t(/^(@[\w-]+)\s*:/))) return a[1]
                },
                shorthand: function () {
                    var a, b;
                    if (!w(/^[@\w.%-]+\/[@\w.-]+/)) return;
                    if ((a = t(this.entity)) && t("/") && (b = t(this.entity))) return new e.Shorthand(a, b)
                },
                mixin: {
                    call: function () {
                        var c = [],
                            d, g, h, i = f,
                            j = b.charAt(f),
                            k = !1;
                        if (j !== "." && j !== "#") return;
                        while (d = t(/^[#.](?:[\w-]|\\(?:[a-fA-F0-9]{1,6} ?|[^a-fA-F0-9]))+/)) c.push(new e.Element(g, d, f)), g = t(">");
                        t("(") && (h = t(this.entities.arguments)) && t(")"), t(this.important) && (k = !0);
                        if (c.length > 0 && (t(";") || w("}"))) return new e.mixin.Call(c, h || [], i, a.filename, k)
                    },
                    definition: function () {
                        var a, c = [],
                            d, g, h, i, j, k = !1;
                        if (b.charAt(f) !== "." && b.charAt(f) !== "#" || w(/^[^{]*(;|})/)) return;
                        q();
                        if (d = t(/^([#.](?:[\w-]|\\(?:[a-fA-F0-9]{1,6} ?|[^a-fA-F0-9]))+)\s*\(/)) {
                            a = d[1];
                            do {
                                if (b.charAt(f) === "." && t(/^\.{3}/)) {
                                    k = !0;
                                    break
                                }
                                if (!(h = t(this.entities.variable) || t(this.entities.literal) || t(this.entities.keyword))) break;
                                if (h instanceof e.Variable)
                                    if (t(":")) i = u(this.expression, "expected expression"), c.push({
                                        name: h.name,
                                        value: i
                                    });
                                    else {
                                        if (t(/^\.{3}/)) {
                                            c.push({
                                                name: h.name,
                                                variadic: !0
                                            }), k = !0;
                                            break
                                        }
                                        c.push({
                                            name: h.name
                                        })
                                    } else c.push({
                                    value: h
                                })
                            } while (t(","));
                            u(")"), t(/^when/) && (j = u(this.conditions, "expected condition")), g = t(this.block);
                            if (g) return new e.mixin.Definition(a, c, g, j, k);
                            r()
                        }
                    }
                },
                entity: function () {
                    return t(this.entities.literal) || t(this.entities.variable) || t(this.entities.url) || t(this.entities.call) || t(this.entities.keyword) || t(this.entities.javascript) || t(this.comment)
                },
                end: function () {
                    return t(";") || w("}")
                },
                alpha: function () {
                    var a;
                    if (!t(/^\(opacity=/i)) return;
                    if (a = t(/^\d+/) || t(this.entities.variable)) return u(")"), new e.Alpha(a)
                },
                element: function () {
                    var a, b, c, d;
                    c = t(this.combinator), a = t(/^(?:\d+\.\d+|\d+)%/) || t(/^(?:[.#]?|:*)(?:[\w-]|\\(?:[a-fA-F0-9]{1,6} ?|[^a-fA-F0-9]))+/) || t("*") || t(this.attribute) || t(/^\([^)@]+\)/), a || t("(") && (d = t(this.entities.variable)) && t(")") && (a = new e.Paren(d));
                    if (a) return new e.Element(c, a, f);
                    if (c.value && c.value.charAt(0) === "&") return new e.Element(c, null, f)
                },
                combinator: function () {
                    var a, c = b.charAt(f);
                    if (c === ">" || c === "+" || c === "~") {
                        f++;
                        while (b.charAt(f) === " ") f++;
                        return new e.Combinator(c)
                    }
                    if (c === "&") {
                        a = "&", f++, b.charAt(f) === " " && (a = "& ");
                        while (b.charAt(f) === " ") f++;
                        return new e.Combinator(a)
                    }
                    return b.charAt(f - 1) === " " ? new e.Combinator(" ") : new e.Combinator(null)
                },
                selector: function () {
                    var a, c, d = [],
                        g, h;
                    if (t("(")) return a = t(this.entity), u(")"), new e.Selector([new e.Element("", a, f)]);
                    while (c = t(this.element)) {
                        g = b.charAt(f), d.push(c);
                        if (g === "{" || g === "}" || g === ";" || g === ",") break
                    }
                    if (d.length > 0) return new e.Selector(d)
                },
                tag: function () {
                    return t(/^[a-zA-Z][a-zA-Z-]*[0-9]?/) || t("*")
                },
                attribute: function () {
                    var a = "",
                        b, c, d;
                    if (!t("[")) return;
                    if (b = t(/^[a-zA-Z-]+/) || t(this.entities.quoted))(d = t(/^[|~*$^]?=/)) && (c = t(this.entities.quoted) || t(/^[\w-]+/)) ? a = [b, d, c.toCSS ? c.toCSS() : c].join("") : a = b;
                    if (!t("]")) return;
                    if (a) return "[" + a + "]"
                },
                block: function () {
                    var a;
                    if (t("{") && (a = t(this.primary)) && t("}")) return a
                },
                ruleset: function () {
                    var b = [],
                        c, d, g;
                    q();
                    while (c = t(this.selector)) {
                        b.push(c), t(this.comment);
                        if (!t(",")) break;
                        t(this.comment)
                    }
                    if (b.length > 0 && (d = t(this.block))) return new e.Ruleset(b, d, a.strictImports);
                    j = f, r()
                },
                rule: function () {
                    var a, c, d = b.charAt(f),
                        h, l;
                    q();
                    if (d === "." || d === "#" || d === "&") return;
                    if (a = t(this.variable) || t(this.property)) {
                        a.charAt(0) != "@" && (l = /^([^@+\/'"*`(;{}-]*);/.exec(k[g])) ? (f += l[0].length - 1, c = new e.Anonymous(l[1])) : a === "font" ? c = t(this.font) : c = t(this.value), h = t(this.important);
                        if (c && t(this.end)) return new e.Rule(a, c, h, i);
                        j = f, r()
                    }
                },
                "import": function () {
                    var a, b, c = f;
                    if (t(/^@import\s+/) && (a = t(this.entities.quoted) || t(this.entities.url))) {
                        b = t(this.mediaFeatures);
                        if (t(";")) return new e.Import(a, p, b, c)
                    }
                },
                mediaFeature: function () {
                    var a, b, c = [];
                    do
                        if (a = t(this.entities.keyword)) c.push(a);
                        else if (t("(")) {
                            b = t(this.property), a = t(this.entity);
                            if (!t(")")) return null;
                            if (b && a) c.push(new e.Paren(new e.Rule(b, a, null, f, !0)));
                            else if (a) c.push(new e.Paren(a));
                            else return null
                        } while (a);
                    if (c.length > 0) return new e.Expression(c)
                },
                mediaFeatures: function () {
                    var a, b = [];
                    do
                        if (a = t(this.mediaFeature)) {
                            b.push(a);
                            if (!t(",")) break
                        } else if (a = t(this.entities.variable)) {
                            b.push(a);
                            if (!t(",")) break
                        } while (a);
                    return b.length > 0 ? b : null
                },
                media: function () {
                    var a, b;
                    if (t(/^@media/)) {
                        a = t(this.mediaFeatures);
                        if (b = t(this.block)) return new e.Media(b, a)
                    }
                },
                directive: function () {
                    var a, c, d, g, h, i;
                    if (b.charAt(f) !== "@") return;
                    if (c = t(this["import"]) || t(this.media)) return c;
                    if (a = t(/^@page|@keyframes/) || t(/^@(?:-webkit-|-moz-|-o-|-ms-)[a-z0-9-]+/)) {
                        g = (t(/^[^{]+/) || "").trim();
                        if (d = t(this.block)) return new e.Directive(a + " " + g, d)
                    } else if (a = t(/^@[-a-z]+/))
                        if (a === "@font-face") {
                            if (d = t(this.block)) return new e.Directive(a, d)
                        } else if ((c = t(this.entity)) && t(";")) return new e.Directive(a, c)
                },
                font: function () {
                    var a = [],
                        b = [],
                        c, d, f, g;
                    while (g = t(this.shorthand) || t(this.entity)) b.push(g);
                    a.push(new e.Expression(b));
                    if (t(","))
                        while (g = t(this.expression)) {
                            a.push(g);
                            if (!t(",")) break
                        }
                    return new e.Value(a)
                },
                value: function () {
                    var a, b = [],
                        c;
                    while (a = t(this.expression)) {
                        b.push(a);
                        if (!t(",")) break
                    }
                    if (b.length > 0) return new e.Value(b)
                },
                important: function () {
                    if (b.charAt(f) === "!") return t(/^! *important/)
                },
                sub: function () {
                    var a;
                    if (t("(") && (a = t(this.expression)) && t(")")) return a
                },
                multiplication: function () {
                    var a, b, c, d;
                    if (a = t(this.operand)) {
                        while (!w(/^\/\*/) && (c = t("/") || t("*")) && (b = t(this.operand))) d = new e.Operation(c, [d || a, b]);
                        return d || a
                    }
                },
                addition: function () {
                    var a, c, d, g;
                    if (a = t(this.multiplication)) {
                        while ((d = t(/^[-+]\s+/) || b.charAt(f - 1) != " " && (t("+") || t("-"))) && (c = t(this.multiplication))) g = new e.Operation(d, [g || a, c]);
                        return g || a
                    }
                },
                conditions: function () {
                    var a, b, c = f,
                        d;
                    if (a = t(this.condition)) {
                        while (t(",") && (b = t(this.condition))) d = new e.Condition("or", d || a, b, c);
                        return d || a
                    }
                },
                condition: function () {
                    var a, b, c, d, g = f,
                        h = !1;
                    t(/^not/) && (h = !0), u("(");
                    if (a = t(this.addition) || t(this.entities.keyword) || t(this.entities.quoted)) return (d = t(/^(?:>=|=<|[<=>])/)) ? (b = t(this.addition) || t(this.entities.keyword) || t(this.entities.quoted)) ? c = new e.Condition(d, a, b, g, h) : v("expected expression") : c = new e.Condition("=", a, new e.Keyword("true"), g, h), u(")"), t(/^and/) ? new e.Condition("and", c, t(this.condition)) : c
                },
                operand: function () {
                    var a, c = b.charAt(f + 1);
                    b.charAt(f) === "-" && (c === "@" || c === "(") && (a = t("-"));
                    var d = t(this.sub) || t(this.entities.dimension) || t(this.entities.color) || t(this.entities.variable) || t(this.entities.call);
                    return a ? new e.Operation("*", [new e.Dimension(-1), d]) : d
                },
                expression: function () {
                    var a, b, c = [],
                        d;
                    while (a = t(this.addition) || t(this.entity)) c.push(a);
                    if (c.length > 0) return new e.Expression(c)
                },
                property: function () {
                    var a;
                    if (a = t(/^(\*?-?[-a-z_0-9]+)\s*:/)) return a[1]
                }
            }
        }
    };
    if (d.mode === "browser" || d.mode === "rhino") d.Parser.importer = function (a, b, c, d) {
        !/^([a-z]+:)?\//.test(a) && b.length > 0 && (a = b[0] + a), n({
            href: a,
            title: a,
            type: d.mime
        }, function (e) {
            e && typeof d.errback == "function" ? d.errback.call(null, a, b, c, d) : c.apply(null, arguments)
        }, !0)
    };
    (function (a) {
        function b(b) {
            return a.functions.hsla(b.h, b.s, b.l, b.a)
        }

        function c(b) {
            if (b instanceof a.Dimension) return parseFloat(b.unit == "%" ? b.value / 100 : b.value);
            if (typeof b == "number") return b;
            throw {
                error: "RuntimeError",
                message: "color functions take numbers as parameters"
            }
        }

        function d(a) {
            return Math.min(1, Math.max(0, a))
        }
        a.functions = {
            rgb: function (a, b, c) {
                return this.rgba(a, b, c, 1)
            },
            rgba: function (b, d, e, f) {
                var g = [b, d, e].map(function (a) {
                        return c(a)
                    }),
                    f = c(f);
                return new a.Color(g, f)
            },
            hsl: function (a, b, c) {
                return this.hsla(a, b, c, 1)
            },
            hsla: function (a, b, d, e) {
                function h(a) {
                    return a = a < 0 ? a + 1 : a > 1 ? a - 1 : a, a * 6 < 1 ? g + (f - g) * a * 6 : a * 2 < 1 ? f : a * 3 < 2 ? g + (f - g) * (2 / 3 - a) * 6 : g
                }
                a = c(a) % 360 / 360, b = c(b), d = c(d), e = c(e);
                var f = d <= .5 ? d * (b + 1) : d + b - d * b,
                    g = d * 2 - f;
                return this.rgba(h(a + 1 / 3) * 255, h(a) * 255, h(a - 1 / 3) * 255, e)
            },
            hue: function (b) {
                return new a.Dimension(Math.round(b.toHSL().h))
            },
            saturation: function (b) {
                return new a.Dimension(Math.round(b.toHSL().s * 100), "%")
            },
            lightness: function (b) {
                return new a.Dimension(Math.round(b.toHSL().l * 100), "%")
            },
            alpha: function (b) {
                return new a.Dimension(b.toHSL().a)
            },
            saturate: function (a, c) {
                var e = a.toHSL();
                return e.s += c.value / 100, e.s = d(e.s), b(e)
            },
            desaturate: function (a, c) {
                var e = a.toHSL();
                return e.s -= c.value / 100, e.s = d(e.s), b(e)
            },
            lighten: function (a, c) {
                var e = a.toHSL();
                return e.l += c.value / 100, e.l = d(e.l), b(e)
            },
            darken: function (a, c) {
                var e = a.toHSL();
                return e.l -= c.value / 100, e.l = d(e.l), b(e)
            },
            fadein: function (a, c) {
                var e = a.toHSL();
                return e.a += c.value / 100, e.a = d(e.a), b(e)
            },
            fadeout: function (a, c) {
                var e = a.toHSL();
                return e.a -= c.value / 100, e.a = d(e.a), b(e)
            },
            fade: function (a, c) {
                var e = a.toHSL();
                return e.a = c.value / 100, e.a = d(e.a), b(e)
            },
            spin: function (a, c) {
                var d = a.toHSL(),
                    e = (d.h + c.value) % 360;
                return d.h = e < 0 ? 360 + e : e, b(d)
            },
            mix: function (b, c, d) {
                var e = d.value / 100,
                    f = e * 2 - 1,
                    g = b.toHSL().a - c.toHSL().a,
                    h = ((f * g == -1 ? f : (f + g) / (1 + f * g)) + 1) / 2,
                    i = 1 - h,
                    j = [b.rgb[0] * h + c.rgb[0] * i, b.rgb[1] * h + c.rgb[1] * i, b.rgb[2] * h + c.rgb[2] * i],
                    k = b.alpha * e + c.alpha * (1 - e);
                return new a.Color(j, k)
            },
            greyscale: function (b) {
                return this.desaturate(b, new a.Dimension(100))
            },
            e: function (b) {
                return new a.Anonymous(b instanceof a.JavaScript ? b.evaluated : b)
            },
            escape: function (b) {
                return new a.Anonymous(encodeURI(b.value).replace(/=/g, "%3D").replace(/:/g, "%3A").replace(/#/g, "%23").replace(/;/g, "%3B").replace(/\(/g, "%28").replace(/\)/g, "%29"))
            },
            "%": function (b) {
                var c = Array.prototype.slice.call(arguments, 1),
                    d = b.value;
                for (var e = 0; e < c.length; e++) d = d.replace(/%[sda]/i, function (a) {
                    var b = a.match(/s/i) ? c[e].value : c[e].toCSS();
                    return a.match(/[A-Z]$/) ? encodeURIComponent(b) : b
                });
                return d = d.replace(/%%/g, "%"), new a.Quoted('"' + d + '"', d)
            },
            round: function (a) {
                return this._math("round", a)
            },
            ceil: function (a) {
                return this._math("ceil", a)
            },
            floor: function (a) {
                return this._math("floor", a)
            },
            _math: function (b, d) {
                if (d instanceof a.Dimension) return new a.Dimension(Math[b](c(d)), d.unit);
                if (typeof d == "number") return Math[b](d);
                throw {
                    type: "Argument",
                    message: "argument must be a number"
                }
            },
            argb: function (b) {
                return new a.Anonymous(b.toARGB())
            },
            percentage: function (b) {
                return new a.Dimension(b.value * 100, "%")
            },
            color: function (b) {
                if (b instanceof a.Quoted) return new a.Color(b.value.slice(1));
                throw {
                    type: "Argument",
                    message: "argument must be a string"
                }
            },
            iscolor: function (b) {
                return this._isa(b, a.Color)
            },
            isnumber: function (b) {
                return this._isa(b, a.Dimension)
            },
            isstring: function (b) {
                return this._isa(b, a.Quoted)
            },
            iskeyword: function (b) {
                return this._isa(b, a.Keyword)
            },
            isurl: function (b) {
                return this._isa(b, a.URL)
            },
            ispixel: function (b) {
                return b instanceof a.Dimension && b.unit === "px" ? a.True : a.False
            },
            ispercentage: function (b) {
                return b instanceof a.Dimension && b.unit === "%" ? a.True : a.False
            },
            isem: function (b) {
                return b instanceof a.Dimension && b.unit === "em" ? a.True : a.False
            },
            _isa: function (b, c) {
                return b instanceof c ? a.True : a.False
            }
        }
    })(c("./tree")),
        function (a) {
            a.colors = {
                aliceblue: "#f0f8ff",
                antiquewhite: "#faebd7",
                aqua: "#00ffff",
                aquamarine: "#7fffd4",
                azure: "#f0ffff",
                beige: "#f5f5dc",
                bisque: "#ffe4c4",
                black: "#000000",
                blanchedalmond: "#ffebcd",
                blue: "#0000ff",
                blueviolet: "#8a2be2",
                brown: "#a52a2a",
                burlywood: "#deb887",
                cadetblue: "#5f9ea0",
                chartreuse: "#7fff00",
                chocolate: "#d2691e",
                coral: "#ff7f50",
                cornflowerblue: "#6495ed",
                cornsilk: "#fff8dc",
                crimson: "#dc143c",
                cyan: "#00ffff",
                darkblue: "#00008b",
                darkcyan: "#008b8b",
                darkgoldenrod: "#b8860b",
                darkgray: "#a9a9a9",
                darkgrey: "#a9a9a9",
                darkgreen: "#006400",
                darkkhaki: "#bdb76b",
                darkmagenta: "#8b008b",
                darkolivegreen: "#556b2f",
                darkorange: "#ff8c00",
                darkorchid: "#9932cc",
                darkred: "#8b0000",
                darksalmon: "#e9967a",
                darkseagreen: "#8fbc8f",
                darkslateblue: "#483d8b",
                darkslategray: "#2f4f4f",
                darkslategrey: "#2f4f4f",
                darkturquoise: "#00ced1",
                darkviolet: "#9400d3",
                deeppink: "#ff1493",
                deepskyblue: "#00bfff",
                dimgray: "#696969",
                dimgrey: "#696969",
                dodgerblue: "#1e90ff",
                firebrick: "#b22222",
                floralwhite: "#fffaf0",
                forestgreen: "#228b22",
                fuchsia: "#ff00ff",
                gainsboro: "#dcdcdc",
                ghostwhite: "#f8f8ff",
                gold: "#ffd700",
                goldenrod: "#daa520",
                gray: "#808080",
                grey: "#808080",
                green: "#008000",
                greenyellow: "#adff2f",
                honeydew: "#f0fff0",
                hotpink: "#ff69b4",
                indianred: "#cd5c5c",
                indigo: "#4b0082",
                ivory: "#fffff0",
                khaki: "#f0e68c",
                lavender: "#e6e6fa",
                lavenderblush: "#fff0f5",
                lawngreen: "#7cfc00",
                lemonchiffon: "#fffacd",
                lightblue: "#add8e6",
                lightcoral: "#f08080",
                lightcyan: "#e0ffff",
                lightgoldenrodyellow: "#fafad2",
                lightgray: "#d3d3d3",
                lightgrey: "#d3d3d3",
                lightgreen: "#90ee90",
                lightpink: "#ffb6c1",
                lightsalmon: "#ffa07a",
                lightseagreen: "#20b2aa",
                lightskyblue: "#87cefa",
                lightslategray: "#778899",
                lightslategrey: "#778899",
                lightsteelblue: "#b0c4de",
                lightyellow: "#ffffe0",
                lime: "#00ff00",
                limegreen: "#32cd32",
                linen: "#faf0e6",
                magenta: "#ff00ff",
                maroon: "#800000",
                mediumaquamarine: "#66cdaa",
                mediumblue: "#0000cd",
                mediumorchid: "#ba55d3",
                mediumpurple: "#9370d8",
                mediumseagreen: "#3cb371",
                mediumslateblue: "#7b68ee",
                mediumspringgreen: "#00fa9a",
                mediumturquoise: "#48d1cc",
                mediumvioletred: "#c71585",
                midnightblue: "#191970",
                mintcream: "#f5fffa",
                mistyrose: "#ffe4e1",
                moccasin: "#ffe4b5",
                navajowhite: "#ffdead",
                navy: "#000080",
                oldlace: "#fdf5e6",
                olive: "#808000",
                olivedrab: "#6b8e23",
                orange: "#ffa500",
                orangered: "#ff4500",
                orchid: "#da70d6",
                palegoldenrod: "#eee8aa",
                palegreen: "#98fb98",
                paleturquoise: "#afeeee",
                palevioletred: "#d87093",
                papayawhip: "#ffefd5",
                peachpuff: "#ffdab9",
                peru: "#cd853f",
                pink: "#ffc0cb",
                plum: "#dda0dd",
                powderblue: "#b0e0e6",
                purple: "#800080",
                red: "#ff0000",
                rosybrown: "#bc8f8f",
                royalblue: "#4169e1",
                saddlebrown: "#8b4513",
                salmon: "#fa8072",
                sandybrown: "#f4a460",
                seagreen: "#2e8b57",
                seashell: "#fff5ee",
                sienna: "#a0522d",
                silver: "#c0c0c0",
                skyblue: "#87ceeb",
                slateblue: "#6a5acd",
                slategray: "#708090",
                slategrey: "#708090",
                snow: "#fffafa",
                springgreen: "#00ff7f",
                steelblue: "#4682b4",
                tan: "#d2b48c",
                teal: "#008080",
                thistle: "#d8bfd8",
                tomato: "#ff6347",
                turquoise: "#40e0d0",
                violet: "#ee82ee",
                wheat: "#f5deb3",
                white: "#ffffff",
                whitesmoke: "#f5f5f5",
                yellow: "#ffff00",
                yellowgreen: "#9acd32"
            }
        }(c("./tree")),
        function (a) {
            a.Alpha = function (a) {
                this.value = a
            }, a.Alpha.prototype = {
                toCSS: function () {
                    return "alpha(opacity=" + (this.value.toCSS ? this.value.toCSS() : this.value) + ")"
                },
                eval: function (a) {
                    return this.value.eval && (this.value = this.value.eval(a)), this
                }
            }
        }(c("../tree")),
        function (a) {
            a.Anonymous = function (a) {
                this.value = a.value || a
            }, a.Anonymous.prototype = {
                toCSS: function () {
                    return this.value
                },
                eval: function () {
                    return this
                }
            }
        }(c("../tree")),
        function (a) {
            a.Assignment = function (a, b) {
                this.key = a, this.value = b
            }, a.Assignment.prototype = {
                toCSS: function () {
                    return this.key + "=" + (this.value.toCSS ? this.value.toCSS() : this.value)
                },
                eval: function (a) {
                    return this.value.eval && (this.value = this.value.eval(a)), this
                }
            }
        }(c("../tree")),
        function (a) {
            a.Call = function (a, b, c, d) {
                this.name = a, this.args = b, this.index = c, this.filename = d
            }, a.Call.prototype = {
                eval: function (b) {
                    var c = this.args.map(function (a) {
                        return a.eval(b)
                    });
                    if (!(this.name in a.functions)) return new a.Anonymous(this.name + "(" + c.map(function (a) {
                        return a.toCSS()
                    }).join(", ") + ")");
                    try {
                        return a.functions[this.name].apply(a.functions, c)
                    } catch (d) {
                        throw {
                            type: d.type || "Runtime",
                            message: "error evaluating function `" + this.name + "`" + (d.message ? ": " + d.message : ""),
                            index: this.index,
                            filename: this.filename
                        }
                    }
                },
                toCSS: function (a) {
                    return this.eval(a).toCSS()
                }
            }
        }(c("../tree")),
        function (a) {
            a.Color = function (a, b) {
                Array.isArray(a) ? this.rgb = a : a.length == 6 ? this.rgb = a.match(/.{2}/g).map(function (a) {
                    return parseInt(a, 16)
                }) : this.rgb = a.split("").map(function (a) {
                    return parseInt(a + a, 16)
                }), this.alpha = typeof b == "number" ? b : 1
            }, a.Color.prototype = {
                eval: function () {
                    return this
                },
                toCSS: function () {
                    return this.alpha < 1 ? "rgba(" + this.rgb.map(function (a) {
                        return Math.round(a)
                    }).concat(this.alpha).join(", ") + ")" : "#" + this.rgb.map(function (a) {
                        return a = Math.round(a), a = (a > 255 ? 255 : a < 0 ? 0 : a).toString(16), a.length === 1 ? "0" + a : a
                    }).join("")
                },
                operate: function (b, c) {
                    var d = [];
                    c instanceof a.Color || (c = c.toColor());
                    for (var e = 0; e < 3; e++) d[e] = a.operate(b, this.rgb[e], c.rgb[e]);
                    return new a.Color(d, this.alpha + c.alpha)
                },
                toHSL: function () {
                    var a = this.rgb[0] / 255,
                        b = this.rgb[1] / 255,
                        c = this.rgb[2] / 255,
                        d = this.alpha,
                        e = Math.max(a, b, c),
                        f = Math.min(a, b, c),
                        g, h, i = (e + f) / 2,
                        j = e - f;
                    if (e === f) g = h = 0;
                    else {
                        h = i > .5 ? j / (2 - e - f) : j / (e + f);
                        switch (e) {
                            case a:
                                g = (b - c) / j + (b < c ? 6 : 0);
                                break;
                            case b:
                                g = (c - a) / j + 2;
                                break;
                            case c:
                                g = (a - b) / j + 4
                        }
                        g /= 6
                    }
                    return {
                        h: g * 360,
                        s: h,
                        l: i,
                        a: d
                    }
                },
                toARGB: function () {
                    var a = [Math.round(this.alpha * 255)].concat(this.rgb);
                    return "#" + a.map(function (a) {
                        return a = Math.round(a), a = (a > 255 ? 255 : a < 0 ? 0 : a).toString(16), a.length === 1 ? "0" + a : a
                    }).join("")
                }
            }
        }(c("../tree")),
        function (a) {
            a.Comment = function (a, b) {
                this.value = a, this.silent = !! b
            }, a.Comment.prototype = {
                toCSS: function (a) {
                    return a.compress ? "" : this.value
                },
                eval: function () {
                    return this
                }
            }
        }(c("../tree")),
        function (a) {
            a.Condition = function (a, b, c, d, e) {
                this.op = a.trim(), this.lvalue = b, this.rvalue = c, this.index = d, this.negate = e
            }, a.Condition.prototype.eval = function (a) {
                var b = this.lvalue.eval(a),
                    c = this.rvalue.eval(a),
                    d = this.index,
                    e, e = function (a) {
                        switch (a) {
                            case "and":
                                return b && c;
                            case "or":
                                return b || c;
                            default:
                                if (b.compare) e = b.compare(c);
                                else if (c.compare) e = c.compare(b);
                                else throw {
                                        type: "Type",
                                        message: "Unable to perform comparison",
                                        index: d
                                    };
                                switch (e) {
                                    case -1:
                                        return a === "<" || a === "=<";
                                    case 0:
                                        return a === "=" || a === ">=" || a === "=<";
                                    case 1:
                                        return a === ">" || a === ">="
                                }
                        }
                    }(this.op);
                return this.negate ? !e : e
            }
        }(c("../tree")),
        function (a) {
            a.Dimension = function (a, b) {
                this.value = parseFloat(a), this.unit = b || null
            }, a.Dimension.prototype = {
                eval: function () {
                    return this
                },
                toColor: function () {
                    return new a.Color([this.value, this.value, this.value])
                },
                toCSS: function () {
                    var a = this.value + this.unit;
                    return a
                },
                operate: function (b, c) {
                    return new a.Dimension(a.operate(b, this.value, c.value), this.unit || c.unit)
                },
                compare: function (b) {
                    return b instanceof a.Dimension ? b.value > this.value ? -1 : b.value < this.value ? 1 : 0 : -1
                }
            }
        }(c("../tree")),
        function (a) {
            a.Directive = function (b, c, d) {
                this.name = b, Array.isArray(c) ? (this.ruleset = new a.Ruleset([], c), this.ruleset.allowImports = !0) : this.value = c
            }, a.Directive.prototype = {
                toCSS: function (a, b) {
                    return this.ruleset ? (this.ruleset.root = !0, this.name + (b.compress ? "{" : " {\n  ") + this.ruleset.toCSS(a, b).trim().replace(/\n/g, "\n  ") + (b.compress ? "}" : "\n}\n")) : this.name + " " + this.value.toCSS() + ";\n"
                },
                eval: function (a) {
                    return a.frames.unshift(this), this.ruleset = this.ruleset && this.ruleset.eval(a), a.frames.shift(), this
                },
                variable: function (b) {
                    return a.Ruleset.prototype.variable.call(this.ruleset, b)
                },
                find: function () {
                    return a.Ruleset.prototype.find.apply(this.ruleset, arguments)
                },
                rulesets: function () {
                    return a.Ruleset.prototype.rulesets.apply(this.ruleset)
                }
            }
        }(c("../tree")),
        function (a) {
            a.Element = function (b, c, d) {
                this.combinator = b instanceof a.Combinator ? b : new a.Combinator(b), typeof c == "string" ? this.value = c.trim() : c ? this.value = c : this.value = "", this.index = d
            }, a.Element.prototype.eval = function (b) {
                return new a.Element(this.combinator, this.value.eval ? this.value.eval(b) : this.value, this.index)
            }, a.Element.prototype.toCSS = function (a) {
                return this.combinator.toCSS(a || {}) + (this.value.toCSS ? this.value.toCSS(a) : this.value)
            }, a.Combinator = function (a) {
                a === " " ? this.value = " " : a === "& " ? this.value = "& " : this.value = a ? a.trim() : ""
            }, a.Combinator.prototype.toCSS = function (a) {
                return {
                    "": "",
                    " ": " ",
                    "&": "",
                    "& ": " ",
                    ":": " :",
                    "+": a.compress ? "+" : " + ",
                    "~": a.compress ? "~" : " ~ ",
                    ">": a.compress ? ">" : " > "
                }[this.value]
            }
        }(c("../tree")),
        function (a) {
            a.Expression = function (a) {
                this.value = a
            }, a.Expression.prototype = {
                eval: function (b) {
                    return this.value.length > 1 ? new a.Expression(this.value.map(function (a) {
                        return a.eval(b)
                    })) : this.value.length === 1 ? this.value[0].eval(b) : this
                },
                toCSS: function (a) {
                    return this.value.map(function (b) {
                        return b.toCSS ? b.toCSS(a) : ""
                    }).join(" ")
                }
            }
        }(c("../tree")),
        function (a) {
            a.Import = function (b, c, d, e) {
                var f = this;
                this.index = e, this._path = b, this.features = d && new a.Value(d), b instanceof a.Quoted ? this.path = /\.(le?|c)ss(\?.*)?$/.test(b.value) ? b.value : b.value + ".less" : this.path = b.value.value || b.value, this.css = /css(\?.*)?$/.test(this.path), this.css || c.push(this.path, function (b, c) {
                    b && (b.index = e), f.root = c || new a.Ruleset([], [])
                })
            }, a.Import.prototype = {
                toCSS: function (a) {
                    var b = this.features ? " " + this.features.toCSS(a) : "";
                    return this.css ? "@import " + this._path.toCSS() + b + ";\n" : ""
                },
                eval: function (b) {
                    var c, d = this.features && this.features.eval(b);
                    if (this.css) return this;
                    c = new a.Ruleset([], this.root.rules.slice(0));
                    for (var e = 0; e < c.rules.length; e++) c.rules[e] instanceof a.Import && Array.prototype
                        .splice.apply(c.rules, [e, 1].concat(c.rules[e].eval(b)));
                    return this.features ? new a.Media(c.rules, this.features.value) : c.rules
                }
            }
        }(c("../tree")),
        function (a) {
            a.JavaScript = function (a, b, c) {
                this.escaped = c, this.expression = a, this.index = b
            }, a.JavaScript.prototype = {
                eval: function (b) {
                    var c, d = this,
                        e = {}, f = this.expression.replace(/@\{([\w-]+)\}/g, function (c, e) {
                            return a.jsify((new a.Variable("@" + e, d.index)).eval(b))
                        });
                    try {
                        f = new Function("return (" + f + ")")
                    } catch (g) {
                        throw {
                            message: "JavaScript evaluation error: `" + f + "`",
                            index: this.index
                        }
                    }
                    for (var h in b.frames[0].variables()) e[h.slice(1)] = {
                        value: b.frames[0].variables()[h].value,
                        toJS: function () {
                            return this.value.eval(b).toCSS()
                        }
                    };
                    try {
                        c = f.call(e)
                    } catch (g) {
                        throw {
                            message: "JavaScript evaluation error: '" + g.name + ": " + g.message + "'",
                            index: this.index
                        }
                    }
                    return typeof c == "string" ? new a.Quoted('"' + c + '"', c, this.escaped, this.index) : Array.isArray(c) ? new a.Anonymous(c.join(", ")) : new a.Anonymous(c)
                }
            }
        }(c("../tree")),
        function (a) {
            a.Keyword = function (a) {
                this.value = a
            }, a.Keyword.prototype = {
                eval: function () {
                    return this
                },
                toCSS: function () {
                    return this.value
                },
                compare: function (b) {
                    return b instanceof a.Keyword ? b.value === this.value ? 0 : 1 : -1
                }
            }, a.True = new a.Keyword("true"), a.False = new a.Keyword("false")
        }(c("../tree")),
        function (a) {
            a.Media = function (b, c) {
                var d = new a.Element("&", null, 0),
                    e = [new a.Selector([d])];
                this.features = new a.Value(c), this.ruleset = new a.Ruleset(e, b), this.ruleset.allowImports = !0
            }, a.Media.prototype = {
                toCSS: function (a, b) {
                    var c = this.features.toCSS(b);
                    return this.ruleset.root = a.length === 0 || a[0].multiMedia, "@media " + c + (b.compress ? "{" : " {\n  ") + this.ruleset.toCSS(a, b).trim().replace(/\n/g, "\n  ") + (b.compress ? "}" : "\n}\n")
                },
                eval: function (b) {
                    b.mediaBlocks || (b.mediaBlocks = [], b.mediaPath = []);
                    var c = b.mediaBlocks.length;
                    b.mediaPath.push(this), b.mediaBlocks.push(this);
                    var d = new a.Media([], []);
                    return d.features = this.features.eval(b), b.frames.unshift(this.ruleset), d.ruleset = this.ruleset.eval(b), b.frames.shift(), b.mediaBlocks[c] = d, b.mediaPath.pop(), b.mediaPath.length === 0 ? d.evalTop(b) : d.evalNested(b)
                },
                variable: function (b) {
                    return a.Ruleset.prototype.variable.call(this.ruleset, b)
                },
                find: function () {
                    return a.Ruleset.prototype.find.apply(this.ruleset, arguments)
                },
                rulesets: function () {
                    return a.Ruleset.prototype.rulesets.apply(this.ruleset)
                },
                evalTop: function (b) {
                    var c = this;
                    if (b.mediaBlocks.length > 1) {
                        var d = new a.Element("&", null, 0),
                            e = [new a.Selector([d])];
                        c = new a.Ruleset(e, b.mediaBlocks), c.multiMedia = !0
                    }
                    return delete b.mediaBlocks, delete b.mediaPath, c
                },
                evalNested: function (b) {
                    var c, d, e = b.mediaPath.concat([this]);
                    for (c = 0; c < e.length; c++) d = e[c].features instanceof a.Value ? e[c].features.value : e[c].features, e[c] = Array.isArray(d) ? d : [d];
                    return this.features = new a.Value(this.permute(e).map(function (b) {
                        b = b.map(function (b) {
                            return b.toCSS ? b : new a.Anonymous(b)
                        });
                        for (c = b.length - 1; c > 0; c--) b.splice(c, 0, new a.Anonymous("and"));
                        return new a.Expression(b)
                    })), new a.Ruleset([], [])
                },
                permute: function (a) {
                    if (a.length === 0) return [];
                    if (a.length === 1) return a[0];
                    var b = [],
                        c = this.permute(a.slice(1));
                    for (var d = 0; d < c.length; d++)
                        for (var e = 0; e < a[0].length; e++) b.push([a[0][e]].concat(c[d]));
                    return b
                }
            }
        }(c("../tree")),
        function (a) {
            a.mixin = {}, a.mixin.Call = function (b, c, d, e, f) {
                this.selector = new a.Selector(b), this.arguments = c, this.index = d, this.filename = e, this.important = f
            }, a.mixin.Call.prototype = {
                eval: function (a) {
                    var b, c, d = [],
                        e = !1;
                    for (var f = 0; f < a.frames.length; f++)
                        if ((b = a.frames[f].find(this.selector)).length > 0) {
                            c = this.arguments && this.arguments.map(function (b) {
                                return b.eval(a)
                            });
                            for (var g = 0; g < b.length; g++)
                                if (b[g].match(c, a)) try {
                                    Array.prototype.push.apply(d, b[g].eval(a, this.arguments, this.important).rules), e = !0
                                } catch (h) {
                                    throw {
                                        message: h.message,
                                        index: this.index,
                                        filename: this.filename,
                                        stack: h.stack
                                    }
                                }
                            if (e) return d;
                            throw {
                                type: "Runtime",
                                message: "No matching definition was found for `" + this.selector.toCSS().trim() + "(" + this.arguments.map(function (a) {
                                    return a.toCSS()
                                }).join(", ") + ")`",
                                index: this.index,
                                filename: this.filename
                            }
                        }
                    throw {
                        type: "Name",
                        message: this.selector.toCSS().trim() + " is undefined",
                        index: this.index,
                        filename: this.filename
                    }
                }
            }, a.mixin.Definition = function (b, c, d, e, f) {
                this.name = b, this.selectors = [new a.Selector([new a.Element(null, b)])], this.params = c, this.condition = e, this.variadic = f, this.arity = c.length, this.rules = d, this._lookups = {}, this.required = c.reduce(function (a, b) {
                    return !b.name || b.name && !b.value ? a + 1 : a
                }, 0), this.parent = a.Ruleset.prototype, this.frames = []
            }, a.mixin.Definition.prototype = {
                toCSS: function () {
                    return ""
                },
                variable: function (a) {
                    return this.parent.variable.call(this, a)
                },
                variables: function () {
                    return this.parent.variables.call(this)
                },
                find: function () {
                    return this.parent.find.apply(this, arguments)
                },
                rulesets: function () {
                    return this.parent.rulesets.apply(this)
                },
                evalParams: function (b, c) {
                    var d = new a.Ruleset(null, []),
                        e;
                    for (var f = 0, g, h; f < this.params.length; f++)
                        if (h = this.params[f].name)
                            if (this.params[f].variadic && c) {
                                e = [];
                                for (var i = f; i < c.length; i++) e.push(c[i].eval(b));
                                d.rules.unshift(new a.Rule(h, (new a.Expression(e)).eval(b)))
                            } else if (g = c && c[f] || this.params[f].value) d.rules.unshift(new a.Rule(h, g.eval(b)));
                            else throw {
                                    type: "Runtime",
                                    message: "wrong number of arguments for " + this.name + " (" + c.length + " for " + this.arity + ")"
                                };
                    return d
                },
                eval: function (b, c, d) {
                    var e = this.evalParams(b, c),
                        f, g = [],
                        h, i;
                    for (var j = 0; j < Math.max(this.params.length, c && c.length); j++) g.push(c[j] || this.params[j].value);
                    return e.rules.unshift(new a.Rule("@arguments", (new a.Expression(g)).eval(b))), h = d ? this.rules.map(function (b) {
                        return new a.Rule(b.name, b.value, "!important", b.index)
                    }) : this.rules.slice(0), (new a.Ruleset(null, h)).eval({
                        frames: [this, e].concat(this.frames, b.frames)
                    })
                },
                match: function (a, b) {
                    var c = a && a.length || 0,
                        d, e;
                    if (!this.variadic) {
                        if (c < this.required) return !1;
                        if (c > this.params.length) return !1;
                        if (this.required > 0 && c > this.params.length) return !1
                    }
                    if (this.condition && !this.condition.eval({
                        frames: [this.evalParams(b, a)].concat(b.frames)
                    })) return !1;
                    d = Math.min(c, this.arity);
                    for (var f = 0; f < d; f++)
                        if (!this.params[f].name && a[f].eval(b).toCSS() != this.params[f].value.eval(b).toCSS()) return !1;
                    return !0
                }
            }
        }(c("../tree")),
        function (a) {
            a.Operation = function (a, b) {
                this.op = a.trim(), this.operands = b
            }, a.Operation.prototype.eval = function (b) {
                var c = this.operands[0].eval(b),
                    d = this.operands[1].eval(b),
                    e;
                if (c instanceof a.Dimension && d instanceof a.Color)
                    if (this.op === "*" || this.op === "+") e = d, d = c, c = e;
                    else throw {
                        name: "OperationError",
                        message: "Can't substract or divide a color from a number"
                    };
                return c.operate(this.op, d)
            }, a.operate = function (a, b, c) {
                switch (a) {
                    case "+":
                        return b + c;
                    case "-":
                        return b - c;
                    case "*":
                        return b * c;
                    case "/":
                        return b / c
                }
            }
        }(c("../tree")),
        function (a) {
            a.Paren = function (a) {
                this.value = a
            }, a.Paren.prototype = {
                toCSS: function (a) {
                    return "(" + this.value.toCSS(a) + ")"
                },
                eval: function (b) {
                    return new a.Paren(this.value.eval(b))
                }
            }
        }(c("../tree")),
        function (a) {
            a.Quoted = function (a, b, c, d) {
                this.escaped = c, this.value = b || "", this.quote = a.charAt(0), this.index = d
            }, a.Quoted.prototype = {
                toCSS: function () {
                    return this.escaped ? this.value : this.quote + this.value + this.quote
                },
                eval: function (b) {
                    var c = this,
                        d = this.value.replace(/`([^`]+)`/g, function (d, e) {
                            return (new a.JavaScript(e, c.index, !0)).eval(b).value
                        }).replace(/@\{([\w-]+)\}/g, function (d, e) {
                                var f = (new a.Variable("@" + e, c.index)).eval(b);
                                return "value" in f ? f.value : f.toCSS()
                            });
                    return new a.Quoted(this.quote + d + this.quote, d, this.escaped, this.index)
                }
            }
        }(c("../tree")),
        function (a) {
            a.Rule = function (b, c, d, e, f) {
                this.name = b, this.value = c instanceof a.Value ? c : new a.Value([c]), this.important = d ? " " + d.trim() : "", this.index = e, this.inline = f || !1, b.charAt(0) === "@" ? this.variable = !0 : this.variable = !1
            }, a.Rule.prototype.toCSS = function (a) {
                return this.variable ? "" : this.name + (a.compress ? ":" : ": ") + this.value.toCSS(a) + this.important + (this.inline ? "" : ";")
            }, a.Rule.prototype.eval = function (b) {
                return new a.Rule(this.name, this.value.eval(b), this.important, this.index, this.inline)
            }, a.Shorthand = function (a, b) {
                this.a = a, this.b = b
            }, a.Shorthand.prototype = {
                toCSS: function (a) {
                    return this.a.toCSS(a) + "/" + this.b.toCSS(a)
                },
                eval: function () {
                    return this
                }
            }
        }(c("../tree")),
        function (a) {
            a.Ruleset = function (a, b, c) {
                this.selectors = a, this.rules = b, this._lookups = {}, this.strictImports = c
            }, a.Ruleset.prototype = {
                eval: function (b) {
                    var c = this.selectors && this.selectors.map(function (a) {
                            return a.eval(b)
                        }),
                        d = new a.Ruleset(c, this.rules.slice(0), this.strictImports);
                    d.root = this.root, d.allowImports = this.allowImports, b.frames.unshift(d);
                    if (d.root || d.allowImports || !d.strictImports)
                        for (var e = 0; e < d.rules.length; e++) d.rules[e] instanceof a.Import && Array.prototype.splice.apply(d.rules, [e, 1].concat(d.rules[e].eval(b)));
                    for (var e = 0; e < d.rules.length; e++) d.rules[e] instanceof a.mixin.Definition && (d.rules[e].frames = b.frames.slice(0));
                    for (var e = 0; e < d.rules.length; e++) d.rules[e] instanceof a.mixin.Call && Array.prototype.splice.apply(d.rules, [e, 1].concat(d.rules[e].eval(b)));
                    for (var e = 0, f; e < d.rules.length; e++) f = d.rules[e], f instanceof a.mixin.Definition || (d.rules[e] = f.eval ? f.eval(b) : f);
                    return b.frames.shift(), d
                },
                match: function (a) {
                    return !a || a.length === 0
                },
                variables: function () {
                    return this._variables ? this._variables : this._variables = this.rules.reduce(function (b, c) {
                        return c instanceof a.Rule && c.variable === !0 && (b[c.name] = c), b
                    }, {})
                },
                variable: function (a) {
                    return this.variables()[a]
                },
                rulesets: function () {
                    return this._rulesets ? this._rulesets : this._rulesets = this.rules.filter(function (b) {
                        return b instanceof a.Ruleset || b instanceof a.mixin.Definition
                    })
                },
                find: function (b, c) {
                    c = c || this;
                    var d = [],
                        e, f, g = b.toCSS();
                    return g in this._lookups ? this._lookups[g] : (this.rulesets().forEach(function (e) {
                        if (e !== c)
                            for (var g = 0; g < e.selectors.length; g++)
                                if (f = b.match(e.selectors[g])) {
                                    b.elements.length > e.selectors[g].elements.length ? Array.prototype.push.apply(d, e.find(new a.Selector(b.elements.slice(1)), c)) : d.push(e);
                                    break
                                }
                    }), this._lookups[g] = d)
                },
                toCSS: function (b, c) {
                    var d = [],
                        e = [],
                        f = [],
                        g = [],
                        h, i;
                    this.root || (b.length === 0 ? g = this.selectors.map(function (a) {
                        return [a]
                    }) : this.joinSelectors(g, b, this.selectors));
                    for (var j = 0; j < this.rules.length; j++) i = this.rules[j], i.rules || i instanceof a.Directive || i instanceof a.Media ? f.push(i.toCSS(g, c)) : i instanceof a.Comment ? i.silent || (this.root ? f.push(i.toCSS(c)) : e.push(i.toCSS(c))) : i.toCSS && !i.variable ? e.push(i.toCSS(c)) : i.value && !i.variable && e.push(i.value.toString());
                    return f = f.join(""), this.root ? d.push(e.join(c.compress ? "" : "\n")) : e.length > 0 && (h = g.map(function (a) {
                        return a.map(function (a) {
                            return a.toCSS(c)
                        }).join("").trim()
                    }).join(c.compress ? "," : ",\n"), d.push(h, (c.compress ? "{" : " {\n  ") + e.join(c.compress ? "" : "\n  ") + (c.compress ? "}" : "\n}\n"))), d.push(f), d.join("") + (c.compress ? "\n" : "")
                },
                joinSelectors: function (a, b, c) {
                    for (var d = 0; d < c.length; d++) this.joinSelector(a, b, c[d])
                },
                joinSelector: function (b, c, d) {
                    var e = [],
                        f = [],
                        g = [],
                        h = [],
                        i = !1,
                        j;
                    for (var k = 0; k < d.elements.length; k++) j = d.elements[k], j.combinator.value.charAt(0) === "&" && (i = !0), i ? h.push(j) : g.push(j);
                    i || (h = g, g = []), g.length > 0 && e.push(new a.Selector(g)), h.length > 0 && f.push(new a.Selector(h));
                    for (var l = 0; l < c.length; l++) b.push(e.concat(c[l]).concat(f))
                }
            }
        }(c("../tree")),
        function (a) {
            a.Selector = function (a) {
                this.elements = a, this.elements[0].combinator.value === "" && (this.elements[0].combinator.value = " ")
            }, a.Selector.prototype.match = function (a) {
                var b = this.elements.length,
                    c = a.elements.length,
                    d = Math.min(b, c);
                if (b < c) return !1;
                for (var e = 0; e < d; e++)
                    if (this.elements[e].value !== a.elements[e].value) return !1;
                return !0
            }, a.Selector.prototype.eval = function (b) {
                return new a.Selector(this.elements.map(function (a) {
                    return a.eval(b)
                }))
            }, a.Selector.prototype.toCSS = function (a) {
                return this._css ? this._css : this._css = this.elements.map(function (b) {
                    return typeof b == "string" ? " " + b.trim() : b.toCSS(a)
                }).join("")
            }
        }(c("../tree")),
        function (b) {
            b.URL = function (b, c) {
                b.data ? this.attrs = b : (typeof a != "undefined" && !/^(?:https?:\/\/|file:\/\/|data:|\/)/.test(b.value) && c.length > 0 && (b.value = c[0] + (b.value.charAt(0) === "/" ? b.value.slice(1) : b.value)), this.value = b, this.paths = c)
            }, b.URL.prototype = {
                toCSS: function () {
                    return "url(" + (this.attrs ? "data:" + this.attrs.mime + this.attrs.charset + this.attrs.base64 + this.attrs.data : this.value.toCSS()) + ")"
                },
                eval: function (a) {
                    return this.attrs ? this : new b.URL(this.value.eval(a), this.paths)
                }
            }
        }(c("../tree")),
        function (a) {
            a.Value = function (a) {
                this.value = a, this.is = "value"
            }, a.Value.prototype = {
                eval: function (b) {
                    return this.value.length === 1 ? this.value[0].eval(b) : new a.Value(this.value.map(function (a) {
                        return a.eval(b)
                    }))
                },
                toCSS: function (a) {
                    return this.value.map(function (b) {
                        return b.toCSS(a)
                    }).join(a.compress ? "," : ", ")
                }
            }
        }(c("../tree")),
        function (a) {
            a.Variable = function (a, b, c) {
                this.name = a, this.index = b, this.file = c
            }, a.Variable.prototype = {
                eval: function (b) {
                    var c, d, e = this.name;
                    e.indexOf("@@") == 0 && (e = "@" + (new a.Variable(e.slice(1))).eval(b).value);
                    if (c = a.find(b.frames, function (a) {
                        if (d = a.variable(e)) return d.value.eval(b)
                    })) return c;
                    throw {
                        type: "Name",
                        message: "variable " + e + " is undefined",
                        filename: this.file,
                        index: this.index
                    }
                }
            }
        }(c("../tree")),
        function (a) {
            a.find = function (a, b) {
                for (var c = 0, d; c < a.length; c++)
                    if (d = b.call(a, a[c])) return d;
                return null
            }, a.jsify = function (a) {
                return Array.isArray(a.value) && a.value.length > 1 ? "[" + a.value.map(function (a) {
                    return a.toCSS(!1)
                }).join(", ") + "]" : a.toCSS(!1)
            }
        }(c("./tree"));
    var f = location.protocol === "file:" || location.protocol === "chrome:" || location.protocol === "chrome-extension:" || location.protocol === "resource:";
    d.env = d.env || (location.hostname == "127.0.0.1" || location.hostname == "0.0.0.0" || location.hostname == "localhost" || location.port.length > 0 || f ? "development" : "production"), d.async = !1, d.poll = d.poll || (f ? 1e3 : 1500), d.watch = function () {
        return this.watchMode = !0
    }, d.unwatch = function () {
        return this.watchMode = !1
    }, d.env === "development" ? (d.optimization = 0, /!watch/.test(location.hash) && d.watch(), d.watchTimer = setInterval(function () {
        d.watchMode && m(function (a, b, c, d, e) {
            b && p(b.toCSS(), d, e.lastModified)
        })
    }, d.poll)) : d.optimization = 3;
    var g;
    try {
        g = typeof a.localStorage == "undefined" ? null : a.localStorage
    } catch (h) {
        g = null
    }
    var i = document.getElementsByTagName("link"),
        j = /^text\/(x-)?less$/;
    d.sheets = [];
    for (var k = 0; k < i.length; k++)(i[k].rel === "stylesheet/less" || i[k].rel.match(/stylesheet/) && i[k].type.match(j)) && d.sheets.push(i[k]);
    d.refresh = function (a) {
        var b, c;
        b = c = new Date, m(function (a, d, e, f, g) {
            g.local ? t("loading " + f.href + " from cache.") : (t("parsed " + f.href + " successfully."), p(d.toCSS(), f, g.lastModified)), t("css for " + f.href + " generated in " + (new Date - c) + "ms"), g.remaining === 0 && t("css generated in " + (new Date - b) + "ms"), c = new Date
        }, a), l()
    }, d.refreshStyles = l, d.refresh(d.env === "development")
})(window);