# Mateo Rubio · Portafolio profesional

Portafolio bilingüe de un estudiante de Ingeniería de Software, con estudios de caso de desarrollo web, automatización y visión por computador.

## Desarrollo local

Requisitos del proyecto: Node.js 24 LTS y npm. Desde la raíz:

```bash
npm install
npm run dev
```

Astro muestra la URL local en la terminal. Para verificar o servir el resultado compilado:

```bash
npm run check
npm run lint
npm run build
npm run preview
```

## Arquitectura y contenido

- Astro genera HTML estático en `dist/`. TypeScript usa configuración estricta. Tailwind CSS se integra con Vite. Lucide aporta iconos y Fontsource sirve Raleway y Playfair Display localmente.
- `src/pages/` declara las rutas. `src/layouts/Base.astro` comparte navegación, pie de página y metadatos. `src/components/` contiene páginas y componentes reutilizables.
- `src/i18n/index.ts` define rutas y etiquetas. Español usa la raíz e inglés usa `/en/`. Para editar textos de interfaz, actualiza ambos argumentos de traducción dentro del componente correspondiente.
- Actualiza el perfil, habilidades y fechas de certificaciones en `src/data/profile.ts`. Los nombres de las credenciales conservan su idioma original.
- Los casos de estudio viven en `src/content/projects/es/` y `src/content/projects/en/`. Añade un Markdown por idioma con el mismo `slug`, orden y año. Usa los campos definidos en `src/content.config.ts`. Agrega una portada a `public/images/projects/<slug>/cover.svg` o define el campo opcional `cover`. Si faltan rol o estado confirmados, puedes omitirlos.
- `public/images/` contiene WebP derivados del banner original, diagramas SVG conceptuales y una imagen social JPEG de 1200 × 630. Si cambia la identidad visual, genera nuevas variantes con las mismas dimensiones o actualiza los atributos del componente. Mantén los originales y datos confidenciales fuera de `public/`.

## CV

El PDF original contiene un teléfono personal y se conserva en la raíz, excluido de Git y de la compilación. Ambas páginas de CV muestran una vista previa WebP del PDF público y permiten abrirlo o descargarlo. Para actualizarlo, sustituye `public/cv/Mateo_Rubio_CV.pdf` por la versión pública revisada, exporta su página a `src/assets/cv/preview.webp` y recompila. Conserva la ruta del PDF para mantener los enlaces existentes.

## Pruebas

```bash
npx playwright install chromium
npm test
```

En Windows también se puede usar Microsoft Edge instalado con `PLAYWRIGHT_CHANNEL=msedge` como variable de entorno. Usa `PLAYWRIGHT_PORT=4322` si el servidor de desarrollo ya ocupa el puerto 4321. La suite sirve `dist/` localmente y cubre rutas, enlaces internos, navegación sin JS, portapapeles, vista previa y descarga del CV, 404, accesibilidad con axe y anchos de 375, 768, 1024 y 1440 px. Las capturas aparecen en `test-results/screenshots/`. Las puntuaciones de Lighthouse deben medirse por separado.

## Cloudflare Workers Static Assets

`wrangler.jsonc` publica únicamente `dist/` y usa `404.html` para rutas inexistentes.

1. Inicia sesión con `npx wrangler login`.
2. En la raíz, ejecuta `npm run deploy` para compilar y publicar manualmente.
3. Registra la URL que devuelva Wrangler en `SITE_URL` (copia `.env.example` a `.env` para compilaciones locales). Usa el origen completo con HTTPS. Recompila para activar canonical, hreflang, sitemap y las URLs de la imagen social.
4. Para despliegue automático, abre **Workers & Pages**, importa el repositorio de GitHub y selecciona `main` como rama de producción. Configura la raíz del repositorio, Node.js 24, `SITE_URL` como variable de compilación, `npm run build` como comando de compilación y `npx wrangler deploy` como comando de despliegue.
5. Para conectar un dominio de tu cuenta, abre el Worker y agrega un **Custom Domain** en **Settings → Domains & Routes**. Actualiza `SITE_URL` y vuelve a compilar.

Puedes migrar a otro servidor estático publicando `dist/`, activando rutas con barra final y configurando `404.html` como página de error. Actualiza `SITE_URL` para el nuevo dominio.

Referencias: [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) · [Tailwind con Vite](https://tailwindcss.com/docs/installation/using-vite) · [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) · [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/) · [Dominios personalizados](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
