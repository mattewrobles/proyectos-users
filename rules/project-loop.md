# Project Loop — Goal Spec + State File

Aplica cuando se empieza una tarea grande (feature, rediseño, fase de app, campaña).

## Cuándo crear PROMPT.md

Señales de que aplica:
- "vamos a hacer [feature/fase/rediseño grande]"
- Tarea que dura más de una sesión
- Tarea con múltiples archivos o pantallas
- Cualquier cosa que requiera un plan antes de ejecutar

**Crear PROMPT.md en la raíz del proyecto antes de empezar.**
Re-leerlo al inicio de cada sesión en ese proyecto — no reconstruir contexto desde conversación.

## Cuándo crear IMPLEMENTATION_PLAN.md

Siempre que exista un PROMPT.md. Es el state file: dónde estamos, qué sigue.
Actualizar al final de cada sesión con STATUS y próximo paso.

## Estructura PROMPT.md

```markdown
# [Nombre de tarea]
**Proyecto:** [proyecto]
**Fecha inicio:** [fecha]
**Estimado:** [S / M / L / XL]

## Goal
[Qué queremos lograr — 1-3 oraciones]

## Done when
- [ ] [criterio verificable 1]
- [ ] [criterio verificable 2]

## Scope — qué toca
- [archivo / pantalla / sección]

## Never touch
- [lo que no se modifica]

## Stop if
- [condición que indica problema — escalar]

## Notas
[contexto adicional, decisiones previas, links Figma]
```

## Estructura IMPLEMENTATION_PLAN.md

```markdown
# Plan — [Nombre de tarea]
STATUS: in_progress | done | blocked

## Fases
- [x] Fase 1 — [descripción] ✓ [fecha]
- [ ] Fase 2 — [descripción]

## Sesión actual
**Última sesión:** [fecha]
**Hecho:** [qué se completó]
**Próximo:** [primer paso de la próxima sesión]

## Decisiones tomadas
- [fecha] [decisión y por qué]

## Blockers
- [si hay alguno]
```

## Reglas de uso

1. **PROMPT.md = contrato inmutable** — no editar el goal una vez empezado, solo agregar notas
2. **IMPLEMENTATION_PLAN.md = vivo** — actualizar cada sesión
3. **Re-leer ambos al inicio de sesión** antes de tocar código o Figma
4. **STATUS: done** → archivar ambos en `.claude/archive/[proyecto]/[tarea]/`
5. Si PROMPT.md no existe y la tarea es grande → crearlo antes de ejecutar (no asumir)
