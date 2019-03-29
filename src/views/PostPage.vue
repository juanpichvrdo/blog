<template>
  <div class="post-page">
    <navigation-bar></navigation-bar>
    <div class="container-fluid">
      <div class="row">
        <div class="post-page--body col-lg-7 order-last order-lg-first">
          <nav class="post-page--breadcrumb">
            <ol class="breadcrumb pb-0 mb-0">
              <li class="breadcrumb-item d-flex align-items-center">
                <router-link class="post-page--link" to="/">ALL POSTS</router-link>
              </li>
              <li class="breadcrumb-item active d-flex align-items-center">
                <router-link class="post-page--link post-page--link--breadcrumb" to>{{ post.title }}</router-link>
              </li>
            </ol>
          </nav>

          <div class="px-3">
            <h1 class="post-page--title display-4">{{ post.title }}</h1>
            <div class="d-flex align-items-center mb-4">
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
            <div v-html="post.content" class="post-page--content mt-5 px-3"></div>
            <div class="d-flex align-items-center mt-5">
              <p class="mb-0 mr-3">{{ likes }} likes</p>
              <button @click="giveLike" :disabled="alreadyLiked" class="btn btn-info">Give like</button>
            </div>
            <div v-if="isAuthenticated && post.allowComments">
              <hr>
              <comments-section :postID="post.id"></comments-section>
            </div>
            <div v-else class>
              <router-link to="/login">Login to comment</router-link>
            </div>
          </div>
        </div>
        <aside class="post-page--search col-lg-5 order-first order-lg-last">
          <div class="py-5 search-posts">
            <h3 class="search-posts--heading post-page--search--heading mb-5">Search</h3>
            <form class="search-posts--form">
              <div class="input-group mb-3">
                <span class="search-posts--icon">
                  <font-awesome-icon class="input-group-addon" icon="search"/>
                </span>
                <input
                  type="text"
                  class="search-posts--input form-control py-4"
                  placeholder="Search"
                >
              </div>
            </form>
          </div>
        </aside>
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

  &--body {
    padding-left: 180px;
    padding-right: 180px;

    @media only screen and (max-width: 1500px) {
      padding-left: 65px;
      padding-right: 65px;
    }

    @media only screen and (max-width: 1200px) {
      padding-left: 45px;
      padding-right: 45px;
    }

    @media only screen and (max-width: 800px) {
      padding-left: 15px;
      padding-right: 15px;
    }
  }

  &--link,
  &--published {
    color: $light-blue-color;

    &--breadcrumb {
      text-transform: uppercase;
    }
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

  &--search {
    background-color: #ebeef1;

    &--heading {
      font-family: Georgia, "Times New Roman", Times, serif;
      color: $navy-color;
      font-weight: 600;
    }
  }
}
</style>
