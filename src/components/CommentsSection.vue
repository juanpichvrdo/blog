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

        <h4 v-if="comments.length" class="comments--heading mt-5">User comments</h4>
        <hr class="mb-4">
        <single-comment
            v-for="comment in orderedComments"
            :key="comment.id"
            :comment="comment"
            @commentDeleted="commentDeleted"
        />
    </div>
</template>

<script>
import toastr from "toastr";
import { VueEditor } from "vue2-editor";
import { mapGetters } from "vuex";
import { POST_STATE } from "../utils/helpers.js";

import SingleComment from "./SingleComment";
import { commentMixins } from "../utils/mixins.js";

export default {
    name: "CommentsSection",
    components: {
        VueEditor,
        SingleComment
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
            newCommentBody: "",
            customToolbar: [
                ["bold", "italic", "underline", { color: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                [
                    { align: "" },
                    { align: "center" },
                    { align: "right" },
                    { align: "justify" }
                ],
                [{ indent: "-1" }, { indent: "+1" }]
            ]
        };
    },
    computed: {
        ...mapGetters(["getUser"]),
        orderedComments() {
            return this.comments
                .filter(comment => comment.state === POST_STATE.published)
                .reverse();
        }
    },
    created() {
        this.getComments();
    },

    methods: {
        getComments() {
            axios
                .get(`/comments?postId=${this.postId}`)
                .then(({ data: comments }) => {
                    this.comments = comments;
                });
        },
        submitComment() {
            if (this.newCommentBody.length > 0) {
                axios
                    .post("/comments", {
                        body: this.newCommentBody,
                        postId: this.postId,
                        datePublish: moment().format("YYYY-MM-DD HH:mm:ss"),
                        userId: this.getUser.id,
                        state: POST_STATE.published
                    })
                    .then(({ data: comment }) => {
                        if (Object.keys(comment).length) {
                            this.comments.push(comment);
                            toastr["success"]("Comment submitted");
                            this.newCommentBody = "";
                            this.$emit("commentsChanged");
                        } else {
                            toastr["error"](
                                "Please try again",
                                "Error creating comment"
                            );
                        }
                    });
            } else {
                toastr["warning"]("Comment needs content");
            }
        },
        commentDeleted() {
            this.getComments();
            this.$emit("commentsChanged");
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
