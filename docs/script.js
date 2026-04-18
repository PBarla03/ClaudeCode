// MAGNETIC BUTTONS
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    btn.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// NAV SCROLL
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50), { passive: true });

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// PARTICLES
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, ptArr = [];
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', resize);
function Pt() {
  this.x = Math.random() * W; this.y = Math.random() * H;
  this.size = Math.random() * 1.2 + 0.3;
  this.vx = (Math.random() - .5) * .25; this.vy = (Math.random() - .5) * .25;
  this.o = Math.random() * .4 + .05;
}
for (let i = 0; i < 70; i++) ptArr.push(new Pt());
(function draw() {
  ctx.clearRect(0, 0, W, H);
  ptArr.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(201,168,76,${p.o})`;
    ctx.fill();
  });
  requestAnimationFrame(draw);
})();

// HERO LOAD ANIMATION
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal-hero').forEach(el => el.classList.add('loaded'));
});

// SCROLL REVEAL
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal-up').forEach(el => revObs.observe(el));

// COUNTER ANIMATION
function countUp(el, target, dur = 1400) {
  const s = performance.now();
  (function tick(now) {
    const p = Math.min((now - s) / dur, 1);
    el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
    if (p < 1) requestAnimationFrame(tick); else el.textContent = target;
  })(s);
}
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.hstat__n').forEach(el => countUp(el, +el.dataset.target));
      statsObs.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
const stats = document.querySelector('.hero__stats');
if (stats) statsObs.observe(stats);

// BAR CHART
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.rbar').forEach(b => b.classList.add('animated'));
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const bars = document.getElementById('reportBars');
if (bars) barObs.observe(bars);

// PARALLAX HERO ORBS
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.querySelectorAll('.hero__orb').forEach((o, i) => {
    o.style.transform = `translateY(${y * ([.12, .08][i] || .1)}px)`;
  });
}, { passive: true });

// ACTIVE NAV
const secs = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
  document.querySelectorAll('.nav__links a[href^="#"]').forEach(a => {
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
