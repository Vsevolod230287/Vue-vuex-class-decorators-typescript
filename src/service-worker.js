// workbox.setConfig({debug: true});

workbox.core.setCacheNameDetails({ prefix: 'demo-cauzioni' })

workbox.core.skipWaiting()

workbox.core.clientsClaim()

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

workbox.precaching.cleanupOutdatedCaches()

workbox.routing.registerRoute(
  new RegExp('^https://(.*).(?:png|jpg|jpeg|svg)', 'i'),
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    cacheableResponse: {
      statuses: [0, 200]
    },
    plugins: [
      new workbox.cacheableResponse.Plugin({ statuses: [0, 200] })
    ]
  })
)
workbox.routing.registerRoute(new RegExp('/.*'), new workbox.strategies.NetworkFirst({ cacheName: 'runtime' }))
