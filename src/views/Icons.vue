<template>
  <b-modal id="modal-icons" ref="modal-icons" class="text-white"
    v-b-modal.modal-lg hide-header hide-footer scrollable
    body-bg-variant="dark" body-text-variant="light">

    <div class="form-row mt-3">
      <div class="col">
        <b-form-input autofocus type="search" class="form-control bg-dark text-white"
          placeholder="Type something to search an icon" @keyup="applyFilter" v-model="search"/>
          <p class="text-right searchResult"><small>{{ searchResult }}</small></p>
      </div>
    </div>

    <div class="form-row my-5" v-if="showLoader">
      <div class="col-2 mx-auto">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
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
  import faIcons from "../assets/fontAwesome.json"

  export default {
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

      this.$root.$on('bv::modal::shown', () => {
        let element = document.querySelector('#modal-icons')

        if(element && this.isApp()){
          element.style.overflowY = 'auto'
          
          const height = window.innerHeight * 0.65
          document.querySelector('#modal-icons .modal-body').style.height = `${height}px`
          document.querySelector('#modal-icons .modal-dialog').style.position = 'fixed'
          document.querySelector('#modal-icons .modal-dialog').style.bottom = '0'
          document.querySelector('#modal-icons .modal-dialog').style.width = '96%'
        }
      })
    },
    methods: {
      select: function (element) {
        console.log(`Seleted: ${element}`)
        this.$refs['modal-icons'].hide()
      },
      isApp: function () {
        let w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            window_width = w.innerWidth||e.clientWidth||g.clientWidth
            
        return window_width < 992
      },
      applyFilter: function () {
        this.showLoader = true
        this.searchResult = ''
        let resultList,
          resultString
        
        if(this.search) {
          let searchStr = this.search.toLowerCase()
          resultList = this.originalIconList.filter(item => item[1].toLowerCase().includes(searchStr))
  
          resultString = `${resultList.length || 'No'} results`
        } else {
          resultList = this.originalIconList
          resultString = ''
        }

        this.iconList = resultList
        this.showLoader = false
        this.searchResult = resultString
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