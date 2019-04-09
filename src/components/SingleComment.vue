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
                <div class="comment-form--header edit-comment--header card-header">Edit comment</div>
                <div class="comment-form--container card-body p-0">
                    <vue-editor
                        :editor-toolbar="customToolbar"
                        v-model="comment.body"
                        class="comment-form--editor"
                        name="body"
                    />
                    <div
                        class="edit-comment--buttons d-flex justify-content-end align-items-center"
                    >
                        <a
                            class="mr-4 mr-sm-5 comment-form--cancel"
                            @click="showEditForm = false"
                        >Cancel</a>
                        <button
                            class="comment-form--add-comment btn btn-success mr-3"
                            @click="updateComment"
                        >Submit</button>
                    </div>
                </div>
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
                            @click="toggleLike()"
                        />
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import toastr from "toastr";
import { mapGetters } from "vuex";
import { VueEditor } from "vue2-editor";
import { POST_STATE } from "../utils/helpers.js";
import { commentMixins } from "../utils/mixins.js";

export default {
    name: "SingleComment",
    components: {
        VueEditor
    },
    mixins: [commentMixins],
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
            likes: null,
            showEditForm: false
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
        updateComment() {
            axios
                .patch(`/comments/${this.comment.id}`, {
                    body: this.comment.body
                })
                .then(({ data: comment }) => {
                    if (Object.keys(comment).length) {
                        toastr.success("Comment updated");
                        this.showEditForm = false;
                    } else {
                        toastr.error(
                            "Error updating comment",
                            "Please try again"
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

    .edit-comment {
        &--header {
            padding: 0.4rem 0.8rem;
        }

        &--buttons {
            margin-bottom: 10px;
        }
    }
}
.red-heart {
    color: $red-color;
}
.comments .comment-form {
    width: inherit !important;
}
</style>
