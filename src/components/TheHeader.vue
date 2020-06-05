<template>
  <div class="navbar-container">
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
      <div class="container">
        <a class="nav mr-auto text-white" href="/">
          <!-- <font-awesome-icon icon="chevron-left" size="lg" /> -->
        </a>

        <b-navbar-brand>
          <router-link class="main-logo" to="/goals/">
            <img src="../assets/img/logo.png" class="navbar-brand"/>
          </router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">

            <b-nav-item-dropdown text="Idioma" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <span>Usuario</span>
              </template>
              <b-dropdown-item href="#">Perfil</b-dropdown-item>
              <b-dropdown-item @click="logout()">Cerrar sesión</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    name: 'TheHeader',
    methods: {
      logout () {
        localStorage.clear()
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
    left: 46%;
    top: 3px;
    transform: translateX(-50%);
    height: 45px;
  } 

  .main-logo {
    color: white !important;
    text-decoration: none !important;
  }
</style>