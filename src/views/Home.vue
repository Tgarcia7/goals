<template>
  <main class="flex-shrink-0" role="main">
    <div class="container">

      <Task v-for="task in tasks" 
        :key="task.id" 
        :icon="task.icon"
        :title="task.title"
        :date="task.date"
        :progress="task.progress"
        :status="task.status"
        :from="task.from"
        :to="task.to"
        :type="task.type"/>

      <button type="button" class="btn btn-success btn-circle btn-lg btn-add">
        <font-awesome-icon icon="plus"/>
      </button>

    </div>
  </main>
</template>

<script>
  import Task from '../components/Task.vue'
  import tasksData from "../assets/tasks.json"

  export default {
    name: 'Home',
    components: {
      Task
    },
    data: () => {
      return {
        tasks: tasksData.list
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
</style>