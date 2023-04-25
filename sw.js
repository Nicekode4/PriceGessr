// Navnet på din cache
const CACHE_NAME = 'my-pwa-cache-v1';

// De filer du vil cache
const urlsToCache = [
  '/',
  '/index.html',
  '/fallback.html',
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
  if (event.request.url.startsWith('https://fakestoreapi.com/products')) {
    event.respondWith(
      // forespør et svar fra cachen
      caches.match(event.request).then(response => {
        if (response) {
          // Er der noget der er cached vil dette komme tilbage
          return response;
        }
        // Hvis ikke der er noget i cachen, så vil siden fetch APi'et og cache den
        return fetch(event.request).then(response => {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clonedResponse);
          });
          return response;
        }).catch(() => {
          // Hvis det ovenover fejler, så viser den fallback siden
          return caches.match('/fallback.html');
        });
      })
    );
  } else if (event.request.url.match(/\.(jpg|jpeg|png|gif)$/)) {
    event.respondWith(
      // Forspør billeder fra cachen
      caches.match(event.request).then(response => {
        if (response) {
          // Findes det, så ommer til retur
          return response;
        }
        // Ellers fetches bllederne og gemmes i cachen
        return fetch(event.request).then(response => {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clonedResponse);
          });
          return response;
        }).catch(() => {
          // Hvis fetch ikke kan fuldføres, vises fallback billedet
          return caches.match('/fallback-image.jpg');
        });
      })
    );
  } else {
    // For alt andet bruges den standart caching
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(response => {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clonedResponse);
          });
          return response;
        }).catch(() => {
          // Hvis fetch ikke kan fuldføres, vises fallback siden
          return caches.match('/fallback.html');
        });
      })
    );
  }
});
