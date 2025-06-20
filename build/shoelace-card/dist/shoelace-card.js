/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = globalThis, gt = K.ShadowRoot && (K.ShadyCSS === void 0 || K.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ft = Symbol(), At = /* @__PURE__ */ new WeakMap();
let Ht = class {
  constructor(t, o, r) {
    if (this._$cssResult$ = !0, r !== ft) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = o;
  }
  get styleSheet() {
    let t = this.o;
    const o = this.t;
    if (gt && t === void 0) {
      const r = o !== void 0 && o.length === 1;
      r && (t = At.get(o)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && At.set(o, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const de = (e) => new Ht(typeof e == "string" ? e : e + "", void 0, ft), z = (e, ...t) => {
  const o = e.length === 1 ? e[0] : t.reduce((r, s, l) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[l + 1], e[0]);
  return new Ht(o, e, ft);
}, he = (e, t) => {
  if (gt) e.adoptedStyleSheets = t.map((o) => o instanceof CSSStyleSheet ? o : o.styleSheet);
  else for (const o of t) {
    const r = document.createElement("style"), s = K.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = o.cssText, e.appendChild(r);
  }
}, Et = gt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let o = "";
  for (const r of t.cssRules) o += r.cssText;
  return de(o);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ue, defineProperty: pe, getOwnPropertyDescriptor: me, getOwnPropertyNames: be, getOwnPropertySymbols: ge, getPrototypeOf: fe } = Object, $ = globalThis, St = $.trustedTypes, ve = St ? St.emptyScript : "", ye = $.reactiveElementPolyfillSupport, R = (e, t) => e, ot = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ve : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let o = e;
  switch (t) {
    case Boolean:
      o = e !== null;
      break;
    case Number:
      o = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        o = JSON.parse(e);
      } catch {
        o = null;
      }
  }
  return o;
} }, vt = (e, t) => !ue(e, t), zt = { attribute: !0, type: String, converter: ot, reflect: !1, useDefault: !1, hasChanged: vt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), $.litPropertyMetadata ?? ($.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let M = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, o = zt) {
    if (o.state && (o.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((o = Object.create(o)).wrapped = !0), this.elementProperties.set(t, o), !o.noAccessor) {
      const r = Symbol(), s = this.getPropertyDescriptor(t, r, o);
      s !== void 0 && pe(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, o, r) {
    const { get: s, set: l } = me(this.prototype, t) ?? { get() {
      return this[o];
    }, set(a) {
      this[o] = a;
    } };
    return { get: s, set(a) {
      const n = s?.call(this);
      l?.call(this, a), this.requestUpdate(t, n, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? zt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(R("elementProperties"))) return;
    const t = fe(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(R("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(R("properties"))) {
      const o = this.properties, r = [...be(o), ...ge(o)];
      for (const s of r) this.createProperty(s, o[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const o = litPropertyMetadata.get(t);
      if (o !== void 0) for (const [r, s] of o) this.elementProperties.set(r, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [o, r] of this.elementProperties) {
      const s = this._$Eu(o, r);
      s !== void 0 && this._$Eh.set(s, o);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const o = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const s of r) o.unshift(Et(s));
    } else t !== void 0 && o.push(Et(t));
    return o;
  }
  static _$Eu(t, o) {
    const r = o.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), o = this.constructor.elementProperties;
    for (const r of o.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return he(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, o, r) {
    this._$AK(t, r);
  }
  _$ET(t, o) {
    const r = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, r);
    if (s !== void 0 && r.reflect === !0) {
      const l = (r.converter?.toAttribute !== void 0 ? r.converter : ot).toAttribute(o, r.type);
      this._$Em = t, l == null ? this.removeAttribute(s) : this.setAttribute(s, l), this._$Em = null;
    }
  }
  _$AK(t, o) {
    const r = this.constructor, s = r._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const l = r.getPropertyOptions(s), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : l.converter?.fromAttribute !== void 0 ? l.converter : ot;
      this._$Em = s, this[s] = a.fromAttribute(o, l.type) ?? this._$Ej?.get(s) ?? null, this._$Em = null;
    }
  }
  requestUpdate(t, o, r) {
    if (t !== void 0) {
      const s = this.constructor, l = this[t];
      if (r ?? (r = s.getPropertyOptions(t)), !((r.hasChanged ?? vt)(l, o) || r.useDefault && r.reflect && l === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, r)))) return;
      this.C(t, o, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, o, { useDefault: r, reflect: s, wrapped: l }, a) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? o ?? this[t]), l !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (o = void 0), this._$AL.set(t, o)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (o) {
      Promise.reject(o);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [s, l] of this._$Ep) this[s] = l;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [s, l] of r) {
        const { wrapped: a } = l, n = this[s];
        a !== !0 || this._$AL.has(s) || n === void 0 || this.C(s, void 0, l, n);
      }
    }
    let t = !1;
    const o = this._$AL;
    try {
      t = this.shouldUpdate(o), t ? (this.willUpdate(o), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(o)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(o);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((o) => o.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((o) => this._$ET(o, this[o]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
M.elementStyles = [], M.shadowRootOptions = { mode: "open" }, M[R("elementProperties")] = /* @__PURE__ */ new Map(), M[R("finalized")] = /* @__PURE__ */ new Map(), ye?.({ ReactiveElement: M }), ($.reactiveElementVersions ?? ($.reactiveElementVersions = [])).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = globalThis, rt = V.trustedTypes, Mt = rt ? rt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ft = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, jt = "?" + _, we = `<${jt}>`, E = document, F = () => E.createComment(""), j = (e) => e === null || typeof e != "object" && typeof e != "function", yt = Array.isArray, xe = (e) => yt(e) || typeof e?.[Symbol.iterator] == "function", nt = `[ 	
\f\r]`, T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Pt = /-->/g, Lt = />/g, k = RegExp(`>|${nt}(?:([^\\s"'>=/]+)(${nt}*=${nt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), It = /'/g, Tt = /"/g, qt = /^(?:script|style|textarea|title)$/i, _e = (e) => (t, ...o) => ({ _$litType$: e, strings: t, values: o }), W = _e(1), S = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), Ot = /* @__PURE__ */ new WeakMap(), A = E.createTreeWalker(E, 129);
function Wt(e, t) {
  if (!yt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Mt !== void 0 ? Mt.createHTML(t) : t;
}
const $e = (e, t) => {
  const o = e.length - 1, r = [];
  let s, l = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = T;
  for (let n = 0; n < o; n++) {
    const i = e[n];
    let h, u, p = -1, w = 0;
    for (; w < i.length && (a.lastIndex = w, u = a.exec(i), u !== null); ) w = a.lastIndex, a === T ? u[1] === "!--" ? a = Pt : u[1] !== void 0 ? a = Lt : u[2] !== void 0 ? (qt.test(u[2]) && (s = RegExp("</" + u[2], "g")), a = k) : u[3] !== void 0 && (a = k) : a === k ? u[0] === ">" ? (a = s ?? T, p = -1) : u[1] === void 0 ? p = -2 : (p = a.lastIndex - u[2].length, h = u[1], a = u[3] === void 0 ? k : u[3] === '"' ? Tt : It) : a === Tt || a === It ? a = k : a === Pt || a === Lt ? a = T : (a = k, s = void 0);
    const x = a === k && e[n + 1].startsWith("/>") ? " " : "";
    l += a === T ? i + we : p >= 0 ? (r.push(h), i.slice(0, p) + Ft + i.slice(p) + _ + x) : i + _ + (p === -2 ? n : x);
  }
  return [Wt(e, l + (e[o] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class q {
  constructor({ strings: t, _$litType$: o }, r) {
    let s;
    this.parts = [];
    let l = 0, a = 0;
    const n = t.length - 1, i = this.parts, [h, u] = $e(t, o);
    if (this.el = q.createElement(h, r), A.currentNode = this.el.content, o === 2 || o === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (s = A.nextNode()) !== null && i.length < n; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const p of s.getAttributeNames()) if (p.endsWith(Ft)) {
          const w = u[a++], x = s.getAttribute(p).split(_), Q = /([.?@])?(.*)/.exec(w);
          i.push({ type: 1, index: l, name: Q[2], strings: x, ctor: Q[1] === "." ? Ce : Q[1] === "?" ? Ae : Q[1] === "@" ? Ee : lt }), s.removeAttribute(p);
        } else p.startsWith(_) && (i.push({ type: 6, index: l }), s.removeAttribute(p));
        if (qt.test(s.tagName)) {
          const p = s.textContent.split(_), w = p.length - 1;
          if (w > 0) {
            s.textContent = rt ? rt.emptyScript : "";
            for (let x = 0; x < w; x++) s.append(p[x], F()), A.nextNode(), i.push({ type: 2, index: ++l });
            s.append(p[w], F());
          }
        }
      } else if (s.nodeType === 8) if (s.data === jt) i.push({ type: 2, index: l });
      else {
        let p = -1;
        for (; (p = s.data.indexOf(_, p + 1)) !== -1; ) i.push({ type: 7, index: l }), p += _.length - 1;
      }
      l++;
    }
  }
  static createElement(t, o) {
    const r = E.createElement("template");
    return r.innerHTML = t, r;
  }
}
function L(e, t, o = e, r) {
  if (t === S) return t;
  let s = r !== void 0 ? o._$Co?.[r] : o._$Cl;
  const l = j(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== l && (s?._$AO?.(!1), l === void 0 ? s = void 0 : (s = new l(e), s._$AT(e, o, r)), r !== void 0 ? (o._$Co ?? (o._$Co = []))[r] = s : o._$Cl = s), s !== void 0 && (t = L(e, s._$AS(e, t.values), s, r)), t;
}
class ke {
  constructor(t, o) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = o;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: o }, parts: r } = this._$AD, s = (t?.creationScope ?? E).importNode(o, !0);
    A.currentNode = s;
    let l = A.nextNode(), a = 0, n = 0, i = r[0];
    for (; i !== void 0; ) {
      if (a === i.index) {
        let h;
        i.type === 2 ? h = new Z(l, l.nextSibling, this, t) : i.type === 1 ? h = new i.ctor(l, i.name, i.strings, this, t) : i.type === 6 && (h = new Se(l, this, t)), this._$AV.push(h), i = r[++n];
      }
      a !== i?.index && (l = A.nextNode(), a++);
    }
    return A.currentNode = E, s;
  }
  p(t) {
    let o = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, o), o += r.strings.length - 2) : r._$AI(t[o])), o++;
  }
}
class Z {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, o, r, s) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = t, this._$AB = o, this._$AM = r, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const o = this._$AM;
    return o !== void 0 && t?.nodeType === 11 && (t = o.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, o = this) {
    t = L(this, t, o), j(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== S && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : xe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== g && j(this._$AH) ? this._$AA.nextSibling.data = t : this.T(E.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: o, _$litType$: r } = t, s = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = q.createElement(Wt(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === s) this._$AH.p(o);
    else {
      const l = new ke(s, this), a = l.u(this.options);
      l.p(o), this.T(a), this._$AH = l;
    }
  }
  _$AC(t) {
    let o = Ot.get(t.strings);
    return o === void 0 && Ot.set(t.strings, o = new q(t)), o;
  }
  k(t) {
    yt(this._$AH) || (this._$AH = [], this._$AR());
    const o = this._$AH;
    let r, s = 0;
    for (const l of t) s === o.length ? o.push(r = new Z(this.O(F()), this.O(F()), this, this.options)) : r = o[s], r._$AI(l), s++;
    s < o.length && (this._$AR(r && r._$AB.nextSibling, s), o.length = s);
  }
  _$AR(t = this._$AA.nextSibling, o) {
    for (this._$AP?.(!1, !0, o); t && t !== this._$AB; ) {
      const r = t.nextSibling;
      t.remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class lt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, o, r, s, l) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = t, this.name = o, this._$AM = s, this.options = l, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = g;
  }
  _$AI(t, o = this, r, s) {
    const l = this.strings;
    let a = !1;
    if (l === void 0) t = L(this, t, o, 0), a = !j(t) || t !== this._$AH && t !== S, a && (this._$AH = t);
    else {
      const n = t;
      let i, h;
      for (t = l[0], i = 0; i < l.length - 1; i++) h = L(this, n[r + i], o, i), h === S && (h = this._$AH[i]), a || (a = !j(h) || h !== this._$AH[i]), h === g ? t = g : t !== g && (t += (h ?? "") + l[i + 1]), this._$AH[i] = h;
    }
    a && !s && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ce extends lt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === g ? void 0 : t;
  }
}
class Ae extends lt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== g);
  }
}
class Ee extends lt {
  constructor(t, o, r, s, l) {
    super(t, o, r, s, l), this.type = 5;
  }
  _$AI(t, o = this) {
    if ((t = L(this, t, o, 0) ?? g) === S) return;
    const r = this._$AH, s = t === g && r !== g || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, l = t !== g && (r === g || s);
    s && this.element.removeEventListener(this.name, this, r), l && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Se {
  constructor(t, o, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = o, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    L(this, t);
  }
}
const ze = V.litHtmlPolyfillSupport;
ze?.(q, Z), (V.litHtmlVersions ?? (V.litHtmlVersions = [])).push("3.3.0");
const Me = (e, t, o) => {
  const r = o?.renderBefore ?? t;
  let s = r._$litPart$;
  if (s === void 0) {
    const l = o?.renderBefore ?? null;
    r._$litPart$ = s = new Z(t.insertBefore(F(), l), l, void 0, o ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis;
let H = class extends M {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var o;
    const t = super.createRenderRoot();
    return (o = this.renderOptions).renderBefore ?? (o.renderBefore = t.firstChild), t;
  }
  update(t) {
    const o = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Me(o, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return S;
  }
};
H._$litElement$ = !0, H.finalized = !0, D.litElementHydrateSupport?.({ LitElement: H });
const Pe = D.litElementPolyfillSupport;
Pe?.({ LitElement: H });
(D.litElementVersions ?? (D.litElementVersions = [])).push("4.2.0");
var Le = z`
  :host {
    --border-color: var(--sl-color-neutral-200);
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 1px;
    --padding: var(--sl-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-small);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
  }

  .card__image {
    display: flex;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card__header {
    display: block;
    border-bottom: solid var(--border-width) var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card:not(.card--has-image) .card__header {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .card__body {
    display: block;
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    display: block;
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`, Zt = class {
  constructor(e, ...t) {
    this.slotNames = [], this.handleSlotChange = (o) => {
      const r = o.target;
      (this.slotNames.includes("[default]") && !r.name || r.name && this.slotNames.includes(r.name)) && this.host.requestUpdate();
    }, (this.host = e).addController(this), this.slotNames = t;
  }
  hasDefaultSlot() {
    return [...this.host.childNodes].some((e) => {
      if (e.nodeType === e.TEXT_NODE && e.textContent.trim() !== "")
        return !0;
      if (e.nodeType === e.ELEMENT_NODE) {
        const t = e;
        if (t.tagName.toLowerCase() === "sl-visually-hidden")
          return !1;
        if (!t.hasAttribute("slot"))
          return !0;
      }
      return !1;
    });
  }
  hasNamedSlot(e) {
    return this.host.querySelector(`:scope > [slot="${e}"]`) !== null;
  }
  test(e) {
    return e === "[default]" ? this.hasDefaultSlot() : this.hasNamedSlot(e);
  }
  hostConnected() {
    this.host.shadowRoot.addEventListener("slotchange", this.handleSlotChange);
  }
  hostDisconnected() {
    this.host.shadowRoot.removeEventListener("slotchange", this.handleSlotChange);
  }
}, I = z`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`, Gt = Object.defineProperty, Ie = Object.defineProperties, Te = Object.getOwnPropertyDescriptor, Oe = Object.getOwnPropertyDescriptors, Bt = Object.getOwnPropertySymbols, Be = Object.prototype.hasOwnProperty, Ne = Object.prototype.propertyIsEnumerable, Yt = (e) => {
  throw TypeError(e);
}, Nt = (e, t, o) => t in e ? Gt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o, G = (e, t) => {
  for (var o in t || (t = {}))
    Be.call(t, o) && Nt(e, o, t[o]);
  if (Bt)
    for (var o of Bt(t))
      Ne.call(t, o) && Nt(e, o, t[o]);
  return e;
}, Qt = (e, t) => Ie(e, Oe(t)), c = (e, t, o, r) => {
  for (var s = r > 1 ? void 0 : r ? Te(t, o) : t, l = e.length - 1, a; l >= 0; l--)
    (a = e[l]) && (s = (r ? a(t, o, s) : a(s)) || s);
  return r && s && Gt(t, o, s), s;
}, Xt = (e, t, o) => t.has(e) || Yt("Cannot " + o), Ue = (e, t, o) => (Xt(e, t, "read from private field"), t.get(e)), Re = (e, t, o) => t.has(e) ? Yt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), Ve = (e, t, o, r) => (Xt(e, t, "write to private field"), t.set(e, o), o);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const De = { attribute: !0, type: String, converter: ot, reflect: !1, hasChanged: vt }, He = (e = De, t, o) => {
  const { kind: r, metadata: s } = o;
  let l = globalThis.litPropertyMetadata.get(s);
  if (l === void 0 && globalThis.litPropertyMetadata.set(s, l = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), l.set(o.name, e), r === "accessor") {
    const { name: a } = o;
    return { set(n) {
      const i = t.get.call(this);
      t.set.call(this, n), this.requestUpdate(a, i, e);
    }, init(n) {
      return n !== void 0 && this.C(a, void 0, e, n), n;
    } };
  }
  if (r === "setter") {
    const { name: a } = o;
    return function(n) {
      const i = this[a];
      t.call(this, n), this.requestUpdate(a, i, e);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function d(e) {
  return (t, o) => typeof o == "object" ? He(e, t, o) : ((r, s, l) => {
    const a = s.hasOwnProperty(l);
    return s.constructor.createProperty(l, r), a ? Object.getOwnPropertyDescriptor(s, l) : void 0;
  })(e, t, o);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function at(e) {
  return d({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Fe = (e, t, o) => (o.configurable = !0, o.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, o), o);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Jt(e, t) {
  return (o, r, s) => {
    const l = (a) => a.renderRoot?.querySelector(e) ?? null;
    return Fe(o, r, { get() {
      return l(this);
    } });
  };
}
var tt, v = class extends H {
  constructor() {
    super(), Re(this, tt, !1), this.initialReflectedProperties = /* @__PURE__ */ new Map(), Object.entries(this.constructor.dependencies).forEach(([e, t]) => {
      this.constructor.define(e, t);
    });
  }
  emit(e, t) {
    const o = new CustomEvent(e, G({
      bubbles: !0,
      cancelable: !1,
      composed: !0,
      detail: {}
    }, t));
    return this.dispatchEvent(o), o;
  }
  /* eslint-enable */
  static define(e, t = this, o = {}) {
    const r = customElements.get(e);
    if (!r) {
      try {
        customElements.define(e, t, o);
      } catch {
        customElements.define(e, class extends t {
        }, o);
      }
      return;
    }
    let s = " (unknown version)", l = s;
    "version" in t && t.version && (s = " v" + t.version), "version" in r && r.version && (l = " v" + r.version), !(s && l && s === l) && console.warn(
      `Attempted to register <${e}>${s}, but <${e}>${l} has already been registered.`
    );
  }
  attributeChangedCallback(e, t, o) {
    Ue(this, tt) || (this.constructor.elementProperties.forEach(
      (r, s) => {
        r.reflect && this[s] != null && this.initialReflectedProperties.set(s, this[s]);
      }
    ), Ve(this, tt, !0)), super.attributeChangedCallback(e, t, o);
  }
  willUpdate(e) {
    super.willUpdate(e), this.initialReflectedProperties.forEach((t, o) => {
      e.has(o) && this[o] == null && (this[o] = t);
    });
  }
};
tt = /* @__PURE__ */ new WeakMap();
v.version = "2.20.1";
v.dependencies = {};
c([
  d()
], v.prototype, "dir", 2);
c([
  d()
], v.prototype, "lang", 2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const je = { ATTRIBUTE: 1 }, qe = (e) => (...t) => ({ _$litDirective$: e, values: t });
let We = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, o, r) {
    this._$Ct = t, this._$AM = o, this._$Ci = r;
  }
  _$AS(t, o) {
    return this.update(t, o);
  }
  update(t, o) {
    return this.render(...o);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it = qe(class extends We {
  constructor(e) {
    if (super(e), e.type !== je.ATTRIBUTE || e.name !== "class" || e.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return " " + Object.keys(e).filter((t) => e[t]).join(" ") + " ";
  }
  update(e, [t]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), e.strings !== void 0 && (this.nt = new Set(e.strings.join(" ").split(/\s/).filter((r) => r !== "")));
      for (const r in t) t[r] && !this.nt?.has(r) && this.st.add(r);
      return this.render(t);
    }
    const o = e.element.classList;
    for (const r of this.st) r in t || (o.remove(r), this.st.delete(r));
    for (const r in t) {
      const s = !!t[r];
      s === this.st.has(r) || this.nt?.has(r) || (s ? (o.add(r), this.st.add(r)) : (o.remove(r), this.st.delete(r)));
    }
    return S;
  }
});
var Kt = class extends v {
  constructor() {
    super(...arguments), this.hasSlotController = new Zt(this, "footer", "header", "image");
  }
  render() {
    return W`
      <div
        part="base"
        class=${it({
      card: !0,
      "card--has-footer": this.hasSlotController.test("footer"),
      "card--has-image": this.hasSlotController.test("image"),
      "card--has-header": this.hasSlotController.test("header")
    })}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `;
  }
};
Kt.styles = [I, Le];
Kt.define("sl-card");
var Ze = z`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`;
const ut = /* @__PURE__ */ new Set(), P = /* @__PURE__ */ new Map();
let C, wt = "ltr", xt = "en";
const te = typeof MutationObserver < "u" && typeof document < "u" && typeof document.documentElement < "u";
if (te) {
  const e = new MutationObserver(oe);
  wt = document.documentElement.dir || "ltr", xt = document.documentElement.lang || navigator.language, e.observe(document.documentElement, {
    attributes: !0,
    attributeFilter: ["dir", "lang"]
  });
}
function ee(...e) {
  e.map((t) => {
    const o = t.$code.toLowerCase();
    P.has(o) ? P.set(o, Object.assign(Object.assign({}, P.get(o)), t)) : P.set(o, t), C || (C = t);
  }), oe();
}
function oe() {
  te && (wt = document.documentElement.dir || "ltr", xt = document.documentElement.lang || navigator.language), [...ut.keys()].map((e) => {
    typeof e.requestUpdate == "function" && e.requestUpdate();
  });
}
let Ge = class {
  constructor(t) {
    this.host = t, this.host.addController(this);
  }
  hostConnected() {
    ut.add(this.host);
  }
  hostDisconnected() {
    ut.delete(this.host);
  }
  dir() {
    return `${this.host.dir || wt}`.toLowerCase();
  }
  lang() {
    return `${this.host.lang || xt}`.toLowerCase();
  }
  getTranslationData(t) {
    var o, r;
    const s = new Intl.Locale(t.replace(/_/g, "-")), l = s?.language.toLowerCase(), a = (r = (o = s?.region) === null || o === void 0 ? void 0 : o.toLowerCase()) !== null && r !== void 0 ? r : "", n = P.get(`${l}-${a}`), i = P.get(l);
    return { locale: s, language: l, region: a, primary: n, secondary: i };
  }
  exists(t, o) {
    var r;
    const { primary: s, secondary: l } = this.getTranslationData((r = o.lang) !== null && r !== void 0 ? r : this.lang());
    return o = Object.assign({ includeFallback: !1 }, o), !!(s && s[t] || l && l[t] || o.includeFallback && C && C[t]);
  }
  term(t, ...o) {
    const { primary: r, secondary: s } = this.getTranslationData(this.lang());
    let l;
    if (r && r[t])
      l = r[t];
    else if (s && s[t])
      l = s[t];
    else if (C && C[t])
      l = C[t];
    else
      return console.error(`No translation found for: ${String(t)}`), String(t);
    return typeof l == "function" ? l(...o) : l;
  }
  date(t, o) {
    return t = new Date(t), new Intl.DateTimeFormat(this.lang(), o).format(t);
  }
  number(t, o) {
    return t = Number(t), isNaN(t) ? "" : new Intl.NumberFormat(this.lang(), o).format(t);
  }
  relativeTime(t, o, r) {
    return new Intl.RelativeTimeFormat(this.lang(), r).format(t, o);
  }
};
var re = {
  $code: "en",
  $name: "English",
  $dir: "ltr",
  carousel: "Carousel",
  clearEntry: "Clear entry",
  close: "Close",
  copied: "Copied",
  copy: "Copy",
  currentValue: "Current value",
  error: "Error",
  goToSlide: (e, t) => `Go to slide ${e} of ${t}`,
  hidePassword: "Hide password",
  loading: "Loading",
  nextSlide: "Next slide",
  numOptionsSelected: (e) => e === 0 ? "No options selected" : e === 1 ? "1 option selected" : `${e} options selected`,
  previousSlide: "Previous slide",
  progress: "Progress",
  remove: "Remove",
  resize: "Resize",
  scrollToEnd: "Scroll to end",
  scrollToStart: "Scroll to start",
  selectAColorFromTheScreen: "Select a color from the screen",
  showPassword: "Show password",
  slideNum: (e) => `Slide ${e}`,
  toggleColorFormat: "Toggle color format"
};
ee(re);
var Ye = re, se = class extends Ge {
};
ee(Ye);
var _t = class extends v {
  constructor() {
    super(...arguments), this.localize = new se(this);
  }
  render() {
    return W`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `;
  }
};
_t.styles = [I, Ze];
var O = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakMap(), N = /* @__PURE__ */ new WeakMap(), ct = /* @__PURE__ */ new WeakSet(), X = /* @__PURE__ */ new WeakMap(), Qe = class {
  constructor(e, t) {
    this.handleFormData = (o) => {
      const r = this.options.disabled(this.host), s = this.options.name(this.host), l = this.options.value(this.host), a = this.host.tagName.toLowerCase() === "sl-button";
      this.host.isConnected && !r && !a && typeof s == "string" && s.length > 0 && typeof l < "u" && (Array.isArray(l) ? l.forEach((n) => {
        o.formData.append(s, n.toString());
      }) : o.formData.append(s, l.toString()));
    }, this.handleFormSubmit = (o) => {
      var r;
      const s = this.options.disabled(this.host), l = this.options.reportValidity;
      this.form && !this.form.noValidate && ((r = O.get(this.form)) == null || r.forEach((a) => {
        this.setUserInteracted(a, !0);
      })), this.form && !this.form.noValidate && !s && !l(this.host) && (o.preventDefault(), o.stopImmediatePropagation());
    }, this.handleFormReset = () => {
      this.options.setValue(this.host, this.options.defaultValue(this.host)), this.setUserInteracted(this.host, !1), X.set(this.host, []);
    }, this.handleInteraction = (o) => {
      const r = X.get(this.host);
      r.includes(o.type) || r.push(o.type), r.length === this.options.assumeInteractionOn.length && this.setUserInteracted(this.host, !0);
    }, this.checkFormValidity = () => {
      if (this.form && !this.form.noValidate) {
        const o = this.form.querySelectorAll("*");
        for (const r of o)
          if (typeof r.checkValidity == "function" && !r.checkValidity())
            return !1;
      }
      return !0;
    }, this.reportFormValidity = () => {
      if (this.form && !this.form.noValidate) {
        const o = this.form.querySelectorAll("*");
        for (const r of o)
          if (typeof r.reportValidity == "function" && !r.reportValidity())
            return !1;
      }
      return !0;
    }, (this.host = e).addController(this), this.options = G({
      form: (o) => {
        const r = o.form;
        if (r) {
          const l = o.getRootNode().querySelector(`#${r}`);
          if (l)
            return l;
        }
        return o.closest("form");
      },
      name: (o) => o.name,
      value: (o) => o.value,
      defaultValue: (o) => o.defaultValue,
      disabled: (o) => {
        var r;
        return (r = o.disabled) != null ? r : !1;
      },
      reportValidity: (o) => typeof o.reportValidity == "function" ? o.reportValidity() : !0,
      checkValidity: (o) => typeof o.checkValidity == "function" ? o.checkValidity() : !0,
      setValue: (o, r) => o.value = r,
      assumeInteractionOn: ["sl-input"]
    }, t);
  }
  hostConnected() {
    const e = this.options.form(this.host);
    e && this.attachForm(e), X.set(this.host, []), this.options.assumeInteractionOn.forEach((t) => {
      this.host.addEventListener(t, this.handleInteraction);
    });
  }
  hostDisconnected() {
    this.detachForm(), X.delete(this.host), this.options.assumeInteractionOn.forEach((e) => {
      this.host.removeEventListener(e, this.handleInteraction);
    });
  }
  hostUpdated() {
    const e = this.options.form(this.host);
    e || this.detachForm(), e && this.form !== e && (this.detachForm(), this.attachForm(e)), this.host.hasUpdated && this.setValidity(this.host.validity.valid);
  }
  attachForm(e) {
    e ? (this.form = e, O.has(this.form) ? O.get(this.form).add(this.host) : O.set(this.form, /* @__PURE__ */ new Set([this.host])), this.form.addEventListener("formdata", this.handleFormData), this.form.addEventListener("submit", this.handleFormSubmit), this.form.addEventListener("reset", this.handleFormReset), B.has(this.form) || (B.set(this.form, this.form.reportValidity), this.form.reportValidity = () => this.reportFormValidity()), N.has(this.form) || (N.set(this.form, this.form.checkValidity), this.form.checkValidity = () => this.checkFormValidity())) : this.form = void 0;
  }
  detachForm() {
    if (!this.form) return;
    const e = O.get(this.form);
    e && (e.delete(this.host), e.size <= 0 && (this.form.removeEventListener("formdata", this.handleFormData), this.form.removeEventListener("submit", this.handleFormSubmit), this.form.removeEventListener("reset", this.handleFormReset), B.has(this.form) && (this.form.reportValidity = B.get(this.form), B.delete(this.form)), N.has(this.form) && (this.form.checkValidity = N.get(this.form), N.delete(this.form)), this.form = void 0));
  }
  setUserInteracted(e, t) {
    t ? ct.add(e) : ct.delete(e), e.requestUpdate();
  }
  doAction(e, t) {
    if (this.form) {
      const o = document.createElement("button");
      o.type = e, o.style.position = "absolute", o.style.width = "0", o.style.height = "0", o.style.clipPath = "inset(50%)", o.style.overflow = "hidden", o.style.whiteSpace = "nowrap", t && (o.name = t.name, o.value = t.value, ["formaction", "formenctype", "formmethod", "formnovalidate", "formtarget"].forEach((r) => {
        t.hasAttribute(r) && o.setAttribute(r, t.getAttribute(r));
      })), this.form.append(o), o.click(), o.remove();
    }
  }
  /** Returns the associated `<form>` element, if one exists. */
  getForm() {
    var e;
    return (e = this.form) != null ? e : null;
  }
  /** Resets the form, restoring all the control to their default value */
  reset(e) {
    this.doAction("reset", e);
  }
  /** Submits the form, triggering validation and form data injection. */
  submit(e) {
    this.doAction("submit", e);
  }
  /**
   * Synchronously sets the form control's validity. Call this when you know the future validity but need to update
   * the host element immediately, i.e. before Lit updates the component in the next update.
   */
  setValidity(e) {
    const t = this.host, o = !!ct.has(t), r = !!t.required;
    t.toggleAttribute("data-required", r), t.toggleAttribute("data-optional", !r), t.toggleAttribute("data-invalid", !e), t.toggleAttribute("data-valid", e), t.toggleAttribute("data-user-invalid", !e && o), t.toggleAttribute("data-user-valid", e && o);
  }
  /**
   * Updates the form control's validity based on the current value of `host.validity.valid`. Call this when anything
   * that affects constraint validation changes so the component receives the correct validity states.
   */
  updateValidity() {
    const e = this.host;
    this.setValidity(e.validity.valid);
  }
  /**
   * Dispatches a non-bubbling, cancelable custom event of type `sl-invalid`.
   * If the `sl-invalid` event will be cancelled then the original `invalid`
   * event (which may have been passed as argument) will also be cancelled.
   * If no original `invalid` event has been passed then the `sl-invalid`
   * event will be cancelled before being dispatched.
   */
  emitInvalidEvent(e) {
    const t = new CustomEvent("sl-invalid", {
      bubbles: !1,
      composed: !1,
      cancelable: !0,
      detail: {}
    });
    e || t.preventDefault(), this.host.dispatchEvent(t) || e?.preventDefault();
  }
}, $t = Object.freeze({
  badInput: !1,
  customError: !1,
  patternMismatch: !1,
  rangeOverflow: !1,
  rangeUnderflow: !1,
  stepMismatch: !1,
  tooLong: !1,
  tooShort: !1,
  typeMismatch: !1,
  valid: !0,
  valueMissing: !1
});
Object.freeze(Qt(G({}, $t), {
  valid: !1,
  valueMissing: !0
}));
Object.freeze(Qt(G({}, $t), {
  valid: !1,
  customError: !0
}));
var Xe = z`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`, pt = "";
function Ut(e) {
  pt = e;
}
function Je(e = "") {
  if (!pt) {
    const t = [...document.getElementsByTagName("script")], o = t.find((r) => r.hasAttribute("data-shoelace"));
    if (o)
      Ut(o.getAttribute("data-shoelace"));
    else {
      const r = t.find((l) => /shoelace(\.min)?\.js($|\?)/.test(l.src) || /shoelace-autoloader(\.min)?\.js($|\?)/.test(l.src));
      let s = "";
      r && (s = r.getAttribute("src")), Ut(s.split("/").slice(0, -1).join("/"));
    }
  }
  return pt.replace(/\/$/, "") + (e ? `/${e.replace(/^\//, "")}` : "");
}
var Ke = {
  name: "default",
  resolver: (e) => Je(`assets/icons/${e}.svg`)
}, to = Ke, Rt = {
  caret: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,
  check: `
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
  "chevron-down": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  "chevron-left": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,
  "chevron-right": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  copy: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,
  eye: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,
  "eye-slash": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,
  eyedropper: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,
  "grip-vertical": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,
  indeterminate: `
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
  "person-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,
  "play-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,
  "pause-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,
  radio: `
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,
  "star-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,
  "x-lg": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,
  "x-circle-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `
}, eo = {
  name: "system",
  resolver: (e) => e in Rt ? `data:image/svg+xml,${encodeURIComponent(Rt[e])}` : ""
}, oo = eo, ro = [to, oo], mt = [];
function so(e) {
  mt.push(e);
}
function lo(e) {
  mt = mt.filter((t) => t !== e);
}
function Vt(e) {
  return ro.find((t) => t.name === e);
}
var ao = z`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;
function kt(e, t) {
  const o = G({
    waitUntilFirstUpdate: !1
  }, t);
  return (r, s) => {
    const { update: l } = r, a = Array.isArray(e) ? e : [e];
    r.update = function(n) {
      a.forEach((i) => {
        const h = i;
        if (n.has(h)) {
          const u = n.get(h), p = this[h];
          u !== p && (!o.waitUntilFirstUpdate || this.hasUpdated) && this[s](u, p);
        }
      }), l.call(this, n);
    };
  };
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const io = (e, t) => e?._$litType$ !== void 0;
var U = Symbol(), J = Symbol(), dt, ht = /* @__PURE__ */ new Map(), y = class extends v {
  constructor() {
    super(...arguments), this.initialRender = !1, this.svg = null, this.label = "", this.library = "default";
  }
  /** Given a URL, this function returns the resulting SVG element or an appropriate error symbol. */
  async resolveIcon(e, t) {
    var o;
    let r;
    if (t?.spriteSheet)
      return this.svg = W`<svg part="svg">
        <use part="use" href="${e}"></use>
      </svg>`, this.svg;
    try {
      if (r = await fetch(e, { mode: "cors" }), !r.ok) return r.status === 410 ? U : J;
    } catch {
      return J;
    }
    try {
      const s = document.createElement("div");
      s.innerHTML = await r.text();
      const l = s.firstElementChild;
      if (((o = l?.tagName) == null ? void 0 : o.toLowerCase()) !== "svg") return U;
      dt || (dt = new DOMParser());
      const n = dt.parseFromString(l.outerHTML, "text/html").body.querySelector("svg");
      return n ? (n.part.add("svg"), document.adoptNode(n)) : U;
    } catch {
      return U;
    }
  }
  connectedCallback() {
    super.connectedCallback(), so(this);
  }
  firstUpdated() {
    this.initialRender = !0, this.setIcon();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), lo(this);
  }
  getIconSource() {
    const e = Vt(this.library);
    return this.name && e ? {
      url: e.resolver(this.name),
      fromLibrary: !0
    } : {
      url: this.src,
      fromLibrary: !1
    };
  }
  handleLabelChange() {
    typeof this.label == "string" && this.label.length > 0 ? (this.setAttribute("role", "img"), this.setAttribute("aria-label", this.label), this.removeAttribute("aria-hidden")) : (this.removeAttribute("role"), this.removeAttribute("aria-label"), this.setAttribute("aria-hidden", "true"));
  }
  async setIcon() {
    var e;
    const { url: t, fromLibrary: o } = this.getIconSource(), r = o ? Vt(this.library) : void 0;
    if (!t) {
      this.svg = null;
      return;
    }
    let s = ht.get(t);
    if (s || (s = this.resolveIcon(t, r), ht.set(t, s)), !this.initialRender)
      return;
    const l = await s;
    if (l === J && ht.delete(t), t === this.getIconSource().url) {
      if (io(l)) {
        if (this.svg = l, r) {
          await this.updateComplete;
          const a = this.shadowRoot.querySelector("[part='svg']");
          typeof r.mutator == "function" && a && r.mutator(a);
        }
        return;
      }
      switch (l) {
        case J:
        case U:
          this.svg = null, this.emit("sl-error");
          break;
        default:
          this.svg = l.cloneNode(!0), (e = r?.mutator) == null || e.call(r, this.svg), this.emit("sl-load");
      }
    }
  }
  render() {
    return this.svg;
  }
};
y.styles = [I, ao];
c([
  at()
], y.prototype, "svg", 2);
c([
  d({ reflect: !0 })
], y.prototype, "name", 2);
c([
  d()
], y.prototype, "src", 2);
c([
  d()
], y.prototype, "label", 2);
c([
  d({ reflect: !0 })
], y.prototype, "library", 2);
c([
  kt("label")
], y.prototype, "handleLabelChange", 1);
c([
  kt(["name", "src", "library"])
], y.prototype, "setIcon", 1);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const le = Symbol.for(""), no = (e) => {
  if (e?.r === le) return e?._$litStatic$;
}, st = (e, ...t) => ({ _$litStatic$: t.reduce((o, r, s) => o + ((l) => {
  if (l._$litStatic$ !== void 0) return l._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${l}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(r) + e[s + 1], e[0]), r: le }), Dt = /* @__PURE__ */ new Map(), co = (e) => (t, ...o) => {
  const r = o.length;
  let s, l;
  const a = [], n = [];
  let i, h = 0, u = !1;
  for (; h < r; ) {
    for (i = t[h]; h < r && (l = o[h], (s = no(l)) !== void 0); ) i += s + t[++h], u = !0;
    h !== r && n.push(l), a.push(i), h++;
  }
  if (h === r && a.push(t[r]), u) {
    const p = a.join("$$lit$$");
    (t = Dt.get(p)) === void 0 && (a.raw = a, Dt.set(p, t = a)), o = n;
  }
  return e(t, ...o);
}, et = co(W);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const b = (e) => e ?? g;
var m = class extends v {
  constructor() {
    super(...arguments), this.formControlController = new Qe(this, {
      assumeInteractionOn: ["click"]
    }), this.hasSlotController = new Zt(this, "[default]", "prefix", "suffix"), this.localize = new se(this), this.hasFocus = !1, this.invalid = !1, this.title = "", this.variant = "default", this.size = "medium", this.caret = !1, this.disabled = !1, this.loading = !1, this.outline = !1, this.pill = !1, this.circle = !1, this.type = "button", this.name = "", this.value = "", this.href = "", this.rel = "noreferrer noopener";
  }
  /** Gets the validity state object */
  get validity() {
    return this.isButton() ? this.button.validity : $t;
  }
  /** Gets the validation message */
  get validationMessage() {
    return this.isButton() ? this.button.validationMessage : "";
  }
  firstUpdated() {
    this.isButton() && this.formControlController.updateValidity();
  }
  handleBlur() {
    this.hasFocus = !1, this.emit("sl-blur");
  }
  handleFocus() {
    this.hasFocus = !0, this.emit("sl-focus");
  }
  handleClick() {
    this.type === "submit" && this.formControlController.submit(this), this.type === "reset" && this.formControlController.reset(this);
  }
  handleInvalid(e) {
    this.formControlController.setValidity(!1), this.formControlController.emitInvalidEvent(e);
  }
  isButton() {
    return !this.href;
  }
  isLink() {
    return !!this.href;
  }
  handleDisabledChange() {
    this.isButton() && this.formControlController.setValidity(this.disabled);
  }
  /** Simulates a click on the button. */
  click() {
    this.button.click();
  }
  /** Sets focus on the button. */
  focus(e) {
    this.button.focus(e);
  }
  /** Removes focus from the button. */
  blur() {
    this.button.blur();
  }
  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    return this.isButton() ? this.button.checkValidity() : !0;
  }
  /** Gets the associated form, if one exists. */
  getForm() {
    return this.formControlController.getForm();
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.isButton() ? this.button.reportValidity() : !0;
  }
  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(e) {
    this.isButton() && (this.button.setCustomValidity(e), this.formControlController.updateValidity());
  }
  render() {
    const e = this.isLink(), t = e ? st`a` : st`button`;
    return et`
      <${t}
        part="base"
        class=${it({
      button: !0,
      "button--default": this.variant === "default",
      "button--primary": this.variant === "primary",
      "button--success": this.variant === "success",
      "button--neutral": this.variant === "neutral",
      "button--warning": this.variant === "warning",
      "button--danger": this.variant === "danger",
      "button--text": this.variant === "text",
      "button--small": this.size === "small",
      "button--medium": this.size === "medium",
      "button--large": this.size === "large",
      "button--caret": this.caret,
      "button--circle": this.circle,
      "button--disabled": this.disabled,
      "button--focused": this.hasFocus,
      "button--loading": this.loading,
      "button--standard": !this.outline,
      "button--outline": this.outline,
      "button--pill": this.pill,
      "button--rtl": this.localize.dir() === "rtl",
      "button--has-label": this.hasSlotController.test("[default]"),
      "button--has-prefix": this.hasSlotController.test("prefix"),
      "button--has-suffix": this.hasSlotController.test("suffix")
    })}
        ?disabled=${b(e ? void 0 : this.disabled)}
        type=${b(e ? void 0 : this.type)}
        title=${this.title}
        name=${b(e ? void 0 : this.name)}
        value=${b(e ? void 0 : this.value)}
        href=${b(e && !this.disabled ? this.href : void 0)}
        target=${b(e ? this.target : void 0)}
        download=${b(e ? this.download : void 0)}
        rel=${b(e ? this.rel : void 0)}
        role=${b(e ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton() ? this.handleInvalid : null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret ? et` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> ` : ""}
        ${this.loading ? et`<sl-spinner part="spinner"></sl-spinner>` : ""}
      </${t}>
    `;
  }
};
m.styles = [I, Xe];
m.dependencies = {
  "sl-icon": y,
  "sl-spinner": _t
};
c([
  Jt(".button")
], m.prototype, "button", 2);
c([
  at()
], m.prototype, "hasFocus", 2);
c([
  at()
], m.prototype, "invalid", 2);
c([
  d()
], m.prototype, "title", 2);
c([
  d({ reflect: !0 })
], m.prototype, "variant", 2);
c([
  d({ reflect: !0 })
], m.prototype, "size", 2);
c([
  d({ type: Boolean, reflect: !0 })
], m.prototype, "caret", 2);
c([
  d({ type: Boolean, reflect: !0 })
], m.prototype, "disabled", 2);
c([
  d({ type: Boolean, reflect: !0 })
], m.prototype, "loading", 2);
c([
  d({ type: Boolean, reflect: !0 })
], m.prototype, "outline", 2);
c([
  d({ type: Boolean, reflect: !0 })
], m.prototype, "pill", 2);
c([
  d({ type: Boolean, reflect: !0 })
], m.prototype, "circle", 2);
c([
  d()
], m.prototype, "type", 2);
c([
  d()
], m.prototype, "name", 2);
c([
  d()
], m.prototype, "value", 2);
c([
  d()
], m.prototype, "href", 2);
c([
  d()
], m.prototype, "target", 2);
c([
  d()
], m.prototype, "rel", 2);
c([
  d()
], m.prototype, "download", 2);
c([
  d()
], m.prototype, "form", 2);
c([
  d({ attribute: "formaction" })
], m.prototype, "formAction", 2);
c([
  d({ attribute: "formenctype" })
], m.prototype, "formEnctype", 2);
c([
  d({ attribute: "formmethod" })
], m.prototype, "formMethod", 2);
c([
  d({ attribute: "formnovalidate", type: Boolean })
], m.prototype, "formNoValidate", 2);
c([
  d({ attribute: "formtarget" })
], m.prototype, "formTarget", 2);
c([
  kt("disabled", { waitUntilFirstUpdate: !0 })
], m.prototype, "handleDisabledChange", 1);
m.define("sl-button");
var ho = z`
  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: max(12px, 0.75em);
    font-weight: var(--sl-font-weight-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-small);
    border: solid 1px var(--sl-color-neutral-0);
    white-space: nowrap;
    padding: 0.35em 0.6em;
    user-select: none;
    -webkit-user-select: none;
    cursor: inherit;
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--success {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--neutral {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--danger {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-600);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-600);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--sl-color-neutral-600);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-600);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-600);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`, Y = class extends v {
  constructor() {
    super(...arguments), this.variant = "primary", this.pill = !1, this.pulse = !1;
  }
  render() {
    return W`
      <span
        part="base"
        class=${it({
      badge: !0,
      "badge--primary": this.variant === "primary",
      "badge--success": this.variant === "success",
      "badge--neutral": this.variant === "neutral",
      "badge--warning": this.variant === "warning",
      "badge--danger": this.variant === "danger",
      "badge--pill": this.pill,
      "badge--pulse": this.pulse
    })}
        role="status"
      >
        <slot></slot>
      </span>
    `;
  }
};
Y.styles = [I, ho];
c([
  d({ reflect: !0 })
], Y.prototype, "variant", 2);
c([
  d({ type: Boolean, reflect: !0 })
], Y.prototype, "pill", 2);
c([
  d({ type: Boolean, reflect: !0 })
], Y.prototype, "pulse", 2);
Y.define("sl-badge");
var uo = z`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`, f = class extends v {
  constructor() {
    super(...arguments), this.hasFocus = !1, this.label = "", this.disabled = !1;
  }
  handleBlur() {
    this.hasFocus = !1, this.emit("sl-blur");
  }
  handleFocus() {
    this.hasFocus = !0, this.emit("sl-focus");
  }
  handleClick(e) {
    this.disabled && (e.preventDefault(), e.stopPropagation());
  }
  /** Simulates a click on the icon button. */
  click() {
    this.button.click();
  }
  /** Sets focus on the icon button. */
  focus(e) {
    this.button.focus(e);
  }
  /** Removes focus from the icon button. */
  blur() {
    this.button.blur();
  }
  render() {
    const e = !!this.href, t = e ? st`a` : st`button`;
    return et`
      <${t}
        part="base"
        class=${it({
      "icon-button": !0,
      "icon-button--disabled": !e && this.disabled,
      "icon-button--focused": this.hasFocus
    })}
        ?disabled=${b(e ? void 0 : this.disabled)}
        type=${b(e ? void 0 : "button")}
        href=${b(e ? this.href : void 0)}
        target=${b(e ? this.target : void 0)}
        download=${b(e ? this.download : void 0)}
        rel=${b(e && this.target ? "noreferrer noopener" : void 0)}
        role=${b(e ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-label="${this.label}"
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${b(this.name)}
          library=${b(this.library)}
          src=${b(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${t}>
    `;
  }
};
f.styles = [I, uo];
f.dependencies = { "sl-icon": y };
c([
  Jt(".icon-button")
], f.prototype, "button", 2);
c([
  at()
], f.prototype, "hasFocus", 2);
c([
  d()
], f.prototype, "name", 2);
c([
  d()
], f.prototype, "library", 2);
c([
  d()
], f.prototype, "src", 2);
c([
  d()
], f.prototype, "href", 2);
c([
  d()
], f.prototype, "target", 2);
c([
  d()
], f.prototype, "download", 2);
c([
  d()
], f.prototype, "label", 2);
c([
  d({ type: Boolean, reflect: !0 })
], f.prototype, "disabled", 2);
f.define("sl-icon-button");
_t.define("sl-spinner");
const po = ':root,:host,.sl-theme-light{color-scheme:light;--sl-color-gray-50: hsl(0 0% 97.5%);--sl-color-gray-100: hsl(240 4.8% 95.9%);--sl-color-gray-200: hsl(240 5.9% 90%);--sl-color-gray-300: hsl(240 4.9% 83.9%);--sl-color-gray-400: hsl(240 5% 64.9%);--sl-color-gray-500: hsl(240 3.8% 46.1%);--sl-color-gray-600: hsl(240 5.2% 33.9%);--sl-color-gray-700: hsl(240 5.3% 26.1%);--sl-color-gray-800: hsl(240 3.7% 15.9%);--sl-color-gray-900: hsl(240 5.9% 10%);--sl-color-gray-950: hsl(240 7.3% 8%);--sl-color-red-50: hsl(0 85.7% 97.3%);--sl-color-red-100: hsl(0 93.3% 94.1%);--sl-color-red-200: hsl(0 96.3% 89.4%);--sl-color-red-300: hsl(0 93.5% 81.8%);--sl-color-red-400: hsl(0 90.6% 70.8%);--sl-color-red-500: hsl(0 84.2% 60.2%);--sl-color-red-600: hsl(0 72.2% 50.6%);--sl-color-red-700: hsl(0 73.7% 41.8%);--sl-color-red-800: hsl(0 70% 35.3%);--sl-color-red-900: hsl(0 62.8% 30.6%);--sl-color-red-950: hsl(0 60% 19.6%);--sl-color-orange-50: hsl(33.3 100% 96.5%);--sl-color-orange-100: hsl(34.3 100% 91.8%);--sl-color-orange-200: hsl(32.1 97.7% 83.1%);--sl-color-orange-300: hsl(30.7 97.2% 72.4%);--sl-color-orange-400: hsl(27 96% 61%);--sl-color-orange-500: hsl(24.6 95% 53.1%);--sl-color-orange-600: hsl(20.5 90.2% 48.2%);--sl-color-orange-700: hsl(17.5 88.3% 40.4%);--sl-color-orange-800: hsl(15 79.1% 33.7%);--sl-color-orange-900: hsl(15.3 74.6% 27.8%);--sl-color-orange-950: hsl(15.2 69.1% 19%);--sl-color-amber-50: hsl(48 100% 96.1%);--sl-color-amber-100: hsl(48 96.5% 88.8%);--sl-color-amber-200: hsl(48 96.6% 76.7%);--sl-color-amber-300: hsl(45.9 96.7% 64.5%);--sl-color-amber-400: hsl(43.3 96.4% 56.3%);--sl-color-amber-500: hsl(37.7 92.1% 50.2%);--sl-color-amber-600: hsl(32.1 94.6% 43.7%);--sl-color-amber-700: hsl(26 90.5% 37.1%);--sl-color-amber-800: hsl(22.7 82.5% 31.4%);--sl-color-amber-900: hsl(21.7 77.8% 26.5%);--sl-color-amber-950: hsl(22.9 74.1% 16.7%);--sl-color-yellow-50: hsl(54.5 91.7% 95.3%);--sl-color-yellow-100: hsl(54.9 96.7% 88%);--sl-color-yellow-200: hsl(52.8 98.3% 76.9%);--sl-color-yellow-300: hsl(50.4 97.8% 63.5%);--sl-color-yellow-400: hsl(47.9 95.8% 53.1%);--sl-color-yellow-500: hsl(45.4 93.4% 47.5%);--sl-color-yellow-600: hsl(40.6 96.1% 40.4%);--sl-color-yellow-700: hsl(35.5 91.7% 32.9%);--sl-color-yellow-800: hsl(31.8 81% 28.8%);--sl-color-yellow-900: hsl(28.4 72.5% 25.7%);--sl-color-yellow-950: hsl(33.1 69% 13.9%);--sl-color-lime-50: hsl(78.3 92% 95.1%);--sl-color-lime-100: hsl(79.6 89.1% 89.2%);--sl-color-lime-200: hsl(80.9 88.5% 79.6%);--sl-color-lime-300: hsl(82 84.5% 67.1%);--sl-color-lime-400: hsl(82.7 78% 55.5%);--sl-color-lime-500: hsl(83.7 80.5% 44.3%);--sl-color-lime-600: hsl(84.8 85.2% 34.5%);--sl-color-lime-700: hsl(85.9 78.4% 27.3%);--sl-color-lime-800: hsl(86.3 69% 22.7%);--sl-color-lime-900: hsl(87.6 61.2% 20.2%);--sl-color-lime-950: hsl(86.5 60.6% 13.9%);--sl-color-green-50: hsl(138.5 76.5% 96.7%);--sl-color-green-100: hsl(140.6 84.2% 92.5%);--sl-color-green-200: hsl(141 78.9% 85.1%);--sl-color-green-300: hsl(141.7 76.6% 73.1%);--sl-color-green-400: hsl(141.9 69.2% 58%);--sl-color-green-500: hsl(142.1 70.6% 45.3%);--sl-color-green-600: hsl(142.1 76.2% 36.3%);--sl-color-green-700: hsl(142.4 71.8% 29.2%);--sl-color-green-800: hsl(142.8 64.2% 24.1%);--sl-color-green-900: hsl(143.8 61.2% 20.2%);--sl-color-green-950: hsl(144.3 60.7% 12%);--sl-color-emerald-50: hsl(151.8 81% 95.9%);--sl-color-emerald-100: hsl(149.3 80.4% 90%);--sl-color-emerald-200: hsl(152.4 76% 80.4%);--sl-color-emerald-300: hsl(156.2 71.6% 66.9%);--sl-color-emerald-400: hsl(158.1 64.4% 51.6%);--sl-color-emerald-500: hsl(160.1 84.1% 39.4%);--sl-color-emerald-600: hsl(161.4 93.5% 30.4%);--sl-color-emerald-700: hsl(162.9 93.5% 24.3%);--sl-color-emerald-800: hsl(163.1 88.1% 19.8%);--sl-color-emerald-900: hsl(164.2 85.7% 16.5%);--sl-color-emerald-950: hsl(164.3 87.5% 9.4%);--sl-color-teal-50: hsl(166.2 76.5% 96.7%);--sl-color-teal-100: hsl(167.2 85.5% 89.2%);--sl-color-teal-200: hsl(168.4 83.8% 78.2%);--sl-color-teal-300: hsl(170.6 76.9% 64.3%);--sl-color-teal-400: hsl(172.5 66% 50.4%);--sl-color-teal-500: hsl(173.4 80.4% 40%);--sl-color-teal-600: hsl(174.7 83.9% 31.6%);--sl-color-teal-700: hsl(175.3 77.4% 26.1%);--sl-color-teal-800: hsl(176.1 69.4% 21.8%);--sl-color-teal-900: hsl(175.9 60.8% 19%);--sl-color-teal-950: hsl(176.5 58.6% 11.4%);--sl-color-cyan-50: hsl(183.2 100% 96.3%);--sl-color-cyan-100: hsl(185.1 95.9% 90.4%);--sl-color-cyan-200: hsl(186.2 93.5% 81.8%);--sl-color-cyan-300: hsl(187 92.4% 69%);--sl-color-cyan-400: hsl(187.9 85.7% 53.3%);--sl-color-cyan-500: hsl(188.7 94.5% 42.7%);--sl-color-cyan-600: hsl(191.6 91.4% 36.5%);--sl-color-cyan-700: hsl(192.9 82.3% 31%);--sl-color-cyan-800: hsl(194.4 69.6% 27.1%);--sl-color-cyan-900: hsl(196.4 63.6% 23.7%);--sl-color-cyan-950: hsl(196.8 61% 16.1%);--sl-color-sky-50: hsl(204 100% 97.1%);--sl-color-sky-100: hsl(204 93.8% 93.7%);--sl-color-sky-200: hsl(200.6 94.4% 86.1%);--sl-color-sky-300: hsl(199.4 95.5% 73.9%);--sl-color-sky-400: hsl(198.4 93.2% 59.6%);--sl-color-sky-500: hsl(198.6 88.7% 48.4%);--sl-color-sky-600: hsl(200.4 98% 39.4%);--sl-color-sky-700: hsl(201.3 96.3% 32.2%);--sl-color-sky-800: hsl(201 90% 27.5%);--sl-color-sky-900: hsl(202 80.3% 23.9%);--sl-color-sky-950: hsl(202.3 73.8% 16.5%);--sl-color-blue-50: hsl(213.8 100% 96.9%);--sl-color-blue-100: hsl(214.3 94.6% 92.7%);--sl-color-blue-200: hsl(213.3 96.9% 87.3%);--sl-color-blue-300: hsl(211.7 96.4% 78.4%);--sl-color-blue-400: hsl(213.1 93.9% 67.8%);--sl-color-blue-500: hsl(217.2 91.2% 59.8%);--sl-color-blue-600: hsl(221.2 83.2% 53.3%);--sl-color-blue-700: hsl(224.3 76.3% 48%);--sl-color-blue-800: hsl(225.9 70.7% 40.2%);--sl-color-blue-900: hsl(224.4 64.3% 32.9%);--sl-color-blue-950: hsl(226.2 55.3% 18.4%);--sl-color-indigo-50: hsl(225.9 100% 96.7%);--sl-color-indigo-100: hsl(226.5 100% 93.9%);--sl-color-indigo-200: hsl(228 96.5% 88.8%);--sl-color-indigo-300: hsl(229.7 93.5% 81.8%);--sl-color-indigo-400: hsl(234.5 89.5% 73.9%);--sl-color-indigo-500: hsl(238.7 83.5% 66.7%);--sl-color-indigo-600: hsl(243.4 75.4% 58.6%);--sl-color-indigo-700: hsl(244.5 57.9% 50.6%);--sl-color-indigo-800: hsl(243.7 54.5% 41.4%);--sl-color-indigo-900: hsl(242.2 47.4% 34.3%);--sl-color-indigo-950: hsl(243.5 43.6% 22.9%);--sl-color-violet-50: hsl(250 100% 97.6%);--sl-color-violet-100: hsl(251.4 91.3% 95.5%);--sl-color-violet-200: hsl(250.5 95.2% 91.8%);--sl-color-violet-300: hsl(252.5 94.7% 85.1%);--sl-color-violet-400: hsl(255.1 91.7% 76.3%);--sl-color-violet-500: hsl(258.3 89.5% 66.3%);--sl-color-violet-600: hsl(262.1 83.3% 57.8%);--sl-color-violet-700: hsl(263.4 70% 50.4%);--sl-color-violet-800: hsl(263.4 69.3% 42.2%);--sl-color-violet-900: hsl(263.5 67.4% 34.9%);--sl-color-violet-950: hsl(265.1 61.5% 21.4%);--sl-color-purple-50: hsl(270 100% 98%);--sl-color-purple-100: hsl(268.7 100% 95.5%);--sl-color-purple-200: hsl(268.6 100% 91.8%);--sl-color-purple-300: hsl(269.2 97.4% 85.1%);--sl-color-purple-400: hsl(270 95.2% 75.3%);--sl-color-purple-500: hsl(270.7 91% 65.1%);--sl-color-purple-600: hsl(271.5 81.3% 55.9%);--sl-color-purple-700: hsl(272.1 71.7% 47.1%);--sl-color-purple-800: hsl(272.9 67.2% 39.4%);--sl-color-purple-900: hsl(273.6 65.6% 32%);--sl-color-purple-950: hsl(276 59.5% 16.5%);--sl-color-fuchsia-50: hsl(289.1 100% 97.8%);--sl-color-fuchsia-100: hsl(287 100% 95.5%);--sl-color-fuchsia-200: hsl(288.3 95.8% 90.6%);--sl-color-fuchsia-300: hsl(291.1 93.1% 82.9%);--sl-color-fuchsia-400: hsl(292 91.4% 72.5%);--sl-color-fuchsia-500: hsl(292.2 84.1% 60.6%);--sl-color-fuchsia-600: hsl(293.4 69.5% 48.8%);--sl-color-fuchsia-700: hsl(294.7 72.4% 39.8%);--sl-color-fuchsia-800: hsl(295.4 70.2% 32.9%);--sl-color-fuchsia-900: hsl(296.7 63.6% 28%);--sl-color-fuchsia-950: hsl(297.1 56.8% 14.5%);--sl-color-pink-50: hsl(327.3 73.3% 97.1%);--sl-color-pink-100: hsl(325.7 77.8% 94.7%);--sl-color-pink-200: hsl(325.9 84.6% 89.8%);--sl-color-pink-300: hsl(327.4 87.1% 81.8%);--sl-color-pink-400: hsl(328.6 85.5% 70.2%);--sl-color-pink-500: hsl(330.4 81.2% 60.4%);--sl-color-pink-600: hsl(333.3 71.4% 50.6%);--sl-color-pink-700: hsl(335.1 77.6% 42%);--sl-color-pink-800: hsl(335.8 74.4% 35.3%);--sl-color-pink-900: hsl(335.9 69% 30.4%);--sl-color-pink-950: hsl(336.2 65.4% 15.9%);--sl-color-rose-50: hsl(355.7 100% 97.3%);--sl-color-rose-100: hsl(355.6 100% 94.7%);--sl-color-rose-200: hsl(352.7 96.1% 90%);--sl-color-rose-300: hsl(352.6 95.7% 81.8%);--sl-color-rose-400: hsl(351.3 94.5% 71.4%);--sl-color-rose-500: hsl(349.7 89.2% 60.2%);--sl-color-rose-600: hsl(346.8 77.2% 49.8%);--sl-color-rose-700: hsl(345.3 82.7% 40.8%);--sl-color-rose-800: hsl(343.4 79.7% 34.7%);--sl-color-rose-900: hsl(341.5 75.5% 30.4%);--sl-color-rose-950: hsl(341.3 70.1% 17.1%);--sl-color-primary-50: var(--sl-color-sky-50);--sl-color-primary-100: var(--sl-color-sky-100);--sl-color-primary-200: var(--sl-color-sky-200);--sl-color-primary-300: var(--sl-color-sky-300);--sl-color-primary-400: var(--sl-color-sky-400);--sl-color-primary-500: var(--sl-color-sky-500);--sl-color-primary-600: var(--sl-color-sky-600);--sl-color-primary-700: var(--sl-color-sky-700);--sl-color-primary-800: var(--sl-color-sky-800);--sl-color-primary-900: var(--sl-color-sky-900);--sl-color-primary-950: var(--sl-color-sky-950);--sl-color-success-50: var(--sl-color-green-50);--sl-color-success-100: var(--sl-color-green-100);--sl-color-success-200: var(--sl-color-green-200);--sl-color-success-300: var(--sl-color-green-300);--sl-color-success-400: var(--sl-color-green-400);--sl-color-success-500: var(--sl-color-green-500);--sl-color-success-600: var(--sl-color-green-600);--sl-color-success-700: var(--sl-color-green-700);--sl-color-success-800: var(--sl-color-green-800);--sl-color-success-900: var(--sl-color-green-900);--sl-color-success-950: var(--sl-color-green-950);--sl-color-warning-50: var(--sl-color-amber-50);--sl-color-warning-100: var(--sl-color-amber-100);--sl-color-warning-200: var(--sl-color-amber-200);--sl-color-warning-300: var(--sl-color-amber-300);--sl-color-warning-400: var(--sl-color-amber-400);--sl-color-warning-500: var(--sl-color-amber-500);--sl-color-warning-600: var(--sl-color-amber-600);--sl-color-warning-700: var(--sl-color-amber-700);--sl-color-warning-800: var(--sl-color-amber-800);--sl-color-warning-900: var(--sl-color-amber-900);--sl-color-warning-950: var(--sl-color-amber-950);--sl-color-danger-50: var(--sl-color-red-50);--sl-color-danger-100: var(--sl-color-red-100);--sl-color-danger-200: var(--sl-color-red-200);--sl-color-danger-300: var(--sl-color-red-300);--sl-color-danger-400: var(--sl-color-red-400);--sl-color-danger-500: var(--sl-color-red-500);--sl-color-danger-600: var(--sl-color-red-600);--sl-color-danger-700: var(--sl-color-red-700);--sl-color-danger-800: var(--sl-color-red-800);--sl-color-danger-900: var(--sl-color-red-900);--sl-color-danger-950: var(--sl-color-red-950);--sl-color-neutral-50: var(--sl-color-gray-50);--sl-color-neutral-100: var(--sl-color-gray-100);--sl-color-neutral-200: var(--sl-color-gray-200);--sl-color-neutral-300: var(--sl-color-gray-300);--sl-color-neutral-400: var(--sl-color-gray-400);--sl-color-neutral-500: var(--sl-color-gray-500);--sl-color-neutral-600: var(--sl-color-gray-600);--sl-color-neutral-700: var(--sl-color-gray-700);--sl-color-neutral-800: var(--sl-color-gray-800);--sl-color-neutral-900: var(--sl-color-gray-900);--sl-color-neutral-950: var(--sl-color-gray-950);--sl-color-neutral-0: hsl(0, 0%, 100%);--sl-color-neutral-1000: hsl(0, 0%, 0%);--sl-border-radius-small: .1875rem;--sl-border-radius-medium: .25rem;--sl-border-radius-large: .5rem;--sl-border-radius-x-large: 1rem;--sl-border-radius-circle: 50%;--sl-border-radius-pill: 9999px;--sl-shadow-x-small: 0 1px 2px hsl(240 3.8% 46.1% / 6%);--sl-shadow-small: 0 1px 2px hsl(240 3.8% 46.1% / 12%);--sl-shadow-medium: 0 2px 4px hsl(240 3.8% 46.1% / 12%);--sl-shadow-large: 0 2px 8px hsl(240 3.8% 46.1% / 12%);--sl-shadow-x-large: 0 4px 16px hsl(240 3.8% 46.1% / 12%);--sl-spacing-3x-small: .125rem;--sl-spacing-2x-small: .25rem;--sl-spacing-x-small: .5rem;--sl-spacing-small: .75rem;--sl-spacing-medium: 1rem;--sl-spacing-large: 1.25rem;--sl-spacing-x-large: 1.75rem;--sl-spacing-2x-large: 2.25rem;--sl-spacing-3x-large: 3rem;--sl-spacing-4x-large: 4.5rem;--sl-transition-x-slow: 1s;--sl-transition-slow: .5s;--sl-transition-medium: .25s;--sl-transition-fast: .15s;--sl-transition-x-fast: 50ms;--sl-font-mono: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;--sl-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";--sl-font-serif: Georgia, "Times New Roman", serif;--sl-font-size-2x-small: .625rem;--sl-font-size-x-small: .75rem;--sl-font-size-small: .875rem;--sl-font-size-medium: 1rem;--sl-font-size-large: 1.25rem;--sl-font-size-x-large: 1.5rem;--sl-font-size-2x-large: 2.25rem;--sl-font-size-3x-large: 3rem;--sl-font-size-4x-large: 4.5rem;--sl-font-weight-light: 300;--sl-font-weight-normal: 400;--sl-font-weight-semibold: 500;--sl-font-weight-bold: 700;--sl-letter-spacing-denser: -.03em;--sl-letter-spacing-dense: -.015em;--sl-letter-spacing-normal: normal;--sl-letter-spacing-loose: .075em;--sl-letter-spacing-looser: .15em;--sl-line-height-denser: 1;--sl-line-height-dense: 1.4;--sl-line-height-normal: 1.8;--sl-line-height-loose: 2.2;--sl-line-height-looser: 2.6;--sl-focus-ring-color: var(--sl-color-primary-600);--sl-focus-ring-style: solid;--sl-focus-ring-width: 3px;--sl-focus-ring: var(--sl-focus-ring-style) var(--sl-focus-ring-width) var(--sl-focus-ring-color);--sl-focus-ring-offset: 1px;--sl-button-font-size-small: var(--sl-font-size-x-small);--sl-button-font-size-medium: var(--sl-font-size-small);--sl-button-font-size-large: var(--sl-font-size-medium);--sl-input-height-small: 1.875rem;--sl-input-height-medium: 2.5rem;--sl-input-height-large: 3.125rem;--sl-input-background-color: var(--sl-color-neutral-0);--sl-input-background-color-hover: var(--sl-input-background-color);--sl-input-background-color-focus: var(--sl-input-background-color);--sl-input-background-color-disabled: var(--sl-color-neutral-100);--sl-input-border-color: var(--sl-color-neutral-300);--sl-input-border-color-hover: var(--sl-color-neutral-400);--sl-input-border-color-focus: var(--sl-color-primary-500);--sl-input-border-color-disabled: var(--sl-color-neutral-300);--sl-input-border-width: 1px;--sl-input-required-content: "*";--sl-input-required-content-offset: -2px;--sl-input-required-content-color: var(--sl-input-label-color);--sl-input-border-radius-small: var(--sl-border-radius-medium);--sl-input-border-radius-medium: var(--sl-border-radius-medium);--sl-input-border-radius-large: var(--sl-border-radius-medium);--sl-input-font-family: var(--sl-font-sans);--sl-input-font-weight: var(--sl-font-weight-normal);--sl-input-font-size-small: var(--sl-font-size-small);--sl-input-font-size-medium: var(--sl-font-size-medium);--sl-input-font-size-large: var(--sl-font-size-large);--sl-input-letter-spacing: var(--sl-letter-spacing-normal);--sl-input-color: var(--sl-color-neutral-700);--sl-input-color-hover: var(--sl-color-neutral-700);--sl-input-color-focus: var(--sl-color-neutral-700);--sl-input-color-disabled: var(--sl-color-neutral-900);--sl-input-icon-color: var(--sl-color-neutral-500);--sl-input-icon-color-hover: var(--sl-color-neutral-600);--sl-input-icon-color-focus: var(--sl-color-neutral-600);--sl-input-placeholder-color: var(--sl-color-neutral-500);--sl-input-placeholder-color-disabled: var(--sl-color-neutral-600);--sl-input-spacing-small: var(--sl-spacing-small);--sl-input-spacing-medium: var(--sl-spacing-medium);--sl-input-spacing-large: var(--sl-spacing-large);--sl-input-focus-ring-color: hsl(198.6 88.7% 48.4% / 40%);--sl-input-focus-ring-offset: 0;--sl-input-filled-background-color: var(--sl-color-neutral-100);--sl-input-filled-background-color-hover: var(--sl-color-neutral-100);--sl-input-filled-background-color-focus: var(--sl-color-neutral-100);--sl-input-filled-background-color-disabled: var(--sl-color-neutral-100);--sl-input-filled-color: var(--sl-color-neutral-800);--sl-input-filled-color-hover: var(--sl-color-neutral-800);--sl-input-filled-color-focus: var(--sl-color-neutral-700);--sl-input-filled-color-disabled: var(--sl-color-neutral-800);--sl-input-label-font-size-small: var(--sl-font-size-small);--sl-input-label-font-size-medium: var(--sl-font-size-medium);--sl-input-label-font-size-large: var(--sl-font-size-large);--sl-input-label-color: inherit;--sl-input-help-text-font-size-small: var(--sl-font-size-x-small);--sl-input-help-text-font-size-medium: var(--sl-font-size-small);--sl-input-help-text-font-size-large: var(--sl-font-size-medium);--sl-input-help-text-color: var(--sl-color-neutral-500);--sl-toggle-size-small: .875rem;--sl-toggle-size-medium: 1.125rem;--sl-toggle-size-large: 1.375rem;--sl-overlay-background-color: hsl(240 3.8% 46.1% / 33%);--sl-panel-background-color: var(--sl-color-neutral-0);--sl-panel-border-color: var(--sl-color-neutral-200);--sl-panel-border-width: 1px;--sl-tooltip-border-radius: var(--sl-border-radius-medium);--sl-tooltip-background-color: var(--sl-color-neutral-800);--sl-tooltip-color: var(--sl-color-neutral-0);--sl-tooltip-font-family: var(--sl-font-sans);--sl-tooltip-font-weight: var(--sl-font-weight-normal);--sl-tooltip-font-size: var(--sl-font-size-small);--sl-tooltip-line-height: var(--sl-line-height-dense);--sl-tooltip-padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-small);--sl-tooltip-arrow-size: 6px;--sl-z-index-drawer: 700;--sl-z-index-dialog: 800;--sl-z-index-dropdown: 900;--sl-z-index-toast: 950;--sl-z-index-tooltip: 1000}@supports (scrollbar-gutter: stable){.sl-scroll-lock{scrollbar-gutter:var(--sl-scroll-lock-gutter)!important}.sl-scroll-lock body{overflow:hidden!important}}@supports not (scrollbar-gutter: stable){.sl-scroll-lock body{padding-right:var(--sl-scroll-lock-size)!important;overflow:hidden!important}}.sl-toast-stack{position:fixed;top:0;inset-inline-end:0;z-index:var(--sl-z-index-toast);width:28rem;max-width:100%;max-height:100%;overflow:auto}.sl-toast-stack sl-alert{margin:var(--sl-spacing-medium)}.sl-toast-stack sl-alert::part(base){box-shadow:var(--sl-shadow-large)}', mo = '.shoelace-card-container{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem;padding:1rem;max-width:1200px;margin:0 auto}.shoelace-card-item{position:relative;max-width:400px;margin:0 auto;transition:transform .2s ease,box-shadow .2s ease}.shoelace-card-item:hover{transform:translateY(-2px);box-shadow:0 4px 12px #00000026}.shoelace-card-badge{position:absolute;top:1rem;left:1rem;z-index:10;--sl-color-primary-600: #0265DC;--sl-color-primary-500: #0265DC;font-weight:700;font-size:.875rem;min-width:2rem;height:2rem;display:flex;align-items:center;justify-content:center}.shoelace-card-content{padding:.5rem 0;line-height:1.5}.shoelace-card-content strong{font-size:1.125rem;color:var(--sl-color-neutral-900)}.shoelace-card-footer{display:flex;justify-content:space-between;align-items:center;padding:.5rem 0}.shoelace-card-footer sl-button{--sl-color-primary-600: #0265DC;--sl-color-primary-500: #0265DC}.shoelace-card-empty{text-align:center;padding:2rem;color:var(--sl-color-neutral-500);font-style:italic}.shoelace-card-fallback{text-align:center;padding:2rem;color:var(--sl-color-neutral-600)}.shoelace-card-modal{position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:1000;background-size:cover;background-position:center;background-repeat:no-repeat;display:flex;align-items:center;justify-content:center;animation:modalFadeIn .3s ease-out}@keyframes modalFadeIn{0%{opacity:0}to{opacity:1}}.shoelace-card-modal-overlay{position:relative;width:90%;max-width:800px;max-height:90vh;background:#ffffff1a;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:1rem;border:1px solid rgba(255,255,255,.2);padding:2rem;overflow-y:auto;box-shadow:0 8px 32px #0000004d,inset 0 1px #fff3;animation:modalSlideIn .3s ease-out}@keyframes modalSlideIn{0%{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}.shoelace-card-modal-close{position:absolute;top:1rem;right:1rem;background:#fff3!important;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:50%!important;border:1px solid rgba(255,255,255,.3)!important;color:#fff!important;font-size:1.5rem;z-index:1001;width:3rem;height:3rem;transition:all .2s ease}.shoelace-card-modal-close:hover{background:#ffffff4d!important;transform:scale(1.05)}.shoelace-card-modal-close:focus{outline:2px solid rgba(255,255,255,.5);outline-offset:2px}.shoelace-card-modal-content{color:#fff;text-shadow:0 2px 4px rgba(0,0,0,.5)}.shoelace-card-modal-text{font-size:1.1rem;line-height:1.6;background:linear-gradient(135deg,#0006,#0003);padding:2rem;border-radius:.5rem;backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);border:1px solid rgba(255,255,255,.1);box-shadow:inset 0 1px #ffffff1a}.shoelace-card-modal-text h1,.shoelace-card-modal-text h2,.shoelace-card-modal-text h3{color:#fff;margin-top:0;text-shadow:0 2px 4px rgba(0,0,0,.7)}.shoelace-card-modal-text h1{font-size:2.5rem;font-weight:700;margin-bottom:1rem;background:linear-gradient(135deg,#fff,#e0e0e0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.shoelace-card-modal-text p{margin-bottom:1rem;color:#ffffffe6}.shoelace-card-modal-text img{max-width:100%;height:auto;border-radius:.5rem;box-shadow:0 4px 12px #0000004d;margin:1rem 0}.shoelace-card-modal-loading{display:flex;justify-content:center;align-items:center;height:200px;font-size:2rem}.shoelace-card-modal-loading sl-spinner{--indicator-color: white;--track-color: rgba(255, 255, 255, .2);font-size:3rem}@media (max-width: 768px){.shoelace-card-container{grid-template-columns:1fr;gap:1rem;padding:.5rem}.shoelace-card-modal-overlay{width:95%;padding:1rem;max-height:95vh}.shoelace-card-modal-text{font-size:1rem;padding:1rem}.shoelace-card-modal-text h1{font-size:2rem}.shoelace-card-modal-close{top:.5rem;right:.5rem;width:2.5rem;height:2.5rem;font-size:1.25rem}}@media (max-width: 480px){.shoelace-card-container{padding:.25rem}.shoelace-card-modal-overlay{width:98%;padding:.75rem}.shoelace-card-modal-text{padding:.75rem}.shoelace-card-modal-text h1{font-size:1.75rem}}@media (prefers-contrast: high){.shoelace-card-badge{--sl-color-primary-600: #000;--sl-color-primary-500: #000;color:#fff;border:2px solid white}.shoelace-card-modal-overlay{background:#000000e6;border:2px solid white}.shoelace-card-modal-close{background:#000c!important;border:2px solid white!important}.shoelace-card-modal-text{background:#000c;border:1px solid white}}@media (prefers-reduced-motion: reduce){.shoelace-card-item{transition:none}.shoelace-card-item:hover{transform:none}.shoelace-card-modal,.shoelace-card-modal-overlay{animation:none}.shoelace-card-modal-close{transition:none}.shoelace-card-modal-close:hover{transform:none}}.shoelace-card-item:focus-within{outline:2px solid var(--sl-color-primary-600);outline-offset:2px}sl-button:focus{outline:2px solid var(--sl-color-primary-600);outline-offset:2px}@media print{.shoelace-card-modal{display:none}.shoelace-card-container{display:block}.shoelace-card-item{break-inside:avoid;margin-bottom:1rem}}@media (prefers-color-scheme: dark){.shoelace-card-modal-text h1{background:linear-gradient(135deg,#fff,#ccc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}}.shoelace-card-block{position:relative;z-index:1}.shoelace-card-block.loading{opacity:.7;pointer-events:none;position:relative;min-height:200px}.shoelace-card-block.loading:after{content:"";position:absolute;top:50%;left:50%;width:2rem;height:2rem;margin:-1rem 0 0 -1rem;border:2px solid var(--sl-color-neutral-300);border-top-color:var(--sl-color-primary-600);border-radius:50%;animation:spin 1s linear infinite;z-index:10}.shoelace-card-container{opacity:0;transform:translateY(10px);transition:opacity .4s ease-out,transform .4s ease-out}.shoelace-card-container.loaded{opacity:1;transform:translateY(0)}.shoelace-card-item{opacity:0;transform:translateY(20px);transition:opacity .3s ease-out,transform .3s ease-out}.shoelace-card-container.loaded .shoelace-card-item{opacity:1;transform:translateY(0)}.shoelace-card-container.loaded .shoelace-card-item:nth-child(1){transition-delay:.1s}.shoelace-card-container.loaded .shoelace-card-item:nth-child(2){transition-delay:.2s}.shoelace-card-container.loaded .shoelace-card-item:nth-child(3){transition-delay:.3s}.shoelace-card-container.loaded .shoelace-card-item:nth-child(4){transition-delay:.4s}.shoelace-card-container.loaded .shoelace-card-item:nth-child(5){transition-delay:.5s}.shoelace-card-container.loaded .shoelace-card-item:nth-child(n+6){transition-delay:.6s}@keyframes spin{to{transform:rotate(360deg)}}', Ct = {
  QUERY_INDEX_PATH: "/slides/query-index.json",
  BADGE_COLOR: "primary",
  DEFAULT_BUTTON_TEXT: "Learn More"
};
function ae() {
  if (!document.querySelector("#shoelace-card-styles")) {
    const e = document.createElement("style");
    e.id = "shoelace-card-styles", e.textContent = po + `
` + mo, document.head.appendChild(e);
  }
}
function bo(e) {
  return e.textContent.trim() || Ct.QUERY_INDEX_PATH;
}
async function go(e) {
  try {
    const t = await fetch(e, {
      mode: "cors",
      headers: { Accept: "application/json" }
    });
    if (!t.ok)
      throw new Error(`Failed to fetch card data: ${t.status}`);
    return (await t.json()).data || [];
  } catch (t) {
    return console.error("[shoelace-card] Fetch error:", t), [];
  }
}
async function fo(e) {
  try {
    const t = `${e}.plain.html`, o = await fetch(t, {
      mode: "cors",
      headers: { Accept: "text/html" }
    });
    if (!o.ok)
      throw new Error(`Failed to fetch plain HTML: ${o.status}`);
    let r = await o.text();
    return r = r.replace(/src="\.\/media\//g, 'src="/media/'), r = r.replace(/src="media\//g, 'src="/media/'), r = r.replace(/src="\.\.\/media\//g, 'src="/media/'), r;
  } catch (t) {
    return console.error("[shoelace-card] Plain HTML fetch error:", t), null;
  }
}
async function vo(e, t = 5e3) {
  return new Promise((o, r) => {
    const s = new Image(), l = setTimeout(() => {
      r(new Error(`Image load timeout: ${e}`));
    }, t);
    s.onload = () => {
      clearTimeout(l), o(s);
    }, s.onerror = () => {
      clearTimeout(l), r(new Error(`Image load failed: ${e}`));
    }, s.src = e;
  });
}
async function yo(e, t = 5e3) {
  const o = e.map((a) => a.image).filter(Boolean);
  if (o.length === 0)
    return [];
  console.log(`[shoelace-card] Preloading ${o.length} images...`);
  const r = o.map(
    (a) => vo(a, t).catch((n) => (console.warn(`[shoelace-card] Failed to preload image: ${a}`, n), null))
  ), s = await Promise.all(r), l = s.filter(Boolean).length;
  return console.log(`[shoelace-card] Preloaded ${l}/${o.length} images successfully`), s;
}
function wo(e) {
  const t = document.createElement("sl-badge");
  return t.className = "shoelace-card-badge", t.setAttribute("variant", Ct.BADGE_COLOR), t.setAttribute("pill", ""), t.textContent = e, t;
}
function xo(e, t) {
  if (!e) return null;
  const o = document.createElement("img");
  return o.slot = "image", o.src = e, o.alt = t || "Card image", o.loading = "lazy", o.onerror = () => {
    o.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=", o.alt = "Image not found";
  }, o;
}
function _o(e) {
  const t = document.createElement("div");
  if (t.className = "shoelace-card-content", e.title) {
    const o = document.createElement("strong");
    o.textContent = e.title, t.appendChild(o), t.appendChild(document.createElement("br"));
  }
  if (e.description) {
    const o = document.createTextNode(e.description);
    t.appendChild(o), t.appendChild(document.createElement("br"));
  }
  return t;
}
function $o(e) {
  const t = document.createElement("div");
  t.slot = "footer", t.className = "shoelace-card-footer";
  const o = document.createElement("sl-button");
  return o.setAttribute("variant", "primary"), o.setAttribute("pill", ""), o.textContent = e.buttonText || Ct.DEFAULT_BUTTON_TEXT, o.dataset.cardPath = e.path, o.dataset.cardImage = e.image, o.dataset.action = "open-modal", t.appendChild(o), t;
}
function ie(e, t) {
  const o = document.createElement("sl-card");
  return o.className = "shoelace-card-item", o.setAttribute("data-slide", t), [
    wo(t),
    xo(e.image, e.title),
    _o(e),
    $o(e)
  ].filter(Boolean).forEach((s) => o.appendChild(s)), o;
}
function ne() {
  const e = document.createElement("div");
  return e.className = "shoelace-card-container", e;
}
function ko(e) {
  const t = e.target.closest('[data-action="open-modal"]');
  if (t) {
    e.preventDefault();
    const o = t.dataset.cardPath, r = t.dataset.cardImage;
    Eo(o, r);
  }
}
function Co(e) {
  if (e.key === "Escape") {
    const t = document.querySelector(".shoelace-card-modal");
    t && bt(t);
  }
}
function ce(e) {
  e.addEventListener("click", ko), document.addEventListener("keydown", Co);
}
function bt(e) {
  e.remove();
}
function Ao(e) {
  const t = e.querySelector(".shoelace-card-modal-close");
  t && t.addEventListener("click", (o) => {
    o.stopPropagation(), bt(e);
  }), e.addEventListener("click", (o) => {
    o.target === e && bt(e);
  });
}
async function Eo(e, t) {
  ae();
  const o = document.createElement("div");
  o.className = "shoelace-card-modal", o.setAttribute("role", "dialog"), o.setAttribute("aria-modal", "true"), o.style.cssText = `
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 1000 !important;
    background-size: cover !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background-color: rgba(0, 0, 0, 0.8) !important;
    animation: modalFadeIn 0.3s ease-out !important;
  `, t && (o.style.backgroundImage = `url(${t})`);
  const r = document.createElement("div");
  r.className = "shoelace-card-modal-overlay", r.style.cssText = `
    position: relative !important;
    width: 90% !important;
    max-width: 800px !important;
    max-height: 90vh !important;
    background: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border-radius: 1rem !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    padding: 2rem !important;
    overflow-y: auto !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
    animation: modalSlideIn 0.3s ease-out !important;
  `;
  const s = document.createElement("div");
  s.className = "shoelace-card-modal-content", s.style.cssText = `
    color: white !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important;
    min-height: 200px !important;
  `;
  const l = document.createElement("button");
  l.className = "shoelace-card-modal-close", l.innerHTML = "×", l.setAttribute("aria-label", "Close modal"), l.setAttribute("type", "button"), l.style.cssText = `
    position: absolute !important;
    top: 1rem !important;
    right: 1rem !important;
    background: rgba(255, 255, 255, 0.2) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    border-radius: 50% !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    color: white !important;
    font-size: 2rem !important;
    z-index: 1003 !important;
    width: 3rem !important;
    height: 3rem !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    line-height: 1 !important;
  `;
  const a = document.createElement("sl-spinner");
  a.className = "shoelace-card-modal-loading", s.appendChild(a), r.appendChild(l), r.appendChild(s), o.appendChild(r), document.body.appendChild(o), setTimeout(() => {
    try {
      l.focus();
    } catch {
    }
  }, 100), s.style.cssText = `
    color: white !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important;
    min-height: 200px !important;
    position: relative !important;
    z-index: 1003 !important;
    display: block !important;
    overflow: visible !important;
  `;
  try {
    const n = await fo(e);
    if (n) {
      const i = document.createElement("div");
      i.className = "shoelace-card-modal-text", i.style.cssText = `
        position: relative !important;
        z-index: 1002 !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        font-size: 1.1rem !important;
        line-height: 1.6 !important;
        background: rgba(0, 0, 0, 0.85) !important;
        padding: 2rem !important;
        border-radius: 0.5rem !important;
        border: 2px solid rgba(255, 255, 255, 0.3) !important;
        color: white !important;
        box-shadow: 
          0 4px 20px rgba(0, 0, 0, 0.5),
          inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
        margin-top: 0 !important;
        max-height: 60vh !important;
        overflow-y: auto !important;
        backdrop-filter: blur(5px) !important;
        -webkit-backdrop-filter: blur(5px) !important;
      `, i.innerHTML = n, i.querySelectorAll("*").forEach((u) => {
        u.style.cssText += `
          color: white !important;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8) !important;
          background-color: transparent !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          z-index: inherit !important;
        `, u.tagName.match(/^H[1-6]$/) && (u.style.cssText += `
            font-weight: bold !important;
            margin-bottom: 1rem !important;
            font-size: ${2.5 - parseInt(u.tagName[1]) * 0.2}rem !important;
          `), u.tagName === "P" && (u.style.cssText += `
            margin-bottom: 1rem !important;
            line-height: 1.6 !important;
          `), u.tagName === "IMG" && (u.style.cssText += `
            max-width: 100% !important;
            height: auto !important;
            border-radius: 0.5rem !important;
            margin-bottom: 1rem !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
          `);
      }), s.appendChild(i);
    } else
      throw new Error("Content not found");
  } catch (n) {
    console.error("[shoelace-card] Modal content error:", n), s.innerHTML = `
      <div style="
        position: relative !important;
        z-index: 1003 !important;
        color: white !important;
        text-align: center !important;
        padding: 2rem !important;
        background: rgba(255, 0, 0, 0.8) !important;
        border-radius: 0.5rem !important;
        margin-top: 0 !important;
        border: 2px solid white !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      ">
        <h2 style="color: white !important; margin-bottom: 1rem !important; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7) !important;">
          ⚠️ Content Loading Error
        </h2>
        <p style="color: rgba(255, 255, 255, 0.9) !important; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;">
          Failed to load content from: ${e}.plain.html
        </p>
        <p style="color: rgba(255, 255, 255, 0.7) !important; font-size: 0.9rem !important; margin-top: 0 !important;">
          Error: ${n.message}
        </p>
      </div>
    `;
  }
  Ao(o);
}
function So(e, t) {
  console.log("[shoelace-card] Using progressive loading fallback");
  const o = ne();
  t.forEach((r, s) => {
    const l = ie(r, s + 1);
    o.appendChild(l);
  }), e.innerHTML = "", e.appendChild(o), e.classList.remove("loading"), ce(e);
}
async function zo(e, t) {
  if (!t || t.length === 0) {
    e.innerHTML = '<p class="shoelace-card-empty">No cards available.</p>';
    return;
  }
  e.classList.add("loading");
  try {
    console.log("[shoelace-card] Preloading images..."), await yo(t), console.log("[shoelace-card] All images preloaded");
    const o = ne(), r = document.createDocumentFragment();
    t.forEach((s, l) => {
      const a = ie(s, l + 1);
      r.appendChild(a);
    }), o.appendChild(r), e.innerHTML = "", e.appendChild(o), e.classList.remove("loading"), requestAnimationFrame(() => {
      o.classList.add("loaded");
    }), ce(e);
  } catch (o) {
    console.error("[shoelace-card] Image preloading failed:", o), So(e, t);
  }
}
function Mo(e) {
  e.innerHTML = `
    <div class="shoelace-card-fallback">
      <p>Cards are loading...</p>
    </div>
  `;
}
async function Po() {
  const e = ["sl-card", "sl-button", "sl-badge", "sl-icon-button", "sl-spinner"];
  for (const t of e)
    for (; !customElements.get(t); )
      await new Promise((o) => setTimeout(o, 10));
}
async function No(e) {
  try {
    ae(), await Po();
    const t = bo(e), o = await go(t);
    e.innerHTML = "", e.classList.add("shoelace-card-block"), await zo(e, o);
  } catch (t) {
    console.warn("[shoelace-card] Enhancement failed, showing fallback:", t), Mo(e);
  }
}
export {
  No as default
};
