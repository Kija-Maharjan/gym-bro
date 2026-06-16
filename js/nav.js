// ─── NAV.JS — Shared across all pages ────────────────────────────────────────
// Handles: hamburger menu, custom cursor animation, scroll-reveal

// ── HAMBURGER MENU ──
(function initNav() {
  const hb = document.getElementById('hamburger');
  const nl = document.getElementById('navLinks');
  if (!hb || !nl) return;

  hb.addEventListener('click', () => {
    hb.classList.toggle('open');
    nl.classList.toggle('open');
    document.body.style.overflow = nl.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when any nav link is clicked
  nl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hb.classList.remove('open');
      nl.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// ── CUSTOM CURSOR (desktop only) ──
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  if (!cursor || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  // Cursor scale effect on interactive elements
  document.querySelectorAll('a, button, .day-card, .rc, .task, .phase-header, .day-sel-item, .skill-card, .ss-item, .wu-item, .wu-header').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)';
      ring.style.transform   = 'translate(-50%,-50%) scale(1.5)';
      ring.style.borderColor = 'rgba(209,185,180,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.transform   = 'translate(-50%,-50%) scale(1)';
      ring.style.borderColor = 'rgba(209,185,180,0.5)';
    });
  });
})();

// ── NAV USER STATUS ──
(function initNavUser() {
  const nu = document.getElementById('navUser');
  if (!nu) return;

  function updateNavUser() {
    const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    const online = navigator.onLine;
    const syncLabel = `<span class="nu-sync ${online ? 'online' : 'offline'}">${online ? '● online' : '○ offline'}</span>`;

    if (user) {
      nu.innerHTML = `<span class="nu-avatar">${user.avatar || '👤'}</span>
        <span class="nu-name">${user.username || ''}</span>
        ${syncLabel}`;
    } else {
      nu.innerHTML = `<a href="/profile.html" class="nu-signin">Sign in</a> ${syncLabel}`;
    }
  }

  updateNavUser();
  window.addEventListener('online', updateNavUser);
  window.addEventListener('offline', updateNavUser);
  // Re-check after auth changes (poll-friendly)
  document.addEventListener('visibilitychange', () => { if (!document.hidden) updateNavUser(); });
})();

// ── SCROLL REVEAL ──
(function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity    = '1';
        e.target.style.transform  = 'translateY(0)';
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.rc').forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.6s ${i * 0.1}s ease, transform 0.6s ${i * 0.1}s ease`;
    observer.observe(el);
  });
})();
