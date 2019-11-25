import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_USER (state, user) {
      state.user = user
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('SET_TOKEN', token)
    },
    setUser ({ commit }, user) {
      commit('SET_USER', user)
    }
  },
  modules: {
  },
  getters: {
    isUserLoggedIn (state) {
      return state.user !== null
    }
  }
})
