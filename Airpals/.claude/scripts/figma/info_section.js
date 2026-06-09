/**
 * INFO SECTION — Airpals Website
 * Sección individual: imagen (izq o der) + texto
 *
 * CONFIG al final del archivo — cambia copy, ilustración y orientación
 *
 * Estructura:
 *   FRAME HORIZONTAL ~960px, gap:124
 *   ├── Image container [437×378]  ← ilustración circular
 *   └── Text container [398×AUTO, VERTICAL gap:20]
 *         ├── Heading 3
 *         └── Body Medium/Medium
 *
 * Variante invertida: textFirst:true → texto a la izquierda
 */

// ── ILUSTRACIONES DISPONIBLES ─────────────────────────────────────────────
// Standalone frames 420×420 en Page 1 del Borrador
const ILLUSTRATIONS = {
  doctor:          '19:285',  // Doctor — professional, accounts
  elfProfessor:    '19:124',  // Elf Professor — education, onboarding
  agencyPub:       '19:48',   // Agency PUB — PR, marketing
  creativeFashion: '19:489',  // Creative Fashion — fashion, stylists
  ong:             '19:428',  // ONG — non-profits, charity
  creativeDesign:  '20:672',  // Creative Design — branding, creative teams
  ia:              '28:2040', // IA Group 6 (381×347) — AI, tech, automation
  superHero:       '28:1913', // super_hero GROUP (420×339) — hero, CTA
};

// ── TEXT STYLES ───────────────────────────────────────────────────────────
const TEXT_STYLES = {
  h1:              'af569f2dcf834882a8ceb7cd76c81fa8a28d86f3', // Heading 1  36px Lexend SemiBold
  h2:              'ee888841d77eab239b07d54f5b4507c20b05d102', // Heading 2  30px Lexend SemiBold
  h3:              'ffebb05a861b5fb3b66f8b16bbfbccd52b657423', // Heading 3  24px Lexend SemiBold
  dashTitle:       '5dd07e46feaefda07fae5f77c60f6b3abc02b916', // Dashboard Title 18px
  subRegular:      '3f93f5621bf6aafe50dc56e495524c4ddb4a73a0', // Subheading/Regular 20px
  subSemibold:     'e7bd5e970c0866626babcb2435055e841994d153', // Subheading/Semibold 20px
  bodyLgRegular:   'f9b834c30a1caad51007df19fab23fd6dc599a6a', // Body Large/Regular 18px
  bodyLgMedium:    'df2aa3af1fa5384686e5cb55cc71997bdbac8e45', // Body Large/Medium 18px
  bodyLgSemibold:  '88811d42d0c935a22430ed7f33eba5a2f12b3f20', // Body Large/SemiBold 18px
  bodyMdRegular:   '2a4d5c3a9a2b1671e19bcf1b9346a8bdd18c2331', // Body Medium/Regular 16px
  bodyMdMedium:    '73cea9d2fa1f938fc07dc4428381731c1ad72348', // Body Medium/Medium 16px
  bodyMdSemibold:  '6050d635d183ed2475f6ba97428d04c135684a76', // Body Medium/SemiBold 16px
  bodySmRegular:   '083e8c5332c20e80dc0e677559e27029b07aada3', // Body Small/Regular 14px
  bodySmMedium:    'ecd889963180daddd923230bb2ae2cd2ab10518c', // Body Small/Medium 14px
  bodySmSemibold:  '18e5221fdc1b084d9adbb89a9f94ad90b39af6d9', // Body Small/SemiBold 14px
  captionRegular:  '1ef99e5d5c08fa41146dd3dd31e6c86ec2234367', // Caption/Regular 12px
  captionMedium:   'a6fb1f8a176bbd6987b4d43595a4fc6bd2b5b8f9', // Caption/Medium 12px
};

// ── EFFECTS (shadows) ─────────────────────────────────────────────────────
const EFFECTS = {
  shadowXs: 'ac08fe476c34b56374566a6beacc37f89cd2e825',
  shadowSm: '1a21faf5294c7789a8fd7ac4093c5124d493c8ca',
  shadowMd: 'c33ddee7ac112326787b90bb9b287f56b1164683',
  shadowLg: 'c2db7f5a87b025232413f8268d6708841e60c8d9',
  shadowXl: '65e93cee220ccc2cfc40484321b126c32ed07aad',
  shadow2xl: '6f484079dd24b5ca32ab85c1b30cc02f6a82f325',
};

// ── GRIDS ─────────────────────────────────────────────────────────────────
const GRIDS = {
  desktopBig:    'ce4cc31962d87707ee69a174a98363daf8331247', // 12 cols, gutter 30, offset 80
  desktopNormal: '97c663966b04caa58d719ea5c3d258d28b3cf055', // 12 cols, gutter 20, offset 128
  mobile:        '77eacbc3858effe8289b712fe4ec04cb15898748', // 4 cols, gutter 12, offset 16
};

// ── COMPONENTS ────────────────────────────────────────────────────────────
const COMPONENTS = {
  actionButton: '8e685884270ba324a8974d7ad44c4cbce1b2e957', // Action Button Primary/Default
};

// ════════════════════════════════════════════════════════════════════════════
// CONFIG — editar aquí
// ════════════════════════════════════════════════════════════════════════════
const CONFIG = {
  heading:      'Ship from anywhere',
  body:         'From your office desk to a remote site — Airpals handles the carrier, the label, and the pickup. You just confirm and move on.',
  illustrationId: ILLUSTRATIONS.ia,   // ← cambiar ilustración aquí
  textFirst:    false,                 // false = imagen izq | true = texto izq
  positionX:    9846,
  positionY:    6000,
};
// ════════════════════════════════════════════════════════════════════════════

(async () => {
  const page = figma.root.children[0];
  await page.loadAsync();

  // Variables
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
  ]);

  const h3Style   = await figma.importStyleByKeyAsync(TEXT_STYLES.h3);
  const bodyStyle = await figma.importStyleByKeyAsync(TEXT_STYLES.bodyMdMedium);

  const applyTextToken = (node, token) => {
    const colors = {
      'text/primary':   { r: 0.107, g: 0.189, b: 0.424 },
      'text/secondary': { r: 0.278, g: 0.333, b: 0.412 },
    };
    if (varMap[token] && colors[token]) {
      node.fills = [{ type: 'SOLID', color: colors[token],
        boundVariables: { color: { type: 'VARIABLE_ALIAS', id: varMap[token].id } } }];
    }
  };

  const spMap = { 0:'spacing/0',4:'spacing/1',8:'spacing/2',10:'spacing/2-5',12:'spacing/3',16:'spacing/4',20:'spacing/5',24:'spacing/6',28:'spacing/7',32:'spacing/8',36:'spacing/9',40:'spacing/10',48:'spacing/12',56:'spacing/14',64:'spacing/16',80:'spacing/20',96:'spacing/24',120:'spacing/30',160:'spacing/40',240:'spacing/60' };
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

  // ── Image container ────────────────────────────────────────────────────────
  const imgContainer = figma.createFrame();
  imgContainer.name = 'Image container';
  imgContainer.resize(437, 378);
  imgContainer.layoutMode = 'NONE';
  imgContainer.clipsContent = true;
  imgContainer.fills = [];

  // Circular background vector
  const bgCircle = figma.createEllipse();
  bgCircle.resize(378, 378);
  bgCircle.x = 0; bgCircle.y = 0;
  if (varMap['ilustraciones/background']) {
    bgCircle.fills = [{ type: 'SOLID', color: { r: 0.902, g: 0.949, b: 1 },
      boundVariables: { color: { type: 'VARIABLE_ALIAS', id: varMap['ilustraciones/background'].id } } }];
  }
  imgContainer.appendChild(bgCircle);

  // Illustration
  const illusNode = await figma.getNodeByIdAsync(CONFIG.illustrationId);
  if (illusNode) {
    const illusClone = illusNode.clone();
    const iw = Math.round(illusClone.width);
    const ih = Math.round(illusClone.height);
    illusClone.x = Math.round((437 - iw) / 2);
    illusClone.y = Math.round((378 - ih) / 2);
    imgContainer.appendChild(illusClone);
  }

  // ── Text container ─────────────────────────────────────────────────────────
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

  const heading = figma.createText();
  heading.name = 'Heading';
  heading.characters = CONFIG.heading;
  heading.textStyleId = h3Style.id;
  applyTextToken(heading, 'text/primary');

  const body = figma.createText();
  body.name = 'Body';
  body.characters = CONFIG.body;
  body.textStyleId = bodyStyle.id;
  applyTextToken(body, 'text/secondary');

  textContainer.appendChild(heading);
  textContainer.appendChild(body);
  heading.layoutSizingHorizontal = 'FILL';
  body.layoutSizingHorizontal    = 'FILL';

  // ── Section frame ──────────────────────────────────────────────────────────
  const section = figma.createFrame();
  section.name = 'Info section';
  section.layoutMode = 'HORIZONTAL';
  section.primaryAxisSizingMode = 'AUTO';
  section.counterAxisSizingMode = 'AUTO';
  section.primaryAxisAlignItems = 'CENTER';
  section.counterAxisAlignItems = 'CENTER';
  section.itemSpacing = 124;
  section.fills = [];

  if (CONFIG.textFirst) {
    section.appendChild(textContainer);
    section.appendChild(imgContainer);
  } else {
    section.appendChild(imgContainer);
    section.appendChild(textContainer);
  }

  bindSpacing(section);

  section.x = CONFIG.positionX;
  section.y = CONFIG.positionY;
  page.appendChild(section);

  figma.currentPage.selection = [section];
  figma.viewport.scrollAndZoomIntoView([section]);

  return { ok: true, id: section.id, w: Math.round(section.width), h: Math.round(section.height) };
})()
