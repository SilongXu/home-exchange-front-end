import Router from 'vue-router'

import monitorWelcome from './monitor-welcome'
import monitorArchive from './monitor-archive'
import monitorInterface from './monitor-interface'


export default new Router({
  routes: [
    {
      path: '/monitor',
      name: 'monitor',
      component: monitorWelcome
    },
    {
      path: '/monitor/monitorArchive',
      name: 'monitorArchive',
      component: monitorArchive
    },
    {
      path: '/monitor/monitorInterface',
      name: 'monitorInterface',
      component: monitorInterface
    },
  ]
})