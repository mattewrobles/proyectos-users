(async () => {
  const page = figma.root.children.find(p => p.name.includes('Borrrador'));
  if (!page) return { error: 'Página no encontrada' };
  await page.loadAsync();
  await figma.setCurrentPageAsync(page);
  ['W8 · Oferta Préstamo','W9 · Confirmar Préstamo','W10 · Préstamo Activo']
    .forEach(n => page.children.filter(c => c.name === n).forEach(c => c.remove()));

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

  const [bgFg, cardFill, cardNormal, textPrimary, textSecondary, radiusMd, radiusXl, radius2xl] = await Promise.all([
    importVar('🧩 Tokens', 'Backgrounds/Foreground'),
    importVar('🧩 Tokens', 'Cards-Fills/Card'),
    importVar('🧩 Tokens', 'Cards-Fills/Normal/Primary'),
    importVar('🧩 Tokens', 'Text/Primary'),
    importVar('🧩 Tokens', 'Text/secondary'),
    importVar('⊙ Radius', 'Radius-md'),
    importVar('⊙ Radius', 'Radius-xl'),
    importVar('⊙ Radius', 'Radius-2xl'),
  ]);

  const [sbComp, homeIndComp, btnPrimaryComp, btnClearComp, dividerComp] = await Promise.all([
    figma.importComponentByKeyAsync('222088d248a045f3d2e7df151f7d613bbda7fafd'),
    figma.importComponentByKeyAsync('e12f73d63ccef0537a22efd9a34228a9dc441bff'),
    figma.importComponentByKeyAsync('15be15cfa0d8c4667e4eb8f84bf80f9919e019c9'),
    figma.importComponentByKeyAsync('c4757e2398d2f767b0b188296d6efe17d15e1b9c'),
    figma.importComponentByKeyAsync('3b8ea15e6f8e5410181509a43c329036681099c5'),
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

  function vFill(v) {
    return [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.1 },
      boundVariables: { color: { type: 'VARIABLE_ALIAS', id: v.id } } }];
  }
  function bindRadius(node, rv) {
    ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius']
      .forEach(c => node.setBoundVariable(c, rv));
  }
  function makeScreen(name, x) {
    const s = figma.createFrame();
    s.name = name; s.resize(393, 852);
    s.layoutMode = 'VERTICAL'; s.primaryAxisSizingMode = 'FIXED';
    s.counterAxisSizingMode = 'FIXED'; s.fills = vFill(bgFg); s.itemSpacing = 0;
    s.x = x; s.y = 0;
    return s;
  }
  async function addNav(screen, title) {
    const nav = figma.createFrame();
    nav.name = 'Nav'; nav.layoutMode = 'HORIZONTAL';
    nav.primaryAxisSizingMode = 'AUTO'; nav.counterAxisSizingMode = 'AUTO';
    nav.counterAxisAlignItems = 'CENTER'; nav.fills = [];
    screen.appendChild(nav); nav.layoutSizingHorizontal = 'FILL';
    if (sp8)  nav.setBoundVariable('paddingTop', sp8);
    if (sp16) nav.setBoundVariable('paddingRight', sp16);
    if (sp8)  nav.setBoundVariable('paddingBottom', sp8);
    if (sp16) nav.setBoundVariable('paddingLeft', sp16);
    if (sp8)  nav.setBoundVariable('itemSpacing', sp8);
    const back = figma.createText(); back.characters = '←';
    await back.setTextStyleIdAsync(styleH5.id); back.fills = vFill(textPrimary); nav.appendChild(back);
    const t = figma.createText(); t.characters = title;
    await t.setTextStyleIdAsync(styleSubtitle.id); t.fills = vFill(textPrimary); nav.appendChild(t);
  }
  async function addBtn(parent, label, comp, style = 'Primary') {
    const btn = comp.createInstance();
    parent.appendChild(btn); btn.layoutSizingHorizontal = 'FILL';
    try { btn.setProperties({ 'Icon Left#34:8': false, 'Icon Right#34:7': false, 'State': 'Default', 'Style': style }); } catch(e) {}
    const l = btn.findAllWithCriteria({ types: ['TEXT'] })[0];
    if (l) { await figma.loadFontAsync(l.fontName); l.characters = label; }
  }
  async function detailRow(parent, label, value) {
    const row = figma.createFrame(); row.name = label;
    row.layoutMode = 'HORIZONTAL'; row.primaryAxisSizingMode = 'AUTO';
    row.counterAxisSizingMode = 'AUTO'; row.primaryAxisAlignItems = 'SPACE_BETWEEN';
    row.counterAxisAlignItems = 'CENTER'; row.fills = [];
    parent.appendChild(row); row.layoutSizingHorizontal = 'FILL';
    if (sp16) row.setBoundVariable('paddingTop', sp16);
    if (sp16) row.setBoundVariable('paddingBottom', sp16);
    const l = figma.createText(); l.characters = label;
    await l.setTextStyleIdAsync(styleCaption.id); l.fills = vFill(textSecondary); row.appendChild(l);
    const v2 = figma.createText(); v2.characters = value;
    await v2.setTextStyleIdAsync(styleCaption.id); v2.fills = vFill(textPrimary); row.appendChild(v2);
    const div = dividerComp.createInstance(); parent.appendChild(div); div.layoutSizingHorizontal = 'FILL';
  }

  // ══════════════════════════════════════════════════════════════════
  // W8 — Oferta de Préstamo
  // ══════════════════════════════════════════════════════════════════
  const w8 = makeScreen('W8 · Oferta Préstamo', 2940);
  const sb8 = sbComp.createInstance(); w8.appendChild(sb8); sb8.layoutSizingHorizontal = 'FILL';
  await addNav(w8, 'Préstamo uTransfer');

  const w8Content = figma.createFrame();
  w8Content.name = 'Content'; w8Content.layoutMode = 'VERTICAL';
  w8Content.primaryAxisSizingMode = 'AUTO'; w8Content.counterAxisSizingMode = 'FIXED';
  w8Content.fills = []; w8.appendChild(w8Content);
  w8Content.layoutSizingHorizontal = 'FILL'; w8Content.layoutSizingVertical = 'FILL';
  if (sp20) w8Content.setBoundVariable('paddingLeft', sp20);
  if (sp20) w8Content.setBoundVariable('paddingRight', sp20);
  if (sp24) w8Content.setBoundVariable('paddingTop', sp24);
  if (sp16) w8Content.setBoundVariable('paddingBottom', sp16);
  if (sp20) w8Content.setBoundVariable('itemSpacing', sp20);

  // Score badge
  const scoreBadge = figma.createFrame();
  scoreBadge.name = 'Score Badge'; scoreBadge.layoutMode = 'VERTICAL';
  scoreBadge.primaryAxisSizingMode = 'AUTO'; scoreBadge.counterAxisSizingMode = 'AUTO';
  scoreBadge.counterAxisAlignItems = 'CENTER'; scoreBadge.fills = vFill(cardFill);
  if (radius2xl) bindRadius(scoreBadge, radius2xl);
  if (sp20) scoreBadge.setBoundVariable('paddingTop', sp20);
  if (sp20) scoreBadge.setBoundVariable('paddingRight', sp20);
  if (sp20) scoreBadge.setBoundVariable('paddingBottom', sp20);
  if (sp20) scoreBadge.setBoundVariable('paddingLeft', sp20);
  if (sp12) scoreBadge.setBoundVariable('itemSpacing', sp12);
  w8Content.appendChild(scoreBadge); scoreBadge.layoutSizingHorizontal = 'FILL';

  // Score circle
  const scoreCircle = figma.createFrame();
  scoreCircle.resize(72, 72); scoreCircle.cornerRadius = 36;
  scoreCircle.fills = [{ type: 'SOLID', color: { r: 0.13, g: 0.77, b: 0.37 }, opacity: 0.15 }];
  scoreCircle.layoutMode = 'VERTICAL'; scoreCircle.counterAxisAlignItems = 'CENTER';
  scoreCircle.primaryAxisAlignItems = 'CENTER';
  scoreBadge.appendChild(scoreCircle);
  const scoreVal = figma.createText(); scoreVal.characters = '92';
  await scoreVal.setTextStyleIdAsync(styleH5.id);
  scoreVal.fills = [{ type: 'SOLID', color: { r: 0.07, g: 0.58, b: 0.27 } }];
  scoreCircle.appendChild(scoreVal);

  const scoreTitle = figma.createText(); scoreTitle.characters = 'Tu historial es excelente';
  await scoreTitle.setTextStyleIdAsync(styleSubtitle.id); scoreTitle.fills = vFill(textPrimary);
  scoreTitle.textAlignHorizontal = 'CENTER'; scoreBadge.appendChild(scoreTitle);

  const scoreSub = figma.createText(); scoreSub.characters = 'Basado en tus transacciones en uTransfer · Banco Amazonas';
  await scoreSub.setTextStyleIdAsync(styleCaption.id); scoreSub.fills = vFill(textSecondary);
  scoreSub.textAlignHorizontal = 'CENTER'; scoreBadge.appendChild(scoreSub);

  // Oferta de crédito
  const ofertaCard = figma.createFrame();
  ofertaCard.name = 'Oferta Card'; ofertaCard.layoutMode = 'VERTICAL';
  ofertaCard.primaryAxisSizingMode = 'AUTO'; ofertaCard.counterAxisSizingMode = 'AUTO';
  ofertaCard.counterAxisAlignItems = 'CENTER'; ofertaCard.fills = vFill(cardFill);
  if (radiusXl) bindRadius(ofertaCard, radiusXl);
  if (sp20) ofertaCard.setBoundVariable('paddingTop', sp20);
  if (sp20) ofertaCard.setBoundVariable('paddingRight', sp20);
  if (sp20) ofertaCard.setBoundVariable('paddingBottom', sp20);
  if (sp20) ofertaCard.setBoundVariable('paddingLeft', sp20);
  if (sp8)  ofertaCard.setBoundVariable('itemSpacing', sp8);
  w8Content.appendChild(ofertaCard); ofertaCard.layoutSizingHorizontal = 'FILL';

  const ofertaLabel = figma.createText(); ofertaLabel.characters = 'Puedes pedir hasta';
  await ofertaLabel.setTextStyleIdAsync(styleCaption.id); ofertaLabel.fills = vFill(textSecondary);
  ofertaLabel.textAlignHorizontal = 'CENTER'; ofertaCard.appendChild(ofertaLabel);

  const ofertaAmount = figma.createText(); ofertaAmount.characters = '$500.00 USD';
  await ofertaAmount.setTextStyleIdAsync(styleH3.id); ofertaAmount.fills = vFill(textPrimary);
  ofertaAmount.textAlignHorizontal = 'CENTER'; ofertaCard.appendChild(ofertaAmount);

  const tasaText = figma.createText(); tasaText.characters = '8% anual · Banco Amazonas';
  await tasaText.setTextStyleIdAsync(styleCaption.id); tasaText.fills = vFill(textSecondary);
  tasaText.textAlignHorizontal = 'CENTER'; ofertaCard.appendChild(tasaText);

  // Selector de plazo
  const plazoRow = figma.createFrame(); plazoRow.name = 'Plazo';
  plazoRow.layoutMode = 'HORIZONTAL'; plazoRow.primaryAxisSizingMode = 'AUTO';
  plazoRow.counterAxisSizingMode = 'AUTO'; plazoRow.counterAxisAlignItems = 'CENTER';
  plazoRow.primaryAxisAlignItems = 'SPACE_BETWEEN'; plazoRow.fills = [];
  w8Content.appendChild(plazoRow); plazoRow.layoutSizingHorizontal = 'FILL';

  for (const [p, active] of [['3 meses', false], ['6 meses', true], ['12 meses', false]]) {
    const pill = figma.createFrame(); pill.name = p;
    pill.layoutMode = 'VERTICAL'; pill.primaryAxisSizingMode = 'AUTO';
    pill.counterAxisSizingMode = 'AUTO'; pill.counterAxisAlignItems = 'CENTER';
    pill.fills = active ? [{ type: 'SOLID', color: { r: 0.35, g: 0.14, b: 0.72 } }] : vFill(cardFill);
    if (radiusMd) bindRadius(pill, radiusMd);
    if (sp12) pill.setBoundVariable('paddingTop', sp12);
    if (sp12) pill.setBoundVariable('paddingBottom', sp12);
    if (sp16) pill.setBoundVariable('paddingLeft', sp16);
    if (sp16) pill.setBoundVariable('paddingRight', sp16);
    if (sp4)  pill.setBoundVariable('itemSpacing', sp4);
    plazoRow.appendChild(pill); pill.layoutSizingHorizontal = 'FILL';

    const pLabel = figma.createText(); pLabel.characters = p;
    await pLabel.setTextStyleIdAsync(styleCaption.id);
    pLabel.fills = active ? [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }] : vFill(textSecondary);
    pill.appendChild(pLabel);

    const cuota = p === '3 meses' ? '$172/mes' : p === '6 meses' ? '$88/mes' : '$45/mes';
    const cLabel = figma.createText(); cLabel.characters = cuota;
    await cLabel.setTextStyleIdAsync(styleSubtitle.id);
    cLabel.fills = active ? [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }] : vFill(textPrimary);
    pill.appendChild(cLabel);
  }

  const w8BtnArea = figma.createFrame(); w8BtnArea.name = 'Buttons';
  w8BtnArea.layoutMode = 'VERTICAL'; w8BtnArea.primaryAxisSizingMode = 'AUTO';
  w8BtnArea.counterAxisSizingMode = 'AUTO'; w8BtnArea.fills = [];
  if (sp12) w8BtnArea.setBoundVariable('itemSpacing', sp12);
  w8Content.appendChild(w8BtnArea); w8BtnArea.layoutSizingHorizontal = 'FILL';
  await addBtn(w8BtnArea, 'Solicitar préstamo', btnPrimaryComp);
  await addBtn(w8BtnArea, 'Más información', btnClearComp, 'Clear');

  const hi8 = homeIndComp.createInstance(); w8.appendChild(hi8); hi8.layoutSizingHorizontal = 'FILL';

  // ══════════════════════════════════════════════════════════════════
  // W9 — Confirmar Préstamo
  // ══════════════════════════════════════════════════════════════════
  const w9 = makeScreen('W9 · Confirmar Préstamo', 3360);
  const sb9 = sbComp.createInstance(); w9.appendChild(sb9); sb9.layoutSizingHorizontal = 'FILL';
  await addNav(w9, 'Confirmar préstamo');

  const w9Content = figma.createFrame();
  w9Content.name = 'Content'; w9Content.layoutMode = 'VERTICAL';
  w9Content.primaryAxisSizingMode = 'AUTO'; w9Content.counterAxisSizingMode = 'FIXED';
  w9Content.fills = []; w9.appendChild(w9Content);
  w9Content.layoutSizingHorizontal = 'FILL'; w9Content.layoutSizingVertical = 'FILL';
  if (sp20) w9Content.setBoundVariable('paddingLeft', sp20);
  if (sp20) w9Content.setBoundVariable('paddingRight', sp20);
  if (sp24) w9Content.setBoundVariable('paddingTop', sp24);
  if (sp16) w9Content.setBoundVariable('paddingBottom', sp16);
  if (sp20) w9Content.setBoundVariable('itemSpacing', sp20);

  // Hero amount
  const w9Hero = figma.createFrame(); w9Hero.name = 'Hero';
  w9Hero.layoutMode = 'VERTICAL'; w9Hero.primaryAxisSizingMode = 'AUTO';
  w9Hero.counterAxisSizingMode = 'AUTO'; w9Hero.counterAxisAlignItems = 'CENTER';
  w9Hero.fills = vFill(cardFill); if (radiusXl) bindRadius(w9Hero, radiusXl);
  if (sp20) w9Hero.setBoundVariable('paddingTop', sp20);
  if (sp20) w9Hero.setBoundVariable('paddingRight', sp20);
  if (sp20) w9Hero.setBoundVariable('paddingBottom', sp20);
  if (sp20) w9Hero.setBoundVariable('paddingLeft', sp20);
  if (sp8)  w9Hero.setBoundVariable('itemSpacing', sp8);
  w9Content.appendChild(w9Hero); w9Hero.layoutSizingHorizontal = 'FILL';

  const w9HeroLabel = figma.createText(); w9HeroLabel.characters = 'Recibirás en tu billetera';
  await w9HeroLabel.setTextStyleIdAsync(styleCaption.id); w9HeroLabel.fills = vFill(textSecondary);
  w9HeroLabel.textAlignHorizontal = 'CENTER'; w9Hero.appendChild(w9HeroLabel);
  const w9HeroAmt = figma.createText(); w9HeroAmt.characters = '$500.00 USD';
  await w9HeroAmt.setTextStyleIdAsync(styleH3.id); w9HeroAmt.fills = vFill(textPrimary);
  w9HeroAmt.textAlignHorizontal = 'CENTER'; w9Hero.appendChild(w9HeroAmt);

  // Detalle
  const detailCard9 = figma.createFrame(); detailCard9.name = 'Detail';
  detailCard9.layoutMode = 'VERTICAL'; detailCard9.primaryAxisSizingMode = 'AUTO';
  detailCard9.counterAxisSizingMode = 'AUTO'; detailCard9.fills = vFill(cardFill);
  if (radiusXl) bindRadius(detailCard9, radiusXl);
  if (sp16) detailCard9.setBoundVariable('paddingLeft', sp16);
  if (sp16) detailCard9.setBoundVariable('paddingRight', sp16);
  w9Content.appendChild(detailCard9); detailCard9.layoutSizingHorizontal = 'FILL';

  await detailRow(detailCard9, 'Plazo', '6 meses');
  await detailRow(detailCard9, 'Cuota mensual', '$88.00 USD');
  await detailRow(detailCard9, 'Tasa de interés', '8% anual');
  await detailRow(detailCard9, 'Total a pagar', '$528.00 USD');
  await detailRow(detailCard9, 'Entidad', 'Banco Amazonas');

  const legal9 = figma.createText();
  legal9.characters = 'Al confirmar aceptas los términos y condiciones del crédito de Banco Amazonas.';
  await legal9.setTextStyleIdAsync(styleCaption.id); legal9.fills = vFill(textSecondary);
  legal9.textAlignHorizontal = 'CENTER'; w9Content.appendChild(legal9);
  legal9.layoutSizingHorizontal = 'FILL';

  const w9Btns = figma.createFrame(); w9Btns.name = 'Btns';
  w9Btns.layoutMode = 'VERTICAL'; w9Btns.primaryAxisSizingMode = 'AUTO';
  w9Btns.counterAxisSizingMode = 'AUTO'; w9Btns.fills = [];
  if (sp12) w9Btns.setBoundVariable('itemSpacing', sp12);
  w9Content.appendChild(w9Btns); w9Btns.layoutSizingHorizontal = 'FILL';
  await addBtn(w9Btns, 'Confirmar y recibir dinero', btnPrimaryComp);
  await addBtn(w9Btns, 'Cancelar', btnClearComp, 'Clear');

  const hi9 = homeIndComp.createInstance(); w9.appendChild(hi9); hi9.layoutSizingHorizontal = 'FILL';

  // ══════════════════════════════════════════════════════════════════
  // W10 — Préstamo Activo (dashboard)
  // ══════════════════════════════════════════════════════════════════
  const w10 = makeScreen('W10 · Préstamo Activo', 3780);
  const sb10 = sbComp.createInstance(); w10.appendChild(sb10); sb10.layoutSizingHorizontal = 'FILL';
  await addNav(w10, 'Mi préstamo');

  const w10Content = figma.createFrame();
  w10Content.name = 'Content'; w10Content.layoutMode = 'VERTICAL';
  w10Content.primaryAxisSizingMode = 'AUTO'; w10Content.counterAxisSizingMode = 'FIXED';
  w10Content.fills = []; w10.appendChild(w10Content);
  w10Content.layoutSizingHorizontal = 'FILL'; w10Content.layoutSizingVertical = 'FILL';
  if (sp20) w10Content.setBoundVariable('paddingLeft', sp20);
  if (sp20) w10Content.setBoundVariable('paddingRight', sp20);
  if (sp24) w10Content.setBoundVariable('paddingTop', sp24);
  if (sp16) w10Content.setBoundVariable('paddingBottom', sp16);
  if (sp20) w10Content.setBoundVariable('itemSpacing', sp20);

  // Hero card purple
  const w10Hero = figma.createFrame(); w10Hero.name = 'Hero';
  w10Hero.layoutMode = 'VERTICAL'; w10Hero.primaryAxisSizingMode = 'AUTO';
  w10Hero.counterAxisSizingMode = 'AUTO'; w10Hero.counterAxisAlignItems = 'CENTER';
  w10Hero.fills = [{ type: 'SOLID', color: { r: 0.35, g: 0.14, b: 0.72 } }];
  if (radius2xl) bindRadius(w10Hero, radius2xl);
  if (sp24) w10Hero.setBoundVariable('paddingTop', sp24);
  if (sp20) w10Hero.setBoundVariable('paddingRight', sp20);
  if (sp24) w10Hero.setBoundVariable('paddingBottom', sp24);
  if (sp20) w10Hero.setBoundVariable('paddingLeft', sp20);
  if (sp8)  w10Hero.setBoundVariable('itemSpacing', sp8);
  w10Content.appendChild(w10Hero); w10Hero.layoutSizingHorizontal = 'FILL';

  const saldoLabel = figma.createText(); saldoLabel.characters = 'Saldo pendiente';
  await saldoLabel.setTextStyleIdAsync(styleCaption.id);
  saldoLabel.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.7 }];
  saldoLabel.textAlignHorizontal = 'CENTER'; w10Hero.appendChild(saldoLabel);

  const saldoAmt = figma.createText(); saldoAmt.characters = '$412.00 USD';
  await saldoAmt.setTextStyleIdAsync(styleH3.id);
  saldoAmt.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  saldoAmt.textAlignHorizontal = 'CENTER'; w10Hero.appendChild(saldoAmt);

  // Progress bar (manual — frame visual)
  const progressBg = figma.createFrame(); progressBg.name = 'Progress BG';
  progressBg.resize(313, 6); progressBg.cornerRadius = 3;
  progressBg.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.2 }];
  w10Hero.appendChild(progressBg);

  const progressFill = figma.createFrame(); progressFill.name = 'Progress Fill';
  progressFill.resize(94, 6); progressFill.cornerRadius = 3;  // ~30% pagado
  progressFill.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  progressBg.appendChild(progressFill);

  const progressLabel = figma.createText(); progressLabel.characters = '2 de 6 cuotas pagadas';
  await progressLabel.setTextStyleIdAsync(styleCaption.id);
  progressLabel.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.7 }];
  progressLabel.textAlignHorizontal = 'CENTER'; w10Hero.appendChild(progressLabel);

  // Próximo pago
  const nextPayCard = figma.createFrame(); nextPayCard.name = 'Next Pay';
  nextPayCard.layoutMode = 'HORIZONTAL'; nextPayCard.primaryAxisSizingMode = 'AUTO';
  nextPayCard.counterAxisSizingMode = 'AUTO'; nextPayCard.counterAxisAlignItems = 'CENTER';
  nextPayCard.primaryAxisAlignItems = 'SPACE_BETWEEN'; nextPayCard.fills = vFill(cardFill);
  if (radiusXl) bindRadius(nextPayCard, radiusXl);
  if (sp16) nextPayCard.setBoundVariable('paddingTop', sp16);
  if (sp16) nextPayCard.setBoundVariable('paddingRight', sp16);
  if (sp16) nextPayCard.setBoundVariable('paddingBottom', sp16);
  if (sp16) nextPayCard.setBoundVariable('paddingLeft', sp16);
  w10Content.appendChild(nextPayCard); nextPayCard.layoutSizingHorizontal = 'FILL';

  const nextInfo = figma.createFrame(); nextInfo.name = 'Info';
  nextInfo.layoutMode = 'VERTICAL'; nextInfo.primaryAxisSizingMode = 'AUTO';
  nextInfo.counterAxisSizingMode = 'AUTO'; nextInfo.fills = [];
  if (sp4) nextInfo.setBoundVariable('itemSpacing', sp4);
  nextPayCard.appendChild(nextInfo);
  const nextLabel = figma.createText(); nextLabel.characters = 'Próximo pago';
  await nextLabel.setTextStyleIdAsync(styleCaption.id); nextLabel.fills = vFill(textSecondary); nextInfo.appendChild(nextLabel);
  const nextDate = figma.createText(); nextDate.characters = '15 de mayo, 2026';
  await nextDate.setTextStyleIdAsync(styleSubtitle.id); nextDate.fills = vFill(textPrimary); nextInfo.appendChild(nextDate);

  const nextAmt = figma.createText(); nextAmt.characters = '$88.00';
  await nextAmt.setTextStyleIdAsync(styleH5.id); nextAmt.fills = vFill(textPrimary); nextPayCard.appendChild(nextAmt);

  // Detalle resumen
  const detailCard10 = figma.createFrame(); detailCard10.name = 'Detail';
  detailCard10.layoutMode = 'VERTICAL'; detailCard10.primaryAxisSizingMode = 'AUTO';
  detailCard10.counterAxisSizingMode = 'AUTO'; detailCard10.fills = vFill(cardFill);
  if (radiusXl) bindRadius(detailCard10, radiusXl);
  if (sp16) detailCard10.setBoundVariable('paddingLeft', sp16);
  if (sp16) detailCard10.setBoundVariable('paddingRight', sp16);
  w10Content.appendChild(detailCard10); detailCard10.layoutSizingHorizontal = 'FILL';

  await detailRow(detailCard10, 'Préstamo original', '$500.00 USD');
  await detailRow(detailCard10, 'Total pagado', '$176.00 USD');
  await detailRow(detailCard10, 'Cuotas restantes', '4 de 6');

  const w10Btns = figma.createFrame(); w10Btns.name = 'Btns';
  w10Btns.layoutMode = 'VERTICAL'; w10Btns.primaryAxisSizingMode = 'AUTO';
  w10Btns.counterAxisSizingMode = 'AUTO'; w10Btns.fills = [];
  if (sp12) w10Btns.setBoundVariable('itemSpacing', sp12);
  w10Content.appendChild(w10Btns); w10Btns.layoutSizingHorizontal = 'FILL';
  await addBtn(w10Btns, 'Pagar cuota ahora', btnPrimaryComp);
  await addBtn(w10Btns, 'Ver historial de pagos', btnClearComp, 'Clear');

  const hi10 = homeIndComp.createInstance(); w10.appendChild(hi10); hi10.layoutSizingHorizontal = 'FILL';

  // ── Posicionar todo y seleccionar ─────────────────────────────────
  figma.viewport.scrollAndZoomIntoView([w8, w9, w10]);
  figma.currentPage.selection = [w8, w9, w10];

  return {
    ok: true,
    screens: [
      { id: w8.id, name: w8.name },
      { id: w9.id, name: w9.name },
      { id: w10.id, name: w10.name },
    ]
  };
})()
