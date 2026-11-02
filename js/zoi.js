// Sorvebom Main Controller (Fluid Video Scrub, Peripheral HUD & Kinetic Parallax Focus)
// Inspirado em drinkzoi.co — O centro é 100% livre para o vídeo, e quanto mais rola, mais o foco nas imagens e animações muda!

const WHATSAPP_NUMBER = '5551999793004';
const WHATSAPP_DEFAULT = 'Olá! Vim pelo site da Sorvebom e quero conhecer os produtos.';

const PRODUCTS = [
  {
    id: 'bombom',
    title: 'Mag Bombom',
    category: 'Linha Mag Trufada',
    desc: 'Chocolate nobre ao leite com avelãs tostadas crocantes e recheio generoso de doce de leite artesanal gaúcho.',
    image: 'assets/images/prod-mag-bombom.jpg'
  },
  {
    id: 'cookies',
    title: 'Mag Cookies Branco',
    category: 'Linha Mag Trufada',
    desc: 'Baunilha Bourbon envolvida em chocolate branco nobre com pedacinhos crocantes de biscoito de cacau.',
    image: 'assets/images/prod-mag-cookies.jpg'
  },
  {
    id: 'morango',
    title: 'Morango Silvestre',
    category: 'Picolé de Fruta',
    desc: 'Feito com a polpa pura dos melhores morangos colhidos no Vale do Taquari. Zero lactose e refrescância extrema.',
    image: 'assets/images/prod-picole-morango.jpg'
  },
  {
    id: 'torta',
    title: 'Torta Alemã & Mu-Mu',
    category: 'Pote Especial 2 Litros',
    desc: 'Creme holandês aveludado, ganache de chocolate, biscoito crocante e fitas fartas de doce de leite Mu-Mu.',
    image: 'assets/images/prod-pote-torta-alema.jpg'
  },
  {
    id: 'casquinha',
    title: 'Casquinha Dupla no Bufê',
    category: 'Bufê de Sorvetes',
    desc: 'Feita na hora com massa crocante açucarada, servida com cascata de chocolate quente nas lojas próprias.',
    image: 'assets/images/hero-sharing-cone.jpg'
  }
];

let currentProductIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  setupPreloaderAndIntro();
  setupFluidVideoScrollScrub();
  setupKineticParallaxGallery();
  setupCustomCursor();
  setupSiteMenu();
  setupProductSlider();
  setupWhatsAppLinks();
  setupSmoothScroll();
  document.getElementById('current-year').textContent = new Date().getFullYear();
});

// ---------------------------------------------------------------------------
// 1. Preloader & Intro Screen Sequence (Gele. Morda. Sinta. Repita!)
// ---------------------------------------------------------------------------
function setupPreloaderAndIntro() {
  const preloader = document.querySelector('.preloader');
  const percentageEl = document.querySelector('.preloader__percentage');
  const introScreen = document.querySelector('.intro-screen');
  const words = document.querySelectorAll('.intro-screen__word');

  if (!preloader || !percentageEl) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      percentageEl.textContent = '100%';

      setTimeout(() => {
        preloader.classList.add('is-done');
        startIntroWords();
      }, 300);
    } else {
      percentageEl.textContent = `${progress}%`;
    }
  }, 35);

  function startIntroWords() {
    if (!introScreen || !words.length) return;

    let step = 0;
    function showNextWord() {
      if (step < words.length) {
        words.forEach(w => w.classList.remove('is-active'));
        words[step].classList.add('is-active');
        step++;
        setTimeout(showNextWord, 550);
      } else {
        setTimeout(() => {
          introScreen.classList.add('is-hidden');
        }, 400);
      }
    }
    showNextWord();
  }
}

// ---------------------------------------------------------------------------
// 2. FLUID CONTINUOUS VIDEO SCROLL-SCRUB & PERIPHERAL HUD
// O centro fica 100% livre para o vídeo, sem caixa de texto e sem porcentagem!
// ---------------------------------------------------------------------------
function setupFluidVideoScrollScrub() {
  const container = document.querySelector('.video-scroll-container');
  const video = document.getElementById('scroll-video');
  
  // HUD Elements (Puro texto flutuante sem caixa e sem porcentagem)
  const stepTag = document.getElementById('hud-step-tag');
  const titleEl = document.getElementById('hud-title');
  const descEl = document.getElementById('hud-desc');
  const actionsEl = document.getElementById('hud-actions');
  const fillEl = document.getElementById('hud-fill');
  const timeEl = document.getElementById('hud-time');

  if (!container || !video) return;

  video.muted = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.preload = 'auto';

  let targetProgress = 0;
  let currentProgress = 0;
  let videoDuration = 7.0;
  let isSeeking = false;
  let hasBurst = false;

  video.addEventListener('loadedmetadata', () => {
    if (video.duration && !isNaN(video.duration)) {
      videoDuration = video.duration;
    }
  });

  function onScroll() {
    const rect = container.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    if (totalScrollable <= 0) return;

    const p = -rect.top / totalScrollable;
    targetProgress = Math.max(0, Math.min(1, p));
  }

  // Definições narrativas das etapas (HUD periférico sutil)
  const PHASES = [
    {
      range: [0, 0.28],
      step: 'Fase 01 / Gelo Puro',
      title: 'Encasulado no Frio',
      desc: 'O sorvete artesanal é protegido pelo gelo cristalino. Role para avançar o tempo e quebrar o gelo.',
      hasActions: false
    },
    {
      range: [0.28, 0.62],
      step: 'Fase 02 / Tensão Térmica',
      title: 'A Casca Começa a Ceder',
      desc: 'A pressão aumenta, trincas de gelo se propagam e o calor do Vale desperta a receita de 1983.',
      hasActions: false
    },
    {
      range: [0.62, 0.86],
      step: 'Fase 03 / O Estouro!',
      title: 'Estourou! Sabor de Verdade',
      desc: 'A casquinha nobre explode em pura cremosidade. 100% trufado, zero gordura hidrogenada.',
      hasActions: false
    },
    {
      range: [0.86, 1.0],
      step: 'Fase 04 / Sabor Revelado',
      title: 'Pura Cremosidade do Sul',
      desc: 'Mais de 150 delícias criadas no Vale do Taquari. Escolha a sua e sinta a diferença.',
      hasActions: true
    }
  ];

  function renderLoop() {
    // Easing suave: absorve vibrações de rolagem
    currentProgress += (targetProgress - currentProgress) * 0.12;

    const targetTime = currentProgress * videoDuration;
    const diff = targetTime - video.currentTime;

    // MOTOR DE FLUIDEZ 60FPS:
    // Reprodução contínua proporcional à velocidade do scroll
    if (diff > 0.05) {
      const speed = Math.min(3.5, Math.max(0.6, diff * 2.2));
      video.playbackRate = speed;
      if (video.paused) {
        const p = video.play();
        if (p) p.catch(() => {});
      }
    } else if (diff < -0.12) {
      if (!video.paused) video.pause();
      if (!isSeeking) {
        isSeeking = true;
        video.currentTime = Math.max(0, video.currentTime + diff * 0.28);
      }
    } else {
      if (!video.paused) video.pause();
    }

    // Telemetria sutil (apenas barra e tempo, sem porcentagem)
    if (fillEl) {
      fillEl.style.width = `${currentProgress * 100}%`;
    }

    if (timeEl) {
      const cur = Math.min(videoDuration, Math.max(0, video.currentTime)).toFixed(1);
      const tot = videoDuration.toFixed(1);
      timeEl.textContent = `${cur}s / ${tot}s`;
    }

    // Atualiza a narrativa do HUD
    const activePhase = PHASES.find(p => currentProgress >= p.range[0] && currentProgress <= p.range[1]) || PHASES[0];
    if (stepTag && stepTag.textContent !== activePhase.step) {
      stepTag.textContent = activePhase.step;
      titleEl.textContent = activePhase.title;
      descEl.textContent = activePhase.desc;
      if (actionsEl) {
        actionsEl.classList.toggle('is-visible', activePhase.hasActions);
      }
    }

    // Estalo sensorial no momento do estouro (~72%)
    if (currentProgress >= 0.68 && currentProgress <= 0.78 && !hasBurst) {
      hasBurst = true;
      triggerBurstCrack();
    } else if (currentProgress < 0.55 || currentProgress > 0.85) {
      hasBurst = false;
    }

    requestAnimationFrame(renderLoop);
  }

  video.addEventListener('seeked', () => {
    isSeeking = false;
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  requestAnimationFrame(renderLoop);
}

// ---------------------------------------------------------------------------
// 3. KINETIC PARALLAX & CAMERA ZOOM GALLERY (QUANTO MAIS ROLA, O FOCO E AS ANIMAÇÕES MUDAM!)
// ---------------------------------------------------------------------------
function setupKineticParallaxGallery() {
  const cards = document.querySelectorAll('.kinetic-card');
  const garnishes = document.querySelectorAll('.floating-garnish');
  const galleryScene = document.querySelector('.kinetic-gallery-scene');
  if (!cards.length) return;

  function updateGalleryFocus() {
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const speed = parseFloat(card.dataset.speed) || 0.2;
      const zoomMax = parseFloat(card.dataset.zoomMax) || 1.18;

      // Distância normalizada do centro da tela (-1.0 a 1.0)
      const distFromCenter = (cardCenter - viewportCenter) / (viewportHeight * 0.6);
      const absDist = Math.abs(distFromCenter);

      // QUANTO MAIS ROLA:
      // 1. Zoom dramático de câmera: a imagem central se expande em escala máxima (dolly zoom)
      const scale = Math.max(0.88, Math.min(zoomMax, zoomMax - absDist * 0.32));

      // 2. Movimentação de cena com perspectiva 3D e rotação angular
      const translateY = distFromCenter * speed * 140;
      const rotateX = distFromCenter * 3.5;
      const rotateY = -distFromCenter * speed * 9;
      const rotateZ = distFromCenter * speed * 5;
      const translateZ = Math.max(0, (1 - absDist) * 70);

      card.style.transform = `perspective(1200px) translate3d(0, ${translateY.toFixed(1)}px, ${translateZ.toFixed(1)}px) scale(${scale.toFixed(3)}) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg)`;

      // 3. Zoom interno no elemento img
      const img = card.querySelector('img');
      if (img) {
        const imgScale = Math.max(1.0, 1.2 - absDist * 0.16);
        img.style.transform = `scale(${imgScale.toFixed(3)})`;
      }

      // 4. Profundidade de campo (Depth of Field): foco no centro, desfoque nas bordas
      if (absDist < 0.36) {
        card.classList.add('is-in-focus');
        card.classList.remove('is-out-focus');
      } else if (absDist > 0.65) {
        card.classList.add('is-out-focus');
        card.classList.remove('is-in-focus');
      } else {
        card.classList.remove('is-in-focus', 'is-out-focus');
      }
    });

    // 5. Parallax 3D com ingredientes flutuantes (inspirado em TŌPAS e HOZON)
    garnishes.forEach((el) => {
      const depth = parseFloat(el.dataset.depth) || 0.5;
      const rot = (window.scrollY * 0.06 * depth) % 360;
      const transY = -window.scrollY * 0.12 * depth;
      el.style.transform = `translate3d(0, ${transY.toFixed(1)}px, 0) rotate(${rot.toFixed(1)}deg)`;
    });

    // 6. Transição de cena atmosférica com base no avanço da rolagem:
    if (galleryScene) {
      const gRect = galleryScene.getBoundingClientRect();
      if (gRect.top < viewportHeight && gRect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, (viewportHeight - gRect.top) / (gRect.height + viewportHeight)));
        if (progress > 0.66) {
          galleryScene.style.backgroundColor = '#160D08'; // Decadent Dark Cocoa
        } else if (progress > 0.33) {
          galleryScene.style.backgroundColor = '#1C0D14'; // Berry Wine
        } else {
          galleryScene.style.backgroundColor = '#101114'; // Glacial Deep Dark
        }
      }
    }
  }

  window.addEventListener('scroll', updateGalleryFocus, { passive: true });
  window.addEventListener('resize', updateGalleryFocus);
  updateGalleryFocus();
}

// Estalo sutil no momento do estouro
function triggerBurstCrack() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const t = ctx.currentTime;

    const bufferSize = ctx.sampleRate * 0.25;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(2200, t);
    filter.Q.setValueAtTime(2.5, t);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(t);
  } catch (e) {
    // áudio opcional
  }
}

// ---------------------------------------------------------------------------
// 4. Custom Cursor System (drinkzoi signature)
// ---------------------------------------------------------------------------
function setupCustomCursor() {
  const cursor = document.querySelector('.c-cursor');
  if (!cursor) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let posX = mouseX;
  let posY = mouseY;

  cursor.classList.add('state-default');

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursor() {
    posX += (mouseX - posX) * 0.22;
    posY += (mouseY - posY) * 0.22;
    cursor.style.transform = `translate(${posX}px, ${posY}px)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Targets
  const sliderTargets = document.querySelectorAll('.slider-stage-container, .slider-nav-btn');
  sliderTargets.forEach((t) => {
    t.addEventListener('mouseenter', () => { cursor.className = 'c-cursor state-drag'; });
    t.addEventListener('mouseleave', () => { cursor.className = 'c-cursor state-default'; });
  });

  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('mouseenter', () => {
      const isOpen = menuToggle.classList.contains('is-open');
      cursor.className = isOpen ? 'c-cursor state-close' : 'c-cursor state-default';
    });
    menuToggle.addEventListener('mouseleave', () => {
      cursor.className = 'c-cursor state-default';
    });
  }
}

// ---------------------------------------------------------------------------
// 5. Fullscreen Site Menu Overlay
// ---------------------------------------------------------------------------
function setupSiteMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.site-menu');
  const menuLinks = document.querySelectorAll('.site-menu__item');

  if (!toggle || !menu) return;

  const setOpen = (open) => {
    toggle.classList.toggle('is-open', open);
    menu.classList.toggle('is-open', open);
    const cursor = document.querySelector('.c-cursor');
    if (cursor) {
      cursor.className = open ? 'c-cursor state-close' : 'c-cursor state-default';
    }
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('is-open');
    setOpen(!isOpen);
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      setOpen(false);

      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      setOpen(false);
    }
  });
}

// ---------------------------------------------------------------------------
// 6. Product Slider in Section 3
// ---------------------------------------------------------------------------
function setupProductSlider() {
  const indexEl = document.querySelector('.model-slider__index');
  const categoryEl = document.querySelector('.slider-product-category');
  const titleEl = document.querySelector('.slider-product-title');
  const descEl = document.querySelector('.slider-product-desc');
  const orderBtn = document.querySelector('.btn-slider-order');
  const sliderImage = document.getElementById('slider-product-img');

  const btnPrev = document.getElementById('slider-prev');
  const btnNext = document.getElementById('slider-next');

  function updateProduct(index) {
    currentProductIndex = (index + PRODUCTS.length) % PRODUCTS.length;
    const prod = PRODUCTS[currentProductIndex];

    const formattedIndex = String(currentProductIndex + 1).padStart(2, '0');
    const formattedTotal = String(PRODUCTS.length).padStart(2, '0');

    if (indexEl) indexEl.innerHTML = `<strong>${formattedIndex}</strong> / ${formattedTotal}`;
    if (categoryEl) categoryEl.textContent = prod.category;
    if (titleEl) titleEl.textContent = prod.title;
    if (descEl) descEl.textContent = prod.desc;

    if (sliderImage) {
      sliderImage.style.opacity = '0';
      sliderImage.style.transform = 'scale(0.95)';
      setTimeout(() => {
        sliderImage.src = prod.image;
        sliderImage.alt = prod.title;
        sliderImage.style.opacity = '1';
        sliderImage.style.transform = 'scale(1)';
      }, 180);
    }

    if (orderBtn) {
      const msg = `Olá! Vi o ${prod.title} (${prod.category}) no site da Sorvebom e quero fazer um pedido!`;
      orderBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    }
  }

  if (btnPrev) btnPrev.addEventListener('click', () => updateProduct(currentProductIndex - 1));
  if (btnNext) btnNext.addEventListener('click', () => updateProduct(currentProductIndex + 1));

  updateProduct(0);
}

// ---------------------------------------------------------------------------
// 7. WhatsApp Links Setup
// ---------------------------------------------------------------------------
function setupWhatsAppLinks() {
  document.querySelectorAll('[data-whatsapp]').forEach((link) => {
    const message = link.dataset.whatsappMessage || WHATSAPP_DEFAULT;
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}

// ---------------------------------------------------------------------------
// 8. Smooth Scroll Anchors
// ---------------------------------------------------------------------------
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      if (!targetId) return;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
