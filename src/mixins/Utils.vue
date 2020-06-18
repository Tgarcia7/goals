<script>
  export default {
    methods: {
      onlyNumbers: function (event) {
        let charCode = event.keyCode
            
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          event.preventDefault()
        }

        return true
      },
      isApp: function () {
        let w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            window_width = w.innerWidth||e.clientWidth||g.clientWidth
              
        return window_width < 992
      },
      dateDisplayFormat: function (date) {
        if (date) {
          date = this.$moment(date).format('DD/MM/YYYY')
        }

        return date
      },
      getRandomInt: function (min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
      }
    }
  }
</script>