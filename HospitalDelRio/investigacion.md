# Investigación CMS — Hospital del Río
_Junio 2026 · Preparado por Users Designers_

---

## Análisis del sitio actual

**URL:** https://www.hospitaldelrio.com.ec/
**Plataforma:** WordPress (estructura de CPT — Custom Post Types para directorio médico)

### Qué tiene hoy
| Sección | Estado |
|---------|--------|
| Directorio médico | +70 especialidades, ~300 doctores, 19 páginas |
| Portales externos | Laboratorio e imágenes diagnósticas (sistemas separados) |
| Blog de salud | Activo |
| Portal paciente / médico | Links a sistemas externos |
| Programas especiales | Fertilidad, Medicina Ocupacional, atención extranjeros |
| Redes sociales | Activo |
| Contacto | Teléfonos de hospitalización y consultorios |

---

## Referencia: Hospitales top del mundo

| Hospital | Plataforma | Destacado |
|----------|-----------|-----------|
| Mayo Clinic | Custom + Drupal | Búsqueda semántica, recursos educativos |
| Cleveland Clinic | Drupal | Bold design, conversion-first |
| Boston Children's | Custom React | Storytelling de pacientes |
| St. Jude | Custom | Data + humanidad |
| Mass General | Sitecore | Escala, accesibilidad, CTAs claros |

**Tendencia 2025–26:** WCAG 2.1 AA como estándar, búsqueda interna potente, directorio de médicos como feature central, mobile-first.

---

## Comparativa CMS

### 1. Webflow ← Recomendación principal

#### Precios (Sitio)
| Plan | Precio anual | Qué incluye |
|------|-------------|-------------|
| Starter | Gratis | Solo exploración |
| Basic | $15/mes | Dominio custom, 300 páginas, sin CMS |
| **Premium** | **$25/mes** | **CMS completo, 20K items, 50GB bandwidth** |
| Team | $2,500/mes | 10 seats, Localization, AEO agents |

#### Add-ons relevantes para el hospital
| Add-on | Precio |
|--------|--------|
| Editor seat adicional | $20/mes por persona |
| Viewer seat | Gratis |
| Localization Essential | $9/mes por idioma (hasta 3 idiomas) |
| Localization Advanced | $29/mes por idioma (hasta 10 idiomas, assets localizables) |

#### Costo estimado para Hospital del Río
```
Premium plan:           $25/mes
+ 1 editor seat:        $20/mes
+ Localization (ES+EN): $9/mes
────────────────────────────────
Total estimado:         ~$54/mes (~$648/año)
```

#### Por qué Webflow para el hospital
- Rol Content Editor — doctor edita solo su perfil, no puede tocar el diseño
- CMS Collections perfectas para directorio médico filtrable por especialidad
- Zero plugins = zero superficie de ataque, zero mantenimiento técnico
- CDN global incluido — velocidad automática
- Templates de hospital ya listos (HealiFlow, Dactor, etc.)
- Output visual comparable a Mayo Clinic / Cleveland Clinic
- Multiidioma nativo para pacientes extranjeros (Hospital del Río atiende extranjeros)

---

### 2. Framer ← Alternativa

#### Precios
| Plan | Precio anual | Qué incluye |
|------|-------------|-------------|
| Basic | $10/mes | Dominio custom, SEO, hosting, AI tools |
| **Pro** | **$30/mes** | Relational CMS, roles, A/B testing add-on |
| Scale | $100/mes + uso | CDN premium, soporte prioritario |
| Enterprise | Custom | — |

#### Add-ons relevantes
| Add-on | Precio |
|--------|--------|
| Editor seat adicional | $20/mes por persona |
| Content Editor (solo CMS) | $10/mes por persona |
| Locales adicionales | $20/mes por idioma (en Pro) |
| A/B testing | Add-on (precio según plan) |
| Advanced hosting | Add-on (precio según plan) |

#### Costo estimado para Hospital del Río
```
Pro plan:               $30/mes
+ 1 Content Editor:     $10/mes
+ 1 locale (inglés):    $20/mes
────────────────────────────────
Total estimado:         ~$60/mes (~$720/año)
```

#### Por qué Framer como alternativa
- On-page editing — más intuitivo que Webflow para no técnicos
- Más económico en plan base
- Diseño con animaciones excelentes por defecto
- CMS más joven — directorio de 300+ doctores puede ser fricción a futuro

---

### 3. WordPress ← Situación actual de referencia

#### Costo típico
| Ítem | Precio estimado |
|------|----------------|
| Hosting (WP Engine / Kinsta) | $30–60/mes |
| Plugins premium (directorio, SEO, seguridad, etc.) | $20–50/mes |
| Mantenimiento / actualizaciones | Variable |
| **Total real** | **~$50–110/mes** |

---

## Tabla comparativa final

| | Webflow | Framer | WordPress |
|---|---------|--------|-----------|
| **Precio base** | $25/mes | $30/mes | $15–60/mes |
| **Costo total estimado** | ~$94/mes | ~$80/mes | ~$50–110/mes |
| **Facilidad para doctores** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Directorio médico** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Diseño premium** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Seguridad (sin plugins)** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Multiidioma nativo** | ✅ ($9+/idioma) | ✅ ($20+/idioma) | ⚠️ Plugin |
| **Hosting incluido** | ✅ | ✅ | ❌ Separado |
| **Mantenimiento técnico** | Mínimo | Mínimo | Continuo |
| **Templates médicos** | Muchos | Pocos | Muchos |

---

## Prompt para la Presentación

### Contexto
- **Tipo:** Propuesta comercial — Users Designers presenta al hospital para ser contratados
- **Duración:** 5–10 min → ~10–12 slides máximo
- **Herramienta:** Google Slides / Pitch / Canva
- **Audiencia:** Directivos y doctores. Sin background técnico.
- **Recursos disponibles:** Logo del hospital (Mau lo consigue), screenshots del sitio actual

---

### PROMPT PRINCIPAL

```
Eres un consultor senior de transformación digital para instituciones de salud en Latinoamérica.
Debes crear el contenido completo de una presentación comercial ejecutiva de 10–12 slides.

La presenta la agencia "Users Designers" al Hospital del Río (Cuenca, Ecuador),
el mayor centro médico hospitalario del Austro, para ser contratados como equipo
de diseño y desarrollo web.

## AUDIENCIA
Directivos médicos y doctores del Hospital del Río.
Sin conocimiento técnico de plataformas web.
Toman decisiones en base a valor clínico y reputación institucional, no en base a tecnología.

## TONO — MUY IMPORTANTE
- Siempre propositivo: hablar de oportunidades, potencial, evolución
- NUNCA criticar el estado actual del sitio — la web actual ES la base sobre la que construimos
- Lenguaje claro, sin acrónimos ni jerga tech
- Una idea por slide — no saturar
- Analogías médicas cuando sea posible ("como un sistema de HCE, cada médico accede solo a su información")
- Profesional pero cercano — Ecuador, contexto local

## SISTEMA DE COLOR (paleta del Hospital del Río)
- Naranja #FF5A00 — acción, énfasis, datos clave
- Azul #00429A — primario, títulos, confianza
- Azul oscuro #012274 — fondos oscuros, peso, seriedad
- Blanco #FFFFFF — espacio, limpieza

## ESTRUCTURA DE 11 SLIDES

### Slide 1 — PORTADA
- Título grande: "La próxima etapa digital del Hospital del Río"
- Subtítulo: "Una propuesta de Users Designers"
- [IMAGEN: Logo Hospital del Río centrado, sobre fondo #012274]
- Fecha: Junio 2026
- [FONDO: #012274]

### Slide 2 — EL PACIENTE HOY
- Stat 1: 82% de pacientes busca su médico en internet antes de tomar una decisión
- Stat 2: 77% elige institución basándose en su presencia digital
- Stat 3: En Ecuador, búsquedas de salud en Google crecieron 40% desde 2022
- Mensaje: "El primer contacto con su hospital ya ocurre en la pantalla del teléfono"
- [VISUAL: ilustración simple de journey — Google → web → cita]
- [FONDO: #FFFFFF]

### Slide 3 — EL HOSPITAL DEL RÍO HOY
- Tono: "Una plataforma sólida con mucho por explorar"
- Lo que ya tienen funcionando:
  • Directorio médico con 70+ especialidades
  • Portal de resultados online para pacientes
  • Blog de salud activo
  • Presencia en redes sociales
- [VISUAL: screenshot del sitio actual — Homepage]
- [FONDO: #FFFFFF]

### Slide 4 — TRES OPORTUNIDADES
- "Con el equipo correcto, podemos potenciar tres aspectos clave"
- Oportunidad 1: Que el paciente encuentre al médico correcto en segundos (no en minutos)
- Oportunidad 2: Que cada doctor gestione su propio perfil sin necesitar soporte técnico
- Oportunidad 3: Que el sitio proyecte la misma excelencia que el hospital tiene adentro
- [VISUAL: 3 íconos simples, uno por oportunidad]
- [FONDO: #00429A] [TEXTO: #FFFFFF]

### Slide 5 — LO QUE HACEN LOS MEJORES HOSPITALES DEL MUNDO
- "Estos son los referentes que guían nuestra propuesta"
- Mayo Clinic: búsqueda de médicos instantánea, recursos educativos para pacientes
- Cleveland Clinic: diseño bold, cada especialidad tiene su landing propia
- Boston Children's: historias reales de pacientes — confianza + emoción
- Mensaje: "El estándar mundial es alcanzable. Y el Hospital del Río ya tiene el contenido para lograrlo."
- [VISUAL: collage de screenshots de esas webs]
- [FONDO: #FFFFFF]

### Slide 6 — NUESTRA PROPUESTA: TRES PLATAFORMAS EVALUADAS
- "Evaluamos las tres plataformas más sólidas del mercado para su contexto"
- Webflow — Recomendación principal ← destacar visualmente
- Framer — Alternativa
- WordPress — Referencia (plataforma base actual)
- [VISUAL: logos de las 3 plataformas, Webflow con badge "Recomendado"]
- [FONDO: #FFFFFF]

### Slide 7 — WEBFLOW: NUESTRA RECOMENDACIÓN
- Qué es: "Una plataforma de diseño web institucional usada por LinkedIn, TED y Canva"
- Por qué para el hospital:
  • El directorio médico vive en una base de datos real — 20,000 perfiles, filtrable por especialidad
  • Cada doctor tiene acceso solo a su perfil — no puede modificar nada más (como un HCE)
  • Sin actualizaciones manuales de sistema — el hospital no necesita IT para el sitio
  • Velocidad global: CDN incluido — carga igual en Cuenca que en Nueva York o Madrid
- [VISUAL: mockup de cómo se vería el directorio médico en Webflow]
- [FONDO: #012274] [TEXTO: #FFFFFF] [ACENTO: #FF5A00]

### Slide 8 — FRAMER: LA ALTERNATIVA
- Qué es: "La plataforma más intuitiva para editores no técnicos"
- Diferencial: edición directa en la página — un doctor hace click en su texto y lo cambia
- Excelente para: equipos donde la facilidad de uso es prioridad máxima
- Plan recomendado: Pro $30/mes + Content Editor $10/mes por persona
- [VISUAL: GIF/mockup del on-page editing de Framer]
- [FONDO: #FFFFFF]

### Slide 9 — WORDPRESS: LA BASE ACTUAL
- "La plataforma más conocida del mundo — y la que usan hoy"
- Ventajas: ecosistema enorme, miles de developers lo conocen
- El salto al siguiente nivel requiere: inversión técnica continua y especializada
- Costo real: $50–110/mes en hosting + plugins + mantenimiento técnico
- [FONDO: #FFFFFF]

### Slide 10 — COMPARATIVA
Tabla simple, 3 columnas (Webflow / Framer / WordPress), 4 filas:
| | Webflow ⭐ | Framer | WordPress |
|---|---|---|---|
| Facilidad para doctores | Muy alta | Máxima | Media |
| Directorio médico escalable | ✅ | ✅ limitado | ✅ con plugins |
| Mantenimiento técnico | Mínimo | Mínimo | Continuo |
| Inversión mensual | ~$54 | ~$60 | ~$50–110 |
- [FONDO: #FFFFFF] [HEADER: #012274 fondo, #FFFFFF texto] [ROW WEBFLOW: fondo naranja suave]

### Slide 11 — SIGUIENTE PASO
- "Estamos listos para empezar"
- Lo que hace Users Designers:
  • Diseño del nuevo sitio con la identidad del Hospital del Río
  • Migración del directorio médico completo
  • Capacitación del equipo en 1 sesión de 2 horas
  • El sitio actual no se cae durante la transición
- CTA grande: "¿Cuándo nos reunimos?"
- Datos de contacto de Users Designers
- [FONDO: #012274] [TEXTO: #FFFFFF] [CTA: #FF5A00]

## FORMATO DE ENTREGA
Para cada slide entregar:
- Título (máx 8 palabras)
- Copy de los bullets (máx 4 bullets, máx 12 palabras cada uno)
- Nota de visual recomendado [VISUAL: descripción]
- Nota de fondo [FONDO: color hex]
- Nota de tipografía [TIPO: color de texto]

Máx 30 segundos de lectura por slide.
Nunca explicar tecnología — siempre explicar el beneficio para el paciente o el médico.
```

---

## Decisiones de contexto (resueltas)

| Pregunta | Respuesta |
|----------|-----------|
| Propósito | Propuesta comercial — Users Designers presenta al hospital |
| Duración | 5–10 min (~11 slides) |
| Logo | Mau lo consigue en alta calidad |
| Fotos | Solo lo disponible en la web pública del hospital |

## Pendiente para producción

- [ ] Logo del hospital en .svg o .png transparente (Mau lo consigue)
- [ ] Screenshots del sitio actual (capturable de hospitaldelrio.com.ec)
- [ ] Mockup de directorio médico en Webflow (diseñar en Figma)
- [ ] Collage de Mayo Clinic / Cleveland Clinic / Boston Children's (screenshots)
- [ ] Datos de contacto de Users Designers para el slide de cierre

---

## Notas de diseño para la presentación

### Sistema cromático aplicado
- Fondos oscuros: `#012274` (azul oscuro del hospital)
- Títulos sobre fondo oscuro: `#FFFFFF`
- Acentos y CTAs: `#FF5A00` (naranja)
- Slides de datos/comparativa: fondo `#FFFFFF`, texto `#012274`
- Highlight de datos clave: `#FF5A00`

### Tipografía sugerida
- Títulos: **Inter Bold** o **Sora Bold** — limpio, médico, moderno
- Cuerpo: **Inter Regular**
- Nunca más de 2 fuentes

### Estilo visual
- Mucho espacio en blanco — no abarrotar slides
- Máx 1 concepto por slide
- Iconografía: línea fina, estilo médico/tech moderno
- Fotografías: doctores reales del hospital > stock photos genéricas

---

## Fuentes de investigación

- [10 Best Healthcare CMS 2025 — Webstacks](https://www.webstacks.com/blog/healthcare-content-management-system)
- [The 5 Best Healthcare CMS 2026 — Digital Elevator](https://thedigitalelevator.com/blog/best-healthcare-content-management-systems/)
- [Webflow vs WP, Wix & Framer — Healthcare](https://lightit.io/blog/webflow-vs-everything-else-why-we-only-build-healthcare-websites-one-way/)
- [Webflow Pricing May 2026](https://help.webflow.com/hc/en-us/articles/51059955082387-Updated-pricing-and-simplified-plans-for-May-2026)
- [Webflow Localization Pricing](https://www.tunel.studio/webflow-wiki/pricing/webflow-localization-pricing-and-plans)
- [Framer Pricing 2026](https://www.oma-kase.com/blog/framer-pricing-update-may-2026)
- [22 Best Hospital Website Designs — Kanopi](https://kanopi.com/blog/hospital-web-design/)
- [Hospital Templates Webflow](https://webflow.com/templates/tag/hospital-websites)
