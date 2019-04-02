<template>
    <div class="container px-5">
        <IndividualPost
            v-for="post in publishedPosts"
            :key="post.id"
            :title="post.title"
            :author="post.author"
            :publishing-date="post.publishingDate"
            :content="post.content"
            :edited="post.edited"
            :id="post.id"
            :user-id="post.userId"
            :allow-comments="post.allowComments"
        />
    </div>
</template>

<script>
import IndividualPost from "../components/IndividualPost";
import { POSTSTATE } from "../utils/helpers.js";

export default {
    name: "CreatedPostsActivity",
    components: {
        IndividualPost
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
                post => post.state === POSTSTATE.published
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
