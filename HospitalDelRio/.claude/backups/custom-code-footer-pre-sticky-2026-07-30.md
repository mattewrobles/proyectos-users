# Backup — footer custom code medicos page
# Date: 2026-07-30
# Before: sticky sidebar implementation
# Page ID: 6a3189ba02855332320402e6

```html
<script>
(function () {
  'use strict';

  // CONFIG
  var DOCTORS_COL   = '6a3189ba0285533232040331';
  var SPECIALTY_COL = '6a3189ba028553323204030c';
  var SUBESP_COL    = '6a3c4f2d9a3fad51d06afdb5';
  var API_BASE      = 'https://webflow-medicos.academy-915.workers.dev/v2/collections/';

  var PH  = 'https://placehold.co/400x500/EBEDF0/EBEDF0?text=+';

  // PAGINACIÓN Y ESTADO
  var D = [], ESP = [];
  var activeEsp={}, searchTerm='', sortOrder='az';
  var currentPage = 1;
  var PER_PAGE = 8;
  var tpl = null;

  function apiFetch(url) {
    return fetch(url).then(function(r) {
      if (!r.ok) throw new Error('Webflow API ' + r.status);
      return r.json();
    });
  }

  function fetchAll(colId, acc, offset) {
    acc    = acc    || [];
    offset = offset || 0;
    return apiFetch(API_BASE + colId + '/items?limit=100&offset=' + offset).then(function(data) {
      acc = acc.concat(data.items || []);
      var total = data.pagination ? data.pagination.total : acc.length;
      if (acc.length < total) return fetchAll(colId, acc, offset + 100);
      return acc;
    });
  }

  function getVal(f, keys) {
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (f[k] !== undefined && f[k] !== null && String(f[k]).trim() !== '') {
        return String(f[k]).trim();
      }
    }
    return '';
  }

  function formatUrl(url) {
    if (!url) return '';
    if (!url.match(/^https?:\/\//i)) return 'https://' + url;
    return url;
  }

  function formatWa(wa) {
    if (!wa) return '';
    if (wa.match(/^https?:\/\//i)) return wa;
    var clean = wa.replace(/\D/g, '');
    if (clean) return 'https://wa.me/' + clean;
    return '';
  }

  function buildData(doctors, spMap, sespMap) {
    D = doctors
      .filter(function(d) { return !d.fieldData['no-publicar'] && !d.isArchived; })
      .map(function(d) {
        var f = d.fieldData;
        return [
          f.name || '',
          spMap[f.specialty] || '',
          sespMap[f['subespecialidades-2']] || '',
          f.image ? f.image.url : '',
          f['role-for-nurses'] || '',
          formatUrl(getVal(f, ['facebook', 'facebook-2', 'facebook-link', 'facebook-url', 'fb'])),
          formatUrl(getVal(f, ['linkedin', 'linkedin-2', 'linkedin-link', 'linkedin-url', 'in'])),
          formatUrl(getVal(f, ['website', 'pagina-web', 'sitio-web', 'web', 'link-web', 'url-web'])),
          formatUrl(getVal(f, ['youtube', 'youtube-2', 'youtube-link', 'youtube-url', 'yt'])),
          formatWa(getVal(f, ['whatsapp', 'whatsapp-2', 'whatsapp-link', 'numero-de-whatsapp', 'telefono-whatsapp', 'celular-whatsapp'])),
        ];
      });

    var espCount = {};
    D.forEach(function(d) {
      if (d[1]) espCount[d[1]] = (espCount[d[1]] || 0) + 1;
    });
    ESP = Object.keys(espCount).sort(function(a,b){return a.localeCompare(b,'es');}).map(function(k){return [k,espCount[k]];});
  }

  function filtered() {
    return D.filter(function(d) {
      var okS = !searchTerm || d[0].toLowerCase().indexOf(searchTerm) !== -1 || d[1].toLowerCase().indexOf(searchTerm) !== -1;
      var okE = !Object.keys(activeEsp).length || activeEsp[d[1]];
      return okS && okE;
    }).sort(function(a,b) {
      return sortOrder === 'az' ? a[0].localeCompare(b[0],'es') : b[0].localeCompare(a[0],'es');
    });
  }

  function fotoUrl(url) { return url || PH; }

  function slugify(n) {
    return n.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9\s]/g,'').trim().replace(/\s+/g,'-');
  }

  function setText(el, text) {
    if (!el) return;
    el.textContent = text;
    if (text) el.classList.remove('w-dyn-bind-empty');
    else      el.classList.add('w-dyn-bind-empty');
  }

  function buildHoverHTML(d) {
    var name = d[0];
    var spec = d[1];
    var subspec = d[2];
    var room = d[4];
    var fb = d[5], li = d[6], web = d[7], yt = d[8], wa = d[9];
    var docSlug = slugify(name);
    var specCombined = spec + (subspec ? ' · ' + subspec : '');
    var socialHTML = '';
    if (fb) socialHTML += '<a href="' + fb + '" target="_blank" class="mf-social-icon" title="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>';
    if (li) socialHTML += '<a href="' + li + '" target="_blank" class="mf-social-icon" title="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>';
    if (web) socialHTML += '<a href="' + web + '" target="_blank" class="mf-social-icon" title="Sitio Web"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.057zm-4 0c-.244-.817-.397-1.914-.456-3.057h2.994v3.057zm0-5.057c.047-1.073.18-2.095.395-2.943h3.21c.215.848.348 1.87.395 2.943zm5 0h3.832c-.227 1.168-.657 2.228-1.251 3.057h-2.581zm1.378-5c.594.829 1.024 1.889 1.251 3.057h-3.832v-3.057zm-7.378 0v3.057h-3.832c.227-1.168.657-2.228 1.251-3.057zm-1.378 5h3.832v3.057h-2.581c-.594-.829-1.024-1.889-1.251-3.057z"/></svg></a>';
    if (yt) socialHTML += '<a href="' + yt + '" target="_blank" class="mf-social-icon" title="YouTube"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>';
    if (wa) socialHTML += '<a href="' + wa + '" target="_blank" class="mf-social-icon" title="WhatsApp"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg></a>';

    return '' +
      '<div style="display:flex;flex-direction:column;gap:6px;">' +
        '<div style="font-size:16px;font-weight:700;color:#1a365d;line-height:1.3;">' + name + '</div>' +
        '<div style="font-size:13px;color:#718096;line-height:1.4;">' + specCombined + '</div>' +
      '</div>' +
      '<div style="margin-top:auto;margin-bottom:auto;padding:12px 0;">' +
        (room ? '<div style="font-size:14px;color:#4a5568;line-height:1.4;">' + room + '</div>' : '') +
      '</div>' +
      '<div style="display:flex;flex-direction:column;gap:16px;">' +
        (socialHTML ? '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">' + socialHTML + '</div>' : '') +
        '<div><a href="/doctor/' + docSlug + '" style="font-size:14px;font-weight:600;color:#1a365d;text-decoration:underline;">Ver perfil</a></div>' +
      '</div>';
  }

  function buildCard(d) {
    if (!tpl) return null;
    var c = tpl.cloneNode(true);
    var img = c.querySelector('.image_cover');
    if (img) {
      img.removeAttribute('src');
      img.removeAttribute('srcset');
      img.removeAttribute('sizes');
      img.src = fotoUrl(d[3]);
      img.alt = d[0];
      img.onerror = function(){ this.src = PH; };
    }
    var frontalWrap = c.querySelector('.wrap_text-testimonial-home');
    if (frontalWrap) {
      var nameFront = frontalWrap.querySelector('div:not(.master_label)');
      setText(nameFront, d[0]);
      var masterCard = frontalWrap.querySelector('.master_label');
      if (masterCard) {
        var espFront  = masterCard.querySelector('.text-size-small:not(.wrap)');
        var sub1Front = masterCard.querySelector('.text-size-small.wrap');
        var sepFront  = masterCard.querySelector('.label-small');
        setText(espFront, d[1]);
        if (d[2]) {
          setText(sub1Front, d[2]);
          if (sub1Front) sub1Front.style.display = '';
          if (sepFront)  sepFront.style.display  = '';
        } else {
          if (sub1Front) { sub1Front.textContent = ''; sub1Front.style.display = 'none'; }
          if (sepFront)  sepFront.style.display  = 'none';
        }
      }
    }
    var hoverPanel = c.querySelector('.masked-content_carousel');
    if (hoverPanel) {
      hoverPanel.innerHTML = buildHoverHTML(d);
    }
    var pl = c.querySelector('.btn-carousel_animation-wrapper a, .btn-wrap_card-carousel a');
    if (pl) pl.href = '/doctor/' + slugify(d[0]);
    return c;
  }

  function render() {
    var list = document.querySelector('.w-dyn-items');
    if (!list) return;
    var docs = filtered();
    var totalPages = Math.ceil(docs.length / PER_PAGE) || 1;
    if (currentPage > totalPages) currentPage = 1;
    var start = (currentPage - 1) * PER_PAGE;
    var end = start + PER_PAGE;
    var pagedDocs = docs.slice(start, end);
    var frag = document.createDocumentFragment();
    pagedDocs.forEach(function(d) {
      var c = buildCard(d);
      if (c) frag.appendChild(c);
    });
    list.innerHTML = '';
    list.appendChild(frag);
    var ctr = document.getElementById('mf-count');
    if (ctr) ctr.textContent = docs.length + ' Resultados de ' + D.length + '.';
    var dirty = Object.keys(activeEsp).length || searchTerm;
    var rst = document.getElementById('mf-reset');
    if (rst) rst.style.display = dirty ? 'inline-block' : 'none';
    renderPagination(totalPages, docs.length);
  }

  function renderPagination(totalPages, totalItems) {
    var main = document.getElementById('mf-main');
    if (!main) return;
    var pagEl = document.getElementById('mf-pagination');
    if (!pagEl) {
      pagEl = document.createElement('div');
      pagEl.id = 'mf-pagination';
      pagEl.style.cssText = 'display:flex;justify-content:center;align-items:center;gap:16px;margin-top:40px;padding:20px 0;width:100%';
      main.appendChild(pagEl);
    }
    if (totalItems <= PER_PAGE) { pagEl.innerHTML = ''; return; }
    pagEl.innerHTML = '';
    var prevBtn = document.createElement('button');
    prevBtn.textContent = '← Anterior';
    prevBtn.disabled = currentPage === 1;
    prevBtn.style.cssText = 'padding:8px 18px;border:1px solid #e2e8f0;border-radius:4px;background:' + (currentPage === 1 ? '#f7fafc' : '#fff') + ';color:' + (currentPage === 1 ? '#a0aec0' : '#1a365d') + ';cursor:' + (currentPage === 1 ? 'not-allowed' : 'pointer') + ';font-size:13px;font-weight:600;transition:all .2s;';
    prevBtn.addEventListener('click', function() {
      if (currentPage > 1) { currentPage--; render(); main.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
    var info = document.createElement('span');
    info.style.cssText = 'font-size:14px;color:#4a5568;font-weight:500';
    info.textContent = 'Página ' + currentPage + ' de ' + totalPages;
    var nextBtn = document.createElement('button');
    nextBtn.textContent = 'Siguiente →';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.style.cssText = 'padding:8px 18px;border:1px solid #e2e8f0;border-radius:4px;background:' + (currentPage === totalPages ? '#f7fafc' : '#fff') + ';color:' + (currentPage === totalPages ? '#a0aec0' : '#1a365d') + ';cursor:' + (currentPage === totalPages ? 'not-allowed' : 'pointer') + ';font-size:13px;font-weight:600;transition:all .2s;';
    nextBtn.addEventListener('click', function() {
      if (currentPage < totalPages) { currentPage++; render(); main.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
    pagEl.appendChild(prevBtn);
    pagEl.appendChild(info);
    pagEl.appendChild(nextBtn);
  }

  function resetAll() {
    activeEsp={}; searchTerm=''; currentPage=1;
    var si = document.getElementById('mf-search'); if(si) si.value='';
    document.querySelectorAll('.mf-cb').forEach(function(cb){cb.checked=false;});
    render();
  }

  function makeFilterSection(title, items, dataAttr, onChange) {
    var wrap = document.createElement('div');
    wrap.className = 'filter_block';
    var head = document.createElement('div');
    head.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:12px';
    var ttl = document.createElement('div');
    ttl.style.cssText = 'font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#1a365d';
    ttl.textContent = title;
    var clr = document.createElement('button');
    clr.textContent = 'Borrar';
    clr.style.cssText = 'font-size:12px;background:none;border:none;cursor:pointer;color:#718096;text-decoration:underline';
    clr.addEventListener('click', function() {
      wrap.querySelectorAll('input[type=checkbox]').forEach(function(cb) {
        cb.checked = false;
        delete activeEsp[cb.value];
      });
      currentPage = 1;
      render();
    });
    head.appendChild(ttl); head.appendChild(clr);
    wrap.appendChild(head);
    var list = document.createElement('div');
    list.className = 'mf-filter-list';
    items.forEach(function(item) {
      var val = item[0], cnt = item[1];
      var row = document.createElement('label');
      row.style.cssText = 'display:flex;align-items:center;gap:10px;cursor:pointer;font-size:13px;color:#4a5568';
      row.setAttribute(dataAttr, val);
      var cb = document.createElement('input');
      cb.type='checkbox'; cb.value=val; cb.className='mf-cb';
      cb.style.cssText = 'width:16px;height:16px;border-radius:2px;accent-color:#1a365d;flex-shrink:0';
      cb.addEventListener('change', function(){ onChange(val, cb.checked); });
      var badge = document.createElement('span');
      badge.className='mf-badge';
      badge.style.cssText = 'margin-left:auto;font-size:11px;color:#a0aec0';
      badge.textContent = '['+cnt+']';
      row.appendChild(cb);
      row.appendChild(document.createTextNode(val));
      row.appendChild(badge);
      list.appendChild(row);
    });
    wrap.appendChild(list);
    return wrap;
  }

  function injectUI(listEl) {
    // [ORIGINAL CSS - see new version for sticky changes]
    var style = document.createElement('style');
    style.textContent =
      '.filter_block{padding:20px 0;border-bottom:1px solid #e8e8e8}' +
      '.filter_block:first-child{border-top:none;padding-top:0}' +
      '#mf-sidebar{width:260px;flex-shrink:0;padding-right:32px}' +  // <-- WITHOUT STICKY
      '#mf-main{flex:1;min-width:0}' +
      '#mf-main .w-dyn-items{display:grid !important;grid-template-columns:repeat(4, 1fr) !important;gap:24px 16px !important;width:100% !important;align-items:stretch !important}' +
      '#mf-main .w-dyn-item{width:100% !important;box-sizing:border-box !important;position:relative !important;aspect-ratio:3/4.2 !important;min-height:380px !important;display:flex !important;flex-direction:column !important;border-radius:12px !important;overflow:hidden !important}' +
      '#mf-main .content_carousel, #mf-main .wrap_text-testimonial-home{position:static !important}' +
      '#mf-main .card_carousel{position:relative !important;width:100% !important;height:100% !important;display:flex !important;flex-direction:column !important;overflow:hidden !important}' +
      '#mf-main .image_cover{width:100% !important;height:100% !important;object-fit:cover !important;object-position:top center !important;display:block !important}' +
      '#mf-main .masked-content_carousel{position:absolute !important;top:0 !important;left:0 !important;right:0 !important;bottom:0 !important;width:100% !important;height:100% !important;z-index:20 !important;background:#f8fafc !important;box-sizing:border-box !important;display:flex !important;flex-direction:column !important;justify-content:space-between !important;padding:24px 20px !important;border-radius:12px !important;opacity:0 !important;visibility:hidden !important;pointer-events:none !important;transition:opacity 0.25s ease, visibility 0.25s ease !important}' +
      '#mf-main .w-dyn-item:hover .masked-content_carousel, #mf-main .card_carousel:hover .masked-content_carousel{opacity:1 !important;visibility:visible !important;pointer-events:auto !important}' +
      '.mf-social-icon{width:36px;height:36px;border-radius:50%;border:1px solid #cbd5e0;display:inline-flex !important;align-items:center;justify-content:center;color:#64748b;transition:all .25s ease;background:transparent;text-decoration:none}' +
      '.mf-social-icon:hover{background:#eb5e10;color:#fce4d6;border-color:#eb5e10}' +
      '.mf-filter-list{display:flex;flex-direction:column;gap:8px;max-height:280px;overflow-y:scroll;scrollbar-width:thin;scrollbar-color:#cbd5e0 #edf2f7;padding-right:6px}' +
      '.mf-filter-list::-webkit-scrollbar{width:6px;display:block}' +
      '.mf-filter-list::-webkit-scrollbar-track{background:#edf2f7;border-radius:4px}' +
      '.mf-filter-list::-webkit-scrollbar-thumb{background:#cbd5e0;border-radius:4px}' +
      '.mf-filter-list::-webkit-scrollbar-thumb:hover{background:#a0aec0}' +
      '@media(max-width:1024px){#mf-main .w-dyn-items{grid-template-columns:repeat(3,1fr)!important}#mf-sidebar{width:200px!important}}' +
      '@media(max-width:767px){#mf-grid{flex-direction:column!important}#mf-sidebar{width:100%!important;padding-right:0!important;padding-bottom:8px!important;border-bottom:2px solid #e8e8e8!important;margin-bottom:20px!important}#mf-main{width:100%!important}#mf-main .w-dyn-items{grid-template-columns:repeat(2,1fr)!important;gap:12px 10px!important}#mf-main .w-dyn-item{aspect-ratio:2/3!important;min-height:220px!important}.mf-filter-list{max-height:160px!important}#mf-main .masked-content_carousel{padding:14px 12px!important}}';
    document.head.appendChild(style);
    // [rest of injectUI unchanged]
  }
```
