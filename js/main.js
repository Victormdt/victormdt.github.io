(function () {
  'use strict';


  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var nav = document.getElementById('siteNav');
  var menu = document.getElementById('navLinks');

  function updateNav() {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  if (menu) {
    menu.addEventListener('show.bs.collapse', function () { nav.classList.add('is-open'); });
    menu.addEventListener('hidden.bs.collapse', function () { nav.classList.remove('is-open'); });


    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (menu.classList.contains('show') && window.bootstrap) {
          window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
      });
    });
  }

  var items = document.querySelectorAll('[data-reveal]');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduceMotion) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  items.forEach(function (el) { observer.observe(el); });
})();
