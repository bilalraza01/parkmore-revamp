/*
  PM formula finder. Ported from the mockup: pick an animal, pick a need, browse the recommended
  products in an infinite carousel (arrows, dots, swipe, arrow keys). Data is the JSON the section
  renders from the finder_need / finder_item metaobjects. Add to cart uses pm-base.js (data-pm-add).
*/
(function () {
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function init(root) {
    if (!root || root.dataset.pmReady) return;
    root.dataset.pmReady = '1';
    var data;
    try { data = JSON.parse(root.querySelector('[data-pm-finder-data]').textContent); } catch (e) { return; }
    var recLabel = 'Fleur recommends';
    try { recLabel = JSON.parse(root.querySelector('[data-pm-finder-text]').textContent) || recLabel; } catch (e) {}

    var needsEl = root.querySelector('[data-pm-needs]');
    var res = root.querySelector('[data-pm-result]');
    var rec = root.querySelector('[data-pm-rec]');
    var prev = rec.querySelector('.pm-finder__arr--prev');
    var next = rec.querySelector('.pm-finder__arr--next');
    var animals = [].slice.call(root.querySelectorAll('.pm-finder__animal'));
    var animal = null;
    var rs = { i: 0, n: 0, busy: false };

    function slideHTML(p, k, n) {
      var img = p.img
        ? '<img src="' + esc(p.img) + '" alt="' + esc(p.name) + '" loading="lazy" width="150" height="190">'
        : '<div class="pm-img-fallback">[' + esc(p.name) + ']</div>';
      var add = p.variant
        ? '<button class="pm-btn pm-btn-dark pm-add" type="button" data-pm-add="' + esc(p.variant) + '" data-pm-name="' + esc(p.name) + '">Add to cart</button>'
        : '<button class="pm-btn pm-btn-dark pm-add" type="button" disabled>Sold out</button>';
      return '<div class="pm-finder__slide" aria-roledescription="slide" aria-label="' + (k + 1) + ' of ' + n + '">' +
        '<div class="pm-finder__ri">' + img + '</div><div>' +
        '<span class="pm-finder__rk">' + esc(recLabel) + (n > 1 ? ' <span>· ' + (k + 1) + ' of ' + n + '</span>' : '') + '</span>' +
        '<h3>' + esc(p.name) + '</h3>' + (p.why ? '<p>' + esc(p.why) + '</p>' : '') +
        (p.also ? '<p class="pm-finder__also">Pair it with <a href="' + esc(p.also.url) + '">' + esc(p.also.name) + '</a></p>' : '') +
        '<div class="pm-finder__acts"><span class="pm-finder__rp">' + esc(p.price) + '</span>' + add +
        '<a class="pm-btn pm-btn-line" href="' + esc(p.url) + '">Details</a></div></div></div>';
    }

    function place(anim) {
      var t = res.querySelector('.pm-finder__track');
      if (!t) return;
      t.style.transition = anim ? '' : 'none';
      t.style.transform = 'translateX(' + (-100 * (rs.n > 1 ? rs.i + 1 : 0)) + '%)';
      if (!anim) { void t.offsetWidth; t.style.transition = ''; }
      var cur = ((rs.i % rs.n) + rs.n) % rs.n;
      res.querySelectorAll('.pm-finder__dots button').forEach(function (d, k) { d.setAttribute('aria-current', k === cur ? 'true' : 'false'); });
      res.querySelectorAll('.pm-finder__slide').forEach(function (sl, k) {
        var on = k === (rs.n > 1 ? rs.i + 1 : 0);
        sl.setAttribute('aria-hidden', on ? 'false' : 'true');
        sl.querySelectorAll('a,button').forEach(function (x) { x.tabIndex = on ? 0 : -1; });
      });
    }

    function go(i) {
      if (rs.busy || rs.n < 2) return;
      rs.busy = true; rs.i = i; place(true);
      setTimeout(function () {
        rs.busy = false;
        if (rs.i >= rs.n) { rs.i = 0; place(false); } else if (rs.i < 0) { rs.i = rs.n - 1; place(false); }
      }, 520);
    }

    function pickNeed(i) {
      [].forEach.call(needsEl.children, function (b, k) { b.setAttribute('aria-pressed', k === i ? 'true' : 'false'); });
      var ps = data[animal].needs[i].products, n = ps.length;
      rs.i = 0; rs.n = n; rs.busy = false;
      var list = n > 1 ? [ps[n - 1]].concat(ps, [ps[0]]) : ps;
      res.classList.remove('swap'); void res.offsetWidth; res.classList.add('swap');
      res.classList.toggle('single', n < 2);
      res.innerHTML = '<div class="pm-finder__track">' + list.map(function (p, k) {
        var real = n > 1 ? (k - 1 + n) % n : k;
        return slideHTML(p, real, n);
      }).join('') + '</div>' +
        (n > 1 ? '<div class="pm-finder__dots">' + ps.map(function (p, k) {
          return '<button type="button" aria-label="Show product ' + (k + 1) + ' of ' + n + '"></button>';
        }).join('') + '</div>' : '');
      prev.hidden = next.hidden = n < 2;
      res.querySelectorAll('.pm-finder__dots button').forEach(function (d, k) { d.addEventListener('click', function () { go(k); }); });
      res.querySelectorAll('img').forEach(function (img) {
        img.addEventListener('error', function () {
          var d = document.createElement('div'); d.className = 'pm-img-fallback'; d.textContent = img.alt; img.replaceWith(d);
        });
      });
      place(false);
    }

    function pickAnimal(a) {
      if (!data[a] || !data[a].needs.length) return;
      animal = a;
      animals.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.a === a ? 'true' : 'false'); });
      needsEl.innerHTML = '';
      data[a].needs.forEach(function (nd, i) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'pm-finder__need'; b.textContent = nd.label;
        b.setAttribute('aria-pressed', 'false'); b.style.animationDelay = (i * 0.05) + 's';
        b.addEventListener('click', function () { pickNeed(i); });
        needsEl.appendChild(b);
      });
      pickNeed(0);
    }

    prev.addEventListener('click', function () { go(rs.i - 1); });
    next.addEventListener('click', function () { go(rs.i + 1); });
    var sx = null;
    res.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    res.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) go(rs.i + (dx < 0 ? 1 : -1));
      sx = null;
    });
    res.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') go(rs.i + 1);
      else if (e.key === 'ArrowLeft') go(rs.i - 1);
    });
    animals.forEach(function (b) { b.addEventListener('click', function () { pickAnimal(b.dataset.a); }); });

    /* Hero panes and the dogs button carry data-pm-pick="horse|dog" */
    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-pm-pick]');
      if (t) pickAnimal(t.getAttribute('data-pm-pick'));
    });
  }

  function initAll(root) { (root || document).querySelectorAll('[data-pm-finder]').forEach(init); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { initAll(); });
  else initAll();
  document.addEventListener('shopify:section:load', function (e) { initAll(e.target); });
})();
