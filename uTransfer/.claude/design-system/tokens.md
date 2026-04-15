# uTransfer — Token Reference

> Referencia completa de tokens semánticos del DS.
> Fuente: Figma `Utransfer_D_S` · 88 tokens de color (🧩 Tokens) + Spacing + Radius
>
> **Regla crítica:** Usar SIEMPRE tokens semánticos en componentes.
> Nunca hex fijo, nunca primitivos directos.

---

## Texto — `Text/`

| Token Figma | CSS var | Tailwind class | Uso |
|-------------|---------|----------------|-----|
| `Text/Primary` | `--text-primary` | `text-text-primary` | Headings, texto principal |
| `Text/Primary-normal` | `--text-primary-normal` | `text-text-normal` | Body normal |
| `Text/secondary` | `--text-secondary` | `text-text-secondary` | Labels, subtítulos |
| `Text/contrast` | `--text-contrast` | `text-text-contrast` | Texto sobre fondos de color |
| `Text/Invert` | `--text-invert` | `text-text-invert` | Texto sobre fondos claros |
| `Text/Branding-text` | `--text-branding` | `text-text-branding` | Color de marca |
| `Text/Text-Brand` | `--text-brand` | `text-text-brand` | Variante brand |
| `Text/Oppacity/Secondary` | `--text-opacity-secondary` | `text-text-opacity-secondary` | Sutil (60%) |
| `Text/Oppacity/Tertiary` | `--text-opacity-tertiary` | `text-text-opacity-tertiary` | Muy sutil (30%) |
| `Text/Oppacity/Quaternary` | `--text-opacity-quaternary` | `text-text-opacity-quaternary` | Mínimo (18%) |
| `Text/Labels - Vibrant/Primary` | `--text-vibrant-primary` | `text-text-vibrant-primary` | Labels vibrantes |

**Valores dark mode:**
- Primary: `#f2f2f2`
- Secondary: `#7c8287`
- Brand/Branding: `#d9016c`
- Invert: `#28292a`

---

## Fondos — `Backgrounds/`

| Token Figma | CSS var | Tailwind class | Uso |
|-------------|---------|----------------|-----|
| `Backgrounds/Background` | `--bg-background` | `bg-bg-background` | Fondo raíz de la app |
| `Backgrounds/BG-Normal` | `--bg-normal` | `bg-bg-normal` | Fondo normal de pantallas |
| `Backgrounds/Foreground` | `--bg-foreground` | `bg-bg-foreground` | **Pantallas principales** |
| `Backgrounds/Primary - Elevated` | `--bg-primary-elevated` | `bg-bg-primary-elevated` | Superficie elevada |
| `Backgrounds/Secondary - Elevated` | `--bg-secondary-elevated` | `bg-bg-secondary-elevated` | Superficie elevada 2 |
| `Backgrounds/Bg-glass` | `--bg-glass` | `bg-bg-glass` | Nav flotante, botones glass |
| `Backgrounds/Bg-glass 2` | `--bg-glass-2` | `bg-bg-glass-2` | **Modales / dialogs** |

**Jerarquía de capas (dark mode, más oscuro → más claro):**
```
#090909 → base app         (--bg-base)
#0d0d0e → background       (--bg-background)
#131415 → bg-normal        (--bg-normal)
#1a1a1b → foreground       (--bg-foreground)   ← pantallas aquí
#1c1d1e → card             (--card)             ← cards aquí
#1e1f20 → input            (--general-input)    ← inputs aquí
#222325 → primary elevated (--bg-primary-elevated)
```

### Glass effects (requieren `backdrop-blur`)
```tsx
// Nav flotante
<nav className="glass-nav rounded-full" />

// Modal
<div className="glass-modal rounded-2xl" />
```

---

## Bordes — `Border/`

| Token Figma | CSS var | Tailwind class | Valor dark mode |
|-------------|---------|----------------|-----------------|
| `Border/Primary` | `--border-primary` | `border-border-primary` | `rgba(255,255,255,0.12)` |
| `Border/Secondary` | `--border-secondary` | `border-border-secondary` | `rgba(255,255,255,0.06)` |
| `Border/Neutral` | `--border-neutral` | `border-border-neutral` | `rgba(255,255,255,0.08)` |
| `Border/Brand` | `--border-brand` | `border-border-brand` | `#d9016c` |
| `Border/Invert` | `--border-invert` | `border-border-invert` | `rgba(0,0,0,0.15)` |
| `Border/Vibrant` | `--border-vibrant` | `border-border-vibrant` | `#e6e6e6` |
| `Border/Non-opaque` | `--border-non-opaque` | `border-border-non-opaque` | `rgba(0,0,0,0.30)` |

**Cuándo usar cada borde:**
- `Border/Secondary` → divider entre items de lista (muy sutil)
- `Border/Primary` → borde de cards e inputs
- `Border/Brand` → inputs focused, botones outline

---

## Iconos — `Icon/`

| Token Figma | CSS var | Tailwind class | Uso |
|-------------|---------|----------------|-----|
| `Icon/Primary` | `--icon-primary` | `text-icon-primary` | Iconos estándar |
| `Icon/Positive` | `--icon-positive` | `text-icon-positive` | Éxito, confirmación |
| `Icon/Invert` | `--icon-invert` | `text-icon-invert` | Sobre fondos claros |
| `Icon/Brand` | `--icon-brand` | `text-icon-brand` | Color de marca |

---

## Cards / Fills — `Cards-Fills/`

| Token Figma | CSS var | Tailwind class | Uso |
|-------------|---------|----------------|-----|
| `Cards-Fills/Card` | `--card` | `bg-card` | **Card principal** (balance, info) |
| `Cards-Fills/Card-foreground` | `--card-foreground` | `bg-card-foreground` | Superficie sobre card |
| `Cards-Fills/Normal/Primary` | `--card-normal-primary` | `bg-card-normal-primary` | Quick actions, items |
| `Cards-Fills/Normal/Secondary` | `--card-normal-secondary` | `bg-card-normal-secondary` | Items de lista |
| `Cards-Fills/Normal/Tertiary` | `--card-normal-tertiary` | `bg-card-normal-tertiary` | Sub-items |
| `Cards-Fills/Normal/Quaternary` | `--card-normal-quaternary` | `bg-card-normal-quaternary` | Elementos de menor jerarquía |
| `Cards-Fills/Vibrant/Primary` | `--card-vibrant-primary` | `bg-card-vibrant-primary` | Solo en Juegos/Rewards |
| `Cards-Fills/Vibrant/Tertiary` | `--card-vibrant-tertiary` | `bg-card-vibrant-tertiary` | Variante vibrant sutil |

---

## Generales — `Generals/`

| Token Figma | CSS var | Tailwind class | Uso |
|-------------|---------|----------------|-----|
| `Generals/Primary` | `--general-primary` | `bg-general-primary` / `text-general-primary` | **CTA principal, brand** |
| `Generals/Input` | `--general-input` | `bg-general-input` | **Fondo de todos los inputs** |

---

## Componentes — `🧩 Components/`

### Button tokens
| Token Figma | CSS var | Valor |
|-------------|---------|-------|
| `Button/Primary/Primary` | `--btn-primary-bg` | `#d9016c` |
| `Button/Primary/Primary-hover` | `--btn-primary-bg-hover` | `#e6569d` |
| `Button/Primary/Button-Text` | `--btn-primary-text` | `#ffffff` |
| `Button/Primary/Secondary` | `--btn-secondary-bg` | glass 80% |
| `Button/Disabled/Disabled - Background` | `--btn-disabled-bg` | `#262626` |
| `Button/Disabled/Disabled - Icon & Text` | `--btn-disabled-text` | `#525252` |
| `Button/Outline/Outline - Outline` | `--btn-outline-border` | `#d9016c` |
| `Button/Outline/Outline - Text & Icon` | `--btn-outline-text` | `#d9016c` |

### Modal tokens
| Token Figma | CSS var | Valor |
|-------------|---------|-------|
| `Modal/Modal - Background` | `--modal-bg` | `rgba(20,20,22,0.92)` |
| `Modal/Modal - Title` | `--modal-title` | `#f2f2f2` |

---

## Spacing — `⊢⊣ Spacing`

| Token | CSS var | px | Tailwind |
|-------|---------|-----|---------|
| Spacing-0 | `--spacing-0` | 0 | `s-0` |
| Spacing-1 | `--spacing-1` | 2 | `s-1` |
| Spacing-2 | `--spacing-2` | 4 | `s-2` |
| Spacing-3 | `--spacing-3` | 8 | `s-3` |
| Spacing-4 | `--spacing-4` | 12 | `s-4` |
| Spacing-5 | `--spacing-5` | 16 | `s-5` |
| Spacing-6 | `--spacing-6` | 20 | `s-6` |
| Spacing-7 | `--spacing-7` | 24 | `s-7` |
| Spacing-8 | `--spacing-8` | 28 | `s-8` |
| Spacing-9 | `--spacing-9` | 32 | `s-9` |
| Spacing-10 | `--spacing-10` | 40 | `s-10` |
| Spacing-11 | `--spacing-11` | 44 | `s-11` |
| Spacing-12 | `--spacing-12` | 48 | `s-12` |
| Spacing-13 | `--spacing-13` | 56 | `s-13` |
| Spacing-14 | `--spacing-14` | 64 | `s-14` |
| Spacing-15 | `--spacing-15` | 72 | `s-15` |
| Spacing-16 | `--spacing-16` | 80 | `s-16` |
| Spacing-17 | `--spacing-17` | 96 | `s-17` |
| Spacing-18 | `--spacing-18` | 112 | `s-18` |
| Spacing-19 | `--spacing-19` | 120 | `s-19` |
| Spacing-20 | `--spacing-20` | 128 | `s-20` |

**Patrones de spacing frecuentes:**
- Gap entre items de lista: `s-3` (8px)
- Padding de cards: `s-5` (16px) o `s-6` (20px)
- Padding de pantalla: `s-6` (20px)
- Gap entre botón e input: `s-4` (12px)
- Touch target mínimo: `s-11` (44px)

---

## Radius — `⊙ Radius`

| Token | CSS var | px | Tailwind | Uso |
|-------|---------|-----|---------|-----|
| Radius-none | `--radius-none` | 0 | `rounded-none` | — |
| Radius-xs | `--radius-xs` | 4 | `rounded-xs` | Badges pequeños |
| Radius-sm | `--radius-sm` | 8 | `rounded-sm` | Elementos compactos |
| Radius-md | `--radius-md` | 12 | `rounded-md` | **Inputs** |
| Radius-lg | `--radius-lg` | 16 | `rounded-lg` | Cards secundarias |
| Radius-xl | `--radius-xl` | 20 | `rounded-xl` | **Cards principales** |
| Radius-2xl | `--radius-2xl` | 24 | `rounded-2xl` | **Cards grandes, modales** |
| Radius-3xl | `--radius-3xl` | 32 | `rounded-3xl` | Elementos prominentes |
| Radius-4xl | `--radius-4xl` | 40 | `rounded-4xl` | — |
| Radius-full | `--radius-full` | 9999 | `rounded-full` | **Botones pill** |

**Reglas:**
- Botones primarios → `rounded-full` SIEMPRE
- Cards → `rounded-xl` o `rounded-2xl`
- Inputs → `rounded-md`
- Modales → `rounded-2xl`
- Nav flotante → `rounded-full` o `rounded-2xl`
