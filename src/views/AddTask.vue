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

            <div class="form-row mt-5">
              <button type="button" class="btn btn-primary btn-lg col-5" @click="showForm('tasks')">
                Tasks <br>
                <font-awesome-icon icon="tasks" size="lg"/>
              </button>
              <button type="button" class="btn btn-light btn-lg col-5 ml-auto" @click="showForm('steps')">
                Steps <br>
                <strong>1<font-awesome-icon icon="arrow-right" size="xs"/>10</strong>
              </button>
            </div>

            <div class="form-row mt-4">
              <button type="button" class="btn btn-secondary btn-lg col-5 mx-auto" @click="showForm('simple')">
                Simple <br>
                <font-awesome-icon icon="bullseye" size="lg"/>
              </button>
            </div>
          </div>

          <transition name="fade">
            <div class="box-type" v-if="type">

              <div class="form-row">
                <div class="col">
                  <h5>
                    <span class="clickable" @click="hideForm()">
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
                <div class="col-4 ml-auto">
                  <input type="hidden" name="icon" v-model="icon">
                  <button type="button" class="btn btn-block btn-sm btn-secondary" v-b-modal.modal-icons>
                    Icon
                  </button>
                </div>
              </div>

              <div class="form-row mt-3" v-if="this.type==='steps'">
                <div class="col-4 col-form-label">
                  <label for="totalSteps">Total steps <span class="text-danger">*</span></label>
                </div>
                <div class="col-8">
                  <input type="number" class="form-control bg-dark text-white" name="totalSteps" min="0" required v-model="totalSteps">
                </div>
              </div>

              <div v-if="this.type==='tasks'">
                <div class="form-row">
                  <div class="col-12 col-form-label">
                    <label>Tasks to complete the goal <span class="text-danger">*</span></label>
                  </div>
                </div>

                <div v-for="(subTask, index) in tasksList" :key="index">
                  <div class="form-row">
                    <div class="col-9 offset-1">
                      <input type="text" class="form-control bg-dark text-white tasks-checks" :name="`subtTask_${index}`" v-model="tasksList[index]">
                    </div>

                    <div class="col-2 text-center mt-3">
                      <font-awesome-icon class="ml-3 clickable sub-task-trash" icon="trash" @click="removeSubTask(index)"/>
                    </div>
                  </div>
                </div>

                <div class="form-row mt-4">
                  <div class="col-4 offset-1">
                    <button type="button" class="btn btn-block btn-sm btn-secondary" @click="addSubTask()">
                      Add task <font-awesome-icon class="clickable" icon="plus"/>
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

    <IconsModal/>
  </div>
</template>

<script>
  import IconsModal from '../views/Icons'

  export default {
    name: 'AddTask',
    data: () => {
      return {
        type: '',
        title: '',
        date: '',
        totalSteps: '',
        icon: '',
        tasksList: [""]
      }
    },
    components: {
      IconsModal
    },
    mounted: function () {
      this.$root.$on('bv::modal::shown', () => {
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
    methods: {
      add: function (e) {
        e.preventDefault()

        if (this.type === 'tasks') {
          let cleanedList = this.tasksList.filter(item => item)

          if(!cleanedList.length) {
            this.$swal.fire({
              icon: 'error',
              title: 'You must add at least one task',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            })
            return
          }
          
          this.tasksList = cleanedList
        }
        
        let newTask = {
          type: this.type, 
          title: this.title, 
          date: this.date, 
          totalSteps: this.totalSteps, 
          icon: this.icon, 
          tasksList: this.tasksList
        }
        
        this.hideForm()
        this.$refs['modal-add'].hide()
        console.log(newTask)
        
        this.$swal.fire({
          icon: 'success',
          title: 'Goal added successfully',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        })
      },
      close: function () {
        this.hideForm()
        this.$refs['modal-add'].hide()
      },
      showForm: function (type) {
        this.type = type
      },
      hideForm: function () {
        this.type = ''
        this.tasksList = ['']
      },
      addSubTask: function () {
        this.tasksList.push('')
      },
      removeSubTask: function (index) {
        this.tasksList.splice(index, index+1)
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

  .tasks-checks {
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-radius: 0px;
  }

  .sub-task-trash:hover {
    color: #dc3545;
  }
</style>