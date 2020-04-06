<template>
  <div :class="`task-row disable-selection ${editableArea ? 'clickable' : ''}`" 
    @click="editableArea ? edit() : ''">
    <div :class="taskClasses">
      <div class="col-2 clickable" @click="edit()">
        <div class="circle">
          <font-awesome-icon :icon="icon" size="lg"/>
        </div>
      </div>
      <div class="col-10">
        <div class="row">
          <div class="col text-truncate text-left clickable" @click="edit()">
            {{ title }}
          </div>
          <div class="col-4" v-if="type === 'objective'">
             <small>
               <span class="badge badge-dark btn-tasks btns-up-down clickable" @click="upDownObjective('up')">
                  <font-awesome-icon icon="chevron-up" size="lg"/>
                </span>
             </small>
          </div>
        </div>
        <div class="row" v-if="type !== 'simple'">
          <div class="col clickable" @click="edit()">
            <b-progress :value="barWidth" :variant="barColor" striped :height="'7px'" :animated="true" :max="100"></b-progress>
          </div>
          <div class="col-4">
            <small v-if="type === 'objective'">{{ objectiveDone }} / {{ objectiveTotal }}</small>
            <span v-else-if="type === 'steps'" class="badge badge-dark btn-tasks clickable" @click="editSubTasks()">
              <font-awesome-icon icon="tasks" size="lg"/>
            </span>
          </div>
        </div>
        <div class="row">
          <div class="col text-left clickable" @click="edit()">
            <small>{{ date }}</small>
          </div>
          <div class="col-4">
              <small v-if="type === 'objective'">
                <span class="badge badge-dark btn-tasks btns-up-down clickable" @click="upDownObjective('down')">
                  <font-awesome-icon icon="chevron-down" size="lg"/>
                </span>
              </small>
              <small v-else-if="type === 'steps'">{{ objectiveDone }} / {{ objectiveTotal }}</small>
          </div>
        </div>
      </div>
    </div>

    <hr class="divider">
  </div>
</template>

<script>
  export default {
    name: 'Task',
    props: {
      id: {type: Number, required: true}, 
      icon: {type: Array, required: true}, 
      title: {type: String, required: true}, 
      date: String,  
      status: { type: Number, default: 1, validator: val => [1, 0].includes(val) }, 
      progress: { type: String, required: true, validator: val => ['doing', 'done'].includes(val) },
      objectiveDone: Number,
      objectiveTotal: Number,
      type: { type: String, required: true, validator: val => ['steps', 'objective', 'simple'].includes(val) },
      stepsList: { type: Array }
    },
    data: function () {
      return { 
        
      }
    },
    computed: {
      barWidth: {
        set: function () {

        },
        get: function () {
          if(!this.objectiveDone || !this.objectiveTotal) return 0

          return this.objectiveDone / this.objectiveTotal * 100
        }
      },
      barColor: function () {
        return this.barWidth === 100 ? 'success' : 'primary'
      },
      taskClasses: function () {
        let classes = 'row'
        classes += this.type === 'simple' ? ' task-row-min' : ' task-row-complete'
        
        return classes
      },
      editableArea: function () {
        return this.type === 'simple'
      }
    },
    methods: {
      upDownObjective: function (action) {
        let totalCompleted = this.objectiveDone
        if (action === 'up' && this.objectiveDone < this.objectiveTotal) {
          totalCompleted ++
        } else if (action === 'down' && this.objectiveDone > 0) {
          totalCompleted --
        }

        this.$emit('upDownObjective', this.id, totalCompleted)
      },
      startTimer: function () {
        let vue = this
        let timer = setInterval(function () {
          vue.barWidth += 10
          if (vue.barWidth >= vue.barWidth) clearInterval(timer)
        }, 100)
      },
      edit: function () {
        this.$emit('viewTask')
      },
      editSubTasks: function () {
        this.$emit('viewSubTask')
      }
    },
    mounted: function () {
      this.startTimer()
    }
  }
</script>

<style scoped>
  .task-row-complete {
    height: 90px;
    padding-top: 6px;
  }

  .task-row-complete .circle {
    margin-top: 15px;
  }

  .task-row-min {
    height: 60px;
    padding-top: 6px;
  }

  .task-row-min div.circle {
    margin-top: 2px;
  }

  .circle {
    width: 44px;
    height: 44px;
    padding-top: 11px;
    border-radius: 50%;
    box-shadow: 0px 0px 2px #aeb0b4;
  }

  .divider {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
    border: 1 !important;
    border-top: 1px solid rgb(53, 51, 51);
    width: 87%;
  }

  .btn-tasks {
    box-shadow: 0px 0px 3px #888;
  }

  .btns-up-down {
    width: 19px !important;
    height: 19px !important;
    padding: 3px !important;
    border-radius: 50% !important;
  }

  .progress {
    margin-top: 11px;
    margin-bottom: 5px;
  }

  .task-row {
    color: #aeb0b4 !important;
  }

  .disable-selection {
    user-select: none;
    -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer */
    -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
    -webkit-user-select: none; /* Chrome, Safari, and Opera */
    -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
  }
</style>