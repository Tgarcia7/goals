<template>
  <div>
    <b-modal id="modal-edit" ref="modal-edit" :title="showTasksOnly ? 'Pasos' : 'Editar meta'" class="text-white"
      v-b-modal.modal-xl 
      header-bg-variant="dark" body-bg-variant="dark" footer-bg-variant="dark"
      header-text-variant="light" body-text-variant="light" footer-text-variant="light"
      modal-ok="modal-ok">

      <div class="form-row loader" v-if="!showForm">
        <div class="col-2 mx-auto">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Cargando...</span>
          </div>
        </div>
      </div>

      <div class="my-2" v-if="showForm">
        <form name="editTask" id="editTask" method="post" @submit="edit">

          <div class="main-form-info" v-show="!showTasksOnly">
            <div class="form-row mt-3">
              <div class="col-4 col-form-label">
                <label for="title">Título <span class="text-danger">*</span></label>
              </div>
              <div class="col-8">
                <input type="text" class="form-control bg-dark text-white" name="title" v-model="task.title" required>
              </div>
            </div>

            <div class="form-row mt-3">
              <div class="col-4 col-form-label">
                <label for="title">Fecha límite</label>
              </div>
              <div class="col-8">
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
                  Ícono
                </button>
              </div>
            </div>
          </div>

          <div class="form-row mt-3" v-if="this.task.type==='objective'">
            <div class="col-6 col-form-label">
              <label for="objectiveTotal">Objetivo <span class="text-danger">*</span></label>
            </div>
            <div class="col-3 mx-auto">
              <b-form-spinbutton id="sb-inline" class="bg-dark text-white" 
                v-model.number="task.objectiveTotal" inline 
                @change="checkObjective()" @keypress="onlyNumbers($event)"
                min="1" max="999999" step="1">
              </b-form-spinbutton>
            </div>

            <div class="col-6 col-form-label">
              <label for="objectiveDone">Completado</label>
            </div>
            <div class="col-3 mx-auto text-white">
              <b-form-spinbutton id="sb-inline" class="bg-dark text-white" 
                v-model.number="task.objectiveDone" inline 
                @change="checkObjective()" @keypress="onlyNumbers($event)"
                min="0" max="999999" step="1">
              </b-form-spinbutton>
            </div>
          </div>

          <div v-if="task.type==='steps'">
            <div class="form-row" v-if="!showTasksOnly">
              <div class="col-12 col-form-label">
                <label>Pasos para completar la meta <span class="text-danger">*</span></label>
              </div>
            </div>

            <div v-for="(step, index) in task.stepsList" :key="index">
              <div class="form-row">
                <div class="col-1 pt-2">
                  <label class="check-container">
                    <input type="checkbox" class="form-control clickable" :name="`stepsCheck_${index}`" v-model="step.status">
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="col-9">
                  <input type="text" class="form-control bg-dark text-white steps-inputs" :name="`steps_${index}`" v-model="step.description">
                </div>

                <div class="col-2 text-center mt-3">
                  <font-awesome-icon class="ml-3 clickable steps-list-trash" icon="trash" @click="removeStep(index)"/>
                </div>
              </div>
            </div>

            <div class="form-row mt-4">
              <div class="col-5 offset-1">
                <button type="button" class="btn btn-block btn-sm btn-secondary" @click="addStep()">
                  Agregar paso <font-awesome-icon class="clickable" icon="plus"/>
                </button>
              </div>
            </div>
          </div>

        </form>
      </div>

      <template v-slot:modal-footer>
        <b-button size="md" variant="secondary" @click="close()">
          Cancelar
        </b-button>
        <b-button form="editTask" type="submit" size="md" variant="success">
          Guardar
        </b-button>
      </template>
    </b-modal>

    <Swal ref="swal"/>
    <IconsModal @iconSelected="iconEdit" :id="'edit'"/>
  </div>
</template>

<script>
  import IconsModal from '../views/Icons.vue'
  import Swal from '../services/Swal.vue'
  import Utils from '../mixins/Utils'

  export default {
    name: 'EditTask',
    mixins: [Utils],
    props: {
      id: String, 
      icon: Array, 
      title: String, 
      date: String, 
      status: Number, 
      progress: String, 
      objectiveDone: {type: Number, default: 0},
      objectiveTotal: {type: Number, default: 0},
      type: String,
      stepsList: {type: Array},
      tasksOnly: {type: Boolean}
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
          stepsList: []
        }, 
        showForm: false,
        showTasksOnly: false
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
          this.$refs.swal.toast('error', 'Debe seleccionar un ícono')
          return
        }

        if (this.type === 'objective') {
          if (!this.objectiveTotal) {
            this.$refs.swal.toast('error', 'Debe llenar el campo repeticiones')
            return
          }
          
          if (!this.task.objectiveDone) this.task.objectiveDone = 0
        }

        if (this.task.type === 'steps') {
          let cleanedList = this.task.stepsList.filter(item => item.description)
          this.task.stepsList = cleanedList

          if(this.task.stepsList.length) {
            this.task.objectiveTotal = this.task.stepsList.length
            this.task.objectiveDone = (this.task.stepsList.filter(item => item.status)).length
          } else {
            this.task.stepsList = [{'status': false, 'description': ''}]
            this.$refs.swal.toast('error', 'Debe agregar al menos un paso')
            return
          }

          if (!this.task.objectiveDone) this.task.objectiveDone = 0
        }

        this.close()

        // Clone object to avoid referencing objects
        let updatedTask = Object.assign({}, this.task)

        this.$emit('saveEditedTask', updatedTask)
      },
      close: function () {
        this.$refs['modal-edit'].hide()
        this.showForm = false
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
        this.task.type = this.type
        this.task.stepsList = [{'status': false, 'description': ''}]
        this.showTasksOnly = false
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
        this.task.objectiveDone = this.objectiveDone
        this.task.objectiveTotal = this.objectiveTotal
        this.task.type = this.type
        // Clone array avoiding object reference
        this.task.stepsList = JSON.parse(JSON.stringify(this.stepsList))
        this.showTasksOnly = this.tasksOnly
      },
      formatedDate: function () {
        let date = this.date

        if (date && date.includes('-')) {
          date = this.$moment.utc(date).format('YYYY-MM-DD')
        }

        return date
      },
      initListeners: function () {
        //Modal size and init
        this.$refs['modal-edit'].$on('shown', () => {
          this.cleanForm()
          this.setSelectedTask()
          
          let element = document.querySelector('#modal-edit')

          if(element){
            let elementBody = document.querySelector('#modal-edit .modal-body')
            element.style.overflowY = 'auto'
            elementBody.style.overflowY = 'scroll'
            
            const fullHeight = window.innerHeight * 0.77
            elementBody.style.height = `${fullHeight}px`
          }

          setTimeout(() => { this.showForm = true }, 200)
        })

        this.$refs['modal-edit'].$on('hidden', () => {
          this.close()
        })
      },
      checkObjective: function () {
        if (Number(this.task.objectiveDone) > Number(this.task.objectiveTotal)) {
          this.$refs.swal.toast('error', 'El campo completado debe ser menor que el objetivo')
          this.task.objectiveDone = this.task.objectiveTotal
        }
      },
      addStep: function () {
        this.task.stepsList.push({'status': false, 'description': ''})
      },
      removeStep: function (index) {
        this.task.stepsList.splice(index, index+1)
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

  .steps-inputs {
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-radius: 0px;
  }

  .steps-list-trash:hover {
    color: #dc3545;
  }

  /* CHECKBOX */

   /* Customize the label (the container) */
  .check-container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default checkbox */
  .check-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 26px;
    width: 26px;
    background-color: #eee;
    border-radius: 3px;
  }

  /* On mouse-over, add a grey background color */
  .check-container:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background */
  .check-container input:checked ~ .checkmark {
    background-color: #2196F3;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .check-container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .check-container .checkmark:after {
    left: 10px;
    top: 5px;
    width: 7px;
    height: 13px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  } 

  .loader {
    margin-top: 50% !important;
  }
</style>