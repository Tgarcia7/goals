<template>
  <div>
    <b-alert v-model="updateExists" variant="success" dismissible fade
      class="mb-2 rounded-0" style="z-index: 1000;" @click="refreshApp">

      <div class="row">
        <div class="col">
          ¡Nueva versión<span class="hide-xxs"> disponible</span>!
          <b-button variant="success" pill size="sm" 
            v-if="updateExists" @click="refreshApp">Actualizar</b-button>
        </div>
      </div>
    
    </b-alert>

    <Swal ref="swal"/>
  </div>
</template>

<script>
  import Swal from '../services/Swal.vue'

  export default {
    name: 'UpdateChecker',
    data: function() {
      return {
        refreshing: false,
        registration: null,
        updateExists: false
      }
    }, 
    components: {
      Swal
    },
    created: function () {
      // Listen for swUpdated event and display refresh banner.
      document.addEventListener('swUpdated', this.showRefreshUI, { once: true })
      
      // Refresh all open app tabs when a new service worker is installed.
      navigator.serviceWorker.addEventListener('controllerchange', async () => {
        if (this.refreshing) return
        this.refreshing = true
        
        await this.$refs.swal.toast('', 'Actualizando...', true, true)
        sessionStorage.setItem('appUpdated', true)
        window.location.reload()
      })
    },
    mounted: function () {
      if (sessionStorage.getItem('appUpdated')) {
        let vm = this
        setTimeout(() => { vm.$refs.swal.toast('success', 'Actualización aplicada') }, 1000)
        sessionStorage.removeItem('appUpdated')
      }
    },
    methods: {
      showRefreshUI: function(e) {
        // Display refresh/reload button due to an app update being available.
        // The new service worker is installed, but not yet active.
        // Store the ServiceWorkerRegistration instance for later use.
        this.registration = e.detail
        this.updateExists = true
      },
      refreshApp: function() {
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
  /* 
    ##Device = Small phones
    ##Screen = 370px to small phones
  */
  @media (max-width: 370px) {
    .hide-xxs {
      display: none;
    }
  }
</style>