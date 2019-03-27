<template>
  <div class="individual-post">
    <div class="container-fluid px-4 py-3 mb-2">
      <h4 class="individual-post--heading mb-3 mb-lg-5">
        <a class="individual-post--heading--link" href="#">{{ title }}</a>
      </h4>
      <p v-if="edited">Edited</p>
      <p v-html="resumedBody" class="individual-post--body"></p>
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
            <a class="individual-post--published--date" href="#">{{ convertedPublishingDate }}</a>
          </p>
        </div>
      </div>
      <a class="individual-post--read-more" href="#">READ MORE
        <font-awesome-icon class="ml-2" icon="arrow-right"/>
      </a>
    </div>

    <div class="mt-4 row justify-content-between">
      <p>
        <a href="#">{{ comments }} comments</a>
      </p>
      <p>{{ likes }} likes</p>
    </div>
    <hr>
  </div>
</template>

<script>
import truncate from 'html-truncate';

export default {
  name: "IndividualPost",
  props: {
    title: String,
    author: String,
    publishingDate: Number,
    content: String,
    comments: Number,
    likes: Number,
    edited: Boolean
  },
  computed: {
    resumedBody() {
      return truncate(this.content, 200)
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
      color: #707070;
      font-weight: 600;

      &:hover {
        color: #707070;
      }

    }
  }

  &--author {
    &--link {
      color: #707070;

      &:hover {
        color: #707070;
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
