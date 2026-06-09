# proyectos-users — Claude Code para Users Designers

Repositorio central del equipo **Users Designers** para trabajar con Claude Code en diseño con Figma.

Incluye:
- Configuración de Claude por proyecto (reglas del DS, tokens, componentes, flujos)
- Skills de Figma para Claude
- Script de setup para nuevos miembros del equipo

---

## Setup inicial (una sola vez)

```bash
git clone https://github.com/mattewrobles/proyectos-users.git
cd proyectos-users
chmod +x install.sh
./install.sh
```

El script interactivo pregunta tu nombre, stack y proyectos, y configura automáticamente:
- `~/.claude/skills/` → 8 skills de Figma y UI/UX
- `~/.claude/rules/` → reglas globales de Figma
- `~/.claude/CLAUDE.md` → tu perfil personalizado

Tiempo estimado: **2 minutos**.

---

## Cómo funciona Claude en este repo

Cada proyecto tiene una carpeta `.claude/` con su `CLAUDE.md` y sus reglas específicas del DS.
Claude los carga automáticamente al abrir esa carpeta — no hay que explicarle nada.

```
proyectos-users/
├── uTransfer/                  ← proyecto uTransfer
│   └── .claude/                ← reglas del DS, tokens, keys, scripts
│       ├── CLAUDE.md           ← contexto principal del proyecto
│       ├── quick-start.md      ← cheat sheet de Figma
│       └── Rules/              ← ds-catalog, ds-keys, ds-tokens, etc.
│
├── Airpals/
│   └── .claude/
│       ├── CLAUDE.md
│       └── rules/
│
├── Claude main/
│   └── CLAUDE.md               ← CLAUDE.md base del equipo (instrucciones globales)
│
├── figma-cli/                  ← el CLI para conectar Claude con Figma Desktop
│
├── skills/                     ← 8 skills instalados por install.sh
├── rules/                      ← figma-master.md + design-resources.md
├── templates/                  ← template de CLAUDE.md para nuevos miembros
└── install.sh                  ← script de setup interactivo
```

---

## Flujo diario de trabajo

### 1. Abrir Claude Code en el proyecto

```bash
# Opción A: CLI
claude /ruta/a/uTransfer

# Opción B: abrir la carpeta directamente en la app Claude Code
```

### 2. Conectar Figma CLI (una vez por sesión)

```bash
cd ~/Developer/Claude/figma-cli && node src/index.js connect
```

> Si no tienes figma-cli instalado → ver sección **Figma CLI** más abajo.

### 3. Trabajar con Claude

```
Dame la pantalla de confirmación de envío para uTransfer.
Página de trabajo: Pruebas.
```

Claude va a:
1. Leer el DS del proyecto (tokens, componentes, keys)
2. Proponer la estructura y componentes a usar
3. Esperar tu OK
4. Escribir el script listo para correr
5. Ejecutar solo cuando digas **"córrelo"** / **"dale"**

---

## Proyectos

### uTransfer

Billetera digital con stablecoins (USDT bajo el capó, el usuario ve su moneda local).
Gamificación con Upoints — el motor de retención de la app.

**Figma:** `Utransfer v2` · Librería: `Utransfer_D_S`
**Frame mobile:** 393×852px
**Página de trabajo en Figma:** `Pruebas`

**Claude Code en uTransfer:**
```bash
claude uTransfer/
```
Claude carga automáticamente: `uTransfer/.claude/CLAUDE.md` + todos los archivos en `uTransfer/.claude/Rules/`.

**Referentes:** Revolut, Wise, Cash App

---

### Airpals

Plataforma B2B shipping para oficinas — multi-carrier, AI assistant, same-day courier.

**Figma:** archivo Airpals · Librería: `Airpals DS`
**Stack web:** Next.js + TypeScript

**Claude Code en Airpals:**
```bash
claude Airpals/
```

**Referentes:** Linear, Notion, Stripe

---

### Kaito

Rail de pagos B2B: Kaito Konnect (API para bancos/fintechs) + Kaito Business (dashboard corp).

**Referentes:** Stripe, Ripple

---

## Figma CLI — instalación

El CLI conecta Claude con Figma Desktop para ejecutar scripts de Plugin API.

```bash
mkdir -p ~/Developer/Claude && cd ~/Developer/Claude
git clone https://github.com/silbormueller/figma-ds-cli figma-cli
cd figma-cli && npm install
```

**Verificar:**
```bash
cd ~/Developer/Claude/figma-cli
node src/index.js connect     # conectar (Figma Desktop debe estar abierto)
node src/index.js canvas info # debe mostrar la página activa
```

**Comandos más usados:**

| Comando | Para qué |
|---------|---------|
| `node src/index.js connect` | Conectar a Figma Desktop |
| `node src/index.js run /tmp/script.js` | Ejecutar script |
| `node src/index.js canvas info` | Ver página activa |
| `node src/index.js verify "NODE_ID"` | Screenshot para verificar resultado |
| `node src/index.js daemon restart` | Si el CLI no responde |

---

## Convenciones del equipo

- **Nunca** hardcodear colores — siempre tokens del DS del proyecto
- **Nunca** crear frames custom si el componente existe en la librería del proyecto
- **Siempre** trabajar en la página `Pruebas` de Figma — nunca en páginas de producción
- **FILL** solo después de `appendChild` — nunca antes
- `'Semi Bold'` con espacio — no `'SemiBold'` (falla silenciosamente)
- Scripts siempre limpian nodos anteriores al inicio:
  ```javascript
  page.children.filter(n => n.name === 'Mi Frame').forEach(n => n.remove());
  ```

---

## CLAUDE.md global del equipo

`Claude main/CLAUDE.md` contiene las instrucciones base para Claude cuando trabaja con el equipo:
- Proyectos activos y contexto de cada uno
- Comportamientos críticos (proponer antes de construir, no ejecutar sin permiso)
- Principios de diseño
- Auto-Skills (qué skill activar según el contexto)
- Critique Express

---

## Troubleshooting

| Problema | Solución |
|---------|---------|
| CLI no conecta | `lsof -ti:3456 \| xargs kill -9 2>/dev/null; sleep 1 && node src/index.js connect` |
| `Cannot call set_currentPage` | `await figma.setCurrentPageAsync(page)` |
| `Cannot call set_textStyleId` | `await node.setTextStyleIdAsync(id)` |
| `HUG can only be set...` | Solo `FILL` en instancias — nunca `HUG` |
| `counterAxisSizingMode FILL` | Solo `FIXED` o `AUTO` — nunca `FILL` en counterAxis |
| Font `Semi Bold` no carga | Espacio obligatorio: `'Semi Bold'` no `'SemiBold'` |
| Timeout 90s en script | Evitar `findAll` con lambda en árboles grandes |
| Basura en canvas | Limpiar nodos por nombre al inicio del script |
