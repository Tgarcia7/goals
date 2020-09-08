import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'
import config from './auth-config'

let baseUrl = window.location.href.includes('localhost') ? 'http://localhost:8080/goals/' : 'https://tgarcia7.github.io/goals/'

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: baseUrl, 
  providers: {
    facebook: {
      clientId: config.auth.facebook.clientId,
      redirectUri: baseUrl,
      responseType: 'token',
      authorizationEndpoint: 'https://www.facebook.com/v13.0/dialog/oauth'
    },
    google: {
      clientId: config.auth.google.clientId,
      redirectUri: baseUrl,
      responseType: 'token'
    },
    github: {
      clientId: config.auth.github.clientId,
      redirectUri: baseUrl + 'login',
      responseType: 'token'
    }
  }
})
