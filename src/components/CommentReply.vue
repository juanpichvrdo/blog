<template>
    <div class="comment-reply">
        <comment-form @closeForm="$emit('closeReply')" @submitComment="submitComment">Add Reply</comment-form>
    </div>
</template>

<script>
import toastr from "toastr";
import { mapGetters } from "vuex";
import { commentMixins } from "../utils/mixins.js";
import { POST_STATE, currentDate, MAX_LIST_SIZE } from "../utils/helpers.js";
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
    data() {
        return {
            postId: Number(this.$route.params.id)
        };
    },
    computed: {
        ...mapGetters(["getUser"])
    },
    methods: {
        submitComment(body) {
            if (body.length > 0) {
                const commentData = {
                    body,
                    postId: this.postId,
                    datePublish: currentDate(),
                    userId: this.getUser.id,
                    state: POST_STATE.published,
                    commentId: this.commentId
                };

                axios
                    .post("/replies", commentData)
                    .then(({ data: comment }) => {
                        this.afterSubmitResponse(comment);
                    });
            } else {
                toastr.warning("Comment needs content");
            }
        },
        afterSubmitResponse(comment) {
            if (Object.keys(comment).length) {
                this.$store.dispatch("getComments", {
                    postId: this.postId,
                    activePage: undefined,
                    listSize: MAX_LIST_SIZE
                });
                toastr.success("Reply send");
                this.$emit("closeReply");
            } else {
                toastr.error("Error sending reply", "Please try again");
            }
        }
    }
};
</script>

<style lang="scss">
.comment-reply {
    margin-left: 65px;
    margin-bottom: 40px;
}
</style>
