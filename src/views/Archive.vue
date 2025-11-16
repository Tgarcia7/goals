<template>
  <main class="flex-shrink-0" role="main">
    <div class="container task-list-container">

      <div class="tasks-container">
        <transition name="fade-empty">
          <div v-if="!tasks.length && !loading && loading !== null" class="empty">
            <font-awesome-icon icon="archive" size="8x"/>
            <h3 class="mt-3">¡Archivo vacío!</h3>
            <h5>No tienes metas archivadas</h5>
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
            :date="task.date"
            :progress="task.progress"
            :status="task.status"
            :objectiveDone="task.objectiveDone"
            :objectiveTotal="task.objectiveTotal"
            :type="task.type"
            :stepsList="task.stepsList"
            @viewTask="viewTask(task, false)"
            @restore="restore"
            :class="`main-task-row task_${task.id}`"/>
      </transition-group>
      
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
  import Api from '../services/api'
  import Swal from '../services/Swal.vue'
  import TaskMixin from '../mixins/TaskMixin'
  import ViewTask from '../views/ViewTask.vue'

  export default {
    name: 'Home',
    mixins: [TaskMixin],
    data: function () {
      return {
        tasks: [],
        selectedTask: {},
        loading: null
      }
    },
    created: async function () {
      const loadingTimeout = this.initLoader()

      try {
        const goals = await Api.getGoals()
        this.tasks = goals.filter( item => item.status === 0 )
      } catch (error) {
        console.error(error)
      }
      
      this.stopLoader(loadingTimeout)
    },
    methods: {
      initLoader: function () {
        const vm = this
        return setTimeout(() => { vm.loading = true }, 1500)
      },
      stopLoader: function (loadingTimeout) {
        clearTimeout(loadingTimeout)
        this.loading = false
      }
    },
    components: {
      Task,
      Swal,
      ViewTask
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
    transition: opacity 1s ease;
    transition-delay: .5s;
  }

  .fade-empty-enter, .fade-empty-leave-to {
    opacity: 0;
  }
</style>