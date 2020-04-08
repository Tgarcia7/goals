<template>
  <main class="flex-shrink-0" role="main">
    <div class="container">

      <div class="tasks-container">
        <Task v-for="(task, index) in tasks" 
          :key="index" 
          :id="task.id" 
          :icon="task.icon"
          :title="task.title"
          :date="dateDisplayFormat(task.date)"
          :progress="task.progress"
          :status="task.status"
          :objectiveDone="task.objectiveDone"
          :objectiveTotal="task.objectiveTotal"
          :type="task.type"
          :stepsList="task.stepsList"
          @viewTask="viewTask(task, false)"
          @viewSubTask="viewTask(task, true)"
          @upDownObjective="upDownObjective"
          :class="`main-task-row task_${task.id}`"/>
      
        <div v-if="tasks.length" class="text-muted mt-2 text-center">
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
  </main>
</template>

<script>
  import Task from '../components/Task.vue'
  import tasksData from "../assets/tasks.json"
  import AddTask from "../views/AddTask.vue"
  import EditTask from "../views/EditTask.vue"

  export default {
    name: 'Home',
    data: () => {
      return {
        tasks: tasksData,
        selectedTask: {}, 
        tasksOnly: false
      }
    },
    components: {
      Task,
      AddTask,
      EditTask
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
      dateDisplayFormat: function (stringDate){
        if (!stringDate) return null

        let tempDate = stringDate.split(/\D/g),
          formatedDate = [ tempDate[2], tempDate[1], tempDate[0].slice('-2') ].join('/')

        return formatedDate
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
</style>