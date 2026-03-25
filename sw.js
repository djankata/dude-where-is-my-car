var CACHE_NAME = 'dwimc-v2';
var urlsToCache = [
	'./',
	'./index.html',
	'./manifest.json',
	'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
	'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install', function(e) {
	self.skipWaiting();
	e.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('fetch', function(e) {
	e.respondWith(
		fetch(e.request).catch(function() {
			return caches.match(e.request);
		})
	);
});

self.addEventListener('activate', function(e) {
	e.waitUntil(
		caches.keys().then(function(names) {
			return Promise.all(
				names.filter(function(name) { return name !== CACHE_NAME; })
					.map(function(name) { return caches.delete(name); })
			);
		}).then(function() { return self.clients.claim(); })
	);
});
