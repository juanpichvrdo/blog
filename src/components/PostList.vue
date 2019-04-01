<template>
  <div class="post-list mt-4 py-3 py-md-4">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="post-list--heading">All posts</h2>
      <router-link
        v-if="isAuthenticated"
        to="/create-post"
        class="post-list--create-post btn btn-success"
      >Create Post</router-link>
    </div>
    <hr>
    <div v-if="publishedPosts.length">
      <IndividualPost
        v-for="post in publishedPosts"
        :key="post.id"
        :title="post.title"
        :author="post.author"
        :publishingDate="post.publishingDate"
        :content="post.content"
        :commentCount="post.commentCount"
        :edited="post.edited"
        :id="post.id"
        :userId="post.userId"
        :allowComments="post.allowComments"
        @postDeleted="getPosts"
      />
    </div>
    <div v-else>
      <h4 class="text-center mt-5">There are no posts</h4>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import IndividualPost from "./IndividualPost";

export default {
  name: "PostList",
  components: {
    IndividualPost
  },
  computed: {
    ...mapGetters(["isAuthenticated", "allPosts"]),
    publishedPosts() {
      return this.allPosts.filter(post => post.state === "published");
    }
  },
  created() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      axios.get("/posts").then(({ data: posts }) => {
        if (posts.length) {
          this.$store.dispatch("setPosts", posts);
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
  min-height: 100vh;
  width: 100%;

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
}
</style>
