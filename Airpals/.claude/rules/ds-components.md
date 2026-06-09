# Airpals DS — Catálogo de componentes

> Cargar cuando: creas un componente nuevo, buscas uno existente, o defines props de un componente.
> Actualizar este archivo cada vez que se crea un componente nuevo en Figma.
> Stack: Next.js + Tailwind v3. Desktop-first. B2B dashboard.

---

## Cómo usar este catálogo

Antes de crear cualquier UI en Figma:
1. Revisar este catálogo — ¿ya existe el componente?
2. Si existe → instanciar desde librería. Nunca recrear.
3. Si no existe → crear, documentar aquí, y agregar su Figma key.

---

## Reglas de componentes Airpals

1. **Tokens siempre** — fills, colores de texto y bordes con tokens de `Semantics`. Nunca hex fijo.
2. **Tailwind-first** — componentes pensados para `rounded-*`, `text-*`, `bg-*` de Tailwind.
3. **Desktop-first** — tamaños base para 1280px+. Mobile como adaptación.
4. **Density-friendly** — tablas y listas son ciudadanos de primera clase. Padding compacto pero legible.
5. **Estados obligatorios** — cada componente interactivo necesita: default, hover, focus, disabled, active/selected.
6. **Dark mode** — diseñar para Light mode principal. Dark mode como segunda pasada con los tokens correctos.

---

## Botones

**Component Set key:** `1976dd5fb0525a76fb43bf3785fa678114f2c72c`

Props: `Type` + `State`
- **Type:** Ghost · Ghost Icon · Ghost Negative · Ghost Icon+Neg · Negative Button · Icon+Negative · Primary · Icon+Primary · Secondary · Icon+Secondary · Ghost II · Ghost II Icon · Accent · Icon+Accent
- **State:** Default · Hover · Pressed · Disabled
- **Total variantes:** 56

### Keys de variantes más usadas

| Variante | Key |
|----------|-----|
| Primary · Default | `8e685884270ba324a8974d7ad44c4cbce1b2e957` |
| Primary · Hover | `a97a0bf00cca88b598da6aef358bbf5b6b0e3f11` |
| Primary · Pressed | `23b18a8708346f278a4b66a6e6e75ee8eb8267c7` |
| Primary · Disabled | `b40e3899b6d825e6c152153341005934d5d18a9a` |
| Icon+Primary · Default | `5f4203b5db52fa29009247fa4f226c9818db5eca` |
| Secondary · Default | `c1f0d20c8ae35e6f0cbb27ccc09281dbcf42c00b` |
| Secondary · Hover | `16a60c1b3d2a61626c9fd68314b02e74e6a91e19` |
| Icon+Secondary · Default | `936c778ce47e285865df6dc3664b4b6f3b43a96f` |
| Ghost · Default | `ca31257106e800cd8faeb2baad4149e3b8d15d58` |
| Ghost · Hover | `dca8ef96be3b966185ca1186fcccf817d1613da0` |
| Ghost II · Default | `38eca2c379f7b1f7d6ab900993ecf6db877e54dc` |
| Ghost Icon · Default | `74c444491e45ce7a87f9103d7d4f8b08f2807bfb` |
| Negative Button · Default | `64e35eab5e26205d5a3ca513354bdcebe38bbfb1` |
| Negative Button · Disabled | `e4af86a8b0c77bd87df2984b5f0d220653851dc9` |
| Accent · Default | `f2cec2c457485e4079eb909f9a5bc1a4b7614e15` |
| Icon+Accent · Default | `3941212c90fe5d41231d04c22133d6c075d06b87` |

**Componentes adicionales en la misma página:**

| Componente | Key | Notas |
|------------|-----|-------|
| Split Button | `ccd1ef4b71562bc9f214b6bbe7c75f0d5fff4be2` | — |
| Clickable Link | `4e5c28ed2e0dfb47fc837943f3fa38f896fd51db` | — |
| Radio Button | `a65c3087afa61e7fdd518f16012fb0875c0aaca8` | — |
| Radio Indicator | `d967353a02f6ae554f3461f1ea64cd245fa60c89` | — |

---

## Inputs y formularios

| Componente | Variantes | Key | Notas |
|------------|-----------|-----|-------|
| **Input** | 96 (State × Status × RightIcon × HelperText × Label) | `d8b9c1ffd324575a54c030c43023a3b4360bdcfd` | State: Default/Hover/Focused/Disabled · Status: Default/Error/Success |
| **Dropdown** | 14 (State × Expanded × Label) | `ab6bdf420ef071648dce629158fdf9f013d2a10b` | State: Default/Hover/Focused/Disabled |
| **Textarea** | — | `1ca65d3a68be64f22808a675989481ee9154a726` | — |
| **Checkbox** | 32 (State × Active × Indeterminate × Size) | `bc11ab166204aa70d32348853ff1f4e09c4c699a` | Size: Medium/Small |
| **Radio Button** | — | `a65c3087afa61e7fdd518f16012fb0875c0aaca8` | — |
| **Toggle** | — | `4188d5d41c0cf2e87430bf735c7b2066a50b25fb` | — |
| **Toggle With Text** | — | `d4f1d3132c9e1ae9ed1d26b8e6156be9241385b7` | — |

---

## Navegación

| Componente | Variantes | Key | Notas |
|------------|-----------|-----|-------|
| **Breadcrumbs** | — | `1d0edc6fa49b9640eaf8b2b8661b22af676267d9` | — |
| **Pagination** | — | `4446b332c09cbed4a66d914148a05862a3f25851` | — |
| **Navbar** (website) | — | `3a3f1b66137b2a2319c8482b6c2f6e4f19f0f403` | Web marketing |
| **Navbar Dropdown List** | — | `f0e09ea03beb79e47a755167b81c46f8c1ac68d8` | Web marketing |
| Sidebar | — | — | *(pendiente)* |
| Tabs | — | — | *(pendiente)* |

---

## Datos y tablas

> *(Pendiente — agregar cuando se creen en Figma)*

| Componente | Variantes | Figma Key | Notas |
|------------|-----------|-----------|-------|
| Table | — | — | Con header, rows, sorting |
| Table Row | Default · Hover · Selected | — | — |
| Table Header Cell | Default · Sorted ASC · Sorted DESC | — | — |
| Empty State Table | — | — | Ilustración + CTA |

---

## Cards y contenedores

> *(Pendiente — agregar cuando se creen en Figma)*

| Componente | Variantes | Figma Key | Notas |
|------------|-----------|-----------|-------|
| Card | Default · Hover | — | `border rounded-xl p-4` |
| Stats Card | — | — | KPI con número grande + label |
| Shipment Card | Active · Completed · Failed | — | Card de envío con status |

---

## Badges y status

| Componente | Variantes | Key | Notas |
|------------|-----------|-----|-------|
| **Badges** | 54 (9 colores × 3 estados × 2 shapes) | `9469c69590accb9b16f66d63f681e74646d930d5` | Color: Primary/Secondary/Dark/Gray/Light/Warning/Danger/Success/Info · State: Fill/Outline/Duo Tone · Round: Semi/Full | Ver tabla completa en `ds-credo.md` → Badges. **Patrón estándar:** Duo Tone · Full Round |
| **Tag** | State | `4d4781ffd56138317c8ea0b29e5f0258143dcab7` | — |

---

## Feedback y notificaciones

| Componente | Variantes | Key | Notas |
|------------|-----------|-----|-------|
| **Alerts** | Warning + Error (Device: Desktop/Mobile · List: True/False) | `7ab16d43d264598355e8b9404cb71fa295cfbd3e` | ⚠️ Faltan Success e Info |
| Toast | — | — | *(pendiente)* |
| Modal | — | — | *(pendiente)* |
| Tooltip | — | — | *(pendiente)* |

---

## Shipment-specific

> Componentes únicos del producto Airpals

| Componente | Variantes | Figma Key | Notas |
|------------|-----------|-----------|-------|
| Shipment Timeline | — | — | Estados del paquete vertical |
| Carrier Rate Card | Best Value · Fastest · Most Reliable | — | Para comparar carriers |
| Tracking Number | — | — | Con copy button |
| Address Block | Origin · Destination | — | Dirección formateada |
| Cost Center Tag | — | — | Departamento/cost center |

---

## Sistema / UI

| Componente | Variantes | Key | Notas |
|------------|-----------|-----|-------|
| **Avatar** | 80+ variantes | `70ec4ea20c9aeec1abd83e30ef58feac189dab3e` | Size: xs/sm/md/lg/xl · Corner: Square/Semi Radius/Radius/Full Radius · Badge: ON/OFF · Variant: Image/Initials |
| **Avatar With Multiple Images** | — | `404b87feec64c2632d40124c07b4fd35117dbdcb` | — |

#### Avatar — Keys más usadas

| Variante | Key |
|---------|-----|
| md · Full Radius · Badge OFF · Image | `07ab25d4bc065d89ecae95fff725893dd37ce57a` |
| md · Full Radius · Badge OFF · Initials | `8001e64cb31aecc3e46159120daed305632aaea9` |
| md · Full Radius · Badge ON · Image | `1679be4b5a0e3b74144fcf3bb5ad0bf34ce25b57` |
| sm · Full Radius · Badge OFF · Image | `7b2adc9e2e0453edb8a9cd7635fb943bfd44e22d` |
| sm · Full Radius · Badge OFF · Initials | `8e671b7d391a1dc9fc60e66a080b21a493b5abe5` |
| lg · Full Radius · Badge OFF · Image | `23aa78fa04106eef4e244a966d4d7b69c30d81f9` |
| lg · Full Radius · Badge OFF · Initials | `fb49b6904ce3b00a98cda8e91279d39f6aeb9f6f` |
| xl · Full Radius · Badge OFF · Image | `d14d63318792441a40bc7c9c1bee5084dcac1daf` |
| xl · Full Radius · Badge OFF · Initials | `a6cb2538c124caaf472c45afe7c6a3b8c2aae4bf` |
| **Footer** (website) | — | `ddf4c0906a29a7d9dd5ac6cffba9a6fb0aa25bf1` | Web marketing |
| Command Palette | — | — | *(pendiente)* |
| Date Picker | — | — | *(pendiente)* |
| Skeleton Loader | — | — | *(pendiente)* |
| Spinner | — | — | *(pendiente)* |

---

## Notas de estado

- **—** = Key de Figma pendiente (componente no creado aún)
- ✅ = Componente creado y documentado con key
- ⚠️ = Componente existe pero necesita revisión
- 🚫 = Componente deprecated

---

## Cómo agregar un componente nuevo

Cuando Mau crea un componente en Figma, documentarlo así:

```
| [Nombre] | [Variantes separadas con ·] | [key de Figma] | [Nota de uso] |
```

Para obtener la key en Figma:
- Click derecho en el component set → "Copy link"
- O desde Figma CLI: `node src/index.js eval "figma.currentPage.selection[0].key"`
