---
version: alpha
name: uTransfer-DS
description: |
  uTransfer Design System — billetera digital global para LATAM. Dark/light mode con tokens semánticos.
  Paleta brand magenta/rosa sobre fondos oscuros profundos. Inter como fuente, radius pill en botones,
  sistema de gamificación Upoints con colores vibrantes. Figma: archivo Utransfer v2, librería Utransfer_D_S.

colors:
  # Brand
  primary: "#E91E8C"
  primary-light: "#FF4DB8"
  primary-dark: "#C4187A"
  on-primary: "#FFFFFF"

  # Text
  ink: "#FFFFFF"
  ink-secondary: "#A0A0B0"
  ink-disabled: "#5A5A70"
  ink-invert: "#0D0D1A"
  ink-brand: "#E91E8C"

  # Backgrounds
  canvas: "#0D0D1A"
  surface: "#161625"
  surface-elevated: "#1E1E30"
  surface-card: "#1E1E30"
  surface-overlay: "#12121F"

  # Borders
  hairline: "#2A2A40"
  hairline-focus: "#E91E8C"
  hairline-success: "#22C55E"
  hairline-error: "#EF4444"
  hairline-warning: "#F59E0B"
  hairline-info: "#3B82F6"

  # Status
  success: "#22C55E"
  success-soft: "rgba(34,197,94,0.15)"
  error: "#EF4444"
  error-soft: "rgba(239,68,68,0.15)"
  warning: "#F59E0B"
  warning-soft: "rgba(245,158,11,0.15)"
  info: "#3B82F6"
  info-soft: "rgba(59,130,246,0.15)"

  # Upoints / Gamification
  upoints: "#FFD700"
  upoints-soft: "rgba(255,215,0,0.15)"

typography:
  h3:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.2
  h5:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.3
  subtitle-m:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4

radii:
  none: 0px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  2xl: 24px
  full: 9999px

spacing:
  0: 0px
  2: 2px
  4: 4px
  8: 8px
  12: 12px
  16: 16px
  20: 20px
  24: 24px
  28: 28px
  32: 32px
  40: 40px
  48: 48px
  64: 64px
---

## uTransfer Design System

Sistema de diseño para uTransfer — app fintech LATAM. Dark-first, brand magenta.

### Componentes existentes

- Button Giant Primary / Clear / Secondary / Error / Success
- Input (Default/Focus/Error/Success/Disabled) · OTP Input · Search Bar
- Tab Bar · Toolbar Sheet · Status Bar · Home Indicator · Keyboard
- Avatar (Initials/Photo 24/32/40/64) · Badge · Label · Chips
- Card · Dialog · Banner · Toast · Alert · Action Sheet
- Stepper · Progress Bar · Page Control · Spinner · Inline Loader
- Ilustraciones: Wallet 01-05, Not Found, Messages, Social

### Reglas de uso

- Frame mobile: 393×852px siempre
- Botones: siempre `Radius-full` (pill), nunca cuadrados
- Cards: `Radius-xl` o `Radius-2xl`
- Inputs: `Radius-md`
- Spacing base: 4px scale (4, 8, 12, 16, 20, 24, 32...)
- Touch target mínimo: 44px
