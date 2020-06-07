<script>
  export default {
    name: 'FB',
    data () {
      return {
        FB: ''
      }
    },
    mounted () {
      let _this = this
      this.$nextTick(() => {
        window.fbAsyncInit = function () {
          FB.init({
            appId: '254801129292665',
            xfbml: true,
            version: 'v13.0'
          })
          FB.AppEvents.logPageView()
          _this.FB = FB
        };
        (function (d, s, id) {
          let js, fjs = d.getElementsByTagName(s)[0]
          if (d.getElementById(id)) { return }
          js = d.createElement(s); js.id = id
          js.src = '//connect.facebook.net/en_US/sdk.js'
          fjs.parentNode.insertBefore(js, fjs)
        }(document, 'script', 'facebook-jssdk'))
      })
    }
  }
</script>

<style>

</style>