<template>
  <div class="post-list">
    <h3>All posts</h3>
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
import { mapGetters } from 'vuex';

import IndividualPost from './IndividualPost'

export default {
  name: 'PostList',
  components: {
    IndividualPost
  },
  computed: {
    ...mapGetters(['allPosts']),
  },
}

</script>

<style lang="scss" scoped>

</style>
