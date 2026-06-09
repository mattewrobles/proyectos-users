# Airpals — Website: Navbar & Footer

> Fuente: `↳ Navbar` → "Handed-off March 4, 2025"
> Referencia para implementar nav en cualquier pantalla nueva del sitio.
> Escaneado 2026-05-15.

---

## Navbar — Desktop (1440px)

```
[Airpals Logo]  [Services ▾]  [About Us]  [For Companies]  [Pricing]  [Contact Us]  [🔍 Search...]  [Dashboard →]
```

**Height:** 108px
**Fondo:** blanco / transparente sobre hero

### Services dropdown (550×200px)

```
MULTI-CARRIER SHIPPING
  ├── Create shipping labels
  ├── Compare shipping rates
  └── AI Shipping Assistant  [BETA badge]

BOOK COURIER & MESSENGER
  ├── New York Tri-State Area
  ├── Miami Metro Area
  └── Same-day courier other cities
```

**Notas del archivo:**
> "New York Messenger Service → New York Tri-State Area. Added Miami Metro Area → redirects to Miami SEO-oriented page." (Mar 4, 2025)

### Variantes del navbar
| Frame | Descripción |
|-------|-------------|
| `Home` (1440×900) | Estado default en Home |
| `Home - S Screen` (390×844) | Mobile collapsed |
| `Navbar / Services` (550×200) | Dropdown abierto |
| `Navbar - Mobile` (390×844) | Mobile con menú expandido |
| `Navbar/Services - Mobile` | Mobile con Services abierto → Back / MULTI-CARRIER / COURIER |

---

## Navbar — Mobile (390px)

**Estado collapsed:**
```
[Logo]  [≡ Hamburger]
```

**Estado expanded:**
```
[✕ Close]
Services
About Us
For Companies
Pricing
Help Center
Login
Contact Us
```

**Mobile Services sub-menu:**
```
[← Back]
Services
  MULTI-CARRIER SHIPPING
  COURIER & MESSENGER
[Dashboard]
[Contact Us]
```

---

## Footer (1440px · 711px)

### Estructura
```
[1280px wrapper]
  ├── Footer Header (32px)  — Logo + social links
  └── Footer Navigation (280px) — 4 columnas de links

[Trust Bar Divider] — línea 1px

[Trust Bar] (110px) — badges de seguridad
```

### Columnas de navegación

| Col 1 — Company | Col 2 — Services | Col 3 — Support | Col 4 — Legal |
|-----------------|-----------------|-----------------|---------------|
| About Us | NYC Same Day Same City | How It Works | Privacy Policy |
| For Companies | Multi-carrier Shipping Software | Share Your Feedback | Terms & Conditions |
| Pricing | Shipping Cost Calculator | Help Center | T&C Multi-carrier |
| | | Contact Us | T&C NYC Same-day |
| | | Blog | |
| | | Sitemap | |

### Newsletter
Componente de newsletter en el footer: "Subscribe to our newsletter" + email input

### Trust bar (bottom strip)
- **SOC 2 Type II** — certificación de seguridad
- **AICPA Certified**
- **256-bit SSL**

---

## Notas de implementación

- El navbar en Figma es un componente (`Navbar` instancia en varios frames)
- Key del componente DS: `3a3f1b66137b2a2319c8482b6c2f6e4f19f0f403` — ver `ds-credo.md`
- Banner promo (35px) aparece DEBAJO del navbar, no adentro
- CTA principal del navbar: `Dashboard →` — botón azul en el extremo derecho
- Search: campo de texto simple, no un modal
