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
      }, 1000)
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
        }, 1000)
      })

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

  .progress-bar {
    top: 56px !important; /* Header size */
    z-index: 1000 !important;
  }
</style>