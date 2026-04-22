# Utransfer — Quick Start (carga este archivo primero)

> Un solo archivo con todo lo crítico para el 80% de tareas de Figma.
> Archivos de referencia profunda: `rules/ds-keys.md`, `rules/ds-tokens.md`, `rules/ds-components.md`

---

## Setup rápido

```bash
cd /Users/mau/Developer/Claude/figma-cli
node src/index.js connect
node src/index.js canvas info   # verificar página activa
```

**Página activa por defecto:** `Home - Operaciones`
**Sandbox:** `Pruebas` — siempre trabajar aquí
**Frame mobile:** 393×852px · Librería: `Utransfer_D_S`

---

## Top 10 componentes — keys directas

| Componente | Key |
|---|---|
| Status bar · Light | `222088d248a045f3d2e7df151f7d613bbda7fafd` |
| Status bar · Dark | `74f11501df265b2a4b7fdb151bb9e6086d598262` |
| Home Indicator | `e12f73d63ccef0537a22efd9a34228a9dc441bff` |
| Button Giant Primary | `15be15cfa0d8c4667e4eb8f84bf80f9919e019c9` |
| Button Giant Clear | `c4757e2398d2f767b0b188296d6efe17d15e1b9c` |
| Button Giant Tertiary | `907a75c075a2c569017d523f7657c0001906e2d6` |
| Input Default Large | `85a6f7f74d08b5dbc46d9593345f458eca417bff` |
| Avatar Initials 64 | `806cf30500b782fe99e767c5148858538b0bdaa9` |
| Divider horizontal | `3b8ea15e6f8e5410181509a43c329036681099c5` |
| Keyboard numérico | `9c1814d08f64b86d94c0280b4bc16ae550d1e1a9` |

**Kit local (sin importar librería):** nodo `4940:497` en página `Pruebas`

---

## Tokens de color — más usados

| Token | Uso |
|---|---|
| `Backgrounds/Foreground` | Fill de pantallas principales |
| `Cards-Fills/Card` | Fill de cards |
| `Generals/Input` | Fill de inputs |
| `Text/Primary` | Texto principal |
| `Text/secondary` | Labels, subtítulos |
| `Text/disabled` | Placeholder, helper text |
| `Text/on-tint` | Texto sobre status backgrounds (siempre oscuro) |
| `Border/focus` | Borde azul focus state |
| `🧩 Components/↳ Button/↳ Primary/Primary` | Fill botón primario |

---

## Token IDs hardcoded (elimina importVar → scripts más rápidos)

```javascript
// Uso: node.fills = tf(tok.bgForeground);
//      node.setBoundVariable('paddingTop', await figma.variables.getVariableByIdAsync(tok.spacing16));
const tok = {
  // Backgrounds
  bgForeground:    'VariableID:19c2e09f8413f36620164317361054656b2a5ed5/40006426:266',
  bgBackground:    'VariableID:2dc270f381976b2a3612caea5eb25599e3bfb751/40006426:268',
  bgGlass:         'VariableID:59dfe053a470c7b61aa354ee56ac89848075e94c/40006426:264',
  bgGlassModal:    'VariableID:715c5be71999e4522204953c1005c4aa64f1f320/40006426:285',  // modales/dialogs
  bgElevated1:     'VariableID:fdfd6ab743323bcc1a2025bf151d323338bd887c/40006426:265',
  bgElevated2:     'VariableID:c0aead159e8180909a15afb5d36b3a2b6afb99a9/40006426:267',
  bgTertiary:      'VariableID:0233a6b74775044ce80a8c0fe640f99f4daa2115/40006426:269',
  // Cards
  card:            'VariableID:0da73f37402731ead5d88da1bed88c86c111c4e3/40006426:225',
  cardForeground:  'VariableID:c47a37f66ecc0700059a9b21767e19e8abf9ff35/40006426:226',
  cardPrimary:     'VariableID:12be61f95d1e1384602fe2e78dba3b89739e05d7/40006426:282',
  cardSecondary:   'VariableID:f39ac85c947e9e2843b1f9f3f516e610e35827a0/40006426:280',
  cardVibrant:     'VariableID:b6fcb668455032f9be5ac865bf8ca69868ecaff0/40006426:284',  // solo Juegos/Rewards
  // Text
  textPrimary:     'VariableID:84aa5614563006ba14ee8abfab52b3a906759aad/40006426:223',
  textSecondary:   'VariableID:4d2fa14f521bdf38e75bb6756f95cf41ca2fc212/40006426:234',
  textDisabled:    'VariableID:a3da76fcdcf43f55e9c3848885fd1afa4ad608dd/40006427:347',  // placeholder
  textOnTint:      'VariableID:257b9ddfb77e854a1995d6a5bc409317fa417455/40006426:316',  // sobre status bg
  textInvert:      'VariableID:06b666f4799030eef308f288fb71ca3f084b5534/40006426:232',
  textOnBrand:     'VariableID:885133ec5726450cf9f042e741c24d27ec2ea8ea/40006426:231',
  // Border
  borderPrimary:   'VariableID:a75c476b71bafae7a5945b9189ac717514fa835f/40006426:242',
  borderSecondary: 'VariableID:439ea094ae1123d29184b32f95f304e7ed4a9ed3/40006426:241',
  borderDivider:   'VariableID:b622edf3a316298c35aebe857292ecc6d5fdcbe5/40006426:228',
  borderFocus:     'VariableID:feb3493aa7512fcf53ec01e7a1acc951091201c2/40006426:339',
  borderBrand:     'VariableID:6e2b4390fd11986842a34bb2740fa5e05614643b/40006426:239',
  // Icon
  iconPrimary:     'VariableID:f6dd42ca78e1612b40c202421361ba58f69dc846/40006426:238',
  iconDisabled:    'VariableID:955941f1a3c4e34a21c018aee3b846393296181b/40006427:348',
  iconBrand:       'VariableID:a3def2188118029a93e4d81fa0ed0fce100053c9/40006426:235',
  // General
  generalPrimary:  'VariableID:1f663fed47f631b91ca5611d88c6b9231d7896e4/40006426:338',
  generalInput:    'VariableID:c867804eae8979acf41d4a4a165166f1b667f162/40006426:341',
  // Status
  statusSuccess:   'VariableID:e07e1746dbb2e95f693516fad043d1fc0eaa672a/40006426:288',
  statusDanger:    'VariableID:4469621d904804fb97a4fe32b40cb5f1002e2ed3/40006426:289',
  statusWarning:   'VariableID:034c895292f3406682b10550e0d0a869ea642af4/40006426:290',
  statusInfo:      'VariableID:6f87a5cf0ca9cafb5e245ee9c3d45fd11eea4087/40006426:291',
  // Button tokens
  btnPrimaryFill:  'VariableID:d2917b890d7f2c50644333dee3d249007c6c11fe/40006427:343',
  btnPrimaryText:  'VariableID:262afd33ba6d906071187674144c9fda125bc837/40006426:260',
  btnDisabledBg:   'VariableID:3ba75b89b6481dd24715833f08f024b645e1dfdc/40006426:256',
  btnDisabledText: 'VariableID:c295ba382fb39083c71cc306809e9f4418627ca5/40006426:322',
  // Modal tokens
  modalBg:         'VariableID:ffeba3ca1430c524abf7ab8d51e1b1b09392ceb8/40006426:252',
  modalTitle:      'VariableID:8bc5f10c774c617a13a856dc7cfae0c74b114f07/40006426:253',
};

// Helper: fill con token hardcodeado (sin async)
function tf(tokenId) {
  return [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.1 },
    boundVariables: { color: { type: 'VARIABLE_ALIAS', id: tokenId } } }];
}
// Helper: bind radius con token hardcodeado
async function bindR(node, tokenId) {
  const v = await figma.variables.getVariableByIdAsync(tokenId);
  ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius']
    .forEach(c => node.setBoundVariable(c, v));
}

// Uso directo sin importVar:
// screen.fills = tf(tok.bgForeground);
// card.fills = tf(tok.card);
// textNode.fills = tf(tok.textPrimary);
```

---

## Spacing IDs hardcoded (más rápido que importVar)

```javascript
const sp = {
  0:   'VariableID:8304f26602e5bbc20ac8ca184d49c63889ec57cb/40006136:101',
  4:   'VariableID:a76ac5afaf32fc7db440de629558bd67512ab705/40006136:103',
  8:   'VariableID:c5eb1187ed05c87e0390d6245983d582fe4f8728/40006136:104',
  12:  'VariableID:6a12f53ee51dc9af1f5c95a6108169f48bef89d1/40006136:105',
  16:  'VariableID:fc630c4b3648e68ab3fc1f74a76dc49f812f7bda/40006136:106',
  20:  'VariableID:c0ea2be6cafced44153f35cd1a2e79b1d092e5b9/40006136:107',
  24:  'VariableID:12f7f87e25374c4dd6b48d3d90aadf75606fbf1b/40006136:108',
  32:  'VariableID:19b54d8ecd9c97d10ccee305f2e1e3621f240c01/40006136:110',
  40:  'VariableID:4d115ce03bbc45fd224c088c4b7e2baa73db6606/40006136:111',
  48:  'VariableID:a89824708d196ca7252ee93fe953a4caac5a98bc/40006136:113',
};
async function s(px) { return figma.variables.getVariableByIdAsync(sp[px]); }
```

---

## Text styles — keys

| Estilo | Key | Tamaño |
|---|---|---|
| Headers/H3 | `41243533aec36fb477c160301ba9c854ebaf0c01` | 28px |
| Headers/H5 | `a761967b66cd94663df9cacbe06c32f68b48b7e7` | 20px |
| Subtitle M | `df46c8797813b902f6164fa2ea73a2e58e0b13df` | 16px |
| Caption 1 | `3c4a22b5a0d0e65480fea3cbc965b935ee9a610c` | 12px |
| Body SM | `f62d08a99c5536e757c75e4620106c18c618a9d8` | 12px |

```javascript
// SIEMPRE async — nunca textStyleId =
const style = await figma.importStyleByKeyAsync('KEY');
await node.setTextStyleIdAsync(style.id);
```

---

## Template mínimo de script

```javascript
(async () => {
  const page = figma.root.children.find(p => p.name === 'Pruebas');
  await page.loadAsync();
  await figma.setCurrentPageAsync(page);
  page.children.filter(n => n.name === 'MI_FRAME').forEach(n => n.remove());

  await Promise.all([
    figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' }),
  ]);

  const cols = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
  async function v(col, name) {
    const c = cols.find(c => c.name === col);
    const vs = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key);
    const found = vs.find(v => v.name === name);
    return found ? figma.variables.importVariableByKeyAsync(found.key) : null;
  }

  const sp = { /* spacing IDs arriba */ };
  async function s(px) { return figma.variables.getVariableByIdAsync(sp[px]); }

  function fill(variable) {
    return [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.1 },
      boundVariables: { color: { type: 'VARIABLE_ALIAS', id: variable.id } } }];
  }
  function bindRadius(node, rv) {
    ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius']
      .forEach(c => node.setBoundVariable(c, rv));
  }

  // ── Construir aquí ─────────────────────────────────────
  const screen = figma.createFrame();
  screen.name = 'MI_FRAME';
  screen.resize(393, 852);
  screen.layoutMode = 'VERTICAL';
  screen.primaryAxisSizingMode = 'FIXED';
  screen.counterAxisSizingMode = 'FIXED';

  screen.x = 0; screen.y = 0;
  figma.viewport.scrollAndZoomIntoView([screen]);
  return { ok: true, id: screen.id };
})()
```

---

## Errores más comunes

| Error | Fix |
|---|---|
| `Cannot call set_currentPage` | `await figma.setCurrentPageAsync(page)` |
| `Cannot call set_textStyleId` | `await node.setTextStyleIdAsync(id)` |
| `HUG can only be set on auto-layout children` | Solo `FILL` en instancias — nunca `HUG` |
| `counterAxisSizingMode FILL invalid` | Solo `FIXED` o `AUTO` en counterAxis |
| `Invalid enum: END` | Usar `MAX` no `END` |
| Timeout 90s | Evitar `findAll` con lambda en árbol grande |
| Frame con altura fija inesperada | `resize()` ANTES de `primaryAxisSizingMode = 'AUTO'` |
| Keyboard flotando | Teclado ABSOLUTE en screen, no dentro de content |
