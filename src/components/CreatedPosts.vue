<template>
    <div class="container px-5">
        <SinglePost v-for="post in publishedPosts" :key="post.id" :post="post"/>
    </div>
</template>

<script>
import SinglePost from "../components/SinglePost";
import { POST_STATE } from "../utils/helpers.js";

export default {
    name: "CreatedPostsActivity",
    components: {
        SinglePost
    },
    data() {
        return {
            userID: this.$route.params.id,
            posts: []
        };
    },
    computed: {
        publishedPosts() {
            return this.posts.filter(
                post => post.state === POST_STATE.published
            );
        }
    },
    created() {
        this.getCreatedPosts();
    },
    methods: {
        getCreatedPosts() {
            axios
                .get(`/posts?userId=${this.userID}`)
                .then(({ data: posts }) => (this.posts = posts));
        }
    }
};
</script>

<style lang="scss">
</style>
