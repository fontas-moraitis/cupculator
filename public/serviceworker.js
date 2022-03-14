// Version 1.0.0

const assets = [
'/',
'/bundle.js',
'main.chunk.js',
'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500&display=swap',
'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap',
'https://fonts.googleapis.com/css2?family=Pacifico&display=swap',
];

self.addEventListener('install', async e => {
  const cache = await caches.open('assets');
  cache.addAll(assets);
});

// Cache first strategy, we need to update version in serviceworker.js to push new changes
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)  // searching in the cache
            .then( response => {
                if (response) {
                    // The request is in the cache 
                    return response; // cache hit
                } else {
                    // We need to go to the network  
                    return fetch(event.request);  // cache miss
                }
            })
    );
});
