import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cookie: Cookies.get('id') || null,
    user: {},
  },
  getters: {
    isAuthenticated: (state) => {
      if (state.cookie || Object.keys(state.user).length) {
        return true;
      }
      return false;
    },
  },
  mutations: {
    logoutUser(state) {
      state.user = {};
      state.cookie = null;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    authenticateUser({ commit }, user) {
      commit('setUser', user);
    },
    logoutUser({ commit }) {
      Cookies.remove('id');
      commit('logoutUser');
    }
  },
});
