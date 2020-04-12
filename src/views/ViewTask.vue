<template>
  <div>
    <b-modal id="modal-view" ref="modal-view" title="" class="text-white"
      v-b-modal.modal-xl 
      header-bg-variant="dark" body-bg-variant="dark" footer-bg-variant="dark"
      header-text-variant="light" body-text-variant="light" footer-text-variant="light"
      modal-ok="modal-ok">

      <div class="form-row loader" v-if="!showContent">
        <div class="col-2 mx-auto">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>

      <div v-if="showContent">
        <div class="row">
          <div class="col-8 my-auto">
            <h4>{{ task.title }}</h4>
          </div>

          <div class="col-4">
            <div class="icon-container">
              <div class="circle text-center">
                <font-awesome-icon :icon="task.icon" size="2x"/>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-12">
            <p>
              <span class="text-secondary">Goal type </span> 
              <span class="badge badge-light" v-if="task.type === 'objective'">{{ task.type }}</span>
              <span class="badge badge-primary" v-if="task.type === 'steps'">{{ task.type }}</span>
              <span class="badge badge-info" v-if="task.type === 'simple'">{{ task.type }}</span>
            </p>
          </div>
        </div>

        <div class="row mt-2" v-if="task.type !== 'simple' && task.type === 'objective'">
          <div class="col-12">
            <p>
              <span class="text-secondary">Repetitions completed </span> 
              {{ task.objectiveDone }} 
            </p>
          </div>
        </div>

        <div class="row mt-2" v-if="task.date">
          <div class="col-12">
            <p><span class="text-secondary">End date stablished</span> {{ task.date }}</p>
          </div>
        </div>

        <div class="row mt-2" v-if="task.dateCompleted">
          <div class="col-12">
            <p><span class="text-secondary">Date completed</span> {{ task.dateCompleted }}</p>
          </div>
        </div>

        <div class="row mt-2" v-if="task.stepsList && task.stepsList.length">
          <div class="col-12">
            <p class="text-secondary">{{ task.objectiveDone }} Steps completed: </p>
          </div>
        </div>

        <div v-for="(step, index) in task.stepsList" :key="index">
          <div class="form-row">
            <div class="col-1">
              <font-awesome-icon :icon="['fas', 'check-circle']" class="text-success"/>
            </div>
            <div class="col-10">
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>

      </div>

      <template v-slot:modal-footer>
        <b-button size="md" variant="secondary" @click="close()">
          Close
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: 'EditTask',
    props: {
      id: Number, 
      icon: Array, 
      title: String, 
      date: String, 
      status: Number, 
      progress: String, 
      objectiveDone: {type: Number, default: 0},
      objectiveTotal: {type: Number, default: 0},
      type: String,
      stepsList: {type: Array},
      dateCompleted: String
    },
    data: () => {
      return {
        task: {
          id: '', 
          icon: '', 
          title: '', 
          date: '',  
          status: '', 
          progress: '',
          objectiveDone: 0,
          objectiveTotal: 0,
          type: '',
          stepsList: [], 
          dateCompleted: ''
        },
        showContent: false
      }
    }, 
    components: {
      
    },
    mounted: function () {
      this.initListeners()
    },
    methods: {
      close: function () {
        this.$refs['modal-view'].hide()
        this.showContent = false
      },
      setSelectedTask: function () {
        this.task.id = this.id
        this.task.icon = this.icon
        this.task.title = this.title
        this.task.date = this.formatedDate(this.date)
        this.task.status = this.status
        this.task.progress = this.progress
        this.task.objectiveDone = this.objectiveDone
        this.task.objectiveTotal = this.objectiveTotal
        this.task.type = this.type
        this.task.stepsList = this.stepsList.slice()
        this.task.dateCompleted = this.formatedDate(this.dateCompleted)
      },
      cleanForm: function () {
        this.task.id = ''
        this.task.icon = ''
        this.task.title = ''
        this.task.date = ''
        this.task.status = ''
        this.task.progress = ''
        this.task.objectiveDone = 0
        this.task.objectiveTotal = 0
        this.task.type = ''
        this.task.stepsList = []
        this.task.dateCompleted = ''
      },
      formatedDate: function (date) {
        if (date) {
          date = this.$moment(date).format('DD/MM/YYYY')
        }

        return date
      },
      initListeners: function () {
        //Modal size and init
        this.$refs['modal-view'].$on('shown', () => {
          this.cleanForm()
          this.setSelectedTask()
          
          let element = document.querySelector('#modal-view')

          if(element){
            let elementBody = document.querySelector('#modal-view .modal-body')
            element.style.overflowY = 'auto'
            elementBody.style.overflowY = 'scroll'
            
            const fullHeight = window.innerHeight * 0.77
            elementBody.style.height = `${fullHeight}px`
          }

          setTimeout(() => { this.showContent = true }, 200)
        })

        this.$refs['modal-view'].$on('hidden', () => {
          this.close()
        })
      }
    }
  }
</script>

<style scoped>
  .circle {
    border-radius: 50%;
    box-shadow: 0px 0px 2px #888; 
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .icon-container {
    width: 75px;
  }

  .loader {
    margin-top: 50% !important;
  }
</style>