import Vue from 'vue'
import ElementUI from 'element-ui'
import './styles/index.scss'
import echarts from 'echarts'
import Shared from './shared'
import router from './router'
import app from './app.vue'
import store from './store';
import './shared/dialogDrag';

Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
Vue.use(Shared)

new Vue({
  render: h => h(app),
  store,
  router
}).$mount('#app')

location.hash = '/search';

Vue.config.productionTip = false
