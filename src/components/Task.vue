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
      @click="editableArea ? edit() : ''" v-if="!showCompletedMsg">
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
          <div class="col-4" v-if="type === 'objective' && progress === 'doing' && status">
            <small>
              <span class="badge badge-dark btn-tasks btns-up-down clickable" @click="upDownObjective('up')">
                  <font-awesome-icon icon="chevron-up" size="lg"/>
                </span>
            </small>
          </div>
          <div class="col-4 clickable action-restore" @click="restore()" v-else-if="type === 'simple' && !status">
            <font-awesome-icon icon="reply" size="lg"/>
          </div>
        </div>
        <div class="row" v-if="type !== 'simple'">
          <div class="col clickable" @click="edit()">
            <b-progress :value="barWidth" :variant="barColor" striped :height="'7px'" :animated="true" :max="100"></b-progress>
          </div>
          <div class="col-4" v-if="status">
            <small v-if="type === 'objective' || progress === 'done'">{{ objectiveDone || 0 }} / {{ objectiveTotal || 0 }}</small>
            <span v-else-if="type === 'steps' && progress === 'doing'" class="badge badge-dark btn-tasks clickable" @click="editSubTasks()">
              <font-awesome-icon icon="tasks" size="lg"/>
            </span>
          </div>
          <div class="col-4 clickable action-restore" @click="restore()" v-else>
            <font-awesome-icon icon="reply" size="lg"/>
          </div>
        </div>
        <div class="row">
          <div class="col text-left clickable" @click="edit()">
            <small :class="date && date.includes('tarde') ? 'text-muted' : ''" v-if="status"> 
              <font-awesome-icon :icon="['far', 'clock']" v-if="date && date.includes('tarde')"/>
              {{ date }} 
            </small>
          </div>
          <div class="col-4" v-if="status">
            <small v-if="type === 'objective' && progress === 'doing'">
              <span class="badge badge-dark btn-tasks btns-up-down clickable" @click="upDownObjective('down')">
                <font-awesome-icon icon="chevron-down" size="lg"/>
              </span>
            </small>
            <small v-else-if="type === 'steps' && progress === 'doing'">{{ objectiveDone || 0 }} / {{ objectiveTotal || 0 }}</small>
          </div>
          <div class="col-4 clickable" @click="restore()" v-else>
            <small>Restaurar</small>
          </div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div :class="`${taskClasses} task-main-content ${editableArea ? 'clickable' : ''}`" 
        v-if="showCompletedMsg">
        <div class="col-12 my-auto">
          <span v-html="this.messages[this.randomIdx]"></span>
        </div>
      </div>
    </transition>

    <hr class="divider">
  </div>
</template>

<script>
  import Utils from '../mixins/Utils'

  export default {
    name: 'Task',
    mixins: [Utils],
    props: {
      id: { type: String, required: true }, 
      icon: { type: Array, required: true }, 
      title: { type: String, required: true }, 
      date: { type: String, default: '' },  
      status: { type: Number, default: 1, validator: val => [1, 0].includes(val) }, 
      progress: { type: String, required: true, validator: val => ['doing', 'done'].includes(val) },
      objectiveDone: { type: Number, default: 0 },
      objectiveTotal: { type: Number, default: 0 },
      type: { type: String, required: true, validator: val => ['steps', 'objective', 'simple'].includes(val) },
      stepsList: { type: Array }
    },
    data: function () {
      return { 
        showCompletedMsg: false,
        messages: [
          '<span class="success-msg">¡Felicidades!</span> 🎉 Meta alcanzada',
          '¡Estás en llamas! 🔥🔥🔥', 
          '<span class="success-msg">¡Impresionante!</span> Lo has logrado 🎯', 
          '¡Hoy es tu día! 🌤 Bien hecho', 
          '¡Buen trabajo! Sigue tus metas 🎖', 
          '¡Genial! Objetivo alcanzado 🏆', 
          '¡Sorprendente! Meta alcanzada 🏅', 
          '¡Imparable! Meta cumplida 🚀', 
          '<span class="success-msg">¡Felicidades!</span> 🎊 Lo has conseguido', 
          '¡No te detengas! Lo estás haciendo bien 👏🏽', 
          'Siempre parece imposible hasta que se hace 🎯', 
          'Si lo puedes soñar, lo puedes lograr 💭', 
          'Pequeñas acciones diarias traen grandes resultados 📈', 
          'Todos pueden alcanzar el éxito pero pocos se atreven 💪🏼',
          'La pregunta no es quién va a dejarme, es quién va a detenerme 🏋🏾‍♂️',
          '¡Excelente! Un paso más cerca 🥾',
          'Cuanto más trabajo, más suerte parece que tengo 🍀'
        ],
        randomIdx: 0
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
        if (this.isApp() && this.status === 1 && !this.showCompletedMsg) {
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
        let to = this.progress === 'done' ? 'doing' : 'done',
            vm = this

        if (to === 'done' && 
          ( this.objectiveDone >= this.objectiveTotal || !this.objectiveTotal )) {
          this.showCompletedMsg = true
          
          setTimeout(() => { vm.$emit('moveTo', this.id, to) }, 3000)
        } else {
          this.$emit('moveTo', this.id, to)
        }

      },
      archive: function () {
        this.$emit('archive', this.id)
      },
      restore: function () {
        this.$emit('restore', this.id)
      }
    },
    mounted: function () {
      this.startTimer()
      this.initListeners()

      this.randomIdx = this.getRandomInt(0, this.messages.length-1)
    }, 
    updated: function () {
      // activate done btn
      if (this.objectiveDone === this.objectiveTotal && !this.showCompletedMsg) {
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
    left: 100px;
    position: relative;
  }

  .active-left div.task-main-content {
    right: 100px;
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
      width: 100px;
      right: 140px;
      z-index: 10;
      display: none;
    }

    .action-left {
      position: absolute; 
      width: 100px;
      right: 240px;
      z-index: 10;
      display: none;
      border-right: 3px solid black;
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
      width: 100px;
      transition: all 0.1s ease 0s;
      left: -100px;
    }

    .active-right div.action-right {
      transition: all 0.3s ease 0s;
      left: 0px;
    }

    .action-left {
      position: absolute; 
      width: 100px;
      transition: all 0.1s ease 0s;
      right: -100px;
    }

    .active-left div.action-left {
      transition: all 0.3s ease 0s;
      right: 0px;
    }
  }

  .action-restore:hover {
    color: #17a2b8;
  }

  .fade-enter-active {
    transition: all .7s ease;
  }
  
  .fade-enter, .fade-leave {
    opacity: 0;
    transform: translateY(-50px);
  }

  .task-main-content {
    border-radius: 8px;
    z-index: 100;
    background: #1e242a;
    padding-left: 8px;
    padding-right: 8px;
  }
</style>

<style>
  .success-msg {
    animation: color-change 4s infinite;
  }

  @keyframes color-change {
    0% { color: rgb(237, 105, 105); }
    33% { color: rgb(208, 105, 237); }
    66% { color: rgb(127, 127, 238); }
    100% { color: rgb(237, 105, 105); }
  }
</style>