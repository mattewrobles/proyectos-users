/**
 * AIRPALS — Landing Page completa
 * Navbar · Hero · Features · Story · CTA Final
 */

const LANDING_X = 14800;
const LANDING_Y = 2480;
const PAGE_W    = 1440;

const TS = {
  h1:           'af569f2dcf834882a8ceb7cd76c81fa8a28d86f3',
  h2:           'ee888841d77eab239b07d54f5b4507c20b05d102',
  h3:           'ffebb05a861b5fb3b66f8b16bbfbccd52b657423',
  subRegular:   '3f93f5621bf6aafe50dc56e495524c4ddb4a73a0',
  bodyMdMedium: '73cea9d2fa1f938fc07dc4428381731c1ad72348',
};

const COMP = {
  navbar:     'ce05c59f43a2cb5e4349d587396a9e8698c17c0a', // Navbar Desktop/Collapsed
  btnPrimary: '8e685884270ba324a8974d7ad44c4cbce1b2e957', // Button Primary/Default
  btnGhost:   'ca31257106e800cd8faeb2baad4149e3b8d15d58', // Button Ghost/Default
};

const ILLUS = {
  ia:             '28:2040',
  doctor:         '19:285',
  creativeFashion:'19:489',
  creativeDesign: '20:672',
  superHero:      '28:1913',
};

(async () => {
  try {
  const page = figma.root.children[0];
  await page.loadAsync();

  // ── Variables — solo las necesarias ───────────────────────────────────
  const NEEDED_VARS = ['text/primary','text/secondary','ilustraciones/background',
    'spacing/0','spacing/1','spacing/2','spacing/3','spacing/4','spacing/5','spacing/6',
    'spacing/7','spacing/8','spacing/9','spacing/10','spacing/12','spacing/14','spacing/16',
    'spacing/20','spacing/24','spacing/28','spacing/30','spacing/40','spacing/60',
    'border-radius/none','border-radius/DEFAULT','border-radius/md','border-radius/lg',
    'border-radius/xl','border-radius/2xl','border-radius/3xl','border-radius/full'];
  const libs = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
  const varMap = {};
  for (const lib of libs) {
    const vars = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(lib.key);
    for (const lv of vars) {
      if (NEEDED_VARS.includes(lv.name)) {
        varMap[lv.name] = await figma.variables.importVariableByKeyAsync(lv.key);
      }
    }
  }

  // ── Fonts ──────────────────────────────────────────────────────────────
  await figma.loadFontAsync({ family: 'Lexend', style: 'SemiBold' });
  await figma.loadFontAsync({ family: 'Inter',  style: 'Regular'  });
  await figma.loadFontAsync({ family: 'Inter',  style: 'Medium'   });
  await figma.loadFontAsync({ family: 'Inter',  style: 'Semi Bold'});

  // ── Text styles ────────────────────────────────────────────────────────
  const st = {};
  for (const [k, key] of Object.entries(TS)) {
    st[k] = await figma.importStyleByKeyAsync(key);
  }

  // ── Components ─────────────────────────────────────────────────────────
  const navbarComp   = await figma.importComponentByKeyAsync(COMP.navbar);
  const btnPrimComp  = await figma.importComponentByKeyAsync(COMP.btnPrimary);
  const btnGhostComp = await figma.importComponentByKeyAsync(COMP.btnGhost);

  // ── Helpers ────────────────────────────────────────────────────────────
  const applyToken = (node, token) => {
    const colors = {
      'text/primary':   { r: 0.107, g: 0.189, b: 0.424 },
      'text/secondary': { r: 0.278, g: 0.333, b: 0.412 },
    };
    if (varMap[token] && colors[token]) {
      node.fills = [{ type:'SOLID', color: colors[token],
        boundVariables:{ color:{ type:'VARIABLE_ALIAS', id: varMap[token].id } } }];
    }
  };

  const spMap = { 0:'spacing/0',4:'spacing/1',8:'spacing/2',12:'spacing/3',16:'spacing/4',20:'spacing/5',24:'spacing/6',32:'spacing/8',40:'spacing/10',48:'spacing/12',64:'spacing/16',80:'spacing/20',96:'spacing/24',114:'spacing/28',120:'spacing/30',160:'spacing/40',236:'spacing/60',240:'spacing/60' };
  const radMap = { 0:'border-radius/none',4:'border-radius/DEFAULT',8:'border-radius/lg',12:'border-radius/xl',16:'border-radius/2xl',24:'border-radius/3xl',9999:'border-radius/full' };
  const closest = (val, map) => {
    const keys = Object.keys(map).map(Number).sort((a,b)=>a-b);
    return map[keys.reduce((p,c) => Math.abs(c-val)<Math.abs(p-val)?c:p)];
  };
  const bindAll = (node) => {
    if (typeof node.itemSpacing === 'number' && node.itemSpacing > 0) {
      const t = closest(node.itemSpacing, spMap); if (varMap[t]) try { node.setBoundVariable('itemSpacing', varMap[t]); } catch(e){}
    }
    for (const prop of ['paddingTop','paddingBottom','paddingLeft','paddingRight']) {
      const v = node[prop]; if (typeof v==='number' && v>0) {
        const t = closest(v, spMap); if (varMap[t]) try { node.setBoundVariable(prop, varMap[t]); } catch(e){}
      }
    }
    if (typeof node.cornerRadius==='number' && node.cornerRadius>0) {
      const t = closest(node.cornerRadius, radMap); if (varMap[t]) try { node.setBoundVariable('cornerRadius', varMap[t]); } catch(e){}
    }
    if (node.children) node.children.forEach(bindAll);
  };

  const txt = (chars, styleKey, token, align='LEFT') => {
    const n = figma.createText();
    n.characters = chars;
    n.textStyleId = st[styleKey].id;
    n.textAlignHorizontal = align;
    applyToken(n, token);
    return n;
  };

  // VERTICAL frame helper
  const vf = (name, w, opts={}) => {
    const f = figma.createFrame();
    f.name = name;
    f.layoutMode = 'VERTICAL';
    f.primaryAxisSizingMode  = 'AUTO';
    f.counterAxisSizingMode  = w ? 'FIXED' : 'AUTO';
    if (w) { f.resize(w, 100); }
    f.primaryAxisAlignItems  = opts.main  || 'MIN';
    f.counterAxisAlignItems  = opts.cross || 'MIN';
    f.itemSpacing   = opts.gap || 0;
    f.paddingTop    = opts.pt  || opts.py || opts.p || 0;
    f.paddingBottom = opts.pb  || opts.py || opts.p || 0;
    f.paddingLeft   = opts.pl  || opts.px || opts.p || 0;
    f.paddingRight  = opts.pr  || opts.px || opts.p || 0;
    f.fills = [];
    if (opts.radius) f.cornerRadius = opts.radius;
    return f;
  };

  // HORIZONTAL frame helper
  const hf = (name, opts={}) => {
    const f = figma.createFrame();
    f.name = name;
    f.layoutMode = 'HORIZONTAL';
    f.primaryAxisSizingMode  = opts.fixedW ? 'FIXED' : 'AUTO';
    f.counterAxisSizingMode  = 'AUTO';
    if (opts.fixedW) f.resize(opts.fixedW, 100);
    f.primaryAxisAlignItems  = opts.main  || 'MIN';
    f.counterAxisAlignItems  = opts.cross || 'CENTER';
    f.itemSpacing   = opts.gap || 0;
    f.paddingLeft   = opts.px  || opts.p || 0;
    f.paddingRight  = opts.px  || opts.p || 0;
    f.paddingTop    = opts.py  || opts.p || 0;
    f.paddingBottom = opts.py  || opts.p || 0;
    f.fills = [];
    return f;
  };

  const btnLabel = (comp, label) => {
    const inst = comp.createInstance();
    try { inst.findOne(n=>n.type==='TEXT').characters = label; } catch(e){}
    return inst;
  };

  const cloneIllus = async (id, containerW=437, containerH=378) => {
    const node = await figma.getNodeByIdAsync(id);
    const c = node.clone();
    c.x = Math.round((containerW  - c.width)  / 2);
    c.y = Math.round((containerH - c.height) / 2);
    return c;
  };

  // ══════════════════════════════════════════════════════════════════════
  // 1. NAVBAR
  // ══════════════════════════════════════════════════════════════════════
  const navbar = navbarComp.createInstance();

  // ══════════════════════════════════════════════════════════════════════
  // 2. HERO — centrado, H1 + subtítulo + 2 botones
  // ══════════════════════════════════════════════════════════════════════
  const hero = vf('Hero', PAGE_W, { main:'CENTER', cross:'CENTER', py:120, px:236, gap:40 });

  const heroCol = vf('Hero text', 640, { main:'MIN', cross:'CENTER', gap:16 });
  const h1Node  = txt('Ship smarter. Together.', 'h1', 'text/primary', 'CENTER');
  const subNode = txt('Airpals is the all-in-one shipping platform built for modern office teams. Manage carriers, track packages, and empower every department — from one place.', 'subRegular', 'text/secondary', 'CENTER');
  heroCol.appendChild(h1Node);  h1Node.layoutSizingHorizontal  = 'FILL';
  heroCol.appendChild(subNode); subNode.layoutSizingHorizontal = 'FILL';

  const heroBtns = hf('Hero buttons', { gap:16, main:'CENTER' });
  heroBtns.appendChild(btnLabel(btnPrimComp,  'Start for free'));
  heroBtns.appendChild(btnLabel(btnGhostComp, 'See how it works'));

  hero.appendChild(heroCol);
  hero.appendChild(heroBtns);

  // ══════════════════════════════════════════════════════════════════════
  // 3. FEATURES — H2 + 4 info sections alternadas
  // ══════════════════════════════════════════════════════════════════════
  const features = vf('Features section', PAGE_W, { py:80, px:236, gap:80 });

  const featH2 = txt('Everything your team needs to ship', 'h2', 'text/primary');
  features.appendChild(featH2);
  featH2.layoutSizingHorizontal = 'FILL';

  const featureDefs = [
    { heading:'Ship from anywhere',          body:'From your office desk to a remote site — Airpals handles the carrier, label, and pickup. You just confirm and move on.',           illusId: ILLUS.ia,              imageLeft: true  },
    { heading:'Purpose-built for teams',     body:'From 10 to 10,000 shipments a month, Airpals grows with your team. Add members, assign roles, and keep every department shipping independently.', illusId: ILLUS.doctor,          imageLeft: false },
    { heading:'Track everything, live',      body:'Real-time status on every package your team sends. Automated updates and shareable tracking links — no carrier site-hopping required.',         illusId: ILLUS.creativeDesign,  imageLeft: true  },
    { heading:'Shipping for every industry', body:'From PR agencies to fashion brands, law firms to non-profits — Airpals fits how your team works, not the other way around.',                    illusId: ILLUS.creativeFashion, imageLeft: false },
  ];

  for (const fd of featureDefs) {
    // Image container
    const imgC = figma.createFrame();
    imgC.name = 'Image container'; imgC.resize(437, 378);
    imgC.layoutMode = 'NONE'; imgC.clipsContent = true; imgC.fills = [];
    const bg = figma.createEllipse(); bg.resize(378, 378); bg.x = 0; bg.y = 0;
    if (varMap['ilustraciones/background']) {
      bg.fills = [{ type:'SOLID', color:{r:0.902,g:0.949,b:1},
        boundVariables:{color:{type:'VARIABLE_ALIAS',id:varMap['ilustraciones/background'].id}} }];
    }
    imgC.appendChild(bg);
    imgC.appendChild(await cloneIllus(fd.illusId));

    // Text container
    const txC = vf('Text container', 398, { gap:20 });
    const fh  = txt(fd.heading, 'h3', 'text/primary');
    const fb  = txt(fd.body,    'bodyMdMedium', 'text/secondary');
    txC.appendChild(fh); fh.layoutSizingHorizontal = 'FILL';
    txC.appendChild(fb); fb.layoutSizingHorizontal = 'FILL';

    // Info section row
    const row = hf('Info section', { gap:124, main:'CENTER', cross:'CENTER' });
    if (fd.imageLeft) { row.appendChild(imgC); row.appendChild(txC); }
    else              { row.appendChild(txC);  row.appendChild(imgC); }
    features.appendChild(row);
  }

  // ══════════════════════════════════════════════════════════════════════
  // 4. STORY
  // ══════════════════════════════════════════════════════════════════════
  const story = hf('Story section', { fixedW: PAGE_W, gap:114, main:'CENTER', cross:'CENTER', px:236 });

  const storyIllus = await cloneIllus(ILLUS.superHero, 480, 380);

  const storyTxt = vf('Story text', 480, { gap:24 });
  const sH2  = txt('Built by a team that was tired of shipping chaos', 'h2', 'text/primary');
  const sBod = txt('We started Airpals because we were losing hours every week to carrier tabs, label printing, and tracking emails. Today, hundreds of teams use Airpals to ship smarter — and spend more time on work that actually matters.', 'bodyMdMedium', 'text/secondary');
  storyTxt.appendChild(sH2);  sH2.layoutSizingHorizontal  = 'FILL';
  storyTxt.appendChild(sBod); sBod.layoutSizingHorizontal = 'FILL';
  storyTxt.appendChild(btnLabel(btnPrimComp, 'Learn our story'));

  story.appendChild(storyIllus);
  story.appendChild(storyTxt);

  // ══════════════════════════════════════════════════════════════════════
  // 5. CTA FINAL — centrado
  // ══════════════════════════════════════════════════════════════════════
  const cta = vf('CTA Final', PAGE_W, { main:'CENTER', cross:'CENTER', py:120, px:240, gap:40 });

  const ctaInner = vf('CTA inner', 640, { main:'MIN', cross:'CENTER', gap:16 });
  const ctaH2  = txt('Ready to simplify your shipping?', 'h2', 'text/primary', 'CENTER');
  const ctaBod = txt('Join hundreds of teams already using Airpals. Set up in minutes, no credit card required.', 'bodyMdMedium', 'text/secondary', 'CENTER');
  ctaInner.appendChild(ctaH2);  ctaH2.layoutSizingHorizontal  = 'FILL';
  ctaInner.appendChild(ctaBod); ctaBod.layoutSizingHorizontal = 'FILL';

  cta.appendChild(ctaInner);
  cta.appendChild(btnLabel(btnPrimComp, 'Get started for free'));

  // ══════════════════════════════════════════════════════════════════════
  // STACK ON CANVAS
  // ══════════════════════════════════════════════════════════════════════
  const sections = [navbar, hero, features, story, cta];
  let y = LANDING_Y;
  for (const sec of sections) {
    page.appendChild(sec);
    sec.x = LANDING_X;
    sec.y = y;
    bindAll(sec);
    y += Math.round(sec.height);
  }

  figma.currentPage.selection = sections;
  figma.viewport.scrollAndZoomIntoView(sections);

  return {
    ok: true,
    totalHeight: y - LANDING_Y,
    sections: sections.map(s => ({ name:s.name, id:s.id, h:Math.round(s.height) })),
  };
})()
