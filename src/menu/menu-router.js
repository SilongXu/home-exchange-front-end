import Router from 'vue-router'

import MenuManage from './menu-manage';

export default new Router({
  routes: [
    {
      path: '/menu',
      name: 'manage',
      component: MenuManage
    },
  ]
})