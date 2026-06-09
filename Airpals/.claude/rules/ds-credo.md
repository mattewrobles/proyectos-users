# Airpals DS — Credo (Cleo's Operating Manual)

> Este archivo es el credo de trabajo. Antes de crear cualquier elemento en Figma para Airpals, leer esto.
> Datos extraídos directamente del archivo `Airpals-Design system` vía figma-ds-cli (2026-05-15).

---

## 0. Jerarquía del sistema

```
TailwindCSS (379 vars)
  └─ Escala base: spacing, radius, font size/weight/family, line-height,
     opacity, blur, max-width, border-width, screen breakpoints, TODOS los colores Tailwind
  └─ NUNCA usar directamente en fills de componentes

Primitives (6 vars) — brand colors
  ├─ brand/blue     #0043ff   → CTAs, botones primarios, links
  ├─ brand/navy     #1b306c   → texto primario, headings, iconos
  ├─ brand/blue-light #e6f1fd → fondos secundarios, hover states
  ├─ brand/blue-sky  #b4d5ff  → fondos terciarios (actualmente huérfano en Semantics)
  ├─ brand/electric-blue #00a0ff → ilustraciones (actualmente huérfano)
  └─ brand/pink     #fc4575   → ⚠️ DEPRECATED — no usar en nuevos diseños

Semantics (29 vars) — 2 modos: Light / Dark
  └─ SIEMPRE usar estos en nuevos componentes cuando existan
```

---

## 1. Token Map — Semánticos

### Background
| Token | Light | Dark | Usar en |
|-------|-------|------|---------|
| `background/primary` | white `#ffffff` | slate/900 | Base page, cards |
| `background/secondary` | `#e6f1fd` (blue-light) | slate/800 | Sidebar, panel secundario |
| `background/tertiary` | `#b4d5ff` (blue-sky) | slate/700 | Hover rows, tertiary panels |
| `background/accent` | `#0043ff` (brand/blue) | `#0043ff` | Botones primarios, pills activos |
| `background/accent-subtle` | indigo/100 | indigo/950 | Chips, tags sutiles |
| `background/accent-contrast` | `#1b306c` (navy) | `#1b306c` | Dark headers, dark CTAs |
| `background/disable` | slate/200 | slate/500 | Elementos deshabilitados |
| `background/primary-transparent` | transparent (`#ffffff` ⚠️ bug) | transparent | Overlays |

### Text
| Token | Light | Dark | Usar en |
|-------|-------|------|---------|
| `text/primary` | `#1b306c` (navy) | slate/50 | Headings, labels principales |
| `text/secondary` | slate/600 | slate/400 | Subtítulos, texto de apoyo |
| `text/tertiary` | slate/500 | slate/400 | Metadata, hints, placeholders (suave) |
| `text/disable` | slate/300 | slate/600 | Texto disabled |
| `text/accent` | `#0043ff` | `#e6f1fd` | Links, acciones |
| `text/on-accent` | white | white | Texto sobre fondo azul |
| `text/invert` | white | slate/900 | Texto sobre navy/dark |

### Border
| Token | Light | Dark | Usar en |
|-------|-------|------|---------|
| `border/primary` | slate/200 | slate/700 | Borders de cards, tablas, separadores |
| `border/secondary` | slate/300 | slate/800 | Borders en hover, inputs activos |
| `border/accent` | `#0043ff` | `#0043ff` | Focus rings, elementos seleccionados |

### Icon
| Token | Light | Dark | Usar en |
|-------|-------|------|---------|
| `icon/primary` | `#1b306c` | slate/200 | Iconos principales |
| `icon/secondary` | slate/500 | slate/500 | Iconos de apoyo |
| `icon/tertiary` | slate/300 | slate/400 | Iconos decorativos |
| `icon/accent` | `#0043ff` | `#0043ff` | Iconos de acción |
| `icon/on-accent` | white | white | Iconos sobre fondo azul |
| `icon/disable` | slate/300 | slate/600 | Iconos disabled |

### Ilustraciones (no adaptan dark mode — mismo valor)
| Token | Valor | Usar en |
|-------|-------|---------|
| `ilustraciones/background` | `#e6f1fd` | Fondo de ilustración |
| `ilustraciones/details` | `#00a0ff` | Highlights de ilustración |
| `ilustraciones/contorn` | `#1b306c` | Contornos |
| `ilustraciones/clothes` | `#b4d5ff` | Elementos secundarios |

---

## 2. Color Hex → Token Mapping (lookup rápido)

| Hex | Token o fuente | Contexto |
|-----|----------------|---------|
| `#0043ff` | `brand/blue` / `background/accent` / `border/accent` | Primary CTA, focus |
| `#1b306c` | `brand/navy` / `text/primary` / `icon/primary` | Texto principal |
| `#e6f1fd` | `brand/blue-light` / `background/secondary` | Fondos secundarios |
| `#b4d5ff` | `brand/blue-sky` | Fondos terciarios |
| `#00a0ff` | `brand/electric-blue` | Ilustraciones |
| `#ffffff` | `colors/base/white` / `text/on-accent` | Blanco base |
| `#111928` | gray-900 (TailwindCSS) | Label text en inputs (hardcoded en DS actual) |
| `#4b5563` | gray-600 | Helper text en inputs |
| `#9ca3af` | gray-400 | Placeholder text |
| `#dfe4ea` | — (no token aún) | Input border default |
| `#f3f4f6` | gray-100 | Input bg disabled |
| `#f23030` | — | Input error border |
| `#22ad5c` | — | Input/checkbox success |
| `#637381` | — | Legacy gray (custom, no usar) |
| `#fc4575` | `brand/pink` ⚠️ DEPRECATED | No usar en nuevos diseños |

---

## 3. Spacing — Escala operativa

Usar variables de `TailwindCSS/spacing/*`. La nomenclatura ES la clase Tailwind.

| Var Figma | px | Uso frecuente |
|-----------|-----|---------------|
| `spacing/1` | 4px | Micro gaps, icon padding |
| `spacing/2` | 8px | Gap entre icon y label |
| `spacing/3` | 12px | Padding botones small, gap en listas |
| `spacing/4` | 16px | Padding base (cards, inputs, sidebar items) |
| `spacing/5` | 20px | Padding medio (textarea, secciones) |
| `spacing/6` | 24px | Padding generoso, gap entre secciones |
| `spacing/8` | 32px | Separación entre bloques |
| `spacing/10` | 40px | Espaciado de página, hero sections |
| `spacing/12` | 48px | Header height, hero padding |
| `spacing/16` | 64px | Espaciado extra-grande |

---

## 4. Border Radius — Escala operativa

Usar variables de `TailwindCSS/border-radius/*`.

| Var Figma | px | Usar en |
|-----------|-----|---------|
| `border-radius/none` | 0 | Separadores, tablas sin radius |
| `border-radius/sm` | 2px | Tooltips pequeños |
| `border-radius/DEFAULT` | 4px | Elementos inline pequeños |
| `border-radius/md` | 6px | **Botones**, badges, chips, tags |
| `border-radius/lg` | 8px | **Inputs**, dropdowns |
| `border-radius/xl` | 12px | **Cards**, popovers |
| `border-radius/2xl` | 16px | **Modales**, panels grandes |
| `border-radius/3xl` | 24px | Hero elements |
| `border-radius/full` | 9999px | **Avatares**, pills de status, FAB |

---

## 5. Tipografía — Text Styles

**Lexend** (headings) · **Inter** (body/UI)

> ⚠️ **Inter style names en Figma API:** usar `"Semi Bold"` (con espacio), NO `"SemiBold"`. Error: `"Inter SemiBold" could not be loaded`.
> ```javascript
> figma.loadFontAsync({ family:'Inter', style:'Semi Bold' })  // ← correcto
> ```

| Style Name | Key | Font | Weight | Size/LH | Tailwind | Usar en |
|-----------|-----|------|--------|---------|----------|---------|
| `Heading 1` | `af569f2dcf834882a8ceb7cd76c81fa8a28d86f3` | Lexend | SemiBold | 36/40 | `text-4xl font-semibold` | Títulos de página |
| `Heading 2` | `ee888841d77eab239b07d54f5b4507c20b05d102` | Lexend | SemiBold | 30/36 | `text-3xl font-semibold` | Secciones principales |
| `Heading 3` | `ffebb05a861b5fb3b66f8b16bbfbccd52b657423` | Lexend | SemiBold | 24/28 | `text-2xl font-semibold` | Subsecciones |
| `Subheading/Regular` | `3f93f5621bf6aafe50dc56e495524c4ddb4a73a0` | Inter | Regular | 20/28 | `text-xl font-normal` | Labels grandes |
| `Subheading/Semibold` | `e7bd5e970c0866626babcb2435055e841994d153` | Inter | Semi Bold | 20/28 | `text-xl font-semibold` | Labels destacados |
| `Body Large/Regular` | `f9b834c30a1caad51007df19fab23fd6dc599a6a` | Inter | Regular | 18/24 | `text-lg font-normal` | Texto corrido largo |
| `Body Large/Medium` | `df2aa3af1fa5384686e5cb55cc71997bdbac8e45` | Inter | Medium | 18/24 | `text-lg font-medium` | Labels importantes |
| `Body Large/SemiBold` | `88811d42d0c935a22430ed7f33eba5a2f12b3f20` | Inter | Semi Bold | 18/24 | `text-lg font-semibold` | Énfasis body large |
| `Body Medium/Regular` | `2a4d5c3a9a2b1671e19bcf1b9346a8bdd18c2331` | Inter | Regular | 16/24 | `text-base font-normal` | Texto principal de UI |
| `Body Medium/Medium` | `73cea9d2fa1f938fc07dc4428381731c1ad72348` | Inter | Medium | 16/24 | `text-base font-medium` | Labels, valores |
| `Body Medium/SemiBold` | `6050d635d183ed2475f6ba97428d04c135684a76` | Inter | Semi Bold | 16/24 | `text-base font-semibold` | Headers tabla, datos |
| `Body Small/Regular` | `083e8c5332c20e80dc0e677559e27029b07aada3` | Inter | Regular | 14/20 | `text-sm font-normal` | Texto secundario |
| `Body Small/Medium` | `ecd889963180daddd923230bb2ae2cd2ab10518c` | Inter | Medium | 14/20 | `text-sm font-medium` | Labels pequeños |
| `Body Small/Semibold` | `18e5221fdc1b084d9adbb89a9f94ad90b39af6d9` | Inter | Semi Bold | 14/20 | `text-sm font-semibold` | Tags, acciones pequeñas |
| `Caption/Regular` | `1ef99e5d5c08fa41146dd3dd31e6c86ec2234367` | Inter | Regular | 12/20 | `text-xs font-normal` | Timestamps, metadata |
| `Caption/Medium` | `a6fb1f8a176bbd6987b4d43595a4fc6bd2b5b8f9` | Inter | Medium | 12/20 | `text-xs font-medium` | Badges, status chips |
| `Dashboard Title` ⚠️ | `5dd07e46feaefda07fae5f77c60f6b3abc02b916` | Lexend | SemiBold | 18/AUTO | — | *(typo + AUTO lh — evitar)* |

---

## 6. Efectos / Sombras

Usar effect styles `shadow-xs` → `shadow-2xl`. Solo DROP_SHADOW, color `#000`.

| Style | Y / Blur | Usar en |
|-------|----------|---------|
| `shadow-xs` | y:1 / r:2 | Hover suave en cards |
| `shadow-sm` | y:1+1 / r:2+3 | Cards default |
| `shadow-md` | y:2+4 / r:4+6 | Dropdowns, popovers |
| `shadow-lg` | y:4+10 / r:6+15 | Modales |
| `shadow-xl` | y:8+20 / r:10+25 | Sidesheets, paneles |
| `shadow-2xl` | y:25 / r:50 | Raramente — énfasis máximo |

---

## 7. Grids

| Style | Breakpoint | Uso |
|-------|-----------|-----|
| `Desktop big` | 1280px+ | Dashboard full-width |
| `Desktop Normal` | ~1024px | Dashboard estándar |
| `Mobile` | 375px | Mobile views |

---

## 8. Componentes — Catálogo completo con keys

### Formularios e Inputs

| Componente | Key | Variants | Props clave | Uso en Airpals |
|-----------|-----|----------|-------------|----------------|
| **Button** | `1976dd5fb0525a76fb43bf3785fa678114f2c72c` | 56 | Type: Primary/Secondary/Ghost/Ghost II/Accent/Negative/Ghost Negative · State: Default/Hover/Pressed/Disabled | CTAs, acciones |
| **Split Button** | `ccd1ef4b71562bc9f214b6bbe7c75f0d5fff4be2` | 24 | Size: XS/S/M/L · Type: Primary/Secondary/Info/Success/Warning/Danger | Acciones con dropdown |
| **Input** | `d8b9c1ffd324575a54c030c43023a3b4360bdcfd` | 96 | State: Default/Hover/Focused/Disabled · Status: Default/Error/Success · Right Icon: On/Off · Helper Text: On/Off · Label: On/Off | Todos los campos de texto |
| **Textarea** | `1ca65d3a68be64f22808a675989481ee9154a726` | 28 | State: Default/Hover/Focused/Disabled · Helper Text: On/Off · Label: On/Off · Second Label: On/Off | Notas, instrucciones |
| **Dropdown** | `ab6bdf420ef071648dce629158fdf9f013d2a10b` | 14 | State: Default/Hover/Focused/Disabled · Expended: Off/On · Label: On/Off | Selects, filtros |
| **Checkbox** | `bc11ab166204aa70d32348853ff1f4e09c4c699a` | 32 | State: Default/Hover/Focused/Disabled · Active: On/Off · Indeterminate: On/Off · Size: Medium/Small | Selección múltiple |
| **Radio Button** | `a65c3087afa61e7fdd518f16012fb0875c0aaca8` | 2 | Size: 16px/14px | Selección única |
| **Radio Indicator** | `d967353a02f6ae554f3461f1ea64cd245fa60c89` | 8 | State: Default/Hover/Disabled/Selected · Size: 16px/14px | Subcomponente de Radio |
| **Toggle** | `4188d5d41c0cf2e87430bf735c7b2066a50b25fb` | 18 | Active: ON/OFF · Style: 1-9 | Preferencias, settings |
| **Toggle With Text** | `d4f1d3132c9e1ae9ed1d26b8e6156be9241385b7` | 8 | Active: ON/OFF · Style: 1-4 | Settings con label inline |

### Navegación

| Componente | Key | Variants | Props clave | Uso en Airpals |
|-----------|-----|----------|-------------|----------------|
| **Breadcrumbs** | `1d0edc6fa49b9640eaf8b2b8661b22af676267d9` | 12 | Style: 1-12 | Navegación jerárquica |
| **Pagination** | `4446b332c09cbed4a66d914148a05862a3f25851` | 5 | Style: 1-5 | Tablas, listas paginadas |
| **Navbar** (web) | `3a3f1b66137b2a2319c8482b6c2f6e4f19f0f403` | 3 | Mobile: True/False · Collapsed: True/False | Marketing site |
| **Navbar Dropdown List** | `f0e09ea03beb79e47a755167b81c46f8c1ac68d8` | 1 | — | Marketing site nav dropdown |
| **Footer** (web) | `ddf4c0906a29a7d9dd5ac6cffba9a6fb0aa25bf1` | 2 | Mobile: True/False | Marketing site |

### Feedback y Display

| Componente | Key | Variants | Props clave | Uso en Airpals |
|-----------|-----|----------|-------------|----------------|
| **Badges** | `9469c69590accb9b16f66d63f681e74646d930d5` | 54 | Color: Primary/Secondary/Dark/Gray/Light/Warning/Danger/Success/Info · State: Fill/Outline/Duo Tone · Round: Semi/Full | Status de shipment, labels |

#### Badge — Keys completas (todas las variantes)

> Pattern: `importComponentByKeyAsync('KEY')` — usar el key exacto de la variante que necesitas.
> **Para shipment status** → State=Duo Tone · Round=Full Round es el patrón estándar.

| Color | State | Round | Key |
|-------|-------|-------|-----|
| Success | Duo Tone | Full Round | `4762754f4c5239c91c5fb1c8d4720983e7d1673e` |
| Success | Fill | Full Round | `b8162eb179e6260543e6f30f991f4992b67476e6` |
| Success | Outline | Full Round | `fadce81240c04aae6a6f81b39988e550ab67d814` |
| Warning | Duo Tone | Full Round | `05e61e122c969b65d8315a7ac854880051ae2d92` |
| Warning | Fill | Full Round | `73d88dbba278f87a2bef16c85ee4cf64a37ae83e` |
| Warning | Outline | Full Round | `1bcb4b728fb52a1c015c63625cd807c84271aa16` |
| Danger | Duo Tone | Full Round | `419efc8bc52efb94bc0a3699a2137516ebc7064c` |
| Danger | Fill | Full Round | `64ebf75fcb6d3101f2519fd39ca71b35cce54dc9` |
| Danger | Outline | Full Round | `ad4c709b0b359a8b848593531a2043142054b79c` |
| Info | Duo Tone | Full Round | `cac2b5b5bbf2e2c591de9cd44d891a25fe4bb26e` ✅ |
| Info | Fill | Full Round | `a992e6f46b2039157fc7c5abb00799cfd7917ad6` |
| Info | Outline | Full Round | `2ac1e8de4de10ed7c56734d206ff897c6d3de38e` |
| Gray | Duo Tone | Full Round | `af2369801d50107562604a5ec0895dce59c75f33` |
| Gray | Fill | Full Round | `cf490f09541ff3b602056aab488551dcc9c8dff2` |
| Gray | Outline | Full Round | `610a453c6fbe7aa758736e8ec99726e4cbae2611` |
| Primary | Duo Tone | Full Round | `e8d6e74677a09bc8088e826f6ae21fb6d9061462` |
| Primary | Fill | Full Round | `c04d8434514c03656b282ddb53d3ea44d948d6e6` |
| Primary | Outline | Full Round | `894ae6859f35347586d06071ea5739d9e8f991f0` |
| Secondary | Duo Tone | Full Round | `c4b0f5ac0ec157fe901e6116b407d094cb692979` |
| Secondary | Fill | Full Round | `c476429bcc8892e1f4ea365523eb8e027de896e2` |
| Secondary | Outline | Full Round | `fe9313897b3869f82a7aa427137fcf0c98960ad4` |
| Dark | Duo Tone | Full Round | `5501a172e464f2776f34a481caacfb703f0f0c02` |
| Dark | Fill | Full Round | `f312e8224bd8a81edb00a4db9358843e3f7e90ab` |
| Dark | Outline | Full Round | `d936a890ef27b88d2efa0f4886cbad507b25b455` |
| Light | Duo Tone | Full Round | `f5ed9ccbcb7acbc00ead80a20aa16476c7b3be62` |
| Light | Fill | Full Round | `545eac4631ba8dd16f8da9d9a67e52f36d0ccddb` |
| Light | Outline | Full Round | `157ba1f6d772e284e6f45a3a7bf17fb503b7c90d` |
| Success | Duo Tone | Semi Round | `dc93364fa287483e317b2c06c1a2bc64f80a4c55` |
| Success | Fill | Semi Round | `ed4a68dd297f2b90aea4aba03aeb1726d6bf4279` |
| Warning | Duo Tone | Semi Round | `ceba2b182243f3e8a4f0ed07427df274abfd07d5` |
| Warning | Fill | Semi Round | `de1078d383a76081d5c3d6531a03afddeac63054` |
| Danger | Duo Tone | Semi Round | `d4eddd974447edb8364dea729e70ec94e14151b7` |
| Danger | Fill | Semi Round | `6905d263f40a9672aeae886ed59ee5218f9e04d2` |
| Info | Duo Tone | Semi Round | `167c77db1d4da89ef2514142c5a4ce3ccfa7667f` |
| Info | Fill | Semi Round | `0b7465dc17d417a0ccd01028e457a67237e37bad` |
| Gray | Duo Tone | Semi Round | `926540c6620062b05a41a02c4dd3a150e6fa23e3` |
| Gray | Fill | Semi Round | `9a8b255a6df023794060ecbc46f4b1f19bff6b4f` |
| Primary | Duo Tone | Semi Round | `da72dafd0b0e21f434febfa1d4ab34419f862fe3` |
| Primary | Fill | Semi Round | `3c72114f2da3286deb0500488ac1c9471ec08977` |
| Secondary | Duo Tone | Semi Round | `db6a8fdbd904223d1cb69b4330e1a30e3d6b5114` |
| Secondary | Fill | Semi Round | `3782478143db374d2bbc797fc42aa6f46935fb9c` |
| Dark | Duo Tone | Semi Round | `c2cec57733593262adbcbd3be015751dea8c78c0` |
| Dark | Fill | Semi Round | `54e2c8eabcdf07940dc53157acb61b15853becc5` |
| Light | Duo Tone | Semi Round | `b592a3ca73cdcbd4dd3ef59905b9939d22c3b3b2` |
| Light | Fill | Semi Round | `b289ae3b1471f154b2489553d7057902337e96b0` |
| Success | Outline | Semi Round | `0ee7d134e4eca9eb22002421d13d523340c9ebcd` |
| Warning | Outline | Semi Round | `b923741930df52f3909216cd565cf9949efe837d` |
| Danger | Outline | Semi Round | `24389daf8ef291ae51d52cad8e17cbcc4f01aa0d` |
| Info | Outline | Semi Round | `4ad397a6059cd2ed8655a452df9b871775862758` |
| Gray | Outline | Semi Round | `f95505f5cd103f18e4393945a551078fe51f642e` |
| Primary | Outline | Semi Round | `63b2e368c4a16a4e3df05c1f6c6e85a7f54e1ea1` |
| Secondary | Outline | Semi Round | `8e33561d3be99ccfe71e062059c2a2e63e2056cf` |
| Dark | Outline | Semi Round | `5ddffb7c82a29bba11deca437a733ad7268220e0` |
| Light | Outline | Semi Round | `689fd93ec7168165abc2e7e0d6eca772166edc16` |

#### Shipment status → Badge mapping
| Estado | Color | State | Round |
|--------|-------|-------|-------|
| Delivered | Success | Duo Tone | Full Round |
| In Transit | Warning | Duo Tone | Full Round |
| Processing | Info | Duo Tone | Full Round |
| Failed / Cancelled | Danger | Duo Tone | Full Round |
| Draft / Pending | Gray | Duo Tone | Full Round |
| Label Created | Primary | Duo Tone | Full Round |
| **Tag** | `4d4781ffd56138317c8ea0b29e5f0258143dcab7` | 4 | State: Default/Hover/Focus/Disable | Filtros seleccionables |
| **Alerts** | `7ab16d43d264598355e8b9404cb71fa295cfbd3e` | 8 | Type: Warning/Error · Device: Desktop/Mobile · List: True/False | Mensajes de error/aviso |
| **Clickable Link** | `4e5c28ed2e0dfb47fc837943f3fa38f896fd51db` | 4 | State: Default/Hover · Color: Blue/Dark Blue | Links en texto |

### Usuarios y Media

| Componente | Key | Variants | Props clave | Uso en Airpals |
|-----------|-----|----------|-------------|----------------|
| **Avatar** | `70ec4ea20c9aeec1abd83e30ef58feac189dab3e` | — | — | Usuarios, perfiles |
| **Avatar With Multiple Images** | `404b87feec64c2632d40124c07b4fd35117dbdcb` | — | — | Grupos de usuarios |

### Marca

| Componente | Key | Variants | Props clave |
|-----------|-----|----------|-------------|
| **Airpals Logo** | *(en 📚 Primitives page)* | 9 | Orientation: · Color: |

---

## 9. Estado actual de variable bindings en componentes

**Resultado del scan real (2026-05-15):**

| Componente | Spacing/Radius | Fills | Texto |
|-----------|---------------|-------|-------|
| Button Primary | ✅ variables | ✅ `brand/blue` | ❌ hardcoded `#ffffff` |
| Button Secondary | ✅ variables | ❌ hardcoded `#e6f1fd` | ❌ hardcoded `#1b306c` |
| Button Ghost | ✅ variables | no fill | ❌ hardcoded `#1b306c` |
| Button Accent | ✅ variables | ✅ `brand/pink` ⚠️ deprecated | ❌ hardcoded |
| Input | ✅ variables | ❌ todo hardcoded | ❌ hardcoded |
| Dropdown | ✅ variables | ⚠️ parcial | ✅ `text/primary` |
| Badge | ✅ variables | ✅ `brand/pink` / ✅ `colors/base/white` | ✅ parcial |
| Tag | ✅ variables | ❌ hardcoded | ❌ hardcoded |

**Conclusión:** Los componentes del DS actual NO usan los tokens semánticos en fills. Usan Primitives o hex fijo. Al crear nuevos elementos, USAR Semantics.

---

## 10. Patrones de construcción — Recetas

### Card básica
```
Frame → background/primary · border/primary (1px) · border-radius/xl
  Padding → spacing/4 (o spacing/6)
  Gap → spacing/4
```

### Row de tabla
```
Frame HORIZONTAL → background/primary · border/primary (1px bottom)
  Padding → spacing/3 vertical, spacing/4 horizontal
  Texto → Body Small/Medium → text/primary (principal) / text/secondary (secundario)
  Badge status → Badges · Color=Success/Warning/Danger/Info · State=Duo Tone
```

### Header de sección
```
Texto → Heading 3 o Subheading/Semibold → text/primary
Sub-label → Body Small/Regular → text/secondary
CTA → Button · Type=Primary o Secondary
```

### Input field con label
```
instanciar Input · State=Default · Status=Default · Helper Text=Off · Label=On
  → Label text → Body Small/Medium
  → Field → border/primary default, border/accent on focus
```

### Status badge shipment
```
Badges · State=Duo Tone · Round=Full Round
  Delivered → Color=Success
  In Transit → Color=Info       key: cac2b5b5bbf2e2c591de9cd44d891a25fe4bb26e ✅
  Pending Pickup → Color=Warning
  Failed → Color=Danger
  Cancelled → Color=Gray
```

**Badge variant keys (verificados 2026-05-15 — page "↳ Buttons"):**
| Variant | Key |
|---------|-----|
| Info · Fill · Full Round | `a992e6f46b2039157fc7c5abb00799cfd7917ad6` |
| Info · Duo Tone · Full Round | `cac2b5b5bbf2e2c591de9cd44d891a25fe4bb26e` |
| Info · Fill · Semi Round | `0b7465dc17d417a0ccd01028e457a67237e37bad` |
| Info · Duo Tone · Semi Round | `167c77db1d4da89ef2514142c5a4ce3ccfa7667f` |
| Secondary · Fill · Semi Round | `3782478143db374d2bbc797fc42aa6f46935fb9c` |
| Secondary · Duo Tone · Semi Round | `db6a8fdbd904223d1cb69b4330e1a30e3d6b5114` |
| Dark · Fill · Semi Round | `54e2c8eabcdf07940dc53157acb61b15853becc5` |
| Primary · Fill · Semi Round | `3c72114f2da3286deb0500488ac1c9471ec08977` |

### Sidebar nav item
```
Frame HORIZONTAL · spacing/2 gap
  padding: spacing/2 vertical, spacing/3 horizontal
  radius: border-radius/lg
  Active: background/secondary fill
  Default: no fill
  Icon → icon/primary (active) / icon/secondary (default)
  Label → Body Small/Medium → text/primary (active) / text/secondary (default)
```

---

## 11. Breakpoints / Pantallas

| Var | px | Clase |
|-----|-----|-------|
| `screens/sm` | 640 | `sm:` |
| `screens/md` | 768 | `md:` |
| `screens/lg` | 1024 | `lg:` |
| `screens/xl` | 1280 | `xl:` |
| `screens/2xl` | 1536 | `2xl:` |

Dashboard principal diseñado para `xl` (1280px+).

---

## 12. Lo que NO existe todavía (crear from scratch si se necesita)

| Componente | Cómo construir sin el DS |
|-----------|--------------------------|
| Table / Data Table | Frame · fila header (Body Small/SemiBold, background/secondary) + filas (border/primary bottom, Body Small/Regular) |
| Card | Frame · background/primary · border/primary · border-radius/xl · padding spacing/4 |
| Modal | Frame · background/primary · border-radius/2xl · shadow-lg · overlay (background/primary-transparent 50%) |
| Tabs | Frames horizontales · activo: border/accent bottom 2px + text/accent · inactivo: text/secondary |
| Sidebar | Frame vertical · background/secondary · padding spacing/4 · nav items (ver receta arriba) |
| Toast | Frame · background/accent-contrast · border-radius/xl · text/invert · shadow-lg |
| Tooltip | Frame · background/accent-contrast · border-radius/DEFAULT · Body Small/Regular · text/invert |
| Date Picker | Input + calendario popup (background/primary · border/primary · shadow-md) |
| Empty State | Center · Ilustración 120px · Heading 3 · Body Medium/Regular · Button Primary |
| Skeleton | Frame · background/secondary · border-radius/md · opacity 50% · animate |

---

*Archivo generado por Cleo — Airpals DS audit 2026-05-15*
*Fuente: scan directo de `Airpals-Design system` vía figma-ds-cli CDP*
