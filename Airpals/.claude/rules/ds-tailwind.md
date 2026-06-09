# Airpals DS — Reglas Tailwind v3

> Cargar cuando: escribes código React/Next.js, defines clases Tailwind, o exportas diseño a código.
> Stack: Next.js + Tailwind v3. Las clases Tailwind son el lenguaje de implementación del DS.

---

## Regla fundamental

**Figma define el diseño. Tailwind implementa el código. No tienen que coincidir en nomenclatura.**

```
Figma: "Heading 1"  →  código: text-4xl font-semibold leading-10
Figma: "border/primary"  →  código: border-slate-200
```

El dev traduce Figma → Tailwind usando este archivo como guía.

---

## Colores — mapeo de tokens a clases

### Brand colors (custom en tailwind.config.js)

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      brand: {
        blue:       '#0043FF',
        pink:       '#FC4575',
        navy:       '#1B306C',
        'blue-light': '#E6F1FD',
        'blue-sky': '(confirmar hex)',
      }
    }
  }
}
```

Clases generadas: `bg-brand-blue`, `text-brand-navy`, `border-brand-blue`, etc.

### Semantic tokens → clases Tailwind

#### Background
| Token | Light mode | Dark mode |
|-------|-----------|-----------|
| `background/primary` | `bg-white` | `dark:bg-slate-900` |
| `background/secondary` | `bg-brand-blue-light` | `dark:bg-slate-800` |
| `background/tertiary` | `bg-brand-blue-sky` | `dark:bg-slate-700` |
| `background/accent` | `bg-brand-blue` | `dark:bg-brand-blue` |
| `background/accent-subtle` | `bg-indigo-100` | `dark:bg-indigo-950` |

#### Text
| Token | Light mode | Dark mode |
|-------|-----------|-----------|
| `text/primary` | `text-brand-navy` | `dark:text-slate-50` |
| `text/secondary` | `text-slate-600` | `dark:text-slate-400` |
| `text/tertiary` | `text-slate-500` | `dark:text-slate-400` |
| `text/disable` | `text-slate-300` | `dark:text-slate-600` |
| `text/accent` | `text-brand-blue` | `dark:text-brand-blue-light` |
| `text/on-accent` | `text-white` | `dark:text-white` |
| `text/invert` | `text-white` | `dark:text-slate-900` |

#### Border
| Token | Light mode | Dark mode |
|-------|-----------|-----------|
| `border/primary` | `border-slate-200` | `dark:border-slate-700` |
| `border/secondary` | `border-slate-300` | `dark:border-slate-800` |
| `border/accent` | `border-brand-blue` | `dark:border-brand-blue` |

#### Icon
| Token | Light mode | Dark mode |
|-------|-----------|-----------|
| `icon/primary` | `text-brand-navy` | `dark:text-slate-200` |
| `icon/secondary` | `text-slate-500` | `dark:text-slate-500` |
| `icon/tertiary` | `text-slate-300` | `dark:text-slate-400` |
| `icon/accent` | `text-brand-blue` | `dark:text-brand-blue` |
| `icon/disable` | `text-slate-300` | `dark:text-slate-600` |

---

## Tipografía — clases por text style

| Figma | Clase Tailwind completa |
|-------|------------------------|
| Heading 1 | `text-4xl font-semibold leading-10` |
| Heading 2 | `text-3xl font-semibold leading-9` |
| Heading 3 | `text-2xl font-semibold leading-7` |
| Heading 4 | `text-xl font-semibold leading-6` |
| Body Large/Regular | `text-lg font-normal leading-6` |
| Body Large/Medium | `text-lg font-medium leading-6` |
| Body Large/SemiBold | `text-lg font-semibold leading-6` |
| Body Medium/Regular | `text-base font-normal leading-5` |
| Body Medium/Medium | `text-base font-medium leading-5` |
| Body Medium/SemiBold | `text-base font-semibold leading-5` |
| Body Small/Regular | `text-sm font-normal leading-5` |
| Body Small/Medium | `text-sm font-medium leading-5` |
| Caption/Regular | `text-xs font-normal leading-5` |
| Caption/Medium | `text-xs font-medium leading-5` |

---

## Spacing — escala y clases

La escala es idéntica a Tailwind por defecto. El nombre del token ES el número de la clase.

```
spacing/4 en Figma → gap-4, p-4, m-4, px-4, py-4... en código
```

### Padding estándar por tipo de elemento

| Elemento | Padding |
|----------|---------|
| Card | `p-4` (16px) o `p-6` (24px) |
| Tabla header/cell | `px-4 py-3` |
| Botón small | `px-3 py-1.5` |
| Botón default | `px-4 py-2` |
| Botón large | `px-6 py-3` |
| Input | `px-3 py-2` |
| Sidebar item | `px-3 py-2` |
| Modal | `p-6` |
| Page container | `px-6 py-4` o `px-8 py-6` |

---

## Border radius — clases y uso

| Clase | Radio | Usar en |
|-------|-------|---------|
| `rounded-none` | 0 | Separadores, tablas sin radius |
| `rounded` | 4px | Elementos pequeños inline |
| `rounded-md` | 6px | Badges, tags pequeños |
| `rounded-lg` | 8px | Inputs, botones, chips |
| `rounded-xl` | 12px | Cards, dropdowns |
| `rounded-2xl` | 16px | Modales, panels grandes |
| `rounded-3xl` | 24px | Elementos hero / destacados |
| `rounded-full` | 9999px | Avatares, pills de status |

---

## Border width — clases y uso

| Clase | Grosor | Usar en |
|-------|--------|---------|
| `border-0` | 0px | Remover borde |
| `border` | 1px | Cards, inputs default, tablas |
| `border-2` | 2px | Input focus/selected, elementos activos |
| `border-4` | 4px | Raras veces — énfasis visual fuerte |

---

## Shadows (no en Tailwind DS por defecto)

Airpals usa shadows sutiles estilo Linear:

```
shadow-sm  → cards en hover
shadow-md  → modales, dropdowns
shadow-lg  → command palette, popovers
```

No usar `shadow-xl` o `shadow-2xl` — demasiado pesado para B2B dashboard.

---

## Patrones de componente frecuentes

### Card base
```html
<div class="bg-white border border-slate-200 rounded-xl p-4 dark:bg-slate-900 dark:border-slate-700">
  <!-- contenido -->
</div>
```

### Input base
```html
<input class="w-full border border-slate-200 rounded-lg px-3 py-2 text-base
              text-brand-navy placeholder:text-slate-300
              focus:outline-none focus:border-2 focus:border-brand-blue
              dark:bg-slate-900 dark:border-slate-700 dark:text-slate-50" />
```

### Badge de status
```html
<!-- Delivered -->
<span class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700">
  Delivered
</span>

<!-- In Transit -->
<span class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-amber-50 text-amber-700">
  In Transit
</span>

<!-- Failed -->
<span class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-red-50 text-red-700">
  Failed
</span>
```

### Botón primario
```html
<button class="bg-brand-blue text-white font-medium text-sm px-4 py-2 rounded-lg
               hover:opacity-90 transition-opacity
               disabled:opacity-50 disabled:cursor-not-allowed">
  New Shipment
</button>
```

### Sidebar item
```html
<!-- Default -->
<a class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600
          hover:bg-brand-blue-light hover:text-brand-navy transition-colors">
  <!-- icon + label -->
</a>

<!-- Active -->
<a class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
          bg-brand-blue-light text-brand-navy">
  <!-- icon + label -->
</a>
```

---

## tailwind.config.js — configuración mínima recomendada

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          blue:         '#0043FF',
          pink:         '#FC4575',
          navy:         '#1B306C',
          'blue-light': '#E6F1FD',
          'blue-sky':   '(confirmar hex)',
        },
      },
      fontFamily: {
        heading: ['Lexend', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

---

## Reglas de código — NO hacer

```
❌ No usar hex fijo en className: text-[#0043FF]
❌ No usar valores arbitrarios de spacing: p-[13px]
❌ No mezclar Tailwind con CSS inline para colores
❌ No usar clases de Tailwind que no existen: border-1 (usar border)
❌ No usar gray cuando el DS usa slate
```

```
✅ Usar clases de la escala nativa: p-4, gap-6
✅ Usar brand colors del config: bg-brand-blue
✅ Usar tokens semánticos de slate: text-slate-600
✅ dark: prefix para dark mode
```
