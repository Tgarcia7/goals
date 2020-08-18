<template>
  <div class="navbar-container">
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
      <div class="container">
        <div class="return-container clickable" @click="$router.back();" v-if="this.$route.meta.showReturn">
          <a class="nav mr-auto">
            <font-awesome-icon icon="chevron-left" size="lg"/>
          </a>
        </div>

        <b-navbar-brand>
          <router-link class="main-logo" to="/goals/">
            <img src="../assets/img/logo.png" class="navbar-brand"/>
          </router-link>
        </b-navbar-brand>

        <b-navbar-toggle class="ml-auto" target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto col-xs-6">

            <b-nav-item-dropdown text="Idioma" class="text-right">
              <template slot="button-content">
                  <span class="menu-item">
                    <font-awesome-icon icon="globe-americas" />
                    <span class="mr-2">Idioma</span>
                  </span>
              </template>
              <b-dropdown-item @click="changeLanguage('en')" class="text-right" left>English</b-dropdown-item>
              <b-dropdown-item @click="changeLanguage('es')" href="#" class="text-right">Español</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="Usuario" class="text-right">
              <template slot="button-content">
                  <span class="menu-item">
                    <font-awesome-icon icon="user" />
                    <span class="mr-2">Cuenta</span>
                  </span>
              </template>

              <router-link to="/goals/profile" tag="b-dropdown-item" class="text-right">
                Perfil
              </router-link>

              <router-link to="/goals/archive" tag="b-dropdown-item" class="text-right">
                Archivadas
              </router-link>
              
              <b-dropdown-item @click="logout()" class="text-right">Cerrar sesión</b-dropdown-item>
            </b-nav-item-dropdown>

            <!-- <b-nav-item href="#" class="text-right">
              <span class="menu-item text-right">
                <font-awesome-icon icon="question-circle"/>
                <span class="mr-2">Ayuda</span>
              </span>
            </b-nav-item> -->

          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>

    <Swal ref="swal"/>
    
  </div>
</template>

<script>
  import Api from '../services/api'
  import Swal from '../services/Swal.vue'

  export default {
    name: 'TheHeader',
    components: {
      Swal
    },
    methods: {
      logout: async function () {
        Api.logout()
        let userResponse = await 
          this.$refs.swal.regular('question', 'Cerrar sesión', '¿Está seguro que desea salir de su cuenta?')
        if (userResponse.value) this.$router.push({ name: 'login' })
      },
      changeLanguage: async function (newLanguage) {
        try {
          await Api.changeLanguage(newLanguage)
          this.$refs.swal.toast('success', 'Idioma actualizado')
        } catch (error) {
          console.error(error)
        }
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

  .navbar-container .dropdown-toggle:active,
  .navbar-container .dropdown-toggle:focus,
  .navbar-container .navbar-toggler:active,
  .navbar-container .navbar-toggler:focus {
    outline: 0;
  }

  .navbar-container .menu-item span {
    padding-left: 10px;
  }

  .navbar-container ul li a:hover {
    background-color: #414950;
    color: white;
  }

  .navbar-container .dropdown-item a {
    text-decoration: none;
  }

  .return-container {
    width: 40px;
    height: 40px;
    padding: 10px;
  }

  .fa-chevron-left {
    color: #9a9da0;
  }
</style>