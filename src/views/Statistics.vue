<template>
  <main class="flex-shrink-0" role="main">
    <div class="container">
      <div class="col-11 mx-auto">
        <div class="row">
          <div class="col bg-dark mb-3 chart-container">
            <bar-chart :height="'250px'"></bar-chart>
          </div>
        </div>
        <div class="row">
          <div class="col bg-dark mb-3 chart-container">
            .
          </div>
        </div>
        <div class="row">
          <div class="col bg-dark mb-3 chart-container">
            .
          </div>
        </div>
        <div class="row">
          <div class="col bg-dark mb-3 chart-container">
            .
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import BarChart from '../components/charts/Bar.vue'

  export default {
    components: {
      BarChart
    }
  }
</script>

<style scoped>
  .chart-container {
    /*height: 200px;*/
  }

  .container {
    margin-bottom: 150px;
  }
</style>