<template>
  <div>
    <b-alert v-model="updateExists" dismissible variant="success" fade
      class="mb-2 rounded-0" style="z-index: 2000;" @click="refreshApp">

      New version available!
      <b-button variant="success" pill size="sm" v-if="updateExists" @click="refreshApp">Click</b-button> 
      to update
    
    </b-alert>

    <Swal ref="swal"/>
  </div>
</template>

<script>
  import Swal from "../services/Swal"

  export default {
    name: "UpdateChecker",
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
    created: function() {
      // Listen for swUpdated event and display refresh snackbar as required.
      document.addEventListener("swUpdated", this.showRefreshUI, { once: true })
      
      // Refresh all open app tabs when a new service worker is installed.
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (this.refreshing) return
        this.refreshing = true
        sessionStorage.setItem('appUpdated', true)
        window.location.reload()
      })
    },
    mounted: function () {
      if (sessionStorage.getItem('appUpdated')) {
        sessionStorage.removeItem('appUpdated')
        let vm = this

        setTimeout(function () {
          vm.$refs.swal.toast('success', 'App updated succesfully')
        }, 1700)
      }
    },
    methods: {
      showRefreshUI: function(e) {
        // Display a button inviting the user to refresh/reload the app due
        // to an app update being available.
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
        this.registration.waiting.postMessage("skipWaiting")
      }
    }
  }
</script>