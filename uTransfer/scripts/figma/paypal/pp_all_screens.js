(async () => {
// ══════════════════════════════════════════════════════════════════════
// UTRANSFER · FLUJO PAYPAL — Todas las pantallas
// Página destino: Borrrador USDT-ORO (5264:8513)
// Genera 12 pantallas del flujo PayPal (P1–P12)
// Ejecutar: node src/index.js run scripts/figma/paypal/pp_all_screens.js
// ══════════════════════════════════════════════════════════════════════

// ── FASE 1: PÁGINA ─────────────────────────────────────────────────
const PAGE_ID = '5264:8513';
const page = figma.root.children.find(p => p.id === PAGE_ID);
if (!page) return { error: 'Página Borrrador USDT-ORO no encontrada' };
await page.loadAsync();
await figma.setCurrentPageAsync(page);

// Limpiar pantallas anteriores
const PP_NAMES = ['PP·P1·Método','PP·P2·Otras billeteras','PP·P3·Sin cuenta',
  'PP·P4·Cuenta detectada','PP·P5·Correo validado','PP·P6·A quién',
  'PP·P7·Confirmar dest','PP·P8·Monto vacío','PP·P9·Monto nota',
  'PP·P10·Resumen','PP·P11·En proceso','PP·P12·Error'];
page.children.filter(n => PP_NAMES.includes(n.name)).forEach(n => n.remove());

// ── FASE 2: RECURSOS ────────────────────────────────────────────────
await Promise.all([
  figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
  figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
  figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' }),
  figma.loadFontAsync({ family: 'Inter', style: 'Bold' }),
]);

const allCols = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
async function importVar(col, name) {
  const c = allCols.find(x => x.name === col);
  if (!c) return null;
  const vs = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key);
  const v = vs.find(x => x.name === name);
  return v ? figma.variables.importVariableByKeyAsync(v.key) : null;
}

const spIds = {
  4:'VariableID:a76ac5afaf32fc7db440de629558bd67512ab705/40006136:103',
  8:'VariableID:c5eb1187ed05c87e0390d6245983d582fe4f8728/40006136:104',
  12:'VariableID:6a12f53ee51dc9af1f5c95a6108169f48bef89d1/40006136:105',
  16:'VariableID:fc630c4b3648e68ab3fc1f74a76dc49f812f7bda/40006136:106',
  20:'VariableID:c0ea2be6cafced44153f35cd1a2e79b1d092e5b9/40006136:107',
  24:'VariableID:12f7f87e25374c4dd6b48d3d90aadf75606fbf1b/40006136:108',
};
const sp = px => figma.variables.getVariableByIdAsync(spIds[px]);

const [bgFg, cardFill, cardNormal, textPrimary, textSecondary, textDisabled,
  statusInfo, radiusMd, radiusXl, radius2xl, radiusFull,
  s4, s8, s12, s16, s20, s24] = await Promise.all([
  importVar('🧩 Tokens','Backgrounds/Foreground'),
  importVar('🧩 Tokens','Cards-Fills/Card'),
  importVar('🧩 Tokens','Cards-Fills/Normal/Primary'),
  importVar('🧩 Tokens','Text/Primary'),
  importVar('🧩 Tokens','Text/secondary'),
  importVar('🧩 Tokens','Text/disabled'),
  importVar('🧩 Tokens','status/info'),
  importVar('⊙ Radius','Radius-md'),
  importVar('⊙ Radius','Radius-xl'),
  importVar('⊙ Radius','Radius-2xl'),
  importVar('⊙ Radius','Radius-full'),
  sp(4), sp(8), sp(12), sp(16), sp(20), sp(24),
]);

const [sbComp, hiComp, btnPrimComp, btnClearComp, btnOutlineComp,
  divComp, chevLComp, chevRComp, xComp,
  av40Comp, keyNumComp, keyTxtComp] = await Promise.all([
  figma.importComponentByKeyAsync('222088d248a045f3d2e7df151f7d613bbda7fafd'), // status bar light
  figma.importComponentByKeyAsync('e12f73d63ccef0537a22efd9a34228a9dc441bff'), // home indicator
  figma.importComponentByKeyAsync('15be15cfa0d8c4667e4eb8f84bf80f9919e019c9'), // btn giant primary
  figma.importComponentByKeyAsync('c4757e2398d2f767b0b188296d6efe17d15e1b9c'), // btn giant clear
  figma.importComponentByKeyAsync('146284f6239dc31deadffa00f134fbc1a2231397'), // btn giant outline primary
  figma.importComponentByKeyAsync('3b8ea15e6f8e5410181509a43c329036681099c5'), // divider
  figma.importComponentByKeyAsync('d2e8133159142cb934d56fc28be3ac0bc7eb07b4'), // chevron-left
  figma.importComponentByKeyAsync('4184359b7b0eaaa6b60716dfd9cdfa607915dd7f'), // chevron-right
  figma.importComponentByKeyAsync('394236ef44423b37e253530cb18e16f89d79b67c'), // x-02
  figma.importComponentByKeyAsync('1e31640c7d173bf06ce09f6735f9e77725b4e64c'), // avatar photo 40
  figma.importComponentByKeyAsync('9c1814d08f64b86d94c0280b4bc16ae550d1e1a9'), // keyboard numérico
  figma.importComponentByKeyAsync('a5fcc89522c698594fce3a50b87d7e43b1b37433'), // keyboard texto
]);

const [stH3, stH5, stSubM, stCaption, stBodySM] = await Promise.all([
  figma.importStyleByKeyAsync('41243533aec36fb477c160301ba9c854ebaf0c01'),
  figma.importStyleByKeyAsync('a761967b66cd94663df9cacbe06c32f68b48b7e7'),
  figma.importStyleByKeyAsync('df46c8797813b902f6164fa2ea73a2e58e0b13df'),
  figma.importStyleByKeyAsync('3c4a22b5a0d0e65480fea3cbc965b935ee9a610c'),
  figma.importStyleByKeyAsync('f62d08a99c5536e757c75e4620106c18c618a9d8'),
]);

// ── HELPERS ────────────────────────────────────────────────────────
const W = 393, H = 852;

function vFill(v) {
  return [{ type:'SOLID', color:{r:.1,g:.1,b:.1},
    boundVariables:{color:{type:'VARIABLE_ALIAS',id:v.id}} }];
}
function solidFill(r,g,b,a=1) {
  return [{ type:'SOLID', color:{r,g,b}, opacity:a }];
}
function bindR(n, rv) {
  ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius']
    .forEach(c => n.setBoundVariable(c, rv));
}

async function txt(chars, style, colorVar, align='LEFT') {
  const t = figma.createText();
  t.characters = chars;
  if (style) await t.setTextStyleIdAsync(style.id);
  if (colorVar) t.fills = vFill(colorVar);
  t.textAlignHorizontal = align;
  return t;
}

function hFrame(name, opts={}) {
  const f = figma.createFrame();
  f.name = name; f.layoutMode = 'HORIZONTAL';
  f.primaryAxisSizingMode = opts.fixedW ? 'FIXED' : 'AUTO';
  f.counterAxisSizingMode = opts.fixedH ? 'FIXED' : 'AUTO';
  f.counterAxisAlignItems = opts.align || 'CENTER';
  f.primaryAxisAlignItems = opts.justify || 'MIN';
  f.fills = []; f.itemSpacing = opts.gap || 0;
  if (opts.pad) { f.paddingLeft=opts.pad; f.paddingRight=opts.pad;
    f.paddingTop=opts.pad; f.paddingBottom=opts.pad; }
  return f;
}
function vFrame(name, opts={}) {
  const f = figma.createFrame();
  f.name = name; f.layoutMode = 'VERTICAL';
  f.primaryAxisSizingMode = opts.fixed ? 'FIXED' : 'AUTO';
  f.counterAxisSizingMode = 'AUTO';
  f.counterAxisAlignItems = opts.align || 'MIN';
  f.primaryAxisAlignItems = opts.justify || 'MIN';
  f.fills = []; f.itemSpacing = opts.gap || 0;
  if (opts.pad) { f.paddingLeft=opts.pad; f.paddingRight=opts.pad;
    f.paddingTop=opts.pad; f.paddingBottom=opts.pad; }
  return f;
}

// Screen base (393×852, FIXED, vertical)
function makeScreen(name, x, y=Y_ROW) {
  const s = figma.createFrame();
  s.name = name; s.resize(W, H);
  s.layoutMode = 'VERTICAL'; s.primaryAxisSizingMode = 'FIXED';
  s.counterAxisSizingMode = 'FIXED'; s.fills = vFill(bgFg);
  s.x = x; s.y = y; page.appendChild(s);
  return s;
}

// Status bar (always first child)
function addSB(screen) {
  const sb = sbComp.createInstance();
  screen.insertChild(0, sb);
  sb.layoutSizingHorizontal = 'FILL';
  return sb;
}

// Home indicator (always last child)
function addHI(screen) {
  const hi = hiComp.createInstance();
  screen.appendChild(hi);
  hi.layoutSizingHorizontal = 'FILL';
  return hi;
}

// Nav header
async function makeNav(title, hasClose=false) {
  const nav = hFrame('Nav', { gap:8 });
  nav.paddingLeft=20; nav.paddingRight=20;
  nav.paddingTop=12; nav.paddingBottom=12;

  if (!hasClose) {
    const back = chevLComp.createInstance(); back.resize(24,24);
    nav.appendChild(back);
  }

  const titleT = await txt(title, stH5, textPrimary);
  nav.appendChild(titleT);
  titleT.layoutGrow = 1;

  if (hasClose) {
    const close = xComp.createInstance(); close.resize(24,24);
    nav.appendChild(close);
  }
  return nav;
}

// Content scroll area
function makeContent(gap=20, pad=20) {
  const c = vFrame('Content', { gap });
  c.paddingLeft=pad; c.paddingRight=pad;
  c.paddingTop=pad; c.paddingBottom=pad;
  c.primaryAxisSizingMode = 'AUTO';
  return c;
}

// Illustration placeholder (centered pill card shape)
function makeIllustration() {
  const box = figma.createFrame();
  box.name = 'Illustration'; box.resize(120, 120);
  box.cornerRadius = 24;
  box.fills = solidFill(.94,.91,.99);
  const inner = figma.createFrame();
  inner.resize(64,64); inner.cornerRadius = 12;
  inner.fills = solidFill(.72,.55,.92);
  inner.x = 28; inner.y = 28;
  box.appendChild(inner);
  // card chip
  const chip = figma.createRectangle();
  chip.resize(24,16); chip.cornerRadius=4;
  chip.fills = solidFill(.93,.82,.2);
  chip.x = 20; chip.y = 24;
  inner.appendChild(chip);
  return box;
}

// CTA button helper
async function makePrimaryBtn(label, parent) {
  const btn = btnPrimComp.createInstance();
  parent.appendChild(btn);
  btn.layoutSizingHorizontal = 'FILL';
  btn.setProperties({'Icon Left#34:8':false,'Icon Right#34:7':false,'Style':'Primary','State':'Default'});
  const lbl = btn.findAllWithCriteria({types:['TEXT']})[0];
  await figma.loadFontAsync(lbl.fontName);
  lbl.characters = label;
  return btn;
}

async function makeClearBtn(label, parent) {
  const btn = btnClearComp.createInstance();
  parent.appendChild(btn);
  btn.layoutSizingHorizontal = 'FILL';
  btn.setProperties({'Icon Left#34:8':false,'Icon Right#34:7':false,'Style':'Clear','State':'Default'});
  const lbl = btn.findAllWithCriteria({types:['TEXT']})[0];
  await figma.loadFontAsync(lbl.fontName);
  lbl.characters = label;
  return btn;
}

// Info banner (blue background)
async function makeInfoBanner(text, parent) {
  const banner = hFrame('Info banner', { gap:8 });
  banner.paddingLeft=12; banner.paddingRight=12;
  banner.paddingTop=10; banner.paddingBottom=10;
  banner.fills = solidFill(.87,.94,1);
  if (radiusMd) bindR(banner, radiusMd);
  const t = await txt(text, stCaption, textPrimary);
  t.fills = solidFill(.1,.39,.78);
  banner.appendChild(t);
  parent.appendChild(banner);
  banner.layoutSizingHorizontal = 'FILL';
  return banner;
}

// PayPal "P" logo mark (simple colored circle with P)
async function makePayPalLogo(size=40) {
  const box = figma.createFrame();
  box.resize(size,size); box.cornerRadius=size/2;
  box.fills = solidFill(.0,.09,.53); // PayPal dark blue
  const p = await txt('P', stH5, null, 'CENTER');
  p.fills = solidFill(1,1,1);
  p.resize(size, size);
  p.textAlignVertical = 'CENTER';
  box.appendChild(p);
  return box;
}

// Contact row
async function makeContactRow(name, handle, email, parent, active=true) {
  const row = hFrame(`Contact·${name}`, { gap:12 });
  row.paddingTop=12; row.paddingBottom=12;
  parent.appendChild(row);
  row.layoutSizingHorizontal = 'FILL';

  const av = av40Comp.createInstance();
  row.appendChild(av);

  const info = vFrame('Info', { gap:2 });
  row.appendChild(info);
  info.layoutGrow = 1;

  const nameT = await txt(name, stSubM, active?textPrimary:textDisabled);
  info.appendChild(nameT);
  if (handle) {
    const handleT = await txt(handle, stCaption, textSecondary);
    info.appendChild(handleT);
  }
  if (email) {
    const emailT = await txt(email, stCaption, textSecondary);
    info.appendChild(emailT);
  }

  const chev = chevRComp.createInstance(); chev.resize(20,20);
  row.appendChild(chev);
  return row;
}

// Bottom sheet overlay
function makeSheet(screen, sheetH, title=null) {
  // Backdrop
  const bd = figma.createRectangle();
  bd.name='Backdrop'; bd.resize(W,H);
  bd.fills = solidFill(0,0,0,.45);
  screen.appendChild(bd);
  bd.layoutPositioning = 'ABSOLUTE';
  bd.x=0; bd.y=0;

  // Sheet
  const sheet = figma.createFrame();
  sheet.name = title||'Bottom Sheet';
  sheet.resize(W, sheetH);
  sheet.layoutMode = 'VERTICAL';
  sheet.primaryAxisSizingMode = 'FIXED';
  sheet.counterAxisSizingMode = 'FIXED';
  sheet.fills = cardFill ? vFill(cardFill) : solidFill(1,1,1);
  sheet.topLeftRadius = 24; sheet.topRightRadius = 24;
  sheet.paddingLeft=20; sheet.paddingRight=20;
  sheet.paddingTop=20; sheet.paddingBottom=32;
  sheet.itemSpacing = 16;
  screen.appendChild(sheet);
  sheet.layoutPositioning = 'ABSOLUTE';
  sheet.x=0; sheet.y=H-sheetH;
  return sheet;
}

// Keyboard (absolute at bottom)
function addKeyboard(screen, type='NUM') {
  const kb = (type==='NUM' ? keyNumComp : keyTxtComp).createInstance();
  screen.appendChild(kb);
  kb.layoutSizingHorizontal = 'FILL';
  kb.layoutPositioning = 'ABSOLUTE';
  kb.x=0; kb.y = H - kb.height;
  return kb;
}

// Divider
function addDivider(parent) {
  const d = divComp.createInstance();
  parent.appendChild(d);
  d.layoutSizingHorizontal = 'FILL';
  return d;
}

// ── POSITIONING ────────────────────────────────────────────────────
const GAP = 88;
let X = 0;
const Y_ROW = 1000; // Row 2: PP flow (W screens at Y=0)
const newScreens = [];
function nextX() { const x = X; X += W + GAP; return x; }

// ══════════════════════════════════════════════════════════════════════
// P1 · MÉTODO DE ENVÍO
// ══════════════════════════════════════════════════════════════════════
const p1 = makeScreen('PP·P1·Método', nextX());
newScreens.push(p1);
addSB(p1);

const p1Nav = await makeNav('Método de envío');
p1.appendChild(p1Nav); p1Nav.layoutSizingHorizontal='FILL';

const p1Content = makeContent(24);
p1.appendChild(p1Content); p1Content.layoutSizingHorizontal='FILL';

// Illustration centered
const p1IllustWrap = hFrame('Illust wrap', { justify:'CENTER' });
p1Content.appendChild(p1IllustWrap);
p1IllustWrap.layoutSizingHorizontal = 'FILL';
p1IllustWrap.appendChild(makeIllustration());

// Subtitle
const p1Sub = await txt('Selecciona desde donde enviarás dinero:', stSubM, textSecondary);
p1Content.appendChild(p1Sub); p1Sub.layoutSizingHorizontal='FILL';

// List container
const p1List = vFrame('Methods', { gap:0 });
p1Content.appendChild(p1List);
p1List.layoutSizingHorizontal = 'FILL';
if (cardFill) { p1List.fills = vFill(cardFill); }
if (radiusXl) bindR(p1List, radiusXl);

// Method row builder
async function makeMethodRow(icon, label, sub, badge=null, parent) {
  const row = hFrame(`Row·${label}`, { gap:16 });
  row.paddingLeft=16; row.paddingRight=16;
  row.paddingTop=16; row.paddingBottom=16;
  parent.appendChild(row);
  row.layoutSizingHorizontal = 'FILL';

  // Icon box
  const iconBox = figma.createFrame();
  iconBox.name='Icon'; iconBox.resize(44,44);
  iconBox.layoutMode='NONE'; iconBox.cornerRadius=12;
  iconBox.fills = cardNormal ? vFill(cardNormal) : solidFill(.95,.95,.95);
  row.appendChild(iconBox);
  const iconRect = figma.createRectangle();
  iconRect.resize(24,24); iconRect.x=10; iconRect.y=10;
  iconRect.cornerRadius=4; iconRect.fills = solidFill(.44,.2,.9,.6);
  iconBox.appendChild(iconRect);

  const info = vFrame('Info', { gap:2 });
  info.layoutGrow=1;
  row.appendChild(info);

  const labelT = await txt(label, stSubM, textPrimary);
  info.appendChild(labelT);
  const subT = await txt(sub, stCaption, textSecondary);
  info.appendChild(subT);

  if (badge) {
    const badgeF = hFrame('Badge', { gap:0 });
    badgeF.paddingLeft=8; badgeF.paddingRight=8;
    badgeF.paddingTop=4; badgeF.paddingBottom=4;
    badgeF.fills = solidFill(.36,.1,.84,.1);
    badgeF.cornerRadius=100;
    row.appendChild(badgeF);
    const bT = await txt(badge, stCaption, null);
    bT.fills = solidFill(.36,.1,.84);
    badgeF.appendChild(bT);
  }

  const chev = chevRComp.createInstance(); chev.resize(20,20);
  row.appendChild(chev);
  return row;
}

await makeMethodRow(null,'Mi billetera','Envía a contactos uTransfer','Más rápido', p1List);
addDivider(p1List);
await makeMethodRow(null,'Otras billeteras','Envía dinero a Paypal, Western Union y otros', null, p1List);
addDivider(p1List);
await makeMethodRow(null,'Tarjetas','Una nueva forma de enviar dinero', null, p1List);

addHI(p1);

// ══════════════════════════════════════════════════════════════════════
// P2 · MÉTODO + MODAL OTRAS BILLETERAS
// ══════════════════════════════════════════════════════════════════════
const p2 = makeScreen('PP·P2·Otras billeteras', nextX());
newScreens.push(p2);
// Clone P1 content visually
addSB(p2);
const p2Nav = await makeNav('Método de envío');
p2.appendChild(p2Nav); p2Nav.layoutSizingHorizontal='FILL';
const p2Content = makeContent(24);
p2.appendChild(p2Content); p2Content.layoutSizingHorizontal='FILL';
const p2IllustWrap = hFrame('Illust wrap',{justify:'CENTER'});
p2Content.appendChild(p2IllustWrap); p2IllustWrap.layoutSizingHorizontal='FILL';
p2IllustWrap.appendChild(makeIllustration());
const p2Sub = await txt('Selecciona desde donde enviarás dinero:', stSubM, textSecondary);
p2Content.appendChild(p2Sub); p2Sub.layoutSizingHorizontal='FILL';
const p2List = vFrame('Methods',{gap:0});
p2Content.appendChild(p2List); p2List.layoutSizingHorizontal='FILL';
if(cardFill) p2List.fills=vFill(cardFill); if(radiusXl) bindR(p2List,radiusXl);
await makeMethodRow(null,'Mi billetera','Envía a contactos uTransfer','Más rápido',p2List);
addDivider(p2List);
await makeMethodRow(null,'Otras billeteras','Envía dinero a Paypal, Western Union y otros',null,p2List);
addDivider(p2List);
await makeMethodRow(null,'Tarjetas','Una nueva forma de enviar dinero',null,p2List);
addHI(p2);

// Sheet
const sh2 = makeSheet(p2, 300, 'Otras billeteras');
const sh2Close = xComp.createInstance(); sh2Close.resize(24,24);
sh2.insertChild(0, sh2Close);

async function makeWalletRow(logo, name, sub, active, parent) {
  const row = hFrame(`Wallet·${name}`,{gap:12});
  row.paddingTop=14; row.paddingBottom=14;
  parent.appendChild(row); row.layoutSizingHorizontal='FILL';
  parent.insertChild(parent.children.length, row);
  const logoBox = figma.createFrame();
  logoBox.resize(40,40); logoBox.cornerRadius=20;
  logoBox.fills = active ? solidFill(.0,.44,.87) : solidFill(.9,.9,.9);
  row.appendChild(logoBox);
  const logoT = await txt(logo, stSubM, null,'CENTER');
  logoT.fills = active ? solidFill(1,1,1) : solidFill(.7,.7,.7);
  logoT.resize(40,40); logoT.textAlignVertical='CENTER';
  logoBox.appendChild(logoT);
  const info = vFrame('Info',{gap:2}); info.layoutGrow=1;
  row.appendChild(info);
  const nameT = await txt(name, stSubM, active?textPrimary:textDisabled);
  info.appendChild(nameT);
  const subT = await txt(sub, stCaption, textSecondary);
  info.appendChild(subT);
  if (active) {
    const chev = chevRComp.createInstance(); chev.resize(20,20);
    row.appendChild(chev);
  } else {
    const pill = hFrame('Badge',{gap:0});
    pill.paddingLeft=8; pill.paddingRight=8; pill.paddingTop=4; pill.paddingBottom=4;
    pill.fills=solidFill(.9,.9,.9); pill.cornerRadius=100;
    row.appendChild(pill);
    const pt = await txt('Próximamente', stCaption, textDisabled);
    pill.appendChild(pt);
  }
  return row;
}

await makeWalletRow('P','PayPal','Envía dinero a amigos y familiares',true,sh2);
addDivider(sh2);
await makeWalletRow('G','Global60','Envía dinero internacional',false,sh2);
addDivider(sh2);
await makeWalletRow('W','Wise','Transferencias internacionales',false,sh2);

// ══════════════════════════════════════════════════════════════════════
// P3 · ENVÍO PAYPAL — SIN CUENTA VINCULADA
// ══════════════════════════════════════════════════════════════════════
const p3 = makeScreen('PP·P3·Sin cuenta', nextX());
newScreens.push(p3);
addSB(p3);
const p3Nav = await makeNav('Envío PayPal');
p3.appendChild(p3Nav); p3Nav.layoutSizingHorizontal='FILL';
const p3Content = makeContent(24);
p3.appendChild(p3Content); p3Content.layoutSizingHorizontal='FILL';
const p3Iw = hFrame('Illust wrap',{justify:'CENTER'});
p3Content.appendChild(p3Iw); p3Iw.layoutSizingHorizontal='FILL';
p3Iw.appendChild(makeIllustration());
const p3Msg = await txt(
  'No hemos podido encontrar una cuenta PayPal asociada a tu correo electrónico, por favor vincula tu cuenta para continuar.',
  stSubM, textSecondary, 'CENTER');
p3Content.appendChild(p3Msg); p3Msg.layoutSizingHorizontal='FILL';
// Spacer
const sp3 = figma.createFrame();
sp3.name='Spacer'; sp3.resize(W-40,1); sp3.fills=[];
p3Content.appendChild(sp3);
sp3.layoutSizingVertical='FILL';
// Outline CTA
const p3Btn = btnOutlineComp ? btnOutlineComp.createInstance() : btnPrimComp.createInstance();
p3Content.appendChild(p3Btn); p3Btn.layoutSizingHorizontal='FILL';
try {
  p3Btn.setProperties({'Icon Left#34:8':false,'Icon Right#34:7':false,'Style':'Primary','State':'Default'});
} catch(e){}
const p3Lbl = p3Btn.findAllWithCriteria({types:['TEXT']})[0];
await figma.loadFontAsync(p3Lbl.fontName);
p3Lbl.characters = '+ Vincular cuenta PayPal';
addHI(p3);

// ══════════════════════════════════════════════════════════════════════
// P4 · ENVÍO PAYPAL — CUENTA AUTO-DETECTADA
// ══════════════════════════════════════════════════════════════════════
const p4 = makeScreen('PP·P4·Cuenta detectada', nextX());
newScreens.push(p4);
addSB(p4);
const p4Nav = await makeNav('Envío PayPal');
p4.appendChild(p4Nav); p4Nav.layoutSizingHorizontal='FILL';
const p4Content = makeContent(24);
p4.appendChild(p4Content); p4Content.layoutSizingHorizontal='FILL';
const p4Iw = hFrame('Illust wrap',{justify:'CENTER'});
p4Content.appendChild(p4Iw); p4Iw.layoutSizingHorizontal='FILL';
p4Iw.appendChild(makeIllustration());
const p4Msg = await txt(
  'Tu correo registrado en uTransfer tiene una cuenta asociada en PayPal, puedes usar esa cuenta o vincular una nueva.',
  stSubM, textSecondary, 'CENTER');
p4Content.appendChild(p4Msg); p4Msg.layoutSizingHorizontal='FILL';
// Account card
const p4Card = vFrame('Account card',{gap:0});
p4Content.appendChild(p4Card);
p4Card.layoutSizingHorizontal='FILL';
if(cardFill) p4Card.fills=vFill(cardFill);
if(radiusXl) bindR(p4Card, radiusXl);
await makeContactRow('Richard Basantes','@galitu1','richard.basantes@email.com', p4Card, true);
addHI(p4);

// ══════════════════════════════════════════════════════════════════════
// P5 · P4 + MODAL CORREO VALIDADO
// ══════════════════════════════════════════════════════════════════════
const p5 = makeScreen('PP·P5·Correo validado', nextX());
newScreens.push(p5);
addSB(p5);
const p5Nav = await makeNav('Envío PayPal');
p5.appendChild(p5Nav); p5Nav.layoutSizingHorizontal='FILL';
const p5Content = makeContent(24);
p5.appendChild(p5Content); p5Content.layoutSizingHorizontal='FILL';
const p5Iw = hFrame('Illust wrap',{justify:'CENTER'});
p5Content.appendChild(p5Iw); p5Iw.layoutSizingHorizontal='FILL';
p5Iw.appendChild(makeIllustration());
const p5Msg = await txt(
  'Tu correo registrado en uTransfer tiene una cuenta asociada en PayPal.',
  stSubM, textSecondary, 'CENTER');
p5Content.appendChild(p5Msg); p5Msg.layoutSizingHorizontal='FILL';
addHI(p5);

const sh5 = makeSheet(p5, 380, 'Correo validado');
// Close
const sh5X = xComp.createInstance(); sh5X.resize(24,24);
sh5.appendChild(sh5X);
// PP Logo centered
const sh5LogoWrap = hFrame('Logo wrap',{justify:'CENTER'});
sh5.appendChild(sh5LogoWrap); sh5LogoWrap.layoutSizingHorizontal='FILL';
sh5LogoWrap.appendChild(await makePayPalLogo(60));
// Title + subtitle
const sh5Title = await txt('Correo validado', stH5, textPrimary, 'CENTER');
sh5.appendChild(sh5Title); sh5Title.layoutSizingHorizontal='FILL';
const sh5Sub = await txt(
  'Hemos validado con éxito tu correo. ¿Deseas continuar y agregar tu cuenta?',
  stCaption, textSecondary, 'CENTER');
sh5.appendChild(sh5Sub); sh5Sub.layoutSizingHorizontal='FILL';
addDivider(sh5);
// Label
const sh5Lbl = await txt('Cuenta de PayPal validada', stCaption, textSecondary);
sh5.appendChild(sh5Lbl);
// Account row
const sh5Row = hFrame('Account row',{gap:12});
sh5.appendChild(sh5Row); sh5Row.layoutSizingHorizontal='FILL';
sh5Row.appendChild(av40Comp.createInstance());
const sh5Info = vFrame('Info',{gap:2}); sh5Row.appendChild(sh5Info); sh5Info.layoutGrow=1;
sh5Info.appendChild(await txt('Richard Basantes', stSubM, textPrimary));
sh5Info.appendChild(await txt('@galitu1', stCaption, textSecondary));
await makePrimaryBtn('Continuar', sh5);

// ══════════════════════════════════════════════════════════════════════
// P6 · ¿A QUIÉN ENVÍAS? (lista contactos PayPal)
// ══════════════════════════════════════════════════════════════════════
const p6 = makeScreen('PP·P6·A quién', nextX());
newScreens.push(p6);
addSB(p6);
const p6Nav = await makeNav('¿A quién envías?');
p6.appendChild(p6Nav); p6Nav.layoutSizingHorizontal='FILL';
const p6Content = makeContent(16);
p6.appendChild(p6Content); p6Content.layoutSizingHorizontal='FILL';

// Search bar
const p6Search = hFrame('Search',{gap:8});
p6Search.paddingLeft=12; p6Search.paddingRight=12;
p6Search.paddingTop=12; p6Search.paddingBottom=12;
p6Search.fills = cardNormal ? vFill(cardNormal) : solidFill(.95,.95,.95);
if(radiusMd) bindR(p6Search, radiusMd);
p6Content.appendChild(p6Search); p6Search.layoutSizingHorizontal='FILL';
p6Search.appendChild(await txt('Buscar', stSubM, textDisabled));

await makeInfoBanner('Únicamente puedes enviar a contactos que se hayan registrado en PayPal', p6Content);

// PayPal header
const p6PPHdr = hFrame('PP header',{gap:8});
p6Content.appendChild(p6PPHdr); p6PPHdr.layoutSizingHorizontal='FILL';
p6PPHdr.appendChild(await makePayPalLogo(24));
p6PPHdr.appendChild(await txt('Contactos PayPal', stSubM, textPrimary));

// Contacts list
const p6List = vFrame('Contacts',{gap:0});
p6Content.appendChild(p6List); p6List.layoutSizingHorizontal='FILL';
if(cardFill) p6List.fills=vFill(cardFill);
if(radiusXl) bindR(p6List, radiusXl);

const contacts = [
  ['María Cajas','maria2011@gmail.com'],
  ['María Peña','maria01@email.com'],
  ['María Rojas','maria02@email.com'],
  ['Sarah Cajas','sakeloj@email.com'],
  ['Samantha Lee','samantha@mail.com'],
  ['Javier Gomez','javgomez@mail.com'],
  ['Javier Gomez','javier@mail.com'],
];
for (let i=0; i<contacts.length; i++) {
  if (i>0) addDivider(p6List);
  const [n,e] = contacts[i];
  await makeContactRow(n, null, e, p6List, i<contacts.length-1);
}
addHI(p6);

// ══════════════════════════════════════════════════════════════════════
// P7 · ¿A QUIÉN? + MODAL ¿ES ESTA LA PERSONA?
// ══════════════════════════════════════════════════════════════════════
const p7 = makeScreen('PP·P7·Confirmar dest', nextX());
newScreens.push(p7);
addSB(p7);
const p7Nav = await makeNav('¿A quién envías?');
p7.appendChild(p7Nav); p7Nav.layoutSizingHorizontal='FILL';
const p7Content = makeContent(16);
p7.appendChild(p7Content); p7Content.layoutSizingHorizontal='FILL';
const p7Search = hFrame('Search',{gap:8});
p7Search.paddingLeft=12; p7Search.paddingRight=12;
p7Search.paddingTop=12; p7Search.paddingBottom=12;
p7Search.fills = cardNormal?vFill(cardNormal):solidFill(.95,.95,.95);
if(radiusMd) bindR(p7Search,radiusMd);
p7Content.appendChild(p7Search); p7Search.layoutSizingHorizontal='FILL';
p7Search.appendChild(await txt('Buscar', stSubM, textDisabled));
await makeInfoBanner('Únicamente puedes enviar a contactos que se hayan registrado en PayPal', p7Content);
const p7PPHdr = hFrame('PP header',{gap:8});
p7Content.appendChild(p7PPHdr); p7PPHdr.layoutSizingHorizontal='FILL';
p7PPHdr.appendChild(await makePayPalLogo(24));
p7PPHdr.appendChild(await txt('Contactos PayPal', stSubM, textPrimary));
const p7List = vFrame('Contacts',{gap:0});
p7Content.appendChild(p7List); p7List.layoutSizingHorizontal='FILL';
if(cardFill) p7List.fills=vFill(cardFill); if(radiusXl) bindR(p7List,radiusXl);
for(let i=0;i<contacts.length;i++){if(i>0)addDivider(p7List);const[n,e]=contacts[i];await makeContactRow(n,null,e,p7List,i<contacts.length-1);}
addHI(p7);

const sh7 = makeSheet(p7, 260, '¿Es esta la persona?');
sh7.counterAxisAlignItems = 'CENTER';
const sh7X = xComp.createInstance(); sh7X.resize(24,24);
const sh7Xwrap = hFrame('Close wrap',{justify:'MIN'});
sh7Xwrap.appendChild(sh7X); sh7.appendChild(sh7Xwrap); sh7Xwrap.layoutSizingHorizontal='FILL';
sh7.appendChild(av40Comp.createInstance());
sh7.appendChild(await txt('María Cajas', stH5, textPrimary, 'CENTER'));
sh7.appendChild(await txt('¿Es esta la persona correcta?', stSubM, textSecondary, 'CENTER'));
await makePrimaryBtn('Continuar', sh7);

// ══════════════════════════════════════════════════════════════════════
// P8 · ¿CUÁNTO ENVÍAS? — $0 VACÍO + KEYBOARD NUMÉRICO
// ══════════════════════════════════════════════════════════════════════
const p8 = makeScreen('PP·P8·Monto vacío', nextX());
newScreens.push(p8);
addSB(p8);
const p8Nav = await makeNav('¿Cuánto envías?');
p8.appendChild(p8Nav); p8Nav.layoutSizingHorizontal='FILL';
const p8Content = makeContent(20);
p8.appendChild(p8Content); p8Content.layoutSizingHorizontal='FILL';

// Amount display
const p8Amount = await txt('$0', stH3, textDisabled, 'CENTER');
p8Content.appendChild(p8Amount); p8Amount.layoutSizingHorizontal='FILL';

// Comisión
const p8Comm = hFrame('Comisión',{gap:4,justify:'SPACE_BETWEEN'});
p8Content.appendChild(p8Comm); p8Comm.layoutSizingHorizontal='FILL';
p8Comm.appendChild(await txt('Comisión:', stCaption, textSecondary));
p8Comm.appendChild(await txt('-0.00', stCaption, textSecondary));

// Toggle row
const p8Toggle = hFrame('Toggle row',{gap:8,justify:'SPACE_BETWEEN'});
p8Content.appendChild(p8Toggle); p8Toggle.layoutSizingHorizontal='FILL';
p8Toggle.appendChild(await txt('Agregar nota (opcional)', stSubM, textSecondary));
const p8Sw = figma.createRectangle();
p8Sw.resize(44,24); p8Sw.cornerRadius=12;
p8Sw.fills=solidFill(.85,.85,.85);
p8Toggle.appendChild(p8Sw);
const p8SwKnob = figma.createEllipse();
p8SwKnob.resize(20,20);

await makeInfoBanner('Límite de: $1000.00 USD por solicitud.', p8Content);

// Quick amount pills
const p8Pills = hFrame('Quick amounts',{gap:12});
p8Content.appendChild(p8Pills); p8Pills.layoutSizingHorizontal='FILL';
for (const amt of ['$25','$100','$200']) {
  const pill = hFrame(`Pill·${amt}`,{gap:0});
  pill.paddingLeft=20; pill.paddingRight=20; pill.paddingTop=10; pill.paddingBottom=10;
  pill.fills=cardNormal?vFill(cardNormal):solidFill(.95,.95,.95); pill.cornerRadius=100;
  pill.layoutGrow=1;
  p8Pills.appendChild(pill);
  const pt = await txt(amt, stSubM, textPrimary, 'CENTER');
  pill.appendChild(pt); pt.layoutSizingHorizontal='FILL';
}

// Continuar (disabled)
const p8Btn = btnPrimComp.createInstance();
p8Content.appendChild(p8Btn); p8Btn.layoutSizingHorizontal='FILL';
p8Btn.setProperties({'Icon Left#34:8':false,'Icon Right#34:7':false,'Style':'Primary','State':'Disabled'});
const p8BtnLbl = p8Btn.findAllWithCriteria({types:['TEXT']})[0];
await figma.loadFontAsync(p8BtnLbl.fontName); p8BtnLbl.characters='Continuar';

addKeyboard(p8, 'NUM');
addHI(p8);

// ══════════════════════════════════════════════════════════════════════
// P9 · ¿CUÁNTO ENVÍAS? — $10 + NOTA ESCRITA + KEYBOARD TEXTO
// ══════════════════════════════════════════════════════════════════════
const p9 = makeScreen('PP·P9·Monto nota', nextX());
newScreens.push(p9);
addSB(p9);
const p9Nav = await makeNav('¿Cuánto envías?');
p9.appendChild(p9Nav); p9Nav.layoutSizingHorizontal='FILL';
const p9Content = makeContent(20);
p9.appendChild(p9Content); p9Content.layoutSizingHorizontal='FILL';

const p9Amount = await txt('$10', stH3, textPrimary, 'CENTER');
p9Content.appendChild(p9Amount); p9Amount.layoutSizingHorizontal='FILL';
const p9Comm = hFrame('Comisión',{gap:4,justify:'SPACE_BETWEEN'});
p9Content.appendChild(p9Comm); p9Comm.layoutSizingHorizontal='FILL';
p9Comm.appendChild(await txt('Comisión:', stCaption, textSecondary));
p9Comm.appendChild(await txt('-0.00', stCaption, textSecondary));

// Toggle ON
const p9Toggle = hFrame('Toggle row',{gap:8,justify:'SPACE_BETWEEN'});
p9Content.appendChild(p9Toggle); p9Toggle.layoutSizingHorizontal='FILL';
p9Toggle.appendChild(await txt('Agregar nota (opcional)', stSubM, textPrimary));
const p9Sw = figma.createRectangle();
p9Sw.resize(44,24); p9Sw.cornerRadius=12;
p9Sw.fills=solidFill(.44,.2,.9); // ON state
p9Toggle.appendChild(p9Sw);

// Note input
const p9Note = hFrame('Note input',{gap:0});
p9Note.paddingLeft=12; p9Note.paddingRight=12;
p9Note.paddingTop=12; p9Note.paddingBottom=12;
p9Note.fills=cardNormal?vFill(cardNormal):solidFill(.95,.95,.95);
if(radiusMd) bindR(p9Note,radiusMd);
p9Content.appendChild(p9Note); p9Note.layoutSizingHorizontal='FILL';
const p9NoteT = await txt('Pago de renta mensual departamento 402 - Marzo 2026', stSubM, textPrimary);
p9Note.appendChild(p9NoteT); p9NoteT.layoutSizingHorizontal='FILL';

await makeInfoBanner('Límite de $100.00 USD por solicitud. Máximo 5 envíos permitidos por día.', p9Content);
await makePrimaryBtn('Continuar', p9Content);
addKeyboard(p9, 'TXT');
addHI(p9);

// ══════════════════════════════════════════════════════════════════════
// P10 · P9 + MODAL RESUMEN
// ══════════════════════════════════════════════════════════════════════
const p10 = makeScreen('PP·P10·Resumen', nextX());
newScreens.push(p10);
addSB(p10);
const p10Nav = await makeNav('¿Cuánto envías?');
p10.appendChild(p10Nav); p10Nav.layoutSizingHorizontal='FILL';
const p10Content = makeContent(20);
p10.appendChild(p10Content); p10Content.layoutSizingHorizontal='FILL';
const p10Amt = await txt('$10', stH3, textPrimary, 'CENTER');
p10Content.appendChild(p10Amt); p10Amt.layoutSizingHorizontal='FILL';
await makePrimaryBtn('Continuar', p10Content);
addHI(p10);

const sh10 = makeSheet(p10, 440, 'Resumen');
sh10.appendChild(await txt('Resumen', stH5, textPrimary, 'CENTER'));
// Método de pago section
sh10.appendChild(await txt('Método de pago', stCaption, textSecondary));
const sh10Method = hFrame('Method row',{gap:12});
sh10.appendChild(sh10Method); sh10Method.layoutSizingHorizontal='FILL';
sh10Method.appendChild(await makePayPalLogo(36));
const sh10Info = vFrame('Info',{gap:2}); sh10Method.appendChild(sh10Info); sh10Info.layoutGrow=1;
sh10Info.appendChild(await txt('Mi billetera · PayPal', stSubM, textPrimary));
sh10Info.appendChild(await txt('Debería llegar en aproximadamente 1 hora', stCaption, textSecondary));
addDivider(sh10);
// Datos de envío
sh10.appendChild(await txt('Datos de envío', stCaption, textSecondary));
const sh10Dest = hFrame('Dest row',{gap:12});
sh10.appendChild(sh10Dest); sh10Dest.layoutSizingHorizontal='FILL';
sh10Dest.appendChild(av40Comp.createInstance());
const sh10DInfo = vFrame('Info',{gap:2}); sh10Dest.appendChild(sh10DInfo); sh10DInfo.layoutGrow=1;
sh10DInfo.appendChild(await txt('María Cajas', stSubM, textPrimary));
sh10DInfo.appendChild(await txt('maria2011@gmail.com', stCaption, textSecondary));
// Amounts
async function amountRow(label, amount, bold=false, parent) {
  const r = hFrame(`Row·${label}`,{gap:4,justify:'SPACE_BETWEEN'});
  parent.appendChild(r); r.layoutSizingHorizontal='FILL';
  r.appendChild(await txt(label, stCaption, textSecondary));
  const aT = await txt(amount, stCaption, bold?textPrimary:textSecondary);
  if(bold) { aT.fills=solidFill(.27,.07,.84); }
  r.appendChild(aT);
  return r;
}
await amountRow('Envíos', '$10.00', false, sh10);
await amountRow('Comisión', '0.00', false, sh10);
await amountRow('Total', '$10.00 USD', true, sh10);
sh10.appendChild(await txt('Nota: Pago de renta mensual departamento 402 - Marzo 2026', stCaption, textSecondary));
await makePrimaryBtn('Enviar', sh10);

// ══════════════════════════════════════════════════════════════════════
// P11 · EN PROCESO (LOADING)
// ══════════════════════════════════════════════════════════════════════
const p11 = makeScreen('PP·P11·En proceso', nextX());
newScreens.push(p11);
addSB(p11);
// Centered content
const p11Center = vFrame('Center',{gap:24,align:'CENTER'});
p11Center.paddingLeft=40; p11Center.paddingRight=40;
p11Center.primaryAxisSizingMode='AUTO'; p11Center.counterAxisSizingMode='FIXED';
p11Center.resize(393,10);
p11.appendChild(p11Center); p11Center.layoutSizingHorizontal='FILL';
p11Center.layoutSizingVertical='FILL';
// Spinner circle
const spinner = figma.createEllipse();
spinner.resize(80,80); spinner.fills=[];
spinner.strokes=[{type:'SOLID',color:{r:.44,g:.2,b:.9}}];
spinner.strokeWeight=4;
const spinWrap = hFrame('Spin wrap',{justify:'CENTER'});
p11Center.appendChild(spinWrap); spinWrap.layoutSizingHorizontal='FILL';
spinWrap.appendChild(spinner);
p11Center.appendChild(await txt('Procesando tu transferencia...', stH5, textPrimary, 'CENTER'));
p11Center.appendChild(await txt('Por favor espera, esto puede tardar unos segundos.', stSubM, textSecondary, 'CENTER'));
addHI(p11);

// ══════════════════════════════════════════════════════════════════════
// P12 · ERROR TRANSACCIÓN
// ══════════════════════════════════════════════════════════════════════
const p12 = makeScreen('PP·P12·Error', nextX());
newScreens.push(p12);
addSB(p12);
const p12Center = vFrame('Center',{gap:24,align:'CENTER'});
p12Center.paddingLeft=40; p12Center.paddingRight=40; p12Center.paddingTop=60;
p12Center.primaryAxisSizingMode='AUTO'; p12Center.counterAxisSizingMode='FIXED';
p12Center.resize(393,10);
p12.appendChild(p12Center); p12Center.layoutSizingHorizontal='FILL';
// Error icon
const errCircle = figma.createFrame();
errCircle.name='Err circle'; errCircle.resize(80,80); errCircle.cornerRadius=40;
errCircle.layoutMode='NONE';
errCircle.fills=solidFill(.94,.17,.17,.15);
errCircle.strokes=[{type:'SOLID',color:{r:.85,g:.1,b:.1}}];
errCircle.strokeWeight=2;
const errWrap = hFrame('Err wrap',{justify:'CENTER'});
p12Center.appendChild(errWrap); errWrap.layoutSizingHorizontal='FILL'; errWrap.appendChild(errCircle);
const errX = await txt('✕', stH3, null, 'CENTER');
errX.fills=solidFill(.85,.1,.1); errX.resize(80,80); errX.textAlignVertical='CENTER';
errCircle.appendChild(errX);

p12Center.appendChild(await txt('Error en la transacción', stH5, textPrimary, 'CENTER'));
p12Center.appendChild(await txt('No se pudo completar la transferencia. Por favor intenta de nuevo.', stSubM, textSecondary, 'CENTER'));
const p12Spacer = figma.createFrame(); p12Spacer.name='Spacer'; p12Spacer.fills=[];
p12Spacer.resize(1,1);
p12.appendChild(p12Spacer); p12Spacer.layoutSizingVertical='FILL';
// BTAs
const p12BtnArea = vFrame('BTAs',{gap:12}); p12BtnArea.paddingLeft=20; p12BtnArea.paddingRight=20; p12BtnArea.paddingBottom=32;
p12.appendChild(p12BtnArea); p12BtnArea.layoutSizingHorizontal='FILL';
await makePrimaryBtn('Intentar de nuevo', p12BtnArea);
await makeClearBtn('Volver al inicio', p12BtnArea);
addHI(p12);

// ── FIN: navegar y seleccionar ──────────────────────────────────────
figma.viewport.scrollAndZoomIntoView(newScreens);
figma.currentPage.selection = newScreens;

return {
  ok: true,
  screens: newScreens.map(s => ({ id: s.id, name: s.name })),
};
})()
