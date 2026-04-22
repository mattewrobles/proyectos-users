(async () => {
// ══════════════════════════════════════════════════════════════════════
// UTRANSFER · FLUJO VISA DIRECT INTERNACIONAL — Todas las pantallas
// Página destino: Borrrador USDT-ORO (5264:8513)
// Genera 7 pantallas del flujo VD Internacional (V1–V7)
// Para Nacional: mismo flujo, cambiar "Internacional" → "Nacional", quitar selector de país destino
// Ejecutar: node src/index.js run scripts/figma/visadirect/vd_all_screens.js
// ══════════════════════════════════════════════════════════════════════

const PAGE_ID = '5264:8513';
const page = figma.root.children.find(p => p.id === PAGE_ID);
if (!page) return { error: 'Página Borrrador USDT-ORO no encontrada' };
await page.loadAsync();
await figma.setCurrentPageAsync(page);

const VD_NAMES = ['VD·V1·Tipo envío','VD·V2·Enviar vacío','VD·V3·Enviar lleno',
  'VD·V4·A quién','VD·V5·Invitar','VD·V6·Monto','VD·V7·Error'];
page.children.filter(n => VD_NAMES.includes(n.name)).forEach(n => n.remove());

// ── RECURSOS ────────────────────────────────────────────────────────
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
  radiusMd, radiusXl, radius2xl, radiusFull] = await Promise.all([
  importVar('🧩 Tokens','Backgrounds/Foreground'),
  importVar('🧩 Tokens','Cards-Fills/Card'),
  importVar('🧩 Tokens','Cards-Fills/Normal/Primary'),
  importVar('🧩 Tokens','Text/Primary'),
  importVar('🧩 Tokens','Text/secondary'),
  importVar('🧩 Tokens','Text/disabled'),
  importVar('⊙ Radius','Radius-md'),
  importVar('⊙ Radius','Radius-xl'),
  importVar('⊙ Radius','Radius-2xl'),
  importVar('⊙ Radius','Radius-full'),
]);

const [sbComp, hiComp, btnPrimComp, btnClearComp,
  divComp, chevLComp, chevRComp, xComp,
  av40Comp, av64Comp, keyTxtComp,
  flagECComp, flagUSComp, flagMXComp, flagCOComp] = await Promise.all([
  figma.importComponentByKeyAsync('222088d248a045f3d2e7df151f7d613bbda7fafd'),
  figma.importComponentByKeyAsync('e12f73d63ccef0537a22efd9a34228a9dc441bff'),
  figma.importComponentByKeyAsync('15be15cfa0d8c4667e4eb8f84bf80f9919e019c9'),
  figma.importComponentByKeyAsync('c4757e2398d2f767b0b188296d6efe17d15e1b9c'),
  figma.importComponentByKeyAsync('3b8ea15e6f8e5410181509a43c329036681099c5'),
  figma.importComponentByKeyAsync('d2e8133159142cb934d56fc28be3ac0bc7eb07b4'),
  figma.importComponentByKeyAsync('4184359b7b0eaaa6b60716dfd9cdfa607915dd7f'), // chevron-right
  figma.importComponentByKeyAsync('394236ef44423b37e253530cb18e16f89d79b67c'),
  figma.importComponentByKeyAsync('1e31640c7d173bf06ce09f6735f9e77725b4e64c'),
  figma.importComponentByKeyAsync('806cf30500b782fe99e767c5148858538b0bdaa9'),
  figma.importComponentByKeyAsync('a5fcc89522c698594fce3a50b87d7e43b1b37433'),
  figma.importComponentByKeyAsync('2cc93bd54102afec92841ab9579704fff2e1921b'), // EC
  figma.importComponentByKeyAsync('71279fdedb0ee3a7986337d18e0fc879afa4179a'), // ES (placeholder US)
  figma.importComponentByKeyAsync('8fcb4e7700ae608374c379c0cba6e6ec877377c3'), // MX
  figma.importComponentByKeyAsync('9a7b4545019a18795f50ff0848728a3053d78e87'), // CO
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
  return [{type:'SOLID',color:{r:.1,g:.1,b:.1},
    boundVariables:{color:{type:'VARIABLE_ALIAS',id:v.id}}}];
}
function solid(r,g,b,a=1) { return [{type:'SOLID',color:{r,g,b},opacity:a}]; }
function bindR(n, rv) {
  ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius']
    .forEach(c => n.setBoundVariable(c, rv));
}
async function txt(chars, style, colorVar, align='LEFT') {
  const t = figma.createText(); t.characters = chars;
  if (style) await t.setTextStyleIdAsync(style.id);
  if (colorVar) t.fills = vFill(colorVar);
  t.textAlignHorizontal = align;
  return t;
}
function hFrame(name, opts={}) {
  const f = figma.createFrame(); f.name=name; f.layoutMode='HORIZONTAL';
  f.primaryAxisSizingMode = opts.fixedW?'FIXED':'AUTO';
  f.counterAxisSizingMode = opts.fixedH?'FIXED':'AUTO';
  f.counterAxisAlignItems = opts.align||'CENTER';
  f.primaryAxisAlignItems = opts.justify||'MIN';
  f.fills = []; f.itemSpacing = opts.gap||0;
  if(opts.pad){f.paddingLeft=opts.pad;f.paddingRight=opts.pad;f.paddingTop=opts.pad;f.paddingBottom=opts.pad;}
  return f;
}
function vFrame(name, opts={}) {
  const f = figma.createFrame(); f.name=name; f.layoutMode='VERTICAL';
  f.primaryAxisSizingMode = opts.fixed?'FIXED':'AUTO';
  f.counterAxisSizingMode = opts.counterFill?'FILL':'AUTO';
  f.counterAxisAlignItems = opts.align||'MIN';
  f.fills = []; f.itemSpacing = opts.gap||0;
  if(opts.pad){f.paddingLeft=opts.pad;f.paddingRight=opts.pad;f.paddingTop=opts.pad;f.paddingBottom=opts.pad;}
  return f;
}
function makeScreen(name, x, y=Y_ROW) {
  const s = figma.createFrame(); s.name=name; s.resize(W,H);
  s.layoutMode='VERTICAL'; s.primaryAxisSizingMode='FIXED';
  s.counterAxisSizingMode='FIXED'; s.fills=vFill(bgFg);
  s.x=x; s.y=y; page.appendChild(s); return s;
}
function addSB(screen) {
  const sb=sbComp.createInstance(); screen.insertChild(0,sb);
  sb.layoutSizingHorizontal='FILL'; return sb;
}
function addHI(screen) {
  const hi=hiComp.createInstance(); screen.appendChild(hi);
  hi.layoutSizingHorizontal='FILL'; return hi;
}
async function makeNav(title) {
  const nav=hFrame('Nav',{gap:8});
  nav.paddingLeft=20; nav.paddingRight=20; nav.paddingTop=12; nav.paddingBottom=12;
  const back=chevLComp.createInstance(); back.resize(24,24); nav.appendChild(back);
  const t=await txt(title,stH5,textPrimary); nav.appendChild(t); t.layoutGrow=1;
  return nav;
}
function makeContent(gap=20,pad=20) {
  const c=vFrame('Content',{gap}); c.paddingLeft=pad; c.paddingRight=pad;
  c.paddingTop=pad; c.paddingBottom=pad; c.primaryAxisSizingMode='AUTO'; return c;
}
function makeIllustration() {
  const box=figma.createFrame(); box.name='Illustration'; box.resize(120,120);
  box.cornerRadius=24; box.fills=solid(.94,.91,.99);
  const inner=figma.createFrame(); inner.resize(64,64); inner.cornerRadius=12;
  inner.fills=solid(.72,.55,.92); inner.x=28; inner.y=28; box.appendChild(inner);
  const chip=figma.createRectangle(); chip.resize(24,16); chip.cornerRadius=4;
  chip.fills=solid(.93,.82,.2); chip.x=20; chip.y=24; inner.appendChild(chip);
  return box;
}
function makeSheet(screen, sheetH, title=null) {
  const bd=figma.createRectangle(); bd.name='Backdrop'; bd.resize(W,H);
  bd.fills=solid(0,0,0,.45); screen.appendChild(bd);
  bd.layoutPositioning='ABSOLUTE'; bd.x=0; bd.y=0;
  const sheet=figma.createFrame(); sheet.name=title||'Sheet';
  sheet.resize(W,sheetH); sheet.layoutMode='VERTICAL';
  sheet.primaryAxisSizingMode='FIXED'; sheet.counterAxisSizingMode='FIXED';
  sheet.fills=cardFill?vFill(cardFill):solid(1,1,1);
  sheet.topLeftRadius=24; sheet.topRightRadius=24;
  sheet.paddingLeft=20; sheet.paddingRight=20;
  sheet.paddingTop=20; sheet.paddingBottom=32; sheet.itemSpacing=16;
  screen.appendChild(sheet); sheet.layoutPositioning='ABSOLUTE';
  sheet.x=0; sheet.y=H-sheetH; return sheet;
}
async function makePrimaryBtn(label, parent) {
  const btn=btnPrimComp.createInstance(); parent.appendChild(btn);
  btn.layoutSizingHorizontal='FILL';
  btn.setProperties({'Icon Left#34:8':false,'Icon Right#34:7':false,'Style':'Primary','State':'Default'});
  const lbl=btn.findAllWithCriteria({types:['TEXT']})[0];
  await figma.loadFontAsync(lbl.fontName); lbl.characters=label; return btn;
}
async function makeInfoBanner(text, parent) {
  const b=hFrame('Banner',{gap:8}); b.paddingLeft=12; b.paddingRight=12;
  b.paddingTop=10; b.paddingBottom=10; b.fills=solid(.87,.94,1);
  if(radiusMd) bindR(b,radiusMd); parent.appendChild(b); b.layoutSizingHorizontal='FILL';
  const t=await txt(text,stCaption,null); t.fills=solid(.1,.39,.78); b.appendChild(t);
  return b;
}
function addDivider(parent) {
  const d=divComp.createInstance(); parent.appendChild(d);
  d.layoutSizingHorizontal='FILL'; return d;
}
// Visa logo pill
function makeVisaLogo() {
  const box=hFrame('VISA',{gap:0}); box.paddingLeft=8; box.paddingRight=8;
  box.paddingTop=4; box.paddingBottom=4; box.fills=solid(.0,.11,.56,.1);
  box.cornerRadius=4;
  // V text as proxy (no actual logo component available)
  return box;
}

// ── POSITIONING ────────────────────────────────────────────────────
// Place VD screens to the right of PP screens
const GAP = 88;
let X = 0;
const Y_ROW = 2000; // Row 3: VD flow (PP at Y=1000, W at Y=0)
const newScreens = [];
function nextX() { const x=X; X+=W+GAP; return x; }

// ══════════════════════════════════════════════════════════════════════
// V1 · MÉTODO DE ENVÍO + MODAL TIPO DE ENVÍO
// ══════════════════════════════════════════════════════════════════════
const v1 = makeScreen('VD·V1·Tipo envío', nextX());
newScreens.push(v1);
addSB(v1);
const v1Nav = await makeNav('Método de envío');
v1.appendChild(v1Nav); v1Nav.layoutSizingHorizontal='FILL';
const v1Content = makeContent(24);
v1.appendChild(v1Content); v1Content.layoutSizingHorizontal='FILL';
const v1Iw = hFrame('Illust wrap',{justify:'CENTER'});
v1Content.appendChild(v1Iw); v1Iw.layoutSizingHorizontal='FILL';
v1Iw.appendChild(makeIllustration());
const v1Sub = await txt('Selecciona desde donde enviarás dinero:', stSubM, textSecondary);
v1Content.appendChild(v1Sub); v1Sub.layoutSizingHorizontal='FILL';
// Single method row (Wallet directa — ya pasó el selector)
const v1List = vFrame('Methods',{gap:0});
v1Content.appendChild(v1List); v1List.layoutSizingHorizontal='FILL';
if(cardFill) v1List.fills=vFill(cardFill); if(radiusXl) bindR(v1List,radiusXl);
const v1Row = hFrame('Wallets row',{gap:16});
v1Row.paddingLeft=16; v1Row.paddingRight=16; v1Row.paddingTop=16; v1Row.paddingBottom=16;
v1List.appendChild(v1Row); v1Row.layoutSizingHorizontal='FILL';
const v1IconBox=figma.createFrame(); v1IconBox.resize(44,44); v1IconBox.cornerRadius=12;
v1IconBox.fills=cardNormal?vFill(cardNormal):solid(.95,.95,.95);
v1Row.appendChild(v1IconBox);
const v1Info=vFrame('Info',{gap:2}); v1Info.layoutGrow=1; v1Row.appendChild(v1Info);
v1Info.appendChild(await txt('Billetera digital', stSubM, textPrimary));
v1Info.appendChild(await txt('Usa saldo de tu billetera uTransfer', stCaption, textSecondary));
v1Row.appendChild(chevRComp.createInstance());
addHI(v1);

// Sheet: Tipo de envío
const sh1 = makeSheet(v1, 320, 'Tipo de envío');
const sh1X=xComp.createInstance(); sh1X.resize(24,24);
const sh1Xw=hFrame('Close',{justify:'MIN'});
sh1Xw.appendChild(sh1X); sh1.appendChild(sh1Xw); sh1Xw.layoutSizingHorizontal='FILL';
sh1.appendChild(await txt('Tipo de envío', stH5, textPrimary));
sh1.appendChild(await txt('Selecciona el tipo de envío que realizarás.', stCaption, textSecondary));

async function radioRow(icon, label, selected, parent) {
  const row=hFrame(`Radio·${label}`,{gap:12}); row.paddingTop=14; row.paddingBottom=14;
  parent.appendChild(row); row.layoutSizingHorizontal='FILL';
  // Flag / icon
  if(icon) { const f=icon.createInstance(); f.resize(24,24); row.appendChild(f); }
  const lT=await txt(label,stSubM,selected?textPrimary:textSecondary);
  lT.layoutGrow=1; row.appendChild(lT);
  // Radio circle
  const radioOuter=figma.createFrame(); radioOuter.name='Radio'; radioOuter.resize(22,22);
  radioOuter.cornerRadius=11; radioOuter.layoutMode='NONE';
  radioOuter.strokes=[{type:'SOLID',color:selected?{r:.44,g:.2,b:.9}:{r:.8,g:.8,b:.8}}];
  radioOuter.strokeWeight=2; radioOuter.fills=[];
  row.appendChild(radioOuter);
  if(selected) {
    const radioInner=figma.createEllipse(); radioInner.resize(12,12);
    radioInner.fills=solid(.44,.2,.9);
    radioInner.x=5; radioInner.y=5;
    radioOuter.appendChild(radioInner);
  }
  return row;
}
addDivider(sh1);
await radioRow(flagECComp, 'Envío nacional', false, sh1);
addDivider(sh1);
await radioRow(null, 'Envío internacional', true, sh1);
await makePrimaryBtn('Continuar', sh1);

// ══════════════════════════════════════════════════════════════════════
// V2 · ENVIAR — TARJETA ORIGEN + BENEFICIARIO VACÍOS
// ══════════════════════════════════════════════════════════════════════
const v2 = makeScreen('VD·V2·Enviar vacío', nextX());
newScreens.push(v2);
addSB(v2);
const v2Nav = await makeNav('Enviar');
v2.appendChild(v2Nav); v2Nav.layoutSizingHorizontal='FILL';
const v2Content = makeContent(24);
v2.appendChild(v2Content); v2Content.layoutSizingHorizontal='FILL';
const v2Iw=hFrame('Illust wrap',{justify:'CENTER'});
v2Content.appendChild(v2Iw); v2Iw.layoutSizingHorizontal='FILL'; v2Iw.appendChild(makeIllustration());
const v2Sub=await txt('Elige la tarjeta de origen y el destinatario.', stSubM, textSecondary,'CENTER');
v2Content.appendChild(v2Sub); v2Sub.layoutSizingHorizontal='FILL';

async function selectorCard(sectionTitle, iconComp, placeholder, parent) {
  const card=vFrame(`Card·${sectionTitle}`,{gap:12});
  parent.appendChild(card); card.layoutSizingHorizontal='FILL';
  card.appendChild(await txt(sectionTitle, stSubM, textPrimary));
  const row=hFrame('Selector row',{gap:12}); row.paddingTop=16; row.paddingBottom=16;
  row.paddingLeft=16; row.paddingRight=16;
  row.fills=cardFill?vFill(cardFill):solid(1,1,1); if(radiusXl) bindR(row,radiusXl);
  card.appendChild(row); row.layoutSizingHorizontal='FILL';
  if(iconComp) { const ic=iconComp.createInstance(); ic.resize(24,24); row.appendChild(ic); }
  const ph=await txt(placeholder,stSubM,textDisabled); ph.layoutGrow=1; row.appendChild(ph);
  const c=chevRComp.createInstance(); c.resize(20,20); row.appendChild(c);
  return card;
}

await selectorCard('Tarjeta de origen', null, 'Selecciona una tarjeta', v2Content);
await selectorCard('Beneficiario', null, 'Selecciona el beneficiario', v2Content);

const v2Spacer=figma.createFrame(); v2Spacer.name='Spacer'; v2Spacer.fills=[];
v2Spacer.resize(1,1); v2Content.appendChild(v2Spacer); v2Spacer.layoutSizingVertical='FILL';

// Disabled Continuar
const v2Btn=btnPrimComp.createInstance(); v2Content.appendChild(v2Btn);
v2Btn.layoutSizingHorizontal='FILL';
v2Btn.setProperties({'Icon Left#34:8':false,'Icon Right#34:7':false,'Style':'Primary','State':'Disabled'});
const v2BLbl=v2Btn.findAllWithCriteria({types:['TEXT']})[0];
await figma.loadFontAsync(v2BLbl.fontName); v2BLbl.characters='Continuar';
addHI(v2);

// ══════════════════════════════════════════════════════════════════════
// V3 · ENVIAR — CON TARJETA Y BENEFICIARIO LLENOS
// ══════════════════════════════════════════════════════════════════════
const v3 = makeScreen('VD·V3·Enviar lleno', nextX());
newScreens.push(v3);
addSB(v3);
const v3Nav=await makeNav('Enviar');
v3.appendChild(v3Nav); v3Nav.layoutSizingHorizontal='FILL';
const v3Content=makeContent(24);
v3.appendChild(v3Content); v3Content.layoutSizingHorizontal='FILL';
const v3Iw=hFrame('Illust wrap',{justify:'CENTER'});
v3Content.appendChild(v3Iw); v3Iw.layoutSizingHorizontal='FILL'; v3Iw.appendChild(makeIllustration());
const v3Sub=await txt('Elige la tarjeta de origen y el destinatario.', stSubM, textSecondary,'CENTER');
v3Content.appendChild(v3Sub); v3Sub.layoutSizingHorizontal='FILL';

// Tarjeta de origen (llena)
const v3OCard=vFrame('Origen card',{gap:12});
v3Content.appendChild(v3OCard); v3OCard.layoutSizingHorizontal='FILL';
v3OCard.appendChild(await txt('Tarjeta de origen', stSubM, textPrimary));
const v3ORow=hFrame('Row',{gap:12}); v3ORow.paddingTop=16; v3ORow.paddingBottom=16;
v3ORow.paddingLeft=16; v3ORow.paddingRight=16;
v3ORow.fills=cardFill?vFill(cardFill):solid(1,1,1); if(radiusXl) bindR(v3ORow,radiusXl);
v3OCard.appendChild(v3ORow); v3ORow.layoutSizingHorizontal='FILL';
// Card icon
const v3CardIco=figma.createRectangle(); v3CardIco.resize(32,22); v3CardIco.cornerRadius=4;
v3CardIco.fills=solid(.93,.93,.93); v3ORow.appendChild(v3CardIco);
const v3OInfo=vFrame('Info',{gap:2}); v3OInfo.layoutGrow=1; v3ORow.appendChild(v3OInfo);
v3OInfo.appendChild(await txt('Christian Ramón', stSubM, textPrimary));
v3OInfo.appendChild(await txt('•••• •••• •••• 0090', stCaption, textSecondary));
// VISA tag
const visaTag=hFrame('VISA',{gap:0}); visaTag.paddingLeft=8; visaTag.paddingRight=8;
visaTag.paddingTop=4; visaTag.paddingBottom=4; visaTag.fills=solid(.0,.11,.56,.1);
visaTag.cornerRadius=4; v3ORow.appendChild(visaTag);
const visaT=await txt('VISA', stCaption, null); visaT.fills=solid(.0,.11,.56);
visaTag.appendChild(visaT);
const v3OChev=chevRComp.createInstance(); v3OChev.resize(20,20); v3ORow.appendChild(v3OChev);

// Beneficiario (lleno)
const v3BCard=vFrame('Bene card',{gap:12});
v3Content.appendChild(v3BCard); v3BCard.layoutSizingHorizontal='FILL';
v3BCard.appendChild(await txt('Beneficiario', stSubM, textPrimary));
const v3BRow=hFrame('Row',{gap:12}); v3BRow.paddingTop=16; v3BRow.paddingBottom=16;
v3BRow.paddingLeft=16; v3BRow.paddingRight=16;
v3BRow.fills=cardFill?vFill(cardFill):solid(1,1,1); if(radiusXl) bindR(v3BRow,radiusXl);
v3BCard.appendChild(v3BRow); v3BRow.layoutSizingHorizontal='FILL';
v3BRow.appendChild(av40Comp.createInstance());
const v3BInfo=vFrame('Info',{gap:2}); v3BInfo.layoutGrow=1; v3BRow.appendChild(v3BInfo);
v3BInfo.appendChild(await txt('María Cajas', stSubM, textPrimary));
v3BInfo.appendChild(await txt('•••• •••• •••• 0090', stCaption, textSecondary));
// EC flag
const v3Flag=flagECComp.createInstance(); v3Flag.resize(24,18); v3BRow.appendChild(v3Flag);
v3BRow.appendChild(chevRComp.createInstance());

const v3Spacer=figma.createFrame(); v3Spacer.name='Spacer'; v3Spacer.fills=[];
v3Spacer.resize(1,1); v3Content.appendChild(v3Spacer); v3Spacer.layoutSizingVertical='FILL';
await makePrimaryBtn('Continuar', v3Content);
addHI(v3);

// ══════════════════════════════════════════════════════════════════════
// V4 · ¿A QUIÉN ENVÍAS? (con frecuentes + banderas)
// ══════════════════════════════════════════════════════════════════════
const v4 = makeScreen('VD·V4·A quién', nextX());
newScreens.push(v4);
addSB(v4);
const v4Nav=await makeNav('¿A quién envías?');
v4.appendChild(v4Nav); v4Nav.layoutSizingHorizontal='FILL';
const v4Content=makeContent(16);
v4.appendChild(v4Content); v4Content.layoutSizingHorizontal='FILL';

// Search
const v4Search=hFrame('Search',{gap:8}); v4Search.paddingLeft=12; v4Search.paddingRight=12;
v4Search.paddingTop=12; v4Search.paddingBottom=12;
v4Search.fills=cardNormal?vFill(cardNormal):solid(.95,.95,.95);
if(radiusMd) bindR(v4Search,radiusMd); v4Content.appendChild(v4Search);
v4Search.layoutSizingHorizontal='FILL';
v4Search.appendChild(await txt('Buscar', stSubM, textDisabled));

// Frecuentes
v4Content.appendChild(await txt('Contactos frecuentes', stSubM, textPrimary));
const v4Freq=hFrame('Frequent',{gap:16,align:'MIN'});
v4Content.appendChild(v4Freq); v4Freq.layoutSizingHorizontal='FILL';
const freqNames=['John','Jennifer','María'];
const freqFlags=[flagECComp,flagUSComp,flagMXComp];
for(let i=0;i<3;i++){
  const fItem=vFrame(`Freq·${freqNames[i]}`,{gap:6,align:'CENTER'});
  v4Freq.appendChild(fItem);
  fItem.appendChild(av40Comp.createInstance());
  const fN=await txt(freqNames[i],stCaption,textPrimary,'CENTER');
  fItem.appendChild(fN);
}
// + Agregar nuevo
const addNew=vFrame('Add new',{gap:6,align:'CENTER'}); v4Freq.appendChild(addNew);
const addCircle=figma.createFrame(); addCircle.name="Plus"; addCircle.resize(40,40); addCircle.cornerRadius=20; addCircle.layoutMode="NONE";
addCircle.fills=cardNormal?vFill(cardNormal):solid(.95,.95,.95);
addNew.appendChild(addCircle);
const plusT=await txt('+',stH5,textSecondary,'CENTER');
plusT.resize(40,40); plusT.textAlignVertical='CENTER'; addCircle.appendChild(plusT);
addNew.appendChild(await txt('Agregar nuevo',stCaption,textSecondary,'CENTER'));

// Todos list
const v4AllHdr=hFrame('All hdr',{gap:4,justify:'SPACE_BETWEEN'});
v4Content.appendChild(v4AllHdr); v4AllHdr.layoutSizingHorizontal='FILL';
v4AllHdr.appendChild(await txt('Todos', stSubM, textPrimary));
v4AllHdr.appendChild(await txt('(100)', stCaption, textSecondary));

const v4List=vFrame('Contacts',{gap:0});
v4Content.appendChild(v4List); v4List.layoutSizingHorizontal='FILL';
if(cardFill) v4List.fills=vFill(cardFill); if(radiusXl) bindR(v4List,radiusXl);

const vdContacts=[
  ['María Cajas','maria2011@gmail.com',flagECComp],
  ['María Peña','maria01@email.com',flagECComp],
  ['María Rojas','maria02@email.com',flagMXComp],
  ['Sarah Cajas','sakeloj@email.com',flagMXComp],
  ['Samantha Lee','samantha@mail.com',flagUSComp],
  ['Javier Gomez','javgomez@mail.com',flagUSComp],
];
for(let i=0;i<vdContacts.length;i++){
  if(i>0) addDivider(v4List);
  const [n,e,flagComp]=vdContacts[i];
  const row=hFrame(`Contact·${n}`,{gap:12}); row.paddingTop=12; row.paddingBottom=12;
  v4List.appendChild(row); row.layoutSizingHorizontal='FILL';
  row.appendChild(av40Comp.createInstance());
  const info=vFrame('Info',{gap:2}); info.layoutGrow=1; row.appendChild(info);
  info.appendChild(await txt(n,stSubM,textPrimary));
  info.appendChild(await txt(e,stCaption,textSecondary));
  const flag=flagComp.createInstance(); flag.resize(24,18); row.appendChild(flag);
  row.appendChild(chevRComp.createInstance());
}
addHI(v4);

// ══════════════════════════════════════════════════════════════════════
// V5 · ¿A QUIÉN? + MODAL INVITAR CONTACTO
// ══════════════════════════════════════════════════════════════════════
const v5 = makeScreen('VD·V5·Invitar', nextX());
newScreens.push(v5);
addSB(v5);
const v5Nav=await makeNav('¿A quién envías?');
v5.appendChild(v5Nav); v5Nav.layoutSizingHorizontal='FILL';
const v5Content=makeContent(16);
v5.appendChild(v5Content); v5Content.layoutSizingHorizontal='FILL';
const v5Search=hFrame('Search',{gap:8}); v5Search.paddingLeft=12; v5Search.paddingRight=12;
v5Search.paddingTop=12; v5Search.paddingBottom=12;
v5Search.fills=cardNormal?vFill(cardNormal):solid(.95,.95,.95);
if(radiusMd) bindR(v5Search,radiusMd); v5Content.appendChild(v5Search);
v5Search.layoutSizingHorizontal='FILL';
v5Search.appendChild(await txt('Buscar', stSubM, textDisabled));
addHI(v5);

const sh5=makeSheet(v5, 380, 'Invitar contacto');
const sh5Xw=hFrame('Close',{justify:'MIN'});
sh5Xw.appendChild(xComp.createInstance()); sh5.appendChild(sh5Xw); sh5Xw.layoutSizingHorizontal='FILL';
sh5.appendChild(await txt('Invitar contacto', stH5, textPrimary));
sh5.appendChild(await txt(
  'Invita a tus amigos a usar uTransfer, gana Upoints por cada nuevo miembro que se registre con tu link de referido.',
  stCaption, textSecondary));

// Email input
const sh5Input=hFrame('Email input',{gap:8}); sh5Input.paddingLeft=12; sh5Input.paddingRight=12;
sh5Input.paddingTop=14; sh5Input.paddingBottom=14;
sh5Input.fills=cardNormal?vFill(cardNormal):solid(.95,.95,.95);
if(radiusMd) bindR(sh5Input,radiusMd); sh5.appendChild(sh5Input);
sh5Input.layoutSizingHorizontal='FILL';
sh5Input.appendChild(await txt('Email', stSubM, textDisabled));

// Send invitation button (Clear)
const sh5Btn=btnClearComp.createInstance(); sh5.appendChild(sh5Btn);
sh5Btn.layoutSizingHorizontal='FILL';
sh5Btn.setProperties({'Icon Left#34:8':false,'Icon Right#34:7':false,'Style':'Clear','State':'Default'});
const sh5Lbl=sh5Btn.findAllWithCriteria({types:['TEXT']})[0];
await figma.loadFontAsync(sh5Lbl.fontName); sh5Lbl.characters='Enviar invitación';
// Keyboard
const sh5Kb=keyTxtComp.createInstance(); v5.appendChild(sh5Kb);
sh5Kb.layoutSizingHorizontal='FILL'; sh5Kb.layoutPositioning='ABSOLUTE';
sh5Kb.x=0; sh5Kb.y=H-sh5Kb.height;

// ══════════════════════════════════════════════════════════════════════
// V6 · ¿CUÁNTO ENVÍAS? (VD — con conversión y detalles)
// ══════════════════════════════════════════════════════════════════════
const v6 = makeScreen('VD·V6·Monto', nextX());
newScreens.push(v6);
addSB(v6);
const v6Nav=await makeNav('¿Cuánto envías?');
v6.appendChild(v6Nav); v6Nav.layoutSizingHorizontal='FILL';
const v6Content=makeContent(20);
v6.appendChild(v6Content); v6Content.layoutSizingHorizontal='FILL';

// Monto display
const v6Amt=await txt('$0', stH3, textDisabled, 'CENTER');
v6Content.appendChild(v6Amt); v6Amt.layoutSizingHorizontal='FILL';

// Conversion card
const v6Conv=vFrame('Conversion',{gap:12});
v6Content.appendChild(v6Conv); v6Conv.layoutSizingHorizontal='FILL';
if(cardFill) v6Conv.fills=vFill(cardFill); if(radiusXl) bindR(v6Conv,radiusXl);
v6Conv.paddingLeft=16; v6Conv.paddingRight=16; v6Conv.paddingTop=16; v6Conv.paddingBottom=16;

// Monto a enviar row
const v6FromRow=hFrame('From row',{gap:8,justify:'SPACE_BETWEEN'});
v6Conv.appendChild(v6FromRow); v6FromRow.layoutSizingHorizontal='FILL';
const v6FromLeft=hFrame('From left',{gap:8}); v6FromRow.appendChild(v6FromLeft);
const v6FlagUS=flagUSComp.createInstance(); v6FlagUS.resize(24,18); v6FromLeft.appendChild(v6FlagUS);
v6FromLeft.appendChild(await txt('USD ∨', stSubM, textPrimary));
v6FromRow.appendChild(await txt('$ 0.00', stSubM, textDisabled));

// Límite
const v6Limit=await txt('Límite disponible para enviar: $5,000.00 USD', stCaption, textSecondary);
v6Conv.appendChild(v6Limit); v6Limit.layoutSizingHorizontal='FILL';

addDivider(v6Conv);

// Destinatario recibe row
const v6ToRow=hFrame('To row',{gap:8,justify:'SPACE_BETWEEN'});
v6Conv.appendChild(v6ToRow); v6ToRow.layoutSizingHorizontal='FILL';
const v6ToLeft=hFrame('To left',{gap:8}); v6ToRow.appendChild(v6ToLeft);
const v6FlagEC=flagECComp.createInstance(); v6FlagEC.resize(24,18); v6ToLeft.appendChild(v6FlagEC);
v6ToLeft.appendChild(await txt('COP ∨', stSubM, textPrimary));
v6ToRow.appendChild(await txt('$ 0', stSubM, textDisabled));

// Commission info card
const v6CommCard=vFrame('Comm card',{gap:8});
v6Content.appendChild(v6CommCard); v6CommCard.layoutSizingHorizontal='FILL';
if(cardNormal) v6CommCard.fills=vFill(cardNormal); if(radiusXl) bindR(v6CommCard,radiusXl);
v6CommCard.paddingLeft=16; v6CommCard.paddingRight=16;
v6CommCard.paddingTop=14; v6CommCard.paddingBottom=14;
const v6Rate=hFrame('Rate',{gap:8,justify:'SPACE_BETWEEN'});
v6CommCard.appendChild(v6Rate); v6Rate.layoutSizingHorizontal='FILL';
v6Rate.appendChild(await txt('Tasa de cambio:', stCaption, textSecondary));
v6Rate.appendChild(await txt('1 USD = 4,000 COP', stCaption, textPrimary));
const v6Fee=hFrame('Fee',{gap:8,justify:'SPACE_BETWEEN'});
v6CommCard.appendChild(v6Fee); v6Fee.layoutSizingHorizontal='FILL';
v6Fee.appendChild(await txt('Comisión:', stCaption, textSecondary));
v6Fee.appendChild(await txt('2 USD', stCaption, textPrimary));

await makeInfoBanner('⚡ Entrega inmediata vía Visa Direct', v6Content);

// Disabled Continuar
const v6Btn=btnPrimComp.createInstance(); v6Content.appendChild(v6Btn);
v6Btn.layoutSizingHorizontal='FILL';
v6Btn.setProperties({'Icon Left#34:8':false,'Icon Right#34:7':false,'Style':'Primary','State':'Disabled'});
const v6BLbl=v6Btn.findAllWithCriteria({types:['TEXT']})[0];
await figma.loadFontAsync(v6BLbl.fontName); v6BLbl.characters='Continuar';
addHI(v6);

// ══════════════════════════════════════════════════════════════════════
// V7 · ERROR TRANSACCIÓN VD
// ══════════════════════════════════════════════════════════════════════
const v7 = makeScreen('VD·V7·Error', nextX());
newScreens.push(v7);
addSB(v7);
const v7Center=vFrame('Center',{gap:24,align:'CENTER'});
v7Center.paddingLeft=40; v7Center.paddingRight=40; v7Center.paddingTop=60;
v7Center.primaryAxisSizingMode='AUTO'; v7Center.counterAxisSizingMode='FIXED';
v7Center.resize(W,10); v7.appendChild(v7Center); v7Center.layoutSizingHorizontal='FILL';
const v7Err=figma.createFrame(); v7Err.name="Err circle"; v7Err.resize(80,80); v7Err.cornerRadius=40; v7Err.layoutMode="NONE";
v7Err.fills=solid(.94,.17,.17,.15); v7Err.strokes=[{type:'SOLID',color:{r:.85,g:.1,b:.1}}];
v7Err.strokeWeight=2;
const v7EW=hFrame('Err wrap',{justify:'CENTER'});
v7Center.appendChild(v7EW); v7EW.layoutSizingHorizontal='FILL'; v7EW.appendChild(v7Err);
const v7EX=await txt('✕',stH3,null,'CENTER');
v7EX.fills=solid(.85,.1,.1); v7EX.resize(80,80); v7EX.textAlignVertical='CENTER';
v7Err.appendChild(v7EX);
v7Center.appendChild(await txt('Error en la transacción', stH5, textPrimary, 'CENTER'));
v7Center.appendChild(await txt('No se pudo procesar el pago con Visa Direct.\nPor favor verifica tus datos e intenta de nuevo.', stSubM, textSecondary, 'CENTER'));
const v7Sp=figma.createFrame(); v7Sp.name='Spacer'; v7Sp.fills=[];
v7Sp.resize(1,1); v7.appendChild(v7Sp); v7Sp.layoutSizingVertical='FILL';
const v7BtnArea=vFrame('BTAs',{gap:12}); v7BtnArea.paddingLeft=20; v7BtnArea.paddingRight=20; v7BtnArea.paddingBottom=32;
v7.appendChild(v7BtnArea); v7BtnArea.layoutSizingHorizontal='FILL';
await makePrimaryBtn('Intentar de nuevo', v7BtnArea);
const v7Clear=btnClearComp.createInstance(); v7BtnArea.appendChild(v7Clear);
v7Clear.layoutSizingHorizontal='FILL';
v7Clear.setProperties({'Icon Left#34:8':false,'Icon Right#34:7':false,'Style':'Clear','State':'Default'});
const v7CLbl=v7Clear.findAllWithCriteria({types:['TEXT']})[0];
await figma.loadFontAsync(v7CLbl.fontName); v7CLbl.characters='Volver al inicio';
addHI(v7);

// ── FIN ─────────────────────────────────────────────────────────────
figma.viewport.scrollAndZoomIntoView(newScreens);
figma.currentPage.selection = newScreens;
return { ok:true, screens: newScreens.map(s=>({id:s.id,name:s.name})) };
})()
