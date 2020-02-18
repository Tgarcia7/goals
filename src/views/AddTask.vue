<template>
  <div>
    <b-modal id="modal-add" ref="modal-add" title="Add goal" class="text-white"
      v-b-modal.modal-xl 
      header-bg-variant="dark" body-bg-variant="dark" footer-bg-variant="dark"
      header-text-variant="light" body-text-variant="light" footer-text-variant="light"
      modal-ok="modal-ok">

      <div class="my-4">
        <form method="post">
          
          <div class="form-row">
            <div class="col">
              <h5>Fill the form to add a new goal</h5>
            </div>
          </div>

          <div class="form-row mt-3">
            <div class="col">
              <input type="text" class="form-control bg-dark text-white" placeholder="Title *" required>
            </div>
          </div>

          <div class="form-row mt-3">
            <div class="col">
              <input type="date" class="form-control bg-dark text-white" placeholder="Date">
            </div>
          </div>

          <div class="form-row mt-3">
            <div class="col">
              <select class="form-control bg-dark text-white">
                <option class="text-muted" value="" disabled selected>Select the goal type</option>
                <option value="steps">Steps</option>
                <option value="tasks">Tasks</option>
              </select>
            </div>
          </div>

          <div class="form-row mt-3">
            <div class="col">
              <input type="number" class="form-control bg-dark text-white" placeholder="Number of steps">
            </div>
          </div>

          <div class="form-row mt-3">
            <div class="col-4 ml-auto">
              <button type="button" class="btn btn-block btn-sm btn-secondary" v-b-modal.modal-icons>
                Icon
              </button>
            </div>
          </div>

        </form>
      </div>

      <template v-slot:modal-footer>
        <b-button size="md" variant="secondary" @click="close()">
          Cancel
        </b-button>
        <b-button size="md" variant="success" @click="add()">
          Add
        </b-button>
      </template>
    </b-modal>

    <IconsModal/>
  </div>
</template>

<script>
  import IconsModal from "../views/Icons"

  export default {
    name: 'AddTask',
    components: {
      IconsModal
    },
    methods: {
      add: function () {
        this.$refs['modal-add'].hide()
      },
      close: function () {
        this.$refs['modal-add'].hide()
      }
    },
    mounted: function () {
      this.$root.$on('bv::modal::shown', () => {
        let element = document.querySelector('#modal-add')

        if(element){
          element.style.overflowY = 'auto'
          
          const fullHeight = window.innerHeight * 0.77
          document.querySelector('#modal-add .modal-body').style.height = `${fullHeight}px`
        }
      })
    }
  }
</script>

<style scoped>
</style>