/*
  Parkmore header search: the search icon opens a search bar under the header instead of going to the
  search page. Results appear as you type (Shopify predictive search: products, posts, pages);
  Enter or "See all results" opens the full search page. Escape, the close button or a click outside closes it.
*/
(function () {
  var bar = document.querySelector('[data-pm-search]');
  var opener = document.querySelector('[data-pm-search-open]');
  if (!bar || !opener) return;
  var input = bar.querySelector('[data-pm-search-input]');
  var list = bar.querySelector('[data-pm-search-list]');
  var pop = bar.querySelector('[data-pm-search-pop]');
  var currency = bar.getAttribute('data-currency') || '$';
  var searchUrl = bar.getAttribute('data-search-url');
  var suggestUrl = bar.getAttribute('data-suggest-url');
  var timer, controller, active = -1;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function price(p) {
    var n = parseFloat(p);
    if (isNaN(n)) return '';
    return currency + (n % 1 === 0 ? n.toFixed(0) : n.toFixed(2));
  }
  function thumb(src) {
    if (!src) return '<span class="ph" aria-hidden="true"></span>';
    return '<img src="' + esc(src) + (src.indexOf('?') > -1 ? '&' : '?') + 'width=120" alt="" width="52" height="52" loading="lazy">';
  }
  function allUrl(q) { return searchUrl + '?options%5Bprefix%5D=last&q=' + encodeURIComponent(q); }

  function open() {
    bar.hidden = false;
    opener.setAttribute('aria-expanded', 'true');
    document.dispatchEvent(new CustomEvent('pm:search-open'));
    input.focus();
  }
  function close(focusIcon) {
    if (bar.hidden) return;
    bar.hidden = true;
    opener.setAttribute('aria-expanded', 'false');
    input.setAttribute('aria-expanded', 'false');
    if (focusIcon) opener.focus();
  }

  function render(q, data) {
    var r = (data && data.resources && data.resources.results) || {};
    var html = '';
    var products = r.products || [];
    var others = (r.articles || []).concat(r.pages || []);
    if (products.length) {
      html += '<div class="pm-hdr__sgroup"><p>' + esc(bar.getAttribute('data-products-label') || 'Products') + '</p>';
      products.forEach(function (p) {
        var from = p.price_min && p.price_max && p.price_min !== p.price_max;
        html += '<a class="pm-hdr__sitem" role="option" href="' + esc(p.url) + '">' + thumb(p.featured_image && p.featured_image.url || p.image) +
          '<span><b>' + esc(p.title) + '</b><small>' + (from ? 'From ' : '') + esc(price(from ? p.price_min : p.price)) + '</small></span></a>';
      });
      html += '</div>';
    }
    if (others.length) {
      html += '<div class="pm-hdr__sgroup"><p>' + esc(bar.getAttribute('data-pages-label') || 'Journal and pages') + '</p>';
      others.forEach(function (a) {
        html += '<a class="pm-hdr__sitem" role="option" href="' + esc(a.url) + '">' + (a.image ? thumb(a.image) : '') + '<span><b>' + esc(a.title) + '</b></span></a>';
      });
      html += '</div>';
    }
    if (!products.length && !others.length) {
      html = '<p class="pm-hdr__sempty">' + esc(bar.getAttribute('data-empty-label').replace('[terms]', q)) + '</p>';
    } else {
      html += '<a class="pm-hdr__sall" href="' + esc(allUrl(q)) + '">' + esc(bar.getAttribute('data-all-label').replace('[terms]', q)) + ' <span aria-hidden="true">&rarr;</span></a>';
    }
    list.innerHTML = html;
    active = -1;
    input.setAttribute('aria-expanded', 'true');
  }

  function lookup() {
    var q = input.value.trim();
    if (pop) pop.hidden = q.length > 0;
    if (!q) { list.innerHTML = ''; input.setAttribute('aria-expanded', 'false'); return; }
    if (controller) controller.abort();
    controller = window.AbortController ? new AbortController() : null;
    var url = suggestUrl + '.json?q=' + encodeURIComponent(q) +
      '&resources[type]=product,article,page&resources[limit]=6&resources[options][unavailable_products]=last';
    fetch(url, controller ? { signal: controller.signal } : {})
      .then(function (r) { return r.json(); })
      .then(function (data) { if (input.value.trim() === q) render(q, data); })
      .catch(function () {});
  }

  opener.addEventListener('click', function (e) {
    e.preventDefault();
    if (bar.hidden) open(); else close(true);
  });
  bar.querySelector('[data-pm-search-close]').addEventListener('click', function () { close(true); });
  input.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(lookup, 200); });
  input.addEventListener('keydown', function (e) {
    var items = list.querySelectorAll('.pm-hdr__sitem');
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (!items.length) return;
      e.preventDefault();
      active = e.key === 'ArrowDown' ? (active + 1) % items.length : (active - 1 + items.length) % items.length;
      items.forEach(function (it, i) { it.setAttribute('aria-selected', i === active ? 'true' : 'false'); });
      items[active].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' && active > -1 && items[active]) {
      e.preventDefault();
      window.location.href = items[active].href;
    }
  });
  document.addEventListener('pm:search-close', function () { close(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !bar.hidden) close(true); });
  document.addEventListener('click', function (e) {
    if (!bar.hidden && !bar.contains(e.target) && !opener.contains(e.target)) close(false);
  });
})();
