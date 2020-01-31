<template>
  <nav class="navbar sticky-top navbar-light bg-dark">
    <a class="nav mr-auto" href="/">
      <img class="vue-logo" alt="Vue logo" src="../assets/logo.png">
    </a>
    <a class="nav navbar-brand navbar-logo mx-auto text-white" href="/">
      <font-awesome-icon icon="bullseye" size="lg"/> Goals
    </a>
    <button class="navbar-toggler text-white" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <font-awesome-icon icon="bars"/>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link text-white" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="#">Link</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'TheHeader'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navbar {
    margin-bottom: 20px;
  }
  .navbar-brand {
    margin-right: 87px !important;
  }
  .vue-logo {
    width: 26px;
  }
</style>
