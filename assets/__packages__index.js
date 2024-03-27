const me = (e, n) => e === n,
  Y = {
    equals: me,
  };
let ve = de;
const w = 1,
  q = 2,
  fe = {
    owned: null,
    cleanups: null,
    context: null,
    owner: null,
  },
  Q = {};
var m = null;
let W = null,
  h = null,
  g = null,
  x = null,
  X = 0;
function Ne(e, n) {
  const t = h,
    i = m,
    s = e.length === 0,
    r = n === void 0 ? i : n,
    l = s
      ? fe
      : {
          owned: null,
          cleanups: null,
          context: r ? r.context : null,
          owner: r,
        },
    o = s ? e : () => e(() => b(() => G(l)));
  (m = l), (h = null);
  try {
    return V(o, !0);
  } finally {
    (h = t), (m = i);
  }
}
function M(e, n) {
  n = n ? Object.assign({}, Y, n) : Y;
  const t = {
      value: e,
      observers: null,
      observerSlots: null,
      comparator: n.equals || void 0,
    },
    i = (s) => (typeof s == 'function' && (s = s(t.value)), ae(t, s));
  return [ce.bind(t), i];
}
function ie(e, n, t) {
  const i = te(e, n, !0, w);
  B(i);
}
function z(e, n, t) {
  const i = te(e, n, !1, w);
  B(i);
}
function K(e, n, t) {
  t = t ? Object.assign({}, Y, t) : Y;
  const i = te(e, n, !0, 0);
  return (
    (i.observers = null),
    (i.observerSlots = null),
    (i.comparator = t.equals || void 0),
    B(i),
    ce.bind(i)
  );
}
function Ie(e) {
  return e && typeof e == 'object' && 'then' in e;
}
function Se(e, n, t) {
  let i, s, r;
  (arguments.length === 2 && typeof n == 'object') || arguments.length === 1
    ? ((i = !0), (s = e), (r = n || {}))
    : ((i = e), (s = n), (r = t || {}));
  let l = null,
    o = Q,
    c = !1,
    f = 'initialValue' in r,
    p = typeof i == 'function' && K(i);
  const d = /* @__PURE__ */ new Set(),
    [y, N] = (r.storage || M)(r.initialValue),
    [A, L] = M(void 0),
    [P, S] = M(void 0, {
      equals: !1,
    }),
    [U, D] = M(f ? 'ready' : 'unresolved');
  function I(E, T, v, _) {
    return (
      l === E &&
        ((l = null),
        _ !== void 0 && (f = !0),
        (E === o || T === o) &&
          r.onHydrated &&
          queueMicrotask(() =>
            r.onHydrated(_, {
              value: T,
            }),
          ),
        (o = Q),
        R(T, v)),
      T
    );
  }
  function R(E, T) {
    V(() => {
      T === void 0 && N(() => E),
        D(T !== void 0 ? 'errored' : f ? 'ready' : 'unresolved'),
        L(T);
      for (const v of d.keys()) v.decrement();
      d.clear();
    }, !1);
  }
  function F() {
    const E = De,
      T = y(),
      v = A();
    if (v !== void 0 && !l) throw v;
    return (
      h &&
        !h.user &&
        E &&
        ie(() => {
          P(), l && (E.resolved || d.has(E) || (E.increment(), d.add(E)));
        }),
      T
    );
  }
  function C(E = !0) {
    if (E !== !1 && c) return;
    c = !1;
    const T = p ? p() : i;
    if (T == null || T === !1) {
      I(l, b(y));
      return;
    }
    const v =
      o !== Q
        ? o
        : b(() =>
            s(T, {
              value: y(),
              refetching: E,
            }),
          );
    return Ie(v)
      ? ((l = v),
        (c = !0),
        queueMicrotask(() => (c = !1)),
        V(() => {
          D(f ? 'refreshing' : 'pending'), S();
        }, !1),
        v.then(
          (_) => I(v, _, void 0, T),
          (_) => I(v, void 0, Ee(_), T),
        ))
      : (I(l, v, void 0, T), v);
  }
  return (
    Object.defineProperties(F, {
      state: {
        get: () => U(),
      },
      error: {
        get: () => A(),
      },
      loading: {
        get() {
          const E = U();
          return E === 'pending' || E === 'refreshing';
        },
      },
      latest: {
        get() {
          if (!f) return F();
          const E = A();
          if (E && !l) throw E;
          return y();
        },
      },
    }),
    p ? ie(() => C(!1)) : C(!1),
    [
      F,
      {
        refetch: C,
        mutate: N,
      },
    ]
  );
}
function b(e) {
  if (h === null) return e();
  const n = h;
  h = null;
  try {
    return e();
  } finally {
    h = n;
  }
}
let De;
function ce() {
  if (this.sources && this.state)
    if (this.state === w) B(this);
    else {
      const e = g;
      (g = null), V(() => $(this), !1), (g = e);
    }
  if (h) {
    const e = this.observers ? this.observers.length : 0;
    h.sources
      ? (h.sources.push(this), h.sourceSlots.push(e))
      : ((h.sources = [this]), (h.sourceSlots = [e])),
      this.observers
        ? (this.observers.push(h),
          this.observerSlots.push(h.sources.length - 1))
        : ((this.observers = [h]),
          (this.observerSlots = [h.sources.length - 1]));
  }
  return this.value;
}
function ae(e, n, t) {
  let i = e.value;
  return (
    (!e.comparator || !e.comparator(i, n)) &&
      ((e.value = n),
      e.observers &&
        e.observers.length &&
        V(() => {
          for (let s = 0; s < e.observers.length; s += 1) {
            const r = e.observers[s],
              l = W && W.running;
            l && W.disposed.has(r),
              (l ? !r.tState : !r.state) &&
                (r.pure ? g.push(r) : x.push(r), r.observers && he(r)),
              l || (r.state = w);
          }
          if (g.length > 1e6) throw ((g = []), new Error());
        }, !1)),
    n
  );
}
function B(e) {
  if (!e.fn) return;
  G(e);
  const n = m,
    t = h,
    i = X;
  (h = m = e), Oe(e, e.value, i), (h = t), (m = n);
}
function Oe(e, n, t) {
  let i;
  try {
    i = e.fn(n);
  } catch (s) {
    return (
      e.pure &&
        ((e.state = w), e.owned && e.owned.forEach(G), (e.owned = null)),
      (e.updatedAt = t + 1),
      ye(s)
    );
  }
  (!e.updatedAt || e.updatedAt <= t) &&
    (e.updatedAt != null && 'observers' in e ? ae(e, i) : (e.value = i),
    (e.updatedAt = t));
}
function te(e, n, t, i = w, s) {
  const r = {
    fn: e,
    state: i,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: n,
    owner: m,
    context: m ? m.context : null,
    pure: t,
  };
  return (
    m === null || (m !== fe && (m.owned ? m.owned.push(r) : (m.owned = [r]))), r
  );
}
function pe(e) {
  if (e.state === 0) return;
  if (e.state === q) return $(e);
  if (e.suspense && b(e.suspense.inFallback)) return e.suspense.effects.push(e);
  const n = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < X); )
    e.state && n.push(e);
  for (let t = n.length - 1; t >= 0; t--)
    if (((e = n[t]), e.state === w)) B(e);
    else if (e.state === q) {
      const i = g;
      (g = null), V(() => $(e, n[0]), !1), (g = i);
    }
}
function V(e, n) {
  if (g) return e();
  let t = !1;
  n || (g = []), x ? (t = !0) : (x = []), X++;
  try {
    const i = e();
    return Ae(t), i;
  } catch (i) {
    t || (x = null), (g = null), ye(i);
  }
}
function Ae(e) {
  if ((g && (de(g), (g = null)), e)) return;
  const n = x;
  (x = null), n.length && V(() => ve(n), !1);
}
function de(e) {
  for (let n = 0; n < e.length; n++) pe(e[n]);
}
function $(e, n) {
  e.state = 0;
  for (let t = 0; t < e.sources.length; t += 1) {
    const i = e.sources[t];
    if (i.sources) {
      const s = i.state;
      s === w
        ? i !== n && (!i.updatedAt || i.updatedAt < X) && pe(i)
        : s === q && $(i, n);
    }
  }
}
function he(e) {
  for (let n = 0; n < e.observers.length; n += 1) {
    const t = e.observers[n];
    t.state ||
      ((t.state = q), t.pure ? g.push(t) : x.push(t), t.observers && he(t));
  }
}
function G(e) {
  let n;
  if (e.sources)
    for (; e.sources.length; ) {
      const t = e.sources.pop(),
        i = e.sourceSlots.pop(),
        s = t.observers;
      if (s && s.length) {
        const r = s.pop(),
          l = t.observerSlots.pop();
        i < s.length &&
          ((r.sourceSlots[l] = i), (s[i] = r), (t.observerSlots[i] = l));
      }
    }
  if (e.owned) {
    for (n = e.owned.length - 1; n >= 0; n--) G(e.owned[n]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (n = e.cleanups.length - 1; n >= 0; n--) e.cleanups[n]();
    e.cleanups = null;
  }
  e.state = 0;
}
function Ee(e) {
  return e instanceof Error
    ? e
    : new Error(typeof e == 'string' ? e : 'Unknown error', {
        cause: e,
      });
}
function ye(e, n = m) {
  throw Ee(e);
}
function be(e, n) {
  return b(() => e(n || {}));
}
const we = (e) => `Stale read from <${e}>.`;
function xe(e) {
  const n = e.keyed,
    t = K(() => e.when, void 0, {
      equals: (i, s) => (n ? i === s : !i == !s),
    });
  return K(
    () => {
      const i = t();
      if (i) {
        const s = e.children;
        return typeof s == 'function' && s.length > 0
          ? b(() =>
              s(
                n
                  ? i
                  : () => {
                      if (!b(t)) throw we('Show');
                      return e.when;
                    },
              ),
            )
          : s;
      }
      return e.fallback;
    },
    void 0,
    void 0,
  );
}
function Ve(e, n, t) {
  let i = t.length,
    s = n.length,
    r = i,
    l = 0,
    o = 0,
    c = n[s - 1].nextSibling,
    f = null;
  for (; l < s || o < r; ) {
    if (n[l] === t[o]) {
      l++, o++;
      continue;
    }
    for (; n[s - 1] === t[r - 1]; ) s--, r--;
    if (s === l) {
      const p = r < i ? (o ? t[o - 1].nextSibling : t[r - o]) : c;
      for (; o < r; ) e.insertBefore(t[o++], p);
    } else if (r === o)
      for (; l < s; ) (!f || !f.has(n[l])) && n[l].remove(), l++;
    else if (n[l] === t[r - 1] && t[o] === n[s - 1]) {
      const p = n[--s].nextSibling;
      e.insertBefore(t[o++], n[l++].nextSibling),
        e.insertBefore(t[--r], p),
        (n[s] = t[r]);
    } else {
      if (!f) {
        f = /* @__PURE__ */ new Map();
        let d = o;
        for (; d < r; ) f.set(t[d], d++);
      }
      const p = f.get(n[l]);
      if (p != null)
        if (o < p && p < r) {
          let d = l,
            y = 1,
            N;
          for (
            ;
            ++d < s && d < r && !((N = f.get(n[d])) == null || N !== p + y);

          )
            y++;
          if (y > p - o) {
            const A = n[l];
            for (; o < p; ) e.insertBefore(t[o++], A);
          } else e.replaceChild(t[o++], n[l++]);
        } else l++;
      else n[l++].remove();
    }
  }
}
function Fe(e, n, t, i = {}) {
  let s;
  return (
    Ne((r) => {
      (s = r),
        n === document ? e() : _e(n, e(), n.firstChild ? null : void 0, t);
    }, i.owner),
    () => {
      s(), (n.textContent = '');
    }
  );
}
function Ce(e, n, t) {
  let i;
  const s = () => {
      const l = document.createElement('template');
      return (
        (l.innerHTML = e),
        t ? l.content.firstChild.firstChild : l.content.firstChild
      );
    },
    r = n
      ? () => b(() => document.importNode(i || (i = s()), !0))
      : () => (i || (i = s())).cloneNode(!0);
  return (r.cloneNode = r), r;
}
function _e(e, n, t, i) {
  if ((t !== void 0 && !i && (i = []), typeof n != 'function'))
    return J(e, n, i, t);
  z((s) => J(e, n(), s, t), i);
}
function J(e, n, t, i, s) {
  for (; typeof t == 'function'; ) t = t();
  if (n === t) return t;
  const r = typeof n,
    l = i !== void 0;
  if (
    ((e = (l && t[0] && t[0].parentNode) || e),
    r === 'string' || r === 'number')
  )
    if ((r === 'number' && (n = n.toString()), l)) {
      let o = t[0];
      o && o.nodeType === 3 ? (o.data = n) : (o = document.createTextNode(n)),
        (t = j(e, t, i, o));
    } else
      t !== '' && typeof t == 'string'
        ? (t = e.firstChild.data = n)
        : (t = e.textContent = n);
  else if (n == null || r === 'boolean') t = j(e, t, i);
  else {
    if (r === 'function')
      return (
        z(() => {
          let o = n();
          for (; typeof o == 'function'; ) o = o();
          t = J(e, o, t, i);
        }),
        () => t
      );
    if (Array.isArray(n)) {
      const o = [],
        c = t && Array.isArray(t);
      if (ee(o, n, t, s)) return z(() => (t = J(e, o, t, i, !0))), () => t;
      if (o.length === 0) {
        if (((t = j(e, t, i)), l)) return t;
      } else
        c
          ? t.length === 0
            ? se(e, o, i)
            : Ve(e, t, o)
          : (t && j(e), se(e, o));
      t = o;
    } else if (n.nodeType) {
      if (Array.isArray(t)) {
        if (l) return (t = j(e, t, i, n));
        j(e, t, null, n);
      } else
        t == null || t === '' || !e.firstChild
          ? e.appendChild(n)
          : e.replaceChild(n, e.firstChild);
      t = n;
    } else console.warn('Unrecognized value. Skipped inserting', n);
  }
  return t;
}
function ee(e, n, t, i) {
  let s = !1;
  for (let r = 0, l = n.length; r < l; r++) {
    let o = n[r],
      c = t && t[r],
      f;
    if (!(o == null || o === !0 || o === !1))
      if ((f = typeof o) == 'object' && o.nodeType) e.push(o);
      else if (Array.isArray(o)) s = ee(e, o, c) || s;
      else if (f === 'function')
        if (i) {
          for (; typeof o == 'function'; ) o = o();
          s =
            ee(e, Array.isArray(o) ? o : [o], Array.isArray(c) ? c : [c]) || s;
        } else e.push(o), (s = !0);
      else {
        const p = String(o);
        c && c.nodeType === 3 && c.data === p
          ? e.push(c)
          : e.push(document.createTextNode(p));
      }
  }
  return s;
}
function se(e, n, t = null) {
  for (let i = 0, s = n.length; i < s; i++) e.insertBefore(n[i], t);
}
function j(e, n, t, i) {
  if (t === void 0) return (e.textContent = '');
  const s = i || document.createTextNode('');
  if (n.length) {
    let r = !1;
    for (let l = n.length - 1; l >= 0; l--) {
      const o = n[l];
      if (s !== o) {
        const c = o.parentNode === e;
        !r && !l
          ? c
            ? e.replaceChild(s, o)
            : e.insertBefore(s, t)
          : c && o.remove();
      } else r = !0;
    }
  } else e.insertBefore(s, t);
  return [s];
}
function je(e, n) {
  if (!!!e) throw new Error(n);
}
const Te = {
    Name: [],
    Document: ['definitions'],
    OperationDefinition: [
      'name',
      'variableDefinitions',
      'directives',
      'selectionSet',
    ],
    VariableDefinition: ['variable', 'type', 'defaultValue', 'directives'],
    Variable: ['name'],
    SelectionSet: ['selections'],
    Field: ['alias', 'name', 'arguments', 'directives', 'selectionSet'],
    Argument: ['name', 'value'],
    FragmentSpread: ['name', 'directives'],
    InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
    FragmentDefinition: [
      'name',
      // Note: fragment variable definitions are deprecated and will removed in v17.0.0
      'variableDefinitions',
      'typeCondition',
      'directives',
      'selectionSet',
    ],
    IntValue: [],
    FloatValue: [],
    StringValue: [],
    BooleanValue: [],
    NullValue: [],
    EnumValue: [],
    ListValue: ['values'],
    ObjectValue: ['fields'],
    ObjectField: ['name', 'value'],
    Directive: ['name', 'arguments'],
    NamedType: ['name'],
    ListType: ['type'],
    NonNullType: ['type'],
    SchemaDefinition: ['description', 'directives', 'operationTypes'],
    OperationTypeDefinition: ['type'],
    ScalarTypeDefinition: ['description', 'name', 'directives'],
    ObjectTypeDefinition: [
      'description',
      'name',
      'interfaces',
      'directives',
      'fields',
    ],
    FieldDefinition: ['description', 'name', 'arguments', 'type', 'directives'],
    InputValueDefinition: [
      'description',
      'name',
      'type',
      'defaultValue',
      'directives',
    ],
    InterfaceTypeDefinition: [
      'description',
      'name',
      'interfaces',
      'directives',
      'fields',
    ],
    UnionTypeDefinition: ['description', 'name', 'directives', 'types'],
    EnumTypeDefinition: ['description', 'name', 'directives', 'values'],
    EnumValueDefinition: ['description', 'name', 'directives'],
    InputObjectTypeDefinition: ['description', 'name', 'directives', 'fields'],
    DirectiveDefinition: ['description', 'name', 'arguments', 'locations'],
    SchemaExtension: ['directives', 'operationTypes'],
    ScalarTypeExtension: ['name', 'directives'],
    ObjectTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
    InterfaceTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
    UnionTypeExtension: ['name', 'directives', 'types'],
    EnumTypeExtension: ['name', 'directives', 'values'],
    InputObjectTypeExtension: ['name', 'directives', 'fields'],
  },
  Le = new Set(Object.keys(Te));
function re(e) {
  const n = e == null ? void 0 : e.kind;
  return typeof n == 'string' && Le.has(n);
}
var oe;
(function (e) {
  (e.QUERY = 'query'),
    (e.MUTATION = 'mutation'),
    (e.SUBSCRIPTION = 'subscription');
})(oe || (oe = {}));
var ne;
(function (e) {
  (e.NAME = 'Name'),
    (e.DOCUMENT = 'Document'),
    (e.OPERATION_DEFINITION = 'OperationDefinition'),
    (e.VARIABLE_DEFINITION = 'VariableDefinition'),
    (e.SELECTION_SET = 'SelectionSet'),
    (e.FIELD = 'Field'),
    (e.ARGUMENT = 'Argument'),
    (e.FRAGMENT_SPREAD = 'FragmentSpread'),
    (e.INLINE_FRAGMENT = 'InlineFragment'),
    (e.FRAGMENT_DEFINITION = 'FragmentDefinition'),
    (e.VARIABLE = 'Variable'),
    (e.INT = 'IntValue'),
    (e.FLOAT = 'FloatValue'),
    (e.STRING = 'StringValue'),
    (e.BOOLEAN = 'BooleanValue'),
    (e.NULL = 'NullValue'),
    (e.ENUM = 'EnumValue'),
    (e.LIST = 'ListValue'),
    (e.OBJECT = 'ObjectValue'),
    (e.OBJECT_FIELD = 'ObjectField'),
    (e.DIRECTIVE = 'Directive'),
    (e.NAMED_TYPE = 'NamedType'),
    (e.LIST_TYPE = 'ListType'),
    (e.NON_NULL_TYPE = 'NonNullType'),
    (e.SCHEMA_DEFINITION = 'SchemaDefinition'),
    (e.OPERATION_TYPE_DEFINITION = 'OperationTypeDefinition'),
    (e.SCALAR_TYPE_DEFINITION = 'ScalarTypeDefinition'),
    (e.OBJECT_TYPE_DEFINITION = 'ObjectTypeDefinition'),
    (e.FIELD_DEFINITION = 'FieldDefinition'),
    (e.INPUT_VALUE_DEFINITION = 'InputValueDefinition'),
    (e.INTERFACE_TYPE_DEFINITION = 'InterfaceTypeDefinition'),
    (e.UNION_TYPE_DEFINITION = 'UnionTypeDefinition'),
    (e.ENUM_TYPE_DEFINITION = 'EnumTypeDefinition'),
    (e.ENUM_VALUE_DEFINITION = 'EnumValueDefinition'),
    (e.INPUT_OBJECT_TYPE_DEFINITION = 'InputObjectTypeDefinition'),
    (e.DIRECTIVE_DEFINITION = 'DirectiveDefinition'),
    (e.SCHEMA_EXTENSION = 'SchemaExtension'),
    (e.SCALAR_TYPE_EXTENSION = 'ScalarTypeExtension'),
    (e.OBJECT_TYPE_EXTENSION = 'ObjectTypeExtension'),
    (e.INTERFACE_TYPE_EXTENSION = 'InterfaceTypeExtension'),
    (e.UNION_TYPE_EXTENSION = 'UnionTypeExtension'),
    (e.ENUM_TYPE_EXTENSION = 'EnumTypeExtension'),
    (e.INPUT_OBJECT_TYPE_EXTENSION = 'InputObjectTypeExtension');
})(ne || (ne = {}));
function le(e) {
  return e === 9 || e === 32;
}
function Pe(e, n) {
  const t = e.replace(/"""/g, '\\"""'),
    i = t.split(/\r\n|[\n\r]/g),
    s = i.length === 1,
    r =
      i.length > 1 &&
      i.slice(1).every((N) => N.length === 0 || le(N.charCodeAt(0))),
    l = t.endsWith('\\"""'),
    o = e.endsWith('"') && !l,
    c = e.endsWith('\\'),
    f = o || c,
    p =
      !(n != null && n.minimize) && // add leading and trailing new lines only if it improves readability
      (!s || e.length > 70 || f || r || l);
  let d = '';
  const y = s && le(e.charCodeAt(0));
  return (
    ((p && !y) || r) &&
      (d += `
`),
    (d += t),
    (p || f) &&
      (d += `
`),
    '"""' + d + '"""'
  );
}
const Ue = 10,
  ge = 2;
function Re(e) {
  return H(e, []);
}
function H(e, n) {
  switch (typeof e) {
    case 'string':
      return JSON.stringify(e);
    case 'function':
      return e.name ? `[function ${e.name}]` : '[function]';
    case 'object':
      return Be(e, n);
    default:
      return String(e);
  }
}
function Be(e, n) {
  if (e === null) return 'null';
  if (n.includes(e)) return '[Circular]';
  const t = [...n, e];
  if (Me(e)) {
    const i = e.toJSON();
    if (i !== e) return typeof i == 'string' ? i : H(i, t);
  } else if (Array.isArray(e)) return Ye(e, t);
  return ke(e, t);
}
function Me(e) {
  return typeof e.toJSON == 'function';
}
function ke(e, n) {
  const t = Object.entries(e);
  return t.length === 0
    ? '{}'
    : n.length > ge
    ? '[' + qe(e) + ']'
    : '{ ' + t.map(([s, r]) => s + ': ' + H(r, n)).join(', ') + ' }';
}
function Ye(e, n) {
  if (e.length === 0) return '[]';
  if (n.length > ge) return '[Array]';
  const t = Math.min(Ue, e.length),
    i = e.length - t,
    s = [];
  for (let r = 0; r < t; ++r) s.push(H(e[r], n));
  return (
    i === 1
      ? s.push('... 1 more item')
      : i > 1 && s.push(`... ${i} more items`),
    '[' + s.join(', ') + ']'
  );
}
function qe(e) {
  const n = Object.prototype.toString
    .call(e)
    .replace(/^\[object /, '')
    .replace(/]$/, '');
  if (n === 'Object' && typeof e.constructor == 'function') {
    const t = e.constructor.name;
    if (typeof t == 'string' && t !== '') return t;
  }
  return n;
}
function $e(e) {
  return `"${e.replace(Je, Xe)}"`;
}
const Je = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function Xe(e) {
  return Ge[e.charCodeAt(0)];
}
const Ge = [
    '\\u0000',
    '\\u0001',
    '\\u0002',
    '\\u0003',
    '\\u0004',
    '\\u0005',
    '\\u0006',
    '\\u0007',
    '\\b',
    '\\t',
    '\\n',
    '\\u000B',
    '\\f',
    '\\r',
    '\\u000E',
    '\\u000F',
    '\\u0010',
    '\\u0011',
    '\\u0012',
    '\\u0013',
    '\\u0014',
    '\\u0015',
    '\\u0016',
    '\\u0017',
    '\\u0018',
    '\\u0019',
    '\\u001A',
    '\\u001B',
    '\\u001C',
    '\\u001D',
    '\\u001E',
    '\\u001F',
    '',
    '',
    '\\"',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    // 2F
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    // 3F
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    // 4F
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '\\\\',
    '',
    '',
    '',
    // 5F
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    // 6F
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '\\u007F',
    '\\u0080',
    '\\u0081',
    '\\u0082',
    '\\u0083',
    '\\u0084',
    '\\u0085',
    '\\u0086',
    '\\u0087',
    '\\u0088',
    '\\u0089',
    '\\u008A',
    '\\u008B',
    '\\u008C',
    '\\u008D',
    '\\u008E',
    '\\u008F',
    '\\u0090',
    '\\u0091',
    '\\u0092',
    '\\u0093',
    '\\u0094',
    '\\u0095',
    '\\u0096',
    '\\u0097',
    '\\u0098',
    '\\u0099',
    '\\u009A',
    '\\u009B',
    '\\u009C',
    '\\u009D',
    '\\u009E',
    '\\u009F',
  ],
  He = Object.freeze({});
function Qe(e, n, t = Te) {
  const i = /* @__PURE__ */ new Map();
  for (const S of Object.values(ne)) i.set(S, We(n, S));
  let s,
    r = Array.isArray(e),
    l = [e],
    o = -1,
    c = [],
    f = e,
    p,
    d;
  const y = [],
    N = [];
  do {
    o++;
    const S = o === l.length,
      U = S && c.length !== 0;
    if (S) {
      if (
        ((p = N.length === 0 ? void 0 : y[y.length - 1]),
        (f = d),
        (d = N.pop()),
        U)
      )
        if (r) {
          f = f.slice();
          let I = 0;
          for (const [R, F] of c) {
            const C = R - I;
            F === null ? (f.splice(C, 1), I++) : (f[C] = F);
          }
        } else {
          f = Object.defineProperties({}, Object.getOwnPropertyDescriptors(f));
          for (const [I, R] of c) f[I] = R;
        }
      (o = s.index), (l = s.keys), (c = s.edits), (r = s.inArray), (s = s.prev);
    } else if (d) {
      if (((p = r ? o : l[o]), (f = d[p]), f == null)) continue;
      y.push(p);
    }
    let D;
    if (!Array.isArray(f)) {
      var A, L;
      re(f) || je(!1, `Invalid AST Node: ${Re(f)}.`);
      const I = S
        ? (A = i.get(f.kind)) === null || A === void 0
          ? void 0
          : A.leave
        : (L = i.get(f.kind)) === null || L === void 0
        ? void 0
        : L.enter;
      if (((D = I == null ? void 0 : I.call(n, f, p, d, y, N)), D === He))
        break;
      if (D === !1) {
        if (!S) {
          y.pop();
          continue;
        }
      } else if (D !== void 0 && (c.push([p, D]), !S))
        if (re(D)) f = D;
        else {
          y.pop();
          continue;
        }
    }
    if ((D === void 0 && U && c.push([p, f]), S)) y.pop();
    else {
      var P;
      (s = {
        inArray: r,
        index: o,
        keys: l,
        edits: c,
        prev: s,
      }),
        (r = Array.isArray(f)),
        (l = r ? f : (P = t[f.kind]) !== null && P !== void 0 ? P : []),
        (o = -1),
        (c = []),
        d && N.push(d),
        (d = f);
    }
  } while (s !== void 0);
  return c.length !== 0 ? c[c.length - 1][1] : e;
}
function We(e, n) {
  const t = e[n];
  return typeof t == 'object'
    ? t
    : typeof t == 'function'
    ? {
        enter: t,
        leave: void 0,
      }
    : {
        enter: e.enter,
        leave: e.leave,
      };
}
function Ze(e) {
  return Qe(e, Ke);
}
const ze = 80,
  Ke = {
    Name: {
      leave: (e) => e.value,
    },
    Variable: {
      leave: (e) => '$' + e.name,
    },
    // Document
    Document: {
      leave: (e) =>
        u(
          e.definitions,
          `

`,
        ),
    },
    OperationDefinition: {
      leave(e) {
        const n = a('(', u(e.variableDefinitions, ', '), ')'),
          t = u([e.operation, u([e.name, n]), u(e.directives, ' ')], ' ');
        return (t === 'query' ? '' : t + ' ') + e.selectionSet;
      },
    },
    VariableDefinition: {
      leave: ({ variable: e, type: n, defaultValue: t, directives: i }) =>
        e + ': ' + n + a(' = ', t) + a(' ', u(i, ' ')),
    },
    SelectionSet: {
      leave: ({ selections: e }) => O(e),
    },
    Field: {
      leave({
        alias: e,
        name: n,
        arguments: t,
        directives: i,
        selectionSet: s,
      }) {
        const r = a('', e, ': ') + n;
        let l = r + a('(', u(t, ', '), ')');
        return (
          l.length > ze &&
            (l =
              r +
              a(
                `(
`,
                k(
                  u(
                    t,
                    `
`,
                  ),
                ),
                `
)`,
              )),
          u([l, u(i, ' '), s], ' ')
        );
      },
    },
    Argument: {
      leave: ({ name: e, value: n }) => e + ': ' + n,
    },
    // Fragments
    FragmentSpread: {
      leave: ({ name: e, directives: n }) => '...' + e + a(' ', u(n, ' ')),
    },
    InlineFragment: {
      leave: ({ typeCondition: e, directives: n, selectionSet: t }) =>
        u(['...', a('on ', e), u(n, ' '), t], ' '),
    },
    FragmentDefinition: {
      leave: ({
        name: e,
        typeCondition: n,
        variableDefinitions: t,
        directives: i,
        selectionSet: s,
      }) =>
        // or removed in the future.
        `fragment ${e}${a('(', u(t, ', '), ')')} on ${n} ${a(
          '',
          u(i, ' '),
          ' ',
        )}` + s,
    },
    // Value
    IntValue: {
      leave: ({ value: e }) => e,
    },
    FloatValue: {
      leave: ({ value: e }) => e,
    },
    StringValue: {
      leave: ({ value: e, block: n }) => (n ? Pe(e) : $e(e)),
    },
    BooleanValue: {
      leave: ({ value: e }) => (e ? 'true' : 'false'),
    },
    NullValue: {
      leave: () => 'null',
    },
    EnumValue: {
      leave: ({ value: e }) => e,
    },
    ListValue: {
      leave: ({ values: e }) => '[' + u(e, ', ') + ']',
    },
    ObjectValue: {
      leave: ({ fields: e }) => '{' + u(e, ', ') + '}',
    },
    ObjectField: {
      leave: ({ name: e, value: n }) => e + ': ' + n,
    },
    // Directive
    Directive: {
      leave: ({ name: e, arguments: n }) => '@' + e + a('(', u(n, ', '), ')'),
    },
    // Type
    NamedType: {
      leave: ({ name: e }) => e,
    },
    ListType: {
      leave: ({ type: e }) => '[' + e + ']',
    },
    NonNullType: {
      leave: ({ type: e }) => e + '!',
    },
    // Type System Definitions
    SchemaDefinition: {
      leave: ({ description: e, directives: n, operationTypes: t }) =>
        a(
          '',
          e,
          `
`,
        ) + u(['schema', u(n, ' '), O(t)], ' '),
    },
    OperationTypeDefinition: {
      leave: ({ operation: e, type: n }) => e + ': ' + n,
    },
    ScalarTypeDefinition: {
      leave: ({ description: e, name: n, directives: t }) =>
        a(
          '',
          e,
          `
`,
        ) + u(['scalar', n, u(t, ' ')], ' '),
    },
    ObjectTypeDefinition: {
      leave: ({
        description: e,
        name: n,
        interfaces: t,
        directives: i,
        fields: s,
      }) =>
        a(
          '',
          e,
          `
`,
        ) + u(['type', n, a('implements ', u(t, ' & ')), u(i, ' '), O(s)], ' '),
    },
    FieldDefinition: {
      leave: ({
        description: e,
        name: n,
        arguments: t,
        type: i,
        directives: s,
      }) =>
        a(
          '',
          e,
          `
`,
        ) +
        n +
        (ue(t)
          ? a(
              `(
`,
              k(
                u(
                  t,
                  `
`,
                ),
              ),
              `
)`,
            )
          : a('(', u(t, ', '), ')')) +
        ': ' +
        i +
        a(' ', u(s, ' ')),
    },
    InputValueDefinition: {
      leave: ({
        description: e,
        name: n,
        type: t,
        defaultValue: i,
        directives: s,
      }) =>
        a(
          '',
          e,
          `
`,
        ) + u([n + ': ' + t, a('= ', i), u(s, ' ')], ' '),
    },
    InterfaceTypeDefinition: {
      leave: ({
        description: e,
        name: n,
        interfaces: t,
        directives: i,
        fields: s,
      }) =>
        a(
          '',
          e,
          `
`,
        ) +
        u(
          ['interface', n, a('implements ', u(t, ' & ')), u(i, ' '), O(s)],
          ' ',
        ),
    },
    UnionTypeDefinition: {
      leave: ({ description: e, name: n, directives: t, types: i }) =>
        a(
          '',
          e,
          `
`,
        ) + u(['union', n, u(t, ' '), a('= ', u(i, ' | '))], ' '),
    },
    EnumTypeDefinition: {
      leave: ({ description: e, name: n, directives: t, values: i }) =>
        a(
          '',
          e,
          `
`,
        ) + u(['enum', n, u(t, ' '), O(i)], ' '),
    },
    EnumValueDefinition: {
      leave: ({ description: e, name: n, directives: t }) =>
        a(
          '',
          e,
          `
`,
        ) + u([n, u(t, ' ')], ' '),
    },
    InputObjectTypeDefinition: {
      leave: ({ description: e, name: n, directives: t, fields: i }) =>
        a(
          '',
          e,
          `
`,
        ) + u(['input', n, u(t, ' '), O(i)], ' '),
    },
    DirectiveDefinition: {
      leave: ({
        description: e,
        name: n,
        arguments: t,
        repeatable: i,
        locations: s,
      }) =>
        a(
          '',
          e,
          `
`,
        ) +
        'directive @' +
        n +
        (ue(t)
          ? a(
              `(
`,
              k(
                u(
                  t,
                  `
`,
                ),
              ),
              `
)`,
            )
          : a('(', u(t, ', '), ')')) +
        (i ? ' repeatable' : '') +
        ' on ' +
        u(s, ' | '),
    },
    SchemaExtension: {
      leave: ({ directives: e, operationTypes: n }) =>
        u(['extend schema', u(e, ' '), O(n)], ' '),
    },
    ScalarTypeExtension: {
      leave: ({ name: e, directives: n }) =>
        u(['extend scalar', e, u(n, ' ')], ' '),
    },
    ObjectTypeExtension: {
      leave: ({ name: e, interfaces: n, directives: t, fields: i }) =>
        u(
          ['extend type', e, a('implements ', u(n, ' & ')), u(t, ' '), O(i)],
          ' ',
        ),
    },
    InterfaceTypeExtension: {
      leave: ({ name: e, interfaces: n, directives: t, fields: i }) =>
        u(
          [
            'extend interface',
            e,
            a('implements ', u(n, ' & ')),
            u(t, ' '),
            O(i),
          ],
          ' ',
        ),
    },
    UnionTypeExtension: {
      leave: ({ name: e, directives: n, types: t }) =>
        u(['extend union', e, u(n, ' '), a('= ', u(t, ' | '))], ' '),
    },
    EnumTypeExtension: {
      leave: ({ name: e, directives: n, values: t }) =>
        u(['extend enum', e, u(n, ' '), O(t)], ' '),
    },
    InputObjectTypeExtension: {
      leave: ({ name: e, directives: n, fields: t }) =>
        u(['extend input', e, u(n, ' '), O(t)], ' '),
    },
  };
function u(e, n = '') {
  var t;
  return (t = e == null ? void 0 : e.filter((i) => i).join(n)) !== null &&
    t !== void 0
    ? t
    : '';
}
function O(e) {
  return a(
    `{
`,
    k(
      u(
        e,
        `
`,
      ),
    ),
    `
}`,
  );
}
function a(e, n, t = '') {
  return n != null && n !== '' ? e + n + t : '';
}
function k(e) {
  return a(
    '  ',
    e.replace(
      /\n/g,
      `
  `,
    ),
  );
}
function ue(e) {
  var n;
  return (n =
    e == null
      ? void 0
      : e.some((t) =>
          t.includes(`
`),
        )) !== null && n !== void 0
    ? n
    : !1;
}
var Z = (e) => (typeof e == 'function' ? e : () => e),
  en =
    (e, n = {}) =>
    (t, i = {}, s) => {
      const r = Z(e),
        l = Z(i),
        o = Z(n);
      return Se(
        () => {
          const c = r(),
            f = l(),
            p = o();
          return c && f && { url: c, options: { ...p, variables: f } };
        },
        ({ url: c, options: f }) => nn(c, t, f),
        s,
      );
    };
async function nn(e, n, t = {}) {
  const {
      fetcher: i = fetch,
      variables: s = {},
      headers: r = {},
      method: l = 'POST',
    } = t,
    o = typeof n == 'string' ? n : Ze(n);
  return i(e, {
    ...t,
    method: l,
    body: JSON.stringify({ query: o, variables: s }),
    headers: {
      'content-type': 'application/json',
      ...r,
    },
  })
    .then((c) => c.json())
    .then(({ data: c, errors: f }) => {
      if (f) throw f;
      return c;
    });
}
var tn = (e, ...n) =>
  e
    .map((t, i) => `${t}${n[i] ?? ''}`)
    .join('')
    .replace(/#.+\r?\n|\r/g, '')
    .replace(/\r?\n|\r/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
const sn = `https://${window.Shopify.shop}/api/2023-01/graphql.json`,
  rn = en(sn, {
    headers: {
      'X-Shopify-Storefront-Access-Token': window.storefrontApi.accessToken,
    },
  }),
  on = tn`
  query Products {
    products(first: 250) {
      nodes {
        id
        title
      }
    }
  }
`,
  ln = /* @__PURE__ */ Ce('<h1>First component'),
  un = () => {
    const [e] = rn(on);
    return be(xe, {
      keyed: !0,
      get when() {
        return e();
      },
      children: (n) => (console.log(n), ln()),
    });
  };
Fe(un, document.getElementById('index'));
export { un as default };
