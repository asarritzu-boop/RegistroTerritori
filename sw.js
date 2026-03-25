const CACHE_NAME = 'registro-territori-v1';
const ASSETS = [
  './',
  './index.html',
  './icona-192.png',
  './icona-512.png',
  // Aggiungi qui eventuali file CSS o JS che usi
];

// Installazione e caching degli asset
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Strategia: Cache First, poi Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
si