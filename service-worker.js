// Installing service worker
const CACHE_NAME  = 'PointBank';

/* Add relative URL of all the static content you want to store in
 * cache storage (this will help us use our app offline)*/
let resourcesToCache = [
"./",
"./index.html",
"./auth.html",
"./main.html",
"./offline.html",
"./src/js/index.js",
"./src/js/auth.js",
"./src/js/main.js",
"./src/js/service-worker.js",
"./src/js/offline.js",
"./src/style/index.css",
"./src/style/auth.css",
"./src/style/main.css",
"./src/style/offline.css",
"./assets/images/gamestation_icon_hq.png",
"./assets/images/gamestation_logo_hq.png",
"./assets/images/gamestation_icon_lq.png",
"./assets/images/flame_logo_lq.png",
"./assets/images/flame_logo_hq.png",
"./assets/images/gamestation_logo_colored_lq.png",
"./assets/images/gamestation_logo_colored_hq.png",
"./assets/images/google_logo_hq.png",
"./assets/images/google_logo_black_hq.png",
"./assets/images/pointbank_logo_hq.png",
"./assets/images/pointbank_logo_lq.png",
"./assets/images/pointbank_logo_512.png",
"./assets/images/pointbank_logo_192.png",
"./assets/images/pointbank_icon_hq.png",
"./assets/images/pointbank_icon_lq.png",
"./assets/images/pointbank_icon_inverted_hq.png",
"./assets/images/pointbank_icon_inverted_lq.png",
"./assets/images/pointbank_logo_colored_hq.png",
"./assets/images/pointbank_logo_colored_lq.png",
"./assets/images/offline_icon.png",
"./assets/fonts/material-icons-font.woff2",
"./assets/fonts/roboto-regular.ttf",
"./lib/js/vanim/interpolator.js",
"./lib/js/vanim/valueanimator.js",
"./lib/js/snackbar/snackbar.js",
"https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js",
"https://www.gstatic.com/firebasejs/8.2.7/firebase-auth.js",
"https://www.gstatic.com/firebasejs/8.2.7/firebase-analytics.js",
"https://fonts.googleapis.com/css2?family=Almarai:wght@700&family=Montserrat&display=swap",
"https://fonts.googleapis.com/icon?family=Material+Icons",
];

self.addEventListener("install", e=>{
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache =>{
            return cache.addAll(resourcesToCache);
        })
    );
});

// Cache and return requests
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});

// Update a service worker
const cacheWhitelist = ['PointBank'];
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});