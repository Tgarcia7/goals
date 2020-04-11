<template>
  <div id="app" class="d-flex flex-column">
    <TheHeader/>
    <UpdateChecker/>
    <router-view></router-view>
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