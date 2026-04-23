# Airpals — Contexto para Cleo

**Airpals** es una plataforma B2B de shipping inteligente para oficinas y empresas. Simplifica el envío de paquetes combinando múltiples carriers (USPS, UPS, FedEx) con un asistente IA que recomienda la mejor opción según peso, urgencia y presupuesto.

- **Web:** https://airpals.co
- **LinkedIn:** https://www.linkedin.com/company/airpals/
- **HQ:** Brooklyn, New York
- **Stack web:** Next.js (detectado en análisis de sitio)
- **Estado:** Producto activo, 1,000+ clientes empresariales

---

## Qué es Airpals

Airpals resuelve el caos del shipping en oficinas: empleados que necesitan enviar paquetes sin saber cuál carrier elegir, sin cuenta corporativa, sin visibilidad de costos. La plataforma lo unifica todo.

**Tagline:** *"The smartest way to ship from your office"*

### Propuesta de valor

| Para quién | Qué resuelve |
|-----------|-------------|
| Office managers / admins | Un solo dashboard para todos los envíos del equipo |
| Empresas con envíos frecuentes | Tarifas negociadas con carriers, sin mínimos |
| Startups y scaleups | Shipping profesional sin infraestructura propia |
| Empleados | No necesitan cuenta personal en FedEx/UPS — todo por la app |

---

## Productos y features

### Core: Shipping Platform
- **Multi-carrier** — USPS, UPS, FedEx en una sola interfaz
- **AI Shipping Assistant** — recomienda carrier + servicio según precio, velocidad y confiabilidad
- **Same-day courier** — mensajería local el mismo día (NYC área)
- **Pickup scheduling** — el carrier llega a la oficina a recoger
- **Tracking unificado** — todos los envíos en un solo lugar
- **Labels instantáneos** — imprimir etiquetas en segundos

### Management
- **Dashboard corporativo** — historial, costos, reportes por departamento
- **Multi-user** — varios empleados bajo una cuenta empresa
- **Facturación centralizada** — una sola factura para todos los envíos del equipo
- **Cost allocation** — asignar envíos por proyecto, cliente o departamento
- **Automations** — reglas de envío automáticas (si peso > X kg → usar UPS Ground)

### Integraciones (futuras / en roadmap)
- Slack — notificaciones de tracking
- Shopify — envíos de e-commerce
- NetSuite / QuickBooks — reconciliación contable

---

## Clientes y mercado

**Clientes conocidos:** WeWork, Spotify, Meta, Reddit, Figma, y 1,000+ empresas más.

**Segmento objetivo:**
- Empresas con oficina física en áreas urbanas (NYC, LA, Chicago, etc.)
- Equipos de 10-500 personas
- Empresas que gastan $500-$50,000/mes en shipping

**Diferenciadores vs. competitors:**
| vs. | Diferencia |
|-----|-----------|
| FedEx/UPS directo | Mejor UX, AI recommendations, multi-carrier |
| Stamps.com | B2B-first, team management, courier same-day |
| Shippo/EasyPost | Para empresas, no e-commerce. Dashboard corporativo. |
| Courier apps (Lalamove, Dunzo) | Multi-carrier + long distance, no solo local |

---

## Identidad visual (inferida del sitio)

- **Primario:** Azul marino / navy — confianza, corporativo
- **Acento:** Azul cielo / azul brillante
- **Neutros:** Blancos y grises claros — limpieza, espacio
- **Tipografía:** Sans-serif moderna (estilo Söhne o Inter)
- **Estilo:** Limpio, profesional, startup NY. Nada de iconografía stock barata. Similar a Linear o Notion en tono visual.
- **Modo:** Light mode principal (B2B professional)

> ⚠️ **Pendiente:** Mau debe confirmar brand colors exactos, tipografía, y compartir acceso a Figma cuando esté disponible.

---

## Plataformas / Superficies

| Superficie | Estado |
|-----------|--------|
| **Web App (dashboard)** | Principal — multi-carrier management, reportes |
| **Web marketing (airpals.co)** | Activo — Next.js |
| **Mobile** | No confirmado — posible en roadmap |

---

## Equipo Users Designers en Airpals

| Persona | Rol |
|---------|-----|
| Mau | Diseñador UI/UX |
| Gaby | Diseñadora UI/UX |

**Estado del proyecto:** Inicio — no hay Figma aún. Comenzando con análisis, estructura y definición.

---

## Recursos de referencia

> Ver `rules/design-refs.md` para competidores y design systems de referencia.
> Ver `rules/product.md` para flujos y features en detalle.

---

## Reglas para trabajar en Airpals

1. **Plataforma B2B** — no es fintech consumer. Tono: profesional pero no corporativo frío. Directo, eficiente.
2. **Desktop-first** — el dashboard es principalmente web desktop. Mobile es secundario.
3. **Density-friendly** — los usuarios son office admins que manejan muchos envíos. Tablas, listas, filtros son ciudadanos de primera clase.
4. **AI is a feature, not a gimmick** — las recomendaciones del AI deben ser visibles, explicadas y confiables. No solo "el AI decidió".
5. **No hay DS todavía** — cuando Mau comparta Figma, hacer auditoría DS antes de diseñar. Hasta entonces, proponer basado en referentes.

---

## Auto-Skills — invocar según contexto

| Contexto | Skill |
|---------|-------|
| Cualquier trabajo en Figma (OBLIGATORIO antes de tocar nodos) | `figma-use` + `figma-mcp-quality` |
| Crear o editar pantallas / dashboard | `figma-generate-design` |
| Diseño UI/UX: B2B dashboard, tablas, shipping UX | `ui-ux-pro-max-intelligence` |
| Tokens, variables, DS (cuando haya Figma) | `figma-generate-library` |
| Exportar diseño a código (Next.js / React) | `figma-design-code` |
| Patrones frontend web (Next.js, React) | `frontend-patterns` |
