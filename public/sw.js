const CACHE = 'mulify-remote-v1'
const PRECACHE = ['/remote-control', '/remote-control/leads', '/remote-control/content', '/remote-control/settings']

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).catch(() => {}))
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))))
  self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const fetched = fetch(e.request).then((res) => {
        if (res.ok && e.request.url.includes('/remote-control')) {
          caches.open(CACHE).then((c) => c.put(e.request, res.clone()))
        }
        return res
      }).catch(() => cached)
      return cached || fetched
    })
  )
})

self.addEventListener('push', (e) => {
  const data = e.data?.json() ?? { title: 'Mulify Remote', body: 'Yeni bildirim var' }
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: data.tag ?? 'mulify',
      data: data.url ?? '/remote-control',
      vibrate: [200, 100, 200],
    })
  )
})

self.addEventListener('notificationclick', (e) => {
  e.notification.close()
  e.waitUntil(clients.openWindow(e.notification.data ?? '/remote-control'))
})
