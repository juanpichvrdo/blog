<template>
    <div class="comment-form">
        <div class="comment-form--header card-header">
            <slot/>
        </div>
        <div class="comment-form--container card-body p-0">
            <vue-editor
                :editor-toolbar="customToolbar"
                v-model="newBody"
                class="comment-form--editor"
                name="body"
            />
            <div class="comment-form--buttons d-flex justify-content-end align-items-center">
                <a
                    v-if="showCancel"
                    class="mr-4 mr-sm-5 comment-form--cancel"
                    @click="$emit('closeForm')"
                >Cancel</a>
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
        },
        showCancel: {
            type: Boolean,
            required: false,
            default: true
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

.comment {
    &--buttons {
        margin-bottom: 10px;
    }
}

.comment-form {
    width: 100%;
    margin: 0 auto;
    border: solid 1px rgba(0, 0, 0, 0.158);
    border-radius: 5px;

    @media only screen and (max-width: 950px) {
        // width: 100%;
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
</style>
