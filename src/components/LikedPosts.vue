<template>
    <div class="container px-5">
        <div v-if="posts.length">
            <single-post
                v-for="post in posts"
                :key="post.id"
                :post="post"
                @postDeleted="getLikedPosts"
            />

            <pagination-component
                v-if="posts.length >= MAX_LIST_SIZE"  
                :per-page="MAX_LIST_SIZE"
                :number-of-pages="numberOfPages"
                @pageChanged="onPageChange"
            />
        </div>

        <h4 v-else class="text-center">User doesn't have any liked posts</h4>
    </div>
</template>

<script>
import { MAX_LIST_SIZE, POST_STATE } from "../utils/helpers.js";
import SinglePost from "../components/SinglePost";
import PaginationComponent from "./PaginationComponent";

export default {
    name: "LikedPosts",
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
        this.getLikedPosts();
    },
    methods: {
        getLikedPosts() {
            axios
                .get(
                    `/users/${this.userID}/posts_likes?_expand=post&_page=${
                        this.activePage
                    }&_limit=${MAX_LIST_SIZE}`
                )
                .then(result => {
                    const likes = result.data;
                    if (likes.length) {
                        let posts = [];
                        likes.forEach(likedPost => {
                            if (likedPost.post.state === POST_STATE.published) {
                                posts.push(likedPost.post);
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
            this.getLikedPosts();
        }
    }
};
// _.orderBy(json, ['post.publishDate'], ['desc'])
</script>

<style lang="scss">
</style>
