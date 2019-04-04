<template>
    <div class="comment mb-5">
        <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
                <router-link :to="`/user/${comment.userId}`" class="comment--picture">
                    <img src="../assets/user-2.png" alt="User profile picture">
                </router-link>
                <p class="mb-0 ml-2">
                    <router-link
                        :to="`/user/${comment.userId}`"
                        class="comment--user mr-1"
                    >{{ user.username }}</router-link>
                    <span class="comment--date ml-2">{{ comment.datePublish | formatDate }}</span>
                </p>
            </div>
            <div v-if="isAuthor" class="d-flex align-items-center">
                <font-awesome-icon class="comment--edit mx-2" icon="edit"/>

                <font-awesome-icon
                    class="comment--delete mx-2"
                    icon="times"
                    @click="confimDeleteComment"
                />
            </div>
        </div>
        <div class="comment--body ml-5 mt-3">
            <div class="comment--body--content">
                <div class v-html="comment.body"/>
            </div>

            <div class="comment--body--info d-flex justify-content-end mt-4">
                <span class="mx-1 d-flex align-items-center mr-3">
                    {{ likes }}
                    <font-awesome-icon
                        :class="{ 'red-heart': alreadyLiked }"
                        class="comment--body--like ml-2"
                        icon="heart"
                        @click="toggleLike()"
                    />
                </span>
                <!-- <span class="mx-1">2 childs</span>
                <span class="mx-1">Reply</span>-->
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import { POST_STATE } from "../utils/helpers.js";
import { mapGetters } from "vuex";

export default {
    name: "SingleComment",
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            user: {},
            alreadyLiked: false,
            userLike: null,
            likes: null
        };
    },
    computed: {
        ...mapGetters(["getUser"]),
        isAuthor() {
            return this.getUser.id === this.comment.userId;
        }
    },
    created() {
        this.getAuthorData();
        this.getLikes();
    },
    methods: {
        confimDeleteComment() {
            this.$swal({
                title: "Are you sure you want to delete this comment?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#1c6392",
                cancelButtonColor: "#dd1e1e",
                confirmButtonText: "Yes, delete it!"
            }).then(result => {
                if (result.value) {
                    this.deleteComment();
                    this.$swal(
                        "Deleted!",
                        "Your comment has been deleted.",
                        "success"
                    );
                }
            });
        },
        deleteComment() {
            axios
                .patch(`/comments/${this.comment.id}`, {
                    state: POST_STATE.deleted
                })
                .then(() => {
                    this.$emit("commentDeleted");
                    // axios
                    //   .patch(`comments/?postID=${this.post.id}`, {
                    //     state: "deleted"
                    //   })
                    //   .then(result => console.log(result));
                });
        },
        getDate(date) {
            return moment(date).format("MMMM DD, YYYY - LT");
        },
        getAuthorData() {
            axios
                .get(`/users/${this.comment.userId}`)
                .then(({ data: user }) => (this.user = user));
        },

        getLike() {
            axios
                .get(
                    `comments_likes/?commentId=${this.comment.id}&userID=${
                        this.getUser.id
                    }`
                )
                .then(({ data }) => {
                    if (data.length) {
                        this.userLike = data[0].id;
                    }
                });
        },
        getLikes() {
            axios
                .get(`/comments_likes/?commentId=${this.comment.id}`)
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
        toggleLike() {
            if (this.alreadyLiked) {
                axios.delete(`/comments_likes/${this.userLike}`).then(() => {
                    this.alreadyLiked = false;
                    this.getLikes();
                });
            } else {
                axios
                    .post(`/comments_likes`, {
                        commentId: this.comment.id,
                        userId: this.getUser.id
                    })
                    .then(() => {
                        this.getLikes();
                    });
            }
        }
    }
};
</script>

<style lang="scss">
.comment {
    &--user {
        color: #414141;
    }

    &--date {
        color: $light-blue-color;
    }

    &--body {
        border: solid 1px rgba(0, 0, 0, 0.158);
        border-radius: 5px;
        padding: 1.7rem 1.7rem 1.2rem;

        &--like {
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.2s;
        }
    }

    &--edit,
    &--delete {
        font-size: 1.3rem;
        cursor: pointer;
    }

    &--delete {
        color: $red-color;
    }
}
.red-heart {
    color: $red-color;
}
</style>
