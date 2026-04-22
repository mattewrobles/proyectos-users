(async () => {
  // ── FASE 1: Navegar + limpiar ──────────────────────────────────────
  const page = figma.root.children.find(p => p.name.includes('Borrrador'));
  if (!page) return { error: 'Página no encontrada' };
  await page.loadAsync();
  await figma.setCurrentPageAsync(page);
  page.children.filter(n => n.name === 'W6 · Compra Exitosa').forEach(n => n.remove());

  // ── FASE 2: Importar TODO ──────────────────────────────────────────
  await Promise.all([
    figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' }),
  ]);

  const spacingIds = {
    4:  'VariableID:a76ac5afaf32fc7db440de629558bd67512ab705/40006136:103',
    8:  'VariableID:c5eb1187ed05c87e0390d6245983d582fe4f8728/40006136:104',
    12: 'VariableID:6a12f53ee51dc9af1f5c95a6108169f48bef89d1/40006136:105',
    16: 'VariableID:fc630c4b3648e68ab3fc1f74a76dc49f812f7bda/40006136:106',
    20: 'VariableID:c0ea2be6cafced44153f35cd1a2e79b1d092e5b9/40006136:107',
    24: 'VariableID:12f7f87e25374c4dd6b48d3d90aadf75606fbf1b/40006136:108',
    32: 'VariableID:19b54d8ecd9c97d10ccee305f2e1e3621f240c01/40006136:110',
  };
  async function sp(px) { return await figma.variables.getVariableByIdAsync(spacingIds[px]); }

  const allCols = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
  async function importVar(colName, varName) {
    const col = allCols.find(c => c.name === colName);
    if (!col) return null;
    const vars = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(col.key);
    const v = vars.find(v => v.name === varName);
    return v ? await figma.variables.importVariableByKeyAsync(v.key) : null;
  }

  const [bgFg, cardFill, textPrimary, textSecondary, radiusXl] = await Promise.all([
    importVar('🧩 Tokens', 'Backgrounds/Foreground'),
    importVar('🧩 Tokens', 'Cards-Fills/Card'),
    importVar('🧩 Tokens', 'Text/Primary'),
    importVar('🧩 Tokens', 'Text/secondary'),
    importVar('⊙ Radius', 'Radius-xl'),
  ]);

  const [sbComp, homeIndComp, btnPrimaryComp, btnClearComp, illustComp] = await Promise.all([
    figma.importComponentByKeyAsync('222088d248a045f3d2e7df151f7d613bbda7fafd'),
    figma.importComponentByKeyAsync('e12f73d63ccef0537a22efd9a34228a9dc441bff'),
    figma.importComponentByKeyAsync('15be15cfa0d8c4667e4eb8f84bf80f9919e019c9'),
    figma.importComponentByKeyAsync('c4757e2398d2f767b0b188296d6efe17d15e1b9c'),
    figma.importComponentByKeyAsync('e4b09f3c3b1242ba4e786d74396977f94498e2de'), // Wallet 01
  ]);

  const [styleH3, styleH5, styleSubtitle, styleCaption] = await Promise.all([
    figma.importStyleByKeyAsync('41243533aec36fb477c160301ba9c854ebaf0c01'),
    figma.importStyleByKeyAsync('a761967b66cd94663df9cacbe06c32f68b48b7e7'),
    figma.importStyleByKeyAsync('df46c8797813b902f6164fa2ea73a2e58e0b13df'),
    figma.importStyleByKeyAsync('3c4a22b5a0d0e65480fea3cbc965b935ee9a610c'),
  ]);

  const [sp4, sp8, sp12, sp16, sp20, sp24, sp32] = await Promise.all([
    sp(4), sp(8), sp(12), sp(16), sp(20), sp(24), sp(32)
  ]);

  // ── Helpers ────────────────────────────────────────────────────────
  function vFill(v) {
    return [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.1 },
      boundVariables: { color: { type: 'VARIABLE_ALIAS', id: v.id } } }];
  }
  function bindRadius(node, rv) {
    ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius']
      .forEach(c => node.setBoundVariable(c, rv));
  }

  // ── Build ──────────────────────────────────────────────────────────
  const screen = figma.createFrame();
  screen.name = 'W6 · Compra Exitosa';
  screen.resize(393, 852);
  screen.layoutMode = 'VERTICAL';
  screen.primaryAxisSizingMode = 'FIXED';
  screen.counterAxisSizingMode = 'FIXED';
  screen.fills = vFill(bgFg);
  screen.itemSpacing = 0;

  // Status bar
  const statusBar = sbComp.createInstance();
  screen.appendChild(statusBar);
  statusBar.layoutSizingHorizontal = 'FILL';

  // Hero area: ilustración + título
  const hero = figma.createFrame();
  hero.name = 'Hero';
  hero.layoutMode = 'VERTICAL';
  hero.primaryAxisSizingMode = 'AUTO';
  hero.counterAxisSizingMode = 'FIXED';
  hero.counterAxisAlignItems = 'CENTER';
  hero.primaryAxisAlignItems = 'CENTER';
  hero.fills = [];
  screen.appendChild(hero);
  hero.layoutSizingHorizontal = 'FILL';
  hero.layoutSizingVertical = 'FILL';
  if (sp32) hero.setBoundVariable('paddingTop', sp32);
  if (sp20) hero.setBoundVariable('paddingRight', sp20);
  if (sp24) hero.setBoundVariable('paddingBottom', sp24);
  if (sp20) hero.setBoundVariable('paddingLeft', sp20);
  if (sp24) hero.setBoundVariable('itemSpacing', sp24);

  // Ilustración
  const illust = illustComp.createInstance();
  hero.appendChild(illust);
  illust.resize(200, 200);

  // Texto de éxito
  const textArea = figma.createFrame();
  textArea.name = 'Text Area';
  textArea.layoutMode = 'VERTICAL';
  textArea.primaryAxisSizingMode = 'AUTO';
  textArea.counterAxisSizingMode = 'FIXED';
  textArea.counterAxisAlignItems = 'CENTER';
  textArea.fills = [];
  if (sp12) textArea.setBoundVariable('itemSpacing', sp12);
  hero.appendChild(textArea);
  textArea.layoutSizingHorizontal = 'FILL';

  const successTitle = figma.createText();
  successTitle.characters = '¡Compra exitosa!';
  await successTitle.setTextStyleIdAsync(styleH3.id);
  successTitle.fills = vFill(textPrimary);
  successTitle.textAlignHorizontal = 'CENTER';
  textArea.appendChild(successTitle);
  successTitle.layoutSizingHorizontal = 'FILL';

  const successSub = figma.createText();
  successSub.characters = 'Compraste 100.00 USDT por $100.99 USD. Ya están en tu billetera.';
  await successSub.setTextStyleIdAsync(styleSubtitle.id);
  successSub.fills = vFill(textSecondary);
  successSub.textAlignHorizontal = 'CENTER';
  textArea.appendChild(successSub);
  successSub.layoutSizingHorizontal = 'FILL';

  // Resumen mini card
  const summaryCard = figma.createFrame();
  summaryCard.name = 'Summary Card';
  summaryCard.layoutMode = 'HORIZONTAL';
  summaryCard.primaryAxisSizingMode = 'AUTO';
  summaryCard.counterAxisSizingMode = 'AUTO';
  summaryCard.counterAxisAlignItems = 'CENTER';
  summaryCard.primaryAxisAlignItems = 'SPACE_BETWEEN';
  summaryCard.fills = vFill(cardFill);
  if (radiusXl) bindRadius(summaryCard, radiusXl);
  if (sp16) summaryCard.setBoundVariable('paddingTop', sp16);
  if (sp16) summaryCard.setBoundVariable('paddingRight', sp16);
  if (sp16) summaryCard.setBoundVariable('paddingBottom', sp16);
  if (sp16) summaryCard.setBoundVariable('paddingLeft', sp16);
  hero.appendChild(summaryCard);
  summaryCard.layoutSizingHorizontal = 'FILL';

  async function summaryItem(parent, label, value) {
    const col = figma.createFrame();
    col.name = label;
    col.layoutMode = 'VERTICAL';
    col.primaryAxisSizingMode = 'AUTO';
    col.counterAxisSizingMode = 'AUTO';
    col.counterAxisAlignItems = 'MIN';
    col.fills = [];
    if (sp4) col.setBoundVariable('itemSpacing', sp4);
    parent.appendChild(col);

    const lbl = figma.createText();
    lbl.characters = label;
    await lbl.setTextStyleIdAsync(styleCaption.id);
    lbl.fills = vFill(textSecondary);
    col.appendChild(lbl);

    const val = figma.createText();
    val.characters = value;
    await val.setTextStyleIdAsync(styleSubtitle.id);
    val.fills = vFill(textPrimary);
    col.appendChild(val);
  }

  await summaryItem(summaryCard, 'Pagaste', '$100.99 USD');
  await summaryItem(summaryCard, 'Recibiste', '100.00 USDT');

  // Upoints badge (gamificación)
  const upointsBadge = figma.createFrame();
  upointsBadge.name = 'Upoints Badge';
  upointsBadge.layoutMode = 'HORIZONTAL';
  upointsBadge.primaryAxisSizingMode = 'AUTO';
  upointsBadge.counterAxisSizingMode = 'AUTO';
  upointsBadge.counterAxisAlignItems = 'CENTER';
  upointsBadge.fills = [{ type: 'SOLID', color: { r: 0.55, g: 0.26, b: 0.87 }, opacity: 0.1 }];
  upointsBadge.cornerRadius = 100;
  if (sp8)  upointsBadge.setBoundVariable('paddingTop', sp8);
  if (sp8)  upointsBadge.setBoundVariable('paddingBottom', sp8);
  if (sp16) upointsBadge.setBoundVariable('paddingLeft', sp16);
  if (sp16) upointsBadge.setBoundVariable('paddingRight', sp16);
  if (sp8)  upointsBadge.setBoundVariable('itemSpacing', sp8);
  hero.appendChild(upointsBadge);

  const upointsText = figma.createText();
  upointsText.characters = '+ 50 Upoints ganados';
  await upointsText.setTextStyleIdAsync(styleCaption.id);
  upointsText.fills = [{ type: 'SOLID', color: { r: 0.55, g: 0.26, b: 0.87 } }];
  upointsBadge.appendChild(upointsText);

  // Botones
  const btnArea = figma.createFrame();
  btnArea.name = 'Buttons';
  btnArea.layoutMode = 'VERTICAL';
  btnArea.primaryAxisSizingMode = 'AUTO';
  btnArea.counterAxisSizingMode = 'FIXED';
  btnArea.fills = [];
  if (sp12) btnArea.setBoundVariable('itemSpacing', sp12);
  if (sp20) btnArea.setBoundVariable('paddingLeft', sp20);
  if (sp20) btnArea.setBoundVariable('paddingRight', sp20);
  if (sp16) btnArea.setBoundVariable('paddingBottom', sp16);
  screen.appendChild(btnArea);
  btnArea.layoutSizingHorizontal = 'FILL';

  const btnDone = btnPrimaryComp.createInstance();
  btnArea.appendChild(btnDone);
  btnDone.layoutSizingHorizontal = 'FILL';
  try { btnDone.setProperties({ 'Icon Left#34:8': false, 'Icon Right#34:7': false, 'State': 'Default', 'Style': 'Primary' }); } catch(e) {}
  const lbl1 = btnDone.findAllWithCriteria({ types: ['TEXT'] })[0];
  if (lbl1) { await figma.loadFontAsync(lbl1.fontName); lbl1.characters = 'Ver mis activos'; }

  const btnShare = btnClearComp.createInstance();
  btnArea.appendChild(btnShare);
  btnShare.layoutSizingHorizontal = 'FILL';
  try { btnShare.setProperties({ 'Icon Left#34:8': false, 'Icon Right#34:7': false, 'State': 'Default', 'Style': 'Clear' }); } catch(e) {}
  const lbl2 = btnShare.findAllWithCriteria({ types: ['TEXT'] })[0];
  if (lbl2) { await figma.loadFontAsync(lbl2.fontName); lbl2.characters = 'Comprar más'; }

  // Home Indicator
  const homeInd = homeIndComp.createInstance();
  screen.appendChild(homeInd);
  homeInd.layoutSizingHorizontal = 'FILL';

  screen.x = 2100;
  screen.y = 0;
  figma.viewport.scrollAndZoomIntoView([screen]);
  figma.currentPage.selection = [screen];

  return { ok: true, id: screen.id, name: screen.name };
})()
