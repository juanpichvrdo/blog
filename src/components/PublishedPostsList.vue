<template>
    <div class="published-posts">
        <h3>Published Posts</h3>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Comments</th>
                    <th scope="col">Likes</th>
                    <th scope="col">Created Date</th>
                    <th scope="col">Publish Date</th>
                </tr>
            </thead>
            <tbody>
                <post-row
                    v-for="(post, index) in posts"
                    :key="post.id"
                    :post="post"
                    :index="index + 1"
                />
            </tbody>
        </table>
    </div>
</template>

<script>
import SinglePost from "./SinglePost";
import PostRow from "./PostRow";

export default {
    name: "PublishedPostList",
    components: {
        SinglePost,
        PostRow
    },
    data() {
        return {
            userID: this.$route.params.id,
            activeTab: "created",
            posts: []
        };
    },

    created() {
        this.getUserPosts();
    },
    methods: {
        getUserPosts() {
            axios
                .get(`users/${this.userID}/posts?state=1`)
                .then(({ data: posts }) => {
                    if (posts.length) {
                        this.posts = posts;
                    }
                });
        }
    }
};
</script>

<style lang="scss">
</style>
