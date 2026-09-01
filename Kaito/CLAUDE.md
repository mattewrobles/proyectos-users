# Kaito — Contexto para Claude

**Kaito** es una plataforma de Fintech-as-a-Service (FaaS). Motor transaccional para otras empresas — mueve valor, no paquetes.

- **Web:** https://www.kaito.io
- **LinkedIn:** https://www.linkedin.com/company/kaitonetworks/
- **Tagline:** *"Money, Finally, Moved like information"*
- **Métricas:** 25,000+ TPS · 99.99% uptime · 10+ países · 7+ pares de divisas

---

## Propuesta de valor

Kaito actúa como capa intermedia entre empresas y el sistema financiero. Sus clientes son empresas (bancos, fintechs, corporaciones) — no usuarios finales.

**No es una wallet. Es infraestructura.**

---

## Productos

### Kaito Konnect (API/SDK)
- API-First: empresas integran Kaito en sus propios sistemas
- Pagos cross-border, transferencias masivas, cobros
- Pagos por WhatsApp integrados
- Target: bancos, fintechs, pasarelas de pago, plataformas de crédito

### Kaito Business (Dashboard corporativo)
- Backoffice / Centro de Control Financiero
- Liquidación y conciliación automática (cruce de cuentas)
- Gestión de saldos y flujos de caja en tiempo real
- Roles y permisos de usuarios
- Monitoreo anti-fraude y compliance (KYC/AML)
- Target: corporaciones, tesorería empresarial

### Blockchain Infrastructure
- Wallets de activos digitales
- Pagos con USD digital (USDT)
- Rieles de pago propios

---

## Casos de uso del backoffice

1. **Dispersión de fondos** — pago masivo a proveedores o nóminas
2. **Recaudación** — cobros a clientes finales
3. **Conciliación** — cruce automático de entradas/salidas + comisiones
4. **Tesorería** — visualización de flujos y gestión de liquidez
5. **Compliance** — monitoreo de transacciones, KYC/AML integrado

---

## Identidad visual

- **Modo:** Dark total
- **Paleta:** Negro profundo + rojo carmesí
- **Tipografía:** Geométrica moderna
- **Tono:** Premium, institucional, B2B — similar a Stripe o Ripple

**Referente de diseño:** `design-md/stripe/DESIGN.md` del repo [awesome-design-md](https://github.com/VoltAgent/awesome-design-md)

---

## Audiencia / Clientes objetivo

| Tipo | Necesidad |
|------|-----------|
| Bancos | Integrar pagos cross-border sin infraestructura propia |
| Fintechs | Rails de pago rápidos sin construir desde cero |
| Pasarelas de pago | Interconectividad con sistema financiero global |
| Plataformas de crédito | Dispersión de créditos y recaudación de pagos |
| Corporaciones | Tesorería, gestión de liquidez, pagos internacionales |

---

## Principios de diseño Kaito

1. **Confianza primero** — dashboard siempre muestra estado de sistema, uptime, alertas
2. **Datos densos pero legibles** — tablas complejas con jerarquía visual clara
3. **Dark mode total** — nunca light mode en Kaito
4. **Feedback inmediato** — toda transacción tiene estado visible en tiempo real
5. **Sin fricciones para el operador** — el usuario de backoffice es experto, no necesita tutoriales

---

## Estado del proyecto

- Diseño activo en Figma (archivo a confirmar con Mau)
- Sin CLAUDE.md de DS todavía — agregar cuando se inicie el design system

---

## Preguntas pendientes para Mau

- ¿Cuál es el nombre del archivo Figma de Kaito?
- ¿Hay un DS o se diseña desde cero?
- ¿Qué pantallas/flujos están activos ahora?

---

## Auto-Skills — invocar según contexto

| Contexto | Skill |
|---------|-------|
| Cualquier trabajo en Figma (OBLIGATORIO antes de tocar nodos) | `figma-use` + `figma-mcp-quality` |
| Crear o editar pantallas desde el DS | `figma-generate-design` |
| Tokens, variables, DS, librería | `figma-generate-library` |
| Exportar diseño a código (React/Next.js) | `figma-design-code` |
| Diseño UI/UX: dashboard B2B, tablas, data density | `ui-ux-pro-max-intelligence` |
| Patrones frontend web (React, Next.js) | `frontend-patterns` |
| Crear reglas del DS para codebase | `figma-create-design-system-rules` |
