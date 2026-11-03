const WHATSAPP_NUMBER = '5551999793004';
const WHATSAPP_DEFAULT = 'Olá! Vi o site da Sorvebom e quero saber onde encontrar os sorvetes perto de mim!';

document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupWhatsAppLinks();
  document.getElementById('ano').textContent = new Date().getFullYear();
});

function setupMobileMenu() {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('menu');

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
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
