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
    data() {
      return {
        refreshing: false,
        registration: null,
        updateExists: false,
      }
    },
    created () {
      document.addEventListener(
        'swUpdated', this.showRefreshUI, { once: true }
      )
      
      navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (this.refreshing) return
          this.refreshing = true
          window.location.reload()
        }
      )
    },
    methods: {
      showRefreshUI: function (e) {
        this.registration = e.detail;
        this.updateExists = true;
      },
      refreshApp: function () {
        this.updateExists = false
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
</style>