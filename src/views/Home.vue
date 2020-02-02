<template>
  <main class="flex-shrink-0" role="main">
    <div class="container">
      <button type="button" class="btn btn-success btn-circle btn-lg btn-add">
        <font-awesome-icon icon="plus"/>
      </button>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'Home'
  }
</script>

<style>
  .btn-circle.btn-lg {
    width: 45px;
    height: 45px;
    padding: 0px 10px;
    border-radius: 35px;
    box-shadow: 0 2px 2px #888888;
  } 

  .btn-add {
    position: absolute;
    bottom: 3.5em;
    right: 1em;
  }
</style>