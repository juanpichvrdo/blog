<template>
  <div class="post-page container mt-5">
    <router-link to="/" class>Go home</router-link>
    <h1 class="display-4 post-page--title">{{ post.title }}</h1>
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
    <div class="mt-5" v-if="isAuthenticated">
      <div v-if="post.allowComments">
        <hr>
        <comments-section class="mt-5" :postID="post.id"></comments-section>
      </div>
    </div>
    <div v-else class>
      <router-link to="/login">Login to comment</router-link>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

import { VueEditor } from "vue2-editor";
import CommentsSection from "../components/CommentsSection";

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
      return moment(this.post.publishingDate).format("MMMM DD, YYYY - LT");
    },
    ...mapGetters(["isAuthenticated"])
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
