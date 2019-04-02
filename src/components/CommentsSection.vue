<template>
    <div class="comments">
        <div class="card comment-form">
            <div class="comment-form--header card-header">Leave a comment</div>
            <div class="comment-form--container card-body p-0">
                <VueEditor
                    v-model="newCommentBody"
                    :editorToolbar="customToolbar"
                    class="comment-form--editor"
                    name="content"
                />
                <div class="comment-form--buttons d-flex justify-content-end align-items-center">
                    <a class="mr-4 mr-sm-5 comment-form--cancel" @click="newCommentBody = ''">Cancel</a>
                    <button
                        class="comment-form--add-comment btn btn-success mr-3"
                        @click="submitComment"
                    >Submit</button>
                </div>
            </div>
        </div>

        <h4 v-if="comments.length" class="comments--heading mt-5">User comments</h4>
        <hr class="mb-4">
        <IndividualComment
            v-for="comment in comments"
            :key="comment.id"
            :authorID="comment.authorID"
            :date-published="comment.datePublished"
            :body="comment.body"
            :commentID="comment.id"
        />
    </div>
</template>

<script>
import moment from "moment";
import { VueEditor } from "vue2-editor";
import { mapGetters } from "vuex";

import IndividualComment from "./IndividualComment";

export default {
    name: "CommentsSection",
    components: {
        VueEditor,
        IndividualComment
    },
    props: {
        postID: Number
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
        ...mapGetters(["getUser"])
    },
    created() {
        this.getComments();
    },

    methods: {
        getComments() {
            axios
                .get(`/comments?postID=${this.postID}`)
                .then(({ data: comments }) => {
                    this.comments = comments;
                });
        },
        submitComment() {
            if (this.newCommentBody.length > 0) {
                axios
                    .post("/comments", {
                        body: this.newCommentBody,
                        postID: this.postID,
                        likes: 0,
                        datePublished: moment().format("YYYY-MM-DD HH:mm:ss"),
                        authorID: this.getUser.id,
                        state: "published"
                    })
                    .then(comment => {
                        this.comments.push(comment.data);
                        this.newCommentBody = "";
                        this.$emit("commentAdded");
                    });
            } else {
                console.log("Comment is too short");
            }
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

    .comment-form {
        width: 800px;
        margin: 0 auto;

        @media only screen and (max-width: 950px) {
            width: 100%;
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
