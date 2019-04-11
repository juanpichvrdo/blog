<template>
    <div class="comments">
        <comment-form :show-cancel="false" @submitComment="submitComment">Leave a comment</comment-form>

        <h4 v-if="allComments.length" class="comments--heading mt-5">User comments</h4>
        <hr class="mb-4">
        <div v-for="comment in allComments" :key="comment.id">
            <single-comment :comment="comment"/>
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
import CommentForm from "./CommentForm";

export default {
    name: "CommentsSection",
    components: {
        VueEditor,
        SingleComment,
        CommentReplyList,
        CommentForm
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
            comments: []
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
        submitComment(body) {
            if (body.length > 0) {
                const commentData = {
                    body,
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
            } else {
                toastr.error("Please try again", "Error creating comment");
            }
        }
    }
};
</script>

<style lang="scss">
.comments {
    background-color: $white-color;
    margin-bottom: 100px;

    &--heading {
        font-family: Georgia, "Times New Roman", Times, serif;
        color: $navy-color;
        font-weight: 600;
    }
}
</style>
