<template>
  <div class="individual-post">
    <div class="container-fluid px-4 py-3 mb-2">
      <h4 class="individual-post--heading mb-3 mb-lg-5">
        <router-link :to="`/posts/${id}`">{{ title }}</router-link>
      </h4>
      <p v-if="edited">Edited</p>
      <div v-html="resumedBody" class="individual-post--body"></div>
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center">
        <a href="#">
          <img src="../assets/user-2.png" alt="User profile picture">
        </a>
        <div class="ml-3">
          <p class="individual-post--author mb-1 smaller-font">
            Written by:
            <a class="individual-post--author--link" href="#">{{ author }}</a>
          </p>
          <p class="individual-post--published mb-0 smaller-font">
            <router-link
              :to="`/posts/${id}`"
              class="individual-post--published--date"
            >{{ convertedPublishingDate }}</router-link>
          </p>
        </div>
      </div>
      <router-link :to="`/posts/${id}`" class="individual-post--read-more">
        READ MORE
        <font-awesome-icon class="ml-2" icon="arrow-right"/>
      </router-link>
    </div>

    <div class="mt-4 row justify-content-between">
      <p>
        <router-link
          :to="`/posts/${id}`"
        >{{ commentCount }} {{`comment${commentCount === 1 ? '' : 's'}`}}</router-link>
      </p>
      <p>{{ likes }} likes</p>
    </div>
    <hr>
  </div>
</template>

<script>
import truncate from "html-truncate";

export default {
  name: "IndividualPost",
  props: {
    title: String,
    author: String,
    publishingDate: Number,
    content: String,
    comments: Number,
    likes: Number,
    edited: Boolean,
    id: String,
    commentCount: Number
  },
  computed: {
    resumedBody() {
      return truncate(this.content, 200);
    },
    convertedPublishingDate() {
      return new Date(this.publishingDate).toDateString();
    }
  }
};
</script>

<style lang="scss">
.individual-post {
  &--heading {
    &--link {
      color: $navy-color;
      font-weight: 600;

      &:hover {
        color: #1d70a8;
      }
    }
  }

  &--author {
    &--link {
      color: #707070;

      &:hover {
        background: #1d70a8;
      }
    }
  }

  &--published {
    &--date {
      color: $light-blue-color;
    }
  }

  &--read-more {
    color: $navy-color;
    font-weight: 700;
  }

  .smaller-font {
    font-size: 0.9rem;
  }
}
</style>
