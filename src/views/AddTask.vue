<template>
  <div>
    <b-modal id="modal-add" ref="modal-add" title="Add goal" class="text-white"
      v-b-modal.modal-xl 
      header-bg-variant="dark" body-bg-variant="dark" footer-bg-variant="dark"
      header-text-variant="light" body-text-variant="light" footer-text-variant="light"
      modal-ok="modal-ok">

      <div class="my-2">
        <form name="addTask" id="addTask" method="post" @submit="add">
          
          <div class="box-type" v-show="!type">
            <div class="form-row">
              <div class="col">
                <h5>What kind of goal would you like to create?</h5>
              </div>
            </div>

            <div class="form-row mt-4">
              <button type="button" class="btn btn-primary btn-lg col-12" @click="showForm('steps')">
                <strong><font-awesome-icon icon="tasks" size="lg"/> Steps</strong> <br>
                <p class="type-description mt-1">To reach the goal you must complete a list of steps that you define</p>
              </button>
            </div>

            <div class="form-row mt-4">
              <button type="button" class="btn btn-light btn-lg col-12 ml-auto" @click="showForm('objective')">
                <strong>1<font-awesome-icon icon="arrow-right" size="xs"/>10 Objective</strong><br>
                <p class="type-description mt-1">You set the number of repetitions you want to complete to reach the goal</p>
              </button>
            </div>

            <div class="form-row mt-4">
              <button type="button" class="btn btn-info btn-lg col-12 mx-auto" @click="showForm('simple')">
                <strong><font-awesome-icon icon="bullseye" size="lg"/> Simple</strong> <br>
                <p class="type-description mt-1">No repetitions, no steps, just a goal</p>
              </button>
            </div>
          </div>

          <transition name="fade">
            <div class="box-type" v-if="type">

              <div class="form-row">
                <div class="col">
                  <h5>
                    <span class="clickable" @click="cleanForm()">
                      <font-awesome-icon icon="chevron-left"/>
                    </span>
                    Fill the form to add a new goal
                  </h5>
                </div>
              </div>

              <div class="form-row mt-3">
                <div class="col-3 col-form-label">
                  <label for="title">Title <span class="text-danger">*</span></label>
                </div>
                <div class="col-9">
                  <input type="text" class="form-control bg-dark text-white" name="title" v-model="title" required>
                </div>
              </div>

              <div class="form-row mt-3">
                <div class="col-3 col-form-label">
                  <label for="title">End date</label>
                </div>
                <div class="col-9">
                  <input type="date" class="form-control bg-dark text-white" name="date" v-model="date">
                </div>
              </div>

              <div class="form-row mt-3">
                <div class="col-2 ml-auto text-center icon-box" v-if="icon">
                  <font-awesome-icon :icon="icon" />
                </div>
                <div class="col-2 ml-auto" v-else></div>
                <div class="col-5 mt-1">
                  <button type="button" id="btn-icons" class="btn btn-block btn-secondary" v-b-modal.modal-icons-add>
                    Icon
                  </button>
                </div>
              </div>

              <div class="form-row mt-3" v-if="this.type==='objective'">
                <div class="col-4 col-form-label">
                  <label for="objectiveTotal">Repetitions <span class="text-danger">*</span></label>
                </div>
                <div class="col-8">
                  <input type="number" class="form-control bg-dark text-white" name="objectiveTotal" min="1" required v-model="objectiveTotal"
                     @keypress="onlyNumbers($event)">
                </div>
              </div>

              <div v-if="this.type==='steps'">
                <div class="form-row">
                  <div class="col-12 col-form-label">
                    <label>Steps to complete the goal <span class="text-danger">*</span></label>
                  </div>
                </div>

                <div v-for="(step, index) in stepsList" :key="index">
                  <div class="form-row">
                    <div class="col-9 offset-1">
                      <input type="text" class="form-control bg-dark text-white steps-inputs" :name="`steps_${index}`" v-model="stepsList[index].description">
                    </div>

                    <div class="col-2 text-center mt-3">
                      <font-awesome-icon class="ml-3 clickable steps-list-trash" icon="trash" @click="removeStep(index)"/>
                    </div>
                  </div>
                </div>

                <div class="form-row mt-4">
                  <div class="col-4 offset-1">
                    <button type="button" class="btn btn-block btn-sm btn-secondary" @click="addStep()">
                      Add step <font-awesome-icon class="clickable" icon="plus"/>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </transition>

        </form>
      </div>

      <template v-slot:modal-footer>
        <b-button size="md" variant="secondary" @click="close()">
          Cancel
        </b-button>
        <b-button form="addTask" type="submit" size="md" variant="success">
          Add
        </b-button>
      </template>
    </b-modal>

    <Swal ref="swal"/>
    <IconsModal @iconSelected="iconSelected" :id="'add'"/>
  </div>
</template>

<script>
  import IconsModal from '../views/Icons'
  import Swal from "../services/Swal"

  export default {
    name: 'AddTask',
    data: () => {
      return {
        type: '',
        title: '',
        date: '',
        objectiveTotal: 1,
        icon: '',
        stepsList: []
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
      add: function (e) {
        e.preventDefault()

        if (!this.icon) {
          this.$refs.swal.toast('error', 'You must select an icon')
          return
        }

        if (this.type === 'steps') {
          let cleanedList = this.stepsList.filter(item => item.description)
          this.stepsList = cleanedList

          if (!cleanedList.length) {
            this.stepsList = [{'status': false, 'description': ''}]
            this.$refs.swal.toast('error', 'You must add at least one step')
            return
          }
        }
        
        let newTask = {
          type: this.type, 
          title: this.title, 
          date: this.date, 
          objectiveTotal: this.objectiveTotal, 
          icon: this.icon, 
          stepsList: this.stepsList
        }
        
        this.close()
        console.log(newTask)

        this.$refs.swal.toast('success', 'Goal added successfully')
      },
      close: function () {
        this.$refs['modal-add'].hide()
      },
      showForm: function (type) {
        this.type = type
      },
      cleanForm: function () {
        this.type = ''
        this.title = ''
        this.date = ''
        this.objectiveTotal = ''
        this.icon = ''
        this.stepsList = [{'status': false, 'description': ''}]
      },
      addStep: function () {
        this.stepsList.push({'status': false, 'description': ''})
      },
      removeStep: function (index) {
        this.stepsList.splice(index, index+1)
      },
      iconSelected: function (icon) {
        this.icon = icon
      },
      initListeners: function () {
        //Modal size and init
        this.$refs['modal-add'].$on('shown', () => {
          this.cleanForm()
          
          let element = document.querySelector('#modal-add')

          if(element){
            let elementBody = document.querySelector('#modal-add .modal-body')
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
      }
    }
  }
</script>

<style scoped>
  .fade-enter-active {
    transition: all .5s ease;
  }
  
  .fade-enter, .fade-leave {
    opacity: 0;
    transform: translateX(500px);
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

  .icon-box {
    border: 1px solid white;
    padding: 4px;
    margin: 7px;
  }

  #btn-icons {
    margin-top: 2px;
  }

  .type-description {
    font-size: 14px;
  }
</style>