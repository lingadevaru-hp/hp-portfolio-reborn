
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
  '/src/index.css',
  '/src/main.tsx'
];

// Install event
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

// Fetch event - Network first, falling back to cache
self.addEventListener('fetch', (event) => {
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
        return caches.match(event.request)
          .then((response) => {
            return response || caches.match('/');
          });
      })
  );
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
