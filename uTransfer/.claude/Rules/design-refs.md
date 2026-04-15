# uTransfer — Referencias de diseño

> Cargar cuando: buscas inspiración visual, defines patrones de UI, o compares con competidores.

---

## Referente principal: Revolut

uTransfer apunta a la experiencia premium de Revolut adaptada al usuario latinoamericano.

### Patrones clave de Revolut para uTransfer

| Patrón | Detalle |
|--------|---------|
| **Botones** | Siempre pill (`Radius-full`), padding 14px 32px — nunca botones cuadrados |
| **Sin sombras** | Profundidad solo por contraste de color — no `box-shadow` decorativos |
| **Spacing base 8px** | Escala: 4, 8, 16, 24, 32, 40, 48, 80px |
| **Tipografía** | Display weight 500 (nunca bold) + body Inter |
| **Colores semánticos** | Azul (acción), teal (positivo/éxito), rojo (error/alerta) — solo en UI, no en marketing |
| **Pantallas de éxito** | Opcionales y breves — no demorar al usuario |
| **Menos pasos = mejor** | Cada pantalla extra en un flujo es fricción: eliminarla si es posible |
| **Motion** | Microinteracciones suaves al cambiar estado — no animaciones largas |

---

## DESIGN.md de referentes (para usar con Claude/v0/Cursor)

Repo: https://github.com/VoltAgent/awesome-design-md

| Referente | Uso en uTransfer |
|-----------|-----------------|
| `design-md/revolut/DESIGN.md` | UX premium, botones pill, microinteracciones |
| `design-md/wise/DESIGN.md` | Transparencia de fees, flujo de envío |
| `design-md/stripe/DESIGN.md` | Formularios de pago, estados de error |
| `design-md/coinbase/DESIGN.md` | Patrones crypto-friendly |

---

## Competidores

| App | Qué hace bien | Qué mejorar |
|-----|--------------|-------------|
| **Revolut** | UX premium, gamificación, microinteracciones | Complejo para LATAM |
| **Wise** | Transparencia total de fees, flujo de envío clarísimo | Sin gamificación |
| **Nubank** | Tono cercano, lenguaje humano, colores vibrantes | Solo Brasil |
| **Cash App** | Simplicidad extrema, gamificación ($Cashtag) | Sin cobertura LATAM |
| **Western Union** | Cobertura global | UX anticuada, caro |

---

## Principios de diseño uTransfer

1. **El usuario nunca ve "crypto"** al inicio — moneda local siempre
2. **Upoints primero** — cada pantalla puede reforzar que el usuario gana puntos
3. **Tono latino** — cercano, positivo, no corporativo
4. **Flujos cortos** — máximo 4-5 pasos para cualquier operación
5. **Accesibilidad** — contraste WCAG AA mínimo (4.5:1), touch targets ≥44px
