# uTransfer — Contexto para Cleo

**uTransfer** es una billetera digital global (iOS + Android) para enviar dinero con stablecoins bajo el capó — el usuario siempre ve su moneda local. Mercado: Ecuador y Latinoamérica.

- **Figma:** Archivo `Utransfer v2` · Librería `Utransfer_D_S`
- **Figma CLI:** `/Users/mau/Developer/Claude/figma-cli` → `node src/index.js connect`
- **Frame mobile:** 393×852px
- **Última auditoría DS:** 2026-04-14 — Calificación global **B (79/100)**

---

## Reglas críticas — siempre aplicar

1. **Tokens semánticos SIEMPRE** — usar `🧩 Tokens` en componentes. Nunca primitivos, nunca hex fijo.
2. **Variables bindeadas** — fills, radius y spacing con `setBoundVariable`, no valores manuales.
3. **Spacing con variables** — `itemSpacing` y `padding*` con `⊢⊣ Spacing`. Nunca frames vacíos de espaciado.
4. **FILL después de appendChild** — `layoutSizingHorizontal = 'FILL'` solo tras agregar al padre.
5. **Importar TODO antes de crear frames** — fuentes, variables y componentes primero; nodos después.
6. **Limpiar al inicio de cada script** — borrar nodos con el mismo nombre antes de crear nuevos.

---

## Cuándo cargar qué archivo

| Tarea | Archivo a leer |
|-------|----------------|
| **Diseñar una pantalla en Figma** ⚠️ | `rules/ds-catalog.md` **SIEMPRE PRIMERO** — usar componentes de la librería `Utransfer_D_S`, nunca frames custom |
| Reglas completas del DS, flujo de script, errores comunes | `rules/figma-design-system.md` |
| Tokens de color (Text, Border, Status, Backgrounds, etc.) + scopes + IDs | `rules/ds-tokens.md` |
| Componentes: variantes, estados, keys, props, pendientes | `rules/ds-components.md` |
| Escribir o correr scripts Figma CLI | `rules/figma-scripts.md` |
| UX, flujos, features, producto | `rules/product.md` |
| Referencias visuales o competidores | `rules/design-refs.md` |

---

## Referencia rápida — elementos más usados

| Elemento | Token fill | Radius |
|----------|-----------|--------|
| Pantalla principal | `Backgrounds/Foreground` | — |
| Card | `Cards-Fills/Card` | `Radius-xl` / `Radius-2xl` |
| Input | `Generals/Input` | `Radius-md` |
| Botón primario | `🧩 Components/↳ Button/↳ Primary/Primary` | `Radius-full` |
| Modal / Dialog | `Backgrounds/Bg-glass 2` | `Radius-2xl` |
| Placeholder / helper text | `Text/disabled` | — |
| Texto en filled status inputs | `Text/on-tint` ⚠️ | — |

---

## Auditoría DS — historial

| Fecha | Score | Nota | Cambios principales |
|-------|-------|------|---------------------|
| 2026-04-14 | 79/100 | B | Scopes en 115 tokens · 144 bindings en Input/SearchBar/Avatar · 40 componentes renombrados a PascalCase/inglés · Token `Text/on-tint` (siempre oscuro) · Tokens `status/*`, `Border/focus`, `Text/disabled`, `Icon/disabled`, `Icon/on-dark`, `Icon/on-light`, `Icon/secondary` |

### Pendientes para subir de B a A

- Propiedades en español: `Estado=`, `Texto=`, `Tema=` en Social Button, Notification Center, Card Swipe
- `Dark mode=True/False` manual en Transaction, Card, List → usar variables
- Duplicados: `Icon` (×2), `Tab Bar` (×2) — resolver manualmente
- `Property 1` genérica en Face ID Prompt, Visa, Tab Bar
- Emojis/flechas en Stepper y Stepper Icon variants
