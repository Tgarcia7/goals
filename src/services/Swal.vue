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
            position: 'center',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            showCancelButton: true,
            backdrop: 'rgba(66, 66, 64,0.4)',
            allowOutsideClick: false
          }).then(result => {
            resolve(result)
          })
        })
      }, 
      regularLoading: function (type, title, text, showLoading = true, progressBar = true) {
        let vm = this
        return new Promise(function (resolve) {  
          vm.$swal.fire({
            icon: type,
            title: title,
            text: text,
            position: 'center',
            showCancelButton: false,
            showConfirmButton: false,
            backdrop: 'rgba(66, 66, 64,0.4)',
            allowOutsideClick: false,
            timer: 3000,
            timerProgressBar: progressBar,
            onBeforeOpen: () => {
              if (showLoading) vm.$swal.showLoading()
            },
          }).then(result => {
            resolve(result)
          })
        })
      },
      toast: function (type, text, progressBar = false, showLoading, position = 'top-end', timer = 2000) {
        let vm = this
        return new Promise(function (resolve) {  
          vm.$swal.fire({
            icon: type,
            title: text,
            toast: true,
            position: position,
            showConfirmButton: false,
            timer: timer,
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