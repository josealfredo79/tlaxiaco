var CACHE_NAME = 'tlaxiaco-v1';
var urlsToCache = [
  '/',
  '/index.html',
  '/css/mixteco.css',
  '/js/app.js',
  '/js/progreso.js',
  '/js/idioma.js',
  '/js/modulos/timeline.js',
  '/js/modulos/quiz.js',
  '/js/modulos/civic.js',
  '/js/modulos/scenarios.js',
  '/js/modulos/glyphs.js',
  '/js/modulos/legends.js',
  '/js/modulos/figures.js',
  '/js/modulos/memory.js',
  '/js/modulos/mapa.js',
  '/js/modulos/vocabulario.js',
  '/js/modulos/quizveloz.js',
  '/js/modulos/adivinanzas.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
    return cache.addAll(urlsToCache);
  }));
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    return response || fetch(event.request);
  }));
});

self.addEventListener('activate', function(event) {
  event.waitUntil(caches.keys().then(function(names) {
    return Promise.all(names.filter(function(name) { return name !== CACHE_NAME; }).map(function(name) { return caches.delete(name); }));
  }));
});
