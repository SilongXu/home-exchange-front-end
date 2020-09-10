import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout/layout'

const search = () => import(/* webpackChunkName: "search" */ '@/search/search')
const _import = () => import(/* webpackChunkName: "import" */ '@/import/import')
const menu = () => import(/* webpackChunkName: "menu" */ '@/menu/menu')
const monitor = () => import(/* webpackChunkName: "monitor" */ '@/monitor/monitor')
const userAuthority = () => import(/* webpackChunkName: "userAuthority" */ '@/userAuthority/userAuthority')

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
        },
        {
          path: 'import**',
          name: 'import',
          component: _import,
        },
        {
          path: 'menu**',
          name: 'menu',
          component: menu,
        },
        {
          path: 'monitor',
          name: 'monitor',
          component: monitor,
        },
        {
          path: 'userAuthority**',
          name: 'userAuthority',
          component: userAuthority,
        },
      ],
    }
  ]
})
