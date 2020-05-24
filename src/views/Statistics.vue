<template>
  <main class="flex-shrink-0" role="main">
    <div class="container">
      <div class="col-11 mx-auto">
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
  import { Bar } from 'vue-chartjs'

  export default {
    extends: Bar,
    mounted () {
      // Overwriting base render method with actual data.
      this.renderChart({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'GitHub Commits',
            backgroundColor: '#f87979',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          }
        ]
      })
    }
  }
</script>

<style scoped>
  .chart-container {
    height: 125px;
  }

  .container {
    margin-bottom: 150px;
  }
</style>