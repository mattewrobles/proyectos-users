# Auditoría pre-lanzamiento — Hospital del Río
**Proyecto:** Hospital del Río
**Fecha inicio:** 2026-08-26
**Estimado:** XL

## Goal
Auditar exhaustivamente https://hospital-del-rio.webflow.io/ antes del lanzamiento: navbar, hero, CTAs, todas las secciones home, footer, todas las páginas internas (incluida legal), y los ~250 perfiles del directorio médico. Detectar links rotos, sintaxis de link que se rompería al migrar de webflow.io al dominio real, falta de info/imágenes/redes sociales. Entregar todo en un Excel con pestañas (Bien / Mal con detalle técnico / Doctores / Links Rotos / Riesgo Migración).

## Done when
- [ ] Navbar + mega menú auditado (todos los links, sintaxis)
- [ ] Hero + CTAs home auditado
- [ ] Todas las secciones home auditadas
- [ ] Footer auditado
- [ ] Todas las páginas internas auditadas (incl. legales)
- [ ] Los ~250 perfiles de /medicos auditados uno por uno (foto, nombre, descripción, redes, links)
- [ ] Excel final generado en auditoria/hospital-del-rio-audit.xlsx con todas las pestañas

## Scope — qué toca
- Todo el sitio https://hospital-del-rio.webflow.io/ (solo lectura/navegación, NO se edita nada en Webflow)
- auditoria/ (carpeta nueva de este proyecto)

## Never touch
- El sitio en Webflow (esto es auditoría, no fix — los fixes van después, en otra tarea, con aprobación de Mau)

## Stop if
- El sitio cae / no carga
- Un doctor no tiene página individual (documentar y seguir)

## Notas
- Dominio real futuro: hospitaldelrio.com o similar (aún no confirmado) — clave revisar si hay links absolutos hardcodeados a hospital-del-rio.webflow.io que se romperían al migrar dominio.
- Playwright MCP activado scope proyecto para esta tarea.
- Reporte Excel: archivo local .xlsx, generado con Python/openpyxl al final, consolidando JSON crudo de auditoria/data/.
