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
- **Display**: Bebas Neue (sans-serif, weights: 400) — Títulos, headers, precios
- **Body**: Plus Jakarta Sans (sans-serif, weights: 200-800) — Texto, labels, badges
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
- Firebase Firestore (base de datos en tiempo real — stock y productos)
- EmailJS (notificaciones de pedidos)
- PayPal SDK (pagos en USD)
- Lucide React (iconos)

## Ecosistema Completo

El proyecto tiene **2 aplicaciones conectadas a Firebase Firestore**:

1. **Página web** (`C:\Users\User\Desktop\v2 rybon\prueba web new`): Catálogo público, carrito, checkout con PayPal. Desplegada en **Netlify** desde `github.com/studiorybon-ops/rybon-hatsV2`.
2. **Rybon Manager** (`C:\Users\User\Desktop\v2 rybon\APP RYBON V2`): App de escritorio local (Electron) para gestión interna. Stack: React 19 + Vite 6 + Firebase 11 + Electron 33 + Recharts + jsPDF + html2canvas + lucide-react. Build: `npm run electron:build` (NSIS + portable).

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
  ```
- **Colección `products`**: documentos por slug (ej. `rybon-sky`)
  - Campos: `name`, `slug`, `price`, `stock`, `description`, `color`, `images`, `hasAccesories`, `accesoriesInfo`, `active`, `createdAt`
  - `images` es array de `{ id: string, data: base64_dataURI }`
  - Límite Firestore: 1 MB por documento (imágenes comprimidas a 1200px máx, JPEG q0.85, control de <800 KB antes de guardar)
- **Colección `orders`**: pedidos de la web
- **Singleton Firebase**: Web usa `initializeApp(firebaseConfig, 'rybon-web')` y `initializeApp(firebaseConfig, 'rybon-web-stock')` para useStock — evitar doble init

## Estilo Visual (Streetwear)

- Fondo: negro profundo (#0a0a0a)
- Acento: blanco puro (#ffffff) — sin dorados, sin cálidos
- Tipografía display: Bebas Neue (extrema, condensada, tracking agresivo)
- Tipografía body: Plus Jakarta Sans (limpia, geométrica, semibold)
- Efectos: noise texture SVG, glow radial blanco sutil
- Monocromático de alto contraste
- Botones: grandes, uppercase, tracking extra, raw sin border-radius
- Headings: tamaño extremo (9xl en desktop), leading apretado (0.85)
- Copy: directo, sin rodeos, actitud callejera

## Inspiración

- Catálogo inspirado en dandyshat.com:
  - Hover rollover de imágenes (imagen principal → segunda vista al pasar el mouse)
  - Botón "Agregar al carrito" directamente en la card del catálogo
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

### Web
- `firestoreProducts.js`: `normalizeProduct` mapea `stock` → `quantity`, `available` deriva de `stock > 0 && active !== false`
- `firestoreProducts.js`: Error handler en `listenProducts` (fallback a `[]` si Firestore falla)
- `useStock.js`: Singleton Firebase para evitar doble `initializeApp`
- `ProductDetailPage.jsx`: `.catch(() => setLoading(false))` para evitar spinner infinito; estado "cargando" separado de "no encontrado"; reset de imagen/added al cambiar slug

### Manager
- `DropWeb.jsx`: Compresión de imágenes vía Canvas (1200px máx, JPEG q0.85); validación de estructura + tamaño <800 KB antes de guardar; try/catch en upload
- `db.js`: Error callbacks en `listenProducts` y `listenOrders`
- `Sales.jsx`: `useState(fn)` → `useEffect` para suscripción Firestore
- `Reports.jsx`: `setLoading(false)` en catch
- `electron/main.js`: `show: true`, sin `frame: false`
- `index.html`: Google Fonts preconnect + stylesheet
- `AuthContext.jsx`: Fallback offline si Firebase Auth falla
- `dataStore.js`: `investments` en `defaultData`

## Páginas

- `/` — Splash screen con logo, tocar para entrar
- `/catalogo` — Grid responsivo con ProductCard (hover rollover + add to cart inline)
- `/producto/:slug` — Detalle con galería, info, carrito
- `/contacto` — Información de contacto y redes

## Carrito y Checkout

- Carrito lateral (drawer) con 3 pasos: Carrito → Envío → Pago
- Códigos promocionales: RYBON10 (10%), RYBON20 (20%), LAUNCH50 (50%)
- Tasa de cambio: 58 DOP = 1 USD
- PayPal integrado para pagos en USD
- EmailJS envía resumen del pedido al comprador
- Firestore actualiza stock al confirmar pago

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
