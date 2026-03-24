const CACHE_NAME = 'E-Kas45-v2'; // Ubah v1 ke v2 dst setiap ada update besar
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/style.css',
  '/login.js',
  '/Image1.png',
  '/banner.jpg'
];

// Instalasi Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Memaksa versi baru langsung menggantikan yang lama
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Aktivasi & Pembersihan Cache Lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    clients.claim().then(() => {
      return caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              console.log('Menghapus cache lama...');
              return caches.delete(cache);
            }
          })
        );
      });
    })
  );
});

// Strategi: Network First (Cek internet dulu, kalau gagal baru ambil cache)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});