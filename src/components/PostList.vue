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
            :per-page="perPage"
            :number-of-pages="numberOfPages"
            @pageChanged="onPageChange"
        />
    </div>
</template>

<script>
import { mapGetters } from "vuex";

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
            perPage: 3,
            numberOfPages: 0
            // disablePrev: true,
            // disableNext: false
        };
    },
    computed: {
        ...mapGetters(["isAuthenticated", "allPosts"])
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
                    }&_limit=3&_order=desc&_sort=createdDate`
                )
                .then(result => {
                    if (result.data.length) {
                        const totalPosts = Number(
                            result.headers["x-total-count"]
                        );
                        this.numberOfPages = Math.ceil(
                            totalPosts / this.perPage
                        );
                        this.$store.dispatch("setPosts", result.data);
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
