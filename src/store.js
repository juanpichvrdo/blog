import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cookie: Cookies.get("id") || null,
        user: {},
        posts: [],
        search: {
            searhTerm: "",
            searchBy: "title"
        },
        comments: []
    },
    getters: {
        isAuthenticated: state => state.cookie || Object.keys(state.user).length,
        allPosts: state => state.posts,
        getUser: state => state.user,
        getSearchTerm: state => state.search,
        allComments: state => state.comments
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
            state.posts = posts;
        },
        setSearch(state, search) {
            state.search = search;
        },
        setComments(state, comments) {
            state.comments = comments;
        }
    },
    actions: {
        getUser({ commit }) {
            const id = Cookies.get("id");
            if (id) {
                axios.get(`/users/?id=${id}`).then(({ data }) => {
                    const user = data[0];
                    if (Object.keys(user).length) {
                        commit("setUser", user);
                    }
                });
            }
        },
        getComments({ commit }, postId) {
            axios
                .get(
                    `comments/?state=1&postId=${postId}&_sort=datePublish&_order=desc&_embed=replies`
                )
                .then(({ data: comments }) => {
                    commit("setComments", comments);
                });
        },
        authenticateUser({ commit }, user) {
            commit("setUser", user);
        },
        logoutUser({ commit }) {
            Cookies.remove("id");
            commit("logoutUser");
        },
        setPosts({ commit }, posts) {
            commit("setPosts", posts);
        },
        setSearch({ commit }, search) {
            commit("setSearch", search);
        }
    }
});
