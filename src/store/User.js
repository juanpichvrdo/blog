import Cookies from "js-cookie";

const state = {
    cookie: Cookies.get("id") || null,
    user: {}
};

const mutations = {
    LOGOUT_USER(state) {
        state.user = {};
        state.cookie = null;
    },
    SET_USER(state, user) {
        state.user = user;
    }
};

const actions = {
    setUser({ commit }) {
        const id = Cookies.get("id");
        if (id) {
            axios.get(`/users/?id=${id}`).then(({ data }) => {
                const user = data[0];
                if (Object.keys(user).length) {
                    commit("SET_USER", user);
                }
            });
        }
    },
    authenticateUser({ commit }, user) {
        commit("SET_USER", user);
    },
    logoutUser({ commit }) {
        Cookies.remove("id");
        commit("LOGOUT_USER");
    }
};

const getters = {
    isAuthenticated: state => state.cookie || Object.keys(state.user).length,
    getUser: state => state.user
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
