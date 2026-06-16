const CACHE_NAME = 'gymbro-v4';

const ASSETS = [
  '/',
  '/index.html',
  '/learning.html',
  '/profile.html',
  '/manifest.json',
  '/css/base.css',
  '/css/index.css',
  '/css/learning.css',
  '/css/profile.css',
  '/js/data.js',
  '/js/storage.js',
  '/js/supabase.js',
  '/js/auth.js',
  '/js/nav.js',
  '/js/index.js',
  '/js/learning.js',
  '/js/profile.js',
  '/js/nepali-date.js',
  '/exercise-animations.js',
  '/exercise-animations.css',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Never cache API or CDN calls
  if (url.pathname.includes('/api/') ||
      url.hostname.includes('supabase.co') ||
      url.hostname.includes('jsdelivr.net')) {
    return;
  }

  // Google Fonts: cache-first (rarely change)
  if (url.hostname.includes('fonts.googleapis.com') ||
      url.hostname.includes('fonts.gstatic.com')) {
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

  // HTML: network-first (always show latest page, fall back to cache)
  if (event.request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(event.request).then(response => {
        const cloned = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
        return response;
      }).catch(() => caches.match(event.request).then(cached => cached || caches.match('/index.html')))
    );
    return;
  }

  // JS/CSS/assets: stale-while-revalidate (instant offline, updates in background)
  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(event.request).then(cached => {
        const fetchPromise = fetch(event.request).then(response => {
          if (response.ok) cache.put(event.request, response.clone());
          return response;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    )
  );
});
