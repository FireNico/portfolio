// ---------- Utilidades de almacenamiento (pueden fallar en modo privado) ----------
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};

// ---------- Tema claro / oscuro ----------
const root = document.documentElement;
const themeBtn = document.querySelector('.theme-toggle');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const next = root.dataset.bsTheme === 'dark' ? 'light' : 'dark';
    root.dataset.bsTheme = next; // modo de color de Bootstrap 5.3
    store.set('theme', next);
  });
}

// ---------- Idiomas ----------
const LANGS = ['es', 'en', 'ru'];
let lang = 'es';

function t(key) {
  const dict = window.I18N?.[lang] || {};
  return dict[key] ?? window.I18N?.es?.[key] ?? '';
}

function applyLang(next) {
  if (!LANGS.includes(next) || !window.I18N) return;
  lang = next;
  root.lang = next;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = t(el.dataset.i18n);
    if (v) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const v = t(el.dataset.i18nHtml);
    if (v) el.innerHTML = v; // solo textos propios de i18n.js
  });
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const [attr, key] = el.dataset.i18nAttr.split(':');
    const v = t(key);
    if (v) el.setAttribute(attr, v);
  });

  document.title = t('_title');
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('_desc'));

  document.querySelectorAll('[data-lang]').forEach(b =>
    b.setAttribute('aria-pressed', String(b.dataset.lang === next))
  );
  store.set('lang', next);
}

document.querySelectorAll('[data-lang]').forEach(b =>
  b.addEventListener('click', () => applyLang(b.dataset.lang))
);

// Idioma inicial: el guardado, o el del navegador, o español
const saved = store.get('lang');
const browser = (navigator.language || 'es').slice(0, 2);
const initial = LANGS.includes(saved) ? saved : (LANGS.includes(browser) ? browser : 'es');
if (initial !== 'es') applyLang(initial);

// ---------- Año en el pie ----------
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// ---------- Formulario (Web3Forms) ----------
const form = document.getElementById('contact-form');

if (form) {
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (form.access_key.value === 'TU_ACCESS_KEY') {
      status.className = 'form-status small mt-3 mb-0 text-danger';
      status.textContent = t('fNotConfigured');
      return;
    }

    button.disabled = true;
    status.className = 'form-status small mt-3 mb-0';
    status.textContent = t('fSending');

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      form.reset();
      status.className = 'form-status small mt-3 mb-0 text-success';
      status.textContent = t('fOk');
    } catch {
      status.className = 'form-status small mt-3 mb-0 text-danger';
      status.textContent = t('fErr');
    } finally {
      button.disabled = false;
    }
  });
}
