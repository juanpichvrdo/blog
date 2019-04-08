<template>
    <div class="published-posts">
        <h3 class="mb-4 text-center">Published Posts</h3>
        <div class="table-responsive">
            <table class="table">
                <thead class="published-posts--thead text-white">
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
                        this.posts = posts.reverse();
                    }
                });
        }
    }
};
</script>

<style lang="scss">
.published-posts {
    &--thead {
        background-color: $navy-color;
    }
}
</style>
