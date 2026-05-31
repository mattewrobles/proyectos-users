(async () => {
  // ── FASE 1: Navegar + limpiar ──────────────────────────────────────
  const page = figma.root.children.find(p => p.name.includes('Borrrador'));
  if (!page) return { error: 'Página no encontrada' };
  await page.loadAsync();
  await figma.setCurrentPageAsync(page);
  page.children.filter(n => n.name === 'W2 · Mis Activos · Con Saldo').forEach(n => n.remove());

  // ── FASE 2: Importar TODO ──────────────────────────────────────────
  await Promise.all([
    figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Bold' }),
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

  const [bgFg, cardFill, textPrimary, textSecondary, radiusXl] = await Promise.all([
    importVar('🧩 Tokens', 'Backgrounds/Foreground'),
    importVar('🧩 Tokens', 'Cards-Fills/Card'),
    importVar('🧩 Tokens', 'Text/Primary'),
    importVar('🧩 Tokens', 'Text/secondary'),
    importVar('⊙ Radius', 'Radius-xl'),
  ]);

  const [sbComp, backIconComp, homeIndComp, btnPrimaryComp] = await Promise.all([
    figma.importComponentByKeyAsync('222088d248a045f3d2e7df151f7d613bbda7fafd'),
    figma.importComponentByKeyAsync('d2e8133159142cb934d56fc28be3ac0bc7eb07b4'), // chevron-left (back)
    figma.importComponentByKeyAsync('e12f73d63ccef0537a22efd9a34228a9dc441bff'),
    figma.importComponentByKeyAsync('15be15cfa0d8c4667e4eb8f84bf80f9919e019c9'),
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

  // ── FASE 3: Helpers ────────────────────────────────────────────────
  function vFill(v) {
    return [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.1 },
      boundVariables: { color: { type: 'VARIABLE_ALIAS', id: v.id } } }];
  }
  function bindRadius(node, rv) {
    ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius']
      .forEach(c => node.setBoundVariable(c, rv));
  }
  // Color verde éxito (hardcoded solo para el badge de % — no hay token de success fill aquí)
  const greenFill = [{ type: 'SOLID', color: { r: 0.13, g: 0.77, b: 0.37 } }];
  const greenTextFill = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];

  // Helper: crear card de activo
  async function createAssetCard(parent, assetData) {
    const card = figma.createFrame();
    card.name = `Card · ${assetData.name}`;
    card.layoutMode = 'HORIZONTAL';
    card.primaryAxisSizingMode = 'AUTO';
    card.counterAxisSizingMode = 'AUTO';
    card.counterAxisAlignItems = 'CENTER';
    card.primaryAxisAlignItems = 'MIN';
    card.fills = vFill(cardFill);
    if (radiusXl) bindRadius(card, radiusXl);
    parent.appendChild(card);
    card.layoutSizingHorizontal = 'FILL';
    if (sp16) card.setBoundVariable('paddingTop', sp16);
    if (sp16) card.setBoundVariable('paddingRight', sp16);
    if (sp16) card.setBoundVariable('paddingBottom', sp16);
    if (sp16) card.setBoundVariable('paddingLeft', sp16);
    if (sp12) card.setBoundVariable('itemSpacing', sp12);

    // Ícono del activo (círculo placeholder)
    const iconCircle = figma.createFrame();
    iconCircle.name = 'Asset Icon';
    iconCircle.resize(44, 44);
    iconCircle.cornerRadius = 22;
    iconCircle.fills = [{ type: 'SOLID', color: assetData.iconColor }];
    card.appendChild(iconCircle);

    // Letra del activo dentro del círculo
    const iconLetter = figma.createText();
    iconLetter.characters = assetData.symbol;
    iconLetter.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    await iconLetter.setTextStyleIdAsync(styleCaption.id);
    iconLetter.textAlignHorizontal = 'CENTER';
    iconLetter.textAlignVertical = 'CENTER';
    iconCircle.appendChild(iconLetter);
    iconCircle.layoutMode = 'VERTICAL';
    iconCircle.counterAxisAlignItems = 'CENTER';
    iconCircle.primaryAxisAlignItems = 'CENTER';
    iconLetter.layoutSizingHorizontal = 'FILL';

    // Info del activo (columna)
    const info = figma.createFrame();
    info.name = 'Asset Info';
    info.layoutMode = 'VERTICAL';
    info.primaryAxisSizingMode = 'AUTO';
    info.counterAxisSizingMode = 'AUTO';
    info.fills = [];
    if (sp4) info.setBoundVariable('itemSpacing', sp4);
    card.appendChild(info);
    info.layoutSizingHorizontal = 'FILL';

    const assetName = figma.createText();
    assetName.characters = assetData.name;
    await assetName.setTextStyleIdAsync(styleSubtitle.id);
    assetName.fills = vFill(textPrimary);
    info.appendChild(assetName);

    const assetUnits = figma.createText();
    assetUnits.characters = assetData.units;
    await assetUnits.setTextStyleIdAsync(styleCaption.id);
    assetUnits.fills = vFill(textSecondary);
    info.appendChild(assetUnits);

    // Balance + badge (columna derecha)
    const balanceCol = figma.createFrame();
    balanceCol.name = 'Balance Col';
    balanceCol.layoutMode = 'VERTICAL';
    balanceCol.primaryAxisSizingMode = 'AUTO';
    balanceCol.counterAxisSizingMode = 'AUTO';
    balanceCol.counterAxisAlignItems = 'MAX';
    balanceCol.fills = [];
    if (sp4) balanceCol.setBoundVariable('itemSpacing', sp4);
    card.appendChild(balanceCol);

    const balanceText = figma.createText();
    balanceText.characters = assetData.balance;
    await balanceText.setTextStyleIdAsync(styleSubtitle.id);
    balanceText.fills = vFill(textPrimary);
    balanceCol.appendChild(balanceText);

    // Badge de cambio %
    const badge = figma.createFrame();
    badge.name = 'Change Badge';
    badge.layoutMode = 'HORIZONTAL';
    badge.primaryAxisSizingMode = 'AUTO';
    badge.counterAxisSizingMode = 'AUTO';
    badge.counterAxisAlignItems = 'CENTER';
    badge.fills = greenFill;
    badge.cornerRadius = 100;
    if (sp4) badge.setBoundVariable('paddingTop', sp4);
    if (sp4) badge.setBoundVariable('paddingBottom', sp4);
    if (sp8) badge.setBoundVariable('paddingLeft', sp8);
    if (sp8) badge.setBoundVariable('paddingRight', sp8);
    balanceCol.appendChild(badge);

    const changeText = figma.createText();
    changeText.characters = assetData.change;
    await changeText.setTextStyleIdAsync(styleCaption.id);
    changeText.fills = greenTextFill;
    badge.appendChild(changeText);

    return card;
  }

  // ── FASE 4: Construir screen ───────────────────────────────────────
  const screen = figma.createFrame();
  screen.name = 'W2 · Mis Activos · Con Saldo';
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

  // Nav: back icon + título
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
  if (sp8)  nav.setBoundVariable('paddingLeft', sp8);
  if (sp8)  nav.setBoundVariable('itemSpacing', sp8);

  const backIcon = backIconComp.createInstance();
  nav.appendChild(backIcon);

  const navTitle = figma.createText();
  navTitle.characters = 'Mis Activos';
  await navTitle.setTextStyleIdAsync(styleSubtitle.id);
  navTitle.fills = vFill(textPrimary);
  nav.appendChild(navTitle);

  // Total balance card
  const totalCard = figma.createFrame();
  totalCard.name = 'Total Balance Card';
  totalCard.layoutMode = 'VERTICAL';
  totalCard.primaryAxisSizingMode = 'AUTO';
  totalCard.counterAxisSizingMode = 'AUTO';
  totalCard.counterAxisAlignItems = 'MIN';
  totalCard.fills = vFill(cardFill);
  if (radiusXl) bindRadius(totalCard, radiusXl);
  screen.appendChild(totalCard);
  totalCard.layoutSizingHorizontal = 'FILL';
  if (sp16) totalCard.setBoundVariable('paddingTop', sp16);
  if (sp20) totalCard.setBoundVariable('paddingRight', sp20);
  if (sp16) totalCard.setBoundVariable('paddingBottom', sp16);
  if (sp20) totalCard.setBoundVariable('paddingLeft', sp20);
  if (sp8)  totalCard.setBoundVariable('itemSpacing', sp8);

  const totalLabel = figma.createText();
  totalLabel.characters = 'Valor total de tus activos';
  await totalLabel.setTextStyleIdAsync(styleCaption.id);
  totalLabel.fills = vFill(textSecondary);
  totalCard.appendChild(totalLabel);

  const totalAmount = figma.createText();
  totalAmount.characters = '$1,250.00 USD';
  await totalAmount.setTextStyleIdAsync(styleH3.id);
  totalAmount.fills = vFill(textPrimary);
  totalCard.appendChild(totalAmount);

  // Separador visual entre total y lista
  const spacer = figma.createFrame();
  spacer.name = 'Spacer';
  spacer.resize(393, 0);
  spacer.fills = [];
  screen.appendChild(spacer);
  spacer.layoutSizingHorizontal = 'FILL';
  if (sp16) spacer.setBoundVariable('paddingBottom', sp16);

  // Lista de activos
  const assetList = figma.createFrame();
  assetList.name = 'Asset List';
  assetList.layoutMode = 'VERTICAL';
  assetList.primaryAxisSizingMode = 'AUTO';
  assetList.counterAxisSizingMode = 'AUTO';
  assetList.fills = [];
  screen.appendChild(assetList);
  assetList.layoutSizingHorizontal = 'FILL';
  assetList.layoutSizingVertical = 'FILL';
  if (sp20) assetList.setBoundVariable('paddingLeft', sp20);
  if (sp20) assetList.setBoundVariable('paddingRight', sp20);
  if (sp12) assetList.setBoundVariable('itemSpacing', sp12);

  // Label sección
  const sectionLabel = figma.createText();
  sectionLabel.characters = 'Tus activos';
  await sectionLabel.setTextStyleIdAsync(styleCaption.id);
  sectionLabel.fills = vFill(textSecondary);
  assetList.appendChild(sectionLabel);

  // Card USDT
  await createAssetCard(assetList, {
    name: 'USDT · Tether',
    symbol: '$',
    iconColor: { r: 0.1, g: 0.69, b: 0.56 }, // Tether green
    units: '1,000.00 USDT',
    balance: '$1,000.00',
    change: '+0.01%',
  });

  // Card Oro
  await createAssetCard(assetList, {
    name: 'Oro · Paxos Gold',
    symbol: 'Au',
    iconColor: { r: 0.85, g: 0.65, b: 0.13 }, // Gold
    units: '0.13 PAXG',
    balance: '$250.00',
    change: '+1.24%',
  });

  // Botón: Comprar más
  const btnArea = figma.createFrame();
  btnArea.name = 'CTA Area';
  btnArea.layoutMode = 'VERTICAL';
  btnArea.primaryAxisSizingMode = 'AUTO';
  btnArea.counterAxisSizingMode = 'AUTO';
  btnArea.fills = [];
  screen.appendChild(btnArea);
  btnArea.layoutSizingHorizontal = 'FILL';
  if (sp20) btnArea.setBoundVariable('paddingLeft', sp20);
  if (sp20) btnArea.setBoundVariable('paddingRight', sp20);
  if (sp16) btnArea.setBoundVariable('paddingTop', sp16);
  if (sp16) btnArea.setBoundVariable('paddingBottom', sp16);

  const btn = btnPrimaryComp.createInstance();
  btnArea.appendChild(btn);
  btn.layoutSizingHorizontal = 'FILL';
  try {
    btn.setProperties({
      'Icon Left#34:8':  false,
      'Icon Right#34:7': false,
      'State': 'Default',
      'Style': 'Primary',
    });
  } catch(e) {}
  const btnLabel = btn.findAllWithCriteria({ types: ['TEXT'] })[0];
  if (btnLabel) {
    await figma.loadFontAsync(btnLabel.fontName);
    btnLabel.characters = 'Comprar más activos';
  }

  // Home Indicator
  const homeInd = homeIndComp.createInstance();
  screen.appendChild(homeInd);
  homeInd.layoutSizingHorizontal = 'FILL';

  screen.x = 420;
  screen.y = 0;
  figma.viewport.scrollAndZoomIntoView([screen]);
  figma.currentPage.selection = [screen];

  return { ok: true, id: screen.id, name: screen.name };
})()
