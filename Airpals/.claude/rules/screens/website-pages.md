# Airpals — Website: Páginas internas

> Fuente: `↳ About Us` · `↳ For Companies` · `✏️ Blog` · `✏️ Login`
> Escaneado 2026-05-15.

---

## About Us

**Tamaños:** Desktop 1440×4409px · Mobile 375×6716px

### Secciones y copy clave

| Sección | Headline | Copy clave |
|---------|----------|-----------|
| Hero | "Revolutionizing Workplace Logistics" | — |
| Origin story | "From aha moment to Airpals" | "Our founder, Joshe, spent a decade deep in the chaos of corporate and industrial shipping...One truth stood out, no matter the role or industry." |
| Founder | "The brains behind it all" | Joshe Ordonez — fashion background, speaker at events including UN, led Airpals as CEO/Founder |
| Philosophy | "The Airpals approach to workplace logistics" | "Triple bottom-line: people first, then the planet, then profits." |
| Brand voice | "We do B2B with personality" | "Unsung operational heroes work at front desks and behind the scenes. They know the office calendar, coffee preferences, and where the stapler is." |
| Press | "News that make mom proud" | — |

**Founder bio (CEO):**
> "Joshe Ordonez started her fashion career quickly after graduating college. Her creativity and expertise drew invitations to speak at events, including one at the United Nations. Entrepreneur and multidisciplinary strategist from Ecuador."

---

## For Companies

**Tamaños:** Desktop 1440×4621px · Mobile 375×4628px

### Función
Página de lead generation — formulario de contacto B2B.

**Headline principal:**
> "We handle workplace shipping so you can handle everything else"

**Subhead:**
> "You can't grow an extra arm to multitask more, but you can extend your team with us. We'll deliver your documents and drop off your swag bags so you can be a less stressed office hero."

**CTA de sección:**
> "Ready to have a pal help you out?"

**Campos del formulario:**
- Work Email*
- Name* (First + Last)
- Mobile Phone*
- Company
- Tell us about your delivery needs

**Submit CTA:** `Get Business Shipping Solutions`

**Legal:**
> "By clicking 'Submit', you agree to Airpals Terms of Use and acknowledge you have read the Privacy Policy. You also consent to receive calls or SMS messages."

---

## Blog

**Figma page:** `✏️ Blog`
**Frames:** Blog - L Screen (1440×5434px) · Blog Post - L Screen (1440×5113px) · Blog Post - S Screen (390×5898px)

### Blog list page
Layout estándar de blog: hero con último post + grid de artículos.

### Blog post
Estructura: Header de artículo + Autor + Body + Sidebar (probable)

**Author component (en Figma):**
- Nombre: Joshe Ordonez
- Título: CEO & Founder
- Bio: "Entrepreneur and multidisciplinary strategist from Ecuador. She leads Airpals, a B2B workplace logistics platform revolutionizing shipping operations for teams."
- Avatar circular 80×80px
- Ícono de red social

---

## Login / Sign Up

**Figma page:** `✏️ Login`

### Login
- **Headline:** "Manage your shipping needs like a master"
- **Tabs:** `Log In` / `Sign Up`
- **Campos:** Work Email · Password
- **Links:** Forgot password · Don't have an account? Sign up
- **OAuth:** Sign in with Google
- **Note:** Pide *Work Email* (no personal) — esto es un producto B2B

### Verificación SMS (dentro del flujo de Sign Up)
- **Headline:** "Account Verification"
- **Copy:** "For security reasons, we will send you a verification code via SMS on your phone number"
- Estados:
  - Code Sent — "We've sent you a text message. Please enter the code below."
  - Invalid code
  - Resend code via SMS

---

## Pricing

**Figma page:** `↳ Pricing Page`
**Handed-off:** Aug 5, 2024
**Size:** ~2780×3295px (section)

*(Deep scan no realizado — referencia en figma-files.md)*

---

## How It Works

**Figma page:** `↳ How It Works`
**Última versión:** "Handed-off April 16th, 2025"
**Anterior:** "Former version before April 16th, 2025"

*(Deep scan no realizado — cargar cuando sea necesario)*

---

## Patrones de UI comunes entre páginas

- Navbar y Footer idénticos en todas las páginas
- Banner promo en la parte superior (mismo componente)
- Newsletter signup en el footer
- Trust badges SOC 2 / AICPA / 256-bit SSL en footer
- Login pide `Work Email` (no personal) — fricción intencional para filtrar B2B
