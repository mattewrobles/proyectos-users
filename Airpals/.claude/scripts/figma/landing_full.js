(async () => {
  try {
    // === PAGE ===
    // No llamar loadAsync() — sobreescribe nodos en memoria con disco (vacío)
    if (!figma.currentPage.name.toLowerCase().includes('prueba')) {
      const pruebas = figma.root.children.find(p => p.name.toLowerCase().includes('prueba'));
      figma.currentPage = pruebas;
    }
    const pruebas = figma.currentPage;

    // === FONTS ===
    await figma.loadFontAsync({ family: 'Lexend', style: 'SemiBold' });
    await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
    await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
    await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });

    // === COLORS ===
    const C = {
      blue:   { r: 0, g: 0.2627, b: 1 },
      navy:   { r: 0.1059, g: 0.1882, b: 0.4235 },
      lblue:  { r: 0.902, g: 0.9451, b: 0.9922 },
      white:  { r: 1, g: 1, b: 1 },
      gray:   { r: 0.745, g: 0.761, b: 0.8 },
      muted:  { r: 0.55, g: 0.58, b: 0.65 },
    };

    // === TEXT STYLES ===
    const TSK = {
      h1:     'af569f2dcf834882a8ceb7cd76c81fa8a28d86f3',
      h2:     'ee888841d77eab239b07d54f5b4507c20b05d102',
      h3:     'ffebb05a861b5fb3b66f8b16bbfbccd52b657423',
      subR:   '3f93f5621bf6aafe50dc56e495524c4ddb4a73a0',
      bodyLR: 'f9b834c30a1caad51007df19fab23fd6dc599a6a',
      bodyMR: '2a4d5c3a9a2b1671e19bcf1b9346a8bdd18c2331',
      bodyMSB:'6050d635d183ed2475f6ba97428d04c135684a76',
      bodySR: '083e8c5332c20e80dc0e677559e27029b07aada3',
      captR:  '1ef99e5d5c08fa41146dd3dd31e6c86ec2234367',
    };
    const TS = {};
    for (const [k, key] of Object.entries(TSK)) {
      TS[k] = await figma.importStyleByKeyAsync(key);
    }

    // === COMPONENTS ===
    const CK = {
      navbar: 'ce05c59f43a2cb5e4349d587396a9e8698c17c0a',
      footer: 'dfa23089fc0afe1e9bf24325f34f6d12a28b5de9',
      btnPri: '8e685884270ba324a8974d7ad44c4cbce1b2e957',
    };
    const CC = {};
    for (const [k, key] of Object.entries(CK)) {
      CC[k] = await figma.importComponentByKeyAsync(key);
    }

    // Input placeholder (Input component not published — use styled frame)
    const makeInput = (label, w) => {
      const wrap = vf('Input ' + label, { w, fixW: true, gap: 4 });
      const lbl = txt(label, 'bodySR', C.muted);
      wrap.appendChild(lbl);
      const field = hf('Field', { w, fixW: true, fill: C.white, pt: 10, pb: 10, pl: 12, pr: 12, r: 6 });
      field.resize(w, 44);
      field.primaryAxisSizingMode = 'FIXED';
      field.counterAxisSizingMode = 'FIXED';
      const placeholder = txt(label + '...', 'bodyMR', C.muted);
      field.appendChild(placeholder);
      wrap.appendChild(field);
      return wrap;
    };

    // Checkbox placeholder
    const makeCheckbox = (label, w) => {
      const row = hf('Checkbox row', { gap: 8, cross: 'CENTER' });
      const box = rect(16, 16, C.white, 3);
      row.appendChild(box);
      row.appendChild(txt(label, 'bodySR', C.navy, w - 30));
      return row;
    };

    // === HELPERS ===
    const txt = (chars, tsKey, color, maxW) => {
      const t = figma.createText();
      if (TS[tsKey]) t.textStyleId = TS[tsKey].id;
      t.characters = chars;
      t.fills = [{ type: 'SOLID', color }];
      if (maxW) { t.textAutoResize = 'HEIGHT'; t.resize(maxW, t.height); }
      return t;
    };

    const vf = (name, o = {}) => {
      const f = figma.createFrame();
      f.name = name;
      f.layoutMode = 'VERTICAL';
      f.primaryAxisSizingMode = o.fixH ? 'FIXED' : 'AUTO';
      f.counterAxisSizingMode = o.fixW ? 'FIXED' : 'AUTO';
      if (o.w) f.resize(o.w, o.fixH || 100);
      f.itemSpacing = o.gap || 0;
      f.paddingTop    = o.pt ?? o.p ?? 0;
      f.paddingBottom = o.pb ?? o.p ?? 0;
      f.paddingLeft   = o.pl ?? o.p ?? 0;
      f.paddingRight  = o.pr ?? o.p ?? 0;
      f.fills = o.fill ? [{ type: 'SOLID', color: o.fill }] : [];
      if (o.main) f.primaryAxisAlignItems = o.main;
      if (o.cross) f.counterAxisAlignItems = o.cross;
      if (o.r) f.cornerRadius = o.r;
      return f;
    };

    const hf = (name, o = {}) => {
      const f = figma.createFrame();
      f.name = name;
      f.layoutMode = 'HORIZONTAL';
      f.primaryAxisSizingMode = o.fixW ? 'FIXED' : 'AUTO';
      f.counterAxisSizingMode = o.fixH ? 'FIXED' : 'AUTO';
      if (o.w) f.resize(o.w, o.fixH || 100);
      f.itemSpacing = o.gap || 0;
      f.paddingTop    = o.pt ?? o.p ?? 0;
      f.paddingBottom = o.pb ?? o.p ?? 0;
      f.paddingLeft   = o.pl ?? o.p ?? 0;
      f.paddingRight  = o.pr ?? o.p ?? 0;
      f.fills = o.fill ? [{ type: 'SOLID', color: o.fill }] : [];
      if (o.main) f.primaryAxisAlignItems = o.main;
      if (o.cross) f.counterAxisAlignItems = o.cross;
      if (o.r) f.cornerRadius = o.r;
      return f;
    };

    const rect = (w, h, color, r = 0) => {
      const n = figma.createRectangle();
      n.resize(w, h);
      n.fills = [{ type: 'SOLID', color }];
      if (r) n.cornerRadius = r;
      return n;
    };

    const illo = (w, h, label) => {
      const n = rect(w, h, C.lblue, Math.min(w, h) / 2);
      n.name = label || 'Illustration';
      return n;
    };

    const sections = [];

    // ─────────────────────────────────────────
    // 1. PROMO BAR
    // ─────────────────────────────────────────
    const promoBar = hf('Promo bar', { w: 1440, fixW: true, fixH: 50, fill: C.blue, main: 'CENTER', cross: 'CENTER' });
    promoBar.primaryAxisSizingMode = 'FIXED';
    promoBar.counterAxisSizingMode = 'FIXED';
    promoBar.resize(1440, 50);
    const promoTxt = txt('Try Airpals free for 30 days — no credit card required.', 'bodyMR', C.white, 700);
    promoTxt.textAlignHorizontal = 'CENTER';
    promoBar.appendChild(promoTxt);
    sections.push(promoBar);

    // ─────────────────────────────────────────
    // 2. NAVBAR
    // ─────────────────────────────────────────
    const navbar = CC.navbar.createInstance();
    navbar.name = 'Navbar';
    sections.push(navbar);

    // ─────────────────────────────────────────
    // 3. HERO SPLIT
    // ─────────────────────────────────────────
    const hero = hf('Hero', { w: 1440, fixW: true, fill: C.white, pt: 64, pb: 64, pl: 74, pr: 74, gap: 64, cross: 'CENTER' });

    // Left
    const heroLeft = vf('Hero copy', { gap: 24 });
    heroLeft.appendChild(txt('Workplace Shipping,\nFinally Under Control', 'h1', C.navy, 520));
    heroLeft.appendChild(txt('Airpals was built for workplace, mailroom, and facilities teams to centralize every shipment — across every carrier, from one place.', 'bodyLR', C.navy, 520));
    hero.appendChild(heroLeft);

    // Right: form
    const heroForm = vf('Hero form', { gap: 12, p: 32, fill: C.lblue, r: 12 });
    heroForm.appendChild(txt('Schedule a call with our team', 'h3', C.navy, 560));
    for (const label of ['Full Name', 'Work Email', 'Company', 'Monthly Shipments']) {
      heroForm.appendChild(makeInput(label, 560));
    }
    heroForm.appendChild(makeCheckbox('I agree to receive emails from Airpals with news and updates.', 560));
    const heroCTA = CC.btnPri.createInstance();
    heroCTA.name = 'Get started';
    heroForm.appendChild(heroCTA);
    hero.appendChild(heroForm);
    sections.push(hero);

    // ─────────────────────────────────────────
    // 4. LOGOS STRIP
    // ─────────────────────────────────────────
    const logos = vf('Logos strip', { w: 1440, fixW: true, fill: C.white, pt: 28, pb: 40, pl: 80, pr: 80, gap: 20, cross: 'CENTER' });
    const logosTxt = txt('Trusted by Workplace Teams at Leading Companies', 'bodySR', C.muted, 900);
    logosTxt.textAlignHorizontal = 'CENTER';
    logos.appendChild(logosTxt);
    const logosRow = hf('Logo row', { gap: 48, main: 'CENTER', cross: 'CENTER' });
    for (const name of ['WeWork', 'Spotify', 'Paramount', 'Reddit', 'Bumble', 'Figma', 'Meta']) {
      const r = rect(80, 20, C.gray, 3);
      r.name = name;
      logosRow.appendChild(r);
    }
    logos.appendChild(logosRow);
    sections.push(logos);

    // ─────────────────────────────────────────
    // 5. STATS + ILLUSTRATIONS
    // ─────────────────────────────────────────
    const statsWrap = hf('Stats section', { w: 1440, fixW: true, fill: C.white, pt: 64, pb: 64, pl: 278, pr: 278, main: 'CENTER' });
    const statsInner = vf('Stats inner', { gap: 48 });
    statsInner.appendChild(txt('The Numbers Behind Better Workplace Shipping', 'h2', C.navy, 868));

    const statsData = [
      { stat: '100%', label: 'Visibility into parcel speed', body: 'Shipping visibility is expensive across accounts, teams, and locations. Find out who ships, how — by user, team, or office.' },
      { stat: '80%', label: 'Cut coordination time', body: 'No more chasing addresses. Finding "where is my package?" between different carriers and systems is a thing of the past.' },
      { stat: '20%', label: 'Save on parcel costs', body: 'The cost of shipping is often the least scrutinized, and one of the most avoidable. Connect your accounts and access their rates.' },
      { stat: '3x', label: 'Review carrier invoices faster', body: 'Track spend 100% in real time — putting FedEx and UPS accounting everything in a centralized system.' },
    ];

    for (let i = 0; i < statsData.length; i++) {
      const sd = statsData[i];
      const row = hf('Stat row ' + (i + 1), { gap: 80, cross: 'CENTER' });
      const textBlock = vf('Stat text', { gap: 8 });
      textBlock.appendChild(txt(sd.stat, 'h1', C.blue, 360));
      textBlock.appendChild(txt(sd.label, 'h3', C.navy, 360));
      textBlock.appendChild(txt(sd.body, 'bodyMR', C.muted, 360));
      const illoNode = illo(200, 200);
      if (i % 2 === 0) { row.appendChild(illoNode); row.appendChild(textBlock); }
      else              { row.appendChild(textBlock); row.appendChild(illoNode); }
      statsInner.appendChild(row);
    }
    statsWrap.appendChild(statsInner);
    sections.push(statsWrap);

    // ─────────────────────────────────────────
    // 6. BANNER
    // ─────────────────────────────────────────
    const banner = vf('Banner', { w: 1440, fixW: true, fill: C.lblue, pt: 32, pb: 32, gap: 10, cross: 'CENTER' });
    const bOv = txt("WHAT'S INCLUDED WITH AIRPALS", 'captR', C.navy, 700);
    bOv.textAlignHorizontal = 'CENTER';
    const bH2 = txt('Built Around How Your Operations Actually Run', 'h2', C.navy, 700);
    bH2.textAlignHorizontal = 'CENTER';
    banner.appendChild(bOv);
    banner.appendChild(bH2);
    sections.push(banner);

    // ─────────────────────────────────────────
    // 7. FEATURE CARDS 2×2
    // ─────────────────────────────────────────
    const feats = vf('Feature cards', { w: 1440, fixW: true, fill: C.white, pt: 64, pb: 64, pl: 128, pr: 128, gap: 24, cross: 'CENTER' });
    const featData = [
      { title: 'Works With What You Already Have', bullets: ['Connect your existing FedEx & UPS accounts', 'Keep your negotiated rates', 'Bring all your carriers under one roof'] },
      { title: 'One Place to See Everything',      bullets: ['Centralized shipment history across all carriers', 'Real-time tracking via one dashboard', 'Daily digest for every shipment'] },
      { title: 'Control Without The Overhead',     bullets: ['Add users and sub-teams', 'Cost codes on every shipment', 'No changes to your delivery setup'] },
      { title: "Your Team's Shipments, On Brand",  bullets: ['Branded tracking page', 'Custom delivery notifications', 'Present info exactly the way you want'] },
    ];

    const fRow1 = hf('Feature row 1', { gap: 24 });
    const fRow2 = hf('Feature row 2', { gap: 24 });
    for (let i = 0; i < 4; i++) {
      const fd = featData[i];
      const card = vf('Card ' + (i + 1), { w: 380, fixW: true, gap: 20, pt: 28, pb: 28, pl: 36, pr: 36, fill: C.navy, r: 12 });
      const iconPh = rect(40, 40, C.blue, 8);
      iconPh.name = 'Icon';
      card.appendChild(iconPh);
      card.appendChild(txt(fd.title, 'h3', C.white, 308));
      card.appendChild(txt(fd.bullets.map(b => '• ' + b).join('\n'), 'bodySR', { r: 0.75, g: 0.8, b: 0.9 }, 308));
      if (i < 2) fRow1.appendChild(card);
      else       fRow2.appendChild(card);
    }
    feats.appendChild(fRow1);
    feats.appendChild(fRow2);
    sections.push(feats);

    // ─────────────────────────────────────────
    // 8. VALUE CARDS 3+2 (navy bg)
    // ─────────────────────────────────────────
    const vals = vf('Value cards', { w: 1440, fixW: true, fill: C.navy, pt: 68, pb: 68, pl: 165, pr: 165, gap: 32, cross: 'CENTER' });
    const valH2 = txt('What You Unlock When Shipping Is Under Control', 'h2', C.white, 800);
    valH2.textAlignHorizontal = 'CENTER';
    vals.appendChild(valH2);

    const valData = [
      { title: 'Less time spent managing shipping',  body: 'Auto-routing and smart defaults save the team hours every week — no manual research needed.' },
      { title: 'Better visibility across operations', body: 'See every shipment across every team. No more "Where is it?" — group views, account-wide.' },
      { title: 'Improved cost control',              body: 'Identify departments overspending and control it before it becomes a problem.' },
      { title: 'Fewer errors and delays',            body: 'Connect carrier accounts directly and reduce validation failures for every outbound shipment.' },
      { title: 'More accountability across teams',   body: 'Know who ships, how, when, and how much — across every location.' },
    ];

    const vRow1 = hf('Value row 1', { gap: 24 });
    const vRow2 = hf('Value row 2', { gap: 24 });
    for (let i = 0; i < 5; i++) {
      const vd = valData[i];
      const vc = vf('Value card ' + (i + 1), { w: 338, fixW: true, gap: 12, p: 28, fill: C.gray, r: 12 });
      const iconPh2 = rect(36, 36, C.blue, 6);
      iconPh2.name = 'Icon';
      vc.appendChild(iconPh2);
      vc.appendChild(txt(vd.title, 'h3', C.navy, 282));
      vc.appendChild(txt(vd.body, 'bodyMR', C.navy, 282));
      if (i < 3) vRow1.appendChild(vc);
      else       vRow2.appendChild(vc);
    }
    vals.appendChild(vRow1);
    vals.appendChild(vRow2);
    sections.push(vals);

    // ─────────────────────────────────────────
    // 9. FAQS
    // ─────────────────────────────────────────
    const faqWrap = vf('FAQs', { w: 1440, fixW: true, fill: C.white, pt: 64, pb: 64, gap: 24, cross: 'CENTER' });
    const faqH2 = txt('Frequently Asked Questions', 'h2', C.navy, 770);
    faqH2.textAlignHorizontal = 'CENTER';
    faqWrap.appendChild(faqH2);

    const faqData = [
      { q: 'How can I get started with Airpals?',              a: 'We recommend starting with a discovery call to assess your shipping needs and determine if Airpals is the right fit for your operations. Our team will guide you through a tailored onboarding process.' },
      { q: 'How does Airpals pricing work?',                   a: 'Airpals operates on a subscription model, billed monthly or annually. There are no caps or seat pricing — everything is included. Contact us for a custom quote.' },
      { q: 'Are there any other fees?',                        a: 'No hidden fees. Your billing includes your software plan, enrolled carrier account shipping charges, and standard rates. All clearly detailed.' },
      { q: 'When will I be billed?',                           a: 'Billing activation is dependent upon payment terms outlined before the cycle starts. Your team members receive emails to track billing activity.' },
      { q: 'Do you charge per user?',                          a: 'No. Airpals is designed for teams, so pricing is not based on seat count. Add as many users as needed without changing plans.' },
      { q: 'Is Airpals right for large or complex operations?', a: 'Yes. Airpals supports single location firms all the way up to enterprise, with multiple locations, unlimited users, and access to multiple carrier accounts.' },
      { q: 'What carriers does Airpals support?',              a: 'Airpals supports FedEx, UPS, and USPS for domestic shipments out of the box. Connect your pre-negotiated carrier accounts to access your own rates.' },
      { q: 'Can I connect my own carrier accounts?',           a: 'Yes. Connect your FedEx and UPS accounts to access your negotiated rates and invoicing records directly from Airpals.' },
      { q: 'How do I get support if I have an issue?',         a: 'You can reach us anytime via live chat or at hi@airpals.co. If you ever feel stuck anywhere, we are happy to help.' },
    ];

    const faqList = vf('FAQ list', { w: 770, fixW: true, gap: 12 });
    for (const faq of faqData) {
      const item = vf('FAQ item', { w: 770, fixW: true, gap: 12, pt: 24, pb: 24, pl: 32, pr: 32, fill: C.lblue, r: 8 });
      const qRow = hf('Q row', { main: 'SPACE_BETWEEN', cross: 'CENTER', gap: 12 });
      const qTxt = txt(faq.q, 'bodyMSB', C.navy, 650);
      qRow.appendChild(qTxt);
      qRow.appendChild(txt('↓', 'bodyMR', C.navy));
      item.appendChild(qRow);
      item.appendChild(txt(faq.a, 'bodySR', C.muted, 706));
      faqList.appendChild(item);
    }
    faqWrap.appendChild(faqList);
    sections.push(faqWrap);

    // ─────────────────────────────────────────
    // 10. CTA FINAL
    // ─────────────────────────────────────────
    const ctaWrap = hf('CTA final', { w: 1440, fixW: true, fill: C.white, pt: 32, pb: 32, pl: 152, pr: 152, main: 'CENTER', cross: 'CENTER' });
    const ctaInner = hf('CTA inner', { gap: 64, pt: 48, pb: 48, pl: 64, pr: 64, fill: C.lblue, r: 16, main: 'SPACE_BETWEEN', cross: 'CENTER' });
    const ctaLeft = vf('CTA copy', { gap: 20 });
    ctaLeft.appendChild(txt('See How Airpals Fits\nYour Operations', 'h2', C.navy, 440));
    ctaLeft.appendChild(txt('Get a close view of how Airpals would work for your team and love it to fit your current shipping setup.', 'bodyMR', C.navy, 440));
    const ctaBtn = CC.btnPri.createInstance();
    ctaBtn.name = 'Book a demo';
    ctaLeft.appendChild(ctaBtn);
    ctaInner.appendChild(ctaLeft);
    ctaInner.appendChild(illo(300, 300, 'CTA Illustration'));
    ctaWrap.appendChild(ctaInner);
    sections.push(ctaWrap);

    // ─────────────────────────────────────────
    // 11. FOOTER
    // ─────────────────────────────────────────
    const footer = CC.footer.createInstance();
    footer.name = 'Footer';
    sections.push(footer);

    // ─────────────────────────────────────────
    // WRAP IN SINGLE LANDING FRAME
    // ─────────────────────────────────────────
    const landing = figma.createFrame();
    landing.name = 'Landing Page — Airpals';
    landing.layoutMode = 'VERTICAL';
    landing.primaryAxisSizingMode = 'AUTO';
    landing.counterAxisSizingMode = 'FIXED';
    landing.resize(1440, 100);
    landing.itemSpacing = 0;
    landing.paddingTop = landing.paddingBottom = landing.paddingLeft = landing.paddingRight = 0;
    landing.fills = [{ type: 'SOLID', color: C.white }];
    landing.x = 0;
    landing.y = 0;
    pruebas.appendChild(landing);

    for (const s of sections) {
      landing.appendChild(s);
      s.layoutSizingHorizontal = 'FILL';
    }

    figma.currentPage.selection = [landing];
    figma.viewport.scrollAndZoomIntoView([landing]);

    return `Done! Landing Page — Airpals: ${Math.round(landing.width)}x${Math.round(landing.height)}px | ${sections.length} sections`;
  } catch (e) {
    return 'ERROR: ' + e.message + '\n' + e.stack;
  }
})()
