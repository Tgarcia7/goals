<template>
  <div>
    <b-modal id="modal-edit" ref="modal-edit" title="Edit goal" class="text-white"
      v-b-modal.modal-xl 
      header-bg-variant="dark" body-bg-variant="dark" footer-bg-variant="dark"
      header-text-variant="light" body-text-variant="light" footer-text-variant="light"
      modal-ok="modal-ok">

      <div class="my-2">
        {{ id }}
      </div>

      <template v-slot:modal-footer>
        <b-button size="md" variant="secondary">
          Cancel
        </b-button>
        <b-button form="editTask" type="submit" size="md" variant="success">
          Save
        </b-button>
      </template>
    </b-modal>

  </div>
</template>

<script>
  export default {
    name: 'EditTask',
    data: () => {
      return {
        id: ''
      }
    },
    components: {
      
    },
    mounted: function () {

    },
    methods: {
      
    }
  }
</script>

<style scoped>

</style>