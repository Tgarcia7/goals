<template>
  <footer class="footer mt-auto py-2 bg-dark fixed-bottom" @click="cleanSelected">
    <div class="container">
      <div class="row text-white">
        <div class="col">
          <router-link to="/goals/" class="text-decoration-none">
            <font-awesome-icon icon="clipboard-list" size="lg"/>
            <br>
            <span>In progress</span>
          </router-link>
        </div>
        <div class="col">
          <router-link to="/goals/done" class="text-decoration-none">
            <font-awesome-icon icon="clipboard-check" size="lg"/>
            <br>
            <span>Done</span>
          </router-link>
        </div>
        <div class="col">
          <router-link to="/goals/statistics" class="text-decoration-none">
            <font-awesome-icon icon="chart-bar" size="lg"/>
            <br>
            <span>Statistics</span>
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
    methods: {
      cleanSelected: function () {
        let elems = document.querySelectorAll('.main-task-row');

        [].forEach.call(elems, el => {
            el.classList.remove('task-selected')
        })
      }
    }
}
</script>

<style scoped>
  a.exact-active {
    text-shadow: 0 0 3px #e1d7d4;
    color: white !important;
  }

  a.exact-active svg {
    filter: drop-shadow(0 0 3px #aaa3a1)
  }
  
  a {
    color: #6c757d !important;
  }

  footer{
    max-height: 56px;
    font-size: 14px;
  }

  .container {
    margin-top: 0.2em;
  }
</style>