# Backup HEAD custom code — antes de fix WebFont async
Fecha: 2026-07-29
Site ID: `6a3189b602855332320401b3`

## Estado original (antes del fix)
```html
<style>
* {
  -webkit-font-smoothing: antialiased;   /* For WebKit (Safari, Chrome) */
  -moz-osx-font-smoothing: grayscale;    /* For macOS Firefox */
  font-smoothing: antialiased;           /* Non-standard, fallback */
  text-rendering: optimizeLegibility;    /* Improves kerning and ligatures */
}
</style>
```

## Contexto
WebFont.js se carga desde Webflow site settings (no desde custom code).
Por eso no aparece en el custom code block de head — es generado por Webflow.
Fix aplicado: agregar la misma carga de fuentes vía CSS con display=swap,
que es no-bloqueante. Esto hace que el texto sea visible inmediatamente
con font fallback mientras cargan Lato/IBM Plex Mono.

## Para revertir
Pegar el código de "Estado original" en Site Settings → Custom Code → Head.
