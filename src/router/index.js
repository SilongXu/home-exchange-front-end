import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout/layout'

const search = () => import(/* webpackChunkName: "search" */ '@/search/search')
const _import = () => import(/* webpackChunkName: "import" */ '@/import/import')
const menu = () => import(/* webpackChunkName: "menu" */ '@/menu/menu')

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
          path: 'menu',
          name: 'menu-manage',
          component: menu,
        },
      ],
    }
  ]
})
