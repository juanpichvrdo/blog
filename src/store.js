import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: false,
    cookie: Cookies.get('authenticated')
  },
  getters: {
    isAuthenticated: state => {
      if (state.cookie === 'true') {
        return true;
      } else if (state.authenticated) {
        return true
      } else {
        return false;
      }
    },
  },
  mutations: {
    authenticateUser(state) {
      state.authenticated = true;
    },
  },
  actions: {
    authenticateUser({ commit }, user) {
      commit('authenticateUser');
    },
  },
});
