<template>
    <div class="comments">
        <comment-form :show-cancel="false" @submitComment="submitComment">Leave a comment</comment-form>

        <h4 v-if="allComments.length" class="comments--heading mt-5">User comments</h4>
        <hr class="mb-4">
        <div v-for="comment in allComments" :key="comment.id">
            <single-comment :comment="comment"/>
            <comment-reply-list :replies="comment.replies"/>
        </div>

        <pagination-component
            :per-page="MAX_LIST_SIZE"
            :number-of-pages="getNumberOfPages"
            @pageChanged="onPageChange"
        />
    </div>
</template>

<script>
import toastr from "toastr";
import { VueEditor } from "vue2-editor";
import { mapGetters } from "vuex";

import { POST_STATE, currentDate, MAX_LIST_SIZE } from "../utils/helpers.js";

import { commentMixins } from "../utils/mixins.js";
import SingleComment from "./SingleComment";
import CommentReplyList from "./CommentReplyList";
import CommentForm from "./CommentForm";
import PaginationComponent from "./PaginationComponent";

export default {
    name: "CommentsSection",
    components: {
        VueEditor,
        SingleComment,
        CommentReplyList,
        CommentForm,
        PaginationComponent
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
            MAX_LIST_SIZE,
            activePage: 1,
            numberOfPages: 0
        };
    },
    computed: {
        ...mapGetters(["getUser", "allComments", "getNumberOfPages"])
    },
    created() {
        this.getComments();
    },
    methods: {
        getComments() {
            this.$store.dispatch("getComments", {
                postId: this.postId,
                activePage: this.activePage,
                listSize: MAX_LIST_SIZE
            });
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
        },
        onPageChange(page) {
            this.activePage = page;
            this.getComments();
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
