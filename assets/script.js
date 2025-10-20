// ============================================
// NAVEGAÇÃO SUAVE COM EFEITOS AVANÇADOS
// ============================================
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ============================================
// HEADER SCROLL EFFECT (ESTILO APPLE)
// ============================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ============================================
// NAVEGAÇÃO ATIVA COM TRANSIÇÕES SUAVES
// ============================================
function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  const scrollPos = window.scrollY + 150;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// ============================================
// SCROLL REVEAL COM EFEITOS CINEMATOGRÁFICOS
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Adiciona delay progressivo para criar efeito cascata
      setTimeout(() => {
        entry.target.classList.add('fade-in-visible');
      }, index * 100);
    }
  });
}, observerOptions);

// Aplica animação aos elementos com delays diferenciados
document.querySelectorAll('.project-card, .timeline-item, .skill-category, .cert-item').forEach((el, index) => {
  el.classList.add('fade-in-element');
  el.style.transitionDelay = `${index * 0.05}s`;
  observer.observe(el);
});

// ============================================
// PARALLAX AVANÇADO NO HERO (ESTILO APPLE)
// ============================================
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      
      if (hero && scrolled < window.innerHeight) {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
          // Parallax suave com aceleração
          const parallaxValue = scrolled * 0.5;
          const opacity = 1 - (scrolled / window.innerHeight) * 0.8;
          const scale = 1 - (scrolled / window.innerHeight) * 0.1;
          
          heroContent.style.transform = `translateY(${parallaxValue}px) scale(${scale})`;
          heroContent.style.opacity = opacity;
        }
      }
      
      ticking = false;
    });
    
    ticking = true;
  }
});

// ============================================
// MOUSE TRACKING 3D NOS CARDS (ESTILO APPLE)
// ============================================
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    this.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-12px)
      scale3d(1.02, 1.02, 1.02)
    `;
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// ============================================
// ANIMAÇÃO DE ENTRADA PROGRESSIVA
// ============================================
window.addEventListener('load', () => {
  document.querySelectorAll('.project-card, .skill-category, .cert-item').forEach((el, index) => {
    el.style.animationDelay = `${index * 0.08}s`;
  });
  
  // Animação especial para o hero
  const heroElements = document.querySelectorAll('.hero h1, .hero h2, .impact, .hero-links');
  heroElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.15}s`;
  });
});

// ============================================
// MOUSE TRACKING 3D NO HERO (ULTRA SUAVE)
// ============================================
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

if (hero && heroContent) {
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  
  document.addEventListener('mousemove', (e) => {
    if (window.scrollY < window.innerHeight) {
      mouseX = (e.clientX / window.innerWidth - 0.5);
      mouseY = (e.clientY / window.innerHeight - 0.5);
    }
  });
  
  // Animação suave usando requestAnimationFrame
  function animate() {
    if (window.scrollY < window.innerHeight) {
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      
      const scrolled = window.pageYOffset;
      const parallaxValue = scrolled * 0.5;
      const opacity = 1 - (scrolled / window.innerHeight) * 0.8;
      const scale = 1 - (scrolled / window.innerHeight) * 0.1;
      
      heroContent.style.transform = `
        perspective(1000px)
        rotateX(${targetY * 3}deg)
        rotateY(${-targetX * 3}deg)
        translateY(${parallaxValue}px)
        scale(${scale})
      `;
      heroContent.style.opacity = opacity;
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// ============================================
// PARTÍCULAS FLUTUANTES NO HERO (OPCIONAL)
// ============================================
function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 1}px;
      height: ${Math.random() * 4 + 1}px;
      background: radial-gradient(circle, rgba(16, 185, 129, 0.8), transparent);
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      pointer-events: none;
      animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
      opacity: ${Math.random() * 0.5 + 0.2};
      filter: blur(1px);
    `;
    hero.appendChild(particle);
  }
}

// Ativar partículas (comente a linha abaixo se não quiser o efeito)
// createParticles();

// ============================================
// EFEITOS AVANÇADOS NOS SOCIAL LINKS
// ============================================
document.querySelectorAll('.social-link').forEach(link => {
  link.addEventListener('mouseenter', function() {
    // Cria efeito ripple
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(16, 185, 129, 0.4), transparent);
      border-radius: 50%;
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// ============================================
// SMOOTH SCROLL PARA SEÇÕES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Adiciona classe para identificar quando a página está carregada
  document.body.classList.add('loaded');
  
  // Performance: reduz motion em dispositivos que preferem
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
      el.style.animation = 'none';
      el.style.transition = 'none';
    });
  }
});
