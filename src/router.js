import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Done from '@/views/Done.vue'
import Statistics from '@/views/Statistics.vue'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: { name: 'home' } },
  { path: '/goals/', component: Home, name: 'home' },
  { path: '/goals/done', component: Done, name: 'done' },
  { path: '/goals/statistics', component: Statistics, name: 'statistics' },
  { path: '/goals/login', component: Login, name: 'login', meta: { isPublic: true } }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active'
})

const isAuthenticated = function () {
  return localStorage.getItem('token')
}

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !isAuthenticated()) {
    return next({ name: 'login' })
  }

  if (to.name === 'login' && isAuthenticated()) {
    return next({ name: 'home' })
  }

  return next()
})

export default router