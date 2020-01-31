import Vue from 'vue'
import App from './App.vue'

// Bootstrap
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBullseye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBullseye) 
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
