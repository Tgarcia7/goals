<template>
  <main class="flex-shrink-0" role="main">
    <div class="container">

      <div class="tasks-container">
        <transition-group name="list">
          <Task v-for="(task) in tasks" 
            :key="task.id" 
            :id="task.id" 
            :icon="task.icon"
            :title="task.title"
            :date="formatDate(task.date)"
            :progress="task.progress"
            :status="task.status"
            :objectiveDone="task.objectiveDone"
            :objectiveTotal="task.objectiveTotal"
            :type="task.type"
            :stepsList="task.stepsList"
            @viewTask="viewTask(task, false)"
            @viewSubTask="viewTask(task, true)"
            @upDownObjective="upDownObjective"
            @moveTo="moveTo"
            @archive="archive"
            :class="`main-task-row task_${task.id} list-task`"/>
      </transition-group>
      
        <div v-if="tasks.length && tasks.length > 6" class="text-muted mt-2 text-center">
          <p><small>End of list</small></p>
        </div>
      </div>

      <button type="button" class="btn btn-success btn-circle btn-lg btn-add" 
        v-b-modal.modal-add @click="cleanSelected">
        <font-awesome-icon icon="plus"/>
      </button>
    </div>
    
    <AddTask @saveTask="saveTask"/>

    <EditTask 
      :id="this.selectedTask.id" 
      :icon="this.selectedTask.icon"
      :title="this.selectedTask.title"
      :date="this.selectedTask.date"
      :progress="this.selectedTask.progress"
      :status="this.selectedTask.status"
      :objectiveDone="this.selectedTask.objectiveDone"
      :objectiveTotal="this.selectedTask.objectiveTotal"
      :type="this.selectedTask.type"
      :stepsList="this.selectedTask.stepsList"
      :selected="true"
      :tasksOnly="this.tasksOnly"
      @saveEditedTask="saveEditedTask"/>

    <Swal ref="swal"/>

  </main>
</template>

<script>
  import Task from '../components/Task.vue'
  import tasksData from "../assets/tasks.json"
  import AddTask from "../views/AddTask.vue"
  import EditTask from "../views/EditTask.vue"
  import Swal from "../services/Swal.vue"

  export default {
    name: 'Home',
    data: () => {
      return {
        tasks: tasksData.filter( item => item.progress === 'doing' && item.status === 1 ),
        selectedTask: {}, 
        tasksOnly: false
      }
    },
    components: {
      Task,
      AddTask,
      EditTask,
      Swal
    },
    methods: {
      viewTask: function (task, subTasksOnly) {
        this.tasksOnly = subTasksOnly
        this.selectedTask = task
        this.markSelected(task)

        this.$bvModal.show('modal-edit')
      }, 
      saveTask: function (newTask) {
        // Calculates next id. Must come from db
        newTask.id = this.tasks[this.tasks.length-1].id + 1

        this.$set(this.tasks, this.tasks.length, newTask)
      }, 
      saveEditedTask: function (editedTask) {
        let idxFound = this.tasks.findIndex( element => element.id === editedTask.id )

        this.$set(this.tasks, idxFound, editedTask)
      },
      upDownObjective: function (idElement, doneUpdated) {
        this.cleanSelected()
        let editedTask = this.tasks.find( element => element.id === idElement ),
            idxFound = this.tasks.indexOf( editedTask )

        editedTask.objectiveDone = doneUpdated

        let updatedTask = Object. assign({}, editedTask)
        
        this.$set(this.tasks, idxFound, updatedTask)
      },
      formatDate: function (stringDate){
        if (!stringDate) return null

        let taskDate = this.$moment(stringDate).startOf('day'),
          today = this.$moment().startOf('day'),
          diffMonths = this.$moment(taskDate).diff(today, 'months'),
          diffWeeks = this.$moment(taskDate).diff(today, 'weeks'),
          diffDays = this.$moment(taskDate).diff(today, 'days'),
          resultDate = stringDate,
          formated = false,
          outdated = diffDays < 0 ? true : false

          diffMonths = Math.abs(diffMonths)
          diffWeeks = Math.abs(diffWeeks)
          diffDays = Math.abs(diffDays)

          // Months 
          if (diffMonths <= 4 && diffMonths > 0) {
            if (diffMonths === 1) {
              resultDate = outdated ? '1 month' : 'Next month'
            } else {
              resultDate = `${diffMonths} months`
            }

            formated = true
          }

          // Weeks 
          if (!formated && diffWeeks <= 4 && diffWeeks > 0) {
            if (diffWeeks === 1) {
              resultDate = outdated ? '1 week' : 'Next week'
            } else {
              resultDate = `${diffWeeks} weeks`
            }
            
            formated = true
          }

          // Days
          if (!formated && diffDays <= 6) {
            if (diffDays === 1) {
              resultDate = outdated ? '1 day' : 'Tomorrow'
            } else {
              resultDate = diffDays === 0 ? 'Today' : `${diffDays} days`
            }

            formated = true
          }

          // Full date (is too away)
          if (!formated) {
            resultDate = this.$moment(taskDate).format('DD/MM/YY')
          }

          // If the date has passed
          if (outdated) {
            resultDate = `${resultDate} late`
          }

        return resultDate
      },
      markSelected: function (task) {
        this.cleanSelected()

        let element = document.querySelector(`.task_${task.id}`)
        element.classList.add('task-selected')
      },
      cleanSelected: function () {
        let elems = document.querySelectorAll(".main-task-row");

        [].forEach.call(elems, el => {
            el.classList.remove("task-selected")
        })
      },
      moveTo: async function (idElement, location) {
        let editedTask = this.tasks.find( element => element.id === idElement ),
            idxFound = this.tasks.indexOf( editedTask )

        if (editedTask.objectiveDone < editedTask.objectiveTotal) {
          let response = await this.$refs.swal.regular('question', 
            'You have not complete the goal', 'Would you like to move it anyway?')

          if(!response.value) return
        } 

        editedTask.progress = location
        editedTask.dateCompleted = this.$moment(Date()).format('YYYY-MM-DD')
        
        this.$set(this.tasks, idxFound, editedTask)
        this.tasks.splice(idxFound, 1)

        this.$refs.swal.toast('success', `Moved to ${location}`)
      },
      archive: function (idElement) {
        let editedTask = this.tasks.find( element => element.id === idElement ),
            idxFound = this.tasks.indexOf( editedTask )

        editedTask.status = 0
        
        this.$set(this.tasks, idxFound, editedTask)
        this.tasks.splice(idxFound, 1)

        this.$refs.swal.toast('success', 'Goal archived')
      }
    }
  }
</script>

<style>
  .btn-circle.btn-lg {
    width: 45px;
    height: 45px;
    padding: 0px 10px;
    border-radius: 50%;
    box-shadow: 0px 0px 6px #797979;
  } 

  .btn-add {
    position: fixed;
    bottom: 3.5em;
    right: 1em;
  }

  .tasks-container {
    margin-bottom: 150px;
  }

  .task-selected {
    background-color: #2a3036;
  }

  .main-task-row {
    padding-left: 6px;
  }

  .b-form-spinbutton.form-control .btn {
    color: white !important;
  }

  /* 
    ##Device = Desktops
    ##Screen = 1281px to higher resolution desktops
  */
  @media (min-width: 1281px) {
    .btn-add {
      position: fixed;
      bottom: 3.5em;
      right: 20.5em;
    }
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }

  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .flip-list-move {
    transition: transform 1s;
  }
</style>