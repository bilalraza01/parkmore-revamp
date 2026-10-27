/*
  Parkmore product page behaviour (product page mockup option A).
  - Options and variant: pills pick the variant; price, stock, button and photo follow it.
  - Purchase cards: one-time or subscribe; the subscribe price, "Save x%" and selling plan come from
    the selected plan's allocation on the current variant.
  - Gallery thumbnails, "Inside the bag" tabs (desktop) and collapsible rows (phones and tablets),
    story "See more", "Pairs well with" (Shopify recommendations), sticky buy bar.
  Add to cart itself is pm-base.js (data-pm-add, data-pm-qty, data-pm-plan on the button).
*/
(function () {
  function fmt(cents) {
    return '$' + (cents % 100 ? (cents / 100).toFixed(2) : String(cents / 100));
  }

  function initTop(root) {
    var dataEl = root.querySelector('[data-pm-product-json]');
    if (!dataEl) return;
    var data = JSON.parse(dataEl.textContent);
    var variants = data.variants;
    var atc = root.querySelector('[data-pm-atc]');
    var atcLabel = root.querySelector('[data-pm-atc-label]');
    var atcPrice = root.querySelector('[data-pm-atc-price]');
    var variantInput = root.querySelector('[data-pm-variant-input]');
    var planInput = root.querySelector('[data-pm-plan-input]');
    var qtyInput = root.querySelector('[data-pm-qty-input]');
    var planSelect = root.querySelector('[data-pm-plan-select]');
    var cards = [].slice.call(root.querySelectorAll('.pmp__plan'));
    var saveEl = root.querySelector('[data-pm-save]');
    var priceOnce = root.querySelector('[data-pm-price-once]');
    var priceSub = root.querySelector('[data-pm-price-sub]');
    var priceCompare = root.querySelector('[data-pm-price-compare]');
    var mainImg = root.querySelector('.pmp__mainimg');
    var thumbs = [].slice.call(root.querySelectorAll('[data-pm-thumbs] button'));
    var sbarLabel = root.querySelector('[data-pm-sbar-label]');
    var sbarPrice = root.querySelector('[data-pm-sbar-price]');

    var selected = variants.find(function (v) { return String(v.id) === variantInput.value; }) || variants[0];
    var options = selected.options.slice();

    function showMedia(src, id) {
      if (!mainImg || !src) return;
      mainImg.style.opacity = 0;
      setTimeout(function () { mainImg.removeAttribute('srcset'); mainImg.src = src; mainImg.style.opacity = 1; }, 180);
      thumbs.forEach(function (t) { t.setAttribute('aria-current', id && String(t.dataset.mediaId) === String(id) ? 'true' : 'false'); });
    }

    function update() {
      var qty = Math.max(1, +qtyInput.value || 1);
      var sub = cards.length > 1 && cards[1].classList.contains('on');
      var planId = sub && planSelect ? planSelect.value : '';
      var unit = selected.price;
      if (sub && planId && selected.plans[planId] != null) unit = selected.plans[planId];

      if (priceOnce) priceOnce.textContent = fmt(selected.price);
      if (priceSub && planSelect) {
        var p = selected.plans[planSelect.value];
        var subPrice = p != null ? p : selected.price;
        priceSub.textContent = fmt(subPrice);
        var pct = selected.price ? Math.round((1 - subPrice / selected.price) * 100) : 0;
        if (priceCompare) priceCompare.textContent = pct > 0 ? fmt(selected.price) : '';
        if (saveEl) { saveEl.hidden = !(pct > 0); saveEl.textContent = (data.saveLabel || '').replace('[percent]', pct); }
      }

      variantInput.value = selected.id;
      planInput.value = planId;
      atc.setAttribute('data-pm-add', selected.id);
      atc.setAttribute('data-pm-qty', qty);
      if (planId) atc.setAttribute('data-pm-plan', planId); else atc.removeAttribute('data-pm-plan');
      atc.disabled = !selected.available;
      var label = selected.available ? data.atc + ' · ' : data.soldout;
      var price = selected.available ? fmt(unit * qty) : '';
      atcLabel.textContent = label; atcPrice.textContent = price;
      if (sbarLabel) { sbarLabel.textContent = label; sbarPrice.textContent = price; }
    }

    /* option pills */
    root.querySelectorAll('[data-pm-option]').forEach(function (fs) {
      var idx = +fs.getAttribute('data-pm-option');
      var pills = [].slice.call(fs.querySelectorAll('.pmp__pill'));
      var out = fs.querySelector('[data-pm-option-value]');
      function mark() {
        pills.forEach(function (b) {
          var test = options.slice(); test[idx] = b.dataset.value;
          var match = variants.find(function (v) { return v.options.every(function (o, i) { return o === test[i]; }); });
          b.classList.toggle('is-unavailable', !match || !match.available);
        });
      }
      pills.forEach(function (b) {
        b.addEventListener('click', function () {
          options[idx] = b.dataset.value;
          pills.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
          if (out) out.textContent = b.dataset.value;
          var match = variants.find(function (v) { return v.options.every(function (o, i) { return o === options[i]; }); });
          if (match) {
            selected = match;
            if (match.media) showMedia(match.media.src, match.media.id);
            if (window.history && history.replaceState) {
              var u = new URL(window.location.href); u.searchParams.set('variant', match.id); history.replaceState({}, '', u.toString());
            }
          }
          root.querySelectorAll('[data-pm-option]').forEach(function (other) { other.dispatchEvent(new Event('pm:mark')); });
          update();
        });
      });
      fs.addEventListener('pm:mark', mark);
      mark();
    });

    /* purchase cards */
    cards.forEach(function (c) {
      c.addEventListener('click', function () {
        cards.forEach(function (x) { x.classList.toggle('on', x === c); var r = x.querySelector('input'); if (r) r.checked = x === c; });
        update();
      });
    });
    if (planSelect) planSelect.addEventListener('change', update);

    /* quantity */
    root.querySelectorAll('[data-pm-step]').forEach(function (b) {
      b.addEventListener('click', function () { qtyInput.value = Math.max(1, (+qtyInput.value || 1) + (+b.dataset.pmStep)); update(); });
    });
    qtyInput.addEventListener('input', update);

    /* gallery */
    thumbs.forEach(function (t) { t.addEventListener('click', function () { showMedia(t.dataset.src, t.dataset.mediaId); }); });

    /* sticky buy bar once the main Add to cart is out of view */
    var bar = root.querySelector('[data-pm-sbar]');
    var barBtn = root.querySelector('[data-pm-sbar-btn]');
    if (bar && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          var show = !e.isIntersecting && e.boundingClientRect.top < 0;
          bar.classList.toggle('show', show);
          bar.setAttribute('aria-hidden', show ? 'false' : 'true');
          if (barBtn) barBtn.tabIndex = show ? 0 : -1;
        });
      }).observe(atc);
    }
    if (barBtn) barBtn.addEventListener('click', function (e) {
      e.preventDefault();
      root.querySelector('.pmp__top').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    update();
  }

  /* Inside the bag: tabs on desktop, collapsible rows on phones and tablets */
  function initInside(sec) {
    var tabs = [].slice.call(sec.querySelectorAll('[data-pm-tab]'));
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        tabs.forEach(function (x) {
          var on = x === t;
          x.setAttribute('aria-selected', on ? 'true' : 'false');
          document.getElementById(x.getAttribute('aria-controls')).classList.toggle('on', on);
        });
      });
    });
    sec.querySelectorAll('[data-pm-acc]').forEach(function (h) {
      h.addEventListener('click', function () {
        var open = h.getAttribute('aria-expanded') !== 'true';
        h.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.getElementById(h.getAttribute('aria-controls')).classList.toggle('open', open);
      });
    });
  }

  /* Story: collapse long text behind "See more" */
  function initStory(wrap) {
    var clip = wrap.querySelector('[data-pm-story-clip]');
    var btn = wrap.querySelector('[data-pm-story-more]');
    var labels = { more: 'See more', less: 'See less' };
    var lj = document.querySelector('[data-pm-story-labels]');
    if (lj) { try { labels = JSON.parse(lj.textContent); } catch (e) {} }
    if (clip.scrollHeight <= 560) return; /* short enough to show in full */
    wrap.classList.add('is-collapsible');
    btn.hidden = false;
    btn.addEventListener('click', function () {
      var open = !wrap.classList.contains('open');
      if (open) {
        clip.style.maxHeight = clip.scrollHeight + 'px'; wrap.classList.add('open');
        setTimeout(function () { clip.style.maxHeight = 'none'; }, 700);
      } else {
        clip.style.maxHeight = clip.scrollHeight + 'px'; void clip.offsetHeight;
        wrap.classList.remove('open'); clip.style.maxHeight = '';
        wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.querySelector('span').textContent = open ? labels.less : labels.more;
    });
  }

  /* Pairs well with: complementary products, then related as a fallback */
  function initRecs(sec) {
    var base = sec.getAttribute('data-url');
    var target = sec.querySelector('[data-pm-recs-target]');
    function load(intent) {
      return fetch(base + '&intent=' + intent).then(function (r) { return r.text(); }).then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var grid = doc.querySelector('[data-pm-recs-grid]');
        return grid && grid.querySelector('.pm-pc') ? grid : null;
      });
    }
    load('complementary').then(function (g) { return g || load('related'); }).then(function (grid) {
      if (!grid) return;
      grid.querySelectorAll('[data-pm-reveal]').forEach(function (el) { el.classList.add('in'); });
      target.appendChild(document.importNode(grid, true));
      sec.hidden = false;
    }).catch(function () {});
  }

  function init(scope) {
    scope = scope || document;
    scope.querySelectorAll('[data-pm-product]').forEach(function (r) { if (!r.dataset.pmReady) { r.dataset.pmReady = '1'; initTop(r); } });
    scope.querySelectorAll('.pmp-inside').forEach(function (s) { if (!s.dataset.pmReady) { s.dataset.pmReady = '1'; initInside(s); } });
    scope.querySelectorAll('[data-pm-story]').forEach(function (w) { if (!w.dataset.pmReady) { w.dataset.pmReady = '1'; initStory(w); } });
    scope.querySelectorAll('[data-pm-recs]').forEach(function (s) { if (!s.dataset.pmReady) { s.dataset.pmReady = '1'; initRecs(s); } });
    /* "See all benefits": open the first panel on phones too */
    scope.querySelectorAll('[data-pm-open-first]').forEach(function (a) {
      a.addEventListener('click', function () {
        var h = document.querySelector('.pmp-acc');
        if (h && h.getAttribute('aria-expanded') !== 'true') h.click();
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); });
  else init();
  document.addEventListener('shopify:section:load', function (e) { init(e.target); });
})();
