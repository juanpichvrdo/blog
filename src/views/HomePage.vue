<template>
  <div class="home-page">
    <div class="hero-section py-5 py-md-5">
      <h1 class="hero-section--heading p-2 p-md-4 px-md-5 display-4 font-weight">Welcome to Our Blog</h1>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="post-list py-2 py-md-4 px-md-5 col-lg-7 order-last order-lg-first">
          <post-list></post-list>
        </div>
        <aside class="sidebar col-lg-5 order-first order-lg-last">
          <search-posts></search-posts>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";

import SearchPosts from "../components/SearchPosts";
import PostList from "../components/PostList";

export default {
  name: "HomePage",
  components: {
    PostList,
    SearchPosts
  }

  // created() {
  //   axios.get("/posts").then(({ data: posts }) => {
  //     console.log(posts);
  //     if (posts.length) {
  //       this.$store.dispatch("setPosts", posts);
  //     } else {
  //       // There are no posts
  //       console.log("no data /:");
  //     }
  //   });
  // }
};
</script>

<style lang="scss">
.home-page {
  background-color: $white-color;
  .hero-section {
    padding-left: 100px;
    padding-right: 100px;
    background-size: cover;
    position: relative;
    background-position: center;
    background-image: linear-gradient(
        rgba(117, 112, 112, 0.555),
        rgba(128, 120, 120, 0.575)
      ),
      url("../assets/hero-background.png");

    @media only screen and (max-width: 1024px) {
      padding-left: 50px;
      padding-right: 50px;
    }

    @media only screen and (max-width: 800px) {
      padding-left: 25px;
      padding-right: 25px;
    }

    &--heading {
      color: white;
      font-family: Georgia, "Times New Roman", Times, serif;
      font-weight: 700;
    }
  }

  aside {
    background-color: #ebeef1;
  }
}
</style>
