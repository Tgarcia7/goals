<template>
  <div id="app" class="d-flex flex-column">
    <TheHeader/>
    <Home/>
    <TheFooter/>
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
    background-color: #1e242a;
    min-height: 140%;
  }
</style>