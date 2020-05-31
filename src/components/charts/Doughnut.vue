<script>
  import { Doughnut } from 'vue-chartjs'

  export default {
    extends: Doughnut,
    props: {
      height: { type: String, default: '250px', required: false },
      chartdata: { type: Object, required: true },
      options: { type: Object, required: true },
      year: {type: Number, required: false, default: null}
    },
    mounted () {
      this.calculateYear()
      
      this.renderChart(this.chartdata, this.options)
      Chart.defaults.global.defaultFontColor = '#ffffff'
      Chart.defaults.global.defaultFontSize = 13
      Chart.defaults.global.defaultFontFamily = '"Quicksand", sans-serif'
    },
    watch: {
      year: function () {
        this.calculateYear()
        
        this.$data._chart.update()
      }
    },
    methods: {
      calculateYear: function () {
        if ( this.year ) {
          this.chartdata.datasets[0].data = this.chartdata.datasets[0].dataYears[`${this.year}`]
        }
      }
    }
  }
</script>

<style scoped>
</style>