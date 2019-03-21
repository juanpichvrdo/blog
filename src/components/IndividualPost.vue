<template>
  <div class="">
    <h4><a href="#">{{ title }}</a></h4>
    <p>Written by: <a href="#">{{ author }}</a></p>
    <p></p>
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
  }
}
</script>

<style lang="scss" scoped>

</style>
