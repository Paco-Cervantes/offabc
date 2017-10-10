const version = 1;
const expectedCaches = ['static-v' + version];

self.addEventListener('install', event => {
    console.log("SW version " + version + " installing...");

    event.waitUntil(
        caches.open('static-v' + version).then(cache => {
            cache.addAll([
                '/css/bundle.css',
                '/css/app.css',
                '/js/bundle.js',
                '/js/app.js'
            ]);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (!expectedCaches.includes(key)) {
                    return caches.delete(key);
                }
            })
        )).then(() => {
            console.log('SW is ready!');
        })
    );
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    if (event.request.method !== 'GET' || url.pathname.includes("/api") || ! url.hostname.includes('dashboard.')) {
        console.log('WORKER: fetch event ignored.', event.request.method, event.request.url);
        return;
    }

    event.respondWith(
        caches.match(event.request).then(function(cached) {
            var networked = fetch(event.request).then(fetchedFromNetwork, unableToResolve).catch(unableToResolve);

            return cached || networked;

            function fetchedFromNetwork(response) {
                var cacheCopy = response.clone();

                caches.open('pages-v' + version).then(function add(cache) {
                    cache.put(event.request, cacheCopy);
                }).then(function() {
                    console.log("WORKER: fetch response stored in cache.", event.request.url);
                });

                return response;
            }

            function unableToResolve() {
                console.log("WORKER: fetch request failed in both cache and network.");

                return new Response("<h1>Your device doesn't support the offline capability.</h1>", {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: new Headers({
                        'content-type': 'text/html'
                    })
                });
            }
        })
    );
});
