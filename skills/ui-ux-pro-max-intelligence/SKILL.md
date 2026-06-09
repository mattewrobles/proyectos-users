---
name: ui-ux-pro-max-intelligence
version: 1.0.0
description: Sistema experto de reglas UI/UX y desarrollo frontend de clase mundial. Cubre heurísticas visuales, matemáticas de diseño, accesibilidad WCAG 2.1, casuísticas extremas, design systems y código limpio. Ecosistema React, Next.js, Vue, Svelte, Tailwind CSS, shadcn/ui, Flutter, SwiftUI.
---

# UI/UX Pro Max — Ultimate Design & Dev Intelligence

## Cuándo activar esta base de conocimientos

- Auditar y refactorizar interfaces para llevarlas a estándares de clase mundial
- Diseñar o extender Design Systems desde cero
- Definir los 5 estados de cualquier componente (blank / loading / partial / error / extreme)
- Traducir diseños de Figma a código frontend robusto y semántico
- Garantizar cumplimiento WCAG 2.1 AA/AAA
- Revisar código de componentes UI para detectar anti-patrones

---

## Mapa de reglas por prioridad

| Prioridad | Categoría | Impacto | Dominio |
|-----------|-----------|---------|---------|
| 1 | Accesibilidad (a11y) | CRÍTICO | UX / Dev / Ética |
| 2 | Casuísticas (Edge Cases) | CRÍTICO | UX / Lógica |
| 3 | Interacción y Táctil | ALTO | UX / Dispositivos |
| 4 | Espaciado y Jerarquía | ALTO | UI / Layout |
| 5 | Color y Contraste | ALTO | UI / Accesibilidad |
| 6 | Tipografía | MEDIO | UI / Legibilidad |
| 7 | Arquitectura de Código | MEDIO | Dev / Mantenimiento |
| 8 | Micro-interacciones | MEDIO | UX / Delight |

---

## 1. Accesibilidad — CRÍTICO

### Contraste de color
- Texto normal: mínimo **4.5:1** (WCAG AA)
- Texto grande (18pt+ o 14pt bold): mínimo **3:1**
- Componentes UI y estados focus: mínimo **3:1**
- Nivel AAA (texto normal): 7:1 — aspiracional para apps fintech/salud

### Focus states — NUNCA ocultar sin alternativa
```css
/* NUNCA hacer esto sin alternativa */
outline: none;

/* CORRECTO — anillo de foco visible y marcado */
focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
```
El usuario de teclado debe saber en todo momento dónde está el foco.

### HTML semántico
- `<button>` para acciones, `<a>` para navegación — SIEMPRE
- `<div onClick>` solo con `role="button"` y `tabIndex={0}` — evitar cuando sea posible
- Usar `<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>` para landmarks

### ARIA
- Todo ícono interactivo sin texto visible → `aria-label` descriptivo
- Estados dinámicos: `aria-busy`, `aria-expanded`, `aria-selected`, `aria-current`
- Modales: `aria-modal="true"`, `aria-labelledby`, `role="dialog"`, focus trap
- Live regions para mensajes dinámicos: `aria-live="polite"` (éxito/info), `aria-live="assertive"` (errores críticos)
- Tablas de datos: `<caption>`, `scope="col"`, `scope="row"`

### Reducción de movimiento
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

### Checklist a11y por componente
- [ ] Operable con teclado (Tab, Enter, Space, Esc, flechas)
- [ ] Contraste ≥ 4.5:1
- [ ] Focus visible
- [ ] Labels semánticos (no solo placeholder como label)
- [ ] Mensajes de error vinculados al input con `aria-describedby`
- [ ] No depende únicamente del color para transmitir información

---

## 2. Casuísticas y Estados — CRÍTICO

### Los 5 estados obligatorios para todo componente o pantalla

**Estado Blank (Empty State)**
- No dejar pantallas vacías sin contexto
- Estructura: ilustración + título claro + descripción breve + CTA principal
- El CTA debe ser la acción que llena ese vacío ("Añade tu primera tarjeta")
- Copiar humanizado: "Aún no tienes transacciones", no "No data found"

**Estado Loading**
- Skeleton screens > Spinners para contenido estructurado (mejor percepción de velocidad)
- Spinners: solo para acciones puntuales (botón guardando, subiendo archivo)
- Spinner no bloqueante: `aria-busy="true"`, no deshabilitar toda la UI
- Skeleton: misma estructura del contenido final, con shimmer animation
- Si dura >3s: añadir mensaje de progreso

**Estado Partial**
- ¿Qué pasa si hay 1 ítem en una grilla de 3? ¿Se estira? ¿Se alinea a la izquierda?
- Definir comportamiento de listas con 0, 1, 2 y N ítems
- Cards con contenido incompleto (sin imagen, sin descripción, sin precio)

**Estado Error**
- Mensajes humanos, no códigos técnicos: "No pudimos cargar tus datos" ≠ "Error 500"
- Siempre incluir: qué salió mal + acción de recuperación (botón "Reintentar")
- Errores de validación: inline, en rojo, vinculados al campo, no solo al submit
- Errores de red: toast no bloqueante con opción de reintento

**Estado Extreme (stress test)**
- Nombres ultra largos: "Juan Carlos de la Santísima Trinidad García" → `truncate`, `line-clamp-1`
- Números enormes: $1,000,000,000.00 → ¿cabe en el espacio asignado?
- Texto en otro idioma (alemán, ruso) → ¿se rompe el layout?
- Contenido cero bytes (imagen rota, video sin cargar) → fallback visual

### Regla general de contenido
```
Siempre diseñar con contenido real, no Lorem Ipsum.
El Lorem Ipsum oculta problemas de jerarquía, longitud y truncamiento.
```

---

## 3. Interacción y Táctil — ALTO

### Touch targets (áreas táctiles mínimas)
| Plataforma | Mínimo recomendado |
|------------|-------------------|
| iOS (Apple HIG) | 44 × 44 pt |
| Android (Material 3) | 48 × 48 dp |
| Web móvil | 44 × 44 px |

El icono visual puede ser de 20×20px — usar `padding` para expandir el área táctil sin afectar el diseño visual.

```tsx
/* Correcto: icono pequeño, área táctil grande */
<button className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center">
  <IconClose className="w-4 h-4" />
</button>
```

### Zonas de interacción móvil (Thumb Zone)
- **Zona verde** (pulgar cómodo): parte inferior central e inferior derecha
- **Zona amarilla** (esfuerzo medio): bordes laterales
- **Zona roja** (incómodo): esquina superior izquierda/derecha
- CTAs principales → zona verde (bottom navigation, FAB)
- Acciones destructivas → zona roja o con confirmación extra

### Gestos
- Swipe para eliminar: siempre con confirmación o undo
- Pull-to-refresh: indicador visual + `aria-live` para notificar
- Scroll horizontal en listas: indicar visualmente que hay más (clip parcial + sombra)

---

## 4. Espaciado, Layout y Jerarquía — ALTO

### Sistema de 8pt Grid
Todos los márgenes, paddings y dimensiones deben ser múltiplos de 8:
`4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 128`

Para detalles finos (separadores, iconos) usar múltiplos de 4.

**Nunca usar valores arbitrarios como 7px, 13px, 22px.**

### Ley de proximidad
Elementos relacionados visualmente más cerca entre sí que del resto:
```
Label ——— 4px ——— Input  (relación directa)
Input ——— 8px ——— Helper text
Grupo ——— 24px ——— Siguiente grupo
Sección ——— 48px ——— Siguiente sección
```

### Escala de jerarquía visual (de mayor a menor impacto)
1. Tamaño — más grande = más importante
2. Peso tipográfico — bold antes que regular
3. Color / Contraste — alta saturación captura la atención primero
4. Espaciado — más espacio = más importancia percibida
5. Posición — arriba-izquierda primero (patrón F y Z)
6. Estilo — mayúsculas, cursiva como diferenciadores secundarios

### Z-index scale — NUNCA usar 9999
```css
/* Design tokens de z-index */
--z-base: 0;
--z-above: 1;
--z-dropdown: 10;
--z-sticky: 20;
--z-overlay: 25;
--z-modal: 30;
--z-toast: 40;
--z-tooltip: 50;
```

### Longitud de línea óptima
Entre **60 y 75 caracteres** por línea para máxima legibilidad.
```html
<!-- Tailwind -->
<p className="max-w-prose">...</p>
<!-- CSS puro -->
max-width: 65ch;
```

### Layout fluido — EVITAR widths fijos
```tsx
/* Anti-patrón */
className="w-[300px]"

/* Correcto */
className="w-full max-w-sm"  /* o flex-1, grid, etc. */
```

---

## 5. Color y Contraste — ALTO

### Regla 60-30-10
| Rol | Porcentaje | Uso |
|-----|-----------|-----|
| Dominante | 60% | Fondos, superficies, espacios vacíos |
| Secundario | 30% | Cards, sidebars, superficies elevadas |
| Acento | 10% | CTAs, botones primarios, highlights |

### Colores semánticos — no usar colores de marca para semántica
| Semántica | Uso | NUNCA |
|-----------|-----|-------|
| Rojo | Destructivo, error, peligro | Color de acento primario |
| Verde | Éxito, confirmación, positivo | Solo decorativo |
| Naranja/Amarillo | Advertencia, atención | Texto sobre fondo blanco (bajo contraste) |
| Azul | Info, links, interactivo | Reemplazar semántica roja |

### Dark Mode
- Fondo oscuro: **#121212 → #1E1E1E** (nunca negro puro `#000000`)
- Superficies elevadas: `#1E1E1E → #252525 → #2C2C2C` (sistema de elevación con luminosidad)
- Sombras en dark mode: reemplazar por bordes sutiles `border border-white/10`
- Texto en dark: `#FFFFFF` al 87% (primario), 60% (secundario), 38% (disabled)

### Tokens de color recomendados
```css
/* Sistema de colores semántico */
--color-background: ...;
--color-surface: ...;
--color-surface-raised: ...;
--color-primary: ...;
--color-primary-hover: ...;
--color-destructive: ...;
--color-success: ...;
--color-warning: ...;
--color-text-primary: ...;
--color-text-secondary: ...;
--color-text-disabled: ...;
--color-border: ...;
```

---

## 6. Tipografía — MEDIO

### Escala tipográfica (base 16px, ratio Major Third 1.25)
| Token | Tamaño | Peso | Line-height | Uso |
|-------|--------|------|-------------|-----|
| display | 3rem / 48px | 700-800 | 1.1 | Hero, landing |
| h1 | 2.25rem / 36px | 700 | 1.15 | Título página |
| h2 | 1.875rem / 30px | 600-700 | 1.2 | Sección |
| h3 | 1.5rem / 24px | 600 | 1.25 | Subsección |
| h4 | 1.25rem / 20px | 500-600 | 1.3 | Card title |
| body-lg | 1.125rem / 18px | 400 | 1.6 | Cuerpo grande |
| body | 1rem / 16px | 400 | 1.5 | Cuerpo estándar |
| small | 0.875rem / 14px | 400 | 1.5 | Labels, helpers |
| caption | 0.75rem / 12px | 400 | 1.4 | Captions, legal |

### Line-height por contexto
- Títulos y headings: **1.1 – 1.2** (más apretado, impacto visual)
- Cuerpo de texto largo: **1.5 – 1.7** (respiración para lectura)
- UI labels (botones, badges): **1 – 1.25** (contenido de una línea)

### Font pairing
- Máximo **2 familias** tipográficas
- Opción A: Serif (títulos impacto) + Sans-serif (cuerpo legible)
- Opción B: Una variable font con rangos de peso (Light 300 → ExtraBold 800)
- Nunca mezclar dos sans-serif similares

### Reglas de texto en código
```tsx
/* Truncamiento seguro */
className="truncate"           /* una línea */
className="line-clamp-2"       /* múltiples líneas */
className="break-words"        /* URLs y strings sin espacios */
className="whitespace-nowrap"  /* cuando NO debe romperse */
```

---

## 7. Arquitectura de Código UI — MEDIO-ALTO

### Componentes presentacionales vs contenedores
```tsx
/* Componente "tonto" (presentacional) — solo props y eventos */
interface ButtonProps {
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'destructive';
}

/* La lógica de negocio vive en hooks o componentes contenedores */
function useSubmitForm() {
  const [isLoading, setIsLoading] = useState(false);
  /* lógica aquí */
  return { isLoading, handleSubmit };
}
```

### CSS Variables para Design System
```css
/* Design tokens como variables CSS */
:root {
  --color-primary: #2563EB;
  --color-primary-hover: #1D4ED8;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px rgb(0 0 0 / 0.07);
  --shadow-lg: 0 10px 15px rgb(0 0 0 / 0.1);
  --transition-fast: 150ms ease-out;
  --transition-base: 200ms ease-out;
  --transition-slow: 300ms ease-out;
}
```

### Prevenir Layout Shift (CLS — Core Web Vital)
```tsx
/* Reservar espacio para imágenes antes de cargar */
<div className="aspect-video bg-gray-100">
  <img src={src} alt={alt} className="w-full h-full object-cover" />
</div>

/* Reservar espacio para contenido asíncrono */
<div className="min-h-[200px]">
  {data ? <ContentList data={data} /> : <SkeletonList />}
</div>
```

### Colores mobile-first en Tailwind
```tsx
/* Base = móvil, escalar hacia arriba */
className="px-4 md:px-6 lg:px-8"
className="text-sm md:text-base"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

---

## 8. Animación y Micro-interacciones — MEDIO

### Duraciones por tipo de interacción
| Tipo | Duración | Easing |
|------|----------|--------|
| Hover, toggle, checkbox | 150ms | ease-out |
| Dropdown, tooltip aparece | 200ms | ease-out |
| Modal, bottom sheet abre | 250-300ms | ease-out |
| Page transition | 250-350ms | ease-in-out |
| Skeleton shimmer | 1.5s | linear (loop) |
| >400ms | Lento, revisar | — |

### Curvas de easing por propósito
- **ease-out** → elementos que entran (rápido inicio, suave al llegar)
- **ease-in** → elementos que salen (suave inicio, rápido al final)
- **ease-in-out** → transiciones de página, transformaciones bidireccionales
- **spring** → objetos físicos (arrastrar, rebote natural en iOS/Android)

### Propiedades seguras para animar (GPU-accelerated)
```css
/* CORRECTO — compositor thread, sin repaint */
transform: translateX(), translateY(), scale(), rotate()
opacity: 0 → 1

/* NUNCA animar estas propiedades — causa repaints costosos */
width, height, margin, padding, top, left, box-shadow, background-color
```

### Feedback táctil
- Botones: escala `scale-95` al presionar (`active:scale-95`)
- Cards clickeables: `active:brightness-95` o `active:scale-[0.98]`
- Duración de press feedback: **100-150ms**

---

## Ejemplos de código: anti-patrón vs pro max

### Botón con todos los estados

**Anti-patrón:**
```tsx
<div onClick={submit} className="bg-blue-500 text-white w-[200px] h-[30px] ml-5 text-[14px]">
  Submit
</div>
```
Errores: no semántico, sin focus, no accesible con teclado, sin estados, rompe grid de 8pt.

**Pro Max:**
```tsx
<button
  onClick={submit}
  disabled={isLoading}
  aria-busy={isLoading}
  className="
    inline-flex items-center justify-center gap-2
    px-4 py-2.5
    min-w-[120px] min-h-[44px]
    bg-blue-600 text-white text-sm font-medium rounded-lg
    transition-all duration-200 ease-out
    hover:bg-blue-700
    active:scale-95
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
  "
>
  {isLoading && <Spinner className="w-4 h-4 animate-spin" aria-hidden />}
  {isLoading ? 'Guardando...' : 'Guardar Cambios'}
</button>
```

### Input con validación accesible

**Anti-patrón:**
```tsx
<input placeholder="Email" className="border p-2" />
{error && <p className="text-red-500">{error}</p>}
```

**Pro Max:**
```tsx
<div className="flex flex-col gap-1.5">
  <label htmlFor="email" className="text-sm font-medium text-gray-700">
    Correo electrónico
  </label>
  <input
    id="email"
    type="email"
    autoComplete="email"
    aria-describedby={error ? 'email-error' : 'email-hint'}
    aria-invalid={!!error}
    className="
      w-full px-3 py-2 rounded-lg border text-sm
      border-gray-300 bg-white
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      aria-invalid:border-red-500 aria-invalid:focus:ring-red-500
      transition-colors duration-150
    "
  />
  {!error && (
    <p id="email-hint" className="text-xs text-gray-500">
      Te enviaremos la confirmación aquí
    </p>
  )}
  {error && (
    <p id="email-error" role="alert" className="text-xs text-red-600 flex items-center gap-1">
      <IconAlertCircle className="w-3.5 h-3.5" aria-hidden />
      {error}
    </p>
  )}
</div>
```

### Empty state accionable

**Anti-patrón:**
```tsx
{!items.length && <p>No data</p>}
```

**Pro Max:**
```tsx
{!items.length && (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    <IllustrationEmpty className="w-32 h-32 mb-6 text-gray-300" aria-hidden />
    <h3 className="text-base font-semibold text-gray-900 mb-1">
      Aún no tienes transacciones
    </h3>
    <p className="text-sm text-gray-500 max-w-xs mb-6">
      Cuando realices tu primera transferencia, aparecerá aquí.
    </p>
    <Button variant="primary" onClick={onAddFirst}>
      Enviar dinero
    </Button>
  </div>
)}
```

---

## Checklist de revisión por componente

Antes de considerar un componente terminado:

### Funcionalidad
- [ ] Funciona con teclado (Tab, Enter, Space, Esc)
- [ ] Focus visible en todos los estados interactivos
- [ ] Labels semánticos (no depende del placeholder como label)
- [ ] Errores vinculados al campo con `aria-describedby`
- [ ] No depende únicamente del color para comunicar estado

### Diseño
- [ ] Todos los valores son múltiplos de 4 u 8
- [ ] Contraste ≥ 4.5:1 en texto, ≥ 3:1 en UI
- [ ] Touch targets ≥ 44×44px en móvil
- [ ] Truncamiento definido para texto largo

### Estados
- [ ] Default, hover, focus, active, disabled implementados
- [ ] Loading state con skeleton o spinner accesible
- [ ] Error state con mensaje humano + acción de recuperación
- [ ] Empty state con ilustración + CTA
- [ ] Probado con contenido extremo (texto largo, números grandes)

### Código
- [ ] Sin z-index arbitrarios
- [ ] Sin widths fijos donde debería ser fluido
- [ ] Animaciones solo en `transform` y `opacity`
- [ ] `prefers-reduced-motion` respetado
- [ ] Sin valores hardcoded (usar tokens / variables)

---

## Referencias por plataforma

### iOS — Apple HIG
- Touch target: 44pt
- Corner radius MD: 12pt (iOS 17+: squircle nativo)
- Fuente: SF Pro (sistema), respetar Dynamic Type
- Bottom Safe Area: siempre respetar `safeAreaInsets`
- Spring animations: natural, con masa y tensión

### Android — Material Design 3
- Touch target: 48dp
- Corner radius: uso de `ShapeDefaults` del sistema
- Color system: Dynamic Color basado en wallpaper del usuario
- Motion: Material Motion (Shared Axis, Fade Through, Container Transform)

### Web — WCAG 2.1 AA base
- Fuentes: mínimo 16px body, no menores a 12px en ningún contexto UI
- Viewport: nunca deshabilitar zoom (`user-scalable=no` prohibido)
- Imágenes decorativas: `alt=""`
- Tabindex: nunca valores positivos (rompen el orden natural de foco)
