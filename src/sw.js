import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';

// Precache files
precacheAndRoute(self.__WB_MANIFEST);

// Network first strategy for API requests
registerRoute(
    ({ url }) => url.pathname.includes('api'),
    new NetworkFirst()
);

// Cache first strategy for other assets
registerRoute(
    ({ request }) => request.destination === 'image' || request.destination === 'style' || request.destination === 'script',
    new StaleWhileRevalidate()
);

self.addEventListener('push', event => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        // Other notification options
    });
});

