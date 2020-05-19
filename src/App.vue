<template>
  <div id="app" class="d-flex flex-column">
    <TheHeader/>
    <UpdateChecker/>
    <router-view></router-view>
    <vue-progress-bar class="progress-bar"></vue-progress-bar>
    <TheFooter/>
  </div>
</template>

<script>
  import TheHeader from './components/TheHeader.vue'
  import TheFooter from './components/TheFooter.vue'
  import UpdateChecker from './services/UpdateChecker.vue'

  export default {
    name: 'app',
    components: {
      TheHeader,
      TheFooter,
      UpdateChecker
    },
    mounted () {
      setTimeout(() => {
        this.$Progress.finish() // Only for App.vue
      }, 900)
    },
    created () {
      this.$Progress.start() // Only for App.vue

      // For other components
      this.$router.beforeEach((to, from, next) => {
        this.$Progress.start()

        next()
      })
      
      this.$router.afterEach(() => {
        setTimeout(() => {
          this.$Progress.finish()
        }, 900)
      })

    }
  }
</script>

<style>
  @import './assets/css/main.css';
</style>