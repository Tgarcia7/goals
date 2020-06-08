<template>
  <main class="flex-shrink-0" role="main">
    <div class="container">
      <div class="row">
        <div class="col col-sm-4 mx-auto">
          <div class="row">
            <figure class="col">
              <img src="../assets/img/logo-login.png" alt="Logo" :class="registerForm ? 'logo active' : 'logo'">
            </figure>
          </div>

          <div class="form-row mt-5" v-if="loading">
            <div class="col mx-auto">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Cargando...</span>
              </div>
              <p class="text-muted mt-3"><small>Iniciando sesión...</small></p>
            </div>
          </div>

          <div v-if="!loading">
            <form @submit.prevent="login" id="login-form" v-if="loginForm">
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

              <div class="row mb-2" v-if="error">
                <div class="col text-danger">
                  {{ error }}
                </div>
              </div>
            </form>

            <transition name="fade">
              <form @submit.prevent="register" id="login-form" v-if="registerForm">
                <div class="form-group row">
                  <div class="col">
                    <div class="input-group">
                      <div class="input-group-prepend input-icon">
                        <span class="input-group-text">
                          <font-awesome-icon icon="address-card"/>
                        </span>
                      </div>
                      <input 
                        v-model="usernameRegister"
                        class="form-control input-login"
                        type="text"
                        placeholder="Nombre"
                        required>
                    </div>
                  </div>
                </div>
                
                <div class="form-group row mt-1">
                  <div class="col">
                    <div class="input-group">
                      <div class="input-group-prepend input-icon">
                        <span class="input-group-text">
                          <font-awesome-icon icon="user"/>
                        </span>
                      </div>
                      <input 
                        v-model="emailRegister"
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
                        v-model="passwordRegister"
                        class="form-control input-login"
                        type="password"
                        placeholder="Contraseña"
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
                        v-model="confirmPasswordRegister"
                        class="form-control input-login"
                        type="password"
                        placeholder="Confirmar contraseña"
                        required>
                    </div>
                  </div>
                </div>

                <div class="row" v-if="errorPasswords">
                  <div class="col text-danger">
                    <p class="text-right mr-3">
                      <small>{{ errorPasswords }}</small>
                    </p>
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col mx-auto">
                    <button type="submit" class="btn btn-success btn-block main-btn"
                      :disabled="this.errorPasswords !== ''">
                      <strong>Registrarse</strong>
                    </button>
                  </div>
                </div>
              </form>
            </transition>

            <div class="row text-white">
              <div class="col-6">
                <small class="clickable">¿Olvidó su contraseña?</small>
              </div>
              <div class="col-4 ml-auto mb-3">
                <small class="clickable text-right" @click="showForm('register')" v-if="loginForm">Registrarse</small>
                <small class="clickable text-right" @click="showForm('login')" v-if="registerForm">Iniciar sesión</small>
              </div>
            </div>

            <div class="row text-white mt-4">
              <div class="col">
                <small>O iniciar con</small>
              </div>
            </div>

            <div class="row text-white mt-1">
              <div class="col">
                <font-awesome-icon :icon="['fab', 'facebook']" class="mr-4 clickable" size="lg"
                  @click="socialAuthenticate('facebook')"/>
                <font-awesome-icon :icon="['fab', 'google']" class="mr-4 clickable" size="lg"
                  @click="socialAuthenticate('google')"/>
                <font-awesome-icon :icon="['fab', 'github']" class="clickable" size="lg"
                  @click="socialAuthenticate('github')"/>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import api from '../services/api'

  export default {
    name: 'login',
    data () {
      return {
        email: '',
        password: '',
        error: '',
        loading: false,
        loginForm: true,
        registerForm: false,
        emailRegister: '',
        passwordRegister: '',
        confirmPasswordRegister: '',
        usernameRegister: ''
      }
    },
    methods: {
      login: async function () {
        try {
          await api.authenticate({ email: this.email, password: this.password })
          this.loading = true
          setTimeout(() => { this.$router.push({ name: 'home' }) }, 2000)
        } catch (error) {
          this.error = error
        }
      },
      register: async function () {
        try {
          await api.register({ 
            email: this.emailRegister, 
            password: this.passwordRegister,
            confirmPassword: this.confirmPasswordRegister,
            username: this.usernameRegister
          })
          
          this.loading = true
          setTimeout(() => { this.$router.push({ name: 'home' }) }, 2000)
        } catch (error) {
          this.error = error
        }
      },
      socialAuthenticate: async function (provider) {
        let vm = this
        this.$auth.authenticate(provider).then(async function (result) {
          await api.socialAuth(result, provider)
          vm.loading = true
          setTimeout(() => { vm.$router.push({ name: 'home' }) }, 2000)
        })
      },
      showForm: function (form) {
        if (form === 'login') {
          this.loginForm = true
          this.registerForm = false
        } else if (form === 'register') {
          this.loginForm = false 
          this.registerForm = true
        }
      }
    },
    computed: {
      errorPasswords: function () {
        let result = ''
        
        if (this.passwordRegister !== '' && this.confirmPasswordRegister !== '' 
          && this.passwordRegister !== this.confirmPasswordRegister) {
          result = 'Las contraseñas no coinciden'
        }

        return result
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

  .fade-enter-active {
    transition: all .5s ease;
  }
  
  .fade-enter, .fade-leave {
    opacity: 0;
    transform: translateX(500px);
  }

  .logo {
    transition: all 0.5s ease;
    width: 85%;
  }

  .logo.active {
    transition: all 0.5s ease;
    width: 45%;
  }
</style>