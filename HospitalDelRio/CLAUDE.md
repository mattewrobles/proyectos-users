# Hospital del Río — CLAUDE.md

## Contexto
Web del Hospital del Río, Cuenca Ecuador. Mayor centro médico del Austro.
**Construida en Webflow.** Ya no es propuesta — es el sitio activo.

- Webflow site ID: `6a3189b602855332320401b3`
- URL staging: https://hospital-del-rio.webflow.io/
- URL producción: https://www.hospitaldelrio.com.ec/ (WP, pendiente migración)
- Dominio custom en Webflow: no configurado aún

## Brand
```
Naranja:     #FF5A00
Azul:        #00429A
Azul oscuro: #012274
Blanco:      #FFFFFF
```

## Stack
- CMS: Webflow
- Fonts: Lato + IBM Plex Mono (Google Fonts via WebFont.js)
- Animaciones: GSAP 3.15 (ScrollTrigger + SplitText) + Lenis smooth scroll
- Template base: template comercial de Webflow (tiene artifacts de template)

## Páginas existentes
- `/` — Home
- `/nosotros` — Nosotros
- `/medicos` — Directorio médico
- `/planes` — Planes
- `/servicios` — Todos los servicios
- `/contacto` — Contacto / Reservar cita
- `/instalaciones` — Instalaciones (con subpáginas)
- `/especialidades/cardiologia` — Cardiología
- `/especialidades/gastroenterologia` — Gastroenterología
- `/unidad-integral-de-fertilidad`
- `/unidad-para-manejo-del-dolor`

## Links rotos conocidos (pendiente fix)
- `Contacto` en nav → `#`
- `Resultados` en nav → `#` (portal lab externo: hospirio.imexhs.com)
- Mega menú: Cirugía de Corazón, Electrofisiología, Hemodinamia, Imagen cardíaca,
  Rehabilitación cardíaca, Ambulancia, Emergencia, Hospitalización, Quirófano, UCI,
  Hemodiálisis, Terapia Respiratoria → todos `#`
- 3× "Ver video" → `#` (videos sin embeds configurados)
- "Mantenerme informado" newsletter → `#`

## Performance
- Lenis (smooth scroll) → CDN cambiado de unpkg → jsDelivr (fix 2026-07-29)
- GSAP carga 3 archivos sincrónicos (ScrollTrigger, SplitText) — template behavior
- WebFont.js síncrono en `<head>` — template behavior

## Reglas de trabajo
- **Siempre hacer backup** antes de cambiar Custom Code → `.claude/backups/`
- Los cambios en Webflow afectan todo el sitio si son a nivel site (no solo página)
- Webflow MCP disponible — site_id: `6a3189b602855332320401b3`
- Publicar manualmente después de cada cambio via Webflow o MCP

## Archivos del proyecto
- `CLAUDE.md` — este archivo
- `SESSION.md` — estado de sesión actual
- `investigacion.md` — research CMS original
- `.claude/backups/` — backups de custom code antes de cada cambio
- `webflow/` — scripts y notas técnicas de Webflow
