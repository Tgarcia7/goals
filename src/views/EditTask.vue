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

          <div class="form-row mt-3" v-if="this.task.type==='steps'">
            <div class="col-4 col-form-label">
              <label for="totalSteps">Total steps <span class="text-danger">*</span></label>
            </div>
            <div class="col-8">
              <input type="number" class="form-control bg-dark text-white" name="totalSteps" min="0" required 
                v-model="task.totalSteps" @keypress="onlyNumbers($event)" @keyup="checkSteps()">
            </div>

            <div class="col-4 col-form-label">
              <label for="stepsDone">Steps done <span class="text-danger">*</span></label>
            </div>
            <div class="col-8">
              <input type="number" class="form-control bg-dark text-white" name="stepsDone" min="0" required 
                v-model="task.stepsDone" @keypress="onlyNumbers($event)" @keyup="checkSteps()">
            </div>
          </div>

        </form>
      </div>

      <template v-slot:modal-footer>
        <b-button size="md" variant="secondary" @click="close()">
          Cancel
        </b-button>
        <b-button form="editTask" type="submit" size="md" variant="success">
          Save
        </b-button>
      </template>
    </b-modal>

    <Swal ref="swal"/>
    <IconsModal @iconSelected="iconEdit" :id="'edit'"/>
  </div>
</template>

<script>
  import IconsModal from '../views/Icons'
  import Swal from "../services/Swal"

  export default {
    name: 'EditTask',
    props: {
      id: Number, 
      icon: Array, 
      title: String, 
      date: String,  
      status: Number, 
      progress: String,
      stepsDone: Number,
      totalSteps: Number,
      type: String
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
        }
      }
    }, 
    components: {
      IconsModal,
      Swal
    },
    mounted: function () {
      this.initListeners()
    },
    methods: {
      edit: function (e) {
        e.preventDefault()

        if (!this.task.icon) {
          this.$refs.swal.toast('error', 'You must select an icon')
          return
        }

        this.close()
        console.log(this.task)

        this.$refs.swal.toast('success', 'Goal updated successfully')
      },
      close: function () {
        this.cleanForm()
        this.$refs['modal-edit'].hide()
      },
      cleanForm: function () {
        this.task.id = ''
        this.task.icon = ''
        this.task.title = ''
        this.task.date = ''
        this.task.status = ''
        this.task.progress = ''
        this.task.stepsDone = ''
        this.task.totalSteps = ''
        this.task.type = this.type
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
      },
      initListeners: function () {
        //Modal size and init
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
      onlyNumbers: function (event) {
        let charCode = event.keyCode
        
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault()
        }

        return true
      },
      checkSteps: function () {
        if (Number(this.task.stepsDone) > Number(this.task.totalSteps)) {
          this.$refs.swal.toast('error', 'The steps done must be lower than the total steps')
          this.task.stepsDone = this.task.totalSteps
        }
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