# Airpals — Contexto de producto

> Cargar cuando: discutes UX, flujos, features o estrategia del producto.

---

## El problema real que resuelve Airpals

"Only people responsible for workplace shipping-related tasks within a company understand how critical and complex it can be to move an item from A to B."

Lo que parece simple se convierte en:
- Coordinación constante con múltiples partes
- Saltar entre herramientas
- Tracking en múltiples sistemas
- Managing unexpected costs

**El usuario principal NO es un experto en shipping** — es un office manager o facilities coordinator para quien el shipping es una más de sus muchas responsabilidades.

---

## Flujos principales

### Onboarding empresa
```
Landing → Sign up empresa → Invitar equipo → Conectar carrier accounts → Conectar método de pago → Listo
```

### Flujo de envío — Multi-Carrier (nationwide)
```
Nueva shipment
  ├── Ingresar origen (dirección de oficina — guardada como default)
  ├── Ingresar destino
  ├── Ingresar peso / dimensiones
  ├── AI recomienda opciones (precio × velocidad × confiabilidad)
  │     └── Output: Best Value / Fastest / Most Reliable (con explicación)
  ├── Seleccionar carrier / servicio
  ├── Pagar o cargar a cuenta empresa
  ├── Imprimir label
  └── Programar pickup o drop-off
```

### Flujo de envío — Same-Day Courier
```
Nueva shipment urgente
  ├── Ingresar origen + destino (dentro de ciudad)
  ├── Tipo de orden (standard, van, truck, multi-stop)
  ├── Ver disponibilidad + precio
  ├── Confirmar
  ├── Courier asignado — pickup en < 1h
  └── Tracking en tiempo real
```

### Airpals Concierge (same-day en otras ciudades)
```
Nueva shipment local en ciudad fuera de NYC
  ├── Seleccionar ciudad (100+ disponibles)
  ├── Ingresar detalles del envío
  ├── Airpals coordina courier local
  └── Tracking unificado en el mismo dashboard
```

### Dashboard principal
```
Overview
  ├── KPIs (gasto del mes, envíos activos, envíos completados)
  ├── Envíos activos (en tránsito — con status)
  ├── Envíos recientes
  ├── Quick action: Nueva shipment (siempre visible)
  └── Notificaciones de tracking
```

### Administración
```
Settings
  ├── Usuarios del equipo (invitar, roles, permisos)
  ├── Direcciones guardadas (oficinas, locations)
  ├── Carrier accounts (conectar FedEx/UPS propios)
  ├── Método de pago / facturación centralizada
  ├── Cost centers / departamentos
  ├── Shipping policies (reglas automáticas)
  └── Integraciones (Slack, Shopify, QuickBooks)
```

---

## AI Shipping Assistant — cómo funciona

El AI analiza:
- **Peso y dimensiones** → filtra carriers compatibles
- **Destino y distancia** → calcula opciones disponibles
- **Urgencia / delivery date** → ordena por velocidad
- **Historial de la empresa** → aprende preferencias
- **Precio vs. confiabilidad** → score de cada opción

**Output:** 3 recomendaciones (Best Value / Fastest / Most Reliable) con explicación breve del por qué.

**También puede:**
- Extraer detalles de shipment desde mensajes o forms
- Estandarizar workflows internos
- Hacer enforcement de políticas de shipping

---

## Use Cases principales

| Use Case | Descripción |
|----------|-------------|
| Inter-office shipping | Mover equipment entre offices de la empresa |
| Corporate gift distribution | Envíos masivos a clientes o empleados |
| Event material logistics | Materiales para eventos, ferias, activaciones |
| Influencer / partner shipments | PR packages, muestras de producto |
| Remote employee equipment | Enviar laptops, monitors a empleados remotos |
| Office supplies exchange | Supplies entre locations |
| Product development materials | Samples, prototypes entre teams |

---

## Same-Day Courier — Detalles

**NYC (principal revenue):**
- Coverage completa: Manhattan, Brooklyn, Queens, Bronx, Staten Island
- Tipos de orden: standard, van order, truck order, multi-stop
- Pickup en < 1h
- Tracking en tiempo real

**Airpals Concierge (nationwide):**
- 100+ US cities: Miami, Boston, San Francisco, y más
- Usa couriers locales coordinados por Airpals
- Para empresas con branches en múltiples ciudades
- Sin necesidad de gestionar vendors ciudad por ciudad

---

## Multi-Carrier — Detalles

**Carriers:** FedEx, UPS, USPS

**Funcionalidades:**
- Carrier rate comparison (comparar y filtrar)
- Shipping label creation (crear, comprar, print)
- Carrier account integration (conectar cuentas propias con tarifas negociadas)
- Nationwide shipping management

> ⚠️ SIEMPRE decir "carrier" — NUNCA "courier" cuando se habla de multi-carrier

---

## Métricas de éxito del producto

| Métrica | Por qué importa |
|---------|----------------|
| Shipments per active company/month | Engagement y retención |
| % shipments con AI recommendation aceptada | Confianza en el AI |
| NPS de office admins | Satisfacción del usuario principal |
| Churn de empresas | Retención B2B |
| Average order value | Revenue por transacción |

---

## Competidores directos

| Producto | Fortaleza | Debilidad |
|----------|-----------|-----------|
| **Shippo** | API developers, e-commerce | No B2B workplace-first, sin same-day |
| **EasyPost** | API muy completo | Solo para devs, no para usuarios finales |
| **Stamps.com** | Conocido, USPS-first | UX anticuado, sin AI |
| **Pirateship** | Muy barato (USPS) | Solo USPS, sin multi-carrier premium |
| **Lalamove** | Same-day muy bueno | Solo courier local, sin long-distance |

---

## Integraciones (roadmap)

| Integración | Valor |
|-------------|-------|
| Slack | Notificaciones de tracking sin salir de Slack |
| Shopify | Comerciantes con oficina como fulfillment center |
| QuickBooks / NetSuite | Reconciliación automática de gastos de shipping |
| Google Workspace | Login corporativo, directorio de empleados |
