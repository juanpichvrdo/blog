<template>
    <div v-if="orderedReplies.length" class="reply-list">
        <single-comment v-for="comment in orderedReplies" :key="comment.id" :comment="comment"/>
    </div>
</template>

<script>
import SingleComment from "./SingleComment";
import { POST_STATE } from "../utils/helpers.js";

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
            return this.replies
                .filter(reply => reply.state === POST_STATE.published)
                .reverse();
        }
    }
};
</script>

<style lang="scss">
.reply-list {
    margin-left: 55px;
    padding: 15px;
    margin-top: -40px;
}
</style>
