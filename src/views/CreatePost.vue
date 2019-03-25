<template>
  <div class="create-post form p-5 container mt-5">
    <h1 class="form--heading display-4 mb-5 text-center">Create Post</h1>
    <form @submit.prevent="validateForm" novalidate>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          v-validate="'required'"
          type="text"
          class="form-control"
          id="title"
          placeholder="Post Title"
          name="title"
          v-model="title"
        >
        <div class="invalid-feedback">{{ errors.first('title') }}</div>
      </div>
      <vue-editor
        name="content"
        v-model="content"
      ></vue-editor>
      <div class="invalid-feedback">{{ errors.first('content') }}</div>
      <div class="row d-flex justify-content-between align-items-center mt-5">
        <div class="form-check">
          <input
            class="form--checkbox form-check-input"
            type="checkbox"
            id="allowCommentsCheckbox"
            value="allowComments"
            v-model="allowComments"
          >
          <label class="form-check-label" for="allowCommentsCheckbox">Allow comments</label>
        </div>
        <div class="create-post--buttons">
          <button @click="validateForm" class="mx-3 px-5 btn btn-large btn-success">Create</button>
          <button class="mx-3 px-5 btn btn-large btn-warning">Draft</button>
          <button class="mx-3 px-5 btn btn-large btn-danger">Cancel</button>
        </div>
      </div>
    </form>
    <div class="mt-5" v-html="content"></div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapGetters } from 'vuex';

export default {
  name: "createPost",
  components: {
    VueEditor
  },
  data() {
    return {
      title: "",
      content: "",
      allowComments: true
    };
  },
  computed: {
    ...mapGetters(['getUsername'])
  },
  methods: {
    validateForm() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.processPost();
        }
      });
    },
    processPost() {
      axios.post('/posts', {
        title: this.title,
        content: this.content,
        allowComments: this.allowComments,
        author: this.getUsername,
        publishingDate: Date.now()
      }).then(result => {
        console.log(result)
        // const user = result.config.data
        //   console.log(user);
        //   if (user) {
        //     this.$store.dispatch('authenticateUser', user);
        //     Cookies.set("id", user.id);
        //     router.push('/');
        //   } else {
        //     this.errorMessage = 'Error creating user';
        //   }
      })
    }
  }
};
</script>

<style lang="scss">
.create-post {
  background-color: $white-color;
}
</style>
