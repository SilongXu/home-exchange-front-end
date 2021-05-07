import Vue from 'vue'
import ElementUI from 'element-ui'
import './styles/index.scss'
import echarts from 'echarts'
import App from './app.vue'
import router from './router'
import store from './store'
import Shared from './shared'
import viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
Vue.use(Shared)

Vue.use(viewer)
viewer.setDefaults({
  Options: { 
    'inline': true, 
    'button': true, 
    'navbar': false, 
    'title': false, 
    'toolbar': false, 
    'tooltip': false, 
    'movable': false, 
    'zoomable': true, 
    'rotatable': true, 
    'scalable': true, 
    'transition': true, 
    'fullscreen': false, 
    'keyboard': true, 
    'url': 'data-source' 
  }

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.config.productionTip = false