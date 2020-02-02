<template>
  <nav class="navbar sticky-top navbar-light bg-dark py-2">
    <div class="container">
      <a class="nav mr-auto text-white" href="/">
        <font-awesome-icon icon="chevron-left" size="lg"/>
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
    min-height: 56px;
  }

  .navbar-brand {
    position: absolute;
    left: 50%;
    top: 7px;
    transform: translateX(-50%);
  }
</style>
