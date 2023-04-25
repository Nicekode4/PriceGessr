// Define a cache name
const CACHE_NAME = 'my-pwa-cache-v1';

// List the files you want to cache
const urlsToCache = [
  '/',
  '/index.html',
  '/main.css',
  '/script.js',
  '/sw.js',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .catch(error => {
            console.error('Failed to cache', error);
          });
      })
  );
  console.log('Service Worker has been installed..')
});
self.addEventListener('activate', event => {
	console.log('serviceworker has been activated...')
	event.waitUntil(
		caches.keys().then(keys => {
			return Promise.all(keys
				.filter(key => key !== CACHE_NAME)
				.map(key => caches.delete(key)))
		})
	)
	return;
})
self.addEventListener('fetch', event => {
  // Check if the request is for your API endpoint or an image
  if (event.request.url.startsWith('https://fakestoreapi.com/products')) {
    event.respondWith(
      // Try to get the response from the cache
      caches.match(event.request).then(response => {
        if (response) {
          // If there's a cached response, return it
          return response;
        }
        // Otherwise, fetch the response from the API and cache it
        return fetch(event.request).then(response => {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clonedResponse);
          });
          return response;
        });
      })
    );
  } else if (event.request.url.match(/\.(jpg|jpeg|png|gif)$/)) {
    event.respondWith(
      // Try to get the image from the cache
      caches.match(event.request).then(response => {
        if (response) {
          // If there's a cached image, return it
          return response;
        }
        // Otherwise, fetch the image and cache it
        return fetch(event.request).then(response => {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clonedResponse);
          });
          return response;
        });
      })
    );
  } else {
    // For all other requests, use the default caching strategy
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});
