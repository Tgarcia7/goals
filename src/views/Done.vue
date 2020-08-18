<template>
  <main class="flex-shrink-0" role="main">
    <div class="container">

      <div class="tasks-container">

        <div v-if="!tasks.length && !loading & loading !== null" class="empty">
          <font-awesome-icon icon="tasks" size="8x"/>
          <h5 class="mt-3">Aquí se desplegarán tus metas completadas</h5>
        </div>

        <div class="form-row loading-container" v-if="loading">
          <div class="col mx-auto">
            <div class="spinner-border" role="status">
              <span class="sr-only">Cargando...</span>
            </div>
          </div>
        </div>

        <transition-group name="taskslist" v-else>
          <Task v-for="(task) in tasks" 
            :key="task.id" 
            :id="task.id" 
            :icon="task.icon"
            :title="task.title"
            :date="`Hecho ${formatCompletedDate(task.dateCompleted)}`"
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
  import api from '../services/api'
  import ViewTask from '../views/ViewTask.vue'
  import Swal from '../services/Swal.vue'
  import TaskMixin from '../mixins/TaskMixin'

  export default {
    name: 'Home',
    mixins: [TaskMixin],
    data: () => {
      return {
        tasks: [],
        selectedTask: {},
        loading: null
      }
    },
    created: async function () {
      const loadingTimeout = this.initLoader()
      
      try {
        const goals = await api.getGoals()
        this.tasks = goals.filter( item => item.progress === 'done' && item.status === 1 )
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
      ViewTask,
      Swal
    }
  }
</script>