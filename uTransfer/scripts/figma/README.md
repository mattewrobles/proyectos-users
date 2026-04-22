# uTransfer — Scripts Figma CLI

Scripts JS para ejecutar desde el CLI de Figma.

```bash
cd /Users/mau/Developer/Claude/figma-cli
node src/index.js run /Users/mau/Developer/Projects/uTransfer/scripts/figma/<script>.js
```

## Flujo: Activos (USDT + Oro) · Página `Borrrador USDT-ORO`

| Script | Pantalla | Node ID (último run) |
|--------|----------|----------------------|
| `w1_mis_activos_empty.js` | W1 · Mis Activos · Vacío | 5299:76968 |
| `w2_mis_activos_con_saldo.js` | W2 · Mis Activos · Con Saldo | 5299:77039 |
| `w3_selector_activo.js` | W3 · Selector de Activo | 5299:77111 |
| `w4_comprar_usdt.js` | W4 · Comprar USDT | 5299:77165 |
| `w5_confirmar_compra.js` | W5 · Confirmar Compra | 5299:77300 |
| `w6_exito.js` | W6 · Compra Exitosa | 5299:77386 |
| `w7_vender_activo.js` | W7 · Vender / Retirar | 5299:77458 |
| `w8_w9_w10_prestamos.js` | W8 + W9 + W10 · Préstamos | W8:5299:77611 |
| `home_con_activos.js` | Home con widget Mis Activos | — |

## Custodio / Integraciones

- **Tooms** — custodio de USDT (Tether) y Oro
- **Loopay** — procesamiento interno USDT
- **Banco Amazonas** — préstamos con score interno

---

## Patrones y reglas de estos scripts

### Nav (back + título)
W1-W5, W7-W10 usan el patrón de nav sin Tab Bar:
```javascript
// importar chevron-left:
figma.importComponentByKeyAsync('d2e8133159142cb934d56fc28be3ac0bc7eb07b4')
// nav: HORIZONTAL, back icon instance + texto título
// NO Tab Bar en estas pantallas (flujos internos)
```

### Keyboard ABSOLUTE al bottom
W4 y W7 — teclado numérico fuera del auto-layout flow:
```javascript
const keyboard = keyboardComp.createInstance();
screen.appendChild(keyboard);
keyboard.layoutSizingHorizontal = 'FILL';
keyboard.layoutPositioning = 'ABSOLUTE';
keyboard.x = 0;
keyboard.y = screen.height - keyboard.height;
```

### Botones sin iconos (Clear/Tertiary)
Siempre llamar setProperties en botones Clear para desactivar iconos:
```javascript
btn.setProperties({ 'Icon Left#34:8': false, 'Icon Right#34:7': false, 'State': 'Default', 'Style': 'Clear' });
```

### addBtn con style param (W8/W9/W10)
```javascript
async function addBtn(parent, label, comp, style = 'Primary') {
  const btn = comp.createInstance();
  parent.appendChild(btn); btn.layoutSizingHorizontal = 'FILL';
  try { btn.setProperties({ 'Icon Left#34:8': false, 'Icon Right#34:7': false, 'State': 'Default', 'Style': style }); } catch(e) {}
  const l = btn.findAllWithCriteria({ types: ['TEXT'] })[0];
  if (l) { await figma.loadFontAsync(l.fontName); l.characters = label; }
}
// Uso: await addBtn(area, 'Cancelar', btnClearComp, 'Clear');
```

### Botones al fondo de content (FILL screen)
Cuando content tiene `layoutSizingVertical = 'FILL'`, agregar spacer antes de los botones:
```javascript
const spacer = figma.createFrame();
spacer.name = 'Spacer'; spacer.fills = []; spacer.resize(1, 1);
content.appendChild(spacer);
spacer.layoutSizingVertical = 'FILL';
// Luego append btnArea → botones quedan al fondo del content
```

### Swap de icono en instancia
W3 — back button necesita icon swap:
```javascript
const arrowComp = await figma.importComponentByKeyAsync('724c4df8223320936be5babe9e6a0100060f7fa9');
const iconInst = backBtn.findAll(n => n.type === 'INSTANCE')[0];
if (iconInst) iconInst.swapComponent(arrowComp);
```

### resize() resetea primaryAxisSizingMode
**Crítico:** `resize(w, h)` después de `primaryAxisSizingMode = 'AUTO'` lo resetea a FIXED.
Siempre hacer `resize()` PRIMERO, luego `primaryAxisSizingMode = 'AUTO'`:
```javascript
card.resize(163, 10);          // ← primero resize
card.primaryAxisSizingMode = 'AUTO'; // ← luego AUTO
```
