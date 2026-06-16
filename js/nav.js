// ─── NAV.JS — Shared across all pages ────────────────────────────────────────
// Handles: drawer hamburger menu, nav scroll effect, custom cursor, scroll-reveal

// ── DRAWER TOGGLE ──
(function initNav() {
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  if (!burger || !drawer) return;

  burger.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close drawer when any nav/drawer link is clicked
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      drawer.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });
})();

// ── SCROLL: darken nav ──
(function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.background =
      window.scrollY > 10
        ? 'rgba(28,26,25,0.96)'
        : 'rgba(28,26,25,0.82)';
  }, { passive: true });
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

// ── NAV USER STATUS (desktop + drawer) ──
(function initNavUser() {
  const nu = document.getElementById('navUser');
  const du = document.getElementById('drawerUser');

  function updateNavUser() {
    const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    const online = navigator.onLine;
    const syncLabel = `<span class="nu-sync ${online ? 'online' : 'offline'}">${online ? '● online' : '○ offline'}</span>`;

    if (nu) {
      if (user) {
        nu.innerHTML = `<span class="nu-avatar">${user.avatar || '👤'}</span>
          <span class="nu-name">${user.username || ''}</span>
          ${syncLabel}`;
      } else {
        nu.innerHTML = `<a href="/profile.html" class="nu-signin">Sign in</a> ${syncLabel}`;
      }
    }

    if (du) {
      if (user) {
        du.innerHTML = `<div class="du-authed">
          <span class="du-avatar">${user.avatar || '👤'}</span>
          <span class="du-name">${user.username || ''}</span>
        </div>`;
      } else {
        du.innerHTML = `<a href="/profile.html" class="du-signin">Sign in</a>`;
      }
    }
  }

  updateNavUser();
  window.addEventListener('online', updateNavUser);
  window.addEventListener('offline', updateNavUser);
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
