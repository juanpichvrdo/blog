<template>
    <div class="container px-5">
        <div v-if="publishedPosts.length">
            <single-post
                v-for="post in publishedPosts"
                :key="post.id"
                :post="post"
                @postDeleted="getLikedPosts"
            />
        </div>
        <div v-else>
            <h4 class="text-center">User doesn't have any liked posts</h4>
        </div>
    </div>
</template>

<script>
import SinglePost from "../components/SinglePost";
import { POST_STATE } from "../utils/helpers.js";

export default {
    name: "LikedPosts",
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
        this.getLikedPosts();
    },
    methods: {
        getLikedPosts() {
            axios
                .get(`/users/${this.userID}/posts_likes?_expand=post`)
                .then(({ data: comments }) => {
                    let posts = [];
                    comments.forEach(comment => {
                        if (comment.post.state === POST_STATE.published) {
                            posts.push(comment.post);
                        }
                    });
                    this.posts = _.uniqBy(posts, "id");
                });
        }
    }
};
</script>

<style lang="scss">
</style>
