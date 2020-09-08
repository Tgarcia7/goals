<template>
  <div id="app" class="d-flex flex-column">
    <TheHeader v-if="!this.$route.meta.isPublic"/>
    <UpdateChecker v-if="!this.$route.meta.isPublic"/>
    <router-view></router-view>
    <vue-progress-bar class="progress-bar" v-if="!this.$route.meta.isPublic"></vue-progress-bar>
    <TheFooter v-if="!this.$route.meta.isPublic && !this.$route.meta.hideFooter"/>
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

      console.log(process.env)
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

    },
    methods: {
      logout () {
        this.$router.push({ name: 'login' })
      }
    }
  }
</script>

<style>
  @import './assets/css/main.css';
</style>