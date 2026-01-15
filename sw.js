const CACHE_NAME = 'relogio-falante-v1';

// Lista de arquivos para cachear
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
  // Nota: Se tiver ícones (icon-192.png, etc), eles serão cacheados automaticamente
  // se forem solicitados, mas é bom listar explicitamente se desejar garantir o cache.
];

// Instalação: Cacheia os arquivos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Ativação: Limpa caches antigos se houver atualizações
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch: Serve do cache primeiro, depois da rede
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});