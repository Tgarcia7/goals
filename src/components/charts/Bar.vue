<script>
  import { HorizontalBar } from 'vue-chartjs'

  export default {
    extends: HorizontalBar,
    props: {
      height: { type: String, default: '250px', required: false },
      chartdata: { type: Object, required: true },
      options: { type: Object, required: true }
    },
    mounted () {
      this.renderChart(this.chartdata, this.options)
      Chart.defaults.global.defaultFontColor = '#ffffff'
    }
  }
</script>

<style scoped>
</style>