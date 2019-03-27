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
    isAuthenticated: (state) => state.cookie || Object.keys(state.user).length,
    allPosts: state => state.posts,
    getUser: state => state.user,
  },
  mutations: {
    logoutUser(state) {
      state.user = {};
      state.cookie = null;
    },
    setUser(state, user) {
      state.user = user;
    },
    setPosts(state, posts) {
      state.posts = posts
    },
  },
  actions: {
    authenticateUser({ commit }, user) {
      commit('setUser', user);
    },
    logoutUser({ commit }) {
      Cookies.remove('id');
      commit('logoutUser');
    },
    setPosts({ commit }, posts) {
      commit('setPosts', posts)
    }
  },
});
