import Vue from 'vue'
import VueRouter from 'vue-router'
import BoardWords from '@/views/BoardWords'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'board',
    component: BoardWords
  },
  {
    path: '/radicals',
    name: 'radicals',
    component: () => import('@/views/BoardRadicals')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
