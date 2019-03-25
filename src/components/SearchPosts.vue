<template>
  <div class="py-5 search-posts">
    <h3 class="search-posts--heading mb-3">Search for posts</h3>
    <form class="search-posts--form">
      <div class="input-group mb-3">
        <span class="search-posts--icon">
          <font-awesome-icon class="input-group-addon" icon="search"/>
        </span>
        <input type="text" class="search-posts--input form-control py-4" placeholder="Search">

        <div class="input-group-append">
          <button class="search-posts--button btn text-white" type="button">GO!</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchPosts"
};
</script>

<style lang="scss">
.search-posts {
  padding-left: 100px;
  padding-right: 100px;

  &--heading {
    font-weight: 600;
  }

  &--form {
  }

  &--input {
    border-top-left-radius: 5px !important;
    border-bottom-left-radius: 5px !important;
    padding-left: 40px;
    position: relative;
  }

  &--button {
    background-color: $orange-color;
    padding: 10px 50px;
  }

  &--icon {
    position: absolute;
    top: 25%;
    left: 15px;
    z-index: 5;
  }
}
</style>
