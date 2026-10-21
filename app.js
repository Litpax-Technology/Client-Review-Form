'use strict';
/* =========================================================
   Litpax Customer Review — Frontend Logic
   Public review form (default) + Admin panel (#admin)
   ========================================================= */

const $ = (id) => document.getElementById(id);
const RATING_FIELDS = ['ProductRating', 'BuildRating', 'ServiceRating', 'OverallRating'];
const CATS = [
  { field: 'ProductRating', key: 'Product', short: 'Product', icon: 'battery' },
  { field: 'BuildRating',   key: 'Build',   short: 'Build',   icon: 'cog' },
  { field: 'ServiceRating', key: 'Service', short: 'Service', icon: 'headset' },
  { field: 'OverallRating', key: 'Overall', short: 'Overall', icon: 'award', wide: true }
];
const ICONS = {
  battery: '<svg viewBox="0 0 24 24"><rect x="3" y="7" width="16" height="10" rx="2"/><path d="M21 10.5v3M11.5 9l-2 3h3l-2 3"/></svg>',
  cog: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  headset: '<svg viewBox="0 0 24 24"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/><path d="M19 20a3 3 0 0 1-3 2h-3"/></svg>',
  award: '<svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/><path d="m10.2 9 1.3 1.3L14 7.8"/></svg>',
  dash: '<svg class="ico" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
  list: '<svg class="ico" viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/></svg>',
  phone: '<svg class="ico" viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  gear: '<svg class="ico" viewBox="0 0 24 24"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>',
  download: '<svg class="ico" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
  chat: '<svg class="ico" viewBox="0 0 24 24"><path d="M3.5 20.5l1.3-4A8.5 8.5 0 1 1 8 19.6z"/><path d="M9 10.5h.01M12 10.5h.01M15 10.5h.01"/></svg>',
  copy: '<svg class="ico" viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></svg>',
  send: '<svg class="ico" viewBox="0 0 24 24"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>'
};
const STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z"/></svg>';

const state = {
  cfg: null,
  ratings: { ProductRating: 0, BuildRating: 0, ServiceRating: 0, OverallRating: 0 },
  idem: null,
  submitting: false,
  taglineTimer: null,
  // admin
  token: null, name: null, role: null,
  view: 'dashboard',
  filters: { q: '', rating: '', callback: '', product: '', from: '', to: '' },
  page: 1,
  chart: null
};

/* =========================================================
   UTILITIES
   ========================================================= */
function esc(v) {
  return String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function uid() { return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10); }
const store = {
  get(k, session) { try { return JSON.parse((session ? sessionStorage : localStorage).getItem(k)); } catch (e) { return null; } },
  set(k, v, session) { try { (session ? sessionStorage : localStorage).setItem(k, JSON.stringify(v)); } catch (e) {} },
  del(k, session) { try { (session ? sessionStorage : localStorage).removeItem(k); } catch (e) {} }
};

/* JSONP with timeout */
function api(action, params = {}) {
  return new Promise((resolve, reject) => {
    if (!/^https:\/\/script\.google\.com\//.test(CONFIG.API_URL)) {
      return reject(new Error('API_URL is not set in config.js'));
    }
    const cb = 'jp_' + Math.random().toString(36).slice(2);
    const s = document.createElement('script');
    const timer = setTimeout(() => { cleanup(); reject(new Error('Network timeout')); }, CONFIG.TIMEOUT_MS || 25000);
    function cleanup() { clearTimeout(timer); try { delete window[cb]; } catch (e) { window[cb] = undefined; } s.remove(); }
    window[cb] = (res) => { cleanup(); resolve(res); };
    // action/callback/token applied last so params can never override them
    const all = Object.assign({}, params, { action, callback: cb }, state.token ? { token: state.token } : {});
    s.src = CONFIG.API_URL + '?' + Object.keys(all)
      .filter(k => all[k] !== '' && all[k] != null)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(all[k])).join('&');
    s.onerror = () => { cleanup(); reject(new Error('Network error')); };
    document.body.appendChild(s);
  });
}

let toastTimer;
function toast(msg, ok = true) {
  const t = $('toast');
  t.textContent = msg;
  t.className = 'toast show ' + (ok ? 'ok' : 'bad');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.className = 'toast'; }, 3000);
}

function loadScript(src) {
  return new Promise((res, rej) => {
    if (document.querySelector('script[data-src="' + src + '"]')) return res();
    const s = document.createElement('script');
    s.src = src; s.dataset.src = src; s.onload = res; s.onerror = rej;
    document.head.appendChild(s);
  });
}

/* =========================================================
   CONFIG HELPERS
   ========================================================= */
function cfgRows(type) { return ((state.cfg || {})[type] || []).filter(r => r.active !== false); }
function cfgText(key, fallback = '') {
  const r = cfgRows('Text').find(x => x.key === key);
  return r && r.value !== '' ? r.value : fallback;
}
function cfgMap(type) { const m = {}; cfgRows(type).forEach(r => m[r.key] = r.value); return m; }
function cfgList(type) { return cfgRows(type).map(r => r.value).filter(Boolean); }
function catLabel(c) { return cfgMap('CategoryLabel')[c.key] || c.short; }
function ratingLabel(v) { return cfgMap('RatingLabel')[String(v)] || ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][v] || ''; }

function logoHTML() {
  const url = cfgText('LogoURL');
  if (url) return `<img class="logo-img" src="${esc(url)}" alt="Litpax">`;
  return `<span class="wm" aria-hidden="true">Litpa</span><img class="lx" src="assets/logo-x.png" alt="" aria-hidden="true" onerror="this.outerHTML='<span class=&quot;lx-fallback&quot;>x</span>'"><span class="hp">Litpax</span>`;
}
function paintLogos() {
  ['heroLogo', 'footerLogo', 'loginLogo', 'wLogo'].forEach(id => {
    const el = $(id); if (!el) return;
    el.innerHTML = id === 'footerLogo' ? `<div class="logo">${logoHTML()}</div>` : logoHTML();
  });
  const side = $('sideLogo');
  if (side) side.innerHTML = `<div class="logo">${logoHTML()}</div><small>Feedback Admin</small>`;
}

/* =========================================================
   PUBLIC FORM
   ========================================================= */
async function initPublic() {
  const cached = store.get('lx_review_cfg');
  if (cached) { state.cfg = cached; renderPublic(); }
  try {
    const r = await api('config');
    if (!r.ok) throw new Error(r.message || 'Config error');
    const changed = JSON.stringify(r.config) !== JSON.stringify(state.cfg);
    state.cfg = r.config;
    store.set('lx_review_cfg', r.config);
    if (changed || !cached) renderPublic();
  } catch (e) {
    if (!cached) {
      $('reviewForm').classList.add('hidden');
      $('loadFail').classList.remove('hidden');
    }
  }
}

function renderPublic() {
  $('loadFail').classList.add('hidden');
  if ($('thankView').classList.contains('hidden')) $('reviewForm').classList.remove('hidden');
  paintLogos();

  $('heroEyebrow').textContent = cfgText('HeroEyebrow', 'Customer Feedback');
  const title = cfgText('HeroTitle', 'Your Feedback Matters');
  const cut = title.indexOf('. ');
  $('heroTitle').innerHTML = cut > 0
    ? esc(title.slice(0, cut + 1)) + ' <span class="hl">' + esc(title.slice(cut + 2)) + '</span>'
    : esc(title);
  $('heroSubtitle').textContent = cfgText('HeroSubtitle');
  $('suggestTag').textContent = cfgText('SuggestionTagline', 'Tell us how we can do better');
  $('footerLine').textContent = cfgText('FooterLine');
  $('footerSub').textContent = cfgText('FooterSub');
  $('footerCompany').textContent = '© ' + new Date().getFullYear() + ' ' + cfgText('CompanyName', 'Litpax Technology Pvt. Ltd.');

  startTaglines();
  renderRatingCards();
  renderProducts();
  restoreDraft();
  updateCharge();
  showWelcome();
}

/* =========================================================
   WELCOME / FESTIVE CARD (shown once per visit, before the form)
   ========================================================= */
const W_DEFAULTS = {
  PopupEnabled: 'Yes',
  PopupBadge: 'Happy Festive Season',
  PopupTitle: 'Thank You for Powering Our Journey',
  PopupText: "Your trust is the energy behind every battery we build. This festive season, we're grateful to have you with us, and we promise to keep earning that trust every single day.",
  PopupCTA: 'Share My Feedback',
  PopupSign: 'With gratitude, Team Litpax'
};
const W_POINTS = ['Service Beyond the Sale', 'Made in Haryana, Built for India', 'Always Here When You Need Us'];
let welcomeShown = false, wTimer = null;

function showWelcome() {
  if (welcomeShown) return;
  if (String(cfgText('PopupEnabled', W_DEFAULTS.PopupEnabled)).toLowerCase() === 'no') return;
  if (store.get('lx_welcome_seen', true)) return;
  if (!$('thankView').classList.contains('hidden')) return;
  welcomeShown = true;

  const w = (k) => cfgText(k, W_DEFAULTS[k]);
  const SPARK_ICON = '<svg viewBox="0 0 24 24"><path d="M12 1.5l2.6 7.9 7.9 2.6-7.9 2.6L12 22.5l-2.6-7.9L1.5 12l7.9-2.6z"/></svg>';
  const CHECK = '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

  $('wBadge').innerHTML = SPARK_ICON + esc(w('PopupBadge'));
  const title = w('PopupTitle').trim().split(' ');
  const cut = Math.max(1, title.length - 2);       // highlight last two words
  $('wTitle').innerHTML = esc(title.slice(0, cut).join(' ')) + ' <span class="hl">' + esc(title.slice(cut).join(' ')) + '</span>';
  $('wText').textContent = w('PopupText');
  const points = cfgList('PopupPoint').length ? cfgList('PopupPoint') : W_POINTS;
  $('wPoints').innerHTML = points.slice(0, 4).map((p, i) =>
    `<div class="w-point" style="animation-delay:${.6 + i * .1}s"><i>${CHECK}</i>${esc(p)}</div>`).join('');
  $('wCtaLabel').textContent = w('PopupCTA');
  $('wSign').textContent = w('PopupSign');
  $('wSign').classList.toggle('hidden', !w('PopupSign'));

  // rotating tagline inside the card
  const tags = cfgList('Tagline');
  const tEl = $('wTagline');
  tEl.parentElement.classList.toggle('hidden', !tags.length);
  let ti = 0; tEl.textContent = tags[0] || '';
  clearInterval(wTimer);
  if (tags.length > 1) wTimer = setInterval(() => {
    tEl.classList.add('out');
    setTimeout(() => { ti = (ti + 1) % tags.length; tEl.textContent = tags[ti]; tEl.classList.remove('out'); }, 450);
  }, 2800);

  makeSparkles();
  $('welcome').classList.remove('hidden', 'closing');
  document.body.classList.add('locked');
  setTimeout(() => $('wCta').focus({ preventScroll: true }), 800);
}

function makeSparkles() {
  const box = $('wSparkles');
  const colors = ['#EB5558', '#F4D14B', '#F7DE7E', '#FFFFFF', '#F39A55'];
  const small = window.innerWidth < 600;
  let html = '';
  for (let i = 0; i < (small ? 18 : 30); i++) {
    const size = 3 + Math.random() * 7;
    const star = Math.random() < .35;
    const c = colors[i % colors.length];
    html += `<span class="spark${star ? ' star' : ''}" style="left:${Math.random() * 100}%;width:${star ? size * 2 : size}px;height:${star ? size * 2 : size}px;` +
      `background:${c};color:${c};box-shadow:0 0 ${size * 2}px ${c};animation-duration:${7 + Math.random() * 8}s;animation-delay:${-Math.random() * 12}s"></span>`;
  }
  box.innerHTML = html;
}

function closeWelcome() {
  const el = $('welcome');
  if (el.classList.contains('hidden') || el.classList.contains('closing')) return;
  store.set('lx_welcome_seen', true, true);
  el.classList.add('closing');
  clearInterval(wTimer);
  setTimeout(() => {
    el.classList.add('hidden'); el.classList.remove('closing');
    $('wSparkles').innerHTML = '';
    document.body.classList.remove('locked');
    $('fName').focus({ preventScroll: true });
  }, 320);
}

function startTaglines() {
  const list = cfgList('Tagline');
  const el = $('rotTagline');
  clearInterval(state.taglineTimer);
  if (!list.length) { el.parentElement.classList.add('hidden'); return; }
  el.parentElement.classList.remove('hidden');
  let i = 0;
  el.textContent = list[0];
  if (list.length < 2) return;
  state.taglineTimer = setInterval(() => {
    el.classList.add('out');
    setTimeout(() => { i = (i + 1) % list.length; el.textContent = list[i]; el.classList.remove('out'); }, 450);
  }, 3200);
}

function renderRatingCards() {
  const tags = cfgMap('CategoryTagline');
  $('ratingGrid').innerHTML = CATS.map(c => `
    <div class="rate-card${c.wide ? ' wide' : ''}" data-field="${c.field}">
      <div class="rate-head">
        <span class="rate-icon">${ICONS[c.icon]}</span>
        <div><h3>${esc(catLabel(c))} <span style="color:var(--red)">*</span></h3><p>${esc(tags[c.key] || '')}</p></div>
      </div>
      <div class="stars" role="radiogroup" aria-label="${esc(catLabel(c))}">
        ${[1, 2, 3, 4, 5].map(v => `<button type="button" class="star" data-v="${v}" role="radio" aria-checked="false" aria-label="${v} star${v > 1 ? 's' : ''}, ${esc(ratingLabel(v))}">${STAR}</button>`).join('')}
      </div>
      <div class="rate-label">Tap to rate</div>
    </div>`).join('');

  document.querySelectorAll('.rate-card').forEach(card => {
    const field = card.dataset.field;
    const stars = [...card.querySelectorAll('.star')];
    stars.forEach(btn => {
      btn.addEventListener('click', () => setRating(field, Number(btn.dataset.v), true));
      btn.addEventListener('mouseenter', () => previewStars(card, Number(btn.dataset.v)));
      btn.addEventListener('keydown', (e) => {
        const cur = state.ratings[field] || 0;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); setRating(field, Math.min(5, cur + 1), true); card.querySelectorAll('.star')[Math.min(5, cur + 1) - 1].focus(); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); setRating(field, Math.max(1, cur - 1), true); card.querySelectorAll('.star')[Math.max(1, cur - 1) - 1].focus(); }
      });
    });
    card.querySelector('.stars').addEventListener('mouseleave', () => previewStars(card, 0));
    paintCard(card, state.ratings[field] || 0, false);
  });
}

function previewStars(card, v) {
  card.querySelectorAll('.star').forEach((s, i) => s.classList.toggle('preview', v > 0 && i < v && !s.classList.contains('on')));
}

function setRating(field, v, animate) {
  state.ratings[field] = v;
  const card = document.querySelector(`.rate-card[data-field="${field}"]`);
  if (card) paintCard(card, v, animate);
  const err = document.querySelector('[data-for="ratings"]');
  if (err && RATING_FIELDS.every(f => state.ratings[f])) err.textContent = '';
  saveDraft();
  updateCharge();
}

function paintCard(card, v, animate) {
  card.classList.toggle('rated', v > 0);
  card.classList.toggle('low', v > 0 && v <= 2);
  card.classList.remove('invalid');
  card.querySelectorAll('.star').forEach((s, i) => {
    const on = i < v;
    s.classList.toggle('on', on);
    s.classList.remove('preview');
    s.setAttribute('aria-checked', String(i + 1 === v));
    s.tabIndex = (v ? i + 1 === v : i === 0) ? 0 : -1;
    if (animate && on) { s.classList.remove('pop'); void s.offsetWidth; s.style.animationDelay = (i * 40) + 'ms'; s.classList.add('pop'); }
  });
  card.querySelector('.rate-label').textContent = v ? `${ratingLabel(v)} · ${v}/5` : 'Tap to rate';
}

function renderProducts() {
  const list = cfgList('Product');
  const field = $('productField');
  if (!list.length) { field.classList.add('hidden'); return; }
  const cur = $('fProduct').value;
  $('fProduct').innerHTML = '<option value="">Select product</option>' + list.map(p => `<option>${esc(p)}</option>`).join('');
  if (list.includes(cur)) $('fProduct').value = cur;
  field.classList.remove('hidden');
}

/* ---- Charge meter (form completion) ---- */
function updateCharge() {
  const name = $('fName').value.trim(), phone = $('fPhone').value;
  let done = 0;
  if (name.length >= 2) done++;
  if (/^[6-9]\d{9}$/.test(phone)) done++;
  RATING_FIELDS.forEach(f => { if (state.ratings[f]) done++; });
  const pct = Math.round(done / 6 * 100);
  $('chargeFill').style.width = pct + '%';
  $('chargeFill').classList.toggle('full', pct === 100);
  $('chargePct').textContent = pct + '%';
}

/* ---- Draft keep (network resilience) ---- */
function collect() {
  return {
    CustomerName: $('fName').value.trim(),
    Phone: $('fPhone').value.trim(),
    City: $('fCity').value.trim(),
    Product: $('fProduct').value,
    Suggestion: $('fSuggestion').value.trim(),
    ...state.ratings
  };
}
function saveDraft() { store.set('lx_review_draft', { rec: collect(), idem: state.idem }); }
function restoreDraft() {
  const d = store.get('lx_review_draft');
  if (!d || !d.rec) return;
  const r = d.rec;
  if (!$('fName').value) $('fName').value = r.CustomerName || '';
  if (!$('fPhone').value) $('fPhone').value = r.Phone || '';
  if (!$('fCity').value) $('fCity').value = r.City || '';
  if (!$('fSuggestion').value) $('fSuggestion').value = r.Suggestion || '';
  if (r.Product && [...$('fProduct').options].some(o => o.value === r.Product)) $('fProduct').value = r.Product;
  RATING_FIELDS.forEach(f => { if (r[f] && !state.ratings[f]) setRating(f, Number(r[f]), false); });
  if (d.idem) state.idem = d.idem;
  $('sugCount').textContent = $('fSuggestion').value.length;
}

/* ---- Client validation (mirrors server) ---- */
function setFieldErr(id, msg) {
  const el = document.querySelector(`[data-for="${id}"]`);
  if (el) el.textContent = msg || '';
  const input = $(id);
  if (input) { input.classList.toggle('invalid', !!msg); if (!msg) input.classList.remove('invalid'); }
}
function validateForm(rec) {
  let first = null;
  const nameOk = rec.CustomerName.length >= 2 && rec.CustomerName.length <= 60 && /^[A-Za-zऀ-ॿ .'-]+$/.test(rec.CustomerName);
  setFieldErr('fName', nameOk ? '' : (rec.CustomerName ? 'Please use letters and spaces only' : 'Please enter your name'));
  if (!nameOk) first = first || $('fName');

  const phoneOk = /^[6-9]\d{9}$/.test(rec.Phone);
  setFieldErr('fPhone', phoneOk ? '' : 'Please enter a valid 10-digit mobile number');
  if (!phoneOk) first = first || $('fPhone');

  const missing = RATING_FIELDS.filter(f => !rec[f]);
  document.querySelector('[data-for="ratings"]').textContent = missing.length ? 'Please rate all four categories' : '';
  missing.forEach(f => {
    const c = document.querySelector(`.rate-card[data-field="${f}"]`);
    c.classList.remove('invalid'); void c.offsetWidth; c.classList.add('invalid');
  });
  if (missing.length) first = first || document.querySelector(`.rate-card[data-field="${missing[0]}"]`);
  return first;
}

/* ---- Submit (double-submit guard + idempotency + draft keep) ---- */
async function submitReview(e) {
  e.preventDefault();
  if (state.submitting) return;
  $('formErr').classList.add('hidden');
  const rec = collect();
  const firstBad = validateForm(rec);
  if (firstBad) { firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' }); if (firstBad.focus && firstBad.tagName === 'INPUT') firstBad.focus({ preventScroll: true }); return; }

  if (!state.idem) state.idem = uid();
  saveDraft();
  state.submitting = true;
  const btn = $('submitBtn');
  btn.disabled = true; btn.classList.add('loading');
  btn.querySelector('.btn-label').textContent = 'Submitting...';

  try {
    const src = new URLSearchParams(location.search).get('src') || 'Direct';
    const r = await api('submit', { record: JSON.stringify(rec), idem: state.idem, src, website: $('fWebsite').value });
    if (!r.ok) throw Object.assign(new Error(r.message || 'Could not submit. Please try again.'), { server: true });
    store.del('lx_review_draft');
    showThankYou(rec, r);
  } catch (err) {
    const msg = err.server ? err.message : "We couldn't reach our server. Your answers are saved on this device. Please tap Submit again.";
    $('formErr').textContent = msg;
    $('formErr').classList.remove('hidden');
    $('formErr').scrollIntoView({ behavior: 'smooth', block: 'center' });
  } finally {
    state.submitting = false;
    btn.disabled = false; btn.classList.remove('loading');
    btn.querySelector('.btn-label').textContent = 'Submit Feedback';
  }
}

function showThankYou(rec, r) {
  $('reviewForm').classList.add('hidden');
  const tv = $('thankView');
  tv.classList.remove('hidden');
  // restart animations
  tv.querySelectorAll('.thank-battery, .tb-fill, .tb-check').forEach(el => { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''; });

  const first = rec.CustomerName.split(' ')[0];
  const nice = first ? first.charAt(0).toUpperCase() + first.slice(1).toLowerCase() : '';
  $('thankName').textContent = nice ? `Thank You, ${nice}!` : 'Thank You!';
  $('thankTitle').textContent = cfgText('ThankYouTitle', 'You Just Charged Us Up!');
  $('thankText').textContent = cfgText('ThankYouText', 'Your feedback has been received.');
  $('thankWish').textContent = cfgText('ThankYouWish', 'Wishing you and your family a bright, joyful and prosperous festive season!');

  const avg = r.avg || RATING_FIELDS.reduce((s, f) => s + rec[f], 0) / 4;
  const starRow = (v) => [1, 2, 3, 4, 5].map(i => STAR.replace('<svg', `<svg class="${i <= Math.floor(v + .25) ? 'on' : ''}"`)).join('');
  $('thankAvg').innerHTML = `<b>${Number(avg).toFixed(1)}</b><div><div class="avg-stars">${starRow(avg)}</div><small>Your average rating</small></div>`;
  $('thankSummary').innerHTML = CATS.map((c, i) => `
    <div class="ts-item" style="animation-delay:${1.5 + i * .08}s"><div class="ts-stars">${starRow(rec[c.field])}</div><b>${rec[c.field]}<small>/5</small></b><span>${esc(catLabel(c))}</span></div>`).join('');

  // sparkles in the dark header + confetti burst across the page
  const colors = ['#EB5558', '#F4D14B', '#F7DE7E', '#FFFFFF', '#F39A55'];
  $('tSparks').innerHTML = Array.from({ length: 16 }, (_, i) => {
    const s = 3 + Math.random() * 5, c = colors[i % colors.length];
    return `<span class="spark" style="left:${Math.random() * 100}%;width:${s}px;height:${s}px;background:${c};box-shadow:0 0 ${s * 2}px ${c};animation-duration:${5 + Math.random() * 5}s;animation-delay:${-Math.random() * 8}s"></span>`;
  }).join('');
  if (!(rec.OverallRating <= 2)) burstConfetti();
  $('thankRef').textContent = r.id || '';

  const low = r.callback || rec.OverallRating <= 2;
  $('thankLow').textContent = cfgText('LowRatingText', 'Our team will contact you shortly.');
  $('thankLow').classList.toggle('hidden', !low);

  const gUrl = cfgText('GoogleReviewURL');
  const showG = !low && rec.OverallRating >= 4 && /^https:\/\//.test(gUrl);
  $('thankGoogle').classList.toggle('hidden', !showG);
  if (showG) { $('googleBtn').href = gUrl; $('googleText').textContent = cfgText('GoogleReviewText', 'Share your experience on Google.'); }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function burstConfetti() {
  const box = $('confetti');
  const colors = ['#EB5558', '#F4D14B', '#F39A55', '#FFFFFF', '#141418'];
  const n = window.innerWidth < 600 ? 60 : 110;
  box.innerHTML = Array.from({ length: n }, (_, i) => {
    const w = 6 + Math.random() * 6, round = Math.random() < .3;
    return `<i style="left:${Math.random() * 100}%;width:${w}px;height:${round ? w : w * 1.6}px;${round ? 'border-radius:50%;' : ''}` +
      `background:${colors[i % colors.length]};--dx:${(Math.random() - .5) * 240}px;--rot:${(Math.random() - .5) * 1080}deg;` +
      `animation-duration:${2.4 + Math.random() * 2}s;animation-delay:${Math.random() * .6}s"></i>`;
  }).join('');
  setTimeout(() => { box.innerHTML = ''; }, 5200);
}

function resetForm() {
  $('reviewForm').reset();
  RATING_FIELDS.forEach(f => state.ratings[f] = 0);
  state.idem = null;
  document.querySelectorAll('.rate-card').forEach(c => paintCard(c, 0, false));
  document.querySelectorAll('.input').forEach(i => i.classList.remove('valid', 'invalid'));
  $('sugCount').textContent = '0';
  updateCharge();
  $('thankView').classList.add('hidden');
  $('reviewForm').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function wirePublic() {
  $('reviewForm').addEventListener('submit', submitReview);
  $('fPhone').addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 10 && /^(91|0)/.test(v)) v = v.replace(/^(91|0)/, '');
    e.target.value = v.slice(0, 10);
    e.target.classList.toggle('valid', /^[6-9]\d{9}$/.test(e.target.value));
    if (/^[6-9]\d{9}$/.test(e.target.value)) setFieldErr('fPhone', '');
  });
  $('fName').addEventListener('input', (e) => {
    const ok = e.target.value.trim().length >= 2;
    e.target.classList.toggle('valid', ok);
    if (ok) setFieldErr('fName', '');
  });
  ['fName', 'fPhone', 'fCity', 'fProduct', 'fSuggestion'].forEach(id => {
    $(id).addEventListener('input', () => { saveDraft(); updateCharge(); });
  });
  $('fSuggestion').addEventListener('input', (e) => { $('sugCount').textContent = e.target.value.length; });
  $('againBtn').addEventListener('click', resetForm);
  $('wClose').addEventListener('click', closeWelcome);
  $('wCta').addEventListener('click', closeWelcome);
  $('welcome').addEventListener('click', (e) => { if (e.target === $('welcome')) closeWelcome(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeWelcome(); });
  $('retryLoad').addEventListener('click', () => { $('loadFail').classList.add('hidden'); initPublic(); });
}

/* =========================================================
   ADMIN
   ========================================================= */
async function adminApi(action, params) {
  const r = await api(action, params);
  if (!r.ok && r.error === 'AUTH') { toast('Session expired. Please log in again.', false); logout(); throw new Error('AUTH'); }
  return r;
}

async function initAdmin() {
  if (!state.cfg) {
    state.cfg = store.get('lx_review_cfg');
    api('config').then(r => { if (r.ok) { state.cfg = r.config; store.set('lx_review_cfg', r.config); paintLogos(); } }).catch(() => {});
  }
  paintLogos();
  const sess = store.get('lx_review_session', true);
  if (sess && sess.token) {
    Object.assign(state, sess);
    showAdminApp();
  } else {
    $('loginView').classList.remove('hidden');
    $('adminApp').classList.add('hidden');
    setTimeout(() => $('pin').focus(), 50);
  }
}

async function doLogin() {
  const pin = $('pin').value.trim();
  if (!/^\d{4,8}$/.test(pin)) { $('loginErr').textContent = 'Enter your 4–8 digit PIN'; return; }
  const btn = $('loginBtn');
  btn.disabled = true; btn.textContent = 'Checking...'; $('loginErr').textContent = '';
  try {
    const r = await api('login', { pin });
    if (!r.ok) { $('loginErr').textContent = r.message || 'Login failed'; $('pin').select(); return; }
    state.token = r.token; state.name = r.name; state.role = r.role;
    store.set('lx_review_session', { token: r.token, name: r.name, role: r.role }, true);
    $('pin').value = '';
    showAdminApp();
  } catch (e) { $('loginErr').textContent = e.message; }
  finally { btn.disabled = false; btn.textContent = 'Log In'; }
}

function logout() {
  state.token = state.name = state.role = null;
  store.del('lx_review_session', true);
  $('adminApp').classList.add('hidden');
  $('loginView').classList.remove('hidden');
}

function showAdminApp() {
  $('loginView').classList.add('hidden');
  $('adminApp').classList.remove('hidden');
  $('who').innerHTML = `${esc(state.name)}<span>${esc(state.role)}</span>`;
  buildNav();
  go(state.view || 'dashboard');
}

function buildNav(pending) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: ICONS.dash },
    { id: 'reviews', label: 'All Reviews', icon: ICONS.list },
    { id: 'callbacks', label: 'Callbacks', icon: ICONS.phone, badge: pending },
    { id: 'whatsapp', label: 'Send on WhatsApp', icon: ICONS.chat },
  ];
  if (state.role === 'Admin') items.push({ id: 'settings', label: 'Settings', icon: ICONS.gear });
  $('nav').innerHTML = items.map(i => `
    <button class="nav-item${state.view === i.id ? ' active' : ''}" data-id="${i.id}">
      ${i.icon}<span>${i.label}</span>${i.badge ? `<span class="nav-badge">${i.badge}</span>` : ''}
    </button>`).join('');
  $('nav').querySelectorAll('.nav-item').forEach(b => b.onclick = () => go(b.dataset.id));
}

function go(view) {
  if (view === 'settings' && state.role !== 'Admin') view = 'dashboard';
  state.view = view;
  store.set('lx_review_session', { token: state.token, name: state.name, role: state.role, view }, true);
  document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.id === view));
  const page = $('page');
  page.style.animation = 'none'; void page.offsetWidth; page.style.animation = '';
  if (view === 'dashboard') return renderDashboard();
  if (view === 'reviews') { state.filters.callback = ''; state.page = 1; return renderReviews('All Reviews'); }
  if (view === 'callbacks') { state.filters.callback = 'Pending'; state.page = 1; return renderReviews('Callbacks'); }
  if (view === 'whatsapp') return renderWhatsApp();
  if (view === 'settings') return renderSettings();
}

/* ---------- Send feedback request on WhatsApp ---------- */
const WA_DEFAULTS = [
  { key: 'Festive Thank You', value: "✨ *Happy Festive Season from Litpax!* ✨\n\nDear {Name},\n\nThank you for trusting Litpax. Your trust is the energy behind every battery we build. 🔋\n\nWe'd love to hear about your experience. It takes *less than a minute*:\n\n👉 {Link}\n\nYour feedback helps us serve you better.\n\n_We don't sell products, we sell service._\n*Team Litpax* ⚡" },
  { key: 'After Delivery', value: "Hello {Name} 👋\n\nYour Litpax battery has been delivered. Thank you for choosing us! 🔋\n\nHow was your experience with our product and delivery? Please rate us here. It takes *just 30 seconds*:\n\n👉 {Link}\n\n⭐⭐⭐⭐⭐\n\nFor any help, just reply to this message.\n\n_Service Beyond the Sale_\n*Team Litpax* ⚡" },
  { key: 'After Service', value: "Hello {Name},\n\nYour Litpax service request has been completed. ✅\n\nWas our team helpful? Your honest rating helps us improve every day:\n\n👉 {Link}\n\nIf anything is still not right, reply here and our service team will call you back.\n\n_Litpax: Service First. Always._\n*Team Litpax* ⚡" }
];
function waTemplates() { const t = cfgRows('WaTemplate').filter(r => r.key && r.value); return t.length ? t : WA_DEFAULTS; }
function formUrl() { return location.origin + location.pathname.replace(/index\.html$/, ''); }
function srcSlug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 30) || 'whatsapp'; }
function waFormat(text) {
  return esc(text)
    .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>')
    .replace(/(^|[\s>])\*([^*\n]+)\*(?=[\s<.,!?:;)]|$)/g, '$1<b>$2</b>')
    .replace(/(^|[\s>])_([^_\n]+)_(?=[\s<.,!?:;)]|$)/g, '$1<i>$2</i>')
    .replace(/(^|[\s>])~([^~\n]+)~(?=[\s<.,!?:;)]|$)/g, '$1<s>$2</s>')
    .replace(/\n/g, '<br>');
}

function renderWhatsApp() {
  $('pageTitle').textContent = 'Send on WhatsApp';
  const tpls = waTemplates();
  const host = location.host || 'litpax';
  $('page').innerHTML = `
    <div class="wa-layout">
      <div class="card">
        <h3>Feedback Request</h3>
        <div class="wa-form">
          <div class="set-field"><label for="waName">Customer name</label>
            <input class="input" id="waName" maxlength="40" placeholder="e.g. Rajesh"></div>
          <div class="set-field"><label for="waPhone">Mobile number <span class="opt">Blank = choose contact in WhatsApp</span></label>
            <div class="phone-wrap"><span class="phone-prefix">+91</span>
            <input class="input" id="waPhone" type="tel" inputmode="numeric" maxlength="10" placeholder="10-digit mobile"></div></div>
          <div class="set-field"><label>Template</label>
            <div class="wa-chips" id="waChips">${tpls.map((t, i) => `<button type="button" class="wa-chip${i === 0 ? ' on' : ''}" data-i="${i}">${esc(t.key)}</button>`).join('')}</div>
          </div>
          <div class="set-field"><label for="waMsg">Message <span class="opt">You can edit before sending</span></label>
            <textarea class="input textarea wa-msg" id="waMsg" maxlength="1500"></textarea></div>
          <div class="wa-actions">
            <button class="btn btn-wa" id="waOpen">${ICONS.send}<span>Open in WhatsApp</span></button>
            <button class="btn btn-ghost" id="waCopy">${ICONS.copy}<span>Copy Message</span></button>
          </div>
          <p class="wa-tip">Tip: send from the company WhatsApp number your customers already know. Saved contacts see the link preview card; new numbers may see a plain link until they reply once.</p>
        </div>
      </div>

      <div class="wa-phone">
        <div class="wa-top"><span class="wa-avatar">L</span><div><b>Litpax Technology</b><small>online</small></div></div>
        <div class="wa-chat">
          <div class="wa-bubble">
            <a class="wa-preview" href="${esc(formUrl())}" target="_blank" rel="noopener">
              <img src="assets/og-image.jpg" alt="">
              <div><b>We Don't Just Sell Batteries. We Deliver Trust.</b>
              <span>Share your Litpax experience in 30 seconds. Your feedback powers our service.</span>
              <small>${esc(host)}</small></div>
            </a>
            <div class="wa-text" id="waPreview"></div>
            <span class="wa-time">${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} ✓✓</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card" id="waSentCard" style="margin-top:14px"></div>`;

  let cur = 0;
  const build = () => {
    const t = tpls[cur];
    const name = $('waName').value.trim();
    const nice = name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Customer';
    const link = formUrl() + '?src=' + srcSlug(t.key);
    $('waMsg').value = t.value.replace(/\{Name\}/gi, nice).replace(/\{Link\}/gi, link);
    paint();
  };
  const paint = () => { $('waPreview').innerHTML = waFormat($('waMsg').value); };

  $('waChips').querySelectorAll('.wa-chip').forEach(b => b.onclick = () => {
    cur = Number(b.dataset.i);
    $('waChips').querySelectorAll('.wa-chip').forEach(x => x.classList.toggle('on', x === b));
    build();
  });
  $('waName').addEventListener('input', build);
  $('waPhone').addEventListener('input', e => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10); });
  $('waMsg').addEventListener('input', paint);

  $('waOpen').onclick = () => {
    const phone = $('waPhone').value.trim();
    if (phone && !/^[6-9]\d{9}$/.test(phone)) { $('waPhone').classList.add('invalid'); return toast('Enter a valid 10-digit mobile number', false); }
    $('waPhone').classList.remove('invalid');
    const msg = $('waMsg').value.trim();
    if (!msg) return toast('Message is empty', false);
    window.open('https://wa.me/' + (phone ? '91' + phone : '') + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    const entry = { name: $('waName').value.trim() || '—', phone: phone || '—', tpl: tpls[cur].key, at: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) };
    const sent = store.get('lx_wa_sent', true) || [];
    sent.unshift(entry); store.set('lx_wa_sent', sent.slice(0, 30), true);
    paintSent();
    adminApi('logWa', { name: entry.name, phone: entry.phone, template: entry.tpl }).catch(() => {});
    $('waName').value = ''; $('waPhone').value = ''; build(); $('waName').focus();
  };
  $('waCopy').onclick = async () => {
    try { await navigator.clipboard.writeText($('waMsg').value); }
    catch (e) { $('waMsg').select(); document.execCommand('copy'); }
    toast('Message copied');
  };

  function paintSent() {
    const sent = store.get('lx_wa_sent', true) || [];
    $('waSentCard').innerHTML = `<div class="card-head"><h3>Sent in this session</h3><span class="muted" style="font-size:13px">${sent.length} request${sent.length === 1 ? '' : 's'}</span></div>` +
      (sent.length ? `<div class="wa-sent">${sent.map(s => `<div><b>${esc(s.name)}</b><span>${esc(s.phone)}</span><span>${esc(s.tpl)}</span><small>${esc(s.at)}</small></div>`).join('')}</div>`
        : '<p class="muted" style="margin:0;font-size:13.5px">Requests you open in WhatsApp will be listed here so nobody gets messaged twice.</p>');
  }
  build(); paintSent();
}

/* ---------- Dashboard ---------- */
async function renderDashboard() {
  $('pageTitle').textContent = 'Dashboard';
  $('page').innerHTML = '<div class="kpis">' + '<div class="skeleton tall"></div>'.repeat(4) + '</div><div class="skeleton tall"></div><div class="skeleton tall"></div>';
  let s;
  try { s = await adminApi('stats'); } catch (e) { if (e.message !== 'AUTH') pageError(e.message); return; }
  if (!s.ok) return pageError(s.message);
  buildNav(s.pending);

  const rp = (v) => v >= 4 ? '' : v > 0 && v < 3 ? ' low' : ' mid';
  $('page').innerHTML = `
    <div class="kpis">
      <div class="kpi"><div class="kpi-label">Total Reviews</div><div class="kpi-val">${s.total}</div><div class="kpi-sub">All time</div></div>
      <div class="kpi"><div class="kpi-label">Overall Rating</div><div class="kpi-val">${fmt(s.avg.OverallRating)}<small>★</small></div><div class="kpi-sub">Average out of 5</div></div>
      <div class="kpi"><div class="kpi-label">Happy Customers</div><div class="kpi-val">${s.satisfiedPct}%</div><div class="kpi-sub">Rated 4★ or 5★ overall</div></div>
      <div class="kpi${s.pending ? ' alert' : ''}"><div class="kpi-label">Pending Callbacks</div><div class="kpi-val">${s.pending}</div><div class="kpi-sub">Low ratings to call back</div></div>
    </div>
    <div class="grid-2">
      <div class="card">
        <h3>Category Averages</h3>
        ${CATS.map(c => barRow(catLabel(c), s.avg[c.field], 5, s.avg[c.field] < 3 ? 'red' : '')).join('')}
      </div>
      <div class="card">
        <h3>Overall Rating Split</h3>
        ${[5, 4, 3, 2, 1].map(v => barRow(v + ' ★ ' + ratingLabel(v), s.dist[v - 1], Math.max(1, ...s.dist), v <= 2 ? 'red' : v === 3 ? 'ink' : '', true)).join('')}
      </div>
    </div>
    <div class="grid-2">
      <div class="card"><h3>Monthly Trend</h3><div class="chart-box"><canvas id="trendChart"></canvas></div></div>
      <div class="card">
        <div class="card-head"><h3>Latest Reviews</h3><button class="btn btn-ghost btn-sm" id="seeAll">View all</button></div>
        <div class="mini-list">
          ${s.latest.length ? s.latest.map(r => `
            <div class="mini-item" data-id="${esc(r.ReviewID)}">
              <div class="mini-score${Number(r.OverallRating) <= 2 ? ' low' : ''}">${esc(r.OverallRating)}★</div>
              <div style="min-width:0"><div class="mini-name">${esc(r.CustomerName)} <span class="muted" style="font-weight:400;font-size:12px">· ${esc(r.Timestamp)}</span></div>
              <div class="mini-text">${esc(r.Suggestion || 'No suggestion shared')}</div></div>
            </div>`).join('') : '<div class="empty"><b>No reviews yet</b>Share the form link to start collecting feedback.</div>'}
        </div>
      </div>
    </div>
    ${s.byProduct.length ? `
    <div class="card">
      <h3>Product-wise Average</h3>
      ${s.byProduct.map(p => barRow(p.product + ` (${p.count})`, p.avg, 5, p.avg < 3 ? 'red' : '')).join('')}
    </div>` : ''}`;

  requestAnimationFrame(() => document.querySelectorAll('.bar-fill').forEach(b => b.style.width = b.dataset.w));
  $('seeAll').onclick = () => go('reviews');
  const latestMap = {}; s.latest.forEach(r => latestMap[r.ReviewID] = r);
  document.querySelectorAll('.mini-item').forEach(el => el.onclick = () => openReview(latestMap[el.dataset.id]));
  drawTrend(s.trend);
}

function barRow(label, val, max, cls, isCount) {
  const w = max ? Math.min(100, (Number(val) || 0) / max * 100) : 0;
  return `<div class="bar-row"><span class="lbl" title="${esc(label)}">${esc(label)}</span>
    <div class="bar-track"><div class="bar-fill ${cls || ''}" data-w="${w}%"></div></div>
    <span class="val">${isCount ? val : fmt(val)}</span></div>`;
}
function fmt(n) { return (Number(n) || 0).toFixed(1); }

async function drawTrend(trend) {
  try { await loadScript(CONFIG.CHART_JS); } catch (e) { return; }
  const el = $('trendChart'); if (!el || !window.Chart) return;
  if (state.chart) state.chart.destroy();
  Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
  Chart.defaults.color = '#6B6B76';
  state.chart = new Chart(el, {
    data: {
      labels: trend.map(t => t.label),
      datasets: [
        { type: 'bar', label: 'Reviews', data: trend.map(t => t.count), backgroundColor: '#F1EFEA', borderRadius: 6, yAxisID: 'y1', order: 2 },
        { type: 'line', label: 'Avg Overall', data: trend.map(t => t.avg), borderColor: '#EB5558', backgroundColor: '#EB5558', tension: .35, pointRadius: 4, pointBackgroundColor: '#fff', pointBorderWidth: 2, spanGaps: true, yAxisID: 'y', order: 1 }
      ]
    },
    options: {
      maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
      plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, boxHeight: 10, usePointStyle: true } } },
      scales: {
        y:  { min: 0, max: 5, ticks: { stepSize: 1 }, grid: { color: '#F1EFEA' }, title: { display: true, text: 'Avg ★' } },
        y1: { position: 'right', beginAtZero: true, grid: { display: false }, ticks: { precision: 0 }, title: { display: true, text: 'Reviews' } },
        x:  { grid: { display: false } }
      }
    }
  });
}

function pageError(msg) {
  $('page').innerHTML = `<div class="card empty"><b>Couldn't load data</b>${esc(msg || 'Please try again.')}<br><br><button class="btn btn-dark" id="retryPage">Try Again</button></div>`;
  $('retryPage').onclick = () => go(state.view);
}

/* ---------- Reviews / Callbacks ---------- */
let filterTimer;
function renderReviews(title) {
  $('pageTitle').textContent = title;
  const f = state.filters;
  const products = cfgList('Product');
  $('page').innerHTML = `
    <div class="filters">
      <input class="input search" id="flQ" placeholder="Search name, phone, city, ID, suggestion..." value="${esc(f.q)}">
      <select class="input select" id="flRating">
        <option value="">All ratings</option>
        ${[5, 4, 3, 2, 1].map(v => `<option value="${v}" ${String(f.rating) === String(v) ? 'selected' : ''}>${v} ★ Overall</option>`).join('')}
      </select>
      <select class="input select" id="flCallback">
        <option value="">All callbacks</option>
        <option value="Pending" ${f.callback === 'Pending' ? 'selected' : ''}>Callback pending</option>
        <option value="Done" ${f.callback === 'Done' ? 'selected' : ''}>Callback done</option>
      </select>
      ${products.length ? `<select class="input select" id="flProduct"><option value="">All products</option>${products.map(p => `<option ${f.product === p ? 'selected' : ''}>${esc(p)}</option>`).join('')}</select>` : ''}
      <input class="input" type="date" id="flFrom" value="${esc(f.from)}" title="From date">
      <input class="input" type="date" id="flTo" value="${esc(f.to)}" title="To date">
      <button class="btn btn-ghost" id="exportBtn">${ICONS.download}<span>Export CSV</span></button>
    </div>
    <div id="tableArea"></div>`;

  const apply = () => {
    f.q = $('flQ').value.trim(); f.rating = $('flRating').value; f.callback = $('flCallback').value;
    f.product = $('flProduct') ? $('flProduct').value : ''; f.from = $('flFrom').value; f.to = $('flTo').value;
    state.page = 1; loadTable();
  };
  $('flQ').addEventListener('input', () => { clearTimeout(filterTimer); filterTimer = setTimeout(apply, 350); });
  ['flRating', 'flCallback', 'flProduct', 'flFrom', 'flTo'].forEach(id => $(id) && $(id).addEventListener('change', apply));
  $('exportBtn').onclick = exportCSV;
  loadTable();
}

function filterParams() {
  const f = state.filters;
  return { q: f.q, rating: f.rating, cbStatus: f.callback, product: f.product, from: f.from, to: f.to };
}

async function loadTable() {
  const area = $('tableArea'); if (!area) return;
  area.innerHTML = '<div class="skeleton"></div>'.repeat(7);
  let r;
  try { r = await adminApi('list', Object.assign({ page: state.page }, filterParams())); }
  catch (e) { if (e.message !== 'AUTH') area.innerHTML = `<div class="card empty"><b>Network error</b>${esc(e.message)}</div>`; return; }
  if (!r.ok) { area.innerHTML = `<div class="card empty"><b>Error</b>${esc(r.message)}</div>`; return; }

  const pages = Math.max(1, Math.ceil(r.total / r.pageSize));
  const pill = (v) => `<span class="r-pill${v >= 4 ? '' : v <= 2 ? ' low' : ' mid'}">${esc(v)}</span>`;
  const badge = (row) => row.CallbackStatus === 'Pending' ? '<span class="badge pending">Pending</span>'
    : row.CallbackStatus === 'Done' ? '<span class="badge done">Done</span>' : '<span class="badge none">—</span>';

  area.innerHTML = r.rows.length ? `
    <div class="table-wrap">
      <table class="tbl">
        <thead><tr>
          <th>Date</th><th>ID</th><th>Customer</th><th>Phone</th><th>City</th>
          ${CATS.map(c => `<th class="num">${esc(c.short)}</th>`).join('')}<th class="num">Avg</th>
          <th>Suggestion</th><th>Callback</th>
        </tr></thead>
        <tbody>
          ${r.rows.map((row, i) => `
            <tr data-i="${i}" style="animation-delay:${i * 15}ms">
              <td class="nowrap">${esc(row.Timestamp)}</td>
              <td class="nowrap"><b>${esc(row.ReviewID)}</b></td>
              <td class="nowrap">${esc(row.CustomerName)}</td>
              <td class="nowrap">${esc(row.Phone)}</td>
              <td>${esc(row.City)}</td>
              ${CATS.map(c => `<td class="num">${pill(row[c.field])}</td>`).join('')}
              <td class="num"><b>${fmt(row.AvgRating)}</b></td>
              <td class="clip" title="${esc(row.Suggestion)}">${esc(row.Suggestion || '—')}</td>
              <td>${badge(row)}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div class="pager">
      <span>${r.total} review${r.total === 1 ? '' : 's'} · Page ${r.page} of ${pages}</span>
      <div class="pager-btns">
        <button class="btn btn-ghost btn-sm" id="prevPg" ${r.page <= 1 ? 'disabled' : ''}>← Prev</button>
        <button class="btn btn-ghost btn-sm" id="nextPg" ${r.page >= pages ? 'disabled' : ''}>Next →</button>
      </div>
    </div>`
    : `<div class="card empty"><b>${state.filters.callback === 'Pending' ? 'No pending callbacks' : 'No reviews found'}</b>${state.filters.callback === 'Pending' ? 'Every unhappy customer has been called back. Great work!' : 'Try changing the filters.'}</div>`;

  area.querySelectorAll('tbody tr').forEach(tr => tr.onclick = () => openReview(r.rows[Number(tr.dataset.i)]));
  if ($('prevPg')) $('prevPg').onclick = () => { state.page--; loadTable(); };
  if ($('nextPg')) $('nextPg').onclick = () => { state.page++; loadTable(); };
}

async function exportCSV() {
  const btn = $('exportBtn'); btn.disabled = true;
  try {
    const r = await adminApi('export', filterParams());
    if (!r.ok) return toast(r.message || 'Export failed', false);
    if (!r.rows.length) return toast('Nothing to export', false);
    const head = r.headers;
    const csv = '﻿' + [head.join(',')].concat(r.rows.map(row =>
      head.map(h => `"${String(row[h] == null ? '' : row[h]).replace(/"/g, '""')}"`).join(','))).join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    a.download = 'Litpax_Reviews_' + new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(a); a.click(); a.remove();
    toast(`Exported ${r.rows.length} reviews`);
  } catch (e) { if (e.message !== 'AUTH') toast(e.message, false); }
  finally { btn.disabled = false; }
}

/* ---------- Review detail modal ---------- */
function openReview(row) {
  if (!row) return;
  const status = row.CallbackStatus || '';
  $('modalBody').innerHTML = `
    <h3>${esc(row.CustomerName)}</h3>
    <p class="m-sub">${esc(row.ReviewID)} · ${esc(row.Timestamp)}</p>
    <div class="m-grid">${CATS.map(c => `<div><b>${esc(row[c.field])}★</b><span>${esc(catLabel(c))}</span></div>`).join('')}</div>
    <dl class="m-info">
      <dt>Phone</dt><dd><a href="tel:${esc(row.Phone)}">${esc(row.Phone)}</a></dd>
      <dt>City</dt><dd>${esc(row.City || '—')}</dd>
      ${row.Product ? `<dt>Product</dt><dd>${esc(row.Product)}</dd>` : ''}
      <dt>Average</dt><dd>${fmt(row.AvgRating)} / 5</dd>
      <dt>Source</dt><dd>${esc(row.Source || 'Direct')}</dd>
    </dl>
    <div class="m-sugg">${esc(row.Suggestion || 'No suggestion shared.')}</div>
    <div class="m-section">
      <h4>Callback</h4>
      <div class="seg" id="cbSeg">
        <button type="button" data-s="Pending" class="${status !== 'Done' ? 'on' : ''}">Pending</button>
        <button type="button" data-s="Done" class="${status === 'Done' ? 'on' : ''}">Done</button>
      </div>
      <textarea id="cbNote" class="input textarea" maxlength="300" style="min-height:80px" placeholder="What was discussed / resolved?">${esc(row.CallbackNote || '')}</textarea>
      <div class="m-actions">
        <div>${state.role === 'Admin' ? '<button class="btn btn-danger btn-sm" id="delBtn">Remove review</button>' : ''}</div>
        <div class="right">
          <button class="btn btn-ghost" id="cbCancel">Close</button>
          <button class="btn btn-primary" id="cbSave">Save Callback</button>
        </div>
      </div>
    </div>`;
  $('modal').classList.remove('hidden');

  let sel = status === 'Done' ? 'Done' : 'Pending';
  $('cbSeg').querySelectorAll('button').forEach(b => b.onclick = () => {
    sel = b.dataset.s; $('cbSeg').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
  });
  $('cbCancel').onclick = closeModal;
  $('cbSave').onclick = async () => {
    const btn = $('cbSave'); if (btn.disabled) return;
    btn.disabled = true; btn.textContent = 'Saving...';
    try {
      const r = await adminApi('updateCallback', { id: row.ReviewID, status: sel, note: $('cbNote').value.trim() });
      if (!r.ok) return toast(r.message, false);
      toast('Callback updated'); closeModal(); refreshView();
    } catch (e) { if (e.message !== 'AUTH') toast(e.message, false); }
    finally { if ($('cbSave')) { btn.disabled = false; btn.textContent = 'Save Callback'; } }
  };
  if ($('delBtn')) $('delBtn').onclick = async () => {
    if (!confirm('Remove this review from reports? It stays in the Sheet history.')) return;
    const btn = $('delBtn'); btn.disabled = true;
    try {
      const r = await adminApi('softDelete', { id: row.ReviewID });
      if (!r.ok) return toast(r.message, false);
      toast('Review removed'); closeModal(); refreshView();
    } catch (e) { if (e.message !== 'AUTH') toast(e.message, false); }
    finally { if ($('delBtn')) btn.disabled = false; }
  };
}
function closeModal() { $('modal').classList.add('hidden'); }
function refreshView() {
  if (state.view === 'reviews' || state.view === 'callbacks') loadTable();
  else go(state.view);
}

/* ---------- Settings (UI-driven config) ---------- */
const TEXT_FIELDS = [
  ['HeroEyebrow', 'Top badge'], ['HeroTitle', 'Main headline', true], ['HeroSubtitle', 'Sub headline', true],
  ['SuggestionTagline', 'Suggestion section tagline'], ['ThankYouTitle', 'Thank-you heading (after name)'],
  ['ThankYouText', 'Thank-you message', true], ['ThankYouWish', 'Thank-you festive wish (blank to hide)', true],
  ['LowRatingText', 'Message for low ratings', true],
  ['GoogleReviewText', 'Google review prompt', true], ['GoogleReviewURL', 'Google review link (https://...)'],
  ['FooterLine', 'Footer tagline'], ['FooterSub', 'Footer sub line'], ['CompanyName', 'Company name'],
  ['LogoURL', 'Logo image URL (leave blank for built-in logo)']
];

async function renderSettings() {
  $('pageTitle').textContent = 'Settings';
  $('page').innerHTML = '<div class="skeleton tall"></div>'.repeat(3);
  let cfgRes, usersRes;
  try {
    [cfgRes, usersRes] = await Promise.all([api('config'), adminApi('getUsers')]);
  } catch (e) { if (e.message !== 'AUTH') pageError(e.message); return; }
  if (!cfgRes.ok) return pageError(cfgRes.message);
  if (!usersRes.ok) return pageError(usersRes.message);
  state.cfg = cfgRes.config; store.set('lx_review_cfg', cfgRes.config);

  const t = cfgMap('Text'), cl = cfgMap('CategoryLabel'), ct = cfgMap('CategoryTagline'), rl = cfgMap('RatingLabel');
  const listBlock = (id, values, ph) => `
    <div id="${id}">${values.map(v => listRow(v, ph)).join('')}</div>
    <button class="btn btn-ghost btn-sm" data-add="${id}" data-ph="${esc(ph)}">+ Add</button>`;

  const wv = (k) => t[k] !== undefined ? t[k] : W_DEFAULTS[k];
  $('page').innerHTML = `
    <div class="set-section">
      <h3>Welcome Card</h3>
      <p>Pop-up shown before the form. Change it for every festival or campaign.</p>
      <div class="set-grid">
        <div class="set-field"><label>Show welcome card</label>
          <select class="input select" data-text="PopupEnabled">
            <option ${String(wv('PopupEnabled')).toLowerCase() !== 'no' ? 'selected' : ''}>Yes</option>
            <option ${String(wv('PopupEnabled')).toLowerCase() === 'no' ? 'selected' : ''}>No</option>
          </select></div>
        <div class="set-field"><label>Badge (e.g. Happy Diwali)</label><input class="input" data-text="PopupBadge" maxlength="60" value="${esc(wv('PopupBadge'))}"></div>
        <div class="set-field full"><label>Title (last two words get the colour highlight)</label><input class="input" data-text="PopupTitle" maxlength="120" value="${esc(wv('PopupTitle'))}"></div>
        <div class="set-field full"><label>Message</label><textarea class="input textarea" data-text="PopupText" maxlength="500" style="min-height:90px">${esc(wv('PopupText'))}</textarea></div>
        <div class="set-field"><label>Button text</label><input class="input" data-text="PopupCTA" maxlength="40" value="${esc(wv('PopupCTA'))}"></div>
        <div class="set-field"><label>Sign-off</label><input class="input" data-text="PopupSign" maxlength="80" value="${esc(wv('PopupSign'))}"></div>
      </div>
      <p style="margin:16px 0 8px;font-size:12.5px;font-weight:600;color:#3F3F46">Trust points (max 4)</p>
      ${listBlock('pointList', cfgList('PopupPoint').length ? cfgList('PopupPoint') : W_POINTS, 'New trust point')}
    </div>
    <div class="set-section">
      <h3>Page Text & Taglines</h3>
      <p>Everything customers read on the feedback page.</p>
      <div class="set-grid">
        ${TEXT_FIELDS.map(([k, label, wide]) => `
          <div class="set-field${wide ? ' full' : ''}"><label>${esc(label)}</label>
          <input class="input" data-text="${k}" maxlength="500" value="${esc(t[k] || '')}"></div>`).join('')}
      </div>
    </div>
    <div class="set-section">
      <h3>Rotating Taglines</h3>
      <p>Shown one by one under the headline.</p>
      ${listBlock('tagList', cfgList('Tagline'), 'New tagline')}
    </div>
    <div class="set-section">
      <h3>Rating Categories</h3>
      <p>Label and tagline for each rating card.</p>
      <div class="set-grid">
        ${CATS.map(c => `
          <div class="set-field"><label>${c.short} — label</label><input class="input" data-cl="${c.key}" value="${esc(cl[c.key] || '')}"></div>
          <div class="set-field"><label>${c.short} — tagline</label><input class="input" data-ct="${c.key}" value="${esc(ct[c.key] || '')}"></div>`).join('')}
      </div>
    </div>
    <div class="set-section">
      <h3>Star Labels</h3>
      <p>Word shown when a customer picks a star.</p>
      <div class="set-grid">
        ${[1, 2, 3, 4, 5].map(v => `<div class="set-field"><label>${v} star</label><input class="input" data-rl="${v}" value="${esc(rl[v] || '')}"></div>`).join('')}
      </div>
    </div>
    <div class="set-section">
      <h3>Products</h3>
      <p>Options for the "Product Purchased" dropdown. Leave empty to hide the field.</p>
      ${listBlock('prodList', cfgList('Product'), 'Product name')}
    </div>
    <div class="set-section">
      <h3>WhatsApp Templates</h3>
      <p>Used on the "Send on WhatsApp" page. Use {Name} for the customer name and {Link} for the form link. *bold* and _italic_ work in WhatsApp.</p>
      <div id="waTplList">${waTemplates().map(waTplRow).join('')}</div>
      <button class="btn btn-ghost btn-sm" id="addWaTpl">+ Add Template</button>
    </div>
    <div class="save-bar"><button class="btn btn-primary" id="saveCfg">Save Settings</button></div>

    <div class="set-section">
      <h3>Admin Users</h3>
      <p>Admin can change settings. Viewer can see reviews and update callbacks. Leave PIN blank to keep the current one.</p>
      <div class="user-row user-head"><span>Name</span><span>New PIN</span><span>Role</span><span>Active</span><span></span></div>
      <div id="userList">${usersRes.users.map(u => userRow(u, usersRes.roles)).join('')}</div>
      <button class="btn btn-ghost btn-sm" id="addUser">+ Add User</button>
      <div style="display:flex;justify-content:flex-end;margin-top:12px"><button class="btn btn-dark" id="saveUsers">Save Users</button></div>
    </div>`;

  $('page').querySelectorAll('[data-add]').forEach(b => b.onclick = () => {
    const box = $(b.dataset.add);
    box.insertAdjacentHTML('beforeend', listRow('', b.dataset.ph));
    wireRemove(box); box.lastElementChild.querySelector('input').focus();
  });
  wireRemove($('page'));
  $('addWaTpl').onclick = () => {
    $('waTplList').insertAdjacentHTML('beforeend', waTplRow({ key: '', value: 'Hello {Name},\n\n\n👉 {Link}\n\n*Team Litpax* ⚡' }));
    wireRemove($('waTplList')); $('waTplList').lastElementChild.querySelector('input').focus();
  };
  $('addUser').onclick = () => { $('userList').insertAdjacentHTML('beforeend', userRow({ name: '', role: 'Viewer', active: true }, usersRes.roles)); wireRemove($('userList')); };
  $('saveCfg').onclick = saveSettings;
  $('saveUsers').onclick = saveUsers;
}
function listRow(v, ph) {
  return `<div class="list-row"><input class="input" maxlength="200" value="${esc(v)}" placeholder="${esc(ph)}"><button class="icon-btn" data-rm title="Remove">×</button></div>`;
}
function waTplRow(t) {
  return `<div class="wa-tpl-row">
    <div class="list-row"><input class="input" data-wa="key" maxlength="40" value="${esc(t.key)}" placeholder="Template name (e.g. After Delivery)"><button class="icon-btn" data-rm-tpl title="Remove">×</button></div>
    <textarea class="input textarea" data-wa="value" maxlength="1000" style="min-height:150px">${esc(t.value)}</textarea>
  </div>`;
}
function userRow(u, roles) {
  return `<div class="user-row" data-origin="${esc(u.name)}">
    <input class="input" data-u="name" value="${esc(u.name)}" placeholder="Name" maxlength="40">
    <input class="input" data-u="pin" type="password" inputmode="numeric" maxlength="8" placeholder="${u.name ? '••••' : 'PIN (4–8 digits)'}">
    <select class="input select" data-u="role">${roles.map(r => `<option ${u.role === r ? 'selected' : ''}>${r}</option>`).join('')}</select>
    <label class="switch user-active"><input type="checkbox" data-u="active" ${u.active ? 'checked' : ''}> Active</label>
    <button class="icon-btn" data-rm title="Remove">×</button>
  </div>`;
}
function wireRemove(root) {
  root.querySelectorAll('[data-rm]').forEach(b => b.onclick = () => b.parentElement.remove());
  root.querySelectorAll('[data-rm-tpl]').forEach(b => b.onclick = () => b.closest('.wa-tpl-row').remove());
}

async function saveSettings() {
  const items = [];
  document.querySelectorAll('[data-text]').forEach(i => items.push({ type: 'Text', key: i.dataset.text, value: i.value.trim() }));
  [...$('tagList').querySelectorAll('input')].map(i => i.value.trim()).filter(Boolean)
    .forEach((v, n) => items.push({ type: 'Tagline', key: String(n + 1), value: v }));
  document.querySelectorAll('[data-cl]').forEach(i => items.push({ type: 'CategoryLabel', key: i.dataset.cl, value: i.value.trim() }));
  document.querySelectorAll('[data-ct]').forEach(i => items.push({ type: 'CategoryTagline', key: i.dataset.ct, value: i.value.trim() }));
  document.querySelectorAll('[data-rl]').forEach(i => items.push({ type: 'RatingLabel', key: i.dataset.rl, value: i.value.trim() }));
  [...$('prodList').querySelectorAll('input')].map(i => i.value.trim()).filter(Boolean)
    .forEach((v, n) => items.push({ type: 'Product', key: String(n + 1), value: v }));
  [...$('pointList').querySelectorAll('input')].map(i => i.value.trim()).filter(Boolean).slice(0, 4)
    .forEach((v, n) => items.push({ type: 'PopupPoint', key: String(n + 1), value: v }));
  const tplNames = {};
  for (const row of $('waTplList').querySelectorAll('.wa-tpl-row')) {
    const key = row.querySelector('[data-wa=key]').value.trim(), value = row.querySelector('[data-wa=value]').value.trim();
    if (!key && !value) continue;
    if (!key || !value) return toast('Each WhatsApp template needs a name and a message', false);
    if (tplNames[key.toLowerCase()]) return toast('Duplicate template name: ' + key, false);
    if (!/\{Link\}/i.test(value)) return toast(`Template "${key}" must include {Link}`, false);
    tplNames[key.toLowerCase()] = 1;
    items.push({ type: 'WaTemplate', key, value });
  }

  const url = items.find(i => i.key === 'GoogleReviewURL').value;
  if (url && !/^https:\/\//i.test(url)) return toast('Google review link must start with https://', false);
  const logo = items.find(i => i.key === 'LogoURL').value;
  if (logo && !/^https:\/\//i.test(logo)) return toast('Logo URL must start with https://', false);
  if (items.some(i => i.value.length > (i.type === 'WaTemplate' ? 1000 : 500))) return toast('A setting is too long (max 500, templates 1000)', false);

  const btn = $('saveCfg'); btn.disabled = true; btn.textContent = 'Saving...';
  try {
    const r = await adminApi('saveConfig', { items: JSON.stringify(items) });
    if (!r.ok) return toast(r.message, false);
    state.cfg = null; store.del('lx_review_cfg');
    toast('Settings saved. The form is updated.');
  } catch (e) { if (e.message !== 'AUTH') toast(e.message, false); }
  finally { btn.disabled = false; btn.textContent = 'Save Settings'; }
}

async function saveUsers() {
  const items = [...$('userList').querySelectorAll('.user-row')].map(row => ({
    origin: row.dataset.origin,
    name: row.querySelector('[data-u=name]').value.trim(),
    pin: row.querySelector('[data-u=pin]').value.trim(),
    role: row.querySelector('[data-u=role]').value,
    active: row.querySelector('[data-u=active]').checked
  }));
  for (const u of items) {
    if (!u.name) return toast('Every user needs a name', false);
    if (u.pin && !/^\d{4,8}$/.test(u.pin)) return toast(`PIN for ${u.name} must be 4–8 digits`, false);
    if (!u.origin && !u.pin) return toast(`Set a PIN for ${u.name}`, false);
  }
  if (!items.some(u => u.role === 'Admin' && u.active)) return toast('Keep at least one active Admin', false);

  const btn = $('saveUsers'); btn.disabled = true; btn.textContent = 'Saving...';
  try {
    const r = await adminApi('saveUsers', { items: JSON.stringify(items) });
    if (!r.ok) return toast(r.message, false);
    toast('Users saved');
    renderSettings();
  } catch (e) { if (e.message !== 'AUTH') toast(e.message, false); }
  finally { if ($('saveUsers')) { btn.disabled = false; btn.textContent = 'Save Users'; } }
}

function wireAdmin() {
  $('loginBtn').onclick = doLogin;
  $('pin').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
  $('logoutBtn').onclick = logout;
  $('refreshBtn').onclick = () => go(state.view);
  $('modalClose').onclick = closeModal;
  $('modal').addEventListener('click', e => { if (e.target === $('modal')) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

/* =========================================================
   ROUTER + BOOT
   ========================================================= */
let publicStarted = false, adminStarted = false;
function route() {
  const isAdmin = location.hash.toLowerCase().startsWith('#admin');
  $('publicView').classList.toggle('hidden', isAdmin);
  $('adminView').classList.toggle('hidden', !isAdmin);
  document.title = isAdmin ? 'Litpax | Feedback Admin' : 'Litpax | Customer Feedback';
  if (isAdmin && !adminStarted) { adminStarted = true; initAdmin(); }
  if (!isAdmin && !publicStarted) { publicStarted = true; initPublic(); }
  if (!isAdmin) closeModal();
}

document.addEventListener('DOMContentLoaded', () => {
  wirePublic();
  wireAdmin();
  window.addEventListener('hashchange', route);
  route();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
});
