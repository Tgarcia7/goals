importScripts("/goals/precache-manifest.14f5a3a67ea0600640d24a38d1e00d2b.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/* eslint-disable no-undef, no-underscore-dangle, no-restricted-globals */

// This is the code piece that GenerateSW mode can't provide for us.
// This code listens for the user's confirmation to update the app.
self.addEventListener('message', (e) => {
  if (!e.data) return
  
  switch (e.data) {
    case 'skipWaiting':
      self.skipWaiting()
      break
    default:
      // NOOP
      break
  }
})
  
workbox.core.clientsClaim() // Vue CLI 4 and Workbox v4, else
// workbox.clientsClaim() // Vue CLI 3 and Workbox v3.
  
// The precaching code provided by Workbox.
self.__precacheManifest = [].concat(self.__precacheManifest || [])
// workbox.precaching.suppressWarnings() // Only used with Vue CLI 3 and Workbox v3.
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
