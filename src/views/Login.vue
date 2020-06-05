<template>
  <main class="flex-shrink-0" role="main">
    <div class="container">
      <div class="row">
        <div class="col col-sm-4 mx-auto">
          <div class="row">
            <figure class="col">
              <img src="../assets/img/logo-login.png" alt="Logo" width="75%">
            </figure>
          </div>

          <form @submit.prevent="login" id="login-form">
            <div class="form-group row mt-3">
              <div class="col">
                <div class="input-group">
                  <div class="input-group-prepend input-icon">
                    <span class="input-group-text">
                      <font-awesome-icon icon="user"/>
                    </span>
                  </div>
                  <input 
                    v-model="email"
                    class="form-control input-login"
                    type="email"
                    placeholder="Correo electrónico"
                    required>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col">
                <div class="input-group">
                  <div class="input-group-prepend input-icon">
                    <span class="input-group-text">
                      <font-awesome-icon icon="key"/>
                    </span>
                  </div>
                  <input 
                    v-model="password"
                    class="form-control input-login"
                    type="password"
                    placeholder="Contraseña"
                    required>
                </div>
              </div>
            </div>

            <div class="form-group row mt-4">
              <div class="col mx-auto">
                <button type="submit" class="btn btn-success btn-block main-btn">
                  <strong>Iniciar sesión</strong>
                </button>
              </div>
            </div>
          </form>

          <div class="row">
            <div class="col">
              {{ error.statusText }}
              <small>{{ error.status }}</small>
            </div>
          </div>

          <div class="row text-white">
            <div class="col-6">
              <small class="clickable">¿Olvidó su contraseña?</small>
            </div>
            <div class="col-4 ml-auto mb-3">
              <small class="clickable text-right">Registrarse</small>
            </div>
          </div>

          <div class="row text-white mt-5">
            <div class="col">
              <small>O iniciar con</small>
            </div>
          </div>

          <div class="row text-white mt-2">
            <div class="col">
              <font-awesome-icon :icon="['fab', 'facebook']" class="mr-3 clickable" size="lg"/>
              <font-awesome-icon :icon="['fab', 'google']" class="mr-3 clickable" size="lg"/>
              <font-awesome-icon :icon="['fab', 'linkedin']" class="clickable" size="lg"/>
            </div>
          </div>

        </div>
      </div>
    </div>
  </main>
</template>

<script>
  //import api from '../services/api'

  export default {
    name: 'login',
    data () {
      return {
        email: '',
        password: '',
        error: {}
      }
    },
    methods: {
      login () {
        window.localStorage.token = `${this.email}, ${this.password}`
        this.$router.push({ name: 'home' })
        // api.authenticate(this.email, this.password)
        //   .then(res => {
        //     window.localStorage.token = res.token
        //     window.localStorage.user = window.atob(res.token.split('.')[1])
        //     this.$router.push('/')
        //   })
        //   .catch(err => ( this.error = err ))
      }
    }
  }
</script>

<style scoped>
  #login-form .main-btn {
    border-radius: 30px;
    height: 3em;
    font-weight: 600;
    box-shadow: 0px 8px 6px -6px #444a46;
  }

  #login-form .input-login {
    border-radius: 30px;
    height: 3em;
    font-weight: 600;
    box-shadow: 0px 8px 6px -6px #444a46;
    color: black;
    padding: 0.375rem 3.75rem;
  }

  #login-form .input-group-text {
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    background-color: white;
    border-right: 0px;
    z-index: 10;
  }

  #login-form .input-icon {
    margin-right: -40px;
  }
</style>