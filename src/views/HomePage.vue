<template>
  <div class="home-page">
    <h1>Home Page</h1>
    <button
      class="btn btn-warning"
      @click="onLogout"
    >
      Log Out
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import router from '../router.js';

export default {
  name: 'HomePage',
  methods: {
    onLogout() {
      this.$store.dispatch('logoutUser')
      router.push('/login');
    }
  }
}
</script>

<style>

</style>
