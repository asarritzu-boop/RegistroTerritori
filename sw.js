const CACHE_NAME = 'registro-territori-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icona-192.png',
  './icona-512.png'
];

// Installazione: salvataggio file in cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache aperta, aggiunta file...');
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting()) // Forza l'attivazione immediata
  );
});

// Attivazione: pulizia vecchie cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Eliminazione vecchia cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim()) // Prende il controllo delle schede aperte
  );
});

// Strategia di recupero: Cache First (Funzionamento Offline)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Se trova in cache lo restituisce, altrimenti va in rete
      return response || fetch(event.request);
    })
  );
});
