<template>
  <div>
    <b-modal id="modal-edit" ref="modal-edit" title="Edit goal" class="text-white"
      v-b-modal.modal-xl 
      header-bg-variant="dark" body-bg-variant="dark" footer-bg-variant="dark"
      header-text-variant="light" body-text-variant="light" footer-text-variant="light"
      modal-ok="modal-ok">

      <div class="my-2">
        <form name="editTask" id="editTask" method="post" @submit="edit">

          <div class="form-row mt-3">
            <div class="col-3 col-form-label">
              <label for="title">Title <span class="text-danger">*</span></label>
            </div>
            <div class="col-9">
              <input type="text" class="form-control bg-dark text-white" name="title" v-model="task.title" required>
            </div>
          </div>

          <div class="form-row mt-3">
            <div class="col-3 col-form-label">
              <label for="title">End date</label>
            </div>
            <div class="col-9">
              <input type="date" class="form-control bg-dark text-white" name="date" v-model="task.date">
            </div>
          </div>

          <div class="form-row mt-3">
            <div class="col-2 ml-auto text-center icon-box" v-if="task.icon">
              <font-awesome-icon :icon="task.icon" />
            </div>
            <div class="col-2 ml-auto" v-else></div>
            <div class="col-5 mt-1">
              <button type="button" id="btn-icons-edit" class="btn btn-block btn-secondary" v-b-modal.modal-icons-edit>
                Icon
              </button>
            </div>
          </div>

          <div class="form-row mt-3" v-if="type==='steps'">
            <div class="col-4 col-form-label">
              <label for="totalSteps">Total steps <span class="text-danger">*</span></label>
            </div>
            <div class="col-8">
              <input type="number" class="form-control bg-dark text-white" name="totalSteps" min="0" required v-model="task.totalSteps">
            </div>
          </div>

        </form>
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

    <Swal ref="swal"/>
    <IconsModalEdit @iconSelected="iconEdit" :id="'edit'"/>
  </div>
</template>

<script>
  import IconsModalEdit from '../views/Icons'
  import Swal from "../services/Swal"

  export default {
    name: 'EditTask',
    props: {
      id: {type: Number}, 
      icon: {type: Array}, 
      title: {type: String}, 
      date: String,  
      status: {type: Number, default: 1}, 
      progress: {type: String, default: 'doing'},
      stepsDone: Number,
      totalSteps: Number,
      type: {type: String, default: 'simple'}
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
          stepsDone: '',
          totalSteps: '',
          type: ''
        },
        initiated: false
      }
    }, 
    components: {
      IconsModalEdit,
      Swal
    },
    mounted: function () {
      
      this.$refs['modal-edit'].$on('shown', () => {
        this.setSelectedTask()
        
        let element = document.querySelector('#modal-edit')

        if(element){
          let elementBody = document.querySelector('#modal-edit .modal-body')
          element.style.overflowY = 'auto'
          elementBody.style.overflowY = 'scroll'
          
          const fullHeight = window.innerHeight * 0.77
          elementBody.style.height = `${fullHeight}px`
        }
      })
    },
    methods: {
      edit: function (e) {
        e.preventDefault()

        console.log(this.task)
      },
      close: function () {
        this.cleanForm()
        this.$refs['modal-edit'].hide()
      },
      showForm: function (type) {
        this.type = type
      },
      cleanForm: function () {
        this.task.type = ''
        this.task.icon = ''
      },
      iconEdit: function (icon) {
        this.task.icon = icon
      },
      setSelectedTask: function () {
        this.task.id = this.id
        this.task.icon = this.icon
        this.task.title = this.title
        this.task.date = this.formatedDate()
        this.task.status = this.status
        this.task.progress = this.progress
        this.task.stepsDone = this.stepsDone
        this.task.totalSteps = this.totalSteps
        this.task.type = this.type
      },
      formatedDate: function () {
        let date = this.date

        if (date && date.includes('/')) {
          let splittedDate = date.split('/')
          let tempDate = [splittedDate[1], splittedDate[0], splittedDate[2]].join('/')
          tempDate = new Date(tempDate)

          let month = tempDate.getMonth()+1
          month = month < 10 ? `0${month}` : month

          tempDate = `${tempDate.getFullYear()}-${month}-${tempDate.getDate()}`
          date = tempDate
        }

        return date
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

  #btn-icons-edit {
    margin-top: 2px;
  }
</style>