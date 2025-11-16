<template>
  <main class="flex-shrink-0" role="main">
    <div class="container">
      <div v-if="!stats.length && !graphs.length && !loading && loading !== null" class="empty">
        <font-awesome-icon icon="chart-bar" size="8x"/>
        <h3 class="mt-3">Completa algunas metas </h3>
        <h5>para alimentar tus estadísticas</h5>
      </div>

      <div class="form-row loading-container" v-if="loading">
        <div class="col mx-auto">
          <div class="spinner-border" role="status">
            <span class="sr-only">Cargando...</span>
          </div>
        </div>
      </div>

      <div v-if="error" class="alert alert-danger mx-3" role="alert">
        {{ error }}
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

            <div class="row text-white" v-if="graph.byYear">
              <div class="col-4 clickable" @click="year --">
                <font-awesome-icon icon="chevron-left"/>
              </div>
              <div class="col-4">
                <strong>{{ year }}</strong>
              </div>
              <div class="col-4 clickable" v-if="year < currentYear"  
                @click="year ++">
                <font-awesome-icon icon="chevron-right"/> 
              </div>
            </div>

            <bar-chart v-if="graph.type === 'Bar'" 
              :chartdata="graph"
              :heigth="graph.height"
              :year="graph.byYear ? year : null">
            </bar-chart>
            <line-chart v-else-if="graph.type === 'Line'" 
              :chartdata="graph"
              :height="graph.height"
              :year="graph.byYear ? year : null">
            </line-chart>
            <doughnut-chart v-else-if="graph.type === 'Doughnut'" 
              :chartdata="graph"
              :height="graph.height"
              :year="graph.byYear ? year : null">
            </doughnut-chart>
            
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<script>
  import Api from '../services/api'

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
        graphs: [],
        stats: [],
        currentYear: this.$moment().year(),
        year: this.$moment().year(),
        loading: null,
        error: null
      }
    },
    mounted: async function () {
      const loadingTimeout = this.initLoader()

      try {
        const graphsStats = await Api.getGraphsStats()

        if (graphsStats && typeof graphsStats === 'object') {
          this.graphs = Array.isArray(graphsStats.graphs) ? graphsStats.graphs : []
          this.stats = Array.isArray(graphsStats.stats) ? graphsStats.stats : []
        } else {
          this.graphs = []
          this.stats = []
        }
        this.error = null
      } catch (error) {
        console.error('Failed to load statistics:', error.message || error)
        this.error = 'No se pudieron cargar las estadísticas'
        this.graphs = []
        this.stats = []
      }

      this.stopLoader(loadingTimeout)
    },
    methods: { 
      initLoader: function () {
        const vm = this
        return setTimeout(() => { vm.loading = true }, 1500)
      },
      stopLoader: function (loadingTimeout) {
        clearTimeout(loadingTimeout)
        this.loading = false
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