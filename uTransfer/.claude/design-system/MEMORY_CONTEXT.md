# uTransfer Design System — Memoria Central

> Este archivo es la ÚNICA fuente de verdad para construir interfaces web de uTransfer.
> Cargarlo al inicio de cualquier sesión de coding de uTransfer.
> Última actualización: 2026-04-09 (generado via figma-ds-cli, 237 variables extraídas)

---

## ¿Qué es uTransfer?

App fintech (iOS, Android, Web) para enviar dinero usando stablecoins (USDT bajo el capó — el usuario ve su moneda local). Mercado: Ecuador y Latinoamérica.

**Diferenciador clave:** Upoints — sistema de gamificación donde se ganan puntos por transacciones y jugar, canjeables en gift cards (Amazon, Netflix, Starbucks).

**Tono:** Cercano, segunda persona, positivo, latinoamericano. Nunca bancario, nunca frío.

**Referentes:** Revolut (UX premium), Wise (transparencia), Nubank (tono)

---

## Stack de código para web

```
React 18 + TypeScript
Tailwind CSS (config en .claude/design-system/tailwind.config.js)
CSS Custom Properties (vars en .claude/design-system/globals.css)
Fuente: Inter (400, 500, 600, 700)
Frame mobile: 393×852px
```

---

## Reglas absolutas (no negociables)

1. **Tokens semánticos SIEMPRE** — usar CSS vars de `globals.css`. Nunca hex fijo.
2. **Botones = pill siempre** — `rounded-full`. Nunca border-radius menor.
3. **Sin box-shadow decorativo** — profundidad solo por contraste de color entre capas.
4. **Dark mode es el default** — `<html class="dark">` siempre activo.
5. **Touch targets ≥44px** — mínimo `h-s-11` (44px) en elementos táctiles.
6. **Spacing con tokens** — usar clases `s-[0-20]` de Tailwind, nunca px arbitrario.
7. **Glass para elementos flotantes** — nav, modales, tab bar → `glass-nav` o `glass-modal`.

---

## Paleta en dark mode (valores verificados)

```
Base app:          #090909    (--bg-base)
Background:        #0d0d0e    (--bg-background)
Foreground/screen: #1a1a1b    (--bg-foreground)
Card:              #1c1d1e    (--card)
Input bg:          #1e1f20    (--general-input)
Brand primary:     #d9016c    (--general-primary / brand rose)
Brand aqua:        #02bbb5    (--brand-aqua)
Text primary:      #f2f2f2    (--text-primary)
Text secondary:    #7c8287    (--text-secondary)
Success:           #34c759    (--icon-positive)
Error:             #e42131
Warning:           #fbbf24
```

---

## Jerarquía de capas (dark mode)

```
#090909  base-app
  └── #0d0d0e  bg-background
        └── #1a1a1b  bg-foreground (pantallas)
              └── #1c1d1e  card (cards de contenido)
                    └── #1e1f20  general-input (campos)
                          └── #222325  bg-primary-elevated
```

---

## Espaciado (escala exacta del DS)

```
s-2=4px  s-3=8px  s-4=12px  s-5=16px  s-6=20px
s-7=24px  s-8=28px  s-9=32px  s-10=40px  s-11=44px
s-12=48px  s-16=80px  s-20=128px
```

**Padding estándar de pantalla:** `px-s-6` (20px)
**Gap entre elementos:** `gap-s-3` (8px) o `gap-s-4` (12px) o `gap-s-5` (16px)

---

## Radius (escala exacta del DS)

```
none=0  xs=4px  sm=8px  md=12px  lg=16px  xl=20px
2xl=24px  3xl=32px  4xl=40px  full=9999px
```

**Reglas:**
- `rounded-full` → botones pill (siempre)
- `rounded-xl` o `rounded-2xl` → cards
- `rounded-md` → inputs
- `rounded-2xl` → modales

---

## Tipografía (Inter únicamente en web)

```
display (48px/700) → héroe, splash
h3      (28px/600) → título de pantalla
h5      (20px/500) → subtítulo de sección
subtitle-m (16px/500) → labels prominentes
body-sm (12px/400) → body de listas
caption (12px/400) → hints, timestamps
```

---

## Componentes principales y sus archivos

| Componente | Archivo | Tailwind clave |
|------------|---------|----------------|
| Button | `components/Button.md` | `rounded-full bg-btn-primary` |
| Input | `components/Input.md` | `rounded-md bg-general-input border-border-primary` |
| Card | `components/Card.md` | `rounded-xl bg-card` |
| Modal | `components/Modal.md` | `glass-modal rounded-2xl` |
| TabBar | `components/TabBar.md` | `glass-nav border-t border-border-primary` |
| StatusBar | `components/StatusBar.md` | `h-[44px] bg-bg-foreground` |
| IllustrationBlock | `components/IllustrationBlock.md` | Pantallas de estado |

---

## Patrones de pantalla más usados

### Estructura de pantalla estándar
```tsx
<div className="flex flex-col w-full min-h-screen bg-bg-foreground">
  <StatusBar />
  <AppHeader title="..." leftAction={<BackButton />} />
  <main className="flex-1 overflow-y-auto px-s-6 py-s-5 flex flex-col gap-s-5">
    {/* contenido */}
  </main>
  <footer className="px-s-6 pb-s-10 safe-bottom flex flex-col gap-s-3">
    <Button>CTA principal</Button>
  </footer>
</div>
```

### Pantalla Home
```tsx
<div className="flex flex-col gap-s-5 px-s-6 py-s-5">
  <BalanceCard amount="$1,250.00" currency="USD" upoints={450} />
  <QuickActionsRow />
  <SectionTitle>Mis transacciones</SectionTitle>
  <TransactionList items={transactions} />
</div>
```

### Flujo de envío (patrón multi-paso)
```tsx
// Paso 1: seleccionar monto
// Paso 2: seleccionar contacto
// Paso 3: confirmar (modal/pantalla)
// Paso 4: éxito (StatusScreen con IllustrationBlock)
```

---

## Micro-interacciones (obligatorias)

```css
/* Botones al presionar */
active:scale-[0.98]

/* Cards clickeables */
active:scale-[0.99]

/* Chips e iconos */
active:scale-90

/* Transición base */
transition-all duration-200 ease-smooth
```

---

## Sección de Juegos/Upoints (reglas especiales)

- Usar `bg-card-vibrant-primary` y `bg-card-vibrant-tertiary` **solo** en esta sección
- Colores más vibrantes permitidos (brand-aqua, brand-yellow)
- Animaciones más llamativas (spring: `ease-spring`)
- El resto de la app usa los tokens normales

---

## Keys de Figma (referencia rápida)

```javascript
// Componentes
Button Giant Primary:  '15be15cfa0d8c4667e4eb8f84bf80f9919e019c9'
Input Large Outline:   '85a6f7f74d08b5dbc46d9593345f458eca417bff'
Status Bar (local):    getNodeByIdAsync('1:916')

// Text Styles
H3 (28px):      '41243533aec36fb477c160301ba9c854ebaf0c01'
H5 (20px):      'a761967b66cd94663df9cacbe06c32f68b48b7e7'
Subtitle M:     'df46c8797813b902f6164fa2ea73a2e58e0b13df'
Caption 1:      '3c4a22b5a0d0e65480fea3cbc965b935ee9a610c'

// Effect Styles
Dialog (glass modal): '206d603d7fe94a4a4a5ec3d78805b70021c15a4c'
Button (glass btn):   'af136631d5e760b54ca4761eb14934f945e6b587'

// Ilustraciones
Wallet Success: 'e4b09f3c3b1242ba4e786d74396977f94498e2de'
Not Found:      'b2f3e10b80c3cbb1bfd1532a86e9869dcd1e154e'
```

---

## Flujos diseñados (pantallas existentes en Figma)

```
🫆 Onboarding
  ├── Login / inicio de sesión
  ├── Sign up (registro)
  ├── Reset password
  └── KYC (Trulioo)

🏠 Home - Operaciones
  ├── Home principal
  ├── Enviar (Loopay / billetera)
  ├── Recibir / Solicitar (nacional e internacional)
  ├── Visa Direct (envío local + internacional por tarjeta)
  ├── Depositar / Retirar
  ├── Agregar tarjeta
  ├── Conversor de moneda
  ├── Notificaciones
  └── Ajustes

🎮 Juegos
  ├── UPoints (canje de puntos)
  ├── Sala de juegos
  └── Gift cards (Amazon, Netflix, Starbucks)
```

---

## Archivos de esta documentación

```
.claude/design-system/
├── globals.css         ← CSS custom properties del DS
├── tailwind.config.js  ← Config Tailwind con tokens
├── tokens.md           ← Referencia de tokens semánticos
├── typography.md       ← Text styles → Tailwind
├── MEMORY_CONTEXT.md   ← Este archivo
└── components/
    ├── Button.md
    ├── Input.md
    ├── Card.md
    ├── Modal.md
    ├── StatusBar.md
    ├── TabBar.md
    └── IllustrationBlock.md
```

---

## Cómo usar esta documentación en nuevas pantallas

Cuando se pida "crear la pantalla X":

1. Leer `MEMORY_CONTEXT.md` (este archivo) para entender el contexto
2. Identificar qué componentes necesita la pantalla
3. Leer el `.md` del componente correspondiente para obtener el código
4. Aplicar la estructura de pantalla estándar
5. Usar SOLO tokens de `globals.css` — nunca colores hardcoded
6. Verificar que los touch targets son ≥44px
7. Probar en frame 393×852px

---

## Checklist de calidad UI (antes de entregar una pantalla)

- [ ] Todos los colores usan CSS vars (`var(--...)`), no hex fijo
- [ ] Botones tienen `rounded-full`
- [ ] Inputs tienen `rounded-md` y `bg-general-input`
- [ ] Cards tienen `rounded-xl` o `rounded-2xl`
- [ ] Elementos flotantes (modal, nav) tienen glass effect
- [ ] Touch targets ≥44px en todos los elementos táctiles
- [ ] Espaciado usando clases `s-[n]` o `gap-s-[n]`
- [ ] Fuente Inter, pesos 400/500/600/700 únicamente
- [ ] `safe-bottom` en footers con botones
- [ ] StatusBar visible en la parte superior
