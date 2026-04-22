# Utransfer — Contexto para Cleo

**uTransfer** es una billetera digital global (iOS + Android) para enviar dinero con stablecoins bajo el capó — el usuario siempre ve su moneda local. Mercado: Ecuador y Latinoamérica.

- **Figma:** Archivo `Utransfer v2` · Librería `Utransfer_D_S`
- **Figma CLI:** `/Users/mau/Developer/Claude/figma-cli` → `node src/index.js connect`
- **Frame mobile:** 393×852px
- **Última auditoría DS:** 2026-04-14 — Calificación global **B (79/100)**

---

## Reglas críticas — siempre aplicar

1. **Tokens semánticos SIEMPRE** — usar `🧩 Tokens` en componentes. Nunca primitivos, nunca hex fijo.
2. **Variables bindeadas** — fills, radius y spacing con `setBoundVariable`, no valores manuales.
3. **Spacing con variables** — `itemSpacing` y `padding*` con `⊢⊣ Spacing`. Nunca px hardcodeados.
4. **FILL después de appendChild** — `layoutSizingHorizontal = 'FILL'` solo tras agregar al padre.
5. **Importar TODO antes de crear frames** — fuentes, variables y componentes primero; nodos después.
6. **Limpiar al inicio de cada script** — borrar nodos con el mismo nombre antes de crear nuevos.
7. **Componentes del DS siempre** — revisar `rules/ds-catalog.md` antes de crear cualquier frame custom. Si existe un componente en `Utransfer_D_S`, instanciarlo — no reinventarlo.
8. **Text styles siempre** — usar `importStyleByKeyAsync` + `setTextStyleIdAsync`. Nunca `fontSize` manual.
9. **Touch targets** — gap mínimo `Spacing-5 (16px)` entre elementos clicleables. Preferible `Spacing-6 (20px)`.
10. **Input properties por contexto** — activar solo Label, Left Icon, Right Icon, Helper Text si tienen función real en esa pantalla.

---

## Pre-flight de spacing — copiar al inicio de cada script

```javascript
// ── SPACING TOKENS (⊢⊣ Spacing · Utransfer_D_S) ──────────────────
// Copiar este bloque al inicio de todo script de layout.
// Nunca usar px hardcodeados — siempre bindear con setBoundVariable.
const spacingIds = {
  0:   'VariableID:8304f26602e5bbc20ac8ca184d49c63889ec57cb/40006136:101', // 0px
  2:   'VariableID:da46f2aeefd7a99c70256de91a7fb51a93f8dc98/40006136:102', // 2px
  4:   'VariableID:a76ac5afaf32fc7db440de629558bd67512ab705/40006136:103', // 4px
  8:   'VariableID:c5eb1187ed05c87e0390d6245983d582fe4f8728/40006136:104', // 8px  Spacing-3
  12:  'VariableID:6a12f53ee51dc9af1f5c95a6108169f48bef89d1/40006136:105', // 12px Spacing-4
  16:  'VariableID:fc630c4b3648e68ab3fc1f74a76dc49f812f7bda/40006136:106', // 16px Spacing-5
  20:  'VariableID:c0ea2be6cafced44153f35cd1a2e79b1d092e5b9/40006136:107', // 20px Spacing-6
  24:  'VariableID:12f7f87e25374c4dd6b48d3d90aadf75606fbf1b/40006136:108', // 24px Spacing-7
  28:  'VariableID:69785bd54384522536cf29390551a27c91b574e5/40006136:109', // 28px Spacing-8
  32:  'VariableID:19b54d8ecd9c97d10ccee305f2e1e3621f240c01/40006136:110', // 32px Spacing-9
  40:  'VariableID:4d115ce03bbc45fd224c088c4b7e2baa73db6606/40006136:111', // 40px Spacing-10
  44:  'VariableID:31e894afd47f928f90d52d2b14eb3d4303f3ac19/40006136:112', // 44px Spacing-11
  48:  'VariableID:a89824708d196ca7252ee93fe953a4caac5a98bc/40006136:113', // 48px Spacing-12
  56:  'VariableID:9aa81a0302c99453853393c3f594c82d0bc80b71/40006136:114', // 56px Spacing-13
  64:  'VariableID:d2b60f936a773a12a66b33e8ef712a6e68323967/40006136:115', // 64px Spacing-14
  72:  'VariableID:e5745dbb4d7523e0d8c15c3103ed2f97d3265bb0/40006136:116', // 72px Spacing-15
  80:  'VariableID:b4fe8e466a683a75354cf65416ac91813cae5f51/40006136:117', // 80px Spacing-16
  96:  'VariableID:3a9ae7ca85ab9a457f5678711ec14e9cc0343977/40006136:118', // 96px Spacing-17
  112: 'VariableID:d018a6f526c56af56545414960268a663892c794/40006136:119', // 112px Spacing-18
  120: 'VariableID:7767770bd2211f19665968831c46abfc64e6f398/40006136:120', // 120px Spacing-19
  128: 'VariableID:1dee01657d68f707866dcaba07cdabf640dbe90a/40006136:121', // 128px Spacing-20
};
async function s(px) {
  return await figma.variables.getVariableByIdAsync(spacingIds[px]);
}

// Uso:
// node.setBoundVariable('paddingTop',    await s(16));
// node.setBoundVariable('paddingRight',  await s(20));
// node.setBoundVariable('paddingBottom', await s(16));
// node.setBoundVariable('paddingLeft',   await s(20));
// node.setBoundVariable('itemSpacing',   await s(12));
```

---

## Componentes más usados — referencia rápida

> Lista completa en `rules/ds-catalog.md`. Keys en `rules/ds-keys.md`.

| Componente | Key | Notas |
|------------|-----|-------|
| **Status bar · Light** | `222088d248a045f3d2e7df151f7d613bbda7fafd` | `importComponentByKeyAsync` · siempre primero en el screen |
| **Status bar · Dark** | `74f11501df265b2a4b7fdb151bb9e6086d598262` | — |
| **Button Giant Primary** | `15be15cfa0d8c4667e4eb8f84bf80f9919e019c9` | FILL después de appendChild |
| **Button Giant Clear** | `c4757e2398d2f767b0b188296d6efe17d15e1b9c` | Acción secundaria sin fondo |
| **Button Small Secondary** | `374f68a8516d0d8f21ae880e54dd7b07db5eb69a` | Pills compactos (currency, etc.) |
| **Input Default Large** | `85a6f7f74d08b5dbc46d9593345f458eca417bff` | Ver props en ds-components.md |
| **Avatar Initials 64** | `806cf30500b782fe99e767c5148858538b0bdaa9` | 80×80px real |
| **Home Indicator** | `e12f73d63ccef0537a22efd9a34228a9dc441bff` | Siempre al final del screen |
| **Divider horizontal** | `3b8ea15e6f8e5410181509a43c329036681099c5` | — |

**Text styles más usados:**

| Estilo | Key |
|--------|-----|
| Headers/H3 (28px) | `41243533aec36fb477c160301ba9c854ebaf0c01` |
| Headers/H5 (20px) | `a761967b66cd94663df9cacbe06c32f68b48b7e7` |
| Subtitle/Subtitle M (16px) | `df46c8797813b902f6164fa2ea73a2e58e0b13df` |
| Caption/Caption 1 (12px) | `3c4a22b5a0d0e65480fea3cbc965b935ee9a610c` |

```javascript
// Aplicar text style — SIEMPRE async
const style = await figma.importStyleByKeyAsync('KEY');
await textNode.setTextStyleIdAsync(style.id);
```

---

## Propiedades del Input — activar solo lo necesario

```javascript
input.setProperties({
  'Label#64:6':       false,  // etiqueta encima del campo — solo si hay varios inputs juntos
  'Left Icon#64:7':   false,  // ícono izquierdo — solo si identifica el tipo de dato
  'Right Icon#64:4':  false,  // chevron/ícono derecho — solo si hay dropdown real
  'Helper Text#64:5': false,  // texto de ayuda — solo si hay validación o explicación necesaria
  'Edit-title#479:4': 'Label text',       // texto del label (si Label=true)
  'Edit-input#479:78': 'Placeholder...',  // placeholder
  'Edit-help#479:41': 'Helper text',      // helper (si Helper Text=true)
});
```

---

## Cuándo cargar qué archivo

| Tarea | Archivo a leer |
|-------|----------------|
| **Diseñar una pantalla en Figma** ⚠️ | `rules/ds-catalog.md` **SIEMPRE PRIMERO** — usar componentes de la librería `Utransfer_D_S`, nunca frames custom |
| Reglas completas del DS, flujo de script, errores comunes | `rules/figma-design-system.md` |
| Tokens de color (Text, Border, Status, Backgrounds, etc.) + scopes + IDs | `rules/ds-tokens.md` |
| Componentes: variantes, estados, keys, props, pendientes | `rules/ds-components.md` |
| **Keys verificados** de componentes para scripts Figma | `rules/ds-keys.md` ← **cargar antes de cualquier script** |
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
