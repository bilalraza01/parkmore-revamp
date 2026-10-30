/*
  Parkmore inner pages.
  FAQ: one question open at a time, and the search box filters the questions (as Ignite's FAQ search did:
  matching rows stay, the first match opens, headings hide while searching).
  Search page: the filter form applies as soon as a filter or the sort changes.
*/
(function () {
  function each(list, fn) { Array.prototype.forEach.call(list, fn); }

  function initFaq(main) {
    if (main.dataset.pmReady) return;
    main.dataset.pmReady = '1';
    var section = main.closest('.pm-faq');
    var rows = main.querySelectorAll('[data-pm-faq-row]');

    if (main.hasAttribute('data-pm-faq-one')) {
      each(rows, function (row) {
        row.addEventListener('toggle', function () {
          if (!row.open) return;
          each(rows, function (other) { if (other !== row && other.open) other.open = false; });
        });
      });
    }

    var input = section && section.querySelector('[data-pm-faq-search]');
    if (!input) return;
    var empty = main.querySelector('[data-pm-faq-empty]');
    var toc = section.querySelector('.pm-faq__toc');

    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      var shown = 0;
      var first = true;
      each(rows, function (row) {
        var match = !q || row.textContent.toLowerCase().indexOf(q) !== -1;
        row.hidden = !match;
        if (match) shown++;
        if (q) {
          row.open = match && first;
          if (match) first = false;
        }
      });
      each(main.querySelectorAll('[data-pm-faq-group]'), function (group) {
        group.hidden = !!q && !group.querySelector('[data-pm-faq-row]:not([hidden])');
      });
      each(main.querySelectorAll('[data-pm-faq-hide]'), function (el) { el.hidden = !!q; });
      if (toc) toc.hidden = !!q;
      if (empty) empty.hidden = shown > 0;
    });
  }

  function initFilters(form) {
    if (form.dataset.pmReady) return;
    form.dataset.pmReady = '1';
    var timer;
    function apply() {
      // Leave out empty price boxes so the URL stays clean
      each(form.querySelectorAll('input[type="number"]'), function (i) { i.disabled = i.value === ''; });
      form.submit();
    }
    form.addEventListener('change', function (e) {
      clearTimeout(timer);
      if (e.target.type === 'number') {
        timer = setTimeout(apply, 500);
      } else {
        apply();
      }
    });
  }

  function init(root) {
    each(root.querySelectorAll('[data-pm-faq]'), initFaq);
    each(root.querySelectorAll('[data-pm-filters]'), initFilters);
  }

  init(document);
  document.addEventListener('shopify:section:load', function (e) { init(e.target); });
})();
