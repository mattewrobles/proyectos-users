<script>
(function () {
  'use strict';

  var DOCTORS_COL   = '6a3189ba0285533232040331';
  var SPECIALTY_COL = '6a3189ba028553323204030c';
  var SUBESP_COL    = '6a3c4f2d9a3fad51d06afdb5';
  var API_BASE      = 'https://webflow-medicos.academy-915.workers.dev/v2/collections/';
  var PH            = 'https://placehold.co/400x500/EBEDF0/EBEDF0?text=+';

  var D = [], ESP = [];
  var activeEsp = {}, searchTerm = '', sortOrder = 'az';
  var currentPage = 1, PER_PAGE = 8, tpl = null;

  var calibrateSection = null;

  function apiFetch(url) {
    return fetch(url).then(function(r){if(!r.ok)throw new Error(r.status);return r.json();});
  }
  function fetchAll(col,acc,off){
    acc=acc||[];off=off||0;
    return apiFetch(API_BASE+col+'/items?limit=100&offset='+off).then(function(d){
      acc=acc.concat(d.items||[]);
      var t=d.pagination?d.pagination.total:acc.length;
      return acc.length<t?fetchAll(col,acc,off+100):acc;
    });
  }
  function getVal(f,keys){
    for(var i=0;i<keys.length;i++){var v=f[keys[i]];if(v!==undefined&&v!==null&&String(v).trim())return String(v).trim();}return'';
  }
  function fmtUrl(u){return u?(u.match(/^https?:\/\//i)?u:'https://'+u):'';}
  function fmtWa(w){if(!w)return'';if(w.match(/^https?:\/\//i))return w;var c=w.replace(/\D/g,'');return c?'https://wa.me/'+c:'';}

  function buildData(docs,spMap,sespMap){
    D=docs.filter(function(d){return!d.fieldData['no-publicar']&&!d.isArchived;}).map(function(d){
      var f=d.fieldData;
      return[f.name||'',spMap[f.specialty]||'',sespMap[f['subespecialidades-2']]||'',f.image?f.image.url:'',f['role-for-nurses']||'',
        fmtUrl(getVal(f,['facebook','facebook-2','facebook-link','facebook-url','fb'])),
        fmtUrl(getVal(f,['linkedin','linkedin-2','linkedin-link','linkedin-url','in'])),
        fmtUrl(getVal(f,['website','pagina-web','sitio-web','web','link-web','url-web'])),
        fmtUrl(getVal(f,['youtube','youtube-2','youtube-link','youtube-url','yt'])),
        fmtWa(getVal(f,['whatsapp','whatsapp-2','whatsapp-link','numero-de-whatsapp','telefono-whatsapp','celular-whatsapp'])),
      ];
    });
    var ec={};
    D.forEach(function(d){if(d[1])ec[d[1]]=(ec[d[1]]||0)+1;});
    ESP=Object.keys(ec).sort(function(a,b){return a.localeCompare(b,'es');}).map(function(k){return[k,ec[k]];});
  }

  function filtered(){
    return D.filter(function(d){
      var okS=!searchTerm||d[0].toLowerCase().indexOf(searchTerm)!==-1||d[1].toLowerCase().indexOf(searchTerm)!==-1;
      var okE=!Object.keys(activeEsp).length||activeEsp[d[1]];
      return okS&&okE;
    }).sort(function(a,b){return sortOrder==='az'?a[0].localeCompare(b[0],'es'):b[0].localeCompare(a[0],'es');});
  }

  function slugify(n){return n.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9\s]/g,'').trim().replace(/\s+/g,'-');}
  function setText(el,t){if(!el)return;el.textContent=t;if(t)el.classList.remove('w-dyn-bind-empty');else el.classList.add('w-dyn-bind-empty');}

  function svgI(p){return'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="'+p+'"/></svg>';}
  var SVG={
    fb:svgI('M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'),
    li:svgI('M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'),
    web:svgI('M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.057zm-4 0c-.244-.817-.397-1.914-.456-3.057h2.994v3.057zm0-5.057c.047-1.073.18-2.095.395-2.943h3.21c.215.848.348 1.87.395 2.943zm5 0h3.832c-.227 1.168-.657 2.228-1.251 3.057h-2.581zm1.378-5c.594.829 1.024 1.889 1.251 3.057h-3.832v-3.057zm-7.378 0v3.057h-3.832c.227-1.168.657-2.228 1.251-3.057zm-1.378 5h3.832v3.057h-2.581c-.594-.829-1.024-1.889-1.251-3.057z'),
    yt:svgI('M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'),
    wa:svgI('M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z')
  };

  function buildHoverHTML(d){
    var name=d[0],spec=d[1],subspec=d[2],room=d[4],fb=d[5],li=d[6],web=d[7],yt=d[8],wa=d[9];
    var spec2=spec+(subspec?' · '+subspec:'');
    var soc='';
    if(fb)soc+='<a href="'+fb+'" target="_blank" class="mf-si" title="Facebook">'+SVG.fb+'</a>';
    if(li)soc+='<a href="'+li+'" target="_blank" class="mf-si" title="LinkedIn">'+SVG.li+'</a>';
    if(web)soc+='<a href="'+web+'" target="_blank" class="mf-si" title="Web">'+SVG.web+'</a>';
    if(yt)soc+='<a href="'+yt+'" target="_blank" class="mf-si" title="YouTube">'+SVG.yt+'</a>';
    if(wa)soc+='<a href="'+wa+'" target="_blank" class="mf-si" title="WhatsApp">'+SVG.wa+'</a>';
    return'<div style="display:flex;flex-direction:column;gap:6px"><div style="font-size:16px;font-weight:700;color:#1a365d;line-height:1.3">'+name+'</div><div style="font-size:13px;color:#718096;line-height:1.4">'+spec2+'</div></div>'+
      '<div style="margin:auto 0;padding:12px 0">'+(room?'<div style="font-size:14px;color:#4a5568;line-height:1.4">'+room+'</div>':'')+'</div>'+
      '<div style="display:flex;flex-direction:column;gap:16px">'+(soc?'<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">'+soc+'</div>':'')+'<div><a href="/doctor/'+slugify(name)+'" style="font-size:14px;font-weight:600;color:#1a365d;text-decoration:underline">Ver perfil</a></div></div>';
  }

  function buildCard(d){
    if(!tpl)return null;
    var c=tpl.cloneNode(true);
    // Quitar data-w-id para evitar que Webflow IX reinicialice animaciones en el clon
    c.removeAttribute('data-w-id');
    c.querySelectorAll('[data-w-id]').forEach(function(el){el.removeAttribute('data-w-id');});
    var img=c.querySelector('.image_cover');
    if(img){img.removeAttribute('src');img.removeAttribute('srcset');img.removeAttribute('sizes');img.src=d[3]||PH;img.alt=d[0];img.onerror=function(){this.src=PH;};}
    var fw=c.querySelector('.wrap_text-testimonial-home');
    if(fw){
      setText(fw.querySelector('div:not(.master_label)'),d[0]);
      var mc=fw.querySelector('.master_label');
      if(mc){
        setText(mc.querySelector('.text-size-small:not(.wrap)'),d[1]);
        var s1=mc.querySelector('.text-size-small.wrap'),sep=mc.querySelector('.label-small');
        if(d[2]){setText(s1,d[2]);if(s1)s1.style.display='';if(sep)sep.style.display='';}
        else{if(s1){s1.textContent='';s1.style.display='none';}if(sep)sep.style.display='none';}
      }
    }
    var card=c.querySelector('.card_carousel');
    if(card){
      var hov=document.createElement('div');
      hov.className='mf-overlay';
      hov.innerHTML=buildHoverHTML(d);
      card.appendChild(hov);
      card.addEventListener('mouseenter',function(){
        hov.style.width=card.offsetWidth+'px';
        hov.style.height=card.offsetHeight+'px';
        hov.classList.add('mf-hovered');
      });
      card.addEventListener('mouseleave',function(){hov.classList.remove('mf-hovered');});
    }
    var pl=c.querySelector('.btn-carousel_animation-wrapper a,.btn-wrap_card-carousel a');if(pl)pl.href='/doctor/'+slugify(d[0]);
    return c;
  }

  function render(){
    var list=document.querySelector('.w-dyn-items');if(!list)return;
    var docs=filtered();
    var tp=Math.ceil(docs.length/PER_PAGE)||1;
    if(currentPage>tp)currentPage=1;
    var paged=docs.slice((currentPage-1)*PER_PAGE,currentPage*PER_PAGE);
    var frag=document.createDocumentFragment();
    paged.forEach(function(d){var c=buildCard(d);if(c)frag.appendChild(c);});
    list.innerHTML='';list.appendChild(frag);
    var ctr=document.getElementById('mf-count');if(ctr)ctr.textContent=docs.length+' Resultados de '+D.length+'.';
    var rst=document.getElementById('mf-reset');if(rst)rst.style.display=(Object.keys(activeEsp).length||searchTerm)?'inline-block':'none';
    renderPagination(tp,docs.length);
    setTimeout(function(){
      if(calibrateSection)calibrateSection(false);
    },50);
  }

  function renderPagination(tp,total){
    var main=document.getElementById('mf-main');if(!main)return;
    var pag=document.getElementById('mf-pagination');
    if(!pag){pag=document.createElement('div');pag.id='mf-pagination';pag.style.cssText='display:flex;justify-content:center;align-items:center;gap:16px;margin-top:40px;padding:20px 0;width:100%';main.appendChild(pag);}
    if(total<=PER_PAGE){pag.innerHTML='';return;}
    pag.innerHTML='';
    var mkB=function(txt,dis,cb){
      var b=document.createElement('button');b.textContent=txt;b.disabled=dis;
      b.style.cssText='padding:8px 18px;border:1px solid #e2e8f0;border-radius:4px;font-size:13px;font-weight:600;cursor:'+(dis?'not-allowed':'pointer')+';background:'+(dis?'#f7fafc':'#fff')+';color:'+(dis?'#a0aec0':'#1a365d');
      if(!dis)b.addEventListener('click',cb);
      return b;
    };
    var inf=document.createElement('span');inf.style.cssText='font-size:14px;color:#4a5568;font-weight:500';inf.textContent='Página '+currentPage+' de '+tp;
    pag.appendChild(mkB('← Anterior',currentPage===1,function(){currentPage--;render();document.getElementById('mf-main').scrollIntoView({behavior:'smooth',block:'start'});}));
    pag.appendChild(inf);
    pag.appendChild(mkB('Siguiente →',currentPage===tp,function(){currentPage++;render();document.getElementById('mf-main').scrollIntoView({behavior:'smooth',block:'start'});}));
  }

  function resetAll(){activeEsp={};searchTerm='';currentPage=1;var si=document.getElementById('mf-search');if(si)si.value='';document.querySelectorAll('.mf-cb').forEach(function(cb){cb.checked=false;});render();}

  function makeFilterSection(title,items,attr,onChange){
    var wrap=document.createElement('div');wrap.className='filter_block';
    var head=document.createElement('div');head.style.cssText='display:flex;justify-content:space-between;align-items:center;margin-bottom:12px';
    var ttl=document.createElement('div');ttl.style.cssText='font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#1a365d;margin-bottom:12px';ttl.textContent=title;
    var clr=document.createElement('button');clr.textContent='Borrar';clr.style.cssText='font-size:12px;background:none;border:none;cursor:pointer;color:#718096;text-decoration:underline';
    clr.addEventListener('click',function(){wrap.querySelectorAll('input').forEach(function(cb){cb.checked=false;delete activeEsp[cb.value];});currentPage=1;render();});
    head.appendChild(ttl);head.appendChild(clr);wrap.appendChild(head);
    var list=document.createElement('div');list.className='mf-filter-list';
    items.forEach(function(item){
      var val=item[0],cnt=item[1];
      var row=document.createElement('label');row.style.cssText='display:flex;align-items:center;gap:10px;cursor:pointer;font-size:13px;color:#4a5568';row.setAttribute(attr,val);
      var cb=document.createElement('input');cb.type='checkbox';cb.value=val;cb.className='mf-cb';cb.style.cssText='width:16px;height:16px;border-radius:2px;accent-color:#1a365d;flex-shrink:0';
      cb.addEventListener('change',function(){onChange(val,cb.checked);});
      var badge=document.createElement('span');badge.style.cssText='margin-left:auto;font-size:11px;color:#a0aec0';badge.textContent='['+cnt+']';
      row.appendChild(cb);row.appendChild(document.createTextNode(val));row.appendChild(badge);list.appendChild(row);
    });
    wrap.appendChild(list);return wrap;
  }

  function injectUI(listEl){
    var style=document.createElement('style');
    style.textContent=
      'html{height:auto!important}'+
      '.filter_block{padding:20px 0;border-bottom:1px solid #e8e8e8}'+
      '.filter_block:first-child{padding-top:0}'+
      '#mf-sidebar-placeholder{width:260px;flex-shrink:0}'+
      '#mf-sidebar{position:fixed;top:88px;left:-9999px;width:228px;overflow-y:auto;z-index:5;opacity:0;pointer-events:none;transition:opacity .2s;scrollbar-width:thin;scrollbar-color:#cbd5e0 transparent;padding-right:8px}'+
      '#mf-sidebar.mf-visible{opacity:1;pointer-events:auto}'+
      '#mf-sidebar::-webkit-scrollbar{width:4px}'+
      '#mf-sidebar::-webkit-scrollbar-thumb{background:#cbd5e0;border-radius:4px}'+
      '.mf-filter-list{display:flex;flex-direction:column;gap:8px}'+
      '#mf-main{flex:1;min-width:0}'+
      '#mf-main .w-dyn-items{display:grid!important;grid-template-columns:repeat(4,1fr)!important;gap:24px 16px!important;width:100%!important;align-items:stretch!important}'+
      '#mf-main .w-dyn-item{width:100%!important;box-sizing:border-box!important;position:relative!important;aspect-ratio:3/4.2!important;min-height:380px!important;display:flex!important;flex-direction:column!important;border-radius:12px!important;overflow:hidden!important}'+
      '#mf-main .content_carousel,#mf-main .wrap_text-testimonial-home{position:static!important}'+
      '#mf-main .card_carousel{position:relative!important;width:100%!important;height:100%!important;display:flex!important;flex-direction:column!important;overflow:hidden!important}'+
      '#mf-main .image_cover{width:100%!important;height:100%!important;object-fit:cover!important;object-position:top center!important;display:block!important}'+
      '.mf-overlay{position:absolute;top:0;left:0;z-index:30;background:#f8fafc;display:flex;flex-direction:column;justify-content:space-between;padding:24px 20px;border-radius:12px;opacity:0;visibility:hidden;pointer-events:none;transition:opacity .25s,visibility .25s;box-sizing:border-box}'+
      '.mf-overlay.mf-hovered{opacity:1;visibility:visible;pointer-events:auto}'+
      '.mf-si{width:36px;height:36px;border-radius:50%;border:1px solid #cbd5e0;display:inline-flex!important;align-items:center;justify-content:center;color:#64748b;transition:all .2s;background:transparent;text-decoration:none}'+
      '.mf-si:hover{background:#eb5e10;color:#fff;border-color:#eb5e10}'+
      '@media(max-width:1024px){#mf-main .w-dyn-items{grid-template-columns:repeat(3,1fr)!important}#mf-sidebar-placeholder{width:200px!important}#mf-sidebar{width:168px!important}}'+
      '@media(max-width:767px){'+
        '#mf-grid{flex-direction:column!important}'+
        '#mf-sidebar-placeholder{display:none!important}'+
        '#mf-sidebar{position:static!important;left:auto!important;top:auto!important;width:100%!important;max-height:none!important;overflow-y:visible!important;padding-right:0!important;border-bottom:2px solid #e8e8e8!important;margin-bottom:20px!important;z-index:auto!important;opacity:1!important;pointer-events:auto!important;transition:none!important}'+
        '#mf-main{width:100%!important}'+
        '#mf-main .w-dyn-items{grid-template-columns:repeat(2,1fr)!important;gap:12px 10px!important}'+
        '#mf-main .w-dyn-item{aspect-ratio:2/3!important;min-height:220px!important}'+
        '.mf-filter-list{max-height:200px!important;overflow-y:auto!important;overscroll-behavior:contain!important;-webkit-mask-image:linear-gradient(to bottom,#000 80%,transparent 100%)!important;mask-image:linear-gradient(to bottom,#000 80%,transparent 100%)!important}'+
        '#mf-main .mf-overlay{padding:14px 12px!important}'+
      '}';
    document.head.appendChild(style);

    var dynList=listEl.closest('.w-dyn-list')||listEl.parentNode;
    var parentNode=dynList.parentNode;

    var grid=document.createElement('div');grid.id='mf-grid';grid.style.cssText='display:flex;align-items:flex-start;gap:0';
    var placeholder=document.createElement('div');placeholder.id='mf-sidebar-placeholder';

    var sidebar=document.createElement('div');sidebar.id='mf-sidebar';
    sidebar.setAttribute('data-lenis-prevent','');

    var bBlock=document.createElement('div');bBlock.className='filter_block';
    var bLbl=document.createElement('div');bLbl.style.cssText='font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#1a365d;margin-bottom:12px';bLbl.textContent='BUSCAR';
    var inp=document.createElement('input');inp.type='text';inp.id='mf-search';inp.placeholder='';
    inp.style.cssText='width:100%;padding:10px 12px;border:1px solid #e2e8f0;border-radius:4px;font-size:14px;outline:none;box-sizing:border-box';
    var ti;inp.addEventListener('input',function(){clearTimeout(ti);ti=setTimeout(function(){searchTerm=inp.value.toLowerCase().trim();currentPage=1;render();},220);});
    bBlock.appendChild(bLbl);bBlock.appendChild(inp);sidebar.appendChild(bBlock);

    var cBlock=document.createElement('div');cBlock.className='filter_block';cBlock.style.cssText='display:flex;justify-content:space-between;align-items:center;padding:16px 0';
    var ctr=document.createElement('span');ctr.id='mf-count';ctr.style.cssText='font-size:13px;color:#4a5568';ctr.textContent=D.length+' Resultados de '+D.length+'.';
    var rst=document.createElement('button');rst.id='mf-reset';rst.textContent='Borrar Todo';rst.style.cssText='font-size:12px;background:none;border:none;cursor:pointer;color:#4a5568;text-decoration:underline;display:none';
    rst.addEventListener('click',resetAll);
    cBlock.appendChild(ctr);cBlock.appendChild(rst);sidebar.appendChild(cBlock);
    sidebar.appendChild(makeFilterSection('ESPECIALIDAD',ESP,'data-mf-esp',function(v,chk){if(chk)activeEsp[v]=true;else delete activeEsp[v];currentPage=1;render();}));
    var main=document.createElement('div');main.id='mf-main';
    var hdr=document.createElement('div');hdr.style.cssText='display:flex;justify-content:flex-end;align-items:center;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #e8e8e8';
    var sortSel=document.createElement('select');sortSel.style.cssText='padding:8px 12px;border:1px solid #e2e8f0;border-radius:4px;font-size:13px;color:#4a5568;cursor:pointer;background:#fff';
    sortSel.innerHTML='<option value="az">Ordenar por A/Z</option><option value="za">Ordenar por Z/A</option>';
    sortSel.addEventListener('change',function(){sortOrder=sortSel.value;currentPage=1;render();});
    hdr.appendChild(sortSel);main.appendChild(hdr);

    // sidebar inside grid — on mobile position:static flows correctly above cards
    grid.appendChild(sidebar);grid.appendChild(placeholder);grid.appendChild(main);
    parentNode.replaceChild(grid,dynList);
    main.appendChild(dynList);

    /* --- Footer reference for proximity check ---
       The footer is OUTSIDE section-hero_team, so its getBoundingClientRect()
       is never affected by GSAP's pin transforms. Reliable for "are we in the footer?" */
    var footerEl = document.querySelector('.footer_component, .footer-component, footer, [class*="footer_wrap"]');

    /* --- Section calibration ---
       sectionAbsTop: set once at init (scrollY=0, before GSAP pins anything).
       sectionAbsHeight: updated after each render (card count can change with filters). */
    var sectionAbsTop = 0;
    var sectionAbsHeight = 0;
    var sectionTopSet = false;

    calibrateSection = function(setTop) {
      var rect = grid.getBoundingClientRect();
      var scrollY = window.scrollY || window.pageYOffset;
      if(setTop !== false && !sectionTopSet) {
        sectionAbsTop = rect.top + scrollY;
        sectionTopSet = true;
      }
      sectionAbsHeight = grid.offsetHeight;
    };

    var rafId;
    function updatePos(){
      cancelAnimationFrame(rafId);
      rafId=requestAnimationFrame(function(){
        if(window.innerWidth<=767)return;

        var scrollY = window.scrollY || window.pageYOffset;
        var phRect  = placeholder.getBoundingClientRect();
        var left    = phRect.left;

        /* --- Footer guard (most reliable check) ---
           Footer is outside pinned section → its rect is always accurate.
           If footer top is within 20px of viewport top, hide sidebar. */
        if(footerEl) {
          var footerTop = footerEl.getBoundingClientRect().top;
          if(footerTop < window.innerHeight - 20) {
            sidebar.classList.remove('mf-visible');
            sidebar.style.left = left + 'px';
            return;
          }
        }

        /* --- Grid viewport position via absolute coords + scroll ---
           Works through GSAP pins because window.scrollY advances
           even while the section is pinned (position:fixed). */
        var relTop    = sectionAbsTop - scrollY;
        var relBottom = relTop + sectionAbsHeight;

        if(relBottom < 0 || relTop > window.innerHeight){
          sidebar.classList.remove('mf-visible');
          sidebar.style.left = left + 'px';
          return;
        }

        sidebar.classList.add('mf-visible');

        var top;
        if(relTop > 88){
          top = relTop;
        } else if(relBottom < 88 + 400){
          /* 400 = conservative min sidebar height. Avoids showing a 20px sliver. */
          top = Math.max(relBottom - 400, 0);
        } else {
          top = 88;
        }

        /* Clamp sidebar height so it never extends past grid bottom or footer. */
        var availH = relBottom - top;
        if(availH < 80){
          sidebar.classList.remove('mf-visible');
          sidebar.style.left = left + 'px';
          return;
        }
        var maxH = Math.min(window.innerHeight - 108, availH);

        sidebar.style.left      = left + 'px';
        sidebar.style.top       = top + 'px';
        sidebar.style.maxHeight = maxH + 'px';
      });
    }

    window.addEventListener('scroll', updatePos, {passive:true});
    window.addEventListener('resize', function(){
      if(window.innerWidth<=767){sidebar.style.cssText='';sidebar.classList.remove('mf-visible');}
      calibrateSection(false);
      updatePos();
    }, {passive:true});

    /* --- Lenis integration: update sidebar position on each Lenis tick ---
       scrollerProxy intentionally omitted — it breaks the template's existing
       GSAP ScrollTrigger pins when called after they're already initialized. */
    setTimeout(function(){
      if(window.lenis&&window.lenis.on){
        window.lenis.on('scroll',updatePos);
        if(window.ScrollTrigger&&!window._mf_lenis_linked){
          window._mf_lenis_linked=true;
          window.lenis.on('scroll',window.ScrollTrigger.update);
        }
      }
    }, 300);

    requestAnimationFrame(function(){
      calibrateSection(true);
      updatePos();
    });
  }

  function init(){
    var listEl=document.querySelector('.w-dyn-items');if(!listEl)return;
    var items=listEl.querySelectorAll('.w-dyn-item');
    var bestTpl=items[0],maxEl=0;
    for(var i=0;i<items.length;i++){var c=items[i].querySelectorAll('*').length;if(c>maxEl){maxEl=c;bestTpl=items[i];}}
    if(bestTpl)tpl=bestTpl.cloneNode(true);
    listEl.innerHTML='<div style="text-align:center;padding:60px;color:#718096;font-size:15px">Cargando directorio médico…</div>';
    Promise.all([fetchAll(SPECIALTY_COL),fetchAll(SUBESP_COL),fetchAll(DOCTORS_COL)])
      .then(function(res){
        var spMap={},sespMap={};
        res[0].forEach(function(i){spMap[i.id]=i.fieldData.name;});
        res[1].forEach(function(i){sespMap[i.id]=i.fieldData.name;});
        buildData(res[2],spMap,sespMap);
        injectUI(listEl);render();
      }).catch(function(err){
        console.error('mf:',err);
        listEl.innerHTML='<div style="text-align:center;padding:60px;color:#e53e3e;font-size:15px">Error al cargar el directorio. Recarga la página.</div>';
      });
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
</script>
