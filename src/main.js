import Vue from 'vue'
import App from './App.vue'

// Router
import router from '@/router'

// Progressbar
import VueProgressBar from 'vue-progressbar'

const options = { color: '#6b856f', failedColor: '#874b4b' }
Vue.use(VueProgressBar, options)

// Swal2
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueSweetalert2)

// Bootstrap
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import './registerServiceWorker'

library.add(fas, fab, faClock)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Moment
import moment from 'vue-moment'

Vue.use(moment)

// Swipe
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

// Axios and Authenticate
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'

let baseUrl = window.location.href.includes('localhost') ? 'http://localhost:8080/goals/' : 'https://tgarcia7.github.io/goals/'

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:8080', 
  providers: {
    facebook: {
      clientId: '254801129292665',
      redirectUri: baseUrl,
      responseType: 'token',
      authorizationEndpoint: 'https://www.facebook.com/v3.0/dialog/oauth'
    }
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
