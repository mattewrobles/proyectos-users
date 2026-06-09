/**
 * STORY / JOURNEY SECTION — Airpals Website
 * Sección narrativa: ilustración grande + headline + body + CTA
 *
 * Estructura:
 *   FRAME HORIZONTAL 1440×428, gap:114, mainAxis:CENTER
 *   ├── Illustration GROUP/FRAME (~466×376)
 *   └── Frame VERTICAL [480px AUTO, gap:24]
 *         ├── Heading (H2 o H3)
 *         ├── Body
 *         └── Action Button
 *
 * Referencia original: 76:1955 — "A Glimpse Into Our Journey"
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
  superHero:       '28:1913', // super_hero GROUP (420×339) — ideal para esta sección
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
// CONFIG
// ════════════════════════════════════════════════════════════════════════════
const CONFIG = {
  heading:        'A Glimpse Into Our Journey',
  headingStyle:   'h3',   // h1 | h2 | h3
  body:           'We started Airpals because we were tired of losing hours to shipping logistics. Today, hundreds of teams use Airpals to send smarter — and spend more time on work that matters.',
  ctaLabel:       'Learn More About Us',
  illustrationId: ILLUSTRATIONS.superHero,
  illustrationLeft: true,  // true = ilustración izq, texto der | false = invertido
  positionX:      9846,
  positionY:      6500,
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
  ]);

  const headingStyle = await figma.importStyleByKeyAsync(TEXT_STYLES[CONFIG.headingStyle]);
  const bodyStyle    = await figma.importStyleByKeyAsync(TEXT_STYLES.bodyMdMedium);
  const btnComp      = await figma.importComponentByKeyAsync(COMPONENTS.actionButton);

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

  const spMap = { 0:'spacing/0',4:'spacing/1',8:'spacing/2',10:'spacing/2-5',12:'spacing/3',16:'spacing/4',20:'spacing/5',24:'spacing/6',28:'spacing/7',32:'spacing/8',36:'spacing/9',40:'spacing/10',48:'spacing/12',56:'spacing/14',64:'spacing/16',80:'spacing/20',96:'spacing/24',114:'spacing/28',120:'spacing/30',160:'spacing/40',240:'spacing/60' };
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

  // ── Illustration ───────────────────────────────────────────────────────────
  const illusNode  = await figma.getNodeByIdAsync(CONFIG.illustrationId);
  const illusClone = illusNode.clone();

  // ── Text + CTA frame ───────────────────────────────────────────────────────
  const textFrame = figma.createFrame();
  textFrame.name = 'Story text';
  textFrame.layoutMode = 'VERTICAL';
  textFrame.primaryAxisSizingMode = 'AUTO';
  textFrame.counterAxisSizingMode = 'FIXED';
  textFrame.resize(480, 100);
  textFrame.primaryAxisAlignItems = 'MIN';
  textFrame.counterAxisAlignItems = 'MIN';
  textFrame.itemSpacing = 24;
  textFrame.fills = [];

  const heading = figma.createText();
  heading.name = 'Heading';
  heading.characters = CONFIG.heading;
  heading.textStyleId = headingStyle.id;
  applyTextToken(heading, 'text/primary');

  const body = figma.createText();
  body.name = 'Body';
  body.characters = CONFIG.body;
  body.textStyleId = bodyStyle.id;
  applyTextToken(body, 'text/secondary');

  const btn = btnComp.createInstance();
  const btnText = btn.findOne(n => n.type === 'TEXT');
  if (btnText) try { btnText.characters = CONFIG.ctaLabel; } catch(e) {}

  textFrame.appendChild(heading);
  textFrame.appendChild(body);
  textFrame.appendChild(btn);
  heading.layoutSizingHorizontal = 'FILL';
  body.layoutSizingHorizontal    = 'FILL';

  // ── Section frame 1440px ──────────────────────────────────────────────────
  const section = figma.createFrame();
  section.name = 'Story section';
  section.layoutMode = 'HORIZONTAL';
  section.primaryAxisSizingMode = 'FIXED';
  section.counterAxisSizingMode = 'AUTO';
  section.resize(1440, 100);
  section.primaryAxisAlignItems = 'CENTER';
  section.counterAxisAlignItems = 'CENTER';
  section.itemSpacing = 114;
  section.paddingLeft  = 236;
  section.paddingRight = 236;
  section.fills = [];

  if (CONFIG.illustrationLeft) {
    section.appendChild(illusClone);
    section.appendChild(textFrame);
  } else {
    section.appendChild(textFrame);
    section.appendChild(illusClone);
  }

  bindSpacing(section);

  section.x = CONFIG.positionX;
  section.y = CONFIG.positionY;
  page.appendChild(section);

  figma.currentPage.selection = [section];
  figma.viewport.scrollAndZoomIntoView([section]);

  return { ok: true, id: section.id, w: Math.round(section.width), h: Math.round(section.height) };
})()
