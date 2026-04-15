# uTransfer — Contexto de producto

> Cargar cuando: discutes UX, flujos, features o estrategia del producto.

---

## Propuesta de valor

Usa USDT/stablecoins internamente — el usuario **siempre ve su moneda local**. No sabe que hay crypto de fondo. Educación progresiva hacia stablecoins. Objetivo: quitar fricción de adopción crypto para el latinoamericano promedio.

- **Web:** https://www.utransfer.app/
- **Estado:** Beta · waitlist activa en `/utesters`
- **Entidad:** Innovation & Technology Services ITS-LLC, Puerto Rico
- **Cobertura:** 70+ países

---

## Features

| Feature | Descripción |
|---------|-------------|
| Wallet | Creación, depósito |
| Envío uTransfer | Entre wallets uTransfer (Loopay internamente) |
| Envío PayPay | A wallets externas |
| Visa Direct | Envío por tarjeta, local e internacional |
| Solicitar dinero | Nacional e internacional, con Visa |
| Conversor de moneda | Tasas en tiempo real |
| Pagos de servicios | Netflix, Spotify, servicios básicos |
| Retirar dinero | A cuenta bancaria |
| **Upoints** | **Core del negocio:** puntos por transacciones → canjeables en giftcards / tiendas |
| Juegos | Para ganar Upoints |
| Gift cards | Amazon, Netflix, Starbucks y más |
| Referidos | Sistema de referidos |
| Notificaciones | Push + email (templates diseñados) |

---

## Modelo de negocio — Upoints es el core

- Usuario gana puntos por transacciones y por jugar
- Canjea en giftcards o saldo en wallet
- Motor de retención y uso frecuente
- La gamificación convierte la app en un hábito

---

## Audiencia

- **Migrantes / remesas** — envío a familia en otro país
- **Latinos 18-40** — digitalmente activos (TikTok, Instagram)
- **Usuarios de streaming** — pagar Netflix/Spotify a tasa real
- **Personas que quieren más de su dinero** — rewards, lifestyle

**Tono:** Cercano, segunda persona ("tú", "tu dinero"), positivo, energía latina. Nunca bancario, nunca frío.

---

## Flujos diseñados

```
Onboarding
  ├── Login primera vez
  ├── Inicio rápido (biometría)
  ├── Sign up
  ├── Reset password
  └── KYC (Trulioo)

Home - Operaciones
  ├── Home menú principal
  ├── Enviar Billetera (Loopay)
  ├── Recibir / Solicitar
  ├── Envío local Nacional - Visa Direct
  ├── Envío internacional - Visa Direct
  ├── Solicitar Internacional / Nacional
  ├── Depositar / Retirar
  ├── Agregar tarjeta
  ├── Conversor de moneda
  ├── Notificaciones
  └── Ajustes (privacidad, idioma, referidos, cerrar sesión)

Juegos
  ├── UPoints / Canje
  ├── Sala de juegos
  └── Gift cards

Mails
  └── Bienvenida, solicitud de dinero, etc.
```

---

## Páginas en Figma `Utransfer v2`

| Página | Contenido |
|--------|-----------|
| 🫆 Onboarding - Login | Login, Sign up, KYC, Reset password |
| 🏠 Home - Operaciones | Home, envíos, depósito, ajustes |
| 📫 Mails | Templates de email |
| 🤖 Juegos | Upoints, juegos, gift cards |
| 📲 Flow | User flows / diagramas |
| 📥 Borrador | WIP |
| 🎯 Benckmark | Referencias de competidores |
| Pruebas | Sandbox de pruebas (página activa de trabajo) |

---

## Equipo

| Persona | Rol |
|---------|-----|
| Mau | Diseñador UI/UX |
| Gaby | Diseñadora UI/UX |
| Naho | Diseñadora UI/UX |
| John | Diseñador UI/UX |
| Berny | Project Manager |
| Christian | Project Manager |

---

## Tecnología

- **KYC:** Trulioo
- **Pagos:** Loopay (USDT), Visa Direct
- **Infraestructura:** PostgreSQL + OVH Cloud
- **Seguridad:** AES-256
- **Soporte:** WhatsApp, Instagram, Facebook, TikTok
