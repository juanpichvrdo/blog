<template>
    <div
        class="individual-post pb-4"
        @mouseover="showDelete = true"
        @mouseleave="showDelete = false"
    >
        <div class="container-fluid px-4 py-3 mb-2">
            <div class="d-flex justify-content-between align-items-start">
                <h3 class="display-4 individual-post--heading mb-3 mb-lg-5">
                    <router-link
                        :to="`/posts/${id}`"
                        class="individual-post--heading--link"
                    >{{ title }}</router-link>
                </h3>
                <div v-if="showDelete && isAuthor" class="d-flex align-items-center">
                    <router-link :to="`/edit-post/${id}`" class="mr-3">
                        <font-awesome-icon class="individual-post--edit" icon="edit"/>
                    </router-link>
                    <font-awesome-icon
                        class="individual-post--delete"
                        icon="times"
                        @click="confirmDelete"
                    />
                    <!-- <font-awesome-icon
                        class="individual-post--delete"
                        icon="times"
                        @click="deletePost"
                    />-->
                </div>
            </div>

            <p v-if="edited">Edited</p>
            <div class="individual-post--body" v-html="resumedBody"/>
        </div>
        <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
                <a href="#">
                    <img src="../assets/user-2.png" alt="User profile picture">
                </a>
                <div class="ml-3">
                    <p class="individual-post--author mb-1 smaller-font">
                        Written by:
                        <a class="individual-post--author--link" href="#">{{ author }}</a>
                    </p>
                    <p class="individual-post--published mb-0 smaller-font">
                        <router-link
                            :to="`/posts/${id}`"
                            class="individual-post--published--date"
                        >{{ publishingDate | formatDate }}</router-link>
                    </p>
                </div>
            </div>
            <router-link :to="`/posts/${id}`" class="individual-post--read-more">
                READ MORE
                <font-awesome-icon class="ml-2" icon="arrow-right"/>
            </router-link>
        </div>

        <div class="mt-4 row justify-content-between">
            <p v-if="allowComments">
                <router-link
                    :to="`/posts/${id}`"
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
import { POSTSTATE } from "../helpers";
// import { posix } from "path";
import postMixins from "../utils/mixins";

export default {
    name: "IndividualPost",
    mixins: [postMixins],
    props: {
        title: String,
        author: String,
        publishingDate: String,
        content: String,
        edited: Boolean,
        id: Number,
        userId: Number,
        allowComments: Boolean
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
            return truncate(this.content, 200);
        },
        // convertedPublishingDate() {
        //     return moment(this.publishingDate).format("MMMM DD, YYYY - LT");
        // },
        isAuthor() {
            return this.getUser.id === this.userId;
        }
    },
    created() {
        this.getLikes();
        this.getComments();
    },
    methods: {
        deletePost() {
            axios
                .patch(`/posts/${this.id}`, {
                    state: POSTSTATE.deleted
                })
                .then(() => {
                    this.$emit("postDeleted");
                    // axios
                    //   .patch(`comments/?postID=${this.id}`, {
                    //     state: "deleted"
                    //   })
                    //   .then(result => console.log(result));
                });
        },
        getLikes() {
            axios
                .get(`/posts_likes/?postID=${this.id}`)
                .then(({ data: likesArray }) => {
                    this.likes = likesArray.length;
                });
        },
        getComments() {
            axios
                .get(`/comments/?postID=${this.id}`)
                .then(({ data: commentsArray }) => {
                    this.comments = commentsArray.length;
                });
        }
    }
};
</script>

<style lang="scss">
.individual-post {
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
                background: #1d70a8;
            }
        }
    }

    &--published {
        &--date {
            color: $light-blue-color;
        }
    }

    &--read-more {
        color: $navy-color;
        font-weight: 700;
    }

    .smaller-font {
        font-size: 0.9rem;
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
}
</style>
