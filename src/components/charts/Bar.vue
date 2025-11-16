<script>
  import { HorizontalBar } from 'vue-chartjs'
  import Chart from 'chart.js'

  export default {
    extends: HorizontalBar,
    props: {
      height: { type: String, default: '350px', required: false },
      chartdata: { type: Object, required: true },
      year: { type: Number, required: false, default: null }
    },
    data () {
      return {
        localData: null
      }
    },
    mounted () {
      this.initChart()
    },
    watch: {
      year: function () {
        this.updateChart()
      }
    },
    methods: {
      getChartData () {
        // Don't mutate props - create local copy
        if (this.year && this.chartdata.data && typeof this.chartdata.data === 'object' && !Array.isArray(this.chartdata.data)) {
          return this.chartdata.data[`${this.year}`] || []
        }
        return this.chartdata.data || []
      },
      initChart () {
        // Set global defaults
        Chart.defaults.global.defaultFontColor = '#ffffff'
        Chart.defaults.global.defaultFontSize = 13
        Chart.defaults.global.defaultFontFamily = '"Quicksand", sans-serif'

        this.localData = this.getChartData()

        const options = {
          title: { display: true, text: this.chartdata.title || '' },
          legend: { display: false },
          responsive: true,
          maintainAspectRatio: false,
          offset: true
        }

        const dataChart = {
          labels: this.chartdata.labels || [],
          datasets: [
            {
              backgroundColor: ['rgba(6,160,6,0.2)', 'rgba(215,219,216,0.2)'],
              borderColor: ['rgba(6,160,6,1)', 'rgba(215,219,216,1)'],
              borderWidth: [2, 2],
              data: this.localData
            }
          ]
        }

        this.renderChart(dataChart, options)
      },
      updateChart () {
        this.localData = this.getChartData()

        if (this.$data._chart) {
          this.$data._chart.data.datasets[0].data = this.localData
          this.$data._chart.update()
        }
      }
    }
  }
</script>

<style scoped>
</style>
