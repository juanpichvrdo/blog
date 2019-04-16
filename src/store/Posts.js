const state = {
    posts: []
};

const mutations = {
    SET_POSTS(state, posts) {
        state.posts = posts;
    }
};

const actions = {
    setPosts({ commit }, posts) {
        commit("SET_POSTS", posts);
    }
};

const getters = {
    allPosts: state => state.posts
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
