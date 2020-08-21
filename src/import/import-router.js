import Router from 'vue-router'

import ImportList from './import-list';
import ImportNew from './import-new';

export default new Router({
  routes: [
    {
      path: '/import',
      name: 'list',
      component: ImportList
    },
    {
      path: '/import/new',
      name: 'new',
      component: ImportNew
    },
  ]
})