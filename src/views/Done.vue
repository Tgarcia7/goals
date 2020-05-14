<template>
  <main class="flex-shrink-0" role="main">
    <div class="container">

      <div class="tasks-container">
        <Task v-for="(task) in tasks" 
          :key="task.id" 
          :id="task.id" 
          :icon="task.icon"
          :title="task.title"
          :date="'Hecho ' + formatDate(task.dateCompleted)"
          :progress="task.progress"
          :status="task.status"
          :objectiveDone="task.objectiveDone"
          :objectiveTotal="task.objectiveTotal"
          :type="task.type"
          :stepsList="task.stepsList"
          :dateCompleted="task.dateCompleted"
          @viewTask="viewTask(task)"
          @moveTo="moveTo"
          @archive="archive"
          :class="`main-task-row task_${task.id}`"/>
      
        <div v-if="tasks.length && tasks.length > 6" class="text-muted mt-2 text-center">
          <p><small>Fin de la lista</small></p>
        </div>
      </div>

    </div>

    <ViewTask 
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
      :dateCompleted="this.selectedTask.dateCompleted"
      :selected="true"/>

    <Swal ref="swal"/>

  </main>
</template>

<script>
  import Task from '../components/Task.vue'
  import tasksData from "../assets/tasks.json"
  import ViewTask from "../views/ViewTask.vue"
  import Swal from "../services/Swal.vue"

  export default {
    name: 'Home',
    data: () => {
      return {
        tasks: tasksData.filter( item => item.progress === 'done' && item.status === 1 ),
        selectedTask: {}
      }
    },
    components: {
      Task,
      ViewTask,
      Swal
    },
    methods: {
      viewTask: function (task) {
        this.selectedTask = task
        this.markSelected(task)

        this.$bvModal.show('modal-view')
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

          if (outdated) {
            diffMonths = Math.abs(diffMonths)
            diffWeeks = Math.abs(diffWeeks)
            diffDays = Math.abs(diffDays)

            // Months 
            if (diffMonths <= 4 && diffMonths > 0) {
              resultDate = diffMonths === 1 ? '1 mes' : `${diffMonths} meses`

              formated = true
            }

            // Weeks 
            if (!formated && diffWeeks <= 4 && diffWeeks > 0) {
              resultDate = diffWeeks === 1 ? '1 semana' : `${diffWeeks} semanas`
              
              formated = true
            }

            // Days
            if (!formated && diffDays <= 6) {
              resultDate = diffDays === 1 ? 'ayer' : `${diffDays} días`

              formated = true
            }

            resultDate = diffDays > 1 ? `hace ${resultDate}` : resultDate
          } else {
            // Full date (is too away)
            resultDate = diffDays === 0 ? 'hoy' : this.$moment(taskDate).format('DD/MM/YY')  
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
      moveTo: function (idElement, location) {
        let editedTask = this.tasks.find( element => element.id === idElement ),
            idxFound = this.tasks.indexOf( editedTask )

        editedTask.progress = location
        editedTask.dateCompleted = null
        
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

<style>
  .tasks-container {
    margin-bottom: 150px;
  }

  .task-selected {
    background-color: #2a3036;
  }

  .main-task-row {
    padding-left: 6px;
  }
</style>