/**
 * MAIN SECTION — Airpals Website
 * Sección de features completa: headline + 4 info sections alternadas
 *
 * Estructura:
 *   FRAME VERTICAL 1440px, gap:80, padding L/R:236
 *   ├── Headline TEXT (H2, text/primary)
 *   ├── Info section #0 [imagen izq]
 *   ├── Info section #1 [texto izq — con chip + CTA]
 *   ├── Info section #2 [imagen izq]
 *   └── Info section #3 [texto izq]
 *
 * Cada info section alterna orientación automáticamente.
 */

// ── ILUSTRACIONES DISPONIBLES ─────────────────────────────────────────────
const ILLUSTRATIONS = {
  doctor:          '19:285',
  elfProfessor:    '19:124',
  agencyPub:       '19:48',
  creativeFashion: '19:489',
  ong:             '19:428',
  creativeDesign:  '20:672',
  ia:              '28:2040', // Group 6 (381×347)
  superHero:       '28:1913', // super_hero GROUP (420×339)
};

// ── TEXT STYLES ───────────────────────────────────────────────────────────
const TEXT_STYLES = {
  h1:              'af569f2dcf834882a8ceb7cd76c81fa8a28d86f3',
  h2:              'ee888841d77eab239b07d54f5b4507c20b05d102',
  h3:              'ffebb05a861b5fb3b66f8b16bbfbccd52b657423',
  dashTitle:       '5dd07e46feaefda07fae5f77c60f6b3abc02b916',
  subRegular:      '3f93f5621bf6aafe50dc56e495524c4ddb4a73a0',
  subSemibold:     'e7bd5e970c0866626babcb2435055e841994d153',
  bodyLgRegular:   'f9b834c30a1caad51007df19fab23fd6dc599a6a',
  bodyLgMedium:    'df2aa3af1fa5384686e5cb55cc71997bdbac8e45',
  bodyLgSemibold:  '88811d42d0c935a22430ed7f33eba5a2f12b3f20',
  bodyMdRegular:   '2a4d5c3a9a2b1671e19bcf1b9346a8bdd18c2331',
  bodyMdMedium:    '73cea9d2fa1f938fc07dc4428381731c1ad72348',
  bodyMdSemibold:  '6050d635d183ed2475f6ba97428d04c135684a76',
  bodySmRegular:   '083e8c5332c20e80dc0e677559e27029b07aada3',
  bodySmMedium:    'ecd889963180daddd923230bb2ae2cd2ab10518c',
  bodySmSemibold:  '18e5221fdc1b084d9adbb89a9f94ad90b39af6d9',
  captionRegular:  '1ef99e5d5c08fa41146dd3dd31e6c86ec2234367',
  captionMedium:   'a6fb1f8a176bbd6987b4d43595a4fc6bd2b5b8f9',
};

const EFFECTS = {
  shadowXs:  'ac08fe476c34b56374566a6beacc37f89cd2e825',
  shadowSm:  '1a21faf5294c7789a8fd7ac4093c5124d493c8ca',
  shadowMd:  'c33ddee7ac112326787b90bb9b287f56b1164683',
  shadowLg:  'c2db7f5a87b025232413f8268d6708841e60c8d9',
  shadowXl:  '65e93cee220ccc2cfc40484321b126c32ed07aad',
  shadow2xl: '6f484079dd24b5ca32ab85c1b30cc02f6a82f325',
};

const GRIDS = {
  desktopBig:    'ce4cc31962d87707ee69a174a98363daf8331247',
  desktopNormal: '97c663966b04caa58d719ea5c3d258d28b3cf055',
  mobile:        '77eacbc3858effe8289b712fe4ec04cb15898748',
};

const COMPONENTS = {
  actionButton: '8e685884270ba324a8974d7ad44c4cbce1b2e957',
};

// ════════════════════════════════════════════════════════════════════════════
// CONFIG — editar aquí
// ════════════════════════════════════════════════════════════════════════════
const CONFIG = {
  headline: 'One platform for every shipment your team makes',

  sections: [
    // index 0 — imagen izquierda (par)
    {
      heading: 'Ship from anywhere',
      body: 'From your office desk to a remote site — Airpals handles the carrier, the label, and the pickup. You just confirm and move on.',
      illustrationId: ILLUSTRATIONS.ia,
    },
    // index 1 — texto izquierda (impar) — acepta chip y CTA
    {
      heading: 'Purpose-built for teams',
      body: 'From 10 to 10,000 shipments a month, Airpals grows with your team. Add members, assign roles, and keep every department shipping on their own.',
      chip: 'PRO',
      cta: 'Start shipping for free',
      illustrationId: null, // sin ilustración — texto izq
    },
    // index 2 — imagen izquierda (par)
    {
      heading: 'Track everything, live',
      body: 'See the status of every package your team sends — in real time. Automated updates and shareable tracking links, no carrier site-hopping required.',
      illustrationId: ILLUSTRATIONS.doctor,
    },
    // index 3 — texto izquierda (impar)
    {
      heading: 'Shipping for every industry',
      body: 'From PR agencies to fashion brands, law firms to non-profits — Airpals fits how your team works, not the other way around.',
      illustrationId: ILLUSTRATIONS.creativeFashion,
    },
  ],

  positionX: 9846,
  positionY: 7000,
};
// ════════════════════════════════════════════════════════════════════════════

(async () => {
  const page = figma.root.children[0];
  await page.loadAsync();

  const libCollections = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
  const varMap = {};
  for (const lib of libCollections) {
    const vars = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(lib.key);
    for (const lv of vars) {
      const imported = await figma.variables.importVariableByKeyAsync(lv.key);
      varMap[lv.name] = imported;
    }
  }

  await Promise.all([
    figma.loadFontAsync({ family: 'Lexend', style: 'SemiBold' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' }),
  ]);

  const h2Style    = await figma.importStyleByKeyAsync(TEXT_STYLES.h2);
  const h3Style    = await figma.importStyleByKeyAsync(TEXT_STYLES.h3);
  const bodyStyle  = await figma.importStyleByKeyAsync(TEXT_STYLES.bodyMdMedium);
  const smallStyle = await figma.importStyleByKeyAsync(TEXT_STYLES.bodySmMedium);
  const btnComp    = await figma.importComponentByKeyAsync(COMPONENTS.actionButton);

  const applyTextToken = (node, token) => {
    const colors = {
      'text/primary':   { r: 0.107, g: 0.189, b: 0.424 },
      'text/secondary': { r: 0.278, g: 0.333, b: 0.412 },
      'text/on-accent': { r: 1, g: 1, b: 1 },
    };
    if (varMap[token] && colors[token]) {
      node.fills = [{ type: 'SOLID', color: colors[token],
        boundVariables: { color: { type: 'VARIABLE_ALIAS', id: varMap[token].id } } }];
    }
  };

  const spMap = { 0:'spacing/0',4:'spacing/1',8:'spacing/2',10:'spacing/2-5',12:'spacing/3',16:'spacing/4',20:'spacing/5',24:'spacing/6',28:'spacing/7',32:'spacing/8',36:'spacing/9',40:'spacing/10',48:'spacing/12',56:'spacing/14',64:'spacing/16',80:'spacing/20',96:'spacing/24',120:'spacing/30',160:'spacing/40',236:'spacing/60',240:'spacing/60' };
  const radMap = { 0:'border-radius/none',4:'border-radius/DEFAULT',6:'border-radius/md',8:'border-radius/lg',12:'border-radius/xl',16:'border-radius/2xl',24:'border-radius/3xl',9999:'border-radius/full' };
  const closestKey = (value, map) => {
    const keys = Object.keys(map).map(Number).sort((a,b)=>a-b);
    return map[keys.reduce((p,c) => Math.abs(c-value) < Math.abs(p-value) ? c : p)];
  };
  const bindSpacing = (node) => {
    if (typeof node.itemSpacing === 'number' && node.itemSpacing > 0) {
      const tok = closestKey(node.itemSpacing, spMap);
      if (varMap[tok]) try { node.setBoundVariable('itemSpacing', varMap[tok]); } catch(e) {}
    }
    for (const prop of ['paddingTop','paddingBottom','paddingLeft','paddingRight']) {
      const val = node[prop];
      if (typeof val === 'number' && val > 0) {
        const tok = closestKey(val, spMap);
        if (varMap[tok]) try { node.setBoundVariable(prop, varMap[tok]); } catch(e) {}
      }
    }
    if (typeof node.cornerRadius === 'number' && node.cornerRadius > 0) {
      const tok = closestKey(node.cornerRadius, radMap);
      if (varMap[tok]) try { node.setBoundVariable('cornerRadius', varMap[tok]); } catch(e) {}
    }
    if (node.children) node.children.forEach(bindSpacing);
  };

  // ── Build info section ─────────────────────────────────────────────────────
  const buildInfoSection = async (cfg, index) => {
    const imageLeft = (index % 2 === 0); // par = imagen izq, impar = texto izq

    // Image container (siempre presente como placeholder si no hay ilustración)
    const imgContainer = figma.createFrame();
    imgContainer.name = 'Image container';
    imgContainer.resize(437, 378);
    imgContainer.layoutMode = 'NONE';
    imgContainer.clipsContent = true;
    imgContainer.fills = [];

    if (cfg.illustrationId) {
      const bgCircle = figma.createEllipse();
      bgCircle.resize(378, 378);
      bgCircle.x = 0; bgCircle.y = 0;
      if (varMap['ilustraciones/background']) {
        bgCircle.fills = [{ type: 'SOLID', color: { r: 0.902, g: 0.949, b: 1 },
          boundVariables: { color: { type: 'VARIABLE_ALIAS', id: varMap['ilustraciones/background'].id } } }];
      }
      imgContainer.appendChild(bgCircle);

      const illusNode = await figma.getNodeByIdAsync(cfg.illustrationId);
      if (illusNode) {
        const illusClone = illusNode.clone();
        illusClone.x = Math.round((437 - illusClone.width) / 2);
        illusClone.y = Math.round((378 - illusClone.height) / 2);
        imgContainer.appendChild(illusClone);
      }
    }

    // Text container
    const textContainer = figma.createFrame();
    textContainer.name = 'Text container';
    textContainer.layoutMode = 'VERTICAL';
    textContainer.primaryAxisSizingMode = 'AUTO';
    textContainer.counterAxisSizingMode = 'FIXED';
    textContainer.resize(398, 100);
    textContainer.primaryAxisAlignItems = 'MIN';
    textContainer.counterAxisAlignItems = 'MIN';
    textContainer.itemSpacing = 20;
    textContainer.fills = [];

    // Chip + heading row (secciones con chip)
    if (cfg.chip) {
      const headerRow = figma.createFrame();
      headerRow.name = 'Header row';
      headerRow.layoutMode = 'VERTICAL';
      headerRow.primaryAxisSizingMode = 'AUTO';
      headerRow.counterAxisSizingMode = 'AUTO';
      headerRow.itemSpacing = 8;
      headerRow.fills = [];

      const chip = figma.createFrame();
      chip.name = 'chip';
      chip.layoutMode = 'HORIZONTAL';
      chip.primaryAxisSizingMode = 'AUTO';
      chip.counterAxisSizingMode = 'AUTO';
      chip.paddingTop = 4; chip.paddingBottom = 4;
      chip.paddingLeft = 16; chip.paddingRight = 16;
      chip.cornerRadius = 9999;
      if (varMap['background/accent']) {
        chip.fills = [{ type: 'SOLID', color: { r: 0, g: 0.627, b: 1 },
          boundVariables: { color: { type: 'VARIABLE_ALIAS', id: varMap['background/accent'].id } } }];
      } else {
        chip.fills = [{ type: 'SOLID', color: { r: 0, g: 0.627, b: 1 } }];
      }

      const chipText = figma.createText();
      chipText.characters = cfg.chip;
      chipText.textStyleId = smallStyle.id;
      applyTextToken(chipText, 'text/on-accent');
      chip.appendChild(chipText);
      headerRow.appendChild(chip);

      const headingNode = figma.createText();
      headingNode.name = 'Heading';
      headingNode.characters = cfg.heading;
      headingNode.textStyleId = h3Style.id;
      applyTextToken(headingNode, 'text/primary');
      headerRow.appendChild(headingNode);

      textContainer.appendChild(headerRow);
      headingNode.layoutSizingHorizontal = 'FILL';
    } else {
      const headingNode = figma.createText();
      headingNode.name = 'Heading';
      headingNode.characters = cfg.heading;
      headingNode.textStyleId = h3Style.id;
      applyTextToken(headingNode, 'text/primary');
      textContainer.appendChild(headingNode);
      headingNode.layoutSizingHorizontal = 'FILL';
    }

    const bodyNode = figma.createText();
    bodyNode.name = 'Body';
    bodyNode.characters = cfg.body;
    bodyNode.textStyleId = bodyStyle.id;
    applyTextToken(bodyNode, 'text/secondary');
    textContainer.appendChild(bodyNode);
    bodyNode.layoutSizingHorizontal = 'FILL';

    if (cfg.cta) {
      const btn = btnComp.createInstance();
      const btnText = btn.findOne(n => n.type === 'TEXT');
      if (btnText) try { btnText.characters = cfg.cta; } catch(e) {}
      textContainer.appendChild(btn);
    }

    // Section frame
    const section = figma.createFrame();
    section.name = 'Info section';
    section.layoutMode = 'HORIZONTAL';
    section.primaryAxisSizingMode = 'AUTO';
    section.counterAxisSizingMode = 'AUTO';
    section.primaryAxisAlignItems = 'CENTER';
    section.counterAxisAlignItems = 'CENTER';
    section.itemSpacing = 124;
    section.fills = [];

    if (imageLeft) {
      section.appendChild(imgContainer);
      section.appendChild(textContainer);
    } else {
      section.appendChild(textContainer);
      section.appendChild(imgContainer);
    }

    return section;
  };

  // ── Headline ───────────────────────────────────────────────────────────────
  const headlineNode = figma.createText();
  headlineNode.name = 'Main headline';
  headlineNode.characters = CONFIG.headline;
  headlineNode.textStyleId = h2Style.id;
  applyTextToken(headlineNode, 'text/primary');

  // ── Main section frame ────────────────────────────────────────────────────
  const mainSection = figma.createFrame();
  mainSection.name = 'Main section';
  mainSection.layoutMode = 'VERTICAL';
  mainSection.primaryAxisSizingMode = 'AUTO';
  mainSection.counterAxisSizingMode = 'FIXED';
  mainSection.resize(1440, 100);
  mainSection.primaryAxisAlignItems = 'MIN';
  mainSection.counterAxisAlignItems = 'MIN';
  mainSection.itemSpacing = 80;
  mainSection.paddingTop    = 80;
  mainSection.paddingBottom = 80;
  mainSection.paddingLeft   = 236;
  mainSection.paddingRight  = 236;
  mainSection.fills = [];

  mainSection.appendChild(headlineNode);
  headlineNode.layoutSizingHorizontal = 'FILL';

  for (let i = 0; i < CONFIG.sections.length; i++) {
    const sec = await buildInfoSection(CONFIG.sections[i], i);
    mainSection.appendChild(sec);
  }

  bindSpacing(mainSection);

  mainSection.x = CONFIG.positionX;
  mainSection.y = CONFIG.positionY;
  page.appendChild(mainSection);

  figma.currentPage.selection = [mainSection];
  figma.viewport.scrollAndZoomIntoView([mainSection]);

  return { ok: true, id: mainSection.id, w: Math.round(mainSection.width), h: Math.round(mainSection.height) };
})()
