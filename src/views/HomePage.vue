<template>
  <div class="home-page container mt-5">
    <h1>Home Page</h1>
    <button
      class="btn btn-warning"
      @click="onLogout"
    >
      Log Out
    </button>
    <post-list class="mt-5"></post-list>
  </div>
</template>

<script>
import axios from 'axios';
// import { mapActions } from 'vuex';
import router from '../router';

import PostList from '../components/PostList';

export default {
  name: 'HomePage',
  components: {
    PostList
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logoutUser')
      router.push('/login');
    }
  },
  created() {
    axios.get('http://localhost:3000/posts').then(({ data: posts }) => {
      console.log(posts)
      if (posts.length) {
        this.$store.dispatch('setPosts', posts);
      } else {
        // There's no posts
        console.log('no data /:');
      }
    })
  }
}
</script>

<style>

</style>
