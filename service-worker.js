const CACHE_NAME = 'turbowarp-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html'
];

// Installation
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache öffnet');
        return cache.addAll(urlsToCache).catch(err => {
          console.log('Cache addAll Fehler:', err);
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Aktivierung
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - Network First, fallback to Cache
self.addEventListener('fetch', event => {
  // Externe Anfragen (turbowarp.org) - Network First
  if (event.request.url.includes('turbowarp.org')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }
          
          // Clone die Response
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        })
        .catch(() => {
          return caches.match(event.request)
            .then(response => {
              return response || new Response('Offline - TurboWarp ist nicht verfügbar', {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({
                  'Content-Type': 'text/html'
                })
              });
            });
        })
    );
    return;
  }
  
  // Lokale Anfragen - Cache First
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        
        return fetch(event.request)
          .then(response => {
            // Keine Response oder Fehler
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }
            
            // Clone die Response
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            return caches.match('/offline.html');
          });
      })
  );
});
