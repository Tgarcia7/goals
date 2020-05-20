<script>
  export default {
    methods: {
      formatDoingDate: function(stringDate) {
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
      formatCompletedDate: function (stringDate){
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
        let elems = document.querySelectorAll('.main-task-row');

        [].forEach.call(elems, el => {
          el.classList.remove('task-selected')
        })
      },
      moveTo: async function (idElement, location) {
        let editedTask = this.tasks.find( element => element.id === idElement ),
            idxFound = this.tasks.indexOf( editedTask )

        if(editedTask.progress === 'doing') {
          if (editedTask.objectiveDone < editedTask.objectiveTotal) {
            let response = await this.$refs.swal.regular('question', 
                                                         'La meta no ha sido completada', '¿Desea moverla de todas formas?')

            if(!response.value) return
          } 

          editedTask.dateCompleted = this.$moment(this.$moment()).format('YYYY-MM-DD')
        } else {
          editedTask.dateCompleted = null
        }
        editedTask.progress = location
        
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
      }
    }
  }
</script>