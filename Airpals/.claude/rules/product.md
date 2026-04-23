# Airpals — Contexto de producto

> Cargar cuando: discutes UX, flujos, features o estrategia del producto.

---

## Flujos principales (inferidos — confirmar con Mau)

### Onboarding empresa
```
Landing → Sign up empresa → Invitar equipo → Conectar método de pago → Listo
```

### Flujo de envío (core)
```
Nueva shipment
  ├── Ingresar origen (dirección de oficina — guardada)
  ├── Ingresar destino
  ├── Ingresar peso / dimensiones
  ├── AI recomienda opciones (precio × velocidad × confiabilidad)
  ├── Seleccionar carrier / servicio
  ├── Pagar o cargar a cuenta empresa
  ├── Imprimir label
  └── Programar pickup o drop-off
```

### Dashboard principal
```
Overview
  ├── Envíos activos (en tránsito)
  ├── Envíos recientes
  ├── Gasto del mes
  ├── Quick action: Nueva shipment
  └── Notificaciones de tracking
```

### Administración
```
Settings
  ├── Usuarios del equipo (invitar, roles)
  ├── Direcciones guardadas
  ├── Método de pago / facturación
  ├── Cost centers / departamentos
  └── Integraciones
```

---

## AI Shipping Assistant — cómo funciona

El AI analiza:
- **Peso y dimensiones** → filtra carriers que pueden manejar el paquete
- **Destino y distancia** → calcula opciones disponibles
- **Urgencia / delivery date** → ordena por velocidad
- **Historial de la empresa** → aprende preferencias (siempre UPS para paquetes < 5lbs, etc.)
- **Precio vs. confiabilidad** → score de cada opción

**Output:** 3 recomendaciones ordenadas (Best Value / Fastest / Most Reliable) con explicación breve de por qué.

---

## Same-day courier

- Solo disponible en ciudades con cobertura (NYC actualmente confirmado)
- Para envíos urgentes dentro de la ciudad
- Mensajero en bicicleta / moto — pickup en < 1h
- Tracking en tiempo real con mapa

---

## Métricas de éxito del producto

| Métrica | Por qué importa |
|---------|----------------|
| Shipments per active company/month | Engagement y retención |
| % de shipments con AI recommendation aceptada | Confianza en el AI |
| NPS de office admins | Satisfacción del usuario principal |
| Churn de empresas | Retención B2B |
| Average order value | Revenue por transacción |

---

## Competidores directos

| Producto | Fortaleza | Debilidad |
|----------|-----------|-----------|
| **Shippo** | API developers, e-commerce | No B2B-first, sin same-day |
| **EasyPost** | API muy completo | Solo para devs, no para usuarios finales |
| **Stamps.com** | Conocido, USPS-first | UX anticuado, sin AI |
| **Pirateship** | Muy barato (USPS) | Solo USPS, sin multi-carrier premium |
| **Lalamove** | Same-day muy bueno | Solo courier local, sin long-distance |

---

## Integraciones prioritarias (roadmap)

| Integración | Valor |
|-------------|-------|
| Slack | Notificaciones de tracking sin salir de Slack |
| Shopify | Comerciantes que usan oficina como fulfillment center |
| QuickBooks / NetSuite | Reconciliación automática de gastos de shipping |
| Google Workspace | Login corporativo, directorio de empleados |
