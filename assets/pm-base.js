/*
  Parkmore base script: scroll reveal for [data-pm-reveal] elements.
  Elements fade up when 15% visible. With reduced motion or no IntersectionObserver
  everything is shown immediately. Re-runs when a section is edited in the theme editor.
*/
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var io = null;

  if ('IntersectionObserver' in window && !reduce) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  }

  function init(root) {
    (root || document).querySelectorAll('[data-pm-reveal]:not(.in)').forEach(function (el) {
      if (io) io.observe(el);
      else el.classList.add('in');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); });
  else init();

  document.addEventListener('shopify:section:load', function (e) { init(e.target); });

  /*
    Add to cart for any button with data-pm-add="<variant id>".
    Mirrors Ignite's product-form.js: posts to the cart, asks for the drawer's sections back,
    then lets Ignite's own cart drawer (or notification) render and open. Falls back to /cart.
  */
  var toast, toastTimer;
  function showToast(msg) {
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'pm-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2400);
  }

  function addToCart(btn) {
    var id = btn.getAttribute('data-pm-add');
    if (!id || btn.classList.contains('loading')) return;
    var drawer = document.querySelector('cart-drawer');
    var note = document.querySelector('cart-notification');
    var atc = window.theme && theme.settings && theme.settings.cartDrawer ? theme.settings.cartDrawer.atcAction : 'drawer';
    var sections = [];
    if (drawer && drawer.getSectionsToRender) {
      if (drawer.init) drawer.init();
      sections = sections.concat(drawer.getSectionsToRender().map(function (s) { return s.id; }));
    }
    if (note && note.getSectionsToRender) {
      if (window.loadTemplateContent) window.loadTemplateContent(note);
      if (note.init) note.init();
      sections = sections.concat(note.getSectionsToRender().map(function (s) { return s.id; }));
    }
    var body = { items: [{ id: +id, quantity: 1 }] };
    if (sections.length) {
      body.sections = sections.filter(function (s, i) { return sections.indexOf(s) === i; }).join(',');
      body.sections_url = window.location.pathname;
      if (atc === 'drawer' && drawer && drawer.setActiveElement) drawer.setActiveElement(btn);
      else if (note && note.setActiveElement) note.setActiveElement(btn);
    }
    btn.classList.add('loading');
    var url = (window.routes && routes.cart_add_url ? routes.cart_add_url : '/cart/add') + '.js';
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
      body: JSON.stringify(body)
    })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res.status) { showToast(res.description || 'Sorry, that could not be added.'); return; }
        if (atc === 'page') { window.location = (window.routes && routes.cart_url) || '/cart'; return; }
        /* /cart/add.js with items returns { items, sections }; Ignite expects the first item's id */
        var state = { id: res.items && res.items[0] ? res.items[0].id : +id, sections: res.sections };
        if (typeof publish === 'function' && typeof PUB_SUB_EVENTS !== 'undefined') publish(PUB_SUB_EVENTS.cartUpdate, { source: 'product-form', productVariantId: +id, cartData: res });
        var label = btn.textContent;
        btn.textContent = 'Added';
        btn.classList.add('done');
        setTimeout(function () { btn.textContent = label; btn.classList.remove('done'); }, 1800);
        if (drawer && drawer.renderContents && res.sections) {
          drawer.classList.remove('is-empty');
          drawer.renderContents(state);
        } else if (note && note.renderContents && res.sections) {
          note.classList.remove('is-empty');
          note.renderContents(state);
        } else {
          showToast((btn.getAttribute('data-pm-name') || 'Item') + ' added to cart');
        }
      })
      .catch(function () { showToast('Sorry, something went wrong. Please try again.'); })
      .finally(function () { btn.classList.remove('loading'); });
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-pm-add]');
    if (!btn || btn.disabled) return;
    e.preventDefault();
    addToCart(btn);
  });

  window.PM = window.PM || {};
  window.PM.addToCart = addToCart;
})();
