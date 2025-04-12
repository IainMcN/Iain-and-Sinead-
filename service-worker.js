const CACHE_NAME = 'wedding-planner-cache-v1';
const urlsToCache = [
  'TEST2.html',
  'style.css',   // If you have a separate CSS file
  'script.js',  // If you have a separate JS file
  'manifest.json',
  'icon-192x192.png',
  'icon-512x512.png'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return the cached response if present, otherwise fetch from the network
        return response || fetch(event.request);
      })
  );
});