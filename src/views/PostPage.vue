<template>
  <div class="post-page">
    <NavigationBar/>
    <div class="container-fluid">
      <div class="row">
        <div class="post-page--body">
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

          <div class="px-xl-5">
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
            <div v-html="post.content" class="post-page--content mt-5"></div>
            <div v-if="isAuthenticated" class="d-flex align-items-center mt-5">
              <p class="mb-0 mr-3">{{ likes }} likes</p>
              <button @click="toggleLike" class="btn btn-info">Toggle Like</button>
              <p class="mb-0 ml-3">{{ comments }} {{`comment${comments === 1 ? '' : 's'}`}}</p>
            </div>
            <div v-if="isAuthenticated && post.allowComments">
              <hr>
              <CommentsSection :postID="post.id"/>
            </div>
            <div v-else class="text-center my-5">
              <router-link to="/login">Login to comment</router-link>
            </div>
          </div>
        </div>
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
      likes: 0,
      alreadyLiked: false,
      comments: 0,
      userLike: null
    };
  },
  created() {
    this.getPost();
    this.getLikes();
    this.getComments();
  },
  computed: {
    convertedPublishingDate() {
      return moment(this.post.publishingDate).format("MMMM DD, YYYY - LT");
    },

    ...mapGetters(["isAuthenticated", "getUser"])
  },
  methods: {
    getPost() {
      axios.get(`/posts?id=${this.postID}`).then(({ data: post }) => {
        if (post.length) {
          this.post = post[0];
          // this.$store.dispatch("setPosts", posts);
        } else {
          // There is no post
          console.log("no data /:");
        }
      });
    },
    toggleLike() {
      if (this.alreadyLiked) {
        axios.delete(`/posts_likes/${this.userLike}`).then(result => {
          this.alreadyLiked = false;
          this.getLikes();
        });
      } else {
        axios
          .post(`/posts_likes`, {
            postID: this.postID,
            userID: this.getUser.id
          })
          .then(({ data: like }) => {
            console.log(like);
            this.getLikes();
          });
      }
    },
    getLikes() {
      axios
        .get(`/posts_likes/?postID=${this.postID}`)
        .then(({ data: likesArray }) => {
          this.likes = likesArray.length;
          this.getLike();
          if (likesArray.find(like => like.userID === this.getUser.id)) {
            this.alreadyLiked = true;
          }
        });
    },
    getLike() {
      axios
        .get(`posts_likes/?postID=${this.postID}&userID=${this.getUser.id}`)
        .then(({ data }) => {
          if (data.length) {
            this.userLike = data[0].id;
          }
        });
    },
    getComments() {
      axios
        .get(`/comments/?postID=${this.postID}`)
        .then(({ data: commentsArray }) => {
          this.comments = commentsArray.length;
        });
    }
  }
};
</script>

<style lang="scss">
.post-page {
  background-color: $white-color;
  min-height: 100vh;

  &--body {
    padding-left: 150px;
    padding-right: 150px;

    @media only screen and (max-width: 1500px) {
      padding-left: 65px;
      padding-right: 65px;
    }

    @media only screen and (max-width: 1200px) {
      padding-left: 45px;
      padding-right: 45px;
    }

    @media only screen and (max-width: 800px) {
      padding-left: 30px;
      padding-right: 30px;
    }
  }

  &--content {
    padding-right: 12rem;
    @media only screen and (max-width: 1300px) {
      padding-right: 8rem;
    }
    @media only screen and (max-width: 1100px) {
      padding-right: 4rem;
    }
    @media only screen and (max-width: 550px) {
      padding-right: 2rem;
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
