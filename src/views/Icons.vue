<template>
  <b-modal id="modal-icons" ref="modal-icons" class="text-white"
    v-b-modal.modal-lg hide-header hide-footer scrollable
    body-bg-variant="dark" body-text-variant="light">

    <div id="icons">
      <div class="row icon-row">
        <div v-for="icon in iconList" :key="icon" class="col-4 mx-auto">
          <div class="icon-box text-center clickable" @click="select">
            <font-awesome-icon :icon="icon" size="lg"/>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
  import faIcons from "../assets/fontAwesome.json"

  export default {
    data: () => {
      return {
        iconList: faIcons.map(icon => icon.replace(/fab fa-|far fa-|fas fa-/gi, '')),
        hover: false
      }
    },
    mounted: function () {
      this.$root.$on('bv::modal::shown', () => {
        let element = document.querySelector('#modal-icons')

        if(element){
          element.style.overflowY = 'auto'
          
          const fullHeight = window.innerHeight * 0.65
          document.querySelector('#modal-icons .modal-body').style.height = `${fullHeight}px`
          document.querySelector('#modal-icons .modal-dialog').style.position = 'fixed'
          document.querySelector('#modal-icons .modal-dialog').style.bottom = '0'
        }
      })
    },
    methods: {
      select: function (){
        this.$refs['modal-icons'].hide()
      }
    }
  }
</script>

<style scoped>
  .icon-box {
    border: 1px solid white;
    padding: 4px;
    margin: 7px;
  }
</style>