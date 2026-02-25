// ============================================================
//  ORUKES CONSULT – shared.js
// ============================================================

// ── Navbar active link highlight ──────────────────────────
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();

// ── Mobile menu toggle ────────────────────────────────────
function toggleMobile() {
  const menu = document.getElementById('mobile-menu');
  const btn  = document.getElementById('hamburger');
  if (!menu) return;
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
}

// ── Accordion ─────────────────────────────────────────────
function toggleAcc(btn) {
  const body   = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');
  btn.closest('.accordion').querySelectorAll('.acc-trigger').forEach(t => {
    t.classList.remove('open');
    t.nextElementSibling.classList.remove('open');
  });
  if (!isOpen) { btn.classList.add('open'); body.classList.add('open'); }
}

// ── Scroll-triggered fade-ups ─────────────────────────────
function initFadeUps() {
  const items = document.querySelectorAll('.fade-up');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  items.forEach(el => obs.observe(el));
}

// ── Back-to-top button ────────────────────────────────────
window.addEventListener('scroll', () => {
  const btn = document.getElementById('back-top');
  if (!btn) return;
  btn.classList.toggle('show', window.scrollY > 400);
});

// ── Cookie banner ─────────────────────────────────────────
function closeCookies() {
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.style.display = 'none';
  try { localStorage.setItem('oc-cookies', '1'); } catch(e) {}
}
document.addEventListener('DOMContentLoaded', () => {
  try {
    if (localStorage.getItem('oc-cookies')) {
      const b = document.getElementById('cookie-banner');
      if (b) b.style.display = 'none';
    }
  } catch(e) {}

  initFadeUps();
});

// ── Stat counter ──────────────────────────────────────────
function animateCounter(el, target, suffix, duration) {
  if (!el) return;
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start) + suffix;
  }, 16);
}

// ── Contact form ──────────────────────────────────────────
function submitForm(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const msg = document.getElementById('form-success');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    if (msg) msg.style.display = 'block';
    btn.textContent = 'Message Sent! ✓';
    btn.style.background = '#25D366';
  }, 1200);
}

// ── Portfolio filter ──────────────────────────────────────
function filterPortfolio(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.portfolio-card').forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
  });
}
