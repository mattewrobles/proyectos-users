# uTransfer DS — Catálogo de componentes

> Cargar cuando: creas instancias de componentes, revisas variantes o describes el DS a terceros.
> Todos los componentes están en la librería `Utransfer_D_S`.

---

## Importar componente de librería

```javascript
const comp = await figma.importComponentByKeyAsync('KEY');
const instance = comp.createInstance();
parent.appendChild(instance);
instance.layoutSizingHorizontal = 'FILL'; // SIEMPRE después de appendChild
```

---

## Botones

### `Actions` — Botón principal del DS

El componente más completo y más usado. 6 jerarquías × múltiples estados × 4 tamaños.

**Jerarquías:**
- `Primary` — botón principal. Fondo de marca, texto blanco. El más usado.
- `Secondary` — apoyo en flows que necesitan segunda acción.
- `Clear` — sin fondo visible, para no sobrecargar el diseño.
- `Error` — ayuda visual para acciones destructivas o de error.
- `Success` — confirmación visual de que algo salió bien.
- `Tertiary` — complemento en layouts complejos, similar a Clear.

**Estados por jerarquía:** `Default` · `Hover` · `Outline` · `Disabled`

**Tamaños:** `Giant` (predeterminado) · `Large` · `Medium` · `Small`

**Booleans / instancias:**
- Activar/desactivar icono izquierdo o derecho
- Mostrar solo icono (sin texto)
- Reemplazar icono por cualquier otro del set
- Reemplazar texto del label

**Keys de instancia:**

| Variante | Key |
|----------|-----|
| Giant · Default · Primary | `15be15cfa0d8c4667e4eb8f84bf80f9919e019c9` |
| Giant · Disabled · Primary | `c31e596f9c633e08cd3e492699bfa9f3d594313c` |
| Giant · Default · Clear | `c4757e2398d2f767b0b188296d6efe17d15e1b9c` |

```javascript
btn.setProperties({
  'Icon Left#34:8':  false,
  'Icon Right#34:7': false,
  'State':           'Default',   // 'Default' | 'Disabled'
  'Content':         'Icons + Text',
  'Style':           'Primary',
});
// Cambiar texto
const textNode = btn.findAllWithCriteria({ types: ['TEXT'] })[0];
await figma.loadFontAsync(textNode.fontName);
textNode.characters = 'Tu texto';
```

---

### `Dashboard Button`

Botón para panel de administración/backoffice. No es el botón principal del flujo consumer.

---

### `Social Button` · `Social Button Group`

Login con Facebook, Google, Apple. Poco usados en el flow principal.
- Variantes: `Label=True/False`, `Theme=Outline/Filled`
- ⚠️ Pendiente: renombrar propiedad `Tema=` a `Theme=` (actualmente en español)

---

### `App Store Button`

Badges de Google Play, App Store, Galaxy Store, AppGallery.

---

## Toggle / Tabs

### `Toggle Button`

Componente que cambia entre dos estados dentro de un Tab Bar o x/Tab.
- **Estados:** `On` / `Off`
- **Booleans:** ocultar/mostrar iconos, cambiar icono, cambiar texto
- Uso: filtros, switches de vista, selección binaria en pantallas

### `Tab Bar`

Navegación inferior principal de la app.
- `Type`: `Bottom` / `Body`
- `Text`: con/sin etiqueta de texto
- `Background Blur`: `True/False` (liquid glass activado)
- ⚠️ Hay 2 componentes `Tab Bar` — duplicado pendiente de resolver manualmente

---

## Tooltips

Estados: `On` / `Off`
Booleans: ocultar/mostrar icono, cambiar texto
Uso: mensajes de ayuda contextual. No está en uso activo actualmente.

---

## Inputs y formularios

### `Input` — Componente más completo del DS (36 variantes)

El más usado en formularios. Tokens aplicados en auditoría 2026-04-14.

**Estados:**
- `Default` — vacío, sin foco
- `Filled` — usuario ingresó datos
- `Hover` — cursor encima (web)
- `Focus` — campo activo (borde azul brand)
- `Disabled` — campo no editable
- `Success` — validación correcta (borde verde)
- `Info` — mensaje informativo (borde azul)
- `Warning` — advertencia (borde amarillo)
- `Error` — validación fallida (borde rojo + helper text)

**Tamaños:** `Large` (predeterminado) · `Medium`

**Estilos:** `Outline` · `Filled` (fondo tintado según estado)

**Booleans / instancias:**
- Mostrar/ocultar icono izquierdo
- Mostrar/ocultar helper text
- Cambiar icono por cualquiera del set
- Editar label, placeholder, helper text

**Tokens aplicados (post-auditoría 2026-04-14):**
- Placeholder / helper text → `Text/disabled`
- Texto activo en estados `Filled` (Success/Info/Warning/Error) → `Text/on-tint`
- Borde hover → `Border/Primary`
- Borde focus → `Border/focus`
- Borde success → `status/success`
- Borde error → `status/danger`
- Borde warning → `status/warning`
- Borde info → `status/info`
- Iconos → `Icon/Primary` (stroke)

**Keys de instancia:**

| Variante | Key |
|----------|-----|
| Default · Large · Outline | `85a6f7f74d08b5dbc46d9593345f458eca417bff` |
| Disabled · Large · Outline | `631be5a59ee2aa5ed648147dce07876963b177f3` |
| Disabled · Large · Filled | `0908ecd4774705ee0d989aad3c1b3d62429957f1` |

```javascript
input.setProperties({
  'Label': 'Email',
  'Placeholder': 'tucorreo@email.com',
  'State': 'Inactive',   // 'Inactive' | 'Active' | 'Disabled'
});
```

---

### `OTP Input`

Input de código de verificación (4-6 dígitos).
- Estados: `Default` · `Active` · `Typing` · `Error`
- Uso: confirmación de identidad, 2FA

---

### `Search Bar` (10 variantes)

- Estados: `Enabled` · `Enabled Value` · `Hover` · `Focus`
- Forma: `Off` (rectangular) · `On` (pill)
- Placeholder → `Text/disabled` (aplicado 2026-04-14)

---

### `Text Area`

Caja de texto multilínea. Estados similares al Input: hover, active, error, con/sin label, con/sin icono.

---

## Selectores

### `Switch`

Toggle para activar/desactivar opciones.
- Estados: `Active` · `Disabled` + variantes intermedias
- Uso: settings, preferencias, activar features

### `Radio Button`

Selección única dentro de un grupo de opciones.

### `Badge`

Indicador numérico / de notificación.
- Tipos: `1 digit` · `2 digits` · `Round`
- Tokens: fill → `status/danger`, texto → `Text/Invert`
- Uso: notificaciones, contadores, alertas de cantidad

---

## Cards y modales

### `Dialog` (16 variantes)

Modal de mensaje corto.
- Tipos: `primary` · `critical`
- Con/sin ilustración, con/sin descripción
- 1 o 2 acciones (botones editables directamente)
- Fill: `Backgrounds/Bg-glass 2` + effect style `Dialog` (`206d603d7fe94a4a4a5ec3d78805b70021c15a4c`)
- Uso: confirmaciones, alertas, notificaciones importantes

### `Pop-Up`

Modal con formulario interno.
- Layout de botones: `Vertical` · `Horizontal`
- Tiene título, subtítulo (ocultables), label, input y botones
- Similar al Dialog pero más complejo

### `Action Sheet`

Sheet que sube desde la parte inferior.
- Variantes: `Actions + Button` · `Message + Actions + Button`
- Contenido: lista de acciones + botón cancelar

### `Banner` (30 variantes)

Card condensada para información en pantalla.
- Tipos: `Negative` · `Secondary` · `Warning` · `Positive`
- Con/sin título, con/sin descripción
- Resize: `Fill` (ocupa ancho completo) · `Hug` (se ajusta al contenido)

### `Toast` (25 variantes)

Notificación flotante temporal. Aparece en la parte superior.
- Estilos: `1` `2` `3` `4` (pendiente renombrar a Solid/Subtle/Outline/Ghost)
- Estados: `Default` · `Info` · `Success` · `Warning` · `Error`
- Uso: feedback de acciones (envío exitoso, error de red, confirmación)

### `Notification Message`

Notificación inline dentro del contenido.
- Tipos: `Neutral` · `Success` · `Warning` · `Danger`

### `Alert Vertical` · `Alert Horizontal`

Alertas embebidas en el contenido de la pantalla.

---

## Listas

### `List` (4 variantes)

Lista de ítems con estado de transacción.
- Estados: `Succeeded` · `Failed`
- Cada ítem tiene icono y selector

### `List (Right Item)` (6 variantes)

Lista con elemento derecho variable.
- Right item: `Text + Icon` · `Badge + Icon` · `Toggle` · `Radio`
- Uso: listas de configuración, menús con acciones

### `List Item`

Ítem de lista individual standalone. Base para construir listas custom.

---

## Avatares y sociales

### `Avatar`

Componente de imagen de perfil.
- Variantes: con imagen / solo iniciales (texto) / con icono
- Estados: con símbolo de activo/conectado
- Grupos de avatares disponibles
- Texto de iniciales → `Text/Invert` (aplicado 2026-04-14)

### `Social Icon` (53 variantes)

Iconos de redes sociales y plataformas.
- Plataformas: Messenger, WhatsApp, Twitch, Spotify, mail, etc.
- Colores: `Negative` (monocromático) · `Original` (color de marca de cada plataforma)

### Labels y chips de estado

Chips de color semántico: peligro, alerta, completado, información.
Tamaños según contexto de uso.

---

## Navegación

### `Tab Bar`

Barra de navegación inferior — navegación principal de la app.
- `Type`: `Bottom` / `Body`
- `Text`: con/sin etiqueta
- `Background Blur`: `True/False`

### `Toolbar Sheet`

Toolbar superior en sheets y modales.
- Estilos: `Center` · `Left` · `Bottom` · `Compact Large`

### `Status bar`

Barra de estado del sistema iOS.
- Variantes: `Compact` · `Minimal` · `Incoming Call` · `Expanded`
- `Dark=True/False` — pendiente: manejar con variables en vez de propiedad manual

> ⚠️ Usar `getNodeByIdAsync('1:916')` para instanciar — no `importComponentByKeyAsync`

```javascript
const statusBarComp = await figma.getNodeByIdAsync('1:916');
const statusBar = statusBarComp.createInstance();
screen.appendChild(statusBar);
statusBar.layoutSizingHorizontal = 'FILL';
```

### `Home Indicator`

Indicador inferior iOS (pill).
- `Dark Theme=True/False`

### `Top Bar`

Barra superior de pantalla.
- 2 variantes: `Default` + segunda sin nombre definido (pendiente)

---

## Feedback y loading

### `Inline Loader`

Indicador de carga inline, no bloquea toda la pantalla.
- `Duration=Short/Long`

### `Spinner`

Indicador de carga circular.
- 4 variantes de estilo (pendiente renombrar)

### `Loading Animation`

Animación de carga con 6 frames (Frame 1 a Frame 6) para animar en prototype.

### `Feedback`

Card de resultado de acción.
- Tipos: `Default` · `Positive` · `Negative`
- Tamaños: `Large` · `Medium`

---

## Stepper y progreso

### `Stepper`

Indicador de pasos de un flujo.
- Dirección: `Vertical` · `Horizontal`
- Uso: onboarding, flujo de envío de dinero

### `Stepper Icon`

Ícono de estado dentro del stepper.
- Estados: `Default` · `Active` · `Done`
- ⚠️ Pendiente: quitar emojis de valores de variante

### `Progress Bar`

Barra de progreso numérica.
- `Number=2/3/4/5` — cantidad de pasos del flujo

### `Progress Indicator`

Indicador de paso activo.
- `State=Inactive/Active`

### `Page Control` (35 variantes)

Dots de paginación.
- `Dots=2-7` × `Selection=1-N`
- Uso: carruseles, slides de onboarding

---

## Efectos visuales

### `Scroll Edge Effect - Soft` · `Scroll Edge Effect - Hard`

Simula liquid glass / fade en el borde del scroll. De los componentes más útiles en listas largas.
- `Edge=Leading/Trailing/Bottom/Top`
- **Soft** → fade suave. **Hard** → corte más definido.

### `Liquid Glass - Small (BG Context = Bright/Dim)` · `Liquid Glass - Clear/Light`

Ejemplos de glassmorphism. El Scroll Edge Effect es el más útil para uso real.

---

## Iconos

### `Icon` (contenedor)

Wrapper para cambiar iconos en otros componentes.
- Tamaños: `8` · `12` · `16` · `24`
- ⚠️ Hay 2 componentes `Icon` — duplicado pendiente de resolver

### `Graphic Data` · `Wave`

Elementos gráficos / decorativos.
- `Color=Primary/Secondary`

---

## Teclado

### `Keyboard`

Teclado virtual.
- `Type=On/Off` — teclado de texto vs numérico
- Uso: mostrar estado con teclado visible en diseños de flujo

---

## Tarjetas bancarias (referencia futura)

`Credit Card` · `Visa` · `Card Selector` · `Card Swipe`
Componentes de tarjetas físicas / virtuales. Diseñados para uso futuro, no activos ahora.
- `Card Selector`: variantes Default / Country / Bank
- `Card Swipe`: `State=Default/Deleting/Deleted`
- ⚠️ `Card Swipe` tiene propiedad `Tema=` en español — pendiente renombrar

---

## Dashboard / Backoffice (ignorar en flujos consumer)

`Backoffice Top Bar` · `Backoffice Sidebar`
Solo para panel de administración. No aplican al flujo de usuario principal.

---

## Ilustraciones — Component Set "Ilustraciones 2"

**Parent set key:** `2e971bf43bcece2313ebf7c3a775e6333369d059`

| Nombre | Key | Uso sugerido |
|--------|-----|-------------|
| Wallet 01 | `e4b09f3c3b1242ba4e786d74396977f94498e2de` | Transferencia exitosa |
| Wallet 02 | `c9a29cc971143518f852091ee93c6391b7c52891` | — |
| Wallet 03 | `fc260a0441f985f02ae6193e57576321541435cc` | — |
| Wallet 04 | `4dd91f2d7ba2790c18263b1b5af4371568e7800a` | — |
| Wallet 05 | `a0c5ed3f766dafcc880edf3254107f8144f6c983` | — |
| Connectivity 01 | `1f1be5b89275ffdcc72b9a748e99654fdfc8259f` | Sin conexión |
| Connectivity 02 | `0f530586d586f24611d7318d25146d1213938945` | — |
| Connectivity 03 | `6fc75c45249e628726141250dfd558b8dc99e473` | — |
| Messages 01 | `e7bcee81839f88e9958f207fc3a189a00d8ac55d` | Notificaciones |
| Messages 02 | `658cbf6f1d78c7548af2f6cf48b5aeeeac3ad575` | — |
| Social 02 | `d412c7148f3c01f72bc458630443c6fbbe321ad8` | — |
| Social 03 | `648d128b6469ea2d31ae7b8da02b96975b128c32` | — |
| Social 05 | `c31e46409f13259b18ce18f0e5cc7d2323233a45` | — |
| Not Found | `b2f3e10b80c3cbb1bfd1532a86e9869dcd1e154e` | Error / vacío |

```javascript
const illust = await figma.importComponentByKeyAsync('e4b09f3c3b1242ba4e786d74396977f94498e2de');
const inst = illust.createInstance();
parent.appendChild(inst);
inst.resize(200, 200);
```

---

## Text Styles

| Estilo | Key | Tamaño |
|--------|-----|--------|
| Headers/H3 | `41243533aec36fb477c160301ba9c854ebaf0c01` | 28px |
| Headers/H5 | `a761967b66cd94663df9cacbe06c32f68b48b7e7` | 20px |
| Subtitle/Subtitle M | `df46c8797813b902f6164fa2ea73a2e58e0b13df` | 16px |
| Caption/Caption 1 | `3c4a22b5a0d0e65480fea3cbc965b935ee9a610c` | 12px |
| Body/Body SM | `f62d08a99c5536e757c75e4620106c18c618a9d8` | 12px |

```javascript
// SIEMPRE setTextStyleIdAsync — nunca textStyleId = (falla en dynamic-page)
const style = await figma.importStyleByKeyAsync('41243533aec36fb477c160301ba9c854ebaf0c01');
await textNode.setTextStyleIdAsync(style.id);
```

---

## Pendientes del DS (post-auditoría 2026-04-14)

| Pendiente | Severidad |
|-----------|-----------|
| Propiedades en español: `Estado=`, `Texto=`, `Tema=` en Social Button, Notification Center, Card Swipe | Alta |
| `Dark mode=True/False` manual en Transaction, Card, List → usar variables automáticas | Media |
| Duplicados: `Icon` (×2), `Tab Bar` (×2) sin resolver | Media |
| `Property 1` genérica en Face ID Prompt, Visa, Tab Bar | Media |
| Emojis en valores de variante de Stepper Icon | Baja |
| Flechas (→) en valores de variante de Stepper Direction | Baja |
