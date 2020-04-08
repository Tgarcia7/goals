<template>
  <span></span>
</template>

<script>
  export default {
    name: 'Swal',
    data: () => {
      return {

      }
    },
    methods: {
      toast: function (type, text, progressBar = false, showLoading) {
        let vm = this
        return new Promise(function (resolve) {  
          vm.$swal.fire({
              icon: type,
              title: text,
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: progressBar,
              onBeforeOpen: () => {
                if (showLoading) vm.$swal.showLoading()
              }
            }).then(result => {
              resolve(result)
            })
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '@/assets/sass/swal2-dark.scss';
</style>