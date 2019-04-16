const state = {
    search: {
        searhTerm: "",
        searchBy: "title"
    }
};

const mutations = {
    SET_SEARCH(state, search) {
        state.search = search;
    }
};

const actions = {
    setSearch({ commit }, search) {
        commit("SET_SEARCH", search);
    }
};

const getters = {
    getSearchTerm: state => state.search
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
