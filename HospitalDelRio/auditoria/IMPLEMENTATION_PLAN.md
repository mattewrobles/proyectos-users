# Plan — Auditoría Hospital del Río
STATUS: done (fase 1 auditoría) — fase 2 CMS: descripciones y redes confirmadas publicadas

## Fases
- [x] Fase 1 — Navbar + mega menú + sintaxis de links (riesgo migración)
- [x] Fase 2 — Hero + CTAs home
- [x] Fase 3 — Secciones home (resto)
- [x] Fase 4 — Footer
- [x] Fase 5 — Páginas internas (nosotros, planes, servicios, contacto, instalaciones+sub, cardiología, gastroenterología, fertilidad, dolor, legales)
- [x] Fase 6 — Directorio médico ~250 doctores (subagentes en paralelo por lotes de 25)
- [x] Fase 7 — Consolidación Excel (openpyxl, todas las pestañas)
- [x] Fase 8 — Entrega + resumen ejecutivo

## Sesión actual
**Última sesión:** 2026-08-26
**Hecho:** Setup — carpeta auditoria/, Playwright MCP activado, PROMPT.md + este plan creados
**Próximo:** Fase 1 — navbar

## Decisiones tomadas
- 2026-08-26: Excel local (no Google Sheets) en auditoria/
- 2026-08-26: Playwright MCP (no chrome-devtools) para navegación
- 2026-08-26: Directorio médico se corre con varios subagentes en paralelo por lotes de 25

## Blockers
(ninguno)

## Resultado final
- `hospital-del-rio-audit.xlsx` generado en esta carpeta (227 doctores, 17 páginas internas, 6 pestañas).
- 420 problemas puntuales documentados, 15 casos de contenido cruzado entre doctores (prioridad ALTA), 4 doctores con página 404.

## Fase 2 — Ajuste CMS Directorio Médico (2026-08-27)
- Piloto de 21 doctores revisado y aprobado por Mau (descripciones + redes)
- 225 doctores auditados en 11 lotes: ~68 casos de contenido prohibido detectados (Hospital Universitario / mención de otro hospital), ~30 descripciones nuevas generadas, candidatos de redes con nivel de confianza
- Excel de revisión: `revision-final-cms-doctores.xlsx`
- Vía Webflow API (token en `.claude/secrets/webflow-token.env`, colección Doctors `6a3189ba0285533232040331`):
  - 9 doctores: redes sociales aplicadas y publicadas (incl. limpieza total de Miguel Estuardo Molina Maldonado, que tenía redes de Claudio Galarza)
  - 11 doctores: campo Whatsapp 2 duplicado eliminado (mismo número que WhatsApp Link)
  - 3 doctores: WhatsApp corregido tras confirmación de Mau (Diego Maldonado Vega, Hernán Martínez Calderón sin número, Juan Pablo Valdivieso Aguirre)
  - PENDIENTE: las ~68 correcciones de descripción (quitar "Universitario"/otro hospital) todavía NO se subieron — solo están en el Excel de revisión, falta el OK de Mau para publicarlas

## Descripciones — publicadas (2026-08-27)
- 177/177 descripciones actualizadas y publicadas vía API (piloto 21 + batches 156 con propuesta ≠ null)
- Incluye las ~68 correcciones de contenido prohibido (Hospital Universitario / mención de otro hospital) y las ~30 descripciones nuevas
- STATUS: done — quedan pendientes solo las redes candidatas NO confirmadas explícitamente por Mau (regla suya: "no publicar hasta revisar los links")
