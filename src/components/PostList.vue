<template>
  <div class="post-list container py-3 py-md-4">
    <h2 class="post-list--heading">All posts</h2>
    <hr>
    <individual-post
      v-for="post in allPosts"
      :key="post.id"
      :title="post.title"
      :author="post.author"
      :publishingDate="post.publishingDate"
      :body="post.body"
      :comments="post.comments"
      :likes="post.likes"
      :edited="post.edited"
    ></individual-post>
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
    ...mapGetters(["allPosts"])
  }
};
</script>

<style lang="scss">
  .post-list {
    padding-left: 100px;
    padding-right: 100px;

    &--heading {
      font-family: Georgia, 'Times New Roman', Times, serif;
      font-weight: 600;
      color: $navy-color;
    }
  }
</style>
