const CACHE_NAME = 'pharmez-pwa-cache-v4-pwa-compat';

self.addEventListener('install', event => {
    self.skipWaiting(); 
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    // To ensure the PWA install prompt triggers in all browsers, 
    // we MUST respond to fetch events with event.respondWith().
    // We pass the request directly to the network to avoid cache errors.
    event.respondWith(fetch(event.request));
});
