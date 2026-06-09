# Airpals — Reward Modal Experiment

> Cargar cuando: se analiza el experimento del modal de descuento, se revisan datos de GA4/LogRocket, o se trabaja en la presentación de checkpoint.

---

## Qué es el experimento

Modal que aparece después de la **4ta orden** completada.
- Código: `ARP380LWXS51Y`
- Descuento: 20% en la próxima orden
- CTA: "Schedule Your Next Order"
- Objetivo: medir si el "wow moment" convierte en 5ta orden

---

## Instrumentación

| Herramienta | Detalle |
|-------------|---------|
| GTM | GTM-WVNH7KD · Version 113 activa desde 2026-05-22 |
| GA4 | Property ID `270612199` (Airpals Delivery) |
| LogRocket | App ID `tanozv/airpals-dashboard` · Segmento "Mau-demo" |
| Filtro LogRocket | Element Visible · text contains "congratulations!" |
| Dashboard local | `/Users/mau/Developer/Projects/Airpals/reports/dashboard/` → `python3 -m streamlit run app.py` → localhost:8501 |

**Nota crítica:** Los custom events de GTM (`reward_modal_viewed` etc.) NO llegan a LogRocket automáticamente. Son sistemas separados. LogRocket se filtra manualmente por texto visible.

---

## Eventos GA4 trackeados

- `reward_modal_viewed`
- `reward_modal_closed`
- `reward_code_copied`
- `reward_cta_clicked`

---

## Datos acumulados (actualizado 2026-06-03)

| Acción | Eventos | Usuarios únicos |
|--------|---------|-----------------|
| Vieron el modal | 168 | 97 |
| Cerraron el modal | 96 | 50 |
| Copiaron el código | 32 | 17 |
| CTA clicked | 1 | 1 |

**Tasa de interacción:** 19.6% · **Tasa de descarte:** 57.1% · **CTR CTA:** 0.6%

### Por semana

| Semana | Período | Vieron | Cerraron | Copiaron |
|--------|---------|--------|----------|----------|
| S1 | May 18–22 | ~27 | ~10 | ~8 |
| S2 | May 25–29 | ~90 | ~49 | ~21 |
| S3 | Jun 1–3 | 57 | 32 | 6 |

---

## Análisis sesiones LogRocket — 16 sesiones totales

### Semana 1 (May 18–21)

| U | Fecha | Plataforma | Comportamiento |
|---|-------|-----------|----------------|
| 1 | May 18 | Elmsford · Mac/Chrome | Cierra rápido tras Continuar, revisa orden |
| 2 | May 20 | NY · Win/Edge | Lee + **copia código** → revisa orden |
| 3 | May 20 | NY · Win/Chrome | ⭐ Click directo sobre texto del código (intuitivo) → no funciona → duplica orden |
| 4 | May 21 | NY · Mac/Chrome | Lee → cierra |
| 5 | May 21 | Brooklyn · Win/Edge | Se detiene → cierra → revisa orden |

### Semana 2 (May 27–28)

| U | Fecha | Plataforma | Comportamiento |
|---|-------|-----------|----------------|
| 6 | May 27 | NY · Mac/Chrome | **Copia código** → copia link tracking → código segundo plano |
| 7 | May 27 | Brooklyn · Mac/Safari | **Copia código** → copia link tracking → Track Order |
| 8 | May 27 | NY · Mac/Chrome | Lee rápido → cierra |
| 9 | May 28 | NY · Mac/Chrome | Completa orden → sale sin interacción |

### Semana 3 (May 29 + Jun 3)

| U | Fecha | Plataforma | Comportamiento |
|---|-------|-----------|----------------|
| 10 | May 29 | NY · Mac/Chrome | Cierra inmediatamente sin leer (posible spam perception) |
| 11 | May 29 | NY · Mac/Chrome | Lee + copia código → Track Order distrae → probablemente olvida el código |
| 12 | May 29 | Brooklyn · Mac/Chrome | Lee, olvida copiar, deja ventana abierta → cierra sin usar |
| 13 | May 29 | Queens · Mac/Chrome | Cierra sin leer → explora precios |
| 14 | Jun 3 | Brooklyn · Win/Chrome | ⭐⭐ **CLIPBOARD OVERWRITE:** copia código → navega → copia link tracking → sobreescribe clipboard → código perdido |
| 15 | Jun 3 | NY · Mac/Chrome | Ve modal, no interactúa |
| 16 | Jun 3 | NY · Mac/Chrome | Cierra sin leer → Track Order |

### Conversiones confirmadas
- **Semana 2:** 1 uso real (usuario anónimo)
- **Semana 3:** 2do uso real — **Futong & Friends**

---

## Hallazgos clave

1. **Track Order domina** el flujo post-compra en todas las semanas — el modal no puede competir con esa intención
2. **Código no es clickeable** — U3 tocó el texto esperando copiarlo (comportamiento intuitivo). Hoy solo funciona el ícono derecho.
3. **Clipboard overwrite (U14)** — usuario copia código → navega → copia otra cosa → código perdido silenciosamente. Bug crítico.
4. **Spam perception** — U10, U13, U16 cierran sin leer. El modal puede percibirse como interrupción no deseada.

---

## Oportunidades de mejora

| # | Tipo | Descripción |
|---|------|-------------|
| a | Ganancia rápida | Hacer toda la caja del código clickeable (no solo el ícono) |
| b | Flujo | Coordinar momento del modal — no aparece justo cuando el usuario quiere Track Order |
| c | CTA | Replantear "Schedule Next Order" → "Revisar mi orden" / "Duplicar orden" |
| d | Bug crítico | Resolver clipboard overwrite: mostrar código en pantalla de confirmación o banner persistente hasta que se use |

---

## Presentación checkpoint

**Google Slides:** `14WFwwEsBpmRHEcyHtb9NfXS-vfUeb8Wj`
**Estructura Semana 3 (14 slides):**

| # | Slide | Estado |
|---|-------|--------|
| 01 | Cover | ✅ |
| 02 | Cronograma | Agregar Resumen S3 |
| 03 | ~~Contexto~~ | Borrar |
| 04 | Tres cosas que ya sabemos | Actualizar cards 2 y 3 |
| 05 | El recorrido en cifras (GA4) | Screenshot nuevo · cambiar "Últimos 15 días" → "May 21–Jun 3" |
| 06 | Comportamiento usuarios GA4 | Screenshot dashboard actualizado |
| 07 | Cómo lo estudiamos | Quitar nota obsoleta · agregar win Futong & Friends |
| 08 | Recorrido Parte 1 (U1–U5) | ✅ Sin cambios |
| 09 | Recorrido Parte 2 (U6–U9) | Actualizar dato positivo al fondo |
| 10 | **NUEVA** Recorrido Parte 3 (U10–U16) | Crear |
| 11 | Patrones | Agregar 4to patrón clipboard overwrite · actualizar card 2 |
| 12 | Conclusiones | Reemplazar columna Semana 03 completa |
| 13 | Oportunidades | Agregar item d clipboard overwrite |
| 14 | Cierre | ✅ |

---

## Timeline

| Semana | Período | Estado |
|--------|---------|--------|
| S1 | May 18–22 | ✅ Configuración GTM + tracking |
| S2 | May 25–29 | ✅ Primer análisis · 1er uso confirmado |
| S3 | Jun 1–5 | ✅ Segundo análisis · clipboard overwrite · 2do uso |
| — | Jun 9 | Primer reporte direccional a producto |
| — | Jun 25 | Decisión: mantener / iterar / quitar modal |
