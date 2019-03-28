<template>
  <div class="post-list py-3 py-md-4">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="post-list--heading">All posts</h2>
      <router-link to="/create-post" class="post-list--create-post btn btn-success">Create Post</router-link>
    </div>
    <hr>
    <div v-if="posts.length">
      <individual-post
        v-for="post in posts"
        :key="post.id"
        :title="post.title"
        :author="post.author"
        :publishingDate="post.publishingDate"
        :content="post.content"
        :commentCount="post.commentCount"
        :likes="post.likes"
        :edited="post.edited"
        :id="post.id"
      ></individual-post>
    </div>
    <div v-else>
      <h4 class="text-center">There are no posts</h4>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import IndividualPost from "./IndividualPost";

export default {
  name: "PostList",
  data() {
    return {
      posts: []
    };
  },
  components: {
    IndividualPost
  },
  created() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      axios.get("/posts").then(({ data: posts }) => {
        if (posts.length) {
          this.posts = posts;
          this.$store.dispatch("setPosts", posts);
        } else {
          // There are no posts
          console.log("no data /:");
        }
      });
    }
  }
};
</script>

<style lang="scss">
.post-list {
  padding-left: 100px;
  padding-right: 100px;

  @media only screen and (max-width: 1600px) {
    padding-left: 50px;
    padding-right: 50px;
  }

  @media only screen and (max-width: 1250px) {
    padding-left: 25px;
    padding-right: 25px;
  }

  &--heading {
    font-family: Georgia, "Times New Roman", Times, serif;
    font-weight: 600;
    color: $navy-color;
  }

  &--create-post {
  }
}
</style>
