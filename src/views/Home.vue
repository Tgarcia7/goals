<template>
  <main class="flex-shrink-0" role="main">
    <div class="container">

      <div class="tasks-container">
        <transition-group name="taskslist">
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
            :class="`main-task-row task_${task.id}`"/>
      </transition-group>
      
        <div v-if="tasks.length && tasks.length > 6" class="text-muted mt-2 text-center">
          <p><small>Fin de la lista</small></p>
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
        
        this.$set(this.tasks, idxFound, editedTask)
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
              resultDate = outdated ? '1 mes' : 'Próximo mes'
            } else {
              resultDate = `${diffMonths} meses`
            }

            formated = true
          }

          // Weeks 
          if (!formated && diffWeeks <= 4 && diffWeeks > 0) {
            if (diffWeeks === 1) {
              resultDate = outdated ? '1 semana' : 'Próxima semana'
            } else {
              resultDate = `${diffWeeks} semanas`
            }
            
            formated = true
          }

          // Days
          if (!formated && diffDays <= 6) {
            if (diffDays === 1) {
              resultDate = outdated ? '1 día' : 'Mañana'
            } else {
              resultDate = diffDays === 0 ? 'Hoy' : `${diffDays} días`
            }

            formated = true
          }

          // Full date (is too away)
          if (!formated) {
            resultDate = this.$moment(taskDate).format('DD/MM/YY')
          }

          // If the date has passed
          if (outdated) {
            resultDate = `${resultDate} tarde`
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
            'La meta no ha sido completada', '¿Desea moverla de todas formas?')

          if(!response.value) return
        } 

        editedTask.progress = location
        editedTask.dateCompleted = this.$moment(Date()).format('YYYY-MM-DD')
        
        this.$set(this.tasks, idxFound, editedTask)
        this.tasks.splice(idxFound, 1)

        let locationText = location === 'done' ? 'hecho' : 'en proceso'
        this.$refs.swal.toast('success', `Movido a ${locationText}`)
      },
      archive: function (idElement) {
        let editedTask = this.tasks.find( element => element.id === idElement ),
            idxFound = this.tasks.indexOf( editedTask )

        editedTask.status = 0
        
        this.$set(this.tasks, idxFound, editedTask)
        this.tasks.splice(idxFound, 1)

        this.$refs.swal.toast('success', 'Meta archivada')
      }
    }
  }
</script>

<style scoped>
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
</style>