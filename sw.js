// Spark Repair Estimator — Service Worker v3
// Caches app shell + CDN libraries for full offline use

const CACHE = 'spark-estimator-v3';

const APP_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

const CDN_URLS = [
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
];

self.addEventListener('install', ev => {
  ev.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Cache app shell (required — fails install if any missing)
    await cache.addAll(APP_URLS);
    // Cache CDN libraries (best-effort — don't block install if offline)
    await Promise.allSettled(
      CDN_URLS.map(url =>
        fetch(url, { cache: 'no-cache' })
          .then(r => { if (r.ok) cache.put(url, r); })
          .catch(() => {})
      )
    );
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', ev => {
  ev.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => clients.claim())
  );
});

self.addEventListener('fetch', ev => {
  const { request } = ev;
  if (request.method !== 'GET') return;
  if (!request.url.startsWith('http')) return;

  ev.respondWith(
    caches.open(CACHE).then(async cache => {
      try {
        const res = await fetch(request);
        if (res.ok) cache.put(request, res.clone());
        return res;
      } catch {
        const cached = await cache.match(request);
        if (cached) return cached;
        // Fallback for navigation
        if (request.mode === 'navigate') {
          const index = await cache.match('./index.html');
          if (index) return index;
        }
        return new Response('Offline — content not yet cached.', {
          status: 503, headers: { 'Content-Type': 'text/plain' },
        });
      }
    })
  );
});
