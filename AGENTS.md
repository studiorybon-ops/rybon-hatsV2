# Rybon — Contexto del Proyecto

> E-commerce de gorras en ediciones limitadas. Streetware dominicano sin etiquetas.

---

## Design System (Formal)

### 3 Dials Ajustables (Taste Skill)
| Dial | Valor (1-10) | Notas |
|------|-------------|-------|
| **DESIGN_VARIANCE** | 6 | Asimetría intencional, bento grid, elementos offset |
| **MOTION_INTENSITY** | 6 | Staggered reveals, fade-up, scale-in, hover transitions |
| **VISUAL_DENSITY** | 3 | Whitespace generoso (`py-20`/`py-24`), galería de arte feel |

### Paleta de Colores (oklch)
- Brand hue: 250 (blue-violet base, used for neutral/cool tones)
- Surface: `oklch(0.021 0.003 250)` — #0a0a0a, negro profundo
- Surface Light: `oklch(0.045 0.005 250)` — #141414
- Surface Lighter: `oklch(0.07 0.008 250)` — #1e1e1e
- Accent (white): `oklch(1 0 0)` — #ffffff
- Accent Muted: `oklch(0.62 0.02 260)` — #a1a1aa, zinc-400
- Foreground: `oklch(0.94 0.005 260)` — zinc-100
- Border: `oklch(0.185 0.008 260)` — zinc-800/50

### Tipografía
- **Display**: Bootzy TM (sans-serif, 1 peso — Regular, `public/fonts/BootzyTM.ttf`) — Títulos, headers, precios, botones, anuncios
- **Body**: Plus Jakarta Sans (sans-serif, weights: 200-800) — Texto de párrafos, labels, badges
- Pairing validado: **Modern Tech** (adaptado a streetwear)

### Espaciado (4px base)
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 2rem (32px)
- xl: 4rem (64px)

### Border Radius Strategy
- Sin border-radius (`rounded-none`) — estética raw/industrial
- Excepciones: miniatura scrollbar (3px), badges sutiles

### Shadow Hierarchy
- Overlay: `bg-black/70 backdrop-blur-sm`
- Glow: `radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)`
- Card borders en lugar de sombras: `border-zinc-800/50`

---

## Marca

- **Nombre**: Rybon
- **País**: República Dominicana
- **Email**: studiorybon@gmail.com
- **Instagram**: @rybon.ry
- **TikTok**: @rybon.ry
- **Horario**: 24/7
- **Concepto**: Autenticidad que no se negocia. Cada diseño es una declaración. Ediciones limitadas para los que entienden.
- **Logo**: `/logo-rybon.png` (local en public/)

## Stack Tecnológico

- React 19 + Vite 6
- Tailwind CSS 3 + PostCSS + Autoprefixer
- Framer Motion 12 (animaciones)
- React Router DOM v7 (ruteo)
- Firebase Firestore (base de datos en tiempo real — stock, productos y anuncio)
- Lucide React (iconos)
- Tipografía local: Bootzy TM (`public/fonts/BootzyTM.ttf`) + Google Fonts (Plus Jakarta Sans)

**Eliminado (sept 2026):** EmailJS, PayPal SDK y el sistema de carrito/checkout (ver sección "Pedidos").

## Ecosistema Completo

El proyecto tiene **2 aplicaciones conectadas a Firebase Firestore** ubicadas en `C:\Users\User\Desktop\MANAGER RYBON AND WEB\`:

1. **Página web** (`PAGINA WEB RYBON`): Catálogo público, pedidos por WhatsApp, anuncios editables desde el Manager. Desplegada en **Netlify** desde `github.com/studiorybon-ops/rybon-hatsV2` (push a main → auto-deploy).
2. **Rybon Manager** (`APP RYBON V2`): App de escritorio local (Electron) para gestión interna.

### Rybon Manager (Electron App)

- **Stack**: React 19 + Vite 6 + Firebase 11 (`firestore` + `auth`) + Electron 33 + Recharts + jsPDF + html2canvas + lucide-react
- **Nombre en package.json**: `rybon-manager-v2`
- **Entry point**: `electron/main.js`
- **Firebase**: Misma instancia `rybon-hats-ffc24` que la web. Auth con `signInWithEmailAndPassword`.
- **Persistencia local**: JSON en `userData/rybon-data.json` (IPC handlers `data:read` / `data:write`). Guarda sales, drops, futureDrops, notes, investments.
- **Icono app**: `build/icon.png` (foto de la app.jpg del logo vectorial)
- **Logo interno**: `public/logo-rybon.png` (Recurso 2.png del logo vectorial) — usado en sidebar, login y titlebar
- **Marca**: "Rybon" con tagline "Rewrite Yourself" (ya no "Rybon Hats")
- **Páginas/Componentes** (navegación lateral):
  - **GENERAL**: Dashboard, Estadisticas, Ventas, Reportes, Etiquetas
  - **WEB**: Stock Web (products CRUD desde Firestore), Pedidos Web (orders desde Firestore), Drop Web (subir productos con imágenes comprimidas)
  - **CREATIVO**: Notas & Ideas, Proximos Drops
  - **SISTEMA**: Configuracion (export/import backup, reset data, seed productos)
- **Modo dev**: `npm run electron:dev` (concurrently: vite + wait-on + electron)
- **Build**: `npm run build` (vite) → luego `electron:build` (electon-builder) → output en `dist-electron-build/`
- **Instaladores**: `Rybon Manager Setup 2.0.0.exe` (NSIS) + `Rybon Manager 2.0.0.exe` (portable)
- **NSIS crash**: `System.dll 0xc0000005` en esta máquina — usar `win-unpacked/Rybon Manager.exe` como fallback
- **Compresión imágenes** (DropWeb.jsx): Canvas 1200px máx, JPEG q0.85, control <800 KB antes de subir a Firestore
- **Seed data**: Si colección `products` está vacía al iniciar sesión, crea RYBON SKY y RYBON LOYAL con imágenes SVG placeholder

## Firebase Firestore

- **Proyecto**: `rybon-hats-ffc24` — migrado desde el proyecto anterior
- **Usuario**: `admin@rybonhats.com` / `rybon1508` (Firebase project aún `rybon-hats-ffc24`)
- **Reglas Firestore**: Lectura pública, escritura solo autenticada
  ```
  match /products/{product} {
    allow read: if true;
    allow write: if request.auth != null;
  }
  match /orders/{order} {
    allow read, write: if request.auth != null;
  }
  match /settings/{doc} {
    allow read: if true;
    allow write: if request.auth != null;
  }
  ```
- **Colección `settings`**: documento `settings/announcement` con `{ text, active, updatedAt }` — lo edita el Manager y la web lo muestra como barra de anuncio en el catálogo. ⚠️ Requiere la regla de arriba (lectura pública) o la barra no aparecerá.
- **Colección `products`**: documentos por slug (ej. `rybon-sky`)
  - Campos: `name`, `slug`, `price`, `stock`, `description`, `color`, `images`, `hasAccesories`, `accesoriesInfo`, `active`, `createdAt`
  - `images` es array de `{ id: string, data: base64_dataURI }`
  - Límite Firestore: 1 MB por documento (imágenes comprimidas a 1200px máx, JPEG q0.85, control de <800 KB antes de guardar)
- **Colección `orders`**: obsoleta — los pedidos llegan por WhatsApp directo; la web ya no escribe pedidos en Firestore y el código de `orders` se removió del Manager
- La web **no muestra stock en tiempo real**: solo badge "Disponible" / "Agotada" (`stock > 0 && active !== false`); la cantidad fabricada (`manufactured`) se muestra en el detalle del producto

## Estilo Visual (Streetwear)

- Fondo: negro profundo (#0a0a0a)
- Acento: blanco puro (#ffffff) — sin dorados, sin cálidos
- Tipografía display: Bootzy TM (local, se empaqueta en `public/fonts/BootzyTM.ttf`)
- Tipografía body: Plus Jakarta Sans (limpia, geométrica, semibold)
- Efectos: noise texture SVG, glow radial blanco sutil
- Monocromático de alto contraste
- Botones: grandes, uppercase, tracking extra, raw sin border-radius
- Headings: tamaño extremo (9xl en desktop), leading apretado (0.85)
- Copy: directo, sin rodeos, actitud callejera

## Inspiración

- Catálogo inspirado en dandyshat.com:
  - Hover rollover de imágenes (imagen principal → segunda vista al pasar el mouse)
  - Botón "Pedir" directamente en la card del catálogo (abre WhatsApp)
  - Grid responsivo (1→2→3→4 columnas)
  - Badge de disponibilidad en esquina superior
  - Overlay sutil con opacidad al hover
  - Precio con moneda visible siempre

## Productos

2 productos actualmente en Firestore. Fotos originales en `Escritorio\Fotos Gorras\`:

| Producto | Slug | Precio | Moneda | Stock | Color |
|----------|------|--------|--------|-------|-------|
| RYBON SKY | rybon-sky | 1,250 | DOP | 8 | Negro / Azul |
| RYBON LOYAL | rybon-loyal | 1,250 | DOP | 8 | Negro / Rojo |

## Cambios de Marca (Junio 2026)
- Marca renombrada de "Rybon Hats" a **Rybon**
- Redes sociales actualizadas a **@rybon.ry** (Instagram y TikTok)
- Nuevo logo vectorial en `/logo-rybon.png`
- Concepto actualizado: "Autenticidad que no se negocia"
- Tagline: "Rewrite Yourself"

Las imágenes se almacenan como base64 en Firestore (comprimidas a 1200px máx, JPEG q0.85). NO hay imágenes locales en `public/images/` — las que están ahí son las originales, la web las obtiene de Firestore.

## Bugs Conocidos / Fixes Aplicados

### Web (`PAGINA WEB RYBON`)
- `src/data/firestoreProducts.js`: `normalizeProduct` mapea `stock` → `quantity`, `available` deriva de `stock > 0 && active !== false`, `manufactured` usa `Number(data.manufactured) || Number(data.stock) || 0`
- `src/data/firestoreProducts.js`: Error handler en `listenProducts` (fallback a `[]` si Firestore falla)
- `src/pages/ProductDetailPage.jsx`: `.catch(() => setLoading(false))` para evitar spinner infinito; estado "cargando" separado de "no encontrado"; reset de imagen al cambiar slug
- `src/lib/order.js` (nuevo): orden por WhatsApp vía `VITE_WHATSAPP_NUMBER`; vacío = Coming Soon. Reemplaza carrito/PayPal/EmailJS
- `src/components/AnnouncementBar.jsx` + `src/data/announcement.js` (nuevos): anuncio editado desde el Manager en `settings/announcement`
- `App.jsx`: rutas con `React.lazy` + `Suspense` (code-splitting por página)
- `vite.config.js`: `manualChunks` (react / motion / firebase / icons)
- Tipografía: display = Bootzy TM (local), body = Plus Jakarta Sans

### Manager (`APP RYBON V2`)
- `src/components/DropWeb.jsx`: Compresión de imágenes vía Canvas (1200px máx, JPEG q0.85); validación de estructura + tamaño <800 KB antes de guardar; try/catch en upload
- `src/lib/db.js`: Error callbacks en `listenProducts` y `listenAnnouncement`
- `src/components/Sales.jsx`: `useState(fn)` → `useEffect` para suscripción Firestore
- `src/components/Reports.jsx`: `setLoading(false)` en catch
- `electron/main.js`: `show: true`, sin `frame: false`
- `index.html`: Google Fonts preconnect + stylesheet
- `src/context/AuthContext.jsx`: Fallback offline si Firebase Auth falla
- `src/lib/dataStore.js`: `investments` en `defaultData`
- **Ronda 2 (esta sesión)**: eliminados `Orders.jsx`, `Sidebar.jsx`, `useStock` y funciones de Firestore `listenOrders`/`updateOrderStatus`/`getOrder`. Se conserva `ShippingLabel.jsx` (etiquetas para envíos por WhatsApp). `DropWeb.jsx` ahora tiene campo **"Cantidad fabricada"** (`manufactured`) que se muestra en el detalle web. Vuelos del test `e2e.test.jsx` corregidos (`listenAnnouncement`/`saveAnnouncement`, quitar imports de Stock/Orders, timeout 15000ms para tests que importan `App`). Build y tests: 9/9 pasan.

## Páginas

- `/` — Splash screen con logo, tocar para entrar
- `/catalogo` — Grid responsivo con ProductCard (hover rollover + botón "Pedir" → WhatsApp)
- `/producto/:slug` — Detalle con galería, info y botón "Pedir" / "Agotada" / "Coming Soon"
- `/contacto` — Información de contacto y redes

## Pedidos (WhatsApp)

- **No hay carrito ni checkout.** El sistema de envío + carrito + PayPal fue eliminado.
- El botón de cada producto ahora es **"Pedir"** y el cliente es redirigido a WhatsApp con un mensaje pre-llenado del modelo.
- Número configurable en `VITE_WHATSAPP_NUMBER` (formato internacional sin `+`, ej. `18090000000`). Si está **vacío**, los botones muestran **"Coming Soon"** (deshabilitados).
- `src/lib/order.js` — utilidad: `ORDER_ENABLED` y `orderUrl(product)`.
- Imágenes comprimidas siguen viniendo de Firestore. No se genera la colección `orders` desde la web (los pedidos llegan por WhatsApp).
- Códigos promocionales, EmailJS, PayPal y DOP->USD ya no se usan.
- `src/data/announcement.js` — escucha `settings/announcement`; `AnnouncementBar.jsx` (solo en catálogo) muestra el texto con la tipografía Bootzy en mayúsculas.

## Build & Deploy

### Web
- Desplegada en Netlify desde `main` branch de `github.com/studiorybon-ops/rybon-hatsV2`
- Push a GitHub → Netlify deploy automático
- Build: `npm run build` (sin errores)

### Manager (Electron)
- Build Vite: `npm run build` (sin errores)
- Package: `npx electron-builder build --win --config.win.target=nsis` (Setup) o `--config.win.target=portable`
- Output en `dist-electron-build/`
- NSIS `System.dll 0xc0000005` crash en esta máquina — usar `win-unpacked/Rybon Manager.exe` como fallback
- Modo dev: `npm run electron:dev` (concurrently: vite + wait-on + electron)

## Skills de Diseño Aplicadas

1. **ui-ux-pro-max**: Accesibilidad (contraste 4.5:1, focus states, aria-labels), touch targets 44px+, mobile-first, spacing scale 4/8dp, animaciones 150-300ms, formularios con labels visibles + errores inline, semantic color tokens
2. **frontend-design**: Tipografía distintiva (nada de Inter/Roboto/Syne/Manrope), composición espacial con énfasis en contraste, fondos atmosféricos con noise y gradientes
3. **distinctive-frontend**: Pesos extremos de fuente (200 vs 800), carga orquestada con stagger reveals, easing cubic-bezier personalizado, mesh gradients + noise texture
