<template>
    <div v-if="orderedReplies.length" class="reply-list">
        <single-comment
            v-for="comment in orderedReplies"
            :key="comment.id"
            :comment="comment"
            @commentDeleted="$emit('commentDeleted')"
        />
    </div>
</template>

<script>
import SingleComment from "./SingleComment";
// import { POST_STATE } from "../utils/helpers.js";

export default {
    name: "CommentReplyList",
    components: {
        SingleComment
    },
    props: {
        replies: {
            type: Array,
            required: true
        }
    },
    computed: {
        orderedReplies() {
            return this.replies.reverse();
        }
    }
    // created() {
    //     this.getCommentReplies();
    // },
    // methods: {
    //     getCommentReplies() {
    //         axios
    //             .get(
    //                 `comments/${this.commentId}?state=1&postId=${
    //                     this.postId
    //                 }&_sort=datePublish&_order=desc&_embed=replies`
    //             )
    //             .then(({ data }) => {
    //                 this.commentReplies = data.replies.reverse();
    //             });
    //     }
    // }
};
</script>

<style lang="scss">
.reply-list {
    margin-left: 55px;
    padding: 15px;
    margin-top: -20px;
    border-left: solid 1px rgba($color: #000000, $alpha: 0.2);
}
</style>
