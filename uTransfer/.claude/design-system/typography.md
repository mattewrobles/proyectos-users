# uTransfer — Typography Guide

> Fuente: Figma `Utransfer_D_S` · Text Styles · Familia: **Inter** (web)
>
> En iOS/Android se usan SF Pro y SF Compact (sistema).
> En web se usa únicamente **Inter** (Google Fonts).
>
> Import: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');`

---

## Text Styles del DS

| Nombre Figma | Tailwind class | px | Peso | Line-height | Uso |
|--------------|---------------|-----|------|-------------|-----|
| Headers/H3 | `text-h3 font-semibold` | 28px | 600 | 1.25 | Título principal de pantalla |
| Headers/H5 | `text-h5 font-medium` | 20px | 500 | 1.35 | Subtítulo de sección |
| Subtitle/Subtitle M | `text-subtitle-m font-medium` | 16px | 500 | 1.5 | Labels prominentes, subtítulos |
| Caption/Caption 1 | `text-caption` | 12px | 400 | 1.4 | Captions, hints |
| Body/Body SM | `text-body-sm` | 12px | 400 | 1.5 | Body de listas, descripciones |

> **Keys de importación en Figma:**
> - H3: `41243533aec36fb477c160301ba9c854ebaf0c01`
> - H5: `a761967b66cd94663df9cacbe06c32f68b48b7e7`
> - Subtitle M: `df46c8797813b902f6164fa2ea73a2e58e0b13df`
> - Caption 1: `3c4a22b5a0d0e65480fea3cbc965b935ee9a610c`
> - Body SM: `f62d08a99c5536e757c75e4620106c18c618a9d8`

---

## Escala tipográfica completa (para web)

```
Display  → 48px / 700 / lh 1.1    → hero, splash
H1       → 36px / 600 / lh 1.15   → título de sección grande
H2       → 32px / 600 / lh 1.2    → —
H3       → 28px / 600 / lh 1.25   → ✅ DS oficial — título de pantalla
H4       → 24px / 600 / lh 1.3    → —
H5       → 20px / 500 / lh 1.35   → ✅ DS oficial — subtitle de sección
Subtitle M → 16px / 500 / lh 1.5  → ✅ DS oficial — label prominente
Body MD  → 14px / 400 / lh 1.5    → body general
Body SM  → 12px / 400 / lh 1.5    → ✅ DS oficial — body de listas
Caption  → 12px / 400 / lh 1.4    → ✅ DS oficial — captions, hints
Caption SM → 10px / 400 / lh 1.4  → timestamps, metadata
```

---

## Combinaciones de color + texto más comunes

```tsx
// Título principal de pantalla
<h1 className="text-h3 font-semibold text-text-primary">Enviar dinero</h1>

// Subtítulo de sección
<h2 className="text-h5 font-medium text-text-primary">Selecciona método</h2>

// Label de input
<label className="text-subtitle-m font-medium text-text-secondary">Monto</label>

// Body de lista
<p className="text-body-sm text-text-secondary">Última transacción hace 2 min</p>

// Caption / hint
<span className="text-caption text-text-opacity-secondary">Solo USD, EUR y GBP</span>

// Monto principal (número grande)
<span className="text-h1 font-semibold text-text-primary">$1,250.00</span>

// Monto secundario / conversor
<span className="text-subtitle-m text-text-secondary">≈ S/. 4,625</span>

// Texto de marca
<span className="text-subtitle-m font-medium text-text-branding">Upoints</span>

// Estado positivo
<span className="text-caption text-icon-positive">+$50 recibido</span>

// Estado negativo / error
<span className="text-caption" style={{ color: 'var(--red-500)' }}>Fondos insuficientes</span>
```

---

## Jerarquía en pantallas típicas de uTransfer

### Pantalla Home
```
Balance principal → display o h1, font-bold, text-primary
  └── moneda / símbolo → h5, text-secondary
Sección "Quick actions" → caption, text-secondary
Nombre de acción → body-sm, font-medium, text-primary
```

### Pantalla Enviar
```
Header → h3, font-semibold, text-primary
Paso actual → caption, text-secondary
Campo de monto → display, font-bold (el número)
Label del campo → subtitle-m, text-secondary
Tasa de cambio → caption, text-opacity-secondary
Botón CTA → subtitle-m, font-semibold, white (hardcoded)
```

### Card de transacción
```
Nombre del contacto → body-sm, font-medium, text-primary
Fecha → caption, text-opacity-secondary
Monto → body-sm, font-semibold, text-primary o icon-positive
Estado → caption, text-secondary
```

### Modal / Dialog
```
Título → h5, font-semibold, text-primary
Descripción → body-sm, text-secondary
Valor destacado → h3, font-semibold, text-primary
```

---

## Cómo importar Inter (Next.js)

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
})

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`dark ${inter.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

```css
/* globals.css — agregar al inicio */
:root {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

## Reglas críticas

1. **Solo Inter en web** — nunca SF Pro/SF Compact (son fuentes iOS de sistema)
2. **Peso máximo: 700** — display y números grandes. Evitar 800+ 
3. **No usar bold en body** — body text siempre 400 o 500 (medium)
4. **Jerarquía de 3 niveles máximo** en una pantalla (H3 → Subtitle M → Caption)
5. **Color de texto = siempre token semántico** — nunca hex fijo en texto
