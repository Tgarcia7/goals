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
      toast: function (type, text) {
        this.$swal.fire({
            icon: type,
            title: text,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          })
      }
    }
  }
</script>

<style lang="scss" scope>
@import "~@sweetalert2/themes/dark/dark.scss";
</style>