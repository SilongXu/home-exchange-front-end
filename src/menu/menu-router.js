import Router from 'vue-router'

import MenuAbstract from './menu-abstract';
import MenuManage from './menu-manage';

export default new Router({
  routes: [
    {
      path: '/menu',
      name: 'abstract',
      component: MenuAbstract
    },
    {
      path: '/menu/manage',
      name: 'manage',
      component: MenuManage
    },
  ]
})