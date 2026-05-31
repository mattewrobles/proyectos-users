(async () => {
  // ── FASE 1: Navegar + limpiar ──────────────────────────────────────
  const page = figma.root.children.find(p => p.name.includes('Borrrador'));
  if (!page) return { error: 'Página no encontrada' };
  await page.loadAsync();
  await figma.setCurrentPageAsync(page);
  page.children.filter(n => n.name === 'W4 · Comprar USDT').forEach(n => n.remove());

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

  const [bgFg, cardFill, genInput, textPrimary, textSecondary, textDisabled, radiusMd, radiusXl] = await Promise.all([
    importVar('🧩 Tokens', 'Backgrounds/Foreground'),
    importVar('🧩 Tokens', 'Cards-Fills/Card'),
    importVar('🧩 Tokens', 'Generals/Input'),
    importVar('🧩 Tokens', 'Text/Primary'),
    importVar('🧩 Tokens', 'Text/secondary'),
    importVar('🧩 Tokens', 'Text/disabled'),
    importVar('⊙ Radius', 'Radius-md'),
    importVar('⊙ Radius', 'Radius-xl'),
  ]);

  const [sbComp, homeIndComp, btnPrimaryComp, inputComp, keyboardComp] = await Promise.all([
    figma.importComponentByKeyAsync('222088d248a045f3d2e7df151f7d613bbda7fafd'),
    figma.importComponentByKeyAsync('e12f73d63ccef0537a22efd9a34228a9dc441bff'),
    figma.importComponentByKeyAsync('15be15cfa0d8c4667e4eb8f84bf80f9919e019c9'),
    figma.importComponentByKeyAsync('85a6f7f74d08b5dbc46d9593345f458eca417bff'), // Input Default Large
    figma.importComponentByKeyAsync('9c1814d08f64b86d94c0280b4bc16ae550d1e1a9'), // Keyboard numeric
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

  // ── FASE 4: Build ──────────────────────────────────────────────────
  const screen = figma.createFrame();
  screen.name = 'W4 · Comprar USDT';
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
  nav.primaryAxisAlignItems = 'MIN';
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
  navTitle.characters = 'Comprar USDT';
  await navTitle.setTextStyleIdAsync(styleSubtitle.id);
  navTitle.fills = vFill(textPrimary);
  nav.appendChild(navTitle);

  // Content area (expands)
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

  // Asset label
  const assetChip = figma.createFrame();
  assetChip.name = 'Asset Chip';
  assetChip.layoutMode = 'HORIZONTAL';
  assetChip.primaryAxisSizingMode = 'AUTO';
  assetChip.counterAxisSizingMode = 'AUTO';
  assetChip.counterAxisAlignItems = 'CENTER';
  assetChip.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.69, b: 0.56 }, opacity: 0.12 }];
  assetChip.cornerRadius = 100;
  if (sp4)  assetChip.setBoundVariable('paddingTop', sp4);
  if (sp4)  assetChip.setBoundVariable('paddingBottom', sp4);
  if (sp12) assetChip.setBoundVariable('paddingLeft', sp12);
  if (sp12) assetChip.setBoundVariable('paddingRight', sp12);
  if (sp8)  assetChip.setBoundVariable('itemSpacing', sp8);
  content.appendChild(assetChip);

  // Dot
  const dot = figma.createEllipse();
  dot.resize(8, 8);
  dot.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.69, b: 0.56 } }];
  assetChip.appendChild(dot);

  const chipLabel = figma.createText();
  chipLabel.characters = 'USDT · Tether';
  await chipLabel.setTextStyleIdAsync(styleCaption.id);
  chipLabel.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.69, b: 0.56 } }];
  assetChip.appendChild(chipLabel);

  // Amount display (big)
  const amountArea = figma.createFrame();
  amountArea.name = 'Amount Display';
  amountArea.layoutMode = 'VERTICAL';
  amountArea.primaryAxisSizingMode = 'AUTO';
  amountArea.counterAxisSizingMode = 'AUTO';
  amountArea.counterAxisAlignItems = 'CENTER';
  amountArea.fills = [];
  if (sp8) amountArea.setBoundVariable('itemSpacing', sp8);
  content.appendChild(amountArea);

  const amountValue = figma.createText();
  amountValue.characters = '$0.00';
  await amountValue.setTextStyleIdAsync(styleH3.id);
  amountValue.fills = vFill(textDisabled);
  amountArea.appendChild(amountValue);

  const amountHint = figma.createText();
  amountHint.characters = '0 USDT';
  await amountHint.setTextStyleIdAsync(styleSubtitle.id);
  amountHint.fills = vFill(textSecondary);
  amountArea.appendChild(amountHint);

  // Balance disponible info
  const balanceInfo = figma.createFrame();
  balanceInfo.name = 'Balance Info';
  balanceInfo.layoutMode = 'HORIZONTAL';
  balanceInfo.primaryAxisSizingMode = 'AUTO';
  balanceInfo.counterAxisSizingMode = 'AUTO';
  balanceInfo.counterAxisAlignItems = 'CENTER';
  balanceInfo.fills = vFill(cardFill);
  if (radiusMd) bindRadius(balanceInfo, radiusMd);
  if (sp8)  balanceInfo.setBoundVariable('paddingTop', sp8);
  if (sp8)  balanceInfo.setBoundVariable('paddingBottom', sp8);
  if (sp16) balanceInfo.setBoundVariable('paddingLeft', sp16);
  if (sp16) balanceInfo.setBoundVariable('paddingRight', sp16);
  if (sp8)  balanceInfo.setBoundVariable('itemSpacing', sp8);
  content.appendChild(balanceInfo);

  const balLabel = figma.createText();
  balLabel.characters = 'Saldo disponible:';
  await balLabel.setTextStyleIdAsync(styleCaption.id);
  balLabel.fills = vFill(textSecondary);
  balanceInfo.appendChild(balLabel);

  const balAmount = figma.createText();
  balAmount.characters = '$450.00 USD';
  await balAmount.setTextStyleIdAsync(styleCaption.id);
  balAmount.fills = vFill(textPrimary);
  balanceInfo.appendChild(balAmount);

  // Botón continuar
  const btn = btnPrimaryComp.createInstance();
  content.appendChild(btn);
  btn.layoutSizingHorizontal = 'FILL';
  try {
    btn.setProperties({
      'Icon Left#34:8':  false,
      'Icon Right#34:7': false,
      'State': 'Default',
      'Style': 'Primary',
    });
  } catch(e) {}
  const btnLabel2 = btn.findAllWithCriteria({ types: ['TEXT'] })[0];
  if (btnLabel2) {
    await figma.loadFontAsync(btnLabel2.fontName);
    btnLabel2.characters = 'Continuar';
  }

  // Teclado numérico — ABSOLUTE en bottom del screen
  const keyboard = keyboardComp.createInstance();
  screen.appendChild(keyboard);
  keyboard.layoutSizingHorizontal = 'FILL';
  keyboard.layoutPositioning = 'ABSOLUTE';
  keyboard.x = 0;
  keyboard.y = screen.height - keyboard.height;

  // Home Indicator
  const homeInd = homeIndComp.createInstance();
  screen.appendChild(homeInd);
  homeInd.layoutSizingHorizontal = 'FILL';

  screen.x = 1260;
  screen.y = 0;
  figma.viewport.scrollAndZoomIntoView([screen]);
  figma.currentPage.selection = [screen];

  return { ok: true, id: screen.id, name: screen.name };
})()
