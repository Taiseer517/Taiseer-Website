document.addEventListener('DOMContentLoaded', function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');
  function headerToggle() {
    const header = document.querySelector('#header');
    if (header) header.classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', headerToggle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navLink => {
    navLink.addEventListener('click', () => {
      if (document.querySelector('.header-show') && headerToggleBtn) {
        headerToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const parent = this.parentNode;
      const dropdown = parent.nextElementSibling;
      parent.classList.toggle('active');
      if (dropdown) dropdown.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => preloader.remove());
  }

  /**
   * Scroll top button
   */
  const scrollTopBtn = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTopBtn) {
      window.scrollY > 100
        ? scrollTopBtn.classList.add('active')
        : scrollTopBtn.classList.remove('active');
    }
  }
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
  }

  /**
   * AOS init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Typed.js init
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped && typeof Typed !== 'undefined') {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', { strings: typed_strings, loop: true, typeSpeed: 100, backSpeed: 50, backDelay: 2000 });
  }

  /**
   * PureCounter
   */
  if (typeof PureCounter !== 'undefined') new PureCounter();

  /**
   * Skills progress bars (Waypoint)
   */
  document.querySelectorAll('.skills-animation').forEach(item => {
    if (typeof Waypoint !== 'undefined') {
      new Waypoint({ element: item, offset: '80%', handler: function() {
        item.querySelectorAll('.progress .progress-bar').forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }});
    }
  });

  /**
   * Circular progress rings
   */
  document.querySelectorAll('.progress-circle').forEach(circle => {
    const percent = parseInt(circle.getAttribute('data-percentage'), 10);
    const ring = circle.querySelector('.progress-ring-fill');
    if (!ring) return;
    const radius = ring.getAttribute('r');
    const circumference = 2 * Math.PI * radius;
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = circumference;
    setTimeout(() => {
      const offset = circumference - (percent / 100) * circumference;
      ring.style.strokeDashoffset = offset;
    }, 200);
  });

  /**
   * GLightbox init
   */
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox' });
  }

  /**
   * Isotope layout & filters
   */
  document.querySelectorAll('.isotope-layout').forEach(isotopeItem => {
    let container = isotopeItem.querySelector('.isotope-container');
    if (!container) return;
    let layout = isotopeItem.getAttribute('data-layout') || 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') || '*';
    let sort = isotopeItem.getAttribute('data-sort') || 'original-order';
    let iso;
    imagesLoaded(container, () => {
      iso = new Isotope(container, { itemSelector: '.isotope-item', layoutMode: layout, filter: filter, sortBy: sort });
    });
    isotopeItem.querySelectorAll('.isotope-filters .nav-link').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        isotopeItem.querySelector('.isotope-filters .nav-link.active')?.classList.remove('active');
        this.classList.add('active');
        iso?.arrange({ filter: this.getAttribute('data-filter') });
        aosInit();
      });
    });
  });

  /**
   * Swiper init
   */
  function initSwiper() {
    document.querySelectorAll('.init-swiper').forEach(el => {
      const cfgEl = el.querySelector('.swiper-config');
      if (!cfgEl) return;
      let config;
      try { config = JSON.parse(cfgEl.textContent.trim()); } catch { return; }
      if (el.classList.contains('swiper-tab')) {
        initSwiperWithCustomPagination(el, config);
      } else {
        new Swiper(el, config);
      }
    });
  }
  window.addEventListener('load', initSwiper);

  /**
   * Correct hash-scroll on load
   */
  window.addEventListener('load', function() {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          const margin = parseInt(getComputedStyle(section).scrollMarginTop) || 0;
          window.scrollTo({ top: section.offsetTop - margin, behavior: 'smooth' });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  const navLinks = document.querySelectorAll('.navmenu a');
  function navmenuScrollspy() {
    const pos = window.scrollY + 200;
    navLinks.forEach(link => {
      if (!link.hash) return;
      const sec = document.querySelector(link.hash);
      if (!sec) return;
      if (pos >= sec.offsetTop && pos <= sec.offsetTop + sec.offsetHeight) {
        document.querySelectorAll('.navmenu a.active').forEach(el => el.classList.remove('active'));
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Dark/Light Mode Toggle
   */
  const toggleSwitch = document.getElementById('darkmode-toggle');
  if (toggleSwitch) {
    toggleSwitch.addEventListener('change', () => {
      document.body.classList.toggle('manual-dark');
    });
  }
});
