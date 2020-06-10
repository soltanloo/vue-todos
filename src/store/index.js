import Vue from 'vue'
import Vuex from 'vuex'
import todos from './modules/todos'
import lists from './modules/lists'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    todos,
    lists
  }
})
