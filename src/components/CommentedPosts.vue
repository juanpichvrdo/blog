<template>
    <div class="container px-5">
        <div v-if="posts.length">
            <single-post
                v-for="post in posts"
                :key="post.id"
                :post="post"
                @postDeleted="getCommentedPosts"
            />

            <pagination-component
                :per-page="MAX_LIST_SIZE"
                :number-of-pages="numberOfPages"
                @pageChanged="onPageChange"
            />
        </div>
        <div v-else>
            <h4 class="text-center">User doesn't have comments</h4>
        </div>
    </div>
</template>

<script>
import { MAX_LIST_SIZE, POST_STATE } from "../utils/helpers.js";
import SinglePost from "./SinglePost";
import PaginationComponent from "./PaginationComponent";

export default {
    name: "CommentedPosts",
    components: {
        SinglePost,
        PaginationComponent
    },
    data() {
        return {
            userID: this.$route.params.id,
            posts: [],
            activePage: 1,
            numberOfPages: 0,
            MAX_LIST_SIZE
        };
    },
    created() {
        this.getCommentedPosts();
    },
    methods: {
        getCommentedPosts() {
            axios
                .get(
                    `users/${this.userID}/comments?_expand=post&_page=${
                        this.activePage
                    }&_limit=${MAX_LIST_SIZE}`
                )
                .then(result => {
                    const comments = result.data;
                    if (comments.length) {
                        let posts = [];
                        comments.forEach(comment => {
                            if (comment.post.state === POST_STATE.published) {
                                posts.push(comment.post);
                            }
                        });
                        this.posts = _.uniqBy(posts, "id");

                        const totalPosts = Number(
                            result.headers["x-total-count"]
                        );
                        this.numberOfPages = Math.ceil(
                            totalPosts / MAX_LIST_SIZE
                        );
                    }
                });
        },
        onPageChange(page) {
            this.activePage = page;
            this.getCommentedPosts();
        }
    }
};
</script>

<style lang="scss">
</style>
