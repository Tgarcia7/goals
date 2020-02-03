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
          <div class="col-3">
            <h6>
              <small>{{ date }}</small>
            </h6>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="progress" style="height: 5px;">
              <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" 
                :style="barStyle" :aria-valuenow="barWidth" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
          <div class="col">
            <!--Otros-->
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
    props: ['id', 'icon', 'title', 'date', 'type', 'status', 'progress', 'barStyle', 'barWidth']
  }
</script>

<style>
  .task-row {
    height: 75px;
    padding-top: 20px;
  }

  .circle {
    width: 35px;
    height: 35px;
    padding: 5px;
    border-radius: 35px;
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
    margin-top: 8px;
  }
</style>