// Navegação suave
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

// Highlight da navegação ativa
function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  const scrollPos = window.scrollY + 100;
  
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

// Animação de entrada nas seções
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-visible');
    }
  });
}, observerOptions);

// Aplica animação aos cards e elementos
document.querySelectorAll('.project-card, .timeline-item, .skill-category, .cert-item').forEach(el => {
  el.classList.add('fade-in-element');
  observer.observe(el);
});

// Efeito parallax sutil no hero (apenas no hero, não afeta outros elementos)
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const hero = document.querySelector('.hero');
  
  if (hero && scrolled < window.innerHeight) {
    // Aplicar o parallax apenas ao conteúdo, não à seção inteira
    const heroContent = hero.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }
});

// Efeito de hover smooth nos cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transition = 'all 0.4s ease';
  });
});

// Adicionar classe de animação aos elementos quando carrega a página
window.addEventListener('load', () => {
  document.querySelectorAll('.project-card, .skill-category').forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
  });
});

// Efeito de mouse tracking no hero para interatividade
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

if (hero && heroContent) {
  document.addEventListener('mousemove', (e) => {
    if (window.scrollY < window.innerHeight) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      heroContent.style.transform = `
        perspective(1000px)
        rotateX(${y * 2}deg)
        rotateY(${-x * 2}deg)
        translateY(${window.scrollY * 0.3}px)
      `;
    }
  });

  document.addEventListener('mouseleave', () => {
    heroContent.style.transform = `
      perspective(1000px)
      rotateX(0)
      rotateY(0)
      translateY(${window.scrollY * 0.3}px)
    `;
  });
}

// Efeito de glow nos social links
document.querySelectorAll('.social-link').forEach(link => {
  link.addEventListener('mouseenter', function() {
    this.style.filter = 'brightness(1.2)';
  });
  
  link.addEventListener('mouseleave', function() {
    this.style.filter = 'brightness(1)';
  });
});
