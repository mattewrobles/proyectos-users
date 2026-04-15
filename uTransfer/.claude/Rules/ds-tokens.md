# uTransfer DS — Tokens de color semánticos

> Cargar cuando: aplicas fills, colores de texto, bordes, backgrounds o status en componentes.
> Colección en Figma: `🧩 Tokens` — 115 variables COLOR. NUNCA usar primitivos ni hex fijo.

---

## Scopes configurados (2026-04-14)

Los scopes limitan los tokens al picker correcto en Figma — el token solo aparece donde tiene sentido:

| Categoría | Scope en Figma | Descripción |
|-----------|---------------|-------------|
| `Text/*` | `TEXT_FILL` | Solo en pickers de color de texto |
| `Icon/*` | `SHAPE_FILL` + `STROKE_COLOR` | Solo en iconos (shapes y strokes) |
| `Border/*` | `STROKE_COLOR` | Solo en strokes / bordes |
| `Backgrounds/*` | `FRAME_FILL` + `SHAPE_FILL` | Solo en fondos de frames |
| `Cards-Fills/*` | `FRAME_FILL` + `SHAPE_FILL` | Solo en fondos de cards |
| `status/*/text` | `TEXT_FILL` | Solo en texto de mensajes de estado |
| `status/*` (base) | `STROKE_COLOR` + `FRAME_FILL` + `SHAPE_FILL` | Bordes y fondos de estado |
| `action/*` | Específico por sub-token | FRAME_FILL o TEXT_FILL según corresponda |
| `🧩 Components/*` | Específico por sub-token | Fill/text/stroke según el sub-token |

---

## Texto — usar SOLO para color de texto

| Token | Uso | ID (VariableID) |
|-------|-----|-----------------|
| `Text/Primary` | Headings, texto principal (oscuro en light, claro en dark) | `40006006:5998` |
| `Text/Primary-normal` | Body normal | — |
| `Text/secondary` | Labels, subtítulos, texto de apoyo | `40006007:6134` |
| `Text/disabled` | **Placeholder, helper text, iconos inactivos** (N400 light / N600 dark) | `40006421:3902` |
| `Text/Invert` | Texto sobre fondos oscuros (modales dark) | `40006007:6132` |
| `Text/On-brand` | Texto sobre fondo de marca (blanco en ambos modos) | — |
| `Text/Branding-text` | Color de marca en texto | — |
| `Text/on-tint` | **Texto sobre backgrounds de status** — siempre oscuro en ambos modos | `40006424:11128` |
| `Text/Oppacity/Secondary` | Texto sutil | — |
| `Text/Oppacity/Tertiary` | Texto muy sutil | — |
| `Text/Oppacity/Quaternary` | Texto mínimo | — |
| `Text/Labels - Vibrant/Primary` | Labels vibrantes | — |

> ⚠️ **`Text/on-tint` es especial:** apunta a `Neutral/N900` en AMBOS modos (light y dark). Usar cuando el background es un tint de status (success/warning/error/info) que no cambia con el modo — el texto siempre debe quedar oscuro para tener contraste suficiente.
>
> **Caso de uso concreto:** Input en estado `Filled + Success/Warning/Info/Error` — el fondo tintado es claro en ambos modos, así que el texto del usuario debe ser `Text/on-tint` (nunca `Text/Primary` que en dark mode se vuelve blanco y pierde contraste).

---

## Fondos — usar en fills de frames y shapes

| Token | Uso |
|-------|-----|
| `Backgrounds/Background` | Fondo base de la app (más profundo) |
| `Backgrounds/BG-Normal` | Fondo normal de pantallas |
| `Backgrounds/Foreground` | Superficie principal — **pantallas y screens** |
| `Backgrounds/Bg-glass` | Glass para nav flotante / botón glass |
| `Backgrounds/Bg-glass 2` | Glass para **modales y dialogs** |
| `Backgrounds/Primary - Elevated` | Superficie elevada primaria |
| `Backgrounds/Secondary - Elevated` | Superficie elevada secundaria |

---

## Cards y fills — para cards, modales, ítems de lista

| Token | Uso |
|-------|-----|
| `Cards-Fills/Card` | Card principal (balance, modales sólidos) |
| `Cards-Fills/Normal/Primary` | Quick actions, ítems interactivos |
| `Cards-Fills/Normal/Secondary` | Ítems de lista |
| `Cards-Fills/Normal/Tertiary` | Sub-ítems |
| `Cards-Fills/Vibrant/Primary` | Solo en Juegos/Rewards |

---

## Bordes — usar SOLO en strokes

| Token | Uso |
|-------|-----|
| `Border/Primary` | Borde principal (hover en inputs) |
| `Border/Secondary` | Borde secundario (dividers) |
| `Border/Divider` | Divider suave entre ítems |
| `Border/Brand` | Borde color marca (botones outline) |
| `Border/Vibrant` | Borde vibrante |
| `Border/focus` | **Borde de focus state — azul brand** |

---

## Iconos — usar en shapes y strokes de iconos

| Token | Uso |
|-------|-----|
| `Icon/Primary` | Iconos estándar |
| `Icon/Positive` | Iconos de éxito |
| `Icon/Invert` | Sobre fondos oscuros |
| `Icon/Brand` | Color marca |
| `Icon/disabled` | **Iconos en estado desactivado** |
| `Icon/on-dark` | **Icono sobre fondo siempre oscuro** |
| `Icon/on-light` | **Icono sobre fondo siempre claro** |
| `Icon/secondary` | **Iconos de apoyo / secundarios** |

---

## Status tokens — para estados de éxito, error, info, warning

| Token | Scope | Uso |
|-------|-------|-----|
| `status/success` | Stroke + Fill | Color verde éxito (border y fill de estado) |
| `status/success/text` | Text | Texto de mensaje de éxito |
| `status/danger` | Stroke + Fill | Color rojo error |
| `status/danger/text` | Text | Texto de mensaje de error |
| `status/warning` | Stroke + Fill | Color amarillo advertencia |
| `status/warning/text` | Text | Texto de mensaje de advertencia |
| `status/info` | Stroke + Fill | Color azul información |
| `status/info/text` | Text | Texto de mensaje informativo |

---

## Generales

| Token | Uso |
|-------|-----|
| `Generals/Primary` | Color principal de marca |
| `Generals/Input` | Fondo de inputs |

---

## Componentes — tokens específicos de button/modal

| Token | Uso |
|-------|-----|
| `🧩 Components/↳ Button/↳ Primary/Primary` | Botón primario fondo |
| `🧩 Components/↳ Button/↳ Primary/Button-Text` | Texto botón primario |
| `🧩 Components/↳ Button/↳ Outline/Outline - Outline` | Borde outline |
| `🧩 Components/↳ Button/↳ Outline/Outline - Text & Icon` | Texto/icono outline |
| `🧩 Components/↳ Button/↳ Disabled/Disabled - Background` | Fondo disabled |
| `🧩 Components/↳ Button/↳ Disabled/Disabled - Icon & Text` | Texto/icono disabled |
| `🧩 Components/↳ Modal/Modal - Background` | Modal sólido |
| `🧩 Components/↳ Modal/Modal - Title` | Título modal |

---

## Effect styles (glass)

| Nombre | Key | Uso |
|--------|-----|-----|
| `Dialog` | `206d603d7fe94a4a4a5ec3d78805b70021c15a4c` | Modales / dialogs |
| `Button` | `af136631d5e760b54ca4761eb14934f945e6b587` | Botones glass |

```javascript
// Aplicar effect style de librería
const style = await figma.importStyleByKeyAsync('206d603d7fe94a4a4a5ec3d78805b70021c15a4c');
node.effectStyleId = style.id;
```

---

## Colecciones de spacing y radius

**Spacing (`⊢⊣ Spacing`):** Spacing-0 a Spacing-20
- Spacing-2 → gap mínimo (~4px)
- Spacing-3 → gap pequeño (~8px)
- Spacing-4 → gap medio-chico (~12px)
- Spacing-5 → gap medio (~16px)
- Spacing-6 → padding estándar (~20-24px)
- Spacing-8 → gap grande

**Radius (`⊙ Radius`):** none / xs / sm / md / lg / xl / 2xl / 3xl / 4xl / full
- `Radius-md` → inputs
- `Radius-xl` / `Radius-2xl` → cards, modales
- `Radius-full` → botones primarios (pill)

---

## Tokens añadidos en auditoría 2026-04-14

Estos tokens no existían y fueron creados/corregidos:

| Token | Primitivo light | Primitivo dark | Por qué |
|-------|----------------|----------------|---------|
| `Text/disabled` | `Neutral/N400` | `Neutral/N600` | Placeholder e iconos inactivos — color correcto |
| `Text/on-tint` | `Neutral/N900` | `Neutral/N900` | Texto sobre status backgrounds claros — siempre oscuro |
| `Icon/disabled` | — | — | Estado desactivado de iconos |
| `Icon/on-dark` | — | — | Icono sobre fondo siempre oscuro |
| `Icon/on-light` | — | — | Icono sobre fondo siempre claro |
| `Icon/secondary` | — | — | Iconos de apoyo / secundarios |
| `status/success` + `/text` | — | — | Estados semánticos de éxito |
| `status/danger` + `/text` | — | — | Estados semánticos de error |
| `status/warning` + `/text` | — | — | Estados semánticos de advertencia |
| `status/info` + `/text` | — | — | Estados semánticos de información |
| `Border/focus` | Brand blue | Brand blue | Borde azul para focus states |
| `Neutral/N950` | — | — | Primitivo para Foreground dark |
