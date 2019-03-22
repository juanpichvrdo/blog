<template>
  <div class="home-page">
    <navigation-bar @logOut="onLogout"></navigation-bar>
    <div class="hero-section p-2 p-md-4 px-md-5">
      <h1 class="hero-section--heading p-2 p-md-4 px-md-5 display-4 font-weight">Welcome to Our Blog</h1>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="post-list p-2 p-md-4 px-md-5 col-8">
          <post-list></post-list>
        </div>
        <aside class="sidebar col-4">
          <search-posts></search-posts>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import router from "../router";

import NavigationBar from "../components/NavigationBar";
import SearchPosts from "../components/SearchPosts"
import PostList from "../components/PostList";

export default {
  name: "HomePage",
  components: {
    NavigationBar,
    PostList,
    SearchPosts
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logoutUser");
      router.push("/login");
    }
  },
  created() {
    axios.get("/posts").then(({ data: posts }) => {
      console.log(posts);
      if (posts.length) {
        this.$store.dispatch("setPosts", posts);
      } else {
        // There's no posts
        console.log("no data /:");
      }
    });
  }
};
</script>

<style lang="scss">
.home-page {
  .hero-section {
    background-size: cover;
    position: relative;
    background-position: center;
    background-image: linear-gradient(
        rgba(117, 112, 112, 0.555),
        rgba(128, 120, 120, 0.575)
      ),
      url("../assets/hero-background.png");

    &--heading {
      color: white;
      font-family: Georgia, "Times New Roman", Times, serif;
      font-weight: 500;
    }
  }

  .post-list {
    background-color: white;
  }

  aside {
    background-color: #F1F9FF;
  }
}
</style>
