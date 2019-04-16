<template>
    <div class="container-fluid">
        <div class="container mt-3">
            <div class="mt-5 d-flex justify-content-between align-items-center">
                <h2 class="post-list--heading">All posts</h2>
                <router-link
                    v-if="isAuthenticated"
                    to="/create-post"
                    class="post-list--create-post btn btn-success"
                >Create Post</router-link>
            </div>
            <hr>
            <div v-if="allPosts.length">
                <single-post
                    v-for="post in allPosts"
                    :key="post.id"
                    :post="post"
                    @postDeleted="getPosts"
                />
            </div>
            <div v-else>
                <h4 class="text-center mt-5">There are no posts</h4>
            </div>
        </div>

        <pagination-component
            :per-page="MAX_LIST_SIZE"
            :number-of-pages="numberOfPages"
            @pageChanged="onPageChange"
        />
    </div>
</template>

<script>
import { mapGetters } from "vuex";

import { MAX_LIST_SIZE } from "../utils/helpers.js";

import SinglePost from "./SinglePost";
import PaginationComponent from "./PaginationComponent";

export default {
    name: "PostList",
    components: {
        SinglePost,
        PaginationComponent
    },
    data() {
        return {
            activePage: 1,
            MAX_LIST_SIZE,
            numberOfPages: 0
        };
    },
    computed: {
        ...mapGetters({
            isAuthenticated: "User/isAuthenticated",
            allPosts: "Posts/allPosts"
        })
    },
    created() {
        this.getPosts();
    },
    methods: {
        getPosts() {
            axios
                .get(
                    `/posts?state=1&_page=${
                        this.activePage
                    }&_limit=${MAX_LIST_SIZE}&_order=desc&_sort=publishDate`
                )
                .then(result => {
                    if (result.data.length) {
                        const totalPosts = Number(
                            result.headers["x-total-count"]
                        );
                        this.numberOfPages = Math.ceil(
                            totalPosts / MAX_LIST_SIZE
                        );
                        this.$store.dispatch("Posts/setPosts", result.data);
                    }
                });
        },
        onPageChange(page) {
            this.activePage = page;
            this.getPosts();
        }
    }
};
</script>

<style lang="scss">
.post-list {
    padding-left: 100px;
    padding-right: 100px;
    min-height: 100vh;
    width: 100%;

    @media only screen and (max-width: 1600px) {
        padding-left: 50px;
        padding-right: 50px;
    }

    @media only screen and (max-width: 1250px) {
        padding-left: 25px;
        padding-right: 25px;
    }

    &--heading {
        font-family: Georgia, "Times New Roman", Times, serif;
        font-weight: 600;
        color: $navy-color;
    }
}
</style>
