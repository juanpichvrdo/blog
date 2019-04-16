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
                <single-post
                    v-for="post in searchResults"
                    :key="post.id"
                    :post="post"
                    @postDeleted="searchPost()"
                />
            </div>

            <pagination-component
                :per-page="MAX_LIST_SIZE"
                :number-of-pages="numberOfPages"
                @pageChanged="onPageChange"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { MAX_LIST_SIZE } from "../utils/helpers.js";
import SinglePost from "../components/SinglePost";
import PaginationComponent from "../components/PaginationComponent";

export default {
    name: "SearchPage",
    components: {
        SinglePost,
        PaginationComponent
    },
    data() {
        return {
            searchTerm: "",
            searchBy: "title",
            searchResults: [],
            MAX_LIST_SIZE,
            activePage: 1,
            numberOfPages: 0
        };
    },
    computed: {
        ...mapGetters({ getSearchTerm: "App/getSearchTerm" })
    },
    created() {
        this.searchTerm = this.getSearchTerm.searchTerm;
        this.searchBy = this.getSearchTerm.searchBy;
        this.searchPost();
    },
    methods: {
        searchPost() {
            axios
                .get(
                    `/posts?${this.searchBy}_like=${
                        this.searchTerm
                    }&state=1&_page=${this.activePage}&_limit=${
                        this.MAX_LIST_SIZE
                    }&_order=desc&_sort=publishDate`
                )
                .then(result => {
                    if (result.data.length) {
                        this.searchResults = result.data;

                        const totalPosts = Number(
                            result.headers["x-total-count"]
                        );
                        this.numberOfPages = Math.ceil(
                            totalPosts / MAX_LIST_SIZE
                        );
                    }
                });
        },
        onPageChange(page) {
            this.activePage = page;
            this.searchPost();
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
