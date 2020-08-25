import Vue from 'vue'
import Vuex from 'vuex'
import menuNodes from './modules/menu-nodes'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    menuNodes,
  },
  strict: debug
})