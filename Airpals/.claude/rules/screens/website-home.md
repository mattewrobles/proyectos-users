# Airpals — Website: Home Page

> Fuente: `🌳 Master` → `Home - L Screen` (1440px) + `Home - S Screen` (390px)
> Estado: producción activa. Escaneado 2026-05-15.
> **Node IDs verificados via CLI — usar para duplicar/modificar secciones.**

---

## Árbol completo — Home - L Screen (`1587:2623`)

```
Home - L Screen  [1440 × 8022px]  id:1587:2623
  ├── Page Container          [1440 × 893]   id:1990:4166   ← Hero + Navbar + Banner
  │     ├── Header            [1440 × 108]   id:1990:4167   ← Navbar
  │     ├── Banner            [1440 × 35]    id:1990:4194   ← Promo banner
  │     └── Main Section      [2102 × 750]   id:1990:4199   ← Hero (overflow visible)
  │           ├── home_exetendido  [GROUP]   id:1990:4200   ← Ilustración de fondo
  │           └── Main Content    [FRAME]   id:1990:4576   ← Copy + CTAs
  │                 ├── Text Container   [558 × 202]  id:1990:4577  ← H1 + subhead
  │                 └── Button Container [558 × 52]   id:2731:580   ← CTAs
  │
  ├── Frame 36089             [1440 × 129]   id:1587:3037   ← Trust bar (logos clientes)
  │     └── Frame 35803       [1280 × 87]    id:1587:3038
  │
  ├── Header                  [1440 × 74]    id:1587:3097   ← "Simplified Shipping for Busy Teams"
  │     └── Header text       [TEXT]         id:1587:3098
  │
  ├── Container               [1440 × 675]   id:1587:3099   ← 2 product cards
  │     └── Container         [1440 × 675]   id:1587:3100
  │           ├── Container   [480 × 547]    id:1587:3108   ← Card Same-Day
  │           └── Container   [480 × 547]    id:1587:3101   ← Card Multi-carrier
  │
  ├── Frame 36115             [1440 × 5381]  id:1587:3125   ← Features + Use cases + Social proof + Press
  │     ├── Main section      [1440 × 1868]  id:1587:3126   ← 4 Info sections (features)
  │     │     ├── Main headline  [TEXT]      id:1587:3136   "Spend less time coordinating shipments"
  │     │     ├── Info section  [959 × 378]  id:2731:920    ← Feature 1: Schedule ahead
  │     │     ├── Info section  [893 × 378]  id:2731:926    ← Feature 2: AI Assistant
  │     │     ├── Info section  [903 × 378]  id:2731:928    ← Feature 3: Share tracking
  │     │     └── Info section  [893 × 378]  id:2731:998    ← Feature 4: Team access
  │     │
  │     ├── Main container    [1440 × 517]   id:1587:3345   ← Use cases (4 círculos ilustrados)
  │     │     ├── Main header [TEXT]         id:1587:3346   "One platform for everyday work-related shipments"
  │     │     ├── Ellipse 173-176 (×4)       ← Círculos ilustrados
  │     │     ├── VIPs label, Project-related... (×4 labels)
  │     │     └── cientifico, Capibara, influencer, precioso (×4 ilustraciones GROUP)
  │     │
  │     ├── Frame 11          [1440 × 428]   id:2731:3640   ← Journey/Origin story
  │     │     ├── super_hero  [GROUP]        id:2732:1039   ← Ilustración héroe
  │     │     └── Frame 10    [480 × 428]    id:2731:3694   ← Copy story
  │     │
  │     ├── Frame             [1440 × 592]   id:1587:3561   ← Testimonials / Social proof
  │     │     └── Container   [GROUP 2572px wide]  id:1587:3562  ← scroll horizontal de testimonios
  │     │
  │     ├── Main Container    [1440 × 800]   id:1587:3608   ← Press section
  │     │     ├── Logo Background ×8         ← Fondos blancos para logos
  │     │     ├── Title [TEXT]               id:1587:3617   "Airpals in the spotlight"
  │     │     ├── Forbes, Tracxn, etc logos
  │     │     └── cajas [GROUP ilustración]  id:1587:3672
  │     │
  │     └── Main Container    [1440 × 526]   id:1587:3751   ← CTA final section
  │           └── Content Container [GROUP]  id:1587:3752
  │
  └── Footer                  [1440 × 711]   id:2735:25     ← Footer completo
        ├── Wrapper            [1280 × 376]   id:2735:26
        │     ├── Footer Header     [1280 × 32]   id:2735:27   ← Logo + socials
        │     └── Footer Navigation [1280 × 280]  id:2735:58   ← 4 columnas nav
        ├── Trust Bar Divider  [1440 × 1]    id:2735:168    ← línea sep
        └── Frame 36119        [1280 × 110]  id:2735:283    ← Trust bar (SOC2 / SSL)
```

---

## Info section — patrón de construcción

Cada `Info section` sigue esta estructura:

```
Info section  [~960 × 378px]
  ├── Image container  [437 × 378]  ← Ilustración vectorial (GROUP de Vectors)
  │     ├── Vector (fondo circular)
  │     └── [nombre ilustración]  [GROUP]  ← La ilustración real
  └── Text container   [398 × 158]
        ├── Placeholder [TEXT] ← Heading (H3 aprox)  e.g. "Schedule ahead"
        └── Placeholder [TEXT] ← Body copy
```

**Para duplicar una Info section:** clonar `id:2731:920` (o cualquier variante) y actualizar textos + ilustración.

---

## Secciones duplicables — node IDs clave

| Sección | Node ID | Tamaño | Notas |
|---------|---------|--------|-------|
| Navbar (Header) | `1990:4167` | 1440×108 | Componente — instancia del DS |
| Promo banner | `1990:4194` | 1440×35 | Franja promo |
| Hero (Main Section) | `1990:4199` | 2102×750 | Contiene ilustración `home_exetendido` |
| Trust bar logos | `1587:3037` | 1440×129 | Logos de clientes |
| Section header "Simplified Shipping" | `1587:3097` | 1440×74 | Solo texto centrado |
| Product cards container | `1587:3099` | 1440×675 | 2 cards 480×547 |
| Card Same-Day | `1587:3108` | 480×547 | — |
| Card Multi-carrier | `1587:3101` | 480×547 | — |
| Features section (4 Info sections) | `1587:3126` | 1440×1868 | Contiene headline + 4 bloques |
| Info section #1 (Schedule ahead) | `2731:920` | 959×378 | Ilustración: `call` group |
| Info section #2 (AI Assistant) | `2731:926` | 893×378 | — |
| Info section #3 (Share tracking) | `2731:928` | 903×378 | — |
| Info section #4 (Team access) | `2731:998` | 893×378 | — |
| Use cases (4 círculos) | `1587:3345` | 1440×517 | Ilustraciones: cientifico, Capibara, influencer, precioso |
| Journey/Story section | `2731:3640` | 1440×428 | Ilustración: `super_hero` group |
| Testimonials section | `1587:3561` | 1440×592 | Container 2572px (overflow) |
| Press section | `1587:3608` | 1440×800 | Logos: Forbes, Tracxn, etc. |
| CTA final section | `1587:3751` | 1440×526 | — |
| Footer completo | `2735:25` | 1440×711 | Incluye nav + trust bar |
| Footer Wrapper | `2735:26` | 1280×376 | Logo + nav columns |
| Footer Trust Bar | `2735:283` | 1280×110 | SOC2 / AICPA / SSL |

---

## Otros frames en 🌳 Master

| Frame | ID | Tamaño | Notas |
|-------|----|--------|-------|
| Footer-prueba | `2735:284` | 1440×754 | ⚠️ Frame de prueba — no producción |
| Home - S Screen | `1587:3808` | 390×10183 | Mobile version |
| Changelog UX/UI | `2732:1153` | 451×1519 | Doc interno de cambios |

---

## Hero — copy de producción

**H1:** "Workplace Shipping, Under Control"
**Sub:** "One platform for carrier labels, same-day couriers, and team requests — easy for teams to use, easy for leaders to see."
**CTA 1:** `Get My Free Account`
**CTA 2:** `Create a Same-Day Delivery`

---

## Navbar

```
[Logo]  Services▾  About Us  For Companies  Pricing  Contact Us  [🔍 Search]  [Dashboard →]
```
Height: 108px · Component ID: `1990:4167`

**Services dropdown:**
```
MULTI-CARRIER SHIPPING
  ├── Create shipping labels
  ├── Compare shipping rates
  └── AI Shipping Assistant [BETA]

BOOK COURIER & MESSENGER
  ├── New York Tri-State Area
  ├── Miami Metro Area
  └── Same-day courier other cities
```

---

## Footer — columnas de navegación

| Col 1 | Col 2 | Col 3 | Col 4 |
|-------|-------|-------|-------|
| About Us | NYC Same Day Same City | How It Works | Privacy Policy |
| For Companies | Multi-carrier Shipping Software | Share Your Feedback | Terms & Conditions |
| Pricing | Shipping Cost Calculator | Help Center | T&C Multi-carrier |
| | | Contact Us | T&C NYC Same-day |
| | | Blog | |
| | | Sitemap | |

**Trust bar:** SOC 2 Type II · AICPA Certified · 256-bit SSL · node: `2735:283`
