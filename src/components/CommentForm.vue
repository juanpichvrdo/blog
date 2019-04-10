<template>
    <div>
        <div class="comment-form--header edit-comment--header card-header">
            <slot/>
        </div>
        <div class="comment-form--container card-body p-0">
            <vue-editor
                :editor-toolbar="customToolbar"
                v-model="newBody"
                class="comment-form--editor"
                name="body"
            />
            <div class="edit-comment--buttons d-flex justify-content-end align-items-center">
                <a class="mr-4 mr-sm-5 comment-form--cancel" @click="$emit('closeForm')">Cancel</a>
                <button
                    class="comment-form--add-comment btn btn-success mr-3"
                    @click="$emit('submitComment', newBody)"
                >Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { commentMixins } from "../utils/mixins.js";
export default {
    name: "CommentForm",
    components: {
        VueEditor
    },
    mixins: [commentMixins],
    props: {
        body: {
            type: String,
            required: false,
            default: ""
        }
    },
    data() {
        return {
            newBody: ""
        };
    },
    created() {
        this.newBody = this.body;
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
</style>
