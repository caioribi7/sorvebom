const WHATSAPP_NUMBER = '5551999793004';
const WHATSAPP_DEFAULT = 'Oi! Vim pelo site da Sorvebom.';

document.addEventListener('DOMContentLoaded', () => {
  setupNavShadow();
  setupMobileMenu();
  setupFlavorTabs();
  setupWhatsAppLinks();
  document.getElementById('current-year').textContent = new Date().getFullYear();
});

function setupNavShadow() {
  const nav = document.querySelector('.site-nav');
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function setupMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.classList.toggle('open', open);
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
}

function setupFlavorTabs() {
  const tabs = Array.from(document.querySelectorAll('.tab'));
  const flavors = document.querySelectorAll('.flavor');
  if (!tabs.length) return;

  const selectTab = (tab) => {
    const filter = tab.dataset.filter;

    tabs.forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
    flavors.forEach((flavor) => {
      const match = filter === 'todos' || flavor.dataset.category === filter;
      flavor.hidden = !match;
      if (match) {
        flavor.style.animation = 'none';
        flavor.offsetHeight; // trigger reflow to restart animation
        flavor.style.animation = '';
      }
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));

    tab.addEventListener('keydown', (e) => {
      let targetIndex = null;
      if (e.key === 'ArrowRight') targetIndex = (index + 1) % tabs.length;
      if (e.key === 'ArrowLeft') targetIndex = (index - 1 + tabs.length) % tabs.length;
      if (targetIndex !== null) {
        e.preventDefault();
        tabs[targetIndex].focus();
        selectTab(tabs[targetIndex]);
      }
    });
  });
}

function setupWhatsAppLinks() {
  document.querySelectorAll('[data-whatsapp]').forEach((link) => {
    const message = link.dataset.whatsappMessage || WHATSAPP_DEFAULT;
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}
