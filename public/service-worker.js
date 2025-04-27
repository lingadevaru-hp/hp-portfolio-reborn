
const CACHE_NAME = 'hp-portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/apple-touch-icon.png',
  '/icons/favicon.ico',
  '/icons/favicon-16x16.png',
  '/icons/favicon-32x32.png'
];

// Install event - Cache-first for core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - Cache-first for navigation and cached assets, network-first for other requests
self.addEventListener('fetch', (event) => {
  // For navigation requests or cached assets, try cache first
  if (event.request.mode === 'navigate' || 
      urlsToCache.includes(new URL(event.request.url).pathname)) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request)
            .then((fetchResponse) => {
              // Cache the fetched response if it's valid
              if (fetchResponse && fetchResponse.status === 200) {
                const responseToCache = fetchResponse.clone();
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, responseToCache);
                  });
              }
              return fetchResponse;
            });
        })
        .catch(() => {
          // For navigation requests that fail, return the cached homepage
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
          return new Response('Offline content not available');
        })
    );
  } else {
    // For other requests, use network-first strategy
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache a copy of the response
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          // If network fetch fails, try the cache
          return caches.match(event.request);
        })
    );
  }
});

// Handle push notifications
self.addEventListener('push', (event) => {
  const title = 'Lingadevaru HP Portfolio';
  const options = {
    body: event.data ? event.data.text() : 'New updates available!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-96x96.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow('/')
  );
});
