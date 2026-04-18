// NAV SCROLL
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// SCROLL REVEAL
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal-up').forEach(el => revObs.observe(el));

// COUNTER ANIMATION
function countUp(el, target, dur = 1200) {
  const start = performance.now();
  (function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
    if (p < 1) requestAnimationFrame(tick); else el.textContent = target;
  })(start);
}
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.hero__meta-n').forEach(el => countUp(el, +el.dataset.target));
      statsObs.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
const metaEl = document.querySelector('.hero__meta');
if (metaEl) statsObs.observe(metaEl);

// BAR CHART
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.rbar').forEach(b => b.classList.add('animated'));
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const barsEl = document.getElementById('reportBars');
if (barsEl) barObs.observe(barsEl);

// ACTIVE NAV
const sections = document.querySelectorAll('section[id], .areas[id], .contact[id]');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  navLinks.querySelectorAll('a[href^="#"]').forEach(a => {
    a.style.color = a.getAttribute('href') === `#${cur}` ? 'var(--gold)' : '';
  });
}, { passive: true });

// FORM
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…'; btn.disabled = true;
  setTimeout(() => {
    document.getElementById('formSuccess').style.display = 'block';
    e.target.reset(); btn.textContent = 'Send Message'; btn.disabled = false;
  }, 900);
}
