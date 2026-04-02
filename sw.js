const CACHE_NAME = "offline-v1";
const OFFLINE_URL = "index.html" // 离线时显示的页面


self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.add(OFFLINE_URL))
    )
    self.skipWaiting()
})

self.addEventListener("fetch", (event) => {
    if (event.request.mode === "navigate") {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match(OFFLINE_URL)
            })
        );
    }
});