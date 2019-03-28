<template>
  <div class="post-page">
    <navigation-bar></navigation-bar>
    <div class="container">
      <!-- <router-link to="/" class>Go home</router-link> -->
      <nav class="post-page--breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item d-flex align-items-center">
            <router-link class="post-page--link" to="/">ALL POSTS</router-link>
          </li>
          <li class="breadcrumb-item active d-flex align-items-center">
            <router-link class="post-page--link" to="/">{{ post.title.toUpperCase() }}</router-link>
          </li>
        </ol>
      </nav>

      <h1 class="post-page--title display-4">{{ post.title }}</h1>
      <div class="d-flex align-items-center mb-5">
        <a href="#">
          <img src="../assets/user-2.png" alt="User profile picture">
        </a>
        <div class="ml-3">
          <p class="post-page--author mb-0 smaller-font">
            Written by:
            <a href="#" class="post-page--link">{{ post.author }}</a>
          </p>
          <p class="post-page--published mb-0 smaller-font">{{ convertedPublishingDate }}</p>
        </div>
      </div>
      <hr>
      <div v-html="post.content" class="post-page--content mt-5 px-2"></div>
      <div class="d-flex align-items-center mt-5">
        <p class="mb-0 mr-3">{{ likes }} likes</p>
        <button @click="giveLike" :disabled="alreadyLiked" class="btn btn-info">Give like</button>
      </div>
      <div class="mt-5" v-if="isAuthenticated && post.allowComments">
        <hr>
        <comments-section class="mt-5" :postID="post.id"></comments-section>
      </div>
      <div v-else class>
        <router-link to="/login">Login to comment</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

import { VueEditor } from "vue2-editor";
import NavigationBar from "../components/NavigationBar";
import CommentsSection from "../components/CommentsSection";

export default {
  name: "PostPage",
  components: {
    NavigationBar,
    CommentsSection
  },
  data() {
    return {
      postID: this.$route.params.id,
      post: {},
      likes: 0
    };
  },
  created() {
    this.getPost();
  },
  computed: {
    convertedPublishingDate() {
      return moment(this.post.publishingDate).format("MMMM DD, YYYY - LT");
    },
    // alreadyLiked() {
    //   return
    // },
    ...mapGetters(["isAuthenticated", "getUser"])
  },
  methods: {
    getPost() {
      // console.log(this.post)
      axios.get(`/posts?id=${this.postID}`).then(({ data: post }) => {
        console.log(post);
        if (post.length) {
          this.post = post[0];
          this.likes = post[0].likedBy.length;
          // this.$store.dispatch("setPosts", posts);
        } else {
          // There is no post
          console.log("no data /:");
        }
      });
    },
    giveLike() {
      this.getUser.likedPosts.push(this.postID);
      this.post.likedBy.push(this.getUser.id);

      axios.get(`/users/${this.getUser.id}`).then(({ data: user }) => {
        if (user.likedPosts.find(likedPost => this.postID === likedPost)) {
          // Remove like
          console.log("Already liked");
        } else {
          axios
            .patch(`/users/${this.getUser.id}`, {
              likedPosts: this.getUser.likedPosts
            })
            .then(result => console.log(result));

          axios
            .patch(`/posts/${this.postID}`, {
              likedBy: this.post.likedBy
            })
            .then(({ data: post }) => (this.likes = post.likedBy.length));

          this.alreadyLiked = true;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.post-page {
  background-color: $white-color;

  &--link,
  &--published {
    color: $light-blue-color;
    font-weight: 300;
  }

  &--breadcrumb {
    .breadcrumb {
      background-color: $white-color;
    }
  }

  &--title {
    color: $navy-color;
    font-family: Georgia, "Times New Roman", Times, serif;
    font-weight: 700;
  }
}
</style>
