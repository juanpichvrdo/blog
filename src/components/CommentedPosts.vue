<template>
    <div class="container px-5">
        <div v-if="posts.length">
            <single-post
                v-for="post in posts"
                :key="post.id"
                :post="post"
                @postDeleted="getCommentedPosts"
            />
        </div>
        <div v-else>
            <h4 class="text-center">User doesn't have comments</h4>
        </div>
    </div>
</template>

<script>
import SinglePost from "../components/SinglePost";
import { POST_STATE } from "../utils/helpers.js";

export default {
    name: "CommentedPosts",
    components: {
        SinglePost
    },
    data() {
        return {
            userID: this.$route.params.id,
            posts: []
        };
    },
    created() {
        this.getCommentedPosts();
    },
    methods: {
        getCommentedPosts() {
            axios
                .get(`users/${this.userID}/comments?_expand=post`)
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
