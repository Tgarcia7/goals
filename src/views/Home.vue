<template>
  <main class="flex-shrink-0" role="main">
    <div class="container">

      <div class="tasks-container">
        <transition name="fade-empty">
          <div v-if="!tasks.length" class="empty">
            <font-awesome-icon icon="check" size="8x"/>
            <h3 class="mt-3">¡Todo listo!</h3>
            <h5>No tienes metas pendientes por realizar</h5>
          </div>
        </transition>

        <transition-group name="taskslist">
          <Task v-for="(task) in tasks" 
            :key="task.id" 
            :id="task.id" 
            :icon="task.icon"
            :title="task.title"
            :date="formatDoingDate(task.date)"
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
  import tasksData from '../assets/tasks.json'
  import AddTask from '../views/AddTask.vue'
  import EditTask from '../views/EditTask.vue'
  import Swal from '../services/Swal.vue'
  import TaskMixin from '../mixins/TaskMixin'

  export default {
    name: 'Home',
    mixins: [TaskMixin],
    data: function () {
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
      saveTask: function (newTask) {
        // Calculates next id. Must come from db
        newTask.id = this.tasks.length ? this.tasks[this.tasks.length-1].id + 1 : 0

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
      right: 8.5em;
    }
  }

  .fade-empty-enter-active {
    transition: opacity 1s ease;
    transition-delay: .5s;
  }

  .fade-empty-enter, .fade-empty-leave-to {
    opacity: 0;
  }
</style>