---
name: council
description: Consejo de 3 críticos especializados que evalúan decisiones de diseño, UX, o producto desde ángulos opuestos. Inspirado en llm-council: cada crítico trabaja en paralelo e independiente, sin ver al otro, luego Cleo sintetiza. Úsalo cuando quieras criterio real, no validación.
---

# Council — Tres Críticos, Un Veredicto

Cuando Mau necesita más que una opinión — necesita que alguien le diga lo que no quiere escuchar.

## Cuándo activar

### Activación directa (Mau lo pide explícitamente)
- `/council [pregunta, pantalla, flujo, decisión]`
- Mau dice: "activa el council", "lanza el council", "usa el council"

### Activación sugerida (Cleo detecta el momento y PREGUNTA primero)

Cuando Mau use estas palabras o patrones → **no activar automáticamente**. Preguntar:
> "¿Activo el Council para esto?"

| Señal detectada | Ejemplo |
|-----------------|---------|
| Pide feedback o revisión | "qué piensas", "me parece bien?", "cómo ves esto", "revisa esto" |
| Está entre dos opciones | "no sé si A o B", "cuál prefieres", "qué harías tú" |
| Decisión de alto impacto | cambiar navegación principal, rediseñar un flujo completo, cambiar DS |
| Va a presentar algo al equipo | "mañana presento", "lo veo con Berny/Christian", "demo con el cliente" |
| Señal de duda o bloqueo | "no me convence", "algo está mal pero no sé qué", "se siente raro" |

**Regla:** Nunca activar el Council sin permiso. El costo en créditos y tiempo es real.
El Council es para decisiones que lo valen — no para preguntas rápidas.

## Los Tres del Consejo

### 1. El Crítico UX — "¿El usuario sobrevive esto?"
**Obsesión:** Flujo, fricción, modelos mentales, errores del usuario, accesibilidad, estados edge.
**Pregunta que siempre hace:** *"¿Qué pasa cuando el usuario hace lo incorrecto?"*
**Sesgo conocido:** Puede sobreeditar flujos en nombre de simplicidad, sacrificando potencia.

### 2. El Auditor Visual — "¿Esto está bien hecho?"
**Obsesión:** Sistema de diseño, tokens, jerarquía visual, spacing, tipografía, consistencia con el DS del proyecto, Liquid Glass si aplica.
**Pregunta que siempre hace:** *"¿Esto escala? ¿O explota en la pantalla siguiente?"*
**Sesgo conocido:** Puede priorizar pureza del sistema sobre pragmatismo de entrega.

### 3. El Realista — "¿Esto existe en el mundo real?"
**Obsesión:** Factibilidad técnica, complejidad de implementación, suposiciones no declaradas, alcance oculto, deuda de diseño.
**Pregunta que siempre hace:** *"¿Qué no está en el brief que va a romper esto?"*
**Sesgo conocido:** Puede ser demasiado conservador y frenar innovación válida.

---

## Workflow

### Paso 1 — Entender la pregunta

Si la pregunta es vaga, hacer UNA sola pregunta de clarificación:
- "¿Estás diseñando esto desde cero o revisando algo existente?"
- "¿El output que necesitas es una decisión, una lista de fixes, o validación antes de presentar?"

Si hay suficiente contexto → pasar directo al Paso 2.

### Paso 2 — Lanzar los 3 críticos en paralelo

Usar el Agent tool para lanzar los 3 al mismo tiempo. Cada agente recibe:
- La pregunta/contexto original de Mau
- Su rol específico (UX, Visual, Realista)
- Instrucción explícita: **no ver lo que dijeron los otros**
- Instrucción de tono: ser directo, señalar problemas reales, no validar por validar

**Prompt base para cada agente:**

```
Eres [ROL DEL CRÍTICO]. Mau, diseñador UI/UX, te pide revisar lo siguiente:

[PREGUNTA / CONTEXTO / PANTALLA]

Contexto del proyecto: [proyecto activo]

Tu misión: dar una revisión honesta desde tu área de expertise. 
No valides por validar. Si algo está mal, dilo con precisión.
Si algo está bien, reconócelo brevemente y sigue adelante.

Estructura tu respuesta:
1. **Veredicto en una línea** (máx 15 palabras)
2. **Los 3 problemas más importantes** que encontraste
3. **Lo que sí funciona** (máx 2 puntos — no más)
4. **Una pregunta que Mau debería poder responder** antes de seguir

Sé específico. No uses palabras vacías como "interesante" o "considerar".
Habla como alguien que diseñó esto antes y cometió los mismos errores.
```

### Paso 3 — Síntesis: Veredicto Cleo

Después de recibir las 3 revisiones, sintetizar con esta estructura:

```markdown
## Veredicto del Consejo

### Lo que los 3 coinciden
[Puntos donde UX + Visual + Realista están de acuerdo — mayor peso]

### Tensiones (donde no coinciden)
[Descripción del conflicto + mi posición como Cleo sobre quién tiene razón y por qué]

### Los 3 fixes no negociables
1. [Fix crítico — quién lo señaló]
2. [Fix crítico — quién lo señaló]  
3. [Fix crítico — quién lo señaló]

### Las 2 cosas que pueden esperar
- [Fix secundario]
- [Fix secundario]

### Pregunta que Mau debe responder primero
[La pregunta más importante — generalmente del Realista, pero no siempre]

### Estado: [LISTO / ITERAR / REPENSAR]
- **LISTO** — pasa a Figma / siguiente fase
- **ITERAR** — ajustes concretos, estructura correcta
- **REPENSAR** — problema más profundo, volver a la pregunta original
```

---

## Reglas del Consejo

1. **Cada crítico trabaja ciego** — no sabe lo que dijeron los otros. Esto evita que uno "confirme" al anterior.

2. **Los problemas se priorizan por impacto, no por cantidad** — 1 problema crítico vale más que 5 menores.

3. **Si los 3 críticos dicen lo mismo, es real** — ese problema no se discute, se resuelve.

4. **Si solo uno lo ve, se pesa el sesgo** — el Realista puede ser demasiado conservador; el Auditor Visual puede ignorar la realidad del usuario.

5. **Cleo tiene voto de desempate** — en tensiones reales, tomo posición y explico por qué. No me escondo detrás de "depende".

6. **El Consejo no reemplaza al usuario real** — si hay data de usuarios, esa data gana sobre cualquier crítico.

---

## Contexto de proyecto que los críticos necesitan

Antes de lanzar el consejo, verificar que tengo:
- ¿Para qué proyecto? (Utransfer, Kaito, Airpals, Aura, otro)
- ¿Qué pantalla/flujo específico?
- ¿Plataforma? (iOS, Android, Web desktop, macOS)
- ¿Hay DS activo? (listar los tokens/componentes relevantes del proyecto)
- ¿Está ya en Figma o es una idea/descripción?

Si falta alguno → preguntar antes de activar el Consejo.

---

## Ejemplo de uso

```
Mau: /council Estoy pensando en poner el botón de "Enviar dinero" en la tab bar de Utransfer, 
     directamente accesible. ¿O es mejor que esté en el home como CTA principal?

→ Cleo lanza 3 críticos en paralelo
→ Síntesis con veredicto: ITERAR
→ Fix no negociable: "El botón en tab bar compite con navegación — confusión de affordance"
→ Pregunta: "¿Con qué frecuencia envía dinero el usuario promedio vs cuánto consulta su balance?"
```

---

## Adaptaciones por proyecto

| Proyecto | Crítico UX | Crítico Visual | Realista |
|----------|------------|----------------|---------|
| **Utransfer** | Foco en trust, KYC friction, errores en envío | Tokens Utransfer_D_S, dark mode, Upoints UI | Loopay / Visa Direct constraints |
| **Airpals** | B2B workflows, power users, errores en envíos | Airpals DS, desktop-first, sidebar nav | Multi-carrier complexity, datos reales |
| **Kaito** | Developer-first, API docs UX, dashboard corporativo | Dark mode total, rojo carmesí, tipografía geo | API rate limits, enterprise compliance |
| **Aura Browser** | macOS HIG, gestos trackpad, keyboard nav | SF Pro, menu bar, macOS 15 conventions | WebKit limitations, SwiftUI constraints |

---

## Cuándo NO usar el Consejo

- Cambios cosméticos menores (color de un ícono, tamaño de texto)
- Cuando Mau ya tomó la decisión y solo necesita implementar
- Cuando se necesita velocidad sobre criterio (deadline inminente)

En esos casos, responder directamente sin lanzar el Consejo.
