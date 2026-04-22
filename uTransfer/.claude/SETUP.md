# Utransfer — Setup de Claude Code para el equipo

## Qué incluye este repo

La carpeta `.claude/` ya está en el repositorio. Cuando clonas, tienes:
- `CLAUDE.md` — reglas del proyecto y DS
- `quick-start.md` — cheat sheet de Figma (cargar primero)
- `Rules/` — tokens, keys, componentes, scripts, producto

Claude Code los carga automáticamente al trabajar en este directorio.

---

## Setup inicial (hacer una vez)

### 1. Instalar Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

### 2. Instalar figma-cli

Convención del equipo: instalar en `~/Developer/Claude/figma-cli`

```bash
mkdir -p ~/Developer/Claude
cd ~/Developer/Claude
git clone https://github.com/silbormueller/figma-ds-cli figma-cli
cd figma-cli
npm install
```

Si prefieres otro path, ajusta la línea en `CLAUDE.md`:
```
**Figma CLI:** `/tu/path/figma-cli`
```

### 3. Clonar el repo

```bash
git clone <repo-url>
cd uTransfer
```

Las reglas de Claude ya están en `.claude/`. No hay nada más que configurar.

### 4. (Opcional) Configurar tu CLAUDE.md global

Copia el template de Mau como base para `~/.claude/CLAUDE.md`:
- Cambia los paths a los de tu máquina
- Ajusta tu nombre en la sección de identidad
- El proyecto-level CLAUDE.md ya tiene todo lo necesario para Figma

---

## Flujo de trabajo con Figma

```bash
# 1. Abrir Figma con el archivo "Utransfer v2"
# 2. Conectar CLI
cd ~/Developer/Claude/figma-cli && node src/index.js connect

# 3. Verificar canvas
node src/index.js canvas info

# 4. Correr scripts
node src/index.js run /tmp/mi_script.js
```

**Página de trabajo:** `Pruebas` — siempre trabajar aquí, no en páginas de producción.

---

## Archivos de referencia — cuándo cargar cuál

| Tarea | Archivo |
|-------|---------|
| Cualquier tarea de Figma | `quick-start.md` PRIMERO |
| Diseñar pantalla nueva | `Rules/ds-catalog.md` |
| Buscar key de componente | `Rules/ds-keys.md` |
| Tokens de color | `Rules/ds-tokens.md` |
| Reglas del DS completas | `Rules/figma-design-system.md` |
| UX / flujos / producto | `Rules/product.md` |
| Scripts guardados | `Rules/scripts-activos.md` |

---

## Convenciones

- **Nunca** hardcodear colores — siempre usar tokens de `🧩 Tokens`
- **Nunca** crear componentes custom si existe uno en `Utransfer_D_S`
- **Siempre** trabajar en la página `Pruebas`, no en producción
- Los token IDs hardcodeados en `quick-start.md` son más rápidos que `importVar()`
