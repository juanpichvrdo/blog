<template>
    <div class="container px-5">
        <div v-if="publishedPosts.length">
            <single-post
                v-for="post in publishedPosts"
                :key="post.id"
                :post="post"
                @postDeleted="getCreatedPosts"
            />
        </div>
        <div v-else>
            <h4 class="text-center">User doesn't have any published posts</h4>
        </div>
    </div>
</template>

<script>
import SinglePost from "../components/SinglePost";
import { POST_STATE } from "../utils/helpers.js";

export default {
    name: "CreatedPosts",
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
            return this.posts
                .filter(post => post.state === POST_STATE.published)
                .reverse();
        }
    },
    created() {
        this.getCreatedPosts();
    },
    methods: {
        getCreatedPosts() {
            axios
                .get(`/posts?user_id=${this.userID}`)
                .then(({ data: posts }) => (this.posts = posts));
        }
    }
};
</script>

<style lang="scss">
</style>
