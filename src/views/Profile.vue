<template>
  <div class="container pt-1 px-5">
    <div class="row">
      <div class="col-sm-8 mx-auto pb-4 top-container">
        <div class="row image-row">
          <div class="bg-white image-container col-4 mx-auto my-auto">
            <div class="icon-edit-container clickable">
              <input name="profile-picture" class="clickable"
               multiple="no" type="file" accept="image/x-png,image/gif,image/jpeg"
               @change="updatePhoto">
              <font-awesome-icon class="text-center clickable" icon="camera"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-4">
      <div class="col-sm-2"></div>
      <div class="col-4 col-sm-3 col-md-2 btn-actions clickable mr-auto" v-if="!changingPassword">
        <button type="button" class="btn btn-outline-dark text-white btn-sm btn-block" @click="editing = !editing">
          <span v-if="!editing" @click="resetData()">Editar <font-awesome-icon icon="pen" size="sm"/></span>
          <span v-else><font-awesome-icon icon="chevron-left" size="sm"/> Cancelar</span>
        </button>
      </div>
      <div :class="`${changingPassword ? '' : 'ml-auto'} col-5 col-sm-3 col-md-2 btn-actions clickable`" v-if="!editing">
        <button type="button" class="btn btn-outline-dark text-white btn-sm btn-block" @click="changingPassword = !changingPassword">
          <span v-if="!changingPassword">Contraseña <font-awesome-icon icon="key" size="sm"/></span>
          <span v-else><font-awesome-icon icon="chevron-left" size="sm"/> Cancelar</span>
        </button>
      </div>
      <div class="col-sm-2"></div>
    </div>

    <transition name="fade-form">
      <form @submit.prevent="editUser" id="profile-form" v-if="!changingPassword">
        <div class="row text-white data-container mt-3">
          <div class="col-sm-8 mx-auto">
            <div class="row">
              <div class="col-2"><font-awesome-icon icon="user"/></div>
              <div class="col text-left">
                <transition name="fade">
                <span v-if="!editing">{{ this.username }}</span>
                  <input v-else
                    v-model="edit.username"
                    class="form-control input-login"
                    type="text"
                    placeholder="Nombre completo"
                    required>
                </transition>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-2"><font-awesome-icon icon="envelope"/></div>
              <div class="col text-left">
                <transition name="fade">
                  <span v-if="!editing">{{ this.email }}</span>
                  <input v-else
                    v-model="edit.email"
                    class="form-control input-login"
                    type="email"
                    placeholder="Correo electrónico"
                    required>
                </transition>
              </div>
            </div>

            <div class="row mt-3 text-danger error-msg" v-if="editing">
              <div class="col">
                <span v-if="error">{{ error }}</span>
              </div>
            </div>

            <div v-if="!editing && socialAuthenticated">
              <transition name="fade">
                <div class="row mt-3" v-if="socialAuthenticated.facebook">
                  <div class="col-2">
                    <font-awesome-icon :icon="['fab', 'facebook']" size="lg"/>
                  </div>
                  <div class="col text-left">
                      <span>{{ socialAuthenticated.facebook }} </span> 
                      <font-awesome-icon class="text-success" icon="check-circle" size="sm"/>
                  </div>
                </div>
              </transition>

              <transition name="fade">
                <div class="row mt-3" v-if="socialAuthenticated.google">
                  <div class="col-2">
                    <font-awesome-icon :icon="['fab', 'google']" size="lg"/>
                  </div>
                  <div class="col text-left">
                      <span>{{ socialAuthenticated.google }} </span> 
                      <font-awesome-icon class="text-success" icon="check-circle" size="sm"/>
                  </div>
                </div>
              </transition>

              <transition name="fade">
                <div class="row mt-3" v-if="socialAuthenticated.github">
                  <div class="col-2">
                    <font-awesome-icon :icon="['fab', 'github']" size="lg"/>
                  </div>
                  <div class="col text-left">
                      <span>{{ socialAuthenticated.github }} </span> 
                      <font-awesome-icon class="text-success" icon="check-circle" size="sm"/>
                  </div>
                </div>
              </transition>
            </div>

            <transition name="fade">
              <div class="row mt-3" v-if="editing">
                <div class="col mx-auto">
                  <button type="submit" class="btn btn-success btn-sm btn-block main-btn">
                    <strong>Guardar cambios</strong>
                  </button>
                </div>
              </div>
            </transition>

          </div>
        </div>
      </form>
    </transition>

    <transition name="fade-form">
      <form @submit.prevent="changePassword" id="password-form" class="text-white" v-if="changingPassword">

        <div class="row mt-3">
          <div class="col text-left">
            <input 
              v-model="newPasswords.current"
              class="form-control input-login"
              type="password"
              placeholder="Contraseña actual"
              @change="error = ''"
              required>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col text-left">
            <input 
              v-model="newPasswords.password"
              class="form-control input-login"
              type="password"
              placeholder="Contraseña nueva"
              required>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col text-left">
            <input 
              v-model="newPasswords.confirm"
              class="form-control input-login"
              type="password"
              placeholder="Confirmar contraseña"
              required>
          </div>
        </div>

        <div class="row mt-3 text-danger error-msg">
          <div class="col">
            <span v-if="comparePasswords">Las contraseñas no coinciden</span>
            <span v-else-if="error">{{ error }}</span>
          </div>
        </div>

        <div class="row mt-3" v-if="changingPassword">
          <div class="col mx-auto">
            <button type="submit" class="btn btn-success btn-sm btn-block main-btn"
              :disabled="newPasswords.current && newPasswords.confirm && newPasswords.password && comparePasswords">
              <strong>Cambiar contraseña</strong>
            </button>
          </div>
        </div>
      </form>
    </transition>

    <Swal ref="swal"/>

  </div>
</template>

<script>
  import Swal from '../services/Swal.vue'
  import Api from '../services/api'

  export default {
    name: 'login',
    components: {
      Swal
    },
    data () {
      return {
        id: '',
        email: '',
        password: '',
        username: '',
        editing: false,
        changingPassword: false,
        edit: {
          email: '',
          username: ''
        },
        newPasswords: {
          current: '',
          password: '',
          confirm: ''
        },
        socialAuthenticated: {
          facebook: 'Tey Miranda',
          github: null,
          google: null
        },
        error: ''
      }
    },
    created: function () {
      try {
        const userStr = localStorage.getItem('user')
        if (!userStr) {
          this.$router.push({ name: 'login' })
          return
        }
        const USER = JSON.parse(userStr)
        if (!USER) {
          this.$router.push({ name: 'login' })
          return
        }

        this.id = USER.userId
        this.email = USER.email
        this.password = USER.password
        this.username = USER.name
        this.edit.email = USER.email
        this.edit.username = USER.name
      } catch (error) {
        console.error('Failed to load user data:', error.message)
        this.$router.push({ name: 'login' })
      }
    },
    methods: {
      editUser: async function () {
        this.email = this.edit.email
        this.username = this.edit.username

        const user = {
          id: this.id,
          email: this.email,
          name: this.username
        }

        try {
          await Api.updateUser(user)
          this.editing = false
          this.error = ''
          this.$refs.swal.toast('success', 'Información actualizada')
        } catch (error) {
          this.error = error.message || String(error)
        }
      },
      changePassword: async function () {
        try {
          await Api.changePassword(this.id, this.email, this.newPasswords.current, this.newPasswords.password)
          this.$refs.swal.toast('success', 'Contraseña reestablecida')
          this.resetData()
        } catch (error) {
          this.error = error.message || String(error)
        }
      },
      resetData: function () {
        try {
          const userStr = localStorage.getItem('user')
          if (!userStr) return

          const USER = JSON.parse(userStr)
          if (!USER) return

          this.id = USER.userId
          this.email = USER.email
          this.password = USER.password
          this.username = USER.name
          this.editing = false
          this.changingPassword = false
          this.edit = {
            email: USER.email,
            username: USER.name
          }
          this.newPasswords = {
            current: '',
            password: '',
            confirm: ''
          }
          this.error = ''
        } catch (error) {
          console.error('Failed to reset data:', error.message)
        }
      },
      updatePhoto: function () {
        this.$refs.swal.toast('success', 'Foto actualizada')
      }  
    },
    computed: {
      comparePasswords: function () {
        return (this.newPasswords.password !== '' && this.newPasswords.confirm !== '') &&
          (this.newPasswords.password !== this.newPasswords.confirm)
      }
    }
  }
</script>

<style scoped>
  .image-row,
  .data-container {
    min-height: 180px;
  }

  .top-container {
    border-top-left-radius: var(--radius-xl);
    border-top-right-radius: var(--radius-xl);
    border-bottom: 3px solid var(--gray-500);
    background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 100%);
  }

  .data-container {
    border-bottom-left-radius: var(--radius-xl);
    border-bottom-right-radius: var(--radius-xl);
  }

  .image-container {
    border-radius: 50%;
    height: 100px;
    border: 3px solid var(--gray-500);
    max-width: 100px;
    background-image: url("../assets/img/profile.png");
    background-size: cover;
    transition: var(--transition-all);
  }

  .image-container:hover {
    border-color: var(--green-500);
    box-shadow: var(--shadow-glow-green);
  }

  .icon-edit-container {
    position: relative;
    bottom: -65px;
    right: -52px;
    background-color: var(--bg-base);
    border-radius: 50%;
    height: 30px;
    width: 30px;
    border: 1px solid var(--gray-500);
    color: var(--text-primary);
    padding-top: 1px;
    overflow: hidden;
    transition: var(--transition-all);
  }

  .icon-edit-container:hover {
    background-color: var(--green-500);
    border-color: var(--green-500);
    transform: scale(1.1);
  }

  .icon-edit-container input {
    opacity: 0;
    position: absolute;
  }

  .main-btn {
    border-radius: var(--radius-full);
    height: 2.5em;
    font-weight: var(--font-semibold);
    box-shadow: var(--shadow-md);
    transition: var(--transition-all);
  }

  .main-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg), var(--shadow-glow-green-sm);
  }

  #profile-form .input-login,
  #password-form .input-login {
    border-radius: var(--radius-full);
    height: 2em;
    font-weight: var(--font-semibold);
    box-shadow: var(--shadow-sm);
    color: var(--text-inverse);
    transition: var(--transition-all);
  }

  #profile-form .input-login:focus,
  #password-form .input-login:focus {
    box-shadow: var(--shadow-md), 0 0 0 3px var(--green-200);
  }

  .data-container .row {
    height: 35px;
  }

  .fade-enter-active {
    transition: opacity var(--transition-slow);
    transition-delay: 0.3s;
  }

  .fade-leave-active {
    transition: opacity var(--transition-slow);
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .fade-form-enter-active {
    transition: opacity var(--transition-slow);
    transition-delay: 0.3s;
  }

  .fade-form-leave-active {
    transition: opacity var(--transition-slow);
  }

  .fade-form-enter, .fade-form-leave-to {
    opacity: 0;
  }

  .btn-actions {
    padding: 0;
  }

  .btn {
    border-radius: var(--radius-full);
  }

  .error-msg {
    height: 24px;
  }
</style>