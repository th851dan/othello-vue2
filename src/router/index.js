import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Game from '../views/Game.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/othello',
    name: 'Othello',
    component: Game
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base:"/",
  routes
})

export default router
