<script>
  import { Doughnut } from 'vue-chartjs'

  export default {
    extends: Doughnut,
    props: {
      height: { type: String, default: '350px', required: false },
      chartdata: { type: Object, required: true },
      year: {type: Number, required: false, default: null}
    },
    mounted () {
      this.calculateYear()
      let options = { 
        title: { 'display': true, text: this.chartdata.title },
        legend: { 'position': 'left' },
        responsive: true,
        offset: true
      }
      
      let dataChart = {
        labels: this.chartdata.labels,
        datasets: [
          {
            backgroundColor: ['rgba(0,123,255,0.2)', 'rgba(23,162,184,0.2)', 'rgba(248,249,250,0.4)'],
            borderColor: ['rgba(0,123,255,1)', 'rgba(23,162,184,1)', 'rgba(248,249,250,1)'],
            borderWidth: [2, 2, 2],
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