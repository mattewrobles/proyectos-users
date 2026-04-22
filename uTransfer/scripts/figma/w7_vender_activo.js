(async () => {
  const page = figma.root.children.find(p => p.name.includes('Borrrador'));
  if (!page) return { error: 'Página no encontrada' };
  await page.loadAsync();
  await figma.setCurrentPageAsync(page);
  page.children.filter(n => n.name === 'W7 · Vender Activo').forEach(n => n.remove());

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

  const [bgFg, cardFill, textPrimary, textSecondary, textDisabled, radiusMd, radiusXl] = await Promise.all([
    importVar('🧩 Tokens', 'Backgrounds/Foreground'),
    importVar('🧩 Tokens', 'Cards-Fills/Card'),
    importVar('🧩 Tokens', 'Text/Primary'),
    importVar('🧩 Tokens', 'Text/secondary'),
    importVar('🧩 Tokens', 'Text/disabled'),
    importVar('⊙ Radius', 'Radius-md'),
    importVar('⊙ Radius', 'Radius-xl'),
  ]);

  const [sbComp, homeIndComp, btnPrimaryComp, btnClearComp, keyboardComp, dividerComp] = await Promise.all([
    figma.importComponentByKeyAsync('222088d248a045f3d2e7df151f7d613bbda7fafd'),
    figma.importComponentByKeyAsync('e12f73d63ccef0537a22efd9a34228a9dc441bff'),
    figma.importComponentByKeyAsync('15be15cfa0d8c4667e4eb8f84bf80f9919e019c9'),
    figma.importComponentByKeyAsync('c4757e2398d2f767b0b188296d6efe17d15e1b9c'),
    figma.importComponentByKeyAsync('9c1814d08f64b86d94c0280b4bc16ae550d1e1a9'),
    figma.importComponentByKeyAsync('3b8ea15e6f8e5410181509a43c329036681099c5'),
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
  screen.name = 'W7 · Vender Activo';
  screen.resize(393, 852);
  screen.layoutMode = 'VERTICAL';
  screen.primaryAxisSizingMode = 'FIXED';
  screen.counterAxisSizingMode = 'FIXED';
  screen.fills = vFill(bgFg);
  screen.itemSpacing = 0;

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
  navTitle.characters = 'Vender USDT';
  await navTitle.setTextStyleIdAsync(styleSubtitle.id);
  navTitle.fills = vFill(textPrimary);
  nav.appendChild(navTitle);

  // Tab selector: Vender / Retirar
  const tabSel = figma.createFrame();
  tabSel.name = 'Tab Selector';
  tabSel.layoutMode = 'HORIZONTAL';
  tabSel.primaryAxisSizingMode = 'AUTO';
  tabSel.counterAxisSizingMode = 'AUTO';
  tabSel.counterAxisAlignItems = 'CENTER';
  tabSel.fills = vFill(cardFill);
  if (radiusMd) bindRadius(tabSel, radiusMd);
  if (sp4) tabSel.setBoundVariable('paddingTop', sp4);
  if (sp4) tabSel.setBoundVariable('paddingBottom', sp4);
  if (sp4) tabSel.setBoundVariable('paddingLeft', sp4);
  if (sp4) tabSel.setBoundVariable('paddingRight', sp4);
  if (sp4) tabSel.setBoundVariable('itemSpacing', sp4);
  screen.appendChild(tabSel);
  tabSel.layoutSizingHorizontal = 'FILL';
  if (sp20) tabSel.setBoundVariable('paddingLeft', sp20);
  if (sp20) tabSel.setBoundVariable('paddingRight', sp20);

  // Workaround: wrapper para margin horizontal
  const tabWrapper = figma.createFrame();
  tabWrapper.name = 'Tab Wrapper';
  tabWrapper.layoutMode = 'VERTICAL';
  tabWrapper.primaryAxisSizingMode = 'AUTO';
  tabWrapper.counterAxisSizingMode = 'AUTO';
  tabWrapper.fills = [];
  if (sp20) tabWrapper.setBoundVariable('paddingLeft', sp20);
  if (sp20) tabWrapper.setBoundVariable('paddingRight', sp20);
  if (sp12) tabWrapper.setBoundVariable('paddingTop', sp12);
  if (sp12) tabWrapper.setBoundVariable('paddingBottom', sp12);
  // Reemplazar tabSel por tabWrapper
  screen.children[screen.children.length - 1].remove();
  screen.appendChild(tabWrapper);
  tabWrapper.layoutSizingHorizontal = 'FILL';

  const tabRow = figma.createFrame();
  tabRow.name = 'Tab Row';
  tabRow.layoutMode = 'HORIZONTAL';
  tabRow.primaryAxisSizingMode = 'AUTO';
  tabRow.counterAxisSizingMode = 'AUTO';
  tabRow.fills = vFill(cardFill);
  if (radiusMd) bindRadius(tabRow, radiusMd);
  if (sp4) tabRow.setBoundVariable('paddingTop', sp4);
  if (sp4) tabRow.setBoundVariable('paddingBottom', sp4);
  if (sp4) tabRow.setBoundVariable('paddingLeft', sp4);
  if (sp4) tabRow.setBoundVariable('paddingRight', sp4);
  if (sp4) tabRow.setBoundVariable('itemSpacing', sp4);
  tabWrapper.appendChild(tabRow);
  tabRow.layoutSizingHorizontal = 'FILL';

  // Tab activo: Vender
  const tabActive = figma.createFrame();
  tabActive.name = 'Tab Vender (active)';
  tabActive.layoutMode = 'HORIZONTAL';
  tabActive.primaryAxisSizingMode = 'AUTO';
  tabActive.counterAxisSizingMode = 'AUTO';
  tabActive.counterAxisAlignItems = 'CENTER';
  tabActive.primaryAxisAlignItems = 'CENTER';
  tabActive.fills = [{ type: 'SOLID', color: { r: 0.97, g: 0.97, b: 0.97 } }]; // white-ish active
  tabActive.cornerRadius = 6;
  if (sp8) tabActive.setBoundVariable('paddingTop', sp8);
  if (sp8) tabActive.setBoundVariable('paddingBottom', sp8);
  if (sp12) tabActive.setBoundVariable('paddingLeft', sp12);
  if (sp12) tabActive.setBoundVariable('paddingRight', sp12);
  tabRow.appendChild(tabActive);
  tabActive.layoutSizingHorizontal = 'FILL';

  const tabActiveLabel = figma.createText();
  tabActiveLabel.characters = 'Vender';
  await tabActiveLabel.setTextStyleIdAsync(styleCaption.id);
  tabActiveLabel.fills = vFill(textPrimary);
  tabActiveLabel.textAlignHorizontal = 'CENTER';
  tabActive.appendChild(tabActiveLabel);
  tabActiveLabel.layoutSizingHorizontal = 'FILL';

  // Tab inactivo: Retirar
  const tabInactive = figma.createFrame();
  tabInactive.name = 'Tab Retirar (inactive)';
  tabInactive.layoutMode = 'HORIZONTAL';
  tabInactive.primaryAxisSizingMode = 'AUTO';
  tabInactive.counterAxisSizingMode = 'AUTO';
  tabInactive.counterAxisAlignItems = 'CENTER';
  tabInactive.primaryAxisAlignItems = 'CENTER';
  tabInactive.fills = [];
  if (sp8)  tabInactive.setBoundVariable('paddingTop', sp8);
  if (sp8)  tabInactive.setBoundVariable('paddingBottom', sp8);
  if (sp12) tabInactive.setBoundVariable('paddingLeft', sp12);
  if (sp12) tabInactive.setBoundVariable('paddingRight', sp12);
  tabRow.appendChild(tabInactive);
  tabInactive.layoutSizingHorizontal = 'FILL';

  const tabInactiveLabel = figma.createText();
  tabInactiveLabel.characters = 'Retirar';
  await tabInactiveLabel.setTextStyleIdAsync(styleCaption.id);
  tabInactiveLabel.fills = vFill(textSecondary);
  tabInactiveLabel.textAlignHorizontal = 'CENTER';
  tabInactive.appendChild(tabInactiveLabel);
  tabInactiveLabel.layoutSizingHorizontal = 'FILL';

  // Content (FILL)
  const content = figma.createFrame();
  content.name = 'Content';
  content.layoutMode = 'VERTICAL';
  content.primaryAxisSizingMode = 'AUTO';
  content.counterAxisSizingMode = 'FIXED';
  content.counterAxisAlignItems = 'CENTER';
  content.fills = [];
  screen.appendChild(content);
  content.layoutSizingHorizontal = 'FILL';
  content.layoutSizingVertical = 'FILL';
  if (sp24) content.setBoundVariable('paddingTop', sp24);
  if (sp20) content.setBoundVariable('paddingRight', sp20);
  if (sp16) content.setBoundVariable('paddingBottom', sp16);
  if (sp20) content.setBoundVariable('paddingLeft', sp20);
  if (sp24) content.setBoundVariable('itemSpacing', sp24);

  // Activo chip
  const chip = figma.createFrame();
  chip.name = 'Asset Chip';
  chip.layoutMode = 'HORIZONTAL';
  chip.primaryAxisSizingMode = 'AUTO';
  chip.counterAxisSizingMode = 'AUTO';
  chip.counterAxisAlignItems = 'CENTER';
  chip.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.69, b: 0.56 }, opacity: 0.12 }];
  chip.cornerRadius = 100;
  if (sp4)  chip.setBoundVariable('paddingTop', sp4);
  if (sp4)  chip.setBoundVariable('paddingBottom', sp4);
  if (sp12) chip.setBoundVariable('paddingLeft', sp12);
  if (sp12) chip.setBoundVariable('paddingRight', sp12);
  if (sp8)  chip.setBoundVariable('itemSpacing', sp8);
  content.appendChild(chip);

  const chipDot = figma.createEllipse();
  chipDot.resize(8, 8);
  chipDot.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.69, b: 0.56 } }];
  chip.appendChild(chipDot);

  const chipLabel = figma.createText();
  chipLabel.characters = 'USDT · Tienes 1,000.00';
  await chipLabel.setTextStyleIdAsync(styleCaption.id);
  chipLabel.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.69, b: 0.56 } }];
  chip.appendChild(chipLabel);

  // Amount display
  const amountArea = figma.createFrame();
  amountArea.name = 'Amount';
  amountArea.layoutMode = 'VERTICAL';
  amountArea.primaryAxisSizingMode = 'AUTO';
  amountArea.counterAxisSizingMode = 'AUTO';
  amountArea.counterAxisAlignItems = 'CENTER';
  amountArea.fills = [];
  if (sp8) amountArea.setBoundVariable('itemSpacing', sp8);
  content.appendChild(amountArea);

  const amountVal = figma.createText();
  amountVal.characters = '0 USDT';
  await amountVal.setTextStyleIdAsync(styleH3.id);
  amountVal.fills = vFill(textDisabled);
  amountArea.appendChild(amountVal);

  const amountEq = figma.createText();
  amountEq.characters = '≈ $0.00 USD';
  await amountEq.setTextStyleIdAsync(styleSubtitle.id);
  amountEq.fills = vFill(textSecondary);
  amountArea.appendChild(amountEq);

  // Quick amounts
  const quickAmts = figma.createFrame();
  quickAmts.name = 'Quick Amounts';
  quickAmts.layoutMode = 'HORIZONTAL';
  quickAmts.primaryAxisSizingMode = 'AUTO';
  quickAmts.counterAxisSizingMode = 'AUTO';
  quickAmts.counterAxisAlignItems = 'CENTER';
  quickAmts.fills = [];
  if (sp8) quickAmts.setBoundVariable('itemSpacing', sp8);
  content.appendChild(quickAmts);

  for (const amt of ['25%', '50%', '75%', 'Todo']) {
    const pill = figma.createFrame();
    pill.name = amt;
    pill.layoutMode = 'HORIZONTAL';
    pill.primaryAxisSizingMode = 'AUTO';
    pill.counterAxisSizingMode = 'AUTO';
    pill.counterAxisAlignItems = 'CENTER';
    pill.fills = vFill(cardFill);
    pill.cornerRadius = 100;
    if (sp4)  pill.setBoundVariable('paddingTop', sp4);
    if (sp4)  pill.setBoundVariable('paddingBottom', sp4);
    if (sp12) pill.setBoundVariable('paddingLeft', sp12);
    if (sp12) pill.setBoundVariable('paddingRight', sp12);
    quickAmts.appendChild(pill);

    const pillLabel = figma.createText();
    pillLabel.characters = amt;
    await pillLabel.setTextStyleIdAsync(styleCaption.id);
    pillLabel.fills = vFill(textSecondary);
    pill.appendChild(pillLabel);
  }

  // Summary mini
  const summary = figma.createFrame();
  summary.name = 'Summary';
  summary.layoutMode = 'HORIZONTAL';
  summary.primaryAxisSizingMode = 'AUTO';
  summary.counterAxisSizingMode = 'AUTO';
  summary.counterAxisAlignItems = 'CENTER';
  summary.primaryAxisAlignItems = 'SPACE_BETWEEN';
  summary.fills = vFill(cardFill);
  if (radiusMd) bindRadius(summary, radiusMd);
  if (sp12) summary.setBoundVariable('paddingTop', sp12);
  if (sp12) summary.setBoundVariable('paddingBottom', sp12);
  if (sp16) summary.setBoundVariable('paddingLeft', sp16);
  if (sp16) summary.setBoundVariable('paddingRight', sp16);
  content.appendChild(summary);
  summary.layoutSizingHorizontal = 'FILL';

  const summaryLeft = figma.createText();
  summaryLeft.characters = 'Recibirás en tu billetera';
  await summaryLeft.setTextStyleIdAsync(styleCaption.id);
  summaryLeft.fills = vFill(textSecondary);
  summary.appendChild(summaryLeft);

  const summaryRight = figma.createText();
  summaryRight.characters = '$0.00 USD';
  await summaryRight.setTextStyleIdAsync(styleCaption.id);
  summaryRight.fills = vFill(textPrimary);
  summary.appendChild(summaryRight);

  // Botón
  const btn = btnPrimaryComp.createInstance();
  content.appendChild(btn);
  btn.layoutSizingHorizontal = 'FILL';
  try { btn.setProperties({ 'Icon Left#34:8': false, 'Icon Right#34:7': false, 'State': 'Default', 'Style': 'Primary' }); } catch(e) {}
  const btnLbl = btn.findAllWithCriteria({ types: ['TEXT'] })[0];
  if (btnLbl) { await figma.loadFontAsync(btnLbl.fontName); btnLbl.characters = 'Vender USDT'; }

  // Teclado numérico — ABSOLUTE en bottom del screen
  const keyboard = keyboardComp.createInstance();
  screen.appendChild(keyboard);
  keyboard.layoutSizingHorizontal = 'FILL';
  keyboard.layoutPositioning = 'ABSOLUTE';
  keyboard.x = 0;
  keyboard.y = screen.height - keyboard.height;

  const homeInd = homeIndComp.createInstance();
  screen.appendChild(homeInd);
  homeInd.layoutSizingHorizontal = 'FILL';

  screen.x = 2520;
  screen.y = 0;
  figma.viewport.scrollAndZoomIntoView([screen]);
  figma.currentPage.selection = [screen];

  return { ok: true, id: screen.id, name: screen.name };
})()
