<template>
    <div class="published-posts">
        <h3 class="mb-4 text-center">Published Posts</h3>
        <div class="table-responsive mb-5">
            <table class="table">
                <table-head
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
import TableHead from "./TableHead";
import PostRow from "./PostRow";
import PaginationComponent from "./PaginationComponent";

export default {
    name: "PublishedPostList",
    components: {
        TableHead,
        PostRow,
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
                    `/users/${this.userID}/posts?state=1&_page=${
                        this.activePage
                    }&_limit=${
                        this.MAX_LIST_SIZE
                    }&_order=desc&_sort=createdDate`
                )
                .then(result => {
                    if (result.data.length) {
                        this.posts = result.data;

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
