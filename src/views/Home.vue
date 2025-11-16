<template>
  <main class="flex-shrink-0" role="main">
    <div class="container task-list-container">

      <div class="tasks-container">
        <transition name="fade-empty">
          <div v-if="!tasks.length && !loading && loading !== null" class="empty">
            <font-awesome-icon icon="cloud-sun" size="8x"/>
            <h3 class="mt-3">¡Todo listo!</h3>
            <h5>No tienes metas pendientes por realizar</h5>
          </div>
        </transition>

        <div class="form-row loading-container" v-if="loading">
          <div class="col mx-auto">
            <div class="spinner-border" role="status">
              <span class="sr-only">Cargando...</span>
            </div>
          </div>
        </div>

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
  import Api from '../services/api'
  import AddTask from '../views/AddTask.vue'
  import EditTask from '../views/EditTask.vue'
  import Swal from '../services/Swal.vue'
  import TaskMixin from '../mixins/TaskMixin'

  export default {
    name: 'Home',
    mixins: [TaskMixin],
    data: function () {
      return {
        tasks: [],
        selectedTask: {}, 
        tasksOnly: false,
        loading: null
      }
    },
    components: {
      Task,
      AddTask,
      EditTask,
      Swal
    },
    created: async function () {
      const loadingTimeout = this.initLoader()

      try {
        const goals = await Api.getGoals()
        this.tasks = goals.filter( item => item.progress === 'doing' && item.status === 1 )
      } catch (error) {
        console.error(error)
      }
      
      this.stopLoader(loadingTimeout)
    },
    methods: { 
      saveTask: async function (newTask) {
        try {
          let result = await Api.setGoal(newTask)
          newTask.id = result.goal._id

          this.$set(this.tasks, this.tasks.length, newTask)
          this.$refs.swal.toast('success', 'Meta agregada')
        } catch (error) {
          console.error(error)
        }
      }, 
      saveEditedTask: async function (editedTask) {
        try {
          await Api.updateGoal(editedTask)
          let idxFound = this.tasks.findIndex( element => element.id === editedTask.id )

          this.$set(this.tasks, idxFound, editedTask)
        } catch (error) {
          console.error(error)
        }
      },
      upDownObjective: async function (idElement, doneUpdated) {
        try {
          this.cleanSelected()
          let editedTask = this.tasks.find( element => element.id === idElement ),
              idxFound = this.tasks.indexOf( editedTask )

          editedTask.objectiveDone = doneUpdated
          await Api.updateGoal(editedTask)

          this.$set(this.tasks, idxFound, editedTask)
        } catch (error) {
          console.error(error)
        }
      },
      initLoader: function () {
        const vm = this
        return setTimeout(() => { vm.loading = true }, 1500)
      },
      stopLoader: function (loadingTimeout) {
        clearTimeout(loadingTimeout)
        this.loading = false
      }
    }
  }
</script>

<style scoped>
  .btn-circle.btn-lg {
    width: 56px;
    height: 56px;
    padding: 0;
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-lg), var(--shadow-glow-green);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition-all);
  }

  .btn-circle.btn-lg:hover {
    transform: scale(1.1) rotate(90deg);
    box-shadow: var(--shadow-xl), var(--shadow-glow-green);
  }

  .btn-circle.btn-lg:active {
    transform: scale(0.95);
  }

  .btn-add {
    position: fixed;
    bottom: 5em;
    right: 1.5em;
    z-index: var(--z-fixed);
  }

  /* Desktop positioning */
  @media (min-width: 1281px) {
    .btn-add {
      bottom: 5em;
      right: 8.5em;
    }
  }

  .fade-empty-enter-active {
    transition: opacity var(--transition-slower);
    transition-delay: 0.3s;
  }

  .fade-empty-enter, .fade-empty-leave-to {
    opacity: 0;
  }
</style>