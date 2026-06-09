# Airpals DS — Tokens de color y variables

> Cargar cuando: aplicas colores, defines componentes, o revisas el DS.
> Colecciones en Figma: `TailwindCSS` → `Primitives` → `Semantics`
> Stack: Next.js + Tailwind v3. Light mode principal, dark mode soportado.

---

## Arquitectura de colecciones

```
TailwindCSS (379)   → Escala completa Tailwind. NO tocar.
Primitives (6)      → Brand colors exclusivos que no existen en Tailwind.
Semantics (28)      → Tokens de uso semántico. Siempre usar estos en componentes.
```

**Regla:** En componentes, SIEMPRE usar tokens de `Semantics`. Nunca `Primitives` directo. Nunca hex fijo.

---

## Primitives — colores de marca

| Token | Hex | Uso |
|-------|-----|-----|
| `brand/blue` | `#0043FF` | Primary — CTAs, links, acciones |
| `brand/pink` | `#FC4575` | Secondary — acentos, ilustraciones |
| `brand/navy` | `#1B306C` | Contrast — texto headings, iconos primarios |
| `brand/blue-light` | `#E6F1FD` | Subtle blue — fondos de acento suave |
| `brand/blue-sky` | `#B4D5FF` | Tertiary subtle bg — fondos terciarios |
| `brand/electric-blue` | `#00A0FF` | Ilustraciones — detalles/highlights |

> Los grises de UI se toman directo de `TailwindCSS/colors/slate/*` — no tienen Primitive propio.

---

## Semantics — background (7)

| Token | Light | Dark | Uso |
|-------|-------|------|-----|
| `background/primary` | `colors/base/white` | `colors/slate/900` | Fondo base de la app |
| `background/secondary` | `brand/blue-light` | `colors/slate/800` | Fondos secundarios, hover states |
| `background/tertiary` | `brand/blue-sky` | `colors/slate/700` | Fondos terciarios, inputs disabled |
| `background/accent` | `brand/blue` | `brand/blue` | Fondos de elementos de marca |
| `background/accent-subtle` | `colors/indigo/100` | `colors/indigo/950` | Fondos suaves de acento |
| `background/primary-transparent` | `colors/base/transparent` | `colors/base/transparent` | Overlays |
| `background/accent-contrast` | `brand/navy` | `brand/navy` | Fondos de alto contraste |
| `background/disable` | `colors/slate/200` | `colors/slate/500` | Fondos de elementos deshabilitados |

---

## Semantics — text (7)

| Token | Light | Dark | Uso |
|-------|-------|------|-----|
| `text/primary` | `brand/navy` | `colors/slate/50` | Headings, texto principal |
| `text/secondary` | `colors/slate/600` | `colors/slate/400` | Labels, subtítulos, texto de apoyo |
| `text/tertiary` | `colors/slate/500` | `colors/slate/400` | Metadata, hints |
| `text/disable` | `colors/slate/300` | `colors/slate/600` | Texto deshabilitado, placeholders |
| `text/accent` | `brand/blue` | `brand/blue-light` | Links, texto de acción |
| `text/on-accent` | `colors/base/white` | `colors/base/white` | Texto sobre fondos de acento |
| `text/invert` | `colors/base/white` | `colors/slate/900` | Texto sobre fondos invertidos |

---

## Semantics — border (3)

| Token | Light | Dark | Uso |
|-------|-------|------|-----|
| `border/primary` | `colors/slate/200` | `colors/slate/700` | Bordes de cards, tablas, separadores principales |
| `border/secondary` | `colors/slate/300` | `colors/slate/800` | Bordes de hover, inputs activos |
| `border/accent` | `brand/blue` | `brand/blue` | Bordes de focus, elementos seleccionados |

---

## Semantics — icon (7)

| Token | Light | Dark | Uso |
|-------|-------|------|-----|
| `icon/primary` | `brand/navy` | `colors/slate/200` | Iconos principales |
| `icon/secondary` | `colors/slate/500` | `colors/slate/500` | Iconos de apoyo |
| `icon/tertiary` | `colors/slate/300` | `colors/slate/400` | Iconos decorativos / hints |
| `icon/accent` | `brand/blue` | `brand/blue` | Iconos de acción / marca |
| `icon/on-accent` | `colors/base/white` | `colors/base/white` | Iconos sobre fondos de acento |
| `icon/invert` | `colors/base/white` | `colors/slate/900` | Iconos sobre fondos invertidos |
| `icon/disable` | `colors/slate/300` | `colors/slate/600` | Iconos deshabilitados |

---

## Semantics — ilustraciones (4)

Colores exclusivos para ilustraciones decorativas. Separados de la UI. Mismo valor en Light y Dark.

| Token | Light = Dark | Uso |
|-------|-------------|-----|
| `ilustraciones/background` | `brand/blue-light` (#E6F1FD) | Fondo de la ilustración |
| `ilustraciones/details` | `brand/electric-blue` (#00A0FF) | Detalles y highlights |
| `ilustraciones/contorn` | `brand/navy` (#1B306C) | Contornos / líneas |
| `ilustraciones/clothes` | `brand/blue-sky` (#B4D5FF) | Ropa / elementos secundarios |

---

## Variables de spacing

Colección: `TailwindCSS/spacing` — 35 valores. Escala Tailwind exacta.

| Nombre | Valor | Clase Tailwind |
|--------|-------|----------------|
| `0` | 0px | `p-0`, `m-0`, `gap-0` |
| `1` | 4px | `p-1`, `m-1`, `gap-1` |
| `2` | 8px | `p-2`, `m-2`, `gap-2` |
| `3` | 12px | `p-3`, `m-3`, `gap-3` |
| `4` | 16px | `p-4`, `m-4`, `gap-4` |
| `5` | 20px | `p-5`, `m-5`, `gap-5` |
| `6` | 24px | `p-6`, `m-6`, `gap-6` |
| `8` | 32px | `p-8`, `m-8`, `gap-8` |
| `10` | 40px | `p-10`, `m-10`, `gap-10` |
| `12` | 48px | `p-12`, `m-12`, `gap-12` |
| `16` | 64px | `p-16`, `m-16`, `gap-16` |
| `20` | 80px | `p-20`, `m-20`, `gap-20` |

---

## Variables de border-radius

Colección: `TailwindCSS/border-radius`

| Nombre | Valor | Clase Tailwind |
|--------|-------|----------------|
| `none` | 0px | `rounded-none` |
| `sm` | 2px | `rounded-sm` |
| `DEFAULT` | 4px | `rounded` |
| `md` | 6px | `rounded-md` |
| `lg` | 8px | `rounded-lg` |
| `xl` | 12px | `rounded-xl` |
| `2xl` | 16px | `rounded-2xl` |
| `3xl` | 24px | `rounded-3xl` |
| `full` | 9999px | `rounded-full` |

**Guía de uso en Airpals:**
- Inputs → `rounded-lg` (8px)
- Cards → `rounded-xl` o `rounded-2xl`
- Badges / pills → `rounded-full`
- Modales → `rounded-2xl`
- Botones → `rounded-lg` o `rounded-xl`

---

## Variables de border-width

Colección: `TailwindCSS/border-width`

| Nombre | Valor | Clase Tailwind |
|--------|-------|----------------|
| `0` | 0px | `border-0` |
| `DEFAULT` | 1px | `border` |
| `2` | 2px | `border-2` |
| `4` | 4px | `border-4` |
| `8` | 8px | `border-8` |

**Guía de uso en Airpals:**
- Inputs → `border` (1px default)
- Input selected / focus → `border-2` con `border/accent`
- Cards → `border` con `border/primary`
- Tabla → `border` con `border/primary`

---

## Tipografía — Text Styles

**Fuentes:** Lexend (headings) + Inter (body)

| Estilo Figma | Tamaño/LH | Clase Tailwind | Uso |
|-------------|-----------|----------------|-----|
| `Heading 1` | 36/40 | `text-4xl font-semibold` | Títulos de página |
| `Heading 2` | 30/36 | `text-3xl font-semibold` | Secciones principales |
| `Heading 3` | 24/28 | `text-2xl font-semibold` | Subsecciones |
| `Heading 4` | 20/24 | `text-xl font-semibold` | Card titles, modal headers |
| `Body Large/Regular` | 18/24 | `text-lg font-normal` | Texto corrido largo |
| `Body Large/Medium` | 18/24 | `text-lg font-medium` | Labels importantes |
| `Body Large/SemiBold` | 18/24 | `text-lg font-semibold` | Énfasis en body large |
| `Body Medium/Regular` | 16/20 | `text-base font-normal` | Texto principal de UI |
| `Body Medium/Medium` | 16/20 | `text-base font-medium` | Labels, valores de dato |
| `Body Medium/SemiBold` | 16/20 | `text-base font-semibold` | Encabezados de tabla, datos importantes |
| `Body Small/Regular` | 14/20 | `text-sm font-normal` | Texto secundario, helper text |
| `Body Small/Medium` | 14/20 | `text-sm font-medium` | Labels pequeños |
| `Caption/Regular` | 12/20 | `text-xs font-normal` | Timestamps, metadata |
| `Caption/Medium` | 12/20 | `text-xs font-medium` | Badges, tags, status chips |

> ⚠️ **Pendiente:** Renombrar `Dashboard Title · 18/Auto` → definir rol exacto (Label/Large, Heading 5 o Subtitle).

---

## Grises — decisión de diseño

Airpals usa **Tailwind slate** (no gray, no zinc).

**Razón:** Primary blue `#0043FF` + slate = paleta fría coherente. Igual que Linear y Vercel.

Los 5 grises originales del proyecto (`Gray-default`, `Gray-normal`, `Gray-light`, `Gray-disable`, `Gray-lighter`) fueron mapeados a slate y eliminados de Primitives. En su lugar, los Semantics apuntan directo a `TailwindCSS/colors/slate/*`.
