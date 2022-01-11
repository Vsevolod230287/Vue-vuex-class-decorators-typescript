import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

const Home = () => import(/* webpackChunkName: "views" */ '../views/Home.vue')
const DettaglioCauzioni = () => import(/* webpackChunkName: "views" */ '../views/DettaglioCauzioni.vue')
const Login = () => import(/* webpackChunkName: "views" */ '../views/Login.vue')

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dettaglio_cauzioni/:rifInterno',
    name: 'DettaglioCauzioni',
    component: DettaglioCauzioni,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
