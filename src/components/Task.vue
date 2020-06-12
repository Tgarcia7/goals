<template>
  <div :class="`task_${this.id} task-row disable-selection mx-auto`"
    @click="clearSwipe('active-right'); clearSwipe('active-left');" 
    v-hammer:swipe.horizontal="onSwipe">

    <div :class="`${actionClasses} actions bg-danger action-right text-white text-center clickable`"
      @click="archive()">
      <font-awesome-icon :icon="['fas', 'archive']"/>
      <p><small>Archivar</small></p>
    </div>

    <div :class="`${this.progress === 'done' ? 'bg-info' : 'bg-success'} 
      ${actionClasses} actions action-left text-white text-center clickable`"
      @click="moveTo()">
      <font-awesome-icon :icon="this.progress === 'done' ? ['fas', 'tasks'] : ['fas', 'check']"/>
      <p><small>{{ this.progress === 'done' ? 'En proceso' : 'Hecho' }}</small></p>
    </div>

    <div :class="`${taskClasses} task-main-content ${editableArea ? 'clickable' : ''}`"
      @click="editableArea ? edit() : ''">
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
          <div class="col-4" v-if="type === 'objective' && progress === 'doing'">
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
            <small v-if="type === 'objective' || progress === 'done'">{{ objectiveDone }} / {{ objectiveTotal }}</small>
            <span v-else-if="type === 'steps' && progress === 'doing'" class="badge badge-dark btn-tasks clickable" @click="editSubTasks()">
              <font-awesome-icon icon="tasks" size="lg"/>
            </span>
          </div>
        </div>
        <div class="row">
          <div class="col text-left clickable" @click="edit()">
            <small :class="date && date.includes('tarde') ? 'text-muted' : ''"> 
              <font-awesome-icon :icon="['far', 'clock']" v-if="date && date.includes('tarde')"/>
              {{ date }} 
            </small>
          </div>
          <div class="col-4">
              <small v-if="type === 'objective' && progress === 'doing'">
                <span class="badge badge-dark btn-tasks btns-up-down clickable" @click="upDownObjective('down')">
                  <font-awesome-icon icon="chevron-down" size="lg"/>
                </span>
              </small>
              <small v-else-if="type === 'steps' && progress === 'doing'">{{ objectiveDone }} / {{ objectiveTotal }}</small>
          </div>
        </div>
      </div>
    </div>

    <hr class="divider">
  </div>
</template>

<script>
  import Utils from '../mixins/Utils'

  export default {
    name: 'Task',
    mixins: [Utils],
    props: {
      id: { type: Number, required: true }, 
      icon: { type: Array, required: true }, 
      title: { type: String, required: true }, 
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
      actionClasses: function () {
        let classes = ''
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
        } else {
          return
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
      },
      swipeRight: function (event) {
        let task = event.target.closest('.task-row')

        if( task && task.classList.contains('active-left')) {
          task.classList.remove('active-left')
        } else {
          task.classList.add('active-right')
        }
      },
      swipeLeft: function (event) {
        let task = event.target.closest('.task-row')
        if( task && task.classList.contains('active-right')) {
          task.classList.remove('active-right')
        } else {
          task.classList.add('active-left')
        }
      },
      onSwipe: function (event) {
        if (this.isApp()) {
          if (event.type === 'swiperight') {
            this.swipeRight(event)
          } else if (event.type === 'swipeleft') {
            this.swipeLeft(event)
          }
        }
      },
      initListeners: function () {
        this.scrollListener()
      },
      clearSwipe: function (selector) {
        let elems = document.querySelectorAll(`.${selector}`);

        [].forEach.call(elems, el => {
          el.classList.remove(selector)
        })
      },
      scrollListener: function () {
        let vm = this
        window.onscroll = function () {  
          let elementRight = document.querySelector('.active-right')
          let elementLeft = document.querySelector('.active-left')

          if (elementRight) vm.clearSwipe('active-right')
          if (elementLeft) vm.clearSwipe('active-left')
        }
      },
      moveTo: function () {
        let to = this.progress === 'done' ? 'doing' : 'done'
        this.$emit('moveTo', this.id, to)
      },
      archive: function () {
        this.$emit('archive', this.id)
      }
    },
    mounted: function () {
      this.startTimer()
      this.initListeners()
    }, 
    updated: function () {
      // activate done btn
      if (this.objectiveDone === this.objectiveTotal) {
        let task = document.querySelector(`.task_${this.id}`)
        setTimeout(() => { task.classList.add('active-left') }, 500)
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

  .task-row-complete.actions {
    padding-top: 20px;
  }

  .active-right div.task-main-content {
    left: 85px;
    position: relative;
  }

  .active-left div.task-main-content {
    right: 85px;
    position: relative;
  }

  /* Allow vertical scrolling (for hammer.js)*/
  .task-row {
    touch-action: pan-y !important;
  }

  /* 
    Large devices (desktops, 992px and up)
  */

  @media (min-width: 992px) {
    .action-right {
      position: absolute; 
      width: 70px;
      right: 218px;
      z-index: 10;
      display: none;
    }

    .action-left {
      position: absolute; 
      width: 70px;
      right: 290px;
      z-index: 10;
      display: none;
    }

    .task-row:hover .action-left,.task-row:hover .action-right  {
      display: block;
    }

    .task-row {
      width: 80%;
    }
  }

  /* 
    Small devices (cellphones and tablets, 992px and down)
  */

  @media (max-width: 991px) {
    .task-row {
      overflow-x: hidden;
      overflow-y: hidden;
      position: relative;
    }

    .action-right {
      position: absolute; 
      width: 70px;
      transition: all 0.3s ease 0s;
      left: -85px;
    }

    .action-left {
      position: absolute; 
      width: 70px;
      transition: all 0.3s ease 0s;
      right: -85px;
    }

    .active-left div.action-left {
      transition: all 0.3s ease 0s;
      right: 0px;
    }

    .active-right div.action-right {
      transition: all 0.3s ease 0s;
      left: 0px;
    }
  }
</style>