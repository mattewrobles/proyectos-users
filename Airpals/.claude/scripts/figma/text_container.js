(async () => {
  const page = figma.root.children[0];
  await page.loadAsync();

  // ── Variables ──────────────────────────────────────────────────────────────
  const libCollections = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
  const varMap = {};
  for (const lib of libCollections) {
    const vars = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(lib.key);
    for (const lv of vars) {
      const imported = await figma.variables.importVariableByKeyAsync(lv.key);
      varMap[lv.name] = imported;
    }
  }

  // ── Fonts ──────────────────────────────────────────────────────────────────
  await Promise.all([
    figma.loadFontAsync({ family: 'Lexend', style: 'SemiBold' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
  ]);

  // ── Text styles ────────────────────────────────────────────────────────────
  const h2Style   = await figma.importStyleByKeyAsync('ee888841d77eab239b07d54f5b4507c20b05d102'); // Heading 2 30px
  const bodyStyle = await figma.importStyleByKeyAsync('73cea9d2fa1f938fc07dc4428381731c1ad72348'); // Body Medium/Medium 16px

  // ── Action Button ──────────────────────────────────────────────────────────
  const btnComp = await figma.importComponentByKeyAsync('8e685884270ba324a8974d7ad44c4cbce1b2e957');
  const btn = btnComp.createInstance();

  // ── Token helpers ──────────────────────────────────────────────────────────
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

  // closest token binding
  const spMap = { 0:'spacing/0',4:'spacing/1',8:'spacing/2',10:'spacing/2-5',12:'spacing/3',16:'spacing/4',20:'spacing/5',24:'spacing/6',28:'spacing/7',32:'spacing/8',36:'spacing/9',40:'spacing/10',44:'spacing/11',48:'spacing/12',56:'spacing/14',64:'spacing/16',80:'spacing/20',96:'spacing/24',120:'spacing/30',160:'spacing/40',240:'spacing/60' };
  const radMap = { 0:'border-radius/none',4:'border-radius/DEFAULT',6:'border-radius/md',8:'border-radius/lg',12:'border-radius/xl',16:'border-radius/2xl',24:'border-radius/3xl',9999:'border-radius/full' };

  const closestKey = (value, map) => {
    const keys = Object.keys(map).map(Number).sort((a,b)=>a-b);
    const closest = keys.reduce((p,c) => Math.abs(c-value) < Math.abs(p-value) ? c : p);
    return map[closest];
  };

  const bindSpacing = (node) => {
    if (typeof node.itemSpacing === 'number') {
      const tok = closestKey(node.itemSpacing, spMap);
      if (tok && varMap[tok]) try { node.setBoundVariable('itemSpacing', varMap[tok]); } catch(e) {}
    }
    for (const prop of ['paddingTop','paddingBottom','paddingLeft','paddingRight']) {
      const val = node[prop];
      if (typeof val === 'number' && val > 0) {
        const tok = closestKey(val, spMap);
        if (tok && varMap[tok]) try { node.setBoundVariable(prop, varMap[tok]); } catch(e) {}
      }
    }
    if (typeof node.cornerRadius === 'number' && node.cornerRadius > 0) {
      const tok = closestKey(node.cornerRadius, radMap);
      if (tok && varMap[tok]) try { node.setBoundVariable('cornerRadius', varMap[tok]); } catch(e) {}
    }
    if (node.children) node.children.forEach(bindSpacing);
  };

  // ── Container frame ────────────────────────────────────────────────────────
  const container = figma.createFrame();
  container.name = 'Text container';
  container.layoutMode = 'VERTICAL';
  container.primaryAxisSizingMode = 'AUTO';
  container.counterAxisSizingMode = 'FIXED';
  container.resize(480, 100);
  container.primaryAxisAlignItems = 'MIN';
  container.counterAxisAlignItems = 'MIN';
  container.paddingTop    = 32;
  container.paddingBottom = 32;
  container.paddingLeft   = 32;
  container.paddingRight  = 32;
  container.itemSpacing   = 24;
  container.cornerRadius  = 12;
  container.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 },
    boundVariables: varMap['background/default']
      ? { color: { type: 'VARIABLE_ALIAS', id: varMap['background/default'].id } }
      : {} }];

  // ── Heading ────────────────────────────────────────────────────────────────
  const heading = figma.createText();
  heading.name = 'Heading';
  heading.characters = 'Your team, always in sync';
  heading.textStyleId = h2Style.id;
  applyTextToken(heading, 'text/primary');

  // ── Body ───────────────────────────────────────────────────────────────────
  const body = figma.createText();
  body.name = 'Body';
  body.characters = 'Assign roles, manage members, and track every shipment your department sends — from one shared dashboard.';
  body.textStyleId = bodyStyle.id;
  applyTextToken(body, 'text/secondary');

  // ── Assemble ───────────────────────────────────────────────────────────────
  container.appendChild(heading);
  container.appendChild(body);
  container.appendChild(btn);

  // FILL after append
  heading.layoutSizingHorizontal = 'FILL';
  body.layoutSizingHorizontal    = 'FILL';

  // Update button label
  const btnText = btn.findOne(n => n.type === 'TEXT');
  if (btnText) try { btnText.characters = 'Get started free'; } catch(e) {}

  // ── Bind all tokens ────────────────────────────────────────────────────────
  bindSpacing(container);

  // ── Position ───────────────────────────────────────────────────────────────
  const textSection = await figma.getNodeByIdAsync('76:2025');
  if (textSection) {
    container.x = textSection.x;
    container.y = textSection.y + textSection.height + 80;
  } else {
    container.x = 12815;
    container.y = 5200;
  }

  page.appendChild(container);
  figma.currentPage.selection = [container];
  figma.viewport.scrollAndZoomIntoView([container]);

  return {
    ok: true,
    id: container.id,
    position: { x: Math.round(container.x), y: Math.round(container.y) },
    size: { w: Math.round(container.width), h: Math.round(container.height) },
  };
})()
