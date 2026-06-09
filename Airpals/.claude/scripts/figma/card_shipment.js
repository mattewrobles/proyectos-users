(async () => {
  const PAGE_NAME  = '◦ Styles';
  const FRAME_NAME = 'Card / Shipment';

  // Helpers
  function vFill(v)   { return [{type:'SOLID',color:{r:0,g:0,b:0},boundVariables:{color:{type:'VARIABLE_ALIAS',id:v.id}}}]; }
  function vStroke(v) { return [{type:'SOLID',color:{r:0,g:0,b:0},boundVariables:{color:{type:'VARIABLE_ALIAS',id:v.id}}}]; }
  function bindR(n,v) { ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius'].forEach(c=>n.setBoundVariable(c,v)); }
  async function gv(id) { return figma.variables.getVariableByIdAsync(id); }

  // ── FASE 1 ────────────────────────────────────────────────────────────────
  const page = figma.root.children.find(p => p.name === PAGE_NAME);
  await page.loadAsync();
  await figma.setCurrentPageAsync(page);
  page.children.filter(n => n.name === FRAME_NAME).forEach(n => n.remove());

  // Fuentes (Inter usa "Semi Bold" con espacio)
  await Promise.all([
    figma.loadFontAsync({ family:'Inter', style:'Regular' }),
    figma.loadFontAsync({ family:'Inter', style:'Medium' }),
    figma.loadFontAsync({ family:'Inter', style:'Semi Bold' }),
  ]);

  // Variables
  const [bgPrimary, txtPrimary, txtSecondary, borPrimary, sp2, sp3, sp4, sp6, rXl] = await Promise.all([
    gv('VariableID:618:425'), gv('VariableID:618:437'), gv('VariableID:618:438'),
    gv('VariableID:618:443'), gv('VariableID:618:340'), gv('VariableID:618:341'),
    gv('VariableID:618:342'), gv('VariableID:618:344'), gv('VariableID:618:414'),
  ]);

  // Componentes DS (en paralelo, FASE 1)
  const [badgeComp, btnComp] = await Promise.all([
    figma.importComponentByKeyAsync('cac2b5b5bbf2e2c591de9cd44d891a25fe4bb26e'), // Badge Info Duo Tone Full Round
    figma.importComponentByKeyAsync('8e685884270ba324a8974d7ad44c4cbce1b2e957'), // Button Primary Default
  ]);

  // ── FASE 2: Construir ────────────────────────────────────────────────────
  // Card
  const card = figma.createFrame();
  card.name = FRAME_NAME;
  card.layoutMode = 'VERTICAL';
  card.resize(360, 100);
  card.primaryAxisSizingMode = 'AUTO';
  card.counterAxisSizingMode = 'FIXED';
  card.fills = vFill(bgPrimary);
  bindR(card, rXl);
  card.setBoundVariable('paddingTop',    sp4);
  card.setBoundVariable('paddingRight',  sp4);
  card.setBoundVariable('paddingBottom', sp4);
  card.setBoundVariable('paddingLeft',   sp4);
  card.setBoundVariable('itemSpacing',   sp3);
  card.strokes = vStroke(borPrimary);
  card.strokeWeight = 1; card.strokeAlign = 'INSIDE';

  // ← CRÍTICO: card a page PRIMERO
  page.appendChild(card);

  // Row 1 — Header (shipment # + badge)
  const hdr = figma.createFrame();
  hdr.name = 'Header'; hdr.layoutMode = 'HORIZONTAL';
  hdr.resize(328, 20); hdr.primaryAxisSizingMode = 'AUTO';
  hdr.counterAxisSizingMode = 'AUTO'; hdr.fills = [];
  hdr.primaryAxisAlignItems = 'SPACE_BETWEEN';
  hdr.counterAxisAlignItems = 'CENTER';
  card.appendChild(hdr);

  const shipTxt = figma.createText();
  shipTxt.characters = 'Shipment #AP-2041';
  shipTxt.fontName = { family:'Inter', style:'Semi Bold' };
  shipTxt.fontSize = 14;
  shipTxt.fills = vFill(txtPrimary);
  hdr.appendChild(shipTxt);

  const badge = badgeComp.createInstance();
  hdr.appendChild(badge);
  const badgeTxt = badge.findAllWithCriteria({ types:['TEXT'] })[0];
  if (badgeTxt) { await figma.loadFontAsync(badgeTxt.fontName); badgeTxt.characters = 'In Transit'; }

  // Row 2 — Divider
  const div = figma.createFrame();
  div.name = 'Divider'; div.resize(328, 1);
  div.layoutMode = 'HORIZONTAL';
  div.primaryAxisSizingMode = 'FIXED'; div.counterAxisSizingMode = 'FIXED';
  div.fills = vFill(borPrimary);
  card.appendChild(div);

  // Row 3 — From/To
  const infoRow = figma.createFrame();
  infoRow.name = 'Info'; infoRow.layoutMode = 'HORIZONTAL';
  infoRow.resize(328, 20); infoRow.primaryAxisSizingMode = 'AUTO';
  infoRow.counterAxisSizingMode = 'AUTO'; infoRow.fills = [];
  infoRow.setBoundVariable('itemSpacing', sp6);
  card.appendChild(infoRow);

  for (const [label, value] of [['From','Brooklyn, NY'], ['To','San Francisco, CA']]) {
    const col = figma.createFrame();
    col.name = label; col.layoutMode = 'VERTICAL';
    col.resize(130, 20); col.primaryAxisSizingMode = 'AUTO';
    col.counterAxisSizingMode = 'AUTO'; col.fills = [];
    col.setBoundVariable('itemSpacing', sp2);
    infoRow.appendChild(col);

    const lbl = figma.createText();
    lbl.characters = label; lbl.fontName = {family:'Inter',style:'Regular'};
    lbl.fontSize = 11; lbl.fills = vFill(txtSecondary);
    col.appendChild(lbl);

    const val = figma.createText();
    val.characters = value; val.fontName = {family:'Inter',style:'Medium'};
    val.fontSize = 14; val.fills = vFill(txtPrimary);
    col.appendChild(val);
  }

  // Row 4 — Carrier + botón
  const footer = figma.createFrame();
  footer.name = 'Footer'; footer.layoutMode = 'HORIZONTAL';
  footer.resize(328, 20); footer.primaryAxisSizingMode = 'AUTO';
  footer.counterAxisSizingMode = 'AUTO'; footer.fills = [];
  footer.primaryAxisAlignItems = 'SPACE_BETWEEN';
  footer.counterAxisAlignItems = 'CENTER';
  card.appendChild(footer);

  const carrierTxt = figma.createText();
  carrierTxt.characters = 'UPS Ground · Est. Dec 18';
  carrierTxt.fontName = {family:'Inter',style:'Regular'};
  carrierTxt.fontSize = 12; carrierTxt.fills = vFill(txtSecondary);
  footer.appendChild(carrierTxt);

  const btn = btnComp.createInstance();
  footer.appendChild(btn);
  const btnTxt = btn.findAllWithCriteria({types:['TEXT']})[0];
  if (btnTxt) { await figma.loadFontAsync(btnTxt.fontName); btnTxt.characters = 'Track'; }

  // ← FILL después de todo en doc
  hdr.layoutSizingHorizontal  = 'FILL';
  div.layoutSizingHorizontal  = 'FILL';
  infoRow.layoutSizingHorizontal = 'FILL';
  footer.layoutSizingHorizontal  = 'FILL';

  card.x = 0; card.y = 0;
  figma.viewport.scrollAndZoomIntoView([card]);
  figma.currentPage.selection = [card];

  return { ok:true, id:card.id, w:card.width, h:card.height };
})()
