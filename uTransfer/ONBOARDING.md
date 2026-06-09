# uTransfer — Onboarding Claude Code

Guía completa para que el equipo de diseño trabaje con Claude en uTransfer. Cubre desde el setup inicial hasta el flujo diario con Figma.

---

## ¿Cómo funciona Claude en este proyecto?

Claude Code lee automáticamente `.claude/CLAUDE.md` y todos los archivos en `.claude/Rules/` cuando trabajas en este directorio. Eso significa que Claude ya sabe:

- Qué componentes existen en `Utransfer_D_S` y sus keys exactas
- Todos los tokens de color, spacing y radius con sus IDs
- Cómo instanciar componentes correctamente (patrones, errores comunes)
- El contexto de producto, flujos y audiencia de uTransfer

**No tienes que explicarle el DS cada vez.** Solo abre Claude Code en la carpeta del proyecto y trabaja.

---

## 1. Setup — figma-cli

El figma-cli es la herramienta que conecta Claude con Figma Desktop vía accesibilidad. Sin esto no se pueden ejecutar scripts en Figma.

```bash
# Instalar en ~/Developer/Claude/figma-cli (convención del equipo)
mkdir -p ~/Developer/Claude
cd ~/Developer/Claude
git clone https://github.com/silbormueller/figma-ds-cli figma-cli
cd figma-cli
npm install
```

**Verificar que funciona:**
```bash
cd ~/Developer/Claude/figma-cli
node src/index.js connect    # conectar a Figma Desktop
node src/index.js canvas info  # debe mostrar la página activa
```

> Si ves error de conexión: abre Figma Desktop y asegúrate de tener el archivo `Utransfer v2` abierto.

---

## 2. Setup — Rules globales de Figma

Estas reglas aplican a todos los proyectos de Figma, no solo a uTransfer. Instálalas una vez.

```bash
mkdir -p ~/.claude/rules
```

Crea el archivo `~/.claude/rules/figma-master.md` con el contenido de la sección abajo, o pídele a Mau que te comparta el archivo directamente.

> **Ruta del archivo en tu máquina:** `~/.claude/rules/figma-master.md`

El contenido mínimo necesario (pedir archivo completo a Mau):
- Proceso: proponer antes de construir, no ejecutar sin permiso
- Tokens: nunca hardcodear colores ni spacing
- Auto-layout: reglas de FILL/HUG/FIXED
- Componentes: instanciar del DS, nunca recrear
- CLI: comandos y patrones base

---

## 3. Setup — Skills de Figma

Las skills le dan a Claude capacidades especializadas para trabajar en Figma. Instálalas en `~/.claude/skills/`.

```bash
mkdir -p ~/.claude/skills
```

**Skills obligatorias para trabajar en Figma con uTransfer:**

| Skill | Para qué |
|-------|---------|
| `figma-use` | Contexto base — se activa automáticamente en cualquier tarea de Figma |
| `figma-mcp-quality` | Calidad de implementación en Figma |
| `figma-generate-design` | Crear pantallas nuevas usando el DS |
| `figma-generate-library` | Trabajar con tokens, variables y librerías |
| `figma-design-code` | Exportar diseños a código (SwiftUI/React) |
| `ui-ux-pro-max-intelligence` | Buenas prácticas UI/UX: spacing, color, accesibilidad |

Pídele a Mau los archivos `.md` de cada skill. Se copian en `~/.claude/skills/<nombre-skill>.md`.

Alternativa rápida: copia todo desde la máquina de Mau:
```bash
# Desde la máquina de Mau (o compartir por Airdrop/Drive)
# Mau copia ~/.claude/skills/figma-* a un zip y te lo pasa
```

---

## 4. CLAUDE.md global (base del equipo)

Para que Claude sepa cómo comportarse en diseño (no solo en uTransfer), crea `~/.claude/CLAUDE.md` con al menos:

```markdown
# Asistente de Diseño — Users Designers

Asistente de diseño para el equipo de Users Designers (Mau, Gaby, Naho, John).
Stack: Figma, Swift, HTML/CSS/JS.

## Reglas de Figma
- Proponer antes de construir — toda tarea Figma: proponer layout/componentes, esperar OK
- No ejecutar scripts sin permiso — escribir el script, anunciar que está listo, esperar "córrelo"
- Figma siempre con DS — nunca hardcodear colores ni construir lo que existe en la librería
- Leer .claude/Rules/ds-catalog.md antes de diseñar cualquier pantalla nueva

## Auto-Skills
- Trabajo en Figma: activar `figma-use` + `figma-mcp-quality`
- Crear pantallas: activar `figma-generate-design`
- Tokens/variables: activar `figma-generate-library`
- UI/UX: activar `ui-ux-pro-max-intelligence`
```

---

## 5. Flujo de trabajo diario

### Antes de cada sesión de Figma

```bash
# 1. Abrir Figma con "Utransfer v2"
# 2. Conectar CLI
cd ~/Developer/Claude/figma-cli && node src/index.js connect

# 3. Verificar canvas activo
node src/index.js canvas info
```

### Pedir a Claude que diseñe una pantalla

```
Dame una pantalla de confirmación de envío para uTransfer.
Usa el DS Utransfer_D_S. El usuario acaba de enviar $50 a Juan García.
Página de trabajo: Pruebas.
```

Claude va a:
1. Leer `Rules/ds-catalog.md` para ver qué componentes usar
2. Proponer la estructura (layout, componentes, copy de muestra)
3. Esperar tu OK
4. Escribir el script y decirte que está listo
5. Ejecutar solo cuando digas "córrelo" / "dale"

### Página de trabajo

**Siempre trabajar en `Pruebas`.** Nunca en las páginas de producción (`Home - Operaciones`, `Onboarding - Login`, etc.).

---

## 6. Archivos de referencia — cuándo cargar cuál

| Tarea | Archivo |
|-------|---------|
| Cualquier tarea de Figma | `.claude/quick-start.md` PRIMERO |
| Diseñar pantalla nueva | `.claude/Rules/ds-catalog.md` |
| Buscar key de componente | `.claude/Rules/ds-keys.md` |
| Tokens de color | `.claude/Rules/ds-tokens.md` |
| Reglas del DS completas | `.claude/Rules/figma-design-system.md` |
| UX / flujos / producto | `.claude/Rules/product.md` |
| Scripts guardados (activos) | `.claude/Rules/scripts-activos.md` |

Para cargar un archivo en Claude:
```
Lee .claude/Rules/ds-catalog.md y dime qué componentes de navegación hay
```

O simplemente trabaja — Claude los carga automáticamente según el contexto.

---

## 7. Convenciones del equipo

- **Nunca** hardcodear colores (`fills = [{ type: 'SOLID', color: { r: 1, ... } }]`) — siempre tokens de `🧩 Tokens`
- **Nunca** crear frames custom para lo que ya existe en `Utransfer_D_S` (botones, inputs, nav, etc.)
- **Siempre** trabajar en la página `Pruebas`
- **Siempre** revisar `ds-catalog.md` antes de proponer componentes nuevos
- **FILL** solo después de `appendChild` — nunca antes
- **Semi Bold** con espacio — `{ family: 'Inter', style: 'Semi Bold' }`, no `'SemiBold'`

---

## 8. Troubleshooting

| Problema | Solución |
|---------|---------|
| CLI no conecta | `lsof -ti:3456 \| xargs kill -9 2>/dev/null; sleep 1 && node src/index.js connect` |
| Script timeout (90s) | Evitar `findAll` con lambda en árboles grandes — usar IDs directos |
| `Cannot call set_currentPage` | `await figma.setCurrentPageAsync(page)` — no `figma.currentPage =` |
| `Cannot call set_textStyleId` | `await node.setTextStyleIdAsync(id)` — no `node.textStyleId =` |
| `HUG can only be set...` | Solo usar `FILL` en instancias — nunca `HUG` |
| Basura en canvas al relanzar | Agregar `page.children.filter(n => n.name === 'X').forEach(n => n.remove())` al inicio |
| `Semi Bold` no carga | El espacio es obligatorio: `'Semi Bold'` (no `'SemiBold'`) |

---

## 9. Recursos del equipo

- **Figma archivo:** `Utransfer v2` (pedir acceso a Mau o Berny)
- **Librería:** `Utransfer_D_S` (debe aparecer automáticamente si tienes acceso al archivo)
- **figma-cli repo:** https://github.com/silbormueller/figma-ds-cli
- **Página de sandbox:** `Pruebas` en el archivo de Figma

---

## Quick reference — top 10 componentes

| Componente | Key |
|---|---|
| Status bar · Light | `222088d248a045f3d2e7df151f7d613bbda7fafd` |
| Status bar · Dark | `74f11501df265b2a4b7fdb151bb9e6086d598262` |
| Home Indicator | `e12f73d63ccef0537a22efd9a34228a9dc441bff` |
| Button Giant Primary | `15be15cfa0d8c4667e4eb8f84bf80f9919e019c9` |
| Button Giant Clear | `c4757e2398d2f767b0b188296d6efe17d15e1b9c` |
| Input Default Large | `85a6f7f74d08b5dbc46d9593345f458eca417bff` |
| Avatar Initials 64 | `806cf30500b782fe99e767c5148858538b0bdaa9` |
| Keyboard numérico | `9c1814d08f64b86d94c0280b4bc16ae550d1e1a9` |
| Toolbar Sheet · Center | `a6d218d836a442bd0aa736f59c21090e2f596f49` |
| Divider horizontal | `3b8ea15e6f8e5410181509a43c329036681099c5` |

```javascript
// Usar cualquiera con:
const comp = await figma.importComponentByKeyAsync('KEY_AQUÍ');
const inst = comp.createInstance();
parent.appendChild(inst);
inst.layoutSizingHorizontal = 'FILL'; // SIEMPRE después de appendChild
```
