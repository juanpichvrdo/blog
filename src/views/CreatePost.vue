<template>
    <div class="create-post form p-5 container mt-5">
        <ul class="nav nav-tabs mb-3">
            <li class="nav-item">
                <a
                    :class="{active: activeTab === 'create'}"
                    class="nav-link create-post--tabs"
                    href="#"
                    @click="activeTab = 'create'"
                >Create</a>
            </li>
            <li class="nav-item">
                <a
                    :class="{active: activeTab === 'preview'}"
                    class="nav-link create-post--tabs"
                    href="#"
                    @click="activeTab = 'preview'"
                >Preview</a>
            </li>
        </ul>
        <div v-if="activeTab === 'create'">
            <h1
                class="form--heading create-post--heading display-5 mt-5 mb-3 text-center"
            >Create Post</h1>
            <form novalidate @submit.prevent>
                <div class="form-group">
                    <label class="form--label create-post--label" for="title">Title</label>
                    <input
                        v-validate="'required'"
                        id="title"
                        v-model="title"
                        type="text"
                        class="form-control form-control-lg"
                        placeholder="Post Title"
                        name="title"
                    >
                    <div class="invalid-feedback">{{ errors.first('title') }}</div>
                </div>
                <vue-editor v-model="content" name="content"/>
                <div class="invalid-feedback">{{ errors.first('content') }}</div>
                <div class="row d-flex justify-content-between align-items-center mt-5">
                    <div class="form-check">
                        <input
                            id="allowCommentsCheckbox"
                            v-model="allowComments"
                            class="form--checkbox create-post--checkbox form-check-input"
                            type="checkbox"
                            value="allowComments"
                        >
                        <label
                            class="form-check-label create-post--label"
                            for="allowCommentsCheckbox"
                        >Allow comments</label>
                    </div>
                    <div class="create-post--buttons">
                        <button
                            class="mx-3 px-5 btn btn-large btn-success"
                            @click="validateForm(POST_STATE.published)"
                        >Create</button>
                        <button
                            class="mx-3 px-5 btn btn-large btn-warning"
                            @click="validateForm(POST_STATE.draft)"
                        >Draft</button>
                        <button
                            class="mx-3 px-5 btn btn-large btn-danger"
                            @click="$router.push('/')"
                        >Cancel</button>
                    </div>
                </div>
            </form>
        </div>
        <div v-else class="preview">
            <div v-if="title || content">
                <h2 class="mt-5">{{ title }}</h2>
                <hr v-if="title">
                <div class="mt-5" v-html="content"/>
            </div>
            <div v-else class="mt-5">
                <h5>Nothing to preview. Start writing content!</h5>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import { VueEditor } from "vue2-editor";
import { mapGetters } from "vuex";
import router from "../router.js";
import { POST_STATE } from "../utils/helpers.js";

export default {
    name: "CreatePost",
    components: {
        VueEditor
    },

    data() {
        return {
            activeTab: "create",
            title: "",
            content: "",
            allowComments: true,
            POST_STATE
        };
    },
    computed: {
        ...mapGetters(["getUser"])
    },
    methods: {
        validateForm(state) {
            this.$validator.validateAll().then(result => {
                if (result) {
                    this.processPost(state);
                    console.log(this.content);
                }
            });
        },
        processPost(state) {
            axios
                .post("/posts", {
                    title: this.title,
                    content: this.content,
                    allow_comments: this.allowComments,
                    user: this.getUser.username,
                    publish_date:
                        state === this.POST_STATE.published
                            ? moment().format("YYYY-MM-DD HH:mm:ss")
                            : null,
                    created_date: moment().format("YYYY-MM-DD HH:mm:ss"),
                    user_id: this.getUser.id,
                    likes: 0,
                    edited: false,
                    state: state
                })
                .then(result => {
                    console.log(result);
                    router.push("/");
                });
        }
    }
};
</script>

<style lang="scss">
.create-post {
    background-color: $white-color;

    &--tabs {
        color: $navy-color;
    }

    &--heading {
        border-bottom: none;
    }

    &--label {
        font-size: 1.2rem;
    }

    &--checkbox {
        margin-top: 6px;
    }
}
</style>
