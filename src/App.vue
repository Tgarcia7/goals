<template>
  <div id="app" class="d-flex flex-column">
    <TheHeader/>
    <Home/>
    <TheFooter/>

    <button v-if="updateExists" @click="refreshApp">
      New version available! Click to update
    </button>
  </div>
</template>

<script>
  import TheHeader from './components/TheHeader.vue'
  import TheFooter from './components/TheFooter.vue'
  import Home from './views/Home'

  export default {
    name: 'app',
    components: {
      TheHeader,
      TheFooter,
      Home
    },
    data: function () {
      return {
        refreshing: false,
        registration: null,
        updateExists: false
      }
    },
    created: function () {
      // Listen for swUpdated event and display refresh snackbar as required.
      document.addEventListener('swUpdated', this.showRefreshUI, { once: true })
      // Refresh all open app tabs when a new service worker is installed.
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (this.refreshing) return
        this.refreshing = true
        window.location.reload()
      })
    },
    methods: {
      showRefreshUI: function (e) {
        // Display a button inviting the user to refresh/reload the app due
        // to an app update being available.
        // The new service worker is installed, but not yet active.
        // Store the ServiceWorkerRegistration instance for later use.
        this.registration = e.detail
        this.updateExists = true
      },
      refreshApp: function () {
        // Handle a user tap on the update app button.
        this.updateExists = false
        // Protect against missing registration.waiting.
        if (!this.registration || !this.registration.waiting) return
        this.registration.waiting.postMessage('skipWaiting')
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  body {
    background-color: #1e242a !important;
  }

  .clickable {
    cursor: pointer;
  }
  
  .task-row-selected {
    background-color: #2a3036;
  }
</style>