<template>
    <div class="drafted-posts">
        <h3 class="mb-4 text-center">Drafted Posts</h3>
        <div class="table-responsive">
            <table class="table">
                <table-head
                    :draft="false"
                    @changeSort="methodOfSorting => sortBy = methodOfSorting"
                    @orderChanged="newOrder => order = newOrder"
                />
                <tbody>
                    <post-row
                        v-for="(post, index) in sortedPosts"
                        :key="post.id"
                        :post="post"
                        :index="index + 1"
                    />
                </tbody>
            </table>
        </div>

        <pagination-component
            :per-page="MAX_LIST_SIZE"
            :number-of-pages="numberOfPages"
            @pageChanged="onPageChange"
        />
    </div>
</template>

<script>
import { MAX_LIST_SIZE } from "../utils/helpers.js";
import SinglePost from "./SinglePost";
import PostRow from "./PostRow";
import TableHead from "./TableHead";
import PaginationComponent from "./PaginationComponent";

export default {
    name: "DraftedPostList",
    components: {
        SinglePost,
        PostRow,
        TableHead,
        PaginationComponent
    },
    data() {
        return {
            userID: this.$route.params.id,
            posts: [],
            sortBy: "createdDate",
            order: "desc",
            MAX_LIST_SIZE,
            activePage: 1,
            numberOfPages: 0
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
                .get(
                    `users/${this.userID}/posts?state=2&_page=${
                        this.activePage
                    }&_limit=${
                        this.MAX_LIST_SIZE
                    }&_order=desc&_sort=createdDate`
                )
                .then(result => {
                    if (result.data.length) {
                        this.posts = result.data.reverse();

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
            this.getUserPosts();
        }
    }
};
</script>

<style lang="scss">
</style>
