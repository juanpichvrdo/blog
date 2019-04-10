<template>
    <div class="comment-reply">
        <comment-form @closeForm="$emit('closeReply')">Add Reply</comment-form>
    </div>
</template>

<script>
import { commentMixins } from "../utils/mixins.js";
import CommentForm from "./CommentForm";

export default {
    name: "CommentReply",
    components: {
        CommentForm
    },
    mixins: [commentMixins],
    data() {
        return {
            body: "",
            addingReply: false
        };
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
