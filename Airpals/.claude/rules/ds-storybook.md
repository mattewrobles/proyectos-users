# Airpals DS — Storybook & npm workflow

> Cargar cuando: trabajas en el código del design system (componentes React, tokens CSS, Storybook, publicación npm).

---

## Antes de tocar cualquier cosa — checklist

```bash
cd "/Users/mau/Developer/Projects/Airpals/design-system"
git pull origin main          # Jimmy también hace commits directo al repo
git log --oneline -5          # revisar si hay cambios suyos antes de empezar
```

**Jimmy** (dev de Airpals) tiene acceso de push al repo y trabaja en paralelo.
Si hay commits suyos → leerlos antes de hacer cualquier cambio propio.

---

## Path del repo

```
/Users/mau/Developer/Projects/Airpals/design-system/
```

Git remote → `https://github.com/mattewrobles/airpals-ds.git`
Push siempre desde esta carpeta.

---

## Estructura del repo

```
src/
  lib/           ← 21 componentes React exportables (los que instalan los devs)
  tokens/
    tokens.css   ← CSS custom properties — light mode + .dark para dark mode
  index.ts       ← barrel export: componentes + types
  components/    ← *.stories.tsx (documentación Storybook)
  foundations/   ← Typography, Colors, Spacing, Shadows, Changelog, GettingStarted
  shared/        ← helpers internos (no exportados)
.storybook/      ← config Storybook (main.ts + preview.ts)
.github/
  workflows/
    storybook.yml  ← Chromatic CI (se dispara en push a main)
package.json     ← versión npm actual
tailwind.config.js
yarn.lock        ← OBLIGATORIO para CI — no borrar, no ignorar
```

---

## Token system — regla irrompible

**Nunca hardcodear hex en componentes.** Siempre clases semánticas Tailwind:

| Grupo | Prefijo Tailwind | Ejemplo |
|-------|-----------------|---------|
| Backgrounds | `bg-surface-*` | `bg-surface-accent`, `bg-surface-error` |
| Texto | `text-ink-*` | `text-ink-primary`, `text-ink-on-accent` |
| Bordes | `border-line-*` | `border-line-accent`, `border-line-disable` |
| Iconos | `text-icon-*` | `text-icon-primary`, `text-icon-accent` |

Tokens definidos en `src/tokens/tokens.css` como CSS `var()`.
Dark mode automático con clase `.dark` en el root — los tokens cambian solos.

### Tokens disponibles

```
surface: primary · secondary · accent · accent-contrast · disable
         error · warning · success · info
ink:     primary · secondary · tertiary · disable · accent
         on-accent · invert · error · warning · success · info
line:    primary · secondary · accent · disable · focus
         error · warning · success · info
icon:    primary · secondary · accent · on-accent · disable
```

---

## Alert API (v0.3.0+)

```tsx
// ✅ CORRECTO
import { Alert } from 'airpals-ds'
import type { AlertUseCase } from 'airpals-ds'

<Alert useCase="success" title="Shipment created." />
<Alert useCase="error" title="Failed." border />
<Alert useCase="warning" title="Check address." description="Verify before saving." />

// ❌ MAL — API vieja (<= 0.2.x)
<Alert type="Error" title="..." />
```

`useCase`: `'error' | 'warning' | 'success' | 'info' | 'alert'`
`border`: boolean opcional — agrega borde izquierdo de color

---

## Props importantes a recordar

- **Alert:** `useCase` (no `type`), export → `AlertUseCase`
- **Avatar:** `size` = `'xs'|'sm'|'md'|'lg'|'xl'` (NO número), prop `badge` (NO `online`)
- **Badge:** `variant` = `'Fill'|'Outline'|'Duo Tone'`, colores = `Success|Danger|Warning|Info`
- **Toggle:** `style` = `'Standard'|'Navy'|'Subtle'`

---

## Crear o modificar un componente

### 1. Archivo en `src/lib/`

```tsx
// src/lib/MiComponente.tsx
export type MiComponenteVariant = 'primary' | 'secondary'

interface MiComponenteProps {
  variant?: MiComponenteVariant
  label: string
}

export function MiComponente({ variant = 'primary', label }: MiComponenteProps) {
  const classes: Record<MiComponenteVariant, string> = {
    primary: 'bg-surface-accent text-ink-on-accent',
    secondary: 'bg-surface-secondary text-ink-primary border border-line-primary',
  }

  return <div className={classes[variant]}>{label}</div>
}
```

### 2. Exportar en `src/index.ts`

```ts
export { MiComponente } from './lib/MiComponente'
export type { MiComponenteVariant } from './lib/MiComponente'
```

### 3. Story en `src/components/MiComponente.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { MiComponente } from '../lib/MiComponente'

const meta: Meta<typeof MiComponente> = {
  title: 'Components/MiComponente',
  component: MiComponente,
}
export default meta
type Story = StoryObj<typeof MiComponente>

export const Primary: Story = { args: { label: 'Ejemplo', variant: 'primary' } }
export const Secondary: Story = { args: { label: 'Ejemplo', variant: 'secondary' } }
```

---

## ¿Qué es automático y qué es manual?

| Acción | Cómo se dispara | Quién lo hace |
|--------|----------------|---------------|
| **Chromatic** (Storybook visual) | `git push origin main` → GitHub Actions lo lanza solo | **Automático** — no tocar nada |
| **npm** (`airpals-ds` package) | Comando manual `npm publish` | **Manual** — hacerlo cuando se quiere nueva versión |

**Regla práctica:**
- Subiste código a GitHub → Chromatic se actualiza solo en minutos
- Quieres que los devs tengan los cambios en `npm install` → hay que correr `npm publish` manualmente

---

## Publicar a npm

### Cuenta
- npm: `matthewrobles`
- Token en `~/.npmrc`

### Flujo completo

```bash
cd "/Users/mau/Developer/Projects/Airpals/design-system"

# 1. Hacer cambios en src/lib/

# 2. Bump versión en package.json (semver)
#    Patch x.x.↑  → bug fix, sin cambios de API
#    Minor x.↑.0  → componente nuevo o prop nueva, backwards compatible
#    Major ↑.0.0  → cambio de API que rompe uso existente

# 3. Actualizar Changelog
#    src/foundations/Changelog.stories.tsx → agregar entrada nueva arriba

# 4. Publicar (prepublishOnly corre build:lib automáticamente)
npm publish

# 5. Commit + push
git add package.json src/foundations/Changelog.stories.tsx
git commit -m "chore: bump version to x.x.x"
git push origin main
```

### Verificar que salió

```bash
npm view airpals-ds version
# o visitar https://www.npmjs.com/package/airpals-ds
```

---

## Storybook local

```bash
cd "/Users/mau/Developer/Projects/Airpals/design-system"
yarn storybook        # dev server en localhost:6006
yarn build-storybook  # build estático
```

---

## Chromatic CI

- Se dispara automáticamente en cada `git push origin main`
- Workflow: `.github/workflows/storybook.yml`
- Usa yarn (no npm) — `yarn install --frozen-lockfile`
- `yarn.lock` debe estar en la raíz — **no borrar nunca**
- Secret requerido: `CHROMATIC_AIRPALS_TOKEN` en GitHub repo settings
- Si falla: revisar que `@storybook/react-vite` esté en devDependencies

---

## Cómo usan los devs el paquete

```bash
npm install airpals-ds
# peer deps requeridos:
npm install react react-dom @heroicons/react @fontsource/inter @fontsource/lexend
```

### Next.js App Router setup

```ts
// next.config.ts
transpilePackages: ['airpals-ds'],
```

```css
/* globals.css — Tailwind v4 */
@import "@fontsource/inter/400.css";
@import "@fontsource/lexend/400.css";
@import "tailwindcss";
@source "../node_modules/airpals-ds/dist/index.mjs";
```

```css
/* globals.css — Tailwind v3 */
@import "@fontsource/inter/400.css";
@import "@fontsource/lexend/400.css";
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Componentes pendientes de migrar (auditoría Figma)

Existen en Figma, aún no en Storybook/npm:

| Componente | Prioridad |
|------------|-----------|
| Divider | alta |
| Icon Button | alta |
| Dialog / Modal | alta |
| Tables | alta |
| Accordion | media |
| Sidebar | media |
| Info Section | media |
| Card-info | media |
| Number Input Stepper | media |
| Button Double | baja |
| Rating | baja |
