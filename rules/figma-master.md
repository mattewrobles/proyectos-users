# Figma Master Rules — Cleo

Todo lo aprendido trabajando con Mau en Figma. Aplicar sin excepción en cada sesión.

---

## CLI — Setup y Comandos

**Path:** `/Users/mau/Developer/Claude/figma-cli`
**Conexión:** Directo a Figma Desktop vía CDP — no necesita API key

```bash
# Conectar (una vez por sesión)
cd /Users/mau/Developer/Claude/figma-cli && node src/index.js connect

# Si daemon restart no conecta → matar puerto primero:
lsof -ti:3456 | xargs kill -9 2>/dev/null; sleep 1 && node src/index.js connect

# Correr script guardado
node src/index.js run /tmp/mi_script.js

# Código inline
node src/index.js eval "figma.root.name"

# Health check
node src/index.js canvas info

# Verificar visualmente (NO usar ghost_screenshot)
node src/index.js verify "NODE_ID" --save /tmp/verify.png

# Reiniciar daemon
node src/index.js daemon restart
```

### Comandos nuevos (v1.2+)

```bash
# Importar DESIGN.md como colección de variables
node src/index.js import /path/design.md --collection nombre

# Ver tokens en canvas
node src/index.js var visualize

# Comparar tokens entre colecciones (antes de usar `use`)
node src/index.js tokens overlap coleccion1 coleccion2

# Cambiar tema — re-bindea todas las variables de la selección / --all
node src/index.js use <collection> [--node ID] [--all]

# Ordenar nodos apilados (no destructivo)
node src/index.js unstack

# Plugin API offline
node src/index.js api setup          # descarga docs (una vez)
node src/index.js api search resize  # buscar método
node src/index.js api gap            # ver qué no cubre el CLI
node src/index.js api context vars   # bloque LLM-ready

# Secciones
node src/index.js section create "Nombre"
node src/index.js section list

# Grids
node src/index.js grid columns --count 12 --gutter 16
```

### Plugin API — Patrones base
```javascript
// IIFE async — siempre
(async () => {
  await Promise.all([
    figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' }), // ← espacio obligatorio
    figma.loadFontAsync({ family: 'Inter', style: 'Bold' }),
  ]);

  // Cargar página antes de acceder a nodos
  const page = figma.root.children.find(p => p.id === 'PAGE_ID');
  await page.loadAsync();

  return { ok: true };
})()
```

---

## 0. PROCESO — Antes de tocar cualquier cosa

### Proponer antes de construir
Antes de escribir cualquier script de Figma:
1. Proponer estructura, layout, secciones, copy de muestra
2. Esperar confirmación o ajustes de Mau
3. Solo entonces escribir el script
4. Anunciar que está listo y **esperar aprobación explícita** antes de ejecutar

**NUNCA** encadenar `node src/index.js run` sin que Mau diga "córrelo", "ejecuta", "dale" o similar.

### Health check al inicio
```bash
node src/index.js canvas info 2>&1
# Si falla: node src/index.js daemon restart && sleep 2 && node src/index.js connect
```

### Al iniciar sesión en un proyecto con DESIGN.md

```bash
# uTransfer — cargar tokens al inicio
node src/index.js import /Users/mau/Developer/Projects/uTransfer/.claude/design.md --collection utransfer

# Airpals — cargar tokens al inicio
node src/index.js import /Users/mau/Developer/Projects/Airpals/.claude/design.md --collection airpals
```

Después de importar, usar `var:nombre` en render-batch en vez de VariableIDs hardcodeados.

### Leer docs antes de scripts uTransfer
- `/Users/mau/Developer/Projects/uTransfer/.claude/CLAUDE.md`
- `/Users/mau/Developer/Projects/uTransfer/.claude/Rules/ds-tokens.md`
- `/Users/mau/Developer/Projects/uTransfer/.claude/Rules/ds-keys.md`
- `/Users/mau/Developer/Projects/uTransfer/.claude/Rules/figma-scripts.md`

### Preload fonts siempre al inicio del script
```javascript
await Promise.all([
  figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
  figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
  figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' }), // ← con espacio, no 'SemiBold'
  figma.loadFontAsync({ family: 'Inter', style: 'Bold' }),
]);
```

---

## 1. TOKENS Y VARIABLES — Regla irrompible

### Flujo nuevo (v1.2+) — DESIGN.md + var: syntax

Antes de cualquier script, importar el DS del proyecto:
```bash
node src/index.js import /ruta/proyecto/.claude/design.md --collection nombre
```

Después usar `var:nombre` en render-batch — sin IDs, sin hardcodear:
```bash
node src/index.js render-batch '[
  "<Frame bg=\"var:surface\" p={16} rounded={12}><Text color=\"var:ink\">Hola</Text></Frame>"
]' --collection utransfer
```

### NUNCA hardcodear colores
```javascript
// ❌ MAL
node.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];

// ✅ BIEN en eval — bindear variable por nombre
const v = await figma.variables.getLocalVariablesAsync();
const token = v.find(x => x.name === 'Colors/Primary');
node.fills = [{ type: 'SOLID', color: {r:0,g:0,b:0}, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: token.id } } }];

// ✅ MEJOR — usar render-batch con var: si es creación nueva
```

### Spacing tokens — fallback eval (cuando render-batch no aplica)
Los VariableIDs de uTransfer están en `uTransfer/.claude/CLAUDE.md` como referencia.
Para scripts `eval` donde necesites bindear spacing manualmente, leer ese archivo primero.
Para **creación nueva** preferir `render-batch px={16}` con `--collection utransfer`.

### Radius tokens — fallback eval
Ídem spacing. Los radiusIds de uTransfer están en `uTransfer/.claude/CLAUDE.md`.
Para creación nueva: `rounded={12}` en render-batch resuelve contra la colección importada.

### Sin token exacto → usar el más cercano
```javascript
const findClosestToken = (value, map) => {
  const keys = Object.keys(map).map(Number).sort((a,b) => a-b);
  return map[keys.reduce((p, c) => Math.abs(c-value) < Math.abs(p-value) ? c : p)];
};
// NUNCA dejar paddingTop, itemSpacing, cornerRadius sin bindear
```

### Font Inter — exactamente con espacio
```javascript
// ✅ 'Semi Bold' (espacio)   ❌ 'SemiBold' (falla con "could not be loaded")
// ✅ 'Extra Bold'            ✅ 'Extra Light'
```

### NO sobrescribir variable mode del archivo
```javascript
// ❌ NO hacer esto
collection.setExplicitVariableModeForCollection(modeId);
// Respetar el modo dark/light que ya tiene el proyecto
```

---

## 2. AUTO-LAYOUT Y SIZING

### HUG/FILL — reglas críticas
- `layoutSizingVertical = 'HUG'` → solo en frames con `layoutMode` seteado o text nodes. **Nunca** en INSTANCE directamente.
- `layoutSizingHorizontal = 'FILL'` → solo después de que el nodo esté dentro de un parent auto-layout en el doc tree
- Secciones hijas de screen VERTICAL: siempre `layoutSizingHorizontal='FILL'` + `layoutSizingVertical='HUG'`
- Textos: siempre `textAutoResize = 'WIDTH_AND_HEIGHT'`

### `resize()` SIEMPRE antes de `AUTO`
```javascript
// ✅ CORRECTO
card.resize(163, 10);               // ① resize primero
card.primaryAxisSizingMode = 'AUTO'; // ② luego AUTO

// ❌ MAL — resize() resetea AUTO a FIXED
card.primaryAxisSizingMode = 'AUTO';
card.resize(163, 10); // ← lo vuelve FIXED, queda en 10px
```

### FILL solo después de estar en el doc tree
```javascript
// ✅ CORRECTO
figma.currentPage.appendChild(card);
card.appendChild(hdr);
hdr.layoutSizingHorizontal = 'FILL'; // ahora sí

// ❌ MAL — "node must be an auto-layout frame or a child of an auto-layout frame"
hdr.layoutSizingHorizontal = 'FILL';
card.appendChild(hdr);
```

### Spacer FILL para CTA al fondo del content
```javascript
// Cuando content tiene layoutSizingVertical='FILL' y el CTA debe ir abajo:
const spacer = figma.createFrame();
spacer.name = 'Spacer';
spacer.fills = [];
spacer.resize(1, 1);
content.appendChild(spacer);
spacer.layoutSizingVertical = 'FILL'; // empuja botones al fondo
content.appendChild(btnArea);        // botones quedan abajo
```

---

## 3. COMPONENTES — Instanciar, nunca recrear

### NUNCA construir manualmente lo que existe en el DS
Aplica a: chips, labels, badges, botones, inputs, iconos, avatares, tab bars, status bars, nav bars, home indicators, toolbars, keyboards — cualquier cosa que tenga key en el catálogo.

```javascript
// ✅ BIEN
const comp = await figma.importComponentByKeyAsync('key-del-ds');
const inst = comp.createInstance();

// ❌ MAL — crear frame + fills + texto a mano si existe componente
```

### Script speed — Kit local antes que importar librería
`importComponentByKeyAsync` = 3-5s por componente. Con 8+ = timeout.
```javascript
const kit = figma.currentPage.children.find(n => n.name === '🧰 Kit');
const getKit = name => kit.findOne(n => n.name.includes(name));
// getKit('Primary/Giant').createInstance() — instantáneo
```

### Botones — setProperties SIEMPRE
```javascript
// Primario
btn.setProperties({ 'Icon Left#34:8': false, 'Icon Right#34:7': false, 'State': 'Default', 'Style': 'Primary' });
// Clear
btn.setProperties({ 'Icon Left#34:8': false, 'Icon Right#34:7': false, 'State': 'Default', 'Style': 'Clear' });
// NUNCA omitir Style — el default del componente puede no ser el correcto
// SIEMPRE desactivar iconos (Primary Y Disabled traen flechas por defecto)
```

### Nav — flujos internos vs home
| Contexto | Nav |
|----------|-----|
| Flujos internos (compra, venta, KYC, confirmación) | `chevron-left` (`d2e8133...`) + título centrado |
| Home y tabs principales | Tab Bar (`997b7411...`) |
- **NUNCA** Tab Bar en pantallas de flujo interno

### Keyboard numérico — ABSOLUTE al fondo del screen
```javascript
const keyboard = keyboardComp.createInstance(); // key: 9c1814d08f64b86d94c0280b4bc16ae550d1e1a9
screen.appendChild(keyboard);            // al screen, NO al content
keyboard.layoutSizingHorizontal = 'FILL';
keyboard.layoutPositioning = 'ABSOLUTE';
keyboard.x = 0;
keyboard.y = screen.height - keyboard.height; // anclar al bottom
```

### Icon + text → siempre frame horizontal
```javascript
// ❌ MAL — emoji inline en texto: "🕐 14:32 · 🌐 190.157.44.21"
// ✅ BIEN — frame por cada par
// Frame "meta-item" [HORIZONTAL, gap:4, cross:CENTER]
//   ├── INSTANCE icon del DS [FIXED 14×14]
//   └── TEXT label
```

### Avatar — siempre Initials 40
- ✅ Initials 40: `153a9c5ca737178605ec13664cde63246fff27d9`
- ❌ Icon 40: `fe7009e8eb7f0529071fa27d63617e1dbc631315` — muestra placeholder LinkedIn

### Chips inactivos — usar Disabled, NO Secondary
- ✅ Inactivo: `Medium · Disabled · Primary` key `c69d198ed4d0aaeb4442a27a282f94d704f158ca` → gris neutro
- ❌ Secondary → renderiza rosa/magenta (incorrecto)

### Input uTransfer — solo activar lo que sirve al contexto
```javascript
// Antes de instanciar, preguntarse:
// ¿El usuario necesita label? Solo si hay varios inputs juntos
// ¿El chevron tiene función? Solo si abre picker/dropdown
// ¿El ícono izquierdo comunica algo? Solo si identifica el campo
// ¿El helper text agrega valor? Solo si hay validación
inst.setProperties({
  'Label#64:6': false,      // desactivar si el placeholder es suficiente
  'Left Icon#64:7': false,
  'Right Icon#64:4': false,
  'Helper Text#64:5': false,
  'Input#321:37': true,
});
```

### Toolbar Sheet — uTransfer
```javascript
// Key: a6d218d836a442bd0aa736f59c21090e2f596f49 (Style=Center)
try { toolbar.setProperties({ 'Show lGrabber#40006426:16': false }); } catch(e) {}
try { toolbar.setProperties({ 'Show Der#40006426:11': false }); } catch(e) {}
try { toolbar.setProperties({ 'Show Iz#40006426:0': true }); } catch(e) {}
// Swap X→chevron:
for (const ico of toolbar.findAll(n => n.type === 'INSTANCE')) {
  const m = await ico.getMainComponentAsync();
  if (m?.name?.includes('x-02')) { ico.swapComponent(chevronComp); break; }
}
// IGrabber = solo en bottom sheets. En flujos internos: siempre OFF.
```

---

## 4. LAYOUT DE CANVAS

### Landing page = 1 frame padre VERTICAL
```javascript
// ❌ MAL — secciones sueltas en canvas
// ✅ BIEN — todo dentro del frame padre
const landing = figma.createFrame();
landing.name = 'Landing Page';
landing.layoutMode = 'VERTICAL';
landing.primaryAxisSizingMode = 'AUTO';
landing.resize(1440, 100);
landing.itemSpacing = 0;
landing.paddingTop = landing.paddingBottom = landing.paddingLeft = landing.paddingRight = 0;
landing.fills = [];
for (const s of sections) {
  landing.appendChild(s);
  s.layoutSizingHorizontal = 'FILL';
  s.layoutSizingVertical = 'HUG';
}
```

### Canvas Borrrador USDT-ORO — filas por familia
| Familia | Y row | X inicio | Gap entre screens |
|---------|-------|----------|-------------------|
| W (Wallet) | 0 | 0 | 88px |
| PP (PayPal) | 1000 | 0 | 88px |
| VD (Visa Direct) | 2000 | 0 | 88px |
| Nuevas familias | 3000, 4000… | 0 | 88px |

```javascript
const Y_ROW = 2000; // ajustar según familia
const GAP = 88;
screens.forEach((s, i) => { s.x = i * (393 + GAP); s.y = Y_ROW; });
```

---

## 5. VERIFICACIÓN / SCREENSHOTS

### NUNCA usar `ghost_screenshot` para Figma
```bash
# ❌ ghost_screenshot → error 400 (imagen Retina 4000px+, muy grande para API)

# ✅ BIEN
node src/index.js verify "NODE_ID" --save /tmp/verify.png
# Luego Read /tmp/verify.png
```

---

## 6. AIRPALS — Específico

### Input y Checkbox NO están publicados en la librería
Desde archivo Borrador, `importComponentByKeyAsync` falla para Input y Checkbox.
Usar helpers manuales:

```javascript
// Input placeholder
const makeInput = (label, w) => {
  const wrap = vf('Input ' + label, { w, fixW: true, gap: 4 });
  wrap.appendChild(txt(label, 'bodySR', C.muted));
  const field = hf('Field', { w, fixW: true, fill: C.white, pt: 10, pb: 10, pl: 12, pr: 12, r: 6 });
  field.resize(w, 44);
  field.primaryAxisSizingMode = 'FIXED';
  field.counterAxisSizingMode = 'FIXED';
  field.appendChild(txt(label + '...', 'bodyMR', C.muted));
  wrap.appendChild(field);
  return wrap;
};

// Checkbox placeholder
const makeCheckbox = (label, w) => {
  const row = hf('Checkbox row', { gap: 8, cross: 'CENTER' });
  row.appendChild(rect(16, 16, C.white, 3));
  row.appendChild(txt(label, 'bodySR', C.navy, w - 30));
  return row;
};
```

### Landing Airpals — flujo demo
1. Hacer 4 preguntas con opciones A/B/C antes de construir
2. Si Mau dice "decide tú" → elegir, anunciar en 2 líneas, construir directo
3. Resumen al terminar: producto · audiencia · CTA · secciones · dimensiones
