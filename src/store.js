import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    currentUser: null
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setIsAuthenticated(state, val) {
      state.isAuthenticated = val;
    } 
  },
  actions: {
    clearData({commit}) {
      commit('setIsAuthenticated', false);
      commit('setCurrentUser', null);
    },
    autoSignIn ({commit}, payload) {
      commit('setCurrentUser', payload);
      commit('setIsAuthenticated', true);
     }
  }
})
