<template>
  <div class="post-page container mt-5">
    <h1 class="post-page--title">{{ post.title }}</h1>
    <div class="d-flex align-items-center">
      <a href="#">
        <img src="../assets/user-2.png" alt="User profile picture">
      </a>
      <div class="ml-3">
        <p class="post-page--author mb-1 smaller-font">
          Written by:
          <a class="post-page--author--link" href="#">{{ post.author }}</a>
        </p>
        <p class="post-page--published mb-0 smaller-font">{{ convertedPublishingDate }}</p>
      </div>
    </div>
    <div v-html="post.content" class="post-page--content mt-5"></div>
    <div class="mt-5" v-if="post.allowComments">
      <hr>
      <comments-section class="mt-5" :postID="post.id"></comments-section>
    </div>
  </div>
</template>

<script>
import CommentsSection from "../components/CommentsSection";
import { VueEditor } from "vue2-editor";

export default {
  name: "PostPage",
  components: {
    CommentsSection
  },
  data() {
    return {
      postID: this.$route.params.id,
      post: {}
    };
  },
  created() {
    this.getPost();
  },
  computed: {
    convertedPublishingDate() {
      return new Date(this.post.publishingDate).toDateString();
    }
  },
  methods: {
    getPost() {
      // console.log(this.post)
      axios.get(`/posts?id=${this.postID}`).then(({ data: post }) => {
        console.log(post);
        if (post.length) {
          this.post = post[0];
          // this.$store.dispatch("setPosts", posts);
        } else {
          // There is no post
          console.log("no data /:");
        }
      });
    }
  }
};
</script>

<style lang="scss">
</style>
