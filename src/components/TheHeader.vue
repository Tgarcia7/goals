<template>
  <div class="navbar-container">
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
      <!-- <a class="nav mr-auto text-white" href="/">
        <font-awesome-icon icon="chevron-left" size="lg" />
      </a> -->

      <b-navbar-brand>
        <router-link class="main-logo" to="/goals/">
          <img src="../assets/img/logo.png" class="navbar-brand"/>
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle class="ml-auto" target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav class="my-3">
        <b-navbar-nav class="ml-auto col-6">

          <b-nav-item-dropdown text="Idioma" class="text-right">
            <template slot="button-content">
                <span class="menu-item">
                  <font-awesome-icon icon="globe-americas" />
                  <span class="mr-2">Idioma</span>
                </span>
            </template>
            <b-dropdown-item href="#" class="text-right" left>English</b-dropdown-item>
            <b-dropdown-item href="#" class="text-right">Español</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Usuario" class="text-right">
            <template slot="button-content">
                <span class="menu-item">
                  <font-awesome-icon icon="user" />
                  <span class="mr-2">Usuario</span>
                </span>
            </template>
            <b-dropdown-item href="#" class="text-right">Perfil</b-dropdown-item>
            <b-dropdown-item @click="logout()" class="text-right">Cerrar sesión</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item href="#" class="text-right">
            <span class="menu-item text-right">
              <font-awesome-icon icon="question-circle"/>
              <span class="mr-2">Ayuda</span>
            </span>
          </b-nav-item>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  import api from '../services/api'

  export default {
    name: 'TheHeader',
    methods: {
      logout () {
        api.logout()
        this.$router.push({ name: 'login' })
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
    left: 48%;
    top: 3px;
    transform: translateX(-50%);
    height: 45px;
  } 

</style>

<style>
  .navbar-container ul {
    background-color: #343a40;
    border: 0;
  }

  .navbar-container ul li a {
    color: white;
  }

  .navbar-container .menu-item span {
    padding-left: 10px;
  }

  .navbar-container ul li a:hover {
    background-color: #414950;
    color: white;
  }
</style>