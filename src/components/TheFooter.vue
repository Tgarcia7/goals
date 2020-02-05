<template>
  <footer class="footer mt-auto py-2 bg-dark fixed-bottom">
    <div class="container">
      <div class="row text-white">
        <div class="col">
          <a href="#" class="text-decoration-none text-white">
            <font-awesome-icon icon="clipboard-list" size="lg"/>
            <br>
            <span id="itemActive">In progress</span>
          </a>
        </div>
        <div class="col">
          <a href="#" class="text-decoration-none text-muted">
            <font-awesome-icon icon="clipboard-check" size="lg"/>
            <br>
            <span>Done</span>
          </a>
        </div>
        <div class="col">
          <a href="#" class="text-decoration-none text-muted">
            <font-awesome-icon icon="chart-bar" size="lg"/>
            <br>
            <span>Statistics</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style scoped>
  #itemActive {
    text-shadow: 0 0 3px #e1d7d4;
  }
  
  .fa-clipboard-list {
    filter: drop-shadow(0 0 3px #aaa3a1)
  }

  footer{
    max-height: 56px;
    font-size: 14px;
  }

  .container {
    margin-top: 0.2em;
  }
</style>