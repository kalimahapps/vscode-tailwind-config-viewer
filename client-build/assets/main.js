function ts(t, e) {
  const n = /* @__PURE__ */ Object.create(null), r = t.split(",");
  for (let s = 0; s < r.length; s++)
    n[r[s]] = !0;
  return e ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
function Hn(t) {
  if (U(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], s = ce(r) ? Da(r) : Hn(r);
      if (s)
        for (const i in s)
          e[i] = s[i];
    }
    return e;
  } else {
    if (ce(t))
      return t;
    if (K(t))
      return t;
  }
}
const xa = /;(?![^(]*\))/g, Pa = /:([^]+)/, Oa = /\/\*.*?\*\//gs;
function Da(t) {
  const e = {};
  return t.replace(Oa, "").split(xa).forEach((n) => {
    if (n) {
      const r = n.split(Pa);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
function ns(t) {
  let e = "";
  if (ce(t))
    e = t;
  else if (U(t))
    for (let n = 0; n < t.length; n++) {
      const r = ns(t[n]);
      r && (e += r + " ");
    }
  else if (K(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const Ra = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Ta = /* @__PURE__ */ ts(Ra);
function Bi(t) {
  return !!t || t === "";
}
const Ui = (t) => ce(t) ? t : t == null ? "" : U(t) || K(t) && (t.toString === Hi || !j(t.toString)) ? JSON.stringify(t, Vi, 2) : String(t), Vi = (t, e) => e && e.__v_isRef ? Vi(t, e.value) : Rt(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce((n, [r, s]) => (n[`${r} =>`] = s, n), {})
} : ji(e) ? {
  [`Set(${e.size})`]: [...e.values()]
} : K(e) && !U(e) && !zi(e) ? String(e) : e, Z = {}, Dt = [], Le = () => {
}, Ia = () => !1, Ma = /^on[^a-z]/, zn = (t) => Ma.test(t), rs = (t) => t.startsWith("onUpdate:"), be = Object.assign, ss = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, Na = Object.prototype.hasOwnProperty, z = (t, e) => Na.call(t, e), U = Array.isArray, Rt = (t) => qn(t) === "[object Map]", ji = (t) => qn(t) === "[object Set]", j = (t) => typeof t == "function", ce = (t) => typeof t == "string", is = (t) => typeof t == "symbol", K = (t) => t !== null && typeof t == "object", Wi = (t) => K(t) && j(t.then) && j(t.catch), Hi = Object.prototype.toString, qn = (t) => Hi.call(t), $a = (t) => qn(t).slice(8, -1), zi = (t) => qn(t) === "[object Object]", os = (t) => ce(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Dn = /* @__PURE__ */ ts(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Gn = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, ka = /-(\w)/g, Ge = Gn((t) => t.replace(ka, (e, n) => n ? n.toUpperCase() : "")), Fa = /\B([A-Z])/g, Lt = Gn((t) => t.replace(Fa, "-$1").toLowerCase()), Jn = Gn((t) => t.charAt(0).toUpperCase() + t.slice(1)), lr = Gn((t) => t ? `on${Jn(t)}` : ""), an = (t, e) => !Object.is(t, e), cr = (t, e) => {
  for (let n = 0; n < t.length; n++)
    t[n](e);
}, $n = (t, e, n) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, La = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
};
let Fs;
const Ba = () => Fs || (Fs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
let $e;
class Ua {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this.parent = $e, !e && $e && (this.index = ($e.scopes || ($e.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(e) {
    if (this._active) {
      const n = $e;
      try {
        return $e = this, e();
      } finally {
        $e = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    $e = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    $e = this.parent;
  }
  stop(e) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++)
        this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !e) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Va(t, e = $e) {
  e && e.active && e.effects.push(t);
}
function ja() {
  return $e;
}
const as = (t) => {
  const e = new Set(t);
  return e.w = 0, e.n = 0, e;
}, qi = (t) => (t.w & lt) > 0, Gi = (t) => (t.n & lt) > 0, Wa = ({ deps: t }) => {
  if (t.length)
    for (let e = 0; e < t.length; e++)
      t[e].w |= lt;
}, Ha = (t) => {
  const { deps: e } = t;
  if (e.length) {
    let n = 0;
    for (let r = 0; r < e.length; r++) {
      const s = e[r];
      qi(s) && !Gi(s) ? s.delete(t) : e[n++] = s, s.w &= ~lt, s.n &= ~lt;
    }
    e.length = n;
  }
}, kn = /* @__PURE__ */ new WeakMap();
let Kt = 0, lt = 1;
const $r = 30;
let ke;
const wt = Symbol(""), kr = Symbol("");
class ls {
  constructor(e, n = null, r) {
    this.fn = e, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Va(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let e = ke, n = ot;
    for (; e; ) {
      if (e === this)
        return;
      e = e.parent;
    }
    try {
      return this.parent = ke, ke = this, ot = !0, lt = 1 << ++Kt, Kt <= $r ? Wa(this) : Ls(this), this.fn();
    } finally {
      Kt <= $r && Ha(this), lt = 1 << --Kt, ke = this.parent, ot = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    ke === this ? this.deferStop = !0 : this.active && (Ls(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Ls(t) {
  const { deps: e } = t;
  if (e.length) {
    for (let n = 0; n < e.length; n++)
      e[n].delete(t);
    e.length = 0;
  }
}
let ot = !0;
const Ji = [];
function Bt() {
  Ji.push(ot), ot = !1;
}
function Ut() {
  const t = Ji.pop();
  ot = t === void 0 ? !0 : t;
}
function Se(t, e, n) {
  if (ot && ke) {
    let r = kn.get(t);
    r || kn.set(t, r = /* @__PURE__ */ new Map());
    let s = r.get(n);
    s || r.set(n, s = as()), Xi(s);
  }
}
function Xi(t, e) {
  let n = !1;
  Kt <= $r ? Gi(t) || (t.n |= lt, n = !qi(t)) : n = !t.has(ke), n && (t.add(ke), ke.deps.push(t));
}
function tt(t, e, n, r, s, i) {
  const o = kn.get(t);
  if (!o)
    return;
  let a = [];
  if (e === "clear")
    a = [...o.values()];
  else if (n === "length" && U(t)) {
    const l = Number(r);
    o.forEach((c, f) => {
      (f === "length" || f >= l) && a.push(c);
    });
  } else
    switch (n !== void 0 && a.push(o.get(n)), e) {
      case "add":
        U(t) ? os(n) && a.push(o.get("length")) : (a.push(o.get(wt)), Rt(t) && a.push(o.get(kr)));
        break;
      case "delete":
        U(t) || (a.push(o.get(wt)), Rt(t) && a.push(o.get(kr)));
        break;
      case "set":
        Rt(t) && a.push(o.get(wt));
        break;
    }
  if (a.length === 1)
    a[0] && Fr(a[0]);
  else {
    const l = [];
    for (const c of a)
      c && l.push(...c);
    Fr(as(l));
  }
}
function Fr(t, e) {
  const n = U(t) ? t : [...t];
  for (const r of n)
    r.computed && Bs(r);
  for (const r of n)
    r.computed || Bs(r);
}
function Bs(t, e) {
  (t !== ke || t.allowRecurse) && (t.scheduler ? t.scheduler() : t.run());
}
function za(t, e) {
  var n;
  return (n = kn.get(t)) === null || n === void 0 ? void 0 : n.get(e);
}
const qa = /* @__PURE__ */ ts("__proto__,__v_isRef,__isVue"), Yi = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(is)
), Ga = /* @__PURE__ */ cs(), Ja = /* @__PURE__ */ cs(!1, !0), Xa = /* @__PURE__ */ cs(!0), Us = /* @__PURE__ */ Ya();
function Ya() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...n) {
      const r = q(this);
      for (let i = 0, o = this.length; i < o; i++)
        Se(r, "get", i + "");
      const s = r[e](...n);
      return s === -1 || s === !1 ? r[e](...n.map(q)) : s;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...n) {
      Bt();
      const r = q(this)[e].apply(this, n);
      return Ut(), r;
    };
  }), t;
}
function Qa(t) {
  const e = q(this);
  return Se(e, "has", t), e.hasOwnProperty(t);
}
function cs(t = !1, e = !1) {
  return function(r, s, i) {
    if (s === "__v_isReactive")
      return !t;
    if (s === "__v_isReadonly")
      return t;
    if (s === "__v_isShallow")
      return e;
    if (s === "__v_raw" && i === (t ? e ? hl : to : e ? eo : Ki).get(r))
      return r;
    const o = U(r);
    if (!t) {
      if (o && z(Us, s))
        return Reflect.get(Us, s, i);
      if (s === "hasOwnProperty")
        return Qa;
    }
    const a = Reflect.get(r, s, i);
    return (is(s) ? Yi.has(s) : qa(s)) || (t || Se(r, "get", s), e) ? a : he(a) ? o && os(s) ? a : a.value : K(a) ? t ? no(a) : ds(a) : a;
  };
}
const Za = /* @__PURE__ */ Qi(), Ka = /* @__PURE__ */ Qi(!0);
function Qi(t = !1) {
  return function(n, r, s, i) {
    let o = n[r];
    if ($t(o) && he(o) && !he(s))
      return !1;
    if (!t && (!Fn(s) && !$t(s) && (o = q(o), s = q(s)), !U(n) && he(o) && !he(s)))
      return o.value = s, !0;
    const a = U(n) && os(r) ? Number(r) < n.length : z(n, r), l = Reflect.set(n, r, s, i);
    return n === q(i) && (a ? an(s, o) && tt(n, "set", r, s) : tt(n, "add", r, s)), l;
  };
}
function el(t, e) {
  const n = z(t, e);
  t[e];
  const r = Reflect.deleteProperty(t, e);
  return r && n && tt(t, "delete", e, void 0), r;
}
function tl(t, e) {
  const n = Reflect.has(t, e);
  return (!is(e) || !Yi.has(e)) && Se(t, "has", e), n;
}
function nl(t) {
  return Se(t, "iterate", U(t) ? "length" : wt), Reflect.ownKeys(t);
}
const Zi = {
  get: Ga,
  set: Za,
  deleteProperty: el,
  has: tl,
  ownKeys: nl
}, rl = {
  get: Xa,
  set(t, e) {
    return !0;
  },
  deleteProperty(t, e) {
    return !0;
  }
}, sl = /* @__PURE__ */ be({}, Zi, {
  get: Ja,
  set: Ka
}), us = (t) => t, Xn = (t) => Reflect.getPrototypeOf(t);
function _n(t, e, n = !1, r = !1) {
  t = t.__v_raw;
  const s = q(t), i = q(e);
  n || (e !== i && Se(s, "get", e), Se(s, "get", i));
  const { has: o } = Xn(s), a = r ? us : n ? ps : ln;
  if (o.call(s, e))
    return a(t.get(e));
  if (o.call(s, i))
    return a(t.get(i));
  t !== s && t.get(e);
}
function yn(t, e = !1) {
  const n = this.__v_raw, r = q(n), s = q(t);
  return e || (t !== s && Se(r, "has", t), Se(r, "has", s)), t === s ? n.has(t) : n.has(t) || n.has(s);
}
function Cn(t, e = !1) {
  return t = t.__v_raw, !e && Se(q(t), "iterate", wt), Reflect.get(t, "size", t);
}
function Vs(t) {
  t = q(t);
  const e = q(this);
  return Xn(e).has.call(e, t) || (e.add(t), tt(e, "add", t, t)), this;
}
function js(t, e) {
  e = q(e);
  const n = q(this), { has: r, get: s } = Xn(n);
  let i = r.call(n, t);
  i || (t = q(t), i = r.call(n, t));
  const o = s.call(n, t);
  return n.set(t, e), i ? an(e, o) && tt(n, "set", t, e) : tt(n, "add", t, e), this;
}
function Ws(t) {
  const e = q(this), { has: n, get: r } = Xn(e);
  let s = n.call(e, t);
  s || (t = q(t), s = n.call(e, t)), r && r.call(e, t);
  const i = e.delete(t);
  return s && tt(e, "delete", t, void 0), i;
}
function Hs() {
  const t = q(this), e = t.size !== 0, n = t.clear();
  return e && tt(t, "clear", void 0, void 0), n;
}
function wn(t, e) {
  return function(r, s) {
    const i = this, o = i.__v_raw, a = q(o), l = e ? us : t ? ps : ln;
    return !t && Se(a, "iterate", wt), o.forEach((c, f) => r.call(s, l(c), l(f), i));
  };
}
function Sn(t, e, n) {
  return function(...r) {
    const s = this.__v_raw, i = q(s), o = Rt(i), a = t === "entries" || t === Symbol.iterator && o, l = t === "keys" && o, c = s[t](...r), f = n ? us : e ? ps : ln;
    return !e && Se(i, "iterate", l ? kr : wt), {
      // iterator protocol
      next() {
        const { value: h, done: p } = c.next();
        return p ? { value: h, done: p } : {
          value: a ? [f(h[0]), f(h[1])] : f(h),
          done: p
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function rt(t) {
  return function(...e) {
    return t === "delete" ? !1 : this;
  };
}
function il() {
  const t = {
    get(i) {
      return _n(this, i);
    },
    get size() {
      return Cn(this);
    },
    has: yn,
    add: Vs,
    set: js,
    delete: Ws,
    clear: Hs,
    forEach: wn(!1, !1)
  }, e = {
    get(i) {
      return _n(this, i, !1, !0);
    },
    get size() {
      return Cn(this);
    },
    has: yn,
    add: Vs,
    set: js,
    delete: Ws,
    clear: Hs,
    forEach: wn(!1, !0)
  }, n = {
    get(i) {
      return _n(this, i, !0);
    },
    get size() {
      return Cn(this, !0);
    },
    has(i) {
      return yn.call(this, i, !0);
    },
    add: rt(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: rt(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: rt(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: rt(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: wn(!0, !1)
  }, r = {
    get(i) {
      return _n(this, i, !0, !0);
    },
    get size() {
      return Cn(this, !0);
    },
    has(i) {
      return yn.call(this, i, !0);
    },
    add: rt(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: rt(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: rt(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: rt(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: wn(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    t[i] = Sn(i, !1, !1), n[i] = Sn(i, !0, !1), e[i] = Sn(i, !1, !0), r[i] = Sn(i, !0, !0);
  }), [
    t,
    n,
    e,
    r
  ];
}
const [ol, al, ll, cl] = /* @__PURE__ */ il();
function fs(t, e) {
  const n = e ? t ? cl : ll : t ? al : ol;
  return (r, s, i) => s === "__v_isReactive" ? !t : s === "__v_isReadonly" ? t : s === "__v_raw" ? r : Reflect.get(z(n, s) && s in r ? n : r, s, i);
}
const ul = {
  get: /* @__PURE__ */ fs(!1, !1)
}, fl = {
  get: /* @__PURE__ */ fs(!1, !0)
}, dl = {
  get: /* @__PURE__ */ fs(!0, !1)
}, Ki = /* @__PURE__ */ new WeakMap(), eo = /* @__PURE__ */ new WeakMap(), to = /* @__PURE__ */ new WeakMap(), hl = /* @__PURE__ */ new WeakMap();
function pl(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function gl(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : pl($a(t));
}
function ds(t) {
  return $t(t) ? t : hs(t, !1, Zi, ul, Ki);
}
function ml(t) {
  return hs(t, !1, sl, fl, eo);
}
function no(t) {
  return hs(t, !0, rl, dl, to);
}
function hs(t, e, n, r, s) {
  if (!K(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const i = s.get(t);
  if (i)
    return i;
  const o = gl(t);
  if (o === 0)
    return t;
  const a = new Proxy(t, o === 2 ? r : n);
  return s.set(t, a), a;
}
function Tt(t) {
  return $t(t) ? Tt(t.__v_raw) : !!(t && t.__v_isReactive);
}
function $t(t) {
  return !!(t && t.__v_isReadonly);
}
function Fn(t) {
  return !!(t && t.__v_isShallow);
}
function ro(t) {
  return Tt(t) || $t(t);
}
function q(t) {
  const e = t && t.__v_raw;
  return e ? q(e) : t;
}
function so(t) {
  return $n(t, "__v_skip", !0), t;
}
const ln = (t) => K(t) ? ds(t) : t, ps = (t) => K(t) ? no(t) : t;
function io(t) {
  ot && ke && (t = q(t), Xi(t.dep || (t.dep = as())));
}
function oo(t, e) {
  t = q(t);
  const n = t.dep;
  n && Fr(n);
}
function he(t) {
  return !!(t && t.__v_isRef === !0);
}
function Ln(t) {
  return bl(t, !1);
}
function bl(t, e) {
  return he(t) ? t : new vl(t, e);
}
class vl {
  constructor(e, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? e : q(e), this._value = n ? e : ln(e);
  }
  get value() {
    return io(this), this._value;
  }
  set value(e) {
    const n = this.__v_isShallow || Fn(e) || $t(e);
    e = n ? e : q(e), an(e, this._rawValue) && (this._rawValue = e, this._value = n ? e : ln(e), oo(this));
  }
}
function bt(t) {
  return he(t) ? t.value : t;
}
const _l = {
  get: (t, e, n) => bt(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const s = t[e];
    return he(s) && !he(n) ? (s.value = n, !0) : Reflect.set(t, e, n, r);
  }
};
function ao(t) {
  return Tt(t) ? t : new Proxy(t, _l);
}
class yl {
  constructor(e, n, r) {
    this._object = e, this._key = n, this._defaultValue = r, this.__v_isRef = !0;
  }
  get value() {
    const e = this._object[this._key];
    return e === void 0 ? this._defaultValue : e;
  }
  set value(e) {
    this._object[this._key] = e;
  }
  get dep() {
    return za(q(this._object), this._key);
  }
}
function Cl(t, e, n) {
  const r = t[e];
  return he(r) ? r : new yl(t, e, n);
}
var lo;
class wl {
  constructor(e, n, r, s) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this[lo] = !1, this._dirty = !0, this.effect = new ls(e, () => {
      this._dirty || (this._dirty = !0, oo(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = r;
  }
  get value() {
    const e = q(this);
    return io(e), (e._dirty || !e._cacheable) && (e._dirty = !1, e._value = e.effect.run()), e._value;
  }
  set value(e) {
    this._setter(e);
  }
}
lo = "__v_isReadonly";
function Sl(t, e, n = !1) {
  let r, s;
  const i = j(t);
  return i ? (r = t, s = Le) : (r = t.get, s = t.set), new wl(r, s, i || !s, n);
}
function at(t, e, n, r) {
  let s;
  try {
    s = r ? t(...r) : t();
  } catch (i) {
    Yn(i, e, n);
  }
  return s;
}
function Ie(t, e, n, r) {
  if (j(t)) {
    const i = at(t, e, n, r);
    return i && Wi(i) && i.catch((o) => {
      Yn(o, e, n);
    }), i;
  }
  const s = [];
  for (let i = 0; i < t.length; i++)
    s.push(Ie(t[i], e, n, r));
  return s;
}
function Yn(t, e, n, r = !0) {
  const s = e ? e.vnode : null;
  if (e) {
    let i = e.parent;
    const o = e.proxy, a = n;
    for (; i; ) {
      const c = i.ec;
      if (c) {
        for (let f = 0; f < c.length; f++)
          if (c[f](t, o, a) === !1)
            return;
      }
      i = i.parent;
    }
    const l = e.appContext.config.errorHandler;
    if (l) {
      at(l, null, 10, [t, o, a]);
      return;
    }
  }
  Al(t, n, s, r);
}
function Al(t, e, n, r = !0) {
  console.error(t);
}
let cn = !1, Lr = !1;
const me = [];
let qe = 0;
const It = [];
let Qe = null, _t = 0;
const co = /* @__PURE__ */ Promise.resolve();
let gs = null;
function El(t) {
  const e = gs || co;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function xl(t) {
  let e = qe + 1, n = me.length;
  for (; e < n; ) {
    const r = e + n >>> 1;
    un(me[r]) < t ? e = r + 1 : n = r;
  }
  return e;
}
function ms(t) {
  (!me.length || !me.includes(t, cn && t.allowRecurse ? qe + 1 : qe)) && (t.id == null ? me.push(t) : me.splice(xl(t.id), 0, t), uo());
}
function uo() {
  !cn && !Lr && (Lr = !0, gs = co.then(ho));
}
function Pl(t) {
  const e = me.indexOf(t);
  e > qe && me.splice(e, 1);
}
function Ol(t) {
  U(t) ? It.push(...t) : (!Qe || !Qe.includes(t, t.allowRecurse ? _t + 1 : _t)) && It.push(t), uo();
}
function zs(t, e = cn ? qe + 1 : 0) {
  for (; e < me.length; e++) {
    const n = me[e];
    n && n.pre && (me.splice(e, 1), e--, n());
  }
}
function fo(t) {
  if (It.length) {
    const e = [...new Set(It)];
    if (It.length = 0, Qe) {
      Qe.push(...e);
      return;
    }
    for (Qe = e, Qe.sort((n, r) => un(n) - un(r)), _t = 0; _t < Qe.length; _t++)
      Qe[_t]();
    Qe = null, _t = 0;
  }
}
const un = (t) => t.id == null ? 1 / 0 : t.id, Dl = (t, e) => {
  const n = un(t) - un(e);
  if (n === 0) {
    if (t.pre && !e.pre)
      return -1;
    if (e.pre && !t.pre)
      return 1;
  }
  return n;
};
function ho(t) {
  Lr = !1, cn = !0, me.sort(Dl);
  const e = Le;
  try {
    for (qe = 0; qe < me.length; qe++) {
      const n = me[qe];
      n && n.active !== !1 && at(
        n,
        null,
        14
        /* ErrorCodes.SCHEDULER */
      );
    }
  } finally {
    qe = 0, me.length = 0, fo(), cn = !1, gs = null, (me.length || It.length) && ho();
  }
}
function Rl(t, e, ...n) {
  if (t.isUnmounted)
    return;
  const r = t.vnode.props || Z;
  let s = n;
  const i = e.startsWith("update:"), o = i && e.slice(7);
  if (o && o in r) {
    const f = `${o === "modelValue" ? "model" : o}Modifiers`, { number: h, trim: p } = r[f] || Z;
    p && (s = n.map((m) => ce(m) ? m.trim() : m)), h && (s = n.map(La));
  }
  let a, l = r[a = lr(e)] || // also try camelCase event handler (#2249)
  r[a = lr(Ge(e))];
  !l && i && (l = r[a = lr(Lt(e))]), l && Ie(l, t, 6, s);
  const c = r[a + "Once"];
  if (c) {
    if (!t.emitted)
      t.emitted = {};
    else if (t.emitted[a])
      return;
    t.emitted[a] = !0, Ie(c, t, 6, s);
  }
}
function po(t, e, n = !1) {
  const r = e.emitsCache, s = r.get(t);
  if (s !== void 0)
    return s;
  const i = t.emits;
  let o = {}, a = !1;
  if (!j(t)) {
    const l = (c) => {
      const f = po(c, e, !0);
      f && (a = !0, be(o, f));
    };
    !n && e.mixins.length && e.mixins.forEach(l), t.extends && l(t.extends), t.mixins && t.mixins.forEach(l);
  }
  return !i && !a ? (K(t) && r.set(t, null), null) : (U(i) ? i.forEach((l) => o[l] = null) : be(o, i), K(t) && r.set(t, o), o);
}
function Qn(t, e) {
  return !t || !zn(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), z(t, e[0].toLowerCase() + e.slice(1)) || z(t, Lt(e)) || z(t, e));
}
let Te = null, go = null;
function Bn(t) {
  const e = Te;
  return Te = t, go = t && t.type.__scopeId || null, e;
}
function mo(t, e = Te, n) {
  if (!e || t._n)
    return t;
  const r = (...s) => {
    r._d && ni(-1);
    const i = Bn(e);
    let o;
    try {
      o = t(...s);
    } finally {
      Bn(i), r._d && ni(1);
    }
    return o;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function ur(t) {
  const { type: e, vnode: n, proxy: r, withProxy: s, props: i, propsOptions: [o], slots: a, attrs: l, emit: c, render: f, renderCache: h, data: p, setupState: m, ctx: b, inheritAttrs: C } = t;
  let D, w;
  const G = Bn(t);
  try {
    if (n.shapeFlag & 4) {
      const k = s || r;
      D = ze(f.call(k, k, h, i, m, p, b)), w = l;
    } else {
      const k = e;
      D = ze(k.length > 1 ? k(i, { attrs: l, slots: a, emit: c }) : k(
        i,
        null
        /* we know it doesn't need it */
      )), w = e.props ? l : Tl(l);
    }
  } catch (k) {
    tn.length = 0, Yn(
      k,
      t,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    ), D = pe(Be);
  }
  let R = D;
  if (w && C !== !1) {
    const k = Object.keys(w), { shapeFlag: ue } = R;
    k.length && ue & 7 && (o && k.some(rs) && (w = Il(w, o)), R = ct(R, w));
  }
  return n.dirs && (R = ct(R), R.dirs = R.dirs ? R.dirs.concat(n.dirs) : n.dirs), n.transition && (R.transition = n.transition), D = R, Bn(G), D;
}
const Tl = (t) => {
  let e;
  for (const n in t)
    (n === "class" || n === "style" || zn(n)) && ((e || (e = {}))[n] = t[n]);
  return e;
}, Il = (t, e) => {
  const n = {};
  for (const r in t)
    (!rs(r) || !(r.slice(9) in e)) && (n[r] = t[r]);
  return n;
};
function Ml(t, e, n) {
  const { props: r, children: s, component: i } = t, { props: o, children: a, patchFlag: l } = e, c = i.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (n && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return r ? qs(r, o, c) : !!o;
    if (l & 8) {
      const f = e.dynamicProps;
      for (let h = 0; h < f.length; h++) {
        const p = f[h];
        if (o[p] !== r[p] && !Qn(c, p))
          return !0;
      }
    }
  } else
    return (s || a) && (!a || !a.$stable) ? !0 : r === o ? !1 : r ? o ? qs(r, o, c) : !0 : !!o;
  return !1;
}
function qs(t, e, n) {
  const r = Object.keys(e);
  if (r.length !== Object.keys(t).length)
    return !0;
  for (let s = 0; s < r.length; s++) {
    const i = r[s];
    if (e[i] !== t[i] && !Qn(n, i))
      return !0;
  }
  return !1;
}
function Nl({ vnode: t, parent: e }, n) {
  for (; e && e.subTree === t; )
    (t = e.vnode).el = n, e = e.parent;
}
const $l = (t) => t.__isSuspense;
function kl(t, e) {
  e && e.pendingBranch ? U(t) ? e.effects.push(...t) : e.effects.push(t) : Ol(t);
}
function Fl(t, e) {
  if (oe) {
    let n = oe.provides;
    const r = oe.parent && oe.parent.provides;
    r === n && (n = oe.provides = Object.create(r)), n[t] = e;
  }
}
function Rn(t, e, n = !1) {
  const r = oe || Te;
  if (r) {
    const s = r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides;
    if (s && t in s)
      return s[t];
    if (arguments.length > 1)
      return n && j(e) ? e.call(r.proxy) : e;
  }
}
const An = {};
function fr(t, e, n) {
  return bo(t, e, n);
}
function bo(t, e, { immediate: n, deep: r, flush: s, onTrack: i, onTrigger: o } = Z) {
  const a = ja() === oe?.scope ? oe : null;
  let l, c = !1, f = !1;
  if (he(t) ? (l = () => t.value, c = Fn(t)) : Tt(t) ? (l = () => t, r = !0) : U(t) ? (f = !0, c = t.some((R) => Tt(R) || Fn(R)), l = () => t.map((R) => {
    if (he(R))
      return R.value;
    if (Tt(R))
      return Pt(R);
    if (j(R))
      return at(
        R,
        a,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
  })) : j(t) ? e ? l = () => at(
    t,
    a,
    2
    /* ErrorCodes.WATCH_GETTER */
  ) : l = () => {
    if (!(a && a.isUnmounted))
      return h && h(), Ie(t, a, 3, [p]);
  } : l = Le, e && r) {
    const R = l;
    l = () => Pt(R());
  }
  let h, p = (R) => {
    h = w.onStop = () => {
      at(
        R,
        a,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  }, m;
  if (dn)
    if (p = Le, e ? n && Ie(e, a, 3, [
      l(),
      f ? [] : void 0,
      p
    ]) : l(), s === "sync") {
      const R = Nc();
      m = R.__watcherHandles || (R.__watcherHandles = []);
    } else
      return Le;
  let b = f ? new Array(t.length).fill(An) : An;
  const C = () => {
    if (w.active)
      if (e) {
        const R = w.run();
        (r || c || (f ? R.some((k, ue) => an(k, b[ue])) : an(R, b))) && (h && h(), Ie(e, a, 3, [
          R,
          // pass undefined as the old value when it's changed for the first time
          b === An ? void 0 : f && b[0] === An ? [] : b,
          p
        ]), b = R);
      } else
        w.run();
  };
  C.allowRecurse = !!e;
  let D;
  s === "sync" ? D = C : s === "post" ? D = () => Ce(C, a && a.suspense) : (C.pre = !0, a && (C.id = a.uid), D = () => ms(C));
  const w = new ls(l, D);
  e ? n ? C() : b = w.run() : s === "post" ? Ce(w.run.bind(w), a && a.suspense) : w.run();
  const G = () => {
    w.stop(), a && a.scope && ss(a.scope.effects, w);
  };
  return m && m.push(G), G;
}
function Ll(t, e, n) {
  const r = this.proxy, s = ce(t) ? t.includes(".") ? vo(r, t) : () => r[t] : t.bind(r, r);
  let i;
  j(e) ? i = e : (i = e.handler, n = e);
  const o = oe;
  kt(this);
  const a = bo(s, i.bind(r), n);
  return o ? kt(o) : St(), a;
}
function vo(t, e) {
  const n = e.split(".");
  return () => {
    let r = t;
    for (let s = 0; s < n.length && r; s++)
      r = r[n[s]];
    return r;
  };
}
function Pt(t, e) {
  if (!K(t) || t.__v_skip || (e = e || /* @__PURE__ */ new Set(), e.has(t)))
    return t;
  if (e.add(t), he(t))
    Pt(t.value, e);
  else if (U(t))
    for (let n = 0; n < t.length; n++)
      Pt(t[n], e);
  else if (ji(t) || Rt(t))
    t.forEach((n) => {
      Pt(n, e);
    });
  else if (zi(t))
    for (const n in t)
      Pt(t[n], e);
  return t;
}
function Bl() {
  const t = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return So(() => {
    t.isMounted = !0;
  }), Ao(() => {
    t.isUnmounting = !0;
  }), t;
}
const Oe = [Function, Array], Ul = {
  name: "BaseTransition",
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: Oe,
    onEnter: Oe,
    onAfterEnter: Oe,
    onEnterCancelled: Oe,
    // leave
    onBeforeLeave: Oe,
    onLeave: Oe,
    onAfterLeave: Oe,
    onLeaveCancelled: Oe,
    // appear
    onBeforeAppear: Oe,
    onAppear: Oe,
    onAfterAppear: Oe,
    onAppearCancelled: Oe
  },
  setup(t, { slots: e }) {
    const n = xc(), r = Bl();
    let s;
    return () => {
      const i = e.default && yo(e.default(), !0);
      if (!i || !i.length)
        return;
      let o = i[0];
      if (i.length > 1) {
        for (const C of i)
          if (C.type !== Be) {
            o = C;
            break;
          }
      }
      const a = q(t), { mode: l } = a;
      if (r.isLeaving)
        return dr(o);
      const c = Gs(o);
      if (!c)
        return dr(o);
      const f = Br(c, a, r, n);
      Ur(c, f);
      const h = n.subTree, p = h && Gs(h);
      let m = !1;
      const { getTransitionKey: b } = c.type;
      if (b) {
        const C = b();
        s === void 0 ? s = C : C !== s && (s = C, m = !0);
      }
      if (p && p.type !== Be && (!yt(c, p) || m)) {
        const C = Br(p, a, r, n);
        if (Ur(p, C), l === "out-in")
          return r.isLeaving = !0, C.afterLeave = () => {
            r.isLeaving = !1, n.update.active !== !1 && n.update();
          }, dr(o);
        l === "in-out" && c.type !== Be && (C.delayLeave = (D, w, G) => {
          const R = _o(r, p);
          R[String(p.key)] = p, D._leaveCb = () => {
            w(), D._leaveCb = void 0, delete f.delayedLeave;
          }, f.delayedLeave = G;
        });
      }
      return o;
    };
  }
}, Vl = Ul;
function _o(t, e) {
  const { leavingVNodes: n } = t;
  let r = n.get(e.type);
  return r || (r = /* @__PURE__ */ Object.create(null), n.set(e.type, r)), r;
}
function Br(t, e, n, r) {
  const { appear: s, mode: i, persisted: o = !1, onBeforeEnter: a, onEnter: l, onAfterEnter: c, onEnterCancelled: f, onBeforeLeave: h, onLeave: p, onAfterLeave: m, onLeaveCancelled: b, onBeforeAppear: C, onAppear: D, onAfterAppear: w, onAppearCancelled: G } = e, R = String(t.key), k = _o(n, t), ue = (N, ee) => {
    N && Ie(N, r, 9, ee);
  }, V = (N, ee) => {
    const re = ee[1];
    ue(N, ee), U(N) ? N.every((Ae) => Ae.length <= 1) && re() : N.length <= 1 && re();
  }, ge = {
    mode: i,
    persisted: o,
    beforeEnter(N) {
      let ee = a;
      if (!n.isMounted)
        if (s)
          ee = C || a;
        else
          return;
      N._leaveCb && N._leaveCb(
        !0
        /* cancelled */
      );
      const re = k[R];
      re && yt(t, re) && re.el._leaveCb && re.el._leaveCb(), ue(ee, [N]);
    },
    enter(N) {
      let ee = l, re = c, Ae = f;
      if (!n.isMounted)
        if (s)
          ee = D || l, re = w || c, Ae = G || f;
        else
          return;
      let Ve = !1;
      const Xe = N._enterCb = (Wt) => {
        Ve || (Ve = !0, Wt ? ue(Ae, [N]) : ue(re, [N]), ge.delayedLeave && ge.delayedLeave(), N._enterCb = void 0);
      };
      ee ? V(ee, [N, Xe]) : Xe();
    },
    leave(N, ee) {
      const re = String(t.key);
      if (N._enterCb && N._enterCb(
        !0
        /* cancelled */
      ), n.isUnmounting)
        return ee();
      ue(h, [N]);
      let Ae = !1;
      const Ve = N._leaveCb = (Xe) => {
        Ae || (Ae = !0, ee(), Xe ? ue(b, [N]) : ue(m, [N]), N._leaveCb = void 0, k[re] === t && delete k[re]);
      };
      k[re] = t, p ? V(p, [N, Ve]) : Ve();
    },
    clone(N) {
      return Br(N, e, n, r);
    }
  };
  return ge;
}
function dr(t) {
  if (Zn(t))
    return t = ct(t), t.children = null, t;
}
function Gs(t) {
  return Zn(t) ? t.children ? t.children[0] : void 0 : t;
}
function Ur(t, e) {
  t.shapeFlag & 6 && t.component ? Ur(t.component.subTree, e) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
function yo(t, e = !1, n) {
  let r = [], s = 0;
  for (let i = 0; i < t.length; i++) {
    let o = t[i];
    const a = n == null ? o.key : String(n) + String(o.key != null ? o.key : i);
    o.type === De ? (o.patchFlag & 128 && s++, r = r.concat(yo(o.children, e, a))) : (e || o.type !== Be) && r.push(a != null ? ct(o, { key: a }) : o);
  }
  if (s > 1)
    for (let i = 0; i < r.length; i++)
      r[i].patchFlag = -2;
  return r;
}
function Co(t) {
  return j(t) ? { setup: t, name: t.name } : t;
}
const Tn = (t) => !!t.type.__asyncLoader, Zn = (t) => t.type.__isKeepAlive;
function jl(t, e) {
  wo(t, "a", e);
}
function Wl(t, e) {
  wo(t, "da", e);
}
function wo(t, e, n = oe) {
  const r = t.__wdc || (t.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return t();
  });
  if (Kn(e, r, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      Zn(s.parent.vnode) && Hl(r, e, n, s), s = s.parent;
  }
}
function Hl(t, e, n, r) {
  const s = Kn(
    e,
    t,
    r,
    !0
    /* prepend */
  );
  Eo(() => {
    ss(r[e], s);
  }, n);
}
function Kn(t, e, n = oe, r = !1) {
  if (n) {
    const s = n[t] || (n[t] = []), i = e.__weh || (e.__weh = (...o) => {
      if (n.isUnmounted)
        return;
      Bt(), kt(n);
      const a = Ie(e, n, t, o);
      return St(), Ut(), a;
    });
    return r ? s.unshift(i) : s.push(i), i;
  }
}
const nt = (t) => (e, n = oe) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!dn || t === "sp") && Kn(t, (...r) => e(...r), n)
), zl = nt(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
), So = nt(
  "m"
  /* LifecycleHooks.MOUNTED */
), ql = nt(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
), Gl = nt(
  "u"
  /* LifecycleHooks.UPDATED */
), Ao = nt(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
), Eo = nt(
  "um"
  /* LifecycleHooks.UNMOUNTED */
), Jl = nt(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
), Xl = nt(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
), Yl = nt(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function Ql(t, e = oe) {
  Kn("ec", t, e);
}
function pt(t, e, n, r) {
  const s = t.dirs, i = e && e.dirs;
  for (let o = 0; o < s.length; o++) {
    const a = s[o];
    i && (a.oldValue = i[o].value);
    let l = a.dir[r];
    l && (Bt(), Ie(l, n, 8, [
      t.el,
      a,
      t,
      e
    ]), Ut());
  }
}
const xo = "components";
function Zl(t, e) {
  return ec(xo, t, !0, e) || t;
}
const Kl = Symbol();
function ec(t, e, n = !0, r = !1) {
  const s = Te || oe;
  if (s) {
    const i = s.type;
    if (t === xo) {
      const a = Tc(
        i,
        !1
        /* do not include inferred name to avoid breaking existing code */
      );
      if (a && (a === e || a === Ge(e) || a === Jn(Ge(e))))
        return i;
    }
    const o = (
      // local registration
      // check instance[type] first which is resolved for options API
      Js(s[t] || i[t], e) || // global registration
      Js(s.appContext[t], e)
    );
    return !o && r ? i : o;
  }
}
function Js(t, e) {
  return t && (t[e] || t[Ge(e)] || t[Jn(Ge(e))]);
}
function Xs(t, e, n, r) {
  let s;
  const i = n && n[r];
  if (U(t) || ce(t)) {
    s = new Array(t.length);
    for (let o = 0, a = t.length; o < a; o++)
      s[o] = e(t[o], o, void 0, i && i[o]);
  } else if (typeof t == "number") {
    s = new Array(t);
    for (let o = 0; o < t; o++)
      s[o] = e(o + 1, o, void 0, i && i[o]);
  } else if (K(t))
    if (t[Symbol.iterator])
      s = Array.from(t, (o, a) => e(o, a, void 0, i && i[a]));
    else {
      const o = Object.keys(t);
      s = new Array(o.length);
      for (let a = 0, l = o.length; a < l; a++) {
        const c = o[a];
        s[a] = e(t[c], c, a, i && i[a]);
      }
    }
  else
    s = [];
  return n && (n[r] = s), s;
}
const Vr = (t) => t ? Lo(t) ? ys(t) || t.proxy : Vr(t.parent) : null, en = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ be(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => Vr(t.parent),
    $root: (t) => Vr(t.root),
    $emit: (t) => t.emit,
    $options: (t) => bs(t),
    $forceUpdate: (t) => t.f || (t.f = () => ms(t.update)),
    $nextTick: (t) => t.n || (t.n = El.bind(t.proxy)),
    $watch: (t) => Ll.bind(t)
  })
), hr = (t, e) => t !== Z && !t.__isScriptSetup && z(t, e), tc = {
  get({ _: t }, e) {
    const { ctx: n, setupState: r, data: s, props: i, accessCache: o, type: a, appContext: l } = t;
    let c;
    if (e[0] !== "$") {
      const m = o[e];
      if (m !== void 0)
        switch (m) {
          case 1:
            return r[e];
          case 2:
            return s[e];
          case 4:
            return n[e];
          case 3:
            return i[e];
        }
      else {
        if (hr(r, e))
          return o[e] = 1, r[e];
        if (s !== Z && z(s, e))
          return o[e] = 2, s[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (c = t.propsOptions[0]) && z(c, e)
        )
          return o[e] = 3, i[e];
        if (n !== Z && z(n, e))
          return o[e] = 4, n[e];
        jr && (o[e] = 0);
      }
    }
    const f = en[e];
    let h, p;
    if (f)
      return e === "$attrs" && Se(t, "get", e), f(t);
    if (
      // css module (injected by vue-loader)
      (h = a.__cssModules) && (h = h[e])
    )
      return h;
    if (n !== Z && z(n, e))
      return o[e] = 4, n[e];
    if (
      // global properties
      p = l.config.globalProperties, z(p, e)
    )
      return p[e];
  },
  set({ _: t }, e, n) {
    const { data: r, setupState: s, ctx: i } = t;
    return hr(s, e) ? (s[e] = n, !0) : r !== Z && z(r, e) ? (r[e] = n, !0) : z(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (i[e] = n, !0);
  },
  has({ _: { data: t, setupState: e, accessCache: n, ctx: r, appContext: s, propsOptions: i } }, o) {
    let a;
    return !!n[o] || t !== Z && z(t, o) || hr(e, o) || (a = i[0]) && z(a, o) || z(r, o) || z(en, o) || z(s.config.globalProperties, o);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : z(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
let jr = !0;
function nc(t) {
  const e = bs(t), n = t.proxy, r = t.ctx;
  jr = !1, e.beforeCreate && Ys(
    e.beforeCreate,
    t,
    "bc"
    /* LifecycleHooks.BEFORE_CREATE */
  );
  const {
    // state
    data: s,
    computed: i,
    methods: o,
    watch: a,
    provide: l,
    inject: c,
    // lifecycle
    created: f,
    beforeMount: h,
    mounted: p,
    beforeUpdate: m,
    updated: b,
    activated: C,
    deactivated: D,
    beforeDestroy: w,
    beforeUnmount: G,
    destroyed: R,
    unmounted: k,
    render: ue,
    renderTracked: V,
    renderTriggered: ge,
    errorCaptured: N,
    serverPrefetch: ee,
    // public API
    expose: re,
    inheritAttrs: Ae,
    // assets
    components: Ve,
    directives: Xe,
    filters: Wt
  } = e;
  if (c && rc(c, r, null, t.appContext.config.unwrapInjectedRef), o)
    for (const se in o) {
      const Y = o[se];
      j(Y) && (r[se] = Y.bind(n));
    }
  if (s) {
    const se = s.call(n, n);
    K(se) && (t.data = ds(se));
  }
  if (jr = !0, i)
    for (const se in i) {
      const Y = i[se], dt = j(Y) ? Y.bind(n, n) : j(Y.get) ? Y.get.bind(n, n) : Le, bn = !j(Y) && j(Y.set) ? Y.set.bind(n) : Le, ht = Gr({
        get: dt,
        set: bn
      });
      Object.defineProperty(r, se, {
        enumerable: !0,
        configurable: !0,
        get: () => ht.value,
        set: (je) => ht.value = je
      });
    }
  if (a)
    for (const se in a)
      Po(a[se], r, n, se);
  if (l) {
    const se = j(l) ? l.call(n) : l;
    Reflect.ownKeys(se).forEach((Y) => {
      Fl(Y, se[Y]);
    });
  }
  f && Ys(
    f,
    t,
    "c"
    /* LifecycleHooks.CREATED */
  );
  function ve(se, Y) {
    U(Y) ? Y.forEach((dt) => se(dt.bind(n))) : Y && se(Y.bind(n));
  }
  if (ve(zl, h), ve(So, p), ve(ql, m), ve(Gl, b), ve(jl, C), ve(Wl, D), ve(Ql, N), ve(Yl, V), ve(Xl, ge), ve(Ao, G), ve(Eo, k), ve(Jl, ee), U(re))
    if (re.length) {
      const se = t.exposed || (t.exposed = {});
      re.forEach((Y) => {
        Object.defineProperty(se, Y, {
          get: () => n[Y],
          set: (dt) => n[Y] = dt
        });
      });
    } else
      t.exposed || (t.exposed = {});
  ue && t.render === Le && (t.render = ue), Ae != null && (t.inheritAttrs = Ae), Ve && (t.components = Ve), Xe && (t.directives = Xe);
}
function rc(t, e, n = Le, r = !1) {
  U(t) && (t = Wr(t));
  for (const s in t) {
    const i = t[s];
    let o;
    K(i) ? "default" in i ? o = Rn(
      i.from || s,
      i.default,
      !0
      /* treat default function as factory */
    ) : o = Rn(i.from || s) : o = Rn(i), he(o) && r ? Object.defineProperty(e, s, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (a) => o.value = a
    }) : e[s] = o;
  }
}
function Ys(t, e, n) {
  Ie(U(t) ? t.map((r) => r.bind(e.proxy)) : t.bind(e.proxy), e, n);
}
function Po(t, e, n, r) {
  const s = r.includes(".") ? vo(n, r) : () => n[r];
  if (ce(t)) {
    const i = e[t];
    j(i) && fr(s, i);
  } else if (j(t))
    fr(s, t.bind(n));
  else if (K(t))
    if (U(t))
      t.forEach((i) => Po(i, e, n, r));
    else {
      const i = j(t.handler) ? t.handler.bind(n) : e[t.handler];
      j(i) && fr(s, i, t);
    }
}
function bs(t) {
  const e = t.type, { mixins: n, extends: r } = e, { mixins: s, optionsCache: i, config: { optionMergeStrategies: o } } = t.appContext, a = i.get(e);
  let l;
  return a ? l = a : !s.length && !n && !r ? l = e : (l = {}, s.length && s.forEach((c) => Un(l, c, o, !0)), Un(l, e, o)), K(e) && i.set(e, l), l;
}
function Un(t, e, n, r = !1) {
  const { mixins: s, extends: i } = e;
  i && Un(t, i, n, !0), s && s.forEach((o) => Un(t, o, n, !0));
  for (const o in e)
    if (!(r && o === "expose")) {
      const a = sc[o] || n && n[o];
      t[o] = a ? a(t[o], e[o]) : e[o];
    }
  return t;
}
const sc = {
  data: Qs,
  props: vt,
  emits: vt,
  // objects
  methods: vt,
  computed: vt,
  // lifecycle
  beforeCreate: _e,
  created: _e,
  beforeMount: _e,
  mounted: _e,
  beforeUpdate: _e,
  updated: _e,
  beforeDestroy: _e,
  beforeUnmount: _e,
  destroyed: _e,
  unmounted: _e,
  activated: _e,
  deactivated: _e,
  errorCaptured: _e,
  serverPrefetch: _e,
  // assets
  components: vt,
  directives: vt,
  // watch
  watch: oc,
  // provide / inject
  provide: Qs,
  inject: ic
};
function Qs(t, e) {
  return e ? t ? function() {
    return be(j(t) ? t.call(this, this) : t, j(e) ? e.call(this, this) : e);
  } : e : t;
}
function ic(t, e) {
  return vt(Wr(t), Wr(e));
}
function Wr(t) {
  if (U(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function _e(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function vt(t, e) {
  return t ? be(be(/* @__PURE__ */ Object.create(null), t), e) : e;
}
function oc(t, e) {
  if (!t)
    return e;
  if (!e)
    return t;
  const n = be(/* @__PURE__ */ Object.create(null), t);
  for (const r in e)
    n[r] = _e(t[r], e[r]);
  return n;
}
function ac(t, e, n, r = !1) {
  const s = {}, i = {};
  $n(i, tr, 1), t.propsDefaults = /* @__PURE__ */ Object.create(null), Oo(t, e, s, i);
  for (const o in t.propsOptions[0])
    o in s || (s[o] = void 0);
  n ? t.props = r ? s : ml(s) : t.type.props ? t.props = s : t.props = i, t.attrs = i;
}
function lc(t, e, n, r) {
  const { props: s, attrs: i, vnode: { patchFlag: o } } = t, a = q(s), [l] = t.propsOptions;
  let c = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const f = t.vnode.dynamicProps;
      for (let h = 0; h < f.length; h++) {
        let p = f[h];
        if (Qn(t.emitsOptions, p))
          continue;
        const m = e[p];
        if (l)
          if (z(i, p))
            m !== i[p] && (i[p] = m, c = !0);
          else {
            const b = Ge(p);
            s[b] = Hr(
              l,
              a,
              b,
              m,
              t,
              !1
              /* isAbsent */
            );
          }
        else
          m !== i[p] && (i[p] = m, c = !0);
      }
    }
  } else {
    Oo(t, e, s, i) && (c = !0);
    let f;
    for (const h in a)
      (!e || // for camelCase
      !z(e, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = Lt(h)) === h || !z(e, f))) && (l ? n && // for camelCase
      (n[h] !== void 0 || // for kebab-case
      n[f] !== void 0) && (s[h] = Hr(
        l,
        a,
        h,
        void 0,
        t,
        !0
        /* isAbsent */
      )) : delete s[h]);
    if (i !== a)
      for (const h in i)
        (!e || !z(e, h)) && (delete i[h], c = !0);
  }
  c && tt(t, "set", "$attrs");
}
function Oo(t, e, n, r) {
  const [s, i] = t.propsOptions;
  let o = !1, a;
  if (e)
    for (let l in e) {
      if (Dn(l))
        continue;
      const c = e[l];
      let f;
      s && z(s, f = Ge(l)) ? !i || !i.includes(f) ? n[f] = c : (a || (a = {}))[f] = c : Qn(t.emitsOptions, l) || (!(l in r) || c !== r[l]) && (r[l] = c, o = !0);
    }
  if (i) {
    const l = q(n), c = a || Z;
    for (let f = 0; f < i.length; f++) {
      const h = i[f];
      n[h] = Hr(s, l, h, c[h], t, !z(c, h));
    }
  }
  return o;
}
function Hr(t, e, n, r, s, i) {
  const o = t[n];
  if (o != null) {
    const a = z(o, "default");
    if (a && r === void 0) {
      const l = o.default;
      if (o.type !== Function && j(l)) {
        const { propsDefaults: c } = s;
        n in c ? r = c[n] : (kt(s), r = c[n] = l.call(null, e), St());
      } else
        r = l;
    }
    o[
      0
      /* BooleanFlags.shouldCast */
    ] && (i && !a ? r = !1 : o[
      1
      /* BooleanFlags.shouldCastTrue */
    ] && (r === "" || r === Lt(n)) && (r = !0));
  }
  return r;
}
function Do(t, e, n = !1) {
  const r = e.propsCache, s = r.get(t);
  if (s)
    return s;
  const i = t.props, o = {}, a = [];
  let l = !1;
  if (!j(t)) {
    const f = (h) => {
      l = !0;
      const [p, m] = Do(h, e, !0);
      be(o, p), m && a.push(...m);
    };
    !n && e.mixins.length && e.mixins.forEach(f), t.extends && f(t.extends), t.mixins && t.mixins.forEach(f);
  }
  if (!i && !l)
    return K(t) && r.set(t, Dt), Dt;
  if (U(i))
    for (let f = 0; f < i.length; f++) {
      const h = Ge(i[f]);
      Zs(h) && (o[h] = Z);
    }
  else if (i)
    for (const f in i) {
      const h = Ge(f);
      if (Zs(h)) {
        const p = i[f], m = o[h] = U(p) || j(p) ? { type: p } : Object.assign({}, p);
        if (m) {
          const b = ti(Boolean, m.type), C = ti(String, m.type);
          m[
            0
            /* BooleanFlags.shouldCast */
          ] = b > -1, m[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = C < 0 || b < C, (b > -1 || z(m, "default")) && a.push(h);
        }
      }
    }
  const c = [o, a];
  return K(t) && r.set(t, c), c;
}
function Zs(t) {
  return t[0] !== "$";
}
function Ks(t) {
  const e = t && t.toString().match(/^\s*(function|class) (\w+)/);
  return e ? e[2] : t === null ? "null" : "";
}
function ei(t, e) {
  return Ks(t) === Ks(e);
}
function ti(t, e) {
  return U(e) ? e.findIndex((n) => ei(n, t)) : j(e) && ei(e, t) ? 0 : -1;
}
const Ro = (t) => t[0] === "_" || t === "$stable", vs = (t) => U(t) ? t.map(ze) : [ze(t)], cc = (t, e, n) => {
  if (e._n)
    return e;
  const r = mo((...s) => vs(e(...s)), n);
  return r._c = !1, r;
}, To = (t, e, n) => {
  const r = t._ctx;
  for (const s in t) {
    if (Ro(s))
      continue;
    const i = t[s];
    if (j(i))
      e[s] = cc(s, i, r);
    else if (i != null) {
      const o = vs(i);
      e[s] = () => o;
    }
  }
}, Io = (t, e) => {
  const n = vs(e);
  t.slots.default = () => n;
}, uc = (t, e) => {
  if (t.vnode.shapeFlag & 32) {
    const n = e._;
    n ? (t.slots = q(e), $n(e, "_", n)) : To(e, t.slots = {});
  } else
    t.slots = {}, e && Io(t, e);
  $n(t.slots, tr, 1);
}, fc = (t, e, n) => {
  const { vnode: r, slots: s } = t;
  let i = !0, o = Z;
  if (r.shapeFlag & 32) {
    const a = e._;
    a ? n && a === 1 ? i = !1 : (be(s, e), !n && a === 1 && delete s._) : (i = !e.$stable, To(e, s)), o = e;
  } else
    e && (Io(t, e), o = { default: 1 });
  if (i)
    for (const a in s)
      !Ro(a) && !(a in o) && delete s[a];
};
function Mo() {
  return {
    app: null,
    config: {
      isNativeTag: Ia,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let dc = 0;
function hc(t, e) {
  return function(r, s = null) {
    j(r) || (r = Object.assign({}, r)), s != null && !K(s) && (s = null);
    const i = Mo(), o = /* @__PURE__ */ new Set();
    let a = !1;
    const l = i.app = {
      _uid: dc++,
      _component: r,
      _props: s,
      _container: null,
      _context: i,
      _instance: null,
      version: $c,
      get config() {
        return i.config;
      },
      set config(c) {
      },
      use(c, ...f) {
        return o.has(c) || (c && j(c.install) ? (o.add(c), c.install(l, ...f)) : j(c) && (o.add(c), c(l, ...f))), l;
      },
      mixin(c) {
        return i.mixins.includes(c) || i.mixins.push(c), l;
      },
      component(c, f) {
        return f ? (i.components[c] = f, l) : i.components[c];
      },
      directive(c, f) {
        return f ? (i.directives[c] = f, l) : i.directives[c];
      },
      mount(c, f, h) {
        if (!a) {
          const p = pe(r, s);
          return p.appContext = i, f && e ? e(p, c) : t(p, c, h), a = !0, l._container = c, c.__vue_app__ = l, ys(p.component) || p.component.proxy;
        }
      },
      unmount() {
        a && (t(null, l._container), delete l._container.__vue_app__);
      },
      provide(c, f) {
        return i.provides[c] = f, l;
      }
    };
    return l;
  };
}
function zr(t, e, n, r, s = !1) {
  if (U(t)) {
    t.forEach((p, m) => zr(p, e && (U(e) ? e[m] : e), n, r, s));
    return;
  }
  if (Tn(r) && !s)
    return;
  const i = r.shapeFlag & 4 ? ys(r.component) || r.component.proxy : r.el, o = s ? null : i, { i: a, r: l } = t, c = e && e.r, f = a.refs === Z ? a.refs = {} : a.refs, h = a.setupState;
  if (c != null && c !== l && (ce(c) ? (f[c] = null, z(h, c) && (h[c] = null)) : he(c) && (c.value = null)), j(l))
    at(l, a, 12, [o, f]);
  else {
    const p = ce(l), m = he(l);
    if (p || m) {
      const b = () => {
        if (t.f) {
          const C = p ? z(h, l) ? h[l] : f[l] : l.value;
          s ? U(C) && ss(C, i) : U(C) ? C.includes(i) || C.push(i) : p ? (f[l] = [i], z(h, l) && (h[l] = f[l])) : (l.value = [i], t.k && (f[t.k] = l.value));
        } else
          p ? (f[l] = o, z(h, l) && (h[l] = o)) : m && (l.value = o, t.k && (f[t.k] = o));
      };
      o ? (b.id = -1, Ce(b, n)) : b();
    }
  }
}
const Ce = kl;
function pc(t) {
  return gc(t);
}
function gc(t, e) {
  const n = Ba();
  n.__VUE__ = !0;
  const { insert: r, remove: s, patchProp: i, createElement: o, createText: a, createComment: l, setText: c, setElementText: f, parentNode: h, nextSibling: p, setScopeId: m = Le, insertStaticContent: b } = t, C = (u, d, g, _ = null, v = null, A = null, x = !1, S = null, E = !!d.dynamicChildren) => {
    if (u === d)
      return;
    u && !yt(u, d) && (_ = vn(u), je(u, v, A, !0), u = null), d.patchFlag === -2 && (E = !1, d.dynamicChildren = null);
    const { type: y, ref: T, shapeFlag: O } = d;
    switch (y) {
      case er:
        D(u, d, g, _);
        break;
      case Be:
        w(u, d, g, _);
        break;
      case pr:
        u == null && G(d, g, _, x);
        break;
      case De:
        Ve(u, d, g, _, v, A, x, S, E);
        break;
      default:
        O & 1 ? ue(u, d, g, _, v, A, x, S, E) : O & 6 ? Xe(u, d, g, _, v, A, x, S, E) : (O & 64 || O & 128) && y.process(u, d, g, _, v, A, x, S, E, Et);
    }
    T != null && v && zr(T, u && u.ref, A, d || u, !d);
  }, D = (u, d, g, _) => {
    if (u == null)
      r(d.el = a(d.children), g, _);
    else {
      const v = d.el = u.el;
      d.children !== u.children && c(v, d.children);
    }
  }, w = (u, d, g, _) => {
    u == null ? r(d.el = l(d.children || ""), g, _) : d.el = u.el;
  }, G = (u, d, g, _) => {
    [u.el, u.anchor] = b(u.children, d, g, _, u.el, u.anchor);
  }, R = ({ el: u, anchor: d }, g, _) => {
    let v;
    for (; u && u !== d; )
      v = p(u), r(u, g, _), u = v;
    r(d, g, _);
  }, k = ({ el: u, anchor: d }) => {
    let g;
    for (; u && u !== d; )
      g = p(u), s(u), u = g;
    s(d);
  }, ue = (u, d, g, _, v, A, x, S, E) => {
    x = x || d.type === "svg", u == null ? V(d, g, _, v, A, x, S, E) : ee(u, d, v, A, x, S, E);
  }, V = (u, d, g, _, v, A, x, S) => {
    let E, y;
    const { type: T, props: O, shapeFlag: I, transition: L, dirs: H } = u;
    if (E = u.el = o(u.type, A, O && O.is, O), I & 8 ? f(E, u.children) : I & 16 && N(u.children, E, null, _, v, A && T !== "foreignObject", x, S), H && pt(u, null, _, "created"), ge(E, u, u.scopeId, x, _), O) {
      for (const J in O)
        J !== "value" && !Dn(J) && i(E, J, null, O[J], A, u.children, _, v, Ye);
      "value" in O && i(E, "value", null, O.value), (y = O.onVnodeBeforeMount) && He(y, _, u);
    }
    H && pt(u, null, _, "beforeMount");
    const Q = (!v || v && !v.pendingBranch) && L && !L.persisted;
    Q && L.beforeEnter(E), r(E, d, g), ((y = O && O.onVnodeMounted) || Q || H) && Ce(() => {
      y && He(y, _, u), Q && L.enter(E), H && pt(u, null, _, "mounted");
    }, v);
  }, ge = (u, d, g, _, v) => {
    if (g && m(u, g), _)
      for (let A = 0; A < _.length; A++)
        m(u, _[A]);
    if (v) {
      let A = v.subTree;
      if (d === A) {
        const x = v.vnode;
        ge(u, x, x.scopeId, x.slotScopeIds, v.parent);
      }
    }
  }, N = (u, d, g, _, v, A, x, S, E = 0) => {
    for (let y = E; y < u.length; y++) {
      const T = u[y] = S ? st(u[y]) : ze(u[y]);
      C(null, T, d, g, _, v, A, x, S);
    }
  }, ee = (u, d, g, _, v, A, x) => {
    const S = d.el = u.el;
    let { patchFlag: E, dynamicChildren: y, dirs: T } = d;
    E |= u.patchFlag & 16;
    const O = u.props || Z, I = d.props || Z;
    let L;
    g && gt(g, !1), (L = I.onVnodeBeforeUpdate) && He(L, g, d, u), T && pt(d, u, g, "beforeUpdate"), g && gt(g, !0);
    const H = v && d.type !== "foreignObject";
    if (y ? re(u.dynamicChildren, y, S, g, _, H, A) : x || Y(u, d, S, null, g, _, H, A, !1), E > 0) {
      if (E & 16)
        Ae(S, d, O, I, g, _, v);
      else if (E & 2 && O.class !== I.class && i(S, "class", null, I.class, v), E & 4 && i(S, "style", O.style, I.style, v), E & 8) {
        const Q = d.dynamicProps;
        for (let J = 0; J < Q.length; J++) {
          const le = Q[J], Me = O[le], xt = I[le];
          (xt !== Me || le === "value") && i(S, le, Me, xt, v, u.children, g, _, Ye);
        }
      }
      E & 1 && u.children !== d.children && f(S, d.children);
    } else
      !x && y == null && Ae(S, d, O, I, g, _, v);
    ((L = I.onVnodeUpdated) || T) && Ce(() => {
      L && He(L, g, d, u), T && pt(d, u, g, "updated");
    }, _);
  }, re = (u, d, g, _, v, A, x) => {
    for (let S = 0; S < d.length; S++) {
      const E = u[S], y = d[S], T = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        E.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (E.type === De || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !yt(E, y) || // - In the case of a component, it could contain anything.
        E.shapeFlag & 70) ? h(E.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          g
        )
      );
      C(E, y, T, null, _, v, A, x, !0);
    }
  }, Ae = (u, d, g, _, v, A, x) => {
    if (g !== _) {
      if (g !== Z)
        for (const S in g)
          !Dn(S) && !(S in _) && i(u, S, g[S], null, x, d.children, v, A, Ye);
      for (const S in _) {
        if (Dn(S))
          continue;
        const E = _[S], y = g[S];
        E !== y && S !== "value" && i(u, S, y, E, x, d.children, v, A, Ye);
      }
      "value" in _ && i(u, "value", g.value, _.value);
    }
  }, Ve = (u, d, g, _, v, A, x, S, E) => {
    const y = d.el = u ? u.el : a(""), T = d.anchor = u ? u.anchor : a("");
    let { patchFlag: O, dynamicChildren: I, slotScopeIds: L } = d;
    L && (S = S ? S.concat(L) : L), u == null ? (r(y, g, _), r(T, g, _), N(d.children, g, T, v, A, x, S, E)) : O > 0 && O & 64 && I && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    u.dynamicChildren ? (re(u.dynamicChildren, I, g, v, A, x, S), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || v && d === v.subTree) && No(
      u,
      d,
      !0
      /* shallow */
    )) : Y(u, d, g, T, v, A, x, S, E);
  }, Xe = (u, d, g, _, v, A, x, S, E) => {
    d.slotScopeIds = S, u == null ? d.shapeFlag & 512 ? v.ctx.activate(d, g, _, x, E) : Wt(d, g, _, v, A, x, E) : Ts(u, d, E);
  }, Wt = (u, d, g, _, v, A, x) => {
    const S = u.component = Ec(u, _, v);
    if (Zn(u) && (S.ctx.renderer = Et), Pc(S), S.asyncDep) {
      if (v && v.registerDep(S, ve), !u.el) {
        const E = S.subTree = pe(Be);
        w(null, E, d, g);
      }
      return;
    }
    ve(S, u, d, g, v, A, x);
  }, Ts = (u, d, g) => {
    const _ = d.component = u.component;
    if (Ml(u, d, g))
      if (_.asyncDep && !_.asyncResolved) {
        se(_, d, g);
        return;
      } else
        _.next = d, Pl(_.update), _.update();
    else
      d.el = u.el, _.vnode = d;
  }, ve = (u, d, g, _, v, A, x) => {
    const S = () => {
      if (u.isMounted) {
        let { next: T, bu: O, u: I, parent: L, vnode: H } = u, Q = T, J;
        gt(u, !1), T ? (T.el = H.el, se(u, T, x)) : T = H, O && cr(O), (J = T.props && T.props.onVnodeBeforeUpdate) && He(J, L, T, H), gt(u, !0);
        const le = ur(u), Me = u.subTree;
        u.subTree = le, C(
          Me,
          le,
          // parent may have changed if it's in a teleport
          h(Me.el),
          // anchor may have changed if it's in a fragment
          vn(Me),
          u,
          v,
          A
        ), T.el = le.el, Q === null && Nl(u, le.el), I && Ce(I, v), (J = T.props && T.props.onVnodeUpdated) && Ce(() => He(J, L, T, H), v);
      } else {
        let T;
        const { el: O, props: I } = d, { bm: L, m: H, parent: Q } = u, J = Tn(d);
        if (gt(u, !1), L && cr(L), !J && (T = I && I.onVnodeBeforeMount) && He(T, Q, d), gt(u, !0), O && ar) {
          const le = () => {
            u.subTree = ur(u), ar(O, u.subTree, u, v, null);
          };
          J ? d.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !u.isUnmounted && le()
          ) : le();
        } else {
          const le = u.subTree = ur(u);
          C(null, le, g, _, u, v, A), d.el = le.el;
        }
        if (H && Ce(H, v), !J && (T = I && I.onVnodeMounted)) {
          const le = d;
          Ce(() => He(T, Q, le), v);
        }
        (d.shapeFlag & 256 || Q && Tn(Q.vnode) && Q.vnode.shapeFlag & 256) && u.a && Ce(u.a, v), u.isMounted = !0, d = g = _ = null;
      }
    }, E = u.effect = new ls(
      S,
      () => ms(y),
      u.scope
      // track it in component's effect scope
    ), y = u.update = () => E.run();
    y.id = u.uid, gt(u, !0), y();
  }, se = (u, d, g) => {
    d.component = u;
    const _ = u.vnode.props;
    u.vnode = d, u.next = null, lc(u, d.props, _, g), fc(u, d.children, g), Bt(), zs(), Ut();
  }, Y = (u, d, g, _, v, A, x, S, E = !1) => {
    const y = u && u.children, T = u ? u.shapeFlag : 0, O = d.children, { patchFlag: I, shapeFlag: L } = d;
    if (I > 0) {
      if (I & 128) {
        bn(y, O, g, _, v, A, x, S, E);
        return;
      } else if (I & 256) {
        dt(y, O, g, _, v, A, x, S, E);
        return;
      }
    }
    L & 8 ? (T & 16 && Ye(y, v, A), O !== y && f(g, O)) : T & 16 ? L & 16 ? bn(y, O, g, _, v, A, x, S, E) : Ye(y, v, A, !0) : (T & 8 && f(g, ""), L & 16 && N(O, g, _, v, A, x, S, E));
  }, dt = (u, d, g, _, v, A, x, S, E) => {
    u = u || Dt, d = d || Dt;
    const y = u.length, T = d.length, O = Math.min(y, T);
    let I;
    for (I = 0; I < O; I++) {
      const L = d[I] = E ? st(d[I]) : ze(d[I]);
      C(u[I], L, g, null, v, A, x, S, E);
    }
    y > T ? Ye(u, v, A, !0, !1, O) : N(d, g, _, v, A, x, S, E, O);
  }, bn = (u, d, g, _, v, A, x, S, E) => {
    let y = 0;
    const T = d.length;
    let O = u.length - 1, I = T - 1;
    for (; y <= O && y <= I; ) {
      const L = u[y], H = d[y] = E ? st(d[y]) : ze(d[y]);
      if (yt(L, H))
        C(L, H, g, null, v, A, x, S, E);
      else
        break;
      y++;
    }
    for (; y <= O && y <= I; ) {
      const L = u[O], H = d[I] = E ? st(d[I]) : ze(d[I]);
      if (yt(L, H))
        C(L, H, g, null, v, A, x, S, E);
      else
        break;
      O--, I--;
    }
    if (y > O) {
      if (y <= I) {
        const L = I + 1, H = L < T ? d[L].el : _;
        for (; y <= I; )
          C(null, d[y] = E ? st(d[y]) : ze(d[y]), g, H, v, A, x, S, E), y++;
      }
    } else if (y > I)
      for (; y <= O; )
        je(u[y], v, A, !0), y++;
    else {
      const L = y, H = y, Q = /* @__PURE__ */ new Map();
      for (y = H; y <= I; y++) {
        const Ee = d[y] = E ? st(d[y]) : ze(d[y]);
        Ee.key != null && Q.set(Ee.key, y);
      }
      let J, le = 0;
      const Me = I - H + 1;
      let xt = !1, Ns = 0;
      const Ht = new Array(Me);
      for (y = 0; y < Me; y++)
        Ht[y] = 0;
      for (y = L; y <= O; y++) {
        const Ee = u[y];
        if (le >= Me) {
          je(Ee, v, A, !0);
          continue;
        }
        let We;
        if (Ee.key != null)
          We = Q.get(Ee.key);
        else
          for (J = H; J <= I; J++)
            if (Ht[J - H] === 0 && yt(Ee, d[J])) {
              We = J;
              break;
            }
        We === void 0 ? je(Ee, v, A, !0) : (Ht[We - H] = y + 1, We >= Ns ? Ns = We : xt = !0, C(Ee, d[We], g, null, v, A, x, S, E), le++);
      }
      const $s = xt ? mc(Ht) : Dt;
      for (J = $s.length - 1, y = Me - 1; y >= 0; y--) {
        const Ee = H + y, We = d[Ee], ks = Ee + 1 < T ? d[Ee + 1].el : _;
        Ht[y] === 0 ? C(null, We, g, ks, v, A, x, S, E) : xt && (J < 0 || y !== $s[J] ? ht(
          We,
          g,
          ks,
          2
          /* MoveType.REORDER */
        ) : J--);
      }
    }
  }, ht = (u, d, g, _, v = null) => {
    const { el: A, type: x, transition: S, children: E, shapeFlag: y } = u;
    if (y & 6) {
      ht(u.component.subTree, d, g, _);
      return;
    }
    if (y & 128) {
      u.suspense.move(d, g, _);
      return;
    }
    if (y & 64) {
      x.move(u, d, g, Et);
      return;
    }
    if (x === De) {
      r(A, d, g);
      for (let O = 0; O < E.length; O++)
        ht(E[O], d, g, _);
      r(u.anchor, d, g);
      return;
    }
    if (x === pr) {
      R(u, d, g);
      return;
    }
    if (_ !== 2 && y & 1 && S)
      if (_ === 0)
        S.beforeEnter(A), r(A, d, g), Ce(() => S.enter(A), v);
      else {
        const { leave: O, delayLeave: I, afterLeave: L } = S, H = () => r(A, d, g), Q = () => {
          O(A, () => {
            H(), L && L();
          });
        };
        I ? I(A, H, Q) : Q();
      }
    else
      r(A, d, g);
  }, je = (u, d, g, _ = !1, v = !1) => {
    const { type: A, props: x, ref: S, children: E, dynamicChildren: y, shapeFlag: T, patchFlag: O, dirs: I } = u;
    if (S != null && zr(S, null, g, u, !0), T & 256) {
      d.ctx.deactivate(u);
      return;
    }
    const L = T & 1 && I, H = !Tn(u);
    let Q;
    if (H && (Q = x && x.onVnodeBeforeUnmount) && He(Q, d, u), T & 6)
      Ea(u.component, g, _);
    else {
      if (T & 128) {
        u.suspense.unmount(g, _);
        return;
      }
      L && pt(u, null, d, "beforeUnmount"), T & 64 ? u.type.remove(u, d, g, v, Et, _) : y && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (A !== De || O > 0 && O & 64) ? Ye(y, d, g, !1, !0) : (A === De && O & 384 || !v && T & 16) && Ye(E, d, g), _ && Is(u);
    }
    (H && (Q = x && x.onVnodeUnmounted) || L) && Ce(() => {
      Q && He(Q, d, u), L && pt(u, null, d, "unmounted");
    }, g);
  }, Is = (u) => {
    const { type: d, el: g, anchor: _, transition: v } = u;
    if (d === De) {
      Aa(g, _);
      return;
    }
    if (d === pr) {
      k(u);
      return;
    }
    const A = () => {
      s(g), v && !v.persisted && v.afterLeave && v.afterLeave();
    };
    if (u.shapeFlag & 1 && v && !v.persisted) {
      const { leave: x, delayLeave: S } = v, E = () => x(g, A);
      S ? S(u.el, A, E) : E();
    } else
      A();
  }, Aa = (u, d) => {
    let g;
    for (; u !== d; )
      g = p(u), s(u), u = g;
    s(d);
  }, Ea = (u, d, g) => {
    const { bum: _, scope: v, update: A, subTree: x, um: S } = u;
    _ && cr(_), v.stop(), A && (A.active = !1, je(x, u, d, g)), S && Ce(S, d), Ce(() => {
      u.isUnmounted = !0;
    }, d), d && d.pendingBranch && !d.isUnmounted && u.asyncDep && !u.asyncResolved && u.suspenseId === d.pendingId && (d.deps--, d.deps === 0 && d.resolve());
  }, Ye = (u, d, g, _ = !1, v = !1, A = 0) => {
    for (let x = A; x < u.length; x++)
      je(u[x], d, g, _, v);
  }, vn = (u) => u.shapeFlag & 6 ? vn(u.component.subTree) : u.shapeFlag & 128 ? u.suspense.next() : p(u.anchor || u.el), Ms = (u, d, g) => {
    u == null ? d._vnode && je(d._vnode, null, null, !0) : C(d._vnode || null, u, d, null, null, null, g), zs(), fo(), d._vnode = u;
  }, Et = {
    p: C,
    um: je,
    m: ht,
    r: Is,
    mt: Wt,
    mc: N,
    pc: Y,
    pbc: re,
    n: vn,
    o: t
  };
  let or, ar;
  return e && ([or, ar] = e(Et)), {
    render: Ms,
    hydrate: or,
    createApp: hc(Ms, or)
  };
}
function gt({ effect: t, update: e }, n) {
  t.allowRecurse = e.allowRecurse = n;
}
function No(t, e, n = !1) {
  const r = t.children, s = e.children;
  if (U(r) && U(s))
    for (let i = 0; i < r.length; i++) {
      const o = r[i];
      let a = s[i];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = s[i] = st(s[i]), a.el = o.el), n || No(o, a)), a.type === er && (a.el = o.el);
    }
}
function mc(t) {
  const e = t.slice(), n = [0];
  let r, s, i, o, a;
  const l = t.length;
  for (r = 0; r < l; r++) {
    const c = t[r];
    if (c !== 0) {
      if (s = n[n.length - 1], t[s] < c) {
        e[r] = s, n.push(r);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        a = i + o >> 1, t[n[a]] < c ? i = a + 1 : o = a;
      c < t[n[i]] && (i > 0 && (e[r] = n[i - 1]), n[i] = r);
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; )
    n[i] = o, o = e[o];
  return n;
}
const bc = (t) => t.__isTeleport, De = Symbol(void 0), er = Symbol(void 0), Be = Symbol(void 0), pr = Symbol(void 0), tn = [];
let Fe = null;
function xe(t = !1) {
  tn.push(Fe = t ? null : []);
}
function vc() {
  tn.pop(), Fe = tn[tn.length - 1] || null;
}
let fn = 1;
function ni(t) {
  fn += t;
}
function $o(t) {
  return t.dynamicChildren = fn > 0 ? Fe || Dt : null, vc(), fn > 0 && Fe && Fe.push(t), t;
}
function Ne(t, e, n, r, s, i) {
  return $o(Ze(
    t,
    e,
    n,
    r,
    s,
    i,
    !0
    /* isBlock */
  ));
}
function ko(t, e, n, r, s) {
  return $o(pe(
    t,
    e,
    n,
    r,
    s,
    !0
    /* isBlock: prevent a block from tracking itself */
  ));
}
function qr(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function yt(t, e) {
  return t.type === e.type && t.key === e.key;
}
const tr = "__vInternal", Fo = ({ key: t }) => t ?? null, In = ({ ref: t, ref_key: e, ref_for: n }) => t != null ? ce(t) || he(t) || j(t) ? { i: Te, r: t, k: e, f: !!n } : t : null;
function Ze(t, e = null, n = null, r = 0, s = null, i = t === De ? 0 : 1, o = !1, a = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && Fo(e),
    ref: e && In(e),
    scopeId: go,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: Te
  };
  return a ? (_s(l, n), i & 128 && t.normalize(l)) : n && (l.shapeFlag |= ce(n) ? 8 : 16), fn > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Fe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Fe.push(l), l;
}
const pe = _c;
function _c(t, e = null, n = null, r = 0, s = null, i = !1) {
  if ((!t || t === Kl) && (t = Be), qr(t)) {
    const a = ct(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && _s(a, n), fn > 0 && !i && Fe && (a.shapeFlag & 6 ? Fe[Fe.indexOf(t)] = a : Fe.push(a)), a.patchFlag |= -2, a;
  }
  if (Ic(t) && (t = t.__vccOpts), e) {
    e = yc(e);
    let { class: a, style: l } = e;
    a && !ce(a) && (e.class = ns(a)), K(l) && (ro(l) && !U(l) && (l = be({}, l)), e.style = Hn(l));
  }
  const o = ce(t) ? 1 : $l(t) ? 128 : bc(t) ? 64 : K(t) ? 4 : j(t) ? 2 : 0;
  return Ze(t, e, n, r, s, o, i, !0);
}
function yc(t) {
  return t ? ro(t) || tr in t ? be({}, t) : t : null;
}
function ct(t, e, n = !1) {
  const { props: r, ref: s, patchFlag: i, children: o } = t, a = e ? wc(r || {}, e) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: a,
    key: a && Fo(a),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? U(s) ? s.concat(In(e)) : [s, In(e)] : In(e)
    ) : s,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: o,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== De ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: t.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && ct(t.ssContent),
    ssFallback: t.ssFallback && ct(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
}
function Cc(t = " ", e = 0) {
  return pe(er, null, t, e);
}
function zt(t = "", e = !1) {
  return e ? (xe(), ko(Be, null, t)) : pe(Be, null, t);
}
function ze(t) {
  return t == null || typeof t == "boolean" ? pe(Be) : U(t) ? pe(
    De,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : typeof t == "object" ? st(t) : pe(er, null, String(t));
}
function st(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : ct(t);
}
function _s(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null)
    e = null;
  else if (U(e))
    n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const s = e.default;
      s && (s._c && (s._d = !1), _s(t, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = e._;
      !s && !(tr in e) ? e._ctx = Te : s === 3 && Te && (Te.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else
    j(e) ? (e = { default: e, _ctx: Te }, n = 32) : (e = String(e), r & 64 ? (n = 16, e = [Cc(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function wc(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const s in r)
      if (s === "class")
        e.class !== r.class && (e.class = ns([e.class, r.class]));
      else if (s === "style")
        e.style = Hn([e.style, r.style]);
      else if (zn(s)) {
        const i = e[s], o = r[s];
        o && i !== o && !(U(i) && i.includes(o)) && (e[s] = i ? [].concat(i, o) : o);
      } else
        s !== "" && (e[s] = r[s]);
  }
  return e;
}
function He(t, e, n, r = null) {
  Ie(t, e, 7, [
    n,
    r
  ]);
}
const Sc = Mo();
let Ac = 0;
function Ec(t, e, n) {
  const r = t.type, s = (e ? e.appContext : t.appContext) || Sc, i = {
    uid: Ac++,
    vnode: t,
    type: r,
    parent: e,
    appContext: s,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new Ua(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: e ? e.provides : Object.create(s.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Do(r, s),
    emitsOptions: po(r, s),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: Z,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: Z,
    data: Z,
    props: Z,
    attrs: Z,
    slots: Z,
    refs: Z,
    setupState: Z,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return i.ctx = { _: i }, i.root = e ? e.root : i, i.emit = Rl.bind(null, i), t.ce && t.ce(i), i;
}
let oe = null;
const xc = () => oe || Te, kt = (t) => {
  oe = t, t.scope.on();
}, St = () => {
  oe && oe.scope.off(), oe = null;
};
function Lo(t) {
  return t.vnode.shapeFlag & 4;
}
let dn = !1;
function Pc(t, e = !1) {
  dn = e;
  const { props: n, children: r } = t.vnode, s = Lo(t);
  ac(t, n, s, e), uc(t, r);
  const i = s ? Oc(t, e) : void 0;
  return dn = !1, i;
}
function Oc(t, e) {
  const n = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = so(new Proxy(t.ctx, tc));
  const { setup: r } = n;
  if (r) {
    const s = t.setupContext = r.length > 1 ? Rc(t) : null;
    kt(t), Bt();
    const i = at(r, t, 0, [t.props, s]);
    if (Ut(), St(), Wi(i)) {
      if (i.then(St, St), e)
        return i.then((o) => {
          ri(t, o, e);
        }).catch((o) => {
          Yn(
            o,
            t,
            0
            /* ErrorCodes.SETUP_FUNCTION */
          );
        });
      t.asyncDep = i;
    } else
      ri(t, i, e);
  } else
    Bo(t, e);
}
function ri(t, e, n) {
  j(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : K(e) && (t.setupState = ao(e)), Bo(t, n);
}
let si;
function Bo(t, e, n) {
  const r = t.type;
  if (!t.render) {
    if (!e && si && !r.render) {
      const s = r.template || bs(t).template;
      if (s) {
        const { isCustomElement: i, compilerOptions: o } = t.appContext.config, { delimiters: a, compilerOptions: l } = r, c = be(be({
          isCustomElement: i,
          delimiters: a
        }, o), l);
        r.render = si(s, c);
      }
    }
    t.render = r.render || Le;
  }
  kt(t), Bt(), nc(t), Ut(), St();
}
function Dc(t) {
  return new Proxy(t.attrs, {
    get(e, n) {
      return Se(t, "get", "$attrs"), e[n];
    }
  });
}
function Rc(t) {
  const e = (r) => {
    t.exposed = r || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = Dc(t));
    },
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function ys(t) {
  if (t.exposed)
    return t.exposeProxy || (t.exposeProxy = new Proxy(ao(so(t.exposed)), {
      get(e, n) {
        if (n in e)
          return e[n];
        if (n in en)
          return en[n](t);
      },
      has(e, n) {
        return n in e || n in en;
      }
    }));
}
function Tc(t, e = !0) {
  return j(t) ? t.displayName || t.name : t.name || e && t.__name;
}
function Ic(t) {
  return j(t) && "__vccOpts" in t;
}
const Gr = (t, e) => Sl(t, e, dn);
function gr(t, e, n) {
  const r = arguments.length;
  return r === 2 ? K(e) && !U(e) ? qr(e) ? pe(t, null, [e]) : pe(t, e) : pe(t, null, e) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && qr(n) && (n = [n]), pe(t, e, n));
}
const Mc = Symbol(""), Nc = () => Rn(Mc), $c = "3.2.47", kc = "http://www.w3.org/2000/svg", Ct = typeof document < "u" ? document : null, ii = Ct && /* @__PURE__ */ Ct.createElement("template"), Fc = {
  insert: (t, e, n) => {
    e.insertBefore(t, n || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, n, r) => {
    const s = e ? Ct.createElementNS(kc, t) : Ct.createElement(t, n ? { is: n } : void 0);
    return t === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple), s;
  },
  createText: (t) => Ct.createTextNode(t),
  createComment: (t) => Ct.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => Ct.querySelector(t),
  setScopeId(t, e) {
    t.setAttribute(e, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(t, e, n, r, s, i) {
    const o = n ? n.previousSibling : e.lastChild;
    if (s && (s === i || s.nextSibling))
      for (; e.insertBefore(s.cloneNode(!0), n), !(s === i || !(s = s.nextSibling)); )
        ;
    else {
      ii.innerHTML = r ? `<svg>${t}</svg>` : t;
      const a = ii.content;
      if (r) {
        const l = a.firstChild;
        for (; l.firstChild; )
          a.appendChild(l.firstChild);
        a.removeChild(l);
      }
      e.insertBefore(a, n);
    }
    return [
      // first
      o ? o.nextSibling : e.firstChild,
      // last
      n ? n.previousSibling : e.lastChild
    ];
  }
};
function Lc(t, e, n) {
  const r = t._vtc;
  r && (e = (e ? [e, ...r] : [...r]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
}
function Bc(t, e, n) {
  const r = t.style, s = ce(n);
  if (n && !s) {
    if (e && !ce(e))
      for (const i in e)
        n[i] == null && Jr(r, i, "");
    for (const i in n)
      Jr(r, i, n[i]);
  } else {
    const i = r.display;
    s ? e !== n && (r.cssText = n) : e && t.removeAttribute("style"), "_vod" in t && (r.display = i);
  }
}
const oi = /\s*!important$/;
function Jr(t, e, n) {
  if (U(n))
    n.forEach((r) => Jr(t, e, r));
  else if (n == null && (n = ""), e.startsWith("--"))
    t.setProperty(e, n);
  else {
    const r = Uc(t, e);
    oi.test(n) ? t.setProperty(Lt(r), n.replace(oi, ""), "important") : t[r] = n;
  }
}
const ai = ["Webkit", "Moz", "ms"], mr = {};
function Uc(t, e) {
  const n = mr[e];
  if (n)
    return n;
  let r = Ge(e);
  if (r !== "filter" && r in t)
    return mr[e] = r;
  r = Jn(r);
  for (let s = 0; s < ai.length; s++) {
    const i = ai[s] + r;
    if (i in t)
      return mr[e] = i;
  }
  return e;
}
const li = "http://www.w3.org/1999/xlink";
function Vc(t, e, n, r, s) {
  if (r && e.startsWith("xlink:"))
    n == null ? t.removeAttributeNS(li, e.slice(6, e.length)) : t.setAttributeNS(li, e, n);
  else {
    const i = Ta(e);
    n == null || i && !Bi(n) ? t.removeAttribute(e) : t.setAttribute(e, i ? "" : n);
  }
}
function jc(t, e, n, r, s, i, o) {
  if (e === "innerHTML" || e === "textContent") {
    r && o(r, s, i), t[e] = n ?? "";
    return;
  }
  if (e === "value" && t.tagName !== "PROGRESS" && // custom elements may use _value internally
  !t.tagName.includes("-")) {
    t._value = n;
    const l = n ?? "";
    (t.value !== l || // #4956: always set for OPTION elements because its value falls back to
    // textContent if no value attribute is present. And setting .value for
    // OPTION has no side effect
    t.tagName === "OPTION") && (t.value = l), n == null && t.removeAttribute(e);
    return;
  }
  let a = !1;
  if (n === "" || n == null) {
    const l = typeof t[e];
    l === "boolean" ? n = Bi(n) : n == null && l === "string" ? (n = "", a = !0) : l === "number" && (n = 0, a = !0);
  }
  try {
    t[e] = n;
  } catch {
  }
  a && t.removeAttribute(e);
}
function Wc(t, e, n, r) {
  t.addEventListener(e, n, r);
}
function Hc(t, e, n, r) {
  t.removeEventListener(e, n, r);
}
function zc(t, e, n, r, s = null) {
  const i = t._vei || (t._vei = {}), o = i[e];
  if (r && o)
    o.value = r;
  else {
    const [a, l] = qc(e);
    if (r) {
      const c = i[e] = Xc(r, s);
      Wc(t, a, c, l);
    } else
      o && (Hc(t, a, o, l), i[e] = void 0);
  }
}
const ci = /(?:Once|Passive|Capture)$/;
function qc(t) {
  let e;
  if (ci.test(t)) {
    e = {};
    let r;
    for (; r = t.match(ci); )
      t = t.slice(0, t.length - r[0].length), e[r[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : Lt(t.slice(2)), e];
}
let br = 0;
const Gc = /* @__PURE__ */ Promise.resolve(), Jc = () => br || (Gc.then(() => br = 0), br = Date.now());
function Xc(t, e) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    Ie(Yc(r, n.value), e, 5, [r]);
  };
  return n.value = t, n.attached = Jc(), n;
}
function Yc(t, e) {
  if (U(e)) {
    const n = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      n.call(t), t._stopped = !0;
    }, e.map((r) => (s) => !s._stopped && r && r(s));
  } else
    return e;
}
const ui = /^on[a-z]/, Qc = (t, e, n, r, s = !1, i, o, a, l) => {
  e === "class" ? Lc(t, r, s) : e === "style" ? Bc(t, n, r) : zn(e) ? rs(e) || zc(t, e, n, r, o) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : Zc(t, e, r, s)) ? jc(t, e, r, i, o, a, l) : (e === "true-value" ? t._trueValue = r : e === "false-value" && (t._falseValue = r), Vc(t, e, r, s));
};
function Zc(t, e, n, r) {
  return r ? !!(e === "innerHTML" || e === "textContent" || e in t && ui.test(e) && j(n)) : e === "spellcheck" || e === "draggable" || e === "translate" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA" || ui.test(e) && ce(n) ? !1 : e in t;
}
const Kc = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
Vl.props;
const eu = /* @__PURE__ */ be({ patchProp: Qc }, Fc);
let fi;
function tu() {
  return fi || (fi = pc(eu));
}
const nu = (...t) => {
  const e = tu().createApp(...t), { mount: n } = e;
  return e.mount = (r) => {
    const s = ru(r);
    if (!s)
      return;
    const i = e._component;
    !j(i) && !i.render && !i.template && (i.template = s.innerHTML), s.innerHTML = "";
    const o = n(s, !1, s instanceof SVGElement);
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), o;
  }, e;
};
function ru(t) {
  return ce(t) ? document.querySelector(t) : t;
}
const ut = function() {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof global < "u")
    return global;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  try {
    return new Function("return this")();
  } catch {
    return {};
  }
}();
ut.trustedTypes === void 0 && (ut.trustedTypes = { createPolicy: (t, e) => e });
const Uo = {
  configurable: !1,
  enumerable: !1,
  writable: !1
};
ut.FAST === void 0 && Reflect.defineProperty(ut, "FAST", Object.assign({ value: /* @__PURE__ */ Object.create(null) }, Uo));
const hn = ut.FAST;
if (hn.getById === void 0) {
  const t = /* @__PURE__ */ Object.create(null);
  Reflect.defineProperty(hn, "getById", Object.assign({ value(e, n) {
    let r = t[e];
    return r === void 0 && (r = n ? t[e] = n() : null), r;
  } }, Uo));
}
const nn = Object.freeze([]);
function Vo() {
  const t = /* @__PURE__ */ new WeakMap();
  return function(e) {
    let n = t.get(e);
    if (n === void 0) {
      let r = Reflect.getPrototypeOf(e);
      for (; n === void 0 && r !== null; )
        n = t.get(r), r = Reflect.getPrototypeOf(r);
      n = n === void 0 ? [] : n.slice(0), t.set(e, n);
    }
    return n;
  };
}
const vr = ut.FAST.getById(1, () => {
  const t = [], e = [];
  function n() {
    if (e.length)
      throw e.shift();
  }
  function r(o) {
    try {
      o.call();
    } catch (a) {
      e.push(a), setTimeout(n, 0);
    }
  }
  function s() {
    let a = 0;
    for (; a < t.length; )
      if (r(t[a]), a++, a > 1024) {
        for (let l = 0, c = t.length - a; l < c; l++)
          t[l] = t[l + a];
        t.length -= a, a = 0;
      }
    t.length = 0;
  }
  function i(o) {
    t.length < 1 && ut.requestAnimationFrame(s), t.push(o);
  }
  return Object.freeze({
    enqueue: i,
    process: s
  });
}), jo = ut.trustedTypes.createPolicy("fast-html", {
  createHTML: (t) => t
});
let _r = jo;
const rn = `fast-${Math.random().toString(36).substring(2, 8)}`, Wo = `${rn}{`, Cs = `}${rn}`, X = Object.freeze({
  /**
   * Indicates whether the DOM supports the adoptedStyleSheets feature.
   */
  supportsAdoptedStyleSheets: Array.isArray(document.adoptedStyleSheets) && "replace" in CSSStyleSheet.prototype,
  /**
   * Sets the HTML trusted types policy used by the templating engine.
   * @param policy - The policy to set for HTML.
   * @remarks
   * This API can only be called once, for security reasons. It should be
   * called by the application developer at the start of their program.
   */
  setHTMLPolicy(t) {
    if (_r !== jo)
      throw new Error("The HTML policy can only be set once.");
    _r = t;
  },
  /**
   * Turns a string into trusted HTML using the configured trusted types policy.
   * @param html - The string to turn into trusted HTML.
   * @remarks
   * Used internally by the template engine when creating templates
   * and setting innerHTML.
   */
  createHTML(t) {
    return _r.createHTML(t);
  },
  /**
   * Determines if the provided node is a template marker used by the runtime.
   * @param node - The node to test.
   */
  isMarker(t) {
    return t && t.nodeType === 8 && t.data.startsWith(rn);
  },
  /**
   * Given a marker node, extract the {@link HTMLDirective} index from the placeholder.
   * @param node - The marker node to extract the index from.
   */
  extractDirectiveIndexFromMarker(t) {
    return parseInt(t.data.replace(`${rn}:`, ""));
  },
  /**
   * Creates a placeholder string suitable for marking out a location *within*
   * an attribute value or HTML content.
   * @param index - The directive index to create the placeholder for.
   * @remarks
   * Used internally by binding directives.
   */
  createInterpolationPlaceholder(t) {
    return `${Wo}${t}${Cs}`;
  },
  /**
   * Creates a placeholder that manifests itself as an attribute on an
   * element.
   * @param attributeName - The name of the custom attribute.
   * @param index - The directive index to create the placeholder for.
   * @remarks
   * Used internally by attribute directives such as `ref`, `slotted`, and `children`.
   */
  createCustomAttributePlaceholder(t, e) {
    return `${t}="${this.createInterpolationPlaceholder(e)}"`;
  },
  /**
   * Creates a placeholder that manifests itself as a marker within the DOM structure.
   * @param index - The directive index to create the placeholder for.
   * @remarks
   * Used internally by structural directives such as `repeat`.
   */
  createBlockPlaceholder(t) {
    return `<!--${rn}:${t}-->`;
  },
  /**
   * Schedules DOM update work in the next async batch.
   * @param callable - The callable function or object to queue.
   */
  queueUpdate: vr.enqueue,
  /**
   * Immediately processes all work previously scheduled
   * through queueUpdate.
   * @remarks
   * This also forces nextUpdate promises
   * to resolve.
   */
  processUpdates: vr.process,
  /**
   * Resolves with the next DOM update.
   */
  nextUpdate() {
    return new Promise(vr.enqueue);
  },
  /**
   * Sets an attribute value on an element.
   * @param element - The element to set the attribute value on.
   * @param attributeName - The attribute name to set.
   * @param value - The value of the attribute to set.
   * @remarks
   * If the value is `null` or `undefined`, the attribute is removed, otherwise
   * it is set to the provided value using the standard `setAttribute` API.
   */
  setAttribute(t, e, n) {
    n == null ? t.removeAttribute(e) : t.setAttribute(e, n);
  },
  /**
   * Sets a boolean attribute value.
   * @param element - The element to set the boolean attribute value on.
   * @param attributeName - The attribute name to set.
   * @param value - The value of the attribute to set.
   * @remarks
   * If the value is true, the attribute is added; otherwise it is removed.
   */
  setBooleanAttribute(t, e, n) {
    n ? t.setAttribute(e, "") : t.removeAttribute(e);
  },
  /**
   * Removes all the child nodes of the provided parent node.
   * @param parent - The node to remove the children from.
   */
  removeChildNodes(t) {
    for (let e = t.firstChild; e !== null; e = t.firstChild)
      t.removeChild(e);
  },
  /**
   * Creates a TreeWalker configured to walk a template fragment.
   * @param fragment - The fragment to walk.
   */
  createTemplateWalker(t) {
    return document.createTreeWalker(
      t,
      133,
      // element, text, comment
      null,
      !1
    );
  }
});
class Xr {
  /**
   * Creates an instance of SubscriberSet for the specified source.
   * @param source - The object source that subscribers will receive notifications from.
   * @param initialSubscriber - An initial subscriber to changes.
   */
  constructor(e, n) {
    this.sub1 = void 0, this.sub2 = void 0, this.spillover = void 0, this.source = e, this.sub1 = n;
  }
  /**
   * Checks whether the provided subscriber has been added to this set.
   * @param subscriber - The subscriber to test for inclusion in this set.
   */
  has(e) {
    return this.spillover === void 0 ? this.sub1 === e || this.sub2 === e : this.spillover.indexOf(e) !== -1;
  }
  /**
   * Subscribes to notification of changes in an object's state.
   * @param subscriber - The object that is subscribing for change notification.
   */
  subscribe(e) {
    const n = this.spillover;
    if (n === void 0) {
      if (this.has(e))
        return;
      if (this.sub1 === void 0) {
        this.sub1 = e;
        return;
      }
      if (this.sub2 === void 0) {
        this.sub2 = e;
        return;
      }
      this.spillover = [this.sub1, this.sub2, e], this.sub1 = void 0, this.sub2 = void 0;
    } else
      n.indexOf(e) === -1 && n.push(e);
  }
  /**
   * Unsubscribes from notification of changes in an object's state.
   * @param subscriber - The object that is unsubscribing from change notification.
   */
  unsubscribe(e) {
    const n = this.spillover;
    if (n === void 0)
      this.sub1 === e ? this.sub1 = void 0 : this.sub2 === e && (this.sub2 = void 0);
    else {
      const r = n.indexOf(e);
      r !== -1 && n.splice(r, 1);
    }
  }
  /**
   * Notifies all subscribers.
   * @param args - Data passed along to subscribers during notification.
   */
  notify(e) {
    const n = this.spillover, r = this.source;
    if (n === void 0) {
      const s = this.sub1, i = this.sub2;
      s !== void 0 && s.handleChange(r, e), i !== void 0 && i.handleChange(r, e);
    } else
      for (let s = 0, i = n.length; s < i; ++s)
        n[s].handleChange(r, e);
  }
}
class Ho {
  /**
   * Creates an instance of PropertyChangeNotifier for the specified source.
   * @param source - The object source that subscribers will receive notifications from.
   */
  constructor(e) {
    this.subscribers = {}, this.sourceSubscribers = null, this.source = e;
  }
  /**
   * Notifies all subscribers, based on the specified property.
   * @param propertyName - The property name, passed along to subscribers during notification.
   */
  notify(e) {
    var n;
    const r = this.subscribers[e];
    r !== void 0 && r.notify(e), (n = this.sourceSubscribers) === null || n === void 0 || n.notify(e);
  }
  /**
   * Subscribes to notification of changes in an object's state.
   * @param subscriber - The object that is subscribing for change notification.
   * @param propertyToWatch - The name of the property that the subscriber is interested in watching for changes.
   */
  subscribe(e, n) {
    var r;
    if (n) {
      let s = this.subscribers[n];
      s === void 0 && (this.subscribers[n] = s = new Xr(this.source)), s.subscribe(e);
    } else
      this.sourceSubscribers = (r = this.sourceSubscribers) !== null && r !== void 0 ? r : new Xr(this.source), this.sourceSubscribers.subscribe(e);
  }
  /**
   * Unsubscribes from notification of changes in an object's state.
   * @param subscriber - The object that is unsubscribing from change notification.
   * @param propertyToUnwatch - The name of the property that the subscriber is no longer interested in watching.
   */
  unsubscribe(e, n) {
    var r;
    if (n) {
      const s = this.subscribers[n];
      s !== void 0 && s.unsubscribe(e);
    } else
      (r = this.sourceSubscribers) === null || r === void 0 || r.unsubscribe(e);
  }
}
const de = hn.getById(2, () => {
  const t = /(:|&&|\|\||if)/, e = /* @__PURE__ */ new WeakMap(), n = X.queueUpdate;
  let r, s = (c) => {
    throw new Error("Must call enableArrayObservation before observing arrays.");
  };
  function i(c) {
    let f = c.$fastController || e.get(c);
    return f === void 0 && (Array.isArray(c) ? f = s(c) : e.set(c, f = new Ho(c))), f;
  }
  const o = Vo();
  class a {
    constructor(f) {
      this.name = f, this.field = `_${f}`, this.callback = `${f}Changed`;
    }
    getValue(f) {
      return r !== void 0 && r.watch(f, this.name), f[this.field];
    }
    setValue(f, h) {
      const p = this.field, m = f[p];
      if (m !== h) {
        f[p] = h;
        const b = f[this.callback];
        typeof b == "function" && b.call(f, m, h), i(f).notify(this.name);
      }
    }
  }
  class l extends Xr {
    constructor(f, h, p = !1) {
      super(f, h), this.binding = f, this.isVolatileBinding = p, this.needsRefresh = !0, this.needsQueue = !0, this.first = this, this.last = null, this.propertySource = void 0, this.propertyName = void 0, this.notifier = void 0, this.next = void 0;
    }
    observe(f, h) {
      this.needsRefresh && this.last !== null && this.disconnect();
      const p = r;
      r = this.needsRefresh ? this : void 0, this.needsRefresh = this.isVolatileBinding;
      const m = this.binding(f, h);
      return r = p, m;
    }
    disconnect() {
      if (this.last !== null) {
        let f = this.first;
        for (; f !== void 0; )
          f.notifier.unsubscribe(this, f.propertyName), f = f.next;
        this.last = null, this.needsRefresh = this.needsQueue = !0;
      }
    }
    watch(f, h) {
      const p = this.last, m = i(f), b = p === null ? this.first : {};
      if (b.propertySource = f, b.propertyName = h, b.notifier = m, m.subscribe(this, h), p !== null) {
        if (!this.needsRefresh) {
          let C;
          r = void 0, C = p.propertySource[p.propertyName], r = this, f === C && (this.needsRefresh = !0);
        }
        p.next = b;
      }
      this.last = b;
    }
    handleChange() {
      this.needsQueue && (this.needsQueue = !1, n(this));
    }
    call() {
      this.last !== null && (this.needsQueue = !0, this.notify(this));
    }
    records() {
      let f = this.first;
      return {
        next: () => {
          const h = f;
          return h === void 0 ? { value: void 0, done: !0 } : (f = f.next, {
            value: h,
            done: !1
          });
        },
        [Symbol.iterator]: function() {
          return this;
        }
      };
    }
  }
  return Object.freeze({
    /**
     * @internal
     * @param factory - The factory used to create array observers.
     */
    setArrayObserverFactory(c) {
      s = c;
    },
    /**
     * Gets a notifier for an object or Array.
     * @param source - The object or Array to get the notifier for.
     */
    getNotifier: i,
    /**
     * Records a property change for a source object.
     * @param source - The object to record the change against.
     * @param propertyName - The property to track as changed.
     */
    track(c, f) {
      r !== void 0 && r.watch(c, f);
    },
    /**
     * Notifies watchers that the currently executing property getter or function is volatile
     * with respect to its observable dependencies.
     */
    trackVolatile() {
      r !== void 0 && (r.needsRefresh = !0);
    },
    /**
     * Notifies subscribers of a source object of changes.
     * @param source - the object to notify of changes.
     * @param args - The change args to pass to subscribers.
     */
    notify(c, f) {
      i(c).notify(f);
    },
    /**
     * Defines an observable property on an object or prototype.
     * @param target - The target object to define the observable on.
     * @param nameOrAccessor - The name of the property to define as observable;
     * or a custom accessor that specifies the property name and accessor implementation.
     */
    defineProperty(c, f) {
      typeof f == "string" && (f = new a(f)), o(c).push(f), Reflect.defineProperty(c, f.name, {
        enumerable: !0,
        get: function() {
          return f.getValue(this);
        },
        set: function(h) {
          f.setValue(this, h);
        }
      });
    },
    /**
     * Finds all the observable accessors defined on the target,
     * including its prototype chain.
     * @param target - The target object to search for accessor on.
     */
    getAccessors: o,
    /**
     * Creates a {@link BindingObserver} that can watch the
     * provided {@link Binding} for changes.
     * @param binding - The binding to observe.
     * @param initialSubscriber - An initial subscriber to changes in the binding value.
     * @param isVolatileBinding - Indicates whether the binding's dependency list must be re-evaluated on every value evaluation.
     */
    binding(c, f, h = this.isVolatileBinding(c)) {
      return new l(c, f, h);
    },
    /**
     * Determines whether a binding expression is volatile and needs to have its dependency list re-evaluated
     * on every evaluation of the value.
     * @param binding - The binding to inspect.
     */
    isVolatileBinding(c) {
      return t.test(c.toString());
    }
  });
});
function At(t, e) {
  de.defineProperty(t, e);
}
const di = hn.getById(3, () => {
  let t = null;
  return {
    get() {
      return t;
    },
    set(e) {
      t = e;
    }
  };
});
class pn {
  constructor() {
    this.index = 0, this.length = 0, this.parent = null, this.parentContext = null;
  }
  /**
   * The current event within an event handler.
   */
  get event() {
    return di.get();
  }
  /**
   * Indicates whether the current item within a repeat context
   * has an even index.
   */
  get isEven() {
    return this.index % 2 === 0;
  }
  /**
   * Indicates whether the current item within a repeat context
   * has an odd index.
   */
  get isOdd() {
    return this.index % 2 !== 0;
  }
  /**
   * Indicates whether the current item within a repeat context
   * is the first item in the collection.
   */
  get isFirst() {
    return this.index === 0;
  }
  /**
   * Indicates whether the current item within a repeat context
   * is somewhere in the middle of the collection.
   */
  get isInMiddle() {
    return !this.isFirst && !this.isLast;
  }
  /**
   * Indicates whether the current item within a repeat context
   * is the last item in the collection.
   */
  get isLast() {
    return this.index === this.length - 1;
  }
  /**
   * Sets the event for the current execution context.
   * @param event - The event to set.
   * @internal
   */
  static setEvent(e) {
    di.set(e);
  }
}
de.defineProperty(pn.prototype, "index");
de.defineProperty(pn.prototype, "length");
const sn = Object.seal(new pn());
class ws {
  constructor() {
    this.targetIndex = 0;
  }
}
class zo extends ws {
  constructor() {
    super(...arguments), this.createPlaceholder = X.createInterpolationPlaceholder;
  }
}
class qo extends ws {
  /**
   *
   * @param name - The name of the behavior; used as a custom attribute on the element.
   * @param behavior - The behavior to instantiate and attach to the element.
   * @param options - Options to pass to the behavior during creation.
   */
  constructor(e, n, r) {
    super(), this.name = e, this.behavior = n, this.options = r;
  }
  /**
   * Creates a placeholder string based on the directive's index within the template.
   * @param index - The index of the directive within the template.
   * @remarks
   * Creates a custom attribute placeholder.
   */
  createPlaceholder(e) {
    return X.createCustomAttributePlaceholder(this.name, e);
  }
  /**
   * Creates a behavior for the provided target node.
   * @param target - The node instance to create the behavior for.
   * @remarks
   * Creates an instance of the `behavior` type this directive was constructed with
   * and passes the target and options to that `behavior`'s constructor.
   */
  createBehavior(e) {
    return new this.behavior(e, this.options);
  }
}
function su(t, e) {
  this.source = t, this.context = e, this.bindingObserver === null && (this.bindingObserver = de.binding(this.binding, this, this.isBindingVolatile)), this.updateTarget(this.bindingObserver.observe(t, e));
}
function iu(t, e) {
  this.source = t, this.context = e, this.target.addEventListener(this.targetName, this);
}
function ou() {
  this.bindingObserver.disconnect(), this.source = null, this.context = null;
}
function au() {
  this.bindingObserver.disconnect(), this.source = null, this.context = null;
  const t = this.target.$fastView;
  t !== void 0 && t.isComposed && (t.unbind(), t.needsBindOnly = !0);
}
function lu() {
  this.target.removeEventListener(this.targetName, this), this.source = null, this.context = null;
}
function cu(t) {
  X.setAttribute(this.target, this.targetName, t);
}
function uu(t) {
  X.setBooleanAttribute(this.target, this.targetName, t);
}
function fu(t) {
  if (t == null && (t = ""), t.create) {
    this.target.textContent = "";
    let e = this.target.$fastView;
    e === void 0 ? e = t.create() : this.target.$fastTemplate !== t && (e.isComposed && (e.remove(), e.unbind()), e = t.create()), e.isComposed ? e.needsBindOnly && (e.needsBindOnly = !1, e.bind(this.source, this.context)) : (e.isComposed = !0, e.bind(this.source, this.context), e.insertBefore(this.target), this.target.$fastView = e, this.target.$fastTemplate = t);
  } else {
    const e = this.target.$fastView;
    e !== void 0 && e.isComposed && (e.isComposed = !1, e.remove(), e.needsBindOnly ? e.needsBindOnly = !1 : e.unbind()), this.target.textContent = t;
  }
}
function du(t) {
  this.target[this.targetName] = t;
}
function hu(t) {
  const e = this.classVersions || /* @__PURE__ */ Object.create(null), n = this.target;
  let r = this.version || 0;
  if (t != null && t.length) {
    const s = t.split(/\s+/);
    for (let i = 0, o = s.length; i < o; ++i) {
      const a = s[i];
      a !== "" && (e[a] = r, n.classList.add(a));
    }
  }
  if (this.classVersions = e, this.version = r + 1, r !== 0) {
    r -= 1;
    for (const s in e)
      e[s] === r && n.classList.remove(s);
  }
}
class Ss extends zo {
  /**
   * Creates an instance of BindingDirective.
   * @param binding - A binding that returns the data used to update the DOM.
   */
  constructor(e) {
    super(), this.binding = e, this.bind = su, this.unbind = ou, this.updateTarget = cu, this.isBindingVolatile = de.isVolatileBinding(this.binding);
  }
  /**
   * Gets/sets the name of the attribute or property that this
   * binding is targeting.
   */
  get targetName() {
    return this.originalTargetName;
  }
  set targetName(e) {
    if (this.originalTargetName = e, e !== void 0)
      switch (e[0]) {
        case ":":
          if (this.cleanedTargetName = e.substr(1), this.updateTarget = du, this.cleanedTargetName === "innerHTML") {
            const n = this.binding;
            this.binding = (r, s) => X.createHTML(n(r, s));
          }
          break;
        case "?":
          this.cleanedTargetName = e.substr(1), this.updateTarget = uu;
          break;
        case "@":
          this.cleanedTargetName = e.substr(1), this.bind = iu, this.unbind = lu;
          break;
        default:
          this.cleanedTargetName = e, e === "class" && (this.updateTarget = hu);
          break;
      }
  }
  /**
   * Makes this binding target the content of an element rather than
   * a particular attribute or property.
   */
  targetAtContent() {
    this.updateTarget = fu, this.unbind = au;
  }
  /**
   * Creates the runtime BindingBehavior instance based on the configuration
   * information stored in the BindingDirective.
   * @param target - The target node that the binding behavior should attach to.
   */
  createBehavior(e) {
    return new pu(e, this.binding, this.isBindingVolatile, this.bind, this.unbind, this.updateTarget, this.cleanedTargetName);
  }
}
class pu {
  /**
   * Creates an instance of BindingBehavior.
   * @param target - The target of the data updates.
   * @param binding - The binding that returns the latest value for an update.
   * @param isBindingVolatile - Indicates whether the binding has volatile dependencies.
   * @param bind - The operation to perform during binding.
   * @param unbind - The operation to perform during unbinding.
   * @param updateTarget - The operation to perform when updating.
   * @param targetName - The name of the target attribute or property to update.
   */
  constructor(e, n, r, s, i, o, a) {
    this.source = null, this.context = null, this.bindingObserver = null, this.target = e, this.binding = n, this.isBindingVolatile = r, this.bind = s, this.unbind = i, this.updateTarget = o, this.targetName = a;
  }
  /** @internal */
  handleChange() {
    this.updateTarget(this.bindingObserver.observe(this.source, this.context));
  }
  /** @internal */
  handleEvent(e) {
    pn.setEvent(e);
    const n = this.binding(this.source, this.context);
    pn.setEvent(null), n !== !0 && e.preventDefault();
  }
}
let yr = null;
class As {
  addFactory(e) {
    e.targetIndex = this.targetIndex, this.behaviorFactories.push(e);
  }
  captureContentBinding(e) {
    e.targetAtContent(), this.addFactory(e);
  }
  reset() {
    this.behaviorFactories = [], this.targetIndex = -1;
  }
  release() {
    yr = this;
  }
  static borrow(e) {
    const n = yr || new As();
    return n.directives = e, n.reset(), yr = null, n;
  }
}
function gu(t) {
  if (t.length === 1)
    return t[0];
  let e;
  const n = t.length, r = t.map((o) => typeof o == "string" ? () => o : (e = o.targetName || e, o.binding)), s = (o, a) => {
    let l = "";
    for (let c = 0; c < n; ++c)
      l += r[c](o, a);
    return l;
  }, i = new Ss(s);
  return i.targetName = e, i;
}
const mu = Cs.length;
function Go(t, e) {
  const n = e.split(Wo);
  if (n.length === 1)
    return null;
  const r = [];
  for (let s = 0, i = n.length; s < i; ++s) {
    const o = n[s], a = o.indexOf(Cs);
    let l;
    if (a === -1)
      l = o;
    else {
      const c = parseInt(o.substring(0, a));
      r.push(t.directives[c]), l = o.substring(a + mu);
    }
    l !== "" && r.push(l);
  }
  return r;
}
function hi(t, e, n = !1) {
  const r = e.attributes;
  for (let s = 0, i = r.length; s < i; ++s) {
    const o = r[s], a = o.value, l = Go(t, a);
    let c = null;
    l === null ? n && (c = new Ss(() => a), c.targetName = o.name) : c = gu(l), c !== null && (e.removeAttributeNode(o), s--, i--, t.addFactory(c));
  }
}
function bu(t, e, n) {
  const r = Go(t, e.textContent);
  if (r !== null) {
    let s = e;
    for (let i = 0, o = r.length; i < o; ++i) {
      const a = r[i], l = i === 0 ? e : s.parentNode.insertBefore(document.createTextNode(""), s.nextSibling);
      typeof a == "string" ? l.textContent = a : (l.textContent = " ", t.captureContentBinding(a)), s = l, t.targetIndex++, l !== e && n.nextNode();
    }
    t.targetIndex--;
  }
}
function vu(t, e) {
  const n = t.content;
  document.adoptNode(n);
  const r = As.borrow(e);
  hi(r, t, !0);
  const s = r.behaviorFactories;
  r.reset();
  const i = X.createTemplateWalker(n);
  let o;
  for (; o = i.nextNode(); )
    switch (r.targetIndex++, o.nodeType) {
      case 1:
        hi(r, o);
        break;
      case 3:
        bu(r, o, i);
        break;
      case 8:
        X.isMarker(o) && r.addFactory(e[X.extractDirectiveIndexFromMarker(o)]);
    }
  let a = 0;
  // If the first node in a fragment is a marker, that means it's an unstable first node,
  // because something like a when, repeat, etc. could add nodes before the marker.
  // To mitigate this, we insert a stable first node. However, if we insert a node,
  // that will alter the result of the TreeWalker. So, we also need to offset the target index.
  (X.isMarker(n.firstChild) || // Or if there is only one node and a directive, it means the template's content
  // is *only* the directive. In that case, HTMLView.dispose() misses any nodes inserted by
  // the directive. Inserting a new node ensures proper disposal of nodes added by the directive.
  n.childNodes.length === 1 && e.length) && (n.insertBefore(document.createComment(""), n.firstChild), a = -1);
  const l = r.behaviorFactories;
  return r.release(), {
    fragment: n,
    viewBehaviorFactories: l,
    hostBehaviorFactories: s,
    targetOffset: a
  };
}
const Cr = document.createRange();
class _u {
  /**
   * Constructs an instance of HTMLView.
   * @param fragment - The html fragment that contains the nodes for this view.
   * @param behaviors - The behaviors to be applied to this view.
   */
  constructor(e, n) {
    this.fragment = e, this.behaviors = n, this.source = null, this.context = null, this.firstChild = e.firstChild, this.lastChild = e.lastChild;
  }
  /**
   * Appends the view's DOM nodes to the referenced node.
   * @param node - The parent node to append the view's DOM nodes to.
   */
  appendTo(e) {
    e.appendChild(this.fragment);
  }
  /**
   * Inserts the view's DOM nodes before the referenced node.
   * @param node - The node to insert the view's DOM before.
   */
  insertBefore(e) {
    if (this.fragment.hasChildNodes())
      e.parentNode.insertBefore(this.fragment, e);
    else {
      const n = this.lastChild;
      if (e.previousSibling === n)
        return;
      const r = e.parentNode;
      let s = this.firstChild, i;
      for (; s !== n; )
        i = s.nextSibling, r.insertBefore(s, e), s = i;
      r.insertBefore(n, e);
    }
  }
  /**
   * Removes the view's DOM nodes.
   * The nodes are not disposed and the view can later be re-inserted.
   */
  remove() {
    const e = this.fragment, n = this.lastChild;
    let r = this.firstChild, s;
    for (; r !== n; )
      s = r.nextSibling, e.appendChild(r), r = s;
    e.appendChild(n);
  }
  /**
   * Removes the view and unbinds its behaviors, disposing of DOM nodes afterward.
   * Once a view has been disposed, it cannot be inserted or bound again.
   */
  dispose() {
    const e = this.firstChild.parentNode, n = this.lastChild;
    let r = this.firstChild, s;
    for (; r !== n; )
      s = r.nextSibling, e.removeChild(r), r = s;
    e.removeChild(n);
    const i = this.behaviors, o = this.source;
    for (let a = 0, l = i.length; a < l; ++a)
      i[a].unbind(o);
  }
  /**
   * Binds a view's behaviors to its binding source.
   * @param source - The binding source for the view's binding behaviors.
   * @param context - The execution context to run the behaviors within.
   */
  bind(e, n) {
    const r = this.behaviors;
    if (this.source !== e)
      if (this.source !== null) {
        const s = this.source;
        this.source = e, this.context = n;
        for (let i = 0, o = r.length; i < o; ++i) {
          const a = r[i];
          a.unbind(s), a.bind(e, n);
        }
      } else {
        this.source = e, this.context = n;
        for (let s = 0, i = r.length; s < i; ++s)
          r[s].bind(e, n);
      }
  }
  /**
   * Unbinds a view's behaviors from its binding source.
   */
  unbind() {
    if (this.source === null)
      return;
    const e = this.behaviors, n = this.source;
    for (let r = 0, s = e.length; r < s; ++r)
      e[r].unbind(n);
    this.source = null;
  }
  /**
   * Efficiently disposes of a contiguous range of synthetic view instances.
   * @param views - A contiguous range of views to be disposed.
   */
  static disposeContiguousBatch(e) {
    if (e.length !== 0) {
      Cr.setStartBefore(e[0].firstChild), Cr.setEndAfter(e[e.length - 1].lastChild), Cr.deleteContents();
      for (let n = 0, r = e.length; n < r; ++n) {
        const s = e[n], i = s.behaviors, o = s.source;
        for (let a = 0, l = i.length; a < l; ++a)
          i[a].unbind(o);
      }
    }
  }
}
class pi {
  /**
   * Creates an instance of ViewTemplate.
   * @param html - The html representing what this template will instantiate, including placeholders for directives.
   * @param directives - The directives that will be connected to placeholders in the html.
   */
  constructor(e, n) {
    this.behaviorCount = 0, this.hasHostBehaviors = !1, this.fragment = null, this.targetOffset = 0, this.viewBehaviorFactories = null, this.hostBehaviorFactories = null, this.html = e, this.directives = n;
  }
  /**
   * Creates an HTMLView instance based on this template definition.
   * @param hostBindingTarget - The element that host behaviors will be bound to.
   */
  create(e) {
    if (this.fragment === null) {
      let c;
      const f = this.html;
      if (typeof f == "string") {
        c = document.createElement("template"), c.innerHTML = X.createHTML(f);
        const p = c.content.firstElementChild;
        p !== null && p.tagName === "TEMPLATE" && (c = p);
      } else
        c = f;
      const h = vu(c, this.directives);
      this.fragment = h.fragment, this.viewBehaviorFactories = h.viewBehaviorFactories, this.hostBehaviorFactories = h.hostBehaviorFactories, this.targetOffset = h.targetOffset, this.behaviorCount = this.viewBehaviorFactories.length + this.hostBehaviorFactories.length, this.hasHostBehaviors = this.hostBehaviorFactories.length > 0;
    }
    const n = this.fragment.cloneNode(!0), r = this.viewBehaviorFactories, s = new Array(this.behaviorCount), i = X.createTemplateWalker(n);
    let o = 0, a = this.targetOffset, l = i.nextNode();
    for (let c = r.length; o < c; ++o) {
      const f = r[o], h = f.targetIndex;
      for (; l !== null; )
        if (a === h) {
          s[o] = f.createBehavior(l);
          break;
        } else
          l = i.nextNode(), a++;
    }
    if (this.hasHostBehaviors) {
      const c = this.hostBehaviorFactories;
      for (let f = 0, h = c.length; f < h; ++f, ++o)
        s[o] = c[f].createBehavior(e);
    }
    return new _u(n, s);
  }
  /**
   * Creates an HTMLView from this template, binds it to the source, and then appends it to the host.
   * @param source - The data source to bind the template to.
   * @param host - The Element where the template will be rendered.
   * @param hostBindingTarget - An HTML element to target the host bindings at if different from the
   * host that the template is being attached to.
   */
  render(e, n, r) {
    typeof n == "string" && (n = document.getElementById(n)), r === void 0 && (r = n);
    const s = this.create(r);
    return s.bind(e, sn), s.appendTo(n), s;
  }
}
const yu = (
  /* eslint-disable-next-line no-control-regex */
  /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/
);
function Vt(t, ...e) {
  const n = [];
  let r = "";
  for (let s = 0, i = t.length - 1; s < i; ++s) {
    const o = t[s];
    let a = e[s];
    if (r += o, a instanceof pi) {
      const l = a;
      a = () => l;
    }
    if (typeof a == "function" && (a = new Ss(a)), a instanceof zo) {
      const l = yu.exec(o);
      l !== null && (a.targetName = l[2]);
    }
    a instanceof ws ? (r += a.createPlaceholder(n.length), n.push(a)) : r += a;
  }
  return r += t[t.length - 1], new pi(r, n);
}
class we {
  constructor() {
    this.targets = /* @__PURE__ */ new WeakSet();
  }
  /** @internal */
  addStylesTo(e) {
    this.targets.add(e);
  }
  /** @internal */
  removeStylesFrom(e) {
    this.targets.delete(e);
  }
  /** @internal */
  isAttachedTo(e) {
    return this.targets.has(e);
  }
  /**
   * Associates behaviors with this set of styles.
   * @param behaviors - The behaviors to associate.
   */
  withBehaviors(...e) {
    return this.behaviors = this.behaviors === null ? e : this.behaviors.concat(e), this;
  }
}
we.create = (() => {
  if (X.supportsAdoptedStyleSheets) {
    const t = /* @__PURE__ */ new Map();
    return (e) => (
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      new Cu(e, t)
    );
  }
  return (t) => new Au(t);
})();
function Es(t) {
  return t.map((e) => e instanceof we ? Es(e.styles) : [e]).reduce((e, n) => e.concat(n), []);
}
function Jo(t) {
  return t.map((e) => e instanceof we ? e.behaviors : null).reduce((e, n) => n === null ? e : (e === null && (e = []), e.concat(n)), null);
}
class Cu extends we {
  constructor(e, n) {
    super(), this.styles = e, this.styleSheetCache = n, this._styleSheets = void 0, this.behaviors = Jo(e);
  }
  get styleSheets() {
    if (this._styleSheets === void 0) {
      const e = this.styles, n = this.styleSheetCache;
      this._styleSheets = Es(e).map((r) => {
        if (r instanceof CSSStyleSheet)
          return r;
        let s = n.get(r);
        return s === void 0 && (s = new CSSStyleSheet(), s.replaceSync(r), n.set(r, s)), s;
      });
    }
    return this._styleSheets;
  }
  addStylesTo(e) {
    e.adoptedStyleSheets = [...e.adoptedStyleSheets, ...this.styleSheets], super.addStylesTo(e);
  }
  removeStylesFrom(e) {
    const n = this.styleSheets;
    e.adoptedStyleSheets = e.adoptedStyleSheets.filter((r) => n.indexOf(r) === -1), super.removeStylesFrom(e);
  }
}
let wu = 0;
function Su() {
  return `fast-style-class-${++wu}`;
}
class Au extends we {
  constructor(e) {
    super(), this.styles = e, this.behaviors = null, this.behaviors = Jo(e), this.styleSheets = Es(e), this.styleClass = Su();
  }
  addStylesTo(e) {
    const n = this.styleSheets, r = this.styleClass;
    e = this.normalizeTarget(e);
    for (let s = 0; s < n.length; s++) {
      const i = document.createElement("style");
      i.innerHTML = n[s], i.className = r, e.append(i);
    }
    super.addStylesTo(e);
  }
  removeStylesFrom(e) {
    e = this.normalizeTarget(e);
    const n = e.querySelectorAll(`.${this.styleClass}`);
    for (let r = 0, s = n.length; r < s; ++r)
      e.removeChild(n[r]);
    super.removeStylesFrom(e);
  }
  isAttachedTo(e) {
    return super.isAttachedTo(this.normalizeTarget(e));
  }
  normalizeTarget(e) {
    return e === document ? document.body : e;
  }
}
const Vn = Object.freeze({
  /**
   * Locates all attribute configurations associated with a type.
   */
  locate: Vo()
}), Eu = {
  toView(t) {
    return t ? "true" : "false";
  },
  fromView(t) {
    return !(t == null || t === "false" || t === !1 || t === 0);
  }
}, xs = {
  toView(t) {
    if (t == null)
      return null;
    const e = t * 1;
    return isNaN(e) ? null : e.toString();
  },
  fromView(t) {
    if (t == null)
      return null;
    const e = t * 1;
    return isNaN(e) ? null : e;
  }
};
class jn {
  /**
   * Creates an instance of AttributeDefinition.
   * @param Owner - The class constructor that owns this attribute.
   * @param name - The name of the property associated with the attribute.
   * @param attribute - The name of the attribute in HTML.
   * @param mode - The {@link AttributeMode} that describes the behavior of this attribute.
   * @param converter - A {@link ValueConverter} that integrates with the property getter/setter
   * to convert values to and from a DOM string.
   */
  constructor(e, n, r = n.toLowerCase(), s = "reflect", i) {
    this.guards = /* @__PURE__ */ new Set(), this.Owner = e, this.name = n, this.attribute = r, this.mode = s, this.converter = i, this.fieldName = `_${n}`, this.callbackName = `${n}Changed`, this.hasCallback = this.callbackName in e.prototype, s === "boolean" && i === void 0 && (this.converter = Eu);
  }
  /**
   * Sets the value of the attribute/property on the source element.
   * @param source - The source element to access.
   * @param value - The value to set the attribute/property to.
   */
  setValue(e, n) {
    const r = e[this.fieldName], s = this.converter;
    s !== void 0 && (n = s.fromView(n)), r !== n && (e[this.fieldName] = n, this.tryReflectToAttribute(e), this.hasCallback && e[this.callbackName](r, n), e.$fastController.notify(this.name));
  }
  /**
   * Gets the value of the attribute/property on the source element.
   * @param source - The source element to access.
   */
  getValue(e) {
    return de.track(e, this.name), e[this.fieldName];
  }
  /** @internal */
  onAttributeChangedCallback(e, n) {
    this.guards.has(e) || (this.guards.add(e), this.setValue(e, n), this.guards.delete(e));
  }
  tryReflectToAttribute(e) {
    const n = this.mode, r = this.guards;
    r.has(e) || n === "fromView" || X.queueUpdate(() => {
      r.add(e);
      const s = e[this.fieldName];
      switch (n) {
        case "reflect":
          const i = this.converter;
          X.setAttribute(e, this.attribute, i !== void 0 ? i.toView(s) : s);
          break;
        case "boolean":
          X.setBooleanAttribute(e, this.attribute, s);
          break;
      }
      r.delete(e);
    });
  }
  /**
   * Collects all attribute definitions associated with the owner.
   * @param Owner - The class constructor to collect attribute for.
   * @param attributeLists - Any existing attributes to collect and merge with those associated with the owner.
   * @internal
   */
  static collect(e, ...n) {
    const r = [];
    n.push(Vn.locate(e));
    for (let s = 0, i = n.length; s < i; ++s) {
      const o = n[s];
      if (o !== void 0)
        for (let a = 0, l = o.length; a < l; ++a) {
          const c = o[a];
          typeof c == "string" ? r.push(new jn(e, c)) : r.push(new jn(e, c.property, c.attribute, c.mode, c.converter));
        }
    }
    return r;
  }
}
function F(t, e) {
  let n;
  function r(s, i) {
    arguments.length > 1 && (n.property = i), Vn.locate(s.constructor).push(n);
  }
  if (arguments.length > 1) {
    n = {}, r(t, e);
    return;
  }
  return n = t === void 0 ? {} : t, r;
}
const gi = { mode: "open" }, mi = {}, Yr = hn.getById(4, () => {
  const t = /* @__PURE__ */ new Map();
  return Object.freeze({
    register(e) {
      return t.has(e.type) ? !1 : (t.set(e.type, e), !0);
    },
    getByType(e) {
      return t.get(e);
    }
  });
});
class nr {
  /**
   * Creates an instance of FASTElementDefinition.
   * @param type - The type this definition is being created for.
   * @param nameOrConfig - The name of the element to define or a config object
   * that describes the element to define.
   */
  constructor(e, n = e.definition) {
    typeof n == "string" && (n = { name: n }), this.type = e, this.name = n.name, this.template = n.template;
    const r = jn.collect(e, n.attributes), s = new Array(r.length), i = {}, o = {};
    for (let a = 0, l = r.length; a < l; ++a) {
      const c = r[a];
      s[a] = c.attribute, i[c.name] = c, o[c.attribute] = c;
    }
    this.attributes = r, this.observedAttributes = s, this.propertyLookup = i, this.attributeLookup = o, this.shadowOptions = n.shadowOptions === void 0 ? gi : n.shadowOptions === null ? void 0 : Object.assign(Object.assign({}, gi), n.shadowOptions), this.elementOptions = n.elementOptions === void 0 ? mi : Object.assign(Object.assign({}, mi), n.elementOptions), this.styles = n.styles === void 0 ? void 0 : Array.isArray(n.styles) ? we.create(n.styles) : n.styles instanceof we ? n.styles : we.create([n.styles]);
  }
  /**
   * Indicates if this element has been defined in at least one registry.
   */
  get isDefined() {
    return !!Yr.getByType(this.type);
  }
  /**
   * Defines a custom element based on this definition.
   * @param registry - The element registry to define the element in.
   */
  define(e = customElements) {
    const n = this.type;
    if (Yr.register(this)) {
      const r = this.attributes, s = n.prototype;
      for (let i = 0, o = r.length; i < o; ++i)
        de.defineProperty(s, r[i]);
      Reflect.defineProperty(n, "observedAttributes", {
        value: this.observedAttributes,
        enumerable: !0
      });
    }
    return e.get(this.name) || e.define(this.name, n, this.elementOptions), this;
  }
}
nr.forType = Yr.getByType;
const Xo = /* @__PURE__ */ new WeakMap(), xu = {
  bubbles: !0,
  composed: !0,
  cancelable: !0
};
function wr(t) {
  return t.shadowRoot || Xo.get(t) || null;
}
class Ps extends Ho {
  /**
   * Creates a Controller to control the specified element.
   * @param element - The element to be controlled by this controller.
   * @param definition - The element definition metadata that instructs this
   * controller in how to handle rendering and other platform integrations.
   * @internal
   */
  constructor(e, n) {
    super(e), this.boundObservables = null, this.behaviors = null, this.needsInitialization = !0, this._template = null, this._styles = null, this._isConnected = !1, this.$fastController = this, this.view = null, this.element = e, this.definition = n;
    const r = n.shadowOptions;
    if (r !== void 0) {
      const i = e.attachShadow(r);
      r.mode === "closed" && Xo.set(e, i);
    }
    const s = de.getAccessors(e);
    if (s.length > 0) {
      const i = this.boundObservables = /* @__PURE__ */ Object.create(null);
      for (let o = 0, a = s.length; o < a; ++o) {
        const l = s[o].name, c = e[l];
        c !== void 0 && (delete e[l], i[l] = c);
      }
    }
  }
  /**
   * Indicates whether or not the custom element has been
   * connected to the document.
   */
  get isConnected() {
    return de.track(this, "isConnected"), this._isConnected;
  }
  setIsConnected(e) {
    this._isConnected = e, de.notify(this, "isConnected");
  }
  /**
   * Gets/sets the template used to render the component.
   * @remarks
   * This value can only be accurately read after connect but can be set at any time.
   */
  get template() {
    return this._template;
  }
  set template(e) {
    this._template !== e && (this._template = e, this.needsInitialization || this.renderTemplate(e));
  }
  /**
   * Gets/sets the primary styles used for the component.
   * @remarks
   * This value can only be accurately read after connect but can be set at any time.
   */
  get styles() {
    return this._styles;
  }
  set styles(e) {
    this._styles !== e && (this._styles !== null && this.removeStyles(this._styles), this._styles = e, !this.needsInitialization && e !== null && this.addStyles(e));
  }
  /**
   * Adds styles to this element. Providing an HTMLStyleElement will attach the element instance to the shadowRoot.
   * @param styles - The styles to add.
   */
  addStyles(e) {
    const n = wr(this.element) || this.element.getRootNode();
    if (e instanceof HTMLStyleElement)
      n.append(e);
    else if (!e.isAttachedTo(n)) {
      const r = e.behaviors;
      e.addStylesTo(n), r !== null && this.addBehaviors(r);
    }
  }
  /**
   * Removes styles from this element. Providing an HTMLStyleElement will detach the element instance from the shadowRoot.
   * @param styles - the styles to remove.
   */
  removeStyles(e) {
    const n = wr(this.element) || this.element.getRootNode();
    if (e instanceof HTMLStyleElement)
      n.removeChild(e);
    else if (e.isAttachedTo(n)) {
      const r = e.behaviors;
      e.removeStylesFrom(n), r !== null && this.removeBehaviors(r);
    }
  }
  /**
   * Adds behaviors to this element.
   * @param behaviors - The behaviors to add.
   */
  addBehaviors(e) {
    const n = this.behaviors || (this.behaviors = /* @__PURE__ */ new Map()), r = e.length, s = [];
    for (let i = 0; i < r; ++i) {
      const o = e[i];
      n.has(o) ? n.set(o, n.get(o) + 1) : (n.set(o, 1), s.push(o));
    }
    if (this._isConnected) {
      const i = this.element;
      for (let o = 0; o < s.length; ++o)
        s[o].bind(i, sn);
    }
  }
  /**
   * Removes behaviors from this element.
   * @param behaviors - The behaviors to remove.
   * @param force - Forces unbinding of behaviors.
   */
  removeBehaviors(e, n = !1) {
    const r = this.behaviors;
    if (r === null)
      return;
    const s = e.length, i = [];
    for (let o = 0; o < s; ++o) {
      const a = e[o];
      if (r.has(a)) {
        const l = r.get(a) - 1;
        l === 0 || n ? r.delete(a) && i.push(a) : r.set(a, l);
      }
    }
    if (this._isConnected) {
      const o = this.element;
      for (let a = 0; a < i.length; ++a)
        i[a].unbind(o);
    }
  }
  /**
   * Runs connected lifecycle behavior on the associated element.
   */
  onConnectedCallback() {
    if (this._isConnected)
      return;
    const e = this.element;
    this.needsInitialization ? this.finishInitialization() : this.view !== null && this.view.bind(e, sn);
    const n = this.behaviors;
    if (n !== null)
      for (const [r] of n)
        r.bind(e, sn);
    this.setIsConnected(!0);
  }
  /**
   * Runs disconnected lifecycle behavior on the associated element.
   */
  onDisconnectedCallback() {
    if (!this._isConnected)
      return;
    this.setIsConnected(!1);
    const e = this.view;
    e !== null && e.unbind();
    const n = this.behaviors;
    if (n !== null) {
      const r = this.element;
      for (const [s] of n)
        s.unbind(r);
    }
  }
  /**
   * Runs the attribute changed callback for the associated element.
   * @param name - The name of the attribute that changed.
   * @param oldValue - The previous value of the attribute.
   * @param newValue - The new value of the attribute.
   */
  onAttributeChangedCallback(e, n, r) {
    const s = this.definition.attributeLookup[e];
    s !== void 0 && s.onAttributeChangedCallback(this.element, r);
  }
  /**
   * Emits a custom HTML event.
   * @param type - The type name of the event.
   * @param detail - The event detail object to send with the event.
   * @param options - The event options. By default bubbles and composed.
   * @remarks
   * Only emits events if connected.
   */
  emit(e, n, r) {
    return this._isConnected ? this.element.dispatchEvent(new CustomEvent(e, Object.assign(Object.assign({ detail: n }, xu), r))) : !1;
  }
  finishInitialization() {
    const e = this.element, n = this.boundObservables;
    if (n !== null) {
      const s = Object.keys(n);
      for (let i = 0, o = s.length; i < o; ++i) {
        const a = s[i];
        e[a] = n[a];
      }
      this.boundObservables = null;
    }
    const r = this.definition;
    this._template === null && (this.element.resolveTemplate ? this._template = this.element.resolveTemplate() : r.template && (this._template = r.template || null)), this._template !== null && this.renderTemplate(this._template), this._styles === null && (this.element.resolveStyles ? this._styles = this.element.resolveStyles() : r.styles && (this._styles = r.styles || null)), this._styles !== null && this.addStyles(this._styles), this.needsInitialization = !1;
  }
  renderTemplate(e) {
    const n = this.element, r = wr(n) || n;
    this.view !== null ? (this.view.dispose(), this.view = null) : this.needsInitialization || X.removeChildNodes(r), e && (this.view = e.render(n, r, n));
  }
  /**
   * Locates or creates a controller for the specified element.
   * @param element - The element to return the controller for.
   * @remarks
   * The specified element must have a {@link FASTElementDefinition}
   * registered either through the use of the {@link customElement}
   * decorator or a call to `FASTElement.define`.
   */
  static forCustomElement(e) {
    const n = e.$fastController;
    if (n !== void 0)
      return n;
    const r = nr.forType(e.constructor);
    if (r === void 0)
      throw new Error("Missing FASTElement definition.");
    return e.$fastController = new Ps(e, r);
  }
}
function bi(t) {
  return class extends t {
    constructor() {
      super(), Ps.forCustomElement(this);
    }
    $emit(e, n, r) {
      return this.$fastController.emit(e, n, r);
    }
    connectedCallback() {
      this.$fastController.onConnectedCallback();
    }
    disconnectedCallback() {
      this.$fastController.onDisconnectedCallback();
    }
    attributeChangedCallback(e, n, r) {
      this.$fastController.onAttributeChangedCallback(e, n, r);
    }
  };
}
const rr = Object.assign(bi(HTMLElement), {
  /**
   * Creates a new FASTElement base class inherited from the
   * provided base type.
   * @param BaseType - The base element type to inherit from.
   */
  from(t) {
    return bi(t);
  },
  /**
   * Defines a platform custom element based on the provided type and definition.
   * @param type - The custom element type to define.
   * @param nameOrDef - The name of the element to define or a definition object
   * that describes the element to define.
   */
  define(t, e) {
    return new nr(t, e).define().type;
  }
});
class Yo {
  /**
   * Creates a CSS fragment to interpolate into the CSS document.
   * @returns - the string to interpolate into CSS
   */
  createCSS() {
    return "";
  }
  /**
   * Creates a behavior to bind to the host element.
   * @returns - the behavior to bind to the host element, or undefined.
   */
  createBehavior() {
  }
}
function Pu(t, e) {
  const n = [];
  let r = "";
  const s = [];
  for (let i = 0, o = t.length - 1; i < o; ++i) {
    r += t[i];
    let a = e[i];
    if (a instanceof Yo) {
      const l = a.createBehavior();
      a = a.createCSS(), l && s.push(l);
    }
    a instanceof we || a instanceof CSSStyleSheet ? (r.trim() !== "" && (n.push(r), r = ""), n.push(a)) : r += a;
  }
  return r += t[t.length - 1], r.trim() !== "" && n.push(r), {
    styles: n,
    behaviors: s
  };
}
function jt(t, ...e) {
  const { styles: n, behaviors: r } = Pu(t, e), s = we.create(n);
  return r.length && s.withBehaviors(...r), s;
}
class Ou {
  /**
   * Creates an instance of RefBehavior.
   * @param target - The element to reference.
   * @param propertyName - The name of the property to assign the reference to.
   */
  constructor(e, n) {
    this.target = e, this.propertyName = n;
  }
  /**
   * Bind this behavior to the source.
   * @param source - The source to bind to.
   * @param context - The execution context that the binding is operating within.
   */
  bind(e) {
    e[this.propertyName] = this.target;
  }
  /**
   * Unbinds this behavior from the source.
   * @param source - The source to unbind from.
   */
  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
  unbind() {
  }
}
function Je(t) {
  return new qo("fast-ref", Ou, t);
}
class Du {
  /**
   * Creates an instance of NodeObservationBehavior.
   * @param target - The target to assign the nodes property on.
   * @param options - The options to use in configuring node observation.
   */
  constructor(e, n) {
    this.target = e, this.options = n, this.source = null;
  }
  /**
   * Bind this behavior to the source.
   * @param source - The source to bind to.
   * @param context - The execution context that the binding is operating within.
   */
  bind(e) {
    const n = this.options.property;
    this.shouldUpdate = de.getAccessors(e).some((r) => r.name === n), this.source = e, this.updateTarget(this.computeNodes()), this.shouldUpdate && this.observe();
  }
  /**
   * Unbinds this behavior from the source.
   * @param source - The source to unbind from.
   */
  unbind() {
    this.updateTarget(nn), this.source = null, this.shouldUpdate && this.disconnect();
  }
  /** @internal */
  handleEvent() {
    this.updateTarget(this.computeNodes());
  }
  computeNodes() {
    let e = this.getNodes();
    return this.options.filter !== void 0 && (e = e.filter(this.options.filter)), e;
  }
  updateTarget(e) {
    this.source[this.options.property] = e;
  }
}
class Ru extends Du {
  /**
   * Creates an instance of SlottedBehavior.
   * @param target - The slot element target to observe.
   * @param options - The options to use when observing the slot.
   */
  constructor(e, n) {
    super(e, n);
  }
  /**
   * Begins observation of the nodes.
   */
  observe() {
    this.target.addEventListener("slotchange", this);
  }
  /**
   * Disconnects observation of the nodes.
   */
  disconnect() {
    this.target.removeEventListener("slotchange", this);
  }
  /**
   * Retrieves the nodes that should be assigned to the target.
   */
  getNodes() {
    return this.target.assignedNodes(this.options);
  }
}
function Qo(t) {
  return typeof t == "string" && (t = { property: t }), new qo("fast-slotted", Ru, t);
}
class Zo {
  handleStartContentChange() {
    this.startContainer.classList.toggle("start", this.start.assignedNodes().length > 0);
  }
  handleEndContentChange() {
    this.endContainer.classList.toggle("end", this.end.assignedNodes().length > 0);
  }
}
const Ko = (t, e) => Vt`
    <span
        part="end"
        ${Je("endContainer")}
        class=${(n) => e.end ? "end" : void 0}
    >
        <slot name="end" ${Je("end")} @slotchange="${(n) => n.handleEndContentChange()}">
            ${e.end || ""}
        </slot>
    </span>
`, ea = (t, e) => Vt`
    <span
        part="start"
        ${Je("startContainer")}
        class="${(n) => e.start ? "start" : void 0}"
    >
        <slot
            name="start"
            ${Je("start")}
            @slotchange="${(n) => n.handleStartContentChange()}"
        >
            ${e.start || ""}
        </slot>
    </span>
`;
Vt`
    <span part="end" ${Je("endContainer")}>
        <slot
            name="end"
            ${Je("end")}
            @slotchange="${(t) => t.handleEndContentChange()}"
        ></slot>
    </span>
`;
Vt`
    <span part="start" ${Je("startContainer")}>
        <slot
            name="start"
            ${Je("start")}
            @slotchange="${(t) => t.handleStartContentChange()}"
        ></slot>
    </span>
`;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function $(t, e, n, r) {
  var s = arguments.length, i = s < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, n) : r, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    i = Reflect.decorate(t, e, n, r);
  else
    for (var a = t.length - 1; a >= 0; a--)
      (o = t[a]) && (i = (s < 3 ? o(i) : s > 3 ? o(e, n, i) : o(e, n)) || i);
  return s > 3 && i && Object.defineProperty(e, n, i), i;
}
const Sr = /* @__PURE__ */ new Map();
"metadata" in Reflect || (Reflect.metadata = function(t, e) {
  return function(n) {
    Reflect.defineMetadata(t, e, n);
  };
}, Reflect.defineMetadata = function(t, e, n) {
  let r = Sr.get(n);
  r === void 0 && Sr.set(n, r = /* @__PURE__ */ new Map()), r.set(t, e);
}, Reflect.getOwnMetadata = function(t, e) {
  const n = Sr.get(e);
  if (n !== void 0)
    return n.get(t);
});
class Tu {
  /**
   *
   * @param container - The container to create resolvers for.
   * @param key - The key to register resolvers under.
   */
  constructor(e, n) {
    this.container = e, this.key = n;
  }
  /**
   * Creates a resolver for an existing object instance.
   * @param value - The instance to resolve.
   * @returns The resolver.
   */
  instance(e) {
    return this.registerResolver(0, e);
  }
  /**
   * Creates a resolver that enforces a singleton lifetime.
   * @param value - The type to create and cache the singleton for.
   * @returns The resolver.
   */
  singleton(e) {
    return this.registerResolver(1, e);
  }
  /**
   * Creates a resolver that creates a new instance for every dependency request.
   * @param value - The type to create instances of.
   * @returns - The resolver.
   */
  transient(e) {
    return this.registerResolver(2, e);
  }
  /**
   * Creates a resolver that invokes a callback function for every dependency resolution
   * request, allowing custom logic to return the dependency.
   * @param value - The callback to call during resolution.
   * @returns The resolver.
   */
  callback(e) {
    return this.registerResolver(3, e);
  }
  /**
   * Creates a resolver that invokes a callback function the first time that a dependency
   * resolution is requested. The returned value is then cached and provided for all
   * subsequent requests.
   * @param value - The callback to call during the first resolution.
   * @returns The resolver.
   */
  cachedCallback(e) {
    return this.registerResolver(3, na(e));
  }
  /**
   * Aliases the current key to a different key.
   * @param destinationKey - The key to point the alias to.
   * @returns The resolver.
   */
  aliasTo(e) {
    return this.registerResolver(5, e);
  }
  registerResolver(e, n) {
    const { container: r, key: s } = this;
    return this.container = this.key = void 0, r.registerResolver(s, new Re(s, e, n));
  }
}
function qt(t) {
  const e = t.slice(), n = Object.keys(t), r = n.length;
  let s;
  for (let i = 0; i < r; ++i)
    s = n[i], ra(s) || (e[s] = t[s]);
  return e;
}
const Iu = Object.freeze({
  /**
   * Disables auto-registration and throws for all un-registered dependencies.
   * @param key - The key to create the resolver for.
   */
  none(t) {
    throw Error(`${t.toString()} not registered, did you forget to add @singleton()?`);
  },
  /**
   * Provides default singleton resolution behavior during auto-registration.
   * @param key - The key to create the resolver for.
   * @returns The resolver.
   */
  singleton(t) {
    return new Re(t, 1, t);
  },
  /**
   * Provides default transient resolution behavior during auto-registration.
   * @param key - The key to create the resolver for.
   * @returns The resolver.
   */
  transient(t) {
    return new Re(t, 2, t);
  }
}), Ar = Object.freeze({
  /**
   * The default configuration used when creating a DOM-disconnected container.
   * @remarks
   * The default creates a root container, with no parent container. It does not handle
   * owner requests and it uses singleton resolution behavior for auto-registration.
   */
  default: Object.freeze({
    parentLocator: () => null,
    responsibleForOwnerRequests: !1,
    defaultResolver: Iu.singleton
  })
}), vi = /* @__PURE__ */ new Map();
function _i(t) {
  return (e) => Reflect.getOwnMetadata(t, e);
}
let yi = null;
const ne = Object.freeze({
  /**
   * Creates a new dependency injection container.
   * @param config - The configuration for the container.
   * @returns A newly created dependency injection container.
   */
  createContainer(t) {
    return new on(null, Object.assign({}, Ar.default, t));
  },
  /**
   * Finds the dependency injection container responsible for providing dependencies
   * to the specified node.
   * @param node - The node to find the responsible container for.
   * @returns The container responsible for providing dependencies to the node.
   * @remarks
   * This will be the same as the parent container if the specified node
   * does not itself host a container configured with responsibleForOwnerRequests.
   */
  findResponsibleContainer(t) {
    const e = t.$$container$$;
    return e && e.responsibleForOwnerRequests ? e : ne.findParentContainer(t);
  },
  /**
   * Find the dependency injection container up the DOM tree from this node.
   * @param node - The node to find the parent container for.
   * @returns The parent container of this node.
   * @remarks
   * This will be the same as the responsible container if the specified node
   * does not itself host a container configured with responsibleForOwnerRequests.
   */
  findParentContainer(t) {
    const e = new CustomEvent(ta, {
      bubbles: !0,
      composed: !0,
      cancelable: !0,
      detail: { container: void 0 }
    });
    return t.dispatchEvent(e), e.detail.container || ne.getOrCreateDOMContainer();
  },
  /**
   * Returns a dependency injection container if one is explicitly owned by the specified
   * node. If one is not owned, then a new container is created and assigned to the node.
   * @param node - The node to find or create the container for.
   * @param config - The configuration for the container if one needs to be created.
   * @returns The located or created container.
   * @remarks
   * This API does not search for a responsible or parent container. It looks only for a container
   * directly defined on the specified node and creates one at that location if one does not
   * already exist.
   */
  getOrCreateDOMContainer(t, e) {
    return t ? t.$$container$$ || new on(t, Object.assign({}, Ar.default, e, {
      parentLocator: ne.findParentContainer
    })) : yi || (yi = new on(null, Object.assign({}, Ar.default, e, {
      parentLocator: () => null
    })));
  },
  /**
   * Gets the "design:paramtypes" metadata for the specified type.
   * @param Type - The type to get the metadata for.
   * @returns The metadata array or undefined if no metadata is found.
   */
  getDesignParamtypes: _i("design:paramtypes"),
  /**
   * Gets the "di:paramtypes" metadata for the specified type.
   * @param Type - The type to get the metadata for.
   * @returns The metadata array or undefined if no metadata is found.
   */
  getAnnotationParamtypes: _i("di:paramtypes"),
  /**
   *
   * @param Type - Gets the "di:paramtypes" metadata for the specified type. If none is found,
   * an empty metadata array is created and added.
   * @returns The metadata array.
   */
  getOrCreateAnnotationParamTypes(t) {
    let e = this.getAnnotationParamtypes(t);
    return e === void 0 && Reflect.defineMetadata("di:paramtypes", e = [], t), e;
  },
  /**
   * Gets the dependency keys representing what is needed to instantiate the specified type.
   * @param Type - The type to get the dependencies for.
   * @returns An array of dependency keys.
   */
  getDependencies(t) {
    let e = vi.get(t);
    if (e === void 0) {
      const n = t.inject;
      if (n === void 0) {
        const r = ne.getDesignParamtypes(t), s = ne.getAnnotationParamtypes(t);
        if (r === void 0)
          if (s === void 0) {
            const i = Object.getPrototypeOf(t);
            typeof i == "function" && i !== Function.prototype ? e = qt(ne.getDependencies(i)) : e = [];
          } else
            e = qt(s);
        else if (s === void 0)
          e = qt(r);
        else {
          e = qt(r);
          let i = s.length, o;
          for (let c = 0; c < i; ++c)
            o = s[c], o !== void 0 && (e[c] = o);
          const a = Object.keys(s);
          i = a.length;
          let l;
          for (let c = 0; c < i; ++c)
            l = a[c], ra(l) || (e[l] = s[l]);
        }
      } else
        e = qt(n);
      vi.set(t, e);
    }
    return e;
  },
  /**
   * Defines a property on a web component class. The value of this property will
   * be resolved from the dependency injection container responsible for the element
   * instance, based on where it is connected in the DOM.
   * @param target - The target to define the property on.
   * @param propertyName - The name of the property to define.
   * @param key - The dependency injection key.
   * @param respectConnection - Indicates whether or not to update the property value if the
   * hosting component is disconnected and then re-connected at a different location in the DOM.
   * @remarks
   * The respectConnection option is only applicable to elements that descend from FASTElement.
   */
  defineProperty(t, e, n, r = !1) {
    const s = `$di_${e}`;
    Reflect.defineProperty(t, e, {
      get: function() {
        let i = this[s];
        if (i === void 0 && (i = (this instanceof HTMLElement ? ne.findResponsibleContainer(this) : ne.getOrCreateDOMContainer()).get(n), this[s] = i, r && this instanceof rr)) {
          const a = this.$fastController, l = () => {
            const f = ne.findResponsibleContainer(this).get(n), h = this[s];
            f !== h && (this[s] = i, a.notify(e));
          };
          a.subscribe({ handleChange: l }, "isConnected");
        }
        return i;
      }
    });
  },
  /**
   * Creates a dependency injection key.
   * @param nameConfigOrCallback - A friendly name for the key or a lambda that configures a
   * default resolution for the dependency.
   * @param configuror - If a friendly name was provided for the first parameter, then an optional
   * lambda that configures a default resolution for the dependency can be provided second.
   * @returns The created key.
   * @remarks
   * The created key can be used as a property decorator or constructor parameter decorator,
   * in addition to its standard use in an inject array or through direct container APIs.
   */
  createInterface(t, e) {
    const n = typeof t == "function" ? t : e, r = typeof t == "string" ? t : t && "friendlyName" in t && t.friendlyName || Ai, s = typeof t == "string" ? !1 : t && "respectConnection" in t && t.respectConnection || !1, i = function(o, a, l) {
      if (o == null || new.target !== void 0)
        throw new Error(`No registration for interface: '${i.friendlyName}'`);
      if (a)
        ne.defineProperty(o, a, i, s);
      else {
        const c = ne.getOrCreateAnnotationParamTypes(o);
        c[l] = i;
      }
    };
    return i.$isInterface = !0, i.friendlyName = r ?? "(anonymous)", n != null && (i.register = function(o, a) {
      return n(new Tu(o, a ?? i));
    }), i.toString = function() {
      return `InterfaceSymbol<${i.friendlyName}>`;
    }, i;
  },
  /**
   * A decorator that specifies what to inject into its target.
   * @param dependencies - The dependencies to inject.
   * @returns The decorator to be applied to the target class.
   * @remarks
   * The decorator can be used to decorate a class, listing all of the classes dependencies.
   * Or it can be used to decorate a constructor paramter, indicating what to inject for that
   * parameter.
   * Or it can be used for a web component property, indicating what that property should resolve to.
   */
  inject(...t) {
    return function(e, n, r) {
      if (typeof r == "number") {
        const s = ne.getOrCreateAnnotationParamTypes(e), i = t[0];
        i !== void 0 && (s[r] = i);
      } else if (n)
        ne.defineProperty(e, n, t[0]);
      else {
        const s = r ? ne.getOrCreateAnnotationParamTypes(r.value) : ne.getOrCreateAnnotationParamTypes(e);
        let i;
        for (let o = 0; o < t.length; ++o)
          i = t[o], i !== void 0 && (s[o] = i);
      }
    };
  },
  /**
   * Registers the `target` class as a transient dependency; each time the dependency is resolved
   * a new instance will be created.
   *
   * @param target - The class / constructor function to register as transient.
   * @returns The same class, with a static `register` method that takes a container and returns the appropriate resolver.
   *
   * @example
   * On an existing class
   * ```ts
   * class Foo { }
   * DI.transient(Foo);
   * ```
   *
   * @example
   * Inline declaration
   *
   * ```ts
   * const Foo = DI.transient(class { });
   * // Foo is now strongly typed with register
   * Foo.register(container);
   * ```
   *
   * @public
   */
  transient(t) {
    return t.register = function(n) {
      return gn.transient(t, t).register(n);
    }, t.registerInRequestor = !1, t;
  },
  /**
   * Registers the `target` class as a singleton dependency; the class will only be created once. Each
   * consecutive time the dependency is resolved, the same instance will be returned.
   *
   * @param target - The class / constructor function to register as a singleton.
   * @returns The same class, with a static `register` method that takes a container and returns the appropriate resolver.
   * @example
   * On an existing class
   * ```ts
   * class Foo { }
   * DI.singleton(Foo);
   * ```
   *
   * @example
   * Inline declaration
   * ```ts
   * const Foo = DI.singleton(class { });
   * // Foo is now strongly typed with register
   * Foo.register(container);
   * ```
   *
   * @public
   */
  singleton(t, e = Nu) {
    return t.register = function(r) {
      return gn.singleton(t, t).register(r);
    }, t.registerInRequestor = e.scoped, t;
  }
}), Mu = ne.createInterface("Container");
ne.inject;
const Nu = { scoped: !1 };
class Re {
  constructor(e, n, r) {
    this.key = e, this.strategy = n, this.state = r, this.resolving = !1;
  }
  get $isResolver() {
    return !0;
  }
  register(e) {
    return e.registerResolver(this.key, this);
  }
  resolve(e, n) {
    switch (this.strategy) {
      case 0:
        return this.state;
      case 1: {
        if (this.resolving)
          throw new Error(`Cyclic dependency found: ${this.state.name}`);
        return this.resolving = !0, this.state = e.getFactory(this.state).construct(n), this.strategy = 0, this.resolving = !1, this.state;
      }
      case 2: {
        const r = e.getFactory(this.state);
        if (r === null)
          throw new Error(`Resolver for ${String(this.key)} returned a null factory`);
        return r.construct(n);
      }
      case 3:
        return this.state(e, n, this);
      case 4:
        return this.state[0].resolve(e, n);
      case 5:
        return n.get(this.state);
      default:
        throw new Error(`Invalid resolver strategy specified: ${this.strategy}.`);
    }
  }
  getFactory(e) {
    var n, r, s;
    switch (this.strategy) {
      case 1:
      case 2:
        return e.getFactory(this.state);
      case 5:
        return (s = (r = (n = e.getResolver(this.state)) === null || n === void 0 ? void 0 : n.getFactory) === null || r === void 0 ? void 0 : r.call(n, e)) !== null && s !== void 0 ? s : null;
      default:
        return null;
    }
  }
}
function Ci(t) {
  return this.get(t);
}
function $u(t, e) {
  return e(t);
}
class ku {
  constructor(e, n) {
    this.Type = e, this.dependencies = n, this.transformers = null;
  }
  construct(e, n) {
    let r;
    return n === void 0 ? r = new this.Type(...this.dependencies.map(Ci, e)) : r = new this.Type(...this.dependencies.map(Ci, e), ...n), this.transformers == null ? r : this.transformers.reduce($u, r);
  }
  registerTransformer(e) {
    (this.transformers || (this.transformers = [])).push(e);
  }
}
const Fu = {
  $isResolver: !0,
  resolve(t, e) {
    return e;
  }
};
function Mn(t) {
  return typeof t.register == "function";
}
function Lu(t) {
  return Mn(t) && typeof t.registerInRequestor == "boolean";
}
function wi(t) {
  return Lu(t) && t.registerInRequestor;
}
function Bu(t) {
  return t.prototype !== void 0;
}
const Uu = /* @__PURE__ */ new Set([
  "Array",
  "ArrayBuffer",
  "Boolean",
  "DataView",
  "Date",
  "Error",
  "EvalError",
  "Float32Array",
  "Float64Array",
  "Function",
  "Int8Array",
  "Int16Array",
  "Int32Array",
  "Map",
  "Number",
  "Object",
  "Promise",
  "RangeError",
  "ReferenceError",
  "RegExp",
  "Set",
  "SharedArrayBuffer",
  "String",
  "SyntaxError",
  "TypeError",
  "Uint8Array",
  "Uint8ClampedArray",
  "Uint16Array",
  "Uint32Array",
  "URIError",
  "WeakMap",
  "WeakSet"
]), ta = "__DI_LOCATE_PARENT__", Er = /* @__PURE__ */ new Map();
class on {
  constructor(e, n) {
    this.owner = e, this.config = n, this._parent = void 0, this.registerDepth = 0, this.context = null, e !== null && (e.$$container$$ = this), this.resolvers = /* @__PURE__ */ new Map(), this.resolvers.set(Mu, Fu), e instanceof Node && e.addEventListener(ta, (r) => {
      r.composedPath()[0] !== this.owner && (r.detail.container = this, r.stopImmediatePropagation());
    });
  }
  get parent() {
    return this._parent === void 0 && (this._parent = this.config.parentLocator(this.owner)), this._parent;
  }
  get depth() {
    return this.parent === null ? 0 : this.parent.depth + 1;
  }
  get responsibleForOwnerRequests() {
    return this.config.responsibleForOwnerRequests;
  }
  registerWithContext(e, ...n) {
    return this.context = e, this.register(...n), this.context = null, this;
  }
  register(...e) {
    if (++this.registerDepth === 100)
      throw new Error("Unable to autoregister dependency");
    let n, r, s, i, o;
    const a = this.context;
    for (let l = 0, c = e.length; l < c; ++l)
      if (n = e[l], !!Ei(n))
        if (Mn(n))
          n.register(this, a);
        else if (Bu(n))
          gn.singleton(n, n).register(this);
        else
          for (r = Object.keys(n), i = 0, o = r.length; i < o; ++i)
            s = n[r[i]], Ei(s) && (Mn(s) ? s.register(this, a) : this.register(s));
    return --this.registerDepth, this;
  }
  registerResolver(e, n) {
    En(e);
    const r = this.resolvers, s = r.get(e);
    return s == null ? r.set(e, n) : s instanceof Re && s.strategy === 4 ? s.state.push(n) : r.set(e, new Re(e, 4, [s, n])), n;
  }
  registerTransformer(e, n) {
    const r = this.getResolver(e);
    if (r == null)
      return !1;
    if (r.getFactory) {
      const s = r.getFactory(this);
      return s == null ? !1 : (s.registerTransformer(n), !0);
    }
    return !1;
  }
  getResolver(e, n = !0) {
    if (En(e), e.resolve !== void 0)
      return e;
    let r = this, s;
    for (; r != null; )
      if (s = r.resolvers.get(e), s == null) {
        if (r.parent == null) {
          const i = wi(e) ? this : r;
          return n ? this.jitRegister(e, i) : null;
        }
        r = r.parent;
      } else
        return s;
    return null;
  }
  has(e, n = !1) {
    return this.resolvers.has(e) ? !0 : n && this.parent != null ? this.parent.has(e, !0) : !1;
  }
  get(e) {
    if (En(e), e.$isResolver)
      return e.resolve(this, this);
    let n = this, r;
    for (; n != null; )
      if (r = n.resolvers.get(e), r == null) {
        if (n.parent == null) {
          const s = wi(e) ? this : n;
          return r = this.jitRegister(e, s), r.resolve(n, this);
        }
        n = n.parent;
      } else
        return r.resolve(n, this);
    throw new Error(`Unable to resolve key: ${e}`);
  }
  getAll(e, n = !1) {
    En(e);
    const r = this;
    let s = r, i;
    if (n) {
      let o = nn;
      for (; s != null; )
        i = s.resolvers.get(e), i != null && (o = o.concat(
          /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
          Si(i, s, r)
        )), s = s.parent;
      return o;
    } else
      for (; s != null; )
        if (i = s.resolvers.get(e), i == null) {
          if (s = s.parent, s == null)
            return nn;
        } else
          return Si(i, s, r);
    return nn;
  }
  getFactory(e) {
    let n = Er.get(e);
    if (n === void 0) {
      if (Vu(e))
        throw new Error(`${e.name} is a native function and therefore cannot be safely constructed by DI. If this is intentional, please use a callback or cachedCallback resolver.`);
      Er.set(e, n = new ku(e, ne.getDependencies(e)));
    }
    return n;
  }
  registerFactory(e, n) {
    Er.set(e, n);
  }
  createChild(e) {
    return new on(null, Object.assign({}, this.config, e, { parentLocator: () => this }));
  }
  jitRegister(e, n) {
    if (typeof e != "function")
      throw new Error(`Attempted to jitRegister something that is not a constructor: '${e}'. Did you forget to register this dependency?`);
    if (Uu.has(e.name))
      throw new Error(`Attempted to jitRegister an intrinsic type: ${e.name}. Did you forget to add @inject(Key)`);
    if (Mn(e)) {
      const r = e.register(n);
      if (!(r instanceof Object) || r.resolve == null) {
        const s = n.resolvers.get(e);
        if (s != null)
          return s;
        throw new Error("A valid resolver was not returned from the static register method");
      }
      return r;
    } else {
      if (e.$isInterface)
        throw new Error(`Attempted to jitRegister an interface: ${e.friendlyName}`);
      {
        const r = this.config.defaultResolver(e, n);
        return n.resolvers.set(e, r), r;
      }
    }
  }
}
const xr = /* @__PURE__ */ new WeakMap();
function na(t) {
  return function(e, n, r) {
    if (xr.has(r))
      return xr.get(r);
    const s = t(e, n, r);
    return xr.set(r, s), s;
  };
}
const gn = Object.freeze({
  /**
   * Allows you to pass an instance.
   * Every time you request this {@link Key} you will get this instance back.
   *
   * @example
   * ```
   * Registration.instance(Foo, new Foo()));
   * ```
   *
   * @param key - The key to register the instance under.
   * @param value - The instance to return when the key is requested.
   */
  instance(t, e) {
    return new Re(t, 0, e);
  },
  /**
   * Creates an instance from the class.
   * Every time you request this {@link Key} you will get the same one back.
   *
   * @example
   * ```
   * Registration.singleton(Foo, Foo);
   * ```
   *
   * @param key - The key to register the singleton under.
   * @param value - The class to instantiate as a singleton when first requested.
   */
  singleton(t, e) {
    return new Re(t, 1, e);
  },
  /**
   * Creates an instance from a class.
   * Every time you request this {@link Key} you will get a new instance.
   *
   * @example
   * ```
   * Registration.instance(Foo, Foo);
   * ```
   *
   * @param key - The key to register the instance type under.
   * @param value - The class to instantiate each time the key is requested.
   */
  transient(t, e) {
    return new Re(t, 2, e);
  },
  /**
   * Delegates to a callback function to provide the dependency.
   * Every time you request this {@link Key} the callback will be invoked to provide
   * the dependency.
   *
   * @example
   * ```
   * Registration.callback(Foo, () => new Foo());
   * Registration.callback(Bar, (c: Container) => new Bar(c.get(Foo)));
   * ```
   *
   * @param key - The key to register the callback for.
   * @param callback - The function that is expected to return the dependency.
   */
  callback(t, e) {
    return new Re(t, 3, e);
  },
  /**
   * Delegates to a callback function to provide the dependency and then caches the
   * dependency for future requests.
   *
   * @example
   * ```
   * Registration.cachedCallback(Foo, () => new Foo());
   * Registration.cachedCallback(Bar, (c: Container) => new Bar(c.get(Foo)));
   * ```
   *
   * @param key - The key to register the callback for.
   * @param callback - The function that is expected to return the dependency.
   * @remarks
   * If you pass the same Registration to another container, the same cached value will be used.
   * Should all references to the resolver returned be removed, the cache will expire.
   */
  cachedCallback(t, e) {
    return new Re(t, 3, na(e));
  },
  /**
   * Creates an alternate {@link Key} to retrieve an instance by.
   *
   * @example
   * ```
   * Register.singleton(Foo, Foo)
   * Register.aliasTo(Foo, MyFoos);
   *
   * container.getAll(MyFoos) // contains an instance of Foo
   * ```
   *
   * @param originalKey - The original key that has been registered.
   * @param aliasKey - The alias to the original key.
   */
  aliasTo(t, e) {
    return new Re(e, 5, t);
  }
});
function En(t) {
  if (t == null)
    throw new Error("key/value cannot be null or undefined. Are you trying to inject/register something that doesn't exist with DI?");
}
function Si(t, e, n) {
  if (t instanceof Re && t.strategy === 4) {
    const r = t.state;
    let s = r.length;
    const i = new Array(s);
    for (; s--; )
      i[s] = r[s].resolve(e, n);
    return i;
  }
  return [t.resolve(e, n)];
}
const Ai = "(anonymous)";
function Ei(t) {
  return typeof t == "object" && t !== null || typeof t == "function";
}
const Vu = function() {
  const t = /* @__PURE__ */ new WeakMap();
  let e = !1, n = "", r = 0;
  return function(s) {
    return e = t.get(s), e === void 0 && (n = s.toString(), r = n.length, e = // 29 is the length of 'function () { [native code] }' which is the smallest length of a native function string
    r >= 29 && // 100 seems to be a safe upper bound of the max length of a native function. In Chrome and FF it's 56, in Edge it's 61.
    r <= 100 && // This whole heuristic *could* be tricked by a comment. Do we need to care about that?
    n.charCodeAt(r - 1) === 125 && // }
    // TODO: the spec is a little vague about the precise constraints, so we do need to test this across various browsers to make sure just one whitespace is a safe assumption.
    n.charCodeAt(r - 2) <= 32 && // whitespace
    n.charCodeAt(r - 3) === 93 && // ]
    n.charCodeAt(r - 4) === 101 && // e
    n.charCodeAt(r - 5) === 100 && // d
    n.charCodeAt(r - 6) === 111 && // o
    n.charCodeAt(r - 7) === 99 && // c
    n.charCodeAt(r - 8) === 32 && //
    n.charCodeAt(r - 9) === 101 && // e
    n.charCodeAt(r - 10) === 118 && // v
    n.charCodeAt(r - 11) === 105 && // i
    n.charCodeAt(r - 12) === 116 && // t
    n.charCodeAt(r - 13) === 97 && // a
    n.charCodeAt(r - 14) === 110 && // n
    n.charCodeAt(r - 15) === 88, t.set(s, e)), e;
  };
}(), xn = {};
function ra(t) {
  switch (typeof t) {
    case "number":
      return t >= 0 && (t | 0) === t;
    case "string": {
      const e = xn[t];
      if (e !== void 0)
        return e;
      const n = t.length;
      if (n === 0)
        return xn[t] = !1;
      let r = 0;
      for (let s = 0; s < n; ++s)
        if (r = t.charCodeAt(s), s === 0 && r === 48 && n > 1 || r < 48 || r > 57)
          return xn[t] = !1;
      return xn[t] = !0;
    }
    default:
      return !1;
  }
}
function xi(t) {
  return `${t.toLowerCase()}:presentation`;
}
const Pn = /* @__PURE__ */ new Map(), sa = Object.freeze({
  /**
   * Defines a component presentation for an element.
   * @param tagName - The element name to define the presentation for.
   * @param presentation - The presentation that will be applied to matching elements.
   * @param container - The dependency injection container to register the configuration in.
   * @public
   */
  define(t, e, n) {
    const r = xi(t);
    Pn.get(r) === void 0 ? Pn.set(r, e) : Pn.set(r, !1), n.register(gn.instance(r, e));
  },
  /**
   * Finds a component presentation for the specified element name,
   * searching the DOM hierarchy starting from the provided element.
   * @param tagName - The name of the element to locate the presentation for.
   * @param element - The element to begin the search from.
   * @returns The component presentation or null if none is found.
   * @public
   */
  forTag(t, e) {
    const n = xi(t), r = Pn.get(n);
    return r === !1 ? ne.findResponsibleContainer(e).get(n) : r || null;
  }
});
class ju {
  /**
   * Creates an instance of DefaultComponentPresentation.
   * @param template - The template to apply to the element.
   * @param styles - The styles to apply to the element.
   * @public
   */
  constructor(e, n) {
    this.template = e || null, this.styles = n === void 0 ? null : Array.isArray(n) ? we.create(n) : n instanceof we ? n : we.create([n]);
  }
  /**
   * Applies the presentation details to the specified element.
   * @param element - The element to apply the presentation details to.
   * @public
   */
  applyTo(e) {
    const n = e.$fastController;
    n.template === null && (n.template = this.template), n.styles === null && (n.styles = this.styles);
  }
}
class ft extends rr {
  constructor() {
    super(...arguments), this._presentation = void 0;
  }
  /**
   * A property which resolves the ComponentPresentation instance
   * for the current component.
   * @public
   */
  get $presentation() {
    return this._presentation === void 0 && (this._presentation = sa.forTag(this.tagName, this)), this._presentation;
  }
  templateChanged() {
    this.template !== void 0 && (this.$fastController.template = this.template);
  }
  stylesChanged() {
    this.styles !== void 0 && (this.$fastController.styles = this.styles);
  }
  /**
   * The connected callback for this FASTElement.
   * @remarks
   * This method is invoked by the platform whenever this FoundationElement
   * becomes connected to the document.
   * @public
   */
  connectedCallback() {
    this.$presentation !== null && this.$presentation.applyTo(this), super.connectedCallback();
  }
  /**
   * Defines an element registry function with a set of element definition defaults.
   * @param elementDefinition - The definition of the element to create the registry
   * function for.
   * @public
   */
  static compose(e) {
    return (n = {}) => new Wu(this === ft ? class extends ft {
    } : this, e, n);
  }
}
$([
  At
], ft.prototype, "template", void 0);
$([
  At
], ft.prototype, "styles", void 0);
function Gt(t, e, n) {
  return typeof t == "function" ? t(e, n) : t;
}
class Wu {
  constructor(e, n, r) {
    this.type = e, this.elementDefinition = n, this.overrideDefinition = r, this.definition = Object.assign(Object.assign({}, this.elementDefinition), this.overrideDefinition);
  }
  register(e, n) {
    const r = this.definition, s = this.overrideDefinition, o = `${r.prefix || n.elementPrefix}-${r.baseName}`;
    n.tryDefineElement({
      name: o,
      type: this.type,
      baseClass: this.elementDefinition.baseClass,
      callback: (a) => {
        const l = new ju(Gt(r.template, a, r), Gt(r.styles, a, r));
        a.definePresentation(l);
        let c = Gt(r.shadowOptions, a, r);
        a.shadowRootMode && (c ? s.shadowOptions || (c.mode = a.shadowRootMode) : c !== null && (c = { mode: a.shadowRootMode })), a.defineElement({
          elementOptions: Gt(r.elementOptions, a, r),
          shadowOptions: c,
          attributes: Gt(r.attributes, a, r)
        });
      }
    });
  }
}
function sr(t, ...e) {
  const n = Vn.locate(t);
  e.forEach((r) => {
    Object.getOwnPropertyNames(r.prototype).forEach((i) => {
      i !== "constructor" && Object.defineProperty(
        t.prototype,
        i,
        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        Object.getOwnPropertyDescriptor(r.prototype, i)
      );
    }), Vn.locate(r).forEach((i) => n.push(i));
  });
}
function Hu() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
function zu() {
  const t = document.querySelector('meta[property="csp-nonce"]');
  return t ? t.getAttribute("content") : null;
}
let mt;
function qu() {
  if (typeof mt == "boolean")
    return mt;
  if (!Hu())
    return mt = !1, mt;
  const t = document.createElement("style"), e = zu();
  e !== null && t.setAttribute("nonce", e), document.head.appendChild(t);
  try {
    t.sheet.insertRule("foo:focus-visible {color:inherit}", 0), mt = !0;
  } catch {
    mt = !1;
  } finally {
    document.head.removeChild(t);
  }
  return mt;
}
var Pi;
(function(t) {
  t[t.alt = 18] = "alt", t[t.arrowDown = 40] = "arrowDown", t[t.arrowLeft = 37] = "arrowLeft", t[t.arrowRight = 39] = "arrowRight", t[t.arrowUp = 38] = "arrowUp", t[t.back = 8] = "back", t[t.backSlash = 220] = "backSlash", t[t.break = 19] = "break", t[t.capsLock = 20] = "capsLock", t[t.closeBracket = 221] = "closeBracket", t[t.colon = 186] = "colon", t[t.colon2 = 59] = "colon2", t[t.comma = 188] = "comma", t[t.ctrl = 17] = "ctrl", t[t.delete = 46] = "delete", t[t.end = 35] = "end", t[t.enter = 13] = "enter", t[t.equals = 187] = "equals", t[t.equals2 = 61] = "equals2", t[t.equals3 = 107] = "equals3", t[t.escape = 27] = "escape", t[t.forwardSlash = 191] = "forwardSlash", t[t.function1 = 112] = "function1", t[t.function10 = 121] = "function10", t[t.function11 = 122] = "function11", t[t.function12 = 123] = "function12", t[t.function2 = 113] = "function2", t[t.function3 = 114] = "function3", t[t.function4 = 115] = "function4", t[t.function5 = 116] = "function5", t[t.function6 = 117] = "function6", t[t.function7 = 118] = "function7", t[t.function8 = 119] = "function8", t[t.function9 = 120] = "function9", t[t.home = 36] = "home", t[t.insert = 45] = "insert", t[t.menu = 93] = "menu", t[t.minus = 189] = "minus", t[t.minus2 = 109] = "minus2", t[t.numLock = 144] = "numLock", t[t.numPad0 = 96] = "numPad0", t[t.numPad1 = 97] = "numPad1", t[t.numPad2 = 98] = "numPad2", t[t.numPad3 = 99] = "numPad3", t[t.numPad4 = 100] = "numPad4", t[t.numPad5 = 101] = "numPad5", t[t.numPad6 = 102] = "numPad6", t[t.numPad7 = 103] = "numPad7", t[t.numPad8 = 104] = "numPad8", t[t.numPad9 = 105] = "numPad9", t[t.numPadDivide = 111] = "numPadDivide", t[t.numPadDot = 110] = "numPadDot", t[t.numPadMinus = 109] = "numPadMinus", t[t.numPadMultiply = 106] = "numPadMultiply", t[t.numPadPlus = 107] = "numPadPlus", t[t.openBracket = 219] = "openBracket", t[t.pageDown = 34] = "pageDown", t[t.pageUp = 33] = "pageUp", t[t.period = 190] = "period", t[t.print = 44] = "print", t[t.quote = 222] = "quote", t[t.scrollLock = 145] = "scrollLock", t[t.shift = 16] = "shift", t[t.space = 32] = "space", t[t.tab = 9] = "tab", t[t.tilde = 192] = "tilde", t[t.windowsLeft = 91] = "windowsLeft", t[t.windowsOpera = 219] = "windowsOpera", t[t.windowsRight = 92] = "windowsRight";
})(Pi || (Pi = {}));
const Gu = "Enter";
class ae {
}
$([
  F({ attribute: "aria-atomic" })
], ae.prototype, "ariaAtomic", void 0);
$([
  F({ attribute: "aria-busy" })
], ae.prototype, "ariaBusy", void 0);
$([
  F({ attribute: "aria-controls" })
], ae.prototype, "ariaControls", void 0);
$([
  F({ attribute: "aria-current" })
], ae.prototype, "ariaCurrent", void 0);
$([
  F({ attribute: "aria-describedby" })
], ae.prototype, "ariaDescribedby", void 0);
$([
  F({ attribute: "aria-details" })
], ae.prototype, "ariaDetails", void 0);
$([
  F({ attribute: "aria-disabled" })
], ae.prototype, "ariaDisabled", void 0);
$([
  F({ attribute: "aria-errormessage" })
], ae.prototype, "ariaErrormessage", void 0);
$([
  F({ attribute: "aria-flowto" })
], ae.prototype, "ariaFlowto", void 0);
$([
  F({ attribute: "aria-haspopup" })
], ae.prototype, "ariaHaspopup", void 0);
$([
  F({ attribute: "aria-hidden" })
], ae.prototype, "ariaHidden", void 0);
$([
  F({ attribute: "aria-invalid" })
], ae.prototype, "ariaInvalid", void 0);
$([
  F({ attribute: "aria-keyshortcuts" })
], ae.prototype, "ariaKeyshortcuts", void 0);
$([
  F({ attribute: "aria-label" })
], ae.prototype, "ariaLabel", void 0);
$([
  F({ attribute: "aria-labelledby" })
], ae.prototype, "ariaLabelledby", void 0);
$([
  F({ attribute: "aria-live" })
], ae.prototype, "ariaLive", void 0);
$([
  F({ attribute: "aria-owns" })
], ae.prototype, "ariaOwns", void 0);
$([
  F({ attribute: "aria-relevant" })
], ae.prototype, "ariaRelevant", void 0);
$([
  F({ attribute: "aria-roledescription" })
], ae.prototype, "ariaRoledescription", void 0);
const Ju = (t, e) => Vt`
    <button
        class="control"
        part="control"
        ?autofocus="${(n) => n.autofocus}"
        ?disabled="${(n) => n.disabled}"
        form="${(n) => n.formId}"
        formaction="${(n) => n.formaction}"
        formenctype="${(n) => n.formenctype}"
        formmethod="${(n) => n.formmethod}"
        formnovalidate="${(n) => n.formnovalidate}"
        formtarget="${(n) => n.formtarget}"
        name="${(n) => n.name}"
        type="${(n) => n.type}"
        value="${(n) => n.value}"
        aria-atomic="${(n) => n.ariaAtomic}"
        aria-busy="${(n) => n.ariaBusy}"
        aria-controls="${(n) => n.ariaControls}"
        aria-current="${(n) => n.ariaCurrent}"
        aria-describedby="${(n) => n.ariaDescribedby}"
        aria-details="${(n) => n.ariaDetails}"
        aria-disabled="${(n) => n.ariaDisabled}"
        aria-errormessage="${(n) => n.ariaErrormessage}"
        aria-expanded="${(n) => n.ariaExpanded}"
        aria-flowto="${(n) => n.ariaFlowto}"
        aria-haspopup="${(n) => n.ariaHaspopup}"
        aria-hidden="${(n) => n.ariaHidden}"
        aria-invalid="${(n) => n.ariaInvalid}"
        aria-keyshortcuts="${(n) => n.ariaKeyshortcuts}"
        aria-label="${(n) => n.ariaLabel}"
        aria-labelledby="${(n) => n.ariaLabelledby}"
        aria-live="${(n) => n.ariaLive}"
        aria-owns="${(n) => n.ariaOwns}"
        aria-pressed="${(n) => n.ariaPressed}"
        aria-relevant="${(n) => n.ariaRelevant}"
        aria-roledescription="${(n) => n.ariaRoledescription}"
        ${Je("control")}
    >
        ${ea(t, e)}
        <span class="content" part="content">
            <slot ${Qo("defaultSlottedContent")}></slot>
        </span>
        ${Ko(t, e)}
    </button>
`, Oi = "form-associated-proxy", Di = "ElementInternals", Ri = Di in window && "setFormValue" in window[Di].prototype, Ti = /* @__PURE__ */ new WeakMap();
function ia(t) {
  const e = class extends t {
    constructor(...n) {
      super(...n), this.dirtyValue = !1, this.disabled = !1, this.proxyEventsToBlock = ["change", "click"], this.proxyInitialized = !1, this.required = !1, this.initialValue = this.initialValue || "", this.elementInternals || (this.formResetCallback = this.formResetCallback.bind(this));
    }
    /**
     * Must evaluate to true to enable elementInternals.
     * Feature detects API support and resolve respectively
     *
     * @internal
     */
    static get formAssociated() {
      return Ri;
    }
    /**
     * Returns the validity state of the element
     *
     * @alpha
     */
    get validity() {
      return this.elementInternals ? this.elementInternals.validity : this.proxy.validity;
    }
    /**
     * Retrieve a reference to the associated form.
     * Returns null if not associated to any form.
     *
     * @alpha
     */
    get form() {
      return this.elementInternals ? this.elementInternals.form : this.proxy.form;
    }
    /**
     * Retrieve the localized validation message,
     * or custom validation message if set.
     *
     * @alpha
     */
    get validationMessage() {
      return this.elementInternals ? this.elementInternals.validationMessage : this.proxy.validationMessage;
    }
    /**
     * Whether the element will be validated when the
     * form is submitted
     */
    get willValidate() {
      return this.elementInternals ? this.elementInternals.willValidate : this.proxy.willValidate;
    }
    /**
     * A reference to all associated label elements
     */
    get labels() {
      if (this.elementInternals)
        return Object.freeze(Array.from(this.elementInternals.labels));
      if (this.proxy instanceof HTMLElement && this.proxy.ownerDocument && this.id) {
        const n = this.proxy.labels, r = Array.from(this.proxy.getRootNode().querySelectorAll(`[for='${this.id}']`)), s = n ? r.concat(Array.from(n)) : r;
        return Object.freeze(s);
      } else
        return nn;
    }
    /**
     * Invoked when the `value` property changes
     * @param previous - the previous value
     * @param next - the new value
     *
     * @remarks
     * If elements extending `FormAssociated` implement a `valueChanged` method
     * They must be sure to invoke `super.valueChanged(previous, next)` to ensure
     * proper functioning of `FormAssociated`
     */
    valueChanged(n, r) {
      this.dirtyValue = !0, this.proxy instanceof HTMLElement && (this.proxy.value = this.value), this.currentValue = this.value, this.setFormValue(this.value), this.validate();
    }
    currentValueChanged() {
      this.value = this.currentValue;
    }
    /**
     * Invoked when the `initialValue` property changes
     *
     * @param previous - the previous value
     * @param next - the new value
     *
     * @remarks
     * If elements extending `FormAssociated` implement a `initialValueChanged` method
     * They must be sure to invoke `super.initialValueChanged(previous, next)` to ensure
     * proper functioning of `FormAssociated`
     */
    initialValueChanged(n, r) {
      this.dirtyValue || (this.value = this.initialValue, this.dirtyValue = !1);
    }
    /**
     * Invoked when the `disabled` property changes
     *
     * @param previous - the previous value
     * @param next - the new value
     *
     * @remarks
     * If elements extending `FormAssociated` implement a `disabledChanged` method
     * They must be sure to invoke `super.disabledChanged(previous, next)` to ensure
     * proper functioning of `FormAssociated`
     */
    disabledChanged(n, r) {
      this.proxy instanceof HTMLElement && (this.proxy.disabled = this.disabled), X.queueUpdate(() => this.classList.toggle("disabled", this.disabled));
    }
    /**
     * Invoked when the `name` property changes
     *
     * @param previous - the previous value
     * @param next - the new value
     *
     * @remarks
     * If elements extending `FormAssociated` implement a `nameChanged` method
     * They must be sure to invoke `super.nameChanged(previous, next)` to ensure
     * proper functioning of `FormAssociated`
     */
    nameChanged(n, r) {
      this.proxy instanceof HTMLElement && (this.proxy.name = this.name);
    }
    /**
     * Invoked when the `required` property changes
     *
     * @param previous - the previous value
     * @param next - the new value
     *
     * @remarks
     * If elements extending `FormAssociated` implement a `requiredChanged` method
     * They must be sure to invoke `super.requiredChanged(previous, next)` to ensure
     * proper functioning of `FormAssociated`
     */
    requiredChanged(n, r) {
      this.proxy instanceof HTMLElement && (this.proxy.required = this.required), X.queueUpdate(() => this.classList.toggle("required", this.required)), this.validate();
    }
    /**
     * The element internals object. Will only exist
     * in browsers supporting the attachInternals API
     */
    get elementInternals() {
      if (!Ri)
        return null;
      let n = Ti.get(this);
      return n || (n = this.attachInternals(), Ti.set(this, n)), n;
    }
    /**
     * @internal
     */
    connectedCallback() {
      super.connectedCallback(), this.addEventListener("keypress", this._keypressHandler), this.value || (this.value = this.initialValue, this.dirtyValue = !1), this.elementInternals || (this.attachProxy(), this.form && this.form.addEventListener("reset", this.formResetCallback));
    }
    /**
     * @internal
     */
    disconnectedCallback() {
      this.proxyEventsToBlock.forEach((n) => this.proxy.removeEventListener(n, this.stopPropagation)), !this.elementInternals && this.form && this.form.removeEventListener("reset", this.formResetCallback);
    }
    /**
     * Return the current validity of the element.
     */
    checkValidity() {
      return this.elementInternals ? this.elementInternals.checkValidity() : this.proxy.checkValidity();
    }
    /**
     * Return the current validity of the element.
     * If false, fires an invalid event at the element.
     */
    reportValidity() {
      return this.elementInternals ? this.elementInternals.reportValidity() : this.proxy.reportValidity();
    }
    /**
     * Set the validity of the control. In cases when the elementInternals object is not
     * available (and the proxy element is used to report validity), this function will
     * do nothing unless a message is provided, at which point the setCustomValidity method
     * of the proxy element will be invoked with the provided message.
     * @param flags - Validity flags
     * @param message - Optional message to supply
     * @param anchor - Optional element used by UA to display an interactive validation UI
     */
    setValidity(n, r, s) {
      this.elementInternals ? this.elementInternals.setValidity(n, r, s) : typeof r == "string" && this.proxy.setCustomValidity(r);
    }
    /**
     * Invoked when a connected component's form or fieldset has its disabled
     * state changed.
     * @param disabled - the disabled value of the form / fieldset
     */
    formDisabledCallback(n) {
      this.disabled = n;
    }
    formResetCallback() {
      this.value = this.initialValue, this.dirtyValue = !1;
    }
    /**
     * Attach the proxy element to the DOM
     */
    attachProxy() {
      var n;
      this.proxyInitialized || (this.proxyInitialized = !0, this.proxy.style.display = "none", this.proxyEventsToBlock.forEach((r) => this.proxy.addEventListener(r, this.stopPropagation)), this.proxy.disabled = this.disabled, this.proxy.required = this.required, typeof this.name == "string" && (this.proxy.name = this.name), typeof this.value == "string" && (this.proxy.value = this.value), this.proxy.setAttribute("slot", Oi), this.proxySlot = document.createElement("slot"), this.proxySlot.setAttribute("name", Oi)), (n = this.shadowRoot) === null || n === void 0 || n.appendChild(this.proxySlot), this.appendChild(this.proxy);
    }
    /**
     * Detach the proxy element from the DOM
     */
    detachProxy() {
      var n;
      this.removeChild(this.proxy), (n = this.shadowRoot) === null || n === void 0 || n.removeChild(this.proxySlot);
    }
    /** {@inheritDoc (FormAssociated:interface).validate} */
    validate(n) {
      this.proxy instanceof HTMLElement && this.setValidity(this.proxy.validity, this.proxy.validationMessage, n);
    }
    /**
     * Associates the provided value (and optional state) with the parent form.
     * @param value - The value to set
     * @param state - The state object provided to during session restores and when autofilling.
     */
    setFormValue(n, r) {
      this.elementInternals && this.elementInternals.setFormValue(n, r || n);
    }
    _keypressHandler(n) {
      switch (n.key) {
        case Gu:
          if (this.form instanceof HTMLFormElement) {
            const r = this.form.querySelector("[type=submit]");
            r?.click();
          }
          break;
      }
    }
    /**
     * Used to stop propagation of proxy element events
     * @param e - Event object
     */
    stopPropagation(n) {
      n.stopPropagation();
    }
  };
  return F({ mode: "boolean" })(e.prototype, "disabled"), F({ mode: "fromView", attribute: "value" })(e.prototype, "initialValue"), F({ attribute: "current-value" })(e.prototype, "currentValue"), F(e.prototype, "name"), F({ mode: "boolean" })(e.prototype, "required"), At(e.prototype, "value"), e;
}
class Xu extends ft {
}
class Yu extends ia(Xu) {
  constructor() {
    super(...arguments), this.proxy = document.createElement("input");
  }
}
let Ue = class extends Yu {
  constructor() {
    super(...arguments), this.handleClick = (e) => {
      var n;
      this.disabled && ((n = this.defaultSlottedContent) === null || n === void 0 ? void 0 : n.length) <= 1 && e.stopPropagation();
    }, this.handleSubmission = () => {
      if (!this.form)
        return;
      const e = this.proxy.isConnected;
      e || this.attachProxy(), typeof this.form.requestSubmit == "function" ? this.form.requestSubmit(this.proxy) : this.proxy.click(), e || this.detachProxy();
    }, this.handleFormReset = () => {
      var e;
      (e = this.form) === null || e === void 0 || e.reset();
    }, this.handleUnsupportedDelegatesFocus = () => {
      var e;
      window.ShadowRoot && !window.ShadowRoot.prototype.hasOwnProperty("delegatesFocus") && (!((e = this.$fastController.definition.shadowOptions) === null || e === void 0) && e.delegatesFocus) && (this.focus = () => {
        this.control.focus();
      });
    };
  }
  formactionChanged() {
    this.proxy instanceof HTMLInputElement && (this.proxy.formAction = this.formaction);
  }
  formenctypeChanged() {
    this.proxy instanceof HTMLInputElement && (this.proxy.formEnctype = this.formenctype);
  }
  formmethodChanged() {
    this.proxy instanceof HTMLInputElement && (this.proxy.formMethod = this.formmethod);
  }
  formnovalidateChanged() {
    this.proxy instanceof HTMLInputElement && (this.proxy.formNoValidate = this.formnovalidate);
  }
  formtargetChanged() {
    this.proxy instanceof HTMLInputElement && (this.proxy.formTarget = this.formtarget);
  }
  typeChanged(e, n) {
    this.proxy instanceof HTMLInputElement && (this.proxy.type = this.type), n === "submit" && this.addEventListener("click", this.handleSubmission), e === "submit" && this.removeEventListener("click", this.handleSubmission), n === "reset" && this.addEventListener("click", this.handleFormReset), e === "reset" && this.removeEventListener("click", this.handleFormReset);
  }
  /** {@inheritDoc (FormAssociated:interface).validate} */
  validate() {
    super.validate(this.control);
  }
  /**
   * @internal
   */
  connectedCallback() {
    var e;
    super.connectedCallback(), this.proxy.setAttribute("type", this.type), this.handleUnsupportedDelegatesFocus();
    const n = Array.from((e = this.control) === null || e === void 0 ? void 0 : e.children);
    n && n.forEach((r) => {
      r.addEventListener("click", this.handleClick);
    });
  }
  /**
   * @internal
   */
  disconnectedCallback() {
    var e;
    super.disconnectedCallback();
    const n = Array.from((e = this.control) === null || e === void 0 ? void 0 : e.children);
    n && n.forEach((r) => {
      r.removeEventListener("click", this.handleClick);
    });
  }
};
$([
  F({ mode: "boolean" })
], Ue.prototype, "autofocus", void 0);
$([
  F({ attribute: "form" })
], Ue.prototype, "formId", void 0);
$([
  F
], Ue.prototype, "formaction", void 0);
$([
  F
], Ue.prototype, "formenctype", void 0);
$([
  F
], Ue.prototype, "formmethod", void 0);
$([
  F({ mode: "boolean" })
], Ue.prototype, "formnovalidate", void 0);
$([
  F
], Ue.prototype, "formtarget", void 0);
$([
  F
], Ue.prototype, "type", void 0);
$([
  At
], Ue.prototype, "defaultSlottedContent", void 0);
class ir {
}
$([
  F({ attribute: "aria-expanded" })
], ir.prototype, "ariaExpanded", void 0);
$([
  F({ attribute: "aria-pressed" })
], ir.prototype, "ariaPressed", void 0);
sr(ir, ae);
sr(Ue, Zo, ir);
function Qr(t) {
  const e = t.parentElement;
  if (e)
    return e;
  {
    const n = t.getRootNode();
    if (n.host instanceof HTMLElement)
      return n.host;
  }
  return null;
}
function Qu(t, e) {
  let n = e;
  for (; n !== null; ) {
    if (n === t)
      return !0;
    n = Qr(n);
  }
  return !1;
}
const Ke = document.createElement("div");
function Zu(t) {
  return t instanceof rr;
}
class Os {
  setProperty(e, n) {
    X.queueUpdate(() => this.target.setProperty(e, n));
  }
  removeProperty(e) {
    X.queueUpdate(() => this.target.removeProperty(e));
  }
}
class Ku extends Os {
  constructor(e) {
    super();
    const n = new CSSStyleSheet();
    this.target = n.cssRules[n.insertRule(":host{}")].style, e.$fastController.addStyles(we.create([n]));
  }
}
class ef extends Os {
  constructor() {
    super();
    const e = new CSSStyleSheet();
    this.target = e.cssRules[e.insertRule(":root{}")].style, document.adoptedStyleSheets = [
      ...document.adoptedStyleSheets,
      e
    ];
  }
}
class tf extends Os {
  constructor() {
    super(), this.style = document.createElement("style"), document.head.appendChild(this.style);
    const { sheet: e } = this.style;
    if (e) {
      const n = e.insertRule(":root{}", e.cssRules.length);
      this.target = e.cssRules[n].style;
    }
  }
}
class oa {
  constructor(e) {
    this.store = /* @__PURE__ */ new Map(), this.target = null;
    const n = e.$fastController;
    this.style = document.createElement("style"), n.addStyles(this.style), de.getNotifier(n).subscribe(this, "isConnected"), this.handleChange(n, "isConnected");
  }
  targetChanged() {
    if (this.target !== null)
      for (const [e, n] of this.store.entries())
        this.target.setProperty(e, n);
  }
  setProperty(e, n) {
    this.store.set(e, n), X.queueUpdate(() => {
      this.target !== null && this.target.setProperty(e, n);
    });
  }
  removeProperty(e) {
    this.store.delete(e), X.queueUpdate(() => {
      this.target !== null && this.target.removeProperty(e);
    });
  }
  handleChange(e, n) {
    const { sheet: r } = this.style;
    if (r) {
      const s = r.insertRule(":host{}", r.cssRules.length);
      this.target = r.cssRules[s].style;
    } else
      this.target = null;
  }
}
$([
  At
], oa.prototype, "target", void 0);
class nf {
  constructor(e) {
    this.target = e.style;
  }
  setProperty(e, n) {
    X.queueUpdate(() => this.target.setProperty(e, n));
  }
  removeProperty(e) {
    X.queueUpdate(() => this.target.removeProperty(e));
  }
}
class fe {
  setProperty(e, n) {
    fe.properties[e] = n;
    for (const r of fe.roots.values())
      Ot.getOrCreate(fe.normalizeRoot(r)).setProperty(e, n);
  }
  removeProperty(e) {
    delete fe.properties[e];
    for (const n of fe.roots.values())
      Ot.getOrCreate(fe.normalizeRoot(n)).removeProperty(e);
  }
  static registerRoot(e) {
    const { roots: n } = fe;
    if (!n.has(e)) {
      n.add(e);
      const r = Ot.getOrCreate(this.normalizeRoot(e));
      for (const s in fe.properties)
        r.setProperty(s, fe.properties[s]);
    }
  }
  static unregisterRoot(e) {
    const { roots: n } = fe;
    if (n.has(e)) {
      n.delete(e);
      const r = Ot.getOrCreate(fe.normalizeRoot(e));
      for (const s in fe.properties)
        r.removeProperty(s);
    }
  }
  /**
   * Returns the document when provided the default element,
   * otherwise is a no-op
   * @param root - the root to normalize
   */
  static normalizeRoot(e) {
    return e === Ke ? document : e;
  }
}
fe.roots = /* @__PURE__ */ new Set();
fe.properties = {};
const Pr = /* @__PURE__ */ new WeakMap(), rf = X.supportsAdoptedStyleSheets ? Ku : oa, Ot = Object.freeze({
  getOrCreate(t) {
    if (Pr.has(t))
      return Pr.get(t);
    let e;
    return t === Ke ? e = new fe() : t instanceof Document ? e = X.supportsAdoptedStyleSheets ? new ef() : new tf() : Zu(t) ? e = new rf(t) : e = new nf(t), Pr.set(t, e), e;
  }
});
class ye extends Yo {
  constructor(e) {
    super(), this.subscribers = /* @__PURE__ */ new WeakMap(), this._appliedTo = /* @__PURE__ */ new Set(), this.name = e.name, e.cssCustomPropertyName !== null && (this.cssCustomProperty = `--${e.cssCustomPropertyName}`, this.cssVar = `var(${this.cssCustomProperty})`), this.id = ye.uniqueId(), ye.tokensById.set(this.id, this);
  }
  get appliedTo() {
    return [...this._appliedTo];
  }
  static from(e) {
    return new ye({
      name: typeof e == "string" ? e : e.name,
      cssCustomPropertyName: typeof e == "string" ? e : e.cssCustomPropertyName === void 0 ? e.name : e.cssCustomPropertyName
    });
  }
  static isCSSDesignToken(e) {
    return typeof e.cssCustomProperty == "string";
  }
  static isDerivedDesignTokenValue(e) {
    return typeof e == "function";
  }
  /**
   * Gets a token by ID. Returns undefined if the token was not found.
   * @param id - The ID of the token
   * @returns
   */
  static getTokenById(e) {
    return ye.tokensById.get(e);
  }
  getOrCreateSubscriberSet(e = this) {
    return this.subscribers.get(e) || this.subscribers.set(e, /* @__PURE__ */ new Set()) && this.subscribers.get(e);
  }
  createCSS() {
    return this.cssVar || "";
  }
  getValueFor(e) {
    const n = ie.getOrCreate(e).get(this);
    if (n !== void 0)
      return n;
    throw new Error(`Value could not be retrieved for token named "${this.name}". Ensure the value is set for ${e} or an ancestor of ${e}.`);
  }
  setValueFor(e, n) {
    return this._appliedTo.add(e), n instanceof ye && (n = this.alias(n)), ie.getOrCreate(e).set(this, n), this;
  }
  deleteValueFor(e) {
    return this._appliedTo.delete(e), ie.existsFor(e) && ie.getOrCreate(e).delete(this), this;
  }
  withDefault(e) {
    return this.setValueFor(Ke, e), this;
  }
  subscribe(e, n) {
    const r = this.getOrCreateSubscriberSet(n);
    n && !ie.existsFor(n) && ie.getOrCreate(n), r.has(e) || r.add(e);
  }
  unsubscribe(e, n) {
    const r = this.subscribers.get(n || this);
    r && r.has(e) && r.delete(e);
  }
  /**
   * Notifies subscribers that the value for an element has changed.
   * @param element - The element to emit a notification for
   */
  notify(e) {
    const n = Object.freeze({ token: this, target: e });
    this.subscribers.has(this) && this.subscribers.get(this).forEach((r) => r.handleChange(n)), this.subscribers.has(e) && this.subscribers.get(e).forEach((r) => r.handleChange(n));
  }
  /**
   * Alias the token to the provided token.
   * @param token - the token to alias to
   */
  alias(e) {
    return (n) => e.getValueFor(n);
  }
}
ye.uniqueId = (() => {
  let t = 0;
  return () => (t++, t.toString(16));
})();
ye.tokensById = /* @__PURE__ */ new Map();
class sf {
  startReflection(e, n) {
    e.subscribe(this, n), this.handleChange({ token: e, target: n });
  }
  stopReflection(e, n) {
    e.unsubscribe(this, n), this.remove(e, n);
  }
  handleChange(e) {
    const { token: n, target: r } = e;
    this.add(n, r);
  }
  add(e, n) {
    Ot.getOrCreate(n).setProperty(e.cssCustomProperty, this.resolveCSSValue(ie.getOrCreate(n).get(e)));
  }
  remove(e, n) {
    Ot.getOrCreate(n).removeProperty(e.cssCustomProperty);
  }
  resolveCSSValue(e) {
    return e && typeof e.createCSS == "function" ? e.createCSS() : e;
  }
}
class of {
  constructor(e, n, r) {
    this.source = e, this.token = n, this.node = r, this.dependencies = /* @__PURE__ */ new Set(), this.observer = de.binding(e, this, !1), this.observer.handleChange = this.observer.call, this.handleChange();
  }
  disconnect() {
    this.observer.disconnect();
  }
  /**
   * @internal
   */
  handleChange() {
    this.node.store.set(this.token, this.observer.observe(this.node.target, sn));
  }
}
class af {
  constructor() {
    this.values = /* @__PURE__ */ new Map();
  }
  set(e, n) {
    this.values.get(e) !== n && (this.values.set(e, n), de.getNotifier(this).notify(e.id));
  }
  get(e) {
    return de.track(this, e.id), this.values.get(e);
  }
  delete(e) {
    this.values.delete(e);
  }
  all() {
    return this.values.entries();
  }
}
const Jt = /* @__PURE__ */ new WeakMap(), Xt = /* @__PURE__ */ new WeakMap();
class ie {
  constructor(e) {
    this.target = e, this.store = new af(), this.children = [], this.assignedValues = /* @__PURE__ */ new Map(), this.reflecting = /* @__PURE__ */ new Set(), this.bindingObservers = /* @__PURE__ */ new Map(), this.tokenValueChangeHandler = {
      handleChange: (n, r) => {
        const s = ye.getTokenById(r);
        if (s && (s.notify(this.target), ye.isCSSDesignToken(s))) {
          const i = this.parent, o = this.isReflecting(s);
          if (i) {
            const a = i.get(s), l = n.get(s);
            a !== l && !o ? this.reflectToCSS(s) : a === l && o && this.stopReflectToCSS(s);
          } else
            o || this.reflectToCSS(s);
        }
      }
    }, Jt.set(e, this), de.getNotifier(this.store).subscribe(this.tokenValueChangeHandler), e instanceof rr ? e.$fastController.addBehaviors([this]) : e.isConnected && this.bind();
  }
  /**
   * Returns a DesignTokenNode for an element.
   * Creates a new instance if one does not already exist for a node,
   * otherwise returns the cached instance
   *
   * @param target - The HTML element to retrieve a DesignTokenNode for
   */
  static getOrCreate(e) {
    return Jt.get(e) || new ie(e);
  }
  /**
   * Determines if a DesignTokenNode has been created for a target
   * @param target - The element to test
   */
  static existsFor(e) {
    return Jt.has(e);
  }
  /**
   * Searches for and return the nearest parent DesignTokenNode.
   * Null is returned if no node is found or the node provided is for a default element.
   */
  static findParent(e) {
    if (Ke !== e.target) {
      let n = Qr(e.target);
      for (; n !== null; ) {
        if (Jt.has(n))
          return Jt.get(n);
        n = Qr(n);
      }
      return ie.getOrCreate(Ke);
    }
    return null;
  }
  /**
   * Finds the closest node with a value explicitly assigned for a token, otherwise null.
   * @param token - The token to look for
   * @param start - The node to start looking for value assignment
   * @returns
   */
  static findClosestAssignedNode(e, n) {
    let r = n;
    do {
      if (r.has(e))
        return r;
      r = r.parent ? r.parent : r.target !== Ke ? ie.getOrCreate(Ke) : null;
    } while (r !== null);
    return null;
  }
  /**
   * The parent DesignTokenNode, or null.
   */
  get parent() {
    return Xt.get(this) || null;
  }
  /**
   * Checks if a token has been assigned an explicit value the node.
   * @param token - the token to check.
   */
  has(e) {
    return this.assignedValues.has(e);
  }
  /**
   * Gets the value of a token for a node
   * @param token - The token to retrieve the value for
   * @returns
   */
  get(e) {
    const n = this.store.get(e);
    if (n !== void 0)
      return n;
    const r = this.getRaw(e);
    if (r !== void 0)
      return this.hydrate(e, r), this.get(e);
  }
  /**
   * Retrieves the raw assigned value of a token from the nearest assigned node.
   * @param token - The token to retrieve a raw value for
   * @returns
   */
  getRaw(e) {
    var n;
    return this.assignedValues.has(e) ? this.assignedValues.get(e) : (n = ie.findClosestAssignedNode(e, this)) === null || n === void 0 ? void 0 : n.getRaw(e);
  }
  /**
   * Sets a token to a value for a node
   * @param token - The token to set
   * @param value - The value to set the token to
   */
  set(e, n) {
    ye.isDerivedDesignTokenValue(this.assignedValues.get(e)) && this.tearDownBindingObserver(e), this.assignedValues.set(e, n), ye.isDerivedDesignTokenValue(n) ? this.setupBindingObserver(e, n) : this.store.set(e, n);
  }
  /**
   * Deletes a token value for the node.
   * @param token - The token to delete the value for
   */
  delete(e) {
    this.assignedValues.delete(e), this.tearDownBindingObserver(e);
    const n = this.getRaw(e);
    n ? this.hydrate(e, n) : this.store.delete(e);
  }
  /**
   * Invoked when the DesignTokenNode.target is attached to the document
   */
  bind() {
    const e = ie.findParent(this);
    e && e.appendChild(this);
    for (const n of this.assignedValues.keys())
      n.notify(this.target);
  }
  /**
   * Invoked when the DesignTokenNode.target is detached from the document
   */
  unbind() {
    this.parent && Xt.get(this).removeChild(this);
  }
  /**
   * Appends a child to a parent DesignTokenNode.
   * @param child - The child to append to the node
   */
  appendChild(e) {
    e.parent && Xt.get(e).removeChild(e);
    const n = this.children.filter((r) => e.contains(r));
    Xt.set(e, this), this.children.push(e), n.forEach((r) => e.appendChild(r)), de.getNotifier(this.store).subscribe(e);
    for (const [r, s] of this.store.all())
      e.hydrate(r, this.bindingObservers.has(r) ? this.getRaw(r) : s);
  }
  /**
   * Removes a child from a node.
   * @param child - The child to remove.
   */
  removeChild(e) {
    const n = this.children.indexOf(e);
    return n !== -1 && this.children.splice(n, 1), de.getNotifier(this.store).unsubscribe(e), e.parent === this ? Xt.delete(e) : !1;
  }
  /**
   * Tests whether a provided node is contained by
   * the calling node.
   * @param test - The node to test
   */
  contains(e) {
    return Qu(this.target, e.target);
  }
  /**
   * Instructs the node to reflect a design token for the provided token.
   * @param token - The design token to reflect
   */
  reflectToCSS(e) {
    this.isReflecting(e) || (this.reflecting.add(e), ie.cssCustomPropertyReflector.startReflection(e, this.target));
  }
  /**
   * Stops reflecting a DesignToken to CSS
   * @param token - The design token to stop reflecting
   */
  stopReflectToCSS(e) {
    this.isReflecting(e) && (this.reflecting.delete(e), ie.cssCustomPropertyReflector.stopReflection(e, this.target));
  }
  /**
   * Determines if a token is being reflected to CSS for a node.
   * @param token - The token to check for reflection
   * @returns
   */
  isReflecting(e) {
    return this.reflecting.has(e);
  }
  /**
   * Handle changes to upstream tokens
   * @param source - The parent DesignTokenNode
   * @param property - The token ID that changed
   */
  handleChange(e, n) {
    const r = ye.getTokenById(n);
    r && this.hydrate(r, this.getRaw(r));
  }
  /**
   * Hydrates a token with a DesignTokenValue, making retrieval available.
   * @param token - The token to hydrate
   * @param value - The value to hydrate
   */
  hydrate(e, n) {
    if (!this.has(e)) {
      const r = this.bindingObservers.get(e);
      ye.isDerivedDesignTokenValue(n) ? r ? r.source !== n && (this.tearDownBindingObserver(e), this.setupBindingObserver(e, n)) : this.setupBindingObserver(e, n) : (r && this.tearDownBindingObserver(e), this.store.set(e, n));
    }
  }
  /**
   * Sets up a binding observer for a derived token value that notifies token
   * subscribers on change.
   *
   * @param token - The token to notify when the binding updates
   * @param source - The binding source
   */
  setupBindingObserver(e, n) {
    const r = new of(n, e, this);
    return this.bindingObservers.set(e, r), r;
  }
  /**
   * Tear down a binding observer for a token.
   */
  tearDownBindingObserver(e) {
    return this.bindingObservers.has(e) ? (this.bindingObservers.get(e).disconnect(), this.bindingObservers.delete(e), !0) : !1;
  }
}
ie.cssCustomPropertyReflector = new sf();
$([
  At
], ie.prototype, "children", void 0);
function lf(t) {
  return ye.from(t);
}
const aa = Object.freeze({
  create: lf,
  /**
   * Informs DesignToken that an HTMLElement for which tokens have
   * been set has been connected to the document.
   *
   * The browser does not provide a reliable mechanism to observe an HTMLElement's connectedness
   * in all scenarios, so invoking this method manually is necessary when:
   *
   * 1. Token values are set for an HTMLElement.
   * 2. The HTMLElement does not inherit from FASTElement.
   * 3. The HTMLElement is not connected to the document when token values are set.
   *
   * @param element - The element to notify
   * @returns - true if notification was successful, otherwise false.
   */
  notifyConnection(t) {
    return !t.isConnected || !ie.existsFor(t) ? !1 : (ie.getOrCreate(t).bind(), !0);
  },
  /**
   * Informs DesignToken that an HTMLElement for which tokens have
   * been set has been disconnected to the document.
   *
   * The browser does not provide a reliable mechanism to observe an HTMLElement's connectedness
   * in all scenarios, so invoking this method manually is necessary when:
   *
   * 1. Token values are set for an HTMLElement.
   * 2. The HTMLElement does not inherit from FASTElement.
   *
   * @param element - The element to notify
   * @returns - true if notification was successful, otherwise false.
   */
  notifyDisconnection(t) {
    return t.isConnected || !ie.existsFor(t) ? !1 : (ie.getOrCreate(t).unbind(), !0);
  },
  /**
   * Registers and element or document as a DesignToken root.
   * {@link CSSDesignToken | CSSDesignTokens} with default values assigned via
   * {@link (DesignToken:interface).withDefault} will emit CSS custom properties to all
   * registered roots.
   * @param target - The root to register
   */
  registerRoot(t = Ke) {
    fe.registerRoot(t);
  },
  /**
   * Unregister an element or document as a DesignToken root.
   * @param target - The root to deregister
   */
  unregisterRoot(t = Ke) {
    fe.unregisterRoot(t);
  }
}), Or = Object.freeze({
  /**
   * Skip defining the element but still call the provided callback passed
   * to DesignSystemRegistrationContext.tryDefineElement
   */
  definitionCallbackOnly: null,
  /**
   * Ignore the duplicate element entirely.
   */
  ignoreDuplicate: Symbol()
}), Dr = /* @__PURE__ */ new Map(), Nn = /* @__PURE__ */ new Map();
let Mt = null;
const Yt = ne.createInterface((t) => t.cachedCallback((e) => (Mt === null && (Mt = new ca(null, e)), Mt))), la = Object.freeze({
  /**
   * Returns the HTML element name that the type is defined as.
   * @param type - The type to lookup.
   * @public
   */
  tagFor(t) {
    return Nn.get(t);
  },
  /**
   * Searches the DOM hierarchy for the design system that is responsible
   * for the provided element.
   * @param element - The element to locate the design system for.
   * @returns The located design system.
   * @public
   */
  responsibleFor(t) {
    const e = t.$$designSystem$$;
    return e || ne.findResponsibleContainer(t).get(Yt);
  },
  /**
   * Gets the DesignSystem if one is explicitly defined on the provided element;
   * otherwise creates a design system defined directly on the element.
   * @param element - The element to get or create a design system for.
   * @returns The design system.
   * @public
   */
  getOrCreate(t) {
    if (!t)
      return Mt === null && (Mt = ne.getOrCreateDOMContainer().get(Yt)), Mt;
    const e = t.$$designSystem$$;
    if (e)
      return e;
    const n = ne.getOrCreateDOMContainer(t);
    if (n.has(Yt, !1))
      return n.get(Yt);
    {
      const r = new ca(t, n);
      return n.register(gn.instance(Yt, r)), r;
    }
  }
});
function cf(t, e, n) {
  return typeof t == "string" ? {
    name: t,
    type: e,
    callback: n
  } : t;
}
class ca {
  constructor(e, n) {
    this.owner = e, this.container = n, this.designTokensInitialized = !1, this.prefix = "fast", this.shadowRootMode = void 0, this.disambiguate = () => Or.definitionCallbackOnly, e !== null && (e.$$designSystem$$ = this);
  }
  withPrefix(e) {
    return this.prefix = e, this;
  }
  withShadowRootMode(e) {
    return this.shadowRootMode = e, this;
  }
  withElementDisambiguation(e) {
    return this.disambiguate = e, this;
  }
  withDesignTokenRoot(e) {
    return this.designTokenRoot = e, this;
  }
  register(...e) {
    const n = this.container, r = [], s = this.disambiguate, i = this.shadowRootMode, o = {
      elementPrefix: this.prefix,
      tryDefineElement(a, l, c) {
        const f = cf(a, l, c), { name: h, callback: p, baseClass: m } = f;
        let { type: b } = f, C = h, D = Dr.get(C), w = !0;
        for (; D; ) {
          const G = s(C, b, D);
          switch (G) {
            case Or.ignoreDuplicate:
              return;
            case Or.definitionCallbackOnly:
              w = !1, D = void 0;
              break;
            default:
              C = G, D = Dr.get(C);
              break;
          }
        }
        w && ((Nn.has(b) || b === ft) && (b = class extends b {
        }), Dr.set(C, b), Nn.set(b, C), m && Nn.set(m, C)), r.push(new uf(n, C, b, i, p, w));
      }
    };
    this.designTokensInitialized || (this.designTokensInitialized = !0, this.designTokenRoot !== null && aa.registerRoot(this.designTokenRoot)), n.registerWithContext(o, ...e);
    for (const a of r)
      a.callback(a), a.willDefine && a.definition !== null && a.definition.define();
    return this;
  }
}
class uf {
  constructor(e, n, r, s, i, o) {
    this.container = e, this.name = n, this.type = r, this.shadowRootMode = s, this.callback = i, this.willDefine = o, this.definition = null;
  }
  definePresentation(e) {
    sa.define(this.name, e, this.container);
  }
  defineElement(e) {
    this.definition = new nr(this.type, Object.assign(Object.assign({}, e), { name: this.name }));
  }
  tagFor(e) {
    return la.tagFor(e);
  }
}
class ff extends ft {
}
class df extends ia(ff) {
  constructor() {
    super(...arguments), this.proxy = document.createElement("input");
  }
}
const hf = {
  /**
   * An email TextField
   */
  email: "email",
  /**
   * A password TextField
   */
  password: "password",
  /**
   * A telephone TextField
   */
  tel: "tel",
  /**
   * A text TextField
   */
  text: "text",
  /**
   * A URL TextField
   */
  url: "url"
};
let Pe = class extends df {
  constructor() {
    super(...arguments), this.type = hf.text;
  }
  readOnlyChanged() {
    this.proxy instanceof HTMLInputElement && (this.proxy.readOnly = this.readOnly, this.validate());
  }
  autofocusChanged() {
    this.proxy instanceof HTMLInputElement && (this.proxy.autofocus = this.autofocus, this.validate());
  }
  placeholderChanged() {
    this.proxy instanceof HTMLInputElement && (this.proxy.placeholder = this.placeholder);
  }
  typeChanged() {
    this.proxy instanceof HTMLInputElement && (this.proxy.type = this.type, this.validate());
  }
  listChanged() {
    this.proxy instanceof HTMLInputElement && (this.proxy.setAttribute("list", this.list), this.validate());
  }
  maxlengthChanged() {
    this.proxy instanceof HTMLInputElement && (this.proxy.maxLength = this.maxlength, this.validate());
  }
  minlengthChanged() {
    this.proxy instanceof HTMLInputElement && (this.proxy.minLength = this.minlength, this.validate());
  }
  patternChanged() {
    this.proxy instanceof HTMLInputElement && (this.proxy.pattern = this.pattern, this.validate());
  }
  sizeChanged() {
    this.proxy instanceof HTMLInputElement && (this.proxy.size = this.size);
  }
  spellcheckChanged() {
    this.proxy instanceof HTMLInputElement && (this.proxy.spellcheck = this.spellcheck);
  }
  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback(), this.proxy.setAttribute("type", this.type), this.validate(), this.autofocus && X.queueUpdate(() => {
      this.focus();
    });
  }
  /**
   * Selects all the text in the text field
   *
   * @public
   */
  select() {
    this.control.select(), this.$emit("select");
  }
  /**
   * Handles the internal control's `input` event
   * @internal
   */
  handleTextInput() {
    this.value = this.control.value;
  }
  /**
   * Change event handler for inner control.
   * @remarks
   * "Change" events are not `composable` so they will not
   * permeate the shadow DOM boundary. This fn effectively proxies
   * the change event, emitting a `change` event whenever the internal
   * control emits a `change` event
   * @internal
   */
  handleChange() {
    this.$emit("change");
  }
  /** {@inheritDoc (FormAssociated:interface).validate} */
  validate() {
    super.validate(this.control);
  }
};
$([
  F({ attribute: "readonly", mode: "boolean" })
], Pe.prototype, "readOnly", void 0);
$([
  F({ mode: "boolean" })
], Pe.prototype, "autofocus", void 0);
$([
  F
], Pe.prototype, "placeholder", void 0);
$([
  F
], Pe.prototype, "type", void 0);
$([
  F
], Pe.prototype, "list", void 0);
$([
  F({ converter: xs })
], Pe.prototype, "maxlength", void 0);
$([
  F({ converter: xs })
], Pe.prototype, "minlength", void 0);
$([
  F
], Pe.prototype, "pattern", void 0);
$([
  F({ converter: xs })
], Pe.prototype, "size", void 0);
$([
  F({ mode: "boolean" })
], Pe.prototype, "spellcheck", void 0);
$([
  At
], Pe.prototype, "defaultSlottedNodes", void 0);
class ua {
}
sr(ua, ae);
sr(Pe, Zo, ua);
function pf(t, e, n) {
  return t.nodeType !== Node.TEXT_NODE ? !0 : typeof t.nodeValue == "string" && !!t.nodeValue.trim().length;
}
const gf = (t, e) => Vt`
    <template
        class="
            ${(n) => n.readOnly ? "readonly" : ""}
        "
    >
        <label
            part="label"
            for="control"
            class="${(n) => n.defaultSlottedNodes && n.defaultSlottedNodes.length ? "label" : "label label__hidden"}"
        >
            <slot
                ${Qo({ property: "defaultSlottedNodes", filter: pf })}
            ></slot>
        </label>
        <div class="root" part="root">
            ${ea(t, e)}
            <input
                class="control"
                part="control"
                id="control"
                @input="${(n) => n.handleTextInput()}"
                @change="${(n) => n.handleChange()}"
                ?autofocus="${(n) => n.autofocus}"
                ?disabled="${(n) => n.disabled}"
                list="${(n) => n.list}"
                maxlength="${(n) => n.maxlength}"
                minlength="${(n) => n.minlength}"
                pattern="${(n) => n.pattern}"
                placeholder="${(n) => n.placeholder}"
                ?readonly="${(n) => n.readOnly}"
                ?required="${(n) => n.required}"
                size="${(n) => n.size}"
                ?spellcheck="${(n) => n.spellcheck}"
                :value="${(n) => n.value}"
                type="${(n) => n.type}"
                aria-atomic="${(n) => n.ariaAtomic}"
                aria-busy="${(n) => n.ariaBusy}"
                aria-controls="${(n) => n.ariaControls}"
                aria-current="${(n) => n.ariaCurrent}"
                aria-describedby="${(n) => n.ariaDescribedby}"
                aria-details="${(n) => n.ariaDetails}"
                aria-disabled="${(n) => n.ariaDisabled}"
                aria-errormessage="${(n) => n.ariaErrormessage}"
                aria-flowto="${(n) => n.ariaFlowto}"
                aria-haspopup="${(n) => n.ariaHaspopup}"
                aria-hidden="${(n) => n.ariaHidden}"
                aria-invalid="${(n) => n.ariaInvalid}"
                aria-keyshortcuts="${(n) => n.ariaKeyshortcuts}"
                aria-label="${(n) => n.ariaLabel}"
                aria-labelledby="${(n) => n.ariaLabelledby}"
                aria-live="${(n) => n.ariaLive}"
                aria-owns="${(n) => n.ariaOwns}"
                aria-relevant="${(n) => n.ariaRelevant}"
                aria-roledescription="${(n) => n.ariaRoledescription}"
                ${Je("control")}
            />
            ${Ko(t, e)}
        </div>
    </template>
`, fa = "not-allowed", mf = ":host([hidden]){display:none}";
function da(t) {
  return `${mf}:host{display:${t}}`;
}
const mn = qu() ? "focus-visible" : "focus";
function bf(t) {
  return la.getOrCreate(t).withPrefix("vscode");
}
function vf(t) {
  window.addEventListener("load", () => {
    new MutationObserver(() => {
      Ii(t);
    }).observe(document.body, {
      attributes: !0,
      attributeFilter: ["class"]
    }), Ii(t);
  });
}
function Ii(t) {
  const e = getComputedStyle(document.body), n = document.querySelector("body");
  if (n) {
    const r = n.getAttribute("data-vscode-theme-kind");
    for (const [s, i] of t) {
      let o = e.getPropertyValue(s).toString();
      if (r === "vscode-high-contrast")
        o.length === 0 && i.name.includes("background") && (o = "transparent"), i.name === "button-icon-hover-background" && (o = "transparent");
      else if (r === "vscode-high-contrast-light") {
        if (o.length === 0 && i.name.includes("background"))
          switch (i.name) {
            case "button-primary-hover-background":
              o = "#0F4A85";
              break;
            case "button-secondary-hover-background":
              o = "transparent";
              break;
            case "button-icon-hover-background":
              o = "transparent";
              break;
          }
      } else
        i.name === "contrast-active-border" && (o = "transparent");
      i.setValueFor(n, o);
    }
  }
}
const Mi = /* @__PURE__ */ new Map();
let Ni = !1;
function P(t, e) {
  const n = aa.create(t);
  if (e) {
    if (e.includes("--fake-vscode-token")) {
      const r = "id" + Math.random().toString(16).slice(2);
      e = `${e}-${r}`;
    }
    Mi.set(e, n);
  }
  return Ni || (vf(Mi), Ni = !0), n;
}
P("background", "--vscode-editor-background").withDefault("#1e1e1e");
const et = P("border-width").withDefault(1), _f = P("contrast-active-border", "--vscode-contrastActiveBorder").withDefault("#f38518");
P("contrast-border", "--vscode-contrastBorder").withDefault("#6fc3df");
const yf = P("corner-radius").withDefault(0), it = P("design-unit").withDefault(4), ha = P("disabled-opacity").withDefault(0.4), Ft = P("focus-border", "--vscode-focusBorder").withDefault("#007fd4"), pa = P("font-family", "--vscode-font-family").withDefault("-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol");
P("font-weight", "--vscode-font-weight").withDefault("400");
const ga = P("foreground", "--vscode-foreground").withDefault("#cccccc"), Cf = P("input-height").withDefault("26"), wf = P("input-min-width").withDefault("100px"), Zr = P("type-ramp-base-font-size", "--vscode-font-size").withDefault("13px"), Kr = P("type-ramp-base-line-height").withDefault("normal");
P("type-ramp-minus1-font-size").withDefault("11px");
P("type-ramp-minus1-line-height").withDefault("16px");
P("type-ramp-minus2-font-size").withDefault("9px");
P("type-ramp-minus2-line-height").withDefault("16px");
P("type-ramp-plus1-font-size").withDefault("16px");
P("type-ramp-plus1-line-height").withDefault("24px");
P("scrollbarWidth").withDefault("10px");
P("scrollbarHeight").withDefault("10px");
P("scrollbar-slider-background", "--vscode-scrollbarSlider-background").withDefault("#79797966");
P("scrollbar-slider-hover-background", "--vscode-scrollbarSlider-hoverBackground").withDefault("#646464b3");
P("scrollbar-slider-active-background", "--vscode-scrollbarSlider-activeBackground").withDefault("#bfbfbf66");
P("badge-background", "--vscode-badge-background").withDefault("#4d4d4d");
P("badge-foreground", "--vscode-badge-foreground").withDefault("#ffffff");
const Sf = P("button-border", "--vscode-button-border").withDefault("transparent"), $i = P("button-icon-background").withDefault("transparent"), Af = P("button-icon-corner-radius").withDefault("5px"), Ef = P("button-icon-outline-offset").withDefault(0), ki = P("button-icon-hover-background", "--fake-vscode-token").withDefault("rgba(90, 93, 94, 0.31)"), xf = P("button-icon-padding").withDefault("3px"), Nt = P("button-primary-background", "--vscode-button-background").withDefault("#0e639c"), ma = P("button-primary-foreground", "--vscode-button-foreground").withDefault("#ffffff"), ba = P("button-primary-hover-background", "--vscode-button-hoverBackground").withDefault("#1177bb"), Rr = P("button-secondary-background", "--vscode-button-secondaryBackground").withDefault("#3a3d41"), Pf = P("button-secondary-foreground", "--vscode-button-secondaryForeground").withDefault("#ffffff"), Of = P("button-secondary-hover-background", "--vscode-button-secondaryHoverBackground").withDefault("#45494e"), Df = P("button-padding-horizontal").withDefault("11px"), Rf = P("button-padding-vertical").withDefault("4px");
P("checkbox-background", "--vscode-checkbox-background").withDefault("#3c3c3c");
P("checkbox-border", "--vscode-checkbox-border").withDefault("#3c3c3c");
P("checkbox-corner-radius").withDefault(3);
P("checkbox-foreground", "--vscode-checkbox-foreground").withDefault("#f0f0f0");
P("list-active-selection-background", "--vscode-list-activeSelectionBackground").withDefault("#094771");
P("list-active-selection-foreground", "--vscode-list-activeSelectionForeground").withDefault("#ffffff");
P("list-hover-background", "--vscode-list-hoverBackground").withDefault("#2a2d2e");
P("divider-background", "--vscode-settings-dropdownListBorder").withDefault("#454545");
P("dropdown-background", "--vscode-dropdown-background").withDefault("#3c3c3c");
const Tr = P("dropdown-border", "--vscode-dropdown-border").withDefault("#3c3c3c");
P("dropdown-foreground", "--vscode-dropdown-foreground").withDefault("#f0f0f0");
P("dropdown-list-max-height").withDefault("200px");
const Ir = P("input-background", "--vscode-input-background").withDefault("#3c3c3c"), Tf = P("input-foreground", "--vscode-input-foreground").withDefault("#cccccc");
P("input-placeholder-foreground", "--vscode-input-placeholderForeground").withDefault("#cccccc");
P("link-active-foreground", "--vscode-textLink-activeForeground").withDefault("#3794ff");
P("link-foreground", "--vscode-textLink-foreground").withDefault("#3794ff");
P("progress-background", "--vscode-progressBar-background").withDefault("#0e70c0");
P("panel-tab-active-border", "--vscode-panelTitle-activeBorder").withDefault("#e7e7e7");
P("panel-tab-active-foreground", "--vscode-panelTitle-activeForeground").withDefault("#e7e7e7");
P("panel-tab-foreground", "--vscode-panelTitle-inactiveForeground").withDefault("#e7e7e799");
P("panel-view-background", "--vscode-panel-background").withDefault("#1e1e1e");
P("panel-view-border", "--vscode-panel-border").withDefault("#80808059");
P("tag-corner-radius").withDefault("2px");
const If = jt`
	${da("inline-flex")} :host {
		outline: none;
		font-family: ${pa};
		font-size: ${Zr};
		line-height: ${Kr};
		color: ${ma};
		background: ${Nt};
		border-radius: 2px;
		fill: currentColor;
		cursor: pointer;
	}
	.control {
		background: transparent;
		height: inherit;
		flex-grow: 1;
		box-sizing: border-box;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		padding: ${Rf} ${Df};
		white-space: wrap;
		outline: none;
		text-decoration: none;
		border: calc(${et} * 1px) solid ${Sf};
		color: inherit;
		border-radius: inherit;
		fill: inherit;
		cursor: inherit;
		font-family: inherit;
	}
	:host(:hover) {
		background: ${ba};
	}
	:host(:active) {
		background: ${Nt};
	}
	.control:${mn} {
		outline: calc(${et} * 1px) solid ${Ft};
		outline-offset: calc(${et} * 2px);
	}
	.control::-moz-focus-inner {
		border: 0;
	}
	:host([disabled]) {
		opacity: ${ha};
		background: ${Nt};
		cursor: ${fa};
	}
	.content {
		display: flex;
	}
	.start {
		display: flex;
	}
	::slotted(svg),
	::slotted(span) {
		width: calc(${it} * 4px);
		height: calc(${it} * 4px);
	}
	.start {
		margin-inline-end: 8px;
	}
`, Mf = jt`
	:host([appearance='primary']) {
		background: ${Nt};
		color: ${ma};
	}
	:host([appearance='primary']:hover) {
		background: ${ba};
	}
	:host([appearance='primary']:active) .control:active {
		background: ${Nt};
	}
	:host([appearance='primary']) .control:${mn} {
		outline: calc(${et} * 1px) solid ${Ft};
		outline-offset: calc(${et} * 2px);
	}
	:host([appearance='primary'][disabled]) {
		background: ${Nt};
	}
`, Nf = jt`
	:host([appearance='secondary']) {
		background: ${Rr};
		color: ${Pf};
	}
	:host([appearance='secondary']:hover) {
		background: ${Of};
	}
	:host([appearance='secondary']:active) .control:active {
		background: ${Rr};
	}
	:host([appearance='secondary']) .control:${mn} {
		outline: calc(${et} * 1px) solid ${Ft};
		outline-offset: calc(${et} * 2px);
	}
	:host([appearance='secondary'][disabled]) {
		background: ${Rr};
	}
`, $f = jt`
	:host([appearance='icon']) {
		background: ${$i};
		border-radius: ${Af};
		color: ${ga};
	}
	:host([appearance='icon']:hover) {
		background: ${ki};
		outline: 1px dotted ${_f};
		outline-offset: -1px;
	}
	:host([appearance='icon']) .control {
		padding: ${xf};
		border: none;
	}
	:host([appearance='icon']:active) .control:active {
		background: ${ki};
	}
	:host([appearance='icon']) .control:${mn} {
		outline: calc(${et} * 1px) solid ${Ft};
		outline-offset: ${Ef};
	}
	:host([appearance='icon'][disabled]) {
		background: ${$i};
	}
`, kf = (t, e) => jt`
	${If}
	${Mf}
	${Nf}
	${$f}
`;
class va extends Ue {
  /**
   * Component lifecycle method that runs when the component is inserted
   * into the DOM.
   *
   * @internal
   */
  connectedCallback() {
    if (super.connectedCallback(), !this.appearance) {
      const e = this.getAttribute("appearance");
      this.appearance = e;
    }
  }
  /**
   * Component lifecycle method that runs when an attribute of the
   * element is changed.
   *
   * @param attrName - The attribute that was changed
   * @param oldVal - The old value of the attribute
   * @param newVal - The new value of the attribute
   *
   * @internal
   */
  attributeChangedCallback(e, n, r) {
    e === "appearance" && r === "icon" && (this.getAttribute("aria-label") || (this.ariaLabel = "Icon Button")), e === "aria-label" && (this.ariaLabel = r), e === "disabled" && (this.disabled = r !== null);
  }
}
$([
  F
], va.prototype, "appearance", void 0);
const Ff = va.compose({
  baseName: "button",
  template: Ju,
  styles: kf,
  shadowOptions: {
    delegatesFocus: !0
  }
}), Lf = (t, e) => jt`
	${da("inline-block")} :host {
		font-family: ${pa};
		outline: none;
		user-select: none;
	}
	.root {
		box-sizing: border-box;
		position: relative;
		display: flex;
		flex-direction: row;
		color: ${Tf};
		background: ${Ir};
		border-radius: calc(${yf} * 1px);
		border: calc(${et} * 1px) solid ${Tr};
		height: calc(${Cf} * 1px);
		min-width: ${wf};
	}
	.control {
		-webkit-appearance: none;
		font: inherit;
		background: transparent;
		border: 0;
		color: inherit;
		height: calc(100% - (${it} * 1px));
		width: 100%;
		margin-top: auto;
		margin-bottom: auto;
		border: none;
		padding: 0 calc(${it} * 2px + 1px);
		font-size: ${Zr};
		line-height: ${Kr};
	}
	.control:hover,
	.control:${mn},
	.control:disabled,
	.control:active {
		outline: none;
	}
	.label {
		display: block;
		color: ${ga};
		cursor: pointer;
		font-size: ${Zr};
		line-height: ${Kr};
		margin-bottom: 2px;
	}
	.label__hidden {
		display: none;
		visibility: hidden;
	}
	.start,
	.end {
		display: flex;
		margin: auto;
		fill: currentcolor;
	}
	::slotted(svg),
	::slotted(span) {
		width: calc(${it} * 4px);
		height: calc(${it} * 4px);
	}
	.start {
		margin-inline-start: calc(${it} * 2px);
	}
	.end {
		margin-inline-end: calc(${it} * 2px);
	}
	:host(:hover:not([disabled])) .root {
		background: ${Ir};
		border-color: ${Tr};
	}
	:host(:active:not([disabled])) .root {
		background: ${Ir};
		border-color: ${Ft};
	}
	:host(:focus-within:not([disabled])) .root {
		border-color: ${Ft};
	}
	:host([disabled]) .label,
	:host([readonly]) .label,
	:host([readonly]) .control,
	:host([disabled]) .control {
		cursor: ${fa};
	}
	:host([disabled]) {
		opacity: ${ha};
	}
	:host([disabled]) .control {
		border-color: ${Tr};
	}
`;
class Bf extends Pe {
  /**
   * Component lifecycle method that runs when the component is inserted
   * into the DOM.
   *
   * @internal
   */
  connectedCallback() {
    super.connectedCallback(), this.textContent ? this.setAttribute("aria-label", this.textContent) : this.setAttribute("aria-label", "Text field");
  }
}
const Uf = Bf.compose({
  baseName: "text-field",
  template: gf,
  styles: Lf,
  shadowOptions: {
    delegatesFocus: !0
  }
});
class Vf {
  vsCodeApi;
  constructor() {
    typeof acquireVsCodeApi == "function" && (this.vsCodeApi = acquireVsCodeApi());
  }
  /**
   * Post a message (i.e. send arbitrary data) to the owner of the webview.
   *
   * @remarks When running webview code inside a web browser, postMessage will instead
   * log the given message to the console.
   * @param   message Abitrary data (must be JSON serializable) to send to the extension context.
   */
  postMessage(e) {
    this.vsCodeApi ? this.vsCodeApi.postMessage(e) : console.log(e);
  }
  /**
   * Get the persistent state stored for this webview.
   *
   * @remarks When running webview source code inside a web browser, getState will retrieve state
   * from local storage (https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
   * @return The current state or `undefined` if no state has been set.
   */
  getState() {
    if (this.vsCodeApi)
      return this.vsCodeApi.getState();
    const e = localStorage.getItem("vscodeState");
    return e ? JSON.parse(e) : void 0;
  }
  /**
   * Set the persistent state stored for this webview.
   *
   * @remarks When running webview source code inside a web browser, setState will set the given
   * state using local storage (https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
   * @param   newState New persisted state. This must be a JSON serializable object. Can be retrieved
   *                   using {@link getState}.
   * @return           The new state.
   */
  setState(e) {
    return this.vsCodeApi ? this.vsCodeApi.setState(e) : (localStorage.setItem("vscodeState", JSON.stringify(e)), e);
  }
}
const jf = new Vf();
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var _a = function(e) {
  return e != null && typeof e == "object" && Array.isArray(e) === !1;
};
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var Wf = _a;
function Fi(t) {
  return Wf(t) === !0 && Object.prototype.toString.call(t) === "[object Object]";
}
var Hf = function(e) {
  var n, r;
  return !(Fi(e) === !1 || (n = e.constructor, typeof n != "function") || (r = n.prototype, Fi(r) === !1) || r.hasOwnProperty("isPrototypeOf") === !1);
}, zf = {}.toString, qf = Array.isArray || function(t) {
  return zf.call(t) == "[object Array]";
};
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
var Gf = qf, Jf = function(e) {
  return e != null && typeof e == "object" && Gf(e) === !1;
};
/*!
 * has-values <https://github.com/jonschlinkert/has-values>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
var Xf = function(e, n) {
  if (e == null)
    return !1;
  if (typeof e == "boolean")
    return !0;
  if (typeof e == "number")
    return !(e === 0 && n === !0);
  if (e.length !== void 0)
    return e.length !== 0;
  for (var r in e)
    if (e.hasOwnProperty(r))
      return !0;
  return !1;
};
/*!
 * get-value <https://github.com/jonschlinkert/get-value>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
var Yf = function(t, e, n, r, s) {
  if (!Qf(t) || !e)
    return t;
  if (e = On(e), n && (e += "." + On(n)), r && (e += "." + On(r)), s && (e += "." + On(s)), e in t)
    return t[e];
  for (var i = e.split("."), o = i.length, a = -1; t && ++a < o; ) {
    for (var l = i[a]; l[l.length - 1] === "\\"; )
      l = l.slice(0, -1) + "." + i[++a];
    t = t[l];
  }
  return t;
};
function Qf(t) {
  return t !== null && (typeof t == "object" || typeof t == "function");
}
function On(t) {
  return t ? Array.isArray(t) ? t.join(".") : t : "";
}
/*!
 * has-value <https://github.com/jonschlinkert/has-value>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */
var Zf = Jf, Li = Xf, Kf = Yf, ed = function(t, e, n) {
  return Zf(t) ? Li(Kf(t, e), n) : Li(t, e);
};
/*!
 * unset-value <https://github.com/jonschlinkert/unset-value>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var td = _a, nd = ed, rd = function(e, n) {
  if (!td(e))
    throw new TypeError("expected an object.");
  if (e.hasOwnProperty(n))
    return delete e[n], !0;
  if (nd(e, n)) {
    for (var r = n.split("."), s = r.pop(); r.length && r[r.length - 1].slice(-1) === "\\"; )
      s = r.pop().slice(0, -1) + "." + s;
    for (; r.length; )
      e = e[n = r.shift()];
    return delete e[s];
  }
  return !0;
}, sd = Hf, id = rd, od = function t(e, n) {
  if (typeof e > "u")
    return {};
  if (Array.isArray(e)) {
    for (var r = 0; r < e.length; r++)
      e[r] = t(e[r], n);
    return e;
  }
  if (!sd(e) || (typeof n == "string" && (n = [n]), !Array.isArray(n)))
    return e;
  for (var s = 0; s < n.length; s++)
    id(e, n[s]);
  for (var i in e)
    e.hasOwnProperty(i) && (e[i] = t(e[i], n));
  return e;
};
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var ad = function(t) {
  return t != null && (ya(t) || ld(t) || !!t._isBuffer);
};
function ya(t) {
  return !!t.constructor && typeof t.constructor.isBuffer == "function" && t.constructor.isBuffer(t);
}
function ld(t) {
  return typeof t.readFloatLE == "function" && typeof t.slice == "function" && ya(t.slice(0, 0));
}
var cd = ad, ud = Object.prototype.toString, fd = function(e) {
  if (typeof e > "u")
    return "undefined";
  if (e === null)
    return "null";
  if (e === !0 || e === !1 || e instanceof Boolean)
    return "boolean";
  if (typeof e == "string" || e instanceof String)
    return "string";
  if (typeof e == "number" || e instanceof Number)
    return "number";
  if (typeof e == "function" || e instanceof Function)
    return "function";
  if (typeof Array.isArray < "u" && Array.isArray(e))
    return "array";
  if (e instanceof RegExp)
    return "regexp";
  if (e instanceof Date)
    return "date";
  var n = ud.call(e);
  return n === "[object RegExp]" ? "regexp" : n === "[object Date]" ? "date" : n === "[object Arguments]" ? "arguments" : n === "[object Error]" ? "error" : cd(e) ? "buffer" : n === "[object Set]" ? "set" : n === "[object WeakSet]" ? "weakset" : n === "[object Map]" ? "map" : n === "[object WeakMap]" ? "weakmap" : n === "[object Symbol]" ? "symbol" : n === "[object Int8Array]" ? "int8array" : n === "[object Uint8Array]" ? "uint8array" : n === "[object Uint8ClampedArray]" ? "uint8clampedarray" : n === "[object Int16Array]" ? "int16array" : n === "[object Uint16Array]" ? "uint16array" : n === "[object Int32Array]" ? "int32array" : n === "[object Uint32Array]" ? "uint32array" : n === "[object Float32Array]" ? "float32array" : n === "[object Float64Array]" ? "float64array" : "object";
}, es = {}, dd = {
  get exports() {
    return es;
  },
  set exports(t) {
    es = t;
  }
};
(function(t) {
  (function() {
    function e(n, r) {
      if (typeof r != "function")
        return n;
      var s = {};
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (s[r(i, n[i]) || i] = n[i]);
      return s;
    }
    t.exports ? t.exports = e : window.rename = e;
  })();
})(dd);
/*!
 * deep-rename-keys <https://github.com/jonschlinkert/deep-rename-keys>
 *
 * Copyright (c) 2015 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */
var Mr = fd, hd = es, pd = function t(e, n) {
  var r = Mr(e);
  if (r !== "object" && r !== "array")
    throw new Error("expected an object");
  var s = [];
  r === "object" && (e = hd(e, n), s = {});
  for (var i in e)
    if (e.hasOwnProperty(i)) {
      var o = e[i];
      Mr(o) === "object" || Mr(o) === "array" ? s[i] = t(o, n) : s[i] = o;
    }
  return s;
}, Wn = {}, gd = {
  get exports() {
    return Wn;
  },
  set exports(t) {
    Wn = t;
  }
};
(function(t) {
  var e = Object.prototype.hasOwnProperty, n = "~";
  function r() {
  }
  Object.create && (r.prototype = /* @__PURE__ */ Object.create(null), new r().__proto__ || (n = !1));
  function s(o, a, l) {
    this.fn = o, this.context = a, this.once = l || !1;
  }
  function i() {
    this._events = new r(), this._eventsCount = 0;
  }
  i.prototype.eventNames = function() {
    var a = [], l, c;
    if (this._eventsCount === 0)
      return a;
    for (c in l = this._events)
      e.call(l, c) && a.push(n ? c.slice(1) : c);
    return Object.getOwnPropertySymbols ? a.concat(Object.getOwnPropertySymbols(l)) : a;
  }, i.prototype.listeners = function(a, l) {
    var c = n ? n + a : a, f = this._events[c];
    if (l)
      return !!f;
    if (!f)
      return [];
    if (f.fn)
      return [f.fn];
    for (var h = 0, p = f.length, m = new Array(p); h < p; h++)
      m[h] = f[h].fn;
    return m;
  }, i.prototype.emit = function(a, l, c, f, h, p) {
    var m = n ? n + a : a;
    if (!this._events[m])
      return !1;
    var b = this._events[m], C = arguments.length, D, w;
    if (b.fn) {
      switch (b.once && this.removeListener(a, b.fn, void 0, !0), C) {
        case 1:
          return b.fn.call(b.context), !0;
        case 2:
          return b.fn.call(b.context, l), !0;
        case 3:
          return b.fn.call(b.context, l, c), !0;
        case 4:
          return b.fn.call(b.context, l, c, f), !0;
        case 5:
          return b.fn.call(b.context, l, c, f, h), !0;
        case 6:
          return b.fn.call(b.context, l, c, f, h, p), !0;
      }
      for (w = 1, D = new Array(C - 1); w < C; w++)
        D[w - 1] = arguments[w];
      b.fn.apply(b.context, D);
    } else {
      var G = b.length, R;
      for (w = 0; w < G; w++)
        switch (b[w].once && this.removeListener(a, b[w].fn, void 0, !0), C) {
          case 1:
            b[w].fn.call(b[w].context);
            break;
          case 2:
            b[w].fn.call(b[w].context, l);
            break;
          case 3:
            b[w].fn.call(b[w].context, l, c);
            break;
          case 4:
            b[w].fn.call(b[w].context, l, c, f);
            break;
          default:
            if (!D)
              for (R = 1, D = new Array(C - 1); R < C; R++)
                D[R - 1] = arguments[R];
            b[w].fn.apply(b[w].context, D);
        }
    }
    return !0;
  }, i.prototype.on = function(a, l, c) {
    var f = new s(l, c || this), h = n ? n + a : a;
    return this._events[h] ? this._events[h].fn ? this._events[h] = [this._events[h], f] : this._events[h].push(f) : (this._events[h] = f, this._eventsCount++), this;
  }, i.prototype.once = function(a, l, c) {
    var f = new s(l, c || this, !0), h = n ? n + a : a;
    return this._events[h] ? this._events[h].fn ? this._events[h] = [this._events[h], f] : this._events[h].push(f) : (this._events[h] = f, this._eventsCount++), this;
  }, i.prototype.removeListener = function(a, l, c, f) {
    var h = n ? n + a : a;
    if (!this._events[h])
      return this;
    if (!l)
      return --this._eventsCount === 0 ? this._events = new r() : delete this._events[h], this;
    var p = this._events[h];
    if (p.fn)
      p.fn === l && (!f || p.once) && (!c || p.context === c) && (--this._eventsCount === 0 ? this._events = new r() : delete this._events[h]);
    else {
      for (var m = 0, b = [], C = p.length; m < C; m++)
        (p[m].fn !== l || f && !p[m].once || c && p[m].context !== c) && b.push(p[m]);
      b.length ? this._events[h] = b.length === 1 ? b[0] : b : --this._eventsCount === 0 ? this._events = new r() : delete this._events[h];
    }
    return this;
  }, i.prototype.removeAllListeners = function(a) {
    var l;
    return a ? (l = n ? n + a : a, this._events[l] && (--this._eventsCount === 0 ? this._events = new r() : delete this._events[l])) : (this._events = new r(), this._eventsCount = 0), this;
  }, i.prototype.off = i.prototype.removeListener, i.prototype.addListener = i.prototype.on, i.prototype.setMaxListeners = function() {
    return this;
  }, i.prefixed = n, i.EventEmitter = i, t.exports = i;
})(gd);
function B(t, e, n) {
  return e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
var md = Wn, Qt = function() {
}, W = {
  data: "state-data",
  cdata: "state-cdata",
  tagBegin: "state-tag-begin",
  tagName: "state-tag-name",
  tagEnd: "state-tag-end",
  attributeNameStart: "state-attribute-name-start",
  attributeName: "state-attribute-name",
  attributeNameEnd: "state-attribute-name-end",
  attributeValueBegin: "state-attribute-value-begin",
  attributeValue: "state-attribute-value"
}, M = {
  lt: "action-lt",
  gt: "action-gt",
  space: "action-space",
  equal: "action-equal",
  quote: "action-quote",
  slash: "action-slash",
  char: "action-char",
  error: "action-error"
}, te = {
  text: "text",
  openTag: "open-tag",
  closeTag: "close-tag",
  attributeName: "attribute-name",
  attributeValue: "attribute-value"
}, bd = {
  " ": M.space,
  "	": M.space,
  "\n": M.space,
  "\r": M.space,
  "<": M.lt,
  ">": M.gt,
  '"': M.quote,
  "'": M.quote,
  "=": M.equal,
  "/": M.slash
}, vd = function(e) {
  return bd[e] || M.char;
}, _d = function(e) {
  var n, r, s, i, o, a, l, c, f, h;
  e = Object.assign({ debug: !1 }, e);
  var p = new md(), m = W.data, b = "", C = "", D = "", w = "", G = "", R = "", k = function(ge, N) {
    if (!(C[0] === "?" || C[0] === "!")) {
      var ee = { type: ge, value: N };
      e.debug && console.log("emit:", ee), p.emit("data", ee);
    }
  };
  p.stateMachine = (h = {}, B(h, W.data, (n = {}, B(n, M.lt, function() {
    b.trim() && k(te.text, b), C = "", G = !1, m = W.tagBegin;
  }), B(n, M.char, function(V) {
    b += V;
  }), n)), B(h, W.cdata, B({}, M.char, function(V) {
    b += V, b.substr(-3) === "]]>" && (k(te.text, b.slice(0, -3)), b = "", m = W.data);
  })), B(h, W.tagBegin, (r = {}, B(r, M.space, Qt), B(r, M.char, function(V) {
    C = V, m = W.tagName;
  }), B(r, M.slash, function() {
    C = "", G = !0;
  }), r)), B(h, W.tagName, (s = {}, B(s, M.space, function() {
    G ? m = W.tagEnd : (m = W.attributeNameStart, k(te.openTag, C));
  }), B(s, M.gt, function() {
    k(G ? te.closeTag : te.openTag, C), b = "", m = W.data;
  }), B(s, M.slash, function() {
    m = W.tagEnd, k(te.openTag, C);
  }), B(s, M.char, function(V) {
    C += V, C === "![CDATA[" && (m = W.cdata, b = "", C = "");
  }), s)), B(h, W.tagEnd, (i = {}, B(i, M.gt, function() {
    k(te.closeTag, C), b = "", m = W.data;
  }), B(i, M.char, Qt), i)), B(h, W.attributeNameStart, (o = {}, B(o, M.char, function(V) {
    D = V, m = W.attributeName;
  }), B(o, M.gt, function() {
    b = "", m = W.data;
  }), B(o, M.space, Qt), B(o, M.slash, function() {
    G = !0, m = W.tagEnd;
  }), o)), B(h, W.attributeName, (a = {}, B(a, M.space, function() {
    m = W.attributeNameEnd;
  }), B(a, M.equal, function() {
    k(te.attributeName, D), m = W.attributeValueBegin;
  }), B(a, M.gt, function() {
    w = "", k(te.attributeName, D), k(te.attributeValue, w), b = "", m = W.data;
  }), B(a, M.slash, function() {
    G = !0, w = "", k(te.attributeName, D), k(te.attributeValue, w), m = W.tagEnd;
  }), B(a, M.char, function(V) {
    D += V;
  }), a)), B(h, W.attributeNameEnd, (l = {}, B(l, M.space, Qt), B(l, M.equal, function() {
    k(te.attributeName, D), m = W.attributeValueBegin;
  }), B(l, M.gt, function() {
    w = "", k(te.attributeName, D), k(te.attributeValue, w), b = "", m = W.data;
  }), B(l, M.char, function(V) {
    w = "", k(te.attributeName, D), k(te.attributeValue, w), D = V, m = W.attributeName;
  }), l)), B(h, W.attributeValueBegin, (c = {}, B(c, M.space, Qt), B(c, M.quote, function(V) {
    R = V, w = "", m = W.attributeValue;
  }), B(c, M.gt, function() {
    w = "", k(te.attributeValue, w), b = "", m = W.data;
  }), B(c, M.char, function(V) {
    R = "", w = V, m = W.attributeValue;
  }), c)), B(h, W.attributeValue, (f = {}, B(f, M.space, function(V) {
    R ? w += V : (k(te.attributeValue, w), m = W.attributeNameStart);
  }), B(f, M.quote, function(V) {
    R === V ? (k(te.attributeValue, w), m = W.attributeNameStart) : w += V;
  }), B(f, M.gt, function(V) {
    R ? w += V : (k(te.attributeValue, w), b = "", m = W.data);
  }), B(f, M.slash, function(V) {
    R ? w += V : (k(te.attributeValue, w), G = !0, m = W.tagEnd);
  }), B(f, M.char, function(V) {
    w += V;
  }), f)), h);
  var ue = function(ge) {
    e.debug && console.log(m, ge);
    var N = p.stateMachine[m], ee = N[vd(ge)] || N[M.error] || N[M.char];
    ee(ge);
  };
  return p.write = function(V) {
    for (var ge = V.length, N = 0; N < ge; N++)
      ue(V[N]);
  }, p;
}, yd = {
  State: W,
  Action: M,
  Type: te,
  create: _d
}, Cd = Wn, Ca = yd, Zt = Ca.Type, Ds = {
  element: "element",
  text: "text"
}, Nr = function(e) {
  return Object.assign({
    name: "",
    type: Ds.element,
    value: "",
    parent: null,
    attributes: {},
    children: []
  }, e);
}, wa = function(e) {
  e = Object.assign({
    stream: !1,
    parentNodes: !0,
    doneEvent: "done",
    tagPrefix: "tag:",
    emitTopLevelOnly: !1,
    debug: !1
  }, e);
  var n = void 0, r = void 0, s = void 0, i = void 0, o = new Cd(), a = function(c) {
    switch (c.type) {
      case Zt.openTag:
        if (s === null)
          s = r, s.name = c.value;
        else {
          var f = Nr({
            name: c.value,
            parent: s
          });
          s.children.push(f), s = f;
        }
        break;
      case Zt.closeTag:
        var h = s.parent;
        if (e.parentNodes || (s.parent = null), s.name !== c.value)
          break;
        e.stream && h === r && (r.children = [], s.parent = null), (!e.emitTopLevelOnly || h === r) && (o.emit(e.tagPrefix + s.name, s), o.emit("tag", s.name, s)), s === r && (n.removeAllListeners("data"), o.emit(e.doneEvent, s), r = null), s = h;
        break;
      case Zt.text:
        s && s.children.push(Nr({
          type: Ds.text,
          value: c.value,
          parent: e.parentNodes ? s : null
        }));
        break;
      case Zt.attributeName:
        i = c.value, s.attributes[i] = "";
        break;
      case Zt.attributeValue:
        s.attributes[i] = c.value;
        break;
    }
  };
  return o.reset = function() {
    n = Ca.create({ debug: e.debug }), n.on("data", a), r = Nr(), s = null, i = "", o.parse = n.write;
  }, o.reset(), o;
}, wd = function(e, n) {
  n = Object.assign({}, n, { stream: !1, tagPrefix: ":" });
  var r = wa(n), s = void 0;
  return r.on("done", function(i) {
    s = i;
  }), r.parse(e), s;
}, Sd = {
  parseSync: wd,
  create: wa,
  NodeType: Ds
}, Ad = function(e) {
  var n = Sd.parseSync("<root>".concat(e, "</root>"), {
    parentNodes: !1
  }), r = n.children && n.children.length > 0 && n.children.every(function(s) {
    return s.name === "svg";
  });
  if (r)
    return n.children.length === 1 ? n.children[0] : n.children;
  throw Error("nothing to parse");
}, Ed = function(e) {
  return od(e, ["parent"]);
}, xd = function(e) {
  return pd(e, function(n) {
    return Od(n) ? n : Pd(n);
  });
}, Pd = function(e) {
  return e.replace(/[-|:]([a-z])/gi, function(n, r) {
    return r.toUpperCase();
  });
}, Od = function(e) {
  return /^(data|aria)(-\w+)/.test(e);
}, Dd = function(e) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = n.transformNode, s = r === void 0 ? function(l) {
    return l;
  } : r, i = n.camelcase, o = i === void 0 ? !1 : i, a = function(c) {
    var f;
    return f = Ed(c), f = s(f), o && (f = xd(f)), f;
  };
  return a(Ad(e));
};
const Rd = function(t) {
  return t.split(";").reduce((e, n) => {
    let [r, s] = n.split(":");
    return r === "fill" && s !== "none" && (s = "currentColor"), r === "stroke" && s !== "none" && (s = "currentColor"), e[r] = s, e;
  }, {});
};
function Rs(t, e) {
  const n = Dd(e);
  n.attributes.width = "1em", n.attributes.height = "1em", n.attributes.xmlns = "http://www.w3.org/2000/svg";
  const { multicolor: r, pathfill: s, twotone: i } = n.attributes, o = function(l) {
    const { fill: c, stroke: f, style: h } = l, p = !i && c && ["none", "white", "#fff"].includes(c) === !1;
    if (i === "true" && c === void 0 ? l.fill = "currentColor" : (p || s !== void 0) && (l.fill = t.color === void 0 ? "currentColor" : t.color), f !== void 0 && f !== "none" && (l.stroke = t.color === void 0 ? "currentColor" : t.color), h !== void 0) {
      const m = Rd(h);
      l = {
        ...l,
        ...m
      }, l.style = "";
    }
    return l;
  }, a = function(l) {
    const { name: c, attributes: f, children: h } = l;
    if (r !== "true" && (l.attributes = o(f)), Array.isArray(h)) {
      const { attributes: p } = l;
      return c === "title" ? gr(c, p) : gr(c, p, h.map(a));
    }
    return gr(c, l.attributes);
  };
  return a(n);
}
const Td = (t) => Rs(t, '<svg width="512" height="512" viewBox="0 0 512 512" fill="currentColor"><path d="M221.09 64a157.09 157.09 0 1 0 157.09 157.09A157.1 157.1 0 0 0 221.09 64Z" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px"/><path d="M338.29 338.29 448 448" style="fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"/></svg>'), Id = (t) => Rs(t, '<svg width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>'), Md = (t) => Rs(t, '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>'), Nd = { class: "tree-view-wrapper" }, $d = { class: "search-container" }, kd = { slot: "start" }, Fd = { slot: "end" }, Ld = { class: "container" }, Bd = {
  key: 0,
  class: "tree-view"
}, Ud = ["data-expanded", "onClick"], Vd = {
  key: 0,
  class: "tree-view-body"
}, jd = ["innerHTML"], Wd = { key: 1 }, Hd = /* @__PURE__ */ Co({
  __name: "TreeView",
  props: {
    /**
     * The data to be displayed in the tree view
     */
    data: {
      type: Object,
      required: !0
    }
  },
  emits: ["refresh"],
  setup(t) {
    const n = Cl(t, "data"), r = Ln([]), s = Ln(""), i = Gr(() => {
      const p = s.value.toLowerCase();
      if (p.length === 0)
        return n.value;
      const m = {};
      return Object.keys(n.value).forEach((b) => {
        const C = n.value[b], D = {};
        if (b.toLowerCase().includes(p)) {
          m[b] = C;
          return;
        }
        Object.keys(C).forEach((w) => {
          w.toLowerCase().includes(p) && (D[w] = C[w]);
        }), Object.keys(D).length > 0 && (m[b] = D);
      }), m;
    }), o = Gr(() => {
      const p = {};
      return Object.keys(i.value).sort().forEach((m) => {
        p[m] = i.value[m];
      }), p;
    }), a = (p) => {
      const m = p.target;
      s.value = m.value;
    }, l = (p) => [
      "bg",
      "text",
      "border",
      "ring",
      "from",
      "to",
      "divide",
      "placeholder",
      "via",
      "decoration",
      "outline",
      "accent",
      "shadow",
      "caret"
    ].some((b) => p.startsWith(`.${b}-`)), c = (p, m) => {
      const C = {
        backgroundColor: "color",
        textColor: "color",
        borderColor: "color",
        ringColor: "color",
        ringOffsetColor: "color",
        gradientColorStops: "gradient",
        divideColor: "color",
        placeholderColor: "color",
        textDecorationColor: "color",
        outlineColor: "color",
        accentColor: "color",
        boxShadowColor: "color",
        caretColor: "color"
      }[p], D = Object.keys(m).find((R) => R.includes(C)), w = Object.keys(m).find((R) => R.includes("opacity"));
      if (D === void 0)
        return console.warn("colorProp is undefined", p, m), {};
      const G = {
        backgroundColor: m[D]
      };
      return w !== void 0 && (G[w] = m[w]), G;
    }, f = (p) => p.replace("\\/", "/").replace("\\.", ".").replace("> :not([hidden]) ~ :not([hidden])", '<span class="less-opacity">> :not([hidden]) ~ :not([hidden])</span>'), h = (p) => {
      const m = r.value.indexOf(p);
      m === -1 ? r.value.push(p) : r.value.splice(m, 1);
    };
    return (p, m) => {
      const b = Zl("vscode-text-field");
      return xe(), Ne("div", Nd, [
        Ze("div", $d, [
          pe(b, {
            placeholder: "Search ...",
            class: "search-input",
            value: s.value,
            onKeyup: a
          }, {
            default: mo(() => [
              Ze("span", kd, [
                pe(bt(Td))
              ]),
              Ze("span", Fd, [
                s.value.length > 0 ? (xe(), Ne("div", {
                  key: 0,
                  class: "clear-button",
                  onClick: m[0] || (m[0] = (C) => s.value = "")
                }, [
                  pe(bt(Md))
                ])) : zt("", !0)
              ])
            ]),
            _: 1
          }, 8, ["value"])
        ]),
        Ze("div", Ld, [
          Object.keys(bt(o)).length > 0 ? (xe(), Ne("div", Bd, [
            (xe(!0), Ne(De, null, Xs(bt(o), (C, D) => (xe(), Ne("div", { key: D }, [
              Ze("div", {
                class: "tree-view-heading",
                "data-expanded": r.value.includes(D),
                onClick: (w) => h(D)
              }, [
                pe(bt(Id), { class: "chevron" }),
                Ze("span", null, Ui(D), 1)
              ], 8, Ud),
              r.value.includes(D) ? (xe(), Ne("div", Vd, [
                (xe(!0), Ne(De, null, Xs(C, (w, G) => (xe(), Ne("div", {
                  key: G,
                  class: "tree-body-item"
                }, [
                  Ze("span", {
                    innerHTML: f(G)
                  }, null, 8, jd),
                  l(G) ? (xe(), Ne("span", {
                    key: 0,
                    class: "color-box",
                    style: Hn(c(D, w))
                  }, null, 4)) : zt("", !0)
                ]))), 128))
              ])) : zt("", !0)
            ]))), 128))
          ])) : zt("", !0),
          s.value.length > 0 && Object.keys(bt(o)).length === 0 ? (xe(), Ne("div", Wd, " No results found ")) : zt("", !0)
        ])
      ]);
    };
  }
});
const zd = {
  key: 1,
  class: "error"
}, qd = /* @__PURE__ */ Co({
  __name: "App",
  setup(t) {
    const e = Ln({}), n = Ln("");
    bf().register(Uf(), Ff()), window.addEventListener("message", (s) => {
      const i = s.data, { payload: o, command: a } = i;
      switch (a) {
        case "init": {
          e.value = o;
          break;
        }
        case "error": {
          n.value = o;
          break;
        }
      }
    });
    const r = function() {
      jf.postMessage({
        command: "refresh"
      });
    };
    return (s, i) => n.value === "" ? (xe(), ko(Hd, {
      key: 0,
      data: e.value,
      onRefresh: r
    }, null, 8, ["data"])) : (xe(), Ne("div", zd, Ui(n.value), 1));
  }
});
const Sa = nu(qd);
Sa.config.errorHandler = (t, e, n) => {
  console.log(" --- ERROR ---", t, e, n);
};
Sa.mount("#app");
