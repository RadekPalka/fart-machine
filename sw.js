const cacheName = 'farts';
const staticAssets = [
  './',
  './index.html',
  './style.css',
  './index.js',
  './main.js',
  './fart noises/fart1.mp3',
  './fart noises/fart2.mp3',
  './fart noises/fart3.mp3',
  './fart noises/fart4.mp3',
  './fart noises/fart5.mp3',
  './fart noises/fart6.mp3',
  './fart noises/fart7.mp3',
  './fart noises/fart8.mp3',
  './fart noises/fart9.mp3',
  ];

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}