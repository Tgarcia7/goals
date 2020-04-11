import Home from '@/views/Home.vue'
import Done from '@/views/Done.vue'
import Statistics from '@/views/Statistics.vue'

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/done', component: Done, name: 'done' },
  { path: '/statistics', component: Statistics, name: 'statistics' }
]

export default routes