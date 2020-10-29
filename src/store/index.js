import Vue from 'vue'
import Vuex from 'vuex'
import menuNodes from './modules/menu-nodes'
import common from './modules/common'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    menuNodes,
    common
  },
  strict: debug
})