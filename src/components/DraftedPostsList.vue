<template>
    <div class="drafted-posts">
        <h3 class="mb-4 text-center">Drafted Posts</h3>
        <div class="table-responsive">
            <table class="table">
                <table-head
                    :draft="false"
                    @changeSort="methodOfSorting => sortBy = methodOfSorting"
                />
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
import TableHead from "./TableHead";

export default {
    name: "DraftedPostList",
    components: {
        SinglePost,
        PostRow,
        TableHead
    },
    data() {
        return {
            userID: this.$route.params.id,
            posts: [],
            sortBy: "number",
            order: "desc"
        };
    },
    computed: {
        sortedPosts() {
            return _.orderBy(this.posts, [this.sortBy], [this.order]);
        }
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
        },
        changeSort(sortBy) {
            console.log(sortBy);
        }
    }
};
</script>

<style lang="scss">
</style>
