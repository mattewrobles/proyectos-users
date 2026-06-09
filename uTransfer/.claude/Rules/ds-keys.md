# uTransfer DS — Keys de componentes verificados

> **Fuente:** Escaneado en sesiones 2026-04-15 y 2026-04-22 desde `Utransfer v2`.
> - 2026-04-15: Sección `Enviar Billetera`, página `Home - Operaciones`
> - 2026-04-22: Sección `🧰 Kit`, página `Borrrador USDT-ORO` — scan completo de 425 componentes con `getMainComponentAsync()`
> Usar directamente con `figma.importComponentByKeyAsync(key)` — no necesitan re-escaneo.

---

## Sistema iOS

| Componente | Key | Variante |
|---|---|---|
| Status bar · Compact · Light | `222088d248a045f3d2e7df151f7d613bbda7fafd` | State=Compact, Dark=False ✅ |
| Status bar · Compact · Dark | `74f11501df265b2a4b7fdb151bb9e6086d598262` | State=Compact, Dark=True ✅ |
| Home Indicator (dark) | `e12f73d63ccef0537a22efd9a34228a9dc441bff` | Dark Theme=True |

---

## Toolbar Sheet ⭐ (DS component — usar en lugar de nav custom)

| Componente | Key | Dimensiones | Props |
|---|---|---|---|
| Toolbar Sheet · Center | `a6d218d836a442bd0aa736f59c21090e2f596f49` | 393×78px | Show Iz / Der / Grabber / Title / Subtitle |
| Toolbar Sheet · Abajo (Bottom) | `d765fc212adbb523263fc40eea4e4f971b05af8e` | 393×133px | — |

```javascript
// Toolbar Sheet — SIEMPRE usar en lugar de frame nav custom
const tbComp = await figma.importComponentByKeyAsync('a6d218d836a442bd0aa736f59c21090e2f596f49');
const tb = tbComp.createInstance();
screen.appendChild(tb);
tb.layoutSizingHorizontal = 'FILL';

// Props — ajustar según contexto
tb.setProperties({
  'Show lGrabber#40006426:16': false, // ← false en pantallas normales, true SOLO en modales/sheets
  'Show Der#40006426:11': false,       // ← false si no hay acción derecha
  'Show Iz#40006426:0': true,          // ← true para mostrar botón izquierdo (back)
});

// Swap ícono DENTRO del botón izquierdo — NUNCA swapear el botón entero
// Los botones del Toolbar Sheet siempre son botones; solo cambia el ícono dentro
const chevronComp = await figma.importComponentByKeyAsync('d2e8133159142cb934d56fc28be3ac0bc7eb07b4');
const controls = tb.findAll(n => n.name === 'Controls')[0];
const leftBtn = controls?.children.find(n => n.type === 'INSTANCE'); // primer hijo = botón izq
const iconInsideBtn = leftBtn?.findAllWithCriteria({ types: ['INSTANCE'] })[0];
if (iconInsideBtn) iconInsideBtn.swapComponent(chevronComp);

// Editar título
const titleText = tb.findAllWithCriteria({ types: ['TEXT'] }).find(t => t.characters === 'Title');
if (titleText) {
  await figma.loadFontAsync(titleText.fontName);
  titleText.characters = 'Mi Pantalla';
}
```

---

## Navegación

| Componente | Key | Variante |
|---|---|---|
| chevron-left (back) | `d2e8133159142cb934d56fc28be3ac0bc7eb07b4` | chevron-left |
| arrow-small-left | `724c4df8223320936be5babe9e6a0100060f7fa9` | arrow-small-left |
| arrow-small-right | `f93bfc28783d3b5c1e5878ab27a345103f3e0112` | arrow-small-right |
| chevron-right | `4184359b7b0eaaa6b60716dfd9cdfa607915dd7f` | chevron-right |
| x-02 (close) | `394236ef44423b37e253530cb18e16f89d79b67c` | x-02 |
| Tab Bar | `997b7411bd953204e7c41f498114f8e3d1cccd28` | Property 1=Default |

---

## Botones (Actions)

| Componente | Key | Variante |
|---|---|---|
| Button Giant Primary Default | `15be15cfa0d8c4667e4eb8f84bf80f9919e019c9` | Size=Giant, State=Default, Style=Primary, Content=Icons+Text |
| Button Giant Primary Disabled | `c31e596f9c633e08cd3e492699bfa9f3d594313c` | Size=Giant, State=Disabled, Style=Primary |
| Button Giant Tertiary Default | `907a75c075a2c569017d523f7657c0001906e2d6` | Size=Giant, State=Default, Style=Tertiary |
| Button Giant Clear Default | `c4757e2398d2f767b0b188296d6efe17d15e1b9c` | Size=Giant, State=Default, Style=Clear |
| Button Medium Clear Icons-only | `7515e90c855608f6eff63373412d91bbc3053c1b` | Size=Medium, State=Default, Content=Only Icons, Style=Clear |
| Button Medium Secondary Icons-only | `5afc824c7d5ebe393a2dc4a7da909535be54bd1d` | Size=Medium, State=Default, Content=Only Icons, Style=Secondary |
| Button Medium Tertiary Icons-only | `0156c8bc7a7739b996e98dc64e203a3ed65ecb06` | Size=Medium, State=Default, Content=Only Icons, Style=Tertiary |
| Button Small Secondary Outline | `374f68a8516d0d8f21ae880e54dd7b07db5eb69a` | Size=Small, State=Outline, Content=Icons+Text, Style=Secondary |

```javascript
// Uso: cambiar texto del botón
const btn = btnComp.createInstance();
parent.appendChild(btn);
btn.layoutSizingHorizontal = 'FILL';
btn.setProperties({ 'Icon Left#34:8': false, 'Icon Right#34:7': false, 'State': 'Default', 'Style': 'Primary' });
const label = btn.findAllWithCriteria({ types: ['TEXT'] })[0];
await figma.loadFontAsync(label.fontName);
label.characters = 'Tu texto';
```

---

## Inputs

| Componente | Key | Variante |
|---|---|---|
| Input Default Large Outline | `85a6f7f74d08b5dbc46d9593345f458eca417bff` | State=Inactive, Size=Large, Style=Outline |
| Input Disabled Large Outline | `631be5a59ee2aa5ed648147dce07876963b177f3` | State=Disabled, Size=Large, Style=Outline |
| Input Disabled Large Filled | `0908ecd4774705ee0d989aad3c1b3d62429957f1` | State=Disabled, Size=Large, Style=Filled |
| Input Filled Large Filled | `d10b55a68d4cd26e2b1784e91afc9af72c107a0f` | State=Filled, Size=Large, Style=Filled |
| Input Focus Large Filled | `ecf1c8f56f01b6134c08dc6c4321738f0d4ac28d` | State=Focus, Size=Large, Style=Filled |

```javascript
input.setProperties({ 'Label': 'Monto', 'Placeholder': '0.00', 'State': 'Inactive' });
```

---

## Avatar

| Componente | Key | Tamaño real |
|---|---|---|
| Avatar Initials 64 Circular | `806cf30500b782fe99e767c5148858538b0bdaa9` | 80×80px |
| Avatar Initials 40 Circular | `153a9c5ca737178605ec13664cde63246fff27d9` | 40×40px |
| Avatar Initials 32 Circular | `1cee6dd670d2f635844688762a888876295c9023` | 36×36px |
| Avatar Initials 24 Circular | `a9ce07b7e447dfcfa1d1fc6be3029dc3502b7db4` | 24×24px |
| Avatar Photo 64 Circular | `5e69eed0ad1885a9e232774007b086c5a7ce059b` | 80×80px |
| Avatar Photo 40 Circular | `1e31640c7d173bf06ce09f6735f9e77725b4e64c` | 40×40px |
| Avatar Photo F 18 Circular | `0434d4d33bb19439a0322e78b043fa7b7a063afc` | 24×24px |
| Avatar Icon 40 Circular | `fe7009e8eb7f0529071fa27d63617e1dbc631315` | 40×40px |

---

## Iconos sueltos (para swap en botones)

> Verificados en sesión 2026-04-15 (Home - Operaciones) y 2026-04-22 (Kit scan).

| Icono | Key |
|---|---|
| chevron-left | `d2e8133159142cb934d56fc28be3ac0bc7eb07b4` |
| chevron-right | `1ebc7ee92e7625b561b2088055ba5b9b9a0027ae` |
| bell-01 (notification) | `3e66cb4c8046c938510db6188948775011ea423e` |
| search-02 | `4cba2942d9b6cee6509337bfaacdde5ca33e7131` |
| home-06 | `ca66eb2dc3aa9d0432d190811255b2f87e3a5aa7` |
| chart-histogram | `021c4da4444117a369409292059e40052cdeacf8` |
| gift-01 | `2b709b21665b92ec9661a3fc388affdb3485277c` |
| plus-02 | `64e166223bc655049c17ea892cf6ebf23852e245` |
| x-02 | `394236ef44423b37e253530cb18e16f89d79b67c` |
| camera-plus | `d5842b94e9c31fd8ac8a4aca75b301731737d889` |
| stars-02 | `fba5c5daa36126f59d38538f06242d949804fad0` |
| check-verified-03 | `5945f8f11048eb1eced688c48258a9943661a781` |
| arrow-up-right | `c9a04dc754556eb7225ed0376a560f1588e2d52a` | — |
| arrow-down-left | `0c4191a65848882627f031e705fde68c827311b6` | — |
| alert-triangle | `c33ac6106130c1afeb6cf45b6c9af45a32a3fa05` | — |
| loading-03 | `abf969a328c28e47a06b5f726c39ff11d7b9b817` | — |
| refresh-04 | `d2e5a90953dcee70cb799b8356220a4a2a745b81` | — |
| dots-vertical | `83a637603d4b835e887b40fdb6169e6aaaac312d` | — |
| mail | `87390655013ec4c807ed9705c10f258e0ce723fd` | — |
| eye | `db49211094dc977c9f62c13816f5a5f0158e277a` | — |
| trash-01 | `34eb4189e9f09089fcbde0e892335d3a546f30db` | — |
| check-01 | `973da15ac07b4732f8e18920b16ff4437e52af5f` | — |
| check-verified-02 | `ab8119b0ddcb3222135484c2048950bc106101b5` | — |
| wallet-03 | `8092b10bbc99ae00427b9150089337a62dbf8345` | — |
| wallet-04 | `133234f01b1ab31455a04b3e69653e1fd61c898d` | — |
| bank | `893b8048ce22981feddff70cb2834a6a991dce2a` | — |

```javascript
// Swap icono dentro de un botón
const iconInst = btn.findAll(n => n.type === 'INSTANCE')[0];
const newComp = await figma.importComponentByKeyAsync('KEY_DEL_ICONO');
iconInst.swapComponent(newComp);
```

---

## Keyboard

| Componente | Key | Variante | Usar en |
|---|---|---|---|
| Keyboard numérico ✅ | `9c1814d08f64b86d94c0280b4bc16ae550d1e1a9` | Type=On | Montos, cantidades, precios — SIEMPRE |
| Keyboard alfanumérico | `a5fcc89522c698594fce3a50b87d7e43b1b37433` | Type=Off | Solo texto libre (nombres, notas) |

> ⚠️ **Regla**: Para cualquier pantalla de cantidad/monto usar SIEMPRE `Type=On` (numérico). Nunca el alfanumérico para inputs de dinero.

```javascript
// Teclado numérico — ABSOLUTE al fondo del screen
const kbComp = await figma.importComponentByKeyAsync('9c1814d08f64b86d94c0280b4bc16ae550d1e1a9');
const kb = kbComp.createInstance();
screen.appendChild(kb);
kb.layoutSizingHorizontal = 'FILL';
kb.layoutPositioning = 'ABSOLUTE';
kb.x = 0;
kb.y = screen.height - kb.height;
// Home indicator también ABSOLUTE al fondo
const hi = hiComp.createInstance();
screen.appendChild(hi);
hi.layoutSizingHorizontal = 'FILL';
hi.layoutPositioning = 'ABSOLUTE';
hi.x = 0;
hi.y = screen.height - hi.height;
```

---

## Divider

| Componente | Key | Variante |
|---|---|---|
| Divider horizontal | `3b8ea15e6f8e5410181509a43c329036681099c5` | Vertical=False, DashedStyle=False |

---

## Toasts

| Componente | Key | Variante |
|---|---|---|
| Toast Style=2 Success | `3b995323794665f93299e2e12473997472fc739e` | Style=2, State=Success |
| Toast Style=3 Default ✨ | — | (Kit — key pendiente de re-scan) |
| Toast Style=3 Error ✨ | — | (Kit — key pendiente de re-scan) |
| Toast Style=3 Info ✨ | — | (Kit — key pendiente de re-scan) |
| Toast Style=3 Success ✨ | — | (Kit — key pendiente de re-scan) |
| Toast Style=3 Warning ✨ | — | (Kit — key pendiente de re-scan) |

---

## Banner ✅ (verificado 2026-04-22)

| Variante | Key | Dim |
|---|---|---|
| Informative · Title+Desc | `4355e7c1f27ad61ed2d8a0f20b0c033ac22a79c0` | 320×138px |
| Informative · Title only | `de4d2b22bf8bbd2a9ab8e0daa070db9e408f4405` | 320×56px |
| Positive · Title+Desc | `578cdc2f47e7c0f42f817375a4f2058acfe86a40` | 320×138px |
| Positive · Title only | `1507bb6413dc55a88785c907cca1d12fd08fa869` | 320×56px |
| Warning · Title+Desc | `2bcf2d4b170ea2f1e957bd9cebe687b76676f6ef` | 320×138px |
| Warning · Title only | `689f5b604beefb4abcd689936bea94f22fd8d539` | 320×56px |
| Negative · Title+Desc | `08be556ff82684a4852752ff4a560e8eb6fc860d` | 320×138px |
| Negative · Title only | `aeffdc5f1dfe61a082a980600feab2ed7a36205e` | 320×56px |
| Secondary · Title+Desc | `686efecd85f139519203514d17ce4fc8de5c7869` | 320×138px |
| Secondary · Title only | `28ca13b399263797270f5a544408f494eff58675` | 320×56px |

---

## Alert ✅ (verificado 2026-04-22)

| Componente | Key | Dimensiones |
|---|---|---|
| Alert Horizontal | `533ab6647dacbf78529495fd93a15e3873de9ef0` | 420×153px |
| Alert Vertical · Default | `5c8e5dc44c0b37212eb2ae25381834d0da04ea3c` | 296×308px |

---

## Inline Loader ✅ (verificado 2026-04-22)

| Componente | Key | Dimensiones |
|---|---|---|
| Inline Loader · Short | `848720b009e4fbcfe3291844a25cfa17e6fb96bc` | 97×24px |
| Inline Loader · Long | `ec04148a70493ff2d034a78b86cba6b0b5c8c614` | 243×24px |

---

## Toggle Button ✅ (verificado 2026-04-22)

| Componente | Key | Dimensiones |
|---|---|---|
| Toggle Button · Selected=On | `df8f00c95ac8f9ae5ce33e6432088f56fe2e7159` | 335×56px |
| Toggle Button · Selected=Off | `6a191dbe99f244f1a16d2db7e4afab300348003c` | 335×56px |

---

## Ilustraciones (Ilustraciones 2)

| Nombre | Key |
|---|---|
| Wallet 01 (éxito) | `e4b09f3c3b1242ba4e786d74396977f94498e2de` |
| Wallet 02 | `c9a29cc971143518f852091ee93c6391b7c52891` |
| Wallet 03 | `fc260a0441f985f02ae6193e57576321541435cc` |
| Wallet 04 | `4dd91f2d7ba2790c18263b1b5af4371568e7800a` |
| Wallet 05 | `a0c5ed3f766dafcc880edf3254107f8144f6c983` |
| Social 02 | `d412c7148f3c01f72bc458630443c6fbbe321ad8` |
| Bell 2 | `ee50a41183330f0c2e1dcaf33aad24182599a5f9` |
| Not Found | `b2f3e10b80c3cbb1bfd1532a86e9869dcd1e154e` |
| Campana ✨ | — (key pendiente de re-scan) |
| Ilust21 ✨ | — (key pendiente de re-scan) |
| Ilust22 ✨ | — (key pendiente de re-scan) |

---

## uTransfer Logo

| Componente | Key |
|---|---|
| logo (completo) | `5afd7e72e26392ebcf75880339cd4da4bdaca491` |
| logo (solo ícono) ✨ | `2f1d1730bbfdc896c1fc876b0f3e2c6e0225c569` |

---

## Banderas (flags)

| País | Key |
|---|---|
| EC (Ecuador) | `2cc93bd54102afec92841ab9579704fff2e1921b` |
| ES (España) | `71279fdedb0ee3a7986337d18e0fc879afa4179a` |
| MX (México) | `8fcb4e7700ae608374c379c0cba6e6ec877377c3` |
| CO (Colombia) | `9a7b4545019a18795f50ff0848728a3053d78e87` |
| GT (Guatemala) | `9b4a3cf3898f160781f29b2d19f85a3df2e41937` |
| US (Estados Unidos) ✨ | `c4b7d429a5f5da3713725b2e858b3f0450337187` |

---

## Text Styles (importar con `figma.importStyleByKeyAsync`)

| Estilo | Key | Tamaño aprox |
|---|---|---|
| Headers/H3 | `41243533aec36fb477c160301ba9c854ebaf0c01` | 28px |
| Headers/H5 | `a761967b66cd94663df9cacbe06c32f68b48b7e7` | 20px |
| Subtitle/Subtitle M | `df46c8797813b902f6164fa2ea73a2e58e0b13df` | 16px |
| Caption/Caption 1 | `3c4a22b5a0d0e65480fea3cbc965b935ee9a610c` | 12px |
| Body/Body SM | `f62d08a99c5536e757c75e4620106c18c618a9d8` | 12px |

```javascript
// SIEMPRE usar setTextStyleIdAsync (async) — nunca textStyleId =
const style = await figma.importStyleByKeyAsync('41243533aec36fb477c160301ba9c854ebaf0c01');
await textNode.setTextStyleIdAsync(style.id);
```

---

## Notas de uso

- **Keyboard size**: El componente `Keyboard/Default` tiene dimensiones propias — usar `layoutSizingHorizontal = 'FILL'` después de `appendChild` para que se adapte al ancho del frame padre.
- **Keyboard + Home Indicator**: Cuando el teclado es `ABSOLUTE`, el Home Indicator también debe ser `ABSOLUTE` con `y = screen.height - hi.height`. Si no, el HI queda desplazado.
- **Toolbar Sheet**: Usar SIEMPRE el componente del DS en lugar de frames nav custom. Center = nav interna con back + título. Abajo = bottom sheet header.
- **Avatar sizes**: Los avatares "Initials" y "Photo" son los más usados. Size=64 rinde 80×80px en canvas.
- **Status bar**: Hay dos keys: una para dark mode y otra para light mode.
- **Button icon swap**: Importar el icono con `importComponentByKeyAsync`, luego `instance.swapComponent(comp)` en el sub-instance de icono dentro del botón.
- **Keys ✨**: Los componentes marcados con ✨ fueron identificados en el Kit scan 2026-04-22 pero sus keys individuales no se guardaron en esa sesión. Re-escanear el Kit con `/tmp/scan_kit_all.js` para obtenerlas.

---

## Cómo obtener keys faltantes (re-scan del Kit)

```javascript
// Guardar en /tmp/scan_kit_icons.js y correr:
// node src/index.js run /tmp/scan_kit_icons.js
(async () => {
  const page = figma.root.children.find(p => p.name.includes('Borrrador'));
  await page.loadAsync();
  const kit = page.children.find(n => n.name === '🧰 Kit');
  const target = 'NombreInstancia'; // ej: 'arrow-up-right'
  for (const node of kit.children) {
    if (node.name !== target || node.type !== 'INSTANCE') continue;
    const mc = await node.getMainComponentAsync();
    if (mc) return { key: mc.key, name: mc.name };
  }
  return null;
})()
```
