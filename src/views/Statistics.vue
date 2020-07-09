<template>
  <main class="flex-shrink-0" role="main">
    <div class="container">
      <div v-if="!stats.length && !graphs.length" class="empty">
        <font-awesome-icon icon="chart-bar" size="8x"/>
        <h3 class="mt-3">Completa algunas metas </h3>
        <h5>para alimentar tus estadísticas</h5>
      </div>

      <div class="col-11 mx-auto" v-else>
        <div class="row">
          <div v-for="(stat, index) in stats" :key="index" 
            class="col-6 bg-dark mb-3 text-white pt-3 info-container">

            <h3>
              <strong>{{stat.total}}<small>{{ stat.sign }} </small></strong>
              <font-awesome-icon :icon="stat.icon" :color="stat.color"/>
            </h3>
            <p>{{stat.description}}</p>

          </div>
        </div>

        <div v-for="(graph, index) in graphs" :key="index" class="row">
          <div class="col bg-dark mb-3 chart-container pb-3 pt-3">

            <div class="row text-white" v-if="graph.year">
              <div class="col-4 clickable" @click="graph.year --">
                <font-awesome-icon icon="chevron-left"/>
              </div>
              <div class="col-4">
                <strong>{{ graph.year }}</strong>
              </div>
              <div class="col-4 clickable" v-if="graph.year < currentYear"  
                @click="graph.year ++">
                <font-awesome-icon icon="chevron-right"/> 
              </div>
            </div>

            <bar-chart v-if="graph.type === 'Bar'" 
              :chartdata="graph.chartdata" 
              :options="graph.options"
              :heigth="graph.height"
              :year="graph.year">
            </bar-chart>
            <line-chart v-else-if="graph.type === 'Line'" 
              :chartdata="graph.chartdata" 
              :options="graph.options"
              :height="graph.height"
              :year="graph.year">
            </line-chart>
            <doughnut-chart v-else-if="graph.type === 'Doughnut'" 
              :chartdata="graph.chartdata" 
              :options="graph.options"
              :height="graph.height"
              :year="graph.year">
            </doughnut-chart>
            
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<script>
  import GraphsData from '../assets/statistics.json'

  import BarChart from '../components/charts/Bar.vue'
  import LineChart from '../components/charts/Line.vue'
  import DoughnutChart from '../components/charts/Doughnut.vue'

  export default {
    components: {
      BarChart,
      LineChart,
      DoughnutChart
    },
    data: function () {
      return {
        graphs: GraphsData.graphs,
        stats: GraphsData.stats,
        currentYear: this.$moment(this.$moment()).year()
      }
    }
  }
</script>

<style scoped>
  .container {
    margin-bottom: 150px;
  }

  .info-container, .chart-container {
    border-left: 2px solid #1e242a;
    border-right: 2px solid #1e242a;
  }
</style>