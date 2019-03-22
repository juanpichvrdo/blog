<template>
  <div class="post-list p-3 p-md-4 px-md-5">
    <h3 class="post-list--heading">All posts</h3>
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
    &--heading {
      font-family: Georgia, 'Times New Roman', Times, serif;
      font-weight: 600;
      color: $navy-color;
    }
  }
</style>
