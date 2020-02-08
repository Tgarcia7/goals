<template>
  <div class="task-row">
    <div :class="taskClasses">
      <div class="col-2">
        <div class="circle">
          <font-awesome-icon :icon="icon" size="lg"/>
        </div>
      </div>
      <div class="col-10">
        <div class="row">
          <div class="col text-truncate text-left">
            {{ title }}
          </div>
          <div class="col-4" v-if="type === 'times'">
             <small>
               <span class="badge badge-dark btn-tasks btns-up-down">
                  <font-awesome-icon icon="chevron-up" size="lg"/>
                </span>
             </small>
          </div>
        </div>
        <div class="row" v-if="type !== 'simple'">
          <div class="col">
            <div class="progress" style="height: 7px;">
              <div :class="barClasses" role="progressbar" 
                :style="barStyle" :aria-valuenow="barWidth" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
          <div class="col-4">
            <small v-if="type === 'times'">{{ from }} / {{ to }}</small>
            <span v-else-if="type === 'steps'" class="badge badge-dark btn-tasks">
              <font-awesome-icon icon="tasks" size="lg"/>
            </span>
          </div>
        </div>
        <div class="row">
          <div class="col text-left">
            <small>{{ date }}</small>
          </div>
          <div class="col-4">
              <small v-if="type === 'times'">
                <span class="badge badge-dark btn-tasks btns-up-down">
                  <font-awesome-icon icon="chevron-down" size="lg"/>
                </span>
              </small>
              <small v-else-if="type === 'steps'">{{ from }} / {{ to }}</small>
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
    props: [
        'id', 
        'icon', 
        'title', 
        'date',  
        'status', 
        'progress',
        'from',
        'to',
        'type'
    ],
    data: function () {
      return { 
        
      }
    },
    computed: {
      barWidth: function () {
        if(!this.from || !this.to) return 0

        return this.from / this.to * 100
      },
      barStyle: function () {
        return `width: ${this.barWidth}%;`
      },
      barClasses: function () {
        let classes = 'progress-bar progress-bar-striped progress-bar-animated'

        if(this.barWidth === 100) classes += ' bg-success'
        
        return classes
      },
      taskClasses: function () {
        let classes = 'row'

        classes += this.type === 'simple' ? ' task-row-min' : ' task-row-complete'
        
        return classes
      }
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
    padding: 10px;
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
</style>