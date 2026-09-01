# Web Project Assets — Estructura estándar

Todo proyecto web debe tener sus assets organizados en `public/` con esta estructura antes de empezar a construir:

```
public/
├── about/       ← imágenes de la sección "about" / "quiénes somos"
├── brand/       ← assets de marca (paleta, guidelines, identidad visual)
├── covers/      ← portadas, banners, OG images, hero backgrounds
├── fonts/       ← tipografías web (.woff2, .woff) si se hospedan localmente
├── fotos/       ← fotografías reales del cliente, equipo, producto, lugar
├── logos/       ← logo en todas las variantes (SVG, PNG, dark/light, icon)
├── people/      ← fotos de personas (equipo, doctor, fundadores, testimonios)
└── proyectos/   ← fotos de proyectos, portafolio, casos de estudio
```

## Reglas

1. **Crear ANTES de pedir assets** — la carpeta existe desde el inicio, se llena progresivamente
2. **SVG siempre para logos** — nunca usar PNG rasterizado para logos si hay alternativa
3. **fotos/ vs people/** — `fotos/` es contexto/ambiente, `people/` es personas identificables
4. **covers/** incluye: hero images, OG images (1200×630), banners de redes
5. **brand/** incluye: colores (tokens.json o tokens.css), tipografía en uso, guía de uso si existe
6. **fonts/** solo si se hospedan localmente — si viene de Google Fonts u otro CDN, no crear

## Cuándo aplicar

Al iniciar cualquier proyecto web nuevo o al retomar uno existente sin esta estructura.
Aplicar aunque el cliente aún no haya mandado los assets — crear las carpetas vacías y documentar
qué falta en SESSION.md o en un `public/ASSETS.md`.

## ASSETS.md (opcional pero recomendado)

Si hay assets pendientes del cliente, crear `public/ASSETS.md`:

```markdown
# Assets pendientes — [Proyecto]

## Urgente (bloquea construcción)
- [ ] Logo en SVG
- [ ] Foto profesional del doctor/fundador

## Necesario (antes de publicar)
- [ ] Fotos del consultorio/local
- [ ] OG image (1200×630)

## Deseable
- [ ] Video de presentación
- [ ] Más testimonios con foto
```
