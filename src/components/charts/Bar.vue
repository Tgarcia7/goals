<script>
  import { HorizontalBar } from 'vue-chartjs'

  export default {
    extends: HorizontalBar,
    props: {
      height: String
    },
    data: () => ({
      chartdata: {
        datasets: [
          {
            label: 'A tiempo',
            backgroundColor: '#f87979',
            data: [40,0]
          },
          {
            label: 'Vencido',
            backgroundColor: '#fff',
            data: [30, 0]
          }
        ]
      },
      options: {
        responsive: true,
        offset: true
      }
    }),
    mounted () {
      this.renderChart(this.chartdata, this.options)
    }
  }

</script>

<style scoped>
</style>