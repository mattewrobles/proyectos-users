# uTransfer — Figma Design System Rules

> Reglas completas para implementar pantallas en Figma usando el DS de uTransfer.
> Cargar siempre al inicio de cualquier tarea de diseño en este proyecto.

---

## 1. Flujo requerido (no omitir ningún paso)

```
1. Conectar CLI              → node src/index.js connect
2. Verificar página activa   → node src/index.js canvas info
3. Importar recursos PRIMERO → variables + fuentes + componentes + text styles
4. Limpiar nodos anteriores  → borrar nodos con el mismo nombre
5. Construir nodos           → crear frames, textos, instancias
6. Verificar en pantalla     → node src/index.js verify (screenshot)
```

**IMPORTANTE:** Los pasos 3 y 4 SIEMPRE antes del paso 5. Si un import falla a mitad de construcción, el canvas queda con basura.

---

## 2. Reglas absolutas del DS

| Regla | Por qué |
|-------|---------|
| **Tokens semánticos SIEMPRE** — colección `🧩 Tokens` | Nunca primitivos directos, nunca hex fijo. Los tokens se adaptan a dark/light mode automáticamente. |
| **Variables bindeadas** — `setBoundVariable` | No asignar valores manuales a fills, radius ni spacing. Si el token cambia, el diseño se actualiza solo. |
| **Spacing con `⊢⊣ Spacing`** | Nunca frames vacíos de espaciado. Usar `itemSpacing` + `padding*` bindeados. |
| **FILL solo después de appendChild** | `layoutSizingHorizontal = 'FILL'` falla si el nodo no tiene padre con auto-layout. |
| **Limpiar antes de crear** | `page.children.filter(n => n.name === 'X').forEach(n => n.remove())` al inicio. |
| **Fuentes ANTES de crear TextNodes** | `figma.loadFontAsync` debe completarse antes de `figma.createText()`. |

---

## 3. Token reference — elementos principales

### Pantallas y fondos

| Elemento | Token fill | Radius | Effect style |
|----------|-----------|--------|--------------|
| Pantalla principal (screen) | `Backgrounds/Foreground` | — | — |
| Fondo base app | `Backgrounds/Background` | — | — |
| Card principal | `Cards-Fills/Card` | `Radius-xl` o `Radius-2xl` | — |
| Card secundaria | `Cards-Fills/Normal/Primary` | `Radius-xl` | — |
| Input | `Generals/Input` | `Radius-md` | — |
| Botón primario | `🧩 Components/↳ Button/↳ Primary/Primary` | `Radius-full` | — |
| Modal / Dialog | `Backgrounds/Bg-glass 2` | `Radius-2xl` | `Dialog` (key `206d603d...`) |
| Nav flotante / botón glass | `Backgrounds/Bg-glass` | `Radius-full` o `Radius-2xl` | `Button` (key `af136631...`) |

### Texto

| Jerarquía | Token |
|-----------|-------|
| Heading principal | `Text/Primary` |
| Body normal | `Text/Primary-normal` |
| Label / subtítulo | `Text/secondary` |
| Placeholder / helper text | `Text/disabled` |
| Texto sobre fondos de status (filled inputs) | `Text/on-tint` ⚠️ siempre oscuro en ambos modos |
| Texto sobre fondo oscuro | `Text/Invert` |
| Texto de marca | `Text/Branding-text` |
| Texto sutil | `Text/Oppacity/Secondary` |

### Bordes

| Uso | Token |
|-----|-------|
| Divider suave entre items | `Border/Secondary` |
| Borde de card o input (hover) | `Border/Primary` |
| Borde de botón outline | `Border/Brand` |
| Borde de focus state | `Border/focus` |
| Borde de estado success | `status/success` |
| Borde de estado error | `status/danger` |
| Borde de estado warning | `status/warning` |
| Borde de estado info | `status/info` |

---

## 4. Componentes — keys y uso

### Button (instancias)

```javascript
const btn = (await figma.importComponentByKeyAsync(
  '15be15cfa0d8c4667e4eb8f84bf80f9919e019c9' // Giant · Default · Primary
)).createInstance();
parent.appendChild(btn);
btn.layoutSizingHorizontal = 'FILL'; // DESPUÉS de appendChild

btn.setProperties({
  'Icon Left#34:8':  false,
  'Icon Right#34:7': false,
  'State':           'Default',
  'Style':           'Primary',
});
const label = btn.findAllWithCriteria({ types: ['TEXT'] })[0];
await figma.loadFontAsync(label.fontName);
label.characters = 'Depositar';
```

| Variante | Key |
|----------|-----|
| Giant · Default · Primary | `15be15cfa0d8c4667e4eb8f84bf80f9919e019c9` |
| Giant · Disabled · Primary | `c31e596f9c633e08cd3e492699bfa9f3d594313c` |
| Giant · Default · Clear | `c4757e2398d2f767b0b188296d6efe17d15e1b9c` |

### Input (instancias)

```javascript
const input = (await figma.importComponentByKeyAsync(
  '85a6f7f74d08b5dbc46d9593345f458eca417bff' // Default · Large · Outline
)).createInstance();
parent.appendChild(input);
input.layoutSizingHorizontal = 'FILL';

input.setProperties({
  'Label': 'Monto',           // texto real, no 'Label'
  'Placeholder': '0.00',
  'State': 'Inactive',        // 'Inactive' | 'Active' | 'Disabled'
});
```

### Status Bar

```javascript
// Usar getNodeByIdAsync, NO importComponentByKeyAsync
const statusBarComp = await figma.getNodeByIdAsync('1:916');
const statusBar = statusBarComp.createInstance();
screen.appendChild(statusBar);
statusBar.layoutSizingHorizontal = 'FILL';
```

### Text Styles

```javascript
// SIEMPRE setTextStyleIdAsync (async) — no textStyleId = (falla)
const style = await figma.importStyleByKeyAsync('41243533aec36fb477c160301ba9c854ebaf0c01');
await textNode.setTextStyleIdAsync(style.id);
```

| Estilo | Key | Tamaño |
|--------|-----|--------|
| Headers/H3 | `41243533aec36fb477c160301ba9c854ebaf0c01` | 28px |
| Headers/H5 | `a761967b66cd94663df9cacbe06c32f68b48b7e7` | 20px |
| Subtitle/Subtitle M | `df46c8797813b902f6164fa2ea73a2e58e0b13df` | 16px |
| Caption/Caption 1 | `3c4a22b5a0d0e65480fea3cbc965b935ee9a610c` | 12px |
| Body/Body SM | `f62d08a99c5536e757c75e4620106c18c618a9d8` | 12px |

---

## 5. Patrón base de script (plantilla)

```javascript
(async () => {
  // ── FASE 1: Importar todo ANTES de crear nodos ──────────────────
  const page = figma.root.children.find(p => p.name === 'Pruebas');
  await page.loadAsync();
  await figma.setCurrentPageAsync(page);

  // Limpiar
  page.children.filter(n => n.name === 'Mi Pantalla').forEach(n => n.remove());

  // Fuentes
  await Promise.all([
    figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' }), // con espacio
  ]);

  // Variables (en paralelo)
  const cols = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
  async function importVar(col, name) {
    const c = cols.find(c => c.name === col);
    const vs = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key);
    const v = vs.find(v => v.name === name);
    return v ? await figma.variables.importVariableByKeyAsync(v.key) : null;
  }

  const [bgFg, cardFill, textPrimary, radiusXl, spacing6] = await Promise.all([
    importVar('🧩 Tokens', 'Backgrounds/Foreground'),
    importVar('🧩 Tokens', 'Cards-Fills/Card'),
    importVar('🧩 Tokens', 'Text/Primary'),
    importVar('⊙ Radius', 'Radius-xl'),
    importVar('⊢⊣ Spacing', 'Spacing-6'),
  ]);

  // Componentes y styles
  const [btnComp, titleStyle] = await Promise.all([
    figma.importComponentByKeyAsync('15be15cfa0d8c4667e4eb8f84bf80f9919e019c9'),
    figma.importStyleByKeyAsync('41243533aec36fb477c160301ba9c854ebaf0c01'),
  ]);

  // ── FASE 2: Construir nodos ──────────────────────────────────────

  // Helpers de binding
  function vFill(v) {
    return [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.1 },
      boundVariables: { color: { type: 'VARIABLE_ALIAS', id: v.id } } }];
  }
  function bindRadius(node, rv) {
    ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius']
      .forEach(c => node.setBoundVariable(c, rv));
  }
  function bindPadding(node, v, overrides = {}) {
    ['paddingTop','paddingRight','paddingBottom','paddingLeft'].forEach(p => {
      node.setBoundVariable(p, overrides[p] || v);
    });
  }

  // Pantalla (393×852)
  const screen = figma.createFrame();
  screen.name = 'Mi Pantalla';
  screen.resize(393, 852);
  screen.layoutMode = 'VERTICAL';
  screen.primaryAxisSizingMode = 'FIXED';
  screen.counterAxisSizingMode = 'FIXED';
  screen.fills = vFill(bgFg);

  // Card
  const card = figma.createFrame();
  card.name = 'Card';
  card.layoutMode = 'VERTICAL';
  card.primaryAxisSizingMode = 'AUTO';
  card.counterAxisSizingMode = 'FIXED';
  card.resize(353, 100);
  card.fills = vFill(cardFill);
  bindRadius(card, radiusXl);
  bindPadding(card, spacing6);
  card.setBoundVariable('itemSpacing', spacing6);
  screen.appendChild(card);
  card.layoutSizingHorizontal = 'FILL';

  // Título
  const title = figma.createText();
  title.characters = 'Depositar';
  await title.setTextStyleIdAsync(titleStyle.id);
  title.fills = vFill(textPrimary);
  card.appendChild(title);
  title.layoutSizingHorizontal = 'FILL';

  // Botón
  const btn = btnComp.createInstance();
  card.appendChild(btn);
  btn.layoutSizingHorizontal = 'FILL';
  const label = btn.findAllWithCriteria({ types: ['TEXT'] })[0];
  await figma.loadFontAsync(label.fontName);
  label.characters = 'Continuar';

  screen.x = 100; screen.y = 100;
  figma.viewport.scrollAndZoomIntoView([screen]);
  return { ok: true, id: screen.id };
})()
```

---

## 6. Errores comunes y fixes

| Error | Fix |
|-------|-----|
| `Cannot call without loadAllPagesAsync` | `await page.loadAsync()` — nunca `loadAllPagesAsync` (muy lento) |
| `Cannot call set_currentPage` | `await figma.setCurrentPageAsync(page)` — no `figma.currentPage =` |
| `Cannot call set_textStyleId` | `await node.setTextStyleIdAsync(id)` — no `node.textStyleId =` |
| `HUG can only be set on auto-layout children` | No usar `'HUG'` en instancias sueltas — solo `'FILL'` o dejar por defecto |
| `counterAxisSizingMode FILL invalid` | Solo `'FIXED'` o `'AUTO'` — nunca `'FILL'` en counterAxis |
| `Invalid enum: END` | Usar `'MAX'` en vez de `'END'` para alineación de eje |
| `Execution timeout (90s)` | Evitar `findAll` con lambdas en árboles grandes. Usar IDs directos o limitar búsqueda a 2-3 niveles. |
| Basura en canvas al relanzar | Siempre limpiar nodos por nombre al inicio del script |

---

## 7. Páginas del archivo `Utransfer v2`

| Página | ID (si conocido) | Uso |
|--------|-----------------|-----|
| 🫆 Onboarding - Login | — | Login, Sign up, KYC, Reset |
| 🏠 Home - Operaciones | — | Home, envíos, depósito, ajustes |
| 📫 Mails | — | Templates email |
| 🤖 Juegos | — | Upoints, juegos, gift cards |
| 📲 Flow | — | User flows / diagramas |
| 📥 Borrador | — | WIP |
| 🎯 Benchmark | — | Referencias de competidores |
| **Pruebas** | — | **Sandbox — página de trabajo activa** |

---

## 8. Ilustraciones disponibles

| Nombre | Key |
|--------|-----|
| Wallet 01 (éxito / transferencia) | `e4b09f3c3b1242ba4e786d74396977f94498e2de` |
| Wallet 02 | `c9a29cc971143518f852091ee93c6391b7c52891` |
| Wallet 03 | `fc260a0441f985f02ae6193e57576321541435cc` |
| Not Found / Error | `b2f3e10b80c3cbb1bfd1532a86e9869dcd1e154e` |
| Messages 01 | `e7bcee81839f88e9958f207fc3a189a00d8ac55d` |

```javascript
const illust = await figma.importComponentByKeyAsync('e4b09f3c3b1242ba4e786d74396977f94498e2de');
const inst = illust.createInstance();
parent.appendChild(inst);
inst.resize(200, 200);
```

---

## 9. Comandos CLI de referencia rápida

```bash
cd /Users/mau/Developer/Claude/figma-cli

node src/index.js connect          # Conectar (una vez por sesión)
node src/index.js canvas info      # Ver página activa y nodos top-level
node src/index.js var list         # Listar variables de librería
node src/index.js run /tmp/x.js    # Ejecutar script
node src/index.js eval "figma.root.name"  # Código inline rápido
node src/index.js verify           # Screenshot para verificar resultado
node src/index.js daemon restart   # Si el CLI no responde
```
