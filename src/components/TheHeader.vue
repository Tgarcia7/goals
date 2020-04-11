<template>
  <div class="navbar-container" @click="cleanSelected">
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
      <div class="container">
        <a class="nav mr-auto text-white" href="/">
          <!-- <font-awesome-icon icon="chevron-left" size="lg" /> -->
        </a>

        <b-navbar-brand>
          <router-link class="main-logo" to="/goals/">
            <font-awesome-icon icon="bullseye" size="lg" /> <strong>Goals</strong>
          </router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">

            <b-nav-item-dropdown text="Lang" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <span>User</span>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    name: "TheHeader",
    methods: {
      cleanSelected: function () {
        let elems = document.querySelectorAll(".main-task-row");

        [].forEach.call(elems, el => {
            el.classList.remove("task-selected")
        })
      }
    }
  }
</script>

<style scoped>
  .navbar-container {
    margin-bottom: 70px;
  }

  .navbar {
    min-height: 56px;
  }
  
  .navbar-brand {
    position: absolute;
    left: 47%;
    top: 7px;
    transform: translateX(-50%);
  } 

  .main-logo {
    color: white !important;
    text-decoration: none !important;
  }
</style>