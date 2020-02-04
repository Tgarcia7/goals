<template>
  <div>
    <div class="row task-row text-secondary">
      <div class="col-2">
        <div class="circle">
          <font-awesome-icon :icon="icon"/>
        </div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col">
            <h6 class="text-left">{{ title }}</h6>
          </div>
          <div class="col-4 text-right">
            <h6>
              <small>{{ date }}</small>
            </h6>
          </div>
        </div>
        <div class="row">
          <div class="col-7">
            <div class="progress" style="height: 5px;" v-show="progressBar === 1">
              <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" 
                :style="barStyle" :aria-valuenow="barWidth" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
          <div class="col text-right" v-show="measure !== ''">
             <p><small>{{ from }} / {{ to }} {{ measure }}</small></p>
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
        'type', 
        'status', 
        'progress',
        'from',
        'to',
        'measure',
        'progressBar'
    ],
    data: function () {
      return {
        barStyle: this.generateStyle(), 
        barWidth: this.generateWidth(), 
      }
    },
    methods: {
      generateStyle: function () {
        if(!this.from) return `width: 0px;`
        let progressPercentage = this.from / this.to * 100
        console.log(progressPercentage)
        return `width: ${progressPercentage}px;`
      },
      generateWidth: function () {
        if(!this.from) return 0
        return this.from / this.to * 100
      }
    }
  }
</script>

<style>
  .task-row {
    height: 75px;
    padding-top: 20px;
  }

  .circle {
    width: 36px;
    height: 36px;
    padding: 6px 6px;
    border-radius: 50%;
    box-shadow: 0px 0px 2px #888;
  }

  .divider {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
    border: 1 !important;
    border-top: 1px solid rgb(53, 51, 51);
    width: 87%;
  }

  .progress {
    margin-top: 11px;
  }
</style>