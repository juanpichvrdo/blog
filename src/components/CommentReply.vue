<template>
    <div class="comment-reply">
        <comment-form @closeForm="$emit('closeReply')" @submitComment="submitComment">Add Reply</comment-form>
    </div>
</template>

<script>
import toastr from "toastr";
import { mapGetters } from "vuex";
import { commentMixins } from "../utils/mixins.js";
import { POST_STATE, currentDate } from "../utils/helpers.js";
import CommentForm from "./CommentForm";

export default {
    name: "CommentReply",
    components: {
        CommentForm
    },
    mixins: [commentMixins],
    props: {
        commentId: {
            type: Number,
            required: true,
            default: null
        }
    },
    computed: {
        ...mapGetters(["getUser"])
    },
    methods: {
        submitComment(body) {
            if (body.length > 0) {
                const commentData = {
                    body,
                    postId: Number(this.$route.params.id),
                    datePublish: currentDate(),
                    userId: this.getUser.id,
                    state: POST_STATE.published,
                    commentId: this.commentId
                };

                axios
                    .post("/replies", commentData)
                    .then(({ data: comment }) => {
                        if (Object.keys(comment).length) {
                            this.$store.dispatch(
                                "getComments",
                                Number(this.$route.params.id)
                            );
                            toastr.success("Reply send");
                        } else {
                            toastr.error(
                                "Error sending reply",
                                "Please try again"
                            );
                        }
                        // this.commentCreationResponse(comment);
                    });
            } else {
                toastr.warning("Comment needs content");
            }
        }
    }
};
</script>

<style lang="scss">
.edit-comment {
    &--header {
        padding: 0.4rem 0.8rem;
    }

    &--buttons {
        margin-bottom: 10px;
    }
}

.comments .comment-form {
    width: inherit !important;
}
</style>
