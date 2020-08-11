import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI)

Vue.config.productionTip = false

document.title = 'Data Manager'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
