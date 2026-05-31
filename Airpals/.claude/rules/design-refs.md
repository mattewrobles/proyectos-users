# Airpals — Referencias de diseño

> Cargar cuando: buscas inspiración visual, defines componentes de UI, o propones patrones de diseño.

---

## Referentes principales

Airpals es B2B dashboard + shipping UX. Los referentes son tools de productividad y logistics, no apps consumer.

### Linear — para el dashboard core
**Por qué:** El estándar actual de B2B SaaS con alta densidad de información. Limpio, rápido, poder en la UI sin overwhelm.

| Patrón | Detalle |
|--------|---------|
| **Tablas** | Dense pero legibles — padding preciso, hover states sutiles |
| **Sidebar navigation** | Iconos + labels, secciones colapsables |
| **Command palette** | `Cmd+K` para acciones rápidas — muy útil para office admins |
| **Status badges** | Colores semánticos: verde/amarillo/rojo/gris para estados de envío |
| **Empty states** | Ilustración pequeña + CTA claro — no dejar el usuario perdido |

### Notion — para onboarding y settings
**Por qué:** La estructura de settings multi-nivel de Notion (workspace / members / billing) es un buen modelo para la admin section de Airpals.

### Stripe Dashboard — para facturación y reportes
**Por qué:** El mejor ejemplo de visualización de data financiera en B2B. Gráficos limpios, filtros intuitivos, export fácil.

| Patrón | Detalle |
|--------|---------|
| **Overview cards** | KPIs arriba (gasto total, envíos activos, etc.) |
| **Time range picker** | Rápido de usar, presets claros (7d / 30d / 3m / custom) |
| **Data tables** | Ordenar, filtrar, buscar — ciudadanos de primera clase |

### Loom / Vercel — para onboarding B2B
**Por qué:** Onboarding de empresa rápido, sin fricciones. Invitar equipo en 2 clicks. Sentirse "listo en minutos".

---

## Patrones de UX para shipping dashboards

| Patrón | Cómo aplicar |
|--------|-------------|
| **Quick create** | Botón "New Shipment" siempre visible (nav o floating) |
| **Shipment status timeline** | Estados del paquete en timeline vertical: Created → Pickup → In transit → Delivered |
| **Smart defaults** | Dirección de origen = oficina guardada por defecto. No pedir lo mismo dos veces. |
| **Price comparison** | Tabla de opciones con precio, tiempo y confiabilidad — como Google Flights |
| **Label printing** | Botón de imprimir prominente, soporte para PDF y zebra printers |
| **Bulk actions** | Seleccionar varios envíos → aplicar acción (exportar, asignar a dept., etc.) |
| **Notification inbox** | Centro de notificaciones de tracking — un lugar para todo |

---

## Design system de referencia

Cuando se defina el DS de Airpals, basar en:
- **Primitivos:** Escala 8px base, paleta azul navy + sky blue + neutros
- **Componentes:** Tablas, cards de shipment, badges de status, forms de dirección
- **Iconografía:** Lucide icons o Phosphor — stroke weight consistente
- **Tipografía:** Inter (legibilidad en dashboards) o Geist (moderna, Vercel-like)

---

## DESIGN.md de referentes (repo awesome-design-md)

```
design-md/stripe/DESIGN.md    → dashboard financiero, tablas, reportes
design-md/linear/DESIGN.md    → B2B SaaS productividad, dense UI
design-md/vercel/DESIGN.md    → onboarding técnico limpio
design-md/notion/DESIGN.md    → settings y estructura de workspace
```

---

## Paleta de colores propuesta (pendiente validar con Mau)

| Uso | Color sugerido | Por qué |
|-----|---------------|---------|
| Primary / brand | `#1B3A6B` (navy) | Confianza, B2B, premium |
| Primary light | `#2563EB` (blue-600) | CTAs, links, acciones |
| Success / delivered | `#16A34A` (green-600) | Paquete entregado |
| Warning / in transit | `#D97706` (amber-600) | En camino, atención |
| Error / failed | `#DC2626` (red-600) | Entrega fallida |
| Neutral bg | `#F9FAFB` (gray-50) | Background de dashboard |
| Text primary | `#111827` (gray-900) | Texto principal |
| Text secondary | `#6B7280` (gray-500) | Labels, metadatos |
| Borders | `#E5E7EB` (gray-200) | Separadores, tablas |

> ⚠️ Colores propuestos basados en análisis visual del sitio web. Confirmar con Mau cuando comparta Figma o brand guidelines.
