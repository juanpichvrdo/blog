<template>
    <div class="single-post pb-4" @mouseover="showDelete = true" @mouseleave="showDelete = false">
        <div class="container-fluid px-4 py-3 mb-2">
            <div class="d-flex justify-content-between align-items-start">
                <h2 class="single-post--heading mb-3 mb-lg-5">
                    <router-link
                        :to="`/posts/${post.id}`"
                        class="single-post--heading--link"
                    >{{ post.title }}</router-link>
                </h2>
                <div v-if="showDelete && isAuthor" class="d-flex align-items-center">
                    <router-link :to="`/edit-post/${post.id}`" class="mr-3">
                        <font-awesome-icon class="single-post--edit" icon="edit"/>
                    </router-link>
                    <font-awesome-icon
                        class="single-post--delete"
                        icon="times"
                        @click="confirmDelete"
                    />
                </div>
            </div>

            <p v-if="post.edited">Edited</p>
            <div class="single-post--body" v-html="post.resumedBody"/>
        </div>
        <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
                <router-link :to="`/user/${post.userId}`" class="single-post--author--link">
                    <img src="../assets/user-2.png" alt="User profile picture">
                </router-link>
                <div class="ml-3">
                    <p class="single-post--author mb-1 smaller-font">
                        Written by:
                        <router-link
                            :to="`/user/${post.userId}`"
                            class="single-post--author--link"
                        >{{ post.author }}</router-link>
                    </p>
                    <p class="single-post--published mb-0 smaller-font">
                        <router-link
                            :to="`/posts/${post.id}`"
                            class="single-post--published--date light-blue-color"
                        >{{ post.publishingDate | formatDate }}</router-link>
                    </p>
                </div>
            </div>
            <router-link :to="`/posts/${post.id}`" class="single-post--read-more">
                READ MORE
                <font-awesome-icon class="ml-2" icon="arrow-right"/>
            </router-link>
        </div>

        <div class="mt-4 px-4 row justify-content-between">
            <p v-if="post.allowComments">
                <router-link
                    :to="`/posts/${post.id}`"
                    class="light-blue-color"
                >{{ comments }} {{`comment${comments === 1 ? '' : 's'}`}}</router-link>
            </p>
            <p>{{ likes }} likes</p>
        </div>
        <hr>
    </div>
</template>

<script>
import truncate from "html-truncate";
import { mapGetters } from "vuex";
import { POST_STATE } from "../utils/helpers.js";
import postMixins from "../utils/mixins";

export default {
    name: "SinglePost",
    mixins: [postMixins],
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            showDelete: false,
            likes: 0,
            comments: 0
        };
    },
    computed: {
        ...mapGetters(["getUser"]),
        resumedBody() {
            return truncate(this.post.content, 200);
        },
        isAuthor() {
            return this.getUser.id === this.post.userId;
        }
    },
    created() {
        this.getLikes();
        this.getComments();
    },
    methods: {
        deletePost() {
            axios
                .patch(`/posts/${this.post.id}`, {
                    state: POST_STATE.deleted
                })
                .then(() => {
                    this.$emit("postDeleted");
                    // axios
                    //   .patch(`comments/?postID=${this.post.id}`, {
                    //     state: "deleted"
                    //   })
                    //   .then(result => console.log(result));
                });
        },
        getLikes() {
            axios
                .get(`/posts_likes/?postID=${this.post.id}`)
                .then(({ data: likesArray }) => {
                    this.likes = likesArray.length;
                });
        },
        getComments() {
            axios
                .get(`/comments/?postID=${this.post.id}`)
                .then(({ data: commentsArray }) => {
                    this.comments = commentsArray.length;
                });
        }
    }
};
</script>

<style lang="scss">
.single-post {
    &--heading {
        &--link {
            color: $navy-color;
            font-weight: 400;

            &:hover {
                color: #1d70a8;
            }
        }
    }

    &--author {
        &--link {
            color: #707070;

            &:hover {
                color: #1d70a8;
            }
        }
    }

    &--read-more {
        color: $navy-color;
        font-weight: 700;
    }

    &--delete {
        color: #dd1e1e;
        font-size: 1.7rem;
        cursor: pointer;
    }

    &--edit {
        font-size: 1.5rem;
        color: #676767;

        &:hover {
            color: #555454;
        }
    }

    .smaller-font {
        font-size: 0.9rem;
    }

    .light-blue-color {
        color: $light-blue-color;
    }
}
</style>
