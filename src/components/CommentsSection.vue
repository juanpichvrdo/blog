<template>
  <div class="comments p-5">
    <h4 class="mb-3">Add Comment</h4>
    <vue-editor name="content" v-model="newCommentBody"></vue-editor>
    <div class="d-flex mt-4">
      <button @click="submitComment" class="btn btn-lg btn-success mr-3">Add Comment</button>
      <button @click="newCommentBody = ''" class="btn btn-lg btn-danger">Cancel</button>
    </div>
    <div v-for="comment in comments" :key="comment.id" class="comments--individual-comment my-5">
      <div v-html="comment.body"></div>
      <p>{{ comment.likes }}</p>
      <hr>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "CommentsSection",
  components: {
    VueEditor
  },
  data() {
    return {
      comments: [],
      newCommentBody: ""
    };
  },
  created() {
    this.getComments();
  },
  props: {
    postID: String
  },
  methods: {
    getComments() {
      axios
        .get(`/comments?postID=${this.postID}`)
        .then(({ data: comments }) => {
          this.comments = comments;
        });
    },
    submitComment() {
      axios
        .post("/comments", {
          body: this.newCommentBody,
          postID: this.postID,
          likes: 0,
          datePublished: Date.now()
        })
        .then(comment => this.comments.push(comment.data));
    }
  }
};
</script>

<style lang="scss">
.comments {
  background-color: $white-color;
}
</style>
