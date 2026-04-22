# uTransfer — Scripts guardados: Flujo USDT-Oro

> Scripts listos para re-ejecutar en Figma CLI. Página: `Borrrador USDT-ORO`.
> Ejecutar desde: `cd /Users/mau/Developer/Claude/figma-cli`
> Path permanente: `/Users/mau/Developer/Projects/uTransfer/scripts/figma/`

```bash
node src/index.js run /Users/mau/Developer/Projects/uTransfer/scripts/figma/<script>.js
```

---

## Pantallas W1–W10 (flujo activos + préstamos)

| Pantalla | Script | Estado |
|----------|--------|--------|
| W1 · Mis Activos · Vacío | `scripts/figma/w1_mis_activos_empty.js` | ✅ nav chevron-left, sin Tab Bar |
| W2 · Mis Activos · Con Saldo | `scripts/figma/w2_mis_activos_con_saldo.js` | ✅ nav chevron-left, sin Tab Bar |
| W3 · Selector de Activo | `scripts/figma/w3_selector_activo.js` | ✅ icon swap arrow-small-left |
| W4 · Comprar USDT | `scripts/figma/w4_comprar_usdt.js` | ✅ keyboard ABSOLUTE bottom |
| W5 · Confirmar Compra | `scripts/figma/w5_confirmar_compra.js` | ✅ botones al fondo, Cancelar sin iconos |
| W6 · Compra Exitosa | `scripts/figma/w6_exito.js` | ✅ "Comprar más" sin iconos |
| W7 · Vender Activo | `scripts/figma/w7_vender_activo.js` | ✅ keyboard ABSOLUTE bottom |
| W8 · Oferta Préstamo | `scripts/figma/w8_w9_w10_prestamos.js` | ✅ "Más información" Clear |
| W9 · Confirmar Préstamo | `scripts/figma/w8_w9_w10_prestamos.js` | ✅ "Cancelar" Clear |
| W10 · Préstamo Activo | `scripts/figma/w8_w9_w10_prestamos.js` | ✅ "Ver historial" Clear |
| Home con Activos | `scripts/figma/home_con_activos.js` | ✅ clone de Home real + widget Mis Activos |

---

## Feature: Activos (USDT + Oro)

### Proveedor / Custodio
- **Tooms** — custodio de Tether (USDT) y Oro para uTransfer (integración en la app)
- Sustituye la mención de Paxos que usé en el wireframe — corregir en producción
- USDT vía Loopay (como el resto de stablecoins en uTransfer)

### Préstamos / Crédito
- Motor: **Banco Amazonas** (banco padre de uTransfer)
- Criterio: historial crediticio dentro de la app (transacciones, antigüedad, saldo)
- Feature: `Préstamo uTransfer` — crédito basado en score interno, sin buro externo

---

## Patrón de script reutilizable — recordatorios

```javascript
// ① Limpieza antes de crear
page.children.filter(n => n.name === 'Nombre Frame').forEach(n => n.remove());

// ② Spacing — SIEMPRE desde spacingIds, NUNCA px hardcoded
const spacingIds = {
  4:  'VariableID:a76ac5afaf32fc7db440de629558bd67512ab705/40006136:103',
  8:  'VariableID:c5eb1187ed05c87e0390d6245983d582fe4f8728/40006136:104',
  12: 'VariableID:6a12f53ee51dc9af1f5c95a6108169f48bef89d1/40006136:105',
  16: 'VariableID:fc630c4b3648e68ab3fc1f74a76dc49f812f7bda/40006136:106',
  20: 'VariableID:c0ea2be6cafced44153f35cd1a2e79b1d092e5b9/40006136:107',
  24: 'VariableID:12f7f87e25374c4dd6b48d3d90aadf75606fbf1b/40006136:108',
};
async function sp(px) { return await figma.variables.getVariableByIdAsync(spacingIds[px]); }

// ③ Color tokens — importar de '🧩 Tokens', NUNCA hex fijo
// ④ Componentes — importComponentByKeyAsync, NUNCA clone()
// ⑤ Text styles — importStyleByKeyAsync + setTextStyleIdAsync (async)
// ⑥ FILL después de appendChild — NUNCA antes
// ⑦ counterAxisSizingMode: solo 'FIXED' o 'AUTO' — nunca 'FILL'
// ⑧ layoutSizingVertical = 'FILL' en hijos para ocupar espacio restante
```

---

## Pantallas pendientes (próximos pasos)

Flujo W1–W10 completado ✅. Próximas iteraciones:

| Pantalla | Prioridad |
|----------|-----------|
| Home integrado con widget "Mis Activos" (versión final) | Alta |
| Refinamiento visual W4/W7 (keyboard + inputs) | Media |
