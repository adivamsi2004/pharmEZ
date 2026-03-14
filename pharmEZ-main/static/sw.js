const CACHE_NAME = 'pharmez-pwa-cache-v3-bypass';

self.addEventListener('install', event => {
    self.skipWaiting(); // Immediately force update
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
    // By returning early and NOT calling event.respondWith, 
    // the browser handles all requests natively via the network.
    // This completely prevents ERR_FAILED for a Flask app on Vercel.
    return;
});
