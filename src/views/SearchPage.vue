<template>
    <div class="search-page container">
        <div class="search-posts mt-5">
            <form class="search-posts--form" @submit.prevent="searchPost">
                <div class="input-group">
                    <span class="search-page--icon search-posts--icon">
                        <font-awesome-icon class="search-posts--icon--svg" icon="search"/>
                    </span>
                    <input
                        v-model.trim="searchTerm"
                        type="text"
                        class="search-page--input search-posts--input form-control"
                        placeholder="Search"
                    >
                    <div class="input-group-append">
                        <button type="submit" class="px-5 search-posts--button btn text-white">GO!</button>
                    </div>
                </div>
                <div class="mt-4 d-flex">
                    <p class="mr-3">Search By:</p>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input
                            id="byTitle"
                            v-model="searchBy"
                            type="radio"
                            class="custom-control-input"
                            value="title"
                        >
                        <label class="custom-control-label" for="byTitle">Title</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input
                            id="byAthor"
                            v-model="searchBy"
                            type="radio"
                            class="custom-control-input"
                            value="user"
                        >
                        <label class="custom-control-label" for="byAthor">Author</label>
                    </div>

                    <div class="custom-control custom-radio custom-control-inline">
                        <input
                            id="byContent"
                            v-model="searchBy"
                            type="radio"
                            class="custom-control-input"
                            value="content"
                        >
                        <label class="custom-control-label" for="byContent">Content</label>
                    </div>
                </div>
            </form>
            <div v-if="searchResults.length" class="mt-3">
                <single-post v-for="post in searchResults" :key="post.id" :post="post"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import SinglePost from "../components/SinglePost";

export default {
    name: "SearchPage",
    components: {
        SinglePost
    },
    data() {
        return {
            searchTerm: "",
            searchBy: "title",
            searchResults: []
        };
    },
    computed: {
        ...mapGetters(["getSearchTerm"])
    },
    created() {
        this.searchTerm = this.getSearchTerm.searchTerm;
        this.searchBy = this.getSearchTerm.searchBy;
        this.searchPost();
    },
    methods: {
        searchPost() {
            axios
                .get(`/posts?${this.searchBy}_like=${this.searchTerm}`)
                .then(({ data: posts }) => (this.searchResults = posts));
        }
    }
};
</script>

<style lang="scss">
.search-page {
    &--input {
        padding: 30px;
    }

    &--icon {
        top: 29% !important;
        font-size: 1.2rem;
    }
}
</style>
