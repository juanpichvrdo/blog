<template>
    <div class>
        <div class="comment mb-5 text-left">
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
                <div v-if="isAuthor && showEditForm === false" class="d-flex align-items-center">
                    <font-awesome-icon
                        class="comment--edit mx-2"
                        icon="edit"
                        @click="showEditForm = true"
                    />

                    <font-awesome-icon
                        class="comment--delete mx-2"
                        icon="times"
                        @click="confimDeleteComment"
                    />
                </div>
            </div>
            <div v-if="showEditForm" class="card comment-form edit-comment ml-5 mt-3">
                <comment-form
                    :body="comment.body"
                    @submitComment="update"
                    @closeForm="showEditForm = false"
                >Edit Comment</comment-form>
            </div>

            <div v-else class="comment--body ml-5 mt-3">
                <div class="comment--body--content">
                    <div class v-html="comment.body"/>
                </div>

                <div class="comment--body--info d-flex justify-content-end mt-4">
                    <span class="mx-1 d-flex align-items-center mr-3">
                        <span v-if="likes">{{ likes }}</span>
                        <font-awesome-icon
                            :class="{ 'red-heart': alreadyLiked }"
                            class="comment--body--like ml-2"
                            icon="heart"
                            @click="toggleLike"
                        />
                    </span>
                    <font-awesome-icon
                        v-if="!comment.commentId"
                        class="comment--body--reply ml-2"
                        icon="reply"
                        @click="addingReply = !addingReply"
                    />
                </div>
            </div>
        </div>
        <comment-reply
            v-if="addingReply"
            :comment-id="comment.id"
            @closeReply="addingReply = false"
        />
    </div>
</template>

<script>
import toastr from "toastr";
import { mapGetters } from "vuex";
import { VueEditor } from "vue2-editor";
import { POST_STATE, MAX_LIST_SIZE } from "../utils/helpers.js";
import { commentMixins } from "../utils/mixins.js";
import CommentReply from "./CommentReply";
import CommentForm from "./CommentForm";

export default {
    name: "SingleComment",
    components: {
        CommentReply,
        VueEditor,
        CommentForm
    },
    mixins: [commentMixins],
    props: {
        comment: {
            type: Object,
            required: true
        },
        activePage: {
            type: Number,
            required: false,
            default: 1
        }
    },
    data() {
        return {
            user: {},
            alreadyLiked: false,
            userLike: null,
            likes: null,
            showEditForm: false,
            addingReply: false,
            postId: Number(this.$route.params.id)
        };
    },
    computed: {
        ...mapGetters({ getUser: "User/getUser" }),
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
                    this.delete();
                    this.$swal(
                        "Deleted!",
                        "Your comment has been deleted.",
                        "success"
                    );
                }
            });
        },
        update(updatedBody) {
            if (!this.comment.commentId) {
                this.updateComment(updatedBody);
            } else {
                this.updateReply(updatedBody);
            }
        },
        updateComment(updatedBody) {
            if (updatedBody) {
                axios
                    .patch(`/comments/${this.comment.id}`, {
                        body: updatedBody
                    })
                    .then(({ data: comment }) => {
                        this.updateCommentResponse(comment);
                    });
            } else {
                toastr.warning("Comment needs content");
            }
        },
        updateReply(updatedBody) {
            if (updatedBody) {
                axios
                    .patch(`/replies/${this.comment.id}`, {
                        body: updatedBody
                    })
                    .then(({ data: comment }) => {
                        this.updateCommentResponse(comment);
                    });
            } else {
                toastr.warning("Comment needs content");
            }
        },
        updateCommentResponse(comment) {
            if (Object.keys(comment).length) {
                this.$store.dispatch("Comments/getComments", {
                    postId: this.postId,
                    activePage: this.activePage,
                    listSize: MAX_LIST_SIZE
                });
                toastr.success("Comment updated");
                this.showEditForm = false;
            } else {
                toastr.error("Error updating comment", "Please try again");
            }
        },
        delete() {
            if (!this.comment.commentId) {
                this.deleteComment();
            } else {
                this.deleteReply();
            }
        },
        deleteComment() {
            axios
                .patch(`/comments/${this.comment.id}`, {
                    state: POST_STATE.deleted
                })
                .then(() => {
                    this.$store.dispatch("Comments/getComments", {
                        postId: this.postId,
                        activePage: this.activePage,
                        listSize: MAX_LIST_SIZE
                    });
                });
        },
        deleteReply() {
            axios
                .patch(`/replies/${this.comment.id}`, {
                    state: POST_STATE.deleted
                })
                .then(() => {
                    this.$store.dispatch("Comments/getComments", {
                        postId: this.postId,
                        activePage: this.activePage,
                        listSize: MAX_LIST_SIZE
                    });
                });
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

        &--like,
        &--reply {
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.2s;
        }

        &--reply {
            color: $light-blue-color;
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
