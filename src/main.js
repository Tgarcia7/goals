import Vue from 'vue'
import App from './App.vue'

// Bootstrap
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faBullseye, 
  faBars, 
  faClipboardList, 
  faClipboardCheck, 
  faChartBar,
  faPlus,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChevronDown,
  faTasks,
  faUserAlt,
  faSignOutAlt} from '@fortawesome/free-solid-svg-icons'

library.add(
  faBullseye, 
  faBars, 
  faClipboardList, 
  faClipboardCheck, 
  faChartBar, 
  faPlus, 
  faChevronLeft, 
  faChevronRight, 
  faChevronUp, 
  faChevronDown, 
  faTasks, 
  faUserAlt, 
  faSignOutAlt) 

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
