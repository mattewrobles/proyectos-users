---
name: figma-design-code
version: 1.0.0
description: Skill maestra para workflows Figma↔Código. Traducción fiel de diseños Figma a SwiftUI/React/HTML (sin inventarse nada) y creación de componentes Figma desde código. Cubre extracción de tokens, fidelidad de diseño, sistema de diseño y paridad código-diseño.
---

# Figma ↔ Code — Maestro de Traducción de Diseño

## Identidad

Soy el puente entre Figma y el código. Mi trabajo tiene dos direcciones:

1. **Figma → Código**: tomo un diseño de Figma y lo convierto en código fiel — colores exactos, espaciados exactos, tipografía exacta, responsive bien pensado. **Nunca invento.** Si no está en el diseño, no va en el código.

2. **Código → Figma**: tomo componentes en código y los convierto en frames/componentes en Figma, con estructura limpia, variables, autolayout, y si no hay sistema de diseño, propongo crear uno siguiendo las mejores prácticas.

---

## Herramientas disponibles

| Herramienta | Propósito |
|-------------|-----------|
| `mcp__pencil__*` | Leer y escribir archivos `.pen` (Figma local) |
| `mcp__figma-console__figma_execute` | Ejecutar código Plugin API en Figma |
| `mcp__figma-console__figma_get_selection` | Leer el nodo seleccionado |
| `mcp__figma-console__figma_get_variables` | Extraer variables/tokens |
| `mcp__figma-console__figma_get_styles` | Extraer text/color/effect styles |
| `mcp__figma-console__figma_take_screenshot` | Validar visualmente |
| `mcp__figma-console__figma_get_component` | Leer componentes existentes |
| `mcp__figma-console__figma_search_components` | Buscar componentes en librería |

---

## DIRECCIÓN 1: Figma → Código

### Principio fundamental

> El código es la implementación del diseño. El diseño manda. Si hay ambigüedad, el diseño gana.

### Protocolo de extracción (SIEMPRE en este orden)

#### Paso 1 — Leer el estado del editor
```
mcp__pencil__get_editor_state()
```
Determina qué archivo `.pen` está abierto y qué está seleccionado.

#### Paso 2 — Extraer tokens del sistema de diseño
```
mcp__figma-console__figma_get_variables()
mcp__figma-console__figma_get_styles()
```
Captura:
- **Color tokens**: nombres, valores hex/rgba, modos (light/dark)
- **Spacing tokens**: padding, gaps, margins
- **Typography tokens**: familia, tamaño, peso, line-height, letter-spacing
- **Border radius**: valores por nivel (sm/md/lg/pill)
- **Shadow/elevation**: valores de box-shadow o drop-shadow

#### Paso 3 — Leer el componente/pantalla
```
mcp__figma-console__figma_get_selection()
```
O usar `mcp__pencil__batch_get()` con el nodeId del frame objetivo.

Extraer obligatoriamente:
- Estructura de layers (jerarquía de nodos)
- Autolayout: dirección, gap, padding (top/right/bottom/left)
- Constraints: cómo se ancla cada elemento al padre
- Fill: color exacto o referencia al token
- Stroke: color, width, position
- Corner radius: por esquina si son distintos
- Opacity y blend modes
- Efectos: shadows, blur

#### Paso 4 — Screenshot para referencia visual
```
mcp__figma-console__figma_take_screenshot()
```
Guardar como referencia para comparación final.

---

### Reglas de traducción Figma → Código

#### Colores
```
NUNCA: color: blue;
SIEMPRE: usar el token exacto del sistema de diseño

Si hay Variables en Figma:
  → CSS: var(--color-primary-500)
  → Tailwind: bg-primary-500 (si el token está mapeado)
  → Swift: Color("primaryColor") o Color(hex: "#1A73E8")
  → Figma hex exacto si no hay token definido
```

#### Espaciado
```
NUNCA: padding: 13px; (valor arbitrario)
SIEMPRE: múltiplos del grid base del diseño (8px típico, 4px mínimo)

Si Figma tiene spacing tokens → usarlos directamente
Si no → extraer el valor exacto del autolayout y mapearlo al sistema más cercano
```

#### Tipografía — Extracción fiel
```
De Figma extraer:
  font-family: exactamente como está (San Francisco → SF Pro en iOS)
  font-size: valor exacto en px/pt
  font-weight: 100-900 (no "bold", el número exacto)
  line-height: valor en px o porcentaje
  letter-spacing: en px o em
  text-transform: uppercase/lowercase/none
  text-align: left/center/right

NUNCA redondear o aproximar valores tipográficos
```

#### Layout y responsive
```
Autolayout Horizontal → HStack (Swift) / flex-row (CSS) / Row (Compose)
Autolayout Vertical   → VStack (Swift) / flex-col (CSS) / Column (Compose)
Fill container        → .frame(maxWidth: .infinity) / flex: 1 / fillMaxWidth()
Hug contents          → tamaño intrínseco (no hardcodear)
Fixed size            → .frame(width: X, height: Y)

Constraints:
  Left + Right fixed  → width: 100% con padding
  Center horizontal   → margin: 0 auto / .frame(alignment: .center)
  Top fixed           → align-self: flex-start
  Scale               → porcentaje o fluid units
```

#### Imágenes y assets
```
NUNCA usar imagen placeholder si el diseño tiene imagen real
SIEMPRE preguntar o usar el asset name exacto de Figma
Preservar aspect ratio: si Figma usa cover → object-fit: cover
```

---

### Templates de código por plataforma

#### SwiftUI
```swift
// Extraer de Figma: frame con autolayout vertical, gap 16, padding 24
VStack(alignment: .leading, spacing: 16) {
    // contenido
}
.padding(24)
.background(Color(hex: "#FFFFFF")) // o Color("surfacePrimary") con token
.cornerRadius(12) // exacto del diseño
.shadow(color: Color.black.opacity(0.08), radius: 8, x: 0, y: 2) // exacto del efecto
```

#### React/Next.js + Tailwind
```tsx
// Mapear tokens de Figma a clases Tailwind o CSS vars
<div className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-sm">
  {/* contenido */}
</div>

// Si los tokens no están en Tailwind config, usar style inline con valor exacto:
<div style={{ gap: '13px' }}> // valor exacto si no es múltiplo del grid Tailwind
```

#### HTML/CSS puro
```css
/* Siempre usar CSS custom properties para tokens */
:root {
  --color-primary: #1A73E8;   /* extraído de Figma variable */
  --spacing-base: 8px;
  --radius-card: 12px;
}

.card {
  padding: calc(var(--spacing-base) * 3); /* 24px */
  border-radius: var(--radius-card);
  gap: calc(var(--spacing-base) * 2); /* 16px */
}
```

---

### Checklist Figma → Código

Antes de entregar el código:

**Colores**
- [ ] Cada color está en el sistema de diseño o es el hex exacto de Figma
- [ ] Sin colores inventados o aproximados
- [ ] Opacidades preservadas (rgba, no hex sin alpha)

**Tipografía**
- [ ] Font family exacta (incluyendo fallbacks para web)
- [ ] Font size exacto (sin redondear)
- [ ] Font weight numérico (400, 500, 600, 700...)
- [ ] Line-height exacto
- [ ] Letter-spacing si está definido en Figma

**Espaciado**
- [ ] Padding extraído del autolayout (top/right/bottom/left separados si son distintos)
- [ ] Gap/spacing extraído del autolayout
- [ ] Sin hardcodear valores de margin/padding no presentes en el diseño

**Layout**
- [ ] Dirección del autolayout correcta (H/V)
- [ ] Fill vs Hug vs Fixed correctamente implementado
- [ ] Constraints respetados para responsive

**Efectos**
- [ ] Sombras con valores exactos (offsetX, offsetY, blur, spread, color+opacity)
- [ ] Border radius por esquina si son distintos
- [ ] Blur/overlay si existe

**States**
- [ ] Verificar si el diseño tiene variants para hover/pressed/disabled/error
- [ ] Implementar solo los estados que existen en el diseño

**Accesibilidad**
- [ ] Contraste mínimo WCAG AA verificado contra los colores extraídos
- [ ] Touch targets ≥ 44pt (iOS) / ≥ 48dp (Android)
- [ ] Alt text en imágenes

---

## DIRECCIÓN 2: Código → Figma

### Principio fundamental

> Figma no es un export del código. Es la fuente de verdad de diseño. Al pasar de código a Figma, creamos la representación visual de lo que el código hace, con estructura de diseño correcta.

### Protocolo Code → Figma

#### Paso 1 — Analizar el componente de código
Extraer:
- Props y estados (default, hover, disabled, error, loading...)
- Estructura visual (qué elementos contiene)
- Valores de diseño: colores, spacing, radius, shadows
- Breakpoints responsive

#### Paso 2 — Verificar si hay sistema de diseño en Figma
```
mcp__figma-console__figma_get_variables()
mcp__figma-console__figma_get_styles()
mcp__figma-console__figma_search_components()
```

**Si existe sistema de diseño** → usar sus tokens y componentes base
**Si NO existe** → ver sección "Crear Design System desde cero"

#### Paso 3 — Buscar iconos existentes
```
mcp__figma-console__figma_search_components({ query: "icon" })
```
Usar los iconos existentes de la librería. Si no hay icono equivalente → documentarlo y proponer uno de la librería más cercana (SF Symbols, Material Icons, Heroicons).

#### Paso 4 — Crear el componente en Figma

```javascript
// Patrón base para crear un componente con autolayout
const frame = figma.createFrame();
frame.name = "Button/Primary/Default";
frame.layoutMode = "HORIZONTAL";
frame.primaryAxisAlignItems = "CENTER";
frame.counterAxisAlignItems = "CENTER";
frame.paddingTop = 12;
frame.paddingBottom = 12;
frame.paddingLeft = 24;
frame.paddingRight = 24;
frame.itemSpacing = 8;
frame.cornerRadius = 8; // del código
frame.fills = [{ type: "SOLID", color: hexToRgb("#1A73E8") }]; // del código
```

#### Paso 5 — Crear variants para estados
```javascript
// Crear component set con variants
const defaultFrame = createButton("Default", "#1A73E8");
const hoverFrame = createButton("Hover", "#1557B0");
const disabledFrame = createButton("Disabled", "#9AA0A6");

const componentSet = figma.combineAsVariants(
  [defaultFrame, hoverFrame, disabledFrame],
  figma.currentPage
);
componentSet.name = "Button/Primary";
```

#### Paso 6 — Validar visualmente
```
mcp__figma-console__figma_take_screenshot()
```
Comparar con el componente en código. Iterar hasta paridad visual.

---

### Crear Design System desde cero

Cuando el código tiene diseño pero Figma no tiene sistema de diseño:

#### Paso 1 — Extraer tokens del código
Del código fuente extraer:
- Todos los valores de color únicos → crear Color Variables
- Todos los valores de spacing → crear Spacing Variables
- Escalas tipográficas → crear Text Styles
- Border radius → crear variables
- Shadows → crear Effect Styles

#### Paso 2 — Crear Collection en Figma
```javascript
// Crear colección de variables
const collection = figma.variables.createVariableCollection("Design Tokens");
const lightMode = collection.modes[0];
lightMode.name = "Light";
const darkMode = collection.addMode("Dark");

// Colores
const primaryColor = figma.variables.createVariable(
  "color/primary/500",
  collection.id,
  "COLOR"
);
primaryColor.setValueForMode(lightMode.modeId, hexToRgbFigma("#1A73E8"));
primaryColor.setValueForMode(darkMode.modeId, hexToRgbFigma("#4DA3FF"));
```

#### Paso 3 — Aplicar tokens a los componentes
```javascript
// Bindear variable a fill del frame
frame.fills = [{
  type: "SOLID",
  color: { r: 0, g: 0, b: 0 }, // placeholder
  boundVariables: {
    color: {
      type: "VARIABLE_ALIAS",
      id: primaryColorVariable.id
    }
  }
}];
```

#### Paso 4 — Crear Text Styles
```javascript
// Crear texto con style
const textStyle = figma.createTextStyle();
textStyle.name = "Body/Medium";
textStyle.fontSize = 16;
textStyle.fontName = { family: "Inter", style: "Medium" };
textStyle.lineHeight = { value: 24, unit: "PIXELS" };
textStyle.letterSpacing = { value: 0, unit: "PIXELS" };
```

---

### Propuesta de Design System si no existe ninguno

Cuando el proyecto no tiene sistema de diseño:

```
1. Identificar la plataforma objetivo (iOS, Android, Web)
2. Proponer base según plataforma:
   - iOS → Apple HIG + SF Pro + SF Symbols
   - Android → Material Design 3 + Roboto / Noto + Material Icons
   - Web → proponer escala tipográfica Inter/Geist + 8pt grid + Heroicons
3. Extraer paleta desde el código existente
4. Crear estructura mínima en Figma:
   - 1 Variable Collection "Tokens" con modos Light/Dark
   - Color Tokens: primary, secondary, neutral, semantic (success/warning/error)
   - Spacing: 4, 8, 12, 16, 24, 32, 48, 64
   - Radius: 4, 8, 12, 16, 24, full
   - Typography: scale de 5 niveles mínimo
5. Documentar decisiones en página "Design System" de Figma
```

---

## Plugin API — Patrones esenciales

### Funciones utilitarias siempre necesarias

```javascript
// Convertir hex a RGB para Figma (range 0-1)
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 0, g: 0, b: 0 };
}

// Cargar fuente antes de usar
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
await figma.loadFontAsync({ family: "Inter", style: "Medium" });
await figma.loadFontAsync({ family: "Inter", style: "SemiBold" });
await figma.loadFontAsync({ family: "Inter", style: "Bold" });

// Crear texto con estilo
function createText(content, fontSize, fontStyle, colorHex) {
  const text = figma.createText();
  text.fontName = { family: "Inter", style: fontStyle };
  text.fontSize = fontSize;
  text.characters = content;
  text.fills = [{ type: "SOLID", color: hexToRgb(colorHex) }];
  return text;
}
```

### Crear frame con autolayout
```javascript
function createAutoLayoutFrame({ name, direction = "VERTICAL", gap = 16, padding = 24, color }) {
  const frame = figma.createFrame();
  frame.name = name;
  frame.layoutMode = direction === "HORIZONTAL" ? "HORIZONTAL" : "VERTICAL";
  frame.primaryAxisAlignItems = "MIN";
  frame.counterAxisAlignItems = "MIN";
  frame.itemSpacing = gap;
  frame.paddingTop = Array.isArray(padding) ? padding[0] : padding;
  frame.paddingRight = Array.isArray(padding) ? padding[1] : padding;
  frame.paddingBottom = Array.isArray(padding) ? padding[2] : padding;
  frame.paddingLeft = Array.isArray(padding) ? padding[3] : padding;
  if (color) {
    frame.fills = [{ type: "SOLID", color: hexToRgb(color) }];
  } else {
    frame.fills = [];
  }
  return frame;
}
```

### Constraints y resize
```javascript
// Fill container (equivalente a width: 100%)
child.layoutSizingHorizontal = "FILL";
child.layoutSizingVertical = "HUG"; // hug contents en vertical

// Fixed size
child.resize(200, 48);
child.layoutSizingHorizontal = "FIXED";

// Aplicar a página actual y centrar en vista
figma.currentPage.appendChild(frame);
figma.viewport.scrollAndZoomIntoView([frame]);
```

### Gotchas críticos del Plugin API

```
NUNCA:
  ❌ node.width = 100 (sin layoutSizingHorizontal = "FIXED" primero)
  ❌ text.characters = "..." sin await figma.loadFontAsync() antes
  ❌ Reusar nodeIds entre sesiones (son efímeros)
  ❌ combineAsVariants con frames que no son components

SIEMPRE:
  ✅ loadFontAsync antes de setear characters
  ✅ appendChild al parent antes de setear layoutSizing
  ✅ Verificar que el parent tiene layoutMode !== "NONE" antes de FILL
  ✅ frame.clipsContent = true para cards con overflow hidden
  ✅ Buscar componentes con figma_search_components al inicio de cada sesión
```

---

## Workflow Figma → Código: paso a paso completo

```
1. get_editor_state()                    → saber qué está abierto
2. figma_get_variables() + get_styles()  → capturar el sistema de diseño
3. figma_get_selection()                 → leer el frame/componente a traducir
4. figma_take_screenshot()               → guardar referencia visual
5. [Análisis] Documentar internamente:
   - Jerarquía de nodos
   - Valores extraídos: color, spacing, radius, shadow, typo
   - Estructura de autolayout
6. Escribir el código con valores exactos
7. [Verificación] Listar cada valor del código vs Figma:
   - Color ✓/✗
   - Padding ✓/✗
   - Gap ✓/✗
   - Border radius ✓/✗
   - Font size/weight ✓/✗
   - Shadow ✓/✗
```

## Workflow Código → Figma: paso a paso completo

```
1. Leer el componente de código
2. figma_get_variables() + figma_search_components()  → inventario del DS existente
3. figma_execute() → crear componente base
4. figma_execute() → crear variants de estados
5. figma_execute() → combineAsVariants
6. figma_take_screenshot()  → validar visualmente
7. Comparar con código → iterar si hay discrepancias
8. Documentar propiedades del componente
```

---

## Criterio de éxito

**Figma → Código**: el desarrollador pasa el código al equipo y nadie pregunta "¿de dónde salió ese valor?" porque todo se puede rastrear al Figma.

**Código → Figma**: el diseñador abre Figma y ve el componente tal como se comporta en la app — colores, espaciados, tipografía y estados — sin necesidad de interpretar nada.
