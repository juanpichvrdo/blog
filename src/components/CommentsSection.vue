<template>
  <div class="comments p-5">
    <h4 class="mb-3">Add Comment</h4>
    <vue-editor name="content" v-model="newCommentBody"></vue-editor>
    <div class="d-flex mt-4">
      <button @click="submitComment" class="btn btn-lg btn-success mr-3">Add Comment</button>
      <button @click="newCommentBody = ''" class="btn btn-lg btn-danger">Cancel</button>
    </div>
    <div v-for="comment in comments" :key="comment.id" class="comments--individual-comment my-5">
      <div class="d-flex align-items-center">
        <a href="#">
          <img src="../assets/user-2.png" alt="User profile picture">
        </a>
        <div class="ml-3">
          <p class="post-page--author mb-1 smaller-font">
            <a class="post-page--author--link" href="#">{{ comment.author.username }}</a>
            says
          </p>
          <p class="post-page--published mb-0 smaller-font">{{ getDate(comment.datePublished) }}</p>
        </div>
      </div>
      <div class="mt-3" v-html="comment.body"></div>
      <p>{{ comment.likes }} likes</p>
      <hr>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { VueEditor } from "vue2-editor";
import { mapGetters } from "vuex";

export default {
  name: "CommentsSection",
  components: {
    VueEditor
  },
  data() {
    return {
      comments: [],
      newCommentBody: "",
      commentCount: 0
    };
  },
  watch: {
    comments(newData, oldData) {
      this.commentCount = newData.length;
      axios.patch(`/posts/${this.postID}`, {
        commentCount: this.commentCount
      });
    }
  },
  created() {
    this.getComments();
  },
  computed: {
    ...mapGetters(["getUser"]),
    convertedPublishingDate() {
      return moment(this.publishingDate).format("MMMM DD, YYYY - LT");
    }
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
      if (this.newCommentBody.length > 0) {
        axios
          .post("/comments", {
            body: this.newCommentBody,
            postID: this.postID,
            likes: 0,
            datePublished: Date.now(),
            author: this.getUser
          })
          .then(comment => this.comments.push(comment.data));
      }
    },
    getDate(date) {
      return moment(date).format("MMMM DD, YYYY - LT");
    }
  }
};
</script>

<style lang="scss">
.comments {
  background-color: $white-color;
}
</style>
