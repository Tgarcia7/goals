<template>
  <div id="app" class="d-flex flex-column h-100">
    <TheHeader/>

    <main class="flex-shrink-0" role="main">
      <div class="container">
        <img alt="Vue logo" src="./assets/logo.png">
      </div>
    </main>
    
    <TheFooter/>
  </div>
</template>

<script>
  import TheHeader from './components/TheHeader.vue'
  import TheFooter from './components/TheFooter.vue'

  export default {
    name: 'app',
    components: {
      TheHeader,
      TheFooter
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
</style>
