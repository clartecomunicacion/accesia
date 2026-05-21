// Interacciones básicas de navegación, progreso, pestañas, animación y accesibilidad.
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
const toTop = document.getElementById('toTop');
const progressBar = document.getElementById('progressBar');

navToggle?.addEventListener('click', () => mainNav.classList.toggle('open'));

document.querySelectorAll('.main-nav a').forEach(a => {
  a.addEventListener('click', () => mainNav.classList.remove('open'));
});

const sections = [...document.querySelectorAll('main section[id]')];
window.addEventListener('scroll', () => {
  const top = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = height > 0 ? `${(top / height) * 100}%` : '0%';
  toTop.style.display = top > 500 ? 'block' : 'none';

  sections.forEach(sec => {
    const link = document.querySelector(`.main-nav a[href="#${sec.id}"]`);
    if (!link) return;
    const inView = top >= sec.offsetTop - 140 && top < sec.offsetTop + sec.offsetHeight - 140;
    link.classList.toggle('active', inView);
  });
});

toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add('visible'));
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

function initTabs(root){
  const articles = [...root.querySelectorAll('.tab-panels > article')];
  const btnWrap = root.querySelector('.tab-buttons');
  articles.forEach((art, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = art.dataset.title || `Tab ${i+1}`;
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    if(i===0) art.classList.add('active');
    btn.addEventListener('click', () => {
      articles.forEach(a => a.classList.remove('active'));
      btnWrap.querySelectorAll('button').forEach(b => b.setAttribute('aria-selected', 'false'));
      art.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    });
    btnWrap.appendChild(btn);
  });
}

document.querySelectorAll('[data-tabs]').forEach(initTabs);
