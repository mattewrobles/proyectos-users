#!/bin/bash
# ud-config/install.sh — Setup de Claude Code para el equipo Users Designers

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_DIR="$HOME/.claude"
SKILLS_DIR="$CLAUDE_DIR/skills"
RULES_DIR="$CLAUDE_DIR/rules"

# ── Colores ────────────────────────────────────────────────────────────────
BOLD="\033[1m"
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
CYAN="\033[0;36m"
RESET="\033[0m"

echo ""
echo -e "${BOLD}╔════════════════════════════════════════════╗${RESET}"
echo -e "${BOLD}║   Users Designers — Claude Code Setup      ║${RESET}"
echo -e "${BOLD}╚════════════════════════════════════════════╝${RESET}"
echo ""
echo "Vamos a configurar Claude Code con todo lo necesario para"
echo "trabajar en diseño con Figma. Toma menos de 2 minutos."
echo ""

# ── 1. Nombre ─────────────────────────────────────────────────────────────
echo -e "${CYAN}¿Cuál es tu nombre?${RESET}"
read -r NOMBRE
echo ""

# ── 2. Stack ─────────────────────────────────────────────────────────────
echo -e "${CYAN}¿Con qué stack trabajas principalmente?${RESET}"
echo "  1) Figma (solo diseño)"
echo "  2) Figma + HTML/CSS/JS"
echo "  3) Figma + React"
echo "  4) Figma + Swift/SwiftUI"
read -r STACK_CHOICE
case "$STACK_CHOICE" in
  2) STACK="HTML/CSS/JS" ;;
  3) STACK="React" ;;
  4) STACK="Swift/SwiftUI" ;;
  *) STACK="Figma" ;;
esac
echo ""

# ── 3. Proyectos ──────────────────────────────────────────────────────────
echo -e "${CYAN}¿En qué proyectos trabajas? (ingresa los números separados por espacio)${RESET}"
echo "  1) uTransfer"
echo "  2) Airpals"
echo "  3) Kaito"
echo "  4) Ecogara DS"
echo "  5) Hospital del Río"
echo "  6) Otro"
read -r PROYECTOS_CHOICE

PROYECTOS_LIST=""
REFERENTES_LIST=""

for num in $PROYECTOS_CHOICE; do
  case "$num" in
    1)
      PROYECTOS_LIST+="**uTransfer** → billetera digital con stablecoins, gamificación Upoints. CLAUDE.md en \`uTransfer/.claude/CLAUDE.md\`"$'\n'
      REFERENTES_LIST+="uTransfer → Revolut, Wise, Cash App"$'\n'
      ;;
    2)
      PROYECTOS_LIST+="**Airpals** → plataforma B2B shipping para oficinas. CLAUDE.md en \`Airpals/.claude/CLAUDE.md\`"$'\n'
      REFERENTES_LIST+="Airpals → Linear, Notion"$'\n'
      ;;
    3)
      PROYECTOS_LIST+="**Kaito** → rail de pagos B2B: Kaito Konnect + Kaito Business. CLAUDE.md en \`Kaito/.claude/CLAUDE.md\`"$'\n'
      REFERENTES_LIST+="Kaito → Stripe, Ripple"$'\n'
      ;;
    4)
      PROYECTOS_LIST+="**Ecogara DS** → Design System completo. Ver memory: project_ecogara_ds.md"$'\n'
      REFERENTES_LIST+="Ecogara DS → Material Design, Primer"$'\n'
      ;;
    5)
      PROYECTOS_LIST+="**Hospital del Río** → web médica en Webflow. CLAUDE.md en \`HospitalDelRio/CLAUDE.md\`"$'\n'
      REFERENTES_LIST+="Hospital del Río → sitios médicos institucionales"$'\n'
      ;;
    6)
      echo -e "  ${CYAN}¿Nombre del proyecto?${RESET}"
      read -r OTRO_PROYECTO
      PROYECTOS_LIST+="**${OTRO_PROYECTO}**"$'\n'
      ;;
  esac
done

echo ""

# ── 4. Crear directorios ───────────────────────────────────────────────────
echo -e "${YELLOW}Creando directorios...${RESET}"
mkdir -p "$SKILLS_DIR"
mkdir -p "$RULES_DIR"

# ── 5. Instalar skills ────────────────────────────────────────────────────
echo -e "${YELLOW}Instalando skills de Figma y UI/UX...${RESET}"
SKILLS_TO_INSTALL=(
  "figma-use"
  "figma-generate-design"
  "figma-generate-library"
  "figma-mcp-quality"
  "figma-design-code"
  "ui-ux-pro-max-intelligence"
  "council"
  "prompt-design-ui"
)

for skill in "${SKILLS_TO_INSTALL[@]}"; do
  if [ -d "$SCRIPT_DIR/skills/$skill" ]; then
    cp -r "$SCRIPT_DIR/skills/$skill" "$SKILLS_DIR/"
    echo -e "  ${GREEN}✓${RESET} $skill"
  fi
done

# ── 6. Instalar rules ─────────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}Instalando rules del equipo...${RESET}"
mkdir -p "$RULES_DIR/common"
for f in figma-master.md design-resources.md behaviors.md design.md project-loop.md web-project-assets.md mcp-reference.md; do
  if [ -f "$SCRIPT_DIR/rules/$f" ]; then
    cp "$SCRIPT_DIR/rules/$f" "$RULES_DIR/$f"
    echo -e "  ${GREEN}✓${RESET} $f"
  fi
done
for f in "$SCRIPT_DIR"/rules/common/*.md; do
  if [ -f "$f" ]; then
    cp "$f" "$RULES_DIR/common/"
    echo -e "  ${GREEN}✓${RESET} common/$(basename "$f")"
  fi
done

# ── 7. Generar CLAUDE.md global ───────────────────────────────────────────
echo ""
echo -e "${YELLOW}Generando tu CLAUDE.md global...${RESET}"

TEMPLATE="$SCRIPT_DIR/templates/CLAUDE.md.template"
OUTPUT="$CLAUDE_DIR/CLAUDE.md"

# Backup si ya existe
if [ -f "$OUTPUT" ]; then
  cp "$OUTPUT" "$OUTPUT.backup"
  echo -e "  ${YELLOW}⚠️  CLAUDE.md anterior guardado como CLAUDE.md.backup${RESET}"
fi

# Proyectos y referentes fallback
[ -z "$PROYECTOS_LIST" ] && PROYECTOS_LIST="Consultar con Mau."
[ -z "$REFERENTES_LIST" ] && REFERENTES_LIST="Sin referentes configurados."

# Generar CLAUDE.md directamente (evita problemas de bash con newlines en ${//})
python3 - "$OUTPUT" "$NOMBRE" "$STACK" "$PROYECTOS_LIST" "$REFERENTES_LIST" << 'PYEOF'
import sys
output, nombre, stack, proyectos, referentes = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5]
template_path = output.replace("CLAUDE.md", "") + "/../templates/CLAUDE.md.template"
import os
template_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "templates", "CLAUDE.md.template") if False else template_path

# Leer template desde el dir del script
script_dir = os.path.dirname(os.path.abspath(sys.argv[0])) if hasattr(sys, 'argv') else "."
with open(os.path.join(script_dir, "templates", "CLAUDE.md.template")) as f:
    content = f.read()

content = content.replace("{{NOMBRE}}", nombre)
content = content.replace("{{STACK}}", stack)
content = content.replace("{{PROYECTOS}}", proyectos)
content = content.replace("{{REFERENTES}}", referentes)

with open(output, "w") as f:
    f.write(content)
PYEOF
echo -e "  ${GREEN}✓${RESET} ~/.claude/CLAUDE.md generado"

# ── 8. Verificar figma-cli ────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}Verificando figma-cli...${RESET}"

FIGMA_CLI_PATH="$HOME/Developer/Claude/figma-cli"

if [ -d "$FIGMA_CLI_PATH" ]; then
  echo -e "  ${GREEN}✓${RESET} figma-cli encontrado en $FIGMA_CLI_PATH"
else
  echo -e "  ${YELLOW}⚠️  figma-cli no encontrado. Instálalo con:${RESET}"
  echo ""
  echo "    mkdir -p ~/Developer/Claude && cd ~/Developer/Claude"
  echo "    git clone https://github.com/silbormueller/figma-ds-cli figma-cli"
  echo "    cd figma-cli && npm install"
fi

# ── 9. Resumen ────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}╔════════════════════════════════════════════╗${RESET}"
echo -e "${BOLD}║   ✅  Setup completo para $NOMBRE$(printf '%*s' $((28-${#NOMBRE})) '')║${RESET}"
echo -e "${BOLD}╚════════════════════════════════════════════╝${RESET}"
echo ""
echo -e "${GREEN}Instalado:${RESET}"
echo "  • 8 skills en ~/.claude/skills/"
echo "  • rules del equipo en ~/.claude/rules/ (incluye common/)"
echo "  • ~/.claude/CLAUDE.md personalizado"
echo ""
echo -e "${CYAN}Próximos pasos:${RESET}"
echo "  1. Clonar el repo de uTransfer (si no lo tienes)"
echo "  2. Abrir el proyecto en Claude Code: claude <ruta/al/proyecto>"
echo "  3. Conectar Figma CLI: cd ~/Developer/Claude/figma-cli && node src/index.js connect"
echo ""
echo "  Claude ya sabe todo del DS de cada proyecto al abrir su carpeta."
echo ""
