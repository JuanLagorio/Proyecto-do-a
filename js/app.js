/* ════════════════════════════════════════════════════════════════
   DOÑA SOL · Tienda
   Catálogo, filtros, carrito y envío del pedido por WhatsApp.
   Los datos y la configuración están en js/productos.js
   ════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const D = window.DONASOL;
  if (!D) return;
  document.documentElement.classList.add('js');

  /* ─── Utilidades ─────────────────────────────────────────────── */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const byId = Object.fromEntries(D.productos.map(p => [p.id, p]));
  const CATS = Object.keys(D.categorias);

  const ICON = id => `<svg class="ico" aria-hidden="true"><use href="#${id}"/></svg>`;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const isNum = v => typeof v === 'number' && isFinite(v);
  const money = n => `${D.moneda} ${Math.round(n).toLocaleString('es-UY')}`;
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
  const waUrl = text => `https://wa.me/${D.whatsapp}` + (text ? `?text=${encodeURIComponent(text)}` : '');
  const tintOf = p => `var(--tint-${p.cat})`;
  const zoomAttr = (p, factor = 1) => p.zoom ? ` style="--z:${(p.zoom * factor).toFixed(2)}"` : '';
  const sizeOk = (id, t) => !!byId[id] && byId[id].tamanos.some(s => s.t === t);
  const priceOf = (id, t) => { const s = byId[id] && byId[id].tamanos.find(x => x.t === t); return s ? s.precio : null; };
  let hasPrices = false;

  const store = {
    get(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch (e) { return fb; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* almacenamiento no disponible */ } }
  };

  D.productos.forEach(p => {
    p._s = norm([p.nombre, p.desc, D.categorias[p.cat], p.tamanos.map(s => s.t).join(' ')].join(' '));
  });

  /* ─── Datos fijos en la página ───────────────────────────────── */
  const GREETING = '¡Hola, Doña Sol! Quería hacer una consulta.';
  $$('[data-wa]').forEach(a => { a.href = waUrl(GREETING); });
  $$('[data-wa-number]').forEach(el => { el.textContent = D.whatsappVisible; });
  $$('[data-count-products]').forEach(el => { el.textContent = D.productos.length; });
  $$('[data-line-count]').forEach(el => {
    const cats = D.lineas[el.dataset.lineCount] || [];
    el.textContent = D.productos.filter(p => cats.includes(p.cat)).length;
  });
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  /* ─── Páginas ────────────────────────────────────────────────────
     Cada sección del menú es una página propia: se muestra una por vez
     según el #ancla de la dirección, y el botón Atrás del navegador
     vuelve a la anterior. */
  const main = $('main');
  const pages = $$('main > [data-page]');
  const pageLinks = $$('.nav__links a, .menu__links a');
  const BASE_TITLE = document.title;
  let page = null;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  function resolve(hash) {
    let el = null;
    try { if (hash && hash.length > 1) el = document.getElementById(decodeURIComponent(hash.slice(1))); } catch (e) { /* ancla inválida */ }
    const host = el && el.closest('main > [data-page]');
    return host ? { name: host.dataset.page, el } : { name: page || 'inicio', el: null };
  }

  function showPage(hash, y) {
    const { name, el } = resolve(hash);
    const first = pages.find(s => s.dataset.page === name);
    const changed = name !== page;
    if (changed) {
      const initial = page === null;
      page = name;
      pages.forEach(s => { s.hidden = s.dataset.page !== name; });
      document.body.dataset.page = name;
      const titled = pages.find(s => s.dataset.page === name && s.dataset.title);
      document.title = titled ? `${titled.dataset.title} · Doña Sol` : BASE_TITLE;
      pageLinks.forEach(a => {
        if (resolve(a.getAttribute('href')).name === name) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      });
      if (!initial && !reduced) {
        main.classList.remove('page-in');
        void main.offsetWidth;
        main.classList.add('page-in');
      }
    }
    const behavior = changed || reduced ? 'auto' : 'smooth';
    if (isNum(y)) window.scrollTo(0, y);
    else if (el && el !== first) el.scrollIntoView({ behavior });
    else window.scrollTo({ top: 0, behavior });
    return changed;
  }

  function navigate(hash) {
    if (hash !== location.hash) {
      history.replaceState({ y: window.scrollY }, '');
      history.pushState(null, '', hash);
    }
    if (!showPage(hash)) return;
    // Lectores de pantalla: llevar el foco al título de la página nueva
    const target = resolve(hash).el || pages.find(s => s.dataset.page === page);
    const title = target && $('h1, h2', target);
    if (title) {
      title.setAttribute('tabindex', '-1');
      title.focus({ preventScroll: true });
    }
  }

  window.addEventListener('hashchange', () => {
    const st = history.state;
    showPage(location.hash, st && isNum(st.y) ? st.y : undefined);
  });

  document.addEventListener('click', e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.target || a.getAttribute('href').length < 2) return;
    e.preventDefault();
    navigate(a.getAttribute('href'));
  });

  $$('[data-top]').forEach(b => b.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  }));

  showPage(location.hash);

  /* ─── Diálogos ───────────────────────────────────────────────── */
  function openDialog(d) {
    if (!d.open) d.showModal();
  }
  function closeDialog(d) {
    return new Promise(resolve => {
      if (!d.open) return resolve();
      if (reduced) { d.close(); return resolve(); }
      if (d.classList.contains('is-closing')) return;
      d.classList.add('is-closing');
      let timer;
      const done = () => {
        clearTimeout(timer);
        d.removeEventListener('animationend', onEnd);
        d.classList.remove('is-closing');
        if (d.open) d.close();
        resolve();
      };
      const onEnd = e => { if (e.target === d) done(); };
      d.addEventListener('animationend', onEnd);
      timer = setTimeout(done, 450);
    });
  }
  $$('dialog').forEach(d => {
    d.addEventListener('cancel', e => { e.preventDefault(); closeDialog(d); });
    d.addEventListener('click', e => {
      if (e.target !== d) return;
      const r = d.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) closeDialog(d);
    });
    d.addEventListener('click', e => {
      const el = e.target.closest('[data-close], .menu__links a');
      if (!el || !d.contains(el)) return;
      const href = el.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        closeDialog(d).then(() => navigate(href));
      } else {
        closeDialog(d);
      }
    });
  });

  /* ─── Navegación ─────────────────────────────────────────────── */
  const nav = $('#nav');
  const menu = $('#menu');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  $('#menuOpen').addEventListener('click', () => openDialog(menu));
  $$('.menu__links a').forEach((a, i) => a.style.setProperty('--i', i));

  /* ─── Carrito: estado ────────────────────────────────────────── */
  const CART_KEY = 'donasol.pedido.v1';
  const CLIENT_KEY = 'donasol.cliente.v1';
  let cart = store.get(CART_KEY, []);
  if (!Array.isArray(cart)) cart = [];
  cart = cart.filter(i => i && sizeOk(i.id, i.t) && i.q > 0);

  const findIdx = (id, t) => cart.findIndex(i => i.id === id && i.t === t);
  const qtyOf = (id, t) => { const i = findIdx(id, t); return i > -1 ? cart[i].q : 0; };
  const inCart = id => cart.some(i => i.id === id);
  const units = (list = cart) => list.reduce((a, i) => a + i.q, 0);
  const total = (list = cart) => list.reduce((a, i) => { const p = priceOf(i.id, i.t); return isNum(p) ? a + p * i.q : a; }, 0);
  const allPriced = (list = cart) => list.length > 0 && list.every(i => isNum(priceOf(i.id, i.t)));
  const somePriced = (list = cart) => list.some(i => isNum(priceOf(i.id, i.t)));

  function setQty(id, t, q) {
    if (!sizeOk(id, t)) return;
    q = Math.max(0, Math.min(999, Math.floor(q) || 0));
    const i = findIdx(id, t);
    if (q === 0) { if (i > -1) cart.splice(i, 1); }
    else if (i > -1) cart[i].q = q;
    else cart.push({ id, t, q });
    sent = false;
    store.set(CART_KEY, cart);
    onCartChange();
  }
  const addOne = (id, t) => setQty(id, t, qtyOf(id, t) + 1);

  const newCode = () => {
    const d = new Date();
    const mmdd = String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
    return `DS-${mmdd}-${Math.floor(100 + Math.random() * 900)}`;
  };
  let orderCode = newCode();
  let sent = false;

  /* ─── Catálogo ───────────────────────────────────────────────── */
  const grid = $('#grid');
  const chips = $('#chips');
  const search = $('#search');
  const resultCount = $('#resultCount');
  const askWa = $('#askWa');
  let active = new Set(CATS);
  let query = '';
  const selSize = {};
  const sizeOf = p => selSize[p.id] && sizeOk(p.id, selSize[p.id]) ? selSize[p.id] : p.tamanos[0].t;
  const isAll = () => active.size === CATS.length;

  const buyHTML = (q, label = 'Agregar') => q > 0
    ? `<div class="stepper">
         <button type="button" data-act="dec" aria-label="Quitar uno">${ICON(q === 1 ? 'i-trash' : 'i-minus')}</button>
         <output aria-live="polite">${q}<small>en tu pedido</small></output>
         <button type="button" data-act="inc" aria-label="Agregar uno más">${ICON('i-plus')}</button>
       </div>`
    : `<button type="button" class="btn-add" data-act="add">${ICON('i-plus')} ${label}</button>`;

  function sizesHTML(p, t) {
    if (p.tamanos.length === 1) {
      return `<div class="sizes"><span class="size size--static">${esc(p.tamanos[0].t)}</span></div>`;
    }
    return `<div class="sizes" role="group" aria-label="Presentación">` +
      p.tamanos.map(s => `<button type="button" class="size" data-act="size" data-size="${esc(s.t)}" aria-pressed="${s.t === t}">${esc(s.t)}</button>`).join('') +
      `</div>`;
  }

  const priceText = (id, t) => { const pr = priceOf(id, t); return isNum(pr) ? money(pr) : 'Consultar'; };

  function cardHTML(p, i) {
    const t = sizeOf(p);
    return `
      <article class="card${inCart(p.id) ? ' in-cart' : ''}" data-id="${p.id}" style="--i:${i % 12};--tint:${tintOf(p)}">
        <button class="card__media${p.cover ? ' card__media--cover' : ''}" type="button" data-act="quick" aria-label="Ver detalles de ${esc(p.nombre)}">
          <span class="card__cat">${esc(D.categorias[p.cat])}</span>
          <span class="card__check" aria-hidden="true">${ICON('i-check')}</span>
          <img src="${p.img}" alt="${esc(p.nombre)}" loading="lazy" decoding="async"${zoomAttr(p)}>
        </button>
        <div class="card__body">
          <h3 class="card__name" data-act="quick">${esc(p.nombre)}</h3>
          <p class="card__desc">${esc(p.desc)}</p>
          ${sizesHTML(p, t)}
          <div class="card__foot">
            ${hasPrices ? `<span class="card__price">${priceText(p.id, t)}</span>` : ''}
            <div class="buy">${buyHTML(qtyOf(p.id, t))}</div>
          </div>
        </div>
      </article>`;
  }

  function updateBuy(container, q, label) {
    const step = $('.stepper', container);
    if (q > 0 && step) {
      $('output', step).innerHTML = `${q}<small>en tu pedido</small>`;
      $('[data-act="dec"] use', step).setAttribute('href', q === 1 ? '#i-trash' : '#i-minus');
    } else {
      container.innerHTML = buyHTML(q, label);
    }
  }

  function updateCard(card) {
    const p = byId[card.dataset.id];
    if (!p) return;
    const t = sizeOf(p);
    $$('.size[data-size]', card).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.size === t)));
    updateBuy($('.buy', card), qtyOf(p.id, t));
    card.classList.toggle('in-cart', inCart(p.id));
    const price = $('.card__price', card);
    if (price) price.textContent = priceText(p.id, t);
  }

  const countCat = c => D.productos.filter(p => p.cat === c).length;

  function renderChips() {
    const all = isAll();
    chips.innerHTML =
      `<button class="chip" type="button" data-cat="all" aria-pressed="${all}">Todos <small>${D.productos.length}</small></button>` +
      CATS.map(c => `<button class="chip" type="button" data-cat="${c}" aria-pressed="${!all && active.has(c)}">${esc(D.categorias[c])} <small>${countCat(c)}</small></button>`).join('');
  }

  function renderGrid() {
    const words = norm(query.trim()).split(/\s+/).filter(Boolean);
    const list = D.productos.filter(p => active.has(p.cat) && words.every(w => p._s.includes(w)));
    grid.innerHTML = list.map(cardHTML).join('');

    const q = query.trim();
    let txt = plural(list.length, 'producto', 'productos');
    if (q) txt += ` para “${q}”`;
    if (!isAll()) txt += ` en ${Array.from(active).map(c => D.categorias[c]).join(', ')}`;
    resultCount.textContent = txt;

    askWa.href = waUrl(q
      ? `¡Hola, Doña Sol! ¿Tienen ${q}?`
      : '¡Hola, Doña Sol! Estoy buscando un producto que no encontré en la web.');
  }

  function setFilter(cats) {
    active = new Set(cats);
    renderChips();
    renderGrid();
  }

  chips.addEventListener('click', e => {
    const b = e.target.closest('[data-cat]');
    if (!b) return;
    const c = b.dataset.cat;
    if (c === 'all' || (!isAll() && active.size === 1 && active.has(c))) setFilter(CATS);
    else setFilter([c]);
    b.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
  });

  let searchTimer;
  search.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      query = search.value;
      if (query.trim() && !isAll()) { active = new Set(CATS); renderChips(); }
      renderGrid();
    }, 120);
  });

  function clearSearch() { query = ''; search.value = ''; }

  $$('[data-line], [data-line-link]').forEach(a => {
    a.addEventListener('click', () => {
      const cats = D.lineas[a.dataset.line || a.dataset.lineLink];
      if (!cats) return;
      clearSearch();
      setFilter(cats);
    });
  });

  grid.addEventListener('click', e => {
    const el = e.target.closest('[data-act]');
    if (!el) return;
    const card = el.closest('.card');
    const p = byId[card.dataset.id];
    const t = sizeOf(p);
    switch (el.dataset.act) {
      case 'quick':
        openQuick(p.id);
        break;
      case 'size':
        selSize[p.id] = el.dataset.size;
        updateCard(card);
        break;
      case 'add':
        addOne(p.id, t);
        flyFrom($('.card__media img', card), p);
        toastAdded(p, t);
        focusIn($('.buy', card), 'inc');
        break;
      case 'inc':
        addOne(p.id, t);
        break;
      case 'dec':
        setQty(p.id, t, qtyOf(p.id, t) - 1);
        if (!qtyOf(p.id, t)) focusIn($('.buy', card), 'add');
        break;
    }
  });

  function focusIn(container, act) {
    const el = container && $(`[data-act="${act}"]`, container);
    if (el) el.focus({ preventScroll: true });
  }

  /* ─── Vista rápida ───────────────────────────────────────────── */
  const quick = $('#quick');
  const quickMedia = $('#quickMedia');
  const quickSizes = $('#quickSizes');
  const quickBuy = $('#quickBuy');
  let quickId = null;

  function openQuick(id) {
    const p = byId[id];
    if (!p) return;
    quickId = id;
    quick.style.setProperty('--tint', tintOf(p));
    quickMedia.className = 'quick__media' + (p.cover ? ' is-cover' : '');
    quickMedia.innerHTML = `<img src="${p.img}" alt="${esc(p.nombre)}"${zoomAttr(p, .95)}>`;
    $('#quickCat').textContent = D.categorias[p.cat];
    $('#quickName').textContent = p.nombre;
    $('#quickDesc').textContent = p.desc;
    $('#quickAsk').href = waUrl(`¡Hola, Doña Sol! Quería consultar por: ${p.nombre}.`);
    renderQuick(true);
    openDialog(quick);
  }

  function renderQuick(full) {
    const p = byId[quickId];
    if (!p) return;
    const t = sizeOf(p);
    if (full) {
      quickSizes.innerHTML = p.tamanos.length === 1
        ? `<span class="size size--static">${esc(t)}</span>`
        : p.tamanos.map(s => `<button type="button" class="size" data-act="size" data-size="${esc(s.t)}" aria-pressed="${s.t === t}">${esc(s.t)}</button>`).join('');
    } else {
      $$('.size[data-size]', quickSizes).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.size === t)));
    }
    const pr = priceOf(p.id, t);
    $('#quickPrice').textContent = hasPrices ? (isNum(pr) ? money(pr) : 'Precio a confirmar') : '';

    let buy = $('.buy', quickBuy);
    if (!buy || full) {
      quickBuy.innerHTML = `<div class="buy"></div><button type="button" class="quick__go" data-act="gocart" hidden></button>`;
      buy = $('.buy', quickBuy);
    }
    updateBuy(buy, qtyOf(p.id, t), 'Agregar a mi pedido');
    const go = $('.quick__go', quickBuy);
    const n = units();
    go.hidden = !inCart(p.id);
    go.innerHTML = `Ver mi pedido (${plural(n, 'unidad', 'unidades')}) ${ICON('i-arrow')}`;
  }

  quick.addEventListener('click', e => {
    const el = e.target.closest('[data-act]');
    if (!el || !quickId) return;
    const p = byId[quickId];
    const t = sizeOf(p);
    switch (el.dataset.act) {
      case 'size':
        selSize[p.id] = el.dataset.size;
        renderQuick(false);
        syncCards();
        break;
      case 'add':
        addOne(p.id, t);
        focusIn(quickBuy, 'inc');
        break;
      case 'inc':
        addOne(p.id, t);
        break;
      case 'dec':
        setQty(p.id, t, qtyOf(p.id, t) - 1);
        if (!qtyOf(p.id, t)) focusIn(quickBuy, 'add');
        break;
      case 'gocart':
        closeDialog(quick).then(openCart);
        break;
    }
  });

  /* ─── Kits ───────────────────────────────────────────────────── */
  const kitsGrid = $('#kitsGrid');
  const kitItems = k => k.items.filter(([id, t]) => sizeOk(id, t));

  kitsGrid.innerHTML = D.kits.map(k => {
    const items = kitItems(k);
    return `
      <article class="kit" data-reveal>
        <div class="kit__head">
          <p class="kit__para">${esc(k.para)}</p>
          <h3 class="kit__name">Kit ${esc(k.nombre)}</h3>
          <p class="kit__desc">${esc(k.desc)}</p>
        </div>
        <div class="kit__thumbs" aria-hidden="true">
          ${items.map(([id]) => { const p = byId[id]; return `<span class="${p.cover ? 'is-cover' : ''}" style="background:${tintOf(p)}"><img src="${p.img}" alt="" loading="lazy"></span>`; }).join('')}
        </div>
        <ul class="kit__list">
          ${items.map(([id, t, q]) => `<li><span>${q > 1 ? q + ' × ' : ''}${esc(byId[id].nombre)}</span><span>${esc(t)}</span></li>`).join('')}
        </ul>
        <div class="kit__foot">
          <button class="btn btn--red" type="button" data-kit="${k.id}">${ICON('i-plus')} <span>Sumar kit a mi pedido</span></button>
        </div>
      </article>`;
  }).join('');

  kitsGrid.addEventListener('click', e => {
    const b = e.target.closest('[data-kit]');
    if (!b) return;
    const k = D.kits.find(x => x.id === b.dataset.kit);
    if (!k) return;
    const items = kitItems(k);
    items.forEach(([id, t, q]) => {
      const i = findIdx(id, t);
      if (i > -1) cart[i].q = Math.min(999, cart[i].q + (q || 1));
      else cart.push({ id, t, q: q || 1 });
    });
    sent = false;
    store.set(CART_KEY, cart);
    onCartChange();
    flyFrom($('.kit__thumbs img', b.closest('.kit')), byId[items[0][0]]);
    toast(`Sumaste el <b>Kit ${esc(k.nombre)}</b>`, byId[items[0][0]]);
    const label = $('span', b);
    b.classList.replace('btn--red', 'btn--ink');
    label.textContent = '¡Sumado a tu pedido!';
    $('use', b).setAttribute('href', '#i-check');
    clearTimeout(b._t);
    b._t = setTimeout(() => {
      b.classList.replace('btn--ink', 'btn--red');
      label.textContent = 'Sumar kit a mi pedido';
      $('use', b).setAttribute('href', '#i-plus');
    }, 2200);
  });

  /* ─── Portada: producto que gira ─────────────────────────────── */
  const heroItems = (D.portada || []).map(id => byId[id]).filter(Boolean);
  const porthole = $('#porthole');
  const heroTag = $('#heroTag');
  const heroDots = $('#heroDots');
  let hi = 0;
  let heroTimer = null;
  let heroPaused = false;
  let heroVisible = true;

  if (heroItems.length) {
    porthole.innerHTML = heroItems.map((p, i) =>
      `<img src="${p.img}" alt="${i === 0 ? esc(p.nombre) : ''}" style="--z:${p.zoom ? (p.zoom * 1.02).toFixed(2) : 1.34}"${i === 0 ? ' class="is-on"' : ' loading="lazy"'}>`
    ).join('');
    heroDots.innerHTML = heroItems.map((p, i) =>
      `<button type="button" aria-label="Ver ${esc(p.nombre)}" aria-current="${i === 0}"></button>`
    ).join('');
    heroFill(heroItems[0]);
  }

  function heroFill(p) {
    $('#heroCat').textContent = D.categorias[p.cat];
    $('#heroName').textContent = p.nombre;
    $('#heroSizes').textContent = p.tamanos.map(s => s.t).join(' · ');
  }

  function heroShow(n) {
    const imgs = $$('img', porthole);
    if (!imgs.length) return;
    const prev = imgs[hi];
    hi = (n + imgs.length) % imgs.length;
    if (imgs[hi] === prev) return;
    imgs.forEach((im, i) => {
      im.classList.toggle('is-on', i === hi);
      im.alt = i === hi ? heroItems[i].nombre : '';
    });
    prev.classList.add('is-off');
    setTimeout(() => prev.classList.remove('is-off'), 800);
    $$('button', heroDots).forEach((b, i) => b.setAttribute('aria-current', String(i === hi)));
    heroFill(heroItems[hi]);
    heroTag.classList.remove('tag__swap');
    void heroTag.offsetWidth;
    heroTag.classList.add('tag__swap');
  }

  function heroPlay() {
    clearInterval(heroTimer);
    if (reduced || heroPaused || !heroVisible || document.hidden || heroItems.length < 2) return;
    heroTimer = setInterval(() => heroShow(hi + 1), 3400);
  }

  const stage = $('#heroStage');
  stage.addEventListener('pointerenter', () => { heroPaused = true; heroPlay(); });
  stage.addEventListener('pointerleave', () => { heroPaused = false; heroPlay(); });
  stage.addEventListener('focusin', () => { heroPaused = true; heroPlay(); });
  stage.addEventListener('focusout', () => { heroPaused = false; heroPlay(); });
  document.addEventListener('visibilitychange', heroPlay);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([en]) => { heroVisible = en.isIntersecting; heroPlay(); }).observe(stage);
  }
  heroDots.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    heroShow($$('button', heroDots).indexOf(b));
    heroPlay();
  });
  $('#heroAdd').addEventListener('click', () => {
    const p = heroItems[hi];
    if (!p) return;
    const t = sizeOf(p);
    addOne(p.id, t);
    flyFrom($('img.is-on', porthole), p);
    toastAdded(p, t);
  });
  heroPlay();

  /* ─── Animación "vuela al carrito" ───────────────────────────── */
  const navCart = $('.cart-btn');
  function flyFrom(imgEl, p) {
    if (reduced || !imgEl || !p || !navCart.animate) return;
    const from = imgEl.getBoundingClientRect();
    const to = navCart.getBoundingClientRect();
    if (!from.width || !to.width) return;
    const size = Math.min(from.width, from.height, 120);
    const fx = from.left + from.width / 2;
    const fy = from.top + from.height / 2;
    const fly = document.createElement('div');
    fly.className = 'flyer';
    fly.innerHTML = `<img src="${p.img}" alt="">`;
    Object.assign(fly.style, { width: size + 'px', height: size + 'px', left: fx - size / 2 + 'px', top: fy - size / 2 + 'px' });
    document.body.appendChild(fly);
    const dx = to.left + to.width / 2 - fx;
    const dy = to.top + to.height / 2 - fy;
    fly.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${dx * .45}px, ${dy * .45 - 90}px) scale(.62)`, opacity: 1, offset: .5 },
      { transform: `translate(${dx}px, ${dy}px) scale(.16)`, opacity: .3 }
    ], { duration: 780, easing: 'cubic-bezier(.45, 0, .55, 1)' }).onfinish = () => fly.remove();
  }

  /* ─── Aviso flotante ─────────────────────────────────────────── */
  const toastEl = $('#toast');
  let toastTimer;
  function toast(html, p) {
    toastEl.innerHTML =
      (p ? `<span class="toast__img${p.cover ? ' is-cover' : ''}"><img src="${p.img}" alt=""></span>` : '') +
      `<span class="toast__txt">${html}</span><button type="button" data-open-cart>Ver pedido</button>`;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 2800);
  }
  const toastAdded = (p, t) => toast(`Agregaste <b>${esc(p.nombre)}</b> · ${esc(t)}`, p);

  /* ─── Carrito: panel ─────────────────────────────────────────── */
  const drawer = $('#drawer');
  const cartList = $('#cartList');
  const form = $('#orderForm');
  const fNombre = $('#fNombre');
  const sendBtn = $('#sendOrder');
  const floatCart = $('.float-cart');
  const floatWa = $('.float-wa');

  function openCart() {
    toastEl.classList.remove('is-on');
    renderCart();
    openDialog(drawer);
  }
  document.addEventListener('click', e => {
    if (e.target.closest('[data-open-cart]')) openCart();
  });

  function renderCart() {
    const n = units();
    $('#drawerSub').textContent = n
      ? `${plural(n, 'unidad', 'unidades')} · ${plural(cart.length, 'producto', 'productos')}`
      : 'Todavía está vacío';

    $('#cartEmpty').hidden = n > 0 || sent;
    $('#cartFull').hidden = n === 0 || sent;
    $('#drawerFoot').hidden = n === 0 || sent;
    $('#cartSent').hidden = !sent;

    cartList.innerHTML = cart.map(i => {
      const p = byId[i.id];
      const pr = priceOf(i.id, i.t);
      return `
        <li data-id="${i.id}" data-t="${esc(i.t)}" style="--tint:${tintOf(p)}">
          <div class="cart-list__img${p.cover ? ' is-cover' : ''}"><img src="${p.img}" alt=""${zoomAttr(p)}></div>
          <div>
            <p class="cart-list__name">${esc(p.nombre)}</p>
            <p class="cart-list__meta">${esc(i.t)}${isNum(pr) ? ` · <b>${money(pr * i.q)}</b>` : ''}</p>
          </div>
          <div class="stepper stepper--sm">
            <button type="button" data-act="dec" aria-label="Quitar uno de ${esc(p.nombre)}">${ICON(i.q === 1 ? 'i-trash' : 'i-minus')}</button>
            <output>${i.q}</output>
            <button type="button" data-act="inc" aria-label="Agregar uno de ${esc(p.nombre)}">${ICON('i-plus')}</button>
          </div>
        </li>`;
    }).join('');

    $('#sumLabel').textContent = plural(n, 'unidad', 'unidades');
    $('#sumTotal').textContent = !somePriced()
      ? 'Precio a confirmar'
      : allPriced() ? money(total()) : `${money(total())} + a confirmar`;
  }

  cartList.addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const li = b.closest('li');
    const { id, t } = li.dataset;
    const act = b.dataset.act;
    setQty(id, t, qtyOf(id, t) + (act === 'inc' ? 1 : -1));
    const again = $$('li', cartList).find(x => x.dataset.id === id && x.dataset.t === t);
    if (again) focusIn(again, act);
    else (cart.length ? $('[data-act]', cartList) : $('[data-close]', drawer)).focus();
  });

  $('#cartClear').addEventListener('click', () => {
    cart = [];
    store.set(CART_KEY, cart);
    onCartChange();
    $('[data-close]', drawer).focus();
  });

  /* Datos del cliente: se recuerdan para el próximo pedido */
  const saved = store.get(CLIENT_KEY, {});
  if (saved && typeof saved === 'object') {
    ['nombre', 'direccion', 'notas'].forEach(k => { if (typeof saved[k] === 'string') form.elements[k].value = saved[k]; });
    const r = $$('input[name="tipo"]', form).find(x => x.value === saved.tipo);
    if (r) r.checked = true;
  }

  function readForm() {
    const get = k => (form.elements[k].value || '').trim();
    const tipo = $('input[name="tipo"]:checked', form);
    return { nombre: get('nombre'), direccion: get('direccion'), notas: get('notas'), tipo: tipo ? tipo.value : 'Hogar' };
  }

  form.addEventListener('input', () => {
    store.set(CLIENT_KEY, readForm());
    if (fNombre.value.trim()) fNombre.closest('.field').classList.remove('is-error');
    renderPhone();
  });
  form.addEventListener('submit', e => { e.preventDefault(); sendBtn.click(); });

  function buildMessage(list, f, code) {
    const L = ['¡Hola, Doña Sol! Quiero hacer este pedido desde la web:', ''];
    L.push(`*Pedido ${code}*`);
    list.forEach(i => {
      const p = byId[i.id];
      const pr = priceOf(i.id, i.t);
      L.push(`• ${i.q} × ${p.nombre} (${i.t})${isNum(pr) ? ` — ${money(pr * i.q)}` : ''}`);
    });
    L.push('');
    L.push(`Total: ${plural(units(list), 'unidad', 'unidades')}`);
    if (somePriced(list)) {
      L.push(`*Total estimado: ${money(total(list))}${allPriced(list) ? '' : ' + productos a confirmar'}*`);
    }
    L.push('', '*Mis datos*');
    L.push(`Nombre: ${f.nombre || '(tu nombre)'}`);
    L.push(`Compro para: ${f.tipo}`);
    if (f.direccion) L.push(`Dirección: ${f.direccion}`);
    if (f.notas) L.push(`Comentarios: ${f.notas}`);
    L.push('', 'Quedo a la espera de la confirmación de precio y disponibilidad. ¡Gracias!');
    return L.join('\n');
  }

  sendBtn.addEventListener('click', e => {
    if (!cart.length) { e.preventDefault(); return; }
    const f = readForm();
    if (!f.nombre) {
      e.preventDefault();
      const field = fNombre.closest('.field');
      field.classList.remove('is-error');
      void field.offsetWidth;
      field.classList.add('is-error');
      fNombre.focus();
      fNombre.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });
      return;
    }
    const url = waUrl(buildMessage(cart, f, orderCode));
    sendBtn.href = url;
    $('#sentAgain').href = url;
    $('#sentCode').textContent = orderCode;
    setTimeout(() => { sent = true; renderCart(); }, 350);
  });

  $('#sentDone').addEventListener('click', () => {
    cart = [];
    store.set(CART_KEY, cart);
    orderCode = newCode();
    sent = false;
    onCartChange();
    closeDialog(drawer).then(() => navigate('#tienda'));
  });
  $('#sentBack').addEventListener('click', () => { sent = false; renderCart(); });

  /* ─── Vista previa en el celular ─────────────────────────────── */
  const phonePreview = $('#phonePreview');
  const SAMPLE = [['multiuso', '5 L', 2], ['lavandina', '10 L', 1], ['rejillas', '6 u.', 1]]
    .filter(([id, t]) => sizeOk(id, t)).map(([id, t, q]) => ({ id, t, q }));
  const TICKS = '<svg viewBox="0 0 16 11"><path d="M1 6l3 3 6-7M6 9l1 1 7-8"/></svg>';

  function renderPhone() {
    const list = cart.length ? cart : SAMPLE;
    const f = cart.length ? readForm() : { nombre: 'María Pérez', tipo: 'Hogar', direccion: 'Pocitos', notas: '' };
    const text = esc(buildMessage(list, f, orderCode)).replace(/\*([^*\n]+)\*/g, '<b>$1</b>');
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    phonePreview.innerHTML = `${text}<span class="bubble__time">${time} ${TICKS}</span>`;
  }

  /* ─── Sincronización general ─────────────────────────────────── */
  const syncCards = () => $$('.card', grid).forEach(updateCard);

  function onCartChange() {
    const n = units();
    $$('[data-cart-count]').forEach(el => {
      if (el.textContent !== String(n)) {
        el.textContent = n;
        el.classList.remove('bump');
        void el.offsetWidth;
        el.classList.add('bump');
      }
    });
    floatCart.hidden = n === 0;
    floatWa.hidden = n > 0;
    $('#floatTxt').textContent = n ? `Ver mi pedido · ${plural(cart.length, 'producto', 'productos')}` : 'Ver mi pedido';
    syncCards();
    if (quick.open) renderQuick(false);
    renderCart();
    renderPhone();
  }

  /* ─── Revelado al hacer scroll ───────────────────────────────── */
  const reveals = $$('[data-reveal]');
  reveals.forEach(el => {
    const sibs = Array.from(el.parentElement.children).filter(x => x.hasAttribute('data-reveal'));
    el.style.transitionDelay = `${Math.min(sibs.indexOf(el), 5) * 70}ms`;
  });
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        io.unobserve(en.target);
        setTimeout(() => { en.target.style.transitionDelay = ''; }, 1200);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-in'));
  }

  /* ─── Pausa de animaciones fuera de pantalla ─────────────────── */
  if ('IntersectionObserver' in window) {
    const pauser = new IntersectionObserver(entries => {
      entries.forEach(en => en.target.classList.toggle('is-paused', !en.isIntersecting));
    }, { rootMargin: '120px 0px' });
    $$('.ticker, main > section, main > .band, .foot').forEach(el => pauser.observe(el));
  }

  /* ─── Precios base ───────────────────────────────────────────────
     Son los del panel de Do-aSol (admin.html → Precios Base). Se
     muestran al instante los últimos conocidos y se actualizan apenas
     responde Firebase. */
  const PRICES_KEY = 'donasol.precios.v1';

  function setPrices(map) {
    if (!map || typeof map !== 'object') return;
    D.productos.forEach(p => p.tamanos.forEach(s => {
      s.precio = isNum(map[s.clave]) ? map[s.clave] : null;
    }));
    hasPrices = D.productos.some(p => p.tamanos.some(s => isNum(s.precio)));
  }

  function fetchPrices() {
    const fb = D.firebase;
    if (!fb || !window.fetch) return;
    const url = `https://firestore.googleapis.com/v1/projects/${fb.proyecto}/databases/(default)/documents/precios/base?key=${fb.apiKey}`;
    fetch(url)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(doc => {
        const map = {};
        Object.entries(doc.fields || {}).forEach(([k, f]) => {
          const v = Number('integerValue' in f ? f.integerValue : f.doubleValue);
          if (isFinite(v)) map[k] = v;
        });
        const had = hasPrices;
        setPrices(map);
        store.set(PRICES_KEY, map);
        if (hasPrices !== had) renderGrid(); else syncCards();
        if (quick.open) renderQuick(false);
        renderCart();
        renderPhone();
      })
      .catch(err => console.warn('Doña Sol · precios:', err.message));
  }

  /* ─── Inicio ─────────────────────────────────────────────────── */
  setPrices(store.get(PRICES_KEY, null));
  renderChips();
  renderGrid();
  onCartChange();
  fetchPrices();
})();
