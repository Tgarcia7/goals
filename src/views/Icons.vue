<template>
  <b-modal :id="`modal-icons-${this.id}`" :ref="`modal-icons-${this.id}`" class="text-white"
    v-b-modal.modal-lg hide-header hide-footer scrollable
    body-bg-variant="dark" body-text-variant="light">

    <div class="form-row mt-3">
      <div class="col">
        <b-form-input autofocus type="search" class="form-control bg-dark text-white"
          placeholder="Escriba algo para buscar un ícono" @keyup="applyFilter" v-model="search"/>
          <p class="text-right searchResult"><small>{{ searchResult }}</small></p>
      </div>
    </div>

    <div class="form-row my-5" v-if="showLoader">
      <div class="col-2 mx-auto">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Cargando...</span>
        </div>
      </div>
    </div>

    <div class="form-row" v-show="!showLoader">
      <div v-for="(icon, index) in iconList" :key="index" class="col-4">
        <div class="icon-box text-center clickable" @click="select(icon)">
          <font-awesome-icon :icon="icon" size="lg"/>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
  import faIcons from '../assets/fontAwesome.json'
  import Utils from '../mixins/Utils'

  export default {
    name: 'Icons',
    mixins: [Utils],
    props: {
      id: {type: String, validator: val => ['add', 'edit'].includes(val)}, 
    },
    data: () => {
      return {
        originalIconList: faIcons,
        iconList: [],
        search: '', 
        searchResult: '',
        showLoader: false,
        showIcons: true
      }
    },
    mounted: function () {
      this.iconList = this.originalIconList
      this.initListeners()
    },
    methods: {
      select: function (element) {
        this.$emit('iconSelected', element)
        this.$refs[`modal-icons-${this.id}`].hide()
      },
      applyFilter: function () {
        this.showLoader = true
        this.searchResult = ''
        let resultList,
            resultString
        
        if(this.search) {
          let searchStr = this.search.toLowerCase()
          resultList = this.originalIconList.filter(item => item[1].toLowerCase().includes(searchStr))
  
          resultString = `${resultList.length || 'Sin'} resultados`
        } else {
          resultList = this.originalIconList
          resultString = ''
        }

        this.iconList = resultList
        this.showLoader = false
        this.searchResult = resultString
      },
      initListeners: function () {
        //Modal size and init
        this.$refs[`modal-icons-${this.id}`].$on('shown', () => {
          let element = document.querySelector(`#modal-icons-${this.id}`)

          if(element && this.isApp()){
            element.style.overflowY = 'auto'
            
            const height = window.innerHeight * 0.65
            document.querySelector(`#modal-icons-${this.id} .modal-body`).style.height = `${height}px`
            document.querySelector(`#modal-icons-${this.id} .modal-dialog`).style.position = 'fixed'
            document.querySelector(`#modal-icons-${this.id} .modal-dialog`).style.bottom = '0'
            document.querySelector(`#modal-icons-${this.id} .modal-dialog`).style.width = '96%'
          }
        })
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

  .icon-box:hover {
    border: 1px solid #95c1f0;
    color: #95c1f0;
  }

  .searchResult {
    color: #95c1f0;
  }
</style>