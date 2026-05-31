(async () => {
  // ── FASE 1: Navegar + limpiar ──────────────────────────────────────
  const page = figma.root.children.find(p => p.name.includes('Borrrador'));
  if (!page) return { error: 'Página no encontrada' };
  await page.loadAsync();
  await figma.setCurrentPageAsync(page);
  page.children.filter(n => n.name === 'W5 · Confirmar Compra').forEach(n => n.remove());

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

  const [bgFg, cardFill, textPrimary, textSecondary, radiusMd, radiusXl, borderSecondary] = await Promise.all([
    importVar('🧩 Tokens', 'Backgrounds/Foreground'),
    importVar('🧩 Tokens', 'Cards-Fills/Card'),
    importVar('🧩 Tokens', 'Text/Primary'),
    importVar('🧩 Tokens', 'Text/secondary'),
    importVar('⊙ Radius', 'Radius-md'),
    importVar('⊙ Radius', 'Radius-xl'),
    importVar('🧩 Tokens', 'Border/Secondary'),
  ]);

  const [sbComp, homeIndComp, btnPrimaryComp, btnClearComp, dividerComp] = await Promise.all([
    figma.importComponentByKeyAsync('222088d248a045f3d2e7df151f7d613bbda7fafd'),
    figma.importComponentByKeyAsync('e12f73d63ccef0537a22efd9a34228a9dc441bff'),
    figma.importComponentByKeyAsync('15be15cfa0d8c4667e4eb8f84bf80f9919e019c9'),
    figma.importComponentByKeyAsync('c4757e2398d2f767b0b188296d6efe17d15e1b9c'), // Clear
    figma.importComponentByKeyAsync('3b8ea15e6f8e5410181509a43c329036681099c5'), // Divider
  ]);

  const [styleH3, styleH5, styleSubtitle, styleCaption] = await Promise.all([
    figma.importStyleByKeyAsync('41243533aec36fb477c160301ba9c854ebaf0c01'),
    figma.importStyleByKeyAsync('a761967b66cd94663df9cacbe06c32f68b48b7e7'),
    figma.importStyleByKeyAsync('df46c8797813b902f6164fa2ea73a2e58e0b13df'),
    figma.importStyleByKeyAsync('3c4a22b5a0d0e65480fea3cbc965b935ee9a610c'),
  ]);

  const [sp4, sp8, sp12, sp16, sp20, sp24] = await Promise.all([
    sp(4), sp(8), sp(12), sp(16), sp(20), sp(24)
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

  // Row de detalle de la orden
  async function detailRow(parent, label, value, isTotal = false) {
    const row = figma.createFrame();
    row.name = `Row · ${label}`;
    row.layoutMode = 'HORIZONTAL';
    row.primaryAxisSizingMode = 'AUTO';
    row.counterAxisSizingMode = 'AUTO';
    row.primaryAxisAlignItems = 'SPACE_BETWEEN';
    row.counterAxisAlignItems = 'CENTER';
    row.fills = [];
    parent.appendChild(row);
    row.layoutSizingHorizontal = 'FILL';
    if (sp16) row.setBoundVariable('paddingTop', sp16);
    if (sp16) row.setBoundVariable('paddingBottom', sp16);

    const lbl = figma.createText();
    lbl.characters = label;
    const style = isTotal ? styleSubtitle : styleCaption;
    await lbl.setTextStyleIdAsync(style.id);
    lbl.fills = isTotal ? vFill(textPrimary) : vFill(textSecondary);
    row.appendChild(lbl);

    const val = figma.createText();
    val.characters = value;
    await val.setTextStyleIdAsync(style.id);
    val.fills = vFill(textPrimary);
    row.appendChild(val);

    // Divider (si no es el total)
    if (!isTotal && borderSecondary) {
      const div = dividerComp.createInstance();
      parent.appendChild(div);
      div.layoutSizingHorizontal = 'FILL';
    }
  }

  // ── Build ──────────────────────────────────────────────────────────
  const screen = figma.createFrame();
  screen.name = 'W5 · Confirmar Compra';
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

  // Nav
  const nav = figma.createFrame();
  nav.name = 'Nav';
  nav.layoutMode = 'HORIZONTAL';
  nav.primaryAxisSizingMode = 'AUTO';
  nav.counterAxisSizingMode = 'AUTO';
  nav.counterAxisAlignItems = 'CENTER';
  nav.fills = [];
  screen.appendChild(nav);
  nav.layoutSizingHorizontal = 'FILL';
  if (sp8)  nav.setBoundVariable('paddingTop', sp8);
  if (sp16) nav.setBoundVariable('paddingRight', sp16);
  if (sp8)  nav.setBoundVariable('paddingBottom', sp8);
  if (sp16) nav.setBoundVariable('paddingLeft', sp16);
  if (sp8)  nav.setBoundVariable('itemSpacing', sp8);

  const navBack = figma.createText();
  navBack.characters = '←';
  await navBack.setTextStyleIdAsync(styleH5.id);
  navBack.fills = vFill(textPrimary);
  nav.appendChild(navBack);

  const navTitle = figma.createText();
  navTitle.characters = 'Confirmar compra';
  await navTitle.setTextStyleIdAsync(styleSubtitle.id);
  navTitle.fills = vFill(textPrimary);
  nav.appendChild(navTitle);

  // Content
  const content = figma.createFrame();
  content.name = 'Content';
  content.layoutMode = 'VERTICAL';
  content.primaryAxisSizingMode = 'AUTO';
  content.counterAxisSizingMode = 'FIXED';
  content.fills = [];
  screen.appendChild(content);
  content.layoutSizingHorizontal = 'FILL';
  content.layoutSizingVertical = 'FILL';
  if (sp20) content.setBoundVariable('paddingLeft', sp20);
  if (sp20) content.setBoundVariable('paddingRight', sp20);
  if (sp24) content.setBoundVariable('paddingTop', sp24);
  if (sp16) content.setBoundVariable('paddingBottom', sp16);
  if (sp16) content.setBoundVariable('itemSpacing', sp16);

  // Resumen de compra hero
  const hero = figma.createFrame();
  hero.name = 'Hero Summary';
  hero.layoutMode = 'VERTICAL';
  hero.primaryAxisSizingMode = 'AUTO';
  hero.counterAxisSizingMode = 'AUTO';
  hero.counterAxisAlignItems = 'CENTER';
  hero.fills = vFill(cardFill);
  if (radiusXl) bindRadius(hero, radiusXl);
  if (sp20) hero.setBoundVariable('paddingTop', sp20);
  if (sp20) hero.setBoundVariable('paddingRight', sp20);
  if (sp20) hero.setBoundVariable('paddingBottom', sp20);
  if (sp20) hero.setBoundVariable('paddingLeft', sp20);
  if (sp8)  hero.setBoundVariable('itemSpacing', sp8);
  content.appendChild(hero);
  hero.layoutSizingHorizontal = 'FILL';

  // Ícono USDT
  const iconCircle = figma.createFrame();
  iconCircle.resize(56, 56);
  iconCircle.cornerRadius = 28;
  iconCircle.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.69, b: 0.56 } }];
  iconCircle.layoutMode = 'VERTICAL';
  iconCircle.counterAxisAlignItems = 'CENTER';
  iconCircle.primaryAxisAlignItems = 'CENTER';
  hero.appendChild(iconCircle);

  const iconLetter = figma.createText();
  iconLetter.characters = '$';
  await iconLetter.setTextStyleIdAsync(styleH5.id);
  iconLetter.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  iconCircle.appendChild(iconLetter);

  const heroAmount = figma.createText();
  heroAmount.characters = '$100.00 USD';
  await heroAmount.setTextStyleIdAsync(styleH3.id);
  heroAmount.fills = vFill(textPrimary);
  heroAmount.textAlignHorizontal = 'CENTER';
  hero.appendChild(heroAmount);

  const heroSub = figma.createText();
  heroSub.characters = '100.00 USDT';
  await heroSub.setTextStyleIdAsync(styleSubtitle.id);
  heroSub.fills = vFill(textSecondary);
  heroSub.textAlignHorizontal = 'CENTER';
  hero.appendChild(heroSub);

  // Detalle de la orden
  const detailCard = figma.createFrame();
  detailCard.name = 'Order Detail';
  detailCard.layoutMode = 'VERTICAL';
  detailCard.primaryAxisSizingMode = 'AUTO';
  detailCard.counterAxisSizingMode = 'AUTO';
  detailCard.fills = vFill(cardFill);
  if (radiusXl) bindRadius(detailCard, radiusXl);
  if (sp16) detailCard.setBoundVariable('paddingLeft', sp16);
  if (sp16) detailCard.setBoundVariable('paddingRight', sp16);
  content.appendChild(detailCard);
  detailCard.layoutSizingHorizontal = 'FILL';

  await detailRow(detailCard, 'Pagas', '$100.00 USD');
  await detailRow(detailCard, 'Recibes', '100.00 USDT');
  await detailRow(detailCard, 'Tasa de cambio', '1 USDT = $1.00');
  await detailRow(detailCard, 'Comisión', '$0.99 USD');
  await detailRow(detailCard, 'Total a pagar', '$100.99 USD', true);

  // Nota legal
  const legalText = figma.createText();
  legalText.characters = 'La tasa es válida por 60 segundos. El precio final puede variar ligeramente.';
  await legalText.setTextStyleIdAsync(styleCaption.id);
  legalText.fills = vFill(textSecondary);
  legalText.textAlignHorizontal = 'CENTER';
  content.appendChild(legalText);
  legalText.layoutSizingHorizontal = 'FILL';

  // Spacer — empuja botones al fondo del content (que tiene FILL vertical)
  const contentSpacer = figma.createFrame();
  contentSpacer.name = 'Spacer';
  contentSpacer.fills = [];
  contentSpacer.resize(1, 1);
  content.appendChild(contentSpacer);
  contentSpacer.layoutSizingVertical = 'FILL';

  // Botones — al fondo del content
  const btnArea = figma.createFrame();
  btnArea.name = 'Buttons';
  btnArea.layoutMode = 'VERTICAL';
  btnArea.primaryAxisSizingMode = 'AUTO';
  btnArea.counterAxisSizingMode = 'AUTO';
  btnArea.fills = [];
  if (sp12) btnArea.setBoundVariable('itemSpacing', sp12);
  content.appendChild(btnArea);
  btnArea.layoutSizingHorizontal = 'FILL';

  const btnConfirm = btnPrimaryComp.createInstance();
  btnArea.appendChild(btnConfirm);
  btnConfirm.layoutSizingHorizontal = 'FILL';
  try { btnConfirm.setProperties({ 'Icon Left#34:8': false, 'Icon Right#34:7': false, 'State': 'Default', 'Style': 'Primary' }); } catch(e) {}
  const btnLbl1 = btnConfirm.findAllWithCriteria({ types: ['TEXT'] })[0];
  if (btnLbl1) { await figma.loadFontAsync(btnLbl1.fontName); btnLbl1.characters = 'Confirmar compra'; }

  const btnCancel = btnClearComp.createInstance();
  btnArea.appendChild(btnCancel);
  btnCancel.layoutSizingHorizontal = 'FILL';
  try { btnCancel.setProperties({ 'Icon Left#34:8': false, 'Icon Right#34:7': false, 'State': 'Default', 'Style': 'Clear' }); } catch(e) {}
  const btnLbl2 = btnCancel.findAllWithCriteria({ types: ['TEXT'] })[0];
  if (btnLbl2) { await figma.loadFontAsync(btnLbl2.fontName); btnLbl2.characters = 'Cancelar'; }

  // Home Indicator
  const homeInd = homeIndComp.createInstance();
  screen.appendChild(homeInd);
  homeInd.layoutSizingHorizontal = 'FILL';

  screen.x = 1680;
  screen.y = 0;
  figma.viewport.scrollAndZoomIntoView([screen]);
  figma.currentPage.selection = [screen];

  return { ok: true, id: screen.id, name: screen.name };
})()
