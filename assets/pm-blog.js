/*
  PM blog "Show more": fetches the next page of posts and appends its cards to the grid,
  then points the button at the following page (or removes it on the last page).
*/
(function () {
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-pm-blog-more]');
    if (!btn || btn.classList.contains('loading')) return;
    var grid = document.querySelector('.pm-blog__grid');
    if (!grid || !window.fetch || !window.DOMParser) return; /* plain link fallback */
    e.preventDefault();

    var label = btn.textContent;
    btn.classList.add('loading');
    btn.setAttribute('aria-busy', 'true');
    btn.textContent = btn.getAttribute('data-loading-text') || label;

    fetch(btn.href, { credentials: 'same-origin' })
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var posts = doc.querySelectorAll('.pm-blog__grid .pm-blog__post');
        var first = null;
        posts.forEach(function (p) {
          p.classList.add('in'); /* skip the scroll reveal for appended cards */
          var node = document.importNode(p, true);
          grid.appendChild(node);
          if (!first) first = node;
        });
        var next = doc.querySelector('[data-pm-blog-more]');
        if (next) {
          btn.href = next.getAttribute('href');
          btn.textContent = label;
        } else {
          btn.closest('.pm-blog__more').remove();
        }
        /* Move keyboard focus to the first new post so keyboard users continue from there */
        if (first) first.focus({ preventScroll: true });
      })
      .catch(function () { window.location = btn.href; })
      .finally(function () {
        btn.classList.remove('loading');
        btn.removeAttribute('aria-busy');
      });
  });
})();
