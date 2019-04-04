<template>
    <div class="post-page">
        <div class="container-fluid">
            <div class="row">
                <div class="post-page--body text-center text-md-left">
                    <nav class="post-page--breadcrumb">
                        <ol class="breadcrumb pb-0 mb-0">
                            <li class="breadcrumb-item d-flex align-items-center">
                                <router-link class="post-page--link" to="/">ALL POSTS</router-link>
                            </li>
                            <li class="breadcrumb-item active d-flex align-items-center">
                                <router-link
                                    class="post-page--link post-page--link--breadcrumb"
                                    to
                                >{{ post.title }}</router-link>
                            </li>
                        </ol>
                    </nav>

                    <div class="px-xl-5">
                        <h1 class="post-page--title display-4">{{ post.title }}</h1>
                        <div
                            v-if="isAuthor"
                            class="d-flex align-items-center justify-content-center justify-content-md-start my-3"
                        >
                            <router-link :to="`/edit-post/${postID}`" class="mr-3">
                                <font-awesome-icon class="individual-post--edit" icon="edit"/>
                            </router-link>
                            <div
                                class="post-page--delete d-flex align-items-center"
                                @click="confirmDeletePost"
                            >
                                Delete Post
                                <font-awesome-icon class="ml-2 individual-post--icon" icon="times"/>
                            </div>
                        </div>
                        <div
                            class="d-flex align-items-center mb-4 justify-content-center justify-content-md-start"
                        >
                            <router-link :to="`/user/${post.userId}`" class="post-page--link">
                                <img src="../assets/user-2.png" alt="User profile picture">
                            </router-link>

                            <div class="ml-3">
                                <p class="post-page--user mb-0 smaller-font">
                                    Written by:
                                    <router-link
                                        :to="`/user/${post.userId}`"
                                        class="post-page--link"
                                    >{{ post.user }}</router-link>
                                </p>
                                <p
                                    class="post-page--published mb-0 smaller-font"
                                >{{ post.publishDate | formatDate }}</p>
                            </div>
                        </div>

                        <hr>
                        <div class="post-page--content mt-5" v-html="post.content"/>
                        <div v-if="isAuthenticated" class="d-flex align-items-center mt-5">
                            <p class="mb-0 mr-3">{{ likes }} likes</p>
                            <button class="btn btn-info" @click="toggleLike">Toggle Like</button>
                            <p
                                v-if="post.allowComments"
                                class="mb-0 ml-3"
                            >{{ comments }} {{`comment${comments === 1 ? '' : 's'}`}}</p>
                        </div>
                        <div v-if="isAuthenticated && post.allowComments">
                            <hr>
                            <CommentsSection :postId="post.id" @commentAdded="getComments()"/>
                        </div>
                        <div v-else class="text-center my-5">
                            <router-link to="/login">Login to comment</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

import CommentsSection from "../components/CommentsSection";
import { POST_STATE } from "../utils/helpers.js";
import postMixins from "../utils/mixins";

export default {
    name: "PostPage",
    components: {
        CommentsSection
    },
    mixins: [postMixins],
    data() {
        return {
            postID: this.$route.params.id,
            post: {},
            likes: 0,
            alreadyLiked: false,
            comments: 0,
            userLike: null,
            POST_STATE
        };
    },
    computed: {
        ...mapGetters(["isAuthenticated", "getUser"]),
        isAuthor() {
            return this.getUser.id === this.post.userId;
        }
    },
    created() {
        this.getPost();
        this.getLikes();
        this.getComments();
    },

    methods: {
        getPost() {
            axios.get(`/posts?id=${this.postID}`).then(({ data: post }) => {
                if (post.length) {
                    this.post = post[0];
                    // this.$store.dispatch("setPosts", posts);
                }
            });
        },
        toggleLike() {
            if (this.alreadyLiked) {
                axios
                    .delete(`/posts_likes/${this.userLike}`)
                    .then(() => {
                        this.alreadyLiked = false;
                        this.getLikes();
                    })
                    .catch(err => console.log(err));
            } else {
                axios
                    .post(`/posts_likes`, {
                        postId: Number(this.postID),
                        userId: this.getUser.id
                    })
                    .then(() => {
                        this.getLikes();
                    });
            }
        },
        getLikes() {
            axios
                .get(`/posts_likes/?postId=${this.postID}`)
                .then(({ data: likesArray }) => {
                    this.likes = likesArray.length;
                    this.getLike();
                    if (
                        likesArray.find(like => like.userId === this.getUser.id)
                    ) {
                        this.alreadyLiked = true;
                    }
                });
        },
        getLike() {
            axios
                .get(
                    `posts_likes/?postId=${this.postID}&userId=${
                        this.getUser.id
                    }`
                )
                .then(({ data }) => {
                    if (data.length) {
                        this.userLike = data[0].id;
                    }
                });
        },
        getComments() {
            axios
                .get(`/comments/?postId=${this.postID}`)
                .then(({ data: commentsArray }) => {
                    this.comments = commentsArray.length;
                });
        },
        deletePost() {
            axios
                .patch(`/posts/${this.postID}`, {
                    state: this.POST_STATE.deleted
                })
                .then(() => {
                    this.$router.push("/");
                    // axios
                    //   .patch(`comments/?postID=${this.id}`, {
                    //     state: "deleted"
                    //   })
                    //   .then(result => console.log(result));
                });
        }
    }
};
</script>

<style lang="scss">
.post-page {
    background-color: $white-color;
    min-height: 100vh;

    &--body {
        padding-left: 150px;
        padding-right: 150px;
        width: 100%;

        @media only screen and (max-width: 1500px) {
            padding-left: 65px;
            padding-right: 65px;
        }

        @media only screen and (max-width: 1200px) {
            padding-left: 45px;
            padding-right: 45px;
        }

        @media only screen and (max-width: 800px) {
            padding-left: 30px;
            padding-right: 30px;
        }
    }

    &--delete {
        cursor: pointer;

        &:hover {
            color: #a12e2e;
        }
    }

    &--content {
        padding-right: 12rem;
        @media only screen and (max-width: 1300px) {
            padding-right: 8rem;
        }
        @media only screen and (max-width: 1100px) {
            padding-right: 0;
        }
    }

    &--link,
    &--published {
        color: $light-blue-color;

        &--breadcrumb {
            text-transform: uppercase;
        }
    }

    &--breadcrumb {
        .breadcrumb {
            background-color: $white-color;
        }
    }

    &--title {
        color: $navy-color;
        font-family: Georgia, "Times New Roman", Times, serif;
        font-weight: 700;
    }

    &--search {
        background-color: #ebeef1;

        &--heading {
            font-family: Georgia, "Times New Roman", Times, serif;
            color: $navy-color;
            font-weight: 600;
        }
    }
}
</style>
