<template>
    <div class="create-post form p-5 container mt-5">
        <ul class="nav nav-tabs mb-3">
            <li class="nav-item">
                <a
                    :class="{active: activeTab === 'edit'}"
                    class="nav-link create-post--tabs"
                    href="#"
                    @click="activeTab = 'edit'"
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
        <div v-if="activeTab === 'edit'">
            <h1 class="form--heading create-post--heading display-5 mt-5 mb-3 text-center">Edit Post</h1>
            <form novalidate @submit.prevent>
                <div class="form-group">
                    <label class="form--label create-post--label" for="title">Title</label>
                    <input
                        v-validate="'required'"
                        id="title"
                        v-model.trim="post.title"
                        type="text"
                        class="form-control form-control-lg"
                        placeholder="Post Title"
                        name="title"
                    >
                    <div class="invalid-feedback">{{ errors.first('title') }}</div>
                </div>
                <vue-editor v-model="post.content" name="content"/>
                <div class="invalid-feedback">{{ errors.first('content') }}</div>

                <div
                    class="row d-flex flex-column flex-lg-row justify-content-lg-between align-items-center mt-5"
                >
                    <div class="form-check">
                        <input
                            id="allowCommentsCheckbox"
                            v-model="post.allowComments"
                            class="form--checkbox create-post--checkbox form-check-input"
                            type="checkbox"
                            value="allowComments"
                        >
                        <label
                            class="form-check-label create-post--label"
                            for="allowCommentsCheckbox"
                        >Allow comments</label>
                    </div>
                    <div
                        v-if="post.state === POST_STATE.draft || post.state === POST_STATE.published"
                        class="create-post--buttons"
                    >
                        <button
                            v-if="post.state === POST_STATE.draft"
                            class="mx-3 px-5 btn btn-large btn-success"
                            @click="validateForm(POST_STATE.published)"
                        >Publish</button>
                        <button
                            class="mx-3 px-5 btn btn-large btn-info"
                            @click="validateForm(post.state)"
                        >Update</button>
                        <button
                            class="mx-3 px-5 btn btn-large btn-warning"
                            @click="$router.push('/')"
                        >Cancel</button>
                        <button
                            class="mx-3 px-5 btn btn-large btn-danger"
                            @click="confirmDeletePost"
                        >Delete</button>
                    </div>
                    <div v-else class="create-post--buttons">
                        <button
                            class="mx-3 px-5 btn btn-large btn-warning"
                            @click="$router.push('/')"
                        >Cancel</button>
                        <button
                            class="mx-3 px-5 btn btn-large btn-info"
                            @click="validateForm(POST_STATE.draft)"
                        >Draft</button>
                        <button
                            class="mx-3 px-5 btn btn-large btn-success"
                            @click="validateForm(POST_STATE.published)"
                        >Publish</button>
                    </div>
                </div>
            </form>
        </div>
        <div v-else class="preview">
            <div v-if="post.title || post.content">
                <h2 class="mt-5">{{ post.title }}</h2>
                <hr v-if="post.title">
                <div class="mt-5" v-html="post.content"/>
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
import { postMixins } from "../utils/mixins";
import { POST_STATE, currentDate } from "../utils/helpers.js";

export default {
    name: "EditPost",
    components: {
        VueEditor
    },
    mixins: [postMixins],
    data() {
        return {
            postID: this.$route.params.id,
            post: {},
            activeTab: "edit",
            authorID: null,
            POST_STATE
        };
    },
    computed: {
        ...mapGetters({ getUser: "User/getUser" })
    },
    created() {
        this.getPost();
    },
    methods: {
        validateForm(state) {
            this.$validator.validateAll().then(result => {
                if (result) {
                    this.updatePost(state);
                }
            });
        },
        isAuthor() {
            return this.getUser.id === this.authorID;
        },
        getPost() {
            axios.get(`/posts?id=${this.postID}`).then(({ data: post }) => {
                if (post.length) {
                    this.authorID = post[0].userId;
                    if (this.isAuthor()) {
                        this.post = post[0];
                    } else {
                        this.$router.push(`/posts/${this.postID}`);
                    }
                }
            });
        },
        updatePost(state) {
            const postData = {
                title: this.post.title,
                content: this.post.content,
                allowComments: this.post.allowComments,
                edited: true,
                state,
                publishDate: this.post.publishDate
            };

            if (
                this.post.state === POST_STATE.draft ||
                this.post.state === POST_STATE.deleted
            ) {
                postData.publishDate = currentDate();
            } else {
                this.post.publishDate;
            }

            axios
                .patch(`/posts/${this.postID}`, postData)
                .then(({ data: post }) => {
                    this.postEditResponse(post, state);
                });
        },
        postEditResponse(post, state) {
            if (Object.keys(post).length) {
                toastr.success("Post updated");
                if (state === POST_STATE.draft) {
                    this.$router.push("/");
                } else {
                    this.$router.push(`/posts/${this.postID}`);
                }
            } else {
                toastr.error("Please try again", "Error updating post");
            }
        },
        deletePost() {
            axios
                .patch(`/posts/${this.postID}`, {
                    state: POST_STATE.deleted
                })
                .then(() => {
                    this.$router.replace("/");
                });
        }
    }
};
</script>

<style lang="scss">
</style>
