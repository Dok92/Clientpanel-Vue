import firebase from 'firebase/app'
import "@firebase/auth"
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
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/client/add',
    name: 'AddClient',
    component: AddClient,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/client/edit/:id',
    name: 'EditClient',
    component: EditClient,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/client/:id',
    name: 'ClientDetails',
    component: ClientDetails,
    meta: {
      requiresAuth: true,
    }
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
    component: Settings,
    meta: {
      requiresAuth: true,
    }
  },
]

const router = new VueRouter({
  history: 'true',
  routes
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (firebase.auth().currentUser !== null) {
      next();
    } else {
      next({ name: 'Login' });
    }
  } else
    next();
})

export default router
