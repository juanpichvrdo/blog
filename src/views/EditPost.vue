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
                        v-model="post.title"
                        type="text"
                        class="form-control form-control-lg"
                        placeholder="Post Title"
                        name="title"
                    >
                    <div class="invalid-feedback">{{ errors.first('title') }}</div>
                </div>
                <VueEditor v-model="post.content" name="content"/>
                <div class="invalid-feedback">{{ errors.first('content') }}</div>
                <div class="row d-flex justify-content-between align-items-center mt-5">
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
                    <div class="create-post--buttons">
                        <button
                            v-if="post.state === 'draft'"
                            class="mx-3 px-5 btn btn-large btn-success"
                            @click="validateForm('published')"
                        >Publish</button>
                        <button
                            class="mx-3 px-5 btn btn-large btn-success"
                            @click="validateForm(post.state)"
                        >Update</button>
                        <button
                            class="mx-3 px-5 btn btn-large btn-warning"
                            @click="validateForm('draft')"
                        >Draft</button>
                        <button
                            class="mx-3 px-5 btn btn-large btn-danger"
                            @click="$router.push('/')"
                        >Cancel</button>
                        <button
                            class="mx-3 px-5 btn btn-large btn-danger"
                            @click="deletePost"
                        >Delete</button>
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
import { VueEditor } from "vue2-editor";
import { mapGetters } from "vuex";

export default {
    name: "EditPost",
    components: {
        VueEditor
    },
    data() {
        return {
            postID: this.$route.params.id,
            post: {},
            activeTab: "edit",
            authorID: null
        };
    },
    computed: {
        ...mapGetters(["getUser"])
    },
    created() {
        this.getPost();
    },
    methods: {
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
        validateForm(state) {
            this.$validator.validateAll().then(result => {
                if (result) {
                    this.updatePost(state);
                }
            });
        },
        updatePost(state) {
            axios
                .patch(`/posts/${this.postID}`, {
                    title: this.post.title,
                    content: this.post.content,
                    allowComments: this.post.allowComments,
                    edited: true,
                    state: state,
                    publishingDate:
                        this.post.state === "draft"
                            ? moment().format("YYYY-MM-DD HH:MM:SS")
                            : this.post.publishingDate
                })
                .then(() =>
                    state === "draft"
                        ? this.$router.push("/")
                        : this.$router.push(`/posts/${this.postID}`)
                );
        },
        deletePost() {
            axios
                .patch(`/posts/${this.postID}`, {
                    state: "deleted"
                })
                .then(() => {
                    this.$router.push("/");
                    // axios
                    //   .patch(`comments/?postID=${this.id}`, {
                    //     state: "deleted"
                    //   })
                    //   .then(result => console.log(result));
                });
        }
    }
};
</script>

<style lang="scss">
</style>
