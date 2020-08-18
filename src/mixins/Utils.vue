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
      dateDisplayFormat: function (stringDate) {
        let date
        if (stringDate) {
          date = this.stringToDate(stringDate)
          date = this.$moment(date).format('DD/MM/YYYY')
        }

        return date
      },
      getRandomInt: function (min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
      },
      stringToDate: function (stringDate) {
        const removeTime = stringDate.split('T')[0]
        const splitDate = removeTime.split('-')
        const date = new Date(splitDate[0], splitDate[1]-1, splitDate[2])

        return date
      }
    }
  }
</script>