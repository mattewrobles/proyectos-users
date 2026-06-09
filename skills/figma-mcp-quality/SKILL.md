---
name: figma-mcp-quality
version: 2.0.0
description: Reglas OBLIGATORIAS al crear/editar nodos en Figma via MCP. Tokens de diseño, estilos tipográficos, variables de color/spacing, componentes de librería, iconos del DS, y estructura icon+text. Aplicar SIEMPRE en figma_execute.
---

# Figma MCP Quality — Reglas de Producción v2

> Estas reglas son OBLIGATORIAS. No hay excepciones. Si algo no existe en el DS, proponer crearlo.

---

## REGLA 0: Escaneo Obligatorio al Inicio de Sesión

Antes de crear CUALQUIER nodo, escanear el documento:

```javascript
// 1. Recopilar variables disponibles (COLOR + FLOAT)
const allNodes = figma.currentPage.findAll(n => n.boundVariables && Object.keys(n.boundVariables).length > 0);
const varMap = {};
for (const node of allNodes.slice(0, 100)) {
  for (const [prop, binding] of Object.entries(node.boundVariables)) {
    const bindings = Array.isArray(binding) ? binding : [binding];
    for (const b of bindings) {
      if (!b?.id) continue;
      const v = await figma.variables.getVariableByIdAsync(b.id);
      if (v && !varMap[v.name]) varMap[v.name] = { id: v.id, type: v.resolvedType };
    }
  }
}

// 2. Recopilar estilos de texto y color
const textStyles = await figma.getLocalTextStylesAsync();
const fillStyles = await figma.getLocalPaintStylesAsync();

// 3. Recopilar iconos disponibles (instancias pequeñas ≤28px)
const iconInstances = figma.currentPage.findAll(n => n.type === 'INSTANCE' && n.width <= 28 && n.height <= 28);
```

**Si el DS tiene variables/estilos pero no los ves localmente:** están en la librería vinculada.
Extraer sus IDs de nodos existentes que ya los tengan aplicados.

---

## REGLA 1: Tokens de Color — SIEMPRE Variables o Estilos

**NUNCA** usar colores hardcodeados. **SIEMPRE** bindear variables o aplicar estilos de la librería.

```javascript
// ❌ INCORRECTO
frame.fills = [{ type: 'SOLID', color: { r: 1, g: 0.47, b: 0 } }];
text.fills  = [{ type: 'SOLID', color: { r: 0.14, g: 0.15, b: 0.18 } }];

// ✅ CORRECTO — Variable binding para fills de frames
const colorVar = await figma.variables.getVariableByIdAsync(VAR_IDS['neutral/900']);
const newFills = node.fills.map((fill, i) =>
  i === 0 && fill.type === 'SOLID'
    ? figma.variables.setBoundVariableForPaint(fill, 'color', colorVar)
    : fill
);
node.fills = newFills;

// ✅ CORRECTO — Fill style para textos
await textNode.setFillStyleIdAsync('S:bcbe6f3980...,13:307');

// ✅ CORRECTO — Text style para tipografía
await textNode.setTextStyleIdAsync('S:8a5f8e424e...,431:9');
```

### Mapa de variables Carsync DS (extraídas del documento):
```javascript
const CARSYNC_VARS = {
  // COLOR
  'base/white':  'VariableID:9459b92ff2875a8bb2f2676cffaaa72cd548c8d6/2780:154', // #FFFFFF
  'neutral/900': 'VariableID:570805ddbf043ab68b3a55bb28d17b4a2c17710f/2780:141', // #24272E
  'neutral/800': 'VariableID:27cfcca6e2fe5d3f2af56ff680c061f6aff46338/2780:139', // #48525B
  'neutral/750': 'VariableID:916d68fbe6cdd8a9e0bba12294d1a3c3ac5bb807/2781:313', // #656B6F
  'neutral/700': 'VariableID:ccf638ee2c35834504997af06dc7b20509d380b1/2780:137', // #7E868D
  'neutral/600': 'VariableID:b9b9cb9f247c7170ae4b42fa26396a4f125808c7/2780:135', // #91989E
  'neutral/300': 'VariableID:7d9f2c30458bb6aa9623837ed2f4e60e2ed8a182/2780:129', // #C2C7CA
  'neutral/100': 'VariableID:96ac063874b3863253ccc3707e4e49133b5601f1/2780:125', // #EAEAEE
  'primary/50':  'VariableID:f4542a550ec5591832eba0fd4b1b33a0dfae49f1/2780:3',   // #FFF8F3
  'primary/100': 'VariableID:4b4163f7e3032e9f30231e594fa104a2a26d4b40/2780:5',   // #FFF1E6
  'primary/800': 'VariableID:4000a12a8d7192cf9c5d5b2140964b8ae8ab4250/2780:19',  // #FDA350
  'primary/900': 'VariableID:2b954a5d4e0bcdcaba1a64ff47ce136ef2af89c0/2780:21',  // #FD7C12
  'danger/100':  'VariableID:fee7d8dcd28f8e362a387d71e95abf9ca64e16b1/2780:105', // #FEF1F2
  'danger/700':  'VariableID:f7dc1d595c2d00d1c85fb43d7869c83e597e2e6e/2780:117', // #E02D3C
  'success/100': 'VariableID:21ce61b9882f291906f9744165af05a119bfd520/2780:65',  // #F1F7E2
  'success/800': 'VariableID:a0791cc15466ec1f690982e473e0a451df6a72b1/2780:79',  // #95C11E
  'warning/100': 'VariableID:b492e46badd17e57926148d12c9bfc9dc00ad4f1/2780:85',  // #FFF3D3
  'warning/900': 'VariableID:3dc09a229c4b812dad715ae0921b0fd5cb243c97/2780:101', // #CC9D24
  'info/100':    'VariableID:90b5090b7afcd7c7d1505f7bbf0839523e042820/2780:45',  // #F4F9FB
  'info/600':    'VariableID:f06782d4554b6eabdd787fb46c88b1f55a93ebc1/2780:55',  // #4194B8
  // FLOAT — spacing
  'sp/4':  'VariableID:ac8923e6d4ef3a6ba0c2bcc8d20cbfba91bc5289/2765:58',
  'sp/8':  'VariableID:6eabee985b2af07035207636a9ee42fce937382c/2765:70',
  'sp/10': 'VariableID:1478610f3e9c7c4b99041ea37f6989714cfa1158/2765:76',
  'sp/12': 'VariableID:f41002635ab6709b05dcf6ca78bbc92e27650e64/2765:82',
  'sp/24': 'VariableID:4d70b7f8f37e5f98e9f0f1250aa1503a84c8df4b/2765:94',
  'sp/32': 'VariableID:e629b9011fc4496af083e3ef9cc3c48fcb836e6a/2765:106',
};
```

### Mapa hex → variable (para aplicación automática):
```
#FFFFFF → base/white     | #24272E → neutral/900  | #48525B → neutral/800
#7E868D → neutral/700    | #91989E → neutral/600   | #EAEAEE → neutral/100
#FFF8F3 → primary/50     | #FFF1E6 → primary/100   | #FD7C12 → primary/900
#FEF1F2 → danger/100     | #E02D3C → danger/700     | #F1F7E2 → success/100
#FFF3D3 → warning/100    | #CC9D24 → warning/900    | #F4F9FB → info/100
```

**Si el color no tiene variable asignada:** proponer al usuario crear una antes de hardcodear.

---

## REGLA 2: Estilos Tipográficos — SIEMPRE setTextStyleIdAsync

**NUNCA** setear fontFamily, fontSize, fontWeight directamente en producción.
**SIEMPRE** usar `setTextStyleIdAsync` con los IDs de la librería.

```javascript
// ❌ INCORRECTO
text.fontSize = 18;
text.fontName = { family: 'Roboto', style: 'SemiBold' };

// ✅ CORRECTO
await text.setTextStyleIdAsync(TEXT_STYLES['semibold-18']);
```

### Text styles Carsync DS:
```javascript
const TEXT_STYLES = {
  'bold-28':     'S:8a5f8e424eb447f70435a5c414677a8d3b068a7f,431:9',
  'semibold-18': 'S:7f1eee5204a65e7bb7df376e1416895749ee7d88,431:4',
  'semibold-14': 'S:d02020ed3c838ef8f327a46d452490ed679a1fcf,431:6',
  'semibold-12': 'S:b9a725ebf50ba9bba14ff95b8735665cb21cbdb5,431:3',
  'medium-12':   'S:fc8264cb2b0c7b9b9ea8bd1a07685093b8266afa,509:0',
  'regular-14':  'S:96bb0c87520eeb4333cd79e2ed9f5efabf308c87,406:1',
  'regular-12':  'S:6c594e7855ec504e4a21c0b56b4236db0005d717,406:4',
  'regular-10':  'S:d0a5a19918c4e438b8234695e7d79b152e298d4e,406:6',
};

// Regla de selección automática:
function getTextStyle(size, weight) {
  const w = (weight || '').toLowerCase();
  if (size >= 24) return TEXT_STYLES['bold-28'];
  if (size >= 16) return TEXT_STYLES['semibold-18'];
  if (size === 14 && (w.includes('semi') || w.includes('bold'))) return TEXT_STYLES['semibold-14'];
  if (size === 14) return TEXT_STYLES['regular-14'];
  if (size === 12 && (w.includes('semi') || w.includes('bold'))) return TEXT_STYLES['semibold-12'];
  if (size === 12 && w.includes('med')) return TEXT_STYLES['medium-12'];
  if (size === 12) return TEXT_STYLES['regular-12'];
  return TEXT_STYLES['regular-10'];
}
```

### Fill styles de texto Carsync DS:
```javascript
const FILL_STYLES = {
  'text-dark':    'S:bcbe6f39808d1d2a80216f1b470187ecd69793dc,13:307',
  'text-primary': 'S:db45b65e15993901bf62c9b37e2a95be4709226d,13:310',
  'text-muted':   'S:169cba5e261c90294962a78e2cd38765228589b3,13:313',
  'white':        'S:d287510af02a754dada5f2bc58ccdcfe529c0328,13:331',
  'bg-subtle':    'S:07a71372bb759eaee1db3325a3897257c79258a4,13:328',
};
```

**Si el estilo tipográfico no existe en el DS:** proponer al usuario crear un nuevo Text Style antes de continuar.

---

## REGLA 3: Variables de Spacing — SIEMPRE en padding e itemSpacing

```javascript
// ❌ INCORRECTO
frame.paddingTop = 16;
frame.itemSpacing = 8;

// ✅ CORRECTO — setBoundVariable después de agregar al parent
const sp8 = await figma.variables.getVariableByIdAsync(CARSYNC_VARS['sp/8']);
frame.setBoundVariable('paddingTop', sp8);
frame.setBoundVariable('paddingBottom', sp8);
frame.setBoundVariable('itemSpacing', sp8);

// ✅ CORRECTO — cornerRadius
const sp4 = await figma.variables.getVariableByIdAsync(CARSYNC_VARS['sp/4']);
frame.setBoundVariable('cornerRadius', sp4);
```

### Tabla de spacing del sistema (4pt grid):
| Valor | Variable | Uso típico |
|-------|----------|-----------|
| 4px   | sp/4     | gap mínimo, border radius pequeño |
| 8px   | sp/8     | padding interno, gap estándar |
| 10px  | sp/10    | padding medio |
| 12px  | sp/12    | padding cards, gap medio |
| 24px  | sp/24    | padding secciones |
| 32px  | sp/32    | padding grandes |

**SOLO usar valores del grid de 4pt:** 4, 8, 12, 16, 20, 24, 32.
**Si necesitas 16 o 20:** buscar si existe la variable en el DS antes de hardcodear.

---

## REGLA 4: Iconos — SIEMPRE del DS, NUNCA emojis

**NUNCA** usar emojis, unicode characters ni texto como íconos.
**SIEMPRE** instanciar el componente de icono de la librería.

```javascript
// ❌ INCORRECTO
const icon = figma.createText();
icon.characters = '🔐';  // NUNCA

// ❌ INCORRECTO
const icon = figma.createText();
icon.characters = '✕';   // NUNCA

// ✅ CORRECTO
const iconComp = await figma.getNodeByIdAsync('11607:106'); // x-circle del DS
const iconInst = iconComp.createInstance();
iconInst.resize(20, 20);
iconInst.layoutSizingHorizontal = 'FIXED';
iconInst.layoutSizingVertical = 'FIXED';
parent.appendChild(iconInst);
```

### Iconos disponibles en Carsync DS:
```javascript
const CARSYNC_ICONS = {
  'x-circle':         '11607:106',
  'alert-hexagon':    '11852:4511',
  'alert-triangle':   '11578:32415',
  'annotation-alert': '11545:3976',
  'key-01':           '11611:68',
  'bell-03':          '11578:27357',
  'search-md':        '11578:18398',
  'filter-funnel-01': '11578:18339',
  'filter-funnel-02': '11578:23842',
  'download-01':      '11578:22725',
  'upload-01':        '11578:18374',
  'bar-line-chart':   '11545:3978',
  'file-check-02':    '11855:34835',
  'file-search-02':   '11855:46824',
  'marker-pin-04':    '11852:4509',
  'marker-pin-05':    '11578:41287',
  'dataflow-01':      '11731:1875',
  'settings-01':      '11545:3980',
  'users-01':         '11545:3972',
  'user-circle':      '11578:41326',
  'user-up-01':       '11903:14472',
  'users-plus':       '11855:43693',
  'users-edit':       '11855:43705',
  'users-check':      '11578:22697', // approx
  'chevron-down':     '11578:32411',
  'chevron-left':     '11578:32452',
  'chevron-right':    '11578:27351',
  'dots-vertical':    '11578:23812',
  'dots-horizontal':  '11578:51992',
  'plus':             '11578:27327',
  'edit-05':          '11578:22689',
  'delete':           '11901:14251',
  'switch-vertical-01': '11578:22721',
  'arrow-narrow-up-right': '11578:18345',
  'certificate-01':   '11903:14466',
  'car-01':           '11578:17782',
  'ruler':            '11731:1870',
  'home-02':          '11545:3967',
};
```

**Si el icono que necesitas NO está en la lista:** buscar en el documento con:
```javascript
figma.currentPage.findAll(n => n.type === 'COMPONENT' || n.type === 'INSTANCE')
  .filter(n => n.name.toLowerCase().includes('nombre-icono'))
```
Si no existe → proponer al usuario agregar el icono al DS antes de usar un sustituto.

---

## REGLA 5: Estructura Icon + Text — SIEMPRE frames individuales

**NUNCA** un texto con emojis inline como "🕐 fecha · 🌐 IP".
**SIEMPRE** un frame horizontal auto-layout por cada par icono+texto.

```javascript
// ❌ INCORRECTO
const meta = figma.createText();
meta.characters = '🕐 25/03/2026 · 🌐 190.157.44.21 · 📦 Zonas';

// ✅ CORRECTO — cada par en su propio frame
async function makeIconTextItem(iconId, textStr, font) {
  const frame = figma.createFrame();
  frame.layoutMode = 'HORIZONTAL';
  frame.counterAxisAlignItems = 'CENTER';
  frame.itemSpacing = 4;
  frame.fills = [];
  frame.clipsContent = false;

  // Icono del DS
  const iconComp = await figma.getNodeByIdAsync(iconId);
  const iconInst = iconComp.createInstance();
  frame.appendChild(iconInst);
  iconInst.layoutSizingHorizontal = 'FIXED';
  iconInst.layoutSizingVertical = 'FIXED';
  iconInst.resize(12, 12);

  // Texto
  const t = figma.createText();
  await figma.loadFontAsync(font);
  t.fontName = font;
  t.characters = textStr;
  frame.appendChild(t);

  // Aplicar estilos del DS
  await t.setTextStyleIdAsync(TEXT_STYLES['regular-10']);
  await t.setFillStyleIdAsync(FILL_STYLES['text-muted']);

  return frame;
}

// Fila de metadata completa
const metaRow = figma.createFrame();
metaRow.layoutMode = 'HORIZONTAL';
metaRow.itemSpacing = 12;
metaRow.fills = [];

metaRow.appendChild(await makeIconTextItem(CARSYNC_ICONS['annotation-alert'], '25/03/2026 · 14:32', font));
metaRow.appendChild(await makeIconTextItem(CARSYNC_ICONS['marker-pin-04'], '190.157.44.21', font));
metaRow.appendChild(await makeIconTextItem(CARSYNC_ICONS['dataflow-01'], 'Zonas', font));
```

---

## REGLA 6: Componentes de Librería — SIEMPRE instanciar, NUNCA recrear

Antes de crear cualquier elemento visual, verificar si existe como componente en el DS.

```javascript
// ❌ INCORRECTO — recrear badge desde cero
const badge = figma.createFrame();
badge.fills = [{ type: 'SOLID', color: { r: 0.87, g: 0.94, b: 0.86 } }];

// ✅ CORRECTO — instanciar del DS
const CARSYNC_COMPONENTS = {
  // Badges
  'badge/success': '11725:1801', // Light/Rounded/Success
  'badge/warning': '11725:1805', // Light/Rounded/Warning
  'badge/error':   '11725:1809', // Light/Rounded/Error
  'badge/default': '11725:1767', // Solid/Circle/Default
  // Avatar
  'avatar/initials/40': '11578:55453', // Initials, Size=40, Circular (via mainComponent)
  // Inputs
  'input/inactive': '11734:2457',  // Type=Input, State=Inactive
  'input/active':   '11734:2455',  // Type=Input, State=Active
  // Buttons (obtener de instancias existentes)
  // Tabs
  'tabs/3': '11718:2352',
  'tabs/4': '11852:12494',
};

const comp = await figma.getNodeByIdAsync(CARSYNC_COMPONENTS['badge/success']);
const inst = comp.createInstance();
```

**Si el componente necesario no existe en el DS:** proponer al usuario crearlo como componente reutilizable.

---

## REGLA 7: Auto-Layout Sizing

| Situación | Horizontal | Vertical |
|-----------|-----------|----------|
| Texto | HUG | HUG |
| Input dentro de form | FILL | HUG |
| Row de sidebar | FILL | HUG |
| Icono/avatar | FIXED | FIXED |
| Badge/chip | HUG | HUG |
| Button | HUG | HUG |
| Frame raíz de pantalla | FIXED (1440) | FIXED (900) |
| KPI card en grid | FILL | HUG |
| Celda de tabla col fija | FIXED | FILL |
| Celda flex (ocupa resto) | FILL | FILL |
| Meta-item [icon+text] | HUG | HUG |
| Meta-row (todos juntos) | FILL | HUG |

**IMPORTANTE:** `layoutSizingHorizontal = 'FILL'` solo funciona DESPUÉS de insertar el nodo en un parent auto-layout.

---

## REGLA 8: Estructura Icon+Text para Circunstancias Específicas

### Banners / Alertas:
```
Frame "banner" [HORIZONTAL, gap:8, padding:12, bg: warning/100 variable]
  ├── INSTANCE [icon del DS, 16x16, FIXED]
  └── TEXT [mensaje, setTextStyleIdAsync + setFillStyleIdAsync]
```

### Metadata con múltiples datos (fecha · IP · módulo):
```
Frame "meta-row" [HORIZONTAL, gap:12, no-fill]
  ├── Frame "meta-date" [HORIZONTAL, gap:4] → [icon 12x12] + [text]
  ├── Frame "meta-ip"   [HORIZONTAL, gap:4] → [icon 12x12] + [text]
  └── Frame "meta-mod"  [HORIZONTAL, gap:4] → [icon 12x12] + [text]
```

### Botón con icono:
```
INSTANCE [Button del DS con propiedad Icon=Left]
  → setear texto vía componentProperties o textNode interno
```

---

## REGLA 9: Si algo NO existe en el DS → Proponer, no improvisar

Ante cada uno de estos casos, DETENER y proponer al usuario:

| Situación | Acción |
|-----------|--------|
| Color sin variable asignada | Proponer crear variable en la colección correspondiente |
| Tipografía sin Text Style | Proponer crear Text Style con nombre semántico |
| Componente que habría que recrear | Proponer crear componente reutilizable en el DS |
| Icono que no existe en el DS | Proponer agregar el icono a la librería |
| Espaciado fuera del grid de 4pt | Proponer el valor más cercano del sistema |

**Ejemplo de propuesta:**
> "El color `#2D6A4F` no tiene variable en el DS. ¿Creamos `success/700` en la colección de primitivos, o usamos `success/800` (#95C11E) que ya existe?"

---

## REGLA 10: Validación Visual Obligatoria

Después de CADA operación de creación/modificación:

```
1. figma_capture_screenshot({ nodeId: "..." })
2. Verificar:
   - [ ] Sin emojis visibles como iconos
   - [ ] Todos los textos tienen text style vinculado (no fontSize manual)
   - [ ] Todos los fills de frames tienen variable o fill style vinculado
   - [ ] Iconos son instancias del DS (no texto/emoji)
   - [ ] Spacing visible correcto (padding, gap alineados al grid)
   - [ ] Componentes son instancias (no frames recreados)
   - [ ] Círculos son círculos (FIXED sizing)
3. Si hay problemas → corregir y recapturar
4. Máximo 3 iteraciones
```

---

## REGLA 11: Auto-Layout y Circulos Perfectos

```javascript
// Círculo perfecto en auto-layout
const avatar = figma.createFrame();
avatar.resize(40, 40);
avatar.cornerRadius = 20;
parent.appendChild(avatar);
avatar.layoutSizingHorizontal = 'FIXED';
avatar.layoutSizingVertical = 'FIXED';

// Punto/dot
const dot = figma.createEllipse();
dot.resize(6, 6);
parent.appendChild(dot);
dot.layoutSizingHorizontal = 'FIXED';
dot.layoutSizingVertical = 'FIXED';
```

---

## REGLA 12: Shadows con blendMode

```javascript
frame.effects = [{
  type: 'DROP_SHADOW',
  color: { r: 0, g: 0, b: 0, a: 0.08 },
  offset: { x: 0, y: 1 },
  radius: 4,
  spread: 0,
  visible: true,
  blendMode: 'NORMAL'  // OBLIGATORIO — sin esto falla
}];
```

---

## REGLA 13: Cleanup Obligatorio

Antes de terminar cualquier sesión:
- Eliminar frames vacíos o huérfanos
- Verificar que todo está dentro de Sections
- No dejar nodos flotando en el canvas

```javascript
const orphans = page.children.filter(c => c.type !== 'SECTION');
orphans.forEach(n => section.appendChild(n));
```
