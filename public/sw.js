// AruLax Web PWA Service Worker
// Advanced caching strategies for optimal performance and offline capability

const CACHE_NAME = "arulax-web-v1.0.0";
const STATIC_CACHE = "arulax-static-v1";
const DYNAMIC_CACHE = "arulax-dynamic-v1";
const IMAGE_CACHE = "arulax-images-v1";

// Static assets to cache immediately
const STATIC_ASSETS = [
  "/",
  "/static/js/bundle.js",
  "/static/css/main.css",
  "/manifest.json",
  "/arulaxlogo.png",
  "/favicon.ico",
  "/logo192.png",
  "/logo512.png",
  // Bootstrap CSS
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
  // React Icons
  "https://cdn.jsdelivr.net/npm/react-icons@4.11.0/fa/index.esm.js",
  // Framer Motion
  "https://cdn.jsdelivr.net/npm/framer-motion@10.16.4/dist/framer-motion.js",
];

// Network-first resources (always try network first)
const NETWORK_FIRST_PATTERNS = [
  /^https:\/\/images\.unsplash\.com/,
  /^https:\/\/api\./,
  /\/api\//,
];

// Cache-first resources (use cache if available)
const CACHE_FIRST_PATTERNS = [
  /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
  /\.(?:css|js)$/,
  /\.(?:woff|woff2|ttf|eot)$/,
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("[SW] Installing service worker...");

  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then((cache) => {
        console.log("[SW] Caching static assets");
        return cache.addAll(STATIC_ASSETS);
      }),
      // Skip waiting to activate immediately
      self.skipWaiting(),
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating service worker...");

  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (
              cacheName !== STATIC_CACHE &&
              cacheName !== DYNAMIC_CACHE &&
              cacheName !== IMAGE_CACHE
            ) {
              console.log("[SW] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients
      self.clients.claim(),
    ])
  );
});

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith("http")) {
    return;
  }

  // Handle different types of requests
  if (isNetworkFirstRequest(url)) {
    event.respondWith(networkFirstStrategy(request));
  } else if (isCacheFirstRequest(url)) {
    event.respondWith(cacheFirstStrategy(request));
  } else if (isImageRequest(url)) {
    event.respondWith(imageStrategy(request));
  } else {
    event.respondWith(staleWhileRevalidateStrategy(request));
  }
});

// Network-first strategy for dynamic content
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log("[SW] Network failed, trying cache for:", request.url);
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline page for navigation requests
    if (request.mode === "navigate") {
      return caches.match("/");
    }

    throw error;
  }
}

// Cache-first strategy for static assets
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log("[SW] Failed to fetch:", request.url);
    throw error;
  }
}

// Image strategy with size limits
async function imageStrategy(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(IMAGE_CACHE);

      // Limit image cache size
      const cacheKeys = await cache.keys();
      if (cacheKeys.length > 50) {
        await cache.delete(cacheKeys[0]);
      }

      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log("[SW] Failed to fetch image:", request.url);
    throw error;
  }
}

// Stale-while-revalidate strategy for general content
async function staleWhileRevalidateStrategy(request) {
  const cachedResponse = await caches.match(request);

  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        const cache = caches.open(DYNAMIC_CACHE);
        cache.then((c) => c.put(request, networkResponse.clone()));
      }
      return networkResponse;
    })
    .catch(() => {
      // Network failed, return cached version if available
      return cachedResponse;
    });

  return cachedResponse || fetchPromise;
}

// Helper functions to determine request type
function isNetworkFirstRequest(url) {
  return NETWORK_FIRST_PATTERNS.some((pattern) => pattern.test(url.href));
}

function isCacheFirstRequest(url) {
  return CACHE_FIRST_PATTERNS.some((pattern) => pattern.test(url.href));
}

function isImageRequest(url) {
  return (
    /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i.test(url.href) ||
    url.hostname === "images.unsplash.com"
  );
}

// Background sync for form submissions
self.addEventListener("sync", (event) => {
  if (event.tag === "newsletter-sync") {
    event.waitUntil(handleNewsletterSync());
  }
});

async function handleNewsletterSync() {
  // Handle offline newsletter subscriptions
  console.log("[SW] Handling newsletter sync...");
}

// Push notification handling
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: "/logo192.png",
      badge: "/logo192.png",
      vibrate: [100, 50, 100],
      data: data.data,
      actions: [
        {
          action: "explore",
          title: "Explore",
          icon: "/logo192.png",
        },
        {
          action: "close",
          title: "Close",
        },
      ],
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

// Notification click handling
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/#projects"));
  } else if (event.action !== "close") {
    event.waitUntil(clients.openWindow("/"));
  }
});

// Message handling from main thread
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "GET_VERSION") {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Periodic background sync (if supported)
if ("periodicSync" in self.registration) {
  self.addEventListener("periodic同步", (event) => {
    if (event.tag === "content-sync") {
      event.waitUntil(updateContent());
    }
  });
}

async function updateContent() {
  console.log("[SW] Periodic content update...");
  // Update cached content periodically
}

console.log("[SW] Service worker loaded successfully");
