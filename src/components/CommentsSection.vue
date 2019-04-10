<template>
    <div class="comments">
        <div class="card comment-form">
            <div class="comment-form--header card-header">Leave a comment</div>
            <div class="comment-form--container card-body p-0">
                <vue-editor
                    v-model="newCommentBody"
                    :editor-toolbar="customToolbar"
                    class="comment-form--editor"
                    name="content"
                />
                <div class="comment-form--buttons d-flex justify-content-end align-items-center">
                    <button
                        class="comment-form--add-comment btn btn-success mr-3"
                        @click="submitComment"
                    >Submit</button>
                </div>
            </div>
        </div>

        <h4 v-if="allComments.length" class="comments--heading mt-5">User comments</h4>
        <hr class="mb-4">
        <div v-for="comment in allComments" :key="comment.id">
            <single-comment
                :comment="comment"
                @commentDeleted="commentDeleted"
                @commentUpdated="getComments"
            />
            <comment-reply-list :replies="comment.replies"/>
        </div>
    </div>
</template>

<script>
import toastr from "toastr";
import { VueEditor } from "vue2-editor";
import { mapGetters } from "vuex";
import { POST_STATE, currentDate } from "../utils/helpers.js";

import { commentMixins } from "../utils/mixins.js";
import SingleComment from "./SingleComment";
import CommentReplyList from "./CommentReplyList";

export default {
    name: "CommentsSection",
    components: {
        VueEditor,
        SingleComment,
        CommentReplyList
    },
    mixins: [commentMixins],
    props: {
        postId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            comments: [],
            newCommentBody: ""
        };
    },
    computed: {
        ...mapGetters(["getUser", "allComments"])
    },
    created() {
        this.$store.dispatch("getComments", this.postId);
    },

    methods: {
        getComments() {
            this.$store.dispatch("getComments", this.postId);
        },
        submitComment() {
            if (this.newCommentBody.length > 0) {
                const commentData = {
                    body: this.newCommentBody,
                    postId: this.postId,
                    datePublish: currentDate(),
                    userId: this.getUser.id,
                    state: POST_STATE.published
                };

                axios
                    .post("/comments", commentData)
                    .then(({ data: comment }) => {
                        this.commentCreationResponse(comment);
                    });
            } else {
                toastr.warning("Comment needs content");
            }
        },
        commentCreationResponse(comment) {
            if (Object.keys(comment).length) {
                this.getComments();
                toastr.success("Comment submitted");
                this.newCommentBody = "";
            } else {
                toastr.error("Please try again", "Error creating comment");
            }
        },
        commentDeleted() {
            this.$store.dispatch("getComments", this.postId);
        }
    }
};
</script>

<style lang="scss">
.quillWrapper {
    #quill-container {
        padding: 5px 20px 1.3rem;

        .ql-editor {
            border: solid 1px rgba(0, 0, 0, 0.158);
        }
    }
    .ql-toolbar.ql-snow,
    .ql-container.ql-snow {
        border: none;
    }
    .ql-toolbar.ql-snow {
        padding: 8px 15px;
    }

    .ql-editor {
        min-height: 140px;
    }

    .ql-snow .ql-color-picker .ql-picker-label,
    .ql-snow .ql-icon-picker .ql-picker-label {
        padding: 0;
        padding-left: 3px;
    }
}
.comments {
    background-color: $white-color;
    margin-bottom: 100px;

    .comment-form {
        width: 100%;
        margin: 0 auto;

        @media only screen and (max-width: 950px) {
            // width: 100%;
        }

        &--header {
            background-color: $light-blue-color;
            color: $white-color;
            font-size: 1.1rem;
        }

        &--add-comment {
            background-color: $navy-color;
            padding: 10px 80px;
        }

        &--cancel {
            color: #707070;
            cursor: pointer;
        }

        &--buttons {
            margin-bottom: 35px;
        }
    }

    &--heading {
        font-family: Georgia, "Times New Roman", Times, serif;
        color: $navy-color;
        font-weight: 600;
    }
}
</style>
