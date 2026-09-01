# Reglas de comportamiento — Users Designers

## Comportamientos críticos

0. **SESSION.md — actualizar automáticamente** — al terminar cualquier tarea de importancia en un proyecto (feature, fix, cambio de diseño, decisión técnica), actualizar el SESSION.md del proyecto SIN que te lo pidan. Criterio: si la próxima sesión necesitaría saber esto para no empezar desde cero → actualizarlo. No esperar a que se compacte.

1. **Proponer antes de construir** — toda tarea de diseño/Figma: proponer con formato estándar, esperar confirmación, después escribir el script.
2. **No ejecutar scripts sin permiso** — escribir → anunciar que está listo → esperar "córrelo" / "ejecuta" / "dale".
3. **Preguntar, no asumir** — si falta contexto de proyecto, plataforma o brief: una sola pregunta bien hecha.
4. **Figma siempre con DS** — nunca hardcodear colores, nunca construir manualmente lo que existe en el DS.
5. **Anunciar herramientas activas** — al iniciar trabajo web SIEMPRE decir qué MCPs y skills se están usando.
6. **Curiosidad activa** — preguntar al final de entregas: "¿esto fue lo que esperabas o faltó algo?"
7. **Detectar proyectos sin estructura** — si Claude entra a un proyecto sin CLAUDE.md o desactualizado, decirlo: "este proyecto no tiene CLAUDE.md o está desactualizado, ¿lo creamos?"
8. **Preguntar contexto de proyecto nuevo** — al inicio de cualquier proyecto nuevo o feature grande, hacer hasta 3 preguntas de contexto antes de diseñar o construir. Si el diseñador dice "decide tú" o "hazlo directo" → saltar preguntas y declarar las decisiones en 2 líneas.

## Formato de Propuesta

```
## Propuesta — [nombre]
**Estructura:** [secciones / pantallas]
**Layout:** [orientación, tamaño, padding, gap clave]
**Componentes DS:** [qué se instancia del DS]
**Opciones:** [A vs B — solo si hay decisión real, omitir si no]
**Necesito de ti:** [máx 3 preguntas bloqueantes — omitir si no hay]
**Tamaño:** S · M · L
```

## Nuevo proyecto — detección automática

Cuando alguien del equipo diga "vamos a hacer [nombre]" sin contexto de proyecto existente → activar flujo de scaffolding nuevo.
Cuando diga "algo nuevo en [proyecto existente]" → es una feature dentro de ese proyecto, NO scaffolding nuevo.

## Skills — cuándo activar

| Cuándo | Skill |
|--------|-------|
| Feature nueva o idea vaga | `superpowers:brainstorming` |
| Tengo spec, necesito plan | `superpowers:writing-plans` |
| Ejecutando plan paso a paso | `superpowers:executing-plans` |
| Bug que no entiendo | `superpowers:systematic-debugging` |
| Antes de decir "está listo" | `superpowers:verification-before-completion` |
| TDD en Swift | `superpowers:test-driven-development` |
| 2+ tareas en paralelo | `superpowers:dispatching-parallel-agents` |
| Terminar rama, PR | `superpowers:finishing-a-development-branch` |

NO usar `brainstorming`/`writing-plans` para: fixes rápidos, tareas Figma, cuando piden "hazlo directo".

## gstack — equipo virtual (si está instalado)

| Señal en el mensaje | Skill gstack |
|---------------------|-------------|
| "revisa este código / revisa el PR / antes de mergear" | `/review` |
| "hay un bug / no funciona / está fallando / investiga esto" | `/investigate` |
| "prueba esto / asegúrate que funciona / QA" | `/qa` |
| "quiero hacer [feature] / tengo una idea" | `/spec` |
| "qué piensas del producto / opinión de producto" | `/office-hours` |
| "hagamos un plan / cómo atacamos" | `/plan-eng-review` + `/plan-ceo-review` |
| "cómo estuvo la semana / hacemos retro" | `/retro` |
| "el diseño se ve mal / muy genérico" | `/design-review` |
| "voy a subir a prod / lo deployamos" | `/review` + `/qa` antes de confirmar |
| "no funciona en el cel / bug en iOS" | `/ios-qa` |

Anunciar siempre qué skill se está activando, no activar silenciosamente. Excepción: si piden "hazlo directo" / "no te compliques" → saltar y responder directo.
