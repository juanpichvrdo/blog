<template>
    <div class="drafted-posts">
        <h3 class="mb-4 text-center">Drafted Posts</h3>
        <div class="table-responsive">
            <table class="table">
                <thead class="drafted-posts--thead text-white">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Created Date</th>
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
    name: "DraftedPostList",
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
                .get(`users/${this.userID}/posts?state=2`)
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
.drafted-posts {
    &--thead {
        background-color: $navy-color;
    }
}
</style>
