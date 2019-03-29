<template>
  <div class="comment mb-5">
    <div class="d-flex align-items-center">
      <router-link to class="commet--picture">
        <img src="../assets/user-2.png" alt="User profile picture">
      </router-link>
      <p class="mb-0 ml-3">
        <router-link to class="comment--author mr-1">{{ author.username }}</router-link>
        <span class="comment--date">{{ getDate(datePublished) }}</span>
      </p>
    </div>
    <div class="comment--body ml-5 mt-3">
      <div class="comment--body--content">
        <div class v-html="body"></div>
      </div>

      <div class="comment--body--info d-flex justify-content-end mt-4">
        <span class="mx-1">{{ likes }} likes</span>
        <span class="mx-1">2 childs</span>
        <span class="mx-1">Reply</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "IndividualComment",
  props: {
    author: Object,
    datePublished: Number,
    body: String,
    likes: Number
  },
  methods: {
    getDate(date) {
      return moment(date).format("MMMM DD, YYYY - LT");
    }
  }
};
</script>

<style lang="scss">
.comment {
  &--author {
    color: #414141;
  }

  &--date {
    color: $light-blue-color;
  }

  &--body {
    border: solid 1px rgba(0, 0, 0, 0.158);
    border-radius: 5px;
    padding: 1.7rem 1.7rem 1.2rem;
  }
}
</style>
