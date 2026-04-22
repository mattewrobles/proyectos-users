(async () => {
  // ── FASE 1: Cargar páginas y recursos ─────────────────────────────
  const homePage    = figma.root.children.find(p => p.name.includes('Home - Operaciones'));
  const borrrPage   = figma.root.children.find(p => p.name.includes('Borrrador'));
  if (!homePage || !borrrPage) return { error: 'página no encontrada' };

  await homePage.loadAsync();
  await figma.setCurrentPageAsync(homePage);

  const realHome = await figma.getNodeByIdAsync('2549:119708');
  if (!realHome) return { error: 'Home frame no encontrado' };

  // Limpiar versiones anteriores en la página destino
  await borrrPage.loadAsync();
  borrrPage.children.filter(n => n.name === 'Home · Con Activos').forEach(n => n.remove());

  // ── FASE 2: Clonar el Home real ───────────────────────────────────
  const clone = realHome.clone();
  clone.name = 'Home · Con Activos';

  // Mover al borrador
  await figma.setCurrentPageAsync(borrrPage);
  borrrPage.appendChild(clone);

  // Posicionar fuera de los otros frames existentes
  clone.x = -440;
  clone.y = 0;

  // ── FASE 3: Encontrar el frame de contenido y agregar Mis Activos ──
  // El contenido está en Frame 2147224543 (content frame, x:20, y:130 en el original)
  // Buscamos por posición/nombre
  const contentFrame = clone.children.find(c =>
    c.layoutMode === 'VERTICAL' && c.width > 350 && c.width < 380 && c.height > 700
  );

  if (!contentFrame) {
    figma.viewport.scrollAndZoomIntoView([clone]);
    return { ok: true, note: 'clone ok, content frame no encontrado para widget', id: clone.id };
  }

  // Los hijos del content frame son (en orden):
  // [0] balance+actions glass card (~186px)
  // [1] carousel cards (~129px)
  // [2] recent activity card (~301px)

  const [balCard, carouselFrame, recentCard] = contentFrame.children;

  // ── FASE 4: Crear la sección "Mis Activos" ────────────────────────
  await Promise.all([
    figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' }),
  ]);

  // Importar tokens necesarios
  const allCols = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
  async function importVar(colName, varName) {
    const col = allCols.find(c => c.name === colName);
    if (!col) return null;
    const vars = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(col.key);
    const v = vars.find(v => v.name === varName);
    return v ? await figma.variables.importVariableByKeyAsync(v.key) : null;
  }

  const spacingIds = {
    4:  'VariableID:a76ac5afaf32fc7db440de629558bd67512ab705/40006136:103',
    8:  'VariableID:c5eb1187ed05c87e0390d6245983d582fe4f8728/40006136:104',
    12: 'VariableID:6a12f53ee51dc9af1f5c95a6108169f48bef89d1/40006136:105',
    16: 'VariableID:fc630c4b3648e68ab3fc1f74a76dc49f812f7bda/40006136:106',
  };
  async function sp(px) { return await figma.variables.getVariableByIdAsync(spacingIds[px]); }

  const [cardFill, cardNormal, textPrimary, textSecondary, radiusXl, sp4, sp8, sp12, sp16] = await Promise.all([
    importVar('🧩 Tokens', 'Cards-Fills/Card'),
    importVar('🧩 Tokens', 'Cards-Fills/Normal/Primary'),
    importVar('🧩 Tokens', 'Text/Primary'),
    importVar('🧩 Tokens', 'Text/secondary'),
    importVar('⊙ Radius', 'Radius-xl'),
    sp(4), sp(8), sp(12), sp(16),
  ]);

  const [styleSubtitle, styleCaption] = await Promise.all([
    figma.importStyleByKeyAsync('df46c8797813b902f6164fa2ea73a2e58e0b13df'),
    figma.importStyleByKeyAsync('3c4a22b5a0d0e65480fea3cbc965b935ee9a610c'),
  ]);

  function vFill(v) {
    return [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.1 },
      boundVariables: { color: { type: 'VARIABLE_ALIAS', id: v.id } } }];
  }
  function bindRadius(node, rv) {
    ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius']
      .forEach(c => node.setBoundVariable(c, rv));
  }

  // Sección "Mis Activos" — frame contenedor
  const activosSection = figma.createFrame();
  activosSection.name = 'Mis Activos Widget';
  activosSection.layoutMode = 'VERTICAL';
  activosSection.primaryAxisSizingMode = 'AUTO';
  activosSection.counterAxisSizingMode = 'FIXED';
  activosSection.resize(contentFrame.width, 10);
  activosSection.fills = [];
  activosSection.setBoundVariable && sp12 && activosSection.setBoundVariable('itemSpacing', sp12);

  // Header: "Mis activos" + "Ver todo →"
  const hdr = figma.createFrame();
  hdr.name = 'Activos Header'; hdr.layoutMode = 'HORIZONTAL';
  hdr.primaryAxisSizingMode = 'AUTO'; hdr.counterAxisSizingMode = 'AUTO';
  hdr.primaryAxisAlignItems = 'SPACE_BETWEEN'; hdr.counterAxisAlignItems = 'CENTER';
  hdr.fills = [];
  activosSection.appendChild(hdr);
  hdr.layoutSizingHorizontal = 'FILL';

  const lblActivos = figma.createText();
  lblActivos.characters = 'Mis activos';
  await lblActivos.setTextStyleIdAsync(styleSubtitle.id);
  if (textPrimary) lblActivos.fills = vFill(textPrimary);
  hdr.appendChild(lblActivos);

  const lblVerTodo = figma.createText();
  lblVerTodo.characters = 'Ver todo →';
  await lblVerTodo.setTextStyleIdAsync(styleCaption.id);
  if (textSecondary) lblVerTodo.fills = vFill(textSecondary);
  hdr.appendChild(lblVerTodo);

  // Row de mini-cards
  const cardsRow = figma.createFrame();
  cardsRow.name = 'Asset Cards Row'; cardsRow.layoutMode = 'HORIZONTAL';
  cardsRow.primaryAxisSizingMode = 'AUTO'; cardsRow.counterAxisSizingMode = 'AUTO';
  cardsRow.counterAxisAlignItems = 'MIN';
  cardsRow.fills = [];
  if (sp12) cardsRow.setBoundVariable('itemSpacing', sp12);
  activosSection.appendChild(cardsRow);

  // Helper mini-card — sin FILL en parents AUTO
  async function miniCard(parent, asset) {
    const card = figma.createFrame();
    card.name = `Mini·${asset.name}`; card.layoutMode = 'VERTICAL';
    card.counterAxisSizingMode = 'FIXED';
    card.resize(163, 10);
    card.primaryAxisSizingMode = 'AUTO'; // DESPUÉS de resize para no resetear
    if (cardFill) card.fills = vFill(cardFill);
    if (radiusXl) bindRadius(card, radiusXl);
    if (sp12) {
      card.paddingTop = 12; card.paddingRight = 12;
      card.paddingBottom = 12; card.paddingLeft = 12;
    }
    if (sp8) card.itemSpacing = 8;
    parent.appendChild(card);

    // Top row: dot + symbol (no FILL en primaryAxis AUTO)
    const topRow = figma.createFrame();
    topRow.name = 'Top'; topRow.layoutMode = 'HORIZONTAL';
    topRow.primaryAxisSizingMode = 'AUTO'; topRow.counterAxisSizingMode = 'AUTO';
    topRow.counterAxisAlignItems = 'CENTER'; topRow.fills = [];
    topRow.itemSpacing = 6;
    card.appendChild(topRow);
    topRow.layoutSizingHorizontal = 'FILL';

    const dot = figma.createEllipse(); dot.resize(8, 8);
    dot.fills = [{ type: 'SOLID', color: asset.color }];
    topRow.appendChild(dot);

    const sym = figma.createText(); sym.characters = asset.symbol;
    await sym.setTextStyleIdAsync(styleCaption.id);
    if (textSecondary) sym.fills = vFill(textSecondary);
    topRow.appendChild(sym);
    // NO FILL en horizontal — parent AUTO

    // Balance
    const bal = figma.createText(); bal.characters = asset.balance;
    await bal.setTextStyleIdAsync(styleSubtitle.id);
    if (textPrimary) bal.fills = vFill(textPrimary);
    card.appendChild(bal);

    // Change badge
    const badge = figma.createFrame();
    badge.name = 'Change'; badge.layoutMode = 'HORIZONTAL';
    badge.primaryAxisSizingMode = 'AUTO'; badge.counterAxisSizingMode = 'AUTO';
    badge.counterAxisAlignItems = 'CENTER';
    badge.fills = [{ type: 'SOLID', color: { r: 0.13, g: 0.77, b: 0.37 }, opacity: 0.15 }];
    badge.cornerRadius = 100;
    badge.paddingTop = 4; badge.paddingBottom = 4;
    badge.paddingLeft = 8; badge.paddingRight = 8;
    card.appendChild(badge);

    const chg = figma.createText(); chg.characters = asset.change;
    await chg.setTextStyleIdAsync(styleCaption.id);
    chg.fills = [{ type: 'SOLID', color: { r: 0.07, g: 0.58, b: 0.27 } }];
    badge.appendChild(chg);

    return card;
  }

  await miniCard(cardsRow, {
    name: 'USDT', symbol: 'Tether · USDT',
    color: { r: 0.1, g: 0.69, b: 0.56 }, balance: '$1,000.00', change: '+0.01%'
  });
  await miniCard(cardsRow, {
    name: 'Oro', symbol: 'Oro · XAU',
    color: { r: 0.85, g: 0.65, b: 0.13 }, balance: '$250.00', change: '+1.24%'
  });

  // ── FASE 5: Insertar sección en el flujo de auto-layout ────────────
  // contentFrame usa layoutMode VERTICAL — no mover hijos con .y,
  // dejar que el auto-layout posicione todo.
  const balIdx = contentFrame.children.indexOf(balCard);
  contentFrame.insertChild(balIdx + 1, activosSection);
  // FILL en el eje horizontal para que ocupe el ancho del content frame
  activosSection.layoutSizingHorizontal = 'FILL';
  // AUTO en vertical para que crezca con el contenido
  activosSection.primaryAxisSizingMode = 'AUTO';

  // Convertir contentFrame a AUTO height para que crezca con el nuevo hijo
  contentFrame.primaryAxisSizingMode = 'AUTO';

  // Screen también AUTO para no cortar el contenido
  clone.primaryAxisSizingMode = 'AUTO';

  figma.viewport.scrollAndZoomIntoView([clone]);
  figma.currentPage.selection = [clone];
  return { ok: true, id: clone.id, name: clone.name, size: { w: clone.width, h: clone.height } };
})()
