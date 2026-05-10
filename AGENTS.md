# Rybon Hats — Contexto del Proyecto

> E-commerce de gorras en ediciones limitadas. Marca dominicana de streetwear.

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

- **Nombre**: Rybon Hats
- **País**: República Dominicana
- **Email**: studiorybon@gmail.com
- **Instagram**: @rybon.hats
- **TikTok**: @rybon.hats
- **Horario**: 24/7
- **Concepto**: Gorras con estilo único, ediciones limitadas, inspiradas en exclusividad y autenticidad.
- **Logo**: `https://customer-assets.emergentagent.com/job_df23813b-3c3a-4e90-a12c-ea5ad85b93b9/artifacts/u0ichcdd_logo%20png.png`

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

1. **Página web** (esta — `prueba web new`): Catálogo público, carrito, checkout con PayPal. Lee stock desde Firestore en tiempo real y descuenta al confirmar pago. La web original está desplegada en **Netlify**.
2. **Rybon Manager** (`C:\Users\User\Desktop\RYBON HAST\APP DE MANEJO\`): App de escritorio local (Electron) para gestión interna — crear drops, registrar ventas, notas, accesorios, exportar/importar backup en JSON. Genera instalador .exe con `npm run dist-win`. **Pendiente de mejorar.**

## Firebase Firestore

- **Proyecto**: rybon-hats (config en `useStock.js`)
- **Colección**: `products` — documentos por slug con campo `stock`
- La web descuenta stock vía `runTransaction` al confirmar pago PayPal
- Rybon Manager también lee/escribe la misma base de datos

## Estilo Visual

- Fondo: negro profundo (#0a0a0a)
- Acento: blanco puro (#ffffff) — sin dorados, sin cálidos
- Tipografía display: Bebas Neue (extrema, condensada)
- Tipografía body: Plus Jakarta Sans (limpia, geométrica)
- Efectos: noise texture SVG, glow radial blanco sutil
- Monocromático de alto contraste

## Inspiración

- Catálogo inspirado en dandyshat.com:
  - Hover rollover de imágenes (imagen principal → segunda vista al pasar el mouse)
  - Botón "Agregar al carrito" directamente en la card del catálogo
  - Grid responsivo (1→2→3→4 columnas)
  - Badge de disponibilidad en esquina superior
  - Overlay sutil con opacidad al hover
  - Precio con moneda visible siempre

## Productos

Actualmente 2 productos. Imágenes locales en `public/images/`:

| Producto | Slug | Precio | Moneda | Stock | Color | Imágenes |
|----------|------|--------|--------|-------|-------|----------|
| RYBON SKY | rybon-sky | 1,250 | DOP | 8 | Negro / Azul | `/images/sky/sky-1.jpg` ~ `sky-4.jpg` |
| RYBON LOYAL | rybon-loyal | 1,250 | DOP | 8 | Negro / Rojo | `/images/loyal/loyal-1.jpg` ~ `loyal-4.jpg` |

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

## Skills de Diseño Aplicadas

1. **ui-ux-pro-max**: Accesibilidad (contraste 4.5:1, focus states, aria-labels), touch targets 44px+, mobile-first, spacing scale 4/8dp, animaciones 150-300ms, formularios con labels visibles + errores inline, semantic color tokens
2. **frontend-design**: Tipografía distintiva (nada de Inter/Roboto/Syne/Manrope), composición espacial con énfasis en contraste, fondos atmosféricos con noise y gradientes
3. **distinctive-frontend**: Pesos extremos de fuente (200 vs 800), carga orquestada con stagger reveals, easing cubic-bezier personalizado, mesh gradients + noise texture
