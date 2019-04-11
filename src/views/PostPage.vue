<template>
    <div class="post-page">
        <div class="container-fluid">
            <div class="row">
                <div class="post-page--body">
                    <nav class="post-page--breadcrumb">
                        <ol class="breadcrumb pb-0 mb-0">
                            <li class="breadcrumb-item d-flex align-items-center">
                                <router-link
                                    v-if="previousUrl === 'searchPosts'"
                                    class="post-page--link"
                                    to="/search-posts"
                                >SEARCH POSTS</router-link>
                                <router-link v-else class="post-page--link" to="/">ALL POSTS</router-link>
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
                        <h1
                            class="post-page--title display-4 text-center text-md-left"
                        >{{ post.title }}</h1>

                        <div class="d-flex align-items-center mb-4 justify-content-between">
                            <div class="d-flex align-items-center">
                                <router-link :to="`/user/${post.userId}`" class="post-page--link">
                                    <img src="../assets/user-2.png" alt="User profile picture">
                                </router-link>
                                <div class="ml-2">
                                    <p class="post-page--user mb-0 smaller-font">
                                        Written by:
                                        <router-link
                                            :to="`/user/${post.userId}`"
                                            class="post-page--link"
                                        >{{ author }}</router-link>
                                    </p>
                                    <p
                                        class="post-page--published mb-0 smaller-font"
                                    >{{ post.publishDate | formatDate }}</p>
                                </div>
                            </div>

                            <div
                                v-if="isAuthor"
                                class="d-flex align-items-center justify-content-center justify-content-md-start my-3"
                            >
                                <div
                                    class="post-page--delete d-flex align-items-center mr-3"
                                    @click="confirmDeletePost"
                                >
                                    <font-awesome-icon
                                        class="ml-2 individual-post--icon"
                                        icon="times"
                                    />
                                </div>

                                <router-link :to="`/edit-post/${postID}`">
                                    <font-awesome-icon class="post-page--edit" icon="edit"/>
                                </router-link>
                            </div>
                        </div>

                        <hr>
                        <div class="post-page--content mt-5" v-html="post.content"/>
                        <div
                            v-if="isAuthenticated"
                            class="d-flex align-items-center justify-content-between mt-5"
                        >
                            <button
                                :class="{'like-active': alreadyLiked}"
                                class="post-page--like btn btn-info d-flex align-items-center"
                                @click="toggleLike"
                            >
                                <font-awesome-icon
                                    class="post-page--like--icon mr-2"
                                    icon="thumbs-up"
                                />
                                <span v-if="likes">{{ likes }}</span>
                            </button>
                            <div v-if="comments" class="post-page--comment d-flex">
                                <p v-if="post.allowComments" class="mb-0 ml-3">{{ comments }}</p>
                                <font-awesome-icon
                                    class="post-page--comment--icon ml-2"
                                    icon="comment"
                                />
                            </div>
                        </div>
                        <div v-if="isAuthenticated && post.allowComments">
                            <hr>
                            <CommentsSection :post-id="post.id" @commentsChanged="getComments()"/>
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
import toastr from "toastr";
import CommentsSection from "../components/CommentsSection";
import { POST_STATE } from "../utils/helpers.js";
import { postMixins, singlePostMixins } from "../utils/mixins";

export default {
    name: "PostPage",
    components: {
        CommentsSection
    },
    mixins: [postMixins, singlePostMixins],
    data() {
        return {
            postID: this.$route.params.id,
            post: {},
            likes: 0,
            alreadyLiked: false,
            comments: 0,
            userLike: null,
            POST_STATE,
            previousUrl: "",
            author: ""
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
        getAuthor() {
            axios.get(`/users/${this.post.userId}`).then(({ data: user }) => {
                this.author = user.username;
            });
        },
        getPost() {
            axios.get(`/posts?id=${this.postID}`).then(({ data: post }) => {
                if (post.length) {
                    this.post = post[0];
                    this.getAuthor();
                } else {
                    this.$router.replace("/404");
                }
            });
        },
        toggleLike() {
            if (this.alreadyLiked) {
                this.deleteLike();
            } else {
                this.sendLike();
            }
        },
        deleteLike() {
            axios
                .delete(`/posts_likes/${this.userLike}`)
                .then(() => {
                    this.alreadyLiked = false;
                    this.getLikes();
                })
                .catch(() =>
                    toastr.error("Please try again", "Error doing that request")
                );
        },
        sendLike() {
            axios
                .post(`/posts_likes`, {
                    postId: Number(this.postID),
                    userId: this.getUser.id
                })
                .then(() => {
                    this.getLikes();
                });
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
        getComments() {
            axios
                .get(`/comments/?postId=${this.postID}`)
                .then(({ data: commentsArray }) => {
                    this.comments = commentsArray.filter(
                        comment => comment.state === POST_STATE.published
                    ).length;
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
        deletePost() {
            axios
                .patch(`/posts/${this.postID}`, {
                    state: this.POST_STATE.deleted
                })
                .then(() => {
                    this.$router.replace("/");
                });
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.previousUrl = from.name;
        });
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

    &--edit,
    &--delete {
        font-size: 2rem;
    }

    &--delete {
        cursor: pointer;
        color: $red-color;

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

    &--comment {
        color: $navy-color;

        &--icon {
            font-size: 1.2rem;
        }
    }

    &--like {
        background-color: $navy-color;
        padding: 10px 15px;

        &:focus {
            box-shadow: none;
        }
    }

    .like-active {
        box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.4);
    }
}
</style>
