/*
  PM hero split: fits the hero to the first screen, moves the divider and medal
  with the growing pane, and counts up whole-number stats (e.g. "50+").
*/
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init(hero) {
    if (!hero || hero.dataset.pmReady) return;
    hero.dataset.pmReady = '1';

    /* Fill the first screen: subtract everything above the hero (announcement bar, header). */
    function fit() {
      var top = hero.getBoundingClientRect().top + window.scrollY;
      hero.style.setProperty('--pm-hero-offset', top + 'px');
    }
    fit();
    window.addEventListener('resize', fit);

    /* Divider and medal follow the boundary between the panes. */
    var panes = hero.querySelector('[data-pm-panes]');
    var div = hero.querySelector('[data-pm-divider]');
    var medal = hero.querySelector('[data-pm-medal]');
    if (panes && div && medal) {
      var ps = panes.querySelectorAll('.pm-hero__pane');
      var sync = function () {
        var r = panes.getBoundingClientRect();
        var h = ps[0].getBoundingClientRect();
        var x = ((h.right - r.left) / r.width) * 100 + '%';
        div.style.left = x;
        medal.style.left = x;
      };
      var follow = function () {
        var t = setInterval(sync, 30);
        setTimeout(function () { clearInterval(t); sync(); }, 850);
      };
      ps.forEach(function (p) { p.addEventListener('mouseenter', function () { setTimeout(sync, 20); follow(); }); });
      panes.addEventListener('mouseleave', follow);
    }

    /* Count up values that are a whole number with an optional suffix, e.g. 50+ or 80+. */
    if (reduce) return;
    hero.querySelectorAll('[data-pm-count]').forEach(function (el) {
      var m = el.textContent.trim().match(/^(\d+)(\+?)$/);
      if (!m) return;
      var end = +m[1], suf = m[2], t0 = null;
      el.textContent = '0' + suf;
      setTimeout(function () {
        requestAnimationFrame(function step(t) {
          if (!t0) t0 = t;
          var p = Math.min(1, (t - t0) / 1400), e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * e) + suf;
          if (p < 1) requestAnimationFrame(step);
        });
      }, 1500);
    });
  }

  function initAll(root) { (root || document).querySelectorAll('.pm-hero').forEach(init); }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { initAll(); });
  else initAll();
  document.addEventListener('shopify:section:load', function (e) { initAll(e.target); });
})();
