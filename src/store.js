import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: false,
    cookie: Cookies.get('authenticated') || null
  },
  getters: {
    isAuthenticated: state => {
      if (state.cookie || state.authenticated) {
        return true;
      }
      return false;
    },
  },
  mutations: {
    authenticateUser(state) {
      state.authenticated = true;
      if (state.cookie) {
        state.authenticated = true;
      }
    },
    logoutUser(state) {
      state.authenticated = false;
      state.cookie = null;
    }
  },
  actions: {
    authenticateUser({ commit }, user) {
      commit('authenticateUser');
    },
    logoutUser({ commit }) {
      Cookies.remove('authenticated');
      commit('logoutUser');
    }
  },
});
