/* =====================================================================
   Habit Tracker — landing page interactivity (vanilla JS, no libs)
   - sticky nav background on scroll
   - mobile hamburger menu toggle
   - scroll-reveal via IntersectionObserver (staggered)
   ===================================================================== */
(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  // 1. Nav background once the user scrolls past the hero top
  function onScroll() {
    if (window.scrollY > 24) { nav.classList.add('scrolled'); }
    else { nav.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 2. Mobile menu open/close
  if (toggle) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }
  // Close the mobile menu after tapping a link
  if (links) {
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { nav.classList.remove('open'); }
    });
  }

  // 3. Scroll-reveal — fade/slide elements in as they enter the viewport
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          // small stagger for groups revealed together
          var delay = (entry.target.dataset.delay || (i % 6) * 70);
          setTimeout(function () { entry.target.classList.add('in'); }, delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: no IO support -> just show everything
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }
})();
