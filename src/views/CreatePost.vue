<template>
  <div class="create-post form p-5 container mt-5">
    <ul class="nav nav-tabs mb-3">
      <li class="nav-item">
        <a
          @click="activeTab = 'create'"
          class="nav-link create-post--tabs"
          :class="{active: activeTab === 'create'}"
          href="#"
        >Create</a>
      </li>
      <li class="nav-item">
        <a
          @click="activeTab = 'preview'"
          class="nav-link create-post--tabs"
          :class="{active: activeTab === 'preview'}"
          href="#"
        >Preview</a>
      </li>
    </ul>
    <div v-if="activeTab === 'create'">
      <h1 class="form--heading create-post--heading display-5 mt-5 mb-3 text-center">Create Post</h1>
      <form @submit.prevent novalidate>
        <div class="form-group">
          <label class="form--label create-post--label" for="title">Title</label>
          <input
            v-validate="'required'"
            type="text"
            class="form-control form-control-lg"
            id="title"
            placeholder="Post Title"
            name="title"
            v-model="title"
          >
          <div class="invalid-feedback">{{ errors.first('title') }}</div>
        </div>
        <vue-editor name="content" v-model="content"></vue-editor>
        <div class="invalid-feedback">{{ errors.first('content') }}</div>
        <div class="row d-flex justify-content-between align-items-center mt-5">
          <div class="form-check">
            <input
              class="form--checkbox create-post--checkbox form-check-input"
              type="checkbox"
              id="allowCommentsCheckbox"
              value="allowComments"
              v-model="allowComments"
            >
            <label
              class="form-check-label create-post--label"
              for="allowCommentsCheckbox"
            >Allow comments</label>
          </div>
          <div class="create-post--buttons">
            <button @click="validateForm" class="mx-3 px-5 btn btn-large btn-success">Create</button>
            <button class="mx-3 px-5 btn btn-large btn-warning">Draft</button>
            <button @click="$router.push('/')" class="mx-3 px-5 btn btn-large btn-danger">Cancel</button>
          </div>
        </div>
      </form>
    </div>
    <div v-else class="preview">
      <div v-if="title || content">
        <h2 class="mt-5">{{ title }}</h2>
        <hr v-if="title">
        <div class="mt-5" v-html="content"></div>
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

export default {
  name: "createPost",
  components: {
    VueEditor
  },
  data() {
    return {
      activeTab: "create",
      title: "",
      content: "",
      allowComments: true
    };
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  methods: {
    validateForm() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.processPost();
          console.log(this.content);
        }
      });
    },
    processPost() {
      axios
        .post("/posts", {
          title: this.title,
          content: this.content,
          allowComments: this.allowComments,
          author: this.getUser.username,
          publishingDate: moment(),
          userId: this.getUser.id,
          likes: 0,
          commentCount: 0
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
