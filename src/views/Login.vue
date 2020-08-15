<template>
  <main class="jumbotron vertical-center login-container" role="main">
    <div class="container">
      <div class="row">
        <div class="col col-sm-6 col-lg-4 mx-auto">

          <div class="row">
            <figure class="col">
              <img src="../assets/img/logo-login.png" alt="Logo" 
                :class="`${registerForm ? 'logo active' : 'logo'} ${loading ? 'full-logo' : ''}`">
            </figure>
          </div>

          <div class="form-row mt-5" v-if="loading">
            <div class="col mx-auto">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Cargando...</span>
              </div>
              <p class="text-muted mt-3"><small>{{ loadingMessage }}</small></p>
            </div>
          </div>

          <div v-if="!loading">
            
            <transition-group name="fade">
              <form @submit.prevent="login" id="login-form" v-if="loginForm" :key="1">
                <div class="form-group row mt-3">
                  <div class="col">
                    <div class="input-group">
                      <div class="input-group-prepend input-icon">
                        <span class="input-group-text">
                          <font-awesome-icon icon="envelope"/>
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
              
              <form @submit.prevent="register" id="register-form" v-if="registerForm" :key="2">
                <div class="form-group row">
                  <div class="col">
                    <div class="input-group">
                      <div class="input-group-prepend input-icon">
                        <span class="input-group-text">
                          <font-awesome-icon icon="user"/>
                        </span>
                      </div>
                      <input 
                        v-model="usernameRegister"
                        class="form-control input-login"
                        type="text"
                        placeholder="Nombre completo"
                        required>
                    </div>
                  </div>
                </div>
                
                <div class="form-group row mt-1">
                  <div class="col">
                    <div class="input-group">
                      <div class="input-group-prepend input-icon">
                        <span class="input-group-text">
                          <font-awesome-icon icon="envelope"/>
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

                <transition name="fadeMsgs">
                  <div class="row" v-if="errorPasswords">
                    <div class="col text-danger">
                      <p class="text-right mr-3">
                        <small>{{ errorPasswords }}</small>
                      </p>
                    </div>
                  </div>
                </transition>

                <div class="form-group row">
                  <div class="col mx-auto">
                    <button type="submit" class="btn btn-success btn-block main-btn"
                      :disabled="this.errorPasswords !== ''">
                      <strong>Registrarse</strong>
                    </button>
                  </div>
                </div>
              </form>

              <form @submit.prevent="forget" id="forget-form" v-if="forgetForm" :key="3">
                <div class="form-group row mt-5">
                  <div class="col">
                    <div class="input-group">
                      <div class="input-group-prepend input-icon">
                        <span class="input-group-text">
                          <font-awesome-icon icon="envelope"/>
                        </span>
                      </div>
                      <input 
                        v-model="emailForget"
                        class="form-control input-login"
                        type="email"
                        placeholder="Correo electrónico"
                        required>
                    </div>
                  </div>
                </div>

                <div class="form-group row mt-4">
                  <div class="col mx-auto">
                    <button type="submit" class="btn btn-success btn-block main-btn">
                      <strong>Reestablecer contraseña</strong>
                    </button>
                  </div>
                </div>

              </form>
            </transition-group>

            <div class="row text-white">
              <div class="col-7">
                <small class="clickable" v-if="loginForm" @click="showForm('forget')">¿Olvidó su contraseña?</small>
              </div>
              <div class="col-5 ml-auto">
                <small class="clickable text-right" @click="showForm('register')" v-if="loginForm">Registrarse</small>
                <small class="clickable text-right" @click="showForm('login')" v-if="forgetForm || registerForm">Iniciar sesión</small>
              </div>
            </div>

            <transition name="fadeMsgs">
              <div class="row mb-2 mt-4" v-if="error">
                <div class="col text-white text-danger">
                  {{ error }}
                </div>
              </div>
            </transition>

            <transition name="fadeMsgs">
              <div class="row mb-2 mt-4" v-show="message">
                <div class="col text-white">
                  {{ message }}
                </div>
              </div>
            </transition>

            <div class="form-group row mt-5" v-show="forgetCompletedBtn">
              <div class="col-6 mx-auto">
                <button type="button" class="btn btn-dark btn-block main-btn" @click="clearForm()">
                  <strong>Volver</strong>
                </button>
              </div>
            </div>

            <transition name="fade">
              <div class="fixed-bottom social-auth py-3" v-if="loginForm || registerForm">
                <div class="row text-white">
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
            </transition>
          
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
        loading: true,
        loginForm: true,
        registerForm: false,
        forgetForm: false,
        emailRegister: '',
        passwordRegister: '',
        confirmPasswordRegister: '',
        usernameRegister: '',
        emailForget: '',
        message: '',
        forgetCompletedBtn: false,
        loadingMessage: ''
      }
    },
    methods: {
      login: async function () {
        try {
          await api.authenticate({ email: this.email, password: this.password })
          this.loading = true
          this.loadingMessage = 'Iniciando sesión...'
          setTimeout(() => { this.$router.push({ name: 'home' }) }, 3000)
        } catch (error) {
          this.error = error
        }
      },
      register: async function () {
        try {
          const newUser = { 
            email: this.emailRegister, 
            password: this.passwordRegister,
            confirmPassword: this.confirmPasswordRegister,
            username: this.usernameRegister
          }
          await api.register(newUser)
          
          this.loadingMessage = 'Creando cuenta...'
          this.loading = true
          setTimeout(() => { this.$router.push({ name: 'home' }) }, 2000)
        } catch (error) {
          this.error = error
        }
      },
      forget: async function () {
        try {
          this.error = ''
          this.message = ''
          this.forgetForm = false
          this.loadingMessage = 'Por favor espere...'
          this.loading = true
          this.message = await api.forgetPassword(this.emailForget)
          setTimeout(() => { 
            this.loading = false
            this.forgetCompletedBtn = true
          }, 3000)
        } catch (error) {
          setTimeout(() => { 
            this.loading = false
            this.forgetCompletedBtn = true
          }, 3000)
          this.message = error
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
        this.error = ''
        this.message = ''
        
        if (form === 'login') {
          this.loginForm = true
          this.registerForm = false
          this.forgetForm = false
        } else if (form === 'register') {
          this.loginForm = false 
          this.registerForm = true
          this.forgetForm = false
        } else if (form === 'forget') {
          this.loginForm = false 
          this.registerForm = false
          this.forgetForm = true
        }
      },
      clearForm: function () {
        this.error = ''
        this.message = ''
        this.forgetCompletedBtn = false
        this.email = ''
        this.password = ''
        this.loading = false
        this.loginForm = true
        this.registerForm = false
        this.forgetForm = false
        this.emailRegister = ''
        this.passwordRegister = ''
        this.confirmPasswordRegister = ''
        this.usernameRegister = ''
        this.emailForget = ''
        this.loadingMessage = 'Iniciando sesión...'
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
    },
    mounted: function () {
      let vm = this
      setTimeout(function () { vm.loading = false }, 1000)
    }
  }
</script>

<style scoped>
  #login-form .main-btn, 
  #register-form .main-btn, 
  #forget-form .main-btn {
    border-radius: 30px;
    height: 3em;
    font-weight: 600;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 1);
  }

  #login-form .input-login,
  #register-form .input-login,
  #forget-form .input-login {
    border-radius: 30px;
    height: 3.1em;
    font-weight: 600;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 1);
    color: black;
    padding: 0.375rem 3.75rem;
  }

  #register-form .input-login{
    height: 2.7em; /* Overwrites height only in register */
  }

  #login-form .input-group-text, 
  #register-form .input-group-text, 
  #forget-form .input-group-text {
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    background-color: white;
    border-right: 0px;
    z-index: 10;
  }

  #login-form .input-icon,
  #register-form .input-icon,
  #forget-form .input-icon {
    margin-right: -40px;
  }

  .fade-enter-active {
    transition: opacity .5s ease;
    transition-delay: .5s;
  }
  
  .fade-leave-active {
    transition: opacity .5s ease;
  }
  
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .logo {
    transition: width 0.5s ease;
    width: 70%;
  }

  .logo.active {
    transition: width 0.5s ease;
    width: 45%;
  }

  .logo.full-logo {
    transition: all .5s ease;
    width: 100%;
    -webkit-filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 1));
    filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 1)); 
  }

  .fadeMsgs-enter-active {
    transition: opacity .5s ease;
  }
  
  .fadeMsgs-enter, .fadeMsgs-leave-to {
    opacity: 0;
  }
</style>