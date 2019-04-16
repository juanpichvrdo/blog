<template>
    <div class="container px-5">
        <div v-if="posts.length">
            <single-post v-for="post in posts" :key="post.id" :post="post"/>

            <pagination-component
                v-if="posts.length >= MAX_LIST_SIZE"
                :per-page="MAX_LIST_SIZE"
                :number-of-pages="numberOfPages"
                @pageChanged="onPageChange"
            />
        </div>

        <h4 v-else class="text-center">User doesn't have any created posts</h4>
    </div>
</template>

<script>
import { MAX_LIST_SIZE } from "../utils/helpers.js";
import SinglePost from "./SinglePost";
import PaginationComponent from "./PaginationComponent";

export default {
    name: "CreatedPosts",
    components: {
        SinglePost,
        PaginationComponent
    },
    data() {
        return {
            userID: this.$route.params.id,
            posts: [],
            activePage: 1,
            numberOfPages: 0,
            MAX_LIST_SIZE
        };
    },
    computed: {},
    created() {
        this.getCreatedPosts();
    },
    methods: {
        getCreatedPosts() {
            axios
                .get(
                    `/users/${this.userID}/posts?state=1&_page=${
                        this.activePage
                    }&_limit=${MAX_LIST_SIZE}&_order=desc&_sort=publishDate`
                )
                .then(result => {
                    if (result.data.length) {
                        this.posts = result.data;

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
            this.getCreatedPosts();
        }
    }
};
</script>

<style lang="scss">
</style>
