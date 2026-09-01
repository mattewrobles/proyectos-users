# Backup Lenis config — antes de tuning
Fecha: 2026-07-29

## Valores originales del template
```js
lerp: 0.1,
wheelMultiplier: 0.7,
```

## Valores aplicados (Opción A)
```js
lerp: 0.07,
wheelMultiplier: 1.0,
```

## Para revertir
Editar Site Settings → Custom Code → Footer y restaurar los valores originales.
Si no mejora → Opción B: borrar el bloque <script> de Lenis completo.
