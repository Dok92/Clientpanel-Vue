import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard'
import AddClient from '@/views/AddClient'
import EditClient from '@/views/EditClient'
import ClientDetails from '@/views/ClientDetails'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Settings from '@/views/Settings'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/client/add',
    name: 'AddClient',
    component: AddClient
  },
  {
    path: '/client/edit/:id',
    name: 'EditClient',
    component: EditClient
  },
  {
    path: '/client/:id',
    name: 'ClientDetails',
    component: ClientDetails
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
]

const router = new VueRouter({
  history: 'true',
  routes
})

export default router
