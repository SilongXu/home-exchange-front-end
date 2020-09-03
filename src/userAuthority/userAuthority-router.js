import Router from 'vue-router'

import userAuthorityManage from './userAuthority-manage';
import userAuthorityNew from './userAuthority-new';

export default new Router({
  routes: [
    {
      path: '/userAuthority',
      name: 'manage',
      component: userAuthorityManage
    },
    {
      path: '/userAuthority/new',
      name: 'new',
      component: userAuthorityNew
    }
  ]
})