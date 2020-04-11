import Home from '@/views/Home.vue'
import Done from '@/views/Done.vue'
import Statistics from '@/views/Statistics.vue'

const routes = [
  { path: '/goals/', component: Home, name: 'home' },
  { path: '/goals/done', component: Done, name: 'done' },
  { path: '/goals/statistics', component: Statistics, name: 'statistics' }
]

export default routes