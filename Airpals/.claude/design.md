---
version: alpha
name: Airpals-DS
description: |
  Airpals Design System — plataforma B2B shipping para oficinas. Light-first, brand azul #0043ff
  sobre blancos y grises suaves. Lexend como display font, Inter para body. Figma: 3oMpon9bh8T8d0hFQt7l2g.

colors:
  # Brand
  primary: "#0043ff"
  primary-light: "#e6f1fd"
  primary-hover: "#1773ff"
  on-primary: "#ffffff"
  secondary: "#fc4575"
  navy: "#1b306c"

  # Text
  ink: "#111928"
  body: "#374151"
  ink-secondary: "#4b5563"
  ink-muted: "#637381"
  ink-disabled: "#9ca3af"

  # Backgrounds
  canvas: "#ffffff"
  surface: "#f9fafb"
  surface-card: "#ffffff"
  surface-disabled: "#f3f4f6"

  # Borders
  hairline: "#dfe4ea"
  hairline-hover: "#0043ff"
  hairline-focus: "#adbcf2"
  hairline-strong: "#cbd5e1"

  # Status
  success: "#22ad5c"
  success-bg: "#f0fdf4"
  error: "#ef4444"
  error-dark: "#991b1b"
  error-bg: "#fef2f2"
  warning: "#f59e0b"
  warning-dark: "#92400e"
  warning-bg: "#fffbeb"
  info: "#00a0ff"
  info-bg: "#eff6ff"

  # Neutrals
  gray-200: "#e5e7eb"
  gray-500: "#637381"
  gray-700: "#374151"
  dark: "#0a0a0a"

typography:
  display:
    fontFamily: "Lexend, sans-serif"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.2
  heading-lg:
    fontFamily: "Lexend, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
  heading-md:
    fontFamily: "Lexend, sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.3
  heading-sm:
    fontFamily: "Lexend, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
  body-lg:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4

radii:
  none: 0px
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px

spacing:
  4: 4px
  8: 8px
  12: 12px
  16: 16px
  20: 20px
  24: 24px
  32: 32px
  40: 40px
  48: 48px
---

## Airpals Design System

DS para Airpals — shipping B2B. Light-first, brand azul, Lexend + Inter.

### Componentes disponibles (librería publicada)

Button · Badge · Input · Textarea · Alert · Checkbox · Toggle · Avatar · Radio · Navbar · Footer · Logo · Icons

⚠️ Input y Checkbox: NO están publicados en librería del Borrador — usar helpers manuales (ver figma-master.md sección Airpals)

### Reglas de uso

- Frame desktop: 1440px · tablet: 768px · mobile: 375px
- Radius inputs/cards: `sm` (6px)
- Botones: `md` (8px) o `full` según variante
- Spacing base: 4px scale
