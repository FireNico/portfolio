// Menú móvil
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  nav.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}

// Año actual en el pie
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Envío del formulario sin recargar la página (Web3Forms)
const form = document.getElementById('contact-form');

if (form) {
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (form.access_key.value === 'TU_ACCESS_KEY') {
      status.className = 'form-status err';
      status.textContent = 'Formulario aún no configurado (falta la clave de Web3Forms).';
      return;
    }

    button.disabled = true;
    status.className = 'form-status';
    status.textContent = 'Enviando…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      form.reset();
      status.className = 'form-status ok';
      status.textContent = '¡Gracias! He recibido tu mensaje y te responderé pronto.';
    } catch {
      status.className = 'form-status err';
      status.textContent = 'No se ha podido enviar. Inténtalo de nuevo en unos minutos.';
    } finally {
      button.disabled = false;
    }
  });
}
