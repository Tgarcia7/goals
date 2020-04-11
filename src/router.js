import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Done from '@/views/Done.vue'
import Statistics from '@/views/Statistics.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/goals/', component: Home, name: 'home' },
  { path: '/goals/done', component: Done, name: 'done' },
  { path: '/goals/statistics', component: Statistics, name: 'statistics' }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active"
})

export default router