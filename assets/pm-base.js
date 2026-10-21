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
})();
