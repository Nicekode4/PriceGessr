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
	console.log(event.request);
  if (!(event.request.url.indexOf('http') === 0)) {
   event.respondWith(
    caches.match(event.request).then(cacheRes => {
      return cacheRes || fetch(event.request).then(fetchRes => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request.url, fetchRes.clone())
          return fetchRes
        })
      })
    })
   ) 
  }
})
