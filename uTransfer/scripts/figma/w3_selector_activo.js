(async () => {
  // ── FASE 1: Navegar + limpiar ──────────────────────────────────────
  const page = figma.root.children.find(p => p.name.includes('Borrrador'));
  if (!page) return { error: 'Página no encontrada' };
  await page.loadAsync();
  await figma.setCurrentPageAsync(page);
  page.children.filter(n => n.name === 'W3 · Selector de Activo').forEach(n => n.remove());

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

  const [bgFg, cardFill, textPrimary, textSecondary, radiusXl, radius2xl] = await Promise.all([
    importVar('🧩 Tokens', 'Backgrounds/Foreground'),
    importVar('🧩 Tokens', 'Cards-Fills/Card'),
    importVar('🧩 Tokens', 'Text/Primary'),
    importVar('🧩 Tokens', 'Text/secondary'),
    importVar('⊙ Radius', 'Radius-xl'),
    importVar('⊙ Radius', 'Radius-2xl'),
  ]);

  const [sbComp, backBtnComp, homeIndComp, arrowLeftComp] = await Promise.all([
    figma.importComponentByKeyAsync('222088d248a045f3d2e7df151f7d613bbda7fafd'), // Status bar
    figma.importComponentByKeyAsync('7515e90c855608f6eff63373412d91bbc3053c1b'), // Button Medium Clear Icons-only (back)
    figma.importComponentByKeyAsync('e12f73d63ccef0537a22efd9a34228a9dc441bff'), // Home Indicator
    figma.importComponentByKeyAsync('724c4df8223320936be5babe9e6a0100060f7fa9'), // arrow-small-left
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

  // Helper: crear selector card de activo
  async function createSelectorCard(parent, asset) {
    const card = figma.createFrame();
    card.name = `Selector · ${asset.name}`;
    card.layoutMode = 'HORIZONTAL';
    card.primaryAxisSizingMode = 'AUTO';
    card.counterAxisSizingMode = 'AUTO';
    card.counterAxisAlignItems = 'CENTER';
    card.fills = vFill(cardFill);
    if (radiusXl) bindRadius(card, radiusXl);
    parent.appendChild(card);
    card.layoutSizingHorizontal = 'FILL';
    if (sp20) card.setBoundVariable('paddingTop', sp20);
    if (sp20) card.setBoundVariable('paddingRight', sp20);
    if (sp20) card.setBoundVariable('paddingBottom', sp20);
    if (sp20) card.setBoundVariable('paddingLeft', sp20);
    if (sp16) card.setBoundVariable('itemSpacing', sp16);

    // Ícono
    const iconCircle = figma.createFrame();
    iconCircle.name = 'Icon';
    iconCircle.resize(52, 52);
    iconCircle.cornerRadius = 26;
    iconCircle.fills = [{ type: 'SOLID', color: asset.iconBg }];
    iconCircle.layoutMode = 'VERTICAL';
    iconCircle.counterAxisAlignItems = 'CENTER';
    iconCircle.primaryAxisAlignItems = 'CENTER';
    card.appendChild(iconCircle);

    const iconLetter = figma.createText();
    iconLetter.characters = asset.symbol;
    iconLetter.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    await iconLetter.setTextStyleIdAsync(styleSubtitle.id);
    iconLetter.textAlignHorizontal = 'CENTER';
    iconCircle.appendChild(iconLetter);

    // Info
    const info = figma.createFrame();
    info.name = 'Info';
    info.layoutMode = 'VERTICAL';
    info.primaryAxisSizingMode = 'AUTO';
    info.counterAxisSizingMode = 'AUTO';
    info.fills = [];
    if (sp4) info.setBoundVariable('itemSpacing', sp4);
    card.appendChild(info);
    info.layoutSizingHorizontal = 'FILL';

    const nameText = figma.createText();
    nameText.characters = asset.name;
    await nameText.setTextStyleIdAsync(styleSubtitle.id);
    nameText.fills = vFill(textPrimary);
    info.appendChild(nameText);

    const descText = figma.createText();
    descText.characters = asset.description;
    await descText.setTextStyleIdAsync(styleCaption.id);
    descText.fills = vFill(textSecondary);
    info.appendChild(descText);

    // Precio actual
    const priceText = figma.createText();
    priceText.characters = asset.price;
    await priceText.setTextStyleIdAsync(styleCaption.id);
    priceText.fills = vFill(textSecondary);
    info.appendChild(priceText);

    // Flecha derecha
    const arrow = figma.createText();
    arrow.characters = '›';
    await arrow.setTextStyleIdAsync(styleH5.id);
    arrow.fills = vFill(textSecondary);
    card.appendChild(arrow);

    return card;
  }

  // ── FASE 4: Construir screen ───────────────────────────────────────
  const screen = figma.createFrame();
  screen.name = 'W3 · Selector de Activo';
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

  // Nav: botón back + título
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

  const backBtn = backBtnComp.createInstance();
  nav.appendChild(backBtn);
  // Swap icono a arrow-small-left (el componente tiene arrow-small-up por defecto)
  const iconInst = backBtn.findAll(n => n.type === 'INSTANCE')[0];
  if (iconInst) iconInst.swapComponent(arrowLeftComp);

  const navTitle = figma.createText();
  navTitle.characters = 'Comprar activo';
  await navTitle.setTextStyleIdAsync(styleSubtitle.id);
  navTitle.fills = vFill(textPrimary);
  nav.appendChild(navTitle);

  // Encabezado / pregunta
  const headArea = figma.createFrame();
  headArea.name = 'Head';
  headArea.layoutMode = 'VERTICAL';
  headArea.primaryAxisSizingMode = 'AUTO';
  headArea.counterAxisSizingMode = 'AUTO';
  headArea.fills = [];
  screen.appendChild(headArea);
  headArea.layoutSizingHorizontal = 'FILL';
  if (sp24) headArea.setBoundVariable('paddingTop', sp24);
  if (sp20) headArea.setBoundVariable('paddingRight', sp20);
  if (sp16) headArea.setBoundVariable('paddingBottom', sp16);
  if (sp20) headArea.setBoundVariable('paddingLeft', sp20);
  if (sp8)  headArea.setBoundVariable('itemSpacing', sp8);

  const question = figma.createText();
  question.characters = '¿Qué quieres comprar?';
  await question.setTextStyleIdAsync(styleH3.id);
  question.fills = vFill(textPrimary);
  headArea.appendChild(question);

  const subtitle = figma.createText();
  subtitle.characters = 'Elige el activo que quieres añadir a tu billetera.';
  await subtitle.setTextStyleIdAsync(styleSubtitle.id);
  subtitle.fills = vFill(textSecondary);
  headArea.appendChild(subtitle);

  // Lista de opciones
  const optionList = figma.createFrame();
  optionList.name = 'Options';
  optionList.layoutMode = 'VERTICAL';
  optionList.primaryAxisSizingMode = 'AUTO';
  optionList.counterAxisSizingMode = 'AUTO';
  optionList.fills = [];
  screen.appendChild(optionList);
  optionList.layoutSizingHorizontal = 'FILL';
  if (sp20) optionList.setBoundVariable('paddingLeft', sp20);
  if (sp20) optionList.setBoundVariable('paddingRight', sp20);
  if (sp12) optionList.setBoundVariable('itemSpacing', sp12);

  await createSelectorCard(optionList, {
    name: 'USDT · Tether',
    symbol: '$',
    iconBg: { r: 0.1, g: 0.69, b: 0.56 },
    description: 'Dólar digital estable, siempre vale 1 USD',
    price: '1 USDT = $1.00 USD',
  });

  await createSelectorCard(optionList, {
    name: 'Oro · Paxos Gold',
    symbol: 'Au',
    iconBg: { r: 0.85, g: 0.65, b: 0.13 },
    description: 'Respaldado por oro físico en bóvedas Brink\'s',
    price: '1 PAXG = $1,923.40 USD',
  });

  // Posicionar
  screen.x = 840;
  screen.y = 0;
  figma.viewport.scrollAndZoomIntoView([screen]);
  figma.currentPage.selection = [screen];

  return { ok: true, id: screen.id, name: screen.name };
})()
