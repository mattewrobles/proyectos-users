# Airpals — Blog Brief Generation Instructions

> Cargar cuando: se pide generar un brief de blog para Airpals (WRITER o INHOUSE).

---

## Cómo pedir un brief

Inputs requeridos:
- **Brief type:** WRITER o INHOUSE
- **H1 / Blog title:** [título]
- **Main keyword:** [keyword primario — siempre el primero de la lista]
- **Search intent:** [qué busca el lector]
- **Angle:** [ángulo editorial único]
- **Product category:** Workplace Logistics Platform | Same-Day Courier | Multi-Carrier | Other
- **Language:** English | Spanish

Extras opcionales:
- Competitor URLs para analizar gaps de TOC
- Caso real de cliente a incluir
- Draft CTA idea
- Secciones ya definidas

---

## Brief Type 1 — WRITER BRIEF (DOCX)

Para escritores externos. Detallado, con contexto completo, entregado como .docx.

### Campos variables (generados por blog)

| Campo | Qué hacer |
|-------|-----------|
| Topic | Derivado del H1 |
| Title (H1) | Tal como se provee |
| Meta Title (MT) | SEO-optimizado, máx ~60 chars, incluir año si relevante |
| Approach | 2-3 párrafos: estrategia editorial, flujo, dónde encaja Airpals naturalmente |
| Goal + CTA | Objetivo estratégico + draft CTA marcado "Subject to change" |
| Product Category | Basado en input |
| Context for this blog idea | Background para el escritor: problema operacional, features de Airpals relevantes, vocabulario a usar |
| Keywords | Primario (primero) + todos los secundarios. "MUST BE INCLUDED (at least 2-5 times). USE IN TITLES and TEXT." |
| Related questions (FAQs) | 5-7 preguntas SEO-friendly (People Also Ask + search intent) |
| Table of Contents | Estructura H2/H3 con notas de contenido por sección, basado en análisis competitivo |

### Campos fijos (siempre iguales)

| Campo | Valor fijo |
|-------|-----------|
| Word Count | 1,500–2,000 words max |
| Type of content | Explanatory / Technical and straightforward. For the examples, more literature can be added, but keep it technical and explanatory. |
| Discard terms | Any negative terms towards Airpals |
| External linking | Any links, as long as not from competitors. At least 2–3 links from authoritative sources. |
| Notes | Use an inviting tone. Use technical vocabulary. Use as many key terms as possible to improve positioning. FAQ section, as always — do not add more FAQs than the ones listed. |

### Campos que Mau agrega manualmente
- Images (links de Freepik)
- Internal links (usar listas maestras abajo)

### Formato DOCX — estructura visual

Tabla de dos columnas, ancho completo, que corre todo el documento.

**Fuera de la tabla (headings):**
- `Writing Brief ([Month] Blog #X):`
- `[Title (H1)]`

**Columnas:**
- Left: ~30% width, fondo azul claro `D5E8F0`, label en bold
- Right: ~70% width, fondo blanco, contenido

**Specs:**
- Font: Arial throughout
- Borders: light gray `CCCCCC`, BorderStyle.SINGLE
- Cell padding: `{ top: 80, bottom: 80, left: 120, right: 120 }`
- Page: US Letter, 1-inch margins
- Column widths: left ≈ 2800 DXA, right ≈ 6560 DXA (suma = 9360)

**Filas en orden:**

| Fila | Label izquierdo | Contenido derecho |
|------|----------------|------------------|
| 1 | Topic: | Blog topic |
| 2 | Title (H1): | H1 completo |
| 3 | Meta Title (MT) | ~60 chars SEO |
| 4 | Approach | 2-3 párrafos |
| 5 | Goal + CTA | Goal + CTA "SUBJECT TO CHANGE" |
| 6 | Product category: | Workplace Logistics Platform *formerly known as Parcel Management Platform OR Same-Day Courier Service |
| 7 | Context for this blog idea | Background detallado |
| 8 | Keywords | Header + bullet list (primario primero) |
| 9 | Related questions: | "FAQ" + 5-7 preguntas bullet |
| 10 | Word Count: | "1,500 – 2,000 words max" |
| 11 | Type of content: | Fixed text |
| 12 | Table of contents: | Secondary label: "More info below". Numbered H2s + sub-bullets con H3s |
| 13 | Discard terms: | Fixed text |
| 14 | Internal linking: | Bullets de links relevantes por categoría del blog |
| 15 | External linking: | Fixed text |
| 16 | Images: | Vacío (Mau completa) |
| 17 | Notes: | Fixed text |

> Usar skill `docx` para generar el archivo. Leer `/mnt/skills/public/docx/SKILL.md` antes de escribir código.

---

## Brief Type 2 — IN-HOUSE BRIEF (Markdown)

Para blogs escritos internamente. Más simple — define arquitectura SEO.

### Formato

```markdown
# AIRPALS — IN-HOUSE BLOG BRIEF

**H1:** [title]
**Search Intent:** [description]

**Keywords:**
- [primary keyword] ([volume])
- [secondary keyword]
- [secondary keyword]
- ...

---

## Table of Contents

1. Introduction: [brief note]
2. H2: [Section title]
   - H3: [Subsection] — [content note]
   - H3: [Subsection] — [content note]
3. H2: [Section title]
   - [content note]
4. H2: [Section title]
   - H3: [Subsection] — [content note]
5. H2: Key Takeaways
6. H2: [Conclusion title]
   - Strategic conclusion + CTA to Airpals Product
7. FAQs

---

## FAQs

1. [Question]
2. [Question]
3. [Question]
4. [Question]
5. [Question]
6. [Question]
```

---

## Reglas de contenido (aplican a AMBOS tipos)

### SEO & Research
- Investigar qué rankea actualmente para el keyword primario — identificar gaps de TOC
- TOC construido para igualar o superar coverage de competidores
- FAQs basadas en People Also Ask real + long-tail intent
- Keywords secundarios distribuidos naturalmente — nunca stuffed
- Keyword primario: primero en la lista

### Reglas de producto Airpals
- Multi-Carrier: siempre "carrier", nunca "courier"
- Same-Day Courier: siempre "courier"
- Airpals se introduce naturalmente en la segunda mitad del artículo, nunca forzado desde el inicio
- Nunca usar startup hype o expresiones vagas como "optimize workflows"
- Nunca inventar datos, estadísticas o claims (E-E-A-T)
- Nunca linkear a blogs de competidores o plataformas competidoras

### Tono
- Profesional pero approachable
- Claro y directo — sin corporate filler
- Levemente técnico, legible para workplace/facility/office teams
- Persuasivo sin exageración

### CTAs (siempre al final)
- Workplace Logistics Platform o MC landing: `https://ship.airpals.co/solutions/parcel-management`
- Same-Day blogs (dos o más ciudades): `https://airpals.co/same-day-delivery-service`
- Same-Day blogs (NYC Courier Service): `https://airpals.co/same-day-delivery-nyc-for-business`
- Adaptar copy del CTA al tema y producto del blog

---

## Internal Linking Master Lists

### Workplace Logistics blogs

| Cuando se habla de... | Link |
|----------------------|------|
| FM duties and responsibilities | Duties and Responsibilities of a Facility Manager |
| Intralogistics | Intralogistics: Definition, Benefits, and Smart Automation |
| Strategies to reduce shipping costs | Parcel Spend Management: 5 Strategies to Reduce Shipping Costs |
| FM companies | Top 6 Facilities Management Companies in the U.S. |
| Fashion Logistics | The Ultimate Guide to Fashion Logistics |
| Facility Manager Tools | Top 6 Facility Manager Tools |
| Workplace Services | 4 Workplace Services That Actually Boost Productivity |
| Mailroom Services | Top 5 Best Mailroom Services for 2026 |
| Interoffice/internal mail | How to Manage Interoffice Mail Efficiently |
| Scheduling UPS pickups | How Do You Schedule a UPS Pickup? |
| Scheduling FedEx pickups | How to Schedule a FedEx Pickup |
| Parcel Audits | What a Parcel Audit Can Reveal About Your Shipping Spend |
| Office management duties | How to Simplify Your Office Management Duties |
| CTA / Product landing page | Airpals Workplace Logistics Platform → `https://ship.airpals.co/solutions/parcel-management` |
| Contact | Contact Us |
| Guide to Workplace Management | The Complete Guide to Workplace Management |
| Laptop returns | Simplifying Laptop Returns in Remote Work (2026 Guide) |

### Same-Day Courier blogs

| Cuando se habla de... | Link |
|----------------------|------|
| Same-day delivery (general) | Same-Day Courier & Delivery Services |
| Same-day para NYC businesses | Same-day delivery for business |
| How it works | Step-by-step guide same-day deliveries Airpals |
| Messenger Services NYC | How to Use Messenger Services in NYC |
| Shipping artwork | The Complete Guide on Shipping Artwork with Airpals |
| Courier service mistakes | 9 courier service mistakes to avoid |
| How to book same-day | Same-Day NYC Shipping: Step-by-Step with Airpals |
| Why Messenger Services | Why Same-Day Messenger Services Are the Future of Work |
| Courier service Miami | Choosing the Best Courier Service in Miami |
| Courier vs Postal | What Is a Courier? Compare Courier Services vs Postal |
| Legal Courier Services | What Is a Legal Courier Service? |
| ETA | ETA Arrival Guide: Definition & Why Businesses Track It |
| Medical Delivery | What Makes Medical Delivery Services Essential |
| Medical courier apps | How to Choose the Best Medical Courier App |
| NYC Courier Service | How to Choose the Best NYC Courier Service |
| White-glove delivery | What is White Glove Delivery? |
| Cargo van delivery | The Easiest Way for NYC Businesses to Book Cargo Van Delivery |
| Tips booking courier NYC | What Businesses Should Know Before Booking A Courier in NY |
| Medical Supply Delivery | Medical Supply Delivery in Time-Critical Healthcare |
| Comparisons with Roadie | Apps Like Roadie for Same-Day Deliveries |
| Boston Courier | Boston Courier Service: A Guide to Same-Day Delivery |

---

## Idiomas
- **English (primary):** U.S. English. Default a menos que se especifique otro.
- **Spanish (secondary):** Si `Language: Spanish`, generar brief completo en español. Adaptar TOC y notas a search intent en español (keywords pueden diferir de traducción directa).

---

## Lo que Mau agrega manualmente (NO se genera)
- Links de Freepik para imágenes
- Links internos de blogs nuevos publicados después de esta fecha
- Casos reales de clientes (Mau provee el caso; Claude lo redacta)
