<template>
    <div class="container-fluid">
        <div class="m-3 mt-4 m-md-5 d-flex justify-content-between align-items-center">
            <h2 class="post-list--heading">All posts</h2>
            <router-link
                v-if="isAuthenticated"
                to="/create-post"
                class="post-list--create-post btn btn-success"
            >Create Post</router-link>
        </div>
        <div class="container mt-3">
            <hr>
            <div v-if="publishedPosts.length">
                <single-post
                    v-for="post in publishedPosts"
                    :key="post.id"
                    :post="post"
                    @postDeleted="getPosts"
                />
            </div>
            <div v-else>
                <h4 class="text-center mt-5">There are no posts</h4>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

import SinglePost from "./SinglePost";
import { POST_STATE } from "../utils/helpers.js";

export default {
    name: "PostList",
    components: {
        SinglePost
    },
    computed: {
        ...mapGetters(["isAuthenticated", "allPosts"]),
        publishedPosts() {
            return this.allPosts.filter(
                post => post.state === POST_STATE.published
            );
        }
    },
    created() {
        this.getPosts();
    },
    methods: {
        getPosts() {
            axios.get("/posts").then(({ data: posts }) => {
                if (posts.length) {
                    this.$store.dispatch("setPosts", posts);
                }
            });
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
