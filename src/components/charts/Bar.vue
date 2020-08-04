<script>
  import { HorizontalBar } from 'vue-chartjs'

  export default {
    extends: HorizontalBar,
    props: {
      height: { type: String, default: '350px', required: false },
      chartdata: { type: Object, required: true },
      year: {type: Number, required: false, default: null}
    },
    mounted () {
      this.calculateYear()
      let options = { 
        title: { 'display': true, text: this.chartdata.title },
        legend: { 'display': false },
        responsive: true,
        offset: true
      }
      
      let dataChart = {
        labels: this.chartdata.labels,
        datasets: [
          {
            backgroundColor: ['rgba(6,160,6,0.2)', 'rgba(215,219,216,0.2)'],
            borderColor: ['rgba(6,160,6,1)', 'rgba(215,219,216,1)'],
            borderWidth: [2, 2],
            data: this.chartdata.data
          }
        ]
      }
      
      this.renderChart(dataChart, options)
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
          this.chartdata.data = this.chartdata.data[`${this.year}`]
        }
      }
    }
  }
</script>

<style scoped>
</style>