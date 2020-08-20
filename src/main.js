import Vue from 'vue'

import ElementUI from 'element-ui'
import './styles/index.scss'
Vue.use(ElementUI)

import Shared from './shared'
Vue.use(Shared)

import router from './router'
import app from './app.vue'
new Vue({
  render: h => h(app),
  router
}).$mount('#app')

Vue.config.productionTip = false

document.title = 'Data Manager'
