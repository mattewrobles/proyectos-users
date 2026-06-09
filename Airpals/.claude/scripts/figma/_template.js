/**
 * Airpals — Script Template Base
 * --------------------------------
 * Copiar este archivo para cada nueva pantalla o componente.
 * Ejecutar: node src/index.js run /path/al/script.js
 *
 * REGLAS FIJAS:
 * 1. FASE 1 completa (imports) antes de cualquier nodo
 * 2. Limpiar frames con el mismo nombre al inicio
 * 3. card.appendChild(page) PRIMERO, luego hijos, luego FILL
 * 4. Tokens semánticos siempre — nunca hex fijo
 * 5. Instanciar componentes del DS — nunca frames custom si existe componente
 */

(async () => {
  // ── CONFIG ───────────────────────────────────────────────────────────────
  const PAGE_NAME    = '◦ Styles';   // cambiar según necesidad
  const FRAME_NAME   = 'Mi Frame';   // nombre único del frame a crear

  // ── VARIABLE IDs — Semantics (extraídos 2026-05-15) ──────────────────────
  // Background
  const ID_BG_PRIMARY    = 'VariableID:618:425';  // background/primary
  const ID_BG_SECONDARY  = 'VariableID:618:426';  // background/secondary

  // Text
  const ID_TXT_PRIMARY   = 'VariableID:618:437';  // text/primary
  const ID_TXT_SECONDARY = 'VariableID:618:438';  // text/secondary
  const ID_TXT_ACCENT    = 'VariableID:618:440';  // text/accent

  // Border
  const ID_BOR_PRIMARY   = 'VariableID:618:443';  // border/primary
  const ID_BOR_ACCENT    = 'VariableID:618:445';  // border/accent

  // Spacing (TailwindCSS collection)
  const ID_SP_2 = 'VariableID:618:340';  // spacing/2 = 8px
  const ID_SP_3 = 'VariableID:618:341';  // spacing/3 = 12px
  const ID_SP_4 = 'VariableID:618:342';  // spacing/4 = 16px
  const ID_SP_6 = 'VariableID:618:344';  // spacing/6 = 24px

  // Radius
  const ID_R_MD  = 'VariableID:618:416'; // border-radius/md = 6px  → badges, tags
  const ID_R_LG  = 'VariableID:618:415'; // border-radius/lg = 8px  → inputs, botones
  const ID_R_XL  = 'VariableID:618:414'; // border-radius/xl = 12px → cards
  const ID_R_2XL = 'VariableID:618:413'; // border-radius/2xl = 16px → modales

  // ── COMPONENT KEYS (verificados 2026-05-15) ──────────────────────────────
  // Buttons
  const KEY_BTN_PRIMARY  = '8e685884270ba324a8974d7ad44c4cbce1b2e957'; // Type=Primary, State=Default
  const KEY_BTN_SECONDARY= 'c1f0d20c8ae35e6f0cbb27ccc09281dbcf42c00b'; // Type=Secondary, State=Default
  const KEY_BTN_GHOST    = 'ca31257106e800cd8faeb2baad4149e3b8d15d58'; // Type=Ghost, State=Default

  // Badges
  const KEY_BADGE_INFO_DUO_FULL     = 'cac2b5b5bbf2e2c591de9cd44d891a25fe4bb26e'; // Info, Duo Tone, Full Round
  const KEY_BADGE_SUCCESS_DUO_FULL  = '???'; // TODO: scan Success variant
  const KEY_BADGE_WARNING_DUO_FULL  = '???'; // TODO: scan Warning variant
  const KEY_BADGE_DANGER_DUO_FULL   = '???'; // TODO: scan Danger variant

  // Input
  const KEY_INPUT = 'd8b9c1ffd324575a54c030c43023a3b4360bdcfd'; // Input component set

  // ── HELPERS ──────────────────────────────────────────────────────────────
  async function getVar(id) {
    return await figma.variables.getVariableByIdAsync(id);
  }

  function vFill(v) {
    return [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 },
      boundVariables: { color: { type: 'VARIABLE_ALIAS', id: v.id } } }];
  }

  function vStroke(v) {
    return [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 },
      boundVariables: { color: { type: 'VARIABLE_ALIAS', id: v.id } } }];
  }

  function bindRadius(node, v) {
    ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius']
      .forEach(c => node.setBoundVariable(c, v));
  }

  function bindPad(node, vTop, vRight, vBottom, vLeft) {
    node.setBoundVariable('paddingTop',    vTop    || vTop);
    node.setBoundVariable('paddingRight',  vRight  || vTop);
    node.setBoundVariable('paddingBottom', vBottom || vTop);
    node.setBoundVariable('paddingLeft',   vLeft   || vRight || vTop);
  }

  // ── FASE 1: Navegar a la página ───────────────────────────────────────────
  const page = figma.root.children.find(p => p.name === PAGE_NAME);
  if (!page) return { error: `Page "${PAGE_NAME}" not found` };
  await page.loadAsync();
  await figma.setCurrentPageAsync(page);

  // Limpiar frames anteriores con el mismo nombre
  page.children.filter(n => n.name === FRAME_NAME).forEach(n => n.remove());

  // Cargar fuentes — IMPORTANTE: Inter usa "Semi Bold" con espacio
  await Promise.all([
    figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' }),  // ← con espacio
  ]);

  // Cargar variables (en paralelo)
  const [bgPrimary, bgSecondary,
         txtPrimary, txtSecondary, txtAccent,
         borPrimary, borAccent,
         sp2, sp3, sp4, sp6,
         rMd, rLg, rXl] = await Promise.all([
    getVar(ID_BG_PRIMARY),  getVar(ID_BG_SECONDARY),
    getVar(ID_TXT_PRIMARY), getVar(ID_TXT_SECONDARY), getVar(ID_TXT_ACCENT),
    getVar(ID_BOR_PRIMARY), getVar(ID_BOR_ACCENT),
    getVar(ID_SP_2), getVar(ID_SP_3), getVar(ID_SP_4), getVar(ID_SP_6),
    getVar(ID_R_MD), getVar(ID_R_LG), getVar(ID_R_XL),
  ]);

  // Importar componentes (en paralelo) — FASE 1 siempre
  const [btnComp] = await Promise.all([
    figma.importComponentByKeyAsync(KEY_BTN_PRIMARY),
  ]);

  // ── FASE 2: Construir nodos ───────────────────────────────────────────────
  const frame = figma.createFrame();
  frame.name = FRAME_NAME;
  frame.layoutMode = 'VERTICAL';
  frame.resize(360, 100);                    // resize ANTES de AUTO
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'FIXED';
  frame.fills = vFill(bgPrimary);
  bindRadius(frame, rXl);
  bindPad(frame, sp4, sp4, sp4, sp4);
  frame.setBoundVariable('itemSpacing', sp4);
  frame.strokes = vStroke(borPrimary);
  frame.strokeWeight = 1;

  // ← CRÍTICO: agregar frame a la página PRIMERO
  page.appendChild(frame);

  // Ahora agregar hijos y al final setear FILL
  // ...agregar aquí el contenido del frame...

  // Título de ejemplo
  const title = figma.createText();
  title.characters = 'Título del frame';
  title.fontSize = 16;
  title.fontName = { family: 'Inter', style: 'SemiBold' };
  title.fills = vFill(txtPrimary);
  frame.appendChild(title);
  title.layoutSizingHorizontal = 'FILL';    // FILL solo después de appendChild

  // Botón de ejemplo
  const btn = btnComp.createInstance();
  frame.appendChild(btn);
  btn.layoutSizingHorizontal = 'FILL';

  // Posicionar y hacer zoom
  frame.x = 0; frame.y = 0;
  figma.viewport.scrollAndZoomIntoView([frame]);
  figma.currentPage.selection = [frame];

  return { ok: true, id: frame.id, w: frame.width, h: frame.height };
})()
