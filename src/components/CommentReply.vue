<template>
    <div class="card comment-form edit-comment ml-5 mt-3">
        <div class="comment-form--header edit-comment--header card-header">Edit comment</div>
        <div class="comment-form--container card-body p-0">
            <vue-editor
                :editor-toolbar="customToolbar"
                v-model="body"
                class="comment-form--editor"
                name="body"
            />
            <div class="edit-comment--buttons d-flex justify-content-end align-items-center">
                <a class="mr-4 mr-sm-5 comment-form--cancel">Cancel</a>
                <button class="comment-form--add-comment btn btn-success mr-3">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { commentMixins } from "../utils/mixins.js";
import SingleComment from "./SingleComment";

export default {
    name: "CommentReply",
    components: {
        SingleComment,
        VueEditor
    },
    mixins: [commentMixins],
    data() {
        return {
            body: ""
        };
    }
};
</script>

<style lang="scss">
</style>
