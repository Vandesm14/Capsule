// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"axq7v":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "cf5b44f0d102a750";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    var parents = getParents(module.bundle.root, id); // If no parents, the asset is new. Prevent reloading the page.
    if (!parents.length) return true;
    return parents.some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"2F9Y8":[function(require,module,exports) {
var _jsxRuntime = require("preact/jsx-runtime");
var _preact = require("preact");
class App extends _preact.Component {
    componentDidMount() {
        setTimeout(()=>this.setState({
                done: true
            })
        , 1000);
    }
    render({}, { done  }) {
        return(/*#__PURE__*/ _jsxRuntime.jsx("p", {
            __source: {
                fileName: "script.tsx",
                lineNumber: 14,
                columnNumber: 7
            },
            __self: this,
            children: done ? 'Done!' : 'Not done yet'
        }));
    }
    constructor(...args){
        super(...args);
        this.state = {
            done: false
        };
    }
}
// @ts-expect-error: this is a typescript component
_preact.render(/*#__PURE__*/ _jsxRuntime.jsx(App, {
    __source: {
        fileName: "script.tsx",
        lineNumber: 22,
        columnNumber: 8
    },
    __self: undefined
}), document.getElementById('app'));

},{"preact":"2ETNS","preact/jsx-runtime":"fr9w2"}],"2ETNS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "render", ()=>S
);
parcelHelpers.export(exports, "hydrate", ()=>q
);
parcelHelpers.export(exports, "createElement", ()=>v1
);
parcelHelpers.export(exports, "h", ()=>v1
);
parcelHelpers.export(exports, "Fragment", ()=>d1
);
parcelHelpers.export(exports, "createRef", ()=>p1
);
parcelHelpers.export(exports, "isValidElement", ()=>i1
);
parcelHelpers.export(exports, "Component", ()=>_1
);
parcelHelpers.export(exports, "cloneElement", ()=>B
);
parcelHelpers.export(exports, "createContext", ()=>D
);
parcelHelpers.export(exports, "toChildArray", ()=>A1
);
parcelHelpers.export(exports, "options", ()=>l1
);
var n1, l1, u1, i1, t1, r1, o1, f1, e1 = {
}, c1 = [], s1 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function a1(n, l) {
    for(var u in l)n[u] = l[u];
    return n;
}
function h1(n) {
    var l = n.parentNode;
    l && l.removeChild(n);
}
function v1(l, u, i) {
    var t, r, o, f = {
    };
    for(o in u)"key" == o ? t = u[o] : "ref" == o ? r = u[o] : f[o] = u[o];
    if (arguments.length > 2 && (f.children = arguments.length > 3 ? n1.call(arguments, 2) : i), "function" == typeof l && null != l.defaultProps) for(o in l.defaultProps)void 0 === f[o] && (f[o] = l.defaultProps[o]);
    return y1(l, f, t, r, null);
}
function y1(n, i, t, r, o) {
    var f = {
        type: n,
        props: i,
        key: t,
        ref: r,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: null == o ? ++u1 : o
    };
    return null == o && null != l1.vnode && l1.vnode(f), f;
}
function p1() {
    return {
        current: null
    };
}
function d1(n) {
    return n.children;
}
function _1(n, l) {
    this.props = n, this.context = l;
}
function k1(n, l) {
    if (null == l) return n.__ ? k1(n.__, n.__.__k.indexOf(n) + 1) : null;
    for(var u; l < n.__k.length; l++)if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
    return "function" == typeof n.type ? k1(n) : null;
}
function b1(n) {
    var l, u;
    if (null != (n = n.__) && null != n.__c) {
        for(n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++)if (null != (u = n.__k[l]) && null != u.__e) {
            n.__e = n.__c.base = u.__e;
            break;
        }
        return b1(n);
    }
}
function m1(n) {
    (!n.__d && (n.__d = !0) && t1.push(n) && !g1.__r++ || o1 !== l1.debounceRendering) && ((o1 = l1.debounceRendering) || r1)(g1);
}
function g1() {
    for(var n2; g1.__r = t1.length;)n2 = t1.sort(function(n, l) {
        return n.__v.__b - l.__v.__b;
    }), t1 = [], n2.some(function(n) {
        var l, u, i, t, r, o;
        n.__d && (r = (t = (l = n).__v).__e, (o = l.__P) && (u = [], (i = a1({
        }, t)).__v = t.__v + 1, j(o, t, i, l.__n, void 0 !== o.ownerSVGElement, null != t.__h ? [
            r
        ] : null, u, null == r ? k1(t) : r, t.__h), z(u, t), t.__e != r && b1(t)));
    });
}
function w1(n, l, u, i, t, r, o, f, s, a) {
    var h, v, p, _, b, m, g, w = i && i.__k || c1, A = w.length;
    for(u.__k = [], h = 0; h < l.length; h++)if (null != (_ = u.__k[h] = null == (_ = l[h]) || "boolean" == typeof _ ? null : "string" == typeof _ || "number" == typeof _ || "bigint" == typeof _ ? y1(null, _, null, null, _) : Array.isArray(_) ? y1(d1, {
        children: _
    }, null, null, null) : _.__b > 0 ? y1(_.type, _.props, _.key, null, _.__v) : _)) {
        if (_.__ = u, _.__b = u.__b + 1, null === (p = w[h]) || p && _.key == p.key && _.type === p.type) w[h] = void 0;
        else for(v = 0; v < A; v++){
            if ((p = w[v]) && _.key == p.key && _.type === p.type) {
                w[v] = void 0;
                break;
            }
            p = null;
        }
        j(n, _, p = p || e1, t, r, o, f, s, a), b = _.__e, (v = _.ref) && p.ref != v && (g || (g = []), p.ref && g.push(p.ref, null, _), g.push(v, _.__c || b, _)), null != b ? (null == m && (m = b), "function" == typeof _.type && _.__k === p.__k ? _.__d = s = x1(_, s, n) : s = P1(n, _, p, w, b, s), "function" == typeof u.type && (u.__d = s)) : s && p.__e == s && s.parentNode != n && (s = k1(p));
    }
    for(u.__e = m, h = A; h--;)null != w[h] && ("function" == typeof u.type && null != w[h].__e && w[h].__e == u.__d && (u.__d = k1(i, h + 1)), N(w[h], w[h]));
    if (g) for(h = 0; h < g.length; h++)M(g[h], g[++h], g[++h]);
}
function x1(n, l, u) {
    for(var i, t = n.__k, r = 0; t && r < t.length; r++)(i = t[r]) && (i.__ = n, l = "function" == typeof i.type ? x1(i, l, u) : P1(u, i, i, t, i.__e, l));
    return l;
}
function A1(n3, l) {
    return l = l || [], null == n3 || "boolean" == typeof n3 || (Array.isArray(n3) ? n3.some(function(n) {
        A1(n, l);
    }) : l.push(n3)), l;
}
function P1(n, l, u, i, t, r) {
    var o, f, e;
    if (void 0 !== l.__d) o = l.__d, l.__d = void 0;
    else if (null == u || t != r || null == t.parentNode) n: if (null == r || r.parentNode !== n) n.appendChild(t), o = null;
    else {
        for(f = r, e = 0; (f = f.nextSibling) && e < i.length; e += 2)if (f == t) break n;
        n.insertBefore(t, r), o = r;
    }
    return void 0 !== o ? o : t.nextSibling;
}
function C(n, l, u, i, t) {
    var r;
    for(r in u)"children" === r || "key" === r || r in l || H(n, r, null, u[r], i);
    for(r in l)t && "function" != typeof l[r] || "children" === r || "key" === r || "value" === r || "checked" === r || u[r] === l[r] || H(n, r, l[r], u[r], i);
}
function $(n, l, u) {
    "-" === l[0] ? n.setProperty(l, u) : n[l] = null == u ? "" : "number" != typeof u || s1.test(l) ? u : u + "px";
}
function H(n, l, u, i, t) {
    var r;
    n: if ("style" === l) {
        if ("string" == typeof u) n.style.cssText = u;
        else {
            if ("string" == typeof i && (n.style.cssText = i = ""), i) for(l in i)u && l in u || $(n.style, l, "");
            if (u) for(l in u)i && u[l] === i[l] || $(n.style, l, u[l]);
        }
    } else if ("o" === l[0] && "n" === l[1]) r = l !== (l = l.replace(/Capture$/, "")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {
    }), n.l[l + r] = u, u ? i || n.addEventListener(l, r ? T : I, r) : n.removeEventListener(l, r ? T : I, r);
    else if ("dangerouslySetInnerHTML" !== l) {
        if (t) l = l.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
        else if ("href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && l in n) try {
            n[l] = null == u ? "" : u;
            break n;
        } catch (n4) {
        }
        "function" == typeof u || (null != u && (!1 !== u || "a" === l[0] && "r" === l[1]) ? n.setAttribute(l, u) : n.removeAttribute(l));
    }
}
function I(n) {
    this.l[n.type + !1](l1.event ? l1.event(n) : n);
}
function T(n) {
    this.l[n.type + !0](l1.event ? l1.event(n) : n);
}
function j(n5, u, i, t, r, o, f, e, c) {
    var s, h, v, y, p, k, b, m, g, x, A, P = u.type;
    if (void 0 !== u.constructor) return null;
    null != i.__h && (c = i.__h, e = u.__e = i.__e, u.__h = null, o = [
        e
    ]), (s = l1.__b) && s(u);
    try {
        n: if ("function" == typeof P) {
            if (m = u.props, g = (s = P.contextType) && t[s.__c], x = s ? g ? g.props.value : s.__ : t, i.__c ? b = (h = u.__c = i.__c).__ = h.__E : ("prototype" in P && P.prototype.render ? u.__c = h = new P(m, x) : (u.__c = h = new _1(m, x), h.constructor = P, h.render = O), g && g.sub(h), h.props = m, h.state || (h.state = {
            }), h.context = x, h.__n = t, v = h.__d = !0, h.__h = []), null == h.__s && (h.__s = h.state), null != P.getDerivedStateFromProps && (h.__s == h.state && (h.__s = a1({
            }, h.__s)), a1(h.__s, P.getDerivedStateFromProps(m, h.__s))), y = h.props, p = h.state, v) null == P.getDerivedStateFromProps && null != h.componentWillMount && h.componentWillMount(), null != h.componentDidMount && h.__h.push(h.componentDidMount);
            else {
                if (null == P.getDerivedStateFromProps && m !== y && null != h.componentWillReceiveProps && h.componentWillReceiveProps(m, x), !h.__e && null != h.shouldComponentUpdate && !1 === h.shouldComponentUpdate(m, h.__s, x) || u.__v === i.__v) {
                    h.props = m, h.state = h.__s, u.__v !== i.__v && (h.__d = !1), h.__v = u, u.__e = i.__e, u.__k = i.__k, u.__k.forEach(function(n) {
                        n && (n.__ = u);
                    }), h.__h.length && f.push(h);
                    break n;
                }
                null != h.componentWillUpdate && h.componentWillUpdate(m, h.__s, x), null != h.componentDidUpdate && h.__h.push(function() {
                    h.componentDidUpdate(y, p, k);
                });
            }
            h.context = x, h.props = m, h.state = h.__s, (s = l1.__r) && s(u), h.__d = !1, h.__v = u, h.__P = n5, s = h.render(h.props, h.state, h.context), h.state = h.__s, null != h.getChildContext && (t = a1(a1({
            }, t), h.getChildContext())), v || null == h.getSnapshotBeforeUpdate || (k = h.getSnapshotBeforeUpdate(y, p)), A = null != s && s.type === d1 && null == s.key ? s.props.children : s, w1(n5, Array.isArray(A) ? A : [
                A
            ], u, i, t, r, o, f, e, c), h.base = u.__e, u.__h = null, h.__h.length && f.push(h), b && (h.__E = h.__ = null), h.__e = !1;
        } else null == o && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = L(i.__e, u, i, t, r, o, f, c);
        (s = l1.diffed) && s(u);
    } catch (n) {
        u.__v = null, (c || null != o) && (u.__e = e, u.__h = !!c, o[o.indexOf(e)] = null), l1.__e(n, u, i);
    }
}
function z(n6, u2) {
    l1.__c && l1.__c(u2, n6), n6.some(function(u) {
        try {
            n6 = u.__h, u.__h = [], n6.some(function(n) {
                n.call(u);
            });
        } catch (n) {
            l1.__e(n, u.__v);
        }
    });
}
function L(l, u, i, t, r, o, f, c) {
    var s, a, v, y = i.props, p = u.props, d = u.type, _ = 0;
    if ("svg" === d && (r = !0), null != o) {
        for(; _ < o.length; _++)if ((s = o[_]) && "setAttribute" in s == !!d && (d ? s.localName === d : 3 === s.nodeType)) {
            l = s, o[_] = null;
            break;
        }
    }
    if (null == l) {
        if (null === d) return document.createTextNode(p);
        l = r ? document.createElementNS("http://www.w3.org/2000/svg", d) : document.createElement(d, p.is && p), o = null, c = !1;
    }
    if (null === d) y === p || c && l.data === p || (l.data = p);
    else {
        if (o = o && n1.call(l.childNodes), a = (y = i.props || e1).dangerouslySetInnerHTML, v = p.dangerouslySetInnerHTML, !c) {
            if (null != o) for(y = {
            }, _ = 0; _ < l.attributes.length; _++)y[l.attributes[_].name] = l.attributes[_].value;
            (v || a) && (v && (a && v.__html == a.__html || v.__html === l.innerHTML) || (l.innerHTML = v && v.__html || ""));
        }
        if (C(l, p, y, r, c), v) u.__k = [];
        else if (_ = u.props.children, w1(l, Array.isArray(_) ? _ : [
            _
        ], u, i, t, r && "foreignObject" !== d, o, f, o ? o[0] : i.__k && k1(i, 0), c), null != o) for(_ = o.length; _--;)null != o[_] && h1(o[_]);
        c || ("value" in p && void 0 !== (_ = p.value) && (_ !== y.value || _ !== l.value || "progress" === d && !_) && H(l, "value", _, y.value, !1), "checked" in p && void 0 !== (_ = p.checked) && _ !== l.checked && H(l, "checked", _, y.checked, !1));
    }
    return l;
}
function M(n, u, i) {
    try {
        "function" == typeof n ? n(u) : n.current = u;
    } catch (n7) {
        l1.__e(n7, i);
    }
}
function N(n, u, i) {
    var t, r;
    if (l1.unmount && l1.unmount(n), (t = n.ref) && (t.current && t.current !== n.__e || M(t, null, u)), null != (t = n.__c)) {
        if (t.componentWillUnmount) try {
            t.componentWillUnmount();
        } catch (n) {
            l1.__e(n, u);
        }
        t.base = t.__P = null;
    }
    if (t = n.__k) for(r = 0; r < t.length; r++)t[r] && N(t[r], u, "function" != typeof n.type);
    i || null == n.__e || h1(n.__e), n.__e = n.__d = void 0;
}
function O(n, l, u) {
    return this.constructor(n, u);
}
function S(u, i, t) {
    var r, o, f;
    l1.__ && l1.__(u, i), o = (r = "function" == typeof t) ? null : t && t.__k || i.__k, f = [], j(i, u = (!r && t || i).__k = v1(d1, null, [
        u
    ]), o || e1, e1, void 0 !== i.ownerSVGElement, !r && t ? [
        t
    ] : o ? null : i.firstChild ? n1.call(i.childNodes) : null, f, !r && t ? t : o ? o.__e : i.firstChild, r), z(f, u);
}
function q(n, l) {
    S(n, l, q);
}
function B(l, u, i) {
    var t, r, o, f = a1({
    }, l.props);
    for(o in u)"key" == o ? t = u[o] : "ref" == o ? r = u[o] : f[o] = u[o];
    return arguments.length > 2 && (f.children = arguments.length > 3 ? n1.call(arguments, 2) : i), y1(l.type, f, t || l.key, r || l.ref, null);
}
function D(n8, l2) {
    var u3 = {
        __c: l2 = "__cC" + f1++,
        __: n8,
        Consumer: function(n, l) {
            return n.children(l);
        },
        Provider: function(n9) {
            var u, i;
            return this.getChildContext || (u = [], (i = {
            })[l2] = this, this.getChildContext = function() {
                return i;
            }, this.shouldComponentUpdate = function(n) {
                this.props.value !== n.value && u.some(m1);
            }, this.sub = function(n) {
                u.push(n);
                var l = n.componentWillUnmount;
                n.componentWillUnmount = function() {
                    u.splice(u.indexOf(n), 1), l && l.call(n);
                };
            }), n9.children;
        }
    };
    return u3.Provider.__ = u3.Consumer.contextType = u3;
}
n1 = c1.slice, l1 = {
    __e: function(n, l) {
        for(var u, i, t; l = l.__;)if ((u = l.__c) && !u.__) try {
            if ((i = u.constructor) && null != i.getDerivedStateFromError && (u.setState(i.getDerivedStateFromError(n)), t = u.__d), null != u.componentDidCatch && (u.componentDidCatch(n), t = u.__d), t) return u.__E = u;
        } catch (l3) {
            n = l3;
        }
        throw n;
    }
}, u1 = 0, i1 = function(n) {
    return null != n && void 0 === n.constructor;
}, _1.prototype.setState = function(n, l) {
    var u;
    u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = a1({
    }, this.state), "function" == typeof n && (n = n(a1({
    }, u), this.props)), n && a1(u, n), null != n && this.__v && (l && this.__h.push(l), m1(this));
}, _1.prototype.forceUpdate = function(n) {
    this.__v && (this.__e = !0, n && this.__h.push(n), m1(this));
}, _1.prototype.render = d1, t1 = [], r1 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, g1.__r = 0, f1 = 0;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ciiiV":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"fr9w2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Fragment", ()=>_preact.Fragment
);
parcelHelpers.export(exports, "jsx", ()=>e1
);
parcelHelpers.export(exports, "jsxs", ()=>e1
);
parcelHelpers.export(exports, "jsxDEV", ()=>e1
);
var _preact = require("preact");
var o = 0;
function e1(_, e, n, t, f) {
    var l, s, u = {
    };
    for(s in e)"ref" == s ? l = e[s] : u[s] = e[s];
    var a = {
        type: _,
        props: u,
        key: n,
        ref: l,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: --o,
        __source: t,
        __self: f
    };
    if ("function" == typeof _ && (l = _.defaultProps)) for(s in l)void 0 === u[s] && (u[s] = l[s]);
    return _preact.options.vnode && _preact.options.vnode(a), a;
}

},{"preact":"2ETNS","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}]},["axq7v","2F9Y8"], "2F9Y8", "parcelRequire94c2")

//# sourceMappingURL=index.d102a750.js.map
