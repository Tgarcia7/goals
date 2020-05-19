<template>
  <span></span>
</template>

<script>
  export default {
    name: 'Swal',
    methods: {
      regular: function (type, title, text) {
        let vm = this
        return new Promise(function (resolve) {  
          vm.$swal.fire({
              icon: type,
              title: title,
              text: text,
              position: 'top-end',
              confirmButtonText: 'Aceptar',
              cancelButtonText: 'Cancelar',
              showCancelButton: true,
              backdrop: 'rgba(66, 66, 64,0.4)'
            }).then(result => {
              resolve(result)
            })
        })
      }, 
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

  .swal2-html-container{ 
    color: #e1e1e1 !important;
  }
</style>