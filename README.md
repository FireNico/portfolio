# FireNico — Portfolio

Web estática (HTML + CSS + JS, sin dependencias) con el portfolio y tres webs demo.

## Estructura

```
index.html            Portada del portfolio
aviso-legal.html      Aviso legal (plantilla, rellenar datos)
privacidad.html       Política de privacidad (plantilla, rellenar datos)
404.html              Página de error
css/styles.css        Estilos del portfolio
js/main.js            Menú móvil + envío del formulario
demos/bar/            Demo: bar de tapas
demos/peluqueria/     Demo: peluquería
demos/taller/         Demo: taller mecánico
robots.txt, sitemap.xml, _headers, favicon.svg
```

## Pendiente antes de publicar (busca "TODO" en el código)

1. **Formulario**: crea una clave gratis en https://web3forms.com y sustitúyela por `TU_ACCESS_KEY` en `index.html`.
2. **Dominio**: cambia `firenico.es` en `index.html`, `robots.txt` y `sitemap.xml` por tu dominio real.
3. **Legales**: rellena los datos entre `[corchetes]` en `aviso-legal.html` y `privacidad.html`.
4. **Contacto**: cuando quieras, añade email/WhatsApp en la sección de contacto.

## Probar en local

Abre la carpeta en VS Code y usa la extensión **Live Server**, o bien:

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

## Publicar en Cloudflare Pages

1. Sube esta carpeta a un repositorio de GitHub:
   ```bash
   git init
   git add .
   git commit -m "Primera versión del portfolio"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/firenico-portfolio.git
   git push -u origin main
   ```
2. En Cloudflare: **Workers & Pages → Create → Pages → Connect to Git** y elige el repositorio.
3. Configuración de build: *Framework preset* = **None**, *Build command* = vacío, *Output directory* = `/`.
4. Cada `git push` a `main` publicará la web automáticamente.
5. Cuando tengas dominio: **Custom domains → Set up a custom domain**.
6. Activa **Web Analytics** (sin cookies, no requiere banner).
7. Da de alta la web en **Google Search Console** y envía `sitemap.xml`.
