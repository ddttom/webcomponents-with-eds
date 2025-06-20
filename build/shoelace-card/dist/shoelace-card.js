async function m(e) {
  return new Promise((t, a) => {
    const n = document.createElement("link");
    n.rel = "stylesheet", n.href = e, n.onload = t, n.onerror = a, document.head.appendChild(n);
  });
}
async function u(e, t = {}) {
  return new Promise((a, n) => {
    const c = document.createElement("script");
    c.src = e, Object.assign(c, t), c.onload = a, c.onerror = n, document.head.appendChild(c);
  });
}
const d = {
  QUERY_INDEX_PATH: "/slides/query-index.json",
  BADGE_COLOR: "primary",
  DEFAULT_BUTTON_TEXT: "Learn More"
};
async function h() {
  try {
    await m("https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/themes/light.css"), await u("https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/shoelace-autoloader.js", {
      type: "module"
    }), await new Promise((e) => setTimeout(e, 100)), console.debug("[shoelace-card] Shoelace resources loaded successfully");
  } catch (e) {
    throw console.error("[shoelace-card] Failed to load Shoelace resources:", e), e;
  }
}
function p(e) {
  return e.textContent.trim() || d.QUERY_INDEX_PATH;
}
async function f(e) {
  try {
    console.debug("[shoelace-card] Fetching data from:", e);
    const t = await fetch(e, {
      mode: "cors",
      headers: { Accept: "application/json" }
    });
    if (!t.ok)
      throw new Error(`Failed to fetch card data: ${t.status}`);
    const a = await t.json();
    return console.debug("[shoelace-card] Fetched data:", a), a.data || [];
  } catch (t) {
    return console.error("[shoelace-card] Fetch error:", t), [];
  }
}
async function C(e) {
  try {
    const t = `${e}.plain.html`;
    console.debug("[shoelace-card] Fetching plain HTML from:", t);
    const a = await fetch(t, {
      mode: "cors",
      headers: { Accept: "text/html" }
    });
    if (!a.ok)
      throw new Error(`Failed to fetch plain HTML: ${a.status}`);
    let n = await a.text();
    return n = n.replace(/src="\.\/media\//g, 'src="/media/'), n = n.replace(/src="media\//g, 'src="/media/'), n = n.replace(/src="\.\.\/media\//g, 'src="/media/'), n;
  } catch (t) {
    return console.error("[shoelace-card] Plain HTML fetch error:", t), null;
  }
}
function E(e) {
  const t = document.createElement("sl-badge");
  return t.className = "shoelace-card-badge", t.setAttribute("variant", d.BADGE_COLOR), t.setAttribute("pill", ""), t.textContent = e, t;
}
function g(e, t) {
  if (!e) return null;
  const a = document.createElement("img");
  return a.slot = "image", a.src = e, a.alt = t || "Card image", a.loading = "lazy", a;
}
function y(e) {
  const t = document.createElement("div");
  if (t.className = "shoelace-card-content", e.title) {
    const a = document.createElement("strong");
    a.textContent = e.title, t.appendChild(a), t.appendChild(document.createElement("br"));
  }
  if (e.description) {
    const a = document.createTextNode(e.description);
    t.appendChild(a), t.appendChild(document.createElement("br"));
  }
  return t;
}
function b(e) {
  const t = document.createElement("div");
  t.slot = "footer", t.className = "shoelace-card-footer";
  const a = document.createElement("sl-button");
  return a.setAttribute("variant", "primary"), a.setAttribute("pill", ""), a.textContent = e.buttonText || d.DEFAULT_BUTTON_TEXT, a.dataset.cardPath = e.path, a.dataset.cardImage = e.image, a.dataset.action = "open-modal", t.appendChild(a), t;
}
function w(e, t) {
  const a = document.createElement("sl-card");
  return a.className = "shoelace-card-item", a.setAttribute("data-slide", t), [
    E(t),
    g(e.image, e.title),
    y(e),
    b(e)
  ].filter(Boolean).forEach((c) => a.appendChild(c)), a;
}
function v() {
  const e = document.createElement("div");
  return e.className = "shoelace-card-container", e;
}
function T(e) {
  const t = e.target.closest('[data-action="open-modal"]');
  if (t) {
    e.preventDefault();
    const a = t.dataset.cardPath, n = t.dataset.cardImage;
    M(a, n);
  }
}
function L(e) {
  if (e.key === "Escape") {
    const t = document.querySelector(".shoelace-card-modal");
    t && l(t);
  }
}
function A(e) {
  e.addEventListener("click", T), document.addEventListener("keydown", L);
}
function l(e) {
  e.remove();
}
function N(e) {
  const t = e.querySelector(".shoelace-card-modal-close");
  t && t.addEventListener("click", () => l(e)), e.addEventListener("click", (a) => {
    a.target === e && l(e);
  });
}
async function M(e, t) {
  const a = document.createElement("div");
  a.className = "shoelace-card-modal", a.setAttribute("role", "dialog"), a.setAttribute("aria-modal", "true"), t && (a.style.backgroundImage = `url(${t})`);
  const n = document.createElement("div");
  n.className = "shoelace-card-modal-overlay";
  const c = document.createElement("div");
  c.className = "shoelace-card-modal-content";
  const o = document.createElement("sl-icon-button");
  o.className = "shoelace-card-modal-close", o.setAttribute("name", "x-lg"), o.setAttribute("label", "Close modal");
  const i = document.createElement("sl-spinner");
  i.className = "shoelace-card-modal-loading", c.appendChild(i), n.appendChild(o), n.appendChild(c), a.appendChild(n), document.body.appendChild(a), o.focus();
  try {
    const r = await C(e);
    if (r) {
      c.innerHTML = "";
      const s = document.createElement("div");
      s.className = "shoelace-card-modal-text", s.innerHTML = r, c.appendChild(s);
    } else
      throw new Error("Content not found");
  } catch (r) {
    c.innerHTML = "<p>Content could not be loaded.</p>", console.error("[shoelace-card] Modal content error:", r);
  }
  N(a);
}
async function H(e, t) {
  if (!t || t.length === 0) {
    e.innerHTML = '<p class="shoelace-card-empty">No cards available.</p>';
    return;
  }
  const a = v();
  t.forEach((n, c) => {
    const o = w(n, c + 1);
    a.appendChild(o);
  }), e.appendChild(a), A(e);
}
function P(e) {
  e.innerHTML = `
    <div class="shoelace-card-fallback">
      <p>Cards are loading...</p>
    </div>
  `;
}
async function x(e) {
  try {
    console.debug("[shoelace-card] Starting decoration"), await h();
    const t = p(e), a = await f(t);
    e.innerHTML = "", e.classList.add("shoelace-card-block"), await H(e, a), console.debug("[shoelace-card] Decoration completed successfully");
  } catch (t) {
    console.warn("[shoelace-card] Enhancement failed, showing fallback:", t), P(e);
  }
}
export {
  x as default
};
