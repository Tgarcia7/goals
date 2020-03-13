<template>
  <main class="flex-shrink-0" role="main">
    <div class="container">

      <Task v-for="task in tasks" 
        :key="task.id" 
        :id="task.id" 
        :icon="task.icon"
        :title="task.title"
        :date="task.date"
        :progress="task.progress"
        :status="task.status"
        :stepsDone="task.stepsDone"
        :totalSteps="task.totalSteps"
        :type="task.type"
        @editTask="editTask(task)"/>

      <button type="button" class="btn btn-success btn-circle btn-lg btn-add" v-b-modal.modal-add>
        <font-awesome-icon icon="plus"/>
      </button>
    </div>
    
    <AddTask/>
    <EditTask 
      :id="this.selectedTask.id" 
      :icon="this.selectedTask.icon"
      :title="this.selectedTask.title"
      :date="this.selectedTask.date"
      :progress="this.selectedTask.progress"
      :status="this.selectedTask.status"
      :stepsDone="this.selectedTask.stepsDone"
      :totalSteps="this.selectedTask.totalSteps"
      :type="this.selectedTask.type"
      :selected="true"/>
  </main>
</template>

<script>
  import Task from '../components/Task.vue'
  import tasksData from "../assets/tasks.json"
  import AddTask from "../views/AddTask"
  import EditTask from "../views/EditTask"

  export default {
    name: 'Home',
    data: () => {
      return {
        tasks: tasksData.list,
        selectedTask: {}
      }
    },
    components: {
      Task,
      AddTask,
      EditTask
    },
    methods: {
      editTask: function (task) {
        this.selectedTask = task
        this.$bvModal.show('modal-edit')
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