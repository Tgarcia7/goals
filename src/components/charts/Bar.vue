<script>
  import { HorizontalBar } from 'vue-chartjs'

  export default {
    extends: HorizontalBar,
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