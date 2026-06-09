// ─── SW.JS — Service Worker (Offline Support) ────────────────────────────────
// Caches all static assets on first visit.
// App works fully offline after that.

const CACHE_NAME = 'gymbro-v2';

// All files to cache for offline use
const ASSETS = [
  '/',
  '/index.html',
  '/learning.html',
  '/css/base.css',
  '/css/index.css',
  '/css/learning.css',
  '/js/data.js',
  '/js/storage.js',
  '/js/nav.js',
  '/js/index.js',
  '/js/learning.js',
  '/js/nepali-date.js',
  '/js/auth.js',
  '/js/profile.js',
  '/js/supabase.js',
  '/exercise-animations.js',
  '/exercise-animations.css',
  '/profile.html',
  '/css/profile.css',
  '/manifest.json',
];

// ── INSTALL: cache all assets ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: clean up old caches ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: serve from cache, fall back to network ──
self.addEventListener('fetch', event => {
  // Don't cache API calls — those need the network
  if (event.request.url.includes('/api/') ||
      event.request.url.includes('supabase.co')) {
    return; // pass through to network
  }

  // For Google Fonts — cache them too
  if (event.request.url.includes('fonts.googleapis.com') ||
      event.request.url.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(response => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      )
    );
    return;
  }

  // For everything else: cache-first strategy
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok && event.request.method === 'GET') {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, cloned);
          });
        }
        return response;
      }).catch(() => {
        // If both cache and network fail, return offline page for HTML requests
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('/index.html');
        }
      });
    })
  );
});
