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
                        v-model.trim="title"
                        type="text"
                        class="form-control form-control-lg"
                        placeholder="Post Title"
                        name="title"
                    >
                    <div class="invalid-feedback">{{ errors.first('title') }}</div>
                </div>
                <vue-editor v-model="content" name="content"/>
                <div class="invalid-feedback">{{ errors.first('content') }}</div>
                <div
                    class="row d-flex flex-column flex-lg-row justify-content-lg-between align-items-center mt-5"
                >
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
import toastr from "toastr";
import { VueEditor } from "vue2-editor";
import { mapGetters } from "vuex";
import router from "../router.js";
import { POST_STATE, currentDate } from "../utils/helpers.js";

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
                    if (this.content) {
                        this.processPost(state);
                    } else {
                        toastr["warning"]("Post needs content");
                    }
                }
            });
        },
        processPost(state) {
            const postData = {
                title: this.title,
                content: this.content,
                allowComments: this.allowComments,
                user: this.getUser.username,
                publishDate: null,
                createdDate: currentDate(),
                userId: this.getUser.id,
                edited: false,
                state: state
            };

            if (state === this.POST_STATE.published) {
                postData.publishDate = currentDate();
            }

            axios.post("/posts", postData).then(({ data: post }) => {
                this.postCreationResponse(post, state);
            });
        },
        postCreationResponse(post, state) {
            if (Object.keys(post).length) {
                if (state === this.POST_STATE.published) {
                    toastr.success("Post published successfully");
                } else {
                    toastr.success("Post saved");
                }
                router.push("/");
            } else {
                toastr.error("Please try again", "Error creating post");
            }
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

    &--buttons {
        display: flex;
        flex-direction: row-reverse;

        @media only screen and (max-width: 991px) {
            margin-top: 20px;
        }

        @media only screen and (max-width: 768px) {
            display: flex;
            flex-direction: column;
            width: 80%;
        }

        & button {
            @media only screen and (max-width: 768px) {
                margin-bottom: 20px;
                padding: 10px 0;
            }
        }

        // & button {
        //     @media only screen and (max-width: 991px) {
        //         margin: 20px;
        //     }
        // }
    }
}
</style>
