# Backup Custom Code — 2026-07-29
Site ID: `6a3189b602855332320401b3`
URL: https://hospital-del-rio.webflow.io/

## HEAD custom code (sin cambios)
```html
<style>
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
</style>
```

## FOOTER custom code (original — antes de fix de performance)
```html
<script src="https://unpkg.com/lenis@1.2.3/dist/lenis.min.js"></script>
<script>
let lenis = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 0.7,
  gestureOrientation: "vertical",
  normalizeWheel: false,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
</script>
```

## Notas
- Lenis venía del template de Webflow
- unpkg.com tiene alta latencia desde Ecuador (300-600ms)
- Fix aplicado: cambiar CDN a jsDelivr (cdn.jsdelivr.net)
