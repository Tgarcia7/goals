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
          <span v-if="!editing">Editar <font-awesome-icon icon="pen" size="sm"/></span>
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
              <div class="row mt-5" v-if="editing">
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
      <form @submit.prevent="newPasswords" id="password-form" class="text-white" v-if="changingPassword">

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
          </div>
        </div>

        <div class="row mt-3" v-if="changingPassword">
          <div class="col mx-auto">
            <button type="submit" class="btn btn-success btn-sm btn-block main-btn" @click="changePassword"
              :disabled="newPasswords.confirm && newPasswords.password && comparePasswords">
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

  const USER = JSON.parse(localStorage.getItem('user'))

  export default {
    name: 'login',
    components: {
      Swal
    },
    data () {
      return {
        email: USER.email,
        password: USER.password,
        username: USER.name,
        editing: false,
        changingPassword: false,
        edit: {
          email: USER.email,
          username: USER.name
        },
        newPasswords: {
          password: '',
          confirm: ''
        },
        socialAuthenticated: {
          facebook: 'Tey Miranda',
          github: null,
          google: null
        }
      }
    },
    methods: {
      editUser: function () {
        this.email = this.edit.email
        this.username = this.edit.username
        this.editing = false

        this.$refs.swal.toast('success', 'Información actualizada')

      },
      changePassword: function () {
        this.$refs.swal.toast('success', 'Contraseña reestablecida')
        this.resetData()
      },
      resetData: function () {
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
          password: '',
          confirm: ''
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
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom: 3px solid rgb(165, 165, 165);
  }

  .data-container {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .image-container {
    border-radius: 50%;
    height: 100px;
    border: 3px solid rgb(165, 165, 165);
    max-width: 100px;
    background-image: url("../assets/img/profile.png");
    background-size: cover;
  }

  .icon-edit-container {
    position: relative;
    bottom: -65px;
    right: -52px;
    background-color: #1e242a;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    border: 1px solid rgb(165, 165, 165);
    color: white;
    padding-top: 1px;
    overflow: hidden;
  }

  .icon-edit-container input {
    opacity: 0; 
    position: absolute;
  }

  .main-btn {
    border-radius: 30px;
    height: 2.5em;
    font-weight: 600;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 1);
  }

  #profile-form .input-login,
  #password-form .input-login {
    border-radius: 30px;
    height: 2em;
    font-weight: 600;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 1);
    color: black;
  }

  .data-container .row {
    height: 35px;
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

  .fade-form-enter-active {
    transition: opacity .5s ease;
    transition-delay: .5s;
  }
  
  .fade-form-leave-active {
    transition: opacity .5s ease;
  }
  
  .fade-form-enter, .fade-form-leave-to {
    opacity: 0;
  }

  .btn-actions {
    padding: 0;
  }

  .btn {
    border-radius: 2em;
  }

  .error-msg {
    height: 24px; 
  }
</style>