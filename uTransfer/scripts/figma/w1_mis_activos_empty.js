(async () => {
  // ── FASE 1: Navegar a página + limpiar ─────────────────────────────
  const page = figma.root.children.find(p => p.name.includes('Borrrador'));
  if (!page) return { error: 'Página no encontrada' };
  await page.loadAsync();
  await figma.setCurrentPageAsync(page);

  // Limpiar frames W1 anteriores
  page.children.filter(n => n.name === 'W1 · Mis Activos · Vacío').forEach(n => n.remove());

  // ── FASE 2: Importar TODO antes de crear nodos ─────────────────────

  // Fuentes
  await Promise.all([
    figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Bold' }),
  ]);

  // Spacing tokens (IDs directos desde CLAUDE.md)
  const spacingIds = {
    8:  'VariableID:c5eb1187ed05c87e0390d6245983d582fe4f8728/40006136:104',
    12: 'VariableID:6a12f53ee51dc9af1f5c95a6108169f48bef89d1/40006136:105',
    16: 'VariableID:fc630c4b3648e68ab3fc1f74a76dc49f812f7bda/40006136:106',
    20: 'VariableID:c0ea2be6cafced44153f35cd1a2e79b1d092e5b9/40006136:107',
    24: 'VariableID:12f7f87e25374c4dd6b48d3d90aadf75606fbf1b/40006136:108',
  };
  async function sp(px) {
    return await figma.variables.getVariableByIdAsync(spacingIds[px]);
  }

  // Color tokens
  const allCols = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
  async function importVar(colName, varName) {
    const col = allCols.find(c => c.name === colName);
    if (!col) return null;
    const vars = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(col.key);
    const v = vars.find(v => v.name === varName);
    return v ? await figma.variables.importVariableByKeyAsync(v.key) : null;
  }

  const [bgFg, textPrimary, textSecondary] = await Promise.all([
    importVar('🧩 Tokens', 'Backgrounds/Foreground'),
    importVar('🧩 Tokens', 'Text/Primary'),
    importVar('🧩 Tokens', 'Text/secondary'),
  ]);

  // Componentes del DS
  const [sbComp, backIconComp, homeIndComp, btnPrimaryComp, illustComp] = await Promise.all([
    figma.importComponentByKeyAsync('222088d248a045f3d2e7df151f7d613bbda7fafd'), // Status bar · Light
    figma.importComponentByKeyAsync('d2e8133159142cb934d56fc28be3ac0bc7eb07b4'), // chevron-left (back)
    figma.importComponentByKeyAsync('e12f73d63ccef0537a22efd9a34228a9dc441bff'), // Home Indicator
    figma.importComponentByKeyAsync('15be15cfa0d8c4667e4eb8f84bf80f9919e019c9'), // Button Giant Primary
    figma.importComponentByKeyAsync('b2f3e10b80c3cbb1bfd1532a86e9869dcd1e154e'), // Ilustración Not Found
  ]);

  // Text styles
  const [styleH5, styleSubtitle] = await Promise.all([
    figma.importStyleByKeyAsync('a761967b66cd94663df9cacbe06c32f68b48b7e7'), // Headers/H5 · 20px
    figma.importStyleByKeyAsync('df46c8797813b902f6164fa2ea73a2e58e0b13df'), // Subtitle/Subtitle M · 16px
  ]);

  // Cargar spacing tokens
  const [sp8, sp12, sp16, sp20, sp24] = await Promise.all([
    sp(8), sp(12), sp(16), sp(20), sp(24)
  ]);

  // ── FASE 3: Helpers ────────────────────────────────────────────────
  function vFill(v) {
    return [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.1 },
      boundVariables: { color: { type: 'VARIABLE_ALIAS', id: v.id } } }];
  }

  // ── FASE 4: Construir nodos ────────────────────────────────────────

  // Screen principal 393×852
  const screen = figma.createFrame();
  screen.name = 'W1 · Mis Activos · Vacío';
  screen.resize(393, 852);
  screen.layoutMode = 'VERTICAL';
  screen.primaryAxisSizingMode = 'FIXED';
  screen.counterAxisSizingMode = 'FIXED';
  screen.primaryAxisAlignItems = 'MIN';
  screen.counterAxisAlignItems = 'MIN';
  screen.fills = vFill(bgFg);
  screen.itemSpacing = 0;

  // Status bar (siempre primero)
  const statusBar = sbComp.createInstance();
  screen.appendChild(statusBar);
  statusBar.layoutSizingHorizontal = 'FILL';

  // Nav: back icon + título centrado
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

  // Empty state: ocupa el espacio restante
  const emptyArea = figma.createFrame();
  emptyArea.name = 'Empty State';
  emptyArea.layoutMode = 'VERTICAL';
  emptyArea.primaryAxisSizingMode = 'AUTO';
  emptyArea.counterAxisSizingMode = 'FIXED';
  emptyArea.counterAxisAlignItems = 'CENTER';
  emptyArea.primaryAxisAlignItems = 'CENTER';
  emptyArea.fills = [];
  screen.appendChild(emptyArea);
  emptyArea.layoutSizingHorizontal = 'FILL';
  emptyArea.layoutSizingVertical = 'FILL';
  if (sp24) emptyArea.setBoundVariable('paddingTop', sp24);
  if (sp24) emptyArea.setBoundVariable('paddingRight', sp24);
  if (sp24) emptyArea.setBoundVariable('paddingBottom', sp24);
  if (sp24) emptyArea.setBoundVariable('paddingLeft', sp24);
  if (sp24) emptyArea.setBoundVariable('itemSpacing', sp24);

  // Ilustración
  const illust = illustComp.createInstance();
  emptyArea.appendChild(illust);
  illust.resize(180, 180);

  // Título empty state
  const emptyTitle = figma.createText();
  emptyTitle.characters = 'Aún no tienes activos';
  await emptyTitle.setTextStyleIdAsync(styleH5.id);
  emptyTitle.fills = vFill(textPrimary);
  emptyTitle.textAlignHorizontal = 'CENTER';
  emptyArea.appendChild(emptyTitle);
  emptyTitle.layoutSizingHorizontal = 'FILL';

  // Descripción
  const emptyDesc = figma.createText();
  emptyDesc.characters = 'Compra USDT o Oro y empieza a guardar y hacer crecer tu dinero.';
  await emptyDesc.setTextStyleIdAsync(styleSubtitle.id);
  emptyDesc.fills = vFill(textSecondary);
  emptyDesc.textAlignHorizontal = 'CENTER';
  emptyArea.appendChild(emptyDesc);
  emptyDesc.layoutSizingHorizontal = 'FILL';

  // Botón CTA
  const btn = btnPrimaryComp.createInstance();
  emptyArea.appendChild(btn);
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
    btnLabel.characters = 'Comprar mi primer activo';
  }

  // Home Indicator
  const homeInd = homeIndComp.createInstance();
  screen.appendChild(homeInd);
  homeInd.layoutSizingHorizontal = 'FILL';

  // Posicionar y seleccionar
  screen.x = 0;
  screen.y = 0;
  figma.viewport.scrollAndZoomIntoView([screen]);
  figma.currentPage.selection = [screen];

  return { ok: true, id: screen.id, size: { w: screen.width, h: screen.height } };
})()
