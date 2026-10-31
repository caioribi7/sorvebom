/**
 * MAIN JAVASCRIPT — SORVEBOM (IMPECCABLE EDITION)
 * Comportamento essencial: navegação móvel, filtro de produtos,
 * rolagem suave e links comerciais de WhatsApp.
 */

const SORVEBOM_CONFIG = {
  whatsappNumber: '5551999793004',
  defaultMessage: 'Olá! Gostaria de falar com o time comercial da Sorvebom.'
};

document.addEventListener('DOMContentLoaded', () => {
  setupNavbarScroll();
  setupMobileNav();
  setupCatalogTabs();
  setupWhatsAppLinks();
  setupSmoothScroll();
  setupCurrentYear();
});

/**
 * Adiciona sombra sutil à barra de navegação ao rolar
 */
function setupNavbarScroll() {
  const navbar = document.querySelector('.site-nav');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * Menu móvel responsivo com acessibilidade
 */
function setupMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('active');
    });
  });
}

/**
 * Filtro por categorias no catálogo de produtos
 */
function setupCatalogTabs() {
  const tabButtons = document.querySelectorAll('.catalog-tab-btn');
  const productCards = document.querySelectorAll('.product-card-open');

  if (!tabButtons.length || !productCards.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCategory = btn.getAttribute('data-filter');

      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      productCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        const isMatch = targetCategory === 'todos' || categories.includes(targetCategory);

        card.style.display = isMatch ? 'flex' : 'none';
      });
    });
  });
}

/**
 * Configuração dos links diretos de WhatsApp
 */
function setupWhatsAppLinks() {
  document.querySelectorAll('[data-whatsapp]').forEach(element => {
    const customMessage = element.getAttribute('data-whatsapp-message') || SORVEBOM_CONFIG.defaultMessage;
    const url = `https://wa.me/${SORVEBOM_CONFIG.whatsappNumber}?text=${encodeURIComponent(customMessage)}`;
    element.setAttribute('href', url);
    element.setAttribute('target', '_blank');
    element.setAttribute('rel', 'noopener noreferrer');
  });
}

/**
 * Rolagem suave com compensação para cabeçalho fixo
 */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = document.querySelector('.site-nav')?.offsetHeight || 72;
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });
}

/**
 * Atualização do ano corrente no rodapé
 */
function setupCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
