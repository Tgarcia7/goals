<script>
  import Api from '../services/api'

  export default {
    methods: {
      formatDoingDate: function(stringDate) {
        if (!stringDate) return ''
        const goalDate = this.stringToDate(stringDate)

        let taskDate = this.$moment(goalDate).startOf('day'),
            today = this.$moment().startOf('day'),
            diffMonths = taskDate.diff(today, 'months'),
            diffWeeks = taskDate.diff(today, 'weeks'),
            diffDays = taskDate.diff(today, 'days'),
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
      formatCompletedDate: function (stringDate){
        if (!stringDate) return ''
        const goalDate = this.stringToDate(stringDate)

        let taskDate = this.$moment(goalDate).startOf('day'),
            today = this.$moment().startOf('day'),
            diffMonths = taskDate.diff(today, 'months'),
            diffWeeks = taskDate.diff(today, 'weeks'),
            diffDays = taskDate.diff(today, 'days'),
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
        let elems = document.querySelectorAll('.main-task-row');

        [].forEach.call(elems, el => {
          el.classList.remove('task-selected')
        })
      },
      moveTo: async function (idElement, location) {
        let editedTask = this.tasks.find( element => element.id === idElement ),
            idxFound = this.tasks.indexOf( editedTask )

        if (editedTask.progress === 'doing') {
          if (editedTask.objectiveDone < editedTask.objectiveTotal) {
            let response = await 
              this.$refs.swal.regular('question', 'La meta no ha sido completada', '¿Desea moverla de todas formas?')

            if(!response.value) return
          } 

          editedTask.dateCompleted = this.$moment().format('YYYY-MM-DD')
        } else {
          editedTask.dateCompleted = null
        }
        
        editedTask.progress = location
        
        try {
          await Api.updateGoal(editedTask)
          this.$set(this.tasks, idxFound, editedTask)
          this.tasks.splice(idxFound, 1)
        } catch (error) {
          console.error(error)
        }
      },
      archive: async function (idElement) {
        let editedTask = this.tasks.find( element => element.id === idElement ),
            idxFound = this.tasks.indexOf( editedTask )

        editedTask.status = 0
          
        try {
          await Api.updateGoal(editedTask)
          this.$set(this.tasks, idxFound, editedTask)
          this.tasks.splice(idxFound, 1)
        } catch (error) {
          console.error(error)
        }
      },
      restore: async function (idElement) {
        let editedTask = this.tasks.find( element => element.id === idElement ),
            idxFound = this.tasks.indexOf( editedTask )

        editedTask.status = 1
          
        try {
          await Api.updateGoal(editedTask)
          this.$set(this.tasks, idxFound, editedTask)
          this.tasks.splice(idxFound, 1)
        } catch (error) {
          console.error(error)
        }
      },
      viewTask: function (task, subTasksOnly) {
        let modal = 'modal-view'

        if (task.progress === 'doing') {
          this.tasksOnly = subTasksOnly
          modal = 'modal-edit'
        }

        this.selectedTask = task
        this.markSelected(task)

        this.$bvModal.show(modal)
      },
      stringToDate: function (stringDate) {
        const removeTime = stringDate.split('T')[0]
        const splitDate = removeTime.split('-')
        const date = new Date(splitDate[0], splitDate[1]-1, splitDate[2])

        return date
      } 
    }
  }
</script>