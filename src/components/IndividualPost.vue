<template>
  <div class="container">
    <h4>
      <a href="#">{{ title }}</a>
    </h4>
    <p>
      Written by: <a href="#">{{ author }}</a>
    </p>
    <p>
      Published on: <a href="#">{{ convertedPublishingDate }}</a>
    </p>
    <p class="container">
      {{ resumedBody }}...
    </p>
    <div class="row justify-content-around">
      <p>
        comments: <a href="#">{{ comments }}</a>
      </p>
      <p>
        {{ likes }} likes
      </p>
    </div>
      <p
        v-if="edited"
        class="text-center"
      >
        Edited
      </p>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'IndividualPost',
  props: {
    title: String,
    author: String,
    publishingDate: Number,
    body: String,
    comments: Number,
    likes: Number,
    edited: Boolean
  },
  computed: {
    resumedBody() {
      return this.body.substring(0, 201);
    },
    convertedPublishingDate() {
      return new Date(this.publishingDate).toDateString()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
