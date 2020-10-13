import Router from 'vue-router'

import ImportList from './import-list';
import ImportNew from './import-new';
import ImportNewSpecial from './import-new-special';

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
    {
      path: '/import/newSpecial',
      name: 'newSpecial',
      component: ImportNewSpecial
    },
  ]
})