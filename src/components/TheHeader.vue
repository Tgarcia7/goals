<template>
  <nav class="navbar sticky-top navbar-light bg-light">
    <a class="nav navbar-brand navbar-logo mx-auto" href="/">
      <font-awesome-icon icon="bullseye"/> Goals
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
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
    margin-left: 123px !important;
  }
</style>
