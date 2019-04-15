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
        comments: [],
        numberOfPages: 0
    },
    getters: {
        isAuthenticated: state => state.cookie || Object.keys(state.user).length,
        allPosts: state => state.posts,
        getUser: state => state.user,
        getSearchTerm: state => state.search,
        allComments: state => state.comments,
        getNumberOfPages: state => state.numberOfPages
    },
    mutations: {
        LOGOUT_USER(state) {
            state.user = {};
            state.cookie = null;
        },
        SET_USER(state, user) {
            state.user = user;
        },
        SET_POSTS(state, posts) {
            state.posts = posts;
        },
        SET_SEARCH(state, search) {
            state.search = search;
        },
        SET_COMMENTS(state, comments) {
            state.comments = comments;
        },
        SET_PAGES(state, numberOfPages) {
            state.numberOfPages = numberOfPages;
        }
    },
    actions: {
        getUser({ commit }) {
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
        getComments({ commit }, { postId, activePage, listSize }) {
            axios
                .get(
                    `/comments?&postId=${postId}&state=1&_page=${activePage}&_limit=${listSize}&_order=desc&_sort=datePublish&_embed=replies`
                )
                .then(result => {
                    if (result.data.length) {
                        const totalComments = Number(result.headers["x-total-count"]);
                        const numberOfPages = Math.ceil(totalComments / listSize);

                        commit("SET_COMMENTS", result.data);
                        commit("SET_PAGES", numberOfPages);
                    }
                });
        },
        authenticateUser({ commit }, user) {
            commit("SET_USER", user);
        },
        LOGOUT_USER({ commit }) {
            Cookies.remove("id");
            commit("LOGOUT_USER");
        },
        SET_POSTS({ commit }, posts) {
            commit("SET_POSTS", posts);
        },
        SET_SEARCH({ commit }, search) {
            commit("SET_SEARCH", search);
        }
    }
});
