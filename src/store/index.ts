import Vue from 'vue'
import Vuex from 'vuex'

import MainStore from '@/store/main-store'
import LoginStore from '@/store/login-store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    MainStore,
    LoginStore
  },
  plugins: [Vuex.createLogger()]
})
