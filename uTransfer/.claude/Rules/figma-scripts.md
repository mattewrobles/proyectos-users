# uTransfer — Scripts y comandos Figma CLI

> Cargar cuando: escribes o ejecutas scripts JavaScript para Figma.

---

## CLI — Comandos principales

```bash
# Conectar (una vez por sesión)
cd /Users/mau/Developer/Claude/figma-cli && node src/index.js connect

# Ejecutar script
node src/index.js run /tmp/mi_script.js

# Código inline
node src/index.js eval "figma.root.name"

# Info del canvas actual
node src/index.js canvas info

# Ver variables de librería
node src/index.js var list

# Screenshot para verificar
node src/index.js verify
```

---

## Patrón base de script — estructura obligatoria

```javascript
(async () => {
  // ─── FASE 1: Importar todo ANTES de crear nodos ───────────────────
  // Si algo falla aquí, no hay basura en el canvas.

  // Navegar a la página
  const page = figma.root.children.find(p => p.name === 'Pruebas');
  await page.loadAsync();
  await figma.setCurrentPageAsync(page);  // setCurrentPageAsync, no = 

  // Limpiar nodos anteriores con el mismo nombre (evitar duplicados)
  const existing = page.children.filter(n => n.name === 'Mi Frame');
  existing.forEach(n => n.remove());

  // Cargar fuentes
  await Promise.all([
    figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' }), // con espacio
  ]);

  // Importar variables de librería (en paralelo)
  const allCols = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
  async function importVar(colName, varName) {
    const col = allCols.find(c => c.name === colName);
    const vars = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(col.key);
    const v = vars.find(v => v.name === varName);
    return v ? await figma.variables.importVariableByKeyAsync(v.key) : null;
  }

  const [cardBg, textPrimary, radiusV, spacingV] = await Promise.all([
    importVar('🧩 Tokens', 'Cards-Fills/Card'),
    importVar('🧩 Tokens', 'Text/Primary'),
    importVar('⊙ Radius', 'Radius-2xl'),
    importVar('⊢⊣ Spacing', 'Spacing-6'),
  ]);

  // Importar componentes
  const [btnComp] = await Promise.all([
    figma.importComponentByKeyAsync('15be15cfa0d8c4667e4eb8f84bf80f9919e019c9'),
  ]);

  // Importar text styles
  const [titleStyle] = await Promise.all([
    figma.importStyleByKeyAsync('41243533aec36fb477c160301ba9c854ebaf0c01'),
  ]);

  // ─── FASE 2: Construir nodos ───────────────────────────────────────
  // Aquí ya nada debería fallar.

  // Helpers
  function vFill(v) {
    return [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.1 },
      boundVariables: { color: { type: 'VARIABLE_ALIAS', id: v.id } } }];
  }
  function bindR(node, rv) {
    ['topLeft','topRight','bottomLeft','bottomRight']
      .forEach(c => node.setBoundVariable(c + 'Radius', rv));
  }
  function bindPad(node, v) {
    ['paddingTop','paddingRight','paddingBottom','paddingLeft']
      .forEach(p => node.setBoundVariable(p, v));
  }

  // Crear frame
  const frame = figma.createFrame();
  frame.name = 'Mi Frame';
  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'FIXED'; // FIXED o AUTO (no FILL)
  frame.resize(353, 100);
  frame.counterAxisAlignItems = 'CENTER'; // MIN | MAX | CENTER | BASELINE
  if (cardBg) frame.fills = vFill(cardBg);
  if (radiusV) bindR(frame, radiusV);
  if (spacingV) {
    bindPad(frame, spacingV);
    frame.setBoundVariable('itemSpacing', spacingV);
  }

  // Texto
  const title = figma.createText();
  title.characters = '¡Hola!';
  title.textAlignHorizontal = 'CENTER';
  if (titleStyle) await title.setTextStyleIdAsync(titleStyle.id); // async!
  if (textPrimary) title.fills = vFill(textPrimary);
  frame.appendChild(title);
  title.layoutSizingHorizontal = 'FILL'; // FILL solo después de appendChild

  // Botón
  const btn = btnComp.createInstance();
  frame.appendChild(btn);
  btn.layoutSizingHorizontal = 'FILL';

  // Posicionar y seleccionar
  frame.x = 100; frame.y = 100;
  figma.viewport.scrollAndZoomIntoView([frame]);
  figma.currentPage.selection = [frame];

  return { status: 'ok', id: frame.id, size: { w: frame.width, h: frame.height } };
})()
```

---

## Scripts de utilidad

### Auditar colores hardcoded en la página actual
```javascript
(async () => {
  const page = figma.currentPage;
  const hardcoded = [];
  function walk(node) {
    if ('fills' in node && Array.isArray(node.fills)) {
      for (const fill of node.fills) {
        if (fill.type === 'SOLID' && !fill.boundVariables?.color) {
          hardcoded.push({ id: node.id, name: node.name });
          break;
        }
      }
    }
    if ('children' in node) node.children.forEach(walk);
  }
  walk(page);
  return { count: hardcoded.length, nodes: hardcoded.slice(0, 20) };
})()
```

### Listar tokens por categoría
```javascript
(async () => {
  const cols = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
  const tokensCol = cols.find(c => c.name === '🧩 Tokens');
  const vars = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(tokensCol.key);
  const cats = {};
  for (const v of vars) {
    const cat = v.name.split('/')[0];
    if (!cats[cat]) cats[cat] = [];
    cats[cat].push(v.name);
  }
  return cats;
})()
```

### Limpiar todos los nodos de una página excepto uno
```javascript
(async () => {
  const page = figma.root.children.find(p => p.name === 'Pruebas');
  await page.loadAsync();
  await figma.setCurrentPageAsync(page);
  const KEEP_ID = 'ID_A_CONSERVAR';
  const toDelete = page.children.filter(n => n.id !== KEEP_ID);
  toDelete.forEach(n => n.remove());
  return { deleted: toDelete.length };
})()
```

---

## Errores comunes y sus fixes

| Error | Fix |
|-------|-----|
| `Cannot call without loadAllPagesAsync` | Usar `await page.loadAsync()` en la página específica, NO `loadAllPagesAsync` (muy lento) |
| `Cannot call set_currentPage` | `await figma.setCurrentPageAsync(page)` |
| `Cannot call set_textStyleId` | `await node.setTextStyleIdAsync(id)` |
| `HUG can only be set on auto-layout children` | Quitar `layoutSizingHorizontal = 'HUG'` en instancias — solo usar FILL o dejar por defecto |
| `counterAxisSizingMode FILL invalid` | Usar `'FIXED'` o `'AUTO'` |
| `Invalid enum: END` | Usar `'MAX'` en vez de `'END'` para alineación |
| `Execution timeout (90s)` | Evitar `findAll` con funciones o `loadAllPagesAsync`. Buscar por ID o en páginas específicas con scan limitado a 2-3 niveles |
