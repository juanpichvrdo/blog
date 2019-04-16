const state = {
    comments: [],
    numberOfPages: 0
};

const mutations = {
    SET_COMMENTS(state, comments) {
        state.comments = comments;
    },
    SET_PAGES(state, numberOfPages) {
        state.numberOfPages = numberOfPages;
    }
};

const actions = {
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
    }
};

const getters = {
    allComments: state => state.comments,
    getNumberOfPages: state => state.numberOfPages
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
