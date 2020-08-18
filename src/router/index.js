import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout/layout'

const search = () => import(/* webpackChunkName: "search" */ '@/search/search')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout,
      children: [
        {
          path: 'search',
          name: 'search',
          component: search
        }
      ],
    }
  ]
})
