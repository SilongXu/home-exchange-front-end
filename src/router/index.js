import Vue from 'vue'
import VueRouter from 'vue-router'

import welcome from '../views/welcome/welcome.vue'
import signIn from '../views/SignIn/signIn.vue'
import signUp from '../views/SignUp/signUp.vue'
import search from '../views/Search/search.vue'
import message from '../views/Message/Message.vue'
import profile from '../views/profile/profile.vue'
import logOut from '../views/LogOut/logOut.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: welcome
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: signIn
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: signUp
  },
  {
    path: '/search',
    name: 'search',
    component: search,
  },
  {
    path: '/message',
    name: 'massage',
    component: message,
    meta:{auth:true},  
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile,
  },
  {
    path: '/logOut',
    name: 'logOut',
    component: logOut,
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
